/* ═══ M1.S2.T4.C12.2D1 · multiple_track · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "multiple_track";
const MEDIA_ID = "M1.S2.T4.C12.2D1";
const TOOL_NAME = "Multiple Track";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A track, one step block, and no end mark anywhere along it."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Still running off the edge, and you never did find a last one.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any step size, the track as far as you like, the band on or off.";

/* ── the track ──────────────────────────────────────────────────────────────────────────────
   One picture in every phase: a rule from a start post that runs out through the right edge of the
   frame, with nothing drawn there to end it. Phase 1 shows it close up, one stone a number, and the
   child plants a flag on the stone where each step lands (the list is made on the track). Phases 2-4
   show it at the size of a step: each step an arc as long as every other, a numbered flag where it
   lands. The chapter's colours: a multiple (built by multiplying) is green, a factor (divides
   exactly) deep blue, the number in hand (the step block, each step laid, the band's count) amber.
   Host icon names (Flag, Ruler…) are never used as names here: the host declares them in scope. */
const GREEN = CONTENT.one;
const BLUE = CONTENT.hundred;
const AMBER = CONTENT.ten;
const LINE = CONTENT.line;
const INK_G = shade(GREEN, 0.25);
const INK_B = shade(BLUE, 0.25);
const INK_A = shade(AMBER, 0.25);
const RULE_Y = 392;                 /* the rule the steps are laid on (working-area units) */
const X0 = 44;                      /* the start post */
const PITCH = W.w / 15;             /* phase 1: one stone a number, fifteen in the frame */
const STONE_Y = 440;                /* phase 1: the stones' middle line */
const FLAG_TOP = RULE_Y - 146;      /* a flag's pennant, 50 tall, on a pole from the rule */
const FLAG_H = 50;
const NOTE = { x: W.w - 12, y: 150 }; /* where a result is named after the answer */
const SLOTS = (sp: number) => Math.max(1, Math.floor((W.w - 100 - X0) / sp));
const shiftFor = (k: number, sp: number) => Math.max(0, k - SLOTS(sp));
const flagW = (v: number) => Math.max(48, indian(v).length * 19 + 20);

/* a list answer arrives as "9,18,27", "9, 18 and 27" or [9, 18, 27] */
const numsIn = (v: any): number[] => {
  const raw: any[] = Array.isArray(v) ? v : String(v ?? "").match(/\d+/g) || [];
  return raw.map((x: any) => Number(x)).filter((x: number) => isFinite(x));
};
const sortedSet = (xs: number[]) => Array.from(new Set(xs)).sort((a, b) => a - b);
const sameList = (a: number[], b: number[]) => {
  const x = sortedSet(a), y = sortedSet(b);
  return x.length === y.length && x.every((e, i) => e === y[i]);
};
/* the slot holds the list the child made on the track; a single flag keeps a comma so it reads as a list */
const listText = (xs: number[]) => xs.join(",") + (xs.length === 1 ? "," : "");
const isList = (it: any) => Array.isArray(it.answer) && !it.parts;
/* the slot shows a list as how many flags it holds (the numbers are on the track); the runtime hands
   format its tx (r18+), and puts a word choice's id (yes, no, infinite) through the TR itself */
const mtShown = (s: any, _j?: any, o?: any) => {
  const tx = (o && o.tx) || ((v: any) => v);
  const t = String(s ?? "");
  if (!t.includes(",")) return t;
  const k = numsIn(t).length;
  return k === 1 ? tx("1 flag") : k + " " + tx("flags");
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase. qid = the plan's question id. Item kinds:
           plant       tap the stones where the steps land (a list, Enter sends it)   s, n, given
           first       type where the first step lands                                s, sp
           lowthird    two boxes: the lowest and the third multiple                   s, sp
           last        yes or no: is there a last flag? (the "last flag?" key lays the next)  s, sp, laid
           next        type the multiple after the last flag                          s, sp, laid
           howmany     the pen of factors beside the track: how many multiples?       s, sp, laid, pen
           between     type how many flags stand strictly inside the band             s, sp, laid, lo, hi
           betweenList tap every flag strictly inside the band (a list, Enter sends it)
           near = the item's misconception (judge rejects it; the wrong-answer shots use it) */
const PHASES = [
  {
    n: 1,
    concept: "A times table read as a list",
    conceptId: "M1.S2.T4.C12", objectiveIds: ["O5"],
    says: ["Look at the answers in a times table. What are you really looking at?",
      "Tap the stone where a step lands, and a flag goes in."],
    ladder: ["Which line of the table does each flag answer?", "Count the stones of one step. Count the same again from the last flag."],
    closing: "The answers in a times table are the multiples of that number.",
    learned: "You learned: a times table lists the multiples of its number.",
    traceback: "The steps are laid again from the start post, one table line at a time: each landing lights, and the table strip fills with the right answers.",
    items: [
      /* learn ML1: answer in the plan = 9, 18, 27, 36, 45 and 54, and they are the multiples of 9.
         "What is that list called?" is not a number: the win names the flags "multiples of 9". */
      { qid: "M1.S2.T4.C12:ML1", kind: "plant", s: 9, n: 6, given: 0, answer: [9, 18, 27, 36, 45, 54], near: [1, 9, 18, 27, 36, 45],  /* the 1 of "1 x 9" ringed as a multiple too */
        pad: "enter", winMs: 3000, ask: "First six in the table of 9",
        say: "Plant a flag on each of the first six answers in the table of 9. Then press enter.",
        miss: "Say the table of 9 aloud. Is every flag on one of its answers?" },
      /* practice 1: answer in the plan = 13, 26, 39, 52 and 65 */
      { qid: "M1.S2.T4.C12:1", kind: "plant", s: 13, n: 5, given: 0, answer: [13, 26, 39, 52, 65], near: [1, 13],  /* the column read as the factors of 13 */
        pad: "enter", winMs: 2800, ask: "First five multiples of 13",
        say: "Now the first five multiples of 13. Count on from the post in steps of 13, then press enter.",
        miss: "How many stones long is one step of 13?" },
      /* practice 3: answer in the plan = 44, 55 and 66 (11, 22 and 33 stand on the track already) */
      { qid: "M1.S2.T4.C12:3", kind: "plant", s: 11, n: 6, given: 3, answer: [44, 55, 66], near: [44, 55, 66, 77],
        pad: "enter", winMs: 3000, ask: "Next three after 33",
        say: "Flags stand on 11, 22 and 33 already. Plant the next three multiples of 11.",
        miss: "How far apart are the flags that were already standing?" },
    ],
  },
  {
    n: 2,
    concept: "The first multiple of a number",
    conceptId: "M1.S2.T4.C13", objectiveIds: ["O5"],
    says: ["This time the step waits for you.", "Type where it will land, and then it goes down."],
    ladder: ["Where does one step from the post land?", "Say it as a table line. One times the number is what?"],
    closing: "The first and lowest multiple of a number is the number itself.",
    learned: "You learned: one times a number gives its first and lowest multiple.",
    traceback: "The child's number stays marked under the track; one step is laid from the post and its flag lands on the number itself, with 1 × the number written above it.",
    items: [
      /* learn ML2: answer in the plan = 23 itself, because 1 times 23 is 23 (the win writes 1 × 23 over the flag) */
      { qid: "M1.S2.T4.C13:ML2", kind: "first", s: 23, sp: 230, answer: 23, near: 46, winMs: 2000, ask: "First multiple of 23?",
        say: "What is the first multiple of 23? Type where the very first step lands.",
        miss: "How many steps does it take to reach the first flag?" },
      /* practice 2: answer in the plan = 37 itself */
      { qid: "M1.S2.T4.C13:2", kind: "first", s: 37, sp: 230, answer: 37, near: 74, winMs: 2000, ask: "First multiple of 37?",
        say: "The step block holds 37 now. What is its first multiple?",
        miss: "Does the first step start at the post, or somewhere further on?" },
      /* practice 4: answer in the plan = 23 is the lowest, and the third is 69 (two boxes) */
      { qid: "M1.S2.T4.C13:4", kind: "lowthird", s: 23, sp: 230, answer: [23, 69], near: [1, 69],
        parts: [{ label: "lowest" }, { label: "third" }], winMs: 2600, ask: "Lowest and third multiple of 23",
        say: "Which is the lowest multiple of 23, and which is its third? One answer goes in each box.",
        miss: "The lowest is one step from the post. How many steps reach the third?" },
    ],
  },
  {
    n: 3,
    concept: "Multiples that never run out",
    conceptId: "M1.S2.T4.C14", objectiveIds: ["O6"],
    says: ["Ask the track for its last flag, as often as you like.", "Watch what it hands you each time."],
    ladder: ["What happens if you lay one more step?", "Pick any flag at all. Is there a step after it?"],
    closing: "A number has infinite multiples, so there is no last one to find.",
    learned: "You learned: after every multiple comes another; the list never ends.",
    traceback: "The flag where the child stopped keeps its ring while the track lays step after step past it, each as long as the first, and scrolls on with the edge still empty.",
    items: [
      /* learn ML3: answer in the plan = No. There is no last one */
      { qid: "M1.S2.T4.C14:ML3", kind: "last", s: 11, sp: 92, laid: 12, answer: "no", near: "yes", winMs: 3400,
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], ask: "Is there a last one?",
        say: "Here are twelve multiples of 11. Can you write the last one?",
        miss: "What did the track hand you when you asked for the last flag?" },
      /* practice 5: answer in the plan = They do not stop. 20 times 6 is 120, and there is always a next one.
         A "what would you tell" question, made checkable: the multiple after 100 is the reply. */
      { qid: "M1.S2.T4.C14:5", kind: "next", s: 20, sp: 150, laid: 5, answer: 120, near: 100, winMs: 3200, ask: "Next multiple after 100?",
        say: "A child says the multiples of 20 stop at 100. Which multiple of 20 comes after 100?",
        miss: "Which line of the table comes after 5 times 20?" },
      /* practice 7: answer in the plan = Four factors, 1, 3, 17 and 51, and its multiples never run out.
         The pen shows the four factors; the question asks the multiples' half, as the book's word (infinite). */
      { qid: "M1.S2.T4.C14:7", kind: "howmany", s: 51, sp: 200, laid: 4, pen: [1, 3, 17, 51], answer: "infinite", near: "4", winMs: 3400,
        choices: [{ id: "4", label: "4" }, { id: "10", label: "10" }, { id: "infinite", label: "infinite" }], ask: "How many multiples of 51?",
        say: "The pen holds the four factors of 51. How many multiples has 51?",
        miss: "The pen is shut at both ends. Is the track shut anywhere?" },
    ],
  },
  {
    n: 4,
    concept: "Between leaves out both ends",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O6"],
    says: ["Count only what is inside the band. What about the two on the posts?"],
    ladder: ["Is a flag on a post inside the band, or outside it?", "Touch each flag between the posts and count aloud."],
    closing: "Between leaves out both ends, and a how many question wants the count as well as the list.",
    learned: "You learned: a flag on a post stays out; count what is strictly inside.",
    traceback: "Only the stretch strictly inside the posts is shaded, stopping short of each post; the flags on the posts stay at full strength outside it, and the flags inside are counted one by one.",
    items: [
      /* learn ML4: answer in the plan = Four of them: 27, 36, 45 and 54. The count first (the plan's teaching note) */
      { qid: "M1.S2.T4.C15:ML4", kind: "between", s: 9, sp: 118, laid: 8, lo: 18, hi: 63, answer: 4, near: 6, winMs: 2600,
        ask: "How many between 18 and 63?",
        say: "How many multiples of 9 lie between 18 and 63? Type the count first.",
        miss: "Which flags are standing on the two posts?" },
      /* practice 6: answer in the plan = 30, 36, 42, 48 and 54 (a list: tap the flags, then Enter) */
      { qid: "M1.S2.T4.C15:6", kind: "betweenList", s: 6, sp: 88, laid: 11, lo: 25, hi: 55, answer: [30, 36, 42, 48, 54],
        near: [24, 30, 36, 42, 48, 54, 60], pad: "enter", winMs: 3000, ask: "Multiples of 6 between 25 and 55",
        say: "Tap every multiple of 6 that lies between 25 and 55. Then press enter.",
        miss: "Which flag is the first one past the post at 25?" },
      /* practice 8: answer in the plan = Five of them: 33, 44, 55, 66 and 77; the two ends are left out */
      { qid: "M1.S2.T4.C15:8", kind: "between", s: 11, sp: 104, laid: 9, lo: 22, hi: 88, answer: 5, near: 7, winMs: 3000,
        ask: "How many between 22 and 88?",
        say: "How many multiples of 11 lie between 22 and 88? Give the count before the list.",
        miss: "Point to the first flag past 22 and the last flag before 88." },
    ],
  },
];

