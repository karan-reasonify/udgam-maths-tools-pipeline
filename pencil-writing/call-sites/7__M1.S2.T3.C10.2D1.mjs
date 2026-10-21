#!/usr/bin/env node
/* pencil-writing call sites: class 4 chapter 7, M1.S2.T3.C10.2D1 (Share Out Bench: the working lines "24 ÷ 8 = 3 | 3 × 3 = 9", "multiply first", "tray", "bench",
 * "together"). The record of what changed in this pair, applied as exact-string replacements (each OLD text must match exactly once; a NEW text already there is
 * skipped, so a second run changes nothing; nothing is written unless every replacement applies and the result parses). Run:
 *   node pencil-writing/call-sites/7__M1.S2.T3.C10.2D1.mjs [--dry] [--file <copy of the pair>]
 *
 * The pair's helper block already carries the `write` move, PencilText and PencilLine. The ONE pencil act of this pair, Work's writeAct (the `push` of 900 ms,
 * one point per TERM of the working lines, "both-ways" and "leftover"), revealed the lines term by term (state w[i] = how many terms of line i). It is now ONE `write`:
 *   - sobPenPieces(terms, lay, size, ay, hi): the pencil's pieces of one working line, used by the act AND by the drawing (so nothing moves when the act ends).
 *     Neighbouring terms are written as ONE string joined by a space ("24 ÷ 8 = 3": one string is one 0.5-1.1 s run, not a 0.5 s token per term and a lone "=");
 *     a "|" or a hidden answer (the empty dashed box of the ask stage) ends a run; a hidden answer is a DAB (the tip touches the box, the box appears, no ink);
 *     a ringed number (the big middle number of "multiply first") sits inside its run and its ring comes when its last digit is down. Start-aligned at the term's
 *     x of the old layout (sobLay), baseline = the printed text's (line top + 30, Hindi 31), size = the printed fontSize.
 *   - state: pw[i] = the pieces written for line i (null: the line is printed), pc[i] = characters of line i finished. w[i] still gates the line's card (the white
 *     rectangle and its label): the act shows line 1's card as it starts and the next line's card as the last character of the line before it is down.
 *   - SobPenLine draws the pieces: <PencilText chars> for a run, the dashed box for a dab, the ring; sobFresh and `finish`'s reset clear pw / pc.
 *   - writeAct: tokens = the run strings and { dab } for the hidden answers, at / size arrays indexed by TOKEN; onPoint(j) maps the character j back to its piece
 *     (j - the piece's first character + its offset in the line) and keeps the larger count (a space has no stroke: it is reported late, at the end of its string);
 *     no ms, no api.sfx.tick (the act scratches itself); a write that was refused (resolves false before any hit) puts the old state back.
 *   - left as they are: the hand acts (open, deal, lift, count-tray, count-bench), `finish` (the tool's own timeline prints the lines of the win and of a wrong answer
 *     in Poppins after clearing them), the card labels (translated words), the per-bowl numbers. */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { CLASS4, pairPath, read } from "../lib.mjs";

const esbuild = createRequire(path.join(CLASS4, "package.json"))("esbuild");
const DRY = process.argv.includes("--dry");
const fi = process.argv.indexOf("--file"); // --file <copy.tsx>: apply to a copy (a test), not to the pair
const file = fi > 0 ? path.resolve(process.argv[fi + 1]) : pairPath("7", "M1.S2.T3.C10.2D1");

const R = []; // [name, oldText, newText, optional]
const rep = (name, a, b, optional) => R.push([name, a, b, !!optional]);

/* ---------------------------------------------------------------- patch-ups of an earlier version of the helper (optional; each turns the previous text into the final one) */
/* a ringed number gets two spaces before it (one space put the ring on the "=") and the ring is 11 px, not 15, wider than the digits */
rep("ring gap (patch)",
`    if (run.s) run.s += " ";`,
`    if (run.s) run.s += typeof t !== "string" && t.ring ? "  " : " ";`, true);
rep("ring width (patch)",
`rx: (b.cx + b.adv - a.cx) / 2 + 15 };`,
`rx: (b.cx + b.adv - a.cx) / 2 + 11 };`, true);

