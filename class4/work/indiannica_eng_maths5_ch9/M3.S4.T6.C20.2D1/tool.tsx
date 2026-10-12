/* ═══ M3.S4.T6.C20.2D1 · measure_columns · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   Unit Column Adder (Class 5, ch 9 Measurements, pp. 140-142).
   1 · two measures stacked in unit columns; the child writes each column's total in its answer cell
       (a tap on the cell lends it the pad), Bundle wraps one larger unit out of an over-full smaller
       column (100 cm, 1,000 g, 1,000 m) into a tile with its unit fact, and the tile is dragged across.
   2 · the same measures as decimals in the larger unit: a tap on a measure card writes its row with the
       point locked in one line; the child adds and types the decimal (the point key).
   3 · take away: Break turns one larger unit into the smaller unit, the tile is dragged across and the
       new top number is written above, struck through in ink; then each column is taken away.
   4 · a shape with sides in m, cm and mm: each tap on a side card moves its point one place towards
       metres; the walker goes round only past sides in metres; the child adds the sides. */

const TOOL_ID = "measure_columns";
const MEDIA_ID = "M3.S4.T6.C20.2D1";
const TOOL_NAME = "Unit Column Adder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Two measures, stacked in their unit columns."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You added and took away, one unit column at a time.";
/* said when the child opens Free play from the summary page: everything it names is in the free branch
   (the units key, the add / take away key, Bundle or Break, the tiles and the two answer cells) */
const FREE_LINE = "Free play. Pick the units, add or take away, and carry or borrow across.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = { hi: {}, gu: {} };

/* ── the chapter's colours (brief, Stage): each part is told by its label before its colour ── */
const MC_GIVEN = CONTENT.hundred;   /* deep blue: the measure the question gives */
const MC_ANS = CONTENT.one;         /* green: the answer, a measure the working reaches */
const MC_MOVE = CONTENT.pointer;    /* vermilion: a place moved across the unit chart */
const MC_NOW = CONTENT.ten;         /* amber: the column or side being worked now */
const MC_TAKE = CONTENT.bead;       /* rose: the part taken away */
const MC_UNIT = "#7B5EA7";          /* violet: a unit name, a unit fact */
const MC_ZERO = "#767676";          /* grey: a zero holding a place */
const mcInk = (c: string) => shade(c, 0.25);

