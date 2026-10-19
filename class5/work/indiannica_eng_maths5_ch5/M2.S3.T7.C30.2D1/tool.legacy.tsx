/* ═══ M2.S3.T7.C30.2D1 · expanded_form · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   docs/PATTERNS.md holds every pattern used here (choices, the point key, SLOT_FRACTION, the lent pad).
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "expanded_form";
const MEDIA_ID = "M2.S3.T7.C30.2D1";
const TOOL_NAME = "Expanded Form Splitter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["One decimal, ready to be split three ways."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Three forms, one number, and it went back together.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Split any decimal, or build one back.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = { hi: {}, gu: {} };

/* ── the place strip: six columns, hundreds to thousandths, the point between ones and tenths ── */
const EF_L = 56, EF_CW = 166, EF_GAP = 26;                 /* a lead for "is" / "=", the column width, the point's gap */
const efX = (c: number) => EF_L + c * EF_CW + (c >= 3 ? EF_GAP : 0);
const efC = (c: number) => efX(c) + EF_CW / 2;
const EF_PT = efX(3) - EF_GAP / 2;                          /* the decimal point */
const efPlus = (c: number) => (c === 2 ? EF_PT : efX(c) + EF_CW); /* the + after a part in column c */
const EF_PLACES = ["hundreds", "tens", "ones", "tenths", "hundredths", "thousandths"];
const EF_ONE = ["hundred", "ten", "one", "tenth", "hundredth", "thousandth"];
const EF_BLUE = CONTENT.hundred, EF_GREEN = CONTENT.one, EF_AMBER = CONTENT.ten, EF_GREY = "#767676";
const EF_TILE_Y = 8, EF_TILE_W = 120, EF_TILE_H = 100, EF_STRIP_Y = 112, EF_TRAY_Y = 316;
const EF_CSS = "@keyframes efDrop{from{transform:translateY(-110px);opacity:.3}to{transform:none;opacity:1}}"
  + ".ef-drop{animation:efDrop 420ms ease-out both}@media (prefers-reduced-motion:reduce){.ef-drop{animation:none}}";

function efChoices(ids: string[]) { return ids.map((id) => ({ id, label: id })); }
/* a decimal's digits by column (0 hundreds .. 5 thousandths); null where the number has no digit */
function efCols(dec: any): any[] {
  const out: any[] = [null, null, null, null, null, null];
  const [w = "", f = ""] = String(dec || "").split(".");
  const ws = w.slice(-3);
  for (let i = 0; i < ws.length; i++) out[3 - ws.length + i] = +ws[i];
  for (let i = 0; i < Math.min(3, f.length); i++) out[3 + i] = +f[i];
  return out;
}
const efParts = (dec: any) => efCols(dec).map((d: any, c: number) => ({ c, d })).filter((p: any) => p.d !== null && p.d !== 0);
const efZeros = (dec: any) => efCols(dec).map((d: any, c: number) => (d === 0 ? c : -1)).filter((c: number) => c >= 0);
const efWorth = (c: number, d: number) => (c <= 2 ? String(d * Math.pow(10, 2 - c)) : "0." + "0".repeat(c - 3) + d);
const efName = (c: number, d: number) => (d === 1 ? EF_ONE[c] : EF_PLACES[c]);
const efFracOf = (c: number, d: number) => [d, Math.pow(10, c - 2)];
const efTh = (s: any) => { const v = parseFloat(String(s)); return isFinite(v) ? Math.round(v * 1000) : NaN; };
function efFmt(th: number) {
  const w = Math.floor(th / 1000), f = th % 1000;
  const ws = w >= 1000 ? indian(w) : String(w);
  return f ? ws + "." + String(f).padStart(3, "0").replace(/0+$/, "") : ws;
}
/* the sum of a row the child joined ("5 + 2 + 3 + 8" -> 18000 thousandths), or null */
function efSumRow(row: any) {
  const segs = String(row || "").split("+").map((s) => s.trim());
  if (!segs.length || segs.some((s) => !/^\d*\.?\d+$/.test(s))) return null;
  return segs.reduce((t, s) => t + efTh(s), 0);
}
/* a given part of an expanded form (400, 0.4, 4/1000) -> the one digit it puts in the strip, and where */
function efPlaceOf(g: any) {
  const th = g.n !== undefined ? g.n * 1000 : g.d !== undefined ? efTh(g.d) : Math.round((g.f[0] * 1000) / g.f[1]);
  /* label: the part as it is written ("400", "0.4", "4/1000" for the record; the tray draws a fraction stacked) */
  const label = g.f ? g.f[0] + "/" + g.f[1] : g.d !== undefined ? String(g.d) : String(g.n);
  for (let c = 0; c < 6; c++) {
    const p = Math.pow(10, 5 - c);
    if (th % p === 0 && th / p >= 1 && th / p <= 9) return { f: g.f, label, c, d: th / p };
  }
  return { f: g.f, label, c: -1, d: 0 };
}
/* a decimal's parts the way the book builds it back: whole places as numbers, the rest as fractions */
const efStdParts = (dec: any) => efParts(dec).map((p: any) => (p.c <= 2 ? { n: p.d * Math.pow(10, 2 - p.c) } : { f: efFracOf(p.c, p.d) }));
/* the standard form read off a strip of digits (null = an empty place): a 0 in every empty place between
   digits, and in the ones place when the number starts after the point */
