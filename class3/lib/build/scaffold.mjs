/* slot.json + a skeleton -> work/<chapter>/<id>/tool.tsx
 *
 * Copies everything the plan already decides, so the builder never re-types it:
 * ids, name, chrome, the voice settings (kept for the tool's shape: a silent lesson speaks nothing), the opening and
 * finish lines, every phase's concept VERBATIM, its concept id and objectives, its teach line, its ladder (from
 * `tries`), its closing line (`soWhat`), and three items a phase (learn + practice) with a parsed answer.
 * The builder then writes MODEL, the Work component, the short on-screen asks, and fixes any answer the parser could
 * not read (marked TODO).
 *
 * WHICH SKELETON, and what is in it, is decided by the chapter's pinned runtime (lib/core/caps.mjs), never by a number:
 *   - a SILENT runtime (r30+, `const SILENT_VOICE = true`): runtime/skeleton.tsx, the FULL NEW STYLE: `board: true` (when the
 *     runtime has the board layout), a StartArt / START_HOOK start page (when it has one), one stub guide `steps` entry a
 *     phase with a `hint` (real code, so `check` reads them), a TR table for Hindi and Gujarati, `freePlay: true` with
 *     FREE_LINE, the keypad THEME note (images.tsx TOOL_THEME), and the silent-lesson conventions (printed bubble, one
 *     page a line, Work reports every act with api.did). Every line it prints is printed, never spoken.
 *   - a VOICED runtime (r21 and before): lib/build/skeleton.voiced.tsx (config `legacySkeleton`; it lives under lib/ so a code sync carries it), the old skeleton, so a
 *     chapter built on a frozen voiced runtime can still be scaffolded the way it always was.
 * A skeleton may carry `//#if <capability>` ... `//#endif` line pairs (board, bigPad, nextKey, keyOnly, navDots, act, startPage, steps,
 * hint, theme, skin): the block stays when the runtime has the capability (the flag of that name in lib/core/caps.mjs) and is dropped,
 * with its two marker lines, when it has not.
 * keyOnly (no question bar, LAYOUT.md §1d): the bubble is the only place a question shows, so each item's `say` is the whole question in
 * ONE sentence. A plan question of several sentences is cut to its first question sentence and its full text is kept in the item's comment.
 */
import fs from "node:fs";
import path from "node:path";
import { CONFIG, fromRoot } from "../core/env.mjs";
import { capsFor } from "../core/caps.mjs";
import { writeReadlist } from "./readlist.mjs";

