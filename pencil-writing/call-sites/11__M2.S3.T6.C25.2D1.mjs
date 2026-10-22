#!/usr/bin/env node
/* pencil-writing call sites: class 4 chapter 11, M2.S3.T6.C25.2D1 (weight_columns: kg and g in columns, carry and break). The record of what changed in this pair,
 * applied as exact-string replacements (each OLD text must match exactly once; a NEW text already there is skipped, so a second run changes nothing; nothing is
 * written unless every replacement applies and the result parses). Run:  node pencil-writing/call-sites/11__M2.S3.T6.C25.2D1.mjs [--dry] [--file <copy.tsx>]
 *
 * What it does (the pair's helper block already carries the `write` move and PencilText: `apply.mjs --apply` first):
 *   - top level: ONE set of pieces for the acts AND the drawing (wcPenRuns: a grams row = the thousand on the divider alone, then each run of same-coloured boxes as
 *     one string in cells a box apart, a grey place zero kept grey; wcPenKg: the kilograms end where kgText ends them; wcPenAbove: the amber figures a break writes
 *     over the top row; wcFreePen: free play's whole sum; wcPenTok: pieces -> the act's text/at/size/align/step/color, shifted by the board's ox; wcPenDraw: pieces ->
 *     PencilText with the characters finished), so nothing jumps when an act ends
 *   - Work's `pen` helper: the `push` (ms 900-1100, one point per digit) is now a `write` of pieces (no ms: the write scratches itself). Its six calls:
 *       phase 2 guide Add      push over [divider, 3 boxes]          -> write ["1" on the divider, "300" in the boxes] in the grams green (setP 1..4 as before)
 *       phase 2 guide Carry    (the hand carries the kg weight: left) then push at the kg cell -> write "1" (kg blue)
 *       phase 3 guide Break    push over [3 strike points, amber kg] -> write [{ dab: kg strike }, "4"] in amber; onPoint mapped to the old point index (3, 4)
 *       phase 3 guide Open     (the knife: left) then push over [3 strike points, "1,000"] -> write [{ dab: g strike }, "1,000"] in amber (12, 13..17)
 *       phase 3 question Break push over all 4 groups (then the knife: left) -> write [{ dab }, tk, { dab }, tg] in amber, old indices kept, so the weight, the cuts
 *                              and the bars appear exactly as before (59 / 1,000; 19 / 1,000; 80 / 1,215)
 *       free play Add / Take   push over [carry chip | 2 break points, 3 boxes, kg cell] -> write the whole sum: "+" [{ dab: chip }, "1" on the chip (amber), grams,
 *                              kg]; "-" [{ dab: kg strike }, tk, { dab: g strike }, tg, grams, kg] in the take-away colour; fp.p now counts characters
 *   - drawing: the digits the pencil writes are drawn by <PencilText> through wcFrame's new `s.pens` (wcFrame: `pen` cells keep the divider's white patch but print no
 *     digit; `carryPen` drops the printed chip "1" in free play); the amber figures stay pencil after a real Break (win page, trace); amber that only the trace or the
 *     win shows (no Break tapped) stays printed
 *   - left as they are: the hand acts (bags, Count, the Carry hand and its printed "1" chip, Weigh, Level, free play's levelling weight and its "1 kg 275 g" label),
 *     the knife cuts, the strike lines (the tool's own lines, shown at the dab), the typed digits, the wrong-answer trace and the win (timelines of printed digits),
 *     phase 4's balance, card and plate, TR, every English line, the layout */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CLASS4, pairPath, read } from "../lib.mjs";

const esbuild = createRequire(path.join(CLASS4, "package.json"))("esbuild");
const DRY = process.argv.includes("--dry");
const fi = process.argv.indexOf("--file");
const file = fi > 0 ? path.resolve(process.argv[fi + 1]) : pairPath("11", "M2.S3.T6.C25.2D1");

const R = []; // [name, oldText, newText, optional]
const rep = (name, a, b, optional) => R.push([name, a, b, !!optional]);

