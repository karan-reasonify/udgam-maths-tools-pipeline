/* orchlib/simulate: the token cost model of a chapter build, baseline flow vs the orchestrated flow.
 *
 * Every call of an agent re-reads its whole context, so an agent that starts at S tokens and gains g a call costs
 * Σctx = Σ min(S + g·i, window) over its calls: quadratic in the reads it keeps. Start sizes are MEASURED from the class's
 * files (agent files, docs, average tool.tsx and brief.md, a real pack.json); calls and growth are MODEL ASSUMPTIONS from
 * orchestration.json `estimates` (calibrate them with `usage.mjs simulate --from <usage report>` once real transcripts exist).
 * USD uses usage.pricing.json (list prices; a null price is never guessed: that role's USD is left out and said so). */
import fs from "node:fs";
import path from "node:path";
import { readJson } from "./config.mjs";

export const IMAGE_TOKENS = Math.round(1568 * 882 / 750); /* a 1600x900 frame after the API's long-edge resize to 1568 */
const tok = (bytes) => Math.round(bytes / 4);

export function agentCost({ start, calls, grow, window = 190000, outputPerCall = 450 }) {
  let sum = 0, ctx = start, max = 0;
  for (let i = 0; i < calls; i++) { ctx = Math.min(start + grow * i, window); sum += ctx; max = Math.max(max, ctx); }
  return { sumCtx: Math.round(sum), output: Math.round(calls * outputPerCall), cacheWrite: Math.round(Math.min(start + grow * calls, window)), maxCtx: Math.round(max), calls };
}

/* the batch size b (1..maxB) with the lowest total cost whose every agent stays under target */
export function bestBatch({ n, base, perItem, callsPerItem, grow, maxB = 1, target = 100000, window, outputPerCall }) {
  if (n <= 0) return { b: 0, agents: 0, cost: agentCost({ start: 0, calls: 0, grow: 0 }) };
  let best = null;
  for (let b = 1; b <= Math.max(1, maxB); b++) {
    const agents = Math.ceil(n / b), start = base + b * perItem, calls = b * callsPerItem;
    if (b > 1 && start + grow * calls > target) break;
    const one = agentCost({ start, calls, grow, window, outputPerCall });
    const tot = { sumCtx: one.sumCtx * agents, output: one.output * agents, cacheWrite: one.cacheWrite * agents, maxCtx: one.maxCtx, calls: one.calls * agents };
    if (!best || tot.sumCtx < best.cost.sumCtx) best = { b, agents, cost: tot };
  }
  return best;
}

