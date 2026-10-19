/* ═══ M3.S6.T10.C45.2D1 · three_ways · Three Ways Recorder ════════════════════════════════
   runtime (r55, silent, keyOnly + navDots + nextKey + bigPad + cardAnswer) is prepended at build. This file draws only the
   working area: a row of three record cards (one measure, three forms) in phase 1, a class record chart in phases 2 to 4
   (rows to flip into one unit and drag into order, bags whose weights are added, drinks poured from a measuring jug).
   Every act (Flip, a card turned into the chart's unit, Pour) is performed on screen through api.act (the hand).
   The question lives only in the bubble (keyOnly). NO imports; only the five host hooks. */

const TOOL_ID = "three_ways";
const MEDIA_ID = "M3.S6.T10.C45.2D1";
const TOOL_NAME = "Three Ways Recorder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* not shown (phase 1 opens on guide steps); kept for the sidecar */
const OPENING = ["A class record chart, with a card to fill in."];
/* not shown from r44 (the simple summary page) */
const FINISH_LINE = "You wrote real measures three ways, put them in order and added them.";
/* printed when the child opens Free play; its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Flip a card through its three forms.";

const START_HOOK = "Can one long jump be written in three different ways?";

/* ── colours, measures and small drawing helpers (module scope, called, never mounted) ─────────── */
const TW_BLUE = CONTENT.hundred, TW_GREEN = CONTENT.one, TW_AMBER = CONTENT.ten, TW_GREY = "#767676", TW_VIOLET = "#6A4AA5", TW_WATER = "#BFE3F6";
const twInk = (c: string) => shade(c, 0.25);
const TW_AMBER_INK = shade(CONTENT.ten, 0.45);
const twNum = (v: number) => (v >= 1000 ? indian(v) : String(v));
/* the decimal form of big + small/per, written the way the book writes it (no zero on the end) */
const twDec = (big: number, small: number, per: number) => {
  const d = String(small).padStart(per === 100 ? 2 : 3, "0").replace(/0+$/, "");
  return d ? big + "." + d : String(big);
};
/* a measure is a list of [number, unit] pairs: [["3", "m"], ["7", "cm"]] */
const twTwo = (m: any) => (m.big && m.small ? [[String(m.big), m.uL], [String(m.small), m.uS]] : m.big ? [[String(m.big), m.uL]] : [[String(m.small), m.uS]]);
const twSmall = (m: any) => [[twNum(m.big * m.per + m.small), m.uS]];
const twDecF = (m: any) => [[twDec(m.big, m.small, m.per), m.uL]];
/* the width of a text at font size fs (PATTERNS §18): every letter and SPACING vowel sign counts; only the zero-advance marks
   (Devanagari and Gujarati) take no width */
const TW_ZERO = /[\u0900-\u0902\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0A81\u0A82\u0ABC\u0AC1-\u0AC8\u0ACD\u0AE2\u0AE3]/;
const twTW = (txt: any, fs: number) => {
  let w = 0;
  for (const ch of String(txt)) w += TW_ZERO.test(ch) ? 0 : /[0-9]/.test(ch) ? 0.62 : /[\u0900-\u0aff]/.test(ch) ? 0.68 : ch === " " ? 0.28
    : /[.,]/.test(ch) ? 0.3 : /[mwMW]/.test(ch) ? 0.9 : /[A-Z]/.test(ch) ? 0.7 : 0.58;
  return w * fs;
};
/* the width of a measure at font size fs (digits at fs, units at 0.62 fs), its units measured as PRINTED (tx) */
const twW = (pairs: any[], fs: number, tx?: any) => pairs.reduce((a: number, pr: any, k: number) =>
  a + twTW(pr[0], fs) + twTW(" " + (tx ? tx(pr[1]) : pr[1]), Math.max(T.micro, 0.62 * fs)) + (k ? 0.3 * fs : 0), 0);
const twFit = (pairs: any[], room: number, top: number, tx?: any) => {
  let f = top;
  while (f > T.label && twW(pairs, f, tx) > room) f -= 2;
  return f;
};
function twMeas(pairs: any[], x: number, y: number, fs: number, fill: string, tx: any, anchor = "middle") {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={fs} fontWeight={700} fill={fill}>
      {pairs.map((pr: any, k: number) => (
        <tspan key={k}>{(k ? " " : "") + pr[0]}<tspan fontSize={Math.max(T.micro, 0.62 * fs)} fontWeight={600}>{" " + tx(pr[1])}</tspan></tspan>
      ))}
    </text>
  );
}
/* a row of measures and signs, centred on cx: [{ p: pairs, c }, { s: "=", c }, ...]; each piece is its own text */
function twChain(pieces: any[], cx: number, y: number, fs: number, tx: any, key = "ch") {
  const gap = 0.32 * fs;
  const ws = pieces.map((q: any) => (q.s ? 0.62 * fs : twW(q.p, fs, tx)));
  const tot = ws.reduce((a: number, b: number) => a + b, 0) + gap * (pieces.length - 1);
  let x = cx - tot / 2;
  return pieces.map((q: any, k: number) => {
    const mid = x + ws[k] / 2;
    x += ws[k] + gap;
    return q.s ? <text key={key + k} x={mid} y={y} textAnchor="middle" fontSize={fs} fontWeight={700} fill={q.c}>{q.s}</text>
      : <g key={key + k}>{twMeas(q.p, mid, y, fs, q.c, tx)}</g>;
  });
}
/* a chip's label, centred on the key (0, 0): one line when it fits 14 clear of each edge, else the number over its unit */
function twChipLab(pr: any[], w: number, fill: string, tx: any) {
  if (twW([pr], T.label, tx) <= w - 28) return twMeas([pr], 0, 11, T.label, fill, tx);
  return (
    <g>
      <text x={0} y={-2} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={fill}>{pr[0]}</text>
      <text x={0} y={30} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={fill}>{tx(pr[1])}</text>
    </g>
  );
}
/* a record card's face: given (blue), same measure (green), being worked on now (amber), or face down */
function twFace(x: number, y: number, w: number, h: number, tone: string, C: any) {
  if (tone === "back") return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={22} fill={tint(C.rule, 0.45)} stroke={shade(C.rule, 0.35)} strokeWidth={3} />
      <rect x={x + 14} y={y + 14} width={w - 28} height={h - 28} rx={14} fill="none" stroke={shade(C.rule, 0.15)} strokeWidth={3} strokeDasharray="14 10" />
    </g>
  );
  const base = tone === "given" ? TW_BLUE : tone === "same" ? TW_GREEN : TW_AMBER;
  return <rect x={x} y={y} width={w} height={h} rx={22} fill={tint(base, 0.86)} stroke={shade(base, 0.12)} strokeWidth={4} filter="url(#fShadowSoft)" />;
}
const twToneInk = (tone: string, C: any) => (tone === "given" ? twInk(TW_BLUE) : tone === "same" ? twInk(TW_GREEN) : tone === "now" ? TW_AMBER_INK : C.ink);
/* a decimal card's two boxes, [whole] . [decimal] unit, centred in (x, w); vals are digit strings; act = the box with the caret */
function twDecBoxes(x: number, y: number, w: number, h: number, unit: string, vals: string[], act: number, ink: string, C: any, tx: any) {
  /* the whole group (two boxes, the point, the unit) is sized to the card, 16 clear of each edge, so a longer Hindi or Gujarati unit
     never hangs out of it */
  const tot = 66 + 26 + 104 + 12 + twTW(tx(unit), T.prompt) + 4, k = Math.min(1, (w - 32) / tot);
  const ww = 66 * k, dw = 104 * k, pw = 26 * k, uf = Math.max(T.micro, T.prompt * k);
  const x0 = x + (w - tot * k) / 2, bh = Math.min(96, h);
  const box = (bx: number, bw: number, v: string, j: number) => {
    const fs = Math.max(T.micro, (v.length > 3 ? T.prompt : T.xl) * Math.max(k, 0.8));
    return (
      <g key={"db" + j}>
        <rect x={bx} y={y} width={bw} height={bh} rx={14} fill={act === j ? tint(TW_AMBER, 0.7) : "#FFFFFF"} stroke={act === j ? shade(TW_AMBER, 0.2) : shade(C.rule, 0.3)} strokeWidth={act === j ? 5 : 3} />
        <text x={bx + bw / 2} y={y + bh / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{v}</text>
        {act === j && <rect className="c4-caret" x={bx + bw / 2 + v.length * 0.3 * fs + 4} y={y + 18} width={4} height={bh - 36} fill={TW_AMBER_INK} />}
      </g>
    );
  };
  return (
    <g>
      {box(x0, ww, vals[0] || "", 0)}
      <circle cx={x0 + ww + pw / 2} cy={y + bh - 16} r={7} fill={ink} />
      {box(x0 + ww + pw, dw, vals[1] || "", 1)}
      <text x={x0 + ww + pw + dw + 12 * k} y={y + bh / 2 + 14} fontSize={uf} fontWeight={600} fill={ink}>{tx(unit)}</text>
    </g>
  );
}
/* a small bag (the weights of phase 2 and 3) and a cup (phase 4): plain shapes, skin-ready */
function twBag(x: number, y: number, s: number) {
  return (
    <g>
      <path d={`M ${x + s * 0.3} ${y + s * 0.28} Q ${x + s * 0.5} ${y - s * 0.02} ${x + s * 0.7} ${y + s * 0.28}`} fill="none" stroke="#7A5A2E" strokeWidth={4} />
      <rect x={x + s * 0.12} y={y + s * 0.26} width={s * 0.76} height={s * 0.7} rx={s * 0.14} fill="#E3C38E" stroke="#7A5A2E" strokeWidth={3} />
    </g>
  );
}
/* a school bag beside a weight: the plain bag, then its skin over it (never anything written on it) */
function twBagSk(x: number, y: number) {
  return <g>{twBag(x, y, 56)}<Skin name="bag" x={x + 3} y={y - 2} w={50} h={60} fit="stretch" /></g>;
}
/* a parcel: a plain box tied with tape (a school bag's picture would contradict its name) */
function twParcel(x: number, y: number, s: number) {
  return (
    <g>
      <rect x={x + s * 0.1} y={y + s * 0.2} width={s * 0.8} height={s * 0.7} rx={6} fill="#D9B98A" stroke="#7A5A2E" strokeWidth={3} />
      <line x1={x + s * 0.5} x2={x + s * 0.5} y1={y + s * 0.2} y2={y + s * 0.9} stroke="#7A5A2E" strokeWidth={4} />
      <line x1={x + s * 0.1} x2={x + s * 0.9} y1={y + s * 0.5} y2={y + s * 0.5} stroke="#7A5A2E" strokeWidth={4} />
    </g>
  );
}
/* the three reading chips of a drink in the jug: the true reading, the jug's nearest numbered mark and the drink's own x; in order */
const twRead = (d: any) => [d.ml, Math.round(d.ml / 100) * 100, d.x].sort((a, b) => a - b);
function twCup(x: number, y: number, s: number, full: boolean) {
  return (
    <g>
      <path d={`M ${x + s * 0.12} ${y + s * 0.1} L ${x + s * 0.88} ${y + s * 0.1} L ${x + s * 0.76} ${y + s * 0.95} L ${x + s * 0.24} ${y + s * 0.95} Z`} fill="#FFFFFF" stroke={shade(TW_BLUE, 0.3)} strokeWidth={3} />
      {full && <path d={`M ${x + s * 0.17} ${y + s * 0.42} L ${x + s * 0.83} ${y + s * 0.42} L ${x + s * 0.76} ${y + s * 0.95} L ${x + s * 0.24} ${y + s * 0.95} Z`} fill={TW_WATER} stroke="none" />}
    </g>
  );
}
/* free play: real measures to flip through their three forms */
const FREE_SET = [
  { big: 2, small: 46, per: 100, uL: "m", uS: "cm" }, { big: 1, small: 250, per: 1000, uL: "kg", uS: "g" },
  { big: 2, small: 350, per: 1000, uL: "L", uS: "mL" }, { big: 4, small: 60, per: 100, uL: "m", uS: "cm" },
  { big: 2, small: 85, per: 1000, uL: "kg", uS: "g" }, { big: 1, small: 500, per: 1000, uL: "km", uS: "m" },
];

/* THE START PAGE: the record chart, a record card and a measuring jug, in the 1200 x 340 box */
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  void lang;
  return (
    <g>
      <rect x={70} y={20} width={380} height={300} rx={22} fill={tint(C.panel, 0.4)} stroke={shade(C.rule, 0.3)} strokeWidth={4} />
      <text x={260} y={70} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Class record")}</text>
      {[0, 1, 2, 3].map((r) => <rect key={r} x={100} y={96 + r * 54} width={320} height={40} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />)}
      <rect x={520} y={58} width={280} height={210} rx={22} fill={tint(C.rule, 0.45)} stroke={shade(C.rule, 0.35)} strokeWidth={3} transform="rotate(-6 660 163)" />
      <rect x={540} y={52} width={280} height={210} rx={22} fill={tint(C.rule, 0.45)} stroke={shade(C.rule, 0.35)} strokeWidth={3} transform="rotate(4 680 157)" />
      {twFace(560, 70, 280, 210, "given", C)}
      {twMeas([["2", "m"], ["46", "cm"]], 700, 200, T.display, twInk(TW_BLUE), tx)}
      <path d="M 930 40 L 1090 40 L 1080 310 L 940 310 Z" fill="#FFFFFF" stroke={C.ink} strokeWidth={4} />
      <path d="M 937 170 L 1083 170 L 1080 310 L 940 310 Z" fill={TW_WATER} />
      <path d="M 1088 80 Q 1116 90 1112 170 Q 1108 230 1084 236" fill="none" stroke={C.ink} strokeWidth={8} />
      {/* the start page's jug wears the picture (no reading is made here); the working jug stays plain so its level reads */}
      <Skin name="jug" x={904} y={40} w={212} h={270} fit="stretch" />
      {[0, 1, 2, 3, 4, 5].map((k) => <line key={k} x1={952} x2={k % 2 ? 972 : 987} y1={296 - k * 44} y2={296 - k * 44} stroke={C.ink} strokeWidth={3} />)}
    </g>
  );
}

