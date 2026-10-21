#!/usr/bin/env node
/* pencil-writing call sites: class 4 chapter 7, M2.S3.T5.C20.2D1 (same amount: the cross-product phase, SabCross). The record of what changed in this pair,
 * applied as exact-string replacements (each OLD text must match exactly once; a NEW text already there is skipped, so a second run changes nothing; nothing
 * is written unless every replacement applies and the result parses). Run:  node pencil-writing/call-sites/7__M2.S3.T5.C20.2D1.mjs [--dry]
 *
 * What it does (the pair's helper block already carries the `write` move, PencilText and PencilLine):
 *   - sabProdBase(bx): the middle of the baseline a cross product sits on in its box (the printed text had y = box y + 14); ONE function used by the act
 *     AND by productBox, so the written number never moves when the act ends
 *   - SabCross.draw, the product act: a `push` of one tick per character (ms 700 / 500 when fast, 1.45 s with the pencil's beat) is now ONE `write` of the
 *     product text, centred on its box (the digits are the tip's own strokes; no ms, no hold)
 *   - productBox: the product is <PencilText> of the full product with `chars` = the characters written so far (S.prod[k] is the string so far, as before),
 *     in graphite, instead of the printed Poppins <text>; the same box draws it in the "strong" state (S.right), so nothing swaps when the verdict lands
 *   - left as they are (not numbers): the guide-line drop of SabSame (`draw`, a vertical line), the crossing lines of SabCross (`draw`, the tool's coloured
 *     line that grows with the tip), the trace's light rows (their two products are popped by the tool's timeline, not by a pencil act) */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CLASS4, pairPath, read } from "../lib.mjs";

const esbuild = createRequire(path.join(CLASS4, "package.json"))("esbuild");
const DRY = process.argv.includes("--dry");
const file = pairPath("7", "M2.S3.T5.C20.2D1");

const R = []; // [name, oldText, newText]
const rep = (name, a, b, optional) => R.push([name, a, b, !!optional]);

/* ---------------------------------------------------------------- helper next to DY4 */
rep("helper sabProdBase",
`const DY4 = 36;
`,
`const DY4 = 36;
/* where the pencil writes a cross product in its box (the middle, the baseline): the act and productBox use the same, so nothing jumps at the act's end */
const sabProdBase = (bx) => ({ x: bx.x, y: bx.y + 14 });
`);

/* ---------------------------------------------------------------- the product act */
rep("product act",
`      const txt = String(prodOf(key)), bx = boxAt(key), n = txt.length;
      const at2 = Array.from({ length: n }, (_, j) => ({ x: off + bx.x + (j - (n - 1) / 2) * 24, y: DY4 + bx.y }));
      ok = await api.act({
        tool: "pencil",
        moves: "push",
        from: { x: off + bx.x - 44, y: DY4 + bx.y },
        at: at2,
        to: { x: off + bx.x + 44, y: DY4 + bx.y },
        ms: fast ? 500 : 700,
        onPoint: (j) => put((q) => ({ prod: { ...q.prod, [key]: txt.slice(0, j + 1) } }))
      });`,
`      const txt = String(prodOf(key)), pb = sabProdBase(boxAt(key));
      ok = await api.act({
        tool: "pencil",
        moves: "write",
        text: txt,
        at: [{ x: off + pb.x, y: DY4 + pb.y }],
        size: T.prompt,
        align: "middle",
        onPoint: (j) => put((q) => ({ prod: { ...q.prod, [key]: txt.slice(0, j + 1) } }))
      });`);

/* ---------------------------------------------------------------- productBox draws the written product */
rep("productBox head", `  const productBox = (k, text, kind) => {
    const at = boxAt(k);
`, `  const productBox = (k, text, kind) => {
    const at = boxAt(k), pb = sabProdBase(at);
`);
rep("productBox text",
`        {text ? <text x={at.x} y={at.y + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={SAB_LINE}>{text}</text> : null}`,
`        {text ? <PencilText text={String(prodOf(k))} x={pb.x} y={pb.y} size={T.prompt} align="middle" chars={String(text).length} /> : null}`);

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