/* free play: any step, laid as far as the child likes, the band on or off */
const FREE_ITEM = { kind: "free", s: 7, sp: 140 };

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  track: { ruleY: RULE_Y, startPost: X0, stonePitch: PITCH, runsOffTheRightEdge: true },
  colours: { multiple: GREEN, factor: BLUE, step: AMBER },
  items: PHASES.map((p: any) => p.items.map((it: any) => ({ qid: it.qid, kind: it.kind, step: it.s, laid: it.laid || 0,
    band: it.lo !== undefined ? [it.lo, it.hi] : null, pen: it.pen || null }))),
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a list is right in any order; two boxes by the runtime; a word choice by its id or label */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (isList(item)) return sameList(numsIn(v), item.answer);
  if (item.choices) {
    const s = String(v ?? "").trim().toLowerCase();
    const c = item.choices.find((x: any) => x.id === String(item.answer));
    return s === String(item.answer).toLowerCase() || (!!c && s === String(c.label).toLowerCase());
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer counted out again (search and repeated adding), sharing no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const s = it.s;
  if (it.kind === "plant") {
    const out: number[] = [];
    let at = 0;
    for (let k = 0; k < it.n; k++) { at += s; if (k >= (it.given || 0)) out.push(at); }
    return JSON.stringify(out) === JSON.stringify(it.answer);
  }
  if (it.kind === "first") { let m = 1; while (m % s !== 0) m++; return m === it.answer; }
  if (it.kind === "lowthird") {
    const found: number[] = [];
    for (let m = 1; found.length < 3; m++) if (m % s === 0) found.push(m);
    return found[0] === it.answer[0] && found[2] === it.answer[1];
  }
  if (it.kind === "last") { const top = s * it.laid; return it.answer === "no" && (top + s) % s === 0 && top + s > top; }
  if (it.kind === "next") { let m = s * it.laid + 1; while (m % s !== 0) m++; return m === it.answer; }
  if (it.kind === "howmany") {
    const f: number[] = [];
    for (let d = 1; d <= s; d++) if (s % d === 0) f.push(d);
    return JSON.stringify(f) === JSON.stringify(it.pen) && it.answer === "infinite" && String(f.length) === it.near;
  }
  if (it.kind === "between" || it.kind === "betweenList") {
    const f: number[] = [];
    for (let m = it.lo + 1; m < it.hi; m++) if (m % s === 0) f.push(m);
    return it.kind === "between" ? f.length === it.answer : JSON.stringify(f) === JSON.stringify(it.answer);
  }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.parts ? item.near.join("|") : item.near);
