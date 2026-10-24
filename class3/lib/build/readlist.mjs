/* readlist: a slot's reading list, computed from the docs' REAL headings at scaffold time (so a line range can never drift
 * from the docs it points into) and written to work/<chapter>/<slot>/readlist.md.
 *
 *   node lib/build/readlist.mjs <MEDIA_ID> [--ch N] [--images] [--print]     (run in the class folder; writes <slot>/readlist.md)
 *
 * `scaffold` calls writeReadlist() right after it writes tool.tsx (a slot whose tool.tsx already exists is work in progress:
 * scaffold refuses it, so make its list with the command above).
 *
 * WHAT IT LISTS, and why it saves reading without losing any:
 *   - always, whole and never trimmed: docs/PREFLIGHT.md (what tools are failed on) and docs/LAYOUT.md (the final layout);
 *   - docs/BUILD_CARD.md sections 1-6 (the procedure and the runtime API), NOT section 7 / 8 (the decisions history, hundreds
 *     of rows, each already folded into a doc, a check or the runtime);
 *   - the slot's brief.md and tool.tsx;
 *   - the docs/PATTERNS.md sections the slot needs: always the plain answer, the correction, the summary page, the bubble's lines,
 *     the giveaways and the three languages; the rest by what the PINNED RUNTIME can do (lib/core/caps.mjs, never a version
 *     number: guide steps, party, next key, card answer, board, key only (LAYOUT 1d-1e, PATTERNS 15-16) and skins) and by what the brief says (a fraction, a decimal,
 *     money, two answer boxes, a drag, a concrete object); the voiced-only section only when the runtime is NOT silent;
 *   - docs/IMAGES.md only for an image pass (--images);
 *   - docs/CHECKS.md only as the ROW of a check that fails (a grep), not as a whole read.
 * A heading the docs no longer have is printed as NOT FOUND (never dropped silently). The list ends with the line
 * "A pointer never replaces reading: read any other section when unsure; the checks are the judge."
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { CONFIG, CLASS_DIR, fromRoot } from "../core/env.mjs";
import { capsFor } from "../core/caps.mjs";

export const READLIST_END = "A pointer never replaces reading: read any other section when unsure; the checks are the judge.";

/* a file's lines (CRLF or LF: a file may mix them) and its top-level `## ` headings, ignoring code fences */
function outline(file) {
  const lines = fs.readFileSync(file, "utf8").split("\n").map((l) => l.replace(/\r$/, ""));
  while (lines.length && lines[lines.length - 1] === "") lines.pop();
  const heads = [];
  let fence = false;
  lines.forEach((l, i) => {
    if (/^\s*```/.test(l)) fence = !fence;
    if (!fence && /^## /.test(l)) heads.push({ line: i + 1, text: l.slice(3).trim() });
  });
  return { lines, total: lines.length, heads };
}

/* the range of heading number k: from its heading to the line before the next `## ` (trailing blank lines dropped) */
function rangeAt(o, k) {
  const from = o.heads[k].line;
  let to = k + 1 < o.heads.length ? o.heads[k + 1].line - 1 : o.total;
  while (to > from && o.lines[to - 1] === "") to--;
  return { from, to, title: o.heads[k].text };
}
/* the section whose heading matches `re` */
function section(o, re) {
  const k = o.heads.findIndex((h) => re.test(h.text));
  return k < 0 ? null : rangeAt(o, k);
}

/* what the brief says (plain regexes on its text; a pointer, never a verdict) */
const SECTION_OF = (text, name) => {
  const m = new RegExp(`^## ${name}[^\\n]*\\n([\\s\\S]*?)(?=^## |$(?![\\s\\S]))`, "m").exec(text);
  return m ? m[1] : "";
};
const OBJECT_WORDS = /\b(chocolate|choc bar|cake|roti|chapati|pizza|biscuit|cookie|ribbon|juice|rope|string|thread|paper|sheet of paper|cup|glass|bottle|jug|bucket|tank|pie|sweet|ladoo|barfi|mango|apple|orange|banana|bread|sandwich|sandwiches|pencil|ruler strip|tape|wire|cloth|candle|cardboard|plate|garden|field|plot of land|water)\b/gi;

export function briefFeatures(text) {
  const t = String(text || "");
  const look = [SECTION_OF(t, "What it is"), SECTION_OF(t, "Look"), SECTION_OF(t, "Stage"), SECTION_OF(t, "Student controls")].join("\n");
  const objects = [...new Set((look.match(OBJECT_WORDS) || []).map((x) => x.toLowerCase()))];
  const fraction = /\b(fractions?|numerators?|denominators?|mixed numbers?|equivalent fractions?|halves|thirds|quarters)\b/i.test(t);
  const decimal = /\b(decimals?|tenths?|hundredths?|thousandths?|decimal point)\b|\b\d+\.\d+\b/i.test(t);
  return {
    fraction, decimal,
    money: /\b(rupees?|paise|Rs\.?|rs)\b|₹/.test(t),
    twoBoxes: /\b(remainder|quotient|two answers?|two boxes|two-part|two part)\b/i.test(t),
    drag: /\b(drag|drops?|dropping|slides?|slider|pull)\b/i.test(t),
    objects,
  };
}

/* the entries [{ n, file, from, to, lines, why, note }] for a slot; `opts`: caps, images, docsDir, classDir, briefText */
export function readlistEntries(dir, opts = {}) {
  const caps = opts.caps || capsFor(dir);
  const docsDir = opts.docsDir || fromRoot("docs");
  const cdir = opts.classDir || CLASS_DIR;
  const briefFile = path.join(dir, "brief.md");
  const briefText = opts.briefText !== undefined ? opts.briefText : fs.existsSync(briefFile) ? fs.readFileSync(briefFile, "utf8") : "";
  const f = briefFeatures(briefText);
  const E = [];
  const docRel = (name) => `${cdir}/docs/${name}`;
  const open = (name) => { const p = path.join(docsDir, name); return fs.existsSync(p) ? outline(p) : null; };
  const whole = (name, why) => {
    const o = open(name);
    E.push(o ? { file: docRel(name), from: 1, to: o.total, why } : { file: docRel(name), missing: true, why });
  };
  const part = (name, re, why, label) => {
    const o = open(name);
    const s = o && section(o, re);
    E.push(s ? { file: docRel(name), from: s.from, to: s.to, heading: s.title, why } : { file: docRel(name), missing: true, heading: label || String(re), why });
  };

  whole("PREFLIGHT.md", "READ FIRST, whole: what tools are failed on, so the first build is right (the check named in each line decides)");
  whole("LAYOUT.md", "the final layout (never trimmed): the stage, the board, the start page, the header, the working area, the bubble, the summary page, the languages");
  if (caps.keyOnly) { /* the new look: say where it is in the file just read, rather than listing the same lines twice */
    const o = open("LAYOUT.md"), d = o && section(o, /^1d\./), e = o && section(o, /^1e\./);
    if (d && e) E[E.length - 1].why += ` · this runtime has keyOnly: lines ${d.from}-${e.to} (§1d key only and nav dots, §1e acts on screen) are the new look: no question bar, the key's corner, the question in the bubble only`;
  }
  { /* BUILD_CARD sections 1-6: from the top to the line before section 7 (the decisions history) */
    const o = open("BUILD_CARD.md");
    const k7 = o ? o.heads.findIndex((h) => /^7\./.test(h.text)) : -1;
    const to7 = !o ? 0 : k7 > 0 ? rangeAt(o, k7 - 1).to : o.total;
    E.push(o ? { file: docRel("BUILD_CARD.md"), from: 1, to: to7, why: "the contract, the procedure, the token rules and the runtime API (sections 1-6; NOT section 7 / 8, the decisions history)" }
      : { file: docRel("BUILD_CARD.md"), missing: true, why: "sections 1-6" });
  }
  const slotRel = `${cdir}/work/${path.basename(path.dirname(dir))}/${path.basename(dir)}`;
  E.push({ file: `${slotRel}/brief.md`, from: 1, to: null, whole: true, why: "the plan's writeup for this tool: the picture, what the child does, the misconceptions, the textbook excerpt" });
  E.push({ file: `${slotRel}/tool.tsx`, from: 1, to: null, whole: true, why: "the scaffold: the plan's lines and items already in place; you write MODEL, Work, the asks, the judge and the traceback" });

  const P = "PATTERNS.md";
  part(P, /^1\./, "the plain answer: a number the 12-key pad types (judge, oracle, nearMiss, agentKey)", "## 1.");
  if (caps.steps) part(P, /^9b\./, "guide steps and hints: one click a step, a hint each, api.did at every click, the Hint key", "## 9b.");
  part(P, /^9\./, "the bubble's lines: one sentence a page, win and closing lines, never repeating a line", "## 9.");
  part(P, /^7\./, "the correction (traceback): redraws the maths and ends on the whole right answer, unmarked", "## 7.");
  part(P, /^10\./, "what gives the answer away (read before drawing any readout or hint)", "## 10.");
  if (caps.board || caps.skin) part(P, /^14\./, `the board layout${caps.skin ? " and object skins (<Skin>)" : ""}: board: true, the answer drawer, the floor${f.objects.length ? `; the brief names an object (${f.objects.join(", ")}): the image pass decides whether it gets a skin` : ""}`, "## 14.");
  if (caps.party) part(P, /^9c\./, "the phase party: the runtime's; nothing to write, what to expect", "## 9c.");
  if (caps.act || caps.keyOnly) part(P, /^15\./, "an action performed on screen: every action key or act calls await api.act({ tool, moves, at, onPoint }) (a knife, scissors, ruler, pencil, eraser or the hand), the pieces react" + (caps.act ? "" : " (api.act exists only when the features line names act)"), "## 15.");
  if (caps.keyOnly) part(P, /^16\./, "authoring under keyOnly (the new look): read box.key and keep every element out of the key's corner; the question lives only in the bubble, one sentence a line; one key for a sequence; an object looks like the object from the first frame", "## 16.");
  if (caps.keyOnly) part(P, /^18\./, "traps the ch 5 builders hit: ids the runtime owns (again, answer-open, part-N, key-N, choice-*), a late keyed reset that wipes an act, a closing needs a win line, how to tell a hint is showing, hi/gu bubble lines of at most 80 characters", "## 18.");
  if (caps.nextKey) part(P, /^9d\./, "the Next key: nextKey: true; nothing moves on by itself, so Work never advances on a timer", "## 9d.");
  if (caps.cardAnswer && (f.fraction || f.decimal)) part(P, /^9e\./, "answering on the card (cardAnswer: true): the brief has fraction or decimal answers", "## 9e.");
  part(P, /^8\./, "the summary page and Free play: Thumb, the free-play mode", "## 8.");
  part(P, /^11\./, "the three languages: the TR table, tx in Work and Thumb (for the language pass, once the English is final)", "## 11.");
  if (f.fraction) part(P, /^3\./, "a fraction, stacked: SLOT_FRACTION / SLOT_MIXED (the brief has fractions)", "## 3.");
  if (f.decimal) part(P, /^4\./, "a decimal: pointKey, the answer a string in its written form (the brief has decimals)", "## 4.");
  if (f.money) part(P, /^12\./, "money, typed decimals and live pieces (the brief has money)", "## 12.");
  if (f.twoBoxes) part(P, /^2\./, "two answer boxes: parts (the brief has a quotient and a remainder, or two answers)", "## 2.");
  if (f.drag) part(P, /^6\./, "dragging a piece: useDrag, drag.bind, drag.keys (the brief has drags or slides)", "## 6.");
  if (!caps.silent) part(P, /^9v\./, "the voice (a VOICED runtime: the lesson is spoken; read this instead of the silent sections above)", "## 9v.");

  if (opts.images) whole("IMAGES.md", "the image pass: object skins and the keypad theme");

  /* the sections not listed above, with their ranges, so one can be found without a grep */
  const rest = [];
  const po = open(P);
  if (po) {
    const listed = new Set(E.filter((e) => e.file === docRel(P) && !e.missing).map((e) => e.from));
    for (let k = 0; k < po.heads.length; k++) {
      if (listed.has(po.heads[k].line)) continue;
      const r = rangeAt(po, k);
      rest.push({ from: r.from, to: r.to, heading: r.title });
    }
  }
  return { entries: E, rest, caps, features: f, cdir };
}

const runtimeLine = (caps) => {
  const on = ["board", "keyOnly", "navDots", "startPage", "steps", "hint", "hintKey", "party", "nextKey", "cardAnswer", "skin", "classroom", "act"].filter((k) => caps[k]);
  return `${caps.silent ? "SILENT runtime (the bubble is the guide; nothing is spoken)" : "VOICED runtime (legacy: the lesson is spoken; read PATTERNS 9v below and the runbook's voice step, and treat the silent-only lines of PREFLIGHT as not yours)"} · features: ${on.join(", ") || "none"}`;
};

/* the markdown of a slot's reading list */
export function readlist(dir, opts = {}) {
  const { entries, rest, caps, cdir } = readlistEntries(dir, opts);
  const id = path.basename(dir), ch = path.basename(path.dirname(dir));
  const L = [];
  L.push(`# Read list · ${id} · ${ch}`);
  L.push("");
  L.push(`Made by \`scaffold\` from the real headings of the docs, so the line numbers are exact today (a heading is the anchor if a doc was edited since: \`node lib/build/readlist.mjs ${id} --ch <n>\` in \`${cdir}/\` makes this list again). Paths are from the pipeline root. ${runtimeLine(caps)}.`);
  L.push("");
  L.push("| # | file | lines | why |");
  L.push("|---|---|---|---|");
  let n = 0, total = 0, notFound = 0;
  for (const e of entries) {
    n++;
    if (e.missing) { notFound++; L.push(`| ${n} | \`${e.file}\` | NOT FOUND${e.heading ? ` (heading ${e.heading})` : ""} | ${e.why}: the doc changed; find the section by its name |`); continue; }
    const span = e.whole ? "whole" : `${e.from}-${e.to}`;
    if (!e.whole) total += e.to - e.from + 1;
    L.push(`| ${n} | \`${e.file}\` | ${span}${e.heading ? ` (\`## ${e.heading.slice(0, 40)}${e.heading.length > 40 ? "..." : ""}\`)` : ""} | ${e.why} |`);
  }
  L.push("");
  L.push(`The docs above are ${total} lines in all (the slot's own brief.md and tool.tsx are on top).${notFound ? ` ${notFound} pointer(s) NOT FOUND.` : ""}`);
  L.push("");
  L.push("**Never read through:** `docs/BUILD_CARD.md` from section 7 on (the decisions history; `grep -n \"<word>\"` it when you need the reason behind a rule). **Never read:** another chapter's tools, `slot.json`, `plan.json`, previews, `.build/`, `output-preview/`, PDFs. **A check's row:** `docs/CHECKS.md` is not a whole read; when a check fails or PREFLIGHT names one, take its row: `grep -n \"| <check-id> |\" " + cdir + "/docs/CHECKS.md`.");
  if (rest.length) {
    L.push("");
    L.push("**Other PATTERNS sections, on demand** (read one when the tool needs it): " + rest.map((r) => `${r.heading.split(/[:(]/)[0].trim().replace(/\.$/, "")} ${r.from}-${r.to}`).join(" · "));
  }
  L.push("");
  L.push(READLIST_END);
  return L.join("\n") + "\n";
}

/* write <slot>/readlist.md; returns { file, bytes, lines, pointers, notFound } */
export function writeReadlist(dir, opts = {}) {
  const text = readlist(dir, opts);
  const file = path.join(dir, "readlist.md");
  fs.writeFileSync(file, text);
  const { entries } = readlistEntries(dir, opts);
  return { file, bytes: Buffer.byteLength(text), lines: text.split("\n").length - 1, pointers: entries.length, notFound: entries.filter((e) => e.missing).length };
}

/* the command line: node lib/build/readlist.mjs <MEDIA_ID | work folder> [--ch N] [--images] [--print] */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { resolveTarget } = await import("../core/work.mjs");
  const argv = process.argv.slice(2);
  const flag = (k) => argv.includes(k);
  const chI = argv.indexOf("--ch");
  const target = argv.find((x, i) => !x.startsWith("--") && argv[i - 1] !== "--ch");
  if (!target) { console.log("usage (in the class folder): node lib/build/readlist.mjs <MEDIA_ID | work folder> [--ch N] [--images] [--print]"); process.exit(0); }
  const dir = resolveTarget(target, chI >= 0 ? { ch: argv[chI + 1] } : {});
  if (flag("--print")) process.stdout.write(readlist(dir, { images: flag("--images") }));
  else {
    const r = writeReadlist(dir, { images: flag("--images") });
    console.log(`wrote ${path.relative(process.cwd(), r.file)} · ${r.pointers} pointers · ${r.lines} lines · ${(r.bytes / 1024).toFixed(1)} KB${r.notFound ? ` · ${r.notFound} NOT FOUND` : ""}`);
  }
}
