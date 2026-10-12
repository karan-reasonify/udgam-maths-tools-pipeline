/* ═══ M2.S2.T4.C12.2D1 · bigger_to_smaller · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   The picture: one row of the metric chart (kilo .. milli) with digit tiles, a have pin and a want
   pin, and a point that hops right one place at a time (×10 an arrow). The child types the answer;
   the grey zeros that hold the places drop in only on the win or in the correction. */

const TOOL_ID = "bigger_to_smaller";
const MEDIA_ID = "M2.S2.T4.C12.2D1";
const TOOL_NAME = "Right Hop Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A measure on the chart, and a pin on its unit."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You hopped right to a smaller unit and kept every place.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Set any measure and hop it anywhere to the right.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled after the English is final and reviewed. */
const TR: any = { hi: {}, gu: {} };

/* Items carry the measure as data the picture and the oracle read:
     m      the kind of measure (mass, length, cap)
     n      the bigger part, a whole number of `have`
     have   the unit the measure is given in; want  the unit the question asks for
     part   [number, unit] the smaller part of a mixed measure (always in the wanted unit here)
     road   the road sign's name (phase 4); near  the misconception (judge must reject it)
   Units the voice cannot read as symbols (hg, dag, hm, dam, dm, kL, hL ...) are written in words in
   every spoken line; the ask, the chart and the signs keep the symbols. */
