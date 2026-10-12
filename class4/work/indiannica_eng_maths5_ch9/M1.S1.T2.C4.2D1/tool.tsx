/* ═══ M1.S1.T2.C4.2D1 · metric_chart · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "metric_chart";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Chart Builder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A chart of units, waiting to be built."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You built the chart and read a measure off it, with its unit.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Drop any digits and set the point anywhere.";

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
    concept: "Standard units",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O1"],
    says: ["What would you measure this with? Drop it on its unit."],
    /* tries, as the plan writes it: First rung: sort just two things, one to measure along and one to lift. Second rung: add one thing to pour. Third rung: the same task with three things from the classroom, before the question's own things return. */
    ladder: ["Add one thing to pour.","The same task with three things from the classroom, before the question's own things return."],
    closing: "the metre measures length, the kilogram measures weight and the litre measures capacity; these are the standard units",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: the metre measures length, the kilogram measures weight and the litre measures capacity; these are the standard units",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn MC1: answer in the plan = The metre for the hose, the kilogram for the pumpkin, and the litre for the water.  TODO: set answer */
      { qid: "M1.S1.T2.C4:MC1", kind: "", say: "Which standard unit measures the length of a garden hose, which measures the weight of a pumpkin, and which measures the water in a tank?", ask: "", answer: null, miss: "Sort just two things, one to measure along and one to lift." },
      /* practice 1: answer in the plan = The metre (m)  TODO: set answer */
      { qid: "M1.S1.T2.C4:1", kind: "", say: "Which standard unit would you use to measure the length of a playground?", ask: "", answer: null, miss: "Sort just two things, one to measure along and one to lift." },
      /* practice 5: answer in the plan = The litre for the water, and the kilogram for the potatoes  TODO: set answer */
      { qid: "M1.S1.T2.C4:5", kind: "", say: "Which standard unit fits the water in a bucket, and which fits the weight of a bag of potatoes?", ask: "", answer: null, miss: "Sort just two things, one to measure along and one to lift." },
    ],
  },
  {
    n: 2,
    concept: "Prefixes and the base unit",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Turn a card. How many base units is it worth?"],
    /* tries, as the plan writes it: First rung: turn only kilo and milli. Second rung: turn the two cards next to the base unit. Third rung: the same task on the length row only, before the question's own row returns. */
    ladder: ["Turn the two cards next to the base unit.","The same task on the length row only, before the question's own row returns."],
    closing: "kilo, hecto and deca make bigger units and deci, centi and milli smaller ones, all added to the base unit metre, gram or litre",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: kilo, hecto and deca make bigger units and deci, centi and milli smaller ones, all added to the base unit metre, gram or litre",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn MC2: answer in the plan = Hecto means 100 times the base unit, so 100 g make 1 hg. */
      { qid: "M1.S1.T2.C5:MC2", kind: "", say: "What does hecto mean, and how many grams make 1 hg?", ask: "", answer: 100, miss: "Turn only kilo and milli." },
      /* practice 2: answer in the plan = Deca means 10 times the base unit, so 10 litres make 1 daL */
      { qid: "M1.S1.T2.C5:2", kind: "", say: "What does deca mean? How many litres make 1 daL?", ask: "", answer: 10, miss: "Turn only kilo and milli." },
      /* practice 6: answer in the plan = The kilometre; 1000 m make 1 km */
      { qid: "M1.S1.T2.C5:6", kind: "", say: "Which is the largest unit of length in the chart, and how many metres make one of it?", ask: "", answer: 1000, miss: "Turn only kilo and milli." },
    ],
  },
  {
    n: 3,
    concept: "Ten times the unit to its right",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O2"],
    says: ["Step left. How many of the old unit fill the new one?"],
    /* tries, as the plan writes it: First rung: step left just once and count the bars. Second rung: step left once more and count again. Third rung: the same task on another row of the chart, before the question's own row returns. */
    ladder: ["Step left once more and count again.","The same task on another row of the chart, before the question's own row returns."],
    closing: "each unit is 10 times the unit to its right, and 1/10 of the unit to its left",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: each unit is 10 times the unit to its right, and 1/10 of the unit to its left",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn MC3: answer in the plan = 10 cL make 1 dL, and 100 cL make 1 litre. */
      { qid: "M1.S1.T2.C6:MC3", kind: "", say: "On the capacity row, dL sits just to the left of cL. How many centilitres make 1 dL, and how many make 1 litre?", ask: "", answer: 10, miss: "Step left just once and count the bars." },
      /* practice 3: answer in the plan = 10 mL */
      { qid: "M1.S1.T2.C6:3", kind: "", say: "How many millilitres make 1 cL?", ask: "", answer: 10, miss: "Step left just once and count the bars." },
      /* practice 7: answer in the plan = Three places to the left; 1 m is 10 x 10 x 10 = 1000 mm */
      { qid: "M1.S1.T2.C6:7", kind: "", say: "How many places is it from mm to m on the chart, and how many millimetres make 1 m?", ask: "", answer: 1, miss: "Step left just once and count the bars." },
    ],
  },
  {
    n: 4,
    concept: "A measure on the chart",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Set the point after the unit asked for. Now say the unit too."],
    /* tries, as the plan writes it: First rung: drop the digits and set the point after the base unit only. Second rung: move the point to the unit asked for and read it. Third rung: the same task with no empty column, before the question's own measure returns. */
    ladder: ["Move the point to the unit asked for and read it.","The same task with no empty column, before the question's own measure returns."],
    closing: "a measure written one digit to a unit is read as one decimal, with the point just after the digit of the unit chosen and that unit named",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a measure written one digit to a unit is read as one decimal, with the point just after the digit of the unit chosen and that unit named",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn MC4: answer in the plan = 3.725 kL. */
      { qid: "M1.S1.T2.C7:MC4", kind: "", say: "A tank holds 3 kL 7 hL 2 daL 5 L. Write it on the chart one digit to a unit, and read it as one decimal in kilolitres.", ask: "", answer: "3.725", miss: "Drop the digits and set the point after the base unit only." },
      /* practice 4: answer in the plan = 4.170 kg, which is 4.17 kg */
      { qid: "M1.S1.T2.C7:4", kind: "", say: "Digits 4, 1 and 7 sit under kg, hg and dag, and 0 sits under g. Read the measure as one decimal in kilograms.", ask: "", answer: "4.170", miss: "Drop the digits and set the point after the base unit only." },
      /* practice 8: answer in the plan = 7.036 km */
      { qid: "M1.S1.T2.C7:8", kind: "", say: "Write 7 km 0 hm 3 dam 6 m as one decimal in kilometres.", ask: "", answer: "7.036", miss: "Drop the digits and set the point after the base unit only." },
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

function MetricChart(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default MetricChart;