function efReading(ds: any[]) {
  const on = ds.map((d: any, c: number) => (d !== null && d !== undefined ? c : -1)).filter((c: number) => c >= 0);
  if (!on.length) return { text: "", zeros: [] as number[] };
  const hi = Math.min(on[0], 2), lo = Math.max(on[on.length - 1], 2);
  let text = "";
  const zeros: number[] = [];
  for (let c = hi; c <= lo; c++) {
    if (c === 3) text += ".";
    const d = ds[c];
    if (d === null || d === undefined) { text += "0"; zeros.push(c); } else text += d;
  }
  return { text, zeros };
}
/* in phase 1 the strip hides the asked place and every place beyond it on the same side of the point */
const efHidden = (c0: number) => (c0 >= 3 ? [3, 4, 5].filter((c) => c >= c0) : [0, 1, 2].filter((c) => c <= c0));

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase, the third tests whether the phase landed. Tool fields: dec (the decimal on the
           tiles), col (the asked column, 0 hundreds .. 5 thousandths), given (phase 4's parts), near (the
           item's misconception, which judge must reject) */
const PHASES = [
  {
    n: 1,
    concept: "Place value form",
    conceptId: "M2.S3.T7.C30", objectiveIds: ["O11"],
    says: ["Each digit takes its place name with it. Tap Split to slide them down."],
    ladder: ["Count the places from the point, one by one.", "Places get ten times smaller to the right of the point."],
    closing: "a decimal is written by its places: so many ones, tenths and hundredths",
    learned: "You learned: a decimal is so many ones, tenths and hundredths.",
    traceback: "The hidden place names light up from the point outward, and the asked part's name is written into the row.",
    items: [
      /* learn EF1: answer in the plan = 9.47 is 9 ones + 4 tenths + 7 hundredths (the row shows it; the 7 is asked) */
      { qid: "M2.S3.T7.C30:EF1", kind: "pv", dec: "9.47", col: 4, choices: efChoices(["ones", "tenths", "hundredths", "thousandths"]),
        say: "Write 9.47 in place value form. The 7 is 7 what?", ask: "The 7 in 9.47 is 7 what?", answer: "hundredths", near: "tenths",
        miss: "The 4 already has the place after the point. Where is the 7?" },
      /* practice 1: answer in the plan = 2.56 is 2 ones + 5 tenths + 6 hundredths (the 5 is asked) */
      { qid: "M2.S3.T7.C30:1", kind: "pv", dec: "2.56", col: 3, choices: efChoices(["tens", "ones", "tenths", "hundredths"]),
        say: "Now 2.56. Name the place of its 5.", ask: "The 5 in 2.56 is 5 what?", answer: "tenths", near: "tens",
        miss: "The 5 is after the point, and those place names end in ths." },
      /* practice 5: answer in the plan = 60.35 is 6 tens + 3 tenths + 5 hundredths. The 0 ones add nothing, so they can be left out (the 6 is asked) */
      { qid: "M2.S3.T7.C30:5", kind: "pv", dec: "60.35", col: 1, choices: efChoices(["hundreds", "tens", "ones", "tenths"]),
        say: "In 60.35, which place does the 6 stand in?", ask: "The 6 in 60.35 is 6 what?", answer: "tens", near: "ones",
        miss: "The 0 holds the ones place. The 6 is one place to its left." },
    ],
  },
  {
    n: 2,
    concept: "Decimal form",
    conceptId: "M2.S3.T7.C31", objectiveIds: ["O11"],
    says: ["What is each digit worth? Type it into each part, then tap Join to add them up."],
    ladder: ["Write the worth of the tenths digit.", "A tenths digit has one place after the point, like 0.6 for a 6."],
    closing: "a decimal is the sum of what each of its digits is worth, written as decimals",
    learned: "You learned: a decimal is the sum of what its digits are worth.",
    traceback: "Each part is redrawn with its worth, sliding down from its tile, and the right row adds back up to the number.",
    items: [
      /* learn EF2: answer in the plan = 52.38 = 50 + 2 + 0.3 + 0.08 */
      { qid: "M2.S3.T7.C31:EF2", kind: "dec", dec: "52.38", pad: "enter", winMs: 2600,
        say: "Write 52.38 in decimal form.", ask: "Type each worth then tap Join", answer: "50 + 2 + 0.3 + 0.08", near: "5 + 2 + 3 + 8",
        miss: "The 5 stands in the tens place. It is worth more than 5." },
      /* practice 2: answer in the plan = 3.19 = 3 + 0.1 + 0.09 */
      { qid: "M2.S3.T7.C31:2", kind: "dec", dec: "3.19", pad: "enter", winMs: 2300,
        say: "Now 3.19. Give each of its digits a worth.", ask: "Type each worth then tap Join", answer: "3 + 0.1 + 0.09", near: "3 + 1 + 9",
        miss: "How many places after the point is the 9? Its worth needs that many." },
      /* practice 6: answer in the plan = 107.908 = 100 + 7 + 0.9 + 0.008 */
      { qid: "M2.S3.T7.C31:6", kind: "dec", dec: "107.908", pad: "enter", winMs: 2600,
        say: "Split 107.908 and write what each part is worth.", ask: "Type each worth then tap Join", answer: "100 + 7 + 0.9 + 0.008", near: "1 + 7 + 9 + 8",
        miss: "The 8 is in the thousandths place. What is it worth?" },
    ],
  },
  {
    n: 3,
    concept: "Fractional form",
    conceptId: "M2.S3.T7.C32", objectiveIds: ["O11"],
    says: ["Now each part becomes a fraction. Tap Split and watch the zero."],
    ladder: ["Count the places from the point to the digit, zeros too.", "Each place further from the point puts one more zero in the denominator."],
    closing: "each place after the point is a fraction over 10, 100 or 1000, and a zero digit adds nothing",
    learned: "You learned: places after the point are over 10, 100 and 1000.",
    traceback: "Each place after the point lights with its denominator, the zero holding its place, and the asked part is written as its fraction.",
    items: [
      /* learn EF3: answer in the plan = 5.803 = 5 + 8/10 + 3/1000 (the 3, after the zero, is asked) */
      { qid: "M2.S3.T7.C32:EF3", kind: "frac", dec: "5.803", col: 5, parts: SLOT_FRACTION, winMs: 2200,
        say: "Write 5.803 in fractional form. What fraction does the 3 make?", ask: "The 3 of 5.803 as a fraction?", answer: [3, 1000], near: [3, 100],
        miss: "The zero holds the hundredths place. Which place is the 3 in?" },
      /* practice 4: answer in the plan = 1.84 = 1 + 8/10 + 4/100 (the 4 is asked) */
      { qid: "M2.S3.T7.C32:4", kind: "frac", dec: "1.84", col: 4, parts: SLOT_FRACTION, winMs: 2200,
        say: "Now 1.84, with no zero. Which fraction is its 4?", ask: "The 4 of 1.84 as a fraction?", answer: [4, 100], near: [4, 10],
        miss: "The 4 is two places after the point. Name that place first." },
      /* practice 8: answer in the plan = 20.013 = 20 + 1/100 + 3/1000 (the 1, after the zero, is asked) */
      { qid: "M2.S3.T7.C32:8", kind: "frac", dec: "20.013", col: 4, parts: SLOT_FRACTION, winMs: 2200,
        say: "Split 20.013. Write its 1 as a fraction.", ask: "The 1 of 20.013 as a fraction?", answer: [1, 100], near: [1, 10],
        miss: "The zero still holds the tenths place, so count it." },
    ],
  },
  {
    n: 4,
    concept: "Back to standard form",
    conceptId: "M2.S3.T7.C33", objectiveIds: ["O12"],
    says: ["Drag each part to its place on the strip. What goes where nothing is?"],
    ladder: ["Read the strip from the left, one digit a place.", "An empty place between two digits still needs a digit to hold it."],
    closing: "an expanded form goes back to standard form with a 0 in every missing place",
    learned: "You learned: going back, a missing place gets a 0.",
    traceback: "Every part slides to the place it names, each empty place between digits takes a grey 0, and the number is read in green.",
    items: [
      /* learn EF4: answer in the plan = 406.104 */
      { qid: "M2.S3.T7.C33:EF4", kind: "std", given: [{ n: 400 }, { n: 6 }, { f: [1, 10] }, { f: [4, 1000] }], winMs: 2600,
        say: "Write 400 + 6 + 1/10 + 4/1000 in standard form.", ask: "Standard form?", answer: "406.104", near: "406.14",
        miss: "The 4 thousandths sits three places after the point." },
      /* practice 3: answer in the plan = 8.42 */
      { qid: "M2.S3.T7.C33:3", kind: "std", given: [{ n: 8 }, { d: "0.4" }, { d: "0.02" }], winMs: 2200,
        say: "Now 8 + 0.4 + 0.02. Which number is that?", ask: "Standard form?", answer: "8.42", near: "8.402",
        miss: "Each part has one digit. Where does each one land?" },
      /* practice 7: answer in the plan = 53.081. There are no tenths, so a 0 goes in the tenths place */
      { qid: "M2.S3.T7.C33:7", kind: "std", given: [{ n: 50 }, { n: 3 }, { f: [8, 100] }, { f: [1, 1000] }], winMs: 2600,
        say: "Build 50 + 3 + 8/100 + 1/1000, then type the number.", ask: "Standard form?", answer: "53.081", near: "53.81",
        miss: "There are no tenths. What holds that place open?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { places: EF_PLACES, columns: 6, wholePlaces: 3, decimalPlaces: 3, strip: { lead: EF_L, column: EF_CW, pointGap: EF_GAP },
  rows: ["Place value form", "Decimal form", "Fractional form"], tray: "phase 4 and Free play: the parts of an expanded form" };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a place name, a row of worths and a standard form compare as written; a fraction by its two parts */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  return String(v ?? "").replace(/\s+/g, " ").trim() === String(item.answer);
};
/* oracle: every answer re-derived by arithmetic on the number, sharing no code with judge or Work */
const efOracleOne = (it: any) => {
  const thOf = (s: string) => Number(s.replace(".", "")) * Math.pow(10, 3 - (s.split(".")[1] || "").length);
  if (it.kind === "std") {
    let th = 0;
    it.given.forEach((g: any) => { th += g.n !== undefined ? g.n * 1000 : g.d !== undefined ? thOf(g.d) : (g.f[0] * 1000) / g.f[1]; });
    const w = Math.floor(th / 1000), f = th % 1000;
    return (f ? w + "." + String(f).padStart(3, "0").replace(/0+$/, "") : String(w)) === it.answer && it.near !== it.answer;
  }
  const th = thOf(it.dec), place = [100000, 10000, 1000, 100, 10, 1];
  const dig = place.map((p) => Math.floor(th / p) % 10);
  const asked = /^The (\d) /.exec(String(it.ask));
  if (it.kind === "pv") {
    const byPower: any = { 2: "hundreds", 1: "tens", 0: "ones", "-1": "tenths", "-2": "hundredths", "-3": "thousandths" };
    return byPower[2 - it.col] === it.answer && !!asked && +asked[1] === dig[it.col];
  }
  if (it.kind === "dec") {
    const worths = dig.map((d, k) => (d ? String((d * place[k]) / 1000) : "")).filter(Boolean);
    return worths.join(" + ") === it.answer && dig.reduce((t, d, k) => t + d * place[k], 0) === th;
  }
  if (it.kind === "frac") return !!asked && +asked[1] === dig[it.col] && it.answer[0] === dig[it.col] && it.answer[1] === 1000 / place[it.col];
  return false;
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => efOracleOne(it)));
/* the item's misconception (judge must reject it) */
const nearMiss = (item: any) => (item.parts ? item.near.join("|") : item.near);
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.parts) { const f = item.answer[0] + "/" + item.answer[1]; return [f, speakable(f)]; }
  if (item.kind === "std") return [String(item.answer), speakable(String(item.answer))];
  return [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent's answer(): a row of worths is set into the parts, a decimal is typed with its point (toolApi.answer
   strips the point); a choice and a fraction go the runtime's own way */
const answer = (item: any, v: any) => {
  if (item.choices || item.parts) return undefined;
  if (item.pad === "enter") return HOOK.set ? HOOK.set(v) : false;
  return HOOK.type ? HOOK.type(v) : undefined;
};
/* the agent's check() before Enter: undefined = press Enter */
const check = () => undefined;
/* what the slot shows: a row joined on the working area stays there; a decimal shows at most three places */
const format = (v: any, j: any) => {
  const s = String(v ?? "");
  if (s.includes("+")) return "";
  return j === undefined ? s.replace(/^(\d*\.\d{3})\d+$/, "$1") : s;
};

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const kind = free ? "free" : item.kind;
  const solved = !free && (stage === "win" || stage === "idle");
  const asking = stage === "ask";
  const live = asking || stage === "teach";
  const quiet = mix(C.ink, "#FFFFFF", 0.3);
  const blueInk = shade(EF_BLUE, 0.25), greenInk = shade(EF_GREEN, 0.25), amberInk = shade(EF_AMBER, 0.4);

  /* the child's state, fresh for each question and for Free play */
  const sk = free ? "free" : "q" + index;
  const fresh = (): any => ({ sk, split: false, cells: {}, open: -1, stale: {}, judged: null, total: null, demo: null,
    placed: {}, pick: -1, lit: 0, fdec: "6.83", fmode: "set", ftyping: null });
  const [raw, setRaw] = useState<any>(null);
  const S = raw && raw.sk === sk ? raw : fresh();
  const ref = useRef<any>(S);
  ref.current = S;
  const busy = useRef(false);
  busy.current = tl.busy;
  const put = (o: any) => setRaw((r: any) => { const b = r && r.sk === sk ? r : fresh(); return { ...b, ...(typeof o === "function" ? o(b) : o) }; });
  /* a child's own act: refused while a correction runs, and it wipes the correction's layer */
  const act = (o: any) => {
    if (busy.current) return false;
    put((b: any) => ({ ...(typeof o === "function" ? o(b) : o), demo: null }));
    return true;
  };

  const dec = free ? (S.ftyping !== null ? S.ftyping : S.fdec) : kind === "std" ? "" : item.dec;
  const cols = efCols(dec);
  const parts = efParts(dec);
  const zeroCols = efZeros(dec);
  const building = kind === "std" || (free && S.fmode === "build");
  const gparts = kind === "std" ? item.given.map(efPlaceOf) : free ? efStdParts(S.fdec).map(efPlaceOf) : [];
  const lit = stage === "idle" ? 99 : S.lit;
  const demo = S.demo || {};

  /* the parts slide down by themselves when the question opens; Split only brings them early */
  useEffect(() => {
    if (asking && !free && kind !== "std" && !ref.current.split) put({ split: true });
  }, [stage, index]);

  /* a right answer: the row lights green part by part (phase 2), or the empty places take their zeros (phase 4) */
  useEffect(() => {
    if (stage !== "win" || free) return;
    const steps: any[] = [];
    const count = kind === "dec" ? parts.length : kind === "std" ? efReading(efOwnDigits(gparts)).zeros.length : 0;
    for (let j = 1; j <= count; j++) steps.push([320, () => { put({ lit: j }); api.sfx.tick(); }]);
    steps.push([200, () => put({ lit: 99 })]);
    tl.run(steps);
  }, [stage, index]);

  /* the traceback: redraws the maths in steps and ends on the whole right answer, on a layer of its own */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    const steps: any[] = [];
    if (kind === "pv") {
      const c0 = item.col, nb = c0 >= 3 ? c0 - 1 : c0 + 1;
      steps.push([700, () => put({ split: true, demo: { hl: nb, reveal: [] } })]);
      steps.push([800, () => put({ demo: { hl: c0, reveal: [c0] } })]);
      steps.push([400, () => put({ demo: { hl: c0, reveal: efHidden(c0), fill: true } })]);
    } else if (kind === "dec") {
      const stale: any = {};
      parts.forEach((p: any) => { stale[p.c] = true; });
      steps.push([500, () => put({ split: true, open: -1, stale, total: String(wrong.value), demo: { upTo: 0, hl: -1 } })]);
      parts.forEach((p: any, j: number) => steps.push([600, () => put({ demo: { upTo: j + 1, hl: p.c } })]));
      steps.push([300, () => put({ demo: { upTo: parts.length, hl: -1, sum: true } })]);
    } else if (kind === "frac") {
      const dcs = [3, 4, 5].filter((c) => cols[c] !== null);
      steps.push([300, () => put({ split: true, demo: { den: [], hl: -1 } })]);
      dcs.forEach((c, k) => steps.push([650, () => put({ demo: { den: dcs.slice(0, k + 1), hl: c } })]));
      steps.push([400, () => put({ demo: { den: dcs, hl: item.col, fill: true } })]);
    } else if (kind === "std") {
      steps.push([300, () => put({ pick: -1, demo: { zeros: 0 } })]);
      gparts.forEach((g: any, j: number) => steps.push([450, () => {
        put((b: any) => { const pl: any = { ...b.placed }; Object.keys(pl).forEach((k) => { if (pl[k] === j) delete pl[k]; }); pl[g.c] = j; return { placed: pl }; });
        api.sfx.tick();
      }]));
      const zs = efReading(efOwnDigits(gparts)).zeros;
      zs.forEach((c: number, k: number) => steps.push([500, () => { put({ demo: { zeros: k + 1 } }); api.sfx.tick(); }]));
      steps.push([300, () => put({ demo: { zeros: zs.length, read: true } })]);
    }
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* a typed decimal keeps at most three places (PATTERNS §12) */
  useEffect(() => {
    if (kind === "std" && asking && /^\d*\.\d{4,}$/.test(String(typed || ""))) api.setTyped(String(typed).replace(/^(\d*\.\d{3})\d+$/, "$1"));
  }, [typed]);

  /* ── phase 2: the lent pad types a worth into the part the child tapped ── */
  const filled = (v: any) => /\d/.test(String(v || ""));
  const join = () => {
    const s = ref.current;
    if (busy.current || stage !== "ask") return;
    const empty = parts.find((p: any) => !filled(s.cells[p.c]));
    if (empty) { put({ split: true, open: empty.c }); api.capture(cellKey); return; }
    const row = parts.map((p: any) => s.cells[p.c]).join(" + ");
    api.capture(null);
    if (row === s.judged) { put({ open: -1 }); return; }
    put({ open: -1, judged: row, total: row, demo: null });
    api.submit(row);
  };
  const nextCell = () => {
    const s = ref.current, order = parts.map((p: any) => p.c), at = order.indexOf(s.open);
    const rest = [...order.slice(at + 1), ...order.slice(0, at + 1)];
    const nx = rest.find((c: number) => !filled(s.cells[c]));
    if (nx === undefined) join(); else put({ open: nx });
  };
  const cellKey = (k: string) => {
    const s = ref.current, c = s.open;
    if (c < 0 || busy.current) return;
    if (k === "enter") { nextCell(); return; }
    const cur = s.cells[c] || "", stale = !!s.stale[c];
    let v = cur;
    if (/^\d$/.test(k)) v = stale ? k : cur + k;
    else if (k === "point") v = stale ? "." : cur.includes(".") ? cur : cur + ".";
    else if (k === "back") v = cur.slice(0, -1);
    else if (k === "clear") v = "";
    if (!/^\d{0,3}(\.\d{0,3})?$/.test(v)) return;   /* at most three digits on each side of the point */
    act({ cells: { ...s.cells, [c]: v }, stale: { ...s.stale, [c]: false }, total: null });
  };
  const openCell = (c: number) => {
    if (!asking || busy.current) return;
    if (!act({ split: true, open: c })) return;
    api.capture(cellKey);
  };
  api.onEnter(kind === "dec" && asking ? () => join() : null);

  /* ── phase 4 and Free play's Build: a part is dragged to a column, or picked up and put on a column ── */
  const canBuild = !solved && ((kind === "std" && live) || (free && S.fmode === "build" && S.ftyping === null));
  const place = (j: number, c: number) => {
    const ok = act((b: any) => { const pl: any = { ...b.placed }; Object.keys(pl).forEach((k) => { if (pl[k] === j) delete pl[k]; }); pl[c] = j; return { placed: pl, pick: -1 }; });
    if (ok) api.sfx.tick();
  };
  const colAt = (at: any) => {
    if (!at || !isFinite(at.x) || !isFinite(at.y) || at.y < -20 || at.y > 178) return -1;
    for (let c = 0; c < 6; c++) {
      const left = efX(c) - (c === 3 ? EF_GAP / 2 : 0), right = efX(c) + EF_CW + (c === 2 ? EF_GAP / 2 : 0);
      if (at.x >= left && at.x < right) return c;
    }
    return -1;
  };
  const drag = useDrag((pay: any, at: any, moved: boolean) => {
    if (!pay || pay.t !== "part" || !canBuild) return;
    if (!moved || !at || !isFinite(at.x)) { act((b: any) => ({ pick: b.pick === pay.j ? -1 : pay.j })); return; }  /* a tap picks it up */
    const c = colAt(at);
    if (c < 0) { act({ pick: -1 }); return; }   /* dropped off the strip: it goes back to the tray */
    place(pay.j, c);
  });
  const colPress = (c: number) => {
    const s = ref.current;
    if (!canBuild || busy.current) return;
    if (s.pick >= 0) { place(s.pick, c); return; }
    if (s.placed[c] !== undefined && act((b: any) => { const pl: any = { ...b.placed }; delete pl[c]; return { placed: pl }; })) api.sfx.tick();
  };

  /* ── Free play: a new decimal on the lent pad, then Split it or Build it back ── */
  const endTyping = () => {
    const s = ref.current;
    api.capture(null);
    if (s.ftyping === null) return;
    const v = s.ftyping || "", [w = "", f = ""] = v.split(".");
    const d = (w.replace(/^0+(?=\d)/, "") || "0") + (f ? "." + f : "");
    put(/[1-9]/.test(v) ? { ftyping: null, fdec: d, placed: {}, pick: -1 } : { ftyping: null });
  };
  const freeKey = (k: string) => {
    const s = ref.current;
    if (s.ftyping === null) return;
    if (k === "enter") { endTyping(); return; }
    let v = s.ftyping;
    const [w = "", f] = v.split(".");
    if (/^\d$/.test(k)) { if (f !== undefined) { if (f.length < 3) v += k; } else if (w === "0") v = k; else if (w.length < 3) v += k; }
    else if (k === "point") { if (!v.includes(".")) v = (v || "0") + "."; }
    else if (k === "back") v = v.slice(0, -1);
    else if (k === "clear") v = "";
    put({ ftyping: v });
  };
  useEffect(() => { if (free && !captured && ref.current.ftyping !== null) endTyping(); }, [captured]);
  const newDecimal = () => {
    if (ref.current.ftyping !== null) { endTyping(); return; }
    put({ ftyping: "", pick: -1 });
    api.capture(freeKey);
  };
  const freeMode = (m: string) => { if (ref.current.ftyping !== null) endTyping(); put({ fmode: m, placed: {}, pick: -1 }); };

  /* the agent sets a row of worths as a child would; a decimal is typed with its point */
  HOOK.set = (v: any) => {
    if (kind !== "dec") return false;
    const segs = String(v ?? "").split("+").map((s) => s.trim());
    const cells: any = {};
    parts.forEach((p: any, j: number) => { cells[p.c] = segs[j] || ""; });
    put({ split: true, cells, stale: {}, open: -1, demo: null, total: null });
    return true;
  };
  HOOK.type = (v: any) => { api.setTyped(String(v ?? "")); return true; };

  /* what the host and the agent read back (toolApi.getState): only what the child has given */
  const placedIdx = Object.keys(S.placed).map((k) => S.placed[k]);
  api.share({
    decimal: kind === "std" ? null : dec, split: !!S.split, mode: free ? S.fmode : null,
    rows: kind === "dec" ? parts.map((p: any) => S.cells[p.c] || "") : null,
    zeros: kind === "std" ? null : zeroCols.map((c: number) => EF_PLACES[c]),
    tray: building ? gparts.filter((g: any, j: number) => !placedIdx.includes(j)).map(efLabel) : null,
    placed: building ? Object.keys(S.placed).map((c) => ({ place: EF_PLACES[+c], part: efLabel(gparts[S.placed[c]]) })) : null,
    answer: kind === "dec" ? (parts.every((p: any) => filled(S.cells[p.c])) ? parts.map((p: any) => S.cells[p.c]).join(" + ") : null) : null,
  });

  /* ── drawing (helpers are called, never mounted) ── */
  const txt = (x: number, y: number, s: any, size: number, fill: string, o: any = {}) => (
    <text x={x} y={y} textAnchor={o.anchor || "middle"} fontSize={size} fontWeight={o.weight || 600} fill={fill} letterSpacing={o.ls}>{s}</text>
  );
  const pulse = (x: number, y: number, w: number, h: number) => (
    <rect className="c4-pulse" x={x} y={y} width={w} height={h} rx={RAD.key + 6} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
  );
  const tiles = (ds: any[], o: any = {}) => (
    <g>
      {ds.map((d: any, c: number) => {
        const x = efC(c) - EF_TILE_W / 2;
        if (d === null || d === undefined)
          return <rect key={"e" + c} x={x} y={EF_TILE_Y} width={EF_TILE_W} height={EF_TILE_H} rx={RAD.piece}
            fill={o.target ? "#FFFFFF" : "none"} stroke={o.pickOn ? EF_AMBER : o.target ? C.rule : tint(C.rule, 0.2)}
            strokeWidth={o.pickOn ? 4 : 2.5} strokeDasharray={o.target && !o.pickOn ? undefined : "8 8"} />;
        const zero = d === 0, on = o.lit ? o.lit(c) : false, ring = zero && o.amberZero;
        return (
          <g key={"t" + c} filter="url(#fShadowSoft)">
            <rect x={x} y={EF_TILE_Y} width={EF_TILE_W} height={EF_TILE_H} rx={RAD.piece}
              fill={zero ? EF_GREY : on ? shade(EF_GREEN, 0.2) : EF_BLUE} stroke={ring ? EF_AMBER : shade(zero ? EF_GREY : on ? EF_GREEN : EF_BLUE, 0.3)} strokeWidth={ring ? 6 : 2} />
            {txt(efC(c), EF_TILE_Y + 76, d, T.display, "#FFFFFF", { weight: 700 })}
          </g>
        );
      })}
      <circle cx={EF_PT} cy={EF_TILE_Y + 84} r={10} fill={C.ink} />
    </g>
  );
  const strip = (o: any = {}) => (
    <g>
      <rect x={efX(0) - 4} y={EF_STRIP_Y} width={efX(5) + EF_CW - efX(0) + 8} height={44} rx={12} fill={tint(C.panel, 0.35)} stroke={C.rule} strokeWidth={2} />
      {EF_PLACES.map((nm, c) => {
        const hide = o.hide ? o.hide(c) : false;
        return (
          <g key={c}>
            {o.hl === c && <rect x={efX(c) + 6} y={EF_STRIP_Y + 3} width={EF_CW - 12} height={38} rx={10} fill={tint(EF_AMBER, 0.45)} stroke={EF_AMBER} strokeWidth={3} />}
            {hide ? (o.ask === c ? txt(efC(c), EF_STRIP_Y + 33, "?", T.label, amberInk, { weight: 700 }) : null)
              : txt(efC(c), EF_STRIP_Y + 32, tx(nm), T.micro, C.ink, { ls: -1 })}
          </g>
        );
      })}
    </g>
  );
  const plus = (x: number, y: number, k: string) => <g key={k}>{txt(x, y, "+", T.label, C.ink)}</g>;
  const zeroPart = (c: number, y: number, k: string) => (
    <g key={k} className="ef-drop">
      <rect x={efC(c) - 48} y={y - 50} width={96} height={64} rx={12} fill={EF_GREY} fillOpacity={0.1} />
      {txt(efC(c), y, "0", T.xl, EF_GREY, { weight: 700 })}
      {txt(efC(c), y + 42, tx("adds nothing"), T.micro, EF_GREY, { ls: -1, weight: 500 })}
    </g>
  );
  const formLabel = (s: string, y = 192) => txt(0, y, tx(s), T.micro, quiet, { anchor: "start" });
  const stacked = (cx: number, top: number, a: any, b: any, ink: string, size = T.prompt) => (
    <g>
      {txt(cx, top + size * 0.95, a, size, ink, { weight: 700 })}
      <rect x={cx - 56} y={top + size * 1.2} width={112} height={5} rx={2.5} fill={ink} />
      {txt(cx, top + size * 2.45, b, size, ink, { weight: 700 })}
    </g>
  );
  const keyText = (s: string) => txt(0, 11, tx(s), T.label, C.ink, { weight: 700 });
  const runs = (count: number) => (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      {txt(24, -45, tx("parts"), T.label, C.ink, { anchor: "start" })}
      {txt(306, -35, count, T.xl, C.ink, { anchor: "end", weight: 700 })}
    </g>
  );

  /* phase 1: the place value form; the asked part's name is a ? in the row and on the strip */
  const pvRow = () => {
    const c0 = item.col, hid = efHidden(c0);
    const shown = (c: number) => solved || !hid.includes(c) || (demo.reveal && demo.reveal.includes(c));
    return (
      <g>
        {txt(efSignX(cols), 254, tx("is"), T.label, C.ink)}
        {parts.map((p: any, j: number) => {
          const ask = p.c === c0, done = solved || (ask && demo.fill);
          return (
            <g key={"p" + p.c} className="ef-drop" style={{ animationDelay: j * 120 + "ms" } as any}>
              {txt(efC(p.c), 262, p.d, T.xl, solved ? greenInk : C.ink, { weight: 700 })}
              <rect x={efC(p.c) - 75} y={274} width={150} height={46} rx={10} fill="#FFFFFF"
                stroke={ask && !done ? EF_AMBER : done && ask ? EF_GREEN : C.rule} strokeWidth={ask ? 4 : 2} />
              {ask && !done ? txt(efC(p.c), 308, "?", T.label, amberInk, { weight: 700 })
                : (shown(p.c) || done) && txt(efC(p.c), 306, tx(efName(p.c, p.d)), T.micro, done ? greenInk : C.ink, { ls: -1 })}
              {j < parts.length - 1 && plus(efPlus(p.c), 254, "+" + p.c)}
            </g>
          );
        })}
        {zeroCols.map((c: number) => zeroPart(c, 292, "z" + c))}
      </g>
    );
  };

  /* phase 2: the decimal form; the child types each part's worth, Join adds the row back up */
  const decRow = () => {
    const sum = S.total ? efSumRow(S.total) : null;
    return (
      <g>
        {txt(efSignX(cols), 262, "=", T.label, C.ink)}
        {parts.map((p: any, j: number) => {
          const v = solved ? efWorth(p.c, p.d) : S.cells[p.c] || "";
          const open = asking && captured && S.open === p.c, on = solved && lit > j;
          const tw = String(v).length * T.prompt * 0.58;
          return (
            <g key={"p" + p.c} className="ef-drop" style={{ animationDelay: j * 120 + "ms" } as any}>
              <rect x={efC(p.c) - 64} y={214} width={128} height={76} rx={12} fill={on ? tint(EF_GREEN, 0.85) : "#FFFFFF"}
                stroke={open ? C.accent : on ? EF_GREEN : C.rule} strokeWidth={open ? 4 : 2.5} />
              {txt(efC(p.c), 266, v, T.prompt, on ? greenInk : C.ink, { weight: 700 })}
              {open && <rect className="c4-caret" x={efC(p.c) + tw / 2 + 4} y={232} width={4} height={40} rx={2} fill={C.accent} />}
              {asking && <Hit id={"cell-" + (j + 1)} x={efC(p.c) - 64} y={214} w={128} h={76} onPress={() => openCell(p.c)}
                label={"worth of the " + EF_ONE[p.c] + "s digit"} enabled={!open} />}
              {j < parts.length - 1 && plus(efPlus(p.c), 262, "+" + p.c)}
            </g>
          );
        })}
        {zeroCols.map((c: number) => zeroPart(c, 300, "z" + c))}
        {solved && lit >= 99 && txt(8, 336, "= " + dec, T.label, greenInk, { anchor: "start", weight: 700 })}
        {!solved && sum !== null && txt(8, 336, "= " + efFmt(sum), T.label, C.ink, { anchor: "start", weight: 700 })}
        {/* the correction: each part's worth slides down under the child's own row, then adds back up */}
        {!solved && demo.upTo !== undefined && (
          <g pointerEvents="none">
            {txt(efSignX(cols), 404, "=", T.label, greenInk)}
            {parts.slice(0, demo.upTo).map((p: any, j: number) => (
              <g key={"d" + p.c} className="ef-drop">
                <rect x={efC(p.c) - 64} y={356} width={128} height={76} rx={12} fill={tint(EF_GREEN, 0.85)} stroke={EF_GREEN} strokeWidth={2.5} />
                {txt(efC(p.c), 408, efWorth(p.c, p.d), T.prompt, greenInk, { weight: 700 })}
                {j < demo.upTo - 1 && plus(efPlus(p.c), 404, "d+" + p.c)}
              </g>
            ))}
            {demo.sum && txt(8, 476, "= " + dec, T.label, greenInk, { anchor: "start", weight: 700 })}
          </g>
        )}
      </g>
    );
  };

  /* phase 3: the fractional form; the asked part is a ? until the slot answers it */
  const fracRow = () => {
    const wcols = [0, 1, 2].filter((c) => cols[c] !== null);
    const whole = parseInt(String(dec).split(".")[0] || "0", 10);
    const wx = wcols.length ? (efC(wcols[0]) + efC(2)) / 2 : efC(2);
    const fps = parts.filter((p: any) => p.c >= 3), fz = zeroCols.filter((c: number) => c >= 3);
    return (
      <g>
        {txt(efSignX(cols), 262, "=", T.label, C.ink)}
        {whole > 0 && <g className="ef-drop">{txt(wx, 286, whole, T.xl, C.ink, { weight: 700 })}</g>}
        {whole > 0 && fps.length > 0 && plus(EF_PT, 262, "w+")}
        {fps.map((p: any, j: number) => {
          const [a, b] = efFracOf(p.c, p.d), ask = p.c === item.col, later = p.c > item.col;
          const done = solved || (ask && demo.fill);
          return (
            <g key={"f" + p.c} className="ef-drop" style={{ animationDelay: (j + 1) * 120 + "ms" } as any}>
              {ask && !done ? (
                <g>
                  <rect x={efC(p.c) - 60} y={214} width={120} height={112} rx={12} fill="#FFFFFF" stroke={EF_AMBER} strokeWidth={4} />
                  {txt(efC(p.c), 290, "?", T.xl, amberInk, { weight: 700 })}
                </g>
              ) : later && !solved ? (
                <rect x={efC(p.c) - 60} y={214} width={120} height={112} rx={12} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="8 8" />
              ) : stacked(efC(p.c), 220, a, b, ask ? greenInk : C.ink)}
              {j < fps.length - 1 && plus(efPlus(p.c), 262, "+" + p.c)}
            </g>
          );
        })}
        {fz.map((c: number) => zeroPart(c, 296, "z" + c))}
        {/* the correction: every place after the point shows its denominator, the zero's place too */}
        {!solved && demo.den && (
          <g pointerEvents="none">
            {demo.den.map((c: number) => (
              <g key={"n" + c}>
                <rect x={efC(c) - 40} y={368} width={80} height={4} rx={2} fill={C.ink} />
                {txt(efC(c), 406, Math.pow(10, c - 2), T.label, C.ink, { weight: 700 })}
              </g>
            ))}
          </g>
        )}
      </g>
    );
  };

  /* phases 1-3 and Free play's first screen: the decimal on its tiles, over the strip */
  const splitView = () => {
    const hid = kind === "pv" ? efHidden(item.col) : [];
    const hideName = (c: number) => kind === "pv" && !solved && hid.includes(c) && !(demo.reveal && demo.reveal.includes(c));
    const hl = demo.hl !== undefined && !solved ? demo.hl : -1;
    const litTile = (c: number) => kind === "dec" && solved && parts.findIndex((p: any) => p.c === c) < lit && parts.some((p: any) => p.c === c);
    return (
      <g>
        {tiles(cols, { amberZero: kind === "frac", lit: litTile })}
        {strip({ hide: hideName, ask: kind === "pv" ? item.col : -1, hl })}
        {formLabel(kind === "pv" ? "Place value form" : kind === "dec" ? "Decimal form" : "Fractional form")}
        {(S.split || solved) && (kind === "pv" ? pvRow() : kind === "dec" ? decRow() : fracRow())}
        {!S.split && !solved && (
          <g>
            <Key id="split" x={858} y={432} w={220} h={80} C={C} onClick={() => { if (live) act({ split: true }); }} label="Split">{keyText("Split")}</Key>
            {live && pulse(850, 424, 236, 96)}
          </g>
        )}
        {S.split && asking && kind === "dec" && (
          <Key id="join" x={858} y={432} w={220} h={80} C={C} onClick={join} label="Join">{keyText("Join")}</Key>
        )}
        {kind === "dec" && asking && S.split && !wrong && S.open < 0 && !parts.some((p: any) => filled(S.cells[p.c])) && parts[0]
          && pulse(efC(parts[0].c) - 72, 206, 144, 92)}
      </g>
    );
  };

  /* phase 4 and Free play's Build: the parts go back onto an empty strip */
  const buildView = () => {
    const own = efOwnDigits(gparts);
    const ds: any[] = [null, null, null, null, null, null];
    if (solved) gparts.forEach((g: any) => { ds[g.c] = g.d; });
    else Object.keys(S.placed).forEach((c) => { const g = gparts[S.placed[c]]; if (g) ds[+c] = g.d; });
    const reading = efReading(solved ? own : ds);
    const allIn = !solved && gparts.length > 0 && gparts.every((g: any, j: number) => placedIdx.includes(j));
    const zn = solved ? (lit >= 99 ? 99 : lit) : demo.zeros !== undefined ? demo.zeros : free && allIn ? 99 : 0;
    const zcols = reading.zeros.slice(0, zn);
    const read = solved ? lit >= 99 : demo.read || (free && allIn);
    const np = gparts.length, cw = 140, gap = 18, left = (W.w - (np * cw + (np - 1) * gap)) / 2;
    const dragging = drag.drag && drag.drag.moved && drag.drag.payload ? drag.drag : null;
    const firstFree = gparts.findIndex((g: any, j: number) => !placedIdx.includes(j));
    return (
      <g>
        {tiles(ds, { target: true, pickOn: canBuild && S.pick >= 0 })}
        <g pointerEvents="none">
          {zcols.map((c: number) => (
            <g key={"z" + c} className="ef-drop" filter="url(#fShadowSoft)">
              <rect x={efC(c) - EF_TILE_W / 2} y={EF_TILE_Y} width={EF_TILE_W} height={EF_TILE_H} rx={RAD.piece} fill={EF_GREY} stroke={shade(EF_GREY, 0.3)} strokeWidth={2} />
              {txt(efC(c), EF_TILE_Y + 76, "0", T.display, "#FFFFFF", { weight: 700 })}
            </g>
          ))}
        </g>
        {strip({})}
        <g pointerEvents="none">
          {zcols.map((c: number) => <g key={"h" + c}>{txt(efC(c), 188, tx("place holder"), T.micro, EF_GREY, { ls: -1, weight: 600 })}</g>)}
          {read && reading.text && txt(W.w / 2, 282, reading.text, T.display, greenInk, { weight: 700 })}
        </g>
        {gparts.map((g: any, j: number) => {
          const x0 = left + j * (cw + gap), y0 = EF_TRAY_Y, away = solved || placedIdx.includes(j);
          if (away) return <rect key={"s" + j} x={x0} y={y0} width={cw} height={104} rx={14} fill="none" stroke={tint(C.rule, 0.2)} strokeWidth={2} strokeDasharray="8 8" />;
          const me = dragging && dragging.payload.t === "part" && dragging.payload.j === j;
          const dx = me ? dragging.x - (x0 + cw / 2) : 0, dy = me ? dragging.y - (y0 + 52) : 0;
          const picked = S.pick === j;
          const label = efLabel(g);
          return (
            <g key={"g" + j} className="c4-piece" {...control("tray-" + (j + 1), "part " + label)} {...drag.bind({ t: "part", j })} {...drag.keys({ t: "part", j })}
              transform={`translate(${dx},${dy})`} filter={me ? "url(#fLift)" : "url(#fShadowSoft)"}>
              <rect x={x0} y={y0} width={cw} height={104} rx={14} fill="#FFFFFF" stroke={picked ? EF_AMBER : EF_BLUE} strokeWidth={picked ? 5 : 3} />
              {g.f ? stacked(x0 + cw / 2, y0 + 6, g.f[0], g.f[1], blueInk, T.label) : txt(x0 + cw / 2, y0 + 66, label, T.prompt, blueInk, { weight: 700 })}
            </g>
          );
        })}
        {canBuild && !wrong && kind === "std" && !placedIdx.length && S.pick < 0 && firstFree >= 0
          && pulse(left + firstFree * (cw + gap) - 8, EF_TRAY_Y - 8, cw + 16, 120)}
        {canBuild && [0, 1, 2, 3, 4, 5].filter((c) => S.pick >= 0 || S.placed[c] !== undefined).map((c) => (
          <Hit key={"c" + c} id={"place-" + (c + 1)} x={efX(c) + 3} y={EF_TILE_Y} w={EF_CW - 6} h={EF_TILE_H} onPress={() => colPress(c)}
            label={S.pick >= 0 ? "put it in the " + EF_PLACES[c] : "take it off the " + EF_PLACES[c]} />
        ))}
      </g>
    );
  };

  /* Free play: three rows of the decimal at once */
  const freeRows = (d: string) => {
    const ps = efParts(d), cs = efCols(d);
    const wdig = [0, 1, 2].filter((c) => cs[c] !== null);
    const whole = parseInt(d.split(".")[0] || "0", 10);
    const fps = ps.filter((p: any) => p.c >= 3);
    const wx = wdig.length ? (efC(wdig[0]) + efC(2)) / 2 : efC(2);
    return (
      <g>
        {formLabel("Place value form", 186)}
        {txt(efSignX(cs), 238, tx("is"), T.label, C.ink)}
        {ps.map((p: any, j: number) => (
          <g key={"a" + p.c}>
            {txt(efC(p.c), 222, p.d, T.label, C.ink, { weight: 700 })}
            {txt(efC(p.c), 254, tx(efName(p.c, p.d)), T.micro, C.ink, { ls: -1, weight: 500 })}
            {j < ps.length - 1 && plus(efPlus(p.c), 238, "a+" + p.c)}
          </g>
        ))}
        {formLabel("Decimal form", 290)}
        {txt(efSignX(cs), 326, "=", T.label, C.ink)}
        {ps.map((p: any, j: number) => (
          <g key={"b" + p.c}>
            {txt(efC(p.c), 326, efWorth(p.c, p.d), T.label, C.ink, { weight: 700 })}
            {j < ps.length - 1 && plus(efPlus(p.c), 326, "b+" + p.c)}
          </g>
        ))}
        {formLabel("Fractional form", 362)}
        {txt(efSignX(cs), 412, "=", T.label, C.ink)}
        {whole > 0 && txt(wx, 412, whole, T.label, C.ink, { weight: 700 })}
        {whole > 0 && fps.length > 0 && plus(EF_PT, 412, "c+w")}
        {fps.map((p: any, j: number) => {
          const [a, b] = efFracOf(p.c, p.d);
          return (
            <g key={"c" + p.c}>
              {txt(efC(p.c), 390, a, T.label, C.ink, { weight: 700 })}
              <rect x={efC(p.c) - 44} y={398} width={88} height={4} rx={2} fill={C.ink} />
              {txt(efC(p.c), 428, b, T.label, C.ink, { weight: 700 })}
              {j < fps.length - 1 && plus(efPlus(p.c), 412, "c+" + p.c)}
            </g>
          );
        })}
      </g>
    );
  };

  const freeView = () => {
    const typing = S.ftyping !== null;
    return (
      <g>
        {S.fmode === "build" && !typing ? buildView() : (
          <g>
            {tiles(cols)}
            {strip({})}
            {S.fmode === "split" && !typing && freeRows(S.fdec)}
          </g>
        )}
        {typing && <rect x={efX(0) - 8} y={2} width={efX(5) + EF_CW - efX(0) + 16} height={EF_TILE_H + 10} rx={16} fill="none" stroke={C.accent} strokeWidth={4} strokeDasharray="12 10" pointerEvents="none" />}
        <Key id="new-decimal" x={0} y={432} w={250} h={80} C={C} onClick={newDecimal} label="New decimal">{keyText("New decimal")}</Key>
        <Key id="split" x={726} y={432} w={170} h={80} C={C} onClick={() => freeMode("split")} label="Split">{keyText("Split")}</Key>
        <Key id="build" x={908} y={432} w={170} h={80} C={C} onClick={() => freeMode("build")} label="Build">{keyText("Build")}</Key>
      </g>
    );
  };

  const count = building && !(free && S.ftyping !== null) ? gparts.length : parts.length;
  return (
    <g>
      <style>{EF_CSS}</style>
      {runs(count)}
      {free ? freeView() : kind === "std" ? buildView() : splitView()}
    </g>
  );
}