/* the forms of an answer that no question, hint or ladder line may print */
const formsOf = (x: number) => [String(x), indian(x), words(x)];
const answerForms = (item: any) => {
  if (item.kind === "first") return []; /* the answer IS the question's own number: that is the book's point */
  if (item.kind === "plant") return item.answer.filter((x: number) => x !== item.s).flatMap(formsOf); /* the step is named in the question */
  if (item.kind === "lowthird") return formsOf(item.answer[1]); /* the lowest is the question's own number */
  if (isList(item)) return item.answer.flatMap(formsOf);
  if (typeof item.answer === "number") return formsOf(item.answer);
  return [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it; a list is written out
   with commas and spaces, so the keyboard drive never mistakes it for two boxes to type */
const agentKey = (item: any) => (isList(item) ? item.answer.join(", ") : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (isList(item)) { if (HOOK.set) HOOK.set(item.answer); return T.submit(listText(item.answer)); }
  return T.submit(item.answer);
};
/* the agent's answer() for a list: plant (or mark) those flags as a child would; Enter then sends them */
const answer = (item: any, v: any) => {
  if (!isList(item)) return undefined;
  const xs = numsIn(v);
  if (!xs.length || !HOOK.set) return false;
  HOOK.set(xs);
  return true;
};
/* the agent's check(): Enter sends what is on the track */
const check = () => undefined;

const MT_CSS = `
.mt-slide{transition:transform 440ms cubic-bezier(.3,.7,.25,1)}
.mt-draw{stroke-dasharray:1;stroke-dashoffset:1;animation:mtDraw 460ms ease-out forwards}
@keyframes mtDraw{to{stroke-dashoffset:0}}
.mt-pop{animation:mtPop 320ms ease-out both}
@keyframes mtPop{from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:none}}
.mt-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.mt-slide{transition:none}.mt-draw,.mt-pop{animation:none}.mt-draw{stroke-dashoffset:0}}
`;

/* each question opens on its own scene */
const sceneOf = (it: any) => {
  const base = {
    view: "steps", s: it.s || 1, sp: it.sp || 140, given: [] as number[], lo: 0, slide: null as any, arc: null as any,
    lit: [] as number[], rightRows: 0, list: [] as number[], laid: 0, ghostTo: 0, shift: 0, keepFrom: 0, labels: false,
    ghostLabels: false, pins: [] as number[], ringed: [] as number[], band: null as any, shaded: false, counted: 0,
    note: null as any, penLit: 0, penDone: false,
  };
  const k = it.kind;
  if (k === "plant") {
    const given = Array.from({ length: it.given || 0 }, (_, i) => (i + 1) * it.s);
    return { ...base, view: "stones", given, lo: given.length ? given[given.length - 1] - 1 : 0 };
  }
  if (k === "first") return { ...base, ghostTo: 1 };
  if (k === "lowthird") return { ...base, ghostTo: 3 };
  if (k === "last" || k === "howmany") { const sh = shiftFor(it.laid, it.sp); return { ...base, laid: it.laid, shift: sh, keepFrom: sh }; }
  if (k === "next") return { ...base, laid: it.laid, ghostTo: it.laid + 1, labels: true };
  if (k === "between" || k === "betweenList") return { ...base, laid: it.laid, band: { lo: it.lo, hi: it.hi } };
  return base;
};

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ item, index, stage, wrong, captured, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const busy = tl.busy;
  const free = stage === "free";
  const it: any = free ? FREE_ITEM : item || {};
  const kind = it.kind;
  const [S, setS] = useState<any>(() => sceneOf(item || {}));
  const SR = useRef<any>(S);
  SR.current = S;
  const up = (p: any) => setS((o: any) => ({ ...o, ...(typeof p === "function" ? p(o) : p) }));
  const listRef = useRef<number[]>([]);
  const actedRef = useRef(false);   /* planted, pulled or tapped since the last answer went */
  const [touched, setTouched] = useState(false);
  const [fType, setFType] = useState<string | null>(null);
  const fTypeRef = useRef<string | null>(null);
  fTypeRef.current = fType;
  const setupFor = useRef<any>(index);

  /* a new question opens on its own scene */
  useEffect(() => {
    if (free || setupFor.current === index) return;
    setupFor.current = index;
    tl.stop(); listRef.current = []; actedRef.current = false; setTouched(false);
    setS(sceneOf(item || {}));
  }, [index, free]);

  /* free play (the plan's freePlay): any step, the track as far as you like, the band on or off */
  useEffect(() => {
    if (!free) return;
    setupFor.current = "free";
    tl.stop(); listRef.current = []; actedRef.current = false; setFType(null); setTouched(false);
    setS(sceneOf(FREE_ITEM));
  }, [free]);
  useEffect(() => { if (!captured && fTypeRef.current !== null) setFType(null); }, [captured]);

  /* ── phase 1: the stones ── */
  const givenLast = (o: any) => (o.given.length ? o.given[o.given.length - 1] : 0);
  const lastOf = (o: any) => (listRef.current.length ? listRef.current[listRef.current.length - 1] : givenLast(o));
  /* the track slides along under a fixed frame */
  const slideSteps = (from: number, to: number): any[] => (from === to ? [] : [
    [30, () => up({ lo: to, slide: { from, dx: (to - from) * PITCH, go: false } })],
    [470, () => up({ slide: { from, dx: (to - from) * PITCH, go: true } })],
    [10, () => up({ slide: null })],
  ]);
  /* the stones stay reachable while the track slides, so a keyboard press never leaves the child on the
     page (the page's Enter would then send a half-made list); a press while it slides simply does nothing */
  const stonesLive = !free && stage === "ask" && kind === "plant" && S.view === "stones";
  const canPlant = stonesLive && !busy && !S.slide;
  /* keep the keyboard on the track: put the focus back on a stone once the slide has finished */
  const stoneFocus = () => {
    try {
      const el: any = document.activeElement;
      return !!(el && el.getAttribute && String(el.getAttribute("data-control") || "").indexOf("stone-") === 0);
    } catch (e) { return false; }
  };
  /* only when the child has not moved on: the focus is still on that stone, or it fell to the page while
     the track slid. A Tab pressed during the slide keeps the stone it reached; nothing is snatched back. */
  const refocus = (v: number, on: boolean): any[] => (on ? [[10, () => {
    try {
      const at: any = document.activeElement;
      const here = at && at.getAttribute && at.getAttribute("data-control") === "stone-" + v;
      const adrift = !at || at === document.body;
      if (!here && !adrift) return;
      const el: any = document.querySelector('[data-control="stone-' + v + '"]') || document.querySelector('[data-control^="stone-"]');
      if (el && el.focus && at !== el) el.focus();
    } catch (e) {}
  }]] : []);
  const tapStone = (v: number) => {
    if (!canPlant) return;
    const o = SR.current, mine = listRef.current, last = lastOf(o);
    const kb = stoneFocus();
    setTouched(true);
    if (mine.length && v === last) { /* the last flag is pulled up; the track slides back to the one before */
      const next = mine.slice(0, -1);
      listRef.current = next; actedRef.current = true; api.setTyped(listText(next)); api.sfx.tick();
      up({ list: next, arc: null });
      const back = next.length ? next[next.length - 1] : givenLast(o);
      tl.run([...slideSteps(o.lo, Math.max(0, back - 1)), ...refocus(v, kb)]);
      return;
    }
    if (v <= last) return;
    const next = [...mine, v];
    listRef.current = next; actedRef.current = true; api.setTyped(listText(next)); api.sfx.tick();
    up({ list: next, arc: { a: last, b: v } });
    tl.run([[600, () => {}], [10, () => up({ arc: null })], ...slideSteps(o.lo, v - 1), ...refocus(v, kb)]);
  };

  /* ── phase 4: a flag tapped inside the band is marked (a list answer) ── */
  const canMark = !free && stage === "ask" && kind === "betweenList" && !busy;
  const tapFlag = (v: number) => {
    if (!canMark) return;
    setTouched(true);
    const cur = listRef.current, next = cur.includes(v) ? cur.filter((x) => x !== v) : sortedSet([...cur, v]);
    listRef.current = next; actedRef.current = true; api.setTyped(listText(next)); api.sfx.tick();
    up({ list: next });
  };

  /* the agent (and the dev driver) plant or mark a list as a child would */
  HOOK.set = (xs: number[]) => {
    const o = SR.current;
    if (kind === "plant") {
      const gl = givenLast(o), mine = sortedSet(xs.filter((x) => x > gl));
      listRef.current = mine; actedRef.current = true; api.setTyped(listText(mine));
      up({ list: mine, arc: null, slide: null, lo: Math.max(0, (mine.length ? mine[mine.length - 1] : gl) - 1) });
    } else if (kind === "betweenList") {
      const mine = sortedSet(xs);
      listRef.current = mine; actedRef.current = true; api.setTyped(listText(mine));
      up({ list: mine });
    }
  };

  /* ── steps laid on the track, scrolling so the newest flag is in the frame and the edge stays empty ── */
  const onSteps = (from: number, to: number, per: number, sp?: number, sh0?: number): any[] => {
    const o = SR.current, spx = sp ?? o.sp, out: any[] = [];
    let sh = sh0 ?? o.shift;
    for (let k = from; k <= to; k++) {
      const need = shiftFor(k, spx);
      if (need > sh) { const x = need; out.push([470, () => up({ shift: x })], [10, () => up({ keepFrom: x })]); sh = need; }
      const kk = k;
      out.push([per, () => { up((q: any) => ({ laid: Math.max(q.laid, kk) })); api.sfx.tick(); }]);
    }
    return out;
  };
  const insideOf = (o: any) => {
    const ks: number[] = [];
    if (!o.band) return ks;
    for (let k = 1; k <= o.laid; k++) if (k * o.s > o.band.lo && k * o.s < o.band.hi) ks.push(k);
    return ks;
  };

  /* phase 3: asking for the last flag lays the next one, every time, the same length as the first */
  const canMore = !free && stage === "ask" && (kind === "last" || kind === "howmany") && !busy;
  const askLast = () => {
    if (!canMore) return;
    setTouched(true);
    const k = SR.current.laid + 1;
    tl.run(onSteps(k, k, 120));
  };

  /* free play controls */
  const freeStep = (count: number) => {
    if (!free || busy) return;
    setTouched(true);
    const k = SR.current.laid + 1;
    tl.run(onSteps(k, k + count - 1, count > 1 ? 300 : 120));
  };
  const freeBand = () => {
    if (!free) return;
    setTouched(true);
    const o = SR.current;
    if (o.band) { up({ band: null }); return; }
    const base = o.shift * o.s;
    up({ band: { lo: base + 2 * o.s, hi: base + 5 * o.s } });
  };
  const typeStep = () => {
    if (!free) return;
    setTouched(true);
    setFType("");
    api.capture((k: string) => {
      if (/^\d$/.test(k)) setFType((t) => ((t || "") + k).slice(0, 2));
      else if (k === "back") setFType((t) => (t || "").slice(0, -1));
      else if (k === "clear") setFType("");
      else if (k === "enter") {
        const v = Number(fTypeRef.current || "");
        if (v >= 1 && v <= 60) { tl.stop(); setS({ ...sceneOf(FREE_ITEM), s: v }); setFType(null); api.capture(null); }
        else setFType("");
      }
    });
  };
  /* a band post dragged along the track snaps to a whole number; a tap (or Enter) moves it one step on */
  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (!free) return;
    const o = SR.current;
    if (!o.band) return;
    setTouched(true);
    const u = o.sp / o.s, minV = o.shift * o.s, maxV = (o.shift + SLOTS(o.sp)) * o.s, gap = Math.ceil(76 / u);
    const was = payload.post === 0 ? o.band.lo : o.band.hi;
    let v = moved && isFinite(p.x) ? Math.round((p.x - X0) / u + minV) : was + o.s;
    if (!moved && v > maxV) v = minV;
    v = Math.max(minV, Math.min(maxV, v));
    let lo = payload.post === 0 ? v : o.band.lo, hi = payload.post === 1 ? v : o.band.hi;
    if (lo > hi) { const t = lo; lo = hi; hi = t; }
    if (hi - lo < gap) { if (hi + gap - (hi - lo) <= maxV + gap) hi = lo + gap; }
    up({ band: { lo, hi } });
    api.sfx.tick();
  });

  /* Enter sends the list made on the track, and only when there is a fresh act to send: after a miss the
     child's flags stay, so a bare Enter would otherwise send that same list again and cost another try */
  const listKind = kind === "plant" || kind === "betweenList";
  api.onEnter(!free && stage === "ask" && listKind && !busy ? () => {
    const xs = listRef.current;
    if (!actedRef.current || !xs.length) return;
    actedRef.current = false;
    api.submit(listText(xs));
  } : null);

  /* ── the win: the maths moving ── */
  useEffect(() => {
    if (stage !== "win" || free) return;
    const o = SR.current, R: any[] = [];
    if (kind === "plant") {
      /* the stones fold into steps: every flag of the list at once, each under its table line */
      const sp = Math.min(170, Math.floor((W.w - 100 - X0) / it.n));
      R.push([80, () => up({ view: "steps", sp, laid: 0, ghostTo: 0, shift: 0, keepFrom: 0, labels: true, arc: null, slide: null, pins: [] })]);
      R.push(...onSteps(1, it.n, 240, sp, 0));
      R.push([200, () => up({ note: "multiples of " + it.s })]);
    } else if (kind === "first") {
      R.push([60, () => up({ pins: [], labels: true })], ...(o.laid < 1 ? onSteps(1, 1, 500) : []), [200, () => {}]);
    } else if (kind === "lowthird") {
      R.push([60, () => up({ pins: [], labels: true })], ...onSteps(o.laid + 1, 3, 360), [200, () => up({ ringed: [1, 3] })]);
    } else if (kind === "last") {
      R.push(...onSteps(o.laid + 1, o.laid + 3, 420), [200, () => up({ note: "no last one" })]);
    } else if (kind === "next") {
      R.push([60, () => up({ pins: [] })], ...onSteps(o.laid + 1, Math.max(o.laid + 1, it.laid + 3), 420));
    } else if (kind === "howmany") {
      R.push([60, () => up({ penLit: it.pen.length, penDone: true })], ...onSteps(o.laid + 1, o.laid + 3, 420), [200, () => up({ note: "infinite" })]);
    } else if (kind === "between" || kind === "betweenList") {
      const ins = insideOf(o);
      R.push([60, () => up({ shaded: true, counted: 0 })]);
      for (let i = 1; i <= ins.length; i++) { const j = i; R.push([380, () => { up({ counted: j }); api.sfx.tick(); }]); }
    }
    tl.run(R);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
     the child's own answer stays (on the track and in the slot), nothing is marked ── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    setTouched(true);
    const done = () => api.lock(false);
    const o = SR.current, v = wrong.value, R: any[] = [];
    if (kind === "plant") {
      /* the child's flags as sent stay where they were planted; the steps are laid again from the post */
      const gl = givenLast(o), mine = sortedSet(numsIn(v).filter((x) => x > gl));
      listRef.current = mine;
      up({ list: mine, arc: null, lit: [], rightRows: 0 });
      let cur = o.lo;
      const go = (to: number) => { R.push(...slideSteps(cur, to)); cur = to; };
      R.push([500, () => {}]);
      go(0);
      for (let k = 1; k <= it.n; k++) {
        const a = (k - 1) * it.s, b = k * it.s;
        if (b > cur + 14) go(Math.max(0, a - 1));
        R.push([60, () => up({ arc: { a, b } })]);
        R.push([560, () => { up((q: any) => ({ lit: [...q.lit, b], rightRows: k })); api.sfx.tick(); }]);
        R.push([10, () => up({ arc: null })]);
      }
      /* rest where the child's last flag and the last right landing can both be reached */
      const lastRight = it.n * it.s, cl = mine.length ? mine[mine.length - 1] : gl;
      let rest = Math.max(0, Math.min(lastRight, cl) - 1);
      if (cl > rest + 14) rest = Math.max(0, cl - 1);
      R.push([300, () => {}]);
      go(rest);
      R.push([200, () => {}]);
    } else if (kind === "first") {
      const x = leadNumber(v), maxV = SLOTS(o.sp) * o.s;
      up({ pins: x !== null && x > 0 && x <= maxV ? [x] : [], labels: true });
      R.push([900, () => {}], ...onSteps(1, 1, 800), [300, () => {}]);
    } else if (kind === "lowthird") {
      const maxV = SLOTS(o.sp) * o.s;
      const xs = slotPartsOf(v, 2).map((q: any) => Number(q)).filter((q: number) => isFinite(q) && q > 0 && q <= maxV);
      up({ pins: sortedSet(xs), labels: true, ringed: [] });
      R.push([900, () => {}], ...onSteps(1, 1, 600), [400, () => up({ ringed: [1] })],
        ...onSteps(2, 3, 600), [400, () => up({ ringed: [1, 3] })]);
    } else if (kind === "last") {
      up({ ringed: [o.laid] });
      R.push([900, () => {}], ...onSteps(o.laid + 1, o.laid + 4, 650), [300, () => up({ note: "no last one" })], [300, () => {}]);
    } else if (kind === "next") {
      const x = leadNumber(v), top = (o.laid + 1) * o.s;
      const onFlag = x !== null && x > 0 && x % o.s === 0 && x / o.s <= o.laid;
      up({ pins: x !== null && x > 0 && x <= top && !onFlag ? [x] : [], ringed: onFlag ? [(x as number) / o.s] : [] });
      R.push([900, () => {}], ...onSteps(o.laid + 1, o.laid + 3, 700), [300, () => {}]);
    } else if (kind === "howmany") {
      up({ penLit: 0, penDone: false });
      for (let i = 1; i <= it.pen.length; i++) { const j = i; R.push([500, () => { up({ penLit: j }); api.sfx.tick(); }]); }
      R.push([400, () => up({ penDone: true })], ...onSteps(o.laid + 1, o.laid + 4, 600), [300, () => up({ note: "infinite" })], [300, () => {}]);
    } else if (kind === "between" || kind === "betweenList") {
      if (kind === "betweenList") { const mine = sortedSet(numsIn(v)); listRef.current = mine; up({ list: mine }); }
      up({ shaded: false, counted: 0 });
      const ins = insideOf(o);
      R.push([800, () => {}], [700, () => up({ shaded: true })]);
      for (let i = 1; i <= ins.length; i++) { const j = i; R.push([600, () => { up({ counted: j }); api.sfx.tick(); }]); }
      R.push([300, () => {}]);
    }
    tl.run(R, done);
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const o = S;
  const s = o.s, sp = o.sp;
  const insideKs = insideOf(o);
  const countedKs = o.shaded ? insideKs.slice(0, o.counted) : free && o.band ? insideKs : []; /* free play counts the band live */
  const onTrack = o.view === "stones" ? [...o.given, ...o.list] : Array.from({ length: o.laid }, (_, i) => (i + 1) * s);
  api.share({
    stepSize: s, flags: onTrack,
    tableRows: o.view === "stones" ? Math.max(o.rightRows, o.given.length + o.list.length) : (o.labels ? o.laid : 0),
    marked: kind === "betweenList" ? o.list : null,
    bandLow: o.band ? o.band.lo : null, bandHigh: o.band ? o.band.hi : null,
    inBand: o.band && (o.shaded || free) ? countedKs.map((k) => k * s) : null,
    bandCount: o.band && (o.shaded || free) ? countedKs.length : null,
  });

  /* ── drawing ── */
  const X = (k: number) => X0 + k * sp;           /* the k-th flag, before the track scrolls */
  const vx = (v: number) => X0 + (v / s) * sp;    /* any number on the track */

  const renderBlock = () => {
    const typing = free && fType !== null;
    const shownS = typing ? (fType as string) : String(s);
    const t = Math.floor(s / 10), u1 = s % 10;
    const w = t * 18 + (u1 ? 36 : 0) - (t && !u1 ? 6 : 0);
    const xs = 98 - w / 2;
    return (
      <g>
        <rect x={0} y={0} width={196} height={196} rx={RAD.panel} fill="url(#gPanel)" stroke={typing ? C.accent : C.rule} strokeWidth={typing ? 4 : 2} />
        <text x={98} y={34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("step")}</text>
        <text x={98} y={92} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={INK_A}>{shownS}</text>
        {typing && <rect className="c4-caret" x={98 + shownS.length * 17 + 4} y={48} width={4} height={48} rx={2} fill={C.accent} />}
        {!typing && (
          <g filter="url(#fShadowSoft)">
            {Array.from({ length: t }).map((_, i) => (
              <rect key={"t" + i} x={xs + i * 18} y={108} width={12} height={76} rx={4} fill="url(#gTen)" stroke={shade(AMBER, 0.2)} strokeWidth={1.2} />
            ))}
            {Array.from({ length: u1 }).map((_, i) => (
              <circle key={"o" + i} cx={xs + t * 18 + 6 + (i % 2) * 18} cy={114 + Math.floor(i / 2) * 16} r={6.5} fill="url(#gTen)" stroke={shade(AMBER, 0.2)} strokeWidth={1.2} />
            ))}
          </g>
        )}
        {free && <Hit id="step-block" label="Type a new step size" x={0} y={0} w={196} h={196} onPress={typeStep} />}
      </g>
    );
  };

  /* phase 1: the track close up, one stone a number, and the table strip above it */
  const renderStones = () => {
    const sl = o.slide;
    const a0 = sl ? Math.min(sl.from, o.lo) : o.lo;
    const a1 = (sl ? Math.max(sl.from, o.lo) : o.lo) + 14;
    const cx = (v: number) => (v - o.lo) * PITCH + PITCH / 2;
    const planted = [...o.given, ...o.list];
    const mine = o.list, last = mine.length ? mine[mine.length - 1] : givenLast(o);
    const vs: number[] = [];
    for (let v = Math.max(0, a0); v <= a1; v++) vs.push(v);
    const shown = (v: number) => v >= Math.max(0, a0) && v <= a1;
    const nRows = it.n || 0;
    return (
      <g>
        <rect x={224} y={0} width={W.w - 224} height={196} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        {Array.from({ length: nRows }).map((_, r) => {
          const col = r < 3 ? 0 : 1, row = r % 3, x = 250 + col * 420, y = 52 + row * 62;
          const right = r < o.rightRows, given = r < o.given.length;
          const val = right ? (r + 1) * s : given ? o.given[r] : o.list[r - o.given.length];
          return (
            <g key={"row" + r}>
              <line x1={x - 10} y1={y + 16} x2={x + 380} y2={y + 16} stroke={C.rule} strokeWidth={2} />
              <text x={x} y={y} fontSize={T.label} fontWeight={600} fill={C.ink}>{`${r + 1} × ${s} =`}</text>
              {val !== undefined && <text x={x + 150} y={y} fontSize={T.label} fontWeight={700} fill={right || given ? INK_G : C.ink}>{val}</text>}
            </g>
          );
        })}
        <g clipPath="url(#mt-clip)">
          <g className={sl && sl.go ? "mt-slide" : undefined} style={{ transform: `translateX(${sl && !sl.go ? sl.dx : 0}px)` } as any}>
            {vs.map((v) => (
              <g key={"s" + v}>
                <rect x={(v - o.lo) * PITCH + 3} y={STONE_Y - 36} width={PITCH - 6} height={72} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
                <text x={cx(v)} y={STONE_Y + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{v}</text>
              </g>
            ))}
            {shown(0) && (
              <g>
                <rect x={cx(0) - 5} y={STONE_Y - 146} width={10} height={110} rx={4} fill={LINE} />
                <circle cx={cx(0)} cy={STONE_Y - 146} r={10} fill={LINE} />
              </g>
            )}
            {o.lit.filter(shown).map((v: number) => <circle key={"l" + v} cx={cx(v)} cy={STONE_Y} r={44} fill="none" stroke={GREEN} strokeWidth={5} />)}
            {o.lit.filter((v: number) => shown(v) && !planted.includes(v)).map((v: number) => (
              <g key={"lf" + v}>
                <rect x={cx(v) - 3} y={STONE_Y - 150} width={6} height={114} fill={LINE} />
                <rect x={cx(v) + 3} y={STONE_Y - 150} width={46} height={40} rx={6} fill="#FFFFFF" stroke={GREEN} strokeWidth={3} strokeDasharray="7 5" />
              </g>
            ))}
            {planted.filter(shown).map((v: number) => (
              <g key={"f" + v} className="mt-pop">
                <rect x={cx(v) - 3} y={STONE_Y - 150} width={6} height={114} fill={LINE} />
                <rect x={cx(v) + 3} y={STONE_Y - 150} width={46} height={40} rx={6} fill="url(#gOne)" stroke={shade(GREEN, 0.2)} strokeWidth={2} />
              </g>
            ))}
            {o.arc && shown(o.arc.a) && shown(o.arc.b) && (
              <path key={"arc" + o.arc.a + "-" + o.arc.b} className="mt-draw" pathLength={1}
                d={`M ${cx(o.arc.a)} ${STONE_Y - 38} Q ${(cx(o.arc.a) + cx(o.arc.b)) / 2} ${STONE_Y - 164} ${cx(o.arc.b)} ${STONE_Y - 38}`}
                fill="none" stroke={AMBER} strokeWidth={6} strokeLinecap="round" />
            )}
          </g>
        </g>
        {stonesLive && vs.filter((v) => v > o.lo && v <= o.lo + 14 && (v > last || (mine.length > 0 && v === last))).map((v) => (
          <Hit key={"h" + v} id={"stone-" + v} label={v === last ? `Pull up the flag on ${v}` : `Plant a flag on ${v}`}
            x={(v - o.lo) * PITCH + 0.2} y={STONE_Y - 36} w={72} h={72} onPress={() => tapStone(v)} />
        ))}
      </g>
    );
  };

  /* phases 2-4 and free play: the track at the size of a step */
  const renderSteps = () => {
    const off = o.shift * sp;
    const top = Math.max(o.laid, o.ghostTo);
    const kFrom = Math.max(1, Math.min(o.keepFrom, o.shift));
    const arcFrom = Math.min(o.keepFrom, o.shift);
    const ks: number[] = [];
    for (let k = kFrom; k <= top; k++) ks.push(k);
    const counted = new Set(countedKs);
    const labelsOn = (k: number) => sp >= 120 && ((o.labels && k <= o.laid) || (o.ghostLabels && k > o.laid));
    const minX = off + 6, maxX = off + W.w - 6; /* what is in the frame, in track units */
    const post = (pv: number, i: number) => {
      const x = vx(pv), tw = indian(pv).length * 17 + 22;
      if (x < minX || x > maxX) return null;
      const live = free;
      return (
        <g key={"post" + i} className={live ? "mt-grab c4-piece" : undefined}
          {...(live ? { ...control("post-" + (i + 1), "Band post on " + pv), ...drag.bind({ post: i }), ...drag.keys({ post: i }) } : {})}>
          <rect x={x - 6} y={RULE_Y + 6} width={12} height={112} rx={5} fill={LINE} />
          <rect x={x - tw / 2} y={RULE_Y + 78} width={tw} height={38} rx={10} fill="#FFFFFF" stroke={LINE} strokeWidth={2} />
          <text x={x} y={RULE_Y + 107} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{indian(pv)}</text>
          {live && <rect x={x - 36} y={RULE_Y + 6} width={72} height={116} fill="transparent" />}
        </g>
      );
    };
    return (
      <g>
        {o.band && <rect x={0} y={RULE_Y + 36} width={W.w} height={88} rx={18} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />}
        <rect x={o.shift > 0 ? 0 : X0} y={RULE_Y - 4} width={W.w - (o.shift > 0 ? 0 : X0)} height={8} fill={LINE} />
        <g clipPath="url(#mt-clip)">
          <g key={"sg" + index} className="mt-slide" style={{ transform: `translateX(${-off}px)` } as any}>
            {arcFrom === 0 && (
              <g>
                <rect x={X0 - 6} y={RULE_Y - 90} width={12} height={110} rx={5} fill={LINE} />
                <circle cx={X0} cy={RULE_Y - 90} r={10} fill={LINE} />
                <text x={X0 - 24} y={RULE_Y - 14} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>0</text>
              </g>
            )}
            {o.band && (() => {
              /* the shading stops short of a post that stands on a flag, so that flag stands plainly outside it */
              const gap = (pv: number) => (pv % s === 0 ? 30 : 6);
              const a = Math.max(vx(o.band.lo) + gap(o.band.lo), minX), b = Math.min(vx(o.band.hi) - gap(o.band.hi), maxX);
              return (o.shaded || free) && b - a > 4 ? <rect x={a} y={RULE_Y + 44} width={b - a} height={72} rx={12} fill={tint(AMBER, 0.72)} /> : null;
            })()}
            {o.band && [o.band.lo, o.band.hi].map((pv: number, i: number) => post(pv, i))}
            {countedKs.map((k: number, i: number) => (
              <text key={"c" + k} x={X(k) + 3 + flagW(k * s) / 2} y={FLAG_TOP - 18} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{i + 1}</text>
            ))}
            {ks.filter((k) => k - 1 >= arcFrom).map((k) => {
              const a = X(k - 1), b = X(k), ghost = k > o.laid;
              const d = `M ${a} ${RULE_Y - 6} Q ${(a + b) / 2} ${RULE_Y - 130} ${b} ${RULE_Y - 6}`;
              return ghost
                ? <path key={"g" + k} d={d} fill="none" stroke={tint(AMBER, 0.35)} strokeWidth={5} strokeDasharray="12 10" strokeLinecap="round" />
                : <path key={"a" + k} className="mt-draw" pathLength={1} d={d} fill="none" stroke={AMBER} strokeWidth={6} strokeLinecap="round" />;
            })}
            {ks.map((k) => {
              const v = k * s, x = X(k), blank = k > o.laid, w = flagW(v);
              const ring = o.ringed.includes(k) || (kind === "betweenList" && o.list.includes(v));
              return (
                <g key={"f" + k} className={blank ? undefined : "mt-pop"}>
                  {counted.has(k) && <rect x={x - 8} y={FLAG_TOP - 8} width={w + 22} height={FLAG_H + 16} rx={14} fill={tint(AMBER, 0.55)} />}
                  <rect x={x - 3} y={FLAG_TOP} width={6} height={RULE_Y - FLAG_TOP} fill={LINE} />
                  <rect x={x + 3} y={FLAG_TOP} width={w} height={FLAG_H} rx={8} fill={blank ? "#FFFFFF" : tint(GREEN, 0.86)}
                    stroke={GREEN} strokeWidth={3} strokeDasharray={blank ? "8 6" : undefined} />
                  {!blank && <text x={x + 3 + w / 2} y={FLAG_TOP + 36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK_G}>{indian(v)}</text>}
                  {ring && <rect x={x - 12} y={FLAG_TOP - 12} width={w + 30} height={FLAG_H + 24} rx={16} fill="none" stroke={C.accent} strokeWidth={4} />}
                  {labelsOn(k) && <text x={x + 3 + w / 2} y={FLAG_TOP - 16} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{`${k} × ${s}`}</text>}
                </g>
              );
            })}
            {o.pins.map((v: number) => {
              const x = vx(v);
              if (x < off + 20 || x > off + W.w - 30) return null;
              return (
                <g key={"p" + v}>
                  <path d={`M ${x} ${RULE_Y + 8} L ${x - 11} ${RULE_Y + 28} L ${x + 11} ${RULE_Y + 28} Z`} fill={C.ink} />
                  <text x={x} y={RULE_Y + 64} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{indian(v)}</text>
                </g>
              );
            })}
            {canMark && ks.filter((k) => k <= o.laid).map((k) => {
              const v = k * s;
              return <Hit key={"hf" + k} id={"flag-" + v} label={(o.list.includes(v) ? "Unmark " : "Mark ") + v}
                x={X(k) - 12} y={FLAG_TOP - 14} w={72} h={RULE_Y - FLAG_TOP + 22} onPress={() => tapFlag(v)} />;
            })}
          </g>
        </g>
        {free && drag.drag && drag.drag.moved && (
          <rect x={drag.drag.x - 6} y={RULE_Y + 6} width={12} height={112} rx={5} fill={LINE} filter="url(#fLift)" pointerEvents="none" />
        )}
      </g>
    );
  };

  /* phase 3: the pen of factors from the topic before, shut at both ends */
  const renderPen = () => {
    const cards: number[] = it.pen || [], x0 = 244, cw = 76, gap = 12, left = 232;
    const right = x0 + cards.length * (cw + gap) - gap + 12;
    return (
      <g>
        <text x={left + 12} y={30} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(`factors of ${s}`)}</text>
        <rect x={left} y={48} width={12} height={104} rx={4} fill={LINE} />
        <rect x={right} y={48} width={12} height={104} rx={4} fill={LINE} />
        <rect x={left} y={146} width={right - left + 12} height={6} rx={3} fill={LINE} />
        {cards.map((f, i) => {
          const x = x0 + i * (cw + gap);
          return (
            <g key={"pen" + f}>
              <rect x={x} y={66} width={cw} height={64} rx={12} fill={tint(BLUE, 0.85)} stroke={BLUE} strokeWidth={i < o.penLit ? 6 : 3} />
              <text x={x + cw / 2} y={110} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK_B}>{f}</text>
            </g>
          );
        })}
        {o.penDone && <text x={right + 30} y={110} fontSize={T.label} fontWeight={700} fill={INK_B}>{tx(`${cards.length} factors`)}</text>}
      </g>
    );
  };

  /* the running count: the flags on the track (phase 4: the flags counted inside the band) */
  const bandKind = kind === "between" || kind === "betweenList";
  const runN = bandKind ? (countedKs.length > 0 ? countedKs.length : null) : onTrack.length;
  const runLabel = bandKind ? "inside" : onTrack.length === 1 ? "flag" : "flags";
  const freeInside = free && o.band ? insideKs.length : null;

  const invite = free ? (touched || fType !== null ? null : { x: 98, y: 98, r: 90 }) /* free play: the step block takes a new step */
    : stage !== "ask" || index !== 0 || touched || busy || wrong ? null
    : kind === "plant" ? { x: PITCH / 2, y: STONE_Y, r: 34 }
      : kind === "first" ? { x: X(1) + 3 + flagW(s) / 2, y: FLAG_TOP + FLAG_H / 2, r: 46 }
        : kind === "last" ? { x: W.w - 40, y: RULE_Y, r: 34 }  /* the edge of the frame, where the track leaves it */
          : kind === "between" && o.band ? { x: vx(o.band.lo), y: RULE_Y + 40, r: 32 }
            : null;

  return (
    <g>
      <style>{MT_CSS}</style>
      <defs><clipPath id="mt-clip"><rect x={0} y={-10} width={W.w} height={W.h + 10} /></clipPath></defs>

      {runN !== null && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={24} y={-36} fontSize={T.xl} fontWeight={700} fill={C.ink}>{runN}</text>
          <text x={24 + String(runN).length * 34 + 16} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(runLabel)}</text>
        </g>
      )}

      {renderBlock()}
      {o.view === "stones" ? renderStones() : renderSteps()}
      {kind === "howmany" && renderPen()}
      {o.note && <text x={NOTE.x} y={NOTE.y} textAnchor="end" fontSize={T.label} fontWeight={700} fill={INK_G}>{tx(o.note)}</text>}

      {(kind === "last" || kind === "howmany") && (
        <Key id="last-flag" label="Ask for the last flag" x={850} y={432} w={236} h={80} C={C} disabled={!canMore} onClick={askLast}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={canMore ? C.ink : mix(C.ink, C.panel, 0.5)}>{tx("last flag?")}</text>
        </Key>
      )}

      {free && (
        <g>
          <Key id="free-step" label="Lay one step" x={540} y={16} w={170} h={80} C={C} onClick={() => freeStep(1)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("one step")}</text>
          </Key>
          <Key id="free-more" label="Keep going" x={726} y={16} w={196} h={80} C={C} onClick={() => freeStep(5)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("keep going")}</text>
          </Key>
          <Key id="free-band" label={o.band ? "Band off" : "Band on"} x={938} y={16} w={148} h={80} C={C} primary={!!o.band} onClick={freeBand}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={o.band ? "#FFFFFF" : C.ink}>{tx("band")}</text>
          </Key>
          {freeInside !== null && <text x={236} y={150} fontSize={T.label} fontWeight={700} fill={C.ink}>{`${freeInside} ${tx("inside")}`}</text>}
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  if (L.value === undefined || L.value === null) return null;
  const k = L.kind;
  const word = k === "last" ? tx("no last one") : k === "howmany" ? tx("infinite") : k === "between" ? `${leadNumber(L.value)} ${tx("inside")}` : null;
  const vals = word ? [] : numsIn(L.value).slice(-3);
  const base = h - 14;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={10} y={base} width={w - 10} height={5} fill={LINE} />
      {word ? <text x={w / 2} y={h / 2 + 4} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={INK_G}>{word}</text>
        : vals.map((v, i) => {
          const x = 22 + i * 72, fw = Math.max(44, String(v).length * 17 + 16);
          return (
            <g key={i}>
              <rect x={x - 2} y={8} width={4} height={base - 8} fill={LINE} />
              <rect x={x + 2} y={8} width={fw} height={38} rx={6} fill={tint(GREEN, 0.86)} stroke={GREEN} strokeWidth={2} />
              <text x={x + 2 + fw / 2} y={37} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={INK_G}>{v}</text>
            </g>
          );
        })}
    </g>
  );
}

