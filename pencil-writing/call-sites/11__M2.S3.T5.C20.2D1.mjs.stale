#!/usr/bin/env node
/* pencil-writing call sites: class 4 chapter 11, M2.S3.T5.C20.2D1 (weighing_bench, phase 4: the place board; the pencil writes a grey zero into the empty
 * hundreds box and then the empty tens box). The record of what changed in this pair, applied as exact-string replacements (each OLD text must match exactly once;
 * a NEW text already there is skipped, so a second run changes nothing; nothing is written unless every replacement applies and the result parses). Run:
 *   node pencil-writing/call-sites/11__M2.S3.T5.C20.2D1.mjs [--dry] [--file <copy.tsx>]
 *
 * What it does (the pair's helper block already carries the `write` move, PencilText and PencilLine):
 *   - wbZeroPen(box): ONE top-level function giving where a place-board zero is written (the cell's middle, the baseline the printed zero sat on = cell y + 114, the
 *     size it was printed with = T.display); the act (zeroAct) AND the cell drawing use it, so the act's last frame and the finished zero are one drawing
 *   - zeroAct: the `push` (one point, the default ~1.05 s x tempo + 400 ms beat) is now a `write` of "0" at the cell, size T.display, align middle, in the grey zero's
 *     own colour (WB_ZERO); no ms, no hold; onPoint still sets zeros[k] (it fires when the tip finishes the zero), the .then still sets it again, calls api.did and settleAct
 *   - placeBench: a cell the pencil wrote (zeros[i]) draws <PencilText text="0" chars={1}> in WB_ZERO instead of the printed Poppins <text>, and keeps drawing it
 *     (nothing swaps from pencil to Poppins). The grey zeros the correction drops (s.zd, a timeline, not a pencil act) and every other digit stay printed
 *   - not touched: the place board's 7-place layout and headings, the hi/gu headings, the hit areas and invites, the card/converter hand acts, TR, English, layout */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CLASS4, pairPath, read } from "../lib.mjs";

const esbuild = createRequire(path.join(CLASS4, "package.json"))("esbuild");
const DRY = process.argv.includes("--dry");
const fi = process.argv.indexOf("--file");
const file = fi > 0 ? path.resolve(process.argv[fi + 1]) : pairPath("11", "M2.S3.T5.C20.2D1");

const R = []; // [name, oldText, newText, optional]
const rep = (name, a, b, optional) => R.push([name, a, b, !!optional]);

/* ---------------------------------------------------------------- top level: one geometry for the act and the drawing */
rep("helper wbZeroPen",
`const WB_ZERO = "#767676";
`,
`const WB_ZERO = "#767676";
/* where the pencil writes a place-board zero and where the cell draws it: the middle of the cell, the baseline the printed zero sat on (cell y + 114), the size it
   was printed with. The act (zeroAct) and placeBench use these very numbers, so nothing moves when the act ends. */
const wbZeroPen = (b) => ({ x: b.x + b.w / 2, y: b.y + 114, size: T.display });
`);

/* ---------------------------------------------------------------- the zero act */
rep("zeroAct write",
`    const k = on === "zero-h" ? 2 : 3, b = cellBox(k);
    playing.current = true;
    api.act({
      tool: "pencil",
      moves: "push",
      at: [P(b.x + b.w / 2, b.y + 96)],
      onPoint: () => put((c) => ({ zeros: { ...c.zeros, [k]: true } }))
    }).then((ok) => {`,
`    const k = on === "zero-h" ? 2 : 3, zp = wbZeroPen(cellBox(k));
    playing.current = true;
    api.act({
      tool: "pencil",
      moves: "write",
      text: "0",
      at: [P(zp.x, zp.y)],
      size: zp.size,
      align: "middle",
      color: WB_ZERO,
      onPoint: () => put((c) => ({ zeros: { ...c.zeros, [k]: true } }))
    }).then((ok) => {`);

/* ---------------------------------------------------------------- placeBench draws the written zero */
rep("placeBench: pen flag",
`          if (s.zd || s.zeros[i]) cells[i] = { ch: "0", fill: WB_ZERO };`,
`          if (s.zd || s.zeros[i]) cells[i] = { ch: "0", fill: WB_ZERO, pen: !!s.zeros[i] };`);
rep("placeBench: zp",
`      const b = cellAt(i), c = cells[i];
      return <g key={"cell" + i}>`,
`      const b = cellAt(i), c = cells[i], zp = wbZeroPen(b);
      return <g key={"cell" + i}>`);
rep("placeBench: PencilText zero",
`              {c ? <text x={b.x + b.w / 2} y={b.y + 114} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={c.fill}>{c.ch}</text> : null}`,
`              {c ? c.pen ? <PencilText text="0" x={zp.x} y={zp.y} size={zp.size} align="middle" color={c.fill} chars={1} /> : <text x={b.x + b.w / 2} y={b.y + 114} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={c.fill}>{c.ch}</text> : null}`);

/* ---------------------------------------------------------------- apply */
const count = (hay, needle) => { let n = 0, i = -1; while ((i = hay.indexOf(needle, i + 1)) >= 0) n++; return n; };
let text = read(file);
if (text.includes("\r\n")) { console.error("the pair has CRLF line endings; this script writes LF"); process.exit(1); }
let applied = 0, skipped = 0, failed = 0;
for (const [name, a, b, optional] of R) {
  if (text.includes(b)) { skipped++; console.log(`  skip    ${name} (already there)`); continue; }
  const n = count(text, a);
  if (!n && optional) { skipped++; console.log(`  skip    ${name} (not needed)`); continue; }
  if (n !== 1) { failed++; console.error(`  FAILED  ${name}: the old text matches ${n} times (needs exactly 1)`); continue; }
  text = text.replace(a, () => b); applied++; console.log(`  applied ${name}`);
}
if (failed) { console.error(`\n${failed} replacement(s) failed: nothing written`); process.exit(1); }
try { await esbuild.transform(text, { loader: "tsx", jsx: "preserve", logLevel: "silent" }); }
catch (e) { console.error("the result does not parse: " + String(e.message).split("\n").slice(0, 4).join("\n")); process.exit(1); }
if (DRY || !applied) { console.log(`\n${DRY ? "DRY RUN" : "no change"}: ${applied} to apply, ${skipped} already there`); process.exit(0); }
fs.writeFileSync(file, text);
console.log(`\nwritten: ${applied} applied, ${skipped} already there (${(text.length / 1024).toFixed(1)} KB)`);