/* ---------------------------------------------------------------- top level: the pieces, shared by the acts and the drawing */
rep("helpers wcPen*",
`const wcAnsY = (F, nR) => wcRowY(F, nR) + 6;
`,
`const wcAnsY = (F, nR) => wcRowY(F, nR) + 6;
/* where the pencil writes in the column frame. The acts (Work's pen) and the PencilText that keeps the digits use these very pieces, so nothing jumps when an act
   ends. A piece is { s, x, y (the baseline the frame prints on), size, align, step, color } or a touch { dab: [x, y] } (the tool's own strike or weight appears
   there). A grams row: a thousand on the divider alone, then each run of same-coloured boxes as ONE string in cells a box apart (a grey place zero stays grey);
   the kilograms end where kgText ends them; the amber figures a break writes over the top row; free play's whole sum with the carried kilogram's chip */
const wcPenRuns = (F, cells, y, ink, size = T.xl) => {
  const step = F.bw + F.gap, x0 = wcBM(F, 0) - step / 2, out = [];
  (cells || []).filter((c) => c && c.ch !== "" && c.ch !== void 0).forEach((c) => {
    const col = c.grey ? WC_ZERO : ink, last = out[out.length - 1];
    if (c.k < 0) out.push({ s: c.ch, x: F.bar, y, size, align: "middle", step: 0, color: col, bar: true });
    else if (last && !last.bar && last.color === col && last.k1 === c.k - 1) {
      last.s += c.ch;
      last.k1 = c.k;
    } else out.push({ s: c.ch, x: x0 + c.k * step, y, size, align: "start", step, color: col, k1: c.k });
  });
  return out;
};
const wcPenKg = (F, v, top, ink) => ({ s: String(v), x: F.kgR - 4, y: top + 56, size: T.xl, align: "end", step: 0, color: ink });
const wcPenAbove = (F, kg, gs) => [{ s: String(kg), x: F.kgR - 4, y: 150, size: T.prompt, align: "end", step: 0, color: WC_INK.move }, { s: String(gs), x: F.gL + wcGW(F) / 2, y: 150, size: T.prompt, align: "middle", step: 0, color: WC_INK.move }];
const wcFreePen = (F, op, top, bot) => {
  const yA = wcAnsY(F, 2), y0 = wcRowY(F, 0) + 38;
  if (op === "+") {
    const sol = wcAddCols([[top.kg, top.g], [bot.kg, bot.g]]);
    const carry = sol.carry ? [{ dab: [F.kgR - 43, 129], is: "carry" }, { s: "1", x: F.kgR - 43, y: 144, size: T.label, align: "middle", step: 0, color: WC_INK.move, is: "carry" }] : [];
    return [...carry, ...wcPenRuns(F, wcCellsR(sol.g), yA + 56, WC_INK.g), wcPenKg(F, sol.kg, yA, WC_INK.kg)];
  }
  const sol = wcTakeCols([top.kg, top.g], [bot.kg, bot.g]), ab = wcPenAbove(F, sol.tk, indian(sol.tg));
  const brk = sol.need ? [{ dab: [F.kgR - 8 - String(top.kg).length * 17, y0], is: "sk" }, ab[0], { dab: [wcBM(F, 1), y0], is: "sg" }, ab[1]] : [];
  return [...brk, ...wcPenRuns(F, wcCellsR(sol.g), yA + 56, WC_INK.left), wcPenKg(F, sol.kg, yA, WC_INK.left)];
};
const wcPenC0 = (pcs) => {
  let c = 0;
  return pcs.map((q) => {
    const r = { ...q, c0: c };
    c += q.dab ? 1 : q.s.length;
    return r;
  });
};
const wcPenTok = (pcs, ox) => ({
  text: pcs.map((q) => q.dab ? { dab: [q.dab[0] + ox, q.dab[1]] } : q.s),
  at: pcs.map((q) => q.dab ? null : { x: q.x + ox, y: q.y }),
  size: pcs.map((q) => q.dab ? T.xl : q.size),
  align: pcs.map((q) => q.dab ? "start" : q.align),
  step: pcs.map((q) => q.dab ? 0 : q.step),
  color: pcs.map((q) => q.dab ? PEN_INK : q.color)
});
const wcPenDraw = (pcs, n, key, hide) => wcPenC0(pcs).filter((q) => !q.dab && n > q.c0 && !(hide && hide(q))).map((q) => <PencilText key={key + q.c0} text={q.s} x={q.x} y={q.y} size={q.size} align={q.align} step={q.step} color={q.color} chars={n - q.c0} />);
`);

/* ---------------------------------------------------------------- wcFrame: pen cells, the free chip, the pencil layer */
rep("wcFrame digits: pen cells print no digit",
`          {cs.map((c, j) => <tspan key={j} x={wcBM(F, c.k)} fill={c.grey ? WC_ZERO : ink}>{c.ch}</tspan>)}`,
`          {cs.filter((c) => !c.pen).map((c, j) => <tspan key={j} x={wcBM(F, c.k)} fill={c.grey ? WC_ZERO : ink}>{c.ch}</tspan>)}`);
rep("wcFrame carry chip: carryPen",
`          <text x={F.kgR - 43} y={144} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WC_INK.move}>1</text>`,
`          {!s.carryPen && <text x={F.kgR - 43} y={144} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WC_INK.move}>1</text>}`);
rep("wcFrame pens layer",
`      {(s.labels || []).map((t, i) => t ? <text key={"lb" + i}`,
`      {s.pens || null}
      {(s.labels || []).map((t, i) => t ? <text key={"lb" + i}`);

