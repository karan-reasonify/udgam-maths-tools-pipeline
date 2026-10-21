#!/usr/bin/env node
/* pencil-writing call sites: class 4 chapter 10, M1.S2.T4.C15.2D1 (number towers: build, check, free play). The record of what changed in this pair, applied as
 * exact-string replacements (each OLD text must match exactly once; a NEW text already there is skipped, so a second run changes nothing; nothing is
 * written unless every replacement applies and the result parses). Run:  node pencil-writing/call-sites/10__M1.S2.T4.C15.2D1.mjs [--dry] [--no-rebuild | --drop-rebuild]
 * (--no-rebuild is for a FRESH pair: it leaves the rebuild group out. On a pair that already has it, only --drop-rebuild takes it out again: it applies
 * the group's replacements the other way round, new text -> old text. A pair that had the group dropped must be approved again.)
 *
 * What it does (the pair's helper block already carries the `write` move, PencilText and PencilLine):
 *   - top level next to twrNum: twrFs (the font size of a tower box's number, formerly an inline expression), twrPenBox (the string, size, baseline
 *     point and middle of the number of a box: used by the act AND by the box's drawing, so nothing jumps), twrPenStart (the x a centred string starts at:
 *     a write act has ONE align, so a string among start-aligned ones is given its start)
 *   - Work state: pw (boxes whose number the pencil wrote: they keep PencilText), rb (a free-play box being rewritten: how many characters so far),
 *     wp (a ledger result the pencil wrote: how many characters so far, kept after the act so it never swaps to a printed one)
 *   - the box: a box in `part` (being written), `rb` or `pw` draws <PencilText> (in INK_MADE, the colour the act writes in); every other box stays printed
 *   - writeBox (build, the Add / Multiply key): ONE `write` of the box's number (no ms, no 34 px steps)
 *   - pencilBox (build, a box missed three times): ONE `write` of ["= N" in the working column, the number in the box]: the old first point was a
 *     MARK that made the printed "= N" appear in the working column (fix.w), a printed number under a tip that leaves no ink, so the pencil now writes it
 *   - writeWork (check, the Check key): ONE `write` of the line's "= N" in the working column (the old single point made the printed "= N" appear)
 *   - lineAt draws a pencil-written "= N" with <PencilText> (wp), in the colour the act wrote it in
 *   - REBUILD GROUP (--no-rebuild leaves it out of a fresh pair, --drop-rebuild takes it out of a pair that has it): free play's `rebuild` was a `push` over the boxes that CHANGE, and each touched box swaps its old number for
 *     the new one: that puts a number on screen, so it is ONE `write` of [dab box, its new number, dab box, ...] (the dab erases the old number, the new one is
 *     written; they stay pencil-written: pw). The scan listed it as a push over cells, so this group is a departure the main session may drop.
 *   - not touched: the ledger's printed lines (a + b = N) that appear with the first box digit in build, flipSign's instant worked[o:0] in phase 4, the win
 *     fill and the wrong-answer trace (timelines, no pencil), digits the child TYPES (the pad)
 *   - every write's colour is the drawing's colour (INK_MADE for boxes and the build ledger result, the line's own ink for a check result) */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CLASS4, pairPath, read } from "../lib.mjs";

const esbuild = createRequire(path.join(CLASS4, "package.json"))("esbuild");
const DRY = process.argv.includes("--dry");
const NO_REBUILD = process.argv.includes("--no-rebuild"), DROP_REBUILD = process.argv.includes("--drop-rebuild");
const file = pairPath("10", "M1.S2.T4.C15.2D1");

const R = []; // [name, oldText, newText, optional]
const rep = (name, a, b, optional, group) => R.push([name, a, b, !!optional, group || ""]);

/* ---------------------------------------------------------------- state */
rep("state: pw, rb, wp",
`    worked: {},
    reveal: false,
    done: false,
    fix: null
  });`,
`    worked: {},
    reveal: false,
    done: false,
    fix: null,
    pw: {},
    rb: {},
    wp: {}
  });`);

