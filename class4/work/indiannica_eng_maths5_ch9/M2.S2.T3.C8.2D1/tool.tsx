/* ═══ M2.S2.T3.C8.2D1 · smaller_to_bigger · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "smaller_to_bigger";
const MEDIA_ID = "M2.S2.T3.C8.2D1";
const TOOL_NAME = "Left Hop Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A measure on the chart, and a pin on its unit."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You hopped left to a bigger unit, and named it.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Set any measure and hop it anywhere to the left.";

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
    concept: "Count the places",
    conceptId: "M2.S2.T3.C8", objectiveIds: ["O3"],
    says: ["Pin the unit you want. How many places away is it?"],
    /* tries, as the plan writes it: First rung: pin the unit you want and count the places without hopping. Second rung: hop once and read the measure. Third rung: the same task between two neighbouring units, one place apart, before the question's own measure returns. */
    ladder: ["Hop once and read the measure.","The same task between two neighbouring units, one place apart, before the question's own measure returns."],
    closing: "count the places from the unit you have to the unit you want; each place to the left divides the number by 10",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: count the places from the unit you have to the unit you want; each place to the left divides the number by 10",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn SB1: answer in the plan = 12.85 m. */
      { qid: "M2.S2.T3.C8:SB1", kind: "", say: "A garden hose is 1285 cm long. How long is it in metres?", ask: "", answer: "12.85", miss: "Pin the unit you want and count the places without hopping." },
      /* practice 1: answer in the plan = Three places to the left  TODO: set answer */
      { qid: "M2.S2.T3.C8:1", kind: "", say: "From mL to L on the chart, how many places is it, and which way?", ask: "", answer: null, miss: "Pin the unit you want and count the places without hopping." },
      /* practice 2: answer in the plan = 9 cm */
      { qid: "M2.S2.T3.C8:2", kind: "", say: "Write 90 mm in centimetres.", ask: "", answer: 9, miss: "Pin the unit you want and count the places without hopping." },
    ],
  },
  {
    n: 2,
    concept: "A mixed measure as one decimal",
    conceptId: "M2.S2.T3.C9", objectiveIds: ["O3"],
    says: ["Where does the point go? Is any place empty?"],
    /* tries, as the plan writes it: First rung: set the point after the kilograms digit only. Second rung: put each grams digit in its own column. Third rung: the same task with no empty column, before the question's own weight returns. */
    ladder: ["Put each grams digit in its own column.","The same task with no empty column, before the question's own weight returns."],
    closing: "a mixed measure is one decimal in the larger unit, with zeros holding empty places after the point",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a mixed measure is one decimal in the larger unit, with zeros holding empty places after the point",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn SB2: answer in the plan = 8.036 kg. */
      { qid: "M2.S2.T3.C9:SB2", kind: "", say: "Write 8 kg 36 g in kilograms.", ask: "", answer: "8.036", miss: "Set the point after the kilograms digit only." },
      /* practice 4: answer in the plan = 5.408 km */
      { qid: "M2.S2.T3.C9:4", kind: "", say: "Write 5 km 408 m in kilometres.", ask: "", answer: "5.408", miss: "Set the point after the kilograms digit only." },
      /* practice 8: answer in the plan = 7.045 kL */
      { qid: "M2.S2.T3.C9:8", kind: "", say: "Write 7 kL 45 L as a decimal in kilolitres.", ask: "", answer: "7.045", miss: "Set the point after the kilograms digit only." },
    ],
  },
  {
    n: 3,
    concept: "Into two units",
    conceptId: "M2.S2.T3.C10", objectiveIds: ["O4"],
    says: ["Cut it where the metres end. What is left in centimetres?"],
    /* tries, as the plan writes it: First rung: point to the metres column. Second rung: cut there and read the metres part. Third rung: the same task on a shorter length, before the question's own length returns. */
    ladder: ["Cut there and read the metres part.","The same task on a shorter length, before the question's own length returns."],
    closing: "a measure in one unit can be split at a unit's column into a larger unit and a smaller one",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a measure in one unit can be split at a unit's column into a larger unit and a smaller one",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn SB3: answer in the plan = 9 m 15 cm. */
      { qid: "M2.S2.T3.C10:SB3", kind: "", say: "A rope is 915 cm long. Write its length in metres and centimetres.", ask: "", answer: 9, miss: "Point to the metres column." },
      /* practice 3: answer in the plan = 3 m 7 dm */
      { qid: "M2.S2.T3.C10:3", kind: "", say: "Write 37 dm in metres and decimetres.", ask: "", answer: 3, miss: "Point to the metres column." },
      /* practice 7: answer in the plan = 2 kg 64 g */
      { qid: "M2.S2.T3.C10:7", kind: "", say: "Write 2064 g in kilograms and grams.", ask: "", answer: 2, miss: "Point to the metres column." },
    ],
  },
  {
    n: 4,
    concept: "A decimal names its unit",
    conceptId: "M2.S2.T3.C11", objectiveIds: ["O4"],
    says: ["Which unit is this decimal in? Clip it on."],
    /* tries, as the plan writes it: First rung: say which unit the point sits after. Second rung: clip that tag. Third rung: the same task on a decimal in kilograms, before the question's own decimal returns. */
    ladder: ["Clip that tag.","The same task on a decimal in kilograms, before the question's own decimal returns."],
    closing: "every decimal is written with its unit, because the same digits in another unit are another measure",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: every decimal is written with its unit, because the same digits in another unit are another measure",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn SB4: answer in the plan = 1.065 L. The unit says the decimal is in litres; read in millilitres, the same digits would be about one drop. */
      { qid: "M2.S2.T3.C11:SB4", kind: "", say: "A flask holds 1 L 65 mL. Write it as a decimal in litres, and say why the unit must be written.", ask: "", answer: "1.065", miss: "Say which unit the point sits after." },
      /* practice 5: answer in the plan = 3.007 kg */
      { qid: "M2.S2.T3.C11:5", kind: "", say: "Write 3 kg 7 g as a decimal in kilograms, and name the unit.", ask: "", answer: "3.007", miss: "Say which unit the point sits after." },
      /* practice 6: answer in the plan = No. 4.3 kg is 4300 g, but 4.3 g is a small pinch. The unit tells which */
      { qid: "M2.S2.T3.C11:6", kind: "", say: "Are 4.3 kg and 4.3 g the same weight?", ask: "", answer: "4.3", miss: "Say which unit the point sits after." },
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

function SmallerToBigger(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default SmallerToBigger;
