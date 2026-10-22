#!/usr/bin/env node
/* pencil-writing call sites: class 4 chapter 11, M1.S2.T4.C15.2D1 (length_columns: km/m, m/cm, cm/mm in columns). The record of what changed in this pair,
 * applied as exact-string replacements (each OLD text must match exactly once; a NEW text already there is skipped, so a second run changes nothing; nothing
 * is written unless every replacement applies and the result parses). Run:  node pencil-writing/call-sites/11__M1.S2.T4.C15.2D1.mjs [--dry]
 *
 * The pair's helper block already carries the `write` move, PencilText and PencilLine (pencil-writing/apply.mjs). What this does:
 *   - top level: ONE token geometry for the act AND the drawing (lcPenR: a figure right-aligned where lcCharXs printed it; lcPenBoxes: digits one box a cell,
 *     leading zeros in the placeholder grey as greyOf drew them; lcPenPut: ML1's number in the tapped box, then the zeros; lcPenDraw: <PencilText> per token,
 *     the first n characters), so a written figure never moves when its act ends. Baselines are the ones the tool printed on (top + LC.base, LC.amber, by)
 *   - Work's `pen` helper: a `push` over the figures' middles (ms 900) is now a `write` of tokens (text/at/size/align/step/color one per token; ax() adds ox)
 *   - every `pen(` call writes figures now, in the tool's own ink colours (km blue, m green, grey zero, amber):
 *       big (phase 1 warm-up: the km figure), ones (its metres digits), hundreds (the grey zero), add-small (the sum in the carry box), carry (its 2nd act: the
 *       metres answer boxes), add-big (the km answer), take (metres boxes + km answer in ONE act), split (its 2nd act: the amber metres/centimetres figure),
 *       break (ONE act: five dabs along the tool's own strike line, then the amber figure above the struck one: the NOTES dab recipe; the strike stays the
 *       tool's <line>), box-N (ML1, the child's tap: the 9 in the tapped box, then the grey zeros left to right; a space skips the tapped box)
 *   - the drawing: in the warm-up and free play (where only the pencil puts these figures) and on ML1's place row while it shows the layout the pencil wrote,
 *     the written figures are <PencilText>; the trace, the win page and the given rows stay printed Poppins
 *   - perform: the api.sfx.tick() after a box-N write is gone (the act scratches itself); the lock, lcWait and every hand/knife act are unchanged
 *   - left as they are: the hand carries and the knife (marks), the ask stage's Break key (`brk`: hand + knife, its amber figures appear at the touch, no
 *     pencil), the trace's timeline, the joining sign, the card, the chip labels (chipNode, chipTall) */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CLASS4, pairPath, read } from "../lib.mjs";

const esbuild = createRequire(path.join(CLASS4, "package.json"))("esbuild");
const DRY = process.argv.includes("--dry");
const file = pairPath("11", "M1.S2.T4.C15.2D1");

const R = []; // [name, oldText, newText]
const rep = (name, a, b, optional) => R.push([name, a, b, !!optional]);

