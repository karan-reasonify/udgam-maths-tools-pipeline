/* ═══ M3.S5.T10.C46.2D1 · box_packer · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "box_packer";
const MEDIA_ID = "M3.S5.T10.C46.2D1";
const TOOL_NAME = "Box Packer";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};


/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A base, a box and some cubes."];
/* the whole-tool line: not shown from r44, kept for the tool object's shape */
const FINISH_LINE = "You checked every edge before trusting a division.";
/* printed when the child opens Free play; free play offers exactly this: a base to pick, raised as high as the child likes */
const FREE_LINE = "Free play. Pick a base and raise it as high as you like.";

const START_HOOK = "How many cubes really fit in a box?";

/* ── drawing helpers (isometric: x runs down-right, y down-left, z up; every solid in one projection, to scale) ── */
const BP_C = 0.8660254;
const BPK = { blue: "#0072B2", green: "#009E73", amber: "#E69F00", violet: "#6E4FB0", rose: "#D45D7E", ink: "#2B2B2B", paper: "#FFFDF7" };
const BP_WOOD = ["#F4DFB4", "#DDB87E", "#E9C994", "#7A5A2E"];
const BP_CARD = ["#DDBD8E", "#C69C64", "#D3AC76", "#6B4E2A"];
function bpP(o: number[], x: number, y: number, z: number) { return [o[0] + (x - y) * BP_C, o[1] + (x + y) * 0.5 - z]; }
function bpS(pts: number[][]) { return pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" "); }
function bpBB(pts: number[][]) {
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const x = Math.min(...xs), y = Math.min(...ys);
  return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
}
function bpPrism(o: number[], x: number, y: number, z: number, w: number, d: number, h: number) {
  return {
    top: [bpP(o, x, y, z + h), bpP(o, x + w, y, z + h), bpP(o, x + w, y + d, z + h), bpP(o, x, y + d, z + h)],
    left: [bpP(o, x, y + d, z), bpP(o, x + w, y + d, z), bpP(o, x + w, y + d, z + h), bpP(o, x, y + d, z + h)],
    right: [bpP(o, x + w, y, z), bpP(o, x + w, y + d, z), bpP(o, x + w, y + d, z + h), bpP(o, x + w, y, z + h)],
  };
}
/* one cardboard face: the plain fill (the fallback), the carton skin clipped to the face, a shade, the outline */
function bpFace(id: string, pts: number[][], base: string, tint: string, op: number) {
  const bb = bpBB(pts), s = bpS(pts);
  return (
    <g key={id}>
      <clipPath id={id}><polygon points={s} /></clipPath>
      <polygon points={s} fill={base} />
      <Skin name="carton" x={bb.x} y={bb.y} w={bb.w} h={bb.h} clip={"url(#" + id + ")"} />
      {op > 0 ? <polygon points={s} fill={tint} fillOpacity={op} /> : null}
      <polygon points={s} fill="none" stroke={BP_CARD[3]} strokeWidth={2.8} strokeLinejoin="round" strokeLinecap="round" />
    </g>
  );
}
/* one wooden cube: three plain faces (the fallback), the cube skin over its hexagon, an optional tint, the outline */
function bpCube(id: string, o: number[], x: number, y: number, z: number, e: number, skin: boolean, tint?: string, op = 0.45) {
  const f = bpPrism(o, x, y, z, e, e, e), bb = bpBB([...f.top, ...f.left, ...f.right]);
  return (
    <g key={id}>
      <polygon points={bpS(f.left)} fill={BP_WOOD[1]} />
      <polygon points={bpS(f.right)} fill={BP_WOOD[2]} />
      <polygon points={bpS(f.top)} fill={BP_WOOD[0]} />
      {skin ? <Skin name="cube" x={bb.x} y={bb.y} w={bb.w} h={bb.h} fit="stretch" /> : null}
      {tint ? [f.left, f.right, f.top].map((p, i) => <polygon key={"t" + i} points={bpS(p)} fill={tint} fillOpacity={op} />) : null}
      {[f.left, f.right, f.top].map((p, i) => <polygon key={"e" + i} points={bpS(p)} fill="none" stroke={tint === BPK.amber ? shade(BPK.amber, 0.2) : BP_WOOD[3]} strokeWidth={tint === BPK.amber ? 4.5 : 2.4} strokeLinejoin="round" strokeLinecap="round" />)}
    </g>
  );
}
/* a raised base: the solid's three faces in cardboard, the top face (the base area) tinted Given blue, a line at each layer */
function bpSolid(id: string, o: number[], a: number, b: number, hs: number, nL: number, lp: number) {
  const f = bpPrism(o, 0, 0, 0, a, b, hs), lines: any[] = [];
  for (let l = 1; l < nL; l++) {
    const z = l * lp;
    lines.push(<polyline key={"l" + l} points={bpS([bpP(o, 0, b, z), bpP(o, a, b, z), bpP(o, a, 0, z)])} fill="none" stroke={BPK.ink} strokeWidth={Math.max(0.6, Math.min(2.5, lp * 0.22))} strokeOpacity={lp < 8 ? 0.55 : 0.8} strokeLinecap="round" strokeLinejoin="round" />);
  }
  return (
    <g>
      {bpFace(id + "L", f.left, BP_CARD[1], "#000000", 0.16)}
      {bpFace(id + "R", f.right, BP_CARD[2], "#000000", 0.05)}
      {bpFace(id + "T", f.top, BP_CARD[0], BPK.blue, 0.36)}
      {lines}
    </g>
  );
}
/* the open box: floor and two back walls in cardboard (the front walls are left open so the cubes inside show) */
function bpBoxBack(id: string, o: number[], L: number, B: number, H: number) {
  const floor = [bpP(o, 0, 0, 0), bpP(o, L, 0, 0), bpP(o, L, B, 0), bpP(o, 0, B, 0)];
  const wallR = [bpP(o, 0, 0, 0), bpP(o, L, 0, 0), bpP(o, L, 0, H), bpP(o, 0, 0, H)];
  const wallL = [bpP(o, 0, 0, 0), bpP(o, 0, B, 0), bpP(o, 0, B, H), bpP(o, 0, 0, H)];
  return (
    <g>
      {bpFace(id + "F", floor, BP_CARD[0], "#000000", 0.03)}
      {bpFace(id + "R", wallR, BP_CARD[2], "#000000", 0.12)}
      {bpFace(id + "L", wallL, BP_CARD[1], "#000000", 0.2)}
    </g>
  );
}
function bpBoxFront(o: number[], L: number, B: number, H: number) {
  return (
    <g fill="none" stroke={BP_CARD[3]} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round">
      <polyline points={bpS([bpP(o, 0, B, 0), bpP(o, L, B, 0), bpP(o, L, 0, 0)])} />
      <polyline points={bpS([bpP(o, 0, B, 0), bpP(o, 0, B, H)])} />
      <polyline points={bpS([bpP(o, L, B, 0), bpP(o, L, B, H)])} />
      <polyline points={bpS([bpP(o, L, 0, 0), bpP(o, L, 0, H)])} />
      <polygon points={bpS([bpP(o, 0, 0, H), bpP(o, L, 0, H), bpP(o, L, B, H), bpP(o, 0, B, H)])} />
    </g>
  );
}
/* space where no whole cube goes: rose, see-through */
function bpRose(id: string, o: number[], x: number, y: number, z: number, w: number, d: number, h: number, op = 0.42) {
  const f = bpPrism(o, x, y, z, w, d, h);
  return (
    <g key={id}>
      {[f.left, f.right, f.top].map((p, i) => (
        <polygon key={i} points={bpS(p)} fill={BPK.rose} fillOpacity={op} stroke={shade(BPK.rose, 0.25)} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      ))}
    </g>
  );
}
/* a label chip: paper halo, shadow, coloured edge, deep ink of that colour */
/* the width of a line in em: zero-advance Devanagari and Gujarati marks count 0 (PATTERNS 18), their letters and spacing signs 0.64 */
function bpEm(text: string) {
  let em = 0;
  for (const ch of String(text)) {
    const c = ch.codePointAt(0) || 0;
    if ((c >= 0x900 && c <= 0x902) || c === 0x93c || (c >= 0x941 && c <= 0x948) || c === 0x94d || (c >= 0x951 && c <= 0x957) || c === 0x962 || c === 0x963
      || c === 0xa81 || c === 0xa82 || c === 0xabc || (c >= 0xac1 && c <= 0xac8) || c === 0xacd || c === 0xae2 || c === 0xae3) continue;
    em += (c >= 0x900 && c <= 0xaff) ? 0.64 : c === 32 ? 0.3 : /[0-9]/.test(ch) ? 0.6 : 0.58;
  }
  return Math.max(0.6, em);
}
function bpChipFit(text: string, size: number, maxW?: number) {
  let z = size;
  if (maxW) z = Math.max(T.micro, Math.min(size, Math.floor((maxW - 32) / bpEm(text))));
  return { size: z, w: bpEm(text) * z + 32, h: z + 20 };
}
function bpChip(id: string, x: number, y: number, text: string, col: string, size0: number, anchor = "middle", maxW?: number) {
  const { size, w, h } = bpChipFit(text, size0, maxW);
  const x0 = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  return (
    <g key={id}>
      {/* soft chip shadow */}
      <rect x={x0 + 2} y={y - h / 2 + 3} width={w} height={h} rx={12} fill="#000000" fillOpacity={0.12} />
      <rect x={x0} y={y - h / 2} width={w} height={h} rx={12} fill={BPK.paper} stroke={col} strokeWidth={3.2} />
      <text x={x0 + w / 2} y={y + 1} dominantBaseline="central" textAnchor="middle" fontSize={size} fontWeight={700} fill={shade(col, 0.25)}>{text}</text>
    </g>
  );
}
/* a card of lines in the right-hand column */
function bpCard(id: string, x: number, y: number, w: number, lines: any[], edge: string, size = 34) {
  const pitch = size + 14, h = lines.length * pitch + 24;
  return (
    <g key={id}>
      {/* soft ambient shadow */}
      <rect x={x + 3} y={y + 4} width={w} height={h} rx={RAD.panel} fill="#000000" fillOpacity={0.08} />
      <rect x={x} y={y} width={w} height={h} rx={RAD.panel} fill={BPK.paper} stroke={edge} strokeWidth={3} />
      {lines.map((l: any, i: number) => {
        const curSize = Math.max(T.micro, Math.min(l.size || size, Math.floor((w - 30) / bpEm(l.t))));   /* a line fits its card in every language */
        const lineY = y + 12 + pitch * i + pitch * 0.5;
        return (
          <text key={i} x={x + w / 2} y={lineY} dominantBaseline="central" textAnchor="middle" fontSize={curSize} fontWeight={700}
            fill={shade(l.col || BPK.ink, l.col ? 0.25 : 0)}>{l.t}</text>
        );
      })}
    </g>
  );
}

function StartArt({ box, C, lang, tx }: any) {
  /* a raised base, an open box with cubes along its edges, and a few loose cubes: no digits, no words */
  const so = [190, 175], sa = 190, sb = 110;   /* inside the 340-tall box: top 25, bottom 325 */
  const bo = [600, 122], s = 28, L = 8 * s, B = 6 * s, H = 4 * s, c = 2 * s;
  const cubes: any[] = [];
  for (let i = 0; i < 4; i++) cubes.push([i * c, 0, 0]);
  for (let j = 1; j < 3; j++) cubes.push([0, j * c, 0]);
  cubes.push([0, 0, c]);
  cubes.sort((p, q) => p[0] + p[1] + p[2] - (q[0] + q[1] + q[2]));
  const lo = [960, 215], e = 56;
  return (
    <g>
      {/* Ground drop shadow under base solid */}
      <ellipse cx={so[0] + (sa - sb) * BP_C / 2} cy={so[1] + (sa + sb) * 0.25} rx={sa * 0.62} ry={sb * 0.42} fill="#000000" fillOpacity={0.07} />
      {/* Ground shadow under open box */}
      <ellipse cx={bo[0] + (L - B) * BP_C / 2} cy={bo[1] + (L + B) * 0.25} rx={(L + B) * 0.45} ry={(L + B) * 0.24} fill="#000000" fillOpacity={0.07} />
      {bpSolid("bpsa", so, sa, sb, 150, 5, 30)}
      {bpBoxBack("bpsb", bo, L, B, H)}
      {cubes.map((p, i) => bpCube("sc" + i, bo, p[0], p[1], p[2], c, true))}
      {bpBoxFront(bo, L, B, H)}
      {bpCube("sl1", lo, 0, 0, 0, e, true)}
      {bpCube("sl2", lo, e * 1.6, 0, 0, e, true)}
      {bpCube("sl3", lo, e * 0.8, -e * 0.2, e, e, true)}
    </g>
  );
}

