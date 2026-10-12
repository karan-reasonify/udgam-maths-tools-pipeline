/* ═══ M2.S3.T5.C16.2D1 · measure_comparer · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "measure_comparer";
const MEDIA_ID = "M2.S3.T5.C16.2D1";
const TOOL_NAME = "Same-Unit Comparer";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Some measure cards, each written its own way."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You put every measure in one unit before you compared.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Lay out any cards and stand them up side by side.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = { hi: {}, gu: {} };

/* the sign slot's three keys (phases 1 and 2): the child sets the sign between the two bars */
const MC_SIGNS = [{ id: "lt", label: "<" }, { id: "gt", label: ">" }, { id: "eq", label: "=" }];

/* One entry per phase = one mount. Every measure card is written as the plan writes it (Indian commas).
   kind  sign  two cards, the sign between them (choices)
         pick  a mixed card and three options, which one equals it (choices)
         diff  two cards, Same unit then Take away, the difference typed in a one-box slot with its unit
         order four cards dragged along the shelf, then Enter (pad "enter")
         mean  what descending order means (choices), the four bars of question 1 standing
   near  the item's misconception (judge must reject it) */
const PHASES = [
  {
    n: 1,
    concept: "Same unit first",
    conceptId: "M2.S3.T5.C16", objectiveIds: ["O7"],
    says: ["Same unit first. Which bar stands taller?", "Press Same unit to stand each card up as a bar."],
    /* tries, as the plan writes it: First rung: rewrite only the mixed card in the smaller unit. Second rung: compare two numbers now in one unit. Third rung: the same task on two lengths, before the question's own weights return. (rung 3 is a stage direction in the plan; spoken here as a hint) */
    ladder: ["Compare two numbers now in one unit.", "Read the numbers under the bars. The bigger number is the bigger measure."],
    closing: "Write both measures in the same unit, then compare the numbers.",
    learned: "You learned: put both measures in one unit, then compare the numbers",
    traceback: "Same unit stands both bars; the mixed card's bar grows from its big unit by its small part, lit amber, with the working written above; the right sign drops into the sign slot and the heavier card turns green.",
    items: [
      /* learn CM1: answer in the plan = 3150 g. (3 kg 90 g = 3,090 g < 3,150 g) */
      { qid: "M2.S3.T5.C16:CM1", kind: "sign", cards: ["3 kg 90 g", "3,150 g"], choices: MC_SIGNS, answer: "lt", near: "gt",
        say: "Which is heavier, 3 kg 90 g or 3,150 g? Pick the sign that goes between them.", ask: "Which sign goes between?",
        miss: "Rewrite only the mixed card in the smaller unit." },
      /* practice 1: answer in the plan = 330 cm, because 3 m 20 cm is 320 cm (cards swapped so the sign is not always <) */
      { qid: "M2.S3.T5.C16:1", kind: "sign", cards: ["330 cm", "3 m 20 cm"], choices: MC_SIGNS, answer: "gt", near: "lt",
        say: "Which is longer, 330 cm or 3 m 20 cm?", ask: "Pick the sign.",
        miss: "How many centimetres make 3 m? Then add the 20 cm." },
      /* practice 5: answer in the plan = 4 kg 60 g, because it is 4060 g */
      { qid: "M2.S3.T5.C16:5", kind: "sign", cards: ["4 kg 60 g", "4,600 g"], choices: MC_SIGNS, answer: "lt", near: "eq",
        say: "Which is lighter, 4 kg 60 g or 4,600 g?", ask: "Which sign fits?",
        miss: "Look again at 4 kg 60 g. Is that 60 grams or 600 grams?" },
    ],
  },
  {
    n: 2,
    concept: "Equal measures",
    conceptId: "M2.S3.T5.C17", objectiveIds: ["O7"],
    says: ["Same unit. Are they level?"],
    /* tries, as the plan writes it: First rung: rewrite the mixed card in centimetres. Second rung: compare it with the other card. Third rung: the same task with a whole number of metres, before the question's own cards return. (rung 3 spoken as a hint) */
    ladder: ["Compare it with the other card.", "Line up both numbers digit by digit, in one unit."],
    closing: "Two measures in different forms are equal when they are the same in the same unit.",
    learned: "You learned: measures are equal when they match in the same unit",
    traceback: "Same unit stands the bars; the mixed card's bar grows by its small part with the working written above (the place-holding zero grey); the bars stand level, a level line joins their tops and the equals sign drops in; for the three options, the chosen card is lit amber beside the level line and the matching card turns green.",
    items: [
      /* learn CM2: answer in the plan = Yes. They are the same length. (6 m 5 cm = 605 cm) */
      { qid: "M2.S3.T5.C17:CM2", kind: "sign", cards: ["6 m 5 cm", "605 cm"], choices: MC_SIGNS, answer: "eq", near: "lt",
        say: "Is 6 m 5 cm the same length as 605 cm? Choose the sign that fits.", ask: "Which sign goes between?",
        miss: "Rewrite the mixed card in centimetres." },
      /* practice 2: answer in the plan = Yes. 5 L 300 mL is 5300 mL */
      { qid: "M2.S3.T5.C17:2", kind: "sign", cards: ["5 L 300 mL", "5,300 mL"], choices: MC_SIGNS, answer: "eq", near: "gt",
        say: "Do 5 L 300 mL and 5,300 mL hold the same amount?", ask: "Pick the sign.",
        miss: "Write 5 L in millilitres, then put the 300 mL with it." },
      /* practice 6: answer in the plan = 3050 m */
      { qid: "M2.S3.T5.C17:6", kind: "pick", cards: ["3 km 50 m", "3,500 m", "3,050 m", "3,005 m"],
        choices: [{ id: "m3500", label: "3,500 m" }, { id: "m3050", label: "3,050 m" }, { id: "m3005", label: "3,005 m" }], answer: "m3050", near: "m3500",
        say: "Which is the same length as 3 km 50 m? 3,500 m, 3,050 m or 3,005 m?", ask: "Which card is the same?",
        miss: "Write 3 km in metres. Which place do the 50 m take?" },
    ],
  },
  {
    n: 3,
    concept: "By how much",
    conceptId: "M2.S3.T5.C18", objectiveIds: ["O8"],
    says: ["Lay the shorter one over. How much sticks out?", "Press Same unit, then Take away, then type the difference."],
    /* tries, as the plan writes it: First rung: put both cards in millilitres. Second rung: lay the shorter bar over the longer and read what sticks out. Third rung: the same task on two capacities in whole litres, before the question's own cards return. (rung 3 spoken as a hint) */
    ladder: ["Lay the shorter bar over the longer and read what sticks out.", "Take the smaller number from the larger, then read the unit."],
    closing: "To find by how much, take the smaller from the larger in the same unit.",
    learned: "You learned: in one unit, take the smaller from the larger",
    traceback: "Same unit stands both bars, Take away slides the shorter one over the longer (rose, Taken away), and the part that sticks out is labelled with the difference and its unit, with the subtraction written above.",
    items: [
      /* learn CM3: answer in the plan = The pot holds 165 mL more. */
      { qid: "M2.S3.T5.C18:CM3", kind: "diff", cards: ["2 L 640 mL", "2,475 mL"], things: ["pot", "kettle"],
        parts: [{ label: "difference", unit: "mL" }], answer: [165], near: "235",
        say: "A pot holds 2 L 640 mL and a kettle holds 2,475 mL. Which holds more, and by how much?", ask: "How much more?",
        miss: "Put both cards in millilitres." },
      /* practice 4: answer in the plan = 21 cm longer, because 1 m 85 cm is 185 cm and 185 - 164 = 21 */
      { qid: "M2.S3.T5.C18:4", kind: "diff", cards: ["1 m 85 cm", "164 cm"], things: ["green ribbon", "red ribbon"],
        parts: [{ label: "difference", unit: "cm" }], answer: [21], near: "121",
        say: "A green ribbon is 1 m 85 cm long. A red ribbon is 164 cm long. How much longer is the green ribbon?", ask: "How much longer?",
        miss: "164 cm already holds a metre. Write 1 m 85 cm in centimetres too." },
      /* practice 7: answer in the plan = The flour, by 145 g, because 5125 - 4980 = 145 */
      { qid: "M2.S3.T5.C18:7", kind: "diff", cards: ["5 kg 125 g", "4 kg 980 g"], things: ["flour", "lentils"],
        parts: [{ label: "difference", unit: "g" }], answer: [145], near: "855",
        say: "A sack of flour weighs 5 kg 125 g. A sack of lentils weighs 4 kg 980 g. Which is heavier, and by how much?", ask: "How much heavier?",
        miss: "The kilograms count too. Write both sacks in grams first." },
    ],
  },
  {
    n: 4,
    concept: "Putting measures in order",
    conceptId: "M2.S3.T5.C19", objectiveIds: ["O8"],
    says: ["Same unit first. Now smallest to largest.", "Drag a bar along the shelf to move it, then press Enter."],
    /* tries, as the plan writes it: First rung: order just two of the cards. Second rung: add a third. Third rung: the same task with all four already in grams, before the question's own cards return. (rungs 2 and 3 spoken as hints) */
    ladder: ["Compare two bars at a time, in one unit.", "Ascending climbs up the steps. Descending comes down them."],
    closing: "Put every measure in the same unit, then order them from smallest to largest or the other way.",
    learned: "You learned: in one unit, order from smallest up or from largest down",
    traceback: "Same unit stands the bars where the child left them; the bars out of step are lit amber, the direction is written above the shelf with its arrow, and the whole right order is written in one unit with its signs.",
    items: [
      /* learn CM4: answer in the plan = 1 kg 4 g, 1040 g, 1 kg 400 g, 1410 g. (answer = the bars' same measures, left to right) */
      { qid: "M2.S3.T5.C19:CM4", kind: "order", dir: "up", cards: ["1 kg 400 g", "1,040 g", "1 kg 4 g", "1,410 g"], pad: "enter",
        answer: "1004,1040,1400,1410", near: "1040,1400,1410,1004",
        say: "Put these weights in ascending order. 1 kg 400 g, 1,040 g, 1 kg 4 g and 1,410 g.", ask: "Ascending order.",
        miss: "Order just two of the cards first." },
      /* practice 3: answer in the plan = From largest to smallest */
      { qid: "M2.S3.T5.C19:3", kind: "mean", cards: ["1 kg 400 g", "1,040 g", "1 kg 4 g", "1,410 g"],
        choices: [{ id: "up", label: "smallest first" }, { id: "down", label: "largest first" }], answer: "down", near: "up",
        say: "What does descending order mean?", ask: "Descending means?",
        miss: "Descending is the other way round from ascending." },
      /* practice 8: answer in the plan = 3705 mL, 3570 mL, 3 L 75 mL, 3 L 7 mL */
      { qid: "M2.S3.T5.C19:8", kind: "order", dir: "down", cards: ["3 L 75 mL", "3,570 mL", "3 L 7 mL", "3,705 mL"], pad: "enter",
        answer: "3705,3570,3075,3007", near: "3075,3705,3007,3570",
        say: "Put these in descending order. 3 L 75 mL, 3,570 mL, 3 L 7 mL and 3,705 mL.", ask: "Descending order.",
        miss: "Is 3 L 7 mL the same as 3,700 mL? Look at the zeros." },
    ],
  },
];

