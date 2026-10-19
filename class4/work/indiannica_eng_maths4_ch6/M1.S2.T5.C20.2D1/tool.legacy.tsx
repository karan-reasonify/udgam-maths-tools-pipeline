/* ═══ M1.S2.T5.C16.2D1 · fact_both_ways · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   Fact Both Ways: one exact division read from both ends, and never a word without its number.
   1  the card: turn it, and name both numbers of the fact in the sentence (the name-it gate)
   2  the pair bay: a factor pair laid out as equal rows builds a number that belongs to both
   3  the size rail: numbers drawn to scale; a factor has to fit inside its number
   4  the own list bay: a number closes its pen of factors and opens its track of multiples */

const TOOL_ID = "fact_both_ways";
const MEDIA_ID = "M1.S2.T5.C16.2D1";
const TOOL_NAME = "Fact Both Ways";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["One division on a card. It has another face, and both of them are true."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every card turned, and never once a word left hanging with no number on it.";
/* said when the child opens Free play from the summary page (the plan's free-play line, fitted to this mode) */
const FREE_LINE = "Free play. Turn any exact division on the card, and try its numbers on the rail.";

/* content roles (the plan's colours): divides exactly = deep blue, built by multiplying = green,
   in both lists = rose, left over or a trial that fails = vermilion, the number being broken up = amber */
const FAC = CONTENT.hundred, MUL = CONTENT.one, BOTH = CONTENT.bead, OVER = CONTENT.pointer, HAND = CONTENT.ten;
const inkOf = (c: string) => shade(c, 0.25);

/* One entry per phase = one mount. Item kinds (Work, judge and oracle switch on them):
   sent   a sentence "[ ] is a factor of [ ]" (or "multiple"): two gaps filled with number tiles, "a|b"
   sent1  one gap: "[ ] is a factor of 6 and 9", the number
   word   a word key: what the built number is to the pair
   build  the built number, typed on the pad
   pairs  every factor pair, marked on the working area: "1×20,2×10,4×5" (any order)
   yn     yes or no
   both   which of its own lists the number is dropped into: "both" | "factors" | "multiples"
   ends   two boxes: the greatest factor and the smallest multiple
   list   every factor, marked on the working area: "1,5,13,65" (any order)
   forms  the forms of the answer no question, hint or ladder line may print (answerForms) */
const PHASES = [
  {
    n: 1,
    concept: "Two words for the two ends of one division",
    conceptId: "M1.S2.T5.C16", objectiveIds: ["O7"],
    says: ["A factor is always a factor of some number. Never say the word without its number.",
      "Tap the card to turn it. Then drop number tiles into the gaps."],
    ladder: ["Which number is being divided, and what is it to the other one?",
      "Think of a small card: 6 divided by 2. Then 2 is a factor of 6, and 6 is a multiple of 2."],
    closing: "When one number divides another exactly, it is a factor of that number. That number is a multiple of it.",
    learned: "You learned: one exact division gives a factor and a multiple.",
    traceback: "The size rail draws both numbers to scale and turns a bigger factor back; then both faces of the card stand up together, each naming its number.",
    items: [
      /* learn ML1: answer in the plan = 6 is a factor of 78, and 78 is a multiple of 6 */
      { qid: "M1.S2.T5.C16:ML1", kind: "sent", face: "factor", card: [78, "÷", 6, 13], tiles: [6, 78], pad: "enter", winMs: 2800, reads: 2,
        say: "6 divides 78 exactly. Which of the two is the factor and which is the multiple?",
        ask: "Which is the factor?", answer: "6|78", near: "78|6",
        forms: ["6 is a factor of 78", "78 is a multiple of 6"],
        miss: "Which of the two numbers is doing the dividing?" },
      /* practice 1: answer in the plan = 7 is a factor of 77, and 77 is a multiple of 7
         (the child writes the multiples fact; the factors fact joins it on the card, no second piece of work) */
      { qid: "M1.S2.T5.C16:1", kind: "sent", face: "multiple", card: [77, "÷", 7, 11], tiles: [7, 77], pad: "enter", winMs: 2800, reads: 2,
        say: "7 divides 77 exactly. Say that as a fact about multiples. The fact about factors comes with it.",
        ask: "Which is the multiple?", answer: "77|7", near: "7|77",
        forms: ["77 is a multiple of 7", "7 is a factor of 77"],
        miss: "Which number holds the other exactly, with nothing left over?" },
      /* practice 3: answer in the plan = 72, and 8 and 9 are its factors (72 of 8 or 72 of 9 both read it) */
      { qid: "M1.S2.T5.C16:3", kind: "sent", face: "multiple", card: [8, "×", 9, 72], tiles: [8, 9, 72], pad: "enter", winMs: 2800, reads: 2,
        say: "In the multiplication 8 times 9 is 72, which number is the multiple?",
        ask: "Which one is the multiple?", answer: "72|8", accept: ["72|8", "72|9"], near: "8|72",
        forms: ["72 is a multiple of 8", "72 is a multiple of 9", "72 is the multiple"],
        miss: "Which number did the multiplying build?" },
    ],
  },
  {
    n: 2,
    concept: "A factor pair and the number it builds",
    conceptId: "M1.S2.T5.C17", objectiveIds: ["O7"],
    says: ["A factor pair lays out equal rows on the board. The rows come to one number."],
    ladder: ["Does each of them divide what they built?",
      "Think small: 2 rows of 3 make 6, and both 2 and 3 go into 6 exactly."],
    closing: "The product of a factor pair is a multiple of both numbers in the pair.",
    learned: "You learned: multiply a factor pair to get what both go into.",
    traceback: "The rows are laid out one at a time and counted at their ends; the rail takes each small number as a factor and turns the built number back.",
    items: [
      /* learn ML2: answer in the plan = Their multiple: 57 is a multiple of 3 and a multiple of 19 */
      { qid: "M1.S2.T5.C17:ML2", kind: "word", pair: [3, 19], built: 57, winMs: 2400, reads: 2,
        say: "3 and 19 are a factor pair of 57. What is 57 to them?",
        ask: "What is 57 to 3 and 19?",
        choices: [{ id: "factor", label: "factor" }, { id: "multiple", label: "multiple" }], answer: "multiple", near: "factor",
        forms: ["57 is a multiple", "their multiple", "multiple of 3 and", "multiple of both"],
        miss: "What do those two numbers build?" },
      /* practice 2: answer in the plan = 46, and 46 is a multiple of both 2 and 23 */
      { qid: "M1.S2.T5.C17:2", kind: "build", pair: [2, 23], winMs: 2600, reads: 2,
        say: "2 and 23 are a factor pair. Which number do they build, and what is it to them? Tap the board to lay the rows.",
        ask: "What do 2 and 23 build?", answer: 46, near: 23,
        forms: ["46", "forty-six", "multiple of 2 and 23"],
        miss: "One row is not what the pair builds. Count both rows." },
      /* practice 5: answer in the plan = 1 and 20, 2 and 10, and 4 and 5. 20 is the multiple of every one of those pairs */
      { qid: "M1.S2.T5.C17:5", kind: "pairs", whole: 20, tiles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], pad: "enter", winMs: 2600, reads: 3,
        say: "Write all three factor pairs of 20, and say what 20 is to each pair. Tap a number to lay 20 in that many rows.",
        ask: "Find all three pairs of 20", answer: "1×20,2×10,4×5", near: "2×10,4×5",
        forms: ["1 × 20", "1×20", "2 × 10", "2×10", "4 × 5", "4×5"],
        miss: "Try each number from 1 up. Which rows leave nothing over?" },
    ],
  },
  {
    n: 3,
    concept: "A factor is never the bigger one",
    conceptId: "M1.S2.T5.C18", objectiveIds: ["O8"],
    says: ["The rail draws each number to scale. A factor has to fit inside the number it belongs to."],
    ladder: ["Can a bigger number go into a smaller one even once?",
      "Think small: can 5 go into 2 even once? The longer one never fits inside the shorter."],
    closing: "A factor is never greater than the number it belongs to, though it may be equal to it.",
    learned: "You learned: a factor fits inside its number, or matches it exactly.",
    traceback: "The rail offers each number to the factor slot in turn: a smaller one settles, a bigger one is turned back with its extra length left drawn.",
    items: [
      /* learn ML3: answer in the plan = No, because 35 is greater than 21 */
      { qid: "M1.S2.T5.C18:ML3", kind: "yn", nums: [21, 35], claim: [35, 21], winMs: 3000, reads: 1,
        say: "Could 35 be a factor of 21?", ask: "Could 35 be a factor of 21?",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], answer: "no", near: "yes",
        forms: ["35 is greater than 21", "35 is bigger than 21", "not a factor of 21"],
        miss: "Which of the two numbers is the bigger?" },
      /* practice 4: answer in the plan = No. 88 is greater than 44, and a factor is never greater than the
         number it divides. 44 is a factor of 88 instead (the child writes the true sentence) */
      { qid: "M1.S2.T5.C18:4", kind: "sent", face: "factor", tiles: [88, 44], pad: "enter", winMs: 2600, reads: 2,
        say: "Can 88 be a factor of 44? Put the two tiles in the sentence to make it true.",
        ask: "Which is the factor?", answer: "44|88", near: "88|44",
        forms: ["44 is a factor of 88", "88 is a multiple of 44"],
        miss: "Which number fits inside the other on the rail?" },
      /* practice 7: answer in the plan = 9 is greater than 6, so it cannot divide 6 exactly. What is true is
         that 3 is a factor of both 6 and 9 (the child puts the true factor in the sentence) */
      { qid: "M1.S2.T5.C18:7", kind: "sent1", face: "factor", of: [6, 9], tiles: [9, 3], pad: "enter", winMs: 3000, reads: 2,
        say: "A child says 9 is a factor of 6, because 3 divides both of them. What is the mistake, and what is true?",
        ask: "A factor of 6 and 9?", answer: "3", near: "9",
        forms: ["3 is a factor of 6", "3 is a factor of 9", "3 is a factor of both"],
        miss: "Can 9 fit inside 6 on the rail?" },
    ],
  },
  {
    n: 4,
    concept: "A number stands at both ends of its own list",
    conceptId: "M1.S2.T5.C19", objectiveIds: ["O8"],
    says: ["The pen holds a number's factors, with a wall at each end. The track holds its multiples, and it never ends."],
    ladder: ["Which number is the first step of the track?",
      "Think small: the factors of 4 are 1, 2 and 4. The multiples of 4 start 4, 8, 12."],
    closing: "A number is its own greatest factor and its own smallest multiple.",
    learned: "You learned: a number shuts its factor list and opens its multiples.",
    traceback: "The number stands at the shut end of its pen and the first step of its track at once, a hairline joins the two, and each list is read up to it.",
    items: [
      /* learn ML4: answer in the plan = At the top of one and the foot of the other: 17 is the greatest factor
         of 17 and the smallest multiple of 17 (the child drops the card into each list it belongs to) */
      { qid: "M1.S2.T5.C19:ML4", kind: "both", num: 17, pen: [1], track: [34, 51, 68, 85], pad: "enter", winMs: 3000, reads: 2,
        say: "Where does 17 sit in its own list of factors, and in its own list of multiples? Drop the 17 card in each list it belongs to.",
        ask: "Where does 17 go?", answer: "both", near: "factors",
        forms: ["in both lists", "in both of its lists", "17 is the greatest factor of 17"],
        miss: "Does 17 divide 17 exactly? Does one step of 17 land on 17?" },
      /* practice 6: answer in the plan = Both of them are 34 itself */
      { qid: "M1.S2.T5.C19:6", kind: "ends", num: 34, parts: [{ label: "greatest" }, { label: "smallest" }], winMs: 3000, reads: 2,
        say: "Name the greatest factor of 34, and the smallest multiple of 34.",
        ask: "Factor, then multiple of 34", answer: [34, 34], near: [17, 68],
        forms: ["34 is the greatest factor", "34 is its own greatest factor", "the smallest multiple of 34 is 34"],
        miss: "Which number is standing at the shut end of the pen?" },
      /* practice 8: answer in the plan = 65 itself, and its factors are 1, 5, 13 and 65 */
      { qid: "M1.S2.T5.C19:8", kind: "list", num: 65, cands: [1, 2, 3, 5, 10, 13, 15, 25, 65], pad: "enter", winMs: 3000, reads: 2,
        say: "Which number is both the greatest factor of 65, and its smallest multiple? And what are all four of its factors? Tap each factor to pen it.",
        ask: "Tap all four factors of 65", answer: "1,5,13,65", near: "1,5,13",
        forms: ["1, 5, 13, 65", "1, 5, 13 and 65", "5 and 13", "5 × 13"],
        miss: "Test each card: does it go into 65 with nothing left over?" },
    ],
  },
];

/* free play: exact divisions for the card (dividend, divisor) */
const FREE_CARDS = [[78, 6], [77, 7], [57, 3], [57, 19], [46, 2], [20, 4], [65, 5], [34, 17], [88, 44], [72, 8]];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  roles: { factor: FAC, multiple: MUL, inBothLists: BOTH, leftOverOrRefused: OVER, brokenUp: HAND },
  rail: { x: 103, width: 880, from: 0, to: "the greatest number shown", factorSlot: "from 0 to the number it belongs to" },
  gate: "a sentence is sent only when every gap holds a number; an open gap springs back lit, nothing marked",
  freeCards: FREE_CARDS,
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* reading what the working area sends */
const pairOf = (v: any) => { const m = /^\s*(\d+)\s*\|\s*(\d+)\s*$/.exec(String(v ?? "")); return m ? [Number(m[1]), Number(m[2])] : null; };
const listOf = (v: any) => String(v ?? "").split(/[,\s|]+/).filter(Boolean).map(Number).filter((x) => isFinite(x));
const pairsOf = (v: any) => String(v ?? "").split(/[,\s|]+/).filter(Boolean).map((p) => p.split(/[×x*]/).map(Number))
  .filter((p) => p.length === 2 && p.every((x) => isFinite(x) && x > 0));
const byNum = (a: number, b: number) => a - b;

/* judge: is this value right for this item? (lists and pairs in any order) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  const s = String(v ?? "").trim();
  if (item.kind === "sent") { const p = pairOf(s); return !!p && (item.accept || [item.answer]).includes(p.join("|")); }
  if (item.kind === "sent1" || item.kind === "build") return /^\d+$/.test(s) && Number(s) === Number(item.answer);
  if (item.kind === "pairs") {
    const norm = (x: any) => [...new Set(pairsOf(x).map((p) => p.slice().sort(byNum).join("x")))].sort();
    const a = norm(s), b = norm(item.answer);
    return a.length === b.length && a.every((x, i) => x === b[i]);
  }
  if (item.kind === "list") {
    const a = [...new Set(listOf(s))].sort(byNum).join(","), b = listOf(item.answer).sort(byNum).join(",");
    return a === b;
  }
  return s.toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: every answer re-derived from the item's own numbers by repeated subtraction and counting,
   sharing no code with judge() or the picture */
