/* ═══ M1.S3.T7.C33.2D1 · capacity_converter · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): every line is printed on the bubble.
   THE NEW LOOK (keyOnly, navDots; LAYOUT §1d-§1e, PATTERNS §15-§16): the question lives only in the bubble.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   THE OWNER'S DESCRIPTION wins over the plan brief's phase titles (ch 9 NOTES.md "TOOLS 2 TO 6"):
     1 litres into millilitres on labelled measuring jugs (Pour: each litre fills a jug to its 1 L line, 1,000 mL);
     2 millilitres into litres and the millilitres left (Group: 1,000 mL a jug, the part jug ringed amber "Left");
     3 adding and subtracting on a litres | millilitres column board (Carry or Borrow, both keys shown, the child decides);
     4 filling a larger jar with a small cup (Pour, one cup a tap, a counter), the child types the cups.
   ANSWER GATED BY THE ACT (PATTERNS 19; guide.answerGate for the sidecar is MODEL.answerGate): every question is gated.
   MISS HIDES THE ANSWER (strict): each correction replays the act's end state and the count and stops ONE step short;
   whatever shows the answer carries data-reveals="answer" and is drawn only at the win; scales carry data-scale. */

const TOOL_ID = "capacity_converter";
const MEDIA_ID = "M1.S3.T7.C33.2D1";
const TOOL_NAME = "Capacity Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["Litre jugs, a column board and a cup to pour with."];
/* the whole-tool line (r44: no longer shown) */
const FINISH_LINE = "You changed litres and millilitres, added and subtracted in columns, and filled a jar cup by cup.";
/* printed when the child opens Free play: free play is the jar and the cup of phase 4 */
const FREE_LINE = "Free play: pour cups into the big jar and count them as it fills.";

/* THE START PAGE (runtime r28; LAYOUT §1c) */
const START_HOOK = "How many millilitres does a 1 litre jug hold?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const by = box.h - 20;
  return (
    <g>
      {ccPic("sa-b", "bucket", 300, by, 230, 230)}
      {ccJug("sa-j", 500, by - 300, 243, 1000, { tx, mid: true })}
      {ccPic("sa-c", "cup", 930, by, 150, 160)}
    </g>
  );
}

/* Hindi and Gujarati (PATTERNS §11): filled in the language pass, after the English is final. Work, Thumb and format draw
   every word through tx(); the item `win` lines and the nudges need their entries by hand then (data-borne / api.say). */
const TR: any = { hi: {}, gu: {} };

/* ── the pictures and their numbers ───────────────────────────────────────────────────────── */
const CC_BLUE = "#0072B2";     /* Given: the amount the question gives */
const CC_GREEN = "#009E73";    /* Answer: only at the win */
const CC_VERM = "#D55E00";     /* Unit fact */
const CC_AMBER = "#E69F00";    /* Left, carried, borrowed */
const CC_WATER = "#4FA3E0";
const CC_JUICE = "#F2A33A";
const CC_INK = "#2B2B2B";
const CC_GLASS = "#93A1AD";
const CC_SW = 900;             /* every scene is laid out 900 wide (the panel-open room), centred in the shut room */
const CC_KINDS = ["lit", "grp", "col", "pour"];
/* the clear glass jug photo (`jug`, 200 x 247): its interior profile, as fractions of the picture (x from the left, y from the
   top), left wall top to bottom, then right wall bottom to top; the scale is ONE linear function: y = 0.842 - 0.682 * mL / 1000 */
const CC_JUG = { w: 200, h: 247, floor: 0.842, per: 0.682 };
const CC_JUG_L = [[0.205, 0.02], [0.085, 0.085], [0.175, 0.15], [0.195, 0.22], [0.195, 0.29], [0.17, 0.36], [0.14, 0.43], [0.115, 0.5], [0.1, 0.57], [0.1, 0.64], [0.11, 0.7], [0.19, 0.77], [0.24, 0.842]];
const CC_JUG_R = [[0.64, 0.842], [0.67, 0.77], [0.69, 0.7], [0.695, 0.64], [0.685, 0.57], [0.68, 0.5], [0.655, 0.43], [0.63, 0.36], [0.61, 0.29], [0.595, 0.22], [0.605, 0.15], [0.6, 0.085], [0.605, 0.02]];
const ccJugY = (ml: number) => CC_JUG.floor - (CC_JUG.per * ml) / 1000;
const ccWall = (fy: number) => {
  for (let i = 0; i < CC_JUG_L.length - 1; i++) {
    const [x0, y0] = CC_JUG_L[i], [x1, y1] = CC_JUG_L[i + 1];
    if (fy >= y0 && fy <= y1) return x0 + ((x1 - x0) * (fy - y0)) / (y1 - y0);
  }
  return CC_JUG_L[CC_JUG_L.length - 1][0];
};
/* the photos' own sizes (images.json made.w x made.h): every skin is drawn in a box of its own aspect */
const CC_PIC: any = { bucket: [200, 182], drum: [154, 200], bottle: [84, 260], cup: [124, 150], jug: [200, 247] };
const ccFit = (name: string, mw: number, mh: number) => {
  const [w, h] = CC_PIC[name];
  const s = Math.min(mw / w, mh / h);
  return [w * s, h * s];
};
/* a label's width at a size, counting a Devanagari or Gujarati sign that takes no room as nothing (PATTERNS 18) */
const ccTW = (s: string, size: number) => {
  let n = 0;
  for (const ch of String(s)) {
    const c = ch.codePointAt(0) || 0;
    if ((c >= 0x900 && c <= 0x902) || c === 0x93c || (c >= 0x941 && c <= 0x948) || c === 0x94d || (c >= 0x951 && c <= 0x957) || c === 0x962 || c === 0x963 ||
      (c >= 0xa81 && c <= 0xa82) || c === 0xabc || (c >= 0xac1 && c <= 0xac8) || c === 0xacd || c === 0xae2 || c === 0xae3) continue;
    n += ch === " " || ch === "," || ch === "." ? 0.3 : ch === "=" ? 0.62 : 0.6;
  }
  return n * size;
};
/* an amount as the book writes it: "1 L 750 mL", "2 L", "600 mL", "2,600 mL" (every unit through tx) */
const ccLM = (L: number, ml: number, tx: any) =>
  L > 0 && ml > 0 ? L + " " + tx("L") + " " + ml + " " + tx("mL") : L > 0 ? L + " " + tx("L") : indian(ml) + " " + tx("mL");
const ccML = (ml: number, tx: any) => indian(ml) + " " + tx("mL");

/* a tag: a coloured edge and a light fill, the text in the colour's deep ink */
const ccTag = (k: string, x: number, y: number, w: number, h: number, text: string, col: string, size: number, extra?: any) => (
  <g key={k} {...(extra || {})}>
    <rect x={x} y={y} width={w} height={h} rx={14} fill={tint(col, 0.86)} stroke={col} strokeWidth={4} />
    <text x={x + w / 2} y={y + h / 2 + size * 0.35} textAnchor="middle" fontSize={size} fontWeight={700} fill={shade(col, 0.5)}>{text}</text>
  </g>
);

