/* PENCIL WRITING, the move and the drawing (the owner, 2026-10-21; pencil-writing/README.md). Goes inside the ACTION_KIT_HELPER block, after
   useActionKit, with pen-core.js before it; it uses that block's own names (actOk, actPic, ACT_OFF, ActHand). A tool calls
     api.act({ tool: "pencil", moves: "write", text: "125", at: [{ x, y }], size: 64, align: "middle", onPoint: (i) => ... })
   `text` is a string, or an array of strings (several numbers in one act, each at its own point of `at`); `size` is the font size the tool prints
   its digit with (a number, or one per string); `align` start | middle | end says what x, y of each point is: the baseline's left, middle or end;
   `align`, `size`, `color` and `step` are one value for the act, or an array with one per token (indexed like `at`); `step` (px) puts every character
   of a string in its own cell that wide (a row of cards: "ABC" with step 64), so a row is ONE token, written in about 0.8 s, not one token a card; `color` is the graphite (default PEN_INK). Between the strings may stand { line: [x1, y1, x2, y2], size } (a bar the pencil writes) and
   { dab: [x, y], size } (the tip touches that point for 110 ms and leaves no ink: the tool's own arrow or tick appears then); each counts as ONE
   character, so marks and numbers share one act. onPoint(i) runs when the tip FINISHES character i (counted across all the strings), so the tool's own
   state changes then: it draws that character with <PencilText text size x y align chars={i + 1} />, the same drawing the act has just drawn.
   Pace: the pencil comes in 150 ms, writes each number in about 500 ms (a stroke never less than 40 ms), leaves in 150 ms, and holds NO beat
   (a number is about 0.8 s: 150 + 500 + 150); a run of more than 4 characters takes 80 ms more for each. `ms` is ignored for a write. The scratch
   (sfx.tick) is at each stroke's start, at most one every 150 ms. Under reduced motion nothing moves, every onPoint runs, and it resolves true at once. */
