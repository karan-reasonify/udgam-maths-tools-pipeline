#!/usr/bin/env node
/* orch: the orchestration of a chapter build, for every class (policy: orchestration.json; a class overrides it in
 * class<N>/pipeline.config.json "orchestration"). Every command prints at most ~40 lines: its output is meant for the main
 * session's context. State lives in class<N>/work/<chapter>/orch/ (state.json, plan.json, reports/, ckpt/, snap/, HANDOFF.md).
 *
 *   node orch.mjs plan        --class N --ch n               Tier 0 inventory, pattern groups, routing, batches, agent budget
 *   node orch.mjs readlists   --class N --ch n [--slot ID]   follower read lists (LAYOUT sections by capability) in orch/readlist/
 *   node orch.mjs gate        --class N --ch n --role R [--slot a,b] [--tier base|escalated] [--mode full|light|changed]
 *                             [--reason "<trigger>: why"] [--over "why"] [--dry]
 *                             GO <agent id> (exit 0) | STOP (exit 3) | CHECKPOINT (exit 4). Launch only on GO.
 *   node orch.mjs done        --class N --ch n --agent ID [--status ok|fail|...]   an agent finished (reads its report envelope)
 *   node orch.mjs report      --class N --ch n --agent ID  < text     an agent saves its report (capped at 40 lines)
 *   node orch.mjs checkpoint  --class N --ch n --slot ID --stage prebuild|built|checked|prereview|final
 *                             [--decision ".."] [--fail ".."] [--fix ".."] [--risk ".."] [--clear fails|fixes|risks]
 *   node orch.mjs diff        --class N --ch n --slot ID [--since STAGE] [--lines 40]
 *   node orch.mjs checks      --class N --ch n --tier 0|1|2 [--slots changed|all|a,b] [--force]   cached tiered checks
 *   node orch.mjs review-plan --class N --ch n [--round k]
 *   node orch.mjs review-done --class N --ch n --slot ID --role R --verdict pass|fix|fail [--mode full|light|changed]
 *   node orch.mjs digest      --class N --ch n --slot ID --maths|--strings
 *   node orch.mjs chunks      --class N --ch n --slot ID [--mode full|light|changed] [--chunk k]
 *   node orch.mjs images      --class N --ch n                image dedupe inventory (each unique picture made once)
 *   node orch.mjs audit       --class N --ch n                deterministic publish dry runs + sidecar table (no upload)
 *   node orch.mjs resume | handoff --class N --ch n           the compact state to continue from (handoff writes HANDOFF.md)
 *   node orch.mjs session     --pct P                          record the /usage 5-hour figure (the gate reads it)
 *   node orch.mjs new-build   --class N --ch n --why ".."      a remake: a new build number (runtime gates and limits restart)
 *   node orch.mjs sprint      start|lap|status|stop --class N --ch n [--slot ID] [--minutes 40] [--at HH:MM] [--stage K] [--design] [--complexity simple|complex]
 *                             the wall clock of ONE tool built in a fixed time (runbook "Sprint mode"): stage deadlines, what to cut when late
 */
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { ROOT, loadPolicy, classInfo, chapterOf, slotsOf, parseArgs, readJson, writeJsonAtomic, classLib, modelOf } from "./orchlib/config.mjs";
import { readState, updateState, slotRec, orchDir, capList, recordSkip, running } from "./orchlib/state.mjs";
import { decide, applyLaunch, setReading, sessionLevel } from "./orchlib/gate.mjs";
import { capReport, parseEnvelope } from "./orchlib/report.mjs";
import { chapterFacts, tier0, buildPlan, reviewPlan, snapshot, snapDir, changeSince, toolSha } from "./orchlib/planner.mjs";
import { mathsDigest, stringsDigest } from "./orchlib/digest.mjs";
import { chunkPlan, frameLine } from "./orchlib/chunks.mjs";
import { diffLines, renderDiff, changedRanges } from "./orchlib/textdiff.mjs";
import { cacheKey, keyDiff } from "./orchlib/keys.mjs";
import { measure } from "./orchlib/simulate.mjs";

const a = parseArgs(process.argv.slice(3), ["dry", "maths", "strings", "force", "json"]);
const cmd = process.argv[2];
const out = (s = "") => console.log(s);
const list = (v) => (v && v !== true ? String(v).split(",").map((x) => x.trim()).filter(Boolean) : []);
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, "/");

function ctx({ needChapter = true } = {}) {
  if (!a.class || a.class === true) throw new Error("--class N is required");
  const info = classInfo(ROOT, a.class);
  const pol = loadPolicy({ root: ROOT, classDir: info.dir });
  if (!needChapter) return { info, pol };
  if (!a.ch || a.ch === true || !/^\d+$/.test(String(a.ch))) throw new Error("--ch n (one chapter) is required");
  const chap = chapterOf(info, a.ch);
  if (!chap.exists) throw new Error(`no work folder for class ${info.n} chapter ${a.ch} (${rel(chap.dir)}): fetch it first (node cli.mjs fetch --ch ${a.ch})`);
  return { info, pol, chap, ids: slotsOf(chap.dir) };
}
const planFile = (chap) => path.join(orchDir(chap.dir), "plan.json");
const meta = (info, chap) => ({ class: info.n, chapter: chap.id });

