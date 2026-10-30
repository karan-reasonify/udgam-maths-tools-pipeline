/* ═══ M2.S3.T6.C28.2D1 · place_value_chart · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C5.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "place_value_chart";
const MEDIA_ID = "M2.S3.T6.C28.2D1";
const TOOL_NAME = "Place Value Board";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A place value chart, with room past the point."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every digit has a place, and a worth that goes with it.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any decimal on the chart, any digit tapped.";

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
   items   three a phase, the third tests whether the phase landed.
           kind  build: tiles dragged into the chart, Enter commits the chart (pad "enter")
                 digit: the digit in a named place, typed
                 head:  which place a digit is in, by tapping that column's head (pad "enter")
                 worth: a digit's place value, typed as a decimal · frac: the same as a stacked fraction
                 diff:  the difference of the worths of one digit in two places, typed as a decimal
                 each:  the worth of every copy of a digit, typed into boxes under them (the pad is lent)
                 nudge: the arrows change one place; Enter commits the chart (pad "enter")
           num   the decimal on the chart · at / place / col: the column asked about
           near  the misconception (judge rejects it) */
const PHASES = [
  {
    n: 1,
    concept: "The chart goes past the point",
    conceptId: "M2.S3.T6.C25", objectiveIds: ["O9"],
    says: ["The ones stay where they were. What comes after the point?"],
    /* tries, as the plan writes it: First rung: place the whole number digits. Second rung: place the first digit after the point. Third rung: the same task with one digit after the point, before longer decimals return. */
    ladder: ["Place the first digit after the point.", "Start at the point and move right, one column for each digit."],
    closing: "after the point come tenths, then hundredths, then thousandths",
    learned: "You learned: after the point come tenths, hundredths, thousandths",
    traceback: "the column that went wrong lights amber, and an Answer row under the chart sets each digit in its own column, a zero as a grey place holder",
    items: [
      /* learn PV1: answer in the plan = 6 tens, 3 ones, 5 tenths, 0 hundredths and 8 thousandths */
      { qid: "M2.S3.T6.C25:PV1", kind: "build", num: "63.508", pad: "enter", winMs: 2600,
        named: "6 tens, 3 ones, 5 tenths, 0 hundredths and 8 thousandths", near: "63.58",
        say: "Put 63.508 on the place value chart. Which digit is in each place?", ask: "Put 63.508 on the chart",
        answer: "63.508", miss: "Every digit needs a column of its own, even a zero." },
      /* practice 1: answer in the plan = 2 */
      { qid: "M2.S3.T6.C25:1", kind: "digit", num: "7.24", place: "tenths", near: "7",
        say: "Here are the tiles of 7.24. Which digit is in the tenths place?", ask: "Digit in the tenths place?",
        answer: "2", miss: "Find the Tenths column. Which tile goes under it?" },
      /* practice 3 (moved here from phase 2: it names a place past the point, and its 0 is this phase's
         place holder): answer in the plan = The hundredths place */
      { qid: "M2.S3.T6.C26:3", kind: "head", num: "15.093", at: "hundredths", pad: "enter", near: "tenths",
        say: "In 15.093, which place is the 9 in? Tap the name of its column.", ask: "Which place is the 9 in?",
        answer: "hundredths", miss: "Count the places after the point, one by one." },
    ],
  },
  {
    n: 2,
    concept: "The place value of a digit",
    conceptId: "M2.S3.T6.C26", objectiveIds: ["O9"],
    says: ["First say which place. Then say how much it is worth."],
    /* tries, as the plan writes it: First rung: point at the digit's column head. Second rung: say the digit with that place's name. Third rung: the same task on a digit in the tenths place, before other places return. */
    ladder: ["Say the digit with that place's name.", "A digit in the tenths place is worth that many tenths."],
    closing: "a digit's place is where it sits, and its place value is the amount it is worth",
    learned: "You learned: the place is where a digit sits, its value is its worth",
    traceback: "the column head lights, the Which place card names the place, and the Worth card writes the amount three ways, ending on the asked form",
    items: [
      /* learn PV2: answer in the plan = The hundredths place. Its place value is 8 hundredths, which is 8/100 or 0.08 */
      { qid: "M2.S3.T6.C26:PV2", kind: "worth", num: "4.286", at: "hundredths", near: "8",
        say: "In 4.286, which place is the 8 in, and what is its place value? Tap the 8, then type its worth as a decimal.",
        ask: "Worth of the 8, as a decimal?", answer: "0.08", miss: "The 8 alone is only the digit. What is it worth in its place?" },
      /* practice 2: answer in the plan = 6 hundredths, which is 6/100 or 0.06 */
      { qid: "M2.S3.T6.C26:2", kind: "frac", num: "0.461", at: "hundredths", parts: SLOT_FRACTION, near: "6|10",
        say: "What is the place value of 6 in 0.461? This time give it as a fraction.",
        ask: "Worth of the 6, as a fraction?", answer: [6, 100], miss: "Read the column name above the 6. How many parts make one?" },
      /* practice 4: answer in the plan = 3 thousandths, which is 3/1000 or 0.003 */
      { qid: "M2.S3.T6.C26:4", kind: "worth", num: "12.803", at: "thousandths", near: "3",
        say: "And the 3 in 12.803? Give its place value as a decimal.",
        ask: "Worth of the 3, as a decimal?", answer: "0.003", miss: "Count the places from the point to the 3." },
    ],
  },
  {
    n: 3,
    concept: "One digit in two places",
    conceptId: "M2.S3.T6.C27", objectiveIds: ["O10"],
    says: ["The same digit, two places. What is each one worth?"],
    /* tries, as the plan writes it: First rung: give the worth of the digit on the left. Second rung: give the worth of the one on the right. Third rung: the same task with the two digits in neighbouring places. */
    ladder: ["Give the worth of the one on the right.", "Read the column name above each digit first."],
    closing: "one digit is worth different amounts in two places, and the difference of the worths is a subtraction",
    learned: "You learned: one digit has different worths; subtract to compare",
    traceback: "each digit's worth fills under it, the worths line up by their points in the Two places panel, and the subtraction is written to its answer",
    items: [
      /* learn PV3: answer in the plan = 4.95, because 5 - 0.05 = 4.95 */
      { qid: "M2.S3.T6.C27:PV3", kind: "diff", num: "5.45", twins: ["ones", "hundredths"], near: "0",
        say: "In 5.45, what is the difference between the place values of the two 5s? Tap each 5 to see its worth.",
        ask: "Difference of the worths?", answer: "4.95", miss: "The digits match, but their worths do not. Which is worth more?" },
      /* practice 5: answer in the plan = 1.98. The first 2 is worth 2 and the second is worth 0.02, and 2.00 - 0.02 = 1.98 */
      { qid: "M2.S3.T6.C27:5", kind: "diff", num: "2.62", twins: ["ones", "hundredths"], near: "0",
        say: "Now the two 2s in 2.62. Take the smaller worth from the greater.",
        ask: "Difference of the worths?", answer: "1.98", miss: "Write the 2 as 2.00, so the points line up." },
      /* practice 7: answer in the plan = 40, 4 and 0.4: 4 tens, 4 ones and 4 tenths */
      { qid: "M2.S3.T6.C27:7", kind: "each", num: "44.4", cells: ["tens", "ones", "tenths"], pad: "enter", near: "4|4|4",
        say: "In 44.4 the digit 4 appears three times. What is each 4 worth? Tap the box under it and type.",
        ask: "What is each 4 worth?", answer: ["40", "4", "0.4"], miss: "Each step to the left makes a digit worth ten times as much." },
    ],
  },
  {
    n: 4,
    concept: "Changing one place",
    conceptId: "M2.S3.T6.C28", objectiveIds: ["O10"],
    says: ["Each arrow adds or takes away one of its place. Which tiles change, and which stay still?"],
    /* tries, as the plan writes it: First rung: find the column the question names. Second rung: nudge it once. Third rung: the same task with one nudge, before larger changes return. */
    ladder: ["Nudge it once, and watch which tile changes.", "One nudge at a time, and count each one."],
    closing: "adding an amount in one place changes only that place's digit",
    learned: "You learned: adding in one place changes only that place's digit",
    traceback: "the named column lights, an Answer row ticks that one digit a step at a time, and the new decimal stands written in full",
    items: [
      /* learn PV4: answer in the plan = 2.391 */
      { qid: "M2.S3.T6.C28:PV4", kind: "nudge", num: "2.351", col: "hundredths", by: 4, pad: "enter", near: "2.355",
        say: "What number is 4 hundredths greater than 2.351? Nudge the chart, then press Enter.",
        ask: "4 hundredths more than 2.351?", answer: "2.391", miss: "Find the column the question names. Is it the last one?" },
      /* practice 6: answer in the plan = 5.56. Only the tenths digit changes, from 2 to 5 */
      { qid: "M2.S3.T6.C28:6", kind: "nudge", num: "5.26", col: "tenths", by: 3, pad: "enter", near: "5.29",
        say: "Now 3 tenths more than 5.26.",
        ask: "3 tenths more than 5.26?", answer: "5.56", miss: "Tenths sit just after the point. The other tiles stay still." },
      /* practice 8: answer in the plan = 6.125. Only the hundredths digit changes, from 4 to 2 */
      { qid: "M2.S3.T6.C28:8", kind: "nudge", num: "6.145", col: "hundredths", by: -2, pad: "enter", near: "6.143",
        say: "This time take away. What is 2 hundredths less than 6.145?",
        ask: "2 hundredths less than 6.145?", answer: "6.125", miss: "Less means the down arrow, in the column it names." },
    ],
  },
];

