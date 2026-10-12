/* ═══ M1.S1.T3.C8.2D1 · hundred_grid · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "hundred_grid";
const MEDIA_ID = "M1.S1.T3.C8.2D1";
const TOOL_NAME = "Hundred Grid Shader";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A hundred small squares, all the same size."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Tenths into hundredths, and hundredths into thousandths.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Shade, scatter and zoom as you like.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = { hi: {}, gu: {} };

/* the two children's grids of phase 3, question 3 (0.14 each): A is a full column and 4 squares, B is 14
   squares scattered about (square k = column * 10 + row) */
const HG_B = [3, 17, 22, 28, 35, 41, 46, 53, 59, 64, 72, 77, 85, 91];
const HG_CHOICES = [{ id: "a", label: "Only A" }, { id: "b", label: "Only B" }, { id: "both", label: "Both" }, { id: "neither", label: "Neither" }];

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase, the third tests whether the phase landed.
           kind  cut · tenth · one (phase 1) · read · readf (2) · shade · who (3) · slices · thou · thouf (4)
           near  the item's misconception (judge rejects it); forms: the answer forms no line may print,
                 where the default would flag the question's own given number (a build target, 41 thousandths) */
const PHASES = [
  {
    n: 1,
    concept: "One hundredth",
    conceptId: "M1.S1.T3.C8", objectiveIds: ["O3"],
    says: ["Each square is one hundredth of the grid. Tap Cut column to lift one column out."],
    /* tries, as the plan writes it: First rung: count the squares in one column. Second rung: count the columns in the grid. Third rung: the same task on a column already lifted out, before the whole grid returns. */
    ladder: ["Point to each square of the lifted column as you count.", "Hundredths are written with two places after the point."],
    closing: "A tenth cut into ten equal parts gives hundredths, and 10 hundredths make 1 tenth.",
    learned: "You learned: a tenth cuts into 10 hundredths",
    traceback: "The lifted column's squares are numbered one by one under the words 1 tenth, ending on 10 hundredths; for one square, the square is lit and the cards fill with 1/100 and 0.01.",
    items: [
      /* learn HG1: answer in the plan = 10 hundredths, so 1/10 = 10/100 */
      { qid: "M1.S1.T3.C8:HG1", kind: "cut", say: "One column of a hundred grid is one tenth of the grid. How many hundredths is one column?",
        ask: "Hundredths in one column?", answer: 10, near: 1, miss: "Count the squares in one column.", winMs: 2600 },
      /* practice 1: answer in the plan = 10 hundredths (made on the grid: any 10 squares are one tenth) */
      { qid: "M1.S1.T3.C8:1", kind: "tenth", pad: "enter", say: "How many hundredths make one tenth? Shade them on the grid, then press Enter.",
        ask: "Shade 1 tenth in hundredths", answer: 10, near: 1, miss: "One tenth fills one whole column.", winMs: 2400 },
      /* authored (the plan has two questions here): one square as a decimal; the near miss calls it a tenth */
      { qid: null, kind: "one", say: "One square is shaded. Write it as a decimal.",
        ask: "One square as a decimal?", answer: "0.01", near: "0.1", miss: "A tenth is a whole column. One square is much smaller.", winMs: 2600 },
    ],
  },
  {
    n: 2,
    concept: "Reading a hundred grid",
    conceptId: "M1.S1.T3.C9", objectiveIds: ["O3"],
    says: ["Count the full columns first. Then count the squares left over."],
    /* tries, as the plan writes it: First rung: count the full columns only. Second rung: count the single squares only. Third rung: the same task with no single squares, before the mixed grid returns. */
    ladder: ["Count the single squares only.", "Count the full columns in tens, then add the single squares."],
    closing: "A shaded grid is read as full columns of ten and single squares, over 100.",
    learned: "You learned: read full columns, then single squares, over 100",
    traceback: "Each full column is lit and labelled 10 as the counter adds in tens, the single squares join, and the cards end on the hundredths as a fraction and a decimal.",
    items: [
      /* learn HG2: answer in the plan = 53/100, which is 0.53 */
      { qid: "M1.S1.T3.C9:HG2", kind: "read", cols: 5, ones: 3, say: "Here 5 full columns and 3 more squares are shaded. Write the shaded part as a decimal.",
        ask: "Shaded part as a decimal?", answer: "0.53", near: "5.3", miss: "Each full column holds ten hundredths.", winMs: 2600 },
      /* practice 2: answer in the plan = 60 of the 100 squares, 60/100, which is 0.60 or 0.6 (both taken) */
      { qid: "M1.S1.T3.C9:2", kind: "read", cols: 6, ones: 0, say: "Now 6 full columns are shaded and nothing else. Write this one as a decimal too.",
        ask: "This one as a decimal?", answer: "0.6", alt: ["0.60"], near: "0.06", miss: "Six columns of ten squares. How many hundredths is that?", winMs: 2600 },
      /* practice 4: answer in the plan = 29/100, which is 0.29 (asked as the fraction; the cards show both) */
      { qid: "M1.S1.T3.C9:4", kind: "readf", cols: 2, ones: 9, parts: SLOT_FRACTION, say: "This grid has 2 full columns and 9 more squares shaded. This time, write it as a fraction.",
        ask: "Shaded part as a fraction?", answer: [29, 100], near: "29|10", miss: "Count all the shaded squares for the top number.", winMs: 2600 },
    ],
  },
  {
    n: 3,
    concept: "Shading hundredths",
    conceptId: "M1.S1.T3.C10", objectiveIds: ["O3"],
    says: ["Shade the right number of squares. Does it matter which ones?"],
    /* tries, as the plan writes it: First rung: shade one square and read the card. Second rung: shade one full column and read it. Third rung: the same task with fewer hundredths, before the full count returns. */
    ladder: ["Shade one full column and read it.", "Read the counter. It tells how many hundredths are shaded."],
    closing: "Any squares of the right count show a number of hundredths.",
    learned: "You learned: any squares of the right count show hundredths",
    traceback: "A second grid shades the asked number of single squares beside the child's own shading, which the counter reads in hundredths; for the two children, each grid is counted to 14.",
    items: [
      /* learn HG3: answer in the plan = Any 4 squares of the 100 shaded */
      { qid: "M1.S1.T3.C10:HG3", kind: "shade", dec: "0.04", pad: "enter", say: "Shade a hundred grid to show 0.04. Then press Enter.",
        ask: "Shade 0.04", answer: 4, near: 40, forms: ["four"], miss: "Each square is one hundredth. Count the squares you shaded.", winMs: 3200 },
      /* practice 3: answer in the plan = Any 21 squares */
      { qid: "M1.S1.T3.C10:3", kind: "shade", dec: "0.21", pad: "enter", say: "How many squares of a hundred grid do you shade to show 0.21? Shade them.",
        ask: "Shade 0.21", answer: 21, near: 22, forms: ["twenty-one"], miss: "Shade full columns for the tenths, then single squares.", winMs: 2400 },
      /* practice 8: answer in the plan = Both are right. Each shaded 14 of the 100 squares, and which squares does not matter */
      { qid: "M1.S1.T3.C10:8", kind: "who", aCols: 1, aOnes: 4, choices: HG_CHOICES,
        say: "Two children show 0.14 on hundred grids. Child A shades a full column and 4 more squares. Child B shades 14 squares scattered about. Who is right?",
        ask: "Who is right?", answer: "both", near: "a", miss: "Count the shaded squares on each grid.", winMs: 2600 },
    ],
  },
  {
    n: 4,
    concept: "Thousandths",
    conceptId: "M1.S1.T3.C11", objectiveIds: ["O4"],
    says: ["Tap Zoom to open one square. Each thin slice is one thousandth."],
    /* tries, as the plan writes it: First rung: zoom one square and count its slices. Second rung: shade one slice and read the card. Third rung: the same task with the fraction card lit first. */
    ladder: ["Shade one slice and read the card.", "A thousand slices would fill the whole grid."],
    closing: "A hundredth cut into ten equal parts gives thousandths, and 10 thousandths make 1 hundredth.",
    learned: "You learned: a hundredth cuts into 10 thousandths",
    traceback: "The zoomed strip's slices are numbered, the decimal card fills its third place after the point in amber with grey zeros holding the places, and the cards end on the thousandths.",
    items: [
      /* practice 6: answer in the plan = 10 thousandths (made on the strip) */
      { qid: "M1.S1.T3.C11:6", kind: "slices", pad: "enter", say: "How many thousandths make one hundredth? Shade them on the strip, then press Enter.",
        ask: "Shade 1 hundredth in thousandths", answer: 10, near: 1, miss: "Count the thin slices in the strip.", winMs: 2600 },
      /* learn HG4: answer in the plan = 3/1000, which is 0.003 */
      { qid: "M1.S1.T3.C11:HG4", kind: "thou", th: 3, say: "One hundredth is cut into 10 equal parts and 3 of them are shaded. Write the shaded part as a decimal.",
        ask: "Shaded part as a decimal?", answer: "0.003", near: "0.03", miss: "Thousandths need three places after the point.", winMs: 2600 },
      /* practice 7: answer in the plan = 41/1000, which is 0.041 (asked as the fraction; the cards show both) */
      { qid: "M1.S1.T3.C11:7", kind: "thouf", th: 41, parts: SLOT_FRACTION, say: "Write 41 thousandths as a fraction.",
        ask: "41 thousandths as a fraction?", answer: [41, 1000], near: "41|100", forms: ["1000", "1,000", "one thousand"],
        miss: "Which number goes below the bar for thousandths?", winMs: 2600 },
    ],
  },
];