/* ---------------- plan ---------------- */
async function cmdPlan() {
  const { info, pol, chap } = ctx();
  const facts = await chapterFacts(info, chap);
  const st = readState(chap.dir, meta(info, chap));
  const t0 = tier0(info, chap, facts);
  const prev = a.replan ? null : readJson(planFile(chap), null);
  const plan = buildPlan({ root: ROOT, info, chap, pol, facts, st, prevReps: prev ? prev.groups.map((g) => g.rep) : [] });
  writeJsonAtomic(planFile(chap), plan);
  updateState(chap.dir, (s) => { if (s.phase === "plan") s.phase = "build"; s.planAt = plan.at; }, meta(info, chap));
  out(`plan ${chap.id} · ${plan.tools} slots · runtime pin ${t0.pin || "NONE"} · policy ${pol._sources.join(" + ")}`);
  for (const p of t0.problems) out(`  ! ${p}`);
  out(`patterns: ${plan.groups.length} group(s)`);
  for (const g of plan.groups.slice(0, 12)) out(`  ${g.g} [${g.key.slice(0, 50)}] rep ${g.rep}${g.known ? " (already fully reviewed)" : ""} + ${g.slots.length - 1} follower(s)`);
  const risky = Object.entries(plan.slots).filter(([, s]) => s.risk.length);
  if (risky.length) out(`risk: ${risky.slice(0, 6).map(([id, s]) => `${id} ${s.risk.join("+").slice(0, 50)}`).join(" · ")}${risky.length > 6 ? " …" : ""}`);
  out(`build launches (${plan.batches.builder.length}): ${plan.batches.builder.map((b) => `${b.slots.join("+")}${b.tier === "escalated" ? "*" : ""}`).join(" · ") || "none (every tool built)"}`);
  out(`  * = ${info.prefix}-tool-builder${pol.escalation.suffix} (${modelOf(pol, "tool-builder", "escalated")}); others ${info.prefix}-tool-builder (${modelOf(pol, "tool-builder")})`);
  out(`batch sizes: follower builders ${plan.batchSizes.followerBuilders || "-"} · maths ${plan.batchSizes.maths} · language ${plan.batchSizes.language} · images ${plan.batchSizes.image} · light visual ${plan.batchSizes.lightVisual}`);
  const P = plan.projected, Lm = plan.limits;
  out(`projected agents ${P.total} (limit ${Lm.maxAgentsPerChapter}) · opus ${P.opus} (limit ${Lm.maxOpusAgents}) · review ${P.review} (limit ${Lm.maxReviewAgents}) · concurrent ≤ ${Lm.maxConcurrent}`);
  if (P.total > Lm.maxAgentsPerChapter || P.opus > Lm.maxOpusAgents || P.review > Lm.maxReviewAgents) out("  ! the projection is above a limit: fewer groups (shared patterns), bigger review batches, or raise the class override");
  out(`visual: ${Object.values(plan.slots).filter((s) => s.visual === "full").length} full (${plan.chunksPerPack} chunks of ≤${pol.review.visualChunkFrames} frames) · ${Object.values(plan.slots).filter((s) => s.visual !== "full").length} light · play ${P.play}`);
  out(`next: node orch.mjs readlists --class ${info.n} --ch ${chap.ch}; then gate each build launch (orch gate --role tool-builder --slot …${plan.batches.builder[0] && plan.batches.builder[0].tier === "escalated" ? " --tier escalated" : ""})`);
  out(`wrote ${rel(planFile(chap))}`);
}