/* Hindi and Gujarati: filled in the language pass, once the English is final */
const TR: any = {
  hi: {
    "Box Packer": "डिब्बा भरो",
    "Base area times height": "आधार का क्षेत्रफल गुणा ऊँचाई",
    "A height worked back": "उल्टा चलकर ऊँचाई",
    "Small cubes make a block": "छोटे घनों से बना ब्लॉक",
    "Cubes that really fit": "जो घन सच में समाते हैं",
    "The base is already length times breadth. Now raise it.": "आधार पहले से लंबाई गुणा चौड़ाई है। अब इसे ऊपर उठाओ।",
    "What times the base gives the volume?": "आधार को किससे गुणा करें कि आयतन मिले?",
    "Find one cube first. How many cubes make the block?": "पहले एक घन का आयतन निकालो। ब्लॉक में कितने घन हैं?",
    "Pack one edge at a time. Is any space left over?": "एक बार में एक किनारा भरो। क्या कोई जगह बची?",
    "A base, a box and some cubes.": "एक आधार, एक डिब्बा और कुछ घन।",
    "Free play. Pick a base and raise it as high as you like.": "खुला खेल। एक आधार चुनो और जितना चाहो ऊपर उठाओ।",
    "How many cubes really fit in a box?": "एक डिब्बे में सच में कितने घन समाते हैं?",
    "You checked every edge before trusting a division.": "तुमने भाग पर भरोसा करने से पहले हर किनारा जाँचा।",
    "Tap Raise to lift this 10 square centimetre base up by 1 cm.": "उठाओ दबाकर इस 10 वर्ग सेंटीमीटर आधार को 1 सेंटीमीटर ऊपर करो।",
    "Tap the Raise key beside the base.": "आधार के पास उठाओ बटन दबाओ।",
    "Tap Raise again to stack a second layer on top.": "ऊपर दूसरी परत रखने के लिए फिर उठाओ दबाओ।",
    "Each tap on Raise adds one more layer.": "उठाओ के हर टैप से एक परत बढ़ती है।",
    "The height tells you how many layers the box holds.": "ऊँचाई बताती है कि डिब्बे में कितनी परतें हैं।",
    "Multiply, never add, a flat area and a length.": "सपाट क्षेत्रफल और लंबाई को गुणा करो, जोड़ो नहीं।",
    "So the volume of a cuboid is base area × height.": "तो घनाभ का आयतन आधार का क्षेत्रफल × ऊँचाई है।",
    "You learned: the volume of a cuboid is base area × height": "तुमने सीखा: घनाभ का आयतन = आधार का क्षेत्रफल × ऊँचाई",
    "Raise the 24 square centimetre base to 7 cm, then find the volume of the box.": "24 वर्ग सेंटीमीटर आधार को 7 सेंटीमीटर उठाओ, फिर डिब्बे का आयतन बताओ।",
    "Volume of the box?": "डिब्बे का आयतन?",
    "One layer 1 cm high is 24 cubic centimetres.": "1 सेंटीमीटर ऊँची एक परत 24 घन सेंटीमीटर है।",
    "Yes, 24 × 7 = 168 cubic centimetres.": "हाँ, 24 × 7 = 168 घन सेंटीमीटर।",
    "Raise a 20 square metre base to 3 m and find the volume of that box.": "20 वर्ग मीटर आधार को 3 मीटर उठाओ और उस डिब्बे का आयतन बताओ।",
    "Every 1 m layer of this box is 20 cubic metres.": "इस डिब्बे की हर 1 मीटर परत 20 घन मीटर है।",
    "Right, 20 × 3 = 60 cubic metres.": "सही, 20 × 3 = 60 घन मीटर।",
    "A box has a 45 square metre base and is 3 m high, so what is its volume?": "एक डिब्बे का आधार 45 वर्ग मीटर और ऊँचाई 3 मीटर है, उसका आयतन क्या है?",
    "What volume?": "कितना आयतन?",
    "Stack 3 layers of 45 cubic metres.": "45 घन मीटर की 3 परतें रखो।",
    "Yes, 45 × 3 = 135 cubic metres.": "हाँ, 45 × 3 = 135 घन मीटर।",
    "Tap plus to try a height of 1 m on this 5 square metre base.": "इस 5 वर्ग मीटर आधार पर 1 मीटर ऊँचाई आज़माने के लिए प्लस दबाओ।",
    "The plus key turns the dial up.": "प्लस बटन डायल को ऊपर घुमाता है।",
    "Tap Check to write the base area times this height.": "आधार का क्षेत्रफल गुणा यह ऊँचाई लिखने के लिए जाँचो दबाओ।",
    "Tap the Check key under the line.": "रेखा के नीचे जाँचो बटन दबाओ।",
    "Use your times tables to find the missing factor.": "छूटा हुआ गुणनखंड पहाड़ों से ढूँढो।",
    "Multiply your height back by the base area to check it.": "जाँचने के लिए अपनी ऊँचाई को आधार के क्षेत्रफल से गुणा करो।",
    "A height is the number that times the base area gives the volume.": "ऊँचाई वह संख्या है जिससे आधार का क्षेत्रफल गुणा करने पर आयतन मिले।",
    "You learned: height × base area gives the volume": "तुमने सीखा: ऊँचाई × आधार का क्षेत्रफल = आयतन",
    "How high is a 204 cubic metre box on a 34 square metre base?": "34 वर्ग मीटर आधार वाला 204 घन मीटर का डिब्बा कितना ऊँचा है?",
    "How high?": "कितना ऊँचा?",
    "Set it up as 34 times a missing number makes 204.": "ऐसे लिखो: 34 गुणा छूटी संख्या बराबर 204।",
    "Yes, 34 × 6 = 204, so the box is 6 m high.": "हाँ, 34 × 6 = 204, तो डिब्बा 6 मीटर ऊँचा है।",
    "A 56 cubic centimetre box has a 14 square centimetre base, so how tall is it?": "56 घन सेंटीमीटर के डिब्बे का आधार 14 वर्ग सेंटीमीटर है, वह कितना ऊँचा है?",
    "Height of the box?": "डिब्बे की ऊँचाई?",
    "Say the 14 times table until you reach 56.": "14 का पहाड़ा 56 तक बोलो।",
    "Right, 14 × 4 = 56, so the box is 4 cm high.": "सही, 14 × 4 = 56, तो डिब्बा 4 सेंटीमीटर ऊँचा है।",
    "How high is a box of 117 cubic centimetres on a base of 13 square centimetres?": "13 वर्ग सेंटीमीटर आधार पर 117 घन सेंटीमीटर का डिब्बा कितना ऊँचा है?",
    "Count up in 13s until you reach 117.": "13-13 करके 117 तक गिनो।",
    "Yes, 13 × 9 = 117, so it is 9 cm high.": "हाँ, 13 × 9 = 117, तो वह 9 सेंटीमीटर ऊँचा है।",
    "Tap a cube to measure its edge.": "किनारा नापने के लिए एक घन पर टैप करो।",
    "Tap the front wooden cube.": "आगे वाले लकड़ी के घन पर टैप करो।",
    "Tap Join to push the 3 cubes into one block.": "3 घनों का एक ब्लॉक बनाने के लिए जोड़ो दबाओ।",
    "The Join key pushes the cubes together.": "जोड़ो बटन घनों को पास-पास धकेलता है।",
    "Add one cube's volume once for every cube in the block.": "ब्लॉक के हर घन के लिए एक घन का आयतन एक बार जोड़ो।",
    "Multiplying the count by the edge gives a length, not a volume.": "गिनती को किनारे से गुणा करने पर लंबाई मिलती है, आयतन नहीं।",
    "A block of equal cubes has the count times one cube's volume.": "बराबर घनों के ब्लॉक का आयतन गिनती गुणा एक घन का आयतन है।",
    "You learned: a block of equal cubes is count × one cube's volume": "तुमने सीखा: ब्लॉक का आयतन = गिनती × एक घन का आयतन",
    "Join the 6 cubes with 5 cm edges and find the volume of the block.": "5 सेंटीमीटर के 6 घन जोड़ो, फिर ब्लॉक का आयतन बताओ।",
    "Volume of the block?": "ब्लॉक का आयतन?",
    "One 5 cm cube is 5×5×5 cubic centimetres.": "5 सेंटीमीटर का एक घन 5×5×5 घन सेंटीमीटर है।",
    "Yes, 6 × 125 = 750 cubic centimetres.": "हाँ, 6 × 125 = 750 घन सेंटीमीटर।",
    "Join 10 cubes of 8 cubic centimetres each and give the block's volume.": "8-8 घन सेंटीमीटर के 10 घन जोड़कर आयतन बताओ।",
    "Multiply 8 cubic centimetres by the number of cubes.": "8 घन सेंटीमीटर को घनों की गिनती से गुणा करो।",
    "Right, 10 × 8 = 80 cubic centimetres.": "सही, 10 × 8 = 80 घन सेंटीमीटर।",
    "What is the volume of a block of 4 equal cubes with 3 cm edges?": "3 सेंटीमीटर किनारे वाले 4 बराबर घनों के ब्लॉक का आयतन क्या है?",
    "First find the volume of one 3 cm cube.": "पहले 3 सेंटीमीटर के एक घन का आयतन निकालो।",
    "Yes, 4 × 27 = 108 cubic centimetres.": "हाँ, 4 × 27 = 108 घन सेंटीमीटर।",
    "Tap Pack edge to lay 2 cm cubes along the 5 cm edge.": "5 सेंटीमीटर किनारे पर 2 सेंटीमीटर के घन रखने के लिए किनारा भरो दबाओ।",
    "Tap the Pack edge key.": "किनारा भरो बटन दबाओ।",
    "Tap Pack edge again to fill the 4 cm edge.": "4 सेंटीमीटर किनारा भरने के लिए फिर किनारा भरो दबाओ।",
    "Pack edge lays the next row of cubes.": "किनारा भरो घनों की अगली पंक्ति रखता है।",
    "Tap Pack edge once more to go up the 2 cm edge.": "2 सेंटीमीटर ऊँचे किनारे के लिए एक बार और किनारा भरो दबाओ।",
    "One more tap packs the last edge.": "एक और टैप से आखिरी किनारा भरेगा।",
    "Multiply the whole cubes along the three edges.": "तीनों किनारों पर पूरे घनों की गिनती को गुणा करो।",
    "A division of volumes counts parts of cubes, but only whole cubes go in.": "आयतन का भाग घनों के टुकड़े भी गिनता है, पर अंदर सिर्फ पूरे घन जाते हैं।",
    "Check each edge, because space left over means fewer cubes fit.": "हर किनारा जाँचो, क्योंकि बची जगह का मतलब है कम घन समाते हैं।",
    "You learned: check each edge; space left over means fewer cubes fit": "तुमने सीखा: हर किनारा जाँचो; बची जगह यानी कम घन",
    "How many 3 cm cubes really fit in a box 9 cm by 6 cm by 4 cm?": "9, 6 और 4 सेंटीमीटर के डिब्बे में 3 सेंटीमीटर के कितने घन सच में समाते हैं?",
    "Whole cubes that fit?": "कितने पूरे घन समाते हैं?",
    "How many whole 3 cm cubes fit along the 9 cm edge?": "9 सेंटीमीटर किनारे पर 3 सेंटीमीटर के कितने पूरे घन आते हैं?",
    "Right, 3 × 2 × 1 = 6 whole cubes fit.": "सही, 3 × 2 × 1 = 6 पूरे घन समाते हैं।",
    "Pack 2 cm cubes in a box 10 cm by 4 cm by 3 cm: how many whole ones fit?": "10, 4 और 3 सेंटीमीटर के डिब्बे में 2 सेंटीमीटर के घन भरो: कितने पूरे समाते हैं?",
    "How many 2 cm cubes fit along the 3 cm edge?": "3 सेंटीमीटर किनारे पर 2 सेंटीमीटर के कितने घन आते हैं?",
    "Correct, 5 × 2 × 1 = 10 cubes, not 15.": "बिल्कुल, 5 × 2 × 1 = 10 घन, 15 नहीं।",
    "Do 3 cm cubes fill a box 15 cm by 9 cm by 6 cm with no space left over?": "क्या 3 सेंटीमीटर के घन 15, 9 और 6 सेंटीमीटर का डिब्बा बिना जगह बचे भरते हैं?",
    "Is the box full?": "क्या डिब्बा भरा है?",
    "Divide each edge by 3 and look for a remainder.": "हर किनारे को 3 से भाग दो और शेष देखो।",
    "They fill it: 5 × 3 × 2 = 30 cubes, no gap.": "वे भर देते हैं: 5 × 3 × 2 = 30 घन, कोई जगह नहीं।",
    "Yes": "हाँ",
    "No": "नहीं",
    "Tap Raise to build the box first.": "पहले उठाओ दबाकर डिब्बा बनाओ।",
    "Tap Join to build the block first.": "पहले जोड़ो दबाकर ब्लॉक बनाओ।",
    "Tap Pack edge to fill each edge first.": "पहले किनारा भरो दबाकर हर किनारा भरो।",
    "Raise": "उठाओ",
    "New base": "नया आधार",
    "Check": "जाँचो",
    "Join": "जोड़ो",
    "Pack edge": "किनारा भरो",
    "Volume": "आयतन",
    "cubes": "घन",
    "cube": "घन",
    "fit": "आते हैं",
    "Left over": "बची जगह",
    "Yes, no gap": "हाँ, पूरा भरा",
    "Base": "आधार",
    "Height": "ऊँचाई",
    "Edge": "किनारा",
    "Each": "हर एक",
    "Box": "डिब्बा",
    "Cube": "घन",
    "cm": "सेमी",
    "m": "मी",
    "sq. cm": "वर्ग सेमी",
    "sq. m": "वर्ग मी",
    "cu. cm": "घन सेमी",
    "cu. m": "घन मी",
  },
  gu: {
    "Box Packer": "ડબ્બો ભરો",
    "Base area times height": "પાયાનું ક્ષેત્રફળ ગુણ્યા ઊંચાઈ",
    "A height worked back": "ઊંધી ગણતરીથી ઊંચાઈ",
    "Small cubes make a block": "નાના ઘનથી બનેલો બ્લોક",
    "Cubes that really fit": "જે ઘન ખરેખર સમાય છે",
    "The base is already length times breadth. Now raise it.": "પાયો પહેલેથી લંબાઈ ગુણ્યા પહોળાઈ છે. હવે તેને ઉપર ઉઠાવો.",
    "What times the base gives the volume?": "પાયાને કોનાથી ગુણીએ તો ઘનફળ મળે?",
    "Find one cube first. How many cubes make the block?": "પહેલાં એક ઘનનું ઘનફળ શોધો. બ્લોકમાં કેટલા ઘન છે?",
    "Pack one edge at a time. Is any space left over?": "એક વારમાં એક ધાર ભરો. શું કોઈ જગ્યા બચી?",
    "A base, a box and some cubes.": "એક પાયો, એક ડબ્બો અને થોડા ઘન.",
    "Free play. Pick a base and raise it as high as you like.": "મુક્ત રમત. એક પાયો પસંદ કરો અને ગમે તેટલો ઉપર ઉઠાવો.",
    "How many cubes really fit in a box?": "એક ડબ્બામાં ખરેખર કેટલા ઘન સમાય?",
    "You checked every edge before trusting a division.": "તમે ભાગાકાર પર ભરોસો કરતાં પહેલાં દરેક ધાર તપાસી.",
    "Tap Raise to lift this 10 square centimetre base up by 1 cm.": "ઉઠાવો દબાવીને આ 10 ચોરસ સેન્ટીમીટરના પાયાને 1 સેન્ટીમીટર ઉપર કરો.",
    "Tap the Raise key beside the base.": "પાયા પાસેનું ઉઠાવો બટન દબાવો.",
    "Tap Raise again to stack a second layer on top.": "ઉપર બીજું પડ મૂકવા ફરી ઉઠાવો દબાવો.",
    "Each tap on Raise adds one more layer.": "ઉઠાવોના દરેક ટેપથી એક પડ વધે છે.",
    "The height tells you how many layers the box holds.": "ઊંચાઈ કહે છે કે ડબ્બામાં કેટલાં પડ છે.",
    "Multiply, never add, a flat area and a length.": "સપાટ ક્ષેત્રફળ અને લંબાઈનો ગુણાકાર કરો, સરવાળો નહીં.",
    "So the volume of a cuboid is base area × height.": "તો લંબઘનનું ઘનફળ પાયાનું ક્ષેત્રફળ × ઊંચાઈ છે.",
    "You learned: the volume of a cuboid is base area × height": "તમે શીખ્યા: લંબઘનનું ઘનફળ = પાયાનું ક્ષેત્રફળ × ઊંચાઈ",
    "Raise the 24 square centimetre base to 7 cm, then find the volume of the box.": "24 ચોરસ સેન્ટીમીટરના પાયાને 7 સેન્ટીમીટર ઉઠાવો, પછી ડબ્બાનું ઘનફળ કહો.",
    "Volume of the box?": "ડબ્બાનું ઘનફળ?",
    "One layer 1 cm high is 24 cubic centimetres.": "1 સેન્ટીમીટર ઊંચું એક પડ 24 ઘન સેન્ટીમીટર છે.",
    "Yes, 24 × 7 = 168 cubic centimetres.": "હા, 24 × 7 = 168 ઘન સેન્ટીમીટર.",
    "Raise a 20 square metre base to 3 m and find the volume of that box.": "20 ચોરસ મીટરના પાયાને 3 મીટર ઉઠાવો અને તે ડબ્બાનું ઘનફળ કહો.",
    "Every 1 m layer of this box is 20 cubic metres.": "આ ડબ્બાનું દરેક 1 મીટરનું પડ 20 ઘન મીટર છે.",
    "Right, 20 × 3 = 60 cubic metres.": "સાચું, 20 × 3 = 60 ઘન મીટર.",
    "A box has a 45 square metre base and is 3 m high, so what is its volume?": "એક ડબ્બાનો પાયો 45 ચોરસ મીટર અને ઊંચાઈ 3 મીટર છે, તેનું ઘનફળ કેટલું?",
    "What volume?": "કેટલું ઘનફળ?",
    "Stack 3 layers of 45 cubic metres.": "45 ઘન મીટરનાં 3 પડ ગોઠવો.",
    "Yes, 45 × 3 = 135 cubic metres.": "હા, 45 × 3 = 135 ઘન મીટર.",
    "Tap plus to try a height of 1 m on this 5 square metre base.": "આ 5 ચોરસ મીટરના પાયા પર 1 મીટર ઊંચાઈ અજમાવવા પ્લસ દબાવો.",
    "The plus key turns the dial up.": "પ્લસ બટન ડાયલને ઉપર ફેરવે છે.",
    "Tap Check to write the base area times this height.": "પાયાનું ક્ષેત્રફળ ગુણ્યા આ ઊંચાઈ લખવા તપાસો દબાવો.",
    "Tap the Check key under the line.": "લીટી નીચેનું તપાસો બટન દબાવો.",
    "Use your times tables to find the missing factor.": "ખૂટતો અવયવ ઘડિયાથી શોધો.",
    "Multiply your height back by the base area to check it.": "તપાસવા તમારી ઊંચાઈને પાયાના ક્ષેત્રફળથી ગુણો.",
    "A height is the number that times the base area gives the volume.": "ઊંચાઈ એ સંખ્યા છે જેને પાયાના ક્ષેત્રફળથી ગુણતાં ઘનફળ મળે.",
    "You learned: height × base area gives the volume": "તમે શીખ્યા: ઊંચાઈ × પાયાનું ક્ષેત્રફળ = ઘનફળ",
    "How high is a 204 cubic metre box on a 34 square metre base?": "34 ચોરસ મીટર પાયાવાળો 204 ઘન મીટરનો ડબ્બો કેટલો ઊંચો છે?",
    "How high?": "કેટલો ઊંચો?",
    "Set it up as 34 times a missing number makes 204.": "આમ લખો: 34 ગુણ્યા ખૂટતી સંખ્યા બરાબર 204.",
    "Yes, 34 × 6 = 204, so the box is 6 m high.": "હા, 34 × 6 = 204, તો ડબ્બો 6 મીટર ઊંચો છે.",
    "A 56 cubic centimetre box has a 14 square centimetre base, so how tall is it?": "56 ઘન સેન્ટીમીટરના ડબ્બાનો પાયો 14 ચોરસ સેન્ટીમીટર છે, તે કેટલો ઊંચો છે?",
    "Height of the box?": "ડબ્બાની ઊંચાઈ?",
    "Say the 14 times table until you reach 56.": "14નો ઘડિયો 56 સુધી બોલો.",
    "Right, 14 × 4 = 56, so the box is 4 cm high.": "સાચું, 14 × 4 = 56, તો ડબ્બો 4 સેન્ટીમીટર ઊંચો છે.",
    "How high is a box of 117 cubic centimetres on a base of 13 square centimetres?": "13 ચોરસ સેન્ટીમીટરના પાયા પર 117 ઘન સેન્ટીમીટરનો ડબ્બો કેટલો ઊંચો છે?",
    "Count up in 13s until you reach 117.": "13-13 કરીને 117 સુધી ગણો.",
    "Yes, 13 × 9 = 117, so it is 9 cm high.": "હા, 13 × 9 = 117, તો તે 9 સેન્ટીમીટર ઊંચો છે.",
    "Tap a cube to measure its edge.": "ધાર માપવા એક ઘન પર ટેપ કરો.",
    "Tap the front wooden cube.": "આગળના લાકડાના ઘન પર ટેપ કરો.",
    "Tap Join to push the 3 cubes into one block.": "3 ઘનનો એક બ્લોક બનાવવા જોડો દબાવો.",
    "The Join key pushes the cubes together.": "જોડો બટન ઘનને પાસે ધકેલે છે.",
    "Add one cube's volume once for every cube in the block.": "બ્લોકના દરેક ઘન માટે એક ઘનનું ઘનફળ એક વાર ઉમેરો.",
    "Multiplying the count by the edge gives a length, not a volume.": "ગણતરીને ધારથી ગુણતાં લંબાઈ મળે, ઘનફળ નહીં.",
    "A block of equal cubes has the count times one cube's volume.": "સરખા ઘનના બ્લોકનું ઘનફળ ગણતરી ગુણ્યા એક ઘનનું ઘનફળ છે.",
    "You learned: a block of equal cubes is count × one cube's volume": "તમે શીખ્યા: બ્લોકનું ઘનફળ = ગણતરી × એક ઘનનું ઘનફળ",
    "Join the 6 cubes with 5 cm edges and find the volume of the block.": "5 સેન્ટીમીટર ધારવાળા 6 ઘન જોડો અને બ્લોકનું ઘનફળ કહો.",
    "Volume of the block?": "બ્લોકનું ઘનફળ?",
    "One 5 cm cube is 5×5×5 cubic centimetres.": "5 સેન્ટીમીટરનો એક ઘન 5×5×5 ઘન સેન્ટીમીટર છે.",
    "Yes, 6 × 125 = 750 cubic centimetres.": "હા, 6 × 125 = 750 ઘન સેન્ટીમીટર.",
    "Join 10 cubes of 8 cubic centimetres each and give the block's volume.": "8-8 ઘન સેન્ટીમીટરના 10 ઘન જોડો અને બ્લોકનું ઘનફળ કહો.",
    "Multiply 8 cubic centimetres by the number of cubes.": "8 ઘન સેન્ટીમીટરને ઘનની ગણતરીથી ગુણો.",
    "Right, 10 × 8 = 80 cubic centimetres.": "સાચું, 10 × 8 = 80 ઘન સેન્ટીમીટર.",
    "What is the volume of a block of 4 equal cubes with 3 cm edges?": "3 સેન્ટીમીટર ધારવાળા 4 સરખા ઘનના બ્લોકનું ઘનફળ કેટલું?",
    "First find the volume of one 3 cm cube.": "પહેલાં 3 સેન્ટીમીટરના એક ઘનનું ઘનફળ શોધો.",
    "Yes, 4 × 27 = 108 cubic centimetres.": "હા, 4 × 27 = 108 ઘન સેન્ટીમીટર.",
    "Tap Pack edge to lay 2 cm cubes along the 5 cm edge.": "5 સેન્ટીમીટરની ધાર પર 2 સેન્ટીમીટરના ઘન મૂકવા ધાર ભરો દબાવો.",
    "Tap the Pack edge key.": "ધાર ભરો બટન દબાવો.",
    "Tap Pack edge again to fill the 4 cm edge.": "4 સેન્ટીમીટરની ધાર ભરવા ફરી ધાર ભરો દબાવો.",
    "Pack edge lays the next row of cubes.": "ધાર ભરો ઘનની આગલી હાર મૂકે છે.",
    "Tap Pack edge once more to go up the 2 cm edge.": "2 સેન્ટીમીટર ઊંચી ધાર માટે એક વાર વધુ ધાર ભરો દબાવો.",
    "One more tap packs the last edge.": "એક વધુ ટેપથી છેલ્લી ધાર ભરાશે.",
    "Multiply the whole cubes along the three edges.": "ત્રણે ધાર પરના આખા ઘનની ગણતરીનો ગુણાકાર કરો.",
    "A division of volumes counts parts of cubes, but only whole cubes go in.": "ઘનફળનો ભાગાકાર ઘનના ટુકડા પણ ગણે, પણ અંદર ફક્ત આખા ઘન જાય.",
    "Check each edge, because space left over means fewer cubes fit.": "દરેક ધાર તપાસો, કારણ કે બચેલી જગ્યા એટલે ઓછા ઘન સમાય.",
    "You learned: check each edge; space left over means fewer cubes fit": "તમે શીખ્યા: દરેક ધાર તપાસો; બચેલી જગ્યા એટલે ઓછા ઘન",
    "How many 3 cm cubes really fit in a box 9 cm by 6 cm by 4 cm?": "9, 6 અને 4 સેન્ટીમીટરના ડબ્બામાં 3 સેન્ટીમીટરના કેટલા ઘન ખરેખર સમાય?",
    "Whole cubes that fit?": "કેટલા આખા ઘન સમાય?",
    "How many whole 3 cm cubes fit along the 9 cm edge?": "9 સેન્ટીમીટરની ધાર પર 3 સેન્ટીમીટરના કેટલા આખા ઘન આવે?",
    "Right, 3 × 2 × 1 = 6 whole cubes fit.": "સાચું, 3 × 2 × 1 = 6 આખા ઘન સમાય.",
    "Pack 2 cm cubes in a box 10 cm by 4 cm by 3 cm: how many whole ones fit?": "10, 4 અને 3 સેન્ટીમીટરના ડબ્બામાં 2 સેન્ટીમીટરના ઘન ભરો: કેટલા આખા સમાય?",
    "How many 2 cm cubes fit along the 3 cm edge?": "3 સેન્ટીમીટરની ધાર પર 2 સેન્ટીમીટરના કેટલા ઘન આવે?",
    "Correct, 5 × 2 × 1 = 10 cubes, not 15.": "બરાબર, 5 × 2 × 1 = 10 ઘન, 15 નહીં.",
    "Do 3 cm cubes fill a box 15 cm by 9 cm by 6 cm with no space left over?": "શું 3 સેન્ટીમીટરના ઘન 15, 9 અને 6 સેન્ટીમીટરનો ડબ્બો જગ્યા બચ્યા વિના ભરે?",
    "Is the box full?": "શું ડબ્બો ભરાયો?",
    "Divide each edge by 3 and look for a remainder.": "દરેક ધારને 3 વડે ભાગો અને શેષ જુઓ.",
    "They fill it: 5 × 3 × 2 = 30 cubes, no gap.": "તે ભરી દે છે: 5 × 3 × 2 = 30 ઘન, કોઈ જગ્યા નહીં.",
    "Yes": "હા",
    "No": "ના",
    "Tap Raise to build the box first.": "પહેલાં ઉઠાવો દબાવી ડબ્બો બનાવો.",
    "Tap Join to build the block first.": "પહેલાં જોડો દબાવી બ્લોક બનાવો.",
    "Tap Pack edge to fill each edge first.": "પહેલાં ધાર ભરો દબાવી દરેક ધાર ભરો.",
    "Raise": "ઉઠાવો",
    "New base": "નવો પાયો",
    "Check": "તપાસો",
    "Join": "જોડો",
    "Pack edge": "ધાર ભરો",
    "Volume": "ઘનફળ",
    "cubes": "ઘન",
    "cube": "ઘન",
    "fit": "સમાય",
    "Left over": "બચેલી જગ્યા",
    "Yes, no gap": "હા, પૂરો ભરાયો",
    "Base": "પાયો",
    "Height": "ઊંચાઈ",
    "Edge": "ધાર",
    "Each": "દરેક",
    "Box": "ડબ્બો",
    "Cube": "ઘન",
    "cm": "સેમી",
    "m": "મી",
    "sq. cm": "ચોરસ સેમી",
    "sq. m": "ચોરસ મી",
    "cu. cm": "ઘન સેમી",
    "cu. m": "ઘન મી",
  },
};

