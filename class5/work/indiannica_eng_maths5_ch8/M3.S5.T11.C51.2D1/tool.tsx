/* ═══ M3.S5.T11.C51.2D1 · three_measures · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide (it instructs; after a wrong act or answer the hint shows UNDER the
   pinned instruction and stays until the child acts again; r34). The lesson is action-driven: nothing moves
   on unless the child acts (a tap, a key, an answer); after a right answer the next question follows its
   short celebration by itself. The header's Hint key (r35) shows the hint on demand.
   This template is the FULL NEW STYLE and is used for a chapter whose pinned runtime is silent (a voiced runtime, r21
   and before, is scaffolded from lib/build/skeleton.voiced.tsx instead). Blocks that a given runtime has no support for
   are left out when `scaffold` writes this file (board, start page, theme).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing).
   THE NEW LOOK (the owner, 2026-10-16; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar (only the blinking key at the top
   right), four small clickable phase dots, a big ONE-sentence bubble, digits as written, every act performed on screen (api.act). The question
   lives ONLY in the bubble: each item's `say` is the whole question in one sentence. Opt out (delete `keyOnly: true` / `navDots: true` below)
   only with a reason stated in the report.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "three_measures";
const MEDIA_ID = "M3.S5.T11.C51.2D1";
const TOOL_NAME = "Three Measures";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["Three bins, some cubes and some jars of water."];
/* the whole-tool line: kept for the tool object's shape (not shown from r44) */
const FINISH_LINE = "You told the three measures apart and read the water.";
/* printed when the child opens Free play: free play is the last phase's jars, the objects, the Push stick and Mark level */
const FREE_LINE = "Free play. Lower anything into a jar, push it under and mark the level.";

/* ── Three Measures: shared pieces (every name starts TM / tm, so nothing collides with the runtime) ── */
const TM_C = { blue: "#0072B2", green: "#009E73", verm: "#D55E00", violet: "#7A4FB5", rose: "#CC79A7", amber: "#E69F00",
  white: "#FFFDF7", line: "#2B2B2B", wood: "#E9C98F", woodD: "#B98A4A", woodL: "#F7E6C4", water: "#4FA3D9" };
const TM_VIO = ["#8F7BEA", "#6A55D6", "#5534C8"];   /* the unit cube's top, left and right faces (hue 251-257) */
const TM_DW = 900;   /* the design width: the picture fits x 0-900 (the open panel's room) and is centred when the panel is shut */
const TM_BINS = [{ id: "length", label: "Length" }, { id: "surface", label: "Surface" }, { id: "space", label: "Space" }];
const TM_TILES = [{ id: "cm", label: "cm" }, { id: "m", label: "m" }, { id: "sqcm", label: "sq. cm" }, { id: "sqm", label: "sq. m" },
  { id: "cucm", label: "cu. cm" }, { id: "cum", label: "cu. m" }];
const TM_CARDS: any = { ribbon: { label: "Ribbon" }, fence: { label: "Fence" }, grass: { label: "Grass" }, water: { label: "Water" }, box: { label: "Inside a box" } };
/* vol: the rise (stage units) when fully under; float: the rise while it floats (null = it sinks); h: its drawn height */
const TM_OBJ: any = {
  key: { vol: 16, float: null, h: 52, label: "Key" }, stone: { vol: 58, float: null, h: 84, label: "Stone" },
  cube: { vol: 40, float: null, h: 88, label: "Wooden cube" }, marble: { vol: 12, float: null, h: 44, label: "Marble" },
  lemon: { vol: 46, float: 22, h: 62, label: "Lemon" }, cork: { vol: 46, float: 16, h: 72, label: "Cork" },
  ball: { vol: 64, float: 22, h: 84, label: "Ball" }, apple: { vol: 52, float: 22, h: 74, label: "Apple" } };
const TM_CM = 32;
const TM_OBJW: any = { key: 150, stone: 120, cube: 78, marble: 48, lemon: 92, cork: 56, ball: 84, apple: 74 };   /* drawn widths at scale 1 */
const TM_PEBBLE = [[-58, -4], [-48, -26], [-20, -40], [14, -38], [44, -26], [58, -4], [52, 20], [28, 38], [-6, 40], [-36, 32], [-54, 16]];    /* one centimetre on the scaled jar of phase 3's last question */
/* the nudge while the answer key is locked names the NEXT act still to do (each a fixed line, so TR can carry it) */
const TM_NUDGES: any = {
  sortBin: "Put every card into a bin first.", sortUnit: "Give every card a unit tile first.", pick: "Drop the card into a bin first.",
  count: "Set a cuboid on the shelf first.", turn: "Tap Turn to stand the cuboid on its end first.",
  lower2: "Lower both objects into the jars first.", mark2: "Mark the level in each jar first.",
  lower1: "Lower the stone into the jar first.", mark1: "Mark the new water level first.",
  corkMark: "Mark the level while the cork floats first.", corkPush: "Use the Push stick first.", corkAgain: "Mark the level again with the cork under.",
  ballPush: "Push the ball fully under with the stick first.", ballMark: "Mark the level of the floating ball first.",
  tileNoCard: "Put a card in a bin first.", trayNotFull: "Make the tray full: change Wide or High.", jarEmpty: "Put an object in a jar first." };
function tmNudge(it: any, S: any) {
  const N = TM_NUDGES, onMat = S && S.objs ? Object.keys(S.objs).some((id) => S.objs[id].where === "mat") : false;
  switch (it && it.kind) {
    case "sort": return ["fence", "grass", "water"].some((id) => !S.cards[id].bin) ? N.sortBin : N.sortUnit;
    case "pick": return N.pick;
    case "count": return N.count;
    case "turn": return N.turn;
    case "jars2": return onMat ? N.lower2 : N.mark2;
    case "calc": return onMat ? N.lower1 : N.mark1;
    case "cork": return !S.jars[0].marks.length ? N.corkMark : !S.objs.cork.under ? N.corkPush : N.corkAgain;
    case "ballpush": return N.ballPush;
    case "ballmark": return N.ballMark;
  }
  return N.count;
}
let TM_TOUCHED = false;   /* the child has touched the board for real (user mode only): the answer gate starts from here */
let TM_ENTER_AT = 0;      /* the time of the last physical Enter: Enter on a guide step counts as a touch */
const tmUser = () => { try { const s = (window as any).toolApi && (window as any).toolApi.getState(); return !!s && s.mode === "user"; } catch (e) { return false; } };

/* a cuboid of unit cubes, drawn isometric (each cube a hexagon the shape of the cube skin, 2a x 4b), back to front */
function tmIso(L: number, Wd: number, H: number, x0: number, y0: number, b: number, skin: boolean, o: any = {}) {
  const a = b * 1.767, els: any[] = [], cs: number[][] = [];
  for (let i = 0; i < L; i++) for (let j = 0; j < Wd; j++) for (let k = 0; k < H; k++) cs.push([i, j, k]);
  cs.sort((p, q) => p[0] + p[1] - q[0] - q[1] || p[2] - q[2]);
  const sw = o.sw || 1.8, ed = o.edge || TM_C.line;
  /* a unit cube is VIOLET on every face (the chapter's unit colour); the wood look only where o.wood asks for it */
  const F = o.wood ? [TM_C.woodL, TM_C.wood, TM_C.woodD] : TM_VIO;
  for (const [i, j, k] of cs) {
    const x = x0 + (i - j + Wd - 1) * a, y = y0 + (i + j) * b + (H - 1 - k) * 2 * b;
    const P = (px: number, py: number) => (x + px).toFixed(1) + "," + (y + py).toFixed(1);
    els.push(
      <g key={(o.key || "c") + i + "." + j + "." + k}>
        <polygon points={[P(a, 0), P(2 * a, b), P(a, 2 * b), P(0, b)].join(" ")} fill={o.top || F[0]} />
        <polygon points={[P(0, b), P(a, 2 * b), P(a, 4 * b), P(0, 3 * b)].join(" ")} fill={o.left || F[1]} />
        <polygon points={[P(a, 2 * b), P(2 * a, b), P(2 * a, 3 * b), P(a, 4 * b)].join(" ")} fill={o.right || F[2]} />
        {skin && <Skin name="cube" x={x} y={y} w={2 * a} h={4 * b} fit="stretch" />}
        {skin && !o.wood && !o.top && <g pointerEvents="none">
          <polygon points={[P(a, 0), P(2 * a, b), P(a, 2 * b), P(0, b)].join(" ")} fill={F[0]} fillOpacity={0.85} />
          <polygon points={[P(0, b), P(a, 2 * b), P(a, 4 * b), P(0, 3 * b)].join(" ")} fill={F[1]} fillOpacity={0.85} />
          <polygon points={[P(a, 2 * b), P(2 * a, b), P(2 * a, 3 * b), P(a, 4 * b)].join(" ")} fill={F[2]} fillOpacity={0.85} />
        </g>}
        <polygon points={[P(a, 0), P(2 * a, b), P(2 * a, 3 * b), P(a, 4 * b), P(0, 3 * b), P(0, b)].join(" ")} fill="none" stroke={o.lit || ed} strokeWidth={o.lit ? 3.5 : sw} strokeLinejoin="round" strokeLinecap="round" />
        <path d={"M " + P(0, b) + " L " + P(a, 2 * b) + " L " + P(2 * a, b) + " M " + P(a, 2 * b) + " L " + P(a, 4 * b)} fill="none" stroke={ed} strokeWidth={sw * 0.85} strokeLinecap="round" strokeLinejoin="round" />
      </g>,
    );
  }
  return { els, w: (L + Wd) * a, h: (L + Wd) * b + 2 * b * H };
}
/* the biggest cube size b that fits a cuboid in a w x h box */
const tmFitB = (L: number, Wd: number, H: number, w: number, h: number, cap: number) => Math.min(cap, w / ((L + Wd) * 1.767), h / (L + Wd + 2 * H));
/* a cuboid's every shape, once: whole numbers l >= w >= h that multiply to n */
const tmShapes = (n: number) => { const r: number[][] = []; for (let h = 1; h <= n; h++) for (let w = h; w <= n; w++) if (n % (w * h) === 0 && n / (w * h) >= w) r.push([n / (w * h), w, h]); return r; };
const tmSk = (d: number[]) => d.slice().sort((x, y) => x - y).join("x");
/* the cuboid in the tray: wide w, high h, as long as the cubes allow; turned t times (a turn stands it on another face) */
const tmTray = (S: any) => { const L = Math.floor(S.cubes / (S.w * S.h)), left = S.cubes - L * S.w * S.h, d = [L, S.w, S.h];
  const r = S.t === 1 ? [d[1], d[2], d[0]] : S.t === 2 ? [d[2], d[0], d[1]] : d; return { L, left, d: r, ok: L >= 1 && left === 0 }; };

/* the jars: interior, levels */
/* each jar carries its own box (two equal jars side by side, or one big jar) */
const tmIn = (J: any) => tmGlass(J.x, J.y, J.w, J.h);
function tmLevel(S: any, j: number) {
  const J = S.jars[j];
  if (!J.obj) return S.L0;
  const o = TM_OBJ[J.obj], st = S.objs[J.obj];
  return S.L0 + (o.float != null && !st.under ? o.float : (S.vol && S.vol[J.obj]) || o.vol);
}
const tmMarked = (S: any, j: number) => { const m = S.jars[j].marks; return m.length > 0 && m[m.length - 1] === tmLevel(S, j); };
function tmJarsInit(S: any) {
  const objs: any = {};
  (S.mat || []).forEach((id: string) => (objs[id] = { where: "mat", under: false }));
  if (S.inJar) { objs[S.inJar] = { where: 0, under: false }; S.jars[0].obj = S.inJar; }
  const R = { ...S, objs };
  R.lv = R.jars.map((_: any, j: number) => tmLevel(R, j));
  return R;
}
/* a fresh board for one entry into a question (or the warm-up, or free play) */
function tmFresh(n: number, it: any, warm: boolean, free: boolean, bk: string) {
  const J = (xs: number[]) => xs.map((x) => (xs.length > 1 ? { x, y: 80, w: 200, h: 360 } : { x: 140, y: 40, w: 250, h: 420 })).map((g) => ({ ...g, obj: null, marks: [] as number[] }));
  const base: any = { bk, carry: null };
  if (free) return tmJarsInit({ ...base, L0: 120, jars: J([40, 300]), mat: ["key", "stone", "cork", "ball"], stick: true, free: true });
  if (n === 1) {
    const ids = warm ? ["ribbon"] : it && it.kind === "sort" ? ["fence", "grass", "water"] : [it ? it.card : "box"];
    const cards: any = {};
    ids.forEach((id: string) => (cards[id] = { bin: null, unit: null }));
    return { ...base, ids, cards, tiles: warm || (it && it.kind === "sort") };
  }
  if (n === 2) {
    if (warm) return { ...base, cubes: 6, w: 1, h: 1, t: 0, shelf: [] };
    if (it && it.kind === "turn") return { ...base, cubes: 10, w: 2, h: 1, t: 0, shelf: [{ d: [5, 2, 1], sk: tmSk([5, 2, 1]), twin: false }], turnOnly: true };
    return { ...base, cubes: it ? it.cubes : 18, w: 1, h: 1, t: 0, shelf: [] };
  }
  let S: any;
  if (n === 3) {
    if (warm || !it) S = { jars: J([150]), mat: ["cube"] };
    else if (it.kind === "calc") S = { jars: J([150]), mat: ["stone"], calc: true, vol: { stone: it.rise * TM_CM }, L0: 4 * TM_CM };
    else S = { jars: J([40, 300]), mat: it.objs.slice() };
  } else S = { jars: J([150]), mat: [], inJar: warm || !it ? "apple" : it.obj, stick: !(it && it.kind === "ballmark") };
  return tmJarsInit({ ...base, L0: 120, ...S });
}
/* how many acts this question still needs before its answer key opens (the answer gate) */
function tmLeft(it: any, S: any) {
  if (!it || !S) return 0;
  switch (it.kind) {
    case "sort": return ["fence", "grass", "water"].reduce((a, id) => a + (S.cards[id] && S.cards[id].bin ? 0 : 1) + (S.cards[id] && S.cards[id].unit ? 0 : 1), 0);
    case "pick": return S.cards[it.card] && S.cards[it.card].bin ? 0 : 1;
    case "count": return S.shelf.length ? 0 : 1;
    case "turn": return S.turned ? 0 : 1;   /* latched: a 3rd Turn back to the start never re-locks */
    case "jars2": case "calc": return S.jars.reduce((a: number, Jr: any, j: number) => a + (Jr.obj ? 0 : 1) + (tmMarked(S, j) ? 0 : 1), 0);
    case "cork": return (S.jars[0].marks.length ? 0 : 1) + (S.objs.cork.under ? 0 : 1) + (S.jars[0].marks.length >= 2 && tmMarked(S, 0) ? 0 : 1);
    case "ballpush": return S.objs.ball.under ? 0 : 1;
    case "ballmark": return S.jars[0].marks.length ? 0 : 1;
  }
  return 0;
}
/* the sorted board as an answer: card=bin,unit for the fence, the grass and the water */
const tmValue = (S: any) => ["fence", "grass", "water"].map((id) => id + "=" + ((S.cards[id] && S.cards[id].bin) || "") + "," + ((S.cards[id] && S.cards[id].unit) || "")).join(";");
const tmSortFrom = (v: string) => { const cards: any = {};
  ["fence", "grass", "water"].forEach((id) => { const m = new RegExp(id + "=(\\w*),(\\w*)").exec(v) || []; cards[id] = { bin: m[1] || null, unit: m[2] || null }; }); return { cards }; };

