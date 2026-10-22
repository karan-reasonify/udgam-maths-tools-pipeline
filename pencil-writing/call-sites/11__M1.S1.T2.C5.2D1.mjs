#!/usr/bin/env node
/* pencil-writing call sites: class 4 chapter 11, M1.S1.T2.C5.2D1 (ruler_bench, phase 4's warm-up: the child taps Guess and the pencil writes the guess, "15", on the
 * guess card; the unit "cm" is printed). The record of what changed in this pair, applied as exact-string replacements (each OLD text must match exactly once;
 * a NEW text already there is skipped, so a second run changes nothing; nothing is written unless every replacement applies and the result parses). Run:
 *   node pencil-writing/call-sites/11__M1.S1.T2.C5.2D1.mjs [--dry] [--file <copy.tsx>]
 *
 * What it does (the pair's helper block already carries the `write` move, PencilText and PencilLine):
 *   - rbGuessPen(ds): ONE top-level function giving where the guess is written (the card's start x = RB_CARD4_X[0] + 64, the baseline the printed guess sat on = card y + 116,
 *     size T.xl) and where the printed unit goes (the pencil digits' own width + a Poppins space); the act (pressGuess) AND the card drawing use it, so the act's last frame
 *     and the finished digits are one drawing. The act's `at` is shifted by `ox` through WP, the drawing is inside translate(ox, 0) and is not.
 *   - pressGuess: the `push` (one point per digit and one for the unit, "1" "5" " cm") is now a `write` of the digits only ("15"), start-aligned, size T.xl, in the tool's ink
 *     (C.ink, the colour the printed guess had); no ms; onPoint(i) keeps gw = i + 1 (characters finished); after the act the .then still sets gw = N (= digits + 1), which
 *     is what prints the unit and puts the dashed guess line on the ruler, as before
 *   - drawScaleQ (warm card only): the guess is <PencilText chars={min(gw, digits)}> and the unit "cm" is a printed Poppins <text> once gw > digits. The non-warm cards
 *     (the question's estimate "30 cm", the measure card "17 cm") stay printed: the pencil never wrote them
 *   - not touched: the Count act (pressCount: `tap` over the ruler's ticks, a mark), the Measure ruler slide, phase 1's glides, TR, English, layout */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CLASS4, pairPath, read } from "../lib.mjs";

const esbuild = createRequire(path.join(CLASS4, "package.json"))("esbuild");
const DRY = process.argv.includes("--dry");
const fi = process.argv.indexOf("--file");
const file = fi > 0 ? path.resolve(process.argv[fi + 1]) : pairPath("11", "M1.S1.T2.C5.2D1");

const R = []; // [name, oldText, newText, optional]
const rep = (name, a, b, optional) => R.push([name, a, b, !!optional]);

/* ---------------------------------------------------------------- top level: one geometry for the act and the drawing */
rep("helper rbGuessPen",
`const RB_CARD4_X = [110, 510];
`,
`const RB_CARD4_X = [110, 510];
/* where the pencil writes the guess on the guess card and where the card draws it: the card's start x, the baseline the printed guess sat on (card y + 116), the size it was
   printed with (T.xl); ux = where the printed unit starts (after the pencil digits' own width and a Poppins space). The act (pressGuess, shifted by ox through WP) and
   drawScaleQ (inside translate(ox, 0)) use these very numbers, so nothing moves when the act ends. */
const rbGuessPen = (ds) => {
  const x = RB_CARD4_X[0] + 64, y = RB4.cardY + 116, size = T.xl;
  return { x, y, size, ux: x + penLayout(ds, x, y, size, "start").w + Math.round(size * 0.26) };
};
`);

/* ---------------------------------------------------------------- the Guess act */
rep("pressGuess write",
`    const ds = String(it.estimate), N = ds.length + 1, x0 = RB_CARD4_X[0] + 64, y = RB4.cardY + 108;
    const at = [];
    for (let j = 0; j < N; j++) at.push(WP({ x: x0 + 18 + j * 34, y }));
    run(
      { tool: "pencil", moves: "push", at, onPoint: (i) => put({ gw: i + 1 }) },
      () => {`,
`    const ds = String(it.estimate), N = ds.length + 1, gp = rbGuessPen(ds);
    run(
      { tool: "pencil", moves: "write", text: ds, at: [WP({ x: gp.x, y: gp.y })], size: gp.size, align: "start", color: C.ink, onPoint: (i) => put({ gw: i + 1 }) },
      () => {`);

/* ---------------------------------------------------------------- the card draws the written guess */
rep("drawScaleQ: gp",
`    const isWarm = K === "warm4", E = it.estimate, M = it.measure;
`,
`    const isWarm = K === "warm4", E = it.estimate, M = it.measure, gp = rbGuessPen(String(E));
`);
rep("drawScaleQ: PencilText guess",
`{j === 0 && isWarm ? <text x={RB_CARD4_X[0] + 64} y={RB4.cardY + 116} textAnchor="start" fontSize={T.xl} fontWeight={700} fill={C.ink}>{cardVal(0)}</text> : <text x=`,
`{j === 0 && isWarm ? <g>
              <PencilText text={String(E)} x={gp.x} y={gp.y} size={gp.size} align="start" color={C.ink} chars={Math.min(guessW, String(E).length)} />
              {guessW > String(E).length && <text x={gp.ux} y={gp.y} textAnchor="start" fontSize={T.xl} fontWeight={700} fill={C.ink}>{tx("cm")}</text>}
            </g> : <text x=`);

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
