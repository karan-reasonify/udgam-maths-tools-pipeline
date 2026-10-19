/* ═══ M1.S1.T3.C8.2D1 · pair_pen · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   The picture: a PEN shut by two posts (1 on the left, the number on the right), linked pair cards
   pinned inside it in dial order; a BOARD where the number's counters are dealt into as many rows as
   the dial says, with what cannot fill a row standing on the leftover shelf; the ROWS DIAL (step keys
   and a pointer dragged along the RUN, one place per first number, each place keeping its mark). */

const TOOL_ID = "pair_pen";
const MEDIA_ID = "M1.S1.T3.C8.2D1";
const TOOL_NAME = "Pair Pen";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Two posts go up first. One at this end, and the number itself at the other."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Shut at both ends, and every factor you found is standing inside.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any number between the posts, both dials free, the mirror light as you like.";

/* the chapter's colours: a number that divides exactly (a factor, a pair card) is deep blue, the
   number being broken up (its counters) amber, a leftover or a failed trial vermilion; the posts are
   the pen's own dark line. Numerals take a deeper ink so they read at 4.5:1. */
const PP_BLUE = CONTENT.hundred;
const PP_AMBER = CONTENT.ten;
const PP_VERM = CONTENT.pointer;
const PP_POST = CONTENT.line;
const PP_BLUE_INK = shade(PP_BLUE, 0.25);
const PP_AMBER_INK = shade(PP_AMBER, 0.42);
const PP_VERM_INK = shade(PP_VERM, 0.25);

