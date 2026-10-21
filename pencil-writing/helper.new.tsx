/* ACTION_KIT_HELPER start */
/* ACTION ANIMATION (class 4 head of 2026-10-16, the owner; LAYOUT.md §1e, PATTERNS.md §15, IMAGES.md §11). When the child taps an
   action (Cut, Split, Measure, Count, Lift, Put back, Tidy, Carry ...) a real tool does it on screen: a knife, scissors, a ruler, a
   pencil or an eraser (the ACTION KIT pictures: runtime/actionkit.tsx, ACTION_KIT + ACTION_KIT_FIT, made once by
   `node cli.mjs actionkit`), or a cartoon hand drawn here in code (glove white, ink outline: hands are drawn, never generated). Work calls
     api.act({ tool, moves, at: [{ x, y }, ...], from?, to?, ms?, onPoint?, hold? }) -> Promise<boolean>
   in its own (working-area) coordinates. tool: knife | scissors | ruler | pencil | eraser | hand; moves: slice | snip | slide |
   draw | rub | tap | push | carry | sweep | write (the pencil WRITES a number, stroke by stroke: PENCIL WRITING at the end of this block). The tool comes in from just off its first point, does its move at each point of `at`
   (slide, draw, push, carry and sweep travel along from -> at... -> to), then leaves, in 1.1 to 1.5 s (never longer; `ms` asks for
   another length inside 0.7 to 1.5 s). onPoint(i) runs the moment it acts at at[i] (split that piece as the knife passes it); `hold`
   (an svg node drawn round 0,0) travels with a push, a carry or a sweep (the carried piece). The promise resolves true at the end: the
   tool's own pieces part and settle then. While it plays the pad and keys are locked (the runtime's lock), the working area takes no
   tap, the keyboard waits, getState().acting is true, and a second act() resolves false at once (react only on true: a double tap
   never cuts twice). A phase change, a restart or a new question ends it (false). Under reduced motion nothing moves: every onPoint
   runs and it resolves true at once. A kit picture that is missing draws the hand. It prints no text and catches no pointer; a tool
   that never calls act renders exactly as before. */
const ACT_SFX = { slice: "cut", snip: "cut", slide: "trade", draw: "tick", rub: "tick", tap: "tick", push: "settle", carry: "trade", sweep: "settle" };
const ACT_TRAVEL = { slide: 1, draw: 1, push: 1, carry: 1, sweep: 1 };
const ACT_TEMPO = 1.5, ACT_BEAT = 400;   /* class 5 default (the owner, 2026-10-18): every act 1.5x calmer; a pencil holds a beat after writing */
const ACT_IN = Math.round(240 * ACT_TEMPO), ACT_OUT = Math.round(220 * ACT_TEMPO), ACT_MAX = Math.round(1500 * ACT_TEMPO);
/* where each tool comes in from, and leaves to, off its first and last point (work units) */
const ACT_OFF = { knife: [0, -170], scissors: [0, 170], pencil: [150, -150], eraser: [150, -90], hand: [130, 150] };
const actOk = (p) => !!p && isFinite(p.x) && isFinite(p.y);
/* a kit picture and how it is held (ACTION_KIT_FIT), or null: the hand stands in */
function actPic(k) {
  const src = typeof ACTION_KIT !== "undefined" && ACTION_KIT ? ACTION_KIT[k] : "";
  if (!src || k === "hand") return null;
  const fit = typeof ACTION_KIT_FIT !== "undefined" && ACTION_KIT_FIT && ACTION_KIT_FIT[k];
  return { src, fit: fit || { w: 1, h: 1, len: 140, ax: 0.5, ay: 0.5, rot: 0 } };
}
/* one act: its points, its length, when it acts at each point of `at` (ms from the start) */
function actPlan(o) {
  if (String(o.moves || o.move || "") === "write") return penPlan(o);
  const move = String(o.moves || o.move || "tap"), tool = String(o.tool || "hand");
  const at = (o.at || []).filter(actOk), path = [o.from, ...at, o.to].filter(actOk);
  if (!path.length) return null;
  const travel = !!ACT_TRAVEL[move] && path.length > 1, pts = travel ? path : at.length ? at : path;
  const total = Math.round(Math.min(ACT_MAX, Math.max(700 * ACT_TEMPO, ACT_TEMPO * (Number(o.ms) || 1100 + 100 * Math.max(0, pts.length - 2)))));
  const mid = total - ACT_IN - ACT_OUT, cum = [0];
  for (let k = 1; k < path.length; k++) cum.push(cum[k - 1] + Math.hypot(path[k].x - path[k - 1].x, path[k].y - path[k - 1].y));
  const len = cum[cum.length - 1] || 1, first = actOk(o.from) ? 1 : 0, pic = actPic(tool);
  const hits = at.map((_, i) => Math.round(ACT_IN + mid * (!travel ? (i + 0.65) / at.length : move === "slide" && pic ? 0.4 + 0.6 * cum[i + first] / len : cum[i + first] / len)));
  const a = path[0], b = path[path.length - 1], dl = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const off = move === "slide" && pic ? [-(b.x - a.x) / dl * 160, -(b.y - a.y) / dl * 160] : ACT_OFF[pic ? tool : "hand"] || ACT_OFF.hand;
  return { move, tool, pic, total, mid, hits, pts, path, cum, len, travel, off, first, at };
}
/* where the tool is at t ms: x, y (its acting point), o (opacity), u (0..1 through the move at a point, -1 between), tm (0..1 through
   the middle), seg (the travel's direction) */
