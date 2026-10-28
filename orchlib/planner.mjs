/* orchlib/planner: the chapter plan (orch plan) and each review round's plan (orch review-plan).
 *
 * plan         Tier 0 inventory (brief / tool / pin / images per slot), the changed-pattern map (groups, representatives,
 *              risk flags), the model and tier of every build launch, batch sizes chosen by the cost model, and the
 *              projected agent count against the chapter's limits. -> work/<chapter>/orch/plan.json
 * review-plan  what each slot needs THIS round, and why the rest is skipped:
 *                maths     every tool in round 1; later only a slot whose tool changed outside its TR table since its maths
 *                          pass (or that did not pass)
 *                language  every tool once its English is final; later only when printed English changed
 *                visual    every tool: the full pack in phase chunks (review.followerVisual is "full" since 2026-10-28, no visual
 *                          compromise; "light" would give a repeat of a reviewed pattern a reduced pass, upgraded to full on a
 *                          visual check-row WARN/FAIL or a new picture kind); a later round: only the changed frames
 *                play      a NEW pattern's representative and risky slots; later only named probes of a changed slot
 *              -> work/<chapter>/orch/review-plan.json, skips recorded in state.skipped with their token estimate */
import fs from "node:fs";
import path from "node:path";
import { slotsOf, readJson, sha, limitOf, modelOf } from "./config.mjs";
import { briefFeaturesOf, slotFacts, groupSlots, riskOf, interKey } from "./patterns.mjs";
import { measure, bestBatch, agentCost } from "./simulate.mjs";
import { diffLines } from "./textdiff.mjs";
import { topLevelRanges } from "./digest.mjs";
import { packExists } from "./chunks.mjs";

const tok = (b) => Math.round(b / 4);
const chunk = (arr, n) => { const out = []; for (let i = 0; i < arr.length; i += Math.max(1, n)) out.push(arr.slice(i, i + Math.max(1, n))); return out; };

export async function chapterFacts(info, chap) {
  const features = await briefFeaturesOf(info.dir);
  return slotsOf(chap.dir).map((id) => slotFacts(path.join(chap.dir, id), features));
}

export function tier0(info, chap, facts) {
  const pin = readJson(path.join(chap.dir, "runtime.json"), null);
  const rows = facts.map((s) => ({ id: s.id, brief: s.briefBytes > 0, tool: s.hasTool ? (s.scaffoldOnly ? "scaffold" : "built") : "none", images: s.images, stage: s.stage, lastCheck: s.checks ? `${s.checks.pass}/${s.checks.warn}/${s.checks.fail}` : null }));
  const problems = [];
  if (!pin) problems.push("no runtime pin (work/<chapter>/runtime.json): node cli.mjs runtime pin --ch N --gate step6 (or the first pin of a new chapter: --ungated \"first pin\")");
  for (const r of rows) if (!r.brief) problems.push(`${r.id}: no brief.md (re-run fetch)`);
  return { pin: pin ? pin.version : null, rows, problems };
}

