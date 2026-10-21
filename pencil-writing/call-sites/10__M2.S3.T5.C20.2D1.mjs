#!/usr/bin/env node
/* pencil-writing call sites: class 4 chapter 10, M2.S3.T5.C20.2D1 (the letter-code wheel: the Try key writes what a key reads, in a row of cards). The record of
 * what changed in this pair, applied as exact-string replacements (each OLD text must match exactly once; a NEW text already there is skipped, so a second run
 * changes nothing; nothing is written unless every replacement applies and the result parses). Run:  node pencil-writing/call-sites/10__M2.S3.T5.C20.2D1.mjs [--dry]
 *
 * What it does (the pair's helper block already carries the `write` move with letters A-Z and the `step` option, PencilText and PencilLine):
 *   - cwRowPen(RX, ry): ONE top-level function giving where a trial row's cards are written (the row's start x = the left edge of card 0's 64 px cell, the baseline
 *     the printed cards sat on, the size, the step); the act AND trialRows use it, so the act's last frame and the finished letters are one drawing
 *   - doTry (the Try key): the `push` of one tick per card (ms 700, 1.45 s with the pencil's beat) is now ONE `write` of the whole row, `text: cards.join("")`,
 *     `step: 64` (each letter centred in its own cell, the cell centres on the old points RX + 202 + j * 64), `align: "start"`; no ms, no hold; `onPoint(j)` still
 *     sets tryAt { row, n: j + 1 } (a letter is one character)
 *   - trialRows: every row's cards (the one being written, finished rows, demo rows, the solved page's extra rows) are drawn with <PencilText step chars>, in graphite,
 *     instead of the printed Poppins <text> (madeInk); a row never swaps from pencil to Poppins
 *   - not touched: the row's key label ("3 back", "A is 26") stays printed (it appears with the row, before the act), the Count hand tap (a `hand` act), Thumb's cells,
 *     the wheel and the message strip */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CLASS4, pairPath, read } from "../lib.mjs";

const esbuild = createRequire(path.join(CLASS4, "package.json"))("esbuild");
const DRY = process.argv.includes("--dry");
const file = pairPath("10", "M2.S3.T5.C20.2D1");

const R = []; // [name, oldText, newText, optional]
const rep = (name, a, b, optional) => R.push([name, a, b, !!optional]);

/* ---------------------------------------------------------------- top level: one geometry for the act and the drawing */
rep("helper cwRowPen",
`const cwKeyWord = (turn) => turn === 0 ? "no turn yet" : Math.abs(turn) + (turn > 0 ? " on" : " back");
`,
`const cwKeyWord = (turn) => turn === 0 ? "no turn yet" : Math.abs(turn) + (turn > 0 ? " on" : " back");
/* where the pencil writes a trial row's cards (and where the row draws them): x = the left edge of card 0's 64 px cell (the cell centres are the old RX + 202 + j * 64),
   y = the baseline the printed cards sat on (ry + 43), the size they were printed with, and the cell width. The act and trialRows use these very numbers. */
const cwRowPen = (RX, ry) => ({ x: RX + 202 - 32, y: ry + 43, size: T.label, step: 64 });
`);

/* ---------------------------------------------------------------- the Try act */
rep("doTry act",
`    const ry = L.rY + row * 70;
    const pts = cards.map((_, j) => ({ x: RX + 202 + j * 64, y: ry + 34 }));
    const ok = await api.act({ tool: "pencil", moves: "push", at: pts, ms: 700, onPoint: (j) => {
      if (qkRef.current === my) put({ tryAt: { row, n: j + 1 } });
    } });`,
`    const pr = cwRowPen(RX, L.rY + row * 70);
    const ok = await api.act({ tool: "pencil", moves: "write", text: cards.join(""), at: [{ x: pr.x, y: pr.y }], size: pr.size, step: pr.step, align: "start", onPoint: (j) => {
      if (qkRef.current === my) put({ tryAt: { row, n: j + 1 } });
    } });`);

/* ---------------------------------------------------------------- trialRows draws the written letters */
rep("trialRows: pr",
`      const ry = L.rY + k * 70, upTo = st.tryAt && st.tryAt.row === k ? st.tryAt.n : r.cards.length;`,
`      const ry = L.rY + k * 70, upTo = st.tryAt && st.tryAt.row === k ? st.tryAt.n : r.cards.length, pr = cwRowPen(RX, ry);`);
rep("trialRows: letters",
`              {r.cards.slice(0, upTo).map((ch, j) => <text key={j} x={RX + 202 + j * 64} y={ry + 43} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={madeInk}>{ch}</text>)}`,
`              {upTo > 0 ? <PencilText text={r.cards.join("")} x={pr.x} y={pr.y} size={pr.size} step={pr.step} align="start" chars={upTo} /> : null}`);

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