const PHASES = [
  {
    n: 1,
    concept: "Places to the right",
    conceptId: "M2.S2.T4.C12", objectiveIds: ["O5"],
    says: ["Pin the unit you want. Hop right once for each place."],
    ladder: ["Hop once and read the measure.", "Try neighbours first: 1 metre is 10 decimetres. Then count your own places."],
    closing: "Count the places from the unit you have to the unit you want. Each place to the right multiplies by 10.",
    learned: "You learned: each place to the right multiplies the number by 10.",
    traceback: "The pins light amber, the point hops right one place at a time with a ×10 arrow under each hop, a grey zero drops into every empty column it passed, and the answer reads in green.",
    items: [
      /* learn BS1: answer in the plan = 400 g. */
      { qid: "M2.S2.T4.C12:BS1", kind: "hop", m: "mass", n: 4, have: "hg", want: "g", near: 4, winMs: 2800,
        say: "A packet of tea weighs 4 hectograms. How many grams is that?", ask: "4 hg in grams", answer: 400,
        miss: "Count the places between the pins without hopping." },
      /* practice 1: answer in the plan = 60 dm */
      { qid: "M2.S2.T4.C12:1", kind: "hop", m: "length", n: 6, have: "m", want: "dm", near: 6, winMs: 2400,
        say: "How many decimetres is 6 m?", ask: "6 m in decimetres", answer: 60,
        miss: "Which way is decimetres from metres? Count the places to it." },
      /* practice 8: answer in the plan = 4,00,000 mL */
      { qid: "M2.S2.T4.C12:8", kind: "hop", m: "cap", n: 4, have: "hL", want: "mL", near: 4000, winMs: 4400,
        say: "How many millilitres is 4 hectolitres?", ask: "4 hL in millilitres", answer: 400000,
        miss: "Every column the point passes needs a digit. Which ones are empty?" },
    ],
  },
  {
    n: 2,
    concept: "A mixed measure in the smaller unit",
    conceptId: "M2.S2.T4.C13", objectiveIds: ["O5"],
    says: ["Change the litres first. Then add the millilitres."],
    ladder: ["Slide the smaller part in only after the hops.", "Try 1 metre 25 centimetres first: 100 centimetres and 25 more."],
    closing: "Change a mixed measure bigger part first. Then add the smaller part.",
    learned: "You learned: change the bigger part first, then add the smaller part.",
    traceback: "The bigger part is lit amber and hops into the smaller unit one place at a time, the smaller part's card slides into its own columns, and the whole measure reads in green.",
    items: [
      /* learn BS2: answer in the plan = 4615 mL. */
      { qid: "M2.S2.T4.C13:BS2", kind: "mixed", m: "cap", n: 4, have: "L", want: "mL", part: [615, "mL"], near: 619, winMs: 2900,
        say: "A bucket holds 4 L 615 mL. How many millilitres is that?", ask: "4 L 615 mL in millilitres", answer: 4615,
        miss: "Change only the litres part." },
      /* practice 3: answer in the plan = 258 cm */
      { qid: "M2.S2.T4.C13:3", kind: "mixed", m: "length", n: 2, have: "m", want: "cm", part: [58, "cm"], near: 60, winMs: 2600,
        say: "How many centimetres is 2 m 58 cm?", ask: "2 m 58 cm in centimetres", answer: 258,
        miss: "Hop the metres into centimetres first, then add." },
      /* practice 5: answer in the plan = 3260 L */
      { qid: "M2.S2.T4.C13:5", kind: "mixed", m: "cap", n: 3, have: "kL", want: "L", part: [260, "L"], near: 263, winMs: 2900,
        say: "How many litres is 3 kilolitres 260 litres?", ask: "3 kL 260 L in litres", answer: 3260,
        miss: "How many litres are in the 3 kilolitres alone?" },
    ],
  },
  {
    n: 3,
    concept: "A zero that holds a place",
    conceptId: "M2.S2.T4.C14", objectiveIds: ["O6"],
    says: ["Is any column empty? What goes there?"],
    ladder: ["Read the row from the left, and give every column a digit.", "Try 1 km 50 m first: 1,000 metres and 50 more."],
    closing: "A zero holds a place open inside the answer. Without it, the measure would be far smaller.",
    learned: "You learned: a zero holds an empty place open inside the answer.",
    traceback: "The bigger part hops, the smaller part slides into its columns, each column left empty is lit amber and takes a grey zero, and the answer reads in green.",
    items: [
      /* learn BS3: answer in the plan = 8070 m. */
      { qid: "M2.S2.T4.C14:BS3", kind: "zero", m: "length", n: 8, have: "km", want: "m", part: [70, "m"], near: 870, winMs: 3200,
        say: "A trail is 8 km 70 m long. How many metres is that?", ask: "8 km 70 m in metres", answer: 8070,
        miss: "Change the kilometres part only." },
      /* practice 4: answer in the plan = 5008 g */
      { qid: "M2.S2.T4.C14:4", kind: "zero", m: "mass", n: 5, have: "kg", want: "g", part: [8, "g"], near: 58, winMs: 3400,
        say: "How many grams is 5 kg 8 g?", ask: "5 kg 8 g in grams", answer: 5008,
        miss: "Which columns does the 8 leave empty?" },
      /* practice 6: answer in the plan = 406 cm */
      { qid: "M2.S2.T4.C14:6", kind: "zero", m: "length", n: 4, have: "m", want: "cm", part: [6, "cm"], near: 46, winMs: 3000,
        say: "How many centimetres is 4 m 6 cm?", ask: "4 m 6 cm in centimetres", answer: 406,
        miss: "The 6 fills one column. What holds the other one open?" },
    ],
  },
  {
    n: 4,
    concept: "A long road in metres",
    conceptId: "M2.S2.T4.C15", objectiveIds: ["O6"],
    says: ["A road sign gives a length in kilometres. Change it to metres, and keep the word over."],
    ladder: ["Hop one place at a time, and stop at the want pin.", "Try a short road first: 2 km is 2,000 m. Then the long one."],
    closing: "A long length in kilometres goes into metres three places to the right. The word over stays with it.",
    learned: "You learned: km to m is three places right, and over stays with it.",
    traceback: "The point hops right from km one place at a time, grey zeros drop into the empty columns, and a second sign reads the length in the wanted unit, still with over.",
    items: [
      /* learn BS4: answer in the plan = Over 41,12,000 m. */
      { qid: "M2.S2.T4.C15:BS4", kind: "road", m: "length", n: 4112, have: "km", want: "m", road: "NH44", near: 411200, winMs: 4000,
        say: "This is our own question, because the road box prints no question. NH 44 is over 4,112 km long. Over how many metres is that?",
        ask: "NH44: over how many metres?", answer: 4112000,
        miss: "Hop the road's length one place, into hectometres." },
      /* practice 7: answer in the plan = Over 4,11,200 dam */
      { qid: "M2.S2.T4.C15:7", kind: "road", m: "length", n: 4112, have: "km", want: "dam", road: "NH44", near: 41120, winMs: 3400,
        say: "Our own question again, on the same road. Over how many decametres is it?",
        ask: "NH44: over how many dam?", answer: 411200,
        miss: "Count the hops from kilometres to decametres." },
      /* authored (qid null): the plan has only two questions for this concept, and the phase needs
         three; no plan question of another phase is a long road. Our own question, as the page asks. */
      { qid: null, kind: "road", m: "length", n: 2075, have: "km", want: "m", road: "Road", near: 207500, winMs: 4000,
        say: "One more of our own. A long road is over 2,075 km. Write its length in metres.",
        ask: "over 2,075 km in metres", answer: 2075000,
        miss: "Count the columns the point passes. Each one needs a zero." },
    ],
  },
];