/* ---------------------------------------------------------------- top-level helpers */
rep("helpers after twrNum",
`const twrNum = (v) => typeof v === "number" && v >= 1e3 ? indian(v) : String(v);
`,
`const twrNum = (v) => typeof v === "number" && v >= 1e3 ? indian(v) : String(v);
/* the font size a tower box prints (and the pencil writes) its number with */
const twrFs = (B, shown) => shown.length <= 2 ? B.w > 130 ? T.display : T.xl : shown.length === 3 ? B.w > 130 ? T.xl : T.speech : T.label;
/* where the pencil writes the number v of the box whose top left is (x, y): the string, its size, the baseline's middle (at) and the box's middle (mid).
   The box draws its written digits with these very numbers, so the act's last frame and the finished digits are one drawing. */
const twrPenBox = (B, x, y, v) => {
  const text = twrNum(v), size = twrFs(B, text);
  return { text, size, at: { x: x + B.w / 2, y: y + B.h / 2 + size * 0.35 }, mid: { x: x + B.w / 2, y: y + B.h / 2 } };
};
/* a write act has ONE align for all its strings: a string centred on cx among start-aligned ones is given the x it starts at */
const twrPenStart = (text, cx, size) => cx - penLayout(text, 0, 0, size, "start").w / 2;
`);

/* ---------------------------------------------------------------- the box: printed, or the pencil's own digits */
rep("box: shown / fs",
`      const shown = v === null ? "" : twrNum(v);
      const fs = shown.length <= 2 ? B.w > 130 ? T.display : T.xl : shown.length === 3 ? B.w > 130 ? T.xl : T.speech : T.label;`,
`      const pk = S.part && S.part.k === k ? S.part : null, rbk = S.rb[k];
      const penV = v !== null && (pk || rbk !== void 0 || S.pw[k]) ? pk ? pk.v : v : null;
      const shown = v === null ? "" : twrNum(penV !== null ? penV : v);
      const fs = twrFs(B, shown);`);
rep("box: the number",
`          {v !== null && !isOpen && <text
          x={x + B.w / 2}
          y={y + B.h / 2 + fs * 0.35}
          textAnchor="middle"
          fontSize={fs}
          fontWeight={700}
          fill={ink}
        >{shown}</text>}`,
`          {v !== null && !isOpen && (penV !== null ? <PencilText text={shown} x={x + B.w / 2} y={y + B.h / 2 + fs * 0.35} size={fs} align="middle" color={INK_MADE} chars={pk ? pk.pc : rbk} /> : <text
          x={x + B.w / 2}
          y={y + B.h / 2 + fs * 0.35}
          textAnchor="middle"
          fontSize={fs}
          fontWeight={700}
          fill={ink}
        >{shown}</text>)}`);

/* ---------------------------------------------------------------- the working column */
rep("lineAt: a written result",
`  const lineAt = (kk, cx, y, parts, fill) => {
    const dx = twoCol ? 6 : 20;
    return [
      <text key={kk + "a"} x={cx + dx} y={y} textAnchor="end" fontSize={T.label} fontWeight={600} fill={fill}>{parts[0]}</text>,
      parts[1] ? <text key={kk + "b"} x={cx + dx + 12} y={y} textAnchor="start" fontSize={T.label} fontWeight={600} fill={fill}>{parts[1]}</text> : null
    ];
  };`,
`  const lineAt = (kk, cx, y, parts, fill, wpc, pcol) => {
    const dx = twoCol ? 6 : 20;
    return [
      <text key={kk + "a"} x={cx + dx} y={y} textAnchor="end" fontSize={T.label} fontWeight={600} fill={fill}>{parts[0]}</text>,
      parts[1] ? wpc !== void 0 ? <PencilText key={kk + "b"} text={parts[1]} x={cx + dx + 12} y={y} size={T.label} align="start" color={pcol || fill} chars={wpc} /> : <text key={kk + "b"} x={cx + dx + 12} y={y} textAnchor="start" fontSize={T.label} fontWeight={600} fill={fill}>{parts[1]}</text> : null
    ];
  };`);