/* ── the picture's geometry (working-area units). The grid's square k = column * 10 + row, so a full
   column is k = 10c .. 10c + 9 and "full columns first" reads straight off the numbering. ── */
const HG = { gx: 40, gy: 54, s: 42, lx: 520, lg: 47, bx: 600, bw: 220, bh: 76, cx: 860, cw: 200, fy: 40, fh: 170, dy: 230, dh: 100,
  sx: 540, sy: 420, sw: 500, sh: 80, zc: 99, mx: 620, my: 344, ms: 18, b2: 600 };
const HG_SLOT = [54, 150, 246];
const HG_WARM = "#FFFDF7", HG_LINE = "#2B2B2B", HG_GREY = "#767676";
const hgRange = (a: number, b: number) => Array.from({ length: Math.max(0, b - a) }, (_, i) => a + i);
const hgFill = (list: number[], size = 100) => { const a = Array(size).fill(false); list.forEach((x) => { if (x >= 0 && x < size) a[x] = true; }); return a; };
const hgCount = (a: boolean[]) => a.reduce((t, v) => t + (v ? 1 : 0), 0);
const hgFull = (a: boolean[]) => hgRange(0, 10).filter((c) => hgRange(0, 10).every((r) => a[c * 10 + r])).length;
const hgDec = (h: number, places: number) => (h >= Math.pow(10, places) ? "1." + "0".repeat(places) : "0." + String(h).padStart(places, "0"));
/* the shading a question gives (deep blue: given) */
const hgGiven = (it: any): boolean[] => {
  if (!it) return hgFill([]);
  if (it.kind === "one") return hgFill([90]);
  if (it.kind === "read" || it.kind === "readf") return hgFill([...hgRange(0, it.cols * 10), ...hgRange(0, it.ones).map((r) => it.cols * 10 + r)]);
  if (it.kind === "who") return hgFill([...hgRange(0, it.aCols * 10), ...hgRange(0, it.aOnes).map((r) => it.aCols * 10 + r)]);
  if (it.kind === "thouf") return hgFill(hgRange(0, Math.floor(it.th / 10)));
  return hgFill([]);
};
const hgGivenSlices = (it: any) => hgFill(it && it.kind === "thou" ? hgRange(0, it.th) : it && it.kind === "thouf" ? hgRange(0, it.th % 10) : [], 10);
const hgCellAt = (p: any) => {
  if (!p || !isFinite(p.x) || !isFinite(p.y)) return -1;
  const c = Math.floor((p.x - HG.gx) / HG.s), r = Math.floor((p.y - HG.gy) / HG.s);
  return c >= 0 && c < 10 && r >= 0 && r < 10 ? c * 10 + r : -1;
};
const hgSliceAt = (p: any) => {
  if (!p || !isFinite(p.x) || !isFinite(p.y)) return -1;
  const c = Math.floor((p.x - HG.sx) / (HG.sw / 10));
  return c >= 0 && c < 10 && p.y >= HG.sy - 24 && p.y <= HG.sy + HG.sh + 24 ? c : -1;
};

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { grid: { columns: 10, rows: 10, square: HG.s, at: [HG.gx, HG.gy], numbering: "column * 10 + row" },
  strip: { slices: 10, at: [HG.sx, HG.sy], size: [HG.sw, HG.sh] }, zoomSquare: HG.zc, childB: HG_B };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a count made on the working area compares as a number; a typed count must be digits only; a decimal
   compares exactly in its written form ("0.6" or "0.60" where the plan takes both); a fraction box by box */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.pad === "enter") return Number(v) === item.answer;
  const s = String(v ?? "").trim();
  if (typeof item.answer === "number") return /^\d+$/.test(s) && Number(s) === item.answer;
  return s.toLowerCase() === String(item.answer).toLowerCase() || (item.alt || []).includes(s);
};
/* oracle: every answer re-derived from the item's own data by a second route (no judge, no picture code) */
const HG_ROUTE: any = {
  cut: () => 100 / 10, tenth: () => 100 / 10, slices: () => 1000 / 100,
  one: () => "0." + "0" + (1 / 100) * 100,
  read: (it: any) => { const h = it.cols * 10 + it.ones; return h % 10 ? "0." + (h < 10 ? "0" : "") + h : "0." + h / 10; },
  readf: (it: any) => [it.cols * 10 + it.ones, 100],
  shade: (it: any) => Math.round(parseFloat(it.dec) * 100),
  who: (it: any) => (it.aCols * 10 + it.aOnes === HG_B.length && Math.round(parseFloat("0.14") * 100) === HG_B.length ? "both" : "a"),
  thou: (it: any) => "0." + "000".slice(String(it.th).length) + it.th,
  thouf: (it: any) => [it.th, 1000],
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => JSON.stringify(HG_ROUTE[it.kind](it)) === JSON.stringify(it.answer)));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.forms ? item.forms
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : item.choices ? [String(item.answer)]
  : [String(item.answer), ...(item.alt || []), speakable(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent's answer(): a count made on the grid or the strip is shaded as a child would; a decimal is typed
   through the tool (toolApi.answer would strip its point, PATTERNS §4); the rest the runtime types */
const answer = (item: any, v: any) => (item.pad === "enter" ? (HOOK.set ? HOOK.set(v) : false)
  : typeof item.answer === "string" && !item.choices && HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing helpers (called, never mounted) ─────────────────────────────────────────────── */

/* a 10 x 10 grid of squares at x, y, side s; on[k] shaded in fill; skip(k) leaves a square out */
function hgSquares(key: string, x: number, y: number, s: number, on: boolean[], fill: string, skip?: (k: number) => boolean) {
  const out: any[] = [];
  for (let c = 0; c < 10; c++) for (let r = 0; r < 10; r++) {
    const q = c * 10 + r;
    if (skip && skip(q)) continue;
    out.push(<rect key={key + q} x={x + c * s} y={y + r * s} width={s} height={s} fill={on[q] ? fill : HG_WARM}
      stroke={s < 10 ? "#B4B4B4" : HG_LINE} strokeWidth={s > 30 ? 1.2 : s < 10 ? 0.5 : 0.8} />);
  }
  return out;
}

/* a decimal, one character a text, so a place can be lit amber and a zero holding a place drawn grey */
function hgDecimalText(str: string, cx: number, y: number, size: number, ink: string, lit?: number) {
  const adv = (ch: string) => (ch === "." ? size * 0.36 : size * 0.64);
  const total = str.split("").reduce((t, ch) => t + adv(ch), 0);
  const firstNon = str.search(/[1-9]/);
  let x = cx - total / 2;
  return str.split("").map((ch, i) => {
    const w = adv(ch), at = x + w / 2;
    x += w;
    const holder = ch === "0" && (firstNon < 0 || i < firstNon);
    const fill = i === lit ? shade(CONTENT.ten, 0.45) : ch === "." ? HG_LINE : holder ? HG_GREY : ink;
    return <text key={"d" + i} x={at} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>{ch}</text>;
  });
}

/* the fraction card over the decimal card. tone: blank (nothing yet), given (deep blue), result (green) */
function hgCards(C: any, tx: any, frac: any, fracTone: string, dec: string | null, decTone: string, lit?: number) {
  const edge = (t: string) => (t === "result" ? CONTENT.one : t === "given" ? CONTENT.hundred : C.rule);
  const ink = (t: string) => (t === "result" ? shade(CONTENT.one, 0.25) : shade(CONTENT.hundred, 0.25));
  const lab = shade(C.dim, 0.42);
  const x = HG.cx, w = HG.cw, cx = x + w / 2;
  return (
    <g>
      <rect x={x} y={HG.fy} width={w} height={HG.fh} rx={16} fill="#FFFFFF" stroke={edge(fracTone)} strokeWidth={fracTone === "blank" ? 2 : 4} />
      <text x={x + 16} y={HG.fy + 34} fontSize={T.micro} fontWeight={600} fill={lab}>{tx("fraction")}</text>
      {frac ? (
        <g>
          <text x={cx} y={HG.fy + 90} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={ink(fracTone)}>{String(frac[0])}</text>
          <line x1={cx - 58} y1={HG.fy + 106} x2={cx + 58} y2={HG.fy + 106} stroke={HG_LINE} strokeWidth={4} strokeLinecap="round" />
          <text x={cx} y={HG.fy + 154} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={ink(fracTone)}>{String(frac[1])}</text>
        </g>
      ) : <line x1={cx - 40} y1={HG.fy + 106} x2={cx + 40} y2={HG.fy + 106} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />}
      <rect x={x} y={HG.dy} width={w} height={HG.dh} rx={16} fill="#FFFFFF" stroke={edge(decTone)} strokeWidth={decTone === "blank" ? 2 : 4} />
      <text x={x + 16} y={HG.dy + 34} fontSize={T.micro} fontWeight={600} fill={lab}>{tx("decimal")}</text>
      {dec && hgDecimalText(dec, cx, HG.dy + 84, T.speech, ink(decTone), lit)}
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   The grid (left) is shaded by a drag: a stroke that starts on a white square shades every square it
   crosses, one that starts on a shaded square clears them; a tap toggles one square. Keyboard: Space adds
   the next square (column by column), Backspace takes the last off, Enter answers once there is shading.
   Phase 1 lifts a column out (Cut column), phase 3 scatters the shading (Scatter), phase 4 zooms one
   square into a strip of ten slices (Zoom). The fraction card and the decimal card stand at the right.
   A miss draws its correction on a demo layer (pointer-events none) that clears on the child's next act. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const tl = useTimeline();   /* the traceback */
  const tf = useTimeline();   /* the scatter flight */
  const free = stage === "free";
  const it: any = free ? null : item;
  const kind = free ? "free" : item.kind;
  const k = free ? "free" : n + ":" + index;
  const blank = (key: string) => ({ k: key, cells: hgFill([]), slices: hgFill([], 10), last: -1, cut: false, zoom: false, fresh: true, fly: null as any });
  const [own0, setOwn] = useState<any>(() => blank(""));
  const ownRef = useRef<any>(own0);
  const own = own0.k === k ? own0 : blank(k);
  const cur = () => (ownRef.current.k === k ? ownRef.current : blank(k));
  const put = (o: any) => { const nx = { ...cur(), ...o, k }; ownRef.current = nx; setOwn(nx); };
  const [demo, setDemo] = useState<any>(null);
  const ds = demo && demo.k === k ? demo.step : 0;
  const reveal = !free && (stage === "win" || stage === "idle");
  const live = (stage === "ask" || stage === "teach" || free) && !tl.busy && !own.fly;
  /* the child's act: it wipes the correction and makes a new answer (Enter may send it) */
  const act = (o: any) => { put({ ...o, fresh: true }); setDemo(null); };

  const childGrid = kind === "tenth" || kind === "shade" || kind === "free";
  const zoomOpen = kind === "thou" || kind === "thouf" || own.zoom || (kind === "slices" && (ds > 0 || reveal));
  const gridLive = live && childGrid;
  const stripLive = live && zoomOpen && (kind === "slices" || kind === "free");
  const built = (o: any) => (kind === "slices" ? hgCount(o.slices) : hgCount(o.cells));

  /* ── shading by drag, tap and keys ── */
  const listOf = (o: any, pl: string) => (pl === "grid" ? o.cells : o.slices);
  const cellOf = (pl: string, p: any) => (pl === "grid" ? hgCellAt(p) : hgSliceAt(p));
  const paint = (pl: string, a: any, b: any, on: boolean) => {
    const o = cur(), list = listOf(o, pl).slice();
    let last = o.last, changed = false;
    const steps = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 8));
    for (let i = 0; i <= steps; i++) {
      const q = cellOf(pl, { x: a.x + ((b.x - a.x) * i) / steps, y: a.y + ((b.y - a.y) * i) / steps });
      if (q < 0 || list[q] === on) continue;
      list[q] = on; changed = true;
      if (on && pl === "grid") last = q;
    }
    if (changed) act(pl === "grid" ? { cells: list, last } : { slices: list, zoom: true });
  };
  const setOne = (pl: string, q: number, on: boolean) => {
    const o = cur(), list = listOf(o, pl).slice();
    list[q] = on;
    act(pl === "grid" ? { cells: list, last: on ? q : o.last } : { slices: list, zoom: true });
    api.sfx.tick();
  };
  const stroke = useRef<any>(null);
  const drag = useDrag((pl: any, p: any, moved: boolean) => {
    const s = stroke.current || { p0: p, last: p, mode: null };
    stroke.current = null;
    if (!(pl === "grid" ? gridLive : stripLive)) return;
    if (moved) {
      if (s.mode === null) { const q0 = cellOf(pl, s.p0); s.mode = !(q0 >= 0 && listOf(cur(), pl)[q0]); }
      paint(pl, s.last, p, s.mode);
      api.sfx.tick();
      return;
    }
    const q = cellOf(pl, p);
    if (q >= 0) setOne(pl, q, !listOf(cur(), pl)[q]);
  });
  useEffect(() => {
    const d = drag.drag;
    if (!d) return;
    if (!stroke.current) stroke.current = { p0: { x: d.x, y: d.y }, last: { x: d.x, y: d.y }, mode: null };
    const s = stroke.current;
    if (!d.moved) return;
    if (s.mode === null) { const q0 = cellOf(d.payload, s.p0); s.mode = !(q0 >= 0 && listOf(cur(), d.payload)[q0]); }
    paint(d.payload, s.last, { x: d.x, y: d.y }, s.mode);
    s.last = { x: d.x, y: d.y };
  }, [drag.drag]);
  const canAnswer = () => !free && stage === "ask" && item.pad === "enter" && cur().fresh && built(cur()) > 0;
  const keysOf = (pl: string) => (e: any) => {
    if (e.key === " " || (e.key === "Enter" && !canAnswer())) {
      e.preventDefault(); e.stopPropagation();
      const q = listOf(cur(), pl).findIndex((v: boolean) => !v);
      if (q >= 0) setOne(pl, q, true);
    } else if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault(); e.stopPropagation();
      const l = listOf(cur(), pl);
      let q = l.length - 1;
      while (q >= 0 && !l[q]) q--;
      if (q >= 0) setOne(pl, q, false);
    }
    /* Enter with shading made since the last answer passes to the window, which answers (PATTERNS §5b) */
  };

  /* ── Scatter: the same number of squares, new places; the cards do not move ── */
  const scatter = () => {
    const o = cur(), from = hgRange(0, 100).filter((q) => o.cells[q]);
    if (!from.length) return;
    const mix = (a: number[]) => a.map((v) => [Math.random(), v]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
    const to = [...mix(hgRange(0, 100).filter((q) => !o.cells[q])), ...mix(from)].slice(0, from.length);
    setDemo(null);
    if (reducedMotion()) { put({ cells: hgFill(to), last: -1 }); api.sfx.tick(); return; }
    put({ cells: hgFill(to), last: -1, fly: { from: mix(from), to, go: false } });
    /* a step's fn runs as the step starts: paint the squares where they were, then send them, then land them */
    tf.run([[40, null], [1100, () => put({ fly: { ...cur().fly, go: true } })], [0, () => put({ fly: null })]], () => api.sfx.tick());
  };
  /* the delight: the first shading of phase 3 drifts to new places as it is won, and the card stays */
  useEffect(() => { if (stage === "win" && kind === "shade" && index === 0) scatter(); }, [stage]);

  /* the traceback: steps on the demo layer, ending on the whole right answer; the child's own shading stays */
  const stepsOf = () => {
    if (!it) return 0;
    switch (it.kind) {
      case "cut": case "tenth": case "slices": return 11;
      case "one": return 2;
      case "read": case "readf": return it.cols + it.ones + 1;
      case "shade": return it.answer + 1;
      case "who": return 3;
      case "thou": return it.th + 1;
      case "thouf": return 7;
    }
    return 1;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    put({ fresh: false });
    const max = stepsOf(), gap = Math.max(90, Math.min(420, Math.round(2400 / max)));
    const steps: any[] = [[300, null]];
    for (let i = 1; i <= max; i++) steps.push([i === max ? 700 : gap, () => setDemo({ k, step: i })]);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* Enter answers a count made on the working area, only when there is new shading since the last answer */
  api.onEnter(!free && item.pad === "enter" ? () => { const o = cur(); if (o.fresh && built(o) > 0) api.submit(built(o)); } : null);
  HOOK.set = (v: any) => {
    const m = Math.max(0, Math.min(kind === "slices" ? 10 : 100, Math.round(Number(v) || 0)));
    if (kind === "slices") act({ zoom: true, slices: hgFill(hgRange(0, m), 10) });
    else act({ cells: hgFill(hgRange(0, m)), last: m - 1 });
    return true;
  };
  HOOK.type = (v: any) => { api.setTyped(String(v)); return true; };

  /* what the host and the agent read back (toolApi.getState) */
  const ownCount = hgCount(own.cells), ownCols = hgFull(own.cells);
  api.share({ shaded: ownCount, columns: ownCols, squares: ownCount - 10 * ownCols, zoom: !!zoomOpen, slices: hgCount(own.slices),
    answer: !free && item.pad === "enter" ? built(own) : null });

  /* ── the picture ── */
  const blue = CONTENT.hundred, green = CONTENT.one, amber = CONTENT.ten;
  const blueInk = shade(blue, 0.25), greenInk = shade(green, 0.25), amberInk = shade(amber, 0.45), labInk = shade(C.dim, 0.42);
  const S = HG.s, gx = HG.gx, gy = HG.gy;
  const gridOn = childGrid ? own.cells : hgGiven(it);
  const gridFill = childGrid && reveal ? green : blue;
  const p4 = kind === "slices" || kind === "thou" || kind === "thouf";
  const slicesOn = kind === "slices" || kind === "free" ? own.slices : hgGivenSlices(it);
  const sliceCount = hgCount(slicesOn);
  const colKinds = kind === "cut" || kind === "one";
  const lifted = colKinds ? own.cut || ds > 0 || reveal : kind === "tenth" ? ds > 0 : false;
  const fly = own.fly;
  const shown = fly ? gridOn.map((v: boolean, q: number) => v && !fly.to.includes(q)) : gridOn;
  const readK = kind === "read" || kind === "readf";
  const rmax = readK ? it.cols + it.ones + 1 : 0;
  const rs = readK ? (reveal ? rmax : ds) : 0;
  const hRead = readK ? it.cols * 10 + it.ones : 0;
  const shadeMax = kind === "shade" ? it.answer + 1 : 0;

  const label = (x: number, y: number, s: string, fill: string, size = T.micro, anchor = "middle") => (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={fill}>{s}</text>
  );
  const button = (id: string, slot: number, text: string, onPress: () => void, enabled: boolean, aria: string) => (
    <Key id={id} x={HG.bx} y={HG_SLOT[slot]} w={HG.bw} h={HG.bh} C={C} onClick={onPress} disabled={!enabled} label={aria}>
      <text x={0} y={10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(text)}</text>
    </Key>
  );
  const colsSquares = (cols: number, all: number) => `${cols} ${tx(cols === 1 ? "column" : "columns")} ${all - 10 * cols} ${tx(all - 10 * cols === 1 ? "square" : "squares")}`;

  /* the cards for this question */
  let cards: any = null;
  if (kind === "one") cards = reveal || ds >= 2 ? hgCards(C, tx, ["1", "100"], "result", "0.01", "result") : hgCards(C, tx, null, "blank", null, "blank");
  else if (readK) cards = rs >= rmax ? hgCards(C, tx, [String(hRead), "100"], "result", kind === "read" ? it.answer : hgDec(hRead, 2), "result") : hgCards(C, tx, null, "blank", null, "blank");
  else if (kind === "shade") cards = reveal ? hgCards(C, tx, [String(it.answer), "100"], "result", it.dec, "result")
    : hgCards(C, tx, ds >= shadeMax ? [String(it.answer), "100"] : null, ds >= shadeMax ? "result" : "blank", it.dec, "given");
  else if (kind === "slices") cards = sliceCount > 0 ? hgCards(C, tx, [String(sliceCount), "1000"], reveal ? "result" : "given", hgDec(sliceCount, 3), reveal ? "result" : "given") : hgCards(C, tx, null, "blank", null, "blank");
  else if (kind === "thou") cards = reveal || ds >= it.th + 1 ? hgCards(C, tx, [String(it.th), "1000"], "result", hgDec(it.th, 3), "result", reveal ? undefined : 4) : hgCards(C, tx, null, "blank", null, "blank");
  else if (kind === "thouf") cards = reveal || ds >= 7 ? hgCards(C, tx, [String(it.th), "1000"], "result", hgDec(it.th, 3), "result") : hgCards(C, tx, null, "blank", null, "blank");
  else if (kind === "free") cards = ownCount > 0 ? hgCards(C, tx, [String(ownCount), "100"], "given", hgDec(ownCount, 2), "given") : hgCards(C, tx, null, "blank", null, "blank");

  /* the counter under the grid */
  let counter: string | null = null;
  if (kind === "tenth" || kind === "free") counter = colsSquares(ownCols, ownCount);
  else if (kind === "shade") counter = ds >= 1 && ownCount > 0 ? `${ownCount} ${tx("hundredths")}` : colsSquares(ownCols, ownCount);
  else if (readK && rs >= 1) {
    const t = Math.min(rs, it.cols) * 10 + Math.max(0, Math.min(rs - it.cols, it.ones));
    counter = rs >= rmax ? `${hRead} ${tx("hundredths")}` : `${t} ${tx("squares")}`;
  } else if (kind === "thouf" && (reveal || ds >= 6)) counter = `${it.th} ${tx("thousandths")}`;

  const runsShown = kind === "tenth" || kind === "shade" || kind === "slices" || kind === "free";
  const runsN = kind === "slices" ? sliceCount : ownCount;

  const gridProps = gridLive ? { ...control("hg-grid", "Hundred grid: drag or tap to shade, Space adds a square, Enter answers"), ...drag.bind("grid"), onKeyDown: keysOf("grid") } : {};
  const stripProps = stripLive ? { ...control("hg-strip", "Zoomed square: drag or tap to shade a slice, Space adds a slice, Enter answers"), ...drag.bind("strip"), onKeyDown: keysOf("strip") } : {};

  return (
    <g>
      {/* the running count: how many squares (slices on the last phase) are shaded; never a score */}
      {runsShown && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={28} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>{runsN}</text>
          <text x={118} y={-46} fontSize={T.micro} fontWeight={600} fill={labInk}>{tx(kind === "slices" ? "slices shaded" : "squares shaded")}</text>
        </g>
      )}

      {/* labels above the grid */}
      {kind === "who" ? (
        <g>
          {label(gx + 5 * S, 40, "A", C.ink, T.label)}
          {label(HG.b2 + 5 * S, 40, "B", C.ink, T.label)}
        </g>
      ) : label(gx + 5 * S, 40, tx("Whole"), labInk)}
      {colKinds && !lifted && label(gx + 9.5 * S, 40, tx("1 tenth"), amberInk)}

      {/* the grid (a drag surface while the child shades it) */}
      <g {...gridProps}>
        {hgSquares("g", gx, gy, S, shown, gridFill, colKinds && lifted ? (q: number) => q >= 90 : undefined)}
        {colKinds && lifted && <rect x={gx + 9 * S} y={gy} width={S} height={10 * S} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />}
        <rect x={gx} y={gy} width={10 * S} height={10 * S} fill="none" stroke={HG_LINE} strokeWidth={3} />
      </g>
      {kind === "who" && (
        <g>
          {hgSquares("b", HG.b2, gy, S, hgFill(HG_B), blue)}
          <rect x={HG.b2} y={gy} width={10 * S} height={10 * S} fill="none" stroke={HG_LINE} strokeWidth={3} />
        </g>
      )}
      {colKinds && !lifted && <rect x={gx + 9 * S} y={gy} width={S} height={10 * S} fill="none" stroke={amber} strokeWidth={5} pointerEvents="none" />}

      {/* phase 4: the square that zooms, its slices drawn inside it once it is open */}
      {p4 && zoomOpen && slicesOn.map((v: boolean, i: number) => v && (
        <rect key={"zs" + i} x={gx + 9 * S + (i * S) / 10} y={gy + 9 * S} width={S / 10} height={S} fill={kind === "slices" && reveal ? green : blue} pointerEvents="none" />
      ))}
      {(p4 || (kind === "free" && own.zoom)) && <rect x={gx + 9 * S} y={gy + 9 * S} width={S} height={S} fill="none" stroke={amber} strokeWidth={5} pointerEvents="none" />}

      {/* phase 1: the column lifted out and spread, ten squares under the words 1 tenth */}
      {lifted && (
        <g pointerEvents="none">
          {label(HG.lx + S / 2, 40, tx("1 tenth"), amberInk)}
          {hgRange(0, 10).map((r) => (
            <rect key={"l" + r} x={HG.lx} y={gy + r * HG.lg} width={S} height={S} fill={kind === "one" && r === 0 ? blue : HG_WARM} stroke={HG_LINE} strokeWidth={1.5} />
          ))}
          <text x={HG.lx + S + 14} y={gy + 30} fontSize={T.micro} fontWeight={600} fill={blueInk}>{tx("1 hundredth")}</text>
        </g>
      )}

      {/* phase 4: the zoomed strip, one square cut into ten thin slices */}
      {(p4 || kind === "free") && zoomOpen && (
        <g>
          <line x1={gx + 10 * S} y1={gy + 9 * S} x2={HG.sx} y2={HG.sy} stroke={HG_LINE} strokeWidth={1.5} />
          <line x1={gx + 10 * S} y1={gy + 10 * S} x2={HG.sx} y2={HG.sy + HG.sh} stroke={HG_LINE} strokeWidth={1.5} />
          {!(kind === "slices" && (reveal || ds >= 11)) && label(HG.sx, HG.sy - 16, tx("1 thousandth"), blueInk, T.micro, "start")}
          {label(HG.sx + HG.sw, HG.sy - 16, tx("1 hundredth"), labInk, T.micro, "end")}
          <g {...stripProps}>
            {hgRange(0, 10).map((i) => (
              <rect key={"s" + i} x={HG.sx + (i * HG.sw) / 10} y={HG.sy} width={HG.sw / 10} height={HG.sh}
                fill={slicesOn[i] ? (kind === "slices" && reveal ? green : blue) : HG_WARM} stroke={HG_LINE} strokeWidth={1.5} />
            ))}
            <rect x={HG.sx} y={HG.sy} width={HG.sw} height={HG.sh} fill="none" stroke={HG_LINE} strokeWidth={3} />
          </g>
        </g>
      )}

      {cards}

      {/* the controls: Cut column (phase 1), Scatter (phase 3), Zoom (phase 4), Clear */}
      {colKinds && button("hg-cut", 1, own.cut ? "Put back" : "Cut column", () => { act({ cut: !cur().cut }); api.sfx.tick(); }, live, own.cut ? "Put the column back" : "Cut column")}
      {(kind === "shade" || kind === "free") && button("hg-scatter", kind === "free" ? 1 : 0, "Scatter", scatter, live && ownCount > 0, "Scatter")}
      {((kind === "slices" && !own.zoom) || kind === "free") && button("hg-zoom", 0, "Zoom", () => { act({ zoom: !cur().zoom }); api.sfx.tick(); }, live, "Zoom")}
      {(kind === "tenth" || kind === "shade" || (kind === "slices" && own.zoom) || kind === "free") &&
        button("hg-clear", kind === "free" ? 2 : 1, "Clear", () => { act({ cells: hgFill([]), slices: hgFill([], 10), last: -1 }); api.sfx.tick(); },
          live && (ownCount > 0 || hgCount(own.slices) > 0), "Clear")}

      {counter !== null && label(gx + 5 * S, 512, counter, C.ink, T.label)}

      {/* the demo layer: worked steps, numbers and lit places; never takes a press */}
      <g pointerEvents="none">
        {/* phase 1: the lifted squares counted one to ten, ending on 10 hundredths */}
        {lifted && (kind === "cut" || kind === "tenth") && hgRange(0, 10).map((r) => (reveal || ds > r) && (
          <text key={"ln" + r} x={HG.lx + S / 2} y={gy + r * HG.lg + 31} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={HG_LINE}>{r + 1}</text>
        ))}
        {(kind === "cut" || kind === "tenth") && (reveal || ds >= 11) && label(HG.lx + S + 14, 300, "10 " + tx("hundredths"), greenInk, T.prompt, "start")}
        {kind === "one" && (reveal || ds >= 1) && <rect x={HG.lx - 4} y={gy - 4} width={S + 8} height={S + 8} fill="none" stroke={amber} strokeWidth={5} />}

        {/* phase 2: full columns counted in tens, then the single squares */}
        {readK && hgRange(0, it.cols).map((c) => rs > c && (
          <text key={"t" + c} x={gx + c * S + S / 2} y={gy + 29} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">10</text>
        ))}
        {readK && !reveal && ds >= 1 && ds <= it.cols && <rect x={gx + (ds - 1) * S} y={gy} width={S} height={10 * S} fill="none" stroke={amber} strokeWidth={5} />}
        {readK && hgRange(0, it.ones).map((j) => rs > it.cols + j && (
          <rect key={"o" + j} x={gx + it.cols * S + 2} y={gy + j * S + 2} width={S - 4} height={S - 4} fill="none" stroke={amber} strokeWidth={4} />
        ))}

        {/* phase 3: a second grid with the asked number of single squares, and the square one too many */}
        {kind === "shade" && ds >= 1 && (
          <g>
            {hgSquares("m", HG.mx, HG.my, HG.ms, hgFill(hgRange(0, Math.min(ds, it.answer))), green)}
            <rect x={HG.mx} y={HG.my} width={10 * HG.ms} height={10 * HG.ms} fill="none" stroke={HG_LINE} strokeWidth={2} />
            {ds >= shadeMax && label(HG.cx + HG.cw / 2, 440, `${it.answer} ${tx(it.answer === 1 ? "square" : "squares")}`, greenInk, T.label)}
            {ownCount === it.answer + 1 && own.last >= 0 && (
              <rect x={gx + Math.floor(own.last / 10) * S - 3} y={gy + (own.last % 10) * S - 3} width={S + 6} height={S + 6} fill="none" stroke={amber} strokeWidth={5} />
            )}
          </g>
        )}
        {kind === "who" && (reveal || ds >= 1) && label(gx + 5 * S, 512, `${hgCount(hgGiven(it))} ${tx("squares")}`, greenInk, T.label)}
        {kind === "who" && (reveal || ds >= 2) && label(HG.b2 + 5 * S, 512, `${HG_B.length} ${tx("squares")}`, greenInk, T.label)}
        {kind === "who" && (reveal || ds >= 3) && label((gx + 10 * S + HG.b2) / 2, 280, tx("Both"), greenInk, T.prompt)}

        {/* phase 4: slices numbered, hundredths turned into ten thousandths each */}
        {kind === "slices" && zoomOpen && hgRange(0, 10).map((i) => (reveal || ds > i) && (
          <text key={"sn" + i} x={HG.sx + (i + 0.5) * (HG.sw / 10)} y={HG.sy + 50} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={slicesOn[i] ? "#FFFFFF" : HG_LINE}>{i + 1}</text>
        ))}
        {kind === "slices" && zoomOpen && (reveal || ds >= 11) && label(HG.sx, HG.sy - 16, "10 " + tx("thousandths"), greenInk, T.micro, "start")}
        {kind === "thou" && hgRange(0, it.th).map((i) => (reveal || ds > i) && (
          <text key={"tn" + i} x={HG.sx + (i + 0.5) * (HG.sw / 10)} y={HG.sy + 50} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{i + 1}</text>
        ))}
        {kind === "thouf" && hgRange(0, Math.floor(it.th / 10)).map((r) => (reveal || ds > r) && (
          <text key={"tt" + r} x={gx + S / 2} y={gy + r * S + 29} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">10</text>
        ))}
        {kind === "thouf" && (reveal || ds >= 5) && hgRange(0, it.th % 10).map((i) => (
          <text key={"tf" + i} x={HG.sx + (i + 0.5) * (HG.sw / 10)} y={HG.sy + 50} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">1</text>
        ))}
      </g>

      {/* Scatter: the shaded squares lift off and settle in new places */}
      {fly && (
        <g pointerEvents="none">
          {fly.from.map((q: number, i: number) => {
            const a = fly.go ? fly.to[i] : q;
            return (
              <rect key={"f" + i} x={0} y={0} width={S} height={S} fill={gridFill} stroke={HG_LINE} strokeWidth={1.2} filter="url(#fLift)"
                style={{ transform: `translate(${gx + Math.floor(a / 10) * S}px, ${gy + (a % 10) * S}px)`, transition: "transform 1000ms cubic-bezier(.3,.1,.3,1)" } as any} />
            );
          })}
        </g>
      )}

      {/* a finger on the outlined column (phase 1) or the outlined square (phase 4) is the whole way in */}
      {colKinds && !lifted && live && <Hit id="hg-col" x={gx + 9 * S - 15} y={gy} w={72} h={10 * S} onPress={() => { act({ cut: true }); api.sfx.tick(); }} label="Cut column" />}
      {kind === "slices" && !zoomOpen && live && <Hit id="hg-zsq" x={gx + 9 * S - 15} y={gy + 9 * S - 15} w={72} h={72} onPress={() => { act({ zoom: true }); api.sfx.tick(); }} label="Zoom" />}

      {/* the one invite */}
      {kind === "cut" && !lifted && live && <Invite x={gx + 9.5 * S} y={gy + 5 * S} r={50} C={C} />}
      {(kind === "tenth" || kind === "shade") && ownCount === 0 && live && ds === 0 && <Invite x={gx + S / 2} y={gy + S / 2} r={34} C={C} />}
      {kind === "slices" && live && !zoomOpen && <Invite x={gx + 9.5 * S} y={gy + 9.5 * S} r={40} C={C} />}
      {kind === "slices" && live && zoomOpen && sliceCount === 0 && ds === 0 && <Invite x={HG.sx + HG.sw / 20} y={HG.sy + HG.sh / 2} r={40} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, n, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const p: any = PHASES[(n || 1) - 1] || PHASES[0];
  const it: any = p.items[last.item] || {};
  const v = last.value;
  const s = 7, x0 = 12, y0 = Math.round((h - 10 * s) / 2);
  const ink = shade(CONTENT.one, 0.25);
  const strip = it.kind === "slices" || it.kind === "thou";
  const on = it.kind === "tenth" || it.kind === "shade" ? hgFill(hgRange(0, Number(v) || 0)) : hgGiven(it);
  const sl = it.kind === "slices" ? hgFill(hgRange(0, Number(v) || 0), 10) : hgGivenSlices(it);
  const frac = Array.isArray(it.answer) ? it.answer : null;
  const word = it.choices ? tx((it.choices.find((c: any) => c.id === String(v)) || {}).label || String(v)) : null;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {strip ? (
        <g>
          {hgRange(0, 10).map((i) => <rect key={i} x={x0 + i * 10} y={y0 + 20} width={10} height={30} fill={sl[i] ? CONTENT.hundred : HG_WARM} stroke={HG_LINE} strokeWidth={0.8} />)}
        </g>
      ) : (
        <g>
          {hgSquares("t", x0, y0, s, on, CONTENT.hundred)}
          <rect x={x0} y={y0} width={10 * s} height={10 * s} fill="none" stroke={HG_LINE} strokeWidth={1.5} />
        </g>
      )}
      {frac ? (
        <g>
          <text x={w - 64} y={h / 2 - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{String(frac[0])}</text>
          <line x1={w - 102} y1={h / 2} x2={w - 26} y2={h / 2} stroke={HG_LINE} strokeWidth={3} strokeLinecap="round" />
          <text x={w - 64} y={h / 2 + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{String(frac[1])}</text>
        </g>
      ) : (
        <text x={w - 16} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={ink}>{word || String(v)}</text>
      )}
    </g>
  );
}

function HundredGrid(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, pointKey: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default HundredGrid;