/* a measure card: its picture (drawn in code) and its name; lit = the traceback's amber look at its boundary, surface or space */
function tmCardArt(id: string, x: number, y: number, w: number, h: number, tx: any, lit = false, bare = false) {
  const lab = Math.max(28, Math.round(h * 0.24)), px = x + 10, py = y + 8, pw = w - 20, ph = Math.max(20, h - lab - 20);
  const grid = (fill: string) => {
    const nx = 5, ny = Math.max(2, Math.round((ph / pw) * nx)), cw = pw / nx, chh = ph / ny, out: any[] = [];
    for (let r = 0; r < ny; r++) for (let c = 0; c < nx; c++) out.push(<rect key={r + "-" + c} x={px + c * cw} y={py + r * chh} width={cw} height={chh} fill={fill} fillOpacity={0.55} stroke={TM_C.line} strokeWidth={1.8} />);
    return out;
  };
  let art: any = null;
  if (id === "fence" || id === "grass") {
    const g = id === "grass";
    const posts = [0, 0.25, 0.5, 0.75, 1].flatMap((f) => [[px + 4 + f * (pw - 8), py + 4], [px + 4 + f * (pw - 8), py + ph - 4]]);
    art = (
      <g>
        <rect x={px} y={py} width={pw} height={ph} rx={8} fill={g ? "#85C978" : "#EBF5E0"} stroke={TM_C.line} strokeWidth={1.8} />
        {g && [0.15, 0.35, 0.55, 0.75].map((f) => <path key={f} d={`M ${px + pw * f} ${py + ph * 0.72} l 5 -12 l 5 12`} stroke="#2E6627" strokeWidth={2.6} fill="none" strokeLinecap="round" />)}
        {g && lit && grid(TM_C.amber)}
        <rect x={px + 4} y={py + 4} width={pw - 8} height={ph - 8} fill="none" stroke={!g && lit ? TM_C.verm : "#8B5A2B"} strokeWidth={g ? 2.6 : lit ? 7 : 5} strokeDasharray={g ? "7 6" : undefined} />
        {!g && posts.map(([qx, qy], k) => <rect key={k} x={qx - 4} y={qy - 4} width={8} height={8} fill="#5C3B18" rx={1} stroke={TM_C.line} strokeWidth={1} />)}
      </g>
    );
  } else if (id === "water") {
    const tx0 = px + pw * 0.2, tw = pw * 0.6;
    art = (
      <g>
        <rect x={tx0} y={py + 2} width={tw} height={ph - 4} rx={8} fill="#E8F4FA" stroke={TM_C.line} strokeWidth={2.4} />
        <rect x={tx0 + 3} y={py + ph * 0.32} width={tw - 6} height={ph * 0.68 - 5} rx={5} fill="url(#tm-grad-water)" />
        <path d={`M ${tx0 + 3} ${py + ph * 0.32} q ${tw * 0.25} -4 ${tw * 0.5} 0 t ${tw * 0.5} 0`} stroke="#FFFFFF" strokeWidth={2} fill="none" opacity={0.8} />
        {lit && (() => { const fw = tw - 8, fh = ph * 0.66, b = tmFitB(2, 2, 3, fw, fh, 14), q = tmIso(2, 2, 3, 0, 0, b, false, { key: "lt", top: "#FBE3A6", left: "#F2C25C", right: "#D9A030", sw: 1.4 }); return <g transform={`translate(${tx0 + 4 + (fw - q.w) / 2},${py + ph - 5 - q.h})`}>{q.els}</g>; })()}
        <rect x={tx0 + tw} y={py + ph - 14} width={10} height={8} fill="#555555" rx={1} />
      </g>
    );
  } else if (id === "box") {
    art = (
      <g>
        <polygon points={`${px + pw * 0.2},${py + ph * 0.3} ${px + pw * 0.8},${py + ph * 0.3} ${px + pw * 0.8},${py + ph - 6} ${px + pw * 0.2},${py + ph - 6}`} fill="#DFB070" stroke={TM_C.line} strokeWidth={2.4} />
        <polygon points={`${px + pw * 0.2},${py + ph * 0.3} ${px + pw * 0.05},${py + 2} ${px + pw * 0.4},${py + 2} ${px + pw * 0.5},${py + ph * 0.3}`} fill="#C99753" stroke={TM_C.line} strokeWidth={2} />
        <polygon points={`${px + pw * 0.5},${py + ph * 0.3} ${px + pw * 0.6},${py + 2} ${px + pw * 0.95},${py + 2} ${px + pw * 0.8},${py + ph * 0.3}`} fill="#B88542" stroke={TM_C.line} strokeWidth={2} />
        {lit && (() => { const fw = pw * 0.6, fh = ph * 0.7, b = tmFitB(3, 2, 2, fw, fh, 14), q = tmIso(3, 2, 2, 0, 0, b, false, { key: "lc", top: "#FBE3A6", left: "#F2C25C", right: "#D9A030", sw: 1.4 }); return <g transform={`translate(${px + pw * 0.2 + (fw - q.w) / 2},${py + ph - 6 - q.h})`}>{q.els}</g>; })()}
      </g>
    );
  } else {
    art = <path d={`M ${px + 6} ${py + ph * 0.6} q ${pw * 0.2} ${-ph * 0.6} ${pw * 0.4} 0 t ${pw * 0.4} 0`} fill="none" stroke="#2B8579" strokeWidth={12} strokeLinecap="round" />;
  }
  return (
    <g filter="url(#tm-shadow)">
      <rect x={x} y={y} width={w} height={h} rx={14} fill="url(#tm-grad-card)" stroke={TM_C.line} strokeWidth={2.6} />
      {art}
      {!bare && (
        <g pointerEvents="none">
          <text stroke="#FFFFFF" strokeWidth={4} strokeLinejoin="round" paintOrder="stroke" x={x + w / 2} y={y + h - 10} textAnchor="middle" fontSize={lab} fontWeight={700} fill={TM_C.line}>{tx(TM_CARDS[id].label)}</text>
        </g>
      )}
    </g>
  );
}
/* a unit tile (violet: the unit) */
function tmTile(id: string, x: number, y: number, w: number, h: number, tx: any, tone = TM_C.violet, fs?: number) {
  const t = TM_TILES.find((q) => q.id === id) || TM_TILES[0];
  return (
    <g filter="url(#tm-shadow)">
      <rect x={x} y={y} width={w} height={h} rx={12} fill={TM_C.white} stroke={tone} strokeWidth={3.8} />
      <rect x={x + 3} y={y + 3} width={w - 6} height={h / 2 - 3} rx={9} fill={tone} fillOpacity={0.08} pointerEvents="none" />
      <text x={x + w / 2} y={y + h / 2 + 11} textAnchor="middle" fontSize={fs || (h >= 60 ? T.label : T.micro)} fontWeight={700} fill={shade(tone, 0.25)}>{tx(t.label)}</text>
    </g>
  );
}
/* an object the child lowers into the water, centred on cx, cy */
function tmObjArt(id: string, cx: number, cy: number, s = 1) {
  if (id === "key") return (
    <g transform={`translate(${cx},${cy}) scale(${s})`} filter="url(#tm-shadow)">
      <circle cx={-54} cy={0} r={24} fill="url(#tm-grad-gold)" stroke={TM_C.line} strokeWidth={2.6} />
      <circle cx={-54} cy={0} r={9} fill={TM_C.white} stroke={TM_C.line} strokeWidth={2} />
      <rect x={-32} y={-6} width={100} height={12} rx={4} fill="url(#tm-grad-gold)" stroke={TM_C.line} strokeWidth={2.4} />
      <path d="M 42 6 v 16 h 8 v -8 h 8 v 10 h 8 v -18" fill="url(#tm-grad-gold)" stroke={TM_C.line} strokeWidth={2.4} strokeLinejoin="round" />
    </g>);
  if (id === "stone") return (
    <g filter="url(#tm-shadow)">
      <path d={TM_PEBBLE.map((q, k) => (k ? "L " : "M ") + (cx + q[0] * s).toFixed(1) + " " + (cy + q[1] * s).toFixed(1)).join(" ") + " Z"} fill="#8C8174" stroke={TM_C.line} strokeWidth={3} strokeLinejoin="round" />
      <ellipse cx={cx - 14 * s} cy={cy - 14 * s} rx={22 * s} ry={9 * s} fill="#B3A897" />
      {[[-26, 8], [-6, 16], [14, -4], [30, 12], [8, 24], [-34, -6], [22, -18]].map(([dx, dy], k) => <circle key={k} cx={cx + dx * s} cy={cy + dy * s} r={2.6 * s} fill="#4E453B" />)}
    </g>);
  if (id === "cube") { const b = 22 * s, r = tmIso(1, 1, 1, cx - 1.767 * b, cy - 2 * b, b, true, { key: "oc", wood: true }); return <g filter="url(#tm-shadow)">{r.els}</g>; }
  if (id === "marble") return (
    <g filter="url(#tm-shadow)">
      <circle cx={cx} cy={cy} r={22 * s} fill="url(#tm-grad-marble)" stroke={TM_C.line} strokeWidth={2.4} />
      <ellipse cx={cx - 7 * s} cy={cy - 8 * s} rx={7 * s} ry={4 * s} fill="#FFFFFF" fillOpacity={0.85} />
    </g>);
  if (id === "lemon") return (
    <g filter="url(#tm-shadow)">
      <ellipse cx={cx} cy={cy} rx={42 * s} ry={31 * s} fill="url(#tm-grad-lemon)" stroke={TM_C.line} strokeWidth={2.4} />
      <ellipse cx={cx + 40 * s} cy={cy} rx={6 * s} ry={5 * s} fill="#E0BC1E" stroke={TM_C.line} strokeWidth={2} />
      <ellipse cx={cx - 12 * s} cy={cy - 10 * s} rx={14 * s} ry={6 * s} fill="#FFFFFF" fillOpacity={0.4} />
    </g>);
  if (id === "cork") return (
    <g filter="url(#tm-shadow)">
      <path d={`M ${cx - 28 * s} ${cy - 30 * s} V ${cy + 30 * s} A ${28 * s} ${8 * s} 0 0 0 ${cx + 28 * s} ${cy + 30 * s} V ${cy - 30 * s}`} fill="#C9935A" stroke={TM_C.line} strokeWidth={2.4} />
      <ellipse cx={cx} cy={cy - 30 * s} rx={28 * s} ry={8 * s} fill="#E2B17B" stroke={TM_C.line} strokeWidth={2.4} />
      {[[-10, -14], [8, 2], [-6, 18], [12, -22]].map(([dx, dy], k) => <circle key={k} cx={cx + dx * s} cy={cy + dy * s} r={3 * s} fill="#8C5C2C" />)}
      <path d={`M ${cx - 22 * s} ${cy - 28 * s} h ${44 * s}`} stroke="#E2B17B" strokeWidth={3 * s} strokeLinecap="round" opacity={0.6} />
    </g>);
  if (id === "ball") return (
    <g filter="url(#tm-shadow)">
      <circle cx={cx} cy={cy} r={42 * s} fill="url(#tm-grad-ball)" stroke={TM_C.line} strokeWidth={2.6} />
      <path d={`M ${cx - 42 * s} ${cy} q ${42 * s} ${-26 * s} ${84 * s} 0`} fill="none" stroke="#FFFFFF" strokeWidth={5.5 * s} strokeLinecap="round" />
      <ellipse cx={cx - 14 * s} cy={cy - 16 * s} rx={12 * s} ry={6 * s} fill="#FFFFFF" fillOpacity={0.35} />
    </g>);
  return (
    <g filter="url(#tm-shadow)">
      <circle cx={cx} cy={cy + 2 * s} r={35 * s} fill="url(#tm-grad-apple)" stroke={TM_C.line} strokeWidth={2.6} />
      <path d={`M ${cx} ${cy - 30 * s} q ${4 * s} ${-12 * s} ${10 * s} ${-14 * s}`} stroke="#5C3B18" strokeWidth={4 * s} fill="none" strokeLinecap="round" />
      <ellipse cx={cx + 16 * s} cy={cy - 40 * s} rx={10 * s} ry={5 * s} fill="#4F9A2E" stroke={TM_C.line} strokeWidth={1.5} />
      <ellipse cx={cx - 10 * s} cy={cy - 12 * s} rx={10 * s} ry={5 * s} fill="#FFFFFF" fillOpacity={0.35} />
    </g>);
}
/* a CLEAR glass jar (the brief: equal clear jars): back, then the caller's water and objects, then the front gloss */
const tmGlass = (x: number, y: number, w: number, h: number) => ({ ix: x + 12, iw: w - 24, it: y + 26, ib: y + h - 10, rx: 18 });
function tmJarBack(x: number, y: number, w: number, h: number) {
  return (
    <g>
      <rect x={x} y={y + 12} width={w} height={h - 12} rx={24} fill="#F2F9FC" stroke="#5F8FA3" strokeWidth={3.2} />
      <rect x={x + 8} y={y} width={w - 16} height={22} rx={7} fill="#E1EFF5" stroke="#5F8FA3" strokeWidth={2.6} />
    </g>);
}
function tmJarFront(x: number, y: number, w: number, h: number) {
  return (
    <g pointerEvents="none">
      <path d={`M ${x + 14} ${y + 40} v ${h - 76}`} stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" opacity={0.7} />
      <path d={`M ${x + 26} ${y + 46} v ${h - 100}`} stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" opacity={0.5} />
    </g>);
}
/* clear water inside the glass's own inner shape, a soft lighter top */
function tmWater(id: string, x: number, y: number, w: number, h: number, wt: number, op = 0.55) {
  const g = tmGlass(x, y, w, h);
  return (
    <g pointerEvents="none">
      <defs><clipPath id={id}><rect x={g.ix} y={g.it} width={g.iw} height={g.ib - g.it} rx={g.rx} /></clipPath></defs>
      <g clipPath={`url(#${id})`}>
        <rect x={g.ix} y={wt} width={g.iw} height={g.ib - wt + 2} fill="#6FB9E6" fillOpacity={op} />
        <rect x={g.ix} y={wt} width={g.iw} height={10} fill="#BFE4F8" fillOpacity={op} />
        <line x1={g.ix} y1={wt} x2={g.ix + g.iw} y2={wt} stroke="#FFFFFF" strokeWidth={3} strokeOpacity={0.9} />
      </g>
    </g>);
}

/* the paints the pictures use: drawn wherever a picture is (the working area, the start page, the summary thumbnails),
   so no url(#tm-...) ever points at nothing */
function tmDefs() {
  return (
    <defs>
      <filter id="tm-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2B2B2B" floodOpacity="0.12" />
      </filter>
      <linearGradient id="tm-grad-card" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FFF9EE" />
      </linearGradient>
      <linearGradient id="tm-grad-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#64C8FF" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#257DBE" stopOpacity="0.85" />
      </linearGradient>
      <linearGradient id="tm-grad-bin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FAF2E6" />
        <stop offset="100%" stopColor="#EAD8BE" />
      </linearGradient>
      <linearGradient id="tm-grad-shelf" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B98A4A" />
        <stop offset="50%" stopColor="#8C5C2C" />
        <stop offset="100%" stopColor="#5C3B18" />
      </linearGradient>
      <linearGradient id="tm-grad-stick" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#E4C390" />
        <stop offset="50%" stopColor="#C9A06A" />
        <stop offset="100%" stopColor="#966F3B" />
      </linearGradient>
      <linearGradient id="tm-grad-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F5D061" />
        <stop offset="100%" stopColor="#C79624" />
      </linearGradient>
      <radialGradient id="tm-grad-marble" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#9BD4FF" />
        <stop offset="60%" stopColor="#418FD6" />
        <stop offset="100%" stopColor="#1C5389" />
      </radialGradient>
      <radialGradient id="tm-grad-lemon" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#FFF275" />
        <stop offset="70%" stopColor="#E6C619" />
        <stop offset="100%" stopColor="#B89B0B" />
      </radialGradient>
      <radialGradient id="tm-grad-ball" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFA64D" />
        <stop offset="75%" stopColor="#E06A10" />
        <stop offset="100%" stopColor="#993E00" />
      </radialGradient>
      <radialGradient id="tm-grad-apple" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#9EE659" />
        <stop offset="70%" stopColor="#67B823" />
        <stop offset="100%" stopColor="#3C7A0E" />
      </radialGradient>
    </defs>
  );
}

/* THE START PAGE: a fence (a length), a square of grass in unit squares (a surface), a stack of unit cubes (a space) and a
   jar with a stone (water makes room) */
const START_HOOK = "How can water show the space a stone takes up?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  /* four pictures evenly spaced (68 apart), every bottom on y 268; the four labels on ONE baseline 62 below it, so the
     longest Hindi/Gujarati label keeps 16+ of clear paper above its ink */
  const BASE = 330, BOT = 268, cb = 24, cubH = (3 + 2) * cb + 2 * cb * 2;
  const lab = (x: number, s: string) => (
    <text x={x} y={BASE} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} pointerEvents="none">{tx(s)}</text>
  );
  const cub = tmIso(3, 2, 2, 692, BOT - cubH, cb, true, { key: "sa" });
  const jx = 972, jy = 18, jw = 160, jh = BOT - 18, g = tmGlass(jx, jy, jw, jh);
  return (
    <g>
      {tmDefs()}
      <line x1={68} y1={168} x2={348} y2={168} stroke="#8B5A2B" strokeWidth={9} strokeLinecap="round" />
      <line x1={68} y1={218} x2={348} y2={218} stroke="#8B5A2B" strokeWidth={9} strokeLinecap="round" />
      {[80, 170, 260, 336].map((x) => <rect key={x} x={x - 10} y={138} width={20} height={BOT - 138} rx={4} fill="#A9713C" stroke={TM_C.line} strokeWidth={2} />)}
      {lab(208, "Length")}
      {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => <rect key={r + "-" + c} x={416 + c * 52} y={BOT - 208 + r * 52} width={52} height={52} fill="#8CCB7E" stroke={TM_C.line} strokeWidth={2.4} />))}
      {lab(520, "Surface")}
      {cub.els}
      {lab(692 + cub.w / 2, "Space")}
      {tmJarBack(jx, jy, jw, jh)}
      {tmWater("tm-js", jx, jy, jw, jh, g.ib - 116, 0.5)}
      {tmObjArt("stone", jx + jw / 2, g.ib - 32, 0.72)}
      {tmJarFront(jx, jy, jw, jh)}
      {lab(jx + jw / 2, "Water")}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final. */
