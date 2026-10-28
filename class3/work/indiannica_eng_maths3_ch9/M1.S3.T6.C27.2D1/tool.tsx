/* ═══ M1.S3.T6.C27.2D1 · pour_it · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build: header, canvas, keys, bubble, Kiko, phase dots,
   toolApi, sounds, scoring and the summary are the runtime's. THE LESSON IS SILENT (r30) and keyOnly (the question lives
   only in the bubble). This file draws the working area only: a see-through 1 L measuring jug (every 100 mL mark, the
   quarter, half and three quarter marks), the containers (photo skins: cup, bottle, bucket, drum, packet; drawn in code:
   the measuring vessels, glasses, teacups, the pot, the pan) and the three bins of phase 4.
   The water level is a pure function of the millilitres poured (piLevelY): the same amount stands at the same height in
   every frame. Every pour is an act through api.act (the drawn hand), the water rising in steps of about 50 mL.
   MISS HIDES THE ANSWER (ch 9 strict): a correction replays the working and stops one step before the answer; what shows
   the answer carries data-reveals="answer" and is drawn only at the win; the jug scales carry data-scale.
   THE ANSWER IS GATED BY THE ACT (PATTERNS 19): one source of truth, `want`, drives api.lock.
   NO imports in this file; only the five host hooks. */

const TOOL_ID = "pour_it";
const MEDIA_ID = "M1.S3.T6.C27.2D1";
const TOOL_NAME = "Pour It";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed before phase 1's teach lines only (not shown: phase 1 has guide steps) */
const OPENING = ["A glass jug, some small vessels and a shelf of real containers. Let us pour."];
/* the whole-tool line (r44: no longer shown; kept for the tool object's shape) */
const FINISH_LINE = "You poured, read the level at a mark, and sorted the containers against a litre.";
/* printed when the child opens Free play: everything it names is in the free branch of Work */
const FREE_LINE = "Free play: tap any container to pour it into the jug, and tap the jug to empty it.";

/* THE START PAGE (r28): one question to wonder at, and the objects the lesson is about (no digits, no answer). */
const START_HOOK = "Which holds more water: a cup, a bottle or a bucket?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const J = piJugAt(260, 290, { cap: 1000, step: 100, nums: [], long: [250, 500, 750] }, 306);
  return (
    <g>
      <rect x={60} y={306} width={box.w - 120} height={10} rx={5} fill={PI_C.table} />
      {piJug(J, 600, { tx, labels: {} })}
      <g transform="translate(640 306)">{piObj("cup", 150, false)}</g>
      <g transform="translate(800 306)">{piObj("bottle", 270, false)}</g>
      <g transform="translate(1000 306)">{piObj("bucket", 210, false)}</g>
    </g>
  );
}

/* Hindi and Gujarati (PATTERNS §11): filled in the language pass, once the English is final and reviewed. */
const TR: any = { hi: {}, gu: {} };

/* One entry per phase = one mount. Each item: say = the whole question in ONE sentence (the bubble is the only place it
   shows), ask = a short prompt (read by the checks and the sidecar, never drawn), miss + ladder = the hint rungs (weak to
   strong, never the answer, unique in the phase), win = the line printed at the right answer.
   Scene fields read by Work and the oracle: objs (the containers), n* (how many vessels stand ready), amount, marks,
   target. near = the item's misconception (nearMiss). */
const PHASES = [
  {
    n: 1,
    concept: "Capacity: litres and millilitres",
    conceptId: "M1.S3.T6.C27", objectiveIds: ["O9"],
    says: ["Pour some water in. Is this a small amount or a large amount?"],
    /* warm-up: the 1 L bottle fills the jug to its 1 L mark, then the jug is emptied (no question's answer) */
    steps: [
      { say: "This jug holds 1 litre: tap the bottle to pour it in.", on: "pour-bottle", hint: "Tap the tall orange bottle." },
      { say: "1 litre is 1,000 millilitres: tap the jug to empty it.", on: "empty", hint: "Now tap the jug of water." },
    ],
    ladder: [],
    closing: "Small amounts are measured in millilitres and large amounts in litres.",
    learned: "You learned: small amounts in millilitres, large amounts in litres.",
    traceback: "The container is poured into the 1 L jug again, and the child picks the unit once more.",
    items: [
      /* learn PI1: answer in the plan = Millilitres. A cup of tea is measured. Which unit fits the capacity of the cup, millilitres or litres? */
      { qid: "M1.S3.T6.C27:PI1", kind: "unit", objs: [{ id: "cup" }], choices: [{ id: "mL", label: "mL" }, { id: "L", label: "L" }], answer: "mL", near: "L",
        say: "Tap the cup to pour it into the jug: is a cup measured in mL or L?",
        ask: "A cup: mL or L?",
        miss: "See how high the water from the cup came in the jug.",
        ladder: ["The cup filled only a little of the 1 litre jug.", "A little amount is measured in the smaller unit."],
        win: "Yes, a cup holds a small amount, so it is measured in millilitres." },
      /* practice 1: answer in the plan = Litres, because a kettle holds a large amount of water. A kettle is filled at a tap.
         Which unit fits its capacity? (drawn as the bucket: the slot's photo of a large container; answered on the mL and L tags) */
      { qid: "M1.S3.T6.C27:1", kind: "tag", objs: [{ id: "bucket" }], pad: "enter", answer: "L", near: "mL",
        say: "Pour the bucket into the jug, then tap the unit tag that fits a bucket.",
        ask: "A bucket: tap mL or L",
        miss: "Look at the jug: the water from the bucket spilled over the top.",
        ladder: ["One bucket holds more than a whole 1 litre jug.", "A big amount is measured in the bigger unit."],
        win: "Yes, a bucket holds a lot of water, so it is measured in litres." },
      /* practice 5: answer in the plan = The syringe in millilitres and the bucket in litres. A syringe and a bucket are both
         filled with water. (drawn as the juice packet and the drum, the slot's photos of a small and a large container) */
      { qid: "M1.S3.T6.C27:5", kind: "pair", objs: [{ id: "packet" }, { id: "drum" }], choices: [{ id: "packet", label: "Packet" }, { id: "drum", label: "Drum" }], answer: "packet", near: "drum",
        say: "Pour the juice packet and the drum: which one is measured in mL?",
        ask: "Which one in mL?",
        miss: "Compare how high the water from each one came in the jug.",
        ladder: ["One of them spilled over the jug and one did not fill it.", "The one that holds only a little uses the small unit."],
        win: "Yes, a juice packet is measured in millilitres and a drum in litres." },
    ],
  },
  {
    n: 2,
    concept: "Standard vessels: from 50 mL up to 1 L",
    conceptId: "M1.S3.T6.C28", objectiveIds: ["O9"],
    says: ["Pour the small vessels into the big jug. How many does it take to reach the top?"],
    /* warm-up: 100 mL, then 200 mL, then 500 mL: the water stands at 800 mL after 3 pours (no question's answer) */
    steps: [
      { say: "Tap the 100 mL vessel to pour it into the jug.", on: "pour-v100", hint: "Tap the vessel marked 100 mL." },
      { say: "Now pour the 200 mL cup and watch the water rise.", on: "pour-v200", hint: "Tap the yellow cup marked 200 mL." },
      { say: "Pour the 500 mL vessel and read the level at its mark.", on: "pour-v500", hint: "Tap the biggest vessel, marked 500 mL." },
    ],
    ladder: [],
    closing: "Small vessels fill the 1 litre jug when their amounts add up to 1 litre.",
    learned: "You learned: small vessels fill 1 L when their amounts add up to 1 L.",
    traceback: "The pours are replayed one at a time with a counter, stopping one pour before the answer.",
    items: [
      /* learn PI2: answer in the plan = Two vessels. A glass jug holds one litre. A small vessel holds five hundred millilitres. How many fill the jug? */
      { qid: "M1.S3.T6.C28:PI2", kind: "count", vessel: "v500", nv: 3, parts: [{ label: "how many", unit: "vessels" }], answer: [2], near: "500",
        say: "Pour 500 mL vessels into the jug until it is full: how many fill it?",
        ask: "500 mL vessels in 1 L?",
        miss: "Pour again and count each vessel as it goes in.",
        ladder: ["Each vessel lifts the water by 500 mL; count up to the 1 L mark.", "Count in 500s: 500 mL, then 1,000 mL; count the pours you made."],
        win: "Yes, 2 vessels of 500 mL fill the 1 litre jug." },
      /* practice 2: answer in the plan = Five cups. A pot holds one litre of water. It is poured into small cups that each hold
         two hundred millilitres. How many cups does it fill? (the pot is the full 1 L measuring jug, so its level can be read) */
      { qid: "M1.S3.T6.C28:2", kind: "share", nc: 6, parts: [{ label: "how many", unit: "cups" }], answer: [5], near: "200",
        say: "Pour the full 1 L jug into 200 mL cups: how many cups does it fill?",
        ask: "200 mL cups from 1 L?",
        miss: "Pour again and watch the water in the jug go down.",
        ladder: ["Each cup takes 200 mL out of the jug; keep going until it is empty.", "Count in 200s up to 1,000 mL and count the cups as you go."],
        win: "Yes, 1 litre fills 5 cups of 200 mL." },
      /* practice 6: answer in the plan = 140 mL, because seven marks of 20 mL each give 140 mL */
      { qid: "M1.S3.T6.C28:6", kind: "read", marks: 7, parts: [{ label: "water", unit: "mL" }], answer: [140], near: "7",
        say: "Pour the water into the small jug marked every 20 mL: how much water is in it?",
        ask: "Water in the jug?",
        miss: "Find the last number below the water, then count the marks up.",
        ladder: ["Each small mark is 20 mL more than the mark below it.", "Start at 100 mL and count on by 20s up to the water."],
        win: "Yes, the water is at the 140 mL mark." },
    ],
  },
  {
    n: 3,
    concept: "Half a litre and a quarter of a litre",
    conceptId: "M1.S3.T6.C29", objectiveIds: ["O10"],
    says: ["Pour to the middle mark. Which thing holds about as much?"],
    /* warm-up: the quarter mark (250 mL is no question's answer) */
    steps: [
      { say: "Tap the lowest long mark: the water rises to a quarter of a litre.", on: "mark-250", hint: "Tap the long mark nearest the bottom." },
    ],
    ladder: [],
    closing: "Half a litre is 500 mL at the middle mark, and a quarter of a litre is 250 mL.",
    learned: "You learned: half a litre is 500 mL and a quarter of a litre is 250 mL.",
    traceback: "The jug is filled again to one step below the mark, and the child finishes the pour.",
    items: [
      /* learn PI3: answer in the plan = Five hundred millilitres. A bottle is marked up to one litre. Water is poured to the half way mark. */
      { qid: "M1.S3.T6.C29:PI3", kind: "half", target: 500, parts: [{ label: "half litre", unit: "mL" }], answer: [500], near: "250",
        say: "Tap the middle long mark to fill the jug to half a litre: how many mL is that?",
        ask: "Half a litre in mL?",
        miss: "Fill the jug to the middle mark again and look at the scale.",
        ladder: ["The middle mark is half way from 0 to 1,000 mL.", "The middle mark is half way between the 400 mL and 600 mL marks."],
        win: "Yes, half a litre is 500 millilitres." },
      /* practice 3: answer in the plan = Half a litre, because the bottle is half full. A one litre water bottle is filled to the
         half way mark. Is the water about a quarter of a litre, half a litre or one litre? */
      { qid: "M1.S3.T6.C29:3", kind: "about", amount: 500, choices: [{ id: "quarter", label: "quarter litre" }, { id: "half", label: "half litre" }, { id: "one", label: "1 litre" }], answer: "half", near: "quarter",
        say: "Pour the bottle into the jug: is it about a quarter, a half or 1 litre?",
        ask: "About how much?",
        miss: "See which long mark the water reached in the jug.",
        ladder: ["The quarter mark is low and the 1 litre mark is at the top.", "Is the water near the bottom, the middle or the top of the jug?"],
        win: "Yes, the bottle held about half a litre." },
      /* practice 7: answer in the plan = About four glasses, because four quarters make one litre */
      { qid: "M1.S3.T6.C29:7", kind: "glasses", ng: 6, parts: [{ label: "how many", unit: "glasses" }], answer: [4], near: "250",
        say: "Pour the quarter litre glasses into the jug: how many fill 1 litre?",
        ask: "Glasses in 1 L?",
        miss: "Pour the glasses again and count each one.",
        ladder: ["Each glass lifts the water up to the next long mark.", "Count the quarters: 1 quarter, 2 quarters, and on up to 1 litre."],
        win: "Yes, 4 quarter litre glasses fill 1 litre." },
    ],
  },
  {
    n: 4,
    concept: "More than or less than one litre",
    conceptId: "M1.S3.T6.C30", objectiveIds: ["O10"],
    says: ["Does this hold more than the jug, or less? Drag it to its side."],
    /* warm-up: a 3 L steel pot (in no question) goes to More than 1 L */
    steps: [
      { say: "Tap the steel pot to pick it up: it holds 3 L.", on: "pick-pot", hint: "Tap the steel pot on the shelf." },
      { say: "3 L is more than 1 L, so tap the bin More than 1 L.", on: "bin-more", hint: "Tap the bin on the right." },
    ],
    ladder: [],
    closing: "A container that fills the 1 litre jug more than once holds more than 1 litre.",
    learned: "You learned: compare a label with 1 L, that is 1,000 mL, to sort it.",
    traceback: "The containers go back to the shelf, 1 L = 1,000 mL lights, and the child sorts again.",
    items: [
      /* learn PI4: answer in the plan = The drum. A drum and a cup are both filled with water. Which one holds more than one litre? */
      { qid: "M1.S3.T6.C30:PI4", kind: "sort", objs: [{ id: "drum", show: "L" }, { id: "cup", show: "mL" }], pad: "enter", answer: "more,less", near: "less,more",
        say: "Put the drum and the cup in their bins: which one holds more than 1 L?",
        ask: "Sort: drum, cup",
        miss: "Read each label and compare it with 1 L.",
        ladder: ["1 L is the same as 1,000 mL.", "A label bigger than 1 L goes in More, a smaller one in Less."],
        win: "Yes, the drum holds more than 1 L and the cup holds less." },
      /* practice 4: answer in the plan = The spoon, because a spoon holds only a very small amount. A car fuel tank and a spoon
         are filled with water. Which one holds less than one litre? (a sort with the exact 1 L jug and the 1,000 mL bottle;
         the juice packet is the one that holds less) */
      { qid: "M1.S3.T6.C30:4", kind: "sort", objs: [{ id: "bucket", show: "L" }, { id: "jug", show: "L" }, { id: "bottle", show: "mL" }, { id: "packet", show: "mL" }], pad: "enter", answer: "more,equal,equal,less", near: "more,equal,more,less",
        say: "Sort the bucket, the jug, the bottle and the juice packet into the three bins.",
        ask: "Sort all four",
        miss: "Check each label again before you place it.",
        ladder: ["Change 1 L into millilitres, then compare each label.", "A label in mL is compared with 1,000 mL."],
        win: "Yes, the jug and the 1,000 mL bottle both hold exactly 1 L." },
      /* practice 8: answer in the plan = 4 cups, because counting 140, 280, 420, 560 takes four steps (drawn as teacups) */
      { qid: "M1.S3.T6.C30:8", kind: "pan", nt: 6, parts: [{ label: "how many", unit: "teacups" }], answer: [4], near: "140",
        say: "Each teacup holds 140 mL: pour them into the 560 mL pan; how many fill it?",
        ask: "Teacups to fill the pan?",
        miss: "Pour the teacups in one by one and count them.",
        ladder: ["Each teacup lifts the water in the pan by 140 mL.", "Count in 140s until you reach 560 mL."],
        win: "Yes, 4 teacups of 140 mL fill the 560 mL pan." },
    ],
  },
];