/* ── the measures ─────────────────────────────────────────────────────────────────────────
   A card is "3 kg 90 g" (a mixed measure) or "3,150 g". The pair of units comes from the mixed card,
   and Same unit writes every card in the smaller one. Each bar is drawn to one scale above a common
   cut (the white zigzag): the cut stands for the round hundreds every card shares, so two close
   measures still stand plainly apart. */
const MC_PAIR: any = { kg: { to: "g", f: 1000 }, L: { to: "mL", f: 1000 }, m: { to: "cm", f: 100 }, km: { to: "m", f: 1000 } };
const MC_Y0 = 424, MC_MAXH = 206, MC_STUB = 36, MC_AREA = 820;
const MC_CARD_Y = 6, MC_CARD_H = 96, MC_LAB_Y = 470, MC_CAP1 = 146, MC_CAP2 = 192;
const MC_BTN = { x: 852, w: 228, h: 92, same: 8, fact: 116, take: 224 };
const MC_SIGN_OF: any = { lt: "<", gt: ">", eq: "=" };
/* what the slot shows for a choice (the slot shows the chosen label, never an id); an order shows nothing */
const MC_SHOW: any = { lt: "<", gt: ">", eq: "=", m3500: "3,500 m", m3050: "3,050 m", m3005: "3,005 m", up: "smallest first", down: "largest first" };
/* Free play: four cards a set, "New cards" lays out the next set */
const MC_FREE = [
  ["2 kg 50 g", "2,500 g", "2 kg 5 g", "2,055 g"],
  ["4 m 7 cm", "470 cm", "4 m 70 cm", "407 cm"],
  ["1 L 250 mL", "1,025 mL", "1 L 520 mL", "1,205 mL"],
  ["2 km 300 m", "2,030 m", "2 km 3 m", "2,330 m"],
];