const goesInto = (d: number, n: number) => { let r = n; while (r >= d && d > 0) r -= d; return r === 0; };
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const keys = it.accept || [it.answer];
  if (it.kind === "sent") {
    const ok: string[] = [];
    for (const a of it.tiles) for (const b of it.tiles) {
      if (a === b) continue;
      if (it.face === "factor" && a < b && goesInto(a, b)) ok.push(a + "|" + b);
      if (it.face === "multiple" && a > b && goesInto(b, a)) ok.push(a + "|" + b);
    }
    return ok.length > 0 && ok.length === keys.length && ok.every((x) => keys.includes(x));
  }
  if (it.kind === "sent1") {
    const ok = it.tiles.filter((t: number) => it.of.every((m: number) => t < m && goesInto(t, m)));
    return ok.length === 1 && String(ok[0]) === String(it.answer);
  }
  if (it.kind === "word") return goesInto(it.pair[0], it.built) && goesInto(it.pair[1], it.built) && it.built > it.pair[1] && it.answer === "multiple";
  if (it.kind === "build") { let s = 0; for (let r = 0; r < it.pair[0]; r++) s += it.pair[1]; return s === it.answer; }
  if (it.kind === "pairs") {
    const got: string[] = [];
    for (let d = 1; d * d <= it.whole; d++) if (goesInto(d, it.whole)) { let q = 0, r = it.whole; while (r > 0) { r -= d; q++; } got.push(d + "×" + q); }
    return got.join(",") === it.answer;
  }
  if (it.kind === "yn") return (it.claim[0] <= it.claim[1] && goesInto(it.claim[0], it.claim[1]) ? "yes" : "no") === it.answer;
  if (it.kind === "both") return goesInto(it.num, it.num) && it.pen.every((f: number) => goesInto(f, it.num)) && it.answer === "both";
  if (it.kind === "ends") {
    const f: number[] = [];
    for (let d = 1; d <= it.num; d++) if (goesInto(d, it.num)) f.push(d);
    return f[f.length - 1] === it.answer[0] && it.num === it.answer[1];
  }
  if (it.kind === "list") {
    const f: number[] = [];
    for (let d = 1; d <= it.num; d++) if (goesInto(d, it.num)) f.push(d);
    return f.join(",") === it.answer && f.every((x) => it.cands.includes(x));
  }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => item.forms || [String(item.answer)];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the word of the sentence being built, so the slot reads back the child's own sentence ("78 factor
   of 6"), not two loose numbers. Work sets it as it draws; the slot is drawn just after */
const FACE: any = { word: null };
/* the slot shows what the working area sent, read as the child made it: one terse grammar for every
   question ("78 factor 6", "77 multiple 7"), since the slot is tight at full size and the whole
   sentence already stands on the working area */