const MC_WORD: any = { m: "metres", cm: "centimetres", mm: "millimetres", km: "kilometres", kg: "kilograms", g: "grams", L: "litres", mL: "millilitres" };
const MC_STEP = ["mm", "cm", "dm", "m"];                 /* a side card's units, one place apart */
const MC_AT: any = { mm: 0, cm: 1, dm: 2, m: 3 };
/* free play: the unit pairs a child can pick */
const MC_PAIRS = [
  { big: "m", small: "cm", U: 100, label: "m and cm" },
  { big: "kg", small: "g", U: 1000, label: "kg and g" },
  { big: "L", small: "mL", U: 1000, label: "L and mL" },
  { big: "km", small: "m", U: 1000, label: "km and m" },
  { big: "cm", small: "mm", U: 10, label: "cm and mm" },
];
/* phase 4: each shape's corners (the walker's path, in order) and where each side's card sits */
const MC_SHAPES: any = {
  bed: { pts: [[200, 120], [564, 120], [564, 354], [200, 354]], cards: [[382, 70], [666, 237], [382, 404], [100, 237]] },
  tri: { pts: [[190, 90], [190, 360], [550, 360]], cards: [[92, 225], [370, 412], [427, 149]] },
  mat: { pts: [[200, 170], [560, 170], [560, 305], [200, 305]], cards: [[380, 124], [660, 237], [380, 351], [100, 237]] },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase, the third tests whether the phase landed.
           carry / borrow: big, small (unit symbols), U (how many small make one big), top, bot ([big, small])
           decimal: unit, small, U, rows ([[whole, small], …] tapped into decimal rows) or dec (given decimals)
           boundary: shape, sides ([value, unit] in the walker's order), unit (the unit asked for)
           near = the item's misconception, as the slot would read it */
const PHASES = [
  {
    n: 1,
    concept: "Adding in unit columns",
    conceptId: "M3.S4.T6.C20", objectiveIds: ["O9"],
    says: ["Smaller unit first. Is there a whole metre in there?"],
    /* tries, as the plan writes it: add only the centimetres column; bundle a metre out of it; the same
       task on lengths whose centimetres do not reach a metre. Rungs 2 and 3 are said for every item of
       the phase (m, kg, km), so they name no one unit; the plan's third rung is a stage direction */
    ladder: ["Bundle one larger unit out of the smaller column, then drag it across.", "Now add the larger column, and count the carry in it."],
    closing: "Add the smaller unit first, and carry one larger unit across when its column fills up.",
    learned: "You learned: add the smaller unit first, then carry one larger unit.",
    traceback: "The smaller column's total is written lit amber; when it holds a whole larger unit, that unit is bundled into a tile carrying its unit fact and hops into the larger column; the larger column is added with it, and the answer row ends in green with both units.",
    items: [
      /* learn UC1: answer in the plan = 7 m 23 cm. */
      { qid: "M3.S4.T6.C20:UC1", kind: "carry", big: "m", small: "cm", U: 100, top: [4, 65], bot: [2, 58],
        parts: [{ label: "m" }, { label: "cm" }], answer: [7, 23], near: "6|123", winMs: 2200,
        say: "Two pieces of wire are 4 m 65 cm and 2 m 58 cm long. How long are they together?",
        ask: "How long together?", miss: "Add only the centimetres column. Is it 100 cm or more?" },
      /* practice 1: answer in the plan = 3 kg 800 g */
      { qid: "M3.S4.T6.C20:1", kind: "carry", big: "kg", small: "g", U: 1000, top: [2, 300], bot: [1, 500],
        parts: [{ label: "kg" }, { label: "g" }], answer: [3, 800], near: "4|800", winMs: 2200,
        say: "Add 2 kg 300 g and 1 kg 500 g.", ask: "Total weight?",
        miss: "Add the grams first. Do they make a whole kilogram?" },
      /* practice 4: answer in the plan = 6 km 395 m */
      { qid: "M3.S4.T6.C20:4", kind: "carry", big: "km", small: "m", U: 1000, top: [3, 640], bot: [2, 755],
        parts: [{ label: "km" }, { label: "m" }], answer: [6, 395], near: "5|1395", winMs: 2200,
        say: "Add 3 km 640 m and 2 km 755 m.", ask: "Total distance?",
        miss: "Add the metres first. How many metres make one kilometre?" },
    ],
  },
  {
    n: 2,
    concept: "Adding as decimals",
    conceptId: "M3.S4.T6.C21", objectiveIds: ["O9"],
    says: ["Points in a line. Which unit is the answer in?"],
    /* tries, as the plan writes it: write only the first capacity as a decimal in litres; write the
       second under it; the same task with no empty place after the point. Said for every item of the
       phase (L, m, kg), so they name no one unit */
    ladder: ["Whole larger units go before the point. The smaller unit fills the places after it.", "Keep every point in one line, and every digit under its own place."],
    closing: "Write each measure as a decimal in the larger unit. Line up the points, and the answer is in that unit.",
    learned: "You learned: line up the points in the larger unit, then add.",
    traceback: "Each measure is written as a decimal in the larger unit with the points locked in one line; the places are added from the right with their carries, and the sum ends in green with its unit.",
    items: [
      /* learn UC2: answer in the plan = 7.125 L. */
      { qid: "M3.S4.T6.C21:UC2", kind: "decimal", unit: "L", small: "mL", U: 1000, rows: [[5, 340], [1, 785]],
        answer: "7.125", near: "6.1125", winMs: 2000,
        say: "A jug holds 5 L 340 mL and a bottle holds 1 L 785 mL. Add them as decimals in litres.",
        ask: "Sum in litres?", miss: "Tap each card to write it in litres. Then add place by place." },
      /* practice 2: answer in the plan = 3.45 m */
      { qid: "M3.S4.T6.C21:2", kind: "decimal", unit: "m", small: "cm", U: 100, rows: [[3, 45]], single: true,
        answer: "3.45", near: "3.045", winMs: 2000,
        say: "Write 3 m 45 cm as a decimal in metres, ready to add.", ask: "In metres?",
        miss: "100 cm make 1 m. How many places do centimetres fill after the point?" },
      /* practice 5: answer in the plan = 4.075 kg */
      { qid: "M3.S4.T6.C21:5", kind: "decimal", unit: "kg", small: "g", U: 1000, dec: ["2.450", "1.625"],
        answer: "4.075", near: "4.75", winMs: 2000,
        say: "Add 2.450 kg and 1.625 kg.", ask: "Sum in kilograms?",
        miss: "Add from the right, carrying as you go. Keep a zero where a place is empty." },
    ],
  },
  {
    n: 3,
    concept: "Taking away with a borrow",
    conceptId: "M3.S4.T6.C22", objectiveIds: ["O10"],
    says: ["Not enough grams. Break a kilogram."],
    /* tries, as the plan writes it: take away the grams where there are enough; break one kilogram and
       count the grams; the same task on metres and centimetres. Said for every item (kg, m), so they
       name no one unit. Practice 3 ("1 kg broken into grams is how many grams?") is left unused: its
       answer is the unit fact the Break tile carries, so the tile would print it, and every item here
       breaks one larger unit and says how many smaller units it makes */
    ladder: ["Break one larger unit into the smaller unit, and drag it across.", "Take away the smaller column first, then the larger one."],
    closing: "When there is too little of the smaller unit, change one larger unit into the smaller unit first.",
    learned: "You learned: too few of the smaller unit? Break one larger unit first.",
    traceback: "The two smaller-unit numbers are lit amber, too few on top; one larger unit breaks into a tile of the smaller unit, the top numbers are struck through in ink with the new ones written above, each column is taken away, and the answer row ends in green.",
    items: [
      /* learn UC3: answer in the plan = 2 kg 660 g. */
      { qid: "M3.S4.T6.C22:UC3", kind: "borrow", big: "kg", small: "g", U: 1000, top: [6, 240], bot: [3, 580],
        parts: [{ label: "kg" }, { label: "g" }], answer: [2, 660], near: "3|340", winMs: 2200,
        say: "A drum held 6 kg 240 g of paint, and 3 kg 580 g was used. How much is left?",
        ask: "Paint left?", miss: "Can 580 g come out of only 240 g?" },
      /* practice 6: answer in the plan = 2 m 55 cm */
      { qid: "M3.S4.T6.C22:6", kind: "borrow", big: "m", small: "cm", U: 100, top: [4, 30], bot: [1, 75],
        parts: [{ label: "m" }, { label: "cm" }], answer: [2, 55], near: "3|45", winMs: 2200,
        say: "Take 1 m 75 cm from 4 m 30 cm.", ask: "What is left?",
        miss: "Is 30 cm enough to take 75 cm from? Break a metre into centimetres." },
      /* practice 8: answer in the plan = 8 m 35 cm */
      { qid: "M3.S4.T6.C22:8", kind: "borrow", big: "m", small: "cm", U: 100, top: [15, 20], bot: [6, 85],
        parts: [{ label: "m" }, { label: "cm" }], answer: [8, 35], near: "9|65", winMs: 2200,
        say: "A roll had 15 m 20 cm of tape, and 6 m 85 cm was used. How much tape is still on the roll?",
        ask: "Tape left?", miss: "After the break, the metres column has one metre less. Count it again." },
    ],
  },
  {
    n: 4,
    concept: "A boundary in mixed units",
    conceptId: "M3.S4.T6.C23", objectiveIds: ["O10"],
    says: ["Every side in metres first. Then walk round."],
    /* tries, as the plan writes it: rewrite one side card in metres; rewrite the rest; the same task on
       a triangle with two units (a stage direction, so rung 3 is a spoken line instead) */
    ladder: ["Tap each side card until it reads metres.", "Then add the sides in order, as the walker goes round."],
    closing: "Write every side in the unit asked for, then add all the sides.",
    learned: "You learned: write every side in one unit, then add all the sides.",
    traceback: "The walker goes round; at each side not in metres it waits while that side's point moves to metres, the sides in metres are stacked with their points in one line, and the boundary ends in green in metres.",
    items: [
      /* learn UC4: answer in the plan = 23 m. */
      { qid: "M3.S4.T6.C23:UC4", kind: "boundary", shape: "bed", unit: "m",
        sides: [["7", "m"], ["450", "cm"], ["7", "m"], ["4500", "mm"]], answer: 23, near: "4964", winMs: 2800,
        say: "A flower bed has sides of 7 m, 450 cm, 7 m and 4,500 mm. What is its boundary in metres?",
        ask: "Boundary in metres?", miss: "450 cm and 4,500 mm are not in metres yet. Rewrite them first." },
      /* practice 7: answer in the plan = 2.4 m, because 0.6 + 0.8 + 1 = 2.4 */
      { qid: "M3.S4.T6.C23:7", kind: "boundary", shape: "tri", unit: "m",
        sides: [["60", "cm"], ["0.8", "m"], ["1000", "mm"]], answer: "2.4", near: "1060.8", winMs: 2800,
        say: "A triangle of card has sides of 60 cm, 0.8 m and 1,000 mm. Find its boundary, also in metres.",
        ask: "Boundary in metres?", miss: "60 cm is less than a metre. Where does its point go?" },
      /* authored: the plan gives this phase only two questions (UC4 and practice 7), and no question of
         another phase is a boundary, so the third is the tool's own: four sides in m, cm and mm again */
      { qid: null, kind: "boundary", shape: "mat", unit: "m",
        sides: [["2", "m"], ["75", "cm"], ["2", "m"], ["750", "mm"]], answer: "5.5", near: "829", winMs: 2800,
        say: "A mat has sides of 2 m, 75 cm, 2 m and 750 mm. How many metres is its edge all round?",
        ask: "Edge in metres?", miss: "Move the point one place for each step up to metres." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  columns: { big: 210, small: 510, width: 280, carryRow: 50, row1: 224, row2: 300, rule: 322, answerRow: 334, workedRow: 428 },
  decimals: { point: 640, place: 56 },
  boundary: { shapes: MC_SHAPES, strip: { point: 930, place: 34 } },
  unitFacts: { "1 m": "100 cm", "1 kg": "1,000 g", "1 km": "1,000 m", "1 L": "1,000 mL", "1 cm": "10 mm" },
  freePlay: MC_PAIRS.map((p) => p.label),
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a two-unit answer box by box (as numbers); a decimal exactly as it is written ("4.075", not
   "4.0750" or ".075"); a whole number of metres as digits only ("23", not "23.0") */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  const s = String(v ?? "").trim();
  if (typeof item.answer === "number") return /^\d+$/.test(s) && Number(s) === item.answer;
  return s === String(item.answer);
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   both measures in the smaller unit, added or taken away, then split back; boundaries in millimetres */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "carry" || it.kind === "borrow") {
    const t = it.top[0] * it.U + it.top[1], b = it.bot[0] * it.U + it.bot[1];
    const r = it.kind === "carry" ? t + b : t - b;
    return r >= 0 && Math.floor(r / it.U) === it.answer[0] && r % it.U === it.answer[1];
  }
  if (it.kind === "decimal") {
    const places = String(it.U).length - 1;
    const fromDec = (s: string) => { const [a, b = ""] = s.split("."); return Number(a) * it.U + Number((b + "000").slice(0, places)); };
    const tot = (it.rows ? it.rows.map((r: number[]) => r[0] * it.U + r[1]) : it.dec.map(fromDec)).reduce((x: number, y: number) => x + y, 0);
    return String(it.answer) === Math.floor(tot / it.U) + "." + String(tot % it.U).padStart(places, "0");
  }
  if (it.kind === "boundary") {
    const per: any = { m: 1000, cm: 10, mm: 1 };
    const mm = it.sides.reduce((a: number, sd: string[]) => a + Math.round(Number(sd[0]) * per[sd[1]]), 0);
    const w = Math.floor(mm / 1000), f = String(mm % 1000).padStart(3, "0").replace(/0+$/, "");
    return String(it.answer) === (f ? w + "." + f : String(w));
  }
  return false;
}));
/* the item's misconception (no carry, mL straight after the point, the smaller number from the larger,
   the sides added as they stand); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer), speakable(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): a decimal keeps its point (toolApi.answer alone strips it, PATTERNS §4);
   two boxes and whole numbers go the runtime's own way */
const answer = (item: any, v: any) => (typeof item.answer === "string" && HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the picture's own helpers (names are the tool's: mc…) ─────────────────────────────── */

/* a typed or given whole number as the chapter writes it: commas from 1,000 */
const mcNum = (v: any) => { const s = String(v ?? ""); return /^\d{4,}$/.test(s) ? indian(Number(s)) : s; };
/* a decimal set out place by place, the point on the line px, one place every d; a zero that holds a
   place open (after the point and before its first other digit, or a lone 0 before the point) is grey */
function mcPlaces(str: any, px: number, d: number) {
  const s = String(str ?? "");
  const dot = s.indexOf(".");
  const ip = dot < 0 ? s : s.slice(0, dot), fp = dot < 0 ? "" : s.slice(dot + 1);
  const firstNZ = fp.search(/[1-9]/);
  const out: any[] = [];
  ip.split("").forEach((ch, k) => out.push({ ch, x: px - d * (ip.length - k), grey: ip === "0" && fp !== "" }));
  fp.split("").forEach((ch, k) => out.push({ ch, x: px + d * (k + 1), grey: ch === "0" && firstNZ > k }));
  return { out, dot: dot >= 0 };
}
/* the carries of a column addition of decimals (each place that sends one to its left), as x positions */
function mcCarries(strs: string[], px: number, d: number) {
  const F = Math.max(...strs.map((s) => (s.split(".")[1] || "").length));
  const digit = (s: string, place: number) => {   /* place 1 = tenths, 0 = ones, -1 = tens … */
    const [ip, fp = ""] = s.split(".");
    if (place >= 1) return Number(fp[place - 1] || 0);
    return Number(ip[ip.length - 1 + place] || 0);
  };
  const xs: number[] = [];
  let carry = 0;
  for (let place = F; place >= -2; place--) {
    const sum = strs.reduce((a, s) => a + digit(s, place), 0) + carry;
    carry = sum >= 10 ? 1 : 0;
    if (carry) xs.push(place - 1 >= 1 ? px + d * (place - 1) : px - d * (1 - (place - 1)));
  }
  return xs;
}
/* a side as millimetres, and as a card reads it in a given unit (0 mm · 1 cm · 2 dm · 3 m) */
const mcSideMM = (sd: string[]) => Math.round(Number(sd[0]) * ({ m: 1000, cm: 10, mm: 1 } as any)[sd[1]]);
function mcShow(mm: number, at: number) {
  const div = [1, 10, 100, 1000][at];
  const w = Math.floor(mm / div), f = mm % div;
  const fs = f ? String(f).padStart(String(div).length - 1, "0").replace(/0+$/, "") : "";
  return (w >= 1000 ? indian(w) : String(w)) + (fs ? "." + fs : "");
}
const mcLerp = (a: number[], b: number[], t: number) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
/* free play: two measures in the picked unit pair, from a seed (no Math.random: a replay is the same) */
function mcFreeModel(f: any) {
  const P = MC_PAIRS[f.pair], U = P.U;
  const rnd = (k: number) => { let x = (Math.imul(f.seed + 7, 2654435761) + Math.imul(k + 3, 40503)) >>> 0; x ^= x >>> 13; x = Math.imul(x, 1274126177) >>> 0; return (x % 10007) / 10007; };
  const pick = (k: number, lo: number, hi: number) => lo + Math.floor(rnd(k) * (hi - lo + 1));
  const sm = (k: number) => (U === 10 ? pick(k, 0, 9) : U === 100 ? pick(k, 1, 99) : pick(k, 1, 199) * 5);
  if (f.op === "+") { const a = pick(1, 1, 6), c = pick(2, 1, 8 - a); return { kind: "carry", big: P.big, small: P.small, U, top: [a, sm(3)], bot: [c, sm(4)] }; }
  const a = pick(1, 3, 9), c = pick(2, 1, a - 1);
  return { kind: "borrow", big: P.big, small: P.small, U, top: [a, sm(3)], bot: [c, sm(4)] };
}
function mcFresh(item: any) {
  return { cell: null, tiles: 0, docked: 0, borrow: null, rows: [false, false], said: false, walk: null, cells: ["", ""],
    ui: item && item.kind === "boundary" ? item.sides.map((sd: string[]) => MC_AT[sd[1]]) : [],
    free: item ? null : { pair: 0, op: "+", seed: 1 } };
}
/* the working area's fixed places (stage units, origin at its top-left) */
const MC_C = { big: 210, small: 510 };
const MC_KEY = { x: 730, w: 300, h: 92 };
const MC_DP = 640, MC_DD = 56;          /* phase 2: the point line, one place */
const MC_SP = 930, MC_SD = 34;          /* phase 4's strip: the point line, one place */

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();   /* the traceback */
  const wl = useTimeline();   /* the walker */
  const free = stage === "free";
  const ik = free ? "free" : n + ":" + index;
  const it: any = free ? null : item;
  const [raw, setRaw] = useState<any>({ ik: "" });
  const s: any = raw.ik === ik ? raw : { ...mcFresh(it), ik };
  const put = (patch: any) => setRaw((r: any) => {
    const base = r.ik === ik ? r : { ...mcFresh(it), ik };
    return { ...base, ...(typeof patch === "function" ? patch(base) : patch) };
  });
  const [demoRaw, setDemo] = useState<any>(null);
  const demo: any = demoRaw && demoRaw.ik === ik ? demoRaw : null;
  const clearDemo = () => { if (demoRaw) setDemo(null); };

  /* refs the pad's key handler and the timelines read (they outlive a render) */
  const sR = useRef<any>(s); sR.current = s;
  const typedR = useRef<any>(typed); typedR.current = typed;
  const wrongR = useRef<any>(wrong); wrongR.current = wrong;
  const stageR = useRef<any>(stage); stageR.current = stage;
  const cellR = useRef<any>(null);
  const staleR = useRef<boolean[]>([false, false]);
  const freeCells = useRef<string[]>(["", ""]);
  const keyFn = useRef<any>(null);

  const busy = tl.busy;
  const asking = stage === "ask" && !busy;
  const handsOn = (stage === "ask" || stage === "teach") && !busy;   /* pieces are playable before they are answerable */
  const winNow = stage === "win" || stage === "idle";

  /* the column model: the item's, or free play's own */
  const cm: any = free ? (s.free ? mcFreeModel(s.free) : null) : it && (it.kind === "carry" || it.kind === "borrow") ? it : null;
  const cmR = useRef<any>(cm); cmR.current = cm;

  /* the answer row's two numbers: the slot's boxes (graded) or free play's cells */
  const readParts = () => (free ? [...freeCells.current] : slotPartsOf(typedR.current, 2));
  const writeParts = (ps: string[]) => {
    if (free) { freeCells.current = [...ps]; put({ cells: [...ps] }); return; }
    const v = ps[0] === "" && ps[1] === "" ? "" : ps.join("|");
    typedR.current = v;
    api.setTyped(v);
  };
  const shown = free ? s.cells : slotPartsOf(typed, 2);

  /* Enter and choice taps go here first while the working area owns the answer */
  api.onEnter(null);
  HOOK.type = (v: any) => { api.setTyped(String(v ?? "")); return true; };

  /* the pad lent to an answer cell: a tap on the cell takes it, Enter moves on or answers */
  const release = () => { cellR.current = null; put({ cell: null }); api.capture(null); };
  keyFn.current = (k: string) => {
    const c = cellR.current;
    if (c === null) return;
    const ps = readParts();
    if (/^\d$/.test(k)) { ps[c] = staleR.current[c] ? k : ps[c].length >= 6 ? ps[c] : ps[c] + k; staleR.current[c] = false; writeParts(ps); clearDemo(); return; }
    if (k === "back") { ps[c] = ps[c].slice(0, -1); staleR.current[c] = false; writeParts(ps); clearDemo(); return; }
    if (k === "clear") { ps[c] = ""; staleR.current[c] = false; writeParts(ps); clearDemo(); return; }
    if (k !== "enter" || ps[c] === "") return;   /* a column holds a whole number: the point types nothing */
    const o = 1 - c, m = cmR.current;
    if (ps[o] === "") {
      if (m && m.kind === "carry" && c === 1 && Number(ps[1]) >= m.U) { release(); return; }   /* bundle first */
      cellR.current = o; put({ cell: o }); return;
    }
    release();
    if (free) return;
    if (wrongR.current && ps.join("|") === slotPartsOf(wrongR.current.value, 2).join("|")) return;   /* never the same miss twice */
    api.submit(ps.join("|"));
  };
  const openCell = (k: number) => {
    if (!(asking || free)) return;
    clearDemo();
    cellR.current = k;
    put({ cell: k });
    api.capture((key: string) => keyFn.current && keyFn.current(key));
  };
  useEffect(() => { if (!captured && cellR.current !== null) { cellR.current = null; put({ cell: null }); } }, [captured]);
  useEffect(() => { staleR.current = [false, false]; cellR.current = null; }, [ik]);
  /* any typing in the slot after a correction is the child's next act: the worked layer goes */
  useEffect(() => { if (demoRaw && demoRaw.done) setDemo(null); }, [typed]);

  /* Bundle: one larger unit's worth of the child's own smaller-column total becomes a carry tile */
  const smallNow = shown[1] === "" ? null : Number(shown[1]);
  const waiting = s.tiles > s.docked;
  const canBundle = !!cm && cm.kind === "carry" && (asking || free) && smallNow !== null && smallNow >= cm.U && !waiting;
  const bundle = () => {
    const m = cmR.current;
    if (!m || m.kind !== "carry") return;
    const ps = readParts();
    if (ps[1] === "" || Number(ps[1]) < m.U || sR.current.tiles > sR.current.docked) return;
    clearDemo();
    ps[1] = String(Number(ps[1]) - m.U);
    staleR.current[1] = false;
    writeParts(ps);
    put((b: any) => ({ tiles: b.tiles + 1 }));
    api.sfx.tick();
    if (stageR.current !== "ask" && stageR.current !== "free") return;
    if (m.small === "cm") api.say("100 cm make 1 m. Drag the metre across.");
    else if (m.small === "g") api.say("1,000 g make 1 kg. Drag the kilogram across.");
    else if (m.small === "mL") api.say("1,000 mL make 1 L. Drag the litre across.");
    else if (m.small === "mm") api.say("10 mm make 1 cm. Drag the centimetre across.");
    else api.say("1,000 m make 1 km. Drag the kilometre across.");
  };
  const dockCarry = () => { clearDemo(); put((b: any) => ({ docked: b.tiles })); api.sfx.tick(); };

  /* Break: one larger unit of the top measure turns into the smaller unit, as a tile that waits */
  const canBreak = !!cm && cm.kind === "borrow" && (handsOn || free) && !s.borrow && cm.top[0] >= 1;
  const breakOne = () => {
    const m = cmR.current;
    if (!m || m.kind !== "borrow" || sR.current.borrow) return;
    clearDemo();
    put({ borrow: "wait" });
    api.sfx.tick();
    if (stageR.current !== "ask" && stageR.current !== "free") return;
    if (m.small === "g") api.say("1 kg breaks into 1,000 g. Drag them to the grams.");
    else if (m.small === "cm") api.say("1 m breaks into 100 cm. Drag them to the centimetres.");
    else if (m.small === "mL") api.say("1 L breaks into 1,000 mL. Drag them to the millilitres.");
    else if (m.small === "mm") api.say("1 cm breaks into 10 mm. Drag them to the millimetres.");
    else api.say("1 km breaks into 1,000 m. Drag them to the metres.");
  };

  /* the one drag: a carry tile into the larger column, a borrow tile into the smaller one (or back) */
  const drag = useDrag((p: any, at: any, moved: boolean) => {
    if (!p) return;
    const inCol = (c: number) => at && at.x >= c - 150 && at.x <= c + 150 && at.y >= -30 && at.y <= 430;
    if (p.kind === "carry") { if (!moved || inCol(MC_C.big)) dockCarry(); return; }
    if (p.kind === "borrow") {
      if (!moved || inCol(MC_C.small)) { clearDemo(); put({ borrow: "in" }); api.sfx.tick(); }
      else if (inCol(MC_C.big)) { clearDemo(); put({ borrow: null }); api.sfx.tick(); }
    }
  });

  /* phase 2: a tap on a measure card writes its decimal row in the larger unit */
  const tapRow = (k: number) => {
    if (busy || sR.current.rows[k]) return;
    clearDemo();
    const rows = [...sR.current.rows]; rows[k] = true;
    const first = !sR.current.said && stageR.current === "ask";
    put({ rows, said: sR.current.said || first });
    api.sfx.tick();
    if (first && it && it.small === "mL") api.say("1,000 mL make 1 L, so millilitres fill 3 places after the point.");
  };

  /* phase 4: a tap moves a side card's point one place towards metres; the walker checks the sides */
  const shape = it && it.kind === "boundary" ? MC_SHAPES[it.shape] : null;
  const tapSide = (k: number) => {
    if (busy || wl.busy) return;
    const ui = [...sR.current.ui];
    if (ui[k] >= 3) return;
    clearDemo();
    ui[k] += 1;
    put({ ui, walk: null });
    api.sfx.tick();
  };
  const walkGo = () => {
    if (!shape || busy || wl.busy) return;
    clearDemo();
    const P = shape.pts, N = P.length, ui = sR.current.ui;
    const steps: any[] = [];
    let stop = -1;
    for (let k = 0; k < N && stop < 0; k++) {
      if (ui[k] !== 3) { stop = k; break; }
      for (let j = 1; j <= 5; j++) { const at = mcLerp(P[k], P[(k + 1) % N], j / 5); steps.push([80, () => put({ walk: { at } })]); }
    }
    if (stop >= 0) {
      steps.push([60, () => put({ walk: { at: P[stop], stop } })]);
      wl.run(steps, () => { if (stageR.current === "ask") api.say("This side is not in metres yet."); });
    } else {
      wl.run(steps, () => { put({ walk: { at: P[0], home: true } }); if (stageR.current === "ask") api.say("Every side is in metres. Now add them all."); });
    }
  };
  /* the win: the walker goes all the way round */
  useEffect(() => {
    if (stage !== "win" || !shape) return;
    const P = shape.pts, N = P.length, steps: any[] = [];
    for (let k = 0; k < N; k++) for (let j = 1; j <= 4; j++) { const at = mcLerp(P[k], P[(k + 1) % N], j / 4); steps.push([90, () => put({ walk: { at } })]); }
    wl.run(steps, () => put({ walk: { at: P[0], home: true } }));
  }, [stage]);

  /* the traceback: redraw the working on a layer of its own, ending on the whole right answer; the
     child's own pieces and numbers stay as they were, and the layer goes at the child's next act */
  useEffect(() => {
    if (!wrong || stage !== "ask" || !it) return;
    staleR.current = [true, true];
    if (cellR.current !== null) release();
    wl.stop();
    api.lock(true);
    const steps: any[] = [];
    const D = (o: any) => () => setDemo({ ik, ...o });
    if (it.kind === "carry") {
      const t = it.top[1] + it.bot[1], over = t >= it.U, sm = String(t % it.U), bg = String(it.top[0] + it.bot[0] + (over ? 1 : 0));
      steps.push([800, D({ lit: "small", small: String(t), overfull: over })]);
      if (over) {
        steps.push([900, D({ lit: "small", small: sm, tile: "small" })]);
        steps.push([800, D({ lit: "big", small: sm, tile: "big" })]);
      }
      steps.push([800, D({ lit: "big", small: sm, big: bg, tile: over ? "big" : null })]);
      steps.push([100, D({ small: sm, big: bg, tile: over ? "big" : null, done: true })]);
    } else if (it.kind === "borrow") {
      const need = it.top[1] < it.bot[1];
      const tS = need ? it.top[1] + it.U : it.top[1], tB = need ? it.top[0] - 1 : it.top[0];
      const sm = String(tS - it.bot[1]), bg = String(tB - it.bot[0]);
      steps.push([800, D({ lit: "small", mark: true })]);
      if (need) {
        steps.push([900, D({ lit: "small", broke: true, tile: "big" })]);
        steps.push([900, D({ lit: "small", broke: true, into: true, tile: "small" })]);
      }
      steps.push([800, D({ lit: "big", broke: need, into: need, tile: need ? "small" : null, small: sm })]);
      steps.push([100, D({ broke: need, into: need, tile: need ? "small" : null, small: sm, big: bg, done: true })]);
    } else if (it.kind === "decimal") {
      steps.push([900, D({ rows: true, lit: true })]);
      steps.push([900, D({ rows: true, carries: true })]);
      steps.push([100, D({ rows: true, carries: true, sum: true, done: true })]);
    } else if (it.kind === "boundary" && shape) {
      const P = shape.pts, N = P.length, ui = sR.current.ui;
      const conv: number[] = [];
      ui.forEach((u: number, k: number) => { if (u === 3) conv.push(k); });
      for (let k = 0; k < N; k++) {
        if (ui[k] !== 3) { conv.push(k); steps.push([700, D({ at: P[k], lit: k, conv: [...conv] })]); }
        for (let j = 1; j <= 4; j++) { const at = mcLerp(P[k], P[(k + 1) % N], j / 4); steps.push([90, D({ at, conv: [...conv] })]); }
      }
      steps.push([100, D({ at: P[0], conv: [...conv], total: true, done: true })]);
    }
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState): never the answer before it is given */
  api.share(free || !it ? {} : {
    stack: cm ? `${cm.top[0]} ${cm.big} ${cm.top[1]} ${cm.small} ${cm.kind === "carry" ? "+" : "−"} ${cm.bot[0]} ${cm.big} ${cm.bot[1]} ${cm.small}`
      : it.kind === "decimal" ? (it.rows ? it.rows.map((r: number[]) => `${r[0]} ${it.unit} ${r[1]} ${it.small}`) : it.dec.map((d: string) => `${d} ${it.unit}`)).join(" + ")
      : it.sides.map((sd: string[]) => `${sd[0]} ${sd[1]}`).join(" + "),
    columns: cm ? [cm.big, cm.small] : null,
    carry: cm && cm.kind === "carry" ? s.docked : null,
    borrow: cm && cm.kind === "borrow" ? s.borrow : null,
    decimals: it.kind === "decimal" ? s.rows : null,
    sides: it.kind === "boundary" ? s.ui.map((u: number) => MC_STEP[u]) : null,
    unit: it.unit || null,
    answer: winNow ? typed : null,
  });

  /* ── drawing helpers: called, never mounted (BUILD_CARD §6) ── */
  const quiet = mix(C.ink, "#FFFFFF", 0.3);
  const pulseRect = (x: number, y: number, w: number, h: number) => (
    <rect key="invite" className="c4-pulse" x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx={18} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
  );
  /* a unit fact as three short labels: "100 cm" "=" "1 m" */
  const fact = (key: string, a: string, b: string, cx: number, y: number, size: number, fill: string) => {
    const w = (t: string) => t.length * size * 0.56;
    const gap = size * 0.45, total = w(a) + gap * 2 + w("=") + w(b);
    const x0 = cx - total / 2;
    return (
      <g key={key}>
        <text x={x0} y={y} fontSize={size} fontWeight={700} fill={fill}>{tx(a)}</text>
        <text x={x0 + w(a) + gap + w("=") / 2} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>=</text>
        <text x={x0 + total - w(b)} y={y} fontSize={size} fontWeight={700} fill={fill}>{tx(b)}</text>
      </g>
    );
  };
  /* a tile: what it holds on top, the unit fact on its violet ribbon */
  const tileBody = (x: number, y: number, top: string, ra: string, rb: string, lifted: boolean) => (
    <g filter={lifted ? "url(#fLift)" : "url(#fShadowSoft)"}>
      <rect x={x} y={y} width={240} height={76} rx={12} fill="url(#gKey)" stroke={mcInk(MC_UNIT)} strokeWidth={3} />
      <text x={x + 120} y={y + 31} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(top)}</text>
      <rect x={x + 3} y={y + 40} width={234} height={33} rx={9} fill={MC_UNIT} />
      {fact("f", ra, rb, x + 120, y + 66, T.micro, "#FFFFFF")}
    </g>
  );
  const tilePiece = (kind: string, x: number, y: number, top: string, ra: string, rb: string, label: string) => {
    const d = drag.drag && drag.drag.payload && drag.drag.payload.kind === kind ? drag.drag : null;
    const px = d ? Math.max(-110, Math.min(W.w - 130, d.x - 120)) : x, py = d ? Math.max(-30, Math.min(W.h - 60, d.y - 38)) : y;
    return (
      <g key={"tile-" + kind} className="c4-piece" {...control("tile-" + kind, label)} {...drag.bind({ kind })} {...drag.keys({ kind })}>
        <rect x={px} y={py} width={240} height={76} rx={12} fill="transparent" />
        {tileBody(px, py, top, ra, rb, !!d)}
      </g>
    );
  };
  /* a whole number in a column, struck through in ink when a borrow has changed it */
  const colNum = (key: string, v: number, cx: number, y: number, fill: string, struck: boolean, lit: boolean) => {
    const t = mcNum(v), w = t.length * T.xl * 0.58;
    return (
      <g key={key}>
        {lit && <rect x={cx - w / 2 - 14} y={y - 50} width={w + 28} height={62} rx={12} fill={tint(MC_NOW, 0.7)} stroke={MC_NOW} strokeWidth={3} />}
        <text x={cx} y={y} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={struck ? quiet : fill}>{t}</text>
        {struck && <line x1={cx - w / 2 - 8} y1={y - 18} x2={cx + w / 2 + 8} y2={y - 18} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />}
      </g>
    );
  };
  /* an answer cell: the number, its unit, and the caret while it holds the pad */
  const cellBody = (key: string, k: number, y: number, val: string, unit: string, on: boolean, edge: string | null, green: boolean) => {
    const cx = k === 0 ? MC_C.big : MC_C.small, t = mcNum(val);
    const size = t.length <= 4 ? T.xl : t.length <= 6 ? T.speech : T.label;
    const ink = green ? mcInk(MC_ANS) : C.ink;
    return (
      <g key={key}>
        <rect x={cx - 120} y={y} width={240} height={80} rx={14} fill="#FFFFFF" stroke={edge || (on ? C.accent : C.rule)} strokeWidth={edge || on ? 4 : 2} />
        {t !== "" && <text x={cx + 28} y={y + 40 + size * 0.36} textAnchor="end" fontSize={size} fontWeight={700} fill={ink}>{t}</text>}
        <text x={cx + 46} y={y + 52} fontSize={T.label} fontWeight={600} fill={green ? ink : quiet}>{tx(unit)}</text>
        {on && <rect className="c4-caret" x={cx + 33} y={y + 15} width={4} height={50} rx={2} fill={C.accent} />}
      </g>
    );
  };

  /* ── 1 · 3 · free: the unit columns ── */
  const columns = () => {
    const m = cm;
    if (!m) return null;
    const carry = m.kind === "carry";
    const ps = shown;
    const over = carry && smallNow !== null && smallNow >= m.U;
    const live = asking || free;
    const lit = demo ? demo.lit || null : !live || winNow ? null : ps[1] === "" || over ? "small" : ps[0] === "" ? "big" : null;
    const broke = !!s.borrow || !!(demo && demo.broke), into = s.borrow === "in" || !!(demo && demo.into);
    const freeRight = free && ps[0] !== "" && ps[1] !== "" && (() => {
      const t = m.top[0] * m.U + m.top[1], b = m.bot[0] * m.U + m.bot[1], r = carry ? t + b : t - b;
      return Number(ps[0]) === Math.floor(r / m.U) && Number(ps[1]) === r % m.U;
    })();
    const green = winNow || freeRight;
    const rowInk = carry ? mcInk(MC_GIVEN) : mcInk(MC_TAKE);
    const smallTop = `${indian(m.U)} ${m.small}`;
    const ctl: any[] = [];
    /* the child's controls, in the order a keyboard child needs them */
    const cellHit = (k: number) => live && (
      <Hit key={"hit-" + k} id={k === 0 ? "cell-big" : "cell-small"} x={(k === 0 ? MC_C.big : MC_C.small) - 120} y={334} w={240} h={80}
        onPress={() => openCell(k)} enabled={!(s.cell === k && captured)}
        label={k === 0 ? "Write the " + MC_WORD[m.big] + " total" : "Write the " + MC_WORD[m.small] + " total"} />
    );
    const keyY = 200;
    const bundleKey = carry && (
      <Key key="bundle" id="bundle" label="Bundle" x={MC_KEY.x} y={keyY} w={MC_KEY.w} h={MC_KEY.h} C={C} disabled={!canBundle} onClick={bundle}>
        <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={canBundle ? C.ink : quiet}>{tx("Bundle")}</text>
      </Key>
    );
    const breakKey = !carry && (
      <Key key="break" id="break" label="Break" x={MC_KEY.x} y={keyY} w={MC_KEY.w} h={MC_KEY.h} C={C} disabled={!canBreak} onClick={breakOne}>
        <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={canBreak ? C.ink : quiet}>{tx("Break")}</text>
      </Key>
    );
    const tile = carry
      ? waiting && (live ? tilePiece("carry", MC_C.small - 120, 50, `1 ${m.big}`, `${indian(m.U)} ${m.small}`, `1 ${m.big}`, "Carry tile")
          : <g key="tile-wait" pointerEvents="none">{tileBody(MC_C.small - 120, 50, `1 ${m.big}`, `${indian(m.U)} ${m.small}`, `1 ${m.big}`, false)}</g>)
      : s.borrow === "wait" && ((live || handsOn) ? tilePiece("borrow", MC_C.big - 120, 50, smallTop, `1 ${m.big}`, smallTop, "Borrow tile")
          : <g key="tile-wait" pointerEvents="none">{tileBody(MC_C.big - 120, 50, smallTop, `1 ${m.big}`, smallTop, false)}</g>);
    if (carry) ctl.push(cellHit(1), bundleKey, tile, cellHit(0));
    else ctl.push(breakKey, tile, cellHit(1), cellHit(0));
    /* the one invite: the next thing to touch */
    let invite: any = null;
    if (asking && !demo && s.cell === null && !free) {
      const cellAt = (k: number) => pulseRect((k === 0 ? MC_C.big : MC_C.small) - 120, 334, 240, 80);
      if (carry) invite = waiting ? pulseRect(MC_C.small - 120, 50, 240, 76) : ps[1] === "" ? cellAt(1) : over ? pulseRect(MC_KEY.x, keyY, MC_KEY.w, MC_KEY.h) : ps[0] === "" ? cellAt(0) : null;
      else invite = !s.borrow && m.top[1] < m.bot[1] ? pulseRect(MC_KEY.x, keyY, MC_KEY.w, MC_KEY.h) : s.borrow === "wait" ? pulseRect(MC_C.big - 120, 50, 240, 76) : ps[1] === "" ? cellAt(1) : ps[0] === "" ? cellAt(0) : null;
    }
    return (
      <g>
        {[["big", MC_C.big], ["small", MC_C.small]].map(([key, c]: any) => (
          <rect key={"col-" + key} x={c - 140} y={44} width={280} height={378} rx={RAD.panel}
            fill={lit === key ? tint(MC_NOW, 0.85) : tint(C.panel, 0.45)} stroke={lit === key ? MC_NOW : C.rule} strokeWidth={lit === key ? 4 : 2} />
        ))}
        <text x={MC_C.big} y={32} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC_UNIT)}>{tx(MC_WORD[m.big])}</text>
        <text x={MC_C.small} y={32} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC_UNIT)}>{tx(MC_WORD[m.small])}</text>
        {/* the docked carry tiles in the larger column, the merged borrow tile in the smaller one */}
        {carry && s.docked > 0 && (
          <g pointerEvents="none">{Array.from({ length: s.docked }).map((_, k) => (
            <g key={"dock-" + k}>{tileBody(MC_C.big - 120 + k * 8, 50 - k * 6, `1 ${m.big}`, `${indian(m.U)} ${m.small}`, `1 ${m.big}`, false)}</g>))}</g>
        )}
        {!carry && s.borrow === "in" && <g pointerEvents="none">{tileBody(MC_C.small - 120, 50, smallTop, `1 ${m.big}`, smallTop, false)}</g>}
        {/* the given measures; a borrow writes the new top numbers above, the old ones struck in ink */}
        {colNum("t0", m.top[0], MC_C.big, 224, mcInk(MC_GIVEN), broke, false)}
        {colNum("t1", m.top[1], MC_C.small, 224, mcInk(MC_GIVEN), into, !!(demo && demo.mark))}
        {colNum("b0", m.bot[0], MC_C.big, 300, rowInk, false, false)}
        {colNum("b1", m.bot[1], MC_C.small, 300, rowInk, false, !!(demo && demo.mark))}
        <text x={30} y={300} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{carry ? "+" : "−"}</text>
        {broke && <text x={MC_C.big} y={162} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{mcNum(m.top[0] - 1)}</text>}
        {into && <text x={MC_C.small} y={162} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{mcNum(m.top[1] + m.U)}</text>}
        <line x1={14} y1={322} x2={656} y2={322} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
        {/* the answer row: the child's own numbers */}
        {cellBody("c0", 0, 334, ps[0], m.big, s.cell === 0 && captured, null, green)}
        {cellBody("c1", 1, 334, ps[1], m.small, s.cell === 1 && captured, over && !green ? MC_NOW : null, green)}
        {ctl}
        {free && freeKeys()}
        {/* the correction's own layer: the worked row under the child's, a tile hopping across */}
        {demo && (
          <g pointerEvents="none">
            {demo.tile && tileBody((demo.tile === "big" ? MC_C.big : MC_C.small) - 120, 50,
              carry ? `1 ${m.big}` : smallTop, carry ? `${indian(m.U)} ${m.small}` : `1 ${m.big}`, carry ? `1 ${m.big}` : smallTop, false)}
            {(demo.small !== undefined || demo.big !== undefined) && cellBody("w1", 1, 428, demo.small || "", m.small, false, demo.overfull ? MC_NOW : null, !!demo.done)}
            {(demo.small !== undefined || demo.big !== undefined) && cellBody("w0", 0, 428, demo.big || "", m.big, false, null, !!demo.done)}
          </g>
        )}
        {invite}
      </g>
    );
  };
  /* free play's own keys: the unit pair, add or take away, new measures */
  const freeKeys = () => {
    const f = s.free || { pair: 0, op: "+", seed: 1 };
    const reset = (patch: any) => {
      if (cellR.current !== null) release();
      freeCells.current = ["", ""];
      put((b: any) => ({ free: { ...b.free, ...patch }, cells: ["", ""], tiles: 0, docked: 0, borrow: null }));
      api.sfx.tick();
    };
    return (
      <g key="free-keys">
        <Key id="units" label="Change units" x={MC_KEY.x} y={0} w={MC_KEY.w} h={84} C={C} onClick={() => reset({ pair: (f.pair + 1) % MC_PAIRS.length, seed: f.seed + 1 })}>
          <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC_UNIT)}>{tx(MC_PAIRS[f.pair].label)}</text>
        </Key>
        <Key id="op" label="Add or take away" x={MC_KEY.x} y={100} w={MC_KEY.w} h={84} C={C} onClick={() => reset({ op: f.op === "+" ? "−" : "+", seed: f.seed + 1 })}>
          <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{f.op === "+" ? tx("Add") : tx("Take away")}</text>
        </Key>
        <Key id="new" label="New measures" x={MC_KEY.x} y={312} w={MC_KEY.w} h={84} C={C} onClick={() => reset({ seed: f.seed + 1 })}>
          <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("New")}</text>
        </Key>
      </g>
    );
  };

  /* ── 2: decimal rows in the larger unit, the points locked in one line ── */
  const decRow = (key: string, str: string, y: number, fill: string, px: number, d: number, size: number) => {
    const L = mcPlaces(str, px, d);
    return (
      <g key={key}>
        {L.out.map((p: any, k: number) => <text key={k} x={p.x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={p.grey ? MC_ZERO : fill}>{p.ch}</text>)}
        {L.dot && <circle cx={px} cy={y - 5} r={size > 50 ? 7 : 5} fill={fill} />}
      </g>
    );
  };
  const decimals = () => {
    if (!it || it.kind !== "decimal") return null;
    const places = String(it.U).length - 1;
    const rowStr = (r: number[]) => r[0] + "." + String(r[1]).padStart(places, "0");
    const rowsY = [112, 196];
    const single = !!it.single;
    const strs: string[] = it.rows ? it.rows.map(rowStr) : it.dec;
    const live = handsOn;
    const ansY = single ? 112 : 290;
    const unitX = MC_DP + MC_DD * 4 + 8;
    let invite: any = null;
    const out: any[] = [];
    /* the unit the rows are in, and its unit fact */
    out.push(
      <g key="head">
        {demo && demo.lit && <rect x={MC_DP - 110} y={-2} width={220} height={44} rx={12} fill={tint(MC_NOW, 0.7)} stroke={MC_NOW} strokeWidth={3} />}
        <text x={MC_DP} y={30} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC_UNIT)}>{tx(MC_WORD[it.unit])}</text>
      </g>,
      <line key="pline" x1={MC_DP} y1={52} x2={MC_DP} y2={single ? 240 : 420} stroke={C.rule} strokeWidth={3} strokeDasharray="8 10" />,
      fact("ufact", `${indian(it.U)} ${it.small}`, `1 ${it.unit}`, 165, single ? 230 : 300, T.label, mcInk(MC_UNIT)),
    );
    if (it.rows) {
      it.rows.forEach((r: number[], k: number) => {
        const y = rowsY[k], cy = y - 18, done = s.rows[k] && !single;
        out.push(
          <g key={"card" + k}>
            <rect x={0} y={cy - 38} width={330} height={76} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
            <text x={165} y={cy + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={mcInk(MC_GIVEN)}>{`${r[0]} ${it.unit} ${r[1]} ${it.small}`}</text>
            <path d={`M 346 ${cy} H ${MC_DP - MC_DD * 2 - 24}`} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
            <path d={`M ${MC_DP - MC_DD * 2 - 36} ${cy - 10} L ${MC_DP - MC_DD * 2 - 22} ${cy} L ${MC_DP - MC_DD * 2 - 36} ${cy + 10}`} fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </g>,
        );
        if (!single && (done || (demo && demo.rows))) out.push(decRow("row" + k, rowStr(r), y, mcInk(MC_ANS), MC_DP, MC_DD, T.xl), <text key={"u" + k} x={unitX} y={y} fontSize={T.label} fontWeight={600} fill={mcInk(MC_ANS)}>{tx(it.unit)}</text>);
        if (!single && !done && live) {
          out.push(<Hit key={"hit" + k} id={"card-" + (k + 1)} x={0} y={cy - 38} w={330} h={76} onPress={() => tapRow(k)} label={"Write " + r[0] + " " + it.unit + " " + r[1] + " " + it.small + " in " + MC_WORD[it.unit]} />);
          if (!invite && asking && !demo) invite = pulseRect(0, cy - 38, 330, 76);
        }
      });
    } else {
      strs.forEach((d: string, k: number) => out.push(decRow("row" + k, d, rowsY[k], mcInk(MC_GIVEN), MC_DP, MC_DD, T.xl),
        <text key={"u" + k} x={unitX} y={rowsY[k]} fontSize={T.label} fontWeight={600} fill={mcInk(MC_GIVEN)}>{tx(it.unit)}</text>));
    }
    if (!single) out.push(
      <text key="plus" x={MC_DP - MC_DD * 4} y={196} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>+</text>,
      <line key="rule" x1={MC_DP - MC_DD * 4 - 30} y1={222} x2={MC_DP + MC_DD * 4 + 50} y2={222} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />,
    );
    if (!single && demo && demo.carries) mcCarries(strs, MC_DP, MC_DD).forEach((x: number, k: number) =>
      out.push(<text key={"cy" + k} x={x} y={64} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>1</text>));
    /* the child's own answer, set out on the same places */
    out.push(<g key="ans">{decRow("typed", typed, ansY, winNow ? mcInk(MC_ANS) : C.ink, MC_DP, MC_DD, T.xl)}
      {(typed !== "" || single) && <text x={unitX} y={ansY} fontSize={T.label} fontWeight={600} fill={winNow ? mcInk(MC_ANS) : quiet}>{tx(it.unit)}</text>}</g>);
    if (demo && demo.sum) {
      const wy = single ? 200 : 390;
      out.push(<g key="worked" pointerEvents="none">
        <rect x={MC_DP - MC_DD * 4 - 30} y={wy - 64} width={MC_DD * 8 + 80} height={86} rx={14} fill={tint(MC_ANS, 0.88)} stroke={MC_ANS} strokeWidth={2} />
        {decRow("w", String(it.answer), wy, mcInk(MC_ANS), MC_DP, MC_DD, T.xl)}
        <text x={unitX} y={wy} fontSize={T.label} fontWeight={600} fill={mcInk(MC_ANS)}>{tx(it.unit)}</text>
      </g>);
    }
    if (single && demo && demo.rows && !demo.sum) out.push(<g key="w2" pointerEvents="none">{decRow("w", String(it.answer), 200, mcInk(MC_ANS), MC_DP, MC_DD, T.xl)}</g>);
    return <g>{out}{invite}</g>;
  };

  /* ── 4: the shape, its side cards, the walker, and the sides in metres stacked on the right ── */
  const boundary = () => {
    if (!shape) return null;
    const P = shape.pts, N = P.length, ui = s.ui;
    const mm = it.sides.map(mcSideMM), start = it.sides.map((sd: string[]) => MC_AT[sd[1]]);
    const walking = wl.busy;
    const conv: number[] = demo && demo.conv ? demo.conv : [];
    const litSide = demo && demo.lit !== undefined ? demo.lit : s.walk && s.walk.stop !== undefined ? s.walk.stop : null;
    const at = demo && demo.at ? demo.at : s.walk && s.walk.at ? s.walk.at : P[0];
    const home = !s.walk || s.walk.home;
    const out: any[] = [];
    out.push(<polygon key="shape" points={P.map((p: number[]) => p.join(",")).join(" ")} fill={tint(C.panel, 0.45)} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />);
    if (litSide !== null) out.push(<line key="lit" x1={P[litSide][0]} y1={P[litSide][1]} x2={P[(litSide + 1) % N][0]} y2={P[(litSide + 1) % N][1]} stroke={MC_NOW} strokeWidth={12} strokeLinecap="round" />);
    let invite: any = null;
    const cards: any[] = [];
    it.sides.forEach((sd: string[], k: number) => {
      const [cx, cy] = shape.cards[k];
      const u = ui[k], moved = u - start[k];
      const fill = u === start[k] ? mcInk(MC_GIVEN) : u === 3 ? mcInk(MC_ANS) : C.ink;
      cards.push(
        <g key={"card" + k}>
          <rect x={cx - 90} y={cy - 38} width={180} height={76} rx={14} fill="#FFFFFF" stroke={litSide === k ? MC_NOW : C.rule} strokeWidth={litSide === k ? 4 : 2} filter="url(#fShadowSoft)" />
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={fill}>{`${mcShow(mm[k], u)} ${tx(MC_STEP[u])}`}</text>
          {Array.from({ length: moved }).map((_, j) => <circle key={j} cx={cx - (moved - 1) * 9 + j * 18} cy={cy + 26} r={5} fill={MC_MOVE} />)}
        </g>,
      );
      if (u < 3 && handsOn && !walking) {
        cards.push(<Hit key={"hit" + k} id={"side-" + (k + 1)} x={cx - 90} y={cy - 38} w={180} h={76} onPress={() => tapSide(k)} label={"Move the point of side " + (k + 1) + " one place"} />);
        if (!invite && asking && !demo) invite = pulseRect(cx - 90, cy - 38, 180, 76);
      }
    });
    out.push(...cards);
    /* the walker: a small figure standing on a corner */
    const [wx, wy] = at;
    out.push(
      <g key="walker" pointerEvents="none">
        <circle cx={wx} cy={wy - 50} r={12} fill={shade(C.accent, 0.1)} />
        <rect x={wx - 11} y={wy - 37} width={22} height={26} rx={8} fill={shade(C.accent, 0.1)} />
        <path d={`M ${wx - 6} ${wy - 12} L ${wx - 10} ${wy} M ${wx + 6} ${wy - 12} L ${wx + 10} ${wy}`} stroke={shade(C.accent, 0.1)} strokeWidth={6} strokeLinecap="round" />
      </g>,
    );
    if (handsOn && !walking && home) {
      out.push(<Hit key="walk" id="walker" x={P[0][0] - 44} y={P[0][1] - 76} w={88} h={88} onPress={walkGo} label="Set the walker going" />);
      if (!invite && asking && !demo && !(s.walk && s.walk.home)) invite = <Invite key="inv" x={P[0][0]} y={P[0][1] - 32} r={46} C={C} />;
    }
    /* the sides in metres, stacked with their points in one line */
    const rowY = (k: number) => 92 + k * 50;
    out.push(<text key="shead" x={MC_SP} y={30} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC_UNIT)}>{tx(MC_WORD[it.unit])}</text>);
    it.sides.forEach((sd: string[], k: number) => {
      const inM = ui[k] === 3, inDemo = !inM && conv.includes(k);
      if (inM || inDemo) out.push(decRow("s" + k, mcShow(mm[k], 3), rowY(k), start[k] === 3 ? mcInk(MC_GIVEN) : mcInk(MC_ANS), MC_SP, MC_SD, T.speech),
        <text key={"su" + k} x={MC_SP + MC_SD * 3 + 4} y={rowY(k)} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("m")}</text>);
      else out.push(<line key={"sd" + k} x1={MC_SP - MC_SD * 2} y1={rowY(k) - 6} x2={MC_SP + MC_SD * 2} y2={rowY(k) - 6} stroke={C.rule} strokeWidth={3} strokeDasharray="6 8" />);
    });
    const ruleY = rowY(N - 1) + 22, ansY = ruleY + 60;
    out.push(
      <text key="splus" x={MC_SP - MC_SD * 4} y={rowY(N - 1)} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>+</text>,
      <line key="srule" x1={MC_SP - MC_SD * 4 - 16} y1={ruleY} x2={MC_SP + MC_SD * 3 + 30} y2={ruleY} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />,
      <g key="sans">{decRow("typed", typed, ansY, winNow ? mcInk(MC_ANS) : C.ink, MC_SP, MC_SD, T.speech)}
        {typed !== "" && <text x={MC_SP + MC_SD * 3 + 4} y={ansY} fontSize={T.micro} fontWeight={600} fill={winNow ? mcInk(MC_ANS) : quiet}>{tx("m")}</text>}</g>,
    );
    if (demo && demo.total) out.push(
      <g key="worked" pointerEvents="none">
        <rect x={MC_SP - MC_SD * 4 - 16} y={ansY + 22} width={MC_SD * 7 + 46} height={64} rx={12} fill={tint(MC_ANS, 0.88)} stroke={MC_ANS} strokeWidth={2} />
        {decRow("w", String(it.answer), ansY + 68, mcInk(MC_ANS), MC_SP, MC_SD, T.speech)}
        <text x={MC_SP + MC_SD * 3 + 4} y={ansY + 68} fontSize={T.micro} fontWeight={600} fill={mcInk(MC_ANS)}>{tx("m")}</text>
      </g>,
    );
    return <g>{out}{invite}</g>;
  };

  return (
    <g>
      {cm ? columns() : it && it.kind === "decimal" ? decimals() : it && it.kind === "boundary" ? boundary() : null}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L || L.value === null || L.value === undefined) return null;
  const sh = L.shared || {};
  let text = "";
  if (Array.isArray(sh.columns)) { const ps = slotPartsOf(L.value, 2); text = `${mcNum(ps[0])} ${tx(sh.columns[0])} ${mcNum(ps[1])} ${tx(sh.columns[1])}`; }
  else text = `${String(L.value)} ${tx(sh.unit || "")}`.trim();
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC_ANS)}>{text}</text>
    </g>
  );
}

function MeasureColumns(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, pointKey: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default MeasureColumns;