/* a win line is read, never cut (r41): each question's celebration lasts the win line's reading time (68 ms a character) */
PHASES.forEach((p: any) => p.items.forEach((it: any) => { if (it.win && !it.winMs) it.winMs = Math.max(1600, Math.round(68 * it.win.length)); }));

/* The numbers the working area needs (they go into the sidecar too). One capacity per object for the whole tool. */
const MODEL = {
  cap: { cup: 200, bottle: 1000, bucket: 10000, drum: 50000, packet: 200, glass: 250, teacup: 140, pot: 3000, jug: 1000, v50: 50, v100: 100, v500: 500 },
  jug: { cap: 1000, step: 100, long: [250, 500, 750] },
  small: { cap: 200, step: 20, numbered: [100, 200] },
  pan: { cap: 560 },
  bins: ["less", "equal", "more"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).replace(/\s+/g, "").toLowerCase() === String(item.answer).replace(/\s+/g, "").toLowerCase();
};
/* oracle: every answer re-derived from the scene's own numbers (MODEL), sharing no code with judge or Work */
const piDerive = (it: any) => {
  const cap = (id: string) => (MODEL.cap as any)[id];
  if (it.kind === "unit" || it.kind === "tag") return cap(it.objs[0].id) >= 1000 ? "L" : "mL";
  if (it.kind === "pair") return it.objs.find((o: any) => cap(o.id) < 1000).id;
  if (it.kind === "count") return [MODEL.jug.cap / cap(it.vessel)];
  if (it.kind === "share") return [MODEL.jug.cap / cap("cup")];
  if (it.kind === "read") return [it.marks * MODEL.small.step];
  if (it.kind === "half") return [MODEL.jug.cap / 2];
  if (it.kind === "about") { const f = it.amount / MODEL.jug.cap; return f === 0.25 ? "quarter" : f === 0.5 ? "half" : f === 1 ? "one" : "?"; }
  if (it.kind === "glasses") return [MODEL.jug.cap / cap("glass")];
  if (it.kind === "pan") return [MODEL.pan.cap / cap("teacup")];
  if (it.kind === "sort") return it.objs.map((o: any) => (cap(o.id) > 1000 ? "more" : cap(o.id) === 1000 ? "equal" : "less")).join(",");
  return null;
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => JSON.stringify(piDerive(it)) === JSON.stringify(it.answer)));
/* the item's misconception (the number on the vessel, the other unit, the 1,000 that looks bigger than 1) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a choice or a sort names its options) */
const answerForms = (item: any) => (item.parts ? item.answer.flatMap((x: number) => [String(x), indian(x), words(x)])
  : item.choices || item.pad === "enter" ? [] : [String(item.answer)]);
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area (the unit tags, the bins): set it as a child would */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check(): performs the question's act at once (no animation), then Enter goes as usual */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing (module level: called, never mounted) ─────────────────────────────────────────── */

const PI_C = { card: "#FFFDF7", ink: "#2B2B2B", blue: "#0072B2", green: "#00704F", verm: "#C24E00", water: "#A8D4EC", waterD: "#2F7FAA",
  glass: "#F3F9FC", glassE: "#4D6A78", table: "#CDBFA6", chip: "#FFFFFF" };
/* the photo jug (images.json `jug`, a clear glass pitcher 200 x 247, spout left, handle right; its inside and its handle's opening
   transparent), as fractions of its picture: the interior profile [y, left x, right x] (a belly, not a tube: the code water is
   clipped to it), the inner floor y 0.842 (0 mL) and the 1 L mark y 0.16, linear between (y = 0.842 - 0.682 x mL / 1000), the belly's
   widest left x 0.10, the neck x 0.195 to 0.595 (where a pour goes in), the rim's right end (a pour out leaves there) */
const PI_JP = { a: 200 / 247, floor: 0.842, full: 0.16, belly: 0.10, neckL: 0.195, neckR: 0.595, lipR: [0.6, 0.03],
  prof: [[0.02, 0.205, 0.605], [0.15, 0.175, 0.605], [0.22, 0.195, 0.595], [0.29, 0.195, 0.61], [0.36, 0.17, 0.63], [0.43, 0.14, 0.655],
    [0.5, 0.115, 0.68], [0.57, 0.1, 0.685], [0.64, 0.1, 0.695], [0.7, 0.11, 0.69], [0.77, 0.19, 0.67], [0.842, 0.24, 0.63]] };
/* a measuring jug placed by the right edge of its number column (col: the pills end there, 58 left of the belly's widest point), the
   picture ph tall on the table (base): x, bw = the neck, yb = 0 mL, H = the height of the full capacity, brim = the rim, pic = the photo box */
