/* ═══ M3.S5.T11.C40.2D1 · column_subtractor · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "column_subtractor";
const MEDIA_ID = "M3.S5.T11.C40.2D1";
const TOOL_NAME = "Column Subtractor";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A column frame, waiting for the greater number on top."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every trade was shown, and every difference checked.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Take any decimal from a greater one.";

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
/* item fields of this tool: top / bot = the two numbers (top is the greater); tray = the order the two cards
   wait in (the smaller one is often first, as the question names it); near = the item's misconception;
   word = which of the three wordings the question uses (phase 3); got / added / start = the mistaken answer,
   the number added by mistake and the starting number (phase 4).
   Unused plan question: M3.S5.T11.C40:1 (5.87 - 2.43 = 3.44) has no trade, so its misconception (the smaller
   digit from the larger in every column) gives the right answer; phase 1 keeps three questions that trade. */
const PHASES = [
  {
    n: 1,
    concept: "Greater number on top",
    conceptId: "M3.S5.T11.C40", objectiveIds: ["O19"],
    says: ["Greater number on top. When a place is short, trade from the left."],
    /* tries, as the plan writes it: First rung: put the greater number on top. Second rung: take away the rightmost column. Third rung: the same task with no trade, before trades return. */
    ladder: ["Begin at the rightmost column. Is the top digit at least the bottom one?", "Where the top digit is smaller, trade one from the left for ten."],
    closing: "The greater number goes on top, with the points in one line. A short place trades with the place to its left.",
    learned: "You learned: greater number on top, points in line, trade when short",
    traceback: "The cards go greater on top with the points in one line and zeros in the empty places; each short place lights amber and trades one block of its left neighbour for ten, in vermilion; the difference is written green, place by place, ending on the whole answer.",
    items: [
      /* learn CS1: answer in the plan = 3.74 */
      { qid: "M3.S5.T11.C40:CS1", kind: "column", top: "8.3", bot: "4.56", tray: ["4.56", "8.3"], near: "4.26", winMs: 3600,
        say: "What is 8.3 - 4.56?", ask: "8.3 − 4.56 = ?", answer: "3.74",
        miss: "Write 8.3 as 8.30. Can you take 6 hundredths from 0? Trade first." },
      /* practice 3: answer in the plan = 4.25. Write 6.4 as 6.40, and trade 1 tenth for 10 hundredths */
      { qid: "M3.S5.T11.C40:3", kind: "column", top: "6.4", bot: "2.15", tray: ["6.4", "2.15"], near: "4.35", winMs: 3400,
        say: "What is 6.4 - 2.15?", ask: "6.4 − 2.15 = ?", answer: "4.25",
        miss: "6.4 has no hundredths yet. Give it a zero, then trade a tenth." },
      /* practice 8: answer in the plan = 4.592, because 9.200 - 4.608 = 4.592 */
      { qid: "M3.S5.T11.C40:8", kind: "column", top: "9.2", bot: "4.608", tray: ["4.608", "9.2"], near: "5.408", winMs: 4000,
        say: "What is 9.2 - 4.608?", ask: "9.2 − 4.608 = ?", answer: "4.592",
        miss: "Thousandths are short and the hundredths have none. Break a tenth first." },
    ],
  },
  {
    n: 2,
    concept: "Taking a decimal from a whole number",
    conceptId: "M3.S5.T11.C41", objectiveIds: ["O19"],
    /* the plan's line names five (the textbook's 5 - 1.28); the cards here are 7, 4 and 3, so it names no number */
    says: ["A whole number has no tenths or hundredths yet. What do you trade?"],
    /* tries, as the plan writes it: First rung: write the whole number's point and zeros. Second rung: make the first trade. Third rung: the same task with one place after the point, before two return. */
    ladder: ["Make the first trade: one one for ten tenths.", "Next, one tenth for ten hundredths. Then take away, place by place."],
    closing: "A whole number gets its point and zeros before anything is taken from it.",
    learned: "You learned: a whole number gets its point and zeros first",
    traceback: "Point first writes the whole number's point and zeros in violet and the first empty place lights amber; the trades run one place at a time, one one into ten tenths, then one tenth into ten hundredths, in vermilion; the difference is written green.",
    items: [
      /* learn CS2: answer in the plan = 4.55 */
      { qid: "M3.S5.T11.C41:CS2", kind: "whole", top: "7", bot: "2.45", tray: ["7", "2.45"], near: "5.45", winMs: 3800,
        say: "What is 7 - 2.45?", ask: "7 − 2.45 = ?", answer: "4.55",
        miss: "Where is the point in 7? Write 7 as 7.00 before you take away." },
      /* practice 4: answer in the plan = 2.63. Write 4 as 4.00 before taking away */
      { qid: "M3.S5.T11.C41:4", kind: "whole", top: "4", bot: "1.37", tray: ["1.37", "4"], near: "3.37", winMs: 3800,
        say: "What is 4 - 1.37?", ask: "4 − 1.37 = ?", answer: "2.63",
        miss: "4 has no tenths to give. Break one one into ten tenths." },
      /* practice 6: answer in the plan = 2.15, because 3.00 - 0.85 = 2.15 */
      { qid: "M3.S5.T11.C41:6", kind: "whole", top: "3", bot: "0.85", tray: ["0.85", "3"], near: "3.85", winMs: 3800,
        say: "Subtract 0.85 from 3.", ask: "Subtract 0.85 from 3", answer: "2.15",
        miss: "The 3 goes in the ones column, not under the 5." },
    ],
  },
  {
    n: 3,
    concept: "Three ways to ask for a difference",
    conceptId: "M3.S5.T11.C42", objectiveIds: ["O20"],
    says: ["Three ways to say it. Which number starts on top each time?"],
    /* tries, as the plan writes it: First rung: find the number that starts. Second rung: put it on top. Third rung: the same task with one wording, before all three return. */
    ladder: ["Put the greater number on top, with the points in one line.", "Read it as subtract the smaller from the greater, then trade where short."],
    closing: "Subtract from, take away and how much less all ask for the same difference. A number minus itself is 0.",
    learned: "You learned: three wordings, one difference; a number minus itself is 0",
    traceback: "Every wording on the Wording card lights the number that starts; the frame puts it on top, trades where a place is short and writes the difference green, and the card ends on that one difference for all three wordings.",
    items: [
      /* learn CS3: answer in the plan = 4.45 */
      { qid: "M3.S5.T11.C42:CS3", kind: "wording", top: "6.25", bot: "1.8", tray: ["1.8", "6.25"], word: 1, near: "5.65", winMs: 3600,
        say: "Take away 1.8 from 6.25.", ask: "Take away 1.8 from 6.25", answer: "4.45",
        miss: "Which number do you take away from? That one starts on top." },
      /* practice 2: answer in the plan = 0. A number minus itself is 0 */
      { qid: "M3.S5.T11.C42:2", kind: "wording", top: "9.16", bot: "9.16", tray: ["9.16", "9.16"], word: null, near: "18.32", winMs: 3400,
        say: "What is 9.16 - 9.16?", ask: "9.16 − 9.16 = ?", answer: 0,
        miss: "The same number is taken from itself. What is left?" },
      /* practice 5: answer in the plan = 2.24, because 5.14 - 2.90 = 2.24 */
      { qid: "M3.S5.T11.C42:5", kind: "wording", top: "5.14", bot: "2.9", tray: ["2.9", "5.14"], word: 2, near: "3.84", winMs: 3600,
        say: "How much less is 2.9 than 5.14?", ask: "How much less is 2.9 than 5.14?", answer: "2.24",
        miss: "How much less also asks for a difference. Which number is greater?" },
    ],
  },
  {
    n: 4,
    concept: "Undoing a mistaken addition",
    conceptId: "M3.S5.T11.C43", objectiveIds: ["O20"],
    says: ["First get back to the start. Then do the subtraction that was wanted."],
    /* tries, as the plan writes it: First rung: take the added number away once. Second rung: check that is the starting number. Third rung: the same task with whole numbers, before decimals return. */
    ladder: ["Is that the start? The start plus the added number gives the wrong answer.", "Think of 9 made by adding 2 to 7. Take 2 away for 7, then 2 again."],
    closing: "A mistaken addition is undone by taking the number away, then taking it away again.",
    learned: "You learned: undo a wrong addition by taking the number away twice",
    traceback: "The Undo panel takes the added number away once and the frame shows the starting number appear; then it takes the number away again, trading where short, and the right answer lands green.",
    items: [
      /* learn CS4: answer in the plan = 4.7 */
      { qid: "M3.S5.T11.C43:CS4", kind: "undo", got: "7.9", added: "1.6", start: "6.3", near: "6.3", winMs: 4200,
        say: "Someone added 1.6 to a number instead of subtracting it, and got 7.9. What is the right answer?",
        ask: "Added 1.6, got 7.9. Right answer?", answer: "4.7",
        miss: "First take 1.6 away from 7.9. That gives the start." },
      /* authored (no plan question left for this phase): the textbook's own example on p.86 and the brief's
         screen, 9.1 - 2.5 = 6.6, the start, then 6.6 - 2.5 = 4.1 */
      { qid: null, kind: "undo", got: "9.1", added: "2.5", start: "6.6", near: "6.6", winMs: 4200,
        say: "This time 2.5 was added by mistake, giving 9.1. What should the answer be?",
        ask: "Added 2.5, got 9.1. Right answer?", answer: "4.1",
        miss: "Undo the mistake: 9.1 take away 2.5. Then take 2.5 away once more." },
      /* practice 7: answer in the plan = 3.45. First 8.05 - 2.30 = 5.75, the starting number. Then 5.75 - 2.30 = 3.45 */
      { qid: "M3.S5.T11.C43:7", kind: "undo", got: "8.05", added: "2.3", start: "5.75", near: "5.75", winMs: 4200,
        say: "2.3 was added instead of taken away, and the result was 8.05. Find the wanted answer.",
        ask: "Added 2.3, got 8.05. Right answer?", answer: "3.45",
        miss: "Adding 2.3 again only makes it bigger. Take it away twice." },
    ],
  },
];

