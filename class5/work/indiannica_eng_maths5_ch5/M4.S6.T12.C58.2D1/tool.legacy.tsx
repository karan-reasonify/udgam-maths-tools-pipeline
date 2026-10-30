/* ═══ M4.S6.T12.C58.2D1 · measure_chain · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C5.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "measure_chain";
const MEDIA_ID = "M4.S6.T12.C58.2D1";
const TOOL_NAME = "Measure Chain";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Measures waiting to be joined, weighed or poured."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "One unit, one step at a time, every answer written down.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Join rope, weigh bags or pour water.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = { hi: {}, gu: {} };

/* One entry per phase = one mount. Every answer is one decimal in one unit, a string in its written form
   (pointKey), and the measures it is made from are data on the item (the picture, judge and oracle read them).
   join   pcs: the measures joined on the tape or weighed on the scale; odd: a piece tagged in another unit
   chain  whole minus (pcs[0] + pcs[1]); the sum is written on the Answer card and carried into step 2
   list   lines: [name, measure]; totalled top to bottom (Total) and bottom to top (Check)
   jug    start, then pours [op, measure] in order; the jug is marked in tenths of a litre */
const PHASES = [
  {
    n: 1,
    concept: "Adding measures in one unit",
    conceptId: "M4.S6.T12.C55", objectiveIds: ["O21"],
    says: ["Look at every unit tag first. Only measures in one unit go into one sum."],
    /* tries, as the plan writes it: First rung: check every unit tag. Second rung: join two pieces. Third rung: the same task with two pieces, before three return. */
    ladder: ["Add one column at a time, from the right. A column that makes ten carries one.", "Check your total against the tape or the dial."],
    closing: "measures in one unit are added like any decimals, with the unit said with every number",
    learned: "You learned: add measures in one unit like decimals, points in line.",
    traceback: "the rows slide until every point is in one line, zeros fill the empty places, and the column is added from the right, carries and all, to the green total with its unit",
    items: [
      /* learn MC1: answer in the plan = 7.35 m */
      { qid: "M4.S6.T12.C55:MC1", kind: "join", scene: "tape", unit: "m", pcs: ["3.2", "2.45", "1.7"], odd: ["45", "cm"], near: "2.94", winMs: 2800,
        say: "A fence has three sections, 3.2 m, 2.45 m and 1.7 m long. What is its total length?", ask: "Length of fence, in m?", answer: "7.35",
        miss: "Give every measure two places after the point. Then add the hundredths first." },
      /* practice 1: answer in the plan = 3.75 kg */
      { qid: "M4.S6.T12.C55:1", kind: "join", scene: "scale", unit: "kg", pcs: ["2.3", "1.45"], odd: ["500", "g"], near: "1.68", winMs: 2800,
        say: "Add 2.3 kg and 1.45 kg.", ask: "Total weight, in kg?", answer: "3.75",
        miss: "Write 2.3 kg as 2.30 kg, so both points sit in one line." },
      /* practice 3: answer in the plan = 7.32 m */
      { qid: "M4.S6.T12.C55:3", kind: "join", scene: "tape", unit: "m", pcs: ["4.6", "2.72"], odd: ["60", "cm"], near: "3.18", winMs: 2800,
        say: "Add 4.6 m and 2.72 m.", ask: "Total length, in m?", answer: "7.32",
        miss: "Six tenths and seven tenths make more than one whole. Carry the one to the ones." },
    ],
  },
  {
    n: 2,
    concept: "One answer feeds the next",
    conceptId: "M4.S6.T12.C56", objectiveIds: ["O21"],
    says: ["Write the first answer down. The next step needs it."],
    /* tries, as the plan writes it: First rung: add the two scoops. Second rung: write the total on the Answer card. Third rung: the same task with one scoop, before two return. */
    ladder: ["Write the total on the Answer card.", "Take away from the right. When a column is short, open one from the next place."],
    closing: "in a chain of steps, each answer is written down and the next step uses the written number",
    learned: "You learned: write each answer down and use it in the next step.",
    traceback: "both measures go into step 1 and their total is written on the Answer card, the card slides into step 2, and the take away runs from the right, trades and all, to the green amount left",
    items: [
      /* learn MC2: answer in the plan = 2.85 kg */
      { qid: "M4.S6.T12.C56:MC2", kind: "chain", scene: "sack", unit: "kg", whole: "5", pcs: ["1.25", "0.9"], tags: ["day 1", "day 2"], near: "3.75", winMs: 2800,
        say: "A cook has 5 kg of rice, and uses 1.25 kg on one day and 0.9 kg the next. How much rice is left?", ask: "Rice that is left, in kg?", answer: "2.85",
        miss: "Both days come out of the rice. Take away the card, not one day." },
      /* practice 4: answer in the plan = 1.15 kg. First 0.75 + 1.10 = 1.85 kg is used, then 3.00 - 1.85 = 1.15 */
      { qid: "M4.S6.T12.C56:4", kind: "chain", scene: "sack", unit: "kg", whole: "3", pcs: ["0.75", "1.1"], tags: ["bread", "cakes"], near: "2.25", winMs: 2800,
        say: "A tin holds 3 kg of flour. 0.75 kg is used for bread and 1.1 kg for cakes. How much flour is left?", ask: "Flour that is left, in kg?", answer: "1.15",
        miss: "Write 3 kg as 3.00 kg before you take the card away." },
      /* practice 7: answer in the plan = 4.25 m. First 2.60 + 3.15 = 5.75 m is cut off, then 10.00 - 5.75 = 4.25 */
      { qid: "M4.S6.T12.C56:7", kind: "chain", scene: "coil", unit: "m", whole: "10", pcs: ["2.6", "3.15"], tags: ["cut 1", "cut 2"], near: "7.4", winMs: 2800,
        say: "A rope is 10 m long. 2.6 m is cut off, then 3.15 m more. How much rope is left?", ask: "Rope that is left, in m?", answer: "4.25",
        miss: "Ten metres is 10.00 m. Open a one into tenths, and a tenth into hundredths." },
    ],
  },
  {
    n: 3,
    concept: "A list of parts and its total",
    conceptId: "M4.S6.T12.C57", objectiveIds: ["O22"],
    says: ["Add the list. Now add it the other way. Do they match?"],
    /* tries, as the plan writes it: First rung: add the first two parts. Second rung: add the third. Third rung: the same task with two parts, before three return. */
    ladder: ["Add the first two parts, then add the third to that.", "The Check total must match the first total. If they differ, look for a slip."],
    closing: "the parts of a plan are listed with their measures, totalled, and checked in another order",
    learned: "You learned: total a list, then check it by adding in another order.",
    traceback: "every line of the list lights as it is added, the Total column is added from the right to the green total, and the Check column's total fills in beside it, the same",
    items: [
      /* learn MC3: answer in the plan = 4.85 km */
      { qid: "M4.S6.T12.C57:MC3", kind: "list", unit: "km", lines: [["to the pond", "1.6"], ["to the hill", "2.35"], ["back to the gate", "0.9"]], near: "3.95", winMs: 2800,
        say: "A trail has three parts: 1.6 km to a pond, 2.35 km to a hill and 0.9 km back to the gate. List the parts and find the total. Check it.", ask: "Trail in all, in km?", answer: "4.85",
        miss: "Every part counts. Give each measure two places, then add all three." },
      /* practice 5: answer in the plan = 4.05 km. 0.80 + 1.25 + 2.00 = 4.05, and 2.00 + 1.25 + 0.80 = 4.05 */
      { qid: "M4.S6.T12.C57:5", kind: "list", unit: "km", lines: [["part 1", "0.8"], ["part 2", "1.25"], ["part 3", "2"]], near: "2.05", winMs: 2800,
        say: "A walk has three parts, 0.8 km, 1.25 km and 2 km. Find the total and check it in another order.", ask: "Length of walk, in km?", answer: "4.05",
        miss: "Write 2 km as 2.00 km, with a point and two zeros." },
      /* practice 8: answer in the plan = 4.47 kg. 1.35 + 2.40 + 0.72 = 4.47, and 0.72 + 2.40 + 1.35 = 4.47 */
      { qid: "M4.S6.T12.C57:8", kind: "list", unit: "kg", lines: [["box 1", "1.35"], ["box 2", "2.4"], ["box 3", "0.72"]], near: "3.75", winMs: 2800,
        say: "A shelf holds three boxes of 1.35 kg, 2.4 kg and 0.72 kg. List them, find the total weight, and check it.", ask: "Total weight, in kg?", answer: "4.47",
        miss: "Line up the points of all three boxes. Start with the hundredths." },
    ],
  },
  {
    n: 4,
    concept: "Pouring and measuring in litres",
    conceptId: "M4.S6.T12.C58", objectiveIds: ["O21"],
    says: ["Pour out, read the jug. Pour in, read it again."],
    /* tries, as the plan writes it: First rung: read the jug. Second rung: pour out once and read again. Third rung: the same task with one pour, before two return. */
    ladder: ["Count the small marks from the long line. Each mark is one tenth of a litre.", "Water poured out makes the level go down. Water poured in makes it go up."],
    closing: "water is poured and measured in litres, taken away and added as decimals",
    learned: "You learned: pour and measure water in litres, as decimals.",
    traceback: "the jug is poured again, its level sliding past the tenths marks, the marks light one by one up to the level, and the strip works each step to the green reading in litres",
    items: [
      /* learn MC4: answer in the plan = 1.45 L */
      { qid: "M4.S6.T12.C58:MC4", kind: "jug", unit: "L", start: "1.6", pours: [["−", "0.45"], ["+", "0.3"]], near: "2.35", winMs: 2800,
        say: "A jug has 1.6 L of water. 0.45 L is poured out, then 0.3 L is poured in. How much water is in the jug now?", ask: "Water in the jug, in L?", answer: "1.45",
        miss: "Poured out means take away. Poured in means add." },
      /* practice 2: answer in the plan = 1.5 L, because 0.9 + 0.6 = 1.5 (1.50 L is the same measure, so it is taken too) */
      { qid: "M4.S6.T12.C58:2", kind: "jug", unit: "L", start: "0.9", pours: [["+", "0.6"]], near: "0.15", alt: ["1.50"], winMs: 2800,
        say: "A jug has 0.9 L of water, and 0.6 L more is poured in. How much water is in it now?", ask: "Water in it now, in L?", answer: "1.5",
        miss: "Add the tenths. Ten tenths make one whole litre." },
      /* practice 6: answer in the plan = 1.35 L, because 1.90 - 0.55 = 1.35 */
      { qid: "M4.S6.T12.C58:6", kind: "jug", unit: "L", start: "1.9", pours: [["−", "0.55"]], near: "2.45", winMs: 2800,
        say: "A jug has 1.9 L of water, and 0.55 L is poured out. How much is left?", ask: "Water that is left, in L?", answer: "1.35",
        miss: "Write 1.9 as 1.90. Then take away from the hundredths up." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  tape: { metres: 8, marks: "tenths of a metre, a long line at each metre" },
  dial: { kilograms: 5, marks: "tenths of a kilogram, a long line at each kilogram" },
  jug: { litres: 2, marks: "tenths of a litre, a long line at each litre" },
  strip: "a column: every point in one line, a zero written to fill an empty place (violet), carries and trades (vermilion), the result (green)",
  free: { rope: ["1.5", "2.25", "0.8", "3.4"], bags: ["1.2", "0.75", "2.5", "0.35"], jug: { start: "1", cup: "0.25", bottle: "0.5" } },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: the decimal in its written form, exactly (an item may list another written form of the same measure) */
const judge = (item: any, v: any) => {
  const s = String(v ?? "").trim();
  return s === String(item.answer) || (item.alt || []).includes(s);
};
/* oracle: every answer re-derived from the item's own measures by a second route (floating point, rounded),
   sharing no code with judge or the column the picture writes; the written form keeps the most places given */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const f = (s: any) => parseFloat(String(s));
  const given: string[] = it.kind === "join" ? it.pcs : it.kind === "chain" ? [it.whole, ...it.pcs]
    : it.kind === "list" ? it.lines.map((l: any) => l[1]) : [it.start, ...it.pours.map((q: any) => q[1])];
  const v = it.kind === "join" ? it.pcs.reduce((a: number, s: string) => a + f(s), 0)
    : it.kind === "chain" ? f(it.whole) - it.pcs.reduce((a: number, s: string) => a + f(s), 0)
    : it.kind === "list" ? it.lines.reduce((a: number, l: any) => a + f(l[1]), 0)
    : it.pours.reduce((a: number, q: any) => a + (q[0] === "+" ? f(q[1]) : -f(q[1])), f(it.start));
  const places = Math.max(...given.map((s) => (String(s).split(".")[1] || "").length));
  return v.toFixed(places) === String(it.answer);
}));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => [String(item.answer), speakable(item.answer), ...(item.alt || [])];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): it does what a child does on the working area (joins, writes the card, opens both
   columns, pours), then types the decimal with its point (toolApi.answer alone would strip the point) */
