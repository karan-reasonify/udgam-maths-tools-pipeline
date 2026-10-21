#!/usr/bin/env node
/* pencil-writing call sites: class 4 chapter 7, M1.S2.T4.C15.2D1 (equivalent-fraction ladder). The record of what changed in this pair, applied as
 * exact-string replacements (each OLD text must match exactly once; a NEW text already there is skipped, so a second run changes nothing; nothing is
 * written unless every replacement applies and the result parses). Run:  node pencil-writing/call-sites/7__M1.S2.T4.C15.2D1.mjs [--dry]
 *
 * What it does (the pair's helper block already carries the `write` move, PencilText and PencilLine):
 *   - helpers next to ltSize: ltBarW, ltPenFrac (the strings / points / sizes of ONE write act for a fraction card, the bar a { line } token),
 *     ltPenAt (how far a written fraction has come when the tip has finished c characters: pc for LtRung, and the old sh 0..3),
 *     ltStepLbl / ltPairLbl (where the "÷f" label of a step sits, used by the act AND by the drawing, so nothing jumps at the act's end)
 *   - LtRung: a rung the pencil wrote (it has `pc`) draws its numerator / denominator with <PencilText> and its bar with <PencilLine>; a rung with no
 *     `pc` (the ones on screen before any act, quickStep, the intro picture) stays printed Poppins
 *   - LtStep / LtPair: a label with `lc` is <PencilText> (lc = characters written so far); without it the printed label as before
 *   - doDivide: ONE `write` act of [{ dab: arrow 1 }, { dab: arrow 2 }, "÷f", n, { bar }, d] (just [dab, dab, "÷f"] for the last step that lands on the
 *     card): the tip touches each arrow point (the tool's arrow appears as it is touched: onPoint 0 and 1 set mk), then writes; the old marks `push`
 *     (1.45 s) and the api.sfx.tick() that followed are gone
 *   - tryAlone, doNew, the wrong-answer trace's scratch fraction: ONE `write` of [n, { bar }, d]
 *   - the trace's u-route: ONE `write` of [{ dab: corner 1 }, { dab: corner 2 }, { dab: corner 3 }, "÷f"] (the tool's purple line segments and arrowhead
 *     appear as each corner is touched, as `mk` did under `draw`), so the elbow's colour stays that of the step arrows; a pencil-drawn graphite
 *     line (three { line } tokens) was the other choice
 *   - no pause between acts is needed any more (the helper's ActLayer clock is fixed)
 *   - left as they are (not numbers): doLists, doColour, doLine (cells / bars / lines), and the trace's two `work` lines (a translated sentence of
 *     words and numbers swept by a clip, which the digit table cannot write) */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CLASS4, pairPath, read } from "../lib.mjs";

const esbuild = createRequire(path.join(CLASS4, "package.json"))("esbuild");
const DRY = process.argv.includes("--dry");
const file = pairPath("7", "M1.S2.T4.C15.2D1");

const R = []; // [name, oldText, newText]
const rep = (name, a, b, optional) => R.push([name, a, b, !!optional]);

/* the divide's ONE write act: dab the two arrow points (the tool's arrows appear as each is touched), write the label, then the fraction */
const DIVIDE_ACT = `    const marks = fin && routeCard ? [{ x: (n1.x + n2.x) / 2, y: (n1.y + n2.y) / 2 }, { x: (d1.x + d2.x) / 2, y: (d1.y + d2.y) / 2 }] : [{ x: mx, y: ry + lay.numC }, { x: mx, y: ry + lay.denC }];
    const lbl = "÷" + f, ll = lbl.length;
    const lb = fin && routeCard ? ltPairLbl(sx, n1.y, d1.y, ex, n2.y, d2.y, T.label) : ltStepLbl(sx, colX(colNew) - 6, ry + lay.numC, ry + lay.denC, T.label);
    const fw = fin ? { text: [], at: [], size: [] } : ltPenFrac(g, nn, dd, cx, ry);
    await api.act({
      tool: "pencil",
      moves: "write",
      text: [{ dab: [marks[0].x, marks[0].y], size: T.label }, { dab: [marks[1].x, marks[1].y], size: T.label }, lbl].concat(fw.text),
      at: [null, null, lb].concat(fw.at),
      size: [T.label, T.label, T.label].concat(fw.size),
      align: "middle",
      onPoint: (j) => {
        const c = j + 1, mk = Math.min(c, 2), lcn = Math.min(Math.max(0, c - 2), ll);
        if (fin) setPend(k, { mk, lc: lcn });
        else setRung(k, i, { mk, lc: lcn, ...ltPenAt(nn, dd, Math.max(0, c - 2 - ll)) });
      }
    });
`;
/* the u-route's ONE write act: dab the three corners (the tool's line segments and arrowhead appear as each is touched), then write the label */
const UROUTE_ACT = `          const ul = "÷" + f, up = [{ x: x1, y: yU }, { x: x2, y: yU }, { x: x2, y: rowY[0] + ch + 8 }];
          await api.act({
            tool: "pencil",
            moves: "write",
            text: [{ dab: [up[0].x, up[0].y], size: T.label }, { dab: [up[1].x, up[1].y], size: T.label }, { dab: [up[2].x, up[2].y], size: T.label }, ul],
            at: [null, null, null, { x: (x1 + x2) / 2, y: yU - 12 }],
            size: T.label,
            align: "middle",
            onPoint: (j) => upd((s) => s.uroute ? { ...s, uroute: { ...s.uroute, mk: Math.min(j + 1, 3), lc: Math.min(Math.max(0, j - 2), ul.length) } } : s)
          });
          upd((s) => s.uroute ? { ...s, uroute: { ...s.uroute, mk: 3, lc: ul.length } } : s);`;

