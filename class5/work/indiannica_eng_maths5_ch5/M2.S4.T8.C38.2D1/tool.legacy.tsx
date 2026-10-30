/* ═══ M2.S4.T8.C38.2D1 · like_maker · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "like_maker";
const MEDIA_ID = "M2.S4.T8.C38.2D1";
const TOOL_NAME = "Like Decimal Maker";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Some decimals, their points all in one line."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "The zeros lined them up, and nothing changed its value.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Make any set of decimals like.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = { hi: {}, gu: {} };

/* the two-part judgement of phase 2's last question: the value, then like or unlike */
const LM_SAME: any = { "same-like": "Same, like", "same-unlike": "Same, unlike", "diff-like": "Not same, like", "diff-unlike": "Not same, unlike" };
const LM_CHOICES = Object.keys(LM_SAME).map((id) => ({ id, label: LM_SAME[id] }));

/* One entry per phase = one mount. Item fields of this tool:
   kind   set   the whole set of cards goes on the Like or the Unlike tray (drag), Enter answers
          pick  the like cards go on the Like tray, one by one (drag), Enter answers
          count the number of decimal places of one card, typed
          same  same value? like? (word keys)
          zeros violet zero chips (and, on phase 4, the point) make the cards like (drag), Enter answers
          write a decimal typed in its written form ("4.70"); the ask says how many places
   cards  the decimals on the working area, in order; near = the misconception, which judge rejects
   places (write) the number of decimal places the question asks for */
const PHASES = [
  {
    n: 1,
    concept: "Like decimals",
    conceptId: "M2.S4.T8.C35", objectiveIds: ["O13"],
    says: ["Count only the digits after the point. Do the counts match?"],
    /* the plan's rungs were stage directions ("Count the next.", "The same task with two cards, before the full
       set returns."): rewritten as lines for the child */
    ladder: ["Count one card at a time.", "Put a finger on the point, then count the digits to its right."],
    closing: "decimals with the same number of decimal places are like decimals",
    learned: "You learned: the same count of decimal places makes like decimals",
    traceback: "The digits before each point fade, the digits after it light and are counted, and the like set settles on the Like tray.",
    items: [
      /* learn LM1: answer in the plan = Each has two decimal places, so they are like decimals */
      { qid: "M2.S4.T8.C35:LM1", kind: "set", cards: ["6.02", "13.47", "0.93"], near: "unlike", pad: "enter",
        say: "How many decimal places do 6.02, 13.47 and 0.93 have? Are they like decimals?", ask: "Count, then pick a tray",
        answer: "like", miss: "Compare the counts on the cards. Is any card different?" },
      /* practice 1: answer in the plan = 3, because three digits come after the point */
      { qid: "M2.S4.T8.C35:1", kind: "count", cards: ["14.306"], near: 5,
        say: "How many decimal places does 14.306 have?", ask: "How many decimal places?",
        answer: 3, miss: "The 1 and the 4 sit before the point, so they are not decimal places." },
      /* practice 4: answer in the plan = 3.14 and 0.72. Each has two decimal places, and 31.4 has one */
      { qid: "M2.S4.T8.C35:4", kind: "pick", cards: ["3.14", "31.4", "0.72"], near: "3.14, 31.4", pad: "enter",
        say: "Which two of 3.14, 31.4 and 0.72 are like decimals?", ask: "Which two are like?",
        answer: "3.14, 0.72", miss: "Same digits do not make them like. Count each card's places." },
    ],
  },
  {
    n: 2,
    concept: "Unlike decimals",
    conceptId: "M2.S4.T8.C36", objectiveIds: ["O13"],
    says: ["One place here, three places there. Which tray?"],
    /* the plan's rungs were stage directions: rewritten as lines for the child */
    ladder: ["Count the first card's places, then the second's.", "Different counts after the point make unlike decimals."],
    closing: "decimals with different numbers of decimal places are unlike decimals",
    learned: "You learned: different counts of decimal places make unlike decimals",
    traceback: "The counts of places stand side by side and the pair settles on the Unlike tray; equal strips show 5.20, 5.2 and 5.200 have one value.",
    items: [
      /* learn LM2: answer in the plan = No. 7.1 has one decimal place and 7.105 has three, so they are unlike decimals */
      { qid: "M2.S4.T8.C36:LM2", kind: "set", cards: ["7.1", "7.105"], near: "like", pad: "enter",
        say: "Are 7.1 and 7.105 like decimals?", ask: "Like or unlike?",
        answer: "unlike", miss: "Starting with 7.1 does not decide it. Count the places." },
      /* practice 2: answer in the plan = Unlike. 0.6 has one decimal place and 0.66 has two */
      { qid: "M2.S4.T8.C36:2", kind: "set", cards: ["0.6", "0.66"], near: "like", pad: "enter",
        say: "Are 0.6 and 0.66 like or unlike decimals?", ask: "Which tray?",
        answer: "unlike", miss: "Which card has more digits to the right of its point?" },
      /* practice 8: answer in the plan = They have the same value, because zeros at the end after the point change nothing. They are unlike decimals, with two, one and three decimal places */
      { qid: "M2.S4.T8.C36:8", kind: "same", cards: ["5.20", "5.2", "5.200"], near: "same-like", choices: LM_CHOICES,
        say: "Do 5.20, 5.2 and 5.200 have the same value? Are they like decimals?", ask: "Same value? Like?",
        answer: "same-unlike", miss: "Check two things: the value, and the places after each point." },
    ],
  },
  {
    n: 3,
    concept: "Zeros after the point",
    conceptId: "M2.S4.T8.C37", objectiveIds: ["O14"],
    says: ["Add zeros after the last digit. Did the shading move?"],
    /* the plan's rungs were stage directions: rewritten as lines for the child */
    ladder: ["Add one zero at a time to a shorter card, then count again.", "Watch the grid: a zero at the end keeps the shading still."],
    closing: "zeros written at the end, after the point, make decimals like and do not change the value",
    learned: "You learned: zeros added at the end, after the point, keep the value",
    traceback: "Zeros put inside slide back to the end, missing zeros settle after the last digit, and the grid keeps its shading.",
    items: [
      /* learn LM3: answer in the plan = 2.400 and 5.136 */
      { qid: "M2.S4.T8.C37:LM3", kind: "zeros", cards: ["2.4", "5.136"], near: "2.004, 5.136", pad: "enter",
        say: "Make 2.4 and 5.136 like decimals.", ask: "Add zeros to make them like",
        answer: "2.400, 5.136", miss: "Match the places of 5.136, adding zeros only at the end." },
      /* practice 3: answer in the plan = 4.70 */
      { qid: "M2.S4.T8.C37:3", kind: "write", cards: ["4.7"], places: 2, near: "4.07",
        say: "Write 4.7 with two decimal places.", ask: "4.7 with two places",
        answer: "4.70", miss: "Two places means two digits after the point." },
      /* practice 5: answer in the plan = 0.300, 0.460 and 0.127 */
      { qid: "M2.S4.T8.C37:5", kind: "zeros", cards: ["0.3", "0.46", "0.127"], near: "0.003, 0.406, 0.127", pad: "enter",
        say: "Now three cards: 0.3, 0.46 and 0.127. Line them all up the same way.", ask: "Make all three like",
        answer: "0.300, 0.460, 0.127", miss: "The longest card sets the count. Fill the others up to it." },
    ],
  },
  {
    n: 4,
    concept: "Whole numbers get a point first",
    conceptId: "M2.S4.T8.C38", objectiveIds: ["O14"],
    says: ["A zero straight onto five makes a new number. What comes first?"],
    /* the brief's opening screen for this phase (5 beside 2.64): the child drops one zero chip on 5 and sees
       it jump to 50, then the questions start */
    demo: { cards: ["5", "2.64"] },
    demoLines: ["Fifty is ten times five. So the point comes first."],
    /* the plan's rungs were stage directions: rewritten as lines for the child */
    ladder: ["Tap Point first on the whole number, then add zeros.", "Give every card as many places as the longest one."],
    closing: "a whole number gets its point first, and zeros are added only after the point",
    learned: "You learned: a whole number gets its point first, then the zeros",
    traceback: "Zeros stuck straight onto a whole number slide off, the point is written after the ones digit, then the zeros settle.",
    items: [
      /* learn LM4: answer in the plan = 8.00 and 3.25 */
      { qid: "M2.S4.T8.C38:LM4", kind: "zeros", cards: ["8", "3.25"], near: "800, 3.25", pad: "enter",
        say: "Make 8 and 3.25 like decimals.", ask: "Make 8 like 3.25",
        answer: "8.00, 3.25", miss: "8 has no point yet. Where does its point go?" },
      /* practice 6: answer in the plan = 12.000. Write the point first, then three zeros after it */
      { qid: "M2.S4.T8.C38:6", kind: "write", cards: ["12"], places: 3, near: "12000",
        say: "Write the whole number 12 with three decimal places.", ask: "12 with three places",
        answer: "12.000", miss: "12 needs its point after the 2, before any zeros." },
      /* practice 7: answer in the plan = 6.000, 2.800 and 0.315 */
      { qid: "M2.S4.T8.C38:7", kind: "zeros", cards: ["6", "2.8", "0.315"], near: "6000, 2.800, 0.315", pad: "enter",
        say: "Now 6, 2.8 and 0.315 together. Which one needs a point first?", ask: "Make all three like",
        answer: "6.000, 2.800, 0.315", miss: "Count the places of 0.315, then bring 6 and 2.8 up to it." },
    ],
  },
];