/* ---------- measurement ---------- */
const sz = (f) => (fs.existsSync(f) ? fs.statSync(f).size : 0);
function avgSizes(classDir, file) {
  const work = path.join(classDir, "work"), out = [];
  if (!fs.existsSync(work)) return 0;
  for (const c of fs.readdirSync(work)) {
    const cd = path.join(work, c);
    if (!fs.statSync(cd).isDirectory()) continue;
    for (const s of fs.readdirSync(cd)) { const f = path.join(cd, s, file); if (/^M\d/.test(s) && fs.existsSync(f)) out.push(fs.statSync(f).size); }
  }
  return out.length ? Math.round(out.reduce((a, b) => a + b, 0) / out.length) : 0;
}
function bcSlice(file, { dropSections = [] } = {}) {
  if (!fs.existsSync(file)) return 0;
  const lines = fs.readFileSync(file, "utf8").split("\n");
  const i7 = lines.findIndex((l) => /^## 7\./.test(l));
  let keep = lines.slice(0, i7 > 0 ? i7 : lines.length), out = [], drop = false;
  for (const l of keep) { if (/^## /.test(l)) drop = dropSections.some((n) => l.startsWith(`## ${n}.`)); if (!drop) out.push(l); }
  return Buffer.byteLength(out.join("\n"));
}
function packFrames(classDir) {
  const work = path.join(classDir, "work");
  if (!fs.existsSync(work)) return 111;
  for (const c of fs.readdirSync(work)) for (const s of fs.existsSync(path.join(work, c)) && fs.statSync(path.join(work, c)).isDirectory() ? fs.readdirSync(path.join(work, c)) : []) {
    const pj = path.join(work, c, s, "pack", "pack.json");
    if (fs.existsSync(pj)) { const j = readJson(pj, null); if (j && Array.isArray(j.frames) && j.frames.length) return j.frames.length; }
  }
  return 111;
}

/* sizes in bytes; `baseline` reads usage-reports/baseline.static.json when it exists (the files as they were before) */
export function measure({ root, classDir, prefix, followerLayoutBytes = null, baselineFile = path.join(root, "usage-reports", "baseline.static.json") }) {
  const docs = (n) => path.join(classDir, "docs", n);
  const agent = (r) => path.join(root, ".claude", "agents", `${prefix}-${r}.md`);
  const cur = {
    claude: sz(path.join(root, "CLAUDE.md")), runbook: sz(path.join(root, "udgam_maths_claude.md")),
    builderAgent: sz(agent("tool-builder")), mathsAgent: sz(agent("maths-reviewer")), visualAgent: sz(agent("visual-reviewer")), playAgent: sz(agent("play-tester")),
    imageAgent: sz(agent("image-agent")), auditAgent: sz(agent("upload-auditor")), languageAgent: sz(agent("language-agent")), plannerAgent: sz(agent("planner")),
    preflight: sz(docs("PREFLIGHT.md")), layout: sz(docs("LAYOUT.md")), bc16: bcSlice(docs("BUILD_CARD.md")), bcFollower: bcSlice(docs("BUILD_CARD.md"), { dropSections: ["2", "5"] }),
    bcWhole: sz(docs("BUILD_CARD.md")), patterns: Math.round(sz(docs("PATTERNS.md")) * 0.45), reviewPack: sz(docs("REVIEW_PACK.md")), playbook: sz(docs("PLAYBOOK.md")),
    imagesDoc: sz(docs("IMAGES.md")), tool: avgSizes(classDir, "tool.tsx") || 95000, brief: avgSizes(classDir, "brief.md") || 15000, frames: packFrames(classDir),
  };
  cur.layoutFollower = followerLayoutBytes || Math.round(cur.layout * 0.85);
  const b = readJson(baselineFile, null);
  const base = { ...cur };
  if (b) {
    base.claude = b.root["CLAUDE.md"] || cur.claude; base.runbook = b.root["udgam_maths_claude.md"] || cur.runbook;
    for (const [k, r] of [["builderAgent", "tool-builder"], ["mathsAgent", "maths-reviewer"], ["visualAgent", "visual-reviewer"], ["playAgent", "play-tester"], ["imageAgent", "image-agent"], ["auditAgent", "upload-auditor"]])
      base[k] = b.agents[`${prefix}-${r}.md`] || cur[k];
  }
  return { base, cur, baselineFrom: b ? path.relative(root, baselineFile) : "current files (no baseline snapshot)" };
}

/* ---------- the two flows ---------- */
function add(roles, role, model, agents, c) {
  const r = (roles[role] ||= { model, agents: 0, sumCtx: 0, output: 0, cacheWrite: 0, maxCtx: 0, calls: 0 });
  r.agents += agents; r.sumCtx += c.sumCtx; r.output += c.output; r.cacheWrite += c.cacheWrite; r.calls += c.calls; r.maxCtx = Math.max(r.maxCtx, c.maxCtx);
}
const times = (c, k) => ({ sumCtx: c.sumCtx * k, output: c.output * k, cacheWrite: c.cacheWrite * k, maxCtx: c.maxCtx, calls: c.calls * k });

export function baselineFlow({ tools, m, E, window, opc }) {
  const B = E.baseline, roles = {}, OH = E.agentOverheadTokens || 0, A = (o) => agentCost({ window, outputPerCall: opc, ...o, start: o.start + OH });
  const bStart = tok(m.builderAgent + m.preflight + m.layout + m.bc16 + m.patterns + m.brief + m.tool);
  add(roles, "tool-builder", "opus", tools, times(A({ start: bStart, calls: B.builder.calls + B.builder.langCalls + B.builder.fixRounds * B.builder.fixCalls, grow: B.builder.grow }), tools));
  const mStart = tok(m.mathsAgent + m.bcWhole + m.brief + m.tool);
  add(roles, "maths-reviewer", "sonnet", tools * B.maths.rounds, times(A({ start: mStart, calls: B.maths.calls, grow: B.maths.grow }), tools * B.maths.rounds));
  const vStart = tok(m.visualAgent + m.layout + m.reviewPack + m.brief + 7000);
  add(roles, "visual-reviewer", "sonnet", tools, times(A({ start: vStart, calls: m.frames + B.visual.extraCalls, grow: B.visual.grow }), tools));
  add(roles, "visual-reviewer", "sonnet", tools, times(A({ start: vStart, calls: Math.round(m.frames * B.visual.round2Share) + 5, grow: B.visual.grow }), tools));
  const pStart = tok(m.playAgent + m.playbook + 8000 + m.brief / 2);
  add(roles, "play-tester", "sonnet", tools, times(A({ start: pStart, calls: B.play.calls, grow: B.play.grow }), tools));
  add(roles, "play-tester", "sonnet", tools, times(A({ start: pStart, calls: B.play.round2Calls, grow: B.play.grow }), tools));
  add(roles, "image-agent", "sonnet", tools, times(A({ start: tok(m.imageAgent + m.imagesDoc + m.brief), calls: B.image.calls, grow: B.image.grow }), tools));
  add(roles, "upload-auditor", "haiku", 1, A({ start: tok(m.auditAgent) + 5000, calls: B.audit.calls, grow: B.audit.grow }));
  add(roles, "main", "opus", 0, A({ start: tok(m.claude + m.runbook) + B.main.startExtra, calls: B.main.callsPerTool * tools + B.main.chapterCalls, grow: B.main.grow }));
  return roles;
}

export function optimizedFlow({ tools, m, E, pol, window, opc }) {
  const O = E.optimized, roles = {}, OH = E.agentOverheadTokens || 0, A = (o) => agentCost({ window, outputPerCall: opc, ...o, start: o.start + OH }), target = pol.contextBudget.targetTokens, Bt = pol.batching;
  const groups = Math.min(tools, Math.max(1, Math.ceil(tools * O.groupsPerTools))), followers = tools - groups;
  const repStart = tok(m.builderAgent + m.preflight + m.layout + m.bc16 + m.patterns + m.brief + m.tool + 2000);
  add(roles, "tool-builder-escalated", "opus", groups, times(A({ start: repStart, calls: O.builderRep.calls, grow: O.builderRep.grow }), groups));
  const folBase = OH + tok(m.builderAgent + m.preflight + m.layoutFollower + m.bcFollower + m.patterns + 2500);
  const fol = bestBatch({ n: followers, base: folBase, perItem: tok(m.brief + m.tool), callsPerItem: O.builderFollower.calls, grow: O.builderFollower.grow, maxB: Bt.builderToolsPerAgent, target, window, outputPerCall: opc });
  add(roles, "tool-builder", "sonnet", fol.agents, fol.cost);
  const fixers = Math.round(tools * O.fixer.perTool);
  add(roles, "tool-builder (fixer)", "sonnet", fixers, times(A({ start: tok(m.builderAgent + m.tool + 2000 + 20000), calls: O.fixer.calls, grow: O.fixer.grow }), fixers));
  const mb = bestBatch({ n: tools, base: OH + tok(m.mathsAgent + O.maths.rulesKb * 1024), perItem: tok((O.maths.digestKb + O.maths.briefKb) * 1024), callsPerItem: O.maths.callsPerTool, grow: O.maths.grow, maxB: Bt.mathsToolsPerAgent, target, window, outputPerCall: opc });
  add(roles, "maths-reviewer", "sonnet", mb.agents, mb.cost);
  const m2 = bestBatch({ n: Math.round(tools * O.maths.round2Share), base: OH + tok(m.mathsAgent + O.maths.rulesKb * 1024), perItem: tok((O.maths.digestKb / 2 + 2) * 1024), callsPerItem: Math.ceil(O.maths.callsPerTool / 2), grow: O.maths.grow, maxB: Bt.mathsToolsPerAgent, target, window, outputPerCall: opc });
  add(roles, "maths-reviewer", "sonnet", m2.agents, m2.cost);
  const lb = bestBatch({ n: tools, base: OH + tok(m.languageAgent + O.language.rulesKb * 1024), perItem: tok(O.language.stringsKb * 1024), callsPerItem: O.language.callsPerTool, grow: O.language.grow, maxB: Bt.languageToolsPerAgent, target, window, outputPerCall: opc });
  add(roles, "language-agent", "sonnet", lb.agents, lb.cost);
  const ib = bestBatch({ n: tools, base: OH + tok(m.imageAgent + m.imagesDoc), perItem: tok(O.image.briefKb * 1024), callsPerItem: O.image.callsPerSlot, grow: O.image.grow, maxB: Bt.imageSlotsPerAgent, target, window, outputPerCall: opc });
  add(roles, "image-agent", "sonnet", ib.agents, ib.cost);
  const cap = pol.review.visualChunkFrames, chunks = Math.max(1, Math.ceil(m.frames / cap)), perChunk = Math.ceil(m.frames / chunks);
  const vBase = tok(m.visualAgent + O.visual.layoutKb * 1024 + m.reviewPack + 8000);
  add(roles, "visual-reviewer (full, chunked)", "sonnet", groups * chunks, times(A({ start: vBase, calls: perChunk + O.visual.extraCalls, grow: O.visual.grow }), groups * chunks));
  const lv = bestBatch({ n: followers, base: OH + vBase, perItem: 0, callsPerItem: O.visual.lightFrames + O.visual.extraCalls, grow: O.visual.grow, maxB: Bt.lightVisualToolsPerAgent, target, window, outputPerCall: opc });
  add(roles, "visual-reviewer (light)", "sonnet", lv.agents, lv.cost);
  const r2frames = Math.round((groups * m.frames + followers * O.visual.lightFrames) * O.visual.round2Share), r2chunks = Math.ceil(r2frames / cap);
  if (r2chunks) add(roles, "visual-reviewer (changed)", "sonnet", r2chunks, times(A({ start: vBase, calls: Math.ceil(r2frames / r2chunks) + O.visual.extraCalls, grow: O.visual.grow }), r2chunks));
  const plays = groups + Math.round(followers * O.play.riskyFollowerShare);
  add(roles, "play-tester", "sonnet", plays, times(A({ start: tok(m.playAgent + m.playbook + 8000 + m.brief / 2), calls: O.play.calls, grow: O.play.grow }), plays));
  add(roles, "planner", "opus", 1, A({ start: tok(m.plannerAgent + 30000), calls: 25, grow: 900 }));
  add(roles, "upload-auditor", "haiku", 1, A({ start: tok(m.auditAgent) + 3000, calls: O.audit.calls, grow: O.audit.grow }));
  const mainCalls = O.main.callsPerTool * tools + O.main.chapterCalls, per = Math.ceil(mainCalls / O.main.sessions);
  add(roles, "main", pol.models.main || "sonnet", 0, times(A({ start: tok(m.claude + m.runbook) + O.main.startExtra, calls: per, grow: O.main.grow }), O.main.sessions));
  return { roles, groups, followers, chunks, batches: { followerBuilders: fol.b, maths: mb.b, language: lb.b, image: ib.b, lightVisual: lv.b } };
}

/* ---------- pricing ---------- */
export function priceRoles(roles, pricing) {
  const P = (pricing && pricing.models) || {};
  const full = (alias) => Object.keys(P).find((k) => k.includes(alias));
  let total = 0, missing = [];
  for (const [name, r] of Object.entries(roles)) {
    const p = P[full(r.model)];
    if (!p || [p.cacheRead, p.output, p.cacheWrite5m].some((x) => x == null)) { r.usd = null; missing.push(name); continue; }
    r.usd = (r.sumCtx * p.cacheRead + r.output * p.output + r.cacheWrite * p.cacheWrite5m) / 1e6;
    total += r.usd;
  }
  return { total, missing };
}
export const sumRoles = (roles) => Object.values(roles).reduce((a, r) => ({ sumCtx: a.sumCtx + r.sumCtx, output: a.output + r.output, cacheWrite: a.cacheWrite + r.cacheWrite, agents: a.agents + r.agents, opusCtx: a.opusCtx + (r.model === "opus" ? r.sumCtx : 0) }), { sumCtx: 0, output: 0, cacheWrite: 0, agents: 0, opusCtx: 0 });