/* ── the chart ───────────────────────────────────────────────────────────────────────────── */
const RH_ROWS: any = {
  mass: ["kg", "hg", "dag", "g", "dg", "cg", "mg"],
  length: ["km", "hm", "dam", "m", "dm", "cm", "mm"],
  cap: ["kL", "hL", "daL", "L", "dL", "cL", "mL"],
};
const RH_PREFIX = ["kilo", "hecto", "deca", "", "deci", "centi", "milli"];
const RH_BASE: any = { mass: "gram", length: "metre", cap: "litre" };
const RH_KINDS = ["length", "mass", "cap"];
/* the chapter's content colours: Given deep blue, Answer green, Move vermilion, Unit violet,
   the column worked on now amber, and grey only for a zero that holds a place */
const RHC = { given: CONTENT.hundred, answer: CONTENT.one, move: CONTENT.pointer, unit: CONTENT.bead, now: CONTENT.ten, hold: "#767676" };
const rhIdx = (m: string, u: string) => RH_ROWS[m].indexOf(u);
const rhRange = (a: number, b: number) => { const r: number[] = []; for (let k = a; k <= b; k++) r.push(k); return r; };
/* columns needed left of kilo for a phase's longest given number (a road of 4,112 km needs three) */
const rhExt = (ph: any) => Math.max(0, ...ph.items.map((it: any) => String(it.n).length - 1 - rhIdx(it.m, it.have)));
/* the given measure as the card prints it */
const rhGiven = (it: any) => indian(it.n) + " " + it.have + (it.part ? " " + indian(it.part[0]) + " " + it.part[1] : "");
/* the slot groups a long typed number with Indian commas, digit for digit (a leading zero still shows) */
const rhGroup = (s: string) => {
  if (s.length <= 3) return s;
  const parts: string[] = [];
  let h = s.slice(0, -3);
  while (h.length > 2) { parts.unshift(h.slice(-2)); h = h.slice(0, -2); }
  if (h) parts.unshift(h);
  return parts.join(",") + "," + s.slice(-3);
};
const rhFormat = (v: any) => { const s = String(v ?? ""); return /^\d{4,}$/.test(s) ? rhGroup(s) : s; };

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  chart: "one row of the metric chart: kilo, hecto, deca, the base unit, deci, centi, milli; each place to the right is 10 times smaller",
  rows: RH_ROWS, prefixes: RH_PREFIX, base: RH_BASE,
  columns: { width: 140, widthWithRoadColumns: 104, roadColumnsLeftOfKilo: 3 },
  colours: { given: "deep blue", answer: "green", move: "vermilion", unit: "violet", now: "amber", placeHolder: "grey" },
  answers: "typed on the 12-key pad; the slot groups them with Indian commas",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route that shares nothing with judge or Work: each symbol's power of ten from its
   prefix, then n × 10^(have − want) plus the smaller part changed into the wanted unit */