/* the plan of one write act: when each stroke is drawn, when each character is finished, when the scratch sounds */
function penPlan(o) {
  const texts = Array.isArray(o.text) ? o.text : [o.text], ats = o.at || [];
  /* align, size and color are one value for the act, or an array with one per token (as `at`), so a left-aligned ledger line and a centred box number can be written in one act */
  const alignOf = (k) => String((Array.isArray(o.align) ? o.align[k] : o.align) || o.anchor || "start"), colorOf = (k) => String((Array.isArray(o.color) ? o.color[k] : o.color) || PEN_INK);
  const toks = [];
  let lastSize = 48;
  texts.forEach((tx, k) => {
    const size = Number(Array.isArray(o.size) ? o.size[k] : o.size) || (tx && typeof tx === "object" && Number(tx.size)) || lastSize;
    if (tx && typeof tx === "object" && Array.isArray(tx.dab)) {
      /* a dab: { dab: [x, y] }. The tip touches that point for a moment and onPoint runs, leaving no ink: the tool's own mark (an arrow, a tick) appears
         then. It counts as one character, so marks and numbers can share ONE act (the pencil comes in and leaves once). */
      const D = tx.dab.map(Number);
      if (D.length < 2 || !D.every(isFinite)) return;
      toks.push({ text: ".", size, color: colorOf(k), dab: true, lay: { u: size * PEN_H, chars: [{ ch: ".", i: 0, strokes: [penStroke([[D[0], D[1]], [D[0], D[1]]])], known: true, cx: D[0], adv: 0 }] } });
      return;
    }
    if (tx && typeof tx === "object" && Array.isArray(tx.line)) {
      /* a straight bar (a fraction bar, an underline) written in the same act: { line: [x1, y1, x2, y2], size? }; it counts as one character for onPoint */
      const L = tx.line.map(Number);
      if (L.length < 4 || !L.every(isFinite)) return;
      toks.push({ text: "|", size, color: colorOf(k), line: true, lay: { u: size * PEN_H, chars: [{ ch: "|", i: 0, strokes: [penStroke([[L[0], L[1]], [L[2], L[3]]])], known: true, cx: L[0], adv: Math.abs(L[2] - L[0]) }] } });
      return;
    }
    const s = String(tx == null ? "" : tx), a = ats[k] || ats[ats.length - 1];
    if (!s || !actOk(a)) return;
    lastSize = size;
    toks.push({ text: s, size, color: colorOf(k), lay: penLayout(s, a.x, a.y, size, alignOf(k), Number(Array.isArray(o.step) ? o.step[k] : o.step) || 0) });
  });
  if (!toks.length) return null;
  const strokes = [], hits = [], ticks = [];
  let t = PEN_IN;
  toks.forEach((tk, ti) => {
    const chars = tk.lay.chars, flat = [];
    chars.forEach((c, ci) => c.strokes.forEach((st) => flat.push({ st, ci })));
    /* the tip lifts and hops (PEN_HOP) between characters and where a stroke starts away from where the last one ended */
    const gaps = flat.map((e, j) => {
      if (!j) return 0;
      const a = flat[j - 1].st.pts[flat[j - 1].st.pts.length - 1], b = e.st.pts[0];
      return e.ci !== flat[j - 1].ci || Math.hypot(a[0] - b[0], a[1] - b[1]) > 0.05 * tk.lay.u ? PEN_HOP : 0;
    });
    const B = tk.dab ? PEN_DAB : tk.line ? PEN_LINE : PEN_NUM + 80 * Math.max(0, tk.text.length - 4), hopSum = gaps.reduce((s, g) => s + g, 0);
    const drawMs = Math.max(B * 0.5, B - hopSum), base = PEN_MIN * flat.length, lenSum = flat.reduce((s, e) => s + e.st.len, 0) || 1;
    const ends = chars.map(() => null), tokStart = t;
    flat.forEach((e, j) => {
      const d = drawMs >= base ? PEN_MIN + ((drawMs - base) * e.st.len) / lenSum : drawMs / flat.length;
      t += gaps[j];
      strokes.push({ st: e.st, t0: t, t1: t + d, sw: penSw(tk.size), color: tk.color, dab: !!tk.dab });
      ticks.push(Math.round(t));
      t += d;
      ends[e.ci] = t;
    });
    /* a character with no stroke (a space) is "finished" when the one before it is, so onPoint stays in order */
    let prev = tokStart;
    chars.forEach((_, ci) => {
      if (ends[ci] != null) prev = ends[ci];
      hits.push(Math.round(prev));
    });
    if (ti < toks.length - 1) t += PEN_GAP;
  });
  if (!strokes.length) return null;
  const total = Math.round(t + PEN_OUT), first = strokes[0].st.pts[0];
  return { move: "write", tool: "pencil", pic: actPic("pencil"), total, hits, ticks, strokes, at: ats.filter(actOk), off: ACT_OFF.pencil, path: [{ x: first[0], y: first[1] }] };
}
/* where the tip is at t ms: on the stroke being drawn, hopping to the next, or (before the first and after the last) waiting at its end;
   o is the opacity the tool fades in and out with (the same in and out as every act) */
function penTip(p, t) {
  const S = p.strokes;
  let pt = S[0].st.pts[0], j = -1;
  for (let k = 0; k < S.length; k++) if (S[k].t0 <= t) j = k;
  if (j >= 0) {
    const s = S[j];
    if (t <= s.t1) pt = penAt(s.st, (t - s.t0) / (s.t1 - s.t0 || 1));
    else {
      const a = s.st.pts[s.st.pts.length - 1];
      if (j + 1 < S.length) {
        const b = S[j + 1].st.pts[0], k = Math.min(1, (t - s.t1) / (S[j + 1].t0 - s.t1 || 1));
        pt = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
      } else pt = a;
    }
  }
  const lead = t < PEN_IN ? 1 - Math.max(0, Math.min(1, t / PEN_IN)) : t > p.total - PEN_OUT ? 1 - Math.max(0, Math.min(1, (p.total - t) / PEN_OUT)) : 0;
  return { x: pt[0] + p.off[0] * lead * lead, y: pt[1] + p.off[1] * lead * lead, o: 1 - lead };
}
/* the layer of a write act: the graphite grows behind the tip, the pencil follows it tilted with a small wobble. The ink is drawn exactly as
   <PencilText> draws it (no shadow, no fade, not clipped), so the last frame and the finished digits are the same picture. */