rep("ledger (check): a written result",
`      order.slice(0, S.wn[op]).forEach((cell, i) => {
        const full = S.reveal || !!S.worked[op + ":" + i];
        const bad = full && twrApply(op, rows[cell.r - 1][cell.c], rows[cell.r - 1][cell.c + 1]) !== rows[cell.r][cell.c];
        ledger.push(...lineAt("l" + op + i, cx, L.y + 130 + i * 44, lineOf(cell, op, full), bad ? INK_NOTE : C.ink));
      });`,
`      order.slice(0, S.wn[op]).forEach((cell, i) => {
        const wpc = S.wp[op + ":" + i], full = S.reveal || !!S.worked[op + ":" + i] || wpc !== void 0;
        const bad = full && twrApply(op, rows[cell.r - 1][cell.c], rows[cell.r - 1][cell.c + 1]) !== rows[cell.r][cell.c];
        ledger.push(...lineAt("l" + op + i, cx, L.y + 130 + i * 44, lineOf(cell, op, full), bad ? INK_NOTE : C.ink, wpc));
      });`);
rep("ledger (build): a written result",
`    lines.forEach((cell, i) => ledger.push(
      ...lineAt("l" + i, L.x + L.w / 2, L.y + 130 + i * 44, lineOf(cell, rail, valueAt(cell.r, cell.c) !== null || fixing(cell) && S.fix.w), C.ink)
    ));`,
`    lines.forEach((cell, i) => {
      const wpc = S.wp[cellKey(cell)];
      ledger.push(...lineAt("l" + i, L.x + L.w / 2, L.y + 130 + i * 44, lineOf(cell, rail, valueAt(cell.r, cell.c) !== null || fixing(cell) && S.fix.w || wpc !== void 0), C.ink, wpc, INK_MADE));
    });`);

/* ---------------------------------------------------------------- writeBox (build: Add / Multiply) */
rep("writeBox",
`    const k = cellKey(cell), s = String(rows[cell.r][cell.c]);
    const dw = 34, cx = ox + cell.r * (B.w + B.gx) / 2 + cell.c * (B.w + B.gx) + B.w / 2, cy = Y(cell.r) + B.h / 2;
    busy.current = true;
    api.did("fill");
    const ok = await api.act({
      tool: "pencil",
      moves: "push",
      ms: 800,
      at: s.split("").map((_, i) => ({ x: cx - s.length * dw / 2 + (i + 0.5) * dw, y: cy })),
      onPoint: (i) => put({ part: { k, s: s.slice(0, i + 1) } })
    });
    busy.current = false;
    if (!ok) {
      put({ part: null });
      return;
    }
    put({ part: null, vals: { [k]: rows[cell.r][cell.c] } });
    api.sfx.settle();`,
`    const k = cellKey(cell), val = rows[cell.r][cell.c], s = String(val), g = twrPenBox(B, X(cell.r, cell.c), Y(cell.r), val);
    busy.current = true;
    api.did("fill");
    const ok = await api.act({
      tool: "pencil",
      moves: "write",
      text: g.text,
      at: [g.at],
      size: g.size,
      align: "middle",
      color: INK_MADE,
      onPoint: (i) => put({ part: { k, s: s.slice(0, i + 1), v: val, pc: i + 1 } })
    });
    busy.current = false;
    if (!ok) {
      put({ part: null });
      return;
    }
    put({ part: null, vals: { [k]: val }, pw: { ...S.pw, [k]: true } });
    api.sfx.settle();`);