/* the clear measuring jug: the water behind (clipped to the interior), the photo, then the scale on the cream at the LEFT */
function ccJug(k: string, x: number, y: number, w: number, ml: number, o: any = {}) {
  const h = (w * CC_JUG.h) / CC_JUG.w;
  const tx = o.tx || ((v: any) => v);
  const pt = (fx: number, fy: number) => (x + fx * w).toFixed(1) + " " + (y + fy * h).toFixed(1);
  const d = "M " + CC_JUG_L.concat(CC_JUG_R).map(([fx, fy]: any) => pt(fx, fy)).join(" L ") + " Z";
  const fl = y + h * CC_JUG.floor;
  const lv = y + h * ccJugY(Math.max(0, Math.min(ml, 1000)));
  const liq = o.liq || CC_WATER;
  const oneY = y + h * ccJugY(1000);
  const oneT = "1 " + tx("L");
  const pw = Math.max(56, ccTW(oneT, 32) + 12);
  const midY = y + h * ccJugY(500);
  const midT = "500 " + tx("mL");
  const mw = ccTW(midT, 32) + 20;
  const midR = x + ccWall(ccJugY(500)) * w - 22;
  return (
    <g key={k}>
      <defs><clipPath id={"ccj-" + k}><path d={d} /></clipPath></defs>
      {/* the plain fallback: a light glass outline, a handle and a base (the photo lies over it) */}
      <path d={d} fill="#FFFFFF" fillOpacity={0.25} stroke={CC_GLASS} strokeWidth={2.5} strokeLinejoin="round" />
      <path d={"M " + pt(0.62, 0.3) + " C " + pt(0.99, 0.3) + " " + pt(0.99, 0.7) + " " + pt(0.67, 0.72)} fill="none" stroke={CC_GLASS} strokeWidth={5} strokeLinecap="round" />
      <rect x={x + 0.22 * w} y={fl} width={0.44 * w} height={0.14 * h} rx={6} fill="#E3E8EC" stroke={CC_GLASS} strokeWidth={2} />
      {ml > 0 && (
        <g clipPath={"url(#ccj-" + k + ")"}>
          <rect x={x} y={lv} width={w} height={Math.max(0, fl - lv)} fill={liq} fillOpacity={0.55} />
          <line x1={x} y1={lv} x2={x + w} y2={lv} stroke={shade(liq, 0.3)} strokeWidth={2.5} />
        </g>
      )}
      <Skin name="jug" x={x} y={y} w={w} h={h} />
      {o.ring && <rect x={x - 8} y={y - 8} width={w + 16} height={h + 16} rx={18} fill="none" stroke={CC_AMBER} strokeWidth={5} />}
      <g data-scale="jug">
        {[250, 500, 750, 1000].map((m) => {
          const fy = ccJugY(m), wx = x + ccWall(fy) * w, yy = y + fy * h, L = m === 1000 ? 16 : 10;
          return <line key={m} x1={wx - 3 - L} y1={yy} x2={wx - 3} y2={yy} stroke={CC_INK} strokeWidth={m === 1000 ? 3.5 : 2.5} strokeLinecap="round" />;
        })}
        <rect x={x + 2 - pw} y={oneY - 20} width={pw} height={40} rx={20} fill="#FFF8EA" stroke={CHROME.rule} strokeWidth={2} />
        <text x={x + 2 - pw / 2} y={oneY + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK}>{oneT}</text>
        {o.mid && <rect x={midR - mw} y={midY - 20} width={mw} height={40} rx={20} fill="#FFF8EA" stroke={CHROME.rule} strokeWidth={2} />}
        {o.mid && <text x={midR - mw / 2} y={midY + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK}>{midT}</text>}
      </g>
    </g>
  );
}

/* a container photo (bucket, drum, bottle, cup) standing on `bottom`, in a box of its own aspect, the plain shape under it */
function ccPic(k: string, name: string, cx: number, bottom: number, mw: number, mh: number) {
  const [w, h] = ccFit(name, mw, mh);
  const x = cx - w / 2, y = bottom - h;
  let plain: any = null;
  if (name === "bucket") plain = <path d={`M ${x + w * 0.06} ${y + h * 0.1} L ${x + w * 0.94} ${y + h * 0.1} L ${x + w * 0.82} ${y + h} L ${x + w * 0.18} ${y + h} Z`} fill="#F4C542" stroke="#B48A12" strokeWidth={3} />;
  else if (name === "drum") plain = <g><rect x={x + w * 0.06} y={y + h * 0.08} width={w * 0.88} height={h * 0.92} rx={18} fill="#B8663F" stroke="#7A3F22" strokeWidth={3} /><rect x={x + w * 0.3} y={y} width={w * 0.4} height={h * 0.1} rx={6} fill="#8E4A2A" /></g>;
  else if (name === "bottle") plain = <g><rect x={x + w * 0.12} y={y + h * 0.16} width={w * 0.76} height={h * 0.84} rx={w * 0.3} fill="#F39A2B" stroke="#A85E10" strokeWidth={3} /><rect x={x + w * 0.32} y={y} width={w * 0.36} height={h * 0.18} rx={6} fill="#C46A12" /></g>;
  else plain = <path d={`M ${x + w * 0.08} ${y + h * 0.04} L ${x + w * 0.92} ${y + h * 0.04} L ${x + w * 0.8} ${y + h} L ${x + w * 0.2} ${y + h} Z`} fill="#F7D33C" stroke="#B9971A" strokeWidth={3} />;
  return <g key={k}>{plain}<Skin name={name} x={x} y={y} w={w} h={h} /></g>;
}

/* a clear drinking glass, drawn in code, with its juice */
function ccGlass(k: string, cx: number, bottom: number, w: number, h: number, liq: string, full: boolean) {
  const x = cx - w / 2, y = bottom - h;
  const d = `M ${x} ${y} L ${x + w} ${y} L ${x + w * 0.86} ${y + h} L ${x + w * 0.14} ${y + h} Z`;
  const t = y + h * 0.14;
  const dl = `M ${x + w * 0.02} ${t} L ${x + w * 0.98} ${t} L ${x + w * 0.86} ${y + h - 3} L ${x + w * 0.14} ${y + h - 3} Z`;
  return (
    <g key={k}>
      {full && <path d={dl} fill={liq} fillOpacity={0.6} />}
      <path d={d} fill="#FFFFFF" fillOpacity={0.25} stroke={CC_GLASS} strokeWidth={3.5} strokeLinejoin="round" />
    </g>
  );
}

/* the big clear jar of phase 4, drawn in code: k px a millilitre, the water a pure function of the mL, the scale at its LEFT */
function ccJar(k: string, x: number, bottom: number, iw: number, cap: number, ml: number, kpx: number, liq: string, tx: any) {
  const top = bottom - cap * kpx;
  const lv = bottom - Math.min(ml, cap) * kpx;
  const ticks: number[] = [];
  for (let m = 250; m <= cap; m += 250) ticks.push(m);
  const pills: number[] = [];
  for (let m = 1000; m <= cap; m += 1000) pills.push(m);
  return (
    <g key={k}>
      <rect x={x - 10} y={top - 18} width={iw + 20} height={bottom - top + 30} rx={24} fill="#FFFFFF" fillOpacity={0.35} stroke={CC_GLASS} strokeWidth={4} />
      <rect x={x - 16} y={top - 24} width={iw + 32} height={14} rx={7} fill="#E7EDF1" stroke={CC_GLASS} strokeWidth={3} />
      {ml > 0 && <rect x={x} y={lv} width={iw} height={bottom - lv} rx={8} fill={liq} fillOpacity={0.55} />}
      {ml > 0 && <line x1={x + 2} y1={lv} x2={x + iw - 2} y2={lv} stroke={shade(liq, 0.3)} strokeWidth={2.5} />}
      <rect x={x} y={top} width={iw} height={bottom - top} rx={8} fill="none" stroke={tint(CC_GLASS, 0.3)} strokeWidth={1.5} />
      <g data-scale="jar">
        {ticks.map((m) => <line key={m} x1={x - 12 - (m % 1000 === 0 ? 18 : 10)} y1={bottom - m * kpx} x2={x - 12} y2={bottom - m * kpx} stroke={CC_INK} strokeWidth={m % 1000 === 0 ? 3.5 : 2.5} strokeLinecap="round" />)}
        {pills.map((m) => {
          const t = m / 1000 + " " + tx("L"), pw = Math.max(58, ccTW(t, 32) + 20), yy = bottom - m * kpx;
          return (
            <g key={"p" + m}>
              <rect x={x - 32 - pw} y={yy - 20} width={pw} height={40} rx={20} fill="#FFF8EA" stroke={CHROME.rule} strokeWidth={2} />
              <text x={x - 32 - pw / 2} y={yy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK}>{t}</text>
            </g>
          );
        })}
      </g>
    </g>
  );
}

