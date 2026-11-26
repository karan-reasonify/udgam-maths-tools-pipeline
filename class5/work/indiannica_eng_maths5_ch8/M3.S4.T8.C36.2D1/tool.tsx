/* ═══ M3.S4.T8.C36.2D1 · cube_counter · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "cube_counter";
const MEDIA_ID = "M3.S4.T8.C36.2D1";
const TOOL_NAME = "Cube Counter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only */
const OPENING: string[] = [];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "You measured space by the cubes that fill it, hidden ones too.";
/* printed when the child opens Free play; its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Lift the layers and count every cube.";

/* ── the cube kit: colours, the isometric projection, one cube, one open box ───────────────── */
const CC_INK = "#2B2B2B", CC_VIO = "#6A4FD0", CC_AMB = "#E69F00", CC_GRN = "#009E73", CC_BLU = "#0072B2", CC_KRAFT = "#C9A06A", CC_WOOD = "#E9D4AE";
/* the layout width: the working area with the wide keypad OPEN, so no picture moves when the keypad opens */
const CC_LW = 900;
const CC_FREE = { kind: "stack", P: 3, Q: 2, L: 4 };
/* isometric: i runs right and down, j left and down, k up; a is the cube's edge in work units */
const ccProj = (x0: number, y0: number, a: number) => (i: number, j: number, k: number) => [x0 + (i - j) * a * 0.866, y0 + ((i + j) * a) / 2 - k * a];
const ccPts = (ps: any[]) => ps.map((p: any) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
const ccSort = (cs: any[]) => cs.slice().sort((p: any, q: any) => p[0] + p[1] + p[2] - (q[0] + q[1] + q[2]));
/* the cells of one layer of a stack (a 6 x 2 layer with one back corner missing holds 11) */
const ccCells = (it: any) => {
  const out: any[] = [];
  for (let j = 0; j < it.Q; j++) for (let i = 0; i < it.P; i++) if (!(it.gap && i === it.P - 1 && j === 0)) out.push([i, j]);
  return out;
};
/* the carried piece of a hand act stops drawing the moment it lands (the act layer would carry it off with the hand) */
let CC_HOLD_OFF = 0, CC_TAG = 0;
function CcHold({ node, tag }: any) {
  const [, tick] = useState(0);
  useEffect(() => {
    let id = 0;
    const loop = () => { tick((v: number) => v + 1); id = window.setTimeout(loop, 40); };
    id = window.setTimeout(loop, 40);
    return () => window.clearTimeout(id);
  }, []);
  return CC_HOLD_OFF === tag ? null : node;
}

/* Common SVG filter and gradient definitions for elevated visuals */
function CcDefs() {
  return (
    <defs>
      <filter id="cc-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#1E293B" floodOpacity="0.14" />
      </filter>
      <filter id="cc-shadow-lg" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.18" />
      </filter>
      <filter id="cc-glow-amber" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#E69F00" floodOpacity="0.5" />
      </filter>
      <filter id="cc-glow-green" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#009E73" floodOpacity="0.5" />
      </filter>
      <linearGradient id="cc-plank-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D4A373" />
        <stop offset="40%" stopColor="#B98A55" />
        <stop offset="100%" stopColor="#7A5530" />
      </linearGradient>
      <linearGradient id="cc-chip-green" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E6F7F0" />
        <stop offset="100%" stopColor="#C2F0DD" />
      </linearGradient>
      <linearGradient id="cc-chip-amber" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF8E7" />
        <stop offset="100%" stopColor="#FFE8B3" />
      </linearGradient>
    </defs>
  );
}

/* the nudge ring: drawn where it is asked (no outward spread), a deeper rose than the invite so it is seen after a miss */
function CcRing({ x, y, w, h, rx = 18 }: any) {
  return (
    <rect data-role="nudge-ring" x={x} y={y} width={w} height={h} rx={rx} fill="none" stroke="#C2407F" strokeWidth={5} pointerEvents="none">
      <animate attributeName="stroke-opacity" values="1;0.35;1" dur="0.9s" repeatCount="3" fill="freeze" />
    </rect>
  );
}
/* a transparent tap target that lets Enter pass to the window once its part of the answer is done (PATTERNS 5b) */
function CcTap({ id, x, y, w, h, label, onPress, pass = false }: any) {
  const p = usePress(onPress, true);
  return (
    <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label || id} x={x} y={y} width={w} height={h} fill="transparent"
      {...p.bind()} onKeyDown={(e: any) => { if (pass && e.key === "Enter") return; p.keys(e); }} />
  );
}