const mcNum = (x: any) => Number(String(x).replace(/,/g, ""));
function mcCard(text: string) {
  const t = String(text).split(" ");
  return t.length === 4 ? { text, mixed: true, big: mcNum(t[0]), bu: t[1], small: mcNum(t[2]), su: t[3] }
    : { text, mixed: false, v: mcNum(t[0]), su: t[1] };
}
/* everything the picture needs for one set of cards: values in the smaller unit and the bar scale */
function mcSet(cards: string[]) {
  const raw: any[] = (cards || []).map(mcCard);
  const m = raw.find((c: any) => c.mixed);
  if (!m) return { cs: [], u: { big: "", small: "", f: 1 }, fact: "", base: 0, h: () => 0 };
  const p = MC_PAIR[m.bu], u = { big: m.bu, small: p.to, f: p.f };
  const cs = raw.map((c: any) => ({ ...c, val: c.mixed ? c.big * u.f + c.small : c.v, bigPart: c.mixed ? c.big * u.f : 0 }));
  const lo = Math.min(...cs.map((c: any) => c.val)), hi = Math.max(...cs.map((c: any) => c.val));
  const base = Math.floor(lo / 100) * 100;
  const k = hi > base ? (MC_MAXH - MC_STUB) / (hi - base) : 0;
  const h = (v: number) => (hi > base ? MC_STUB + Math.max(0, v - base) * k : MC_MAXH);
  return { cs, u, base, h, fact: "1 " + u.big + " = " + indian(u.f) + " " + u.small };
}
const mcSame = (set: any, ci: number) => indian(set.cs[ci].val) + " " + set.u.small;
/* the order an order item wants (card indexes), ascending or descending by the same measure */
function mcRight(set: any, dir: string) {
  const ids = set.cs.map((_: any, i: number) => i);
  return ids.sort((a: number, b: number) => (dir === "down" ? set.cs[b].val - set.cs[a].val : set.cs[a].val - set.cs[b].val));
}
function mcFresh(it: any, k: string) {
  const set = mcSet(it.cards || []);
  const ids = set.cs.map((_: any, i: number) => i);
  return { k, set, order: it.kind === "mean" ? mcRight(set, "up") : ids, same: it.kind === "mean", took: false,
    f: {}, v: {}, refuse: false, judged: null, ball: -1 };
}
/* a rough ink width (Poppins semibold), so a row of separate labels never runs into itself */
const MC_WIDE: any = { m: 0.92, w: 0.86, M: 0.95, W: 1, ",": 0.27, ".": 0.27, " ": 0.28, i: 0.28, l: 0.28, t: 0.4, f: 0.38, r: 0.42, L: 0.56 };
const mcWidth = (str: string, size: number) => String(str).split("").reduce((a, ch) => a + (MC_WIDE[ch] ?? 0.62), 0) * size;

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (a sign, an option, a difference, an order) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  return String(v ?? "").trim() === String(item.answer);
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   the card text is read again with its own unit table (everything to cm, g or mL) */
const ORC_UNIT: any = { km: 100000, m: 100, cm: 1, kg: 1000, g: 1, L: 1000, mL: 1 };
const orcValue = (text: string) => {
  let total = 0, m: any;
  const re = /([\d,]+)\s*(km|kg|mL|cm|m|g|L)(?![A-Za-z])/g;
  while ((m = re.exec(text))) total += Number(m[1].split(",").join("")) * ORC_UNIT[m[2]];
  return total;
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const vals = (it.cards || []).map(orcValue);
  if (it.kind === "sign") return it.answer === (vals[0] < vals[1] ? "lt" : vals[0] > vals[1] ? "gt" : "eq");
  if (it.kind === "pick") {
    const j = vals.findIndex((x: number, i: number) => i > 0 && x === vals[0]);
    return j > 0 && it.choices[j - 1].id === it.answer && it.choices[j - 1].label === it.cards[j];
  }
  if (it.kind === "diff") return Array.isArray(it.answer) && it.answer[0] === Math.abs(vals[0] - vals[1]) / ORC_UNIT[it.parts[0].unit];
  if (it.kind === "order") {
    const one = it.cards.find((t: string) => t.trim().split(/\s+/).length === 2).trim().split(/\s+/)[1];
    const sorted = vals.slice().sort((a: number, b: number) => (it.dir === "down" ? b - a : a - b));
    return it.answer === sorted.map((x: number) => x / ORC_UNIT[one]).join(",");
  }
  if (it.kind === "mean") return /^largest/.test(it.choices.find((c: any) => c.id === it.answer).label);
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.kind === "diff" ? [String(item.answer[0]), words(item.answer[0])]
  : item.kind === "sign" ? [MC_SIGN_OF[item.answer]]
  : item.kind === "mean" ? ["largest first", "largest to smallest"]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the slot shows a choice by its label, and an order (made on the shelf) as nothing */
const mcFormat = (v: any) => {
  const s = String(v ?? "");
  if (MC_SHOW[s] !== undefined) return MC_SHOW[s];
  if (/^\d+(,\d+){3}$/.test(s)) return "";
  return s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* the line said when a question is won (each its own; a literal per question so it can be baked) */
function mcWinSay(api: any, q: string) {
  if (q === "M2.S3.T5.C16:CM1") api.say("3,090 g is less than 3,150 g, so 3,150 g is heavier.");
  else if (q === "M2.S3.T5.C16:1") api.say("330 cm is greater than 320 cm. It is longer.");
  else if (q === "M2.S3.T5.C16:5") api.say("4,060 g is less than 4,600 g. 4 kg 60 g is lighter.");
  else if (q === "M2.S3.T5.C17:CM2") api.say("6 m 5 cm is 605 cm, the same length.");
  else if (q === "M2.S3.T5.C17:2") api.say("5 L 300 mL is 5,300 mL. They hold the same.");
  else if (q === "M2.S3.T5.C17:6") api.say("3 km 50 m is 3,050 m. The zero holds a place.");
  else if (q === "M2.S3.T5.C18:CM3") api.say("The pot holds 165 mL more.");
  else if (q === "M2.S3.T5.C18:4") api.say("The green ribbon is 21 cm longer.");
  else if (q === "M2.S3.T5.C18:7") api.say("The flour is 145 g heavier.");
  else if (q === "M2.S3.T5.C19:CM4") api.say("1 kg 4 g is the lightest. The bars rise like steps.");
  else if (q === "M2.S3.T5.C19:3") api.say("Descending goes from largest to smallest.");
  else if (q === "M2.S3.T5.C19:8") api.say("3,705 mL holds the most. The steps go down.");
}

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  units: MC_PAIR,
  bars: { baseline: MC_Y0, tallest: MC_MAXH, cut: MC_STUB, note: "every bar of a question is drawn to one scale above a common cut at the round hundreds below the smallest measure" },
  free: MC_FREE,
};

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const rm = reducedMotion();
  const [, bump] = useState(0);
  const [fset, setFset] = useState(0);
  const free = stage === "free";
  const it: any = free ? { kind: "free", cards: MC_FREE[fset % MC_FREE.length] } : item || { kind: "none", cards: [] };
  const kind = it.kind;
  const key = free ? "free:" + fset : n + ":" + index;
  const S = useRef<any>({ k: "" });
  if (S.current.k !== key) S.current = mcFresh(it, key);
  const s = S.current, set = s.set, N = set.cs.length, pitch = N ? MC_AREA / N : MC_AREA;
  const put = (o: any) => { if (S.current.k !== key) return; Object.assign(S.current, o); bump((x: number) => x + 1); };
  const view = (o: any) => put({ v: { ...(S.current.v || {}), ...o } });
  /* the running count: measures put in one unit, this phase (never a score) */
  const CNT = useRef<any>({ k: "", c: 0 });
  const ck = free ? "free" : "p" + n;
  if (CNT.current.k !== ck) CNT.current = { k: ck, c: 0 };

  const won = !free && (stage === "win" || stage === "idle");
  const live = (stage === "ask" || stage === "teach" || free) && !tl.busy;
  const isOrder = kind === "order" || kind === "free";
  const v = s.v || {};
  const up = s.same || won;
  const took = kind === "diff" && (s.took || won);

  /* colours: the chapter's content colours; numerals and words in their deeper ink */
  const BLUE = CONTENT.hundred, GREEN = CONTENT.one, VIOLET = CONTENT.bead, AMBER = CONTENT.ten;
  const blueInk = shade(BLUE, 0.25), greenInk = shade(GREEN, 0.25), violetInk = shade(VIOLET, 0.3), amberInk = shade(AMBER, 0.45);
  const roseFill = tint(VIOLET, 0.3), roseInk = shade(VIOLET, 0.35), GREY = "#767676";

  const right = isOrder && kind !== "free" ? mcRight(set, it.dir) : [];
  const desc = kind === "mean" ? mcRight(set, "down") : [];
  const bigger = kind === "sign" ? (it.answer === "lt" ? [1] : it.answer === "gt" ? [0] : [0, 1]) : [];
  const pickRight = kind === "pick" ? it.choices.findIndex((c: any) => c.id === it.answer) + 1 : -1;
  const mixedAt = set.cs.findIndex((c: any) => c.mixed);
  /* the shorter and the longer card of a "by how much" question */
  const lo = kind === "diff" ? (set.cs[0].val < set.cs[1].val ? 0 : 1) : -1, hi = kind === "diff" ? 1 - lo : -1;

  const doSame = () => {
    if (!live || S.current.same) return;
    CNT.current.c += N;
    put({ same: true, refuse: false, v: {} });
    api.sfx.tick();
  };
  const doTake = () => {
    if (!live || S.current.took) return;
    if (!S.current.same) { put({ refuse: true }); if (stage === "ask") api.say("Same unit first, then take away."); return; }
    put({ took: true, refuse: false });
    api.sfx.tick();
  };
  const doNew = () => { if (!free) return; setFset((x: number) => x + 1); };

  /* the shelf: a bar dropped along it takes the place it lands on; a tap (or Space) moves it one place on */
  const DS = useRef<any>(null);
  const dr = useDrag((ci: any, at: any, moved: boolean) => {
    const S0 = S.current;
    if (S0.k !== key || !isOrder || !live) return;
    const ord = S0.order.slice(), from = ord.indexOf(ci);
    if (from < 0) return;
    let to: number;
    if (!moved || !isFinite(at.x)) to = (from + 1) % ord.length;
    else {
      const start = DS.current && DS.current.id === ci ? DS.current.x : at.x;
      to = Math.max(0, Math.min(ord.length - 1, Math.floor((pitch * (from + 0.5) + at.x - start) / pitch)));
    }
    if (to !== from) { ord.splice(from, 1); ord.splice(to, 0, ci); }
    put({ order: ord, v: { ...(S0.v || {}), lit: null } });
    api.sfx.tick();
  });
  const dg = dr.drag;
  if (!dg) DS.current = null;
  else if (!DS.current || DS.current.id !== dg.payload) DS.current = { id: dg.payload, x: dg.x };
  const moveBy = (ci: number, d: number) => {
    const S0 = S.current;
    if (S0.k !== key || !isOrder || !live) return;
    const ord = S0.order.slice(), from = ord.indexOf(ci), to = Math.max(0, Math.min(ord.length - 1, from + d));
    if (to === from) return;
    ord.splice(from, 1); ord.splice(to, 0, ci);
    put({ order: ord, v: { ...(S0.v || {}), lit: null } });
    api.sfx.tick();
  };

  /* the order on the shelf now: the child's, the drag's preview, or (won) the right one */
  let shown: number[] = set.cs.map((_: any, i: number) => i);
  let ghost: any = null;
  if (kind === "mean") shown = won ? desc : v.order || s.order;
  else if (isOrder) {
    shown = won ? right : s.order;
    if (dg && dg.moved && !won) {
      const from = s.order.indexOf(dg.payload), start = DS.current ? DS.current.x : dg.x;
      const gx = Math.max(pitch * 0.5 - 40, Math.min(MC_AREA - pitch * 0.5 + 40, pitch * (from + 0.5) + dg.x - start));
      const to = Math.max(0, Math.min(N - 1, Math.floor(gx / pitch)));
      shown = s.order.filter((c: number) => c !== dg.payload);
      shown.splice(to, 0, dg.payload);
      ghost = { ci: dg.payload, x: gx };
    }
  }
  const xAt = (ci: number) => pitch * (shown.indexOf(ci) + 0.5);

  /* Enter answers an order with what stands on the shelf; an order already judged is never sent again */
  const enterFn = () => {
    const S0 = S.current;
    if (S0.k !== key || tl.busy) return;
    const val = S0.order.map((ci: number) => S0.set.cs[ci].val).join(",");
    if (val === S0.judged) return;
    S0.judged = val;
    api.submit(val);
  };
  api.onEnter(kind === "order" && stage === "ask" ? enterFn : null);
  /* the agent sets the order as a child would (toolApi.answer), then Enter answers it */
  HOOK.set = (val: any) => {
    const S0 = S.current;
    if (S0.k !== key || kind !== "order") return false;
    const nums = (Array.isArray(val) ? val : String(val).split(/[|\s]*,[|\s]*|\|/)).map(mcNum);
    const ord = nums.map((x: number) => S0.set.cs.findIndex((c: any) => c.val === x));
    if (ord.length !== S0.set.cs.length || ord.some((i: number) => i < 0) || new Set(ord).size !== ord.length) return false;
    put({ order: ord });
    return true;
  };

  /* the working written out for a mixed card: 3 kg 90 g = 3,000 g + 90 g = 3,090 g (the small part amber) */
  const conv = (ci: number) => {
    const c = set.cs[ci], u = set.u.small;
    return [{ t: c.text, ink: blueInk }, { t: "=" }, { t: indian(c.bigPart) + " " + u }, { t: "+" },
      { t: indian(c.small) + " " + u, ink: amberInk }, { t: "=" }, { t: mcSame(set, ci), ink: greenInk, z: true }];
  };
  const orderRow = (ord: number[], sign: string) => {
    const out: any[] = [];
    ord.forEach((ci: number, j: number) => { if (j) out.push({ t: sign }); out.push({ t: mcSame(set, ci), z: true }); });
    return out;
  };
  const diffRow = () => {
    const u = set.u.small;
    return [{ t: mcSame(set, hi) }, { t: "−" }, { t: mcSame(set, lo) }, { t: "=" }, { t: indian(set.cs[hi].val - set.cs[lo].val) + " " + u, ink: greenInk }];
  };

  /* the traceback: redraw the maths in steps and end on the whole right answer, nothing marked */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const steps: any[] = [];
    const stand = () => { if (!S.current.same) CNT.current.c += N; put({ same: true }); };
    put({ v: { ring: !S.current.same } });
    if (kind === "sign") {
      const hm = set.h(set.cs[mixedAt].val), fpart = Math.min(1, Math.max(MC_STUB, set.h(set.cs[mixedAt].bigPart)) / hm);
      steps.push([200, () => view({ sign0: wrong.value })]);
      steps.push([900, () => { stand(); put({ f: { [mixedAt]: fpart } }); }]);
      steps.push([1100, () => { put({ f: {} }); view({ ring: false, amb: [mixedAt], cap1: conv(mixedAt) }); }]);
      steps.push([700, () => view({ sign: it.answer, green: bigger, level: it.answer === "eq" })]);
    } else if (kind === "pick") {
      const chosen = it.choices.findIndex((c: any) => c.id === wrong.value) + 1;
      steps.push([900, () => stand()]);
      steps.push([1000, () => view({ ring: false, amb: chosen > 0 ? [chosen] : [], level: true })]);
      steps.push([900, () => view({ amb: [], green: [pickRight], target: true, cap1: conv(0) })]);
    } else if (kind === "diff") {
      steps.push([900, () => stand()]);
      steps.push([1000, () => { put({ took: true }); view({ ring: false }); }]);
      steps.push([900, () => view({ reveal: true, cap1: diffRow() })]);
    } else if (kind === "order") {
      const now = S.current.order;
      const off = now.filter((ci: number, j: number) => right[j] !== ci);
      steps.push([900, () => stand()]);
      steps.push([900, () => view({ ring: false, lit: off })]);
      steps.push([800, () => view({ dir: it.dir })]);
      steps.push([800, () => view({ cap2: orderRow(right, it.dir === "down" ? ">" : "<") })]);
    } else if (kind === "mean") {
      steps.push([700, () => view({ dir: "down" })]);
      steps.push([900, () => view({ order: desc, words: true })]);
    }
    api.lock(true);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* a win: the bars stand (if they were not up), the answer drops into place, and its line is said */
  useEffect(() => {
    if (stage !== "win" || free) return;
    mcWinSay(api, it.qid);
    if (!S.current.same) CNT.current.c += N;
    const base: any = { ring: false, amb: [], lit: null };
    if (kind === "sign") put({ same: true, f: {}, v: { ...base, sign: it.answer, green: bigger, level: it.answer === "eq" } });
    else if (kind === "pick") put({ same: true, v: { ...base, green: [pickRight], level: true, target: true, cap1: conv(0) } });
    else if (kind === "diff") put({ same: true, took: true, v: { ...base, reveal: true, cap1: diffRow() } });
    else if (kind === "mean") put({ v: { ...base, dir: "down", order: desc, words: true } });
    else if (kind === "order") {
      put({ same: true, v: { ...base, signs: true, cardsGreen: true } });
      tl.run([[350, () => put({ ball: 0 })], [300, () => put({ ball: 1 })], [300, () => put({ ball: 2 })], [300, () => put({ ball: 3 })]]);
    }
  }, [stage, key]);
  useEffect(() => { tl.stop(); }, [key]);

  /* what the host and the agent read back (toolApi.getState); nothing here answers before it is given */
  const hideTarget = kind === "pick" && !(won || v.target);
  api.share({
    q: it.qid || null,
    cards: set.cs.map((c: any) => c.text),
    same_unit: up,
    same: up ? set.cs.map((_: any, ci: number) => (hideTarget && ci === 0 ? null : mcSame(set, ci))) : null,
    sign: kind === "sign" ? (won ? it.answer : wrong ? wrong.value : null) : null,
    difference: kind === "diff" ? (won ? it.answer[0] : typed || null) : null,
    order: isOrder ? shown.map((ci: number) => set.cs[ci].text) : null,
    answer: won ? it.answer : null,
    count: CNT.current.c,
  });

  /* ── drawing helpers (called, never mounted) ── */
  const cardW = N > 2 ? 188 : 280, cardSize = N > 2 ? T.label : T.prompt, bw = N > 2 ? 100 : 120;
  const trans = rm ? "none" : "transform 650ms ease-out";
  /* a number with the zeros that hold a place open drawn grey (1,004 g, 3,050 m) */
  const zeroInk = (txt: string, ink: string) => {
    const [num, ...rest] = String(txt).split(" ");
    const digs = num.replace(/,/g, "");
    let di = -1;
    return [
      ...num.split("").map((ch: string, j: number) => {
        if (ch !== ",") di++;
        const inside = ch === "0" && /[1-9]/.test(digs.slice(0, di)) && /[1-9]/.test(digs.slice(di + 1));
        return <tspan key={j} fill={inside ? GREY : ink}>{ch}</tspan>;
      }),
      rest.length ? <tspan key="u" fill={ink}>{" " + rest.join(" ")}</tspan> : null,
    ];
  };
  /* a row of separate labels, centred on cx (each its own text, so none reads as a sentence) */
  const row = (toks: any[], cx: number, y: number, size: number) => {
    const gap = 14, ws = toks.map((o: any) => mcWidth(o.t, size));
    let x = cx - (ws.reduce((a: number, b: number) => a + b, 0) + gap * (toks.length - 1)) / 2;
    return toks.map((o: any, j: number) => {
      const x0 = x; x += ws[j] + gap;
      return <text key={j} x={x0} y={y} fontSize={size} fontWeight={700} fill={o.ink || C.ink}>{o.z ? zeroInk(o.t, o.ink || C.ink) : o.t}</text>;
    });
  };
  const zig = (y: number, w: number) => {
    let d = `M ${-w / 2} ${y}`;
    for (let j = 1; j <= 6; j++) d += ` L ${-w / 2 + (w * j) / 6} ${y + (j % 2 ? -7 : 7)}`;
    return d;
  };
  const barShape = (ci: number, f: number, paint: string, edge: string) => {
    const h = set.h(set.cs[ci].val);
    return (
      <g style={{ transform: `scaleY(${f})`, transformBox: "fill-box", transformOrigin: "50% 100%", transition: trans } as any}>
        <rect x={-bw / 2} y={MC_Y0 - h} width={bw} height={h} rx={10} fill={paint} stroke={edge} strokeWidth={2} />
        <path d={zig(MC_Y0 - MC_STUB / 2, bw)} fill="none" stroke="#FFFFFF" strokeWidth={5} strokeLinejoin="round" />
      </g>
    );
  };
  const cardShape = (ci: number) => {
    const c = set.cs[ci];
    const isGreen = (v.green || []).includes(ci) || (won && v.cardsGreen);
    const isAmber = (v.amb || []).includes(ci) || (s.refuse && !s.same) || (v.lit || []).includes(ci);
    const thing = it.things ? it.things[ci] : null;
    return (
      <g>
        <rect x={-cardW / 2} y={MC_CARD_Y} width={cardW} height={MC_CARD_H} rx={18}
          fill={isGreen ? tint(GREEN, 0.82) : tint(BLUE, 0.88)} stroke={isAmber ? AMBER : isGreen ? GREEN : BLUE} strokeWidth={isAmber ? 6 : 3} />
        {thing && <text x={0} y={MC_CARD_Y + 32} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={blueInk}>{tx(thing)}</text>}
        <text x={0} y={thing ? MC_CARD_Y + 82 : MC_CARD_Y + MC_CARD_H / 2 + cardSize * 0.36} textAnchor="middle"
          fontSize={cardSize} fontWeight={700} fill={isGreen ? greenInk : blueInk}>{c.text}</text>
      </g>
    );
  };
  const labelShape = (ci: number) => {
    if (!up || (hideTarget && ci === 0)) return null;
    return <text x={0} y={MC_LAB_Y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={greenInk}>{zeroInk(mcSame(set, ci), greenInk)}</text>;
  };
  /* one card with its bar and its same measure; on the shelf it is the piece the child drags */
  const column = (ci: number) => {
    const cx = xAt(ci);
    const f = up ? (s.f[ci] ?? 1) : 0;
    const lifted = ghost && ghost.ci === ci;
    const overlay = kind === "diff" && ci === lo;
    const body = (
      <g>
        {cardShape(ci)}
        {!overlay && !lifted && barShape(ci, f, "url(#gOne)", shade(GREEN, 0.2))}
        {overlay && took && <rect x={-bw / 2} y={MC_Y0 - set.h(set.cs[ci].val)} width={bw} height={set.h(set.cs[ci].val)} rx={10}
          fill="none" stroke={C.dim} strokeWidth={3} strokeDasharray="10 8" />}
        {lifted && <rect x={-bw / 2} y={MC_Y0 - set.h(set.cs[ci].val) * f} width={bw} height={set.h(set.cs[ci].val) * f} rx={10}
          fill="none" stroke={AMBER} strokeWidth={3} strokeDasharray="10 8" />}
        {!lifted && labelShape(ci)}
      </g>
    );
    const style = { transform: `translateX(${cx}px)`, transition: dg ? "none" : trans } as any;
    if (!isOrder) return <g key={ci} style={style}>{body}</g>;
    const label = "bar " + set.cs[ci].text;
    const keys = dr.keys(ci);
    return (
      <g key={ci} className="c4-piece" style={{ ...style, cursor: live ? "grab" : "default" }} {...control("bar-" + (ci + 1), label)} {...dr.bind(ci)}
        onKeyDown={(e: any) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); e.stopPropagation(); moveBy(ci, e.key === "ArrowRight" ? 1 : -1); return; }
          if (e.key === " ") keys.onKeyDown(e);
          /* Enter passes to the window: it answers the order (PATTERNS §5b) */
        }}>
        <rect x={-pitch / 2 + 8} y={0} width={pitch - 16} height={MC_Y0 + 64} fill="transparent" />
        {body}
      </g>
    );
  };

  /* ── the working area ── */
  const canSame = live && !s.same && kind !== "mean" && N > 0;
  const showTake = kind === "diff";
  const invite = !live ? null : !s.same && kind !== "mean" ? MC_BTN.same : showTake && !s.took ? MC_BTN.take : null;
  const sameKey = free || kind !== "none";
  const ballAt = s.ball >= 0 && won && kind === "order" ? shown[Math.min(s.ball, N - 1)] : -1;

  return (
    <g>
      {/* the running count: measures put in one unit */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={22} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("In one unit")}</text>
        <text x={306} y={-38} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={greenInk}>{CNT.current.c}</text>
      </g>

      {/* the shelf the bars stand on */}
      {isOrder || kind === "mean"
        ? <rect x={10} y={MC_Y0} width={MC_AREA - 20} height={12} rx={6} fill={shade(C.rule, 0.15)} />
        : <line x1={20} y1={MC_Y0} x2={MC_AREA - 20} y2={MC_Y0} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />}
      {kind === "pick" && <line x1={pitch} y1={MC_CARD_Y} x2={pitch} y2={MC_LAB_Y + 14} stroke={C.rule} strokeWidth={3} strokeDasharray="10 10" />}

      {/* the cards and their bars */}
      {set.cs.map((_: any, ci: number) => column(ci))}

      {/* by how much: the shorter bar, laid over the longer by Take away */}
      {kind === "diff" && (
        <g style={{ transform: `translateX(${pitch * ((took ? hi : lo) + 0.5)}px)`, transition: trans } as any} pointerEvents="none">
          {barShape(lo, up ? 1 : 0, took ? roseFill : "url(#gOne)", took ? shade(VIOLET, 0.2) : shade(GREEN, 0.2))}
        </g>
      )}
      {kind === "diff" && took && (() => {
        const hx = pitch * (hi + 0.5), side = hi < lo ? 1 : -1, x0 = hx + side * (bw / 2 + 16);
        const hH = set.h(set.cs[hi].val), hL = set.h(set.cs[lo].val), yTop = MC_Y0 - hH, yMid = MC_Y0 - hL;
        const anchor = side > 0 ? "start" : "end";
        return (
          <g pointerEvents="none">
            <text x={x0 + side * 8} y={MC_Y0 - hL / 2 + 10} textAnchor={anchor} fontSize={T.micro} fontWeight={600} fill={roseInk}>{tx("Taken away")}</text>
            <path d={`M ${x0 - side * 6} ${yTop + 2} H ${x0} V ${yMid - 2} H ${x0 - side * 6}`} fill="none" stroke={greenInk} strokeWidth={3} />
            <text x={x0 + side * 12} y={(yTop + yMid) / 2 + (v.reveal || won ? -6 : 10)} textAnchor={anchor} fontSize={T.micro} fontWeight={600} fill={greenInk}>{tx("Answer")}</text>
            {(v.reveal || won) && <text x={x0 + side * 12} y={(yTop + yMid) / 2 + 30} textAnchor={anchor} fontSize={T.label} fontWeight={700} fill={greenInk}>
              {indian(set.cs[hi].val - set.cs[lo].val) + " " + set.u.small}</text>}
          </g>
        );
      })()}

      {/* the sign slot between the two bars */}
      {kind === "sign" && (() => {
        const sg = v.sign || (won ? it.answer : null) || v.sign0 || null;
        const ok = !!(v.sign || won);
        return (
          <g pointerEvents="none">
            <rect x={MC_AREA / 2 - 46} y={MC_LAB_Y - 40} width={92} height={64} rx={14} fill="#FFFFFF"
              stroke={ok ? GREEN : C.rule} strokeWidth={ok ? 4 : 3} strokeDasharray={sg ? undefined : "8 8"} />
            {sg && <text x={MC_AREA / 2} y={MC_LAB_Y + 8} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={ok ? greenInk : C.ink}>{MC_SIGN_OF[sg]}</text>}
          </g>
        );
      })()}

      {/* a dragged bar, lifted and amber, follows the finger along the shelf */}
      {ghost && (
        <g style={{ transform: `translateX(${ghost.x}px)` } as any} pointerEvents="none" filter="url(#fLift)">
          {cardShape(ghost.ci)}
          {up && barShape(ghost.ci, 1, "url(#gTen)", shade(AMBER, 0.25))}
          {labelShape(ghost.ci)}
        </g>
      )}

      {/* the buttons: Same unit, the unit fact, Take away (by how much) or New cards (free play) */}
      {sameKey && (
        <Key id="same-unit" label="Same unit" x={MC_BTN.x} y={MC_BTN.same} w={MC_BTN.w} h={MC_BTN.h} C={C} primary disabled={!canSame} onClick={doSame}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={canSame ? "#FFFFFF" : mix(C.ink, C.panel, 0.45)}>{tx("Same unit")}</text>
        </Key>
      )}
      {N > 0 && (
        <g>
          <rect x={MC_BTN.x} y={MC_BTN.fact} width={MC_BTN.w} height={92} rx={18} fill={tint(VIOLET, 0.86)} stroke={VIOLET} strokeWidth={3} />
          <text x={MC_BTN.x + MC_BTN.w / 2} y={MC_BTN.fact + 36} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={violetInk}>{tx("Unit fact")}</text>
          <text x={MC_BTN.x + MC_BTN.w / 2} y={MC_BTN.fact + 74} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={violetInk}>{set.fact}</text>
        </g>
      )}
      {showTake && (
        <Key id="take-away" label="Take away" x={MC_BTN.x} y={MC_BTN.take} w={MC_BTN.w} h={MC_BTN.h} C={C} disabled={!live || s.took} onClick={doTake}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={live && !s.took ? C.ink : mix(C.ink, C.panel, 0.45)}>{tx("Take away")}</text>
        </Key>
      )}
      {free && (
        <Key id="new-cards" label="New cards" x={MC_BTN.x} y={MC_BTN.take} w={MC_BTN.w} h={MC_BTN.h} C={C} onClick={doNew}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("New cards")}</text>
        </Key>
      )}
      {invite && <rect className="c4-pulse" x={MC_BTN.x - 6} y={invite - 6} width={MC_BTN.w + 12} height={MC_BTN.h + 12} rx={24}
        fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}

      {/* the correction and the win, drawn over the picture: never takes a tap */}
      <g pointerEvents="none">
        {v.ring && <rect x={MC_BTN.x - 6} y={MC_BTN.same - 6} width={MC_BTN.w + 12} height={MC_BTN.h + 12} rx={24} fill="none" stroke={AMBER} strokeWidth={6} />}
        {up && (v.level || (won && (kind === "pick" || (kind === "sign" && it.answer === "eq")))) && (() => {
          const a = kind === "pick" ? 0 : 0, b = kind === "pick" ? (v.amb && v.amb.length ? v.amb[0] : pickRight) : 1;
          const y = MC_Y0 - set.h(set.cs[a].val);
          return <line x1={xAt(a) - bw / 2 - 10} y1={y} x2={Math.max(xAt(a), xAt(b)) + bw / 2 + 10} y2={y} stroke={greenInk} strokeWidth={3} strokeDasharray="12 8" />;
        })()}
        {v.cap1 && row(v.cap1, MC_AREA / 2, MC_CAP1, T.label)}
        {v.dir && (() => {
          const word = v.dir === "down" ? "Descending" : "Ascending";
          const w = mcWidth(word, T.label), x0 = MC_AREA / 2 - (w + 90) / 2, y = MC_CAP1;
          const a = v.dir === "down" ? [x0 + w + 20, y - 26, x0 + w + 80, y + 2] : [x0 + w + 20, y + 2, x0 + w + 80, y - 26];
          const ang = Math.atan2(a[3] - a[1], a[2] - a[0]);
          const hd = (t: number) => `${a[2] - 16 * Math.cos(ang + t)},${a[3] - 16 * Math.sin(ang + t)}`;
          return (
            <g>
              <text x={x0} y={y} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(word)}</text>
              <line x1={a[0]} y1={a[1]} x2={a[2]} y2={a[3]} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
              <polygon points={`${a[2]},${a[3]} ${hd(0.5)} ${hd(-0.5)}`} fill={C.ink} />
            </g>
          );
        })()}
        {v.words && <text x={MC_AREA / 2} y={MC_CAP2} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={greenInk}>{tx("largest to smallest")}</text>}
        {v.cap2 && row(v.cap2, MC_AREA / 2, MC_CAP2, T.label)}
        {won && v.signs && shown.slice(1).map((_: any, j: number) => (
          <text key={j} x={pitch * (j + 1)} y={MC_LAB_Y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{it.dir === "down" ? ">" : "<"}</text>
        ))}
        {ballAt >= 0 && <circle cx={xAt(ballAt)} cy={MC_Y0 - set.h(set.cs[ballAt].val) - 16} r={14} fill="url(#gTen)" stroke={shade(AMBER, 0.25)} strokeWidth={2} />}
      </g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const ph: any = PHASES[(n || 1) - 1];
  const it: any = ph && ph.items[last.item];
  if (!it) return null;
  const set: any = mcSet(it.cards);
  const GREEN = CONTENT.one, ink = shade(GREEN, 0.25), foot = h - 8, top = 10;
  const tall = (ci: number) => 6 + (set.h(set.cs[ci].val) / MC_MAXH) * (foot - top - 6);
  const bars = (ord: number[], x0: number, bw: number, gap: number) => ord.map((ci: number, j: number) => (
    <rect key={j} x={x0 + j * (bw + gap)} y={foot - tall(ci)} width={bw} height={tall(ci)} rx={4} fill="url(#gOne)" stroke={shade(GREEN, 0.2)} strokeWidth={1.5} />
  ));
  let body: any = null;
  if (it.kind === "sign" || it.kind === "pick") {
    const b = it.kind === "pick" ? it.choices.findIndex((c: any) => c.id === it.answer) + 1 : 1;
    const sg = it.kind === "pick" ? "=" : MC_SIGN_OF[it.answer];
    body = (
      <g>
        {bars([0], 44, 44, 0)}
        <text x={w / 2} y={foot - 18} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{sg}</text>
        {bars([b], w - 88, 44, 0)}
      </g>
    );
  } else if (it.kind === "diff") {
    const lo = set.cs[0].val < set.cs[1].val ? 0 : 1, hi = 1 - lo;
    body = (
      <g>
        <rect x={30} y={foot - tall(hi)} width={48} height={tall(hi)} rx={4} fill="url(#gOne)" stroke={shade(GREEN, 0.2)} strokeWidth={1.5} />
        <rect x={30} y={foot - tall(lo)} width={48} height={tall(lo)} rx={4} fill={tint(CONTENT.bead, 0.3)} stroke={shade(CONTENT.bead, 0.2)} strokeWidth={1.5} />
        <text x={96} y={h / 2 + 10} fontSize={T.micro} fontWeight={700} fill={ink}>{indian(it.answer[0]) + " " + it.parts[0].unit}</text>
      </g>
    );
  } else {
    const ord = it.kind === "mean" ? mcRight(set, "down") : mcRight(set, it.dir);
    body = <g>{bars(ord, 34, 30, 18)}</g>;
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {body}
    </g>
  );
}

function MeasureComparer(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: mcFormat, winMs: 3800, fitHost: () => null }} />
  );
}

export default MeasureComparer;
