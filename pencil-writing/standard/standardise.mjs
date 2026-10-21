#!/usr/bin/env node
/* Makes PENCIL WRITING part of a class's standard pipeline (the owner, 2026-10-22): a chapter fetched from now on gets the write move, and builds and
 * checks against it. The same edits for every class, so nothing is hand-copied between class folders.
 *
 *   node pencil-writing/standard/standardise.mjs --class 5            DRY RUN (nothing written): what would change, every anchor verified
 *   node pencil-writing/standard/standardise.mjs --class 5 --apply    back up, then write
 *
 * What it does (each step idempotent; a file already done says so):
 *   1. lib/check/pencil.mjs        NEW: the `pencil-acts` source row (copied from standard/pencil.mjs)
 *   2. runtime/runtime.tsx         the head's ACTION_KIT_HELPER block gains the write move (pencil-writing/apply.mjs --runtime; nothing is frozen or pinned)
 *   3. lib/core/caps.mjs           `pencilWrite` (the runtime source has `function penPlan(`)
 *   4. lib/core/pin.mjs, cli.mjs   `fetch` records `rules.pencilActs: "strict"` in a NEW chapter's runtime.json when the runtime it pins has the move;
 *                                  a re-pin keeps the rules, so a chapter fetched earlier is never made strict by moving to a newer runtime
 *   5. lib/check/check.mjs         one import pair and one hook (try/catch: a bug there can never stop a check)
 *   6. lib/check/input.mjs         action-anim: a WRITTEN act (data-role pen-writing on screen) may last 3.4 s, not 2 s; no other verdict changes
 * Docs (PATTERNS 15, PREFLIGHT, CHECKS, BUILD_CARD 7) are exact-string edits made by hand; see pencil-writing/README.md.
 * Never touches work/, output-preview/, runtime/frozen/, a chapter's pin, or any playkit/playhelpers file. Files other sessions run live (lib/check/*.mjs)
 * are replaced in ONE rename each, after `node --check` of the new text. */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { HERE, ROOT, read } from "../lib.mjs";   /* HERE = pencil-writing/ (apply.mjs), STD = pencil-writing/standard/ (this folder) */
const STD = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const val = (f) => (args.includes(f) ? args[args.indexOf(f) + 1] : null);
const N = Number(val("--class")), APPLY = args.includes("--apply");
if (![4, 5].includes(N) && !fs.existsSync(path.join(ROOT, `class${N}`))) { console.error("usage: standardise.mjs --class <N> [--apply]"); process.exit(2); }
const C = path.join(ROOT, `class${N}`);
const rel = (f) => path.relative(ROOT, f).replace(/\\/g, "/");

