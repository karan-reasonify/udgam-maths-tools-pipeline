/* ═══ M3.S5.T8.C28.2D1 · thermometer_reader · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "thermometer_reader";
const MEDIA_ID = "M3.S5.T8.C28.2D1";
const TOOL_NAME = "Thermometer Reader";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A thermometer, standing ready."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You found what one small mark was worth, and read the column.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Dip the thermometer anywhere and read it.";

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
    concept: "Hot and cold",
    conceptId: "M3.S5.T8.C28", objectiveIds: ["O13"],
    says: ["Dip it in. Does the column go up or down?"],
    /* tries, as the plan writes it: First rung: dip the thermometer into two cups only and say which is hotter. Second rung: add a third cup. Third rung: the same task with the ice and the tea only, before the question's own shelf returns. */
    ladder: ["Add a third cup.","The same task with the ice and the tea only, before the question's own shelf returns."],
    closing: "temperature is how hot or cold something is, and a thermometer measures it",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: temperature is how hot or cold something is, and a thermometer measures it",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn TR1: answer in the plan = The tea is hotter. A thermometer measures how hot or cold each one is, which is its temperature.  TODO: set answer */
      { qid: "M3.S5.T8.C28:TR1", kind: "", say: "A cup of tea and a glass of ice water sit on a table. Which is hotter, and what measures how hot each one is?", ask: "", answer: null, miss: "Dip the thermometer into two cups only and say which is hotter." },
      /* practice 1: answer in the plan = Temperature: how hot or cold something is  TODO: set answer */
      { qid: "M3.S5.T8.C28:1", kind: "", say: "What does a thermometer measure?", ask: "", answer: null, miss: "Dip the thermometer into two cups only and say which is hotter." },
      /* practice 8: answer in the plan = The cup at 70 deg C, by 25 degrees */
      { qid: "M3.S5.T8.C28:8", kind: "", say: "Two cups of water are at 45 deg C and 70 deg C. Which is hotter, and by how many degrees?", ask: "", answer: 70, miss: "Dip the thermometer into two cups only and say which is hotter." },
    ],
  },
  {
    n: 2,
    concept: "Two scales",
    conceptId: "M3.S5.T8.C29", objectiveIds: ["O13"],
    says: ["Tap a landmark. Read it on both sides."],
    /* tries, as the plan writes it: First rung: tap the freezing water landmark and read the Celsius side. Second rung: read the other side of the same landmark. Third rung: the same task on the boiling water landmark, before the question's own landmark returns. */
    ladder: ["Read the other side of the same landmark.","The same task on the boiling water landmark, before the question's own landmark returns."],
    closing: "water freezes and boils at two landmark readings, and each pairs with one reading on the other scale; there is no rule here for others",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: water freezes and boils at two landmark readings, and each pairs with one reading on the other scale; there is no rule here for others",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn TR2: answer in the plan = Water boils at 100 deg C, which is 212 deg F. */
      { qid: "M3.S5.T8.C29:TR2", kind: "", say: "At what temperature does water boil on the Celsius scale, and what is that on the Fahrenheit scale?", ask: "", answer: 100, miss: "Tap the freezing water landmark and read the Celsius side." },
      /* practice 2: answer in the plan = 32 deg F */
      { qid: "M3.S5.T8.C29:2", kind: "", say: "At what temperature does water freeze on the Fahrenheit scale?", ask: "", answer: 32, miss: "Tap the freezing water landmark and read the Celsius side." },
      /* practice 5: answer in the plan = About 37 deg C */
      { qid: "M3.S5.T8.C29:5", kind: "", say: "What is normal body temperature on the Celsius scale?", ask: "", answer: 37, miss: "Tap the freezing water landmark and read the Celsius side." },
    ],
  },
  {
    n: 3,
    concept: "What one small mark is worth",
    conceptId: "M3.S5.T8.C30", objectiveIds: ["O14"],
    says: ["Count the steps between two labels, not the marks."],
    /* tries, as the plan writes it: First rung: count the steps between two labels only. Second rung: find the gap between the labels. Third rung: the same task with one small mark between the labels, before the question's own scale returns. */
    ladder: ["Find the gap between the labels.","The same task with one small mark between the labels, before the question's own scale returns."],
    closing: "find what one small mark is worth: the gap between two labels, divided by the number of steps between them",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: find what one small mark is worth: the gap between two labels, divided by the number of steps between them",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn TR3: answer in the plan = 2 degrees. */
      { qid: "M3.S5.T8.C30:TR3", kind: "", say: "A thermometer is labelled 60, 70 and 80 deg C, with 4 small marks between neighbouring labels. What is one small mark worth?", ask: "", answer: 2, miss: "Count the steps between two labels only." },
      /* practice 3: answer in the plan = 1 degree, because 5 divided by 5 is 1 */
      { qid: "M3.S5.T8.C30:3", kind: "", say: "Labels 20 and 25 deg C have 4 small marks between them. What is one small mark worth?", ask: "", answer: 1, miss: "Count the steps between two labels only." },
      /* practice 6: answer in the plan = 4 degrees, because 20 divided by 5 is 4 */
      { qid: "M3.S5.T8.C30:6", kind: "", say: "Labels 40 and 60 deg C have 4 small marks between them. What is one small mark worth?", ask: "", answer: 4, miss: "Count the steps between two labels only." },
    ],
  },
  {
    n: 4,
    concept: "Reading a thermometer",
    conceptId: "M3.S5.T8.C31", objectiveIds: ["O14"],
    says: ["What is one mark worth here? Count up from the label."],
    /* tries, as the plan writes it: First rung: find what one small mark is worth. Second rung: count the marks above the label below the column. Third rung: the same task with the column one mark above a label, before the question's own thermometer returns. */
    ladder: ["Count the marks above the label below the column.","The same task with the column one mark above a label, before the question's own thermometer returns."],
    closing: "find what one small mark is worth, count the marks from the label below the column, and add",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: find what one small mark is worth, count the marks from the label below the column, and add",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn TR4: answer in the plan = 66 deg C. */
      { qid: "M3.S5.T8.C31:TR4", kind: "", say: "On a thermometer labelled 60, 70 and 80 deg C, one small mark is worth 2 degrees. The column stops 3 small marks above the 60 label. What does it read?", ask: "", answer: 66, miss: "Find what one small mark is worth." },
      /* practice 4: answer in the plan = 28 deg C */
      { qid: "M3.S5.T8.C31:4", kind: "", say: "On a thermometer where one small mark is worth 1 degree, the column stops 3 marks above the 25 label. What is the reading?", ask: "", answer: 28, miss: "Find what one small mark is worth." },
      /* practice 7: answer in the plan = 38 deg C, because each mark is worth 4 degrees */
      { qid: "M3.S5.T8.C31:7", kind: "", say: "Labels 30 and 50 deg C have 4 small marks between them. The column stops 2 marks above the 30 label. What is the reading?", ask: "", answer: 38, miss: "Find what one small mark is worth." },
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

function ThermometerReader(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default ThermometerReader;
