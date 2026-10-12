/* ═══ M3.S5.T9.C32.2D1 · other_units · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   Rounded Chart Estimator (Class 5, ch 9 Measurements, other units in everyday use):
   1  sort seven unit cards into length, weight and capacity bins (drag, or tap a card then a bin)
   2  tap a chart card: its two bars are laid side by side; say more or less, longer or shorter
   3  stack copies of one chart card and ADD its number that many times (never multiply a decimal)
   4  build the estimate, press the About stamp onto it, then Enter: an unstamped answer is "exact" */

const TOOL_ID = "other_units";
const MEDIA_ID = "M3.S5.T9.C32.2D1";
const TOOL_NAME = "Rounded Chart Estimator";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Seven cards, from a chart of other units."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You used the chart's rounded numbers, and said about every time.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Tap any card and stack it as often as you like.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = { hi: {}, gu: {} };

/* ── the chart (the book's rounded numbers; the line from centimetres to feet is left out, as the book
   cuts it short). A card reads "1 <from> is about <n> <to>"; the pound card is the book's own line
   "1 kg is about 2.2 pounds", so its metric unit stands first (rev). ─────────────────────────────── */
const OU_CARDS: any = {
  mile:   { id: "mile",   name: "mile",   from: "1 mile",   n: "1.61",  to: "km",     own: "1 mile",   metric: "1 kilometre", measure: "length" },
  yard:   { id: "yard",   name: "yard",   from: "1 yard",   n: "0.914", to: "m",      own: "1 yard",   metric: "1 metre",     measure: "length" },
  foot:   { id: "foot",   name: "foot",   from: "1 foot",   n: "0.305", to: "m",      own: "1 foot",   metric: "1 metre",     measure: "length" },
  inch:   { id: "inch",   name: "inch",   from: "1 inch",   n: "2.54",  to: "cm",     own: "1 inch",   metric: "1 centimetre", measure: "length" },
  pound:  { id: "pound",  name: "pound",  from: "1 kg",     n: "2.2",   to: "pounds", own: "1 pound",  metric: "1 kilogram",  measure: "weight", rev: true },
  ounce:  { id: "ounce",  name: "ounce",  from: "1 ounce",  n: "28.35", to: "g",      own: "1 ounce",  metric: "1 gram",      measure: "weight" },
  gallon: { id: "gallon", name: "gallon", from: "1 gallon", n: "3.79",  to: "L",      own: "1 gallon", metric: "1 litre",     measure: "capacity" },
};
const OU_ORDER = ["mile", "yard", "foot", "inch", "pound", "ounce", "gallon"];
const OU_BINS = ["length", "weight", "capacity"];
/* the chapter's content colours: Given deep blue, Answer green, the card in use amber, a unit fact violet */
const OU_GIVEN = CONTENT.hundred;
const OU_ANS = CONTENT.one;
const OU_AMBER = CONTENT.ten;
const OU_FACT = "#7D5BB8";

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase. kind: sort (bins, made on the working area) · compare (a word choice) ·
           stack (a typed decimal) · stamp (a typed decimal that must carry the About stamp).
           win: the tool's own line when the answer is right (read by the maths reviewer, not the checks) */