/* an edit: in `file`, `find` (exactly once, as LF text) becomes `replace`; `has` is a text that proves it is already done */
const EDITS = [
  { file: "lib/core/caps.mjs", name: "caps.pencilWrite", has: "pencilWrite:",
    find: "    act: /ACTION_KIT_HELPER/.test(r),",
    replace: "    pencilWrite: /function penPlan\\(/.test(r),            /* 2026-10-22: api.act moves \"write\" (the pencil WRITES digits, signs and capital letters stroke by stroke), <PencilText>, <PencilLine>, { dab } / { line } tokens; docs/PATTERNS.md 15, check pencil-acts */\n    act: /ACTION_KIT_HELPER/.test(r)," },

  { file: "lib/core/pin.mjs", name: "writePin takes rules", has: "sealed = null, rules = null",
    find: "export function writePin(chapterDir, version, { why = \"\", sealed = null } = {}) {",
    replace: "export function writePin(chapterDir, version, { why = \"\", sealed = null, rules = null } = {}) {" },
  { file: "lib/core/pin.mjs", name: "writePin keeps / sets rules", has: "pin.rules =",
    find: "  else if (was?.sealed) pin.sealed = was.sealed;",
    replace: "  else if (was?.sealed) pin.sealed = was.sealed;\n  if (rules) pin.rules = { ...(was?.rules || {}), ...rules };   /* what the chapter is held to (fetchRules): never added by a later re-pin */\n  else if (was?.rules) pin.rules = was.rules;" },
  { file: "lib/core/pin.mjs", name: "fetchRules", has: "export function fetchRules",
    find: "/* the runtime + mascot a slot builds on: its chapter's pin, else the head */",
    replace: "/* The rules a chapter is held to FROM the runtime it is fetched on (2026-10-22). A chapter fetched onto a runtime with the pencil write move is \"strict\":\n   every pencil act is a write or says marks: true (docs/PATTERNS.md 15, check pencil-acts). A chapter fetched earlier, or re-pinned later onto a newer\n   runtime, is not: writePin keeps the rules it had and never adds one. null = no rules. */\nexport function fetchRules(version) {\n  try { return /function penPlan\\(/.test(fs.readFileSync(path.join(snapshotDir(version), \"runtime.tsx\"), \"utf8\")) ? { pencilActs: \"strict\" } : null; }\n  catch { return null; }\n}\n\n/* the runtime + mascot a slot builds on: its chapter's pin, else the head */" },

  { file: "cli.mjs", name: "cli imports fetchRules", has: "writePin, fetchRules,",
    find: "readPin, writePin, pinState,", replace: "readPin, writePin, fetchRules, pinState," },
  { file: "cli.mjs", name: "fetch pins with the rules of its runtime", has: "rules: fetchRules(v)",
    find: "writePin(cdir, v, { why: `fetched ${new Date().toISOString().slice(0, 10)}` });",
    replace: "writePin(cdir, v, { why: `fetched ${new Date().toISOString().slice(0, 10)}`, rules: fetchRules(v) });" },

  { file: "lib/check/check.mjs", name: "check imports", has: "from \"./pencil.mjs\"",
    find: "import { capsOf } from \"../core/caps.mjs\";",
    replace: "import { capsOf } from \"../core/caps.mjs\";\nimport { pencilRows } from \"./pencil.mjs\";\nimport { readPin } from \"../core/pin.mjs\";" },
  { file: "lib/check/check.mjs", name: "check pencil-acts hook", has: "pencilRows(tool",
    find: "  ok(\"source\", \"runtime-pin\", pin.ok, pin.msg, pin.msg);",
    replace: "  ok(\"source\", \"runtime-pin\", pin.ok, pin.msg, pin.msg);\n  /* 2026-10-22 (pencil-acts, docs/CHECKS.md): a row only for a runtime with the pencil write move or a tool that writes; none for a finished chapter. A bug here never stops a check. */\n  try { for (const r of pencilRows(tool, { caps, strict: !!(readPin(path.dirname(dir)) && readPin(path.dirname(dir)).rules && readPin(path.dirname(dir)).rules.pencilActs === \"strict\") })) add(\"source\", r.id, r.level, r.msg); } catch (e) { /* not a tool problem */ }" },

  { file: "lib/check/input.mjs", name: "action-anim: the recorder sees a written act", has: "r.pen = true",
    find: "      if (on) { if (r.seen === null) r.seen = now - r.t0; r.samples++;",
    replace: "      if (on) { if (r.seen === null) r.seen = now - r.t0; r.samples++; if (document.querySelector('[data-role=\"pen-writing\"]')) r.pen = true;" },
  { file: "lib/check/input.mjs", name: "action-anim: recorder state", has: "quietAll: true, samples: 0, pen: false",
    find: "window.__actRec = { t0: 0, seen: null, gone: null, lockedAll: true, actingAll: true, quietAll: true, samples: 0 };",
    replace: "window.__actRec = { t0: 0, seen: null, gone: null, lockedAll: true, actingAll: true, quietAll: true, samples: 0, pen: false };" },
  { file: "lib/check/input.mjs", name: "action-anim: reset per try", has: "window.__actRec.samples = 0; window.__actRec.pen = false;",
    find: "window.__actRec.samples = 0; return true;",
    replace: "window.__actRec.samples = 0; window.__actRec.pen = false; return true;" },
  { file: "lib/check/input.mjs", name: "action-anim: wait for a written act", has: "getState().acting`, 6000);",
    find: "&& !window.toolApi.getState().acting`, 4000);", replace: "&& !window.toolApi.getState().acting`, 6000);" },
  { file: "lib/check/input.mjs", name: "action-anim: a written act may last 3.4 s (class 5 judge)", classes: [5], has: "r.pen ? 3400",
    find: "  if (r.gone === null) bad.push(\"the act was still on screen 2.6 s after the press\");\n  else if (r.gone > 2000) bad.push(`the act ended ${Math.round(r.gone)} ms after the press (want 2 s at most)`);",
    replace: "  if (r.gone === null) bad.push(r.pen ? \"the written act was still on screen 6 s after the press (one written act: 3 s at most, PATTERNS 15)\" : \"the act was still on screen 2.6 s after the press\");\n  else if (r.gone > (r.pen ? 3400 : 2000)) bad.push(`the act ended ${Math.round(r.gone)} ms after the press (want ${r.pen ? \"3.4 s at most for a written act\" : \"2 s at most\"})`);" },
  { file: "lib/check/input.mjs", name: "action-anim: a written act may last 3.4 s (class 4 judge)", classes: [4], has: "r.pen ? Math.max(lim, 3400)",
    find: "  if (r.gone === null) bad.push(\"the act was still on screen 4 s after the press\");\n  else if (r.gone > lim) bad.push(`the act ended ${Math.round(r.gone)} ms after the press (want ${lim} ms at most)`);",
    replace: "  if (r.gone === null) bad.push(r.pen ? \"the written act was still on screen 6 s after the press (one written act: 3 s at most, PATTERNS 15)\" : \"the act was still on screen 4 s after the press\");\n  else if (r.gone > (r.pen ? Math.max(lim, 3400) : lim)) bad.push(`the act ended ${Math.round(r.gone)} ms after the press (want ${r.pen ? Math.max(lim, 3400) : lim} ms at most${r.pen ? \", a written act\" : \"\"})`);" },
];