/* ---------------------------------------------------------------- top level: the token geometry */
rep("helpers after LC_SEQ",
`const LC_SEQ = { add: ["add-small", "carry", "add-big"], sub: ["break", "split", "take"] };
`,
`const LC_SEQ = { add: ["add-small", "carry", "add-big"], sub: ["break", "split", "take"] };
/* the pencil's figures: ONE list of tokens for the act and for the drawing, so nothing moves when an act ends. A token is { s, x, y, size, align, step, color }
   (or { dab: [x, y], size }); y is the baseline the tool printed on */
const LC_CELL = LC.boxW + LC.gap;
/* a figure right-aligned at x, where lcCharXs printed it (the km column, the sum in the carry box, the amber figures) */
const lcPenR = (s, x, y, size, color) => ({ s: String(s), x, y, size, align: "end", step: 0, color });
/* the characters of s in the boxes from box k0 on, one box a cell (a space skips a box); grey true: the leading zeros are the placeholder grey, as greyOf
   draws them (never the last box); "all": every character is a grey zero */
const lcPenBoxes = (s, B, k0, top, grey) => {
  const y = top + LC.base, cell = (t, k, color) => ({ s: t, x: lcBoxX(B, k) - LC.gap / 2, y, size: T.xl, align: "start", step: LC_CELL, color });
  let z = 0;
  if (grey === "all") z = s.length;
  else if (grey) while (z < s.length - 1 && s[z] === "0") z++;
  const out = [];
  if (z > 0) out.push(cell(s.slice(0, z), k0, LC_ZERO));
  if (z < s.length) out.push(cell(s.slice(z), k0 + z, LC_INK_SMALL));
  return out;
};
/* ML1: the number in box \`at\`, then a grey zero in every other box, left to right (a space skips box \`at\`), as rowCells shows them */
const lcPenPut = (v, B, at, top) => {
  const y = top + LC.base, others = lcSeq(B).filter((j) => j !== at);
  const toks = [{ s: String(v), x: lcBoxX(B, at) + LC.boxW / 2, y, size: T.xl, align: "middle", step: 0, color: LC_INK_SMALL }];
  if (others.length) {
    const z0 = others[0];
    toks.push({ s: lcSeq(others[others.length - 1] - z0 + 1).map((j) => j + z0 === at ? " " : "0").join(""), x: lcBoxX(B, z0) - LC.gap / 2, y, size: T.xl, align: "start", step: LC_CELL, color: LC_ZERO });
  }
  return toks;
};
/* what the tool draws for a written run: the first n characters of the act's tokens (a dab counts one and draws nothing), each token its own PencilText */
const lcPenDraw = (toks, n, key) => {
  let c0 = 0;
  return <g key={key}>{toks.map((t, i) => {
    const a = c0;
    c0 += t.dab ? 1 : t.s.length;
    return t.dab ? null : <PencilText key={i} text={t.s} x={t.x} y={t.y} size={t.size} align={t.align} step={t.step} color={t.color} chars={Math.max(0, Math.min(t.s.length, n - a))} />;
  })}</g>;
};
`);

/* ---------------------------------------------------------------- the answer row: remember when the pencil wrote it */
rep("ansPen decl",
`  let ansCells = [], ansOver = "", ansBig = "";
`,
`  let ansCells = [], ansOver = "", ansBig = "", ansPen = null;
`);
rep("ansPen set",
`      ansCells = lcSeq(B).map((k) => k < nS ? sPad[k] : "");
      ansBig = bigS.slice(0, nB);
`,
`      ansCells = lcSeq(B).map((k) => k < nS ? sPad[k] : "");
      ansPen = [nS, nB];
      ansBig = bigS.slice(0, nB);
`);

/* ---------------------------------------------------------------- rowPen: the given row's digits the pencil wrote */
rep("rowPen",
`  const playing = useRef(false);
  const [actOn, setActOn] = useState(false);
`,
`  /* the digits of a row that the pencil wrote (phase 1's warm-up row; ML1's place row while it shows the layout the pencil wrote): [tokens, characters] pairs, or null */
  const rowPen = (i, rc) => {
    if (!rowsIn) return null;
    if (kind === "warm1" && i === 0) {
      const s = String(rows[0][1]), off = B - s.length;
      return [[lcPenBoxes(s, B, off, lcRowY(0), false), R("ones")], [lcPenBoxes("0".repeat(off), B, 0, lcRowY(0), "all"), R("hundreds")]];
    }
    const v = i === placeRow ? String(rows[i][1]) : "";
    if (!v || S.at === null || S.at === void 0 || rc.cells[S.at] !== v) return null;
    const z0 = lcSeq(B).find((j) => j !== S.at);
    let last = -1;
    rc.cells.forEach((c, j) => {
      if (j !== S.at && c === "0") last = j;
    });
    return [[lcPenPut(v, B, S.at, lcRowY(i)), v.length + (last >= 0 ? last - z0 + 1 : 0)]];
  };
  const playing = useRef(false);
  const [actOn, setActOn] = useState(false);
`);

