/* ═══ M1.S2.T4.C18.2D1 · decimal_reader · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C5.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "decimal_reader";
const MEDIA_ID = "M1.S2.T4.C18.2D1";
const TOOL_NAME = "Decimal Reader";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A decimal on the tiles, waiting to be read aloud."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Two readings of one number, and both of them right.";
/* said when the child opens Free play from the summary page (free play sets tiles and reads them both ways) */
const FREE_LINE = "Free play. Set any decimal on the tiles, then read it both ways.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = { hi: {}, gu: {} };

/* One entry per phase = one mount. Items of this tool:
   kind "and" | "point" | "both": a reading built from word chips in the rows under the tiles
        (rows: which rows the child builds, top = with and, bottom = with point; bank: the chips on offer,
        each a stamp that can be used again; given: the top row already built; first: the row that starts
        live; answer: the reading in words, "top|bottom" when both; near: the item's misconception)
   kind "write": a decimal built on the tiles from its words (words: the tray in reading order; whole and
        num: their digits; place: 1 tenths, 2 hundredths, 3 thousandths; answer: the decimal as written)
   Every answer is made on the working area (pad: "enter"); Enter sends what the rows or tiles hold. */
const PHASES = [
  {
    n: 1,
    concept: "Reading with and",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O5"],
    says: ["Say the whole number, then and. Which place is the last digit in?"],
    ladder: ["Name the place of the last digit.", "Whole number, then and, then the number after the point, then the last place."],
    closing: "So the whole number comes first, then and for the point. The last digit's place ends it.",
    learned: "You learned: say and for the point, then name the last digit's place.",
    traceback: "The digits after the point light together under one bracket, the place name under the last tile lights, and the right reading is laid out word by word.",
    items: [
      { qid: "M1.S2.T4.C15:DR1", kind: "and", rows: "and", dec: "312.46", pad: "enter", winMs: 3600,
        bank: ["forty-six", "and", "tenths", "three hundred twelve", "six", "hundredths", "four"],
        answer: "three hundred twelve and forty-six hundredths", near: "three hundred twelve and forty-six tenths",
        say: "Read the decimal on the tiles with and. Drag or tap words into the row, then press Enter.",
        ask: "Read 312.46 with and", miss: "Which tile holds the last digit? Its name ends the reading." },
      { qid: "M1.S2.T4.C15:1", kind: "and", rows: "and", dec: "4.3", pad: "enter", winMs: 3000,
        bank: ["tenths", "four", "hundredths", "and", "three"],
        answer: "four and three tenths", near: "four and three",
        say: "Now one digit after the point. Build its reading the same way.",
        ask: "Now read 4.3 with and", miss: "Look at the strip under the digit after the point." },
      { qid: "M1.S2.T4.C15:4", kind: "and", rows: "and", dec: "106.72", pad: "enter", winMs: 3600,
        bank: ["seventy-two", "hundredths", "one hundred six", "and", "seven", "two", "tenths"],
        answer: "one hundred six and seventy-two hundredths", near: "one hundred six and seven two hundredths",
        say: "One more with and. Mind the zero inside the whole number.",
        ask: "Read 106.72 with and", miss: "The digits after the point are read together as one number." },
    ],
  },
  {
    n: 2,
    concept: "Reading with point",
    conceptId: "M1.S2.T4.C16", objectiveIds: ["O5"],
    says: ["Now say point, and one digit at a time. Both ways are right."],
    ladder: ["Say point, then name each digit in order.", "Whole number, then point, then one word per digit."],
    closing: "With point, every digit after the point gets its own word.",
    learned: "You learned: with point, each digit after the point is said alone.",
    traceback: "Each digit after the point lights in turn, a zero too, and the right point reading is laid out one word per digit.",
    items: [
      { qid: "M1.S2.T4.C16:DR2", kind: "point", rows: "point", dec: "9.305", pad: "enter", winMs: 3400,
        given: ["nine", "and", "three hundred five", "thousandths"],
        bank: ["three", "point", "nine", "three hundred five", "zero", "five", "and"],
        answer: "nine point three zero five", near: "nine point three hundred five",
        say: "The reading with and is in the top row. Build the reading with point under it.",
        ask: "Now read 9.305 with point", miss: "With point, the digits after it are never joined into one number." },
      { qid: "M1.S2.T4.C16:2", kind: "point", rows: "point", dec: "27.58", pad: "enter", winMs: 3400,
        given: ["twenty-seven", "and", "fifty-eight", "hundredths"],
        bank: ["five", "twenty-seven", "fifty-eight", "point", "eight", "and"],
        answer: "twenty-seven point five eight", near: "twenty-seven point fifty-eight",
        say: "A new decimal, its and reading already up top. Now the point way.",
        ask: "Now read 27.58 with point", miss: "Give each digit after the point its own word." },
      { qid: "M1.S2.T4.C16:8", kind: "both", rows: "both", dec: "30.04", pad: "enter", winMs: 4200, first: "B",
        bank: ["point", "four", "thirty", "zero", "and", "hundredths", "tenths"],
        answer: "thirty and four hundredths|thirty point zero four", near: "thirty and four hundredths|thirty point four",
        say: "Build both rows yourself this time. Tap a row's name to work in it.",
        ask: "Now read 30.04 both ways", miss: "Every digit after the point is said, the zero too." },
    ],
  },
  {
    n: 3,
    concept: "When the whole number part is zero",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O5"],
    says: ["The whole number part is zero. Say it both ways."],
    ladder: ["Add the name of the last digit's place.", "With point, say the zero first. With and, you may leave it out."],
    closing: "A zero whole part may be read with zero and, or without it.",
    learned: "You learned: a zero whole part may be read with zero and, or without.",
    traceback: "The zero whole part and the digits after the point light, the last place name lights, and the right readings are laid out.",
    items: [
      { qid: "M1.S2.T4.C17:DR3", kind: "both", rows: "both", dec: "0.26", pad: "enter", winMs: 4200, first: "A",
        bank: ["two", "zero", "twenty-six", "point", "and", "six", "hundredths", "tenths"],
        answer: "twenty-six hundredths|zero point two six", near: "twenty-six|zero point two six",
        say: "Build the reading with and first, then the one with point.",
        ask: "Now read 0.26 both ways", miss: "A decimal part ends with the name of its last place." },
      { qid: "M1.S2.T4.C17:3", kind: "point", rows: "point", dec: "0.9", pad: "enter", winMs: 3000,
        bank: ["nine", "point", "zero", "and", "tenths"],
        answer: "zero point nine", near: "point nine",
        say: "Only the point way this time.",
        ask: "Now read 0.9 with point", miss: "Start with the whole number part, even when it is zero." },
      { qid: "M1.S2.T4.C17:6", kind: "and", rows: "and", dec: "0.415", pad: "enter", winMs: 4000,
        bank: ["thousandths", "four hundred fifteen", "zero", "and", "four", "one", "five", "hundredths"],
        answer: "four hundred fifteen thousandths", near: "four hundred fifteen",
        say: "Now the and way. Try the zero and switch as well.",
        ask: "Now read 0.415 with and", miss: "The three digits after the point make one number." },
    ],
  },
  {
    n: 4,
    concept: "From words to a decimal",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O6"],
    says: ["Hundredths need two places after the point. Which place is empty?"],
    ladder: ["Count the places the last word needs.", "Put the last digit in the place the last word names."],
    closing: "A decimal is written from its words, with a 0 in every empty place after the point.",
    learned: "You learned: write a 0 in every empty place after the point.",
    traceback: "The place named by the last word lights, the places before it light one by one, and the right decimal is laid out with a grey 0 in the empty place.",
    items: [
      { qid: "M1.S2.T4.C18:DR4", kind: "write", words: ["eight", "and", "nineteen", "thousandths"], whole: "8", num: "19", place: 3,
        answer: "8.019", near: "8.19", pad: "enter", winMs: 3800,
        say: "Write eight and nineteen thousandths as a decimal. Drag each word onto the place strip.",
        ask: "Write it as a decimal", miss: "Thousandths need three places after the point." },
      { qid: "M1.S2.T4.C18:5", kind: "write", words: ["sixty", "and", "five", "tenths"], whole: "60", num: "5", place: 1,
        answer: "60.5", near: "60.05", pad: "enter", winMs: 3400,
        say: "Now sixty and five tenths.",
        ask: "Write it as a decimal", miss: "One place after the point is all that tenths need." },
      { qid: "M1.S2.T4.C18:7", kind: "write", words: ["twelve", "and", "six", "hundredths"], whole: "12", num: "6", place: 2,
        answer: "12.06", near: "12.6", pad: "enter", winMs: 4200,
        say: "Last one: twelve and six hundredths.",
        ask: "Write it as a decimal", miss: "Hundredths is the second place after the point." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const DR = { tw: 124, th: 84, pitch: 186, pgap: 112, ty: 6, ly: 124, rowA: 140, rowB: 222, rh: 72, lane: 112, my: 304, mh: 44, by: 360, bh: 76, zw: 220 };
const MODEL = { tiles: "one tile a place, 124 x 84 at a 186 pitch, the point in its own slot", places: ["Hundreds", "Tens", "Ones", "Tenths", "Hundredths", "Thousandths"],
  rows: { withAnd: DR.rowA, withPoint: DR.rowB, height: DR.rh }, answerLane: DR.my, bank: DR.by, writePlaces: ["Tens", "Ones", "Tenths", "Hundredths", "Thousandths"] };

const DR_PLACES = ["tenths", "hundredths", "thousandths"];
const DR_NAMES = ["Hundreds", "Tens", "Ones", "Tenths", "Hundredths", "Thousandths"];
const drNorm = (s: any) => String(s ?? "").toLowerCase().replace(/\s+/g, " ").trim();
const drRowsOf = (it: any) => (it.rows === "both" ? ["A", "B"] : it.rows === "and" ? ["A"] : ["B"]);
/* one reading against the one asked for; a zero whole part read with and may keep or drop "zero and" */
const drRowOk = (it: any, want: string, got: string, isAnd: boolean) => {
  const g = drNorm(got), w = drNorm(want);
  if (!g) return false;
  if (g === w) return true;
  return isAnd && /^0\./.test(String(it.dec)) && (g === "zero and " + w || "zero and " + g === w);
};
/* every word a row may hold for this item */
const drPool = (it: any) => Array.from(new Set([...(it.bank || []), ...(it.given || []), "zero", "and"]));
/* a reading cut into the chips it is built from (longest chip first) */
function drChipsOf(s: any, words: string[]) {
  const ws = [...words].sort((a, b) => b.length - a.length);
  let rest = drNorm(s);
  const out: string[] = [];
  while (rest) {
    const w = ws.find((x) => rest === x || rest.startsWith(x + " "));
    if (!w) return null;
    out.push(w);
    rest = rest.slice(w.length).trim();
  }
  return out;
}
const drChipW = (c: string, size = T.label, pad = 28, min = 84) => Math.max(min, Math.round(String(c).length * size * 0.58 + pad));
/* chips laid left to right from x0 */
function drLay(chips: string[], x0: number, size = T.label, gap = 10, pad = 28, min = 84) {
  let x = x0;
  return chips.map((c) => { const w = drChipW(c, size, pad, min); const e = { c, x, w }; x += w + gap; return e; });
}
/* the word bank: chips wrapped into lines and centred, from x0 */
function drBank(words: string[], x0: number, y0 = DR.by) {
  const maxW = W.w - x0, lines: any[][] = [[]];
  let used = 0;
  words.forEach((c, k) => {
    const w = drChipW(c);
    if (lines[lines.length - 1].length && used + 12 + w > maxW) { lines.push([]); used = 0; }
    const L = lines[lines.length - 1];
    used += (L.length ? 12 : 0) + w;
    L.push({ c, k, w });
  });
  const out: any[] = [];
  lines.forEach((L, li) => {
    const tot = L.reduce((a: number, e: any) => a + e.w, 0) + 12 * (L.length - 1);
    let x = x0 + Math.round((maxW - tot) / 2);
    L.forEach((e: any) => { out.push({ ...e, x, y: y0 + li * (DR.bh + 10) }); x += e.w + 12; });
  });
  return out;
}
/* the tiles: nw whole places, nd places after the point, centred in the working area */
function drCols(nw: number, nd: number) {
  const gap = DR.pitch - DR.tw;
  const total = nw * DR.tw + (nw - 1) * gap + DR.pgap + nd * DR.tw + Math.max(nd - 1, 0) * gap;
  const x0 = Math.round((W.w - total) / 2), oR = x0 + (nw - 1) * DR.pitch + DR.tw;
  const xs = Array.from({ length: nw }, (_, k) => x0 + k * DR.pitch).concat(Array.from({ length: nd }, (_, j) => oR + DR.pgap + j * DR.pitch));
  return { nw, nd, xs, px: oR + DR.pgap / 2, names: DR_NAMES.slice(3 - nw, 3).concat(DR_NAMES.slice(3, 3 + nd)) };
}
/* free play: the two readings of what the tiles hold (Tens, Ones, then three places after the point) */
function drFree(d: string[], zero: boolean) {
  const whole = Number((d[0] || "") + (d[1] || "0"));
  let last = -1;
  for (let j = 0; j < 3; j++) if (d[2 + j] !== "") last = j;
  const decs = last < 0 ? "" : d.slice(2, 3 + last).map((x) => x || "0").join("");
  const ww = words(whole);
  if (!decs || !/[1-9]/.test(decs)) return { A: [ww], B: [ww], decs: "", whole };
  const A = (whole === 0 ? (zero ? ["zero", "and"] : []) : [ww, "and"]).concat([words(Number(decs)), DR_PLACES[decs.length - 1]]);
  const B = [ww, "point", ...decs.split("").map((c) => words(Number(c)))];
  return { A, B, decs, whole };
}
/* the right decimal of a write item, as digit cards under the five places (Tens, Ones, Tenths, ...) */
function drCards4(it: any) {
  const cols = drCols(2, 3), w = String(it.whole), d = String(it.answer).split(".")[1] || "";
  const out: any[] = [];
  w.split("").forEach((ch, k) => out.push({ ch, x: cols.xs[2 - w.length + k] + DR.tw / 2 }));
  out.push({ ch: ".", x: cols.px });
  d.split("").forEach((ch, j) => out.push({ ch, x: cols.xs[2 + j] + DR.tw / 2 }));
  return out;
}
/* the right reading(s), as groups of chips, for the answer lane */
const drModel = (it: any) => String(it.answer).split("|").map((r) => drChipsOf(r, drPool(it)) || [r]);

/* the win line of each question: one literal a question, so the voice can bake it */
function drWin(api: any, qid: string) {
  switch (qid) {
    case "M1.S2.T4.C15:DR1": api.say("Three hundred twelve and forty-six hundredths."); break;
    case "M1.S2.T4.C15:1": api.say("Four and three tenths."); break;
    case "M1.S2.T4.C15:4": api.say("One hundred six and seventy-two hundredths."); break;
    case "M1.S2.T4.C16:DR2": api.say("Nine point three zero five. Both rows say one number."); break;
    case "M1.S2.T4.C16:2": api.say("Twenty-seven point five eight."); break;
    case "M1.S2.T4.C16:8": api.say("Thirty point zero four. Thirty and four hundredths too."); break;
    case "M1.S2.T4.C17:DR3": api.say("Twenty-six hundredths, and zero point two six."); break;
    case "M1.S2.T4.C17:3": api.say("Zero point nine."); break;
    case "M1.S2.T4.C17:6": api.say("Four hundred fifteen thousandths, with zero and or without it."); break;
    case "M1.S2.T4.C18:DR4": api.say("8.019. The empty tenths place holds a 0."); break;
    case "M1.S2.T4.C18:5": api.say("60.5, with no empty place."); break;
    case "M1.S2.T4.C18:7": api.say("12.06, which is 12 6/100 as a mixed number."); break;
    default: break;
  }
}

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a reading row by row (a zero whole part with or without "zero and"); a decimal exactly as written */
const judge = (item: any, v: any) => {
  if (item.kind === "write") return String(v ?? "").trim() === String(item.answer);
  const want = String(item.answer).split("|"), got = String(v ?? "").split("|");
  if (want.length !== got.length) return false;
  const rs = drRowsOf(item);
  return want.every((w, k) => drRowOk(item, w, got[k], rs[k] === "A"));
};
/* oracle: every answer re-derived from the digits (or the words) by its own number namer */
const oracle = () => {
  const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen",
    "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const nm = (x: number): string => (x < 20 ? ones[x] : x < 100 ? tens[Math.floor(x / 10)] + (x % 10 ? "-" + ones[x % 10] : "")
    : ones[Math.floor(x / 100)] + " hundred" + (x % 100 ? " " + nm(x % 100) : ""));
  const back: any = {};
  for (let x = 0; x < 1000; x++) back[nm(x)] = x;
  const plc = ["tenths", "hundredths", "thousandths"];
  /* can this reading be built from the chips on offer? */
  const can = (s: string, pool: string[]): boolean => {
    if (!s) return true;
    return pool.some((w) => (s === w || s.indexOf(w + " ") === 0) && can(s.slice(w.length).trim(), pool));
  };
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "write") {
      const [w, a, f, pl] = it.words;
      const k = plc.indexOf(pl) + 1, fr = back[f];
      if (a !== "and" || k < 1 || back[w] === undefined || fr === undefined || String(fr).length > k) return false;
      const dec = String(back[w]) + "." + String(fr).padStart(k, "0");
      return dec === it.answer && String(back[w]) === it.whole && String(fr) === it.num && k === it.place;
    }
    const [w, d] = String(it.dec).split(".");
    const andR = (Number(w) ? nm(Number(w)) + " and " : "") + nm(Number(d)) + " " + plc[d.length - 1];
    const ptR = nm(Number(w)) + " point " + d.split("").map((c) => ones[Number(c)]).join(" ");
    const want = it.rows === "both" ? [andR, ptR] : it.rows === "and" ? [andR] : [ptR];
    const pool = (it.bank || []).concat(["zero", "and"]);
    return want.join("|") === it.answer && want.every((r) => can(r, pool)) && (!it.given || it.given.join(" ") === andR);
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.kind === "write" ? [String(item.answer), speakable(item.answer)]
  : String(item.answer).split("|").flatMap((w, k) => (drRowsOf(item)[k] === "A" && /^0\./.test(String(item.dec)) ? [w, "zero and " + w] : [w])));
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the slot shows a written decimal; a reading lives in the rows on the working area */
const format = (v: any) => (/[a-z]/i.test(String(v ?? "")) ? "" : String(v ?? ""));

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* a switch that reports its state (aria-pressed) */
function DRToggle({ id, x, y, w, h, on, onPress, label, text, C }: any) {
  const p = usePress(onPress);
  return (
    <g className={"c4-ctl" + (p.down ? " is-down" : "")} data-control={id} role="button" aria-label={label} aria-pressed={on ? "true" : "false"}
      tabIndex={0} {...p.bind()} onKeyDown={p.keys}>
      <rect x={x} y={y + EDGE} width={w} height={h} rx={18} fill={shade(C.rule, 0.08)} />
      <rect x={x} y={y + (p.down ? EDGE : 0)} width={w} height={h} rx={18} fill="url(#gKey)" stroke={on ? C.accent : C.rule} strokeWidth={on ? 3 : 2} />
      <rect x={x + 14} y={y + h / 2 - 15 + (p.down ? EDGE : 0)} width={52} height={30} rx={15} fill={on ? C.accent : tint(C.rule, 0.4)} stroke={on ? shade(C.accent, 0.2) : C.rule} strokeWidth={2} />
      <circle cx={x + (on ? 51 : 29)} cy={y + h / 2 + (p.down ? EDGE : 0)} r={11} fill="#FFFFFF" stroke={shade(C.rule, 0.2)} strokeWidth={1.5} />
      <text x={x + 78} y={y + h / 2 + 10 + (p.down ? EDGE : 0)} fontSize={T.micro} fontWeight={600} fill={C.ink}>{text}</text>
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Digit tiles over the place strip; under them the reading rows (top: with and, bottom: with point),
   the answer lane a correction fills, and the word bank. Phase 4: a Words tray whose chips go onto the
   place strip. stage === "free" is Free play: tap a tile to change its digit, tap a row's name to read. */
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const it: any = item || {};
  const free = stage === "free";
  const write = !free && it.kind === "write";
  const BLUE = shade(CONTENT.hundred, 0.25), GREEN = shade(CONTENT.one, 0.25), AMBER = CONTENT.ten, AMBER_INK = shade(CONTENT.ten, 0.45), GREY = "#767676";
  const sk = n + ":" + index;
  const fresh = () => ({ sk, A: [] as string[], B: [] as string[], act: it.first || (it.rows === "point" ? "B" : "A"), demo: null as any, judged: null as any,
    w4: { whole: false, and: false, place: false, end: null as any }, picked: false });
  const [raw, setRaw] = useState<any>(fresh);
  const st = raw.sk === sk ? raw : fresh();
  const S = useRef<any>(st);
  S.current = st;
  const put = (patch: any) => setRaw((p: any) => {
    const b = p.sk === sk ? p : fresh();
    return { ...b, ...(typeof patch === "function" ? patch(b) : patch) };
  });
  const busy = useRef(false);
  const canAct = () => !busy.current && (stage === "ask" || stage === "teach");
  const liveRows = stage === "ask" || stage === "teach";
  const done = stage === "win" || stage === "idle";

  /* free play: Tens, Ones, Tenths, Hundredths, Thousandths, and the two rows */
  const FP0 = { d: ["4", "6", "2", "9", ""], A: [] as string[], B: [] as string[], zero: false };
  const [fp, setFp] = useState<any>(FP0);
  useEffect(() => { if (free) { tl.stop(); setFp(FP0); } }, [free]);

  const editable = (r: string) => (r === "A" ? it.rows === "and" || it.rows === "both" : it.rows === "point" || it.rows === "both");
  const rowTop = (r: string) => (r === "A" ? DR.rowA : DR.rowB);
  const fits = (chips: string[]) => { const L = drLay(chips, DR.lane + 10); return !L.length || L[L.length - 1].x + L[L.length - 1].w <= W.w - 18; };
  const rowsNeeded = drRowsOf(it);
  const zeroItem = !write && /^0\./.test(String(it.dec || "")) && editable("A");

  /* ── acts (each wipes the correction's answer lane) ── */
  const dropWord = (word: string, at: any) => {
    if (!canAct() || write) return;
    const s = S.current;
    let r = s.act, pos = -1;
    if (at) {
      if (at.y >= DR.by - 8) return;
      const inRow = (q: string) => editable(q) && at.y >= rowTop(q) - 8 && at.y <= rowTop(q) + DR.rh + 4;
      if (inRow("A")) r = "A"; else if (inRow("B")) r = "B";
      if (inRow(r)) pos = drLay(s[r], DR.lane + 10).filter((e: any) => e.x + e.w / 2 < at.x).length;
    }
    if (!editable(r)) return;
    const row = s[r].slice();
    row.splice(pos < 0 ? row.length : pos, 0, word);
    if (!fits(row)) return;
    api.sfx.tick();
    put({ [r]: row, act: r, demo: null });
  };
  const takeOut = (r: string, k: number) => {
    if (!canAct()) return;
    put((b: any) => ({ [r]: b[r].filter((_: any, j: number) => j !== k), act: r, demo: null }));
  };
  const pickRow = (r: string) => { if (canAct()) put({ act: r, demo: null }); };
  const flipZero = () => {
    if (!canAct()) return;
    const A = S.current.A, on = A[0] === "zero" && A[1] === "and", next = on ? A.slice(2) : ["zero", "and", ...A];
    if (!fits(next)) return;
    api.sfx.tick();
    put({ A: next, act: "A", demo: null });
  };
  const digs = String(it.num || "");
  const place4 = (j: number) => {
    if (!canAct()) return;
    const end = Math.max(digs.length - 1, Math.min(2, j));
    api.sfx.tick();
    put((b: any) => ({ w4: { ...b.w4, end }, picked: false, demo: null }));
  };
  const col4 = (x: number) => {
    const cols = drCols(2, 3);
    let j = 0, best = 1e9;
    for (let q = 0; q < 3; q++) { const d = Math.abs(x - (cols.xs[2 + q] + DR.tw / 2)); if (d < best) { best = d; j = q; } }
    return j;
  };
  const drop4 = (role: string, at: any) => {
    if (!canAct() || !write) return;
    const s = S.current;
    const back = at && at.y >= DR.by - 8;
    if (role !== "num") {
      if (back && !s.w4[role]) return;
      api.sfx.tick();
      put((b: any) => ({ w4: { ...b.w4, [role]: back ? false : at ? true : !b.w4[role] }, demo: null }));
      return;
    }
    if (back) { put((b: any) => ({ w4: { ...b.w4, end: null }, picked: false, demo: null })); return; }
    if (!at) { put((b: any) => ({ picked: !b.picked, demo: null })); return; }
    place4(col4(at.x));
  };
  const drag = useDrag((p: any, at: any, moved: boolean) => {
    if (!p) return;
    const pt = moved && at && isFinite(at.x) && isFinite(at.y) ? at : null;
    if (p.kind === "bank") dropWord(p.word, pt);
    else if (p.kind === "w4") drop4(p.role, pt);
  });

  /* ── what the rows or tiles hold ── */
  const val4 = (s: any) => {
    if (!s.w4.whole || s.w4.end === null) return null;
    const end = s.w4.end, start = end - digs.length + 1;
    let out = "";
    for (let j = 0; j <= end; j++) out += j < start ? "0" : digs[j - start];
    return String(it.whole) + "." + out;
  };
  const valRead = (s: any) => (rowsNeeded.every((r) => s[r].length) ? rowsNeeded.map((r) => s[r].join(" ")).join("|") : null);
  const valueNow = () => (write ? val4(S.current) : valRead(S.current));

  /* Enter sends what the working area holds, and never the same work twice after a miss */
  api.onEnter(stage === "ask" && !free ? () => {
    if (busy.current) return;
    const v = valueNow();
    if (!v || v === S.current.judged) return;
    S.current = { ...S.current, judged: v };
    put({ judged: v });
    api.submit(v);
  } : null);

  /* the agent sets the rows (or the tiles) as a child would, then check() presses Enter */
  HOOK.set = (v: any) => {
    if (stage !== "ask" || free || busy.current) return false;
    if (write) {
      const m = /^(\d+)\.(\d+)$/.exec(String(v ?? "").trim());
      if (!m || m[1] !== String(it.whole)) return false;
      const end = m[2].length - 1, lead = m[2].slice(0, m[2].length - digs.length);
      if (end > 2 || !m[2].endsWith(digs) || /[^0]/.test(lead)) return false;
      const w4 = { whole: true, and: true, place: true, end };
      S.current = { ...S.current, w4, picked: false, demo: null };
      put({ w4, picked: false, demo: null });
      return true;
    }
    const parts = String(v ?? "").split("|");
    if (parts.length !== rowsNeeded.length) return false;
    const rows = parts.map((p) => drChipsOf(p, drPool(it)));
    if (rows.some((r) => !r)) return false;
    const patch: any = { demo: null };
    rowsNeeded.forEach((r, k) => { patch[r] = rows[k]; });
    S.current = { ...S.current, ...patch };
    put(patch);
    return true;
  };
  HOOK.check = () => undefined;

  /* ── the traceback: light the places, then lay out the whole right answer in the answer lane ── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    busy.current = true;
    const setD = (d: any) => put((b: any) => ({ demo: { ...(b.demo || {}), ...d } }));
    const steps: any[] = [[60, () => put({ demo: { tiles: [], model: 0 } })]];
    if (write) {
      const pl = it.place;
      steps.push([500, () => setD({ label: 1 + pl })]);
      for (let j = 0; j < pl; j++) steps.push([420, () => setD({ tiles: Array.from({ length: j + 1 }, (_, q) => 2 + q) })]);
      drCards4(it).forEach((_: any, k: number) => steps.push([240, () => setD({ model: k + 1 })]));
    } else {
      const [w, d] = String(it.dec).split(".");
      const nw = w.length, nd = d.length;
      const decCols = Array.from({ length: nd }, (_, j) => nw + j);
      const got = String(wrong.value ?? "").split("|"), want = String(it.answer).split("|");
      const bad = rowsNeeded.filter((r, k) => !drRowOk(it, want[k], got[k] ?? "", r === "A"));
      if (bad.includes("A")) {
        steps.push([480, () => setD({ tiles: decCols, bracket: true })]);
        steps.push([480, () => setD({ label: nw + nd - 1 })]);
      }
      if (bad.includes("B")) {
        const z = w === "0" ? [nw - 1] : [];
        steps.push([380, () => setD({ tiles: z, bracket: false })]);
        decCols.forEach((_, j) => steps.push([380, () => setD({ tiles: z.concat(decCols.slice(0, j + 1)) })]));
      }
      const count = drModel(it).reduce((a: number, g: string[]) => a + g.length, 0);
      for (let k = 1; k <= count; k++) steps.push([220, () => setD({ model: k })]);
    }
    tl.run(steps, () => { busy.current = false; api.lock(false); });
  }, [wrong]);
  /* a new question stops a correction still running */
  useEffect(() => () => { tl.stop(); if (busy.current) { busy.current = false; api.lock(false); } }, [index]);
  /* the win: the voice reads the whole reading */
  useEffect(() => { if (stage === "win" && !free) drWin(api, it.qid); }, [stage]);

  /* ── free play acts ── */
  const fpRead = (r: string) => {
    const R = drFree(fp.d, fp.zero), chips = r === "A" ? R.A : R.B;
    setFp((f: any) => ({ ...f, [r]: [] }));
    tl.run(chips.map((c: string, k: number) => [260, () => setFp((f: any) => ({ ...f, [r]: chips.slice(0, k + 1) }))]), () => {});
  };
  const fpTile = (k: number) => {
    tl.stop();
    api.sfx.tick();
    setFp((f: any) => {
      const d = f.d.slice(), c = d[k];
      d[k] = k === 1 ? String((Number(c || "0") + 1) % 10) : k === 0 ? (c === "" ? "1" : c === "9" ? "" : String(Number(c) + 1))
        : c === "" ? "1" : c === "9" ? "0" : c === "0" ? "" : String(Number(c) + 1);
      return { ...f, d, A: [], B: [] };
    });
  };
  const fpZero = () => {
    api.sfx.tick();
    setFp((f: any) => { const z = !f.zero; return { ...f, zero: z, A: f.A.length ? drFree(f.d, z).A : [] }; });
  };

  /* what the host and the agent read back (toolApi.getState) */
  const count = free ? fp.A.length + fp.B.length : write ? ["whole", "and", "place"].filter((k) => st.w4[k]).length + (st.w4.end !== null ? 1 : 0)
    : (editable("A") ? st.A.length : 0) + (editable("B") ? st.B.length : 0);
  api.share({ decimal: free ? null : write ? val4(st) : it.dec, readingAnd: st.A.join(" "), readingPoint: st.B.join(" "),
    zeroAnd: st.A[0] === "zero" && st.A[1] === "and", chips: count, answer: done ? typed || null : null });

  /* ── drawing ── */
  const g = drag.drag;
  const cols = free || write ? drCols(2, 3) : drCols(Math.max(1, String(it.dec).split(".")[0].length), (String(it.dec).split(".")[1] || "").length);
  const demo = st.demo || {};
  const lit = (k: number) => !!(demo.tiles && demo.tiles.includes(k));

  const tile = (k: number, ch: string, o: any = {}) => {
    const x = cols.xs[k], on = o.lit, zero = ch === "0";
    return (
      <g key={"t" + k} pointerEvents="none">
        <rect x={x} y={DR.ty} width={DR.tw} height={DR.th} rx={14} fill={on ? tint(AMBER, 0.82) : "#FFFFFF"}
          stroke={on ? AMBER : o.target ? C.accent : C.rule} strokeWidth={on ? 4 : o.target ? 3 : 2} strokeDasharray={o.target ? "10 8" : undefined} filter="url(#fShadowSoft)" />
        {ch && <text x={x + DR.tw / 2} y={DR.ty + DR.th / 2 + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700}
          fill={zero ? GREY : o.ink || BLUE} fillOpacity={o.ghost ? 0.45 : 1}>{ch}</text>}
      </g>
    );
  };
  const point = () => <circle key="pt" cx={cols.px} cy={DR.ty + DR.th - 16} r={11} fill={C.ink} pointerEvents="none" />;
  const label = (k: number, on: boolean) => {
    const cx = cols.xs[k] + DR.tw / 2, name = tx(cols.names[k]), lw = String(name).length * T.micro * 0.58;
    return (
      <g key={"l" + k} pointerEvents="none">
        {on && <rect x={cx - lw / 2 - 12} y={DR.ly - 24} width={lw + 24} height={33} rx={10} fill={tint(AMBER, 0.75)} stroke={AMBER} strokeWidth={3} />}
        <text x={cx} y={DR.ly} textAnchor="middle" fontSize={T.micro} fontWeight={on ? 700 : 500} fill={on ? AMBER_INK : C.ink}>{name}</text>
      </g>
    );
  };
  const rowName = (r: string, live: boolean) => {
    const y = rowTop(r), two = r === "A" ? ["with", "and"] : ["with", "point"], on = !free && st.act === r && liveRows;
    if (live) return (
      <Key key={"name" + r} id={r === "A" ? "row-and" : "row-point"} label={r === "A" ? "with and" : "with point"} x={0} y={y} w={104} h={DR.rh} C={C}
        primary={on} onClick={() => (free ? fpRead(r) : pickRow(r))}>
        <text x={0} y={-6} textAnchor="middle" fontSize={T.micro} fontWeight={on ? 700 : 500} fill={on ? "#FFFFFF" : C.ink}>{tx(two[0])}</text>
        <text x={0} y={24} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={on ? "#FFFFFF" : C.ink}>{tx(two[1])}</text>
      </Key>
    );
    return (
      <g key={"name" + r} pointerEvents="none">
        <text x={52} y={y + 30} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx(two[0])}</text>
        <text x={52} y={y + 62} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(two[1])}</text>
      </g>
    );
  };
  /* mode: own (the child's, tap a chip to take it out) · given (already built) · win (green) · show (free play) */
  const lane = (r: string, chips: string[], mode: string) => {
    const y = rowTop(r), on = mode === "own" && st.act === r && liveRows;
    const L = drLay(chips, DR.lane + 10);
    const sty = mode === "win" ? { f: tint(CONTENT.one, 0.85), s: CONTENT.one, i: GREEN } : mode === "given" ? { f: tint(C.panel, 0.5), s: C.rule, i: C.ink }
      : { f: "#FFFFFF", s: shade(C.rule, 0.15), i: C.ink };
    return (
      <g key={"row" + r}>
        <rect x={DR.lane} y={y} width={W.w - DR.lane} height={DR.rh} rx={16} fill={on ? tint(C.panel, 0.45) : "#FFFFFF"}
          stroke={on ? C.accent : C.rule} strokeWidth={on ? 3 : 2} pointerEvents="none" />
        {L.map((e: any, k: number) => (
          <g key={r + k}>
            <rect x={e.x} y={y + 7} width={e.w} height={58} rx={14} fill={sty.f} stroke={sty.s} strokeWidth={2} pointerEvents="none" />
            <text x={e.x + e.w / 2} y={y + 47} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={sty.i} pointerEvents="none">{tx(e.c)}</text>
            {mode === "own" && liveRows && <Hit id={"row" + r + "-" + (k + 1)} x={e.x} y={y} w={e.w} h={DR.rh} label={"take out " + e.c} onPress={() => takeOut(r, k)} />}
          </g>
        ))}
        {on && <rect x={(L.length ? L[L.length - 1].x + L[L.length - 1].w : DR.lane + 10) + 5} y={y + 14} width={4} height={44} rx={2} fill={C.accent} pointerEvents="none" />}
      </g>
    );
  };
  const answerLane = (groups: any[], shown: number, cards?: any[]) => {
    let x = DR.lane + 10, k = 0;
    const out: any[] = [];
    if (cards) cards.slice(0, shown).forEach((c: any, j: number) => out.push(
      <text key={"c" + j} x={c.x} y={DR.my + 38} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={c.ch === "0" ? GREY : GREEN}>{c.ch}</text>));
    else groups.forEach((grp: string[], gi: number) => {
      if (gi) x += 28;
      grp.forEach((c: string) => {
        const w = drChipW(c, T.micro, 20, 56);
        if (k < shown) out.push(
          <g key={"m" + k}>
            <rect x={x} y={DR.my + 2} width={w} height={40} rx={10} fill={tint(CONTENT.one, 0.88)} stroke={CONTENT.one} strokeWidth={2} />
            <text x={x + w / 2} y={DR.my + 32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={GREEN}>{tx(c)}</text>
          </g>);
        x += w + 8; k++;
      });
    });
    return (
      <g key="lane-answer" pointerEvents="none">
        <text x={52} y={DR.my + 32} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("answer")}</text>
        {out}
      </g>
    );
  };
  const runs = () => (
    <g data-zone="runs" pointerEvents="none">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={30} y={-94 + 54} fontSize={T.speech} fontWeight={700} fill={C.ink}>{count}</text>
      <text x={100} y={-94 + 48} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("words laid")}</text>
    </g>
  );
  const ghost = (word: string) => {
    if (!g || !g.moved) return null;
    const w = drChipW(word);
    return (
      <g pointerEvents="none" filter="url(#fLift)">
        <rect x={g.x - w / 2} y={g.y - DR.bh / 2} width={w} height={DR.bh} rx={18} fill="url(#gKey)" stroke={C.accent} strokeWidth={3} />
        <text x={g.x} y={g.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(word)}</text>
      </g>
    );
  };
  const chip = (id: string, e: any, payload: any, o: any = {}) => (
    <g key={id} {...(o.quiet ? { "aria-hidden": "true" } : { ...control(id, e.c), ...drag.bind(payload), ...drag.keys(payload) })}>
      {!o.quiet && <rect x={e.x} y={e.y + EDGE} width={e.w} height={DR.bh} rx={18} fill={shade(C.rule, 0.08)} />}
      <rect x={e.x} y={e.y} width={e.w} height={DR.bh} rx={18} fill={o.quiet || o.used ? tint(C.panel, 0.6) : "url(#gKey)"}
        stroke={o.picked ? C.accent : C.rule} strokeWidth={o.picked ? 4 : 2} />
      <text x={e.x + e.w / 2} y={e.y + 49} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(e.c)}</text>
    </g>
  );
  const invite = (x: number, y: number, r = 40) => <Invite key="invite" x={x} y={y} r={r} C={C} />;

  /* ── Free play ── */
  if (free) {
    const R = drFree(fp.d, fp.zero);
    let lastDec = -1;
    for (let j = 0; j < 3; j++) if (fp.d[2 + j] !== "") lastDec = j;
    const shown = fp.d.map((c: string, k: number) => (k === 1 ? c || "0" : k >= 2 && c === "" && k - 2 < lastDec ? "0" : c));
    const zeroOn = R.whole === 0 && !!R.decs;
    return (
      <g>
        {runs()}
        {shown.map((c: string, k: number) => tile(k, c))}
        {point()}
        {cols.names.map((_: any, k: number) => label(k, false))}
        {rowName("A", true)}{rowName("B", true)}
        {lane("A", fp.A, "show")}{lane("B", fp.B, "show")}
        {zeroOn && <DRToggle id="zero-and" x={0} y={DR.by} w={DR.zw} h={DR.bh} on={fp.zero} onPress={fpZero} label="zero and" text={tx("zero and")} C={C} />}
        {shown.map((_: any, k: number) => (
          <Hit key={"ft" + k} id={"tile-" + cols.names[k].toLowerCase()} x={cols.xs[k]} y={DR.ty} w={DR.tw} h={DR.th} label={cols.names[k] + " digit"} onPress={() => fpTile(k)} />
        ))}
        {!fp.A.length && !fp.B.length && invite(52, DR.rowA + 36, 44)}
      </g>
    );
  }

  /* ── Phase 4: from words to a decimal ── */
  if (write) {
    const wd = String(it.whole), ans = String(it.answer).split(".")[1] || "";
    /* the decimal digits the tiles hold: the child's, a drag's preview, or (after a win) the right ones */
    const solved = done && val4(st) !== it.answer;
    const ghostEnd = g && g.moved && g.payload && g.payload.role === "num" && g.y < DR.by - 8 ? Math.max(digs.length - 1, Math.min(2, col4(g.x))) : null;
    const end = solved ? ans.length - 1 : ghostEnd !== null ? ghostEnd : st.w4.end;
    const decs = Array.from({ length: 3 }, (_, j) => {
      if (end === null || end === undefined || j > end) return "";
      const start = end - digs.length + 1;
      return j < start ? "0" : digs[j - start];
    });
    const wholeOn = st.w4.whole || solved, andOn = st.w4.and || solved, placeOn = st.w4.place || solved;
    const ink = done ? GREEN : BLUE;
    const tray = drBank(it.words, 0, DR.by + DR.bh + 10);
    const role = (k: number) => (k === 0 ? "whole" : k === 1 ? "and" : k === 2 ? "num" : "place");
    const placed = (k: number) => (k === 3 ? placeOn : k === 0 ? wholeOn : k === 1 ? andOn : end !== null && end !== undefined && ghostEnd === null);
    const plc = 1 + it.place; /* the column of the place the last word names */
    const nextK = [0, 1, 3, 2].find((k) => !placed(k));
    const startCol = end === null || end === undefined ? 9 : end - digs.length + 1;
    const hung = [] as any[];
    if (wholeOn) hung.push({ t: it.words[0], x: (cols.xs[2 - wd.length] + cols.xs[1] + DR.tw) / 2 });
    if (andOn) hung.push({ t: it.words[1], x: cols.px });
    if (end !== null && end !== undefined) hung.push({ t: it.words[2], x: (cols.xs[2 + startCol] + cols.xs[2 + end] + DR.tw) / 2, ghost: ghostEnd !== null });
    return (
      <g>
        {runs()}
        {[0, 1].map((k) => tile(k, wholeOn ? (wd.length === 2 ? wd[k] : k === 1 ? wd : "") : "", { ink }))}
        {decs.map((c: string, j: number) => tile(2 + j, c, { ink, lit: lit(2 + j), ghost: ghostEnd !== null && !solved, target: st.picked && liveRows }))}
        {point()}
        {cols.names.map((_: any, k: number) => (placeOn && k === plc ? null : label(k, demo.label === k)))}
        {placeOn && (() => {
          const cx = cols.xs[plc] + DR.tw / 2, w = drChipW(it.words[3], T.micro, 24);
          return (
            <g key="hung-place" pointerEvents="none">
              <rect x={cx - w / 2} y={DR.ly - 30} width={w} height={42} rx={12} fill={tint(AMBER, 0.75)} stroke={AMBER} strokeWidth={3} />
              <text x={cx} y={DR.ly} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={AMBER_INK}>{tx(it.words[3])}</text>
            </g>
          );
        })()}
        {hung.map((h: any, k: number) => (
          <text key={"hw" + k} x={h.x} y={DR.rowA + 34} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink} fillOpacity={h.ghost ? 0.5 : 1} pointerEvents="none">{tx(h.t)}</text>
        ))}
        {decs.map((c: string, j: number) => (c === "0" && j < startCol ? (
          <g key={"ph" + j} pointerEvents="none">
            <text x={cols.xs[2 + j] + DR.tw / 2} y={DR.rowA + 34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={GREY}>{tx("place")}</text>
            <text x={cols.xs[2 + j] + DR.tw / 2} y={DR.rowA + 66} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={GREY}>{tx("holder")}</text>
          </g>
        ) : null))}
        {demo.model !== undefined && answerLane([], demo.model, drCards4(it))}
        {tray.map((e: any) => chip("word-" + (e.k + 1), e, { kind: "w4", role: role(e.k) },
          { quiet: !liveRows, used: placed(e.k), picked: e.k === 2 && st.picked }))}
        {st.picked && liveRows && [0, 1, 2].map((j) => (
          <Hit key={"pt" + j} id={"place-" + DR_PLACES[j]} x={cols.xs[2 + j]} y={DR.ty} w={DR.tw} h={DR.th} label={"last digit in the " + DR_PLACES[j]} onPress={() => place4(j)} />
        ))}
        {g && g.payload && g.payload.kind === "w4" && ghost(it.words[role(0) === g.payload.role ? 0 : g.payload.role === "and" ? 1 : g.payload.role === "num" ? 2 : 3])}
        {liveRows && !busy.current && !st.demo && nextK !== undefined && (() => { const e = tray.find((t: any) => t.k === nextK); return e ? invite(e.x + e.w / 2, e.y + DR.bh / 2, 40) : null; })()}
      </g>
    );
  }

  /* ── Phases 1 to 3: a reading built from word chips ── */
  const [w0, d0] = String(it.dec).split(".");
  const digits = (w0 + d0).split("");
  const winRow = (r: string, k: number) => {
    const want = String(it.answer).split("|")[k];
    return drRowOk(it, want, st[r].join(" "), r === "A") ? st[r] : drChipsOf(want, drPool(it)) || [];
  };
  const showA = editable("A") || !!it.given, showB = editable("B");
  const both = it.rows === "both";
  const bank = drBank(it.bank || [], zeroItem ? DR.zw + 16 : 0);
  const other = st.act === "A" ? "B" : "A";
  const nw = w0.length, nd = d0.length;
  return (
    <g>
      {runs()}
      {digits.map((c: string, k: number) => tile(k, c, { lit: lit(k), ink: done ? GREEN : BLUE }))}
      {point()}
      {demo.bracket && (() => {
        const x1 = cols.xs[nw] + 8, x2 = cols.xs[nw + nd - 1] + DR.tw - 8;
        return <path key="bracket" d={`M ${x1} 91 V 97 H ${x2} V 91`} fill="none" stroke={AMBER} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" pointerEvents="none" />;
      })()}
      {cols.names.map((_: any, k: number) => label(k, demo.label === k))}
      {showA && rowName("A", both && liveRows)}
      {showB && rowName("B", both && liveRows)}
      {showA && lane("A", done ? (editable("A") ? winRow("A", 0) : it.given) : editable("A") ? st.A : it.given, done ? "win" : editable("A") ? "own" : "given")}
      {showB && lane("B", done ? winRow("B", both ? 1 : 0) : st.B, done ? "win" : "own")}
      {demo.model !== undefined && answerLane(drModel(it), demo.model)}
      {zeroItem && <DRToggle id="zero-and" x={0} y={DR.by} w={DR.zw} h={DR.bh} on={st.A[0] === "zero" && st.A[1] === "and"} onPress={flipZero} label="zero and" text={tx("zero and")} C={C} />}
      {bank.map((e: any) => chip("word-" + (e.k + 1), e, { kind: "bank", word: e.c }))}
      {g && g.payload && g.payload.kind === "bank" && ghost(g.payload.word)}
      {liveRows && !busy.current && !st.demo && (!st[st.act].length ? invite(DR.lane + 60, rowTop(st.act) + 36)
        : both && !st[other].length ? invite(52, rowTop(other) + 36, 44) : null)}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const sh = last.shared || {};
  const dec = last.kind === "write" ? String(last.value ?? "") : String(sh.decimal ?? "");
  const tag = ({ and: "with and", point: "with point", both: "both ways", write: "from words" } as any)[last.kind] || "";
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={18} y={38} fontSize={T.label} fontWeight={700} fill={shade(CONTENT.one, 0.25)}>{dec}</text>
      <text x={18} y={h - 14} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx(tag)}</text>
    </g>
  );
}

function DecimalReader(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default DecimalReader;