/* One entry per phase = one mount. Item fields of this tool: base (base area), ht (height), unit, vol (volume), cnt (cubes),
   edge (cube edge), each (one cube's volume), nx/ny (the block's rows), bx ([length, breadth, height]), cube (cube edge), win. */
const PHASES = [
  {
    n: 1,
    concept: "Base area times height",
    conceptId: "M3.S5.T10.C45", objectiveIds: ["O17"],
    says: ["The base is already length times breadth. Now raise it."],
    /* warm-up: a 10 sq. cm base raised to 2 layers (none of the phase's answers) */
    steps: [
      { say: "Tap Raise to lift this 10 square centimetre base up by 1 cm.", on: "raise", hint: "Tap the Raise key beside the base." },
      { say: "Tap Raise again to stack a second layer on top.", on: "raise", hint: "Each tap on Raise adds one more layer." },
    ],
    ladder: ["The height tells you how many layers the box holds.", "Multiply, never add, a flat area and a length."],
    closing: "So the volume of a cuboid is base area × height.",
    learned: "You learned: the volume of a cuboid is base area × height",
    traceback: "The solid rises again layer by layer, then base area × height = volume is written, ending on the answer.",
    items: [
      /* learn BP1: answer in the plan = 168 cu. cm */
      { qid: "M3.S5.T10.C45:BP1", kind: "raise", base: 24, ht: 7, unit: "cm", answer: 168,
        say: "Raise the 24 square centimetre base to 7 cm, then find the volume of the box.", ask: "Volume of the box?",
        miss: "One layer 1 cm high is 24 cubic centimetres.", win: "Yes, 24 × 7 = 168 cubic centimetres." },
      /* practice 1: answer in the plan = 20 x 3 = 60, so 60 cu. m */
      { qid: "M3.S5.T10.C45:1", kind: "raise", base: 20, ht: 3, unit: "m", answer: 60,
        say: "Raise a 20 square metre base to 3 m and find the volume of that box.", ask: "Volume of the box?",
        miss: "Every 1 m layer of this box is 20 cubic metres.", win: "Right, 20 × 3 = 60 cubic metres." },
      /* practice 4: answer in the plan = 45 x 3 = 135, so 135 cu. m */
      { qid: "M3.S5.T10.C45:4", kind: "raise", base: 45, ht: 3, unit: "m", answer: 135,
        say: "A box has a 45 square metre base and is 3 m high, so what is its volume?", ask: "What volume?",
        miss: "Stack 3 layers of 45 cubic metres.", win: "Yes, 45 × 3 = 135 cubic metres." },
    ],
  },
  {
    n: 2,
    concept: "A height worked back",
    conceptId: "M3.S5.T10.C46", objectiveIds: ["O17"],
    says: ["What times the base gives the volume?"],
    /* warm-up: a 5 sq. m base tried at 1 m (none of the phase's answers) */
    steps: [
      { say: "Tap plus to try a height of 1 m on this 5 square metre base.", on: "higher", hint: "The plus key turns the dial up." },
      { say: "Tap Check to write the base area times this height.", on: "check", hint: "Tap the Check key under the line." },
    ],
    ladder: ["Use your times tables to find the missing factor.", "Multiply your height back by the base area to check it."],
    closing: "A height is the number that times the base area gives the volume.",
    learned: "You learned: height × base area gives the volume",
    traceback: "The dial raises the solid to the child's height and multiplies it back, then to the right height, ending on base area × height = volume.",
    items: [
      /* learn BP2: answer in the plan = 6 m */
      { qid: "M3.S5.T10.C46:BP2", kind: "dial", base: 34, vol: 204, unit: "m", answer: 6,
        say: "How high is a 204 cubic metre box on a 34 square metre base?", ask: "How high?",
        miss: "Set it up as 34 times a missing number makes 204.", win: "Yes, 34 × 6 = 204, so the box is 6 m high." },
      /* practice 3: answer in the plan = 14 x 4 = 56, so it is 4 cm high */
      { qid: "M3.S5.T10.C46:3", kind: "dial", base: 14, vol: 56, unit: "cm", answer: 4,
        say: "A 56 cubic centimetre box has a 14 square centimetre base, so how tall is it?", ask: "Height of the box?",
        miss: "Say the 14 times table until you reach 56.", win: "Right, 14 × 4 = 56, so the box is 4 cm high." },
      /* practice 5: answer in the plan = 13 x 9 = 117, so it is 9 cm high */
      { qid: "M3.S5.T10.C46:5", kind: "dial", base: 13, vol: 117, unit: "cm", answer: 9,
        say: "How high is a box of 117 cubic centimetres on a base of 13 square centimetres?", ask: "Height of the box?",
        miss: "Count up in 13s until you reach 117.", win: "Yes, 13 × 9 = 117, so it is 9 cm high." },
    ],
  },
  {
    n: 3,
    concept: "Small cubes make a block",
    conceptId: "M3.S5.T10.C47", objectiveIds: ["O18"],
    says: ["Find one cube first. How many cubes make the block?"],
    /* warm-up: 3 cubes of edge 2 cm (none of the phase's answers) */
    steps: [
      { say: "Tap a cube to measure its edge.", on: "cube", hint: "Tap the front wooden cube." },
      { say: "Tap Join to push the 3 cubes into one block.", on: "join", hint: "The Join key pushes the cubes together." },
    ],
    ladder: ["Add one cube's volume once for every cube in the block.", "Multiplying the count by the edge gives a length, not a volume."],
    closing: "A block of equal cubes has the count times one cube's volume.",
    learned: "You learned: a block of equal cubes is count × one cube's volume",
    traceback: "One cube's volume is written, the cubes are joined, then the count × one cube's volume ends on the block's volume.",
    items: [
      /* learn BP3: answer in the plan = 750 cu. cm */
      { qid: "M3.S5.T10.C47:BP3", kind: "join", cnt: 6, edge: 5, nx: 3, ny: 2, answer: 750,
        say: "Join the 6 cubes with 5 cm edges and find the volume of the block.", ask: "Volume of the block?",
        miss: "One 5 cm cube is 5×5×5 cubic centimetres.", win: "Yes, 6 × 125 = 750 cubic centimetres." },
      /* practice 2: answer in the plan = 10 x 8 = 80, so 80 cu. cm */
      { qid: "M3.S5.T10.C47:2", kind: "join", cnt: 10, each: 8, nx: 5, ny: 2, answer: 80,
        say: "Join 10 cubes of 8 cubic centimetres each and give the block's volume.", ask: "Volume of the block?",
        miss: "Multiply 8 cubic centimetres by the number of cubes.", win: "Right, 10 × 8 = 80 cubic centimetres." },
      /* practice 6: answer in the plan = One cube is 3 x 3 x 3 = 27 cu. cm. The block is 4 x 27 = 108 cu. cm */
      { qid: "M3.S5.T10.C47:6", kind: "join", cnt: 4, edge: 3, nx: 2, ny: 2, answer: 108,
        say: "What is the volume of a block of 4 equal cubes with 3 cm edges?", ask: "Volume of the block?",
        miss: "First find the volume of one 3 cm cube.", win: "Yes, 4 × 27 = 108 cubic centimetres." },
    ],
  },
  {
    n: 4,
    concept: "Cubes that really fit",
    conceptId: "M3.S5.T10.C48", objectiveIds: ["O18"],
    says: ["Pack one edge at a time. Is any space left over?"],
    /* warm-up: a 5 x 4 x 2 box with 2 cm cubes (2, 2, 1 fit; none of the phase's answers) */
    steps: [
      { say: "Tap Pack edge to lay 2 cm cubes along the 5 cm edge.", on: "pack", hint: "Tap the Pack edge key." },
      { say: "Tap Pack edge again to fill the 4 cm edge.", on: "pack", hint: "Pack edge lays the next row of cubes." },
      { say: "Tap Pack edge once more to go up the 2 cm edge.", on: "pack", hint: "One more tap packs the last edge." },
    ],
    ladder: ["Multiply the whole cubes along the three edges.", "A division of volumes counts parts of cubes, but only whole cubes go in."],
    closing: "Check each edge, because space left over means fewer cubes fit.",
    learned: "You learned: check each edge; space left over means fewer cubes fit",
    traceback: "The box is packed one edge at a time, the left over space turns rose, and the whole cubes along the edges are multiplied.",
    items: [
      /* learn BP4: answer in the plan = 6 */
      { qid: "M3.S5.T10.C48:BP4", kind: "pack", bx: [9, 6, 4], cube: 3, answer: 6,
        say: "How many 3 cm cubes really fit in a box 9 cm by 6 cm by 4 cm?", ask: "Whole cubes that fit?",
        miss: "How many whole 3 cm cubes fit along the 9 cm edge?", win: "Right, 3 × 2 × 1 = 6 whole cubes fit." },
      /* practice 7: answer in the plan = 5 x 2 x 1 = 10 whole cubes, not the 15 that dividing the volumes gives */
      { qid: "M3.S5.T10.C48:7", kind: "pack", bx: [10, 4, 3], cube: 2, answer: 10,
        say: "Pack 2 cm cubes in a box 10 cm by 4 cm by 3 cm: how many whole ones fit?", ask: "Whole cubes that fit?",
        miss: "How many 2 cm cubes fit along the 3 cm edge?", win: "Correct, 5 × 2 × 1 = 10 cubes, not 15." },
      /* practice 8: answer in the plan = Yes. Along the edges 5, 3 and 2 cubes fit, with nothing left over. So 5 x 3 x 2 = 30 cubes fill it */
      { qid: "M3.S5.T10.C48:8", kind: "pack", bx: [15, 9, 6], cube: 3, answer: "yes",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        say: "Do 3 cm cubes fill a box 15 cm by 9 cm by 6 cm with no space left over?", ask: "Is the box full?",
        miss: "Divide each edge by 3 and look for a remainder.", win: "They fill it: 5 × 3 × 2 = 30 cubes, no gap." },
    ],
  },
];