function piJugAt(col: number, ph: number, more: any, base = 462) {
  const pw = ph * PI_JP.a, px = col + 58 - PI_JP.belly * pw, py = base - ph * 0.995;
  return { x: px + PI_JP.neckL * pw, bw: (PI_JP.neckR - PI_JP.neckL) * pw, yb: py + PI_JP.floor * ph, H: (PI_JP.floor - PI_JP.full) * ph,
    brim: py + 0.01 * ph, air: py + 0.02 * ph, col, pic: { x: px, y: py, w: pw, h: ph }, ...more };
}
/* the glass's inner left edge at height y (the profile, interpolated) */
const piEdgeL = (J: any, y: number) => {
  const p = J.pic, f = (y - p.y) / p.h, pr = PI_JP.prof;
  if (f <= pr[0][0]) return p.x + pr[0][1] * p.w;
  for (let k = 1; k < pr.length; k++) if (f <= pr[k][0]) { const a = pr[k - 1], b = pr[k], t = (f - a[0]) / (b[0] - a[0]); return p.x + (a[1] + (b[1] - a[1]) * t) * p.w; }
  return p.x + pr[pr.length - 1][1] * p.w;
};
/* the interior as a polygon in the picture's own box (x, y, w, h): the water is clipped to it */
const piProfile = (x: number, y: number, w: number, h: number) => {
  const pr = PI_JP.prof;
  return pr.map((r) => `${(x + r[1] * w).toFixed(1)},${(y + r[0] * h).toFixed(1)}`).concat(pr.slice().reverse().map((r) => `${(x + r[2] * w).toFixed(1)},${(y + r[0] * h).toFixed(1)}`)).join(" ");
};
/* a mark every 100 mL; a number on a pill every 200 mL (a 32-type pill needs 42 of the 61 between two), so 500 is read half way */
const PI_ONE = { cap: 1000, step: 100, nums: [200, 400, 600, 800, 1000], long: [250, 500, 750] };
/* phases 1, 2 and free play: the pills left of the jug; phase 3 and the small jug: the words (or the counted marks) left of the pills */
const PI_J1 = piJugAt(140, 450, PI_ONE);
const PI_J2 = piJugAt(304, 450, PI_ONE);
const PI_J3 = PI_J1;
const PI_JS = piJugAt(304, 450, { cap: 200, step: 20, nums: [100, 200], long: [] });
const PI_PAN = { x: 70, w: 380, yb: 446, hh: 150, cap: 560 };
const PI_LONG: any = { 250: "quarter litre", 500: "half litre", 750: "three quarters" };
const PI_BINS = [{ id: "less", label: "Less than 1 L" }, { id: "equal", label: "Equal to 1 L" }, { id: "more", label: "More than 1 L" }];
/* a bin: its labelled plate (a 76 tall control) on top, then four rows of 80, one a placed container (each a 76 tall control) */
const PI_BIN = (k: number) => ({ x: 680 + k * 260, y: 96, w: 250, h: 408 });
const PI_ROW = (B: any, r: number) => ({ x: B.x + 6, y: B.y + 84 + r * 80, w: B.w - 12, h: 76 });
/* each object's width : height (the photos at their own made aspect, never stretched) */
const PI_ASPECT: any = { cup: 124 / 150, bottle: 84 / 260, bucket: 200 / 182, drum: 154 / 200, packet: 84 / 170,
  v50: 0.64, v100: 0.64, v500: 0.55, glass: 0.74, teacup: 1.2, pot: 1.3, jug: 200 / 246, "jug-code": 200 / 246 };
const PI_PHOTO: any = { cup: "#F2C230", bottle: "#EE8B2B", bucket: "#F5C518", drum: "#A0522D", packet: "#E98AA8" };
const PI_NAME: any = { cup: "cup", bottle: "bottle", bucket: "bucket", drum: "drum", packet: "juice packet", glass: "glass", teacup: "teacup", pot: "steel pot", jug: "jug", v50: "50 mL vessel", v100: "100 mL vessel", v500: "500 mL vessel" };

/* where the water stands: a pure function of the millilitres */
const piLevelY = (J: any, ml: number) => J.yb - (Math.max(0, Math.min(ml, J.cap)) / J.cap) * J.H;
/* a photo skin is drawn: the plain shape under it is then painted clear (it stays in the DOM: skins-fallback) */
const piSkinOn = (k: string) => { try { return typeof TOOL_IMAGES !== "undefined" && !!(TOOL_IMAGES as any)[k] && SKINS !== false; } catch (e) { return false; } };
const piMl = (ml: number, tx: any) => (ml >= 1000 && ml % 1000 === 0 ? ml / 1000 + " " + tx("L") : indian(ml) + " " + tx("mL"));
const piLabel = (id: string, show: string, tx: any) => { const c = (MODEL.cap as any)[id]; return show === "L" ? c / 1000 + " " + tx("L") : indian(c) + " " + tx("mL"); };

/* a tag: a rounded chip centred at (cx, cy) */
function piTag(cx: number, cy: number, text: string, fill: string, ink: string, size = T.label, edge?: string) {
  const w = Math.max(70, Math.round(String(text).length * size * 0.56 + 16)), h = Math.round(size * 1.5);
  return (
    <g>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h / 2.6} fill={fill} stroke={edge || "none"} strokeWidth={edge ? 3 : 0} />
      <text x={cx} y={cy + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={ink}>{text}</text>
    </g>
  );
}

/* the measuring jug, drawn in this order: (1) the WATER behind the glass, a light-blue translucent fill clipped to the interior
   profile from the inner floor up to the level (a pure function of the millilitres, the same in every frame), with a darker line on
   its surface; (2) the photo `jug` over it, its walls and highlights showing on the water; (3) the marks, never on the water: a
   short dark tick outside the glass's left wall at every step, long ticks at the quarter, half and three quarter marks, a number
   on a cream pill every 200 mL in the column left of the jug with a leader line to its tick, and the quarter and half words (once
   the child's act names them) left of the pills. The code-drawn jug (the profile's outline and a handle) is the fallback, painted
   clear once the photo is on. */