/* The frame: four columns (Ones to Thousandths; no question has a tens digit), the point line between Ones and
   Tenths, and the rows of the working area (working-area units). */
const CS = { colW: 140, fx: 160, rowH: 84, px: 752, pw: 326, pl: 300,
  y: { trade: 64, top: 128, bot: 222, rule: 316, diff: 324, tray: 428 } };
const CS_PLACES = ["Ones", "Tenths", "Hundredths", "Thousandths"];
/* the chapter's colours: given deep blue, result green, a trade vermilion, an added zero violet, taken away
   rose, the place being worked on amber, a place-holding zero grey */
const CS_INK = { given: CONTENT.hundred, result: CONTENT.one, trade: CONTENT.pointer, zero: "#7B4FB8", taken: CONTENT.bead, now: CONTENT.ten, hold: "#767676" };
const MODEL = { columns: CS_PLACES, frame: { x: 224, y: 266, columnWidth: 140, pointLineX: 364 }, rows: { trade: 266, top: 330, bottom: 424, difference: 526, tray: 630 },
  wordings: ["Subtract {b} from {a}", "Take away {b} from {a}", "How much less is {b} than {a}?"] };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? A decimal is judged in its written form, exactly ("4.25", not
   "4.250" or "4.2500"); the one whole-number answer (9.16 - 9.16) takes 0 and the column's own 0.00 */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return item.answer === 0 ? /^0(\.0{1,3})?$/.test(String(v).trim()) : leadNumber(v) === item.answer;
  return String(v).trim() === String(item.answer);
};
/* oracle: every answer re-derived in whole thousandths (no column, no digit, no floating point), written with
   as many places as the longer number has; a phase 4 answer also checks the starting number */