export function buildPlan({ root, info, chap, pol, facts, st, prevReps = [] }) {
  const groups = groupSlots(facts, st, prevReps);
  const byId = Object.fromEntries(facts.map((f) => [f.id, f]));
  const slots = {};
  for (const g of groups) {
    const rep = byId[g.rep];
    for (const id of g.slots) {
      const s = byId[id], isRep = id === g.rep, risk = riskOf(s, rep, pol);
      const newRep = isRep && !g.known;
      const fullVisual = newRep || risk.some((r) => /^(new-picture|visual-warn)/.test(r));
      slots[id] = {
        group: g.g, pattern: g.key, rep: isRep, newPattern: newRep, risk,
        build: !s.hasTool || s.scaffoldOnly ? "needed" : "built",
        tier: newRep ? pol.routing.representativeBuilder : pol.routing.followerBuilder,
        visual: fullVisual ? "full" : pol.review.followerVisual,
        play: newRep || risk.some((r) => r.startsWith("interaction:")) || !!pol.review.playRepeats,
        brief: s.title, briefBytes: s.briefBytes, toolBytes: s.toolBytes,
      };
    }
  }
  /* batch sizes from the cost model, on this class's measured files */
  const m = measure({ root, classDir: info.dir, prefix: info.prefix }).cur;
  const E = pol.estimates, O = E.optimized, target = pol.contextBudget.targetTokens, Bt = pol.batching, W = E.windowTokens;
  const folBase = tok(m.builderAgent + m.preflight + m.layoutFollower + m.bcFollower + m.patterns + 2500);
  const followersToBuild = Object.entries(slots).filter(([, s]) => s.build === "needed" && s.tier !== "escalated").map(([id]) => id);
  const fb = bestBatch({ n: followersToBuild.length, base: folBase, perItem: tok(m.brief + m.tool), callsPerItem: O.builderFollower.calls, grow: O.builderFollower.grow, maxB: Bt.builderToolsPerAgent, target, window: W });
  const mb = bestBatch({ n: facts.length, base: tok(m.mathsAgent + O.maths.rulesKb * 1024), perItem: tok((O.maths.digestKb + O.maths.briefKb) * 1024), callsPerItem: O.maths.callsPerTool, grow: O.maths.grow, maxB: Bt.mathsToolsPerAgent, target, window: W });
  const lb = bestBatch({ n: facts.length, base: tok(m.languageAgent + O.language.rulesKb * 1024), perItem: tok(O.language.stringsKb * 1024), callsPerItem: O.language.callsPerTool, grow: O.language.grow, maxB: Bt.languageToolsPerAgent, target, window: W });
  const ib = bestBatch({ n: facts.length, base: tok(m.imageAgent + m.imagesDoc), perItem: tok(O.image.briefKb * 1024), callsPerItem: O.image.callsPerSlot, grow: O.image.grow, maxB: Bt.imageSlotsPerAgent, target, window: W });
  /* builder batches: representatives alone (escalated tier); followers of one group together, b at a time */
  const builder = [];
  for (const g of groups) {
    const ids = g.slots.filter((id) => slots[id].build === "needed");
    const reps = ids.filter((id) => slots[id].tier === "escalated"), fol = ids.filter((id) => slots[id].tier !== "escalated");
    for (const id of reps) builder.push({ slots: [id], tier: "escalated", group: g.g, why: "first tool of a new pattern" });
    for (const b of chunk(fol, fb.b || 1)) builder.push({ slots: b, tier: "base", group: g.g, why: `follows ${g.rep}` });
  }
  const ids = facts.map((f) => f.id);
  const batches = { builder, maths: chunk(ids, mb.b || 1), language: chunk(ids, lb.b || 1), image: chunk(ids.filter((id) => byId[id].images == null), ib.b || 1) };
  const T = facts.length, chunksPerPack = Math.max(1, Math.ceil(m.frames / pol.review.visualChunkFrames));
  const fullV = Object.values(slots).filter((s) => s.visual === "full").length, lightV = T - fullV;
  const projected = {
    builders: builder.length, fixers: Math.ceil(T * O.fixer.perTool), maths: batches.maths.length + Math.ceil(T * O.maths.round2Share / (mb.b || 1)),
    language: batches.language.length, image: batches.image.length, visual: fullV * chunksPerPack + Math.ceil(lightV / Bt.lightVisualToolsPerAgent) + Math.ceil(fullV * O.visual.round2Share * chunksPerPack),
    play: Object.values(slots).filter((s) => s.play).length, audit: 1, planner: 1,
  };
  projected.total = Object.values(projected).reduce((a, b) => a + b, 0);
  projected.opus = builder.filter((b) => modelOf(pol, "tool-builder", b.tier) === "opus").length + 1;
  projected.review = projected.maths + projected.language + projected.visual + projected.play;
  const limits = { maxAgentsPerChapter: limitOf(pol.limits.maxAgentsPerChapter, T), maxConcurrentOpus: limitOf(pol.limits.maxConcurrentOpus ?? 5, T), maxReviewAgents: limitOf(pol.limits.maxReviewAgents, T), maxConcurrent: pol.limits.maxConcurrent, maxRetryRounds: pol.limits.maxRetryRounds, escalations: limitOf(pol.escalation.maxPerChapter, T) };
  return { version: 1, at: new Date().toISOString(), chapter: chap.id, class: info.n, tools: T, groups, slots, batches, batchSizes: { followerBuilders: fb.b, maths: mb.b, language: lb.b, image: ib.b, lightVisual: Bt.lightVisualToolsPerAgent }, projected, limits, frames: m.frames, chunksPerPack };
}

