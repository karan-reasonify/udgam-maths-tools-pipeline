/* ═══ M1.S2.T5.C23.2D1 · fraction_converter · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C5.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "fraction_converter";
const MEDIA_ID = "M1.S2.T5.C23.2D1";
const TOOL_NAME = "Fraction Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A fraction, and a row of digit cards waiting for a point."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "The zeros told you where the point goes, every time.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Pick your own fraction or decimal, and turn it either way.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = { hi: {}, gu: {} };

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone)
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the spoken question; ask = the short prompt above the slot (<= 3 lines of ~15 chars)
           answer what the slot or the working area must produce; miss = rung 1, never the answer
           choices? [{ id, label }] for a word answer; pad?: "enter" when it is made on the working area
           parts?  [{ label, unit? }, …] with answer [a, b]: two boxes in the slot (quotient · remainder;
                   label at most 10 characters, e.g. { label: "each bowl", unit: "mL" }); typed reads "16|1".
                   A fraction: parts: SLOT_FRACTION, answer [3, 4] (drawn stacked). A mixed number or a
                   tidied answer: parts: SLOT_MIXED, answer [1, 2, 3] · [5, null, null] · [null, 7, 10]
                   (null = that box stays empty; the slot never says which kind the answer is)
                   A decimal: answer "0.09", a string in its written form (so "0.30" is not "0.3" and ".3"
                   is not "0.3"), with pointKey: true in the tool object below (the pad's point key) */