function actPose(p, t) {
  const cl = (v) => Math.max(0, Math.min(1, v)), tm = cl((t - ACT_IN) / p.mid);
  let x = p.path[0].x, y = p.path[0].y, u = -1, dir = [1, 0];
  if (p.travel && !(p.move === "slide" && p.pic)) {   /* the ruler lays itself along the line instead (ActLayer); the hand that stands in for it travels */
    const s = tm * p.len;
    let j = 1;
    while (j < p.cum.length - 1 && p.cum[j] < s) j++;
    const a = p.path[j - 1], b = p.path[j], seg = p.cum[j] - p.cum[j - 1] || 1, f = cl((s - p.cum[j - 1]) / seg);
    x = a.x + (b.x - a.x) * f; y = a.y + (b.y - a.y) * f; dir = [(b.x - a.x) / seg, (b.y - a.y) / seg];
  } else if (!p.travel) {
    const n = p.pts.length, k = Math.min(n - 1, Math.floor(tm * n)), f = tm * n - k;
    const a = p.pts[Math.max(0, k - 1)], b = p.pts[k], g = k > 0 ? cl(f / 0.3) : 1, e = g * g * (3 - 2 * g);
    x = a.x + (b.x - a.x) * e; y = a.y + (b.y - a.y) * e; u = f < 0.3 ? -1 : cl((f - 0.3) / 0.7);
  }
  const lead = t < ACT_IN ? 1 - cl(t / ACT_IN) : t > p.total - ACT_OUT ? 1 - cl((p.total - t) / ACT_OUT) : 0;
  return { x: x + p.off[0] * lead * lead, y: y + p.off[1] * lead * lead, o: 1 - lead, u, tm, dir };
}
/* the drawn hand: point (index finger up, its tip at 0,0), open (palm out, fingers up, palm centre at 0,0) or grip (a fist, 0,0 under
   its knuckles). Glove white with the ink outline, no skin tone (IMAGES.md §2: hands are drawn, never generated) */