/* word keys (the pad shows them two across); the id is the word itself, so the slot shows what was tapped */
const ppChoices = (...ws: string[]) => ws.map((w) => ({ id: w, label: w }));
const NAME_CHOICES = ppChoices("only 4", "only 17", "both", "neither");
const TRIAL_CHOICES = ppChoices("it works", "it fails");
const SELF_CHOICES = ppChoices("only 1", "only 99", "both", "neither");
const END_CHOICES = ppChoices("it ends", "for ever");

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase. kind drives the working area: name (a laid-out pair, word keys), partner
           (the number in each row, typed), pair (the rows dial, Enter pins the pair), hunt (the dial
           driven up the run, Enter sends the pen's list), comeback (typed: where a pair comes back),
           skipped (word keys, a gap on the run), posts (tap the posts, Enter sends them), ends (two
           boxes), self (word keys), forever (word keys), count and ways (typed, the pen full).
           n = the number between the posts; rows = the rows already laid out. */
const PHASES = [
  {
    n: 1,
    concept: "Two numbers that make the number",
    conceptId: "M1.S1.T3.C8", objectiveIds: ["O3"],
    says: ["Count the rows, then count one row. What does that pair make?"],
    /* tries (plan): rung 1 the item's own miss; rung 2 how many in one row and what the two come to;
       rung 3 "the board is cut to a small pair" is spoken as a small pair worked aloud */
    ladder: ["How many are in one row, and what do the two of them come to?",
      "Try a small one. Three rows of four make twelve, so three and four are factors of twelve."],
    closing: "Two numbers that multiply to give the number are a factor pair of it, and both of them are factors.",
    learned: "You learned: rows times how many in each row makes a factor pair.",
    traceback: "The board turns a quarter turn, so the number in each row becomes the number of rows, then both numbers lift into one linked card and pin; a pair that falls short keeps its spare counters on the leftover shelf while the dial walks up from 1 to the pair that fits.",
    items: [
      /* learn ML1: answer in the plan = A factor pair of 68, so 4 and 17 are both factors of 68 */
      { qid: "M1.S1.T3.C8:ML1", kind: "name", n: 68, rows: 4, answer: "both", choices: NAME_CHOICES, winMs: 1900,
        ask: "4 and 17: which are factors?",
        say: "A tray holds 4 rows of 17 seeds, which comes to 68 seeds. What does that make 4 and 17?",
        miss: "The rows make 68 only with the number in each row. Does that number count too?" },
      /* practice 1: answer in the plan = 5 and 13 (asked as the partner of 5: the number in each row) */
      { qid: "M1.S1.T3.C8:1", kind: "partner", n: 65, rows: 5, answer: 13, winMs: 1900,
        ask: "How many in each row?",
        say: "65 counters stand in 5 rows. How many are in each row? The two numbers make a factor pair of 65.",
        miss: "Count the counters along one row, from left to right." },
      /* practice 2: answer in the plan = 2 and 11 (11 and 2 is the same pair and is accepted) */
      { qid: "M1.S1.T3.C8:2", kind: "pair", n: 22, answer: "2 × 11", pad: "enter", winMs: 1900,
        ask: "A pair for 22, not using 1",
        say: "Write a factor pair of 22 that does not use 1. Step the dial, then press enter to pin the pair.",
        miss: "A factor pair leaves nothing over, and this one must not use 1." },
    ],
  },
  {
    n: 2,
    concept: "Going up in order, and knowing when the pairs repeat",
    conceptId: "M1.S1.T3.C9", objectiveIds: ["O3"],
    says: ["Move the first dial up one at a time. Tell me when a pair comes back."],
    /* tries (plan): rung 3 "the run is cut to six places with a small number" is spoken as a walk of 10 */
    ladder: ["Could a value you skipped have made the number?",
      "Walk a small number such as 10, one place at a time, and watch for the pair that turns round."],
    closing: "Work the first number up from one and try every value in turn. Stop when a pair repeats one already pinned.",
    learned: "You learned: go up from one, and stop when a pair comes back.",
    traceback: "The run carries on from where the dial stopped: every place is tried in turn and keeps its mark, pairs pin, the mirror light fills when a pair comes back, and the pen is counted out; a skipped place is laid out and keeps its leftover.",
    items: [
      /* learn ML2: answer in the plan = 1 and 21, then 3 and 7, so the factors are 1, 3, 7 and 21; the trials at 2, 4, 5 and 6 all fail */
      { qid: "M1.S1.T3.C9:ML2", kind: "hunt", n: 21, answer: "1, 3, 7, 21", pad: "enter", winMs: 3200,
        ask: "Every factor of 21",
        say: "Pair up the factors of 21, working the first number up from 1. Watch which trials fail. Press enter when every factor is in the pen.",
        miss: "Which is the lowest place on the run with nothing on it?" },
      /* practice 4: answer in the plan = 1 and 46, then 2 and 23, so the factors are 1, 2, 23 and 46; every trial from 3 to 22 fails
         (asked as the stop: the pairs come back at 23, after the run of failures from 3 to 22) */
      { qid: "M1.S1.T3.C9:4", kind: "comeback", n: 46, answer: 23, winMs: 2600,
        ask: "Where does a pair come back?",
        say: "Pair up the factors of 46, working the first number up from 1. At which first number does a pair come back?",
        miss: "Keep going past the failures, and stop only when the mirror light comes on." },
      /* practice 5: answer in the plan = 2 was skipped, and it fails, because 27 divided by 2 leaves 1 over. The factors are 1, 3, 9 and 27
         (the run lights the skipped place; the check is whether it works) */
      { qid: "M1.S1.T3.C9:5", kind: "skipped", n: 27, answer: "it fails", choices: TRIAL_CHOICES, winMs: 2000,
        ask: "Skipped trial: does it work?",
        say: "A child pairing the factors of 27 writes 1 and 27, then jumps to 3 and 9. Which trial was skipped, and does it work?",
        miss: "Lay out 2 rows of 27. Is anything left over?" },
    ],
  },
  {
    n: 3,
    concept: "The two factors every number has",
    conceptId: "M1.S1.T3.C10", objectiveIds: ["O4"],
    says: ["The posts are up again, and the board is bare."],
    /* tries (plan): rung 3 "the pen is cut to a small number" is spoken as 6 laid out both ways */
    ladder: ["Which number is standing on the right post, and is it a factor too?",
      "Take 6. Lay it as a single row, then as 6 rows. Is anything ever left over?"],
    closing: "One is a factor of every number, and every number is a factor of itself.",
    learned: "You learned: one and the number itself are always factors.",
    traceback: "Both posts light and drop through the board: one row of the number, then that many rows of one, the leftover shelf empty each time; the outer card pins and the right post is read as the greatest factor.",
    items: [
      /* learn ML3: answer in the plan = Yes: 1 and 57 */
      { qid: "M1.S1.T3.C10:ML3", kind: "posts", n: 57, answer: "1, 57", pad: "enter", winMs: 1900,
        ask: "Two factors of 57, no dividing",
        say: "Take the number 57. Can you name two of its factors before doing any dividing at all? Tap the ones you know, then press enter.",
        miss: "Lay 57 out as 57 rows. Is anything left over?" },
      /* practice 3: answer in the plan = 1 is the smallest and 58 is the greatest */
      { qid: "M1.S1.T3.C10:3", kind: "ends", n: 58, answer: [1, 58], parts: [{ label: "smallest" }, { label: "greatest" }], winMs: 1900,
        ask: "Factors of 58",
        say: "Name the smallest factor of 58 and the greatest factor of 58.",
        miss: "Could the greatest factor be 58 itself? Try it as a single row." },
      /* practice 6: answer in the plan = Yes to both, because 1 is a factor of every number and every number is a factor of itself */
      { qid: "M1.S1.T3.C10:6", kind: "self", n: 99, answer: "both", choices: SELF_CHOICES, winMs: 1900,
        ask: "1 and 99: factors of 99?",
        say: "Is 1 a factor of 99? Is 99 a factor of 99?",
        miss: "Share 99 into 99 rows. How many stand on the leftover shelf?" },
    ],
  },
  {
    n: 4,
    concept: "Why a factor list always ends",
    conceptId: "M1.S1.T3.C11", objectiveIds: ["O4"],
    says: ["The pen is full this time. Look at where each factor is standing."],
    /* tries (plan): rung 3 "the pen is cut to a small number and counted with a finger" is spoken as 9 */
    ladder: ["Could a factor stand outside them?",
      "Take 9. Its factors are 1, 3 and 9, all standing between the posts."],
    closing: "Every factor lies between one and the number itself, so a factor list is finite and can be counted.",
    learned: "You learned: every factor sits between the posts, so the list ends.",
    traceback: "The posts light and the stretch between them is shaded; one more than the number is tried and cannot fill even one row; then the pen is counted out card by card, the count climbing on the board.",
    items: [
      /* learn ML4: answer in the plan = No. The factors are 1, 2, 17 and 34, and the list stops because every factor lies between 1 and 34 */
      { qid: "M1.S1.T3.C11:ML4", kind: "forever", n: 34, answer: "it ends", choices: END_CHOICES, winMs: 3200,
        ask: "34's factors: for ever?",
        say: "Could 34 have factors going on for ever? Look at the two posts before you choose.",
        miss: "Which two numbers are standing on the posts?" },
      /* practice 7: answer in the plan = Five: 1, 3, 9, 27 and 81. The pairs repeat at 9 times 9, and no factor can be greater than 81, so the list stops */
      { qid: "M1.S1.T3.C11:7", kind: "count", n: 81, answer: 5, winMs: 3300,
        ask: "How many factors has 81?",
        say: "How many factors has 81, and how do you know there are no more?",
        miss: "The 9 card holds one number twice. How many different numbers are in the pen?" },
      /* practice 8: answer in the plan = Six ways: 2 rows of 39, 3 rows of 26, 6 rows of 13, 13 rows of 6, 26 rows of 3 and 39 rows of 2
         (asked as how many ways; the correction lays all six out) */
      { qid: "M1.S1.T3.C11:8", kind: "ways", n: 78, answer: 6, winMs: 3700,
        ask: "How many ways for 78 pots?",
        say: "A stall has 78 pots and wants them in equal rows. It wants more than one row, and more than one pot in a row. How many ways are there?",
        miss: "Leave out the outer pair. Each other card can be laid out two ways round." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  pen: "left post 1, right post the number; linked pair cards in dial order, then a mirror line and the pairs that came back the other way round",
  board: "the number's counters dealt into as many rows as the dial says; what cannot fill a row stands on the leftover shelf",
  run: "one place per first number, 20 in view (13 in free play); a place keeps its mark: a pair (blue bar) or a leftover (vermilion dot); a place above a blank one is refused",
  numbers: PHASES.map((p: any) => p.items.map((it: any) => it.n)),
  freePlay: { from: 2, to: 99, start: 24 },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* the numbers written in a value: "2 × 11", "1, 3, 7, 21", [2, 11] */
const ppNums = (v: any): number[] => (Array.isArray(v) ? v.map(Number) : (String(v ?? "").match(/\d+/g) || []).map(Number)).filter((x: number) => isFinite(x));
const ppSorted = (xs: number[]) => Array.from(new Set(xs)).sort((a, b) => a - b);

/* judge: is this value right for this item? A pair is right when it multiplies to the number without
   using 1; a list is right in any order; numbers compare as numbers */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "pair") {
    const xs = ppNums(v);
    return xs.length === 2 && xs[0] * xs[1] === item.n && xs[0] !== 1 && xs[1] !== 1;
  }
  if (item.kind === "hunt" || item.kind === "posts") return ppSorted(ppNums(v)).join(",") === ppSorted(ppNums(item.answer)).join(",");
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   the factor table is found by MULTIPLYING (a × b = n over a times table), never by dividing */
const oracle = () => {
  const table = (n: number) => { const out: number[] = []; for (let a = 1; a <= n; a++) for (let b = 1; b <= n; b++) if (a * b === n) { out.push(a); break; } return out; };
  const list = (s: any) => String(s).split(",").map((t) => parseInt(t, 10));
  return PHASES.every((p: any) => p.items.every((it: any) => {
    const fs = table(it.n), has = (x: number) => fs.indexOf(x) >= 0, lo = fs[0], hi = fs[fs.length - 1];
    switch (it.kind) {
      case "name": { const other = fs.find((b) => it.rows * b === it.n); return it.answer === (has(it.rows) && other !== undefined && has(other) ? "both" : "none"); }
      case "partner": return it.rows * it.answer === it.n && has(it.answer);
      case "pair": { const [a, b] = String(it.answer).split("×").map((t) => parseInt(t, 10)); return a * b === it.n && a !== 1 && b !== 1; }
      case "hunt": return list(it.answer).join(",") === fs.join(",");
      case "comeback": return fs.find((a) => a * a >= it.n) === it.answer;
      case "skipped": return it.answer === (has(2) ? "it works" : "it fails");
      case "posts": return list(it.answer).join(",") === [lo, hi].join(",") && lo === 1 && hi === it.n;
      case "ends": return it.answer[0] === lo && it.answer[1] === hi;
      case "self": return it.answer === (has(1) && has(it.n) ? "both" : "none");
      case "forever": return it.answer === (fs.every((x) => x <= it.n) ? "it ends" : "for ever");
      case "count": return it.answer === fs.length;
      case "ways": return it.answer === fs.filter((x) => x !== 1 && x !== it.n).length;
    }
    return false;
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const NEAR: Record<string, any> = {
  name: "only 4",       /* only the rows are a factor */
  partner: 5,          /* names the rows, not the number in each row */
  pair: "4 × 5",       /* comes close: 4 rows of 5 for 22, 2 spare */
  hunt: "1, 21",       /* stopped before the pair in the middle */
  comeback: 22,        /* stops on the last failure */
  skipped: "it works",   /* the skipped trial was never laid out */
  posts: "1",          /* a number cannot be a factor of itself */
  ends: "1|29",        /* the greatest factor below the number */
  self: "only 1",       /* the same */
  forever: "for ever",  /* factors carry on, like multiples */
  count: 6,            /* 9 counted twice */
  ways: 3,             /* each card once, never turned */
};
const nearMiss = (item: any) => (item.kind in NEAR ? NEAR[item.kind] : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  switch (item.kind) {
    case "partner": case "comeback": case "count": case "ways": return [String(item.answer), words(item.answer)];
    case "pair": return [String(item.answer), "11", words(11)];
    case "hunt": return [String(item.answer), "3", "7", words(3), words(7)];
    case "posts": return [String(item.answer), "1"];
    case "ends": return ["1"]; /* the greatest factor is the number itself, which the question has to name */
    default: return [String(item.answer)];
  }
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (item.pad === "enter") { if (HOOK.set) HOOK.set(item.answer); setTimeout(() => HOOK.enter && HOOK.enter(), 40); return; }
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" ? (HOOK.set ? HOOK.set(v) : false) : undefined);
/* the agent's check() before Enter: nothing waits on this tool's working area, so Enter answers */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */

const PEN = { y: 6, h: 118 };
const CARD = { x0: 72, span: 942, y: 14, w: 80, h: 100, pitch: 92 };
const BOARD = { y: 140, h: 252 };
const ARR = { x: 24, y: 196, w: 780, h: 184 };
const TRAY = { x: 826, y: 196, w: 240, h: 184 };
const LAMP = { x: 1050, y: 168 };
const STRIP = { x: 270, y: 418, h: 68, w: 816, wFree: 546 };
const FACE = { x: 84, y: 410, w: 78, h: 84 };

const KINDS: Record<string, any> = {
  name: {}, partner: {},
  pair: { dial: true },
  hunt: { dial: true, strip: true, pin: true },
  comeback: { dial: true, strip: true, pin: true },
  skipped: { dial: true, strip: true, pin: true },
  posts: { posts: true }, ends: { posts: true }, self: { posts: true },
  forever: { dial: true, strip: true, pin: true },
  count: { dial: true, strip: true, pin: true },
  ways: { dial: true, strip: true, pin: true },
  free: { dial: true, strip: true, pin: true, free: true },
};

/* the picture's own route to a number's factors (by the leftover of each trial) */
const ppFactors = (N: number) => { const out: number[] = []; for (let k = 1; k <= N; k++) if (N % k === 0) out.push(k); return out; };
/* the first number at which a pair comes back (or reads the same both ways) */
const ppBack = (N: number) => ppFactors(N).find((k) => k * k >= N) || N;

const ppBlank = (N: number, kind: string): any => ({
  N, kind, A: 0, tried: {}, pairs: [], mirrors: [], mirrorOn: false, turned: false, spin: 0,
  picks: { L: false, R: false }, ghost: null, show: null, postLit: false, shaded: false, counted: [], tally: null,
  fly: null, note: null, touched: false, lampOff: false,
  /* the correction's own layer: drawn instead of this state while it runs, and never an answer */
  demo: null,
});
/* lay the number out in k rows: a place tried once keeps its mark; with `pin`, a pair that fits
   pins into the pen, or settles against its mirror when it comes back the other way round */
const ppTry = (s: any, k: number, pin: boolean) => {
  if (!(k >= 1 && k <= s.N)) return s;
  const n: any = { ...s, A: k, show: null, turned: false, tally: null, note: null };
  if (s.tried[k]) return n;
  n.tried = { ...s.tried, [k]: s.N % k === 0 ? "pass" : "fail" };
  if (pin && s.N % k === 0) {
    const b = s.N / k;
    if (b >= k) { if (!n.pairs.some((p: number[]) => p[0] === k)) n.pairs = [...n.pairs, [k, b]]; if (b === k) n.mirrorOn = true; }
    else if (n.pairs.some((p: number[]) => p[0] === b)) { n.mirrors = [...n.mirrors, [k, b]]; n.mirrorOn = true; }
    else n.pairs = [...n.pairs, [b, k]];
  }
  return n;
};
/* the lowest place left blank below a tried one (the run refuses to go on past it) */
const ppGap = (s: any) => {
  const ks = Object.keys(s.tried).map(Number);
  if (!ks.length) return null;
  const top = Math.max(...ks);
  for (let j = 1; j < top; j++) if (!s.tried[j]) return j;
  return null;
};
const ppList = (s: any) => ppSorted(s.pairs.flat());
const ppCards = (s: any) => [
  ...[...s.pairs].sort((p: number[], q: number[]) => p[0] - q[0]).map((p: number[]) => ({ a: p[0], b: p[1], mirror: false })),
  ...(s.lampOff ? [] : [...s.mirrors].sort((p: number[], q: number[]) => p[0] - q[0]).map((p: number[]) => ({ a: p[0], b: p[1], mirror: true }))),
];
const ppPen = (count: number) => {
  const pitch = Math.min(CARD.pitch, CARD.span / Math.max(count, 1)), w = Math.min(CARD.w, pitch - 10);
  return { pitch, w, x: (j: number) => CARD.x0 + j * pitch + (pitch - w) / 2 };
};
/* counters in rows: a small gap after every fifth in a row, and a wall between rows */
const ppGrid = (rows: number, per: number, box: any = ARR) => {
  const cg = Math.floor((per - 1) / 5), gr = 0.45;
  const cs = Math.min(40, box.w / (per + cg * gr), box.h / (rows * 1.3));
  const cw = per <= 3 ? Math.max(cs, Math.min(24, box.w / (per * 1.5))) : cs;
  const ch = rows <= 3 ? Math.max(cs, Math.min(18, box.h / (rows * 1.3))) : cs;
  const g = cs * gr, rg = ch * 0.3;
  const w = per * cw + cg * g, h = rows * ch + (rows - 1) * rg;
  const x0 = box.x + (box.w - w) / 2, y0 = box.y + (box.h - h) / 2;
  return { cs, cw, ch, rg, x0, y0, w, h, x: (c: number) => x0 + c * cw + Math.floor(c / 5) * g, y: (r: number) => y0 + r * (ch + rg) };
};
const ppSetup = (it: any) => {
  const kind = it.kind || "free", N = it.n || 24;
  let s: any = ppBlank(N, kind);
  if (kind === "name" || kind === "partner") s = ppTry(s, it.rows, false);
  else if (kind === "pair") s = ppTry(s, 1, false);
  else if (kind === "skipped") s = ppTry(ppTry(s, 1, true), 3, true);   /* 1 and 3 tried, 2 jumped */
  else if (kind === "posts" || kind === "ends" || kind === "self") s = { ...s, postLit: true };
  else if (kind === "forever" || kind === "count" || kind === "ways") for (let k = 1; k <= N && !s.mirrorOn; k++) s = ppTry(s, k, true);
  return s;
};

const PP_CSS = `
.pp-pop{animation:ppPop 420ms cubic-bezier(.3,1.5,.5,1) both;transform-box:fill-box;transform-origin:center}
@keyframes ppPop{from{transform:scale(.55)}to{transform:none}}
.pp-spin{animation:ppSpin 650ms ease-out both;transform-box:fill-box;transform-origin:center}
@keyframes ppSpin{from{transform:rotate(-90deg)}to{transform:none}}
.pp-move{transition:transform 560ms cubic-bezier(.3,.7,.25,1)}
.pp-nudge{animation:ppNudge 700ms ease-out 1;transform-box:fill-box;transform-origin:center}
@keyframes ppNudge{0%,100%{transform:none}30%{transform:scale(1.18)}60%{transform:scale(.94)}}
.pp-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.pp-pop,.pp-spin,.pp-nudge{animation:none}.pp-move{transition:none}}
`;

/* the working area's own lines that carry a number (Hindi / Gujarati only): the English line is
   matched to its template, TR translates the template, and the digits go back in as they were.
   English is returned untouched, so what the checks read never changes. */
const PP_TEMPLATES = ["{a} of {b} tried", "{a} pair pinned", "{a} pairs pinned", "1 row of {a}", "{a} rows of {b}",
  "{a} in each row", "comes back at {a}", "2 leaves {a} over", "greatest is {a}", "1 and {a}", "{a} is too big",
  "{a} short", "{a} over", "{a} factor", "{a} factors", "{a} way", "{a} ways"];
const ppLine = (line: any, lang: string, tx: any) => {
  if (lang === "en" || !line) return line;
  const whole = tx(line);
  if (whole !== line) return whole;
  for (const t of PP_TEMPLATES) {
    const names: string[] = [];
    const re = new RegExp("^" + t.replace(/\{(a|b)\}/g, (_m: string, k: string) => { names.push(k); return "(\\d+)"; }) + "$");
    const m = re.exec(String(line));
    if (!m) continue;
    const vals: any = {};
    names.forEach((k, i) => { vals[k] = m[i + 1]; });
    return String(tx(t)).replace(/\{(a|b)\}/g, (_m: string, k: string) => vals[k]);
  }
  return line;
};

/* a linked pair card: the two numbers that multiply to the number, one above the other and joined
   by a drawn times sign (never a bar: a bar would read as a fraction), so the pair moves as one piece */
const ppTimes = (cx: number, cy: number, r: number, color: string, sw = 3.5) => (
  <path d={`M ${cx - r} ${cy - r} L ${cx + r} ${cy + r} M ${cx + r} ${cy - r} L ${cx - r} ${cy + r}`} stroke={color} strokeWidth={sw} strokeLinecap="round" />
);
function PenCard({ x, y, w, a, b, mirror, counted }: any) {
  const cx = x + w / 2;
  const lit = (v: any) => v !== "" && counted && counted.indexOf(v) >= 0;
  const half = (v: any, ty: number) => (v === "" ? (
    <rect x={x + 10} y={y + ty - 34} width={w - 20} height={38} rx={10} fill="none" stroke={PP_BLUE} strokeWidth={2} strokeDasharray="6 5" />
  ) : (
    <text x={cx} y={y + ty} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={PP_BLUE_INK}>{v}</text>
  ));
  return (
    <g>
      <rect x={x} y={y} width={w} height={CARD.h} rx={14} fill={mirror ? tint(PP_BLUE, 0.9) : "#FFFFFF"} stroke={PP_BLUE} strokeWidth={3} strokeDasharray={mirror ? "9 6" : undefined} />
      {lit(a) && <circle cx={cx} cy={y + 25} r={20} fill={tint(PP_AMBER, 0.55)} />}
      {lit(b) && <circle cx={cx} cy={y + 80} r={20} fill={tint(PP_AMBER, 0.55)} />}
      {half(a, 40)}
      {ppTimes(cx, y + 52, 5.5, a === "" || b === "" ? tint(PP_BLUE, 0.5) : PP_BLUE)}
      {half(b, 94)}
    </g>
  );
}

/* Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
function Work({ item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const lx = (line: any) => ppLine(line, lang, tx); /* a drawn line in the language in use */
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [st, setSt] = useState<any>(() => ppSetup(item));
  const sRef = useRef<any>(st);
  const up = (nx: any) => { sRef.current = nx; setSt(nx); };
  const cur = () => sRef.current;
  const setupFor = useRef(index);
  const [nudge, setNudge] = useState(0);
  /* Hindi / Gujarati only: the running count's first line is measured, and drops to micro when it would
     run wider than 290 at label size (the pill is 330); the dial captions sit a little lower */
  const runRef = useRef<any>(null);
  const [runSmall, setRunSmall] = useState(false);
  useEffect(() => {
    if (lang === "en") return;
    const el = runRef.current;
    if (!el || !el.getComputedTextLength) return;
    const wide = (el.getComputedTextLength() * T.label) / (runSmall ? T.micro : T.label) > 290;
    if (wide !== runSmall) setRunSmall(wide);
  });
  const capY = lang === "en" ? 520 : 527;
  /* has the child acted since the last miss? Until they do, Enter sends nothing: a correction must
     never be answerable by a bare Enter on the work it just did */
  const acted = useRef(false);

  const reset = (it: any) => { tl.stop(); acted.current = false; up(ppSetup(it)); api.lock(false); };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);
  /* free play: any number from 2 to 99 between the posts, both dials free, the mirror light as you like */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset({ kind: "free", n: 24 });
  }, [free]);

  const s = st, N = s.N, kind = s.kind, K = KINDS[kind] || KINDS.free;
  const busy = tl.busy;
  const live = !busy && (stage === "ask" || free);
  const gap = K.strip ? ppGap(s) : null;
  /* with no dial under it, the board takes the whole height, so the counters are bigger to count */
  const tall = !K.dial && !K.strip;
  const bh = tall ? 388 : BOARD.h;
  const box = tall ? { ...ARR, h: 320 } : ARR;
  const tray = tall ? { ...TRAY, h: 320 } : TRAY;
  const touch = (x: any) => ({ ...x, touched: true, note: null });
  /* the correction draws on its own layer (`demo`), so the child's dial, pen and picks stay exactly
     where they left them; their next act clears it and they work from their own again */
  const dcur = (d: boolean) => (d ? cur().demo || cur() : cur());
  const dup = (d: boolean, nx: any) => up(d ? { ...cur(), demo: { ...nx, demo: null } } : { ...nx, demo: null });
  const demoOn = () => up({ ...cur(), demo: { ...cur(), demo: null } });
  /* the correction is over: its pen, marks and words stay on show, the child's own dial comes back under them */
  /* a note that named the correction's board goes with it, since the board under it is the child's again */
  const demoSettle = (dropNote = false) => {
    const x = cur();
    if (x.demo) up({ ...x, demo: { ...x.demo, A: x.A, show: x.show, turned: x.turned, fly: null, note: dropNote ? null : x.demo.note } });
  };

  /* what Enter sends for an answer made here (and the slot shows it as it is made) */
  const valueOf = (x: any) =>
    kind === "pair" ? (x.A >= 1 ? `${x.A} × ${Math.floor(x.N / x.A)}` : "")
      : kind === "hunt" ? ppList(x).join(", ")
        : kind === "posts" ? [x.picks.L ? 1 : 0, x.picks.R ? x.N : 0].filter((v) => v > 0).join(", ")
          : null;
  const echo = (x: any) => { const v = valueOf(x); if (v !== null && stage === "ask") api.setTyped(v); };

  /* ── the child's controls ── */
  const tryOne = (k: number, d = false) => {
    const x = dcur(d), was = x.tried[k];
    const nx = touch(ppTry(x, k, !!K.pin));
    dup(d, nx);
    if (!d) acted.current = true;
    if (!was && nx.tried[k] === "pass") api.sfx.tick();
    return nx;
  };
  const refuse = () => setNudge((v) => v + 1); /* the blank place below lights again; nothing moves */
  const stepTo = (k: number) => {
    const x = cur();
    if (!live || !K.dial || k < 1 || k > x.N) return;
    if (k > x.A && K.strip && ppGap(x) !== null) { refuse(); return; }
    echo(tryOne(k));
  };
  /* up the run to `to`: every place on the way is laid out in turn and keeps its mark */
  const drive = (to: number) => {
    const x = cur();
    if (!live || !K.dial) return;
    const t = Math.min(Math.max(1, to), x.N);
    if (t <= x.A) { if (t !== x.A) stepTo(t); return; }
    if (K.strip && ppGap(x) !== null) { refuse(); return; }
    if (t === x.A + 1) { stepTo(t); return; }
    const ms = Math.max(70, Math.min(170, Math.round(2400 / (t - x.A))));
    const S: any[] = [];
    for (let k = x.A + 1; k <= t; k++) { const j = k; S.push([ms, () => { tryOne(j); }]); }
    if (!free) api.lock(true);
    tl.run(S, () => { if (!free) { api.lock(false); echo(cur()); } });
  };
  /* a post dropped through the board: one row of the number, or that many rows of one */
  const dropPost = (side: string) => {
    const x = cur();
    if (!live || !K.posts) return;
    const left = side === "L";
    const picks = kind === "posts" ? { ...x.picks, [side]: !x.picks[side] } : x.picks;
    const nx = { ...x, A: 0, tried: { ...x.tried, [left ? 1 : x.N]: "pass" }, picks, ghost: null, demo: null, touched: true,
      show: left ? { rows: 1, per: x.N } : { rows: x.N, per: 1 }, note: left ? `1 row of ${x.N}` : `${x.N} rows of 1` };
    acted.current = true;
    up(nx); api.sfx.tick(); echo(nx);
  };
  const turnBoard = () => {
    const x = cur();
    if (!live || kind !== "name") return;
    acted.current = true;
    up({ ...x, turned: !x.turned, spin: x.spin + 1, demo: null, touched: true }); api.sfx.tick();
  };
  const setN = (v: number) => {
    const x = cur();
    if (!free || busy) return;
    const N1 = Math.max(2, Math.min(99, v));
    if (N1 !== x.N) up({ ...ppBlank(N1, "free"), lampOff: x.lampOff });
  };
  const toggleLamp = () => { const x = cur(); if (free && !busy) up({ ...x, lampOff: !x.lampOff }); };

  const P = free ? 13 : 20, SW = free ? STRIP.wFree : STRIP.w, pitch = SW / P;
  const firstOf = (x: any) => (x.A > P ? x.A - P + 1 : 1);
  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (!payload || payload.kind !== "dial") return;
    const x = cur();
    if (!moved || !isFinite(p.x)) { drive(x.A + 1); return; } /* a tap or Enter: the next place */
    drive(firstOf(x) + Math.floor((p.x - STRIP.x) / pitch));
  });

  /* Enter (and the agent's check) go here for an answer made on the working area */
  const owns = stage === "ask" && item.pad === "enter";
  const enterFn: any = owns ? () => {
    if (tl.busy) return;
    /* after a miss the correction's own work is on screen: nothing is sent until the child acts again */
    if (wrong && !acted.current) return;
    const v = valueOf(cur());
    if (v) api.submit(v);
  } : null;
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.set = (v: any) => {
    const x = cur();
    if (stage !== "ask" || tl.busy) return false;
    const xs = ppNums(v);
    acted.current = true;
    if (kind === "pair") {
      const a = xs[0];
      if (!(a >= 1 && a <= x.N)) return false;
      const nx = touch(ppTry(x, a, false)); up({ ...nx, demo: null }); echo(nx); return true;
    }
    if (kind === "hunt") {
      const firsts = ppSorted(xs.filter((f) => f >= 1 && f <= x.N && x.N % f === 0).map((f) => Math.min(f, x.N / f)));
      let nx: any = ppBlank(x.N, kind);
      const top = firsts.length ? firsts[firsts.length - 1] : 0;
      for (let k = 1; k <= top; k++) nx = ppTry(nx, k, false);
      nx = { ...nx, pairs: firsts.map((f) => [f, x.N / f]), mirrorOn: firsts.some((f) => f * f === x.N), touched: true, demo: null };
      up(nx); echo(nx); return true;
    }
    if (kind === "posts") {
      const nx = { ...x, picks: { L: xs.indexOf(1) >= 0, R: xs.indexOf(x.N) >= 0 }, ghost: null, demo: null, touched: true };
      up(nx); echo(nx); return true;
    }
    return false;
  };

  /* ── motions: a card pinning, the run walked, the pen counted out ── */
  /* d = true: on the correction's own layer (see dcur / dup) */
  const pinSteps = (a: number, b: number, d = false): any[] => {
    const x0 = dcur(d);
    if (x0.pairs.some((p: number[]) => p[0] === a && p[1] === b)) return [[240, () => dup(d, { ...dcur(d), counted: [a, b] })]];
    const g = ppPen(ppCards(x0).length + 1), to = g.x(x0.pairs.length);
    return [
      [40, () => dup(d, { ...dcur(d), fly: { a, b, x: ARR.x + ARR.w / 2 - g.w / 2, y: 236, w: g.w } })],
      [60, () => dup(d, { ...dcur(d), fly: { a, b, x: to, y: CARD.y, w: g.w } })],
      [620, () => { const x = dcur(d); dup(d, { ...x, fly: null, pairs: [...x.pairs, [a, b]], counted: [a, b] }); api.sfx.tick(); }],
    ];
  };
  const driveSteps = (from: number, to: number, ms: number, d = false) => {
    const S: any[] = [];
    for (let k = from; k <= to; k++) { const j = k; S.push([ms, () => { tryOne(j, d); }]); }
    return S;
  };
  const countSteps = (items: string[], marks: number[][], unit: string, d = false) => {
    const S: any[] = [[300, () => dup(d, { ...dcur(d), shaded: true, postLit: true, show: null, tally: { items: [], unit }, counted: [] })]];
    items.forEach((t, i) => S.push([430, () => {
      const x = dcur(d), was = x.tally ? x.tally.items : [];
      dup(d, { ...x, tally: { items: [...was, t], unit }, counted: [...x.counted, ...marks[i]] }); api.sfx.tick();
    }]));
    S.push([500, null]);
    return S;
  };
  const factorTally = (d = false) => { const fs = ppFactors(dcur(d).N); return countSteps(fs.map(String), fs.map((f) => [f]), "factors", d); };
  const waysTally = () => {
    const N0 = cur().N, items: string[] = [], marks: number[][] = [];
    ppFactors(N0).filter((a) => a > 1 && a * a <= N0).forEach((a) => {
      const b = N0 / a;
      items.push(`${a} × ${b}`); marks.push([a, b]);
      if (b !== a) { items.push(`${b} × ${a}`); marks.push([a, b]); }
    });
    return countSteps(items, marks, "ways");
  };

  const winSteps = (): any[] => {
    const x = cur(), N0 = x.N;
    switch (kind) {
      case "name": case "partner": return pinSteps(item.rows, N0 / item.rows);
      case "pair": { const xs = ppNums(typed); const a = xs[0] >= 1 && N0 % xs[0] === 0 ? xs[0] : x.A; return pinSteps(a, N0 / a); }
      case "hunt": { const back = ppBack(N0); return [...(x.A < back ? driveSteps(x.A + 1, back, 90) : []), ...factorTally()]; }
      case "comeback": {
        const back = ppBack(N0);
        return [...(x.A < back ? driveSteps(x.A + 1, back, 80) : [[60, () => up(ppTry(cur(), back, true))]]),
          [300, () => up({ ...cur(), note: `comes back at ${back}` })]];
      }
      case "skipped": return [[60, () => up(ppTry(cur(), 2, true))], [400, () => up({ ...cur(), note: `2 leaves ${N0 % 2} over` })]];
      case "posts": return [[60, () => up({ ...cur(), picks: { L: true, R: true }, counted: [1, N0] })], [300, null]];
      case "ends": case "self": return pinSteps(1, N0);
      case "forever": return [...factorTally(), [200, () => up({ ...cur(), note: "the list ends" })]];
      case "count": return factorTally();
      case "ways": return waysTally();
    }
    return [];
  };
  useEffect(() => {
    if (stage !== "win") return;
    up({ ...cur(), demo: null }); /* the child's own answer won: the win moves their own pen */
    tl.run(winSteps());
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
     nothing marked, nothing the child pinned is moved ── */
  const tracebackSteps = (w: any): any[] => {
    const s0 = cur(), N0 = s0.N;
    const S: any[] = [[60, () => up({ ...cur(), note: null, tally: null, counted: [], touched: true })]];
    switch (kind) {
      case "name": case "partner": {
        const r = item.rows, p = N0 / r;
        S.push([80, () => up({ ...cur(), show: null, turned: false })], [700, null],
          [60, () => up({ ...cur(), turned: true, spin: cur().spin + 1, note: `${p} rows of ${r}` })], [1700, null],
          [60, () => up({ ...cur(), turned: false, spin: cur().spin + 1, note: `${r} rows of ${p}` })], [1300, null],
          ...pinSteps(r, p),
          [300, () => up({ ...cur(), note: kind === "name" ? "both are factors" : `${p} in each row` })], [500, null]);
        break;
      }
      case "pair": {
        const a0 = ppNums(w.value)[0], k0 = a0 >= 1 && a0 <= N0 ? a0 : 1;
        const good = ppFactors(N0).find((f) => f > 1 && f < N0) || N0;
        /* on the correction's layer: the child's own dial stays where they left it, so the right pair
           is seen, never sent; they drive their own dial to it */
        S.push([60, () => { demoOn(); dup(true, ppTry(dcur(true), k0, false)); }], [1600, null],
          [60, () => dup(true, { ...ppTry(dcur(true), 1, false), note: "that uses 1" })], [1300, null]);
        for (let k = 2; k <= good; k++) { const j = k; S.push([700, () => dup(true, ppTry(dcur(true), j, false))]); }
        S.push(...pinSteps(good, N0 / good, true),
          [300, () => dup(true, { ...dcur(true), note: `${good} rows of ${N0 / good}` })], [1400, () => demoSettle(true)]);
        break;
      }
      case "hunt": {
        /* the run carried on, on the correction's layer: the child's own pen and dial stay theirs */
        const back = ppBack(N0);
        S.push([400, () => demoOn()], ...driveSteps(Math.max(1, s0.A + 1), back, 240, true), [600, null],
          ...factorTally(true), [200, () => demoSettle()]);
        break;
      }
      case "comeback": {
        /* a typed answer: the dial walk is the picture, and Enter sends only what the child types */
        const back = ppBack(N0);
        S.push([400, null], ...driveSteps(Math.max(1, s0.A + 1), back, 240), [600, null],
          [60, () => up(ppTry(cur(), back, true))], [300, () => up({ ...cur(), note: `comes back at ${back}` })], [400, null]);
        break;
      }
      case "skipped":
        S.push([900, null], [60, () => up(ppTry(cur(), 2, true))], [500, () => up({ ...cur(), note: `2 leaves ${N0 % 2} over` })], [400, null]);
        break;
      case "posts": case "ends": case "self": {
        const mine = kind === "posts";
        S.push([60, () => up({ ...cur(), postLit: true })], [500, null],
          [60, () => { const x = cur(); up({ ...x, A: 0, show: { rows: 1, per: N0 }, note: `1 row of ${N0}`, tried: { ...x.tried, 1: "pass" }, ghost: mine ? { L: true, R: false } : null }); api.sfx.tick(); }], [1600, null],
          [60, () => { const x = cur(); up({ ...x, show: { rows: N0, per: 1 }, note: `${N0} rows of 1`, tried: { ...x.tried, [N0]: "pass" }, ghost: mine ? { L: true, R: true } : null }); api.sfx.tick(); }], [1600, null]);
        if (mine) S.push([200, () => up({ ...cur(), counted: [1, N0] })]);
        else S.push(...pinSteps(1, N0));
        S.push([300, () => up({ ...cur(), note: kind === "ends" ? `greatest is ${N0}` : kind === "self" ? "both are factors" : `1 and ${N0}` })], [400, null]);
        break;
      }
      case "forever":
        S.push([60, () => up({ ...cur(), postLit: true })], [500, () => up({ ...cur(), shaded: true })], [700, null],
          [60, () => up({ ...cur(), show: { rows: 1, per: N0 + 1, have: N0 }, note: `${N0 + 1} is too big` })], [1900, null],
          [60, () => up({ ...cur(), show: null, note: null })],
          ...factorTally(), [200, () => up({ ...cur(), note: "the list ends" })], [400, null]);
        break;
      case "count":
        S.push([60, () => up({ ...cur(), postLit: true })], ...factorTally());
        break;
      case "ways":
        S.push([60, () => up({ ...cur(), postLit: true })], ...waysTally());
        break;
    }
    return S;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    acted.current = false; /* the miss is spent: Enter waits for the child's next act */
    api.lock(true);
    tl.run(tracebackSteps(wrong), () => api.lock(false));
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const triedList = Object.keys(s.tried).map(Number).sort((a, b) => a - b);
  api.share({
    number: N, dialA: s.A || null,
    dialB: s.A >= 1 && !(kind === "partner" && stage === "ask") ? Math.floor(N / s.A) : null,
    triedFirsts: triedList,
    pinned: [...s.pairs].sort((p: number[], q: number[]) => p[0] - q[0]),
    mirrored: s.mirrorOn,
    factorCount: s.tally && s.tally.unit === "factors" ? s.tally.items.length : null,
    picks: kind === "posts" ? [s.picks.L ? 1 : null, s.picks.R ? N : null].filter((v) => v !== null) : null,
    complete: stage === "idle",
  });

  /* ── drawing: the correction's layer while it is on show, else the child's own work ── */
  const v = st.demo || st;
  const cards = ppCards(v);
  const pg = ppPen(Math.max(1, cards.length));
  /* the outer card: the child's own picks, with the correction's demo halves (ghost) shown until the next tap */
  const gL = v.picks.L || !!(v.ghost && v.ghost.L), gR = v.picks.R || !!(v.ghost && v.ghost.R);
  const picksCard = kind === "posts" && (gL || gR) && !v.pairs.length ? { a: gL ? 1 : "", b: gR ? N : "" } : null;
  let mx: number | null = null;
  if (v.mirrorOn && !v.lampOff) {
    const sq = cards.findIndex((c: any) => c.a === c.b);
    const mk = cards.findIndex((c: any) => c.mirror);
    if (sq >= 0) mx = pg.x(sq) + pg.w / 2;
    else if (mk > 0) mx = pg.x(mk) - (pg.pitch - pg.w) / 2;
  }
  const spec = v.tally ? null : v.show ? v.show
    : v.A >= 1 ? (v.turned && N % v.A === 0 ? { rows: N / v.A, per: v.A } : { rows: v.A, per: Math.floor(N / v.A) }) : null;
  const have = spec ? (spec.have ?? N) : 0;
  const cellsN = spec ? spec.rows * spec.per : 0;
  const spare = spec ? Math.max(0, have - cellsN) : 0;
  const holes = spec ? Math.max(0, cellsN - have) : 0;
  const grid = spec ? ppGrid(spec.rows, spec.per, box) : null;
  const first = firstOf(v);
  const shown = Math.min(P, N);
  const liveDial = live && K.dial;
  const canUp = liveDial && s.A < N && !(K.strip && gap !== null);
  const canDown = liveDial && s.A > 1;
  const quiet = mix(C.ink, C.panel, 0.5);
  const dragging = drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.kind === "dial";
  const px = dragging ? Math.max(STRIP.x + 8, Math.min(STRIP.x + shown * pitch - 8, drag.drag.x))
    : STRIP.x + ((v.A >= 1 ? v.A : 1) - first + 0.5) * pitch;
  const pairsN = v.pairs.length;

  const invite = !live || stage !== "ask" ? null
    : kind === "posts" ? (!s.picks.L ? { x: 32, y: 76, r: 30 } : !s.picks.R ? { x: 1054, y: 76, r: 30 } : null)
      : s.touched ? null
        : kind === "name" && grid ? { rows: true }
          : kind === "pair" || kind === "hunt" || kind === "comeback" ? { x: 210, y: 462, r: 40 }
            : kind === "skipped" ? { x: 36, y: 462, r: 34 }
              : null;

  const counters: any[] = [];
  if (spec && grid) {
    for (let r = 0; r < spec.rows; r++) for (let c = 0; c < spec.per; c++) {
      const i = r * spec.per + c, x = grid.x(c), y = grid.y(r), cx = x + grid.cw / 2, cy = y + grid.ch / 2;
      if (i >= have) counters.push(<circle key={i} cx={cx} cy={cy} r={Math.max(3, grid.cs * 0.4)} fill="none" stroke={PP_VERM_INK} strokeWidth={2.5} strokeDasharray="4 3" />);
      else if (grid.cw === grid.ch && grid.cs >= 16) counters.push(<Disc key={i} x={cx} y={cy} r={grid.cs * 0.42} paint="gTen" flat />);
      else counters.push(<rect key={i} x={x + grid.cw * 0.1} y={y + grid.ch * 0.1} width={grid.cw * 0.8} height={grid.ch * 0.8} rx={Math.min(grid.cw, grid.ch) * 0.4} fill={PP_AMBER} />);
    }
  }
  const sc = Math.min(spare, 6), sr = Math.ceil(spare / 6);
  const scs = spare ? Math.min(32, (tray.w - 24) / sc, (tray.h - 64) / sr) : 0;

  return (
    <g>
      <style>{PP_CSS}</style>

      {/* the running count, in the runs zone (64,108): the first numbers tried against the number,
          and the pairs pinned; it never counts down and is never a score */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text ref={runRef} x={18} y={-60} fontSize={lang !== "en" && runSmall ? T.micro : T.label} fontWeight={700} fill={C.ink}>{lx(`${Object.keys(v.tried).length} of ${N} tried`)}</text>
        <text x={18} y={-28} fontSize={T.micro} fontWeight={500} fill={C.ink}>{lx(`${pairsN} ${pairsN === 1 ? "pair" : "pairs"} pinned`)}</text>
      </g>

      {/* ── the pen, shut by its two posts from the first frame ── */}
      <rect x={30} y={PEN.y} width={1026} height={PEN.h} rx={20} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
      {v.shaded && <rect x={60} y={PEN.y + 3} width={966} height={PEN.h - 6} fill={PP_AMBER} fillOpacity={0.14} />}
      {v.shaded && <path d={`M 76 12 H 65 V 118 H 76 M 1010 12 H 1021 V 118 H 1010`} fill="none" stroke={PP_AMBER_INK} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />}
      {[{ side: "L", x: 4, v: 1 }, { side: "R", x: 1026, v: N }].map((p) => (
        <g key={p.side}>
          {v.postLit && <rect x={p.x - 2.5} y={2} width={61} height={124} rx={14} fill="none" stroke={PP_AMBER} strokeWidth={5} />}
          <rect x={p.x} y={4} width={56} height={120} rx={12} fill={PP_POST} />
          <text x={p.x + 28} y={78} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill="#FFFFFF">{p.v}</text>
        </g>
      ))}
      {mx !== null && <line x1={mx} y1={PEN.y + 3} x2={mx} y2={PEN.y + PEN.h - 3} stroke={PP_AMBER_INK} strokeWidth={4} strokeDasharray="10 7" />}
      {cards.map((c: any, j: number) => (
        <g key={`${c.a}-${c.b}-${c.mirror ? "m" : "p"}`} className="pp-pop">
          <PenCard x={pg.x(j)} y={CARD.y} w={pg.w} a={c.a} b={c.b} mirror={c.mirror} counted={c.mirror ? null : v.counted} />
        </g>
      ))}
      {picksCard && (
        <g className="pp-pop"><PenCard x={pg.x(0)} y={CARD.y} w={pg.w} a={picksCard.a} b={picksCard.b} counted={v.counted} /></g>
      )}
      {K.posts && live && (
        <g>
          <Hit id="post-left" label={"Left post, " + 1} x={0} y={0} w={72} h={128} onPress={() => dropPost("L")} />
          <Hit id="post-right" label={"Right post, " + N} x={1014} y={0} w={72} h={128} onPress={() => dropPost("R")} />
        </g>
      )}

      {/* ── the ruled board and the leftover shelf ── */}
      <rect x={0} y={BOARD.y} width={1086} height={bh} rx={20} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {v.note && <text x={24} y={178} fontSize={T.label} fontWeight={600} fill={C.ink}>{lx(v.note)}</text>}
      {K.strip && (
        <g>
          <text x={LAMP.x - 26} y={LAMP.y + 10} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("mirror")}</text>
          <circle cx={LAMP.x} cy={LAMP.y} r={14} fill={v.mirrorOn && !v.lampOff ? PP_AMBER : "#FFFFFF"} stroke={v.mirrorOn && !v.lampOff ? PP_AMBER_INK : C.rule} strokeWidth={3} />
          {free && <Hit id="mirror-light" label={v.lampOff ? "Mirror light on" : "Mirror light off"} x={1014} y={140} w={72} h={72} onPress={toggleLamp} />}
        </g>
      )}
      {spec && grid && (
        <g key={"arr" + v.spin} className={v.spin ? "pp-spin" : ""}>
          {grid.ch >= 10 && spec.rows <= 30 && Array.from({ length: spec.rows }).map((_, r) => (
            <rect key={"w" + r} x={grid.x0 - 6} y={grid.y(r) - grid.rg / 2 + 1} width={grid.w + 12} height={grid.ch + grid.rg - 2} rx={Math.min(12, (grid.ch + grid.rg) / 2)} fill={tint(C.panel, 0.4)} />
          ))}
          <g filter="url(#fShadowSoft)">{counters}</g>
        </g>
      )}
      {!v.tally && (
        <g>
          <rect x={tray.x} y={tray.y} width={tray.w} height={tray.h} rx={16} fill="#FFFFFF" stroke={tint(PP_VERM, 0.35)} strokeWidth={2} strokeDasharray="8 6" />
          {spec && <text x={tray.x + tray.w / 2} y={tray.y + 38} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PP_VERM_INK}>{lx(holes ? `${holes} short` : spare ? `${spare} over` : "nothing over")}</text>}
          {spare > 0 && Array.from({ length: spare }).map((_, i) => (
            <Disc key={"sp" + i} x={tray.x + tray.w / 2 + ((i % 6) - (sc - 1) / 2) * scs} y={tray.y + 64 + Math.floor(i / 6) * scs + scs / 2} r={scs * 0.42} paint="gPointer" />
          ))}
        </g>
      )}
      {v.tally && (() => {
        const items = v.tally.items, cnt = items.length, big = v.tally.unit === "factors";
        const tp = Math.min(big ? 130 : 170, 1040 / Math.max(cnt, 1)), x0 = 543 - (tp * (cnt - 1)) / 2;
        const unit = v.tally.unit === "ways" ? (cnt === 1 ? "way" : "ways") : cnt === 1 ? "factor" : "factors";
        return (
          <g data-role="tally">
            {items.map((t: string, i: number) => (
              <text key={i} x={x0 + i * tp} y={big ? 284 : 278} textAnchor="middle" fontSize={big ? T.xl : T.label} fontWeight={700} fill={PP_BLUE_INK}>{t}</text>
            ))}
            <text x={543} y={352} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PP_AMBER_INK}>{lx(`${cnt} ${unit}`)}</text>
          </g>
        );
      })()}
      {kind === "name" && live && <Hit id="turn-board" label="Turn the board a quarter turn" x={0} y={BOARD.y} w={1086} h={bh} onPress={turnBoard} />}

      {/* ── the rows dial ── */}
      {K.dial && (
        <g>
          <Key id="dial-down" label="Dial down one" x={0} y={424} w={72} h={72} C={C} disabled={!canDown} onClick={() => stepTo(cur().A - 1)}>
            <rect x={-15} y={-3.5} width={30} height={7} rx={3.5} fill={canDown ? C.ink : quiet} />
          </Key>
          <rect x={FACE.x} y={FACE.y} width={FACE.w} height={FACE.h} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          {v.A >= 1 && <text x={FACE.x + FACE.w / 2} y={FACE.y + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{v.A}</text>}
          <text x={FACE.x + FACE.w / 2} y={capY} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("rows")}</text>
          <Key id="dial-up" label="Dial up one" x={174} y={424} w={72} h={72} C={C} disabled={!canUp} onClick={() => drive(cur().A + 1)}>
            <rect x={-15} y={-3.5} width={30} height={7} rx={3.5} fill={canUp ? C.ink : quiet} />
            <rect x={-3.5} y={-15} width={7} height={30} rx={3.5} fill={canUp ? C.ink : quiet} />
          </Key>
        </g>
      )}

      {/* ── the run of first numbers: every place keeps its mark ── */}
      {K.strip && (
        <g>
          {Array.from({ length: shown }).map((_, j) => {
            const k = first + j, t = v.tried[k], lit = gap === k, x = STRIP.x + j * pitch, cx = x + pitch / 2;
            return (
              <g key={k + (lit ? "-" + nudge : "")} className={lit && nudge ? "pp-nudge" : ""}>
                <rect x={x + 3} y={STRIP.y} width={pitch - 6} height={STRIP.h} rx={10}
                  fill={lit ? tint(PP_AMBER, 0.6) : t === "pass" ? tint(PP_BLUE, 0.82) : "#FFFFFF"}
                  stroke={lit ? PP_AMBER_INK : t === "pass" ? PP_BLUE : t === "fail" ? tint(PP_VERM, 0.3) : C.rule}
                  strokeWidth={lit ? 4 : 2} strokeDasharray={!t && !lit ? "6 5" : undefined} />
                <text x={cx} y={STRIP.y + 32} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={t === "pass" ? PP_BLUE_INK : C.ink}>{k}</text>
                {t === "fail" && <circle cx={cx} cy={STRIP.y + 52} r={7} fill={PP_VERM} />}
                {t === "pass" && <rect x={cx - 10} y={STRIP.y + 48} width={20} height={7} rx={3.5} fill={PP_BLUE} />}
              </g>
            );
          })}
          <g className={liveDial ? "pp-grab c4-piece" : ""}
            {...(liveDial ? { ...control("dial-pointer", "Drag the dial along the run"), ...drag.bind({ kind: "dial" }), ...drag.keys({ kind: "dial" }) } : {})}>
            <rect x={px - 36} y={456} width={72} height={72} fill="transparent" />
            <path d={`M ${px} ${STRIP.y + STRIP.h + 3} l 11 14 h -22 z`} fill={shade(C.accent, 0.1)} />
            <circle cx={px} cy={511} r={12} fill={v.A >= 1 ? "url(#gAccent)" : "#FFFFFF"} stroke={shade(C.accent, 0.2)} strokeWidth={3} />
          </g>
        </g>
      )}

      {/* free play: the number between the posts is a dial too */}
      {free && (
        <g>
          <Key id="number-down" label="Number down one" x={840} y={424} w={72} h={72} C={C} disabled={busy || N <= 2} onClick={() => setN(cur().N - 1)}>
            <rect x={-15} y={-3.5} width={30} height={7} rx={3.5} fill={busy || N <= 2 ? quiet : C.ink} />
          </Key>
          <rect x={924} y={FACE.y} width={78} height={FACE.h} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={963} y={FACE.y + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PP_AMBER_INK}>{N}</text>
          <text x={963} y={capY} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("number")}</text>
          <Key id="number-up" label="Number up one" x={1014} y={424} w={72} h={72} C={C} disabled={busy || N >= 99} onClick={() => setN(cur().N + 1)}>
            <rect x={-15} y={-3.5} width={30} height={7} rx={3.5} fill={busy || N >= 99 ? quiet : C.ink} />
            <rect x={-3.5} y={-15} width={7} height={30} rx={3.5} fill={busy || N >= 99 ? quiet : C.ink} />
          </Key>
        </g>
      )}

      {/* a card on its way into the pen */}
      {v.fly && (
        <g className="pp-move" style={{ transform: `translate(${v.fly.x}px, ${v.fly.y}px)` } as any} pointerEvents="none">
          <PenCard x={0} y={0} w={v.fly.w} a={v.fly.a} b={v.fly.b} />
        </g>
      )}

      {invite && invite.rows && grid && (
        /* "look at the rows": one slow frame around the whole laid-out pair, not a tap target on its middle */
        <rect className="c4-pulse" x={grid.x0 - 16} y={grid.y0 - 14} width={grid.w + 32} height={grid.h + 28} rx={22}
          fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
      )}
      {invite && !invite.rows && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the pair cards
   in the pen at that moment, beside the right post */
function Thumb({ result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const sh = L.shared || {};
  const N = sh.number;
  if (!N) return null;
  let pairs: number[][] = (sh.pinned || []).slice(0, 3);
  if (!pairs.length) {
    const xs = ppNums(L.value);
    pairs = xs.length === 2 && xs[0] * xs[1] === N ? [[xs[0], xs[1]]] : [[1, N]];
  }
  const cw = 46, ch = h - 12;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {pairs.map((p, i) => {
        const x = 10 + i * 54, cx = x + cw / 2;
        return (
          <g key={i}>
            <rect x={x} y={6} width={cw} height={ch} rx={10} fill="#FFFFFF" stroke={PP_BLUE} strokeWidth={2} />
            <text x={cx} y={35} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PP_BLUE_INK}>{p[0]}</text>
            {ppTimes(cx, 6 + ch / 2 + 1, 4, PP_BLUE, 2.5)}
            <text x={cx} y={6 + ch - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PP_BLUE_INK}>{p[1]}</text>
          </g>
        );
      })}
      <rect x={w - 58} y={6} width={48} height={ch} rx={10} fill={PP_POST} />
      <text x={w - 34} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{N}</text>
    </g>
  );
}

/* Hindi and Gujarati, keyed by the exact English (docs/PATTERNS.md §11). Digits stay digits: the
   runtime says them as words in the language in use. The working area's numbered lines are templates
   ({a}, {b}) read by ppLine. A first draft; it wants a native speaker's read. */
const TR: any = {
  hi: {
    /* the tool, and the lines round it */
    "Pair Pen": "जोड़ों का बाड़ा",
    "Two posts go up first. One at this end, and the number itself at the other.": "पहले दो खंभे खड़े होते हैं। इस सिरे पर एक, और दूसरे सिरे पर खुद वह संख्या।",
    "Shut at both ends, and every factor you found is standing inside.": "दोनों सिरे बंद हैं, और तुम्हारा ढूँढा हर गुणनखंड अंदर खड़ा है।",
    "Free play. Any number between the posts, both dials free, the mirror light as you like.": "मुक्त खेल। खंभों के बीच कोई भी संख्या, दोनों डायल तुम्हारे हाथ में, दर्पण बत्ती जैसी चाहो।",
    /* phase 1 */
    "Two numbers that make the number": "दो संख्याएँ जो संख्या बनाती हैं",
    "Count the rows, then count one row. What does that pair make?": "पंक्तियाँ गिनो, फिर एक पंक्ति गिनो। यह जोड़ा क्या बनाता है?",
    "How many are in one row, and what do the two of them come to?": "एक पंक्ति में कितनी हैं, और इतनी पंक्तियों में कुल कितनी?",
    "Try a small one. Three rows of four make twelve, so three and four are factors of twelve.": "छोटी संख्या लेकर देखो। 4 की 3 पंक्तियाँ 12 बनाती हैं, तो 3 और 4, 12 के गुणनखंड हैं।",
    "Two numbers that multiply to give the number are a factor pair of it, and both of them are factors.": "जिन दो संख्याओं का गुणा वह संख्या दे, वे उसके गुणनखंडों का जोड़ा हैं। दोनों ही उसके गुणनखंड हैं।",
    "You learned: rows times how many in each row makes a factor pair.": "तुमने सीखा: पंक्तियाँ और हर पंक्ति की संख्या, गुणनखंडों का जोड़ा हैं।",
    "4 and 17: which are factors?": "4 और 17: कौन गुणनखंड हैं?",
    "A tray holds 4 rows of 17 seeds, which comes to 68 seeds. What does that make 4 and 17?": "एक ट्रे में 4 पंक्तियाँ हैं, हर पंक्ति में 17 बीज, कुल 68 बीज। तो 4 और 17 क्या हुए?",
    "The rows make 68 only with the number in each row. Does that number count too?": "पंक्तियाँ, हर पंक्ति की संख्या के साथ ही 68 बनाती हैं। क्या वह संख्या भी गिनी जाएगी?",
    "How many in each row?": "हर पंक्ति में कितनी?",
    "65 counters stand in 5 rows. How many are in each row? The two numbers make a factor pair of 65.": "65 गोटियाँ 5 पंक्तियों में खड़ी हैं। हर पंक्ति में कितनी हैं? ये दो संख्याएँ 65 के गुणनखंडों का जोड़ा बनाती हैं।",
    "Count the counters along one row, from left to right.": "एक पंक्ति की गोटियाँ बाएँ से दाएँ गिनो।",
    "A pair for 22, not using 1": "22 का जोड़ा, 1 के बिना",
    "Write a factor pair of 22 that does not use 1. Step the dial, then press enter to pin the pair.": "22 के गुणनखंडों का ऐसा जोड़ा लिखो जिसमें 1 न हो। डायल आगे बढ़ाओ, फिर जोड़ा लगाने के लिए एंटर दबाओ।",
    "A factor pair leaves nothing over, and this one must not use 1.": "गुणनखंडों के जोड़े में कुछ नहीं बचता, और इस जोड़े में 1 नहीं होना चाहिए।",
    "only 4": "सिर्फ़ 4", "only 17": "सिर्फ़ 17", "both": "दोनों", "neither": "कोई नहीं",
    /* phase 2 */
    "Going up in order, and knowing when the pairs repeat": "क्रम से ऊपर बढ़ना, और जानना कि जोड़े कब वापस आने लगते हैं",
    "Move the first dial up one at a time. Tell me when a pair comes back.": "पहला डायल एक एक करके ऊपर बढ़ाओ। बताओ, कोई जोड़ा कब वापस आता है।",
    "Could a value you skipped have made the number?": "जो पहली संख्या तुमने छोड़ी, क्या वह भी जोड़ा बना सकती थी?",
    "Walk a small number such as 10, one place at a time, and watch for the pair that turns round.": "10 जैसी छोटी संख्या पर एक एक खाना आगे चलो। देखो कौन सा जोड़ा उलटकर आता है।",
    "Work the first number up from one and try every value in turn. Stop when a pair repeats one already pinned.": "पहली संख्या एक से ऊपर बढ़ाओ और हर संख्या बारी बारी से आज़माओ। जब कोई जोड़ा पहले लगे जोड़े को दोहराए, तब रुको।",
    "You learned: go up from one, and stop when a pair comes back.": "तुमने सीखा: एक से ऊपर बढ़ो, और जोड़ा वापस आए तो रुको।",
    "Every factor of 21": "21 के सारे गुणनखंड",
    "Pair up the factors of 21, working the first number up from 1. Watch which trials fail. Press enter when every factor is in the pen.": "21 के गुणनखंडों के जोड़े बनाओ, पहली संख्या 1 से बढ़ाते हुए। देखो कौन सी कोशिशें असफल होती हैं। जब हर गुणनखंड बाड़े में हो, तब एंटर दबाओ।",
    "Which is the lowest place on the run with nothing on it?": "पट्टी पर सबसे छोटा खाली खाना कौन सा है?",
    "Where does a pair come back?": "जोड़ा कहाँ वापस आता है?",
    "Pair up the factors of 46, working the first number up from 1. At which first number does a pair come back?": "46 के गुणनखंडों के जोड़े बनाओ, पहली संख्या 1 से बढ़ाते हुए। किस पहली संख्या पर कोई जोड़ा वापस आता है?",
    "Keep going past the failures, and stop only when the mirror light comes on.": "असफल कोशिशों से आगे बढ़ते रहो, और दर्पण बत्ती जलने पर ही रुको।",
    "Skipped trial: does it work?": "छूटी कोशिश: क्या वह सफल है?",
    "A child pairing the factors of 27 writes 1 and 27, then jumps to 3 and 9. Which trial was skipped, and does it work?": "एक बच्चा 27 के गुणनखंडों के जोड़े बना रहा है। वह 1 और 27 लिखकर सीधे 3 और 9 पर जाता है। कौन सी कोशिश छूटी, और क्या वह सफल है?",
    "Lay out 2 rows of 27. Is anything left over?": "27 को 2 पंक्तियों में रखो। क्या कुछ बचता है?",
    "it works": "सफल है", "it fails": "असफल है",
    /* phase 3 */
    "The two factors every number has": "वे दो गुणनखंड जो हर संख्या के होते हैं",
    "The posts are up again, and the board is bare.": "खंभे फिर से खड़े हैं, और तख्ता खाली है।",
    "Which number is standing on the right post, and is it a factor too?": "दाएँ खंभे पर कौन सी संख्या खड़ी है, और क्या वह भी गुणनखंड है?",
    "Take 6. Lay it as a single row, then as 6 rows. Is anything ever left over?": "6 लो। उसे एक पंक्ति में रखो, फिर 6 पंक्तियों में। क्या कभी कुछ बचता है?",
    "One is a factor of every number, and every number is a factor of itself.": "संख्या 1 हर संख्या का गुणनखंड है, और हर संख्या खुद अपना गुणनखंड है।",
    "You learned: one and the number itself are always factors.": "तुमने सीखा: 1 और खुद वह संख्या हमेशा गुणनखंड होते हैं।",
    "Two factors of 57, no dividing": "57 के 2 गुणनखंड बिना भाग किए",
    "Take the number 57. Can you name two of its factors before doing any dividing at all? Tap the ones you know, then press enter.": "संख्या 57 लो। क्या तुम बिना कोई भाग किए उसके दो गुणनखंड बता सकते हो? जो पता हैं उन्हें छुओ, फिर एंटर दबाओ।",
    "Lay 57 out as 57 rows. Is anything left over?": "57 को 57 पंक्तियों में रखो। क्या कुछ बचता है?",
    "Factors of 58": "58 के गुणनखंड",
    "Name the smallest factor of 58 and the greatest factor of 58.": "58 का सबसे छोटा गुणनखंड और सबसे बड़ा गुणनखंड बताओ।",
    "Could the greatest factor be 58 itself? Try it as a single row.": "क्या सबसे बड़ा गुणनखंड खुद 58 हो सकता है? इसे एक पंक्ति में रखकर देखो।",
    "smallest": "सबसे छोटा", "greatest": "सबसे बड़ा",
    "1 and 99: factors of 99?": "1 और 99: 99 के गुणनखंड?",
    "Is 1 a factor of 99? Is 99 a factor of 99?": "क्या 1, 99 का गुणनखंड है? क्या 99, 99 का गुणनखंड है?",
    "Share 99 into 99 rows. How many stand on the leftover shelf?": "99 को 99 पंक्तियों में बाँटो। बची गोटियों वाली जगह पर कितनी खड़ी हैं?",
    "only 1": "सिर्फ़ 1", "only 99": "सिर्फ़ 99",
    /* phase 4 */
    "Why a factor list always ends": "गुणनखंडों की सूची हमेशा खत्म क्यों होती है",
    "The pen is full this time. Look at where each factor is standing.": "इस बार बाड़ा भरा है। देखो हर गुणनखंड कहाँ खड़ा है।",
    "Could a factor stand outside them?": "क्या कोई गुणनखंड खंभों के बाहर खड़ा हो सकता है?",
    "Take 9. Its factors are 1, 3 and 9, all standing between the posts.": "9 लो। उसके गुणनखंड 1, 3 और 9 हैं, सब खंभों के बीच खड़े हैं।",
    "Every factor lies between one and the number itself, so a factor list is finite and can be counted.": "हर गुणनखंड 1 और खुद उस संख्या के बीच होता है। इसलिए गुणनखंडों की सूची सीमित है और गिनी जा सकती है।",
    "You learned: every factor sits between the posts, so the list ends.": "तुमने सीखा: हर गुणनखंड खंभों के बीच है, इसलिए सूची खत्म होती है।",
    "34's factors: for ever?": "34 के गुणनखंड: हमेशा चलते हैं?",
    "Could 34 have factors going on for ever? Look at the two posts before you choose.": "क्या 34 के गुणनखंड हमेशा चलते रह सकते हैं? चुनने से पहले दोनों खंभों को देखो।",
    "Which two numbers are standing on the posts?": "खंभों पर कौन सी दो संख्याएँ खड़ी हैं?",
    "it ends": "खत्म होते", "for ever": "हमेशा चलते",
    "How many factors has 81?": "81 के कितने गुणनखंड हैं?",
    "How many factors has 81, and how do you know there are no more?": "81 के कितने गुणनखंड हैं, और तुम्हें कैसे पता कि और नहीं हैं?",
    "The 9 card holds one number twice. How many different numbers are in the pen?": "9 वाले कार्ड पर एक ही संख्या दो बार है। बाड़े में कितनी अलग अलग संख्याएँ हैं?",
    "How many ways for 78 pots?": "78 घड़ों के कितने तरीके?",
    "A stall has 78 pots and wants them in equal rows. It wants more than one row, and more than one pot in a row. How many ways are there?": "एक दुकान में 78 घड़े हैं, जिन्हें बराबर पंक्तियों में रखना है। पंक्तियाँ एक से ज़्यादा हों, और हर पंक्ति में घड़े भी एक से ज़्यादा। कितने तरीके हैं?",
    "Leave out the outer pair. Each other card can be laid out two ways round.": "बाहर वाला जोड़ा छोड़ दो। बाकी हर कार्ड दो तरह से रखा जा सकता है, सीधा और उलटा।",
    /* the working area's own words */
    "mirror": "दर्पण", "rows": "पंक्तियाँ", "number": "संख्या",
    "both are factors": "दोनों गुणनखंड हैं", "that uses 1": "इसमें 1 है", "the list ends": "सूची खत्म होती है", "nothing over": "कुछ नहीं बचा",
    "{a} of {b} tried": "{b} में से {a} आज़माए", "{a} pair pinned": "{a} जोड़ा लगा", "{a} pairs pinned": "{a} जोड़े लगे",
    "1 row of {a}": "{a} की 1 पंक्ति", "{a} rows of {b}": "{b} की {a} पंक्तियाँ", "{a} in each row": "हर पंक्ति में {a}",
    "comes back at {a}": "{a} पर वापस आता है", "2 leaves {a} over": "2 पंक्तियों में {a} बचता है", "greatest is {a}": "सबसे बड़ा गुणनखंड {a} है",
    "1 and {a}": "1 और {a}", "{a} is too big": "{a} बहुत बड़ा है", "{a} short": "{a} कम", "{a} over": "बाकी {a}",
    "{a} factor": "{a} गुणनखंड", "{a} factors": "{a} गुणनखंड", "{a} way": "{a} तरीका", "{a} ways": "{a} तरीके",
  },
  gu: {
    /* the tool, and the lines round it */
    "Pair Pen": "જોડનો વાડો",
    "Two posts go up first. One at this end, and the number itself at the other.": "પહેલાં બે થાંભલા ઊભા થાય છે. આ છેડે એક, અને બીજા છેડે એ સંખ્યા પોતે.",
    "Shut at both ends, and every factor you found is standing inside.": "બંને છેડા બંધ છે, અને તમે શોધેલો દરેક અવયવ અંદર ઊભો છે.",
    "Free play. Any number between the posts, both dials free, the mirror light as you like.": "મુક્ત રમત. થાંભલા વચ્ચે કોઈ પણ સંખ્યા, બંને ડાયલ તમારા હાથમાં, અરીસાની બત્તી તમને ગમે તેમ.",
    /* phase 1 */
    "Two numbers that make the number": "સંખ્યા બનાવતી બે સંખ્યાઓ",
    "Count the rows, then count one row. What does that pair make?": "હાર ગણો, પછી એક હાર ગણો. આ જોડ શું બનાવે છે?",
    "How many are in one row, and what do the two of them come to?": "એક હારમાં કેટલી છે, અને આટલી હારમાં કુલ કેટલી?",
    "Try a small one. Three rows of four make twelve, so three and four are factors of twelve.": "નાની સંખ્યા લઈને જુઓ. 4ની 3 હાર 12 બનાવે છે, તેથી 3 અને 4, 12ના અવયવ છે.",
    "Two numbers that multiply to give the number are a factor pair of it, and both of them are factors.": "જે બે સંખ્યાનો ગુણાકાર એ સંખ્યા આપે, તે તેના અવયવની જોડ છે. બંને તેના અવયવ છે.",
    "You learned: rows times how many in each row makes a factor pair.": "તમે શીખ્યા: હાર ગુણ્યા દરેક હારમાં કેટલી, એ અવયવની જોડ છે.",
    "4 and 17: which are factors?": "4 અને 17: કયા અવયવ છે?",
    "A tray holds 4 rows of 17 seeds, which comes to 68 seeds. What does that make 4 and 17?": "એક ટ્રેમાં 4 હાર છે, દરેક હારમાં 17 બીજ, કુલ 68 બીજ. તો 4 અને 17 શું થયા?",
    "The rows make 68 only with the number in each row. Does that number count too?": "હાર, દરેક હારની સંખ્યા સાથે જ 68 બનાવે છે. શું એ સંખ્યા પણ ગણાય?",
    "How many in each row?": "દરેક હારમાં કેટલી?",
    "65 counters stand in 5 rows. How many are in each row? The two numbers make a factor pair of 65.": "65 કૂકરીઓ 5 હારમાં ઊભી છે. દરેક હારમાં કેટલી છે? આ બે સંખ્યા 65ના અવયવની જોડ બનાવે છે.",
    "Count the counters along one row, from left to right.": "એક હારની કૂકરીઓ ડાબેથી જમણે ગણો.",
    "A pair for 22, not using 1": "22ની જોડ, 1 વગર",
    "Write a factor pair of 22 that does not use 1. Step the dial, then press enter to pin the pair.": "22ના અવયવની એવી જોડ લખો જેમાં 1 ન હોય. ડાયલ આગળ ખસેડો, પછી જોડ લગાવવા એન્ટર દબાવો.",
    "A factor pair leaves nothing over, and this one must not use 1.": "અવયવની જોડમાં કંઈ વધતું નથી, અને આ જોડમાં 1 ન હોવો જોઈએ.",
    "only 4": "ફક્ત 4", "only 17": "ફક્ત 17", "both": "બંને", "neither": "એકેય નહીં",
    /* phase 2 */
    "Going up in order, and knowing when the pairs repeat": "ક્રમમાં આગળ વધવું, અને જોડ ક્યારે ફરી આવે તે જાણવું",
    "Move the first dial up one at a time. Tell me when a pair comes back.": "પહેલું ડાયલ એક એક કરીને આગળ વધારો. કોઈ જોડ ક્યારે પાછી આવે તે મને કહો.",
    "Could a value you skipped have made the number?": "તમે છોડેલી પહેલી સંખ્યા, શું જોડ બનાવી શકી હોત?",
    "Walk a small number such as 10, one place at a time, and watch for the pair that turns round.": "10 જેવી નાની સંખ્યા પર એક એક ખાનું આગળ ચાલો. જુઓ કઈ જોડ ઊલટી થઈને આવે છે.",
    "Work the first number up from one and try every value in turn. Stop when a pair repeats one already pinned.": "પહેલી સંખ્યા એકથી આગળ વધારો અને દરેક સંખ્યા વારાફરતી અજમાવો. કોઈ જોડ પહેલાં લાગેલી જોડને ફરી બતાવે ત્યારે અટકો.",
    "You learned: go up from one, and stop when a pair comes back.": "તમે શીખ્યા: એકથી આગળ વધો, અને જોડ પાછી આવે ત્યારે અટકો.",
    "Every factor of 21": "21ના બધા અવયવ",
    "Pair up the factors of 21, working the first number up from 1. Watch which trials fail. Press enter when every factor is in the pen.": "21ના અવયવની જોડ બનાવો, પહેલી સંખ્યા 1થી વધારતા જાઓ. જુઓ કઈ અજમાયશ નિષ્ફળ જાય છે. દરેક અવયવ વાડામાં આવે ત્યારે એન્ટર દબાવો.",
    "Which is the lowest place on the run with nothing on it?": "પટ્ટી પર સૌથી નાનું ખાલી ખાનું કયું છે?",
    "Where does a pair come back?": "જોડ ક્યાં પાછી આવે છે?",
    "Pair up the factors of 46, working the first number up from 1. At which first number does a pair come back?": "46ના અવયવની જોડ બનાવો, પહેલી સંખ્યા 1થી વધારતા જાઓ. કઈ પહેલી સંખ્યા પર જોડ પાછી આવે છે?",
    "Keep going past the failures, and stop only when the mirror light comes on.": "નિષ્ફળ અજમાયશથી આગળ વધતા રહો, અને અરીસાની બત્તી ચાલુ થાય ત્યારે જ અટકો.",
    "Skipped trial: does it work?": "છૂટેલી અજમાયશ: શું તે સફળ છે?",
    "A child pairing the factors of 27 writes 1 and 27, then jumps to 3 and 9. Which trial was skipped, and does it work?": "એક બાળક 27ના અવયવની જોડ બનાવે છે. તે 1 અને 27 લખીને સીધું 3 અને 9 પર જાય છે. કઈ અજમાયશ છૂટી ગઈ, અને શું તે સફળ છે?",
    "Lay out 2 rows of 27. Is anything left over?": "27ને 2 હારમાં ગોઠવો. શું કંઈ વધે છે?",
    "it works": "સફળ છે", "it fails": "નિષ્ફળ છે",
    /* phase 3 */
    "The two factors every number has": "દરેક સંખ્યાના હોય એવા બે અવયવ",
    "The posts are up again, and the board is bare.": "થાંભલા ફરી ઊભા છે, અને પાટિયું ખાલી છે.",
    "Which number is standing on the right post, and is it a factor too?": "જમણા થાંભલા પર કઈ સંખ્યા ઊભી છે, અને શું તે પણ અવયવ છે?",
    "Take 6. Lay it as a single row, then as 6 rows. Is anything ever left over?": "6 લો. તેને એક હારમાં ગોઠવો, પછી 6 હારમાં. શું ક્યારેય કંઈ વધે છે?",
    "One is a factor of every number, and every number is a factor of itself.": "સંખ્યા 1 દરેક સંખ્યાનો અવયવ છે, અને દરેક સંખ્યા પોતે પોતાનો અવયવ છે.",
    "You learned: one and the number itself are always factors.": "તમે શીખ્યા: એક અને એ સંખ્યા પોતે હંમેશાં અવયવ હોય છે.",
    "Two factors of 57, no dividing": "57ના બે અવયવ, ભાગાકાર વગર",
    "Take the number 57. Can you name two of its factors before doing any dividing at all? Tap the ones you know, then press enter.": "સંખ્યા 57 લો. શું તમે કોઈ ભાગાકાર કર્યા વગર તેના બે અવયવ કહી શકો? જે ખબર હોય તેને અડકો, પછી એન્ટર દબાવો.",
    "Lay 57 out as 57 rows. Is anything left over?": "57ને 57 હારમાં ગોઠવો. શું કંઈ વધે છે?",
    "Factors of 58": "58ના અવયવ",
    "Name the smallest factor of 58 and the greatest factor of 58.": "58નો સૌથી નાનો અવયવ અને સૌથી મોટો અવયવ કહો.",
    "Could the greatest factor be 58 itself? Try it as a single row.": "શું સૌથી મોટો અવયવ પોતે 58 હોઈ શકે? તેને એક હારમાં ગોઠવીને જુઓ.",
    "smallest": "સૌથી નાનો", "greatest": "સૌથી મોટો",
    "1 and 99: factors of 99?": "1 અને 99: 99ના અવયવ?",
    "Is 1 a factor of 99? Is 99 a factor of 99?": "શું 1, 99નો અવયવ છે? શું 99, 99નો અવયવ છે?",
    "Share 99 into 99 rows. How many stand on the leftover shelf?": "99ને 99 હારમાં વહેંચો. વધેલી કૂકરીઓની છાજલી પર કેટલી ઊભી છે?",
    "only 1": "ફક્ત 1", "only 99": "ફક્ત 99",
    /* phase 4 */
    "Why a factor list always ends": "અવયવની યાદી હંમેશાં કેમ પૂરી થાય છે",
    "The pen is full this time. Look at where each factor is standing.": "આ વખતે વાડો ભરેલો છે. જુઓ દરેક અવયવ ક્યાં ઊભો છે.",
    "Could a factor stand outside them?": "શું કોઈ અવયવ થાંભલાની બહાર ઊભો રહી શકે?",
    "Take 9. Its factors are 1, 3 and 9, all standing between the posts.": "9 લો. તેના અવયવ 1, 3 અને 9 છે, બધા થાંભલા વચ્ચે ઊભા છે.",
    "Every factor lies between one and the number itself, so a factor list is finite and can be counted.": "દરેક અવયવ એક અને એ સંખ્યાની વચ્ચે હોય છે. તેથી અવયવની યાદી મર્યાદિત છે અને ગણી શકાય છે.",
    "You learned: every factor sits between the posts, so the list ends.": "તમે શીખ્યા: દરેક અવયવ થાંભલા વચ્ચે છે, તેથી યાદી પૂરી થાય છે.",
    "34's factors: for ever?": "34ના અવયવ: કાયમ ચાલે છે?",
    "Could 34 have factors going on for ever? Look at the two posts before you choose.": "શું 34ના અવયવ કાયમ ચાલતા રહી શકે? પસંદ કરતાં પહેલાં બંને થાંભલા જુઓ.",
    "Which two numbers are standing on the posts?": "થાંભલા પર કઈ બે સંખ્યા ઊભી છે?",
    "it ends": "પૂરા થાય", "for ever": "કાયમ ચાલે",
    "How many factors has 81?": "81ના કેટલા અવયવ છે?",
    "How many factors has 81, and how do you know there are no more?": "81ના કેટલા અવયવ છે, અને તમને કેવી રીતે ખબર કે વધુ નથી?",
    "The 9 card holds one number twice. How many different numbers are in the pen?": "9 વાળા કાર્ડ પર એક જ સંખ્યા બે વાર છે. વાડામાં કેટલી જુદી જુદી સંખ્યા છે?",
    "How many ways for 78 pots?": "78 માટલાંની કેટલી રીત?",
    "A stall has 78 pots and wants them in equal rows. It wants more than one row, and more than one pot in a row. How many ways are there?": "એક દુકાનમાં 78 માટલાં છે, જેને સરખી હારમાં ગોઠવવાં છે. હાર એકથી વધુ હોય, અને દરેક હારમાં માટલાં પણ એકથી વધુ. કેટલી રીત છે?",
    "Leave out the outer pair. Each other card can be laid out two ways round.": "બહારની જોડ છોડી દો. બાકીનું દરેક કાર્ડ બે રીતે ગોઠવી શકાય, સીધું અને ઊલટું.",
    /* the working area's own words */
    "mirror": "અરીસો", "rows": "હાર", "number": "સંખ્યા",
    "both are factors": "બંને અવયવ છે", "that uses 1": "આમાં 1 છે", "the list ends": "યાદી પૂરી થાય છે", "nothing over": "કંઈ ન વધ્યું",
    "{a} of {b} tried": "{b}માંથી {a} અજમાવ્યા", "{a} pair pinned": "{a} જોડ લાગી", "{a} pairs pinned": "{a} જોડ લાગી",
    "1 row of {a}": "{a}ની 1 હાર", "{a} rows of {b}": "{b}ની {a} હાર", "{a} in each row": "દરેક હારમાં {a}",
    "comes back at {a}": "{a} પર પાછી આવે છે", "2 leaves {a} over": "2 હારમાં {a} વધે છે", "greatest is {a}": "સૌથી મોટો અવયવ {a} છે",
    "1 and {a}": "1 અને {a}", "{a} is too big": "{a} બહુ મોટો છે", "{a} short": "{a} ખૂટે છે", "{a} over": "બાકી {a}",
    "{a} factor": "{a} અવયવ", "{a} factors": "{a} અવયવ", "{a} way": "{a} રીત", "{a} ways": "{a} રીત",
  },
};

function PairPen(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default PairPen;