const PHASES = [
  {
    n: 1,
    concept: "Counting the zeros",
    conceptId: "M1.S2.T5.C20", objectiveIds: ["O7"],
    says: ["Count the zeros at the bottom. That many digits go after the point."],
    /* tries, as the plan writes it: First rung: count the zeros at the bottom. Second rung: count that many digits from the right. Third rung: the same task with a denominator of 10, before the longer denominators return.
       (rung 1 is each question's own miss; rung 3, a stage direction in the plan, is spoken as the step after rung 2) */
    ladder: ["Count that many digits from the right.", "Put the point just before them, with a 0 in front of the point."],
    closing: "The zeros of 10, 100 or 1,000 say how many digits come after the point.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: the zeros at the bottom count the digits after the point",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The zeros light one by one, Count lights that many digits from the right, the point drops before them, a 0 fills the ones place and the decimal is written green.",
    items: [
      /* learn FC1: answer in the plan = 0.67 */
      { qid: "M1.S2.T5.C20:FC1", kind: "count", num: 67, den: 100, near: "6.7", winMs: 3200,
        say: "Write 67 hundredths as a decimal.", ask: "Write it as a decimal", answer: "0.67",
        miss: "Tap the zeros counter, then Count. Which digits light up?" },
      /* practice 1: answer in the plan = 0.41 */
      { qid: "M1.S2.T5.C20:1", kind: "count", num: 41, den: 100, near: "4.1", winMs: 3200,
        say: "Now 41 hundredths. Where does the point go?", ask: "Write it as a decimal", answer: "0.41",
        miss: "100 has two zeros. How many digits did you put after the point?" },
      /* practice 2: answer in the plan = 0.263 */
      { qid: "M1.S2.T5.C20:2", kind: "count", num: 263, den: 1000, near: "2.63", winMs: 3200,
        say: "263 thousandths next. Count before you write.", ask: "Write it as a decimal", answer: "0.263",
        miss: "1,000 has three zeros, and 263 has three digits. Which digit comes first after the point?" },
    ],
  },
  {
    n: 2,
    concept: "Zeros in front",
    conceptId: "M1.S2.T5.C21", objectiveIds: ["O7"],
    says: ["Three places are needed, but there is only one digit. What fills the gap?"],
    /* tries, as the plan writes it: First rung: count the zeros at the bottom. Second rung: count the digits on top. Third rung: the same task with a denominator of 100, before 1000 returns. */
    ladder: ["Count the digits on top. Each empty place after the point gets a zero.", "Zeros go between the point and the digits, never at the end."],
    closing: "A short numerator gets zeros in front of it, and a 0 in the ones place.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: zeros fill the gap, and 0 goes in the ones place",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The count runs past the numerator into empty places, grey zero cards slide into them, the point drops, the whole number or a 0 fills the ones place and the decimal is written green.",
    items: [
      /* learn FC2: answer in the plan = 9.007 */
      { qid: "M1.S2.T5.C21:FC2", kind: "front", whole: 9, num: 7, den: 1000, near: "9.7", winMs: 3400,
        say: "Write 9 and 7 thousandths as a decimal.", ask: "Write it as a decimal", answer: "9.007",
        miss: "The 7 fills one place. What goes in the other two?" },
      /* practice 3: answer in the plan = 0.06. 100 has two zeros, so a zero goes in front of the 6 */
      { qid: "M1.S2.T5.C21:3", kind: "front", num: 6, den: 100, near: "0.6", winMs: 3400,
        say: "Now 6 hundredths. There is no whole number this time.", ask: "Write it as a decimal", answer: "0.06",
        miss: "Two places, but one digit. And what sits before the point?" },
      /* practice 4: answer in the plan = 3.041. 1000 has three zeros, so a zero goes in front of 41 */
      { qid: "M1.S2.T5.C21:4", kind: "front", whole: 3, num: 41, den: 1000, near: "3.41", winMs: 3400,
        say: "Last one, 3 and 41 thousandths. Mind the gap.", ask: "Write it as a decimal", answer: "3.041",
        miss: "41 fills two of the three places. Which place is still empty?" },
    ],
  },
  {
    n: 3,
    concept: "Make the denominator 10, 100 or 1000",
    conceptId: "M1.S2.T5.C22", objectiveIds: ["O7"],
    says: ["The count only works on ten, a hundred or a thousand. Can you reach one?"],
    /* tries, as the plan writes it: First rung: ask whether the denominator goes into 10 exactly. Second rung: try 100. Third rung: the same task with a denominator of 5, before larger denominators return. */
    ladder: ["Try 100. Which number times the bottom makes 100?", "Think of 1/5. Times 2 gives 2/10, which is 0.2."],
    closing: "Multiply both terms to reach 10, 100 or 1,000 first. Some fractions, like 1/3, never get there.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: multiply both terms to reach 10, 100 or 1,000, if you can",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Count stays off and rings once, the slider steps until the denominator lands on 100, the zeros are counted and the point drops; for 1/6 the slider runs to its end and 10, 100 and 1,000 each leave 4.",
    items: [
      /* learn FC3: answer in the plan = 0.35 */
      { qid: "M1.S2.T5.C22:FC3", kind: "reach", num: 7, den: 20, near: "0.7", winMs: 3600,
        say: "Write 7/20 as a decimal.", ask: "Write it as a decimal", answer: "0.35",
        miss: "20 is not 10, 100 or 1,000. Slide to multiply both terms." },
      /* practice 5: answer in the plan = 0.36. 25 goes into 100 four times, so 9/25 = 36/100 = 0.36 */
      { qid: "M1.S2.T5.C22:5", kind: "reach", num: 9, den: 25, near: "0.09", winMs: 3600,
        say: "Now 9/25. What will you multiply by?", ask: "Write it as a decimal", answer: "0.36",
        miss: "Multiply only the bottom, and the fraction changes. Multiply the top by the same number." },
      /* practice 7: answer in the plan = No. 6 does not go exactly into 10, 100 or 1000, so 1/6 has no such form
         (a Yes/No choice: the plan's "Explain." is the correction's job, which shows 10, 100 and 1,000 each leaving 4) */
      { qid: "M1.S2.T5.C22:7", kind: "never", num: 1, den: 6, near: "yes", winMs: 3400,
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        say: "Can 1/6 be written with a denominator of 10, 100 or 1,000?", ask: "Can it reach 10, 100 or 1,000?", answer: "no",
        miss: "Slide all the way along. Does 6 times anything land on 10 or 100?" },
    ],
  },
  {
    n: 4,
    concept: "Decimals back to fractions",
    conceptId: "M1.S2.T5.C23", objectiveIds: ["O8"],
    says: ["Count the digits after the point. Then find the biggest factor both terms share."],
    /* tries, as the plan writes it: First rung: count the digits after the point. Second rung: write the fraction over 10, 100 or 1000. Third rung: the same task with one digit after the point, before longer decimals return. */
    ladder: ["Write the digits without the point over 10, 100 or 1,000.", "Tap Factors, then divide the top and the bottom by the lit one."],
    closing: "A decimal goes over 1 with a zero for each digit after the point, then is divided by the HCF.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: digits over 10, 100 or 1,000, then divide by the HCF",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The digits after the point light one by one with a zero on the denominator for each, the common factors fill with the HCF lit, and both terms are divided by it to lowest terms, in green.",
    items: [
      /* learn FC4: answer in the plan = 87/20 */
      { qid: "M1.S2.T5.C23:FC4", kind: "back", dec: "4.35", parts: SLOT_FRACTION, near: "435|100", winMs: 3400,
        say: "Write 4.35 as a fraction in lowest terms.", ask: "As a fraction in lowest terms", answer: [87, 20],
        miss: "4.35 is 435 hundredths. Divide both terms by their HCF to finish." },
      /* practice 6: answer in the plan = 4/5. 0.8 = 8/10, and dividing both terms by their HCF, 2, gives 4/5 */
      { qid: "M1.S2.T5.C23:6", kind: "back", dec: "0.8", parts: SLOT_FRACTION, near: "8|10", winMs: 3400,
        say: "Now 0.8, in lowest terms too.", ask: "As a fraction in lowest terms", answer: [4, 5],
        miss: "One digit after the point means 10 at the bottom. What do 8 and 10 share?" },
      /* practice 8: answer in the plan = 241/20. 12.05 = 1205/100, and dividing both terms by their HCF, 5, gives 241/20 */
      { qid: "M1.S2.T5.C23:8", kind: "back", dec: "12.05", parts: SLOT_FRACTION, near: "1205|100", winMs: 3400,
        say: "Last, 12.05. Watch the zero after the point.", ask: "As a fraction in lowest terms", answer: [241, 20],
        miss: "Two digits after the point make 1205 hundredths. Is that as small as it gets?" },
    ],
  },
];

/* ── the maths the picture uses (fc… names: tools and the runtime share one scope) ─────────── */
const FC_TENS = [10, 100, 1000];
const fcIsTen = (d: number) => FC_TENS.indexOf(d) >= 0;
/* the zeros a denominator ends in: the zeros counter counts these, left to right */
const fcTrail = (d: number) => { let z = 0, x = Math.round(d); while (x > 0 && x % 10 === 0) { z++; x = x / 10; } return z; };
/* what the count writes: N's digits with the point before the last `places` of them, zeros in front
   where N runs out, and the whole number (or a 0) in the ones place */
const fcDecimal = (whole: number, N: number, places: number) => {
  const s = String(N).padStart(places + 1, "0");
  const head = String(Number(s.slice(0, s.length - places)) + whole);
  return places ? head + "." + s.slice(s.length - places) : head;
};
/* every factor two terms share, smallest first: the last one is their HCF */
const fcCommon = (a: number, b: number) => { const out: number[] = []; for (let k = 1; k <= Math.min(a, b); k++) if (a % k === 0 && b % k === 0) out.push(k); return out; };
/* a decimal written back: its digits without the point over 10, 100 or 1000, one zero for each digit after the point */
const fcBack = (dec: string) => { const [a, b = ""] = String(dec).split("."); return { N: Number(a + b), places: b.length, D: Math.pow(10, b.length) }; };
/* the Times both slider: 1 to 25 on a question (7/20 and 9/25 land only on 100; 1/6 never lands); Free play
   adds 40, 50, 125, 250 and 500, so every fraction that has a form over 10, 100 or 1000 can reach it (1/8 at 125) */