/* ── the chart, shared by every phase (working-area units) ───────────────────────────────────
   Five columns and the point: no number in this tool has a hundreds digit, and six columns would not
   fit the full place names at the type floor. A value is kept in whole thousandths, so a nudge never
   drifts the way a float would. */
const PV_COLS: any[] = [
  { key: "tens", name: "Tens", one: "ten", x: 40, unit: 10000, dp: 0 },
  { key: "ones", name: "Ones", one: "one", x: 232, unit: 1000, dp: 0 },
  { key: "tenths", name: "Tenths", one: "tenth", x: 470, unit: 100, dp: 1 },
  { key: "hundredths", name: "Hundredths", one: "hundredth", x: 662, unit: 10, dp: 2 },
  { key: "thousandths", name: "Thousandths", one: "thousandth", x: 854, unit: 1, dp: 3 },
];
const PV_W = 192, PV_PT = 447;
const PV_HEAD = { y: 8, h: 76 }, PV_CELL = { y: 92, h: 120 };
const PV_GREEN = shade(CONTENT.one, 0.25), PV_AMBER = shade(CONTENT.ten, 0.45), PV_VIOLET = shade(CONTENT.bead, 0.35), PV_GREY = "#767676";
const PV_FREE = "47.216";
const pvCol = (k: string): any => PV_COLS.find((c) => c.key === k) || PV_COLS[1];
const pvCx = (k: string) => pvCol(k).x + PV_W / 2;
/* "63.508" -> { tens: "6", ones: "3", tenths: "5", hundredths: "0", thousandths: "8" }; a place it lacks is absent */
const pvDigits = (s: string) => {
  const [w, f = ""] = String(s).split(".");
  const out: any = {}, ww = w.slice(-2);
  if (ww.length === 2) { out.tens = ww[0]; out.ones = ww[1]; } else if (ww.length === 1) out.ones = ww[0];
  ["tenths", "hundredths", "thousandths"].forEach((k, j) => { if (f[j] !== undefined) out[k] = f[j]; });
  return out;
};
const pvList = (s: string) => { const g = pvDigits(s); return PV_COLS.filter((c) => g[c.key] !== undefined).map((c) => ({ d: g[c.key], col: c.key })); };
const pvTh = (s: string) => { const [w, f = ""] = String(s).split("."); return Number(w || 0) * 1000 + Number((f + "000").slice(0, 3)); };
const pvDp = (s: string) => (String(s).split(".")[1] || "").length;
/* a value in thousandths, written with at least dp0 places and as many more as a nonzero digit needs */
const pvRead = (th: number, dp0: number) => {
  const f = String(th % 1000).padStart(3, "0");
  let dp = dp0;
  for (let d = 3; d > dp0; d--) if (f[d - 1] !== "0") { dp = d; break; }
  return dp > 0 ? Math.floor(th / 1000) + "." + f.slice(0, dp) : String(Math.floor(th / 1000));
};
/* what the chart reads from the tiles the child placed (an empty column is simply not read) */
const pvReadPlaced = (cols: any, tiles: any[]) => {
  const d = (k: string) => (cols[k] !== undefined && cols[k] !== null ? tiles[cols[k]].d : "");
  const w = d("tens") + d("ones"), f = d("tenths") + d("hundredths") + d("thousandths");
  return f ? w + "." + f : w;
};
/* one digit's worth, as the book writes it: 40, 4, 0.4, 0.05 */
const pvWorth = (d: string, col: string) => (d === "0" ? "0" : pvRead(Number(d) * pvCol(col).unit, 0));
const pvCount = (d: string, col: string) => d + " " + (d === "1" ? pvCol(col).one : pvCol(col).key);