/* order matters for a live class: the module a file imports exists before the importer is swapped (pin.mjs before cli.mjs, pencil.mjs before check.mjs) */
const ORDER = ["lib/core/caps.mjs", "lib/core/pin.mjs", "cli.mjs", "lib/check/input.mjs", "lib/check/check.mjs"];

const plans = [];
let refused = 0;
console.log(`pencil-writing standard -> class${N}  ${APPLY ? "APPLY" : "DRY RUN (nothing is written; add --apply)"}\n`);

/* 1. the new module */
{
  const dest = path.join(C, "lib/check/pencil.mjs"), src = read(path.join(STD, "pencil.mjs")).replace(/\r\n/g, "\n");
  const eol = fs.existsSync(path.join(C, "lib/check/runAndShip.mjs")) && read(path.join(C, "lib/check/runAndShip.mjs")).includes("\r\n") ? "\r\n" : "\n";
  const want = src.replace(/\n/g, eol), have = fs.existsSync(dest) ? read(dest) : null;
  console.log(`  ${have === want ? "already there " : have == null ? "NEW           " : "CHANGED       "} lib/check/pencil.mjs  (${(want.length / 1024).toFixed(1)} KB, ${eol === "\r\n" ? "CRLF" : "LF"})`);
  if (have !== want) plans.push({ file: dest, text: want, name: "lib/check/pencil.mjs", isNew: have == null, step: 0 });
}