const format = (s: any, k?: number, o?: any) => {   /* o: { lang, tx } from the runtime (r20+) */
  const t = String(s ?? "");
  if (k !== undefined) return t;
  if (/^\d+\|\d+$/.test(t)) {
    const p = t.split("|"), w = FACE.word || "of";
    if (o && LB[o.lang]) return LB[o.lang].slot(p[0], p[1], FACE.word);
    return `${p[0]} ${w} ${p[1]}`;
  }
  if (/×/.test(t)) return t.split(",").join(" ");
  if (/^\d+(,\d+)+$/.test(t)) return t.split(",").join(", ");
  const W0: Record<string, string> = { both: "in both", factors: "factors only", multiples: "multiples only", yes: "Yes", no: "No" };
  return W0[t] || t;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T0: any) => {
  if (item.pad === "enter" && HOOK.set) { HOOK.set(agentKey(item)); setTimeout(() => HOOK.enter && HOOK.enter(), 80); return; }
  return T0.submit(agentKey(item));
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: nothing waits here, so Enter */
const check = () => undefined;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */

const FB_CSS = `
.fb-t{transition:transform 460ms cubic-bezier(.3,.7,.25,1)}
.fb-in{animation:fbIn 480ms ease-out both}
@keyframes fbIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.fb-flip{transform-box:fill-box;transform-origin:center;animation:fbFlip 560ms ease-in-out both}
@keyframes fbFlip{0%{transform:scaleX(1)}50%{transform:scaleX(0.05)}100%{transform:scaleX(1)}}
.fb-grow{transform-box:fill-box;transform-origin:left center;animation:fbGrow 620ms ease-out both}
@keyframes fbGrow{from{transform:scaleX(0.02)}to{transform:scaleX(1)}}
.fb-lit{animation:fbLit 380ms ease-in-out 3}
@keyframes fbLit{50%{stroke-opacity:.3}}
.fb-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.fb-t{transition:none}.fb-in,.fb-flip,.fb-grow,.fb-lit{animation:none}}
`;

const BW = 96, BH = 84, SGAP = 14;           /* a gap in a sentence, and the space between parts */
const TW = 116, TH = 88;                     /* a number tile */
const RX = 103, RW = 880;                    /* the size rail: 0 at RX, the greatest number at RX + RW */

/* a number tile: white, with its number in ink (coloured only once the fact is known) */
function FbTile({ x, y, w = TW, h = TH, v, col, lit, lift, dash, C }: any) {
  const fs = String(v).length >= 3 ? T.prompt : T.xl;
  return (
    <g filter={lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
      <rect x={x} y={y} width={w} height={h} rx={16} fill={lit ? tint(lit, dash ? 0.9 : 0.8) : "url(#gKey)"} stroke={lit ? lit : C.rule} strokeWidth={lit ? 4 : 2} strokeDasharray={dash ? "8 6" : undefined} />
      <text x={x + w / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={col ? inkOf(col) : C.ink}>{v}</text>
    </g>
  );
}

/* a gap in a sentence (dashed while open) or a number already named in it */
function FbBox({ x, y, w = BW, h = BH, v, col, lit, dash, C }: any) {
  const has = v !== null && v !== undefined && v !== "";
  const fs = String(v ?? "").length >= 3 ? T.prompt : T.xl;
  return (
    <g>
      <rect className={lit ? "fb-lit" : undefined} x={x} y={y} width={w} height={h} rx={14}
        fill={has ? (dash ? tint(C.panel, 0.55) : "#FFFFFF") : tint(C.panel, 0.35)} stroke={lit ? C.accent : has ? (col || C.ink) : C.dim}
        strokeWidth={lit ? 5 : has ? 3 : 2.5} strokeDasharray={has ? (dash ? "8 6" : undefined) : "9 7"} />
      {has && <text x={x + w / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={col ? inkOf(col) : C.ink}>{v}</text>}
    </g>
  );
}

/* words with the key word in its colour: "is a factor of" */
function FbWords({ x, y, t, kw, face, C, fs = T.label }: any) {
  const i = kw ? t.indexOf(kw) : -1;
  const col = (face || kw) === "factor" ? FAC : MUL;   /* face: the key word's role in Hindi / Gujarati */
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={fs} fontWeight={600} fill={C.ink}>
      {i < 0 ? t : [t.slice(0, i), <tspan key="k" fill={inkOf(col)} fontWeight={700}>{kw}</tspan>, t.slice(i + kw.length)]}
    </text>
  );
}

/* a sentence in a row: { b: k } a gap, { n: v } a named number, { t, kw } words, { q: 1 } a question mark */
const sentLay = (parts: any[], cx: number) => {
  /* Gujarati script sets wider per code unit than Latin or Devanagari (English never matches) */
  const ws = parts.map((p) => (p.t !== undefined ? Math.max(30, p.t.length * T.label * (/[અ-હ]/.test(p.t) ? 0.6 : 0.5)) : p.q ? 34 : BW));
  const total = ws.reduce((a, b) => a + b, 0) + SGAP * (parts.length - 1);
  let x = cx - total / 2;
  return parts.map((p, i) => { const o = { ...p, x, w: ws[i] }; x += ws[i] + SGAP; return o; });
};
const gapAt = (lay: any[], cy: number, p: any) => {
  const g = lay.find((q) => q.b !== undefined && p.x >= q.x - 22 && p.x <= q.x + BW + 22 && p.y >= cy - BH / 2 - 30 && p.y <= cy + BH / 2 + 30);
  return g ? g.b : null;
};
/* ghost: the correction's own numbers, drawn over the gaps (dashed where they differ from the child's);
   the child's own numbers stay in `vals` and come back the moment they act */
function FbSent({ lay, cy, vals: own, cols, lit, C, live, onClear, tag, ghost }: any) {
  const vals = ghost || own;
  const dashOf = (b: number) => !!ghost && ghost[b] !== own[b];
  return (
    <g>
      {lay.map((p: any, i: number) => {
        if (p.t !== undefined) return <FbWords key={i} x={p.x + p.w / 2} y={cy + T.label * 0.36} t={p.t} kw={p.kw} face={p.face} C={C} />;
        if (p.q) return <text key={i} x={p.x + p.w / 2} y={cy + T.xl * 0.36} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>?</text>;
        if (p.n !== undefined) return <FbBox key={i} x={p.x} y={cy - BH / 2} v={p.n} col={p.col} C={C} />;
        const v = vals[p.b];
        return (
          <g key={i}>
            <FbBox x={p.x} y={cy - BH / 2} v={v} col={cols ? cols[p.b] : null} lit={(lit || []).includes(p.b)} dash={dashOf(p.b)} C={C} />
            {live && own[p.b] !== null && own[p.b] !== undefined && (
              <Hit id={`${tag}-gap-${p.b + 1}`} label={`Take ${own[p.b]} out`} x={p.x - 2} y={cy - BH / 2 - 2} w={BW + 4} h={BH + 4} onPress={() => onClear(p.b)} />
            )}
          </g>
        );
      })}
    </g>
  );
}

/* the size rail: every number drawn at its own distance from 0. The factor slot of a number is the
   band from 0 to it; a bar offered to it settles inside, or runs past its end and is turned back */
function FbRail({ y0, max, pins, zone, bar, ghosts, tip, C, big, lang = "en", tx = (v: any) => v }: any) {
  const X = (v: number) => RX + (v / max) * RW;
  const lb = LB[lang];
  const base = y0 + (big ? 120 : 64);
  const tagFs = big ? T.xl : T.label;
  const sorted = (pins || []).slice().sort((a: any, b: any) => a.v - b.v);
  let lastX = -1e9, lvl = 0;
  const tags = sorted.map((p: any) => { const x = X(p.v); lvl = x - lastX < 62 ? lvl + 1 : 0; lastX = x; return { ...p, x, lvl }; });
  const hasZone = zone !== null && zone !== undefined;
  return (
    <g data-role="rail">
      {hasZone && (
        <g key={"z" + zone} className="fb-in">
          <rect x={RX} y={base - 22} width={X(zone) - RX} height={44} rx={12} fill={tint(FAC, 0.86)} stroke={FAC} strokeWidth={2} strokeDasharray="8 6" />
          {big && <text x={(RX + X(zone)) / 2} y={base + 74} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={inkOf(FAC)}>{lb ? lb.factorsOf(zone) : `factors of ${zone}`}</text>}
        </g>
      )}
      <line x1={RX} y1={base} x2={RX + RW} y2={base} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      <text x={RX - 14} y={base + 10} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>0</text>
      {(ghosts || []).map((g: any, i: number) => (
        <g key={"g" + i + g.v}>
          <rect x={RX} y={base + (big ? 30 : 26) } width={X(g.v) - RX} height={12} rx={6} fill="none" stroke={inkOf(FAC)} strokeWidth={2} strokeDasharray="6 5" />
          <rect x={X(g.past)} y={base + (big ? 30 : 26)} width={X(g.v) - X(g.past)} height={12} rx={6} fill={OVER} fillOpacity={0.55} />
        </g>
      ))}
      {bar && (
        <g key={"b" + bar.v + "-" + zone} className="fb-grow" filter="url(#fShadowSoft)">
          <rect x={RX} y={base - 10} width={X(bar.v) - RX} height={20} rx={10} fill="url(#gHundred)" />
          {hasZone && bar.v > zone && <rect x={X(zone)} y={base - 10} width={X(bar.v) - X(zone)} height={20} rx={10} fill="url(#gPointer)" />}
        </g>
      )}
      {tags.map((t: any) => (
        <g key={"p" + t.v}>
          <line x1={t.x} y1={base - 16} x2={t.x} y2={base + 16} stroke={t.col || C.ink} strokeWidth={4} strokeLinecap="round" />
          <text x={t.x} y={base - 28 - t.lvl * (tagFs + 2)} textAnchor="middle" fontSize={tagFs} fontWeight={700} fill={t.col ? inkOf(t.col) : C.ink}>{t.v}</text>
        </g>
      ))}
      {/* what a number on the rail is, when the correction brings one in (at most four words) */}
      {tip && <text className="fb-in" x={X(tip.v)} y={base - 34 - tagFs} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={inkOf(FAC)}>{tx(tip.text)}</text>}
    </g>
  );
}

/* a turn arrow for the card's corner */
function FbTurnIcon({ x, y, C }: any) {
  return (
    <g stroke={C.accent} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${x - 18} ${y + 6} A 19 19 0 1 1 ${x + 4} ${y + 18}`} />
      <path d={`M ${x - 26} ${y - 2} L ${x - 18} ${y + 8} L ${x - 7} ${y + 1}`} />
    </g>
  );
}

/* the gap sentence the child fills: gaps, lit gaps and the one rule, a gap is filled only by a number.
   The correction never writes in here. It sets `ghost`, a layer that only draws, and the first tile put
   in after a miss starts the sentence afresh (as a digit does in the slot). Enter answers only once the
   child has acted since the miss, so a bare Enter after a correction does nothing at all. */
function useFbGaps(nb: number, api: any) {
  const [fill, setFillS] = useState<any[]>(() => Array(nb).fill(null));
  const fillRef = useRef<any[]>(fill);
  const [lit, setLit] = useState<number[]>([]);
  const [ghost, setGhostS] = useState<any>(null);
  const ghostRef = useRef<any>(null);
  const acted = useRef(false);                    /* the child has moved a piece since this question opened */
  const stale = useRef(false);                    /* their answer is the missed one: the next tile starts again */
  const setFill = (f: any[]) => { fillRef.current = f; setFillS(f); };
  const setGhost = (g: any) => { ghostRef.current = g; setGhostS(g); };
  const put = (v: number, k: number | null) => {
    let f = fillRef.current.slice();
    if (stale.current) { f = f.map(() => null); stale.current = false; }
    const at = k !== null && k !== undefined ? k : f.findIndex((x) => x === null);
    if (at < 0) return false;
    f[at] = v; setFill(f); setLit([]); setGhost(null); acted.current = true; api.sfx.tick();
    return true;
  };
  const clear = (k: number) => {
    const f = fillRef.current.slice(); f[k] = null;
    setFill(f); setGhost(null); acted.current = true; stale.current = false;
  };
  const reset = (n2: number) => { setFill(Array(n2).fill(null)); setLit([]); setGhost(null); acted.current = false; stale.current = false; };
  /* a miss: the child's sentence stays theirs, but it is the answer they gave, so it waits for an act */
  const missed = () => { acted.current = false; stale.current = true; };
  /* the name-it gate: a sentence with an open gap springs back, the gap lit, nothing marked */
  const gate = () => {
    const open = fillRef.current.map((x, i) => (x === null ? i : -1)).filter((i) => i >= 0);
    if (!open.length) return false;
    /* a literal line, so the voice baker finds it (Hindi and Gujarati speak only from baked clips) */
    setLit(open); api.say("Say which number it belongs to, and put that number in the gap.");
    return true;
  };
  const take = (v: any) => { setFill(v); setGhost(null); acted.current = true; stale.current = false; };
  return { fill, fillRef, setFill: take, lit, setLit, ghost, setGhost, acted, stale, put, clear, reset, missed, gate };
}

const numColsOf = (face: string) => (face === "factor" ? [FAC, MUL] : [MUL, FAC]);
const faceParts = (face: string, lang = "en") => (LB[lang] ? LB[lang].face(face)
  : [{ b: 0 }, { t: face === "factor" ? "is a factor of" : "is a multiple of", kw: face }, { b: 1 }]);

/* Hindi and Gujarati: the phrases whose word order changes or that carry a number (the book's own
   sentence, "6, 78 का गुणनखंड है" / "6 એ 78નો અવયવ છે"). English never comes here: its templates stay
   exactly where they were. The gaps keep their meaning (gap 1 the factor or the multiple named first) */
const HI_KW = (face: string) => (face === "factor" ? { t: "का गुणनखंड है", kw: "गुणनखंड", face } : { t: "का गुणज है", kw: "गुणज", face });
const GU_KW = (face: string) => (face === "factor" ? { t: "નો અવયવ છે", kw: "અવયવ", face } : { t: "નો અવયવી છે", kw: "અવયવી", face });
const LB: any = {
  hi: {
    face: (face: string) => [{ b: 0 }, { t: "," }, { b: 1 }, HI_KW(face)],
    claim: (a: number, b: number) => [{ t: "क्या" }, { n: a }, { t: "," }, { n: b }, HI_KW("factor"), { q: 1 }],
    ofTwo: (a: number, b: number) => [{ b: 0 }, { t: "," }, { t: `${a} और ${b} का गुणनखंड है`, kw: "गुणनखंड", face: "factor" }],
    rows: (t: number, per: number) => `${per} की ${t} ${t === 1 ? "पंक्ति" : "पंक्तियाँ"}`,
    counters: (n: number) => `${n} गोटियाँ`,
    ofPair: (a: number, b: number) => `${a} और ${b} का`,
    factorsOf: (n: number) => `${n} के गुणनखंड`,
    multiplesOf: (n: number) => `${n} के गुणज`,
    oneRow: (n: number) => `एक पंक्ति में ${n}`,
    oneStep: (n: number) => `${n} का एक कदम`,
    /* the slot's read-back: the two numbers in the child's order, with no word. "88, 44 का गुणनखंड" fills
       the box and the runtime's caret (placed by code units) lands outside it; "88 गुणनखंड 44" reads the
       wrong way round. The whole sentence already stands on the working area */
    slot: (a: string, b: string) => `${a}, ${b}`,
  },
  gu: {
    face: (face: string) => [{ b: 0 }, { t: "એ" }, { b: 1 }, GU_KW(face)],
    claim: (a: number, b: number) => [{ t: "શું" }, { n: a }, { t: "એ" }, { n: b }, GU_KW("factor"), { q: 1 }],
    ofTwo: (a: number, b: number) => [{ b: 0 }, { t: "એ" }, { t: `${a} અને ${b}નો અવયવ છે`, kw: "અવયવ", face: "factor" }],
    rows: (t: number, per: number) => `${per}ની ${t} હાર`,
    counters: (n: number) => `${n} કૂકરી`,
    ofPair: (a: number, b: number) => `${a} અને ${b}નો`,
    factorsOf: (n: number) => `${n}ના અવયવ`,
    multiplesOf: (n: number) => `${n}ના અવયવી`,
    oneRow: (n: number) => `એક હારમાં ${n}`,
    oneStep: (n: number) => `${n}નું એક પગલું`,
    slot: (a: string, b: string, w: string) => (w ? `${a}, ${b}નો ${w === "factor" ? "અવયવ" : "અવયવી"}` : `${a}, ${b}`),
  },
};

/* ── phase 1: the card, turned and read from both ends ── */
const P1 = { card: { x: 303, y: 4, w: 480, h: 116 }, frame: { x: 16, y: 144, w: 1054, h: 136 }, cy: 212, faceX: { factor: 276, multiple: 810 }, tileY: 306, railY: 404 };

function FbCards({ item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const gaps = useFbGaps(2, api);
  const [turned, setTurnedS] = useState(false);
  const turnedRef = useRef(false);
  const [flipKey, setFlipKey] = useState(0);
  const [other, setOther] = useState<any>(null);        /* the other face, stood up next to the child's */
  const [colored, setColored] = useState(false);
  const [hair, setHair] = useState(false);
  const [rail, setRail] = useState<any>(null);
  const [touched, setTouched] = useState(false);
  const busy = tl.busy;
  const live = stage === "ask" && !busy;
  const liveRef = useRef(live); liveRef.current = live;
  const face = item.face || "factor";
  const otherFace = face === "factor" ? "multiple" : "factor";
  FACE.word = face;                                     /* the slot reads back the sentence, not two numbers */

  const setTurned = (b: boolean) => { turnedRef.current = b; setTurnedS(b); };
  const reset = () => {
    tl.stop(); gaps.reset(2); setTurned(false); setOther(null); setColored(false); setHair(false); setRail(null); setTouched(false);
  };
  useEffect(() => { reset(); }, [index]);

  const turn = () => {
    if (turnedRef.current) return;
    setTurned(true); setFlipKey((k) => k + 1); setTouched(true); api.sfx.tick();
  };
  /* the child acts: the correction layer (its sentence and the face it stood up) gives way to their own */
  const act = () => { if (gaps.ghost) { setOther(null); setHair(false); } };
  const put = (v: number, k: number | null) => { if (!turnedRef.current) turn(); setTouched(true); act(); gaps.put(v, k); };
  const lay = sentLay(faceParts(face, lang), P1.faceX[face as "factor"]);
  const dg = useDrag((pay: any, p: any, moved: boolean) => {
    if (!liveRef.current) return;
    if (!moved) { put(pay.v, null); return; }
    const k = gapAt(lay, P1.cy, p);
    if (k !== null) put(pay.v, k);
  });

  const enterFn = () => {
    if (!liveRef.current) return;
    if (!turnedRef.current) { turn(); return; }
    if (gaps.stale.current && !gaps.acted.current) return; /* after a miss nothing answers until the child moves a tile */
    if (gaps.gate()) return;
    api.submit(gaps.fillRef.current.join("|"));
  };
  api.onEnter(enterFn);
  HOOK.enter = enterFn;
  HOOK.set = (v: any) => { const p = pairOf(v); if (!p) return false; setTurned(true); setTouched(true); gaps.setFill(p); return true; };

  /* the win: the child's face lifts, the other face stands up beside it with the same two numbers */
  useEffect(() => {
    if (stage !== "win") return;
    const p = pairOf(typed) || pairOf(item.answer);
    tl.run([[60, () => { setTurned(true); setColored(true); }], [520, () => setOther(p ? [p[1], p[0]] : null)], [700, () => setHair(true)], [400, () => {}]]);
  }, [stage]);

  /* the traceback: the rail draws both numbers to scale, turns the child's bigger "factor" back,
     settles the true factor, then both faces stand up with the whole right fact */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    gaps.missed();
    const right = pairOf(item.answer) as number[];
    const kid = pairOf(wrong.value);
    const fm = (p: number[]) => (face === "factor" ? { f: p[0], m: p[1] } : { f: p[1], m: p[0] });
    const R = fm(right);
    const top = Math.max(...item.tiles);
    const pins = item.tiles.map((v: number) => ({ v, col: v === top ? MUL : FAC }));
    const S: any[] = [[60, () => { setTurned(true); setRail({ max: top, pins, zone: null, bar: null, ghosts: [] }); }], [650, null]];
    if (kid && kid.join("|") !== right.join("|") && kid[0] !== kid[1]) {
      const K = fm(kid);
      S.push([950, () => setRail((r: any) => ({ ...r, zone: K.m, bar: { v: K.f } }))]);
      if (K.f > K.m) S.push([850, () => setRail((r: any) => ({ ...r, bar: null, ghosts: [{ v: K.f, past: K.m }] }))]);
    }
    S.push([950, () => { setRail((r: any) => ({ ...r, zone: R.m, bar: { v: R.f } })); api.sfx.tick(); }]);
    S.push([700, () => { gaps.setGhost(right.slice()); setColored(true); setOther([right[1], right[0]]); setHair(true); }]);
    S.push([500, null]);
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  api.share({ division: cardText(item.card), faceUp: turned, bothHeld: !!other, namedNumber: gaps.fill.filter((x) => x !== null), railOrder: rail ? rail.pins.map((p: any) => p.v).sort(byNum) : null, builtNumber: null });

  const cols = colored ? numColsOf(face) : null;
  const otherLay = sentLay(faceParts(otherFace, lang), P1.faceX[otherFace as "factor"]);
  const card = item.card;
  const tiles: number[] = item.tiles;
  const tx0 = 543 - (tiles.length * TW + (tiles.length - 1) * 40) / 2;
  const fr = P1.frame;
  const invite = live && !turned && !touched;

  return (
    <g>
      <style>{FB_CSS}</style>
      {/* the frame, ruled for two faces with a hairline between them (one fact, not two) */}
      <rect x={fr.x} y={fr.y} width={fr.w} height={fr.h} rx={22} fill={turned ? "#FFFFFF" : "none"} stroke={C.rule} strokeWidth={2} strokeDasharray={turned ? undefined : "10 10"} />
      <line x1={543} y1={fr.y + 12} x2={543} y2={fr.y + fr.h - 12} stroke={hair ? BOTH : C.rule} strokeWidth={hair ? 5 : 2} />
      {turned && (
        <g key={"faces" + flipKey} className="fb-in">
          <rect x={face === "factor" ? fr.x + 6 : 549} y={fr.y + 6} width={515} height={fr.h - 12} rx={18} fill="none" stroke={C.accent} strokeWidth={3} />
          <FbSent lay={lay} cy={P1.cy} vals={gaps.fill} ghost={gaps.ghost} cols={cols} lit={gaps.lit} C={C} live={live} tag="face" onClear={(k: number) => { act(); gaps.clear(k); }} />
          {other ? (
            <g key={"o" + other.join()} className="fb-in"><FbSent lay={otherLay} cy={P1.cy} vals={other} cols={numColsOf(otherFace)} lit={[]} C={C} live={false} tag="other" /></g>
          ) : (
            <g>
              <rect x={face === "factor" ? 562 : fr.x + 12} y={fr.y + 14} width={496} height={fr.h - 28} rx={14} fill={tint(C.panel, 0.2)} stroke={C.rule} strokeWidth={2} />
              <rect x={face === "factor" ? 578 : fr.x + 28} y={fr.y + 30} width={464} height={fr.h - 60} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="4 8" />
            </g>
          )}
        </g>
      )}

      {/* the card: one exact division */}
      <g key={"card" + flipKey} className={flipKey ? "fb-flip" : undefined}>
        <rect x={P1.card.x} y={P1.card.y} width={P1.card.w} height={P1.card.h} rx={22} fill="url(#gCard)" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
        <text x={P1.card.x + (turned ? P1.card.w / 2 : 205)} y={P1.card.y + P1.card.h / 2 + T.xl * 0.36} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>
          {cardSpans(card, colored)}
        </text>
        {!turned && <FbTurnIcon x={P1.card.x + P1.card.w - 50} y={P1.card.y + P1.card.h / 2 - 4} C={C} />}
      </g>
      {live && !turned && <Hit id="card" label="Turn the card" x={P1.card.x} y={P1.card.y} w={P1.card.w} h={P1.card.h} onPress={turn} />}

      {/* the number tiles: each one a source, a copy goes into a gap */}
      {tiles.map((v, i) => {
        const pay = { v, i };
        return (
          <g key={"t" + i} className={live ? "fb-grab c4-piece" : ""} {...(live ? { ...control("tile-" + v, "Number " + v), ...dg.bind(pay), ...dg.keys(pay) } : {})}>
            <FbTile x={tx0 + i * (TW + 40)} y={P1.tileY} v={v} C={C} col={colored ? (v === Math.max(...tiles) ? MUL : FAC) : null} />
            <rect x={tx0 + i * (TW + 40)} y={P1.tileY} width={TW} height={TH} fill="transparent" />
          </g>
        );
      })}

      {rail && <FbRail y0={P1.railY} {...rail} C={C} lang={lang} tx={tx} />}

      {dg.drag && dg.drag.moved && (
        <g pointerEvents="none"><FbTile x={dg.drag.x - TW / 2} y={dg.drag.y - TH / 2} v={dg.drag.payload.v} C={C} lift /></g>
      )}
      {invite && <Invite x={P1.card.x + P1.card.w - 50} y={P1.card.y + P1.card.h / 2} r={40} C={C} />}
    </g>
  );
}
const cardText = (c: any[]) => (c ? `${c[0]} ${c[1]} ${c[2]} = ${c[3]}` : null);
/* the card's numbers: ink until the fact is known, then the factor blue and the multiple green */
const cardSpans = (c: any[], colored: boolean) => {
  const div = c[1] === "÷";
  const colOf = (k: number) => (!colored ? null : div ? (k === 0 ? MUL : k === 2 ? FAC : null) : k === 3 ? MUL : k === 0 || k === 2 ? FAC : null);
  /* the gaps are drawn (dx), not typed, so the card reads as one expression */
  const part = (v: any, k: number) => { const col = colOf(k); return <tspan key={k} dx={k ? 16 : 0} fill={col ? inkOf(col) : undefined}>{String(v)}</tspan>; };
  return [part(c[0], 0), part(c[1], 1), part(c[2], 2), part("=", 1.5), part(c[3], 3)];
};

/* ── phase 2: the pair bay, a pair laid out as equal rows, and the number they build ── */
const P2 = { board: { x: 0, y: 0, w: 760, h: 344 }, built: { x: 792, y: 0, w: 290, h: 344 }, tileY: 424, tileW: 88, railY: 368, shelfX: 652 };
/* 20 counters in a heap: a sunflower, so no rows show before the child lays them */
const heapAt = (i: number) => { const r = 17 * Math.sqrt(i + 0.5), a = i * 2.39996; return { x: 330 + r * Math.cos(a), y: 200 + r * Math.sin(a) }; };
const rowsAt = (rows: number, per: number, i: number) => {
  const px = Math.min(48, 580 / per), py = Math.min(60, 250 / rows);
  return { x: 40 + (i % per) * px + px / 2, y: 80 + Math.floor(i / per) * py + py / 2, r: Math.min(18, px * 0.4, py * 0.38), px, py };
};

function FbPairs({ item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const lb = LB[lang];
  const C = api.C;
  const tl = useTimeline();
  const kind = item.kind;
  FACE.word = null;
  const [rows, setRows] = useState(kind === "word" ? item.pair[0] : 0);  /* rows laid on the board */
  const [totals, setTotals] = useState(false);
  const [word, setWord] = useState(false);                              /* the built card's word shown */
  const [num, setNum] = useState(false);                                /* the built number shown (typed item) */
  const [colored, setColored] = useState(false);
  const [lay, setLay] = useState(0);                                    /* pairs: rows of this number, 0 = a heap */
  const [marks, setMarksS] = useState<number[]>([]);                    /* pairs: the smaller number of each pair found */
  const marksRef = useRef<number[]>([]);
  const setMarks = (m: number[]) => { marksRef.current = m; setMarksS(m); };
  const [rail, setRail] = useState<any>(null);
  const [touched, setTouched] = useState(false);
  const [gateLit, setGateLit] = useState(0);
  /* the correction's own layer: it stands over the child's marks, never inside them, so the next tap
     adds to what the child had instead of switching a corrected pair off */
  const [ghost, setGhostS] = useState<number[] | null>(null);
  const ghostRef = useRef<number[] | null>(null);
  const setGhost = (g: number[] | null) => { ghostRef.current = g; setGhostS(g); };
  const acted = useRef(false);                                          /* the child has tapped since the question (or the miss) */
  const stale = useRef(false);                                          /* a miss the child has not acted on yet */
  const busy = tl.busy;
  const live = stage === "ask" && !busy;
  const liveRef = useRef(live); liveRef.current = live;

  useEffect(() => {
    acted.current = false; stale.current = false;
    tl.stop(); setRows(item.kind === "word" ? item.pair[0] : 0); setTotals(false); setWord(false); setNum(false); setColored(false);
    setLay(0); setMarks([]); setGhost(null); setRail(null); setTouched(false); setGateLit(0);
  }, [index]);

  const whole = item.whole || 20;
  const pairKey = (t: number) => Math.min(t, whole / t);
  const tapTile = (t: number) => {
    if (!liveRef.current) return;
    setGhost(null); acted.current = true; stale.current = false;        /* the child is working again */
    setTouched(true); setLay(t); api.sfx.tick();
    if (whole % t !== 0) return;                                        /* rows with some left over: no pair */
    const k = pairKey(t), m = marksRef.current;
    setMarks(m.includes(k) ? m.filter((x) => x !== k) : [...m, k].sort(byNum));
  };
  const layRow = () => {
    if (!liveRef.current || rows >= item.pair[0]) return;
    setTouched(true); setRows((r: number) => r + 1); api.sfx.tick();
  };
  const pairsText = (m: number[]) => m.slice().sort(byNum).map((k) => `${k}×${whole / k}`).join(",");
  const enterFn = kind === "pairs" ? () => {
    /* only the child answers: the correction only draws, and after it a bare Enter does nothing */
    if (!liveRef.current || (stale.current && !acted.current)) return;
    if (!marksRef.current.length) { setGateLit((g) => g + 1); return; }
    api.submit(pairsText(marksRef.current));
  } : null;
  api.onEnter(enterFn);
  HOOK.enter = enterFn;
  HOOK.set = (v: any) => {
    if (kind !== "pairs") return false;
    const m = [...new Set(pairsOf(v).map((p) => Math.min(p[0], p[1])))].filter((k) => whole % k === 0).sort(byNum);
    setGhost(null); setMarks(m); if (m.length) setLay(m[m.length - 1]); setTouched(true); acted.current = true; stale.current = false;
    return true;
  };

  /* the win: the built card is named for both numbers of the pair */
  useEffect(() => {
    if (stage !== "win") return;
    if (kind === "word") tl.run([[60, () => { setRows(item.pair[0]); setColored(true); }], [500, () => setWord(true)], [600, () => {}]]);
    if (kind === "build") tl.run([[60, () => setRows(item.pair[0])], [500, () => { setNum(true); setColored(true); }], [600, () => setWord(true)], [500, () => {}]]);
    if (kind === "pairs") tl.run([[60, () => setColored(true)], [500, () => setWord(true)], [500, () => {}]]);
  }, [stage]);

  /* the traceback: the rows laid again one at a time and counted at their ends, then (for the word)
     the rail takes each small number as a factor and turns the built number back */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    acted.current = false; stale.current = true;
    const S: any[] = [];
    if (kind === "word" || kind === "build") {
      const [a, b] = item.pair, built = a * b;
      S.push([60, () => { setRows(0); setTotals(true); setWord(false); setNum(false); setRail(null); }], [350, null]);
      for (let r = 1; r <= a; r++) { const k = r; S.push([650, () => { setRows(k); api.sfx.tick(); }]); }
      S.push([500, () => { setNum(true); setColored(true); }]);
      if (kind === "word") {
        const pins = [{ v: a, col: FAC }, { v: b, col: FAC }, { v: built, col: MUL }];
        S.push([500, () => setRail({ max: built, pins, zone: null, bar: null, ghosts: [] })]);
        S.push([850, () => { setRail((r: any) => ({ ...r, zone: built, bar: { v: a } })); api.sfx.tick(); }]);
        S.push([850, () => { setRail((r: any) => ({ ...r, zone: built, bar: { v: b } })); api.sfx.tick(); }]);
        S.push([900, () => setRail((r: any) => ({ ...r, zone: a, bar: { v: built } }))]);
        S.push([800, () => setRail((r: any) => ({ ...r, bar: null, ghosts: [{ v: built, past: a }] }))]);
      }
      S.push([600, () => setWord(true)], [500, null]);
    } else {
      /* every pair laid out again on the board, into the correction's own layer (the child's marks stand) */
      const all: number[] = [];
      for (let d = 1; d * d <= whole; d++) if (whole % d === 0) all.push(d);
      S.push([60, () => { setGhost([]); setLay(0); setWord(false); }], [400, null]);
      all.forEach((d, i) => { S.push([750, () => { setLay(d); api.sfx.tick(); }], [450, () => setGhost(all.slice(0, i + 1))]); });
      S.push([500, () => setColored(true)], [400, null]);
    }
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  api.share({ division: null, faceUp: null, bothHeld: false, namedNumber: kind === "pairs" ? marks.map((k) => [k, whole / k]) : null, railOrder: rail ? rail.pins.map((p: any) => p.v) : null,
    builtNumber: kind === "word" ? item.built : kind === "build" && num ? item.pair[0] * item.pair[1] : null });

  const bd = P2.board, bc = P2.built;
  /* the board's counters */
  const discs: any[] = [];
  let label = "", leftN = 0, rowEnds: any[] = [];
  if (kind === "pairs") {
    const t = lay, per = t ? Math.floor(whole / t) : 0;
    leftN = t ? whole - per * t : 0;
    label = t ? (lb ? lb.rows(t, per) : `${t} rows of ${per}`) : (lb ? lb.counters(whole) : `${whole} counters`);
    for (let i = 0; i < whole; i++) {
      let p: any;
      if (!t) p = { ...heapAt(i), r: 12 };
      else if (i < per * t) p = rowsAt(t, per, i);
      else { const j = i - per * t; p = { x: P2.shelfX + 40, y: 96 + j * 34, r: 12 }; }
      discs.push({ key: i, x: p.x, y: p.y, r: p.r, paint: t && i >= per * t ? "gPointer" : "gTen" });
    }
  } else {
    const [a, b] = item.pair;
    label = lb ? lb.rows(a, b) : `${a} rows of ${b}`;
    for (let r = 0; r < rows; r++) for (let c = 0; c < b; c++) { const p = rowsAt(a, b, r * b + c); discs.push({ key: r * b + c, x: p.x, y: p.y, r: p.r, paint: "gOne", row: r }); }
    if (totals) for (let r = 0; r < rows; r++) { const p = rowsAt(a, b, r * b + b - 1); rowEnds.push({ x: p.x + p.px / 2 + 12, y: p.y + 10, v: (r + 1) * b }); }
  }
  const ruleRows = kind === "pairs" ? lay : item.pair ? item.pair[0] : 0, rulePy = ruleRows ? Math.min(60, 250 / ruleRows) : 0;
  const builtV = kind === "word" ? item.built : kind === "build" ? (num ? item.pair[0] * item.pair[1] : null) : whole;
  const invite = live && !touched && (kind === "build" ? { x: 380, y: 200, r: 64 } : kind === "pairs" ? { x: 49 + P2.tileW / 2, y: P2.tileY + 44, r: 52 } : null);
  const tilesX0 = (1086 - (10 * P2.tileW + 9 * 12)) / 2;
  const shownPairs = ghost ? [...new Set([...marks, ...ghost])].sort(byNum) : marks;

  return (
    <g>
      <style>{FB_CSS}</style>
      {/* the ruled board */}
      <rect x={bd.x} y={bd.y} width={bd.w} height={bd.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      {/* ruled for the rows of the pair (or of the number tapped) */}
      {ruleRows > 0 && Array.from({ length: ruleRows + 1 }).map((_, k) => <line key={k} x1={24} y1={80 + k * rulePy} x2={kind === "pairs" ? 628 : 736} y2={80 + k * rulePy} stroke={tint(C.rule, 0.2)} strokeWidth={1.5} />)}
      <text x={24} y={46} fontSize={T.label} fontWeight={700} fill={C.ink}>{label}</text>
      {kind === "pairs" && (
        <g>
          <rect x={P2.shelfX} y={64} width={92} height={268} rx={14} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 7" />
          <text x={P2.shelfX + 46} y={46} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={leftN ? inkOf(OVER) : C.ink}>{tx("left over")}</text>
        </g>
      )}
      <g filter="url(#fShadowSoft)">
        {discs.map((d) => kind === "pairs" ? (
          <g key={d.key} className="fb-t" style={{ transform: `translate(${d.x}px, ${d.y}px)` } as any}><Disc x={0} y={0} r={d.r} paint={d.paint} flat /></g>
        ) : (
          <g key={d.key} className="fb-in"><Disc x={d.x} y={d.y} r={d.r} paint={d.paint} flat /></g>
        ))}
      </g>
      {rowEnds.map((e, i) => <text key={"e" + i} x={e.x} y={e.y} fontSize={T.micro} fontWeight={700} fill={inkOf(MUL)}>{e.v}</text>)}
      {kind === "build" && live && rows < item.pair[0] && <Hit id="board" label="Lay a row" x={bd.x} y={bd.y} w={bd.w} h={bd.h} onPress={layRow} />}

      {/* the built card */}
      <rect x={bc.x} y={bc.y} width={bc.w} height={bc.h} rx={RAD.card} fill="#FFFFFF" stroke={word ? MUL : C.rule} strokeWidth={word ? 4 : 2} filter="url(#fShadowSoft)" />
      <text x={bc.x + bc.w / 2} y={bc.y + 42} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("they build")}</text>
      {builtV !== null ? (
        <text key={"n" + builtV + colored} className={kind === "build" ? "fb-in" : undefined} x={bc.x + bc.w / 2} y={bc.y + (kind === "pairs" ? 112 : 140)} textAnchor="middle"
          fontSize={kind === "pairs" ? T.xl : T.display} fontWeight={700} fill={colored ? inkOf(kind === "pairs" ? MUL : MUL) : C.ink}>{builtV}</text>
      ) : (
        <rect x={bc.x + 85} y={bc.y + 66} width={120} height={96} rx={16} fill={tint(C.panel, 0.35)} stroke={C.dim} strokeWidth={2.5} strokeDasharray="9 7" />
      )}
      {kind !== "pairs" && (
        <g>
          {word ? (
            <text key="w" className="fb-in" x={bc.x + bc.w / 2} y={bc.y + (lb ? 282 : 232)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(MUL)}>{tx("multiple")}</text>
          ) : kind === "word" ? (
            <rect x={bc.x + 60} y={bc.y + (lb ? 244 : 196)} width={170} height={52} rx={12} fill={tint(C.panel, 0.35)} stroke={C.dim} strokeWidth={2.5} strokeDasharray="9 7" />
          ) : null}
          {(word || kind === "word") && <text x={bc.x + bc.w / 2} y={bc.y + (lb ? 214 : 290)} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{lb ? lb.ofPair(item.pair[0], item.pair[1]) : `of ${item.pair[0]} and ${item.pair[1]}`}</text>}
        </g>
      )}
      {kind === "pairs" && (
        <g>
          {shownPairs.map((k, i) => (
            <g key={"m" + k} className="fb-in">
              {!marks.includes(k) && <rect x={bc.x + 46} y={bc.y + 140 + i * 44} width={194} height={42} rx={12} fill={tint(FAC, 0.9)} stroke={FAC} strokeWidth={2} strokeDasharray="8 6" />}
              <text x={bc.x + bc.w / 2} y={bc.y + 172 + i * 44} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(FAC)}>{`${k} × ${whole / k}`}</text>
            </g>
          ))}
          {word && <text className="fb-in" x={bc.x + bc.w / 2} y={bc.y + 318} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={inkOf(MUL)}>{tx("multiple of each")}</text>}
        </g>
      )}

      {rail && <FbRail y0={P2.railY} {...rail} C={C} lang={lang} tx={tx} />}

      {/* pairs: the number tiles; a tap lays the counters in that many rows */}
      {kind === "pairs" && item.tiles.map((t: number, i: number) => {
        const x = tilesX0 + i * (P2.tileW + 12), on = shownPairs.includes(pairKey(t)) && whole % t === 0;
        return (
          <g key={"pt" + t}>
            <rect key={"gl" + gateLit} className={gateLit ? "fb-lit" : undefined} x={x - 3} y={P2.tileY - 3} width={P2.tileW + 6} height={TH + 6} rx={18} fill="none" stroke={gateLit ? C.accent : "none"} strokeWidth={3} />
            <FbTile x={x} y={P2.tileY} w={P2.tileW} v={t} C={C} lit={on ? FAC : null} col={on ? FAC : null} dash={on && !marks.includes(pairKey(t))} />
            {live && <Hit id={"rows-" + t} label={`Lay ${whole} in ${t} rows`} x={x} y={P2.tileY} w={P2.tileW} h={TH} onPress={() => tapTile(t)} />}
          </g>
        );
      })}
      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* ── phase 3: the size rail ── */
const P3 = { railY: 20, cy: 296, tileY: 400, noteY: 404 };

function FbRails({ item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const lb = LB[lang];
  const C = api.C;
  const tl = useTimeline();
  const kind = item.kind;
  FACE.word = kind === "sent" ? "factor" : null;
  const nb = kind === "sent" ? 2 : 1;
  const gaps = useFbGaps(nb, api);
  const [show, setShow] = useState<any>(null);          /* a rail the tool is drawing (win, traceback) */
  const [colored, setColored] = useState(false);
  const [note, setNote] = useState(false);
  const [touched, setTouched] = useState(false);
  const busy = tl.busy;
  const live = stage === "ask" && !busy;
  const liveRef = useRef(live); liveRef.current = live;

  useEffect(() => { tl.stop(); gaps.reset(kind === "sent" ? 2 : 1); setShow(null); setColored(false); setNote(false); setTouched(false); }, [index]);

  const parts = lb ? (kind === "yn" ? lb.claim(item.claim[0], item.claim[1]) : kind === "sent" ? faceParts("factor", lang) : lb.ofTwo(item.of[0], item.of[1]))
    : kind === "yn" ? [{ n: item.claim[0] }, { t: "is a factor of", kw: "factor" }, { n: item.claim[1] }, { q: 1 }]
    : kind === "sent" ? faceParts("factor")
      : [{ b: 0 }, { t: "is a factor of", kw: "factor" }, { t: `${item.of[0]} and ${item.of[1]}` }];
  const lay = sentLay(parts, 543);
  const put = (v: number, k: number | null) => { setTouched(true); setShow(null); gaps.put(v, k); };
  const dg = useDrag((pay: any, p: any, moved: boolean) => {
    if (!liveRef.current) return;
    if (!moved) { put(pay.v, null); return; }
    const k = gapAt(lay, P3.cy, p);
    if (k !== null) put(pay.v, k);
  });
  const enterFn = kind === "yn" ? null : () => {
    if (!liveRef.current) return;
    if (gaps.stale.current && !gaps.acted.current) return; /* after a miss nothing answers until the child moves a tile */
    if (gaps.gate()) return;
    api.submit(gaps.fillRef.current.join("|"));
  };
  api.onEnter(enterFn);
  HOOK.enter = enterFn;
  HOOK.set = (v: any) => {
    if (kind === "sent") { const p = pairOf(v); if (!p) return false; setTouched(true); setShow(null); gaps.setFill(p); return true; }
    if (kind === "sent1") { const s = String(v ?? "").trim(); if (!/^\d+$/.test(s)) return false; setTouched(true); setShow(null); gaps.setFill([Number(s)]); return true; }
    return false;
  };

  /* every number the item names, on one scale */
  const nums: number[] = kind === "yn" ? item.nums : kind === "sent" ? item.tiles : [...new Set([...item.tiles, ...item.of])] as number[];
  const top = Math.max(...nums);
  const colOf = (v: number) => (kind === "yn" ? (v === item.claim[0] ? MUL : FAC) : kind === "sent" ? (v === top ? MUL : FAC) : item.of.includes(v) ? MUL : FAC);
  const pinsOf = (vs: number[], c: boolean) => vs.map((v) => ({ v, col: c ? colOf(v) : null }));
  /* the live rail: the zone of the number named last, and the bar of the number offered as its factor.
     A yes or no question draws its factor slot only once the child has tried, so the band never
     answers the question before the child does */
  const f = gaps.fill;
  const tried = !!wrong || stage === "win" || stage === "idle" || stage === "summary";
  const liveRail = kind === "yn" ? { max: top, pins: pinsOf(nums, colored), zone: tried ? item.claim[1] : null, bar: null, ghosts: [] }
    : kind === "sent" ? { max: top, pins: pinsOf(nums, colored), zone: f[1], bar: f[0] !== null && f[1] !== null ? { v: f[0] } : null, ghosts: [] }
      : { max: top, pins: pinsOf(nums, colored), zone: Math.min(...item.of), bar: f[0] !== null ? { v: f[0] } : null, ghosts: [] };
  const rail = show || liveRail;

  /* offer b as a factor of m: settle, or run past and turn back (the extra length left drawn) */
  const trial = (S: any[], v: number, m: number, base: any) => {
    S.push([900, () => { setShow((r: any) => ({ ...(r || base), zone: m, bar: { v } })); if (v <= m) api.sfx.tick(); }]);
    if (v > m) S.push([850, () => setShow((r: any) => ({ ...r, bar: null, ghosts: [...(r.ghosts || []), { v, past: m }] }))]);
  };
  useEffect(() => {
    if (stage !== "win") return;
    const S: any[] = [[60, () => setColored(true)]];
    const base = { max: top, pins: pinsOf(nums, true), zone: null, bar: null, ghosts: [] };
    if (kind === "yn") { S.push([40, () => setShow(base)]); trial(S, item.claim[0], item.claim[1], base); S.push([300, () => setNote(true)]); }
    else if (kind === "sent1") { const v = Number(item.answer); S.push([40, () => setShow(base)]); trial(S, v, item.of[0], base); trial(S, v, item.of[1], base); }
    S.push([300, null]);
    tl.run(S);
  }, [stage]);

  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    gaps.missed();
    const S: any[] = [];
    if (kind === "yn") {
      /* 7 is a factor of both: related numbers, but the bigger one still cannot be a factor of the smaller */
      const [big, small] = item.claim;
      let d = 0;
      for (let k = small - 1; k > 1; k--) if (small % k === 0 && big % k === 0) { d = k; break; }
      const vs = d ? [d, small, big] : [small, big];
      const base = { max: big, pins: vs.map((v) => ({ v, col: v === d ? FAC : MUL })), zone: null, bar: null, ghosts: [],
        tip: d ? { v: d, text: "goes into both" } : null };
      S.push([60, () => { setColored(true); setShow(base); }], [600, null]);
      if (d) { trial(S, d, big, base); trial(S, d, small, base); }
      trial(S, big, small, base);
      S.push([500, () => setNote(true)]);
    } else {
      const base = { max: top, pins: pinsOf(nums, true), zone: null, bar: null, ghosts: [] };
      S.push([60, () => { setColored(true); setShow(base); }], [500, null]);
      if (kind === "sent") {
        const kid = pairOf(wrong.value), right = pairOf(item.answer) as number[];
        if (kid && kid.join("|") !== right.join("|") && kid[0] !== kid[1]) trial(S, kid[0], kid[1], base);
        trial(S, right[0], right[1], base);
        S.push([600, () => gaps.setGhost(right.slice())]);
      } else {
        const kv = Number(String(wrong.value).trim()), v = Number(item.answer);
        if (kv && kv !== v) trial(S, kv, Math.min(...item.of), base);
        trial(S, v, item.of[0], base); trial(S, v, item.of[1], base);
        S.push([600, () => gaps.setGhost([v])]);
      }
    }
    S.push([500, null]);
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  api.share({ division: null, faceUp: null, bothHeld: false, namedNumber: gaps.fill.filter((x) => x !== null), railOrder: nums.slice().sort(byNum), builtNumber: null });

  const tiles: number[] = item.tiles || [];
  const tx0 = 543 - (tiles.length * TW + (tiles.length - 1) * 40) / 2;
  const cols = colored ? (kind === "sent" ? [FAC, MUL] : [FAC]) : null;
  const invite = live && !touched && tiles.length ? { x: tx0 + TW / 2, y: P3.tileY + TH / 2, r: 60 } : null;

  return (
    <g>
      <style>{FB_CSS}</style>
      <FbRail y0={P3.railY} {...rail} C={C} big lang={lang} tx={tx} />
      <FbSent lay={lay} cy={P3.cy} vals={gaps.fill} ghost={gaps.ghost} cols={cols} lit={gaps.lit} C={C} live={live} tag="rail" onClear={(k: number) => { setShow(null); gaps.clear(k); }} />
      {note && kind === "yn" && (
        <text className="fb-in" x={543} y={P3.noteY + 40} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>
          {tx("No") + ": "}<tspan fill={inkOf(MUL)}>{item.claim[0]}</tspan>{" > "}<tspan fill={inkOf(MUL)}>{item.claim[1]}</tspan>
        </text>
      )}
      {tiles.map((v, i) => {
        const pay = { v, i };
        return (
          <g key={"t" + i} className={live ? "fb-grab c4-piece" : ""} {...(live ? { ...control("tile-" + v, "Number " + v), ...dg.bind(pay), ...dg.keys(pay) } : {})}>
            <FbTile x={tx0 + i * (TW + 40)} y={P3.tileY} v={v} C={C} col={colored ? colOf(v) : null} />
            <rect x={tx0 + i * (TW + 40)} y={P3.tileY} width={TW} height={TH} fill="transparent" />
          </g>
        );
      })}
      {dg.drag && dg.drag.moved && (
        <g pointerEvents="none"><FbTile x={dg.drag.x - TW / 2} y={dg.drag.y - TH / 2} v={dg.drag.payload.v} C={C} lift /></g>
      )}
      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* ── phase 4: the own list bay, a pen of factors and a track of multiples ── */
const P4 = { top: 52, h: 132, cardY: 66, cw: 84, ch: 104, pitch: 96, penX: 4, trackX: 560, numX: 483, numY: 276, tileY: 300, tileW: 88 };

function FbLists({ item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const lb = LB[lang];
  const C = api.C;
  const tl = useTimeline();
  const kind = item.kind;
  FACE.word = null;
  const N = item.num;
  const [inPen, setInPen] = useState(false);
  const [inTrack, setInTrack] = useState(false);
  const inRef = useRef({ pen: false, track: false });
  const [filled, setFilled] = useState(0);               /* ends: how many cards the tool has laid in each list */
  const [marks, setMarksS] = useState<number[]>([]);     /* list: the cards the child pens */
  const marksRef = useRef<number[]>([]);
  const [shown, setShown] = useState(false);              /* the number lit in both lists, the hairline drawn */
  const [trackOn, setTrackOn] = useState(false);          /* list: the track of multiples drawn */
  const [hl, setHl] = useState<any>(null);
  const [touched, setTouched] = useState(false);
  const [gateLit, setGateLit] = useState(0);
  const [proof, setProof] = useState(0);                  /* both: the two claims run in front of the child */
  /* the correction's own layer: it stands over the child's cards, never inside them */
  const [ghost, setGhostS] = useState<any>(null);
  const ghostRef = useRef<any>(null);
  const setGhost = (g: any) => { ghostRef.current = g; setGhostS(g); };
  const busy = tl.busy;
  const live = stage === "ask" && !busy;
  const liveRef = useRef(live); liveRef.current = live;

  const setIn = (pen: boolean, track: boolean) => { inRef.current = { pen, track }; setInPen(pen); setInTrack(track); };
  const setMarks = (m: number[]) => { marksRef.current = m; setMarksS(m); };
  const acted = useRef(false);                            /* the child has moved the card or a card since the question (or the miss) */
  const stale = useRef(false);                            /* a miss the child has not acted on yet */
  useEffect(() => { acted.current = false; stale.current = false; tl.stop(); setIn(false, false); setFilled(0); setMarks([]); setGhost(null); setProof(0); setShown(false); setTrackOn(false); setHl(null); setTouched(false); setGateLit(0); }, [index]);

  const factors: number[] = [];
  for (let d = 1; d <= N; d++) if (N % d === 0) factors.push(d);
  const multiples = [1, 2, 3, 4, 5].map((k) => k * N);
  const gPen = kind === "both" ? !!ghost : false, gTrack = gPen;

  /* both: what each list holds (the correction's layer stands over the child's own cards) */
  /* the child's own cards and the correction's, together: nothing of theirs is ever taken away */
  const listShown: number[] = ghost ? [...new Set([...marks, ...ghost])].sort(byNum) : marks.slice().sort(byNum);
  const penCards: number[] = kind === "both" ? [...item.pen, ...(inPen || gPen ? [N] : [])]
    : kind === "ends" ? factors.slice(0, filled)
      : listShown;
  const trackCards: number[] = kind === "both" ? [...(inTrack || gTrack ? [N] : []), ...item.track]
    : kind === "ends" ? multiples.slice(0, Math.max(0, filled - factors.length))
      : trackOn ? multiples : [];
  /* only a card the correction itself named, and only where the child had not already marked it */
  const isGhostCard = (v: number, at: string) => (kind === "both" ? v === N && (at === "pen" ? gPen && !inPen : gTrack && !inTrack)
    : kind === "list" ? !!ghost && at === "pen" && ghost.includes(v) && !marks.includes(v) : false);

  const drop = (where: string) => {
    if (!liveRef.current || kind !== "both") return;
    setGhost(null); acted.current = true; stale.current = false; /* the child is working again */
    setTouched(true);
    const c = inRef.current;
    if (where === "pen") setIn(!c.pen, c.track); else setIn(c.pen, !c.track);
    api.sfx.tick();
  };
  const dg = useDrag((pay: any, p: any, moved: boolean) => {
    if (!liveRef.current || kind !== "both") return;
    const c = inRef.current;
    /* a tap only puts the card down in the nearer list; a second list is always the child's own drop */
    if (!moved) { if (!c.pen && !c.track) drop("pen"); return; }
    if (p.y < P4.top - 20 || p.y > P4.top + P4.h + 40) return;
    if (p.x < 548 && !c.pen) drop("pen");
    else if (p.x >= 548 && !c.track) drop("track");
  });
  const tapCand = (v: number) => {
    if (!liveRef.current) return;
    setGhost(null); acted.current = true; stale.current = false; /* the child is working again */
    setTouched(true); api.sfx.tick();
    const m = marksRef.current;
    setMarks(m.includes(v) ? m.filter((x) => x !== v) : [...m, v]);
  };
  /* only the child answers: the correction only draws, and after it a bare Enter does nothing */
  const enterFn = kind === "both" ? () => {
    if (!liveRef.current || (stale.current && !acted.current)) return;
    const c = inRef.current;
    if (!c.pen && !c.track) { setGateLit((g) => g + 1); return; }
    api.submit(c.pen && c.track ? "both" : c.pen ? "factors" : "multiples");
  } : kind === "list" ? () => {
    if (!liveRef.current || (stale.current && !acted.current)) return;
    if (!marksRef.current.length) { setGateLit((g) => g + 1); return; }
    api.submit(marksRef.current.slice().sort(byNum).join(","));
  } : null;
  api.onEnter(enterFn);
  HOOK.enter = enterFn;
  HOOK.set = (v: any) => {
    const s = String(v ?? "").trim().toLowerCase();
    setGhost(null); acted.current = true; stale.current = false; /* the agent acts as a child would */
    if (kind === "both") { setTouched(true); setIn(s === "both" || s === "factors", s === "both" || s === "multiples"); return true; }
    if (kind === "list") { setTouched(true); setMarks([...new Set(listOf(s))].filter((x) => item.cands.includes(x))); return true; }
    return false;
  };

  /* the win: the number lights at the shut end of its pen and the first step of its track, joined */
  useEffect(() => {
    if (stage !== "win") return;
    const S: any[] = [];
    if (kind === "ends") S.push([60, () => setFilled(factors.length + multiples.length)]);
    if (kind === "list") S.push([60, () => setTrackOn(true)]);
    S.push([500, () => setShown(true)], [700, null]);
    tl.run(S);
  }, [stage]);

  /* the traceback: the number is stood in both lists at once, joined, and each list is read up to it */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    acted.current = false; stale.current = true;
    const S: any[] = [[60, () => { setShown(false); setHl(null); }], [300, null]];
    if (kind === "both") {
      /* the two claims first: the number divided by itself is one row with nothing outside it,
         and one step of the number lands on it. Then it stands in both lists */
      S.push([1500, () => { setProof(1); api.sfx.tick(); }]);
      S.push([1500, () => { setProof(2); api.sfx.tick(); }]);
      S.push([600, () => { setGhost("both"); api.sfx.tick(); }]);
    } else if (kind === "ends") {
      S.push([60, () => setFilled(0)]);
      for (let k = 1; k <= factors.length + multiples.length; k++) { const j = k; S.push([380, () => { setFilled(j); api.sfx.tick(); }]); }
    } else {
      S.push([60, () => { setGhost([]); setTrackOn(false); }]);
      factors.forEach((d, i) => S.push([520, () => { setGhost(factors.slice(0, i + 1)); api.sfx.tick(); }]));
      S.push([500, () => setTrackOn(true)]);
    }
    S.push([700, () => setShown(true)]);
    const pc = kind === "both" ? item.pen.length + 1 : factors.length;
    for (let k = 0; k < pc; k++) { const j = k; S.push([420, () => setHl({ at: "pen", k: j })]); }
    for (let k = 0; k < 4; k++) { const j = k; S.push([380, () => setHl({ at: "track", k: j })]); }
    S.push([400, () => setHl(null)], [300, null]);
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  api.share({ division: null, faceUp: null, bothHeld: shown, namedNumber: kind === "both" ? { factors: inPen, multiples: inTrack } : kind === "list" ? marks.slice().sort(byNum) : null,
    railOrder: null, builtNumber: null });

  /* a pen holding many cards packs them closer, so its wall never runs into the track */
  const penPitch = penCards.length > 5 ? Math.floor(500 / penCards.length) : P4.pitch;
  const card = (x: number, v: number, key: string, lit: boolean, on: boolean, cw = P4.cw, gh = false) => {
    const fs = cw < 70 ? T.label : String(v).length >= 3 ? T.prompt : T.xl;
    const col = lit ? BOTH : null;
    return (
      <g key={key} className="fb-in">
        <rect x={x} y={P4.cardY} width={cw} height={P4.ch} rx={14} fill={lit ? tint(BOTH, gh ? 0.9 : 0.82) : "#FFFFFF"} stroke={on ? C.accent : lit ? BOTH : C.rule}
          strokeWidth={on ? 5 : lit ? 4 : 2} strokeDasharray={gh ? "8 6" : undefined} filter="url(#fShadowSoft)" />
        <text x={x + cw / 2} y={P4.cardY + P4.ch / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={col ? inkOf(col) : C.ink}>{v}</text>
      </g>
    );
  };
  const penSlots = Math.max(2, penCards.length);
  const wallX = P4.penX + 20 + penSlots * penPitch - 6;
  const penAt = (k: number) => P4.penX + 20 + k * penPitch;
  const trackAt = (k: number) => P4.trackX + 20 + k * P4.pitch;
  const lastPen = penCards.length - 1;
  const lit = shown && penCards[lastPen] === N && trackCards[0] === N;
  const xp = penAt(lastPen) + P4.cw / 2, xt = trackAt(0) + P4.cw / 2;
  const candX0 = (1086 - (item.cands ? item.cands.length * (P4.tileW + 16) - 16 : 0)) / 2;
  const invite = live && !touched && (kind === "both" ? { x: P4.numX + 60, y: P4.numY + 50, r: 66 } : kind === "list" ? { x: candX0 + P4.tileW / 2, y: P4.tileY + TH / 2, r: 52 } : null);
  const zoneLit = gateLit > 0;
  const pf = lb ? { h1: 76, t1: 286, d1: 6, y2: 336, h2: 86, t2: 370, d2: 6, n2: 412 } : { h1: 68, t1: 278, d1: 0, y2: 330, h2: 74, t2: 356, d2: 0, n2: 402 };

  return (
    <g>
      <style>{FB_CSS}</style>
      {/* the pen: a post, a wall past its last card, both walls up */}
      <text x={P4.penX} y={36} fontSize={T.micro} fontWeight={700} fill={inkOf(FAC)}>{lb ? lb.factorsOf(N) : `factors of ${N}`}</text>
      <rect key={"pz" + gateLit} className={zoneLit ? "fb-lit" : undefined} x={P4.penX} y={P4.top} width={wallX + 12 - P4.penX} height={P4.h} rx={10} fill={tint(FAC, 0.9)} stroke={zoneLit ? C.accent : "none"} strokeWidth={4} />
      <line x1={P4.penX} y1={P4.top} x2={wallX + 12} y2={P4.top} stroke={C.rule} strokeWidth={3} />
      <line x1={P4.penX} y1={P4.top + P4.h} x2={wallX + 12} y2={P4.top + P4.h} stroke={C.rule} strokeWidth={3} />
      <rect x={P4.penX} y={P4.top - 6} width={12} height={P4.h + 12} rx={5} fill={C.ink} />
      <rect className="fb-t" x={wallX} y={P4.top - 6} width={12} height={P4.h + 12} rx={5} fill={C.ink} />
      {penCards.map((v, k) => card(penAt(k), v, "p" + v, lit && v === N, !!hl && hl.at === "pen" && hl.k === k, Math.min(P4.cw, penPitch - 10), isGhostCard(v, "pen")))}

      {/* the track: a first post, steps of the number, and no end: it runs out of the frame */}
      <text x={P4.trackX} y={36} fontSize={T.micro} fontWeight={700} fill={inkOf(MUL)}>{lb ? lb.multiplesOf(N) : `multiples of ${N}`}</text>
      <rect key={"tz" + gateLit} className={zoneLit ? "fb-lit" : undefined} x={P4.trackX} y={P4.top} width={1082 - P4.trackX} height={P4.h} rx={10} fill={tint(MUL, 0.9)} stroke={zoneLit ? C.accent : "none"} strokeWidth={4} />
      <line x1={P4.trackX} y1={P4.top} x2={1082} y2={P4.top} stroke={C.rule} strokeWidth={3} />
      <line x1={P4.trackX} y1={P4.top + P4.h} x2={1082} y2={P4.top + P4.h} stroke={C.rule} strokeWidth={3} />
      <rect x={P4.trackX} y={P4.top - 6} width={12} height={P4.h + 12} rx={5} fill={C.ink} />
      {[0, 1, 2].map((k) => <circle key={"d" + k} cx={1058 + k * 10} cy={P4.top + P4.h / 2} r={3.5} fill={C.ink} />)}
      {trackCards.slice(0, 5).map((v, k) => card(trackAt(k), v, "t" + v, lit && v === N, !!hl && hl.at === "track" && hl.k === k, P4.cw, isGhostCard(v, "track")))}

      {/* the same number, joined across both lists */}
      {lit && (
        <g className="fb-in">
          <path d={`M ${xp} ${P4.cardY + P4.ch + 2} V 208 H ${xt} V ${P4.cardY + P4.ch + 2}`} fill="none" stroke={BOTH} strokeWidth={4} strokeLinejoin="round" />
          <text x={xp} y={242} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={inkOf(BOTH)}>{tx("greatest")}</text>
          <text x={xt} y={242} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={inkOf(BOTH)}>{tx("smallest")}</text>
        </g>
      )}

      {/* the correction's two claims: the number divides itself with nothing outside the row,
          and one step of it lands on it (pf: taller cards in Hindi and Gujarati, whose marks rise higher) */}
      {proof >= 1 && (
        <g className="fb-in">
          <rect x={8} y={252} width={452} height={pf.h1} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={20} y={pf.t1} fontSize={T.micro} fontWeight={600} fill={C.ink}>{lb ? lb.oneRow(N) : `${N} in one row`}</text>
          <g filter="url(#fShadowSoft)">
            {Array.from({ length: N }).map((_, i) => <Disc key={i} x={30 + i * 22} y={302 + pf.d1} r={9} paint="gHundred" flat />)}
          </g>
          <rect x={408} y={286 + pf.d1} width={44} height={32} rx={8} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="7 6" />
        </g>
      )}
      {proof >= 2 && (
        <g className="fb-in">
          <rect x={8} y={pf.y2} width={452} height={pf.h2} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={20} y={pf.t2} fontSize={T.micro} fontWeight={600} fill={C.ink}>{lb ? lb.oneStep(N) : `one step of ${N}`}</text>
          <line x1={250} y1={376 + pf.d2} x2={450} y2={376 + pf.d2} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
          <line x1={250} y1={366 + pf.d2} x2={250} y2={386 + pf.d2} stroke={C.ink} strokeWidth={3} />
          <path d={`M 250 ${372 + pf.d2} Q 300 ${336 + pf.d2} 348 ${370 + pf.d2}`} fill="none" stroke={BOTH} strokeWidth={4} strokeLinecap="round" />
          <path d={`M 340 ${356 + pf.d2} L 350 ${374 + pf.d2} L 332 ${376 + pf.d2}`} fill={BOTH} />
          <circle cx={350} cy={376 + pf.d2} r={8} fill={BOTH} />
          <text x={350} y={pf.n2} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={inkOf(BOTH)}>{N}</text>
        </g>
      )}

      {live && kind === "both" && <Hit id="pen" label={inPen ? `Take ${N} out of its factors` : `Put ${N} in its factors`} x={0} y={P4.top - 8} w={544} h={P4.h + 16} onPress={() => drop("pen")} />}
      {live && kind === "both" && <Hit id="track" label={inTrack ? `Take ${N} off its multiples` : `Put ${N} on its multiples`} x={556} y={P4.top - 8} w={528} h={P4.h + 16} onPress={() => drop("track")} />}

      {/* the number card lying between the two lists */}
      {(kind === "both" || kind === "ends") && (
        <g className={live && kind === "both" ? "fb-grab c4-piece" : ""}
          {...(live && kind === "both" ? { ...control("num-" + N, `The ${N} card`), ...dg.bind({ v: N }), ...dg.keys({ v: N }) } : {})}>
          <FbTile x={P4.numX} y={P4.numY} w={120} h={100} v={N} C={C} col={shown ? BOTH : null} />
          <rect x={P4.numX} y={P4.numY} width={120} height={100} fill="transparent" />
        </g>
      )}
      {kind === "list" && item.cands.map((v: number, i: number) => {
        const x = candX0 + i * (P4.tileW + 16), on = listShown.includes(v), gh = isGhostCard(v, "pen");
        return (
          <g key={"c" + v}>
            <FbTile x={x} y={P4.tileY} w={P4.tileW} v={v} C={C} lit={on ? FAC : null} col={on ? FAC : null} dash={gh} />
            {live && <Hit id={"card-" + v} label={marks.includes(v) ? `Take ${v} out of the pen` : `Pen ${v}`} x={x} y={P4.tileY} w={P4.tileW} h={TH} onPress={() => tapCand(v)} />}
          </g>
        );
      })}
      {dg.drag && dg.drag.moved && (
        <g pointerEvents="none"><FbTile x={dg.drag.x - 60} y={dg.drag.y - 50} w={120} h={100} v={N} C={C} lift /></g>
      )}
      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* ── free play: any exact division on the card, and the rail live ── */
function FbFree({ api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [k, setK] = useState(0);
  const [turned, setTurned] = useState(false);
  const [flipKey, setFlipKey] = useState(0);
  const gaps = useFbGaps(2, api);
  const [ghosts, setGhosts] = useState<any[]>([]);
  const [a, b] = FREE_CARDS[k % FREE_CARDS.length];
  const tiles = [a, b];
  const cy = 344;
  const lay = sentLay(faceParts("factor", lang), 700);
  api.onEnter(null);
  const put = (v: number, at: number | null) => {
    if (tl.busy) return;
    if (!gaps.put(v, at)) return;
    const f = gaps.fillRef.current;
    if (f[0] !== null && f[1] !== null && f[0] > f[1]) {
      /* the rail refuses a factor bigger than its number: it is turned back, its length left drawn */
      const over = f[0], past = f[1];
      tl.run([[900, null], [10, () => { setGhosts([{ v: over, past }]); gaps.setFill([null, f[1]]); }]]);
    }
  };
  const dg = useDrag((pay: any, p: any, moved: boolean) => {
    if (!moved) { put(pay.v, null); return; }
    const at = gapAt(lay, cy, p);
    if (at !== null) put(pay.v, at);
  });
  const next = () => { tl.stop(); setK((x) => x + 1); setTurned(false); gaps.reset(2); setGhosts([]); };
  const turn = () => { setTurned((t) => !t); setFlipKey((x) => x + 1); api.sfx.tick(); };
  const f = gaps.fill;
  api.share({ division: `${a} ÷ ${b} = ${a / b}`, faceUp: turned, bothHeld: turned, namedNumber: f.filter((x) => x !== null), railOrder: [b, a], builtNumber: null });
  const fr = P1.frame;
  return (
    <g>
      <style>{FB_CSS}</style>
      <rect x={fr.x} y={fr.y} width={fr.w} height={fr.h} rx={22} fill={turned ? "#FFFFFF" : "none"} stroke={C.rule} strokeWidth={2} strokeDasharray={turned ? undefined : "10 10"} />
      <line x1={543} y1={fr.y + 12} x2={543} y2={fr.y + fr.h - 12} stroke={turned ? BOTH : C.rule} strokeWidth={turned ? 5 : 2} />
      {turned && (
        <g key={"f" + flipKey} className="fb-in">
          <FbSent lay={sentLay(faceParts("factor", lang), P1.faceX.factor)} cy={P1.cy} vals={[b, a]} cols={[FAC, MUL]} lit={[]} C={C} live={false} tag="ff" />
          <FbSent lay={sentLay(faceParts("multiple", lang), P1.faceX.multiple)} cy={P1.cy} vals={[a, b]} cols={[MUL, FAC]} lit={[]} C={C} live={false} tag="fm" />
        </g>
      )}
      <g key={"card" + flipKey} className={flipKey ? "fb-flip" : undefined}>
        <rect x={P1.card.x} y={P1.card.y} width={P1.card.w} height={P1.card.h} rx={22} fill="url(#gCard)" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
        <text x={P1.card.x + 205} y={P1.card.y + P1.card.h / 2 + T.xl * 0.36} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{cardSpans([a, "÷", b, a / b], turned)}</text>
        <FbTurnIcon x={P1.card.x + P1.card.w - 50} y={P1.card.y + P1.card.h / 2 - 4} C={C} />
      </g>
      <Hit id="free-card" label={turned ? "Turn the card back" : "Turn the card"} x={P1.card.x} y={P1.card.y} w={P1.card.w} h={P1.card.h} onPress={turn} />
      <Key id="free-next" label="New card" x={836} y={22} w={220} h={80} C={C} onClick={next}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("New card")}</text>
      </Key>
      <FbSent lay={lay} cy={cy} vals={f} cols={[FAC, MUL]} lit={[]} C={C} live tag="free" onClear={(at: number) => { gaps.clear(at); setGhosts([]); }} />
      {tiles.map((v, i) => {
        const pay = { v, i };
        return (
          <g key={"t" + i + "-" + k} className="fb-grab c4-piece" {...control("free-tile-" + (i + 1), "Number " + v)} {...dg.bind(pay)} {...dg.keys(pay)}>
            <FbTile x={24 + i * (TW + 24)} y={cy - TH / 2} v={v} C={C} />
            <rect x={24 + i * (TW + 24)} y={cy - TH / 2} width={TW} height={TH} fill="transparent" />
          </g>
        );
      })}
      <FbRail y0={P1.railY + 4} max={a} pins={[{ v: a, col: MUL }, { v: b, col: FAC }]} zone={f[1]} bar={f[0] !== null && f[1] !== null ? { v: f[0] } : null} ghosts={ghosts} C={C} lang={lang} tx={tx} />
      {dg.drag && dg.drag.moved && (
        <g pointerEvents="none"><FbTile x={dg.drag.x - TW / 2} y={dg.drag.y - TH / 2} v={dg.drag.payload.v} C={C} lift /></g>
      )}
    </g>
  );
}

/* the running count (runs zone, 330 x 76): the readings written against the readings this phase
   has to write. It counts what has been read out; it never names a number that is still being asked */
function Runs({ phase, index, stage, api, tx = (v: any) => v }: any) {
  const C = api.C;
  const items = phase.items || [];
  const readsOf = (it: any) => (it && it.reads) || 0;
  const total = items.reduce((a: number, it: any) => a + readsOf(it), 0);
  const done = items.slice(0, index).reduce((a: number, it: any) => a + readsOf(it), 0)
    + (["win", "idle", "summary"].includes(stage) ? readsOf(items[index]) : 0);
  return (
    <g>
      <text x={18} y={48} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("facts read")}</text>
      <text x={312} y={52} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{`${done} / ${total}`}</text>
    </g>
  );
}

/* the working area: one object a phase, and free play */
function Work(props: any) {
  if (props.stage === "free") return <FbFree {...props} />;
  const V = props.n === 1 ? FbCards : props.n === 2 ? FbPairs : props.n === 3 ? FbRails : FbLists;
  return <V {...props} />;
}

/* the summary page's small drawing of the child's last right answer in a phase */
/* the same two lines in Hindi and Gujarati, in the book's word order */
const thumbLinesIn = (lang: string, it: any, s: string, tx: any): string[] | null => {
  const hi = lang === "hi";
  if (lang !== "hi" && lang !== "gu") return null;
  const of2 = (a: any, b: any) => (hi ? `${a} और ${b} का` : `${a} અને ${b}નો`);
  const is = (w: string) => (hi ? `${w} है` : `${w} છે`);
  const F = hi ? "गुणनखंड" : "અવયવ", M = hi ? "गुणज" : "અવયવી";
  const lead = (a: any, rest: string) => (hi ? `${a}, ${rest}` : `${a} એ ${rest}`);
  if (it.kind === "sent") { const p = pairOf(s) || pairOf(it.answer) || [0, 0]; return [lead(p[0], hi ? `${p[1]} का` : `${p[1]}નો`), is(it.face === "factor" ? F : M)]; }
  if (it.kind === "sent1") return [lead(s, of2(it.of[0], it.of[1])), is(F)];
  if (it.kind === "word") return [lead(it.built, of2(it.pair[0], it.pair[1])), is(tx(s))];
  if (it.kind === "build") return [lead(s, of2(it.pair[0], it.pair[1])), is(M)];
  if (it.kind === "yn") return [lead(it.claim[0], hi ? `${it.claim[1]} का ${F}` : `${it.claim[1]}નો ${F}`), hi ? "नहीं हो सकता" : "ન હોઈ શકે"];
  if (it.kind === "both") return hi ? [`${it.num} दोनों`, "सूचियों में है"] : [`${it.num} બંને`, "યાદીમાં છે"];
  if (it.kind === "ends") return hi ? [`${it.num}: सबसे बड़ा`, "और सबसे छोटा"] : [`${it.num}: સૌથી મોટો`, "અને સૌથી નાનો"];
  if (it.kind === "list") return [LB[lang].factorsOf(it.num) + ":", listOf(s).join(", ")];
  return null;
};
const thumbLines = (it: any, v: any, lang = "en", tx = (x: any) => x): string[] => {
  const s = String(v ?? "");
  const tr = thumbLinesIn(lang, it, s, tx);
  if (tr) return tr;
  if (it.kind === "sent") { const p = pairOf(s) || pairOf(it.answer) || [0, 0]; return [`${p[0]} is a`, `${it.face} of ${p[1]}`]; }
  if (it.kind === "sent1") return [`${s} is a factor`, `of ${it.of.join(" and ")}`];
  if (it.kind === "word") return [`${it.built}: ${s}`, `of ${it.pair.join(" and ")}`];
  if (it.kind === "build") return [`${s}: multiple`, `of ${it.pair.join(" and ")}`];
  if (it.kind === "pairs") { const ps = pairsOf(s).map((p) => p.join("×")); return [`${it.whole} = ${ps[0] || ""}`, ps.slice(1).join(", ")]; }
  if (it.kind === "yn") return [`${it.claim[0]} cannot be a`, `factor of ${it.claim[1]}`];
  if (it.kind === "both") return [`${it.num} is in`, "both lists"];
  if (it.kind === "ends") return [`${it.num}: greatest`, "and smallest"];
  if (it.kind === "list") return [`factors of ${it.num}:`, listOf(s).join(", ")];
  return [s, ""];
};
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L) return null;
  const ph: any = PHASES[(n || 1) - 1] || { items: [] };
  const it = ph.items[L.item] || {};
  const [l1, l2] = thumbLines(it, L.value, lang, tx);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={14} y={h / 2 - 6} fontSize={T.micro} fontWeight={700} fill={C.ink}>{l1}</text>
      <text x={14} y={h / 2 + 28} fontSize={T.micro} fontWeight={500} fill={C.ink}>{l2}</text>
    </g>
  );
}

/* Hindi and Gujarati, keyed by the exact English (PATTERNS §11). Digits stay digits and the runtime
   speaks them; × ÷ = stay symbols. Terms: गुणनखंड / અવયવ (factor), गुणज / અવયવી (multiple),
   गुणनखंडों का जोड़ा / અવયવની જોડ (factor pair), पंक्ति / હાર (row); the rail पट्टी / પટ્ટી, the pen
   बाड़ा / વાડો, the track रास्ता / રસ્તો */
const TR: any = {
  hi: {
    "Fact Both Ways": "एक बात, दो तरह से",
    "One division on a card. It has another face, and both of them are true.": "कार्ड पर भाग का एक सवाल है। उसकी दूसरी तरफ़ भी एक बात है, और दोनों सच हैं।",
    "Every card turned, and never once a word left hanging with no number on it.": "हर कार्ड पलटा गया, और एक भी शब्द अपनी संख्या के बिना अधूरा नहीं छूटा।",
    "Free play. Turn any exact division on the card, and try its numbers on the rail.": "मुक्त खेल। पूरे-पूरे भाग वाला कोई भी कार्ड पलटो, और उसकी संख्याएँ पट्टी पर आज़माओ।",
    /* phase 1 */
    "Two words for the two ends of one division": "भाग के एक सवाल के दो सिरों के दो शब्द",
    "A factor is always a factor of some number. Never say the word without its number.": "गुणनखंड हमेशा किसी संख्या का गुणनखंड होता है। यह शब्द उसकी संख्या के बिना कभी मत बोलो।",
    "Tap the card to turn it. Then drop number tiles into the gaps.": "कार्ड को पलटने के लिए छुओ। फिर संख्या की टाइलें खाली जगहों में डालो।",
    "Which number is being divided, and what is it to the other one?": "किस संख्या को भाग दिया जा रहा है, और दूसरी संख्या के लिए वह क्या है?",
    "Think of a small card: 6 divided by 2. Then 2 is a factor of 6, and 6 is a multiple of 2.": "एक छोटा कार्ड सोचो: 6 ÷ 2। तब 2, 6 का गुणनखंड है, और 6, 2 का गुणज है।",
    "When one number divides another exactly, it is a factor of that number. That number is a multiple of it.": "जब एक संख्या दूसरी को पूरा-पूरा भाग देती है, तो वह उसका गुणनखंड है। और दूसरी संख्या उसका गुणज है।",
    "You learned: one exact division gives a factor and a multiple.": "तुमने सीखा: भाग में कुछ न बचे, तो गुणनखंड और गुणज मिलते हैं।",
    "6 divides 78 exactly. Which of the two is the factor and which is the multiple?": "6, 78 को पूरा-पूरा भाग देता है। इन दोनों में कौन गुणनखंड है, और कौन गुणज?",
    "Which is the factor?": "गुणनखंड कौन-सा है?",
    "Which of the two numbers is doing the dividing?": "दोनों में से कौन-सी संख्या भाग दे रही है?",
    "7 divides 77 exactly. Say that as a fact about multiples. The fact about factors comes with it.": "7, 77 को पूरा-पूरा भाग देता है। इसे गुणज वाली बात की तरह कहो। गुणनखंड वाली बात उसके साथ आ जाती है।",
    "Which is the multiple?": "गुणज कौन-सा है?",
    "Which number holds the other exactly, with nothing left over?": "किस संख्या में दूसरी पूरी-पूरी जाती है, बिना कुछ बचे?",
    "In the multiplication 8 times 9 is 72, which number is the multiple?": "8 × 9 = 72 में कौन-सी संख्या गुणज है?",
    "Which one is the multiple?": "इनमें गुणज कौन है?",
    "Which number did the multiplying build?": "गुणा करने से कौन-सी संख्या बनी?",
    /* phase 2 */
    "A factor pair and the number it builds": "गुणनखंडों का जोड़ा और उससे बनी संख्या",
    "A factor pair lays out equal rows on the board. The rows come to one number.": "गुणनखंडों का जोड़ा बोर्ड पर बराबर पंक्तियाँ बिछाता है। सारी पंक्तियाँ मिलकर एक संख्या बनाती हैं।",
    "Does each of them divide what they built?": "क्या दोनों में से हर एक, अपनी बनाई संख्या को भाग देता है?",
    "Think small: 2 rows of 3 make 6, and both 2 and 3 go into 6 exactly.": "छोटी संख्याओं से सोचो: 3 की 2 पंक्तियाँ 6 बनाती हैं। 2 और 3 दोनों 6 में पूरे-पूरे जाते हैं।",
    "The product of a factor pair is a multiple of both numbers in the pair.": "गुणनखंडों के जोड़े का गुणनफल, जोड़े की दोनों संख्याओं का गुणज होता है।",
    "You learned: multiply a factor pair to get what both go into.": "तुमने सीखा: गुणनखंडों के जोड़े का गुणा करने से उनका गुणज मिलता है।",
    "3 and 19 are a factor pair of 57. What is 57 to them?": "3 और 19, 57 के गुणनखंडों का जोड़ा हैं। 57 उनका क्या है?",
    "What is 57 to 3 and 19?": "57, 3 और 19 का क्या है?",
    "What do those two numbers build?": "वे दोनों संख्याएँ मिलकर क्या बनाती हैं?",
    "2 and 23 are a factor pair. Which number do they build, and what is it to them? Tap the board to lay the rows.": "2 और 23 गुणनखंडों का जोड़ा हैं। वे कौन-सी संख्या बनाते हैं, और वह उनका क्या है? पंक्तियाँ बिछाने के लिए बोर्ड को छुओ।",
    "What do 2 and 23 build?": "2 और 23 क्या बनाते हैं?",
    "One row is not what the pair builds. Count both rows.": "एक पंक्ति वह संख्या नहीं है जो जोड़ा बनाता है। दोनों पंक्तियाँ गिनो।",
    "Write all three factor pairs of 20, and say what 20 is to each pair. Tap a number to lay 20 in that many rows.": "20 के गुणनखंडों के तीनों जोड़े लिखो, और बताओ कि 20 हर जोड़े का क्या है। किसी संख्या को छुओ, तो 20 उतनी पंक्तियों में बिछ जाएगा।",
    "Find all three pairs of 20": "20 के तीनों जोड़े ढूँढो",
    "Try each number from 1 up. Which rows leave nothing over?": "1 से आगे हर संख्या आज़माओ। किन पंक्तियों में कुछ नहीं बचता?",
    /* phase 3 */
    "A factor is never the bigger one": "गुणनखंड दोनों में बड़ा कभी नहीं होता",
    "The rail draws each number to scale. A factor has to fit inside the number it belongs to.": "पट्टी हर संख्या को उसके सही नाप में दिखाती है। गुणनखंड को अपनी संख्या के अंदर समाना होता है।",
    "Can a bigger number go into a smaller one even once?": "क्या बड़ी संख्या छोटी संख्या में एक बार भी जा सकती है?",
    "Think small: can 5 go into 2 even once? The longer one never fits inside the shorter.": "छोटी संख्याओं से सोचो: क्या 5, 2 में एक बार भी जा सकता है? लंबी पट्टी छोटी के अंदर कभी नहीं समाती।",
    "A factor is never greater than the number it belongs to, though it may be equal to it.": "गुणनखंड अपनी संख्या से कभी बड़ा नहीं होता, पर उसके बराबर हो सकता है।",
    "You learned: a factor fits inside its number, or matches it exactly.": "तुमने सीखा: गुणनखंड अपनी संख्या में समाता है, या उसके बराबर होता है।",
    "Could 35 be a factor of 21?": "क्या 35, 21 का गुणनखंड है?",
    "Which of the two numbers is the bigger?": "दोनों में से कौन-सी संख्या बड़ी है?",
    "Can 88 be a factor of 44? Put the two tiles in the sentence to make it true.": "क्या 88, 44 का गुणनखंड हो सकता है? दोनों टाइलें वाक्य में ऐसे रखो कि वह सच हो जाए।",
    "Which number fits inside the other on the rail?": "पट्टी पर कौन-सी संख्या दूसरी के अंदर समाती है?",
    "A child says 9 is a factor of 6, because 3 divides both of them. What is the mistake, and what is true?": "एक बच्चा कहता है कि 9, 6 का गुणनखंड है, क्योंकि 3 दोनों को भाग देता है। गलती क्या है, और सच क्या है?",
    "A factor of 6 and 9?": "6 और 9 का गुणनखंड?",
    "Can 9 fit inside 6 on the rail?": "क्या पट्टी पर 9, 6 के अंदर समा सकता है?",
    /* phase 4 */
    "A number stands at both ends of its own list": "संख्या अपनी सूची के दोनों सिरों पर खड़ी है",
    "The pen holds a number's factors, with a wall at each end. The track holds its multiples, and it never ends.": "बाड़े में संख्या के गुणनखंड रहते हैं, और उसके दोनों सिरों पर दीवार है। रास्ते पर उसके गुणज रहते हैं, और वह कभी खत्म नहीं होता।",
    "Which number is the first step of the track?": "रास्ते का पहला कदम कौन-सी संख्या है?",
    "Think small: the factors of 4 are 1, 2 and 4. The multiples of 4 start 4, 8, 12.": "छोटी संख्याओं से सोचो: 4 के गुणनखंड 1, 2 और 4 हैं। 4 के गुणज 4, 8, 12 से शुरू होते हैं।",
    "A number is its own greatest factor and its own smallest multiple.": "हर संख्या खुद ही अपना सबसे बड़ा गुणनखंड और अपना सबसे छोटा गुणज है।",
    "You learned: a number shuts its factor list and opens its multiples.": "तुमने सीखा: संख्या गुणनखंडों की सूची बंद और गुणजों की सूची शुरू करती है।",
    "Where does 17 sit in its own list of factors, and in its own list of multiples? Drop the 17 card in each list it belongs to.": "17 अपने गुणनखंडों की सूची में कहाँ बैठता है, और गुणजों की सूची में कहाँ? 17 का कार्ड हर उस सूची में डालो जिसमें वह आता है।",
    "Where does 17 go?": "17 कहाँ जाएगा?",
    "Does 17 divide 17 exactly? Does one step of 17 land on 17?": "क्या 17, 17 को पूरा-पूरा भाग देता है? क्या 17 का एक कदम 17 पर पहुँचता है?",
    "Name the greatest factor of 34, and the smallest multiple of 34.": "34 का सबसे बड़ा गुणनखंड बताओ। और 34 का सबसे छोटा गुणज भी।",
    "Factor, then multiple of 34": "34 का गुणनखंड, फिर गुणज",
    "Which number is standing at the shut end of the pen?": "बाड़े के बंद सिरे पर कौन-सी संख्या खड़ी है?",
    "Which number is both the greatest factor of 65, and its smallest multiple? And what are all four of its factors? Tap each factor to pen it.": "कौन-सी संख्या 65 का सबसे बड़ा गुणनखंड भी है, और सबसे छोटा गुणज भी? और उसके चारों गुणनखंड कौन-से हैं? हर गुणनखंड को छूकर बाड़े में रखो।",
    "Tap all four factors of 65": "65 के चारों गुणनखंड छुओ",
    "Test each card: does it go into 65 with nothing left over?": "हर कार्ड जाँचो। क्या वह 65 में बिना कुछ बचे जाता है?",
    /* Work's own spoken line */
    "Say which number it belongs to, and put that number in the gap.": "बताओ कि यह किस संख्या का है, और वह संख्या खाली जगह में रखो।",
    /* word keys, the slot's read-back and the working area's words */
    "factor": "गुणनखंड", "multiple": "गुणज", "Yes": "हाँ", "No": "नहीं",
    "greatest": "सबसे बड़ा", "smallest": "सबसे छोटा",
    "in both": "दोनों में", "factors only": "केवल गुणनखंड", "multiples only": "केवल गुणज",
    "left over": "बचे हुए", "they build": "वे बनाते हैं", "multiple of each": "हर जोड़े का गुणज",
    "goes into both": "दोनों में जाता है", "New card": "नया कार्ड", "facts read": "पढ़ी गई बातें",
  },
  gu: {
    "Fact Both Ways": "એક વાત, બે રીતે",
    "One division on a card. It has another face, and both of them are true.": "કાર્ડ પર એક ભાગાકાર છે. તેની બીજી બાજુ પણ છે, અને બંને સાચી છે.",
    "Every card turned, and never once a word left hanging with no number on it.": "દરેક કાર્ડ ફેરવાયું, અને એક પણ શબ્દ તેની સંખ્યા વગર અધૂરો ન રહ્યો.",
    "Free play. Turn any exact division on the card, and try its numbers on the rail.": "મુક્ત રમત. પૂરેપૂરા ભાગાકારવાળું કોઈ પણ કાર્ડ ફેરવો, અને તેની સંખ્યાઓ પટ્ટી પર અજમાવો.",
    /* phase 1 */
    "Two words for the two ends of one division": "એક ભાગાકારના બે છેડાના બે શબ્દો",
    "A factor is always a factor of some number. Never say the word without its number.": "અવયવ હંમેશાં કોઈ સંખ્યાનો અવયવ હોય છે. આ શબ્દ તેની સંખ્યા વગર ક્યારેય ન બોલો.",
    "Tap the card to turn it. Then drop number tiles into the gaps.": "કાર્ડ ફેરવવા તેને દબાવો. પછી સંખ્યાની ટાઇલ ખાલી જગ્યામાં મૂકો.",
    "Which number is being divided, and what is it to the other one?": "કઈ સંખ્યાને ભાગવામાં આવે છે, અને તે બીજી સંખ્યા માટે શું છે?",
    "Think of a small card: 6 divided by 2. Then 2 is a factor of 6, and 6 is a multiple of 2.": "એક નાનું કાર્ડ વિચારો: 6 ÷ 2. તો 2 એ 6નો અવયવ છે, અને 6 એ 2નો અવયવી છે.",
    "When one number divides another exactly, it is a factor of that number. That number is a multiple of it.": "જ્યારે એક સંખ્યા બીજીને પૂરેપૂરા ભાગે, ત્યારે તે બીજીનો અવયવ છે. અને બીજી સંખ્યા તેનો અવયવી છે.",
    "You learned: one exact division gives a factor and a multiple.": "તમે શીખ્યા: એક પૂરેપૂરો ભાગાકાર એક અવયવ અને એક અવયવી આપે છે.",
    "6 divides 78 exactly. Which of the two is the factor and which is the multiple?": "6 એ 78ને પૂરેપૂરા ભાગે છે. આ બેમાંથી કયો અવયવ છે, અને કયો અવયવી?",
    "Which is the factor?": "અવયવ કયો છે?",
    "Which of the two numbers is doing the dividing?": "બેમાંથી કઈ સંખ્યા વડે ભાગ થાય છે?",
    "7 divides 77 exactly. Say that as a fact about multiples. The fact about factors comes with it.": "7 એ 77ને પૂરેપૂરા ભાગે છે. તેને અવયવી વિશેની વાત તરીકે કહો. અવયવ વિશેની વાત તેની સાથે આવી જાય છે.",
    "Which is the multiple?": "અવયવી કયો છે?",
    "Which number holds the other exactly, with nothing left over?": "કઈ સંખ્યામાં બીજી સંખ્યા બરાબર સમાય છે, કંઈ વધ્યા વગર?",
    "In the multiplication 8 times 9 is 72, which number is the multiple?": "ગુણાકાર 8 × 9 = 72માં કઈ સંખ્યા અવયવી છે?",
    "Which one is the multiple?": "આમાં અવયવી કયો છે?",
    "Which number did the multiplying build?": "ગુણાકાર કરવાથી કઈ સંખ્યા બની?",
    /* phase 2 */
    "A factor pair and the number it builds": "અવયવની જોડ અને તેનાથી બનતી સંખ્યા",
    "A factor pair lays out equal rows on the board. The rows come to one number.": "અવયવની જોડ બોર્ડ પર સરખી હાર ગોઠવે છે. બધી હાર મળીને એક સંખ્યા થાય છે.",
    "Does each of them divide what they built?": "શું બંનેમાંથી દરેક, પોતે બનાવેલી સંખ્યાને ભાગે છે?",
    "Think small: 2 rows of 3 make 6, and both 2 and 3 go into 6 exactly.": "નાની સંખ્યાઓથી વિચારો: 3ની 2 હાર મળીને 6 થાય છે. 2 અને 3 બંને 6માં પૂરેપૂરા જાય છે.",
    "The product of a factor pair is a multiple of both numbers in the pair.": "અવયવની જોડનો ગુણાકાર, જોડની બંને સંખ્યાઓનો અવયવી છે.",
    "You learned: multiply a factor pair to get what both go into.": "તમે શીખ્યા: જોડનો ગુણાકાર કરો, તો એવી સંખ્યા મળે જેમાં બંને જાય છે.",
    "3 and 19 are a factor pair of 57. What is 57 to them?": "3 અને 19 એ 57ના અવયવની જોડ છે. 57 તેમનો શું છે?",
    "What is 57 to 3 and 19?": "57 એ 3 અને 19નો શું છે?",
    "What do those two numbers build?": "તે બે સંખ્યાઓ મળીને શું બનાવે છે?",
    "2 and 23 are a factor pair. Which number do they build, and what is it to them? Tap the board to lay the rows.": "2 અને 23 અવયવની જોડ છે. તેઓ કઈ સંખ્યા બનાવે છે, અને તે સંખ્યા તેમનો શું છે? હાર ગોઠવવા બોર્ડને દબાવો.",
    "What do 2 and 23 build?": "2 અને 23 શું બનાવે છે?",
    "One row is not what the pair builds. Count both rows.": "જોડ જે બનાવે છે તે એક હાર નથી. બંને હાર ગણો.",
    "Write all three factor pairs of 20, and say what 20 is to each pair. Tap a number to lay 20 in that many rows.": "20ના અવયવની ત્રણેય જોડ લખો, અને કહો કે 20 દરેક જોડનો શું છે. કોઈ સંખ્યા દબાવો, તો 20 એટલી હારમાં ગોઠવાશે.",
    "Find all three pairs of 20": "20ની ત્રણેય જોડ શોધો",
    "Try each number from 1 up. Which rows leave nothing over?": "1થી આગળ દરેક સંખ્યા અજમાવો. કઈ હારમાં કંઈ વધતું નથી?",
    /* phase 3 */
    "A factor is never the bigger one": "અવયવ બેમાંથી મોટો ક્યારેય નથી હોતો",
    "The rail draws each number to scale. A factor has to fit inside the number it belongs to.": "પટ્ટી દરેક સંખ્યાને તેના સાચા માપમાં દોરે છે. અવયવે તેની સંખ્યાની અંદર સમાવું પડે.",
    "Can a bigger number go into a smaller one even once?": "શું મોટી સંખ્યા નાની સંખ્યામાં એક વાર પણ જઈ શકે?",
    "Think small: can 5 go into 2 even once? The longer one never fits inside the shorter.": "નાની સંખ્યાઓથી વિચારો: શું 5, 2માં એક વાર પણ જઈ શકે? લાંબી પટ્ટી ટૂંકીની અંદર ક્યારેય સમાતી નથી.",
    "A factor is never greater than the number it belongs to, though it may be equal to it.": "અવયવ તેની સંખ્યાથી ક્યારેય મોટો નથી હોતો, પણ તેના જેટલો હોઈ શકે.",
    "You learned: a factor fits inside its number, or matches it exactly.": "તમે શીખ્યા: અવયવ તેની સંખ્યામાં સમાય છે, અથવા તેના જેટલો હોય છે.",
    "Could 35 be a factor of 21?": "શું 35 એ 21નો અવયવ હોઈ શકે?",
    "Which of the two numbers is the bigger?": "બેમાંથી કઈ સંખ્યા મોટી છે?",
    "Can 88 be a factor of 44? Put the two tiles in the sentence to make it true.": "શું 88 એ 44નો અવયવ હોઈ શકે? બંને ટાઇલ વાક્યમાં એવી રીતે મૂકો કે તે સાચું બને.",
    "Which number fits inside the other on the rail?": "પટ્ટી પર કઈ સંખ્યા બીજીની અંદર સમાય છે?",
    "A child says 9 is a factor of 6, because 3 divides both of them. What is the mistake, and what is true?": "એક બાળક કહે છે કે 9 એ 6નો અવયવ છે, કારણ કે 3 બંનેને ભાગે છે. ભૂલ શું છે, અને સાચું શું છે?",
    "A factor of 6 and 9?": "6 અને 9નો અવયવ?",
    "Can 9 fit inside 6 on the rail?": "શું પટ્ટી પર 9, 6ની અંદર સમાઈ શકે?",
    /* phase 4 */
    "A number stands at both ends of its own list": "સંખ્યા પોતાની યાદીના બંને છેડે ઊભી છે",
    "The pen holds a number's factors, with a wall at each end. The track holds its multiples, and it never ends.": "વાડામાં સંખ્યાના અવયવ રહે છે, અને તેના બંને છેડે દીવાલ છે. રસ્તા પર તેના અવયવી રહે છે, અને તે ક્યારેય પૂરો થતો નથી.",
    "Which number is the first step of the track?": "રસ્તાનું પહેલું પગલું કઈ સંખ્યા છે?",
    "Think small: the factors of 4 are 1, 2 and 4. The multiples of 4 start 4, 8, 12.": "નાની સંખ્યાઓથી વિચારો: 4ના અવયવ 1, 2 અને 4 છે. 4ના અવયવી 4, 8, 12થી શરૂ થાય છે.",
    "A number is its own greatest factor and its own smallest multiple.": "દરેક સંખ્યા પોતે જ પોતાનો સૌથી મોટો અવયવ અને સૌથી નાનો અવયવી છે.",
    "You learned: a number shuts its factor list and opens its multiples.": "તમે શીખ્યા: સંખ્યા અવયવોની યાદી બંધ કરે છે, અવયવીઓની યાદી ખોલે છે.",
    "Where does 17 sit in its own list of factors, and in its own list of multiples? Drop the 17 card in each list it belongs to.": "17 તેના અવયવોની યાદીમાં ક્યાં બેસે છે, અને તેના અવયવીઓની યાદીમાં ક્યાં? 17નું કાર્ડ દરેક એવી યાદીમાં મૂકો જેમાં તે આવે.",
    "Where does 17 go?": "17 ક્યાં જશે?",
    "Does 17 divide 17 exactly? Does one step of 17 land on 17?": "શું 17 એ 17ને પૂરેપૂરા ભાગે છે? શું 17નું એક પગલું 17 પર પહોંચે છે?",
    "Name the greatest factor of 34, and the smallest multiple of 34.": "34નો સૌથી મોટો અવયવ કહો. અને 34નો સૌથી નાનો અવયવી પણ.",
    "Factor, then multiple of 34": "34નો અવયવ, પછી અવયવી",
    "Which number is standing at the shut end of the pen?": "વાડાના બંધ છેડે કઈ સંખ્યા ઊભી છે?",
    "Which number is both the greatest factor of 65, and its smallest multiple? And what are all four of its factors? Tap each factor to pen it.": "કઈ સંખ્યા 65નો સૌથી મોટો અવયવ પણ છે, અને સૌથી નાનો અવયવી પણ? અને તેના ચારેય અવયવ કયા છે? દરેક અવયવને દબાવીને વાડામાં મૂકો.",
    "Tap all four factors of 65": "65ના ચારેય અવયવ દબાવો",
    "Test each card: does it go into 65 with nothing left over?": "દરેક કાર્ડ તપાસો. શું તે 65માં કંઈ વધ્યા વગર જાય છે?",
    /* Work's own spoken line */
    "Say which number it belongs to, and put that number in the gap.": "કહો કે તે કઈ સંખ્યાનો છે, અને તે સંખ્યા ખાલી જગ્યામાં મૂકો.",
    /* word keys, the slot's read-back and the working area's words */
    "factor": "અવયવ", "multiple": "અવયવી", "Yes": "હા", "No": "ના",
    "greatest": "સૌથી મોટો", "smallest": "સૌથી નાનો",
    "in both": "બંનેમાં", "factors only": "ફક્ત અવયવ", "multiples only": "ફક્ત અવયવી",
    "left over": "વધેલા", "they build": "તેઓ બનાવે છે", "multiple of each": "દરેક જોડનો અવયવી",
    "goes into both": "બંનેમાં જાય છે", "New card": "નવું કાર્ડ", "facts read": "વાંચેલી વાતો",
  },
};

function FactBothWays(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work, Runs,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default FactBothWays;