/* Hindi and Gujarati: filled in the language pass, once the English is final */
const TR: any = {
  hi: {
    "Three Ways Recorder": "तीन रूपों में माप",
    "Free play. Flip a card through its three forms.": "मुक्त खेल। कार्ड को उसके तीनों रूपों में पलटो।",
    "Can one long jump be written in three different ways?": "क्या एक लंबी कूद को तीन तरह से लिखा जा सकता है?",
    "One measure, three ways": "एक माप, तीन रूप",
    "This card holds a long jump of 2 m 46 cm; tap Flip to see it in centimetres.": "इस कार्ड पर 2 मी 46 सेमी की कूद है; सेंटीमीटर में देखने को पलटो दबाओ।",
    "Tap the Flip key under the cards.": "कार्डों के नीचे पलटो बटन दबाओ।",
    "Tap Flip again to see the same jump as a decimal in metres.": "वही कूद मीटर में दशमलव में देखने को फिर पलटो दबाओ।",
    "The Flip key turns the next card.": "पलटो बटन अगला कार्ड पलटता है।",
    "7 cm is 7 hundredths of a metre.": "7 सेमी, एक मीटर के 7 सौवें भाग हैं।",
    "The tenths place is empty, so a zero must hold it.": "दसवें का स्थान खाली है, इसलिए वहाँ शून्य रखना होगा।",
    "One measure can be written in two units, in its smallest unit, or as a decimal.": "एक माप दो मात्रकों में, सबसे छोटे मात्रक में या दशमलव में लिख सकते हैं।",
    "You learned: one measure can be written in three ways.": "तुमने सीखा: एक माप तीन तरह से लिखा जा सकता है।",
    "Now write a jump of 3 m 7 cm as a decimal in metres on the Decimal card.": "अब 3 मी 7 सेमी की कूद को दशमलव कार्ड पर मीटर में लिखो।",
    "3 m 7 cm in metres?": "3 मी 7 सेमी, मीटर में?",
    "How many centimetres make 1 m?": "1 मी में कितने सेंटीमीटर होते हैं?",
    "A packet's label says 1 kg 250 g; write that weight in grams on the next card.": "पैकेट पर 1 किग्रा 250 ग्रा लिखा है; अगले कार्ड पर यह वज़न ग्राम में लिखो।",
    "1 kg 250 g in grams?": "1 किग्रा 250 ग्रा, ग्राम में?",
    "How many grams make 1 kg?": "1 किग्रा में कितने ग्राम होते हैं?",
    "1 kg is 1,000 g, so start from 1,000.": "1 किग्रा में 1,000 ग्रा होते हैं, तो 1,000 से शुरू करो।",
    "Add the 250 g to the 1,000 g.": "1,000 ग्रा में 250 ग्रा जोड़ो।",
    "Write 4 m 60 cm as a decimal in metres.": "4 मी 60 सेमी को मीटर में दशमलव में लिखो।",
    "4 m 60 cm in metres?": "4 मी 60 सेमी, मीटर में?",
    "Is 60 cm more or less than half a metre?": "60 सेमी आधे मीटर से ज़्यादा है या कम?",
    "Every 10 cm is one tenth of a metre.": "हर 10 सेमी, मीटर का एक दसवाँ भाग है।",
    "Count how many tenths of a metre 60 cm makes.": "गिनो, 60 सेमी में मीटर के कितने दसवें भाग हैं।",
    "Ordering real measures": "असली मापों का क्रम",
    "Tap the 1.5 m card to write that jump in centimetres.": "उस कूद को सेंटीमीटर में लिखने को 1.5 मी वाला कार्ड दबाओ।",
    "Tap the card that shows 1.5 m.": "जिस कार्ड पर 1.5 मी है, उसे दबाओ।",
    "Tap the chip that is the same length as 1.5 m.": "वह संख्या दबाओ जो 1.5 मी जितनी लंबी है।",
    "Half a metre is 50 cm.": "आधा मीटर 50 सेमी होता है।",
    "208 cm is less than 2 m 15 cm, which is 215 cm.": "208 सेमी, 2 मी 15 सेमी यानी 215 सेमी से कम है।",
    "In centimetres they are 215, 250, 208 and 251: order those.": "सेंटीमीटर में ये 215, 250, 208 और 251 हैं: इन्हें क्रम में रखो।",
    "Write every measure in the same unit first, then put them in order.": "पहले हर माप को एक ही मात्रक में लिखो, फिर क्रम में रखो।",
    "You learned: write measures in the same unit, then put them in order.": "तुमने सीखा: माप एक ही मात्रक में लिखकर क्रम में रखो।",
    "Flip the cards, then drag the rows from the shortest jump to the longest.": "कार्ड पलटो, फिर पंक्तियों को सबसे छोटी से सबसे लंबी कूद तक खिसकाओ।",
    "Shortest first?": "सबसे छोटी पहले?",
    "Compare the jumps in centimetres, not by their first number.": "कूदों की तुलना सेंटीमीटर में करो, पहली संख्या से नहीं।",
    "Before you put jumps in order, what must you do first?": "कूदों को क्रम में रखने से पहले क्या करना ज़रूरी है?",
    "First step?": "पहला कदम?",
    "Can you compare 2.5 m with 208 cm as they are?": "क्या तुम 2.5 मी और 208 सेमी की तुलना ऐसे ही कर सकते हो?",
    "A first digit of 2 can mean 2 m or 208 cm.": "पहला अंक 2 हो तो उसका मतलब 2 मी या 208 सेमी हो सकता है।",
    "How did the chart change once every card was flipped?": "हर कार्ड पलटने के बाद चार्ट कैसे बदला?",
    "Same units": "एक मात्रक",
    "First digit": "पहला अंक",
    "Put the bags in order from the lightest to the heaviest.": "थैलों को सबसे हल्के से सबसे भारी के क्रम में रखो।",
    "Lightest first?": "सबसे हल्का पहले?",
    "Write every bag's weight in grams before you order them.": "क्रम लगाने से पहले हर थैले का वज़न ग्राम में लिखो।",
    "1 kg 80 g is 1,080 g, not 1,800 g.": "1 किग्रा 80 ग्रा यानी 1,080 ग्रा, 1,800 ग्रा नहीं।",
    "In grams they are 1,080 g, 1,800 g and 1,008 g: order those.": "ग्राम में ये 1,080 ग्रा, 1,800 ग्रा और 1,008 ग्रा हैं: इन्हें क्रम में रखो।",
    "Weights of a group": "एक समूह के वज़न",
    "Tap the card of Bag 1 to write its weight in grams.": "थैला 1 का वज़न ग्राम में लिखने को उसका कार्ड दबाओ।",
    "Tap the weight card in the top row.": "सबसे ऊपर की पंक्ति का वज़न कार्ड दबाओ।",
    "Tap the chip that weighs the same as 2 kg 50 g.": "वह संख्या दबाओ जो 2 किग्रा 50 ग्रा के बराबर है।",
    "1 kg is 1,000 g.": "1 किग्रा में 1,000 ग्रा होते हैं।",
    "Add the thousands again.": "हज़ारों को फिर से जोड़ो।",
    "Take 1,000 g out of the total for each kilogram.": "हर किलोग्राम के लिए कुल में से 1,000 ग्रा अलग करो।",
    "Add weights in grams, then write the total back in kilograms and grams.": "वज़न ग्राम में जोड़ो, फिर कुल को किलोग्राम और ग्राम में लिखो।",
    "You learned: add weights in grams, then write them back in kg and g.": "तुमने सीखा: वज़न ग्राम में जोड़कर किग्रा और ग्रा में लिखो।",
    "Flip the cards, then add the three bags in kilograms and grams.": "कार्ड पलटो, फिर तीनों थैलों का कुल किलोग्राम और ग्राम में लिखो।",
    "Total in kg and g?": "कुल, किग्रा और ग्रा में?",
    "Add the grams of the three fruits.": "तीनों फलों के ग्राम जोड़ो।",
    "kg": "किग्रा",
    "g": "ग्रा",
    "How many grams do the two bags weigh in all?": "दोनों थैलों का कुल वज़न कितने ग्राम है?",
    "Total in grams?": "कुल, ग्राम में?",
    "Add the grams of the two bags.": "दोनों थैलों के ग्राम जोड़ो।",
    "Line the grams up by place, then add again.": "ग्राम को स्थान के अनुसार नीचे-नीचे लिखो, फिर जोड़ो।",
    "Add 2,450 g and 1,675 g.": "2,450 ग्रा और 1,675 ग्रा जोड़ो।",
    "Write the three parcels' total as a decimal in kilograms on the total card.": "तीनों पार्सलों का कुल, कुल वाले कार्ड पर किलोग्राम में दशमलव में लिखो।",
    "Total in kg?": "कुल, किग्रा में?",
    "What is each parcel's weight in grams?": "हर पार्सल का वज़न ग्राम में कितना है?",
    "Add the three weights in grams again, place by place.": "तीनों वज़न ग्राम में फिर से, स्थान के अनुसार जोड़ो।",
    "Write the grams total as kilograms: 1,000 g make 1 kg.": "ग्राम के कुल को किलोग्राम में लिखो: 1,000 ग्रा से 1 किग्रा बनता है।",
    "Water drunk by a group": "एक समूह ने कितना पानी पिया",
    "Tap Pour to measure a glass of water in the jug.": "जग में एक गिलास पानी मापने को डालो दबाओ।",
    "Tap the Pour key under the jug.": "जग के नीचे डालो बटन दबाओ।",
    "Read the water's level in the Zoom window, then tap that reading.": "बड़े दृश्य में पानी का स्तर पढ़ो, फिर वही माप दबाओ।",
    "Count the small marks up from 100 mL.": "100 मिली से ऊपर के छोटे निशान गिनो।",
    "1,000 mL make 1 L.": "1,000 मिली से 1 ली बनता है।",
    "Take 1,000 mL out of the total as one litre.": "कुल में से 1,000 मिली को एक लीटर मानकर अलग करो।",
    "Read each drink on the jug, then add the millilitres and bundle the litres.": "हर पेय जग पर पढ़ो, फिर मिलीलीटर जोड़कर लीटर बनाओ।",
    "You learned: read each drink on a jug, then add and write L and mL.": "तुमने सीखा: हर पेय जग पर पढ़ो, जोड़ो और ली व मिली में लिखो।",
    "Pour and read each drink, then write what the five drank in L and mL.": "हर पेय डालो और पढ़ो, फिर पाँचों ने जितना पिया, ली और मिली में लिखो।",
    "Total in L and mL?": "कुल, ली और मिली में?",
    "Add the millilitres of all five drinks.": "पाँचों पेयों के मिलीलीटर जोड़ो।",
    "L": "ली",
    "mL": "मिली",
    "Why is each drink poured into a measuring jug first?": "हर पेय पहले मापक जग में क्यों डाला जाता है?",
    "Why the jug?": "जग क्यों?",
    "Look at the lines on the side of the jug.": "जग के किनारे बनी रेखाओं को देखो।",
    "A guess can change from one child to the next.": "अंदाज़ा हर बच्चे का अलग हो सकता है।",
    "Which choice lets two children get the same number?": "किस विकल्प से दो बच्चों को एक ही संख्या मिलेगी?",
    "Marks in mL": "मिली के निशान",
    "It is large": "यह बड़ा जग है",
    "Measure each cup in the jug, then total them in litres and millilitres.": "हर कप जग में मापो, फिर कुल को लीटर और मिलीलीटर में लिखो।",
    "Four cups in L and mL?": "चार कप, ली और मिली में?",
    "Add the four cups in millilitres first.": "पहले चारों कप मिलीलीटर में जोड़ो।",
    "325 + 410 + 195 + 290 gives the total in mL.": "325 + 410 + 195 + 290 करने पर कुल मिली आता है।",
    "Every 1,000 mL of the total is 1 L.": "कुल के हर 1,000 मिली, 1 ली होते हैं।",
    "Yes, 3 m 7 cm is 307 cm, which is 3.07 m.": "हाँ, 3 मी 7 सेमी यानी 307 सेमी, यानी 3.07 मी।",
    "Yes, 1 kg 250 g is 1,250 g.": "हाँ, 1 किग्रा 250 ग्रा यानी 1,250 ग्रा।",
    "Yes, 4 m 60 cm is 4.6 m.": "हाँ, 4 मी 60 सेमी यानी 4.6 मी।",
    "Yes, the jumps now rise from 208 cm to 251 cm.": "हाँ, अब कूदें 208 सेमी से 251 सेमी तक बढ़ती हैं।",
    "Yes, one unit first, then the order is easy to see.": "हाँ, पहले एक मात्रक, फिर क्रम आसानी से दिखता है।",
    "Yes, the bags go from 1,008 g to 1,800 g.": "हाँ, थैले 1,008 ग्रा से 1,800 ग्रा तक जाते हैं।",
    "Yes, the three bags weigh 5 kg 625 g.": "हाँ, तीनों थैलों का वज़न 5 किग्रा 625 ग्रा है।",
    "Yes, the two bags weigh 4,125 g.": "हाँ, दोनों थैलों का वज़न 4,125 ग्रा है।",
    "Yes, the parcels weigh 3.17 kg.": "हाँ, पार्सलों का वज़न 3.17 किग्रा है।",
    "Yes, the five children drank 1 L 150 mL.": "हाँ, पाँचों बच्चों ने 1 ली 150 मिली पानी पिया।",
    "Yes, the jug's marks let us read each drink.": "हाँ, जग के निशानों से हर पेय पढ़ा जा सकता है।",
    "Yes, the four cups hold 1 L 220 mL.": "हाँ, चारों कपों में 1 ली 220 मिली है।",
    "Class record": "कक्षा रिकॉर्ड",
    "Two units": "दो मात्रक",
    "Smallest unit": "सबसे छोटा मात्रक",
    "Decimal": "दशमलव",
    "m": "मी",
    "cm": "सेमी",
    "km": "किमी",
    "tenths": "दसवें",
    "hundredths": "सौवें",
    "thousandths": "हज़ारवें",
    "Place holder": "स्थानधारक",
    "Flip": "पलटो",
    "New card": "नया कार्ड",
    "Pour": "डालो",
    "Total": "कुल",
    "Zoom": "बड़ा दृश्य",
    "Decimal card": "दशमलव कार्ड",
    "whole": "पूर्ण भाग",
    "decimal": "दशमलव भाग",
    "Name": "नाम",
    "Jump": "कूद",
    "In cm": "सेमी में",
    "Bag": "थैला",
    "Weight": "वज़न",
    "In g": "ग्रा में",
    "Parcel": "पार्सल",
    "Water": "पानी",
    "Cup": "कप",
    "Bag A": "थैला क",
    "Bag B": "थैला ख",
    "Bag C": "थैला ग",
    "Bag 1": "थैला 1",
    "Bag 2": "थैला 2",
    "Apples": "सेब",
    "Mangoes": "आम",
    "Oranges": "संतरे",
    "Parcel A": "पार्सल क",
    "Parcel B": "पार्सल ख",
    "Parcel C": "पार्सल ग",
    "Glass": "गिलास",
    "Cup 1": "कप 1",
    "Cup 2": "कप 2",
    "Cup 3": "कप 3",
    "Cup 4": "कप 4",
    "Item": "वस्तु",
    "Turn every weight into grams first.": "पहले हर वज़न को ग्राम में बदलो।",
    "Read every drink on the jug first.": "पहले हर पेय को जग पर पढ़ो।",
    "Asha": "आशा", "Ravi": "रवि", "Meena": "मीना", "Kabir": "कबीर", "Zara": "ज़ारा", "Dev": "देव", "Ira": "इरा", "Sam": "सैम",
  },
  gu: {
    "Three Ways Recorder": "ત્રણ રૂપમાં માપ",
    "Free play. Flip a card through its three forms.": "મુક્ત રમત. કાર્ડને તેનાં ત્રણેય રૂપમાં ફેરવો.",
    "Can one long jump be written in three different ways?": "શું એક લાંબો કૂદકો ત્રણ રીતે લખી શકાય?",
    "One measure, three ways": "એક માપ, ત્રણ રૂપ",
    "This card holds a long jump of 2 m 46 cm; tap Flip to see it in centimetres.": "આ કાર્ડ પર 2 મી 46 સેમીનો કૂદકો છે; સેન્ટિમીટરમાં જોવા ફેરવો દબાવો.",
    "Tap the Flip key under the cards.": "કાર્ડની નીચે ફેરવો બટન દબાવો.",
    "Tap Flip again to see the same jump as a decimal in metres.": "એ જ કૂદકો મીટરમાં દશાંશમાં જોવા ફરી ફેરવો દબાવો.",
    "The Flip key turns the next card.": "ફેરવો બટન પછીનું કાર્ડ ફેરવે છે.",
    "7 cm is 7 hundredths of a metre.": "7 સેમી એટલે એક મીટરના 7 શતાંશ.",
    "The tenths place is empty, so a zero must hold it.": "દશાંશનું સ્થાન ખાલી છે, તેથી ત્યાં શૂન્ય મૂકવું પડે.",
    "One measure can be written in two units, in its smallest unit, or as a decimal.": "એક માપ બે એકમમાં, સૌથી નાના એકમમાં કે દશાંશમાં લખી શકાય.",
    "You learned: one measure can be written in three ways.": "તમે શીખ્યા: એક માપ ત્રણ રીતે લખી શકાય.",
    "Now write a jump of 3 m 7 cm as a decimal in metres on the Decimal card.": "હવે 3 મી 7 સેમીનો કૂદકો દશાંશ કાર્ડ પર મીટરમાં લખો.",
    "3 m 7 cm in metres?": "3 મી 7 સેમી, મીટરમાં?",
    "How many centimetres make 1 m?": "1 મીમાં કેટલા સેન્ટિમીટર થાય?",
    "A packet's label says 1 kg 250 g; write that weight in grams on the next card.": "પેકેટ પર 1 કિગ્રા 250 ગ્રા લખ્યું છે; આગલા કાર્ડ પર આ વજન ગ્રામમાં લખો.",
    "1 kg 250 g in grams?": "1 કિગ્રા 250 ગ્રા, ગ્રામમાં?",
    "How many grams make 1 kg?": "1 કિગ્રામાં કેટલા ગ્રામ થાય?",
    "1 kg is 1,000 g, so start from 1,000.": "1 કિગ્રામાં 1,000 ગ્રા થાય, તેથી 1,000થી શરૂ કરો.",
    "Add the 250 g to the 1,000 g.": "1,000 ગ્રામાં 250 ગ્રા ઉમેરો.",
    "Write 4 m 60 cm as a decimal in metres.": "4 મી 60 સેમીને મીટરમાં દશાંશમાં લખો.",
    "4 m 60 cm in metres?": "4 મી 60 સેમી, મીટરમાં?",
    "Is 60 cm more or less than half a metre?": "60 સેમી અડધા મીટરથી વધારે છે કે ઓછું?",
    "Every 10 cm is one tenth of a metre.": "દર 10 સેમી એટલે મીટરનો એક દશાંશ.",
    "Count how many tenths of a metre 60 cm makes.": "ગણો, 60 સેમીમાં મીટરના કેટલા દશાંશ છે.",
    "Ordering real measures": "સાચાં માપનો ક્રમ",
    "Tap the 1.5 m card to write that jump in centimetres.": "એ કૂદકો સેન્ટિમીટરમાં લખવા 1.5 મીવાળું કાર્ડ દબાવો.",
    "Tap the card that shows 1.5 m.": "જે કાર્ડ પર 1.5 મી છે તે દબાવો.",
    "Tap the chip that is the same length as 1.5 m.": "જે સંખ્યા 1.5 મી જેટલી લાંબી છે તે દબાવો.",
    "Half a metre is 50 cm.": "અડધો મીટર 50 સેમી થાય.",
    "208 cm is less than 2 m 15 cm, which is 215 cm.": "208 સેમી એ 2 મી 15 સેમી એટલે 215 સેમીથી ઓછું છે.",
    "In centimetres they are 215, 250, 208 and 251: order those.": "સેન્ટિમીટરમાં એ 215, 250, 208 અને 251 છે: તેમને ક્રમમાં મૂકો.",
    "Write every measure in the same unit first, then put them in order.": "પહેલાં દરેક માપ એક જ એકમમાં લખો, પછી ક્રમમાં મૂકો.",
    "You learned: write measures in the same unit, then put them in order.": "તમે શીખ્યા: માપ એક જ એકમમાં લખીને ક્રમમાં મૂકો.",
    "Flip the cards, then drag the rows from the shortest jump to the longest.": "કાર્ડ ફેરવો, પછી હારને સૌથી નાના કૂદકાથી સૌથી લાંબા સુધી ખસેડો.",
    "Shortest first?": "સૌથી નાનો પહેલાં?",
    "Compare the jumps in centimetres, not by their first number.": "કૂદકાની સરખામણી સેન્ટિમીટરમાં કરો, પહેલી સંખ્યાથી નહીં.",
    "Before you put jumps in order, what must you do first?": "કૂદકા ક્રમમાં મૂકતાં પહેલાં શું કરવું જરૂરી છે?",
    "First step?": "પહેલું પગલું?",
    "Can you compare 2.5 m with 208 cm as they are?": "શું તમે 2.5 મી અને 208 સેમીની સરખામણી એમ જ કરી શકો?",
    "A first digit of 2 can mean 2 m or 208 cm.": "પહેલો અંક 2 હોય તો તેનો અર્થ 2 મી કે 208 સેમી થઈ શકે.",
    "How did the chart change once every card was flipped?": "દરેક કાર્ડ ફેરવ્યા પછી ચાર્ટ કેવો બદલાયો?",
    "Same units": "એક જ એકમ",
    "First digit": "પહેલો અંક",
    "Put the bags in order from the lightest to the heaviest.": "થેલાને સૌથી હલકાથી સૌથી ભારે સુધી ક્રમમાં મૂકો.",
    "Lightest first?": "સૌથી હલકો પહેલાં?",
    "Write every bag's weight in grams before you order them.": "ક્રમ ગોઠવતાં પહેલાં દરેક થેલાનું વજન ગ્રામમાં લખો.",
    "1 kg 80 g is 1,080 g, not 1,800 g.": "1 કિગ્રા 80 ગ્રા એટલે 1,080 ગ્રા, 1,800 ગ્રા નહીં.",
    "In grams they are 1,080 g, 1,800 g and 1,008 g: order those.": "ગ્રામમાં એ 1,080 ગ્રા, 1,800 ગ્રા અને 1,008 ગ્રા છે: તેમને ક્રમમાં મૂકો.",
    "Weights of a group": "એક જૂથનાં વજન",
    "Tap the card of Bag 1 to write its weight in grams.": "થેલો 1નું વજન ગ્રામમાં લખવા તેનું કાર્ડ દબાવો.",
    "Tap the weight card in the top row.": "સૌથી ઉપરની હારનું વજન કાર્ડ દબાવો.",
    "Tap the chip that weighs the same as 2 kg 50 g.": "જે સંખ્યા 2 કિગ્રા 50 ગ્રા બરાબર છે તે દબાવો.",
    "1 kg is 1,000 g.": "1 કિગ્રામાં 1,000 ગ્રા થાય.",
    "Add the thousands again.": "હજારને ફરીથી ઉમેરો.",
    "Take 1,000 g out of the total for each kilogram.": "દરેક કિલોગ્રામ માટે કુલમાંથી 1,000 ગ્રા અલગ કરો.",
    "Add weights in grams, then write the total back in kilograms and grams.": "વજન ગ્રામમાં ઉમેરો, પછી કુલને કિલોગ્રામ અને ગ્રામમાં લખો.",
    "You learned: add weights in grams, then write them back in kg and g.": "તમે શીખ્યા: વજન ગ્રામમાં ઉમેરી કિગ્રા અને ગ્રામાં લખો.",
    "Flip the cards, then add the three bags in kilograms and grams.": "કાર્ડ ફેરવો, પછી ત્રણેય થેલાનું કુલ કિલોગ્રામ અને ગ્રામમાં લખો.",
    "Total in kg and g?": "કુલ, કિગ્રા અને ગ્રામાં?",
    "Add the grams of the three fruits.": "ત્રણેય ફળના ગ્રામ ઉમેરો.",
    "kg": "કિગ્રા",
    "g": "ગ્રા",
    "How many grams do the two bags weigh in all?": "બંને થેલાનું કુલ વજન કેટલા ગ્રામ છે?",
    "Total in grams?": "કુલ, ગ્રામમાં?",
    "Add the grams of the two bags.": "બંને થેલાના ગ્રામ ઉમેરો.",
    "Line the grams up by place, then add again.": "ગ્રામને સ્થાન પ્રમાણે નીચે નીચે લખો, પછી ઉમેરો.",
    "Add 2,450 g and 1,675 g.": "2,450 ગ્રા અને 1,675 ગ્રા ઉમેરો.",
    "Write the three parcels' total as a decimal in kilograms on the total card.": "ત્રણેય પાર્સલનું કુલ, કુલ કાર્ડ પર કિલોગ્રામમાં દશાંશમાં લખો.",
    "Total in kg?": "કુલ, કિગ્રામાં?",
    "What is each parcel's weight in grams?": "દરેક પાર્સલનું વજન ગ્રામમાં કેટલું છે?",
    "Add the three weights in grams again, place by place.": "ત્રણેય વજન ગ્રામમાં ફરી, સ્થાન પ્રમાણે ઉમેરો.",
    "Write the grams total as kilograms: 1,000 g make 1 kg.": "ગ્રામના કુલને કિલોગ્રામમાં લખો: 1,000 ગ્રાથી 1 કિગ્રા બને.",
    "Water drunk by a group": "એક જૂથે પીધેલું પાણી",
    "Tap Pour to measure a glass of water in the jug.": "જગમાં એક ગ્લાસ પાણી માપવા રેડો દબાવો.",
    "Tap the Pour key under the jug.": "જગની નીચે રેડો બટન દબાવો.",
    "Read the water's level in the Zoom window, then tap that reading.": "મોટા દૃશ્યમાં પાણીનું સ્તર વાંચો, પછી એ માપ દબાવો.",
    "Count the small marks up from 100 mL.": "100 મિલિથી ઉપરના નાના કાપા ગણો.",
    "1,000 mL make 1 L.": "1,000 મિલિથી 1 લિ બને.",
    "Take 1,000 mL out of the total as one litre.": "કુલમાંથી 1,000 મિલિને એક લિટર ગણી અલગ કરો.",
    "Read each drink on the jug, then add the millilitres and bundle the litres.": "દરેક પીણું જગ પર વાંચો, પછી મિલિલિટર ઉમેરી લિટર બનાવો.",
    "You learned: read each drink on a jug, then add and write L and mL.": "તમે શીખ્યા: દરેક પીણું જગ પર વાંચો, ઉમેરો, લિ અને મિલિમાં લખો.",
    "Pour and read each drink, then write what the five drank in L and mL.": "દરેક પીણું રેડો અને વાંચો, પછી પાંચેયે પીધેલું લિ અને મિલિમાં લખો.",
    "Total in L and mL?": "કુલ, લિ અને મિલિમાં?",
    "Add the millilitres of all five drinks.": "પાંચેય પીણાંના મિલિલિટર ઉમેરો.",
    "L": "લિ",
    "mL": "મિલિ",
    "Why is each drink poured into a measuring jug first?": "દરેક પીણું પહેલાં માપિયા જગમાં કેમ રેડાય છે?",
    "Why the jug?": "જગ કેમ?",
    "Look at the lines on the side of the jug.": "જગની બાજુ પરની રેખાઓ જુઓ.",
    "A guess can change from one child to the next.": "અંદાજ દરેક બાળકનો જુદો હોઈ શકે.",
    "Which choice lets two children get the same number?": "કયા વિકલ્પથી બે બાળકોને એક જ સંખ્યા મળે?",
    "Marks in mL": "મિલિના કાપા",
    "It is large": "તે મોટો જગ છે",
    "Measure each cup in the jug, then total them in litres and millilitres.": "દરેક કપ જગમાં માપો, પછી કુલને લિટર અને મિલિલિટરમાં લખો.",
    "Four cups in L and mL?": "ચાર કપ, લિ અને મિલિમાં?",
    "Add the four cups in millilitres first.": "પહેલાં ચારેય કપ મિલિલિટરમાં ઉમેરો.",
    "325 + 410 + 195 + 290 gives the total in mL.": "325 + 410 + 195 + 290 કરવાથી કુલ મિલિ મળે.",
    "Every 1,000 mL of the total is 1 L.": "કુલના દરેક 1,000 મિલિ એટલે 1 લિ.",
    "Yes, 3 m 7 cm is 307 cm, which is 3.07 m.": "હા, 3 મી 7 સેમી એટલે 307 સેમી, એટલે 3.07 મી.",
    "Yes, 1 kg 250 g is 1,250 g.": "હા, 1 કિગ્રા 250 ગ્રા એટલે 1,250 ગ્રા.",
    "Yes, 4 m 60 cm is 4.6 m.": "હા, 4 મી 60 સેમી એટલે 4.6 મી.",
    "Yes, the jumps now rise from 208 cm to 251 cm.": "હા, હવે કૂદકા 208 સેમીથી 251 સેમી સુધી વધે છે.",
    "Yes, one unit first, then the order is easy to see.": "હા, પહેલાં એક જ એકમ, પછી ક્રમ સહેલાઈથી દેખાય.",
    "Yes, the bags go from 1,008 g to 1,800 g.": "હા, થેલા 1,008 ગ્રાથી 1,800 ગ્રા સુધી જાય છે.",
    "Yes, the three bags weigh 5 kg 625 g.": "હા, ત્રણેય થેલાનું વજન 5 કિગ્રા 625 ગ્રા છે.",
    "Yes, the two bags weigh 4,125 g.": "હા, બંને થેલાનું વજન 4,125 ગ્રા છે.",
    "Yes, the parcels weigh 3.17 kg.": "હા, પાર્સલનું વજન 3.17 કિગ્રા છે.",
    "Yes, the five children drank 1 L 150 mL.": "હા, પાંચેય બાળકોએ 1 લિ 150 મિલિ પાણી પીધું.",
    "Yes, the jug's marks let us read each drink.": "હા, જગના કાપાથી દરેક પીણું વાંચી શકાય.",
    "Yes, the four cups hold 1 L 220 mL.": "હા, ચારેય કપમાં 1 લિ 220 મિલિ છે.",
    "Class record": "વર્ગ રેકોર્ડ",
    "Two units": "બે એકમ",
    "Smallest unit": "સૌથી નાનો એકમ",
    "Decimal": "દશાંશ",
    "m": "મી",
    "cm": "સેમી",
    "km": "કિમી",
    "tenths": "દશાંશ",
    "hundredths": "શતાંશ",
    "thousandths": "સહસ્ત્રાંશ",
    "Place holder": "સ્થાનધારક",
    "Flip": "ફેરવો",
    "New card": "નવું કાર્ડ",
    "Pour": "રેડો",
    "Total": "કુલ",
    "Zoom": "મોટું દૃશ્ય",
    "Decimal card": "દશાંશ કાર્ડ",
    "whole": "પૂર્ણ ભાગ",
    "decimal": "દશાંશ ભાગ",
    "Name": "નામ",
    "Jump": "કૂદકો",
    "In cm": "સેમીમાં",
    "Bag": "થેલો",
    "Weight": "વજન",
    "In g": "ગ્રામાં",
    "Parcel": "પાર્સલ",
    "Water": "પાણી",
    "Cup": "કપ",
    "Bag A": "થેલો ક",
    "Bag B": "થેલો ખ",
    "Bag C": "થેલો ગ",
    "Bag 1": "થેલો 1",
    "Bag 2": "થેલો 2",
    "Apples": "સફરજન",
    "Mangoes": "કેરી",
    "Oranges": "નારંગી",
    "Parcel A": "પાર્સલ ક",
    "Parcel B": "પાર્સલ ખ",
    "Parcel C": "પાર્સલ ગ",
    "Glass": "ગ્લાસ",
    "Cup 1": "કપ 1",
    "Cup 2": "કપ 2",
    "Cup 3": "કપ 3",
    "Cup 4": "કપ 4",
    "Item": "વસ્તુ",
    "Turn every weight into grams first.": "પહેલાં દરેક વજનને ગ્રામમાં ફેરવો.",
    "Read every drink on the jug first.": "પહેલાં દરેક પીણું જગ પર વાંચો.",
    "Asha": "આશા", "Ravi": "રવિ", "Meena": "મીના", "Kabir": "કબીર", "Zara": "ઝારા", "Dev": "દેવ", "Ira": "ઇરા", "Sam": "સેમ",
  },
};