/* ---------------------------------------------------------------- Work's pen: a write of tokens */
rep("pen helper",
`  const pen = (pts, onP, ms) => api.act({ tool: "pencil", moves: "push", at: ptsAt(pts), onPoint: onP, ms: ms || 900 });
`,
`  const pen = (toks, onP) => api.act({
    tool: "pencil",
    moves: "write",
    text: toks.map((t) => t.dab ? { dab: [t.dab[0] + ox, t.dab[1]], size: t.size } : t.s),
    at: toks.map((t) => t.dab ? null : ax(t)),
    size: toks.map((t) => t.size),
    align: toks.map((t) => t.align || "start"),
    step: toks.map((t) => t.step || 0),
    color: toks.map((t) => t.color || PEN_INK),
    onPoint: onP
  });
`);
rep("drop boxPt/bigPts",
`  const boxPt = (k, top) => ({ x: lcBoxX(B, k) + LC.boxW / 2, y: top + 30 });
  const bigPts = (s, top) => lcCharXs(s, LC.bigR, T.xl).map((x) => ({ x, y: top + 30 }));
`,
``);

/* ---------------------------------------------------------------- break: five dabs along the strike, then the amber figure (one act) */
rep("doBreak",
`      const strike = lcSeq(5).map((i) => ({ x: x1 + (x2 - x1) * (i + 1) / 5, y }));
      const nb = lcCharXs(topBigS, LC.bigR, T.prompt).map((x) => ({ x, y: LC.chipY + 20 }));
      setP(name, 0);
      if (!await pen([...strike, ...nb], (i) => setP(name, i + 1), ms)) return false;
`,
`      const strike = lcSeq(5).map((i) => ({ dab: [x1 + (x2 - x1) * (i + 1) / 5, y], size: T.xl }));
      setP(name, 0);
      if (!await pen([...strike, lcPenR(topBigS, LC.bigR, LC.amber, T.prompt, LC_INK_AMBER)], (i) => setP(name, i + 1))) return false;
`);

/* ---------------------------------------------------------------- split: the knife, then the amber figure */
rep("doSplit",
`      const ns = lcCharXs(topSmallS, LC.boxR, T.prompt).map((x) => ({ x, y: LC.chipY + 20 }));
      return pen(ns, (i) => setP(name, 10 + i), ms);
`,
`      return pen([lcPenR(topSmallS, LC.boxR, LC.amber, T.prompt, LC_INK_AMBER)], (i) => setP(name, 10 + i));
`);

/* ---------------------------------------------------------------- phase 1 warm-up and the sum */
rep("big/ones/hundreds/add-small",
`    if (on === "big") return pen(bigPts(String(rows[0][0]), lcRowY(0)), (i) => setP(on, i + 1));
    if (on === "ones") {
      const s = String(rows[0][1]);
      return pen(s.split("").map((_, j) => boxPt(B - s.length + j, lcRowY(0))), (i) => setP(on, i + 1));
    }
    if (on === "hundreds") return pen(lcSeq(B - String(rows[0][1]).length).map((j) => boxPt(j, lcRowY(0))), (i) => setP(on, i + 1));
    if (on === "add-small") {
      const xs = lcCharXs(sumS, LC.cx + 40, T.xl);
      return pen(xs.map((x) => ({ x, y: 128 })), (i) => setP(on, i + 1));
    }
`,
`    if (on === "big") return pen([lcPenR(rows[0][0], LC.bigR, lcRowY(0) + LC.base, T.xl, LC_INK_BIG)], (i) => setP(on, i + 1));
    if (on === "ones") {
      const s = String(rows[0][1]);
      return pen(lcPenBoxes(s, B, B - s.length, lcRowY(0), false), (i) => setP(on, i + 1));
    }
    if (on === "hundreds") return pen(lcPenBoxes("0".repeat(B - String(rows[0][1]).length), B, 0, lcRowY(0), "all"), (i) => setP(on, i + 1));
    if (on === "add-small") return pen([lcPenR(sumS, LC.cx + 40, (placeRow !== void 0 ? 188 : LC.top) + 76, T.xl, LC_INK_SMALL)], (i) => setP(on, i + 1));
`);