/* the current question, for `format` (it is not told which question is up: PATTERNS 12) */
let CC_NOW: any = null;
/* free play: the 2 L jar and a 250 mL cup */
const CC_FREE: any = { kind: "pour", cup: 250, cap: 2000, small: "cup", big: "jar" };
const ccFresh = (ek: number) => ({ ek, fill: 0, done: false, carry: false, borrow: false, pours: 0, cwk: 0, corr: false, ck: 0, carrying: false });

/* One entry per phase = one mount. */
const PHASES = [
  {
    n: 1,
    concept: "Litres into millilitres: multiply by 1000",
    conceptId: "M1.S3.T7.C33", objectiveIds: ["O11"],
    says: ["Each litre jug fills to its 1 L line."],
    /* the warm-up (guide steps work it, never question 1): 2 L into two jugs, ending on 2,000 mL */
    warm: [{ kind: "lit", L: 2, ml: 0, box: "bottle" }], stepWarm: [0],
    steps: [{ say: "Tap Pour to fill litre jugs from this 2 L bottle.", on: "pour", hint: "The Pour key is under the empty jugs." }],
    ladder: ["Count 1,000 mL for every full jug.", "Multiply the litres by 1,000 to get the millilitres."],
    closing: "One litre equals 1,000 millilitres.",
    learned: "You learned: 1 L is 1,000 mL, so multiply the litres by 1,000.",
    traceback: "The jugs fill again one by one, each chip turning from 1 L to 1,000 mL, and the count stops one jug before the end.",
    items: [
      /* authored: the plan's 19 L, 28 L and 37 L would need 19 to 37 jugs, too small for the 1,000 mL chip on each (the owner's "show each litre becoming 1,000 millilitres") */
      { qid: null, kind: "lit", L: 3, ml: 0, box: "bucket", near: 300,
        say: "This bucket holds 3 L of water: how many millilitres is that?", ask: "3 L in mL?", answer: 3000,
        miss: "Each full jug holds 1,000 mL.",
        ladder: ["Look at the chip under every full jug.", "Three jugs of 1,000 mL: add them up."],
        win: "Yes, three jugs of 1,000 mL make 3,000 mL." },
      { qid: null, kind: "lit", L: 1, ml: 750, box: "bottle", liq: "juice", near: 750,
        say: "A bottle has 1 L 750 mL of juice: how many millilitres is that?", ask: "1 L 750 mL in mL?", answer: 1750,
        miss: "Change the 1 L into millilitres first.",
        ladder: ["The full jug is 1,000 mL and the other jug has 750 mL.", "Add 1,000 mL and 750 mL together."],
        win: "Yes, 1 L 750 mL is 1,750 mL." },
      { qid: null, kind: "lit", L: 2, ml: 50, box: "drum", near: 250,
        say: "There are 2 L 50 mL of water in this drum: how many millilitres is that?", ask: "2 L 50 mL in mL?", answer: 2050,
        miss: "50 mL has no hundreds.",
        ladder: ["Write 2 for the thousands, then think about the hundreds place.", "50 mL is 0 hundreds and 5 tens, so the hundreds digit is 0."],
        win: "Yes, 2 L 50 mL is 2,050 mL, with a 0 for the hundreds." },
    ],
  },
  {
    n: 2,
    concept: "Millilitres into litres: divide by 1000",
    conceptId: "M1.S3.T7.C34", objectiveIds: ["O11"],
    says: ["Every 1,000 mL fills one litre jug."],
    /* the warm-up: 1,500 mL, ending on 1 L and 500 mL left */
    warm: [{ kind: "grp", tot: 1500, box: "bucket" }], stepWarm: [0],
    steps: [{ say: "Tap Group to pour 1,000 mL of this water into each jug.", on: "group", hint: "The Group key is below the jugs." }],
    ladder: ["Full jugs are whole litres.", "The part jug shows the millilitres left."],
    closing: "Every 1,000 millilitres make one litre.",
    learned: "You learned: 1,000 mL make 1 L, so group millilitres in thousands.",
    traceback: "The jugs fill again 1,000 mL at a time, and the count stops one jug before the end, the part left over not yet poured.",
    items: [
      /* authored: the plan's 17,000, 31,000 and 26,000 mL have no millilitres left over (the owner's phase 2 asks for the
         part left) and need 17 to 31 jugs */
      { qid: null, kind: "grp", tot: 2600, box: "drum", near: [26, 0],
        parts: [{ label: "litres", unit: "L" }, { label: "left over", unit: "mL" }], answer: [2, 600],
        say: "Group the water in this drum into litres: how many litres and millilitres is it?", ask: "litres and mL left?",
        miss: "A jug filled to its 1 L line holds 1,000 mL.",
        ladder: ["Count the full jugs for the litres.", "Take away 1,000 mL for each full jug, then read what is left."],
        win: "Yes, 2,600 mL is 2 L and 600 mL left over." },
      { qid: null, kind: "grp", tot: 4000, box: "bucket", near: [40, 0],
        parts: [{ label: "litres", unit: "L" }, { label: "left over", unit: "mL" }], answer: [4, 0],
        say: "How many litres and millilitres of water are in this bucket?", ask: "litres and mL left?",
        miss: "Every 1,000 mL fills one jug.",
        ladder: ["Look at the last jug: is any water left over?", "If no water is left after the full jugs, there are no extra millilitres."],
        win: "Yes, 4,000 mL is exactly 4 L, with nothing left over." },
      { qid: null, kind: "grp", tot: 1080, box: "bottle", near: [1, 800],
        parts: [{ label: "litres", unit: "L" }, { label: "left over", unit: "mL" }], answer: [1, 80],
        say: "Change the water in this bottle into litres and the millilitres left over.", ask: "litres and mL left?",
        miss: "Fill the whole jugs first, then look at what is left.",
        ladder: ["What is left is less than 100 mL.", "The left over part has no hundreds, only tens."],
        win: "Yes, 1,080 mL is 1 L and 80 mL left over." },
    ],
  },
  {
    n: 3,
    concept: "Litres and millilitres together",
    conceptId: "M1.S3.T7.C35", objectiveIds: ["O11"],
    says: ["Write the litres and the millilitres in their own columns."],
    /* the warm-ups: a carry (1 L 600 mL + 2 L 700 mL = 4 L 300 mL), then a borrow (4 L 200 mL - 1 L 500 mL = 2 L 700 mL) */
    warm: [
      { kind: "col", op: "+", a: [1, 600], b: [2, 700], key: "carry", res: [4, 300] },
      { kind: "col", op: "-", a: [4, 200], b: [1, 500], key: "borrow", res: [2, 700] },
    ],
    stepWarm: [0, 1], stepHold: 2200,
    steps: [
      { say: "Start with the millilitres: 600 mL and 700 mL pass 1,000 mL, so tap Carry.", on: "carry", hint: "Carry sends 1,000 mL across as 1 L." },
      { say: "Here 200 mL is less than 500 mL, so tap Borrow to bring 1 L across.", on: "borrow", hint: "Borrow turns 1 L into 1,000 mL." },
    ],
    ladder: ["Do the millilitres column first.", "Then do the litres column."],
    closing: "Carry 1,000 mL as 1 L, or borrow 1 L as 1,000 mL.",
    learned: "You learned: do the millilitres first, then carry or borrow 1 L.",
    traceback: "The board shows the carry or the borrow again, lights the millilitres column, then the litres column, and leaves the answer row for the child.",
    items: [
      /* authored on the owner's column board: CC4's and practice 4's numbers (C36 questions) with C35's concept id */
      { qid: null, kind: "col", op: "-", a: [6, 120], b: [2, 460], key: "borrow", near: [4, 340],
        parts: [{ label: "litres", unit: "L" }, { label: "millilitre", unit: "mL" }], answer: [3, 660],
        say: "From 6 L 120 mL of water, 2 L 460 mL is poured out: how much is left?", ask: "6 L 120 mL take 2 L 460 mL",
        miss: "You cannot take 460 mL from 120 mL.",
        ladder: ["After the borrow the top row is 5 L and 1,120 mL.", "Take 460 mL from 1,120 mL, then 2 L from 5 L."],
        win: "Yes, 3 L 660 mL of water is left in the bucket." },
      { qid: null, kind: "col", op: "+", a: [4, 680], b: [2, 530], key: "carry", near: [6, 1210],
        parts: [{ label: "litres", unit: "L" }, { label: "millilitre", unit: "mL" }], answer: [7, 210],
        say: "A jug has 4 L 680 mL of juice and a bottle 2 L 530 mL: how much in all?", ask: "4 L 680 mL add 2 L 530 mL",
        miss: "680 mL and 530 mL make more than 1,000 mL.",
        ladder: ["Every 1,000 mL makes 1 L for the litres column.", "Add the carried 1 L to 4 L and 2 L."],
        win: "Yes, there are 7 L 210 mL of juice in all." },
      { qid: null, kind: "col", op: "+", a: [3, 600], b: [2, 400], key: "carry", near: [5, 1000],
        parts: [{ label: "litres", unit: "L" }, { label: "millilitre", unit: "mL" }], answer: [6, 0],
        say: "A pot gets 3 L 600 mL of milk, then 2 L 400 mL more: how much milk now?", ask: "3 L 600 mL add 2 L 400 mL",
        miss: "600 mL and 400 mL make a full 1,000 mL.",
        ladder: ["A full 1,000 mL leaves the millilitres column as 1 L.", "Count the litres: the top, the bottom and the one you carried."],
        win: "Yes, the pot holds 6 L of milk and no extra millilitres." },
    ],
  },
  {
    n: 4,
    concept: "Adding, subtracting and filling cups",
    conceptId: "M1.S3.T7.C36", objectiveIds: ["O12"],
    says: ["A small cup can fill a big jar, one pour at a time."],
    /* the warm-up: a 500 mL cup into the 1 L jug, two pours, ending on 2 cups */
    warm: [{ kind: "pour", cup: 500, cap: 1000, small: "cup", big: "jug" }], stepWarm: [0, 0],
    steps: [
      { say: "Tap Pour to tip this 500 mL cup into the 1 L jug.", on: "pour", hint: "The Pour key is under the jug." },
      { say: "Count each cup as you fill the container: pour once more.", on: "pour", hint: "Pour again until the jug is full." },
    ],
    ladder: ["Pour until the water reaches the top line.", "Count every pour it takes."],
    closing: "Count the cups, or divide the big amount by the cup amount.",
    learned: "You learned: count the cups that fill a container, or divide.",
    traceback: "The jar empties and the cups pour in again one by one with the counter, stopping one cup before it is full.",
    items: [
      /* authored from the owner's examples (2 L / 250 mL = 8, 1 L 500 mL / 250 mL = 6) */
      { qid: null, kind: "pour", cup: 250, cap: 2000, small: "cup", big: "jar", near: 4,
        say: "How many 250 mL cups of water fill this 2 L jar?", ask: "How many cups?", answer: 8,
        miss: "Pour one cup at a time and count every pour.",
        ladder: ["Four 250 mL cups fill 1 L.", "Pour until the water reaches the 2 L line."],
        win: "Yes, 8 cups of 250 mL fill the 2 L jar." },
      { qid: null, kind: "pour", cup: 250, cap: 1500, small: "cup", big: "jar", near: 5,
        say: "Ravi fills a 1 L 500 mL jar with a 250 mL cup: how many cupfuls does he pour?", ask: "How many cupfuls?", answer: 6,
        miss: "1 L 500 mL is 1,500 mL.",
        ladder: ["Keep pouring until the jar is full to the top.", "Count the cups it took to reach 1,500 mL."],
        win: "Yes, 6 cupfuls of 250 mL make 1,500 mL." },
      /* practice 8: answer in the plan = 9 glasses, because 1 L 260 mL is 1260 mL and 140 mL nine times gives 1260 mL */
      { qid: "M1.S3.T7.C36:8", kind: "pour", cup: 140, cap: 1260, small: "glass", big: "jar", liq: "juice", near: 8,
        say: "A glass holds 140 mL: how many glasses of juice fill a 1 L 260 mL jar?", ask: "How many glasses?", answer: 9,
        miss: "Change 1 L 260 mL into millilitres first.",
        ladder: ["Each glass adds 140 mL to the jar.", "Count the glasses until the jar holds 1,260 mL."],
        win: "Yes, 9 glasses of 140 mL make 1,260 mL." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  jug: { photo: "jug 200 x 247", floorAt: 0.842, oneLitreAt: 0.16, scale: "y = 0.842 - 0.682 x mL / 1000 of the picture's height" },
  jugsInARow: 4, jugWidth: 112, jarPxPerMl: 0.165,
  answerGate: "Every question is gated by its act: phase 1 Pour (the litres fill the jugs), phase 2 Group (1,000 mL a jug), phase 3 Carry or Borrow (the right one for the question; the wrong one only nudges, no try), phase 4 Pour until the jar is full. No question is ungated. The gate arms after a real touch of the board or a real Enter on a guide step; the agent's check() performs the act at once.",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "lit") return Number(String(it.L) + String(it.ml + 1000).slice(1)) === it.answer;
  if (it.kind === "grp") { let r = it.tot, l = 0; while (r >= 1000) { r -= 1000; l++; } return it.answer[0] === l && it.answer[1] === r; }
  if (it.kind === "col") {
    const a = it.a[0] * 1000 + it.a[1], b = it.b[0] * 1000 + it.b[1], t = it.op === "+" ? a + b : a - b;
    const needs = it.op === "+" ? it.a[1] + it.b[1] >= 1000 : it.a[1] < it.b[1];
    return needs && it.key === (it.op === "+" ? "carry" : "borrow") && it.answer[0] === Math.floor(t / 1000) && it.answer[1] === t % 1000;
  }
  if (it.kind === "pour") { let s = 0, c = 0; while (s < it.cap) { s += it.cup; c++; } return s === it.cap && c === it.answer; }
  return false;
}));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? (Array.isArray(item.near) ? item.near.join("|") : item.near)
  : item.parts ? item.answer.map((x: any) => x + 1).join("|") : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the slot shows a typed amount with Indian commas and its unit ("1,750 mL", "8 cups") */