const TW2_ROWS = [
  { id: "a", name: "Asha", given: [["2", "m"], ["15", "cm"]], v: 215 }, { id: "r", name: "Ravi", given: [["2.5", "m"]], v: 250 },
  { id: "m", name: "Meena", given: [["208", "cm"]], v: 208 }, { id: "k", name: "Kabir", given: [["2", "m"], ["51", "cm"]], v: 251 },
];
const TW4_DRINKS = [
  { id: "a", name: "Asha", ml: 210, x: 220 }, { id: "r", name: "Ravi", ml: 235, x: 225 }, { id: "m", name: "Meena", ml: 190, x: 195 },
  { id: "k", name: "Kabir", ml: 260, x: 270 }, { id: "z", name: "Zara", ml: 255, x: 245 },
];

const PHASES = [
  {
    n: 1,
    concept: "One measure, three ways",
    conceptId: "M3.S6.T10.C45", objectiveIds: ["O17"],
    says: ["Flip it. Say the same jump another way."],
    /* the guide steps' warm-up measure (the textbook's own jump), never question 1's */
    warm: { m: { big: 2, small: 46, per: 100, uL: "m", uS: "cm" } },
    steps: [
      { say: "This card holds a long jump of 2 m 46 cm; tap Flip to see it in centimetres.", on: "flip", hint: "Tap the Flip key under the cards." },
      { say: "Tap Flip again to see the same jump as a decimal in metres.", on: "flip", hint: "The Flip key turns the next card." },
    ],
    stepHold: 2600,
    ladder: ["7 cm is 7 hundredths of a metre.", "The tenths place is empty, so a zero must hold it."],
    closing: "One measure can be written in two units, in its smallest unit, or as a decimal.",
    learned: "You learned: one measure can be written in three ways.",
    traceback: "a place chart under the cards puts the whole metres, the tenths and the hundredths in their places (a grey zero holding an empty place), and the card ends on the whole right form",
    items: [
      /* learn TW1: answer in the plan = 307 cm, and 3.07 m. One question takes one answer, so it asks the decimal form, where the
         phase's misconception (the missing place holder) lives; the 307 cm card turns up with it at the win */
      { qid: "M3.S6.T10.C45:TW1", kind: "dec", m: { big: 3, small: 7, per: 100, uL: "m", uS: "cm" }, parts: SLOT_DECIMAL, answer: ["3", "07"], cardName: "Decimal",
        say: "Now write a jump of 3 m 7 cm as a decimal in metres on the Decimal card.", ask: "3 m 7 cm in metres?",
        miss: "How many centimetres make 1 m?" },
      /* practice 1: answer in the plan = 1250 g */
      { qid: "M3.S6.T10.C45:1", kind: "small", m: { big: 1, small: 250, per: 1000, uL: "kg", uS: "g" }, answer: 1250,
        say: "A packet's label says 1 kg 250 g; write that weight in grams on the next card.", ask: "1 kg 250 g in grams?",
        miss: "How many grams make 1 kg?",
        ladder: ["1 kg is 1,000 g, so start from 1,000.", "Add the 250 g to the 1,000 g."] },
      /* practice 2: answer in the plan = 4.6 m (4.60 m is the same measure: the tool's judge takes both) */
      { qid: "M3.S6.T10.C45:2", kind: "dec", m: { big: 4, small: 60, per: 100, uL: "m", uS: "cm" }, parts: SLOT_DECIMAL, answer: ["4", "6"], cardName: "Decimal",
        say: "Write 4 m 60 cm as a decimal in metres.", ask: "4 m 60 cm in metres?",
        miss: "Is 60 cm more or less than half a metre?",
        ladder: ["Every 10 cm is one tenth of a metre.", "Count how many tenths of a metre 60 cm makes."] },
    ],
  },
  {
    n: 2,
    concept: "Ordering real measures",
    conceptId: "M3.S6.T10.C46", objectiveIds: ["O17"],
    /* not shown (guide steps); the plan's "One unit first" would print question 2's answer */
    says: ["Put the jumps in order, shortest first."],
    /* the guide step's warm-up chart (three other jumps), never question 1's */
    warm: { kind: "order", unit: "cm", cols: ["Name", "Jump", "In cm"],
      rows: [{ id: "x", name: "Dev", given: [["1", "m"], ["90", "cm"]], v: 190 }, { id: "y", name: "Ira", given: [["1.5", "m"]], v: 150 }, { id: "z", name: "Sam", given: [["175", "cm"]], v: 175 }],
      conv: { id: "y", chips: [15, 105, 150], means: { 15: [["0.15", "m"]], 105: [["1.05", "m"]] } } },
    steps: [
      { say: "Tap the 1.5 m card to write that jump in centimetres.", on: "card-y", hint: "Tap the card that shows 1.5 m." },
      { say: "Tap the chip that is the same length as 1.5 m.", on: "pick-3", hint: "Half a metre is 50 cm." },
    ],
    stepHold: 2200,
    ladder: ["208 cm is less than 2 m 15 cm, which is 215 cm.", "In centimetres they are 215, 250, 208 and 251: order those."],
    closing: "Write every measure in the same unit first, then put them in order.",
    learned: "You learned: write measures in the same unit, then put them in order.",
    traceback: "every row's measure is shown in the chart's one unit beside it, the rows out of step are lit amber, and the right order is written under the chart",
    items: [
      /* learn TW2: answer in the plan = 208 cm, 2 m 15 cm, 2.5 m, 2 m 51 cm (rows dragged into order: answer = the row ids in order) */
      { qid: "M3.S6.T10.C46:TW2", kind: "order", pad: "enter", unit: "cm", cols: ["Name", "Jump", "In cm"], rows: TW2_ROWS, answer: ["m", "a", "r", "k"],
        /* the card that carries the plan's misconception (2.5 m read as 2 m 5 cm) is converted by the child, from three chips */
        conv: { id: "r", chips: [25, 205, 250], means: { 25: [["0.25", "m"]], 205: [["2.05", "m"]] } },
        say: "Flip the cards, then drag the rows from the shortest jump to the longest.", ask: "Shortest first?",
        miss: "Compare the jumps in centimetres, not by their first number." },
      /* practice 3: answer in the plan = Write all of them in one unit */
      { qid: "M3.S6.T10.C46:3", kind: "rule", unit: "cm", cols: ["Name", "Jump", "In cm"], rows: TW2_ROWS,
        choices: [{ id: "unit", label: "Same units" }, { id: "digit", label: "First digit" }], answer: "unit",
        say: "Before you put jumps in order, what must you do first?", ask: "First step?",
        miss: "Can you compare 2.5 m with 208 cm as they are?",
        ladder: ["A first digit of 2 can mean 2 m or 208 cm.", "How did the chart change once every card was flipped?"] },
      /* practice 4: answer in the plan = 1008 g, 1 kg 80 g, 1 kg 800 g */
      { qid: "M3.S6.T10.C46:4", kind: "order", pad: "enter", unit: "g", cols: ["Bag", "Weight", "In g"],
        rows: [{ id: "a", name: "Bag A", given: [["1", "kg"], ["80", "g"]], v: 1080 }, { id: "b", name: "Bag B", given: [["1", "kg"], ["800", "g"]], v: 1800 },
          { id: "c", name: "Bag C", given: [["1,008", "g"]], v: 1008 }], answer: ["c", "a", "b"],
        conv: { id: "a", chips: [180, 1080, 1800], means: { 180: [["0", "kg"], ["180", "g"]], 1800: [["1", "kg"], ["800", "g"]] } },
        say: "Put the bags in order from the lightest to the heaviest.", ask: "Lightest first?",
        miss: "Write every bag's weight in grams before you order them.",
        ladder: ["1 kg 80 g is 1,080 g, not 1,800 g.", "In grams they are 1,080 g, 1,800 g and 1,008 g: order those."] },
    ],
  },
  {
    n: 3,
    concept: "Weights of a group",
    conceptId: "M3.S6.T10.C47", objectiveIds: ["O18"],
    says: ["Find what the bags weigh together."],
    /* the guide step's warm-up bags, never question 1's */
    warm: { cols: ["Bag", "Weight", "In g"],
      rows: [{ id: "x", name: "Bag 1", given: [["2", "kg"], ["50", "g"]], v: 2050 }, { id: "y", name: "Bag 2", given: [["1", "kg"], ["500", "g"]], v: 1500 }],
      conv: { id: "x", chips: [250, 2050, 2500], means: { 250: [["0", "kg"], ["250", "g"]], 2500: [["2", "kg"], ["500", "g"]] } } },
    steps: [
      { say: "Tap the card of Bag 1 to write its weight in grams.", on: "card-x", hint: "Tap the weight card in the top row." },
      { say: "Tap the chip that weighs the same as 2 kg 50 g.", on: "pick-2", hint: "1 kg is 1,000 g." },
    ],
    stepHold: 2200,
    ladder: ["Add the thousands again.", "Take 1,000 g out of the total for each kilogram."],
    closing: "Add weights in grams, then write the total back in kilograms and grams.",
    learned: "You learned: add weights in grams, then write them back in kg and g.",
    traceback: "every bag is shown in grams, the grams column is added into the total row, and the total card ends on the whole right answer beside the unit fact",
    items: [
      /* learn TW3: answer in the plan = 5 kg 625 g, which is 5.625 kg (the kg and g boxes name the form; the win shows all three) */
      { qid: "M3.S6.T10.C47:TW3", kind: "kgg", cols: ["Item", "Weight", "In g"],
        rows: [{ id: "a", name: "Apples", given: [["1", "kg"], ["640", "g"]], v: 1640 }, { id: "b", name: "Mangoes", given: [["2", "kg"], ["85", "g"]], v: 2085 },
          { id: "c", name: "Oranges", given: [["1", "kg"], ["900", "g"]], v: 1900 }],
        /* the plan's misconception (2 kg 85 g written as 2,850 g) is the child's to convert, from three chips */
        conv: { id: "b", chips: [285, 2085, 2850], means: { 285: [["0", "kg"], ["285", "g"]], 2850: [["2", "kg"], ["850", "g"]] } },
        parts: [{ label: "kg" }, { label: "g" }], answer: [5, 625],
        say: "Flip the cards, then add the three bags in kilograms and grams.", ask: "Total in kg and g?",
        miss: "Add the grams of the three fruits." },
      /* practice 5: answer in the plan = 4125 g */
      { qid: "M3.S6.T10.C47:5", kind: "g", cols: ["Bag", "Weight", "In g"],
        rows: [{ id: "a", name: "Bag A", given: [["2", "kg"], ["450", "g"]], v: 2450 }, { id: "b", name: "Bag B", given: [["1", "kg"], ["675", "g"]], v: 1675 }],
        conv: { id: "a", chips: [245, 2045, 2450], means: { 245: [["0", "kg"], ["245", "g"]], 2045: [["2", "kg"], ["45", "g"]] } },
        answer: 4125,
        say: "How many grams do the two bags weigh in all?", ask: "Total in grams?",
        miss: "Add the grams of the two bags.",
        ladder: ["Line the grams up by place, then add again.", "Add 2,450 g and 1,675 g."] },
      /* practice 7: answer in the plan = 3.17 kg, because 850 + 1020 + 1300 = 3170 (3.170 kg is taken too) */
      { qid: "M3.S6.T10.C47:7", kind: "kgdec", cols: ["Parcel", "Weight", "In g"],
        rows: [{ id: "a", name: "Parcel A", given: [["850", "g"]], v: 850 }, { id: "b", name: "Parcel B", given: [["1", "kg"], ["20", "g"]], v: 1020 },
          { id: "c", name: "Parcel C", given: [["1.3", "kg"]], v: 1300 }],
        conv: { id: "c", chips: [130, 1003, 1300], means: { 130: [["0.13", "kg"]], 1003: [["1.003", "kg"]] } },
        parts: SLOT_DECIMAL, answer: ["3", "17"], cardName: "Decimal",
        say: "Write the three parcels' total as a decimal in kilograms on the total card.", ask: "Total in kg?",
        miss: "What is each parcel's weight in grams?",
        ladder: ["Add the three weights in grams again, place by place.", "Write the grams total as kilograms: 1,000 g make 1 kg."] },
    ],
  },
  {
    n: 4,
    concept: "Water drunk by a group",
    conceptId: "M3.S6.T10.C48", objectiveIds: ["O18"],
    says: ["Pour it and read the jug. Now add them all."],
    /* the guide step's warm-up glass, never question 1's drinks */
    /* each drink's x is its third reading chip (the truth, the jug's nearest numbered mark, x): set so the truth is not always in the middle */
    warm: { cols: ["Name", "Water"], drinks: [{ id: "g", name: "Glass", ml: 120, x: 130 }] },
    steps: [
      { say: "Tap Pour to measure a glass of water in the jug.", on: "pour", hint: "Tap the Pour key under the jug." },
      { say: "Read the water's level in the Zoom window, then tap that reading.", on: "read-2", hint: "Count the small marks up from 100 mL." },
    ],
    stepHold: 2200,
    ladder: ["1,000 mL make 1 L.", "Take 1,000 mL out of the total as one litre."],
    closing: "Read each drink on the jug, then add the millilitres and bundle the litres.",
    learned: "You learned: read each drink on a jug, then add and write L and mL.",
    traceback: "the drinks column is lit, its total is written in millilitres, the thousand millilitres are bundled into one litre, and the total card ends on the whole right answer",
    items: [
      /* learn TW4: answer in the plan = 1 L 150 mL, which is 1.15 L */
      { qid: "M3.S6.T10.C48:TW4", kind: "lml", cols: ["Name", "Water"], drinks: TW4_DRINKS,
        parts: [{ label: "L" }, { label: "mL" }], answer: [1, 150],
        say: "Pour and read each drink, then write what the five drank in L and mL.", ask: "Total in L and mL?",
        miss: "Add the millilitres of all five drinks." },
      /* practice 6: answer in the plan = It is marked in millilitres, so each drink can be read, not guessed */
      { qid: "M3.S6.T10.C48:6", kind: "why", cols: ["Name", "Water"], drinks: TW4_DRINKS,
        choices: [{ id: "read", label: "Marks in mL" }, { id: "big", label: "It is large" }], answer: "read",
        say: "Why is each drink poured into a measuring jug first?", ask: "Why the jug?",
        miss: "Look at the lines on the side of the jug.",
        ladder: ["A guess can change from one child to the next.", "Which choice lets two children get the same number?"] },
      /* practice 8: answer in the plan = 1 L 220 mL, because 325 + 410 + 195 + 290 = 1220 */
      { qid: "M3.S6.T10.C48:8", kind: "lml", cols: ["Cup", "Water"],
        drinks: [{ id: "1", name: "Cup 1", ml: 325, x: 315 }, { id: "2", name: "Cup 2", ml: 410, x: 405 }, { id: "3", name: "Cup 3", ml: 195, x: 205 }, { id: "4", name: "Cup 4", ml: 290, x: 280 }],
        parts: [{ label: "L" }, { label: "mL" }], answer: [1, 220],
        say: "Measure each cup in the jug, then total them in litres and millilitres.", ask: "Four cups in L and mL?",
        miss: "Add the four cups in millilitres first.",
        ladder: ["325 + 410 + 195 + 290 gives the total in mL.", "Every 1,000 mL of the total is 1 L."] },
    ],
  },
];