const csMilli = (s: any) => { const t = String(s).split("."); return Number(t[0]) * 1000 + Number(((t[1] || "") + "000").slice(0, 3)); };
const csWrite = (m: number, pl: number) => String(Math.floor(m / 1000)) + (pl ? "." + String(m % 1000).padStart(3, "0").slice(0, pl) : "");
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const nums = [it.top, it.bot, it.got, it.added].filter((x: any) => x !== undefined);
  const pl = Math.max(...nums.map((x: any) => (String(x).split(".")[1] || "").length));
  if (it.got !== undefined && csWrite(csMilli(it.got) - csMilli(it.added), pl) !== String(it.start)) return false;
  const m = it.got !== undefined ? csMilli(it.got) - 2 * csMilli(it.added) : csMilli(it.top) - csMilli(it.bot);
  if (m < 0 || (it.top !== undefined && csMilli(it.top) < csMilli(it.bot))) return false;
  return typeof it.answer === "number" ? m === it.answer * 1000 : csWrite(m, pl) === it.answer;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : /^\d*\.\d+$/.test(String(item.answer)) ? [String(item.answer), speakable(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): toolApi.answer strips the point, so a decimal is typed whole through the tool (PATTERNS §4) */
const answer = (item: any, v: any) => (HOOK.type ? (HOOK.type(String(v)), true) : undefined);
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
/* ── the frame's own arithmetic (the picture; the oracle above shares none of it) ── */
const csParts = (s: any) => { const t = String(s), k = t.indexOf("."); return k < 0 ? { i: t, d: "", whole: true } : { i: t.slice(0, k) || "0", d: t.slice(k + 1), whole: false }; };
const csPl = (s: any) => csParts(s).d.length;
const csCard = (v: string, row = "tray") => ({ v: String(v), row, j: 1, pointed: false });
const csN = (x: any) => x || 0;
/* a fresh frame for a question (null = Free play): two cards in the tray, or, on phase 4, none until the Undo panel */
function csInit(it: any, n: number) {
  const base = { trades: [] as number[], diffN: 0, now: null, burst: null, lit: null, litAll: false, allShown: false, check: false, undo: 0, edit: null, flash: null };
  if (!it) return { ...base, cards: { a: csCard("2.63"), b: csCard("7.4") } };
  if (n === 4) return { ...base, cards: { a: csCard(it.got, "off"), b: csCard(it.added, "off") } };
  return { ...base, cards: { a: csCard(it.tray[0]), b: csCard(it.tray[1]) } };
}
/* what the frame holds: which card is on top, whether it may start (greater on top, both points on the point
   line, a whole number given its point and zeros), the top digits after the trades, and the difference */
function csFrame(S: any) {
  const at = (r: string) => (S.cards.a.row === r ? "a" : S.cards.b.row === r ? "b" : null);
  const other = (k: string) => (k === "a" ? "b" : "a");
  const top = at("top"), bot = at("bot");
  const maxP = Math.max(csPl(S.cards.a.v), csPl(S.cards.b.v));
  const shown = (k: string) => { const c = S.cards[k], p = csParts(c.v); return { i: p.i, d: p.whole ? (c.pointed ? "0".repeat(maxP) : "") : p.d, whole: p.whole, pt: !p.whole || c.pointed }; };
  const lit = !!top && +S.cards[top].v < +S.cards[other(top)].v;
  const ready = (k: string | null) => !!k && S.cards[k].j === 1 && (!csParts(S.cards[k].v).whole || S.cards[k].pointed);
  const started = !!top && !!bot && !lit && ready(top) && ready(bot);
  const digits = (k: string | null) => {
    const out: any[] = [null, null, null, null], kind: any[] = [null, null, null, null];
    if (!k) return { out, kind };
    const c = S.cards[k], s = shown(k);
    s.i.split("").forEach((ch: string, q: number) => { const col = c.j - s.i.length + q; if (col >= 0 && col < 4) { out[col] = +ch; kind[col] = "given"; } });
    s.d.split("").forEach((ch: string, q: number) => { const col = c.j + q; if (col >= 0 && col < 4) { out[col] = +ch; kind[col] = s.whole ? "point" : "given"; } });
    if (started) for (let col = 1; col <= maxP; col++) if (out[col] === null) { out[col] = 0; kind[col] = "added"; }
    return { out, kind };
  };
  const T0 = digits(top), B0 = digits(bot);
  const tin = [0, 0, 0, 0], tout = [0, 0, 0, 0];
  (S.trades || []).forEach((m: number) => { tout[m]++; tin[m + 1]++; });
  const cur = T0.out.map((d: any, c: number) => (d === null && !tin[c] ? null : csN(d) + 10 * tin[c] - tout[c]));
  const bd = B0.out;
  const needs = (j: number): boolean => j < 4 && (csN(cur[j]) < csN(bd[j]) || (csN(cur[j]) === 0 && needs(j + 1)));
  const can = (k: number) => started && k >= 0 && k < 3 && csN(cur[k]) >= 1 && needs(k + 1);
  const short = [0, 1, 2, 3].filter((c) => started && csN(cur[c]) < csN(bd[c]));
  const diff = [0, 1, 2, 3].map((c) => (c <= maxP ? csN(cur[c]) - csN(bd[c]) : null));
  const diffStr = String(diff[0]) + (maxP ? "." + diff.slice(1, maxP + 1).join("") : "");
  const written = (k: string | null) => { if (!k) return ""; const s = shown(k), d = (s.d + "000").slice(0, Math.max(maxP, s.d.length)); return s.i + (maxP ? "." + (s.whole ? "0".repeat(maxP) : d) : ""); };
  return { top, bot, other, maxP, shown, lit, started, T0, B0, cur, bd, tin, tout, needs, can, short, diff, diffStr, written };
}
/* the book's order of trades: from the right, a short place takes one from the nearest place to its left that
   has one, through the zeros between (5.00 - 1.28: one one into tenths, then one tenth into hundredths) */
function csPlan(cur: any[], bd: any[]) {
  const c2 = cur.map(csN), b = bd.map(csN), out: number[] = [];
  for (let c = 3; c >= 1; c--) {
    if (c2[c] >= b[c]) continue;
    let k = c - 1;
    while (k >= 0 && c2[k] === 0) k--;
    if (k < 0) break;
    for (let m = k; m < c; m++) { c2[m] -= 1; c2[m + 1] += 10; out.push(m); }
  }
  return out;
}
/* a wording template ("from {a}") with its numbers lit or plain */
const csFill = (tpl: string, a: string, b: string, litA: boolean, litInk: string) =>
  tpl.split(/(\{a\}|\{b\})/).filter(Boolean).map((p: string, q: number) => (p === "{a}" ? <tspan key={q} fill={litA ? litInk : undefined} fontWeight={litA ? 800 : undefined}>{a}</tspan> : p === "{b}" ? <tspan key={q}>{b}</tspan> : <tspan key={q}>{p}</tspan>));

function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const tl = useTimeline();
  const reduced = reducedMotion();
  const free = stage === "free";
  const it: any = item || {};
  const sk = free ? "free" : n + ":" + index;
  const [S0, setS] = useState<any>(() => ({ ...csInit(free ? null : it, n), key: sk }));
  const S: any = S0.key === sk ? S0 : { ...csInit(free ? null : it, n), key: sk };
  const SR = useRef<any>(S);
  SR.current = S;
  const upd = (fn: (s: any) => any) => setS((p: any) => ({ ...fn(p.key === sk ? p : { ...csInit(free ? null : it, n), key: sk }), key: sk }));
  useEffect(() => { if (S0.key !== sk) { tl.stop(); setS({ ...csInit(free ? null : it, n), key: sk }); } }, [sk]);
  const flashT = useRef<any>(null);
  useEffect(() => () => { if (flashT.current) clearTimeout(flashT.current); }, []);

  const f = csFrame(S);
  const live = (stage === "teach" || stage === "ask" || free) && !tl.busy;
  const speak = stage === "ask" || free;   /* a refusal is never spoken during the teach */
  const ink = (hex: string, t = 0.25) => shade(hex, t);
  const colX = (c: number) => CS.fx + c * CS.colW;
  const cxOf = (c: number) => colX(c) + CS.colW / 2;
  const greater = +S.cards.a.v >= +S.cards.b.v ? "a" : "b";

  /* the teacher agent types a decimal whole (PATTERNS §4) */
  HOOK.type = (s: string) => api.setTyped(s);
  api.onEnter(null);

  /* ── where each card sits ── */
  const wOf = (k: string) => { const s = f.shown(k); return (s.i.length + s.d.length) * CS.colW; };
  const trayX: any = { a: 24, b: 24 + wOf("a") + 32 };
  const geom = (k: string) => {
    const c = S.cards[k], s = f.shown(k), w = (s.i.length + s.d.length) * CS.colW;
    if (c.row === "top" || c.row === "bot") return { x: CS.fx + (c.j - s.i.length) * CS.colW, y: (CS.y as any)[c.row], w, s };
    return { x: trayX[k], y: CS.y.tray, w, s };
  };
  const setCards = (cards: any, tick = true) => { upd((s) => ({ ...s, cards, trades: [], diffN: 0, check: false, now: null })); if (tick) api.sfx.tick(); };
  const flash = (c: number) => {
    upd((s) => ({ ...s, flash: c }));
    if (flashT.current) clearTimeout(flashT.current);
    flashT.current = setTimeout(() => upd((s) => ({ ...s, flash: null })), 900);
  };

  /* a tap (or Enter) on a card: put it where it belongs */
  const tapCard = (k: string) => {
    if (!live || f.started) return;
    const c = S.cards[k], o = f.other(k), oc = S.cards[o], cards = { ...S.cards };
    if (c.row === "tray") cards[k] = { ...c, row: oc.row === "top" ? "bot" : "top", j: 1 };
    else if (f.lit && oc.row !== "tray") { cards[k] = { ...c, row: oc.row, j: 1 }; cards[o] = { ...oc, row: c.row, j: 1 }; }
    else if (c.j !== 1) cards[k] = { ...c, j: 1 };
    else cards[k] = { ...c, row: "tray", j: 1 };
    setCards(cards);
  };
  /* a drag: the row it lands in, slid to the nearest place where its point sits on a column line */
  const dropCard = (k: string, x: number, y: number) => {
    if (!live || f.started) return;
    const c = S.cards[k], s = f.shown(k), w = (s.i.length + s.d.length) * CS.colW, cy = y + CS.rowH / 2, mid = x + w / 2;
    const inFrame = mid > CS.fx - 60 && mid < CS.fx + 4 * CS.colW + 60;
    const row = !inFrame ? "tray" : cy > 70 && cy < 217 ? "top" : cy >= 217 && cy < 372 ? "bot" : "tray";
    const j = Math.max(s.i.length, Math.min(4 - s.d.length, Math.round((x + s.i.length * CS.colW - CS.fx) / CS.colW)));
    const o = f.other(k), oc = S.cards[o], cards = { ...S.cards };
    if (row !== "tray" && oc.row === row) cards[o] = { ...oc, row: c.row, j: c.row === "tray" ? 1 : oc.j };
    cards[k] = { ...c, row, j: row === "tray" ? 1 : j };
    setCards(cards, row !== "tray");
  };
  /* Point first: the whole number gets its point and zeros, and its point goes on the point line */
  const wk = ["a", "b"].find((k) => S.cards[k].row !== "off" && csParts(S.cards[k].v).whole && !S.cards[k].pointed) || null;
  const pointFirst = () => {
    if (!live || !wk) return;
    const c = S.cards[wk];
    upd((s) => ({ ...s, cards: { ...s.cards, [wk]: { ...c, pointed: true, j: 1 } } }));
    api.sfx.tick();
  };
  /* a column tap: break one block of this place into ten of the place to its right (or, on a short place,
     take one from its left) */
  const tapCol = (c: number) => {
    if (!live || !f.started) return;
    let m: number | null = null;
    if (f.can(c)) m = c;
    else if (c >= 1 && f.needs(c) && f.can(c - 1)) m = c - 1;
    if (m === null) {
      flash(c);
      if (!speak) return;
      if (!f.short.length) api.say("No place is short now. Find the difference.");
      else if (f.needs(c) || f.needs(c + 1)) api.say("Nothing to break there. Look further left.");
      else api.say("That place is not short.");
      return;
    }
    const mm = m;
    tl.run([[0, () => upd((s) => ({ ...s, burst: { from: mm, st: 0 } }))], [170, () => upd((s) => ({ ...s, burst: { from: mm, st: 1 } }))],
      [400, () => { upd((s) => ({ ...s, burst: null, trades: [...s.trades, mm] })); api.sfx.tick(); }]]);
  };
  const grab = useRef<any>(null);
  const drag = useDrag((k: any, p: any, moved: boolean) => {
    const g = grab.current;
    grab.current = null;
    if (!moved || !g || !isFinite(p.x)) { tapCard(k); return; }
    dropCard(k, p.x - g.dx, p.y - g.dy);
  });
  const dg = drag.drag;
  if (dg && (!grab.current || grab.current.id !== dg.payload)) { const g0 = geom(dg.payload); grab.current = { id: dg.payload, dx: dg.x - g0.x, dy: dg.y - g0.y }; }

  /* ── the working, played out: the setup, every trade the book makes, then the difference place by place.
     slow = the traceback after a miss; fast = the win. Each step sets a whole snapshot of the frame. ── */
  const rowsOf = (topV: string, botV: string) => ({ a: { v: topV, row: "top", j: 1, pointed: csParts(topV).whole }, b: { v: botV, row: "bot", j: 1, pointed: csParts(botV).whole } });
  const playOut = (slow: boolean, win: boolean) => {
    const t = slow ? { place: 700, point: 650, now: 420, crack: 300, fly: 460, land: 260, digit: 280, end: 200 }
      : { place: 260, point: 220, now: 0, crack: 140, fly: 240, land: 60, digit: 120, end: 0 };
    const steps: any[] = [];
    let sim: any = { ...SR.current, burst: null, now: null, flash: null, edit: null, diffN: 0, key: sk };
    const put = (ms: number, patch: any, fx?: () => void) => { sim = { ...sim, ...patch }; const snap = sim; steps.push([ms, () => { setS(snap); if (fx) fx(); }]); };
    const work = () => {
      const f0 = csFrame(sim);
      csPlan(f0.cur, f0.bd).forEach((m) => {
        if (t.now) put(t.now, { now: m + 1 });
        put(t.crack, { now: m + 1, burst: { from: m, st: 0 } });
        put(t.fly, { burst: { from: m, st: 1 } });
        put(t.land, { burst: null, now: null, trades: [...sim.trades, m] }, () => api.sfx.tick());
      });
      const f1 = csFrame(sim);
      for (let k = 1; k <= f1.maxP + 1; k++) put(t.digit, { diffN: k });
    };
    if (n === 4) {
      if (sim.undo < 2) { put(t.place, { cards: rowsOf(it.got, it.added), trades: [], undo: 1 }); work(); put(t.place, { undo: 2 }); }
      if (sim.undo < 3) put(t.place, { cards: rowsOf(it.start, it.added), trades: [], diffN: 0, undo: 3 });
      work();
      put(t.end, { undo: 4 });
    } else {
      put(0, { litAll: n === 3 ? true : sim.litAll, diffN: 0, check: false });
      if (!csFrame(sim).started) {
        const g = +sim.cards.a.v >= +sim.cards.b.v ? "a" : "b", o = g === "a" ? "b" : "a";
        const cards: any = { [g]: { ...sim.cards[g], row: "top", j: 1 }, [o]: { ...sim.cards[o], row: "bot", j: 1 } };
        put(t.place, { cards, trades: [] });
        if (["a", "b"].some((k) => csParts(cards[k].v).whole && !cards[k].pointed))
          put(t.point, { now: 1, cards: { a: { ...cards.a, pointed: csParts(cards.a.v).whole }, b: { ...cards.b, pointed: csParts(cards.b.v).whole } } });
      }
      work();
      put(t.end, { allShown: n === 3, check: win });
    }
    return steps;
  };

  /* the win: the working plays out fast and ends on the difference, then the adding back */
  useEffect(() => { if (stage === "win" && !free) tl.run(playOut(false, true)); }, [stage]);
  /* the traceback: the same working, slowly, ending on the whole right answer; the child's answer stays */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tl.run(playOut(true, false), () => api.lock(false));
  }, [wrong]);

  /* phase 3: a wording tap lights the number that starts */
  const tapWord = (k: number) => { if (!live) return; upd((s) => ({ ...s, lit: k })); api.sfx.tick(); };
  /* phase 4: the Undo panel. Step 1 takes the added number away once and the start appears; step 2 sets up
     the subtraction that was wanted, for the child to work */
  const stepOne = () => {
    if (!live || S.undo !== 0) return;
    const steps: any[] = [];
    let sim: any = { ...S, key: sk };
    const put = (ms: number, patch: any, fx?: () => void) => { sim = { ...sim, ...patch }; const snap = sim; steps.push([ms, () => { setS(snap); if (fx) fx(); }]); };
    put(500, { cards: rowsOf(it.got, it.added), trades: [], diffN: 0, undo: 1 }, () => api.sfx.tick());
    const f0 = csFrame(sim);
    csPlan(f0.cur, f0.bd).forEach((m) => {
      put(260, { now: m + 1, burst: { from: m, st: 0 } });
      put(420, { burst: { from: m, st: 1 } });
      put(160, { burst: null, now: null, trades: [...sim.trades, m] }, () => api.sfx.tick());
    });
    for (let k = 1; k <= csFrame(sim).maxP + 1; k++) put(220, { diffN: k });
    put(0, { undo: 2 });
    tl.run(steps);
  };
  const stepTwo = () => {
    if (!live || S.undo !== 2) return;
    upd((s) => ({ ...s, cards: rowsOf(it.start, it.added), trades: [], diffN: 0, undo: 3 }));
    api.sfx.tick();
  };

  /* Free play: a card box lends the pad (api.capture); Enter sets the card to the typed decimal */
  const commitEdit = (s: any) => {
    const e = s.edit;
    if (!e) return s;
    let v = String(e.t).replace(/\.$/, "");
    if (v.startsWith(".")) v = "0" + v;
    if (!/^\d(\.\d{1,3})?$/.test(v)) return { ...s, edit: null };
    return { ...s, edit: null, cards: { ...s.cards, [e.k]: csCard(v) }, trades: [], diffN: 0, check: false, now: null };
  };
  const onKey = (key: string) => {
    if (key === "enter") { upd((s) => commitEdit(s)); api.capture(null); return; }
    upd((s) => {
      if (!s.edit) return s;
      let t = s.edit.t;
      if (key === "back") t = t.slice(0, -1);
      else if (key === "clear") t = "";
      else if (key === "point") { if (!t.includes(".")) t = (t || "0") + "."; }
      else if (/^\d$/.test(key)) { const p = t.split("."); if (p.length === 1 ? p[0].length < 1 : p[1].length < 3) t += key; }
      return { ...s, edit: { ...s.edit, t } };
    });
  };
  const openEdit = (k: string) => {
    if (!free || tl.busy) return;
    upd((s) => ({ ...commitEdit(s), edit: { k, t: "" } }));
    api.capture(onKey);
  };
  const takeAway = () => {
    if (!free || !f.started || tl.busy) return;
    if (f.short.length) { flash(f.short[f.short.length - 1]); api.say("Trade first where a place is short."); return; }
    const steps: any[] = [];
    for (let k = 1; k <= f.maxP + 1; k++) steps.push([150, () => upd((s) => ({ ...s, diffN: k }))]);
    steps.push([0, () => upd((s) => ({ ...s, check: true }))]);
    tl.run(steps);
  };

  /* ── what the host and the agent read back (toolApi.getState); the difference only once it is shown ── */
  const fullDiff = f.started && S.diffN > f.maxP;
  api.share({
    cards: ["a", "b"].map((k) => S.cards[k].v + "@" + S.cards[k].row).join(" "),
    top: f.top ? S.cards[f.top].v : null,
    columns: f.started ? f.cur.map((x: any) => (x === null ? "" : x)).join(",") : "",
    trades: S.trades.length,
    difference: fullDiff && (n !== 4 || S.undo === 4 || free) ? f.diffStr : null,
    undo: n === 4 && !free ? S.undo : null,
    complete: stage === "idle",
  });

  /* ── drawing (helpers are called, never mounted) ── */
  const anyPlaced = S.cards.a.row === "top" || S.cards.a.row === "bot" || S.cards.b.row === "top" || S.cards.b.row === "bot";
  const taken = fullDiff;
  const asked = n === 3 && !free ? it.word : null;
  const wordLit = (k: number) => n === 3 && !free && (S.litAll || S.lit === k);
  const cardLit = (k: string) => n === 3 && !free && (S.litAll || S.lit !== null) && +S.cards[k].v === Math.max(+S.cards.a.v, +S.cards.b.v);

  const frame = () => (
    <g>
      <rect x={CS.fx} y={CS.y.trade} width={4 * CS.colW} height={CS.y.diff + CS.rowH - CS.y.trade} rx={14} fill={tint(C.panel, 0.72)} stroke={C.rule} strokeWidth={2} />
      {["top", "bot"].map((r) => (f.top === null || r !== "top") && (f.bot === null || r !== "bot") && (
        <rect key={r} x={CS.fx + 10} y={(CS.y as any)[r] + 6} width={4 * CS.colW - 20} height={CS.rowH - 12} rx={RAD.piece} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="9 8" />
      ))}
      {[1, 2, 3].map((c) => <line key={c} x1={colX(c)} x2={colX(c)} y1={CS.y.trade} y2={CS.y.diff + CS.rowH} stroke={C.rule} strokeWidth={2} />)}
      <line x1={CS.pl} x2={CS.pl} y1={CS.y.trade - 6} y2={CS.y.diff + CS.rowH + 6} stroke={CONTENT.line} strokeWidth={5} strokeLinecap="round" />
      {CS_PLACES.map((p, c) => <text key={p} x={cxOf(c)} y={c % 2 ? 58 : 26} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(p)}</text>)}
      <line x1={CS.fx + 12} x2={CS.fx + 4 * CS.colW - 12} y1={CS.y.rule} y2={CS.y.rule} stroke={CONTENT.line} strokeWidth={4} strokeLinecap="round" />
      <text x={CS.fx - 28} y={CS.y.bot + 60} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>−</text>
    </g>
  );

  const cardEl = (k: string) => {
    const c = S.cards[k];
    if (c.row === "off") return null;
    const g = geom(k), s = g.s, nI = s.i.length, dragging = !!dg && dg.payload === k && !!grab.current;
    const x = dragging ? dg.x - grab.current.dx : g.x, y = dragging ? dg.y - grab.current.dy : g.y;
    const ctl = live && !f.started && (free || n !== 4);
    const hue = taken && c.row === "bot" ? CS_INK.taken : CS_INK.given;
    const nGiven = s.whole ? nI : nI + s.d.length;
    const chars = (s.i + s.d).split("");
    return (
      <g key={"card-" + k} style={{ transform: `translate(${x}px, ${y}px)`, transition: dragging || reduced ? "none" : "transform 300ms ease" } as any}
        {...(ctl ? { ...control("card-" + k, "card " + c.v), ...drag.bind(k), ...drag.keys(k) } : {})}>
        <rect x={5} y={0} width={nGiven * CS.colW - (s.whole && c.pointed ? 5 : 10)} height={CS.rowH} rx={16} fill={tint(hue, 0.86)} stroke={hue} strokeWidth={3} filter={dragging ? "url(#fLift)" : "url(#fShadowSoft)"} />
        {s.whole && c.pointed && s.d.length > 0 && (
          <rect x={nI * CS.colW} y={0} width={s.d.length * CS.colW - 5} height={CS.rowH} rx={16} fill={tint(CS_INK.zero, 0.88)} stroke={CS_INK.zero} strokeWidth={3} strokeDasharray="10 7" />
        )}
        {chars.map((ch, q) => {
          const added = s.whole && q >= nI;
          const fill = added ? ink(CS_INK.zero) : ch === "0" ? CS_INK.hold : ink(hue);
          return <text key={q} x={q * CS.colW + CS.colW / 2} y={62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={fill}>{ch}</text>;
        })}
        {s.pt && <text x={nI * CS.colW} y={62} textAnchor="middle" fontSize={T.xl} fontWeight={800} fill={s.whole ? ink(CS_INK.zero) : C.ink}
          stroke="#FFFFFF" strokeWidth={s.whole ? 7 : 0} paintOrder="stroke">.</text>}
        {cardLit(k) && <rect x={-2} y={-7} width={nGiven * CS.colW + 4} height={CS.rowH + 14} rx={20} fill="none" stroke={CS_INK.now} strokeWidth={5} pointerEvents="none" />}
      </g>
    );
  };

  /* zeros written to line the decimals up (violet, dashed), the strike-throughs and the trades above */
  const working = () => {
    if (!f.started) return null;
    const extra = (k: string | null, B: any) => {
      if (!k) return null;
      const s = f.shown(k), last = S.cards[k].j + s.d.length - 1, y = (CS.y as any)[S.cards[k].row];
      return [1, 2, 3].filter((c) => c > last && B.kind[c] === "added").map((c) => (
        <g key={k + c}>
          <rect x={colX(c) + 7} y={y} width={CS.colW - 14} height={CS.rowH} rx={16} fill={tint(CS_INK.zero, 0.88)} stroke={CS_INK.zero} strokeWidth={3} strokeDasharray="10 7" />
          <text x={cxOf(c)} y={y + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink(CS_INK.zero)}>0</text>
        </g>
      ));
    };
    const changed = [0, 1, 2, 3].filter((c) => f.tin[c] || f.tout[c]);
    return (
      <g pointerEvents="none">
        {extra(f.top, f.T0)}
        {extra(f.bot, f.B0)}
        {changed.map((c) => (
          <g key={"t" + c}>
            <line x1={cxOf(c) - 26} y1={CS.y.top + 70} x2={cxOf(c) + 26} y2={CS.y.top + 14} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
            <text x={cxOf(c)} y={CS.y.trade + 46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink(CS_INK.trade)}>{f.cur[c]}</text>
          </g>
        ))}
        {(changed.length > 0 || S.burst) && <text x={8} y={CS.y.trade + 46} fontSize={T.micro} fontWeight={700} fill={ink(CS_INK.trade)}>{tx("Trade")}</text>}
      </g>
    );
  };

  /* one block cracks into ten small blocks that tumble into the short place */
  const burst = () => {
    if (!S.burst) return null;
    const b = S.burst, fx = cxOf(b.from), tox = cxOf(b.from + 1);
    return (
      <g pointerEvents="none">
        {Array.from({ length: 10 }).map((_, q) => {
          const r = Math.floor(q / 5), cc = q % 5;
          const at = b.st ? [tox - 46 + cc * 19 + (r ? 9 : 0), CS.y.trade + 10 + r * 20] : [fx - 34 + cc * 14, CS.y.trade + 16 + r * 14];
          return <rect key={q} x={0} y={0} width={12} height={12} rx={2} fill={CS_INK.trade}
            style={{ transform: `translate(${at[0]}px, ${at[1]}px)`, transition: reduced ? "none" : `transform 340ms ease-in ${q * 14}ms` } as any} />;
        })}
      </g>
    );
  };

  /* the place being worked on (amber), and a refused tap */
  const lights = () => (
    <g pointerEvents="none">
      {[S.now, S.flash].filter((c) => c !== null && c !== undefined).map((c: number, q: number) => (
        <rect key={q} x={colX(c) + 4} y={CS.y.trade + 4} width={CS.colW - 8} height={CS.y.bot + CS.rowH - CS.y.trade - 8} rx={12} fill="none" stroke={CS_INK.now} strokeWidth={6} />
      ))}
      {f.lit && (
        <g>
          <rect x={CS.fx - 6} y={CS.y.top - 6} width={4 * CS.colW + 12} height={CS.rowH + 12} rx={18} fill="none" stroke={CS_INK.now} strokeWidth={6} />
          <text x={6} y={CS.y.top + 54} fontSize={T.micro} fontWeight={700} fill={ink(CS_INK.now, 0.45)}>{tx("Top check")}</text>
        </g>
      )}
    </g>
  );

  /* the difference, green, under the rule; then the bottom card reads as taken away */
  const difference = () => {
    if (!f.started || S.diffN <= 0) return null;
    return (
      <g pointerEvents="none">
        {[0, 1, 2, 3].filter((c) => c <= f.maxP && c > f.maxP - S.diffN).map((c) => (
          <text key={c} x={cxOf(c)} y={CS.y.diff + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink(CS_INK.result)}>{f.diff[c]}</text>
        ))}
        {f.maxP > 0 && S.diffN >= f.maxP && <text x={CS.pl} y={CS.y.diff + 62} textAnchor="middle" fontSize={T.xl} fontWeight={800} fill={ink(CS_INK.result)}
          stroke="#FFFFFF" strokeWidth={7} paintOrder="stroke">.</text>}
        <text x={8} y={CS.y.diff + 52} fontSize={T.micro} fontWeight={700} fill={ink(CS_INK.result)}>{tx("Difference")}</text>
        {taken && <text x={8} y={CS.y.bot + 36} fontSize={T.micro} fontWeight={700} fill={ink(CS_INK.taken)}>{tx("Taken")}</text>}
        {taken && <text x={8} y={CS.y.bot + 70} fontSize={T.micro} fontWeight={700} fill={ink(CS_INK.taken)}>{tx("away")}</text>}
      </g>
    );
  };

  /* the check is adding back: difference + the number taken away gives the top again */
  const addBack = () => {
    if (!S.check || !fullDiff || !f.top) return null;
    return (
      <g pointerEvents="none">
        <text x={8} y={CS.y.tray + 58} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Check")}</text>
        <text x={420} y={CS.y.tray + 58} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>
          <tspan fill={ink(CS_INK.result)}>{f.diffStr}</tspan><tspan>{" + "}</tspan><tspan fill={ink(CS_INK.taken)}>{f.written(f.bot)}</tspan>
        </text>
        <text x={436} y={CS.y.tray + 58} fontSize={T.label} fontWeight={700} fill={ink(CS_INK.given)}>{"= " + f.written(f.top)}</text>
      </g>
    );
  };

  /* the two numbers' sizes, to scale, while the smaller one is on top */
  const bars = () => {
    if (!f.lit || !f.top) return null;
    const vals: any = { top: +S.cards[f.top].v, bot: +S.cards[f.other(f.top)].v };
    return (
      <g pointerEvents="none">
        {["top", "bot"].map((r) => <rect key={r} x={CS.px + 14} y={(CS.y as any)[r] + 24} width={Math.max(10, (vals[r] / 10) * 290)} height={36} rx={10} fill={CS_INK.given} />)}
      </g>
    );
  };

  const keyText = (s: string, size = T.label) => <text y={size === T.label ? 11 : 10} textAnchor="middle" fontSize={size} fontWeight={600} fill={C.ink}>{s}</text>;

  /* phase 3: the Wording card, three wordings of one subtraction */
  const wordingCard = () => {
    const a = it.top, b = it.bot, litInk = ink(CS_INK.now, 0.45);
    const lines = [["Subtract {b}", "from {a}"], ["Take away {b}", "from {a}"], ["How much less", "is {b} than {a}?"]];
    return (
      <g>
        {lines.map((ln, k) => {
          const y = 64 + k * 96, isAsked = asked === k;
          return (
            <g key={k}>
              <rect x={CS.px} y={y} width={CS.pw} height={86} rx={16} fill={wordLit(k) ? tint(CS_INK.now, 0.82) : "#FFFFFF"} stroke={isAsked ? C.ink : C.rule} strokeWidth={isAsked ? 4 : 2} />
              <text x={CS.px + 18} y={y + 36} fontSize={T.micro} fontWeight={600} fill={C.ink}>{csFill(tx(ln[0]), a, b, wordLit(k), litInk)}</text>
              <text x={CS.px + 18} y={y + 72} fontSize={T.micro} fontWeight={600} fill={C.ink}>{csFill(tx(ln[1]), a, b, wordLit(k), litInk)}</text>
              <Hit id={"word-" + (k + 1)} x={CS.px} y={y} w={CS.pw} h={86} onPress={() => tapWord(k)} label={"wording " + (k + 1)} />
            </g>
          );
        })}
        {S.allShown && fullDiff && (
          <text x={CS.px + 18} y={64 + 3 * 96 + 34} fontSize={T.label} fontWeight={700} fill={C.ink}>
            <tspan>{tx("All three:") + " "}</tspan><tspan fill={ink(CS_INK.result)}>{String(it.answer)}</tspan>
          </text>
        )}
      </g>
    );
  };

  /* phase 4: the Undo panel, two steps one under the other */
  const undoPanel = () => {
    const green = ink(CS_INK.result), sum = tx("start + {x}").replace("{x}", it.added);
    return (
      <g>
        <text x={CS.px + 14} y={98} fontSize={T.label} fontWeight={600} fill={C.ink}>{sum}</text>
        <text x={CS.px + 14 + Math.round(sum.length * 0.56 * T.label) + 10} y={98} fontSize={T.label} fontWeight={700} fill={ink(CS_INK.given)}>{"= " + it.got}</text>
        <Key id="undo-1" x={CS.px + 8} y={118} w={CS.pw - 16} h={78} C={C} onClick={stepOne} label={"take away " + it.added} disabled={S.undo !== 0}>
          {keyText(tx("Take away {x}").replace("{x}", it.added))}
        </Key>
        <text x={CS.px + 14} y={240} fontSize={T.label} fontWeight={600} fill={C.ink}>
          <tspan>{tx("start") + " = "}</tspan><tspan fill={S.undo >= 2 ? green : C.ink} fontWeight={700}>{S.undo >= 2 ? it.start : "?"}</tspan>
        </text>
        <Key id="undo-2" x={CS.px + 8} y={258} w={CS.pw - 16} h={78} C={C} onClick={stepTwo} label={"take away " + it.added + " again"} disabled={S.undo !== 2}>
          {keyText(tx("Take away {x} again").replace("{x}", it.added), T.micro)}
        </Key>
        <text x={CS.px + 14} y={384} fontSize={T.label} fontWeight={600} fill={C.ink}>
          <tspan>{tx("answer") + " = "}</tspan><tspan fill={S.undo === 4 ? green : C.ink} fontWeight={700}>{S.undo === 4 ? String(it.answer) : "?"}</tspan>
        </text>
      </g>
    );
  };

  /* Free play: two card boxes that take the pad, Point first, and Take away */
  const freePanel = () => (
    <g>
      {["a", "b"].map((k, q) => {
        const y = 64 + q * 96, ed = !!S.edit && S.edit.k === k;
        return (
          <g key={k}>
            <rect x={CS.px + 8} y={y} width={CS.pw - 16} height={84} rx={16} fill={ed ? "#FFFFFF" : tint(C.panel, 0.5)} stroke={ed ? C.accent : C.rule} strokeWidth={ed ? 4 : 2} />
            <text x={CS.px + 26} y={y + 52} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(q ? "Card 2" : "Card 1")}</text>
            <text x={CS.px + CS.pw - 34} y={y + 58} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={ink(CS_INK.given)}>{ed ? S.edit.t : S.cards[k].v}</text>
            {ed && <rect x={CS.px + CS.pw - 28} y={y + 20} width={4} height={46} rx={2} fill={C.ink} />}
            <Hit id={"set-" + k} x={CS.px + 8} y={y} w={CS.pw - 16} h={84} onPress={() => openEdit(k)} label={"type card " + (q + 1)} enabled={!(captured && ed)} />
          </g>
        );
      })}
      <Key id="take" x={CS.px + 8} y={346} w={CS.pw - 16} h={76} C={C} primary onClick={takeAway} label="take away" disabled={!f.started}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill="#FFFFFF">{tx("Take away")}</text>
      </Key>
    </g>
  );

  /* the one invite: the first card, the asked wording, Point first, or the Undo panel's next step */
  let inv: any = null;
  if (live && !free) {
    if (n === 4) inv = S.undo === 0 ? { x: CS.px + CS.pw / 2, y: 157 } : S.undo === 2 ? { x: CS.px + CS.pw / 2, y: 297 } : null;
    else if (n === 3 && S.lit === null && !anyPlaced) inv = { x: CS.px + CS.pw / 2, y: 64 + (asked === null ? 0 : asked) * 96 + 43 };
    else if (!anyPlaced) { const g = geom("a"); inv = { x: g.x + Math.min(g.w, 280) / 2, y: g.y + CS.rowH / 2 }; }
    else if (wk && S.cards.a.row !== "tray" && S.cards.b.row !== "tray") inv = { x: CS.px + 14 + 145, y: 372 };
  }

  return (
    <g>
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
        <text x={22} y={-46} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Trades")}</text>
        <text x={306} y={-38} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={ink(CS_INK.trade)}>{S.trades.length}</text>
      </g>
      {frame()}
      {n === 3 && !free && wordingCard()}
      {n === 4 && !free && undoPanel()}
      {free && freePanel()}
      {bars()}
      {cardEl("a")}
      {cardEl("b")}
      {working()}
      {difference()}
      {burst()}
      {lights()}
      {addBack()}
      {wk && n !== 4 && (
        <Key id="point-first" x={free ? CS.px + 8 : CS.px + 14} y={free ? 256 : 330} w={free ? CS.pw - 16 : 290} h={free ? 80 : 84} C={C} onClick={pointFirst} label="point first">
          {keyText(tx("Point first"))}
        </Key>
      )}
      {f.started && [0, 1, 2, 3].map((c) => (
        <Hit key={"col" + c} id={"col-" + (c + 1)} x={colX(c)} y={CS.y.trade} w={CS.colW} h={CS.y.top + CS.rowH - CS.y.trade}
          onPress={() => tapCol(c)} label={"trade at " + CS_PLACES[c].toLowerCase()} />
      ))}
      {inv && <Invite x={inv.x} y={inv.y} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const ph: any = PHASES[(n || 1) - 1], it: any = ph && ph.items[last.item];
  const sum = it ? (it.got !== undefined ? it.start + " − " + it.added : it.top + " − " + it.bot) : "";
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={33} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{sum}</text>
      <text x={w / 2} y={h - 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(CS_INK.result, 0.25)}>{"= " + String(last.value)}</text>
    </g>
  );
}

function ColumnSubtractor(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, pointKey: true, winMs: 3600, fitHost: () => null }} />
  );
}

export default ColumnSubtractor;