const format = (v: any, i: any, o: any) => {
  const it = CC_NOW;
  const s = String(v === null || v === undefined ? "" : v);
  if (!it || it.parts || !/^\d+$/.test(s)) return s;
  const tx = (o && o.tx) || ((x: any) => x);
  const num = Number(s);
  const unit = it.kind === "lit" ? "mL" : it.small === "glass" ? (num === 1 ? "glass" : "glasses") : num === 1 ? "cup" : "cups";
  return indian(num) + " " + tx(unit);
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : (HOOK.check && HOOK.check(), T.submit(item.answer)));
/* the agent's answer() for an item made on the working area: none here (every answer is typed) */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: at a question whose act is still to do it performs the act at once (so AI mode is never
   gated); in a guide step (stage "demo") it is undefined, so check() reaches api.onEnter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const P: any = PHASES[n - 1] || PHASES[0];
  const free = stage === "free";
  const bw = box ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : bw;
  /* the jug row of phases 1 and 2 grows into the shut room (112 wide jugs with the panel open, 150 shut: LAYOUT §1b);
     every scene is centred; only its top band (y < 88) must stay left of the key's corner */
  const jugRow = n <= 2 && !free;
  const JW = jugRow ? 112 + 38 * Math.max(0, Math.min(1, (bw - CC_SW) / 220)) : 112;
  const SW = jugRow ? 453 + 4 * JW : CC_SW;
  const ox = Math.max(0, (bw - SW) / 2);
  const ask = stage === "ask";
  const isWin = !free && (stage === "win" || stage === "idle");

  /* the warm-up board a guide step works on (teach is drawn as step 0: PATTERNS 18) */
  const ls = useRef({ n: 0, s: 0 });
  if (ls.current.n !== n) ls.current = { n, s: 0 };
  if (stage === "demo" && typeof step === "number" && P.steps) ls.current.s = Math.max(0, Math.min(step, P.steps.length - 1));
  const warm = !free && (stage === "demo" || stage === "teach") && !!P.warm;
  const si = stage === "teach" ? 0 : ls.current.s;
  const wi = warm ? (P.stepWarm || [])[si] || 0 : 0;
  const it: any = free ? CC_FREE : warm ? P.warm[wi] : item || P.items[0];
  const kind = free ? "pour" : CC_KINDS[n - 1];
  CC_NOW = warm || free ? null : it;

  /* the board belongs to the ENTRY (PATTERNS 18): a new entry builds a fresh board during render */
  const qk = free ? "free" : warm ? n + ":w" + wi : n + ":q" + index;
  const ent = useRef({ qk: "", n: 0 });
  const W0 = useRef<any>(null);
  if (ent.current.qk !== qk) { ent.current = { qk, n: ent.current.n + 1 }; W0.current = wrong; }
  const ek = ent.current.n;
  const [raw, setRaw] = useState<any>(() => ccFresh(-1));
  const S = raw.ek === ek ? raw : ccFresh(ek);
  const put = (patch: any, e: number = ek) => setRaw((p: any) => ({ ...(p.ek === e ? p : ccFresh(e)), ...patch }));
  const [, bump] = useState(0);

  /* the numbers of this board */
  const liq = it.liq === "juice" ? CC_JUICE : CC_WATER;
  let full = 0, left = 0;
  if (kind === "lit") { full = it.L; left = it.ml; }
  if (kind === "grp") { full = Math.floor(it.tot / 1000); left = it.tot % 1000; }
  const used = full + (left > 0 ? 1 : 0);
  const N = kind === "pour" ? Math.round(it.cap / it.cup) : 0;

  /* the correction: derived in render from `wrong`, so the first frame after the miss already shows its start */
  const wk = wrong ? wrong.tries || 1 : 0;
  const pend = ask && !free && !!wrong && wrong !== W0.current && S.cwk !== wk;
  const corr = ask && (pend || !!S.corr);
  const fill = isWin ? used : pend ? 0 : S.fill;
  const pours = isWin ? N : pend ? 0 : S.pours;
  const doneAct = isWin || (!pend && S.done);
  const carryOn = isWin ? it.key === "carry" : !pend && S.carry;
  const borrowOn = isWin ? it.key === "borrow" : !pend && S.borrow;
  const ck = pend ? 0 : S.ck;

  /* ANSWER GATED BY THE ACT (PATTERNS 19) */
  const G = useRef<any>({ armed: false, n: 0 });
  if (G.current.n !== n) G.current = { armed: false, n };
  const needs = ask && !free && !corr && (kind === "pour" ? pours < N && !S.done : !S.done);
  const gate = needs && G.current.armed;
  const playing = useRef(false);
  const queued = useRef<any>(null);
  const KB = useRef(0);
  const nudgeT = useRef<any>(0);
  const nudged = useRef(false);
  const sentDid = useRef(-1);
  useEffect(() => { if (stage === "ask" && !playing.current) api.lock(!!(gate || corr)); });

  /* the nudge for a locked question: names the ACT, never the answer; two forms, alternating question by question */
  const sayQ = () => { const L = live.current; if (L.stage === "ask" && L.item) api.say(L.item.say); };
  const holdNudge = () => {
    nudged.current = true;
    clearTimeout(nudgeT.current);
    nudgeT.current = setTimeout(() => { if (nudged.current) { nudged.current = false; sayQ(); } }, 3000);
  };
  const nudge = () => {
    const L = live.current;
    if (!L.gate) return;
    const alt = L.index % 2 === 1;
    if (L.kind === "lit") { if (alt) api.say("Pour the water into the jugs first."); else api.say("First tap Pour to fill the litre jugs."); }
    else if (L.kind === "grp") { if (alt) api.say("Group the water into jugs first."); else api.say("First tap Group to fill the jugs."); }
    else if (L.kind === "col") { if (alt) api.say("Decide on Carry or Borrow before you answer."); else api.say("First choose Carry or Borrow on the board."); }
    else { if (alt) api.say("Fill the jar with the cup before you answer."); else api.say("Keep tapping Pour until the jar is full."); }
    holdNudge();
  };
  const keyNudge = () => {
    if (index % 2 === 1) api.say("Check the millilitres again, then choose."); else api.say("Look at the millilitres column: do they fit?");
    holdNudge();
  };
  const afterAct = (kb: boolean) => {
    clearTimeout(nudgeT.current);
    if (nudged.current) { nudged.current = false; sayQ(); }
    if (kb) setTimeout(() => { const el: any = document.querySelector('[data-control="answer-open"]'); if (el && el.focus) el.focus(); }, 160);
  };

  /* every act is performed on screen (api.act), reacted to 40 ms after it resolves (the action-anim race, NOTES.md) */
  const run = (o: any, onDone: () => void) => {
    if (playing.current) return;
    playing.current = true;
    api.act(o).then((ok: boolean) => {
      setTimeout(() => {
        playing.current = false;
        if (ok) onDone();
        const q = queued.current;
        queued.current = null;
        if (ok && q) setTimeout(() => live.current.act && live.current.act(q), 60);
        bump((x: number) => x + 1);
      }, 40);
    });
  };
  const didOnce = (on: string, e: number) => { if (sentDid.current === e) return; sentDid.current = e; api.did(on); };

  /* the geometry, in Work units */
  const JH = (JW * CC_JUG.h) / CC_JUG.w, JP = JW + 60, J0 = 271, JB = 330, JT = JB - JH;
  const jx = (j: number) => ox + J0 + j * JP;
  const jcx = (j: number) => jx(j) + JW * 0.4;
  const rowC = ox + J0 + (3 * JP + JW) / 2;
  const B = { sx: ox + 148, lx: ox + 300, mx: ox + 600, top: 205, bot: 285, regY: 112 };
  const J4 = { cupX: ox + 110, cupB: 330, x: ox + 330, iw: 200, bot: 412, k: 0.165, wx: ox + 330, ww: 230 };
  const pourTo = () => (it.big === "jug" ? { x: J4.wx + J4.ww * 0.35, y: J4.bot - (J4.ww * CC_JUG.h) / CC_JUG.w + 40 } : { x: J4.x + J4.iw / 2, y: J4.bot - it.cap * J4.k - 40 });

  const act = (on: string) => {
    if (corr || isWin) return;
    const demo = stage === "demo";
    if (demo && !stepOn) return;
    if (demo && on !== stepOn) { api.did(on); return; }
    if (!(demo || ask || free)) return;
    const e = ek, kb = Date.now() - KB.current < 450;
    if (kind === "lit" || kind === "grp") {
      if (on !== (kind === "lit" ? "pour" : "group")) return;
      if (fill >= used) { if (demo) didOnce(on, e); return; }
      const from = fill, pts: any[] = [];
      for (let j = from; j < used; j++) pts.push({ x: jcx(j), y: JT + 36 });
      const drop = <path d="M 0 -18 C 10 -4 14 4 14 9 A 14 14 0 0 1 -14 9 C -14 4 -10 -4 0 -18 Z" fill={liq} fillOpacity={0.85} stroke={shade(liq, 0.35)} strokeWidth={2} />;
      run({ tool: "hand", moves: "carry", from: { x: ox + 100, y: 200 }, at: pts, hold: drop, onPoint: (i: number) => put({ fill: from + i + 1 }, e) }, () => {
        put({ fill: used, done: true }, e);
        api.sfx.settle();
        if (demo) didOnce(on, e); else afterAct(kb);
      });
      return;
    }
    if (kind === "col") {
      if (on !== "carry" && on !== "borrow") return;
      if (S.done) { if (demo) didOnce(on, e); return; }
      if (!demo && on !== it.key) { keyNudge(); return; }
      const chip = <g><rect x={-46} y={-26} width={92} height={52} rx={14} fill={tint(CC_AMBER, 0.8)} stroke={CC_AMBER} strokeWidth={4} /><text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(CC_AMBER, 0.5)}>{"1 " + tx("L")}</text></g>;
      const from = on === "carry" ? { x: B.mx, y: B.top - 20 } : { x: B.lx, y: B.top - 20 };
      const to = on === "carry" ? { x: B.lx, y: B.regY } : { x: B.mx, y: B.regY };
      run({ tool: "hand", moves: "carry", from, at: [to], hold: chip, onPoint: () => put({ [on]: true }, e) }, () => {
        put({ [on]: true, done: true }, e);
        api.sfx.trade();
        if (demo) {
          if (P.steps && si < P.steps.length - 1) setTimeout(() => { if (live.current.ek === e) didOnce(on, e); }, 900);
          else didOnce(on, e);
        } else afterAct(kb);
      });
      return;
    }
    /* pour: one cup a tap */
    if (on !== "pour") return;
    let p0 = pours;
    if (free && p0 >= N) { put({ pours: 0 }, e); p0 = 0; }
    if (p0 >= N) { if (demo) didOnce(on, e); return; }
    const cupNode = it.small === "glass" ? ccGlass("hold", 0, 50, 72, 96, liq, true) : ccPic("hold", "cup", 0, 50, 84, 100);
    const home = { x: J4.cupX, y: J4.cupB - 70 };
    put({ carrying: true }, e);
    run({ tool: "hand", moves: "carry", from: home, at: [pourTo()], to: home, ms: 750, hold: cupNode, onPoint: () => put({ pours: p0 + 1 }, e) }, () => {
      const np = p0 + 1;
      put({ pours: np, carrying: false, done: !free && !demo && np >= N ? true : S.done }, e);
      if (demo) { sentDid.current = -1; api.did(on); }
      else if (np >= N && !free) { api.sfx.settle(); afterAct(kb); }
    });
  };

  /* what the listeners read: always the latest render */
  const live = useRef<any>({});
  live.current = { stage, gate, kind, index, item, ek, act, nudge };

  /* the gate arms after a real touch of the board (or a real Enter on a guide step); a tap made while an act plays is queued */
  useEffect(() => {
    const down = (ev: any) => {
      if (!ev.isTrusted) return;
      const t: any = ev.target, L = live.current;
      if (t && t.closest && t.closest('[data-zone="work"]') && !G.current.armed && (L.stage === "demo" || L.stage === "ask")) { G.current.armed = true; bump((x: number) => x + 1); }
      if (L.gate && t && t.closest && t.closest('[data-control="answer-open"],[data-control="again"],[data-zone="ask"]')) setTimeout(() => live.current.nudge(), 90);
    };
    const up = (ev: any) => {
      if (!ev.isTrusted || !playing.current) return;
      Array.from(document.querySelectorAll('[data-control="pour"],[data-control="group"],[data-control="carry"],[data-control="borrow"]')).forEach((el: any) => {
        const r = el.getBoundingClientRect();
        if (el.getAttribute("aria-disabled") !== "true" && ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom) queued.current = el.getAttribute("data-control");
      });
    };
    const key = (ev: any) => {
      if (!ev.isTrusted) return;
      const L = live.current;
      if (ev.key === "Enter" || ev.key === " ") {
        KB.current = Date.now();
        if (L.stage === "demo" && !G.current.armed) { G.current.armed = true; bump((x: number) => x + 1); }
      }
      if (/^[0-9]$/.test(ev.key) && L.gate) setTimeout(() => live.current.nudge(), 90);
    };
    window.addEventListener("pointerdown", down, true);
    window.addEventListener("pointerup", up, true);
    window.addEventListener("keydown", key, true);
    return () => {
      window.removeEventListener("pointerdown", down, true);
      window.removeEventListener("pointerup", up, true);
      window.removeEventListener("keydown", key, true);
      clearTimeout(nudgeT.current);
    };
  }, []);

  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);
  HOOK.demo = () => act(stepOn);
  /* the agent performs a question's act at once (no animation), only while it is still to do */
  HOOK.check = needs ? () => {
    if (kind === "lit" || kind === "grp") put({ fill: used, done: true });
    else if (kind === "col") put({ [it.key]: true, done: true });
    else put({ pours: N, done: true });
    return true;
  } : undefined;

  /* THE CORRECTION (MISS HIDES THE ANSWER): replay the act's end state and the count, one step short; the picture is locked */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free || wrong === W0.current) return;
    const e = ek, w = wrong.tries || 1;
    tl.stop();
    clearTimeout(nudgeT.current);
    nudged.current = false;
    const steps: any[] = [[520, null]];
    if (kind === "lit" || kind === "grp") {
      put({ cwk: w, corr: true, fill: 0, done: true }, e);
      for (let k = 1; k < used; k++) steps.push([480, () => { put({ fill: k }, e); api.sfx.tick(); }]);
    } else if (kind === "col") {
      put({ cwk: w, corr: true, ck: 0, carry: it.key === "carry", borrow: it.key === "borrow", done: true }, e);
      steps.push([820, () => put({ ck: 1 }, e)]);
      steps.push([820, () => put({ ck: 2 }, e)]);
    } else {
      put({ cwk: w, corr: true, pours: 0, done: true, carrying: false }, e);
      for (let k = 1; k < N; k++) steps.push([360, () => { put({ pours: k }, e); api.sfx.tick(); }]);
    }
    tl.run(steps, () => put({ corr: false }, e));
  }, [wrong]);
  useEffect(() => () => { tl.stop(); }, [ek]);

  /* the win line, said at the win (a phase's last one is replaced by its closing line) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, index, n]);

  /* what the host and the agent read back (toolApi.getState): the given amounts and the act, never the answer */
  api.share({ phase: n, act: doneAct, carry: !!carryOn, borrow: !!borrowOn, complete: stage === "idle" });

  const invite = (x: number, y: number, w: number, h: number) => <Invite x={x + w / 2} y={y + h / 2} w={w} h={h} rx={RAD.key} C={C} />;
  const actKey = (id: string, label: string, x: number, y: number, w: number, off: boolean) => (
    <Key key={"k-" + id} id={id} label={label} x={x} y={y} w={w} h={72} C={C} tone="key" disabled={off} onClick={() => act(id)}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={off ? C.dim : toneInk("key", C.ink)}>{tx(label)}</text>
    </Key>
  );
  const wantInvite = (id: string) => (stage === "demo" ? stepOn === id : (ask && needs && !corr) || (free && id === "pour"));

  /* ── phase 1 and 2: the given container, a row of four litre jugs ── */
  const drawJugs = () => {
    const isLit = kind === "lit";
    const given = isLit ? ccLM(it.L, it.ml, tx) : ccML(it.tot, tx);
    const gw = Math.max(200, ccTW(given, 36) + 28);
    /* the unit fact, two texts split at the "=" (each a short label): "1 L =" | "1,000 mL" */
    const fL = isLit ? "1 " + tx("L") + " =" : "1,000 " + tx("mL") + " =";
    const fR = isLit ? "1,000 " + tx("mL") : "1 " + tx("L");
    const wL = ccTW(fL, 40), wR = ccTW(fR, 40);
    const fw = wL + wR + 14 + 64;
    const fc = Math.min(rowC, kx - fw / 2 - 6);
    const fSplit = fc + (wL - wR) / 2;
    const keyId = isLit ? "pour" : "group";
    const kw = 220, kX = rowC - kw / 2, kY = 432;
    const showChips = doneAct || corr || (warm && S.done);
    const res = isLit ? ccML(it.L * 1000 + it.ml, tx) : left > 0 ? ccLM(full, left, tx) : full + " " + tx("L");
    const rw = Math.max(260, ccTW(res, 44) + 40);
    return (
      <g>
        {ccPic("box", it.box, ox + 100, JB, 180, 200)}
        {ccTag("given", ox + 100 - gw / 2, 346, gw, 60, given, CC_BLUE, 36)}
        <g data-scale="fact">
          <rect x={fc - fw / 2} y={8} width={fw} height={76} rx={38} fill={tint(CC_VERM, 0.9)} stroke={CC_VERM} strokeWidth={5} />
          <text x={fSplit - 7} y={60} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={shade(CC_VERM, 0.45)}>{fL}</text>
          <text x={fSplit + 7} y={60} textAnchor="start" fontSize={T.prompt} fontWeight={700} fill={shade(CC_VERM, 0.45)}>{fR}</text>
        </g>
        {[0, 1, 2, 3].map((j) => {
          const ml = j < fill ? (j < full ? 1000 : left) : 0;
          const isLeft = !isLit && j === full && left > 0 && fill > j;
          return ccJug("j" + j, jx(j), JT, JW, ml, { tx, liq, ring: isLeft });
        })}
        {showChips && [0, 1, 2, 3].map((j) => {
          if (j >= fill) return null;
          const isPart = j >= full;
          if (!isLit && isPart) return <g key={"c" + j}>{ccTag("c" + j, jcx(j) - 60, 346, 120, 52, tx("Left"), CC_AMBER, 32)}</g>;
          const t = isPart ? left + " " + tx("mL") : "1,000 " + tx("mL");
          const cw = Math.min(166, Math.max(110, ccTW(t, 32) + 22));
          return <g key={"c" + j}>{ccTag("c" + j, jcx(j) - cw / 2, 346, cw, 52, t, isPart ? CC_AMBER : CC_BLUE, 32)}</g>;
        })}
        {!isWin && actKey(keyId, isLit ? "Pour" : "Group", kX, kY, kw, corr || fill >= used || (warm && S.done))}
        {!isWin && wantInvite(keyId) && fill < used && invite(kX, kY, kw, 72)}
        {warm && S.done && ccTag("res", rowC - rw / 2, 428, rw, 76, res, CC_GREEN, 44)}
        {isWin && <g data-reveals="answer">{ccTag("ans", rowC - rw / 2, 428, rw, 76, res, CC_GREEN, 44)}</g>}
      </g>
    );
  };

  /* ── phase 3: the litres | millilitres column board ── */
  const drawBoard = () => {
    const a = it.a, b = it.b, plus = it.op === "+";
    const res = warm ? it.res : item ? item.answer : [0, 0];
    const showRes = (warm && S.done) || isWin;
    const cell = (k: string, x: number, w: number, text: string, on: boolean) => (
      <g key={k}>
        <rect x={x} y={330} width={w} height={76} rx={14} fill={on ? tint(CC_GREEN, 0.85) : "#FFFFFF"} stroke={on ? CC_GREEN : CHROME.rule} strokeWidth={on ? 4 : 2.5} strokeDasharray={on ? undefined : "10 8"} />
        {on && <text x={x + w / 2} y={388} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(CC_GREEN, 0.5)}>{text}</text>}
      </g>
    );
    const ckX = ox + 220, bkX = ox + 460, kY = 436;
    const off = corr || S.done || isWin || (warm && S.done);
    return (
      <g>
        <rect x={ox + 100} y={0} width={700} height={420} rx={22} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={3} />
        {ck >= 1 && <rect x={ox + 414} y={74} width={380} height={246} rx={14} fill={tint(CC_AMBER, 0.78)} />}
        {ck >= 2 && <rect x={ox + 194} y={74} width={212} height={246} rx={14} fill={tint(CC_AMBER, 0.78)} />}
        <line x1={ox + 410} y1={14} x2={ox + 410} y2={410} stroke={CC_INK} strokeWidth={3} />
        <g data-scale="heads">
          <text x={B.lx} y={52} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={CC_INK}>{tx("L")}</text>
          <text x={B.mx} y={52} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={CC_INK}>{tx("mL")}</text>
        </g>
        <line x1={ox + 120} y1={70} x2={ox + 780} y2={70} stroke={C.rule} strokeWidth={2.5} />
        {carryOn && ccTag("cy", B.lx - 40, B.regY - 27, 80, 54, "1", CC_AMBER, 40)}
        {borrowOn && ccTag("bl", B.lx - 40, B.regY - 27, 80, 54, String(a[0] - 1), CC_AMBER, 40)}
        {borrowOn && ccTag("bm", B.mx - 90, B.regY - 27, 180, 54, indian(a[1] + 1000), CC_AMBER, 40)}
        <text x={B.lx} y={B.top} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(CC_BLUE, 0.35)}>{a[0]}</text>
        <text x={B.mx} y={B.top} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(CC_BLUE, 0.35)}>{a[1]}</text>
        {borrowOn && <line x1={B.lx - 26} y1={B.top - 18} x2={B.lx + 26} y2={B.top - 24} stroke={CC_INK} strokeWidth={4} />}
        {borrowOn && <line x1={B.mx - 60} y1={B.top - 18} x2={B.mx + 60} y2={B.top - 24} stroke={CC_INK} strokeWidth={4} />}
        <text x={B.sx} y={B.bot} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CC_INK}>{plus ? "+" : "−"}</text>
        <text x={B.lx} y={B.bot} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(CC_BLUE, 0.35)}>{b[0]}</text>
        <text x={B.mx} y={B.bot} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(CC_BLUE, 0.35)}>{b[1]}</text>
        <line x1={ox + 120} y1={312} x2={ox + 780} y2={312} stroke={CC_INK} strokeWidth={4} />
        {isWin ? <g data-reveals="answer">{cell("rl", ox + 230, 140, String(res[0]), true)}{cell("rm", ox + 470, 260, String(res[1]), true)}</g>
          : <g>{cell("rl", ox + 230, 140, String(res[0]), showRes)}{cell("rm", ox + 470, 260, String(res[1]), showRes)}</g>}
        {!isWin && actKey("carry", "Carry", ckX, kY, 220, off)}
        {!isWin && actKey("borrow", "Borrow", bkX, kY, 220, off)}
        {!isWin && !off && wantInvite("carry") && stage === "demo" && invite(ckX, kY, 220, 72)}
        {!isWin && !off && wantInvite("borrow") && stage === "demo" && invite(bkX, kY, 220, 72)}
      </g>
    );
  };

  /* ── phase 4 and free play: a small cup (or glass) and a big jar (the warm-up: the 1 L jug) ── */
  const drawPour = () => {
    const ml = pours * it.cup;
    const cupT = it.cup + " " + tx("mL");
    const cw = Math.max(170, ccTW(cupT, 36) + 28);
    const capT = it.big === "jug" ? "1 " + tx("L") : ccLM(Math.floor(it.cap / 1000), it.cap % 1000, tx);
    const capW = Math.max(150, ccTW(capT, 36) + 28);
    const capX = it.big === "jug" ? J4.wx + J4.ww * 0.4 : J4.x + J4.iw / 2;
    const unitW = it.small === "glass" ? (pours === 1 ? "glass" : "glasses") : pours === 1 ? "cup" : "cups";
    const res = (warm || free ? pours : N) + " " + tx(unitW);
    const kw = 220, kX = capX - kw / 2, kY = 436;
    const offKey = corr || isWin || (!free && pours >= N);
    const tallyX = ox + 650;
    const big = it.big === "jug"
      ? ccJug("big", J4.wx, J4.bot - (J4.ww * CC_JUG.h) / CC_JUG.w, J4.ww, ml, { tx, liq, mid: true })
      : ccJar("big", J4.x, J4.bot, J4.iw, it.cap, ml, J4.k, liq, tx);
    return (
      <g>
        {!S.carrying && (it.small === "glass" ? ccGlass("small", J4.cupX, J4.cupB, 100, 132, liq, true) : ccPic("small", "cup", J4.cupX, J4.cupB, 120, 145))}
        {ccTag("cupT", J4.cupX - cw / 2, 346, cw, 60, cupT, CC_BLUE, 36)}
        {big}
        {ccTag("capT", capX - capW / 2, 4, capW, 58, capT, CC_BLUE, 36)}
        <text x={tallyX + 110} y={120} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK}>{tx("Pours")}</text>
        <rect x={tallyX + 50} y={134} width={120} height={96} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} />
        <text x={tallyX + 110} y={206} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={CC_INK}>{isWin ? "" : pours}</text>
        {Array.from({ length: isWin ? 0 : pours }, (_, i) => {
          const tx0 = tallyX + (i % 5) * 46, ty0 = 300 + Math.floor(i / 5) * 58;
          return it.small === "glass" ? ccGlass("t" + i, tx0 + 20, ty0, 34, 44, liq, false) : ccPic("t" + i, "cup", tx0 + 20, ty0, 38, 46);
        })}
        {!isWin && actKey("pour", "Pour", kX, kY, kw, offKey)}
        {!isWin && !offKey && wantInvite("pour") && invite(kX, kY, kw, 72)}
        {warm && pours >= N && ccTag("res", tallyX, 412, 240, 70, res, CC_GREEN, 40)}
        {isWin && <g data-reveals="answer">
          <text x={tallyX + 110} y={206} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={CC_INK}>{N}</text>
          {Array.from({ length: N }, (_, i) => {
            const tx0 = tallyX + (i % 5) * 46, ty0 = 300 + Math.floor(i / 5) * 58;
            return it.small === "glass" ? ccGlass("w" + i, tx0 + 20, ty0, 34, 44, liq, false) : ccPic("w" + i, "cup", tx0 + 20, ty0, 38, 46);
          })}
          {ccTag("ans", tallyX, 412, 240, 70, res, CC_GREEN, 40)}
        </g>}
      </g>
    );
  };

  return (
    <g>
      {kind === "lit" || kind === "grp" ? drawJugs() : kind === "col" ? drawBoard() : drawPour()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (r24: `it` is the item) */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item: any = it || last.it || {};
  const kind = item.kind || last.kind;
  /* a unit is printed in Hindi and Gujarati only once its TR line exists (summary-thumbs, before the language pass) */
  const U = (s: string) => (lang === "en" || (TR[lang] && TR[lang][s]) ? " " + tx(s) : "");
  const num = (v: any) => Number(String(v).replace(/[^0-9]/g, "")) || 0;
  let txt = "";
  if (kind === "grp" || kind === "col") { const [a, b] = slotPartsOf(last.value, 2); txt = a + U("L") + " " + b + U("mL"); }
  else if (kind === "lit") txt = indian(num(last.value)) + U("mL");
  else { const v = num(last.value); txt = v + U(item.small === "glass" ? (v === 1 ? "glass" : "glasses") : v === 1 ? "cup" : "cups"); }
  const s = Math.min(h - 16, 64);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={12} y={(h - s) / 2 + s * 0.3} width={s * 0.62} height={s * 0.7} rx={6} fill={CC_WATER} fillOpacity={0.55} />
      <rect x={12} y={(h - s) / 2} width={s * 0.62} height={s} rx={8} fill="none" stroke={CC_GLASS} strokeWidth={3} />
      <text x={w - 14} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{txt}</text>
    </g>
  );
}

function CapacityConverter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (LAYOUT.md §1d, PATTERNS.md §16) */
      keyOnly: true,
      /* the wide keypad (PATTERNS.md 9g): every scene is laid out in x 64 to 964 */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d) */
      nextKey: true,
      /* NAV DOTS (LAYOUT.md §1d) */
      navDots: true,
      /* the start page */
      StartArt, START_HOOK,
      }} />
  );
}

export default CapacityConverter;
