/* ═══ M1.S2.T6.C28.2D1 · calendar_explorer · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The lesson is action-driven: nothing moves on unless the
   child acts. THE NEW LOOK (keyOnly, navDots): the question lives only in the bubble; every act is
   performed on screen (api.act). Edit, never rewrite. Concepts are verbatim (check compares them).

   Calendar Explorer: a real wall calendar, computed for its real year (the weekday of the 1st and the
   days of each month come from ceDow / ceLen below, never typed in), two drawn fists for the knuckle
   method, a four-year strip with a year ruler for leap years, and a pencil that circles a date and
   hops seven days at a time. No skins: the image pass made none on purpose (every element is the
   maths, drawn in code). */

const TOOL_ID = "calendar_explorer";
const MEDIA_ID = "M1.S2.T6.C28.2D1";
const TOOL_NAME = "Calendar Explorer";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A calendar on the wall, waiting to be flipped."];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "You found each day by counting weeks and months.";
/* printed when the child opens Free play: everything it names is live in the free branch of Work */
const FREE_LINE = "Free play: flip the months, circle a date and hop in sevens.";

/* THE START PAGE (docs/LAYOUT.md §1c): a wall calendar with blank boxes (no date is drawn: dates are answers here)
   and the two fists of the knuckle method */
const START_HOOK = "How can two fists tell you the days in each month?";
function StartArt({ box, C, lang, tx }: any) {
  const px = 150, py = 40, cw = 42, ch = 38, gx = px + 3, gy = py + 56 + 30;
  return (
    <g>
      <path d={`M ${px + 60} ${py + 4} L ${px + 150} ${py - 24} L ${px + 240} ${py + 4}`} fill="none" stroke="#6B5B45" strokeWidth={3} />
      <circle cx={px + 150} cy={py - 24} r={6} fill="#6B5B45" />
      <rect x={px} y={py} width={300} height={56 + 30 + 5 * ch + 10} rx={16} fill={CE.paper} stroke={CE.ink} strokeWidth={3} />
      <path d={`M ${px} ${py + 56} V ${py + 16} Q ${px} ${py} ${px + 16} ${py} H ${px + 284} Q ${px + 300} ${py} ${px + 300} ${py + 16} V ${py + 56} Z`} fill={CE.ink} />
      <text x={px + 150} y={py + 40} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">2026</text>
      <rect x={gx} y={py + 56} width={7 * cw} height={30} fill="#F2E4CE" stroke={CE.ink} strokeWidth={2} />
      {Array.from({ length: 35 }, (_, k) => {
        const r = Math.floor(k / 7), c = k % 7, hop = c === 3 && r < 4;
        return <rect key={k} x={gx + c * cw} y={gy + r * ch} width={cw} height={ch} fill={hop ? mix(CE.hop, "#FFFFFF", 0.6) : "#FFFFFF"} stroke={CE.ink} strokeWidth={2} />;
      })}
      {[0, 1, 2].map((r) => (
        <path key={r} d={`M ${gx + 3 * cw + 26} ${gy + r * ch + 22} Q ${gx + 3 * cw + 52} ${gy + r * ch + 38} ${gx + 3 * cw + 26} ${gy + (r + 1) * ch + 14}`} fill="none" stroke="#4A4A4A" strokeWidth={3.5} strokeLinecap="round" />
      ))}
      {ceFistG(600, 34, 1.2, true)}{ceFistG(830, 34, 1.2, false)}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled at the language pass, once the English is final. */
const TR: any = { hi: {}, gu: {} };

/* ── the calendar, computed for its real year (never typed in) ─────────────────────────────── */
const CE_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const CE_MON3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CE_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const CE_DAY3 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CE_DAY2 = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const CE_DAYID = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const CE_WEEKDAY_KEYS = CE_DAY3.map((s, k) => ({ id: CE_DAYID[k], label: s }));
/* the leap rule in full (every fourth year; a century only when it divides by 400): for 1901 to 2099 it IS the
   every-fourth-year rule the chapter teaches, and the tool never leaves 2000 to 2099 */
const ceLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const ceLen = (y: number, m: number) => (m === 1 ? (ceLeap(y) ? 29 : 28) : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m]);
/* the weekday of a date (0 = Sunday), by counting days from 1 January 1900, a Monday */
const ceDow = (y: number, m: number, d: number) => {
  let t = 0;
  for (let k = 1900; k < y; k++) t += ceLeap(k) ? 366 : 365;
  for (let k = 0; k < m; k++) t += ceLen(y, k);
  return (1 + t + d - 1) % 7;
};
const ceRC = (y: number, m: number, d: number) => { const k = ceDow(y, m, 1) + d - 1; return { r: Math.floor(k / 7), c: k % 7 }; };
const ceStep = (p: any, dir: number) => { let m = p.m + dir, y = p.y; if (m > 11) { m = 0; y += 1; } if (m < 0) { m = 11; y -= 1; } return { y, m }; };
/* the rows of a page that hold a whole week (seven dates, Sunday to Saturday) */
const ceFullRows = (y: number, m: number) => {
  const f = ceDow(y, m, 1), L = ceLen(y, m), out: number[] = [];
  for (let r = 0; r < 6; r++) { const first = r * 7 - f + 1; if (first >= 1 && first + 6 <= L) out.push(r); }
  return out;
};
const ceAddU = (a: any[], v: any) => (a.indexOf(v) >= 0 ? a : [...a, v]);

/* colours: real things keep their own; the hop lights one weekday in blue, the answer and a reached date are green,
   the one day left over is amber (content colours, docs/LAYOUT.md §9) */
const CE = { ink: "#2B2B2B", paper: "#FFFDF7", hop: CONTENT.hundred, ans: CONTENT.one, amber: CONTENT.ten, extra: CONTENT.bead,
  skin: "#F2C9A0", skinEdge: "#A8724B", crease: "#C99466", pencil: "#4A4A4A" };
/* the big wall calendar page and the small one (phase 2) */
const CEB = { x: 8, y: 18, w: 462, bar: 84, head: 36, cw: 64, ch: 48, rows: 6 };
const CEM = { x: 1080, y: 118, w: 380, bar: 52, head: 32, cw: 52, ch: 42, rows: 6 };
const ceGX = (g: any) => g.x + (g.w - 7 * g.cw) / 2;
const ceGY = (g: any) => g.y + g.bar + g.head;
const ceCellC = (g: any, y: number, m: number, d: number) => { const { r, c } = ceRC(y, m, d); return { x: ceGX(g) + c * g.cw + g.cw / 2, y: ceGY(g) + r * g.ch + g.ch / 2 }; };
const ceCellAt = (g: any, y: number, m: number, p: any) => {
  if (!p || !isFinite(p.x) || !isFinite(p.y)) return null;
  const c = Math.floor((p.x - ceGX(g)) / g.cw), r = Math.floor((p.y - ceGY(g)) / g.ch);
  if (c < 0 || c > 6 || r < 0 || r >= g.rows) return null;
  const d = r * 7 + c - ceDow(y, m, 1) + 1;
  return { r, c, d: d >= 1 && d <= ceLen(y, m) ? d : null };
};
/* a ring round a date (the pencil's circle) and a hop arc down one week, as point lists */
const ceRingPts = (p: any, k: number) => Array.from({ length: k + 1 }, (_, i) => { const a = -Math.PI / 2 + (i / k) * Math.PI * 2; return { x: p.x + 27 * Math.cos(a), y: p.y + 21 * Math.sin(a) }; });
const ceArcPts = (a: any, b: any, k: number) => Array.from({ length: k + 1 }, (_, i) => {
  const t = i / k, p0 = { x: a.x + 12, y: a.y + 8 }, q = { x: a.x + 48, y: (a.y + b.y) / 2 }, p1 = { x: b.x + 12, y: b.y - 8 };
  return { x: (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * q.x + t * t * p1.x, y: (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * q.y + t * t * p1.y };
});
const cePath = (pts: any[], t: number) => {
  const n = Math.max(1, Math.round((pts.length - 1) * Math.max(0, Math.min(1, t))));
  return pts.slice(0, n + 1).map((p, i) => (i ? "L " : "M ") + p.x.toFixed(1) + " " + p.y.toFixed(1)).join(" ");
};

/* one calendar page, drawn (called, never mounted). o: { view, tx, arrows, lit: {day: colour}, under, over, sq29 } */
function cePageG(g: any, y: number, m: number, o: any) {
  const tx = o.tx || ((v: any) => v), wall = o.view !== "grid";
  const gx = ceGX(g), gy = ceGY(g), f = ceDow(y, m, 1), L = ceLen(y, m);
  const H = g.bar + g.head + g.rows * g.ch + 8, fs = g.ch >= 46 ? T.label : T.micro;
  const title = tx(CE_MONTHS[m]) + " " + y;
  const room = g.w - (o.arrows ? 176 : 28);
  const tfs = (g.bar >= 70 ? [T.prompt, T.label, T.micro] : [T.label, T.micro]).find((s) => title.length * s * 0.6 <= room) || T.micro;
  const cx = (c: number) => gx + c * g.cw + g.cw / 2, cy = (r: number) => gy + r * g.ch + g.ch / 2;
  const lit = o.lit || {}, cells: any[] = [], nums: any[] = [];
  for (let r = 0; r < g.rows; r++) for (let c = 0; c < 7; c++) {
    const d = r * 7 + c - f + 1, has = d >= 1 && d <= L;
    const s = has && d === 29 && m === 1 && o.sq29 !== undefined && o.sq29 < 1 ? Math.max(0, o.sq29) : 1;
    const blank = wall ? "#EFE8DA" : "#F4F4F4";
    if (s < 1) cells.push(<rect key={"b" + r + "." + c} x={gx + c * g.cw} y={gy + r * g.ch} width={g.cw} height={g.ch} fill={blank} stroke={CE.ink} strokeWidth={2.4} />);
    cells.push(<rect key={"c" + r + "." + c} x={gx + c * g.cw + ((1 - s) * g.cw) / 2} y={gy + r * g.ch + ((1 - s) * g.ch) / 2} width={g.cw * s} height={g.ch * s}
      fill={has && lit[d] ? mix(lit[d], "#FFFFFF", 0.6) : has ? "#FFFFFF" : blank} stroke={CE.ink} strokeWidth={2.4} />);
    if (has && s > 0.5) nums.push(<text key={"d" + d} x={cx(c)} y={cy(r) + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={CE.ink}>{d}</text>);
  }
  return (
    <g>
      {wall && <g>
        <path d={`M ${g.x + 80} ${g.y + 4} L ${g.x + g.w / 2} ${g.y - 13} L ${g.x + g.w - 80} ${g.y + 4}`} fill="none" stroke="#6B5B45" strokeWidth={2.5} />
        <circle cx={g.x + g.w / 2} cy={g.y - 13} r={5} fill="#6B5B45" />
      </g>}
      <rect x={g.x} y={g.y} width={g.w} height={H} rx={wall ? 16 : 2} fill={wall ? CE.paper : "#FFFFFF"} stroke={CE.ink} strokeWidth={wall ? 3 : 4.5} />
      {wall
        ? <path d={`M ${g.x} ${g.y + g.bar} V ${g.y + 16} Q ${g.x} ${g.y} ${g.x + 16} ${g.y} H ${g.x + g.w - 16} Q ${g.x + g.w} ${g.y} ${g.x + g.w} ${g.y + 16} V ${g.y + g.bar} Z`} fill={CE.ink} />
        : <line x1={g.x} y1={g.y + g.bar} x2={g.x + g.w} y2={g.y + g.bar} stroke={CE.ink} strokeWidth={3} />}
      {wall && [g.x + 92, g.x + g.w - 92].map((rx, k) => <circle key={"ring" + k} cx={rx} cy={g.y + 8} r={6} fill="none" stroke="#C9BCA6" strokeWidth={3} />)}
      <g data-scale="title"><text x={g.x + g.w / 2} y={g.y + g.bar / 2 + tfs * 0.36} textAnchor="middle" fontSize={tfs} fontWeight={700} fill={wall ? "#FFFFFF" : CE.ink}>{title}</text></g>
      <rect x={gx} y={g.y + g.bar} width={7 * g.cw} height={g.head} fill={wall ? "#F2E4CE" : "#FFFFFF"} stroke={CE.ink} strokeWidth={2.4} />
      <g data-scale="weekdays">{(g.cw >= 60 ? CE_DAY3 : CE_DAY2).map((s, c) => <text key={s} x={cx(c)} y={g.y + g.bar + g.head / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CE.ink}>{tx(s)}</text>)}</g>
      {cells}
      <rect x={gx} y={gy} width={7 * g.cw} height={g.rows * g.ch} fill="none" stroke={CE.ink} strokeWidth={4.5} />
      {o.under}
      <g data-scale="dates">{nums}</g>
      {o.over}
    </g>
  );
}

/* THE FIST (owner 2026-10-28): a real photo, skin "fist" (images.json): the back of a closed RIGHT fist, thumb at its
   left, a 146 x 220 tile drawn uniformly scaled. Its knuckle (K) and dip (D) marks in tile px, left to right K1 D1 K2 D2 K3
   D3 K4 (K1 is the index knuckle, next to the thumb). The first fist (on the left) is the LEFT hand: the same photo
   mirrored (x -> 146 - x), so its index knuckle is at its right end, next to the other thumb. The months run left to
   right: the left fist from its little-finger knuckle (January) to its index knuckle (July), then the right fist from
   its index knuckle (August) on, as the brief has it (July and August both on a knuckle). */
const CE_FIST = { w: 146, h: 220, s: 1.9, y: 100, show: 172, marks: [[44, 16], [59, 22], [75, 16], [90, 28], [103, 26], [118, 36], [130, 40]] };
const CE_FX = [180, 628];   /* the left edge of each fist's tile, in Work units */
const ceMark = (f: number, i: number) => {
  const mk = f === 0 ? CE_FIST.marks.slice().reverse().map(([x, y]) => [CE_FIST.w - x, y]) : CE_FIST.marks;
  return { x: CE_FX[f] + mk[i][0] * CE_FIST.s, y: CE_FIST.y + mk[i][1] * CE_FIST.s };
};
/* the plain fist under the photo (the fallback), in the tile's own px: humps on the marks, the thumb at the left */
function ceFistTile() {
  return (
    <g>
      <ellipse cx={34} cy={100} rx={12} ry={30} fill={CE.skin} stroke={CE.skinEdge} strokeWidth={2.5} />
      <rect x={38} y={30} width={98} height={190} rx={22} fill={CE.skin} stroke={CE.skinEdge} strokeWidth={2.5} />
      {[[44, 30, 13], [75, 30, 13], [103, 39, 12], [128, 51, 10]].map(([x, y, r], k) => <circle key={"h" + k} cx={x} cy={y} r={r} fill={CE.skin} stroke={CE.skinEdge} strokeWidth={2.5} />)}
      <rect x={40} y={36} width={94} height={56} fill={CE.skin} />
      {[[59, 22], [90, 28], [118, 36]].map(([x, y], k) => <path key={"d" + k} d={`M ${x} ${y + 10} L ${x + 2} 120`} stroke={CE.crease} strokeWidth={2.5} strokeLinecap="round" />)}
    </g>
  );
}
/* one fist: the plain drawing, then the photo over it (mirrored for the left hand); `cut` hides the wrist below that tile row
   (the photo keeps its own aspect: it is clipped, never squeezed) */
function ceFistG(x0: number, y0: number, s: number, mirror: boolean, cut?: number) {
  const tr = mirror ? `translate(${x0 + CE_FIST.w * s} ${y0}) scale(${-s} ${s})` : `translate(${x0} ${y0}) scale(${s})`;
  const id = "ce-fist-" + (mirror ? "l" : "r") + (cut || CE_FIST.h);
  return (
    <g transform={tr}>
      <defs><clipPath id={id}><rect x={-30} y={-10} width={CE_FIST.w + 60} height={(cut || CE_FIST.h) + 10} /></clipPath></defs>
      <g clipPath={`url(#${id})`}>{ceFistTile()}</g>
      <Skin name="fist" x={0} y={0} w={CE_FIST.w} h={CE_FIST.h} clip={`url(#${id})`} />
    </g>
  );
}
/* the knuckle method's twelve spots, in the order the months are said: left fist k d k d k d k, then the right fist k d k d k.
   Each spot has its mark on the fist and a slot in the row above, where the month card sits (February's slot is wider) */
const ceSlotW = (j: number) => (j === 1 ? 132 : 64);
const ceSlotX = (j: number) => { if (j >= 7) return 596 + (j - 7) * 70; let x = 16; for (let k = 0; k < j; k++) x += ceSlotW(k) + 6; return x; };
const ceSpot = (j: number) => { const f = j < 7 ? 0 : 1, i = j < 7 ? j : j - 7, mk = ceMark(f, i), w = ceSlotW(j); return { j, x: ceSlotX(j) + w / 2, w, k: i % 2 === 0, cy: 42, px: mk.x, py: mk.y }; };
const ceCard2 = (m: number) => ({ x: 14 + m * 88, y: 440, w: 80, h: 72 });
const ceChipDays = (m: number, j: number) => (ceSpot(j).k ? "31" : m === 1 ? "28 or 29" : "30");
/* phase 1 month cards, phase 3 strip tiles and year ruler */
const ceCard1 = (m: number) => ({ x: 490 + (m % 6) * 98, y: m < 6 ? 8 : 92, w: 90, h: 76 });
const CE_TILE = (j: number) => ({ x: 490 + j * 148, y: 8, w: 136, h: 124 });
const CE_RL = { x0: 512, x1: 1050, y: 286, y0: 2024, y1: 2052 };
const ceRX = (yr: number) => CE_RL.x0 + ((yr - CE_RL.y0) * (CE_RL.x1 - CE_RL.x0)) / (CE_RL.y1 - CE_RL.y0);

/* a real touch on the board (a press or a drag of the child's own, never toolApi): only then does the answer gate lock */
const CE_TOUCH = { v: false };

/* One entry per phase = one mount. Lines are ONE sentence each (keyOnly). */
const PHASES = [
  {
    n: 1,
    concept: "Days, weeks, months and a year",
    conceptId: "M1.S2.T6.C28", objectiveIds: ["O9"],
    says: ["Flip the pages of the wall calendar."],
    steps: [
      { say: "Tap a full row of the calendar to count one week.", on: "week", hint: "Pick a row with a date in every box." },
      { say: "Tap the January card to see how many days it has.", on: "card-jan", hint: "January is the first month card." },
      { say: "Now tap the arrow on the page to turn to February.", on: "next", hint: "The arrow is at the right end of the dark bar." },
    ],
    ladder: ["Count the days one row of seven at a time.", "Try it on one month of the calendar first."],
    closing: "A week has 7 days, and an ordinary year is 52 weeks and 1 more day.",
    learned: "You learned: 7 days make a week, and a year is about 52 weeks.",
    traceback: "Full rows light one week at a time and stop one week short; the month cards light up to November; the 52 weeks fill and the one day left over is lit amber.",
    items: [
      /* learn CE1: answer in the plan = 28 days (plan: A school trip lasts 4 weeks. How many days is that?) */
      { qid: "M1.S2.T6.C28:CE1", kind: "weeks", page: 9, answer: 28, near: 11, unit: "days",
        say: "A school trip lasts 4 weeks, so how many days is that?", ask: "4 weeks = ? days",
        miss: "Each full row is one week of 7 days; count the days in 4 rows.",
        ladder: ["Count the lit boxes row by row, in sevens.", "Add 7 four times: 7, 14, then two more sevens."],
        win: "Yes, 4 weeks of 7 days make 28 days." },
      /* practice 1: answer in the plan = 12 pages, one for each of the 12 months */
      { qid: "M1.S2.T6.C28:1", kind: "pages", page: 0, answer: 12, near: 11, unit: "pages",
        say: "A wall calendar has one page for each month, so how many pages does it have?", ask: "Pages in a year?",
        miss: "Count every month card from January to December.",
        ladder: ["Each month card stands for one page of the calendar.", "The lit cards stop at November; add December too."],
        win: "Yes, 12 months make 12 pages." },
      /* practice 5: answer in the plan = 365 days, because 52 weeks is 364 days and 1 more day makes 365 */
      { qid: "M1.S2.T6.C28:5", kind: "year", page: 0, answer: 365, near: 364, unit: "days",
        say: "A bus pass lasts a year of 52 weeks and 1 more day; how many days is that?", ask: "52 weeks + 1 day?",
        miss: "Find the days in 52 weeks first, then add the extra day.",
        ladder: ["52 weeks make 364 days, as the week counter shows.", "Add the 1 day left over to 364."],
        win: "Yes, 364 days and 1 more make 365 days." },
    ],
  },
  {
    n: 2,
    concept: "How many days in a month: the knuckle method",
    conceptId: "M1.S2.T6.C29", objectiveIds: ["O9"],
    says: ["Say the months along the knuckles and the dips."],
    steps: [
      { say: "Tap the January card to put it on the first knuckle.", on: "m1", hint: "January is the first card in the row." },
      { say: "Now put February in the dip next to it.", on: "m2", hint: "Tap the February card, the second in the row." },
      { say: "March goes on the next knuckle, so tap its card.", on: "m3", hint: "March is the third card in the row." },
    ],
    ladder: ["Start at January on the first knuckle and say each month in turn.", "Go from the last knuckle of the first fist to the first knuckle of the second."],
    closing: "Knuckle months have 31 days, dip months have 30, and February has 28 or 29.",
    learned: "You learned: knuckle months have 31 days and dip months have 30.",
    traceback: "The months are said along the fists from January and stop just before the asked month; its calendar page lights its days a week at a time and stops before the last day.",
    items: [
      /* learn CE2: answer in the plan = A knuckle month. July has 31 days. */
      { qid: "M1.S2.T6.C29:CE2", kind: "knuckle", months: [6], answer: 31, near: 30, unit: "days",
        say: "Is July a knuckle or a dip month, and how many days does July have?", ask: "Days in July?",
        miss: "Say the months along the fist from January to find where July goes.",
        ladder: ["July comes just after June, which sits in a dip.", "July sits on a knuckle, just like January."],
        win: "Yes, July is a knuckle month with 31 days." },
      /* practice 2: answer in the plan = A dip month. June has 30 days. */
      { qid: "M1.S2.T6.C29:2", kind: "knuckle", months: [5], answer: 30, near: 31, unit: "days",
        say: "A school term ends in June; use the fists to find how many days June has.", ask: "Days in June?",
        miss: "Count along from March: April, May, then June.",
        ladder: ["June sits between the May and July knuckles.", "June is in a dip, so it has a day fewer than July."],
        win: "Yes, June is a dip month with 30 days." },
      /* practice 6: answer in the plan = October has 1 more day (October 31, September 30) */
      { qid: "M1.S2.T6.C29:6", kind: "knuckle", months: [8, 9], answer: 1, near: 31, unit: "more day",
        say: "Which has more days, September or October, and how many more?", ask: "How many more days?",
        miss: "Put September and October on the second fist and read their days.",
        ladder: ["September sits in a dip and October on a knuckle.", "Take September's days away from October's days."],
        win: "Yes, October has 1 more day." },
    ],
  },
  {
    n: 3,
    concept: "Leap year: every fourth year has 366 days",
    conceptId: "M1.S2.T6.C30", objectiveIds: ["O10"],
    says: ["Look at the four Februaries on the strip."],
    steps: [
      { say: "Tap 2026 on the strip to see its February.", on: "y2026", hint: "2026 is the first year on the strip." },
      { say: "Now tap 2028 and watch its February grow a day.", on: "y2028", hint: "2028 is the third year on the strip." },
      { say: "Tap On 4 to step the marker four years on.", on: "on4", hint: "On 4 is the key under the year ruler." },
    ],
    ladder: ["Count on in fours from a leap year.", "Only the years the marker lands on are leap years."],
    closing: "Every fourth year is a leap year, with 366 days and a 29 February.",
    learned: "You learned: every fourth year is a leap year with 366 days.",
    traceback: "The marker steps in fours from a leap year, lighting only the leap years while the years between stay dark, and stops one hop short.",
    items: [
      /* learn CE3: answer in the plan = 29 days, because 2044 is a leap year (the plan's "28 or 29" would print the answer) */
      { qid: "M1.S2.T6.C30:CE3", kind: "leap", target: 2044, mk0: 2028, lit0: [2028], dir: 1, answer: 29, near: 28, unit: "days",
        say: "A school calendar is printed for 2044; how many days does its February have?", ask: "February 2044?",
        miss: "Step the marker on in fours from 2028 to see if 2044 is a leap year.",
        ladder: ["2044 is a leap year, just like 2028 on the strip.", "A leap February has one more day than the February of 2026."],
        win: "Yes, leap year 2044 has a 29 February." },
      /* practice 3: answer in the plan = 2048, because 2048 is a leap year and 2046 is not (the two years are the keys) */
      { qid: "M1.S2.T6.C30:3", kind: "leap", target: 2048, mk0: 2044, lit0: [2028, 2032, 2036, 2040, 2044], dir: 1,
        choices: [{ id: "2046", label: "2046" }, { id: "2048", label: "2048" }], answer: "2048", near: "2046", unit: "",
        say: "A birthday card says 29 February; which year on the keys can have that date?", ask: "Which year?",
        miss: "Step on in fours from 2044 and see where the marker lands.",
        ladder: ["An even year is not always a leap year.", "Add 4 to 2044 to find the next leap year."],
        win: "Yes, 2048 is the next leap year." },
      /* practice 7: answer in the plan = 2045 (the leap year before 2048 is 2044, and this year is 1 year later) */
      { qid: "M1.S2.T6.C30:7", kind: "leap", target: 2044, mk0: 2048, lit0: [2048], dir: -1, answer: 2045, near: 2044, unit: "",
        say: "Last year was a leap year and the next one is 2048; what year is it now?", ask: "This year?",
        miss: "Step the marker back four years from 2048 to find the last leap year.",
        ladder: ["The last leap year was 2044.", "This year comes just after 2044."],
        win: "Yes, it is 2045 now." },
    ],
  },
  {
    n: 4,
    concept: "Finding a day and a date on a calendar",
    conceptId: "M1.S2.T6.C31", objectiveIds: ["O10"],
    says: ["Circle a date and hop seven days at a time."],
    steps: [
      { say: "Tap the 3rd to circle it with the pencil.", on: "date", hint: "The 3rd is in the top row of the page." },
      { say: "Tap Hop 7: not counting the 3rd, one week on is the 10th.", on: "hop", hint: "Hop 7 is the key under the week counter." },
      { say: "Hop again and see that the day stays the same.", on: "hop", hint: "Tap Hop 7 one more time." },
    ],
    ladder: ["Hop 7 days and read the day at the top of the column.", "Count the hops; each hop is one week."],
    closing: "The same day of the week comes back every 7 days.",
    learned: "You learned: the same weekday comes back every 7 days.",
    traceback: "The first date is circled and left out of the count, the pencil hops a week at a time down the same column, and it stops one hop or one day short.",
    items: [
      /* learn CE4: answer in the plan = 4 weeks (3 October to 31 October 2026, counting on from the 3rd) */
      { qid: "M1.S2.T6.C31:CE4", kind: "weeks", page: [2026, 9], from: 3, to: 31, answer: 4, near: 5, unit: "weeks",
        say: "A plant took from 3 to 31 October 2026 to flower; how many weeks is that?", ask: "Weeks, 3rd to 31st?",
        miss: "Circle the 3rd and hop in sevens to the 31st, not counting the 3rd.",
        ladder: ["Each hop is one week; count the hops, not the dates.", "From the 3rd you land on 10, 17 and 24, then hop once more."],
        win: "Yes, 4 hops of 7 days make 4 weeks." },
      /* practice 4: answer in the plan = Friday (2 weeks later is the same day); the borrow date is circled on the page so the
         question names no weekday (the plan's "borrowed on a Friday" would print the answer) */
      { qid: "M1.S2.T6.C31:4", kind: "due", page: [2026, 10], from: 6, to: 20, choices: CE_WEEKDAY_KEYS, answer: "fri", near: "sat", unit: "",
        say: "A book borrowed on 6 November 2026 is due 2 weeks later; which day is that?", ask: "Due on which day?",
        miss: "Circle the 6th and hop 7 days twice.",
        ladder: ["Hopping 7 days always lands on the same day of the week.", "The due date is in the same column as the 6th."],
        win: "Yes, 2 weeks on, it is Friday again." },
      /* practice 8: answer in the plan = Wednesday, because 22 June is a Monday and 24 June is 2 days later */
      { qid: "M1.S2.T6.C31:8", kind: "weekday", page: [2026, 5], from: 1, date: 24, choices: CE_WEEKDAY_KEYS, answer: "wed", near: "tue", unit: "",
        say: "The exam is on 24 June 2026 and 1 June is a Monday; which day is the exam?", ask: "Exam day?",
        miss: "Hop from Monday the 1st in sevens, then count on to the 24th.",
        ladder: ["The 22nd is a Monday too; count on from there.", "Two days after a Monday is the day you want."],
        win: "Yes, 24 June 2026 is a Wednesday." },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL = {
  weekStarts: "Sunday", practiceYear: 2026, strip: [2026, 2027, 2028, 2029], ruler: [CE_RL.y0, CE_RL.y1], years: [2000, 2099],
  pages: "computed: the weekday of the 1st by a day count from 1 January 1900 (a Monday); month lengths 28/29/30/31 with the leap rule",
  between: "the days between two dates count on from the first date, never counting it",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.choices) return String(v ?? "").trim().toLowerCase() === String(item.answer).toLowerCase();
  return leadNumber(v) === item.answer;
};
/* oracle: every answer again by a second route (the browser's own Date, no code shared with judge or the pages) */
const oracle = () => {
  const len = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const day = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d)).getUTCDay();
  const gap = (a: number[], b: number[]) => Math.round((Date.UTC(b[0], b[1], b[2]) - Date.UTC(a[0], a[1], a[2])) / 86400000);
  const ids = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const [p1, p2, p3, p4]: any[] = PHASES.map((p: any) => p.items);
  const yearDays = gap([2026, 0, 1], [2027, 0, 1]);
  let months = 0;
  for (let k = 0; k < yearDays; k++) if (new Date(Date.UTC(2026, 0, 1 + k)).getUTCDate() === 1) months++;
  let lastLeap = 2047;
  while (len(lastLeap, 1) !== 29) lastLeap--;
  let fullRows = 0;
  for (let d = 1; d <= len(2026, p1[0].page); d++) if (day(2026, p1[0].page, d) === 0 && d + 6 <= len(2026, p1[0].page)) fullRows++;
  const ok = [
    p1[0].answer === 4 * 7 && fullRows >= 4,
    p1[1].answer === months,
    p1[2].answer === yearDays && yearDays === 52 * 7 + 1,
    p2[0].answer === len(2026, 6), p2[1].answer === len(2026, 5), p2[2].answer === len(2026, 9) - len(2026, 8),
    p3[0].answer === len(2044, 1),
    p3[1].answer === String([2046, 2048].find((y) => len(y, 1) === 29)),
    p3[2].answer === lastLeap + 1,
    p4[0].answer === gap([2026, 9, 3], [2026, 9, 31]) / 7 && day(2026, 9, 3) === day(2026, 9, 31),
    p4[1].answer === ids[day(2026, 10, 6 + 14)],
    p4[2].answer === ids[day(2026, 5, 24)] && day(2026, 5, 1) === 1,
  ];
  /* and every page the tool can draw starts on the weekday, and holds the days, that the second route gives */
  for (let y = 2000; y <= 2099; y++) for (let m = 0; m < 12; m++) ok.push(ceDow(y, m, 1) === day(y, m, 1) && ceLen(y, m) === len(y, m));
  return ok.every(Boolean);
};
/* the misconception of each item (judge must reject it) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.choices) {
    const k = CE_DAYID.indexOf(String(item.answer));
    return k >= 0 ? [CE_DAYS[k], CE_DAY3[k]] : [String(item.answer)];
  }
  return [String(item.answer), indian(item.answer), words(item.answer)];
};
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: it does the question's act at once (the agent is never gated), then Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the board of each entry (a question, the guide steps, free play) ─────────────────────── */
function ceFresh(n: number, i: number, demo: boolean, free: boolean) {
  const b: any = { pg: { y: 2026, m: 0 }, rows: [], weeks: 0, hot: null, seen: [], open: [], wk52: 0, yearDone: false,
    placed: {}, side: null, carrying: null, tiles: [], sel: null, mk: 2028, mkv: null, moving: false, lit: [2028], backed: false, sq: 1,
    circ: null, ring: 1, hops: [], arc: null, gate: false, trace: null };
  if (free) return { ...b, pg: { y: 2026, m: 5 } };
  const it: any = (PHASES[n - 1] && PHASES[n - 1].items[i]) || {};
  if (n === 1) return { ...b, pg: { y: 2026, m: demo ? 0 : it.page } };
  if (n === 2) {
    const upto = demo ? 0 : i === 2 ? 7 : 3, pl: any = {};
    for (let m = 0; m < upto; m++) pl[m] = m;
    if (!demo && i === 1) pl[6] = 6;
    return { ...b, placed: pl, side: demo ? null : i === 1 ? 6 : upto - 1 };
  }
  if (n === 3) return { ...b, pg: { y: 2026, m: 1 }, tiles: demo ? [] : [2026, 2028], sel: demo ? null : 2026, mk: demo ? 2028 : it.mk0, lit: demo ? [2028] : it.lit0 };
  return { ...b, pg: demo ? { y: 2026, m: 8 } : { y: it.page[0], m: it.page[1] } };
}
/* has the child done the question's act (the answer gate opens) */
function ceActDone(n: number, it: any, S: any) {
  if (n === 1) return it.kind === "weeks" ? S.weeks >= 4 : it.kind === "pages" ? S.seen.length >= 12 : !!S.yearDone;
  if (n === 2) return (it.months || []).every((m: number) => S.placed[m] !== undefined);
  if (n === 3) return it.dir < 0 ? !!S.backed : S.lit.indexOf(it.target) >= 0;
  if (n === 4) return it.date ? S.circ === it.date || (S.circ === it.from && S.hops.indexOf(22) >= 0) : S.circ === it.from && S.hops.indexOf(it.to) >= 0;
  return true;
}
/* the agent's act, done at once (no animation) */
function ceInstant(n: number, it: any, S: any) {
  if (n === 1) {
    if (it.kind === "weeks") { const keys = ceFullRows(S.pg.y, S.pg.m).map((r) => S.pg.y + "-" + S.pg.m + "-" + r); return { rows: keys, weeks: keys.length, gate: true }; }
    if (it.kind === "pages") return { seen: CE_MON3.map((_, k) => k), pg: { y: 2026, m: 11 }, gate: true };
    return { wk52: 4, yearDone: true, pg: { y: 2026, m: 11 }, gate: true };
  }
  if (n === 2) { const pl = { ...S.placed }; (it.months || []).forEach((m: number) => { pl[m] = m; }); return { placed: pl, side: it.months[it.months.length - 1], gate: true }; }
  if (n === 3) { let lit = S.lit; for (let y = S.mk; it.dir > 0 ? y <= it.target : y >= it.target; y += 4 * it.dir) lit = ceAddU(lit, y); return { mk: it.target, lit, backed: true, gate: true }; }
  if (n === 4) {
    if (it.date) return { circ: it.date, ring: 1, hops: [], gate: true };
    const hops: number[] = [];
    for (let d = it.from + 7; d <= it.to; d += 7) hops.push(d);
    return { circ: it.from, ring: 1, hops, gate: true };
  }
  return { gate: true };
}

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 shut, 1086 x 520 open (bigPad is off: a seven-column page plus the fists or the
   strip needs the classic width). Everything is laid out for the open width (x 0 to 1076) and stays put when the
   keypad opens; nothing stands under box.key. Phase 2's small calendar page shows only while the keypad is shut. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const tlFx = useTimeline();
  const demo = stage === "demo" || stage === "teach";
  const free = stage === "free";
  const ask = stage === "ask";
  const won = stage === "win" || stage === "idle";
  const live = stage === "demo" || ask || free;
  const it: any = item || {};
  const qi = index || 0;
  const P = free ? 4 : n;

  /* the board belongs to the ENTRY (PATTERNS §18): a question entered again opens fresh */
  const busy = useRef(false);
  const traceBusy = useRef(false);
  const lockMemo = useRef<any>(null);
  const qk = free ? "free" : stage === "summary" ? "sum" : demo ? n + ":demo" : n + ":" + qi;
  const E = useRef<any>({ qk: "", k: 0, fresh: null });
  if (E.current.qk !== qk) { E.current = { qk, k: E.current.k + 1, fresh: ceFresh(n, qi, demo, free) }; lockMemo.current = null; }
  const ek = E.current.k;
  const [raw, setRaw] = useState<any>({ ek: -1 });
  const S: any = raw.ek === ek ? raw : { ...E.current.fresh, ek };
  const upd = (fn: any) => {
    const k = ek;
    setRaw((p: any) => {
      if (E.current.k !== k) return p;
      const b = p.ek === k ? p : { ...E.current.fresh, ek: k };
      return { ...b, ...(typeof fn === "function" ? fn(b) : fn) };
    });
  };
  const [view, setView] = useState("wall");
  const [leaf, setLeaf] = useState<any>(null);
  const [, bump] = useState(0);
  const touch = () => { if (!CE_TOUCH.v) { CE_TOUCH.v = true; bump((x: number) => x + 1); } };
  const did = (name: string) => { if (stage === "demo") api.did(name); };
  const wipe = () => { if (S.trace) upd({ trace: null }); };
  const idle = () => !busy.current && !traceBusy.current;

  /* an act performed on screen (PATTERNS §15): react only when it resolves true */
  const runAct = (o: any, done: () => void, fail?: () => void) => {
    if (busy.current) return false;
    busy.current = true;
    bump((x: number) => x + 1);
    api.act(o).then((ok: boolean) => {
      busy.current = false; lockMemo.current = null;
      if (ok) done(); else if (fail) fail();
      bump((x: number) => x + 1);
    });
    return true;
  };

  /* ── the answer gate (PATTERNS §19): locked while the act is undone, in user mode, after a real touch ── */
  const gateNow = !!S.gate || ceActDone(n, it, S);
  const needLock = ask && !gateNow && CE_TOUCH.v;
  useEffect(() => {
    if (!ask || busy.current || traceBusy.current) return;
    if (lockMemo.current !== needLock) { lockMemo.current = needLock; api.lock(needLock); }
  });

  const pg = S.pg;
  const gx = ceGX(CEB), gy = ceGY(CEB);

  /* ── phase 1: rows, cards, pages, weeks ── */
  const firstFreeRow = () => { const full = ceFullRows(pg.y, pg.m); const r = full.find((k) => S.rows.indexOf(pg.y + "-" + pg.m + "-" + k) < 0); return r === undefined ? null : r; };
  const countRow = (r: any) => {
    if (!idle()) return;
    if (stage === "demo" && stepOn !== "week") { did("week"); return; }
    const full = ceFullRows(pg.y, pg.m);
    if (r === null || full.indexOf(r) < 0) { did("partrow"); return; }
    const key = pg.y + "-" + pg.m + "-" + r;
    if (S.rows.indexOf(key) >= 0) return;
    wipe();
    const f = ceDow(pg.y, pg.m, 1);
    const at = Array.from({ length: 7 }, (_, c) => ceCellC(CEB, pg.y, pg.m, r * 7 - f + 1 + c));
    upd({ hot: { key, k: 0 } });
    runAct({ tool: "hand", moves: "tap", at, ms: 1100, onPoint: (i: number) => upd({ hot: { key, k: i + 1 } }) },
      () => { upd((p: any) => ({ rows: [...p.rows, key], weeks: p.weeks + 1, hot: null })); did("week"); },
      () => upd({ hot: null }));
  };
  const tapCard = (m: number) => {
    if (!idle()) return;
    const name = "card-" + CE_MON3[m].toLowerCase();
    if (stage === "demo" && stepOn !== name) { did(name); return; }
    wipe();
    const b = ceCard1(m);
    runAct({ tool: "hand", moves: "tap", at: [{ x: b.x + b.w / 2, y: b.y + b.h / 2 }], ms: 900 },
      () => { upd((p: any) => ({ open: ceAddU(p.open, m), seen: ceAddU(p.seen, m), pg: { y: 2026, m } })); api.sfx.tick(); did(name); });
  };
  const flip = (dir: number) => {
    if (!idle()) return;
    const name = dir > 0 ? "next" : "prev";
    const np = ceStep(S.pg, dir);
    if (np.y < 2000 || np.y > 2099) { did(name); return; }
    wipe();
    upd((p: any) => ({ pg: np, seen: n === 1 && !free && np.y === 2026 ? ceAddU(p.seen, np.m) : p.seen, circ: free ? null : p.circ, hops: free ? [] : p.hops, ring: 1 }));
    api.sfx.tick();
    tlFx.run([[0, () => setLeaf({ dir, k: 1 })], [110, () => setLeaf({ dir, k: 2 })], [110, () => setLeaf({ dir, k: 3 })], [110, () => setLeaf(null)]]);
    did(name);
  };
  const flipYear = () => {
    if (!idle()) return;
    wipe();
    runAct({ tool: "hand", moves: "tap", ms: 1100, at: CE_MON3.map((_, m) => { const b = ceCard1(m); return { x: b.x + b.w / 2, y: b.y + b.h / 2 }; }),
      onPoint: (i: number) => upd((p: any) => ({ pg: { y: 2026, m: i }, seen: ceAddU(p.seen, i) })) }, () => api.sfx.settle());
  };
  const countWeeks = () => {
    if (!idle() || S.yearDone) return;
    wipe();
    runAct({ tool: "hand", moves: "sweep", ms: 1100, at: [0, 1, 2, 3].map((c) => ({ x: 562 + c * 118, y: 300 })), onPoint: (i: number) => upd({ wk52: i + 1 }) },
      () => { upd({ wk52: 4, yearDone: true, pg: { y: 2026, m: 11 } }); api.sfx.settle(); });
  };

  /* ── phase 2: the month cards and the fists ── */
  const freeSpot = (j: number) => !Object.keys(S.placed).some((k) => S.placed[k] === j);
  const nearSpot = (p: any) => {
    if (!p || !isFinite(p.x)) return null;
    let best: any = null, bd = 56;
    for (let j = 0; j < 12; j++) { const s = ceSpot(j); const d = Math.min(Math.hypot(p.x - s.x, p.y - s.cy), Math.hypot(p.x - s.px, p.y - s.py) * 1.6); if (d < bd) { bd = d; best = j; } }
    return best;
  };
  const cardNode = (m: number) => (
    <g>
      <rect x={-40} y={-36} width={80} height={72} rx={12} fill="#FFFFFF" stroke={CE.ink} strokeWidth={2.4} />
      <rect x={-40} y={-36} width={80} height={14} rx={6} fill={C.panel} />
      <text x={0} y={18} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CE.ink}>{tx(CE_MON3[m])}</text>
    </g>
  );
  const carry = (m: number) => {
    if (!idle() || !freeSpot(m)) return;
    wipe();
    const b = ceCard2(m), s = ceSpot(m);
    upd({ carrying: m });
    runAct({ tool: "hand", moves: "carry", ms: 1000, from: { x: b.x + 40, y: b.y + 36 }, at: [{ x: s.x, y: s.cy }], hold: cardNode(m) },
      () => { upd((p: any) => ({ placed: { ...p.placed, [m]: m }, side: m, carrying: null })); api.sfx.tick(); did("m" + (m + 1)); },
      () => upd({ carrying: null }));
  };
  const onDrop2 = (m: any, p: any, moved: boolean) => {
    if (P !== 2 || !live || !idle()) return;
    touch();
    const name = "m" + (m + 1);
    const fixed = E.current.fresh && E.current.fresh.placed && E.current.fresh.placed[m] !== undefined;
    if (S.placed[m] !== undefined) {   /* a card the child put on the fist: a tap takes it back, a drag moves it */
      if (fixed || stage === "demo") { did(name); return; }
      const j = moved ? nearSpot(p) : null;
      upd((q: any) => { const pl = { ...q.placed }; delete pl[m]; if (j !== null && freeSpot(j)) pl[m] = j; return { placed: pl, trace: null, side: j !== null ? m : q.side }; });
      if (j !== null) api.sfx.tick();
      return;
    }
    if (stage === "demo") {
      if (stepOn !== name) { did(name); return; }
      if (!moved) { carry(m); return; }
      if (nearSpot(p) === m) { upd((q: any) => ({ placed: { ...q.placed, [m]: m }, side: m })); api.sfx.tick(); did(name); } else did("spot");
      return;
    }
    if (!moved) { carry(m); return; }
    const j = nearSpot(p);
    if (j === null || !freeSpot(j)) return;
    wipe();
    upd((q: any) => ({ placed: { ...q.placed, [m]: j }, side: m }));
    api.sfx.tick();
  };
  const drag = useDrag(onDrop2);

  /* ── phase 3: the strip and the year ruler ── */
  const tapTile = (yr: number) => {
    if (!idle()) return;
    const name = "y" + yr;
    if (stage === "demo" && stepOn !== name) { did(name); return; }
    wipe();
    const b = CE_TILE(yr - 2026);
    runAct({ tool: "hand", moves: "tap", ms: 900, at: [{ x: b.x + b.w / 2, y: b.y + b.h / 2 }] }, () => {
      const leap = ceLeap(yr);
      upd((p: any) => ({ tiles: ceAddU(p.tiles, yr), sel: yr, pg: { y: yr, m: 1 }, sq: leap ? 0 : 1 }));
      if (leap) tlFx.run([[120, () => upd({ sq: 0.45 })], [110, () => upd({ sq: 0.8 })], [110, () => { upd({ sq: 1 }); api.sfx.tick(); }]]);
      else api.sfx.tick();
      did(name);
    });
  };
  const hop4 = (dir: number) => {
    if (!idle()) return;
    const name = dir > 0 ? "on4" : "back4";
    if (stage === "demo" && stepOn !== name) { did(name); return; }
    const from = S.mk, to = from + 4 * dir;
    if (to < CE_RL.y0 || to > CE_RL.y1) { did(name); return; }
    wipe();
    upd({ moving: true });
    runAct({ tool: "hand", moves: "push", ms: 1000, from: { x: ceRX(from), y: CE_RL.y - 18 }, at: [1, 2, 3, 4].map((k) => ({ x: ceRX(from + k * dir), y: CE_RL.y - 18 })),
      onPoint: (i: number) => upd({ mkv: from + (i + 1) * dir }) },
      () => { upd((p: any) => ({ mk: to, mkv: null, moving: false, lit: ceLeap(to) ? ceAddU(p.lit, to) : p.lit, backed: p.backed || (dir < 0 && to === 2044) })); api.sfx.tick(); did(name); },
      () => upd({ moving: false, mkv: null }));
  };

  /* ── phase 4 and free play: the pencil circles a date and hops a week at a time ── */
  const circle = (d: number) => {
    if (!idle()) return;
    if (stage === "demo" && stepOn !== "date") { did("date"); return; }
    if (S.circ === d && !free) return;
    wipe();
    const at = ceRingPts(ceCellC(CEB, pg.y, pg.m, d), 14);
    upd({ circ: d, hops: [], ring: 0, arc: null });
    runAct({ tool: "pencil", moves: "draw", marks: true, ms: 800, from: at[0], at, onPoint: (i: number) => upd({ ring: (i + 1) / at.length }) },
      () => { upd({ ring: 1 }); did("date"); }, () => upd({ ring: 1 }));
  };
  const lastHop = S.hops.length ? S.hops[S.hops.length - 1] : S.circ;
  const canHop = S.circ !== null && lastHop + 7 <= ceLen(pg.y, pg.m);
  const hop = () => {
    if (!idle()) return;
    if (stage === "demo" && stepOn !== "hop") { did("hop"); return; }
    if (!canHop) { did("hop"); return; }
    wipe();
    const a = lastHop, b = a + 7;
    const pts = ceArcPts(ceCellC(CEB, pg.y, pg.m, a), ceCellC(CEB, pg.y, pg.m, b), 8);
    upd({ arc: { a, b, t: 0 } });
    runAct({ tool: "pencil", moves: "draw", marks: true, ms: 800, from: pts[0], at: pts.slice(1), onPoint: (i: number) => upd({ arc: { a, b, t: (i + 1) / (pts.length - 1) } }) },
      () => { upd((p: any) => ({ hops: [...p.hops, b], arc: null })); api.sfx.tick(); did("hop"); }, () => upd({ arc: null }));
  };

  /* the calendar grid as ONE control where any row or date may be tapped (phase 1 rows, free play dates) */
  const pt = useRef<any>(null);
  const capPt = (e: any) => { const s = stagePoint(e, e.clientX, e.clientY); pt.current = s ? { x: s.x - W.x, y: s.y - W.y, t: Date.now() } : null; };
  const gridMode = P === 1 && !free && (stage === "demo" || (ask && it.kind === "weeks")) ? "week" : free ? "date" : null;
  const gridTap = () => {
    touch();
    const p = pt.current && Date.now() - pt.current.t < 1500 ? pt.current : null;
    pt.current = null;
    const cell = ceCellAt(CEB, pg.y, pg.m, p);
    if (gridMode === "week") countRow(cell ? cell.r : p ? null : firstFreeRow());
    else if (gridMode === "date") { const d = cell ? cell.d : 1; if (d) circle(d); }
  };
  const gridPress = usePress(gridTap, !!gridMode && live);

  /* the guide steps: Enter, the agent's check() and the dev solve() do the current step */
  const doStep = (on: any) => {
    if (!on) return;
    if (on === "week") countRow(firstFreeRow());
    else if (on.indexOf("card-") === 0) tapCard(CE_MON3.findIndex((s) => "card-" + s.toLowerCase() === on));
    else if (on === "next") flip(1);
    else if (/^m\d+$/.test(on)) carry(+on.slice(1) - 1);
    else if (/^y\d+$/.test(on)) tapTile(+on.slice(1));
    else if (on === "on4") hop4(1);
    else if (on === "date") circle(3);
    else if (on === "hop") hop();
  };
  api.onEnter(stage === "demo" && stepOn ? () => doStep(stepOn) : null);
  HOOK.demo = () => doStep(stepOn);
  HOOK.check = () => { if (ask && !gateNow) upd(ceInstant(n, it, S)); return undefined; };

  /* ── the traceback: the child's act is undone (its result named the answer), the working is replayed and stops
     one step before the answer (MISS HIDES THE ANSWER); the gate stays open ── */
  const traceSteps = () => {
    const st: any[] = [[380, null]];
    if (n === 1 && it.kind === "weeks") {
      ceFullRows(2026, it.page).slice(0, 3).forEach((r) => st.push([620, () => upd((p: any) => ({ rows: ceAddU(p.rows, "2026-" + it.page + "-" + r), weeks: p.weeks + 1 }))]));
    } else if (n === 1 && it.kind === "pages") {
      for (let m = 0; m < 11; m++) st.push([300, () => upd((p: any) => ({ pg: { y: 2026, m }, seen: ceAddU(p.seen, m) }))]);
    } else if (n === 1) {
      for (let c = 1; c <= 4; c++) st.push([420, () => upd({ wk52: c })]);
      st.push([600, () => upd({ yearDone: true, pg: { y: 2026, m: 11 } })]);
    } else if (n === 2) {
      const [w0, w1, sm] = qi === 0 ? [0, 5, 6] : qi === 1 ? [0, 4, 5] : [7, 9, 9];
      for (let j = w0; j <= w1; j++) st.push([420, () => upd({ trace: { on: true, w0, walk: j } })]);
      st.push([350, () => upd((p: any) => ({ trace: { ...p.trace, sm, wk: 0 } }))]);
      for (let k = 1; k <= 4; k++) st.push([450, () => upd((p: any) => ({ trace: { ...p.trace, wk: k } }))]);
      st.push([500, () => upd((p: any) => ({ trace: { ...p.trace, upto: ceLen(2026, sm) - 1 } }))]);
    } else if (n === 3) {
      if (qi === 0) [2032, 2036, 2040, 2044].forEach((y) => st.push([600, () => upd((p: any) => ({ mk: y, lit: ceAddU(p.lit, y) }))]));
      else if (qi === 1) { st.push([600, () => upd({ trace: { on: true, dim: [2042] } })]); st.push([600, () => upd({ trace: { on: true, dim: [2042, 2046] } })]); }
      else st.push([700, () => upd((p: any) => ({ mk: 2044, lit: ceAddU(p.lit, 2044) }))]);
    } else {
      const d0 = it.from, hopsTo = qi === 0 ? [10, 17, 24] : qi === 1 ? [13] : [8, 15, 22];
      st.push([500, () => upd({ circ: d0, ring: 1, hops: [] })]);
      hopsTo.forEach((d) => st.push([600, () => upd((p: any) => ({ hops: [...p.hops, d] }))]));
      if (it.date) st.push([600, () => upd({ trace: { on: true, extra: [23] } })]);
    }
    st.push([420, null]);
    return st;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    traceBusy.current = true; lockMemo.current = true;
    api.lock(true);
    upd(() => ({ ...E.current.fresh, gate: true, trace: { on: true } }));
    tl.run(traceSteps(), () => {
      traceBusy.current = false; lockMemo.current = null;
      upd((p: any) => ({ trace: { ...(p.trace || {}), on: false } }));
      api.lock(false);
    });
  }, [wrong]);
  useEffect(() => () => { tl.stop(); traceBusy.current = false; }, [ek]);

  /* the win line, once */
  const saidWin = useRef(-1);
  useEffect(() => { if (stage === "win" && saidWin.current !== ek && it.win) { saidWin.current = ek; api.say(it.win); } }, [stage, ek]);

  /* what the host and the agent read back (no answer before it is given) */
  api.share({ month: CE_MONTHS[pg.m], year: pg.y, view, knuckles: Object.keys(S.placed).map((k) => CE_MONTHS[+k]), circled: S.circ,
    hop: S.hops.length ? S.hops[S.hops.length - 1] : null, ...(won ? { weeks: S.hops.length || S.weeks, answer: typed } : {}) });

  /* ── drawing ─────────────────────────────────────────────────────────────────────────────── */
  const tr = S.trace;
  const label = (x: number, y: number, s: any, o: any = {}) => (
    <text x={x} y={y} textAnchor={o.a || "start"} fontSize={o.fs || T.micro} fontWeight={o.fw || 600} fill={o.c || CE.ink}>{s}</text>
  );
  const winChip = (x: number, y: number, w: number, s: string) => (
    <g data-reveals="answer">
      <rect x={x} y={y} width={w} height={48} rx={14} fill={mix(CE.ans, "#FFFFFF", 0.82)} stroke={shade(CE.ans, 0.25)} strokeWidth={3} />
      <text x={x + w / 2} y={y + 35} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(CE.ans, 0.45)}>{s}</text>
    </g>
  );
  const keyText = (s: string, on: boolean) => <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={on ? CE.ink : mix(CE.ink, "#FFFFFF", 0.22)}>{tx(s)}</text>;
  const arrowGlyph = (dir: number, on: boolean) => <path d={dir > 0 ? "M -7 -16 L 9 0 L -7 16" : "M 7 -16 L -9 0 L 7 16"} fill="none" stroke={on ? CE.ink : mix(CE.ink, "#FFFFFF", 0.3)} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />;
  let inv: any = null;   /* the one invite */

  /* the big calendar: phases 1, 3, 4 and free play */
  const bigCal = () => {
    const shownPg = won && P === 3 && it.dir === 1 && it.answer === 29 ? { y: 2044, m: 1 } : pg;
    const lit: any = {}, overs: any[] = [], unders: any[] = [];
    const cell = (d: number) => ceCellC(CEB, shownPg.y, shownPg.m, d);
    if (P === 1) {
      const f = ceDow(pg.y, pg.m, 1);
      S.rows.forEach((key: string) => { const [y, m, r] = key.split("-").map(Number); if (y === pg.y && m === pg.m) for (let c = 0; c < 7; c++) lit[r * 7 - f + 1 + c] = CE.hop; });
      if (S.hot) { const [y, m, r] = S.hot.key.split("-").map(Number); if (y === pg.y && m === pg.m) for (let c = 0; c < S.hot.k; c++) lit[r * 7 - f + 1 + c] = CE.hop; }
      if (S.yearDone && pg.y === 2026 && pg.m === 11) lit[31] = CE.amber;
    }
    if (P === 4) {
      S.hops.forEach((d: number) => { lit[d] = CE.hop; });
      if (tr && tr.extra) tr.extra.forEach((d: number) => { lit[d] = CE.extra; });
      const chain = [S.circ, ...S.hops];
      for (let k = 1; k < chain.length; k++) {
        const pts = ceArcPts(cell(chain[k - 1]), cell(chain[k]), 12);
        unders.push(<path key={"arc" + k} d={cePath(pts, 1)} fill="none" stroke={CE.pencil} strokeWidth={4} strokeLinecap="round" />);
        const e = pts[pts.length - 1];
        overs.push(<path key={"tick" + k} d={`M ${e.x + 8} ${e.y - 14} l 5 6 l 10 -12`} fill="none" stroke={shade(CE.hop, 0.3)} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />);
      }
      if (S.arc) unders.push(<path key="arcnow" d={cePath(ceArcPts(cell(S.arc.a), cell(S.arc.b), 12), S.arc.t)} fill="none" stroke={CE.pencil} strokeWidth={4} strokeLinecap="round" />);
      if (S.circ !== null) overs.push(<path key="ring" d={cePath(ceRingPts(cell(S.circ), 28), S.ring)} fill="none" stroke={CE.ink} strokeWidth={4.5} strokeLinecap="round" />);
      if (!free && it.to && it.kind === "weeks") overs.push(<path key="end" d={cePath(ceRingPts(cell(it.to), 28), 1)} fill="none" stroke={CE.ink} strokeWidth={3} strokeDasharray="7 6" />);
      if (won && !free) {
        const ad = it.kind === "weeks" ? it.to : it.kind === "due" ? it.to : it.date;
        const ac = ceRC(shownPg.y, shownPg.m, ad).c;
        overs.push(<g key="won" data-reveals="answer">
          <path d={cePath(ceRingPts(cell(ad), 28), 1)} fill="none" stroke={CE.ans} strokeWidth={5} />
          {it.choices && <rect x={gx + ac * CEB.cw + 2} y={CEB.y + CEB.bar + 2} width={CEB.cw - 4} height={CEB.head - 4} rx={8} fill="none" stroke={CE.ans} strokeWidth={4} />}
        </g>);
      }
    }
    if (P === 3 && won && it.answer === 29) overs.push(<g key="won29" data-reveals="answer"><path d={cePath(ceRingPts(cell(29), 28), 1)} fill="none" stroke={CE.ans} strokeWidth={5} /></g>);
    const arrowsOn = live && (P === 1 || P === 3 || free) && !(P === 1 && ask && it.kind === "weeks");
    const sq29 = P === 3 ? S.sq : undefined;
    return (
      <g>
        {cePageG(CEB, shownPg.y, shownPg.m, { view, tx, arrows: true, lit, under: unders, over: overs, sq29 })}
        {leaf && (() => {
          const L = gx, R = gx + 7 * CEB.cw, Y0 = gy, Y1 = gy + CEB.rows * CEB.ch, mid = (L + R) / 2;
          const xs = leaf.k === 2 ? [mid - 14, mid + 14] : (leaf.k === 1) === (leaf.dir > 0) ? [mid, R] : [L, mid];
          return <polygon points={`${xs[0]},${Y0} ${xs[1]},${Y0 + 16} ${xs[1]},${Y1 - 16} ${xs[0]},${Y1}`} fill={CE.paper} stroke={C.rule} strokeWidth={3} pointerEvents="none" />;
        })()}
        <Key id="prev" label={tx("Last month")} x={CEB.x + 6} y={CEB.y + 6} w={72} h={72} C={C} disabled={!arrowsOn} onClick={() => { touch(); flip(-1); }}>{arrowGlyph(-1, arrowsOn)}</Key>
        <Key id="next" label={tx("Next month")} x={CEB.x + CEB.w - 78} y={CEB.y + 6} w={72} h={72} C={C} disabled={!arrowsOn} onClick={() => { touch(); flip(1); }}>{arrowGlyph(1, arrowsOn)}</Key>
        {gridMode && live && (
          <g data-control={gridMode} role="button" tabIndex={0} style={{ touchAction: "none" } as any} aria-label={tx(gridMode === "week" ? "Calendar rows" : "Calendar dates")}
            {...gridPress.bind()} onKeyDown={gridPress.keys} onPointerDownCapture={capPt}>
            <rect x={gx} y={gy} width={7 * CEB.cw} height={CEB.rows * CEB.ch} fill="transparent" />
          </g>
        )}
        <Key id="grid" label={tx(view === "grid" ? "Wall view" : "Grid view")} x={8} y={440} w={200} h={72} C={C} disabled={!(live || won)}
          onClick={() => { touch(); setView((v: string) => (v === "grid" ? "wall" : "grid")); did("grid"); }}>{keyText(view === "grid" ? "Wall view" : "Grid view", live || won)}</Key>
      </g>
    );
  };

  /* phase 1: month cards and the week counter */
  const phase1 = () => {
    const cardsOn = live && !(ask && it.kind === "weeks");
    const big52 = S.wk52 > 0 || S.yearDone;
    const blocks = Math.min(6, S.weeks + (S.hot ? 1 : 0));
    const showSums = (tr && it.kind === "weeks") || (won && it.kind === "weeks");
    return (
      <g>
        {CE_MON3.map((s, m) => {
          const b = ceCard1(m), seen = S.seen.indexOf(m) >= 0, open = S.open.indexOf(m) >= 0;
          return (
            <g key={"card" + m}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={12} fill={seen ? mix(CE.hop, "#FFFFFF", 0.78) : "#FFFFFF"} stroke={CE.ink} strokeWidth={2.4} />
              <rect x={b.x + 2} y={b.y + 2} width={b.w - 4} height={10} rx={5} fill={seen ? CE.hop : C.panel} />
              {open
                ? <g>{label(b.x + b.w / 2, b.y + 38, tx(s), { a: "middle", fw: 700 })}{label(b.x + b.w / 2, b.y + 68, String(ceLen(2026, m)), { a: "middle", fw: 700, c: shade(CE.hop, 0.35) })}</g>
                : label(b.x + b.w / 2, b.y + 50, tx(s), { a: "middle", fs: T.label, fw: 700 })}
              {cardsOn && <Hit id={"card-" + s.toLowerCase()} x={b.x} y={b.y} w={b.w} h={b.h} label={tx(CE_MONTHS[m])} onPress={() => { touch(); tapCard(m); }} />}
            </g>
          );
        })}
        <rect x={490} y={180} width={580} height={246} rx={18} fill={mix(C.panel, "#FFFFFF", 0.55)} stroke={C.rule} strokeWidth={2} />
        {label(510, 214, tx(big52 ? "52 weeks" : "Week counter"), { fw: 700 })}
        {!big52 && Array.from({ length: blocks }, (_, k) => {
          const bx = 512 + (k < 3 ? 0 : 280), by = 232 + (k % 3) * 58, n7 = k < S.weeks ? 7 : S.hot ? S.hot.k : 0;
          return (
            <g key={"blk" + k}>
              {Array.from({ length: 7 }, (_, s) => <rect key={s} x={bx + s * 32} y={by} width={28} height={28} rx={5} fill={s < n7 ? mix(CE.hop, "#FFFFFF", 0.35) : "#FFFFFF"} stroke={CE.ink} strokeWidth={2} />)}
              {showSums && k < 3 && label(bx + 236, by + 25, String(7 * (k + 1)), { fw: 700 })}
              {showSums && k === 3 && won && <g data-reveals="answer">{label(bx + 236, by + 25, String(28), { fw: 700, c: shade(CE.ans, 0.4) })}</g>}
            </g>
          );
        })}
        {big52 && <g>
          {[0, 1, 2, 3].map((col) => Array.from({ length: 13 }, (_, r) => (
            <g key={"w" + col + "." + r}>
              {Array.from({ length: 7 }, (_, s) => <rect key={s} x={518 + col * 118 + s * 13} y={232 + r * 11} width={11} height={9} fill={col < S.wk52 ? mix(CE.hop, "#FFFFFF", 0.3) : "#FFFFFF"} stroke={CE.ink} strokeWidth={1} />)}
            </g>
          )))}
          {S.yearDone && <g>
            <rect x={968} y={330} width={30} height={30} rx={6} fill={CE.amber} stroke={CE.ink} strokeWidth={2.4} />
            {label(518, 410, "364 " + tx("days"), { fw: 700 })}
            {label(900, 410, tx("1 day left"), { fw: 700 })}
          </g>}
        </g>}
        {won && winChip(884, 190, 176, it.kind === "pages" ? "12 " + tx("pages") : it.kind === "year" ? "365 " + tx("days") : "28 " + tx("days"))}
        {it.kind === "pages" && !free && <Key id="flip" label={tx("Flip year")} x={660} y={440} w={240} h={72} C={C} disabled={!(ask)} onClick={() => { touch(); flipYear(); }}>{keyText("Flip year", ask)}</Key>}
        {it.kind === "year" && !demo && !free && <Key id="count" label={tx("Count weeks")} x={660} y={440} w={240} h={72} C={C} disabled={!(ask && !S.yearDone)} onClick={() => { touch(); countWeeks(); }}>{keyText("Count weeks", ask && !S.yearDone)}</Key>}
      </g>
    );
  };

  /* phase 2: two fists, the month cards and (keypad shut) the month's own page */
  const phase2 = () => {
    const asked: number[] = !demo && it.months ? it.months : [];
    const placed: any = { ...S.placed };
    if (won) asked.forEach((m) => { Object.keys(placed).forEach((k) => { if (placed[k] === m && +k !== m) delete placed[k]; }); placed[m] = m; });
    const dragging = drag.drag && drag.drag.moved ? drag.drag : null;
    const sideM = won && asked.length ? asked[asked.length - 1] : tr && tr.sm !== undefined ? tr.sm : S.side;
    const sideLit: any = {};
    if (won && sideM !== null) for (let d = 1; d <= ceLen(2026, sideM); d++) sideLit[d] = CE.ans;
    else if (tr && tr.sm !== undefined) {
      for (let d = 1; d <= 7 * (tr.wk || 0); d++) sideLit[d] = Math.floor((d - 1) / 7) % 2 ? CE.amber : CE.hop;
      if (tr.upto) for (let d = 29; d <= tr.upto; d++) sideLit[d] = CE.extra;
    }
    const chip = (m: number, j: number, ghost: boolean) => {
      const s = ceSpot(j), days = ceChipDays(m, j), w = s.w, x = s.x - w / 2, y = s.cy - 36;
      const live2 = !ghost && ask && E.current.fresh.placed[m] === undefined;
      return (
        <g key={(ghost ? "g" : "p") + m}>
          <rect x={x} y={y} width={w} height={72} rx={12} fill={ghost ? CE.paper : "#FFFFFF"} stroke={CE.ink} strokeWidth={2.4} strokeDasharray={ghost ? "8 6" : undefined} />
          {!ghost && <rect x={x + 2} y={y + 2} width={w - 4} height={9} rx={4} fill={s.k ? CE.hop : CE.amber} />}
          {ghost ? label(s.x, y + 46, tx(CE_MON3[m]), { a: "middle", fw: 700 })
            : <g>{label(s.x, y + 36, tx(CE_MON3[m]), { a: "middle", fw: 700 })}{label(s.x, y + 66, tx(days), { a: "middle", fw: 700, c: shade(s.k ? CE.hop : CE.amber, 0.45) })}</g>}
          {live2 && <g {...control("m" + (m + 1), tx(CE_MONTHS[m]))} {...drag.bind(m)} {...drag.keys(m)}><rect x={x} y={y} width={w} height={72} rx={12} fill="transparent" /></g>}
        </g>
      );
    };
    const filled = (j: number) => Object.keys(placed).some((k) => placed[k] === j);
    return (
      <g>
        {ceFistG(CE_FX[0], CE_FIST.y, CE_FIST.s, true, CE_FIST.show)}{ceFistG(CE_FX[1], CE_FIST.y, CE_FIST.s, false, CE_FIST.show)}
        {Array.from({ length: 12 }, (_, j) => { const s = ceSpot(j), full = filled(j), open = dragging && !full; return (
          <g key={"spot" + j}>
            <path d={`M ${s.x} 80 L ${s.px} ${s.py - 9}`} stroke={CE.ink} strokeWidth={2} strokeDasharray={full ? undefined : "5 5"} />
            {!full && <rect x={s.x - s.w / 2} y={6} width={s.w} height={72} rx={12} fill={CE.paper} stroke={mix(CE.ink, "#FFFFFF", 0.35)} strokeWidth={2} strokeDasharray="6 6" />}
            {open && <rect x={s.x - s.w / 2 - 5} y={1} width={s.w + 10} height={82} rx={15} fill="none" stroke={CE.hop} strokeWidth={3} strokeDasharray="6 5" />}
            <circle cx={s.px} cy={s.py} r={8} fill={s.k ? CE.hop : CE.amber} stroke="#FFFFFF" strokeWidth={2.5} />
          </g>
        ); })}
        {tr && tr.walk !== undefined && Array.from({ length: tr.walk - tr.w0 + 1 }, (_, k) => tr.w0 + k).map((j) => (
          <g key={"walk" + j} pointerEvents="none">
            {!filled(j) && chip(j, j, true)}
            {j === tr.walk && <circle cx={ceSpot(j).px} cy={ceSpot(j).py} r={16} fill="none" stroke="#FFFFFF" strokeWidth={4} />}
          </g>
        ))}
        {Object.keys(placed).map((k) => chip(+k, placed[k], false))}
        {won && asked.length > 0 && <g data-reveals="answer">{asked.map((m) => { const s = ceSpot(m); return <rect key={"wr" + m} x={s.x - s.w / 2 - 5} y={1} width={s.w + 10} height={82} rx={15} fill="none" stroke={CE.ans} strokeWidth={4} />; })}</g>}
        {CE_MON3.map((s, m) => {
          const b = ceCard2(m), gone = placed[m] !== undefined || S.carrying === m || (dragging && dragging.payload === m);
          if (gone) return <rect key={"slot" + m} x={b.x} y={b.y} width={b.w} height={b.h} rx={12} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />;
          const on = live && !won;
          return (
            <g key={"c2" + m} transform={`translate(${b.x + 40} ${b.y + 36})`}>
              {cardNode(m)}
              {on && <g {...control("m" + (m + 1), tx(CE_MONTHS[m]))} {...drag.bind(m)} {...drag.keys(m)}><rect x={-40} y={-36} width={80} height={72} rx={12} fill="transparent" /></g>}
            </g>
          );
        })}
        {won && asked.length > 0 && winChip(430, 232, 200, it.answer === 1 ? "1 " + tx("more day") : String(it.answer) + " " + tx("days"))}
        {box && box.w >= 1360 && sideM !== null && sideM !== undefined && (
          <g pointerEvents="none" {...(won ? { "data-reveals": "answer" } : {})}>{cePageG(CEM, 2026, sideM, { view, tx, lit: sideLit })}</g>
        )}
        {dragging && <g transform={`translate(${dragging.x} ${dragging.y})`} pointerEvents="none" filter="url(#fLift)">{cardNode(dragging.payload)}</g>}
      </g>
    );
  };

  /* phase 3: the four-year strip and the year ruler */
  const phase3 = () => {
    const mkShown = S.mkv !== null && S.mkv !== undefined ? S.mkv : S.mk;
    const on = live && !won;
    return (
      <g>
        {[2026, 2027, 2028, 2029].map((yr, j) => {
          const b = CE_TILE(j), shown = S.tiles.indexOf(yr) >= 0, leap = ceLeap(yr), sel = S.sel === yr;
          return (
            <g key={"tile" + yr}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={14} fill="#FFFFFF" stroke={sel ? CE.hop : CE.ink} strokeWidth={sel ? 5 : 2.4} />
              <rect x={b.x} y={b.y} width={b.w} height={36} rx={14} fill={CE.ink} />
              <rect x={b.x} y={b.y + 22} width={b.w} height={14} fill={CE.ink} />
              {label(b.x + b.w / 2, b.y + 28, tx("Feb"), { a: "middle", fw: 700, c: "#FFFFFF" })}
              {label(b.x + b.w / 2, b.y + 74, String(yr), { a: "middle", fs: T.prompt, fw: 700 })}
              {shown && label(b.x + b.w / 2, b.y + 110, (leap ? "366 " : "365 ") + tx("days"), { a: "middle", fw: 700 })}
              {shown && leap && <g>
                <rect x={b.x - 8} y={b.y + b.h + 8} width={b.w + 16} height={40} rx={12} fill={mix(CE.ans, "#FFFFFF", 0.8)} stroke={shade(CE.ans, 0.2)} strokeWidth={2.4} />
                {label(b.x + b.w / 2, b.y + b.h + 38, tx("Leap year"), { a: "middle", fw: 700, c: shade(CE.ans, 0.45) })}
              </g>}
              {on && <Hit id={"y" + yr} x={b.x} y={b.y} w={b.w} h={b.h} label={String(yr)} onPress={() => { touch(); tapTile(yr); }} />}
            </g>
          );
        })}
        <line x1={CE_RL.x0} y1={CE_RL.y} x2={CE_RL.x1} y2={CE_RL.y} stroke={CE.ink} strokeWidth={5} strokeLinecap="round" />
        {Array.from({ length: CE_RL.y1 - CE_RL.y0 + 1 }, (_, k) => <line key={"t" + k} x1={ceRX(CE_RL.y0 + k)} y1={CE_RL.y - 9} x2={ceRX(CE_RL.y0 + k)} y2={CE_RL.y + 9} stroke={CE.ink} strokeWidth={2.5} />)}
        <g data-scale="ruler">
          {S.lit.map((yr: number) => <g key={"lit" + yr}>
            <circle cx={ceRX(yr)} cy={CE_RL.y} r={10} fill={CE.ans} stroke={CE.ink} strokeWidth={2} />
            {label(ceRX(yr), CE_RL.y + ((yr / 4) % 2 ? 74 : 44), String(yr), { a: "middle", fw: 700, c: shade(CE.ans, 0.45) })}
          </g>)}
        </g>
        {tr && tr.dim && tr.dim.map((yr: number) => <g key={"dim" + yr} pointerEvents="none">
          <circle cx={ceRX(yr)} cy={CE_RL.y} r={13} fill="#FFFFFF" stroke="#5A5A5A" strokeWidth={3} strokeDasharray="5 4" />
          {label(ceRX(yr), CE_RL.y - 16, String(yr), { a: "middle", fw: 600, c: "#555555" })}
        </g>)}
        <g>
          <path d={`M ${ceRX(mkShown) - 13} ${CE_RL.y - 34} L ${ceRX(mkShown) + 13} ${CE_RL.y - 34} L ${ceRX(mkShown)} ${CE_RL.y - 12} Z`} fill={CE.hop} stroke={CE.ink} strokeWidth={2} />
          {!S.moving && <g>
            <rect x={ceRX(mkShown) - 52} y={CE_RL.y - 86} width={104} height={46} rx={10} fill="#FFFFFF" stroke={CE.hop} strokeWidth={3} />
            {label(ceRX(mkShown), CE_RL.y - 52, String(mkShown), { a: "middle", fs: T.label, fw: 700 })}
          </g>}
        </g>
        {won && (it.answer === 2045 ? winChip(670, 380, 220, "2045") : it.answer === "2048" ? winChip(670, 380, 220, "2048") : winChip(670, 380, 220, "29 " + tx("days")))}
        <Key id="back4" label={tx("Back 4")} x={556} y={440} w={220} h={72} C={C} disabled={!on} onClick={() => { touch(); hop4(-1); }}>{keyText("Back 4", on)}</Key>
        <Key id="on4" label={tx("On 4")} x={806} y={440} w={220} h={72} C={C} disabled={!on} onClick={() => { touch(); hop4(1); }}>{keyText("On 4", on)}</Key>
      </g>
    );
  };

  /* phase 4 and free play: the week counter, the date to circle and Hop 7 */
  const phase4 = () => {
    const targets: number[] = free ? [] : demo ? [3] : it.date ? [it.from, it.date] : [it.from];
    const hopOn = live && !won && canHop;
    return (
      <g>
        <rect x={490} y={0} width={580} height={330} rx={18} fill={mix(C.panel, "#FFFFFF", 0.55)} stroke={C.rule} strokeWidth={2} />
        {label(510, 36, tx("Week counter"), { fw: 700 })}
        {S.hops.slice(0, 5).map((d: number, k: number) => (
          <g key={"wb" + k}>
            {Array.from({ length: 7 }, (_, s) => <rect key={s} x={514 + s * 38} y={56 + k * 54} width={34} height={34} rx={6} fill={mix(CE.hop, "#FFFFFF", 0.35)} stroke={CE.ink} strokeWidth={2} />)}
            {label(800, 56 + k * 54 + 27, String(7 * (k + 1)) + " " + tx("days"), { fw: 700 })}
          </g>
        ))}
        {won && !free && winChip(884, 10, 176, it.kind === "weeks" ? "4 " + tx("weeks") : tx(CE_DAYS[CE_DAYID.indexOf(String(it.answer))]))}
        {live && !won && targets.map((d) => { const c = ceCellC(CEB, pg.y, pg.m, d); return <Hit key={"date" + d} id="date" x={c.x - 36} y={c.y - 36} w={72} h={72} label={tx("Circle the date") + " " + d} onPress={() => { touch(); circle(d); }} />; })}
        <Key id="hop" label={tx("Hop 7")} x={660} y={440} w={240} h={72} C={C} disabled={!hopOn} onClick={() => { touch(); hop(); }}>{keyText("Hop 7", hopOn)}</Key>
      </g>
    );
  };

  /* the one invite: the control the step waits for, or the question's act while it is undone */
  if (stage === "demo" && stepOn && !busy.current) {
    if (stepOn === "week") { const r = firstFreeRow(); if (r !== null) inv = { x: gx + 3.5 * CEB.cw, y: gy + r * CEB.ch + CEB.ch / 2, w: 7 * CEB.cw, h: CEB.ch, rx: 6 }; }
    else if (stepOn.indexOf("card-") === 0) { const b = ceCard1(CE_MON3.findIndex((s) => "card-" + s.toLowerCase() === stepOn)); inv = { x: b.x + b.w / 2, y: b.y + b.h / 2, w: b.w, h: b.h, rx: 12 }; }
    else if (stepOn === "next") inv = { x: CEB.x + CEB.w - 42, y: CEB.y + 42, w: 72, h: 72 };
    else if (/^m\d+$/.test(stepOn)) { const b = ceCard2(+stepOn.slice(1) - 1); inv = { x: b.x + 40, y: b.y + 36, w: 80, h: 72, rx: 12 }; }
    else if (/^y\d+$/.test(stepOn)) { const b = CE_TILE(+stepOn.slice(1) - 2026); inv = { x: b.x + b.w / 2, y: b.y + b.h / 2, w: b.w, h: b.h, rx: 14 }; }
    else if (stepOn === "on4") inv = { x: 916, y: 476, w: 220, h: 72 };
    else if (stepOn === "date") { const c = ceCellC(CEB, pg.y, pg.m, 3); inv = { x: c.x, y: c.y, w: 72, h: 72, rx: 14 }; }
    else if (stepOn === "hop") inv = { x: 780, y: 476, w: 240, h: 72 };
  } else if (ask && !gateNow && !busy.current && !traceBusy.current) {
    if (n === 1 && it.kind === "weeks") { const r = firstFreeRow(); if (r !== null) inv = { x: gx + 3.5 * CEB.cw, y: gy + r * CEB.ch + CEB.ch / 2, w: 7 * CEB.cw, h: CEB.ch, rx: 6 }; }
    else if (n === 1 && it.kind === "pages") inv = { x: 780, y: 476, w: 240, h: 72 };
    else if (n === 1) inv = { x: 780, y: 476, w: 240, h: 72 };
    else if (n === 2) { const m = (it.months || []).find((k: number) => S.placed[k] === undefined); if (m !== undefined) { const b = ceCard2(m); inv = { x: b.x + 40, y: b.y + 36, w: 80, h: 72, rx: 12 }; } }
    else if (n === 3) inv = it.dir < 0 ? { x: 666, y: 476, w: 220, h: 72 } : { x: 916, y: 476, w: 220, h: 72 };
    else if (n === 4) {
      const d = it.date || it.from;
      if (S.circ === null || (it.date && S.circ !== it.date && S.circ !== it.from)) { const c = ceCellC(CEB, pg.y, pg.m, d); inv = { x: c.x, y: c.y, w: 72, h: 72, rx: 14 }; }
      else if (canHop) inv = { x: 780, y: 476, w: 240, h: 72 };
    }
  }

  return (
    <g>
      {P !== 2 && bigCal()}
      {P === 1 && phase1()}
      {P === 2 && phase2()}
      {P === 3 && phase3()}
      {P === 4 && phase4()}
      {inv && <Invite x={inv.x} y={inv.y} w={inv.w} h={inv.h} rx={inv.rx} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L) return null;
  const item: any = it || L.it || (PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[L.item]) || {};
  const v = L.value;
  const k = CE_DAYID.indexOf(String(v));
  /* a word is drawn only in a language that has it (English, or a TR line); otherwise the picture says it */
  const has = (s: string) => lang === "en" || tx(s) !== s;
  const day = item.choices && k >= 0;
  const txt = day ? (has(CE_DAYS[k]) ? tx(CE_DAYS[k]) : "") : String(v) + (item.unit && has(item.unit) ? " " + tx(item.unit) : "");
  const H = h || 80, ih = Math.min(56, H - 16);
  return (
    <g>
      <rect x={0} y={0} width={w} height={H} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={12} y={(H - ih) / 2} width={ih} height={ih} rx={6} fill="#FFFFFF" stroke={CE.ink} strokeWidth={2} />
      <rect x={12} y={(H - ih) / 2} width={ih} height={ih * 0.3} rx={4} fill={CE.ink} />
      {[0, 1, 2].map((c) => <rect key={c} x={18 + c * ((ih - 12) / 3)} y={(H - ih) / 2 + ih * 0.42} width={(ih - 12) / 3 - 3} height={ih * 0.22} fill={c === 1 ? mix(CE.hop, "#FFFFFF", 0.4) : "#FFFFFF"} stroke={CE.ink} strokeWidth={1} />)}
      {txt ? <text x={w - 14} y={H / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{txt}</text>
        : day && Array.from({ length: 7 }, (_, c) => <rect key={"wk" + c} x={w - 14 - (7 - c) * 20} y={H / 2 - 9} width={17} height={18} rx={3} fill={c === k ? CE.ans : "#FFFFFF"} stroke={CE.ink} strokeWidth={1.5} />)}
    </g>
  );
}

function CalendarExplorer(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right */
      keyOnly: true,
      /* the standard keypad, not the wide one: the seven-column page beside the fists, the strip and the week counter
         needs the classic open width (1086); with bigPad it would run under the panel (PATTERNS 9g) */
      bigPad: false,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (LAYOUT.md §1d) */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default CalendarExplorer;
