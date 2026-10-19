/* orchlib/patterns: the chapter's changed-pattern map. Every slot gets an interaction signature (what the child does and
 * how the answer is entered) and a visual signature (what the picture is made of). Slots with the same interaction
 * signature form a pattern group; the group's representative is built on the escalated tier and reviewed in full
 * (visual pack + play test); the other members follow its pattern packet and get the deduplicated review.
 * Sources, all deterministic: brief.md (the class's own briefFeatures + control verbs), tool.tsx once it exists (a few
 * greps), images.json once the image pass wrote it, and status.json (check rows). Nothing here is a verdict: a pointer
 * for the plan; `review.followerVisual` and the risk flags decide how much review a slot gets. */
import fs from "node:fs";
import path from "node:path";
import { classLib, readJson, sha } from "./config.mjs";

const SECTION = (t, name) => { const m = new RegExp(`^## ${name}[^\\n]*\\n([\\s\\S]*?)(?=^## |$(?![\\s\\S]))`, "m").exec(t); return m ? m[1] : ""; };
const VERBS = ["drag", "tap", "type", "choose", "cut", "split", "shade", "measure", "pour", "weigh", "count", "turn", "rotate", "slide", "fold", "fill", "match", "sort", "draw", "plot", "trade", "group", "share"];
const PICTURES = { clock: /\bclock|hands? of the clock\b/i, grid: /\bgrids?\b|hundred square|10 ?x ?10/i, "number-line": /number lines?/i, "bar-graph": /bar graphs?/i, pictograph: /pictographs?/i, tally: /\btally\b/i,
  scale: /\b(weighing )?scales?\b|balance/i, ruler: /\brulers?\b/i, money: /\bcoins?\b|\bnotes?\b|rupees?|₹/i, "place-value": /place[- ]value|abacus/i, array: /\barrays?\b/i, net: /\bnets?\b/i,
  angle: /\bangles?\b/i, shape: /\b(polygon|triangle|square|rectangle|circle)s?\b/i, calendar: /calendar/i, container: /\b(jug|beaker|bottle|bucket|tank|cup|glass)s?\b/i, fraction: /fraction (bars?|strips?|circles?|walls?)/i };