/* ---------------------------------------------------------------- patch-ups of an earlier run of this script (no-ops on a fresh or a final file)
   Run 1 made the divide a marks `push` THEN a `write` (with a one-frame pause between, for the helper's old ActLayer clock bug); the fixed helper has the
   `dab` token, so the marks and the numbers are ONE write act. These two turn that text into the final one (they are listed before the replacements
   they correct, which then find their final text and skip). */
rep("divide: marks push + pause + write -> one write with dabs (patch-up)", `    const marks = fin && routeCard ? [{ x: (n1.x + n2.x) / 2, y: (n1.y + n2.y) / 2 }, { x: (d1.x + d2.x) / 2, y: (d1.y + d2.y) / 2 }] : [{ x: mx, y: ry + lay.numC }, { x: mx, y: ry + lay.denC }];
    await api.act({ ms: 700, tool: "pencil", moves: "push", at: marks, onPoint: (j) => {
      if (fin) setPend(k, { mk: j + 1 });
      else setRung(k, i, { mk: j + 1 });
    } });
    if (fin) setPend(k, { mk: 2 });
    else setRung(k, i, { mk: 2 });
    await nap(40);
    const lbl = "÷" + f, ll = lbl.length;
    const lb = fin && routeCard ? ltPairLbl(sx, n1.y, d1.y, ex, n2.y, d2.y, T.label) : ltStepLbl(sx, colX(colNew) - 6, ry + lay.numC, ry + lay.denC, T.label);
    const fw = fin ? { text: [], at: [], size: [] } : ltPenFrac(g, nn, dd, cx, ry);
    await api.act({
      tool: "pencil",
      moves: "write",
      text: [lbl].concat(fw.text),
      at: [lb].concat(fw.at),
      size: [T.label].concat(fw.size),
      align: "middle",
      onPoint: (j) => {
        if (fin) setPend(k, { lc: Math.min(j + 1, ll) });
        else setRung(k, i, { lc: Math.min(j + 1, ll), ...ltPenAt(nn, dd, Math.max(0, j + 1 - ll)) });
      }
    });
`, DIVIDE_ACT, true);
rep("u-route: draw + pause + label write -> one write with dabs (patch-up)", `          await api.act({
            ms: 700,
            tool: "pencil",
            moves: "draw",
            at: [{ x: x1, y: yU }, { x: x2, y: yU }, { x: x2, y: rowY[0] + ch + 8 }],
            onPoint: (j) => upd((s) => s.uroute ? { ...s, uroute: { ...s.uroute, mk: j + 1 } } : s)
          });
          upd((s) => s.uroute ? { ...s, uroute: { ...s.uroute, mk: 3 } } : s);
          await nap(40);
          const ul = "÷" + f;
          await api.act({
            tool: "pencil",
            moves: "write",
            text: ul,
            at: [{ x: (x1 + x2) / 2, y: yU - 12 }],
            size: T.label,
            align: "middle",
            onPoint: (j) => upd((s) => s.uroute ? { ...s, uroute: { ...s.uroute, lc: j + 1 } } : s)
          });
          upd((s) => s.uroute ? { ...s, uroute: { ...s.uroute, lc: ul.length } } : s);`, UROUTE_ACT, true);

