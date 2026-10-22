#!/usr/bin/env node
/* pencil-writing call sites: class 4 chapter 11, M2.S4.T8.C35.2D1 (capacity_columns: L and mL in columns, carry and break). The record of what changed in
 * this pair, applied as exact-string replacements (each OLD text must match exactly once; a NEW text already there is skipped, so a second run changes
 * nothing; nothing is written unless every replacement applies and the result parses). Run:  node pencil-writing/call-sites/11__M2.S4.T8.C35.2D1.mjs [--dry]
 *
 * What it does (the pair's helper block already carries the `write` move and PencilText: `apply.mjs --apply` first):
 *   - ccPen(G, y): ONE top-level geometry for a column frame, used by the acts AND by the drawing (the baseline the tool prints a row on, the mL boxes as
 *     one string in cells a box apart, the litres right-aligned at the cell's edge, the amber break figures over the columns), so nothing jumps
 *   - phase 2 guide (act2, through wAct; `ms` and the per-point `sfx` dropped, the write scratches itself):
 *       Add (step 0)     push over [divider, 3 boxes]  ->  write ["1", "300"]: the carried 1 on the divider's paper patch (the patch shows from the act's
 *                        start, the pencil writes on it), then 300 in the boxes; ONE act, 4 characters, so wShown(0, 4) is unchanged (the owner's
 *                        follow-up, 2026-10-22: a digit that appears at the tip is WRITTEN; the first version dabbed the divider and printed the 1)
 *       Add (step 2)     push at the litres cell       ->  write "4" (end-aligned at the cell's edge, blue)
 *       Break (step 3)   push over [strike, L, mL]     ->  write [{ dab: strike }, "4", "1,200"] in amber; 7 characters: wShown(3, 7); the tool's strike
 *                        line appears at the dab, the amber curve when the "4" is done
 *       Take away (4)    push over [3 boxes, litres]   ->  write ["700", "2"] (pink); 4 characters, same order
 *   - phase 2 question :4 (the child's Break key, actBreak): push over [strike, L, mL] -> write [{ dab: strike }, "13", "1,380"] in amber; st.bp counts its
 *     characters; after a real break the amber figures stay pencil (the win page and a later trace too); amber that only the trace or the win shows
 *     (no Break tapped) stays printed
 *   - drawP2: the digits the pencil writes are blanked in the ccFrame rows (ccFrame itself is untouched: it also draws the typed rows) and drawn by
 *     <PencilText> over the frame, in the tool's own column colours (mL green, L blue, take-away pink, break amber)
 *   - left as they are: the Carry step (a hand carries the printed "1" chip), the typed digits (incl. the 4th mL digit on the divider's patch), the
 *     wrong-answer trace (the tool's timeline of printed digits), phases 1, 3 and 4 (no pencil act) */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CLASS4, pairPath, read } from "../lib.mjs";

const esbuild = createRequire(path.join(CLASS4, "package.json"))("esbuild");
const DRY = process.argv.includes("--dry");
/* --file <copy.tsx> runs it on a copy (a scratch test of the fresh-pair path) */
const file = process.argv.includes("--file") ? path.resolve(process.argv[process.argv.indexOf("--file") + 1]) : pairPath("11", "M2.S4.T8.C35.2D1");

const R = []; // [name, oldText, newText]
const rep = (name, a, b, optional) => R.push([name, a, b, !!optional]);

/* ---------------------------------------------------------------- patch-ups: the first version (dab + printed 1) -> the written 1. Optional, listed BEFORE the
   replacement each corrects: on a pair that has the first version they turn it into the final text and the base replacement then skips; on a fresh pair they skip */
rep("patch ccPen overX",
`the litres end at the cell's edge; a = the amber break figures */
const ccPen = (G, y) => ({ y: ccBase(G, y), size: G.fs, step: G.bx[1] - G.bx[0], mlX: ccBoxC(G, 0) - (G.bx[1] - G.bx[0]) / 2, Lx: G.cellR, aY:`,
`the litres end at the cell's edge; overX = the carried thousand on the divider's patch; a = the amber break figures */
const ccPen = (G, y) => ({ y: ccBase(G, y), size: G.fs, step: G.bx[1] - G.bx[0], mlX: ccBoxC(G, 0) - (G.bx[1] - G.bx[0]) / 2, Lx: G.cellR, overX: G.div, aY:`, true);
rep("patch add (step 0): write the 1",
`      text: [{ dab: [ox + G2s.div, ansMid(G2s)] }, "300"],
      at: [null, A(pS.mlX, pS.y)],
      size: pS.size,
      align: "start",
      step: pS.step,
      color: CC_INK.small`,
`      text: ["1", "300"],
      at: [A(pS.overX, pS.y), A(pS.mlX, pS.y)],
      size: pS.size,
      align: ["middle", "start"],
      step: [0, pS.step],
      color: CC_INK.small`, true);