const TR: any = {
  hi: {
    "Three Measures": "तीन माप",
    "Free play. Lower anything into a jar, push it under and mark the level.": "खुला खेल। कुछ भी जार में डालो, नीचे दबाओ और स्तर पर निशान लगाओ।",
    "How can water show the space a stone takes up?": "पानी कैसे दिखाए कि पत्थर कितनी जगह घेरता है?",
    "Which measure, which unit": "कौन-सा माप, कौन-सी इकाई",
    "Drag the ribbon card into the bin for a length.": "रिबन वाला कार्ड लंबाई वाले डिब्बे में खींचो।",
    "The ribbon card waits at the top.": "रिबन वाला कार्ड ऊपर रखा है।",
    "Now drag the cm tile onto the ribbon card.": "अब cm वाली टाइल रिबन के कार्ड पर खींचो।",
    "The unit tiles lie along the bottom.": "इकाई की टाइलें नीचे रखी हैं।",
    "Drop each card into the bin that answers that question.": "हर कार्ड को उस डिब्बे में डालो जो उसका उत्तर है।",
    "Then give each card a tile whose unit is a line, a square or a cube.": "फिर हर कार्ड को रेखा, वर्ग या घन वाली इकाई की टाइल दो।",
    "A perimeter is a length, an area is a surface and a volume is a space.": "परिमाप लंबाई है, क्षेत्रफल सतह है और आयतन जगह है।",
    "You learned: a length, a surface and a space each have their own unit.": "तुमने सीखा: लंबाई, सतह और जगह की अपनी-अपनी इकाई है।",
    "Sort the fence, the grass and the tank water, and give each its unit.": "बाड़, घास और टंकी के पानी को छाँटो और हर एक को उसकी इकाई दो।",
    "Bin and unit for each?": "हर एक का डिब्बा और इकाई?",
    "For each card, ask: is it a line round the edge, a cover or a filling?": "हर कार्ड के लिए पूछो: किनारे की रेखा, ढकना या भरना?",
    "Is a box's space in centimetres, square centimetres or cubic centimetres?": "डिब्बे के अंदर की जगह: सेंटीमीटर, वर्ग सेंटीमीटर या घन सेंटीमीटर?",
    "Unit for the space?": "जगह की इकाई?",
    "Look at the bin your box card is in: what fills the inside of a box?": "तुम्हारा कार्ड जिस डिब्बे में है उसे देखो: डिब्बा किससे भरता है?",
    "Picture filling the box: with lines, with flat squares or with small cubes?": "डिब्बा भरने की सोचो: रेखाओं से, चपटे वर्गों से या छोटे घनों से?",
    "Read each key and find the one named after what fills a box.": "हर बटन पढ़ो और वह ढूँढो जो डिब्बा भरने वाली चीज़ का नाम है।",
    "cu. cm": "घन सेमी",
    "cm": "सेमी",
    "sq. cm": "वर्ग सेमी",
    "m": "मी",
    "sq. m": "वर्ग मी",
    "cu. m": "घन मी",
    "Is the grass inside a fence a perimeter, an area or a volume?": "बाड़ के अंदर की घास परिमाप है, क्षेत्रफल है या आयतन?",
    "Grass: which measure?": "घास: कौन-सा माप?",
    "Look again at the grass card: is it the edge, the ground or a space?": "घास का कार्ड फिर देखो: किनारा, ज़मीन या जगह?",
    "Trace round the field, then across the grass: which one is the grass?": "खेत के चारों ओर, फिर घास पर उँगली फेरो: घास कौन-सी है?",
    "Look along the keys for the measure of a covered surface.": "बटनों में ढकी हुई सतह का माप ढूँढो।",
    "Perimeter": "परिमाप",
    "Area": "क्षेत्रफल",
    "Volume": "आयतन",
    "The same cuboid, turned": "वही घनाभ, घुमाया हुआ",
    "Tap Shelf to set this row of cubes on the shelf.": "घनों की इस पंक्ति को खाने पर रखने के लिए खाना दबाओ।",
    "Shelf is on the right of Turn.": "खाना, घुमाओ के दाईं ओर है।",
    "Tap Wide to lay the cubes two wide.": "घनों को दो चौड़ा रखने के लिए चौड़ाई दबाओ।",
    "Wide is the top left key.": "चौड़ाई ऊपर बाईं ओर का बटन है।",
    "Tap Shelf again to keep this new cuboid.": "इस नए घनाभ को रखने के लिए फिर खाना दबाओ।",
    "The Shelf key sits next to Turn.": "खाना बटन घुमाओ के बगल में है।",
    "Tap Turn to stand the cuboid on another face.": "घनाभ को दूसरे फलक पर खड़ा करने के लिए घुमाओ दबाओ।",
    "Turn is the bottom left key.": "घुमाओ नीचे बाईं ओर का बटन है।",
    "Tap Shelf to set the turned cuboid on the shelf.": "घुमाए हुए घनाभ को खाने पर रखने के लिए खाना दबाओ।",
    "Shelf is the bottom right key.": "खाना नीचे दाईं ओर का बटन है।",
    "Tap Wide and High in turn, and shelve every shape that uses all the cubes.": "चौड़ाई और ऊँचाई बारी-बारी दबाओ और सब घन वाला हर आकार खाने पर रखो।",
    "Now count the places on the shelf, not the copies stacked on them.": "अब खाने की जगहें गिनो, उन पर रखी नकलें नहीं।",
    "Each cuboid is counted once because a turned cuboid is the same cuboid.": "हर घनाभ एक बार गिना जाता है, क्योंकि घुमाया घनाभ वही है।",
    "You learned: a turned cuboid is the same cuboid, so count it once.": "तुमने सीखा: घुमाया घनाभ वही है, उसे एक बार गिनो।",
    "How many different cuboids can you make with 18 unit cubes?": "18 इकाई घनों से कितने अलग घनाभ बन सकते हैं?",
    "Different cuboids?": "अलग घनाभ?",
    "Look at your shelf: did a turned copy slide onto a cuboid already there?": "खाना देखो: क्या घुमाई नकल अपने जोड़ीदार पर खिसकी?",
    "Is a cuboid 5 long, 2 wide and 1 high a new cuboid when it is stood on its end?": "5 लंबा, 2 चौड़ा, 1 ऊँचा घनाभ सिरे पर खड़ा हो तो क्या नया घनाभ है?",
    "New cuboid?": "नया घनाभ?",
    "Count the cubes before the turn and after it.": "घुमाने से पहले और बाद में घन गिनो।",
    "Count its long, wide and high edges before and after the turn.": "घुमाने से पहले और बाद में लंबे, चौड़े और ऊँचे किनारे गिनो।",
    "Look at the three numbers before and after the turn.": "घुमाने से पहले और बाद की तीनों गिनती देखो।",
    "The same": "वही है",
    "A new one": "नया है",
    "Using all 8 unit cubes each time, how many different cuboids can you find?": "हर बार सभी 8 घन लेकर कितने अलग घनाभ मिलते हैं?",
    "Cuboids from 8?": "8 से घनाभ?",
    "Count each shape once; a turned copy is not new, and a cube counts too.": "हर आकार एक बार गिनो; घुमाई नकल नई नहीं, घन भी गिना जाता है।",
    "Set the keys to 2 wide and 2 high and look at the tray.": "बटन 2 चौड़ा और 2 ऊँचा करो और ट्रे देखो।",
    "Add that cube to the shelf, then count the shelf places.": "उस घन को खाने पर रखो, फिर खाने की जगहें गिनो।",
    "Water makes room": "पानी जगह बनाता है",
    "Tap the wooden cube to lower it into the jar.": "लकड़ी के घन को जार में डालने के लिए उसे दबाओ।",
    "The wooden cube waits beside the jar.": "लकड़ी का घन जार के पास रखा है।",
    "Tap Mark level to draw the new water line.": "पानी की नई रेखा खींचने के लिए निशान लगाओ दबाओ।",
    "Mark level is the long key at the bottom.": "निशान लगाओ नीचे वाला लंबा बटन है।",
    "Put a finger on each start line and slide it up to the new line.": "हर शुरू की रेखा पर उँगली रखकर नई रेखा तक ऊपर ले जाओ।",
    "Compare the two green bands and find the taller one.": "दोनों हरी पट्टियों की तुलना करो और ऊँची वाली ढूँढो।",
    "A solid fully under water raises the water by as much space as it takes up.": "पूरी डूबी ठोस चीज़ पानी को उतना उठाती है जितनी जगह वह घेरती है।",
    "You learned: a solid under water raises it by the space it takes up.": "तुमने सीखा: डूबी ठोस चीज़ अपनी घेरी जगह जितना पानी उठाती है।",
    "Key or stone, both fully under in equal jars: which has the greater volume?": "चाबी या पत्थर, दोनों बराबर जारों में पूरे डूबे: किसका आयतन ज़्यादा है?",
    "Greater volume?": "ज़्यादा आयतन?",
    "See how far the water rose, not how long each thing is.": "देखो पानी कितना चढ़ा, चीज़ कितनी लंबी है यह नहीं।",
    "The key": "चाबी",
    "The stone": "पत्थर",
    "A marble and a lemon held fully under: which has the greater volume?": "कंचा और पूरा डुबोया नींबू: किसका आयतन ज़्यादा है?",
    "Bigger volume?": "बड़ा आयतन?",
    "Read how far each jar's water climbed, not how heavy each one feels.": "हर जार में पानी कितना चढ़ा, यह पढ़ो, भार नहीं।",
    "Which jar's water climbed past more of the glass?": "किस जार का पानी काँच पर ज़्यादा ऊपर चढ़ा?",
    "Now name the object that sits in that jar.": "अब उस जार में रखी चीज़ का नाम बताओ।",
    "The marble": "कंचा",
    "The lemon": "नींबू",
    "Base 20 square centimetres: how many cubic centimetres is the stone?": "तला 20 वर्ग सेंटीमीटर: पत्थर कितने घन सेंटीमीटर का है?",
    "Stone's volume?": "पत्थर का आयतन?",
    "Read how far the water rose on the ruler, then use the whole base.": "पैमाने पर पढ़ो पानी कितना चढ़ा, फिर पूरा तला लो।",
    "Picture the risen water as a slab 3 cm high on a base of 20 square centimetres.": "चढ़े पानी को 20 वर्ग सेंटीमीटर तले पर 3 cm ऊँची पटिया सोचो।",
    "Multiply that rise by the base, 20, to get the cubic centimetres.": "घन सेंटीमीटर पाने के लिए चढ़ाव को तले, 20, से गुणा करो।",
    "Push it fully under": "पूरा नीचे दबाओ",
    "Drag the Push stick onto the apple to hold it fully under.": "सेब को पूरा डुबोने के लिए डंडी उस पर खींचो।",
    "The Push stick stands beside the jar.": "डंडी जार के पास खड़ी है।",
    "Tap Mark level to draw the water line now.": "अब पानी की रेखा के लिए निशान लगाओ दबाओ।",
    "Mark level is the key at the bottom right.": "निशान लगाओ दाईं ओर नीचे का बटन है।",
    "Check how far the water rose at each mark.": "हर निशान पर देखो, पानी कितना चढ़ा।",
    "Compare the rise with the cork floating and with it held under.": "तैरती डाट और डुबोई डाट वाले चढ़ाव की तुलना करो।",
    "A floater is pushed fully under before the rise is read.": "चढ़ाव पढ़ने से पहले तैरने वाली चीज़ पूरी डुबोई जाती है।",
    "You learned: push a floater fully under before you read the rise.": "तुमने सीखा: चढ़ाव पढ़ने से पहले तैरती चीज़ पूरी डुबा दो।",
    "A cork floats in a jar of water, so how can the rise show its volume?": "डाट पानी के जार में तैरती है; चढ़ाव उसका आयतन कैसे दिखाए?",
    "Show its volume?": "आयतन कैसे दिखे?",
    "Look at both marks: how is the cork sitting in each?": "दोनों निशान देखो: हर बार डाट कैसे बैठी है?",
    "Read it floating": "तैरते हुए पढ़ो",
    "Push it under first": "पहले नीचे दबाओ",
    "Why push a floating ball under before reading?": "पढ़ने से पहले तैरती गेंद नीचे क्यों दबाएँ?",
    "Why push it under?": "नीचे क्यों दबाएँ?",
    "Look at the water level before the push and after it.": "दबाने से पहले और बाद में पानी का स्तर देखो।",
    "Watch the ball's water line before and after the push.": "दबाने से पहले और बाद में गेंद पर पानी की रेखा देखो।",
    "Look at the rise as it floats and after the push.": "तैरते समय और दबाने के बाद का चढ़ाव देखो।",
    "Only part was under": "केवल कुछ भाग डूबा था",
    "All of it was under": "पूरी डूबी हुई थी",
    "A ball floats, not held under; does its small rise show its volume?": "गेंद बिना दबाए तैरती है; क्या छोटा चढ़ाव उसका आयतन दिखाता है?",
    "Shows its volume?": "आयतन दिखाता है?",
    "Read the rise and then look at the floating ball.": "चढ़ाव पढ़ो, फिर तैरती गेंद को देखो।",
    "Look at the line on the ball where the water meets it.": "गेंद पर वह रेखा देखो जहाँ पानी उसे छूता है।",
    "Picture the stick pushing it under: where would the water go?": "सोचो डंडी उसे नीचे दबाए: पानी कहाँ जाएगा?",
    "No": "नहीं",
    "Yes": "हाँ",
    "Yes, the fence is a length, the grass a surface and the water a space.": "हाँ, बाड़ लंबाई है, घास सतह है और पानी जगह है।",
    "Yes, a box holds a space, so it takes cubic centimetres.": "हाँ, डिब्बे में जगह होती है, इसलिए घन सेंटीमीटर।",
    "Yes, grass is an area.": "हाँ, घास क्षेत्रफल है।",
    "Yes, 18 cubes make 4 different cuboids.": "हाँ, 18 घनों से 4 अलग घनाभ बनते हैं।",
    "Right, it is the same cuboid, turned.": "सही, यह वही घनाभ है, बस घुमाया हुआ।",
    "Yes, 8 cubes make 3 different cuboids, and one is a cube.": "हाँ, 8 घनों से 3 अलग घनाभ बनते हैं, एक घन है।",
    "Yes, the stone pushed more water up, so it has the greater volume.": "हाँ, पत्थर ने ज़्यादा पानी उठाया, इसलिए उसका आयतन ज़्यादा है।",
    "Yes, the lemon's jar rose more.": "हाँ, नींबू वाले जार का पानी ज़्यादा चढ़ा।",
    "Yes, 3 centimetres times 20 square centimetres is 60 cubic centimetres.": "हाँ, 3 सेंटीमीटर गुणा 20 वर्ग सेंटीमीटर = 60 घन सेंटीमीटर।",
    "Yes, the water rose more once the cork was fully under.": "हाँ, डाट पूरी डूबते ही पानी ज़्यादा चढ़ा।",
    "Yes, only part of the ball was under while it floated.": "हाँ, तैरते समय गेंद का केवल कुछ भाग डूबा था।",
    "Right, that small rise shows only the part under the water.": "सही, वह छोटा चढ़ाव केवल डूबे भाग को दिखाता है।",
    "Put every card into a bin first.": "पहले हर कार्ड को डिब्बे में डालो।",
    "Give every card a unit tile first.": "पहले हर कार्ड को इकाई की टाइल दो।",
    "Drop the card into a bin first.": "पहले कार्ड को डिब्बे में डालो।",
    "Set a cuboid on the shelf first.": "पहले एक घनाभ खाने पर रखो।",
    "Tap Turn to stand the cuboid on its end first.": "पहले घुमाओ दबाकर घनाभ को सिरे पर खड़ा करो।",
    "Lower both objects into the jars first.": "पहले दोनों चीज़ें जारों में डालो।",
    "Mark the level in each jar first.": "पहले हर जार में स्तर पर निशान लगाओ।",
    "Lower the stone into the jar first.": "पहले पत्थर को जार में डालो।",
    "Mark the new water level first.": "पहले पानी के नए स्तर पर निशान लगाओ।",
    "Mark the level while the cork floats first.": "पहले तैरती डाट के साथ स्तर पर निशान लगाओ।",
    "Use the Push stick first.": "पहले डंडी से दबाओ।",
    "Mark the level again with the cork under.": "डाट डूबी रहे, फिर से स्तर पर निशान लगाओ।",
    "Push the ball fully under with the stick first.": "पहले डंडी से गेंद को पूरा डुबा दो।",
    "Mark the level of the floating ball first.": "पहले तैरती गेंद के साथ स्तर पर निशान लगाओ।",
    "Put a card in a bin first.": "पहले एक कार्ड डिब्बे में डालो।",
    "Make the tray full: change Wide or High.": "ट्रे पूरी भरो: चौड़ाई या ऊँचाई बदलो।",
    "Put an object in a jar first.": "पहले कोई चीज़ जार में डालो।",
    "Length": "लंबाई",
    "Surface": "सतह",
    "Space": "जगह",
    "Water": "पानी",
    "Ribbon": "रिबन",
    "Fence": "बाड़",
    "Grass": "घास",
    "Inside a box": "डिब्बे के अंदर",
    "Wide": "चौड़ाई",
    "High": "ऊँचाई",
    "Turn": "घुमाओ",
    "Shelf": "खाना",
    "Long": "लंबाई",
    "Unit cube": "इकाई घन",
    "Left over": "बचे हुए",
    "Same cuboid": "वही घनाभ",
    "4 different cuboids": "4 अलग घनाभ",
    "3 different cuboids": "3 अलग घनाभ",
    "Same cuboid, turned": "वही घनाभ, घुमाया",
    "Greater volume": "ज़्यादा आयतन",
    "Base of the jar": "जार का तला",
    "20 sq. cm": "20 वर्ग सेमी",
    "3 cm": "3 सेमी",
    "Volume 60 cu. cm": "आयतन 60 घन सेमी",
    "Push stick": "डंडी",
    "Mark level": "निशान लगाओ",
    "Floating": "तैरती",
    "Fully under": "पूरी डूबी",
    "Not the whole ball": "पूरी गेंद नहीं",
    "Key": "चाबी",
    "Stone": "पत्थर",
    "Wooden cube": "लकड़ी का घन",
    "Marble": "कंचा",
    "Lemon": "नींबू",
    "Cork": "डाट",
    "Ball": "गेंद",
    "Apple": "सेब",
  },
  gu: {
    "Three Measures": "ત્રણ માપ",
    "Free play. Lower anything into a jar, push it under and mark the level.": "મુક્ત રમત. કંઈ પણ બરણીમાં મૂકો, નીચે દબાવો અને સ્તરે નિશાન કરો.",
    "How can water show the space a stone takes up?": "પથ્થર રોકેલી જગ્યા પાણી કેવી રીતે બતાવે?",
    "Which measure, which unit": "કયું માપ, કયો એકમ",
    "Drag the ribbon card into the bin for a length.": "રિબનનું કાર્ડ લંબાઈના ડબ્બામાં ખેંચો.",
    "The ribbon card waits at the top.": "રિબનનું કાર્ડ ઉપર છે.",
    "Now drag the cm tile onto the ribbon card.": "હવે cm ની ટાઇલ રિબનના કાર્ડ પર ખેંચો.",
    "The unit tiles lie along the bottom.": "એકમની ટાઇલો નીચે પડી છે.",
    "Drop each card into the bin that answers that question.": "દરેક કાર્ડને તેના જવાબવાળા ડબ્બામાં મૂકો.",
    "Then give each card a tile whose unit is a line, a square or a cube.": "પછી દરેક કાર્ડને રેખા, ચોરસ કે ઘનના એકમની ટાઇલ આપો.",
    "A perimeter is a length, an area is a surface and a volume is a space.": "પરિમિતિ લંબાઈ છે, ક્ષેત્રફળ સપાટી છે અને ઘનફળ જગ્યા છે.",
    "You learned: a length, a surface and a space each have their own unit.": "તમે શીખ્યા: લંબાઈ, સપાટી અને જગ્યાના પોતાના એકમ છે.",
    "Sort the fence, the grass and the tank water, and give each its unit.": "વાડ, ઘાસ અને ટાંકીનું પાણી ગોઠવો અને દરેકને તેનો એકમ આપો.",
    "Bin and unit for each?": "દરેકનો ડબ્બો અને એકમ?",
    "For each card, ask: is it a line round the edge, a cover or a filling?": "દરેક કાર્ડ માટે પૂછો: કિનારાની રેખા, ઢાંકણ કે ભરણ?",
    "Is a box's space in centimetres, square centimetres or cubic centimetres?": "ખોખાની અંદરની જગ્યા: સેન્ટિમીટર, ચોરસ સેન્ટિમીટર કે ઘન સેન્ટિમીટર?",
    "Unit for the space?": "જગ્યાનો એકમ?",
    "Look at the bin your box card is in: what fills the inside of a box?": "તમારું કાર્ડ જે ડબ્બામાં છે તે જુઓ: ખોખું શાનાથી ભરાય?",
    "Picture filling the box: with lines, with flat squares or with small cubes?": "ખોખું ભરવાનું વિચારો: રેખાથી, સપાટ ચોરસથી કે નાના ઘનથી?",
    "Read each key and find the one named after what fills a box.": "દરેક બટન વાંચો અને ખોખું ભરનારનું નામ શોધો.",
    "cu. cm": "ઘન સેમી",
    "cm": "સેમી",
    "sq. cm": "ચો. સેમી",
    "m": "મી",
    "sq. m": "ચો. મી",
    "cu. m": "ઘન મી",
    "Is the grass inside a fence a perimeter, an area or a volume?": "વાડની અંદરનું ઘાસ પરિમિતિ છે, ક્ષેત્રફળ છે કે ઘનફળ?",
    "Grass: which measure?": "ઘાસ: કયું માપ?",
    "Look again at the grass card: is it the edge, the ground or a space?": "ઘાસનું કાર્ડ ફરી જુઓ: કિનારો, જમીન કે જગ્યા?",
    "Trace round the field, then across the grass: which one is the grass?": "ખેતરની ફરતે, પછી ઘાસ પર આંગળી ફેરવો: ઘાસ કયું છે?",
    "Look along the keys for the measure of a covered surface.": "બટનોમાં ઢંકાયેલી સપાટીનું માપ શોધો.",
    "Perimeter": "પરિમિતિ",
    "Area": "ક્ષેત્રફળ",
    "Volume": "ઘનફળ",
    "The same cuboid, turned": "એ જ લંબઘન, ફેરવેલો",
    "Tap Shelf to set this row of cubes on the shelf.": "ઘનની આ હાર ખાના પર મૂકવા ખાનું દબાવો.",
    "Shelf is on the right of Turn.": "ખાનું, ફેરવોની જમણી બાજુ છે.",
    "Tap Wide to lay the cubes two wide.": "ઘનને બે પહોળા મૂકવા પહોળાઈ દબાવો.",
    "Wide is the top left key.": "પહોળાઈ ઉપર ડાબી બાજુનું બટન છે.",
    "Tap Shelf again to keep this new cuboid.": "આ નવો લંબઘન રાખવા ફરી ખાનું દબાવો.",
    "The Shelf key sits next to Turn.": "ખાનું બટન ફેરવોની બાજુમાં છે.",
    "Tap Turn to stand the cuboid on another face.": "લંબઘનને બીજી બાજુ પર ઊભો કરવા ફેરવો દબાવો.",
    "Turn is the bottom left key.": "ફેરવો નીચે ડાબી બાજુનું બટન છે.",
    "Tap Shelf to set the turned cuboid on the shelf.": "ફેરવેલો લંબઘન ખાના પર મૂકવા ખાનું દબાવો.",
    "Shelf is the bottom right key.": "ખાનું નીચે જમણી બાજુનું બટન છે.",
    "Tap Wide and High in turn, and shelve every shape that uses all the cubes.": "પહોળાઈ અને ઊંચાઈ વારાફરતી દબાવો, બધા ઘનવાળો દરેક આકાર ખાના પર મૂકો.",
    "Now count the places on the shelf, not the copies stacked on them.": "હવે ખાનાની જગ્યાઓ ગણો, તેના પર મૂકેલી નકલો નહીં.",
    "Each cuboid is counted once because a turned cuboid is the same cuboid.": "દરેક લંબઘન એક જ વાર ગણાય, કારણ કે ફેરવેલો લંબઘન એ જ છે.",
    "You learned: a turned cuboid is the same cuboid, so count it once.": "તમે શીખ્યા: ફેરવેલો લંબઘન એ જ છે, તેને એક વાર ગણો.",
    "How many different cuboids can you make with 18 unit cubes?": "18 એકમ ઘનથી કેટલા જુદા લંબઘન બને?",
    "Different cuboids?": "જુદા લંબઘન?",
    "Look at your shelf: did a turned copy slide onto a cuboid already there?": "ખાનું જુઓ: શું કોઈ ફેરવેલી નકલ પહેલાંના લંબઘન પર સરકી?",
    "Is a cuboid 5 long, 2 wide and 1 high a new cuboid when it is stood on its end?": "5 લાંબો, 2 પહોળો, 1 ઊંચો લંબઘન છેડે ઊભો કરો તો શું નવો છે?",
    "New cuboid?": "નવો લંબઘન?",
    "Count the cubes before the turn and after it.": "ફેરવતાં પહેલાં અને પછી ઘન ગણો.",
    "Count its long, wide and high edges before and after the turn.": "ફેરવતાં પહેલાં અને પછી લાંબી, પહોળી, ઊંચી ધાર ગણો.",
    "Look at the three numbers before and after the turn.": "ફેરવતાં પહેલાં અને પછીની ત્રણેય સંખ્યા જુઓ.",
    "The same": "એ જ છે",
    "A new one": "નવો છે",
    "Using all 8 unit cubes each time, how many different cuboids can you find?": "દર વખતે બધા 8 ઘન લઈને કેટલા જુદા લંબઘન મળે?",
    "Cuboids from 8?": "8 થી લંબઘન?",
    "Count each shape once; a turned copy is not new, and a cube counts too.": "દરેક આકાર એક વાર ગણો; ફેરવેલી નકલ નવી નથી, ઘન પણ ગણાય.",
    "Set the keys to 2 wide and 2 high and look at the tray.": "બટન 2 પહોળા અને 2 ઊંચા કરો અને ટ્રે જુઓ.",
    "Add that cube to the shelf, then count the shelf places.": "એ ઘન ખાના પર મૂકો, પછી ખાનાની જગ્યાઓ ગણો.",
    "Water makes room": "પાણી જગ્યા કરે છે",
    "Tap the wooden cube to lower it into the jar.": "લાકડાના ઘનને બરણીમાં ઉતારવા તેને દબાવો.",
    "The wooden cube waits beside the jar.": "લાકડાનો ઘન બરણી પાસે છે.",
    "Tap Mark level to draw the new water line.": "પાણીની નવી રેખા દોરવા નિશાન કરો દબાવો.",
    "Mark level is the long key at the bottom.": "નિશાન કરો નીચેનું લાંબું બટન છે.",
    "Put a finger on each start line and slide it up to the new line.": "દરેક શરૂની રેખા પર આંગળી મૂકી નવી રેખા સુધી ઉપર લઈ જાઓ.",
    "Compare the two green bands and find the taller one.": "બંને લીલી પટ્ટીઓ સરખાવો અને ઊંચી શોધો.",
    "A solid fully under water raises the water by as much space as it takes up.": "પૂરી ડૂબેલી નક્કર વસ્તુ પોતે રોકે તેટલું પાણી ઉપર લાવે.",
    "You learned: a solid under water raises it by the space it takes up.": "તમે શીખ્યા: ડૂબેલી નક્કર વસ્તુ રોકેલી જગ્યા જેટલું પાણી ચઢાવે.",
    "Key or stone, both fully under in equal jars: which has the greater volume?": "ચાવી કે પથ્થર, બંને સરખી બરણીમાં પૂરા ડૂબેલા: કોનું ઘનફળ વધુ?",
    "Greater volume?": "વધુ ઘનફળ?",
    "See how far the water rose, not how long each thing is.": "જુઓ પાણી કેટલું ચઢ્યું, વસ્તુ કેટલી લાંબી છે તે નહીં.",
    "The key": "ચાવી",
    "The stone": "પથ્થર",
    "A marble and a lemon held fully under: which has the greater volume?": "લખોટી અને પૂરું ડુબાડેલું લીંબુ: કોનું ઘનફળ વધુ?",
    "Bigger volume?": "મોટું ઘનફળ?",
    "Read how far each jar's water climbed, not how heavy each one feels.": "દરેક બરણીમાં પાણી કેટલું ચઢ્યું તે વાંચો, વજન નહીં.",
    "Which jar's water climbed past more of the glass?": "કઈ બરણીનું પાણી કાચ પર વધુ ચઢ્યું?",
    "Now name the object that sits in that jar.": "હવે એ બરણીમાંની વસ્તુનું નામ કહો.",
    "The marble": "લખોટી",
    "The lemon": "લીંબુ",
    "Base 20 square centimetres: how many cubic centimetres is the stone?": "તળિયું 20 ચોરસ સેન્ટિમીટર: પથ્થર કેટલા ઘન સેન્ટિમીટરનો છે?",
    "Stone's volume?": "પથ્થરનું ઘનફળ?",
    "Read how far the water rose on the ruler, then use the whole base.": "માપપટ્ટી પર પાણી કેટલું ચઢ્યું તે વાંચો, પછી આખું તળિયું લો.",
    "Picture the risen water as a slab 3 cm high on a base of 20 square centimetres.": "ચઢેલા પાણીને 20 ચોરસ સેન્ટિમીટર તળિયે 3 cm ઊંચી પાટ માનો.",
    "Multiply that rise by the base, 20, to get the cubic centimetres.": "ઘન સેન્ટિમીટર મેળવવા ચઢાવને તળિયા, 20, થી ગુણો.",
    "Push it fully under": "પૂરું નીચે દબાવો",
    "Drag the Push stick onto the apple to hold it fully under.": "સફરજનને પૂરું ડુબાડવા લાકડી તેના પર ખેંચો.",
    "The Push stick stands beside the jar.": "લાકડી બરણી પાસે ઊભી છે.",
    "Tap Mark level to draw the water line now.": "હવે પાણીની રેખા માટે નિશાન કરો દબાવો.",
    "Mark level is the key at the bottom right.": "નિશાન કરો જમણી બાજુ નીચેનું બટન છે.",
    "Check how far the water rose at each mark.": "દરેક નિશાને જુઓ, પાણી કેટલું ચઢ્યું.",
    "Compare the rise with the cork floating and with it held under.": "તરતા અને ડુબાડેલા બૂચના ચઢાવની સરખામણી કરો.",
    "A floater is pushed fully under before the rise is read.": "ચઢાવ વાંચતાં પહેલાં તરતી વસ્તુ પૂરી ડુબાડાય છે.",
    "You learned: push a floater fully under before you read the rise.": "તમે શીખ્યા: ચઢાવ વાંચતાં પહેલાં તરતી વસ્તુ પૂરી ડુબાડો.",
    "A cork floats in a jar of water, so how can the rise show its volume?": "બૂચ પાણીની બરણીમાં તરે છે; ચઢાવ તેનું ઘનફળ કેવી રીતે બતાવે?",
    "Show its volume?": "ઘનફળ કેવી રીતે દેખાય?",
    "Look at both marks: how is the cork sitting in each?": "બંને નિશાન જુઓ: દરેક વખતે બૂચ કેવી રીતે છે?",
    "Read it floating": "તરતો હોય ત્યારે વાંચો",
    "Push it under first": "પહેલાં નીચે દબાવો",
    "Why push a floating ball under before reading?": "વાંચતાં પહેલાં તરતો દડો નીચે કેમ દબાવવો?",
    "Why push it under?": "નીચે કેમ દબાવવો?",
    "Look at the water level before the push and after it.": "દબાવતાં પહેલાં અને પછી પાણીનું સ્તર જુઓ.",
    "Watch the ball's water line before and after the push.": "દબાવતાં પહેલાં અને પછી દડા પર પાણીની રેખા જુઓ.",
    "Look at the rise as it floats and after the push.": "તરતી વખતે અને દબાવ્યા પછીનો ચઢાવ જુઓ.",
    "Only part was under": "માત્ર થોડો ભાગ ડૂબ્યો હતો",
    "All of it was under": "આખો ડૂબેલો હતો",
    "A ball floats, not held under; does its small rise show its volume?": "દડો દબાવ્યા વિના તરે છે; શું નાનો ચઢાવ તેનું ઘનફળ બતાવે?",
    "Shows its volume?": "ઘનફળ બતાવે?",
    "Read the rise and then look at the floating ball.": "ચઢાવ વાંચો, પછી તરતા દડાને જુઓ.",
    "Look at the line on the ball where the water meets it.": "દડા પર એ રેખા જુઓ જ્યાં પાણી તેને અડે છે.",
    "Picture the stick pushing it under: where would the water go?": "વિચારો લાકડી તેને નીચે દબાવે: પાણી ક્યાં જશે?",
    "No": "ના",
    "Yes": "હા",
    "Yes, the fence is a length, the grass a surface and the water a space.": "હા, વાડ લંબાઈ છે, ઘાસ સપાટી છે અને પાણી જગ્યા છે.",
    "Yes, a box holds a space, so it takes cubic centimetres.": "હા, ખોખામાં જગ્યા છે, તેથી ઘન સેન્ટિમીટર.",
    "Yes, grass is an area.": "હા, ઘાસ ક્ષેત્રફળ છે.",
    "Yes, 18 cubes make 4 different cuboids.": "હા, 18 ઘનથી 4 જુદા લંબઘન બને.",
    "Right, it is the same cuboid, turned.": "સાચું, એ જ લંબઘન છે, માત્ર ફેરવેલો.",
    "Yes, 8 cubes make 3 different cuboids, and one is a cube.": "હા, 8 ઘનથી 3 જુદા લંબઘન બને, એક ઘન છે.",
    "Yes, the stone pushed more water up, so it has the greater volume.": "હા, પથ્થરે વધુ પાણી ચઢાવ્યું, તેથી તેનું ઘનફળ વધુ છે.",
    "Yes, the lemon's jar rose more.": "હા, લીંબુવાળી બરણીનું પાણી વધુ ચઢ્યું.",
    "Yes, 3 centimetres times 20 square centimetres is 60 cubic centimetres.": "હા, 3 સેન્ટિમીટર ગુણ્યા 20 ચોરસ સેન્ટિમીટર = 60 ઘન સેન્ટિમીટર.",
    "Yes, the water rose more once the cork was fully under.": "હા, બૂચ ડૂબતાં પાણી વધુ ચઢ્યું.",
    "Yes, only part of the ball was under while it floated.": "હા, તરતી વખતે દડાનો માત્ર થોડો ભાગ ડૂબ્યો હતો.",
    "Right, that small rise shows only the part under the water.": "સાચું, એ નાનો ચઢાવ માત્ર ડૂબેલો ભાગ બતાવે છે.",
    "Put every card into a bin first.": "પહેલાં દરેક કાર્ડ ડબ્બામાં મૂકો.",
    "Give every card a unit tile first.": "પહેલાં દરેક કાર્ડને એકમની ટાઇલ આપો.",
    "Drop the card into a bin first.": "પહેલાં કાર્ડ ડબ્બામાં મૂકો.",
    "Set a cuboid on the shelf first.": "પહેલાં એક લંબઘન ખાના પર મૂકો.",
    "Tap Turn to stand the cuboid on its end first.": "પહેલાં ફેરવો દબાવી લંબઘન છેડે ઊભો કરો.",
    "Lower both objects into the jars first.": "પહેલાં બંને વસ્તુ બરણીઓમાં ઉતારો.",
    "Mark the level in each jar first.": "પહેલાં દરેક બરણીમાં સ્તરે નિશાન કરો.",
    "Lower the stone into the jar first.": "પહેલાં પથ્થર બરણીમાં ઉતારો.",
    "Mark the new water level first.": "પહેલાં પાણીના નવા સ્તરે નિશાન કરો.",
    "Mark the level while the cork floats first.": "પહેલાં બૂચ તરે ત્યારે સ્તરે નિશાન કરો.",
    "Use the Push stick first.": "પહેલાં લાકડી વાપરો.",
    "Mark the level again with the cork under.": "બૂચ ડૂબેલો રાખી ફરી સ્તરે નિશાન કરો.",
    "Push the ball fully under with the stick first.": "પહેલાં લાકડીથી દડો પૂરો ડુબાડો.",
    "Mark the level of the floating ball first.": "પહેલાં તરતા દડા સાથે સ્તરે નિશાન કરો.",
    "Put a card in a bin first.": "પહેલાં એક કાર્ડ ડબ્બામાં મૂકો.",
    "Make the tray full: change Wide or High.": "ટ્રે પૂરી ભરો: પહોળાઈ કે ઊંચાઈ બદલો.",
    "Put an object in a jar first.": "પહેલાં કોઈ વસ્તુ બરણીમાં મૂકો.",
    "Length": "લંબાઈ",
    "Surface": "સપાટી",
    "Space": "જગ્યા",
    "Water": "પાણી",
    "Ribbon": "રિબન",
    "Fence": "વાડ",
    "Grass": "ઘાસ",
    "Inside a box": "ખોખાની અંદર",
    "Wide": "પહોળાઈ",
    "High": "ઊંચાઈ",
    "Turn": "ફેરવો",
    "Shelf": "ખાનું",
    "Long": "લંબાઈ",
    "Unit cube": "એકમ ઘન",
    "Left over": "બાકી",
    "Same cuboid": "એ જ લંબઘન",
    "4 different cuboids": "4 જુદા લંબઘન",
    "3 different cuboids": "3 જુદા લંબઘન",
    "Same cuboid, turned": "એ જ લંબઘન, ફેરવેલો",
    "Greater volume": "વધુ ઘનફળ",
    "Base of the jar": "બરણીનું તળિયું",
    "20 sq. cm": "20 ચો. સેમી",
    "3 cm": "3 સેમી",
    "Volume 60 cu. cm": "ઘનફળ 60 ઘન સેમી",
    "Push stick": "લાકડી",
    "Mark level": "નિશાન કરો",
    "Floating": "તરતો",
    "Fully under": "પૂરો ડૂબેલો",
    "Not the whole ball": "આખો દડો નહીં",
    "Key": "ચાવી",
    "Stone": "પથ્થર",
    "Wooden cube": "લાકડાનો ઘન",
    "Marble": "લખોટી",
    "Lemon": "લીંબુ",
    "Cork": "બૂચ",
    "Ball": "દડો",
    "Apple": "સફરજન",
  },
};