function penWriteLayer(p, t, w, h, C) {
  const q = penTip(p, t), pic = p.pic;
  const ink = [];
  p.strokes.forEach((e, j) => {
    const f = Math.max(0, Math.min(1, (t - e.t0) / (e.t1 - e.t0 || 1)));
    if (f > 0 && !e.dab) ink.push(<polyline key={j} data-role="pen-ink" points={penCut(e.st, f)} fill="none" stroke={e.color} strokeWidth={e.sw} strokeLinecap="round" strokeLinejoin="round" />);
  });
  let body;
  if (pic) {
    const f = pic.fit, k = f.len / Math.max(f.w, f.h), pw = f.w * k, ph = f.h * k;
    body = (
      <g transform={`translate(${q.x} ${q.y}) rotate(${(f.rot || 0) + PEN_TILT + 3 * Math.sin(t / 55)})`}>
        <image data-role="act" href={pic.src} x={-f.ax * pw} y={-f.ay * ph} width={pw} height={ph} preserveAspectRatio="none" />
      </g>
    );
  } else {
    body = (
      <g transform={`translate(${q.x} ${q.y}) rotate(-18) scale(1.4)`}>
        <ActHand pose="point" ink={C.ink} />
      </g>
    );
  }
  return (
    <g>
      <g data-role="pen-writing">{ink}</g>
      <g opacity={q.o}>
        <clipPath id="c4ActClip"><rect x={0} y={0} width={w} height={h} /></clipPath>
        <g clipPath="url(#c4ActClip)" filter="url(#fShadowSoft)">{body}</g>
      </g>
    </g>
  );
}
/* a bar the pencil wrote in a write act ({ line: [x1, y1, x2, y2], size }): what a tool draws for it afterwards, in the same graphite, so the act's last
   frame and the finished bar are one drawing. `size` is the same number the act was given (it sets the line's width, as it does for a digit). */
function PencilLine({ x1, y1, x2, y2, size, color, width, opacity }) {
  const st = penStroke([[x1, y1], [x2, y2]]);
  return <polyline data-role="pencil-line" points={penCut(st, 1)} fill="none" stroke={color || PEN_INK} strokeWidth={width || penSw(size)} strokeLinecap="round" strokeLinejoin="round" opacity={opacity == null ? 1 : opacity} />;
}
/* what a tool draws for a number the pencil wrote (and for what it has written so far: `chars` is how many characters, from the left, are
   there). x, y, size, align as in the act's call, so the same numbers put it exactly where the act wrote it. */
function PencilText({ text, x, y, size, align, anchor, step, color, chars, width, opacity }) {
  const s = String(text == null ? "" : text), L = penLayout(s, x, y, size, String(align || anchor || "start"), Number(step) || 0);
  const n = chars == null ? s.length : Math.max(0, Math.min(s.length, chars)), sw = width || penSw(size), col = color || PEN_INK, out = [];
  L.chars.forEach((c) => {
    if (c.i >= n) return;
    /* a character with no strokes in the table is printed, so nothing a tool writes ever vanishes */
    if (!c.known) out.push(<text key={c.i} x={c.cx + c.adv / 2} y={y} textAnchor="middle" fontSize={size} fontWeight={500} fill={col}>{c.ch}</text>);
    c.strokes.forEach((st, j) => out.push(<polyline key={c.i + "." + j} points={penCut(st, 1)} fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />));
  });
  return <g data-role="pencil-text" opacity={opacity == null ? 1 : opacity}>{out}</g>;
}