/* Hindi and Gujarati, keyed by the exact English (docs/PATTERNS.md §11); digits stay digits and the
   runtime speaks them. A first draft that wants a native speaker's read. */
const TR: any = {
  hi: {
    "Multiple Track": "गुणजों का रास्ता",
    "A track, one step block, and no end mark anywhere along it.": "एक रास्ता, एक कदम का डिब्बा। और रास्ते में कहीं भी अंत का निशान नहीं।",
    "Still running off the edge, and you never did find a last one.": "रास्ता अब भी किनारे के पार जा रहा है। और तुम्हें आखिरी झंडा कभी नहीं मिला।",
    "Free play. Any step size, the track as far as you like, the band on or off.": "मुक्त खेल। कदम का कोई भी माप चुनो, रास्ता मनचाहा बढ़ाओ, पट्टी चालू या बंद।",
    /* phase 1 */
    "A times table read as a list": "सूची की तरह पढ़ा गया पहाड़ा",
    "Look at the answers in a times table. What are you really looking at?": "पहाड़े के उत्तरों को देखो। तुम असल में क्या देख रहे हो?",
    "Tap the stone where a step lands, and a flag goes in.": "जहाँ कदम पड़ता है, उस पत्थर को छुओ। वहाँ झंडा लग जाएगा।",
    "Which line of the table does each flag answer?": "हर झंडा पहाड़े की किस पंक्ति का उत्तर है?",
    "Count the stones of one step. Count the same again from the last flag.": "एक कदम के पत्थर गिनो। आखिरी झंडे से फिर उतने ही गिनो।",
    "The answers in a times table are the multiples of that number.": "पहाड़े के उत्तर उस संख्या के गुणज होते हैं।",
    "You learned: a times table lists the multiples of its number.": "तुमने सीखा: पहाड़ा अपनी संख्या के गुणजों की सूची है।",
    "First six in the table of 9": "9 के पहाड़े के पहले छह",
    "Plant a flag on each of the first six answers in the table of 9. Then press enter.": "9 के पहाड़े के पहले छह उत्तरों पर एक-एक झंडा लगाओ। फिर एंटर दबाओ।",
    "Say the table of 9 aloud. Is every flag on one of its answers?": "9 का पहाड़ा ज़ोर से बोलो। क्या हर झंडा उसके किसी उत्तर पर है?",
    "First five multiples of 13": "13 के पहले पाँच गुणज",
    "Now the first five multiples of 13. Count on from the post in steps of 13, then press enter.": "अब 13 के पहले पाँच गुणज। खंभे से 13-13 के कदमों में आगे गिनो, फिर एंटर दबाओ।",
    "How many stones long is one step of 13?": "13 का एक कदम कितने पत्थर लंबा है?",
    "Next three after 33": "33 के बाद के तीन",
    "Flags stand on 11, 22 and 33 already. Plant the next three multiples of 11.": "11, 22 और 33 पर झंडे पहले से लगे हैं। 11 के अगले तीन गुणजों पर झंडे लगाओ।",
    "How far apart are the flags that were already standing?": "पहले से लगे झंडों के बीच कितनी दूरी है?",
    /* phase 2 */
    "The first multiple of a number": "किसी संख्या का पहला गुणज",
    "This time the step waits for you.": "इस बार कदम तुम्हारा इंतज़ार करता है।",
    "Type where it will land, and then it goes down.": "लिखो कि वह कहाँ पड़ेगा, फिर कदम वहाँ रख दिया जाएगा।",
    "Where does one step from the post land?": "खंभे से एक कदम कहाँ पड़ता है?",
    "Say it as a table line. One times the number is what?": "इसे पहाड़े की पंक्ति की तरह बोलो। एक गुणा वह संख्या क्या है?",
    "The first and lowest multiple of a number is the number itself.": "किसी संख्या का पहला और सबसे छोटा गुणज वह संख्या खुद होती है।",
    "You learned: one times a number gives its first and lowest multiple.": "तुमने सीखा: एक गुणा संख्या ही उसका पहला और सबसे छोटा गुणज है।",
    "First multiple of 23?": "23 का पहला गुणज?",
    "What is the first multiple of 23? Type where the very first step lands.": "23 का पहला गुणज क्या है? लिखो कि सबसे पहला कदम कहाँ पड़ता है।",
    "How many steps does it take to reach the first flag?": "पहले झंडे तक पहुँचने में कितने कदम लगते हैं?",
    "First multiple of 37?": "37 का पहला गुणज?",
    "The step block holds 37 now. What is its first multiple?": "कदम के डिब्बे में अब 37 है। इसका पहला गुणज क्या है?",
    "Does the first step start at the post, or somewhere further on?": "पहला कदम खंभे से शुरू होता है, या कहीं और आगे से?",
    "Lowest and third multiple of 23": "23 का सबसे छोटा और तीसरा गुणज",
    "Which is the lowest multiple of 23, and which is its third? One answer goes in each box.": "23 का सबसे छोटा गुणज कौन सा है, और तीसरा कौन सा? हर खाने में एक उत्तर लिखो।",
    "The lowest is one step from the post. How many steps reach the third?": "सबसे छोटा खंभे से एक कदम पर है। तीसरे तक कितने कदम पहुँचते हैं?",
    "lowest": "सबसे छोटा",
    "third": "तीसरा",
    /* phase 3 */
    "Multiples that never run out": "गुणज जो कभी खत्म नहीं होते",
    "Ask the track for its last flag, as often as you like.": "रास्ते से उसका आखिरी झंडा माँगो, जितनी बार चाहो।",
    "Watch what it hands you each time.": "देखो, हर बार वह तुम्हें क्या देता है।",
    "What happens if you lay one more step?": "एक और कदम रखो, तो क्या होता है?",
    "Pick any flag at all. Is there a step after it?": "कोई भी झंडा चुनो। क्या उसके बाद भी एक कदम है?",
    "A number has infinite multiples, so there is no last one to find.": "किसी संख्या के गुणज अनंत होते हैं। इसलिए कोई आखिरी गुणज नहीं मिलता।",
    "You learned: after every multiple comes another; the list never ends.": "तुमने सीखा: हर गुणज के बाद एक और आता है; सूची कभी खत्म नहीं होती।",
    "Is there a last one?": "क्या कोई आखिरी है?",
    "Here are twelve multiples of 11. Can you write the last one?": "यहाँ 11 के बारह गुणज हैं। क्या तुम आखिरी गुणज लिख सकते हो?",
    "What did the track hand you when you asked for the last flag?": "जब तुमने आखिरी झंडा माँगा, तो रास्ते ने तुम्हें क्या दिया?",
    "Yes": "हाँ",
    "No": "नहीं",
    "yes": "हाँ",
    "no": "नहीं",
    "Next multiple after 100?": "100 के बाद अगला गुणज?",
    "A child says the multiples of 20 stop at 100. Which multiple of 20 comes after 100?": "एक बच्चा कहता है कि 20 के गुणज 100 पर रुक जाते हैं। 100 के बाद 20 का कौन सा गुणज आता है?",
    "Which line of the table comes after 5 times 20?": "पहाड़े में 5 गुणा 20 के बाद कौन सी पंक्ति आती है?",
    "How many multiples of 51?": "51 के कितने गुणज?",
    "The pen holds the four factors of 51. How many multiples has 51?": "बाड़े में 51 के चार गुणनखंड हैं। 51 के कितने गुणज हैं?",
    "The pen is shut at both ends. Is the track shut anywhere?": "बाड़ा दोनों सिरों पर बंद है। क्या रास्ता कहीं बंद है?",
    "infinite": "अनंत",
    /* phase 4 */
    "Between leaves out both ends": "बीच में गिनो, दोनों सिरे छोड़ो",
    "Count only what is inside the band. What about the two on the posts?": "सिर्फ़ पट्टी के अंदर वाले गिनो। खंभों पर खड़े दो झंडों का क्या?",
    "Is a flag on a post inside the band, or outside it?": "खंभे पर लगा झंडा पट्टी के अंदर है या बाहर?",
    "Touch each flag between the posts and count aloud.": "खंभों के बीच हर झंडे को छूकर ज़ोर से गिनो।",
    "Between leaves out both ends, and a how many question wants the count as well as the list.": "बीच में कहने पर दोनों सिरे छूट जाते हैं। कितने पूछने पर सूची के साथ कुल संख्या भी बताओ।",
    "You learned: a flag on a post stays out; count what is strictly inside.": "तुमने सीखा: खंभे पर लगा झंडा बाहर रहता है; सिर्फ़ अंदर वाले गिनो।",
    "How many between 18 and 63?": "18 और 63 के बीच कितने?",
    "How many multiples of 9 lie between 18 and 63? Type the count first.": "18 और 63 के बीच 9 के कितने गुणज हैं? पहले कुल संख्या लिखो।",
    "Which flags are standing on the two posts?": "दोनों खंभों पर कौन से झंडे खड़े हैं?",
    "Multiples of 6 between 25 and 55": "25 और 55 के बीच 6 के गुणज",
    "Tap every multiple of 6 that lies between 25 and 55. Then press enter.": "25 और 55 के बीच 6 के हर गुणज को छुओ। फिर एंटर दबाओ।",
    "Which flag is the first one past the post at 25?": "25 वाले खंभे के बाद पहला झंडा कौन सा है?",
    "How many between 22 and 88?": "22 और 88 के बीच कितने?",
    "How many multiples of 11 lie between 22 and 88? Give the count before the list.": "22 और 88 के बीच 11 के कितने गुणज हैं? सूची से पहले कुल संख्या बताओ।",
    "Point to the first flag past 22 and the last flag before 88.": "22 के बाद का पहला झंडा और 88 से पहले का आखिरी झंडा दिखाओ।",
    /* the working area, the slot and the summary thumb */
    "step": "कदम",
    "flag": "झंडा",
    "flags": "झंडे",
    "1 flag": "1 झंडा",
    "inside": "अंदर",
    "last flag?": "आखिरी झंडा?",
    "one step": "एक कदम",
    "keep going": "आगे बढ़ो",
    "band": "पट्टी",
    "no last one": "कोई आखिरी नहीं",
    "multiples of 9": "9 के गुणज",
    "multiples of 13": "13 के गुणज",
    "multiples of 11": "11 के गुणज",
    "factors of 51": "51 के गुणनखंड",
    "4 factors": "4 गुणनखंड",
  },
  gu: {
    "Multiple Track": "અવયવીનો રસ્તો",
    "A track, one step block, and no end mark anywhere along it.": "એક રસ્તો, એક પગલાનો ડબ્બો. અને રસ્તા પર ક્યાંય અંતનું નિશાન નથી.",
    "Still running off the edge, and you never did find a last one.": "રસ્તો હજી ધારની પાર જાય છે. અને છેલ્લો ઝંડો તમને ક્યારેય ન મળ્યો.",
    "Free play. Any step size, the track as far as you like, the band on or off.": "મુક્ત રમત. પગલાનું કોઈ પણ માપ લો, રસ્તો ગમે તેટલો વધારો, પટ્ટી ચાલુ કે બંધ.",
    /* phase 1 */
    "A times table read as a list": "યાદી તરીકે વાંચેલો ઘડિયો",
    "Look at the answers in a times table. What are you really looking at?": "ઘડિયાના જવાબો જુઓ. તમે ખરેખર શું જુઓ છો?",
    "Tap the stone where a step lands, and a flag goes in.": "જ્યાં પગલું પડે, તે પથ્થરને સ્પર્શ કરો. ત્યાં ઝંડો લાગી જશે.",
    "Which line of the table does each flag answer?": "દરેક ઝંડો ઘડિયાની કઈ લીટીનો જવાબ છે?",
    "Count the stones of one step. Count the same again from the last flag.": "એક પગલાના પથ્થર ગણો. છેલ્લા ઝંડાથી ફરી એટલા જ ગણો.",
    "The answers in a times table are the multiples of that number.": "ઘડિયાના જવાબો તે સંખ્યાના અવયવી હોય છે.",
    "You learned: a times table lists the multiples of its number.": "તમે શીખ્યા: ઘડિયો તેની સંખ્યાના અવયવીની યાદી છે.",
    "First six in the table of 9": "9 ના ઘડિયાના પહેલા છ",
    "Plant a flag on each of the first six answers in the table of 9. Then press enter.": "9 ના ઘડિયાના પહેલા છ જવાબો પર એક એક ઝંડો લગાવો. પછી એન્ટર દબાવો.",
    "Say the table of 9 aloud. Is every flag on one of its answers?": "9 નો ઘડિયો મોટેથી બોલો. શું દરેક ઝંડો તેના કોઈ જવાબ પર છે?",
    "First five multiples of 13": "13 ના પહેલા પાંચ અવયવી",
    "Now the first five multiples of 13. Count on from the post in steps of 13, then press enter.": "હવે 13 ના પહેલા પાંચ અવયવી. થાંભલાથી 13-13 ના પગલાંમાં આગળ ગણો, પછી એન્ટર દબાવો.",
    "How many stones long is one step of 13?": "13 નું એક પગલું કેટલા પથ્થર લાંબું છે?",
    "Next three after 33": "33 પછીના ત્રણ",
    "Flags stand on 11, 22 and 33 already. Plant the next three multiples of 11.": "11, 22 અને 33 પર ઝંડા પહેલેથી ઊભા છે. 11 ના પછીના ત્રણ અવયવી પર ઝંડા લગાવો.",
    "How far apart are the flags that were already standing?": "પહેલેથી ઊભેલા ઝંડા વચ્ચે કેટલું અંતર છે?",
    /* phase 2 */
    "The first multiple of a number": "કોઈ સંખ્યાનો પહેલો અવયવી",
    "This time the step waits for you.": "આ વખતે પગલું તમારી રાહ જુએ છે.",
    "Type where it will land, and then it goes down.": "તે ક્યાં પડશે તે લખો, પછી પગલું ત્યાં મૂકાશે.",
    "Where does one step from the post land?": "થાંભલાથી એક પગલું ક્યાં પડે છે?",
    "Say it as a table line. One times the number is what?": "તેને ઘડિયાની લીટીની જેમ બોલો. એક ગુણ્યા તે સંખ્યા કેટલા થાય?",
    "The first and lowest multiple of a number is the number itself.": "કોઈ સંખ્યાનો પહેલો અને સૌથી નાનો અવયવી તે સંખ્યા પોતે જ છે.",
    "You learned: one times a number gives its first and lowest multiple.": "તમે શીખ્યા: એક ગુણ્યા સંખ્યા તેનો પહેલો અને સૌથી નાનો અવયવી છે.",
    "First multiple of 23?": "23 નો પહેલો અવયવી?",
    "What is the first multiple of 23? Type where the very first step lands.": "23 નો પહેલો અવયવી કયો છે? સૌથી પહેલું પગલું ક્યાં પડે છે તે લખો.",
    "How many steps does it take to reach the first flag?": "પહેલા ઝંડા સુધી પહોંચવા કેટલાં પગલાં લાગે છે?",
    "First multiple of 37?": "37 નો પહેલો અવયવી?",
    "The step block holds 37 now. What is its first multiple?": "પગલાના ડબ્બામાં હવે 37 છે. તેનો પહેલો અવયવી કયો છે?",
    "Does the first step start at the post, or somewhere further on?": "પહેલું પગલું થાંભલાથી શરૂ થાય છે, કે ક્યાંક આગળથી?",
    "Lowest and third multiple of 23": "23 નો સૌથી નાનો ને ત્રીજો અવયવી",
    "Which is the lowest multiple of 23, and which is its third? One answer goes in each box.": "23 નો સૌથી નાનો અવયવી કયો છે, અને ત્રીજો કયો? દરેક ખાનામાં એક જવાબ લખો.",
    "The lowest is one step from the post. How many steps reach the third?": "સૌથી નાનો થાંભલાથી એક પગલે છે. ત્રીજા સુધી કેટલાં પગલાં પહોંચે?",
    "lowest": "સૌથી નાનો",
    "third": "ત્રીજો",
    /* phase 3 */
    "Multiples that never run out": "અવયવી જે ક્યારેય ખૂટતા નથી",
    "Ask the track for its last flag, as often as you like.": "રસ્તા પાસે તેનો છેલ્લો ઝંડો માગો, જેટલી વાર ગમે.",
    "Watch what it hands you each time.": "જુઓ, દર વખતે તે તમને શું આપે છે.",
    "What happens if you lay one more step?": "એક વધુ પગલું મૂકો, તો શું થાય?",
    "Pick any flag at all. Is there a step after it?": "કોઈ પણ ઝંડો પસંદ કરો. શું તેના પછી પણ એક પગલું છે?",
    "A number has infinite multiples, so there is no last one to find.": "કોઈ સંખ્યાના અવયવી અનંત હોય છે. તેથી છેલ્લો અવયવી મળતો જ નથી.",
    "You learned: after every multiple comes another; the list never ends.": "તમે શીખ્યા: દરેક અવયવી પછી બીજો આવે છે; યાદી ક્યારેય પૂરી થતી નથી.",
    "Is there a last one?": "શું કોઈ છેલ્લો છે?",
    "Here are twelve multiples of 11. Can you write the last one?": "અહીં 11 ના બાર અવયવી છે. શું તમે છેલ્લો અવયવી લખી શકો?",
    "What did the track hand you when you asked for the last flag?": "તમે છેલ્લો ઝંડો માગ્યો ત્યારે રસ્તાએ તમને શું આપ્યું?",
    "Yes": "હા",
    "No": "ના",
    "yes": "હા",
    "no": "ના",
    "Next multiple after 100?": "100 પછીનો અવયવી?",
    "A child says the multiples of 20 stop at 100. Which multiple of 20 comes after 100?": "એક બાળક કહે છે કે 20 ના અવયવી 100 પર અટકી જાય છે. 100 પછી 20 નો કયો અવયવી આવે?",
    "Which line of the table comes after 5 times 20?": "ઘડિયામાં 5 ગુણ્યા 20 પછી કઈ લીટી આવે છે?",
    "How many multiples of 51?": "51 ના કેટલા અવયવી?",
    "The pen holds the four factors of 51. How many multiples has 51?": "વાડામાં 51 ના ચાર અવયવ છે. 51 ના કેટલા અવયવી છે?",
    "The pen is shut at both ends. Is the track shut anywhere?": "વાડો બંને છેડે બંધ છે. શું રસ્તો ક્યાંય બંધ છે?",
    "infinite": "અનંત",
    /* phase 4 */
    "Between leaves out both ends": "વચ્ચેના ગણો, બંને છેડા છોડો",
    "Count only what is inside the band. What about the two on the posts?": "ફક્ત પટ્ટીની અંદરના જ ગણો. થાંભલા પરના બે ઝંડાનું શું?",
    "Is a flag on a post inside the band, or outside it?": "થાંભલા પરનો ઝંડો પટ્ટીની અંદર છે કે બહાર?",
    "Touch each flag between the posts and count aloud.": "થાંભલા વચ્ચેના દરેક ઝંડાને અડકીને મોટેથી ગણો.",
    "Between leaves out both ends, and a how many question wants the count as well as the list.": "વચ્ચે કહેતાં બંને છેડા છૂટી જાય છે. કેટલા પૂછ્યું હોય, તો યાદી સાથે કુલ સંખ્યા પણ કહો.",
    "You learned: a flag on a post stays out; count what is strictly inside.": "તમે શીખ્યા: થાંભલા પરનો ઝંડો બહાર રહે છે; ફક્ત અંદરના જ ગણો.",
    "How many between 18 and 63?": "18 અને 63 વચ્ચે કેટલા?",
    "How many multiples of 9 lie between 18 and 63? Type the count first.": "18 અને 63 વચ્ચે 9 ના કેટલા અવયવી છે? પહેલાં કુલ સંખ્યા લખો.",
    "Which flags are standing on the two posts?": "બંને થાંભલા પર કયા ઝંડા ઊભા છે?",
    "Multiples of 6 between 25 and 55": "25 અને 55 વચ્ચે 6 ના અવયવી",
    "Tap every multiple of 6 that lies between 25 and 55. Then press enter.": "25 અને 55 વચ્ચેના 6 ના દરેક અવયવીને સ્પર્શ કરો. પછી એન્ટર દબાવો.",
    "Which flag is the first one past the post at 25?": "25 વાળા થાંભલા પછી પહેલો ઝંડો કયો છે?",
    "How many between 22 and 88?": "22 અને 88 વચ્ચે કેટલા?",
    "How many multiples of 11 lie between 22 and 88? Give the count before the list.": "22 અને 88 વચ્ચે 11 ના કેટલા અવયવી છે? યાદી પહેલાં કુલ સંખ્યા કહો.",
    "Point to the first flag past 22 and the last flag before 88.": "22 પછીનો પહેલો ઝંડો અને 88 પહેલાંનો છેલ્લો ઝંડો બતાવો.",
    /* the working area, the slot and the summary thumb */
    "step": "પગલું",
    "flag": "ઝંડો",
    "flags": "ઝંડા",
    "1 flag": "1 ઝંડો",
    "inside": "અંદર",
    "last flag?": "છેલ્લો ઝંડો?",
    "one step": "એક પગલું",
    "keep going": "આગળ વધો",
    "band": "પટ્ટી",
    "no last one": "કોઈ છેલ્લો નથી",
    "multiples of 9": "9 ના અવયવી",
    "multiples of 13": "13 ના અવયવી",
    "multiples of 11": "11 ના અવયવી",
    "factors of 51": "51 ના અવયવ",
    "4 factors": "4 અવયવ",
  },
};

function MultipleTrack(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: mtShown, fitHost: () => null }} />
  );
}

export default MultipleTrack;