/* The numbers the working area needs (the items carry their own measures, rows and drinks). */
const MODEL = { jugMax: 500, units: { m: 100, kg: 1000, L: 1000, km: 1000 } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* a decimal card is right when the whole part and the decimal part have the right VALUE: 3.7 is not 3.07, but 4.60 is 4.6 */
const twDecRight = (want: any, v: any) => {
  const [w, d] = decimalPartsOf(v), [aw, ad] = decimalPartsOf(want);
  return w !== "" && d !== "" && Number(w) === Number(aw) && Number("0." + d) === Number("0." + ad);
};
const judge = (item: any, v: any) => {
  if (item.kind === "order") return (Array.isArray(v) ? v.map(String) : String(v ?? "").split("|")).join("|") === item.answer.join("|");
  if (item.kind === "dec" || item.kind === "kgdec") return twDecRight(item.answer, v);
  if (item.parts) return judgeSlotParts(item, v);
  if (item.choices) return String(v ?? "").trim() === item.answer;
  return leadNumber(v) === item.answer;
};
/* oracle: every answer again, from the measure STRINGS read back into the small unit (no code shared with judge or Work) */
const oracle = () => {
  const per: any = { m: 100, cm: 1, kg: 1000, g: 1 };
  const read = (pairs: any[]) => Math.round(pairs.reduce((a: number, pr: any) => a + parseFloat(String(pr[0]).replace(/,/g, "")) * per[pr[1]], 0));
  /* every conversion chip set holds its card's true value once, and every drink's chips hold its reading */
  const convOk = (c: any, rs: any[]) => !c || c.chips.filter((v: number) => v === read(rs.find((r: any) => r.id === c.id).given)).length === 1;
  const dr = (d: any[]) => (d || []).every((x: any) => twRead(x).filter((v) => v === x.ml).length === 1 && new Set(twRead(x)).size === 3);
  if (!PHASES.every((p: any) => convOk(p.warm && p.warm.conv, (p.warm && p.warm.rows) || []) && dr(p.warm && p.warm.drinks)
    && p.items.every((it: any) => convOk(it.conv, it.rows || []) && dr(it.drinks)))) return false;
  return PHASES.every((p: any) => p.items.every((it: any) => {
    const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
    if (it.kind === "dec") return Math.abs(Number(it.answer.join(".")) - (it.m.big * it.m.per + it.m.small) / it.m.per) < 1e-9;
    if (it.kind === "small") return it.answer === it.m.big * it.m.per + it.m.small;
    if (it.kind === "order") return it.rows.every((r: any) => read(r.given) === r.v)
      && it.rows.slice().sort((a: any, b: any) => read(a.given) - read(b.given)).map((r: any) => r.id).join("|") === it.answer.join("|");
    if (it.kind === "rule") return it.answer === "unit" && it.rows.every((r: any) => read(r.given) === r.v);
    if (it.kind === "why") return it.answer === "read";
    if (it.kind === "kgg") { const g = sum(it.rows.map((r: any) => read(r.given))); return it.answer[0] === Math.floor(g / 1000) && it.answer[1] === g % 1000; }
    if (it.kind === "g") return it.answer === sum(it.rows.map((r: any) => read(r.given)));
    if (it.kind === "kgdec") return Math.abs(Number(it.answer.join(".")) - sum(it.rows.map((r: any) => read(r.given))) / 1000) < 1e-9;
    if (it.kind === "lml") { const ml = sum(it.drinks.map((d: any) => d.ml)); return it.answer[0] === Math.floor(ml / 1000) && it.answer[1] === ml % 1000; }
    return false;
  }));
};
/* the misconception of each question, as the child would give it; judge must reject it */
const TW_NEAR: any = {
  "M3.S6.T10.C45:TW1": "3|7", "M3.S6.T10.C45:1": 350, "M3.S6.T10.C45:2": "4|06",
  "M3.S6.T10.C46:TW2": "a|r|k|m", "M3.S6.T10.C46:3": "digit", "M3.S6.T10.C46:4": "a|b|c",
  "M3.S6.T10.C47:TW3": "4|1625", "M3.S6.T10.C47:5": 3125, "M3.S6.T10.C47:7": "2|873",
  "M3.S6.T10.C48:TW4": "11|50", "M3.S6.T10.C48:6": "big", "M3.S6.T10.C48:8": "12|20",
};
const nearMiss = (item: any) => (item.qid in TW_NEAR ? TW_NEAR[item.qid] : "~");
/* every written form of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  const a = item.answer;
  if (item.kind === "dec" || item.kind === "kgdec") {
    const s = a[0] + "." + a[1], f = [s];
    if (item.kind === "kgdec") { const g = Math.round(Number(s) * 1000); f.push(String(g), indian(g), s + "0"); }
    else f.push(s + "0");
    return f;
  }
  if (item.kind === "kgg" || item.kind === "lml") {
    const small = a[0] * 1000 + a[1], u = item.kind === "kgg" ? ["kg", "g"] : ["L", "mL"];
    return [String(small), indian(small), twDec(a[0], a[1], 1000), a[0] + " " + u[0] + " " + a[1] + " " + u[1]];
  }
  if (item.kind === "order") return [item.answer.map((id: string) => item.rows.find((r: any) => r.id === id).given.map((pr: any) => pr.join(" ")).join(" ")).join(", ")];
  if (item.choices) return [item.choices.find((c: any) => c.id === a).label];
  return [String(a), indian(a), words(a)];
};
/* the answer as the teacher agent gives it (toolApi.answer): an order is the row ids, "m|a|r|k" */
const agentKey = (item: any) => (item.kind === "order" ? item.answer.join("|") : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an order (made on the working area): set the rows as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : HOOK.work ? HOOK.work() : undefined);
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 with the panel shut, 900 x 520 open (bigPad); box.key is the key's corner. Every picture is
   laid out in an 880-wide column centred in the room, moved left of the key's corner when choice keys widen it. */
function Work({ phase, n, item, index, stage, wrong, typed, part, api, stepOn, box, answerOn, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  void lang;
  const tl = useTimeline();
  const free = stage === "free";
  const ask = stage === "ask", demo = stage === "demo", win = !free && (stage === "win" || stage === "idle");
  /* the guide steps work the phase's WARM-UP measure, never question 1's own; the picture resets when question 1 opens */
  /* "teach" too: a phase opens on stage "teach" for one frame before "demo", and that frame must not draw question 1's board */
  const warm = (demo || stage === "teach") && phase && phase.warm ? phase.warm : null;
  const D: any = free ? { kind: "free" } : warm ? { ...warm, kind: warm.kind || "warm" } : item;
  const kind = D.kind;
  const rows: any[] = D.rows || [];
  const drinks: any[] = D.drinks || [];

  /* the child's own state, kept per question (a new question, and question 1 after the warm-up, start fresh) */
  /* keyed to the question ENTRY, not only its index: every time another question (or the warm-up, or free play) comes up the count
     moves on, so a question entered again (gotoStep, next, any re-entry) opens on a fresh board; the keypad opening or shutting
     inside one question changes nothing here, so its working stays */
  const entry = useRef({ at: "", n: 0 });
  const at = free ? "free" : warm ? "warm" : "i" + index;
  if (entry.current.at !== at) entry.current = { at, n: entry.current.n + 1 };
  const key = at + "#" + entry.current.n;
  const conv: any = D.conv || null;   /* the one card the child converts from three chips */
  const fresh = (): any => (free ? { k: key, fi: 0, flips: 1, tb: 0 }
    : { k: key, flips: 1, flipped: {}, order: rows.map((r: any) => r.id), sel: null, poured: kind === "why" ? drinks.length : 0,
        read: kind === "why" ? drinks.length : 0, cv: false, bad: null, lit: 0, moved: false, tb: 0 });
  const [raw, setRaw] = useState<any>(fresh);
  const s = raw.k === key ? raw : fresh();
  const put = (p: any) => setRaw((o: any) => ({ ...(o.k === key ? o : fresh()), ...p }));
  const orderRef = useRef<string[]>(s.order || []);
  const movedRef = useRef(false);
  const workRef = useRef(false);   /* the teacher agent's answer() did the working: read at once, before any re-render */
  if (raw.k !== key) { orderRef.current = s.order || []; movedRef.current = false; workRef.current = false; }

  /* ── layout ── */
  /* laid out ONCE at the open width (900) and kept there, shut or open, so nothing slides when the keypad opens (LAYOUT §3);
     the key's corner (box.key, x 1190 or wider) is always to the right of x 890 */
  const LW = 880;
  const ox = 10;
  const cx = ox + LW / 2;
  const m = free ? FREE_SET[s.fi % FREE_SET.length] : D.m;
  /* phase 1: three cards */
  const P1 = { cw: 280, gap: 20, y: 8, ch: 236 };
  const cardBox = (k: number) => ({ x: ox + k * (P1.cw + P1.gap), y: P1.y, w: P1.cw, h: P1.ch });
  const keyBox = { x: Math.round(cx - 120), y: 412, w: 240, h: 88 };
  /* the chart (phases 2 to 4) */
  const nR = rows.length || drinks.length;
  const RH = n === 4 ? (nR >= 5 ? 58 : 68) : nR >= 4 ? 90 : 88;
  const Y0 = 50;
  const rowY = (slot: number) => Y0 + slot * RH;
  const COL = { name: ox, nameW: 238, card: ox + 250, cardW: 334, chip: ox + 596, chipW: 284 };
  const totY = Y0 + nR * RH + 6, totH = 96;
  /* phase 4: the chart on the left, the jug in the middle, the zoom window at its surface on the right, Pour or the reading chips under them */
  const J = { x: ox + 440, w: 150, top: 18, bot: 372 };
  const jugY = (ml: number) => J.bot - 16 - (ml * (J.bot - 16 - (J.top + 46))) / 500;
  const L = { x: ox + 650, y: 24, w: 230, h: 328 };
  const W4 = { name: ox, nameW: 180, water: ox + 190, waterW: 230 };
  const pourBox = { x: ox + 535, y: 410, w: 240, h: 88 };
  const RC = { w: 136, h: 88, gap: 14, y: 410, x: ox + 437 };
  /* the chart's conversion chips, under the chart */
  const CH = { w: 190, h: 80, gap: 16, y: 426 };
  const chipX = (j: number) => cx - (3 * CH.w + 2 * CH.gap) / 2 + j * (CH.w + CH.gap);

  /* ── what each question needs before it can be answered ── */
  /* phase 1: the asked card is face up from the open (Flip turns the cards in the warm-up and in free play only); phase 3: every bag
     in grams first; phase 4: every drink poured first */
  const allFlipped = rows.every((r: any) => s.flipped && s.flipped[r.id]);
  const ready = n === 3 ? allFlipped : kind === "lml" ? s.read >= drinks.length : true;
  useEffect(() => { if (!free) api.cardReady(ready || !ask, ask && !ready); }, [ready, ask, index, free]);
  /* the working first: in phases 3 and 4 a typed answer is SENT only once every bag is in grams / every drink is read (the child's
     Enter, keyboard or pad, does nothing until then; the Decimal card of phase 3 is held by the runtime's own card gate). Never after
     a miss: the correction has shown the whole working. */
  const gated = ask && !free && !ready && !wrong && (kind === "kgg" || kind === "g" || kind === "lml");
  /* the teacher agent's answer() does the working as a teacher at the board would, then types */
  HOOK.work = () => {
    /* the gated typed questions and (4) the phase 3 Decimal card: the class sees the working before the answer goes in */
    if (!ask || free || ready || !(gated || kind === "kgdec")) return undefined;
    workRef.current = true;
    put(n === 3 ? { flipped: Object.fromEntries(rows.map((r: any) => [r.id, true])), cv: false, bad: null } : { poured: drinks.length, read: drinks.length, bad: null, lit: 0 });
    return undefined;
  };
  useEffect(() => { api.answerReady(ask && !free && item.pad === "enter" && !!s.moved); }, [ask, s.moved, index, free]);

  /* ── the acts: every one performed on screen by the hand (api.act), the state changing as it passes ── */
  const playing = useRef(false);
  const lastPick = useRef(0);
  const perform = (o: any, done: () => void) => {
    if (playing.current || tl.busy) return;
    playing.current = true;
    api.act(o).then((ok: boolean) => { playing.current = false; if (ok) done(); });
  };
  const flip = () => {
    if (demo && stepOn !== "flip") { api.did("flip"); return; }
    if (!demo && !free) return;
    if (free && s.flips >= 3) {   /* free play: the key's second act takes the next real measure */
      const b = cardBox(0);
      perform({ tool: "hand", moves: "tap", at: [{ x: b.x + b.w / 2, y: b.y + b.h / 2 }], onPoint: () => { put({ fi: (s.fi + 1) % FREE_SET.length, flips: 1 }); api.sfx.settle(); } }, () => {});
      return;
    }
    if (s.flips >= 3) return;
    const b = cardBox(s.flips);
    perform({ tool: "hand", moves: "tap", at: [{ x: b.x + b.w / 2, y: b.y + b.h / 2 }], onPoint: () => { put({ flips: s.flips + 1, tb: 0 }); api.sfx.settle(); } },
      () => { if (demo) api.did("flip"); });
  };
  const rowCardBox = (id: string) => ({ x: COL.card, y: rowY(n === 2 ? s.order.indexOf(id) : rows.findIndex((r: any) => r.id === id)) + 4, w: COL.cardW, h: RH - 12 });
  const flipRow = (id: string) => {
    const on = "card-" + id;
    if (demo && stepOn !== on) { api.did(on); return; }
    if (!demo && !ask) return;
    if (s.flipped[id]) return;
    const b = rowCardBox(id);
    /* the misconception's card is not flipped by the tool: the hand taps it and the child picks its value from three chips */
    const toChips = !!conv && conv.id === id;
    if (toChips && s.cv) return;
    perform({ tool: "hand", moves: "tap", at: [{ x: b.x + b.w / 2, y: b.y + b.h / 2 }],
      onPoint: () => { put(toChips ? { cv: true, bad: null, tb: 0 } : { flipped: { ...s.flipped, [id]: true }, tb: 0 }); api.sfx.settle(); } },
      () => { if (demo) api.did(on); });
  };
  const pour = () => {
    if (demo && stepOn !== "pour") { api.did("pour"); return; }
    if (!demo && !ask) return;
    if (s.poured >= drinks.length || s.poured > s.read) return;   /* the drink in the jug is read first */
    if (Date.now() - lastPick.current < 400) return;   /* the second tap of a double tap on a reading chip never pours */
    perform({ tool: "hand", moves: "tap", at: [{ x: J.x + J.w / 2, y: J.top + 26 }], onPoint: () => { put({ poured: s.poured + 1, bad: null, lit: 0, tb: 0 }); api.sfx.trade(); } },
      () => { if (demo) api.did("pour"); });
  };
  /* the marks between the jug's numbered mark and the surface light one by one after a wrong reading */
  const tl2 = useTimeline();
  useEffect(() => () => tl2.stop(), [key]);
  const setOrder = (ord: string[]) => { orderRef.current = ord; movedRef.current = true; put({ order: ord, sel: null, moved: true, tb: 0 }); };
  /* a row's grip: a drag moves the row to where it is dropped; a tap (or Enter) picks it, a tap on another row swaps the two */
  const grip = (id: string, at: any, moved: boolean) => {
    if (demo) { api.did("row-" + id); return; }
    if (!ask || item.kind !== "order" || tl.busy || playing.current) return;
    const ord = orderRef.current.slice();
    if (moved && isFinite(at.y)) {
      /* dropped outside the board: the row goes back where it was */
      if (at.x < ox || at.x > ox + LW || at.y < Y0 - RH / 2 || at.y > rowY(ord.length) + RH / 2) { api.sfx.settle(); return; }
      const to = Math.max(0, Math.min(ord.length - 1, Math.round((at.y - Y0 - RH / 2) / RH)));
      const rest = ord.filter((x) => x !== id);
      rest.splice(to, 0, id);
      setOrder(rest);
      api.sfx.tick();
    } else if (!s.sel) put({ sel: id });
    else if (s.sel === id) put({ sel: null });
    else {
      const i = ord.indexOf(s.sel), j = ord.indexOf(id);
      ord[i] = id; ord[j] = s.sel;
      setOrder(ord);
      api.sfx.tick();
      pointerBlur();   /* the swap is done: the next Enter sends the rows (PATTERNS §5b: no keyboard trap) */
    }
  };
  const drag = useDrag((id: any, at: any, moved: boolean) => grip(String(id), at, moved));
  const act = (on: string) => {
    if (on === "flip") flip(); else if (on === "pour") pour(); else if (on.indexOf("card-") === 0) flipRow(on.slice(5));
    else if (on.indexOf("pick-") === 0) pickChip(Number(on.slice(5)) - 1); else if (on.indexOf("read-") === 0) pickRead(Number(on.slice(5)) - 1);
  };
  /* Enter, the agent's check() and the dev solve() perform the current guide step; at an order question Enter sends the rows */
  api.onEnter(demo && stepOn ? () => act(stepOn)
    : ask && !free && item.pad === "enter" ? () => { if (movedRef.current) api.submit(orderRef.current.join("|")); }
    : gated ? (v: any) => {
      if (workRef.current) { api.submit(v); return; }   /* answer() did the working in this same tick: send it */
      if (n === 3) api.say("Turn every weight into grams first."); else api.say("Read every drink on the jug first.");
      put({ nudged: true });
    } : null);
  useEffect(() => { if (ask && ready && s.nudged) { put({ nudged: false }); api.say(item.say); } }, [ready]);
  HOOK.demo = () => (stepOn ? act(stepOn) : undefined);
  HOOK.set = (v: any) => {
    if (free || item.kind !== "order" || stage !== "ask") return false;
    const ids = (Array.isArray(v) ? v.map(String) : String(v ?? "").split(/[|,\s]+/)).filter(Boolean);
    if (ids.length !== rows.length || !rows.every((r: any) => ids.includes(r.id))) return false;
    setOrder(ids);
    return true;
  };

  /* the traceback: lock, redraw the maths in three steps ending on the whole right answer, unlock; it stays until the child acts */
  const tbRun = useRef(false);
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tbRun.current = true;
    movedRef.current = false;
    tl.run([[800, () => put({ tb: 1, moved: false, sel: null })], [800, () => put({ tb: 2 })], [1000, () => put({ tb: 3 })]], () => { tbRun.current = false; api.lock(false); });
  }, [wrong]);
  /* a replay never outlives its question (PATTERNS §18): stop it and give the lock back when the question changes */
  useEffect(() => () => { if (tbRun.current) { tl.stop(); tbRun.current = false; api.lock(false); } }, [key]);
  const tb = ask && wrong ? s.tb : 0;
  /* the win line, one sentence (at a phase's last question the runtime shows the phase's closing in its place) */
  useEffect(() => {
    if (stage !== "win" || free) return;
    const q = item.qid;
    if (q === "M3.S6.T10.C45:TW1") api.say("Yes, 3 m 7 cm is 307 cm, which is 3.07 m.");
    else if (q === "M3.S6.T10.C45:1") api.say("Yes, 1 kg 250 g is 1,250 g.");
    else if (q === "M3.S6.T10.C45:2") api.say("Yes, 4 m 60 cm is 4.6 m.");
    else if (q === "M3.S6.T10.C46:TW2") api.say("Yes, the jumps now rise from 208 cm to 251 cm.");
    else if (q === "M3.S6.T10.C46:3") api.say("Yes, one unit first, then the order is easy to see.");
    else if (q === "M3.S6.T10.C46:4") api.say("Yes, the bags go from 1,008 g to 1,800 g.");
    else if (q === "M3.S6.T10.C47:TW3") api.say("Yes, the three bags weigh 5 kg 625 g.");
    else if (q === "M3.S6.T10.C47:5") api.say("Yes, the two bags weigh 4,125 g.");
    else if (q === "M3.S6.T10.C47:7") api.say("Yes, the parcels weigh 3.17 kg.");
    else if (q === "M3.S6.T10.C48:TW4") api.say("Yes, the five children drank 1 L 150 mL.");
    else if (q === "M3.S6.T10.C48:6") api.say("Yes, the jug's marks let us read each drink.");
    else if (q === "M3.S6.T10.C48:8") api.say("Yes, the four cups hold 1 L 220 mL.");
  }, [stage, index]);
  /* the child's own digits stay in the child's boxes and cards: the correction is drawn on the working area, never over them */

  /* the chips (a working-area act, no try charged): the conversion of the misconception's card, and the reading of a drink */
  const chipsUp = !!conv && s.cv && !s.flipped[conv.id] && (ask || demo) && !tb;
  const reading = drinks.length > 0 && s.poured > s.read && (ask || demo) && !tb;
  const curD = s.poured > 0 && drinks.length ? drinks[Math.min(s.poured, drinks.length) - 1] : null;
  const curMl = curD ? curD.ml : 0;
  const pickChip = (j: number) => {
    if (!chipsUp) return;
    const v = conv.chips[j], row = rows.find((r: any) => r.id === conv.id);
    if (v === row.v) { put({ flipped: { ...s.flipped, [conv.id]: true }, cv: false, bad: null, tb: 0 }); api.sfx.settle(); }
    else { put({ bad: v }); api.sfx.tick(); }   /* the wrong chip shows what its number really is, beside the card */
    if (demo) api.did("pick-" + (j + 1));
  };
  const pickRead = (j: number) => {
    if (!reading || Date.now() - lastPick.current < 300) return;
    lastPick.current = Date.now();
    const v = twRead(curD)[j], h = Math.round(curMl / 100) * 100;
    if (v === curMl) { tl2.stop(); put({ read: s.read + 1, bad: null, lit: 0, tb: 0 }); api.sfx.tick(); }
    else {
      put({ bad: v, lit: 0 });
      tl2.run(Array.from({ length: Math.abs(curMl - h) / 5 + 1 }, (_, k) => [220, () => put({ lit: k + 1 })]));
    }
    if (demo) api.did("read-" + (j + 1));
  };

  /* what the host and the agent read back (toolApi.getState): only what the child has made, never the answer */
  api.share({ phase: n, form: s.flips, rows: rows.filter((r: any) => s.flipped && s.flipped[r.id]).map((r: any) => r.id), order: s.order || [], jug: s.poured || 0, read: s.read || 0, complete: stage === "idle" });

  const G = twInk(TW_GREEN), B = twInk(TW_BLUE), V = TW_VIOLET;
  const invite = (b: any, rx = 22) => <Invite x={b.x + b.w / 2} y={b.y + b.h / 2} w={b.w} h={b.h} rx={rx} C={C} />;

  /* ── phase 1 (and free play): three record cards ── */
  const titles = ["Two units", "Smallest unit", "Decimal"];
  const phase1 = () => {
    const asked = free || warm ? -1 : kind === "dec" ? 2 : 1;
    /* after a miss the other forms are laid face up beside the child's (the traceback), at the win all three */
    const up = (k: number) => k === 0 || win || tb >= 1 || (asked >= 0 ? k === asked : s.flips > k);
    const els: any[] = [];
    for (let k = 0; k < 3; k++) {
      const b = cardBox(k);
      const face = !up(k) ? "back" : win ? "same" : k === 0 ? "given" : k === asked ? "now" : "same";
      const ink = twToneInk(face, C);
      els.push(<g key={"c" + k}>
        {twFace(b.x, b.y, b.w, b.h, face, C)}
        <text x={b.x + b.w / 2} y={b.y + 50} textAnchor="middle" fontSize={Math.max(T.micro, Math.min(T.label, Math.floor((b.w - 44) / twTW(tx(titles[k]), 1))))} fontWeight={700} fill={face === "back" ? C.ink : ink}>{tx(titles[k])}</text>
        {face !== "back" && k === 0 && twMeas(twTwo(m), b.x + b.w / 2, b.y + 160, twFit(twTwo(m), b.w - 36, T.display, tx), ink, tx)}
        {face !== "back" && k === 1 && (k !== asked || win ? twMeas(twSmall(m), b.x + b.w / 2, b.y + 160, twFit(twSmall(m), b.w - 36, T.display, tx), ink, tx)
          : twMeas([[typed ? String(typed) : "?", m.uS]], b.x + b.w / 2, b.y + 160, twFit([[typed ? String(typed) : "?", m.uS]], b.w - 36, T.display, tx), ink, tx))}
        {face !== "back" && k === 2 && (k !== asked ? twMeas(twDecF(m), b.x + b.w / 2, b.y + 160, twFit(twDecF(m), b.w - 36, T.display, tx), ink, tx)
          : twDecBoxes(b.x, b.y + 92, b.w, 96, m.uL, slotPartsOf(typed, 2), ask && box.open ? part : -1, win ? G : ink, C, tx))}
      </g>);
    }
    /* the unit fact, or the traceback in its place */
    const fact = [{ p: [["1", m.uL]], c: V }, { s: "=", c: V }, { p: [[twNum(m.per), m.uS]], c: V }];
    let strip: any = null;
    if (tb && kind === "dec") {
      const d = String(item.answer[1]), cols = [m.uL, ...["tenths", "hundredths", "thousandths"].slice(0, d.length)];
      const cw = 190, x0 = cx - (cols.length * cw + 30) / 2;
      const colX = (j: number) => x0 + j * cw + (j ? 30 : 0) + cw / 2;
      strip = (
        <g pointerEvents="none">
          {cols.map((c: string, j: number) => <text key={"h" + j} x={colX(j)} y={292} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={V}>{tx(c)}</text>)}
          <text x={colX(0)} y={366} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={G}>{String(item.answer[0])}</text>
          <text x={x0 + cw + 15} y={366} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={G}>.</text>
          {tb >= 2 && d.split("").map((ch: string, j: number) => {
            const hold = ch === "0" && j < d.length - 1;
            return <g key={"d" + j}>
              <text x={colX(j + 1)} y={366} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={hold ? TW_GREY : G}>{ch}</text>
              {hold && <text x={colX(j + 1)} y={404} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={TW_GREY}>{tx("Place holder")}</text>}
            </g>;
          })}
        </g>
      );
    } else if (tb && kind === "small") {
      strip = (
        <g pointerEvents="none">
          {twChain(fact, cx, 312, T.prompt, tx, "f")}
          {tb >= 2 && twChain([{ p: [[twNum(m.big * m.per), m.uS]], c: B }, { s: "+", c: C.ink }, { p: [[String(m.small), m.uS]], c: B },
            ...(tb >= 3 ? [{ s: "=", c: C.ink }, { p: twSmall(m), c: G }] : [])], cx, 384, T.prompt, tx, "s")}
        </g>
      );
    }
    const label = free && s.flips >= 3 ? "New card" : "Flip";
    const on = free || (demo && stepOn === "flip");
    return (
      <g>
        {els}
        {strip || (
          <g>
            <rect x={cx - 210} y={262} width={420} height={76} rx={38} fill={tint(V, 0.9)} stroke={tint(V, 0.5)} strokeWidth={3} />
            {twChain(fact, cx, 316, T.speech, tx, "f")}
          </g>
        )}
        {(free || demo) && <Key id="flip" label={tx(label)} x={keyBox.x} y={keyBox.y} w={keyBox.w} h={keyBox.h} C={C} tone="key" disabled={!on} onClick={() => flip()}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={on ? toneInk("key", C.ink) : C.ink}>{tx(label)}</text>
        </Key>}
        {demo && stepOn === "flip" && invite(keyBox, RAD.key)}
      </g>
    );
  };

  /* ── phases 2 and 3: the class record chart ── */
  const chart = () => {
    const isOrder = kind === "order", isRule = kind === "rule";
    const showAll = win || tb >= 1;
    const unit = n === 2 ? D.unit : "g";
    const slots = n === 2 ? s.order : rows.map((r: any) => r.id);
    const right = n === 2 ? item.answer || rows.slice().sort((a: any, b: any) => a.v - b.v).map((r: any) => r.id) : [];
    const dragId = drag.drag && drag.drag.moved ? String(drag.drag.payload) : null;
    const rowEl = (r: any, y: number, lifted: boolean) => {
      const out = isOrder && tb >= 2 && right.indexOf(r.id) !== slots.indexOf(r.id);
      const conving = chipsUp && r.id === conv.id;
      const lit = lifted || s.sel === r.id || conving;
      const flippedHere = s.flipped[r.id] || showAll;
      const isBag = /^Bag/.test(r.name), isParcel = /^Parcel/.test(r.name);
      const meant = conving && s.bad !== null ? conv.means[s.bad] : null;
      const fs = twFit(r.given, COL.cardW - 30, T.xl, tx);
      return (
        <g key={"row" + r.id}>
          <rect x={ox} y={y} width={LW} height={RH - 8} rx={16} fill={lit ? tint(TW_AMBER, 0.75) : tint(C.panel, 0.55)} stroke={lit || out ? shade(TW_AMBER, 0.15) : C.rule} strokeWidth={lit || out ? 5 : 2} />
          {n === 2 && isOrder && [0, 1, 2].map((k) => <rect key={k} x={ox + 22} y={y + (RH - 8) / 2 - 14 + k * 12} width={30} height={5} rx={2.5} fill={shade(C.rule, 0.4)} />)}
          {isBag && twBagSk(n === 2 ? ox + 58 : ox + 10, y + (RH - 8) / 2 - 28)}
          {/* a bag of fruit stays a plain bag: the school bag's picture would contradict its name */}
          {n === 3 && !isBag && !isParcel && twBag(ox + 10, y + (RH - 8) / 2 - 28, 56)}
          {isParcel && twParcel(ox + 10, y + (RH - 8) / 2 - 28, 56)}
          <text x={ox + (n === 2 ? (unit === "g" ? 122 : 66) : 76)} y={y + (RH - 8) / 2 + 12} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(r.name)}</text>
          {twFace(COL.card, y + 4, COL.cardW, RH - 16, "given", C)}
          {twMeas(r.given, COL.card + COL.cardW / 2, y + (RH - 8) / 2 + fs * 0.36, fs, B, tx)}
          {flippedHere
            ? <g pointerEvents="none">{twFace(COL.chip, y + 4, COL.chipW, RH - 16, "same", C)}
                {twMeas([[twNum(r.v), unit]], COL.chip + COL.chipW / 2, y + (RH - 8) / 2 + 20, twFit([[twNum(r.v), unit]], COL.chipW - 30, T.xl, tx), G, tx)}</g>
            : conving
              ? <g pointerEvents="none">{twFace(COL.chip, y + 4, COL.chipW, RH - 16, "now", C)}
                  {twMeas(meant || [["?", unit]], COL.chip + COL.chipW / 2, y + (RH - 8) / 2 + 14, twFit(meant || [["?", unit]], COL.chipW - 30, T.prompt, tx), TW_AMBER_INK, tx)}</g>
              : <rect x={COL.chip} y={y + 4} width={COL.chipW} height={RH - 16} rx={22} fill="none" stroke={shade(C.rule, 0.2)} strokeWidth={3} strokeDasharray="12 10" />}
        </g>
      );
    };
    const live = ask || demo;
    const controls = rows.map((r: any) => {
      const y = rowY(slots.indexOf(r.id));
      return (
        <g key={"ctl" + r.id}>
          {n === 2 && isOrder && live && (
            <g {...control("row-" + r.id, tx(r.name))} {...drag.bind(r.id)} {...drag.keys(r.id)}>
              <rect x={ox} y={y} width={COL.nameW} height={RH - 8} fill="transparent" />
            </g>
          )}
          {live && !isRule && !s.flipped[r.id] && !(chipsUp && r.id === conv.id) && <Hit id={"card-" + r.id} x={COL.card} y={y + 4} w={COL.cardW} h={RH - 16} onPress={() => flipRow(r.id)} label={tx(r.name)} />}
        </g>
      );
    });
    /* what to touch next: the step's card, then (phase 3) the next card still in kilograms */
    const nextCard = demo ? (/^card-/.test(stepOn || "") ? String(stepOn).slice(5) : null)
      : n === 3 && ask && !ready && !tb && !chipsUp ? (rows.find((r: any) => !s.flipped[r.id]) || {}).id : null;
    /* the total row (phase 3) */
    const total = () => {
      if (n !== 3 || warm) return null;
      const g = rows.reduce((a: number, r: any) => a + r.v, 0);
      const ps = slotPartsOf(typed, 2);
      const tone = win ? "same" : "now";
      const ink = win ? G : twToneInk(tone, C);
      const tbox = { x: COL.card, y: totY + 4, w: COL.cardW, h: totH - 8 };
      let body: any;
      /* 2: the total is sized from the card's width, 18 clear of each edge */
      const fitIn = (pr: any[]) => twMeas(pr, tbox.x + tbox.w / 2, tbox.y + tbox.h / 2 + 18, twFit(pr, tbox.w - 36, T.xl, tx), ink, tx);
      if (item.kind === "kgdec") body = twDecBoxes(tbox.x, tbox.y + 6, tbox.w, tbox.h - 12, "kg", ps, ask && box.open ? part : -1, ink, C, tx);
      else if (item.kind === "kgg") body = fitIn([[ps[0] || "?", "kg"], [ps[1] || "?", "g"]]);
      else body = fitIn([[typed ? String(typed) : "?", "g"]]);
      return (
        <g>
          <rect x={ox} y={totY} width={LW} height={totH} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
          <text x={ox + 30} y={totY + totH / 2 + 12} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Total")}</text>
          {twFace(tbox.x, tbox.y, tbox.w, tbox.h, tone, C)}
          {body}
          {(win || tb >= 2) && <g pointerEvents="none">{twFace(COL.chip, totY + 4, COL.chipW, totH - 8, "same", C)}
            {twMeas([[twNum(g), "g"]], COL.chip + COL.chipW / 2, totY + totH / 2 + 20, twFit([[twNum(g), "g"]], COL.chipW - 30, T.xl, tx), G, tx)}</g>}
          {item.kind === "kgdec" && ask && answerOn === "card" && !box.open && ready && <g>
            <SlotPartBox id="answer-open" label={tx("Decimal card")} x={tbox.x} y={tbox.y} w={tbox.w} h={tbox.h} on={false} enabled={true} onPick={api.openAnswer} />
            <BlinkRing x={tbox.x} y={tbox.y} w={tbox.w} h={tbox.h} rx={22} C={C} m={6} />
          </g>}
          {item.kind === "kgdec" && ask && box.open && [0, 1].map((j) => {
            const mid = tbox.x + tbox.w * 0.42;
            return <SlotPartBox key={j} id={"part-" + (j + 1)} label={tx(j ? "decimal" : "whole")} x={j ? mid : tbox.x} y={tbox.y} w={j ? tbox.x + tbox.w - mid : mid - tbox.x} h={tbox.h}
              on={part === j} enabled={true} onPick={() => api.pickPart(j)} />;
          })}
        </g>
      );
    };
    /* under the chart: the right order (phase 2), the three forms of the total or the unit fact (phase 3) */
    const below = n === 2 ? rowY(nR) + 60 : totY + totH + 52;
    let strip: any = null;
    if (n === 2 && (win || tb >= 3)) {
      const sorted = rows.slice().sort((a: any, b: any) => a.v - b.v);
      const pieces: any[] = [];
      sorted.forEach((r: any, k: number) => { if (k) pieces.push({ s: "<", c: C.ink }); pieces.push({ p: [[twNum(r.v), unit]], c: G }); });
      strip = <g pointerEvents="none">{twChain(pieces, cx, below, T.prompt, tx, "o")}</g>;
    } else if (n === 3 && (win || tb >= 2)) {
      const g = rows.reduce((a: number, r: any) => a + r.v, 0);
      strip = <g pointerEvents="none">{win || tb >= 3
        ? twChain([{ p: [[twNum(g), "g"]], c: G }, { s: "=", c: C.ink }, { p: [[String(Math.floor(g / 1000)), "kg"], [String(g % 1000), "g"]], c: G },
            { s: "=", c: C.ink }, { p: [[twDec(Math.floor(g / 1000), g % 1000, 1000), "kg"]], c: G }], cx, below, T.prompt, tx, "t")
        : twChain([{ p: [["1", "kg"]], c: V }, { s: "=", c: V }, { p: [["1,000", "g"]], c: V }], cx, below, T.prompt, tx, "t")}</g>;
    }
    const cols = D.cols || [];
    return (
      <g>
        {cols.map((c: string, k: number) => <text key={"hd" + k} x={k === 0 ? ox + 20 : k === 1 ? COL.card + COL.cardW / 2 : COL.chip + COL.chipW / 2} y={34}
          textAnchor={k === 0 ? "start" : "middle"} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(c)}</text>)}
        {slots.map((id: string, slot: number) => (id === dragId ? null : rowEl(rows.find((r: any) => r.id === id), rowY(slot), false)))}
        {total()}
        {strip}
        {controls}
        {/* the conversion chips: no invite on them (it would point at the answer) */}
        {chipsUp && conv.chips.map((v: number, j: number) => {
          const bad = s.bad === v, tone = bad ? "soft" : "key";
          return <Key key={"pk" + j} id={"pick-" + (j + 1)} label={twNum(v) + " " + tx(unit)} x={chipX(j)} y={CH.y} w={CH.w} h={CH.h} C={C} tone={tone} onClick={() => pickChip(j)}>
            {twChipLab([twNum(v), unit], CH.w, toneInk(tone, C.ink), tx)}
          </Key>;
        })}
        {gated && s.nudged && rows.filter((r: any) => !s.flipped[r.id] && !(chipsUp && r.id === conv.id)).map((r: any) =>
          <BlinkRing key={"nb" + r.id} x={COL.card} y={rowY(slots.indexOf(r.id)) + 4} w={COL.cardW} h={RH - 16} rx={22} C={C} m={6} />)}
        {gated && s.nudged && chipsUp && <BlinkRing x={chipX(0)} y={CH.y} w={3 * CH.w + 2 * CH.gap} h={CH.h} rx={RAD.key} C={C} m={6} />}
        {dragId && rowEl(rows.find((r: any) => r.id === dragId), Math.max(Y0 - 10, Math.min(rowY(nR - 1) + 10, drag.drag.y - RH / 2)), true)}
        {nextCard && rowY(slots.indexOf(nextCard)) >= 0 && invite({ x: COL.card, y: rowY(slots.indexOf(nextCard)) + 4, w: COL.cardW, h: RH - 16 })}
      </g>
    );
  };

  /* ── phase 4: the chart's water column, the measuring jug, the zoom window at its surface and the reading chips ── */
  const water = () => {
    const showAll = win || tb >= 1;
    const shownN = showAll ? drinks.length : s.read;
    const level = showAll && !curMl ? drinks[drinks.length - 1].ml : curMl;
    const ml = drinks.reduce((a: number, d: any) => a + d.ml, 0);
    const ps = slotPartsOf(typed, 2);
    const cols = D.cols || [];
    const tbox = { x: W4.water, y: totY + 4, w: W4.waterW, h: totH - 8 };
    const isWhy = kind === "why", noTotal = isWhy || !!warm;
    /* the jug: a numbered mark every 100 mL and a mark every 50 mL (the fine marks are in the zoom window) */
    const marks: any[] = [];
    for (let v = 50; v <= 500; v += 50) {
      const y = jugY(v), big = v % 100 === 0;
      marks.push(<line key={"mk" + v} x1={J.x + 4} x2={J.x + 4 + (big ? 44 : 26)} y1={y} y2={y} stroke={C.ink} strokeWidth={big ? 4 : 3} />);
      if (big) marks.push(<text key={"mt" + v} x={J.x + 56} y={y + 11} fontSize={T.label} fontWeight={700} fill={C.ink}>{String(v)}</text>);
    }
    /* the zoom window: the jug's wall at the surface, a mark every 5 mL and a number every 10 mL, the jug's numbered mark inside it */
    const lens = () => {
      if (!level) return null;
      const h = Math.round(level / 100) * 100, a = Math.min(h, level), b = Math.max(h, level);
      const lo = Math.max(0, Math.min(440, Math.round(((level + h) / 2 - 30) / 5) * 5));
      /* the scale keeps 28 clear of the frame, so no number sits on the window's edge */
      const ly = (v: number) => L.y + L.h - 28 - ((v - lo) * (L.h - 56)) / 60;
      const lit = isWhy ? (tb >= 1 ? 99 : 0) : s.lit;
      const ticks: any[] = [], nums: any[] = [];
      for (let v = lo; v <= lo + 60; v += 5) {
        const y = ly(v), ten = v % 10 === 0, fifty = v % 50 === 0;
        const on = v >= a && v <= b && Math.abs(v - h) / 5 < lit;
        ticks.push(<line key={"lt" + v} x1={L.x} x2={L.x + (fifty ? 96 : ten ? 66 : 38)} y1={y} y2={y} stroke={on ? shade(TW_AMBER, 0.2) : C.ink} strokeWidth={on ? 8 : ten ? 4 : 3} />);
        /* a paper halo, drawn over the surface line, so a number the water sits on still reads */
        if (ten) nums.push(<text key={"ln" + v} x={L.x + 112} y={y + 11} fontSize={T.label} fontWeight={fifty ? 700 : 600} fill={C.ink}
          stroke="#FFFFFF" strokeWidth={7} strokeLinejoin="round" style={{ paintOrder: "stroke" } as any}>{String(v)}</text>);
      }
      return (
        <g pointerEvents="none">
          <defs><clipPath id="tw-lens"><rect x={L.x} y={L.y} width={L.w} height={L.h} rx={24} /></clipPath></defs>
          <line x1={J.x + J.w - 10} y1={jugY(level)} x2={L.x} y2={L.y + L.h / 2} stroke={C.ink} strokeWidth={3} strokeDasharray="8 8" />
          <rect x={L.x} y={L.y} width={L.w} height={L.h} rx={24} fill="#FFFFFF" />
          <g clipPath="url(#tw-lens)">
            <rect x={L.x} y={ly(level)} width={L.w} height={L.y + L.h - ly(level)} fill={TW_WATER} />
            {ticks}
            <line x1={L.x} x2={L.x + L.w} y1={ly(level)} y2={ly(level)} stroke={shade(TW_BLUE, 0.2)} strokeWidth={5} />
            {nums}
          </g>
          <rect x={L.x} y={L.y} width={L.w} height={L.h} rx={24} fill="none" stroke={C.ink} strokeWidth={5} />
          <text x={L.x + L.w / 2} y={L.y + L.h + 34} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Zoom")}</text>
        </g>
      );
    };
    const totPairs = [[ps[0] || "?", "L"], [ps[1] || "?", "mL"]];
    const pourOn = (demo && stepOn === "pour") || (ask && !tb && s.poured === s.read && s.poured < drinks.length);
    const chips = reading ? twRead(curD) : [];
    return (
      <g>
        {cols.map((c: string, k: number) => <text key={"hd" + k} x={k === 0 ? ox + 20 : W4.water + W4.waterW / 2} y={34} textAnchor={k === 0 ? "start" : "middle"} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(c)}</text>)}
        {/* the water column fills like a glass at the win */}
        <rect x={W4.water} y={Y0} width={W4.waterW} height={drinks.length * RH - 8} rx={16} fill={TW_WATER}
          style={{ transform: `scaleY(${win ? 1 : 0})`, transformBox: "fill-box", transformOrigin: "50% 100%", transition: reducedMotion() ? "none" : "transform 1100ms ease-out" } as any} />
        {drinks.map((d: any, k: number) => {
          const y = rowY(k), has = k < shownN, now = reading && k === s.read;
          return (
            <g key={"dr" + d.id}>
              <rect x={ox} y={y} width={W4.nameW} height={RH - 8} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
              {twCup(ox + 10, y + (RH - 8) / 2 - 22, 44, has)}
              <text x={ox + 62} y={y + (RH - 8) / 2 + 12} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(d.name)}</text>
              <rect x={W4.water} y={y} width={W4.waterW} height={RH - 8} rx={14} fill={win ? "none" : now ? tint(TW_AMBER, 0.78) : "#FFFFFF"}
                stroke={now || (tb >= 1 && !isWhy) ? shade(TW_AMBER, 0.15) : C.rule} strokeWidth={now || (tb >= 1 && !isWhy) ? 4 : 2} />
              {has && twMeas([[String(d.ml), "mL"]], W4.water + W4.waterW / 2, y + (RH - 8) / 2 + 14, T.prompt, G, tx)}
              {now && twMeas([["?", "mL"]], W4.water + W4.waterW / 2, y + (RH - 8) / 2 + 14, T.prompt, TW_AMBER_INK, tx)}
            </g>
          );
        })}
        {!noTotal && (
          <g>
            <rect x={ox} y={totY} width={W4.water + W4.waterW - ox} height={totH} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
            <text x={ox + 20} y={totY + totH / 2 + 12} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Total")}</text>
            {twFace(tbox.x, tbox.y, tbox.w, tbox.h, win ? "same" : "now", C)}
            {twMeas(totPairs, tbox.x + tbox.w / 2, tbox.y + tbox.h / 2 + 18, twFit(totPairs, tbox.w - 36, T.xl, tx), win ? G : TW_AMBER_INK, tx)}
          </g>
        )}
        {!noTotal && (win || tb >= 1) && <g pointerEvents="none">{twChain(win || tb >= 3
          ? [{ p: [[twNum(ml), "mL"]], c: G }, { s: "=", c: C.ink }, { p: [[String(Math.floor(ml / 1000)), "L"], [String(ml % 1000), "mL"]], c: G }]
          : tb >= 2 ? [{ p: [[twNum(ml), "mL"]], c: G }, { s: "=", c: C.ink }, { p: [["1,000", "mL"]], c: V }, { s: "+", c: C.ink }, { p: [[String(ml % 1000), "mL"]], c: B }]
          : [{ p: [[twNum(ml), "mL"]], c: G }], cx, totY + totH + 50, T.label, tx, "w")}</g>}
        {/* the measuring jug, marked in millilitres: plain, so the level and every mark read clearly (its picture is on the start page) */}
        <g>
          <path d={`M ${J.x} ${J.top} L ${J.x + J.w} ${J.top} L ${J.x + J.w - 8} ${J.bot} L ${J.x + 8} ${J.bot} Z`} fill="#FFFFFF" stroke={C.ink} strokeWidth={4} />
          {level > 0 && <path d={`M ${J.x + 4} ${jugY(level)} L ${J.x + J.w - 4} ${jugY(level)} L ${J.x + J.w - 8} ${J.bot - 2} L ${J.x + 8} ${J.bot - 2} Z`} fill={TW_WATER} />}
          <path d={`M ${J.x + J.w - 2} ${J.top + 50} Q ${J.x + J.w + 40} ${J.top + 62} ${J.x + J.w + 34} ${J.top + 140} Q ${J.x + J.w + 28} ${J.top + 200} ${J.x + J.w - 4} ${J.top + 206}`} fill="none" stroke={C.ink} strokeWidth={8} />
          <path d={`M ${J.x - 2} ${J.top} L ${J.x - 16} ${J.top - 10}`} stroke={C.ink} strokeWidth={4} />
          {marks}
          <text x={J.x + J.w / 2 + 8} y={J.bot - 18} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("mL")}</text>
        </g>
        {lens()}
        {pourOn && <Key id="pour" label={tx("Pour")} x={pourBox.x} y={pourBox.y} w={pourBox.w} h={pourBox.h} C={C} tone="key" onClick={() => pour()}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("Pour")}</text>
        </Key>}
        {pourOn && invite(pourBox, RAD.key)}
        {gated && s.nudged && pourOn && <BlinkRing x={pourBox.x} y={pourBox.y} w={pourBox.w} h={pourBox.h} rx={RAD.key} C={C} m={12} />}
        {gated && s.nudged && reading && <BlinkRing x={RC.x} y={RC.y} w={3 * RC.w + 2 * RC.gap} h={RC.h} rx={RAD.key} C={C} m={6} />}
        {/* the reading chips: the true reading, the jug's nearest numbered mark and one more, in order; no invite on them */}
        {chips.map((v: number, j: number) => {
          const bad = s.bad === v, tone = bad ? "soft" : "key";
          return <Key key={"rd" + j} id={"read-" + (j + 1)} label={v + " " + tx("mL")} x={RC.x + j * (RC.w + RC.gap)} y={RC.y} w={RC.w} h={RC.h} C={C} tone={tone} onClick={() => pickRead(j)}>
            {twChipLab([String(v), "mL"], RC.w, toneInk(tone, C.ink), tx)}
          </Key>;
        })}
      </g>
    );
  };

  return (
    <g>
      {n === 1 || free ? phase1() : n === 4 ? water() : chart()}
      {n === 1 && !free && kind === "dec" && ask && answerOn === "card" && (() => {
        const b = cardBox(2);
        if (!box.open) return ready ? <g>
          <SlotPartBox id="answer-open" label={tx("Decimal card")} x={b.x} y={b.y} w={b.w} h={b.h} on={false} enabled={true} onPick={api.openAnswer} />
          <BlinkRing x={b.x} y={b.y} w={b.w} h={b.h} rx={22} C={C} m={6} />
        </g> : null;
        const mid = b.x + b.w * 0.4;
        return [0, 1].map((j) => <SlotPartBox key={j} id={"part-" + (j + 1)} label={tx(j ? "decimal" : "whole")} x={j ? mid : b.x} y={b.y} w={j ? b.x + b.w - mid : mid - b.x} h={b.h}
          on={part === j} enabled={true} onPick={() => api.pickPart(j)} />);
      })()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  void lang;
  const item = it || (result && result.last && PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[result.last.item]) || {};
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  const G = twInk(TW_GREEN);
  let body: any = null;
  if (item.kind === "order" || item.kind === "rule") {
    body = [0, 1, 2, 3].map((k) => <rect key={k} x={36 + k * 44} y={h - 14 - (k + 1) * (h - 28) / 4} width={34} height={(k + 1) * (h - 28) / 4} rx={6} fill={tint(TW_GREEN, 0.3)} stroke={shade(TW_GREEN, 0.2)} strokeWidth={2} />);
  } else if (item.kind === "why") {
    const c = (item.choices || []).find((x: any) => x.id === String(v));
    body = <text x={w / 2} y={h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={G}>{tx(c ? c.label : "")}</text>;
  } else {
    const ps = slotPartsOf(v, 2);
    const pairs = item.kind === "dec" ? [[ps[0] + "." + ps[1], item.m.uL]] : item.kind === "kgdec" ? [[ps[0] + "." + ps[1], "kg"]]
      : item.kind === "small" ? [[twNum(leadNumber(v) || 0), item.m.uS]] : item.kind === "g" ? [[twNum(leadNumber(v) || 0), "g"]]
      : item.kind === "kgg" ? [[ps[0], "kg"], [ps[1], "g"]] : [[ps[0], "L"], [ps[1], "mL"]];
    body = twMeas(pairs, w / 2, h / 2 + 12, twFit(pairs, w - 24, T.label, tx), G, tx);
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(TW_GREEN, 0.88)} stroke={shade(TW_GREEN, 0.15)} strokeWidth={2} />
      {body}
    </g>
  );
}

function ThreeWays(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      /* the decimals are written ON the Decimal card (the phase 1 card, the phase 3 total card) */
      cardAnswer: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default ThreeWays;