/* ---------------------------------------------------------------- Work: the pen helper and its six calls */
rep("pen helper: write",
`  const pen = (pts, onP, ms) => api.act({ tool: "pencil", moves: "push", at: pts.map(ax), onPoint: onP, ms: ms || 900 });`,
`  /* the pencil WRITES the pieces (wcPen*: digits, the comma, dabs where the tool's strike or weight appears); onPoint(i) runs when the tip finishes character i */
  const pen = (pcs, onP) => api.act({ tool: "pencil", moves: "write", ...wcPenTok(pcs, ox), onPoint: onP });`);
rep("brkPlan: the amber pieces",
`    return { sk, ak, sg, ag };
  };`,
`    const ab = wcPenAbove(F, tkS, tgS);
    return { sk, ak, sg, ag, pk: ab[0], pg: ab[1] };
  };`);
rep("w-carry add: write 1 | 300",
`        return pen([-1, 0, 1, 2].map((kk) => ({ x: wcBM(F, kk), y: at })), (i) => setP(k, on, i + 1));`,
`        return pen(wcPenRuns(F, wcCellsR(wcAddCols(rows).gs), wcAnsY(F, 2) + 56, WC_INK.g), (i) => setP(k, on, i + 1));`);
rep("w-carry carry: write the kg",
`        return pen([{ x: F.kgR - 20, y: at }], () => setP(k, on, 2));`,
`        return pen([wcPenKg(F, wcAddCols(rows).kg, wcAnsY(F, 2), WC_INK.kg)], () => setP(k, on, 2));`);
rep("w-break break: dab + amber kg",
`        return pen([...P.sk, ...P.ak], (i) => setP(k, on, i + 1));`,
`        /* the dab strikes the kilograms (the old 3rd point), each amber digit is its old point (4 + j) */
        return pen([{ dab: [P.sk[1].x, P.sk[1].y] }, P.pk], (i) => setP(k, on, i + 3));`);
rep("w-break open: dab + amber g",
`        return pen([...P.sg, ...P.ag], (i) => setP(k, on, 10 + i));`,
`        return pen([{ dab: [P.sg[1].x, P.sg[1].y] }, P.pg], (i) => setP(k, on, 12 + i));`);
rep("take break: one write, old indices",
`        if (!await pen(all, (i) => setP(k, on, i + 1), 1100)) return false;`,
`        /* one write [strike dab, amber kg, strike dab, amber g]: each character lands on its old point (dabs on the last strike point), so the weight, the knife's
           cuts (all.length + 1 + i) and the bars come as before */
        if (!await pen([{ dab: [P.sk[1].x, P.sk[1].y] }, P.pk, { dab: [P.sg[1].x, P.sg[1].y] }, P.pg], (i) => setP(k, on, i <= P.ak.length ? i + 3 : i + 5))) return false;`);
rep("freeOp: one write of the whole sum",
`    const at = wcAnsY(F, 2) + 36, pts = [];
    const sol = op === "+" ? wcAddCols([[top.kg, top.g], [bot.kg, bot.g]]) : wcTakeCols([top.kg, top.g], [bot.kg, bot.g]);
    if (op === "+" && sol.carry) pts.push({ x: F.kgR - 43, y: 129 });
    if (op === "-" && sol.need) pts.push({ x: F.kgR - 20, y: 124 }, { x: wcBM(F, 1), y: 136 });
    [0, 1, 2].forEach((kk) => pts.push({ x: wcBM(F, kk), y: at }));
    pts.push({ x: F.kgR - 20, y: at });
    playing.current = true;
    setBusy(true);
    let ok = await pen(pts, (i) => setFp((p) => ({ ...p, p: i + 1 })), 1e3);`,
`    playing.current = true;
    setBusy(true);
    let ok = await pen(wcFreePen(F, op, top, bot), (i) => setFp((p) => ({ ...p, p: Math.max(p.p, i + 1) })));`);