const MODEL = { columns: PV_COLS.map((c) => c.name), point: "between Ones and Tenths", freePlay: PV_FREE };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: exact written forms ("0.08", not "0.080" or ".08"); a count or a digit takes digits only */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "build") return String(v) === item.answer || String(v) === item.named;
  if (Array.isArray(item.answer)) {
    const a = Array.isArray(v) ? v.map((x: any) => String(x).trim()) : String(v ?? "").split("|").map((x) => x.trim());
    return a.length === item.answer.length && a.every((x: string, k: number) => x === item.answer[k]);
  }
  return String(v ?? "").trim().toLowerCase() === String(item.answer).toLowerCase();
};
/* oracle: every answer re-derived from the item's own number by plain arithmetic, sharing nothing with
   judge or the picture */
const ORC_PLACES = ["tenths", "hundredths", "thousandths"];
const orcDigitAt = (num: string, place: string) => {
  const [w, f = ""] = num.split(".");
  if (place === "ones") return w[w.length - 1];
  if (place === "tens") return w[w.length - 2];
  return f[ORC_PLACES.indexOf(place)];
};
const orcAmount = (num: string, place: string) => {
  const p = ({ tens: 1, ones: 0, tenths: -1, hundredths: -2, thousandths: -3 } as any)[place];
  return Number(orcDigitAt(num, place)) * Math.pow(10, p);
};
const orcFixed = (x: number, dp: number) => (Math.round(x * 1000) / 1000).toFixed(dp);
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const num = it.num, dp = (num.split(".")[1] || "").length;
  if (it.kind === "build") {
    const got: any = {};
    it.named.replace(" and ", ", ").split(", ").forEach((part: string) => { const [d, name] = part.split(" "); got[name] = d; });
    return it.answer === num && (got.tens || "") + got.ones + "." + got.tenths + got.hundredths + got.thousandths === num;
  }
  if (it.kind === "digit") return it.answer === orcDigitAt(num, it.place);
  if (it.kind === "head") return orcDigitAt(num, it.answer) === "9" && it.say.includes("the 9");
  if (it.kind === "worth") { const x = orcAmount(num, it.at); return it.answer === orcFixed(x, -({ tenths: -1, hundredths: -2, thousandths: -3 } as any)[it.at]); }
  if (it.kind === "frac") return it.answer[0] === Number(orcDigitAt(num, it.at)) && it.answer[1] === Math.pow(10, ORC_PLACES.indexOf(it.at) + 1);
  if (it.kind === "diff") {
    const a = orcAmount(num, it.twins[0]), b = orcAmount(num, it.twins[1]);
    return orcDigitAt(num, it.twins[0]) === orcDigitAt(num, it.twins[1]) && it.answer === orcFixed(a - b, 2);
  }
  if (it.kind === "each") return it.cells.every((c: string, k: number) => Number(it.answer[k]) === Math.round(orcAmount(num, c) * 1000) / 1000);
  if (it.kind === "nudge") {
    const step = ({ tenths: 0.1, hundredths: 0.01, thousandths: 0.001 } as any)[it.col];
    return it.answer === orcFixed(Number(num) + it.by * step, dp);
  }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a build target is the
   question itself, so it is exempt) */