/* ---------------- readlists: followers read the LAYOUT sections their capabilities need ---------------- */
const LAYOUT_NEED = [[/^1b\./, (c) => c.board], [/^1c\./, (c) => c.startPage], [/^1d\./, (c) => c.keyOnly], [/^1e\./, (c) => c.act || c.keyOnly], [/^8v\./, (c) => !c.silent], [/^13b\./, (c) => c.classroom]];
async function cmdReadlists() {
  const { info, chap, ids } = ctx();
  const plan = readJson(planFile(chap), null);
  if (!plan) throw new Error("no plan yet: node orch.mjs plan first");
  const R = await classLib(info.dir, "lib/build/readlist.mjs");
  const wanted = list(a.slot).length ? list(a.slot) : ids;
  const dir = path.join(orchDir(chap.dir), "readlist");
  fs.mkdirSync(dir, { recursive: true });
  for (const id of wanted) {
    const P = plan.slots[id];
    if (!P) continue;
    const slotDir = path.join(chap.dir, id);
    const text = R.readlist(slotDir, {});
    if (P.rep) { fs.writeFileSync(path.join(dir, `${id}.md`), text); out(`  ${id} representative: the class read list as is (LAYOUT whole)`); continue; }
    const { caps } = R.readlistEntries(slotDir, {});
    const layout = path.join(info.dir, "docs", "LAYOUT.md");
    const L = fs.readFileSync(layout, "utf8").split("\n").map((l) => l.replace(/\r$/, ""));
    const heads = []; let fence = false;
    L.forEach((l, i) => { if (/^\s*```/.test(l)) fence = !fence; if (!fence && /^## /.test(l)) heads.push({ line: i + 1, text: l.slice(3).trim() }); });
    const keep = [], drop = [];
    heads.forEach((h, k) => { const to = k + 1 < heads.length ? heads[k + 1].line - 1 : L.length; const rule = LAYOUT_NEED.find(([re]) => re.test(h.text)); (rule && !rule[1](caps) ? drop : keep).push(`${h.line}-${to} ${h.text.split(/[:(—-]/)[0].trim().slice(0, 28)}`); });
    const rep = plan.groups.find((g) => g.g === P.group).rep;
    const head = [`# Follower read list · ${id} (pattern ${P.group}, representative ${rep})`, "",
      `LAYOUT.md by section (this runtime's capabilities): READ ${keep.join(" · ")}`,
      drop.length ? `NOT needed by this tool's capabilities (read any of them on doubt): ${drop.join(" · ")}` : "every LAYOUT section applies",
      `BUILD_CARD.md: sections 1, 3, 4 and 6 (skip §2 order of work and §5 output contract: the representative's packet carries them).`,
      `Pattern packet: work/${chap.id}/orch/ckpt/${rep}.md (its decisions) and its tool.tsx by range: node ../orch.mjs digest --class ${info.n} --ch ${chap.ch} --slot ${rep} --maths (ranges at the end).`,
      "", "The class read list follows; where it says LAYOUT whole, the line above replaces it.", ""];
    fs.writeFileSync(path.join(dir, `${id}.md`), head.join("\n") + text);
    out(`  ${id} follower of ${rep}: LAYOUT ${keep.length}/${heads.length} sections`);
  }
  out(`wrote ${rel(dir)}/<slot>.md (a builder reads its own, never another's)`);
}

/* ---------------- gate / done / report ---------------- */
async function cmdGate() {
  const { info, pol, chap, ids } = ctx();
  const role = String(a.role || "");
  const plan = readJson(planFile(chap), null);
  const st = readState(chap.dir, meta(info, chap));
  const r = await decide({ root: ROOT, pol, st, info, chapter: chap, tools: ids.length, role, slots: list(a.slot), tier: a.tier === "escalated" ? "escalated" : "base", mode: a.mode && a.mode !== true ? String(a.mode) : null, reason: a.reason && a.reason !== true ? String(a.reason) : null, over: a.over && a.over !== true ? String(a.over) : null, plan });
  if (r.verdict !== "GO") { out(`${r.verdict} ${role}`); r.lines.forEach((l) => out("  " + l)); process.exitCode = r.verdict === "STOP" ? 3 : 4; if (r.verdict === "CHECKPOINT") updateState(chap.dir, (s) => { s.session.checkpointAsked = new Date().toISOString(); }, meta(info, chap)); return; }
  if (a.dry) { out(`GO (dry) ${r.agent.file} model=${r.agent.model}`); r.lines.forEach((l) => out("  " + l)); return; }
  updateState(chap.dir, (s) => { applyLaunch(s, r.agent); }, meta(info, chap));
  out(`GO ${r.agent.id} agent=${r.agent.file} model=${r.agent.model}${r.agent.slots.length ? " slots=" + r.agent.slots.join(",") : ""}`);
  r.lines.forEach((l) => out("  " + l));
  out(`  prompt: agent id ${r.agent.id}; class ${info.n} ch ${chap.ch}; slots; the checkpoint to start from (orch/ckpt/<slot>.md). The agent ends with: node ../orch.mjs report --class ${info.n} --ch ${chap.ch} --agent ${r.agent.id} and returns only its envelope. Then: node orch.mjs done --agent ${r.agent.id}`);
}

async function cmdDone() {
  const { info, chap } = ctx();
  const id = String(a.agent || "");
  const repFile = path.join(orchDir(chap.dir), "reports", `${id}.md`);
  const env = fs.existsSync(repFile) ? parseEnvelope(fs.readFileSync(repFile, "utf8")) : {};
  const status = a.status && a.status !== true ? String(a.status) : env.status || (fs.existsSync(repFile) ? "ok" : "no-report");
  let agent = null;
  updateState(chap.dir, (s) => {
    agent = s.agents.find((x) => x.id === id);
    if (!agent) return;
    agent.status = status === "ok" ? "done" : status; agent.endedAt = new Date().toISOString();
    agent.escalate = env.escalate || null;
    for (const sid of agent.slots) { const r = slotRec(s, sid); r.history = capList([...(r.history || []), `${agent.id} ${status}`], 12); }
  }, meta(info, chap));
  if (!agent) throw new Error(`no agent ${id} in this chapter's state`);
  out(`${id} ${status}${fs.existsSync(repFile) ? "" : " (no report saved: ask the agent for its report, never its transcript)"}`);
  if (env.escalate) out(`  escalation asked: ${env.escalate.trigger}: ${env.escalate.why.slice(0, 120)}\n  -> node orch.mjs gate --class ${info.n} --ch ${chap.ch} --role ${agent.role === "planner" ? "planner" : agent.role} --slot ${agent.slots.join(",")} --tier escalated --reason "${env.escalate.trigger}: …"`);
}

async function cmdReport() {
  const { info, pol, chap } = ctx();
  const id = String(a.agent || "");
  if (!id) throw new Error("--agent ID is required");
  const text = a.text && a.text !== true ? String(a.text) : fs.readFileSync(0, "utf8");
  const c = capReport(text, pol.contextBudget.reportMaxLines || 40);
  const f = path.join(orchDir(chap.dir), "reports", `${id}.md`);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, c.text + "\n");
  const env = parseEnvelope(c.text);
  out(`saved ${rel(f)} · ${c.lines} lines${c.truncated ? " (folded/truncated to the cap)" : ""}${env.status ? "" : " · WARNING: no STATUS line (envelope: " + "STATUS/SLOTS/FILES/CHECKS/FAILURES/DECISIONS/RISKS/ESCALATE" + ")"}`);
  void info;
}

/* ---------------- checkpoints ---------------- */
function checkpointText({ info, chap, id, rec, status, plan }) {
  const brief = readJson(path.join(chap.dir, id, "slot.json"), {});
  const P = plan && plan.slots[id];
  const L = [`# checkpoint ${id} · stage ${rec.stage} · ${new Date().toISOString().slice(0, 16)}`,
    `brief: ${(brief.title || (P && P.brief) || "").slice(0, 60)} · work/${chap.id}/${id}/brief.md${P ? ` · pattern ${P.group}${P.rep ? " (representative)" : ""}${P.risk.length ? " · risk " + P.risk.join("+") : ""}` : ""}`];
  const prev = rec.prevStage;
  if (prev) { const c = changeSince(chap.dir, id, prev); L.push(`diff since ${prev}: ${c === "same" ? "none" : c === "tr-only" ? "TR table only" : c.unknown ? "no snapshot" : `+${c.added}/-${c.removed} lines (node ../orch.mjs diff --class ${info.n} --ch ${chap.ch} --slot ${id} --since ${prev})`}`); }
  const ck = status.checks ? `full ${status.checks.pass}/${status.checks.warn}/${status.checks.fail} (pass/warn/fail)` : "no full check";
  const q = status.quickCheck ? ` · quick ${status.quickCheck.pass}/${status.quickCheck.warn}/${status.quickCheck.fail}` : "";
  L.push(`checks: ${ck}${q}`);
  const failRows = (() => { try { return (readJson(path.join(chap.dir, id, ".build", "check.json")).results || []).filter((r) => r.level === "fail" || r.level === "warn").slice(0, 6).map((r) => `${r.level.toUpperCase()} ${r.id}: ${String(r.msg).slice(0, 90)}`); } catch { return []; } })();
  if (failRows.length) L.push("failed checks:", ...failRows.map((x) => "  " + x));
  const sec = (name, arr, n) => { if (arr && arr.length) { L.push(`${name}:`); for (const x of arr.slice(-n)) L.push("  - " + String(x).slice(0, 160)); } };
  sec("decisions", rec.decisions, 8); sec("failed / open findings", rec.fails, 6); sec("required corrections", rec.fixes, 6); sec("remaining risks", rec.risks, 5);
  const rv = Object.entries(rec.reviews || {}).map(([k, v]) => `${k} ${v.verdict}${v.mode ? "/" + v.mode : ""} r${v.round}`);
  if (rv.length) L.push(`reviews: ${rv.join(" · ")}`);
  return L.slice(0, 40).join("\n") + "\n";
}

async function cmdCheckpoint() {
  const { info, chap } = ctx();
  const id = String(a.slot || ""), stage = String(a.stage || "");
  if (!id || !fs.existsSync(path.join(chap.dir, id))) throw new Error("--slot ID (a slot of this chapter) is required");
  if (!["prebuild", "built", "checked", "prereview", "final"].includes(stage)) throw new Error("--stage prebuild|built|checked|prereview|final");
  const plan = readJson(planFile(chap), null);
  snapshot(chap.dir, id, stage);
  const status = readJson(path.join(chap.dir, id, "status.json"), {});
  let rec;
  updateState(chap.dir, (s) => {
    rec = slotRec(s, id);
    for (const k of list(a.clear)) if (Array.isArray(rec[k])) rec[k] = [];
    rec.prevStage = rec.stage !== "new" && rec.stage !== stage ? rec.stage : rec.prevStage || null;
    rec.stage = stage; rec.toolSha = toolSha(path.join(chap.dir, id)); rec.at = new Date().toISOString();
    const push = (k, v) => { for (const x of [].concat(v || [])) if (x && x !== true) rec[k] = capList([...(rec[k] || []), String(x)], 12); };
    push("decisions", a.decision); push("fails", a.fail); push("fixes", a.fix); push("risks", a.risk);
  }, meta(info, chap));
  const f = path.join(orchDir(chap.dir), "ckpt", `${id}.md`);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, checkpointText({ info, chap, id, rec, status, plan }));
  out(`checkpoint ${id} ${stage} -> ${rel(f)} (${fs.readFileSync(f, "utf8").split("\n").length - 1} lines); continue from it, drop everything older`);
}

async function cmdDiff() {
  const { chap } = ctx();
  const id = String(a.slot || ""), since = a.since && a.since !== true ? String(a.since) : null;
  const st = readState(chap.dir);
  const stage = since || (st.slots[id] && (st.slots[id].prevStage || st.slots[id].stage));
  const snap = path.join(snapDir(chap.dir, id), `${stage}.tsx`);
  if (!stage || !fs.existsSync(snap)) throw new Error(`no snapshot ${stage || "?"} for ${id} (stages: ${fs.existsSync(snapDir(chap.dir, id)) ? fs.readdirSync(snapDir(chap.dir, id)).join(", ") : "none"})`);
  const d = diffLines(fs.readFileSync(snap, "utf8"), fs.readFileSync(path.join(chap.dir, id, "tool.tsx"), "utf8"));
  out(`diff ${id} since ${stage}: +${d.added}/-${d.removed} · changed ranges ${changedRanges(d).slice(0, 12).map(([x, y]) => x === y ? x : `${x}-${y}`).join(",") || "none"}`);
  renderDiff(d, { maxLines: Number(a.lines || 40) }).forEach((l) => out(l));
}

/* ---------------- tiered checks ---------------- */
function runCli(classDir, args) {
  return new Promise((res) => {
    const p = spawn(process.execPath, ["cli.mjs", ...args], { cwd: classDir, env: process.env });
    let o = ""; p.stdout.on("data", (d) => (o += d)); p.stderr.on("data", (d) => (o += d));
    p.on("close", (code) => res({ code, out: o }));
  });
}
async function pool(items, n, fn) { const res = []; let i = 0; await Promise.all(Array.from({ length: Math.max(1, n) }, async () => { while (i < items.length) { const k = i++; res[k] = await fn(items[k]); } })); return res; }

async function cmdChecks() {
  const { info, pol, chap, ids } = ctx();
  const tier = Number(a.tier ?? 1);
  const st = readState(chap.dir, meta(info, chap));
  let slots = a.slots === "all" ? ids : list(a.slots).length && a.slots !== "changed" ? list(a.slots) : null;
  const facts = ids.map((id) => ({ id, dir: path.join(chap.dir, id), status: readJson(path.join(chap.dir, id, "status.json"), {}) }));
  if (tier === 0) {
    const t = tier0(info, chap, await chapterFacts(info, chap));
    out(`tier 0 ${chap.id}: pin ${t.pin || "NONE"}`);
    for (const r of t.rows) out(`  ${r.id.padEnd(18)} brief ${r.brief ? "y" : "N"} · tool ${r.tool.padEnd(8)} · images ${r.images == null ? "-" : r.images} · stage ${r.stage || "-"} · last ${r.lastCheck || "-"}`);
    t.problems.forEach((p) => out("  ! " + p));
    return;
  }
  if (![1, 2].includes(tier)) throw new Error("--tier 0 (metadata) | 1 (check --no-render) | 2 (one full check); tier 3 is the play tester, tier 4 the visual pack (orch review-plan)");
  const { hashOf } = await classLib(info.dir, "lib/check/check.mjs");
  const render = tier === 2;
  const keyOf = (f) => { let th = null; try { th = hashOf(f.dir); } catch { return null; } return cacheKey({ classDir: info.dir, slotDir: f.dir, pol, toolHash: th, render }); };
  /* a running sprint counts its own full checks (sprint.maxFullChecks) from when the sprint began (or from this first look, if it began before this code existed), not the checks an earlier, machine-failed build spent */
  const sprintOn = st.sprint && !st.sprint.endedAt;
  if (sprintOn && !st.sprint.fullBase) updateState(chap.dir, (s) => { s.sprint.fullBase = Object.fromEntries(Object.entries(s.slots).map(([k, r]) => [k, r.fullChecks || 0])); }, meta(info, chap));
  const fullBase = sprintOn ? (readState(chap.dir, meta(info, chap)).sprint.fullBase || {}) : {};
  const fullCap = sprintOn ? (pol.sprint && pol.sprint.maxFullChecks) || 3 : pol.limits.maxFullChecksPerSlot || Infinity;
  const todo = [], cached = [], refused = [];
  for (const f of facts) {
    if (slots && !slots.includes(f.id)) continue;
    if (!fs.existsSync(path.join(f.dir, "tool.tsx"))) continue;
    const k = keyOf(f), rec = render ? f.status.checkCache : f.status.quickCache;
    if (!a.force && k && rec && rec.key === k.key && rec.pass) { cached.push(f.id); continue; }
    if (!slots && a.slots !== "all" && rec && k && rec.key === k.key) { cached.push(f.id); continue; } /* "changed": same key, even if it failed: nothing new to learn */
    if (render) {
      const q = f.status.quickCache, qk = (() => { try { return cacheKey({ classDir: info.dir, slotDir: f.dir, pol, toolHash: hashOf(f.dir), render: false }).key; } catch { return null; } })();
      if (!a.force && !(q && q.key === qk && q.pass)) { todo.push({ f, why: "quick first", quickFirst: true }); continue; }
      const n = ((st.slots[f.id] && st.slots[f.id].fullChecks) || 0) - (fullBase[f.id] || 0);
      if (n >= fullCap && !(a.over && String(a.over).length >= 8)) { refused.push(`${f.id} (${n} full checks ${sprintOn ? "this sprint" : "this build"} ≥ ${sprintOn ? "sprint.maxFullChecks" : "maxFullChecksPerSlot"} ${fullCap}; batch the fixes, then --over "why")`); continue; }
    }
    todo.push({ f, why: rec ? keyDiff(rec, k).join("+") || "failed before" : "never checked" });
  }
  out(`tier ${tier} ${chap.id}: ${todo.length} to run · ${cached.length} cached (key match)${refused.length ? ` · ${refused.length} refused` : ""}`);
  if (cached.length) { updateState(chap.dir, (s) => { s.counters.cachedChecks += cached.length; for (const id of cached) recordSkip(s, render ? "full check" : "quick check", id, "cache key matches (tool, runtime, checker, config, langs)", render ? 6000 : 1500); }, meta(info, chap)); out(`  cached: ${cached.join(", ")}`); }
  refused.forEach((r) => out("  refused " + r));
  const res = await pool(todo, render ? pol.checks.chromePool || 2 : 4, async (t) => {
    const args = ["check", t.f.id, "--ch", String(chap.ch)];
    if (!render || t.quickFirst) args.push("--no-render");
    const r = await runCli(info.dir, args);
    let fullAfter = null;
    if (t.quickFirst && r.code === 0) fullAfter = await runCli(info.dir, ["check", t.f.id, "--ch", String(chap.ch)]);
    return { t, r, fullAfter };
  });
  for (const { t, r, fullAfter } of res) {
    const pick = (o) => o.split("\n").filter((l) => /^\s+(FAIL|WARN)\s/.test(l) || /\d+ pass · \d+ warn · \d+ fail/.test(l) || /port failed|Error/.test(l)).slice(0, 6);
    const last = fullAfter || r;
    out(`  ${t.f.id} ${t.quickFirst ? (fullAfter ? "quick ok -> full" : "quick FAILED (no full render)") : t.why}: exit ${last.code}`);
    pick(last.out).forEach((l) => out("    " + l.trim().slice(0, 150)));
  }
}

/* ---------------- reviews ---------------- */
async function cmdReviewPlan() {
  const { info, pol, chap } = ctx();
  let plan = readJson(planFile(chap), null);
  if (!plan) { await cmdPlan(); plan = readJson(planFile(chap)); out(""); }
  const st = readState(chap.dir, meta(info, chap));
  const round = Number(a.round || (st.phase === "review" ? st.round : 1));
  const rp = reviewPlan({ pol, st, plan, chapterDir: chap.dir, round, measured: measure({ root: ROOT, classDir: info.dir, prefix: info.prefix }).cur });
  writeJsonAtomic(path.join(orchDir(chap.dir), "review-plan.json"), rp);
  updateState(chap.dir, (s) => { s.phase = "review"; s.round = round; for (const k of rp.skipped.filter((x) => x.role !== "all")) recordSkip(s, k.role, k.slot, k.reason, k.estTokens); }, meta(info, chap));
  out(`review round ${round} ${chap.id}`);
  if (rp.blocked.length) out(`  blocked (fix and check first): ${rp.blocked.map((b) => `${b.slot} ${b.why}`).join(" · ")}`);
  for (const [role, b] of Object.entries(rp.batches)) {
    if (!b.length) { out(`  ${role}: none`); continue; }
    const model = modelOf(pol, role);
    out(`  ${role} (${model}) ${b.length} launch(es): ${b.map((x) => Array.isArray(x) ? x.join("+") : `${x.slots.join("+")}[${x.mode}${x.chunks ? " ×" + x.chunks + " chunks" : ""}]`).join(" · ").slice(0, 300)}`);
  }
  if (rp.needsPack.length) out(`  packs to make first (node cli.mjs shots <ID> --ch ${chap.ch} --pack${round > 1 ? " --changed" : ""}): ${rp.needsPack.join(", ")}`);
  const saved = rp.skipped.reduce((s, x) => s + x.estTokens, 0);
  const why = {}; for (const x of rp.skipped) why[x.role + ": " + x.reason] = (why[x.role + ": " + x.reason] || 0) + 1;
  out(`  skipped ${rp.skipped.length} (≈${Math.round(saved / 1e6 * 10) / 10}M context tokens): ${Object.entries(why).slice(0, 6).map(([k, v]) => `${v}× ${k}`).join(" · ")}`);
  out(`  visual chunks: node orch.mjs chunks --slot ID --mode full|light|changed --chunk k · after each verdict: node orch.mjs review-done --slot ID --role R --verdict …`);
}

async function cmdReviewDone() {
  const { info, chap } = ctx();
  const id = String(a.slot || ""), role = String(a.role || ""), verdict = String(a.verdict || "");
  const KEY = { "maths-reviewer": "maths", "language-agent": "language", "visual-reviewer": "visual", "play-tester": "play" }[role];
  if (!KEY) throw new Error("--role maths-reviewer|language-agent|visual-reviewer|play-tester");
  if (!["pass", "fix", "fail"].includes(verdict)) throw new Error("--verdict pass|fix|fail");
  snapshot(chap.dir, id, KEY);
  updateState(chap.dir, (s) => {
    const r = slotRec(s, id);
    r.reviews[KEY] = { verdict, mode: a.mode && a.mode !== true ? String(a.mode) : null, round: s.round, toolSha: toolSha(path.join(chap.dir, id)), at: new Date().toISOString(), note: a.note && a.note !== true ? String(a.note).slice(0, 200) : undefined };
    if (verdict !== "pass" && a.note && a.note !== true) r.fails = capList([...(r.fails || []), `${KEY}: ${String(a.note).slice(0, 150)}`], 12);
  }, meta(info, chap));
  out(`${id} ${KEY} ${verdict} (snapshot kept: a later round re-reviews only what changes after this)`);
}

async function cmdDigest() {
  const { info, chap } = ctx();
  const id = String(a.slot || "");
  const slotDir = path.join(chap.dir, id);
  if (!fs.existsSync(path.join(slotDir, "tool.tsx"))) throw new Error(`${id}: no tool.tsx`);
  const d = a.strings ? await stringsDigest({ classDir: info.dir, slotDir }) : await mathsDigest({ classDir: info.dir, slotDir });
  out(d.text);
  out(`\n(digest hash ${d.hash})`);
}

async function cmdChunks() {
  const { info, pol, chap } = ctx();
  const id = String(a.slot || ""), mode = a.mode && a.mode !== true ? String(a.mode) : "full";
  const cp = chunkPlan(path.join(chap.dir, id), mode, pol);
  if (!cp) throw new Error(`${id}: no review pack (node cli.mjs shots ${id} --ch ${chap.ch} --pack)`);
  const slotRel = `class${info.n}/work/${chap.id}/${id}`;
  if (a.chunk === undefined) {
    out(`${id} pack: ${cp.total} frames · ${cp.skippedSame} identical skipped · ${mode}: ${cp.picked} frames in ${cp.chunks.length} chunk(s) of ≤${pol.review.visualChunkFrames}`);
    cp.chunks.forEach((c, i) => out(`  chunk ${i + 1}: ${c.length} frames, phases ${[...new Set(c.map((f) => f.phase ?? "start"))].join(",")}`));
    out(`list one: node ../orch.mjs chunks --class ${info.n} --ch ${chap.ch} --slot ${id} --mode ${mode} --chunk 1`);
    return;
  }
  const k = Number(a.chunk), c = cp.chunks[k - 1];
  if (!c) throw new Error(`chunk ${k} of ${cp.chunks.length}`);
  out(`${id} ${mode} chunk ${k}/${cp.chunks.length}: open each frame with Read, one at a time; write findings, never paste frames`);
  c.forEach((f) => out("  " + frameLine(slotRel, f)));
}

/* ---------------- images: dedupe inventory ---------------- */
async function cmdImages() {
  const { info, chap, ids } = ctx();
  const seen = new Map(), missing = [];
  for (const id of ids) {
    const j = readJson(path.join(chap.dir, id, "images.json"), null);
    if (!j) { missing.push(id); continue; }
    for (const im of j.images || []) {
      const k = [String(im.object || "").toLowerCase().trim(), j.style || "", im.kind || "", String(im.prompt || "").toLowerCase().replace(/\s+/g, " ").trim()].join("|");
      if (!seen.has(k)) seen.set(k, { key: im.key, object: im.object, slots: [] });
      seen.get(k).slots.push(id);
    }
  }
  const shared = [...seen.values()].filter((v) => v.slots.length > 1);
  const total = [...seen.values()].reduce((s, v) => s + v.slots.length, 0);
  out(`images ${chap.id}: ${total} picture uses · ${seen.size} unique · ${shared.length} shared by several slots`);
  shared.slice(0, 10).forEach((v) => out(`  ${String(v.object).slice(0, 40)} ×${v.slots.length}: ${v.slots.join(", ")}`));
  if (missing.length) out(`  no images.json yet (image agent, batched ${missing.length > 1 ? "several slots a launch" : "1"}): ${missing.join(", ")}`);
  out(`make them once for the whole chapter: node cli.mjs images make --ch ${chap.ch} --batch (each unique picture once; library and raw cache first)`);
}

/* ---------------- audit: deterministic publish dry runs ---------------- */
async function cmdAudit() {
  const { info, chap, ids } = ctx();
  const r = await runCli(info.dir, ["publish", "--ch", String(chap.ch)]);
  const lines = r.out.split("\n");
  out(`publish dry run (no --upload) ${chap.id}: exit ${r.code}`);
  lines.filter((l) => /\b(ok|failed|FAIL|refus|stale|summary|slots?)\b/i.test(l)).slice(0, 18).forEach((l) => out("  " + l.trim().slice(0, 150)));
  out("sidecar / status table:");
  for (const id of ids) {
    const s = readJson(path.join(chap.dir, id, "status.json"), {});
    const side = fs.existsSync(path.join(info.dir, "output-preview", `${id}.json`));
    out(`  ${id.padEnd(18)} stage ${String(s.stage || "-").padEnd(10)} checks ${s.checks ? `${s.checks.pass}/${s.checks.warn}/${s.checks.fail}` : "-"} · ported ${s.ported ? "y" : "n"} · hostsim ${s.hostsim && s.hostsim.ok ? "ok" : "-"} · sidecar ${side ? "y" : "n"}${s.handEdit ? " · HAND-EDITED" : ""}`);
  }
  out("the upload auditor reads THIS output (and the sidecar JSON by grep), never the tools; an upload still waits on the owner's word");
}

/* ---------------- resume / handoff ---------------- */
async function resumeText({ info, pol, chap, ids }) {
  const st = readState(chap.dir, meta(info, chap));
  const plan = readJson(planFile(chap), null), rp = readJson(path.join(orchDir(chap.dir), "review-plan.json"), null);
  const lvl = await sessionLevel({ root: ROOT, pol, estimate: false });
  const L = [`# HANDOFF ${chap.id} · class ${info.n} · ${new Date().toISOString().slice(0, 16)}`,
    `phase ${st.phase} · round ${st.round} · build ${st.build} · agents ${st.agents.filter((x) => x.build === st.build).length} (opus ${st.agents.filter((x) => x.build === st.build && x.model === "opus").length}) · checks full ${st.counters.fullChecks} quick ${st.counters.quickChecks} cached ${st.counters.cachedChecks} · session ${lvl.frac == null ? "?" : Math.round(lvl.frac * 100) + "%"}`];
  const run = running(st, pol.limits.staleAgentMinutes);
  if (run.length) L.push(`running when written (re-launch from its checkpoint if it never reported): ${run.map((x) => `${x.id}[${x.slots.join("+")}]`).join(" · ")}`);
  const fz = st.freezes.filter((f) => f.build === st.build && f.made), pins = st.pins.filter((p) => p.build === st.build);
  L.push(`runtime: pin ${readJson(path.join(chap.dir, "runtime.json"), {}).version || "NONE"} · freezes this build ${fz.map((f) => `${f.version}(${f.gate})`).join(", ") || "none"} · pins ${pins.map((p) => `${p.version || "head"}(${p.gate})`).join(", ") || "none"} · gaps ${st.gaps.length}`);
  L.push("slots (stage · last check · reviews · open):");
  for (const id of ids) {
    const r = st.slots[id] || { stage: "new", reviews: {}, fails: [], fixes: [] };
    const s = readJson(path.join(chap.dir, id, "status.json"), {});
    const rv = Object.entries(r.reviews || {}).map(([k, v]) => `${k[0]}${v.verdict === "pass" ? "✓" : "✗"}`).join("");
    const open = (r.fixes || []).length + (r.fails || []).length;
    L.push(`  ${id.padEnd(18)} ${String(r.stage).padEnd(9)} ${s.checks ? `${s.checks.pass}/${s.checks.warn}/${s.checks.fail}` : "-".padEnd(7)} ${rv || "-"}${open ? ` · ${open} open (orch/ckpt/${id}.md)` : ""}${plan && plan.slots[id] && plan.slots[id].rep ? " · rep" : ""}`);
  }
  const next = [];
  if (!plan) next.push(`node orch.mjs plan --class ${info.n} --ch ${chap.ch}`);
  else {
    const unbuilt = ids.filter((id) => !fs.existsSync(path.join(chap.dir, id, "tool.tsx")) || (st.slots[id] || {}).stage === "new" && plan.slots[id] && plan.slots[id].build === "needed");
    if (unbuilt.length) next.push(`build: ${unbuilt.join(", ")} (gate each launch; representatives first)`);
    const failing = ids.filter((id) => { const s = readJson(path.join(chap.dir, id, "status.json"), {}); return s.checks && s.checks.fail; });
    if (failing.length) next.push(`fix + checks: ${failing.join(", ")} (fixer from orch/ckpt/<slot>.md; orch checks --tier 1 then 2)`);
    if (rp) { const pend = Object.entries(rp.roles).flatMap(([role, xs]) => xs.filter((x) => { const k = { "maths-reviewer": "maths", "language-agent": "language", "visual-reviewer": "visual", "play-tester": "play" }[role]; const v = (st.slots[x.slot] || { reviews: {} }).reviews[k]; return !v || Date.parse(v.at) < Date.parse(rp.at); }).map((x) => `${role.split("-")[0]}:${x.slot}`)); if (pend.length) next.push(`review round ${rp.round} pending: ${pend.slice(0, 14).join(" ")}${pend.length > 14 ? " …" : ""}`); }
    else if (!unbuilt.length) next.push(`node orch.mjs review-plan --class ${info.n} --ch ${chap.ch}`);
  }
  if (st.questions.length) next.push(`owner questions: ${st.questions.slice(-3).join(" | ")}`);
  L.push("next:", ...next.map((x) => "  - " + x));
  L.push(`continue: read THIS file + the runbook's orchestrated flow; per slot read only orch/ckpt/<slot>.md; never reread transcripts or tool sources in the main session.`);
  return L.slice(0, 44).join("\n") + "\n";
}
async function cmdResume(write) {
  const c = ctx();
  const text = await resumeText(c);
  if (write) {
    fs.writeFileSync(path.join(orchDir(c.chap.dir), "HANDOFF.md"), text);
    updateState(c.chap.dir, (s) => { s.session.handoffAt = new Date().toISOString(); }, meta(c.info, c.chap));
  }
  out(text.trimEnd());
  if (write) out(`(wrote ${rel(path.join(orchDir(c.chap.dir), "HANDOFF.md"))})`);
}

async function cmdSession() {
  if (a.pct === undefined || a.pct === true) {
    const { pol } = a.class ? ctx({ needChapter: false }) : { pol: loadPolicy({ root: ROOT }) };
    const l = await sessionLevel({ root: ROOT, pol });
    out(`session ${l.frac == null ? "unknown" : Math.round(l.frac * 100) + "%"} · ${l.source}`);
    return;
  }
  setReading(ROOT, Number(a.pct));
  out(`recorded session ${Number(a.pct)}% (valid ${loadPolicy({ root: ROOT }).session.manualReadingTtlMinutes} min; the gate refuses Opus at stopExpensiveAt and checkpoints at checkpointAt)`);
}

async function cmdNewBuild() {
  const { info, chap } = ctx();
  if (!a.why || a.why === true || String(a.why).length < 8) throw new Error("--why \"<the remake's reason>\" (≥ 8 characters)");
  const s = updateState(chap.dir, (st) => { st.build++; st.round = 1; st.phase = "plan"; st.newBuildWhy = String(a.why); for (const r of Object.values(st.slots)) { r.fullChecks = 0; r.launches = {}; r.retries = {}; } }, meta(info, chap));
  out(`build ${s.build} of ${chap.id}: runtime gates, agent limits and retry counts restart; reviews and snapshots are kept (a re-review still sees only what changed)`);
}

/* ---------------- sprint: one tool, a wall-clock budget (orchestration.json "sprint"; runbook "Sprint mode") ---------------- */
function cmdSprint() {
  const { info, pol, chap } = ctx();
  const sp = pol.sprint || {}, sub = a._[0] || "status", hhmm = (t) => new Date(t).toTimeString().slice(0, 5);
  if (!Array.isArray(sp.stages) || !sp.stages.length) throw new Error("orchestration.json has no sprint.stages");
  if (sub === "start") {
    const minutes = Number(a.minutes) > 0 ? Number(a.minutes) : sp.budgetMinutes || 40;
    let startedAt = Date.now();
    if (a.at && a.at !== true) {  /* the clock began earlier (the owner asked at 13:06): --at HH:MM, today, not in the future */
      const m = /^(\d{1,2}):(\d{2})$/.exec(String(a.at));
      if (!m) throw new Error("--at HH:MM (24-hour, today)");
      const d = new Date(); d.setHours(+m[1], +m[2], 0, 0);
      if (d.getTime() > Date.now()) throw new Error("--at is in the future");
      startedAt = d.getTime();
    }
    /* --design: the owner keeps the Gemini pass; its stage is inserted after sp.designStage.after and every later deadline moves by its minutes */
    let plan = sp.stages.map((s) => ({ ...s })), base = sp.budgetMinutes || 40;
    if (a.design && sp.designStage) {
      const d = sp.designStage, at = plan.findIndex((s) => s.key === d.after);
      if (at < 0) throw new Error(`sprint.designStage.after "${d.after}" is not a stage`);
      for (let i = at + 1; i < plan.length; i++) plan[i].dueMin += d.minutes;
      plan.splice(at + 1, 0, { key: d.key, label: d.label, dueMin: plan[at].dueMin + d.minutes });
      base += d.minutes;
    }
    const scale = minutes === (sp.budgetMinutes || 40) ? 1 : minutes / base;  /* --minutes N scales the plan; no --minutes keeps the planned minutes */
    const total = a.design && !(Number(a.minutes) > 0) ? base : minutes;
    const stages = plan.map((s) => ({ key: s.key, label: s.label, dueMin: Math.max(1, Math.round(s.dueMin * scale)), doneAt: null }));
    const cx = a.complexity === "complex" ? "complex" : "simple";  /* sets the Opus cap for the sprint: sprint.opusAgents (3 simple, 4 complex); the gate's normal one-tool figure is 3 */
    if (a.complexity && a.complexity !== true && !["simple", "complex"].includes(a.complexity)) throw new Error("--complexity simple|complex");
    const opusCap = (sp.opusAgents || {})[cx];
    updateState(chap.dir, (s) => { s.sprint = { startedAt: new Date(startedAt).toISOString(), budgetMin: total, design: !!a.design, complexity: cx, limits: opusCap ? { maxOpusAgents: opusCap } : {}, slot: a.slot && a.slot !== true ? String(a.slot) : null, stages, fullBase: Object.fromEntries(Object.entries(s.slots).map(([k, r]) => [k, r.fullChecks || 0])), endedAt: null }; }, meta(info, chap));
  } else if (sub === "lap") {
    if (!a.stage || a.stage === true) throw new Error(`--stage <${sp.stages.map((s) => s.key).join("|")}>`);
    updateState(chap.dir, (s) => {
      const g = s.sprint && s.sprint.stages.find((x) => x.key === a.stage);
      if (!g) throw new Error(`no sprint stage "${a.stage}" (sprint start first)`);
      g.doneAt = new Date().toISOString();
    }, meta(info, chap));
  } else if (sub === "stop") {
    updateState(chap.dir, (s) => { if (s.sprint) s.sprint.endedAt = new Date().toISOString(); }, meta(info, chap));
  } else if (sub !== "status") throw new Error("node orch.mjs sprint start [--minutes 40] [--at HH:MM] [--slot ID] | lap --stage K | status | stop");
  const z = readState(chap.dir, meta(info, chap)).sprint;
  if (!z) { out("no sprint running (node orch.mjs sprint start --class N --ch n --slot ID [--at HH:MM])"); return; }
  const t0 = Date.parse(z.startedAt), end = z.endedAt ? Date.parse(z.endedAt) : Date.now();
  const used = Math.round((end - t0) / 60000), left = z.budgetMin - used;
  out(`sprint ${chap.id}${z.slot ? " " + z.slot : ""} · ${z.budgetMin} min${z.design ? " (with the design pass)" : ""} · ${z.complexity || "simple"}: up to ${(z.limits || {}).maxOpusAgents || "the normal"} Opus agents · started ${hhmm(t0)} · due ${hhmm(t0 + z.budgetMin * 60000)} · used ${used} min · ${z.endedAt ? "STOPPED" : left >= 0 ? left + " min left" : "OVER by " + -left + " min"}`);
  const next = z.stages.find((g) => !g.doneAt);
  for (const g of z.stages) {
    const late = !g.doneAt && used > g.dueMin;
    out(`  [${g.doneAt ? "x" : " "}] ${g.key.padEnd(7)} by ${hhmm(t0 + g.dueMin * 60000)} (+${String(g.dueMin).padStart(2)})  ${g.label}${g.doneAt ? "  (done " + hhmm(Date.parse(g.doneAt)) + ")" : late ? "  <- LATE" : g === next ? "  <- NOW" : ""}`);
  }
  if (!z.endedAt && next && used > next.dueMin) out(`LATE on "${next.key}": a review is never dropped to meet the clock; instead\n  ${(sp.ifLate || []).map((x, i) => `${i + 1}. ${x}`).join("\n  ")}\n  never cut: ${(sp.neverCut || []).join(" · ")}`);
  if (!z.endedAt && left < 0) out("OVER the budget: keep going on the open reviews, run `sprint stop` when done, and report the TRUE finish time and what ran late; do not hide it.");
}

const COMMANDS = { plan: cmdPlan, readlists: cmdReadlists, gate: cmdGate, done: cmdDone, report: cmdReport, checkpoint: cmdCheckpoint, diff: cmdDiff, checks: cmdChecks,
  "review-plan": cmdReviewPlan, "review-done": cmdReviewDone, digest: cmdDigest, chunks: cmdChunks, images: cmdImages, audit: cmdAudit,
  resume: () => cmdResume(false), handoff: () => cmdResume(true), session: cmdSession, "new-build": cmdNewBuild, sprint: cmdSprint };

if (!cmd || !COMMANDS[cmd] || a.help) {
  const head = fs.readFileSync(new URL(import.meta.url), "utf8").split("*/")[0];
  out(head.replace(/^#!.*\n\/\*\s?/, "").replace(/^ \* ?/gm, ""));
  process.exit(cmd && !cmd.startsWith("--") && !COMMANDS[cmd] ? 2 : 0);
}
try { await COMMANDS[cmd](); }
catch (e) { console.error(`orch ${cmd}: ${e.message}`); process.exit(1); }