/* ---------------------------------------------------------------- Work: the drawing */
rep("draw w-carry",
`      const pa = R("add"), pc = R("carry");
      const cells = wcCellsR(sol.gs).filter((c, i) => i < pa && !(pc >= 1 && c.k < 0));
      fs.carry = pc >= 1;
      fs.ans = { kg: pc >= 2 ? String(sol.kg) : "", g: cells };`,
`      const pa = R("add"), pc = R("carry");
      /* the pencil writes 1,300 (the thousand on the divider alone, then 300 in the boxes) and the 1 kg, at the act's own pieces: the row keeps the cells only as
         pen cells (the divider's white patch is there from the act's start); the thousand goes when the Carry hand lifts it */
      const addOn = pa > 0 || !!(S.prog && S.prog.on === "add"), yA = wcAnsY(F, 2);
      fs.carry = pc >= 1;
      fs.ans = { kg: "", g: addOn ? wcCellsR(sol.gs).filter((c) => !(pc >= 1 && c.k < 0)).map((c) => ({ ...c, pen: true })) : [] };
      fs.pens = [...addOn ? wcPenDraw(wcPenRuns(F, wcCellsR(sol.gs), yA + 56, WC_INK.g), pa, "pa", (q) => pc >= 1 && q.bar) : [], ...pc >= 2 ? wcPenDraw([wcPenKg(F, sol.kg, yA, WC_INK.kg)], 1, "pk") : []];`);
rep("draw break: amber in pencil",
`    if (akS || agS) fs.above = { kg: akS, gs: agS };`,
`    /* the pencil writes the amber figures (brkPlan's pk, pg; each strike stays the tool's line, shown at its dab): in the guide, and after a real Break (also on the
       win page and in a later trace); amber that only the trace or the win shows (no Break tapped) stays printed */
    const bkPen = kind === "w-break" || pb > 0 || !!(S.prog && S.prog.on === "break");
    if (akS || agS) fs.above = bkPen ? { kg: "", gs: "" } : { kg: akS, gs: agS };
    if (bkPen) fs.pens = [...wcPenDraw([P.pk], akS.length, "pk"), ...wcPenDraw([P.pg], agS.length, "pg")];`);
rep("draw free play",
`      if (fp.opP === "+") {
        const sol = wcAddCols([[top.kg, top.g], [bot.kg, bot.g]]), off = sol.carry ? 1 : 0;
        fs.carry = sol.carry > 0 && fp.p >= 1;
        fs.ans = { kg: fp.p >= off + 4 ? String(sol.kg) : "", g: wcCellsR(sol.g).filter((_, j) => fp.p >= off + 1 + j) };
      } else {
        const sol = wcTakeCols([top.kg, top.g], [bot.kg, bot.g]), off = sol.need ? 2 : 0;
        if (sol.need && fp.p >= 1) {
          fs.rows[0] = { ...fs.rows[0], struck: true, gStruck: fp.p >= 2 };
          fs.above = { kg: String(sol.tk), gs: fp.p >= 2 ? indian(sol.tg) : "" };
        }
        fs.ans = { kg: fp.p >= off + 4 ? String(sol.kg) : "", kgInk: WC_INK.left, g: wcCellsR(sol.g).filter((_, j) => fp.p >= off + 1 + j), gInk: WC_INK.left };
      }`,
`      /* every number of a free sum is written by the pencil (wcFreePen, the act's own pieces): fp.p counts the characters finished (a dab counts one; 99 once the
         act is over); the carried weight and its chip, and each strike, appear at their dabs */
      const pcs = wcPenC0(wcFreePen(F, fp.opP, top, bot)), past = (is) => pcs.some((q) => q.is === is && fp.p > q.c0);
      if (fp.opP === "+") {
        const sol = wcAddCols([[top.kg, top.g], [bot.kg, bot.g]]);
        fs.carry = sol.carry > 0 && past("carry");
        fs.carryPen = true;
      } else {
        const sol = wcTakeCols([top.kg, top.g], [bot.kg, bot.g]);
        if (sol.need && past("sk")) {
          fs.rows[0] = { ...fs.rows[0], struck: true, gStruck: past("sg") };
          fs.above = { kg: "", gs: "" };
        }
      }
      fs.ans = { kg: "", g: [] };
      fs.pens = wcPenDraw(pcs, fp.p, "fp");`);

/* ---------------------------------------------------------------- apply */
const count = (hay, needle) => { let n = 0, i = -1; while ((i = hay.indexOf(needle, i + 1)) >= 0) n++; return n; };
let text = read(file);
if (text.includes("\r\n")) { console.error("the pair has CRLF line endings; this script writes LF"); process.exit(1); }
if (!text.includes("function PencilText(")) { console.error("the pair has no PencilText: run pencil-writing/apply.mjs --file <pair> --apply first"); process.exit(1); }
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
