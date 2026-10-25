/* ═══ M1.S2.T3.C12.2D1 · sort_and_compare · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "sort_and_compare";
const MEDIA_ID = "M1.S2.T3.C12.2D1";
const TOOL_NAME = "Sort and Compare";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["Some fraction cards, and a real thing beside each one."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You told the kinds apart by reading the top and bottom numbers.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play: tap the cards into the bin and back as you like.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "Can two numbers on a card tell you how much pizza you get?";
function StartArt({ box, C }: any) {
  const cy = box.h / 2;
  return (
    <g>
      {scDisc("pizza", 220, cy, 150, 4, 1, C)}
      {scBar(400, cy - 62, 466, 124, 5, 2, C)}
      {scDisc("roti", 1040, cy, 150, 8, 3, C)}
    </g>
  );
}

/* ── the objects (owner: pizza, chocolate bar and roti ONLY; 3 skins) ─────────────────────────────
   A card is [object, top, bottom]. The parts a fraction counts are deep blue; on the dark bar every other part wears a
   pale cream wash (the owner's must-fix: deep blue on chocolate is 1.4:1). Wholes shown side by side are one size. */
const SC_BLUE = "#0B4F8A", SC_CREAM = "#FFF3D6", SC_LIT = "#FFD98A", SC_AMBER = "#B87400", SC_VERM = "#D55E00", SC_VINK = "#A84A00", SC_GREEN = "#00876A";
const SC_PLAIN: any = { pizza: "#E9B44C", roti: "#E6C58C", bar: "#6B3E26" };
const SC_BAR_AR = 3.77;   /* the bar skin's own aspect: never stretched */
const scPol = (cx: number, cy: number, r: number, deg: number) => [cx + r * Math.sin((deg * Math.PI) / 180), cy - r * Math.cos((deg * Math.PI) / 180)];
const scWedge = (cx: number, cy: number, r: number, a: number, w: number) => {
  const [x1, y1] = scPol(cx, cy, r, a), [x2, y2] = scPol(cx, cy, r, a + w);
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${w > 180 ? 1 : 0} 1 ${x2} ${y2} Z`;
};
/* a round whole cut from the centre into equal wedges, the first `taken` deep blue (PATTERNS §17) */
function scDisc(o: string, cx: number, cy: number, r: number, parts: number, taken: number, C: any) {
  const id = "scd" + Math.round(cx) + "_" + Math.round(cy) + "_" + Math.round(r), w = 360 / parts;
  return (
    <g key={id}>
      <defs><clipPath id={id}><circle cx={cx} cy={cy} r={r} /></clipPath></defs>
      <circle cx={cx} cy={cy + 3} r={r} fill="#000000" fillOpacity={0.08} />
      <circle cx={cx} cy={cy} r={r} fill={SC_PLAIN[o]} />
      <Skin name={o} x={cx - r} y={cy - r} w={2 * r} h={2 * r} clip={`url(#${id})`} />
      {/* taken: a blue HUE over the picture (its toppings and texture stay), a little deeper blue, and a blue rim */}
      {Array.from({ length: taken }).map((_, i) => { const d = scWedge(cx, cy, r, i * w, w); return (
        <g key={"t" + i}>
          <path d={d} fill={SC_BLUE} fillOpacity={0.9} style={{ mixBlendMode: "color" } as any} />
          <path d={d} fill={SC_HUE} fillOpacity={0.3} />
          <path d={d} fill="none" stroke={SC_RIM} strokeWidth={4} strokeLinejoin="round" />
        </g>); })}
      {Array.from({ length: parts }).map((_, i) => { const [x, y] = scPol(cx, cy, r, i * w); return <line key={"l" + i} x1={cx} y1={cy} x2={x} y2={y} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />; })}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.ink} strokeWidth={3.5} />
    </g>
  );
}
/* a chocolate bar cut into equal pieces, each piece the chocolate tile stretched to its own box (PATTERNS §14 tile: the bevel
   and gloss on every piece). Taken: the chocolate keeps its light and texture under a BLUE HUE (blend "color") with a blue rim;
   the rest: a cream wash over the chocolate; thin dark cut lines between pieces. */
const SC_RIM = "#4A90E2", SC_HUE = "#0559EE", SC_CREAM2 = "#FFF6E0", SC_BROWN = "#4A2A17";
/* the foil end, as a share of the counted bar, and the box a bar with its foil fills (the counted part keeps the skin's 3.77:1) */
const SC_FOIL = 0.15, SC_BAR_BOX = 3.77 * (1 + 0.15);
function scBar(x: number, y: number, w: number, h: number, parts: number, taken: number, C: any) {
  /* the counted bar is w / (1 + SC_FOIL); the rest is the silver foil folded back over its right end, outside every part */
  const bw = w / (1 + SC_FOIL), fl = w - bw, cw = bw / parts, rx = Math.min(12, h * 0.18), e = Math.max(3, h * 0.07);
  const id = "scb" + Math.round(x) + "_" + Math.round(y) + "_" + Math.round(w);
  const skinned = parts > 0 && parts <= 40;
  const fx = x + bw + 3, teeth = 7, zig = Array.from({ length: teeth + 1 }).map((_, k) => (fx + (k % 2 ? 6 : 0)) + " " + (y - 5 + ((h + 10) * k) / teeth)).join(" L ");
  return (
    <g>
      <defs>
        <clipPath id={id}><rect x={x} y={y} width={bw} height={h} rx={rx} /></clipPath>
        <linearGradient id={id + "f"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5F6F8" /><stop offset="0.4" stopColor="#B4B9C1" /><stop offset="0.65" stopColor="#E6E8EC" /><stop offset="1" stopColor="#979DA6" />
        </linearGradient>
      </defs>
      <rect x={x} y={y + 3} width={w} height={h} rx={rx} fill="#000000" fillOpacity={0.08} />
      <g clipPath={`url(#${id})`}>
      {Array.from({ length: parts }).map((_, i) => (
        <g key={"c" + i}>
          <rect x={x + i * cw} y={y} width={cw} height={h} fill={SC_PLAIN.bar} />
          {skinned && <Skin name="bar" x={x + i * cw} y={y} w={cw} h={h} fit="stretch" />}
          {i < taken
            ? <g><rect x={x + i * cw} y={y} width={cw} height={h} fill={SC_BLUE} fillOpacity={0.9} style={{ mixBlendMode: "color" } as any} />
                <rect x={x + i * cw} y={y} width={cw} height={h} fill={SC_HUE} fillOpacity={0.6} />
                <rect x={x + i * cw + 3} y={y + 3} width={cw - 6} height={h - 6} rx={3} fill="none" stroke={SC_RIM} strokeWidth={4} /></g>
            : <rect x={x + i * cw} y={y} width={cw} height={h} fill={SC_CREAM2} fillOpacity={0.78} />}
          {/* each piece's bevel: light along the top, chocolate brown along the bottom and the right */}
          <rect x={x + i * cw + 2} y={y + 2} width={cw - 4} height={e} fill="#FFFFFF" fillOpacity={0.35} />
          <rect x={x + i * cw + 2} y={y + h - e - 2} width={cw - 4} height={e} fill={SC_BROWN} fillOpacity={0.55} />
          <rect x={x + (i + 1) * cw - e - 2} y={y + 2} width={e} height={h - 4} fill={SC_BROWN} fillOpacity={0.45} />
        </g>
      ))}
      </g>
      {Array.from({ length: parts - 1 }).map((_, i) => <line key={"l" + i} x1={x + (i + 1) * cw} y1={y} x2={x + (i + 1) * cw} y2={y + h} stroke={C.ink} strokeWidth={2.5} />)}
      {/* a glossy highlight along the bar, and its thin dark-brown frame */}
      <line x1={x + rx} y1={y + h * 0.17} x2={x + bw - rx} y2={y + h * 0.17} stroke="#FFFFFF" strokeOpacity={0.45} strokeWidth={Math.max(2, h * 0.035)} strokeLinecap="round" />
      <rect x={x} y={y} width={bw} height={h} rx={rx} fill="none" stroke={SC_BROWN} strokeWidth={4} />
      {/* the crinkled silver foil, folded back over the right end: never a part */}
      <path d={`M ${zig} L ${x + w - 6} ${y + h + 5} Q ${x + w} ${y + h + 5} ${x + w} ${y + h - 4} L ${x + w} ${y + 4 - 5} Q ${x + w} ${y - 5} ${x + w - 6} ${y - 5} Z`}
        fill={`url(#${id}f)`} stroke="#80868F" strokeWidth={2} strokeLinejoin="round" />
      {[0.3, 0.55, 0.8].map((f, k) => <line key={"fd" + k} x1={fx + 8 + (fl - 14) * f - 6} y1={y - 2} x2={fx + 8 + (fl - 14) * f + 6} y2={y + h + 2} stroke={k % 2 ? "#FFFFFF" : "#8A9099"} strokeOpacity={0.8} strokeWidth={2} />)}
    </g>
  );
}
/* the gap from the fraction bar to a digit's centre: the amber box stands 8 clear of the bar (a small thumbnail keeps 0.18) */
const scG = (fs: number) => (fs >= 40 ? Math.max(fs * 0.18, fs * 0.08 + 13) : fs * 0.18);
/* a stacked fraction centred on (cx, cy = the bar line); lit: "t", "b" or "tb" lights those numbers amber; dimTop fades the top
   number to about half strength (still 3.6:1, large text) */
const SC_DIM = "#86857F";
function scFrac(cx: number, cy: number, t: number, b: number, fs: number, C: any, lit = "", dimTop = false) {
  const dw = (s: string) => s.length * fs * 0.6, g = scG(fs);
  const nb = cy - g - fs * 0.42, db = cy + g + fs * 0.42;
  const lw = Math.max(dw(String(t)), dw(String(b))) + fs * 0.35;
  const glow = (s: string, cyPos: number) => (
    <rect
      x={cx - dw(s) / 2 - 12}
      y={cyPos - fs * 0.45 - 4}
      width={dw(s) + 24}
      height={fs * 0.9 + 8}
      rx={10}
      fill={SC_LIT}
      stroke={SC_AMBER}
      strokeWidth={3}
    />
  );
  return (
    <g>
      {lit.includes("t") && glow(String(t), nb)}
      {lit.includes("b") && glow(String(b), db)}
      <text x={cx} y={nb} textAnchor="middle" dominantBaseline="central" fontSize={fs} fontWeight={700} fill={dimTop ? SC_DIM : C.ink}>{t}</text>
      <line x1={cx - lw / 2} y1={cy} x2={cx + lw / 2} y2={cy} stroke={C.ink} strokeWidth={Math.max(4, fs * 0.08)} strokeLinecap="round" />
      <text x={cx} y={db} textAnchor="middle" dominantBaseline="central" fontSize={fs} fontWeight={700} fill={C.ink}>{b}</text>
    </g>
  );
}
/* a card's object in its box: a bar, or as many discs as the top number needs (a second whole beside the first) */
function scObj(c: any[], x: number, y: number, w: number, h: number, C: any, o: any = {}) {
  const [k, t, b] = c, taken = o.taken ?? t, tx = o.tx || ((v: any) => v);
  if (k === "bar") {
    const bw = Math.min(w, h * SC_BAR_BOX, o.barMax || 9999), bh = bw / SC_BAR_BOX;
    return scBar(x + (w - bw) / 2, y + (h - bh) / 2, bw, bh, b, Math.min(taken, b), C);
  }
  const n = Math.max(1, Math.ceil(t / b)), whole = t === b, lab = whole ? 58 : 0, gap = 16;
  const d = Math.min(h - lab, (w - (n - 1) * gap) / n, o.discMax || 9999), r = d / 2;
  const x0 = x + (w - (n * d + (n - 1) * gap)) / 2, cy = y + (h - lab) / 2;
  return (
    <g>
      {Array.from({ length: o.upto ?? n }).map((_, i) => scDisc(k, x0 + r + i * (d + gap), cy, r, b, Math.max(0, Math.min(b, taken - i * b)), C))}
      {whole && <circle cx={x0 + r} cy={cy} r={r + 7} fill="none" stroke={SC_GREEN} strokeWidth={6} />}
      {whole && <text x={x0 + r} y={cy + r + 36} textAnchor="middle" dominantBaseline="central" fontSize={T.micro} fontWeight={700} fill={SC_GREEN}>{tx("Whole")}</text>}
    </g>
  );
}
/* a fraction card: the fraction at its left, its object at its right */
const scFw = (c: any[], fs: number) => Math.max(String(c[1]).length, String(c[2]).length) * fs * 0.6 + fs * 0.5;   /* the fraction's column */
const scFH = (fs: number) => 2 * scG(fs) + 1.74 * fs + 8;   /* the fraction's full height, its amber highlight boxes included */
function scCard(c: any[], x: number, y: number, w: number, h: number, C: any, o: any) {
  const fw = scFw(c, o.fs), FH = scFH(o.fs);
  /* a bar on a narrow card goes UNDER the fraction, across the card's width, so it is not a sliver beside it; the fraction
     (highlight included) stays 10 clear of the card's top and 8 clear of the bar */
  const under = c[0] === "bar" && Math.min(w - 24, (h - FH - 30) * SC_BAR_BOX) > Math.min(w - fw - 36, (h - 24) * SC_BAR_BOX);
  return (
    <g>
      <rect x={x} y={y + 3} width={w} height={h} rx={18} fill="#000000" fillOpacity={0.06} />
      <rect x={x} y={y} width={w} height={h} rx={18} fill={C.paper} stroke={C.rule} strokeWidth={3} />
      {under ? scFrac(x + w / 2, y + 10 + FH / 2, c[1], c[2], o.fs, C, o.lit || "", !!o.dimTop) : scFrac(x + 12 + fw / 2, y + h / 2, c[1], c[2], o.fs, C, o.lit || "", !!o.dimTop)}
      {under ? scObj(c, x + 12, y + 18 + FH, w - 24, h - FH - 30, C, o) : scObj(c, x + fw + 24, y + 12, w - fw - 36, h - 24, C, o)}
    </g>
  );
}
/* the bin's contents as a set ("k1,k3"), so the order of the taps never matters */
let scTouched = false;   /* a real finger or mouse has touched the working area in this page (the gate below) */
const scSet = (v: any) => String(v ?? "").split(",").map((s) => s.trim()).filter(Boolean).sort().join(",");

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each printed or drawn line
   up in it (Work draws its own words through tx("...")). Fill it AFTER the English is final and reviewed:
   `check` (tr-coverage) lists every printed line still missing. Nothing is baked: the lesson is silent.
   Empty = the tool runs in English only.
   FOR THE LANGUAGE PASS (tr-coverage does not scan these, add them by hand):
   - words Work draws through tx(): "Unit fractions", "Not a unit fraction", "Improper", "Odd one out", "Mat", "My bin",
     "Take", "Whole", "Bigger", and every answer key's label (Yes, No, Proper, Improper, Like, Unlike, Greater, Smaller, Equal: items' `opts`,
     drawn by Work as one-tap keys beside the picture, so tr-coverage does not list them)
   - each item's `win` line (said from Work with api.say(item.win)), one per item in PHASES below */