const answer = (item: any, v: any) => (HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── measures: the arithmetic and the column the picture writes (names start mc: the runtime shares this scope) ── */
const MC = { given: CONTENT.hundred, result: CONTENT.one, carry: CONTENT.pointer, zero: "#6F4BAF", taken: CONTENT.bead, now: CONTENT.ten, hold: "#767676" };
const mcInk = (c: string) => shade(c, 0.25);
const MC_NOW = shade(CONTENT.ten, 0.45);
const MC_DW = 34, MC_PW = 18, MC_OPW = 40, MC_RH = 62;
const mcDp = (s: any) => (String(s).split(".")[1] || "").length;
/* a measure as a whole number of its smallest place (hundredths when dp = 2): exact, no floating point */
const mcUnits = (s: any, dp: number) => { const [a, b = ""] = String(s).split("."); return parseInt(a + (b + "0000").slice(0, dp), 10); };
const mcStr = (u: number, dp: number) => { const t = String(Math.abs(u)).padStart(dp + 1, "0"); return dp ? t.slice(0, t.length - dp) + "." + t.slice(t.length - dp) : t; };
const mcSame = (a: any, b: any) => /^\d*\.?\d+$/.test(String(a)) && /^\d*\.?\d+$/.test(String(b)) && mcUnits(a, 3) === mcUnits(b, 3);
const mcTag = (v: string, u: string, tx: any) => v + " " + tx(u);

/* the column for a sum (op "+") or a take away (op "−", two rows): places, the result, and what is
   written above the top row: carries for a sum, the opened (traded) digits for a take away */
function mcWork(nums: string[], op: string) {
  const dp = Math.max(...nums.map(mcDp));
  const us = nums.map((s) => mcUnits(s, dp));
  const ru = op === "−" ? us[0] - us[1] : us.reduce((a, b) => a + b, 0);
  const res = mcStr(ru, dp);
  const ip = Math.max(...nums.map((s) => String(s).split(".")[0].length), res.split(".")[0].length);
  const nc = ip + dp;
  const grid = nums.map((s) => {
    const [a, b = ""] = String(s).split(".");
    return Array.from({ length: nc }, (_, j) => (j < ip ? (j - (ip - a.length) >= 0 ? a[j - (ip - a.length)] : "") : b[j - ip] ?? "0"));
  });
  const above: string[] = Array(nc).fill(""), struck: boolean[] = Array(nc).fill(false);
  if (op === "−") {
    let bi = 0;
    for (let j = nc - 1; j >= 0; j--) {
      const a = Number(grid[0][j] || 0), b = Number(grid[1][j] || 0);
      let t = a - bi; bi = 0;
      if (t < b) { t += 10; bi = 1; }
      if (t !== a) { above[j] = String(t); struck[j] = true; }
    }
  } else {
    let c = 0;
    for (let j = nc - 1; j >= 0; j--) {
      const s = grid.reduce((acc, r) => acc + Number(r[j] || 0), 0) + c;
      c = Math.floor(s / 10);
      if (c && j > 0) above[j - 1] = String(c);
    }
  }
  return { dp, ip, nc, res, above, struck };
}

/* each written digit's place in the column: a zero written to fill an empty place is "add" (violet), a zero
   holding a place open inside the number is "hold" (grey); the point is "add" when the number had none */
function mcCells(s: string, ip: number, dp: number) {
  const [a, b = ""] = String(s).split(".");
  const ds = (a + b).split("");
  const hold = (k: number) => ds[k] === "0" && ds.slice(0, k).some((x) => x !== "0") && ds.slice(k + 1).some((x) => x !== "0");
  const cells: any[] = [];
  for (let k = 0; k < a.length; k++) cells.push({ j: ip - a.length + k, ch: a[k], kind: hold(k) ? "hold" : "d" });
  for (let k = 0; k < dp; k++) cells.push(k < b.length ? { j: ip + k, ch: b[k], kind: hold(a.length + k) ? "hold" : "d" } : { j: ip + k, ch: "0", kind: "add" });
  return { cells, point: dp > 0 ? (String(s).includes(".") ? "pt" : "add") : "" };
}

/* a column's geometry: one cell per place, the point in its own narrow cell, so every point sits in one line */
function mcGeo(x: number, y: number, ip: number, dp: number, nRows: number) {
  const nc = ip + dp;
  const cx = (j: number) => x + MC_OPW + j * MC_DW + MC_DW / 2 + (j >= ip ? MC_PW : 0);
  const rb = (i: number) => y + 80 + i * MC_RH;
  const ruleY = rb(Math.max(nRows, 1) - 1) + 24;
  const ux = x + MC_OPW + nc * MC_DW + MC_PW + 10;
  return { x, y, ip, dp, nc, cx, rb, ruleY, resB: ruleY + 58, px: x + MC_OPW + ip * MC_DW + MC_PW / 2, ux, l: x + MC_OPW - 10, r: ux - 6 };
}

function mcDigits(g: any, s: string, base: number, fill: string, C: any, vis: (j: number) => boolean = () => true, hideAdd = false) {
  const { cells, point } = mcCells(s, g.ip, g.dp);
  return [
    ...cells.filter((c: any) => vis(c.j) && !(hideAdd && c.kind === "add")).map((c: any) => (
      <text key={"d" + c.j} x={g.cx(c.j)} y={base} textAnchor="middle" fontSize={T.speech} fontWeight={700}
        fill={c.kind === "add" ? MC.zero : c.kind === "hold" ? MC.hold : fill}>{c.ch}</text>)),
    point && vis(g.ip - 0.5) && !(hideAdd && point === "add")
      ? <text key="pt" x={g.px} y={base} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={point === "add" ? MC.zero : C.ink}>.</text> : null,
  ];
}

/* the column strip: rows [{ s, op, fill, lit, box }], the rule, then the result row:
   res "q" (not found yet), "show" (revealed column by column from the right) or "none" (drawn by the caller) */
function mcCol(g: any, o: any) {
  const { rows, unit, C, res = "none", rs = "", reveal = 0, focus = null, work = null, op = "+", ragged = false } = o;
  const quiet = mix(C.ink, "#FFFFFF", 0.3);
  const fast = reducedMotion();
  return (
    <g>
      {focus !== null && <rect x={g.cx(focus) - MC_DW / 2} y={g.rb(0) - 44} width={MC_DW} height={g.resB - g.rb(0) + 58} rx={8} fill={tint(MC.now, 0.72)} />}
      {rows.map((r: any, i: number) => (
        <g key={"r" + i}>
          {r.lit && <rect x={g.l - 6} y={g.rb(i) - 48} width={g.ux + 54 - g.l} height={62} rx={10} fill={tint(MC.now, 0.72)} stroke={MC_NOW} strokeWidth={2} />}
          {r.box === "card" && <rect x={g.l} y={g.rb(i) - 48} width={g.r - g.l} height={62} rx={10} fill="#FFFFFF" stroke={mcInk(MC.result)} strokeWidth={3} />}
          {r.box === "drop" && <rect x={g.l} y={g.rb(i) - 48} width={g.r - g.l} height={62} rx={10} fill="none" stroke={shade(C.rule, 0.15)} strokeWidth={3} strokeDasharray="8 7" />}
          {i > 0 && r.op && <text x={g.x + MC_OPW / 2 - 4} y={g.rb(i)} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{r.op}</text>}
          {r.s && (
            <g style={{ transform: `translateX(${ragged ? (g.dp - mcDp(r.s)) * MC_DW : 0}px)`, transition: fast ? undefined : "transform 650ms ease" } as any}>
              {mcDigits(g, r.s, g.rb(i), r.fill || C.ink, C, () => true, ragged)}
            </g>
          )}
          {(r.s || r.box) && !ragged && <text x={g.ux} y={g.rb(i)} fontSize={T.label} fontWeight={500} fill={quiet}>{unit}</text>}
        </g>
      ))}
      {work && reveal > 0 && work.above.map((a: string, j: number) => (a && (op === "−" || j >= g.nc - reveal - 1)
        ? <text key={"a" + j} x={g.cx(j)} y={g.rb(0) - 46} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={mcInk(MC.carry)}>{a}</text> : null))}
      {work && op === "−" && reveal > 0 && work.struck.map((s: boolean, j: number) => (s
        ? <line key={"s" + j} x1={g.cx(j) - 13} y1={g.rb(0) - 4} x2={g.cx(j) + 13} y2={g.rb(0) - 30} stroke={C.ink} strokeWidth={3} strokeLinecap="round" /> : null))}
      {res !== "none" && rows.length > 1 && <line x1={g.x + 4} y1={g.ruleY} x2={g.ux + 40} y2={g.ruleY} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />}
      {res === "q" && <text x={(g.cx(0) + g.cx(g.nc - 1)) / 2} y={g.resB} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={quiet}>?</text>}
      {res === "show" && mcDigits(g, rs, g.resB, mcInk(MC.result), C, (j) => j >= g.nc - reveal)}
      {res === "show" && reveal >= g.nc && <text x={g.ux} y={g.resB} fontSize={T.label} fontWeight={600} fill={mcInk(MC.result)}>{unit}</text>}
    </g>
  );
}

/* the scene's geometry, in working-area units */
const MC_TAPE = { x0: 40, y: 330, h: 54, ppm: 75, max: 8 };
const MC_DIAL = { cx: 330, cy: 404, r: 100, max: 5 };
const MC_JUG = { x: 236, y: 60, w: 200, h: 360, max: 2 };
const mcJugY = (u: number) => MC_JUG.y + MC_JUG.h - (u / 100) * (MC_JUG.h / MC_JUG.max);
const MC_FREE = { rope: ["1.5", "2.25", "0.8", "3.4"], bags: ["1.2", "0.75", "2.5", "0.35"] };

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tlTb = useTimeline();
  const tlAn = useTimeline();
  const it: any = item || {};
  const free = stage === "free";
  const solved = stage === "win" || stage === "idle";
  const live = stage === "teach" || stage === "ask";
  const asking = stage === "ask";
  const busy = tlTb.busy;
  const quiet = mix(C.ink, "#FFFFFF", 0.3);

  const blank = (): any => ({ at: index, placed: [], lit: null, card: "", cardOk: false, cardIn: false, cardStale: false, typing: false,
    tot: false, chk: false, hl: -1, tb: null, lev: null, band: null, poured: [] });
  const [S0, setS] = useState<any>(() => ({ ...blank(), scene: "rope", fplaced: [], flev: 100, fpours: [], fband: null }));
  const SR = useRef<any>(S0);
  const put = (o: any) => { SR.current = { ...SR.current, ...o }; setS(SR.current); };
  /* the render right after a question changes still holds the last question's state: draw a fresh scene for it */
  const S: any = S0.at === index ? S0 : { ...S0, ...blank() };

  /* every question starts on its own furnished scene; Free play keeps its own fields */
  useEffect(() => { tlTb.stop(); tlAn.stop(); put(blank()); }, [index]);

  /* ── the item's numbers ── */
  const k = it.kind;
  const ids = (k === "join" ? it.pcs : k === "chain" ? it.pcs : []).map((_: any, j: number) => (k === "chain" ? "sc" : "pc") + j);
  const W1 = useMemo(() => (k === "join" ? mcWork(it.pcs, "+") : k === "chain" ? mcWork(it.pcs, "+") : k === "list" ? mcWork(it.lines.map((l: any) => l[1]), "+")
    : k === "jug" ? mcWork([it.start, it.pours[0][1]], it.pours[0][0]) : null), [n, index]);
  const W2 = useMemo(() => (k === "chain" && W1 ? mcWork([it.whole, W1.res], "−") : k === "jug" && it.pours.length > 1 && W1 ? mcWork([W1.res, it.pours[1][1]], it.pours[1][0]) : null), [n, index]);
  const finalW = W2 || W1;
  const jugEnd = k === "jug" ? it.pours.reduce((a: number, q: any) => a + (q[0] === "+" ? 1 : -1) * mcUnits(q[1], 2), mcUnits(it.start, 2)) : 0;

  /* what is drawn: the child's own state, or (once won) the whole working, whatever the child built */
  const V: any = solved && k ? {
    ...S, placed: ids, lit: null, typing: false, card: W1 ? W1.res : "", cardOk: true, cardIn: true, tot: true, chk: true, hl: -1,
    poured: k === "jug" ? it.pours.map((_: any, j: number) => "p" + j) : [], lev: k === "jug" ? jugEnd : null,
    band: k === "jug" ? (() => { const q = it.pours[it.pours.length - 1]; const to = jugEnd, d = mcUnits(q[1], 2); return { from: q[0] === "+" ? to - d : to + d, to, op: q[0] }; })() : null,
    tb: { k: finalW ? finalW.nc : 0, done: true, chk: true, marks: 0 },
  } : S;
  const done = !!(V.tb && V.tb.done);

  /* ── the gate (phases 2 and 3): the last step is answered only once its working is on the strip ── */
  const ready = () => { const s = SR.current; return n === 2 ? s.cardIn : n === 3 ? s.tot && s.chk : true; };
  api.onEnter(asking && (n === 2 || n === 3) ? (v: any) => {
    if (ready()) return api.submit(v);
    if (v === "" || v === undefined || v === null) return false;
    if (n === 2) { put({ lit: "card" }); api.say("Step 2 opens when the Answer card is in it."); }
    else if (!SR.current.tot) { put({ lit: "tot" }); api.say("Tap Total to add the list first."); }
    else { put({ lit: "chk" }); api.say("Now tap Check, to add it the other way."); }
    return false;
  } : null);

  /* ── the written step (phase 2's Answer card, phase 4's first reading): typed on the lent pad ── */
  const cardWant = () => (W1 ? W1.res : "");
  const cardEnter = () => {
    const s = SR.current, v = s.card;
    if (!v || s.cardStale) return;
    if (v === cardWant()) {
      put({ cardOk: true, typing: false, lit: null });
      api.capture(null);
      api.sfx.tick();
      if (n === 2) api.say("Written down. Now drag the card into step 2.");
      else api.say("Written down. Now pour in the bottle.");
      return;
    }
    put({ cardStale: true });
    if (n === 2) {
      const one = it.pcs.findIndex((q: string) => mcSame(q, v));
      if (one >= 0) { put({ lit: "sc" + (1 - one) }); api.say("The card waits for both measures added together."); }
      else api.say("Add both measures again, with the points in one line.");
    } else if (mcSame(v, mcStr(mcUnits(it.start, 2) + mcUnits(it.pours[0][1], 2), 2))) api.say("The cup took water out of the jug. Take it away.");
    else api.say("Read the jug again, and work the column.");
  };
  const cardKey = (key: string) => {
    const s = SR.current;
    if (key === "enter") { cardEnter(); return; }
    if (key === "clear") { put({ card: "", cardStale: false }); return; }
    if (key === "back") { put({ card: s.cardStale ? "" : s.card.slice(0, -1), cardStale: false }); return; }
    const base = s.cardStale ? "" : s.card;
    if (key === "point") { if (!base.includes(".") && base.length < 5) put({ card: base + ".", cardStale: false }); return; }
    if (/^\d$/.test(key) && base.length < 5) put({ card: base + key, cardStale: false });
  };
  const openCard = () => { put({ typing: true, card: "", cardStale: false, lit: null }); api.capture(cardKey); };
  const giveBack = () => { if (SR.current.typing) { api.capture(null); put({ typing: false }); } };

  /* ── the jug's level slides down or up past the tenths marks, with a soft tick at each mark ── */
  const levelSteps = (from: number, to: number, field: string) => {
    const step = to > from ? 5 : -5, seq: any[] = [];
    for (let u = from + step; step > 0 ? u <= to : u >= to; u += step) {
      const uu = u;
      seq.push([110, () => { put({ [field]: uu }); if (uu % 10 === 0) api.sfx.tick(); }]);
    }
    seq.push([20, () => put({ [field]: to })]);
    return seq;
  };
  const pour = (pay: any) => {
    const st = SR.current;
    if (free) {
      if (st.fpours.length >= 4) return;
      const from = st.flev, d = mcUnits(pay.v, 2) * (pay.op === "+" ? 1 : -1), to = from + d;
      if (to < 0 || to > 200) return;
      put({ fpours: [...st.fpours, [pay.op, pay.v]], fband: { from, to, op: pay.op } });
      tlAn.run(levelSteps(from, to, "flev"));
      return;
    }
    if (st.poured.includes(pay.id)) return;
    if (pay.id === "p1" && it.pours.length > 1 && !st.cardOk) return;
    const from = st.lev ?? mcUnits(it.start, 2);
    const to = from + mcUnits(pay.v, 2) * (pay.op === "+" ? 1 : -1);
    put({ poured: [...st.poured, pay.id], band: { from, to, op: pay.op }, lit: null });
    tlAn.run(levelSteps(from, to, "lev"));
  };

  /* ── phase 3: Total and Check write the list as a column, lighting each line as it is added (no total yet) ── */
  const lightLines = (order: number[]) => tlAn.run([...order.map((j) => [380, () => put({ hl: j })]), [10, () => put({ hl: -1 })]] as any);
  const tapTot = () => { if (busy || SR.current.tot) return; put({ tot: true, lit: null }); lightLines([0, 1, 2]); };
  const tapChk = () => { if (busy || SR.current.chk) return; put({ chk: true, lit: null }); lightLines([2, 1, 0]); };

  /* ── drags: a piece follows the finger; a tap (or Enter) puts it where it belongs ── */
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!pay || tlTb.busy) return;
    if (!(live || free)) return;
    const st = SR.current;
    const at = (f: (x: number, y: number) => boolean) => !moved || (isFinite(p.x) && isFinite(p.y) && f(p.x, p.y));
    if (pay.kind === "pc") {
      if (!at((x, y) => x < 700 && y > 128)) return;
      if (pay.odd) {
        put({ lit: pay.id });
        if (asking) { if (pay.u === "cm") api.say("That tag says centimetres. This sum is all in metres."); else api.say("That tag says grams. This sum is all in kilograms."); }
        return;
      }
      if (free) { if (!st.fplaced.includes(pay.id)) put({ fplaced: [...st.fplaced, pay.id] }); }
      else if (!st.placed.includes(pay.id)) put({ placed: [...st.placed, pay.id], lit: null });
      api.sfx.tick();
    } else if (pay.kind === "sc") {
      if (!at((x) => x > 440) || st.placed.includes(pay.id)) return;
      put({ placed: [...st.placed, pay.id], lit: null });
      api.sfx.tick();
    } else if (pay.kind === "card") {
      if (!asking) return;
      if (!st.cardOk) { if (!moved && !captured) openCard(); return; }
      if (st.cardIn || !at((x) => x > 770)) return;
      put({ cardIn: true, lit: null });
      api.sfx.tick();
    } else if (pay.kind === "pour") {
      if (!at((x, y) => x > 214 && x < 480 && y > 20 && y < 450)) return;
      pour(pay);
    }
  });
  const dg = drag.drag;
  const follow = (id: string, hx: number, hy: number) => (dg && dg.moved && dg.payload && dg.payload.id === id
    ? `translate(${Math.max(-hx + 40, Math.min(W.w - hx - 40, dg.x - hx))},${Math.max(-hy + 40, Math.min(W.h - hy - 40, dg.y - hy))})` : undefined);

  /* ── the agent: it does on the working area what a child does, then types the decimal ── */
  const setup = () => {
    tlAn.stop();
    if (k === "join" || k === "chain") put({ placed: ids, lit: null });
    if (k === "chain") { api.capture(null); put({ card: W1.res, cardOk: true, cardIn: true, typing: false }); }
    if (k === "list") put({ tot: true, chk: true, lit: null });
    if (k === "jug") {
      const last = it.pours[it.pours.length - 1], d = mcUnits(last[1], 2);
      api.capture(null);
      put({ poured: it.pours.map((_: any, j: number) => "p" + j), lev: jugEnd, band: { from: last[0] === "+" ? jugEnd - d : jugEnd + d, to: jugEnd, op: last[0] },
        card: W1.res, cardOk: true, typing: false });
    }
  };
  HOOK.set = (v: any) => { if (stage !== "ask") return false; setup(); api.setTyped(String(v ?? "")); return true; };

  /* ── the traceback: drawn from the item's own numbers, ending on the whole right answer ── */
  const traceSteps = (v: string): any[] => {
    const cols = (w: any, extra: any = {}) => Array.from({ length: w.nc }, (_, c) => [650, () => put({ tb: { ...extra, k: c + 1, focus: w.nc - 1 - c } })]);
    if (k === "join") {
      const digitsSum = it.pcs.reduce((a: number, s: string) => a + parseInt(s.replace(".", ""), 10), 0);
      const ragged = String(v).replace(/\D/g, "") === String(digitsSum);
      return [
        [ragged ? 1200 : 500, () => put({ placed: ids, lit: null, tb: { k: 0, ragged, focus: null } })],
        ...(ragged ? [[800, () => put({ tb: { k: 0, ragged: false, focus: null } })]] : []),
        ...cols(W1),
        [300, () => put({ tb: { k: W1.nc, focus: null, done: true } })],
      ];
    }
    if (k === "chain") {
      const forgot = it.pcs.findIndex((q: string) => mcSame(v, mcStr(mcUnits(it.whole, 2) - mcUnits(q, 2), 2)));
      return [
        [1000, () => put({ placed: ids, card: W1.res, cardOk: true, cardIn: false, typing: false, cardStale: false, lit: forgot >= 0 ? "sc" + (1 - forgot) : "card", tb: { k: 0 } })],
        [800, () => put({ cardIn: true, lit: null })],
        ...cols(W2),
        [300, () => put({ tb: { k: W2.nc, focus: null, done: true } })],
      ];
    }
    if (k === "list") {
      const vals = it.lines.map((l: any) => l[1]);
      const left = vals.findIndex((_: any, j: number) => mcSame(v, mcStr(vals.reduce((a: number, s: string, i: number) => a + (i === j ? 0 : mcUnits(s, 2)), 0), 2)));
      return [
        [400, () => put({ tot: true, chk: true, hl: -1, lit: left >= 0 ? "ln" + left : null, tb: { k: 0 } })],
        [450, () => put({ hl: 0 })], [450, () => put({ hl: 1 })], [450, () => put({ hl: 2 })], [150, () => put({ hl: -1 })],
        ...cols(W1),
        [700, () => put({ tb: { k: W1.nc, focus: null, chk: true } })],
        [300, () => put({ tb: { k: W1.nc, focus: null, chk: true, done: true } })],
      ];
    }
    /* the jug: poured again from the start, then the tenths marks counted up to the level */
    const start = mcUnits(it.start, 2);
    const seq: any[] = [[500, () => put({ poured: [], lev: start, band: null, card: "", cardOk: false, typing: false, cardStale: false, lit: null, tb: { k: 0, marks: 0 } })]];
    let cur = start;
    it.pours.forEach((q: any, j: number) => {
      const from = cur, to = cur + (q[0] === "+" ? 1 : -1) * mcUnits(q[1], 2);
      seq.push([250, () => put({ poured: it.pours.slice(0, j + 1).map((_: any, i: number) => "p" + i), band: { from, to, op: q[0] } })]);
      seq.push(...levelSteps(from, to, "lev"));
      if (j === 0 && it.pours.length > 1) seq.push([600, () => put({ card: W1.res, cardOk: true })]);
      cur = to;
    });
    const nm = Math.floor((cur % 100) / 10);
    for (let m = 1; m <= nm; m++) { const mm = m; seq.push([300, () => put({ tb: { k: 0, marks: mm } })]); }
    seq.push(...cols(finalW, { marks: nm }));
    seq.push([300, () => put({ tb: { k: finalW.nc, focus: null, marks: nm, done: true } })]);
    return seq;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    api.capture(null);
    tlAn.stop();
    tlTb.run(traceSteps(String(wrong.value ?? "")), () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState); never the answer before it is given */
  const rowsWritten = !k ? 0 : k === "join" ? V.placed.length + (done ? 1 : 0)
    : k === "chain" ? V.placed.length + (V.cardOk ? 1 : 0) + (V.cardIn ? 2 : 0) + (done ? 1 : 0)
    : k === "list" ? (V.tot ? 3 : 0) + (V.chk ? 3 : 0) + (done ? 2 : 0)
    : 1 + V.poured.length + (V.cardOk && it.pours.length > 1 ? 1 : 0) + (done ? 1 : 0);
  api.share({ scene: free ? S.scene : it.scene || k || null, unit: free ? null : it.unit || null, placed: free ? S.fplaced : V.placed,
    stripRows: free ? null : rowsWritten, answerCard: n === 2 || n === 4 ? (S.cardOk ? S.card : null) : null,
    columns: n === 3 ? { total: S.tot, check: S.chk } : null, jugPours: n === 4 ? S.poured : null });

  /* ═══ drawing (helpers are called, never mounted) ═══ */
  const tag = (v: string, u: string) => mcTag(v, u, tx);
  const twide = (s: string, size: number) => s.length * size * 0.56;

  /* a piece in the tray: a rope coil or a sack, with its unit tag */
  const trayPiece = (pay: any, x: number, y: number, inv: boolean) => {
    const lit = V.lit === pay.id;
    const ctl = live || free;
    const tr = follow(pay.id, x + 75, y + 50);
    return (
      <g key={pay.id} transform={tr} {...(ctl ? { ...control(pay.id, tag(pay.v, pay.u)), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
        <rect x={x} y={y} width={150} height={100} rx={14} fill="#FFFFFF" stroke={lit ? MC_NOW : C.rule} strokeWidth={lit ? 4 : 2} filter={tr ? "url(#fLift)" : "url(#fShadowSoft)"} />
        {pay.look === "sack" ? sack(x + 75, y + 50, 46, 40, false) : coil(x + 75, y + 34, 22)}
        {lit && <rect x={x + 18} y={y + 60} width={114} height={34} rx={8} fill={tint(MC.now, 0.72)} />}
        <text x={x + 75} y={y + 88} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={lit ? MC_NOW : mcInk(MC.given)}>{tag(pay.v, pay.u)}</text>
        {inv && <Invite x={x + 75} y={y + 50} r={52} C={C} />}
      </g>
    );
  };
  function coil(cx: number, cy: number, r: number) {
    return (
      <g>
        {[r, r * 0.68, r * 0.36].map((rr, j) => <circle key={j} cx={cx} cy={cy} r={rr} fill="none" stroke={MC.given} strokeWidth={Math.max(4, r / 5)} />)}
      </g>
    );
  }
  function sack(cx: number, cy: number, w: number, h: number, big: boolean) {
    return (
      <g>
        <path d={`M ${cx - w * 0.3} ${cy - h * 0.62} Q ${cx} ${cy - h * 0.78} ${cx + w * 0.3} ${cy - h * 0.62} L ${cx + w * 0.5} ${cy + h * 0.2} Q ${cx + w * 0.52} ${cy + h * 0.6} ${cx} ${cy + h * 0.6} Q ${cx - w * 0.52} ${cy + h * 0.6} ${cx - w * 0.5} ${cy + h * 0.2} Z`}
          fill={tint(MC.given, 0.55)} stroke={mcInk(MC.given)} strokeWidth={big ? 4 : 2.5} strokeLinejoin="round" />
        <rect x={cx - w * 0.2} y={cy - h * 0.66} width={w * 0.4} height={h * 0.1} rx={3} fill={mcInk(MC.given)} />
      </g>
    );
  }

  const trayRow = (list: any[], placed: string[], nextId: string | null) => (
    <g>{list.map((pay: any, j: number) => (placed.includes(pay.id) ? null : trayPiece(pay, 16 + j * 166, 8, pay.id === nextId)))}</g>
  );

  /* the tape: metres and tenths, the joined pieces end to end above it; the end is labelled only once found */
  const tapeScene = (vals: string[], unit: string, end: boolean) => {
    const T0 = MC_TAPE;
    const ux = (u: number) => T0.x0 + (u / 100) * T0.ppm;
    let acc = 0, lastR = [-999, -999];
    const segs = vals.map((v, j) => {
      const a = acc; acc += mcUnits(v, 2);
      const x1 = ux(a), x2 = ux(acc), mid = (x1 + x2) / 2, w = twide(tag(v, unit), T.micro);
      let lv = 0;
      if (mid - w / 2 < lastR[0] + 8) lv = mid - w / 2 < lastR[1] + 8 ? 0 : 1;
      lastR[lv] = mid + w / 2;
      return { v, x1, x2, mid, lv };
    });
    const total = acc;
    return (
      <g>
        <rect x={T0.x0 - 14} y={T0.y} width={T0.max * T0.ppm + 28} height={T0.h} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
        {Array.from({ length: T0.max * 10 + 1 }, (_, t) => {
          const x = T0.x0 + (t * T0.ppm) / 10, L = t % 10 === 0 ? 26 : t % 5 === 0 ? 16 : 9;
          return <line key={t} x1={x} y1={T0.y} x2={x} y2={T0.y + L} stroke={C.ink} strokeWidth={t % 10 === 0 ? 3 : 1.5} />;
        })}
        {Array.from({ length: T0.max + 1 }, (_, m) => <text key={"l" + m} x={T0.x0 + m * T0.ppm} y={T0.y + T0.h - 6} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{m}</text>)}
        <text x={T0.x0 + T0.max * T0.ppm + 22} y={T0.y + 38} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("m")}</text>
        {segs.map((s, j) => (
          <g key={"s" + j}>
            <line x1={s.x1 + 2} y1={T0.y - 20} x2={s.x2 - 2} y2={T0.y - 20} stroke={j % 2 ? shade(MC.given, 0.2) : MC.given} strokeWidth={14} />
            <circle cx={s.x2} cy={T0.y - 20} r={6} fill={C.ink} />
            <text x={s.mid} y={T0.y - (s.lv ? 84 : 46)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={mcInk(MC.given)}>{tag(s.v, unit)}</text>
          </g>
        ))}
        {vals.length > 0 && <circle cx={ux(0)} cy={T0.y - 20} r={6} fill={C.ink} />}
        {end && total > 0 && (
          <g>
            <line x1={ux(total)} y1={T0.y - 34} x2={ux(total)} y2={T0.y + T0.h + 8} stroke={mcInk(MC.result)} strokeWidth={4} />
            <text x={Math.min(ux(total), 600)} y={T0.y + T0.h + 50} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.result)}>{tag(mcStr(total, 2), unit)}</text>
          </g>
        )}
      </g>
    );
  };

  /* the scale: a dial in kilograms and tenths; the bags sit on the pan; the reading is labelled only once found */
  const scaleScene = (vals: string[], unit: string, end: boolean, endText: string) => {
    const D = MC_DIAL;
    const total = vals.reduce((a, v) => a + mcUnits(v, 2), 0);
    const ang = (u: number) => ((-150 + (u / 100) * 60) * Math.PI) / 180;
    const pt = (u: number, r: number) => [D.cx + Math.sin(ang(u)) * r, D.cy - Math.cos(ang(u)) * r];
    const nb = vals.length, bw = nb ? Math.min(120, (300 - (nb - 1) * 10) / nb) : 0;
    const needle = pt(Math.min(total, D.max * 100), D.r - 20);
    return (
      <g>
        <rect x={200} y={288} width={260} height={228} rx={22} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
        <rect x={318} y={274} width={24} height={16} fill={shade(C.rule, 0.35)} />
        <rect x={180} y={262} width={300} height={14} rx={6} fill={shade(C.rule, 0.35)} />
        <circle cx={D.cx} cy={D.cy} r={D.r + 8} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
        {Array.from({ length: D.max * 10 + 1 }, (_, t) => {
          const a = pt(t * 10, D.r), b = pt(t * 10, D.r - (t % 10 === 0 ? 18 : t % 5 === 0 ? 12 : 7));
          return <line key={t} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.ink} strokeWidth={t % 10 === 0 ? 3 : 1.5} />;
        })}
        {Array.from({ length: D.max + 1 }, (_, m) => { const q = pt(m * 100, D.r - 38); return <text key={"l" + m} x={q[0]} y={q[1] + 10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{m}</text>; })}
        <text x={D.cx} y={D.cy + 56} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("kg")}</text>
        <line x1={D.cx} y1={D.cy} x2={needle[0]} y2={needle[1]} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
        <circle cx={D.cx} cy={D.cy} r={9} fill={C.ink} />
        {vals.map((v, j) => {
          const cx = 180 + (300 - (nb * bw + (nb - 1) * 10)) / 2 + j * (bw + 10) + bw / 2;
          const lv = bw >= 110 ? 0 : j % 2;
          return (
            <g key={"b" + j}>
              {sack(cx, 212, bw, 80, false)}
              <text x={cx} y={lv ? 128 : 160} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={mcInk(MC.given)}>{tag(v, unit)}</text>
            </g>
          );
        })}
        {end && <text x={476} y={420} fontSize={T.label} fontWeight={700} fill={mcInk(MC.result)}>{endText}</text>}
      </g>
    );
  };

  /* a strip box: a quiet panel behind a column */
  const box = (x: number, y: number, w: number, h: number, title?: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
      {title && <text x={x + 18} y={y + 36} fontSize={T.micro} fontWeight={600} fill={quiet}>{title}</text>}
    </g>
  );

  /* ── phase 1 ── */
  const joinView = () => {
    const pcs = it.pcs.map((v: string, j: number) => ({ kind: "pc", id: "pc" + j, v, u: it.unit, look: it.scene === "scale" ? "sack" : "coil" }));
    const odd = { kind: "pc", id: "odd", v: it.odd[0], u: it.odd[1], odd: true, look: it.scene === "scale" ? "sack" : "coil" };
    const list = [pcs[0], ...(it.pcs.length > 2 ? [pcs[1], odd, pcs[2]] : [odd, pcs[1]])];
    const placedVals = V.placed.map((id: string) => it.pcs[Number(id.slice(2))]);
    const next = live && !busy && !free ? (pcs.find((p: any) => !V.placed.includes(p.id)) || {}).id || null : null;
    const tb = V.tb;
    const g = mcGeo(764, 104, W1.ip, W1.dp, Math.max(placedVals.length, 1));
    const full = V.placed.length === it.pcs.length;
    return (
      <g>
        {trayRow(list, V.placed, next)}
        {it.scene === "scale" ? scaleScene(placedVals, it.unit, done, tag(W1.res, it.unit)) : tapeScene(placedVals, it.unit, done)}
        {box(740, 104, 346, 404)}
        {placedVals.length > 0 && mcCol(g, {
          rows: placedVals.map((s: string, i: number) => ({ s, op: "+", fill: mcInk(MC.given) })), unit: tx(it.unit), C,
          res: tb ? "show" : full ? "q" : "none", rs: W1.res, reveal: tb ? tb.k : 0, focus: tb ? tb.focus : null, work: W1, op: "+", ragged: !!(tb && tb.ragged),
        })}
      </g>
    );
  };

  /* ── phase 2 ── */
  const chainView = () => {
    const sc = it.pcs.map((v: string, j: number) => ({ kind: "sc", id: "sc" + j, v }));
    const inStep1 = V.placed.map((id: string) => ({ id, v: it.pcs[Number(id.slice(2))] }));
    const both = V.placed.length === 2;
    const g1 = mcGeo(470, 70, W1.ip, W1.dp, 2), g2 = mcGeo(796, 70, W2.ip, W2.dp, 2);
    const tb = V.tb;
    const cardLive = asking && both && !V.cardIn && !busy;
    const next = !live || busy ? null : sc.find((p: any) => !V.placed.includes(p.id)) ? (sc.find((p: any) => !V.placed.includes(p.id)) as any).id
      : asking && !V.cardIn && !V.typing ? "card" : null;
    /* the whole thing (the sack of rice or flour, the coil of rope) and its tag */
    const whole = (
      <g>
        {it.scene === "coil" ? coil(125, 270, 92) : sack(125, 290, 190, 230, true)}
        <rect x={60} y={258} width={130} height={56} rx={12} fill="#FFFFFF" stroke={mcInk(MC.given)} strokeWidth={2.5} />
        <text x={125} y={297} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.given)}>{tag(it.whole, it.unit)}</text>
        {done && <text x={125} y={470} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.result)}>{tag(W2.res, it.unit) + " " + tx("left")}</text>}
      </g>
    );
    const scoop = (pay: any, j: number) => {
      if (V.placed.includes(pay.id)) return null;
      const x = 250, y = j ? 290 : 130, tr = follow(pay.id, x + 85, y + 58), lit = V.lit === pay.id;
      return (
        <g key={pay.id} transform={tr} {...(live ? { ...control(pay.id, tx(it.tags[j]) + ", " + tag(pay.v, it.unit)), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
          <rect x={x} y={y} width={170} height={116} rx={14} fill="#FFFFFF" stroke={lit ? MC_NOW : C.rule} strokeWidth={lit ? 4 : 2} filter={tr ? "url(#fLift)" : "url(#fShadowSoft)"} />
          <text x={x + 85} y={y + 38} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={quiet}>{tx(it.tags[j])}</text>
          <path d={`M ${x + 40} ${y + 52} Q ${x + 85} ${y + 76} ${x + 130} ${y + 52}`} fill="none" stroke={MC.given} strokeWidth={5} strokeLinecap="round" />
          <text x={x + 85} y={y + 102} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.given)}>{tag(pay.v, it.unit)}</text>
          {next === pay.id && <Invite x={x + 85} y={y + 58} r={70} C={C} />}
        </g>
      );
    };
    /* the Answer card: written on the lent pad in step 1, then dragged up into step 2 */
    const cardHome = { x: g1.l, y: g1.resB - 54, w: g1.r - g1.l, h: 76 };
    const cardTr = follow("card", cardHome.x + cardHome.w / 2, cardHome.y + 38);
    const litCard = V.lit === "card";
    const cardBody = !V.cardIn && (
      <g key="card" transform={cardTr}
        {...(cardLive ? { ...control("card", tx("Answer")), ...drag.bind({ kind: "card", id: "card" }),
          onKeyDown: (e: any) => { if (captured || (e.key !== "Enter" && e.key !== " ")) return; e.preventDefault(); e.stopPropagation(); if (!SR.current.cardOk) openCard(); else put({ cardIn: true, lit: null }); } } : {})}>
        <rect x={cardHome.x} y={cardHome.y} width={cardHome.w} height={cardHome.h} rx={12} fill={litCard ? tint(MC.now, 0.72) : "#FFFFFF"}
          stroke={V.typing ? C.accent : V.cardOk ? mcInk(MC.result) : litCard ? MC_NOW : shade(C.rule, 0.15)} strokeWidth={V.typing || V.cardOk || litCard ? 4 : 3}
          strokeDasharray={V.cardOk || V.typing || V.card ? undefined : "8 7"} filter={cardTr ? "url(#fLift)" : undefined} />
        {V.cardOk ? mcDigits(g1, V.card, g1.resB, mcInk(MC.result), C)
          : V.card ? <text x={cardHome.x + cardHome.w / 2} y={g1.resB} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{V.card}</text>
          : <text x={cardHome.x + cardHome.w / 2} y={g1.resB - 6} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("Answer")}</text>}
        {V.typing && <rect className="c4-caret" x={cardHome.x + cardHome.w / 2 + twide(V.card, T.speech) / 2 + 4} y={cardHome.y + 16} width={4} height={44} rx={2} fill={C.accent} />}
        {next === "card" && <Invite x={cardHome.x + cardHome.w / 2} y={cardHome.y + 38} r={66} C={C} />}
      </g>
    );
    return (
      <g>
        <rect x={0} y={0} width={W.w} height={W.h} fill="transparent" onPointerDown={giveBack} />
        {whole}
        {sc.map(scoop)}
        {box(452, 30, 310, 470, tx("Step 1"))}
        {box(778, 30, 308, 470, tx("Step 2"))}
        {inStep1.length > 0 && mcCol(g1, {
          rows: inStep1.map((r: any) => ({ s: r.v, op: "+", fill: mcInk(MC.given), lit: V.lit === r.id })), unit: tx(it.unit), C,
          res: both ? "none" : "none", work: W1, op: "+",
        })}
        {both && <line x1={g1.x + 4} y1={g1.ruleY} x2={g1.ux + 40} y2={g1.ruleY} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />}
        {both && V.cardIn && mcDigits(g1, V.card, g1.resB, mcInk(MC.result), C)}
        {both && V.cardIn && <text x={g1.ux} y={g1.resB} fontSize={T.label} fontWeight={500} fill={quiet}>{tx(it.unit)}</text>}
        {mcCol(g2, {
          rows: [{ s: it.whole, fill: mcInk(MC.given) }, V.cardIn ? { s: V.card, op: "−", fill: mcInk(MC.result), box: "card" } : { op: "−", box: "drop", lit: litCard }],
          unit: tx(it.unit), C, res: V.cardIn ? (tb ? "show" : "q") : "none", rs: W2.res, reveal: tb ? tb.k : 0, focus: tb ? tb.focus : null, work: W2, op: "−",
        })}
        {cardBody}
      </g>
    );
  };

  /* ── phase 3 ── */
  const listView = () => {
    const vals = it.lines.map((l: any) => l[1]);
    const W3 = W1;
    const gT = mcGeo(540, 40, W3.ip, W3.dp, 3), gC = mcGeo(824, 40, W3.ip, W3.dp, 3);
    const tb = V.tb;
    const keysLive = live && !busy;
    const next = !keysLive ? null : !V.tot ? "tot" : !V.chk ? "chk" : null;
    const line = (l: any, j: number) => {
      const y = 22 + j * 86, on = V.hl === j, miss = V.lit === "ln" + j;
      return (
        <g key={"ln" + j}>
          {(on || miss) && <rect x={10} y={y} width={480} height={76} rx={12} fill={tint(MC.now, 0.72)} stroke={miss ? MC_NOW : "none"} strokeWidth={3} />}
          <text x={30} y={y + 50} fontSize={T.label} fontWeight={500} fill={C.ink}>{tx(l[0])}</text>
          <text x={474} y={y + 50} textAnchor="end" fontSize={T.label} fontWeight={700} fill={mcInk(MC.given)}>{tag(l[1], it.unit)}</text>
        </g>
      );
    };
    const arrow = (up: boolean) => <path d={up ? "M 0 -12 L 10 4 L -10 4 Z" : "M 0 12 L 10 -4 L -10 -4 Z"} />;
    const keyFace = (label: string, up: boolean, on: boolean) => (
      <g>
        <text x={-14} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={on ? C.ink : quiet}>{label}</text>
        <g transform={`translate(${twide(label, T.label) / 2 + 8},0)`} fill={on ? C.ink : quiet}>{arrow(up)}</g>
      </g>
    );
    const totalBox = (x: number, label: string, show: boolean, lit: boolean) => (
      <g>
        <rect x={x} y={428} width={236} height={84} rx={14} fill="#FFFFFF" stroke={lit ? MC_NOW : C.rule} strokeWidth={lit ? 4 : 2} />
        <text x={x + 16} y={462} fontSize={T.micro} fontWeight={600} fill={quiet}>{label}</text>
        {show && <text x={x + 220} y={500} textAnchor="end" fontSize={T.label} fontWeight={700} fill={mcInk(MC.result)}>{tag(W3.res, it.unit)}</text>}
      </g>
    );
    return (
      <g>
        <rect x={0} y={8} width={500} height={276} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        {[1, 2].map((j) => <line key={j} x1={24} y1={18 + j * 86} x2={476} y2={18 + j * 86} stroke={tint(C.rule, 0.3)} strokeWidth={2} />)}
        {it.lines.map(line)}
        <Key id="total" label={tx("Total")} x={0} y={304} w={240} h={88} C={C} onClick={tapTot} disabled={!keysLive || V.tot}>{keyFace(tx("Total"), false, keysLive && !V.tot)}</Key>
        <Key id="check" label={tx("Check")} x={260} y={304} w={240} h={88} C={C} onClick={tapChk} disabled={!keysLive || V.chk}>{keyFace(tx("Check"), true, keysLive && !V.chk)}</Key>
        {next === "tot" && <Invite x={120} y={348} r={70} C={C} />}
        {next === "chk" && <Invite x={380} y={348} r={70} C={C} />}
        {totalBox(0, tx("Total"), done, V.lit === "tot")}
        {totalBox(264, tx("Check"), done || !!(tb && tb.chk), V.lit === "chk")}
        {box(522, 0, 274, 400, tx("Total"))}
        {box(806, 0, 280, 400, tx("Check"))}
        {V.tot && mcCol(gT, { rows: vals.map((s: string) => ({ s, op: "+", fill: mcInk(MC.given) })), unit: tx(it.unit), C,
          res: tb ? "show" : "q", rs: W3.res, reveal: tb ? tb.k : 0, focus: tb ? tb.focus : null, work: W3, op: "+" })}
        {V.chk && mcCol(gC, { rows: vals.slice().reverse().map((s: string) => ({ s, op: "+", fill: mcInk(MC.given) })), unit: tx(it.unit), C,
          res: tb && tb.chk ? "show" : "q", rs: W3.res, reveal: tb && tb.chk ? W3.nc : 0, work: mcWork(vals.slice().reverse(), "+"), op: "+" })}
      </g>
    );
  };

  /* ── phase 4 (and Free play's jug): the jug, marked in tenths of a litre ── */
  const jugScene = (lev: number, band: any, marks: number, endText: string | null, poured: boolean) => {
    const J = MC_JUG, ly = mcJugY(lev);
    const waterFill = poured ? tint(MC.result, 0.62) : tint(MC.given, 0.62);
    const base = Math.floor(lev / 100) * 100;
    const bTop = band ? mcJugY(Math.max(band.from, band.to)) : 0, bBot = band ? mcJugY(Math.min(band.from, band.to)) : 0;
    return (
      <g>
        <path d={`M ${J.x + J.w} ${J.y + 40} C ${J.x + J.w + 46} ${J.y + 40} ${J.x + J.w + 46} ${J.y + 170} ${J.x + J.w} ${J.y + 170}`} fill="none" stroke={shade(C.rule, 0.3)} strokeWidth={12} strokeLinecap="round" />
        <rect x={J.x} y={J.y - 22} width={J.w} height={J.h + 30} rx={18} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
        <rect x={J.x + 2} y={ly} width={J.w - 4} height={J.y + J.h - ly + 6} fill={waterFill} />
        <line x1={J.x + 2} y1={ly} x2={J.x + J.w - 2} y2={ly} stroke={poured ? mcInk(MC.result) : mcInk(MC.given)} strokeWidth={3} />
        {band && band.op === "−" && bBot - bTop > 4 && <rect x={J.x + 6} y={bTop} width={J.w - 12} height={bBot - bTop} fill={tint(MC.taken, 0.78)} stroke={mcInk(MC.taken)} strokeWidth={2} strokeDasharray="7 6" />}
        {!endText && band && band.op === "−" && bBot - bTop > 40 && <text x={J.x + J.w - 14} y={(bTop + bBot) / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={mcInk(MC.taken)}>{tx("Taken away")}</text>}
        {!endText && band && band.op === "+" && bBot - bTop > 40 && <text x={J.x + J.w - 14} y={(bTop + bBot) / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={mcInk(MC.given)}>{tx("Poured in")}</text>}
        {Array.from({ length: J.max * 10 + 1 }, (_, t) => {
          const y = mcJugY(t * 10), L = t % 10 === 0 ? 44 : t % 5 === 0 ? 26 : 16;
          const lit = marks > 0 && t * 10 > base && t * 10 <= base + marks * 10;
          return <line key={t} x1={J.x} y1={y} x2={J.x + L + (lit ? 10 : 0)} y2={y} stroke={lit ? MC_NOW : C.ink} strokeWidth={lit ? 6 : t % 10 === 0 ? 3.5 : 2} />;
        })}
        {Array.from({ length: J.max }, (_, m) => <text key={"l" + m} x={J.x + 52} y={mcJugY((m + 1) * 100) + 10} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tag(String(m + 1), "L")}</text>)}
        {poured && !endText && band && band.op === "−" && <text x={J.x + J.w - 14} y={ly + 40} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={mcInk(MC.result)}>{tx("Left")}</text>}
        {endText && <text x={J.x + J.w - 14} y={Math.min(ly + 42, J.y + J.h - 8)} textAnchor="end" fontSize={T.label} fontWeight={700} fill={mcInk(MC.result)}>{endText}</text>}
      </g>
    );
  };
  /* the cup (pours out, empty, rose when filled) and the bottle (pours in, full) */
  const pourPiece = (pay: any, x: number, y: number, on: boolean, used: boolean, inv: boolean) => {
    const tr = follow(pay.id, x + 85, y + 65);
    const out = pay.op === "−";
    return (
      <g key={pay.id} transform={tr} {...(on ? { ...control(pay.id, (out ? tx("cup") : tx("bottle")) + ", " + tag(pay.v, "L")), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
        <rect x={x} y={y} width={170} height={130} rx={14} fill="#FFFFFF" stroke={on ? C.rule : tint(C.rule, 0.3)} strokeWidth={2} filter={tr ? "url(#fLift)" : on ? "url(#fShadowSoft)" : undefined} />
        {out ? (
          <g>
            <path d={`M ${x + 52} ${y + 22} L ${x + 118} ${y + 22} L ${x + 110} ${y + 84} L ${x + 60} ${y + 84} Z`} fill={used ? tint(MC.taken, 0.55) : "#FFFFFF"} stroke={used ? mcInk(MC.taken) : C.ink} strokeWidth={3} strokeLinejoin="round" />
            <path d={`M ${x + 116} ${y + 36} C ${x + 136} ${y + 36} ${x + 136} ${y + 66} ${x + 112} ${y + 66}`} fill="none" stroke={C.ink} strokeWidth={3} />
          </g>
        ) : (
          <g>
            <path d={`M ${x + 76} ${y + 14} L ${x + 94} ${y + 14} L ${x + 94} ${y + 30} Q ${x + 112} ${y + 40} ${x + 112} ${y + 56} L ${x + 112} ${y + 84} L ${x + 58} ${y + 84} L ${x + 58} ${y + 56} Q ${x + 58} ${y + 40} ${x + 76} ${y + 30} Z`}
              fill={used ? "#FFFFFF" : tint(MC.given, 0.55)} stroke={used ? C.ink : mcInk(MC.given)} strokeWidth={3} strokeLinejoin="round" />
          </g>
        )}
        <text x={x + 85} y={y + 118} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={out ? mcInk(MC.taken) : mcInk(MC.given)}>{tag(pay.v, "L")}</text>
        {inv && <Invite x={x + 85} y={y + 65} r={72} C={C} />}
      </g>
    );
  };

  const jugView = () => {
    const pays = it.pours.map((q: any, j: number) => ({ kind: "pour", id: "p" + j, op: q[0], v: q[1] }));
    const two = it.pours.length > 1;
    const tb = V.tb;
    const lev = V.lev ?? mcUnits(it.start, 2);
    const p0 = V.poured.includes("p0"), p1 = V.poured.includes("p1");
    const canP1 = two ? V.cardOk : true;
    const g1 = mcGeo(530, 30, W1.ip, W1.dp, 2), g2 = two ? mcGeo(818, 30, W2.ip, W2.dp, 2) : null;
    const cellLive = two && asking && p0 && !V.cardOk && !busy;
    const next = !live || busy ? null : !p0 ? "p0" : two && !V.cardOk ? (asking ? "cell" : null) : two && !p1 ? "p1" : null;
    const cellHome = { x: g1.l, y: g1.resB - 54, w: g1.r - g1.l, h: 76 };
    const litCell = V.lit === "card";
    const cell = two && p0 && (
      <g key="cell" {...(cellLive ? { ...control("cell", tx("Answer")), ...drag.bind({ kind: "card", id: "cell" }),
        onKeyDown: (e: any) => { if (captured || (e.key !== "Enter" && e.key !== " ")) return; e.preventDefault(); e.stopPropagation(); openCard(); } } : {})}>
        <rect x={cellHome.x} y={cellHome.y} width={cellHome.w} height={cellHome.h} rx={12} fill={litCell ? tint(MC.now, 0.72) : "#FFFFFF"}
          stroke={V.typing ? C.accent : V.cardOk ? mcInk(MC.result) : shade(C.rule, 0.15)} strokeWidth={V.typing || V.cardOk ? 4 : 3}
          strokeDasharray={V.cardOk || V.typing || V.card ? undefined : "8 7"} />
        {V.cardOk ? mcDigits(g1, V.card, g1.resB, mcInk(MC.result), C)
          : V.card ? <text x={cellHome.x + cellHome.w / 2} y={g1.resB} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{V.card}</text>
          : <text x={cellHome.x + cellHome.w / 2} y={g1.resB - 6} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={quiet}>{tx("Answer")}</text>}
        {V.typing && <rect className="c4-caret" x={cellHome.x + cellHome.w / 2 + twide(V.card, T.speech) / 2 + 4} y={cellHome.y + 16} width={4} height={44} rx={2} fill={C.accent} />}
        {next === "cell" && <Invite x={cellHome.x + cellHome.w / 2} y={cellHome.y + 38} r={66} C={C} />}
      </g>
    );
    const opFill = (op: string) => (op === "−" ? mcInk(MC.taken) : mcInk(MC.given));
    return (
      <g>
        <rect x={0} y={0} width={W.w} height={W.h} fill="transparent" onPointerDown={giveBack} />
        {pays.map((pay: any, j: number) => {
          const used = V.poured.includes(pay.id);
          const on = (live || free) && !used && !busy && (j === 0 || canP1);
          return pourPiece(pay, 16, j ? 300 : 110, on, used, next === pay.id);
        })}
        {jugScene(lev, V.band, tb ? tb.marks || 0 : 0, done ? tag(finalW.res, "L") : null, V.poured.length > 0)}
        {box(510, 0, two ? 276 : 300, 430, two ? tx("Step 1") : undefined)}
        {two && box(798, 0, 288, 430, tx("Step 2"))}
        {mcCol(g1, {
          rows: [{ s: it.start, fill: mcInk(MC.given) }, ...(p0 ? [{ s: it.pours[0][1], op: it.pours[0][0], fill: opFill(it.pours[0][0]) }] : [])], unit: tx("L"), C,
          res: !p0 ? "none" : two ? "none" : tb ? "show" : "q", rs: W1.res, reveal: tb ? tb.k : 0, focus: tb && !two ? tb.focus : null, work: W1, op: it.pours[0][0],
        })}
        {two && p0 && <line x1={g1.x + 4} y1={g1.ruleY} x2={g1.ux + 40} y2={g1.ruleY} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />}
        {cell}
        {two && V.cardOk && g2 && mcCol(g2, {
          rows: [{ s: V.card, fill: mcInk(MC.result), box: "card" }, ...(p1 ? [{ s: it.pours[1][1], op: it.pours[1][0], fill: opFill(it.pours[1][0]) }] : [])], unit: tx("L"), C,
          res: !p1 ? "none" : tb ? "show" : "q", rs: W2.res, reveal: tb ? tb.k : 0, focus: tb ? tb.focus : null, work: W2, op: it.pours[1][0],
        })}
      </g>
    );
  };

  /* ── Free play: rope on the tape, bags on the scale, or water in the jug; the strip adds as you go ── */
  const freeView = () => {
    const sc = S.scene;
    const tab = (id: string, label: string, x: number) => (
      <Key key={id} id={"tab-" + id} label={label} x={x} y={0} w={106} h={80} C={C} primary={sc === id}
        onClick={() => { tlAn.stop(); put({ scene: id, fplaced: [], flev: 100, fpours: [], fband: null }); }}>
        <text x={0} y={11} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={sc === id ? "#FFFFFF" : C.ink}>{label}</text>
      </Key>
    );
    const unit = sc === "bags" ? "kg" : sc === "jug" ? "L" : "m";
    let rows: any[] = [], total = "";
    if (sc === "jug") {
      rows = [{ s: "1.00", fill: mcInk(MC.given) }, ...S.fpours.map((q: any) => ({ s: q[1], op: q[0], fill: q[0] === "−" ? mcInk(MC.taken) : mcInk(MC.given) }))];
      total = mcStr(S.fpours.reduce((a: number, q: any) => a + (q[0] === "+" ? 1 : -1) * mcUnits(q[1], 2), 100), 2);
    } else {
      const vals = (sc === "bags" ? MC_FREE.bags : MC_FREE.rope);
      const pv = S.fplaced.map((id: string) => vals[Number(id.split("-")[2])]);
      rows = pv.map((s: string) => ({ s, op: "+", fill: mcInk(MC.given) }));
      total = pv.length ? mcStr(pv.reduce((a: number, s: string) => a + mcUnits(s, 2), 0), 2) : "";
    }
    const g = mcGeo(764, 96, 1, 2, Math.max(rows.length, 1));
    const vals = sc === "bags" ? MC_FREE.bags : MC_FREE.rope;
    const list = vals.map((v, j) => ({ kind: "pc", id: "f-" + sc + "-" + j, v, u: unit, look: sc === "bags" ? "sack" : "coil" }));
    return (
      <g>
        {tab("rope", tx("Rope"), 744)}{tab("bags", tx("Bags"), 862)}{tab("jug", tx("Jug"), 980)}
        {box(740, 96, 346, 432)}
        {rows.length > 0 && mcCol(g, { rows, unit: tx(unit), C, res: rows.length > 1 ? "show" : "none", rs: total, reveal: 9 })}
        {sc === "jug" ? (
          <g>
            {pourPiece({ kind: "pour", id: "f-cup", op: "−", v: "0.25" }, 16, 110, S.flev >= 25 && S.fpours.length < 4, false, false)}
            {pourPiece({ kind: "pour", id: "f-bottle", op: "+", v: "0.5" }, 16, 300, S.flev <= 150 && S.fpours.length < 4, false, false)}
            {jugScene(S.flev, S.fband, 0, null, S.fpours.length > 0)}
          </g>
        ) : (
          <g>
            {trayRow(list, S.fplaced, null)}
            {sc === "bags" ? scaleScene(S.fplaced.map((id: string) => vals[Number(id.split("-")[2])]), "kg", false, "")
              : tapeScene(S.fplaced.map((id: string) => vals[Number(id.split("-")[2])]), "m", false)}
          </g>
        )}
      </g>
    );
  };

  /* the running count: how many rows the column strip holds (never a score) */
  const runs = !free && k && (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={34} y={-40} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{rowsWritten}</text>
      <text x={70} y={-46} fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("steps written")}</text>
    </g>
  );

  return (
    <g>
      {runs}
      {free ? freeView() : k === "join" ? joinView() : k === "chain" ? chainView() : k === "list" ? listView() : k === "jug" ? jugView() : null}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: its measure and unit in green */
function Thumb({ result, C, w, h, n, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const p: any = PHASES[(n || 1) - 1] || PHASES[0];
  const itm: any = (p.items || [])[last.item] || {};
  const unit = itm.unit || "";
  const ink = shade(CONTENT.one, 0.25);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <g transform={`translate(34,${h / 2})`} fill="none" stroke={shade(CONTENT.hundred, 0.25)} strokeWidth={4} strokeLinecap="round">
        {itm.kind === "jug" ? <path d="M -14 -22 L 14 -22 L 14 22 L -14 22 Z M -14 4 L 14 4" />
          : itm.kind === "list" ? <path d="M -16 -16 L 16 -16 M -16 0 L 16 0 M -16 16 L 16 16" />
          : <path d="M -18 10 L 18 10 M -18 10 L -18 0 M 0 10 L 0 4 M 18 10 L 18 0" />}
      </g>
      <text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={ink}>{String(last.value) + " " + tx(unit)}</text>
    </g>
  );
}

function MeasureChain(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      pointKey: true, judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default MeasureChain;