const PHASES = [
  {
    n: 1,
    concept: "Which measure, which unit",
    conceptId: "M3.S5.T11.C50", objectiveIds: ["O19"],
    says: ["Is it a length, a surface or a space? Then pick its unit."],
    /* the warm-up: a ribbon card (not one of the questions' cards) into its bin, then its unit */
    steps: [
      { say: "Drag the ribbon card into the bin for a length.", on: "card-ribbon", hint: "The ribbon card waits at the top." },
      { say: "Now drag the cm tile onto the ribbon card.", on: "tile-cm", hint: "The unit tiles lie along the bottom." },
    ],
    stepHold: 1600,
    /* tries, as the plan writes it: First rung: say whether one card is a length, a surface or a space. Second rung: drop it in its bin. Third rung: the same task with just two bins, before the whole row returns. */
    ladder: ["Drop each card into the bin that answers that question.", "Then give each card a tile whose unit is a line, a square or a cube."],
    closing: "A perimeter is a length, an area is a surface and a volume is a space.",
    learned: "You learned: a length, a surface and a space each have their own unit.",
    traceback: "Each card's boundary, surface or space is shown in steps with its bin lit amber, then each bin shows its right card and unit.",
    items: [
      /* learn TM1: answer in the plan = The fence in m, the grass in sq. m, and the water in cu. m */
      { qid: "M3.S5.T11.C50:TM1", kind: "sort", pad: "enter", say: "Sort the fence, the grass and the tank water, and give each its unit.", ask: "Bin and unit for each?",
        answer: "fence=length,m;grass=surface,sqm;water=space,cum", near: "fence=length,m;grass=length,m;water=space,cum",
        miss: "For each card, ask: is it a line round the edge, a cover or a filling?", win: "Yes, the fence is a length, the grass a surface and the water a space." },
      /* practice 1: answer in the plan = cu. cm, because a volume is a space */
      /* plan question: Is the space inside a box measured in cm, sq. cm or cu. cm? */
      { qid: "M3.S5.T11.C50:1", kind: "pick", card: "box", say: "Is a box's space in centimetres, square centimetres or cubic centimetres?", ask: "Unit for the space?",
        choices: [{ id: "cm", label: "cm" }, { id: "cucm", label: "cu. cm" }, { id: "sqcm", label: "sq. cm" }], answer: "cucm", near: "sqcm",
        miss: "Look at the bin your box card is in: what fills the inside of a box?",
        ladder: ["Picture filling the box: with lines, with flat squares or with small cubes?", "Read each key and find the one named after what fills a box."],
        win: "Yes, a box holds a space, so it takes cubic centimetres." },
      /* practice 4: answer in the plan = An area, measured in square units such as sq. m */
      { qid: "M3.S5.T11.C50:4", kind: "pick", card: "grass", say: "Is the grass inside a fence a perimeter, an area or a volume?", ask: "Grass: which measure?",
        choices: [{ id: "perimeter", label: "Perimeter" }, { id: "area", label: "Area" }, { id: "volume", label: "Volume" }], answer: "area", near: "perimeter",
        miss: "Look again at the grass card: is it the edge, the ground or a space?",
        ladder: ["Trace round the field, then across the grass: which one is the grass?", "Look along the keys for the measure of a covered surface."],
        win: "Yes, grass is an area." },
    ],
  },
  {
    n: 2,
    concept: "The same cuboid, turned",
    conceptId: "M3.S5.T11.C51", objectiveIds: ["O19"],
    says: ["Build a cuboid, then turn it. Is it new, or the same one turned?"],
    /* the warm-up: 6 cubes (no question's count): a row, a cuboid 2 wide, then that cuboid turned slides onto its twin */
    steps: [
      { say: "Tap Shelf to set this row of cubes on the shelf.", on: "shelf", hint: "Shelf is on the right of Turn." },
      { say: "Tap Wide to lay the cubes two wide.", on: "wide", hint: "Wide is the top left key." },
      { say: "Tap Shelf again to keep this new cuboid.", on: "shelf", hint: "The Shelf key sits next to Turn." },
      { say: "Tap Turn to stand the cuboid on another face.", on: "turn", hint: "Turn is the bottom left key." },
      { say: "Tap Shelf to set the turned cuboid on the shelf.", on: "shelf", hint: "Shelf is the bottom right key." },
    ],
    stepHold: 2300,
    /* tries, as the plan writes it: First rung: build a single row of all the cubes. Second rung: build one cuboid with two rows. Third rung: the same task with fewer cubes, before the question's own count returns. */
    ladder: ["Tap Wide and High in turn, and shelve every shape that uses all the cubes.", "Now count the places on the shelf, not the copies stacked on them."],
    closing: "Each cuboid is counted once because a turned cuboid is the same cuboid.",
    learned: "You learned: a turned cuboid is the same cuboid, so count it once.",
    traceback: "Turned copies on the shelf are lit amber as Same cuboid, the missing cuboids appear in the empty places, and the count of different cuboids is shown.",
    items: [
      /* learn TM2: answer in the plan = 4 different cuboids */
      { qid: "M3.S5.T11.C51:TM2", kind: "count", cubes: 18, say: "How many different cuboids can you make with 18 unit cubes?", ask: "Different cuboids?", answer: 4, near: 6,
        miss: "Look at your shelf: did a turned copy slide onto a cuboid already there?", win: "Yes, 18 cubes make 4 different cuboids." },
      /* practice 2: answer in the plan = No. It is the same cuboid, turned */
      /* plan question: A cuboid 5 long, 2 wide and 1 high is stood on its end. Is it a new cuboid? */
      { qid: "M3.S5.T11.C51:2", kind: "turn", say: "Is a cuboid 5 long, 2 wide and 1 high a new cuboid when it is stood on its end?", ask: "New cuboid?",
        choices: [{ id: "no", label: "The same" }, { id: "yes", label: "A new one" }], answer: "no", near: "yes",
        miss: "Count the cubes before the turn and after it.",
        ladder: ["Count its long, wide and high edges before and after the turn.", "Look at the three numbers before and after the turn."],
        win: "Right, it is the same cuboid, turned." },
      /* practice 7: answer in the plan = 3. One is 8 long, 1 wide and 1 high. One is 4 long, 2 wide and 1 high. One is 2 long, 2 wide and 2 high, which is a cube */
      { qid: "M3.S5.T11.C51:7", kind: "count", cubes: 8, say: "Using all 8 unit cubes each time, how many different cuboids can you find?", ask: "Cuboids from 8?", answer: 3, near: 4,
        miss: "Count each shape once; a turned copy is not new, and a cube counts too.",
        ladder: ["Set the keys to 2 wide and 2 high and look at the tray.", "Add that cube to the shelf, then count the shelf places."],
        win: "Yes, 8 cubes make 3 different cuboids, and one is a cube." },
      /* practice 5 (unused: exactly three a phase): How many different cuboids can 7 unit cubes make? Only one */
    ],
  },
  {
    n: 3,
    concept: "Water makes room",
    conceptId: "M3.S5.T11.C52", objectiveIds: ["O20"],
    says: ["Watch the water. Which one pushes more water out of its way?"],
    /* the warm-up: one jar and a wooden cube (no question's object) */
    steps: [
      { say: "Tap the wooden cube to lower it into the jar.", on: "obj-cube", hint: "The wooden cube waits beside the jar." },
      { say: "Tap Mark level to draw the new water line.", on: "mark", hint: "Mark level is the long key at the bottom." },
    ],
    stepHold: 1800,
    /* tries, as the plan writes it: First rung: lower one object and mark the level. Second rung: lower the other and mark it. Third rung: the same task with two objects very different in size, before the question's own returns. */
    ladder: ["Put a finger on each start line and slide it up to the new line.", "Compare the two green bands and find the taller one."],
    closing: "A solid fully under water raises the water by as much space as it takes up.",
    learned: "You learned: a solid under water raises it by the space it takes up.",
    traceback: "Each jar's rise is lit amber in turn and the object with the higher rise is labelled Greater volume; on the scaled jar the rise is counted cm by cm and the volume shown.",
    items: [
      /* learn TM3: answer in the plan = The stone */
      /* plan question: Two equal jars hold equal water. A key goes into one and a stone into the other, both fully under. The stone's jar rises more. Which has the greater volume? */
      { qid: "M3.S5.T11.C52:TM3", kind: "jars2", objs: ["key", "stone"], say: "Key or stone, both fully under in equal jars: which has the greater volume?", ask: "Greater volume?",
        choices: [{ id: "key", label: "The key" }, { id: "stone", label: "The stone" }], answer: "stone", near: "key",
        miss: "See how far the water rose, not how long each thing is.", win: "Yes, the stone pushed more water up, so it has the greater volume." },
      /* practice 3: answer in the plan = The lemon */
      /* plan question: Two equal jars hold equal water. A marble goes into one, and a lemon, pushed fully under, into the other. The lemon's jar rises more. Which has the greater volume? */
      { qid: "M3.S5.T11.C52:3", kind: "jars2", objs: ["lemon", "marble"], say: "A marble and a lemon held fully under: which has the greater volume?", ask: "Bigger volume?",
        choices: [{ id: "lemon", label: "The lemon" }, { id: "marble", label: "The marble" }], answer: "lemon", near: "marble",
        miss: "Read how far each jar's water climbed, not how heavy each one feels.",
        ladder: ["Which jar's water climbed past more of the glass?", "Now name the object that sits in that jar."],
        win: "Yes, the lemon's jar rose more." },
      /* authored (the plan has two questions here): the rise times the base area is the volume (the chapter's note); whole numbers */
      { qid: null, kind: "calc", objs: ["stone"], base: 20, rise: 3, say: "Base 20 square centimetres: how many cubic centimetres is the stone?", ask: "Stone's volume?",
        answer: 60, near: 3, miss: "Read how far the water rose on the ruler, then use the whole base.",
        ladder: ["Picture the risen water as a slab 3 cm high on a base of 20 square centimetres.", "Multiply that rise by the base, 20, to get the cubic centimetres."],
        win: "Yes, 3 centimetres times 20 square centimetres is 60 cubic centimetres." },
    ],
  },
  {
    n: 4,
    concept: "Push it fully under",
    conceptId: "M3.S5.T11.C53", objectiveIds: ["O20"],
    says: ["Is all of it under the water? Push it down, then read the rise."],
    /* the warm-up: a floating apple (no question's object) */
    steps: [
      { say: "Drag the Push stick onto the apple to hold it fully under.", on: "push", hint: "The Push stick stands beside the jar." },
      { say: "Tap Mark level to draw the water line now.", on: "mark", hint: "Mark level is the key at the bottom right." },
    ],
    stepHold: 1800,
    /* tries, as the plan writes it: First rung: push the object down until the top is level with the water. Second rung: push it fully under and mark the level. Third rung: the same task with a smaller floater, before the question's own returns. */
    ladder: ["Check how far the water rose at each mark.", "Compare the rise with the cork floating and with it held under."],
    closing: "A floater is pushed fully under before the rise is read.",
    learned: "You learned: push a floater fully under before you read the rise.",
    traceback: "The floating rise is lit amber with the part above the water, then the full rise with the object fully under is lit green and the right reason is shown.",
    items: [
      /* learn TM4: answer in the plan = Push it fully under with a thin stick, then read the rise */
      /* plan question: A cork floats in a jar of water. How can the rise show its volume? */
      { qid: "M3.S5.T11.C53:TM4", kind: "cork", obj: "cork", say: "A cork floats in a jar of water, so how can the rise show its volume?", ask: "Show its volume?",
        choices: [{ id: "push", label: "Push it under first" }, { id: "float", label: "Read it floating" }], answer: "push", near: "float",
        miss: "Look at both marks: how is the cork sitting in each?", win: "Yes, the water rose more once the cork was fully under." },
      /* practice 6: answer in the plan = A floating ball is only partly under the water. Only when it is fully under does the rise show all the space it takes up */
      { qid: "M3.S5.T11.C53:6", kind: "ballpush", obj: "ball", say: "Why push a floating ball under before reading?", ask: "Why push it under?",
        choices: [{ id: "all", label: "All of it was under" }, { id: "part", label: "Only part was under" }], answer: "part", near: "all",
        miss: "Look at the water level before the push and after it.",
        ladder: ["Watch the ball's water line before and after the push.", "Look at the rise as it floats and after the push."],
        win: "Yes, only part of the ball was under while it floated." },
      /* practice 8: answer in the plan = No. The ball is only partly under the water. Push it fully under, then read the rise */
      /* plan question: Two equal jars hold equal water. A plastic ball floats in one, not held under, and the water rises only a little. Does that small rise show the ball's volume? */
      { qid: "M3.S5.T11.C53:8", kind: "ballmark", obj: "ball", say: "A ball floats, not held under; does its small rise show its volume?", ask: "Shows its volume?",
        choices: [{ id: "no", label: "No" }, { id: "yes", label: "Yes" }], answer: "no", near: "yes",
        miss: "Read the rise and then look at the floating ball.",
        ladder: ["Look at the line on the ball where the water meets it.", "Picture the stick pushing it under: where would the water go?"],
        win: "Right, that small rise shows only the part under the water." },
    ],
  },
];

