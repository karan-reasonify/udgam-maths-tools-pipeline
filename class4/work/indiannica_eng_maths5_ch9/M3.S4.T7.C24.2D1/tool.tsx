/* ═══ M3.S4.T7.C24.2D1 · measure_multiplier · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "measure_multiplier";
const MEDIA_ID = "M3.S4.T7.C24.2D1";
const TOOL_NAME = "Smallest Unit Multiplier";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A measure on a card, and an empty slot for its smallest unit."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You multiplied and shared in the smallest unit, with whole numbers.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Copy or cut any strip you like.";

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
    concept: "Multiply in the smallest unit",
    conceptId: "M3.S4.T7.C24", objectiveIds: ["O11"],
    says: ["Smallest unit first. Now lay it again, and again."],
    /* tries, as the plan writes it: First rung: write the measure in centimetres only. Second rung: lay two copies and add them. Third rung: the same task with fewer copies, before the question's own number of copies returns. */
    ladder: ["Lay two copies and add them.","The same task with fewer copies, before the question's own number of copies returns."],
    closing: "write the measure in its smallest unit, then multiply the whole number",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: write the measure in its smallest unit, then multiply the whole number",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn SM1: answer in the plan = 580 cm. */
      { qid: "M3.S4.T7.C24:SM1", kind: "", say: "A shelf is 1 m 45 cm long. How long are 4 shelves in a row, in centimetres?", ask: "", answer: 580, miss: "Write the measure in centimetres only." },
      /* practice 1: answer in the plan = 305 cm */
      { qid: "M3.S4.T7.C24:1", kind: "", say: "Before multiplying 3 m 5 cm by a number, write it in its smallest unit. What is it?", ask: "", answer: 305, miss: "Write the measure in centimetres only." },
      /* practice 3: answer in the plan = 345 cm, because 115 x 3 = 345 */
      { qid: "M3.S4.T7.C24:3", kind: "", say: "A tile is 1 m 15 cm long. How long are 3 tiles laid end to end, in centimetres?", ask: "", answer: 345, miss: "Write the measure in centimetres only." },
    ],
  },
  {
    n: 2,
    concept: "Back to the larger unit",
    conceptId: "M3.S4.T7.C25", objectiveIds: ["O11"],
    says: ["How many whole kilograms are in there?"],
    /* tries, as the plan writes it: First rung: make one bundle from the total. Second rung: make every bundle it holds. Third rung: the same task on a total just over one kilogram, before the question's own total returns. */
    ladder: ["Make every bundle it holds.","The same task on a total just over one kilogram, before the question's own total returns."],
    closing: "write the product back in the larger unit, with its smaller part less than one of the larger unit",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: write the product back in the larger unit, with its smaller part less than one of the larger unit",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn SM2: answer in the plan = 14 kg 100 g, which is 14.1 kg. */
      { qid: "M3.S4.T7.C25:SM2", kind: "", say: "A packet holds 2 kg 350 g of sugar. How much do 6 packets hold, in kilograms and grams?", ask: "", answer: 14, miss: "Make one bundle from the total." },
      /* practice 4: answer in the plan = 6 L 750 mL, because 1350 x 5 = 6750 */
      { qid: "M3.S4.T7.C25:4", kind: "", say: "A bottle holds 1 L 350 mL. How much do 5 bottles hold, in litres and millilitres?", ask: "", answer: 6, miss: "Make one bundle from the total." },
      /* practice 7: answer in the plan = 10 m 60 cm, because 265 x 4 = 1060 */
      { qid: "M3.S4.T7.C25:7", kind: "", say: "A plank is 2 m 65 cm long. How long are 4 planks laid end to end, in metres and centimetres?", ask: "", answer: 10, miss: "Make one bundle from the total." },
    ],
  },
  {
    n: 3,
    concept: "Sharing equally",
    conceptId: "M3.S4.T7.C26", objectiveIds: ["O12"],
    says: ["Smallest unit first. Now cut it into equal pieces."],
    /* tries, as the plan writes it: First rung: write the length in centimetres only. Second rung: cut it into two equal pieces. Third rung: the same task into fewer pieces, before the question's own number of pieces returns. */
    ladder: ["Cut it into two equal pieces.","The same task into fewer pieces, before the question's own number of pieces returns."],
    closing: "write the measure in its smallest unit, then divide the whole number; each piece is the quotient",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: write the measure in its smallest unit, then divide the whole number; each piece is the quotient",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn SM3: answer in the plan = 75 cm. */
      { qid: "M3.S4.T7.C26:SM3", kind: "", say: "A pipe 4 m 50 cm long is cut into 6 equal pieces. How long is each piece?", ask: "", answer: 75, miss: "Write the length in centimetres only." },
      /* practice 2: answer in the plan = 24 cm */
      { qid: "M3.S4.T7.C26:2", kind: "", say: "A string 96 cm long is cut into 4 equal pieces. How long is each piece?", ask: "", answer: 24, miss: "Write the length in centimetres only." },
      /* practice 6: answer in the plan = 300 g, because 2400 divided by 8 is 300 */
      { qid: "M3.S4.T7.C26:6", kind: "", say: "A block of clay of 2 kg 400 g is shared equally among 8 pots. How much clay goes in each pot?", ask: "", answer: 300, miss: "Write the length in centimetres only." },
    ],
  },
  {
    n: 4,
    concept: "Some left over",
    conceptId: "M3.S4.T7.C27", objectiveIds: ["O12"],
    says: ["Each cup gets the same. Is anything left over?"],
    /* tries, as the plan writes it: First rung: write the capacity in millilitres only. Second rung: share it among two cups. Third rung: the same task among fewer cups, before the question's own cups return. */
    ladder: ["Share it among two cups.","The same task among fewer cups, before the question's own cups return."],
    closing: "when a sharing does not come out even, say how much each part gets and how much is left over, in words",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: when a sharing does not come out even, say how much each part gets and how much is left over, in words",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "",
    items: [
      /* learn SM4: answer in the plan = 462 mL in each cup, with 2 mL left over in the can. */
      { qid: "M3.S4.T7.C27:SM4", kind: "", say: "A can holds 1 L 850 mL of juice. It is shared equally among 4 cups. How much goes in each cup, and how much is left over?", ask: "", answer: 462, miss: "Write the capacity in millilitres only." },
      /* practice 5: answer in the plan = 257 g in each bowl, with 2 g left over, because 1030 divided by 4 is 257, with 2 left over */
      { qid: "M3.S4.T7.C27:5", kind: "", say: "A bag of 1 kg 30 g of rice is shared equally among 4 bowls. How much goes in each bowl, and how much is left over?", ask: "", answer: 257, miss: "Write the capacity in millilitres only." },
      /* practice 8: answer in the plan = 718 mL in each bottle, with 4 mL left over, because 5030 divided by 7 is 718, with 4 left over */
      { qid: "M3.S4.T7.C27:8", kind: "", say: "A tank of 5 L 30 mL is shared equally into 7 bottles. How much goes in each bottle, and how much is left over?", ask: "", answer: 718, miss: "Write the capacity in millilitres only." },
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

function MeasureMultiplier(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default MeasureMultiplier;