const answerForms = (item: any) => {
  const sp = (x: string) => [x, speakable(x)];
  if (item.kind === "build") return [];
  if (item.kind === "digit") return [item.answer, words(Number(item.answer))];
  if (item.kind === "head") return [item.answer];
  const d = item.num ? pvDigits(item.num)[item.at] : "";
  if (item.kind === "worth") return [...sp(item.answer), pvCount(d, item.at), words(Number(d)) + " " + pvCol(item.at).key];
  if (item.kind === "frac") return [pvCount(d, item.at), words(Number(d)) + " " + pvCol(item.at).key, ...sp(pvWorth(d, item.at))];
  if (item.kind === "each") return item.answer.filter((x: string) => x !== pvDigits(item.num).ones).flatMap(sp);
  return sp(String(item.answer));
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it: a build is named
   place by place, as the plan writes it */
const agentKey = (item: any) => (item.kind === "build" ? item.named : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo()
  : T.submit(item.parts ? item.answer : Array.isArray(item.answer) ? item.answer.join("|") : item.answer));
/* the agent's answer(): a working-area item is set as a child would set it; a decimal is typed with its
   point (toolApi.answer strips the point); a digit or a fraction falls back to the runtime */
const answer = (item: any, v: any) => {
  if (item.pad === "enter") return HOOK.set ? HOOK.set(v) : false;
  if (!item.parts && typeof item.answer === "string" && item.answer.includes(".")) return HOOK.type ? HOOK.type(v) : undefined;
  return undefined;
};
/* the agent's check() before Enter: undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);
/* the slot shows the worths of "each" with commas, not the "|" they travel with */
const format = (v: any) => String(v ?? "").replace(/\|/g, ", ");

/* ── drawing helpers: called, never mounted (a component declared inside Work is rebuilt every frame) ── */

/* the frame, the column heads (lit amber, glowing, or chosen) and the point */
function pvFrame(C: any, tx: any, o: any = {}) {
  const lit = o.lit || [], glow = o.glow || [];
  return (
    <g pointerEvents="none">
      <rect x={28} y={2} width={1030} height={216} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
      {PV_COLS.map((c) => {
        const on = lit.includes(c.key), g = glow.includes(c.key), sel = o.sel === c.key;
        return (
          <g key={c.key}>
            <rect x={c.x + 6} y={PV_HEAD.y} width={PV_W - 12} height={PV_HEAD.h} rx={14}
              fill={on ? tint(CONTENT.ten, 0.55) : g ? tint(CONTENT.one, 0.7) : "#FFFFFF"}
              stroke={sel ? C.accent : on ? CONTENT.ten : g ? CONTENT.one : C.rule} strokeWidth={sel ? 6 : on || g ? 4 : 2} />
            <text x={c.x + PV_W / 2} y={PV_HEAD.y + 48} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(c.name)}</text>
            <rect x={c.x + 6} y={PV_CELL.y} width={PV_W - 12} height={PV_CELL.h} rx={14} fill="#FFFFFF"
              stroke={o.open ? C.accent : C.rule} strokeWidth={o.open ? 3 : 1.5} strokeDasharray="8 8" />
          </g>
        );
      })}
      <circle cx={PV_PT} cy={PV_CELL.y + PV_CELL.h - 22} r={12} fill={C.ink} />
    </g>
  );
}

/* a digit tile: deep blue for a digit of the given decimal, grey for a zero holding a place */
function pvTile(x: number, y: number, d: string, o: any = {}) {
  const w = 120, h = 108, zero = d === "0", base = zero ? PV_GREY : CONTENT.hundred;
  return (
    <g filter={o.lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
      <rect x={x} y={y} width={w} height={h} rx={16} fill={zero ? PV_GREY : "url(#gHundred)"}
        stroke={o.ring || shade(base, 0.25)} strokeWidth={o.ring ? 7 : 2} />
      <text x={x + w / 2} y={y + h / 2 + 25} textAnchor="middle" fontSize={T.display} fontWeight={700} fill="#FFFFFF">{d}</text>
    </g>
  );
}
const pvTileXY = (col: string) => ({ x: pvCol(col).x + 36, y: PV_CELL.y + 6 });

/* the tiles of a decimal standing in the chart (rings: column -> outline colour) */
function pvRow(s: string, rings: any = {}) {
  const g = pvDigits(s);
  return PV_COLS.filter((c) => g[c.key] !== undefined).map((c) => {
    const p = pvTileXY(c.key);
    return <g key={c.key}>{pvTile(p.x, p.y, g[c.key], { ring: rings[c.key] })}</g>;
  });
}

/* a row written under the chart, column by column (the correction's Answer row) */
function pvAnswerRow(C: any, tx: any, s: string, y: number, o: any = {}) {
  const g = pvDigits(s), upto = o.upto === undefined ? 9 : o.upto, ink = o.ink || PV_GREEN;
  const cols = PV_COLS.filter((c) => g[c.key] !== undefined);
  const wholeN = cols.filter((c) => c.dp === 0).length;
  return (
    <g pointerEvents="none">
      <text x={40} y={y} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(o.label || "Answer")}</text>
      {cols.map((c, k) => k < upto && (
        <g key={c.key}>
          <text x={c.x + PV_W / 2} y={y + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700}
            fill={g[c.key] === "0" ? PV_GREY : (o.inks && o.inks[c.key]) || ink}>{g[c.key]}</text>
          {g[c.key] === "0" && o.holder && (
            <text x={c.x + PV_W / 2} y={y + 98} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={PV_GREY}>{tx("Place holder")}</text>
          )}
        </g>
      ))}
      {s.includes(".") && upto > wholeN && <text x={PV_PT} y={y + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink}>.</text>}
    </g>
  );
}

/* the Which place card and the Worth card: a place is a name, a place value is an amount, three ways */
function pvCards(C: any, tx: any, y: number, h: number, d: string | null, col: string | null, o: any = {}) {
  const yc = y + (h + 40) / 2, c = col ? pvCol(col) : null, upto = o.upto || 0, whole = c && c.dp === 0;
  const q = <text textAnchor="middle" fontSize={T.xl} fontWeight={600} fill={mix(C.ink, "#FFFFFF", 0.3)}>?</text>;
  return (
    <g pointerEvents="none">
      <rect x={40} y={y} width={340} height={h} rx={RAD.panel} fill="#FFFFFF" stroke={o.placeLit ? CONTENT.ten : C.rule} strokeWidth={o.placeLit ? 4 : 2} />
      <text x={60} y={y + 40} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("Which place")}</text>
      {o.place && c ? (
        <g>
          <text x={210} y={yc + 4} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(c.key)}</text>
          <text x={210} y={yc + 44} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("place")}</text>
        </g>
      ) : <g transform={`translate(210,${yc + 20})`}>{q}</g>}
      <rect x={400} y={y} width={646} height={h} rx={RAD.panel} fill="#FFFFFF" stroke={o.worthLit ? CONTENT.ten : C.rule} strokeWidth={o.worthLit ? 4 : 2} />
      <text x={420} y={y + 40} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("Worth")}</text>
      {upto === 0 || !c || d === null ? <g transform={`translate(723,${yc + 20})`}>{q}</g> : (
        <g>
          <text x={520} y={yc + 6} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{d}</text>
          <text x={520} y={yc + 46} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(d === "1" ? c.one : c.key)}</text>
          {upto >= 2 && !whole && (
            <g>
              <text x={621} y={yc + 14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>=</text>
              <text x={722} y={yc - 6} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{d}</text>
              <rect x={672} y={yc + 6} width={100} height={4} rx={2} fill={C.ink} />
              <text x={722} y={yc + 44} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(1000 / c.unit)}</text>
            </g>
          )}
          {upto >= 3 && (
            <g>
              <text x={whole ? 621 : 823} y={yc + 14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>=</text>
              <text x={whole ? 722 : 930} y={yc + 22} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PV_GREEN}>{pvWorth(d, c.key)}</text>
            </g>
          )}
        </g>
      )}
    </g>
  );
}

