/* orchlib/gate: the launch gate. The main session asks it before EVERY agent launch:
 *
 *   node orch.mjs gate --class N --ch n --role <role> [--slot a,b] [--tier base|escalated] [--reason "<trigger>: why"]
 *
 * and launches only on GO (it prints the agent file and model to use). STOP (exit 3) = a limit is reached: wait for a
 * running agent, batch differently, or ask the owner (--over "why" lets the owner's decision through, logged). CHECKPOINT
 * (exit 4) = the session window is nearly spent: launch nothing, let running agents finish, `orch handoff`, stop.
 * Every rule here is a number in orchestration.json (limits, escalation, contextBudget, session), overridable per class. */
import fs from "node:fs";
import path from "node:path";
import { limitOf, modelOf, isTwin, ESC, readJson, writeJsonAtomic } from "./config.mjs";
import { running, stale, slotRec } from "./state.mjs";
import { windowUsage } from "./transcripts.mjs";

export const REVIEW_ROLES = ["maths-reviewer", "language-agent", "visual-reviewer", "play-tester"];
export const ROLES = ["planner", "tool-builder", "maths-reviewer", "language-agent", "visual-reviewer", "play-tester", "image-agent", "upload-auditor"];

/* the account-wide reading of the 5-hour window (the owner's /usage figure), kept beside the usage reports */
export const sessionFile = (root) => path.join(root, "usage-reports", ".session.json");
export function setReading(root, pct) {
  const cur = readJson(sessionFile(root), {});
  writeJsonAtomic(sessionFile(root), { ...cur, manual: { pct: Number(pct), at: new Date().toISOString() } });
}

/* -> { frac, source } : the freshest of the owner's reading and the transcript estimate (the larger wins) */
export async function sessionLevel({ root, pol, now = Date.now(), estimate = true }) {
  const S = pol.session || {}, out = [];
  const r = readJson(sessionFile(root), {});
  if (r.manual && now - Date.parse(r.manual.at) < (S.manualReadingTtlMinutes || 45) * 60000) out.push({ frac: r.manual.pct / 100, source: `owner reading ${r.manual.pct}% at ${String(r.manual.at).slice(11, 16)}` });
  if (estimate && S.budgetUsd5h) {
    try {
      const pricing = readJson(path.join(root, "usage.pricing.json"), { models: {} });
      const w = await windowUsage({ root, hours: S.windowHours || 5, pricing, now });
      if (w.calls) out.push({ frac: w.usd / S.budgetUsd5h, source: `transcripts ${w.calls} calls ≈ $${w.usd.toFixed(2)} of $${S.budgetUsd5h} (${S.windowHours || 5} h)${w.usdKnown ? "" : ", some prices unknown"}` });
    } catch { /* no transcripts here */ }
  }
  if (!out.length) return { frac: null, source: "no reading (node orch.mjs session --pct <the /usage figure>) and no budgetUsd5h" };
  return out.sort((a, b) => b.frac - a.frac)[0];
}

/* the agent file of a launch */
export const agentFile = (prefix, role, tier, pol) => `${prefix}-${role}${tier === "escalated" && isTwin(pol, role) ? ESC(pol) : ""}`;

/* static start estimate (tokens) of a builder batch: the always-read docs + each slot's brief and tool */
export function builderStartTokens({ classDir, chapterDir, slots, rep }) {
  const sz = (f) => (fs.existsSync(f) ? fs.statSync(f).size : 0);
  const docs = (n) => path.join(classDir, "docs", n);
  const base = sz(docs("PREFLIGHT.md")) + sz(docs("LAYOUT.md")) * (rep ? 1 : 0.85) + Math.min(sz(docs("BUILD_CARD.md")), 70000) + 20000;
  const per = slots.reduce((a, id) => a + sz(path.join(chapterDir, id, "brief.md")) + sz(path.join(chapterDir, id, "tool.tsx")), 0);
  return Math.round((base + per) / 4);
}