/* one unit cube: three plain faces (the fallback), the wooden skin, the colour code over it, the ink edges */
function ccCube(P: any, i: number, j: number, k: number, col: string, o: any) {
  const A = P(i, j, k + 1), B = P(i + 1, j, k + 1), M = P(i + 1, j + 1, k + 1), D = P(i, j + 1, k + 1);
  const E = P(i + 1, j, k), F = P(i + 1, j + 1, k), G = P(i, j + 1, k);
  const see = !!o.see, fo = see ? 0.16 : 1, sk = o.skin && !see;
  const hex = [A, B, E, F, G, D];
  const d = "M " + hex.map((p: any) => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L ") + " Z"
    + ` M ${M[0].toFixed(1)} ${M[1].toFixed(1)} L ${B[0].toFixed(1)} ${B[1].toFixed(1)} M ${M[0].toFixed(1)} ${M[1].toFixed(1)} L ${D[0].toFixed(1)} ${D[1].toFixed(1)} M ${M[0].toFixed(1)} ${M[1].toFixed(1)} L ${F[0].toFixed(1)} ${F[1].toFixed(1)}`;
  return (
    <g key={o.key}>
      <polygon points={ccPts([D, M, F, G])} fill={col} fillOpacity={fo} />
      <polygon points={ccPts([B, M, F, E])} fill={shade(col, 0.22)} fillOpacity={fo} />
      <polygon points={ccPts([A, B, M, D])} fill={tint(col, 0.3)} fillOpacity={fo} />
      {sk && <Skin name="cube" x={G[0]} y={A[1]} w={E[0] - G[0]} h={F[1] - A[1]} fit="stretch" />}
      {sk && o.tint !== 0 && <polygon points={ccPts([D, M, F, G])} fill={col} fillOpacity={o.tint ?? 0.85} />}
      {sk && o.tint !== 0 && <polygon points={ccPts([B, M, F, E])} fill={shade(col, 0.12)} fillOpacity={o.tint ?? 0.85} />}
      {sk && o.tint !== 0 && <polygon points={ccPts([A, B, M, D])} fill={tint(col, 0.15)} fillOpacity={o.tint ?? 0.85} />}
      <path d={d} fill="none" stroke={CC_INK} strokeWidth={see ? 1.6 : 2.4} strokeLinejoin="round" strokeLinecap="round" />
    </g>
  );
}

/* an open cardboard box (or, ghost, the dashed outline of a solid to be built from cubes): its back walls go under the
   cubes, its front walls over them, see-through, so the cubes inside show */
function ccBox(P: any, dd: number[], id: string, ghost: boolean, part: string, C: any) {
  const [I, J, K] = dd;
  const A = P(0, 0, K), B = P(I, 0, K), M = P(I, J, K), D = P(0, J, K), E = P(I, 0, 0), F = P(I, J, 0), G = P(0, J, 0);
  if (ghost) {
    const d = "M " + [A, B, E, F, G, D].map((p: any) => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L ") + " Z"
      + ` M ${M[0]} ${M[1]} L ${B[0]} ${B[1]} M ${M[0]} ${M[1]} L ${D[0]} ${D[1]} M ${M[0]} ${M[1]} L ${F[0]} ${F[1]}`;
    return (
      <g>
        {part === "back" && <polygon points={ccPts([A, B, E, F, G, D])} fill={tint(C.panel, 0.4)} />}
        <path d={d} fill="none" stroke={CC_INK} strokeWidth={2.5} strokeDasharray="12 9" strokeLinejoin="round" />
      </g>
    );
  }
  const wall = (pts: any[], key: string, op: number, dark: number) => {
    const xs = pts.map((p: any) => p[0]), ys = pts.map((p: any) => p[1]);
    const bx = Math.min(...xs), by = Math.min(...ys), cid = "cc-w-" + id + "-" + key;
    return (
      <g key={key}>
        <clipPath id={cid}><polygon points={ccPts(pts)} /></clipPath>
        <polygon points={ccPts(pts)} fill={shade(CC_KRAFT, dark)} fillOpacity={op} />
        {op >= 0.5 && <Skin name="carton" x={bx} y={by} w={Math.max(...xs) - bx} h={Math.max(...ys) - by} clip={`url(#${cid})`} opacity={op} />}
        {dark > 0 && <polygon points={ccPts(pts)} fill="#3A2A14" fillOpacity={dark * 0.7 * op} />}
        <polygon points={ccPts(pts)} fill="none" stroke={shade(CC_KRAFT, 0.55)} strokeWidth={2.5} strokeLinejoin="round" />
      </g>
    );
  };
  const O = P(0, 0, 0);
  if (part === "back") return (
    <g>
      {wall([A, D, G, O], "bl", 1, 0.3)}
      {wall([A, B, E, O], "br", 1, 0.18)}
      <polygon points={ccPts([O, E, F, G])} fill={shade(CC_KRAFT, 0.2)} stroke={shade(CC_KRAFT, 0.55)} strokeWidth={2} />
    </g>
  );
  return (
    <g>
      {wall([D, M, F, G], "fl", 0.03, 0)}
      {wall([B, M, F, E], "fr", 0.03, 0.12)}
      <path d={`M ${A[0]} ${A[1]} L ${B[0]} ${B[1]} L ${M[0]} ${M[1]} L ${D[0]} ${D[1]} Z`} fill="none" stroke={shade(CC_KRAFT, 0.6)} strokeWidth={3} strokeLinejoin="round" />
    </g>
  );
}

/* THE START PAGE: a stack of wooden unit cubes beside an open cardboard box, half filled */
const START_HOOK = "How many cubes would fill a box, even the ones you cannot see?";
function StartArt({ box, C, lang, tx }: any) {
  const a = 50, c = a * 0.866;
  const P1 = ccProj(430 - (3 - 2) * c / 2, 326 - 2.5 * a, a);
  const stack: any[] = [];
  for (let k = 0; k < 3; k++) for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) stack.push([i, j, k]);
  const P2 = ccProj(820 - (4 - 2) * c / 2, 326 - 3 * a, a);
  const fill: any[] = [];
  for (let j = 0; j < 2; j++) for (let i = 0; i < 4; i++) fill.push([i, j, 0]);
  return (
    <g>
      <CcDefs />
      {ccSort(stack).map((q: any, n: number) => ccCube(P1, q[0], q[1], q[2], CC_VIO, { key: "s" + n, skin: true }))}
      {ccBox(P2, [4, 2, 2], "start", false, "back", C)}
      {ccSort(fill).map((q: any, n: number) => ccCube(P2, q[0], q[1], q[2], CC_VIO, { key: "f" + n, skin: true }))}
      {ccBox(P2, [4, 2, 2], "start", false, "front", C)}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final. */
const TR: any = {
  hi: {
        "Tap the box that takes up more space.": "ज़्यादा जगह घेरने वाले डिब्बे पर टैप करो।",
        "Tap the solid that takes up more space.": "ज़्यादा जगह घेरने वाले ठोस पर टैप करो।",
        "Add up the cubes of all 4 layers.": "सभी 4 परतों के घन जोड़ो।",
        "Multiply the cubes in one layer by the number of layers.": "एक परत के घनों को परतों की संख्या से गुणा करो।",
    "Cube Counter": "घन गिनती",
    "Space taken up": "घेरी गई जगह",
    "The unit cube": "इकाई घन",
    "Counting cubes": "घन गिनना",
    "Hidden cubes count too": "छिपे घन भी गिनो",
    "Free play. Lift the layers and count every cube.": "खुला खेल। परतें उठाओ और हर घन गिनो।",
    "How many cubes would fill a box, even the ones you cannot see?": "एक डिब्बा कितने घनों से भरेगा, छिपे घन भी?",
    "You measured space by the cubes that fill it, hidden ones too.": "तुमने जगह को उसे भरने वाले घनों से नापा, छिपे घन भी।",
    "The volume of a solid is the amount of space it takes up.": "किसी ठोस का आयतन वह जगह है जो वह घेरता है।",
    "You learned: volume is the amount of space a solid takes up.": "तुमने सीखा: आयतन वह जगह है जो कोई ठोस घेरता है।",
    "Shoebox": "जूते का डिब्बा",
    "Pencil box": "पेंसिल बॉक्स",
    "Pencil": "पेंसिल",
    "School bag": "स्कूल बैग",
    "Wide box": "चौड़ा डिब्बा",
    "Tall box": "ऊँचा डिब्बा",
    "Fill both boxes with cubes, then tap the one that takes up more space.": "दोनों डिब्बे भरो, फिर ज़्यादा जगह घेरने वाले को टैप करो।",
    "Which takes more space?": "कौन ज़्यादा जगह घेरता है?",
    "Look at how many cubes each box held.": "देखो हर डिब्बे में कितने घन आए।",
    "Yes, the shoebox. That space is called its volume.": "हाँ, जूते का डिब्बा। उस जगह को उसका आयतन कहते हैं।",
    "Now fill the pencil and the school bag; which one takes up more space?": "अब पेंसिल और स्कूल बैग भरो; कौन ज़्यादा जगह घेरता है?",
    "Bag or pencil?": "बैग या पेंसिल?",
    "Count the cubes in each, not how far it reaches.": "हर एक के घन गिनो, उसकी लंबाई नहीं।",
    "Yes, the school bag: a long thin solid can take up less space.": "हाँ, स्कूल बैग: लंबा पतला ठोस कम जगह घेर सकता है।",
    "Which takes up more space, the wide box or the tall box?": "कौन ज़्यादा जगह घेरता है, चौड़ा डिब्बा या ऊँचा डिब्बा?",
    "Wide or tall?": "चौड़ा या ऊँचा?",
    "Count the cubes inside, not the height.": "अंदर के घन गिनो, ऊँचाई नहीं।",
    "Yes, the wide box holds more cubes though it is not as tall.": "हाँ, चौड़ा डिब्बा कम ऊँचा है, फिर भी ज़्यादा घन रखता है।",
    "The box that holds more cubes takes up more space.": "जिस डिब्बे में ज़्यादा घन आते हैं, वह ज़्यादा जगह घेरता है।",
    "Read the number beside each box, then tap the box with the greater number.": "हर डिब्बे के पास की संख्या पढ़ो, फिर बड़ी संख्या वाले डिब्बे को टैप करो।",
    "Tap Fill to put cubes in both boxes.": "दोनों डिब्बे भरने के लिए भरो बटन टैप करो।",
    "Tap Fill to put cubes in both solids.": "दोनों ठोस भरने के लिए भरो बटन टैप करो।",
    "Fill": "भरो",
    "cubes": "घन",
    "Greater volume": "ज़्यादा आयतन",
    "Volume is counted in unit cubes, and they come in different sizes.": "आयतन इकाई घनों से गिना जाता है, और वे अलग-अलग माप के होते हैं।",
    "A unit cube with 1 cm edges has a volume of 1 cubic centimetre.": "1 सेंटीमीटर किनारों वाले इकाई घन का आयतन 1 घन सेंटीमीटर है।",
    "You learned: pick a unit cube that fits the size of the thing.": "तुमने सीखा: चीज़ के माप के हिसाब से इकाई घन चुनो।",
    "Tap the unit cube you would use to measure a classroom.": "कक्षा को नापने वाले इकाई घन पर टैप करो।",
    "Unit for a classroom?": "कक्षा के लिए इकाई?",
    "Compare the cube's edge with the size of the room.": "घन के किनारे की तुलना कमरे के माप से करो।",
    "Yes, a classroom is measured in cubic metres.": "हाँ, कक्षा घन मीटर में नापी जाती है।",
    "1 cu. mm": "1 घन मिमी",
    "1 cu. cm": "1 घन सेमी",
    "1 cu. m": "1 घन मी",
    "A unit cube has edges 1 m long, so what is its volume?": "एक इकाई घन के किनारे 1 मीटर लंबे हैं, तो उसका आयतन क्या है?",
    "Volume of this cube?": "इस घन का आयतन?",
    "Look at how long each edge is.": "देखो हर किनारा कितना लंबा है।",
    "Yes, its volume is 1 cubic metre.": "हाँ, इसका आयतन 1 घन मीटर है।",
    "Its edges are measured in metres, not centimetres.": "इसके किनारे मीटर में नापे गए हैं, सेंटीमीटर में नहीं।",
    "The unit of the volume follows the unit of the edges.": "आयतन की इकाई किनारों की इकाई से बनती है।",
    "Now pick the unit cube that suits a grain of sugar.": "अब चीनी के दाने के लिए सही इकाई घन चुनो।",
    "Unit for sugar?": "चीनी के लिए इकाई?",
    "Compare the cube's edge with the size of the grain.": "घन के किनारे की तुलना दाने के माप से करो।",
    "Yes, a grain of sugar is measured in cubic millimetres.": "हाँ, चीनी का दाना घन मिलीमीटर में नापा जाता है।",
    "Think whether it is very small, small or very large.": "सोचो, वह बहुत छोटा है, छोटा है या बहुत बड़ा।",
    "Tiny things take tiny unit cubes, and huge things take huge ones.": "छोटी चीज़ों के लिए छोटे घन, बड़ी चीज़ों के लिए बड़े घन।",
    "Tap a unit cube to put it on the card.": "कार्ड पर रखने के लिए एक इकाई घन टैप करो।",
    "Classroom": "कक्षा",
    "Grain of sugar": "चीनी का दाना",
    "Unit cube": "इकाई घन",
    "1 m": "1 मी",
    "1 cm": "1 सेमी",
    "1 mm": "1 मिमी",
    "cu. m": "घन मी",
    "cu. cm": "घन सेमी",
    "cu. mm": "घन मिमी",
    "Not drawn to size.": "माप के अनुसार नहीं बना।",
    "Count one row. How many rows are there?": "एक पंक्ति गिनो। कितनी पंक्तियाँ हैं?",
    "Tap Count row to count the front row of cubes.": "आगे की पंक्ति गिनने के लिए पंक्ति गिनो टैप करो।",
    "Tap the Count row key.": "पंक्ति गिनो बटन टैप करो।",
    "Tap Count row again to count the row behind it.": "पीछे की पंक्ति के लिए फिर से पंक्ति गिनो टैप करो।",
    "Count the next row with the same key.": "उसी बटन से अगली पंक्ति गिनो।",
    "The number of unit cubes that fill a solid is its volume.": "किसी ठोस को भरने वाले इकाई घनों की संख्या उसका आयतन है।",
    "You learned: count the unit cubes row by row to find the volume.": "तुमने सीखा: आयतन के लिए इकाई घन पंक्ति दर पंक्ति गिनो।",
    "Each cube is 1 cm, so count the rows and find the volume of this solid.": "हर घन 1 सेंटीमीटर का है, पंक्तियाँ गिनकर इस ठोस का आयतन बताओ।",
    "Volume in cu. cm?": "आयतन घन सेमी में?",
    "Count both rows, not only the front one.": "दोनों पंक्तियाँ गिनो, सिर्फ़ आगे वाली नहीं।",
    "Yes, 2 rows of 9 cubes make 18 cubic centimetres.": "हाँ, 9 घनों की 2 पंक्तियाँ 18 घन सेंटीमीटर बनाती हैं।",
    "A single row of these cubes lies on a desk; what is its volume?": "इन घनों की एक पंक्ति मेज़ पर रखी है; उसका आयतन क्या है?",
    "Volume of the row?": "पंक्ति का आयतन?",
    "Every cube in the row is 1 cubic centimetre.": "पंक्ति का हर घन 1 घन सेंटीमीटर है।",
    "Yes, 7 cubes make 7 cubic centimetres.": "हाँ, 7 घन 7 घन सेंटीमीटर बनाते हैं।",
    "Count the rows of this bigger solid and find its volume.": "इस बड़े ठोस की पंक्तियाँ गिनो और उसका आयतन बताओ।",
    "There are more rows behind the front one.": "आगे वाली के पीछे और पंक्तियाँ हैं।",
    "Yes, 4 rows of 9 cubes make 36 cubic centimetres.": "हाँ, 9 घनों की 4 पंक्तियाँ 36 घन सेंटीमीटर बनाती हैं।",
    "Add the cubes of every row.": "हर पंक्ति के घन जोड़ो।",
    "Every row holds the same number of cubes, so add it once for each row.": "हर पंक्ति में बराबर घन हैं, तो हर पंक्ति के लिए वह संख्या एक बार जोड़ो।",
    "Count every row first.": "पहले हर पंक्ति गिनो।",
    "Count row": "पंक्ति गिनो",
    "unit cubes": "इकाई घन",
    "Some cubes are hiding. Lift the layers and count them all.": "कुछ घन छिपे हैं। परतें उठाओ और सब गिनो।",
    "Tap Lift layer to lift the top layer off the stack.": "ऊपर की परत हटाने के लिए परत उठाओ टैप करो।",
    "Tap the Lift layer key.": "परत उठाओ बटन टैप करो।",
    "Tap Lift layer again to see the layer under it.": "नीचे की परत देखने के लिए फिर से परत उठाओ टैप करो।",
    "Lift one more layer with the same key.": "उसी बटन से एक और परत उठाओ।",
    "Cubes hidden behind or under others take up space and are counted.": "दूसरों के पीछे या नीचे छिपे घन भी जगह घेरते हैं और गिने जाते हैं।",
    "You learned: hidden cubes take up space and are counted too.": "तुमने सीखा: छिपे घन भी जगह घेरते हैं और गिने जाते हैं।",
    "This stack has 4 layers of 1 cm cubes; lift them and find its volume.": "इस ढेर में 1 सेंटीमीटर घनों की 4 परतें हैं; उन्हें उठाकर आयतन बताओ।",
    "Yes, 4 layers of 6 cubes make 24 cubic centimetres.": "हाँ, 6 घनों की 4 परतें 24 घन सेंटीमीटर बनाती हैं।",
    "What is the volume of this stack in unit cubes?": "इकाई घनों में इस ढेर का आयतन क्या है?",
    "How many unit cubes?": "कितने इकाई घन?",
    "Every layer holds the same number of cubes.": "हर परत में बराबर घन हैं।",
    "Yes, 3 layers of 9 cubes make 27 unit cubes.": "हाँ, 9 घनों की 3 परतें 27 इकाई घन बनाती हैं।",
    "This stack is 2 layers high; how many unit cubes fill it?": "यह ढेर 2 परत ऊँचा है; इसे कितने इकाई घन भरते हैं?",
    "Count every layer, not only one.": "हर परत गिनो, सिर्फ़ एक नहीं।",
    "Yes, 2 layers of 11 cubes make 22 unit cubes.": "हाँ, 11 घनों की 2 परतें 22 इकाई घन बनाती हैं।",
    "Count one layer, then count how many layers there are.": "एक परत गिनो, फिर गिनो कि कितनी परतें हैं।",
    "Lift the layers apart first.": "पहले परतें अलग करके उठाओ।",
    "Lift layer": "परत उठाओ",
    "Stack again": "फिर से ढेर",
    "See-through": "आर-पार"
},
  gu: {
        "Tap the box that takes up more space.": "વધુ જગ્યા રોકતા ખોખા પર ટૅપ કરો.",
        "Tap the solid that takes up more space.": "વધુ જગ્યા રોકતા ઘન પદાર્થ પર ટૅપ કરો.",
        "Add up the cubes of all 4 layers.": "બધા 4 થરના ઘન ઉમેરો.",
        "Multiply the cubes in one layer by the number of layers.": "એક થરના ઘનને થરની સંખ્યા વડે ગુણો.",
    "Cube Counter": "ઘન ગણતરી",
    "Space taken up": "રોકેલી જગ્યા",
    "The unit cube": "એકમ ઘન",
    "Counting cubes": "ઘન ગણવા",
    "Hidden cubes count too": "છુપાયેલા ઘન પણ ગણો",
    "Free play. Lift the layers and count every cube.": "મુક્ત રમત. થર ઉપાડો અને દરેક ઘન ગણો.",
    "How many cubes would fill a box, even the ones you cannot see?": "એક ખોખું કેટલા ઘનથી ભરાય, ન દેખાતા ઘન પણ?",
    "You measured space by the cubes that fill it, hidden ones too.": "તમે જગ્યાને તેને ભરતા ઘનથી માપી, છુપાયેલા ઘન પણ.",
    "The volume of a solid is the amount of space it takes up.": "ઘન પદાર્થ જેટલી જગ્યા રોકે તે તેનું ઘનફળ છે.",
    "You learned: volume is the amount of space a solid takes up.": "તમે શીખ્યા: ઘન પદાર્થ જેટલી જગ્યા રોકે તે ઘનફળ.",
    "Shoebox": "બૂટનું ખોખું",
    "Pencil box": "પેન્સિલ બૉક્સ",
    "Pencil": "પેન્સિલ",
    "School bag": "સ્કૂલ બૅગ",
    "Wide box": "પહોળું ખોખું",
    "Tall box": "ઊંચું ખોખું",
    "Fill both boxes with cubes, then tap the one that takes up more space.": "બંને ખોખાં ભરો, પછી વધુ જગ્યા રોકતા ખોખા પર ટૅપ કરો.",
    "Which takes more space?": "કોણ વધુ જગ્યા રોકે?",
    "Look at how many cubes each box held.": "જુઓ દરેક ખોખામાં કેટલા ઘન સમાયા.",
    "Yes, the shoebox. That space is called its volume.": "હા, બૂટનું ખોખું. તે જગ્યાને તેનું ઘનફળ કહે છે.",
    "Now fill the pencil and the school bag; which one takes up more space?": "હવે પેન્સિલ અને સ્કૂલ બૅગ ભરો; કોણ વધુ જગ્યા રોકે છે?",
    "Bag or pencil?": "બૅગ કે પેન્સિલ?",
    "Count the cubes in each, not how far it reaches.": "દરેકના ઘન ગણો, તેની લંબાઈ નહીં.",
    "Yes, the school bag: a long thin solid can take up less space.": "હા, સ્કૂલ બૅગ: લાંબો પાતળો ઘન પદાર્થ ઓછી જગ્યા રોકી શકે.",
    "Which takes up more space, the wide box or the tall box?": "કોણ વધુ જગ્યા રોકે છે, પહોળું ખોખું કે ઊંચું ખોખું?",
    "Wide or tall?": "પહોળું કે ઊંચું?",
    "Count the cubes inside, not the height.": "અંદરના ઘન ગણો, ઊંચાઈ નહીં.",
    "Yes, the wide box holds more cubes though it is not as tall.": "હા, પહોળું ખોખું ઓછું ઊંચું છે છતાં વધુ ઘન રાખે છે.",
    "The box that holds more cubes takes up more space.": "જે ખોખામાં વધુ ઘન સમાય તે વધુ જગ્યા રોકે છે.",
    "Read the number beside each box, then tap the box with the greater number.": "દરેક ખોખા પાસેની સંખ્યા વાંચો, પછી મોટી સંખ્યાવાળા ખોખા પર ટૅપ કરો.",
    "Tap Fill to put cubes in both boxes.": "બંને ખોખાં ભરવા માટે ભરો બટન ટૅપ કરો.",
    "Tap Fill to put cubes in both solids.": "બંને ઘન પદાર્થ ભરવા માટે ભરો બટન ટૅપ કરો.",
    "Fill": "ભરો",
    "cubes": "ઘન",
    "Greater volume": "વધુ ઘનફળ",
    "Volume is counted in unit cubes, and they come in different sizes.": "ઘનફળ એકમ ઘનથી ગણાય છે, અને તે જુદા જુદા માપના હોય છે.",
    "A unit cube with 1 cm edges has a volume of 1 cubic centimetre.": "1 સેન્ટિમીટર ધારવાળા એકમ ઘનનું ઘનફળ 1 ઘન સેન્ટિમીટર છે.",
    "You learned: pick a unit cube that fits the size of the thing.": "તમે શીખ્યા: વસ્તુના માપ મુજબ એકમ ઘન પસંદ કરો.",
    "Tap the unit cube you would use to measure a classroom.": "વર્ગખંડ માપવા માટેના એકમ ઘન પર ટૅપ કરો.",
    "Unit for a classroom?": "વર્ગખંડ માટે એકમ?",
    "Compare the cube's edge with the size of the room.": "ઘનની ધારની સરખામણી ઓરડાના માપ સાથે કરો.",
    "Yes, a classroom is measured in cubic metres.": "હા, વર્ગખંડ ઘન મીટરમાં મપાય છે.",
    "1 cu. mm": "1 ઘન મિમી",
    "1 cu. cm": "1 ઘન સેમી",
    "1 cu. m": "1 ઘન મી",
    "A unit cube has edges 1 m long, so what is its volume?": "એક એકમ ઘનની ધાર 1 મીટર લાંબી છે, તો તેનું ઘનફળ શું?",
    "Volume of this cube?": "આ ઘનનું ઘનફળ?",
    "Look at how long each edge is.": "જુઓ દરેક ધાર કેટલી લાંબી છે.",
    "Yes, its volume is 1 cubic metre.": "હા, તેનું ઘનફળ 1 ઘન મીટર છે.",
    "Its edges are measured in metres, not centimetres.": "તેની ધાર મીટરમાં મપાઈ છે, સેન્ટિમીટરમાં નહીં.",
    "The unit of the volume follows the unit of the edges.": "ઘનફળનો એકમ ધારના એકમ પરથી આવે છે.",
    "Now pick the unit cube that suits a grain of sugar.": "હવે ખાંડના દાણા માટે યોગ્ય એકમ ઘન પસંદ કરો.",
    "Unit for sugar?": "ખાંડ માટે એકમ?",
    "Compare the cube's edge with the size of the grain.": "ઘનની ધારની સરખામણી દાણાના માપ સાથે કરો.",
    "Yes, a grain of sugar is measured in cubic millimetres.": "હા, ખાંડનો દાણો ઘન મિલીમીટરમાં મપાય છે.",
    "Think whether it is very small, small or very large.": "વિચારો, તે બહુ નાનું છે, નાનું છે કે બહુ મોટું.",
    "Tiny things take tiny unit cubes, and huge things take huge ones.": "નાની વસ્તુ માટે નાના ઘન, મોટી વસ્તુ માટે મોટા ઘન.",
    "Tap a unit cube to put it on the card.": "કાર્ડ પર મૂકવા માટે એક એકમ ઘન ટૅપ કરો.",
    "Classroom": "વર્ગખંડ",
    "Grain of sugar": "ખાંડનો દાણો",
    "Unit cube": "એકમ ઘન",
    "1 m": "1 મી",
    "1 cm": "1 સેમી",
    "1 mm": "1 મિમી",
    "cu. m": "ઘન મી",
    "cu. cm": "ઘન સેમી",
    "cu. mm": "ઘન મિમી",
    "Not drawn to size.": "માપ પ્રમાણે દોર્યું નથી.",
    "Count one row. How many rows are there?": "એક હાર ગણો. કેટલી હાર છે?",
    "Tap Count row to count the front row of cubes.": "આગળની હાર ગણવા હાર ગણો ટૅપ કરો.",
    "Tap the Count row key.": "હાર ગણો બટન ટૅપ કરો.",
    "Tap Count row again to count the row behind it.": "પાછળની હાર માટે ફરી હાર ગણો ટૅપ કરો.",
    "Count the next row with the same key.": "એ જ બટનથી આગલી હાર ગણો.",
    "The number of unit cubes that fill a solid is its volume.": "ઘન પદાર્થને ભરતા એકમ ઘનની સંખ્યા તેનું ઘનફળ છે.",
    "You learned: count the unit cubes row by row to find the volume.": "તમે શીખ્યા: ઘનફળ માટે એકમ ઘન હાર પ્રમાણે ગણો.",
    "Each cube is 1 cm, so count the rows and find the volume of this solid.": "દરેક ઘન 1 સેન્ટિમીટરનો છે, હાર ગણીને આ ઘન પદાર્થનું ઘનફળ શોધો.",
    "Volume in cu. cm?": "ઘનફળ ઘન સેમીમાં?",
    "Count both rows, not only the front one.": "બંને હાર ગણો, ફક્ત આગળની નહીં.",
    "Yes, 2 rows of 9 cubes make 18 cubic centimetres.": "હા, 9 ઘનની 2 હાર 18 ઘન સેન્ટિમીટર બનાવે છે.",
    "A single row of these cubes lies on a desk; what is its volume?": "આ ઘનની એક હાર ટેબલ પર છે; તેનું ઘનફળ શું?",
    "Volume of the row?": "હારનું ઘનફળ?",
    "Every cube in the row is 1 cubic centimetre.": "હારનો દરેક ઘન 1 ઘન સેન્ટિમીટર છે.",
    "Yes, 7 cubes make 7 cubic centimetres.": "હા, 7 ઘન 7 ઘન સેન્ટિમીટર બનાવે છે.",
    "Count the rows of this bigger solid and find its volume.": "આ મોટા ઘન પદાર્થની હાર ગણો અને તેનું ઘનફળ શોધો.",
    "There are more rows behind the front one.": "આગળની હારની પાછળ બીજી હાર છે.",
    "Yes, 4 rows of 9 cubes make 36 cubic centimetres.": "હા, 9 ઘનની 4 હાર 36 ઘન સેન્ટિમીટર બનાવે છે.",
    "Add the cubes of every row.": "દરેક હારના ઘન ઉમેરો.",
    "Every row holds the same number of cubes, so add it once for each row.": "દરેક હારમાં સરખા ઘન છે, તો દરેક હાર માટે તે સંખ્યા એક વાર ઉમેરો.",
    "Count every row first.": "પહેલાં દરેક હાર ગણો.",
    "Count row": "હાર ગણો",
    "unit cubes": "એકમ ઘન",
    "Some cubes are hiding. Lift the layers and count them all.": "કેટલાક ઘન છુપાયેલા છે. થર ઉપાડો અને બધા ગણો.",
    "Tap Lift layer to lift the top layer off the stack.": "ઉપરનો થર હટાવવા થર ઉપાડો ટૅપ કરો.",
    "Tap the Lift layer key.": "થર ઉપાડો બટન ટૅપ કરો.",
    "Tap Lift layer again to see the layer under it.": "નીચેનો થર જોવા ફરી થર ઉપાડો ટૅપ કરો.",
    "Lift one more layer with the same key.": "એ જ બટનથી એક વધુ થર ઉપાડો.",
    "Cubes hidden behind or under others take up space and are counted.": "બીજા ઘનની પાછળ કે નીચે છુપાયેલા ઘન પણ જગ્યા રોકે છે અને ગણાય છે.",
    "You learned: hidden cubes take up space and are counted too.": "તમે શીખ્યા: છુપાયેલા ઘન પણ જગ્યા રોકે છે અને ગણાય છે.",
    "This stack has 4 layers of 1 cm cubes; lift them and find its volume.": "આ ઢગલામાં 1 સેન્ટિમીટરના ઘનના 4 થર છે; તે ઉપાડીને ઘનફળ શોધો.",
    "Yes, 4 layers of 6 cubes make 24 cubic centimetres.": "હા, 6 ઘનના 4 થર 24 ઘન સેન્ટિમીટર બનાવે છે.",
    "What is the volume of this stack in unit cubes?": "એકમ ઘનમાં આ ઢગલાનું ઘનફળ શું છે?",
    "How many unit cubes?": "કેટલા એકમ ઘન?",
    "Every layer holds the same number of cubes.": "દરેક થરમાં સરખા ઘન છે.",
    "Yes, 3 layers of 9 cubes make 27 unit cubes.": "હા, 9 ઘનના 3 થર 27 એકમ ઘન બનાવે છે.",
    "This stack is 2 layers high; how many unit cubes fill it?": "આ ઢગલો 2 થર ઊંચો છે; તેને કેટલા એકમ ઘન ભરે?",
    "Count every layer, not only one.": "દરેક થર ગણો, ફક્ત એક નહીં.",
    "Yes, 2 layers of 11 cubes make 22 unit cubes.": "હા, 11 ઘનના 2 થર 22 એકમ ઘન બનાવે છે.",
    "Count one layer, then count how many layers there are.": "એક થર ગણો, પછી ગણો કેટલા થર છે.",
    "Lift the layers apart first.": "પહેલાં થર અલગ કરીને ઉપાડો.",
    "Lift layer": "થર ઉપાડો",
    "Stack again": "ફરી ઢગલો",
    "See-through": "આરપાર"
},
};

/* One entry per phase = one mount (see the skeleton notes in the docs: PATTERNS §9, §9b, §16).
   kind  fill: two solids filled with cubes, the child taps the one with the greater volume (pad "enter")
         unit: the child carries the unit cube that fits the thing onto its picture card (pad "enter")
         unitq: a choice of volume for a unit cube; rows: a one-layer solid counted row by row; stack: layers lifted off
   win   the tool's own one-sentence win line, said at the right answer (a phase's last one is replaced by its closing) */
const PHASES = [
  {
    n: 1,
    concept: "Space taken up",
    conceptId: "M3.S4.T8.C35", objectiveIds: ["O13"],
    /* no teach run: in a classroom a teach line before the first question waits for a tap (the next-key room run found it) */
    says: [],
    ladder: ["The box that holds more cubes takes up more space.", "Read the number beside each box, then tap the box with the greater number."],
    closing: "The volume of a solid is the amount of space it takes up.",
    learned: "You learned: volume is the amount of space a solid takes up.",
    traceback: "Both solids fill again side by side, the greater count lights amber and the greater solid turns green, Greater volume.",
    items: [
      /* learn CC1: answer in the plan = The shoebox. The space a solid takes up is its volume
         plan question: A shoebox and a pencil box sit side by side. Which takes up more space, and what is that space called?
         (the second half, "volume", is the win line: a tap cannot name it) */
      { qid: "M3.S4.T8.C35:CC1", kind: "fill", pad: "enter", answer: "shoebox",
        bx: [{ id: "shoebox", name: "Shoebox", d: [4, 3, 2] }, { id: "pencilbox", name: "Pencil box", d: [6, 1, 1] }],
        say: "Fill both boxes with cubes, then tap the one that takes up more space.", ask: "Which takes more space?",
        miss: "Look at how many cubes each box held.", win: "Yes, the shoebox. That space is called its volume.", winMs: 3500 },
      /* practice 1: answer in the plan = The school bag. It has the greater volume */
      { qid: "M3.S4.T8.C35:1", kind: "fill", pad: "enter", answer: "schoolbag",
        bx: [{ id: "pencil", name: "Pencil", d: [5, 1, 1], ghost: true }, { id: "schoolbag", name: "School bag", d: [3, 2, 3], ghost: true }],
        say: "Now fill the pencil and the school bag; which one takes up more space?", ask: "Bag or pencil?",
        miss: "Count the cubes in each, not how far it reaches.", win: "Yes, the school bag: a long thin solid can take up less space.", winMs: 4200 },
      /* authored (no third plan question in C35): the misconception, a tall thin box against a short wide one */
      { qid: null, kind: "fill", pad: "enter", answer: "widebox",
        bx: [{ id: "widebox", name: "Wide box", d: [4, 3, 1] }, { id: "tallbox", name: "Tall box", d: [2, 1, 4] }],
        say: "Which takes up more space, the wide box or the tall box?", ask: "Wide or tall?",
        miss: "Count the cubes inside, not the height.", win: "Yes, the wide box holds more cubes though it is not as tall.", winMs: 4200 },
    ],
  },
  {
    n: 2,
    concept: "The unit cube",
    conceptId: "M3.S4.T8.C36", objectiveIds: ["O13"],
    says: ["Volume is counted in unit cubes, and they come in different sizes."],
    ladder: ["Think whether it is very small, small or very large.", "Tiny things take tiny unit cubes, and huge things take huge ones."],
    closing: "A unit cube with 1 cm edges has a volume of 1 cubic centimetre.",
    learned: "You learned: pick a unit cube that fits the size of the thing.",
    traceback: "Cubes of the chosen size are set against the thing, the cube that fits lights amber and settles on the card, its unit in green.",
    items: [
      /* learn CC2: answer in the plan = cu. m
         plan question: Which unit fits the volume of a classroom: cu. mm, cu. cm or cu. m? */
      { qid: "M3.S4.T8.C36:CC2", kind: "unit", pad: "enter", answer: "cu. m", thing: "classroom", metres: 8,
        say: "Tap the unit cube you would use to measure a classroom.", ask: "Unit for a classroom?",
        miss: "Compare the cube's edge with the size of the room.", win: "Yes, a classroom is measured in cubic metres.", winMs: 3200 },
      /* practice 2: answer in the plan = 1 cu. m */
      { qid: "M3.S4.T8.C36:2", kind: "unitq", edge: "m", answer: "1 cu. m",
        choices: [{ id: "1 cu. mm", label: "1 cu. mm" }, { id: "1 cu. cm", label: "1 cu. cm" }, { id: "1 cu. m", label: "1 cu. m" }],
        ladder: ["Its edges are measured in metres, not centimetres.", "The unit of the volume follows the unit of the edges."],
        say: "A unit cube has edges 1 m long, so what is its volume?", ask: "Volume of this cube?",
        miss: "Look at how long each edge is.", win: "Yes, its volume is 1 cubic metre.", winMs: 2400 },
      /* practice 4: answer in the plan = cu. mm
         plan question: Which unit fits the volume of a grain of sugar: cu. mm, cu. cm or cu. m? */
      { qid: "M3.S4.T8.C36:4", kind: "unit", pad: "enter", answer: "cu. mm", thing: "sugar", metres: 0.0005,
        say: "Now pick the unit cube that suits a grain of sugar.", ask: "Unit for sugar?",
        miss: "Compare the cube's edge with the size of the grain.", win: "Yes, a grain of sugar is measured in cubic millimetres.", winMs: 3800 },
    ],
  },
  {
    n: 3,
    concept: "Counting cubes",
    conceptId: "M3.S4.T8.C37", objectiveIds: ["O14"],
    says: ["Count one row. How many rows are there?"],
    /* the steps work a warm-up solid (2 rows of 3), never question 1's own */
    ccWarm: { kind: "rows", I: 3, J: 2 },
    steps: [
      { say: "Tap Count row to count the front row of cubes.", on: "row", hint: "Tap the Count row key." },
      { say: "Tap Count row again to count the row behind it.", on: "row", hint: "Count the next row with the same key." },
    ],
    ladder: ["Add the cubes of every row.", "Every row holds the same number of cubes, so add it once for each row."],
    closing: "The number of unit cubes that fill a solid is its volume.",
    learned: "You learned: count the unit cubes row by row to find the volume.",
    traceback: "Each row lights amber in turn with its count, then every cube turns green and the volume is written in green.",
    items: [
      /* learn CC3: answer in the plan = 18 cu. cm
         plan question: A solid is built from unit cubes of 1 cm: 9 in a row, and 2 such rows side by side, one cube high. What is its volume? */
      { qid: "M3.S4.T8.C37:CC3", kind: "rows", I: 9, J: 2, unit: "cu. cm", answer: 18,
        say: "Each cube is 1 cm, so count the rows and find the volume of this solid.", ask: "Volume in cu. cm?",
        miss: "Count both rows, not only the front one.", win: "Yes, 2 rows of 9 cubes make 18 cubic centimetres.", winMs: 3400 },
      /* practice 3: answer in the plan = 7 cu. cm
         plan question: A row of 7 unit cubes of 1 cm lies on a desk. What is its volume? */
      { qid: "M3.S4.T8.C37:3", kind: "rows", I: 7, J: 1, unit: "cu. cm", answer: 7,
        say: "A single row of these cubes lies on a desk; what is its volume?", ask: "Volume of the row?",
        miss: "Every cube in the row is 1 cubic centimetre.", win: "Yes, 7 cubes make 7 cubic centimetres.", winMs: 2700 },
      /* practice 8: answer in the plan = 9 + 9 + 9 + 9 = 36, so 36 cu. cm
         plan question: A solid is built from 4 rows of 9 unit cubes of 1 cm, side by side. What is its volume?
         (practice 5, 2 rows of 10, is unused: it repeats question 1's shape) */
      { qid: "M3.S4.T8.C37:8", kind: "rows", I: 9, J: 4, unit: "cu. cm", answer: 36,
        say: "Count the rows of this bigger solid and find its volume.", ask: "Volume in cu. cm?",
        miss: "There are more rows behind the front one.", win: "Yes, 4 rows of 9 cubes make 36 cubic centimetres.", winMs: 3400 },
    ],
  },
  {
    n: 4,
    concept: "Hidden cubes count too",
    conceptId: "M3.S4.T8.C38", objectiveIds: ["O14"],
    says: ["Some cubes are hiding. Lift the layers and count them all."],
    /* the steps work a warm-up stack (3 layers of 4), never question 1's own */
    ccWarm: { kind: "stack", P: 2, Q: 2, L: 3 },
    steps: [
      { say: "Tap Lift layer to lift the top layer off the stack.", on: "lift", hint: "Tap the Lift layer key." },
      { say: "Tap Lift layer again to see the layer under it.", on: "lift", hint: "Lift one more layer with the same key." },
    ],
    ladder: ["Count one layer, then count how many layers there are.", "Multiply the cubes in one layer by the number of layers."],
    closing: "Cubes hidden behind or under others take up space and are counted.",
    learned: "You learned: hidden cubes take up space and are counted too.",
    traceback: "The layers stand apart in a row, each lights amber with its count, then every cube turns green and the volume is written in green.",
    items: [
      /* learn CC4: answer in the plan = 24 cu. cm
         plan question: A stack has 4 layers with 6 cubes of 1 cm in each layer. Some cubes are hidden. What is its volume? */
      { qid: "M3.S4.T8.C38:CC4", kind: "stack", P: 3, Q: 2, L: 4, unit: "cu. cm", answer: 24,
        say: "This stack has 4 layers of 1 cm cubes; lift them and find its volume.", ask: "Volume in cu. cm?",
        miss: "Add up the cubes of all 4 layers.", win: "Yes, 4 layers of 6 cubes make 24 cubic centimetres.", winMs: 3600 },
      /* practice 6: answer in the plan = 3 x 9 = 27, so 27 unit cubes
         plan question: A stack has 3 layers with 9 cubes in each layer. How many unit cubes fill it? */
      { qid: "M3.S4.T8.C38:6", kind: "stack", P: 3, Q: 3, L: 3, unit: "unit cubes", answer: 27,
        say: "What is the volume of this stack in unit cubes?", ask: "How many unit cubes?",
        miss: "Every layer holds the same number of cubes.", win: "Yes, 3 layers of 9 cubes make 27 unit cubes.", winMs: 3100 },
      /* practice 7: answer in the plan = 2 x 11 = 22, so 22 unit cubes, hidden ones included
         plan question: A stack is 2 layers high with 11 cubes in each layer, and some are hidden. How many unit cubes fill it?
         (a layer of 11: a 6 by 2 slab with one back corner missing) */
      { qid: "M3.S4.T8.C38:7", kind: "stack", P: 6, Q: 2, L: 2, gap: true, unit: "unit cubes", answer: 22,
        say: "This stack is 2 layers high; how many unit cubes fill it?", ask: "How many unit cubes?",
        miss: "Count every layer, not only one.", win: "Yes, 2 layers of 11 cubes make 22 unit cubes.", winMs: 3200 },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  cubeEdge: "1 cm", layoutWidth: CC_LW,
  shelf: [{ unit: "cu. mm", edge: "1 mm" }, { unit: "cu. cm", edge: "1 cm" }, { unit: "cu. m", edge: "1 m" }],
  free: CC_FREE,
  answerGate: {
    "1": "Q1.1-1.3: the Answer/Enter key waits until both solids are filled (Fill, twice); the box is then tapped and Enter sends it.",
    "2": "Q2.1 and Q2.3: the carried cube is the answer (no lock; Enter blinks once a cube is on the card). Q2.2: ungated, a choice with no act.",
    "3": "Q3.1-3.3: the Answer key waits until every row is counted (Count row).",
    "4": "Q4.1-4.3: the Answer key waits until every layer is lifted apart (Lift layer).",
    rule: "Locks only after a real tap on a key or piece (or a real Enter on a guide step) in user mode; toolApi and the agent are never gated; a correction that has run counts as the act.",
  },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "fill") {
    let best = "", most = -1;
    it.bx.forEach((b: any) => { let v = 0; for (let k = 0; k < b.d[2]; k++) for (let j = 0; j < b.d[1]; j++) for (let i = 0; i < b.d[0]; i++) v += 1; if (v > most) { most = v; best = b.id; } });
    return best === it.answer;
  }
  if (it.kind === "unit") return (it.metres >= 1 ? "cu. m" : it.metres >= 0.01 ? "cu. cm" : "cu. mm") === it.answer;
  if (it.kind === "unitq") return "1 cu. " + it.edge === it.answer;
  if (it.kind === "rows") { let s = 0; for (let r = 0; r < it.J; r++) for (let i = 0; i < it.I; i++) s += 1; return s === it.answer; }
  if (it.kind === "stack") return (it.P * it.Q - (it.gap ? 1 : 0)) * it.L === it.answer;
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "fill") return item.bx.find((b: any) => b.id !== item.answer).id;   /* the other, longer or taller one */
  if (item.kind === "unit") return item.answer === "cu. cm" ? "cu. m" : "cu. cm";            /* the unit met most often */
  if (item.kind === "unitq") return "1 cu. cm";
  if (item.kind === "rows") return item.J > 1 ? item.I : item.answer + 1;                 /* one row counted, then stopped */
  if (item.kind === "stack") return item.answer / item.L;                                  /* the top layer only */
  return typeof item.answer === "number" ? item.answer + 1 : "~";
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: performs the question's act at once (fill, count the rows, lift the layers) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const H = box ? box.h : 520;
  const keysY = H - 92;
  const free = stage === "free";
  const warm = (stage === "demo" || stage === "teach") && phase.ccWarm;
  const it: any = free ? CC_FREE : warm ? phase.ccWarm : item;
  const qk = free ? "free" : n + "|" + (warm ? "w" : index);
  const won = !free && !warm && (stage === "win" || stage === "idle");

  /* the board belongs to the ENTRY of a question (PATTERNS §18): rebuilt whenever the question key changes */
  const ent = useRef({ qk: "", n: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, n: ent.current.n + 1 };
  const eN = ent.current.n;
  const fresh = () => ({ e: eN, fill: [0, 0], filled: [false, false], sel: null as any, warnB: -1, placed: null as any, carry: null as any,
    rows: 0, rowPart: 0, lifts: 0, see: false, tb: 0, tbr: false, tbDone: false, pulse: null as any });
  const [raw, setRaw] = useState(fresh);
  const S: any = raw.e === eN ? raw : fresh();
  const cur = useRef(S);
  cur.current = S;
  const put = (patch: any) => {
    if (eN !== ent.current.n) return;                        /* a late callback of an earlier question */
    const next = { ...(cur.current.e === eN ? cur.current : fresh()), ...patch };
    cur.current = next;
    setRaw(next);
  };
  const busy = useRef(false);
  const tbRun = useRef(false);
  const [touched, setTouched] = useState(false);
  /* a real press by the child: clears a standing correction and arms the answer gate */
  const touch = () => {
    if (!touched) setTouched(true);
    if (stage === "ask" && needAct) api.lock(true);          /* at once, before the act starts: the act layer keeps a lock it found */
    if (cur.current.tb && !tbRun.current) put({ tb: 0 });
    if (cur.current.pulse) put({ pulse: null });
  };
  /* one press per 300 ms: a true double tap (instant acts under reduced motion) never does the act twice */
  const lastPress = useRef(0);
  const guard = () => { const t = Date.now(); if (t - lastPress.current < 300) return false; lastPress.current = t; return true; };
  const isDemo = stage === "demo";
  const didAct = (name: string) => { if (stage === "demo") api.did(name); };

  /* ── layouts (plain arithmetic in render, from the fixed layout width) ── */
  const R = it.kind === "rows" ? { x: 20, y: 20, w: 600, h: keysY - 36 } : { x: 20, y: 130, w: CC_LW - 40, h: keysY - 146 };
  /* phase 1: two solids side by side, one cube size for both so their sizes compare honestly */
  const BW = box ? box.w : 1472;
  const fillLay = () => {
    const top = 84, ground = keysY - 24, half = BW / 2;
    const a = Math.min(66, ...it.bx.map((b: any) => (ground - top) / ((b.d[0] + b.d[1]) / 2 + b.d[2])),
      ...it.bx.map((b: any) => (half - 300) / ((b.d[0] + b.d[1]) * 0.866))), c = a * 0.866;
    return it.bx.map((b: any, bi: number) => {
      const [I, J, K] = b.d, bw = (I + J) * c, x = bi * half + (half - (bw + 254)) / 2;
      const x0 = x + J * c, y0 = ground - ((I + J) * a) / 2, y = y0 - K * a;
      return { b, I, J, K, cx: x + bw / 2, P: ccProj(x0, y0, a), x, y, w: bw, h: ground - y, rows: J * K, chipX: x + bw + 30, chipY: (y + ground) / 2 - 29 };
    });
  };
  /* phase 3: one layer, centred */
  const rowLay = () => {
    const { I, J } = it;
    const aFor = (q: any) => Math.min(80, R.w / ((q.I + q.J) * 0.866), R.h / ((q.I + q.J) / 2 + 1));
    const a = warm ? aFor(phase.items[0]) : aFor(it), c = a * 0.866, Hh = ((I + J) * a) / 2 + a;
    const x0 = R.x + (R.w - (I + J) * c) / 2 + J * c, y0 = R.y + (R.h - Hh) / 2 + a;
    return { a, c, P: ccProj(x0, y0, a) };
  };
  /* phase 4: the stack in slot 0, each lifted layer in a slot of its own to the right */
  const stackLay = () => {
    const { P: Pp, Q, L } = it, g = 36, q1 = warm ? phase.items[0] : it;
    const aQ = Math.min(56, (R.w - (q1.L - 1) * g) / (q1.L * (q1.P + q1.Q) * 0.866), R.h / ((q1.P + q1.Q) / 2 + q1.L));
    const a = warm ? aQ : Math.min(56, (R.w - (L - 1) * g) / (L * (Pp + Q) * 0.866), R.h / ((Pp + Q) / 2 + L)), c = a * 0.866;
    /* the warm-up uses question 1's cube size and slots, so the stack does not jump when the question opens */
    const swQ = (q1.P + q1.Q) * c, sw = (Pp + Q) * c, x00 = R.x + (R.w - (q1.L * swQ + (q1.L - 1) * g)) / 2;
    const y0 = R.y + R.h - 6 - ((Pp + Q) * a) / 2;
    const slot = (s: number) => ccProj(x00 + s * (swQ + g) + Q * c, y0, a);
    return { a, c, slot, sw };
  };

  /* ── total cube count check for skinning flag (mandate 4: max 40 skins) ── */
  const countCubesOnScreen = () => {
    if (it.kind === "fill") {
      const lays = fillLay();
      return lays.reduce((acc: number, Lb: any) => acc + Lb.I * Lb.J * Lb.K, 0);
    }
    if (it.kind === "rows") return it.I * it.J;
    if (it.kind === "stack") return it.P * it.Q * it.L;
    return 1;
  };
  const totalCubes = countCubesOnScreen();
  const skinned = totalCubes > 0 && totalCubes <= 40;

  /* ── the acts, each performed on screen by the hand (api.act) ── */
  const fillAct = async () => {
    const s = cur.current;
    if (busy.current) return;
    const bi = !s.filled[0] ? 0 : !s.filled[1] ? 1 : -1;
    if (bi < 0) return;
    const Lb = fillLay()[bi];
    const pts: any[] = [];
    for (let k = 0; k < Lb.K; k++) for (let j = 0; j < Lb.J; j++) { const p = Lb.P(Lb.I / 2, j + 0.5, k + 1); pts.push({ x: p[0], y: p[1] }); }
    busy.current = true;
    put({ warnB: -1 });
    const ok = await api.act({ tool: "hand", moves: "tap", at: pts, ms: 700,
      onPoint: (r: number) => { const f = cur.current.fill.slice(); f[bi] = r + 1; put({ fill: f }); } });
    busy.current = false;
    if (!ok) return;
    const f = cur.current.fill.slice(), d = cur.current.filled.slice();
    f[bi] = Lb.rows; d[bi] = true;
    put({ fill: f, filled: d });
    api.sfx.settle();
  };
  const rowAct = async () => {
    const s = cur.current;
    if (busy.current || s.rows >= it.J) return;
    const Lr = rowLay(), j = it.J - 1 - s.rows;
    const pts: any[] = [];
    for (let i = 0; i < it.I; i++) { const p = Lr.P(i + 0.5, j + 0.5, 1); pts.push({ x: p[0], y: p[1] }); }
    busy.current = true;
    const ok = await api.act({ tool: "hand", moves: "tap", at: pts, ms: 700, onPoint: (t: number) => put({ rowPart: t + 1 }) });
    busy.current = false;
    if (!ok) { put({ rowPart: 0 }); return; }
    put({ rows: s.rows + 1, rowPart: 0 });
    api.sfx.settle();
    didAct("row");
  };
  const layerNode = (Ls: any, k: number, tag: number, from: any) => {
    const P0 = Ls.slot(0), cells = ccCells(it);
    return (
      <CcHold tag={tag} node={
        <g transform={`translate(${-from.x} ${-from.y})`}>
          {ccSort(cells.map((q: any) => [q[0], q[1], k])).map((q: any, m: number) => ccCube(P0, q[0], q[1], q[2], CC_VIO, { key: "h" + m, skin: skinned }))}
        </g>
      } />
    );
  };
  const liftAct = async () => {
    const s = cur.current;
    if (busy.current) return;
    if (s.lifts >= it.L - 1) { if (free) put({ lifts: 0 }); return; }
    const Ls = stackLay(), k = it.L - 1 - s.lifts;
    const f0 = Ls.slot(0)(it.P / 2, it.Q / 2, k + 1), t0 = Ls.slot(k)(it.P / 2, it.Q / 2, 1);
    const from = { x: f0[0], y: f0[1] }, to = { x: t0[0], y: t0[1] };
    const tag = ++CC_TAG;
    busy.current = true;
    put({ carry: k });
    const ok = await api.act({ tool: "hand", moves: "carry", ms: 700, from, at: [to], hold: layerNode(Ls, k, tag, from),
      onPoint: () => { CC_HOLD_OFF = tag; put({ lifts: s.lifts + 1, carry: null }); } });
    busy.current = false;
    CC_HOLD_OFF = tag;
    if (!ok) { put({ carry: null }); return; }
    put({ lifts: s.lifts + 1, carry: null });
    api.sfx.settle();
    didAct("lift");
  };
  /* phase 2: the shelf of unit cubes and the picture card */
  const CARD = { x: 40, y: 16, w: 560, h: 390 };
  const SHELF = [
    { u: "cu. mm", a: 16, cx: 760, lab: "1 mm" },
    { u: "cu. cm", a: 46, cx: 920, lab: "1 cm" },
    { u: "cu. m", a: 120, cx: 1180, lab: "1 m" },
  ];
  const PLANK = 400;
  const shelfAt = (sh: any) => ({ x: sh.cx, y: PLANK - sh.a });          /* the cube's centre */
  const cardA = (sh: any) => (item.thing === "sugar" ? Math.min(sh.a * 2, 64) : Math.min(sh.a, 64));
  /* on the classroom card: on the floor at the right; on the grain card: settled right beside the grain's ring */
  const cardAt = (sh: any) => (item.thing === "sugar"
    ? { x: CARD.x + 200 + 150 + cardA(sh) * 0.866, y: CARD.y + 160 + 60 - cardA(sh) }
    : { x: CARD.x + CARD.w - 30 - cardA(sh) * 0.866, y: CARD.y + CARD.h - 22 - cardA(sh) });
  const placeAct = async (u: string) => {
    if (busy.current || cur.current.placed === u) return;
    const sh = SHELF.find((q) => q.u === u)!;
    const from = shelfAt(sh), to = cardAt(sh), tag = ++CC_TAG;
    const node = <CcHold tag={tag} node={ccCube(ccProj(0, 0, sh.a), 0, 0, 0, CC_VIO, { key: "hold", skin: true })} />;
    busy.current = true;
    put({ carry: u, placed: null });
    const ok = await api.act({ tool: "hand", moves: "carry", ms: 700, from, at: [to], hold: node,
      onPoint: () => { CC_HOLD_OFF = tag; put({ placed: u, carry: null }); } });
    busy.current = false;
    CC_HOLD_OFF = tag;
    if (!ok) { put({ carry: null }); return; }
    put({ placed: u, carry: null });
    api.sfx.settle();
  };

  /* the guide steps: Enter, the agent's check() and the dev solve() perform the current step */
  const act = (on: any) => { if (on === "row") rowAct(); else if (on === "lift") liftAct(); };
  /* the nudge: a refused answer before the act names the live control (a line per case, so TR can list it) */
  const nudged = useRef("");
  const nudge = () => {
    if (stage !== "ask" || busy.current) return;
    put({ pulse: item.kind === "unit" ? "shelf" : "act" });
    nudged.current = qk;
    if (item.kind === "fill" && item.bx[0].ghost) api.say("Tap Fill to put cubes in both solids.");
    else if (item.kind === "fill") api.say("Tap Fill to put cubes in both boxes.");
    else if (item.kind === "unit") api.say("Tap a unit cube to put it on the card.");
    else if (item.kind === "rows") api.say("Count every row first.");
    else if (item.kind === "stack") api.say("Lift the layers apart first.");
  };
  const enterAnswer = () => {
    const s = cur.current;
    if (item.kind === "fill" && s.sel && s.filled[0] && s.filled[1]) api.submit(s.sel);
    else if (item.kind === "unit" && s.placed) api.submit(s.placed);
    else if (item.kind === "unit" || !(s.filled[0] && s.filled[1])) nudge();
    else if (stage === "ask" && !busy.current) {          /* both full, nothing picked: say what to tap */
      nudged.current = qk + "|pick";
      put({ pulse: "pick" });
      if (item.bx[0].ghost) api.say("Tap the solid that takes up more space.");
      else api.say("Tap the box that takes up more space.");
    }
  };
  api.onEnter(isDemo && stepOn ? () => act(stepOn) : stage === "ask" && item.pad === "enter" ? () => enterAnswer() : null);

  HOOK.demo = () => (stepOn ? act(stepOn) : undefined);
  HOOK.set = (v: any) => {
    if (stage !== "ask") return false;
    if (item.kind === "fill") {
      if (!item.bx.some((b: any) => b.id === v)) return false;
      put({ fill: fillLay().map((q: any) => q.rows), filled: [true, true], sel: v, tb: 0, warnB: -1 });
      return true;
    }
    if (item.kind === "unit") {
      if (!SHELF.some((q) => q.u === v)) return false;
      put({ placed: v, tb: 0 });
      return true;
    }
    return undefined;
  };
  HOOK.check = () => {
    if (stage !== "ask") return undefined;
    if (item.kind === "fill" && !(cur.current.filled[0] && cur.current.filled[1])) put({ fill: fillLay().map((q: any) => q.rows), filled: [true, true] });
    if (item.kind === "rows" && cur.current.rows < item.J) put({ rows: item.J, rowPart: 0 });
    if (item.kind === "stack" && cur.current.lifts < item.L - 1) put({ lifts: item.L - 1, carry: null });
    return undefined;
  };

  /* the answer gate (PATTERNS §19): the key waits for the act, in user mode, once the child has touched the board */
  /* a correction that has run counts as the act, so a wrong answer before the act never leaves the key locked */
  const actDone = S.tbDone || (it.kind === "fill" ? S.filled[0] && S.filled[1] : it.kind === "rows" ? S.rows >= it.J : it.kind === "stack" ? S.lifts >= it.L - 1 : true);
  const needAct = stage === "ask" && !actDone && (it.kind === "fill" || it.kind === "rows" || it.kind === "stack");
  useEffect(() => {
    if (stage !== "ask" || tbRun.current) return;
    api.lock(!!(touched && needAct));
  }, [touched, needAct, stage, qk]);
  /* once the act is done after a nudge, the question comes back */
  const placedNow = it.kind === "unit" && !!S.placed;
  useEffect(() => {
    if (stage !== "ask") return;
    const pick = nudged.current === qk + "|pick";
    if ((nudged.current === qk && (it.kind === "unit" ? placedNow : actDone)) || (pick && !!S.sel)) { nudged.current = ""; api.say(item.say); }
  }, [actDone, placedNow, S.sel, stage, qk]);
  /* a REAL Enter on a guide step is a touch (never toolApi, HOOK.check or the dev driver: they send no key event), and a real
     Enter, digit or tap on the locked key before the act brings the nudge */
  const gateRef = useRef({ stage, locked: false, nudge });
  const lastEnter = useRef(0);
  gateRef.current = { stage, locked: !!(touched && needAct), nudge };
  useEffect(() => {
    const onKey = (e: any) => {
      if (!e.isTrusted) return;
      const g = gateRef.current;
      if (g.stage === "demo" && e.key === "Enter") {
        const t = Date.now();
        if (e.repeat || t - lastEnter.current < 300) { e.stopImmediatePropagation(); e.preventDefault(); return; }
        lastEnter.current = t;
        setTouched(true);
      } else if (g.stage === "ask" && g.locked && (e.key === "Enter" || /^[0-9]$/.test(e.key))) {
        const f = document.activeElement && (document.activeElement as any).closest ? (document.activeElement as any).closest("[data-control]") : null;
        if (e.key === "Enter" && f && /^(fill|row|lift)$/.test(f.getAttribute("data-control") || "")) return;   /* Enter on the act's own key: it does the act */
        g.nudge();
      }
    };
    const onDown = (e: any) => {
      const g = gateRef.current, k = e.target && e.target.closest ? e.target.closest('[data-control="answer-open"]') : null;
      if (e.isTrusted && k && g.stage === "ask" && g.locked) g.nudge();
    };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerdown", onDown, true);
    return () => { window.removeEventListener("keydown", onKey, true); window.removeEventListener("pointerdown", onDown, true); };
  }, []);
  /* a working-area answer: the Enter key blinks once the answer is complete */
  const ready = stage === "ask" && item.pad === "enter" && (item.kind === "fill" ? !!S.sel && actDone : !!S.placed);
  useEffect(() => { if (stage === "ask" && item.pad === "enter") api.answerReady(ready); }, [ready, stage, qk]);
  /* the win line (a phase's last one gives way to the closing) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, qk]);
  /* a question change stops a correction mid-play */
  useEffect(() => () => { tl.stop(); tbRun.current = false; }, [qk]);

  /* the traceback: a demo drawn over the board in steps, ending on the whole right answer, unmarked */
  const tbN = item.kind === "fill" ? Math.max(...fillLay().map((q: any) => q.rows)) + 2 : item.kind === "unit" ? 5 : item.kind === "unitq" ? 2
    : item.kind === "rows" ? item.J + 1 : item.kind === "stack" ? item.L + 1 : 1;
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    /* misses 1 and 2: the bubble's clue only (the owner, 2026-11-18); the pick is let go, as the runtime empties a typed slot */
    if (wrong.tries < 3) { put({ sel: null, placed: null, warnB: -1 }); return; }
    tbRun.current = true;
    put({ tb: 1, tbr: true, sel: null, placed: null, warnB: -1 });
    api.lock(true);
    const steps: any[] = [];
    for (let s = 2; s <= tbN; s++) steps.push([700, () => put({ tb: s })]);
    steps.push([900, () => {}]);
    tl.run(steps, () => { tbRun.current = false; put({ tbr: false, tbDone: true }); api.lock(false); });
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState); never the answer */
  api.share({ solid: it.kind, filled: S.filled.filter(Boolean).length, unit_picked: S.placed, rows_counted: S.rows, layers_lifted: S.lifts, see_through: S.see });

  const tb = !free && !warm && stage === "ask" ? S.tb : 0;
  const final = (k: number) => tb >= k;
  const tbr = tb > 0 && S.tbr;            /* the correction is playing: the controls wait; once it stands, they are live again */
  const greenInk = shade(CC_GRN, 0.3), amberInk = shade(CC_AMB, 0.45), blueInk = shade(CC_BLU, 0.1), violetInk = shade(CC_VIO, 0.25);
  const label = (x: number, y: number, s: string, size: number, fill: string, anchor = "middle", key?: any) => (
    <text key={key} x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={fill} stroke="#FFFDF7" strokeWidth={6} paintOrder="stroke" strokeLinejoin="round">{s}</text>
  );
  const keyBtn = (id: string, text: string, x: number, w: number, onPress: any, opts: any = {}) => (
    <Key key={"k" + x} id={id} label={text} x={x} y={keysY} w={w} h={80} C={C} tone="key" disabled={opts.disabled} primary={opts.on}
      onClick={() => { if (!guard()) return; touch(); onPress(); }}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={opts.disabled ? shade(C.dim, 0.4) : toneInk("key", C.ink)}>{text}</text>
    </Key>
  );

  /* ═══ phase 1: two solids, Fill, tap the greater ═══ */
  const drawFill = () => {
    const lays = fillLay();
    const R2 = Math.max(...lays.map((q: any) => q.rows));
    const ans = item.answer;
    const both = S.filled[0] && S.filled[1];
    const fillKeyX = BW / 2 - 120;
    return (
      <g>
        {lays.map((Lb: any, bi: number) => {
          const demo = tb > 0;
          const shown = won || (demo && final(R2 + 2)) ? Lb.rows : demo ? Math.min(tb, Lb.rows) : S.fill[bi];
          const cubes: any[] = [];
          for (let k = 0; k < Lb.K; k++) for (let j = 0; j < Lb.J; j++) if (k * Lb.J + j < shown) for (let i = 0; i < Lb.I; i++) cubes.push([i, j, k]);
          const isAns = Lb.b.id === ans;
          const green = isAns && (won || (demo && final(R2 + 2)));
          const col = green ? CC_GRN : CC_VIO;
          const count = shown * Lb.I;
          const greater = isAns && demo && final(R2 + 1);
          const sel = !demo && !won && S.sel === Lb.b.id;
          const warn = !demo && S.warnB === bi;
          return (
            <g key={bi}>
              {label(Lb.cx, 40, tx(Lb.b.name), T.speech, C.ink)}
              {(sel || warn) && <rect x={Lb.x - 14} y={Lb.y - 14} width={Lb.w + 28} height={Lb.h + 28} rx={18} fill={tint(CC_AMB, 0.85)} stroke={CC_AMB} strokeWidth={5} filter="url(#cc-glow-amber)" />}
              {ccBox(Lb.P, Lb.b.d, Lb.b.id, !!Lb.b.ghost, "back", C)}
              {ccSort(cubes).map((q: any, m: number) => ccCube(Lb.P, q[0], q[1], q[2], col, { key: m, skin: skinned }))}
              {ccBox(Lb.P, Lb.b.d, Lb.b.id, !!Lb.b.ghost, "front", C)}
              <g filter="url(#cc-shadow)">
                <rect x={Lb.chipX} y={Lb.chipY} width={224} height={64} rx={14} fill={greater ? "url(#cc-chip-amber)" : green ? "url(#cc-chip-green)" : "#FFFFFF"}
                  stroke={greater ? CC_AMB : green ? CC_GRN : C.rule} strokeWidth={greater || green ? 4 : 2} />
                <text x={Lb.chipX + 96} y={Lb.chipY + 47} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{String(count)}</text>
                <text x={Lb.chipX + 108} y={Lb.chipY + 44} textAnchor="start" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("cubes")}</text>
              </g>
              {green && label(Lb.chipX + 4, Lb.chipY + 112, tx("Greater volume"), T.label, greenInk, "start")}
              {!tbr && !won && (stage === "ask" || stage === "teach") && (
                <CcTap id={"box-" + Lb.b.id} label={Lb.b.name} x={Lb.x - 10} y={Lb.y - 10} w={Lb.w + 20} h={Lb.h + 20} pass={S.sel === Lb.b.id}
                  onPress={() => {
                    if (!guard()) return;
                    touch();
                    if (!both && !cur.current.filled.every(Boolean)) { put({ warnB: cur.current.filled[0] ? 1 : 0, sel: null }); return; }
                    put({ sel: Lb.b.id, warnB: -1, tb: 0 });
                    api.sfx.tick();
                  }} />
              )}
            </g>
          );
        })}
        {S.pulse === "pick" && stage === "ask" && both && !S.sel && lays.map((Lb: any, bi: number) => (
          <CcRing key={"pz" + bi} x={Lb.x - 8} y={Lb.y - 4} w={Lb.w + 16} h={Lb.h + 12} />
        ))}
        {!both && !won && !tbr && (stage === "ask" || stage === "teach") && (
          <g>
            {keyBtn("fill", tx("Fill"), fillKeyX, 240, fillAct)}
            {stage === "ask" && <Invite x={BW / 2} y={keysY + 40} w={240} h={80} C={C} />}
          </g>
        )}
      </g>
    );
  };

  /* ═══ phase 2: the shelf of unit cubes and the picture card ═══ */
  const thingArt = (thing: string) => {
    const { x, y, w, h } = CARD;
    if (thing === "classroom") return (
      <g>
        {/* Rich classroom background & floor */}
        <rect x={x + 14} y={y + 14} width={w - 28} height={h - 28} rx={14} fill="#F7F1E5" />
        <rect x={x + 14} y={y + h - 110} width={w - 28} height={96} rx={4} fill="#E8DBC6" />
        <line x1={x + 14} y1={y + h - 110} x2={x + w - 14} y2={y + h - 110} stroke="#D4C4AA" strokeWidth={3} />
        {/* Detailed Blackboard */}
        <rect x={x + 90} y={y + 36} width={w - 180} height={130} rx={10} fill="#274C3D" stroke="#5C3D2E" strokeWidth={8} filter="url(#cc-shadow)" />
        {/* Windows */}
        <g stroke="#8A9BA6" strokeWidth={3.5}>
          <rect x={x + 30} y={y + 50} width={38} height={104} rx={6} fill="#D0E8F5" fillOpacity={0.9} />
          <line x1={x + 49} y1={y + 50} x2={x + 49} y2={y + 154} />
          <line x1={x + 30} y1={y + 102} x2={x + 68} y2={y + 102} />
          <rect x={x + w - 68} y={y + 50} width={38} height={104} rx={6} fill="#D0E8F5" fillOpacity={0.9} />
          <line x1={x + w - 49} y1={y + 50} x2={x + w - 49} y2={y + 154} />
          <line x1={x + w - 68} y1={y + 102} x2={x + w - 30} y2={y + 102} />
        </g>
        {/* Desks */}
        {[0, 1, 2, 3].map((d) => (
          <g key={d}>
            <rect x={x + 36 + d * 128} y={y + 236} width={104} height={16} rx={5} fill="#B98A55" stroke="#7A5530" strokeWidth={2} filter="url(#cc-shadow)" />
            <rect x={x + 44 + d * 128} y={y + 252} width={10} height={56} fill="#7A5530" rx={2} />
            <rect x={x + 122 + d * 128} y={y + 252} width={10} height={56} fill="#7A5530" rx={2} />
          </g>
        ))}
      </g>
    );
    return (
      <g>
        {/* Grain of Sugar scene */}
        <rect x={x + 14} y={y + 14} width={w - 28} height={h - 28} rx={14} fill="#F5F0F8" />
        <circle cx={x + 200} cy={y + 160} r={125} fill="#FFFFFF" fillOpacity={0.6} stroke={C.dim} strokeWidth={3} strokeDasharray="10 8" />
        {/* Sugar crystal illustration */}
        {ccCube(ccProj(x + 200, y + 160, 48), 0, 0, 0, "#EEEDE8", { key: "grain", skin: false, tint: 0 })}
      </g>
    );
  };
  const drawUnit = () => {
    const ans = item.answer;
    const demo = tb > 0;
    const placed = won ? ans : demo ? (final(5) ? ans : null) : S.placed;
    const ansSh = SHELF.find((q) => q.u === ans)!;
    const wrongU = wrong && typeof wrong.value === "string" && wrong.value !== ans && SHELF.some((q) => q.u === wrong.value) ? wrong.value : (ans === "cu. m" ? "cu. cm" : "cu. m");
    const wSh = SHELF.find((q) => q.u === wrongU)!;
    const green = won || (demo && final(5));
    return (
      <g>
        <rect x={CARD.x} y={CARD.y} width={CARD.w} height={CARD.h} rx={22} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} filter="url(#cc-shadow)" />
        {thingArt(item.thing)}
        {label(CARD.x + CARD.w / 2, CARD.y + CARD.h + 54, tx(item.thing === "classroom" ? "Classroom" : "Grain of sugar"), T.speech, C.ink)}
        {/* the correction: the chosen size set against the thing */}
        {demo && !final(4) && item.thing === "classroom" && Array.from({ length: Math.min(tb, 3) * 2 }).map((_, m) => {
          const a = wrongU === "cu. mm" ? 10 : 16, c = a * 0.866;
          return ccCube(ccProj(CARD.x + 30 + m * (2 * c + 3), CARD.y + CARD.h - 30 - a, a), 0, 0, 0, CC_VIO, { key: "r" + m, skin: false });
        })}
        {demo && !final(4) && item.thing === "sugar" && ccCube(ccProj(CARD.x + 440, CARD.y + 260 - Math.min(wSh.a, 100), Math.min(wSh.a, 100)), 0, 0, 0, CC_VIO, { key: "big", skin: false })}
        {placed && (() => {
          const sh = SHELF.find((q) => q.u === placed)!, at = cardAt(sh);
          return ccCube(ccProj(at.x, at.y, cardA(sh)), 0, 0, 0, green ? CC_GRN : CC_VIO, { key: "pl", skin: true });
        })()}
        {placed && (
          <g filter="url(#cc-shadow)">
            <rect x={CARD.x + 38} y={CARD.y + CARD.h - 88} width={190} height={56} rx={14} fill={green ? "url(#cc-chip-green)" : "#FFFFFF"} stroke={green ? CC_GRN : CC_VIO} strokeWidth={4} />
            <text x={CARD.x + 133} y={CARD.y + CARD.h - 48} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={green ? greenInk : violetInk}>{tx(placed)}</text>
          </g>
        )}
        {/* the shelf */}
        <g filter="url(#cc-shadow)">
          <rect x={670} y={PLANK} width={680} height={24} rx={8} fill="url(#cc-plank-grad)" stroke="#5C3D2E" strokeWidth={2.5} />
          <rect x={676} y={PLANK + 3} width={668} height={4} rx={2} fill="#FFFFFF" fillOpacity={0.25} />
        </g>
        {S.pulse === "shelf" && stage === "ask" && !S.placed && <CcRing x={680} y={136} w={660} h={360} rx={22} />}
        {SHELF.map((sh) => {
          const away = (placed === sh.u) || S.carry === sh.u;
          const lit = demo && final(4) && !final(5) && sh.u === ans;
          const o = shelfAt(sh), hb = Math.max(80, sh.a * 1.8);
          return (
            <g key={sh.u}>
              {lit && <rect x={o.x - hb / 2 - 6} y={o.y - hb / 2 - 6} width={hb + 12} height={hb + 12} rx={16} fill={tint(CC_AMB, 0.7)} stroke={CC_AMB} strokeWidth={5} filter="url(#cc-glow-amber)" />}
              {!away && ccCube(ccProj(o.x, PLANK - sh.a, sh.a), 0, 0, 0, lit ? CC_AMB : CC_VIO, { key: "c", skin: true })}
              {label(o.x, PLANK + 66 + (lang === "en" ? 0 : 8), tx(sh.lab), T.prompt, blueInk)}
              {!tbr && !won && (stage === "ask" || stage === "teach") && (
                <CcTap id={"cube-" + sh.lab.replace("1 ", "")} label={"Unit cube " + sh.lab} x={o.x - hb / 2} y={o.y - hb / 2} w={hb} h={hb} pass={S.placed === sh.u}
                  onPress={() => { if (!guard()) return; touch(); placeAct(sh.u); }} />
              )}
            </g>
          );
        })}
        <text x={990} y={104} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink} wordSpacing={lang === "hi" ? 6 : 0} stroke="#FFFDF7" strokeWidth={6} paintOrder="stroke" strokeLinejoin="round">{tx("Not drawn to size.")}</text>
        {void ansSh}
      </g>
    );
  };
  /* the 1 m unit cube and its edges (a choice question: no act, ungated) */
  const drawUnitQ = () => {
    const a = 190, P = ccProj(420, 470 - a, a);
    const demo = tb > 0, green = won || (demo && final(2)), lit = demo && !final(2);
    const G = P(0, 1, 0), F = P(1, 1, 0), E = P(1, 0, 0), B = P(1, 0, 1);
    const edge = (p: any, q: any, k: string) => <line key={k} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={lit ? CC_AMB : CC_BLU} strokeWidth={lit ? 9 : 6} strokeLinecap="round" />;
    return (
      <g>
        {label(420, 54, tx("Unit cube"), T.prompt, violetInk)}
        {ccCube(P, 0, 0, 0, green ? CC_GRN : CC_VIO, { key: "u", skin: true })}
        {edge(G, F, "a")}{edge(F, E, "b")}{edge(E, B, "c")}
        {label((G[0] + F[0]) / 2 - 34, (G[1] + F[1]) / 2 + 44, tx("1 m"), 36, blueInk)}
        {label((F[0] + E[0]) / 2 + 34, (F[1] + E[1]) / 2 + 44, tx("1 m"), 36, blueInk)}
        {label(E[0] + 18, (E[1] + B[1]) / 2 + 12, tx("1 m"), 36, blueInk, "start")}
        {green && (
          <g filter="url(#cc-glow-green)">
            <rect x={692} y={220} width={204} height={80} rx={16} fill="url(#cc-chip-green)" stroke={CC_GRN} strokeWidth={4} />
            <text x={794} y={274} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={greenInk}>{tx("1 cu. m")}</text>
          </g>
        )}
      </g>
    );
  };

  /* the legend: one unit cube and its edge */
  const side = it.kind === "rows";
  const legend = () => (
    <g filter="url(#cc-shadow)">
      <rect x={624} y={4} width={250} height={90} rx={16} fill="#FFFDF7" stroke={C.rule} strokeWidth={2} />
      {ccCube(ccProj(834, 46, 26), 0, 0, 0, CC_VIO, { key: "lg", skin: true })}
      {label(714, 42, tx("Unit cube"), T.label, violetInk)}
      {label(714, lang === "en" ? 82 : 86, tx("1 cm"), T.label, blueInk)}
    </g>
  );
  const answerLabel = (v: number, unit: string) => {
    const txt = String(v) + " " + tx(unit), pw = Math.max(250, 24 * txt.length + 44);
    const bx = side ? Math.min(630, 896 - pw) : 20, by = side ? 150 : 14;
    return (
      <g filter="url(#cc-glow-green)">
        <rect x={bx} y={by} width={pw} height={70} rx={16} fill="url(#cc-chip-green)" stroke={CC_GRN} strokeWidth={4} />
        <text x={bx + pw / 2} y={by + 48} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={greenInk}>{txt}</text>
      </g>
    );
  };

  /* ═══ phase 3: count the rows ═══ */
  const drawRows = () => {
    const Lr = rowLay();
    const demo = tb > 0;
    const counted = won ? it.J : demo ? Math.min(tb, it.J) : S.rows;
    const green = won || (demo && final(it.J + 1));
    const cubes: any[] = [];
    for (let j = 0; j < it.J; j++) for (let i = 0; i < it.I; i++) cubes.push([i, j, 0]);
    const isCounted = (i: number, j: number) => j >= it.J - counted;
    const isNow = (i: number, j: number) => !demo && !won && j === it.J - 1 - S.rows && i < S.rowPart;
    const done = S.rows >= it.J;
    return (
      <g>
        {legend()}
        {green && answerLabel(it.answer, it.unit)}
        {ccSort(cubes).map((q: any, m: number) => {
          const col = green ? CC_GRN : isCounted(q[0], q[1]) ? CC_VIO : isNow(q[0], q[1]) ? CC_AMB : CC_WOOD;
          return ccCube(Lr.P, q[0], q[1], q[2], col, { key: m, skin: skinned, tint: col === CC_WOOD ? 0 : 0.85 });
        })}
        {it.J > 1 && Array.from({ length: it.J }).map((_, j) => {
          if (!(j >= it.J - counted)) return null;
          const p = Lr.P(it.I - 0.5, j + 0.5, 1);
          return label(p[0], p[1] + 14, String(it.I), T.prompt, C.ink, "middle", "rc" + j);
        })}
        {(stage === "ask" || isDemo || stage === "teach" || won) && keyBtn("row", tx("Count row"), R.x + R.w / 2 - 140, 280, rowAct, { disabled: done || won || tbr })}
        {((isDemo && stepOn === "row") || (stage === "ask" && !done && !demo)) && <Invite x={R.x + R.w / 2} y={keysY + 40} w={280} h={80} C={C} />}
      </g>
    );
  };

  /* ═══ phase 4: lift the layers ═══ */
  const drawStack = () => {
    const Ls = stackLay();
    const demo = tb > 0;
    const L = it.L;
    const lifts = won || demo ? L - 1 : S.lifts;
    const green = won || (demo && final(L + 1));
    const cells = ccCells(it);
    const all: any[] = [];
    for (let k = 0; k < L; k++) {
      if (S.carry === k && !demo && !won) continue;
      const up = k >= L - lifts;
      cells.forEach((q: any) => all.push({ s: up ? k : 0, i: q[0], j: q[1], h: up ? 0 : k, k }));
    }
    const allOut = lifts >= L - 1;
    const layerLit = (k: number) => (demo ? !green && k === L - Math.min(tb, L) : k >= L - lifts || (allOut && k === 0));
    const done = S.lifts >= L - 1;
    const order = all.slice().sort((p: any, q: any) => p.s - q.s || p.i + p.j + p.h - (q.i + q.j + q.h));
    const chips: any[] = [];
    for (let k = 0; k < L; k++) {
      const visible = demo ? k >= L - Math.min(tb, L) || green : k >= L - lifts || (allOut && k === 0);
      if (!visible || (S.carry === k && !demo && !won)) continue;
      const s = k >= L - lifts ? k : 0, hgt = k >= L - lifts ? 1 : k + 1;
      const p = Ls.slot(s)(0, 0, hgt);
      chips.push({ k, x: Ls.slot(s)(it.P / 2, it.Q / 2, hgt)[0], y: p[1] - 14 });
    }
    return (
      <g>
        {legend()}
        {green && answerLabel(it.answer, it.unit)}
        {order.map((q: any, m: number) => {
          const col = green ? CC_GRN : demo && layerLit(q.k) ? CC_AMB : CC_VIO;
          return ccCube(Ls.slot(q.s), q.i, q.j, q.h, col, { key: m, skin: skinned, see: S.see && !demo && !won });
        })}
        {chips.map((c: any) => (
          <g key={"ch" + c.k} filter="url(#cc-shadow)">
            <rect x={c.x - 34} y={c.y - 46} width={68} height={52} rx={14} fill="#FFFFFF" stroke={green ? CC_GRN : CC_VIO} strokeWidth={4} />
            <text x={c.x} y={c.y - 8} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(cells.length)}</text>
          </g>
        ))}
        {(stage === "ask" || isDemo || stage === "teach" || won || free) && (
          <g>
            {keyBtn(free && done ? "restack" : "lift", tx(free && done ? "Stack again" : "Lift layer"), CC_LW / 2 - 290, 280, liftAct,
              { disabled: !free && (done || won || tbr) })}
            {keyBtn("see", tx("See-through"), CC_LW / 2 + 10, 280, () => { put({ see: !cur.current.see }); didAct("see"); },
              { disabled: won || tbr, on: S.see })}
          </g>
        )}
        {((isDemo && stepOn === "lift") || (stage === "ask" && !done && !demo)) && <Invite x={CC_LW / 2 - 150} y={keysY + 40} w={280} h={80} C={C} />}
      </g>
    );
  };

  const kind = it.kind;
  return (
    <g>
      <CcDefs />
      {kind === "fill" && drawFill()}
      {kind === "unit" && drawUnit()}
      {kind === "unitq" && drawUnitQ()}
      {kind === "rows" && drawRows()}
      {kind === "stack" && drawStack()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, tx = (v: any) => v }: any) {
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  const item = it || {};
  const A = 14;                      /* cube 24 wide: the words, right-aligned, start well clear of it */
  const cube = (x: number, aa: number, col: string, k: string) => ccCube(ccProj(x, h / 2 - aa + aa, aa), 0, 0, 0, col, { key: k, skin: false });
  const word = (s: string) => <text key="t" x={w - 14} y={h / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{s}</text>;
  let art: any = null;
  if (item.kind === "fill") {
    const b = (item.bx || []).find((q: any) => q.id === v), n = b ? b.d[0] * b.d[1] * b.d[2] : 0;
    art = [cube(14 + A * 0.866, A, CC_GRN, "b"), word(String(n) + " " + tx("cubes"))];
  } else if (item.kind === "unit" || item.kind === "unitq") art = [cube(14 + A * 0.866, A, CC_GRN, "u"), word(tx(String(v)))];
  else art = [cube(14 + A * 0.866, A, CC_GRN, "c"), word(String(v) + " " + tx(item.unit === "unit cubes" ? "cubes" : item.unit || ""))];
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {art}
    </g>
  );
}

function CubeCounter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
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

export default CubeCounter;
