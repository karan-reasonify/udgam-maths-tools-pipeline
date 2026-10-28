/* ═══ M1.S2.T4.C17.2D1 · time_converter · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide (it instructs; after a wrong act or answer the hint shows UNDER the
   pinned instruction and stays until the child acts again; r34). The lesson is action-driven: nothing moves
   on unless the child acts (a tap, a key, an answer); after a right answer the next question follows its
   short celebration by itself. The header's Hint key (r35) shows the hint on demand.
   THE NEW LOOK (the owner, 2026-10-16; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar (only the blinking key at the top
   right), four small clickable phase dots, a big ONE-sentence bubble, digits as written, every act performed on screen (api.act). The question
   lives ONLY in the bubble: each item's `say` is the whole question in one sentence.
   Three phases (the owner, 2026-10-28): 1 hours into minutes (the minute hand and twelve five-minute tiles), 2 days into hours (the day wheel
   and 24 hour tiles), 3 how long and when it ends (a bar laid on a day strip, across noon; the plan's phases 3 and 4 folded into one).
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "time_converter";
const MEDIA_ID = "M1.S2.T4.C17.2D1";
const TOOL_NAME = "Time Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A clock, a stopwatch and a day strip. Let us count the time."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You counted the time with the hour filling and the day turning.";
/* printed when the child opens Free play; its LAST piece stays on the bubble */
const FREE_LINE = "Free play: type hours or days, turn the dial and slide the bar.";