/* 3-6. exact-string edits, grouped by file */
const byFile = {};
for (const e of EDITS) if (!e.classes || e.classes.includes(N)) (byFile[e.file] ||= []).push(e);
for (const f of ORDER) {
  const file = path.join(C, f);
  if (!fs.existsSync(file)) { console.log(`  MISSING        ${f}`); refused++; continue; }
  const raw = read(file), eol = raw.includes("\r\n") ? "\r\n" : "\n";
  let t = raw.replace(/\r\n/g, "\n"), done = 0, todo = 0;
  for (const e of byFile[f] || []) {
    if (t.includes(e.has)) { done++; continue; }
    const n = t.split(e.find).length - 1;
    if (n !== 1) { console.log(`  REFUSED        ${f}: "${e.name}" anchor matches ${n} times (must be exactly 1)`); refused++; continue; }
    t = t.replace(e.find, () => e.replace); todo++;
  }
  console.log(`  ${todo ? "CHANGES       " : "already there "} ${f}  ${todo} edit(s) to make, ${done} already done  (${eol === "\r\n" ? "CRLF" : "LF"})`);
  if (todo) plans.push({ file, text: t.replace(/\n/g, eol), name: f, step: ORDER.indexOf(f) + 1 });
}
/* 2. the head runtime, through the tool that already proved it on five pairs */
const rtFile = path.join(C, "runtime/runtime.tsx");
const rtOut = execFileSync("node", [path.join(HERE, "apply.mjs"), "--runtime", rtFile], { encoding: "utf8" });
const rtLine = rtOut.split("\n")[0];
console.log(`  ${/already patched/.test(rtLine) ? "already there " : /REFUSED/.test(rtLine) ? "REFUSED       " : "CHANGES       "} runtime/runtime.tsx  ${rtLine.replace(/\s+/g, " ").slice(0, 150)}`);
if (/REFUSED/.test(rtLine)) refused++;

if (refused) { console.log(`\n${refused} problem(s): nothing was written.`); process.exit(1); }
const rtTodo = /old r28\/r29 helper/.test(rtLine);
if (!plans.length && !rtTodo) { console.log("\nnothing to do: class" + N + " already has it."); process.exit(0); }
if (!APPLY) { console.log(`\nDRY RUN: ${plans.length} file(s) and ${rtTodo ? "the head runtime" : "no runtime change"} would be written. Re-run with --apply.`); process.exit(0); }

/* apply: back up everything it will touch, then write in order, each file in one rename after a syntax check */
const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 13).replace("T", "-");
const bdir = path.join(ROOT, "_backups", `pencil-standard-class${N}-${stamp}`);
for (const p of [...plans.filter((x) => !x.isNew).map((x) => x.file), ...(rtTodo ? [rtFile] : [])]) {
  const to = path.join(bdir, path.relative(ROOT, p));
  fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(p, to);
}
console.log(`\nbackup: ${rel(bdir)}`);
const swap = (p) => {
  const tmp = p.file.replace(/\.mjs$/, ".pencil-tmp.mjs");
  fs.writeFileSync(tmp, p.text);
  try { execFileSync("node", ["--check", tmp], { stdio: "pipe" }); }
  catch (e) { fs.rmSync(tmp, { force: true }); throw new Error(`${p.name}: the new text does not parse: ${String(e.stderr || e.message).split("\n")[0]}`); }
  fs.renameSync(tmp, p.file);
  console.log(`  wrote ${p.name}`);
};
for (const p of plans.filter((x) => x.step === 0)) swap(p);   /* the module first */
if (rtTodo) { execFileSync("node", [path.join(HERE, "apply.mjs"), "--runtime", rtFile, "--apply"], { stdio: "pipe" }); console.log("  wrote runtime/runtime.tsx (the helper block)"); }
for (const p of plans.filter((x) => x.step > 0).sort((a, b) => a.step - b.step)) swap(p);
console.log(`\nclass${N} done. Next: the unit tests, a load test of check.mjs, the docs. Nothing was frozen or pinned.`);