const TR: any = {
  hi: {
    "Like fractions": "समान भिन्न",
    "Put a card in the bin first.": "पहले एक कार्ड डिब्बे में डालो।",
    "Move a card first, then press Enter.": "पहले कोई कार्ड हिलाओ, फिर दर्ज करें दबाओ।",
    "Tap one of the answer keys.": "जवाब वाली कुंजियों में से एक छुओ।",
    "Sort and Compare": "छाँटो और तुलना करो",
    "Can two numbers on a card tell you how much pizza you get?": "क्या कार्ड की दो संख्याएँ बता सकती हैं कि तुम्हें कितना पिज़्ज़ा मिलेगा?",
    "Free play: tap the cards into the bin and back as you like.": "मुक्त खेल: कार्ड डिब्बे में डालो और जैसे चाहो वापस निकालो।",
    "Unit fractions: the top number is one": "इकाई भिन्न: ऊपर की संख्या 1 है",
    "Unit fractions": "इकाई भिन्न",
    "Tap the pizza card to put it in the Unit fractions bin.": "पिज़्ज़ा वाले कार्ड को छूकर इकाई भिन्न के डिब्बे में डालो।",
    "Look for the round pizza card.": "गोल पिज़्ज़ा वाला कार्ड ढूँढो।",
    "A unit fraction has 1 as its top number.": "इकाई भिन्न में ऊपर की संख्या 1 होती है।",
    "You learned: a unit fraction has 1 as its top number.": "तुमने सीखा: इकाई भिन्न में ऊपर की संख्या 1 होती है।",
    "A chocolate bar of 10 equal squares has some eaten: is this a unit fraction?": "10 बराबर टुकड़ों वाली चॉकलेट के कुछ टुकड़े खाए गए: क्या यह इकाई भिन्न है?",
    "Unit fraction?": "इकाई भिन्न?",
    "Point to the top number of the card.": "कार्ड की ऊपर वाली संख्या पर उँगली रखो।",
    "Yes, 1/10 has 1 on top, so it is a unit fraction.": "हाँ, 1/10 में ऊपर 1 है, इसलिए यह इकाई भिन्न है।",
    "Tap every unit fraction card into the bin, then press Enter.": "हर इकाई भिन्न वाला कार्ड डिब्बे में डालो, फिर दर्ज करें दबाओ।",
    "Sort the unit fractions": "इकाई भिन्न छाँटो",
    "Check the top number, not the bottom one.": "ऊपर की संख्या देखो, नीचे की नहीं।",
    "Right, 1/5 and 1/9 both have 1 on top.": "सही, 1/5 और 1/9 दोनों में ऊपर 1 है।",
    "Not a unit fraction": "इकाई भिन्न नहीं",
    "Now put the one card that is not a unit fraction in the bin.": "अब वह एक कार्ड डिब्बे में डालो जो इकाई भिन्न नहीं है।",
    "Which is not unit?": "कौन-सा इकाई नहीं?",
    "Find the card with a number other than 1 on top.": "वह कार्ड ढूँढो जिसमें ऊपर 1 के अलावा कोई संख्या है।",
    "Right, 2/9 has 2 on top, so it is not a unit fraction.": "सही, 2/9 में ऊपर 2 है, इसलिए यह इकाई भिन्न नहीं है।",
    "Proper and improper: is the top number smaller?": "उचित और अनुचित: क्या ऊपर की संख्या छोटी है?",
    "The card says 5/4, so tap Take to take 5 slices from pizzas cut into 4.": "कार्ड पर 5/4 है: लो दबाकर 4 टुकड़ों वाले पिज़्ज़ा से 5 टुकड़े लो।",
    "Tap the Take key under the card.": "कार्ड के नीचे वाली लो कुंजी दबाओ।",
    "Top smaller than bottom is proper; bigger or the same (one whole) is improper.": "ऊपर छोटी हो तो उचित; बड़ी या बराबर (एक पूरा) हो तो अनुचित।",
    "You learned: a proper fraction's top is smaller than its bottom.": "तुमने सीखा: उचित भिन्न में ऊपर की संख्या नीचे वाली से छोटी होती है।",
    "Every pizza is cut into 4 slices: is 7/4 proper or improper?": "हर पिज़्ज़ा 4 टुकड़ों में कटा है: 7/4 उचित है या अनुचित?",
    "Proper or improper?": "उचित या अनुचित?",
    "Look at whether the first pizza is full.": "देखो कि पहला पिज़्ज़ा पूरा हुआ या नहीं।",
    "Yes, 7 is bigger than 4, so 7/4 is more than one pizza.": "हाँ, 4 से 7 बड़ा है, इसलिए 7/4 एक पिज़्ज़ा से ज़्यादा है।",
    "A roti cut into 9 equal pieces has 8 eaten: which kind is 8/9?": "9 बराबर टुकड़ों वाली रोटी के 8 टुकड़े खाए गए: 8/9 किस तरह का है?",
    "Which kind is it?": "यह किस तरह का है?",
    "Read the top number, then the bottom number.": "पहले ऊपर की संख्या पढ़ो, फिर नीचे की।",
    "Yes, 8 is smaller than 9, so 8/9 is less than one roti.": "हाँ, 9 से 8 छोटा है, इसलिए 8/9 एक रोटी से कम है।",
    "Improper": "अनुचित",
    "Tap every improper card into the bin, then press Enter.": "हर अनुचित कार्ड डिब्बे में डालो, फिर दर्ज करें दबाओ।",
    "Sort the improper ones": "अनुचित वाले छाँटो",
    "Read both numbers on every card before you sort it.": "छाँटने से पहले हर कार्ड की दोनों संख्याएँ पढ़ो।",
    "Right, 9/5 is more than one whole and 8/8 is one whole, so both are improper.": "सही, 9/5 एक पूरे से ज़्यादा और 8/8 एक पूरा है, इसलिए दोनों अनुचित हैं।",
    "Like and unlike: do the bottom numbers match?": "समान और असमान: क्या नीचे की संख्याएँ एक जैसी हैं?",
    "Mat": "चटाई",
    "Tap the pizza card to put it on the mat.": "पिज़्ज़ा वाले कार्ड को छूकर चटाई पर रखो।",
    "Tap the card with the pizza on it.": "जिस कार्ड पर पिज़्ज़ा है उसे छुओ।",
    "Now tap the chocolate bar card so both cards sit on the mat.": "अब चॉकलेट वाला कार्ड छुओ, ताकि दोनों चटाई पर हों।",
    "Tap the card with the chocolate bar.": "चॉकलेट वाला कार्ड छुओ।",
    "Fractions with the same bottom number are like fractions.": "जिन भिन्नों की नीचे की संख्या एक जैसी हो, वे समान भिन्न हैं।",
    "You learned: like fractions have the same bottom number.": "तुमने सीखा: समान भिन्नों की नीचे की संख्या एक जैसी होती है।",
    "The mat holds 4/5 and 4/9: are the two cards like or unlike?": "चटाई पर 4/5 और 4/9 हैं: ये दोनों समान हैं या असमान?",
    "Like or unlike?": "समान या असमान?",
    "Cover the top numbers.": "ऊपर की संख्याएँ ढक दो।",
    "Yes, 5 and 9 are different, so 4/5 and 4/9 are unlike.": "हाँ, 5 और 9 अलग हैं, इसलिए 4/5 और 4/9 असमान हैं।",
    "One roti has 1 piece taken, the other has 7: what kind of pair is it?": "एक रोटी से 1 टुकड़ा लिया, दूसरी से 7: यह जोड़ी कैसी है?",
    "What kind of pair?": "जोड़ी कैसी है?",
    "Do the two bottom numbers match?": "क्या नीचे की दोनों संख्याएँ एक जैसी हैं?",
    "Yes, both bottom numbers are 9, so they are like.": "हाँ, दोनों की नीचे की संख्या 9 है, इसलिए ये समान हैं।",
    "Odd one out": "अलग वाला",
    "One card is not like the others: put it in the bin, then press Enter.": "एक कार्ड बाकियों जैसा नहीं है: उसे डिब्बे में डालो, फिर दर्ज करें दबाओ।",
    "Odd one out?": "अलग कौन-सा?",
    "Read the bottom number on each card.": "हर कार्ड की नीचे की संख्या पढ़ो।",
    "Right, 4/7 is the only card without 9 at the bottom.": "सही, सिर्फ़ 4/7 में नीचे 9 नहीं है।",
    "Comparing like fractions": "समान भिन्नों की तुलना",
    "Both chocolate bars have 8 equal parts: tap the one with more parts taken.": "दोनों चॉकलेट में 8 बराबर भाग हैं: ज़्यादा भाग लिए गए वाली छुओ।",
    "Count the blue parts on each chocolate bar.": "हर चॉकलेट के नीले भाग गिनो।",
    "On two same-size wholes, covering more is bigger and covering the same is equal.": "एक नाप के पूरे पर ज़्यादा ढकने वाला बड़ा, उतना ही ढकने वाला बराबर है।",
    "You learned: on same-size wholes, the part covering more is bigger.": "तुमने सीखा: एक नाप के पूरे पर ज़्यादा ढकने वाला भाग बड़ा है।",
    "Is 6/10 of a chocolate bar greater than, smaller than or equal to 9/10 of it?": "क्या चॉकलेट का 6/10, उसी के 9/10 से बड़ा, छोटा या बराबर है?",
    "Compare the chocolate bars": "चॉकलेट की तुलना करो",
    "The squares are all the same size.": "सारे टुकड़े एक नाप के हैं।",
    "Yes, 6/10 is smaller, because 6 squares are fewer than 9.": "हाँ, 6/10 छोटा है, क्योंकि 6 टुकड़े 9 से कम हैं।",
    "The two rotis are the same size: how does 1/2 compare with 1/4?": "दोनों रोटियाँ एक नाप की हैं: 1/2 की तुलना 1/4 से कैसी है?",
    "Compare the rotis": "रोटियों की तुलना करो",
    "Different bottom numbers: look at the pictures, the numbers cannot tell us yet.": "नीचे की संख्याएँ अलग हैं: चित्र देखो, संख्याएँ अभी नहीं बता सकतीं।",
    "Yes, half a roti is more than a quarter of the same roti.": "हाँ, आधी रोटी उसी रोटी के एक चौथाई से ज़्यादा है।",
    "One pizza is cut into 2 and its twin into 4: how does 1/2 compare with 2/4?": "एक पिज़्ज़ा 2 में और वैसा ही दूसरा 4 में कटा है: 1/2 और 2/4 कैसे हैं?",
    "Compare the pizzas": "पिज़्ज़ा की तुलना करो",
    "Compare the blue part of each pizza, not the numbers.": "संख्याएँ नहीं, हर पिज़्ज़ा का नीला भाग देखो।",
    "Yes, 2/4 of a pizza covers the same as 1/2 of it.": "हाँ, पिज़्ज़ा का 2/4 उतना ही ढकता है जितना 1/2।",
    "How many blue squares are taken from the chocolate bar?": "चॉकलेट से कितने नीले टुकड़े लिए गए हैं?",
    "A unit fraction takes just 1 part, however many parts the whole has.": "इकाई भिन्न में सिर्फ़ 1 भाग लिया जाता है, पूरे में कितने भी भाग हों।",
    "Say the top number of each card out loud.": "हर कार्ड की ऊपर की संख्या ज़ोर से बोलो।",
    "Only cards with 1 above the line belong in this bin.": "इस डिब्बे में सिर्फ़ वे कार्ड जाएँ जिनमें रेखा के ऊपर 1 है।",
    "Look at the blue parts: which card has more than 1 taken?": "नीले भाग देखो: किस कार्ड में 1 से ज़्यादा भाग लिए गए हैं?",
    "Three cards have 1 on top; move the card whose top is different.": "तीन कार्डों में ऊपर 1 है; जिसकी ऊपर की संख्या अलग है उसे डालो।",
    "Is 7 smaller than 4, or bigger?": "क्या 4 से 7 छोटा है, या बड़ा?",
    "The top counts the slices taken; the bottom counts the slices in one pizza.": "ऊपर लिए गए टुकड़े गिनती है; नीचे एक पिज़्ज़ा के टुकड़े।",
    "Is 8 smaller than 9, or bigger?": "क्या 9 से 8 छोटा है, या बड़ा?",
    "Count the pieces left: is any of the roti still there?": "बचे टुकड़े गिनो: क्या रोटी का कुछ हिस्सा अभी बचा है?",
    "A card with the same top and bottom number shows one whole.": "जिस कार्ड में ऊपर और नीचे एक ही संख्या हो, वह एक पूरा है।",
    "Improper means the top number is bigger than the bottom, or the same.": "अनुचित यानी ऊपर की संख्या नीचे वाली से बड़ी या बराबर।",
    "Say the two bottom numbers aloud.": "नीचे की दोनों संख्याएँ ज़ोर से बोलो।",
    "Like cards share one bottom number, whatever their top numbers are.": "समान कार्डों की नीचे की संख्या एक होती है, ऊपर कुछ भी हो।",
    "Forget the blue parts and read the numbers under the lines.": "नीले भाग छोड़ो और रेखा के नीचे की संख्याएँ पढ़ो।",
    "Are both rotis cut into the same number of pieces?": "क्या दोनों रोटियाँ एक जितने टुकड़ों में कटी हैं?",
    "Which bottom number do three cards share?": "तीन कार्डों में नीचे कौन-सी संख्या एक जैसी है?",
    "Find the card whose bottom number is different from the rest.": "वह कार्ड ढूँढो जिसकी नीचे की संख्या बाकियों से अलग है।",
    "Both chocolate bars have 10 equal squares, so count the blue squares.": "दोनों चॉकलेट में 10 बराबर टुकड़े हैं, तो नीले टुकड़े गिनो।",
    "More blue squares of the same size reach further along the chocolate bar.": "एक नाप के ज़्यादा नीले टुकड़े चॉकलेट पर आगे तक जाते हैं।",
    "Which roti has more of its round covered in blue?": "किस रोटी का ज़्यादा हिस्सा नीला है?",
    "Trace each blue part with a finger and see which one is wider.": "हर नीले भाग पर उँगली फेरो और देखो कौन-सा चौड़ा है।",
    "Does one blue part cover more of its pizza than the other?": "क्या एक नीला भाग अपने पिज़्ज़ा का दूसरे से ज़्यादा ढकता है?",
    "Picture one pizza laid on the other: which blue part is wider?": "सोचो एक पिज़्ज़ा दूसरे पर रखा है: कौन-सा नीला भाग चौड़ा है?",
    "Yes": "हाँ",
    "No": "नहीं",
    "Proper": "उचित",
    "Like": "समान",
    "Unlike": "असमान",
    "Greater": "बड़ा",
    "Smaller": "छोटा",
    "Equal": "बराबर",
    "My bin": "मेरा डिब्बा",
    "Take": "लो",
    "Whole": "पूरा",
    "Bigger": "बड़ा",
  },
  gu: {
    "Like fractions": "સરખા અપૂર્ણાંક",
    "Put a card in the bin first.": "પહેલાં એક કાર્ડ ડબ્બામાં મૂકો.",
    "Move a card first, then press Enter.": "પહેલાં કોઈ કાર્ડ ખસેડો, પછી દાખલ કરો દબાવો.",
    "Tap one of the answer keys.": "જવાબની કીમાંથી એકને અડો.",
    "Sort and Compare": "છૂટા પાડો અને સરખાવો",
    "Can two numbers on a card tell you how much pizza you get?": "શું કાર્ડ પરની બે સંખ્યાઓ કહી શકે કે તમને કેટલો પિઝા મળશે?",
    "Free play: tap the cards into the bin and back as you like.": "મુક્ત રમત: કાર્ડ ડબ્બામાં મૂકો અને ગમે તેમ પાછા કાઢો.",
    "Unit fractions: the top number is one": "એકમ અપૂર્ણાંક: ઉપરની સંખ્યા 1 છે",
    "Unit fractions": "એકમ અપૂર્ણાંક",
    "Tap the pizza card to put it in the Unit fractions bin.": "પિઝાવાળા કાર્ડને અડીને એકમ અપૂર્ણાંકના ડબ્બામાં મૂકો.",
    "Look for the round pizza card.": "ગોળ પિઝાવાળું કાર્ડ શોધો.",
    "A unit fraction has 1 as its top number.": "એકમ અપૂર્ણાંકમાં ઉપરની સંખ્યા 1 હોય છે.",
    "You learned: a unit fraction has 1 as its top number.": "તમે શીખ્યા: એકમ અપૂર્ણાંકમાં ઉપરની સંખ્યા 1 હોય છે.",
    "A chocolate bar of 10 equal squares has some eaten: is this a unit fraction?": "10 સરખા ટુકડાની ચોકલેટમાંથી થોડા ખવાયા: શું આ એકમ અપૂર્ણાંક છે?",
    "Unit fraction?": "એકમ અપૂર્ણાંક?",
    "Point to the top number of the card.": "કાર્ડની ઉપરની સંખ્યા પર આંગળી મૂકો.",
    "Yes, 1/10 has 1 on top, so it is a unit fraction.": "હા, 1/10માં ઉપર 1 છે, તેથી તે એકમ અપૂર્ણાંક છે.",
    "Tap every unit fraction card into the bin, then press Enter.": "દરેક એકમ અપૂર્ણાંકવાળું કાર્ડ ડબ્બામાં મૂકો, પછી દાખલ કરો દબાવો.",
    "Sort the unit fractions": "એકમ અપૂર્ણાંક છૂટા પાડો",
    "Check the top number, not the bottom one.": "નીચેની નહીં, ઉપરની જુઓ.",
    "Right, 1/5 and 1/9 both have 1 on top.": "સાચું, 1/5 અને 1/9 બંનેમાં ઉપર 1 છે.",
    "Not a unit fraction": "એકમ અપૂર્ણાંક નથી",
    "Now put the one card that is not a unit fraction in the bin.": "હવે જે કાર્ડ એકમ અપૂર્ણાંક નથી તે ડબ્બામાં મૂકો.",
    "Which is not unit?": "કયું એકમ નથી?",
    "Find the card with a number other than 1 on top.": "જેમાં ઉપર 1 સિવાયની સંખ્યા હોય તે કાર્ડ શોધો.",
    "Right, 2/9 has 2 on top, so it is not a unit fraction.": "સાચું, 2/9માં ઉપર 2 છે, તેથી તે એકમ અપૂર્ણાંક નથી.",
    "Proper and improper: is the top number smaller?": "ખરો અને અયોગ્ય: શું ઉપરની સંખ્યા નાની છે?",
    "The card says 5/4, so tap Take to take 5 slices from pizzas cut into 4.": "કાર્ડ પર 5/4 છે: લો દબાવી 4 ટુકડાવાળા પિઝામાંથી 5 ટુકડા લો.",
    "Tap the Take key under the card.": "કાર્ડ નીચેની લો કી દબાવો.",
    "Top smaller than bottom is proper; bigger or the same (one whole) is improper.": "ઉપરની નાની હોય તો ખરો; મોટી કે સરખી (એક આખું) હોય તો અયોગ્ય.",
    "You learned: a proper fraction's top is smaller than its bottom.": "તમે શીખ્યા: ખરા અપૂર્ણાંકમાં ઉપરની સંખ્યા નીચેની કરતાં નાની હોય.",
    "Every pizza is cut into 4 slices: is 7/4 proper or improper?": "દરેક પિઝા 4 ટુકડામાં કાપેલો છે: 7/4 ખરો છે કે અયોગ્ય?",
    "Proper or improper?": "ખરો કે અયોગ્ય?",
    "Look at whether the first pizza is full.": "જુઓ કે પહેલો પિઝા પૂરો થયો કે નહીં.",
    "Yes, 7 is bigger than 4, so 7/4 is more than one pizza.": "હા, 7 એ 4 કરતાં મોટો છે, તેથી 7/4 એક પિઝાથી વધુ છે.",
    "A roti cut into 9 equal pieces has 8 eaten: which kind is 8/9?": "9 સરખા ટુકડાવાળી રોટલીના 8 ટુકડા ખવાયા: 8/9 કયા પ્રકારનો છે?",
    "Which kind is it?": "આ કયા પ્રકારનો છે?",
    "Read the top number, then the bottom number.": "પહેલાં ઉપરની સંખ્યા વાંચો, પછી નીચેની.",
    "Yes, 8 is smaller than 9, so 8/9 is less than one roti.": "હા, 8 એ 9 કરતાં નાનો છે, તેથી 8/9 એક રોટલીથી ઓછો છે.",
    "Improper": "અયોગ્ય",
    "Tap every improper card into the bin, then press Enter.": "દરેક અયોગ્ય કાર્ડ ડબ્બામાં મૂકો, પછી દાખલ કરો દબાવો.",
    "Sort the improper ones": "અયોગ્ય છૂટા પાડો",
    "Read both numbers on every card before you sort it.": "છૂટા પાડતાં પહેલાં દરેક કાર્ડની બંને સંખ્યા વાંચો.",
    "Right, 9/5 is more than one whole and 8/8 is one whole, so both are improper.": "સાચું, 9/5 એક આખાથી વધુ અને 8/8 એક આખું છે, તેથી બંને અયોગ્ય છે.",
    "Like and unlike: do the bottom numbers match?": "સરખા અને અસરખા: શું નીચેની સંખ્યાઓ સરખી છે?",
    "Mat": "સાદડી",
    "Tap the pizza card to put it on the mat.": "પિઝાવાળા કાર્ડને અડીને સાદડી પર મૂકો.",
    "Tap the card with the pizza on it.": "જે કાર્ડ પર પિઝા છે તેને અડો.",
    "Now tap the chocolate bar card so both cards sit on the mat.": "હવે ચોકલેટવાળા કાર્ડને અડો, જેથી બંને સાદડી પર હોય.",
    "Tap the card with the chocolate bar.": "ચોકલેટવાળું કાર્ડ અડો.",
    "Fractions with the same bottom number are like fractions.": "જે અપૂર્ણાંકોની નીચેની સંખ્યા સરખી હોય તે સરખા અપૂર્ણાંક છે.",
    "You learned: like fractions have the same bottom number.": "તમે શીખ્યા: સરખા અપૂર્ણાંકોની નીચેની સંખ્યા સરખી હોય છે.",
    "The mat holds 4/5 and 4/9: are the two cards like or unlike?": "સાદડી પર 4/5 અને 4/9 છે: આ બે સરખા છે કે અસરખા?",
    "Like or unlike?": "સરખા કે અસરખા?",
    "Cover the top numbers.": "ઉપરની સંખ્યાઓ ઢાંકી દો.",
    "Yes, 5 and 9 are different, so 4/5 and 4/9 are unlike.": "હા, 5 અને 9 જુદા છે, તેથી 4/5 અને 4/9 અસરખા છે.",
    "One roti has 1 piece taken, the other has 7: what kind of pair is it?": "એક રોટલીમાંથી 1 ટુકડો લીધો, બીજીમાંથી 7: આ જોડી કેવી છે?",
    "What kind of pair?": "જોડી કેવી છે?",
    "Do the two bottom numbers match?": "શું નીચેની બંને સંખ્યા સરખી છે?",
    "Yes, both bottom numbers are 9, so they are like.": "હા, બંનેની નીચેની સંખ્યા 9 છે, તેથી તે સરખા છે.",
    "Odd one out": "જુદું કાર્ડ",
    "One card is not like the others: put it in the bin, then press Enter.": "એક કાર્ડ બીજા જેવું નથી: તેને ડબ્બામાં મૂકો, પછી દાખલ કરો દબાવો.",
    "Odd one out?": "જુદું કયું?",
    "Read the bottom number on each card.": "દરેક કાર્ડની નીચેની સંખ્યા વાંચો.",
    "Right, 4/7 is the only card without 9 at the bottom.": "સાચું, ફક્ત 4/7માં નીચે 9 નથી.",
    "Comparing like fractions": "સરખા અપૂર્ણાંકોની સરખામણી",
    "Both chocolate bars have 8 equal parts: tap the one with more parts taken.": "બંને ચોકલેટમાં 8 સરખા ભાગ છે: વધુ ભાગ લીધેલી ચોકલેટને અડો.",
    "Count the blue parts on each chocolate bar.": "દરેક ચોકલેટના વાદળી ભાગ ગણો.",
    "On two same-size wholes, covering more is bigger and covering the same is equal.": "સરખા માપના આખા પર વધુ ઢાંકે તે મોટો, સરખું ઢાંકે તે સરખો.",
    "You learned: on same-size wholes, the part covering more is bigger.": "તમે શીખ્યા: સરખા માપના આખા પર વધુ ઢાંકતો ભાગ મોટો છે.",
    "Is 6/10 of a chocolate bar greater than, smaller than or equal to 9/10 of it?": "શું ચોકલેટનો 6/10 એના જ 9/10 કરતાં મોટો, નાનો કે સરખો છે?",
    "Compare the chocolate bars": "ચોકલેટ સરખાવો",
    "The squares are all the same size.": "બધા ટુકડા એક જ માપના છે.",
    "Yes, 6/10 is smaller, because 6 squares are fewer than 9.": "હા, 6/10 નાનો છે, કારણ કે 6 ટુકડા 9 કરતાં ઓછા છે.",
    "The two rotis are the same size: how does 1/2 compare with 1/4?": "બંને રોટલી સરખા માપની છે: 1/2 અને 1/4 સરખાવો તો કેવા છે?",
    "Compare the rotis": "રોટલી સરખાવો",
    "Different bottom numbers: look at the pictures, the numbers cannot tell us yet.": "નીચેની સંખ્યા જુદી છે: ચિત્ર જુઓ, સંખ્યા હજી કહી ન શકે.",
    "Yes, half a roti is more than a quarter of the same roti.": "હા, રોટલીનો અડધો ભાગ તેના ચોથા ભાગ કરતાં વધુ છે.",
    "One pizza is cut into 2 and its twin into 4: how does 1/2 compare with 2/4?": "એક પિઝા 2માં અને તેના જેવો બીજો 4માં કાપ્યો છે: 1/2 અને 2/4 કેવા છે?",
    "Compare the pizzas": "પિઝા સરખાવો",
    "Compare the blue part of each pizza, not the numbers.": "સંખ્યા નહીં, દરેક પિઝાનો વાદળી ભાગ સરખાવો.",
    "Yes, 2/4 of a pizza covers the same as 1/2 of it.": "હા, પિઝાનો 2/4 એટલું જ ઢાંકે છે જેટલું 1/2.",
    "How many blue squares are taken from the chocolate bar?": "ચોકલેટમાંથી કેટલા વાદળી ટુકડા લીધા છે?",
    "A unit fraction takes just 1 part, however many parts the whole has.": "એકમ અપૂર્ણાંકમાં ફક્ત 1 ભાગ લેવાય, આખામાં ગમે તેટલા ભાગ હોય.",
    "Say the top number of each card out loud.": "દરેક કાર્ડની ઉપરની સંખ્યા મોટેથી બોલો.",
    "Only cards with 1 above the line belong in this bin.": "આ ડબ્બામાં ફક્ત એ કાર્ડ જાય જેમાં લીટીની ઉપર 1 હોય.",
    "Look at the blue parts: which card has more than 1 taken?": "વાદળી ભાગ જુઓ: કયા કાર્ડમાં 1 કરતાં વધુ ભાગ લીધા છે?",
    "Three cards have 1 on top; move the card whose top is different.": "ત્રણ કાર્ડમાં ઉપર 1 છે; જેની ઉપરની સંખ્યા જુદી છે તે મૂકો.",
    "Is 7 smaller than 4, or bigger?": "7 એ 4 કરતાં નાનો છે કે મોટો?",
    "The top counts the slices taken; the bottom counts the slices in one pizza.": "ઉપર લીધેલા ટુકડા ગણે છે; નીચે એક પિઝાના ટુકડા.",
    "Is 8 smaller than 9, or bigger?": "8 એ 9 કરતાં નાનો છે કે મોટો?",
    "Count the pieces left: is any of the roti still there?": "બાકી ટુકડા ગણો: શું રોટલીનો થોડો ભાગ હજી બાકી છે?",
    "A card with the same top and bottom number shows one whole.": "જે કાર્ડમાં ઉપર અને નીચે એક જ સંખ્યા હોય તે એક આખું છે.",
    "Improper means the top number is bigger than the bottom, or the same.": "અયોગ્ય એટલે ઉપરની સંખ્યા નીચેની કરતાં મોટી કે સરખી.",
    "Say the two bottom numbers aloud.": "નીચેની બંને સંખ્યા મોટેથી બોલો.",
    "Like cards share one bottom number, whatever their top numbers are.": "સરખા કાર્ડની નીચેની સંખ્યા એક જ હોય, ઉપર ગમે તે હોય.",
    "Forget the blue parts and read the numbers under the lines.": "વાદળી ભાગ ભૂલી જાઓ અને લીટી નીચેની સંખ્યા વાંચો.",
    "Are both rotis cut into the same number of pieces?": "શું બંને રોટલી એકસરખા ટુકડામાં કાપેલી છે?",
    "Which bottom number do three cards share?": "ત્રણ કાર્ડમાં નીચે કઈ સંખ્યા સરખી છે?",
    "Find the card whose bottom number is different from the rest.": "જેની નીચેની સંખ્યા બીજાથી જુદી હોય તે કાર્ડ શોધો.",
    "Both chocolate bars have 10 equal squares, so count the blue squares.": "બંને ચોકલેટમાં 10 સરખા ટુકડા છે, તો વાદળી ટુકડા ગણો.",
    "More blue squares of the same size reach further along the chocolate bar.": "એક માપના વધુ વાદળી ટુકડા ચોકલેટ પર આગળ સુધી જાય છે.",
    "Which roti has more of its round covered in blue?": "કઈ રોટલીનો વધુ ભાગ વાદળી છે?",
    "Trace each blue part with a finger and see which one is wider.": "દરેક વાદળી ભાગ પર આંગળી ફેરવો અને જુઓ કયો પહોળો છે.",
    "Does one blue part cover more of its pizza than the other?": "શું એક વાદળી ભાગ પોતાના પિઝાનો બીજા કરતાં વધુ ઢાંકે છે?",
    "Picture one pizza laid on the other: which blue part is wider?": "કલ્પના કરો એક પિઝા બીજા પર મૂક્યો છે: કયો વાદળી ભાગ પહોળો છે?",
    "Yes": "હા",
    "No": "ના",
    "Proper": "ખરો",
    "Like": "સરખા",
    "Unlike": "અસરખા",
    "Greater": "મોટો",
    "Smaller": "નાનો",
    "Equal": "સરખો",
    "My bin": "મારો ડબ્બો",
    "Take": "લો",
    "Whole": "આખું",
    "Bigger": "મોટો",
  },
};