/* the Two places panel: the greater worth over the smaller, points in one line, added zeros violet */
function pvPanel(C: any, tx: any, a: string, b: string, diff: string | null) {
  const dp = Math.max(pvDp(a), pvDp(b)), aw = pvRead(pvTh(a), dp), bw = pvRead(pvTh(b), dp), X = 640;
  const grid = (str: string, y: number, own: number, ink: string) => {
    const [w, f = ""] = str.split("."), out: any[] = [];
    w.split("").reverse().forEach((ch, k) => out.push(<text key={"w" + k} x={X - 36 - k * 44} y={y} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink}>{ch}</text>));
    if (str.includes(".")) out.push(<text key="pt" x={X} y={y} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={own === 0 ? PV_VIOLET : ink}>.</text>);
    f.split("").forEach((ch, k) => out.push(<text key={"f" + k} x={X + 36 + k * 44} y={y} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={k >= own ? PV_VIOLET : ink}>{ch}</text>));
    return out;
  };
  const added = pvDp(a) < dp || pvDp(b) < dp;
  return (
    <g pointerEvents="none">
      <rect x={300} y={302} width={500} height={224} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={320} y={342} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("Two places")}</text>
      {added && <text x={320} y={386} fontSize={T.micro} fontWeight={600} fill={PV_VIOLET}>{tx("Added zeros")}</text>}
      {grid(aw, 372, pvDp(a), C.ink)}
      <text x={X - 130} y={428} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>−</text>
      {grid(bw, 428, pvDp(b), C.ink)}
      <rect x={X - 156} y={446} width={300} height={4} rx={2} fill={C.ink} />
      {diff ? grid(diff, 506, 9, PV_GREEN) : <text x={X} y={506} textAnchor="middle" fontSize={T.xl} fontWeight={600} fill={mix(C.ink, "#FFFFFF", 0.3)}>?</text>}
    </g>
  );
}

const pvArrow = (up: boolean, c: string) => (
  <path d={up ? "M -18 9 L 0 -11 L 18 9" : "M -18 -9 L 0 11 L 18 -9"} fill="none" stroke={c} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
);