/* ---------------------------------------------------------------- carry (2nd act), add-big, take */
rep("carry write",
`      return pen(lcSeq(B).map((j) => boxPt(j, ansTop)), (i) => setP(on, 2 + i));
`,
`      return pen(lcPenBoxes(sPad, B, 0, ansTop, true), (i) => setP(on, 2 + i));
`);
rep("add-big",
`    if (on === "add-big") return pen(bigPts(bigS, ansTop), (i) => setP(on, i + 1));
`,
`    if (on === "add-big") return pen([lcPenR(bigS, LC.bigR, ansTop + LC.base, T.xl, LC_INK_BIG)], (i) => setP(on, i + 1));
`);
rep("take",
`    if (on === "take") return pen([...lcSeq(B).map((j) => boxPt(j, ansTop)), ...bigPts(bigS, ansTop)], (i) => setP(on, i + 1));
`,
`    if (on === "take") return pen([...lcPenBoxes(sPad, B, 0, ansTop, true), lcPenR(bigS, LC.bigR, ansTop + LC.base, T.xl, LC_INK_BIG)], (i) => setP(on, i + 1));
`);

/* ---------------------------------------------------------------- ML1's box tap: the number, then the zeros */
rep("box-N",
`      const kk = Number(on.slice(4)) - 1;
      const order = [kk, ...lcSeq(B).filter((j) => j !== kk)];
      putE(k, { at: kk, atN: 0 });
      return pen(order.map((j) => boxPt(j, lcRowY(0))), (i) => putE(k, { atN: i + 1 }));
`,
`      const kk = Number(on.slice(4)) - 1;
      putE(k, { at: kk, atN: 0 });
      /* the number in box kk, then the zeros left to right: atN counts as before (the number = 1, then one for each zero) */
      const v = String(rows[placeRow][1]), toks = lcPenPut(v, B, kk, lcRowY(placeRow)), zs = toks.length > 1 ? toks[1].s : "";
      return pen(toks, (i) => putE(k, (b) => ({ atN: Math.max(b.atN || 0, i < v.length - 1 ? 0 : 1 + zs.slice(0, i + 1 - v.length).replace(/ /g, "").length) })));
`);
rep("perform: no tick after a write",
`    if (on.indexOf("box-") === 0) {
      api.sfx.tick();
      return;
    }
`,
`    if (on.indexOf("box-") === 0) return;
`);

