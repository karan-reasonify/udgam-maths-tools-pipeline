/* ═══ M2.S4.T9.C40.2D1 · decimal_comparer · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   Phases 1-3: two decimal cards, their points in one line over a place strip. Compare lights one
   place a tap from the left (the whole number part first); matching places fade, the first place
   that differs lights amber and decides, and then the bars grow on the tape, to scale. The child
   taps the greater card (it goes into the slot) or types it, then Enter. Make like writes violet
   zeros as a help. Phase 4: the cards are dragged onto a staircase ladder (up for ascending, down
   for descending), the switch flips it, and a tap on a sign between two cards compares that pair. */

const TOOL_ID = "decimal_comparer";
const MEDIA_ID = "M2.S4.T9.C40.2D1";
const TOOL_NAME = "Decimal Comparer";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Two decimals, their points in one line."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "The first place that differed decided every time.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Compare any decimals, and order any four.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = { hi: {}, gu: {} };

/* One entry per phase = one mount. Phases 1-3: kind "pick", cards a (top) and b (bottom), the answer is
   the greater decimal as written (typed, or set by a tap on its card). Phase 4: kind "order", the cards
   go onto the ladder; the answer is the ladder read left to right with its sign ("3.9>3.09>3.009"). */
const PHASES = [
  {
    n: 1,
    concept: "Whole number parts first",
    conceptId: "M2.S4.T9.C40", objectiveIds: ["O15"],
    says: ["Look at the whole numbers first. Is it settled already?"],
    /* tries, as the plan writes it: First rung: read the two whole number parts. Second rung: say which is greater. Third rung: the same task with one digit after each point. */
    ladder: ["Say which whole number part is greater.", "Cover everything after each point, and look again."],
    closing: "When the whole number parts differ, the greater whole number part decides.",
    learned: "You learned: if the whole number parts differ, they decide",
    traceback: "Compare walks from the left: the whole number parts light amber and decide, the bars grow to scale, the greater card is ringed and the sign is written.",
    items: [
      /* learn DC1: answer in the plan = 15.2, because 15 > 8 */
      { qid: "M2.S4.T9.C40:DC1", kind: "pick", a: "15.2", b: "8.96", answer: "15.2", winMs: 4000,
        say: "Which is greater, 15.2 or 8.96? Tap its card, then press Enter.", ask: "Which is greater?",
        miss: "Read the two whole number parts." },
      /* practice 1: answer in the plan = 21.05, because 21 > 19 */
      { qid: "M2.S4.T9.C40:1", kind: "pick", a: "21.05", b: "19.8", answer: "21.05", winMs: 4000,
        say: "Now 21.05 or 19.8. Pick the greater one.", ask: "Which is greater?",
        miss: "Compare 21 with 19 before the point." },
      /* practice 8: answer in the plan = 30.001, because 30 > 29. The digits after the point do not matter */
      { qid: "M2.S4.T9.C40:8", kind: "pick", a: "30.001", b: "29.999", answer: "30.001", winMs: 4000,
        say: "Last pair: 30.001 and 29.999. Which is greater?", ask: "Which is greater?",
        miss: "What comes before each point?" },
    ],
  },
  {
    n: 2,
    concept: "Then tenths, then hundredths",
    conceptId: "M2.S4.T9.C41", objectiveIds: ["O15"],
    says: ["The ones match. Which place is next?"],
    /* tries, as the plan writes it: First rung: check that the whole number parts match. Second rung: compare the tenths. Third rung: the same task where the tenths already differ, before the hundredths are needed. */
    ladder: ["Compare the tenths.", "If the tenths match too, the hundredths decide."],
    closing: "When the whole number parts are equal, the first place after the point that differs decides.",
    learned: "You learned: equal whole parts? The first place that differs decides",
    traceback: "Compare walks from the left: the matching ones fade, the first place after the point that differs lights amber, the bars grow to scale and the sign is written.",
    items: [
      /* learn DC2: answer in the plan = 6.4 */
      { qid: "M2.S4.T9.C41:DC2", kind: "pick", a: "6.38", b: "6.4", answer: "6.4", winMs: 4000,
        say: "Which is greater, 6.38 or 6.4? Tap its card, then press Enter.", ask: "Which is greater?",
        miss: "Check that the whole number parts match." },
      /* practice 2: answer in the plan = 4.53. The ones and the tenths match, and 3 hundredths is more than 1 hundredth */
      { qid: "M2.S4.T9.C41:2", kind: "pick", a: "4.53", b: "4.51", answer: "4.53", winMs: 4200,
        say: "Next, 4.53 or 4.51. Which one is more?", ask: "Which is greater?",
        miss: "Ones match, and tenths match. Look one place further." },
      /* practice 4: answer in the plan = The 2.64 m ribbon. The ones and the tenths match, and 4 hundredths is more than 0 hundredths */
      { qid: "M2.S4.T9.C41:4", kind: "pick", a: "2.64", b: "2.6", answer: "2.64", winMs: 4200,
        say: "One ribbon is 2.64 m long and another is 2.6 m long. Which is longer?", ask: "Which ribbon is longer?",
        miss: "Write 2.6 as 2.60 if it helps your eye." },
    ],
  },
  {
    n: 3,
    concept: "More digits is not more",
    conceptId: "M2.S4.T9.C42", objectiveIds: ["O15"],
    says: ["More digits. Is it more?"],
    /* tries, as the plan writes it: First rung: compare the tenths only. Second rung: look at the bars. Third rung: the same task with one digit after each point. */
    ladder: ["Look at the bars.", "Read only the first digit after each point."],
    closing: "A decimal with more digits after the point is not greater for that.",
    learned: "You learned: more digits after the point does not mean greater",
    traceback: "Compare walks from the left and the tenths decide; the bars grow to scale and the longer decimal's bar is seen to stop first; the sign is written.",
    items: [
      /* learn DC3: answer in the plan = 0.7 */
      { qid: "M2.S4.T9.C42:DC3", kind: "pick", a: "0.7", b: "0.625", answer: "0.7", winMs: 4200,
        say: "Which is greater, 0.7 or 0.625? Tap its card, then press Enter.", ask: "Which is greater?",
        miss: "Compare the tenths only." },
      /* practice 3: answer in the plan = 0.8, because 8 tenths is more than 7 tenths */
      { qid: "M2.S4.T9.C42:3", kind: "pick", a: "0.8", b: "0.79", answer: "0.8", winMs: 4200,
        say: "Now 0.8 or 0.79. Pick the greater one.", ask: "Which is greater?",
        miss: "Count the tenths in each." },
      /* practice 6: answer in the plan = 0.6, because 6 tenths is more than 5 tenths */
      { qid: "M2.S4.T9.C42:6", kind: "pick", a: "0.6", b: "0.587", answer: "0.6", winMs: 4200,
        say: "Last pair: 0.6 and 0.587. Which one is more?", ask: "Which is greater?",
        miss: "Three digits, but how many tenths?" },
    ],
  },
  {
    n: 4,
    concept: "Putting decimals in order",
    conceptId: "M2.S4.T9.C43", objectiveIds: ["O16"],
    says: ["Smallest first. Then flip it, greatest first."],
    /* tries, as the plan writes it: First rung: find the smallest card. Second rung: find the greatest. Third rung: the same task with three cards, before four return. */
    ladder: ["Find the greatest.", "Compare two cards at a time, place by place."],
    closing: "Decimals are put in ascending or descending order by comparing them place by place.",
    learned: "You learned: order decimals by comparing them place by place",
    traceback: "The switch lights the order asked for, each pair's first differing place lights amber on the ladder, the step for the smallest card is ringed, and the right order is written above the ladder.",
    items: [
      /* learn DC4: answer in the plan = 3.9, 3.09, 3.009 */
      { qid: "M2.S4.T9.C43:DC4", kind: "order", cards: ["3.09", "3.9", "3.009"], dir: "desc", pad: "enter",
        answer: "3.9>3.09>3.009", near: "3.009>3.09>3.9", winMs: 4600,
        say: "Put 3.09, 3.9 and 3.009 in descending order. Drag each card onto a step.", ask: "Descending order",
        miss: "Find the smallest card." },
      /* practice 5: answer in the plan = 0.56 < 5.06 < 5.6 */
      { qid: "M2.S4.T9.C43:5", kind: "order", cards: ["5.06", "5.6", "0.56"], dir: "asc", pad: "enter",
        answer: "0.56<5.06<5.6", near: "5.6<5.06<0.56", winMs: 4600,
        say: "Now 5.06, 5.6 and 0.56, in ascending order.", ask: "Ascending order",
        miss: "Ascending climbs up. Which card goes on the lowest step?" },
      /* practice 7: answer in the plan = 124 > 12.4 > 12.04 > 1.24 */
      { qid: "M2.S4.T9.C43:7", kind: "order", cards: ["12.4", "1.24", "12.04", "124"], dir: "desc", pad: "enter",
        answer: "124>12.4>12.04>1.24", near: "1.24>12.04>12.4>124", winMs: 4600,
        say: "Four cards now: 12.4, 1.24, 12.04 and 124. Greatest first.", ask: "Descending order",
        miss: "Compare the whole number parts first." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  places: ["whole number", "tenths", "hundredths", "thousandths"],
  cards: { x: 16, w: 788, h: 80, yTop: 40, yBottom: 130, point: 274, decimalColumn: 170 },
  tape: { x0: 16, x1: 804, axis: 424, windows: "0 to the next whole number past both when the whole number parts differ; the one whole number they share, in tenths and hundredths, when they match" },
  ladder: { card: [192, 84], gap: 76, rise: 40, floor: 524 },
  freeSets: [["0.5", "0.45", "0.405", "0.54"], ["2.07", "2.7", "2.075", "2.705"], ["1.1", "1.01", "1.001", "1.11"], ["3.6", "3.06", "36", "0.36"], ["9.9", "10.01", "9.09", "10.1"]],
};

/* ── decimals, place by place (the picture's route; names start with dc so they never meet the runtime's) ── */
const dcSplit = (s: any) => { const t = String(s ?? ""); const i = t.indexOf("."); return i < 0 ? { w: t, d: "" } : { w: t.slice(0, i), d: t.slice(i + 1) }; };
/* the digit at place p (0 = the whole number part, 1 tenths, 2 hundredths, 3 thousandths); an empty place reads 0 */
const dcPlace = (s: any, p: number) => { const { w, d } = dcSplit(s); return p === 0 ? parseInt(w || "0", 10) : d[p - 1] === undefined ? 0 : Number(d[p - 1]); };
/* the first place from the left where a and b differ, and the sign between them (a, then b) */
const dcFirstDiff = (a: any, b: any) => {
  for (let p = 0; p <= 3; p++) { const x = dcPlace(a, p), y = dcPlace(b, p); if (x !== y) return { p, sign: x > y ? ">" : "<" }; }
  return { p: -1, sign: "=" };
};
/* how many places Compare lights before it stops (equal decimals: every place either one has) */
const dcStop = (a: any, b: any) => { const f = dcFirstDiff(a, b); return f.p >= 0 ? f.p + 1 : 1 + Math.max(dcSplit(a).d.length, dcSplit(b).d.length); };
/* a typed decimal tidied: "5." -> "5", ".5" -> "0.5", "007" -> "7"; empty -> null */
const dcTidy = (s: any) => {
  const t = String(s ?? "");
  if (!t || t === ".") return null;
  const { w, d } = dcSplit(t);
  const ww = w.replace(/^0+(?=\d)/, "") || "0";
  return d ? ww + "." + d.slice(0, 3) : ww;
};
/* the tape: the stretch the two bars are drawn on, to scale */
const dcTape = (a: any, b: any) => {
  const wa = dcPlace(a, 0), wb = dcPlace(b, 0);
  if (wa === wb) return { lo: wa, hi: wa + 1, step: 0.1, tenths: true };
  const top = Math.max(wa, wb) + 1;
  const step = [1, 2, 5, 10, 20, 50, 100, 200, 500].find((s) => top / s <= 11) || 1000;
  return { lo: 0, hi: Math.ceil(top / step) * step, step, tenths: false };
};

const DC_SETS = MODEL.freeSets;
const DC_INK = { blue: shade(CONTENT.hundred, 0.25), amber: shade(CONTENT.ten, 0.42), green: shade(CONTENT.one, 0.3), violet: shade(CONTENT.bead, 0.35), grey: "#767676" };
/* a matching place fades, but never below 3.4:1 on white (large digits), so it still reads */
const dcLum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const dcFade = (hex: string) => { let t = 0.5; while (t > 0 && 1.05 / (dcLum(mix(hex, "#ffffff", t)) + 0.05) < 3.4) t -= 0.05; return mix(hex, "#ffffff", Math.max(t, 0)); };

/* the compare layout (working-area units) */
const DC_CV = { x: 16, w: 788, h: 80, yA: 40, yB: 130, point: 274, wholeR: 252 };
const dcColX = (p: number) => (p === 0 ? [16, 262] : [290 + (p - 1) * 170, 290 + p * 170]);
const dcColC = (p: number) => { const c = dcColX(p); return (c[0] + c[1]) / 2; };
/* the ladder layout: a staircase that rises for ascending and falls for descending */
const DC_LD = { cw: 192, ch: 84, gap: 76, floor: 524, wy: 24 };
const dcLadX = (N: number, k: number) => (1086 - (N * DC_LD.cw + (N - 1) * DC_LD.gap)) / 2 + k * (DC_LD.cw + DC_LD.gap);
const dcLadTop = (N: number, k: number, dir: string) => 500 - (dir === "asc" ? k : N - 1 - k) * 40;
const dcLadY = (N: number, k: number, dir: string) => dcLadTop(N, k, dir) - DC_LD.ch - 6;
const dcWaitX = (k: number) => 16 + k * (DC_LD.cw + 12);
const dcFresh = (it: any, q: string) => ({ q, walk: 0, like: false, rungs: it && it.cards ? it.cards.map(() => null) : [], dir: "asc",
  pairLit: {}, count: 0, fresh: true, demo: null, sign: false, toes: 0, nagged: false });

/* the line said when a question is won: one literal a question, so the voice can be baked */
const dcSayWin = (api: any, q: string) => {
  if (q === "M2.S4.T9.C40:DC1") api.say("15 is more than 8, so 15.2 is greater than 8.96.");
  else if (q === "M2.S4.T9.C40:1") api.say("21 is more than 19, so 21.05 is greater than 19.8.");
  else if (q === "M2.S4.T9.C40:8") api.say("30 beats 29. The digits after the point never mattered.");
  else if (q === "M2.S4.T9.C41:DC2") api.say("4 tenths beat 3 tenths, so 6.38 is less than 6.4.");
  else if (q === "M2.S4.T9.C41:2") api.say("3 hundredths beat 1 hundredth. 4.53 is greater than 4.51.");
  else if (q === "M2.S4.T9.C41:4") api.say("2.64 is greater than 2.6, so the first ribbon is longer.");
  else if (q === "M2.S4.T9.C42:DC3") api.say("7 tenths beat 6 tenths. 0.7 is greater than 0.625.");
  else if (q === "M2.S4.T9.C42:3") api.say("0.8 is greater than 0.79, even with fewer digits.");
  else if (q === "M2.S4.T9.C42:6") api.say("0.6 is greater than 0.587. Its bar is the longer one.");
  else if (q === "M2.S4.T9.C43:DC4") api.say("Greatest first: 3.9, then 3.09, then 3.009.");
  else if (q === "M2.S4.T9.C43:5") api.say("Smallest first: 0.56, then 5.06, then 5.6.");
  else if (q === "M2.S4.T9.C43:7") api.say("124 is the greatest, and 1.24 is the smallest.");
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a pick is the greater decimal, written with its zero in front ("0.7"; "0.70" names the same card and
   is taken, ".7" is not); an order is the ladder read left to right with its sign */
const judge = (item: any, v: any) => {
  const s = String(v ?? "").replace(/\s+/g, "");
  if (item.kind === "order") return s === item.answer;
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(s)) return false;
  return s === item.answer || Number(s) === Number(item.answer);
};
/* oracle: every answer re-derived by a second route (thousandths as whole numbers, then sorted) */
const dcScaled = (s: any) => { const m = /^(\d+)(?:\.(\d{1,3}))?$/.exec(String(s)); return m ? Number(m[1]) * 1000 + Number(((m[2] || "") + "000").slice(0, 3)) : NaN; };
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "order") {
    const s = it.cards.slice().sort((x: string, y: string) => (it.dir === "asc" ? dcScaled(x) - dcScaled(y) : dcScaled(y) - dcScaled(x)));
    return s.join(it.dir === "asc" ? "<" : ">") === it.answer;
  }
  return (dcScaled(it.a) > dcScaled(it.b) ? it.a : it.b) === it.answer;
}));
/* the most likely wrong answer (the misconception): the other card; the order read the wrong way */
const nearMiss = (item: any) => (item.kind === "order" ? item.near : item.answer === item.a ? item.b : item.a);
/* the forms of an answer no question, hint or ladder line may print: a pick names both cards in its own
   question, so what gives it away is the comparison written out, never the card alone */