const PI_PILL = 130;   /* the number column's width: "800 mL" at 32 on a pill */
function piJug(J: any, ml: number, o: any) {
  const { yb, H, cap } = J;
  const tx = o.tx || ((v: any) => v);
  const p = J.pic;
  const on = piSkinOn("jug"), op = on ? 0 : 1;
  const wy = piLevelY(J, ml);
  const over = ml > cap;
  const top = over ? J.air : wy;
  const cid = "piJw" + Math.round(p.x) + "_" + Math.round(p.y);
  const poly = piProfile(p.x, p.y, p.w, p.h);
  const numR = J.col, wordR = J.col - PI_PILL - 12;
  const marks: any[] = [];
  for (let v = J.step; v <= cap + 0.01; v += J.step) {
    const y = yb - (v / cap) * H, e = piEdgeL(J, y), big = J.nums.indexOf(v) >= 0;
    marks.push(<line key={"t" + v} x1={e - 26} y1={y} x2={e - 3} y2={y} stroke={PI_C.ink} strokeWidth={big ? 4 : 3} strokeLinecap="round" />);
    if (big) {
      const lab = v >= 1000 ? "1 " + tx("L") : v + " " + tx("mL");
      const w = Math.round(String(lab).length * T.label * 0.56 + 18);
      marks.push(<line key={"l" + v} x1={numR} y1={y} x2={e - 26} y2={y} stroke={PI_C.ink} strokeWidth={2} />);
      marks.push(<rect key={"p" + v} x={numR - w} y={y - 21} width={w} height={42} rx={21} fill={PI_C.card} stroke={PI_C.table} strokeWidth={2} />);
      marks.push(<text key={"n" + v} x={numR - 9} y={y + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={PI_C.ink}>{lab}</text>);
    }
  }
  return (
    <g>
      <defs><clipPath id={cid}><polygon points={poly} /></clipPath></defs>
      {/* (1) the water, and a pour's stream, behind the glass */}
      {ml > 0 && <g clipPath={"url(#" + cid + ")"}>
        <rect x={p.x} y={top} width={p.w} height={Math.max(0, yb - top + 2)} fill={PI_C.water} fillOpacity={on ? 0.55 : 0.85} />
        <line x1={p.x} y1={top} x2={p.x + p.w} y2={top} stroke={PI_C.waterD} strokeWidth={3} />
      </g>}
      {o.stream && <rect x={J.x + J.bw / 2 - 8} y={J.brim - 20} width={16} height={Math.max(20, top - J.brim + 20)} rx={8} fill={PI_C.water} fillOpacity={0.8} />}
      {/* the fallback: the interior's outline, a base and a handle, clear once the photo is on */}
      <polygon points={poly} fill="none" stroke={PI_C.glassE} strokeOpacity={op} strokeWidth={4} strokeLinejoin="round" />
      <rect x={p.x + 0.22 * p.w} y={p.y + 0.842 * p.h} width={0.43 * p.w} height={0.15 * p.h} rx={10} fill={PI_C.glass} fillOpacity={op} stroke={PI_C.glassE} strokeOpacity={op} strokeWidth={4} />
      <path d={`M ${p.x + 0.62 * p.w} ${p.y + 0.2 * p.h} C ${p.x + 0.98 * p.w} ${p.y + 0.18 * p.h} ${p.x + 0.98 * p.w} ${p.y + 0.62 * p.h} ${p.x + 0.69 * p.w} ${p.y + 0.66 * p.h}`} fill="none" stroke={PI_C.glassE} strokeOpacity={op} strokeWidth={10} strokeLinecap="round" />
      {/* (2) the glass */}
      <Skin name="jug" x={p.x} y={p.y} w={p.w} h={p.h} />
      {over && <g>
        <path d={`M ${p.x + 0.6 * p.w} ${p.y + 0.04 * p.h} C ${p.x + 1.1 * p.w} ${p.y + 0.02 * p.h} ${p.x + 1.06 * p.w} ${p.y + 0.4 * p.h} ${p.x + 1.05 * p.w} ${p.y + 0.97 * p.h}`} fill="none" stroke={PI_C.water} strokeWidth={12} strokeLinecap="round" />
        <ellipse cx={p.x + 1.05 * p.w} cy={p.y + 0.99 * p.h} rx={30} ry={7} fill={PI_C.water} />
      </g>}
      {/* (3) the marks, outside the glass */}
      <g data-scale="jug">{marks}</g>
      {(J.long || []).map((v: number) => {
        const y = yb - (v / cap) * H, e = piEdgeL(J, y);
        const lab = o.labels && o.labels[v];
        const lines = String(tx(PI_LONG[v])).split(" ");
        return (
          <g key={"L" + v}>
            <line x1={e - 50} y1={y} x2={e - 3} y2={y} stroke={PI_C.ink} strokeWidth={6} strokeLinecap="round" />
            {lab && <g data-reveals={o.reveal && o.reveal[v] ? "answer" : undefined}>
              <line x1={wordR + 6} y1={y} x2={e - 50} y2={y} stroke={PI_C.ink} strokeWidth={2} strokeDasharray="6 6" />
              {lines.map((t: string, j: number) => <text key={j} x={wordR} y={y + 11 - (lines.length - 1) * 17 + j * 34} textAnchor="end" fontSize={T.label} fontWeight={700} fill={PI_C.ink}>{t}</text>)}
            </g>}
          </g>
        );
      })}
    </g>
  );
}

/* the pan of phase 4 (a see-through glass pan, full at 560 mL) */
function piPan(P: any, ml: number, tx: any, stream: boolean) {
  const { x, w, yb, hh, cap } = P;
  const top = yb - hh - 14, wy = yb - (Math.max(0, Math.min(ml, cap)) / cap) * hh;
  const body = `M ${x} ${top} L ${x + 20} ${yb + 2} Q ${x + 24} ${yb + 14} ${x + 40} ${yb + 14} L ${x + w - 40} ${yb + 14} Q ${x + w - 24} ${yb + 14} ${x + w - 20} ${yb + 2} L ${x + w} ${top}`;
  const fy = yb - hh;
  return (
    <g>
      <path d={body + " Z"} fill={PI_C.glass} />
      {ml > 0 && <rect x={x + 18 + 6 * (1 - (yb - wy) / hh)} y={wy} width={w - 36 - 12 * (1 - (yb - wy) / hh)} height={yb + 10 - wy} rx={8} fill={PI_C.water} />}
      {ml > 0 && <line x1={x + 18} y1={wy} x2={x + w - 18} y2={wy} stroke={PI_C.waterD} strokeWidth={4} />}
      {stream && <rect x={x + w / 2 - 8} y={top - 60} width={16} height={Math.max(20, wy - top + 60)} rx={8} fill={PI_C.water} stroke={PI_C.waterD} strokeWidth={2} />}
      <path d={body} fill="none" stroke={PI_C.glassE} strokeWidth={5} strokeLinejoin="round" />
      <g data-scale="pan">
        <line x1={x + 6} y1={fy} x2={x + w - 6} y2={fy} stroke={PI_C.ink} strokeWidth={3} strokeDasharray="12 9" />
        <path d={`M ${x - 14} ${top + 30} q -22 0 -22 22 q 0 22 22 22`} fill="none" stroke={PI_C.glassE} strokeWidth={8} strokeLinecap="round" />
        <path d={`M ${x + w + 14} ${top + 30} q 22 0 22 22 q 0 22 -22 22`} fill="none" stroke={PI_C.glassE} strokeWidth={8} strokeLinecap="round" />
      </g>
      {piTag(x + w / 2, yb + 52, tx("pan") + " " + indian(cap) + " " + tx("mL"), PI_C.blue, "#FFFFFF", T.label)}
    </g>
  );
}

/* one container, standing, its base centre at (0, 0), h tall. full: the water inside shows (see-through ones), or a
   water top shows (an opaque cup). A photo object is the skin over a plain shape that is painted clear once the skin is on. */
function piObj(id: string, h: number, full: boolean) {
  const w = h * (PI_ASPECT[id] || 0.7);
  /* the 1 L measuring jug: its photo (full of water), the code-drawn jug under it painted clear */
  if (id === "jug") {
    const on = piSkinOn("jug");
    return (
      <g>
        <g opacity={on ? 0 : 1}>{piObj("jug-code", h, full)}</g>
        <defs><clipPath id="piJugObj"><polygon points={piProfile(-w / 2, -h, w, h)} /></clipPath></defs>
        <rect x={-w / 2} y={-h + PI_JP.full * h} width={w} height={(PI_JP.floor - PI_JP.full) * h} clipPath="url(#piJugObj)" fill={PI_C.water} fillOpacity={on && full ? 0.55 : 0} />
        <Skin name="jug" x={-w / 2} y={-h} w={w} h={h} />
      </g>
    );
  }
  if (PI_PHOTO[id]) {
    const on = piSkinOn(id), col = PI_PHOTO[id], op = on ? 0 : 1;
    let d = "";
    if (id === "cup") d = `M ${-w * 0.44} ${-h * 0.95} L ${w * 0.44} ${-h * 0.95} L ${w * 0.32} ${-h * 0.02} L ${-w * 0.32} ${-h * 0.02} Z`;
    else if (id === "bottle") d = `M ${-w * 0.42} ${-h * 0.68} Q ${-w * 0.42} ${-h * 0.8} ${-w * 0.2} ${-h * 0.84} L ${-w * 0.2} ${-h * 0.97} L ${w * 0.2} ${-h * 0.97} L ${w * 0.2} ${-h * 0.84} Q ${w * 0.42} ${-h * 0.8} ${w * 0.42} ${-h * 0.68} L ${w * 0.42} ${-h * 0.02} L ${-w * 0.42} ${-h * 0.02} Z`;
    else if (id === "bucket") d = `M ${-w * 0.46} ${-h * 0.92} L ${w * 0.46} ${-h * 0.92} L ${w * 0.36} ${-h * 0.03} L ${-w * 0.36} ${-h * 0.03} Z`;
    else if (id === "drum") d = `M ${-w * 0.44} ${-h * 0.9} Q ${-w * 0.44} ${-h * 0.96} ${-w * 0.3} ${-h * 0.96} L ${w * 0.3} ${-h * 0.96} Q ${w * 0.44} ${-h * 0.96} ${w * 0.44} ${-h * 0.9} L ${w * 0.44} ${-h * 0.04} L ${-w * 0.44} ${-h * 0.04} Z`;
    else d = `M ${-w * 0.42} ${-h * 0.86} L ${-w * 0.3} ${-h * 0.97} L ${w * 0.3} ${-h * 0.97} L ${w * 0.42} ${-h * 0.86} L ${w * 0.42} ${-h * 0.02} L ${-w * 0.42} ${-h * 0.02} Z`;
    return (
      <g>
        <path d={d} fill={col} fillOpacity={op} stroke={shade(col, 0.35)} strokeOpacity={op} strokeWidth={3} />
        <Skin name={id} x={-w / 2} y={-h} w={w} h={h} />
        {full && id === "cup" && <ellipse cx={0} cy={-h * 0.9} rx={w * 0.36} ry={Math.max(5, h * 0.045)} fill={PI_C.water} stroke={PI_C.waterD} strokeWidth={2} />}
      </g>
    );
  }
  if (id === "teacup") {
    return (
      <g>
        <ellipse cx={0} cy={-4} rx={w * 0.5} ry={8} fill="#E9E4DA" stroke="#8C877C" strokeWidth={3} />
        <path d={`M ${w * 0.3} ${-h * 0.75} c ${w * 0.26} 0 ${w * 0.26} ${h * 0.42} 0 ${h * 0.42}`} fill="none" stroke="#8C877C" strokeWidth={8} />
        <path d={`M ${-w * 0.4} ${-h} L ${w * 0.4} ${-h} Q ${w * 0.38} ${-h * 0.18} ${w * 0.18} ${-h * 0.1} L ${-w * 0.18} ${-h * 0.1} Q ${-w * 0.38} ${-h * 0.18} ${-w * 0.4} ${-h} Z`} fill="#FBFAF6" stroke="#8C877C" strokeWidth={3} />
        <path d={`M ${-w * 0.4} ${-h * 0.82} L ${w * 0.4} ${-h * 0.82}`} stroke="#3D7FB8" strokeWidth={6} />
        {full && <ellipse cx={0} cy={-h} rx={w * 0.38} ry={7} fill={PI_C.water} stroke={PI_C.waterD} strokeWidth={2} />}
      </g>
    );
  }
  if (id === "pot") {
    return (
      <g>
        <rect x={-w * 0.56} y={-h * 0.8} width={w * 0.12} height={h * 0.1} rx={5} fill="#7C858C" />
        <rect x={w * 0.44} y={-h * 0.8} width={w * 0.12} height={h * 0.1} rx={5} fill="#7C858C" />
        <rect x={-w * 0.46} y={-h * 0.9} width={w * 0.92} height={h * 0.88} rx={14} fill="#B9C1C7" stroke="#5E676E" strokeWidth={3} />
        <rect x={-w * 0.38} y={-h * 0.84} width={w * 0.12} height={h * 0.74} rx={6} fill="#E4E9EC" fillOpacity={0.8} />
        <ellipse cx={0} cy={-h * 0.9} rx={w * 0.48} ry={h * 0.06} fill="#D3D9DD" stroke="#5E676E" strokeWidth={3} />
      </g>
    );
  }
  /* the see-through ones: a measuring vessel, a glass, a small jug */
  const top = id === "glass" ? w * 0.5 : w * 0.46, bot = id === "glass" ? w * 0.38 : w * 0.46;
  const body = `M ${-top} ${-h} L ${-bot} ${-8} Q ${-bot} 0 ${-bot + 10} 0 L ${bot - 10} 0 Q ${bot} 0 ${bot} ${-8} L ${top} ${-h}`;
  const wl = 0.84, wy = -h * wl, wt = bot + (top - bot) * wl;
  return (
    <g>
      {(id === "v500" || id === "jug-code") && <path d={`M ${top - 2} ${-h * 0.86} C ${top + w * 0.36} ${-h * 0.86} ${top + w * 0.36} ${-h * 0.36} ${bot - 2} ${-h * 0.36}`} fill="none" stroke={PI_C.glassE} strokeWidth={8} strokeLinecap="round" />}
      <path d={body + " Z"} fill={PI_C.glass} />
      {full && <path d={`M ${-wt + 3} ${wy} L ${-bot + 3} ${-6} Q ${-bot + 4} -3 ${-bot + 12} -3 L ${bot - 12} -3 Q ${bot - 4} -3 ${bot - 3} -6 L ${wt - 3} ${wy} Z`} fill={PI_C.water} />}
      {full && <line x1={-wt + 4} y1={wy} x2={wt - 4} y2={wy} stroke={PI_C.waterD} strokeWidth={3} />}
      <path d={body} fill="none" stroke={PI_C.glassE} strokeWidth={4} strokeLinejoin="round" />
      {(id === "v500" || id === "v100" || id === "v50" || id === "jug-code") && [0.25, 0.5, 0.75].map((f) => <line key={f} x1={top - 4 - (id === "jug-code" ? 22 : 16)} y1={-h * f * 0.95} x2={top - 6} y2={-h * f * 0.95} stroke={PI_C.ink} strokeWidth={3} />)}
    </g>
  );
}

/* where a source stands and, while it pours, where it is tipped: one transform function for both, so CSS can glide between */
const piPose = (x: number, y: number, r: number, s: number, h: number) =>
  `translate(${Math.round(x)}px, ${Math.round(y)}px) rotate(${r}deg) scale(${s}) translate(0px, ${Math.round(h)}px)`;

/* each screen's things: the jug (or pan), the sources a child taps, and where each one is tipped to pour */
function piScene(n: number, kind: string, item: any) {
  /* a source: its id (the control is "pour-<id>"), what it is, where its base stands, its height; ty = its tag's centre below the base */
  const S = (id: string, obj: string, cx: number, yb: number, h: number, more: any = {}) => ({ id, obj, cx, yb, h, ty: 36, ...more });
  /* two shelves of three, right of the jug (x 480 to 900) */
  const row2 = (i: number) => ({ cx: 600 + 120 * (i % 3), yb: i < 3 ? 206 : 406 });
  const T0 = 458;   /* the table top */
  if (kind === "free") return { full: true, jug: PI_J1, srcs: [S("v100", "v100", 605, T0, 140, { cap: 100 }), S("cup", "cup", 735, T0, 150, { cap: 200 }), S("glass", "glass", 862, T0, 150, { cap: 250 }), S("v500", "v500", 990, T0, 200, { cap: 500 }), S("bottle", "bottle", 1110, T0, 300, { cap: 1000 })] };
  if (kind === "warm1") return { full: true, jug: PI_J1, srcs: [S("bottle", "bottle", 650, T0, 300, { cap: 1000 })] };
  if (kind === "unit") return { full: true, jug: PI_J1, srcs: [S("cup", "cup", 700, T0, 230, { cap: 200 })] };
  if (kind === "tag") return { full: true, jug: PI_J1, srcs: [S("bucket", "bucket", 722, T0, 280, { cap: 10000 })], tags: [{ id: "mL", x: 900, y: 150, w: 210, h: 110 }, { id: "L", x: 900, y: 300, w: 210, h: 110 }] };
  if (kind === "pair") return { full: true, jug: PI_J1, srcs: [S("packet", "packet", 600, T0, 200, { cap: 200 }), S("drum", "drum", 780, T0, 290, { cap: 50000 })] };
  const row4 = (i: number) => 480 + 113 * i;   /* four in a row, x 440 to 890, hit boxes 96 wide */
  if (kind === "warm2") return { jug: PI_J3, srcs: [S("v100", "v100", 597, T0, 120, { cap: 100, tag: true, hw: 108 }), S("v200", "cup", 713, T0, 120, { cap: 200, tag: true, hw: 108 }), S("v500", "v500", 829, T0, 160, { cap: 500, tag: true, hw: 108 })] };
  if (kind === "count") return { jug: PI_J3, srcs: [0, 1, 2].map((i) => S("vessel-" + (i + 1), "v500", 597 + 116 * i, T0, 160, { cap: 500, tag: true, hw: 108 })) };
  if (kind === "share") return { jug: PI_J3, share: true, shelves: [206, 406], srcs: [0, 1, 2, 3, 4, 5].map((i) => S("cup-" + (i + 1), "cup", row2(i).cx, row2(i).yb, 120, { cap: 200, tag: true, ty: 30 })) };
  if (kind === "read") return { jug: PI_JS, srcs: [S("bottle", "bottle", 780, T0, 300, { cap: 1000 })] };
  if (kind === "warm3" || kind === "half" || kind === "about") return { jug: PI_J2, marks: kind !== "about", srcs: [S("bottle", "bottle", 770, T0, 300, { cap: 1000, still: kind !== "about" })] };
  /* three shelves of two, right of the phase 3 jug (x 640 to 900) */
  const row3 = (i: number) => ({ cx: 738 + 112 * (i % 2), yb: [186, 330, 458][Math.floor(i / 2)] });
  if (kind === "glasses") return { jug: PI_J2, shelves: [186, 330], shelfX: 694, srcs: [0, 1, 2, 3, 4, 5].map((i) => S("glass-" + (i + 1), "glass", row3(i).cx, row3(i).yb, 90, { cap: 250, tag: true, ty: 24 })) };
  if (kind === "pan") return { pan: PI_PAN, shelves: [206, 406], srcs: [0, 1, 2, 3, 4, 5].map((i) => S("teacup-" + (i + 1), "teacup", row2(i).cx, row2(i).yb, 96, { cap: 140, tag: true, ty: 30 })) };
  /* warm4 and sort: the shelf of containers on the left, the three bins on the right */
  const objs = kind === "warm4" ? [{ id: "pot", show: "L" }] : item.objs;
  const H: any = { drum: 280, cup: 170, bucket: 190, jug: 210, bottle: 260, packet: 180, pot: 190 };
  const cell = 640 / objs.length;
  return { full: true, shelf: true, srcs: objs.map((o: any, i: number) => S(o.id, o.id, 20 + cell * (i + 0.5), 392, Math.min(H[o.id] || 180, objs.length > 2 ? 230 : 300), { show: o.show })) };
}

/* the act's target for a question, as the board would show it once the child has acted (HOOK.check and the win) */
function piTarget(kind: string, item: any) {
  if (kind === "unit") return { ml: 200, poured: { cup: true }, last: "cup" };
  if (kind === "tag") return { ml: 10000, poured: { bucket: true }, last: "bucket" };
  if (kind === "pair") return { ml: 200, poured: { packet: true, drum: true }, last: "packet" };
  if (kind === "count") return { ml: 1000, used: ["vessel-1", "vessel-2"] };
  if (kind === "share") return { ml: 0, used: ["cup-1", "cup-2", "cup-3", "cup-4", "cup-5"] };
  if (kind === "read") return { ml: 140, poured: { bottle: true } };
  if (kind === "half") return { ml: 500, mark: 500, labels: { 500: true } };
  if (kind === "about") return { ml: 500, poured: { bottle: true } };
  if (kind === "glasses") return { ml: 1000, used: ["glass-1", "glass-2", "glass-3", "glass-4"], labels: { 250: true, 500: true, 750: true } };
  if (kind === "pan") return { ml: 560, used: ["teacup-1", "teacup-2", "teacup-3", "teacup-4"] };
  if (kind === "sort") { const bins = String(item.answer).split(","), pl: any = {}; item.objs.forEach((o: any, i: number) => { pl[o.id] = { bin: bins[i], t: i + 1 }; }); return { placed: pl, sel: null }; }
  return {};
}

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const P: any = PHASES[n - 1] || {};
  const demoLike = !free && (stage === "demo" || stage === "teach") && !!(P.steps && P.steps.length);
  const kind = free ? "free" : demoLike ? "warm" + n : item.kind;
  const last = !free && index === (P.items || []).length - 1;
  const win = !free && !demoLike && (stage === "win" || (stage === "idle" && last));
  const asking = !free && !demoLike && stage === "ask";
  const sc: any = piScene(n, kind, item);

  /* the board is keyed to the ENTRY (PATTERNS 18): a new question, the warm-up or free play starts a fresh board */
  const qk = n + ":" + (free ? "f" : demoLike ? "w" : String(index));
  const ent = useRef({ qk: "", n: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, n: ent.current.n + 1 };
  const eN = ent.current.n;
  const fresh = { e: eN, ml: kind === "share" ? 1000 : 0, used: [], poured: {}, placed: {}, sel: null, unit: null, mark: null, labels: {},
    moving: null, pouring: null, stream: null, last: null, demo: null, replay: false, ever: false, t: 0 };
  const [raw, setRaw] = useState<any>(null);
  const SR = useRef<any>(null);
  if (!SR.current || SR.current.e !== eN) SR.current = raw && raw.e === eN ? raw : fresh;
  const S = SR.current;
  const put = (patch: any) => {
    if (ent.current.n !== eN) return;
    const b = SR.current && SR.current.e === eN ? SR.current : fresh;
    const nx = { ...b, ...(typeof patch === "function" ? patch(b) : patch) };
    SR.current = nx;
    setRaw(nx);
  };
  const stageRef = useRef(stage);
  stageRef.current = stage;

  /* did the child do the question's act on the board? */
  const doneOf = (s: any) => {
    if (kind === "unit") return !!s.poured.cup;
    if (kind === "tag") return !!s.poured.bucket;
    if (kind === "pair") return !!(s.poured.packet && s.poured.drum);
    if (kind === "count" || kind === "glasses") return s.ml >= 1000;
    if (kind === "share") return s.ml <= 0;
    if (kind === "read") return s.ml === 140;
    if (kind === "half") return s.ml === 500 && s.mark === 500;
    if (kind === "about") return s.ml === 500;
    if (kind === "pan") return s.ml >= 560;
    if (kind === "sort") return item.objs.every((o: any) => s.placed[o.id]);
    return true;
  };
  const done = doneOf(S);

  /* THE GATE (PATTERNS 19): one source of truth. Locked while the question still needs its act, the child has touched the
     board for real (a tap here, or a real Enter on a guide step) and the act was never complete on this entry; and while a
     correction plays (taps and keys wait for it). The agent's toolApi never touches the board, so it is never gated. */
  const real = useRef(false);
  const want = (asking && real.current && !S.ever && !done) || (asking && S.replay);
  const held = useRef(false);
  const syncLock = (w: boolean) => {
    if (w && !held.current) { held.current = true; api.lock(true); }
    else if (!w && held.current) { held.current = false; api.lock(false); }
  };
  useEffect(() => { syncLock(want); });
  useEffect(() => () => { if (held.current) { held.current = false; api.lock(false); } }, [eN]);
  useEffect(() => { if (asking && done && !S.ever) put({ ever: true }); }, [done, asking, eN]);
  useEffect(() => {
    const f = (e: any) => { if (e && e.isTrusted && e.key === "Enter" && stageRef.current === "demo") real.current = true; };
    window.addEventListener("keydown", f, true);
    return () => window.removeEventListener("keydown", f, true);
  }, []);
  const touch = () => {
    real.current = true;
    /* the first real tap arms the gate BEFORE the act starts, so the act's end never releases it (useActionKit keeps a lock held before it) */
    if (asking && !SR.current.ever && !doneOf(SR.current)) syncLock(true);
  };

  /* a nudge goes back to the question after 3 s */
  const nudgeT = useRef<any>(0);
  const nudge = (line: string) => {
    api.say(line);
    clearTimeout(nudgeT.current);
    const e = eN, say = item && item.say;
    nudgeT.current = setTimeout(() => { if (ent.current.n === e && stageRef.current === "ask" && say) api.say(say); }, 3000);
  };
  useEffect(() => () => { clearTimeout(nudgeT.current); tl.stop(); }, [eN]);

  /* acts go one at a time; a tap made while one plays is queued, never dropped */
  const busy = useRef(false);
  const queue = useRef<any>(null);
  const go = (fn: () => Promise<any>) => {
    if (busy.current) { queue.current = fn; return; }
    busy.current = true;
    const e = eN;
    fn().then(() => {
      busy.current = false;
      const q = queue.current; queue.current = null;
      if (q && ent.current.n === e) go(q);
    });
  };

  /* a correction left a demo picture: the child's next act starts from it (the child finishes the working) */
  const adopt = () => {
    const s = SR.current;
    if (!s.demo || s.replay) return;
    const d = s.demo;
    put({ demo: null, ...(d.ml !== undefined ? { ml: d.ml } : {}), ...(d.used ? { used: d.used } : {}) });
  };

  /* POUR: the hand carries the source to the jug and tips it; the water moves from where it stands to `to` in steps of about
     50 mL, each step at one point of the act (onPoint), so the level always shows exactly what has been poured */
  const J: any = sc.jug || null;
  const brimOf = (j: any) => j.brim;
  const pour = (src: any, to: number, extra: any = {}) => () => {
    const from = SR.current.ml, diff = to - from;
    const big = Math.abs(diff) > 1000;
    const k = Math.max(1, Math.min(20, Math.round(Math.abs(big ? 1500 : diff) / 50)));
    const tgt = sc.pan ? { x: sc.pan.x + sc.pan.w / 2, y: sc.pan.yb - sc.pan.hh - 90 } : { x: J.x + J.bw / 2, y: brimOf(J) - 10 };
    const at = Array.from({ length: k }, (_, i) => ({ x: tgt.x + 40 - (80 * i) / Math.max(1, k - 1), y: tgt.y }));
    const home = { x: src.cx, y: src.yb - src.h * 0.6 };
    put({ moving: src.id, pouring: null });
    return api.act({ tool: "hand", moves: "carry", from: home, at, to: home, ms: 1100,
      onPoint: (i: number) => put({ ml: Math.round(from + (diff * (i + 1)) / k), pouring: src.id }) })
      .then((ok: boolean) => {
        put((b: any) => ({ moving: null, pouring: null, ...(ok ? { ml: to, ...(typeof extra === "function" ? extra(b) : extra) } : {}) }));
        if (ok) api.sfx.settle();
        return ok;
      });
  };
  /* the jug poured OUT into a cup (phase 2's share): the hand taps the cup while the stream runs from the jug's lip */
  const pourOut = (src: any) => () => {
    const from = SR.current.ml, to = Math.max(0, from - src.cap), k = 4;
    put({ stream: src.id });
    return api.act({ tool: "hand", moves: "tap", at: Array.from({ length: k }, (_, i) => ({ x: src.cx - 12 + 8 * i, y: src.yb - src.h - 18 })), ms: 1000,
      onPoint: (i: number) => put({ ml: Math.round(from - ((from - to) * (i + 1)) / k) }) })
      .then((ok: boolean) => {
        put((b: any) => ({ stream: null, ...(ok ? { ml: to, used: b.used.concat([src.id]) } : {}) }));
        if (ok) api.sfx.settle();
        return ok;
      });
  };
  /* empty the jug: the hand taps it and the water goes down in steps */
  const empty = () => {
    const from = SR.current.ml, k = 5;
    return api.act({ tool: "hand", moves: "tap", at: Array.from({ length: k }, (_, i) => ({ x: J.x + J.bw / 2 - 30 + 15 * i, y: J.yb - 120 })), ms: 1000,
      onPoint: (i: number) => put({ ml: Math.round(from - (Math.min(from, 1500) * (i + 1)) / k) * (i === k - 1 ? 0 : 1) }) })
      .then((ok: boolean) => { if (ok) put({ ml: 0 }); return ok; });
  };
  /* phase 4: the hand carries the picked container into a bin */
  const toBin = (id: string, bin: string) => () => {
    const src = sc.srcs.find((s: any) => s.id === id);
    const k = PI_BINS.findIndex((b) => b.id === bin), B = PI_BIN(k);
    const rows = Object.keys(SR.current.placed).filter((x) => x !== id && SR.current.placed[x].bin === bin).length;
    const R = PI_ROW(B, Math.min(3, rows));
    const from = { x: src.cx, y: src.yb - src.h * 0.5 };
    return api.act({ tool: "hand", moves: "carry", from, at: [{ x: R.x + 40, y: R.y + 38 }], ms: 1000,
      onPoint: () => put((b: any) => ({ placed: { ...b.placed, [id]: { bin, t: b.t + 1 } }, t: b.t + 1, sel: null })) })
      .then((ok: boolean) => { if (ok) { api.sfx.tick(); put((b: any) => ({ placed: { ...b.placed, [id]: b.placed[id] || { bin, t: b.t + 1 } }, t: b.t + 1, sel: null })); } return ok; });
  };

  /* ── the guide steps: done when the child does them, reported with api.did ── */
  const stepAct = (name: string) => {
    if (stage !== "demo" || !stepOn) return;
    if (name !== stepOn) { api.did(name); return; }
    if (busy.current) return;   /* safe to start twice */
    const src = (id: string) => sc.srcs.find((s: any) => s.id === id);
    if (n === 1 && name === "pour-bottle") go(() => pour(src("bottle"), 1000, { poured: { bottle: true } })().then((ok: boolean) => { if (ok) api.did(name); }));
    else if (n === 1 && name === "empty") go(() => empty().then((ok: boolean) => { if (ok) api.did(name); }));
    else if (n === 2) {
      const s = src(name.replace("pour-", ""));
      go(() => pour(s, SR.current.ml + s.cap, (b: any) => ({ used: b.used.concat([s.id]) }))().then((ok: boolean) => { if (ok) api.did(name); }));
    } else if (n === 3 && name === "mark-250") go(() => pour(src("bottle"), 250, (b: any) => ({ mark: 250, labels: { ...b.labels, 250: true } }))().then((ok: boolean) => { if (ok) api.did(name); }));
    else if (n === 4 && name === "pick-pot") { put({ sel: "pot" }); api.sfx.tick(); api.did(name); }
    else if (n === 4 && name === "bin-more") go(() => toBin("pot", "more")().then((ok: boolean) => { if (ok) api.did(name); }));
  };
  /* every tap on a control: during a guide step it is that step's act (or a wrong act, which shows the step's hint) */
  const tap = (name: string, fn: () => void) => () => {
    real.current = true;
    if (stage === "demo") { stepAct(name); return; }
    if (S.replay) return;   /* the board takes no tap while the correction plays */
    touch();
    fn();
  };

  /* ── the question's own acts ── */
  const full = (s: any) => (sc.pan ? s.ml >= sc.pan.cap : s.ml >= 1000);
  const onSource = (src: any) => {
    if (free) { go(pour(src, SR.current.ml + src.cap)); return; }
    if (!asking) return;
    adopt();
    const s = SR.current;
    if (kind === "unit" || kind === "tag" || kind === "pair") {
      /* each container is measured on its own: the jug is emptied first */
      const amount = src.cap;
      go(() => {
        put({ ml: 0 });
        return pour(src, amount, (b: any) => ({ poured: { ...b.poured, [src.id]: true }, last: src.id }))();
      });
      return;
    }
    if (kind === "count" || kind === "glasses" || kind === "pan") {
      if (s.used.indexOf(src.id) >= 0) { nudge("That one is empty now: pour a full one."); return; }
      if (full(s)) { nudge(kind === "pan" ? "The pan is full now." : "The jug is full now."); return; }
      go(pour(src, s.ml + src.cap, (b: any) => ({ used: b.used.concat([src.id]), labels: kind === "glasses" ? { ...b.labels, [Math.min(1000, b.ml)]: true } : b.labels })));
      return;
    }
    if (kind === "share") {
      if (s.used.indexOf(src.id) >= 0) { nudge("That cup is full: tap an empty cup."); return; }
      if (s.ml <= 0) { nudge("The jug is empty now."); return; }
      go(pourOut(src));
      return;
    }
    if (kind === "read") {
      if (s.ml >= 140) { nudge("The water is in: now read the level."); return; }
      go(pour(src, 140, { poured: { bottle: true } }));
      return;
    }
    if (kind === "about") {
      if (s.ml >= 500) { nudge("The bottle is empty now."); return; }
      go(pour(src, 500, { poured: { bottle: true } }));
    }
  };
  const onMark = (v: number) => {
    if (!asking) return;
    adopt();
    const src = sc.srcs[0];
    if (SR.current.ml === v) { put({ mark: v }); if (v !== 500) nudge("Now tap the middle long mark."); return; }
    go(() => pour(src, v, (b: any) => ({ mark: v, labels: { ...b.labels, [v]: true } }))().then((ok: boolean) => { if (ok && v !== 500) nudge("Now tap the middle long mark."); return ok; }));
  };
  const onTag = (u: string) => {
    if (!asking) return;
    if (!SR.current.poured.bucket) { nudge("Pour the bucket into the jug first."); return; }
    put({ unit: u });
    api.sfx.tick();
  };
  /* phase 4: pick a container (a tap, or Enter on it), then a bin; or drag it straight into a bin */
  const pick = (id: string) => {
    real.current = true;
    if (stage === "demo") { stepAct("pick-" + id); return; }
    if (!asking || S.replay) return;
    touch();
    put((b: any) => ({ sel: b.sel === id ? null : id }));
    api.sfx.tick();
  };
  const onBin = (bin: string) => {
    real.current = true;
    if (stage === "demo") { stepAct("bin-" + bin); return; }
    if (!asking || S.replay) return;
    touch();
    const id = SR.current.sel;
    if (!id) { nudge("Tap a container first, then its bin."); return; }
    go(toBin(id, bin));
  };
  const binAt = (p: any) => { for (let k = 0; k < 3; k++) { const B = PI_BIN(k); if (p.x >= B.x && p.x <= B.x + B.w && p.y >= B.y - 20 && p.y <= B.y + B.h + 20) return PI_BINS[k].id; } return null; };
  const drag = useDrag((id: any, p: any, moved: boolean) => {
    if (!moved || !isFinite(p.x)) { pick(id); return; }
    if (stage === "demo") { stepAct("pick-" + id); return; }
    if (!asking || S.replay) return;
    touch();
    const bin = binAt(p);
    if (bin) { put((b: any) => ({ placed: { ...b.placed, [id]: { bin, t: b.t + 1 } }, t: b.t + 1, sel: null })); api.sfx.tick(); }
    else put((b: any) => { const pl = { ...b.placed }; delete pl[id]; return { placed: pl, sel: null }; });
  });

  /* Enter: a guide step's act, or the answer made on the board (the unit tag, the bins) */
  const sortValue = (s: any) => item.objs.map((o: any) => (s.placed[o.id] ? s.placed[o.id].bin : "")).join(",");
  const enterBoard = () => {
    const s = SR.current;
    if (s.replay) return;
    if (kind === "tag") {
      if (!s.poured.bucket) { nudge("Pour the bucket into the jug first."); return; }
      if (!s.unit) { nudge("Tap the mL tag or the L tag."); return; }
      api.submit(s.unit);
      return;
    }
    if (kind === "sort") {
      if (!item.objs.every((o: any) => s.placed[o.id])) { nudge("Put every container in a bin first."); return; }
      api.submit(sortValue(s));
    }
  };
  api.onEnter(stage === "demo" && stepOn ? () => stepAct(stepOn) : asking && item.pad === "enter" ? enterBoard : null);
  const ready = asking && item.pad === "enter" && (kind === "tag" ? !!(S.unit && S.poured.bucket) : kind === "sort" ? done : false);
  useEffect(() => { if (asking && item.pad === "enter") api.answerReady(ready); }, [ready, asking, eN]);

  /* the agent and the dev driver */
  HOOK.demo = () => stepAct(stepOn);
  HOOK.set = (v: any) => {
    if (kind === "tag") { put((b: any) => ({ unit: String(v).trim() === "mL" || String(v).toLowerCase() === "ml" ? "mL" : "L", poured: { ...b.poured, bucket: true }, ml: 10000, last: "bucket", ever: true })); return true; }
    if (kind === "sort") {
      const bins = String(v).split(",").map((x) => x.trim().toLowerCase());
      const pl: any = {};
      item.objs.forEach((o: any, i: number) => { if (MODEL.bins.indexOf(bins[i]) >= 0) pl[o.id] = { bin: bins[i], t: i + 1 }; });
      put({ placed: pl, t: item.objs.length + 1, sel: null, ever: true });
      return true;
    }
    return undefined;
  };
  HOOK.check = () => {
    if (stageRef.current !== "ask" || free) return undefined;
    if (!doneOf(SR.current) && kind !== "sort") put({ ...piTarget(kind, item), demo: null, ever: true });
    return undefined;
  };

  /* ── the correction: replay the working and stop ONE step before the answer (MISS HIDES THE ANSWER) ── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const seq: any[] = [];
    const rise = (from: number, to: number, stepMl: number, more: any = {}) => {
      for (let v = from + stepMl; stepMl > 0 ? v <= to + 0.1 : v >= to - 0.1; v += stepMl) seq.push([110, { ml: Math.round(v), ...more }]);
    };
    let first: any = { ml: 0, used: [] };
    if (kind === "unit") rise(0, 200, 50, { src: "cup" });
    else if (kind === "tag") { rise(0, 1000, 250, { src: "bucket" }); seq.push([300, { ml: 1500, src: "bucket" }]); }
    else if (kind === "pair") { rise(0, 200, 50, { src: "packet" }); seq.push([700, { ml: 0, src: "drum" }]); rise(0, 1000, 250, { src: "drum" }); seq.push([300, { ml: 1500, src: "drum" }]); }
    else if (kind === "count") { rise(0, 500, 50, { used: ["vessel-1"], count: 1 }); }
    else if (kind === "share") { first = { ml: 1000, used: [] }; const u: string[] = []; for (let c = 0; c < 4; c++) { u.push("cup-" + (c + 1)); rise(1000 - 200 * c, 800 - 200 * c, -50, { used: u.slice(), count: c + 1 }); } }
    else if (kind === "read") { for (let v = 20; v <= 120; v += 20) seq.push([260, { ml: v, lit: v }]); }
    else if (kind === "half" || kind === "about") rise(0, 450, 50);
    else if (kind === "glasses") { const u: string[] = []; for (let g = 0; g < 3; g++) { u.push("glass-" + (g + 1)); rise(250 * g, 250 * (g + 1), 50, { used: u.slice(), count: g + 1 }); } }
    else if (kind === "pan") { const u: string[] = []; for (let g = 0; g < 3; g++) { u.push("teacup-" + (g + 1)); rise(140 * g, 140 * (g + 1), 35, { used: u.slice(), count: g + 1 }); } }
    else if (kind === "sort") { first = { fact: true }; seq.push([1400, { fact: true, pulse: true }]); }
    /* the miss emptied the slot (the runtime); the board answer empties too: the chosen tag, every bin */
    put({ replay: true, demo: first, sel: null, ...(kind === "tag" ? { unit: null } : {}), ...(kind === "sort" ? { placed: {} } : {}) });
    tl.run([[200, () => {}], ...seq.map(([ms, d]: any) => [ms, () => put({ demo: d })])], () => put({ replay: false }));
  }, [wrong]);

  /* the win line (keyOnly: at a phase's last question the runtime shows the closing instead) */
  const saidWin = useRef("");
  useEffect(() => { if (stage === "win" && !free && item && item.win && saidWin.current !== qk) { saidWin.current = qk; api.say(item.win); } }, [stage, qk]);

  api.share({ phase: n, kind, acted: !!done, complete: stage === "idle" });

  /* ── what is drawn: the child's board, the correction's picture over it, or the act's target at the win ── */
  const V: any = win ? { ...S, ...piTarget(kind, item), demo: null } : S.demo ? { ...S, ...S.demo } : S;
  if (win && kind === "tag") V.unit = "L";
  const used = (id: string) => (V.used || []).indexOf(id) >= 0;
  const kx = box && box.key ? box.key.x - 12 : (box ? box.w : 1472);

  /* the one invite: the control the guide step names, else the next thing to act on until the act is done */
  let inviteOn: string | null = null;
  if (stage === "demo" && stepOn) inviteOn = stepOn;
  else if (asking && !done && !S.replay && !S.demo) {
    if (kind === "half") inviteOn = "mark-500";
    else if (kind === "sort") inviteOn = S.sel ? null : "pick-" + (item.objs.find((o: any) => !S.placed[o.id]) || {}).id;
    else if (kind === "pair") inviteOn = "pour-" + (S.poured.packet ? "drum" : "packet");
    else if (kind === "share") inviteOn = "fill-" + (sc.srcs.find((s: any) => !used(s.id)) || {}).id;
    else { const nx = sc.srcs.find((s: any) => !used(s.id)); inviteOn = nx ? (kind === "count" || kind === "glasses" || kind === "pan" ? "pour-" + nx.id : "pour-" + nx.id) : null; }
  }

  const motion = !reducedMotion();
  const ctlOf = (s: any) => (kind === "share" ? "fill-" + s.id : stage === "demo" && n === 2 ? "pour-" + s.id : "pour-" + s.id);

  /* a source container, standing at home or tipped over the jug while it pours */
  const drawSource = (s: any) => {
    const moving = V.moving === s.id;
    const aspect = PI_ASPECT[s.obj] || 0.7;
    const tgtJ = sc.pan ? { x: sc.pan.x + sc.pan.w / 2 + 60, y: sc.pan.yb - sc.pan.hh - 60 } : J ? { x: J.x + J.bw / 2 + 50, y: brimOf(J) - 4 } : { x: s.cx, y: s.yb - s.h };
    const ps = Math.min(1, 140 / s.h);
    const tf = moving ? piPose(tgtJ.x, tgtJ.y, -100, ps, s.h) : piPose(s.cx, s.yb - s.h, 0, 1, s.h);
    const isFull = kind === "share" ? used(s.id) : !used(s.id) && !(V.poured && V.poured[s.id] && kind !== "free") && !(kind === "read" && V.ml >= 140) && !(kind === "about" && V.ml >= 500);
    const dim = (kind === "share" ? false : !isFull) && !moving && PI_PHOTO[s.obj];
    return (
      <g key={"s" + s.id} style={{ transform: tf, transition: motion ? "transform 0.4s ease" : "none" } as any} opacity={dim ? 0.55 : 1}>
        {piObj(s.obj, s.h, isFull)}
      </g>
    );
  };

  /* the sources' tags (the Given capacity, deep blue) */
  const srcTag = (s: any) => (s.tag ? <g key={"g" + s.id}>{piTag(s.cx, s.yb + 26, piMl(s.cap, tx), PI_C.blue, "#FFFFFF", T.micro)}</g> : null);
  const srcHit = (s: any) => {
    if (s.still) return null;
    const w = Math.min(s.hw || 999, Math.max(96, s.h * (PI_ASPECT[s.obj] || 0.7) + 16)), h = Math.max(96, s.h + 16);
    const id = ctlOf(s);
    return <Hit key={"h" + s.id} id={id} x={s.cx - w / 2} y={s.yb - s.h - 8} w={w} h={h} label={tx(PI_NAME[s.obj] || s.obj)}
      onPress={tap(id, () => onSource(s))} />;
  };
  const inviteFor = (s: any) => {
    const id = ctlOf(s);
    if (inviteOn !== id) return null;
    const w = Math.min(s.hw || 999, Math.max(96, s.h * (PI_ASPECT[s.obj] || 0.7) + 16)), h = Math.max(96, s.h + 16);
    return <Invite key={"i" + s.id} x={s.cx} y={s.yb - s.h / 2} w={w} h={h} rx={16} C={C} />;
  };

  /* ── phase 4: the shelf and the three bins ── */
  if (sc.shelf) {
    const objs = sc.srcs;
    const pl = V.placed || {};
    const rowsOf = (bin: string) => Object.keys(pl).filter((id) => pl[id].bin === bin).sort((a, b) => pl[a].t - pl[b].t);
    const fact = V.fact || win;
    const dragging = drag.drag && drag.drag.moved ? drag.drag : null;
    const cellW = 640 / objs.length;
    const tagSize = objs.length > 3 ? T.micro : T.label;
    /* where each container's control is: its shelf box (never wider than its cell), or its row in a bin */
    const boxOf = (s: any) => {
      const p = pl[s.id];
      if (p) { const k = PI_BINS.findIndex((b) => b.id === p.bin); return PI_ROW(PI_BIN(k), rowsOf(p.bin).indexOf(s.id)); }
      const w = Math.min(176, cellW - 12);
      return { x: s.cx - w / 2, y: s.yb - s.h - 24, w, h: s.h + 24 };
    };
    return (
      <g>
        <rect x={10} y={396} width={650} height={12} rx={6} fill={PI_C.table} />
        {PI_BINS.map((b, k) => {
          const B = PI_BIN(k);
          return (
            <g key={"b" + b.id}>
              <rect x={B.x} y={B.y + 78} width={B.w} height={B.h - 78} rx={18} fill="#FBF6EC" stroke={PI_C.ink} strokeWidth={3} />
              <rect x={B.x} y={B.y} width={B.w} height={74} rx={16} fill={b.id === "equal" ? "#E6EEF4" : "#F2E4CE"} stroke={PI_C.ink} strokeWidth={3} />
              <text x={B.x + B.w / 2} y={B.y + 48} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PI_C.ink}>{tx(b.label)}</text>
              {win && rowsOf(b.id).length > 0 && <rect data-reveals="answer" x={B.x - 5} y={B.y - 5} width={B.w + 10} height={B.h + 10} rx={22} fill="none" stroke={PI_C.green} strokeWidth={6} />}
            </g>
          );
        })}
        {fact && <g pointerEvents="none">
          <rect x={150} y={14} width={380} height={66} rx={33} fill="#FFFFFF" stroke={PI_C.verm} strokeWidth={5} />
          <text x={330} y={58} textAnchor="end" fontSize={T.label} fontWeight={700} fill={PI_C.ink}>{tx("1 L =")}</text>
          <text x={342} y={58} textAnchor="start" fontSize={T.label} fontWeight={700} fill={PI_C.ink}>{tx("1,000 mL")}</text>
        </g>}
        {objs.map((s: any) => {
          const p = pl[s.id];
          const sel = V.sel === s.id;
          const dr = dragging && dragging.payload === s.id;
          const bx = boxOf(s);
          let tf = piPose(s.cx, s.yb - s.h - (sel ? 14 : 0), 0, 1, s.h);
          if (p) tf = piPose(bx.x + 40, bx.y + 68 - 60, 0, 60 / s.h, s.h);
          if (dr) tf = piPose(dragging.x, dragging.y - s.h * 0.4, 0, 0.8, s.h);
          return (
            <g key={"o" + s.id}>
              <g style={{ transform: tf, transition: motion && !dr ? "transform 0.35s ease" : "none" } as any}>
                {piObj(s.obj, s.h, s.obj !== "pot")}
              </g>
              {!p && !dr && piTag(s.cx, s.yb + 40, piLabel(s.obj, s.show, tx), PI_C.blue, "#FFFFFF", tagSize)}
              {p && <text x={bx.x + 84} y={bx.y + 48} fontSize={T.micro} fontWeight={700} fill={PI_C.blue}>{piLabel(s.obj, s.show, tx)}</text>}
              {sel && !p && <rect x={bx.x} y={bx.y - 14} width={bx.w} height={bx.h} rx={18} fill="none" stroke={PI_C.blue} strokeWidth={5} pointerEvents="none" />}
            </g>
          );
        })}
        {/* the controls: each container (tap or drag; Enter picks it) and each bin's plate */}
        {objs.map((s: any) => {
          const bx = boxOf(s);
          return (
            <g key={"c" + s.id} {...control("pick-" + s.id, tx(PI_NAME[s.obj] || s.obj))} {...drag.bind(s.id)} {...drag.keys(s.id)} style={{ touchAction: "none", cursor: "pointer" } as any}>
              <rect x={bx.x} y={bx.y} width={bx.w} height={bx.h} fill="transparent" />
            </g>
          );
        })}
        {PI_BINS.map((b, k) => { const B = PI_BIN(k); return <Hit key={"hb" + b.id} id={"bin-" + b.id} x={B.x} y={B.y} w={B.w} h={76} label={tx(b.label)} onPress={() => onBin(b.id)} />; })}
        {inviteOn && inviteOn.indexOf("pick-") === 0 && (() => { const s = objs.find((o: any) => "pick-" + o.id === inviteOn); if (!s) return null; const bx = boxOf(s); return <Invite x={bx.x + bx.w / 2} y={bx.y + bx.h / 2} w={bx.w} h={bx.h} rx={18} C={C} />; })()}
        {inviteOn && inviteOn.indexOf("bin-") === 0 && (() => { const k = PI_BINS.findIndex((b) => "bin-" + b.id === inviteOn), B = PI_BIN(k); return <Invite x={B.x + B.w / 2} y={B.y + 37} w={B.w} h={74} rx={16} C={C} />; })()}
      </g>
    );
  }

  /* ── phases 1 to 3, phase 4's pan and free play: the jug (or the pan) and the sources ── */
  const Jd: any = J;
  const showMarks = !!sc.marks;
  const reveal: any = kind === "about" ? { 500: true } : {};
  const labels = { ...(V.labels || {}), ...(win && kind === "about" ? { 500: true } : {}) };
  const corr = S.demo && !win ? S.demo : null;
  const srcPouring = V.pouring && sc.srcs.find((s: any) => s.id === V.pouring);
  const streamSrc = V.stream && sc.srcs.find((s: any) => s.id === V.stream);
  const answerTag = (text: string, x: number, y: number) => <g data-reveals="answer">{piTag(x, y, tx("Answer") + ": " + text, PI_C.green, "#FFFFFF", T.label)}</g>;
  const unitOf = (k: string) => tx(k);

  return (
    <g>
      <rect x={10} y={458} width={sc.full ? Math.min(box ? box.w : 1472, kx) - 20 : 880} height={10} rx={5} fill={PI_C.table} />
      {(sc.shelves || []).map((y: number) => <rect key={"sh" + y} x={sc.shelfX || 500} y={y} width={900 - (sc.shelfX || 500)} height={8} rx={4} fill={PI_C.table} />)}
      {Jd && piJug(Jd, V.ml, { tx, labels, reveal, stream: !!srcPouring, lit: corr && corr.lit ? null : undefined })}
      {sc.pan && piPan(sc.pan, V.ml, tx, !!srcPouring)}
      {/* the share: a stream from the jug's lip into the cup being filled */}
      {streamSrc && Jd && <path d={`M ${Jd.pic.x + PI_JP.lipR[0] * Jd.pic.w} ${Jd.pic.y + PI_JP.lipR[1] * Jd.pic.h} Q ${(Jd.pic.x + Jd.pic.w + streamSrc.cx) / 2} ${Jd.pic.y - 10} ${streamSrc.cx} ${streamSrc.yb - streamSrc.h - 6}`} fill="none" stroke={PI_C.water} strokeWidth={14} strokeLinecap="round" pointerEvents="none" />}
      {sc.srcs.map((s: any) => srcTag(s))}
      {sc.srcs.map((s: any) => drawSource(s))}
      {/* phase 1, the bucket: the two unit tags the answer is made on */}
      {sc.tags && sc.tags.map((t: any) => {
        const on = V.unit === t.id;
        const live = asking && !!V.poured.bucket && !S.replay;
        return (
          <g key={"t" + t.id}>
            <rect x={t.x} y={t.y} width={t.w} height={t.h} rx={22} fill={on ? "#E3EEF7" : "#FFFFFF"} stroke={on ? PI_C.blue : PI_C.ink} strokeWidth={on ? 8 : 4} />
            <text x={t.x + t.w / 2} y={t.y + t.h / 2 + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PI_C.ink}>{tx(t.id)}</text>
            <Hit id={"tag-" + t.id.toLowerCase()} x={t.x} y={t.y} w={t.w} h={t.h} label={tx(t.id)} onPress={tap("tag-" + t.id.toLowerCase(), () => onTag(t.id))} />
            {win && t.id === "L" && <rect data-reveals="answer" x={t.x - 8} y={t.y - 8} width={t.w + 16} height={t.h + 16} rx={28} fill="none" stroke={PI_C.green} strokeWidth={6} />}
          </g>
        );
      })}
      {/* the long marks are controls in phase 3 (select a mark, the jug fills to it) */}
      {showMarks && Jd && Jd.long.map((v: number) => {
        const y = Jd.yb - (v / Jd.cap) * Jd.H, id = "mark-" + v;
        return (
          <g key={"m" + v}>
            <Hit id={id} x={Jd.col - PI_PILL - 160} y={y - 36} w={piEdgeL(Jd, y) + 8 - (Jd.col - PI_PILL - 160)} h={72} label={tx(PI_LONG[v])} onPress={tap(id, () => onMark(v))} />
            {inviteOn === id && <Invite x={(Jd.col - PI_PILL - 160 + piEdgeL(Jd, y) + 8) / 2} y={y} w={piEdgeL(Jd, y) + 8 - (Jd.col - PI_PILL - 160)} h={64} rx={14} C={C} />}
          </g>
        );
      })}
      {/* the jug itself is a control in phase 1's warm-up and in free play: tap it to empty it */}
      {Jd && (kind === "warm1" || free) && <Hit id="empty" x={Jd.pic.x} y={Jd.pic.y} w={Jd.pic.w} h={Jd.pic.h} label={tx("jug")} onPress={free ? () => { if (!busy.current && SR.current.ml > 0) go(empty); } : tap("empty", () => {})} />}
      {sc.srcs.map((s: any) => srcHit(s))}
      {sc.srcs.map((s: any) => inviteFor(s))}
      {inviteOn === "empty" && Jd && <Invite x={Jd.pic.x + Jd.pic.w / 2} y={Jd.pic.y + Jd.pic.h / 2} w={Jd.pic.w} h={Jd.pic.h} rx={18} C={C} />}
      {/* the unit fact: in phase 1 once the jug has been filled to 1 L, and at the wins */}
      {n === 1 && ((kind === "warm1" && (V.poured.bottle)) || win) && <g pointerEvents="none">
        <rect x={500} y={10} width={380} height={66} rx={33} fill="#FFFFFF" stroke={PI_C.verm} strokeWidth={5} />
        <text x={680} y={54} textAnchor="end" fontSize={T.label} fontWeight={700} fill={PI_C.ink}>{tx("1 L =")}</text>
        <text x={692} y={54} textAnchor="start" fontSize={T.label} fontWeight={700} fill={PI_C.ink}>{tx("1,000 mL")}</text>
      </g>}
      {/* THE CORRECTION's own marks (never the answer): a counter of the pours replayed, the marks counted so far */}
      {corr && <g pointerEvents="none">
        {corr.count ? piTag((sc.pan ? sc.pan.x + sc.pan.w / 2 : Jd.pic.x + Jd.pic.w + 90), sc.pan ? 30 : 40, corr.count + " " + tx(kind === "count" ? (corr.count === 1 ? "vessel" : "vessels") : kind === "share" ? (corr.count === 1 ? "cup" : "cups") : kind === "glasses" ? (corr.count === 1 ? "glass" : "glasses") : (corr.count === 1 ? "teacup" : "teacups")), "#FFFFFF", PI_C.ink, T.label, PI_C.ink) : null}
        {corr.lit && Jd && Array.from({ length: corr.lit / 20 }, (_, i) => {
          const v = 20 * (i + 1), y = Jd.yb - (v / Jd.cap) * Jd.H;
          return <g key={"lit" + v}>
            <line x1={piEdgeL(Jd, y) - 34} y1={y} x2={piEdgeL(Jd, y) - 3} y2={y} stroke={PI_C.ink} strokeWidth={7} strokeLinecap="round" />
            <line x1={Jd.col - PI_PILL - 6} y1={y} x2={piEdgeL(Jd, y) - 34} y2={y} stroke={PI_C.ink} strokeWidth={2} strokeDasharray="6 6" />
            <text x={Jd.col - PI_PILL - 12} y={y + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={PI_C.ink}>{v + " " + tx("mL")}</text>
          </g>;
        })}
      </g>}
      {/* THE WIN: the answer in a green tag, only now */}
      {win && kind === "unit" && answerTag(unitOf("mL"), 700, 494)}
      {win && kind === "tag" && answerTag(unitOf("L"), 640, 494)}
      {win && kind === "pair" && answerTag(tx("juice packet") + ", " + unitOf("mL"), 640, 494)}
      {win && kind === "count" && answerTag("2 " + tx("vessels"), 690, 44)}
      {win && kind === "share" && answerTag("5 " + tx("cups"), 690, 44)}
      {win && kind === "read" && answerTag("140 " + tx("mL"), 820, 40)}
      {win && kind === "half" && answerTag("500 " + tx("mL"), 820, 40)}
      {win && kind === "about" && answerTag(tx("about half a litre"), 885, 40)}
      {win && kind === "glasses" && answerTag("4 " + tx("glasses"), 770, 44)}
      {win && kind === "pan" && answerTag("4 " + tx("teacups"), 690, 44)}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const lastR = result && result.last;
  if (!lastR) return null;
  const item = it || lastR.it || {};
  const v = lastR.value;
  /* a word is drawn only in English or once its TR line exists, so a Hindi or Gujarati thumbnail never shows a Latin word */
  const word = (s: string) => (lang === "en" || tx(s) !== s ? tx(s) : "");
  let text = "";
  if (item.choices) { const c = item.choices.find((x: any) => x.id === String(v)); text = c ? word(c.label) : ""; }
  else if (item.parts) text = (slotPartsOf(v, 1)[0] + " " + word(item.parts[0].unit)).trim();
  else if (item.kind === "tag") text = word(String(v));
  else if (item.kind === "sort") text = word("sorted");
  else text = String(v);
  const lvl = item.kind === "read" ? 0.7 : item.kind === "half" || item.kind === "about" ? 0.5 : item.kind === "unit" ? 0.2 : 1;
  const jx = 18, jw = 46, jt = 12, jb = h - 12;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
      <rect x={jx} y={jb - (jb - jt) * lvl} width={jw} height={(jb - jt) * lvl} fill={PI_C.water} />
      <path d={`M ${jx} ${jt} L ${jx} ${jb} L ${jx + jw} ${jb} L ${jx + jw} ${jt}`} fill="none" stroke={PI_C.glassE} strokeWidth={3} />
      <text x={(w + jx + jw) / 2} y={h / 2 + 11} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{text}</text>
    </g>
  );
}

function PourIt(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16) */
      keyOnly: true,
      /* the wide keypad (PATTERNS.md 9g): every typed screen is drawn inside x 0 to 900 */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d) */
      navDots: true,
      /* the start page */
      StartArt, START_HOOK,
      }} />
  );
}

export default PourIt;