/* ---------- review rounds ---------- */
export const snapDir = (chapterDir, id) => path.join(chapterDir, "orch", "snap", id);
export function snapshot(chapterDir, id, stage) {
  const src = path.join(chapterDir, id, "tool.tsx");
  if (!fs.existsSync(src)) return null;
  const d = snapDir(chapterDir, id);
  fs.mkdirSync(d, { recursive: true });
  fs.copyFileSync(src, path.join(d, `${stage}.tsx`));
  return path.join(d, `${stage}.tsx`);
}
export const toolSha = (slotDir) => (fs.existsSync(path.join(slotDir, "tool.tsx")) ? sha(fs.readFileSync(path.join(slotDir, "tool.tsx"), "utf8").replace(/\r\n/g, "\n")) : null);

/* the source with its TR table blanked: equal before/after = only translations changed */
export function withoutTR(src) {
  const R = topLevelRanges(src);
  if (!R.TR) return src;
  const lines = String(src).replace(/\r\n/g, "\n").split("\n");
  return lines.slice(0, R.TR[0] - 1).concat(["/*TR*/"], lines.slice(R.TR[1])).join("\n");
}

/* how the tool changed since the snapshot a review was made on: "same" | "tr-only" | { changed, added, removed } */
export function changeSince(chapterDir, id, stage) {
  const snap = path.join(snapDir(chapterDir, id), `${stage}.tsx`), cur = path.join(chapterDir, id, "tool.tsx");
  if (!fs.existsSync(snap) || !fs.existsSync(cur)) return { unknown: true };
  const a = fs.readFileSync(snap, "utf8").replace(/\r\n/g, "\n"), b = fs.readFileSync(cur, "utf8").replace(/\r\n/g, "\n");
  if (a === b) return "same";
  if (withoutTR(a) === withoutTR(b)) return "tr-only";
  const d = diffLines(a, b);
  return { changed: true, added: d.added, removed: d.removed };
}