/* ---------------------------------------------------------------- helpers */
rep("helpers after ltSize",
`const ltSize = (g, n, d) => Math.max(String(n).length, String(d).length) >= 3 ? g.h > 180 ? 52 : T.speech : g.h > 180 ? 64 : g.h > 150 ? T.xl : T.speech;
`,
`const ltSize = (g, n, d) => Math.max(String(n).length, String(d).length) >= 3 ? g.h > 180 ? 52 : T.speech : g.h > 180 ? 64 : g.h > 150 ? T.xl : T.speech;
const ltBarW = (g, n, d, size) => Math.min(g.cw - 20, Math.max(String(n).length, String(d).length) * size * 0.62 + 26);
/* the pencil writes a fraction on a card whose middle is cx and whose top is y0: the strings, points and sizes of ONE write act (the bar is a { line } token;
   at has one point per token, the bar's own is unused), the very numbers LtRung draws the written fraction with */
const ltPenFrac = (g, n, d, cx, y0) => {
  const lay = ltLay(g.h), size = ltSize(g, n, d), bw = ltBarW(g, n, d, size), by = y0 + lay.barY + 3, ins = size * 0.05;
  const pn = { x: cx, y: y0 + lay.numC + size * 0.36 }, pd = { x: cx, y: y0 + lay.denC + size * 0.36 };
  return { text: [String(n), { line: [cx - bw / 2 + ins, by, cx + bw / 2 - ins, by], size }, String(d)], at: [pn, pn, pd], size: [size, size, size] };
};
const ltPenLen = (n, d) => String(n).length + 1 + String(d).length;
/* a written fraction when the tip has finished c characters (numerator's, the bar as one, denominator's): pc for LtRung and the old sh (1 numerator, 2 bar, 3 done) */
const ltPenAt = (n, d, c) => {
  const a = String(n).length;
  return { pc: c, sh: c >= ltPenLen(n, d) ? 3 : c > a ? 2 : c >= a ? 1 : 0 };
};
/* where a step's "÷f" label is written (the middle, the baseline): the act and LtStep / LtPair use the same */
const ltStepLbl = (x1, x2, y1, y2, sz) => ({ x: (x1 + x2) / 2, y: (y1 + y2) / 2 + sz * 0.36 });
const ltPairLbl = (x1, y1a, y1b, x2, y2a, y2b, sz) => {
  const fr = 0.3;
  return { x: x1 + (x2 - x1) * fr, y: (y1a + (y2a - y1a) * fr + y1b + (y2b - y1b) * fr) / 2 + sz * 0.36 };
};
`);

/* ---------------------------------------------------------------- LtRung */
rep("LtRung signature", `function LtRung({ x, y, g, n, d, sh = 3, filled = true, ring, dashed, C }) {`, `function LtRung({ x, y, g, n, d, sh = 3, pc, filled = true, ring, dashed, C }) {`);
rep("LtRung bw", `  const bw = Math.min(g.cw - 20, Math.max(String(n).length, String(d).length) * size * 0.62 + 26);
  return <g>`, `  const bw = ltBarW(g, n, d, size), pen = pc != null, na = String(n).length;
  return <g>`);
rep("LtRung digits and bar",
`      {sh >= 1 && <text x={cx} y={y + lay.numC + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{n}</text>}
      {sh >= 2 && <rect x={cx - bw / 2} y={y + lay.barY} width={bw} height={6} rx={3} fill={C.ink} />}
      {sh >= 3 && <text x={cx} y={y + lay.denC + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{d}</text>}
`,
`      {pen ? <PencilText text={String(n)} x={cx} y={y + lay.numC + size * 0.36} size={size} align="middle" chars={pc} /> : sh >= 1 && <text x={cx} y={y + lay.numC + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{n}</text>}
      {pen ? pc > na && <PencilLine x1={cx - bw / 2 + size * 0.05} y1={y + lay.barY + 3} x2={cx + bw / 2 - size * 0.05} y2={y + lay.barY + 3} size={size} /> : sh >= 2 && <rect x={cx - bw / 2} y={y + lay.barY} width={bw} height={6} rx={3} fill={C.ink} />}
      {pen ? <PencilText text={String(d)} x={cx} y={y + lay.denC + size * 0.36} size={size} align="middle" chars={pc - na - 1} /> : sh >= 3 && <text x={cx} y={y + lay.denC + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{d}</text>}
`);