/* ---------------------------------------------------------------- pencilBox (build: a box missed three times) */
rep("pencilBox",
`    const k = cellKey(cell), val = rows[cell.r][cell.c], s = String(val);
    const i = Math.max(0, order.findIndex((o) => cellKey(o) === k));
    const dw = 34, cx = X(cell.r, cell.c) + B.w / 2, cy = Y(cell.r) + B.h / 2;
    busy.current = true;
    const ok = await api.act({
      tool: "pencil",
      moves: "push",
      ms: 1300,
      at: [{ x: L.x + L.w / 2 + 60, y: L.y + 120 + i * 44 }, ...s.split("").map((_, j) => ({ x: cx - s.length * dw / 2 + (j + 0.5) * dw, y: cy }))],
      onPoint: (j) => j === 0 ? put({ fix: { k, w: true } }) : put({ part: { k, s: s.slice(0, j) } })
    });
    busy.current = false;
    if (!ok) {
      put({ fix: null, part: null });
      return;
    }
    put({ fix: null, part: null, vals: { ...S.vals, [k]: val } });
    api.sfx.settle();`,
`    const k = cellKey(cell), val = rows[cell.r][cell.c], s = String(val), g = twrPenBox(B, X(cell.r, cell.c), Y(cell.r), val);
    /* the working column's line of this box (the same filter the column draws with) and the "= N" the pencil writes on it */
    const row = order.filter((o) => valueAt(o.r, o.c) !== null || cellKey(o) === k).findIndex((o) => cellKey(o) === k);
    const lt = lineOf(cell, rail, true)[1], lp = { x: L.x + L.w / 2 + (twoCol ? 6 : 20) + 12, y: L.y + 130 + row * 44 };
    let lc = 0, pc = 0;
    busy.current = true;
    const ok = await api.act({
      tool: "pencil",
      moves: "write",
      text: [lt, g.text],
      at: [lp, { x: twrPenStart(g.text, g.at.x, g.size), y: g.at.y }],
      size: [T.label, g.size],
      align: "start",
      color: INK_MADE,
      onPoint: (j) => {
        if (j < lt.length) {
          lc = Math.max(lc, j + 1);
          put({ wp: { ...S.wp, [k]: lc } });
        } else {
          pc = Math.max(pc, j - lt.length + 1);
          put({ wp: { ...S.wp, [k]: lt.length }, part: { k, s: s.slice(0, pc), v: val, pc } });
        }
      }
    });
    busy.current = false;
    if (!ok) {
      put({ fix: null, part: null, wp: S.wp });
      return;
    }
    put({ fix: null, part: null, vals: { ...S.vals, [k]: val }, pw: { ...S.pw, [k]: true }, wp: { ...S.wp, [k]: lt.length } });
    api.sfx.settle();`);

/* ---------------------------------------------------------------- writeWork (check: the Check key) */
rep("writeWork",
`    const col = twoCol ? L.x + L.w * (S.sg === "add" ? 0.25 : 0.75) : L.x + L.w / 2;
    busy.current = true;
    api.did("fill");
    const ok = await api.act({
      tool: "pencil",
      moves: "push",
      ms: 800,
      at: [{ x: col + 64, y: L.y + 120 + i * 44 }],
      onPoint: () => put({ worked: { ...S.worked, [S.sg + ":" + i]: true } })
    });
    busy.current = false;
    if (!ok) return;
    api.sfx.settle();`,
`    const col = twoCol ? L.x + L.w * (S.sg === "add" ? 0.25 : 0.75) : L.x + L.w / 2;
    const cell = order[i], wk = S.sg + ":" + i, lt = lineOf(cell, S.sg, true)[1];
    const bad = twrApply(S.sg, rows[cell.r - 1][cell.c], rows[cell.r - 1][cell.c + 1]) !== rows[cell.r][cell.c];
    let lc = 0;
    busy.current = true;
    api.did("fill");
    const ok = await api.act({
      tool: "pencil",
      moves: "write",
      text: lt,
      at: [{ x: col + (twoCol ? 6 : 20) + 12, y: L.y + 130 + i * 44 }],
      size: T.label,
      align: "start",
      color: bad ? INK_NOTE : C.ink,
      onPoint: (j) => {
        lc = Math.max(lc, j + 1);
        put(lc >= lt.length ? { wp: { ...S.wp, [wk]: lc }, worked: { ...S.worked, [wk]: true } } : { wp: { ...S.wp, [wk]: lc } });
      }
    });
    busy.current = false;
    if (!ok) {
      put({ wp: S.wp });
      return;
    }
    put({ wp: { ...S.wp, [wk]: lt.length }, worked: { ...S.worked, [wk]: true } });
    api.sfx.settle();`);