/* ---------------------------------------------------------------- the pieces and their drawing (top level, before SobCounter) */
rep("helpers sobPenPieces, SobPenLine",
`function SobCounter({ x, y, r }) {`,
`/* the pencil's pieces of one working line (pencil writing, 2026-10-21): the act AND the drawing use these, so nothing moves when the act ends. Neighbouring terms are
   written as ONE string joined by a space ("24 ÷ 8 = 3"); a "|" or a hidden answer (the empty dashed box) ends a run; a hidden answer is a dab (the tip touches the
   box and it appears); a ringed number sits inside its run, its ring comes when its last digit is down. c0 = the line's characters before the piece. */
const sobPenPieces = (terms, lay, size, ay, hi) => {
  const y = ay + (hi ? 31 : 30), cy = ay + (hi ? 21 : 20), out = [];
  let run = null, c0 = 0;
  const end = () => {
    if (!run) return;
    const L = penLayout(run.s, run.x, y, size, "start").chars;
    run.c0 = c0;
    run.len = run.s.length;
    run.rings = run.marks.map((m) => {
      const a = L[m.a], b = L[m.b - 1];
      return { e: m.b, cx: (a.cx + b.cx + b.adv) / 2, cy, rx: (b.cx + b.adv - a.cx) / 2 + 11 };
    });
    c0 += run.len;
    out.push(run);
    run = null;
  };
  terms.forEach((t, j) => {
    if (t === "|") {
      end();
      return;
    }
    if (typeof t !== "string" && (t.v === null || t.v === void 0)) {
      end();
      out.push({ hole: true, j, x: lay[j].x, cx: lay[j].x + 29, cy: ay + 20, y, size, c0, len: 1 });
      c0 += 1;
      return;
    }
    const s = typeof t === "string" ? t : String(t.v);
    if (!run) run = { s: "", x: lay[j].x, y, size, marks: [] };
    if (run.s) run.s += typeof t !== "string" && t.ring ? "  " : " ";
    const a = run.s.length;
    run.s += s;
    if (typeof t !== "string" && t.ring) run.marks.push({ a, b: run.s.length });
  });
  end();
  return out;
};
function SobPenLine({ pieces, pc, terms, C }) {
  return <g>
      {pieces.map((p, k) => {
    const c = pc - p.c0;
    if (c <= 0) return null;
    if (p.hole) {
      const t = terms[p.j];
      if (t && t.v !== null && t.v !== void 0) return <text key={k} x={p.x} y={p.y} fontSize={p.size} fontWeight={700} fill={C.ink}>{t.v}</text>;
      return <rect key={k} x={p.x} y={p.cy - 17} width={58} height={34} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="6 5" />;
    }
    return <g key={k}>
          {p.rings.map((r, m) => c >= r.e ? <ellipse key={m} cx={r.cx} cy={r.cy} rx={r.rx} ry={19} fill="none" stroke={C.accent} strokeWidth={4} /> : null)}
          <PencilText text={p.s} x={p.x} y={p.y} size={p.size} align="start" chars={c} />
        </g>;
  })}
    </g>;
}
function SobCounter({ x, y, r }) {`);

/* ---------------------------------------------------------------- state: pw (pieces), pc (characters) */
rep("sobFresh state",
`ct: 0, cb: 0, w: [0, 0, 0], lit: null, glow: null, told: false, done: false, acts: [] };`,
`ct: 0, cb: 0, w: [0, 0, 0], pw: [null, null, null], pc: [0, 0, 0], lit: null, glow: null, told: false, done: false, acts: [] };`);
rep("finish reset",
`    s(60, () => put({ w: [0, 0, 0], glow: null }));`,
`    s(60, () => put({ w: [0, 0, 0], pw: [null, null, null], pc: [0, 0, 0], glow: null }));`);

/* ---------------------------------------------------------------- the act */
rep("writeAct",
`  const writeAct = (idx, then) => {
    const at = [], seg = [];
    idx.forEach((i) => {
      const lay = sobLay(LINES[i].terms, lineSize, TX0);
      lay.forEach((r) => {
        at.push({ x: r.x + r.w / 2, y: lineAt(i) + (hi ? 21 : 20) });
        seg.push(i);
      });
    });
    return api.act({ tool: "pencil", moves: "push", ms: 900, at, onPoint: (p) => {
      const i = seg[p], upto = seg.slice(0, p + 1).filter((s) => s === i).length;
      const w = sRef.current.w.slice();
      w[i] = upto;
      put({ w });
    } }).then((ok) => {
      if (ok) then();
      return ok;
    });
  };`,
`  const writeAct = (idx, then) => {
    const was = sRef.current, pw = was.pw.slice(), pc = was.pc.slice(), w0 = was.w.slice(), toks = [], at = [], size = [], map = [], tot = {};
    let g = 0, hit = false;
    idx.forEach((i) => {
      const g0 = g, ps = sobPenPieces(LINES[i].terms, sobLay(LINES[i].terms, lineSize, TX0), lineSize, lineAt(i), hi);
      pw[i] = ps;
      pc[i] = 0;
      ps.forEach((p) => {
        toks.push(p.hole ? { dab: [p.cx, p.cy], size: p.size } : p.s);
        at.push(p.hole ? null : { x: p.x, y: p.y });
        size.push(p.size);
        map.push({ i, c0: p.c0, g });
        g += p.len;
      });
      tot[i] = g - g0;
    });
    w0[idx[0]] = Math.max(1, w0[idx[0]]);
    put({ pw, pc, w: w0 });
    return api.act({ tool: "pencil", moves: "write", text: toks, at, size, align: "start", onPoint: (j) => {
      hit = true;
      let k = map.length - 1;
      while (k > 0 && map[k].g > j) k--;
      const m = map[k], cur = sRef.current, pcs = cur.pc.slice(), ws = cur.w.slice();
      pcs[m.i] = Math.max(pcs[m.i], m.c0 + (j - m.g) + 1);
      const nx = idx[idx.indexOf(m.i) + 1];
      if (pcs[m.i] >= tot[m.i] && nx !== void 0) ws[nx] = Math.max(1, ws[nx]);
      put({ pc: pcs, w: ws });
    } }).then((ok) => {
      if (ok) {
        const full = sRef.current.pc.slice();
        idx.forEach((i) => {
          full[i] = tot[i];
        });
        put({ pc: full });
        then();
      } else if (!hit) put({ pw: was.pw, pc: was.pc, w: was.w });
      return ok;
    });
  };`);

/* ---------------------------------------------------------------- the drawing of a pencil line */
rep("line drawing",
`            <text x={14} y={lineAt(i) + (hi ? 33 : 29)} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(ln.label)}</text>
            {ln.terms.slice(0, w).map((t, j) => {`,
`            <text x={14} y={lineAt(i) + (hi ? 33 : 29)} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(ln.label)}</text>
            {S.pw[i] ? <SobPenLine pieces={S.pw[i]} pc={S.pc[i]} terms={ln.terms} C={C} /> : ln.terms.slice(0, w).map((t, j) => {`);

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