/* ── the working area's geometry (1086 x 528, origin at its top-left) ─────────────────────── */
const LM_CARD = { x: 24, w: 500, h: 76, cell: 42, whole: 140, point: 153, dec: 166, count: 348 };
const LM_TRAY: any = {
  like: { x: 24, y: 372, w: 440, h: 140, label: "Like decimals" },
  unlike: { x: 512, y: 372, w: 440, h: 140, label: "Unlike decimals" },
};
const LM_MINI = { w: 136, h: 80 };
const LM_GRID = { x: 580, y: 140, s: 280 };
const LM_PILE = { x: 892, y: 24, w: 170, h: 200 };
const LM_CHIP = { x: 925, y: 40, w: 104, h: 84 };
const LM_KEYS: any = {
  count: { x: 820, y: 24, w: 240, h: 80 }, point: { x: 580, y: 24, w: 260, h: 80 },
  back: { x: 892, y: 244, w: 170, h: 80 }, fresh: { x: 892, y: 344, w: 170, h: 80 },
};
const LM_STRIP = { x: 560, w: 240, h: 40 };
const LM_FREE_SETS = [["2.5", "0.75", "6"], ["1.2", "3.45", "0.678"], ["9", "4.5", "12.05"], ["0.7", "15", "2.36"]];
const LM_MAX = 4;

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { card: LM_CARD, trays: LM_TRAY, grid: LM_GRID, demoCards: ["5", "2.64"], freeSets: LM_FREE_SETS, maxPlaces: LM_MAX };

/* ── the written form of a decimal, as the cards hold it ──────────────────────────────────── */
const lmSplit = (s: any) => { const t = String(s ?? ""); const i = t.indexOf("."); return i < 0 ? { w: t, d: "", pt: false } : { w: t.slice(0, i), d: t.slice(i + 1), pt: true }; };
const lmPlaces = (s: any) => lmSplit(s).d.length;
const lmPlacesText = (k: number) => (k === 1 ? "1 place" : k + " places");
const lmCardY = (i: number, count: number) => (count === 1 ? 120 : 24 + i * 96);
const lmNorm = (v: any) => (Array.isArray(v) ? v.map(String) : String(v ?? "").split(/\s*,\s*/)).map((s: string) => s.trim()).filter(Boolean).join(", ");
/* which digits of a form were given and which the child added (zeros, a point) */
function lmView(given: string, form: string) {
  const g = lmSplit(given), f = lmSplit(form);
  let j = 0;
  const dec = f.d.split("").map((c: string) => { if (j < g.d.length && c === g.d[j]) { j++; return { c, added: false }; } return { c, added: true }; });
  return { whole: f.w.split("").map((c: string, i: number) => ({ c, added: i >= g.w.length })), point: f.pt ? (g.pt ? "given" : "added") : null, dec, matched: j === g.d.length };
}
/* is the form the given number with nothing but zeros (and a point) added? */
function lmZerosOnly(given: string, form: string) {
  if (!/^\d+(\.\d*)?$/.test(String(form))) return false;
  const g = lmSplit(given), f = lmSplit(form);
  if (g.pt && !f.pt) return false;
  if (!f.w.startsWith(g.w) || /[^0]/.test(f.w.slice(g.w.length))) return false;
  const v = lmView(given, form);
  return v.matched && v.dec.every((d: any) => !d.added || d.c === "0");
}
/* a correction's path for one card: from what the child made to the right form, one step at a time */
function lmPath(given: string, from: string, to: string) {
  let cur = lmZerosOnly(given, from) ? from : given;
  const seq = [cur];
  if (!to.startsWith(cur)) {
    if (cur.startsWith(to)) { while (cur.length > to.length) { cur = cur.slice(0, -1); seq.push(cur); } return seq; }
    cur = given; seq.push(cur);
  }
  if (!lmSplit(cur).pt && lmSplit(to).pt) { cur += "."; seq.push(cur); }
  while (cur.length < to.length) { cur = to.slice(0, cur.length + 1); seq.push(cur); }
  return seq;
}
/* how many times as big a zero stuck onto the whole part made it ("" when nothing was stuck on) */
const lmTimes = (given: string, form: string) => {
  const k = lmSplit(form).w.length - lmSplit(given).w.length;
  return k <= 0 ? "" : k === 1 ? "10 times as big" : k === 2 ? "100 times as big" : "1,000 times as big";
};

