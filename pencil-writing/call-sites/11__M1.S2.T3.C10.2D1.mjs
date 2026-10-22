#!/usr/bin/env node
/* pencil-writing call sites: class 4 chapter 11, M1.S2.T3.C10.2D1 (unit_ladder, phase 4: the place board Th H T O; the Write key writes the metres of the warm-up
 * card, 5 km 26 m = 5,026 m, into their boxes, then a tap on the empty hundreds box writes the grey zero). The record of what changed in this pair, applied as
 * exact-string replacements (each OLD text must match exactly once; a NEW text already there is skipped, so a second run changes nothing; nothing is written unless
 * every replacement applies and the result parses). Run:
 *   node pencil-writing/call-sites/11__M1.S2.T3.C10.2D1.mjs [--dry] [--file <copy.tsx>]
 *
 * What it does (the pair's helper block already carries the `write` move, PencilText and PencilLine: pencil-writing/apply.mjs):
 *   - top level: ONE token geometry for the act AND the drawing (ulPenToks: each run of neighbouring place-board boxes of one colour is one token, a box a cell
 *     (step = box + gap, align start at the cell's left edge, so a digit's cell centre is the box centre the board printed at), on the baseline the board printed on
 *     (box y + 60), at its size (T.xl), in the board's own colour (ulCol: the km digit in the big colour, the metres in the small colour, the zero in UL_ZERO);
 *     ulPenDraw: <PencilText> per token, the first n characters), so a written digit never moves when its act ends
 *   - the Write act: a `push` over the non-zero digits' box middles (the default ~1.05 s x tempo + 400 ms beat) is now ONE `write` of the runs ("5" big colour,
 *     "26" small colour); onPoint still counts S.wrote (it fires when the tip finishes digit i), the patch { wrote: 3 } and api.did("write") are as they were
 *   - the zero act: a `push` on the hundreds box is now a `write` of "0" (the zero run of the same tokens: the hundreds box) in the grey UL_ZERO; onPoint still sets
 *     S.zero, the patch and api.did("zero") are as they were. Neither act had an `ms` or an sfx after it (nothing to delete)
 *   - the drawing: the warm-up board (phase 4's guide card, the only place these acts run) keeps its boxes, headings and ring, prints no digit, and draws the written
 *     digits with <PencilText> from the same tokens (board's new `pen` argument, drawn above the boxes)
 *   - not touched: the ask stage's board (printed: the typed digits, the lv reveal and the trace's timeline), the cards, chips, slot, ladder, tiles, stick/ruler/sign
 *     hand acts, the keys and their 400 ms guard, the Hit and Invite on the hundreds box, TR, English, the hi/gu layout */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CLASS4, pairPath, read } from "../lib.mjs";

const esbuild = createRequire(path.join(CLASS4, "package.json"))("esbuild");
const DRY = process.argv.includes("--dry");
const fi = process.argv.indexOf("--file");
const file = fi > 0 ? path.resolve(process.argv[fi + 1]) : pairPath("11", "M1.S2.T3.C10.2D1");

const R = []; // [name, oldText, newText, optional]
const rep = (name, a, b, optional) => R.push([name, a, b, !!optional]);

/* ---------------------------------------------------------------- top level: one token geometry for the act and the drawing */
rep("helpers ulPenToks/ulPenDraw",
`const ulSeg = (s, c) => ({ s, c });
`,
`const ulSeg = (s, c) => ({ s, c });
/* the pencil's place-board digits: ONE list of tokens for the act and for the drawing, so nothing moves when an act ends. Each run of neighbouring boxes of one
   colour is one token, a box a cell (step = box + gap, start-aligned at the cell's left edge: a digit's cell centre is the box centre the board printed at), on the
   baseline the board printed on (box y + 60), at the size it printed with (T.xl), in the board's own colour (ulCol). zero: the placeholder zeros only, else the rest */
const UL_PB_CELL = UL_PB.w + UL_PB.gap;
const ulPenToks = (ds, C, zero) => ds.reduce((a, d, i) => {
  if (!d.s || (d.c === "zero") !== zero) return a;
  const l = a[a.length - 1];
  if (l && l.c === d.c && l.i1 === i - 1) {
    l.s += d.s;
    l.i1 = i;
    return a;
  }
  a.push({ s: d.s, c: d.c, i1: i, x: UL_PB.x + i * UL_PB_CELL - UL_PB.gap / 2, y: UL_PB.y + 60, size: T.xl, step: UL_PB_CELL, color: ulCol(C, d.c) });
  return a;
}, []);
/* what the board draws for written digits: the first n characters of the tokens, each token its own PencilText */
const ulPenDraw = (toks, n, key) => {
  let c0 = 0;
  return <g key={key}>{toks.map((t, i) => {
    const a = c0;
    c0 += t.s.length;
    return <PencilText key={i} text={t.s} x={t.x} y={t.y} size={t.size} align="start" step={t.step} color={t.color} chars={Math.max(0, Math.min(t.s.length, n - a))} />;
  })}</g>;
};
`);

