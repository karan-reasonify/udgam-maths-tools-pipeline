/* ═══ M3.S6.T10.C36.2D1 · three_ways · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "three_ways";
const MEDIA_ID = "M3.S6.T10.C36.2D1";
const TOOL_NAME = "Three Ways Recorder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A class record chart, with a card to fill in."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You wrote real measures three ways, put them in order and added them.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Record any measure and flip it through its forms.";

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
    concept: "One measure, three ways",
    conceptId: "M3.S6.T10.C36", objectiveIds: ["O17"],
    says: ["Flip it. Say the same jump another way."],
    /* tries, as the plan writes it: First rung: write only the smallest-unit form. Second rung: write it as a decimal in metres. Third rung: the same task on a jump with no empty place, before the question's own jump returns. */
    ladder: ["Write it as a decimal in metres.","The same task on a jump with no empty place, before the question's own jump returns."],
    closing: "one measure can be written in two units, in its smallest unit and as a decimal in the larger unit",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: one measure can be written in two units, in its smallest unit and as a decimal in the larger unit",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn TW1: answer in the plan = 307 cm, and 3.07 m. */
      { qid: "M3.S6.T10.C36:TW1", kind: "", say: "A long jump measures 3 m 7 cm. Write it in centimetres, and as a decimal in metres.", ask: "", answer: 307, miss: "Write only the smallest-unit form." },
      /* practice 1: answer in the plan = 1250 g */
      { qid: "M3.S6.T10.C36:1", kind: "", say: "A packet's label says 1 kg 250 g. Write the weight in grams.", ask: "", answer: 1250, miss: "Write only the smallest-unit form." },
      /* practice 2: answer in the plan = 4.6 m */
      { qid: "M3.S6.T10.C36:2", kind: "", say: "Write 4 m 60 cm as a decimal in metres.", ask: "", answer: "4.6", miss: "Write only the smallest-unit form." },
    ],
  },
  {
    n: 2,
    concept: "Ordering real measures",
    conceptId: "M3.S6.T10.C37", objectiveIds: ["O17"],
    says: ["One unit first. Then shortest to longest."],
    /* tries, as the plan writes it: First rung: flip one card to centimetres. Second rung: flip them all. Third rung: the same task with three jumps, before the question's own four return. */
    ladder: ["Flip them all.","The same task with three jumps, before the question's own four return."],
    closing: "put every measure in one unit, then order them",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: put every measure in one unit, then order them",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn TW2: answer in the plan = 208 cm, 2 m 15 cm, 2.5 m, 2 m 51 cm. */
      { qid: "M3.S6.T10.C37:TW2", kind: "", say: "Four jumps measure 2 m 15 cm, 2.5 m, 208 cm and 2 m 51 cm. Put them in ascending order.", ask: "", answer: 208, miss: "Flip one card to centimetres." },
      /* practice 3: answer in the plan = Write all of them in one unit  TODO: set answer */
      { qid: "M3.S6.T10.C37:3", kind: "", say: "Before putting the jumps of a group in order, what must you do first?", ask: "", answer: null, miss: "Flip one card to centimetres." },
      /* practice 4: answer in the plan = 1008 g, 1 kg 80 g, 1 kg 800 g */
      { qid: "M3.S6.T10.C37:4", kind: "", say: "Put in ascending order: 1 kg 80 g, 1 kg 800 g, 1008 g.", ask: "", answer: 1008, miss: "Flip one card to centimetres." },
    ],
  },
  {
    n: 3,
    concept: "Weights of a group",
    conceptId: "M3.S6.T10.C38", objectiveIds: ["O18"],
    says: ["All in grams. Add them. How many kilograms is that?"],
    /* tries, as the plan writes it: First rung: write one weight in grams. Second rung: add two of them. Third rung: the same task with two weights, before the question's own three return. */
    ladder: ["Add two of them.","The same task with two weights, before the question's own three return."],
    closing: "add weights in the smallest unit, then write the total back in the larger unit",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: add weights in the smallest unit, then write the total back in the larger unit",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn TW3: answer in the plan = 5 kg 625 g, which is 5.625 kg. */
      { qid: "M3.S6.T10.C38:TW3", kind: "", say: "Three bags of fruit weigh 1 kg 640 g, 2 kg 85 g and 1 kg 900 g. What do they weigh together?", ask: "", answer: 5, miss: "Write one weight in grams." },
      /* practice 5: answer in the plan = 4125 g */
      { qid: "M3.S6.T10.C38:5", kind: "", say: "Two bags weigh 2 kg 450 g and 1 kg 675 g. What do they weigh together, in grams?", ask: "", answer: 4125, miss: "Write one weight in grams." },
      /* practice 7: answer in the plan = 3.17 kg, because 850 + 1020 + 1300 = 3170 */
      { qid: "M3.S6.T10.C38:7", kind: "", say: "Three parcels weigh 850 g, 1 kg 20 g and 1.3 kg. What is their total, as a decimal in kilograms?", ask: "", answer: "3.17", miss: "Write one weight in grams." },
    ],
  },
  {
    n: 4,
    concept: "Water drunk by a group",
    conceptId: "M3.S6.T10.C39", objectiveIds: ["O18"],
    says: ["Pour it and read the jug. Now add them all."],
    /* tries, as the plan writes it: First rung: pour and read one drink. Second rung: add two drinks. Third rung: the same task with three drinks, before the question's own group returns. */
    ladder: ["Add two drinks.","The same task with three drinks, before the question's own group returns."],
    closing: "measure each drink with a measuring jug, add the millilitres, and write the total in litres and millilitres",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: measure each drink with a measuring jug, add the millilitres, and write the total in litres and millilitres",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn TW4: answer in the plan = 1 L 150 mL, which is 1.15 L. */
      { qid: "M3.S6.T10.C39:TW4", kind: "", say: "Five children drink 210 mL, 235 mL, 190 mL, 260 mL and 255 mL of water, each poured from a measuring jug. How much is that in litres and millilitres?", ask: "", answer: 1, miss: "Pour and read one drink." },
      /* practice 6: answer in the plan = It is marked in millilitres, so each drink can be read, not guessed  TODO: set answer */
      { qid: "M3.S6.T10.C39:6", kind: "", say: "Why is a measuring jug used for the water each child drinks?", ask: "", answer: null, miss: "Pour and read one drink." },
      /* practice 8: answer in the plan = 1 L 220 mL, because 325 + 410 + 195 + 290 = 1220 */
      { qid: "M3.S6.T10.C39:8", kind: "", say: "Four cups hold 325 mL, 410 mL, 195 mL and 290 mL. How much is that altogether, in litres and millilitres?", ask: "", answer: 1, miss: "Pour and read one drink." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => it.answer !== null && it.answer !== undefined));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.parts ? item.answer.map((x: any, k: number, a: any[]) => (x !== null && a.slice(k + 1).every((y: any) => y === null) ? x + 1 : x ?? "")).join("|")
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : /^\d*\.\d+$/.test(String(item.answer)) ? [String(item.answer), speakable(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
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
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const tl = useTimeline();

  /* Enter and choice taps go here first while the working area owns the answer */
  api.onEnter(null);

  /* the traceback */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tl.run([[600, () => {}]], () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ complete: stage === "idle" });

  return (
    <g>
      {/* the running count sits in the runs zone (64,108), 94 above the working area:
          <g data-zone="runs"><rect x={0} y={-94} width={330} height={76} .../>...</g> */}
      <rect x={0} y={0} width={W.w} height={W.h} rx={RAD.panel} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 12" />
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(v)}</text>
    </g>
  );
}

function ThreeWays(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default ThreeWays;