const js = (v) => JSON.stringify(v);
const pascal = (s) => String(s || "tool").split(/[^A-Za-z0-9]+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join("") || "Tool";

function leadNumber(s) {
  if (typeof s === "number") return s;
  const m = /-?\d{1,3}(?:,\d{2,3})+(?:\.\d+)?|-?\d+(?:\.\d+)?/.exec(String(s ?? ""));
  return m ? Number(m[0].replace(/,/g, "")) : null;
}

/* "First rung, ...: X. Second rung, ...: Y? Third rung: Z." -> [X, Y, Z] (best effort) */
function rungs(tries) {
  const t = String(tries || "");
  const grab = (name, until) => {
    const m = new RegExp(name + "[^:]*:\\s*([\\s\\S]*?)(?=" + until + "|$)", "i").exec(t);
    const s = m ? m[1].trim().replace(/\s+/g, " ") : "";
    return s ? s[0].toUpperCase() + s.slice(1) : "";
  };
  return [grab("First rung", "Second rung"), grab("Second rung", "Third rung"), grab("Third rung", "The pad|$")];
}

/* the first sentence of a line (a guide step is ONE sentence: one bubble page) */
const firstSentence = (s) => {
  const t = String(s || "").trim().replace(/\s+/g, " ");
  const m = /^(.+?[.?!])(\s|$)/.exec(t);
  return m ? m[1] : t;
};
/* the start page's hook: the first QUESTION of the plan's opening line, else its first sentence */
const hookOf = (line) => {
  const parts = String(line || "").trim().replace(/\s+/g, " ").split(/(?<=[.?!])\s+/);
  return parts.find((x) => /\?$/.test(x)) || parts[0] || "";
};

/* more than one sentence? (a question for a keyOnly bubble must be one) */
const manySentences = (s) => String(s || "").trim().split(/(?<=[.?!])\s+/).filter(Boolean).length > 1;

/* the skeleton for a pinned runtime's capabilities */
export function skeletonFor(caps) {
  return fromRoot(caps.silent ? CONFIG.skeleton : (CONFIG.legacySkeleton || "lib/build/skeleton.voiced.tsx"));
}

/* `//#if cap` ... `//#endif` line pairs (no nesting needed, but nesting works): keep the block when flags[cap] is true */
export function renderSkeleton(text, flags) {
  const out = [], stack = [];
  for (const line of String(text).split(/(?<=\n)/)) {
    const d = /^\s*\/\/#(if|endif)\b\s*(\w*)\s*$/.exec(line.replace(/\r?\n$/, ""));
    if (d && d[1] === "if") { stack.push(!!flags[d[2]]); continue; }
    if (d && d[1] === "endif") { stack.pop(); continue; }
    if (stack.every(Boolean)) out.push(line);
  }
  return out.join("");
}

/* caps: the pinned runtime's capabilities; given by a test, else read from the slot's chapter pin (or the head) */
export function scaffold(dir, { force = false, caps = null } = {}) {
  const out = path.join(dir, "tool.tsx");
  if (fs.existsSync(out) && !force) throw new Error(`${path.relative(process.cwd(), out)} exists; it is work in progress (use --force to replace it)`);
  const cap = caps || capsFor(dir);
  const s = JSON.parse(fs.readFileSync(path.join(dir, "slot.json"), "utf8"));
  const tc = s.tool_config || {};
  const w = s.writeup || {};
  const map = tc.phase_map || [];
  const q = tc.tool_questions || {};
  const learn = (q.learn && q.learn.items) || [];
  const practice = (q.practice && q.practice.items) || [];
  const vl = Array.isArray(w.voiceLines) ? w.voiceLines : [];
  const phases = Array.isArray(w.phases) ? w.phases : [];
  /* a stub guide step a phase, only on a runtime that has guide steps (the new style); the builder makes it real or deletes it */
  const withSteps = cap.silent && cap.steps;

  const phaseSrc = phases.map((p) => {
    const pm = map.find((x) => Number(x.n) === Number(p.n)) || {};
    const [r1, r2, r3] = rungs(p.tries);
    const its = [
      ...learn.filter((x) => Number(x.phase) === Number(p.n)).map((x) => ({ text: x.question, ans: x.answer, tag: "learn " + (x.slot || ""), qid: `${pm.concept_id}:${x.slot}` })),
      ...practice.filter((x) => Number(x.phase) === Number(p.n)).map((x) => ({ text: x.question, ans: x.final_answer ?? x.answer, tag: "practice " + (x.q_no || ""), qid: `${pm.concept_id}:${x.q_no}` })),
    ];
    const itemLines = its.map((it) => {
      const a = leadNumber(it.ans);
      /* a decimal keeps its written form as a string ("0.30" is not "0.3"; the point key types it) */
      const dm = typeof it.ans === "number" ? null : /-?\d{1,3}(?:,\d{2,3})+\.\d+|-?\d+\.\d+/.exec(String(it.ans ?? ""));
      const lead = /-?\d{1,3}(?:,\d{2,3})+(?:\.\d+)?|-?\d+(?:\.\d+)?/.exec(String(it.ans ?? ""));
      const shown = a === null ? "null" : dm && lead && lead.index === dm.index ? js(dm[0].replace(/,/g, "")) : a;
      /* keyOnly: the bubble is the only place the question shows, so `say` is ONE sentence; the whole plan text stays in a comment */
      const cut = cap.keyOnly && manySentences(it.text);
      return [
        `      /* ${it.tag}: answer in the plan = ${String(it.ans).replace(/\*\//g, "* /")}${a === null ? "  TODO: set answer" : ""} */`,
        ...(cut ? [`      /* plan question, cut to one sentence for the bubble (TODO: say = the WHOLE question in ONE sentence): ${String(it.text).trim().replace(/\s+/g, " ").replace(/\*\//g, "* /")} */`] : []),
        `      { qid: ${js(it.qid)}, kind: "", say: ${js(cut ? hookOf(it.text) : it.text)}, ask: "", answer: ${shown}, miss: ${js(r1)} },`,
      ].join("\n");
    }).join("\n");
    return [
      "  {",
      `    n: ${Number(p.n)},`,
      `    concept: ${js(p.concept)},`,
      `    conceptId: ${js(pm.concept_id || "")}, objectiveIds: ${js(pm.objective_ids || [])},`,
      `    says: ${js([p.says].filter(Boolean))},`,
      ...(withSteps ? [
        `    /* TODO: guide steps, ONE click and ONE sentence each, a hint each (skeleton note "steps"): make this stub real, or delete it`,
        `       when the teach line describes no act (then \`says\` above is the teach run) */`,
        `    steps: [{ say: ${js(firstSentence(p.says) || "TODO: the first act, in one sentence.")}, on: "act", hint: "Try the act again." }],`,
      ] : []),
      `    /* tries, as the plan writes it: ${String(p.tries || "").replace(/\*\//g, "* /")} */`,
      `    ladder: ${js([r2, r3].filter(Boolean))},`,
      `    closing: ${js(p.soWhat || "")},`,
      `    /* the summary page's row: "You learned: ..." in at most 72 characters */`,
      `    learned: ${js(p.soWhat ? "You learned: " + p.soWhat[0].toLowerCase() + p.soWhat.slice(1) : "")},`,
      `    /* the traceback for a miss, in one line (it goes into the sidecar) */`,
      `    traceback: "",`,
      "    items: [",
      itemLines,
      "    ],",
      "  },",
    ].join("\n");
  }).join("\n");

  const skeleton = renderSkeleton(fs.readFileSync(skeletonFor(cap), "utf8"), cap);
  const src = skeleton
    .replaceAll("%%MEDIA_ID%%", s.id)
    .replaceAll("%%TOOL_ID%%", s.tool_id || tc.toolName || "tool")
    .replaceAll("%%TOOL_NAME%%", String(s.title || s.tool_name || "").replace(/"/g, '\\"'))
    .replaceAll("%%CHROME%%", js((tc.style && tc.style.chrome) || {}))
    .replaceAll("%%VOICE%%", js({ rate: (tc.voice || {}).rate ?? 0.92, pitch: (tc.voice || {}).pitch ?? 1.06 }))
    .replaceAll("%%OPENING%%", js(vl.length ? [vl[0]] : []))
    .replaceAll("%%FINISH_LINE%%", js(vl.length ? vl[vl.length - 1] : ""))
    .replaceAll("%%FREE_LINE%%", js(vl.find((l) => /^free play/i.test(String(l))) || "Free play."))
    .replaceAll("%%START_HOOK%%", js(hookOf(vl[0])))
    .replaceAll("%%PHASES%%", "[\n" + phaseSrc + "\n]")
    .replaceAll("%%COMPONENT%%", pascal(s.tool_id || s.title));
  fs.writeFileSync(out, src);
  /* the slot's reading list (readlist.md, lib/build/readlist.mjs): pointers into the docs by their real headings. A failure here
     never fails a scaffold (the list can be made again: node lib/build/readlist.mjs <MEDIA_ID> --ch N) */
  let readlist = null;
  try { readlist = writeReadlist(dir, { caps: cap }); } catch { /* the scaffold stands without it */ }
  return { file: out, bytes: Buffer.byteLength(src), phases: phases.length, component: pascal(s.tool_id || s.title),
    style: cap.silent ? "new (silent runtime)" : "legacy (voiced runtime)", readlist: readlist && readlist.file };
}