/* ---------------------------------------------------------------- REBUILD GROUP (free play: the boxes that change) */
if (!NO_REBUILD) {
  const G = "rebuild", rep = (name, a, b) => R.push([name, a, b, false, G]);
  rep("rebuild",
`  const rebuild = async (cells) => {
    if (!cells.length) {
      put({ old: null, upd: {}, pend: {} });
      return;
    }
    busy.current = true;
    const upd = {};
    await api.act({
      tool: "pencil",
      moves: "push",
      ms: 700,
      at: cells.map((c) => ({ x: X(c.r, c.c) + B.w / 2, y: Y(c.r) + B.h / 2 })),
      onPoint: (i) => {
        upd[cellKey(cells[i])] = true;
        put({ upd: { ...upd } });
      }
    });
    busy.current = false;
    put({ old: null, upd: {}, pend: {} });`,
`  const rebuild = async (cells, grid) => {
    if (!cells.length) {
      put({ old: null, upd: {}, pend: {} });
      return;
    }
    busy.current = true;
    const upd = {}, rb = {}, cum = [], gs = cells.map((c) => twrPenBox(B, X(c.r, c.c), Y(c.r), grid[c.r][c.c]));
    gs.reduce((a, g, n) => (cum[n] = a, a + 1 + g.text.length), 0);
    /* per box: a dab (the tip touches the box and its old number goes), then its new number, written; all in ONE act */
    await api.act({
      tool: "pencil",
      moves: "write",
      text: [].concat(...gs.map((g) => [{ dab: [g.mid.x, g.mid.y], size: g.size }, g.text])),
      at: [].concat(...gs.map((g) => [null, g.at])),
      size: [].concat(...gs.map((g) => [g.size, g.size])),
      align: "middle",
      color: INK_MADE,
      onPoint: (j) => {
        let n = cum.length - 1;
        while (n > 0 && cum[n] > j) n--;
        const kk = cellKey(cells[n]);
        upd[kk] = true;
        rb[kk] = Math.max(rb[kk] || 0, j - cum[n]);
        put({ upd: { ...upd }, rb: { ...rb } });
      }
    });
    const pwn = {};
    cells.forEach((c) => {
      pwn[cellKey(c)] = true;
    });
    busy.current = false;
    put({ old: null, upd: {}, pend: {}, rb: {}, pw: { ...S.pw, ...pwn } });`);
  rep("rebuild call (a base number changed)",
`        put({ base: b, open: null, typing: "", old: twrGrid(S.base, S.op), upd: {}, pend: cellsOf(cells) });
        rebuild(cells);`,
`        put({ base: b, open: null, typing: "", old: twrGrid(S.base, S.op), upd: {}, pend: cellsOf(cells) });
        rebuild(cells, twrGrid(b, S.op));`);
  rep("rebuild call (the sign switched)",
`      put({ op: other(S.op), open: null, typing: "", old: twrGrid(S.base, S.op), upd: {}, pend: cellsOf(cells) });
      rebuild(cells);`,
`      put({ op: other(S.op), open: null, typing: "", old: twrGrid(S.base, S.op), upd: {}, pend: cellsOf(cells) });
      rebuild(cells, twrGrid(S.base, other(S.op)));`);
}

/* ---------------------------------------------------------------- apply */
const count = (hay, needle) => { let n = 0, i = -1; while ((i = hay.indexOf(needle, i + 1)) >= 0) n++; return n; };
let text = read(file);
if (text.includes("\r\n")) { console.error("the pair has CRLF line endings; this script writes LF"); process.exit(1); }
let applied = 0, skipped = 0, failed = 0;
for (const [name, a0, b0, optional, group] of R) {
  const swap = DROP_REBUILD && group === "rebuild", a = swap ? b0 : a0, b = swap ? a0 : b0;
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