const pvFresh = (qk: string, it: any) => ({
  qk, cols: {}, picked: null, head: null, seen: false, shown: [], cells: ["", "", ""], open: null, cellFresh: false,
  V: pvTh(it.num || "0"), nudges: {}, moved: false, judged: null, given: null, demo: null, freeAt: null,
});

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const it: any = free ? { kind: "free", num: PV_FREE } : item || {};
  const qk = free ? "free" : n + ":" + index;
  const S = useRef<any>(null);
  const [, force] = useState(0);
  if (!S.current || S.current.qk !== qk) S.current = pvFresh(qk, it);
  const s = S.current;
  const put = (p: any) => { S.current = { ...S.current, ...p }; force((x: number) => x + 1); };
  const won = stage === "win" || stage === "idle";
  const live = (stage === "ask" || stage === "teach" || free) && !tl.busy;
  const step = s.demo ? s.demo.step : 0;
  const tiles = it.kind === "build" || it.kind === "digit" || it.kind === "head" ? pvList(it.num) : [];
  const dp0 = free ? 3 : pvDp(it.num || "");

  /* ── phase 1: tiles into columns ── */
  const colOf = (j: number) => Object.keys(S.current.cols).find((k) => S.current.cols[k] === j) || null;
  const allPlaced = tiles.length > 0 && tiles.every((t: any, j: number) => colOf(j) !== null);
  const placeTile = (j: number, c: string | null) => {
    const cols = { ...S.current.cols }, from = colOf(j);
    if (from) delete cols[from];
    if (c) {
      const occ = cols[c];
      if (occ !== undefined && occ !== j && from) cols[from] = occ;
      cols[c] = j;
    }
    api.sfx.tick();
    put({ cols, picked: null, moved: true });
  };
  const tapTile = (j: number) => {
    const p = S.current.picked;
    if (p === null) put({ picked: j, moved: true });
    else if (p === j) { if (colOf(j)) placeTile(j, null); else put({ picked: null }); }
    else { const c = colOf(j); if (c) placeTile(p, c); else put({ picked: j }); }
  };
  const colAt = (x: number, y: number) => {
    if (y < -30 || y > 300 || x < 20 || x > 1066) return null;
    let best: any = null;
    PV_COLS.forEach((c) => { const d = Math.abs(x - (c.x + PV_W / 2)); if (!best || d < best.d) best = { d, k: c.key }; });
    return best.k;
  };
  const drag = useDrag((pay: any, at: any, moved: boolean) => {
    if (!live || !pay || pay.j === undefined) return;
    if (!moved || !isFinite(at.x) || !isFinite(at.y)) tapTile(pay.j);
    else placeTile(pay.j, colAt(at.x, at.y));
  });
  const traySlot = (j: number) => {
    const m = tiles.length, x0 = 543 - (m * 120 + (m - 1) * 26) / 2;
    return { x: x0 + j * 146, y: 404 };
  };

  /* ── phase 3 "each": the pad lent to the box under a digit ── */
  const cellKey = (k: string) => {
    const S0 = S.current, o = S0.open;
    if (o === null || o === undefined) return;
    const cells = S0.cells.slice();
    let v = cells[o];
    if (k === "enter") {
      if (v === "") return;
      const nx = cells.findIndex((c: string) => c === "");
      if (nx >= 0) { put({ open: nx, cellFresh: true }); return; }
      api.capture(null); put({ open: null }); enter(); return;
    }
    if (k === "clear") v = "";
    else if (k === "back") v = v.slice(0, -1);
    else if (k === "point") v = S0.cellFresh ? "." : v.includes(".") || v.length >= 6 ? v : v + ".";
    else if (/^\d$/.test(k)) v = S0.cellFresh ? k : v.length >= 6 ? v : v + k;
    else return;
    cells[o] = v;
    put({ cells, cellFresh: false });
  };
  const openCell = (k: number) => { put({ open: k, cellFresh: true }); api.capture(cellKey); };

  /* ── phase 4 and free play: a nudge adds or takes one of a place ── */
  const nudge = (col: string, d: number) => {
    const V = S.current.V + d * pvCol(col).unit;
    if (V < 0 || V > 99999) return;
    api.sfx.tick();
    put({ V, moved: true, nudges: { ...S.current.nudges, [col]: (S.current.nudges[col] || 0) + d } });
  };

  /* Enter on a working-area answer: only work the child has changed since it was last judged */
  const enter = () => {
    const S0 = S.current;
    if (it.kind === "build") {
      if (!Object.keys(S0.cols).length) return;
      const sig = JSON.stringify(S0.cols);
      if (sig === S0.judged) return;
      const v = pvReadPlaced(S0.cols, tiles);
      put({ judged: sig, given: v, picked: null });
      api.submit(v);
    } else if (it.kind === "head") {
      if (!S0.head || S0.head === S0.judged) return;
      put({ judged: S0.head, given: S0.head });
      api.submit(S0.head);
    } else if (it.kind === "each") {
      const gap = S0.cells.findIndex((c: string) => c === "");
      if (gap >= 0) { if (S0.open === null) openCell(gap); return; }
      const sig = S0.cells.join("|");
      if (sig === S0.judged) return;
      api.capture(null);
      put({ judged: sig, given: sig, open: null });
      api.submit(sig);
    } else if (it.kind === "nudge") {
      if (!S0.moved) return;
      const v = pvRead(S0.V, dp0);
      if (v === S0.judged) return;
      put({ judged: v, given: v });
      api.submit(v);
    }
  };
  api.onEnter(!free && stage === "ask" && it.pad === "enter" ? () => { if (!tl.busy) enter(); } : null);

  /* the agent sets a working-area answer as a child would, and types a decimal with its point */
  HOOK.set = (v: any) => {
    if (it.kind === "build") {
      if (!judge(it, v)) return false;
      const cols: any = {};
      tiles.forEach((t: any, j: number) => { cols[t.col] = j; });
      put({ cols, picked: null, moved: true });
      return true;
    }
    if (it.kind === "head") { const k = String(v).toLowerCase(); if (!PV_COLS.some((c) => c.key === k)) return false; put({ head: k }); return true; }
    if (it.kind === "each") {
      const a = Array.isArray(v) ? v.map(String) : String(v).split("|");
      api.capture(null);
      put({ cells: [a[0] || "", a[1] || "", a[2] || ""], open: null });
      return true;
    }
    if (it.kind === "nudge") { put({ V: pvTh(String(v)), moved: true }); return true; }
    return false;
  };
  HOOK.type = (v: any) => { api.setTyped(String(v)); return true; };

  /* the traceback: lock, redraw the maths step by step to the whole right answer, unlock */
  const stepsOf = () => {
    if (it.kind === "build" || it.kind === "digit" || it.kind === "head") return tiles.length + 2;
    if (it.kind === "worth" || it.kind === "frac") return 4;
    if (it.kind === "diff") return 3;
    if (it.kind === "each") return 3;
    if (it.kind === "nudge") return Math.abs(it.by) + 2;
    return 1;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    put({ demo: { step: 0 }, picked: null });
    const seq: any[] = [];
    for (let k = 1; k <= stepsOf(); k++) seq.push([k === 1 ? 700 : 650, () => put({ demo: { step: k } })]);
    seq.push([300, () => {}]);
    tl.run(seq, () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState); the answer only once the child gave it */
  const reading = it.kind === "build" ? pvReadPlaced(s.cols, tiles) : it.kind === "nudge" || free ? pvRead(s.V, dp0) : it.num || "";
  api.share({
    decimal: reading, tiles: tiles.length ? Object.keys(s.cols).length : null, picked: s.picked !== null ? "tile-" + (s.picked + 1) : s.head,
    worths: it.kind === "diff" ? s.shown : it.kind === "each" ? s.cells.join("|") : null, nudges: s.nudges,
    answer: s.given !== null ? s.given : wrong ? wrong.value : won ? typed : null,
  });

  const inviteAt = (x: number, y: number, r = 70) => (live && !s.demo ? <Invite x={x} y={y} r={r} C={C} /> : null);

  /* ── phase 1 ── */
  const phase1 = () => {
    const ans = pvList(it.num);
    const firstOff = ans.find((a: any) => { const j = S.current.cols[a.col]; return j === undefined || tiles[j].d !== a.d; });
    /* the column a correction lights: where the child's chart first goes wrong (an empty chart: the zero's column) */
    const zeroCol = (ans.find((a: any) => a.d === "0") || { col: "tenths" }).col;
    const offCol = Object.keys(s.cols).length && firstOff ? firstOff.col : zeroCol;
    const lit = won ? (it.kind === "build" ? [] : [it.place || it.at]) : step >= 1 ? [it.kind === "build" ? offCol : it.place || it.at] : [];
    const glow = won && it.kind === "build" ? ["tenths", "hundredths", "thousandths"] : [];
    const dragging = drag.drag && drag.drag.moved && drag.drag.payload ? drag.drag.payload.j : null;
    const ghost = () => {
      const d = drag.drag;
      if (dragging === null || !tiles[dragging]) return null;
      return <g pointerEvents="none">{pvTile(Math.min(Math.max(d.x - 60, 0), 966), Math.min(Math.max(d.y - 54, 0), 420), tiles[dragging].d, { lift: true })}</g>;
    };
    const hot = it.kind === "head" ? it.at : it.place;
    return (
      <g>
        {!free && (
          <g data-zone="runs">
            <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
            <text x={22} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Tiles on chart")}</text>
            <text x={306} y={-36} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={C.ink}>{won ? tiles.length : Object.keys(s.cols).length}</text>
          </g>
        )}
        {pvFrame(C, tx, { lit, glow, sel: it.kind === "head" && !won ? s.head : null, open: live && s.picked !== null })}
        {it.kind === "head" && live && stage === "ask" && PV_COLS.map((c) => (
          <Hit key={"h" + c.key} id={"head-" + c.key} x={c.x + 6} y={PV_HEAD.y} w={PV_W - 12} h={PV_HEAD.h} label={c.name}
            onPress={() => put({ head: c.key })} />
        ))}
        {won ? pvRow(it.num, it.kind === "build" ? {} : { [hot]: CONTENT.ten }) : tiles.map((t: any, j: number) => {
          const c = colOf(j), p = c ? pvTileXY(c) : traySlot(j), picked = s.picked === j;
          const ctl = live ? {
            ...control("tile-" + (j + 1), "tile " + t.d), ...drag.bind({ j }),
            onKeyDown: (e: any) => { if (e.key === "Enter" && it.kind === "build" && allPlaced && S.current.picked === null) return; drag.keys({ j }).onKeyDown(e); },
          } : {};
          return (
            <g key={"t" + j} {...ctl}>
              {dragging === j
                ? <rect x={p.x} y={p.y} width={120} height={108} rx={16} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="8 8" />
                : pvTile(p.x, p.y, t.d, { ring: picked ? C.accent : undefined, lift: picked })}
            </g>
          );
        })}
        {live && s.picked !== null && PV_COLS.filter((c) => S.current.cols[c.key] === undefined).map((c) => (
          <Hit key={"c" + c.key} id={"col-" + c.key} x={c.x + 6} y={PV_CELL.y} w={PV_W - 12} h={PV_CELL.h} label={"put in " + c.name}
            onPress={() => placeTile(S.current.picked, c.key)} />
        ))}
        {!won && step >= 1 && pvAnswerRow(C, tx, it.num, 262, { upto: step - 1, holder: step >= tiles.length + 2, inks: it.kind === "build" ? {} : { [hot]: PV_AMBER } })}
        {!won && !s.moved && tiles.length > 0 && !colOf(0) && it.kind !== "head" && inviteAt(traySlot(0).x + 60, traySlot(0).y + 54, 60)}
        {!won && it.kind === "head" && !s.head && stage === "ask" && inviteAt(pvCx("ones"), PV_HEAD.y + 38, 64)}
        {ghost()}
      </g>
    );
  };

  /* ── phase 2 ── */
  const phase2 = () => {
    const g = pvDigits(it.num), d = g[it.at], p = pvTileXY(it.at);
    const place = won || s.seen || step >= 1;
    const upto = won ? 3 : step >= 4 ? 3 : step >= 3 ? 2 : step >= 2 ? 1 : 0;
    return (
      <g>
        {pvFrame(C, tx, { lit: place ? [it.at] : [] })}
        {pvRow(it.num, { [it.at]: CONTENT.ten })}
        {live && stage !== "free" && (
          <Hit id="digit" x={p.x - 30} y={PV_CELL.y} w={180} h={PV_CELL.h} label={"the " + d} onPress={() => { api.sfx.tick(); put({ seen: true }); }} />
        )}
        {pvCards(C, tx, 236, 284, d, it.at, { place, upto, worthLit: step >= 1 && step < 4 && !won })}
        {!won && !s.seen && inviteAt(p.x + 60, p.y + 54)}
      </g>
    );
  };

  /* ── phase 3 ── */
  const phase3 = () => {
    const g = pvDigits(it.num);
    if (it.kind === "each") {
      const rings: any = {};
      it.cells.forEach((c: string) => { rings[c] = CONTENT.ten; });
      return (
        <g>
          {pvFrame(C, tx, {})}
          {pvRow(it.num, rings)}
          {it.cells.map((c: string, k: number) => {
            const x = pvCx(c) - 80, open = s.open === k && captured && !won, v = won ? it.answer[k] : s.cells[k];
            return (
              <g key={c}>
                <rect x={x} y={222} width={160} height={72} rx={14} fill="#FFFFFF" stroke={open ? C.accent : C.rule} strokeWidth={open ? 4 : 2} pointerEvents="none" />
                <text x={x + 80} y={270} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={won ? PV_GREEN : C.ink} pointerEvents="none">{v}</text>
                {open && <rect className="c4-caret" x={x + 80 + v.length * 10 + 4} y={238} width={4} height={40} rx={2} fill={C.accent} pointerEvents="none" />}
                {live && stage === "ask" && (
                  <Hit id={"box-" + (k + 1)} x={x} y={222} w={160} h={72} label={"worth of the 4 in the " + c} enabled={!(captured && s.open === k)}
                    onPress={() => openCell(k)} />
                )}
              </g>
            );
          })}
          {!won && step >= 1 && (
            <g pointerEvents="none">
              <text x={40} y={340} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Answer")}</text>
              {it.cells.map((c: string, k: number) => k < step && (
                <text key={c} x={pvCx(c)} y={404} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PV_GREEN}>{it.answer[k]}</text>
              ))}
            </g>
          )}
          {!won && stage === "ask" && s.open === null && s.cells.every((c: string) => c === "") && inviteAt(pvCx(it.cells[0]), 258, 60)}
        </g>
      );
    }
    const [L, R] = it.twins, shown = (c: string) => won || step >= 1 || s.shown.includes(c);
    const both = won || step >= 2 || (s.shown.includes(L) && s.shown.includes(R));
    return (
      <g>
        {pvFrame(C, tx, {})}
        {pvRow(it.num, { [L]: CONTENT.ten, [R]: CONTENT.ten })}
        {it.twins.map((c: string) => (
          <g key={c}>
            {shown(c) && (
              <g pointerEvents="none">
                <rect x={pvCx(c) - 80} y={226} width={160} height={62} rx={14} fill="#FFFFFF" stroke={CONTENT.ten} strokeWidth={3} />
                <text x={pvCx(c)} y={269} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{pvWorth(g[c], c)}</text>
              </g>
            )}
            {live && stage !== "free" && !shown(c) && (
              <Hit id={"twin-" + c} x={pvCx(c) - 90} y={PV_CELL.y} w={180} h={PV_CELL.h} label={"the " + g[c] + " in the " + c}
                onPress={() => { api.sfx.tick(); put({ shown: [...S.current.shown, c] }); }} />
            )}
          </g>
        ))}
        {both && pvPanel(C, tx, pvWorth(g[L], L), pvWorth(g[R], R), won || step >= 3 ? String(it.answer) : null)}
        {!won && !s.demo && [L, R].filter((c) => !shown(c)).slice(0, 1).map((c) => <g key={c}>{inviteAt(pvCx(c), PV_CELL.y + 60)}</g>)}
      </g>
    );
  };

  /* ── phase 4 and free play: the nudge arrows ── */
  const arrows = (enabled: boolean) => PV_COLS.map((c) => (
    <g key={c.key}>
      <Key id={"up-" + c.key} label={"add 1 " + c.one} x={c.x + 12} y={222} w={80} h={72} C={C} disabled={!enabled} onClick={() => nudge(c.key, 1)}>{pvArrow(true, enabled ? C.ink : C.dim)}</Key>
      <Key id={"down-" + c.key} label={"take away 1 " + c.one} x={c.x + 100} y={222} w={80} h={72} C={C} disabled={!enabled} onClick={() => nudge(c.key, -1)}>{pvArrow(false, enabled ? C.ink : C.dim)}</Key>
    </g>
  ));
  const phase4 = () => {
    const unit = pvCol(it.col).unit, start = pvTh(it.num), sign = it.by < 0 ? -1 : 1, last = Math.abs(it.by) + 2;
    const rowAt = step >= 1 ? pvRead(start + sign * Math.min(step - 1, Math.abs(it.by)) * unit, dp0) : "";
    const shownNum = won ? String(it.answer) : pvRead(s.V, dp0);
    return (
      <g>
        {pvFrame(C, tx, { lit: !won && step >= 1 ? [it.col] : [], glow: won ? [it.col] : [] })}
        {pvRow(shownNum)}
        {arrows(live && stage !== "free")}
        {!won && PV_COLS.filter((c) => s.nudges[c.key]).map((c) => (
          <text key={c.key} x={pvCx(c.key)} y={340} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PV_AMBER} pointerEvents="none">
            {(s.nudges[c.key] > 0 ? "+" : "−") + Math.abs(s.nudges[c.key])}
          </text>
        ))}
        {won && pvAnswerRow(C, tx, String(it.answer), 392, {})}
        {!won && step >= 1 && pvAnswerRow(C, tx, rowAt, 392, step >= last ? {} : { ink: C.ink, inks: { [it.col]: PV_AMBER } })}
      </g>
    );
  };

  /* ── Free play: any decimal by the arrows, any digit tapped for its place and worth ── */
  const freeArea = () => {
    const shownNum = pvRead(s.V, 3), g = pvDigits(shownNum), at = s.freeAt && g[s.freeAt] !== undefined ? s.freeAt : null;
    return (
      <g>
        {pvFrame(C, tx, { lit: at ? [at] : [] })}
        {pvRow(shownNum, at ? { [at]: CONTENT.ten } : {})}
        {PV_COLS.filter((c) => g[c.key] !== undefined).map((c) => (
          <Hit key={c.key} id={"digit-" + c.key} x={c.x + 6} y={PV_CELL.y} w={PV_W - 12} h={PV_CELL.h} label={"the digit in the " + c.key}
            onPress={() => { api.sfx.tick(); put({ freeAt: c.key }); }} />
        ))}
        {arrows(true)}
        {pvCards(C, tx, 312, 212, at ? g[at] : null, at, { place: !!at, upto: at ? 3 : 0 })}
      </g>
    );
  };

  return (
    <g>
      {free ? freeArea() : n === 1 ? phase1() : n === 2 ? phase2() : n === 3 ? phase3() : phase4()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L || L.value === null || L.value === undefined) return null;
  const it: any = ((PHASES[(n || 1) - 1] || { items: [] }).items || [])[L.item] || {};
  const frac = it.parts ? slotPartsOf(L.value, 2) : null;
  const shown = it.kind === "head" ? tx(String(L.value)) : format(L.value);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {it.num && <text x={14} y={36} fontSize={T.micro} fontWeight={600} fill={C.ink}>{it.num}</text>}
      {frac ? (
        <g>
          <text x={w - 50} y={h / 2 - 4} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PV_GREEN}>{frac[0]}</text>
          <rect x={w - 86} y={h / 2 + 2} width={72} height={3} fill={PV_GREEN} />
          <text x={w - 50} y={h / 2 + 32} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PV_GREEN}>{frac[1]}</text>
        </g>
      ) : <text x={w - 14} y={h - 14} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={PV_GREEN}>{shown}</text>}
    </g>
  );
}

function PlaceValueChart(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, pointKey: true, fitHost: () => null }} />
  );
}

export default PlaceValueChart;
