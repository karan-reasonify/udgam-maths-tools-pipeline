/* ═══ M1.S1.T2.C8.2D1 · metric_chart · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide (it instructs; after a wrong act or answer the hint shows UNDER the
   pinned instruction and stays until the child acts again; r34). The lesson is action-driven: nothing moves
   on unless the child acts (a tap, a key, an answer); after a right answer the next question follows its
   short celebration by itself. The header's Hint key (r35) shows the hint on demand.
   This template is the FULL NEW STYLE and is used for a chapter whose pinned runtime is silent (a voiced runtime, r21
   and before, is scaffolded from lib/build/skeleton.voiced.tsx instead). Blocks that a given runtime has no support for
   are left out when `scaffold` writes this file (board, start page, theme).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing).
   THE NEW LOOK (the owner, 2026-10-16; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar (only the blinking key at the top
   right), four small clickable phase dots, a big ONE-sentence bubble, digits as written, every act performed on screen (api.act). The question
   lives ONLY in the bubble: each item's `say` is the whole question in one sentence. Opt out (delete `keyOnly: true` / `navDots: true` below)
   only with a reason stated in the report.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "metric_chart";
const MEDIA_ID = "M1.S1.T2.C8.2D1";
const TOOL_NAME = "Chart Builder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A chart of units, waiting to be built."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You built the chart and read a measure off it, with its unit.";
/* printed when the child opens Free play (the plan's free-play line, made to say what free play offers); its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Tap a column to change its digit, then tap a gap to set the point.";

/* ── the tool's own data: the metric chart, the things to measure, the chapter's content colours ───────────── */
/* seven columns from kilo to milli; "" is the base unit's column (metre, gram, litre) */
const MC_PRE = ["kilo", "hecto", "deca", "", "deci", "centi", "milli"];
const MC_ROW: any = {
  length: ["km", "hm", "dam", "m", "dm", "cm", "mm"],
  weight: ["kg", "hg", "dag", "g", "dg", "cg", "mg"],
  capacity: ["kL", "hL", "daL", "L", "dL", "cL", "mL"],
};
const MC_ROWS = ["length", "weight", "capacity"];
/* the chapter's colours (brief): given deep blue, answer green, move vermilion, unit violet, the unit worked on amber, place holder grey */
const MC_C = { given: "#1F4E9A", answer: "#1E7A3C", move: "#B44700", unit: "#6B3FA0", now: "#E69F00", nowInk: "#7A5000", zero: "#767676" };
/* phase 1: the three standard unit cards and the things to sort onto them */
const MC_UNITS = [
  { id: "m", sym: "m", name: "metre", what: "Length" },
  { id: "kg", sym: "kg", name: "kilogram", what: "Weight" },
  { id: "L", sym: "L", name: "litre", what: "Capacity" },
];
const MC_THING: any = { ribbon: "ribbon", rice: "bag of rice", milk: "jug of milk", bucket: "bucket of water", hose: "garden hose", pumpkin: "pumpkin",
  tank: "tank of water", playground: "playground", potatoes: "bag of potatoes" };
/* the guide steps' warm-up things: none of them is a question's own thing */
const MC_STEP_THINGS = ["ribbon", "rice", "milk"];
const MC_STEP_HOME: any = { ribbon: "m", rice: "kg", milk: "L" };
/* phase 2: the cards the guide steps turn; phase 3 and 4: the guide steps' own rows */
const MC_P2_STEP = ["deci", "centi", "milli"];
const MC_DEMO3 = { kind: "step", row: "weight", from: 3, to: 1 };
const MC_DEMO4 = { kind: "read", row: "weight", digits: [3, 4, 7, 5, null, null, null], at: 0 };
/* a prefix card's worth against the base unit: [top, bottom] (times on the left, a stacked fraction on the right) */
const MC_WORTH: any = { kilo: ["1,000", "times"], hecto: ["100", "times"], deca: ["10", "times"], deci: ["1", "10"], centi: ["1", "100"], milli: ["1", "1000"] };
const mcPairs = (s: any) => { const o: any = {}; String(s ?? "").split(",").forEach((p) => { const [a, b] = p.split(":"); if (a) o[a] = b || ""; }); return o; };
/* a label's width in em as Poppins draws it (bold), on the safe side, measured on the Hindi sheets: a Latin letter or digit 0.56;
   a Devanagari or Gujarati letter 0.80; a vowel sign that takes room of its own (ा ि ी ो ौ, ા િ ી ો ૌ) 0.40; a sign that sits on its
   letter (े ै ु ू ं) nothing; a letter before a virama is a half letter (0.45), and a ra after one is the small rakar stroke (0.10) */