const PHASES = [
  {
    n: 1,
    concept: "Units used elsewhere",
    conceptId: "M3.S5.T9.C32", objectiveIds: ["O15"],
    says: ["What does this unit measure? Drop it in its bin."],
    /* the plan's tries (sort just the mile and the pound, then add the gallon, then the four length units)
       are stage directions; rungs 2 and 3 say their idea to the child instead */
    ladder: ["Ask of each card: how long, how heavy, or how much it holds?",
      "A ruler measures length, a balance measures weight, and a jug measures capacity."],
    closing: "Miles, yards, feet and inches measure length. Pounds and ounces measure weight. Gallons measure capacity.",
    learned: "You learned: miles measure length, pounds weight, gallons capacity",
    traceback: "The card stays where it was put; the bin it belongs in lights amber with its measuring tool drawn above it, and ghost cards show every card in its right bin.",
    items: [
      /* learn OU1: answer in the plan = Miles and inches. */
      { qid: "M3.S5.T9.C32:OU1", kind: "sort", pad: "enter", winMs: 3200, cards: ["mile", "pound", "inch", "gallon"], bin: "length", need: "all",
        answer: "mile=length;pound=weight;inch=length;gallon=capacity", near: "mile=length;pound=length;inch=length;gallon=length",
        forms: ["miles and inches"],
        say: "Which of these measure length: miles, pounds, inches and gallons?", ask: "Which measure length?",
        miss: "Length tells how long or how far. Check each card against that.",
        win: "Yes! A mile and an inch both tell how long." },
      /* practice 1: answer in the plan = The pound or the ounce (either is right) */
      { qid: "M3.S5.T9.C32:1", kind: "sort", pad: "enter", winMs: 3200, cards: ["mile", "yard", "foot", "inch", "pound", "ounce", "gallon"], bin: "weight", need: "one",
        answer: "pound=weight", near: "gallon=weight",
        forms: ["pound or ounce"],
        say: "Name one unit of weight on the chart that is not a metric unit.", ask: "One unit of weight?",
        miss: "Weight tells how heavy a thing is. Which card would weigh a bag of rice?",
        win: "Yes! Weight is how heavy. Both weight cards are home." },
      /* practice 2: answer in the plan = A gallon */
      { qid: "M3.S5.T9.C32:2", kind: "sort", pad: "enter", winMs: 3200, cards: ["mile", "gallon", "ounce"], bin: "capacity", need: "all",
        answer: "mile=length;gallon=capacity;ounce=weight", near: "ounce=capacity",
        forms: [],
        say: "Which of these measures capacity: a mile, a gallon or an ounce?", ask: "Which measures capacity?",
        miss: "Capacity tells how much a pot or a tank holds.",
        win: "Yes! A gallon tells how much a pot can hold." },
    ],
  },
  {
    n: 2,
    concept: "Reading the chart",
    conceptId: "M3.S5.T9.C33", objectiveIds: ["O15"],
    says: ["Tap a card. Which bar is longer?"],
    /* the plan's tries (the inch card, then the yard card, then one length and one weight card) as hints */
    ladder: ["When the chart number is more than 1, the first unit is the bigger one.",
      "Picture the two bars side by side. Which one would reach further?"],
    closing: "Read the chart's rounded number to tell if a unit is bigger or smaller than a metric unit.",
    learned: "You learned: read the chart's number to tell which unit is bigger",
    traceback: "The card's two bars are laid side by side on the rails, the longer bar glows, and the comparison is written under them while the child's answer stays.",
    items: [
      /* learn OU2: answer in the plan = More. A gallon holds a little less than 4 litres. */
      { qid: "M3.S5.T9.C33:OU2", kind: "compare", winMs: 4200, card: "gallon",
        choices: [{ id: "more", label: "More" }, { id: "less", label: "Less" }], answer: "more", near: "less",
        caption: "A gallon holds more",
        say: "The chart gives 1 gallon as about 3.79 L. Does a gallon hold more or less than a litre?", ask: "A gallon vs a litre?",
        miss: "Find the gallon card on the chart. A gallon is about how many litres?",
        win: "A gallon is about 3.79 litres, so it holds more." },
      /* practice 3: answer in the plan = Longer: the chart gives 1 inch as about 2.54 cm */
      { qid: "M3.S5.T9.C33:3", kind: "compare", winMs: 4200, card: "inch",
        choices: [{ id: "longer", label: "Longer" }, { id: "shorter", label: "Shorter" }], answer: "longer", near: "shorter",
        caption: "An inch is longer",
        say: "Is an inch longer or shorter than a centimetre?", ask: "An inch vs a centimetre?",
        miss: "Find the inch card. How many centimetres make one inch?",
        win: "An inch is about 2.54 centimetres, so it is longer." },
      /* practice 4: answer in the plan = Shorter, a little less than 1 m */
      { qid: "M3.S5.T9.C33:4", kind: "compare", winMs: 4400, card: "yard",
        choices: [{ id: "longer", label: "Longer" }, { id: "shorter", label: "Shorter" }], answer: "shorter", near: "longer",
        caption: "A yard is shorter",
        say: "The chart gives 1 yard as about 0.914 m. Is a yard longer or shorter than a metre?", ask: "A yard vs a metre?",
        miss: "Look at the yard card. Is its number more than 1, or less?",
        win: "A yard is about 0.914 metres, a little shorter than a metre." },
    ],
  },
  {
    n: 3,
    concept: "Adding the chart's numbers",
    conceptId: "M3.S5.T9.C34", objectiveIds: ["O16"],
    says: ["Stack it once for each. Now add them."],
    /* the plan's tries (stack twice and add, once more and add again, the simplest card) as hints */
    ladder: ["Add the chart number as many times as the question says.",
      "Write the numbers one under another, points in one line, then add."],
    closing: "For a few lots of a unit, add the chart number that many times.",
    learned: "You learned: for a few lots, add the chart number that many times",
    traceback: "The stack is laid to the given length, the child's answer is drawn as a bar beside it with any missing copy outlined amber, and the numbers are added with their points in one line to the right sum.",
    items: [
      /* learn OU3: answer in the plan = About 0.915 m. */
      { qid: "M3.S5.T9.C34:OU3", kind: "stack", winMs: 4200, card: "foot", count: 3, given: "3 feet", answer: "0.915", near: "3.305",
        say: "A plank is about 3 feet long. About how many metres is that?", ask: "About how many metres?",
        miss: "One copy for each foot. Count your copies, then add their numbers.",
        win: "Three copies of 0.305 make about 0.915 metres." },
      /* practice 5: answer in the plan = About 5.08 cm, because 2.54 + 2.54 = 5.08 */
      { qid: "M3.S5.T9.C34:5", kind: "stack", winMs: 4000, card: "inch", count: 2, given: "2 inches", answer: "5.08", near: "4.54",
        say: "A book is about 2 inches thick. About how many centimetres is that?", ask: "About how many centimetres?",
        miss: "Lay one copy for each inch, then add 2.54 that many times.",
        win: "2.54 and 2.54 make about 5.08 centimetres." },
      /* practice 6: answer in the plan = About 3.22 km, because 1.61 + 1.61 = 3.22 */
      { qid: "M3.S5.T9.C34:6", kind: "stack", winMs: 4000, card: "mile", count: 2, given: "2 miles", answer: "3.22", near: "3.61",
        say: "A walk is about 2 miles long. About how many kilometres is that?", ask: "About how many kilometres?",
        miss: "Two miles means two copies of the mile card. Line up their points and add.",
        win: "1.61 and 1.61 make about 3.22 kilometres." },
    ],
  },
  {
    n: 4,
    concept: "About, not exact",
    conceptId: "M3.S5.T9.C35", objectiveIds: ["O16"],
    says: ["Is it exact? Stamp it."],
    /* the plan's tries (stamp an answer from one card, then from two copies, then a weight card) as hints */
    ladder: ["A rounded number in means an about answer out.",
      "Build the estimate, stamp it About, then press Enter."],
    closing: "Every answer made from the chart is about, not exact, because its numbers are rounded.",
    learned: "You learned: chart numbers are rounded, so answers are about, not exact",
    traceback: "The answer waits unstamped and the About stamp lights amber; a wrong number is added again with the points in one line, and the right estimate is written with its About mark.",
    items: [
      /* learn OU4: answer in the plan = About 6.6 pounds. The chart's numbers are rounded, so the answer is close, not exact. */
      { qid: "M3.S5.T9.C35:OU4", kind: "stamp", winMs: 4600, card: "pound", count: 3, given: "3 kg", answer: "6.6", near: "6.6",
        say: "A parcel weighs about 3 kg. About how many pounds is that, and why is the answer only about?", ask: "About how many pounds?",
        miss: "The chart's 2.2 is rounded. Can an answer made from it be exact?",
        win: "About 6.6 pounds. The chart's 2.2 is rounded, so the answer is only about." },
      /* practice 7: answer in the plan = About 11.37 L, because 3.79 + 3.79 + 3.79 = 11.37, and the chart's numbers are rounded */
      { qid: "M3.S5.T9.C35:7", kind: "stamp", winMs: 4400, card: "gallon", count: 3, given: "3 gallons", answer: "11.37", near: "11.37",
        say: "A pot holds about 3 gallons. About how many litres is that, and why do we say about?", ask: "About how many litres?",
        miss: "Add 3.79 three times, then press the stamp onto your answer.",
        win: "About 11.37 litres. We say about, because 3.79 is rounded." },
      /* practice 8: answer in the plan = About 56.7 g, because 28.35 + 28.35 = 56.7. It is not exact, because the chart's numbers are rounded */
      { qid: "M3.S5.T9.C35:8", kind: "stamp", winMs: 4400, card: "ounce", count: 2, given: "2 ounces", answer: "56.7", near: "56.7",
        say: "A letter weighs about 2 ounces. About how many grams is that, and is the answer exact?", ask: "About how many grams?",
        miss: "28.35 is rounded too. What must the grams answer carry?",
        win: "About 56.7 grams. It is not exact, because 28.35 is rounded." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  chart: OU_ORDER.map((id) => ({ unit: id, line: OU_CARDS[id].from + " is about " + OU_CARDS[id].n + " " + OU_CARDS[id].to, measures: OU_CARDS[id].measure })),
  bins: OU_BINS,
  stack: "one copy of the card a tap; the copies' numbers are added, never multiplied",
  about: "phase 4: an answer is taken only with the About stamp on it; an unstamped answer is read as exact (the misconception)",
};

/* ── small helpers (names prefixed ou: the runtime shares this scope) ───────────────────────── */
/* a sort is written "mile=length;inch=length" in the item's card order (typed holds it while sorting) */
const ouDecode = (s: any) => {
  const m: any = {};
  String(s || "").split(";").forEach((p) => { const [c, b] = p.split("="); if (c && b) m[c.trim()] = b.trim(); });
  return m;
};
const ouEncode = (m: any, order: string[]) => order.filter((c) => m[c]).map((c) => c + "=" + m[c]).join(";");
/* a decimal as the book writes it: digits, one point, the zero in front ("0.915", not ".915");
   a zero on the end of a sum is the same number ("56.70" is 56.7, as column addition writes it) */
const ouDecEq = (v: any, a: any) => {
  const s = String(v ?? "").trim();
  return /^\d+(\.\d+)?$/.test(s) && Math.abs(Number(s) - Number(a)) < 1e-9;
};
/* k lots of a chart number, added in whole thousandths (no floating point), written with its decimals */
const ouSum = (n: string, k: number) => {
  const d = (n.split(".")[1] || "").length;
  const u = Math.round(Number(n) * Math.pow(10, d)) * k;
  const s = String(u).padStart(d + 1, "0");
  return d ? s.slice(0, s.length - d) + "." + s.slice(s.length - d) : s;
};
/* the value an Enter in phase 4 sends: the typed number and where the stamp landed */
const ouStampOf = (v: any) => (v && typeof v === "object" ? { v: String(v.v ?? ""), about: !!v.about, card: !!v.card }
  : { v: String(v ?? "").replace(/^about\s+/i, "").trim(), about: /^about\s/i.test(String(v ?? "").trim()), card: false });

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? */
const judge = (item: any, v: any) => {
  if (item.kind === "sort") {
    const m = ouDecode(typeof v === "string" ? v : "");
    const keys = Object.keys(m);
    if (!keys.length) return false;
    if (keys.some((c) => !item.cards.includes(c) || !OU_CARDS[c] || OU_CARDS[c].measure !== m[c])) return false;
    const inBin = keys.filter((c) => m[c] === item.bin);
    if (item.need === "one") return inBin.length >= 1;
    return item.cards.filter((c: string) => OU_CARDS[c].measure === item.bin).every((c: string) => m[c] === item.bin);
  }
  if (item.kind === "compare") return String(v ?? "").trim().toLowerCase() === item.answer;
  if (item.kind === "stack") return ouDecEq(v, item.answer);
  if (item.kind === "stamp") { const w = ouStampOf(v); return w.about && ouDecEq(w.v, item.answer); }
  return false;
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   the book's own words for what each unit measures, and its chart numbers in whole thousandths */
const oracle = () => {
  const words: any = { length: "miles yards feet inches", weight: "pounds ounces", capacity: "gallons" };
  const plural: any = { mile: "miles", yard: "yards", foot: "feet", inch: "inches", pound: "pounds", ounce: "ounces", gallon: "gallons" };
  const homeOf = (c: string) => Object.keys(words).find((k) => words[k].split(" ").indexOf(plural[c]) >= 0);
  const milli: any = { mile: 1610, yard: 914, foot: 305, inch: 2540, pound: 2200, ounce: 28350, gallon: 3790 };
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "sort") {
      const pairs = String(it.answer).split(";").map((x: string) => x.split("="));
      if (!pairs.every(([c, b]: any) => homeOf(c) === b)) return false;
      const want = it.cards.filter((c: string) => homeOf(c) === it.bin);
      const got = pairs.filter(([, b]: any) => b === it.bin).map(([c]: any) => c);
      return it.need === "one" ? got.length >= 1 && got.every((c: string) => want.indexOf(c) >= 0) : want.every((c: string) => got.indexOf(c) >= 0);
    }
    if (it.kind === "compare") {
      /* 1 X is about n Y: n above 1 means X is the bigger (the kg line reads the other way round) */
      const bigger = milli[it.card] > 1000;
      return it.answer === (it.card === "gallon" ? (bigger ? "more" : "less") : bigger ? "longer" : "shorter");
    }
    let total = 0;
    for (let k = 0; k < it.count; k++) total += milli[it.card];
    return Math.round(Number(it.answer) * 1000) === total;
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it:
   sort: every card in the length bin, or a gallon weighed, or an ounce poured · compare: the other word ·
   stack: the count added once to the chart number · stamp: the right number with no About stamp (exact) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a compare item's words are the
   question's own two words, "more or less", so they are not counted) */
const answerForms = (item: any) => (item.kind === "sort" ? item.forms || []
  : item.kind === "compare" ? []
  : [String(item.answer), speakable(String(item.answer))]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => (item.kind === "stamp" ? "about " + item.answer : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (item.kind === "stamp" ? T.submit({ v: item.answer, about: true }) : T.submit(item.answer));
/* the agent's answer(): a sort is set as the child would leave the bins; a decimal is typed with its
   point (the runtime's own path strips it); a phase 4 answer is typed and stamped */
const answer = (item: any, v: any) => (item.kind === "sort" && HOOK.set ? HOOK.set(v)
  : (item.kind === "stack" || item.kind === "stamp") && HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* what the slot shows: a sort shows the cards in the asked bin, a choice its word */
let OU_NOW: any = null;
const format = (v: any, j: any, o: any) => {
  const it = OU_NOW, tr = (o && o.tx) || ((x: any) => x);
  if (!it || v === "" || v === null || v === undefined) return v ?? "";
  if (it.kind === "sort") {
    const m = ouDecode(v);
    return it.cards.filter((c: string) => m[c] === it.bin).map((c: string) => tr(OU_CARDS[c].name)).join(", ");
  }
  if (it.kind === "compare") { const c = (it.choices || []).find((x: any) => x.id === v); return c ? tr(c.label) : v; }
  return v;
};

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
const OU_FRESH = { picked: null, laid: null, copies: 0, marks: {}, tb: 0, acted: false, fcard: null };
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const it: any = (!free && item) || {};
  OU_NOW = free ? null : it;
  const kind = free ? "free" : it.kind;
  const own = free ? "free" : n + ":" + index;
  const [S, setS] = useState<any>({ own: "", ...OU_FRESH });
  const s = S.own === own ? S : { own, ...OU_FRESH };
  const put = (patch: any) => setS((p: any) => ({ ...(p.own === own ? p : { own, ...OU_FRESH }), ...patch }));
  const busy = tl.busy;
  const live = (stage === "ask" || stage === "teach") && !busy;
  const done = stage === "win" || stage === "idle";
  const demo = !!wrong && stage === "ask" && s.tb > 0 && !s.acted;
  const tb = demo ? s.tb : 0;
  const typedNow = String(typed ?? "");
  const ink = C.ink;
  const deep = (c: string) => shade(c, 0.25);
  const card = OU_CARDS[it.card] || null;

  /* a restart re-enters the phase on its teach: the pieces start again */
  useEffect(() => { if (stage === "teach") setS({ own, ...OU_FRESH }); }, [stage === "teach", own]);

  /* the win line (the tool's own), once a right answer lands */
  const winKey = stage === "win" ? own : "";
  useEffect(() => { if (winKey && it.win) api.say(it.win); }, [winKey]);

  /* the traceback: lock, redraw the mathematics in steps, end on the whole right answer, unlock */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setS((p: any) => ({ ...(p.own === own ? p : { own, ...OU_FRESH }), tb: 0, acted: false }));
    const step = (k: number) => () => setS((p: any) => ({ ...(p.own === own ? p : { own, ...OU_FRESH }), tb: k }));
    const steps: any = kind === "sort" ? [[600, step(1)], [700, step(2)]]
      : kind === "compare" ? [[600, step(1)], [700, step(2)]]
      : [[600, step(1)], [700, step(2)], [700, step(3)]];
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* ── phase 1: the sort lives in typed ("mile=length;…"), so Escape clears it and the agent sets it ── */
  const placed = kind === "sort" ? ouDecode(typedNow) : {};
  const setPlaced = (m: any) => api.setTyped(ouEncode(m, it.cards || []));
  const binX = (b: number) => 23 + b * 360;
  const binAt = (p: any) => {
    if (!p || !isFinite(p.x) || !isFinite(p.y) || p.y < 180 || p.y > 528) return null;
    const b = OU_BINS.findIndex((_, k) => p.x >= binX(k) - 14 && p.x <= binX(k) + 334);
    return b >= 0 ? OU_BINS[b] : null;
  };
  const dropCard = (id: string, bin: any) => {
    const m = { ...placed };
    if (bin) m[id] = bin; else delete m[id];
    setPlaced(m);
    put({ picked: null, acted: true });
    api.sfx.tick();
  };
  const cdrag = useDrag((p: any, at: any, moved: boolean) => {
    if (!p || !live || kind !== "sort") return;
    if (!moved) { put({ picked: s.picked === p.id ? null : p.id, acted: true }); return; }
    dropCard(p.id, binAt(at));
  });

  /* ── phase 4: the About stamp, dragged onto the answer (or a tap puts it there) ── */
  const answerBox = { x: 80, y: 336, w: 360, h: 70 };
  const stampTo = (where: string) => {
    if (s.marks[where]) { put({ acted: true }); return; }
    put({ marks: { ...s.marks, [where]: true }, acted: true });
    api.sfx.tick();
    api.setTyped((t: string) => t); /* a fresh act: the answer may be sent again */
  };
  const sdrag = useDrag((p: any, at: any, moved: boolean) => {
    if (!live || kind !== "stamp") return;
    if (!moved) { stampTo("answer"); return; }
    const inBox = (r: any) => at.x >= r.x - 20 && at.x <= r.x + r.w + 20 && at.y >= r.y - 20 && at.y <= r.y + r.h + 20;
    if (inBox(answerBox)) stampTo("answer");
    else if (inBox({ x: 24, y: 14, w: 300, h: 100 }) || (at.y >= 230 && at.y <= 276 && at.x >= 30 && at.x <= 1040)) stampTo("card");
  });

  /* Enter goes to the tool first where the working area holds part of the answer */
  if (kind === "sort") api.onEnter(() => {
    if (!typedNow) return;                                          /* nothing sorted yet */
    if (wrong && String(wrong.value) === typedNow) return;          /* the same bins as the miss: nothing new */
    api.submit(typedNow);
  });
  else if (kind === "stamp") api.onEnter((v: any) => {
    const t = String(v ?? typedNow);
    if (!t) return;
    api.submit({ v: t, about: !!s.marks.answer, card: !!s.marks.card });
  });
  else api.onEnter(null);

  HOOK.set = (v: any) => { api.setTyped(String(v ?? "")); return true; };
  HOOK.type = (v: any) => {
    const w = ouStampOf(v);
    api.setTyped(w.v);
    if (kind === "stamp") put({ marks: { ...s.marks, answer: true }, acted: true });
    return true;
  };

  /* what the host and the agent read back (toolApi.getState) */
  const sel = kind === "compare" ? s.laid : kind === "free" ? s.fcard : it.card || null;
  api.share({
    bins: kind === "sort" ? placed : null, asked: kind === "sort" ? it.bin : null, card: sel,
    copies: kind === "stack" || kind === "stamp" || kind === "free" ? s.copies : null,
    stamped: kind === "stamp" ? (s.marks.answer ? "answer" : s.marks.card ? "card" : null) : null,
    answer: kind === "sort" ? (format(typedNow, 0, { tx }) || null) : typedNow || null,
  });

  /* ── drawing (helpers are called, never mounted) ─────────────────────────────────────── */
  const txt = (x: number, y: number, s1: string, o: any = {}) => (
    <text x={x} y={y} fontSize={o.size || T.label} fontWeight={o.w || 600} fill={o.fill || ink} textAnchor={o.anchor || "start"}
      style={o.tab ? ({ fontVariantNumeric: "tabular-nums" } as any) : undefined}>{s1}</text>
  );
  const icon = (bin: string, x: number, y: number) => {
    const st = { stroke: ink, strokeWidth: 3, fill: "none", strokeLinecap: "round" as any, strokeLinejoin: "round" as any };
    if (bin === "length") return (
      <g key={"ic" + bin} {...st}>
        <rect x={x} y={y + 26} width={130} height={30} rx={4} />
        {Array.from({ length: 12 }).map((_, k) => <line key={k} x1={x + 10 + k * 10} y1={y + 26} x2={x + 10 + k * 10} y2={y + 26 + (k % 5 === 0 ? 16 : 9)} />)}
      </g>
    );
    if (bin === "weight") return (
      <g key={"ic" + bin} {...st}>
        <line x1={x + 65} y1={y + 6} x2={x + 65} y2={y + 70} /><line x1={x + 40} y1={y + 72} x2={x + 90} y2={y + 72} />
        <line x1={x + 15} y1={y + 18} x2={x + 115} y2={y + 18} />
        <path d={`M ${x + 15} ${y + 18} L ${x + 3} ${y + 46} L ${x + 27} ${y + 46} Z`} />
        <path d={`M ${x + 115} ${y + 18} L ${x + 103} ${y + 46} L ${x + 127} ${y + 46} Z`} />
      </g>
    );
    return (
      <g key={"ic" + bin} {...st}>
        <path d={`M ${x + 40} ${y + 8} L ${x + 92} ${y + 8} L ${x + 88} ${y + 18} L ${x + 96} ${y + 74} L ${x + 36} ${y + 74} L ${x + 44} ${y + 18} Z`} />
        <path d={`M ${x + 92} ${y + 26} C ${x + 120} ${y + 26}, ${x + 120} ${y + 58}, ${x + 94} ${y + 58}`} />
        <line x1={x + 42} y1={y + 40} x2={x + 90} y2={y + 40} />
      </g>
    );
  };
  /* a unit card of phase 1: 140 x 72, the unit's name */
  const unitCard = (id: string, x: number, y: number, o: any) => {
    const off = o.off, ghost = o.ghost, picked = o.picked, lift = o.lift;
    const props = o.control ? { ...control("card-" + id, tx(OU_CARDS[id].name) + " card"), ...cdrag.bind({ id }), ...cdrag.keys({ id }) } : {};
    return (
      <g key={(ghost ? "g-" : "c-") + id} {...props} pointerEvents={ghost ? "none" : undefined}
        filter={ghost || off ? undefined : lift || picked ? "url(#fLift)" : "url(#fShadowSoft)"}>
        <rect x={x} y={y} width={140} height={72} rx={RAD.piece + 4}
          fill={ghost ? "#FFFFFF" : off ? tint(C.panel, 0.45) : "url(#gCard)"}
          stroke={ghost ? OU_ANS : picked ? OU_AMBER : off ? tint(C.rule, 0.3) : C.rule}
          strokeWidth={ghost ? 3 : picked ? 5 : 2} strokeDasharray={ghost ? "9 7" : undefined} />
        {!off && !ghost && <rect x={x + 10} y={y + 8} width={120} height={6} rx={3} fill={OU_FACT} fillOpacity={0.55} />}
        {txt(x + 70, y + 50, tx(OU_CARDS[id].name), { anchor: "middle", w: 700, fill: ghost ? deep(OU_ANS) : off ? mix(ink, "#FFFFFF", 0.3) : ink })}
      </g>
    );
  };
  const slotOf = (b: number, k: number) => {
    const row = Math.min(Math.floor(k / 2), 2);
    return { x: binX(b) + 12 + (k % 2) * 156, y: 280 + row * 80 + (k >= 6 ? 10 : 0) };
  };

  const phase1 = () => {
    const cards: string[] = it.cards || [];
    const home = (c: string) => OU_CARDS[c].measure;
    /* the picture of a right answer: every card of the question in its own bin */
    const all: any = done ? Object.fromEntries(cards.map((c) => [c, home(c)])) : placed;
    const wrongMap = wrong ? ouDecode(typeof wrong.value === "string" ? wrong.value : "") : {};
    const lit = new Set<string>();
    if (tb >= 1) {
      cards.forEach((c) => { if (wrongMap[c] && wrongMap[c] !== home(c)) lit.add(home(c)); });
      if (!lit.size) lit.add(it.bin);
    }
    const d = cdrag.drag && cdrag.drag.moved ? cdrag.drag : null;
    const inBin: any = { length: [], weight: [], capacity: [] };
    OU_ORDER.forEach((c) => { if (all[c] && inBin[all[c]]) inBin[all[c]].push(c); });
    const ghosts: any[] = [];
    if (tb >= 2) {
      const used: any = { length: inBin.length.length, weight: inBin.weight.length, capacity: inBin.capacity.length };
      cards.forEach((c) => { if (all[c] !== home(c)) { const b = home(c); ghosts.push({ c, b, k: used[b]++ }); } });
    }
    const picking = live && !!s.picked;
    const firstFree = cards.find((c) => !all[c]);
    const invite = live && !demo && !Object.keys(placed).length && !s.picked && firstFree;
    return (
      <g>
        {OU_BINS.map((b, k) => {
          const on = lit.has(b), green = done;
          return (
            <g key={"bin-" + b}>
              <rect x={binX(k)} y={200} width={320} height={320} rx={RAD.panel}
                fill={green ? tint(OU_ANS, 0.85) : on ? tint(OU_AMBER, 0.82) : tint(C.panel, 0.35)}
                stroke={green ? OU_ANS : on ? OU_AMBER : C.rule} strokeWidth={green || on ? 5 : 3} />
              <line x1={binX(k) + 16} y1={272} x2={binX(k) + 304} y2={272} stroke={C.rule} strokeWidth={2} />
              {txt(binX(k) + 160, 248, tx(b), { anchor: "middle", w: 700 })}
              {on && icon(b, binX(k) + 95, 104)}
            </g>
          );
        })}
        {/* a picked card goes into the bin tapped next (the label band is the bin's finger box) */}
        {picking && OU_BINS.map((b, k) => (
          <Hit key={"hit-" + b} id={"bin-" + b} x={binX(k)} y={200} w={320} h={72} label={"Put it in the " + b + " bin"}
            onPress={() => { if (s.picked) dropCard(s.picked, b); }} />
        ))}
        {OU_ORDER.map((c, i) => {
          const inPlay = cards.indexOf(c) >= 0;
          const b = all[c];
          const dragging = d && d.payload && d.payload.id === c;
          let x = 17 + i * 152, y = 16;
          if (b && inPlay) { const at = slotOf(OU_BINS.indexOf(b), inBin[b].indexOf(c)); x = at.x; y = at.y; }
          if (dragging) { x = d.x - 70; y = d.y - 36; }
          return unitCard(c, x, y, { off: !inPlay, control: inPlay && !done, picked: s.picked === c, lift: dragging });
        })}
        {ghosts.map((g) => { const at = slotOf(OU_BINS.indexOf(g.b), g.k); return unitCard(g.c, at.x, at.y, { ghost: true }); })}
        {invite && <Invite x={17 + OU_ORDER.indexOf(firstFree as string) * 152 + 70} y={52} r={44} C={C} />}
      </g>
    );
  };

  /* ── phase 2 (and the chart of free play): seven chart cards in two rows ── */
  const chartPos = (id: string) => {
    const i = OU_ORDER.indexOf(id);
    return i < 4 ? { x: 13 + i * 270, y: 10, w: 250 } : { x: 73 + (i - 4) * 320, y: 104, w: 300 };
  };
  const chartCard = (id: string, on: boolean, onPress: any, controlOn: boolean) => {
    const p = chartPos(id), c = OU_CARDS[id];
    return (
      <g key={"chart-" + id}>
        <rect x={p.x} y={p.y} width={p.w} height={84} rx={RAD.piece + 4} fill="url(#gCard)"
          stroke={on ? OU_AMBER : C.rule} strokeWidth={on ? 5 : 2} filter="url(#fShadowSoft)" />
        {txt(p.x + 18, p.y + 36, c.from, { w: 700 })}
        {txt(p.x + 18, p.y + 70, tx("about") + " " + c.n + " " + c.to, { size: T.micro, fill: deep(OU_FACT), w: 600 })}
        {controlOn && <Hit id={"chart-" + id} x={p.x} y={p.y} w={p.w} h={84} label={c.from + " card"} onPress={onPress} />}
      </g>
    );
  };
  const bars = (id: string, glow: boolean, words: boolean) => {
    const c = OU_CARDS[id];
    const ratio = c.rev ? 1 / Number(c.n) : Number(c.n); /* the card's own unit over the metric unit */
    const L = 860, ownW = ratio >= 1 ? L : Math.max(24, L * ratio), metW = ratio >= 1 ? Math.max(24, L / ratio) : L;
    const ownLong = ratio >= 1;
    const num = tx("about") + " " + c.n + " " + c.to;
    const numW = num.length * 16.5;
    const numBar = c.rev ? { y: 354, w: metW } : { y: 250, w: ownW };
    const bar = (y: number, w: number, col: string, long: boolean, key: string) => (
      <g key={key}>
        {glow && long && <rect x={34} y={y - 6} width={w + 12} height={62} rx={14} fill="none" stroke={OU_AMBER} strokeOpacity={0.45} strokeWidth={10} />}
        <rect x={40} y={y} width={w} height={50} rx={10} fill={tint(col, col === OU_FACT ? 0.62 : 0.5)} stroke={col} strokeWidth={3} />
      </g>
    );
    return (
      <g>
        {txt(40, 238, tx(c.own), { w: 700 })}
        {txt(40, 342, tx(c.metric), { w: 700 })}
        {bar(250, ownW, OU_AMBER, ownLong, "own")}
        {bar(354, metW, OU_FACT, !ownLong, "met")}
        {words && (numBar.w >= numW + 28
          ? txt(40 + numBar.w - 14, numBar.y + 36, num, { anchor: "end", size: T.micro, w: 700, fill: ink })
          : txt(40 + numBar.w + 14, numBar.y + 36, num, { size: T.micro, w: 700, fill: ink }))}
      </g>
    );
  };
  const rails = () => (
    <g>
      <rect x={40} y={250} width={1006} height={50} rx={10} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} strokeDasharray="10 10" />
      <rect x={40} y={354} width={1006} height={50} rx={10} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} strokeDasharray="10 10" />
    </g>
  );
  const phase2 = () => {
    const show = done || tb >= 1 ? it.card : s.laid;
    const after = done || tb >= 2;
    const invite = live && !demo && !s.laid;
    return (
      <g>
        {OU_ORDER.map((id) => chartCard(id, show === id, () => { if (!live) return; put({ laid: id, acted: true }); api.sfx.tick(); }, !done))}
        {rails()}
        {show && bars(show, after, after)}
        {after && txt(543, 474, tx(it.caption), { anchor: "middle", w: 700, size: T.speech, fill: ink })}
        {invite && card && <Invite x={chartPos(it.card).x + chartPos(it.card).w / 2} y={chartPos(it.card).y + 42} r={48} C={C} />}
      </g>
    );
  };

  /* ── phases 3 and 4: one chart card, its copies stacked end to end, their numbers added ── */
  const runs = (count: number) => (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
      {txt(22, -44, tx("Copies"), { w: 600 })}
      {txt(306, -38, String(count), { anchor: "end", size: T.speech, w: 700 })}
    </g>
  );
  const stackKeys = (x: number, y: number, copies: number, max: number, enabled: boolean, onAdd: any, onTake: any) => (
    <g>
      <Key id="stack" x={x} y={y} w={130} h={84} C={C} primary disabled={!enabled || copies >= max} label="Stack one more copy" onClick={onAdd}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={!enabled || copies >= max ? mix(ink, "#FFFFFF", 0.3) : "#FFFFFF"}>{tx("Stack")}</text>
      </Key>
      <Key id="take-off" x={x + 146} y={y} w={160} h={84} C={C} disabled={!enabled || copies <= 0} label="Take one copy off" onClick={onTake}>
        <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={!enabled || copies <= 0 ? mix(ink, "#FFFFFF", 0.3) : ink}>{tx("Take off")}</text>
      </Key>
    </g>
  );
  const copyBars = (c: any, k0: number, k1: number, unit: number, y: number, ghost: boolean) => Array.from({ length: Math.max(0, k1 - k0) }).map((_, j) => {
    const k = k0 + j, x = 40 + k * unit;
    return (
      <g key={(ghost ? "gc" : "cp") + k} pointerEvents={ghost ? "none" : undefined}>
        <rect x={x} y={y} width={unit - 4} height={40} rx={8} fill={ghost ? "#FFFFFF" : "url(#gTen)"}
          stroke={ghost ? OU_AMBER : shade(OU_AMBER, 0.2)} strokeWidth={ghost ? 4 : 2} strokeDasharray={ghost ? "9 7" : undefined} />
        {txt(x + (unit - 4) / 2, y + 30, tx(c.from), { anchor: "middle", size: T.micro, w: 700, fill: ink })}
      </g>
    );
  });
  const numbersRow = (c: any, k: number, unit: number, y: number) => (
    <g>
      {Array.from({ length: k }).map((_, j) => txt(40 + j * unit + (unit - 4) / 2, y, c.n, { anchor: "middle", w: 600, tab: true }))}
      {Array.from({ length: Math.max(0, k - 1) }).map((_, j) => txt(40 + (j + 1) * unit - 2, y, "+", { anchor: "middle", w: 700 }))}
    </g>
  );
  /* the book's column addition: the numbers one under another, points in one line, and the sum */
  const column = (c: any, count: number, fill: string) => {
    const right = 720, top = 352;
    const sum = ouSum(c.n, count);
    return (
      <g pointerEvents="none">
        {Array.from({ length: count }).map((_, k) => txt(right, top + k * 40, c.n, { anchor: "end", w: 600, tab: true }))}
        {txt(right - 150, top + (count - 1) * 40, "+", { anchor: "middle", w: 700 })}
        <line x1={right - 170} y1={top + (count - 1) * 40 + 14} x2={right + 6} y2={top + (count - 1) * 40 + 14} stroke={ink} strokeWidth={3} />
        {txt(right, top + count * 40 + 14, sum, { anchor: "end", w: 700, fill, tab: true })}
        {txt(right + 14, top + count * 40 + 14, tx(c.to), { w: 600, fill })}
      </g>
    );
  };
  const stampRing = (x: number, y: number, dashed: boolean, label: boolean) => (
    <g pointerEvents="none">
      <ellipse cx={x} cy={y} rx={60} ry={27} fill="none" stroke={ink} strokeWidth={dashed ? 3 : 4} strokeDasharray={dashed ? "8 6" : undefined} />
      {label && txt(x, y + 10, tx("about"), { anchor: "middle", size: T.micro, w: 700 })}
    </g>
  );
  const stampPiece = (x: number, y: number, lit: boolean, dragging: boolean) => {
    const props = { ...control("about-stamp", "About stamp"), ...sdrag.bind({ kind: "stamp" }) };
    const dk = sdrag.keys({ kind: "stamp" });
    /* once the answer carries the stamp, Enter passes to the window and answers (no keyboard trap) */
    const keys = (e: any) => { if (e.key === "Enter" && s.marks.answer) return; dk.onKeyDown(e); };
    return (
      <g {...props} onKeyDown={keys} filter={dragging ? "url(#fLift)" : "url(#fShadowSoft)"}>
        {lit && <rect x={x - 66} y={y - 72} width={132} height={128} rx={20} fill={tint(OU_AMBER, 0.8)} stroke={OU_AMBER} strokeWidth={5} />}
        <rect x={x - 60} y={y - 66} width={120} height={116} rx={18} fill="transparent" />
        <circle cx={x} cy={y - 40} r={20} fill={ink} />
        <rect x={x - 9} y={y - 24} width={18} height={20} fill={ink} />
        <rect x={x - 55} y={y - 6} width={110} height={48} rx={12} fill="#3A3A3A" stroke={ink} strokeWidth={2} />
        {txt(x, y + 28, tx("About"), { anchor: "middle", size: T.micro, w: 700, fill: "#FFFFFF" })}
      </g>
    );
  };
  const phase34 = () => {
    if (!card) return null;
    const count = it.count, unit = 480 / count, max = count + 2;
    const stamp = kind === "stamp";
    const copies = done ? count : s.copies;
    const wv = wrong ? ouStampOf(wrong.value) : null;
    const numRight = wv ? ouDecEq(wv.v, it.answer) : true;
    const showSum = done || (tb >= 3 && (!stamp || !numRight)) || (tb >= 2 && stamp && numRight);
    const childW = wv && !numRight && isFinite(Number(wv.v)) && Number(wv.v) > 0 ? (Number(wv.v) / Number(card.n)) * unit : 0;
    const rightW = count * unit;
    const sd = sdrag.drag && sdrag.drag.moved ? sdrag.drag : null;
    const stampHome = { x: 950, y: 440 };
    const boxLit = tb >= 1 && stamp && !(wv && wv.about);
    const stampLit = boxLit;
    const shown = done ? it.answer : typedNow;
    const answerFill = done ? deep(OU_ANS) : ink;
    const invite = live && !demo && (copies < 1 ? "stack" : stamp && typedNow && !s.marks.answer ? "stamp" : null);
    return (
      <g>
        {runs(copies)}
        {/* the card in use (amber) and the measure the question gives (deep blue) */}
        <rect x={24} y={14} width={300} height={100} rx={RAD.piece + 4} fill="url(#gCard)" stroke={OU_AMBER} strokeWidth={5} filter="url(#fShadowSoft)" />
        {txt(44, 54, card.from, { w: 700 })}
        {txt(44, 94, tx("about") + " " + card.n + " " + card.to, { size: T.micro, w: 600, fill: deep(OU_FACT) })}
        {s.marks.card && <ellipse cx={170} cy={86} rx={140} ry={22} fill="none" stroke={ink} strokeWidth={4} pointerEvents="none" />}
        {txt(352, 50, tx("Given"), { size: T.micro, w: 600, fill: deep(OU_GIVEN) })}
        {txt(352, 94, tx("about") + " " + tx(it.given), { w: 700, fill: deep(OU_GIVEN) })}
        {stackKeys(752, 18, s.copies, max, live && !done,
          () => { if (!live) return; put({ copies: Math.min(max, s.copies + 1), acted: true }); api.sfx.tick(); },
          () => { if (!live) return; put({ copies: Math.max(0, s.copies - 1), acted: true }); })}
        {/* the given length, then the copies laid end to end under it */}
        <rect x={40} y={130} width={rightW - 4} height={40} rx={8} fill={tint(OU_GIVEN, 0.75)} stroke={OU_GIVEN} strokeWidth={3} />
        {txt(56, 160, tx(it.given), { size: T.micro, w: 700, fill: deep(OU_GIVEN) })}
        <rect x={40} y={182} width={1006} height={40} rx={8} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} strokeDasharray="10 10" />
        {copyBars(card, 0, copies, unit, 182, false)}
        {tb >= 1 && s.copies < count && copyBars(card, s.copies, count, unit, 182, true)}
        {tb >= 1 && s.copies > count && <line x1={40 + rightW - 2} y1={124} x2={40 + rightW - 2} y2={230} stroke={OU_AMBER} strokeWidth={5} pointerEvents="none" />}
        {numbersRow(card, copies, unit, 262)}
        {/* the child's answer as a bar beside the stack, and the missing part outlined amber */}
        {tb >= 2 && childW > 0 && (
          <g pointerEvents="none">
            <rect x={40} y={278} width={Math.min(childW, 1000)} height={34} rx={8} fill={tint(C.panel, 0.2)} stroke={ink} strokeWidth={2.5} strokeDasharray="12 6" />
            {childW < rightW && <rect x={40 + childW} y={278} width={rightW - childW} height={34} rx={8} fill="none" stroke={OU_AMBER} strokeWidth={4} strokeDasharray="9 7" />}
          </g>
        )}
        {/* the sum line: what the child typed, beside "=" */}
        {txt(40, 386, "=", { size: T.speech, w: 700 })}
        {done && txt(answerBox.x, 326, tx("Answer"), { size: T.micro, w: 600, fill: deep(OU_ANS) })}
        <rect x={answerBox.x} y={answerBox.y} width={answerBox.w} height={answerBox.h} rx={RAD.panel}
          fill={done ? tint(OU_ANS, 0.82) : boxLit ? tint(OU_AMBER, 0.8) : "#FFFFFF"} stroke={done ? OU_ANS : boxLit ? OU_AMBER : C.rule}
          strokeWidth={done || boxLit ? 5 : 2} />
        {shown !== "" && txt(answerBox.x + answerBox.w - 18, answerBox.y + 52, shown, { anchor: "end", size: T.speech, w: 700, fill: answerFill, tab: true })}
        {txt(answerBox.x + answerBox.w + 16, answerBox.y + 48, tx(card.to), { w: 600 })}
        {stamp && (s.marks.answer || done) && stampRing(answerBox.x + 78, answerBox.y + 35, false, true)}
        {!stamp && done && txt(answerBox.x + 22, answerBox.y + 48, tx("about"), { w: 600, fill: answerFill })}
        {/* the whole right answer, after a miss */}
        {showSum && column(card, count, done ? deep(OU_ANS) : ink)}
        {!done && showSum && (
          <g pointerEvents="none">
            {stamp ? stampRing(answerBox.x + 78, 470, true, true) : txt(answerBox.x + 18, 482, tx("about"), { w: 600 })}
            {txt(answerBox.x + (stamp ? 156 : 110), 484, it.answer, { size: T.speech, w: 700, tab: true })}
            {txt(answerBox.x + (stamp ? 156 : 110) + String(it.answer).length * 26 + 14, 484, tx(card.to), { w: 600 })}
          </g>
        )}
        {stamp && stampPiece(sd ? sd.x : stampHome.x, sd ? sd.y : stampHome.y, stampLit, !!sd)}
        {invite === "stack" && <Invite x={752 + 65} y={60} r={44} C={C} />}
        {invite === "stamp" && <Invite x={stampHome.x} y={stampHome.y - 4} r={70} C={C} />}
      </g>
    );
  };

  /* ── free play: tap any chart card and stack it as often as you like ── */
  const freePlay = () => {
    const c = OU_CARDS[s.fcard] || null, unit = 160, max = 6;
    return (
      <g>
        {runs(s.copies)}
        {OU_ORDER.map((id) => chartCard(id, s.fcard === id, () => { put({ fcard: id, copies: 1 }); api.sfx.tick(); }, true))}
        <rect x={40} y={214} width={1006} height={40} rx={8} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} strokeDasharray="10 10" />
        {c && copyBars(c, 0, s.copies, unit, 214, false)}
        {c && numbersRow(c, s.copies, unit, 296)}
        {c && s.copies > 0 && (
          <g>
            {txt(40, 372, "=", { size: T.speech, w: 700 })}
            {txt(84, 372, tx("about"), { w: 600 })}
            {txt(190, 372, ouSum(c.n, s.copies), { size: T.speech, w: 700, fill: deep(OU_ANS), tab: true })}
            {txt(190 + ouSum(c.n, s.copies).length * 26 + 14, 372, tx(c.to), { w: 600, fill: deep(OU_ANS) })}
          </g>
        )}
        {stackKeys(752, 420, s.copies, max, !!c,
          () => { put({ copies: Math.min(max, s.copies + 1) }); api.sfx.tick(); },
          () => { put({ copies: Math.max(0, s.copies - 1) }); })}
        {!c && <Invite x={chartPos("mile").x + 125} y={52} r={48} C={C} />}
      </g>
    );
  };

  return (
    <g>
      {kind === "sort" && phase1()}
      {kind === "compare" && phase2()}
      {(kind === "stack" || kind === "stamp") && phase34()}
      {kind === "free" && freePlay()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (236 x 82) */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const it: any = (PHASES[(n || 1) - 1] || PHASES[0]).items[last.item] || {};
  const ink = C.ink;
  const t = (x: number, y: number, s: string, fill = ink, anchor = "start") => (
    <text x={x} y={y} fontSize={T.micro} fontWeight={700} fill={fill} textAnchor={anchor}>{s}</text>
  );
  if (it.kind === "sort") {
    const m = typeof last.value === "string" ? ouDecode(last.value) : {};
    const names = (it.cards || []).filter((c: string) => m[c] === it.bin);
    return (
      <g>
        <rect x={0} y={4} width={w} height={h - 8} rx={14} fill={tint(OU_ANS, 0.85)} stroke={OU_ANS} strokeWidth={3} />
        {t(14, 36, tx(it.bin), shade(OU_ANS, 0.25))}
        {t(14, 70, names.map((c: string) => tx(OU_CARDS[c].name)).join(", "))}
      </g>
    );
  }
  if (it.kind === "compare") {
    const c = OU_CARDS[it.card], ratio = c.rev ? 1 / Number(c.n) : Number(c.n);
    const L = 140, a = ratio >= 1 ? L : L * ratio, b = ratio >= 1 ? L / ratio : L;
    return (
      <g>
        {t(0, 32, tx(c.name))}
        <rect x={92} y={10} width={a} height={28} rx={6} fill={tint(OU_AMBER, 0.5)} stroke={OU_AMBER} strokeWidth={2} />
        {t(0, 72, tx(c.metric.replace(/^1 /, "")))}
        <rect x={92} y={50} width={b} height={28} rx={6} fill={tint(OU_FACT, 0.62)} stroke={OU_FACT} strokeWidth={2} />
      </g>
    );
  }
  const c = OU_CARDS[it.card];
  if (!c) return null;
  return (
    <g>
      {Array.from({ length: it.count || 0 }).map((_, k) => (
        <rect key={k} x={4 + k * 44} y={8} width={40} height={20} rx={5} fill="url(#gTen)" stroke={shade(OU_AMBER, 0.2)} strokeWidth={1.5} />
      ))}
      {it.kind === "stamp" && <ellipse cx={46} cy={62} rx={46} ry={20} fill="none" stroke={ink} strokeWidth={3} />}
      {t(it.kind === "stamp" ? 46 : 0, 72, tx("about"), ink, it.kind === "stamp" ? "middle" : "start")}
      {t(it.kind === "stamp" ? 100 : 90, 72, it.answer + " " + tx(c.to), shade(OU_ANS, 0.25))}
    </g>
  );
}

function OtherUnits(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, pointKey: true, fitHost: () => null }} />
  );
}

export default OtherUnits;