export function reviewPlan({ pol, st, plan, chapterDir, round, measured }) {
  const out = { round, at: new Date().toISOString(), roles: { "maths-reviewer": [], "language-agent": [], "visual-reviewer": [], "play-tester": [] }, skipped: [], blocked: [] };
  const m = measured, E = pol.estimates.optimized;
  const est = {
    maths: agentCost({ start: tok(m.mathsAgent + (E.maths.rulesKb + E.maths.digestKb + E.maths.briefKb) * 1024), calls: E.maths.callsPerTool, grow: E.maths.grow }).sumCtx,
    language: agentCost({ start: tok(m.languageAgent + (E.language.rulesKb + E.language.stringsKb) * 1024), calls: E.language.callsPerTool, grow: E.language.grow }).sumCtx,
    visualFull: agentCost({ start: tok(m.visualAgent + E.visual.layoutKb * 1024 + m.reviewPack), calls: m.frames + E.visual.extraCalls, grow: E.visual.grow }).sumCtx,
    visualLight: agentCost({ start: tok(m.visualAgent + E.visual.layoutKb * 1024 + m.reviewPack), calls: E.visual.lightFrames + E.visual.extraCalls, grow: E.visual.grow }).sumCtx,
    play: agentCost({ start: tok(m.playAgent + m.playbook + 8000), calls: E.play.calls, grow: E.play.grow }).sumCtx,
  };
  const skip = (role, id, reason, tokens) => out.skipped.push({ role, slot: id, reason, estTokens: Math.round(tokens) });
  for (const [id, P] of Object.entries(plan.slots)) {
    const slotDir = path.join(chapterDir, id), rec = (st.slots[id] && st.slots[id].reviews) || {};
    if (!fs.existsSync(path.join(slotDir, "tool.tsx"))) { skip("all", id, "not built yet", 0); continue; }
    const status = readJson(path.join(slotDir, "status.json"), {});
    if (!status.checks || status.checks.fail) { out.blocked.push({ slot: id, why: status.checks ? `its last full check has ${status.checks.fail} FAIL` : "no full check yet (orch checks --tier 2)" }); continue; }
    /* maths */
    const mr = rec.maths;
    if (!mr) out.roles["maths-reviewer"].push({ slot: id, scope: "whole tool (digest + brief)", why: round === 1 ? "round 1: every tool" : "never reviewed" });
    else if (mr.verdict !== "pass") out.roles["maths-reviewer"].push({ slot: id, scope: "the findings of its last review + diff since", why: `last verdict ${mr.verdict}` });
    else {
      const c = changeSince(chapterDir, id, "maths");
      if (c === "same") skip("maths-reviewer", id, "unchanged since its maths pass", est.maths);
      else if (c === "tr-only") skip("maths-reviewer", id, "only the TR table changed since its maths pass", est.maths);
      else out.roles["maths-reviewer"].push({ slot: id, scope: "orch diff --since maths", why: c.unknown ? "no snapshot of the reviewed source" : `changed +${c.added}/-${c.removed} lines outside TR` });
    }
    /* language */
    const lr = rec.language;
    if (!lr) out.roles["language-agent"].push({ slot: id, scope: "orch digest --strings", why: "never passed" });
    else if (lr.verdict !== "pass") out.roles["language-agent"].push({ slot: id, scope: "orch digest --strings (missing and flagged lines)", why: `last verdict ${lr.verdict}` });
    else {
      const c = changeSince(chapterDir, id, "language");
      if (c === "same" || c === "tr-only") skip("language-agent", id, c === "same" ? "unchanged since its language pass" : "only TR changed since (tr-coverage in check judges it)", est.language);
      else out.roles["language-agent"].push({ slot: id, scope: "orch digest --strings", why: "the English may have changed" });
    }
    /* visual */
    const vr = rec.visual, hasPack = packExists(slotDir);
    if (!vr) out.roles["visual-reviewer"].push({ slot: id, mode: P.visual, pack: hasPack, why: P.visual === "full" ? (P.newPattern ? "new pattern representative" : `upgraded: ${P.risk.filter((r) => /^(new-picture|visual-warn)/.test(r)).join(", ")}`) : `repeat of ${plan.groups.find((g) => g.g === P.group).rep}` });
    else {
      const c = changeSince(chapterDir, id, "visual");
      if (c === "same") skip("visual-reviewer", id, "unchanged since its visual pass", vr.mode === "full" ? est.visualFull : est.visualLight);
      else if (vr.verdict !== "pass" || c !== "tr-only" || P.visual === "full") out.roles["visual-reviewer"].push({ slot: id, mode: P.risk.some((r) => r.startsWith("visual-warn")) ? "full" : "changed", pack: hasPack, why: vr.verdict !== "pass" ? `last verdict ${vr.verdict}: changed frames + its findings` : "changed frames only" });
      else out.roles["visual-reviewer"].push({ slot: id, mode: "changed", pack: hasPack, why: "TR changed: the hi/gu fit frames that changed" });
      if (c !== "same") skip("visual-reviewer", id, "only changed frames re-reviewed (not the whole pack)", Math.max(0, (vr.mode === "full" ? est.visualFull : est.visualLight) - est.visualLight));
    }
    /* play */
    const pr = rec.play;
    if (!P.play && !pr) skip("play-tester", id, `repeat of an unchanged pattern (${P.pattern}); the full check's real-input drives cover it`, est.play);
    else if (!pr) out.roles["play-tester"].push({ slot: id, scope: "full play", why: P.newPattern ? "new pattern representative" : `risk: ${P.risk.join(", ")}` });
    else if (pr.verdict !== "pass") out.roles["play-tester"].push({ slot: id, scope: "the failed probes of its last report", why: `last verdict ${pr.verdict}` });
    else {
      const c = changeSince(chapterDir, id, "play");
      if (c === "same" || c === "tr-only") skip("play-tester", id, "unchanged interaction since its play pass", est.play);
      else if (P.rep || P.risk.length) out.roles["play-tester"].push({ slot: id, scope: "named probes on the changed ranges", why: "changed and risky" });
      else skip("play-tester", id, "changed, low risk: the full check's drives re-prove it", est.play);
    }
  }
  /* batches */
  const Bt = pol.batching;
  const fullV = out.roles["visual-reviewer"].filter((x) => x.mode === "full"), otherV = out.roles["visual-reviewer"].filter((x) => x.mode !== "full");
  out.batches = {
    "maths-reviewer": chunk(out.roles["maths-reviewer"].map((x) => x.slot), Bt.mathsToolsPerAgent),
    "language-agent": chunk(out.roles["language-agent"].map((x) => x.slot), Bt.languageToolsPerAgent),
    "visual-reviewer": fullV.map((x) => ({ slots: [x.slot], mode: "full", chunks: plan.chunksPerPack })).concat(chunk(otherV.map((x) => x.slot), Bt.lightVisualToolsPerAgent).map((s) => ({ slots: s, mode: otherV.find((x) => x.slot === s[0]).mode }))),
    "play-tester": chunk(out.roles["play-tester"].map((x) => x.slot), Bt.playToolsPerAgent),
  };
  out.needsPack = out.roles["visual-reviewer"].filter((x) => !x.pack).map((x) => x.slot);
  return out;
}

export { interKey };