/* the digit each part puts in each column, when every part sits in its own place */
function efOwnDigits(gparts: any[]) {
  const ds: any[] = [null, null, null, null, null, null];
  gparts.forEach((g: any) => { if (g.c >= 0) ds[g.c] = g.d; });
  return ds;
}
/* a part as it is written in the tray */
function efLabel(g: any) { return g ? g.label : ""; }
/* where "is" or "=" stands: just before the number's first column */
const efSignX = (cols: any[]) => { const c = cols.findIndex((d: any) => d !== null && d !== undefined); return Math.max(28, efX(c < 0 ? 2 : c) - 16); };

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (item = the question's index) */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const ph: any = PHASES[(n || 1) - 1], it = ph && ph.items[last.item];
  if (!it) return null;
  const blueInk = shade(EF_BLUE, 0.25), greenInk = shade(EF_GREEN, 0.25);
  const box = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  const line = (x: number, y: number, s: any, size: number, fill: string, anchor = "start") => (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={fill}>{s}</text>
  );
  if (it.kind === "pv") {
    const d = efCols(it.dec)[it.col];
    return <g>{box}{line(16, 34, it.dec, T.label, blueInk)}{line(16, 70, d + " " + tx(it.answer), T.micro, greenInk)}</g>;
  }
  if (it.kind === "dec") {
    const tail = String(it.answer).split(" + ").filter((s) => s.includes(".")).join(" + ");
    return <g>{box}{line(16, 34, it.dec, T.label, blueInk)}{line(16, 70, tail, T.micro, greenInk)}</g>;
  }
  if (it.kind === "frac") {
    const [a, b] = it.answer, fx = w - 62;
    return (
      <g>
        {box}
        {line(16, 54, it.dec, T.label, blueInk)}
        {line(fx, 32, a, T.micro, greenInk, "middle")}
        <rect x={fx - 34} y={38} width={68} height={4} rx={2} fill={greenInk} />
        {line(fx, 70, b, T.micro, greenInk, "middle")}
      </g>
    );
  }
  return <g>{box}{line(w / 2, h / 2 + 14, it.answer, T.label, greenInk, "middle")}</g>;
}

function ExpandedForm(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, pointKey: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default ExpandedForm;
