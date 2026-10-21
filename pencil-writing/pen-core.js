/* PENCIL WRITING, the core (the owner, 2026-10-21; pencil-writing/README.md). Plain JS with no imports: build-helper.mjs puts this text, verbatim, inside
   the ACTION_KIT_HELPER block, so a tool, the act layer and the checks all use ONE glyph table and ONE layout. Every name starts with pen / PEN.
   A written character is a few single-line STROKES (a pencil's own path, in the order and direction a child writes it), never a font:
     PEN_GLYPHS[ch] = { a: advance, s: [{ k: kind, p: [[x, y] ...] }] }   in units of the digit's height, x from the advance's left edge, y 0 = top, 1 = baseline
     kind 0 = a polyline with sharp corners, 1 = a smooth open curve through the points, 2 = a smooth closed loop through the points.
   Sizes: `size` is the font size the tool already prints its digit with (fontSize), so a pencil digit is a drop-in for the printed one: it is
   PEN_H (0.72) of that tall (a Poppins digit is 0.72 em) and its advance is 0.84 of that. x, y of a layout are the baseline's left, middle or end. */
const PEN_H = 0.72, PEN_X0 = 0.12, PEN_W = 0.1, PEN_INK = "#3F3F3F";
const PEN_IN = 150, PEN_OUT = 150, PEN_NUM = 500, PEN_LINE = 180, PEN_DAB = 110, PEN_MIN = 40, PEN_HOP = 22, PEN_GAP = 40, PEN_TILT = -12, PEN_WMIN = 3.2;
/* the graphite's line width: a tenth of the font size, never a hairline on a small label (a `÷3` at 26 px) */
function penSw(size) {
  return Math.max(size * PEN_W, PEN_WMIN);
}
/* ellipse points: centre, radii, from angle a0 to a1 (degrees, screen angles: 0 = right, 90 = down), n points */
function penEll(cx, cy, rx, ry, a0, a1, n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = ((a0 + ((a1 - a0) * i) / (n - 1)) * Math.PI) / 180;
    out.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
  }
  return out;
}
const PEN_GLYPHS = (function () {
  const g = {};
  /* x0 shifts the ink inside the advance; the digits and signs are authored in a 0..0.6 box and sit centred in 0.84 */
  const make = (adv, x0, strokes) => ({ a: adv, s: strokes.map((st) => ({ k: st[0], p: st[1].map((q) => [q[0] + x0, q[1]]) })) });
  const dig = (strokes) => make(0.84, PEN_X0, strokes);
  g["0"] = dig([[2, penEll(0.3, 0.5, 0.29, 0.5, -90, -90 - 324, 10)]]);
  g["1"] = dig([[0, [[0.1, 0.22], [0.32, 0.0], [0.32, 1.0]]]]);
  g["2"] = dig([
    [1, [[0.02, 0.24], [0.1, 0.07], [0.28, 0.0], [0.46, 0.05], [0.56, 0.2], [0.52, 0.38], [0.38, 0.54], [0.16, 0.76], [0.0, 1.0]]],
    [0, [[0.0, 1.0], [0.6, 1.0]]],
  ]);
  g["3"] = dig([[1, [[0.02, 0.18], [0.14, 0.04], [0.32, 0.0], [0.48, 0.07], [0.54, 0.22], [0.46, 0.38], [0.3, 0.47], [0.2, 0.49], [0.34, 0.5], [0.52, 0.6], [0.58, 0.78], [0.48, 0.94], [0.3, 1.0], [0.12, 0.96], [0.0, 0.84]]]]);
  g["4"] = dig([
    [0, [[0.46, 0.0], [0.0, 0.72], [0.62, 0.72]]],
    [0, [[0.46, 0.0], [0.46, 1.0]]],
  ]);
  g["5"] = dig([
    [0, [[0.54, 0.0], [0.08, 0.0], [0.04, 0.46]]],
    [1, [[0.04, 0.46], [0.2, 0.4], [0.38, 0.4], [0.52, 0.5], [0.58, 0.68], [0.54, 0.86], [0.4, 0.98], [0.24, 1.0], [0.08, 0.95], [0.0, 0.86]]],
  ]);
  g["6"] = dig([[1, [[0.52, 0.06], [0.36, 0.0], [0.18, 0.1], [0.06, 0.34], [0.02, 0.62], [0.07, 0.86], [0.22, 0.99], [0.38, 0.98], [0.52, 0.86], [0.57, 0.7], [0.5, 0.55], [0.36, 0.48], [0.2, 0.5], [0.08, 0.6]]]]);
  g["7"] = dig([[0, [[0.0, 0.0], [0.6, 0.0], [0.22, 1.0]]]]);
  g["8"] = dig([[1, [[0.46, 0.1], [0.32, 0.0], [0.16, 0.05], [0.08, 0.22], [0.16, 0.38], [0.3, 0.47], [0.46, 0.58], [0.54, 0.76], [0.46, 0.93], [0.3, 1.0], [0.13, 0.94], [0.05, 0.77], [0.13, 0.59], [0.3, 0.47], [0.44, 0.36], [0.52, 0.2], [0.46, 0.08]]]]);
  g["9"] = dig([[1, [[0.54, 0.3], [0.46, 0.1], [0.3, 0.0], [0.14, 0.08], [0.04, 0.28], [0.1, 0.48], [0.26, 0.58], [0.42, 0.54], [0.54, 0.36], [0.56, 0.58], [0.5, 0.82], [0.38, 0.96], [0.22, 1.0], [0.08, 0.93]]]]);
  /* punctuation and signs: narrow ones sit at the left of a 0.4 advance, a sign is centred like a digit */
  g[","] = make(0.4, 0, [[1, [[0.13, 0.88], [0.14, 0.97], [0.08, 1.1], [0.02, 1.16]]]]);
  g["."] = make(0.4, 0, [[0, [[0.13, 0.965], [0.135, 0.97]]]]);
  g["="] = dig([[0, [[0.04, 0.34], [0.56, 0.34]]], [0, [[0.04, 0.66], [0.56, 0.66]]]]);
  g["-"] = dig([[0, [[0.06, 0.5], [0.54, 0.5]]]]);
  g["+"] = dig([[0, [[0.3, 0.2], [0.3, 0.8]]], [0, [[0.04, 0.5], [0.56, 0.5]]]]);
  g["×"] = dig([[0, [[0.06, 0.28], [0.54, 0.76]]], [0, [[0.54, 0.28], [0.06, 0.76]]]]);
  g["÷"] = dig([[0, [[0.04, 0.5], [0.56, 0.5]]], [0, [[0.3, 0.26], [0.305, 0.265]]], [0, [[0.3, 0.74], [0.305, 0.745]]]]);
  g["/"] = make(0.6, 0, [[0, [[0.46, 0.0], [0.06, 1.0]]]]);
  /* CAPITAL letters, for a tool whose pencil writes a code (ch 10 C20 writes A-Z): the same single-line strokes, 0.84 wide (I 0.56, M and W 0.98) */
  const cap = (strokes) => make(0.84, PEN_X0, strokes);
  const ell = (cx, cy, rx, ry, n) => penEll(cx, cy, rx, ry, -90, -90 - 360 * (n - 1) / n, n);
  const bowl = (y0, y1) => [[0.04, y0], [0.3, y0], [0.5, y0 + (y1 - y0) * 0.16], [0.56, y0 + (y1 - y0) * 0.5], [0.46, y0 + (y1 - y0) * 0.86], [0.28, y1], [0.04, y1]];
  g["A"] = cap([[0, [[0.0, 1.0], [0.3, 0.0], [0.6, 1.0]]], [0, [[0.1, 0.68], [0.5, 0.68]]]]);
  g["B"] = cap([[0, [[0.04, 0.0], [0.04, 1.0]]], [1, bowl(0.0, 0.5)], [1, [[0.04, 0.5], [0.34, 0.5], [0.54, 0.6], [0.58, 0.78], [0.5, 0.94], [0.3, 1.0], [0.04, 1.0]]]]);
  g["C"] = cap([[1, [[0.56, 0.18], [0.44, 0.04], [0.28, 0.0], [0.1, 0.1], [0.02, 0.35], [0.02, 0.65], [0.1, 0.9], [0.28, 1.0], [0.44, 0.96], [0.56, 0.82]]]]);
  g["D"] = cap([[0, [[0.04, 0.0], [0.04, 1.0]]], [1, [[0.04, 0.0], [0.3, 0.02], [0.5, 0.14], [0.58, 0.4], [0.58, 0.62], [0.5, 0.86], [0.3, 0.98], [0.04, 1.0]]]]);
  g["E"] = cap([[0, [[0.56, 0.0], [0.04, 0.0], [0.04, 1.0], [0.56, 1.0]]], [0, [[0.04, 0.5], [0.46, 0.5]]]]);
  g["F"] = cap([[0, [[0.56, 0.0], [0.04, 0.0], [0.04, 1.0]]], [0, [[0.04, 0.5], [0.46, 0.5]]]]);
  g["G"] = cap([[1, [[0.56, 0.18], [0.44, 0.04], [0.28, 0.0], [0.1, 0.1], [0.02, 0.35], [0.02, 0.65], [0.1, 0.9], [0.28, 1.0], [0.46, 0.94], [0.56, 0.78], [0.56, 0.55]]], [0, [[0.56, 0.55], [0.32, 0.55]]]]);
  g["H"] = cap([[0, [[0.04, 0.0], [0.04, 1.0]]], [0, [[0.56, 0.0], [0.56, 1.0]]], [0, [[0.04, 0.5], [0.56, 0.5]]]]);
  g["I"] = make(0.56, 0.06, [[0, [[0.04, 0.0], [0.4, 0.0]]], [0, [[0.22, 0.0], [0.22, 1.0]]], [0, [[0.04, 1.0], [0.4, 1.0]]]]);
  g["J"] = cap([[1, [[0.5, 0.0], [0.5, 0.45], [0.48, 0.75], [0.38, 0.94], [0.24, 1.0], [0.1, 0.94], [0.02, 0.8]]]]);
  g["K"] = cap([[0, [[0.04, 0.0], [0.04, 1.0]]], [0, [[0.56, 0.0], [0.04, 0.56], [0.58, 1.0]]]]);
  g["L"] = cap([[0, [[0.04, 0.0], [0.04, 1.0], [0.54, 1.0]]]]);
  g["M"] = make(0.98, 0.08, [[0, [[0.04, 1.0], [0.04, 0.0], [0.42, 0.7], [0.8, 0.0], [0.8, 1.0]]]]);
  g["N"] = cap([[0, [[0.04, 1.0], [0.04, 0.0], [0.56, 1.0], [0.56, 0.0]]]]);
  g["O"] = cap([[2, ell(0.3, 0.5, 0.3, 0.5, 12)]]);
  g["P"] = cap([[0, [[0.04, 0.0], [0.04, 1.0]]], [1, [[0.04, 0.0], [0.32, 0.0], [0.52, 0.1], [0.56, 0.3], [0.46, 0.48], [0.28, 0.55], [0.04, 0.55]]]]);
  g["Q"] = cap([[2, ell(0.3, 0.5, 0.3, 0.5, 12)], [0, [[0.36, 0.72], [0.62, 1.04]]]]);
  g["R"] = cap([[0, [[0.04, 0.0], [0.04, 1.0]]], [1, [[0.04, 0.0], [0.32, 0.0], [0.52, 0.1], [0.56, 0.3], [0.46, 0.48], [0.28, 0.55], [0.04, 0.55]]], [0, [[0.3, 0.55], [0.58, 1.0]]]]);
  g["S"] = cap([[1, [[0.54, 0.16], [0.42, 0.04], [0.26, 0.0], [0.1, 0.08], [0.05, 0.25], [0.16, 0.4], [0.32, 0.5], [0.5, 0.6], [0.56, 0.76], [0.48, 0.93], [0.3, 1.0], [0.12, 0.95], [0.02, 0.82]]]]);
  g["T"] = cap([[0, [[0.0, 0.0], [0.6, 0.0]]], [0, [[0.3, 0.0], [0.3, 1.0]]]]);
  g["U"] = cap([[1, [[0.04, 0.0], [0.04, 0.55], [0.1, 0.85], [0.3, 1.0], [0.5, 0.85], [0.56, 0.55], [0.56, 0.0]]]]);
  g["V"] = cap([[0, [[0.0, 0.0], [0.3, 1.0], [0.6, 0.0]]]]);
  g["W"] = make(0.98, 0.08, [[0, [[0.0, 0.0], [0.2, 1.0], [0.41, 0.3], [0.62, 1.0], [0.82, 0.0]]]]);
  g["X"] = cap([[0, [[0.04, 0.0], [0.56, 1.0]]], [0, [[0.56, 0.0], [0.04, 1.0]]]]);
  g["Y"] = cap([[0, [[0.0, 0.0], [0.3, 0.52]]], [0, [[0.6, 0.0], [0.3, 0.52], [0.3, 1.0]]]]);
  g["Z"] = cap([[0, [[0.02, 0.0], [0.58, 0.0], [0.02, 1.0], [0.58, 1.0]]]]);
  g[" "] = { a: 0.4, s: [] };
  g["x"] = g["×"];
  g["−"] = g["-"];
  return g;
})();
/* a deterministic 0..1 from a character's place in its text and its code: the same layout, every render, every device */
function penRand(i, c) {
  const s = Math.sin(i * 12.9898 + c * 78.233) * 43758.5453;
  return s - Math.floor(s);
}
/* points of one stroke (kind 0 polyline, 1 smooth open, 2 smooth closed): Catmull-Rom through the points, 7 steps a span */
function penFlat(k, p) {
  if (k === 0) return p.map((q) => [q[0], q[1]]);
  const n = p.length, closed = k === 2, per = 7;
  const P = (i) => (closed ? p[((i % n) + n) % n] : p[Math.max(0, Math.min(n - 1, i))]);
  const out = [[p[0][0], p[0][1]]];
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    for (let s = 1; s <= per; s++) {
      const t = s / per, t2 = t * t, t3 = t2 * t;
      const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  return out;
}
/* a stroke as the layer and the tool draw it: its points, the length up to each, the whole length */
function penStroke(pts) {
  const cum = [0];
  for (let j = 1; j < pts.length; j++) cum.push(cum[j - 1] + Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]));
  return { pts, cum, len: cum[cum.length - 1] || 0.001 };
}
const PEN_CACHE = {};
/* where every character of `text` is written: x, y = the baseline at the start, middle or end of the whole run (anchor), size = the font size */
function penLayout(text, x, y, size, anchor, step) {
  const key = text + "|" + x + "|" + y + "|" + size + "|" + anchor + "|" + (step || 0);
  if (PEN_CACHE[key]) return PEN_CACHE[key];
  const u = size * PEN_H;
  let adv = 0;
  for (let i = 0; i < text.length; i++) adv += (PEN_GLYPHS[text[i]] || { a: 0.84 }).a;
  /* step (px): every character sits in its own cell that wide (a row of cards, a column of boxes), instead of the glyphs' own advances */
  const w = step ? step * text.length : adv * u, ox = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  const chars = [];
  let cx = ox;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], gl = PEN_GLYPHS[ch], code = ch.charCodeAt(0), a = gl ? gl.a : 0.84;
    const cell = step || a * u, gx = cx + (cell - a * u) / 2;
    /* a hand never writes two digits alike: a hair of turn, size and height, fixed by the character's place */
    const rot = ((penRand(i + 1, code) - 0.5) * 3.6 * Math.PI) / 180, sc = 0.97 + 0.06 * penRand(i + 7, code), dy = (penRand(i + 13, code) - 0.5) * 0.024 * u;
    const mx = gx + (a * u) / 2, my = y - u / 2, co = Math.cos(rot), si = Math.sin(rot);
    const strokes = (gl ? gl.s : []).map((st) => penStroke(penFlat(st.k, st.p).map((q) => {
      const px = gx + q[0] * u - mx, py = y - u + q[1] * u - my;
      return [mx + (px * co - py * si) * sc, my + dy + (px * si + py * co) * sc];
    })));
    chars.push({ ch, i, strokes, cx: gx, adv: a * u, known: !!gl });
    cx += cell;
  }
  const out = { chars, w, ox, u, size };
  PEN_CACHE[key] = out;
  return out;
}
/* the first `f` (0..1) of a stroke as a polyline's points; at f = 1 it is the whole stroke, so a finished written digit and the last
   frame of its act are the same drawing */
function penCut(st, f) {
  const fmt = (q) => q[0].toFixed(1) + "," + q[1].toFixed(1);
  if (f >= 1) return st.pts.map(fmt).join(" ");
  const s = f * st.len, out = [];
  for (let j = 0; j < st.pts.length; j++) {
    if (st.cum[j] <= s) out.push(st.pts[j]);
    else {
      const a = st.pts[j - 1], b = st.pts[j], k = (s - st.cum[j - 1]) / (st.cum[j] - st.cum[j - 1] || 1);
      out.push([a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]);
      break;
    }
  }
  if (out.length < 2) out.push([out[0][0] + 0.01, out[0][1]]);
  return out.map(fmt).join(" ");
}
/* where the tip is at fraction f (0..1) of a stroke */
function penAt(st, f) {
  const s = Math.max(0, Math.min(1, f)) * st.len;
  for (let j = 1; j < st.pts.length; j++) {
    if (st.cum[j] >= s) {
      const a = st.pts[j - 1], b = st.pts[j], k = (s - st.cum[j - 1]) / (st.cum[j] - st.cum[j - 1] || 1);
      return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    }
  }
  const e = st.pts[st.pts.length - 1];
  return [e[0], e[1]];
}