const MC_ZW = /[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/;
const MC_SP = /[ःा-ीॉ-ौઃા-ીૉોૌ]/;
const MC_IND = /[ऀ-ॿ઀-૿]/;
const mcEm = (s: any) => {
  const cs = Array.from(String(s));
  let em = 0;
  /* measured in headless Chrome at 28 bold (2026-10-18): Gujarati letters run about a quarter narrower than Devanagari, and a space
     or a comma about half a letter: डेकाली 3.16 em, ડેસીગ્રા 2.61 em, "1 किमी = 1,000 मी" 8.19 em */
  cs.forEach((ch: string, k: number) => {
    const gu = ch >= "઀" && ch <= "૿";
    const ra = (ch === "र" || ch === "ર") && k > 0 && (cs[k - 1] === "्" || cs[k - 1] === "્");
    const half = MC_IND.test(ch) && (cs[k + 1] === "्" || cs[k + 1] === "્") && !(cs[k + 2] === "र" || cs[k + 2] === "ર");
    em += MC_ZW.test(ch) ? 0 : MC_SP.test(ch) ? (gu ? 0.3 : 0.4) : ra ? (gu ? 0.25 : 0.1) : half ? (gu ? 0.42 : 0.45)
      : MC_IND.test(ch) ? (gu ? 0.72 : 0.8) : ch === " " || ch === "," || ch === "." ? 0.28 : 0.56;
  });
  return em;
};
/* the biggest size up to `max` at which `s` fits `w`, never under the 28 floor */
const mcFit = (s: any, w: number, max: number) => Math.max(T.micro, Math.min(max, w / Math.max(0.5, mcEm(s))));
/* a row of digits read as one decimal with the point after column p (empty columns inside it are zeros holding a place) */
const mcRead = (digits: any[], p: any) => {
  const has = digits.map((d, i) => (d === null || d === undefined ? -1 : i)).filter((i) => i >= 0);
  if (!has.length) return "";
  const pp = p === null || p === undefined ? has[has.length - 1] : p;
  let a = "", b = "";
  for (let i = Math.min(has[0], pp); i <= pp; i++) a += digits[i] ?? 0;
  for (let i = pp + 1; i <= has[has.length - 1]; i++) b += digits[i] ?? 0;
  a = a.replace(/^0+(?=\d)/, "");
  return b ? a + "." + b : a;
};
/* the facts a right answer stands for, as the picture writes them ("1 hg = 100 g"); every unit through tx */
const mcFacts = (it: any, tx: any, v?: any) => {
  const sy = (row: string, c: number) => tx(MC_ROW[row][c]);
  if (it.kind === "sort") { const a = mcPairs(it.answer); return [it.things.map((t: string) => tx(a[t])).join("   ")]; }
  if (it.kind === "prefix") { const c = MC_PRE.indexOf(it.pre); return ["1 " + sy(it.row, c) + " = " + indian(Math.pow(10, 3 - c)) + " " + sy(it.row, 3)]; }
  if (it.kind === "step") {
    const d = it.from - it.to, all = "1 " + sy(it.row, it.to) + " = " + indian(Math.pow(10, d)) + " " + sy(it.row, it.from);
    if (it.asks === "next+to") return ["1 " + sy(it.row, it.from - 1) + " = 10 " + sy(it.row, it.from), all];
    if (it.asks === "places+to") return [d + " " + tx("places"), all];
    return [all];
  }
  if (it.kind === "read") return [String(v !== undefined && v !== null && v !== "" ? v : it.answer) + " " + sy(it.row, it.at)];
  return [];
};

/* a fact "1 hg = 100 g" drawn as two short labels on one line ("1 hg =" and "100 g"), centred on x or starting at it */
function MCFact({ f, x, y, fs, fill, centre }: any) {
  const i = String(f).indexOf(" = ");
  const a = i < 0 ? String(f) : String(f).slice(0, i + 2), b = i < 0 ? "" : String(f).slice(i + 3);
  const wa = mcEm(a) * fs, gap = 0.36 * fs, wb = mcEm(b) * fs;
  const x0 = centre ? x - (wa + gap + wb) / 2 : x;
  return (
    <g pointerEvents="none">
      <text x={x0} y={y} fontSize={fs} fontWeight={700} fill={fill}>{a}</text>
      {b && <text x={x0 + wa + gap} y={y} fontSize={fs} fontWeight={700} fill={fill}>{b}</text>}
    </g>
  );
}

/* a thing to measure, drawn in code in its box (the image pass may lay a <Skin> over it later) */
function MCThing({ id, x, y, w, h }: any) {
  const s = Math.min(w, h) / 140;
  const ink = "#5A3A12";
  const g = (kids: any) => <g transform={`translate(${x + w / 2},${y + h / 2}) scale(${s})`} pointerEvents="none">{kids}</g>;
  /* a thing with a picture shows the picture alone (the cut-outs would let a plain shape show round them); the plain shape is drawn
     only when there is no picture (no images.tsx, or skins turned off) */
  const pic = (k: string) => typeof TOOL_IMAGES !== "undefined" && !!(TOOL_IMAGES as any)[k] && SKINS;
  if (id === "ribbon") return g(pic("ribbon") ? <Skin name="ribbon" x={-68} y={-16} w={136} h={32} /> : <g>
    <rect x={-68} y={-16} width={136} height={32} rx={5} fill="#E8B341" stroke="#9A6A10" strokeWidth={3} />
    <path d="M -60 -7 H 60" stroke="#FFF2C8" strokeWidth={4} strokeLinecap="round" />
  </g>);
  /* the rice picture is a plain jute sack with no label, so the bag of potatoes wears it too */
  if ((id === "rice" || id === "potatoes") && pic("rice")) return g(<Skin name="rice" x={-54} y={-68} w={108} h={135} />);
  if (id === "rice" || id === "potatoes") return g(<g>
    <path d="M -42 -34 Q -56 12 -46 50 Q 0 62 46 50 Q 56 12 42 -34 Q 20 -26 0 -28 Q -20 -26 -42 -34 Z" fill={id === "rice" ? "#D2AE6E" : "#A8763E"} stroke={ink} strokeWidth={3} />
    <path d="M -24 -42 Q 0 -34 24 -42" stroke={ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    {id === "rice" ? <path d="M -20 -44 Q -10 -64 0 -52 Q 10 -66 20 -44" fill="#F4ECD8" stroke={ink} strokeWidth={3} />
      : <g><ellipse cx={-14} cy={-50} rx={16} ry={12} fill="#C9A060" stroke={ink} strokeWidth={3} /><ellipse cx={12} cy={-52} rx={15} ry={11} fill="#BE9454" stroke={ink} strokeWidth={3} /></g>}
    <path d="M -30 0 Q 0 8 30 0 M -34 22 Q 0 30 34 22" stroke={ink} strokeWidth={2} fill="none" />
  </g>);
  if (id === "bucket") return g(pic("bucket") ? <Skin name="bucket" x={-67} y={-50} w={135} h={110} /> : <g>
    <path d="M -52 -30 L -40 50 Q 0 60 40 50 L 52 -30 Z" fill="#D9A441" stroke="#8A5E12" strokeWidth={3} />
    <ellipse cx={0} cy={-30} rx={52} ry={13} fill="#7FC3E8" stroke="#8A5E12" strokeWidth={3} />
    <path d="M -26 -32 Q -10 -26 6 -32" stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" />
  </g>);
  if (id === "milk") return g(<g>
    <path d="M 26 -26 Q 64 -20 56 14 Q 50 34 30 36" stroke="#2F6F95" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M -38 -46 L 30 -46 L 38 52 Q 0 62 -40 52 Z" fill="#FFFFFF" stroke="#2F6F95" strokeWidth={3} />
    <path d="M -38 -46 L -54 -60 L -30 -50 Z" fill="#FFFFFF" stroke="#2F6F95" strokeWidth={3} strokeLinejoin="round" />
    <path d="M -37 -20 L 32 -20 L 33 -6 L -37 -6 Z" fill="#7FB6D8" />
  </g>);
  if (id === "hose") return g(<g>
    <circle r={48} fill="none" stroke="#2E8B3E" strokeWidth={11} />
    <circle r={31} fill="none" stroke="#3FA34F" strokeWidth={11} />
    <circle r={14} fill="none" stroke="#2E8B3E" strokeWidth={11} />
    <rect x={44} y={-7} width={24} height={14} rx={4} fill="#5B6770" stroke="#2B2B2B" strokeWidth={2} />
  </g>);
  if (id === "pumpkin") return g(<g>
    <ellipse cx={-24} cy={10} rx={30} ry={42} fill="#E07A22" stroke="#9A4A0E" strokeWidth={3} />
    <ellipse cx={24} cy={10} rx={30} ry={42} fill="#E07A22" stroke="#9A4A0E" strokeWidth={3} />
    <ellipse cx={0} cy={10} rx={30} ry={46} fill="#F0943A" stroke="#9A4A0E" strokeWidth={3} />
    <path d="M -2 -32 Q 2 -52 14 -58" stroke="#3E7A2A" strokeWidth={9} fill="none" strokeLinecap="round" />
  </g>);
  if (id === "tank") return g(<g>
    <ellipse cx={0} cy={46} rx={46} ry={11} fill="#9CC9E6" stroke="#2F6F95" strokeWidth={3} />
    <rect x={-46} y={-42} width={92} height={88} fill="#9CC9E6" />
    <path d="M -46 -42 V 46 M 46 -42 V 46" stroke="#2F6F95" strokeWidth={3} />
    <path d="M -46 2 Q 0 14 46 2" stroke="#2F6F95" strokeWidth={2.5} fill="none" />
    <ellipse cx={0} cy={-42} rx={46} ry={11} fill="#CFE6F5" stroke="#2F6F95" strokeWidth={3} />
    <rect x={46} y={26} width={16} height={9} rx={2} fill="#5B6770" />
  </g>);
  if (id === "playground") return g(<g>
    <rect x={-68} y={-24} width={136} height={70} rx={10} fill="#8BC34A" stroke="#3E7A2A" strokeWidth={3} />
    <path d="M -44 34 V -44 H -24 L 28 34" stroke="#2B2B2B" strokeWidth={4} fill="none" strokeLinejoin="round" />
    <path d="M -44 -24 H -30 M -44 -4 H -30 M -44 16 H -30" stroke="#2B2B2B" strokeWidth={3} />
    <circle cx={46} cy={-20} r={16} fill="#3E7A2A" />
    <rect x={43} y={-6} width={6} height={22} fill="#7A4E22" />
  </g>);
  return null;
}

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c): the metric chart itself, seven columns from kilo to milli around the base
   unit, with its three rows of unit names. START_HOOK is ONE printed line to wonder at. */
const START_HOOK = "A chart of units, waiting to be built.";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const cw = Math.min(160, (box.w - 40) / 7), x0 = (box.w - 7 * cw) / 2;
  return (
    <g>
      {MC_PRE.map((p, c) => (
        <g key={"h" + c}>
          <rect x={x0 + c * cw + 4} y={6} width={cw - 8} height={86} rx={14} fill={c === 3 ? tint(MC_C.now, 0.75) : "#FFFFFF"} stroke={c === 3 ? C.ink : C.rule} strokeWidth={c === 3 ? 4 : 2.5} />
          <text x={x0 + c * cw + cw / 2} y={60} textAnchor="middle" fontSize={mcFit(tx(c === 3 ? "base" : p), cw - 20, T.label)} fontWeight={700} fill={C.ink}>{tx(c === 3 ? "base" : p)}</text>
        </g>))}
      {MC_ROWS.map((r, ri) => MC_ROW[r].map((s: string, c: number) => (
        <g key={r + c}>
          <rect x={x0 + c * cw + 4} y={104 + ri * 78} width={cw - 8} height={70} rx={12} fill="#FFFFFF" stroke={c === 3 ? C.ink : C.rule} strokeWidth={c === 3 ? 4 : 2} />
          <text x={x0 + c * cw + cw / 2} y={152 + ri * 78} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={MC_C.unit}>{tx(s)}</text>
        </g>)))}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each printed or drawn line
   up in it (Work draws its own words through tx("...")). Fill it AFTER the English is final and reviewed:
   `check` (tr-coverage) lists every printed line still missing. Nothing is baked: the lesson is silent.
   Empty = the tool runs in English only. */
/* terms: standard unit मानक इकाई / પ્રમાણિત એકમ · base unit आधार इकाई / મૂળ એકમ · length लंबाई / લંબાઈ · weight भार / વજન ·
   capacity धारिता / ક્ષમતા · the point दशमलव / દશાંશ ચિહ્ન · a decimal दशमलव संख्या / દશાંશ સંખ્યા · times गुना / ગણું ·
   prefixes किलो हेक्टो डेका डेसी सेंटी मिली / કિલો હેક્ટો ડેકા ડેસી સેન્ટિ મિલિ · a column खाना / ખાનું · tap a piece छुओ / અડકો,
   press a key दबाओ / દબાવો. Unit symbols in the script (किमी, किग्रा, ली / કિમી, કિગ્રા, લિ), digits stay digits. The win lines,
   the picture's words, the prefixes, units and things are listed by hand (tr-coverage cannot see them). */
const TR: any = {
  hi: {
    "Chart Builder": "चार्ट बनाओ",
    "Standard units": "मानक इकाइयाँ",
    "Prefixes and the base unit": "उपसर्ग और आधार इकाई",
    "Ten times the unit to its right": "दाईं ओर की इकाई का दस गुना",
    "A measure on the chart": "चार्ट पर एक माप",
    "A chart of units, waiting to be built.": "इकाइयों का एक चार्ट, जो अभी बनाना है।",
    "Free play. Tap a column to change its digit, then tap a gap to set the point.": "खुला खेल। किसी खाने को छूकर उसका अंक बदलो, फिर खाली जगह छूकर दशमलव लगाओ।",
    /* phase 1 */
    "A ribbon is measured along its length, so tap it to put it on the metre.": "रिबन को उसकी लंबाई में मापते हैं, इसलिए उसे छूकर मीटर पर रखो।",
    "Tap the ribbon, the first thing in the tray.": "ट्रे की पहली चीज़, रिबन को छुओ।",
    "The kilogram, not the gram, is the standard unit of weight, so tap the rice.": "भार की मानक इकाई ग्राम नहीं, किलोग्राम है, इसलिए चावल को छुओ।",
    "Tap the bag of rice in the tray.": "ट्रे में चावल के थैले को छुओ।",
    "Milk is poured, so its capacity is measured in litres: tap the jug.": "दूध उँडेला जाता है, इसलिए उसकी धारिता लीटर में मापते हैं, जग को छुओ।",
    "Tap the jug of milk.": "दूध के जग को छुओ।",
    "The metre measures length, the kilogram weight, the litre what you pour.": "मीटर लंबाई मापता है, किलोग्राम भार, और लीटर जो उँडेलते हैं।",
    "Long things on the metre, heavy things on the kilogram, water on the litre.": "लंबी चीज़ें मीटर पर, भारी चीज़ें किलोग्राम पर, पानी लीटर पर।",
    "The metre, kilogram and litre measure length, weight and capacity.": "मीटर, किलोग्राम और लीटर लंबाई, भार और धारिता मापते हैं।",
    "You learned: the metre, kilogram and litre are the standard units.": "तुमने सीखा: मीटर, किलोग्राम और लीटर मानक इकाइयाँ हैं।",
    "Drop each on its standard unit: a hose, a pumpkin and the water in a tank.": "हर चीज़ को उसकी मानक इकाई पर रखो: पाइप, कद्दू और टंकी का पानी।",
    "Hose, pumpkin, tank?": "पाइप, कद्दू, टंकी?",
    "A hose is long, a pumpkin is heavy and the tank holds water.": "पाइप लंबा है, कद्दू भारी है और टंकी में पानी है।",
    "Yes, each thing is on its own unit.": "हाँ, हर चीज़ अपनी इकाई पर है।",
    "Which standard unit would you use to measure the length of a playground?": "खेल के मैदान की लंबाई मापने के लिए कौन-सी मानक इकाई लोगे?",
    "A playground?": "खेल का मैदान?",
    "You walk along a playground from one end to the other.": "खेल के मैदान में तुम एक छोर से दूसरे छोर तक चलते हो।",
    "Yes, a playground is measured in metres.": "हाँ, खेल का मैदान मीटर में मापा जाता है।",
    "Which standard unit fits a bucket of water, and which a bag of potatoes?": "पानी की बाल्टी के लिए कौन-सी मानक इकाई, और आलू के थैले के लिए कौन-सी?",
    "Bucket, potatoes?": "बाल्टी, आलू?",
    "Water goes in the bucket, but a bag of potatoes is lifted to weigh it.": "बाल्टी में पानी भरते हैं, पर आलू का थैला तौलने के लिए उठाते हैं।",
    "Yes, litres for water, kilograms for potatoes.": "हाँ, पानी के लिए लीटर, आलू के लिए किलोग्राम।",
    "Put every thing on a card first.": "पहले हर चीज़ को किसी कार्ड पर रखो।",
    /* phase 2 */
    "Turn the deci card, just right of the base unit, to see what it is worth.": "आधार इकाई के ठीक दाईं ओर का डेसी कार्ड पलटो और उसका मान देखो।",
    "Tap the card next to the base unit, on its right.": "आधार इकाई के दाईं ओर वाले कार्ड को छुओ।",
    "Turn the centi card, the next one to the right.": "अब दाईं ओर का अगला कार्ड, सेंटी, पलटो।",
    "Tap the card two places right of the base unit.": "आधार इकाई से दो खाने दाईं ओर वाले कार्ड को छुओ।",
    "Turn milli: cards on the right show parts, cards on the left show times.": "मिली पलटो: दाईं ओर के कार्ड भाग दिखाते हैं, बाईं ओर के कार्ड गुना।",
    "Tap the last card on the right.": "दाईं ओर के आख़िरी कार्ड को छुओ।",
    "Each card on the left matches the card as far away on the right.": "बाईं ओर का हर कार्ड दाईं ओर उतनी ही दूर वाले कार्ड से मेल खाता है।",
    "Take the number on the partner card and say it as times.": "जोड़ीदार कार्ड की संख्या लो और उसे गुना में बोलो।",
    "Added to the base unit, kilo to deca make bigger units, deci to milli smaller.": "आधार इकाई में जुड़कर किलो से डेका बड़ी इकाइयाँ बनाते हैं, डेसी से मिली छोटी।",
    "You learned: kilo to deca make bigger units, deci to milli smaller ones.": "तुमने सीखा: किलो से डेका बड़ी, डेसी से मिली छोटी इकाइयाँ बनाते हैं।",
    "What does hecto mean, and how many grams make 1 hg?": "हेक्टो का क्या अर्थ है, और कितने ग्राम से 1 हेग्रा बनता है?",
    "Grams in 1 hg?": "1 हेग्रा में ग्राम?",
    "Hecto is left of the base unit, the gram, so a hectogram is bigger.": "हेक्टो आधार इकाई ग्राम के बाईं ओर है, इसलिए हेक्टोग्राम बड़ा है।",
    "Yes, 100 g make 1 hg.": "हाँ, 100 ग्रा से 1 हेग्रा बनता है।",
    "What does deca mean, and how many litres make 1 daL?": "डेका का क्या अर्थ है, और कितने लीटर से 1 डेकाली बनता है?",
    "Litres in 1 daL?": "1 डेकाली में लीटर?",
    "Deca sits just left of the litre column, so a decalitre is more than a litre.": "डेका लीटर वाले खाने के ठीक बाईं ओर है, इसलिए डेकालीटर लीटर से बड़ा है।",
    "Yes, 10 L make 1 daL.": "हाँ, 10 ली से 1 डेकाली बनता है।",
    "Which is the largest unit of length in the chart, and how many metres make one?": "लंबाई की सबसे बड़ी इकाई कौन-सी है, और उसमें कितने मीटर होते हैं?",
    "Metres in the largest?": "सबसे बड़ी में मीटर?",
    "The largest unit of length sits at the far left of the length row.": "लंबाई की सबसे बड़ी इकाई लंबाई वाली पंक्ति में सबसे बाईं ओर है।",
    "Yes, 1,000 m make 1 km.": "हाँ, 1,000 मी से 1 किमी बनता है।",
    /* phase 3 */
    "Tap Step left and watch the grams close up into one bigger unit.": "बाएँ चलो दबाओ और देखो, ग्राम मिलकर एक बड़ी इकाई बनते हैं।",
    "Tap the Step left key under the row.": "पंक्ति के नीचे बाएँ चलो बटन दबाओ।",
    "Tap Step left again to go one more place to the left.": "एक खाना और बाईं ओर जाने के लिए फिर से बाएँ चलो दबाओ।",
    "Press Step left once more.": "एक बार और बाएँ चलो दबाओ।",
    "Each Step left joins the same number of small bars into one: count them.": "हर बार बाएँ चलने पर उतनी ही छोटी पट्टियाँ मिलकर एक बनती हैं: उन्हें गिनो।",
    "For two steps that number comes twice over, so multiply, never add.": "दो कदमों में वह संख्या दो बार आती है, इसलिए गुणा करो, जोड़ो नहीं।",
    "Each unit is 10 times the unit to its right, and 1/10 of the unit to its left.": "हर इकाई दाईं ओर की इकाई की 10 गुना और बाईं ओर की इकाई का दसवाँ भाग है।",
    "You learned: each unit is 10 times the unit to its right.": "तुमने सीखा: हर इकाई अपनी दाईं ओर की इकाई की 10 गुना है।",
    "On the capacity row, how many centilitres make 1 dL, and how many make 1 litre?": "धारिता की पंक्ति में कितने सेंटीलीटर से 1 डेसीली बनता है, और कितने से 1 लीटर?",
    "cL in 1 dL, in 1 L?": "1 डेसीली में, 1 ली में सेली?",
    "A litre is two places left of cL, so press Step left twice.": "लीटर सेली से दो खाने बाईं ओर है, इसलिए बाएँ चलो दो बार दबाओ।",
    "Yes, 10 cL in 1 dL, 100 cL in 1 L.": "हाँ, 1 डेसीली में 10 सेली, 1 ली में 100 सेली।",
    "in 1 dL": "1 डेसीली में",
    "in 1 L": "1 ली में",
    "in 1 m": "1 मी में",
    "How many millilitres make 1 cL?": "कितने मिलीलीटर से 1 सेली बनता है?",
    "mL in 1 cL?": "1 सेली में मिली?",
    "Press Step left once and watch the mL bars close up into one cL.": "बाएँ चलो एक बार दबाओ और देखो, मिली की पट्टियाँ मिलकर एक सेली बनती हैं।",
    "Count the small mL bars that closed up into the one cL bar.": "जो छोटी मिली पट्टियाँ मिलकर एक सेली पट्टी बनीं, उन्हें गिनो।",
    "The cL bar is split into equal mL parts: count every part.": "सेली की पट्टी बराबर मिली भागों में बँटी है: हर भाग गिनो।",
    "Yes, 10 mL make 1 cL.": "हाँ, 10 मिली से 1 सेली बनता है।",
    "How many places is it from mm to m, and how many millimetres make 1 m?": "मिमी से मी तक कितने खाने हैं, और कितने मिलीमीटर से 1 मी बनता है?",
    "Places, mm in 1 m?": "खाने, 1 मी में मिमी?",
    "Press Step left until the marker reaches m, counting each press.": "निशान के मी तक पहुँचने तक बाएँ चलो दबाओ, और हर बार गिनो।",
    "Each press joins the same number of bars into one, so count those bars too.": "हर बार दबाने पर उतनी ही पट्टियाँ मिलकर एक बनती हैं, उन्हें भी गिनो।",
    "Multiply that number by itself, once for every press you counted.": "उस संख्या को उतनी बार गुणा करो जितनी बार तुमने दबाया।",
    "Yes, 3 places, so 1,000 mm in 1 m.": "हाँ, 3 खाने, इसलिए 1 मी में 1,000 मिमी।",
    /* phase 4 */
    "Tap Drop to put one digit under each unit of 3 kg 4 hg 7 dag 5 g.": "रखो दबाओ, 3 किग्रा 4 हेग्रा 7 डेकाग्रा 5 ग्रा के अंक इकाइयों के नीचे जाएँगे।",
    "Tap the Drop key at the bottom.": "नीचे रखो बटन दबाओ।",
    "Now tap the gap just after the kg digit to set the point there.": "अब किग्रा के अंक के ठीक बाद वाली खाली जगह छुओ, वहाँ दशमलव लगेगा।",
    "Find the kg column and tap just to its right.": "किग्रा का खाना ढूँढो और उसके ठीक दाईं ओर छुओ।",
    "Read the digits from the left, and put the point as you pass the unit asked for.": "अंक बाईं ओर से पढ़ो, और पूछी गई इकाई के बाद दशमलव लगाओ।",
    "The digit of the asked unit comes just before the point, and the rest follow it.": "पूछी गई इकाई का अंक दशमलव से ठीक पहले आता है, बाकी उसके बाद।",
    "Put the point after the unit asked for, and read the decimal in that unit.": "पूछी गई इकाई के बाद दशमलव लगाओ, और उसी इकाई में दशमलव संख्या पढ़ो।",
    "You learned: read the decimal with its point after the unit asked for.": "तुमने सीखा: पूछी गई इकाई के बाद दशमलव लगाकर संख्या पढ़ना।",
    "A tank holds 3 kL 7 hL 2 daL 5 L, so what is that as one decimal in kilolitres?": "टंकी में 3 किली 7 हेली 2 डेकाली 5 ली है, किलोलीटर में यह दशमलव संख्या क्या है?",
    "In kilolitres?": "किलोलीटर में?",
    "Which column belongs to the unit the question asks for?": "प्रश्न जो इकाई पूछ रहा है, उसका खाना कौन-सा है?",
    "The point goes just after the digit under kL, the unit asked for.": "दशमलव पूछी गई इकाई किली के अंक के ठीक बाद आता है।",
    "The kL digit comes before the point, and the hL, daL and L digits after it.": "किली का अंक दशमलव से पहले, और हेली, डेकाली, ली के अंक उसके बाद आते हैं।",
    "Yes, the tank holds 3.725 kL.": "हाँ, टंकी में 3.725 किली है।",
    "Digits 4, 1, 7 and 0 sit under kg, hg, dag and g, so what is it in kilograms?": "किग्रा, हेग्रा, डेकाग्रा, ग्रा के नीचे 4, 1, 7, 0 हैं, किलोग्राम में क्या है?",
    "In kilograms?": "किलोग्राम में?",
    "The point goes after the digit of the unit asked for.": "दशमलव पूछी गई इकाई के अंक के बाद आता है।",
    "The 4 sits under kg, so the point goes just after the 4.": "4 किग्रा के नीचे है, इसलिए दशमलव 4 के ठीक बाद आता है।",
    "After the point come the hg, dag and g digits, the 0 included.": "दशमलव के बाद हेग्रा, डेकाग्रा और ग्रा के अंक आते हैं, 0 भी।",
    "Yes, 4.170 kg, also written 4.17 kg.": "हाँ, 4.170 किग्रा, जिसे 4.17 किग्रा भी लिखते हैं।",
    "Write 7 km 0 hm 3 dam 6 m as one decimal in kilometres.": "7 किमी 0 हेमी 3 डेकामी 6 मी को किलोमीटर में एक दशमलव संख्या लिखो।",
    "In kilometres?": "किलोमीटर में?",
    "Every column from km to m holds a digit, even the one with nothing in it.": "किमी से मी तक हर खाने में अंक है, उसमें भी जो खाली लगता है।",
    "The 0 under hm holds that place open, so it is written after the point.": "हेमी के नीचे का 0 उस स्थान को भरता है, इसलिए वह दशमलव के बाद लिखा जाता है।",
    "After the point come the hm, dam and m digits, with the 0 first.": "दशमलव के बाद हेमी, डेकामी और मी के अंक आते हैं, पहले 0।",
    "Yes, that is 7.036 km.": "हाँ, यह 7.036 किमी है।",
    /* the picture's words */
    "metre": "मीटर", "kilogram": "किलोग्राम", "litre": "लीटर",
    "Length": "लंबाई", "Weight": "भार", "Capacity": "धारिता",
    "length": "लंबाई", "weight": "भार", "capacity": "धारिता",
    "ribbon": "रिबन", "bag of rice": "चावल का थैला", "jug of milk": "दूध का जग", "bucket of water": "पानी की बाल्टी",
    "garden hose": "बगीचे का पाइप", "pumpkin": "कद्दू", "tank of water": "पानी की टंकी", "playground": "खेल का मैदान", "bag of potatoes": "आलू का थैला",
    "kilo": "किलो", "hecto": "हेक्टो", "deca": "डेका", "deci": "डेसी", "centi": "सेंटी", "milli": "मिली",
    "base": "आधार", "unit": "इकाई", "times": "गुना",
    "bigger units": "बड़ी इकाइयाँ", "smaller units": "छोटी इकाइयाँ", "not to scale": "पैमाने पर नहीं",
    "Step left": "बाएँ चलो", "Move": "कदम", "Drop": "रखो", "Given": "दिए गए", "point": "दशमलव", "places": "खाने", "point after": "दशमलव के बाद",
    "km": "किमी", "hm": "हेमी", "dam": "डेकामी", "m": "मी", "dm": "डेसीमी", "cm": "सेमी", "mm": "मिमी",
    "kg": "किग्रा", "hg": "हेग्रा", "dag": "डेकाग्रा", "g": "ग्रा", "dg": "डेसीग्रा", "cg": "सेग्रा", "mg": "मिग्रा",
    "kL": "किली", "hL": "हेली", "daL": "डेकाली", "L": "ली", "dL": "डेसीली", "cL": "सेली", "mL": "मिली",
  },
  gu: {
    "Chart Builder": "ચાર્ટ બનાવો",
    "Standard units": "પ્રમાણિત એકમો",
    "Prefixes and the base unit": "પૂર્વગ અને મૂળ એકમ",
    "Ten times the unit to its right": "જમણી બાજુના એકમનું દસ ગણું",
    "A measure on the chart": "ચાર્ટ પર એક માપ",
    "A chart of units, waiting to be built.": "એકમોનો એક ચાર્ટ, જે બનવાની રાહ જુએ છે.",
    "Free play. Tap a column to change its digit, then tap a gap to set the point.": "મુક્ત રમત. કોઈ ખાનાને અડકી તેનો અંક બદલો, પછી ખાલી જગ્યા અડકી દશાંશ ચિહ્ન મૂકો.",
    /* phase 1 */
    "A ribbon is measured along its length, so tap it to put it on the metre.": "રિબનને તેની લંબાઈમાં માપીએ છીએ, તેથી તેને અડકીને મીટર પર મૂકો.",
    "Tap the ribbon, the first thing in the tray.": "ટ્રેની પહેલી વસ્તુ, રિબનને અડકો.",
    "The kilogram, not the gram, is the standard unit of weight, so tap the rice.": "વજનનો પ્રમાણિત એકમ ગ્રામ નહીં, કિલોગ્રામ છે, તેથી ચોખાને અડકો.",
    "Tap the bag of rice in the tray.": "ટ્રેમાં ચોખાની થેલીને અડકો.",
    "Milk is poured, so its capacity is measured in litres: tap the jug.": "દૂધ રેડાય છે, તેથી તેની ક્ષમતા લિટરમાં મપાય છે, જગને અડકો.",
    "Tap the jug of milk.": "દૂધના જગને અડકો.",
    "The metre measures length, the kilogram weight, the litre what you pour.": "મીટર લંબાઈ માપે, કિલોગ્રામ વજન, અને લિટર જે રેડીએ તે.",
    "Long things on the metre, heavy things on the kilogram, water on the litre.": "લાંબી વસ્તુ મીટર પર, ભારે વસ્તુ કિલોગ્રામ પર, પાણી લિટર પર.",
    "The metre, kilogram and litre measure length, weight and capacity.": "મીટર, કિલોગ્રામ અને લિટર લંબાઈ, વજન અને ક્ષમતા માપે છે.",
    "You learned: the metre, kilogram and litre are the standard units.": "તમે શીખ્યા: મીટર, કિલોગ્રામ અને લિટર પ્રમાણિત એકમો છે.",
    "Drop each on its standard unit: a hose, a pumpkin and the water in a tank.": "દરેક વસ્તુને તેના પ્રમાણિત એકમ પર મૂકો: પાઇપ, કોળું અને ટાંકીનું પાણી.",
    "Hose, pumpkin, tank?": "પાઇપ, કોળું, ટાંકી?",
    "A hose is long, a pumpkin is heavy and the tank holds water.": "પાઇપ લાંબી છે, કોળું ભારે છે અને ટાંકીમાં પાણી છે.",
    "Yes, each thing is on its own unit.": "હા, બધું પોતાના એકમ પર છે.",
    "Which standard unit would you use to measure the length of a playground?": "રમતના મેદાનની લંબાઈ માપવા તમે કયો પ્રમાણિત એકમ લેશો?",
    "A playground?": "રમતનું મેદાન?",
    "You walk along a playground from one end to the other.": "રમતના મેદાનમાં તમે એક છેડેથી બીજા છેડે ચાલો છો.",
    "Yes, a playground is measured in metres.": "હા, રમતનું મેદાન મીટરમાં મપાય છે.",
    "Which standard unit fits a bucket of water, and which a bag of potatoes?": "પાણીની ડોલ માટે કયો પ્રમાણિત એકમ, અને બટાકાની થેલી માટે કયો?",
    "Bucket, potatoes?": "ડોલ, બટાકા?",
    "Water goes in the bucket, but a bag of potatoes is lifted to weigh it.": "ડોલમાં પાણી ભરાય, પણ બટાકાની થેલી તોલવા માટે ઉપાડીએ છીએ.",
    "Yes, litres for water, kilograms for potatoes.": "હા, પાણી માટે લિટર, બટાકા માટે કિલોગ્રામ.",
    "Put every thing on a card first.": "પહેલાં દરેક વસ્તુને કોઈ કાર્ડ પર મૂકો.",
    /* phase 2 */
    "Turn the deci card, just right of the base unit, to see what it is worth.": "મૂળ એકમની તરત જમણે આવેલું ડેસી કાર્ડ ફેરવો અને તેની કિંમત જુઓ.",
    "Tap the card next to the base unit, on its right.": "મૂળ એકમની જમણી બાજુના કાર્ડને અડકો.",
    "Turn the centi card, the next one to the right.": "હવે જમણી બાજુનું આગલું કાર્ડ, સેન્ટિ, ફેરવો.",
    "Tap the card two places right of the base unit.": "મૂળ એકમથી બે ખાના જમણે આવેલા કાર્ડને અડકો.",
    "Turn milli: cards on the right show parts, cards on the left show times.": "મિલિ ફેરવો: જમણી બાજુનાં કાર્ડ ભાગ બતાવે, ડાબી બાજુનાં કાર્ડ ગણું.",
    "Tap the last card on the right.": "જમણી બાજુના છેલ્લા કાર્ડને અડકો.",
    "Each card on the left matches the card as far away on the right.": "ડાબી બાજુનું દરેક કાર્ડ જમણી બાજુ એટલા જ દૂરના કાર્ડ સાથે મેળ ખાય છે.",
    "Take the number on the partner card and say it as times.": "જોડીદાર કાર્ડની સંખ્યા લો અને તેને ગણું તરીકે બોલો.",
    "Added to the base unit, kilo to deca make bigger units, deci to milli smaller.": "મૂળ એકમમાં ઉમેરાઈને કિલોથી ડેકા મોટા એકમો બનાવે, ડેસીથી મિલિ નાના.",
    "You learned: kilo to deca make bigger units, deci to milli smaller ones.": "તમે શીખ્યા: કિલોથી ડેકા મોટા એકમો, ડેસીથી મિલિ નાના એકમો બનાવે.",
    "What does hecto mean, and how many grams make 1 hg?": "હેક્ટોનો અર્થ શો છે, અને કેટલા ગ્રામથી 1 હેગ્રા બને?",
    "Grams in 1 hg?": "1 હેગ્રામાં ગ્રામ?",
    "Hecto is left of the base unit, the gram, so a hectogram is bigger.": "હેક્ટો મૂળ એકમ ગ્રામની ડાબી બાજુ છે, તેથી હેક્ટોગ્રામ મોટો છે.",
    "Yes, 100 g make 1 hg.": "હા, 100 ગ્રાથી 1 હેગ્રા બને.",
    "What does deca mean, and how many litres make 1 daL?": "ડેકાનો અર્થ શો છે, અને કેટલા લિટરથી 1 ડેકાલિ બને?",
    "Litres in 1 daL?": "1 ડેકાલિમાં લિટર?",
    "Deca sits just left of the litre column, so a decalitre is more than a litre.": "ડેકા લિટરના ખાનાની તરત ડાબે છે, તેથી ડેકાલિટર લિટરથી મોટો છે.",
    "Yes, 10 L make 1 daL.": "હા, 10 લિથી 1 ડેકાલિ બને.",
    "Which is the largest unit of length in the chart, and how many metres make one?": "ચાર્ટમાં લંબાઈનો સૌથી મોટો એકમ કયો છે, અને કેટલા મીટરથી તે બને?",
    "Metres in the largest?": "સૌથી મોટામાં મીટર?",
    "The largest unit of length sits at the far left of the length row.": "લંબાઈનો સૌથી મોટો એકમ લંબાઈની હરોળમાં સૌથી ડાબે છે.",
    "Yes, 1,000 m make 1 km.": "હા, 1,000 મીથી 1 કિમી બને.",
    /* phase 3 */
    "Tap Step left and watch the grams close up into one bigger unit.": "ડાબે ચાલો દબાવો અને જુઓ, ગ્રામ ભેગા થઈ એક મોટો એકમ બને છે.",
    "Tap the Step left key under the row.": "હરોળ નીચે ડાબે ચાલો બટન દબાવો.",
    "Tap Step left again to go one more place to the left.": "એક ખાનું વધુ ડાબે જવા ફરી ડાબે ચાલો દબાવો.",
    "Press Step left once more.": "એક વાર વધુ ડાબે ચાલો દબાવો.",
    "Each Step left joins the same number of small bars into one: count them.": "દર વખતે ડાબે ચાલતાં એટલી જ નાની પટ્ટીઓ ભેગી થઈ એક બને છે: તેમને ગણો.",
    "For two steps that number comes twice over, so multiply, never add.": "બે પગલાંમાં તે સંખ્યા બે વાર આવે છે, તેથી ગુણો, ઉમેરો નહીં.",
    "Each unit is 10 times the unit to its right, and 1/10 of the unit to its left.": "દરેક એકમ જમણી બાજુના એકમનો 10 ગણો અને ડાબી બાજુના એકમનો દસમો ભાગ છે.",
    "You learned: each unit is 10 times the unit to its right.": "તમે શીખ્યા: દરેક એકમ જમણી બાજુના એકમનો 10 ગણો છે.",
    "On the capacity row, how many centilitres make 1 dL, and how many make 1 litre?": "ક્ષમતાની હરોળમાં કેટલા સેન્ટિલિટરથી 1 ડેસીલિ બને, અને કેટલાથી 1 લિટર?",
    "cL in 1 dL, in 1 L?": "1 ડેસીલિમાં, 1 લિમાં સેલિ?",
    "A litre is two places left of cL, so press Step left twice.": "લિટર સેલિથી બે ખાના ડાબે છે, તેથી ડાબે ચાલો બે વાર દબાવો.",
    "Yes, 10 cL in 1 dL, 100 cL in 1 L.": "હા, 1 ડેસીલિમાં 10 સેલિ, 1 લિમાં 100 સેલિ.",
    "in 1 dL": "1 ડેસીલિમાં",
    "in 1 L": "1 લિમાં",
    "in 1 m": "1 મીમાં",
    "How many millilitres make 1 cL?": "કેટલા મિલિલિટરથી 1 સેલિ બને?",
    "mL in 1 cL?": "1 સેલિમાં મિલિ?",
    "Press Step left once and watch the mL bars close up into one cL.": "ડાબે ચાલો એક વાર દબાવો અને જુઓ, મિલિની પટ્ટીઓ ભેગી થઈ એક સેલિ બને છે.",
    "Count the small mL bars that closed up into the one cL bar.": "જે નાની મિલિ પટ્ટીઓ ભેગી થઈ એક સેલિ પટ્ટી બની, તેમને ગણો.",
    "The cL bar is split into equal mL parts: count every part.": "સેલિની પટ્ટી સરખા મિલિ ભાગોમાં વહેંચાયેલી છે: દરેક ભાગ ગણો.",
    "Yes, 10 mL make 1 cL.": "હા, 10 મિલિથી 1 સેલિ બને.",
    "How many places is it from mm to m, and how many millimetres make 1 m?": "મિમીથી મી સુધી કેટલા ખાના છે, અને કેટલા મિલિમીટરથી 1 મી બને?",
    "Places, mm in 1 m?": "ખાના, 1 મીમાં મિમી?",
    "Press Step left until the marker reaches m, counting each press.": "નિશાન મી સુધી પહોંચે ત્યાં સુધી ડાબે ચાલો દબાવો, અને દરેક વાર ગણો.",
    "Each press joins the same number of bars into one, so count those bars too.": "દર વખતે દબાવતાં એટલી જ પટ્ટીઓ ભેગી થઈ એક બને છે, તેમને પણ ગણો.",
    "Multiply that number by itself, once for every press you counted.": "તે સંખ્યાને તેટલી વાર ગુણો જેટલી વાર તમે દબાવ્યું.",
    "Yes, 3 places, so 1,000 mm in 1 m.": "હા, 3 ખાના, તેથી 1 મીમાં 1,000 મિમી.",
    /* phase 4 */
    "Tap Drop to put one digit under each unit of 3 kg 4 hg 7 dag 5 g.": "મૂકો દબાવો, 3 કિગ્રા 4 હેગ્રા 7 ડેકાગ્રા 5 ગ્રાના અંક એકમો નીચે જશે.",
    "Tap the Drop key at the bottom.": "નીચે મૂકો બટન દબાવો.",
    "Now tap the gap just after the kg digit to set the point there.": "હવે કિગ્રાના અંક પછીની ખાલી જગ્યા અડકો, ત્યાં દશાંશ ચિહ્ન મુકાશે.",
    "Find the kg column and tap just to its right.": "કિગ્રાનું ખાનું શોધો અને તેની તરત જમણે અડકો.",
    "Read the digits from the left, and put the point as you pass the unit asked for.": "અંક ડાબેથી વાંચો, અને પૂછેલા એકમ પછી દશાંશ ચિહ્ન મૂકો.",
    "The digit of the asked unit comes just before the point, and the rest follow it.": "પૂછેલા એકમનો અંક દશાંશ ચિહ્નની તરત પહેલાં આવે, બાકીના પછી.",
    "Put the point after the unit asked for, and read the decimal in that unit.": "પૂછેલા એકમ પછી દશાંશ ચિહ્ન મૂકો, અને તે જ એકમમાં દશાંશ સંખ્યા વાંચો.",
    "You learned: read the decimal with its point after the unit asked for.": "તમે શીખ્યા: પૂછેલા એકમ પછી દશાંશ ચિહ્ન મૂકી સંખ્યા વાંચવી.",
    "A tank holds 3 kL 7 hL 2 daL 5 L, so what is that as one decimal in kilolitres?": "ટાંકીમાં 3 કિલિ 7 હેલિ 2 ડેકાલિ 5 લિ છે, કિલોલિટરમાં તે દશાંશ સંખ્યા શી છે?",
    "In kilolitres?": "કિલોલિટરમાં?",
    "Which column belongs to the unit the question asks for?": "પ્રશ્ન જે એકમ પૂછે છે, તેનું ખાનું કયું છે?",
    "The point goes just after the digit under kL, the unit asked for.": "દશાંશ ચિહ્ન પૂછેલા એકમ કિલિના અંકની તરત પછી આવે.",
    "The kL digit comes before the point, and the hL, daL and L digits after it.": "કિલિનો અંક દશાંશ ચિહ્ન પહેલાં, અને હેલિ, ડેકાલિ, લિના અંક પછી આવે.",
    "Yes, the tank holds 3.725 kL.": "હા, ટાંકીમાં 3.725 કિલિ છે.",
    "Digits 4, 1, 7 and 0 sit under kg, hg, dag and g, so what is it in kilograms?": "કિગ્રા, હેગ્રા, ડેકાગ્રા, ગ્રા નીચે 4, 1, 7, 0 છે, કિલોગ્રામમાં આ શું છે?",
    "In kilograms?": "કિલોગ્રામમાં?",
    "The point goes after the digit of the unit asked for.": "દશાંશ ચિહ્ન પૂછેલા એકમના અંક પછી આવે.",
    "The 4 sits under kg, so the point goes just after the 4.": "4 કિગ્રા નીચે છે, તેથી દશાંશ ચિહ્ન 4 પછી તરત આવે.",
    "After the point come the hg, dag and g digits, the 0 included.": "દશાંશ ચિહ્ન પછી હેગ્રા, ડેકાગ્રા અને ગ્રાના અંક આવે, 0 પણ.",
    "Yes, 4.170 kg, also written 4.17 kg.": "હા, 4.170 કિગ્રા, જે 4.17 કિગ્રા પણ લખાય.",
    "Write 7 km 0 hm 3 dam 6 m as one decimal in kilometres.": "7 કિમી 0 હેમી 3 ડેકામી 6 મીને કિલોમીટરમાં એક દશાંશ સંખ્યા તરીકે લખો.",
    "In kilometres?": "કિલોમીટરમાં?",
    "Every column from km to m holds a digit, even the one with nothing in it.": "કિમીથી મી સુધી દરેક ખાનામાં અંક છે, ખાલી લાગતા ખાનામાં પણ.",
    "The 0 under hm holds that place open, so it is written after the point.": "હેમી નીચેનો 0 તે સ્થાન સાચવે છે, તેથી તે દશાંશ ચિહ્ન પછી લખાય.",
    "After the point come the hm, dam and m digits, with the 0 first.": "દશાંશ ચિહ્ન પછી હેમી, ડેકામી અને મીના અંક આવે, પહેલાં 0.",
    "Yes, that is 7.036 km.": "હા, તે 7.036 કિમી છે.",
    /* the picture's words */
    "metre": "મીટર", "kilogram": "કિલોગ્રામ", "litre": "લિટર",
    "Length": "લંબાઈ", "Weight": "વજન", "Capacity": "ક્ષમતા",
    "length": "લંબાઈ", "weight": "વજન", "capacity": "ક્ષમતા",
    "ribbon": "રિબન", "bag of rice": "ચોખાની થેલી", "jug of milk": "દૂધનો જગ", "bucket of water": "પાણીની ડોલ",
    "garden hose": "બગીચાની પાઇપ", "pumpkin": "કોળું", "tank of water": "પાણીની ટાંકી", "playground": "રમતનું મેદાન", "bag of potatoes": "બટાકાની થેલી",
    "kilo": "કિલો", "hecto": "હેક્ટો", "deca": "ડેકા", "deci": "ડેસી", "centi": "સેન્ટિ", "milli": "મિલિ",
    "base": "મૂળ", "unit": "એકમ", "times": "ગણું",
    "bigger units": "મોટા એકમો", "smaller units": "નાના એકમો", "not to scale": "માપસર નથી",
    "Step left": "ડાબે ચાલો", "Move": "પગલું", "Drop": "મૂકો", "Given": "આપેલ", "point": "દશાંશ ચિહ્ન", "places": "ખાના", "point after": "દશાંશ ચિહ્ન પછી",
    "km": "કિમી", "hm": "હેમી", "dam": "ડેકામી", "m": "મી", "dm": "ડેસીમી", "cm": "સેમી", "mm": "મિમી",
    "kg": "કિગ્રા", "hg": "હેગ્રા", "dag": "ડેકાગ્રા", "g": "ગ્રા", "dg": "ડેસીગ્રા", "cg": "સેગ્રા", "mg": "મિગ્રા",
    "kL": "કિલિ", "hL": "હેલિ", "daL": "ડેકાલિ", "L": "લિ", "dL": "ડેસીલિ", "cL": "સેલિ", "mL": "મિલિ",
  },
};

/* One entry per phase = one mount.
   says    the teach run, printed on the bubble a piece at a time before anything is asked (numbers are printed as words)
           keyOnly: digits print as written; a bubble line may name its number unless that gives the answer away
   steps   GUIDE STEPS (runtime r30; `hint` r34), when the plan's teach lines describe acts:
             steps: [{ say: "Tap Cut to cut the bar into ten equal parts.", on: "cut", hint: "Tap the Cut key first." },
                     { say: "Now tap one part to shade it.", on: "shade", hint: "Tap one piece of the bar." }],
           The phase then opens on steps[0].say with the question and the Answer key waiting (stage "demo"; `says` and
           OPENING are not shown). Work does the act when the CHILD does it and reports it: api.did("cut"). Only then does
           the bubble move to the next step (never on a timer); the last act opens the first question with its say.
           ONE CLICK PER STEP (2026-10-08): a step completes on one click of one control (a button such as Cut, or one
           piece of the picture), never on a count; if the idea needs more clicks, write more steps, each with the next
           instruction (the same `on` may repeat). The keypad's Enter is not a step act. Name a step's button after its
           act (data-control "cut") so the check can click it.
           Report EVERY click Work gets with api.did(name) at the moment of the click, awaited or not: a wrong act shows
           that step's `hint` UNDER the pinned instruction, unchanged until the child acts again (the header's Hint key
           shows it on demand as well). Work must also register api.onEnter so that Enter, the agent's check() and the dev
           solve() perform the CURRENT step (see Work below); props.stepOn names the act waited for: put the one <Invite/>
           on that control. ONE PAGE (r35): each `say`, each `hint`, each question's `say`, each `miss` and ladder rung is
           ONE sentence that fits the bubble (no timer ever pages it); a hint at most about 40 characters when its
           instruction runs to two lines, never over 80, never the answer; each hint unique in the phase.
           The scaffold writes ONE stub step per phase from its teach line: make it real, or delete the `steps` array of a
           phase whose teach describes no act (then `says` is the teach run and the phase opens on its first question).
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, printed once when it goes idle
           keyOnly: ONE sentence; the bubble shows it in place of the last win line
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone); steps are the newer way
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the question's line on the bubble (one sentence: one page); ask = the short prompt above the slot
                 (<= 3 lines of ~15 chars)
                 keyOnly: there is no question bar, so the bubble is the only place the question shows: `say` is the WHOLE question in ONE
                 sentence (the plan's question cut to one: put its setup back in when the child needs it). `ask` stays, because the checks and
                 the sidecar read it, but it is never drawn. A hint (miss, ladder rung) shows in place of the question: ONE sentence each
           answer what the slot or the working area must produce; miss = rung 1, shown at once UNDER the pinned
                  instruction after a miss (one sentence, never the answer; a second miss shows ladder[0], a third
                  ladder[1]), and kept there until the child acts again
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
    concept: "Standard units",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["What would you measure this with? Drop it on its unit."],
    /* TODO: guide steps, ONE click and ONE sentence each, a hint each (skeleton note "steps"): make this stub real, or delete it
       when the teach line describes no act (then `says` above is the teach run) */
    steps: [
      { say: "A ribbon is measured along its length, so tap it to put it on the metre.", on: "ribbon", hint: "Tap the ribbon, the first thing in the tray." },
      { say: "The kilogram, not the gram, is the standard unit of weight, so tap the rice.", on: "rice", hint: "Tap the bag of rice in the tray." },
      { say: "Milk is poured, so its capacity is measured in litres: tap the jug.", on: "milk", hint: "Tap the jug of milk." },
    ],
    /* the plan's tries (sort two things, add one to pour, three classroom things) became hints that say more each time:
       each miss names what the things are like, then the rule, then where each kind of thing goes */
    ladder: ["The metre measures length, the kilogram weight, the litre what you pour.", "Long things on the metre, heavy things on the kilogram, water on the litre."],
    closing: "The metre, kilogram and litre measure length, weight and capacity.",
    learned: "You learned: the metre, kilogram and litre are the standard units.",
    traceback: "The thing stays where it was dropped, the card it belongs on lights amber with Length, Weight or Capacity under it, and each thing is shown on its own card.",
    items: [
      /* learn MC1: answer in the plan = The metre for the hose, the kilogram for the pumpkin, and the litre for the water. */
      /* plan question: Which standard unit measures the length of a garden hose, which measures the weight of a pumpkin, and which measures the water in a tank? */
      { qid: "M1.S1.T2.C5:MC1", kind: "sort", pad: "enter", things: ["hose", "pumpkin", "tank"], answer: "hose:m,pumpkin:kg,tank:L", near: "hose:m,pumpkin:L,tank:kg",
        say: "Drop each on its standard unit: a hose, a pumpkin and the water in a tank.", ask: "Hose, pumpkin, tank?",
        miss: "A hose is long, a pumpkin is heavy and the tank holds water.", win: "Yes, each thing is on its own unit." },
      /* practice 1: answer in the plan = The metre (m) */
      { qid: "M1.S1.T2.C5:1", kind: "sort", pad: "enter", things: ["playground"], answer: "playground:m", near: "playground:kg",
        say: "Which standard unit would you use to measure the length of a playground?", ask: "A playground?",
        miss: "You walk along a playground from one end to the other.", win: "Yes, a playground is measured in metres." },
      /* practice 5: answer in the plan = The litre for the water, and the kilogram for the potatoes */
      { qid: "M1.S1.T2.C5:5", kind: "sort", pad: "enter", things: ["bucket", "potatoes"], answer: "bucket:L,potatoes:kg", near: "bucket:L,potatoes:L",
        say: "Which standard unit fits a bucket of water, and which a bag of potatoes?", ask: "Bucket, potatoes?",
        miss: "Water goes in the bucket, but a bag of potatoes is lifted to weigh it.", win: "Yes, litres for water, kilograms for potatoes." },
    ],
  },
  {
    n: 2,
    concept: "Prefixes and the base unit",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["Turn a card. How many base units is it worth?"],
    /* TODO: guide steps, ONE click and ONE sentence each, a hint each (skeleton note "steps"): make this stub real, or delete it
       when the teach line describes no act (then `says` above is the teach run) */
    /* the steps turn the three cards RIGHT of the base unit; each question asks a card LEFT of it, still face down (its
       partner as far away on the right is face up), and that card turns over at the right answer */
    steps: [
      { say: "Turn the deci card, just right of the base unit, to see what it is worth.", on: "deci", hint: "Tap the card next to the base unit, on its right." },
      { say: "Turn the centi card, the next one to the right.", on: "centi", hint: "Tap the card two places right of the base unit." },
      { say: "Turn milli: cards on the right show parts, cards on the left show times.", on: "milli", hint: "Tap the last card on the right." },
    ],
    ladder: ["Each card on the left matches the card as far away on the right.", "Take the number on the partner card and say it as times."],
    closing: "Added to the base unit, kilo to deca make bigger units, deci to milli smaller.",
    learned: "You learned: kilo to deca make bigger units, deci to milli smaller ones.",
    traceback: "The asked card turns face up with its worth in violet, the fact is written in green, and a bar of the big unit is drawn beside a bar of the base unit.",
    items: [
      /* learn MC2: answer in the plan = Hecto means 100 times the base unit, so 100 g make 1 hg. */
      { qid: "M1.S1.T2.C6:MC2", kind: "prefix", pre: "hecto", row: "weight", answer: 100, near: "0.01",
        say: "What does hecto mean, and how many grams make 1 hg?", ask: "Grams in 1 hg?",
        miss: "Hecto is left of the base unit, the gram, so a hectogram is bigger.", win: "Yes, 100 g make 1 hg." },
      /* practice 2: answer in the plan = Deca means 10 times the base unit, so 10 litres make 1 daL */
      /* plan question: What does deca mean? How many litres make 1 daL? */
      { qid: "M1.S1.T2.C6:2", kind: "prefix", pre: "deca", row: "capacity", answer: 10, near: "0.1",
        say: "What does deca mean, and how many litres make 1 daL?", ask: "Litres in 1 daL?",
        miss: "Deca sits just left of the litre column, so a decalitre is more than a litre.", win: "Yes, 10 L make 1 daL." },
      /* practice 6: answer in the plan = The kilometre; 1000 m make 1 km */
      /* hideCard: the question asks WHICH unit is the largest, so its card and cell get no ring until the win or the correction */
      { qid: "M1.S1.T2.C6:6", kind: "prefix", pre: "kilo", row: "length", answer: 1000, near: "0.001", hideCard: true,
        say: "Which is the largest unit of length in the chart, and how many metres make one?", ask: "Metres in the largest?",
        miss: "The largest unit of length sits at the far left of the length row.", win: "Yes, 1,000 m make 1 km." },
    ],
  },
  {
    n: 3,
    concept: "Ten times the unit to its right",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Step left. How many of the old unit fill the new one?"],
    /* TODO: guide steps, ONE click and ONE sentence each, a hint each (skeleton note "steps"): make this stub real, or delete it
       when the teach line describes no act (then `says` above is the teach run) */
    steps: [
      { say: "Tap Step left and watch the grams close up into one bigger unit.", on: "step", hint: "Tap the Step left key under the row." },
      { say: "Tap Step left again to go one more place to the left.", on: "step", hint: "Press Step left once more." },
    ],
    stepHold: 2200,
    ladder: ["Each Step left joins the same number of small bars into one: count them.", "For two steps that number comes twice over, so multiply, never add."],
    closing: "Each unit is 10 times the unit to its right, and 1/10 of the unit to its left.",
    learned: "You learned: each unit is 10 times the unit to its right.",
    traceback: "The marker's path is replayed: the bars close up into the unit asked for, a Move arrow labelled times 10 is drawn for each step, and the facts are written in green.",
    items: [
      /* learn MC3: answer in the plan = 10 cL make 1 dL, and 100 cL make 1 litre. (two boxes: both numbers the plan asks for) */
      /* plan question: On the capacity row, dL sits just to the left of cL. How many centilitres make 1 dL, and how many make 1 litre? */
      { qid: "M1.S1.T2.C7:MC3", kind: "step", asks: "next+to", row: "capacity", from: 5, to: 3,
        parts: [{ label: "in 1 dL", unit: "cL" }, { label: "in 1 L", unit: "cL" }], answer: [10, 100], near: "10|10",
        say: "On the capacity row, how many centilitres make 1 dL, and how many make 1 litre?", ask: "cL in 1 dL, in 1 L?",
        miss: "A litre is two places left of cL, so press Step left twice.", win: "Yes, 10 cL in 1 dL, 100 cL in 1 L." },
      /* practice 3: answer in the plan = 10 mL */
      { qid: "M1.S1.T2.C7:3", kind: "step", asks: "to", row: "capacity", from: 6, to: 5, answer: 10, near: "0.1",
        say: "How many millilitres make 1 cL?", ask: "mL in 1 cL?",
        miss: "Press Step left once and watch the mL bars close up into one cL.",
        ladder: ["Count the small mL bars that closed up into the one cL bar.", "The cL bar is split into equal mL parts: count every part."], win: "Yes, 10 mL make 1 cL." },
      /* practice 7: answer in the plan = Three places to the left; 1 m is 10 x 10 x 10 = 1000 mm (two boxes: places, then millimetres) */
      { qid: "M1.S1.T2.C7:7", kind: "step", asks: "places+to", row: "length", from: 6, to: 3,
        parts: [{ label: "places" }, { label: "in 1 m", unit: "mm" }], answer: [3, 1000], near: "1|10",
        say: "How many places is it from mm to m, and how many millimetres make 1 m?", ask: "Places, mm in 1 m?",
        miss: "Press Step left until the marker reaches m, counting each press.",
        ladder: ["Each press joins the same number of bars into one, so count those bars too.", "Multiply that number by itself, once for every press you counted."], win: "Yes, 3 places, so 1,000 mm in 1 m." },
    ],
  },
  {
    n: 4,
    concept: "A measure on the chart",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    says: ["Set the point after the unit asked for. Now say the unit too."],
    /* TODO: guide steps, ONE click and ONE sentence each, a hint each (skeleton note "steps"): make this stub real, or delete it
       when the teach line describes no act (then `says` above is the teach run) */
    steps: [
      { say: "Tap Drop to put one digit under each unit of 3 kg 4 hg 7 dag 5 g.", on: "drop", hint: "Tap the Drop key at the bottom." },
      { say: "Now tap the gap just after the kg digit to set the point there.", on: "gap-0", hint: "Find the kg column and tap just to its right." },
    ],
    stepHold: 2600,
    ladder: ["Read the digits from the left, and put the point as you pass the unit asked for.", "The digit of the asked unit comes just before the point, and the rest follow it."],
    closing: "Put the point after the unit asked for, and read the decimal in that unit.",
    learned: "You learned: read the decimal with its point after the unit asked for.",
    traceback: "The child's digits and point stay, the asked unit's column lights amber, the right point and any missing digit are shown, and the decimal is read back in green with its unit.",
    items: [
      /* learn MC4: answer in the plan = 3.725 kL. */
      /* plan question: A tank holds 3 kL 7 hL 2 daL 5 L. Write it on the chart one digit to a unit, and read it as one decimal in kilolitres. */
      { qid: "M1.S1.T2.C8:MC4", kind: "read", row: "capacity", digits: [3, 7, 2, 5, null, null, null], at: 0, answer: "3.725", near: "3725",
        say: "A tank holds 3 kL 7 hL 2 daL 5 L, so what is that as one decimal in kilolitres?", ask: "In kilolitres?",
        miss: "Which column belongs to the unit the question asks for?",
        ladder: ["The point goes just after the digit under kL, the unit asked for.", "The kL digit comes before the point, and the hL, daL and L digits after it."],
        win: "Yes, the tank holds 3.725 kL." },
      /* practice 4: answer in the plan = 4.170 kg, which is 4.17 kg (both forms are right) */
      /* plan question: Digits 4, 1 and 7 sit under kg, hg and dag, and 0 sits under g. Read the measure as one decimal in kilograms. */
      { qid: "M1.S1.T2.C8:4", kind: "read", row: "weight", given: true, digits: [4, 1, 7, 0, null, null, null], at: 0, answer: "4.170", also: ["4.17"], near: "41.70",
        say: "Digits 4, 1, 7 and 0 sit under kg, hg, dag and g, so what is it in kilograms?", ask: "In kilograms?",
        miss: "The point goes after the digit of the unit asked for.",
        ladder: ["The 4 sits under kg, so the point goes just after the 4.", "After the point come the hg, dag and g digits, the 0 included."],
        win: "Yes, 4.170 kg, also written 4.17 kg." },
      /* practice 8: answer in the plan = 7.036 km */
      { qid: "M1.S1.T2.C8:8", kind: "read", row: "length", digits: [7, 0, 3, 6, null, null, null], at: 0, answer: "7.036", near: "7.36",
        say: "Write 7 km 0 hm 3 dam 6 m as one decimal in kilometres.", ask: "In kilometres?",
        miss: "Every column from km to m holds a digit, even the one with nothing in it.",
        ladder: ["The 0 under hm holds that place open, so it is written after the point.", "After the point come the hm, dam and m digits, with the 0 first."],
        win: "Yes, that is 7.036 km." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { columns: MC_PRE, rows: MC_ROW, units: MC_UNITS.map((u) => u.id), stepThings: MC_STEP_HOME, demo3: MC_DEMO3, demo4: MC_DEMO4 };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? phase 1 compares the sorting thing by thing; a decimal is judged in its
   written form, with the other right forms the plan names (4.17 for 4.170) listed on the item */
const judge = (item: any, v: any) => {
  if (item.kind === "sort") { const a = mcPairs(item.answer), b = mcPairs(v); return item.things.every((t: any) => !!a[t] && a[t] === b[t]); }
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  const s = String(v ?? "").trim();
  return s === item.answer || (item.also || []).includes(s);
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: what each thing measures,
   the place of each prefix, the distance on the chart, and the measure summed digit by digit */
const MC_MEASURES: any = { hose: "length", pumpkin: "weight", tank: "capacity", playground: "length", bucket: "capacity", potatoes: "weight" };
const MC_STANDARD: any = { length: "m", weight: "kg", capacity: "L" };
const oracle = () => PHASES.every((p: any) => p.items.length === 3 && p.items.every((it: any) => {
  if (it.kind === "sort") {
    const want = String(it.answer).split(",").sort().join(",");
    return want === it.things.map((t: string) => t + ":" + MC_STANDARD[MC_MEASURES[t]]).sort().join(",");
  }
  if (it.kind === "prefix") { const left = 3 - ["kilo", "hecto", "deca", "base", "deci", "centi", "milli"].indexOf(it.pre); return left > 0 && it.answer === Math.pow(10, left); }
  if (it.kind === "step") {
    const d = it.from - it.to, all = Math.round(Math.pow(10, d));
    if (it.asks === "next+to") return JSON.stringify(it.answer) === JSON.stringify([10, all]);
    if (it.asks === "places+to") return JSON.stringify(it.answer) === JSON.stringify([d, all]);
    return it.asks === "to" && it.answer === all;
  }
  if (it.kind === "read") {
    let v = 0, last = -1;
    it.digits.forEach((dg: any, c: number) => { if (dg !== null) { v += dg * Math.pow(10, it.at - c); last = c; } });
    const places = (String(it.answer).split(".")[1] || "").length;
    return Math.abs(parseFloat(it.answer) - v) < 1e-9 && places === last - it.at && (it.also || []).every((f: string) => Math.abs(parseFloat(f) - v) < 1e-9);
  }
  return false;
}));
/* the most likely wrong answer (each item's misconception, `near`); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.kind === "sort" ? [String(item.answer)]
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [item.answer, ...(item.also || [])].flatMap((s: string) => [s, speakable(s)]));
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): phase 1 sorts the things as a child would; a decimal is typed with its point (toolApi.answer strips
   the point, PATTERNS §4); undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" ? (HOOK.set ? HOOK.set(v) : undefined)
  : typeof item.answer === "string" && HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter. In a guide-steps phase
   (stage "demo") it must return undefined, so the agent's check() reaches api.onEnter and performs the current step:
   set HOOK.check only while a question is open */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Its size is `box` ({ w, h, open }): the whole card (1472 x 528) with the answer panel shut and 1086 x 528 with it
   open, easing between (the board layout, docs/LAYOUT.md §1b, docs/PATTERNS.md §14): lay everything out from box.w
   with plain arithmetic in render, never from constants or api.W. Origin at the area's top-left.
   keyOnly (LAYOUT.md §1d): the question bar is gone, so the working area is 64,108, 1472 x 520 (NOT 64,202 x 528) with the panel shut, 1086 (900
   with bigPad) x 520 open. box.key = { x, y, w, h } is the key's corner in THIS area's coordinates (about x 1190, y 0, 282 x 88; wider on a
   Yes/No question): keep every element out of it, e.g. const kx = box.key ? box.key.x - 12 : box.w; (board-fit). There is no runs zone.
   Every act (cut, measure, count, tidy ...) is performed on screen: await api.act({ tool, moves, at, onPoint }) from the child's tap and
   react only when it resolves true (PATTERNS.md §15).
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the bubble already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked.
   Sound effects where the picture moves: api.sfx.cut() (a knife), settle() (pieces come to rest),
   trade() (pieces close into one), tick() (a snap); correct, wrong, win and cheer are the runtime's.
   step / stepOn: the guide step the child is on and the act it waits for (null outside a steps phase).
   nextKey: true (the ToolFrame below, runtime r48+): nothing moves on by itself. After a right answer the win picture
   stays on the board until the child presses the blinking Next key, so never reset it on a timer (PATTERNS.md 9d).
   A SKIN (docs/IMAGES.md, docs/PATTERNS.md §14): when the slot has an images.tsx, draw <Skin name x y w h clip /> over
   the plain shape the tool already draws for the object (the plain shape stays the fallback); never a raster tag of your own here (no-raster-in-tool).
   */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const tl = useTimeline();
  const tl2 = useTimeline();
  const free = stage === "free";
  /* a phase opens on stage "teach" for one frame before "demo": draw the warm-up then too, never question 1's board (PATTERNS §18) */
  const isDemo = stage === "demo" || (stage === "teach" && !!(phase && phase.steps));
  const done = stage === "win" || stage === "idle";
  const live = isDemo || stage === "ask";
  const it: any = item || {};
  const items: any[] = (phase && phase.items) || [];
  /* the teach frame still carries the previous phase's step count: the warm-up starts at step 0 (PATTERNS §18) */
  const st = stage === "teach" ? 0 : step || 0;
  const BW = box ? box.w : W.w;
  const kx = box && box.key ? box.key.x - 12 : BW;
  /* phase 1 never opens the keypad, so it takes the room left of the key's corner; phases 2 to 4 and free play are laid out at
     the width the area has with the keypad OPEN, in both states, so the chart never jumps when the pad slides in */
  const A = n === 1 && !free ? Math.max(600, Math.min(BW, kx)) : Math.min(900, kx);
  const rm = reducedMotion();
  const tracing = useRef(false);   /* a correction is drawing itself: the working area takes no act until it ends */

  /* the child's own state for the question on screen; a new question (or the guide steps) starts from a clean one */
  /* each guide step has its own state (what is done before it is drawn from the step count), so a restart, a phase dot or Play
     again never shows a finished warm-up */
  const qk0 = free ? "free" : n + "|" + (isDemo ? "demo" + st : "q" + index);
  /* every ENTRY into a question is a new visit, reset during render (PATTERNS §18): Q2 -> Q3 -> Q2 opens Q2 on a fresh board even
     when Q3 was left untouched, and an act or a correction step still running from an earlier visit writes nothing */
  const busy = useRef(false);
  const stale = useRef(false);
  const lastQk = useRef(qk0);
  const visit = useRef(0);
  const noted = useRef(false);     /* "Put every thing on a card first." is on the bubble */
  const rungSeen = useRef(-1);     /* the strongest hint rung shown at this question so far */
  const unlockOwed = useRef(false);  /* left a question mid-correction: its pad lock is given back */
  if (lastQk.current !== qk0) {
    lastQk.current = qk0; visit.current += 1;
    if (tracing.current) unlockOwed.current = true;
    busy.current = false; stale.current = false; tracing.current = false; noted.current = false; rungSeen.current = -1;
  }
  const qk = qk0 + "#" + visit.current;
  const init = () => ({ qk, pos: {}, sel: null, fly: null, turn: null, s: 0, view: "loose", cells: [null, null, null, null, null, null, null], pt: null, demo: 0 });
  const [raw, setRaw] = useState<any>(init);
  const S: any = raw.qk === qk ? raw : init();
  const qkRef = useRef(qk);
  qkRef.current = qk;
  const put = (p: any) => {
    if (qkRef.current !== qk) return;   /* an act that ends after the question (or the visit) moved on changes nothing */
    setRaw((o: any) => { const b = o.qk === qk ? o : init(); return { ...b, ...(typeof p === "function" ? p(b) : p) }; });
  };
  /* a correction (or a delayed push) from the visit just left stops; the lock it held is released */
  useEffect(() => {
    tl.stop(); tl2.stop();
    if (unlockOwed.current) { unlockOwed.current = false; api.lock(false); }
  }, [qk]);
  const tapAt = useRef(0);
  /* free play: a length row with digits the child changes and a point it moves */
  const [fc, setFc] = useState<any[]>([7, 0, 3, 6, null, null, null]);
  const [fp, setFp] = useState<any>(0);

  /* ── phase 1: three standard unit cards, a tray of things to sort onto them ── */
  const cw = Math.min(320, (A - 96) / 3), cg = 24, cx0 = Math.max(12, (A - 3 * cw - 2 * cg) / 2);
  const CY = 4, CH = 240, TOP = 118, TY = 306, tH = 206;
  const cardX = (i: number) => cx0 + i * (cw + cg);
  const unitAt = (u: string) => MC_UNITS.findIndex((m) => m.id === u);
  const things1: string[] = n !== 1 || free ? [] : isDemo ? MC_STEP_THINGS : it.things || [];
  const pos1: any = { ...(isDemo && n === 1 ? Object.fromEntries(MC_STEP_THINGS.slice(0, st).map((t) => [t, MC_STEP_HOME[t]])) : {}), ...S.pos };
  const ans1: any = n === 1 && !isDemo && !free ? mcPairs(it.answer) : MC_STEP_HOME;
  const ready1 = things1.length > 0 && things1.every((t) => pos1[t]);
  const tw = Math.min(250, (A - 100) / 3);
  const trayX = (j: number) => (A - (things1.length * tw + (things1.length - 1) * 30)) / 2 + j * (tw + 30);
  const onCard = (u: string) => things1.filter((t) => pos1[t] === u && S.fly !== t);
  const ghosts = (u: string) => (S.demo >= 3 ? things1.filter((t) => ans1[t] === u && pos1[t] !== u) : []);
  const slotOf = (u: string, j: number, kk: number) => ({ x: cardX(unitAt(u)) + (cw - (kk * 76 + (kk - 1) * 10)) / 2 + j * 86, y: CY + TOP + 22 });
  const cardAt = (p: any) => {
    for (let i = 0; i < 3; i++) { const x = cardX(i); if (p.x >= x - 24 && p.x <= x + cw + 24 && p.y >= CY - 24 && p.y <= CY + CH + 40) return MC_UNITS[i].id; }
    return null;
  };
  const thingCentre = (t: string) => {
    const u = pos1[t];
    if (u) { const l = onCard(u), s = slotOf(u, Math.max(0, l.indexOf(t)), Math.max(1, l.length)); return { x: s.x + 38, y: s.y + 38 }; }
    return { x: trayX(things1.indexOf(t)) + tw / 2, y: TY + 75 };
  };
  const carry = (t: string, u: string, then?: any) => {
    if (busy.current) return;
    busy.current = true;
    const from = thingCentre(t), to = { x: cardX(unitAt(u)) + cw / 2, y: CY + TOP + 60 };
    put({ fly: t, sel: null });
    api.act({ tool: "hand", moves: "carry", from, to, at: [],
      hold: <g><rect x={-38} y={-38} width={76} height={76} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2.5} /><MCThing id={t} x={-32} y={-32} w={64} h={64} /></g> })
      .then((ok: boolean) => {
        busy.current = false;
        put((o: any) => ({ fly: null, pos: ok ? { ...o.pos, [t]: u } : o.pos }));
        if (!ok) return;
        stale.current = false;
        api.sfx.tick();
        if (then) then();
      });
  };
  const dropThing = (t: string, p: any, moved: boolean) => {
    if (busy.current || tracing.current) return;
    if (isDemo) {
      if (t !== stepOn) { api.did(t); return; }
      if (moved) {
        if (cardAt(p) === MC_STEP_HOME[t]) { put((o: any) => ({ pos: { ...o.pos, [t]: MC_STEP_HOME[t] } })); api.sfx.tick(); api.did(t); }
        else api.did(t + "-away");
        return;
      }
      carry(t, MC_STEP_HOME[t], () => api.did(t));
      return;
    }
    if (stage !== "ask") return;
    if (moved) { const u = cardAt(p); stale.current = false; put((o: any) => ({ pos: { ...o.pos, [t]: u }, sel: null, demo: 0 })); if (u) api.sfx.tick(); return; }
    put((o: any) => ({ sel: o.sel === t ? null : t, demo: 0 }));
  };
  /* a card is ONE target, the whole card: a tap puts the picked thing on it, or (nothing picked) picks up the last thing on it;
     a drag that starts on a card carries its last thing to another card, or back to the tray */
  const tapCard = (u: string) => {
    if (busy.current || tracing.current) return;
    if (isDemo) { api.did("card-" + u); return; }
    if (stage !== "ask") return;
    put({ demo: 0 });
    if (S.sel && pos1[S.sel] !== u) { carry(S.sel, u); return; }
    if (S.sel) { put({ sel: null }); return; }
    const l = onCard(u);
    if (l.length) put({ sel: l[l.length - 1] });
  };
  const dropCard = (u: string, p: any, moved: boolean) => {
    if (!moved) { tapCard(u); return; }
    if (busy.current || tracing.current) return;
    if (isDemo) { api.did("card-" + u); return; }
    if (stage !== "ask") return;
    const l = onCard(u);
    if (!l.length) return;
    const t = l[l.length - 1], v = cardAt(p);
    stale.current = false;
    put((o: any) => ({ pos: { ...o.pos, [t]: v }, sel: null, demo: 0 }));
    if (v) api.sfx.tick();
  };
  const rungs1 = n === 1 && !isDemo ? [it.miss, ...((it.ladder || (phase && phase.ladder)) || [])] : [];
  const enter1 = () => {
    if (busy.current || tracing.current) return;
    if (!ready1) { noted.current = true; api.say("Put every thing on a card first."); return; }
    if (stale.current) {
      /* the same sorting is never sent twice: the hint the Enter key wiped comes back (the strongest rung shown so far, the Hint
         key's included) until the child moves something */
      const k = Math.max(Math.min(2, Math.max(0, ((wrong && wrong.tries) || 1) - 1)), rungSeen.current);
      api.say(rungs1[Math.min(k, rungs1.length - 1)]);
      return;
    }
    stale.current = true;
    api.submit(things1.map((t) => t + ":" + pos1[t]).join(","));
  };

  /* ── phase 2: the chart with its prefix cards; the steps turn the right side, each question asks the left ── */
  /* the row names' column is as wide as the longest name in this language needs, so the unit cells get the rest */
  const lw2 = Math.min(170, Math.max(...MC_ROWS.map((r) => mcEm(tx(r)))) * T.micro + 34), colW2 = (A - lw2 - 12) / 7;
  const colX2 = (c: number) => lw2 + c * colW2;
  const RY = (r: number) => 272 + r * 82;
  const asked2: any = n === 2 && !isDemo && !free ? it : null;
  const up2: string[] = n !== 2 ? [] : isDemo ? MC_P2_STEP.slice(0, st) : [...MC_P2_STEP, ...items.slice(0, index).map((q: any) => q.pre)];
  if (asked2 && (done || S.demo >= 1)) up2.push(asked2.pre);
  if (S.turn) up2.push(S.turn);
  const all2 = !!asked2 && done && index === items.length - 1;
  const turnCard = (name: string) => {
    if (busy.current || !isDemo) return;
    if (name !== stepOn) { api.did(name); return; }
    const c = MC_PRE.indexOf(name);
    busy.current = true;
    api.act({ tool: "hand", moves: "tap", at: [{ x: colX2(c) + colW2 / 2, y: 80 }], onPoint: () => { put({ turn: name }); api.sfx.tick(); } })
      .then((ok: boolean) => { busy.current = false; if (ok) api.did(name); });
  };

  /* ── phase 3: one row, the marker on a unit, ten bars of it closing up into one of the unit to its left ── */
  const P3: any = isDemo ? MC_DEMO3 : it;
  const row3: string[] = MC_ROW[P3.row] || MC_ROW.capacity;
  const k3 = n === 3 ? (P3.from || 0) - (P3.to || 0) : 0;
  const colW3 = Math.min(150, (A - 40) / 7), rx3 = (A - 7 * colW3) / 2;
  const sNow = isDemo ? Math.max(S.s, st) : S.s;
  const showAll = n === 3 && !isDemo && !free && (done || S.demo >= 1);
  const sShow = showAll ? k3 : Math.min(sNow, k3);
  const view3 = showAll ? (k3 > 0 ? "merged" : "loose") : sNow > S.s ? "merged" : S.view;
  const cur3 = (P3.from || 0) - sShow;
  const bw = Math.min(76, (A - 80) / 12), gap3 = bw * 0.3, bx0 = (A - 10 * bw) / 2, BY = 124, BH3 = 86;
  const canStep = n === 3 && (isDemo ? stepOn === "step" : stage === "ask") && S.demo === 0 && cur3 > (P3.to || 0);
  const stepLeft = () => {
    if (busy.current || tracing.current) return;
    if (isDemo && stepOn !== "step") { api.did("step"); return; }
    if (!isDemo && stage !== "ask") return;
    const s0 = sNow, cur = P3.from - s0;
    if (cur <= P3.to) { if (isDemo) api.did("step"); return; }
    busy.current = true;
    const wasMerged = s0 > 0;
    put({ s: s0, view: "loose" });   /* the unit on show breaks into ten loose bars ... */
    const y = BY + BH3 / 2;
    const go = () => api.act({ tool: "hand", moves: "push", from: { x: bx0 + 10 * bw + 5 * gap3 + 40, y }, to: { x: bx0 + 10 * bw + 8, y },
      at: [{ x: bx0 + 10 * bw + 3 * gap3, y }], onPoint: () => put({ view: "closing" }) })   /* ... and the hand pushes them into one */
      .then((ok: boolean) => {
        busy.current = false;
        if (!ok) { put({ view: wasMerged ? "merged" : "loose" }); return; }
        put({ s: s0 + 1, view: "merged" });
        api.sfx.trade();
        if (isDemo) api.did("step");
      });
    if (wasMerged && !rm) tl2.run([[320, null]], go); else go();
  };
  const pressStep = () => { const t = Date.now(); if (t - tapAt.current < 400) return; tapAt.current = t; stepLeft(); };

  /* ── phase 4 (and free play): one row, digit tiles dropped one to a column, the point set in a gap, read back with its unit ── */
  const P4: any = free ? { kind: "read", row: "length" } : isDemo ? MC_DEMO4 : it;
  const row4: string[] = MC_ROW[P4.row] || MC_ROW.length;
  const colW4 = Math.min(150, (A - 40) / 7), x4 = (A - 7 * colW4) / 2;
  const tiles4: any[] = (n === 4 || isDemo) && !free && P4.digits && !P4.given
    ? P4.digits.map((d: any, c: number) => (d === null ? null : { d, c })).filter((x: any) => x) : [];
  const cellT: any[] = n === 4 && isDemo && st >= 1 ? row4.map((_, c) => { const i = tiles4.findIndex((t) => t.c === c); return i >= 0 ? i : null; }) : S.cells;
  const ptNow = free ? fp : n === 4 && isDemo && st >= 2 ? 0 : S.pt;
  const win4 = n === 4 && !free && !isDemo && done;
  const digit4 = (c: number) => (free ? fc[c] : win4 || P4.given ? (P4.digits ? P4.digits[c] : null) : cellT[c] === null || cellT[c] === undefined ? null : tiles4[cellT[c]].d);
  const cellMid = (c: number) => ({ x: x4 + c * colW4 + colW4 / 2, y: 262 });
  const gapX = (g: number) => x4 + (g + 1) * colW4;
  const dropTile = (i: number, p: any, moved: boolean) => {
    if (busy.current || tracing.current) return;
    if (isDemo) { api.did("tile-" + i); return; }
    if (stage !== "ask") return;
    put({ demo: 0 });
    const home = tiles4[i].c, at = cellT.indexOf(i);
    const without = cellT.map((v) => (v === i ? null : v));
    if (moved) {
      const c = p.y >= 120 && p.y <= 330 ? Math.floor((p.x - x4) / colW4) : -1;
      if (c >= 0 && c < 7 && (cellT[c] === null || cellT[c] === i)) { without[c] = i; put({ cells: without }); api.sfx.tick(); }
      else if (p.y < 120) put({ cells: without });   /* back in the tray */
      return;
    }
    if (at === home) return;
    /* a tap puts a tile under its own unit; a tile already standing there swaps into the tapped tile's place (a column or the tray) */
    const other = cellT[home];
    busy.current = true;
    api.act({ tool: "hand", moves: "tap", at: [cellMid(home)], onPoint: () => {
      const nc = without.slice();
      if (other !== null && other !== undefined && at >= 0) nc[at] = other;
      nc[home] = i;
      put({ cells: nc });
    } }).then((ok: boolean) => { busy.current = false; if (ok) api.sfx.tick(); });
  };
  /* Drop puts EVERY tile under its own unit: a tile standing in another tile's column moves to its own column in turn */
  const dropAll = () => {
    if (busy.current || tracing.current) return;
    if (isDemo && stepOn !== "drop") { api.did("drop"); return; }
    if (!isDemo && stage !== "ask") return;
    const left = tiles4.map((_, i) => i).filter((i) => cellT[tiles4[i].c] !== i);
    if (!left.length) { if (isDemo) api.did("drop"); return; }
    busy.current = true;
    if (!isDemo) put({ demo: 0 });
    let nc = cellT.slice();
    api.act({ tool: "hand", moves: "tap", at: left.map((i) => cellMid(tiles4[i].c)),
      onPoint: (j: number) => { const i = left[j]; nc = nc.map((v) => (v === i ? null : v)); nc[tiles4[i].c] = i; put({ cells: nc }); } })
      .then((ok: boolean) => { busy.current = false; if (!ok) return; api.sfx.settle(); if (isDemo) api.did("drop"); });
  };
  const tapGap = (g: number) => {
    if (busy.current || tracing.current) return;
    if (isDemo && stepOn !== "gap-" + g) { api.did("gap-" + g); return; }
    if (!isDemo && !free && stage !== "ask") return;
    if (!isDemo && !free) put({ demo: 0 });
    busy.current = true;
    api.act({ tool: "pencil", moves: "tap", at: [{ x: gapX(g), y: 296 }], onPoint: () => (free ? setFp(g) : put({ pt: g })) })
      .then((ok: boolean) => { busy.current = false; if (!ok) return; api.sfx.tick(); if (isDemo) api.did("gap-" + g); });
  };
  const tapFreeCell = (c: number) => setFc((o) => o.map((d, k) => (k !== c ? d : d === null ? 0 : d >= 9 ? null : d + 1)));

  /* one drag for every piece: a thing (phase 1) or a digit tile (phase 4); a tap means "put it where it belongs",
     except a thing in a question, where a tap picks it up and a tap on a card puts it there */
  const drag = useDrag((pl: any, p: any, moved: boolean) => {
    if (pl.kind === "thing") dropThing(pl.id, p, moved);
    else if (pl.kind === "card") dropCard(pl.id, p, moved);
    else if (pl.kind === "tile") dropTile(pl.id, p, moved);
  });
  const dragging = (kind: string, id: any) => !!(drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.kind === kind && drag.drag.payload.id === id);
  /* the thing a drag that started on a card is carrying (that card's last thing), drawn at the finger */
  const cardDrag = drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.kind === "card" ? onCard(drag.drag.payload.id).slice(-1)[0] || null : null;

  /* GUIDE STEPS: Enter, the agent's check() and the dev solve() perform the CURRENT step's act, the one way a tap does */
  const act = (on: any) => {
    if (!on) return;
    if (n === 1) { if (on === stepOn && MC_STEP_HOME[on]) carry(on, MC_STEP_HOME[on], () => api.did(on)); return; }
    if (n === 2) { turnCard(on); return; }
    if (n === 3) { stepLeft(); return; }
    if (n === 4) { if (on === "drop") dropAll(); else if (String(on).startsWith("gap-")) tapGap(Number(String(on).slice(4))); }
  };
  api.onEnter(isDemo && stepOn ? () => act(stepOn) : !free && stage === "ask" && it.pad === "enter" ? enter1 : null);
  HOOK.demo = () => act(stepOn);
  HOOK.set = (v: any) => { if (n !== 1) return undefined; put({ pos: mcPairs(v), sel: null, demo: 0 }); stale.current = false; return true; };
  HOOK.type = (v: any) => { api.setTyped(String(v)); return true; };

  /* the Enter key in the corner blinks once every thing of the question is on a card; the placement that completes the tray brings
     the question back after "Put every thing on a card first." */
  useEffect(() => {
    if (n !== 1 || stage !== "ask") return;
    api.answerReady(ready1);
    if (ready1 && noted.current) { noted.current = false; api.say(it.say); }
  }, [n, stage, index, ready1]);
  /* latch the strongest rung the bubble has shown (a miss, or the Hint key's rungs), PATTERNS §18 "Is a hint showing?" */
  useEffect(() => {
    if (n !== 1 || stage !== "ask" || !rungs1.length) return;
    const ta: any = typeof window !== "undefined" ? (window as any).toolApi : null;
    const gs: any = ta && ta.getState ? ta.getState() : null;
    if (!gs || !gs.hint || gs.hintKind === "type") return;
    const k = rungs1.findIndex((r: string) => r === gs.hint || tx(r) === gs.hint);
    if (k > rungSeen.current) rungSeen.current = k;
  });
  /* a right answer's own line (the phase's last one is replaced by its closing line) */
  useEffect(() => { if (stage === "win" && it.win) api.say(it.win); }, [stage, index, n]);

  /* the traceback: the pad locks while the correction draws itself in steps, ending on the whole right answer */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const steps = n === 3 ? k3 + 1 : 3;
    const seq: any[] = [];
    for (let d = 1; d <= steps; d++) seq.push([650, () => put({ demo: d })]);
    api.lock(true);
    tracing.current = true;
    tl.run(seq, () => { tracing.current = false; api.lock(false); });
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState): the child's own work, never an answer */
  api.share({
    phase: n, row: free ? "length" : n === 1 ? null : n === 2 ? (asked2 ? asked2.row : null) : n === 3 ? P3.row : P4.row,
    placed: n === 1 ? things1.filter((t) => pos1[t]).length : n === 4 || free ? row4.filter((_, c) => digit4(c) !== null).length : null,
    marker: n === 3 && !free ? row3[cur3] : null,
    digits: n === 4 || free ? row4.map((_, c) => digit4(c)) : null,
    point_after: (n === 4 || free) && ptNow !== null && ptNow !== undefined ? row4[ptNow] : null,
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const p1 = () => {
    const pieces = things1.filter((t) => S.fly !== t).sort((a, b) => Number(dragging("thing", a) || cardDrag === a) - Number(dragging("thing", b) || cardDrag === b));
    const en = lang === "en";   /* Devanagari and Gujarati rise higher over the line: their big symbols are drawn smaller and lower */
    return (
      <g>
        {MC_UNITS.map((u, i) => {
          const x = cardX(i), lit = S.demo >= 1 && things1.some((t) => ans1[t] === u.id && pos1[t] !== u.id), won = done;
          return (
            <g key={u.id}>
              <g {...(live ? { ...control("card-" + u.id, tx(u.name)), ...drag.bind({ kind: "card", id: u.id }), ...drag.keys({ kind: "card", id: u.id }) } : {})}>
                <rect x={x} y={CY} width={cw} height={CH} rx={22} fill={won ? tint(MC_C.answer, 0.86) : "#FFFFFF"} stroke={won ? MC_C.answer : lit ? MC_C.now : C.rule} strokeWidth={won || lit ? 6 : 2.5} />
                <rect x={x + 10} y={CY + TOP} width={cw - 20} height={CH - TOP - 10} rx={14} fill={tint(C.panel, 0.45)} />
                <text x={x + cw / 2} y={CY + (en ? 66 : 72)} textAnchor="middle" fontSize={en ? T.display : 60} fontWeight={700} fill={MC_C.unit}>{tx(u.sym)}</text>
                <text x={x + cw / 2} y={CY + (en ? 108 : 112)} textAnchor="middle" fontSize={mcFit(tx(u.name), cw - 20, T.label)} fontWeight={600} fill={C.ink}>{tx(u.name)}</text>
              </g>
              {((lit && S.demo >= 2) || won) && <text x={x + cw / 2} y={CY + CH + 48} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink} pointerEvents="none">{tx(u.what)}</text>}
            </g>
          );
        })}
        {MC_UNITS.map((u) => ghosts(u.id).map((t, j) => {
          const l = onCard(u.id), s = slotOf(u.id, l.length + j, l.length + ghosts(u.id).length);
          return (
            <g key={"gh-" + t} pointerEvents="none">
              <rect x={s.x} y={s.y} width={76} height={76} rx={12} fill="#FFFFFF" stroke={MC_C.answer} strokeWidth={4} strokeDasharray="8 6" />
              <MCThing id={t} x={s.x + 6} y={s.y + 6} w={64} h={64} />
            </g>
          );
        }))}
        {pieces.map((t) => {
          const u = pos1[t], lifted = dragging("thing", t) || cardDrag === t;
          let x = trayX(things1.indexOf(t)), y = TY, w = tw, h = tH, mini = false;
          if (lifted) { x = drag.drag.x - 60; y = drag.drag.y - 60; w = 120; h = 120; mini = true; }
          else if (u) { const l = onCard(u), s = slotOf(u, l.indexOf(t), l.length + ghosts(u).length); x = s.x; y = s.y; w = 76; h = 76; mini = true; }
          const picked = S.sel === t, name = tx(MC_THING[t]);
          /* a thing in the tray is its own control; a thing on a card lets the press through to the card, which is the one target */
          const own = live && !u && !lifted;
          return (
            <g key={"th-" + t} {...(own || dragging("thing", t) ? { ...control(t, name), ...drag.bind({ kind: "thing", id: t }), ...drag.keys({ kind: "thing", id: t }) } : {})}
              pointerEvents={own || dragging("thing", t) ? undefined : "none"} filter={lifted ? "url(#fLift)" : undefined}>
              <rect x={x} y={y} width={w} height={h} rx={mini ? 12 : 18} fill="#FFFFFF" stroke={picked ? MC_C.now : C.rule} strokeWidth={picked ? 6 : 2.5} />
              <MCThing id={t} x={x + 6} y={y + 6} w={w - 12} h={(mini ? h : h - 58) - 12} />
              {!mini && <text x={x + w / 2} y={y + h - 20} textAnchor="middle" fontSize={mcFit(name, w - 16, T.label)} fontWeight={600} fill={C.ink}>{name}</text>}
              {isDemo && stepOn === t && !mini && <Invite x={x + w / 2} y={y + h / 2} w={w} h={h} rx={18} C={C} />}
            </g>
          );
        })}
      </g>
    );
  };

  const p2 = () => {
    const ac = asked2 && !(asked2.hideCard && !done && S.demo < 1) ? MC_PRE.indexOf(asked2.pre) : -1;
    const card = (c: number) => {
      const name = MC_PRE[c], x = colX2(c) + 4, w = colW2 - 8, y = 4, h = 128;
      if (c === 3) return (
        <g key="base">
          <rect x={x} y={y} width={w} height={h} rx={16} fill={tint(MC_C.now, isDemo || all2 ? 0.55 : 0.85)} stroke={C.ink} strokeWidth={4} />
          <text x={x + w / 2} y={y + 56} textAnchor="middle" fontSize={mcFit(tx("base"), w - 12, 30)} fontWeight={700} fill={C.ink}>{tx("base")}</text>
          <text x={x + w / 2} y={y + 96} textAnchor="middle" fontSize={mcFit(tx("unit"), w - 12, 30)} fontWeight={700} fill={C.ink}>{tx("unit")}</text>
        </g>
      );
      const isUp = up2.includes(name), ask = c === ac && !isUp, wv = MC_WORTH[name];
      return (
        <g key={name}>
          <rect x={x} y={y} width={w} height={h} rx={16} fill={isUp ? "#FFFFFF" : tint(C.panel, 0.15)} stroke={ask || (c === ac && S.demo >= 1) ? MC_C.now : C.rule} strokeWidth={ask || (c === ac && S.demo >= 1) ? 6 : 2.5} />
          <text x={x + w / 2} y={y + 38} textAnchor="middle" fontSize={mcFit(tx(name), w - 12, 30)} fontWeight={700} fill={C.ink}>{tx(name)}</text>
          {isUp && c < 3 && <g pointerEvents="none">
            <text x={x + w / 2} y={y + 84} textAnchor="middle" fontSize={mcFit(wv[0], w - 10, 36)} fontWeight={700} fill={MC_C.unit}>{wv[0]}</text>
            <text x={x + w / 2} y={y + 116} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={MC_C.unit}>{tx(wv[1])}</text>
          </g>}
          {isUp && c > 3 && <g pointerEvents="none">
            <text x={x + w / 2} y={y + 76} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_C.unit}>{wv[0]}</text>
            <line x1={x + w / 2 - 30} y1={y + 86} x2={x + w / 2 + 30} y2={y + 86} stroke={MC_C.unit} strokeWidth={3} />
            <text x={x + w / 2} y={y + 116} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_C.unit}>{wv[1]}</text>
          </g>}
          {!isUp && <g pointerEvents="none">
            <rect x={x + 10} y={y + 54} width={w - 20} height={h - 66} rx={10} fill={shade(C.panel, 0.1)} />
            <path d={`M ${x + w / 2} ${y + 64} L ${x + w / 2 + 16} ${y + 91} L ${x + w / 2} ${y + 118} L ${x + w / 2 - 16} ${y + 91} Z`} fill={tint(C.panel, 0.5)} />
          </g>}
          {isDemo && <Hit id={name} x={x} y={y} w={w} h={h} onPress={() => turnCard(name)} label={tx(name)} />}
          {isDemo && stepOn === name && <Invite x={x + w / 2} y={y + h / 2} w={w} h={h} rx={16} C={C} />}
        </g>
      );
    };
    let band: any = null;
    if (asked2 && S.demo >= 2 && !done) {
      const p = 3 - ac, sym = MC_ROW[asked2.row][ac], base = MC_ROW[asked2.row][3];
      const Lb = A - lw2 - 30, small = Math.max(6, Lb / Math.pow(10, p));
      band = (
        <g pointerEvents="none">
          <MCFact f={"1 " + tx(sym) + " = " + indian(Math.pow(10, p)) + " " + tx(base)} x={lw2} y={182} fs={T.prompt} fill={MC_C.answer} />
          {S.demo >= 3 && <g>
            <text x={10} y={220} fontSize={T.label} fontWeight={700} fill={C.ink}>{"1 " + tx(sym)}</text>
            <rect x={lw2} y={198} width={Lb} height={26} rx={4} fill={tint(MC_C.now, 0.7)} stroke={MC_C.nowInk} strokeWidth={3} />
            {Array.from({ length: p >= 2 ? 99 : 9 }, (_, j) => j + 1).map((j) => {
              const xx = lw2 + (Lb * j) / (p >= 2 ? 100 : 10), big = p < 2 || j % 10 === 0;
              return <line key={j} x1={xx} y1={198} x2={xx} y2={224} stroke={MC_C.nowInk} strokeWidth={big ? 2.5 : 1} />;
            })}
            <text x={10} y={254} fontSize={T.label} fontWeight={700} fill={C.ink}>{"1 " + tx(base)}</text>
            <rect x={lw2} y={232} width={small} height={26} rx={3} fill={tint(MC_C.unit, 0.6)} stroke={MC_C.unit} strokeWidth={2.5} />
            {small > Lb / Math.pow(10, p) + 0.5 && <text x={lw2 + small + 16} y={260} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("not to scale")}</text>}
          </g>}
        </g>
      );
    } else if (all2) {
      band = (
        <g pointerEvents="none">
          <text x={colX2(0) + 6} y={190} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("bigger units")}</text>
          <text x={colX2(7) - 6} y={190} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("smaller units")}</text>
          <path d={`M ${colX2(0) + 16} 226 H ${colX2(7) - 16} M ${colX2(0) + 16} 226 l 18 -12 M ${colX2(0) + 16} 226 l 18 12 M ${colX2(7) - 16} 226 l -18 -12 M ${colX2(7) - 16} 226 l -18 12`} stroke={C.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
          <circle cx={colX2(3) + colW2 / 2} cy={226} r={16} fill={MC_C.now} stroke={MC_C.nowInk} strokeWidth={3} />
        </g>
      );
    }
    return (
      <g>
        {MC_PRE.map((_, c) => card(c))}
        {band}
        {MC_ROWS.map((r, ri) => {
          const y = RY(ri), lit = !!asked2 && asked2.row === r;
          return (
            <g key={r} pointerEvents="none">
              <text x={10} y={y + 50} fontSize={mcFit(tx(r), lw2 - 24, T.label)} fontWeight={600} fill={C.ink}>{tx(r)}</text>
              {MC_ROW[r].map((sym: string, c: number) => (
                <g key={c}>
                  <rect x={colX2(c) + 2} y={y} width={colW2 - 4} height={76} rx={10} fill={lit ? tint(MC_C.now, 0.82) : "#FFFFFF"}
                    stroke={c === 3 ? C.ink : lit && c === ac ? MC_C.nowInk : C.rule} strokeWidth={c === 3 ? 4 : lit && c === ac ? 5 : 2} />
                  <text x={colX2(c) + colW2 / 2} y={y + 52} textAnchor="middle" fontSize={Math.min(...MC_ROW[r].map((v: string) => mcFit(tx(v), colW2 - 16, T.prompt)))} fontWeight={700} fill={MC_C.unit}>{tx(sym)}</text>
                </g>
              ))}
            </g>
          );
        })}
      </g>
    );
  };

  const p3 = () => {
    const merged = sShow > 0 && view3 === "merged";
    const unitBars = merged ? cur3 + 1 : cur3;             /* the unit of the small bars on show */
    const ticks = merged ? sShow >= 2 : sShow >= 1;         /* each small bar is itself ten of the unit to its right */
    const closed = merged || view3 === "closing";
    const nArrows = showAll ? (done ? k3 : Math.min(S.demo, k3)) : sShow;
    const facts = showAll && (done || S.demo > k3) ? mcFacts(P3, tx) : [];
    const bar = (i: number) => {
      const xi = closed ? bx0 + i * bw : bx0 - 4.5 * gap3 + i * (bw + gap3);
      return (
        <g key={i} style={{ transform: `translate(${xi}px, 0px)`, transition: rm ? "none" : "transform 0.5s ease-in-out" } as any}>
          <rect x={0} y={BY} width={bw} height={BH3} rx={merged ? 0 : 6} fill={tint(MC_C.unit, 0.8)} stroke={MC_C.unit} strokeWidth={merged ? 2 : 2.5} />
          {ticks && Array.from({ length: 9 }, (_, j) => j + 1).map((j) => <line key={j} x1={(bw * j) / 10} y1={BY + 8} x2={(bw * j) / 10} y2={BY + BH3 - 8} stroke={MC_C.unit} strokeWidth={1.2} />)}
        </g>
      );
    };
    return (
      <g>
        <g pointerEvents="none">
          {facts.map((f, j) => (
            <MCFact key={j} f={f} x={A / 2 + (j - (facts.length - 1) / 2) * Math.min(440, A / 2)} y={64} fs={T.prompt} fill={MC_C.answer} centre />
          ))}
          <text x={merged ? bx0 + 5 * bw : bx0 - 4.5 * gap3 + bw / 2} y={BY - 14} textAnchor="middle" fontSize={merged ? T.prompt : T.label} fontWeight={700} fill={merged ? MC_C.nowInk : MC_C.unit}>{"1 " + tx(row3[merged ? cur3 : unitBars])}</text>
          {Array.from({ length: 10 }, (_, i) => bar(i))}
          {merged && <rect x={bx0} y={BY} width={10 * bw} height={BH3} rx={6} fill="none" stroke={MC_C.nowInk} strokeWidth={5} />}
        </g>
        <g pointerEvents="none">
          {row3.map((sym, c) => {
            const x = rx3 + c * colW3, mk = c === cur3;
            return (
              <g key={c}>
                <rect x={x + 3} y={246} width={colW3 - 6} height={86} rx={12} fill={mk ? tint(MC_C.now, 0.7) : "#FFFFFF"} stroke={mk ? MC_C.nowInk : c === 3 ? C.ink : C.rule} strokeWidth={mk ? 6 : c === 3 ? 4 : 2} />
                <text x={x + colW3 / 2} y={304} textAnchor="middle" fontSize={Math.min(...row3.map((v: string) => mcFit(tx(v), colW3 - 18, T.prompt)))} fontWeight={700} fill={MC_C.unit}>{tx(sym)}</text>
              </g>
            );
          })}
          {Array.from({ length: nArrows }, (_, i) => {
            const c1 = P3.from - i, x1 = rx3 + (c1 + 0.5) * colW3, x2 = rx3 + (c1 - 0.5) * colW3, xm = (x1 + x2) / 2;
            return (
              <g key={i}>
                <path d={`M ${x1 - 6} 338 Q ${xm} 386 ${x2 + 10} 340`} stroke={MC_C.move} strokeWidth={5} fill="none" strokeLinecap="round" />
                <path d={`M ${x2 + 10} 340 l 4 18 M ${x2 + 10} 340 l 18 -2`} stroke={MC_C.move} strokeWidth={5} fill="none" strokeLinecap="round" />
                <text x={xm} y={412} textAnchor="middle" fontSize={T.micro + 2} fontWeight={700} fill={MC_C.move}>{showAll ? "× 10" : tx("Move")}</text>
              </g>
            );
          })}
        </g>
        <Key id="step" label={tx("Step left")} x={A / 2 - 150} y={426} w={300} h={80} C={C} tone="key" disabled={!canStep} onClick={pressStep}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={canStep ? toneInk("key", C.ink) : "#5F584E"}>{tx("Step left")}</text>
        </Key>
        {canStep && (isDemo || sShow === 0) && <BlinkRing x={A / 2 - 150} y={426} w={300} h={80 + EDGE} C={C} />}
      </g>
    );
  };

  const p4 = () => {
    const ac = !free && !isDemo ? P4.at : -1;
    const TRX = 140;   /* the tray of given tiles, right of its label */
    const litCol = S.demo >= 1 && !done ? ac : -1;
    const trayTiles = tiles4.map((_, i) => i).filter((i) => cellT.indexOf(i) < 0 || dragging("tile", i));
    const showRead = free || (isDemo && st >= 2) || win4 || (S.demo >= 2 && !done);
    const readNum = free ? mcRead(fc, fp) : isDemo ? mcRead(MC_DEMO4.digits, 0) : P4.answer;
    const readUnit = free ? row4[fp === null || fp === undefined ? Math.max(0, fc.map((d, c) => (d === null ? -1 : c)).reduce((a, b) => Math.max(a, b), 0)) : fp] : row4[isDemo ? 0 : P4.at];
    const green = win4;
    const showDrop = !free && !win4 && tiles4.some((_, i) => cellT.indexOf(i) < 0);
    /* the read-out: at the row's left, or right of the Drop key while that key stands, at the biggest size its room allows */
    const numEm = String(readNum).replace(/[^0-9]/g, "").length * 0.62 + (String(readNum).includes(".") ? 0.32 : 0);
    const readX = showDrop ? A / 2 + 146 : x4 + 6;
    const readFs = Math.max(T.micro, Math.min(T.xl, (A - 16 - readX) / (numEm + 0.36 + mcEm(tx(readUnit)))));
    const tile = (i: number, x: number, y: number, lifted: boolean) => {
      const tt = tiles4[i];
      return (
        <g key={"tile" + i} {...(live ? { ...control("tile-" + i, String(tt.d)), ...drag.bind({ kind: "tile", id: i }), ...drag.keys({ kind: "tile", id: i }) } : {})} filter={lifted ? "url(#fLift)" : undefined}>
          <rect x={x} y={y} width={92} height={92} rx={14} fill={tint(MC_C.given, 0.86)} stroke={tt.d === 0 ? MC_C.zero : MC_C.given} strokeWidth={3} />
          <text x={x + 46} y={y + 72} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={tt.d === 0 ? MC_C.zero : MC_C.given}>{tt.d}</text>
        </g>
      );
    };
    return (
      <g>
        {!free && !P4.given && !win4 && trayTiles.length > 0 && <text x={20} y={66} fontSize={T.label} fontWeight={700} fill={C.ink} pointerEvents="none">{tx("Given")}</text>}
        {row4.map((sym, c) => {
          const x = x4 + c * colW4, lit = c === litCol, d = digit4(c), ghost = S.demo >= 2 && !done && !free && d === null && P4.digits && P4.digits[c] !== null;
          return (
            <g key={c}>
              <g pointerEvents="none">
                <rect x={x + 3} y={136} width={colW4 - 6} height={68} rx={12} fill={lit ? tint(MC_C.now, 0.6) : "#FFFFFF"} stroke={lit ? MC_C.nowInk : c === 3 ? C.ink : C.rule} strokeWidth={lit ? 6 : c === 3 ? 4 : 2} />
                <text x={x + colW4 / 2} y={184} textAnchor="middle" fontSize={Math.min(...row4.map((v: string) => mcFit(tx(v), colW4 - 18, T.prompt)))} fontWeight={700} fill={MC_C.unit}>{tx(sym)}</text>
                <rect x={x + 3} y={210} width={colW4 - 6} height={106} rx={12} fill={tint(C.panel, 0.55)} stroke={c === 3 ? C.ink : C.rule} strokeWidth={c === 3 ? 4 : 2} />
                {d !== null && (free || P4.given || win4) && <text x={x + colW4 / 2} y={288} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={green ? MC_C.answer : d === 0 ? MC_C.zero : MC_C.given}>{d}</text>}
                {ghost && <text x={x + colW4 / 2} y={288} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={MC_C.answer}>{P4.digits[c]}</text>}
              </g>
              {free && <Hit id={"cell-" + c} x={x + 8} y={214} w={colW4 - 16} h={98} onPress={() => tapFreeCell(c)} label={tx(sym)} />}
            </g>
          );
        })}
        {!free && !P4.given && !win4 && tiles4.map((tt, i) => {
          const at = cellT.indexOf(i);
          if (at < 0 || dragging("tile", i)) return null;
          return tile(i, x4 + at * colW4 + (colW4 - 92) / 2, 216, false);
        })}
        {!free && !P4.given && !win4 && trayTiles.map((i) => (dragging("tile", i) ? tile(i, drag.drag.x - 46, drag.drag.y - 46, true) : tile(i, TRX + i * 106, 10, false)))}
        {ptNow !== null && ptNow !== undefined && !win4 && <circle cx={gapX(ptNow)} cy={292} r={11} fill={C.ink} pointerEvents="none" />}
        {win4 && <circle cx={gapX(P4.at)} cy={292} r={11} fill={MC_C.answer} pointerEvents="none" />}
        {S.demo >= 1 && !done && !free && ptNow !== P4.at && <circle cx={gapX(P4.at)} cy={292} r={18} fill="none" stroke={MC_C.nowInk} strokeWidth={5} pointerEvents="none" />}
        {row4.map((_, g) => (
          <g key={"g" + g}>
            <path d={`M ${gapX(g) - 16} 372 L ${gapX(g)} 344 L ${gapX(g) + 16} 372`} fill={ptNow === g ? C.ink : "none"} stroke={ptNow === g ? C.ink : C.rule} strokeWidth={3} strokeLinejoin="round" pointerEvents="none" />
            {(live || free) && <Hit id={"gap-" + g} x={gapX(g) - 36} y={324} w={72} h={72} onPress={() => tapGap(g)} label={tx("point after") + " " + tx(row4[g])} />}
            {isDemo && stepOn === "gap-" + g && <Invite x={gapX(g)} y={360} r={40} C={C} />}
          </g>
        ))}
        {showRead && readNum !== "" && <g pointerEvents="none">
          <text x={readX} y={474} fontSize={readFs} fontWeight={700} fill={MC_C.answer}>{readNum}</text>
          <text x={readX + (numEm + 0.36) * readFs} y={474} fontSize={readFs} fontWeight={700} fill={MC_C.answer}>{tx(readUnit)}</text>
        </g>}
        {showDrop && <Key id="drop" label={tx("Drop")} x={A / 2 - 130} y={420} w={260} h={80} C={C} tone="key" onClick={dropAll}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("Drop")}</text>
        </Key>}
        {isDemo && stepOn === "drop" && showDrop && <BlinkRing x={A / 2 - 130} y={420} w={260} h={80 + EDGE} C={C} />}
      </g>
    );
  };

  return <g>{free ? p4() : n === 1 ? p1() : n === 2 ? p2() : n === 3 ? p3() : p4()}</g>;
}