const RH_POW: any = { k: 3, h: 2, da: 1, "": 0, d: -1, c: -2, m: -3 };
const rhPow = (u: string) => RH_POW[u.slice(0, -1)];
const oracle = () => PHASES.every((p: any) => p.items.length === 3 && p.items.every((it: any) => {
  const up = rhPow(it.have) - rhPow(it.want);
  const small = it.part ? it.part[0] * Math.pow(10, rhPow(it.part[1]) - rhPow(it.want)) : 0;
  return up > 0 && Math.round(it.n * Math.pow(10, up) + small) === it.answer && it.near !== it.answer;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => [String(item.answer), indian(item.answer), words(item.answer)];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* every answer is typed: the agent types it */
const answer = (item: any, v: any) => undefined;
const check = () => undefined;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
const RH_PARK = { x: 640, y: 46 };     /* where the loose want pin waits */
const RH_Y = { haveTag: 96, wantC: 160, head: 200, row: 274, rowH: 98, arc: 380, band: 450 };

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [fp, setFp] = useState<any>({ m: "length", have: 3, num: 4 });
  const key = free ? "free" : n + ":" + index;
  const m = free ? fp.m : item.m;
  const row = RH_ROWS[m];
  const have = free ? fp.have : rhIdx(m, item.have);
  const wantU = free ? -1 : rhIdx(m, item.want);
  const num = free ? fp.num : item.n;
  const part = !free && item.part ? item.part : null;
  const partAt = part ? rhIdx(m, part[1]) : -1;
  const partCols = part ? rhRange(partAt - String(part[0]).length + 1, partAt) : [];
  const holes = free ? [] : rhRange(have + 1, wantU).filter((c) => partCols.indexOf(c) < 0);
  const ext = free ? 0 : rhExt(phase);
  const ncol = 7 + ext, cw = ext ? 104 : 140, x0 = Math.round((W.w - ncol * cw) / 2);
  const colL = (c: number) => x0 + (c + ext) * cw;
  const colC = (c: number) => colL(c) + cw / 2;
  const gapX = (c: number) => colL(c) + cw;
  const road = !free && item.kind === "road";

  /* the chart's own state, keyed to the question it belongs to (Work is keyed by the run, not the item) */
  const fresh = (): any => ({ key, want: null, pt: have, added: false, zeros: [], lit: null, show: false });
  const [st, setSt] = useState<any>(fresh);
  const s = st && st.key === key ? st : fresh();
  const put = (patch: any) => setSt((prev: any) => {
    const b = prev && prev.key === key ? prev : fresh();
    return { ...b, ...(typeof patch === "function" ? patch(b) : patch), key };
  });

  const busy = tl.busy;
  const live = (stage === "teach" || stage === "ask" || free) && !busy;
  const canHop = live && s.want !== null && s.pt < s.want;
  const canAdd = live && !!part && !s.added && s.pt === partAt;

  /* Enter and choice taps go to the runtime: every answer here is typed */
  api.onEnter(null);

  /* a new question (or a phase jump mid-motion) stops any motion and gives the pad back */
  useEffect(() => { tl.stop(); api.lock(false); }, [key]);

  /* ── the child's acts ── */
  const dropPin = (payload: any, p: any, moved: boolean) => {
    if (!live || payload !== "want") return;
    let to: any;
    if (!moved || !p || !isFinite(p.x) || !isFinite(p.y)) {
      /* a tap, or Enter on the pin: put it where it belongs (in Free play, one column further right) */
      to = free ? (s.want === null || s.want >= 6 ? Math.min(6, have + 1) : s.want + 1) : wantU;
    } else {
      const inRow = p.y > 92 && p.y < 440 && p.x > colL(0) - cw / 2 && p.x < gapX(6) + cw / 2;
      to = inRow ? Math.max(0, Math.min(6, Math.floor((p.x - x0) / cw) - ext)) : null;
    }
    api.sfx.tick();
    if (to === s.want) return;
    put({ want: to, pt: have, added: false, zeros: [], lit: null, show: false });
  };
  const drag = useDrag(dropPin);
  const hop = () => { if (!canHop) return; put({ pt: s.pt + 1, lit: null }); api.sfx.tick(); };
  const addPart = () => {
    if (!canAdd) return;
    api.sfx.tick();
    tl.run([[700, () => put({ added: true, lit: { cols: partCols } })], [0, () => put({ lit: null })]]);
  };
  /* Free play: the kind of measure, its unit (a tap on a column's name) and its digits (a tap on a tile) */
  const nextKind = () => {
    setFp({ ...fp, m: RH_KINDS[(RH_KINDS.indexOf(fp.m) + 1) % RH_KINDS.length] });
    put({ pt: fp.have, zeros: [], lit: null }); api.sfx.tick();
  };
  const setUnit = (c: number) => {
    const lim = Math.pow(10, Math.min(4, c + 1));
    const nn = fp.num >= lim ? fp.num % lim || 1 : fp.num;
    setFp({ ...fp, have: c, num: nn });
    put({ want: s.want !== null && s.want > c ? s.want : null, pt: c, zeros: [], lit: null }); api.sfx.tick();
  };
  const bump = (c: number) => {
    const place = Math.pow(10, fp.have - c), d = Math.floor(fp.num / place) % 10;
    setFp({ ...fp, num: fp.num + (((d + 1) % 10) - d) * place });
    put({ pt: fp.have, lit: null }); api.sfx.tick();
  };

  /* ── the correction: the places counted again hop by hop, ending on the whole right answer ── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    const steps: any[] = [[800, () => put({ want: wantU, pt: have, added: false, zeros: [], show: false, lit: { pins: true } })]];
    for (let c = have + 1; c <= wantU; c++) { const cc = c; steps.push([560, () => put({ pt: cc, lit: { pins: true, cols: [cc] } })]); }
    if (part) {
      steps.push([600, () => put({ lit: { add: true } })]);
      steps.push([800, () => put({ added: true, lit: { cols: partCols } })]);
    }
    holes.forEach((c, k) => steps.push([480, () => put({ zeros: holes.slice(0, k + 1), lit: { cols: [c] } })]));
    steps.push([200, () => put({ show: true, lit: null })]);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* ── the win: whatever is still to do is done, then the zeros drop in one after another ── */
  useEffect(() => {
    if (stage !== "win" || free) return;
    const steps: any[] = [];
    const on = s.want === wantU;
    const from = on ? s.pt : have;
    if (!on) steps.push([240, () => put({ want: wantU, pt: have, added: false, zeros: [] })]);
    for (let c = from + 1; c <= wantU; c++) { const cc = c; steps.push([240, () => put({ pt: cc })]); }
    if (part && !(on && s.added)) steps.push([520, () => put({ added: true })]);
    const had: number[] = on ? s.zeros : [];
    const todo = holes.filter((c) => had.indexOf(c) < 0);
    todo.forEach((c, k) => steps.push([320, () => put({ zeros: had.concat(todo.slice(0, k + 1)) })]));
    steps.push([0, () => put({ show: true, lit: null })]);
    tl.run(steps);
  }, [stage, key]);

  /* what the host and the agent read back (toolApi.getState): never the answer before it is given */
  api.share({
    row: m, digits: String(num), have: row[have], want: s.want === null ? null : row[s.want], hops: s.pt - have,
    part_added: !!s.added, answer: !free && (stage === "win" || stage === "idle") ? item.answer : null,
  });

  /* ── the picture ── */
  const ink = (c: string) => shade(c, 0.25);
  const quiet = mix(C.ink, "#FFFFFF", 0.3);
  const lit = s.lit || {};
  const litCols: number[] = lit.cols || [];
  const hops = s.pt - have;
  const cells: any = {};
  String(num).split("").reverse().forEach((d, k) => { cells[have - k] = { d, kind: "given" }; });
  if (part && s.added) String(part[0]).split("").reverse().forEach((d, k) => { cells[partAt - k] = { d, kind: "part", fresh: true }; });
  (free ? rhRange(have + 1, s.pt) : s.zeros).forEach((c: number) => { if (!cells[c]) cells[c] = { d: "0", kind: "zero" }; });
  rhRange(have + 1, s.pt).forEach((c) => { if (!cells[c]) cells[c] = { d: "", kind: "empty" }; });
  const first = have - String(num).length + 1;
  const reading = free ? indian(num * Math.pow(10, hops)) + " " + row[s.pt] : indian(item.answer) + " " + item.want;

  /* the one thing to touch next */
  let inv: string | null = null;
  if (live && stage !== "win") {
    if (s.want === null || s.want <= have) inv = "pin";
    else if (s.pt < s.want) inv = "hop";
    else if (part && !s.added && s.pt === partAt) inv = "add";
  }
  const pulse = (x: number, y: number, w: number, h: number) => (
    <rect className="c4-pulse" x={x} y={y} width={w} height={h} rx={h / 2} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
  );

  const runs = () => (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={24} y={-44} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Hops")}</text>
      <text x={306} y={-40} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{hops}</text>
    </g>
  );

  const givenCard = (gx: number) => {
    const txt = free ? indian(num) + " " + row[have] : rhGiven(item);
    const gw = 108 + txt.length * T.prompt * 0.6 + 22;
    return (
      <g>
        <rect x={gx} y={6} width={gw} height={80} rx={18} fill="#FFFFFF" stroke={RHC.given} strokeWidth={3} />
        <text x={gx + 20} y={56} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("Given")}</text>
        <text x={gx + 108} y={60} fontSize={T.prompt} fontWeight={700} fill={ink(RHC.given)}>{txt}</text>
      </g>
    );
  };

  const sign = (x: number, name: string, txt: string, colour: string, swing: boolean) => {
    const w = Math.max(240, 44 + txt.length * T.prompt * 0.6);
    return (
      <g className={swing ? "rh-swing" : undefined} pointerEvents="none">
        <rect x={x} y={2} width={w} height={86} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={4} />
        <rect x={x + 8} y={10} width={w - 16} height={70} rx={8} fill="none" stroke={C.ink} strokeWidth={1.5} />
        <text x={x + 22} y={40} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(name)}</text>
        <text x={x + 22} y={76} fontSize={T.prompt} fontWeight={700} fill={ink(colour)}>{txt}</text>
      </g>
    );
  };

  const header = () => rhRange(-ext, 6).map((c) => (
    <g key={"h" + c}>
      <rect x={colL(c)} y={RH_Y.head} width={cw} height={68} fill={c < 0 ? tint(C.panel, 0.45) : "#FFFFFF"} stroke={C.rule} strokeWidth={1.5} />
      {c >= 0 && <text x={colC(c)} y={RH_Y.head + 36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink(RHC.unit)}>{row[c]}</text>}
      {c >= 0 && <text x={colC(c)} y={RH_Y.head + 62} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={quiet}>{tx(c === 3 ? RH_BASE[m] : RH_PREFIX[c])}</text>}
    </g>
  ));

  const tile = (c: number, cell: any) => {
    const x = colL(c) + 12, y = RH_Y.row + 8, w = cw - 24, h = 82;
    if (cell.kind === "empty") return <rect key={"t" + c} x={x} y={y} width={w} height={h} rx={12} fill="#FFFFFF" stroke={C.dim} strokeWidth={3} strokeDasharray="10 8" />;
    const zero = cell.kind === "zero";
    return (
      <g key={"t" + c + cell.kind} className={zero || cell.kind === "part" ? "rh-drop" : undefined}>
        <rect x={x} y={y} width={w} height={h} rx={12} fill={zero ? "#FFFFFF" : tint(RHC.given, 0.85)} stroke={zero ? RHC.hold : RHC.given} strokeWidth={2.5} />
        <text x={colC(c)} y={RH_Y.row + 69} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={zero ? RHC.hold : ink(RHC.given)}>{cell.d}</text>
      </g>
    );
  };

  const arrow = (c: number) => {
    const x1 = gapX(c - 1) + 8, x2 = gapX(c) - 8, mx = (x1 + x2) / 2, y0 = RH_Y.arc, cy = y0 + 48;
    const ux = x2 - mx, uy = y0 - cy, ul = Math.hypot(ux, uy), ax = ux / ul, ay = uy / ul;
    const tip = [x2 + ax * 4, y0 + ay * 4], b = [x2 - ax * 14, y0 - ay * 14];
    return (
      <g key={"a" + c} pointerEvents="none">
        <path d={`M ${x1} ${y0} Q ${mx} ${cy} ${x2} ${y0}`} fill="none" stroke={RHC.move} strokeWidth={4} strokeLinecap="round" />
        <path d={`M ${tip[0]} ${tip[1]} L ${b[0] - ay * 8} ${b[1] + ax * 8} L ${b[0] + ay * 8} ${b[1] - ax * 8} Z`} fill={RHC.move} />
        <text x={colC(c)} y={RH_Y.arc + 64} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink(RHC.move)}>×10</text>
      </g>
    );
  };

  const havePin = () => {
    const hx = colC(have), y = RH_Y.haveTag;
    return (
      <g pointerEvents="none">
        <line x1={hx} y1={y + 36} x2={hx} y2={RH_Y.head} stroke={RHC.given} strokeWidth={3} />
        <rect x={hx - 44} y={y} width={88} height={38} rx={19} fill={ink(RHC.given)} />
        <text x={hx} y={y + 29} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{tx("have")}</text>
        {lit.pins && <rect x={hx - 50} y={y - 6} width={100} height={50} rx={25} fill="none" stroke={RHC.now} strokeWidth={5} />}
      </g>
    );
  };

  const wantPin = () => {
    const dragging = drag.drag && drag.drag.payload === "want";
    const onRow = !dragging && s.want !== null;
    const p = dragging ? { x: drag.drag.x, y: drag.drag.y } : onRow ? { x: colC(s.want), y: RH_Y.wantC } : RH_PARK;
    return (
      <g {...control("want-pin", "want pin")} className="c4-piece" {...(live ? drag.bind("want") : {})} {...(live ? drag.keys("want") : {})}
        filter={dragging ? "url(#fLift)" : undefined} style={{ cursor: live ? "grab" : "default" } as any}>
        <rect x={p.x - 50} y={p.y - 36} width={100} height={72} fill="transparent" />
        {onRow && <line x1={p.x} y1={p.y + 19} x2={p.x} y2={RH_Y.head} stroke={RHC.answer} strokeWidth={3} />}
        {onRow && <path d={`M ${p.x - 10} ${p.y + 17} L ${p.x + 10} ${p.y + 17} L ${p.x} ${p.y + 30} Z`} fill={ink(RHC.answer)} />}
        <rect x={p.x - 44} y={p.y - 19} width={88} height={38} rx={19} fill={ink(RHC.answer)} />
        <text x={p.x} y={p.y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{tx("want")}</text>
        {lit.pins && onRow && <rect x={p.x - 50} y={p.y - 25} width={100} height={50} rx={25} fill="none" stroke={RHC.now} strokeWidth={5} pointerEvents="none" />}
      </g>
    );
  };

  const hopArrowIcon = (c: string) => (
    <path d="M 44 0 h 26 M 60 -10 l 10 10 l -10 10" fill="none" stroke={c} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
  );

  return (
    <g>
      <style>{`@keyframes rhDrop{from{transform:translateY(-44px);opacity:0}to{transform:none;opacity:1}}.rh-drop{animation:rhDrop .38s ease-out both}@keyframes rhSwing{from{transform:rotate(-14deg) translateY(-24px);opacity:0}to{transform:none;opacity:1}}.rh-swing{transform-box:fill-box;transform-origin:50% 0;animation:rhSwing .6s ease-out both}@media (prefers-reduced-motion:reduce){.rh-drop,.rh-swing{animation:none}}`}</style>
      {runs()}

      {/* the top band: what is given, and (on the road) the signs */}
      {road ? sign(0, item.road, tx("over") + " " + indian(item.n) + " " + item.have, RHC.given, false) : free ? givenCard(212) : givenCard(0)}
      {road && s.show && sign(384, item.road, tx("over") + " " + reading, RHC.answer, true)}

      {/* the chart: unit names, the row of columns, the tiles, the point and the hops */}
      {header()}
      <rect x={colL(-ext)} y={RH_Y.row} width={ncol * cw} height={RH_Y.rowH} rx={12} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
      {litCols.map((c) => <rect key={"l" + c} x={colL(c) + 3} y={RH_Y.row + 3} width={cw - 6} height={RH_Y.rowH - 6} rx={10} fill={tint(RHC.now, 0.6)} stroke={RHC.now} strokeWidth={3} pointerEvents="none" />)}
      {rhRange(-ext + 1, 6).map((c) => <line key={"d" + c} x1={colL(c)} y1={RH_Y.row} x2={colL(c)} y2={RH_Y.row + RH_Y.rowH} stroke={C.rule} strokeWidth={1.5} />)}
      {Object.keys(cells).map(Number).sort((a, b) => a - b).map((c) => tile(c, cells[c]))}
      {(s.show || (free && hops > 0)) && (
        <rect x={colL(first) + 5} y={RH_Y.row + 4} width={gapX(s.pt) - colL(first) - 10} height={RH_Y.rowH - 8} rx={14} fill="none" stroke={RHC.answer} strokeWidth={4} pointerEvents="none" />
      )}
      <circle cx={gapX(s.pt)} cy={RH_Y.row + 82} r={10} fill={C.ink} stroke="#FFFFFF" strokeWidth={3} pointerEvents="none" />
      {rhRange(have + 1, s.pt).map((c) => arrow(c))}
      {havePin()}

      {/* the bottom band: the smaller part and Add part (phases 2 and 3), the answer once it is in */}
      {part && (
        <g pointerEvents="none">
          <rect x={0} y={RH_Y.band + 2} width={260} height={72} rx={16} fill="#FFFFFF" stroke={s.added ? C.dim : RHC.given} strokeWidth={s.added ? 2 : 3} strokeDasharray={s.added ? "8 8" : undefined} />
          {!s.added && <text x={18} y={RH_Y.band + 48} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("Part")}</text>}
          {!s.added && <text x={90} y={RH_Y.band + 52} fontSize={T.speech} fontWeight={700} fill={ink(RHC.given)}>{indian(part[0]) + " " + part[1]}</text>}
        </g>
      )}
      {!road && (s.show || free) && (
        <g pointerEvents="none">
          <text x={free ? 0 : 600} y={RH_Y.band + 50} fontSize={T.micro} fontWeight={600} fill={quiet}>{tx(free ? "Same measure" : "Answer")}</text>
          <text x={free ? 210 : 716} y={RH_Y.band + 54} fontSize={T.speech} fontWeight={700} fill={ink(RHC.answer)}>{reading}</text>
        </g>
      )}

      {/* Free play's own controls: the kind of measure, the unit names and the digit tiles */}
      {free && (
        <Key id="measure" x={0} y={6} w={196} h={76} C={C} onClick={nextKind} label="change the kind of measure">
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(RH_BASE[m])}</text>
        </Key>
      )}
      {free && rhRange(0, 6).map((c) => (
        <Hit key={"u" + c} id={"unit-" + row[c]} x={colL(c)} y={RH_Y.head - 2} w={cw} h={72} onPress={() => setUnit(c)} label={"give the measure in " + row[c]} />
      ))}
      {free && rhRange(Math.max(0, have - 3), have).map((c) => (
        <Hit key={"g" + c} id={"digit-" + row[c]} x={colL(c)} y={RH_Y.row} w={cw} h={RH_Y.rowH} onPress={() => bump(c)} label={"change the digit in the " + row[c] + " column"} />
      ))}

      {/* the pieces the child moves, in the order a keyboard reaches them */}
      {wantPin()}
      <Key id="hop" x={866} y={6} w={200} h={76} C={C} onClick={hop} disabled={!canHop} label="hop the point right">
        <text x={-22} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={canHop ? C.ink : quiet}>{tx("Hop")}</text>
        <g transform="translate(-14,0)">{hopArrowIcon(canHop ? C.ink : quiet)}</g>
      </Key>
      {part && (
        <Key id="add-part" x={280} y={RH_Y.band} w={220} h={72} C={C} onClick={addPart} disabled={!canAdd} label="add the smaller part">
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={canAdd ? C.ink : quiet}>{tx("Add part")}</text>
        </Key>
      )}
      {part && lit.add && <rect x={274} y={RH_Y.band - 4} width={232} height={79} rx={22} fill="none" stroke={RHC.now} strokeWidth={5} pointerEvents="none" />}

      {/* the one invite */}
      {inv === "pin" && (s.want === null ? pulse(RH_PARK.x - 54, RH_PARK.y - 26, 108, 52) : pulse(colC(s.want) - 54, RH_Y.wantC - 26, 108, 52))}
      {inv === "hop" && pulse(860, 4, 212, 84)}
      {inv === "add" && pulse(274, RH_Y.band - 2, 232, 78)}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, n, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const ph = PHASES[(n || 1) - 1];
  const it = last && ph ? ph.items[last.item] : null;
  if (!it) return null;
  const top = it.kind === "road" ? tx("over") + " " + indian(it.n) + " " + it.have : rhGiven(it);
  const bot = (it.kind === "road" ? "" : "= ") + indian(it.answer) + " " + it.want;
  const size = bot.length * T.label * 0.62 > w - 28 ? T.micro : T.label;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={14} y={h / 2 - 6} fontSize={T.micro} fontWeight={600} fill={shade(RHC.given, 0.25)}>{top}</text>
      <text x={w - 14} y={h - 12} textAnchor="end" fontSize={size} fontWeight={700} fill={shade(RHC.answer, 0.25)}>{bot}</text>
    </g>
  );
}

function BiggerToSmaller(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: rhFormat, winMs: 3000, fitHost: () => null }} />
  );
}

export default BiggerToSmaller;