/* the slot shows a short form of a working-area answer (format is not told the item: Work sets LM_NOW) */
let LM_NOW: any = { kind: "", cards: [] };
const lmShown = (v: any) => {
  const s = String(v ?? "");
  if (LM_SAME[s]) return LM_SAME[s];
  if (s === "like") return "Like";
  if (s === "unlike") return "Unlike";
  if (LM_NOW.kind === "zeros" && s.indexOf(",") >= 0) {
    const f = s.split(/\s*,\s*/), ch = f.filter((x: string, i: number) => x !== LM_NOW.cards[i]);
    return (ch.length ? ch : f).join(", ");
  }
  return s;
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a count is digits only; a written decimal is exact ("4.7" is not "4.70"); a set of cards is
   compared card by card, in order */
const judge = (item: any, v: any) => {
  if (item.kind === "count") return /^\d+$/.test(String(v ?? "").trim()) && Number(v) === item.answer;
  if (item.kind === "write") return String(v ?? "").trim() === item.answer;
  if (item.kind === "set" || item.kind === "same") return String(v ?? "").trim().toLowerCase() === item.answer;
  return lmNorm(v) === item.answer;
};
/* oracle: every answer re-derived from the cards by another route (a regex count, Number().toFixed) that
   shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const pl = (s: string) => ((/\.(\d*)$/.exec(s) || [])[1] || "").length;
  const c: string[] = it.cards;
  const alike = (xs: string[]) => xs.every((s) => pl(s) === pl(xs[0]));
  if (it.kind === "count") return pl(c[0]) === it.answer;
  if (it.kind === "set") return (alike(c) ? "like" : "unlike") === it.answer;
  if (it.kind === "pick") {
    for (let a = 0; a < c.length; a++) for (let b = a + 1; b < c.length; b++)
      if (pl(c[a]) === pl(c[b]) && c.every((s, k) => k === a || k === b || pl(s) !== pl(c[a]))) return c[a] + ", " + c[b] === it.answer;
    return false;
  }
  if (it.kind === "same") return ((c.every((s) => Number(s) === Number(c[0])) ? "same" : "diff") + "-" + (alike(c) ? "like" : "unlike")) === it.answer;
  if (it.kind === "zeros") { const t = Math.max(...c.map(pl)); return c.map((s) => Number(s).toFixed(t)).join(", ") === it.answer; }
  if (it.kind === "write") return Number(c[0]).toFixed(it.places) === it.answer;
  return false;
}));
/* the misconception of each item (judge must reject it) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (cards already on the screen are not
   answers; "like" is a word every question needs) */
const answerForms = (item: any) => {
  if (item.kind === "count") return [String(item.answer), words(item.answer)];
  if (item.kind === "write" || item.kind === "zeros") {
    const f = String(item.answer).split(", ").filter((x: string, i: number) => x !== item.cards[i]);
    return f.flatMap((x: string) => [x, speakable(x)]);
  }
  return [];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.pad === "enter" && HOOK.set) HOOK.set(item.answer);
  return T.submit(item.answer);
};
/* the agent's answer(): a working-area answer is set as a child would make it; a typed decimal keeps its point */
const answer = (item: any, v: any) => (item.pad === "enter" ? (HOOK.set ? HOOK.set(v) : false) : item.choices ? undefined : HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: in the phase 4 demo it drops the zero chip; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ───────────────────────────────────────────────────────────────────────
   Phases 1-2: decimal cards (points in one line), Count places, the Like and Unlike trays (drag).
   Phases 3-4 and Free play: the cards, a pile of violet zero chips (drag, or tap for the chosen card's end),
   Take back, a tenths/hundredths/thousandths grid under the chosen card (phase 3), Point first (phase 4).
   A correction draws on S.demo, never on the child's own cards or trays, and the child's next act clears it. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const blue = CONTENT.hundred, blueInk = shade(blue, 0.25), blueFade = mix(blueInk, "#FFFFFF", 0.35);
  const greyZero = "#767676", greyFade = mix(greyZero, "#FFFFFF", 0.18);
  const amber = CONTENT.ten, amberInk = shade(amber, 0.45), amberTint = tint(amber, 0.72);
  const violet = CONTENT.bead, violetInk = shade(violet, 0.4), violetTint = tint(violet, 0.75);
  const greenInk = shade(CONTENT.one, 0.35);
  const quietInk = mix(C.ink, C.panel, 0.5);
  const tlTrace = useTimeline(), tlFx = useTimeline(), tlShake = useTimeline();
  const [, bump] = useState(0);
  const S = useRef<any>({ key: "" });
  const dragFrom = useRef<any>(null);
  const demoDoneRef = useRef(false);
  const demoActed = useRef(false);
  const timers = useRef<any[]>([]);
  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);
  const put = (o: any) => { S.current = { ...S.current, ...o }; bump((k: number) => k + 1); };

  /* which board: the phase 4 demo (5 and 2.64), Free play, or the question's own cards */
  const free = stage === "free";
  const mode = free ? "free" : phase.demo && !demoDoneRef.current && (stage === "teach" || stage === "demo") ? "demo" : "item";
  const kind = mode === "item" ? item.kind : "zeros";
  const boardKey = mode === "item" ? "i" + index : mode;
  const fresh = (key: string, given: string[], set: number) => {
    const cards = given.map((g: string, i: number) => ({ id: "c" + i, given: g, form: g }));
    const t = Math.max(...given.map(lmPlaces));
    const place: any = {};
    cards.forEach((c: any) => { place[c.id] = "col"; });
    return { key, set, cards, place, sel: (cards.find((c: any) => lmPlaces(c.given) < t) || cards[0]).id, undo: [],
      counted: false, reveal: 0, fade: false, demo: null, jump: null, lit: null, pulse: null, sh: 0, missVal: null, finishing: false };
  };
  if (S.current.key !== boardKey) {
    const set = S.current.set || 0;
    S.current = fresh(boardKey, mode === "item" ? item.cards : mode === "demo" ? phase.demo.cards : LM_FREE_SETS[set], set);
  }
  useEffect(() => { tlTrace.stop(); tlFx.stop(); tlShake.stop(); }, [boardKey]);

  const st = S.current;
  const cards: any[] = st.cards;
  const count = cards.length;
  const cardsY = cards.map((c: any, i: number) => lmCardY(i, count));
  const target = mode === "item" && kind === "write" ? item.places
    : Math.max(...cards.map((c: any) => lmPlaces(mode === "free" ? c.form : c.given)));
  LM_NOW = { kind, cards: cards.map((c: any) => c.given) };
  const trays = mode === "item" && (kind === "set" || kind === "pick");
  const countKey = mode === "item" && (kind === "set" || kind === "pick" || kind === "same");
  const zerosUI = mode !== "item" || kind === "zeros";
  const pointUI = zerosUI && (n === 4 || mode === "free");
  const gridUI = (mode === "item" && n === 3) || mode === "free";
  const runsUI = mode !== "item" || n >= 3;
  const live = ["teach", "ask", "demo", "free"].includes(stage) && !tlTrace.busy;
  const ended = mode === "item" && (stage === "win" || stage === "idle");

  /* what is drawn over the child's own cards: a correction (st.demo) or, once answered, the answer worked */
  const won = !ended ? null : kind === "write" ? { forms: [item.answer], sel: "c0" } : kind === "count" ? { reveal: 9, tags: true, countShown: true }
    : kind === "same" ? { strips: 2, caption: true, counts: true } : null;
  const D: any = won || st.demo;
  const formOf = (c: any, i: number) => (D && D.forms ? D.forms[i] : st.jump && st.jump.id === c.id ? st.jump.form : c.form);
  const placeOf = (c: any) => (D && D.place ? (st.place[c.id] === D.place[c.id] ? st.place[c.id] : "col") : st.place[c.id]);
  const ghostTo = (c: any) => (D && D.place && D.place[c.id] !== "col" && placeOf(c) !== D.place[c.id] ? D.place[c.id] : null);
  const countsOn = (c: any) => (D && (D.countShown || D.counts) ? true : kind === "count" ? false
    : countKey ? st.counted && st.reveal >= lmPlaces(c.given) : true);
  const revealN = D && D.reveal !== undefined ? D.reveal : countKey && st.counted ? st.reveal : 0;
  const fadeNow = D && D.fade !== undefined ? D.fade : st.fade;

  /* ── acts (each one clears a correction that stands) ── */
  const shake = () => tlShake.run([[70, () => put({ sh: 1 })], [70, () => put({ sh: -1 })], [70, () => put({ sh: 1 })], [10, () => put({ sh: 0 })]]);
  const countNow = () => {
    if (!live) return;
    const maxP = Math.max(...S.current.cards.map((c: any) => lmPlaces(c.form)));
    put({ counted: true, reveal: 0, fade: true });
    const steps: any[] = [[200, null]];
    for (let k = 1; k <= maxP; k++) steps.push([360, () => put({ reveal: k })]);
    steps.push([10, () => put({ fade: false })]);
    tlFx.run(steps);
  };
  const movePlace = (id: string, to: string) => {
    const place = { ...S.current.place };
    if (kind === "set") Object.keys(place).forEach((k) => { place[k] = to; }); else place[id] = to;
    put({ place, demo: null });
    api.sfx.tick();
  };
  const trayAt = (p: any) => {
    for (const t of ["like", "unlike"]) {
      const b = LM_TRAY[t];
      if (p.x >= b.x - 10 && p.x <= b.x + b.w + 10 && p.y >= b.y - 10 && p.y <= b.y + b.h + 10) return t;
    }
    return "col";
  };
  const cardUnder = (p: any) => {
    const k = cardsY.findIndex((y: number) => p.x >= LM_CARD.x - 20 && p.x <= LM_CARD.x + LM_CARD.w + 20 && p.y >= y - 16 && p.y <= y + LM_CARD.h + 16);
    return k < 0 ? null : cards[k].id;
  };
  const gapAt = (id: string, x: number) => {
    const c = S.current.cards.find((q: any) => q.id === id);
    const rel = x - LM_CARD.x, len = lmPlaces(c.form);
    if (rel < LM_CARD.whole - 4) return "whole";
    return Math.max(0, Math.min(len, Math.round((rel - LM_CARD.dec) / LM_CARD.cell)));
  };
  const jumpOn = (c: any) => {
    const sp = lmSplit(c.form);
    put({ demo: null, jump: { id: c.id, form: sp.w + "0" + (sp.pt ? "." + sp.d : "") }, sel: c.id });
    api.sfx.tick();
    tlFx.run([[1500, null], [10, () => put({ jump: null, pulse: pointUI && !sp.pt ? "point" : null })], [1600, null], [10, () => put({ pulse: null })]]);
    if (mode !== "demo" && (stage === "ask" || stage === "free")) {
      if (sp.pt) api.say("That made it ten times as big. Zeros go after the point.");
      else api.say("That made it ten times as big. Write the point first.");
    }
  };
  const demoAct = () => {
    if (demoActed.current || mode !== "demo") return;
    demoActed.current = true;
    jumpOn(S.current.cards.find((c: any) => !lmSplit(c.form).pt) || S.current.cards[0]);
  };
  const addZero = (id: string, gap: any) => {
    const s = S.current, c = s.cards.find((q: any) => q.id === id);
    if (!c) return;
    const sp = lmSplit(c.form);
    if (gap === "whole" || !sp.pt) { jumpOn(c); return; }
    if (mode === "item" && lmPlaces(c.given) >= target) {
      put({ demo: null, lit: id, sel: id });
      tlFx.run([[1400, null], [10, () => put({ lit: null })]]);
      if (stage === "ask") api.say("That card already has the most places.");
      return;
    }
    if (sp.d.length >= LM_MAX) { put({ demo: null, lit: id }); tlFx.run([[1200, null], [10, () => put({ lit: null })]]); return; }
    const k = gap === "end" ? sp.d.length : gap;
    const form = sp.w + "." + sp.d.slice(0, k) + "0" + sp.d.slice(k);
    put({ demo: null, cards: s.cards.map((q: any) => (q.id === id ? { ...q, form } : q)), undo: [...s.undo, { id, prev: c.form }], sel: id });
    api.sfx.tick();
    shake();
  };
  const pointFirst = () => {
    if (!live || mode === "demo") return;
    const s = S.current;
    const c = s.cards.find((q: any) => q.id === s.sel && !lmSplit(q.form).pt) || s.cards.find((q: any) => !lmSplit(q.form).pt);
    if (!c) return;
    put({ demo: null, pulse: null, cards: s.cards.map((q: any) => (q.id === c.id ? { ...q, form: q.form + "." } : q)), undo: [...s.undo, { id: c.id, prev: c.form }], sel: c.id });
    api.sfx.tick();
  };
  const takeBack = () => {
    if (!live) return;
    const s = S.current, u = s.undo[s.undo.length - 1];
    if (!u) return;
    put({ demo: null, cards: s.cards.map((q: any) => (q.id === u.id ? { ...q, form: u.prev } : q)), undo: s.undo.slice(0, -1), sel: u.id });
    api.sfx.tick();
  };
  const newSet = () => {
    const k = ((S.current.set || 0) + 1) % LM_FREE_SETS.length;
    S.current = fresh("free", LM_FREE_SETS[k], k);
    bump((q: number) => q + 1);
    api.sfx.tick();
  };
  const select = (id: string) => { if (live) put({ sel: id }); };

  const drag = useDrag((p: any, at: any, moved: boolean) => {
    if (!live) return;
    if (p.t === "card") {
      if (!trays) return;
      const order = ["col", "like", "unlike"];
      movePlace(p.id, moved ? trayAt(at) : order[(order.indexOf(S.current.place[p.id]) + 1) % 3]);
    } else if (p.t === "chip") {
      if (S.current.jump) return;
      if (mode === "demo") { demoAct(); return; }
      if (!moved) { addZero(S.current.sel, "end"); return; }
      const id = cardUnder(at);
      if (id) addZero(id, gapAt(id, at.x));
    }
  });
  /* Enter or Space on a focused piece is a tap; after Enter the focus goes back to the page, as the runtime's
     own keys do, so the next Enter answers (Space keeps it, for a second zero) */
  const keysOf = (p: any) => ({
    onKeyDown: (e: any) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      drag.keys(p).onKeyDown(e);
      if (e.key === "Enter") pointerBlur();
    },
  });

  /* the answer made on the working area, as the slot will show it; null = nothing to send yet */
  const workValue = () => {
    const s = S.current;
    if (kind === "set") { const ps = s.cards.map((c: any) => s.place[c.id]); return ps.every((q: string) => q === ps[0]) && ps[0] !== "col" ? ps[0] : null; }
    if (kind === "pick") { const l = s.cards.filter((c: any) => s.place[c.id] === "like").map((c: any) => c.given); return l.length >= 2 ? l.join(", ") : null; }
    if (kind === "zeros") return s.cards.map((c: any) => c.form).join(", ");
    return null;
  };
  /* Enter sends the work, never the work that has just been judged (a bare Enter after a miss does nothing) */
  const sendWork = () => {
    if (stage !== "ask" || tlTrace.busy) return;
    const v = workValue();
    if (v === null || v === S.current.missVal) return;
    api.submit(v);
  };
  api.onEnter(mode === "demo" ? () => demoAct() : mode === "item" && item.pad === "enter" ? () => sendWork() : null);

  HOOK.set = (v: any) => {
    const s = S.current;
    if (kind === "set") {
      const t = String(v ?? "").toLowerCase();
      if (t !== "like" && t !== "unlike") return false;
      const place: any = {};
      s.cards.forEach((c: any) => { place[c.id] = t; });
      put({ place, demo: null });
      return true;
    }
    if (kind === "pick") {
      const want = lmNorm(v).split(", ");
      if (!want.every((w: string) => s.cards.some((c: any) => c.given === w))) return false;
      const place: any = {};
      s.cards.forEach((c: any) => { place[c.id] = want.includes(c.given) ? "like" : "col"; });
      put({ place, demo: null });
      return true;
    }
    if (kind === "zeros") {
      const fs = lmNorm(v).split(", ");
      if (fs.length !== s.cards.length || !fs.every((f: string, i: number) => lmZerosOnly(s.cards[i].given, f))) return false;
      put({ cards: s.cards.map((c: any, i: number) => ({ ...c, form: fs[i] })), demo: null });
      return true;
    }
    return false;
  };
  HOOK.type = (v: any) => { api.setTyped(String(v ?? "")); return true; };
  HOOK.check = () => (mode === "demo" ? (demoAct(), true) : undefined);
  HOOK.demo = () => demoAct();

  /* the phase 4 demo ends once its one act has played and the stage is "demo" (an act during the teach waits) */
  useEffect(() => {
    if (mode !== "demo" || stage !== "demo" || !demoActed.current || S.current.jump || S.current.finishing) return;
    S.current.finishing = true;
    const go = () => { if (demoDoneRef.current) return; demoDoneRef.current = true; api.demoDone(); };
    api.say("Fifty is ten times five. So the point comes first.", go);
    timers.current.push(setTimeout(go, 9000));
  });

  /* the traceback: lock, redraw the maths in steps on S.demo, end on the whole right answer, unlock */
  const traceSteps = (v: string) => {
    const s = S.current, steps: any[] = [];
    const D2 = (o: any) => () => put({ demo: { ...(S.current.demo || {}), ...o } });
    const maxP = Math.max(...s.cards.map((c: any) => lmPlaces(c.given)));
    if (kind === "set" || kind === "pick" || kind === "same") {
      steps.push([250, () => put({ counted: true, reveal: 0, fade: true, demo: {} })]);
      for (let k = 1; k <= maxP; k++) steps.push([380, () => put({ reveal: k })]);
      steps.push([300, () => put({ fade: false })]);
      if (kind === "set" || kind === "pick") {
        const want = String(item.answer).split(", "), place: any = {};
        s.cards.forEach((c: any) => { place[c.id] = kind === "set" ? item.answer : want.includes(c.given) ? "like" : "col"; });
        steps.push([700, D2({ place })]);
      } else { steps.push([600, D2({ strips: 1 })]); steps.push([600, D2({ strips: 2 })]); steps.push([500, D2({ caption: true })]); }
    } else if (kind === "count") {
      steps.push([400, D2({ fade: true, reveal: 0, tags: true })]);
      for (let k = 1; k <= maxP; k++) steps.push([420, D2({ reveal: k })]);
      steps.push([300, D2({ fade: false, countShown: true })]);
    } else {
      const to = kind === "write" ? [item.answer] : String(item.answer).split(", ");
      const got = String(v).split(/\s*,\s*/);
      const from = got.length === s.cards.length ? got : s.cards.map((c: any) => c.form);
      const paths = s.cards.map((c: any, i: number) => lmPath(c.given, from[i], to[i]));
      const L = Math.max(...paths.map((p: string[]) => p.length));
      const focus = s.cards.findIndex((c: any, i: number) => to[i] !== c.given);
      const sel = s.cards[Math.max(0, focus)].id;
      for (let k = 0; k < L; k++) steps.push([k === 0 ? 800 : 560, () => { put({ demo: { forms: paths.map((p: string[]) => p[Math.min(k, p.length - 1)]), sel } }); if (k > 0) shake(); }]);
    }
    steps.push([200, null]);
    return steps;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask" || mode !== "item") return;
    S.current.missVal = String(wrong.value);
    api.lock(true);
    tlTrace.run(traceSteps(String(wrong.value)), () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState); no count before it is the child's */
  api.share({
    phase: n,
    cards: cards.map((c: any) => c.form),
    places: (kind === "count" && !ended) || (countKey && !st.counted) ? null : cards.map((c: any) => lmPlaces(c.form)),
    trays: trays ? { ...st.place } : null,
    zeros: cards.reduce((a: number, c: any) => { const v = lmView(c.given, c.form); return a + v.dec.filter((d: any) => d.added).length; }, 0),
    point: cards.some((c: any) => !lmSplit(c.given).pt && lmSplit(c.form).pt),
    answer: ended ? item.answer : null,
  });

  /* ── drawing (helpers are called, never mounted) ── */
  const dragging = drag.drag;
  if (!dragging) dragFrom.current = null; else if (!dragFrom.current) dragFrom.current = { x: dragging.x, y: dragging.y };
  const dx = dragging ? dragging.x - dragFrom.current.x : 0, dy = dragging ? dragging.y - dragFrom.current.y : 0;
  const movingCard = (c: any) => !!(dragging && dragging.payload.t === "card" && (kind === "set" || dragging.payload.id === c.id));
  const chipDrag = !!(dragging && dragging.payload.t === "chip");

  const face = (x: number, y: number, c: any, i: number, o: any) => {
    const view = lmView(c.given, o.form);
    const nW = view.whole.length, cw = nW <= 3 ? LM_CARD.cell : 126 / nW, fs = nW <= 3 ? T.xl : nW === 4 ? T.speech : T.label;
    const by = y + 58, wx = (k: number) => x + LM_CARD.whole - (nW - k) * cw + cw / 2, dxk = (k: number) => x + LM_CARD.dec + k * LM_CARD.cell;
    const ghost = !!(D && D.forms);
    return (
      <g>
        <rect x={x} y={y} width={LM_CARD.w} height={LM_CARD.h} rx={16} fill="#FFFFFF" stroke={o.edge || C.rule} strokeWidth={o.edge ? 4 : 2} filter="url(#fShadowSoft)" />
        {view.dec.map((d: any, k: number) => (revealN > k && o.lightable ? <rect key={"l" + k} x={dxk(k) + 2} y={y + 8} width={38} height={60} rx={8} fill={amberTint} />
          : d.added ? <rect key={"z" + k} x={dxk(k) + 2} y={y + 8} width={38} height={60} rx={8} fill={violetTint} stroke={violet} strokeWidth={2} strokeDasharray={ghost ? "6 5" : undefined} /> : null))}
        {view.whole.map((d: any, k: number) => (d.added ? <rect key={"wz" + k} x={wx(k) - cw / 2 + 2} y={y + 8} width={cw - 4} height={60} rx={8} fill={violetTint} stroke={violet} strokeWidth={2} /> : null))}
        {view.whole.map((d: any, k: number) => (
          <text key={"w" + k} x={wx(k)} y={by} textAnchor="middle" fontSize={fs} fontWeight={700}
            fill={d.added ? violetInk : d.c === "0" ? (o.fade ? greyFade : greyZero) : o.fade ? blueFade : blueInk}>{d.c}</text>
        ))}
        {view.point && <text x={x + LM_CARD.point} y={by} textAnchor="middle" fontSize={T.display} fontWeight={800} fill={view.point === "added" ? violetInk : C.ink}>.</text>}
        {view.dec.map((d: any, k: number) => (
          <text key={"d" + k} x={dxk(k) + 21} y={by} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={d.added ? violetInk : d.c === "0" ? greyZero : blueInk}>{d.c}</text>
        ))}
        {o.count && !lmTimes(c.given, o.form) && (
          <text x={x + LM_CARD.count} y={y + 50} fontSize={T.label} fontWeight={700} fill={o.countInk}>{tx(lmPlacesText(view.dec.length))}</text>
        )}
        {o.tags && view.dec.map((d: any, k: number) => (revealN > k ? (
          <text key={"g" + k} x={dxk(k) + 21} y={y + LM_CARD.h + 36} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={amberInk}>{String(k + 1)}</text>
        ) : null))}
      </g>
    );
  };
  const mini = (x: number, y: number, c: any, ghost: boolean) => {
    const counted = countsOn(c);
    return (
      <g>
        <rect x={x} y={y} width={LM_MINI.w} height={LM_MINI.h} rx={12} fill="#FFFFFF" stroke={ghost ? greenInk : C.rule} strokeWidth={ghost ? 3 : 2}
          strokeDasharray={ghost ? "8 6" : undefined} filter={ghost ? undefined : "url(#fShadowSoft)"} />
        <text x={x + LM_MINI.w / 2} y={y + (counted ? 36 : 50)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={blueInk}>{c.given}</text>
        {counted && <text x={x + LM_MINI.w / 2} y={y + 68} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={amberInk}>{tx(lmPlacesText(lmPlaces(c.given)))}</text>}
      </g>
    );
  };
  const slotIn = (t: string) => cards.filter((c: any) => placeOf(c) === t || ghostTo(c) === t);
  const miniAt = (t: string, c: any) => { const b = LM_TRAY[t], j = slotIn(t).indexOf(c); return { x: b.x + 12 + j * 144, y: b.y + 50 }; };
  const chipFace = (x: number, y: number, lifted: boolean, under?: boolean) => (
    <g>
      <rect x={x} y={y} width={LM_CHIP.w} height={LM_CHIP.h} rx={16} fill={violetTint} stroke={violet} strokeWidth={3} filter={lifted ? "url(#fLift)" : "url(#fShadowSoft)"} />
      {!under && <text x={x + LM_CHIP.w / 2} y={y + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={violetInk}>0</text>}
    </g>
  );
  const grid = (form: string) => {
    const { x, y, s } = LM_GRID, sp = lmSplit(form), lv = Math.max(1, Math.min(3, sp.d.length));
    const dg = (sp.d + "000").split("").map(Number), col = s / 10;
    const t1 = dg[0], h1 = lv >= 2 ? dg[1] : 0, th = lv >= 3 ? dg[2] : 0;
    const cx = x + s / 2, cy = y + s / 2;
    return (
      <g pointerEvents="none" transform={st.sh ? `rotate(${st.sh * 1.2},${cx},${cy})` : undefined}>
        <rect x={x} y={y} width={s} height={s} fill={C.paper} />
        {t1 > 0 && <rect x={x} y={y} width={t1 * col} height={s} fill={tint(blue, 0.3)} />}
        {h1 > 0 && <rect x={x + t1 * col} y={y} width={col} height={h1 * col} fill={tint(blue, 0.3)} />}
        {th > 0 && <rect x={x + t1 * col} y={y + h1 * col} width={th * col / 10} height={col} fill={tint(blue, 0.3)} />}
        {lv >= 3 && Array.from({ length: 100 }).map((_, k) => (k % 10 ? <line key={"s" + k} x1={x + (k * s) / 100} y1={y} x2={x + (k * s) / 100} y2={y + s} stroke={tint(C.rule, 0.1)} strokeWidth={0.8} /> : null))}
        {lv >= 2 && Array.from({ length: 9 }).map((_, k) => <line key={"h" + k} x1={x} y1={y + (k + 1) * col} x2={x + s} y2={y + (k + 1) * col} stroke={shade(C.rule, 0.2)} strokeWidth={1.2} />)}
        {Array.from({ length: 9 }).map((_, k) => <line key={"v" + k} x1={x + (k + 1) * col} y1={y} x2={x + (k + 1) * col} y2={y + s} stroke={shade(C.rule, 0.35)} strokeWidth={2} />)}
        <rect x={x} y={y} width={s} height={s} fill="none" stroke={C.ink} strokeWidth={3} />
        <text x={cx} y={y + s + 40} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("after the point")}</text>
      </g>
    );
  };
  const strip = (i: number, lv: number) => {
    const c = cards[i], y = cardsY[i] + 18, w = LM_STRIP.w, p = lv === 1 ? 1 : Math.min(2, lmPlaces(c.given));
    const val = Number("0." + (lmSplit(c.given).d || "0"));
    return (
      <g key={"strip" + i}>
        <rect x={LM_STRIP.x} y={y} width={w} height={LM_STRIP.h} fill={C.paper} />
        <rect x={LM_STRIP.x} y={y} width={val * w} height={LM_STRIP.h} fill={tint(blue, 0.3)} />
        {p >= 2 && Array.from({ length: 100 }).map((_, k) => (k % 10 ? <line key={"t" + k} x1={LM_STRIP.x + (k * w) / 100} y1={y + 24} x2={LM_STRIP.x + (k * w) / 100} y2={y + LM_STRIP.h} stroke={shade(C.rule, 0.2)} strokeWidth={1} /> : null))}
        {Array.from({ length: 9 }).map((_, k) => <line key={"m" + k} x1={LM_STRIP.x + ((k + 1) * w) / 10} y1={y} x2={LM_STRIP.x + ((k + 1) * w) / 10} y2={y + LM_STRIP.h} stroke={shade(C.rule, 0.35)} strokeWidth={2} />)}
        <rect x={LM_STRIP.x} y={y} width={w} height={LM_STRIP.h} fill="none" stroke={C.ink} strokeWidth={2.5} />
      </g>
    );
  };
  const button = (id: string, b: any, label: string, onClick: () => void, on: boolean, small?: boolean) => (
    <Key id={id} label={tx(label)} x={b.x} y={b.y} w={b.w} h={b.h} C={C} disabled={!on} onClick={onClick}>
      <text y={small ? 10 : 11} textAnchor="middle" fontSize={small ? T.micro : T.label} fontWeight={600} fill={on ? C.ink : quietInk}>{tx(label)}</text>
    </Key>
  );

  /* the one invite */
  const allLike = cards.every((c: any) => lmPlaces(c.form) === target);
  const noPoint = cards.some((c: any) => !lmSplit(c.form).pt);
  let inv: any = null;
  const kc = (b: any) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
  if (st.pulse === "point") inv = kc(LM_KEYS.point);
  else if (mode === "demo") inv = demoActed.current ? null : kc(LM_CHIP);
  else if (mode === "item" && (stage === "teach" || stage === "ask") && !st.demo && live) {
    if (countKey && !st.counted) inv = kc(LM_KEYS.count);
    else if (trays && cards.every((c: any) => st.place[c.id] === "col")) inv = { x: LM_CARD.x + LM_CARD.w / 2, y: cardsY[0] + LM_CARD.h / 2 };
    else if (kind === "zeros" && n === 4 && noPoint) inv = kc(LM_KEYS.point);
    else if (kind === "zeros" && !allLike) inv = kc(LM_CHIP);
  }

  const selId = D && D.sel ? D.sel : st.sel;
  const selIdx = Math.max(0, cards.findIndex((c: any) => c.id === selId));
  const jumpCard = st.jump ? cards.find((c: any) => c.id === st.jump.id) : D && D.forms ? cards.find((c: any, i: number) => lmTimes(c.given, D.forms[i])) : null;
  const jumpForm = jumpCard ? formOf(jumpCard, cards.indexOf(jumpCard)) : "";
  const placeIs = (t: string) => cards.every((c: any) => st.place[c.id] === t);
  const okTray = (t: string) => (ended && (kind === "set" ? placeIs(t) : t === "like")) || !!(D && D.place && Object.keys(D.place).some((k) => D.place[k] === t));
  const hotTray = dragging && dragging.payload.t === "card" && dragging.moved ? trayAt(dragging) : null;

  return (
    <g>
      {runsUI && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={22} y={-44} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Target")}</text>
          <text x={150} y={-44} fontSize={T.label} fontWeight={700} fill={amberInk}>{tx(lmPlacesText(target))}</text>
        </g>
      )}

      {/* controls the child needs first come first in the tab order */}
      {countKey && button("count-places", LM_KEYS.count, "Count places", countNow, live)}
      {pointUI && button("point-first", LM_KEYS.point, "Point first", pointFirst, live && mode !== "demo" && noPoint)}

      {/* the trays (phases 1-2) */}
      {trays && ["like", "unlike"].map((t: string) => {
        const b = LM_TRAY[t];
        return (
          <g key={"tray-" + t}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={18} fill={tint(C.panel, 0.45)} stroke={hotTray === t ? C.accent : okTray(t) ? greenInk : C.rule} strokeWidth={hotTray === t || okTray(t) ? 4 : 2} />
            <text x={b.x + 18} y={b.y + 38} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(b.label)}</text>
          </g>
        );
      })}

      {/* homes of cards that are on a tray, and the dashes between cards that line the points up */}
      {trays && cards.map((c: any, i: number) => (placeOf(c) !== "col" ? (
        <rect key={"home" + c.id} x={LM_CARD.x} y={cardsY[i]} width={LM_CARD.w} height={LM_CARD.h} rx={16} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 8" />
      ) : null))}
      {!trays && cardsY.map((y: number, i: number) => (
        <line key={"guide" + i} x1={LM_CARD.x + LM_CARD.point} y1={i ? cardsY[i - 1] + LM_CARD.h : y - 14} x2={LM_CARD.x + LM_CARD.point} y2={y} stroke={C.rule} strokeWidth={2} strokeDasharray="4 6" />
      ))}

      {/* the cards (on a tray they are small cards); in phases 1-2 they are the drag pieces */}
      {cards.map((c: any, i: number) => {
        const where = placeOf(c), at = where === "col" ? { x: LM_CARD.x, y: cardsY[i] } : miniAt(where, c);
        const grab = trays && live && !ended;
        const props = grab ? { ...control("card-" + (i + 1), tx("card") + " " + c.given), ...drag.bind({ t: "card", id: c.id }), ...keysOf({ t: "card", id: c.id }) } : {};
        const quiet = movingCard(c);
        const lit = st.lit === c.id;
        const edge = lit ? amberInk : zerosUI && mode !== "demo" && count > 1 && c.id === selId ? amber : null;
        const plc = lmPlaces(formOf(c, i));
        const inkC = ended || (zerosUI && plc === target) ? greenInk : amberInk;
        return (
          <g key={c.id} {...props}>
            {quiet ? (where === "col" ? <rect x={at.x} y={at.y} width={LM_CARD.w} height={LM_CARD.h} rx={16} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 8" />
              : <rect x={at.x} y={at.y} width={LM_MINI.w} height={LM_MINI.h} rx={12} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 6" />)
              : where === "col" ? face(at.x, at.y, c, i, { form: formOf(c, i), count: countsOn(c), countInk: inkC, fade: fadeNow, lightable: countKey || kind === "count", tags: !!(D && D.tags), edge })
              : mini(at.x, at.y, c, false)}
          </g>
        );
      })}

      {/* phase 3 and Free play: the grid under the chosen card's digits after the point */}
      {gridUI && !jumpCard && (
        <g>
          <line x1={LM_CARD.x + LM_CARD.w} y1={cardsY[selIdx] + LM_CARD.h / 2} x2={LM_GRID.x} y2={LM_GRID.y + 24} stroke={amber} strokeWidth={3} pointerEvents="none" />
          {grid(formOf(cards[selIdx], selIdx))}
        </g>
      )}
      {/* a zero stuck onto the whole part: the number in words, and how many times as big */}
      {jumpCard && (
        <g pointerEvents="none">
          {!lmSplit(jumpForm).pt && <text x={LM_GRID.x} y={LM_GRID.y + 60} fontSize={T.label} fontWeight={700} fill={violetInk}>{wordsIn(Number(jumpForm), lang)}</text>}
          <text x={LM_GRID.x} y={LM_GRID.y + 110} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(lmTimes(jumpCard.given, jumpForm))}</text>
        </g>
      )}

      {/* phase 2's last question, after a miss or once answered: one strip a card, the same shading */}
      {D && D.strips && <g pointerEvents="none">{cards.map((c: any, i: number) => strip(i, D.strips))}</g>}
      {D && D.caption && (
        <g pointerEvents="none">
          <text x={LM_STRIP.x} y={340} fontSize={T.label} fontWeight={700} fill={greenInk}>{tx(String(item.answer).startsWith("same") ? "Same value" : "Not the same value")}</text>
          <text x={LM_STRIP.x} y={388} fontSize={T.label} fontWeight={700} fill={greenInk}>{tx(String(item.answer).endsWith("unlike") ? "Unlike decimals" : "Like decimals")}</text>
        </g>
      )}

      {/* the zero chips, Take back, New set */}
      {zerosUI && (
        <g>
          <rect x={LM_PILE.x} y={LM_PILE.y} width={LM_PILE.w} height={LM_PILE.h} rx={18} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
          {chipFace(LM_CHIP.x, LM_CHIP.y + 16, false, true)}
          {chipFace(LM_CHIP.x, LM_CHIP.y + 8, false, true)}
          <g {...(live ? { ...control("zero-chip", tx("Added zero")), ...drag.bind({ t: "chip" }), ...keysOf({ t: "chip" }) } : {})}>
            {chipFace(LM_CHIP.x, LM_CHIP.y, false)}
          </g>
          <text x={LM_PILE.x + LM_PILE.w / 2} y={LM_PILE.y + 180} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Added zero")}</text>
          {mode !== "demo" && button("take-back", LM_KEYS.back, "Take back", takeBack, live && st.undo.length > 0, true)}
          {mode === "free" && button("new-set", LM_KEYS.fresh, "New set", newSet, live)}
        </g>
      )}

      {/* a card is chosen by a tap (the grid follows it, a tapped chip goes to its end) */}
      {zerosUI && mode !== "demo" && live && count > 1 && cards.map((c: any, i: number) => (
        <Hit key={"pick" + c.id} id={"card-" + (i + 1)} x={LM_CARD.x} y={cardsY[i]} w={LM_CARD.w} h={LM_CARD.h} onPress={() => select(c.id)} label={tx("card") + " " + c.form} />
      ))}

      {/* corrections that point at a tray: the right cards, dashed, where they belong */}
      {trays && D && D.place && (
        <g pointerEvents="none">
          {cards.map((c: any) => { const t = ghostTo(c); if (!t) return null; const m = miniAt(t, c); return <g key={"ghost" + c.id}>{mini(m.x, m.y, c, true)}</g>; })}
        </g>
      )}

      {/* what is being dragged, on top */}
      {dragging && dragging.payload.t === "card" && (
        <g pointerEvents="none" filter="url(#fLift)">
          {cards.map((c: any, i: number) => {
            if (!movingCard(c)) return null;
            const where = placeOf(c);
            if (where === "col") return <g key={"drag" + c.id}>{face(LM_CARD.x + dx, cardsY[i] + dy, c, i, { form: c.form, count: countsOn(c), countInk: amberInk, fade: false, lightable: true })}</g>;
            const m = miniAt(where, c);
            return <g key={"drag" + c.id}>{mini(m.x + dx, m.y + dy, c, false)}</g>;
          })}
        </g>
      )}
      {chipDrag && (() => {
        const id = cardUnder(dragging);
        const k = id ? cards.findIndex((c: any) => c.id === id) : -1;
        const gap = id ? gapAt(id, dragging.x) : null;
        const sp = k >= 0 ? lmSplit(cards[k].form) : null;
        const gx = k < 0 ? 0 : gap === "whole" || !sp.pt ? LM_CARD.x + LM_CARD.whole : LM_CARD.x + LM_CARD.dec + (gap as number) * LM_CARD.cell;
        return (
          <g pointerEvents="none">
            {k >= 0 && <rect x={gx - 3} y={cardsY[k] + 6} width={6} height={64} rx={3} fill={violetInk} />}
            {chipFace(LM_CHIP.x + dx, LM_CHIP.y + dy, true)}
          </g>
        );
      })()}

      {inv && <Invite x={inv.x} y={inv.y} r={60} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, n, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const it: any = (((PHASES[(n || 1) - 1] || {}) as any).items || [])[last.item] || {};
  const v = String(last.value);
  let text = v;
  if (it.kind === "set") text = v === "like" ? "Like" : "Unlike";
  else if (it.kind === "same") text = LM_SAME[v] || v;
  else if (it.kind === "count") text = lmPlacesText(Number(v));
  else if (it.kind === "zeros") { const f = v.split(/\s*,\s*/), ch = f.filter((x: string, i: number) => x !== (it.cards || [])[i]); text = (ch.length ? ch : f).join(", "); }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={h / 2 + 10} textAnchor="middle" fontSize={text.length > 9 ? T.micro : T.label} fontWeight={700} fill={shade(CONTENT.one, 0.35)}>{tx(text)}</text>
    </g>
  );
}

function LikeMaker(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: (v: any) => lmShown(v), pointKey: true, fitHost: () => null }} />
  );
}

export default LikeMaker;
