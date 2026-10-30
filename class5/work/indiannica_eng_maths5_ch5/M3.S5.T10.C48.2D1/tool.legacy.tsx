/* ═══ M3.S5.T10.C48.2D1 · column_adder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C5.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "column_adder";
const MEDIA_ID = "M3.S5.T10.C48.2D1";
const TOOL_NAME = "Column Adder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A column frame, with one line for every point."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every point in one line, and every carry across.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Add any decimals and whole numbers.";

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
    concept: "Line up the points",
    conceptId: "M3.S5.T10.C45", objectiveIds: ["O17"],
    says: ["Points in one line. Then add as whole numbers.", "Drag the cards into the frame, then tap Add."],
    /* tries, as the plan writes it: First rung: line up one card. Second rung: line up the other. Third rung: the same task with two cards of the same length, before different lengths return. */
    ladder: ["Line up the other card too, with its point on the line.", "Tap Like, so both cards have two places. Then add again."],
    closing: "Decimals are added with their points in one line, the point placed straight below.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: line up the points, then add as whole numbers.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The cards line up by their points, zeros make like decimals, each column is added from the right and the point drops straight below, ending on the whole sum.",
    items: [
      /* learn CA1: answer in the plan = 6.83. cards: the decimal cards in the tray; near: lining up the last digits (5.23 + 0.16) */
      { qid: "M3.S5.T10.C45:CA1", kind: "add", cards: ["5.23", "1.6"], start: "tray", near: "5.39",
        say: "Add 5.23 and 1.6.", ask: "5.23 + 1.6 = ?", answer: "6.83", miss: "The 6 in 1.6 is six tenths. Is it under the tenths of 5.23?" },
      /* practice 1: answer in the plan = 7.62; near: 4.12 + 0.35 */
      { qid: "M3.S5.T10.C45:1", kind: "add", cards: ["4.12", "3.5"], start: "tray", near: "4.47",
        say: "Now 4.12 and 3.5.", ask: "4.12 + 3.5 = ?", answer: "7.62", miss: "Put the point of 3.5 on the line. Where does its 5 go?" },
      /* practice 2: answer in the plan = 0.84 (like decimals: the slip here is a sum with no point) */
      { qid: "M3.S5.T10.C45:2", kind: "add", cards: ["0.63", "0.21"], start: "tray", near: "84",
        say: "Then 0.63 and 0.21.", ask: "0.63 + 0.21 = ?", answer: "0.84", miss: "Your sum needs its point straight below the others, and the zero in front." },
    ],
  },
  {
    n: 2,
    concept: "Carrying across the point",
    conceptId: "M3.S5.T10.C46", objectiveIds: ["O17"],
    says: ["Fifteen hundredths. Keep the five and carry one tenth."],
    /* tries, as the plan writes it: First rung: add the hundredths only. Second rung: add the tenths with the carry. Third rung: the same task where only one column carries. */
    ladder: ["Add the tenths with the carry.", "Some sums carry in one column only. Check each column again."],
    closing: "Ten of one place is carried as one of the next place, across the point too.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: carry ten of a place as one of the next, across the point.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Each column lights from the right and shows its total; the ten rolls on as a carry, across the point too, and the whole sum is written below.",
    items: [
      /* learn CA2: answer in the plan = 6.33. The cards start lined up (phase 1 taught that); near: the tenths' carry forgotten */
      { qid: "M3.S5.T10.C46:CA2", kind: "carry", cards: ["2.87", "3.46"], start: "frame", near: "6.23",
        say: "Add 2.87 and 3.46.", ask: "2.87 + 3.46 = ?", answer: "6.33", miss: "Seven and six hundredths make thirteen. Where does the ten go?" },
      /* practice 3: answer in the plan = 3.92. Hundredths: 8 + 4 = 12, so write 2 and carry 1 tenth */
      { qid: "M3.S5.T10.C46:3", kind: "carry", cards: ["1.58", "2.34"], start: "frame", near: "3.82",
        say: "Now 1.58 and 2.34.", ask: "1.58 + 2.34 = ?", answer: "3.92", miss: "Eight and four hundredths make twelve. Did the tenths get that carry?" },
      /* practice 5: answer in the plan = 12.26 */
      { qid: "M3.S5.T10.C46:5", kind: "carry", cards: ["7.69", "4.57"], start: "frame", near: "12.16",
        say: "Then 7.69 and 4.57.", ask: "7.69 + 4.57 = ?", answer: "12.26", miss: "The tenths make ten or more. Did the ones get their carry too?" },
    ],
  },
  {
    n: 3,
    concept: "Adding whole numbers and decimals",
    conceptId: "M3.S5.T10.C47", objectiveIds: ["O17"],
    says: ["Where is the point in a whole number?"],
    /* tries, as the plan writes it: First rung: find the ones digit of the whole number. Second rung: tap Point first. Third rung: the same task with one decimal, before two return. */
    ladder: ["Tap Point first.", "Add the whole number and one decimal first. Then add the last one."],
    closing: "A whole number has its point after the ones digit before it is lined up.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a whole number's point comes after its ones digit.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The whole number takes its point after the ones digit, every card lines up by its point, zeros make like decimals, and the columns add to the whole sum.",
    items: [
      /* learn CA3: answer in the plan = 11.15; near: the 9 lined up under the last digit (0.09 + 1.75 + 0.4) */
      { qid: "M3.S5.T10.C47:CA3", kind: "whole", cards: ["9", "1.75", "0.4"], start: "tray", near: "2.24",
        say: "Add 9, 1.75 and 0.4.", ask: "9 + 1.75 + 0.4 = ?", answer: "11.15", miss: "The 9 is nine ones. Its point comes straight after it." },
      /* practice 4: answer in the plan = 8.35. Write 6 as 6.00 first, with its point after the 6; near: 0.06 + 2.35 */
      { qid: "M3.S5.T10.C47:4", kind: "whole", cards: ["6", "2.35"], start: "tray", near: "2.41",
        say: "Now 6 and 2.35.", ask: "6 + 2.35 = ?", answer: "8.35", miss: "Write 6 as 6.00. Then line it up with 2.35." },
      /* practice 7: answer in the plan = 6.45 m, because 4.00 + 1.85 + 0.60 = 6.45; near: 0.04 + 1.85 + 0.6 */
      { qid: "M3.S5.T10.C47:7", kind: "whole", cards: ["4", "1.85", "0.6"], start: "tray", near: "2.49",
        say: "Three ribbons are 4 m, 1.85 m and 0.6 m long. What is their total length?", ask: "Total length in m?", answer: "6.45", miss: "4 m is 4 whole metres. Which column holds its 4?" },
    ],
  },
  {
    n: 4,
    concept: "Order and zero in adding",
    conceptId: "M3.S5.T10.C48", objectiveIds: ["O18"],
    says: ["Swap them round. Did the sum change?"],
    /* tries, as the plan writes it: First rung: add in the first order. Second rung: tap Swap and add again. Third rung: the same task with no carrying, before carries return. */
    ladder: ["Tap Swap and add again.", "No column carries here. Add each column as it stands."],
    closing: "Changing the order of the addends does not change the sum, and adding 0 changes nothing.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: the order of addends and adding 0 leave the sum the same.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The columns add from the right to the whole sum; on an order question the cards then swap and the sum stays where it was.",
    items: [
      /* learn CA4: answer in the plan = Yes. Both are 7.36. The slot takes the sum both orders give (the plan's
         "Yes" is the swap the child watches); the plan's one-sentence question is 22 spoken words, so it is said in two */
      { qid: "M3.S5.T10.C48:CA4", kind: "order", cards: ["2.06", "5.3"], start: "frame", swap: true, near: "2.59",
        say: "Add 2.06 and 5.3, then 5.3 and 2.06. Type the sum you get.", ask: "2.06 + 5.3 = ?", answer: "7.36", miss: "Add the hundredths first, then the tenths, then the ones." },
      /* practice 6: answer in the plan = 8.41. Adding 0 changes nothing. The number IS the question here (adding 0),
         so answerForms lets the question print it; near: a zero digit written on the end */
      { qid: "M3.S5.T10.C48:6", kind: "zero", cards: ["8.41"], start: "frame", zero: true, selfShown: true, near: "8.410",
        say: "What is 0 + 8.41?", ask: "0 + 8.41 = ?", answer: "8.41", miss: "The zero card adds nothing to any column. Add them and see." },
      /* practice 8: answer in the plan = Yes. Changing the order does not change the sum, which is 6.88; near: 0.47 + 2.18 */
      { qid: "M3.S5.T10.C48:8", kind: "order", cards: ["4.7", "2.18"], start: "frame", swap: true, near: "2.65",
        say: "Is 4.7 + 2.18 the same as 2.18 + 4.7? What is the sum?", ask: "4.7 + 2.18 = ?", answer: "6.88", miss: "Line up the points, not the last digits. Then add each column." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  /* the frame's columns, left to right; the point line runs between Ones and Tenths. Every question stays
     within hundredths, so the brief's Thousandths column is left out (its heading would not fit at 28) */
  columns: ["Tens", "Ones", "Tenths", "Hundredths"],
  rows: 3,
  /* the teach screens: phase 2 shows the book's 4.68 + 1.57 carrying its first ten; phase 4 the book's
     1.35 + 4.2 = 5.55, ready to swap */
  teach2: ["4.68", "1.57"],
  teach4: ["1.35", "4.2"], teach4Sum: "5.55",
  /* Free play's tray (New card makes more on the pad: one whole digit, up to two places) */
  free: ["3.46", "6", "0.35", "12.5"],
  trayMax: 5,
};

/* ── the column frame, in working-area units (1086 x 528) ───────────────────────────────── */
const CA = {
  FX: 110, CW: 164, PL: 438,            /* frame left, column width, the point line (Ones | Tenths) */
  ROWS: [102, 180, 258], RH: 70,        /* the card rows */
  RULE: 342, SUMY: 352, BASE: 406,      /* the ruled line, the sum row and its baseline */
  TRAY: 438, TRAYH: 88, CARDY: 446,     /* the tray along the bottom */
  BX: 796, BW: 280, BH: 76, BY: [10, 98, 186, 274, 362, 450],  /* the controls down the right */
};
const CA_COL = { given: CONTENT.hundred, sum: CONTENT.one, carry: CONTENT.pointer, zero: CONTENT.bead, now: CONTENT.ten, hold: "#767676" };
const CA_INK = { given: shade(CONTENT.hundred, 0.25), sum: shade(CONTENT.one, 0.3), carry: shade(CONTENT.pointer, 0.3),
  zero: shade(CONTENT.bead, 0.35), now: shade(CONTENT.ten, 0.45), hold: "#767676", line: CONTENT.line };
const caX = (c: number) => CA.FX + c * CA.CW + CA.CW / 2;
/* lines the tool says once a page (module-level, so a phase change does not say them again) */
const CA_TOLD: any = { cell: false, enter: false, whole: false, big: false, make: false };

/* a card's digits after the point ("1.6" -> "6"); a whole number has none */
const caFrac = (t: string) => (String(t).split(".")[1] || "");
/* the digits a card puts in each column once its point is on the line (0 Tens, 1 Ones, 2 Tenths, 3 Hundredths) */
const caCells = (card: any) => {
  const [a, b = ""] = String(card.text).split(".");
  const out: any[] = [];
  for (let k = 0; k < a.length; k++) out.push({ col: 2 - a.length + k, ch: a[k], kind: a[k] === "0" ? "hold" : "given" });
  for (let j = 0; j < b.length; j++) out.push({ col: 2 + j, ch: b[j], kind: b[j] === "0" ? "hold" : "given" });
  for (let z = 0; z < (card.zeros || 0); z++) out.push({ col: 2 + b.length + z, ch: "0", kind: "zero" });
  return out;
};
/* the column a card's first digit takes when its point sits on the line */
const caAligned = (card: any) => 2 - String(card.text).split(".")[0].length;
/* the column method on the lined-up cards: from the right, ten of a place carried into the next */
const caColumnWork = (rows: any[]) => {
  const per = rows.map((r) => { const m: any = {}; caCells(r).forEach((c: any) => { m[c.col] = +c.ch; }); return m; });
  const used = per.flatMap((m: any) => Object.keys(m).map(Number));
  const right = Math.max(...used), left = Math.min(...used);
  const steps: any[] = [];
  let carry = 0;
  for (let c = right; c >= 0; c--) {
    if (c < left && !carry) break;
    const total = per.reduce((a: number, m: any) => a + (m[c] || 0), 0) + carry;
    steps.push({ col: c, carryIn: carry, total, keep: total % 10, carryOut: c > 0 ? Math.floor(total / 10) : 0 });
    carry = c > 0 ? Math.floor(total / 10) : 0;
  }
  return steps;
};
/* the sum row read as a number: digits left to right, the point before the tenths */
const caBuilt = (sum: any) => Object.keys(sum).map(Number).sort((a, b) => a - b).map((c) => (c === 2 ? "." : "") + sum[c]).join("");

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: the addends
   as whole thousandths (parseFloat), summed, written back with as many places as the longest addend */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const xs: string[] = [...it.cards, ...(it.zero ? ["0"] : [])];
  const places = Math.max(...xs.map((x) => (x.indexOf(".") < 0 ? 0 : x.length - x.indexOf(".") - 1)));
  const thousandths = xs.reduce((a, x) => a + Math.round(parseFloat(x) * 1000), 0);
  return (thousandths / 1000).toFixed(places) === it.answer && it.near !== it.answer;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (adding 0: the number IS the question) */
const answerForms = (item: any) => (item.selfShown ? [] : [String(item.answer), speakable(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): toolApi.answer strips the point, so a decimal is typed into the slot whole (PATTERNS §4) */
const answer = (item: any, v: any) => (HOOK.type ? HOOK.type(v) : undefined);
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
/* a fresh walk down the columns: the sum row's digits, the carries on top, the column whose cell is open */
const caWalk0 = () => ({ sum: {} as any, carry: {} as any, open: null as any, typing: "", point: false, done: false, hop: null as any });
/* the screen a question, a teach or Free play opens on */
const caScreen = (n: number, item: any, screen: string) => {
  let texts: string[] = [], start = "tray", zero = false, sum = "";
  if (screen === "free") { texts = MODEL.free; zero = true; }
  else if (screen === "teach") { texts = n === 2 ? MODEL.teach2 : MODEL.teach4; start = "frame"; if (n === 4) sum = MODEL.teach4Sum; }
  else { texts = (item && item.cards) || []; start = (item && item.start) || "tray"; zero = !!(item && item.zero); }
  const cards: any = {};
  const ids = texts.map((t, k) => { const id = "c" + (k + 1); cards[id] = { id, text: t, pt: t.includes(".") ? "given" : null, zeros: 0 }; return id; });
  if (zero) cards.z = { id: "z", text: "0", pt: null, zeros: 0, zero: true };
  const walk = caWalk0();
  if (sum) { caCells({ text: sum }).forEach((c: any) => { walk.sum[c.col] = c.ch; }); walk.point = true; walk.done = true; }
  return { screen, cards, tray: start === "tray" ? ids : [], rows: start === "frame" ? ids.map((id) => ({ id, col: caAligned(cards[id]) })) : [],
    zeroOut: zero, flash: null as any, wob: null as any, big: null as any, tried: false, swapped: false, walk, dm: null as any, making: null as any, made: 0 };
};
/* the correction, frame by frame: the cards lined up by their points, zeros to make like decimals, then each
   column from the right (its total, the digit that stays, the ten carried on), the point dropped straight
   below after the tenths; an order question then swaps the cards and the sum stays put */
const caFrames = (item: any, swap: boolean) => {
  const xs: string[] = [...(item.cards || []), ...(item.zero ? ["0"] : [])];
  const places = Math.max(...xs.map((x) => caFrac(x).length));
  const base = xs.map((t, k) => ({ id: "d" + k, text: t, pt: t.includes(".") ? "given" : "added", zeros: 0, zero: !!item.zero && k === xs.length - 1 }));
  const like = base.map((r) => ({ ...r, zeros: places - caFrac(r.text).length }));
  const frames: any[] = [];
  let carry: any = {}, sum: any = {}, point = false;
  frames.push({ rows: base, carry, sum, point, lit: null, total: null });
  frames.push({ rows: like, carry, sum, point, lit: null, total: null });
  caColumnWork(like).forEach((s: any) => {
    frames.push({ rows: like, carry, sum, point, lit: s.col, total: { col: s.col, text: String(s.total) } });
    sum = { ...sum, [s.col]: String(s.keep) };
    if (s.carryOut) carry = { ...carry, [s.col - 1]: s.carryOut };
    if (s.col === 2) point = true;
    frames.push({ rows: like, carry, sum, point, lit: s.col, total: null });
  });
  if (swap) frames.push({ rows: [...like].reverse(), carry, sum, point, lit: null, total: null, swapped: true });
  frames.push({ ...frames[frames.length - 1], lit: null, total: null });
  return frames;
};
/* a compact card in the tray: its characters, coloured by what they are */
const caChars = (card: any, big = false) => {
  const [a, b = ""] = String(card.text).split(".");
  const out: any[] = [];
  for (const ch of a) out.push({ ch, kind: ch === "0" && !card.zero ? "hold" : "given" });
  if (big) out.push({ ch: "0", kind: "zero" });
  if (card.pt) out.push({ ch: ".", kind: card.pt === "added" ? "zero" : "point" });
  for (const ch of b) out.push({ ch, kind: ch === "0" ? "hold" : "given" });
  for (let z = 0; z < (card.zeros || 0); z++) out.push({ ch: "0", kind: "zero" });
  return out;
};
const caCompactW = (chars: any[]) => Math.max(96, Math.round(36 + chars.reduce((a: number, c: any) => a + (c.ch === "." ? 14 : 29), 0)));
const caInkOf = (kind: string) => (kind === "hold" ? CA_INK.hold : kind === "zero" ? CA_INK.zero : kind === "point" ? CA_INK.line : CA_INK.given);

function Work({ phase, n, item, index, stage, wrong, typed, captured, api, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const tl = useTimeline();
  const anim = !reducedMotion();
  const timers = useRef<any[]>([]);
  const caLater = (ms: number, fn: () => void) => { timers.current.push(setTimeout(fn, reducedMotion() ? Math.min(ms, 25) : ms)); };
  const caStop = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => caStop, []);
  const stageRef = useRef(stage);
  stageRef.current = stage;
  const free = stage === "free";

  /* the screen: each question, the phase 2 and 4 teach (the book's own example) and Free play start fresh */
  const screen = free ? "free" : stage === "teach" && (n === 2 || n === 4) ? "teach" : "q" + index;
  const [st, setSt] = useState<any>(() => caScreen(n, item, screen));
  const S = st.screen === screen ? st : caScreen(n, item, screen);
  const sr = useRef<any>(S);
  sr.current = S;
  const put = (p: any) => { const base = sr.current; const nx = { ...base, ...(typeof p === "function" ? p(base) : p) }; sr.current = nx; setSt(nx); };
  useEffect(() => {
    if (st.screen === screen) return;
    caStop(); tl.stop();
    setSt(sr.current);
  }, [screen]);

  /* Enter and choice taps go straight to the slot: the answer is the sum typed there */
  api.onEnter(null);

  /* who may act now: the cards are live from the teach (phases 1 and 3), Swap in phase 4's teach */
  const acting = stage === "ask" || free || (stage === "teach" && (n === 1 || n === 3 || n === 4));
  const cellBusy = S.walk.open !== null || !!S.walk.hop || !!S.making;
  const live = acting && !tl.busy && !cellBusy;
  const here = () => { const s0 = sr.current; return [...s0.tray, ...s0.rows.map((r: any) => r.id)].map((id: string) => s0.cards[id]); };
  const needRows = () => (stageRef.current === "free" ? 2 : Object.keys(sr.current.cards).length);
  const canAdd = () => { const s0 = sr.current; return (stageRef.current === "ask" || stageRef.current === "free") && s0.rows.length >= needRows() && !s0.wob; };
  /* the next column to add: from the right, then on to the left while a carry waits */
  const nextCol = (s0: any, w: any) => {
    const used = s0.rows.flatMap((r: any) => caCells(s0.cards[r.id]).map((c: any) => c.col));
    if (!used.length) return null;
    const right = Math.max(...used), left = Math.min(...used);
    for (let c = right; c >= 0; c--) if (w.sum[c] === undefined) return c >= left || w.carry[c] ? c : null;
    return null;
  };

  /* a card into the frame: it lands where it was dropped (a tap: last digit under the last column, as whole
     numbers are written) and slides until its point sits on the point line; a column it covered by mistake
     lights amber. A whole number with no point will not settle. */
  const placeCard = (id: string, p: any) => {
    const s0 = sr.current, card = s0.cards[id];
    if (!card || s0.rows.length >= MODEL.rows || s0.wob) return;
    const nd = caCells(card).length;
    if (!card.pt) {
      put({ dm: null, wob: { id, col: Math.max(0, 4 - nd), t: 0 }, tried: true });
      [1, 2, 3, 4].forEach((t) => caLater(110 * t, () => put((o: any) => (o.wob ? { wob: { ...o.wob, t } } : {}))));
      caLater(760, () => put({ wob: null }));
      if ((stageRef.current === "ask" || stageRef.current === "free") && !CA_TOLD.whole) { CA_TOLD.whole = true; api.say("A whole number needs its point first."); }
      return;
    }
    const first = p ? Math.round((p.x - CA.FX) / CA.CW - nd / 2) : 4 - nd;
    const entry = Math.max(0, Math.min(4 - nd, first)), al = caAligned(card);
    const flash = entry === al ? null : Array.from({ length: nd }, (_, k) => entry + k).filter((c) => c < al || c >= al + nd);
    put((o: any) => ({ dm: null, tray: o.tray.filter((x: string) => x !== id), rows: [...o.rows, { id, col: entry }], flash, walk: caWalk0() }));
    caLater(60, () => put((o: any) => ({ rows: o.rows.map((r: any) => (r.id === id ? { ...r, col: al } : r)) })));
    caLater(entry === al ? 80 : 520, () => api.sfx.tick());
    if (flash) caLater(1200, () => put({ flash: null }));
  };
  const placeZero = () => {
    const s0 = sr.current;
    if (!s0.zeroOut || s0.rows.length >= MODEL.rows) return;
    put((o: any) => ({ dm: null, zeroOut: false, cards: { ...o.cards, z: { ...o.cards.z, pt: "added" } }, rows: [...o.rows, { id: "z", col: 1 }], walk: caWalk0() }));
    api.sfx.tick();
  };
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!live) return;
    const at = moved && p && isFinite(p.x) && isFinite(p.y) ? p : null;
    if (at && at.y > CA.TRAY - 6) return;          /* put back on the tray: it stays there */
    if (pay.kind === "card") placeCard(pay.id, at && at.x < CA.FX + 4 * CA.CW ? at : null);
    else if (pay.kind === "zero") placeZero();
  });

  /* Like: zeros after the point so every card has as many places (a help, not a rule). On a whole number with
     no point it shows the slip: the zero makes it ten times as big, then slides back off */
  const onLike = () => {
    const s0 = sr.current, all = here();
    const places = Math.max(0, ...all.filter((c: any) => c.pt).map((c: any) => caFrac(c.text).length));
    const bare = all.find((c: any) => !c.pt && !c.zero);
    if (bare && !s0.big) {
      put({ dm: null, big: { id: bare.id }, tried: true });
      caLater(1500, () => put({ big: null }));
      if ((stageRef.current === "ask" || stageRef.current === "free") && !CA_TOLD.big) { CA_TOLD.big = true; api.say("A zero on the end makes it ten times as big."); }
    }
    const cards = { ...sr.current.cards };
    let changed = false;
    all.forEach((c: any) => { if (!c.pt) return; const z = places - caFrac(c.text).length; if (z !== c.zeros) { cards[c.id] = { ...c, zeros: z }; changed = true; } });
    if (changed) { put({ dm: null, cards, walk: caWalk0() }); api.sfx.tick(); }
  };
  const likeUseful = (() => { const all = [...S.tray, ...S.rows.map((r: any) => r.id)].map((id: string) => S.cards[id]);
    const places = Math.max(0, ...all.filter((c: any) => c.pt).map((c: any) => caFrac(c.text).length));
    return all.some((c: any) => (c.pt ? places - caFrac(c.text).length !== c.zeros : !c.zero)); })();
  /* Point first: the point after the ones digit of every whole number card */
  const onPoint = () => {
    const s0 = sr.current, cards = { ...s0.cards };
    let changed = false;
    s0.tray.forEach((id: string) => { if (!cards[id].pt) { cards[id] = { ...cards[id], pt: "added" }; changed = true; } });
    if (changed) { put({ dm: null, cards, big: null }); api.sfx.tick(); }
  };
  const unpointed = S.tray.some((id: string) => !S.cards[id].pt);
  /* Swap: the cards change places; the sum is added again (the teach keeps its sum, to watch it stay) */
  const onSwap = () => {
    if (sr.current.rows.length < 2) return;
    put((o: any) => ({ dm: null, rows: [...o.rows].reverse(), swapped: !o.swapped, walk: o.screen === "teach" ? o.walk : caWalk0() }));
    api.sfx.tick();
  };

  /* Add: lights the next column from the right and lends the pad to its cell; the child types what the column
     makes. A ten in it lifts off and hops on as the carry (across the point from the tenths); the digit that
     stays is written green. When the last column is done the sum goes into the answer slot. */
  const walkOn = (w: any) => {
    const c = nextCol(sr.current, w);
    if (c !== null) { put({ walk: { ...w, open: c, typing: "" } }); return; }
    put({ walk: { ...w, open: null, done: true } });
    api.capture(null);
    if (stageRef.current === "ask") {
      api.setTyped(caBuilt(w.sum));
      if (!CA_TOLD.enter) { CA_TOLD.enter = true; api.say("Your sum is in the box. Press Enter to answer."); }
    }
  };
  const commitCell = () => {
    const s0 = sr.current, w = s0.walk, c = w.open, t = w.typing;
    const colTotal = s0.rows.reduce((a: number, r: any) => a + caCells(s0.cards[r.id]).filter((x: any) => x.col === c).reduce((b: number, x: any) => b + +x.ch, 0), 0) + (w.carry[c] || 0);
    let keep = t, out = 0;
    if (t.length === 2) { keep = t[1]; out = +t[0]; }
    else if (colTotal >= 10 && +t === colTotal % 10) out = Math.floor(colTotal / 10);   /* "write 5 and carry 1" */
    if (c === 0) out = 0;
    const nw = { ...w, sum: { ...w.sum, [c]: keep }, open: null, typing: "", point: w.point || c === 2 };
    if (out > 0) {
      const cross = c === 2;
      put({ walk: { ...nw, hop: { d: String(out), from: c, to: c - 1, t: 0 } } });
      caLater(40, () => put((o: any) => (o.walk.hop ? { walk: { ...o.walk, hop: { ...o.walk.hop, t: 1 } } } : {})));
      caLater(cross ? 420 : 340, () => put((o: any) => (o.walk.hop ? { walk: { ...o.walk, hop: { ...o.walk.hop, t: 2 } } } : {})));
      caLater(cross ? 820 : 700, () => {
        const o = sr.current;
        if (!o.walk.hop) return;
        api.sfx.tick();
        const w2 = { ...o.walk, carry: { ...o.walk.carry, [c - 1]: out }, hop: null };
        put({ walk: w2 });
        walkOn(w2);
      });
    } else {
      put({ walk: nw });
      caLater(280, () => walkOn(sr.current.walk));
    }
  };
  /* Free play's New card: a number typed on the lent pad (one whole digit, up to two places) */
  const makeKey = (k: string) => {
    const m = sr.current.making;
    if (!m) return;
    let t = m.text;
    if (/^\d$/.test(k)) { if (t.includes(".")) { if (caFrac(t).length < 2) t += k; } else if (t.length < 1) t += k; }
    else if (k === "point") { if (!t.includes(".")) t = (t || "0") + "."; }
    else if (k === "back") t = t.slice(0, -1);
    else if (k === "clear" || (k === "enter" && !t)) { if (t) t = ""; else { put({ making: null }); api.capture(null); return; } }
    else if (k === "enter") {
      const text = t.endsWith(".") ? t.slice(0, -1) : t, id = "n" + (sr.current.made + 1);
      put((o: any) => ({ making: null, made: o.made + 1, cards: { ...o.cards, [id]: { id, text, pt: t.includes(".") ? "given" : null, zeros: 0 } }, tray: [...o.tray, id] }));
      api.capture(null); api.sfx.tick();
      return;
    }
    put({ making: { ...m, text: t } });
  };
  /* the lent pad: digits go to the open cell (or the new card) */
  const cellKey = (k: string) => {
    const s0 = sr.current, w = s0.walk;
    if (s0.making) { makeKey(k); return; }
    if (w.open === null) return;
    if (/^\d$/.test(k)) { if (w.typing.length < (w.open === 0 ? 1 : 2)) put({ walk: { ...w, typing: w.typing + k } }); }
    else if (k === "back") put({ walk: { ...w, typing: w.typing.slice(0, -1) } });
    else if (k === "clear" || (k === "enter" && w.typing === "")) {
      if (w.typing !== "") put({ walk: { ...w, typing: "" } });
      else { put({ walk: { ...w, open: null } }); api.capture(null); }   /* an empty cell gives the pad back */
    } else if (k === "enter") commitCell();
  };
  const onAdd = () => {
    const s0 = sr.current;
    if (!canAdd()) return;
    const w0 = Object.keys(s0.walk.sum).length || s0.walk.done ? caWalk0() : s0.walk;
    const c = nextCol(s0, w0);
    if (c === null) return;
    put({ dm: null, walk: { ...w0, open: c, typing: "" } });
    api.capture(cellKey);
    if (!CA_TOLD.cell) { CA_TOLD.cell = true; api.say("Type what this column makes, then press Enter."); }
  };
  const onNew = () => {
    const s0 = sr.current;
    if (Object.keys(s0.cards).filter((k) => k !== "z").length >= MODEL.trayMax || s0.making) return;
    put({ dm: null, making: { text: "" } });
    api.capture(cellKey);
    if (!CA_TOLD.make) { CA_TOLD.make = true; api.say("Type your number on the pad, then press Enter."); }
  };
  /* Free play: a card in the frame goes back to the tray when tapped */
  const unplace = (id: string) => {
    put((o: any) => (id === "z"
      ? { dm: null, rows: o.rows.filter((r: any) => r.id !== id), zeroOut: true, cards: { ...o.cards, z: { ...o.cards.z, pt: null, zeros: 0 } }, walk: caWalk0() }
      : { dm: null, rows: o.rows.filter((r: any) => r.id !== id), tray: [...o.tray, id], walk: caWalk0() }));
    api.sfx.tick();
  };

  /* the pad taken back by the runtime (a new question, Free play's start): the open cell closes */
  useEffect(() => {
    if (captured) return;
    const s0 = sr.current;
    if (s0.walk.open !== null || s0.making) put({ walk: { ...s0.walk, open: null, typing: "" }, making: null });
  }, [captured]);

  /* phase 2's teach: the book's 4.68 + 1.57 adds its hundredths, and the ten hops on as one tenth */
  useEffect(() => {
    if (screen !== "teach" || n !== 2) return;
    const rows = MODEL.teach2.map((t: string, k: number) => ({ id: "c" + (k + 1), text: t, pt: "given", zeros: 0 }));
    const s1 = caColumnWork(rows)[0];
    const base = { rows, carry: {}, sum: {}, point: false, lit: null, total: null };
    tl.run([[1500, () => put({ dm: base })], [1400, () => put({ dm: { ...base, lit: s1.col, total: { col: s1.col, text: String(s1.total) } } })],
      [300, () => put({ dm: { ...base, sum: { [s1.col]: String(s1.keep) }, carry: { [s1.col - 1]: s1.carryOut } } })]]);
  }, [screen]);

  /* the traceback: on a layer of its own (the child's cards and sum stay theirs underneath), it lines the cards
     up, makes like decimals, adds each column from the right with its carry and ends on the whole sum */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const s0 = sr.current;
    caStop();
    if (s0.walk.open !== null || s0.walk.hop || s0.making) { put({ walk: { ...s0.walk, open: null, typing: "", hop: null }, making: null }); api.capture(null); }
    put({ flash: null, wob: null, big: null });
    api.lock(true);
    const frames = caFrames(item, !!item.swap);
    tl.run(frames.map((f: any, k: number) => [k === frames.length - 1 ? 60 : f.swapped ? 1000 : k === 0 ? 450 : 620, () => put({ dm: f })]), () => api.lock(false));
  }, [wrong]);

  /* a right answer typed straight into the slot: the columns are shown worked, the sum in green */
  useEffect(() => {
    if (stage !== "win") return;
    const s0 = sr.current;
    if (s0.walk.done && caBuilt(s0.walk.sum) === item.answer && !s0.dm) return;
    const f = caFrames(item, false);
    put({ dm: f[f.length - 1], flash: null, wob: null, big: null });
  }, [stage]);

  /* the agent types the whole decimal into the slot (toolApi.answer would drop its point) */
  HOOK.type = (v: any) => {
    const s0 = sr.current;
    if (s0.walk.open !== null || s0.making || s0.walk.hop) put({ walk: { ...s0.walk, open: null, typing: "", hop: null }, making: null });
    api.capture(null);
    api.setTyped(String(v));
    return true;
  };

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ cards: S.rows.map((r: any) => S.cards[r.id].text), aligned: S.rows.length > 0 && S.rows.every((r: any) => r.col === caAligned(S.cards[r.id])),
    columns: Object.keys(S.walk.sum).length, carries: Object.keys(S.walk.carry).length, sum: S.walk.done ? caBuilt(S.walk.sum) : "", swapped: S.swapped });

  /* ── drawing (helpers are called, never mounted) ── */
  const view = S.dm
    ? { rows: S.dm.rows.map((r: any) => ({ card: r, col: caAligned(r) })), carry: S.dm.carry, sum: S.dm.sum, point: S.dm.point, lit: S.dm.lit, total: S.dm.total, open: null, typing: "", hop: null }
    : { rows: S.rows.map((r: any) => ({ card: S.cards[r.id], col: r.col })), carry: S.walk.carry, sum: S.walk.sum, point: S.walk.point, lit: S.walk.open, total: null, open: S.walk.open, typing: S.walk.typing, hop: S.walk.hop };
  const lits: number[] = [...(view.lit !== null && view.lit !== undefined ? [view.lit] : []), ...(!S.dm && S.flash ? S.flash : [])];
  const tr = anim ? "transform 420ms ease-out" : undefined;
  const rowCard = (card: any, y: number, col: number, key: string, shake = 0) => {
    const cells = caCells(card), al = caAligned(card), nd = cells.length;
    return (
      <g key={key} style={{ transform: `translate(${(col - al) * CA.CW + shake}px, ${y}px)`, transition: shake ? undefined : tr } as any}>
        <rect x={CA.FX + al * CA.CW + 10} y={0} width={nd * CA.CW - 20} height={CA.RH} rx={14} fill={tint(CA_COL.given, 0.86)} stroke={CA_COL.given} strokeWidth={2.5} />
        {cells.map((c: any) => <text key={c.col} x={caX(c.col)} y={54} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={card.zero && c.kind === "hold" ? CA_INK.given : caInkOf(c.kind)}>{c.ch}</text>)}
        {card.pt && <circle cx={CA.PL} cy={47} r={8} fill={card.pt === "added" ? CA_INK.zero : CA_INK.line} />}
      </g>
    );
  };
  const carryBadge = (x: number, y: number, d: string) => (
    <g>
      <circle cx={x} cy={y} r={22} fill="#FFFFFF" stroke={CA_COL.carry} strokeWidth={3} />
      <text x={x} y={y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CA_INK.carry}>{d}</text>
    </g>
  );
  const hopAt = (h: any) => (h.t === 0 ? { x: caX(h.from), y: 386 } : h.t === 1 ? { x: (caX(h.from) + caX(h.to)) / 2, y: h.from === 2 ? 26 : 50 } : { x: caX(h.to), y: 70 });
  const frame = () => (
    <g>
      {/* the column heads, the column rules, the carry row, the ruled line */}
      {MODEL.columns.map((name: string, c: number) => <text key={"h" + c} x={caX(c)} y={30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(name)}</text>)}
      {[0, 1, 3, 4].map((k) => <line key={"v" + k} x1={CA.FX + k * CA.CW} y1={40} x2={CA.FX + k * CA.CW} y2={424} stroke={C.rule} strokeWidth={2} />)}
      <text x={96} y={80} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={CA_INK.carry}>{tx("Carry")}</text>
      <text x={96} y={226} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={CA_INK.given}>{tx("Given")}</text>
      <text x={96} y={400} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={CA_INK.sum}>{tx("Sum")}</text>
      <line x1={CA.FX} y1={CA.RULE} x2={CA.FX + 4 * CA.CW} y2={CA.RULE} stroke={CA_INK.line} strokeWidth={3} />
      {/* the cards on their rows */}
      {view.rows.map((r: any, k: number) => rowCard(r.card, CA.ROWS[k], r.col, r.card.id))}
      {!S.dm && S.wob && S.rows.length < MODEL.rows && rowCard(S.cards[S.wob.id], CA.ROWS[S.rows.length], S.wob.col, "wob", S.wob.t % 2 ? 12 : S.wob.t ? -12 : 0)}
      {/* the point line, through the answer row */}
      <line x1={CA.PL} y1={40} x2={CA.PL} y2={430} stroke={CA_INK.line} strokeWidth={4} />
      {/* the carries waiting on top of their columns */}
      {Object.keys(view.carry).map((c: string) => <g key={"k" + c}>{carryBadge(caX(+c), 70, String(view.carry[c]))}</g>)}
      {/* the sum row: the digits written so far, the point straight below the others */}
      {Object.keys(view.sum).map((c: string) => (+c === view.open ? null :
        <text key={"s" + c} x={caX(+c)} y={CA.BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={view.sum[c] === "0" ? CA_INK.hold : CA_INK.sum}>{view.sum[c]}</text>))}
      {view.point && <text x={CA.PL} y={CA.BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CA_INK.line}>.</text>}
      {view.open !== null && view.open !== undefined && (
        <g>
          <rect x={CA.FX + view.open * CA.CW + 10} y={CA.SUMY + 2} width={CA.CW - 20} height={68} rx={12} fill="#FFFFFF" stroke={CA_COL.now} strokeWidth={4} />
          {view.typing && <text x={caX(view.open)} y={CA.BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CA_INK.sum}>{view.typing}</text>}
          <line className="c4-caret" x1={caX(view.open) + view.typing.length * 17 + 6} y1={CA.SUMY + 14} x2={caX(view.open) + view.typing.length * 17 + 6} y2={CA.SUMY + 58} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
        </g>
      )}
      {view.total && (
        <g>
          <rect x={CA.FX + view.total.col * CA.CW + 10} y={CA.SUMY + 2} width={CA.CW - 20} height={68} rx={12} fill="#FFFFFF" stroke={CA_COL.now} strokeWidth={4} />
          <text x={caX(view.total.col)} y={CA.BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CA_INK.now}>{view.total.text}</text>
        </g>
      )}
      {/* the column being added, and a column a card covered by mistake: amber */}
      {lits.map((c: number, k: number) => <rect key={"l" + k} x={CA.FX + c * CA.CW + 3} y={40} width={CA.CW - 6} height={384} rx={10} fill={CA_COL.now} fillOpacity={0.16} stroke={CA_COL.now} strokeWidth={3} pointerEvents="none" />)}
      {view.hop && (
        <g style={{ transform: `translate(${hopAt(view.hop).x}px, ${hopAt(view.hop).y}px)`, transition: anim ? "transform 300ms ease-in-out" : undefined } as any}>
          {carryBadge(0, 0, view.hop.d)}
        </g>
      )}
    </g>
  );

  /* the tray: compact cards waiting, the one being dragged follows the finger */
  const dragging = drag.drag;
  let tx0 = 16;
  const trayPos: any = {};
  S.tray.forEach((id: string) => { const w = caCompactW(caChars(S.cards[id], !!(S.big && S.big.id === id))); trayPos[id] = { x: tx0, w }; tx0 += w + 14; });
  const compact = (card: any, x: number, w: number, big: boolean) => {
    const chars = caChars(card, big);
    return (
      <g>
        <rect x={x} y={CA.CARDY} width={w} height={72} rx={14} fill={tint(CA_COL.given, 0.86)} stroke={CA_COL.given} strokeWidth={2.5} />
        <text x={x + w / 2} y={CA.CARDY + 52} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={CA_INK.given}>
          {chars.map((c: any, k: number) => <tspan key={k} fill={caInkOf(c.kind)}>{c.ch}</tspan>)}
        </text>
      </g>
    );
  };
  const tray = () => (
    <g>
      <rect x={0} y={CA.TRAY} width={4 * CA.CW + CA.FX} height={CA.TRAYH} rx={18} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
      {S.tray.map((id: string) => {
        if (S.wob && S.wob.id === id) return null;
        const card = S.cards[id], pos = trayPos[id], big = !!(S.big && S.big.id === id);
        const dd = dragging && dragging.payload && dragging.payload.id === id ? dragging : null;
        const off = dd ? `translate(${dd.x - (pos.x + pos.w / 2)}px, ${dd.y - (CA.CARDY + 36)}px)` : undefined;
        return (
          <g key={id} {...(live ? { ...control("card-" + id, "card " + card.text), ...drag.bind({ kind: "card", id }), ...drag.keys({ kind: "card", id }), className: "c4-piece" } : {})}
            style={{ transform: off } as any} filter={dd ? "url(#fLift)" : undefined}>
            {compact(card, pos.x, pos.w, big)}
          </g>
        );
      })}
      {S.big && trayPos[S.big.id] && (
        <text x={trayPos[S.big.id].x + trayPos[S.big.id].w / 2} y={CA.TRAY - 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CA_INK.zero} pointerEvents="none">
          {wordsIn(+S.cards[S.big.id].text * 10, lang)}
        </text>
      )}
      {S.making && (() => {
        const w = Math.max(120, caCompactW(caChars({ text: S.making.text.replace(/\.$/, ""), pt: S.making.text.includes(".") ? "given" : null })) + 24);
        return (
          <g>
            <rect x={tx0} y={CA.CARDY} width={w} height={72} rx={14} fill="#FFFFFF" stroke={CA_COL.now} strokeWidth={4} />
            {S.making.text && <text x={tx0 + w / 2 - 8} y={CA.CARDY + 52} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={CA_INK.given}>{S.making.text}</text>}
            <line className="c4-caret" x1={tx0 + w / 2 + S.making.text.length * 12} y1={CA.CARDY + 14} x2={tx0 + w / 2 + S.making.text.length * 12} y2={CA.CARDY + 58} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
          </g>
        );
      })()}
    </g>
  );

  /* the controls down the right: only those this phase uses */
  const show = {
    neu: free, point: free || n === 3, like: true, swap: free || n === 4, add: true,
    zero: S.zeroOut,
  };
  const btn = (id: string, slot: number, label: string, on: boolean, fn: () => void, primary = false) => (
    <Key key={id} id={id} x={CA.BX} y={CA.BY[slot]} w={CA.BW} h={CA.BH} C={C} primary={primary && on} disabled={!on} onClick={fn} label={label}>
      <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={!on ? C.dim : primary ? "#FFFFFF" : C.ink}>{tx(label)}</text>
    </Key>
  );
  const zdrag = dragging && dragging.payload && dragging.payload.kind === "zero" ? dragging : null;
  const addOn = live && canAdd();
  const swapOn = live && S.rows.length >= 2 && (stage !== "teach" || n === 4);
  const controls = () => (
    <g>
      {show.neu && btn("new-card", 0, "New card", live && Object.keys(S.cards).filter((k) => k !== "z").length < MODEL.trayMax, onNew)}
      {show.point && btn("point-first", 1, "Point first", live && unpointed, onPoint)}
      {show.like && btn("like", 2, "Like", live && likeUseful && (stage !== "teach" || n !== 4), onLike)}
      {show.swap && btn("swap", 3, "Swap", swapOn, onSwap)}
      {show.add && btn("add", 4, "Add", addOn, onAdd, true)}
      {show.zero && (
        <g {...(live && S.rows.length < MODEL.rows ? { ...control("zero-card", "Add zero card"), ...drag.bind({ kind: "zero" }), ...drag.keys({ kind: "zero" }), className: "c4-piece" } : {})}
          style={{ transform: zdrag ? `translate(${zdrag.x - (CA.BX + CA.BW / 2)}px, ${zdrag.y - (CA.BY[5] + CA.BH / 2)}px)` : undefined } as any} filter={zdrag ? "url(#fLift)" : undefined}>
          <rect x={CA.BX} y={CA.BY[5]} width={CA.BW} height={CA.BH} rx={14} fill={tint(CA_COL.given, 0.86)} stroke={CA_COL.given} strokeWidth={2.5} />
          <text x={CA.BX + 50} y={CA.BY[5] + 56} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CA_INK.given}>0</text>
          <text x={CA.BX + 176} y={CA.BY[5] + 49} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CA_INK.given}>{tx("Add zero")}</text>
        </g>
      )}
    </g>
  );

  /* the one thing to touch */
  let inv: any = null;
  if (!tl.busy && !S.dm && !cellBusy && !S.wob) {
    if (stage === "teach") inv = n === 4 ? "swap" : (n === 1 || n === 3) && S.tray.length ? "tray" : null;
    else if (stage === "ask") inv = unpointed && S.tried ? "point" : S.tray.length ? "tray" : S.zeroOut ? "zero" : !Object.keys(S.walk.sum).length && addOn ? "add" : null;
  }
  const invAt: any = inv === "tray" ? { x: trayPos[S.tray[0]].x + trayPos[S.tray[0]].w / 2, y: CA.CARDY + 36 }
    : inv === "point" ? { x: CA.BX + CA.BW / 2, y: CA.BY[1] + CA.BH / 2 } : inv === "swap" ? { x: CA.BX + CA.BW / 2, y: CA.BY[3] + CA.BH / 2 }
    : inv === "add" ? { x: CA.BX + CA.BW / 2, y: CA.BY[4] + CA.BH / 2 } : inv === "zero" ? { x: CA.BX + CA.BW / 2, y: CA.BY[5] + CA.BH / 2 } : null;

  return (
    <g>
      {/* the running count: columns added so far, from the right */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={20} y={-46} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("Columns added")}</text>
        <text x={308} y={-38} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{String(Object.keys(S.walk.sum).length)}</text>
      </g>
      <g pointerEvents={S.dm ? "none" : undefined}>{frame()}</g>
      {free && live && S.rows.map((r: any, k: number) => {
        const card = S.cards[r.id], al = caAligned(card), nd = caCells(card).length;
        return <Hit key={"back-" + r.id} id={"back-" + r.id} x={CA.FX + al * CA.CW + 10} y={CA.ROWS[k] - 1} w={nd * CA.CW - 20} h={72} onPress={() => unplace(r.id)} label={"take back " + card.text} />;
      })}
      {tray()}
      {controls()}
      {invAt && <Invite x={invAt.x} y={invAt.y} r={30} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const it = ((PHASES[(n || 1) - 1] || { items: [] }) as any).items[last.item] || {};
  const line = [...(it.zero ? ["0"] : []), ...(it.cards || [])].join("+");
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {line && <text x={w - 14} y={32} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={CA_INK.given}>{line}</text>}
      <text x={w - 14} y={h - 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={CA_INK.sum}>{"= " + String(last.value)}</text>
    </g>
  );
}

function ColumnAdder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, pointKey: true, winMs: 2000, fitHost: () => null }} />
  );
}

export default ColumnAdder;