const TOOL_TOKENS = [["drag", /\buseDrag\b|drag\.bind\(/], ["fraction-card", /SLOT_FRACTION|SLOT_MIXED/], ["decimal-card", /SLOT_DECIMAL/], ["point-key", /pointKey:\s*true/],
  ["two-box", /parts:\s*\[\s*\{\s*label/], ["choice", /\bchoices:\s*\[/], ["act", /\bapi\.act\(/], ["steps", /\bsteps:\s*\[/], ["card-answer", /cardAnswer:\s*true/], ["narrow-pad", /bigPad:\s*false/], ["enter-pad", /pad:\s*"enter"/]];
const stripComments = (s) => String(s).replace(/\/\*[\s\S]*?\*\/|(^|[^:"'`\\])\/\/[^\n]*/g, "$1");

export async function briefFeaturesOf(classDir) {
  try { const m = await classLib(classDir, "lib/build/readlist.mjs"); if (typeof m.briefFeatures === "function") return m.briefFeatures; } catch { /* an older class */ }
  return (t) => ({ fraction: /fraction/i.test(t), decimal: /decimal/i.test(t), money: /rupee|₹/i.test(t), twoBoxes: /remainder|two boxes/i.test(t), drag: /\bdrag/i.test(t), objects: [] });
}

export function slotFacts(slotDir, features) {
  const brief = fs.existsSync(path.join(slotDir, "brief.md")) ? fs.readFileSync(path.join(slotDir, "brief.md"), "utf8") : "";
  const toolFile = path.join(slotDir, "tool.tsx");
  const tool = fs.existsSync(toolFile) ? fs.readFileSync(toolFile, "utf8") : "";
  const status = readJson(path.join(slotDir, "status.json"), {});
  const images = readJson(path.join(slotDir, "images.json"), null);
  const f = features(brief);
  /* the answer and control sections only: a textbook excerpt that mentions fractions does not make the tool a fraction tool */
  const answerText = [SECTION(brief, "Answer key"), SECTION(brief, "Student controls"), SECTION(brief, "Phases"), SECTION(brief, "For the child")].join("\n");
  const fa = answerText.trim() ? features(answerText) : f;
  const controls = [SECTION(brief, "Student controls"), SECTION(brief, "For the child"), SECTION(brief, "What it is")].join("\n").toLowerCase();
  const look = [SECTION(brief, "Look"), SECTION(brief, "Stage"), SECTION(brief, "What it is"), SECTION(brief, "Description")].join("\n");
  const inter = new Set(), verbs = new Set();
  const bare = stripComments(tool);
  if (bare.trim() && /\bfunction\s+Work\b/.test(bare)) { for (const [k, re] of TOOL_TOKENS) if (re.test(bare)) inter.add(k); }
  else {
    for (const k of ["fraction", "decimal", "money", "twoBoxes", "drag"]) if (fa[k]) inter.add({ fraction: "fraction-card", decimal: "point-key", money: "point-key", twoBoxes: "two-box", drag: "drag" }[k]);
    if (/\b(choose|pick|which of|tap the (right|correct))\b/i.test(answerText)) inter.add("choice");
  }
  for (const v of VERBS) if (new RegExp(`\\b${v}(s|es|ed|ing)?\\b`).test(controls)) verbs.add("v:" + v);
  const vis = new Set((f.objects || []).map((o) => "o:" + o));
  for (const [k, re] of Object.entries(PICTURES)) if (re.test(look)) vis.add("p:" + k);
  if (images && Array.isArray(images.images)) for (const im of images.images) { if (im && im.object) vis.add("o:" + String(im.object).toLowerCase()); if (im && im.kind) vis.add("k:" + im.kind); }
  const title = (/^#\s+(.+)$/m.exec(brief) || [])[1] || "";
  return {
    id: path.basename(slotDir), dir: slotDir, title: title.slice(0, 60),
    hasTool: !!tool, toolBytes: tool.length, briefBytes: brief.length, scaffoldOnly: !!tool && !/\bfunction\s+Work\b[\s\S]{400,}/.test(tool),
    inter: [...inter].sort(), verbs: [...verbs].sort(), vis: [...vis].sort(), images: images ? (images.images || []).length : null,
    stage: status.stage || null, checks: status.checks || null, checkCache: status.checkCache || null, quickCache: status.quickCache || null,
    handEdit: !!status.handEdit,
  };
}

/* the interaction signature: the answer and input kinds; kinds every tool has (the plain pad, guide steps) are dropped */
const COMMON = new Set(["steps", "enter-pad"]);
export const interSet = (s) => s.inter.filter((t) => !COMMON.has(t));
export const interKey = (s) => interSet(s).join(",") || "plain";

/* groups: { g, key, slots: [ids], rep, known }. A slot follows a representative whose kinds COVER its own (every answer and
   input kind it uses was already built and fully reviewed on the representative); otherwise it starts a new group. Seeds,
   kept stable across re-plans: a slot already fully reviewed (visual full + play) and the representatives of the previous
   plan; then the remaining slots, the ones with the most kinds first (they cover the most). */
export function groupSlots(facts, st = { slots: {} }, prevReps = []) {
  const byId = new Map(facts.map((s) => [s.id, s]));
  const reviewed = (id) => { const r = st.slots && st.slots[id] && st.slots[id].reviews; return !!(r && r.visual && r.visual.mode === "full" && r.play); };
  const groups = [];
  const covers = (rep, s) => interSet(s).every((t) => interSet(rep).includes(t));
  const seed = (id, known) => groups.push({ g: "G" + (groups.length + 1), rep: id, known, slots: [id], key: interKey(byId.get(id)) });
  const seeds = [...facts.filter((s) => reviewed(s.id)).map((s) => s.id), ...prevReps.filter((id) => byId.has(id))];
  for (const id of [...new Set(seeds)]) if (!groups.some((g) => covers(byId.get(g.rep), byId.get(id)))) seed(id, reviewed(id)); else groups.find((g) => covers(byId.get(g.rep), byId.get(id))).slots.push(id);
  const rest = facts.filter((s) => !groups.some((g) => g.slots.includes(s.id))).sort((a, b) => interSet(b).length - interSet(a).length || a.id.localeCompare(b.id));
  for (const s of rest) { const g = groups.find((x) => covers(byId.get(x.rep), s)); if (g) g.slots.push(s.id); else seed(s.id, false); }
  for (const g of groups) g.slots.sort();
  return groups;
}

export function riskOf(s, rep, pol) {
  const flags = [];
  const hi = new Set((pol.review && pol.review.highRiskInteraction) || []);
  const novel = s.id === rep.id ? s.inter.filter((t) => hi.has(t)) : s.inter.filter((t) => hi.has(t) && !rep.inter.includes(t));
  if (novel.length) flags.push("interaction:" + novel.join("+"));
  const newVis = s.id === rep.id ? [] : s.vis.filter((t) => !rep.vis.includes(t) && !t.startsWith("o:"));
  if (newVis.length) flags.push("new-picture:" + newVis.join("+"));
  const newObj = s.id === rep.id ? [] : s.vis.filter((t) => t.startsWith("o:") && !rep.vis.includes(t));
  if (newObj.length) flags.push("new-object:" + newObj.join("+"));
  if (s.toolBytes > 120 * 1024) flags.push("large-tool");
  const warnRows = visualWarns(s, pol);
  if (warnRows.length) flags.push("visual-warn:" + warnRows.join("+"));
  return flags;
}

/* the visual check rows that did not pass in the slot's last full check (.build/check.json, read in node, never by an agent) */
export function visualWarns(s, pol) {
  const f = path.join(s.dir, ".build", "check.json");
  if (!fs.existsSync(f)) return [];
  const rows = new Set((pol.review && pol.review.visualWarnRows) || []);
  try { return (readJson(f).results || []).filter((r) => rows.has(r.id) && (r.level === "warn" || r.level === "fail")).map((r) => r.id); } catch { return []; }
}

export const factsHash = (s) => sha(JSON.stringify([s.inter, s.vis]));