const FC_STOPS = Array.from({ length: 25 }, (_, k) => k + 1);
const FC_FREE_STOPS = [...FC_STOPS, 40, 50, 125, 250, 500];
/* the first stop that lands a denominator on 10, 100 or 1000 (0: none does) */
const fcLand = (den: number, stops: number[]) => stops.find((m) => fcIsTen(den * m)) || 0;
/* Free play opens on the book's own examples: 43/100 one way, 2.75 the other */
const FC_FREE_START = { num: 43, den: 100, dec: "2.75" };

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { tens: FC_TENS, timesStops: FC_STOPS, freeTimesStops: FC_FREE_STOPS, freeStart: FC_FREE_START,
  colours: { given: CONTENT.hundred, answer: CONTENT.one, working: CONTENT.ten, placeHolder: "#767676" } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? A decimal is a string in its written form and is judged exactly
   ("0.67", never ".67" or "0.670"); a fraction must be in lowest terms (87 over 20, not 435 over 100); the
   Yes/No question takes the choice's id */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: a decimal by
   dividing and finding the places it needs, a fraction from thousandths by Euclid's remainders, and the
   Yes/No by asking whether the fraction's lowest denominator goes into 1,000 */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const euclid = (a: number, b: number): number => (b ? euclid(b, a % b) : a);
  if (it.dec !== undefined) {
    const a = Math.round(Number(it.dec) * 1000), g = euclid(a, 1000);
    return Array.isArray(it.answer) && it.answer[0] === a / g && it.answer[1] === 1000 / g;
  }
  if (it.choices) return (1000 % (it.den / euclid(it.den, it.num)) === 0 ? "yes" : "no") === it.answer;
  const value = (it.whole || 0) + it.num / it.den;
  const p = [1, 2, 3].find((k) => Math.abs(Math.round(value * Math.pow(10, k)) - value * Math.pow(10, k)) < 1e-6);
  return p !== undefined && value.toFixed(p) === it.answer;
}));
/* the most likely wrong answer (each item's own misconception: one place short, the zeros in front left out,
   the one zero of 20 counted, only the bottom multiplied, stopping before lowest terms); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : item.choices ? [String(item.answer)]
  : [String(item.answer), speakable(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): toolApi.answer strips everything but digits, so a decimal is typed with its point
   here (PATTERNS §4); a fraction and the Yes/No go the runtime's own way (undefined) */