/* decide. -> { verdict: "GO"|"STOP"|"CHECKPOINT", lines: [...], agent?: {...} } (pure apart from the session reading) */
export async function decide({ root, pol, st, info, chapter, tools, role, slots = [], tier = "base", mode = null, reason = null, over = null, plan = null, now = Date.now(), estimate = true }) {
  /* a running sprint (orch.mjs sprint start) lays its own limits over the standing ones for ONE tool built in a fixed time; since 2026-10-28 the standing ones already allow 5 Opus agents at once and any number of Sonnet agents, so it can only lift the Opus figure, never lower it */
  const sprint = st.sprint && !st.sprint.endedAt ? st.sprint : null;
  const L = sprint ? { ...(pol.limits || {}), ...((pol.sprint && pol.sprint.limits) || {}), ...(sprint.limits || {}) } : pol.limits || {}, lines = [], refuse = [];
  if (!ROLES.includes(role)) return { verdict: "STOP", lines: [`unknown role ${role}; one of ${ROLES.join(", ")}`] };
  if (tier === "escalated" && !isTwin(pol, role) && role !== "planner") return { verdict: "STOP", lines: [`${role} has no escalated twin (twins: ${(pol.escalation.twins || []).join(", ")})`] };
  const model = role === "planner" ? modelOf(pol, "planner") : modelOf(pol, role, tier);
  const build = st.agents.filter((a) => a.build === st.build);

  /* 1. the session window */
  const lvl = await sessionLevel({ root, pol, now, estimate });
  const S = pol.session || {};
  const inWindow = st.agents.filter((a) => now - Date.parse(a.startedAt) < (S.windowHours || 5) * 3600e3).length;
  if (lvl.frac != null && lvl.frac >= (S.checkpointAt ?? 0.85)) return { verdict: "CHECKPOINT", lines: [`session ${Math.round(lvl.frac * 100)}% ≥ checkpointAt ${Math.round((S.checkpointAt ?? 0.85) * 100)}% (${lvl.source})`, "launch nothing; let running agents finish and write their reports; then: node orch.mjs handoff --class N --ch n; stop the session"] };
  if (inWindow >= (S.fallbackMaxAgentsPerWindow || Infinity)) return { verdict: "CHECKPOINT", lines: [`${inWindow} agents launched for this chapter in the last ${S.windowHours || 5} h ≥ fallbackMaxAgentsPerWindow ${S.fallbackMaxAgentsPerWindow}`, "checkpoint: node orch.mjs handoff, and resume after the window resets (or record the real figure: node orch.mjs session --pct N)"] };
  if (lvl.frac != null && lvl.frac >= (S.stopExpensiveAt ?? 0.7) && (model === "opus" || (role === "visual-reviewer" && (mode || "full") === "full"))) refuse.push(`session ${Math.round(lvl.frac * 100)}% ≥ stopExpensiveAt ${Math.round((S.stopExpensiveAt ?? 0.7) * 100)}%: no new ${model === "opus" ? "Opus agent" : "full visual pass"} (finish cheap work, then handoff)`);

  /* 2. limits. The owner's rule (2026-10-28, every class and chapter): at most maxConcurrentOpus Opus agents RUNNING at once (5) and no cap on Sonnet or Haiku agents: the other limits are null (= none), and a class may still set a number */
  const run = running(st, L.staleAgentMinutes || 90);
  const maxRun = limitOf(L.maxConcurrent, tools);
  if (run.length >= maxRun) refuse.push(`${run.length} agents running (maxConcurrent ${maxRun}): wait for one (${run.map((a) => a.id).join(", ")})`);
  const maxTotal = limitOf(L.maxAgentsPerChapter, tools);
  if (build.length >= maxTotal) refuse.push(`${build.length} agents this build ≥ maxAgentsPerChapter ${maxTotal}`);
  /* a sprint only LIFTS the Opus cap: when the standing figure (orchestration.json limits.maxConcurrentOpus, 5) is higher than the sprint's own, the standing one wins; an unset figure is 5, never none */
  const runOpus = run.filter((a) => a.model === "opus"), maxOpus = Math.max(limitOf(L.maxConcurrentOpus ?? 5, tools), sprint ? limitOf((pol.limits || {}).maxConcurrentOpus ?? 5, tools) : 0);
  if (model === "opus" && runOpus.length >= maxOpus) refuse.push(`${runOpus.length} Opus agents running ≥ maxConcurrentOpus ${maxOpus}: wait for one (${runOpus.map((a) => a.id).join(", ")})`);
  const rev = build.filter((a) => REVIEW_ROLES.includes(a.role)).length, maxRev = limitOf(L.maxReviewAgents, tools);
  if (REVIEW_ROLES.includes(role) && rev >= maxRev) refuse.push(`${rev} review agents this build ≥ maxReviewAgents ${maxRev}`);
  /* builders and play testers each drive their own headless Chrome; past chromeAdvisoryAt of them at once this machine gave false timeouts (class 3 ch 9). A note, not a limit: the owner wants no cap on Sonnet agents */
  const chrome = (r) => r === "tool-builder" || r === "play-tester", chromeRun = run.filter((a) => chrome(a.role)).length;
  if (chrome(role) && chromeRun >= (L.chromeAdvisoryAt ?? Infinity)) lines.push(`note: ${chromeRun} Chrome-driving agents (builders, play testers) already running; past ${L.chromeAdvisoryAt} this machine gave false timeouts: re-run a timed-out check with C4_CHROME_POOL=1 before debugging it`);

  /* 3. retries and escalation */
  for (const id of slots) {
    const r = st.slots[id] ? st.slots[id].retries || {} : {};
    const k = role === "tool-builder" ? "tool-builder" : role;
    if ((r[k] || 0) >= (L.maxRetryRounds ?? 2) && tier !== "escalated") refuse.push(`${id}: ${role} already retried ${r[k]} times (maxRetryRounds ${L.maxRetryRounds}): escalate (--tier escalated --reason "cap-reached: …") or ask the owner`);
  }
  if (tier === "escalated" && role !== "planner") {
    const planned = plan && slots.length && slots.every((id) => plan.slots && plan.slots[id] && plan.slots[id].tier === "escalated");
    if (!planned) {
      const trig = String(reason || "").split(/[:\s]/)[0].toLowerCase();
      if (!(pol.escalation.triggers || []).includes(trig)) refuse.push(`--tier escalated outside the plan needs --reason "<trigger>: why" (triggers: ${(pol.escalation.triggers || []).join(", ")})`);
      const esc = build.filter((a) => a.escalation).length, maxEsc = limitOf(pol.escalation.maxPerChapter, tools);
      if (esc >= maxEsc) refuse.push(`${esc} escalations this build ≥ escalation.maxPerChapter ${maxEsc}`);
    }
  }

  /* 4. context budget of a builder batch */
  if (role === "tool-builder" && slots.length) {
    const tok = builderStartTokens({ classDir: info.dir, chapterDir: chapter.dir, slots, rep: tier === "escalated" });
    const B = pol.contextBudget || {};
    if (slots.length > 1 && tok > B.targetTokens * 0.6) refuse.push(`builder batch starts at ~${Math.round(tok / 1000)}k tokens (brief + tool of ${slots.length} slots): above 60% of the ${B.targetTokens / 1000}k target before any work; launch them one by one`);
    else lines.push(`start ≈ ${Math.round(tok / 1000)}k tokens (target ${B.targetTokens / 1000}k, checkpoint and continue fresh past ${B.escalateTokens / 1000}k)`);
  }
  if (stale(st, L.staleAgentMinutes || 90).length) lines.push(`stale (running > ${L.staleAgentMinutes} min, not counted): ${stale(st, L.staleAgentMinutes).map((a) => a.id).join(", ")}: mark them: node orch.mjs done --agent <id> --status fail`);

  if (refuse.length && !(over && String(over).trim().length >= 8)) return { verdict: "STOP", lines: refuse.concat(["(the owner may let one through: --over \"why\", logged)"]) };
  if (refuse.length) lines.unshift(`OVERRIDDEN by --over "${over}": ${refuse.join(" | ")}`);
  const n = build.filter((a) => a.role === role).length + 1;
  const agent = { id: `${role}-${st.build}.${n}`, role, tier, model, file: agentFile(info.prefix, role, tier, pol), slots, mode: mode || null, startedAt: new Date(now).toISOString(), status: "running", build: st.build, round: st.round, escalation: tier === "escalated" && role !== "planner" && !(plan && slots.length && slots.every((id) => plan.slots && plan.slots[id] && plan.slots[id].tier === "escalated")) ? String(reason || "") : null, over: refuse.length ? String(over) : null };
  if (lvl.frac != null) lines.push(`session ${Math.round(lvl.frac * 100)}% (${lvl.source})`);
  return { verdict: "GO", agent, lines };
}

/* record a launch's effect on the slots (retries count from the second launch of a role on a slot) */
export function applyLaunch(st, agent) {
  st.agents.push(agent);
  for (const id of agent.slots) {
    const r = slotRec(st, id);
    r.launches = r.launches || {};
    r.launches[agent.role] = (r.launches[agent.role] || 0) + 1;
    if (r.launches[agent.role] > 1) r.retries[agent.role] = r.launches[agent.role] - 1;
    if (agent.escalation) r.escalations++;
  }
}