rep("patch warm2 state: the patch, no printed 1",
`      /* the pencil writes 300, the 4 litres, the amber 4 and 1,200, and 700 and 2 (PencilText below, at ccPen's places): the rows keep only the printed carried 1 */
      const pS = ccPen(G2s, G2s.ansY), pT = ccPen(G2t, G2t.ansY);
      const sumAns = { L: "", Lc: CC_INK.big, ml: [{ d: "" }, { d: "" }, { d: "" }], over: !carried && s0 > 0 ? [{ d: "1", c: CC_INK.small }] : [] };`,
`      /* the pencil writes 1,300 (the carried 1 on the divider's paper patch, 300 in the boxes), the 4 litres, the amber 4 and 1,200, and 700 and 2 (PencilText below,
         at ccPen's places): the rows print none of them; the patch shows from the Add act's start, so the pencil writes the 1 on paper */
      const pS = ccPen(G2s, G2s.ansY), pT = ccPen(G2t, G2t.ansY);
      const sumAns = { L: "", Lc: CC_INK.big, ml: [{ d: "" }, { d: "" }, { d: "" }], over: !carried && (s0 > 0 || st.wk === 0) ? [{ d: "", c: CC_INK.small }] : [] };`, true);
rep("patch warm2 pencil digits: the written 1",
`          <g pointerEvents="none">
            <PencilText text="300"`,
`          <g pointerEvents="none">
            <PencilText text="1" x={pS.overX} y={pS.y} size={pS.size} align="middle" color={CC_INK.small} chars={carried ? 0 : s0} />
            <PencilText text="300"`, true);

/* ---------------------------------------------------------------- ccPen next to ccBoxC */
rep("helper ccPen",
`const ccBoxC = (G, i) => G.bx[i] + G.bw / 2;
`,
`const ccBoxC = (G, i) => G.bx[i] + G.bw / 2;
/* where the pencil writes in a column frame: its acts and the PencilText that keeps the digits use the same numbers, so nothing jumps when an act ends.
   y = the baseline the tool prints row y on; the mL boxes are ONE string in cells a box apart (step); the litres end at the cell's edge; overX = the carried thousand on the divider's patch; a = the amber break figures */
const ccPen = (G, y) => ({ y: ccBase(G, y), size: G.fs, step: G.bx[1] - G.bx[0], mlX: ccBoxC(G, 0) - (G.bx[1] - G.bx[0]) / 2, Lx: G.cellR, overX: G.div, aY: G.laneY + 54 * G.s, aSize: Math.round(46 * G.s), aLx: G.cellR, aMx: (G.bx[0] + G.bx[2] + G.bw) / 2 });
`);

/* ---------------------------------------------------------------- the four guide writes (act2) */
rep("act2 head",
`  const act2 = (on) => {
    const s = st.wstep;
`,
`  const act2 = (on) => {
    const s = st.wstep, pS = ccPen(G2s, G2s.ansY), pT = ccPen(G2t, G2t.ansY);
`);
rep("act2 add (step 0)",
`    if (on === "add" && s === 0) wAct(0, {
      tool: "pencil",
      moves: "push",
      ms: 800,
      sfx: () => api.sfx.tick(),
      at: [A(G2s.div, ansMid(G2s)), ...[0, 1, 2].map((i) => A(ccBoxC(G2s, i), ansMid(G2s)))]
    }, "add");`,
`    if (on === "add" && s === 0) wAct(0, {
      tool: "pencil",
      moves: "write",
      text: ["1", "300"],
      at: [A(pS.overX, pS.y), A(pS.mlX, pS.y)],
      size: pS.size,
      align: ["middle", "start"],
      step: [0, pS.step],
      color: CC_INK.small
    }, "add");`);
rep("act2 add (step 2)",
`    else if (on === "add" && s === 2) wAct(2, { tool: "pencil", moves: "push", ms: 800, sfx: () => api.sfx.tick(), at: [A(G2s.cellR - 18, ansMid(G2s))] }, "add");`,
`    else if (on === "add" && s === 2) wAct(2, { tool: "pencil", moves: "write", text: "4", at: [A(pS.Lx, pS.y)], size: pS.size, align: "end", color: CC_INK.big }, "add");`);
rep("act2 break (step 3)",
`    else if (on === "break" && s === 3) wAct(3, {
      tool: "pencil",
      moves: "push",
      ms: 800,
      sfx: () => api.sfx.trade(),
      at: [A(G2t.cellR - 18, ccBase(G2t, G2t.rowY[0]) - 14), A(G2t.cellR - 18, G2t.laneY + 40), A(ccBoxC(G2t, 1), G2t.laneY + 40)]
    }, "break");`,
`    else if (on === "break" && s === 3) wAct(3, {
      tool: "pencil",
      moves: "write",
      text: [{ dab: [ox + G2t.cellR - 18, ccBase(G2t, G2t.rowY[0]) - 14] }, "4", "1,200"],
      at: [null, A(pT.aLx, pT.aY), A(pT.aMx, pT.aY)],
      size: pT.aSize,
      align: [null, "end", "middle"],
      color: CC_INK.amber
    }, "break");`);