const answer = (item: any, v: any) => (typeof item.answer === "string" && !item.choices && HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
/* where things sit on the working area: the fraction card top left, the digit cards along the top right
   (right edge 1040, 80 wide on a pitch of 92; the point opens a gap of 44), the controls under the card,
   the Times both slider and the Factors row under them */
const FCG = { cardX: 40, cardY: 24, cardH: 210, rowR: 1040, rowY: 40, slotW: 80, slotH: 100, pitch: 92, gap: 44,
  keyY: 262, keyH: 110, trackX0: 60, trackX1: 640, trackY: 474, chipY: 420, dig: 36 };
/* how many digit cards a question's row can hold (before the count, while sliding, and finished), so its
   row starts just right of the card (x 420) instead of at the far edge; Free play keeps the far edge */
const fcSlots = (it: any) => {
  if (it.dec !== undefined) return String(it.dec).replace(".", "").length;
  const m = it.kind === "reach" ? fcLand(it.den, FC_STOPS) : 1, lenT = String(it.num * m).length, pl = fcTrail(it.den * m);
  const done = Math.max(lenT, pl) + (lenT <= pl ? String(it.whole || 0).length : 0);
  return Math.max(done, it.kind === "reach" || it.kind === "never" ? String(it.num * FC_STOPS.length).length : 0);
};
const FC_CLEAR_F2D = { zeros: 0, swept: 0, fill: 0, enter: 0, point: 0, ones: false, green: false };
const FC_CLEAR_D2F = { backN: -1, facN: 0, divided: false };
/* one question's picture, fresh: dir f2d (a fraction to a decimal) or d2f (a decimal back to a fraction) */
const fcFresh = (it: any, key: string) => ({
  key, dir: it.dec !== undefined && !it.num ? "d2f" : "f2d",
  whole: it.whole || 0, num: it.num || 1, den: it.den || 10, dec: it.dec || FC_FREE_START.dec, mult: 1,
  ...FC_CLEAR_F2D, ...FC_CLEAR_D2F, proof: 0, no: false, ring: false, hot: false, edit: null as any, buf: "",
});

function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR) */
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const it: any = free ? FC_FREE_START : item || {};
  const key = free ? "free" : n + ":" + index;
  const [raw, setRaw] = useState<any>(() => fcFresh(it, key));
  const s = raw.key === key ? raw : fcFresh(it, key);
  const sRef = useRef<any>(s);
  sRef.current = s;
  /* every change merges into the latest picture of this question (a timeline step runs later) */
  const upd = (fn: (p: any) => any) => setRaw((p: any) => { const b = p.key === key ? p : fcFresh(it, key); return { ...b, ...fn(b) }; });
  const put = (o: any) => upd(() => o);
  const tick = () => api.sfx.tick();

  /* Enter goes straight to the slot: every answer here is typed */
  api.onEnter(null);

  /* a new question, a new phase or Free play: a fresh picture */
  useEffect(() => { tl.stop(); setRaw(fcFresh(it, key)); }, [key]);

  const f2d = s.dir === "f2d";
  const stops = free ? FC_FREE_STOPS.filter((m) => m === 1 || String(s.num * m).length <= 6) : FC_STOPS;
  const showSlider = f2d && (free || it.kind === "reach" || it.kind === "never");
  const playable = (stage === "teach" || stage === "ask" || free) && !tl.busy;
  const stepW = (FCG.trackX1 - FCG.trackX0) / (stops.length - 1);
  const nearest = (x: number) => Math.min(stops.length - 1, Math.max(0, Math.round((x - FCG.trackX0) / stepW)));

  /* ── Free play: the pad is lent to a card cell or the digit row the child tapped (api.capture) ── */
  const applyEdit = (p: any) => {
    const v = String(p.buf || ""), out: any = { edit: null, buf: "" };
    if (p.edit === "num" && /^\d+$/.test(v) && Number(v) >= 1) Object.assign(out, { num: Number(v), whole: 0, mult: 1 }, FC_CLEAR_F2D);
    if (p.edit === "den" && /^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 1000) Object.assign(out, { den: Number(v), mult: 1 }, FC_CLEAR_F2D);
    if (p.edit === "dec") {
      const [a, f = ""] = v.split(".");
      const dec = String(Number(a || "0")) + "." + f;
      if (/^\d{1,3}$/.test(f) && Number(dec) > 0) Object.assign(out, { dec }, FC_CLEAR_D2F);
    }
    return out;
  };
  const endEdit = () => { if (!sRef.current.edit) return; api.capture(null); upd(applyEdit); };
  const onKey = (k: string) => {
    if (k === "enter") { endEdit(); return; }
    upd((p: any) => {
      if (!p.edit) return {};
      if (k === "clear") return { buf: "" };
      if (k === "back") return { buf: p.buf.slice(0, -1) };
      if (k === "point") return p.edit === "dec" && !p.buf.includes(".") ? { buf: (p.buf || "0") + "." } : {};
      if (!/^\d$/.test(k)) return {};
      const b = p.buf + k, [a, f] = b.split(".");
      if (p.edit === "num" && b.length > 3) return {};
      if (p.edit === "den" && (b.length > 4 || Number(b) > 1000)) return {};
      if (p.edit === "dec" && (f === undefined ? a.length > 2 : f.length > 3)) return {};
      return { buf: b };
    });
  };
  const startEdit = (which: string) => {
    if (!playable) return;
    if (sRef.current.edit && sRef.current.edit !== which) upd(applyEdit);
    put({ edit: which, buf: "" });
    api.capture(onKey);
  };
  /* the runtime took the pad back (a tap on the slot, restart, the summary): keep what was typed */
  useEffect(() => { if (!captured && sRef.current.edit) upd(applyEdit); }, [captured]);

  /* ── the Times both slider: a drag snaps to the nearest stop (by x only); a tap, Enter or Space steps on ── */
  const onSlide = (payload: any, p: any, moved: boolean) => {
    if (payload !== "times" || !playable) return;
    endEdit();
    const cur = Math.max(0, stops.indexOf(sRef.current.mult));
    const k = moved && isFinite(p.x) ? nearest(p.x) : (cur + 1) % stops.length;
    if (stops[k] === sRef.current.mult) return;
    put({ mult: stops[k], ...FC_CLEAR_F2D });
    if (fcIsTen(sRef.current.den * stops[k])) tick();
  };
  const drag = useDrag(onSlide);
  const dragging = showSlider && drag.drag && drag.drag.payload === "times" ? drag.drag : null;
  const liveMult = dragging ? stops[nearest(dragging.x)] : s.mult;
  const moving = liveMult !== s.mult;

  /* what the picture shows */
  const N = s.num * liveMult, D = s.den * liveMult;
  const need = fcTrail(D), ten = fcIsTen(D), places = ten ? need : 0;
  const digits = String(N);
  const z = moving ? 0 : s.zeros, sw = moving ? 0 : s.swept;
  const decimal = fcDecimal(s.whole, N, places);
  const bk = fcBack(s.dec), common = fcCommon(bk.N, bk.D), hcf = common[common.length - 1] || 1;
  const counted = f2d ? sw : Math.max(0, s.backN);

  /* ── the controls ── */
  const zerosOn = playable && f2d && !moving && s.zeros < need && !s.green;
  const countOn = playable && f2d && !moving && ten && s.zeros === need && s.swept === 0;
  const backOn = playable && !f2d && s.backN < 0 && bk.places > 0 && !s.edit;
  const factorsOn = playable && !f2d && s.backN === bk.places && s.facN === 0;
  const pressZeros = () => { endEdit(); upd((p: any) => (p.zeros < fcTrail(p.den * p.mult) ? { zeros: p.zeros + 1 } : {})); tick(); };
  /* what the count finishes with: grey zero cards slide in where the numerator runs out, the point drops,
     the ones place fills, and the decimal is written green (Free play at once; a question only on the
     win or in the correction, so nothing prints the answer before it is given) */
  const doneSteps = (len: number, pl: number, st: any, quick: boolean) => {
    const out: any[] = [];
    for (let f = st.fill + 1; f <= Math.max(0, pl - len); f++)
      out.push([40, () => put({ fill: f, enter: f })], [quick ? 170 : 320, () => { put({ enter: 0 }); tick(); }]);
    if (st.point < 2) out.push([40, () => put({ point: 1 })], [quick ? 260 : 480, () => put({ point: 2 })]);
    if (len <= pl && !st.ones) out.push([quick ? 180 : 400, () => { put({ ones: true }); tick(); }]);
    if (!st.green) out.push([200, () => put({ green: true })]);
    return out;
  };
  const pressCount = () => {
    endEdit();
    const st = sRef.current, steps: any[] = [];
    for (let k = st.swept + 1; k <= places; k++) steps.push([340, () => { put({ swept: k }); tick(); }]);
    if (free) steps.push(...doneSteps(digits.length, places, st, false));
    tl.run(steps);
  };
  const pressBack = () => {
    endEdit();
    const st = sRef.current, b0 = fcBack(st.dec), steps: any[] = [];
    for (let b = st.backN + 1; b <= b0.places; b++) steps.push([420, () => { put({ backN: b }); if (b > 0) tick(); }]);
    tl.run(steps);
  };
  const pressFactors = () => {
    endEdit();
    const st = sRef.current, b0 = fcBack(st.dec), cm = fcCommon(b0.N, b0.D), steps: any[] = [];
    for (let f = st.facN + 1; f <= cm.length; f++) steps.push([360, () => { put({ facN: f }); tick(); }]);
    if (free) steps.push([600, () => put({ divided: true })]);
    tl.run(steps);
  };
  /* Free play's Turn: a finished decimal goes back to the fraction side, a finished fraction to the decimal side */
  const pressTurn = () => {
    endEdit();
    upd((p: any) => {
      if (p.dir === "f2d") {
        const NN = p.num * p.mult, DD = p.den * p.mult;
        return p.green ? { dir: "d2f", dec: fcDecimal(p.whole, NN, fcTrail(DD)), ...FC_CLEAR_D2F } : { dir: "d2f" };
      }
      const b0 = fcBack(p.dec), cm = fcCommon(b0.N, b0.D), g = cm[cm.length - 1] || 1;
      return p.divided ? { dir: "f2d", whole: 0, num: b0.N / g, den: b0.D / g, mult: 1, ...FC_CLEAR_F2D } : { dir: "f2d" };
    });
  };

  /* ── the whole method from where the picture stands: the correction draws it slowly from a fresh picture,
     the win finishes it quickly from wherever the child left it ── */
  const solveSteps = (st: any, quick: boolean) => {
    const out: any[] = [];
    if (st.dir === "d2f") {
      const b0 = fcBack(st.dec), cm = fcCommon(b0.N, b0.D);
      for (let b = st.backN + 1; b <= b0.places; b++) out.push([quick ? 170 : 440, () => { put({ backN: b }); if (b > 0) tick(); }]);
      for (let f = st.facN + 1; f <= cm.length; f++) out.push([quick ? 150 : 400, () => { put({ facN: f }); tick(); }]);
      if (!st.divided) out.push([quick ? 300 : 650, () => put({ divided: true })]);
      return out;
    }
    if (it.kind === "never") {
      /* the slider runs to its end and never lands; then 10, 100 and 1,000 each leave 4 when shared by 6 */
      for (let m = st.mult + 1; m <= FC_STOPS.length; m++) out.push([quick ? 25 : 90, () => put({ mult: m, ...FC_CLEAR_F2D })]);
      for (let r = st.proof + 1; r <= 3; r++) out.push([quick ? 220 : 700, () => { put({ proof: r }); tick(); }]);
      if (!st.no) out.push([300, () => put({ no: true })]);
      return out;
    }
    let mult = st.mult, z0 = st.zeros, w0 = st.swept, base = st;
    if (it.kind === "reach") {
      const target = fcLand(st.den, FC_STOPS);
      if (mult !== target) {
        /* Count stays off and rings once; the handle lights where to start, then steps up to 100 */
        if (!quick) out.push([700, () => put({ ring: true })], [80, () => put({ ring: false, hot: true })]);
        if (mult > target) out.push([quick ? 200 : 420, () => put({ mult: target, ...FC_CLEAR_F2D })]);
        else for (let m = mult + 1; m <= target; m++) out.push([quick ? 120 : 400, () => { put({ mult: m, ...FC_CLEAR_F2D }); if (m === target) tick(); }]);
        mult = target; z0 = 0; w0 = 0; base = { ...st, ...FC_CLEAR_F2D };
      }
    }
    const pl = fcTrail(st.den * mult), len = String(st.num * mult).length;
    for (let k = z0 + 1; k <= pl; k++) out.push([quick ? 150 : 430, () => { put({ zeros: k, hot: false }); tick(); }]);
    for (let k = w0 + 1; k <= pl; k++) out.push([quick ? 150 : 400, () => { put({ swept: k }); tick(); }]);
    return out.concat(doneSteps(len, pl, base, quick));
  };
  /* the correction: lock, redraw the method from the start, end on the whole right answer, unlock */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const base = fcFresh(it, key);
    setRaw(base);
    tl.run([[450, null], ...solveSteps(base, false)], () => { put({ hot: false }); api.lock(false); });
  }, [wrong]);
  /* the win: the maths finishes moving (the point drops, the card settles) */
  useEffect(() => {
    if (stage === "win") tl.run(solveSteps(sRef.current, true));
  }, [stage]);

  /* the teacher agent types a decimal with its point (toolApi.answer would strip it) */
  HOOK.type = (v: any) => { api.setTyped(String(v ?? "").replace(/[^0-9.]/g, "").slice(0, 9)); return true; };

  /* what the host and the agent read back (toolApi.getState); never the answer before it is given */
  api.share({
    direction: f2d ? "to decimal" : "to fraction",
    fraction: f2d ? (s.whole ? s.whole + " " : "") + N + "/" + D
      : s.backN < 0 ? null : s.divided ? bk.N / hcf + "/" + bk.D / hcf : bk.N + "/" + Math.pow(10, s.backN),
    zeros: z, counted, times: liveMult,
    decimal: f2d ? (s.green && !moving ? decimal : null) : s.dec,
    factors: f2d ? [] : common.slice(0, s.facN),
  });

  /* ── drawing (helpers are called, never mounted) ── */
  const blue = shade(CONTENT.hundred, 0.25), green = shade(CONTENT.one, 0.25), amber = CONTENT.ten;
  const amberInk = shade(CONTENT.ten, 0.45), grey = "#767676";
  const motion = !reducedMotion();
  const at = (x: number, y: number) => ({ transform: `translate(${x}px, ${y}px)`, transition: motion ? "transform 320ms ease-out" : undefined } as any);
  const inkOf = (on: boolean) => (on ? C.ink : shade(C.dim, 0.35));

  /* the fraction card */
  const numStr = s.edit === "num" ? s.buf : String(N), denStr = s.edit === "den" ? s.buf : String(D);
  const wholeW = f2d && s.whole ? String(s.whole).length * 46 + 22 : 0;
  const termLen = f2d ? Math.max(numStr.length, denStr.length, 1) : Math.max(String(bk.N).length, String(bk.D).length);
  const barW = termLen * FCG.dig + 28;
  const cardW = Math.max(190, 28 + wholeW + barW + 28);
  const fx = FCG.cardX + 28 + wholeW + barW / 2;
  const yNum = FCG.cardY + 86, yBar = FCG.cardY + 108, yDen = FCG.cardY + 186;
  const digitsAt = (str: string, y: number, fill: string, litFrom = -1, litTo = -1) => str.split("").map((ch, i) => {
    const x = fx + (i - (str.length - 1) / 2) * FCG.dig, lit = i >= litFrom && i < litTo;
    return (
      <g key={i}>
        {lit && <rect x={x - 19} y={y - 48} width={38} height={58} rx={8} fill={tint(amber, 0.55)} stroke={amber} strokeWidth={3} />}
        <text x={x} y={y} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={fill}>{ch}</text>
      </g>
    );
  });
  const caretAt = (str: string, y: number) => (
    <rect x={fx + (str.length / 2) * FCG.dig + 4} y={y - 44} width={5} height={50} fill={amber} />
  );
  const card = () => {
    const bar = <line x1={fx - barW / 2 + 6} y1={yBar} x2={fx + barW / 2 - 6} y2={yBar} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />;
    let body: any;
    if (f2d) {
      const litFrom = denStr.length - need;
      body = (
        <g>
          {s.whole ? <text x={FCG.cardX + 28} y={FCG.cardY + 131} fontSize={T.display} fontWeight={700} fill={blue}>{s.whole}</text> : null}
          {s.edit === "num" && <rect x={fx - barW / 2} y={yNum - 62} width={barW} height={76} rx={10} fill="none" stroke={amber} strokeWidth={3} strokeDasharray="10 8" />}
          {s.edit === "den" && <rect x={fx - barW / 2} y={yDen - 62} width={barW} height={76} rx={10} fill="none" stroke={amber} strokeWidth={3} strokeDasharray="10 8" />}
          {digitsAt(numStr, yNum, blue)}
          {bar}
          {digitsAt(denStr, yDen, C.ink, s.edit ? -1 : litFrom, s.edit ? -1 : litFrom + z)}
          {s.edit === "num" && caretAt(numStr, yNum)}
          {s.edit === "den" && caretAt(denStr, yDen)}
        </g>
      );
    } else if (s.backN < 0) {
      /* before Back: two empty places waiting for the terms */
      body = (
        <g>
          <rect x={fx - barW / 2 + 6} y={yNum - 58} width={barW - 12} height={68} rx={10} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="10 8" />
          {bar}
          <rect x={fx - barW / 2 + 6} y={yDen - 58} width={barW - 12} height={68} rx={10} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="10 8" />
        </g>
      );
    } else {
      const nn = s.divided ? bk.N / hcf : bk.N, dd = s.divided ? bk.D / hcf : Math.pow(10, s.backN);
      body = (
        <g>
          <text x={fx} y={yNum} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={s.divided ? green : blue}>{nn}</text>
          {bar}
          <text x={fx} y={yDen} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={s.divided ? green : C.ink}>{dd}</text>
        </g>
      );
    }
    /* both terms multiplied (or divided) by the same number, written beside each term */
    const side = f2d ? (liveMult > 1 ? "× " + liveMult : "") : s.divided && hcf > 1 ? "÷ " + hcf : "";
    return (
      <g>
        <rect x={FCG.cardX} y={FCG.cardY} width={cardW} height={FCG.cardH} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2.5} filter="url(#fShadowSoft)" />
        {body}
        {side && (
          <g pointerEvents="none">
            <text x={FCG.cardX + cardW + 14} y={yNum - 8} fontSize={T.label} fontWeight={700} fill={amberInk}>{side}</text>
            <text x={FCG.cardX + cardW + 14} y={yDen - 8} fontSize={T.label} fontWeight={700} fill={amberInk}>{side}</text>
          </g>
        )}
        {free && f2d && (
          <g>
            <Hit id="fc-top" x={FCG.cardX} y={FCG.cardY} w={cardW} h={105} label="type a numerator" onPress={() => startEdit("num")} enabled={playable && !(captured && s.edit === "num")} />
            <Hit id="fc-bottom" x={FCG.cardX} y={FCG.cardY + 105} w={cardW} h={105} label="type a denominator" onPress={() => startEdit("den")} enabled={playable && !(captured && s.edit === "den")} />
          </g>
        )}
      </g>
    );
  };

  /* the digit cards: slot j counts from the right; the point opens a gap before slot `gapAt` */
  const rowR = free ? FCG.rowR : 420 + fcSlots(it) * FCG.pitch + 32;
  const slotX = (j: number, gapAt: number) => rowR - FCG.slotW - j * FCG.pitch - (gapAt >= 0 && j >= gapAt ? FCG.gap : 0);
  const slotCard = (k: string, j: number, gapAt: number, ch: string, look: string, dx = 0) => {
    const ring = look === "lit" || look === "empty";
    const fill = look === "lit" ? tint(amber, 0.6) : look === "fill" ? "#F2F2F2" : "#FFFFFF";
    const stroke = ring ? amber : look === "fill" ? "#9A9A9A" : C.rule;
    return (
      <g key={k} style={at(slotX(j, gapAt) + dx, FCG.rowY)}>
        <rect x={0} y={0} width={FCG.slotW} height={FCG.slotH} rx={14} fill={look === "empty" ? "none" : fill} stroke={stroke}
          strokeWidth={ring ? 3.5 : 2.5} strokeDasharray={look === "empty" ? "10 8" : undefined} />
        {ch !== "" && <text x={FCG.slotW / 2} y={70} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={look === "fill" || ch === "0" ? grey : blue}>{ch}</text>}
      </g>
    );
  };
  const pointDot = (gapAt: number, dropped: boolean) => (
    <g key="pt" style={at(rowR - gapAt * FCG.pitch - 16, dropped ? FCG.rowY + 86 : FCG.rowY - 26)}>
      <circle cx={0} cy={0} r={11} fill={C.ink} />
    </g>
  );
  const rowF2D = () => {
    const len = digits.length, out: any[] = [];
    const gapAt = !moving && s.point >= 1 ? places : -1, dropped = !moving && s.point >= 2;
    for (let j = 0; j < len; j++) out.push(slotCard("s" + j, j, gapAt, digits[len - 1 - j], sw > j && !dropped ? "lit" : "own"));
    if (ten && !moving) {
      for (let j = len; j < places; j++) {
        const f = j - len + 1;
        if (s.fill >= f) out.push(slotCard("f" + j, j, gapAt, "0", "fill", s.enter === f ? -70 : 0));
        else if (sw > j) out.push(slotCard("e" + j, j, gapAt, "", "empty"));
      }
      if (len <= places && s.ones)
        (s.whole ? String(s.whole) : "0").split("").reverse().forEach((ch, t) => out.push(slotCard("o" + t, places + t, gapAt, ch, s.whole ? "own" : "fill")));
      if (s.point >= 1) out.push(pointDot(places, dropped));
    }
    return out;
  };
  const rowD2F = () => {
    const out: any[] = [], editing = s.edit === "dec";
    const [a, f] = String(editing ? s.buf : s.dec).split(".");
    const fr = f === undefined ? "" : f, gapAt = f === undefined ? -1 : fr.length;
    for (let j = 0; j < fr.length; j++) out.push(slotCard("s" + j, j, gapAt, fr[fr.length - 1 - j], !editing && fr.length - 1 - j < s.backN ? "lit" : "own"));
    for (let t = 0; t < a.length; t++) out.push(slotCard("i" + t, fr.length + t, gapAt, a[a.length - 1 - t], "own"));
    if (editing && !a && f === undefined) out.push(slotCard("e0", 0, -1, "", "empty"));
    if (f !== undefined) out.push(pointDot(fr.length, true));
    if (editing) out.push(<rect key="caret" x={FCG.rowR + 8} y={FCG.rowY + 10} width={6} height={80} fill={amber} />);
    return out;
  };

  /* the slider handle, live only while the child may play */
  const slider = () => {
    const idx = Math.max(0, stops.indexOf(s.mult));
    const hx = dragging ? Math.min(FCG.trackX1, Math.max(FCG.trackX0, dragging.x)) : FCG.trackX0 + idx * stepW;
    return (
      <g>
        <text x={40} y={420} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("times both")}</text>
        <line x1={FCG.trackX0} y1={FCG.trackY} x2={FCG.trackX1} y2={FCG.trackY} stroke={C.rule} strokeWidth={8} strokeLinecap="round" />
        {stops.map((m, k) => <line key={k} x1={FCG.trackX0 + k * stepW} y1={FCG.trackY - 14} x2={FCG.trackX0 + k * stepW} y2={FCG.trackY + 14} stroke={shade(C.rule, 0.2)} strokeWidth={2.5} />)}
        <g {...control("fc-times", "times both slider")} tabIndex={playable ? 0 : -1} aria-disabled={playable ? undefined : "true"}
          {...(playable ? drag.bind("times") : {})} {...(playable ? drag.keys("times") : {})}>
          <rect x={hx - 52} y={FCG.trackY - 36} width={104} height={72} rx={18} fill="url(#gAccent)" stroke={s.hot ? amber : shade(C.accent, 0.18)} strokeWidth={s.hot ? 6 : 2} />
          <text x={hx} y={FCG.trackY + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{"× " + liveMult}</text>
        </g>
      </g>
    );
  };

  /* the one thing to touch next (a question only) */
  let inv: any = null;
  if (!free && (stage === "teach" || stage === "ask") && !tl.busy) {
    const hx = FCG.trackX0 + Math.max(0, stops.indexOf(s.mult)) * stepW;
    if (f2d) {
      if (showSlider && !ten && !(it.kind === "never" && s.mult > 1)) inv = [hx, FCG.trackY, 52];
      else if (ten && s.zeros < need) inv = [135, FCG.keyY + 55, 66];
      else if (ten && s.swept === 0) inv = [370, FCG.keyY + 55, 66];
    } else if (s.backN < 0) inv = [135, FCG.keyY + 55, 66];
    else if (s.facN === 0) inv = [370, FCG.keyY + 55, 66];
  }

  return (
    <g>
      {/* the running count: how many places after the point have been counted, one for each digit lit */}
      <g data-zone="runs" pointerEvents="none">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={20} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("after the point")}</text>
        <text x={312} y={-36} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={C.ink}>{counted}</text>
      </g>

      {card()}
      {f2d ? rowF2D() : rowD2F()}
      {free && !f2d && (
        <Hit id="fc-row" x={420} y={FCG.rowY} w={FCG.rowR - 420} h={FCG.slotH} label="type a decimal" onPress={() => startEdit("dec")} enabled={playable && !(captured && s.edit === "dec")} />
      )}
      {f2d && s.green && !moving && (
        <text x={rowR - 4} y={232} textAnchor="end" fontSize={T.display} fontWeight={700} fill={green} pointerEvents="none">{decimal}</text>
      )}

      {f2d ? (
        <g>
          <Key id="fc-zeros" x={40} y={FCG.keyY} w={190} h={FCG.keyH} C={C} disabled={!zerosOn} onClick={pressZeros} label="zeros counter">
            <text y={-14} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={inkOf(zerosOn)}>{tx("zeros")}</text>
            <text y={36} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={inkOf(zerosOn)}>{z}</text>
          </Key>
          <Key id="fc-count" x={270} y={FCG.keyY} w={200} h={FCG.keyH} C={C} disabled={!countOn} onClick={pressCount} label="count">
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(countOn)}>{tx("Count")}</text>
          </Key>
          {s.ring && <rect x={262} y={FCG.keyY - 8} width={216} height={FCG.keyH + 16} rx={24} fill="none" stroke={amber} strokeWidth={5} pointerEvents="none" />}
        </g>
      ) : (
        <g>
          <Key id="fc-back" x={40} y={FCG.keyY} w={190} h={FCG.keyH} C={C} disabled={!backOn} onClick={pressBack} label="back to a fraction">
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(backOn)}>{tx("Back")}</text>
          </Key>
          <Key id="fc-factors" x={270} y={FCG.keyY} w={200} h={FCG.keyH} C={C} disabled={!factorsOn} onClick={pressFactors} label="common factors">
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(factorsOn)}>{tx("Factors")}</text>
          </Key>
        </g>
      )}
      {free && (
        <Key id="fc-turn" x={510} y={FCG.keyY} w={190} h={FCG.keyH} C={C} disabled={!playable} onClick={pressTurn} label="turn it the other way">
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(playable)}>{tx("Turn")}</text>
        </Key>
      )}

      {showSlider && slider()}

      {/* the Factors row: every factor both terms share, the HCF lit */}
      {!f2d && s.facN > 0 && (
        <g pointerEvents="none">
          <text x={40} y={404} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("common factors")}</text>
          {common.slice(0, s.facN).map((fct, k) => {
            const lit = s.facN === common.length && k === common.length - 1, x = 40 + k * 86;
            return (
              <g key={k}>
                <rect x={x} y={FCG.chipY} width={76} height={64} rx={14} fill={lit ? tint(amber, 0.55) : "#FFFFFF"} stroke={lit ? amber : C.rule} strokeWidth={lit ? 3.5 : 2} />
                <text x={x + 38} y={FCG.chipY + 44} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{fct}</text>
                {lit && <text x={x + 38} y={FCG.chipY + 96} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={amberInk}>{tx("HCF")}</text>}
              </g>
            );
          })}
        </g>
      )}

      {/* 1/6 in the correction: 10, 100 and 1,000 shared by 6 each leave 4, so no denominator of 10, 100 or 1,000 */}
      {it.kind === "never" && f2d && s.proof > 0 && (
        <g pointerEvents="none">
          {FC_TENS.slice(0, s.proof).map((t, k) => (
            <g key={k}>
              <text x={880} y={300 + k * 64} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(t) + " ÷ " + s.den}</text>
              <text x={900} y={300 + k * 64} fontSize={T.label} fontWeight={600} fill={amberInk}>{tx("leaves") + " " + (t % s.den)}</text>
            </g>
          ))}
          {s.no && <text x={900} y={500} fontSize={T.xl} fontWeight={700} fill={green}>{tx("No")}</text>}
        </g>
      )}

      {inv && <Invite x={inv[0]} y={inv[1]} r={inv[2]} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const ph: any = PHASES[(n || 1) - 1], it: any = last && ph ? ph.items[last.item] : null;
  if (!it) return null;
  const blue = shade(CONTENT.hundred, 0.25), green = shade(CONTENT.one, 0.25);
  const fw = (a: any, b: any) => Math.max(String(a).length, String(b).length) * 17 + 10;
  const stack = (cx: number, a: any, b: any, col: string) => (
    <g>
      <text x={cx} y={34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={col}>{a}</text>
      <line x1={cx - fw(a, b) / 2} y1={43} x2={cx + fw(a, b) / 2} y2={43} stroke={col} strokeWidth={3} strokeLinecap="round" />
      <text x={cx} y={73} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={col}>{b}</text>
    </g>
  );
  let body: any;
  if (it.dec !== undefined) {
    const [a, b] = it.answer, dw = it.dec.length * 18;
    body = (
      <g>
        <text x={10} y={55} fontSize={T.label} fontWeight={700} fill={blue}>{it.dec}</text>
        <text x={14 + dw} y={55} fontSize={T.label} fontWeight={600} fill={C.ink}>=</text>
        {stack(44 + dw + fw(a, b) / 2, a, b, green)}
      </g>
    );
  } else {
    const ww = it.whole ? String(it.whole).length * 18 + 4 : 0, f = fw(it.num, it.den), ex = 10 + ww + f + 6;
    body = (
      <g>
        {it.whole ? <text x={10} y={55} fontSize={T.label} fontWeight={700} fill={blue}>{it.whole}</text> : null}
        {stack(10 + ww + f / 2, it.num, it.den, blue)}
        {!it.choices && <text x={ex} y={55} fontSize={T.label} fontWeight={600} fill={C.ink}>=</text>}
        <text x={ex + (it.choices ? 6 : 24)} y={55} fontSize={T.label} fontWeight={700} fill={green}>{it.choices ? tx("No") : it.answer}</text>
      </g>
    );
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {body}
    </g>
  );
}

function FractionConverter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, pointKey: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default FractionConverter;