const answerForms = (item: any) => {
  if (item.kind === "order") {
    const sg = item.answer.includes(">") ? ">" : "<", cs = item.answer.split(sg);
    return [cs.join(" " + sg + " "), item.answer, cs.join(", ")];
  }
  const lo = item.answer === item.a ? item.b : item.a;
  return [item.answer + " > " + lo, lo + " < " + item.answer, item.answer + " is greater", lo + " is less"];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the slot: a long ladder reading is shortened so it never spills out of the slot */
const format = (v: any) => {
  const s = String(v ?? "");
  if (!/[<>]/.test(s) || s.length <= 14) return s;
  const sg = s.includes(">") ? ">" : "<", cs = s.split(sg);
  return cs[0] + sg + "…" + sg + cs[cs.length - 1];
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): a decimal is typed through the tool (toolApi.answer would drop its point);
   a ladder is set as a child would set it */
const answer = (item: any, v: any) => (item.kind === "order" ? (HOOK.set ? HOOK.set(v) : false) : HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* a two-way control that says whether it is on (aria-pressed): the ladder's switch and Make like */
function DcToggle({ id, x, y, w, h, C, on, label, onPress, enabled = true, children }: any) {
  const p = usePress(onPress || (() => {}), enabled);
  const base = on ? shade(C.accent, 0.28) : shade(C.rule, 0.08);
  return (
    <g className={"c4-ctl" + (!enabled ? " is-off" : "") + (p.down ? " is-down" : "")} data-control={id} role="button"
      aria-label={label} aria-pressed={on ? "true" : "false"} aria-disabled={enabled ? undefined : "true"} tabIndex={enabled ? 0 : -1}
      {...(enabled ? p.bind() : {})} onKeyDown={p.keys}>
      {enabled && <rect x={x} y={y + EDGE} width={w} height={h} rx={RAD.key} fill={base} />}
      <g className="c4-body" style={{ transform: `translateY(${enabled && p.down ? EDGE : 0}px)` } as any}>
        <rect className="c4-face" x={x} y={y} width={w} height={h} rx={RAD.key}
          fill={!enabled ? tint(C.panel, 0.55) : on ? "url(#gAccent)" : "url(#gKey)"}
          stroke={!enabled ? tint(C.rule, 0.35) : on ? shade(C.accent, 0.18) : C.rule} strokeWidth={2} />
        {enabled && <path d={`M ${x + RAD.key} ${y + 3} H ${x + w - RAD.key}`} stroke="#FFFFFF" strokeOpacity={on ? 0.4 : 0.95} strokeWidth={3} strokeLinecap="round" />}
        <text x={x + w / 2} y={y + h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700}
          fill={!enabled ? mix(C.ink, C.panel, 0.5) : on ? "#FFFFFF" : C.ink}>{children}</text>
      </g>
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();   /* the traceback and the win */
  const tl2 = useTimeline();  /* phase 3: the longer decimal's bar slides back (the delight) */
  const free = stage === "free";
  const it: any = item || {};
  const pick = it.kind === "pick", order = it.kind === "order";
  const qKey = n + ":" + index;
  const busy = tl.busy;

  /* the question in hand; a new question starts a fresh board */
  const [S0, setS] = useState<any>(() => dcFresh(it, qKey));
  const SRef = useRef<any>(S0);
  const S = S0.q === qKey ? S0 : dcFresh(it, qKey);
  const cur = () => (SRef.current.q === qKey ? SRef.current : dcFresh(it, qKey));
  const put = (patch: any) => {
    const c = cur();
    const nx = { ...c, ...(typeof patch === "function" ? patch(c) : patch) };
    SRef.current = nx; setS(nx);
  };
  /* timed steps write only into the question they were started for */
  const putIf = (q: string) => (patch: any) => {
    if (SRef.current.q !== q) return;
    const c = SRef.current;
    const nx = { ...c, ...(typeof patch === "function" ? patch(c) : patch) };
    SRef.current = nx; setS(nx);
  };
  useEffect(() => {
    if (SRef.current.q === qKey) return;
    tl.stop(); tl2.stop();
    const f = dcFresh(it, qKey);
    SRef.current = f; setS(f);
  }, [qKey]);

  /* Free play: two cards to set on the pad, and four cards to order */
  const [F, setF] = useState<any>(() => ({ view: "compare", A: "0.5", B: "0.45", walk: 0, like: false, edit: null,
    set: 0, cards: DC_SETS[0].slice(), rungs: [null, null, null, null], dir: "asc", olike: false, pairLit: {}, count: 0 }));
  const FRef = useRef<any>(F);
  const putF = (patch: any) => {
    const nx = { ...FRef.current, ...(typeof patch === "function" ? patch(FRef.current) : patch) };
    FRef.current = nx; setF(nx);
  };

  /* ── phases 1-3: compare two cards ── */
  const doCompare = () => {
    if (free) {
      finishEdit(true);
      const f = FRef.current;
      if (f.walk >= dcStop(f.A, f.B)) return;
      putF({ walk: f.walk + 1 }); api.sfx.tick(); return;
    }
    if (busy || !(stage === "teach" || stage === "ask")) return;
    const s = cur();
    if (s.walk >= dcStop(it.a, it.b)) return;
    put({ walk: s.walk + 1, demo: null }); api.sfx.tick();
  };
  const doLike = () => {
    if (free) {
      finishEdit(true);
      if (FRef.current.view === "order") putF({ olike: !FRef.current.olike }); else putF({ like: !FRef.current.like });
      api.sfx.tick(); return;
    }
    if (busy || !(stage === "teach" || stage === "ask")) return;
    put({ like: !cur().like, demo: null }); api.sfx.tick();
  };
  /* a tap on a card puts that decimal in the slot; Enter answers */
  const tapCard = (k: string) => {
    if (free) { openEdit(k); return; }
    if (busy || stage !== "ask") return;
    api.setTyped(k === "A" ? it.a : it.b);
    put({ demo: null });
  };

  /* Free play: a tapped card holds the pad (digits and the point), Enter gives it back */
  const finishEdit = (release: boolean) => {
    const f = FRef.current, E = f.edit;
    if (!E) return;
    const v = dcTidy(E.buf);
    putF({ edit: null, walk: 0, [E.k]: v || f[E.k] });
    if (release) api.capture(null);
  };
  const editKey = (key: string) => {
    const f = FRef.current, E = f.edit;
    if (!E) return;
    if (key === "enter") { finishEdit(true); return; }
    let b = E.buf;
    if (key === "clear") b = "";
    else if (key === "back") b = b.slice(0, -1);
    else if (key === "point") { const s = E.fresh ? "" : b; if (!s.includes(".")) b = (s === "" ? "0" : s) + "."; }
    else if (/^\d$/.test(key)) {
      const s = E.fresh ? "" : b, sp = dcSplit(s);
      if (s.includes(".")) { if (sp.d.length < 3) b = s + key; }
      else if (sp.w.length < 3) b = (sp.w === "0" ? "" : sp.w) + key;
    } else return;
    putF({ edit: { ...E, buf: b, fresh: false }, walk: 0 });
  };
  const openEdit = (k: string) => {
    const f = FRef.current;
    if (f.edit && f.edit.k === k) return;
    const keep = f.edit ? { [f.edit.k]: dcTidy(f.edit.buf) || f[f.edit.k] } : {};
    putF({ ...keep, edit: { k, buf: f[k], fresh: true }, walk: 0 });
    api.capture(editKey);
  };
  /* the runtime took the pad back (restart, the summary): keep what was typed */
  useEffect(() => { if (!captured && FRef.current.edit) finishEdit(false); }, [captured]);

  /* ── phase 4: the ladder ── */
  const ladB = () => (free ? FRef.current : cur());
  const ladPut = (patch: any) => (free ? putF(patch) : put(patch));
  const ladCards: string[] = free ? F.cards : it.cards || [];
  const ladLive = free ? F.view === "order" : order && (stage === "teach" || stage === "ask") && !busy;
  const dragStart = useRef<any>(null); /* where the pointer took the card, so it moves with the finger */
  const drag = useDrag((pay: any, at: any, moved: boolean) => {
    if (!ladLive) return;
    const B = ladB(), cards = free ? B.cards : it.cards || [], N = cards.length;
    const rungs = B.rungs.slice(), k = pay.k, from = rungs.indexOf(k);
    let to: any = null;
    if (!moved || !isFinite(at.x) || !isFinite(at.y)) {
      /* a tap (or Enter / Space): a waiting card goes onto the first empty step, a placed card comes back */
      if (from >= 0) to = "wait"; else { const e = rungs.indexOf(null); to = e >= 0 ? e : null; }
    } else {
      for (let r = 0; r < N; r++) {
        const x = dcLadX(N, r), y = dcLadY(N, r, B.dir);
        if (at.x >= x - 30 && at.x <= x + DC_LD.cw + 30 && at.y >= y - 40 && at.y <= y + DC_LD.ch + 40) { to = r; break; }
      }
      if (to === null && at.y < 150) to = "wait";
    }
    if (to === null || to === from || (to === "wait" && from < 0)) return;
    if (to === "wait") rungs[from] = null;
    else { const occ = rungs[to]; if (from >= 0) rungs[from] = occ === undefined ? null : occ; rungs[to] = k; }
    ladPut({ rungs, pairLit: {}, fresh: true, demo: null });
    api.sfx.tick();
  });
  const setDir = (d: string) => {
    if (!ladLive) return;
    const B = ladB();
    if (B.dir === d) return;
    ladPut({ dir: d, rungs: B.rungs.slice().reverse(), pairLit: {}, fresh: true, demo: null });
    api.sfx.tick();
  };
  const comparePair = (r: number) => {
    if (!ladLive) return;
    const B = ladB(), cards = free ? B.cards : it.cards;
    const a = cards[B.rungs[r]], b = cards[B.rungs[r + 1]];
    if (a === undefined || b === undefined) return;
    const fd = dcFirstDiff(a, b);
    ladPut({ pairLit: { ...B.pairLit, [r]: fd.p }, count: B.count + dcStop(a, b), demo: null });
    api.sfx.tick();
  };
  const newCards = () => {
    const f = FRef.current, s = (f.set + 1) % DC_SETS.length;
    putF({ set: s, cards: DC_SETS[s].slice(), rungs: DC_SETS[s].map(() => null), pairLit: {}, count: 0 });
    api.sfx.tick();
  };
  const setView = (v: string) => { finishEdit(true); putF({ view: v }); api.sfx.tick(); };

  /* Enter on a ladder question: only a full ladder the child has changed since it was last judged */
  const enterOrder = () => {
    const L = cur();
    if (!L.fresh) return;
    if (L.rungs.some((r: any) => r === null)) {
      if (!L.nagged) { put({ nagged: true }); api.say("Put every card on a step first."); }
      return;
    }
    put({ fresh: false });
    api.submit(L.rungs.map((k: number) => it.cards[k]).join(L.dir === "asc" ? "<" : ">"));
  };
  api.onEnter(!free && order ? enterOrder : null);

  /* the agent's hands */
  HOOK.type = (v: any) => { api.setTyped(String(v ?? "")); return true; };
  HOOK.set = (v: any) => {
    if (!order) return false;
    const s = String(v ?? "").replace(/\s+/g, ""), sg = s.includes(">") ? ">" : s.includes("<") ? "<" : "";
    if (!sg) return false;
    const parts = s.split(sg), used: any = {};
    if (parts.length !== it.cards.length) return false;
    const rungs = parts.map((p: string) => { const k = it.cards.findIndex((c: string, j: number) => c === p && !used[j]); if (k >= 0) used[k] = true; return k; });
    if (rungs.some((k: number) => k < 0)) return false;
    put({ rungs, dir: sg === ">" ? "desc" : "asc", fresh: true, demo: null, pairLit: {} });
    return true;
  };

  /* the traceback: redraw the comparison from the left, ending on the whole right answer (a demo layer) */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const P = putIf(qKey);
    api.lock(true);
    if (pick) {
      const stop = dcStop(it.a, it.b);
      const steps: any[] = [[420, () => P({ walk: 0, demo: null, sign: false })]];
      for (let w = 1; w <= stop; w++) steps.push([650, () => P({ walk: w })]);
      steps.push([700, () => P({ demo: { greater: true } })]);
      tl.run(steps, () => api.lock(false));
    } else if (order) {
      tl.run([
        [300, () => P({ demo: { dir: true } })],
        [800, () => P((s: any) => ({ demo: { ...(s.demo || {}), pairs: true } }))],
        [800, () => P((s: any) => ({ demo: { ...(s.demo || {}), rung: true } }))],
        [700, () => P((s: any) => ({ demo: { ...(s.demo || {}), reading: true } }))],
      ], () => api.lock(false));
    } else api.lock(false);
  }, [wrong]);

  /* the win: Compare finishes its walk, the bars stand to scale, the sign is written */
  useEffect(() => {
    if (stage !== "win" || free) return;
    const P = putIf(qKey);
    P({ demo: null });
    if (pick) {
      const stop = dcStop(it.a, it.b), from = SRef.current.q === qKey ? SRef.current.walk : 0;
      const steps: any[] = [];
      for (let w = from + 1; w <= stop; w++) steps.push([380, () => P({ walk: w })]);
      steps.push([200, () => P({ sign: true })]);
      tl.run(steps);
    } else P({ sign: true });
    dcSayWin(api, it.qid);
  }, [stage]);

  /* phase 3: when the place decides, the longer decimal's bar first stands on its toes, then slides back */
  const decided = !free && pick && S.walk >= dcStop(it.a, it.b);
  useEffect(() => {
    if (!decided || n !== 3 || reducedMotion()) return;
    const P = putIf(qKey);
    tl2.run([[650, () => P({ toes: 1 })], [70, () => P({ toes: 0.8 })], [70, () => P({ toes: 0.6 })], [70, () => P({ toes: 0.4 })],
      [70, () => P({ toes: 0.2 })], [0, () => P({ toes: 0 })]]);
  }, [decided, qKey]);

  /* the child's next act clears the correction's demo layer */
  const lastTyped = useRef(typed);
  useEffect(() => {
    if (lastTyped.current === typed) return;
    lastTyped.current = typed;
    if (!free && stage === "ask" && !busy && SRef.current.demo) put({ demo: null });
  }, [typed]);

  /* ── drawing ── */
  const label = (x: number, y: number, s: string, o: any = {}) => (
    <text x={x} y={y} textAnchor={o.anchor || "middle"} fontSize={o.size || T.micro} fontWeight={o.weight || 500} fill={o.fill || C.ink}>{s}</text>
  );
  const keyText = (s: string, on: boolean) => <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={on ? C.ink : mix(C.ink, C.panel, 0.5)}>{s}</text>;

  /* two cards over a place strip, the sign between them, the tape with its bars, and the right panel */
  const cmpView = (o: any) => {
    const sA = o.editK === "A" ? o.editBuf : o.A, sB = o.editK === "B" ? o.editBuf : o.B;
    const fd = dcFirstDiff(o.A, o.B), stop = dcStop(o.A, o.B), dec = o.walk >= stop;
    const maxD = Math.max(dcSplit(sA).d.length, dcSplit(sB).d.length);
    const minD = Math.min(dcSplit(sA).d.length, dcSplit(sB).d.length);
    const st = (p: number) => (p >= o.walk ? "" : dec && fd.p === p ? "dec" : "same");
    const paint = (c: string, p: number) => (st(p) === "dec" ? DC_INK.amber : st(p) === "same" ? dcFade(c) : c);
    const card = (s: string, y: number, which: string) => {
      const { w, d } = dcSplit(s), pt = s.includes(".");
      const out: any[] = [];
      out.push(
        <text key={which + "w"} x={DC_CV.wholeR} y={y + 60} textAnchor="end" fontSize={T.xl} fontWeight={700}>
          {w.split("").map((ch: string, j: number) => <tspan key={j} fill={paint(ch === "0" && w !== "0" ? DC_INK.grey : DC_INK.blue, 0)}>{ch}</tspan>)}
        </text>
      );
      if (pt || d) out.push(<circle key={which + "pt"} cx={DC_CV.point} cy={y + 56} r={7} fill={C.ink} />);
      else if (o.like && maxD > 0) out.push(<circle key={which + "pt"} cx={DC_CV.point} cy={y + 56} r={7} fill={DC_INK.violet} />);
      for (let p = 1; p <= 3; p++) {
        const ch = d[p - 1];
        if (ch !== undefined) out.push(<text key={which + p} x={dcColC(p)} y={y + 60} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={paint(ch === "0" ? DC_INK.grey : DC_INK.blue, p)}>{ch}</text>);
        else if (o.like && p <= maxD) out.push(<text key={which + p} x={dcColC(p)} y={y + 60} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={paint(DC_INK.violet, p)}>0</text>);
      }
      if (o.editK === which) {
        const cx = pt ? dcColX(Math.min(d.length + 1, 3))[0] + (d.length >= 3 ? 150 : 22) : DC_CV.wholeR + 6;
        out.push(<rect key={which + "caret"} className="c4-caret" x={cx} y={y + 16} width={4} height={50} rx={2} fill={C.accent} />);
      }
      return out;
    };
    const tp = dcTape(o.A, o.B);
    const X = (v: number) => 16 + Math.min(Math.max((v - tp.lo) / (tp.hi - tp.lo), 0), 1) * 788;
    const ticks: any[] = [];
    if (tp.tenths) {
      for (let k = 0; k <= 100; k++) {
        const x = 16 + (k / 100) * 788, major = k % 10 === 0;
        ticks.push(<line key={"t" + k} x1={x} y1={424} x2={x} y2={major ? 442 : 432} stroke={C.ink} strokeWidth={major ? 2.5 : 1} />);
        if (major) ticks.push(<g key={"l" + k}>{label(x, 470, k === 0 ? String(tp.lo) : k === 100 ? String(tp.lo + 1) : tp.lo + "." + k / 10)}</g>);
      }
    } else {
      const nT = Math.round(tp.hi / tp.step);
      for (let k = 0; k <= nT; k++) {
        const v = k * tp.step, x = X(v);
        ticks.push(<line key={"t" + k} x1={x} y1={424} x2={x} y2={442} stroke={C.ink} strokeWidth={2.5} />);
        ticks.push(<g key={"l" + k}>{label(x, 470, v >= 1000 ? indian(v) : String(v))}</g>);
      }
    }
    const longer = dcSplit(o.A).d.length > dcSplit(o.B).d.length ? "A" : dcSplit(o.B).d.length > dcSplit(o.A).d.length ? "B" : "";
    const bar = (s: string, y: number, which: string) => {
      let len = X(Number(s)) - 16;
      if (o.toes && which === longer) len = len + (788 - len) * o.toes;
      const inside = len >= 110;
      return (
        <g key={"bar" + which}>
          <rect x={16} y={y} width={Math.max(len, 3)} height={34} rx={8} fill={CONTENT.hundred} />
          {inside ? label(30, y + 26, s, { anchor: "start", weight: 700, fill: "#FFFFFF" }) : label(16 + len + 12, y + 26, s, { anchor: "start", weight: 700, fill: DC_INK.blue })}
        </g>
      );
    };
    const outline = (which: string, colour: string, wdt: number) => {
      const y = which === "A" ? DC_CV.yA : DC_CV.yB;
      return <rect key={"ol" + which + colour} x={12} y={y - 4} width={796} height={DC_CV.h + 8} rx={20} fill="none" stroke={colour} strokeWidth={wdt} pointerEvents="none" />;
    };
    const signOn = o.sign && fd.sign;
    return (
      <g>
        {/* the place strip */}
        {MODEL.places.map((pl: string, p: number) => (
          <g key={"pl" + p}>{label(dcColC(p), 28, tx(pl), { fill: st(p) === "dec" ? DC_INK.amber : C.ink, weight: st(p) === "dec" ? 700 : 500 })}</g>
        ))}
        {/* the two cards */}
        {[["A", DC_CV.yA], ["B", DC_CV.yB]].map(([w, y]: any) => (
          <rect key={"card" + w} x={DC_CV.x} y={y} width={DC_CV.w} height={DC_CV.h} rx={16} fill="#FFFFFF"
            stroke={o.editK === w ? C.accent : C.rule} strokeWidth={o.editK === w ? 4 : 2} filter="url(#fShadowSoft)" />
        ))}
        {dec && fd.p >= 0 && (
          <rect x={dcColX(fd.p)[0]} y={34} width={dcColX(fd.p)[1] - dcColX(fd.p)[0]} height={182} rx={12}
            fill={tint(CONTENT.ten, 0.78)} stroke={CONTENT.ten} strokeWidth={3} />
        )}
        {card(sA, DC_CV.yA, "A")}
        {card(sB, DC_CV.yB, "B")}
        {o.picked && o.picked !== o.greater && outline(o.picked, C.accent, 4)}
        {o.greater && outline(o.greater, DC_INK.green, 5)}
        {dec && fd.p >= 0 && label(dcColC(fd.p), 246, tx("Decides"), { fill: DC_INK.amber, weight: 700 })}
        {/* the sign between the two decimals: empty until the answer (or the correction) writes it */}
        <text x={352} y={304} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={DC_INK.blue}>{o.A}</text>
        <rect x={372} y={256} width={64} height={64} rx={14} fill="#FFFFFF" stroke={signOn ? DC_INK.green : C.rule} strokeWidth={signOn ? 4 : 2.5} strokeDasharray={signOn ? undefined : "8 7"} />
        {signOn && <text x={404} y={303} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={DC_INK.green}>{fd.sign}</text>}
        <text x={456} y={304} textAnchor="start" fontSize={T.xl} fontWeight={700} fill={DC_INK.blue}>{o.B}</text>
        {/* the tape, with the bars to scale once a place has decided */}
        <line x1={16} y1={424} x2={804} y2={424} stroke={C.ink} strokeWidth={3} />
        {ticks}
        {o.bars && bar(o.A, 334, "A")}
        {o.bars && bar(o.B, 376, "B")}
        {/* the right panel; the card taps come after Compare in the tab order */}
        <Key id="compare" label="Compare" x={836} y={40} w={240} h={80} C={C} disabled={!o.compareOn} onClick={doCompare}>
          {/* an arrow: Compare walks from the left */}
          <path d="M -104 0 H -66 M -80 -13 L -66 0 L -80 13" fill="none" stroke={o.compareOn ? C.ink : mix(C.ink, C.panel, 0.5)} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          <text x={26} y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={o.compareOn ? C.ink : mix(C.ink, C.panel, 0.5)}>{tx("Compare")}</text>
        </Key>
        {o.cardsOn && <Hit id="card-a" x={DC_CV.x} y={DC_CV.yA} w={DC_CV.w} h={DC_CV.h} onPress={() => tapCard("A")} label={"card " + o.A} enabled={!(captured && o.editK === "A")} />}
        {o.cardsOn && <Hit id="card-b" x={DC_CV.x} y={DC_CV.yB} w={DC_CV.w} h={DC_CV.h} onPress={() => tapCard("B")} label={"card " + o.B} enabled={!(captured && o.editK === "B")} />}
        <DcToggle id="make-like" x={836} y={130} w={240} h={80} C={C} on={o.like} enabled={o.likeOn} label="Make like" onPress={doLike}>{tx("Make like")}</DcToggle>
        {o.like && maxD > minD && label(956, 248, tx("added zero"), { fill: DC_INK.violet, weight: 600 })}
        {o.extra}
        {o.invite && <Invite x={871} y={80} r={34} C={C} />}
      </g>
    );
  };

  /* the staircase ladder: cards wait in a row, go onto the steps, a sign between every pair */
  const ladView = (o: any) => {
    const cards: string[] = o.cards, N = cards.length, rungs: any[] = o.rungs;
    const maxD = Math.max(...cards.map((c: string) => dcSplit(c).d.length));
    const full = rungs.every((r: any) => r !== null);
    const sg = o.dir === "asc" ? "<" : ">";
    /* the places lit amber on each card (the pair compares, and the correction's pairs) */
    const lit: any = {};
    const light = (r: number, p: number) => { if (p < 0) return; [rungs[r], rungs[r + 1]].forEach((k: any) => { if (k !== null) (lit[k] = lit[k] || {})[p] = true; }); };
    Object.keys(o.pairLit || {}).forEach((r: any) => light(Number(r), o.pairLit[r]));
    if (o.demoPairs) for (let r = 0; r + 1 < N; r++) if (rungs[r] !== null && rungs[r + 1] !== null) light(r, dcFirstDiff(cards[rungs[r]], cards[rungs[r + 1]]).p);
    const face = (k: number) => {
      const s = cards[k], { w, d } = dcSplit(s), L = lit[k] || {};
      const bits: any[] = [];
      const col = (c: string, p: number) => (L[p] ? DC_INK.amber : c);
      w.split("").forEach((ch: string, j: number) => bits.push(<tspan key={"w" + j} fill={col(ch === "0" && w !== "0" ? DC_INK.grey : DC_INK.blue, 0)}>{ch}</tspan>));
      if (d) bits.push(<tspan key="pt" fill={C.ink}>.</tspan>);
      else if (o.like && maxD > 0) bits.push(<tspan key="pt" fill={DC_INK.violet}>.</tspan>);
      d.split("").forEach((ch: string, j: number) => bits.push(<tspan key={"d" + j} fill={col(ch === "0" ? DC_INK.grey : DC_INK.blue, j + 1)}>{ch}</tspan>));
      if (o.like) for (let j = d.length; j < maxD; j++) bits.push(<tspan key={"z" + j} fill={col(DC_INK.violet, j + 1)}>0</tspan>);
      return bits;
    };
    const home = (k: number) => {
      const r = rungs.indexOf(k);
      return r >= 0 ? { x: dcLadX(N, r), y: dcLadY(N, r, o.dir) } : { x: dcWaitX(k), y: DC_LD.wy };
    };
    const dg = drag.drag;
    const dragK = o.live && dg && dg.payload ? dg.payload.k : -1;
    const startRef = dragStart.current;
    if (dragK >= 0 && (!startRef || startRef.k !== dragK)) dragStart.current = { k: dragK, x: dg.x, y: dg.y };
    if (dragK < 0) dragStart.current = null;
    const orderK = cards.map((_: any, k: number) => k).filter((k: number) => k !== dragK).concat(dragK >= 0 ? [dragK] : []);
    const cardEl = (k: number) => {
      const h = home(k);
      let x = h.x, y = h.y;
      const lifted = k === dragK && dragStart.current;
      if (lifted) { x += dg.x - dragStart.current.x; y += dg.y - dragStart.current.y; }
      const pay = { k };
      const keys = (e: any) => {
        if (e.key === "Enter" && full && !free) return; /* a full ladder: Enter goes on to answer (PATTERNS §5b) */
        if (e.key !== "Enter" && e.key !== " ") return;
        drag.keys(pay).onKeyDown(e);
        pointerBlur();
      };
      const liveProps = o.live ? { ...control("dcard-" + (k + 1), "card " + cards[k]), ...drag.bind(pay), onKeyDown: keys } : {};
      return (
        <g key={"dc" + k} {...liveProps} transform={`translate(${x},${y})`} style={o.live ? ({ cursor: "grab" } as any) : undefined}>
          <rect x={0} y={0} width={DC_LD.cw} height={DC_LD.ch} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2}
            filter={lifted ? "url(#fLift)" : "url(#fShadowSoft)"} />
          <text x={DC_LD.cw / 2} y={DC_LD.ch / 2 + 15} textAnchor="middle" fontSize={T.speech} fontWeight={700}>{face(k)}</text>
        </g>
      );
    };
    const signCx = (r: number) => dcLadX(N, r) + DC_LD.cw + DC_LD.gap / 2;
    const signCy = (r: number) => (dcLadY(N, r, o.dir) + dcLadY(N, r + 1, o.dir)) / 2 + DC_LD.ch / 2;
    const askedR = o.askedDir === "asc" ? 0 : N - 1;
    const readingOf = (s: string) => {
      const g = s.includes(">") ? ">" : "<", cs = s.split(g), out: any[] = [];
      /* the gaps are dx, not spaces: the reading is one label, not a sentence */
      cs.forEach((c: string, j: number) => {
        if (j) out.push(<tspan key={"s" + j} dx={18} fill={DC_INK.green}>{g}</tspan>);
        out.push(<tspan key={"c" + j} dx={j ? 18 : 0} fill={DC_INK.blue}>{c}</tspan>);
      });
      return out;
    };
    return (
      <g>
        {/* the steps */}
        {cards.map((_: any, r: number) => {
          const x = dcLadX(N, r) - DC_LD.gap / 2, top = dcLadTop(N, r, o.dir);
          return <rect key={"st" + r} x={x} y={top} width={DC_LD.cw + DC_LD.gap} height={DC_LD.floor - top} fill={tint(C.panel, 0.25)} stroke={C.rule} strokeWidth={2} />;
        })}
        {cards.map((_: any, r: number) => (rungs[r] === null || rungs[r] === dragK) && (
          <rect key={"slot" + r} x={dcLadX(N, r)} y={dcLadY(N, r, o.dir)} width={DC_LD.cw} height={DC_LD.ch} rx={14} fill="#FFFFFF" fillOpacity={0.6}
            stroke={C.rule} strokeWidth={2.5} strokeDasharray="10 8" />
        ))}
        {/* a sign between every pair; it waits until both cards are there */}
        {cards.slice(1).map((_: any, r: number) => {
          const both = rungs[r] !== null && rungs[r + 1] !== null, cx = signCx(r), cy = signCy(r);
          return (
            <g key={"sg" + r}>
              <circle cx={cx} cy={cy} r={30} fill="#FFFFFF" stroke={both && o.sign ? DC_INK.green : C.rule} strokeWidth={both && o.sign ? 4 : 2.5} strokeDasharray={both ? undefined : "7 6"} />
              {both && <text x={cx} y={cy + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={o.sign ? DC_INK.green : C.ink}>{sg}</text>}
            </g>
          );
        })}
        {/* the cards (the one being dragged is drawn last, on top) */}
        {orderK.map((k: number) => cardEl(k))}
        {/* a tap on a sign compares that pair, place by place */}
        {o.live && cards.slice(1).map((_: any, r: number) => (rungs[r] !== null && rungs[r + 1] !== null && dragK < 0) && (
          <Hit key={"ph" + r} id={"pair-" + (r + 1)} x={signCx(r) - 36} y={signCy(r) - 36} w={72} h={72} onPress={() => comparePair(r)} label="compare this pair" />
        ))}
        {/* the switch and Make like */}
        <DcToggle id="dir-asc" x={836} y={16} w={240} h={80} C={C} on={o.dir === "asc"} enabled={o.live} label="Ascending" onPress={() => setDir("asc")}>{tx("Ascending")}</DcToggle>
        <DcToggle id="dir-desc" x={836} y={104} w={240} h={80} C={C} on={o.dir === "desc"} enabled={o.live} label="Descending" onPress={() => setDir("desc")}>{tx("Descending")}</DcToggle>
        <DcToggle id="make-like" x={836} y={192} w={240} h={80} C={C} on={o.like} enabled={o.live} label="Make like" onPress={doLike}>{tx("Make like")}</DcToggle>
        {o.extra}
        {/* the reading, written once it is right (the win, or the end of a correction) */}
        {o.reading && <text x={418} y={170} textAnchor="middle" fontSize={T.xl} fontWeight={700}>{readingOf(o.reading)}</text>}
        {o.demoDir && <rect x={828} y={(o.askedDir === "asc" ? 16 : 104) - 8} width={256} height={96} rx={24} fill="none" stroke={CONTENT.ten} strokeWidth={5} pointerEvents="none" />}
        {o.demoRung && <rect x={dcLadX(N, askedR) - 8} y={dcLadY(N, askedR, o.dir) - 8} width={DC_LD.cw + 16} height={DC_LD.ch + 16} rx={20} fill="none" stroke={CONTENT.ten} strokeWidth={5} pointerEvents="none" />}
        {o.invite && <Invite x={dcWaitX(0) + DC_LD.cw / 2} y={DC_LD.wy + DC_LD.ch / 2} r={60} C={C} />}
      </g>
    );
  };

  /* what the host and the agent read back (toolApi.getState); no answer is shared before it is given */
  let view: any = null, count = 0;
  if (free) {
    if (F.view === "compare") {
      const stop = dcStop(F.A, F.B), dec = F.walk >= stop, fd = dcFirstDiff(F.A, F.B);
      count = F.walk;
      view = cmpView({ A: F.A, B: F.B, walk: F.walk, like: F.like, picked: null, greater: dec && fd.p >= 0 ? (fd.sign === ">" ? "A" : "B") : null,
        sign: dec, bars: dec, toes: 0, editK: F.edit ? F.edit.k : null, editBuf: F.edit ? F.edit.buf : "",
        cardsOn: true, compareOn: F.walk < stop || !!F.edit, likeOn: true, invite: false,
        extra: <Key id="view-order" label="Order four" x={836} y={440} w={240} h={80} C={C} onClick={() => setView("order")}>{keyText(tx("Order four"), true)}</Key> });
      api.share({ mode: "free", view: "compare", cards: [F.A, F.B], compared: F.walk, like: F.like });
    } else {
      count = F.count;
      view = ladView({ cards: F.cards, rungs: F.rungs, dir: F.dir, like: F.olike, pairLit: F.pairLit, live: true, sign: false, free: true,
        extra: (
          <g>
            <Key id="new-cards" label="New cards" x={16} y={124} w={220} h={80} C={C} onClick={newCards}>{keyText(tx("New cards"), true)}</Key>
            <Key id="view-compare" label="Compare two" x={252} y={124} w={240} h={80} C={C} onClick={() => setView("compare")}>{keyText(tx("Compare two"), true)}</Key>
          </g>
        ) });
      api.share({ mode: "free", view: "order", cards: F.cards, ladder: F.rungs.map((k: any) => (k === null ? null : F.cards[k])), direction: F.dir, compared: F.count });
    }
  } else if (pick) {
    const stop = dcStop(it.a, it.b), done = stage === "win" || stage === "idle";
    const greaterK = it.answer === it.a ? "A" : "B";
    const showGreater = S.sign || done || !!(S.demo && S.demo.greater);
    const tv = String(typed ?? "");
    const pickedK = tv && /^(0|[1-9]\d*)(\.\d+)?$/.test(tv) ? (Number(tv) === Number(it.a) ? "A" : Number(tv) === Number(it.b) ? "B" : null) : null;
    const live = (stage === "teach" || stage === "ask") && !busy;
    count = S.walk;
    view = cmpView({ A: it.a, B: it.b, walk: S.walk, like: S.like, picked: done ? null : pickedK, greater: showGreater ? greaterK : null,
      sign: showGreater && (S.sign || !!(S.demo && S.demo.greater)), bars: S.walk >= stop, toes: S.toes, editK: null, editBuf: "",
      cardsOn: stage === "ask" && !busy, compareOn: live && S.walk < stop, likeOn: live, invite: live && S.walk === 0 && !pickedK && !wrong });
    api.share({ cards: [it.a, it.b], compared: S.walk, decides: S.walk >= stop ? MODEL.places[dcFirstDiff(it.a, it.b).p] || null : null, like: S.like, picked: pickedK ? (pickedK === "A" ? it.a : it.b) : null });
  } else if (order) {
    const done = stage === "win" || stage === "idle";
    const live = (stage === "teach" || stage === "ask") && !busy;
    const N = it.cards.length;
    /* the win draws the right ladder (the child's own, when the child built it) */
    const ansDir = it.dir, sgA = ansDir === "asc" ? "<" : ">";
    const ansRungs = it.answer.split(sgA).map((c: string) => it.cards.indexOf(c));
    const showRungs = done ? ansRungs : S.rungs, showDir = done ? ansDir : S.dir;
    const demo = S.demo || {};
    count = S.count;
    view = ladView({ cards: it.cards, rungs: showRungs, dir: showDir, like: S.like, pairLit: done ? {} : S.pairLit, live, sign: done || S.sign,
      askedDir: ansDir, demoDir: !!demo.dir, demoRung: !!demo.rung, demoPairs: !!demo.pairs,
      reading: done || S.sign || demo.reading ? it.answer : null, invite: live && S.rungs.every((r: any) => r === null) && N > 0 && !wrong });
    api.share({ cards: it.cards, ladder: S.rungs.map((k: any) => (k === null ? null : it.cards[k])), direction: S.dir, like: S.like, compared: S.count });
  }

  return (
    <g>
      {/* the running count: places compared so far, counting from the left (never a score) */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={20} y={-46} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("Places compared")}</text>
        <text x={310} y={-42} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{count}</text>
      </g>
      {/* the traceback's layers never take a press (pointerEvents none on every illustration-only rect) */}
      {view}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const ph: any = PHASES[(n || 1) - 1];
  const it: any = ph && ph.items[last.item];
  if (!it) return null;
  let l1: any[] = [], l2: any[] = [];
  const num = (s: string, k: string) => <tspan key={k} fill={DC_INK.blue}>{s}</tspan>;
  const sgn = (s: string, k: string) => <tspan key={k} fill={DC_INK.green}>{s}</tspan>;
  if (it.kind === "order") {
    const g = it.answer.includes(">") ? ">" : "<", cs = it.answer.split(g), half = Math.ceil(cs.length / 2);
    cs.forEach((c: string, j: number) => {
      const line = j < half ? l1 : l2;
      if (j && j !== half) line.push(sgn(" " + g + " ", "s" + j));
      line.push(num(c, "c" + j));
      if (j === half - 1) l1.push(sgn(" " + g, "e" + j));
    });
  } else {
    const fd = dcFirstDiff(it.a, it.b);
    l1 = [num(it.a, "a")];
    l2 = [sgn(fd.sign + " ", "s"), num(it.b, "b")];
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w - 16} y={34} textAnchor="end" fontSize={T.micro} fontWeight={700}>{l1}</text>
      <text x={w - 16} y={h - 12} textAnchor="end" fontSize={T.micro} fontWeight={700}>{l2}</text>
    </g>
  );
}

function DecimalComparer(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, pointKey: true, winMs: 4000, fitHost: () => null }} />
  );
}

export default DecimalComparer;