rep("act2 take away (step 4)",
`    else if (on === "sub" && s === 4) wAct(4, {
      tool: "pencil",
      moves: "push",
      ms: 800,
      sfx: () => api.sfx.tick(),
      at: [...[0, 1, 2].map((i) => A(ccBoxC(G2t, i), ansMid(G2t))), A(G2t.cellR - 18, ansMid(G2t))]
    }, "sub");`,
`    else if (on === "sub" && s === 4) wAct(4, {
      tool: "pencil",
      moves: "write",
      text: ["700", "2"],
      at: [A(pT.mlX, pT.y), A(pT.Lx, pT.y)],
      size: pT.size,
      align: ["start", "end"],
      step: [pT.step, 0],
      color: CC_INK.left
    }, "sub");`);

/* ---------------------------------------------------------------- the question's Break key (actBreak) */
rep("actBreak",
`  const actBreak = () => {
    if (!canBreak) return;
    put({ bp: 0 });
    go({
      tool: "pencil",
      moves: "push",
      ms: 1e3,
      at: [A(G2.cellR - 30, ccBase(G2, G2.rowY[0]) - 16), A(G2.cellR - 30, G2.laneY + 40), A(ccBoxC(G2, 1), G2.laneY + 40)],
      onPoint: (i) => {
        put({ bp: i + 1 });
        api.sfx.trade();
      }
    }, () => {
      put({ broken: true, bp: 3 });
      api.sfx.settle();
    });
  };`,
`  const actBreak = () => {
    if (!canBreak) return;
    const top = cowRows[0], bkL = String(top.L - 1), bkM = ccNum(top.ml + 1e3), pB = ccPen(G2, G2.ansY);
    put({ bp: 0 });
    go({
      tool: "pencil",
      moves: "write",
      text: [{ dab: [ox + G2.cellR - 30, ccBase(G2, G2.rowY[0]) - 16] }, bkL, bkM],
      at: [null, A(pB.aLx, pB.aY), A(pB.aMx, pB.aY)],
      size: pB.aSize,
      align: [null, "end", "middle"],
      color: CC_INK.amber,
      onPoint: (i) => put((b) => ({ bp: Math.max(b.bp, i + 1) }))
    }, () => {
      put({ broken: true, bp: 1 + bkL.length + bkM.length });
      api.sfx.settle();
    });
  };`);

/* ---------------------------------------------------------------- drawP2, the guide board */
rep("drawP2 warm2 state",
`      const s0 = wShown(0, 4), carried = wShown(1, 1) >= 1, s2 = wShown(2, 1), s3 = wShown(3, 3), s4 = wShown(4, 4);
      const sumAns = { L: s2 >= 1 ? "4" : "", Lc: CC_INK.big, ml: [{ d: "" }, { d: "" }, { d: "" }], over: [] };
      if (carried) sumAns.ml = ccRight("300", CC_INK.small).ml;
      else if (s0 > 0) {
        const d = ["1", "3", "0", "0"];
        sumAns.over = [{ d: "1", c: CC_INK.small }];
        sumAns.ml = [0, 1, 2].map((i) => ({ d: s0 >= i + 2 ? d[i + 1] : "", c: CC_INK.small }));
      }
      const sub = W2.sub.map((r, k) => ccRow(r, { struck: k === 0 && s3 >= 1 }));
      const subAns = { L: s4 >= 4 ? "2" : "", Lc: CC_INK.left, ml: [0, 1, 2].map((i) => ({ d: s4 >= i + 1 ? "700"[i] : "", c: CC_INK.left })), over: [] };
      const amber2 = s3 >= 2 ? { L: "4", ml: s3 >= 3 ? "1,200" : void 0 } : null;`,
`      const s0 = wShown(0, 4), carried = wShown(1, 1) >= 1, s2 = wShown(2, 1), s3 = wShown(3, 7), s4 = wShown(4, 4);
      /* the pencil writes 1,300 (the carried 1 on the divider's paper patch, 300 in the boxes), the 4 litres, the amber 4 and 1,200, and 700 and 2 (PencilText below,
         at ccPen's places): the rows print none of them; the patch shows from the Add act's start, so the pencil writes the 1 on paper */
      const pS = ccPen(G2s, G2s.ansY), pT = ccPen(G2t, G2t.ansY);
      const sumAns = { L: "", Lc: CC_INK.big, ml: [{ d: "" }, { d: "" }, { d: "" }], over: !carried && (s0 > 0 || st.wk === 0) ? [{ d: "", c: CC_INK.small }] : [] };
      const sub = W2.sub.map((r, k) => ccRow(r, { struck: k === 0 && s3 >= 1 }));
      const subAns = { L: "", Lc: CC_INK.left, ml: [{ d: "" }, { d: "" }, { d: "" }], over: [] };
      const amber2 = s3 >= 2 ? { L: "", ml: "" } : null;`);