/* ---------------------------------------------------------------- LtStep, LtPair */
rep("LtStep head", `function LtStep({ x1, x2, y1, y2, f, mk = 2, sz = T.label, C }) {
  const ink = shade(CONTENT.bead, 0.25), mid = (x1 + x2) / 2;`, `function LtStep({ x1, x2, y1, y2, f, mk = 2, lc, sz = T.label, C }) {
  const ink = shade(CONTENT.bead, 0.25), lb = ltStepLbl(x1, x2, y1, y2, sz);`);
rep("LtStep label",
`      {mk >= 1 && <text x={mid} y={(y1 + y2) / 2 + sz * 0.36} textAnchor="middle" fontSize={sz} fontWeight={700} fill={ink}>{"÷" + f}</text>}`,
`      {lc != null ? <PencilText text={"÷" + f} x={lb.x} y={lb.y} size={sz} align="middle" chars={lc} /> : mk >= 1 && <text x={lb.x} y={lb.y} textAnchor="middle" fontSize={sz} fontWeight={700} fill={ink}>{"÷" + f}</text>}`);
rep("LtPair head", `function LtPair({ x1, y1a, y1b, x2, y2a, y2b, f, mk = 2, C }) {`, `function LtPair({ x1, y1a, y1b, x2, y2a, y2b, f, mk = 2, lc, C }) {`);
rep("LtPair lb", `  const lx = x1 + (x2 - x1) * fr, ly = (y1a + (y2a - y1a) * fr + y1b + (y2b - y1b) * fr) / 2;`, `  const lb = ltPairLbl(x1, y1a, y1b, x2, y2a, y2b, T.label);`);
rep("LtPair label",
`      <text x={lx} y={ly + T.label * 0.36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{"÷" + f}</text>`,
`      {lc != null ? <PencilText text={"÷" + f} x={lb.x} y={lb.y} size={T.label} align="middle" chars={lc} /> : <text x={lb.x} y={lb.y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{"÷" + f}</text>}`);

/* ---------------------------------------------------------------- the render calls */
rep("LtStep call (rungs)", `f={r.f} mk={r.mk} sz={T.label}`, `f={r.f} mk={r.mk} lc={r.lc} sz={T.label}`);
rep("LtStep call (pend)", `f={lk.pend.f} mk={lk.pend.mk} sz={T.label}`, `f={lk.pend.f} mk={lk.pend.mk} lc={lk.pend.lc} sz={T.label}`);
rep("LtPair call", `f={lk.pend.f} mk={lk.pend.mk} C={C} />}`, `f={lk.pend.f} mk={lk.pend.mk} lc={lk.pend.lc} C={C} />}`);
rep("LtRung call (ladder)", `      sh={r.sh}
      filled={i < bars}`, `      sh={r.sh}
      pc={r.pc}
      filled={i < bars}`);
rep("LtRung call (scratch)", `<LtRung x={0} y={0} g={sg} n={o.n} d={o.d} sh={o.sh} filled dashed={dashed} C={C} />`, `<LtRung x={0} y={0} g={sg} n={o.n} d={o.d} sh={o.sh} pc={o.pc} filled dashed={dashed} C={C} />`);
rep("u-route label",
`        {u.mk >= 2 && <text x={(x1 + x2) / 2} y={yU - 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink} stroke="none">{"÷" + u.f}</text>}`,
`        <PencilText text={"÷" + u.f} x={(x1 + x2) / 2} y={yU - 12} size={T.label} align="middle" chars={u.lc || 0} />`);

/* ---------------------------------------------------------------- doDivide */
rep("doDivide state",
`      if (fin) NL[k].pend = { f, mk: 0 };
      else NL[k].rungs.push({ n: nn, d: dd, f, sh: 0, mk: 0 });`,
`      if (fin) NL[k].pend = { f, mk: 0, lc: 0 };
      else NL[k].rungs.push({ n: nn, d: dd, f, sh: 0, mk: 0, lc: 0, pc: 0 });`);
rep("doDivide acts",
`    const pts = fin && routeCard ? [{ x: (n1.x + n2.x) / 2, y: (n1.y + n2.y) / 2 }, { x: (d1.x + d2.x) / 2, y: (d1.y + d2.y) / 2 }] : [{ x: mx, y: ry + lay.numC }, { x: mx, y: ry + lay.denC }].concat(fin ? [] : writePts(cx, ry));
    await api.act({ ms: 700, tool: "pencil", moves: "push", at: pts, onPoint: (j) => {
      if (j < 2) {
        if (fin) setPend(k, { mk: j + 1 });
        else setRung(k, i, { mk: j + 1 });
      } else setRung(k, i, { sh: j - 1 });
    } });
    if (fin) setPend(k, { mk: 2 });
    else setRung(k, i, { sh: 3, mk: 2 });
    api.sfx.tick();
`,
DIVIDE_ACT + `    if (fin) setPend(k, { mk: 2, lc: ll });
    else setRung(k, i, { mk: 2, lc: ll, ...ltPenAt(nn, dd, ltPenLen(nn, dd)) });
`);