/* the clock family look (the owner, 2026-10-28): hour vermilion, minute deep blue, a.m. sky blue, p.m. amber, reached / answer / duration green */
const TC_HOUR = "#E5531A", TC_MIN = "#1F4E9C", TC_AM = "#5BB8E8", TC_PM = "#F2A531", TC_GO = "#2E9E5B";
/* the strip shows 6 a.m. to 6 p.m. (noon in the middle): 72 units an hour, a bar snaps to a quarter of an hour */
const TC_WS = 360, TC_WE = 1080, TC_PX = 1.2, TC_X0 = 18;
const tcSx = (m: number) => TC_X0 + (m - TC_WS) * TC_PX;
const tcMin = (x: number) => TC_WS + (x - TC_X0) / TC_PX;
const tcSnap = (m: number) => Math.round(m / 15) * 15;
const tcClamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
/* the strip's rows (working-area units, laid out for the 900-wide open room) */
const TC_B = { mini: 2, miniH: 36, endLab: 88, startLab: 126, lenY: 166, barY: 176, barH: 56, tY: 238, tH: 76, labY: 360, outY: 414, keyY: 440 };
/* the tile rows: hours (12 five-minute tiles a row) and days (24 hour tiles a row) */
const TC_G1 = { x0: 332, pitch: 42, w: 38, h: 56, y0: 56, py: 74, bx: 306 };
const TC_G2 = { x0: 74, pitch: 31, w: 28, h: 36, y0: 266, py: 44, bx: 40 };
const TC_CLK = { cx: 150, cy: 178, r: 130 };
const TC_WHL = { cx: 150, cy: 128, r: 86 };
const TC_MODE = { hours: "Hours", days: "Days", bar: "Bar" };

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c): the object the lesson is about, in a 1200 x 340 box */
const START_HOOK = "How long is an hour? How long is a day?";
function StartArt({ box, C, lang, tx }: any) {
  const row: any[] = [];
  for (let j = 0; j < 12; j++) row.push(<rect key={"a" + j} x={400 + j * 63} y={30} width={58} height={64} rx={8} fill={j < 6 ? TC_MIN : tint(C.panel, 0.55)} stroke={C.ink} strokeWidth={3} />);
  const strip: any[] = [];
  for (let j = 0; j < 24; j++) strip.push(<rect key={"b" + j} x={400 + j * 31.5} y={140} width={30} height={56} rx={3} fill={j < 12 ? TC_AM : TC_PM} stroke={C.ink} strokeWidth={2} />);
  return (
    <g>
      {tcClockFace({ cx: 170, cy: 170, r: 150, A: 180, C })}
      {row}
      {strip}
      <rect x={400 + 9 * 31.5} y={112} width={5 * 31.5} height={22} rx={6} fill={TC_GO} stroke={C.ink} strokeWidth={3} />
      <circle cx={1082} cy={270} r={42} fill="#E8C86A" stroke={C.ink} strokeWidth={4} />
      <circle cx={1082} cy={270} r={32} fill="#FFF9EC" stroke={C.ink} strokeWidth={3} />
      <Skin name="stopwatch" x={1040} y={220} w={84} h={100} />
      <rect x={1070} y={206} width={24} height={12} rx={3} fill={TC_HOUR} stroke={C.ink} strokeWidth={2} />
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line stays English, exactly as the checks read it; this table is keyed by that
   English, byte for byte, and is filled AFTER the English is final and reviewed (the language pass). Empty = English only. */
const TR: any = { hi: {}, gu: {} };

/* One entry per phase = one mount.
   items carry the numbers the picture draws: kind "hm" (H hours, M minutes), "days" (D days, d0 the first date), "dur" (s start, e end, in
   minutes after midnight, a quarter hour apart), "end" (s start, len length, answered on the bar: pad "enter", the answer is minutes
   after midnight). `win` is the one sentence said at a right answer. */
const PHASES = [
  {
    n: 1,
    concept: "Sixty minutes make an hour",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O5"],
    says: ["One round of the minute hand fills an hour. How many minutes are in it?"],
    /* a warm-up on a different journey (2 hours): the two steps turn the minute hand round once and once more */
    steps: [
      { say: "Turn the blue minute hand once all the way round the clock.", on: "hand", hint: "Drag the round handle, or tap it." },
      { say: "Turn it round once more, and watch the hour hand creep.", on: "hand", hint: "Turn the blue hand round again." },
    ],
    stepHold: 2400,
    ladder: ["The minute hand turns round once for every hour.", "Change each hour into minutes first, then add what is left over."],
    closing: "One hour is sixty minutes, so hours change into minutes by multiplying by sixty.",
    learned: "You learned: 1 hour is 60 minutes, so hours times 60 make minutes.",
    traceback: "The hour rows light one after another, each worth sixty, then the extra minutes; the working stops before the total.",
    items: [
      { qid: null, kind: "hm", H: 4, M: 0, say: "A train journey takes 4 hours, so how many minutes is that?", ask: "Minutes in all?", answer: 240,
        miss: "The hours must be changed into minutes, one round of the minute hand each.",
        ladder: ["One round fills twelve tiles, and that row ends at sixty minutes.", "Four rounds make four rows of sixty, so add the rows."],
        win: "Yes, 4 hours make 240 minutes.", winMs: 3800 },
      { qid: null, kind: "hm", H: 2, M: 30, say: "A school sports day lasts 2 hours 30 minutes: how many minutes in all?", ask: "Minutes in all?", answer: 150,
        miss: "Two hours are two rounds of sixty before the 30 minutes.",
        ladder: ["Each round of the minute hand is sixty minutes, so count both rounds.", "Put the minutes of the two rounds first, then add the 30 minutes after them."],
        win: "Yes, that is 150 minutes in all.", winMs: 3700 },
      { qid: null, kind: "hm", H: 1, M: 25, say: "How many minutes does a holiday bus ride of 1 hour 25 minutes take?", ask: "Minutes in all?", answer: 85,
        miss: "Do not put the 1 and the 25 together: change the hour into minutes.",
        ladder: ["A full round of the minute hand is sixty minutes, and the 25 comes after it.", "Count on from sixty, five minutes for each tile of the last row."],
        win: "Yes, 60 and 25 make 85 minutes.", winMs: 3800 },
    ],
  },
  {
    n: 2,
    concept: "Twenty-four hours make a day",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O5"],
    says: ["The wheel turns once for one day. How many hours is that? Now for each day."],
    steps: [
      { say: "Turn the day wheel once all the way round.", on: "wheel", hint: "Drag the round handle, or tap it." },
      { say: "Turn it round once more for a second day.", on: "wheel", hint: "Turn the wheel round again." },
    ],
    stepHold: 2400,
    ladder: ["One turn of the wheel fills one day of hour tiles.", "Count the turns, then add the hours of each day."],
    closing: "One day is 24 hours, so days times 24 make hours.",
    learned: "You learned: 1 day is 24 hours, so days times 24 make hours.",
    traceback: "The day rows light one after another, each worth twenty-four; the working stops before the total.",
    items: [
      { qid: null, kind: "days", D: 3, d0: 6, say: "A holiday lasts 3 days, so how many hours is that?", ask: "Hours in all?", answer: 72,
        miss: "Each day is one full turn of the wheel.",
        ladder: ["One turn fills a row of sky blue and amber hour tiles.", "Count the tiles in one row, then take that many three times over."],
        win: "Yes, 3 days make 72 hours.", winMs: 3000 },
      { qid: null, kind: "days", D: 4, d0: 15, say: "A school camp lasts 4 days: how many hours in all?", ask: "Hours in all?", answer: 96,
        miss: "A day is not sixty hours, so count the tiles in one row.",
        ladder: ["One row of tiles is twelve sky blue ones and twelve amber ones.", "Four days mean four equal rows, so put the rows together."],
        win: "Yes, 96 hours fit in 4 days.", winMs: 3000 },
      { qid: null, kind: "days", D: 5, d0: 3, say: "How many hours does a train tour of 5 days take?", ask: "Hours in all?", answer: 120,
        miss: "Look at the wheel and count the hours in one whole day.",
        ladder: ["The sky blue half and the amber half together make one day.", "A tour of 5 days is five of those days, one after another."],
        win: "Yes, a 5 day tour lasts 120 hours.", winMs: 3600 },
    ],
  },
  {
    n: 3,
    concept: "How long did it take?",
    conceptId: "M1.S2.T4.C19", objectiveIds: ["O6"],
    says: ["Lay the bar from the start to the end. Count to noon, then on from noon."],
    steps: [
      { say: "Drag the bar's round handle along the strip to the flag.", on: "bar", hint: "Pull the handle to the right." },
      { say: "Now tap Add to join the two pieces of the bar.", on: "add", hint: "Tap the Add key." },
    ],
    stepHold: 2400,
    ladder: ["The bar splits at noon, so count each piece and add them.", "For an end time, slide on by the hours first, then by the minutes."],
    closing: "Count to noon and from noon, then add; for an end time add hours first.",
    learned: "You learned: count to noon, then on from noon, and add.",
    traceback: "The bar's pieces light one after another and are counted (the minutes carry shows as steps); the working stops before the total or the end time.",
    items: [
      /* a journey across noon with a carry: 2 h 30 min before noon + 1 h 45 min after = 3 h 75 min = 4 h 15 min (near = the carry forgotten);
         the start is 9:30, not 9:15, so no number in the question lines equals the answer's 15 */
      { qid: null, kind: "dur", s: 570, e: 825, train: true, near: "3|75", parts: [{ label: "hours" }, { label: "minutes" }], answer: [4, 15],
        say: "A train leaves at 9:30 a.m., reaches at 1:45 p.m.: how long?", ask: "How long?",
        miss: "Count from the start to noon, then from noon to the end.",
        ladder: ["The bar splits at noon, so there are two pieces to add.", "Add the hours, then the minutes; 60 minutes make one more hour."],
        win: "Yes, 4 hours 15 minutes in all.", winMs: 3100 },
      /* near 675 = 10:45 a.m. (the minutes added, the hours lost) */
      { qid: null, kind: "end", s: 630, len: 165, near: 675, pad: "enter", answer: 795,
        say: "A bus runs 2 hours 45 minutes from 10:30 a.m.: when does it end?", ask: "When does it end?",
        miss: "Slide the bar on by the hours first, then by the minutes.",
        ladder: ["Move the end on two hours from 10:30 before you think of the minutes.", "After the two hours, add the minutes and see which side of noon you are on."],
        win: "Yes, the bus arrives at 1:15 p.m.", winMs: 2800 },
      /* near 3|0 = the three tiles the bar touches */
      { qid: null, kind: "dur", s: 855, e: 1005, near: "3|0", parts: [{ label: "hours" }, { label: "minutes" }], answer: [2, 30],
        say: "Art class starts at 2:15 p.m., ends at 4:45 p.m.: how long?", ask: "How long?",
        miss: "Both times are after noon, so count straight along the bar.",
        ladder: ["Count on one hour at a time from 2:15, and see what is left.", "Then count the minutes that are left, in quarters of an hour."],
        win: "Yes, the class lasts 2 hours 30 minutes.", winMs: 3300 },
    ],
  },
];

/* the warm-ups the guide steps work on: their results are none of the phase's answers */
const WARM: any = {
  1: { kind: "hm", H: 2, M: 0 },
  2: { kind: "days", D: 2, d0: 5 },
  3: { kind: "dur", s: 660, e: 840 },
};
const FREE_ITEM: any = { kind: "free", s: 600 };

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { window: [TC_WS, TC_WE], snapMinutes: 15, minutesInHour: 60, hoursInDay: 24, tilesInHour: 12, tilesInDay: 24, maxFreeRows: 4 };

/* ── time helpers ─────────────────────────────────────────────────────────────────────────── */
const tcClock = (m: number) => {
  const h = Math.floor(m / 60) % 24;
  return { h: h % 12 === 0 ? 12 : h % 12, h24: h, m: m % 60, w: m === 720 ? "noon" : m % 1440 === 0 ? "midnight" : h < 12 ? "a.m." : "p.m." };
};
const tcPad = (v: number) => String(v).padStart(2, "0");
const tcStr = (m: number) => { const c = tcClock(m); return c.w === "noon" || c.w === "midnight" ? "12 " + c.w : c.h + ":" + tcPad(c.m) + " " + c.w; };
const tcForms = (m: number) => { const c = tcClock(m); return [String(m), c.h + ":" + tcPad(c.m), tcStr(m), c.h24 + ":" + tcPad(c.m)]; };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "hm") return it.answer === it.H * 60 + it.M && it.M % 5 === 0;
  if (it.kind === "days") return it.answer === it.D * 24;
  if (it.kind === "dur") { const d = it.e - it.s; return it.answer[0] === (d - (d % 60)) / 60 && it.answer[1] === d % 60 && it.e % 15 === 0 && it.s % 15 === 0; }
  if (it.kind === "end") return it.answer === it.s + it.len && it.len % 60 !== 0;
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it: hours and minutes joined (or the hours left unconverted when there are
   no minutes), days times 60, and in phase 3 each item's own `near` (the carry forgotten, the hours lost, the tiles the bar touches) */
const nearMiss = (item: any) => (item.near !== undefined ? item.near
  : item.kind === "hm" ? (item.M ? Number("" + item.H + item.M) : item.H)
  : item.kind === "days" ? item.D * 60 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.kind === "end" ? tcForms(item.answer)
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area (the bar's end): set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: finish the act at once (fill the tiles, lay the bar); undefined = press Enter. In a guide-steps phase
   (stage "demo") it must return undefined, so HOOK.check is set only while a question is open */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing helpers (pure: called, never mounted) ───────────────────────────────────────── */
function tcPt(cx: number, cy: number, r: number, deg: number) {
  const a = deg * Math.PI / 180;
  return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
}
function tcWedge(cx: number, cy: number, r: number, a: number, w: number) {
  const p1 = tcPt(cx, cy, r, a), p2 = tcPt(cx, cy, r, a + w);
  return "M" + cx + "," + cy + " L" + p1.x.toFixed(2) + "," + p1.y.toFixed(2) + " A" + r + "," + r + " 0 " + (w > 180 ? 1 : 0) + " 1 " + p2.x.toFixed(2) + "," + p2.y.toFixed(2) + " Z";
}
/* the wall clock: A is the minute hand's turned angle in degrees (it may run past 360); the hour hand creeps A / 12 */
function tcClockFace({ cx, cy, r, A, C }: any) {
  const mA = A % 360, hA = (A / 12) % 360, out: any[] = [];
  out.push(<circle key="f" cx={cx} cy={cy} r={r} fill="#FFF9EC" stroke={C.ink} strokeWidth={5} />);
  for (let i = 0; i < 60; i++) {
    const big = i % 5 === 0, p1 = tcPt(cx, cy, r - 5, i * 6), p2 = tcPt(cx, cy, r - (big ? 20 : 11), i * 6);
    out.push(<line key={"t" + i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={C.ink} strokeWidth={big ? 4 : 2} />);
  }
  const hp = tcPt(cx, cy, r * 0.46, hA), ht = tcPt(cx, cy, -14, hA), mp = tcPt(cx, cy, r * 0.84, mA), mt = tcPt(cx, cy, -16, mA);
  out.push(<line key="hh" x1={ht.x} y1={ht.y} x2={hp.x} y2={hp.y} stroke={TC_HOUR} strokeWidth={11} strokeLinecap="round" />);
  out.push(<line key="mh" x1={mt.x} y1={mt.y} x2={mp.x} y2={mp.y} stroke={TC_MIN} strokeWidth={8} strokeLinecap="round" />);
  out.push(<circle key="cap" cx={cx} cy={cy} r={9} fill={C.ink} />);
  /* the numbers are drawn over the hands, with a cream halo, so a hand never hides one */
  for (let k = 1; k <= 12; k++) {
    const p = tcPt(cx, cy, r * 0.64, k * 30);
    out.push(<text key={"n" + k} x={p.x} y={p.y + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} stroke="#FFF9EC" strokeWidth={6} paintOrder="stroke">{k}</text>);
  }
  return <g>{out}</g>;
}
/* the tile rows: kind 1 = hours (five-minute tiles, a row an hour), kind 2 = days (hour tiles, a row a day). tiles = how many are filled,
   hiN = how many rows the correction has lit, ghost = tiles the correction fills in a demo-only way */
function tcRowsPic({ g, N, per, tiles, kind, hiN, ghost, C, tx }: any) {
  const rows = Math.ceil(N / per), out: any[] = [], tN = Math.max(tiles, ghost || 0);
  for (let k = 0; k < rows; k++) {
    const y = g.y0 + k * g.py, cnt = Math.min(per, N - k * per), partial = cnt < per, done = tN >= k * per + cnt;
    const cells: any[] = [];
    for (let j = 0; j < cnt; j++) {
      const on = k * per + j < tN, x = g.x0 + j * g.pitch;
      const base = kind === 1 ? TC_MIN : j < 12 ? TC_AM : TC_PM;
      cells.push(<rect key={"c" + j} x={x} y={y} width={g.w} height={g.h} rx={6} fill={on ? base : kind === 1 ? tint(C.panel, 0.55) : tint(base, 0.72)} stroke={C.ink} strokeWidth={on ? 3 : 2.4} />);
      if (kind === 1 && on) cells.push(<text key={"d" + j} x={x + g.w / 2} y={y + g.h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{(j + 1) * 5}</text>);
    }
    const bc = partial ? TC_PM : kind === 1 ? TC_HOUR : C.ink, by = y + g.h / 2;
    out.push(
      <g key={"row" + k}>
        {k < hiN && <rect x={g.x0 - 7} y={y - 7} width={cnt * g.pitch + 9} height={g.h + 14} rx={10} fill="none" stroke={partial ? TC_PM : TC_HOUR} strokeWidth={6} />}
        {cells}
        {done
          ? <g><circle cx={g.bx} cy={by} r={22} fill={bc} stroke={C.ink} strokeWidth={3} /><text x={g.bx} y={by + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={partial ? C.ink : "#FFFFFF"}>{partial ? "+" : k + 1}</text></g>
          : <circle cx={g.bx} cy={by} r={22} fill="none" stroke={C.ink} strokeWidth={2.4} strokeDasharray="5 6" />}
        {kind === 2 && done && <text x={g.x0 + per * g.pitch + 8} y={by + 14} fontSize={T.prompt} fontWeight={700} fill={C.ink}>24</text>}
      </g>
    );
  }
  return out;
}
/* a time, written the clock family's way: hour vermilion, minutes deep blue, a.m. sky blue, p.m. amber */
function tcTime({ x, y, size, m, anchor = "middle", tx, C, ink }: any) {
  const c = tcClock(m), noon = c.w === "noon" || c.w === "midnight";
  const wc = c.w === "a.m." ? shade(TC_AM, 0.5) : c.w === "p.m." ? shade(TC_PM, 0.5) : C.ink;
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={ink || C.ink} stroke={C.paper} strokeWidth={6} paintOrder="stroke">
      {noon
        ? [<tspan key="a" fill={shade(TC_HOUR, 0.25)}>12</tspan>, <tspan key="b" fill={wc}>{" " + tx(c.w)}</tspan>]
        : [<tspan key="a" fill={shade(TC_HOUR, 0.25)}>{c.h}</tspan>, <tspan key="b" fill={C.ink}>:</tspan>, <tspan key="c" fill={shade(TC_MIN, 0.1)}>{tcPad(c.m)}</tspan>, <tspan key="d" fill={wc}>{" " + tx(c.w)}</tspan>]}
    </text>
  );
}
/* a length of time: "2 h 30 min", the hours vermilion and the minutes deep blue */
function tcDurText({ x, y, size, mins, anchor = "middle", tx, C }: any) {
  const h = Math.floor(mins / 60), m = mins % 60, parts: any[] = [];
  if (h > 0) parts.push(<tspan key="h" fill={shade(TC_HOUR, 0.25)}>{h}</tspan>, <tspan key="hu" fill={C.ink}>{" " + tx("h")}</tspan>);
  if (m > 0 || h === 0) parts.push(<tspan key="m" dx={h > 0 ? 8 : 0} fill={shade(TC_MIN, 0.1)}>{m}</tspan>, <tspan key="mu" fill={C.ink}>{" " + tx("min")}</tspan>);
  return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} stroke={C.paper} strokeWidth={6} paintOrder="stroke">{parts}</text>;
}
/* how many steps the correction takes for an item (it lights the working and stops before the answer) */
function tcTraceLen(it: any) {
  if (!it) return 1;
  if (it.kind === "hm") return it.H + (it.M ? 1 : 0);
  if (it.kind === "days") return it.D;
  if (it.kind === "dur") return it.s < 720 && it.e > 720 ? 2 : Math.max(1, Math.floor((it.e - it.s) / 60));
  if (it.kind === "end") return Math.max(1, Math.floor(it.len / 60));
  return 1;
}
/* a length as "2 h 30 min" (units through tx) */
const tcDurStr = (mins: number, tx: any) => { const h = Math.floor(mins / 60), m = mins % 60; return (h > 0 ? h + " " + tx("h") : "") + (h > 0 && m > 0 ? " " : "") + (m > 0 || h === 0 ? m + " " + tx("min") : ""); };
/* the step-by-step working of a duration or end-time item, as short written lines (each at most four items: labels-short). In the correction
   (win false) it stops one step before the answer: across noon the hours are added and, when the minutes carry, the minutes are added (the carry
   is left for the child); on a straight bar or for an end time the whole hours are counted on. At the win the lines go on to the answer. */
function tcLines(it: any, tx: any, win: boolean) {
  const U = tx("h"), Mn = tx("min"), t = (m: number) => { const c = tcClock(m); return c.h + ":" + tcPad(c.m); };
  if (!it) return [];
  if (it.kind === "end") {
    const H = Math.floor(it.len / 60), M = it.len % 60, mid = it.s + H * 60, e = it.s + it.len, L = [t(it.s) + " + " + H + " " + U + " = " + t(mid)];
    if (win) L.push(t(mid) + " + " + M + " " + Mn + " = " + t(e));
    return L;
  }
  if (it.kind !== "dur") return [];
  const d = it.e - it.s;
  if (it.s < 720 && it.e > 720) {
    const p1 = 720 - it.s, p2 = it.e - 720, h1 = Math.floor(p1 / 60), h2 = Math.floor(p2 / 60), m1 = p1 % 60, m2 = p2 % 60, hs = h1 + h2, ms = m1 + m2;
    const L = [h1 + " + " + h2 + " = " + hs + " " + U];
    if (ms >= 60 || win) L.push(m1 + " + " + m2 + " = " + ms + " " + Mn);
    if (win) { if (ms >= 60) L.push(ms + " = 1 " + U + " " + (ms - 60)); L.push("= " + tcDurStr(d, tx)); }
    return L;
  }
  const H = Math.floor(d / 60), M = d % 60, mid = it.s + H * 60, L = [t(it.s) + " + " + H + " " + U + " = " + t(mid)];
  if (win) { if (M > 0) L.push(t(mid) + " + " + M + " " + Mn + " = " + t(it.e)); L.push("= " + tcDurStr(d, tx)); }
  return L;
}
const tcFresh = (qk: string, it: any) => ({ qk, tiles: 0, touched: false, trace: -1, end: it && it.s != null ? it.s : 0, added: false, mode: "hours", H: 2, D: 2, a: 600, b: 780, capt: false, countTapped: false });

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly (LAYOUT.md §1d): 64,108, 1472 x 520 shut and 900 x 520 open (bigPad); nothing under box.key. The picture is laid out in a fixed 900-wide room
   (so it never jumps when the keypad opens) and centred in the room there is (ox). Every act goes through api.act. */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && (stage === "teach" || stage === "demo");
  const win = !free && !warm && (stage === "win" || stage === "idle");
  const st = stage === "teach" ? 0 : step || 0;
  const it: any = free ? FREE_ITEM : warm ? WARM[n] || item : item;
  const qk = free ? "free" : n + "." + (warm ? "w" : index);
  const [raw, setRaw] = useState<any>(() => tcFresh(qk, it));
  const S: any = raw.qk === qk ? raw : tcFresh(qk, it);
  const qkRef = useRef(qk); qkRef.current = qk;
  const Sref = useRef(S); Sref.current = S;
  const endRef = useRef(S.end); endRef.current = S.end;
  const busy = useRef(false);
  const gl = useRef(false);
  const dgr = useRef<any>({ on: false });
  /* every write goes through put: a late act of an old question writes nothing */
  const put = (patch: any) => {
    if (qkRef.current !== qk) return;
    setRaw((prev: any) => { const b = prev.qk === qk ? prev : tcFresh(qk, it); return { ...b, ...(typeof patch === "function" ? patch(b) : patch) }; });
  };

  /* the room */
  const bw = box ? box.w : 900;
  const kx = box && box.key ? box.key.x - 12 : bw;
  const ox = Math.max(0, Math.min((bw - 900) / 2, kx - 906));
  const V = free ? S.mode : n === 1 ? "hours" : n === 2 ? "days" : "bar";
  const per = V === "hours" ? 12 : 24, sd = 360 / per;
  const dial = V === "hours" ? TC_CLK : TC_WHL, kr = V === "hours" ? dial.r * 0.84 : dial.r * 0.78;
  const N = V === "hours" ? (free ? S.H * 12 : it.H * 12 + (it.M || 0) / 5) : V === "days" ? (free ? S.D * 24 : it.D * 24) : 0;
  const capN = warm ? Math.min(N, (st + 1) * per) : N;
  const actName = V === "hours" ? "hand" : "wheel";
  const BAR_Y = TC_B.barY + TC_B.barH / 2;

  /* the drag (the minute hand, the wheel's handle, the bar's ends); a tap, Enter or Space arrives with NaN and does the act for the child */
  const dd = useDrag((payload: any, at: any, moved: boolean) => {
    if (qkRef.current !== qk) return;
    const ok = !!moved && isFinite(at.x) && isFinite(at.y);
    if (payload.id === "hand" || payload.id === "wheel") {
      const q = dgr.current;
      if (ok && q && q.on) {
        const A = q.base * sd + q.acc;
        const fin = Math.max(Sref.current.tiles, Math.min(capN, Math.floor((A + 4) / sd)));
        dgr.current = { on: false };
        if (fin > Sref.current.tiles) { put({ tiles: fin, touched: true }); api.sfx.settle(); reportTurn(fin); }
        return;
      }
      dgr.current = { on: false };
      turnAuto();
    } else if (ok) setBarTo(payload.id, tcSnap(tcMin(at.x - ox)));
    else barTap(payload.id);
  });
  const dg = dd.drag;

  /* the dial's live turn: the cumulative angle of the pointer round the centre, forward only */
  let liveTiles = S.tiles, liveA = S.tiles * sd;
  if (V !== "bar" && dg && dg.payload && dg.payload.id === actName) {
    const th = Math.atan2(dg.x - ox - dial.cx, -(dg.y - dial.cy)) * 180 / Math.PI;
    if (!dgr.current.on) dgr.current = { on: true, last: th, acc: 0, base: S.tiles, k: "" };
    else {
      const q = dgr.current, kk = dg.x + "," + dg.y;
      if (q.k !== kk) { let d = th - q.last; d = ((((d + 540) % 360) + 360) % 360) - 180; q.acc += d; q.last = th; q.k = kk; }
    }
    const A = dgr.current.base * sd + dgr.current.acc;
    liveTiles = Math.max(S.tiles, Math.min(capN, Math.floor((A + 4) / sd)));
    liveA = Math.max(S.tiles * sd, Math.min(capN * sd, A));
  } else if (dgr.current.on) dgr.current = { on: false };
  /* the bar's live ends */
  let barA = free ? S.a : it.s, barB = free ? S.b : S.end;
  if (V === "bar" && dg && dg.payload) {
    const mv = tcSnap(tcMin(dg.x - ox));
    if (dg.payload.id === "bar") barB = tcClamp(mv, free ? S.a : it.s, TC_WE);
    else if (dg.payload.id === "bar-start") barA = tcClamp(mv, TC_WS, S.b);
  }
  /* at the win the picture holds the right answer whatever the agent did on the way */
  if (win && V === "bar") { if (it.kind === "dur") barB = it.e; else if (it.kind === "end") barB = it.s + it.len; }
  const shownTiles = win ? N : liveTiles;

  /* ── the acts ── */
  const reportTurn = (t: number) => { if (warm && stepOn === actName && t >= (st + 1) * per) api.did(actName); };
  /* a tap on the hand or the wheel's handle turns it for the child, round to the end of the next row */
  const turnAuto = async () => {
    if (busy.current) return;
    const base = Sref.current.tiles, target = Math.min(capN, (Math.floor(base / per) + 1) * per);
    if (target <= base) { reportTurn(base); return; }
    busy.current = true; put({ touched: true });
    const pts: any[] = [];
    for (let t = base + 1; t <= target; t++) { const p = tcPt(dial.cx + ox, dial.cy, kr, t * sd); pts.push(p); }
    const p0 = tcPt(dial.cx + ox, dial.cy, kr, base * sd);
    const ok = await api.act({ tool: "hand", moves: "sweep", from: p0, at: pts, ms: 900, onPoint: (i: number) => put((p: any) => ({ tiles: Math.max(p.tiles, base + i + 1) })) });
    busy.current = false;
    if (!ok || qkRef.current !== qk) return;
    put({ tiles: target }); api.sfx.settle(); reportTurn(target);
  };
  /* the bar: set an end to a minute (a drag's drop, an arrow key); the minute may come from the agent and is then not snapped */
  const setBarTo = (id: string, mv: number) => {
    const s0 = Sref.current;
    api.sfx.tick();
    if (free) { if (id === "bar-start") put({ a: tcClamp(mv, TC_WS, s0.b), touched: true }); else put({ b: tcClamp(mv, s0.a, TC_WE), touched: true }); return; }
    const v = tcClamp(mv, it.s, TC_WE);
    put({ end: v, touched: true });
    if (it.kind === "dur" && v === it.e) { api.sfx.settle(); if (warm && stepOn === "bar") api.did("bar"); }
  };
  const barTap = (id: string) => {
    if (free) { const s0 = Sref.current; setBarTo(id, id === "bar-start" ? Math.min(s0.b, s0.a + 60) : Math.min(TC_WE, s0.b + 60)); return; }
    if (it.kind === "dur") layAuto();
    else setBarTo("bar", Math.min(TC_WE, Sref.current.end + 60));
  };
  const nudge = (id: string, d: number) => {
    const s0 = Sref.current;
    setBarTo(id, (free ? (id === "bar-start" ? s0.a : s0.b) : s0.end) + d);
  };
  /* a tap on the end handle of a duration question lays the bar from the start to the flag for the child */
  const layAuto = async () => {
    if (busy.current) return;
    const cur = Sref.current.end, tgt = it.e;
    if (cur === tgt) { if (warm && stepOn === "bar") api.did("bar"); return; }
    busy.current = true; put({ touched: true });
    const dir = tgt > cur ? 1 : -1, pts: any[] = [], ms: number[] = [];
    for (let m = cur + 15 * dir; dir > 0 ? m <= tgt : m >= tgt; m += 15 * dir) { pts.push({ x: ox + tcSx(m), y: BAR_Y }); ms.push(m); }
    const ok = await api.act({ tool: "hand", moves: "push", from: { x: ox + tcSx(cur), y: BAR_Y }, at: pts, ms: 900, onPoint: (i: number) => put({ end: ms[i] }) });
    busy.current = false;
    if (!ok || qkRef.current !== qk) return;
    put({ end: tgt }); api.sfx.settle(); if (warm && stepOn === "bar") api.did("bar");
  };
  /* the warm-up's second step: the hand joins the two pieces at the noon notch */
  const addAct = async () => {
    if (busy.current || Sref.current.added) return;
    busy.current = true;
    const ok = await api.act({ tool: "hand", moves: "tap", at: [{ x: ox + tcSx(720), y: BAR_Y }], ms: 800 });
    busy.current = false;
    if (!ok || qkRef.current !== qk) return;
    put({ added: true }); api.sfx.trade(); api.did("add");
  };
  const act = (on: any) => { if (on === "hand" || on === "wheel") turnAuto(); else if (on === "bar") layAuto(); else if (on === "add") addAct(); };
  const pressKey = useRef(0);
  const guarded = (fn: () => void) => () => { const t = Date.now(); if (t - pressKey.current < 400) return; pressKey.current = t; fn(); };

  /* Enter: a guide step's act; at an end-time question it sends the bar's end (it is ready once the end has moved off the start) */
  api.onEnter(warm && stepOn ? () => act(stepOn)
    : !free && !warm && stage === "ask" && it.kind === "end" ? () => { if (endRef.current !== it.s) api.submit(endRef.current); } : null);
  useEffect(() => { if (!free && !warm && stage === "ask" && it.kind === "end") api.answerReady(S.end !== it.s); }, [S.end, stage, qk]);

  /* the agent: finish the act at once; set the bar's end as given */
  const needAct = !free && !warm && stage === "ask" && (it.kind === "hm" || it.kind === "days" ? S.tiles < N : it.kind === "dur" ? S.end !== it.e : false);
  HOOK.check = needAct ? () => { if (it.kind === "dur") put({ end: it.e, touched: true }); else put({ tiles: N, touched: true }); return undefined; } : null;
  HOOK.set = !free && !warm && stage === "ask" && it.kind === "end"
    ? (v: any) => { const m = Number(v); if (!isFinite(m)) return false; endRef.current = m; put({ end: m, touched: true }); return true; } : null;
  /* the answer is gated by the act (PATTERNS 19): locked only in user mode once the child has really touched the board and the act is not done */
  useEffect(() => {
    const want = !!(needAct && S.touched);
    if (want !== gl.current) { gl.current = want; api.lock(want); }
  }, [needAct, S.touched, stage, qk]);
  useEffect(() => () => { tl.stop(); if (gl.current) { gl.current = false; api.lock(false); } }, [qk]);

  /* the traceback: replay the working in steps, lit on the tiles or the strip, and stop one step before the answer */
  const trLen = tcTraceLen(free ? null : it);
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    put({ trace: 0 });
    const seq: any[] = [];
    for (let j = 1; j <= trLen; j++) seq.push([j === trLen ? 900 : 750, () => put({ trace: j })]);
    tl.run(seq, () => api.lock(false));
  }, [wrong]);
  /* the correction stays until the child's next act or digit */
  useEffect(() => { if (typed && S.trace >= 0) put({ trace: -1 }); }, [typed]);
  const trOn = !free && !warm && stage === "ask" && S.trace >= 0;
  const trN = trOn ? S.trace : 0;

  /* the win line, one sentence, said once a right answer lands */
  useEffect(() => { if (stage === "win" && !free && item && item.win) api.say(item.win); }, [stage]);
  /* free play: a tap on the count lends the pad to it, and a digit typed there (1 to 4) sets the hours or the days */
  const openCount = () => {
    api.capture((k: any) => {
      if (k === "enter" || k === "clear") { api.capture(null); put({ capt: false }); return; }
      const d = parseInt(String(k), 10);
      if (d >= 1 && d <= 4) put((p: any) => (p.mode === "days" ? { D: d, tiles: 0 } : { H: d, tiles: 0 }));
    });
    put({ capt: true, countTapped: true });
  };
  useEffect(() => { if (liveTiles > S.tiles) api.sfx.tick(); }, [liveTiles]);

  /* what the host and the agent read back (toolApi.getState) */
  api.share({
    complete: stage === "idle",
    hours: V === "hours" ? Math.floor(liveTiles / 12) : null, minutes: V === "hours" ? (liveTiles % 12) * 5 : null, days: V === "days" ? Math.floor(liveTiles / 24) : null,
    start: V === "bar" ? barA : null, end: V === "bar" ? barB : null,
  });

  /* the one invite: on the control a step waits for, else on the main piece of an untouched question */
  const inviteOn = warm ? stepOn : !free && stage === "ask" && !S.touched && !trOn && needAct ? "main" : null;
  const touch = { onPointerDownCapture: () => { if (!S.touched || S.trace >= 0) put({ touched: true, trace: -1 }); } };

  /* ── hours: the wall clock, a stopwatch and rows of five-minute tiles ── */
  const drawHours = () => {
    const g = TC_G1, kp = tcPt(dial.cx, dial.cy, kr, liveA), rowsDone = Math.floor(shownTiles / 12);
    const popped = shownTiles > 0 && shownTiles % 12 === 0;
    const expr = it.kind === "hm" ? it.H + " × 60" + (it.M ? " + " + it.M : "") : "";
    const rowsN = Math.ceil(N / 12);
    return (
      <g>
        {tcClockFace({ cx: dial.cx, cy: dial.cy, r: dial.r, A: liveA, C })}
        <circle cx={150} cy={404} r={38} fill="#E8C86A" stroke={C.ink} strokeWidth={4} />
        <circle cx={150} cy={404} r={29} fill="#FFF9EC" stroke={C.ink} strokeWidth={3} />
        <Skin name="stopwatch" x={108} y={350} w={84} h={100} />
        <rect x={138} y={popped ? 330 : 342} width={24} height={12} rx={3} fill={TC_HOUR} stroke={C.ink} strokeWidth={2} />
        {tcRowsPic({ g, N, per: 12, tiles: shownTiles, kind: 1, hiN: trN, ghost: trOn ? Math.min(N, trN * 12) : 0, C, tx })}
        {warm && rowsDone > 0 && <text x={590} y={428} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{rowsDone + " × 60 = " + rowsDone * 60}</text>}
        {free && shownTiles > 0 && <text x={590} y={428} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{shownTiles * 5 + " " + tx("minutes")}</text>}
        {trOn && trN >= rowsN && <text x={590} y={428} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{expr}</text>}
        {win && <g data-reveals="answer"><text x={590} y={428} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(TC_GO, 0.3)}>{expr + " = " + item.answer}</text></g>}
        <g {...control("hand", "Minute hand")} {...dd.bind({ id: "hand" })} {...dd.keys({ id: "hand" })} {...touch} style={{ cursor: "grab" }}>
          <circle cx={kp.x} cy={kp.y} r={14} fill={TC_MIN} stroke="#FFFFFF" strokeWidth={4} />
          <rect x={kp.x - 36} y={kp.y - 36} width={72} height={72} rx={18} fill="transparent" />
        </g>
        {inviteOn && <Invite x={kp.x} y={kp.y} r={52} C={C} />}
      </g>
    );
  };

  /* ── days: the day wheel (a.m. half sky blue, p.m. half amber), a calendar page and rows of hour tiles ── */
  const drawDays = () => {
    const g = TC_G2, { cx, cy, r } = dial, kp = tcPt(cx, cy, kr, liveA), cur = shownTiles > 0 && shownTiles % 24 === 0 ? 24 : shownTiles % 24;
    const wedges: any[] = [];
    for (let i = 0; i < 24; i++) {
      const base = i < 12 ? TC_AM : TC_PM, on = i < cur;
      wedges.push(<path key={"w" + i} d={tcWedge(cx, cy, r, i * 15, 15)} fill={on ? base : tint(base, 0.72)} stroke={C.ink} strokeWidth={2} />);
    }
    const D = free ? S.D : it.D, d0 = free ? 10 : it.d0 || 10, cw = 56, tot = D * (cw + 6) - 6, cx0 = 300 + (340 - tot) / 2;
    const cells: any[] = [];
    for (let i = 0; i < D; i++) {
      cells.push(<rect key={"k" + i} x={cx0 + i * (cw + 6)} y={104} width={cw} height={cw} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.4} />);
      cells.push(<text key={"t" + i} x={cx0 + i * (cw + 6) + cw / 2} y={104 + cw / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{d0 + i}</text>);
    }
    const expr = !free ? it.D + " × 24" : "";
    const top = tcPt(cx, cy, r, 0), bot = tcPt(cx, cy, r, 180);
    return (
      <g>
        {wedges}
        <polygon points={`${top.x - 9},${top.y - 12} ${top.x + 9},${top.y - 12} ${top.x},${top.y + 6}`} fill={C.ink} />
        <polygon points={`${bot.x - 9},${bot.y + 12} ${bot.x + 9},${bot.y + 12} ${bot.x},${bot.y - 6}`} fill={C.ink} />
        <text x={cx} y={cy - r - 18} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("midnight")}</text>
        <text x={cx} y={cy + r + 38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("noon")}</text>
        <line x1={cx} y1={cy} x2={kp.x} y2={kp.y} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={9} fill={C.ink} />
        <rect x={300} y={34} width={340} height={150} rx={16} fill="#FFFDF7" stroke={C.ink} strokeWidth={3} />
        <rect x={300} y={34} width={340} height={46} rx={16} fill={tint(C.rule, 0.2)} stroke={C.ink} strokeWidth={3} />
        <text x={470} y={69} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Days")}</text>
        {cells}
        <rect x={680} y={70} width={170} height={110} rx={14} fill="#B98A52" stroke={C.ink} strokeWidth={3} />
        <Skin name="suitcase" x={672} y={56} w={186} h={122} />
        {tcRowsPic({ g, N, per: 24, tiles: shownTiles, kind: 2, hiN: trN, ghost: trOn ? Math.min(N, trN * 24) : 0, C, tx })}
        {free && shownTiles > 0 && <text x={640} y={238} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{shownTiles + " " + tx("hours")}</text>}
        {warm && shownTiles >= 24 && <text x={640} y={238} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{Math.floor(shownTiles / 24) + " × 24 = " + Math.floor(shownTiles / 24) * 24}</text>}
        {trOn && trN >= it.D && <text x={640} y={238} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{expr}</text>}
        {win && <g data-reveals="answer"><text x={640} y={238} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={shade(TC_GO, 0.3)}>{expr + " = " + item.answer}</text></g>}
        <g {...control("wheel", "Day wheel handle")} {...dd.bind({ id: "wheel" })} {...dd.keys({ id: "wheel" })} {...touch} style={{ cursor: "grab" }}>
          <circle cx={kp.x} cy={kp.y} r={17} fill={TC_GO} stroke={C.ink} strokeWidth={4} />
          <rect x={kp.x - 36} y={kp.y - 36} width={72} height={72} rx={18} fill="transparent" />
        </g>
        {inviteOn && <Invite x={kp.x} y={kp.y} r={44} C={C} />}
      </g>
    );
  };

  /* ── the bar on the day strip (6 a.m. to 6 p.m., noon in the middle), with the whole day above it ── */
  const drawBar = () => {
    const B = TC_B, hasFlagE = !free && it.kind === "dur", isEnd = !free && it.kind === "end";
    /* the two piece lengths are written only in the warm-up and in free play: in a question counting to noon and from noon is the child's work
       (the correction writes them after a miss) */
    const crossing = barA < 720 && barB > 720, showLen = crossing && (free || warm);
    const xa = tcSx(barA), xb = tcSx(barB), xn = tcSx(720), done = hasFlagE && barB === it.e;
    const total = barB - barA, cl = (x: number) => tcClamp(x, 100, 800);
    const showTotal = (warm && S.added) || (free && total > 0);
    const straight = !free && !warm && (isEnd || (it.kind === "dur" && !(it.s < 720 && it.e > 720)));
    const out: any[] = [];
    /* the whole day, small, with the window and the bar on it */
    for (let i = 0; i < 24; i++) out.push(<rect key={"m" + i} x={TC_X0 + i * 36} y={B.mini} width={36} height={B.miniH} fill={tint(i < 12 ? TC_AM : TC_PM, 0.35)} stroke={C.ink} strokeWidth={1.5} />);
    out.push(<text key="ma" x={126} y={B.mini + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(TC_AM, 0.5)}>{tx("a.m.")}</text>);
    out.push(<text key="mp" x={774} y={B.mini + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(TC_PM, 0.5)}>{tx("p.m.")}</text>);
    out.push(<path key="mw" d={`M${TC_X0 + 216},${B.mini + B.miniH + 4} v8 h432 v-8`} fill="none" stroke={C.ink} strokeWidth={3} />);
    if (barB > barA) out.push(<rect key="mb" x={TC_X0 + barA * 0.6} y={B.mini + 4} width={(barB - barA) * 0.6} height={B.miniH - 8} fill={TC_GO} stroke={C.ink} strokeWidth={1.5} />);
    /* the day strip */
    for (let i = 0; i < 12; i++) {
      const x = tcSx((6 + i) * 60), base = i < 6 ? TC_AM : TC_PM;
      out.push(<rect key={"s" + i} x={x} y={B.tY} width={72} height={B.tH} fill={tint(base, 0.4)} stroke={C.ink} strokeWidth={2.4} />);
      for (let q = 1; q < 4; q++) out.push(<line key={"q" + i + "_" + q} x1={x + q * 18} y1={B.tY + B.tH - (q === 2 ? 20 : 12)} x2={x + q * 18} y2={B.tY + B.tH} stroke={C.ink} strokeWidth={2} />);
    }
    out.push(<text key="sa" x={tcSx(540)} y={B.tY + B.tH / 2 + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(TC_AM, 0.5)}>{tx("a.m.")}</text>);
    out.push(<text key="sp" x={tcSx(900)} y={B.tY + B.tH / 2 + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(TC_PM, 0.5)}>{tx("p.m.")}</text>);
    out.push(<line key="nl" x1={xn} y1={B.tY - 4} x2={xn} y2={B.tY + B.tH + 4} stroke={C.ink} strokeWidth={5} />);
    out.push(<polygon key="nn" points={`${xn - 11},${B.tY + B.tH + 18} ${xn + 11},${B.tY + B.tH + 18} ${xn},${B.tY + B.tH + 4}`} fill={C.ink} />);
    for (let h = 6; h <= 18; h++) out.push(<text key={"l" + h} x={tcSx(h * 60)} y={B.labY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{h === 12 ? tx("noon") : h > 12 ? h - 12 : h}</text>);
    /* the train of the train story (one small picture along the top of the timeline; the plain shape is its fallback) */
    if (!free && !warm && it.train) {
      out.push(<g key="train">
        <rect x={0} y={56} width={300} height={31} rx={7} fill="#6B7A86" stroke={C.ink} strokeWidth={2} />
        {[0, 1, 2, 3, 4, 5].map((k: number) => <rect key={k} x={14 + k * 47} y={62} width={30} height={14} rx={3} fill="#E9F1F6" stroke={C.ink} strokeWidth={1.5} />)}
        <Skin name="train" x={0} y={56} w={300} h={31.25} />
      </g>);
    }
    /* the flags: the start, and the given end of a duration question */
    out.push(<line key="fs" x1={xa} y1={B.startLab + 10} x2={xa} y2={B.tY} stroke={C.ink} strokeWidth={3} />);
    out.push(<g key="fst">{tcTime({ x: cl(xa), y: B.startLab, size: 36, m: barA, tx, C })}</g>);
    if (hasFlagE) {
      const xe = tcSx(it.e);
      out.push(<line key="fe" x1={xe} y1={B.endLab + 10} x2={xe} y2={B.tY} stroke={C.ink} strokeWidth={3} />);
      out.push(<g key="fet">{tcTime({ x: cl(xe), y: B.endLab, size: 36, m: it.e, tx, C })}</g>);
    } else if (barB > barA) {
      out.push(<line key="fe" x1={xb} y1={B.endLab + 10} x2={xb} y2={B.tY} stroke={shade(TC_GO, 0.3)} strokeWidth={3} />);
      out.push(<g key="fet">{tcTime({ x: cl(xb), y: B.endLab, size: 40, m: barB, tx, C, ink: shade(TC_GO, 0.3) })}</g>);
    }
    /* the bar, in one piece or two at noon, with each piece's length written above when it crosses */
    const pieces = crossing ? [[barA, 720], [720, barB]] : [[barA, barB]];
    pieces.forEach((p: any, j: number) => {
      if (p[1] <= p[0]) return;
      const x1 = tcSx(p[0]) + (crossing && j === 1 ? 3 : 0), x2 = tcSx(p[1]) - (crossing && j === 0 ? 3 : 0);
      out.push(<rect key={"b" + j} x={x1} y={B.barY} width={Math.max(2, x2 - x1)} height={B.barH} rx={8} fill={TC_GO} stroke={C.ink} strokeWidth={3} />);
      if (showLen) out.push(<g key={"bl" + j}>{tcDurText({ x: j === 0 ? xn - 26 : xn + 26, y: B.lenY, size: 34, mins: p[1] - p[0], anchor: j === 0 ? "end" : "start", tx, C })}</g>);
    });
    if (showLen) out.push(<text key="plus" x={xn} y={B.lenY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} stroke={C.paper} strokeWidth={6} paintOrder="stroke">+</text>);
    /* the correction lays its own ghost of the working (the child's bar is never moved), lights it one step after another and stops one step
       before the answer: across noon the two pieces are lit and measured; on a straight bar, or for an end time, the whole hours are counted */
    const ghostCross = trOn && it.kind === "dur" && it.s < 720 && it.e > 720;
    if (ghostCross) {
      [[it.s, 720], [720, it.e]].forEach((p: any, j: number) => {
        if (j >= trN) return;
        const x1 = tcSx(p[0]) + (j === 1 ? 3 : 0), x2 = tcSx(p[1]) - (j === 0 ? 3 : 0);
        out.push(<rect key={"gh" + j} x={x1} y={B.barY} width={x2 - x1} height={B.barH} rx={8} fill={TC_GO} fillOpacity={0.55} stroke={C.ink} strokeWidth={3} />);
        out.push(<rect key={"bh" + j} x={x1 - 5} y={B.barY - 5} width={x2 - x1 + 10} height={B.barH + 10} rx={12} fill="none" stroke={TC_PM} strokeWidth={6} />);
        out.push(<g key={"gl" + j}>{tcDurText({ x: j === 0 ? xn - 26 : xn + 26, y: B.lenY, size: 34, mins: p[1] - p[0], anchor: j === 0 ? "end" : "start", tx, C })}</g>);
      });
    } else if ((trOn || win) && straight) {
      /* the hours counted on from the start, block by block (and at the win the minutes block after them) */
      const e2 = isEnd ? it.s + it.len : it.e, nb = win ? tcTraceLen(it) : Math.min(trN, tcTraceLen(it)), rest = (e2 - it.s) % 60;
      for (let j = 0; j < nb; j++) {
        const x1 = tcSx(it.s + j * 60), x2 = tcSx(it.s + (j + 1) * 60);
        out.push(<rect key={"th" + j} x={x1} y={B.barY - 5} width={x2 - x1} height={B.barH + 10} rx={10} fill={TC_GO} fillOpacity={0.4} stroke={TC_PM} strokeWidth={6} />);
        out.push(<text key={"tn" + j} x={(x1 + x2) / 2} y={B.lenY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} stroke={C.paper} strokeWidth={6} paintOrder="stroke">{j + 1}</text>);
      }
      if (win && rest > 0) {
        const x1 = tcSx(it.s + tcTraceLen(it) * 60), x2 = tcSx(e2);
        out.push(<rect key="tm" data-reveals="answer" x={x1} y={B.barY - 5} width={x2 - x1} height={B.barH + 10} rx={10} fill={TC_GO} fillOpacity={0.4} stroke={TC_MIN} strokeWidth={6} />);
      }
    }
    /* the working as written lines under the strip: in the correction it stops one step before the answer, at the win it goes on to it */
    const wl = (trOn && trN >= trLen) || win ? tcLines(it, tx, win) : [];
    if (wl.length) out.push(<g key="wl" data-reveals={win ? "answer" : undefined}>{wl.map((ln: string, i: number) => <text key={i} x={450} y={404 + i * 35} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={win ? shade(TC_GO, 0.3) : C.ink}>{ln}</text>)}</g>);
    /* the totals (the warm-up after Add, and free play) */
    if (showTotal && total > 0) out.push(<g key="tot">{tcDurText({ x: 450, y: B.outY + 8, size: T.xl, mins: total, tx, C })}</g>);
    return <g>{out}</g>;
  };

  /* the handles (outside the pure picture: they are the controls) */
  const handles = () => {
    if (V !== "bar") return null;
    const hy = BAR_Y, xb = tcSx(barB), xa = tcSx(barA), isEnd = !free && it.kind === "end";
    const done = !free && it.kind === "dur" && barB === it.e;
    const kd = (id: string) => (e: any) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); e.stopPropagation(); nudge(id, e.key === "ArrowRight" ? 15 : -15); return; }
      if (e.key === "Enter" && isEnd && stage === "ask" && S.end !== it.s) return;
      dd.keys({ id }).onKeyDown(e);
    };
    return (
      <g>
        <g {...control("bar", "Bar end")} {...dd.bind({ id: "bar" })} onKeyDown={kd("bar")} {...touch} style={{ cursor: "grab" }}>
          <circle cx={xb} cy={hy} r={27} fill={done ? shade(TC_GO, 0.25) : "#FFFFFF"} stroke={C.ink} strokeWidth={4} />
          <path d={`M${xb - 8},${hy - 11} l14,11 l-14,11`} fill="none" stroke={done ? "#FFFFFF" : C.ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          <rect x={free ? xb : xb - 36} y={hy - 36} width={72} height={72} rx={18} fill="transparent" />
        </g>
        {free && (
          <g {...control("bar-start", "Bar start")} {...dd.bind({ id: "bar-start" })} onKeyDown={kd("bar-start")} {...touch} style={{ cursor: "grab" }}>
            <circle cx={xa} cy={hy} r={27} fill="#FFFFFF" stroke={C.ink} strokeWidth={4} />
            <path d={`M${xa + 8},${hy - 11} l-14,11 l14,11`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            <rect x={xa - 72} y={hy - 36} width={72} height={72} rx={18} fill="transparent" />
          </g>
        )}
        {inviteOn && <Invite x={xb} y={hy} r={50} C={C} />}
      </g>
    );
  };
  /* the keys: Add (the warm-up's second step) and the three free-play views */
  const keys = () => {
    if (free) {
      const cx0 = 690, cy0 = TC_B.keyY, cnt = V === "days" ? S.D : S.H, on = !!(S.capt && captured);
      return (
        <g>
          {(["hours", "days", "bar"] as any[]).map((id: string, j: number) => {
            const sel = S.mode === id;
            return (
              <Key key={id} id={"free-" + id} label={tx((TC_MODE as any)[id])} x={450 + (j - 1) * 144 - 65} y={cy0} w={130} h={72} C={C} tone={sel ? "enter" : "key"}
                onClick={guarded(() => { if (captured) api.capture(null); put({ mode: id, tiles: 0, trace: -1, capt: false }); api.sfx.tick(); })}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk(sel ? "enter" : "key", C.ink)}>{tx((TC_MODE as any)[id])}</text>
              </Key>
            );
          })}
          {V !== "bar" && (
            <g>
              <rect x={cx0} y={cy0} width={190} height={72} rx={14} fill="#FFFFFF" stroke={on ? shade(C.accent, 0.3) : C.ink} strokeWidth={on ? 6 : 3} />
              <text x={cx0 + 34} y={cy0 + 54} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{cnt}</text>
              <text x={cx0 + 66} y={cy0 + 48} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(V === "days" ? "days" : "hours")}</text>
              <Hit id="free-count" x={cx0} y={cy0} w={190} h={72} label="Number of hours or days" enabled={!captured} onPress={openCount} />
              {!S.countTapped && <Invite x={cx0 + 95} y={cy0 + 36} w={190} h={72} C={C} />}
            </g>
          )}
        </g>
      );
    }
    if (warm && n === 3 && st >= 1 && !S.added) {
      return (
        <g>
          <Key id="add" label={tx("Add")} x={350} y={TC_B.keyY} w={200} h={72} C={C} tone="key" onClick={guarded(() => addAct())}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("Add")}</text>
          </Key>
          {inviteOn === "add" && <Invite x={450} y={TC_B.keyY + 36} w={200} h={72} C={C} />}
        </g>
      );
    }
    return null;
  };

  return (
    <g>
      <g transform={`translate(${ox},0)`}>
        {V === "hours" && drawHours()}
        {V === "days" && drawDays()}
        {V === "bar" && <g><g pointerEvents="none">{drawBar()}</g>{handles()}</g>}
        {keys()}
      </g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const item = it || (result && result.last && PHASES[n - 1].items[result.last.item]) || null;
  if (!item || !result || !result.last) return null;
  const v = result.last.value;
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (item.kind === "hm" || item.kind === "days") {
    const per = item.kind === "hm" ? 12 : 24, N = item.kind === "hm" ? item.H * 12 + item.M / 5 : item.D * 24, rows = Math.ceil(N / per), tw = 90 / per;
    const cells: any[] = [];
    for (let k = 0; k < rows; k++) for (let j = 0; j < Math.min(per, N - k * per); j++) {
      const base = item.kind === "hm" ? TC_MIN : j < 12 ? TC_AM : TC_PM;
      cells.push(<rect key={k + "_" + j} x={14 + j * tw} y={(h - rows * 12) / 2 + k * 12} width={tw - 1.5} height={9} fill={base} stroke={C.ink} strokeWidth={0.8} />);
    }
    return (
      <g>{frame}{cells}
        <text x={w - 14} y={h / 2 + 11} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={shade(item.kind === "hm" ? TC_MIN : TC_GO, 0.2)}>{String(leadNumber(v))}</text>
      </g>
    );
  }
  /* no letters (nothing to translate) and no colon (a length is not a clock time): the bar on the strip, and the hours in a vermilion badge
     and the minutes in a deep blue one; an end time has a sky blue (a.m.) or amber (p.m.) rule under its badges */
  const mins = item.kind === "end" ? Number(v) - item.s : item.e - item.s, a = item.s, c = tcClock(item.kind === "end" ? Number(v) : mins);
  const hh = item.kind === "end" ? c.h : Math.floor(mins / 60), mm = item.kind === "end" ? c.m : mins % 60;
  const bw = 52, bh = 46, by = h / 2 - bh / 2, mx = w - 12 - bw, hx = mx - 8 - bw;
  return (
    <g>{frame}
      <rect x={12} y={h / 2 - 12} width={84} height={10} fill={tint(TC_AM, 0.4)} stroke={C.ink} strokeWidth={0.8} />
      <rect x={12 + ((a - TC_WS) / 720) * 84} y={h / 2 - 16} width={Math.max(4, (mins / 720) * 84)} height={18} rx={3} fill={TC_GO} stroke={C.ink} strokeWidth={1} />
      <rect x={hx} y={by} width={bw} height={bh} rx={10} fill={tint(TC_HOUR, 0.78)} stroke={TC_HOUR} strokeWidth={3} />
      <text x={hx + bw / 2} y={by + bh / 2 + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={shade(TC_HOUR, 0.45)}>{hh}</text>
      <rect x={mx} y={by} width={bw} height={bh} rx={10} fill={tint(TC_MIN, 0.82)} stroke={TC_MIN} strokeWidth={3} />
      <text x={mx + bw / 2} y={by + bh / 2 + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={shade(TC_MIN, 0.3)}>{tcPad(mm)}</text>
      {item.kind === "end" && <rect x={hx} y={by + bh + 4} width={bw * 2 + 8} height={6} rx={3} fill={c.h24 < 12 ? TC_AM : TC_PM} stroke={C.ink} strokeWidth={1} />}
    </g>
  );
}

function TimeConverter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area the whole card until the child taps Answer, the keypad in a panel from the right */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right; the question lives only in the bubble */
      keyOnly: true,
      /* the wide keypad: the picture is laid out in x 0 to 900, which is what it has with the panel open */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; after a right answer the win picture waits for the child's tap on the blinking Next key */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d): one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default TimeConverter;