rep("drawP2 warm2 pencil digits",
`          {ccFrame(G2t, { unit: 0, rows: sub, rule: true, ans: subAns, amber: amber2 }, C, tx)}
`,
`          {ccFrame(G2t, { unit: 0, rows: sub, rule: true, ans: subAns, amber: amber2 }, C, tx)}
          <g pointerEvents="none">
            <PencilText text="1" x={pS.overX} y={pS.y} size={pS.size} align="middle" color={CC_INK.small} chars={carried ? 0 : s0} />
            <PencilText text="300" x={pS.mlX} y={pS.y} size={pS.size} align="start" step={pS.step} color={CC_INK.small} chars={s0 - 1} />
            <PencilText text="4" x={pS.Lx} y={pS.y} size={pS.size} align="end" color={CC_INK.big} chars={s2} />
            <PencilText text="4" x={pT.aLx} y={pT.aY} size={pT.aSize} align="end" color={CC_INK.amber} chars={s3 - 1} />
            <PencilText text="1,200" x={pT.aMx} y={pT.aY} size={pT.aSize} align="middle" color={CC_INK.amber} chars={s3 - 2} />
            <PencilText text="700" x={pT.mlX} y={pT.y} size={pT.size} align="start" step={pT.step} color={CC_INK.left} chars={s4} />
            <PencilText text="2" x={pT.Lx} y={pT.y} size={pT.size} align="end" color={CC_INK.left} chars={s4 - 3} />
          </g>
`);

/* ---------------------------------------------------------------- drawP2, the break question */
rep("drawP2 break state",
`    const brk = won || ds >= 2 ? 3 : st.broken ? 3 : st.bp;
    const showBrk = sw && (won || ds >= 2 || st.broken || st.bp > 0);
    const rows = order.map((r, k) => ccRow({ ...r, sign: k === 1 ? "−" : "" }, { struck: k === 0 && showBrk && brk >= 1, dim: st.mv === "row" && k === 0 && !dm }));
    const top = order[0], bot = order[1];
    const amber = showBrk && brk >= 2 ? { L: String(top.L - 1), ml: brk >= 3 ? ccNum(top.ml + 1e3) : void 0 } : null;`,
`    const top = order[0], bot = order[1];
    /* the Break key's act writes [strike dab, bkL, bkM]: st.bp counts its characters; after a real break the amber figures stay pencil (win page, trace) */
    const bkL = String(top.L - 1), bkM = ccNum(top.ml + 1e3), pB = ccPen(G2, G2.ansY);
    const bkPen = st.broken || st.bp > 0, bc = st.broken ? 1 + bkL.length + bkM.length : st.bp;
    const brk = won || ds >= 2 || st.broken ? 3 : Math.min(2, st.bp);
    const showBrk = sw && (won || ds >= 2 || st.broken || st.bp > 0);
    const rows = order.map((r, k) => ccRow({ ...r, sign: k === 1 ? "−" : "" }, { struck: k === 0 && showBrk && brk >= 1, dim: st.mv === "row" && k === 0 && !dm }));
    const amber = showBrk && brk >= 2 ? bkPen ? { L: "", ml: bc >= 1 + bkL.length ? "" : void 0 } : { L: bkL, ml: brk >= 3 ? bkM : void 0 } : null;`);
rep("drawP2 break pencil digits",
`        {ccFrame(G2, { unit: 0, rows, rule: true, ans: ans || { L: "", ml: [{ d: "" }, { d: "" }, { d: "" }] }, amber }, C, tx)}
`,
`        {ccFrame(G2, { unit: 0, rows, rule: true, ans: ans || { L: "", ml: [{ d: "" }, { d: "" }, { d: "" }] }, amber }, C, tx)}
        {bkPen && showBrk && <g pointerEvents="none">
            <PencilText text={bkL} x={pB.aLx} y={pB.aY} size={pB.aSize} align="end" color={CC_INK.amber} chars={bc - 1} />
            <PencilText text={bkM} x={pB.aMx} y={pB.aY} size={pB.aSize} align="middle" color={CC_INK.amber} chars={bc - 1 - bkL.length} />
          </g>}
`);

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