/* the summary page's small drawing of the child's last right answer in a phase: the fact it stands for, in green, every unit
   through tx (the units the things went on; "1 km = 1,000 m"; "1 m = 1,000 mm"; "7.036 km") */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const item = it || {};
  if (!result || !result.last || !item.kind) return null;
  /* phase 1: each thing of the question beside the unit it went on (its picture, then the unit) */
  if (item.kind === "sort") {
    /* the pairs are laid out by what each needs: every picture at the same size in every language, each unit at 30, the room
       left shared out between them; only when three pairs cannot fit (Hindi) do the pictures shrink, all alike */
    const a = mcPairs(item.answer), th = item.things || [], n0 = Math.max(1, th.length), fs = 30;
    const tws = th.map((t: string) => mcEm(tx(a[t])) * fs), avail = w - 16, sum = tws.reduce((p: number, q: number) => p + q, 0);
    const sz = Math.max(16, Math.min(h - 14, (avail - sum - 4 * n0) / n0)), gap = Math.max(0, (avail - sum - n0 * (sz + 4)) / n0);
    let cx = 8 + gap / 2;
    return (
      <g>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
        {th.map((t: string, j: number) => {
          const x0 = cx;
          cx += sz + 4 + tws[j] + gap;
          return (
            <g key={t}>
              <MCThing id={t} x={x0} y={(h - sz) / 2} w={sz} h={sz} />
              <text x={x0 + sz + 4} y={h / 2 + fs * 0.36} fontSize={fs} fontWeight={700} fill={MC_C.answer}>{tx(a[t])}</text>
            </g>
          );
        })}
      </g>
    );
  }
  const lines = mcFacts(item, tx, result.last.value);
  const s = lines[lines.length - 1] || "";
  /* 6 clear each side; a fact that cannot fit one line at the 28 floor goes on two ("1 किमी =" over "1,000 मी") */
  const one = mcEm(s) * T.micro <= w - 12;
  const i2 = s.indexOf(" = ");
  if (!one && i2 > 0) {
    const l1 = s.slice(0, i2 + 2), l2 = s.slice(i2 + 3);
    return (
      <g>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
        <text x={w / 2} y={h / 2 - 3} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={MC_C.answer}>{l1}</text>
        <text x={w / 2} y={h / 2 + 25} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={MC_C.answer}>{l2}</text>
      </g>
    );
  }
  const fs = s.indexOf(" = ") > 0 ? T.micro : Math.max(T.micro, Math.min(T.label, (w - 12) / (1.15 * Math.max(0.5, mcEm(s)))));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={MC_C.answer}>{s}</text>
    </g>
  );
}