/* ---------------------------------------------------------------- the drawing */
rep("rows: pencil digits",
`    return <g key={"row" + i}>
            {boxRow(top, "bx" + i, rc.cells, rc.grey, ring)}
            {bigText(rowBig(i), top, "big" + i, LC_INK_BIG)}
          </g>;
`,
`    const rp = rowPen(i, rc);
    return <g key={"row" + i}>
            {boxRow(top, "bx" + i, rp ? rc.cells.map(() => "") : rc.cells, rc.grey, ring)}
            {rp && rp.map((q, j) => lcPenDraw(q[0], q[1], "rp" + i + "-" + j))}
            {kind === "warm1" && i === 0 && rowsIn ? lcPenDraw([lcPenR(r[0], LC.bigR, top + LC.base, T.xl, LC_INK_BIG)], R("big"), "big" + i) : bigText(rowBig(i), top, "big" + i, LC_INK_BIG)}
          </g>;
`);
rep("answer row: pencil digits",
`          {boxRow(ansTop, "ans", ansCells, greyOf(ansCells), asking && !!box && box.open && part === 1)}
          {bigText(ansBig, ansTop, "ansbig", LC_INK_BIG)}
`,
`          {boxRow(ansTop, "ans", ansPen ? ansCells.map(() => "") : ansCells, greyOf(ansCells), asking && !!box && box.open && part === 1)}
          {ansPen ? lcPenDraw(lcPenBoxes(sPad, B, 0, ansTop, true), ansPen[0], "anspen") : null}
          {ansPen ? lcPenDraw([lcPenR(bigS, LC.bigR, ansTop + LC.base, T.xl, LC_INK_BIG)], ansPen[1], "ansbig") : bigText(ansBig, ansTop, "ansbig", LC_INK_BIG)}
`);
rep("chipRow: amber figures",
`      out.push(spread(lcCharXs(topBigS, LC.bigR, T.prompt).slice(0, nb).map((x, j) => ({ ch: topBigS[j], x, fill: LC_INK_AMBER })), LC.amber, T.prompt, "nb"));
      const ns = Math.max(0, Math.min(topSmallS.length, spN - 9));
      out.push(spread(lcCharXs(topSmallS, LC.boxR, T.prompt).slice(0, ns).map((x, j) => ({ ch: topSmallS[j], x, fill: LC_INK_AMBER })), LC.amber, T.prompt, "ns"));
`,
`      out.push(warm || free ? lcPenDraw([lcPenR(topBigS, LC.bigR, LC.amber, T.prompt, LC_INK_AMBER)], nb, "nb") : spread(lcCharXs(topBigS, LC.bigR, T.prompt).slice(0, nb).map((x, j) => ({ ch: topBigS[j], x, fill: LC_INK_AMBER })), LC.amber, T.prompt, "nb"));
      const ns = Math.max(0, Math.min(topSmallS.length, spN - 9));
      out.push(warm || free ? lcPenDraw([lcPenR(topSmallS, LC.boxR, LC.amber, T.prompt, LC_INK_AMBER)], ns, "ns") : spread(lcCharXs(topSmallS, LC.boxR, T.prompt).slice(0, ns).map((x, j) => ({ ch: topSmallS[j], x, fill: LC_INK_AMBER })), LC.amber, T.prompt, "ns"));
`);
rep("carryBox: the sum",
`        {spread(xs.slice(0, nS).map((x, j) => ({ ch: sumS[j], x, fill: LC_INK_SMALL })), by, two ? T.label : T.xl, "sum")}
`,
`        {warm || free ? lcPenDraw([lcPenR(sumS, LC.cx + 40, by, two ? T.label : T.xl, LC_INK_SMALL)], nS, "sum") : spread(xs.slice(0, nS).map((x, j) => ({ ch: sumS[j], x, fill: LC_INK_SMALL })), by, two ? T.label : T.xl, "sum")}
`);

/* ---------------------------------------------------------------- apply */
const count = (hay, needle) => { let n = 0, i = -1; while ((i = hay.indexOf(needle, i + 1)) >= 0) n++; return n; };
let text = read(file);
if (text.includes("\r\n")) { console.error("the pair has CRLF line endings; this script writes LF"); process.exit(1); }
let applied = 0, skipped = 0, failed = 0;
for (const [name, a, b, optional] of R) {
  if (b && text.includes(b)) { skipped++; console.log(`  skip    ${name} (already there)`); continue; }
  const n = count(text, a);
  if (!b && !n) { skipped++; console.log(`  skip    ${name} (already gone)`); continue; }
  if (!n && optional) { skipped++; console.log(`  skip    ${name} (not needed)`); continue; }
  if (n !== 1) { failed++; console.error(`  FAILED  ${name}: the old text matches ${n} times (needs exactly 1)`); continue; }
  text = text.replace(a, () => b); applied++; console.log(`  applied ${name}`);
}
if (failed) { console.error(`\n${failed} replacement(s) failed: nothing written`); process.exit(1); }
try { await esbuild.transform(text, { loader: "tsx", jsx: "preserve", logLevel: "silent" }); }
catch (e) { console.error("the result does not parse: " + String(e.message).split("\n").slice(0, 4).join("\n")); process.exit(1); }
const left = ["boxPt(", "bigPts(", 'moves: "push"'].filter((w) => text.includes(w) && /\bpen\(/.test(text));
if (left.length && !DRY) console.log(`  note: still in the pair: ${left.join(", ")} (check they are not pencil writes)`);
if (DRY || !applied) { console.log(`\n${DRY ? "DRY RUN" : "no change"}: ${applied} to apply, ${skipped} already there`); process.exit(0); }
fs.writeFileSync(file, text);
console.log(`\nwritten: ${applied} applied, ${skipped} already there (${(text.length / 1024).toFixed(1)} KB)`);