/* The numbers the working area needs beyond the items (they go into the sidecar too). */
const MODEL: any = {
  warm: {
    1: { base: 10, ht: 2, unit: "cm" },
    2: { base: 5, vol: 15, unit: "m" },
    3: { cnt: 3, edge: 2, nx: 3, ny: 1 },
    4: { bx: [5, 4, 2], cube: 2 },
  },
  free: { bases: [12, 20, 24, 30, 45], maxLayers: 8, unit: "cm" },
  dialMax: 10,
  /* the sidecar's gate note (what locks the corner Answer key until the child has acted; AI mode and toolApi runs are never gated) */
  answerGate: "Phase 1: locked after the child's first real tap until Raise has stacked the box to its full height (7 or 3 layers). Phase 2: ungated (the typed height is the child's own work; the dial and Check are an optional try-it aid; the pencil multiplies back after the answer). Phase 3: locked until Join has pushed the cubes into one block. Phase 4: locked until three Pack edge taps have packed the three edges (question 3, Yes/No: the choice keys likewise). A tap on the locked key or a typed digit shows a nudge naming the live key; the question returns when the act is done. A trusted Enter or tap on a guide step counts as the first touch for question 1.",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route that shares no code with judge or Work: repeated addition, counting up to the volume,
   counting unit cubes one by one, and counting whole-cube places along the box */
const oracle = () => {
  const [p1, p2, p3, p4] = PHASES as any[];
  const ok1 = p1.items.every((it: any) => { let v = 0; for (let l = 0; l < it.ht; l++) v += it.base; return v === it.answer; });
  const ok2 = p2.items.every((it: any) => { let h = 0, v = 0; while (v < it.vol) { h++; v += it.base; } return v === it.vol && h === it.answer; });
  const ok3 = p3.items.every((it: any) => {
    let one = 0;
    if (it.edge) { for (let a = 0; a < it.edge; a++) for (let b = 0; b < it.edge; b++) for (let c = 0; c < it.edge; c++) one++; } else one = it.each;
    let v = 0; for (let k = 0; k < it.cnt; k++) v += one;
    return v === it.answer && it.nx * it.ny === it.cnt;
  });
  const ok4 = p4.items.every((it: any) => {
    const [L, B, H] = it.bx, c = it.cube; let n = 0;
    for (let x = c; x <= L; x += c) for (let y = c; y <= B; y += c) for (let z = c; z <= H; z += c) n++;
    return it.choices ? (n * c * c * c === L * B * H ? "yes" : "no") === it.answer : n === it.answer;
  });
  return ok1 && ok2 && ok3 && ok4;
};
/* the misconception of each phase: base + height; volume x base; count x edge (or one cube's volume as the block's);
   the Divide card's number (trusting the division); "no" on the box that is filled */
const nearMiss = (item: any) => {
  if (item.kind === "raise") return item.base + item.ht;
  if (item.kind === "dial") return item.vol * item.base;
  if (item.kind === "join") return item.edge ? item.cnt * item.edge : item.each;
  if (item.choices) return "no";
  const [L, B, H] = item.bx, c = item.cube;
  return (L * B * H) / (c * c * c);
};
/* a count of cubes is printed as "6 cubes": the box's own "6 cm" and "10 cm" edges are given, not the answer */
const answerForms = (item: any) => (item.kind === "pack"
  ? (item.choices ? ["yes"] : [item.answer + " cubes", words(item.answer) + " cubes"])
  : [String(item.answer), indian(item.answer), words(item.answer)]);
const agentKey = (item: any) => item.answer;

const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* a board, made fresh for every entry into a question (or the warm-up, or free play) */
/* the child's first real touch in this mount (a tap on a key or piece of the board, or a trusted Enter on a guide step, user mode) */
const BP_TOUCH: any = { on: false };
/* user mode (the child's own mount); AI mode and a toolApi run never touch the gate */
const bpUserMode = () => { try { return (window as any).toolApi.getState().mode === "user"; } catch (e) { return false; } };
const bpFresh = (k: string) => ({ k, layers: 0, h: 0, line: "", pc: 0, checks: 0, measured: false, sp: 1.4, joined: false,
  packed: 0, pn: [0, 0, 0], actN: 0, tb: 0, tbL: 0, tbH: 0, tbV: 0, tbRun: false, touched: false, fb: 2 });

/* ── the working area ── composition 880 wide, laid out once and centred in box.w (open: 900 wide) ── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const tw = useTimeline();
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach") && !!(phase.steps && phase.steps.length);
  const kind = free ? "free" : phase.n === 1 ? "raise" : phase.n === 2 ? "dial" : phase.n === 3 ? "join" : "pack";
  const M: any = free ? { base: MODEL.free.bases[2], unit: "cm" } : warm ? MODEL.warm[phase.n] : item;

  /* the board is keyed to the ENTRY, not the question (PATTERNS 18) */
  const qk = free ? "free" : warm ? "w" + phase.n : phase.n + "." + index;
  const ent = useRef({ qk: "", n: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, n: ent.current.n + 1 };
  const key = qk + "#" + ent.current.n;
  const keyRef = useRef(key);
  keyRef.current = key;
  const [raw, setRaw] = useState<any>(() => bpFresh(""));
  const S: any = raw.k === key ? raw : bpFresh(key);
  const put = (f: any) => setRaw((p: any) => {
    if (p.k !== key && keyRef.current !== key) return p;            /* a late callback of an old question: ignore */
    const b = p.k === key ? p : bpFresh(key);
    return { ...b, ...(typeof f === "function" ? f(b) : f) };
  });
  useEffect(() => () => { tl.stop(); tw.stop(); }, [key]);

  const win = !free && (stage === "win" || stage === "idle");
  const CW = free ? 1080 : 880, ox = Math.max(0, Math.round((box.w - CW) / 2));
  const oxA = Math.max(0, Math.round((1472 - CW) / 2));   /* where the picture stands while an act plays: the pad is shut then */
  const RX = free ? 680 : 580, RW = 290, AK = { x: RX + 15, y: 424, w: 260, h: 84 };
  const unit = M && M.unit ? M.unit : "cm";
  const U = (u: string) => tx(u);   /* a unit drawn on the picture: cm, m, sq. cm, sq. m, cu. cm, cu. m (each has its TR entry) */

  /* ── what each phase's act has done ── */
  const target = kind === "free" ? MODEL.free.maxLayers : kind === "raise" ? M.ht : 0;
  const pk = kind === "pack" ? (() => {
    const [L, B, H] = M.bx, c = M.cube;
    return { L, B, H, c, nx: Math.floor(L / c), ny: Math.floor(B / c), nz: Math.floor(H / c) };
  })() : null;
  /* phase 2 is ungated (the typed height is the child's own work; the dial is an optional try-it aid); a correction that has
     drawn the finished board counts as the act, so a miss before the act never leaves the pad locked behind keys that do nothing */
  const childDone = kind === "raise" ? S.layers >= target : kind === "join" ? S.joined : kind === "pack" ? S.packed >= 3 : true;
  const tbDone = S.tb > 0 && kind !== "dial";
  const actDone = childDone || tbDone;

  /* ── geometry ── */
  /* the solid (phases 1 and 2, free play): a fixed footprint, a layer per unit of height */
  const sa = free ? 380 : 270, sb = free ? 210 : 150, Hmax = free ? 196 : 280;
  const maxL = kind === "dial" ? MODEL.dialMax : kind === "free" ? MODEL.free.maxLayers : Math.max(target, 4);
  const lp = Hmax / maxL;
  const so = free ? [316, 210] : [305, 296];   /* the solid fills x 151-539 (40 clear of the column), y 16-506; the ruler and its chip on its left */
  const freeBase = MODEL.free.bases[S.fb % MODEL.free.bases.length];
  const baseA = kind === "free" ? freeBase : M ? M.base : 0;
  const shownL = kind === "raise" ? (win ? target : S.tb >= 1 ? S.tbL : S.layers)
    : kind === "dial" ? (win ? item.answer : S.tb >= 1 ? S.tbH : S.h)
    : kind === "free" ? S.layers : 0;
  const topAt = (l: number) => { const p = bpP(so, sa / 2, sb / 2, Math.max(10, l * lp)); return { x: p[0] + oxA, y: p[1] }; };

  /* the block (phase 3) */
  const jb = kind === "join" ? (() => {
    const nx = M.nx, ny = M.ny, k0 = (nx + ny - 2) * 1.4 + 2;
    const e = Math.min(110, 500 / (k0 * BP_C), 380 / (k0 * 0.5 + 1));
    const sp = S.tb >= 2 || win ? 1 : S.sp, span = (nx + ny - 2) * sp + 2;
    const o = [280 - ((nx - 1) - (ny - 1)) * sp * e * BP_C / 2, 240 - (span * e * 0.5 - e) / 2];
    const cubes: any[] = [];
    for (let gx = 0; gx < nx; gx++) for (let gy = 0; gy < ny; gy++) cubes.push({ gx, gy, x: gx * e * sp, y: gy * (e * sp + (sp > 1.01 ? 14 : 0)) });   /* apart: the rows stand 14 further apart so the back row shows */
    cubes.sort((p, q) => p.gx + p.gy - (q.gx + q.gy));
    const front = cubes[cubes.length - 1];
    const fbb = bpBB([...Object.values(bpPrism(o, front.x, front.y, 0, e, e, e))].flat() as any);
    const ea = bpP(o, front.x, front.y + e, 0), eb = bpP(o, front.x + e, front.y + e, 0);
    const cx = cubes.reduce((s, q) => s + bpP(o, q.x + e / 2, q.y + e / 2, e / 2)[0], 0) / cubes.length;
    const cy = cubes.reduce((s, q) => s + bpP(o, q.x + e / 2, q.y + e / 2, e / 2)[1], 0) / cubes.length;
    return { e, o, cubes, front, fbb, ea, eb, cx, cy };
  })() : null;

  /* the open box (phase 4) */
  const bx = pk ? (() => {
    const { L, B, H } = pk;
    /* the box stands in y 84-504: the lane above it carries the Left over label, clear of every rim */
    const s = Math.min(60, 480 / ((L + B) * BP_C), 420 / ((L + B) * 0.5 + H));
    const o = [300 - (L - B) * s * BP_C / 2, 84 + H * s + (420 - ((L + B) * 0.5 + H) * s) / 2];
    return { s, o };
  })() : null;
  const edgeCubes = (e: number) => {           /* the cubes the e-th Pack edge lays, the corner cube first for edges 1 and 2 */
    if (!pk) return [];
    const { nx, ny, nz, c } = pk, out: any[] = [];
    if (e === 0) for (let i = 0; i < nx; i++) out.push([i * c, 0, 0]);
    if (e === 1) for (let j = 0; j < ny; j++) out.push([0, j * c, 0]);
    if (e === 2) for (let k = 0; k < nz; k++) out.push([0, 0, k * c]);
    return out;
  };
  const cubeAt = (p: number[]) => { const s = bx!.s, q = bpP(bx!.o, (p[0] + pk!.c / 2) * s, (p[1] + pk!.c / 2) * s, (p[2] + pk!.c / 2) * s); return { x: q[0] + oxA, y: q[1] }; };

  /* ── the acts ── every act a child performs goes through api.act (the hand or the pencil), state changes when it resolves */
  const playing = useRef(false);
  const lastKey = useRef(0);
  const pressed = useRef("");
  const kbdAct = useRef("");                     /* the act key whose act was started from the keyboard ("" for a mouse or finger) */
  const kbd = useRef<any>({ id: "", t: 0 });     /* the last Enter/Space on one of this board's keys (a keyboard press) */
  const refocus = (id: string) => setTimeout(() => {
    try { const k: any = document.querySelector('[data-control="' + id + '"]'); if (k && k !== document.activeElement && k.getAttribute("aria-disabled") !== "true") k.focus(); } catch (e) { /* no DOM */ }
  }, 0);
  const nudged = useRef(false);
  const [acting, setActing] = useState(false);
  const doAct = (o: any, done: () => void, fail?: () => void, ctl?: string) => {
    if (playing.current) return false;
    playing.current = true;
    setActing(true);
    api.act(o).then((ok: boolean) => {
      playing.current = false;
      setActing(false);
      if (ok) done(); else if (fail) fail();
      put((b: any) => ({ actN: b.actN + 1 }));     /* re-runs the gate's lock effect after the act layer has restored its own */
      if (nudged.current && stage === "ask" && item) { nudged.current = false; api.say(item.say); }
      if (ctl && kbdAct.current === ctl) setTimeout(() => {                  /* keyboard: the focus goes back to the key that started the act */
        try {
          const a: any = document.activeElement;
          if (!a || a === document.body) { const k: any = document.querySelector('[data-control="' + ctl + '"]'); if (k && k.getAttribute("aria-disabled") !== "true") k.focus(); }
        } catch (e) { /* no DOM focus here */ }
      }, 30);
    });
    return true;
  };
  const raise = () => {
    if (S.layers >= target) { api.did("raise"); return; }
    const pt = topAt(S.layers + 1);
    doAct({ tool: "hand", moves: "push", from: { x: pt.x, y: pt.y + 50 }, at: [pt], to: { x: pt.x, y: pt.y - 36 },
      onPoint: () => put((b: any) => ({ layers: Math.min(target, b.layers + 1) })) },
    () => { api.sfx.settle(); api.did("raise"); }, undefined, "raise");
  };
  const newBase = () => { api.sfx.tick(); put((b: any) => ({ fb: b.fb + 1, layers: 0 })); api.did("newbase"); };
  /* the dial follows the number its window shows (after a correction too); a turn wipes the last written line */
  const hNow = kind === "dial" ? shownL : 0;
  const higher = () => { if (hNow >= MODEL.dialMax) return; api.sfx.tick(); put({ h: Math.min(MODEL.dialMax, hNow + 1), line: "", pc: 0 }); api.did("higher"); };
  const lower = () => { if (hNow <= 0) return; api.sfx.tick(); put({ h: Math.max(0, hNow - 1), line: "", pc: 0 }); api.did("lower"); };
  const LX = RX + RW / 2, LY = 318, LS = 36;
  const checkAct = () => {
    if (hNow <= 0 || playing.current) { api.did("check"); return; }
    const txt = M.base + "×" + hNow + "=" + M.base * hNow, h0 = hNow;
    put({ line: txt, pc: 0, h: hNow });
    doAct({ tool: "pencil", moves: "write", text: txt, at: [{ x: LX + oxA, y: LY }], size: LS, align: "middle",
      onPoint: (j: number) => put({ pc: j + 1 }), color: BPK.ink },
    () => { put((b: any) => ({ pc: txt.length, checks: b.checks + 1 })); void h0; api.did("check"); }, undefined, "check");
  };
  const measure = () => {
    if (!jb || S.measured) { api.did("cube"); return; }
    doAct({ tool: "ruler", moves: "slide", from: { x: jb.ea[0] + oxA, y: jb.ea[1] }, to: { x: jb.eb[0] + oxA, y: jb.eb[1] },
      at: [{ x: jb.ea[0] + oxA, y: jb.ea[1] }, { x: jb.eb[0] + oxA, y: jb.eb[1] }] },
    () => { put({ measured: true }); api.did("cube"); });
  };
  const join = () => {
    if (!jb || S.joined) { api.did("join"); return; }
    const c = { x: jb.cx + oxA, y: jb.cy };
    doAct({ tool: "hand", moves: "push", from: { x: c.x - 170, y: c.y + 10 }, at: [c], to: { x: c.x + 30, y: c.y } },
    () => { put({ joined: true }); tw.run([1.32, 1.24, 1.16, 1.08, 1.0].map((v) => [60, () => put({ sp: v })]),
      () => { put({ sp: 1 }); api.sfx.trade(); api.did("join"); }); }, undefined, "join");
  };
  const pack = () => {
    const e = S.packed;
    if (!pk || e >= 3) { api.did("pack"); return; }
    const pts = edgeCubes(e).map(cubeAt);
    doAct({ tool: "hand", moves: "tap", at: pts,
      onPoint: (i: number) => put((b: any) => { const pn = b.pn.slice(); pn[e] = Math.max(pn[e], i + 1); return { pn }; }) },
    () => { put((b: any) => { const pn = b.pn.slice(); pn[e] = pts.length; return { pn, packed: e + 1 }; }); api.sfx.settle(); api.did("pack"); }, undefined, "pack");
  };
  const ACTS: any = { raise, newbase: newBase, higher, lower, check: checkAct, cube: measure, join, pack };
  const act = (on: any) => { const f = ACTS[String(on)]; if (f) f(); };
  /* a child's own press: a 400 ms guard; in a guide step a press on another control is a wrong act; at a question it is a real touch */
  const press = (name: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    const byKbd = kbd.current.id === name && Date.now() - kbd.current.t < 400;
    kbdAct.current = byKbd ? name : "";
    if (stage === "demo") { if (name !== stepOn) { api.did(name); return; } if (bpUserMode()) BP_TOUCH.on = true; if (byKbd) refocus(name); act(name); return; }
    if (stage === "ask" && (S.tbRun || tl.busy)) return;
    if (stage === "ask" && bpUserMode()) {
      BP_TOUCH.on = true;
      if (!S.touched) put({ touched: true });
      if (kind !== "dial" && !free && !actDone) api.lock(true);
    }
    if (stage === "ask" && kind === "dial" && S.tb > 0) put({ tb: 0, tbV: 0, tbH: shownL });   /* after a miss the dial is the child's again, from the number shown */
    pressed.current = name;
    if (byKbd) refocus(name);
    act(name);
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);

  /* the agent's check(): the act at once, by a state change (AI mode is never gated); Enter then sends the answer */
  const instant = () => {
    if (kind === "raise") return { layers: target };
    if (kind === "dial") return { h: Math.max(1, S.h), checks: 1, line: M.base + "×" + Math.max(1, S.h) + "=" + M.base * Math.max(1, S.h), pc: 99 };
    if (kind === "join") return { joined: true, sp: 1 };
    if (kind === "pack" && pk) return { packed: 3, pn: [pk.nx, pk.ny, pk.nz] };
    return {};
  };
  HOOK.check = stage === "ask" && !free ? () => { if (!actDone) put(instant()); return undefined; } : null;

  /* ── the traceback: redraws the maths in steps and ends on the whole right answer ── */
  useEffect(() => {
    /* misses 1 and 2: the bubble's clue only (miss, then ladder[0]); the correction with the whole answer from the 3rd miss (owner 2026-11-18) */
    if (!wrong || stage !== "ask" || free || !(wrong.tries >= 3)) return;
    const v = leadNumber(wrong.value);
    let steps: any[] = [];
    if (kind === "raise") {
      steps = [[300, () => put({ tb: 1, tbL: 0 })]];
      for (let l = 1; l <= item.ht; l++) steps.push([260, () => put({ tbL: l })]);
      steps.push([700, () => put({ tb: 2 })]);
    } else if (kind === "dial") {
      const trial = Number.isInteger(v) && v >= 1 && v !== item.answer;
      steps = trial ? [[1300, () => put({ tb: 1, tbH: Math.min(v, MODEL.dialMax), tbV: v })]] : [];
      steps.push([900, () => put({ tb: 2, tbH: item.answer })], [700, () => put({ tb: 3 })]);
    } else if (kind === "join") {
      steps = [[800, () => put({ tb: 1 })], [500, () => put({ tb: 2, sp: 1 })], [700, () => put({ tb: 3 })]];
    } else if (kind === "pack") {
      steps = [[600, () => put({ tb: 1 })], [600, () => put({ tb: 2 })], [600, () => put({ tb: 3 })], [700, () => put({ tb: 4 })]];
    }
    put({ tb: 0, tbRun: true });
    tl.run(steps, () => put({ tbRun: false }));
  }, [wrong]);
  const tbEnd = kind === "raise" ? 2 : kind === "dial" ? 3 : kind === "join" ? 3 : 4;
  const showAns = win || (!!wrong && S.tb >= tbEnd);

  /* ── the answer gate: locked only after a real touch while the act is still owed; the traceback holds the pad too ── */
  const touchedNow = S.touched || BP_TOUCH.on;
  const gateOn = stage === "ask" && !free && touchedNow && !actDone;
  const lockOn = gateOn || !!S.tbRun;
  useEffect(() => { api.lock(lockOn); }, [lockOn, key, S.actN]);
  /* a tap on the locked Answer key, or a digit typed while it is locked, gets the nudge (number-free, it names the live key);
     when the act is done the question comes back */
  const nudge = () => {
    nudged.current = true;
    if (kind === "raise") api.say("Tap Raise to build the box first.");
    else if (kind === "join") api.say("Tap Join to build the block first.");
    else if (kind === "pack") api.say("Tap Pack edge to fill each edge first.");
  };
  const live = useRef<any>({});
  live.current = { gateOn, stage, nudge, acting, item, nudged: nudged.current };
  useEffect(() => {
    const onDown = (e: any) => {
      const L = live.current;
      if (!e.isTrusted) return;
      const t = e.target;
      if (t && t.closest && t.closest('[data-control="again"]') && nudged.current && L.stage === "ask" && L.item) { nudged.current = false; setTimeout(() => api.say(L.item.say), 60); return; }
      if (!L.gateOn || L.acting) return;
      if (t && t.closest && t.closest('[data-control="answer-open"],[data-control^="key-"],[data-control^="choice-"]')) L.nudge();
    };
    const onKey = (e: any) => {
      const L = live.current;
      if (!e.isTrusted) return;
      const t = e.target;
      const ctl = t && t.closest ? t.closest("[data-control]") : null, id = ctl ? ctl.getAttribute("data-control") : "";
      const actKey = /^(raise|join|pack|cube|higher|lower|check|newbase)$/.test(id);
      if (actKey && (e.key === "Enter" || e.key === " ")) kbd.current = { id, t: Date.now() };
      if (actKey && /^[0-9]$/.test(e.key) && L.gateOn) refocus(id);
      if ((e.key === "Enter" || e.key === " ") && id === "again" && nudged.current && L.stage === "ask" && L.item) { nudged.current = false; setTimeout(() => api.say(L.item.say), 60); return; }
      if (L.gateOn && !L.acting && (/^[0-9]$/.test(e.key) || (e.key === "Enter" && !/^(raise|join|pack|cube|higher|lower|check|newbase|again|phase-dot)$/.test(id)))) { L.nudge(); return; }
      if (e.key !== "Enter" || L.stage !== "demo") return;
      if (t && t.closest && t.closest('[data-zone="header"],[data-control="again"],[data-control="phase-dot"]')) return;
      if (bpUserMode()) BP_TOUCH.on = true;
    };
    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("keydown", onKey, true);
    return () => { window.removeEventListener("pointerdown", onDown, true); window.removeEventListener("keydown", onKey, true); };
  }, []);
  useEffect(() => { if (childDone && nudged.current && stage === "ask" && item) { nudged.current = false; api.say(item.say); } }, [childDone]);
  useEffect(() => { nudged.current = false; }, [key]);

  /* the win line, one sentence (the phase's last question gives way to its closing line) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage]);
  useEffect(() => {
    if (stage !== "win" || kind !== "dial" || !item) return;
    const txt = item.base + "×" + item.answer + "=" + indian(item.vol);
    put({ line: txt, pc: 0, h: item.answer });
    const full = () => put({ pc: txt.length });
    if (!doAct({ tool: "pencil", moves: "write", text: txt, at: [{ x: LX + oxA, y: LY }], size: LS, align: "middle",
      onPoint: (j: number) => put({ pc: j + 1 }), color: BPK.ink }, full, full)) full();
  }, [stage]);

  api.share({ complete: stage === "idle", layers: S.layers, dial: S.h, checks: S.checks, cubes_joined: S.joined, packed_edges: S.packed });

  /* ── keys ── */
  /* a key's label fits with 12 clear each side (never under 28); while an act plays the keys look busy (a pale veil) but keep the focus */
  const keyOf = (id: string, label: string, x: number, y: number, w: number, h: number, disabled: boolean, size0 = T.label) => {
    const size = Math.max(T.micro, Math.min(size0, Math.floor((w - 24) / (Math.max(1, String(label).length) * 0.6))));
    return (
      <g key={"k" + id + x}>
        <Key id={id} label={label} x={x} y={y} w={w} h={h} C={C} tone="key" disabled={disabled} onClick={() => press(id)}>
          <text y={size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={disabled ? tint(C.ink, 0.35) : toneInk("key", C.ink)}>{label}</text>
        </Key>
        {acting && !disabled ? <rect x={x} y={y} width={w} height={h + 5} rx={RAD.key} fill="#FFFFFF" fillOpacity={0.5} pointerEvents="none" /> : null}
      </g>
    );
  };
  const busyTb = !!S.tbRun || win || tbDone;
  const inviteOn = stage === "demo" ? stepOn
    : stage === "ask" && !actDone && !S.tbRun ? (kind === "raise" ? "raise" : kind === "join" ? "join" : kind === "pack" ? "pack" : null)
    : null;
  const inv = (x: number, y: number, w: number, h: number) => <Invite x={x + w / 2} y={y + h / 2} w={w} h={h} C={C} />;
  const DK = { lo: { x: RX, y: 148, w: 72, h: 84 }, win: { x: RX + 84, y: 148, w: 122, h: 84 }, hi: { x: RX + 218, y: 148, w: 72, h: 84 } };

  /* ── pictures ── */
  const solidPic = () => {
    const nL = Math.max(0, shownL), hs = nL > 0 ? nL * lp : 10;
    const top = bpP(so, sa / 2, sb / 2, hs), ra = bpP(so, 0, sb, 0), rx = ra[0] - 24;
    /* the base label sits under the solid, left of its front-left bottom edge, 14 clear of it, with a short leader to that edge */
    const bt = baseA + " " + U("sq. " + unit), bf = bpChipFit(bt, T.prompt, 290);
    const by = Math.min(box.h - 10 - bf.h / 2, ra[1] + 104), fr = bpP(so, sa, sb, 0);
    const edgeX = (y: number) => ra[0] + (y - ra[1]) * (fr[0] - ra[0]) / (fr[1] - ra[1]);
    const bxr = Math.min(edgeX(by - bf.h / 2) - 14, 6 + bf.w), bcx = bxr - bf.w / 2;
    const mid = [(ra[0] + fr[0]) / 2, (ra[1] + fr[1]) / 2];
    const ticks = kind === "raise" ? target : maxL, tk: any[] = [];
    for (let l = 0; l <= ticks; l++) tk.push(<line key={l} x1={rx - (l % 5 === 0 ? 12 : 8)} y1={ra[1] - l * lp} x2={rx} y2={ra[1] - l * lp} stroke={BPK.ink} strokeWidth={2.5} strokeLinecap="round" />);
    const tgtY = ra[1] - target * lp;
    return (
      <g>
        {/* Soft shadow under the base footprint */}
        <ellipse cx={so[0] + (sa - sb) * BP_C / 2} cy={so[1] + (sa + sb) * 0.25} rx={sa * 0.58} ry={sb * 0.32} fill="#000000" fillOpacity={0.08} />
        {/* Height ruler scale bar */}
        {kind !== "free" ? <line x1={rx} y1={ra[1]} x2={rx} y2={ra[1] - ticks * lp} stroke={BPK.ink} strokeWidth={3} strokeLinecap="round" /> : null}
        {kind !== "free" ? tk : null}
        {kind === "raise" ? <line x1={rx + 6} y1={tgtY} x2={bpP(so, 0, sb, target * lp)[0]} y2={tgtY} stroke={BPK.blue} strokeWidth={3} strokeDasharray="10 8" strokeLinecap="round" /> : null}
        {kind === "raise" ? bpChip("tgt", rx - 24, tgtY, M.ht + " " + U(unit), BPK.blue, T.label, "end", rx - 27) : null}
        {bpSolid("bps", so, sa, sb, hs, nL, lp)}
        <line x1={bxr - 18} y1={by - bf.h / 2} x2={mid[0]} y2={mid[1]} stroke={BPK.blue} strokeWidth={3} strokeDasharray="6 6" strokeLinecap="round" />
        {bpChip("base", bcx, by, bt, BPK.blue, T.prompt, "middle", 290)}
      </g>
    );
  };
  const blockPic = () => {
    if (!jb) return null;
    const { e, o, cubes, front, ea, eb } = jb;
    const lit = !win && S.tb >= 1 && !!wrong;
    const showEdge = M.edge && (!warm || S.measured);
    const mx = (ea[0] + eb[0]) / 2, my = (ea[1] + eb[1]) / 2;
    return (
      <g>
        {/* Soft ground shadow under block */}
        {(() => {   /* a contact shadow inside the block's own footprint on the table */
          const mx = Math.max(...cubes.map((q: any) => q.x)) + e, my = Math.max(...cubes.map((q: any) => q.y)) + e;
          return <polygon points={bpS([bpP(o, 4, 4, 0), bpP(o, mx - 2, 4, 0), bpP(o, mx - 2, my - 2, 0), bpP(o, 4, my - 2, 0)])} fill="#000000" fillOpacity={0.1} />;
        })()}
        {cubes.map((q: any, i: number) => bpCube("bc" + i, o, q.x, q.y, 0, e, cubes.length <= 40, lit && q === front ? BPK.amber : undefined, 0.35))}
        {showEdge ? <line x1={ea[0]} y1={ea[1]} x2={eb[0]} y2={eb[1]} stroke={BPK.blue} strokeWidth={7} strokeLinecap="round" /> : null}
        {showEdge ? bpChip("edge", mx - 48, my + 56, M.edge + " " + U("cm"), BPK.blue, T.label) : null}
      </g>
    );
  };
  const boxPic = () => {
    if (!pk || !bx) return null;
    const { L, B, H, c, nx, ny, nz } = pk, { s, o } = bx;
    const edgesShown = win ? 3 : Math.max(S.packed, wrong ? Math.min(S.tb, 3) : 0);
    const list: any[] = [];
    const full = win || (!!wrong && S.tb >= 4);
    if (full) { for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) for (let k = 0; k < nz; k++) list.push([i * c, j * c, k * c]); }
    else {
      const cnt = (e: number) => (edgesShown > e ? edgeCubes(e).length : S.pn[e]);
      for (let i = 0; i < cnt(0); i++) list.push([i * c, 0, 0]);
      for (let j = 1; j < cnt(1); j++) list.push([0, j * c, 0]);
      for (let k = 1; k < cnt(2); k++) list.push([0, 0, k * c]);
      if (cnt(1) > 0 && cnt(0) === 0) list.push([0, 0, 0]);
    }
    const uniq = list.filter((p, i) => list.findIndex((q) => q[0] === p[0] && q[1] === p[1] && q[2] === p[2]) === i);
    uniq.sort((p, q) => p[0] + p[1] + p[2] - (q[0] + q[1] + q[2]));
    const skins = uniq.length <= 37;
    const rL = L - nx * c, rB = B - ny * c, rH = H - nz * c;
    const roses: any[] = [], roseTop: any[] = [];
    const rose = (id: string, x: number, y: number, z: number, w: number, d: number, h: number, op?: number) => {
      roses.push(bpRose(id, o, x, y, z, w, d, h, op)); roseTop.push(bpP(o, x + w / 2, y + d / 2, z + h / 2));
    };
    if (full) {
      if (rL > 0) rose("rl", nx * c * s, 0, 0, rL * s, B * s, H * s, 0.36);
      if (rB > 0) rose("rb", 0, ny * c * s, 0, nx * c * s, rB * s, H * s, 0.36);
      if (rH > 0) rose("rh", 0, 0, nz * c * s, nx * c * s, ny * c * s, rH * s, 0.36);
    } else {
      if (edgesShown > 0 && rL > 0) rose("rl", nx * c * s, 0, 0, rL * s, c * s, c * s);
      if (edgesShown > 1 && rB > 0) rose("rb", 0, ny * c * s, 0, c * s, rB * s, c * s);
      if (edgesShown > 2 && rH > 0) rose("rh", 0, 0, nz * c * s, c * s, c * s, rH * s);
    }
    /* where the Left over label goes: on the first rose region drawn */
    const roseAt = roseTop.length ? roseTop[0] : null;
    const nextEdge = !win && stage !== "free" && S.packed < 3 && !(wrong && S.tb >= 1) ? S.packed : -1;
    const eL = [bpP(o, 0, B * s, 0), bpP(o, L * s, B * s, 0)], eB = [bpP(o, L * s, 0, 0), bpP(o, L * s, B * s, 0)], eH = [bpP(o, L * s, B * s, 0), bpP(o, L * s, B * s, H * s)], hLab = bpP(o, L * s, B * s, H * s * 0.8);
    /* the row about to be packed: an amber strip on its own footprint (the far floor edges and the back corner), where the cubes go */
    const strip = (k: number) => {
      if (nextEdge !== k) return null;
      const w = c * s;
      const pts = k === 0 ? [bpP(o, 0, 0, 0), bpP(o, L * s, 0, 0), bpP(o, L * s, w, 0), bpP(o, 0, w, 0)]
        : k === 1 ? [bpP(o, 0, 0, 0), bpP(o, w, 0, 0), bpP(o, w, B * s, 0), bpP(o, 0, B * s, 0)]
        : [bpP(o, 0, 0, 0), bpP(o, 0, w, 0), bpP(o, 0, w, H * s), bpP(o, 0, 0, H * s)];
      return <polygon key={"ne" + k} points={bpS(pts)} fill={BPK.amber} fillOpacity={0.8} stroke={shade(BPK.amber, 0.2)} strokeWidth={2.4} strokeLinejoin="round" />;
    };
    const mid = (pts: number[][]) => [(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2];
    const mL = mid(eL), mB = mid(eB), mH = hLab;
    return (
      <g>
        {/* Soft shadow under open box */}
        <ellipse cx={o[0] + (L - B) * s * BP_C / 2} cy={o[1] + (L + B) * s * 0.25} rx={(L + B) * s * 0.45} ry={(L + B) * s * 0.24} fill="#000000" fillOpacity={0.08} />
        {bpBoxBack("bpb", o, L * s, B * s, H * s)}
        {strip(0)}{strip(1)}{strip(2)}
        {uniq.map((p, i) => bpCube("pc" + i, o, p[0] * s, p[1] * s, p[2] * s, c * s, skins, skins ? undefined : BPK.violet, 0.25))}
        {roses}
        {bpBoxFront(o, L * s, B * s, H * s)}
        {roseAt ? (() => {
          /* the Left over pill stands in the lane above the box (every rim, wall and cube is below y 84), over the left-over space
             as near as the lane allows, with a dashed leader down to it */
          const f = bpChipFit(tx("Left over"), T.label), cxl = Math.max(f.w / 2 + 6, Math.min(540 - f.w / 2, roseAt[0])), best = { cx: cxl, cy: 40 };
          const ex = Math.max(best.cx - f.w / 2 + 16, Math.min(best.cx + f.w / 2 - 16, roseAt[0])), ey = best.cy + f.h / 2;
          return <g>
            <line x1={ex} y1={ey} x2={roseAt[0]} y2={roseAt[1]} stroke={shade(BPK.rose, 0.2)} strokeWidth={3} strokeDasharray="6 6" strokeLinecap="round" />
            {bpChip("left", best.cx, best.cy, tx("Left over"), BPK.rose, T.label)}
          </g>;
        })() : null}
        {bpChip("eL", mL[0] - 84, mL[1] + 48, L + " " + U("cm"), BPK.blue, T.label)}
        {bpChip("eB", mB[0] + 30, mB[1] + 38, B + " " + U("cm"), BPK.blue, T.label)}
        {bpChip("eH", mH[0] - 18, mH[1], H + " " + U("cm"), BPK.blue, T.label, "end")}
      </g>
    );
  };

  /* ── the right-hand column: given cards, the dial, the working line, the act keys ── */
  const column = () => {
    if (kind === "free") {
      return (
        <g>
          {bpCard("fc", lang === "en" ? RX : RX - 40, 0, lang === "en" ? RW : RW + 40, [{ t: tx("Base") + " " + baseA + " " + U("sq. cm"), col: BPK.blue }, { t: tx("Height") + " " + S.layers + " " + U("cm") }, { t: baseA + "×" + S.layers + "=" + baseA * S.layers }], C.rule)}
          {keyOf("raise", tx("Raise"), RX, AK.y, 118, AK.h, S.layers >= target)}
          {keyOf("newbase", tx("New base"), RX + 128, AK.y, 162, AK.h, false)}
        </g>
      );
    }
    if (kind === "raise") {
      const eq = M.base + "×" + M.ht + "=" + M.base * M.ht;
      return (
        <g>
          {bpCard("given", lang === "en" ? RX : RX - 60, 0, lang === "en" ? RW : RW + 60, [{ t: tx("Base") + " " + M.base + " " + U("sq. " + unit), col: BPK.blue }, { t: tx("Height") + " " + M.ht + " " + U(unit), col: BPK.blue }], BPK.blue)}
          {showAns ? <g pointerEvents="none">
            <text x={RX + RW / 2} y={250} dominantBaseline="central" textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={BPK.ink}>{eq}</text>
            {bpChip("ans", RX + RW / 2, 316, M.base * M.ht + " " + U("cu. " + unit), BPK.green, T.prompt)}
          </g> : null}
          {keyOf("raise", tx("Raise"), AK.x, AK.y, AK.w, AK.h, S.layers >= target || busyTb)}
          {inviteOn === "raise" ? inv(AK.x, AK.y, AK.w, AK.h) : null}
        </g>
      );
    }
    if (kind === "dial") {
      const hShown: any = !win && wrong && S.tb === 1 && S.tbV > MODEL.dialMax ? "" : shownL;
      const lit = !!wrong && S.tb >= 1 && !win;
      const trialEq = S.tbV && String(S.tbV).length <= 4 ? M.base + "×" + indian(S.tbV) + "=" + indian(M.base * S.tbV) : "";
      const rightEq = item ? item.base + "×" + item.answer + "=" + indian(item.vol) : "";
      const printed = !win && wrong && S.tb >= 2 ? rightEq : !win && wrong && S.tb === 1 ? trialEq : "";
      const pfs = Math.max(T.micro, Math.min(LS, Math.floor(RW / (Math.max(1, printed.length) * 0.62))));
      return (
        <g>
          {bpCard("vol", RX, 0, RW, [{ t: tx("Volume"), size: T.label }, { t: M.vol + " " + U("cu. " + unit), col: BPK.blue, size: T.prompt }], lit ? BPK.amber : BPK.blue)}
          {keyOf("lower", "−", DK.lo.x, DK.lo.y, DK.lo.w, DK.lo.h, hNow <= 0 || busyTb, T.xl)}
          <rect x={DK.win.x + 2} y={DK.win.y + 3} width={DK.win.w} height={DK.win.h} rx={RAD.key} fill="#000000" fillOpacity={0.12} />
          <rect x={DK.win.x} y={DK.win.y} width={DK.win.w} height={DK.win.h} rx={RAD.key} fill={BPK.paper} stroke={BPK.ink} strokeWidth={3} />
          <text x={DK.win.x + DK.win.w / 2} y={DK.win.y + DK.win.h / 2} dominantBaseline="central" textAnchor="middle" fontSize={Math.max(T.micro, Math.min(T.prompt, Math.floor((DK.win.w - 30) / bpEm(hShown + " " + U(unit)))))} fontWeight={700} fill={BPK.ink}>{hShown === "" ? "" : hShown + " " + U(unit)}</text>
          {keyOf("higher", "+", DK.hi.x, DK.hi.y, DK.hi.w, DK.hi.h, hNow >= MODEL.dialMax || busyTb, T.xl)}
          <line x1={RX} y1={LY + 14} x2={RX + RW} y2={LY + 14} stroke={C.rule} strokeWidth={2.5} strokeLinecap="round" />
          {printed ? <text x={LX} y={LY} textAnchor="middle" fontSize={pfs} fontWeight={700} fill={BPK.ink} pointerEvents="none">{printed}</text>
            : S.line ? <PencilText text={S.line} x={LX} y={LY} size={LS} align="middle" chars={S.pc} color={BPK.ink} width={4.6} /> : null}
          {showAns ? <g pointerEvents="none">{bpChip("ans", RX + RW / 2, 380, item.answer + " " + U(unit), BPK.green, T.prompt)}</g> : null}
          {keyOf("check", tx("Check"), AK.x, AK.y, AK.w, AK.h, hNow <= 0 || busyTb)}
          {inviteOn === "higher" ? inv(DK.hi.x, DK.hi.y, DK.hi.w, DK.hi.h) : null}
          {inviteOn === "check" ? inv(AK.x, AK.y, AK.w, AK.h) : null}
        </g>
      );
    }
    if (kind === "join") {
      const one = M.edge ? M.edge * M.edge * M.edge : M.each;
      const l1 = M.edge ? M.edge + "×" + M.edge + "×" + M.edge + "=" + one : "";
      const l2 = M.cnt + "×" + one + "=" + M.cnt * one;
      const show1 = win || (wrong && S.tb >= 1), show2 = showAns;
      return (
        <g>
          {bpCard("given", RX, 0, RW, [{ t: M.cnt + " " + tx("cubes"), col: BPK.blue }, M.edge ? { t: tx("Edge") + " " + M.edge + " " + U("cm"), col: BPK.blue } : { t: tx("Each") + " " + M.each + " " + U("cu. cm"), col: BPK.blue }], BPK.blue)}
          {show1 && l1 ? <text x={RX + RW / 2} y={226} dominantBaseline="central" textAnchor="middle" fontSize={LS} fontWeight={700} fill={BPK.ink} pointerEvents="none">{l1}</text> : null}
          {show2 ? <g pointerEvents="none">
            <text x={RX + RW / 2} y={290} dominantBaseline="central" textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={BPK.ink}>{l2}</text>
            {bpChip("ans", RX + RW / 2, 360, M.cnt * one + " " + U("cu. cm"), BPK.green, T.prompt)}
          </g> : null}
          {keyOf("join", tx("Join"), AK.x, AK.y, AK.w, AK.h, S.joined || busyTb)}
          {inviteOn === "join" ? inv(AK.x, AK.y, AK.w, AK.h) : null}
          {stage === "demo" && jb ? <Hit id="cube" x={jb.fbb.x} y={jb.fbb.y} w={Math.max(72, jb.fbb.w)} h={Math.max(72, jb.fbb.h)} onPress={() => press("cube")} label={tx("cube")} /> : null}
          {inviteOn === "cube" && jb ? (() => {   /* the invite hugs the front cube's own outline (a hexagon), never a box that takes in its neighbour */
            const { o, e, front: q } = jb, hx = [bpP(o, q.x, q.y, e), bpP(o, q.x + e, q.y, e), bpP(o, q.x + e, q.y, 0), bpP(o, q.x + e, q.y + e, 0), bpP(o, q.x, q.y + e, 0), bpP(o, q.x, q.y + e, e)];
            const cx = hx.reduce((a2: number, p2: any) => a2 + p2[0], 0) / 6, cy = hx.reduce((a2: number, p2: any) => a2 + p2[1], 0) / 6;
            const ring = hx.map((p2: any) => { const dx = p2[0] - cx, dy = p2[1] - cy, d = Math.hypot(dx, dy) || 1; return [p2[0] + dx / d * 7, p2[1] + dy / d * 7]; });
            return <polygon className="c4-pulse" points={bpS(ring)} fill="none" stroke={(typeof THEME !== "undefined" && THEME && THEME.enter && THEME.enter[1]) || C.accent} strokeWidth={5} strokeLinejoin="round" pointerEvents="none" />;
          })() : null}
        </g>
      );
    }
    if (kind === "pack" && pk) {
      const { L, B, H, c, nx, ny, nz } = pk, bv = L * B * H, cv = c * c * c;
      const edgesShown = win ? 3 : Math.max(S.packed, wrong ? Math.min(S.tb, 3) : 0);
      const row = (len: number, nn: number, k: number) => ({ t: len + " " + U("cm") + ": " + (edgesShown > k ? nn + " " + tx("fit") : "?"), col: !win && edgesShown === k && !(wrong && S.tb >= 1) ? BPK.amber : BPK.ink });
      const count = nx * ny * nz;
      return (
        <g>
          {bpCard("div", RX, 0, RW, [{ t: tx("Box") + " " + bv + " " + U("cu. cm") }, { t: tx("Cube") + " " + cv + " " + U("cu. cm") }, { t: bv + "÷" + cv + "=" + bv / cv }], C.rule, T.label)}
          {bpCard("packed", RX, 168, RW, [row(L, nx, 0), row(B, ny, 1), row(H, nz, 2)], C.rule, T.label)}
          {showAns ? <g pointerEvents="none">
            <text x={RX + RW / 2} y={M.choices ? 366 : 398} dominantBaseline="central" textAnchor="middle" fontSize={LS} fontWeight={700} fill={shade(BPK.green, 0.25)}>{nx + "×" + ny + "×" + nz + "=" + count}</text>
            {M.choices ? bpChip("yes", RX + RW / 2, 436, tx("Yes, no gap"), BPK.green, T.label, "middle", RW) : null}
          </g> : null}
          {S.packed >= 3 || busyTb ? null : keyOf("pack", tx("Pack edge"), AK.x, AK.y, AK.w, AK.h, false)}
          {inviteOn === "pack" ? inv(AK.x, AK.y, AK.w, AK.h) : null}
        </g>
      );
    }
    return null;
  };

  return (
    <g transform={`translate(${ox},0)`}>
      {kind === "raise" || kind === "dial" || kind === "free" ? solidPic() : null}
      {kind === "join" ? blockPic() : null}
      {kind === "pack" ? boxPic() : null}
      {column()}
    </g>
  );
}

/* the summary page's small drawing: a little cube and the child's own last right answer (digits only, so no language
   carries English), or a tick for the box that is filled */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  const item: any = it || {}, k = item.kind || "join", id = "th" + String(item.qid || k).replace(/[^A-Za-z0-9]/g, "");
  const yes = String(v).toLowerCase() === "yes", e = Math.min(30, h * 0.26);
  const pic = () => {
    /* each row draws ITS question: the solid raised to its own height, the block of its own cubes, the box filled with every whole cube */
    if (k === "raise" || k === "dial") {
      const n = Math.max(1, k === "raise" ? item.ht || 1 : leadNumber(v) || item.answer || 1), a = 50, b = 32, hs = Math.max(14, h - 12 - (a + b) * 0.5);
      return bpSolid(id, [64, 6 + hs], a, b, hs, n, hs / n);
    }
    if (k === "join") {
      const nx = item.nx || 3, ny = item.ny || 1, ee = Math.min(24, (h - 10) / ((nx + ny) * 0.5 + 1), 120 / ((nx + ny) * BP_C)), cs: any[] = [];
      for (let gx = 0; gx < nx; gx++) for (let gy = 0; gy < ny; gy++) cs.push([gx, gy]);
      cs.sort((p, q) => p[0] + p[1] - (q[0] + q[1]));
      const o = [16 + ny * ee * BP_C, 5 + ee];
      return <g>{cs.map((q, i) => bpCube(id + i, o, q[0] * ee, q[1] * ee, 0, ee, false))}</g>;
    }
    const [L, B, H] = item.bx || [6, 4, 2], c = item.cube || 2, nx = Math.floor(L / c), ny = Math.floor(B / c), nz = Math.floor(H / c);
    const sc = Math.min(120 / ((L + B) * BP_C), (h - 10) / ((L + B) * 0.5 + H)), o = [12 + B * sc * BP_C, 5 + H * sc], cs: any[] = [];
    for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) for (let q = 0; q < nz; q++) cs.push([i * c, j * c, q * c]);
    cs.sort((p, q) => p[0] + p[1] + p[2] - (q[0] + q[1] + q[2]));
    return <g>{bpBoxBack(id, o, L * sc, B * sc, H * sc)}{cs.map((q, i) => bpCube(id + "c" + i, o, q[0] * sc, q[1] * sc, q[2] * sc, c * sc, false))}{bpBoxFront(o, L * sc, B * sc, H * sc)}</g>;
  };
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {pic()}
      {yes ? <path d={`M ${w - 70} ${h / 2} l 16 16 l 30 -32`} fill="none" stroke={shade(BPK.green, 0.25)} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        : <text x={w - 16} y={h / 2 + 1} dominantBaseline="central" textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(leadNumber(v))}</text>}
    </g>
  );
}

function BoxPacker(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default BoxPacker;