function ActHand({ pose, ink }) {
  const s = { fill: "#FBF8F2", stroke: ink, strokeWidth: 4, strokeLinejoin: "round" };
  const cuff = { fill: "#E8E1D4", stroke: ink, strokeWidth: 4 };
  if (pose === "open") return (
    <g data-role="act-hand" data-pose="open">
      <rect x={-30} y={36} width={60} height={26} rx={8} {...cuff} />
      <ellipse cx={-42} cy={8} rx={11} ry={24} transform="rotate(-35 -42 8)" {...s} />
      {[[-34, 52], [-16, 60], [2, 56], [20, 46]].map(([fx, fh], k) => <rect key={k} x={fx} y={-10 - fh} width={16} height={fh + 14} rx={8} {...s} />)}
      <rect x={-36} y={-22} width={72} height={62} rx={24} {...s} />
    </g>
  );
  if (pose === "grip") return (
    <g data-role="act-hand" data-pose="grip">
      <rect x={-28} y={30} width={56} height={24} rx={8} {...cuff} />
      <rect x={-36} y={-20} width={72} height={56} rx={24} {...s} />
      {[-25, -9, 7, 23].map((fx, k) => <circle key={k} cx={fx} cy={-18} r={10} {...s} />)}
      <rect x={-32} y={0} width={46} height={18} rx={9} {...s} />
    </g>
  );
  return (
    <g data-role="act-hand" data-pose="point">
      <rect x={-34} y={98} width={68} height={26} rx={8} {...cuff} />
      <ellipse cx={-34} cy={72} rx={12} ry={22} transform="rotate(-30 -34 72)" {...s} />
      <rect x={-36} y={42} width={74} height={62} rx={26} {...s} />
      <rect x={8} y={42} width={30} height={20} rx={10} {...s} />
      <rect x={10} y={60} width={28} height={18} rx={9} {...s} />
      <rect x={10} y={76} width={26} height={17} rx={8} {...s} />
      <rect x={-12} y={0} width={24} height={62} rx={12} {...s} />
    </g>
  );
}
/* the layer: above the working area, under the key, the drawer and the footer; clipped to the working area; no pointer events */
function ActLayer({ play, w, h, C }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    const step = () => { setT(performance.now() - play.t0); raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [play]);
  if (play.move === "write") return penWriteLayer(play, Math.min(t, performance.now() - play.t0), w, h, C);
  const q = actPose(play, t), d = q.u >= 0 ? Math.sin(Math.PI * q.u) : 0, m = play.move, pic = play.pic;
  let dx = 0, dy = 0, rot = 0, sx = 1;
  if (m === "slice") dy = -56 + 86 * d;
  else if (m === "snip") { dy = 14 * (1 - d); sx = 1 - 0.3 * d; }
  else if (m === "rub") dx = q.u >= 0 ? 24 * Math.sin(q.u * Math.PI * 6) : 0;
  else if (m === "tap") sx = 1 - 0.12 * d;
  else if (m === "sweep") rot = 14 * Math.sin(q.tm * Math.PI * 4);
  else if (m === "carry") dy = -16 * Math.sin(Math.PI * q.tm);
  const x = q.x + dx, y = q.y + dy;
  let body = null;
  if (pic && m === "slide") {
    /* the ruler lies along from -> to, its top edge on the line, and a tick pops at each point of `at` as it is read */
    const a = play.path[0], b = play.path[play.path.length - 1], L = Math.hypot(b.x - a.x, b.y - a.y) || pic.fit.len;
    const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI, th = (pic.fit.h / pic.fit.w) * pic.fit.len, ux = (b.x - a.x) / L, uy = (b.y - a.y) / L;
    body = (
      <g transform={`translate(${q.x} ${q.y}) rotate(${ang + (pic.fit.rot || 0)})`}>
        <image data-role="act" href={pic.src} x={-24} y={0} width={L + 48} height={th} preserveAspectRatio="none" />
        {play.at.map((p, i) => (t >= play.hits[i] ? <line key={i} x1={(p.x - a.x) * ux + (p.y - a.y) * uy} y1={0} x2={(p.x - a.x) * ux + (p.y - a.y) * uy} y2={22} stroke={C.ink} strokeWidth={4} strokeLinecap="round" /> : null))}
      </g>
    );
  } else if (pic) {
    const f = pic.fit, k = f.len / Math.max(f.w, f.h), pw = f.w * k, ph = f.h * k;
    body = (
      <g transform={`translate(${x} ${y}) rotate(${(f.rot || 0) + rot}) scale(${sx} 1)`}>
        <image data-role="act" href={pic.src} x={-f.ax * pw} y={-f.ay * ph} width={pw} height={ph} preserveAspectRatio="none" />
      </g>
    );
  } else {
    const pose = m === "carry" ? "grip" : m === "push" || m === "sweep" ? "open" : "point";
    /* drawn in a 1.4 times box, so it reads from the last bench beside the kit's tools */
    const back = pose === "open" ? 72 : 0, hx = x - q.dir[0] * back, hy = pose === "grip" ? y - 48 : y - q.dir[1] * back;
    body = (
      <g transform={`translate(${hx} ${hy}) rotate(${(pose === "point" ? -18 : 10 * Math.sign(q.dir[0] || 1)) + rot}) scale(${1.4 * sx})`}>
        <ActHand pose={pose} ink={C.ink} />
      </g>
    );
  }
  /* the pencil's line, drawn behind its tip from the first point (the tool draws its own line once the act is over) */
  let trail = null;
  if (m === "draw" && play.travel && t > ACT_IN) {
    const s = q.tm * play.len, ps = play.path.filter((_, j) => play.cum[j] <= s).map((p) => `${p.x},${p.y}`);
    trail = <polyline points={[...ps, `${q.x},${q.y}`].join(" ")} fill="none" stroke="#4A4A4A" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />;
  }
  return (
    <g opacity={q.o}>
      <clipPath id="c4ActClip"><rect x={0} y={0} width={w} height={h} /></clipPath>
      <g clipPath="url(#c4ActClip)" filter="url(#fShadowSoft)">
        {trail}
        {m === "tap" && d > 0 ? <circle cx={q.x} cy={q.y} r={14 + 26 * q.u} fill="none" stroke={C.ink} strokeWidth={4} strokeOpacity={0.35 * (1 - q.u)} /> : null}
        {play.hold ? <g transform={`translate(${q.x} ${q.y + (m === "carry" ? dy : 0)})`}>{play.hold}</g> : null}
        {body}
      </g>
    </g>
  );
}
/* the hook ToolFrame holds: act() for Work's api, the play the layer draws, busy() for getState and the keys. `key` changes with the
   phase, the run and the question: the act in flight ends (resolves false) */