const SC_YN = [{ id: "c-yes", label: "Yes" }, { id: "c-no", label: "No" }];
const SC_PI = [{ id: "c-proper", label: "Proper" }, { id: "c-improper", label: "Improper" }];
const SC_LU = [{ id: "c-like", label: "Like" }, { id: "c-unlike", label: "Unlike" }];
const SC_GSE = [{ id: "c-gt", label: "Greater" }, { id: "c-sm", label: "Smaller" }, { id: "c-eq", label: "Equal" }];
/* free play: one tray and one bin, every card movable both ways */
const SC_FREE = { kind: "bin", cards: [["pizza", 3, 4], ["bar", 7, 10], ["roti", 5, 4], ["pizza", 1, 2]], bin: "My bin" };

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
    concept: "Unit fractions: the top number is one",
    conceptId: "M1.S2.T3.C12", objectiveIds: ["O3"],
    says: ["Look at the top number on each card. Which cards have a one on top?"],
    /* the warm-up (not a question): 1/4 into the bin by the hand */
    warm: { kind: "bin", cards: [["pizza", 1, 4], ["bar", 3, 4]], bin: "Unit fractions" },
    steps: [{ say: "Tap the pizza card to put it in the Unit fractions bin.", on: "card-1", hint: "Look for the round pizza card." }],
    ladder: [],
    closing: "A unit fraction has 1 as its top number.",
    learned: "You learned: a unit fraction has 1 as its top number.",
    traceback: "Each card's top number lights amber in turn, then the right cards show dashed in the bin.",
    /* gentle rise: one card first, then a sort of four, then the odd one of four (plan order SC1, 1, 5) */
    items: [
      /* practice 1: plan = Yes, because the top number is one (A chocolate bar has 10 equal squares and 1 square is eaten. The card says 1/10. Is it a unit fraction?) */
      { qid: "M1.S2.T3.C12:1", kind: "pick", rule: "unit", cards: [["bar", 1, 10]], pad: "enter", opts: SC_YN, answer: "c-yes", near: "c-no",
        say: "A chocolate bar of 10 equal squares has some eaten: is this a unit fraction?", ask: "Unit fraction?",
        miss: "Point to the top number of the card.",
        ladder: ["How many blue squares are taken from the chocolate bar?", "A unit fraction takes just 1 part, however many parts the whole has."], win: "Yes, 1/10 has 1 on top, so it is a unit fraction." },
      /* learn SC1: plan = the pizza card 1/5 and the jug card 1/9 (jug -> roti, cake -> roti: the owner's three objects) */
      { qid: "M1.S2.T3.C12:SC1", kind: "bin", rule: "unit", pad: "enter", cards: [["pizza", 1, 5], ["bar", 2, 5], ["roti", 1, 9], ["roti", 6, 9]], bin: "Unit fractions", tray: "Not a unit fraction",
        answer: "k1,k3", near: "k1,k2", say: "Tap every unit fraction card into the bin, then press Enter.", ask: "Sort the unit fractions",
        miss: "Check the top number, not the bottom one.",
        ladder: ["Say the top number of each card out loud.", "Only cards with 1 above the line belong in this bin."], win: "Right, 1/5 and 1/9 both have 1 on top." },
      /* practice 5: plan = the cake card 2/9 (kite row -> bar, cake -> roti, jug -> bar) */
      { qid: "M1.S2.T3.C12:5", kind: "bin", rule: "notunit", pad: "enter", cards: [["pizza", 1, 3], ["bar", 1, 7], ["roti", 2, 9], ["bar", 1, 10]], bin: "Not a unit fraction", tray: "Unit fractions",
        answer: "k3", near: "k4", say: "Now put the one card that is not a unit fraction in the bin.", ask: "Which is not unit?",
        miss: "Find the card with a number other than 1 on top.",
        ladder: ["Look at the blue parts: which card has more than 1 taken?", "Three cards have 1 on top; move the card whose top is different."], win: "Right, 2/9 has 2 on top, so it is not a unit fraction." },
    ],
  },
  {
    n: 2,
    concept: "Proper and improper: is the top number smaller?",
    conceptId: "M1.S2.T3.C13", objectiveIds: ["O3"],
    says: ["Is the top number smaller than the bottom number? Look at the pictures too."],
    /* the warm-up (not a question): 5 slices taken from pizzas cut in 4, the second pizza slides in after the fourth */
    warm: { kind: "take", cards: [["pizza", 5, 4]] },
    steps: [{ say: "The card says 5/4, so tap Take to take 5 slices from pizzas cut into 4.", on: "take", hint: "Tap the Take key under the card." }],
    ladder: [],
    closing: "Top smaller than bottom is proper; bigger or the same (one whole) is improper.",
    learned: "You learned: a proper fraction's top is smaller than its bottom.",
    traceback: "The top and bottom numbers light amber, then the right answer key is ringed green, or the right cards show dashed in the bin.",
    items: [
      /* learn SC2: plan = Improper (A pizza card shows 7/4, and every pizza is cut into 4 slices.) */
      { qid: "M1.S2.T3.C13:SC2", kind: "pick", rule: "proper", cards: [["pizza", 7, 4]], pad: "enter", opts: SC_PI, answer: "c-improper", near: "c-proper",
        say: "Every pizza is cut into 4 slices: is 7/4 proper or improper?", ask: "Proper or improper?",
        miss: "Look at whether the first pizza is full.",
        ladder: ["Is 7 smaller than 4, or bigger?", "The top counts the slices taken; the bottom counts the slices in one pizza."], win: "Yes, 7 is bigger than 4, so 7/4 is more than one pizza." },
      /* practice 2: plan = Proper, because 8 is smaller than 9 (cake -> roti) */
      { qid: "M1.S2.T3.C13:2", kind: "pick", rule: "proper", cards: [["roti", 8, 9]], pad: "enter", opts: SC_PI, answer: "c-proper", near: "c-improper",
        say: "A roti cut into 9 equal pieces has 8 eaten: which kind is 8/9?", ask: "Which kind is it?",
        miss: "Read the top number, then the bottom number.",
        ladder: ["Is 8 smaller than 9, or bigger?", "Count the pieces left: is any of the roti still there?"], win: "Yes, 8 is smaller than 9, so 8/9 is less than one roti." },
      /* practice 6: plan = the pizza card 9/5 and the cake card 8/8 (cake -> roti, jug -> roti) */
      { qid: "M1.S2.T3.C13:6", kind: "bin", rule: "improper", pad: "enter", cards: [["pizza", 9, 5], ["bar", 5, 8], ["roti", 8, 8], ["roti", 2, 9]], bin: "Improper", tray: "Proper",
        answer: "k1,k3", near: "k1", say: "Tap every improper card into the bin, then press Enter.", ask: "Sort the improper ones",
        miss: "Read both numbers on every card before you sort it.",
        ladder: ["A card with the same top and bottom number shows one whole.", "Improper means the top number is bigger than the bottom, or the same."],
        win: "Right, 9/5 is more than one whole and 8/8 is one whole, so both are improper." },
    ],
  },
  {
    n: 3,
    concept: "Like and unlike: do the bottom numbers match?",
    conceptId: "M1.S2.T3.C14", objectiveIds: ["O4"],
    says: ["Put two cards on the mat. Do the two bottom numbers match?"],
    /* the warm-up (not a question): two like cards carried onto the mat, one tap each; their bottom numbers then light */
    warm: { kind: "bin", cards: [["pizza", 2, 6], ["bar", 5, 6]], bin: "Mat" },
    steps: [
      { say: "Tap the pizza card to put it on the mat.", on: "card-1", hint: "Tap the card with the pizza on it." },
      { say: "Now tap the chocolate bar card so both cards sit on the mat.", on: "card-2", hint: "Tap the card with the chocolate bar." },
    ],
    ladder: [],
    closing: "Fractions with the same bottom number are like fractions.",
    learned: "You learned: like fractions have the same bottom number.",
    traceback: "The bottom numbers light amber together and the top numbers fade, then the right answer key is ringed green, or the right cards show dashed in the bin.",
    items: [
      /* learn SC3: plan = Unlike (The mat holds a pizza card 4/5 and a chocolate bar card 4/9.) */
      { qid: "M1.S2.T3.C14:SC3", kind: "pick", rule: "like", cards: [["pizza", 4, 5], ["bar", 4, 9]], pad: "enter", opts: SC_LU, answer: "c-unlike", near: "c-like",
        say: "The mat holds 4/5 and 4/9: are the two cards like or unlike?", ask: "Like or unlike?",
        miss: "Cover the top numbers.",
        ladder: ["Say the two bottom numbers aloud.", "Like cards share one bottom number, whatever their top numbers are."], win: "Yes, 5 and 9 are different, so 4/5 and 4/9 are unlike." },
      /* practice 3: plan = Like, because both bottom numbers are 9 (laddoo plates -> rotis) */
      { qid: "M1.S2.T3.C14:3", kind: "pick", rule: "like", cards: [["roti", 1, 9], ["roti", 7, 9]], pad: "enter", opts: SC_LU, answer: "c-like", near: "c-unlike",
        say: "One roti has 1 piece taken, the other has 7: what kind of pair is it?", ask: "What kind of pair?",
        miss: "Do the two bottom numbers match?",
        ladder: ["Forget the blue parts and read the numbers under the lines.", "Are both rotis cut into the same number of pieces?"], win: "Yes, both bottom numbers are 9, so they are like." },
      /* practice 7: plan = the kite row 4/7 (laddoo plate -> roti, kite row -> bar) */
      { qid: "M1.S2.T3.C14:7", kind: "bin", rule: "odd", pad: "enter", cards: [["roti", 2, 9], ["pizza", 5, 9], ["bar", 4, 9], ["bar", 4, 7]], bin: "Odd one out", tray: "Like fractions",
        answer: "k4", near: "k3", say: "One card is not like the others: put it in the bin, then press Enter.", ask: "Odd one out?",
        miss: "Read the bottom number on each card.",
        ladder: ["Which bottom number do three cards share?", "Find the card whose bottom number is different from the rest."], win: "Right, 4/7 is the only card without 9 at the bottom." },
    ],
  },
  {
    n: 4,
    concept: "Comparing like fractions",
    conceptId: "M1.S2.T3.C15", objectiveIds: ["O4"],
    says: ["The parts are the same size. Which one has more parts taken?"],
    /* the warm-up (not a question): the plan's "tap the object with more parts taken" on 3/8 and 5/8 */
    warm: { kind: "cmp", cards: [["bar", 3, 8], ["bar", 5, 8]] },
    steps: [{ say: "Both chocolate bars have 8 equal parts: tap the one with more parts taken.", on: "whole-2", hint: "Count the blue parts on each chocolate bar." }],
    ladder: ["Both chocolate bars have 10 equal squares, so count the blue squares.", "More blue squares of the same size reach further along the chocolate bar."],
    /* read over the last win picture (1/2 = 2/4): the picture's rule, true of all three compares (the maths review) */
    closing: "On two same-size wholes, covering more is bigger and covering the same is equal.",
    learned: "You learned: on same-size wholes, the part covering more is bigger.",
    traceback: "The bigger whole gets the vermilion Bigger ring, or an equals sign when they match, and the right answer key is ringed green.",
    /* the owner's decision: the plan's like compare (SC4) plus two picture-only compares on equal wholes; no rule for unlike
       bottom numbers is taught. Unused: M1.S2.T3.C15:4 (the jug compare, a second like compare) and M1.S2.T3.C15:8 ("only like
       fractions are compared", which the pictured compares replace). Difficulty rises: like bars, then 1/2 vs 1/4, then 1/2 vs 2/4. */
    items: [
      /* learn SC4: plan = 9/10 is bigger than 6/10; asked from 6/10's side so the three answers differ */
      { qid: "M1.S2.T3.C15:SC4", kind: "cmp", rule: "cmp", cards: [["bar", 6, 10], ["bar", 9, 10]], pad: "enter", opts: SC_GSE, answer: "c-sm", near: "c-eq",
        say: "Is 6/10 of a chocolate bar greater than, smaller than or equal to 9/10 of it?", ask: "Compare the chocolate bars",
        miss: "The squares are all the same size.", win: "Yes, 6/10 is smaller, because 6 squares are fewer than 9." },
      /* the owner's: half against a quarter of two identical rotis, shown only by the pictures */
      { qid: null, kind: "cmp", rule: "cmp", cards: [["roti", 1, 2], ["roti", 1, 4]], pad: "enter", opts: SC_GSE, answer: "c-gt", near: "c-sm",
        say: "The two rotis are the same size: how does 1/2 compare with 1/4?", ask: "Compare the rotis",
        miss: "Different bottom numbers: look at the pictures, the numbers cannot tell us yet.",
        ladder: ["Which roti has more of its round covered in blue?", "Trace each blue part with a finger and see which one is wider."],
        win: "Yes, half a roti is more than a quarter of the same roti." },
      /* the owner's: a half and two quarters of two identical pizzas, the same half coloured */
      { qid: null, kind: "cmp", rule: "cmp", cards: [["pizza", 1, 2], ["pizza", 2, 4]], pad: "enter", opts: SC_GSE, answer: "c-eq", near: "c-sm",
        say: "One pizza is cut into 2 and its twin into 4: how does 1/2 compare with 2/4?", ask: "Compare the pizzas",
        miss: "Compare the blue part of each pizza, not the numbers.",
        ladder: ["Does one blue part cover more of its pizza than the other?", "Picture one pizza laid on the other: which blue part is wider?"],
        win: "Yes, 2/4 of a pizza covers the same as 1/2 of it." },
    ],
  },
];
/* a win line is read, never cut (classroom-pieces): each question's celebration lasts its win line's reading time */
PHASES.forEach((p: any) => p.items.forEach((it: any) => { it.winMs = Math.max(2400, it.win.length * 68); }));

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { objects: ["pizza", "bar", "roti"], disc: 250, bar: [500, 133], sortCards: 4, binCard: [282, 206] };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a sort is the SET of cards in the bin ("k1,k3", any order); a choice is its id */
const judge = (item: any, v: any) => (item.kind === "bin" ? scSet(v) === scSet(item.answer) && scSet(v) !== ""
  : String(v).trim().toLowerCase() === String(item.answer).toLowerCase());