function MetricChart(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the pad's point key (BUILD_CARD §7, ch 9): reading a measure off the chart as one decimal IS placing the point, so the
         decimals of phase 4 are typed with it; it stands on every question, so the pad never hints which answer has a point */
      pointKey: true,
      /* the board layout (LAYOUT.md §1b): the question and an Answer key on a bar across the top, the working area the
         whole card until the child taps Answer, the answer box and keypad in a panel that slides in from the right */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16; needs board: true): no question bar, only its blinking key at the top right;
         the working area is 64,108, 1472 x 520 and the key's corner is props.box.key (keep every element out of it); the question lives
         only in the bubble. Opt out (a picture that needs the bar's room) by deleting this line, with the reason in the report. */
      keyOnly: true,
      /* the wide keypad (LAYOUT.md §1b, PATTERNS.md 9g; the owner: "empty space left of the keypad, increase its size"): the answer
         panel is 556 wide and the picture has x 64 to 964 while it is open. Keep it when the picture fits there; set it to false (or
         delete it) when the picture needs the full 1086 width: `check`'s board-fit names what runs under the panel. */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; after a right answer the win picture waits for the child's tap on
         the blinking Next key (the question bar's right end; the classic layout: the answer slot's place). Delete to keep the timers. */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d; stands alone): the phase bar becomes one small clickable dot per phase, no text; a tap starts
         THAT phase, in user and AI mode. Delete this line to keep the bar. */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      /* the keypad colours: leave THEME unset and the image agent's TOOL_THEME (the slot's images.tsx) is picked up by the
         runtime by itself; set THEME here only to override it (docs/IMAGES.md) */
      }} />
  );
}

export default MetricChart;