function useActionKit(lockNow, lockedRef, sfx, key) {
  const [play, setPlay] = useState(null);
  const cur = useRef(null);
  const end = (ok) => {
    const c = cur.current;
    if (!c) return;
    cur.current = null;
    c.timers.forEach(clearTimeout);
    setPlay(null);
    if (!c.was) lockNow(false);   /* the tool's own lock, held before the act, stays */
    c.resolve(ok);
  };
  useEffect(() => () => end(false), [key]);
  const act = (o) => new Promise((resolve) => {
    o = o || {};
    if (cur.current) { resolve(false); return; }
    const p = actPlan(o), onPoint = typeof o.onPoint === "function" ? o.onPoint : null;
    const hit = (i) => { try { if (onPoint) onPoint(i); } catch (e) { console.error(e); } };
    if (!p || reducedMotion()) { if (p) (p.move === "write" ? p.hits : p.at).forEach((_, i) => hit(i)); resolve(true); return; }
    const c = { timers: [], resolve, was: !!lockedRef.current };
    cur.current = c;
    lockNow(true);
    const pen = p.tool === "pencil", fx = sfx && sfx[pen ? "tick" : ACT_SFX[p.move]];   /* a pencil sounds like writing */
    let tickAt = -1e9;
    const tick = () => { const n = performance.now(); if (fx && n - tickAt > 150) { tickAt = n; fx(); } };
    const writing = p.move === "write";   /* a written number: the scratch sounds at each stroke's start, and no beat is held after it */
    if (fx && p.travel) c.timers.push(setTimeout(() => fx(), ACT_IN));
    if (writing) p.ticks.forEach((ms) => c.timers.push(setTimeout(tick, ms)));
    p.hits.forEach((ms, i) => c.timers.push(setTimeout(() => { hit(i); if (writing) return; if (pen) tick(); else if (fx && !p.travel) fx(); }, ms)));
    c.timers.push(setTimeout(() => end(true), p.total + (pen && !writing ? ACT_BEAT : 0)));
    setPlay({ ...p, hold: o.hold || null, t0: performance.now() });
  });
  return { act, play, busy: () => !!cur.current };
}
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
/* ACTION_KIT_HELPER end */