/* a win line is read, never cut: each question's celebration covers its line (68 ms a character) */
PHASES.forEach((p: any) => p.items.forEach((it: any) => { if (it.win) it.winMs = Math.max(2400, it.win.length * 68 + 200); }));

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL = {
  cards: { fence: "length, m", grass: "surface, sq. m", water: "space, cu. m", box: "space, cu. cm" },
  cubes: { warm: 6, tm2: 18, turn: [5, 2, 1], p7: 8 },
  jars: { equal: true, cmPerUnit: TM_CM, calc: { base: 20, rise: 3, volume: 60 } },
  /* the answer gate (PATTERNS §19): the corner key and the keypad / choice keys stay disabled in user mode, after a real touch
     (a real tap on the board, or a real trusted Enter on a guide step), until the question's act is done; AI mode and toolApi
     runs are never gated (the agent's check() performs the act at once) */
  answerGate: {
    "1.1": "drag (or tap) the fence, grass and water cards into bins and a unit tile onto each; Enter opens when all six are placed",
    "1.2": "drop the box card into a bin", "1.3": "drop the grass card into a bin",
    "2.1": "set at least one cuboid of all 18 cubes on the shelf", "2.2": "tap Turn to stand the cuboid on its end",
    "2.3": "set at least one cuboid of all 8 cubes on the shelf",
    "3.1": "lower the key and the stone into the jars and tap Mark level on each", "3.2": "lower the marble and the lemon and tap Mark level on each",
    "3.3": "lower the stone and tap Mark level",
    "4.1": "tap Mark level with the cork floating, push it fully under with the Push stick, then tap Mark level again", "4.2": "push the ball fully under with the Push stick",
    "4.3": "tap Mark level with the ball floating",
    ungated: "none: every question has an act on the board",
  },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const TM_KIND: any = { fence: ["length", ["cm", "m"]], grass: ["surface", ["sqcm", "sqm"]], water: ["space", ["cucm", "cum"]] };
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  /* the owner (2026-11-16): either unit of the right kind is right (the correction still shows m, sq. m, cu. m) */
  if (item.kind === "sort") return Object.keys(TM_KIND).every((id) => { const m = new RegExp(id + "=(\\w*),(\\w*)").exec(String(v)) || [];
    return m[1] === TM_KIND[id][0] && TM_KIND[id][1].indexOf(m[2]) >= 0; });
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => {
  const shapes = (m: number) => { const seen: any = {}; for (let a = 1; a <= m; a++) for (let b = 1; b <= m; b++) for (let c = 1; c <= m; c++) if (a * b * c === m) seen[[a, b, c].sort((x, y) => x - y).join("x")] = 1; return Object.keys(seen).length; };
  const kind: any = { fence: ["length", "m"], grass: ["surface", "sqm"], water: ["space", "cum"] };
  const sorted = ["fence", "grass", "water"].map((k) => k + "=" + kind[k].join(",")).join(";");
  const sameTurned = [5, 2, 1].sort().join() === [2, 1, 5].sort().join();
  const vol: any = { key: 4, stone: 30, marble: 3, lemon: 20 };       /* cu. cm, a rough second table: only the order matters */
  const P: any = PHASES;
  return P[0].items[0].answer === sorted && P[0].items[1].answer === "cucm" && P[0].items[2].answer === "area"
    && P[1].items[0].answer === shapes(18) && P[1].items[1].answer === (sameTurned ? "no" : "yes") && P[1].items[2].answer === shapes(8)
    && P[2].items[0].answer === (vol.stone > vol.key ? "stone" : "key") && P[2].items[1].answer === (vol.lemon > vol.marble ? "lemon" : "marble")
    && P[2].items[2].answer === 3 * 20
    && P[3].items[0].answer === "push" && P[3].items[1].answer === "part" && P[3].items[2].answer === "no";
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print (a choice question names its options by design) */
const answerForms = (item: any) => (item.choices ? []
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : (HOOK.acts && HOOK.acts(), undefined));
/* the agent's check() before Enter: it performs the question's acts at once (AI mode is never gated); in the demo stage it
   returns undefined so the agent's check() reaches api.onEnter and performs the current step */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();     /* the traceback */
  const ta = useTimeline();     /* the water and the shelf moving */
  const free = stage === "free";
  const warm = !free && !!phase.steps && (stage === "demo" || stage === "teach");
  const isDemo = stage === "demo";
  const qk = free ? "free" : warm ? "w" + n : "q" + n + "." + index;
  const it: any = free || warm ? null : item;
  /* the board belongs to an ENTRY into a question, never to the question (PATTERNS §18) */
  const ent = useRef({ qk: "", c: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, c: ent.current.c + 1 };
  const bk = qk + "#" + ent.current.c;
  const [raw, setRaw] = useState<any>(() => tmFresh(n, it, warm, free, bk));
  const S: any = raw && raw.bk === bk ? raw : tmFresh(n, it, warm, free, bk);
  const Sref = useRef<any>(S);
  Sref.current = S;
  /* the sort board last sent by Enter: the same untouched board is never sent twice (a move clears it, owner 2026-11-18) */
  const sent = useRef<any>(null);
  const put = (f: any) => {
    const b = Sref.current;
    if (!b || b.bk !== bk) return;               /* a late callback of an earlier entry writes nothing */
    const nx = { ...b, ...(typeof f === "function" ? f(b) : f) };
    if (sent.current && (sent.current.bk !== bk || !nx.cards || tmValue(nx) !== sent.current.v)) sent.current = null;
    Sref.current = nx;
    setRaw(nx);
  };
  const apiRef = useRef(api);
  apiRef.current = api;
  const itRef = useRef<any>(it);
  itRef.current = it;
  const busy = useRef(false);
  const [acting, setActing] = useState(false);
  const [demo, setDemo] = useState<any>(null);
  const dm = demo && demo.bk === bk ? demo.k : 0;
  const tracing = useRef(false);
  const nudged = useRef(false);
  const gateRef = useRef(false);
  const [, bump] = useState(0);

  /* only a REAL input counts (a trusted pointer on the board, a trusted key on a piece, a trusted Enter on a guide step), in user
     mode: the agent's check() and answer() reach the same acts and must never arm the gate */
  const touch = () => { if (!TM_TOUCHED && tmUser()) { TM_TOUCHED = true; bump((v: number) => v + 1); } };
  const touchRef = useRef(touch);
  touchRef.current = touch;
  const nudge = () => { if (busy.current) return; nudged.current = true; apiRef.current.say(tmNudge(itRef.current, Sref.current)); };
  const say1 = (line: string) => { if (busy.current) return; nudged.current = true; apiRef.current.say(line); };
  /* after the child's act: the correction layer goes, and a nudge gives the question back (the question stays) */
  const afterAct = () => {
    if (demo) setDemo(null);
    if (nudged.current && itRef.current) { nudged.current = false; apiRef.current.say(itRef.current.say); }
  };
  useEffect(() => {
    const kd = (e: any) => {
      if (!e.isTrusted) return;
      if (/^[0-9]$/.test(e.key)) { if (gateRef.current && !busy.current) nudge(); return; }
      if (e.key !== "Enter" && e.key !== " ") return;
      const t = e.target, onPiece = !!(t && t.closest && t.closest('[data-zone="work"] [data-control]'));
      if (onPiece) { touchRef.current(); return; }
      if (e.key === "Enter") { TM_ENTER_AT = Date.now(); if (gateRef.current) nudge(); }
    };
    const pd = (e: any) => {
      const t0 = e.target;
      if (e.isTrusted && nudged.current && itRef.current && t0 && t0.closest && t0.closest('[data-control="again"]')) { nudged.current = false; apiRef.current.say(itRef.current.say); return; }
      if (!e.isTrusted || !gateRef.current) return; const t = e.target; if (t && t.closest && t.closest('[data-zone="ask"], [data-zone="pad"], [data-control^="choice-"], [data-control="answer-open"]')) nudge(); };
    window.addEventListener("keydown", kd, true);
    document.addEventListener("pointerdown", pd, true);
    return () => { window.removeEventListener("keydown", kd, true); document.removeEventListener("pointerdown", pd, true); };
  }, []);

  /* a correction replay never outlives its entry */
  useEffect(() => () => { tl.stop(); ta.stop(); busy.current = false; setActing(false); if (tracing.current) { tracing.current = false; apiRef.current.lock(false); } }, [bk]);

  /* THE ANSWER GATE (PATTERNS §19): locked while the question still needs its act, in user mode, after a real touch */
  const left = stage === "ask" && it ? tmLeft(it, S) : 0;
  const corrected = useRef("");
  const gate = left > 0 && TM_TOUCHED && !tracing.current && corrected.current !== bk;
  useEffect(() => {
    if (gate) { gateRef.current = true; api.lock(true); }
    else if (gateRef.current) { gateRef.current = false; api.lock(false); }
  }, [gate, bk]);
  /* the sort question is answered on the board: its Enter blinks once every card has its bin and unit */
  const stale = !!(stage === "ask" && it && it.pad === "enter" && sent.current && sent.current.bk === bk && S.cards && tmValue(S) === sent.current.v);
  useEffect(() => { if (stage === "ask" && it && it.pad === "enter") api.answerReady(left === 0 && !stale); }, [left, bk, stage, stale]);
  /* the win line, said at the win (the runtime puts the phase's closing in place of the last one) */
  useEffect(() => {
    if (stage !== "win" || !it) return;
    if (it.kind !== "sort" && tmLeft(it, Sref.current) > 0) actsNow();
    if (it.win) api.say(it.win);
  }, [stage, bk]);

  /* the design frame: x 0-900, centred while the panel is shut, never under the key's corner */
  const kx = box && box.key ? box.key.x - 12 : box ? box.w : 1472;
  const ox = Math.max(0, Math.min(((box ? box.w : 1472) - TM_DW) / 2, kx - TM_DW));
  const WX = (x: number) => x + ox;

  /* ───────── phase 1: bins, cards, unit tiles ───────── */
  const binBox = (k: number) => ({ x: 10 + k * 300, y: 150, w: 280, h: 262 });
  const rowBoxes = () => { const ids = S.ids || [], N = ids.length, cw = 230, ch = 124, g = 30, x0 = (TM_DW - (N * cw + (N - 1) * g)) / 2;
    const r: any = {}; ids.forEach((id: string, k: number) => (r[id] = { x: x0 + k * (cw + g), y: 6, w: cw, h: ch })); return r; };
  const cardBox = (id: string) => {
    const c = S.cards && S.cards[id];
    if (!c || !c.bin) return rowBoxes()[id];
    const k = TM_BINS.findIndex((b) => b.id === c.bin), B = binBox(k);
    const inBin = S.ids.filter((q: string) => S.cards[q].bin === c.bin), m = inBin.length, i = inBin.indexOf(id);
    const cw = Math.min(200, (260 - (m - 1) * 10) / m), ch = Math.round(cw * 0.56);
    return { x: B.x + (B.w - (m * cw + (m - 1) * 10)) / 2 + i * (cw + 10), y: B.y + 12, w: cw, h: ch };
  };
  const tileBox = (k: number) => ({ x: 12 + k * 148, y: 434, w: 136, h: 76 });
  const binAt = (x: number, y: number) => { if (y < 130 || y > 425) return null; const k = TM_BINS.findIndex((_, q) => { const B = binBox(q); return x >= B.x - 10 && x <= B.x + B.w + 10; }); return k < 0 ? null : TM_BINS[k].id; };
  const cardAt = (x: number, y: number) => (S.ids || []).find((id: string) => { const c = S.cards[id]; if (!c.bin) return false; const b = cardBox(id); return x >= b.x - 20 && x <= b.x + b.w + 20 && y >= b.y - 20 && y <= b.y + b.h + 80; }) || null;
  const carry = (from: any, to: any, hold: any, done: () => void) => {
    if (busy.current) return;
    busy.current = true; setActing(true);
    api.act({ tool: "hand", moves: "carry", from: { x: WX(from.x), y: from.y }, to: { x: WX(to.x), y: to.y }, at: [{ x: WX(to.x), y: to.y }], hold })
      .then((ok: boolean) => { busy.current = false; setActing(false); if (ok) done(); });
  };
  const setCard = (id: string, patch: any) => put((b: any) => ({ cards: { ...b.cards, [id]: { ...b.cards[id], ...patch } } }));
  const cardTo = (id: string, bin: string | null) => {
    const B = bin ? binBox(TM_BINS.findIndex((b) => b.id === bin)) : null, from = cardBox(id);
    carry({ x: from.x + from.w / 2, y: from.y + from.h / 2 }, B ? { x: B.x + B.w / 2, y: B.y + 70 } : { x: from.x + from.w / 2, y: 70 },
      <g>{tmCardArt(id, -90, -50, 180, 100, tx)}</g>, () => {
        setCard(id, { bin }); api.sfx.tick();
        if (isDemo) api.did("card-" + id); else afterAct();
      });
  };
  const tapCard = (id: string) => {
    if (tracing.current) return;
    if (isDemo) { if (stepOn === "card-" + id) cardTo(id, "length"); else api.did("card-" + id); return; }
    const order = [null, "length", "surface", "space"], cur = S.cards[id].bin, nx = order[(order.indexOf(cur) % 3) + 1];
    cardTo(id, nx as any);
  };
  const dropCard = (id: string, p: any, moved: boolean) => {
    if (busy.current || tracing.current) return;
    if (!moved) { tapCard(id); return; }
    const bin = binAt(p.x - ox, p.y);
    if (isDemo) {
      if (stepOn === "card-" + id && bin === "length") { setCard(id, { bin }); api.sfx.tick(); api.did("card-" + id); }
      else api.did(bin ? "bin-" + bin : "card-" + id);
      return;
    }
    setCard(id, { bin }); api.sfx.tick(); afterAct();
  };
  const tileTo = (tid: string, cid: string) => {
    const k = TM_TILES.findIndex((t) => t.id === tid), from = tileBox(k), to = cardBox(cid);
    carry({ x: from.x + from.w / 2, y: from.y + from.h / 2 }, { x: to.x + to.w / 2, y: to.y + to.h + 30 }, <g>{tmTile(tid, -68, -38, 136, 76, tx)}</g>, () => {
      setCard(cid, { unit: tid }); api.sfx.tick();
      if (isDemo) api.did("tile-" + tid); else afterAct();
    });
  };
  const tapTile = (tid: string) => {
    if (tracing.current) return;
    if (isDemo) { if (stepOn === "tile-" + tid && S.cards.ribbon && S.cards.ribbon.bin) tileTo(tid, "ribbon"); else api.did("tile-" + tid); return; }
    const binned = TM_BINS.flatMap((b) => S.ids.filter((id: string) => S.cards[id].bin === b.id));
    const cid = binned.find((id: string) => !S.cards[id].unit) || binned[0];
    if (cid) tileTo(tid, cid); else say1(TM_NUDGES.tileNoCard);
  };
  const dropTile = (tid: string, p: any, moved: boolean) => {
    if (busy.current || tracing.current) return;
    if (!moved) { tapTile(tid); return; }
    const cid = cardAt(p.x - ox, p.y);
    if (isDemo) {
      if (stepOn === "tile-" + tid && cid === "ribbon") { setCard(cid, { unit: tid }); api.sfx.tick(); api.did("tile-" + tid); }
      else api.did("tile-" + tid);
      return;
    }
    if (cid) { setCard(cid, { unit: tid }); api.sfx.tick(); afterAct(); } else say1(TM_NUDGES.tileNoCard);
  };

  /* ───────── phase 2: the tray, Wide / High / Turn / Shelf, the heap, the shelf ───────── */
  const TR2 = tmTray(S.cubes ? S : { cubes: 1, w: 1, h: 1, t: 0 });
  /* a screen of more than 40 skins is drawn plain, never half-skinned: decided once per screen from its worst case
     (tray, heap and unit cube, every shelf place with a turned twin on it, the ghosts) */
  const skin2 = !!S.cubes && S.cubes + 1 + 2 * (S.turnOnly ? 1 : tmShapes(S.cubes).length) * S.cubes <= 40;
  const keys2 = () => {
    const ks = S.turnOnly ? [{ id: "turn", k: 2 }] : [{ id: "wide", k: 0 }, { id: "high", k: 1 }, { id: "turn", k: 2 }, { id: "shelf", k: 3 }];
    return ks.map((q) => ({ ...q, x: 610 + (q.k % 2) * 140, y: 64 + Math.floor(q.k / 2) * 80, w: 140, h: 72,
      text: q.id === "wide" ? tx("Wide") + " " + S.w : q.id === "high" ? tx("High") + " " + S.h : q.id === "turn" ? tx("Turn") : tx("Shelf"),
      off: q.id === "shelf" && !TR2.ok }));
  };
  const slotBox = (k: number) => ({ x: 4 + k * 222, y: 362, w: 214, h: 136 });
  /* the cuboid fits INSIDE the tray's inner box (x 12-616, y 76-344), under the chip row: no label ever sits on it */
  const trayFit = () => { const [l, w, h] = TR2.d, b = tmFitB(l, w, h, 576, 268, 30), a = b * 1.767, tw = (l + w) * a, th = (l + w) * b + 2 * b * h; return { b, x: 12 + (576 - tw) / 2, y: 344 - th, w: tw, h: th }; };
  const lastKey = useRef(0);
  const doKey = (id: string) => {
    if (busy.current) return;
    const tf = trayFit(), mid = { x: WX(tf.x + tf.w / 2), y: tf.y + tf.h / 2 };
    const done = () => { if (isDemo) api.did(id); else afterAct(); };
    if (id === "wide" || id === "high" || id === "turn") {
      busy.current = true; setActing(true);
      api.act(id === "turn" ? { tool: "hand", moves: "push", from: { x: mid.x - 60, y: mid.y }, at: [mid], to: { x: mid.x + 30, y: mid.y } }
        : { tool: "hand", moves: "sweep", from: { x: WX(40), y: 220 }, at: [{ x: WX(300), y: 220 }], to: { x: WX(570), y: 220 } })
        .then((ok: boolean) => {
          busy.current = false; setActing(false);
          if (!ok) return;
          if (id === "wide") put((b: any) => ({ w: (b.w % 3) + 1, t: 0 }));
          else if (id === "high") put((b: any) => ({ h: (b.h % 3) + 1, t: 0 }));
          else put((b: any) => ({ t: (b.t + 1) % 3, turned: true }));
          api.sfx.settle(); done();
        });
      return;
    }
    if (!TR2.ok) { if (isDemo) api.did("shelf"); else say1(TM_NUDGES.trayNotFull); return; }
    const d = TR2.d.slice(), sk = tmSk(d), twin = S.shelf.findIndex((e: any) => e.sk === sk);
    const k = twin >= 0 ? twin : S.shelf.length, sb = slotBox(Math.min(3, k));
    const mb = tmFitB(d[0], d[1], d[2], 120, 90, 12);
    busy.current = true; setActing(true);
    api.act({ tool: "hand", moves: "carry", from: mid, to: { x: WX(sb.x + sb.w / 2), y: sb.y + 80 }, at: [{ x: WX(sb.x + sb.w / 2), y: sb.y + 80 }],
      hold: <g>{tmIso(d[0], d[1], d[2], -((d[0] + d[1]) * mb * 1.767) / 2, -((d[0] + d[1]) * mb + 2 * mb * d[2]) / 2, mb, skin2, { key: "h", sw: 1 }).els}</g> })
      .then((ok: boolean) => {
        busy.current = false; setActing(false);
        if (!ok) return;
        if (twin >= 0) {
          put((b: any) => ({ shelf: b.shelf.map((e: any, q: number) => (q === twin ? { ...e, twin: true, lit: true, bump: 1 } : e)) }));
          api.sfx.trade();
          ta.run([[160, () => put((b: any) => ({ shelf: b.shelf.map((e: any, q: number) => (q === twin ? { ...e, bump: 0 } : e)) }))],
            [900, () => put((b: any) => ({ shelf: b.shelf.map((e: any, q: number) => (q === twin ? { ...e, lit: false } : e)) }))]]);
        } else if (S.shelf.length < 4) { put((b: any) => ({ shelf: [...b.shelf, { d, sk, twin: false }] })); api.sfx.settle(); }
        done();
      });
  };
  const pressKey = (id: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    if (tracing.current || busy.current) return;
    if (isDemo && id !== stepOn) { api.did(id); return; }
    doKey(id);
  };

  /* ───────── phases 3 and 4 (and free play): the jars, the objects, the Push stick, Mark level ───────── */
  const matPos = (id: string) => {
    const k = (S.mat || []).indexOf(id);
    if (S.calc) return { x: 720, y: 330 };
    if (S.free) return [{ x: 680, y: 160 }, { x: 830, y: 160 }, { x: 680, y: 320 }, { x: 830, y: 320 }][k] || { x: 720, y: 160 };
    return { x: 720, y: 150 + k * 170 };
  };
  const stickX = S.free ? 540 : 720;
  const objIn = (id: string, j: number) => {
    const J = S.jars[j], I = tmIn(J), o = TM_OBJ[id], st = S.objs[id], s = id === "key" ? 0.9 : id === "cube" ? 0.85 : 1, oh = o.h * s;
    const wt = I.ib - S.lv[j];
    const cy = o.float == null ? I.ib - oh / 2 - 4 : st.under ? Math.min(I.ib - oh / 2 - 4, wt + oh / 2 + 18) : wt - oh * 0.1;
    return { x: J.x + J.w / 2, y: cy, s, oh };
  };
  const riseTo = (j: number) => {
    const S0 = Sref.current, tgt = tmLevel(S0, j), from = S0.lv[j];
    const st = (f: number) => () => put((b: any) => ({ lv: b.lv.map((v: number, q: number) => (q === j ? from + (tgt - from) * f : v)) }));
    ta.run([[140, st(0.3)], [140, st(0.6)], [140, st(0.85)], [10, st(1)]]);
  };
  const lowerTo = (id: string, j: number) => {
    if (busy.current) return;
    const J = S.jars[j], from = matPos(id), I = tmIn(J);
    put({ carry: id });
    busy.current = true; setActing(true);
    api.act({ tool: "hand", moves: "carry", from: { x: WX(from.x), y: from.y }, to: { x: WX(J.x + J.w / 2), y: I.ib - 90 }, at: [{ x: WX(J.x + J.w / 2), y: I.ib - 90 }],
      hold: <g>{tmObjArt(id, 0, 0, 0.9)}</g> })
      .then((ok: boolean) => {
        busy.current = false; setActing(false);
        put({ carry: null });
        if (!ok) return;
        put((b: any) => ({ jars: b.jars.map((q: any, i: number) => (i === j ? { ...q, obj: id, marks: [] } : q)),
          objs: { ...b.objs, [id]: { where: j, under: id === "lemon" } } }));
        api.sfx.settle(); riseTo(j);
        if (isDemo) api.did("obj-" + id); else afterAct();
      });
  };
  const liftOut = (id: string) => {
    if (busy.current) return;
    const j = S.objs[id].where, J = S.jars[j], to = matPos(id);
    busy.current = true; setActing(true);
    api.act({ tool: "hand", moves: "carry", from: { x: WX(J.x + J.w / 2), y: 300 }, to: { x: WX(to.x), y: to.y }, at: [{ x: WX(to.x), y: to.y }], hold: <g>{tmObjArt(id, 0, 0, 0.9)}</g> })
      .then((ok: boolean) => {
        busy.current = false; setActing(false);
        if (!ok) return;
        put((b: any) => ({ jars: b.jars.map((q: any, i: number) => (i === j ? { ...q, obj: null, marks: [] } : q)), objs: { ...b.objs, [id]: { where: "mat", under: false } } }));
        api.sfx.settle(); riseTo(j); afterAct();
      });
  };
  const tapObj = (id: string, j: number | null = null) => {
    if (busy.current || tracing.current) return;
    if (isDemo) { if (stepOn === "obj-" + id && S.objs[id].where === "mat") lowerTo(id, 0); else api.did("obj-" + id); return; }
    const st = S.objs[id];
    if (st.where !== "mat") { if (S.free) liftOut(id); return; }
    let jj = j;
    if (jj === null || S.jars[jj].obj) {
      const k = (S.mat || []).indexOf(id);
      jj = S.free || S.calc ? S.jars.findIndex((q: any) => !q.obj) : S.jars[k] && !S.jars[k].obj ? k : S.jars.findIndex((q: any) => !q.obj);
    }
    if (jj === null || jj < 0) return;
    lowerTo(id, jj);
  };
  const jarAt = (x: number) => S.jars ? S.jars.findIndex((J: any) => x >= J.x - 20 && x <= J.x + J.w + 20) : -1;
  /* 4.1: the cork is marked while it floats before the stick comes out */
  const pushJar = () => (it && it.kind === "cork" && S.jars && !S.jars[0].marks.length ? -1 : (S.jars || []).findIndex((J: any) => J.obj && TM_OBJ[J.obj].float != null && !S.objs[J.obj].under));
  const lastAct = useRef(0);
  const once = () => { const t = Date.now(); if (t - lastAct.current < 400) return false; lastAct.current = t; return true; };
  const doPush = (jWant: number | null = null) => {
    if (busy.current || tracing.current || !once()) return;
    if (isDemo && stepOn !== "push") { api.did("push"); return; }
    if (!S.stick) return;
    const j = jWant !== null && jWant >= 0 && S.jars[jWant].obj && TM_OBJ[S.jars[jWant].obj].float != null && !S.objs[S.jars[jWant].obj].under ? jWant : pushJar();
    if (j < 0) { if (isDemo) api.did("push"); return; }
    const id = S.jars[j].obj, p = objIn(id, j);
    busy.current = true; setActing(true);
    api.act({ tool: "hand", moves: "push", from: { x: WX(stickX), y: 120 }, at: [{ x: WX(p.x), y: p.y - p.oh / 2 - 40 }], to: { x: WX(p.x), y: p.y + 20 },
      hold: <g><rect x={-6} y={-150} width={12} height={150} rx={5} fill="url(#tm-grad-stick)" stroke={TM_C.line} strokeWidth={2} /></g> })
      .then((ok: boolean) => {
        busy.current = false; setActing(false);
        if (!ok) return;
        put((b: any) => ({ objs: { ...b.objs, [id]: { ...b.objs[id], under: true } } }));
        api.sfx.settle(); riseTo(j);
        if (isDemo) api.did("push"); else afterAct();
      });
  };
  const markJar = () => (S.jars || []).findIndex((J: any, j: number) => J.obj && !tmMarked(S, j));
  const doMark = () => {
    if (busy.current || tracing.current || !once()) return;
    if (isDemo && stepOn !== "mark") { api.did("mark"); return; }
    const j = markJar();
    if (j < 0) { if (isDemo) api.did("mark"); else if (!S.jars.some((q: any) => q.obj)) say1(TM_NUDGES.jarEmpty); return; }
    const J = S.jars[j], I = tmIn(J), lv = tmLevel(S, j), y = I.ib - lv;
    busy.current = true; setActing(true);
    api.act({ tool: "pencil", moves: "draw", marks: true, from: { x: WX(I.ix - 6), y }, at: [{ x: WX(I.ix + I.iw / 2), y }], to: { x: WX(I.ix + I.iw + 6), y } })
      .then((ok: boolean) => {
        busy.current = false; setActing(false);
        if (!ok) return;
        put((b: any) => ({ jars: b.jars.map((q: any, i: number) => (i === j ? { ...q, marks: [...q.marks, lv] } : q)) }));
        if (isDemo) api.did("mark"); else afterAct();
      });
  };

  /* ───────── the agent's acts: done at once, never gated (AI mode) ───────── */
  const actsNow = () => {
    const I0 = itRef.current;
    if (!I0) return;
    put((b: any) => {
      if (I0.kind === "pick") return { cards: { ...b.cards, [I0.card]: { ...b.cards[I0.card], bin: I0.card === "grass" ? "surface" : "space" } } };
      if (I0.kind === "count") { if (b.shelf.length) return {}; const t = tmTray(b); return t.ok ? { shelf: [{ d: t.d, sk: tmSk(t.d), twin: false }] } : {}; }
      if (I0.kind === "turn") return b.turned ? {} : { t: 1, turned: true };
      if (b.jars) {
        const nb: any = { ...b, objs: { ...b.objs }, jars: b.jars.map((q: any) => ({ ...q })) };
        if (I0.kind === "jars2" || I0.kind === "calc") (b.mat || []).forEach((id: string, k: number) => { if (nb.objs[id].where === "mat") { nb.objs[id] = { where: k, under: id === "lemon" }; nb.jars[k].obj = id; } });
        if (I0.kind === "cork" && !nb.jars[0].marks.length) nb.jars[0].marks = [tmLevel(nb, 0)];
        if (I0.kind === "cork" || I0.kind === "ballpush") nb.objs[I0.obj] = { ...nb.objs[I0.obj], under: true };
        nb.jars.forEach((q: any, j: number) => { if (q.obj && (I0.kind !== "ballpush") && !tmMarked(nb, j)) q.marks = [...q.marks, tmLevel(nb, j)]; });
        nb.lv = nb.jars.map((_: any, j: number) => tmLevel(nb, j));
        return nb;
      }
      return {};
    });
  };
  const act = (on: any) => {
    if (!on) return;
    if (n === 1) { if (on === "card-ribbon") tapCard("ribbon"); else if (on === "tile-cm") tapTile("cm"); return; }
    if (n === 2) { if (!busy.current) doKey(on); return; }
    if (on === "mark") doMark(); else if (on === "push") doPush(); else if (String(on).indexOf("obj-") === 0) tapObj(String(on).slice(4));
  };
  api.onEnter(isDemo && stepOn ? () => { if (Date.now() - TM_ENTER_AT < 250) touch(); act(stepOn); }
    : stage === "ask" && it && it.pad === "enter" ? () => { const s0 = Sref.current; if (tmLeft(it, s0) > 0) { nudge(); return; }
        const v = tmValue(s0); if (sent.current && sent.current.bk === bk && sent.current.v === v) return;
        sent.current = { bk, v }; api.submit(v); } : null);
  HOOK.demo = () => act(stepOn);
  HOOK.check = stage === "ask" && it ? () => { if (it.pad !== "enter") actsNow(); return undefined; } : null;
  HOOK.acts = stage === "ask" && it && it.pad !== "enter" ? actsNow : null;
  HOOK.set = stage === "ask" && it && it.pad === "enter" ? (v: any) => { sent.current = null; put(tmSortFrom(String(v))); return true; } : null;

  /* ───────── the traceback ───────── */
  useEffect(() => {
    /* misses 1 and 2: the bubble's clue only (miss, then ladder[0]); the correction with the whole answer from the 3rd miss (owner 2026-11-18) */
    if (!wrong || stage !== "ask" || !it || !(wrong.tries >= 3)) return;
    tracing.current = true;
    corrected.current = bk;
    api.lock(true);
    const st = (k: number) => () => setDemo({ bk, k });
    if (it.kind !== "sort" && it.kind !== "pick" && it.kind !== "count") actsNow();
    tl.run([[200, st(1)], [1000, st(2)], [1000, st(3)], [1000, st(4)]], () => { tracing.current = false; api.lock(false); bump((v: number) => v + 1); });
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState): the child's own work; the answer only once it is given */
  const done = stage === "win" || stage === "idle";
  api.share({
    phase: n,
    cards_sorted: S.cards ? Object.keys(S.cards).filter((id) => S.cards[id].bin).length : undefined,
    units_placed: S.cards ? Object.keys(S.cards).filter((id) => S.cards[id].unit).length : undefined,
    shelf: S.shelf ? (it && it.kind === "count" && (stage === "win" || stage === "idle") ? tmShapes(S.cubes).map((d) => d.join("x")) : S.shelf.map((e: any) => e.d.join("x"))) : undefined,
    jar_levels: S.jars ? S.jars.map((J: any, j: number) => ({ start: S.L0, level: tmLevel(S, j), marks: J.marks.slice() })) : undefined,
    pushed_under: S.objs ? Object.keys(S.objs).filter((id) => S.objs[id].under) : undefined,
    answer: done && it ? it.answer : undefined,
    complete: stage === "idle",
  });

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (pay.t === "card") dropCard(pay.id, p, moved);
    else if (pay.t === "tile") dropTile(pay.id, p, moved);
    else if (pay.t === "obj") { const j = moved ? jarAt(p.x - ox) : null; tapObj(pay.id, j !== null && j >= 0 ? j : null); }
    else if (pay.t === "stick") { const j = moved ? jarAt(p.x - ox) : null; doPush(j); }
  });
  const live = drag.drag && drag.drag.moved ? drag.drag : null;
  const isLive = (t: string, id: string) => !!live && live.payload && live.payload.t === t && live.payload.id === id;
  const piece = (t: string, id: string, label: string) => ({ ...control(t === "obj" ? "obj-" + id : t === "stick" ? "push" : t + "-" + id, label), ...drag.bind({ t, id }), ...drag.keys({ t, id }), style: { cursor: "grab" } as any });
  const chip = (x: number, y: number, s: string, tone: string, w?: number) => {
    const fs = T.label, ww = w || Math.max(120, s.length * fs * 0.58 + 36);
    return (
      <g pointerEvents="none" filter="url(#tm-shadow)">
        <rect x={x - ww / 2} y={y} width={ww} height={56} rx={14} fill={TM_C.white} stroke={tone} strokeWidth={4} />
        <text x={x} y={y + 38} textAnchor="middle" fontSize={fs} fontWeight={700} fill={shade(tone, 0.25)}>{s}</text>
      </g>
    );
  };

  /* ───────── drawing ───────── */
  const invite = (b: any) => (b ? <Invite x={b.x + b.w / 2} y={b.y + b.h / 2} w={b.w} h={b.h} rx={14} C={C} /> : null);

  const drawP1 = () => {
    const row = rowBoxes();
    const answerBin = (id: string) => (id === "fence" || id === "ribbon" ? "length" : id === "grass" ? "surface" : "space");
    const litBin = (bid: string) => {
      if (!dm || !it) return false;
      if (it.kind === "sort") return (dm === 1 && bid === "length") || (dm === 2 && bid === "surface") || (dm === 3 && bid === "space");
      return dm >= 2 && bid === answerBin(it.card);
    };
    const litCard = (id: string) => !!dm && !!it && (it.kind === "sort" ? (dm === 1 && id === "fence") || (dm === 2 && id === "grass") || (dm === 3 && id === "water") : dm >= 1);
    const unitLab = (u: string) => (TM_TILES.find((t) => t.id === u) || { label: "" }).label;
    return (
      <g>
        {TM_BINS.map((b, k) => { const B = binBox(k), lit = litBin(b.id); return (
          <g key={b.id} filter="url(#tm-shadow)">
            <rect x={B.x} y={B.y} width={B.w} height={B.h} rx={18} fill="url(#tm-grad-bin)" stroke={lit ? TM_C.amber : "#8A6A45"} strokeWidth={lit ? 7 : 3.2} />
            <rect x={B.x + 4} y={B.y + B.h - 76} width={B.w - 8} height={72} rx={14} fill="#E5CE9F" stroke="#7A5A35" strokeWidth={1.5} />
            <text x={B.x + B.w / 2} y={B.y + B.h - 20} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx(b.label)}</text>
          </g>); })}
        {S.tiles && TM_TILES.map((t, k) => { const B = tileBox(k), on = isDemo && stepOn === "tile-" + t.id; return (
          <g key={t.id} {...piece("tile", t.id, tx(t.label))} opacity={isLive("tile", t.id) ? 0.35 : 1}>
            {tmTile(t.id, B.x, B.y, B.w, B.h, tx, TM_C.violet, lang === "hi" ? T.micro : undefined)}
            {on && invite(B)}
          </g>); })}
        {(S.ids || []).map((id: string) => { const c = S.cards[id], b = cardBox(id), on = isDemo && stepOn === "card-" + id; return (
          <g key={id}>
            <g {...piece("card", id, tx(TM_CARDS[id].label))} opacity={isLive("card", id) ? 0.35 : 1}>{tmCardArt(id, b.x, b.y, b.w, b.h, tx, litCard(id), dm >= 4 && it && it.kind === "sort" && !c.bin)}</g>
            {c.unit && c.bin && tmTile(c.unit, b.x, b.y + b.h + 8, b.w, 54, tx, TM_C.violet, lang === "hi" ? T.micro : undefined)}
            {on && invite(b)}
          </g>); })}
        {live && live.payload.t === "card" && <g pointerEvents="none" opacity={0.92}>{tmCardArt(live.payload.id, live.x - ox - 100, live.y - 56, 200, 112, tx)}</g>}
        {live && live.payload.t === "tile" && <g pointerEvents="none" opacity={0.92}>{tmTile(live.payload.id, live.x - ox - 68, live.y - 38, 136, 76, tx)}</g>}
        {dm >= 4 && it && it.kind === "sort" && (
          <g pointerEvents="none" filter="url(#tm-shadow)">
            {[["fence", "m", 0], ["grass", "sqm", 1], ["water", "cum", 2]].map(([id, u0, k]: any) => { const B = binBox(k), mine = S.cards[id] && S.cards[id].unit, u = mine && TM_KIND[id][1].indexOf(mine) >= 0 ? mine : u0; return (
              <g key={id}>
                <rect x={B.x} y={8} width={B.w} height={122} rx={16} fill={TM_C.white} stroke={TM_C.green} strokeWidth={4} />
                <text x={B.x + B.w / 2} y={50} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TM_C.line}>{tx(TM_CARDS[id].label)}</text>
                <text x={B.x + B.w / 2} y={112} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={shade(TM_C.green, 0.25)}>{tx(unitLab(u))}</text>
              </g>); })}
          </g>
        )}
        {dm >= 3 && it && it.kind === "pick" && (() => { const B = binBox(TM_BINS.findIndex((q) => q.id === answerBin(it.card))); const lab = it.card === "grass" ? "Area" : "cu. cm";
          return chip(B.x + B.w / 2, B.y + 128, tx(lab), TM_C.green, 200); })()}
      </g>
    );
  };

  const won = stage === "win" || stage === "idle";
  /* the one gentle ring on a question: the next act still to do (an object to lower, Mark level, the Push stick) */
  const nextOn = stage === "ask" && it && left > 0 && !acting && S.jars ? (() => {
    const onMat = (S.mat || []).find((id: string) => S.objs[id].where === "mat");
    if (it.kind === "jars2" || it.kind === "calc") return onMat ? "obj-" + onMat : "mark";
    if (it.kind === "cork") return !S.jars[0].marks.length ? "mark" : !S.objs.cork.under ? "push" : "mark";
    if (it.kind === "ballpush") return "push";
    return "mark";
  })() : null;
  const ringOn = (id: string) => (isDemo && stepOn === id) || nextOn === id;

  const drawP2 = () => {
    const tf = trayFit(), [l, w, h] = TR2.d;
    const trayCubes = TR2.L >= 1 ? tmIso(l, w, h, tf.x, tf.y, tf.b, skin2, { key: "t" }).els : [];
    const leftN = TR2.L >= 1 ? TR2.left : S.cubes;
    const heap: any[] = [];
    for (let q = 0; q < leftN; q++) { const r = Math.floor(q / 6), c = q % 6; heap.push(...tmIso(1, 1, 1, 625 + c * 44, 282 + r * 28, 12, skin2, { key: "h" + q, lit: TM_C.rose }).els); }
    const legend = tmIso(1, 1, 1, 0, 2, 14, skin2, { key: "u" }).els;
    const shapes = tmShapes(S.cubes);
    const have = (S.shelf || []).map((e: any) => e.sk);
    const missing = shapes.filter((d) => have.indexOf(tmSk(d)) < 0);
    const isCount = it && it.kind === "count", isTurn = it && it.kind === "turn";
    /* a right answer shows every cuboid too (the picture agrees with the number), as the correction does */
    const showAll = isCount && (dm >= 2 || won), greenAll = isCount && (dm >= 3 || won);
    const mini = (d: number[], k: number, opt: any = {}) => { const sb = slotBox(k), b = tmFitB(d[0], d[1], d[2], 196, opt.pill ? 64 : 130, 15), r = tmIso(d[0], d[1], d[2], 0, 0, b, skin2, { key: "m" + k + (opt.key || ""), sw: 1, lit: opt.lit });
      return <g transform={`translate(${sb.x + (sb.w - r.w) / 2 + (opt.dx || 0)},${sb.y + sb.h - 2 - r.h + (opt.dy || 0)})`}>{r.els}</g>; };
    const kz = keys2();
    const rowChip = (s: string) => { const fs = s.length <= 14 && lang !== "gu" ? T.prompt : T.label, cw = Math.max(356, s.length * fs * 0.56 + 48); return (
      <g pointerEvents="none">
        <rect x={276} y={0} width={cw} height={60} rx={14} fill={TM_C.white} stroke={TM_C.green} strokeWidth={4} />
        <text x={276 + cw / 2} y={fs === T.prompt ? 45 : lang === "gu" ? 39 : 41} textAnchor="middle" fontSize={fs} fontWeight={700} fill={shade(TM_C.green, 0.25)}>{s}</text>
      </g>); };
    const longTxt = tx("Long") + " " + TR2.L, longW = Math.max(170, longTxt.length * 23 + 34);
    return (
      <g>
        {/* the chip row above the tray: the unit cube, the length the cubes make, the answer */}
        {legend}
        <text x={60} y={44} fontSize={T.prompt} fontWeight={700} fill={shade(TM_C.violet, 0.25)}>{tx("Unit cube")}</text>
        {TR2.L >= 1 && !S.turnOnly && !(isCount && (dm >= 3 || won)) && <g pointerEvents="none">
          <rect x={290} y={0} width={longW} height={60} rx={14} fill={TM_C.white} stroke={TM_C.blue} strokeWidth={3} />
          <text x={290 + longW / 2} y={lang === "en" ? 44 : 45} textAnchor="middle" fontSize={lang === "en" ? T.prompt : T.label} fontWeight={700} fill={shade(TM_C.blue, 0.25)}>{longTxt}</text>
        </g>}
        {greenAll && rowChip(it.answer === 4 ? tx("4 different cuboids") : tx("3 different cuboids"))}
        {isTurn && (dm >= 3 || won) && rowChip(tx("Same cuboid, turned"))}
        {/* the tray: the cuboid fits inside its inner box */}
        <rect x={0} y={64} width={600} height={288} rx={18} fill="#F7F0E2" stroke={C.rule} strokeWidth={2.4} />
        <rect x={6} y={70} width={588} height={276} rx={14} fill="#EEDCC0" stroke="#997543" strokeWidth={1.5} opacity={0.5} />
        {trayCubes}
        {/* what is left over, beside the keys */}
        {leftN > 0 && <text x={751} y={274} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={shade(TM_C.rose, 0.35)}>{tx("Left over")}</text>}
        {heap}
        {/* the keys: dim while a hand is moving the cubes */}
        {kz.map((q: any) => (
          <g key={"k" + q.k}>
            <Key id={q.id} label={q.text} x={q.x} y={q.y} w={q.w} h={q.h} C={C} tone="key" disabled={q.off || acting} onClick={() => pressKey(q.id)}>
              <text y={11} textAnchor="middle" fontSize={lang !== "en" && (q.id === "wide" || q.id === "high") ? T.micro : T.label} fontWeight={700} fill={q.off || acting ? "#6B5E50" : toneInk("key", C.ink)}>{q.text}</text>
            </Key>
            {q.off && !acting && !isDemo && <Hit id="shelf-why" x={q.x} y={q.y} w={q.w} h={q.h} label={q.text} onPress={() => { touch(); say1(TM_NUDGES.trayNotFull); }} />}
            {ringOn(q.id) && invite(q)}
          </g>
        ))}
        {/* the shelf */}
        <rect x={0} y={500} width={TM_DW - 10} height={18} rx={5} fill="url(#tm-grad-shelf)" stroke={TM_C.line} strokeWidth={2.4} filter="url(#tm-shadow)" />
        {(S.shelf || []).map((e: any, k: number) => { const sb = slotBox(k), litTwin = e.lit || (dm === 1 && isCount && e.twin) || (dm >= 2 && isTurn && k === 0);
          const pill = e.twin || (isTurn && (dm >= 2 || won)), own = greenAll ? TM_C.green : undefined; return (
          <g key={"s" + k} transform={`translate(0,${e.bump ? -12 : 0})`}>
            {mini(e.d, k, { pill, lit: own })}
            {(e.twin || (isTurn && (dm >= 1 || won))) && mini(isTurn && !e.twin ? TR2.d : e.d, k, { key: "tw", dx: 14, dy: -6, pill: true, lit: litTwin ? TM_C.amber : own })}
            {pill && <g pointerEvents="none">
              <rect x={Math.min(TM_DW - 254, Math.max(0, sb.x + sb.w / 2 - 127))} y={sb.y - 4} width={254} height={52} rx={14} fill={TM_C.white} stroke={litTwin ? TM_C.amber : TM_C.violet} strokeWidth={3} />
              <text x={Math.min(TM_DW - 254, Math.max(0, sb.x + sb.w / 2 - 127)) + 127} y={sb.y + (lang === "en" ? 34 : 37)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(litTwin ? TM_C.amber : TM_C.violet, 0.35)}>{tx("Same cuboid")}</text>
            </g>}
          </g>); })}
        {showAll && <g pointerEvents="none">{missing.map((d, q) => <g key={"g" + q}>{mini(d, (S.shelf || []).length + q, { key: "g", lit: greenAll ? TM_C.green : TM_C.amber })}</g>)}</g>}
      </g>
    );
  };

  const drawJars = () => {
    const isCalc = !!S.calc;
    const big = it && it.kind === "jars2" ? Math.max(0, it.objs.indexOf(it.answer)) : -1;
    const showGreater = big >= 0 && (dm >= 3 || won);
    return (
      <g>
        {S.jars.map((J: any, j: number) => {
          const I = tmIn(J), wt = I.ib - S.lv[j], L0y = I.ib - S.L0, lastM = J.marks.length ? J.marks[J.marks.length - 1] : null;
          /* the correction lights each rise SOLID amber in turn; the right answer turns it green again */
          const litRise = it && it.kind === "jars2" && !won && ((dm === 1 && j === 0) || (dm === 2 && j === 1) || (dm >= 3 && j === big));
          const o = J.obj && S.carry !== J.obj ? objIn(J.obj, j) : null;
          return (
            <g key={"j" + j}>
              {tmJarBack(J.x, J.y, J.w, J.h)}
              {tmWater("tm-jw-" + j, J.x, J.y, J.w, J.h, wt, 0.5)}
              {lastM !== null && lastM !== S.L0 && <rect x={I.ix} y={I.ib - lastM} width={I.iw} height={lastM - S.L0} fill={litRise ? TM_C.amber : TM_C.green}
                fillOpacity={litRise ? 0.9 : 0.6} stroke={litRise ? shade(TM_C.amber, 0.4) : shade(TM_C.green, 0.25)} strokeWidth={3} />}
              {/* the object AFTER the water, in its own colours; a thin veil over it says it is under water */}
              {o && tmObjArt(J.obj, o.x, o.y, o.s)}
              {o && <g clipPath={`url(#tm-jw-${j})`} pointerEvents="none"><rect x={I.ix} y={wt} width={I.iw} height={I.ib - wt} fill="#6FB9E6" fillOpacity={0.14} /></g>}
              <line x1={I.ix - 2} y1={L0y} x2={I.ix + I.iw + 2} y2={L0y} stroke={TM_C.line} strokeWidth={4} />
              {J.marks.map((m: number, q: number) => <line key={q} x1={I.ix - 2} y1={I.ib - m} x2={I.ix + I.iw + 2} y2={I.ib - m} stroke="#2B2B2B" strokeWidth={4} strokeDasharray={q < J.marks.length - 1 ? "10 6" : undefined} />)}
              {o && S.objs[J.obj].under && TM_OBJ[J.obj].float != null && (
                <g pointerEvents="none">
                  <rect x={o.x - 6} y={J.y - 14} width={12} height={o.y - o.oh / 2 - J.y + 14} rx={5} fill="url(#tm-grad-stick)" stroke={TM_C.line} strokeWidth={2} />
                  <circle cx={o.x} cy={J.y - 14} r={11} fill="#A97C45" stroke={TM_C.line} strokeWidth={2} />
                </g>)}
              {tmJarFront(J.x, J.y, J.w, J.h)}
              {S.free && J.obj && <rect {...piece("obj", J.obj, tx(TM_OBJ[J.obj].label))} x={J.x + 10} y={J.y + 30} width={J.w - 20} height={J.h - 50} fill="transparent" />}
              {showGreater && j === big && o && <ellipse cx={o.x} cy={o.y - 4} rx={(TM_OBJW[J.obj] || 100) * o.s / 2 + 10} ry={o.oh / 2 + 4} fill="none" stroke={TM_C.green} strokeWidth={5} pointerEvents="none" />}
              {showGreater && j === big && <text x={J.x + J.w / 2} y={J.y + J.h + (lang === "gu" ? 44 : 38)} textAnchor="middle" fontSize={lang === "gu" ? T.speech : T.label} fontWeight={700} fill={shade(TM_C.green, 0.25)} pointerEvents="none">{tx("Greater volume")}</text>}
            </g>
          );
        })}
        {/* the scaled jar: a cm scale (every 2nd number at 40) and the base card */}
        {isCalc && (() => { const J0 = S.jars[0], I = tmIn(J0), lastM = J0.marks.length ? J0.marks[J0.marks.length - 1] : null; return (
          <g>
            {Array.from({ length: 10 }, (_, q) => q + 1).map((cm) => (
              <g key={cm}>
                <line x1={J0.x - 22} y1={I.ib - cm * TM_CM} x2={J0.x - 4} y2={I.ib - cm * TM_CM} stroke={TM_C.line} strokeWidth={cm % 2 ? 2.4 : 3.6} />
                {cm % 2 === 0 && <text x={J0.x - 30} y={I.ib - cm * TM_CM + 14} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={TM_C.line}>{cm}</text>}
              </g>))}
            <text x={J0.x - 30} y={J0.y + 32} textAnchor="end" fontSize={T.label} fontWeight={700} fill={TM_C.line}>{tx("cm")}</text>
            <rect x={520} y={20} width={360} height={130} rx={16} fill={TM_C.white} stroke={TM_C.blue} strokeWidth={4} filter="url(#tm-shadow)" />
            <text x={700} y={lang === "gu" ? 70 : 66} textAnchor="middle" fontSize={lang === "gu" ? T.speech : T.label} fontWeight={700} fill={shade(TM_C.blue, 0.25)}>{tx("Base of the jar")}</text>
            <text x={700} y={128} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={shade(TM_C.blue, 0.25)}>{tx("20 sq. cm")}</text>
            {dm >= 1 && lastM !== null && [1, 2, 3].filter((q) => q <= Math.min(dm, 3)).map((q) => (
              <g key={"c" + q} pointerEvents="none">
                <rect x={I.ix + I.iw + 10} y={I.ib - (4 + q) * TM_CM + 2} width={14} height={TM_CM - 4} fill={TM_C.amber} rx={2} />
                <text x={I.ix + I.iw + 32} y={I.ib - (3.5 + q) * TM_CM + 11} fontSize={T.label} fontWeight={700} fill={shade(TM_C.amber, 0.45)}>{q === 3 ? tx("3 cm") : String(q)}</text>
              </g>))}
            {dm >= 4 && chip(700, 168, tx("3 cm") + " × " + tx("20 sq. cm"), TM_C.green, 360)}
            {dm >= 4 && chip(700, 236, tx("Volume 60 cu. cm"), TM_C.green, 360)}
          </g>); })()}
        {/* the objects waiting on the mat */}
        {(S.mat || []).filter((id: string) => S.objs[id].where === "mat" && S.carry !== id).map((id: string) => { const p = matPos(id), kw = id === "key" ? 80 : 70, B = { x: p.x - kw, y: p.y - 60, w: 2 * kw, h: 120 }; return (
          <g key={"o" + id} {...piece("obj", id, tx(TM_OBJ[id].label))} opacity={isLive("obj", id) ? 0.35 : 1}>
            <rect x={B.x} y={B.y} width={B.w} height={B.h} rx={16} fill="transparent" />
            {ringOn("obj-" + id) && invite(B)}
            {tmObjArt(id, p.x, p.y, id === "key" ? 0.82 : 1)}
          </g>); })}
        {live && live.payload.t === "obj" && <g pointerEvents="none">{tmObjArt(live.payload.id, live.x - ox, live.y, 0.9)}</g>}
        {/* the Push stick, its label 12+ clear of its ring */}
        {S.stick && pushJar() >= 0 && !isLive("stick", "s") && (
          <g {...piece("stick", "s", tx("Push stick"))}>
            <rect x={stickX - 38} y={100} width={76} height={320} rx={14} fill="transparent" />
            <rect x={stickX - 6} y={120} width={12} height={290} rx={5} fill="url(#tm-grad-stick)" stroke={TM_C.line} strokeWidth={2} />
            <circle cx={stickX} cy={120} r={12} fill="#A97C45" stroke={TM_C.line} strokeWidth={2} />
            {ringOn("push") && invite({ x: stickX - 38, y: 100, w: 76, h: 320 })}
          </g>
        )}
        {live && live.payload.t === "stick" && <rect x={live.x - ox - 6} y={live.y - 140} width={12} height={290} rx={5} fill="url(#tm-grad-stick)" stroke={TM_C.line} strokeWidth={2} pointerEvents="none" />}
        {S.stick && pushJar() >= 0 && <text x={stickX} y={58} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink} pointerEvents="none">{tx("Push stick")}</text>}
        {/* Mark level: dim while a hand or the pencil moves, or when there is nothing new to mark */}
        {(() => { const off = markJar() < 0, B = { x: 600, y: 436, w: 260, h: 72 }, empty = !S.jars.some((q: any) => q.obj); return (
          <g>
            <Key id="mark" label={tx("Mark level")} x={B.x} y={B.y} w={B.w} h={B.h} C={C} tone="key" disabled={off || acting} onClick={doMark}>
              <text y={lang === "gu" ? 14 : 11} textAnchor="middle" fontSize={lang === "gu" ? T.speech : T.label} fontWeight={700} fill={off || acting ? "#6B5E50" : toneInk("key", C.ink)}>{tx("Mark level")}</text>
            </Key>
            {off && empty && !acting && !isDemo && <Hit id="mark-why" x={B.x} y={B.y} w={B.w} h={B.h} label={tx("Mark level")} onPress={() => { touch(); say1(TM_NUDGES.jarEmpty); }} />}
            {ringOn("mark") && invite(B)}
          </g>); })()}
        {/* phase 4's traceback: the floating rise, then the full rise, then the reason */}
        {dm >= 1 && it && (it.kind === "cork" || it.kind === "ballpush" || it.kind === "ballmark") && (() => {
          const J = S.jars[0], I = tmIn(J), o = TM_OBJ[it.obj], fl = S.L0 + o.float, fu = S.L0 + o.vol;
          const msg = it.kind === "cork" ? "Push it under first" : it.kind === "ballpush" ? "Only part was under" : "Not the whole ball";
          return (
            <g pointerEvents="none">
              <rect x={I.ix} y={I.ib - fl} width={I.iw} height={fl - S.L0} fill={TM_C.amber} fillOpacity={0.85} stroke={shade(TM_C.amber, 0.4)} strokeWidth={4} />
              <text x={J.x + J.w + 18} y={I.ib - fl + 44} fontSize={T.prompt} fontWeight={700} fill={shade(TM_C.amber, 0.45)}>{tx("Floating")}</text>
              {dm >= 2 && <g>
                <line x1={I.ix - 2} y1={I.ib - fu} x2={I.ix + I.iw + 2} y2={I.ib - fu} stroke={TM_C.green} strokeWidth={6} />
                <text x={J.x + J.w + 18} y={I.ib - fu - 8} fontSize={T.prompt} fontWeight={700} fill={shade(TM_C.green, 0.25)}>{tx("Fully under")}</text>
              </g>}
              {dm >= 3 && chip(720, 20, tx(msg), TM_C.green, 330)}
            </g>);
        })()}
      </g>
    );
  };

  return (
    <g transform={`translate(${ox},0)`} onPointerDownCapture={(e: any) => { if (e.isTrusted) touch(); }}>
      {tmDefs()}
      {n === 1 && !free ? drawP1() : n === 2 && !free ? drawP2() : drawJars()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: a picture of what was found
   (a number in digits; word answers drawn, so no language shows a Latin letter) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item = it || last.it || (PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[last.item]) || {};
  const v = String(last.value), cy = h / 2;
  const fr = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  const sq = (x: number, k: number, fill: string) => <g key={"q" + k + x}>{[0, 1].map((r) => [0, 1].map((c) => <rect key={r + "-" + c} x={x + c * 18} y={cy - 18 + r * 18} width={18} height={18} fill={fill} stroke={TM_C.line} strokeWidth={1.6} />))}</g>;
  const jar = (x: number, obj: string, under: boolean) => (
    <g>
      <rect x={x} y={cy - 30} width={44} height={60} rx={8} fill="#F6E8CF" stroke="#A8732A" strokeWidth={2} />
      <rect x={x + 3} y={cy - 6} width={38} height={33} rx={5} fill={TM_C.water} fillOpacity={0.55} />
      {tmObjArt(obj, x + 22, under ? cy + 10 : cy - 6, 0.28)}
    </g>);
  let pic: any = null;
  if (item.kind === "sort") pic = <g><line x1={20} y1={cy} x2={70} y2={cy} stroke={TM_C.verm} strokeWidth={5} strokeLinecap="round" />{sq(90, 1, "#8CCB7E")}{tmIso(2, 1, 2, 150, cy - 30, 9, false, { key: "ts" }).els}</g>;
  else if (item.kind === "pick") pic = v === "area" ? <g>{sq(40, 2, "#8CCB7E")}{sq(84, 3, "#8CCB7E")}</g> : <g>{tmIso(2, 2, 2, 40, cy - 36, 10, false, { key: "tp" }).els}</g>;
  else if (item.kind === "turn") pic = <g>{tmIso(5, 2, 1, 16, cy - 20, 5, false, { key: "ta" }).els}{tmIso(2, 1, 5, 120, cy - 34, 5, false, { key: "tb" }).els}</g>;
  else if (item.kind === "jars2") pic = <g>{jar(30, v, false)}{tmObjArt(v, 140, cy, 0.5)}</g>;
  else if (item.kind === "cork" || item.kind === "ballpush" || item.kind === "ballmark") pic = <g>{jar(30, item.obj, true)}<rect x={90} y={cy - 4} width={70} height={8} rx={4} fill={TM_C.green} /></g>;
  const num = typeof item.answer === "number";
  return (
    <g>
      {tmDefs()}
      {fr}
      {pic || tmIso(1, 1, 1, 14, cy - 20, 10, false, { key: "th" }).els}
      {num && <text x={w - 14} y={cy + 13} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{v}</text>}
    </g>
  );
}

function ThreeMeasures(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default ThreeMeasures;