/* ---------------------------------------------------------------- the Write act */
rep("write act",
`      const idx = pbDigits().map((d, i) => d.c !== "zero" && d.s ? i : -1).filter((i) => i >= 0);
      perform({
        tool: "pencil",
        moves: "push",
        at: idx.map((i) => P(boxX(i) + UL_PB.w / 2, UL_PB.y + UL_PB.h / 2)),
        onPoint: (i) => put({ wrote: i + 1 })
      }, "", { wrote: 3 }, () => api.did("write"));`,
`      const toks = ulPenToks(pbDigits(), C, false);
      perform({
        tool: "pencil",
        moves: "write",
        text: toks.map((t) => t.s),
        at: toks.map((t) => P(t.x, t.y)),
        size: toks.map((t) => t.size),
        align: "start",
        step: toks.map((t) => t.step),
        color: toks.map((t) => t.color),
        onPoint: (i) => put((b) => ({ wrote: Math.max(b.wrote, i + 1) }))
      }, "", { wrote: 3 }, () => api.did("write"));`);

/* ---------------------------------------------------------------- the zero act */
rep("zero act",
`    } else if (on === "zero" && S.wrote >= 3 && !S.zero) {
      perform(
        { tool: "pencil", moves: "push", at: [P(boxX(1) + UL_PB.w / 2, UL_PB.y + UL_PB.h / 2)], onPoint: () => put({ zero: true }) },`,
`    } else if (on === "zero" && S.wrote >= 3 && !S.zero) {
      const zt = ulPenToks(pbDigits(), C, true);
      perform(
        { tool: "pencil", moves: "write", text: zt.map((t) => t.s), at: zt.map((t) => P(t.x, t.y)), size: zt.map((t) => t.size), align: "start", step: zt.map((t) => t.step), color: zt.map((t) => t.color), onPoint: () => put({ zero: true }) },`);

/* ---------------------------------------------------------------- the board draws the written digits */
rep("board: pen argument",
`  const board = (digs, ring) => <g key="pb">`,
`  const board = (digs, ring, pen) => <g key="pb">`);
rep("board: pen drawn above the boxes",
`  })}
    </g>;
  const ringC = `,
`  })}
      {pen}
    </g>;
  const ringC = `);
rep("cardLane: pen decl",
`    let digs = null, ring = null;
`,
`    let digs = null, ring = null, pen = null;
`);
rep("cardLane: warm board from the tokens",
`        const all = pbDigits();
        let w = 0;
        digs = all.map((d) => {
          if (d.c === "zero") return S.zero ? d : { s: "", c: "zero" };
          if (!d.s) return d;
          w += 1;
          return w <= S.wrote ? d : { s: "", c: d.c };
        });
`,
`        /* the warm-up board: every digit on it is one the pencil wrote, drawn from the act's own tokens (the boxes stay empty underneath), so nothing moves when
           an act ends */
        const all = pbDigits();
        digs = all.map((d) => ({ s: "", c: d.c }));
        pen = [ulPenDraw(ulPenToks(all, C, false), S.wrote, "pbw"), ulPenDraw(ulPenToks(all, C, true), S.zero ? 4 : 0, "pbz")];
`);
rep("cardLane: board gets pen",
`    if (digs) out.push(board(digs, ring !== null && ring >= 0 ? ring : null));`,
`    if (digs) out.push(board(digs, ring !== null && ring >= 0 ? ring : null, pen));`);

/* ---------------------------------------------------------------- apply */
const count = (hay, needle) => { let n = 0, i = -1; while ((i = hay.indexOf(needle, i + 1)) >= 0) n++; return n; };
let text = read(file);
if (text.includes("\r\n")) { console.error("the pair has CRLF line endings; this script writes LF"); process.exit(1); }
let applied = 0, skipped = 0, failed = 0;
for (const [name, a, b, optional] of R) {
  if (b && text.includes(b)) { skipped++; console.log(`  skip    ${name} (already there)`); continue; }
  const n = count(text, a);
  if (!n && optional) { skipped++; console.log(`  skip    ${name} (not needed)`); continue; }
  if (n !== 1) { failed++; console.error(`  FAILED  ${name}: the old text matches ${n} times (needs exactly 1)`); continue; }
  text = text.replace(a, () => b); applied++; console.log(`  applied ${name}`);
}
if (failed) { console.error(`\n${failed} replacement(s) failed: nothing written`); process.exit(1); }
try { await esbuild.transform(text, { loader: "tsx", jsx: "preserve", logLevel: "silent" }); }
catch (e) { console.error("the result does not parse: " + String(e.message).split("\n").slice(0, 4).join("\n")); process.exit(1); }
if (/tool: "pencil",\s*moves: "push"|tool: "pencil", moves: "push"/.test(text)) console.log(`  note: a pencil push is still in the pair (check it is not a write)`);
if (DRY || !applied) { console.log(`\n${DRY ? "DRY RUN" : "no change"}: ${applied} to apply, ${skipped} already there`); process.exit(0); }
fs.writeFileSync(file, text);
console.log(`\nwritten: ${applied} applied, ${skipped} already there (${(text.length / 1024).toFixed(1)} KB)`);