/* oracle: every answer re-derived from the cards' own numbers (kind rules, cross products), sharing nothing with judge */
const scOracle = (it: any) => {
  const cs = it.cards, r = it.rule;
  if (it.kind === "bin") {
    const bs = cs.map((c: any) => c[2]), mode = bs.find((b: number) => bs.filter((x: number) => x === b).length > 1);
    const f: any = { unit: (c: any) => c[1] === 1, notunit: (c: any) => c[1] !== 1, improper: (c: any) => c[1] >= c[2], odd: (c: any) => c[2] !== mode }[r];
    return cs.map((c: any, i: number) => (f(c) ? "k" + (i + 1) : "")).filter(Boolean).join(",");
  }
  const [a, b] = cs;
  if (r === "unit") return a[1] === 1 ? "c-yes" : "c-no";
  if (r === "proper") return a[1] < a[2] ? "c-proper" : "c-improper";
  if (r === "like") return a[2] === b[2] ? "c-like" : "c-unlike";
  const d = a[1] * b[2] - b[1] * a[2];
  return d > 0 ? "c-gt" : d < 0 ? "c-sm" : "c-eq";
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => scOracle(it) === it.answer));
/* the misconception: the fifths together, the bigger bottom number, 8/8 called proper, the matching tops */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a bin set, or a choice id) */
const answerForms = (item: any) => [String(item.answer)];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
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
function Work({ phase, n, item, index, stage, wrong, api, stepOn, box, tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const W = box ? box.w : 1472, H = box ? box.h : 520;
  const kx = Math.min(W, box && box.key ? box.key.x - 12 : W);   /* the right edge the top row may use (keyOnly) */

  /* what is on the board: free play's tray, a steps phase's warm-up, or the question */
  const free = stage === "free";
  const warmOn = !free && !!phase.steps && (stage === "demo" || stage === "teach");
  const V: any = free ? SC_FREE : warmOn ? phase.warm : item;
  const ask = stage === "ask", done = stage === "win" || stage === "idle";
  /* the board is keyed to the ENTRY (PATTERNS §18): a question entered again opens fresh */
  const qk = n + ":" + (free ? "f" : warmOn ? "w" : index);
  const ent = useRef({ qk: "", k: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, k: ent.current.k + 1 };
  const ek = qk + "#" + ent.current.k;
  const fresh = () => ({ ek, bin: V.cards.map(() => false), moving: -1, taken: 0, picked: 0, tb: null as any, dirty: false });
  const [raw, setRaw] = useState<any>(null);
  const S = raw && raw.ek === ek ? raw : fresh();
  const live = useRef<any>(S);
  live.current = S;
  const upd = (fn: (b: any) => any) => setRaw((p: any) => { const b = p && p.ek === ek ? p : fresh(); const nb = { ...b, ...fn(b) }; live.current = nb; return nb; });
  const busy = useRef(false);
  const binVal = (bin: boolean[]) => bin.map((x, i) => (x ? "k" + (i + 1) : "")).filter(Boolean).join(",");

  /* which numbers a phase reads: the top (1), both (2), the bottoms (3), the tops of a like pair (4) */
  const litOf = free ? "" : n === 1 ? "t" : n === 2 ? "tb" : n === 3 ? "b" : V.cards[0][2] === V.cards[1][2] ? "t" : "";

  /* ── layouts, from box every frame ── */
  /* a sort: the tray row, the bin row under it, each card carried straight down or up. A bar card and a card of two wholes
     get a wider cell. With room right of the cards (the key's corner only blocks the top row) the bin's name stands there and
     the cards are taller; with the panel open it sits on top of the bin. */
  const sortLay = () => {
    const cs = V.cards, k = cs.length, gap = 16, room = kx - 16, roomy = W - kx >= 250;
    const ch = roomy ? 240 : 200, fs = roomy ? 52 : 46;
    const wt = cs.map((c: any) => (c[0] === "bar" ? 1.12 : Math.ceil(c[1] / c[2]) > 1 ? 1.3 : 1));
    const sum = wt.reduce((a: number, b: number) => a + b, 0), unit = Math.min(k <= 2 ? 520 : 340, (room - (k - 1) * gap) / sum);
    const ws = wt.map((v: number) => v * unit), span = ws.reduce((a: number, b: number) => a + b, 0) + (k - 1) * gap;
    const x0 = 8 + (room - span) / 2, xs = ws.map((_: any, i: number) => x0 + ws.slice(0, i).reduce((a: number, b: number) => a + b, 0) + i * gap);
    const by = 8 + ch + 14, cardY = roomy ? by + 6 : by + 70;
    /* packed: the cards of one row side by side from the left, no gaps (the end picture of a sort) */
    const packX = (row: number[], i: number) => x0 + row.slice(0, row.indexOf(i)).reduce((a: number, j: number) => a + ws[j] + gap, 0);
    return { ch, fs, x0, span, by, roomy, packX, at: (i: number, inBin: boolean) => ({ x: xs[i], y: inBin ? cardY : 8, w: ws[i], h: ch }) };
  };
  /* a word answer (Yes / No, Proper / Improper, Like / Unlike, Greater / Smaller / Equal) is ONE tap on a key in a row under
     the picture (the brief's Like and Unlike buttons under the mat) */
  const optsOn = ask || done ? !!(item.opts && V === item) : false;
  /* the pick and compare boards keep ONE size and place whether the answer panel is open or shut (LAYOUT §3): sized for the
     open board (no bigPad: 1086), centred in the room left of the key's corner (1178) but never past 1080, the open board's edge */
  const LW = 1086, LX = (span: number) => Math.max(8, Math.min((1178 - span) / 2, 1080 - span));
  const optKeys = (mid: number) => {
    const k = item.opts.length, kw = 236, kh = 80, gap = 24, ks = k * kw + (k - 1) * gap, x0 = Math.max(8, Math.min(mid - ks / 2, 1080 - ks));
    return item.opts.map((o: any, j: number) => ({ ...o, x: x0 + j * (kw + gap), y: H - kh - 18, w: kw, h: kh }));
  };
  const pickLay = (k: number) => {
    const gap = 28, top = 12, ch = 390, cw = k === 1 ? Math.min(760, LW - 40) : Math.min(660, (LW - 40 - gap) / 2);
    const span = k * cw + (k - 1) * gap, x0 = LX(span);
    return { ch, cw, x0, span, top, mid: x0 + span / 2, at: (i: number) => ({ x: x0 + i * (cw + gap), y: top, w: cw, h: ch }) };
  };
  /* two wholes of ONE size: bars one above the other from one left edge, discs side by side */
  const cmpLay = () => {
    const fs = V.cards[0][0] === "bar" ? 72 : 80, fw = fs * 1.45;
    if (V.cards[0][0] === "bar") {
      /* the bar box carries its foil end, so the counted bar keeps 3.77:1; room for "Bigger" on the right */
      const bh = 165, bw = Math.min(bh * SC_BAR_BOX, 1072 - fw - 24 - 196), span = fw + 24 + bw + 196, ox = LX(span), bx = ox + fw + 24;
      const hh = bw / SC_BAR_BOX, y1 = 32, y2 = y1 + hh + 30;
      return { fs, bar: true, mid: ox + span / 2, wholes: [0, 1].map((i) => ({ x: bx, y: i ? y2 : y1, w: bw, h: hh, fx: ox + fw / 2, fy: (i ? y2 : y1) + hh / 2 })) };
    }
    const d = Math.min(300, (LW - 2 * (fw + 16) - 110 - 40) / 2), span = 2 * (fw + 16 + d) + 110, x0 = LX(span), y = 30;
    return { fs, bar: false, d, mid: x0 + fw + 16 + d + 55, wholes: [0, 1].map((i) => { const fx = x0 + i * (fw + 16 + d + 110); return { x: fx + fw + 16, y, w: d, h: d, fx: fx + fw / 2, fy: y + d / 2 }; }) };
  };

  /* ── the acts (every one performed on screen by the hand, PATTERNS §15) ── */
  /* a tap on another card while one is being carried is queued and carried next (never swallowed) */
  const queue = useRef<number[]>([]), tapRef = useRef<any>(null), nudged = useRef(false);
  /* THE GATE (the owner, 2026-10-24): a sort's Enter key is disabled (api.lock: flat, dimmed, untappable, no blink) until the
     child has moved a card in this question. Only in user mode and once a real finger or mouse has touched the board, so the
     teacher agent's and approve's toolApi path is never locked. A pick question has no act of its own and is never gated. */
  const acted = useRef(""), gated = useRef(false);
  const gateNow = () => {
    let user = false;
    try { user = window.toolApi.getState().mode === "user"; } catch (e) { user = false; }
    const want = ask && !free && V.kind === "bin" && acted.current !== ek && scTouched && user;
    if (want !== gated.current) { gated.current = want; api.lock(want); }
  };
  useEffect(() => {
    const on = (e: any) => { if (e.isTrusted && e.target && e.target.closest && e.target.closest('[data-zone="work"]')) scTouched = true; };
    window.addEventListener("pointerdown", on, true);
    return () => window.removeEventListener("pointerdown", on, true);
  }, []);
  const tapCard = (i: number) => {
    const name = "card-" + (i + 1);
    if (stage === "demo" && stepOn !== name) { api.did(name); return; }
    if (!ask && !free && stage !== "demo") return;
    if (busy.current) { if (stage !== "demo" && live.current.moving !== i && !queue.current.includes(i)) queue.current.push(i); return; }
    tl.stop();
    const L = sortLay(), b0 = live.current.bin[i], a = L.at(i, b0), z = L.at(i, !b0);
    busy.current = true;
    upd(() => ({ moving: i, tb: null }));
    api.act({ tool: "hand", moves: "carry", from: { x: a.x + a.w / 2, y: a.y + a.h / 2 }, at: [{ x: z.x + z.w / 2, y: z.y + z.h / 2 }],
      hold: <g>{scCard(V.cards[i], -a.w / 2, -a.h / 2, a.w, a.h, C, { fs: L.fs, tx })}</g> }).then((ok: boolean) => {
      busy.current = false;
      if (!ok) { queue.current = []; upd(() => ({ moving: -1 })); return; }
      api.sfx.settle();
      upd((b) => { const bin = b.bin.slice(); bin[i] = !bin[i]; return { bin, moving: -1, dirty: true }; });
      if (stage === "demo") api.did(name);
      if (ask && !free) { acted.current = ek; gateNow(); }
      if (nudged.current && ask) { nudged.current = false; api.say(item.say); }   /* the nudge is answered: the question again */
      const next = queue.current.shift();
      if (next !== undefined) setTimeout(() => tapRef.current && tapRef.current(next), 0);
    });
  };
  tapRef.current = tapCard;
  const take = () => {
    if (stepOn !== "take") { api.did("take"); return; }
    if (busy.current) return;
    const L = pickLay(1), a = L.at(0), fw = scFw(V.cards[0], 96), ox = a.x + fw + 24, ow = a.w - fw - 36, oh = a.h - 24;
    const d = Math.min(oh, (ow - 16) / 2, 300), r = d / 2, x0 = ox + (ow - (2 * d + 16)) / 2, cy = a.y + 12 + oh / 2;
    const pts = [0, 1, 2, 3, 4].map((k) => { const [x, y] = scPol(x0 + r + (k < 4 ? 0 : d + 16), cy, r * 0.55, (k % 4) * 90 + 45); return { x, y }; });
    busy.current = true;
    api.act({ tool: "hand", moves: "tap", at: pts, onPoint: (k: number) => upd(() => ({ taken: k + 1 })) }).then((ok: boolean) => {
      busy.current = false;
      if (!ok) return;
      upd(() => ({ taken: 5 }));
      api.sfx.settle();
      api.did("take");
    });
  };
  const tapWhole = (k: number) => {
    const name = "whole-" + k;
    if (stepOn !== name) { api.did(name); return; }
    if (busy.current) return;
    const w = cmpLay().wholes[k - 1];
    busy.current = true;
    api.act({ tool: "hand", moves: "tap", at: [{ x: w.x + w.w / 2, y: w.y + w.h / 2 }] }).then((ok: boolean) => {
      busy.current = false;
      if (!ok) return;
      upd(() => ({ picked: k }));
      api.sfx.tick();
      api.did(name);
    });
  };
  const act = (on: any) => {
    if (!on) return;
    if (on.startsWith("card-")) tapCard(+on.slice(5) - 1);
    else if (on === "take") take();
    else if (on.startsWith("whole-")) tapWhole(+on.slice(6));
  };
  /* Enter: in a step it performs the step; on a sort it answers with the bin (never twice unchanged after a miss).
     Never on a choice question: the runtime sends the choice key's tap through here. */
  const enterBin = () => {
    const L = live.current, v = binVal(L.bin);
    if (busy.current) return;
    if (!v) { nudged.current = true; api.say("Put a card in the bin first."); return; }
    if (!L.dirty) { nudged.current = true; api.say("Move a card first, then press Enter."); return; }
    nudged.current = false;
    upd(() => ({ dirty: false }));
    api.submit(v);
  };
  /* a word answer: one tap on its key answers (400 ms guards a double tap); the agent sets it (HOOK.set) and Enter sends it */
  const pickRef = useRef(""), tapAt = useRef(0);
  const tapOpt = (id: string) => {
    const t = Date.now();
    if (!ask || busy.current || t - tapAt.current < 400) return;
    tapAt.current = t; pickRef.current = "";
    tl.stop(); upd(() => ({ tb: null }));
    api.submit(id);
  };
  const enterPick = () => { const v = pickRef.current; if (!v) { api.say("Tap one of the answer keys."); return; } pickRef.current = ""; api.submit(v); };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : ask && V.kind === "bin" ? enterBin : ask && optsOn ? enterPick : null);
  HOOK.demo = () => act(stepOn);
  HOOK.set = (v: any) => {
    if (optsOn) { pickRef.current = String(v); api.answerReady(true); return true; }
    if (V.kind !== "bin") return undefined;
    const set = scSet(v).split(",");
    upd(() => ({ bin: V.cards.map((_: any, i: number) => set.includes("k" + (i + 1))), dirty: true, tb: null }));
    api.answerReady(true);
    return true;
  };
  const cnt = S.bin.filter(Boolean).length;
  useEffect(() => { if (ask && V.kind === "bin") api.answerReady(cnt > 0 && S.dirty); }, [ek, stage, cnt, S.dirty]);
  useEffect(() => {
    gateNow();
    return () => { if (gated.current) { gated.current = false; api.lock(false); } };
  }, [ek, stage]);

  /* the traceback: the numbers that decide light in turn, then the whole right answer (a demo layer). Nothing is locked: the
     child's next tap stops it at once and is taken (the play test: a locked 1.5 to 3.5 s swallowed taps with no sign) */
  useEffect(() => {
    if (!wrong || !ask) return;
    const K = V.kind === "bin" ? V.cards.length : 1;
    tl.run(Array.from({ length: K + 1 }).map((_, k) => [700, () => upd(() => ({ tb: k }))]));
  }, [wrong]);
  useEffect(() => () => { tl.stop(); queue.current = []; }, [ek]);
  /* the win line, one tick after the win so the phase's closing can replace the last one (NOTES.md) */
  useEffect(() => {
    if (stage !== "win" || free || !item.win) return;
    const t = setTimeout(() => api.say(item.win), 0);
    return () => clearTimeout(t);
  }, [stage, ek]);

  /* what the host and the agent read back: only what the child placed */
  api.share({ inBin: V.kind === "bin" && !free ? binVal(S.bin) : "", complete: stage === "idle" });

  const tb = S.tb, showAns = tb === 1 || done;
  /* the answer keys; the traceback ends on the right one ringed (and the win keeps it ringed), never a mark on a wrong one */
  const optCol = (mid: number) => optsOn && (
    <g>
      {optKeys(mid).map((o: any) => {
        const right = o.id === item.answer, off = !ask;
        return <g key={o.id}>
          <Key id={o.id} x={o.x} y={o.y} w={o.w} h={o.h} C={C} tone="key" label={tx(o.label)} disabled={off} onClick={() => tapOpt(o.id)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={off ? (right ? C.ink : C.dim) : toneInk("key", C.ink)}>{tx(o.label)}</text>
          </Key>
          {right && showAns && <rect pointerEvents="none" x={o.x - 6} y={o.y - 6} width={o.w + 12} height={o.h + 18} rx={RAD.key + 6} fill="none" stroke={SC_GREEN} strokeWidth={5} />}
        </g>;
      })}
    </g>
  );
  let inv: any = null;

  /* ── a sort: the tray row, the bin row below it, each card carried straight down or up ── */
  const sortBoard = () => {
    const L = sortLay(), right = scSet(item.answer).split(",");
    /* at the win the bin shows the right sort (also when the agent or the dev driver answered without placing cards) */
    const shown = !free && !warmOn && done ? V.cards.map((_: any, i: number) => right.includes("k" + (i + 1))) : S.bin;
    const litAll = (stage === "demo" && n === 3 && S.bin.every(Boolean)) || (!free && !warmOn && done);
    /* a row's name in a pill: right of the cards (roomy), else on top of the bin; one line, or two broken at a space; a 46 pitch
       keeps Hindi and Gujarati matras clear of the pill */
    const pw = L.roomy ? W - 16 - (L.x0 + L.span + 16) : Math.min(L.span - 16, 460);
    const pill = (label: string, key: string, py0: number | null, cyMid: number) => {
      const name = String(tx(label)), fits = name.length * T.label * 0.56 <= pw - 28;
      const sp = [...name].map((ch, i) => (ch === " " ? i : -1)).filter((i) => i > 0);
      const cut = sp.length ? sp.reduce((p, q) => (Math.abs(q - name.length / 2) < Math.abs(p - name.length / 2) ? q : p)) : -1;
      const lines = fits || cut < 0 ? [name] : [name.slice(0, cut), name.slice(cut + 1)];
      const ph = lines.length * 46 + 14, pwUsed = L.roomy ? pw : Math.max(...lines.map((t) => t.length)) * T.label * 0.56 + 40;
      const px = L.roomy ? L.x0 + L.span + 16 : L.x0 + 4, py = py0 ?? cyMid - ph / 2;
      return (
        <g key={key}>
          <rect x={px} y={py} width={pwUsed} height={ph} rx={14} fill={C.paper} stroke={C.rule} strokeWidth={2} />
          {lines.map((t, j) => <text key={key + j} x={L.roomy ? px + pwUsed / 2 : px + 20} y={py + 7 + 23 + j * 46} textAnchor={L.roomy ? "middle" : "start"} dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={C.ink}>{t}</text>)}
        </g>
      );
    };
    /* the end picture of a sort: both rows packed from the left (no gaps where cards left) and both named */
    const endPic = !free && !warmOn && done;
    const rowOf = (inBin: boolean) => V.cards.map((_: any, i: number) => i).filter((i: number) => shown[i] === inBin);
    const spot = (i: number) => { const a = L.at(i, shown[i]); return endPic ? { ...a, x: L.packX(rowOf(shown[i]), i) } : a; };
    return (
      <g>
        <rect x={L.x0 - 8} y={L.by} width={L.roomy ? W - 8 - (L.x0 - 8) : L.span + 16} height={L.ch + (L.roomy ? 12 : 76)} rx={20} fill={tint(C.panel, 0.35)} stroke={C.rule} strokeWidth={3} />
        {pill(V.bin, "bn", L.roomy ? null : L.by + 8, L.by + 6 + L.ch / 2)}
        {endPic && L.roomy && V.tray && pill(V.tray, "tn", null, (100 + 8 + L.ch) / 2)}
        {V.cards.map((c: any, i: number) => {
          if (S.moving === i) return null;
          const a = spot(i), lit = litAll || (tb !== null && tb > i) ? litOf : "";
          return <g key={"c" + i}>{scCard(c, a.x, a.y, a.w, a.h, C, { fs: L.fs, lit, tx })}</g>;
        })}
        {tb !== null && tb >= V.cards.length && ask && (
          <g pointerEvents="none">
            {V.cards.map((c: any, i: number) => {
              const want = right.includes("k" + (i + 1));
              if (want === S.bin[i]) return null;
              const g = L.at(i, want);
              return <g key={"g" + i}><rect x={g.x} y={g.y} width={g.w} height={g.h} rx={18} fill={C.paper} stroke={C.ink} strokeWidth={3} strokeDasharray="12 10" />
                {scFrac(g.x + g.w / 2, g.y + g.h / 2, c[1], c[2], L.fs, C, litOf)}</g>;
            })}
          </g>
        )}
        {V.cards.map((c: any, i: number) => {
          if (S.moving === i || (!ask && !free && stage !== "demo")) return null;
          const a = L.at(i, S.bin[i]);
          if (stage === "demo" && stepOn === "card-" + (i + 1)) inv = <Invite x={a.x + a.w / 2} y={a.y + a.h / 2} w={a.w} h={a.h} rx={18} C={C} />;
          return <Hit key={"h" + i} id={"card-" + (i + 1)} x={a.x} y={a.y} w={a.w} h={a.h} label={c[1] + " over " + c[2] + " " + c[0] + " card"} onPress={() => tapCard(i)} />;
        })}
      </g>
    );
  };

  /* ── one or two big cards (a choice question, or phase 2's Take warm-up) ── */
  const pickBoard = () => {
    const k = V.cards.length, L = pickLay(k), isTake = V.kind === "take";
    const lit = tb !== null || done ? litOf : "", dimTop = n === 3 && tb !== null;
    return (
      <g>
        {V.cards.map((c: any, i: number) => {
          const a = L.at(i);
          const o = isTake ? { fs: 96, tx, taken: S.taken, upto: S.taken >= 4 ? 2 : 1, discMax: 300 } : { fs: 96, lit, dimTop, tx, discMax: 300 };
          return <g key={"p" + i}>{scCard(c, a.x, a.y, a.w, a.h, C, o)}</g>;
        })}
        {optCol(L.mid)}
        {isTake && (() => {
          const kw = 240, kh = 72, cx = L.x0 + L.span / 2, x = cx - kw / 2, y = H - kh - 12, off = S.taken > 0 || stage !== "demo";
          if (stepOn === "take") inv = <Invite x={cx} y={y + kh / 2} w={kw} h={kh} rx={RAD.key} C={C} />;
          return <Key id="take" x={x} y={y} w={kw} h={kh} C={C} tone="key" label={tx("Take")} disabled={off} onClick={() => act("take")}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={off ? C.dim : toneInk("key", C.ink)}>{tx("Take")}</text>
          </Key>;
        })()}
      </g>
    );
  };

  /* ── two equal wholes to compare (phase 4) ── */
  const cmpBoard = () => {
    const L = cmpLay(), demo = stage === "demo";
    const big = demo ? S.picked : showAns ? ({ "c-gt": 1, "c-sm": 2 } as any)[item.answer] || 0 : 0;
    const eq = !demo && showAns && item.answer === "c-eq";
    return (
      <g>
        {L.wholes.map((w: any, i: number) => {
          const c = V.cards[i], lit = tb !== null || done ? litOf : "";
          return (
            <g key={"w" + i}>
              {scFrac(w.fx, w.fy, c[1], c[2], L.fs, C, lit)}
              {L.bar ? scBar(w.x, w.y, w.w, w.h, c[2], c[1], C) : scDisc(c[0], w.x + w.w / 2, w.y + w.h / 2, w.w / 2, c[2], c[1], C)}
              {big === i + 1 && (L.bar
                ? <g pointerEvents="none"><rect x={w.x - 10} y={w.y - 10} width={w.w + 20} height={w.h + 20} rx={14} fill="none" stroke={SC_VERM} strokeWidth={7} />
                    <text x={w.x + w.w + 26} y={w.y + w.h / 2 + 14} fontSize={T.prompt} fontWeight={700} fill={SC_VINK}>{tx("Bigger")}</text></g>
                : <g pointerEvents="none"><circle cx={w.x + w.w / 2} cy={w.y + w.h / 2} r={w.w / 2 + 12} fill="none" stroke={SC_VERM} strokeWidth={7} />
                    <text x={w.x + w.w / 2} y={w.y + w.h + 46} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={SC_VINK}>{tx("Bigger")}</text></g>)}
              {demo && (() => {
                if (stepOn === "whole-" + (i + 1)) inv = <Invite x={w.x + w.w / 2} y={w.y + w.h / 2} w={w.w} h={w.h} rx={14} C={C} />;
                return <Hit id={"whole-" + (i + 1)} x={w.x} y={w.y} w={w.w} h={w.h} label={c[1] + " over " + c[2] + " " + c[0]} onPress={() => tapWhole(i + 1)} />;
              })()}
            </g>
          );
        })}
        {eq && !L.bar && <text x={L.mid} y={L.wholes[0].fy} textAnchor="middle" dominantBaseline="central" fontSize={T.display + 24} fontWeight={700} fill={C.ink} pointerEvents="none">=</text>}
        {optCol(L.mid)}
      </g>
    );
  };

  const board = V.kind === "bin" ? sortBoard() : V.kind === "cmp" ? cmpBoard() : pickBoard();
  return <g>{board}{inv}</g>;
}

/* the summary page's small drawing of the child's last right answer: its fractions, stacked, and for a compare the sign
   (no words, so Hindi and Gujarati carry no Latin letter) */
function Thumb({ result, it, C, w, h }: any) {
  if (!it || !result || !result.last) return null;
  const set = scSet(result.last.value).split(",");
  const cs = it.kind === "bin" ? it.cards.filter((_: any, i: number) => set.includes("k" + (i + 1))) : it.cards;
  const sym = it.kind === "cmp" ? ({ "c-gt": ">", "c-sm": "<", "c-eq": "=" } as any)[it.answer] : "";
  const step = 76, x0 = w / 2 - ((cs.length - 1) * step) / 2;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {cs.map((c: any, i: number) => <g key={i}>{scFrac(x0 + i * step, h / 2, c[1], c[2], 30, C)}</g>)}
      {sym && <text x={w / 2} y={h / 2} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={C.ink}>{sym}</text>}
    </g>
  );
}

function SortAndCompare(props: any) {
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
      bigPad: false,   /* the pick and compare boards keep one place at the open width; 1086 gives them more room than 900 */
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

export default SortAndCompare;