/* ---------------------------------------------------------------- tryAlone */
rep("tryAlone",
`    put({ alone: { n: n2, d: d2, sh: 0 } });
    try {
      await api.act({
        ms: 700,
        tool: "pencil",
        moves: "push",
        at: scrPts,
        onPoint: (j) => upd((s) => s.alone ? { ...s, alone: { ...s.alone, sh: j + 1 } } : s)
      });
      upd((s) => s.alone ? { ...s, alone: { ...s.alone, sh: 3 } } : s);`,
`    put({ alone: { n: n2, d: d2, sh: 0, pc: 0 } });
    try {
      const fw = ltPenFrac(sg, n2, d2, 16 + sg.cw / 2, bandY);
      await api.act({
        tool: "pencil",
        moves: "write",
        text: fw.text,
        at: fw.at,
        size: fw.size,
        align: "middle",
        onPoint: (j) => upd((s) => s.alone ? { ...s, alone: { ...s.alone, ...ltPenAt(n2, d2, j + 1) } } : s)
      });
      upd((s) => s.alone ? { ...s, alone: { ...s.alone, ...ltPenAt(n2, d2, ltPenLen(n2, d2)) } } : s);`);

/* ---------------------------------------------------------------- doNew (free play) */
rep("doNew state", `    nb.L[0].rungs[0].sh = 0;`, `    nb.L[0].rungs[0].sh = 0;
    nb.L[0].rungs[0].pc = 0;`);
rep("doNew act",
`    await api.act({ ms: 700, tool: "pencil", moves: "push", at: writePts(x2, rowY[0]), onPoint: (j) => setRung(0, 0, { sh: j + 1 }) });
    setRung(0, 0, { sh: 3 });`,
`    const fw = ltPenFrac(g, fr[0], fr[1], x2, rowY[0]);
    await api.act({
      tool: "pencil",
      moves: "write",
      text: fw.text,
      at: fw.at,
      size: fw.size,
      align: "middle",
      onPoint: (j) => setRung(0, 0, ltPenAt(fr[0], fr[1], j + 1))
    });
    setRung(0, 0, ltPenAt(fr[0], fr[1], ltPenLen(fr[0], fr[1])));`);

/* ---------------------------------------------------------------- the trace: u-route label, scratch fraction */
rep("u-route state", `put({ lists: false, uroute: { f, mk: 0 } });`, `put({ lists: false, uroute: { f, mk: 0, lc: 0 } });`);
rep("u-route act",
`          await api.act({
            ms: 700,
            tool: "pencil",
            moves: "draw",
            at: [{ x: x1, y: yU }, { x: x2, y: yU }, { x: x2, y: rowY[0] + ch + 8 }],
            onPoint: (j) => upd((s) => s.uroute ? { ...s, uroute: { ...s.uroute, mk: j + 1 } } : s)
          });
          upd((s) => s.uroute ? { ...s, uroute: { ...s.uroute, mk: 3 } } : s);`,
UROUTE_ACT);
rep("scratch act",
`            put({ scratch: { n: wv[0], d: wv[1], sh: 0 } });
            await api.act({
              ms: 700,
              tool: "pencil",
              moves: "push",
              at: scrPts,
              onPoint: (j) => upd((s) => s.scratch ? { ...s, scratch: { ...s.scratch, sh: j + 1 } } : s)
            });
            upd((s) => s.scratch ? { ...s, scratch: { ...s.scratch, sh: 3 } } : s);`,
`            put({ scratch: { n: wv[0], d: wv[1], sh: 0, pc: 0 } });
            const fw = ltPenFrac(sg, wv[0], wv[1], 16 + sg.cw / 2, bandY);
            await api.act({
              tool: "pencil",
              moves: "write",
              text: fw.text,
              at: fw.at,
              size: fw.size,
              align: "middle",
              onPoint: (j) => upd((s) => s.scratch ? { ...s, scratch: { ...s.scratch, ...ltPenAt(wv[0], wv[1], j + 1) } } : s)
            });
            upd((s) => s.scratch ? { ...s, scratch: { ...s.scratch, ...ltPenAt(wv[0], wv[1], ltPenLen(wv[0], wv[1])) } } : s);`);

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
