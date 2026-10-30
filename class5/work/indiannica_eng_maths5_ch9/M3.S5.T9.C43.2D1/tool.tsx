/* ═══ M3.S5.T9.C43.2D1 · other_units · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. THE NEW LOOK (keyOnly, navDots): the question lives only in the
   bubble, the working area is 64,108, 1472 x 520, nothing under box.key, every act performed on screen (api.act).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Rounded Chart Estimator: phase 1 sorts unit cards into length / weight / capacity bins (dragged, or tapped and
   then a bin tapped: the hand carries it); phase 2 taps a chart card to lay its two bars side by side and picks
   which is bigger; phase 3 stacks a card end to end (Stack, the hand carries each copy) and adds its chart number
   that many times (a decimal on the pad's point key: placing the point IS the lesson, the owner's ch 9 rule);
   phase 4 adds the same way and presses the About stamp onto the answer line, which no answer passes without. */

const TOOL_ID = "other_units";
const MEDIA_ID = "M3.S5.T9.C43.2D1";
const TOOL_NAME = "Rounded Chart Estimator";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["Seven cards, from a chart of other units."];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "You used the chart's rounded numbers, and said about every time.";
/* printed when the child opens Free play */
const FREE_LINE = "Free play: tap any card, then stack it up to four times.";

/* ── the chart ────────────────────────────────────────────────────────────────────────────
   One card a unit: `top` and "about num unit" are printed on it; `up` / `low` name the two bars Reading the chart
   lays (the other unit above, the metric unit below) and `ratio` is how big one `up` is in `low`s (a pound is
   1 / 2.2 of a kilogram). The chart's line from centimetres to feet is left out (the brief). */
const OU_ALL = ["mile", "yard", "foot", "inch", "pound", "ounce", "gallon"];
const OU_ROW1 = ["mile", "yard", "foot", "inch"];
const OU_ROW2 = ["pound", "ounce", "gallon"];
const OU_BINS = ["length", "weight", "capacity"];
const OU_KIND: any = { mile: "length", yard: "length", foot: "length", inch: "length", pound: "weight", ounce: "weight", gallon: "capacity" };
const OU_CHART: any = {
  mile: { top: "1 mile", num: "1.61", unit: "km", up: "1 mile", low: "1 km", ratio: 1.61 },
  yard: { top: "1 yard", num: "0.914", unit: "m", up: "1 yard", low: "1 m", ratio: 0.914 },
  foot: { top: "1 foot", num: "0.305", unit: "m", up: "1 foot", low: "1 m", ratio: 0.305 },
  inch: { top: "1 inch", num: "2.54", unit: "cm", up: "1 inch", low: "1 cm", ratio: 2.54 },
  pound: { top: "1 kg", num: "2.2", unit: "pounds", up: "1 pound", low: "1 kg", ratio: 1 / 2.2 },
  ounce: { top: "1 ounce", num: "28.35", unit: "g", up: "1 ounce", low: "1 g", ratio: 28.35 },
  gallon: { top: "1 gallon", num: "3.79", unit: "L", up: "1 gallon", low: "1 L", ratio: 3.79 },
};
/* the chapter's content colours: Given deep blue, Answer green, Unit fact violet, the card in use amber */
const OU_BLUE = CONTENT.hundred, OU_GREEN = CONTENT.one, OU_VIOLET = CONTENT.bead, OU_AMBER = CONTENT.ten;
const ouInk = (c: string) => shade(c, 0.42);
/* a string's width in em, Poppins-like: a Devanagari or Gujarati vowel sign or mark is narrow, a letter wide; m and w wider */
const ouW = (s: any) => {
  let e = 0;
  for (const ch of String(s)) {
    const c = ch.codePointAt(0) || 0;
    if ((c >= 0x0900 && c <= 0x0903) || (c >= 0x093a && c <= 0x094f) || (c >= 0x0951 && c <= 0x0957) || c === 0x0962 || c === 0x0963
      || (c >= 0x0a81 && c <= 0x0a83) || (c >= 0x0abc && c <= 0x0acd) || c === 0x0ae2 || c === 0x0ae3) e += 0.22;
    else if (c >= 0x0900) e += 0.85;
    else if (" .,:'".indexOf(ch) >= 0) e += 0.3;
    else if ("mwMW".indexOf(ch) >= 0) e += 0.92;
    else if (ch >= "A" && ch <= "Z") e += 0.7;
    else e += 0.6;
  }
  return Math.max(0.5, e);
};
/* a text size that keeps a string inside a width (never under the 28 floor) */
const ouFit = (s: any, wd: number, base: number) => Math.max(T.micro, Math.min(base, Math.floor(wd / ouW(s))));

/* the bins of phase 1 as ONE string, used by the judge, the dev driver's near miss, the Enter and the agent alike:
   "gallon=capacity,mile=length" (sorted) */
const ouEncode = (b: any) => Object.keys(b || {}).filter((c) => b[c]).sort().map((c) => c + "=" + b[c]).join(",");
const ouDecode = (v: any) => {
  const o: any = {};
  String(v ?? "").split(",").forEach((p) => { const [c, b] = p.split("="); if (c && b && OU_KIND[c] && OU_BINS.includes(b)) o[c] = b; });
  return o;
};
/* is the sort ready to send: every card placed (a whole sort), else something in the asked bin */
const ouReady = (it: any, b: any) => (it.all ? it.cards.every((c: string) => b[c]) : it.cards.some((c: string) => b[c] === it.bin));
const ouSortOk = (it: any, v: any) => {
  const b = ouDecode(v);
  const placed = Object.keys(b);
  if (!placed.length || placed.some((c) => !it.cards.includes(c) || b[c] !== OU_KIND[c])) return false;
  if (it.all) return it.cards.every((c: string) => b[c]);
  if (it.need) return it.need.every((c: string) => b[c] === it.bin);
  return (it.some || []).some((c: string) => b[c] === it.bin);
};
/* the right written forms of a decimal answer: the book's form, and the form column addition gives (56.70) */
const ouForms = (it: any) => (it.alt ? [it.answer, it.alt] : [it.answer]);

/* THE START PAGE (docs/LAYOUT.md §1c): START_HOOK is one printed question to wonder at; StartArt draws the chart */
const START_HOOK = "How can a chart help you compare a mile with a kilometre?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const cw = 340, ch = 120, gap = 40, x0 = (box.w - (3 * cw + 2 * gap)) / 2;
  return (
    <g>
      {["mile", "inch", "gallon"].map((id, i) => <g key={id}>{ouCard(id, x0 + i * (cw + gap), 40, cw, ch, C, tx, {})}</g>)}
      <g transform={`translate(${box.w / 2},${252})`}>{ouStampFace(C, tx, 1.05)}</g>
    </g>
  );
}

/* one chart card: the other unit on top, "about" and the rounded metric number in violet under it */
function ouCard(id: string, x: number, y: number, w: number, h: number, C: any, tx: any, o: any) {
  const c = OU_CHART[id];
  const top = tx(c.top), bot = tx("about") + " " + c.num + " " + tx(c.unit);
  /* Devanagari and Gujarati run wider than the estimate at the edge: keep about 12 clear at each end of the band */
  const f1 = ouFit(top, w - 24, o.big ? 44 : 36), f2 = ouFit(bot, w - (/[ऀ-૿]/.test(bot) ? 40 : 26), o.big ? 38 : 32);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={16} fill={o.now ? tint(OU_AMBER, 0.7) : "#FFFFFF"} stroke={o.now ? shade(OU_AMBER, 0.25) : shade(C.rule, 0.2)} strokeWidth={o.now ? 5 : 3} />
      <rect x={x + 5} y={y + h * 0.52} width={w - 10} height={h * 0.48 - 6} rx={10} fill={tint(OU_VIOLET, 0.8)} />
      <text x={x + w / 2} y={y + h * 0.4} textAnchor="middle" fontSize={f1} fontWeight={700} fill={C.ink}>{top}</text>
      <text x={x + w / 2} y={y + h * 0.86} textAnchor="middle" fontSize={f2} fontWeight={600} fill={ouInk(OU_VIOLET)}>{bot}</text>
    </g>
  );
}
/* a unit name card for the sort: violet, the unit's name */
function ouName(id: string, x: number, y: number, w: number, h: number, C: any, tx: any, o: any) {
  const s = tx(id);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={o.ghost ? "none" : tint(OU_VIOLET, 0.78)} stroke={o.ghost ? shade(OU_AMBER, 0.15) : shade(OU_VIOLET, 0.3)}
        strokeWidth={o.ghost ? 4 : 3} strokeDasharray={o.ghost ? "12 8" : undefined} />
      <text x={x + w / 2} y={y + h / 2 + (h > 84 ? 15 : 12)} textAnchor="middle" fontSize={ouFit(s, w - 16, h > 84 ? 44 : 36)} fontWeight={700} fill={o.ghost ? ouInk(OU_AMBER) : ouInk(OU_VIOLET)}>{s}</text>
    </g>
  );
}
/* the About stamp: a round rubber stamp seen from below, its word on the face (drawn round 0,0) */
function ouStampFace(C: any, tx: any, k = 1) {
  return (
    <g transform={`scale(${k})`}>
      <circle cx={0} cy={0} r={76} fill={tint(OU_AMBER, 0.55)} stroke={C.ink} strokeWidth={4} />
      <circle cx={0} cy={0} r={64} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} strokeDasharray="6 5" />
      <text x={0} y={10} textAnchor="middle" fontSize={ouFit(tx("about"), 96, 32)} fontWeight={700} fill={C.ink}>{tx("about")}</text>
    </g>
  );
}
/* the small icon of what a bin measures, in ink: a ruler, a balance, a jug (drawn in a 64 x 48 box) */
function ouIcon(b: string, x: number, y: number, C: any) {
  const st = { fill: "none", stroke: C.ink, strokeWidth: 3.5, strokeLinecap: "round" as any, strokeLinejoin: "round" as any };
  if (b === "length") return (
    <g transform={`translate(${x},${y})`}>
      <rect x={0} y={14} width={64} height={22} rx={4} {...st} fill={tint(OU_AMBER, 0.6)} />
      {[10, 22, 34, 46, 58].map((t, i) => <line key={i} x1={t} y1={14} x2={t} y2={i % 2 ? 22 : 27} {...st} strokeWidth={2.5} />)}
    </g>
  );
  if (b === "weight") return (
    <g transform={`translate(${x},${y})`}>
      <line x1={32} y1={6} x2={32} y2={44} {...st} />
      <line x1={6} y1={10} x2={58} y2={10} {...st} />
      <path d="M 2 28 Q 12 38 22 28 Z" {...st} fill={tint(OU_AMBER, 0.6)} />
      <path d="M 42 28 Q 52 38 62 28 Z" {...st} fill={tint(OU_AMBER, 0.6)} />
      <line x1={6} y1={10} x2={12} y2={28} {...st} strokeWidth={2} /><line x1={58} y1={10} x2={52} y2={28} {...st} strokeWidth={2} />
      <line x1={20} y1={44} x2={44} y2={44} {...st} />
    </g>
  );
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M 12 6 L 44 6 L 46 44 L 10 44 Z" {...st} fill={tint(OU_BLUE, 0.75)} />
      <path d="M 45 14 Q 60 16 58 28 Q 56 36 46 36" {...st} />
      <line x1={12} y1={18} x2={44} y2={18} {...st} strokeWidth={2} />
    </g>
  );
}
/* a number written in the column, one digit a cell, its point on the line x = px (so every point sits in one line) */
function ouCells(str: string, px: number, y: number, fs: number, fill: string, kp: string) {
  const s = String(str), dc = fs * 0.62, pw = fs * 0.42;
  const [a, b = ""] = s.split(".");
  const out: any[] = [];
  for (let i = 0; i < a.length; i++) out.push(<text key={kp + "w" + i} x={px - pw / 2 - dc * (a.length - i - 0.5)} y={y} textAnchor="middle" fontSize={fs} fontWeight={700} fill={fill}>{a[i]}</text>);
  if (s.includes(".")) out.push(<text key={kp + "p"} x={px} y={y} textAnchor="middle" fontSize={fs} fontWeight={700} fill={fill}>.</text>);
  for (let i = 0; i < b.length; i++) out.push(<text key={kp + "d" + i} x={px + pw / 2 + dc * (i + 0.5)} y={y} textAnchor="middle" fontSize={fs} fontWeight={700} fill={fill}>{b[i]}</text>);
  return out;
}

/* Hindi and Gujarati (docs/PATTERNS.md §11), keyed by the English byte for byte. Terms, one per idea: about लगभग / આશરે,
   length लंबाई / લંબાઈ, weight वज़न / વજન, capacity धारिता / ક્ષમતા, rounded पूर्णांकित / પૂર્ણાંકિત, stamp मुहर / મહોર,
   decimal point दशमलव बिंदु / દશાંશ ચિહ્ન, tenths दसवें भाग / દસમા ભાગ, hundredths सौवें भाग / સોમા ભાગ,
   thousandths हज़ारवें भाग / હજારમા ભાગ, carry हासिल / વદી, bin डिब्बा / ડબ્બો, bar पट्टी / પટ્ટી, Stack रखो / મૂકો. */
const TR: any = {
  hi: {
    "Rounded Chart Estimator": "चार्ट से अंदाज़ा",
    "Units used elsewhere": "दूसरी जगहों की इकाइयाँ",
    "Reading the chart": "चार्ट पढ़ना",
    "Adding the chart's numbers": "चार्ट की संख्याएँ जोड़ना",
    "About, not exact": "लगभग, ठीक-ठीक नहीं",
    "Seven cards, from a chart of other units.": "दूसरी इकाइयों के चार्ट से सात कार्ड।",
    "Free play: tap any card, then stack it up to four times.": "खुला खेल: कोई भी कार्ड दबाओ, फिर उसे चार बार तक रखो।",
    "How can a chart help you compare a mile with a kilometre?": "चार्ट मील और किलोमीटर की तुलना में कैसे मदद करता है?",
    "You used the chart's rounded numbers, and said about every time.": "तुमने चार्ट की पूर्णांकित संख्याएँ लीं और हर बार लगभग कहा।",
    "What does this unit measure? Drop it in its bin.": "यह इकाई क्या मापती है? इसे इसके डिब्बे में डालो।",
    "A foot measures length, so drag the foot card into the length bin.": "फ़ुट लंबाई मापता है, तो फ़ुट कार्ड को लंबाई वाले डिब्बे में खींचो।",
    "Pick up the foot card and let go over the length bin.": "फ़ुट कार्ड उठाओ और लंबाई वाले डिब्बे पर छोड़ो।",
    "A yard measures length too, so put the yard card beside the foot.": "गज़ भी लंबाई मापता है, तो गज़ कार्ड को फ़ुट के पास रखो।",
    "The yard card goes in the length bin.": "गज़ कार्ड लंबाई वाले डिब्बे में जाता है।",
    "A road is measured in miles, and a parcel is weighed in pounds.": "सड़क मील में मापी जाती है, और पार्सल पाउंड में तौला जाता है।",
    "Ask of each card: could you pour it, weigh it or measure how long it is?": "हर कार्ड से पूछो: इसे डाल सकते हो, तौल सकते हो या लंबाई माप सकते हो?",
    "A mile is a length, a pound a weight and a gallon a capacity.": "मील लंबाई है, पाउंड वज़न है और गैलन धारिता है।",
    "You learned: which units measure length, weight and capacity.": "तुमने सीखा: कौन-सी इकाई लंबाई, वज़न और धारिता मापती है।",
    "Sort these four cards to find which units measure length.": "इन चार कार्डों को छाँटो और देखो कौन-सी इकाइयाँ लंबाई मापती हैं।",
    "Which measure length?": "कौन लंबाई मापते हैं?",
    "Each card goes in the bin of what it measures.": "हर कार्ड उस डिब्बे में जाता है, जो वह मापता है।",
    "Name one unit of weight on the chart by dragging it into the weight bin.": "चार्ट की वज़न की एक इकाई को वज़न वाले डिब्बे में खींचो।",
    "A unit of weight?": "वज़न की एक इकाई?",
    "Which card tells how heavy something is?": "कौन-सा कार्ड बताता है कि चीज़ कितनी भारी है?",
    "Think of a shop that sells rice or sugar by weight.": "उस दुकान को सोचो जो चावल या चीनी तौलकर बेचती है।",
    "Only two cards are weights: think of what a kitchen scale shows.": "सिर्फ़ दो कार्ड वज़न के हैं: सोचो रसोई का तराज़ू क्या दिखाता है।",
    "Drop the card that measures capacity into the capacity bin.": "जो कार्ड धारिता मापता है, उसे धारिता वाले डिब्बे में डालो।",
    "Which is capacity?": "धारिता कौन-सी है?",
    "Capacity is how much a jug or a pot can hold.": "धारिता यानी जग या बर्तन में कितना समाता है।",
    "Petrol is sold by this unit in some countries.": "कुछ देशों में पेट्रोल इसी इकाई में बिकता है।",
    "A jug of milk is measured in this kind of unit.": "दूध का जग इसी तरह की इकाई में मापा जाता है।",
    "Tap a card. Which bar is longer?": "एक कार्ड दबाओ। कौन-सी पट्टी लंबी है?",
    "Tap the foot card to lay its two bars side by side.": "फ़ुट कार्ड दबाओ, उसकी दो पट्टियाँ साथ-साथ बिछेंगी।",
    "The foot card is in the chart at the top.": "फ़ुट कार्ड ऊपर चार्ट में है।",
    "Tap the mile card: a mile is a little longer than one and a half kilometres.": "मील कार्ड दबाओ: एक मील डेढ़ किलोमीटर से थोड़ा लंबा है।",
    "Find the mile card and tap it.": "मील कार्ड ढूँढो और दबाओ।",
    "Now tap the kg card: a kilogram is a little more than two pounds.": "अब किग्रा कार्ड दबाओ: एक किलोग्राम दो पाउंड से थोड़ा ज़्यादा है।",
    "The kg card is in the second row.": "किग्रा कार्ड दूसरी पंक्ति में है।",
    "Which bar reaches further to the right, the gallon's or the litre's?": "कौन-सी पट्टी दाईं ओर ज़्यादा दूर जाती है, गैलन की या लीटर की?",
    "Read the gallon card: how many litres does one gallon fill?": "गैलन कार्ड पढ़ो: एक गैलन में कितने लीटर भरते हैं?",
    "A mile is just over 1.5 km, and a kg is just over 2 pounds.": "मील 1.5 किमी से थोड़ा ज़्यादा है, और किग्रा 2 पाउंड से थोड़ा ज़्यादा।",
    "You learned to compare each unit with its metric unit on the chart.": "तुमने सीखा: चार्ट पर हर इकाई की तुलना मीट्रिक इकाई से करना।",
    "Does a gallon hold more or less than a litre?": "क्या एक गैलन में एक लीटर से ज़्यादा समाता है या कम?",
    "More or less than 1 L?": "1 ली से ज़्यादा या कम?",
    "More": "ज़्यादा", "Less": "कम", "Longer": "लंबा", "Shorter": "छोटा",
    "More than 1 L": "1 ली से ज़्यादा", "Longer than 1 cm": "1 सेमी से लंबा", "Shorter than 1 m": "1 मी से छोटा",
    "Tap the blinking gallon card.": "चमकता गैलन कार्ड दबाओ।",
    "The top bar is one gallon and the bottom bar is one litre.": "ऊपर की पट्टी एक गैलन है और नीचे की पट्टी एक लीटर।",
    "Is an inch longer or shorter than a centimetre?": "क्या एक इंच एक सेंटीमीटर से लंबा है या छोटा?",
    "Longer or shorter than 1 cm?": "1 सेमी से लंबा या छोटा?",
    "Tap the blinking inch card.": "चमकता इंच कार्ड दबाओ।",
    "Look again at which of the two bars is longer.": "फिर से देखो कि दोनों में से कौन-सी पट्टी लंबी है।",
    "The top bar is the inch and the bottom bar is the centimetre.": "ऊपर की पट्टी इंच है और नीचे की सेंटीमीटर।",
    "The inch card says about 2.54 cm: is 2.54 more than 1?": "इंच कार्ड पर लगभग 2.54 सेमी है: क्या 2.54, 1 से ज़्यादा है?",
    "Is a yard longer or shorter than a metre?": "क्या एक गज़ एक मीटर से लंबा है या छोटा?",
    "Longer or shorter than 1 m?": "1 मी से लंबा या छोटा?",
    "Tap the blinking yard card.": "चमकता गज़ कार्ड दबाओ।",
    "A yard sounds big, but read its card first.": "गज़ बड़ा लगता है, पर पहले उसका कार्ड पढ़ो।",
    "The top bar is the yard: does it end before the metre's bar?": "ऊपर की पट्टी गज़ है: क्या वह मीटर की पट्टी से पहले ख़त्म होती है?",
    "Is 0.914 more or less than 1 whole metre?": "क्या 0.914, पूरे 1 मीटर से ज़्यादा है या कम?",
    "Stack it once for each. Now add them.": "हर एक के लिए एक बार रखो। अब जोड़ो।",
    "A rope is about 2 yards, so tap Stack to lay one yard along it.": "रस्सी लगभग 2 गज़ है: एक गज़ बिछाने के लिए 'रखो' दबाओ।",
    "Tap the Stack key at the bottom.": "नीचे का 'रखो' बटन दबाओ।",
    "Tap Stack again, and the two yards meet the rope.": "'रखो' फिर दबाओ, दो गज़ रस्सी के बराबर हो जाएँगे।",
    "One more tap lays the second yard.": "एक बार और दबाने से दूसरा गज़ बिछेगा।",
    "Keep the points of the three 0.305 in one line.": "तीनों 0.305 के दशमलव बिंदु एक सीध में रखो।",
    "Add the thousandths first: 5 + 5 + 5 is 15.": "पहले हज़ारवें भाग जोड़ो: 5 + 5 + 5 = 15।",
    "For a few lots of a unit, add the chart number that many times.": "किसी इकाई के कुछ गुना के लिए, चार्ट की संख्या उतनी बार जोड़ो।",
    "You learned: for a few lots of a unit, add the chart number.": "तुमने सीखा: कुछ इकाइयों के लिए चार्ट की संख्या जोड़ो।",
    "A plank is about 3 feet long, so about how many metres is that?": "एक तख़्ता लगभग 3 फ़ुट लंबा है, तो यह लगभग कितने मीटर है?",
    "About how many metres is 3 feet?": "3 फ़ुट लगभग कितने मीटर हैं?",
    "Add 0.305 three times, once for each foot.": "0.305 को तीन बार जोड़ो, हर फ़ुट के लिए एक बार।",
    "A book is about 2 inches thick, so about how many centimetres is that?": "एक किताब लगभग 2 इंच मोटी है, तो यह लगभग कितने सेंटीमीटर है?",
    "About how many cm is 2 inches?": "2 इंच लगभग कितने सेमी हैं?",
    "Stack the inch card twice and add its numbers.": "इंच कार्ड दो बार रखो और उसकी संख्याएँ जोड़ो।",
    "Line up the points of 2.54 and 2.54 before you add.": "जोड़ने से पहले 2.54 और 2.54 के दशमलव बिंदु एक सीध में करो।",
    "Add the hundredths first: 4 + 4 is 8.": "पहले सौवें भाग जोड़ो: 4 + 4 = 8।",
    "A walk is about 2 miles long, so about how many kilometres is that?": "एक सैर लगभग 2 मील लंबी है, तो यह लगभग कितने किलोमीटर है?",
    "About how many km is 2 miles?": "2 मील लगभग कितने किमी हैं?",
    "Add 1.61 once for each mile, not 2 + 1.61.": "हर मील के लिए 1.61 एक बार जोड़ो, 2 + 1.61 नहीं।",
    "Write 1.61 under 1.61 with the points in one line.": "1.61 के नीचे 1.61 लिखो, दशमलव बिंदु एक सीध में।",
    "Add the hundredths, then the tenths, and carry when you pass 9.": "पहले सौवें, फिर दसवें भाग जोड़ो, 9 से ज़्यादा हो तो हासिल लो।",
    "Is it exact? Stamp it.": "क्या यह ठीक-ठीक है? मुहर लगाओ।",
    "The chart's numbers are rounded, so tap About to stamp the answer line.": "चार्ट की संख्याएँ पूर्णांकित हैं, तो 'लगभग' दबाकर उत्तर पर मुहर लगाओ।",
    "Tap the round About stamp.": "गोल 'लगभग' मुहर दबाओ।",
    "Line up the points of the three 2.2 before adding.": "जोड़ने से पहले तीनों 2.2 के दशमलव बिंदु एक सीध में करो।",
    "Add the three 2 tenths first, then the three 2 ones.": "पहले तीनों 2 दसवें भाग जोड़ो, फिर तीनों 2 इकाई।",
    "A chart answer is about, because its numbers are rounded.": "चार्ट का उत्तर लगभग है, क्योंकि उसकी संख्याएँ पूर्णांकित हैं।",
    "You learned: an answer from the chart is about, not exact.": "तुमने सीखा: चार्ट से मिला उत्तर लगभग है, ठीक-ठीक नहीं।",
    "A parcel weighs about 3 kg, so about how many pounds is that?": "एक पार्सल लगभग 3 किग्रा का है, तो यह लगभग कितने पाउंड है?",
    "About how many pounds is 3 kg?": "3 किग्रा लगभग कितने पाउंड हैं?",
    "Add 2.2 once for each kilogram of the parcel.": "पार्सल के हर किलोग्राम के लिए 2.2 एक बार जोड़ो।",
    "A pot holds about 3 gallons, so about how many litres is that?": "एक बर्तन में लगभग 3 गैलन समाता है, तो यह लगभग कितने लीटर है?",
    "About how many litres is 3 gallons?": "3 गैलन लगभग कितने लीटर हैं?",
    "Add 3.79 three times, once for each gallon.": "3.79 को तीन बार जोड़ो, हर गैलन के लिए एक बार।",
    "Keep the points of the three 3.79 in one line.": "तीनों 3.79 के दशमलव बिंदु एक सीध में रखो।",
    "9 + 9 + 9 hundredths is 27: write 7 and carry 2.": "9 + 9 + 9 सौवें भाग = 27: 7 लिखो और 2 हासिल लो।",
    "A letter weighs about 2 ounces, so about how many grams is that?": "एक चिट्ठी लगभग 2 औंस की है, तो यह लगभग कितने ग्राम है?",
    "About how many grams is 2 ounces?": "2 औंस लगभग कितने ग्राम हैं?",
    "Add 28.35 and 28.35 with their points in one line.": "28.35 और 28.35 को दशमलव बिंदु एक सीध में रखकर जोड़ो।",
    "5 + 5 hundredths is 10: write 0 and carry 1.": "5 + 5 सौवें भाग = 10: 0 लिखो और 1 हासिल लो।",
    "Then 3 + 3 tenths and the carried 1 make 7 tenths.": "फिर 3 + 3 दसवें भाग और हासिल का 1 मिलकर 7 दसवें भाग।",
    "Put every card in a bin first.": "पहले हर कार्ड को किसी डिब्बे में रखो।",
    "Drop a card in the weight bin first.": "पहले वज़न वाले डिब्बे में एक कार्ड डालो।",
    "Drop a card in the capacity bin first.": "पहले धारिता वाले डिब्बे में एक कार्ड डालो।",
    "Tap the blinking card first.": "पहले चमकता कार्ड दबाओ।",
    "Stamp About on the answer first.": "पहले उत्तर पर 'लगभग' की मुहर लगाओ।",
    "Yes, the mile and the inch measure length.": "हाँ, मील और इंच लंबाई मापते हैं।",
    "Yes, that card is a unit of weight.": "हाँ, वह कार्ड वज़न की इकाई है।",
    "Yes, the gallon measures capacity.": "हाँ, गैलन धारिता मापता है।",
    "Yes, a gallon holds more than a litre.": "हाँ, एक गैलन में एक लीटर से ज़्यादा समाता है।",
    "Yes, an inch is longer than a centimetre.": "हाँ, एक इंच एक सेंटीमीटर से लंबा है।",
    "Yes, a yard is shorter than a metre.": "हाँ, एक गज़ एक मीटर से छोटा है।",
    "Yes, 3 feet are about 0.915 m.": "हाँ, 3 फ़ुट लगभग 0.915 मी हैं।",
    "Yes, 2 inches are about 5.08 cm.": "हाँ, 2 इंच लगभग 5.08 सेमी हैं।",
    "Yes, 2 miles are about 3.22 km.": "हाँ, 2 मील लगभग 3.22 किमी हैं।",
    "Yes, the parcel is about 6.6 pounds, not exactly.": "हाँ, पार्सल लगभग 6.6 पाउंड है, ठीक-ठीक नहीं।",
    "Yes, about 11.37 L, because the chart is rounded.": "हाँ, लगभग 11.37 ली, क्योंकि चार्ट पूर्णांकित है।",
    "Yes, about 56.7 g, and not exactly.": "हाँ, लगभग 56.7 ग्रा, ठीक-ठीक नहीं।",
    /* words the picture draws (tx) */
    "mile": "मील", "yard": "गज़", "foot": "फ़ुट", "inch": "इंच", "pound": "पाउंड", "ounce": "औंस", "gallon": "गैलन",
    "length": "लंबाई", "weight": "वज़न", "capacity": "धारिता", "about": "लगभग", "About": "लगभग",
    "1 mile": "1 मील", "1 yard": "1 गज़", "1 foot": "1 फ़ुट", "1 inch": "1 इंच", "1 kg": "1 किग्रा", "1 ounce": "1 औंस", "1 gallon": "1 गैलन",
    "1 km": "1 किमी", "1 m": "1 मी", "1 cm": "1 सेमी", "1 pound": "1 पाउंड", "1 g": "1 ग्रा", "1 L": "1 ली",
    "km": "किमी", "m": "मी", "cm": "सेमी", "pounds": "पाउंड", "g": "ग्रा", "L": "ली",
    "this unit": "यह इकाई", "metric unit": "मीट्रिक इकाई", "Given": "दिया", "Stack": "रखो", "About stamp": "लगभग मुहर",
    "2 yards": "2 गज़", "3 feet": "3 फ़ुट", "2 inches": "2 इंच", "2 miles": "2 मील", "3 kg": "3 किग्रा", "3 gallons": "3 गैलन", "2 ounces": "2 औंस",
  },
  gu: {
    "Rounded Chart Estimator": "ચાર્ટથી અંદાજ",
    "Units used elsewhere": "બીજે વપરાતા એકમ",
    "Reading the chart": "ચાર્ટ વાંચવો",
    "Adding the chart's numbers": "ચાર્ટની સંખ્યાઓ ઉમેરવી",
    "About, not exact": "આશરે, બરાબર નહીં",
    "Seven cards, from a chart of other units.": "બીજા એકમોના ચાર્ટમાંથી સાત કાર્ડ.",
    "Free play: tap any card, then stack it up to four times.": "મુક્ત રમત: કોઈ પણ કાર્ડ દબાવો, પછી તેને ચાર વાર સુધી મૂકો.",
    "How can a chart help you compare a mile with a kilometre?": "ચાર્ટ માઈલ અને કિલોમીટરની સરખામણીમાં કેવી રીતે મદદ કરે?",
    "You used the chart's rounded numbers, and said about every time.": "તમે ચાર્ટની પૂર્ણાંકિત સંખ્યાઓ વાપરી અને દર વખતે આશરે કહ્યું.",
    "What does this unit measure? Drop it in its bin.": "આ એકમ શું માપે છે? તેને તેના ડબ્બામાં મૂકો.",
    "A foot measures length, so drag the foot card into the length bin.": "ફૂટ લંબાઈ માપે છે, તો ફૂટ કાર્ડને લંબાઈના ડબ્બામાં ખેંચો.",
    "Pick up the foot card and let go over the length bin.": "ફૂટ કાર્ડ ઉપાડી લંબાઈના ડબ્બા પર છોડો.",
    "A yard measures length too, so put the yard card beside the foot.": "યાર્ડ પણ લંબાઈ માપે છે, તો યાર્ડ કાર્ડ ફૂટની પાસે મૂકો.",
    "The yard card goes in the length bin.": "યાર્ડ કાર્ડ લંબાઈના ડબ્બામાં જાય છે.",
    "A road is measured in miles, and a parcel is weighed in pounds.": "રસ્તો માઈલમાં મપાય છે, અને પાર્સલ પાઉન્ડમાં જોખાય છે.",
    "Ask of each card: could you pour it, weigh it or measure how long it is?": "દરેક કાર્ડને પૂછો: તે રેડાય, જોખાય કે તેની લંબાઈ મપાય?",
    "A mile is a length, a pound a weight and a gallon a capacity.": "માઈલ લંબાઈ છે, પાઉન્ડ વજન છે અને ગૅલન ક્ષમતા છે.",
    "You learned: which units measure length, weight and capacity.": "તમે શીખ્યા: કયા એકમ લંબાઈ, વજન અને ક્ષમતા માપે છે.",
    "Sort these four cards to find which units measure length.": "આ ચાર કાર્ડ ગોઠવો અને જુઓ કયા એકમ લંબાઈ માપે છે.",
    "Which measure length?": "કયા લંબાઈ માપે છે?",
    "Each card goes in the bin of what it measures.": "દરેક કાર્ડ, તે જે માપે તેના ડબ્બામાં જાય.",
    "Name one unit of weight on the chart by dragging it into the weight bin.": "ચાર્ટનો વજનનો એક એકમ વજનના ડબ્બામાં ખેંચો.",
    "A unit of weight?": "વજનનો એક એકમ?",
    "Which card tells how heavy something is?": "કયું કાર્ડ કહે છે કે વસ્તુ કેટલી ભારે છે?",
    "Think of a shop that sells rice or sugar by weight.": "ચોખા કે ખાંડ જોખીને વેચતી દુકાન વિશે વિચારો.",
    "Only two cards are weights: think of what a kitchen scale shows.": "ફક્ત બે કાર્ડ વજનના છે: રસોડાનો કાંટો શું બતાવે તે વિચારો.",
    "Drop the card that measures capacity into the capacity bin.": "જે કાર્ડ ક્ષમતા માપે, તેને ક્ષમતાના ડબ્બામાં મૂકો.",
    "Which is capacity?": "ક્ષમતા કયું છે?",
    "Capacity is how much a jug or a pot can hold.": "ક્ષમતા એટલે જગ કે વાસણમાં કેટલું સમાય.",
    "Petrol is sold by this unit in some countries.": "કેટલાક દેશોમાં પેટ્રોલ આ એકમમાં વેચાય છે.",
    "A jug of milk is measured in this kind of unit.": "દૂધનો જગ આવા એકમમાં મપાય છે.",
    "Tap a card. Which bar is longer?": "એક કાર્ડ દબાવો. કઈ પટ્ટી લાંબી છે?",
    "Tap the foot card to lay its two bars side by side.": "ફૂટ કાર્ડ દબાવો, તેની બે પટ્ટી બાજુ-બાજુમાં મુકાશે.",
    "The foot card is in the chart at the top.": "ફૂટ કાર્ડ ઉપર ચાર્ટમાં છે.",
    "Tap the mile card: a mile is a little longer than one and a half kilometres.": "માઈલ કાર્ડ દબાવો: એક માઈલ દોઢ કિલોમીટરથી થોડો લાંબો છે.",
    "Find the mile card and tap it.": "માઈલ કાર્ડ શોધીને દબાવો.",
    "Now tap the kg card: a kilogram is a little more than two pounds.": "હવે કિગ્રા કાર્ડ દબાવો: એક કિલોગ્રામ બે પાઉન્ડથી થોડો વધુ છે.",
    "The kg card is in the second row.": "કિગ્રા કાર્ડ બીજી હરોળમાં છે.",
    "Which bar reaches further to the right, the gallon's or the litre's?": "કઈ પટ્ટી જમણી બાજુ વધુ દૂર જાય, ગૅલનની કે લિટરની?",
    "Read the gallon card: how many litres does one gallon fill?": "ગૅલન કાર્ડ વાંચો: એક ગૅલનમાં કેટલા લિટર ભરાય?",
    "A mile is just over 1.5 km, and a kg is just over 2 pounds.": "માઈલ 1.5 કિમીથી થોડો વધુ, અને કિગ્રા 2 પાઉન્ડથી થોડો વધુ છે.",
    "You learned to compare each unit with its metric unit on the chart.": "તમે શીખ્યા: ચાર્ટ પર દરેક એકમને મેટ્રિક એકમ સાથે સરખાવવો.",
    "Does a gallon hold more or less than a litre?": "શું એક ગૅલનમાં એક લિટરથી વધુ સમાય કે ઓછું?",
    "More or less than 1 L?": "1 લિથી વધુ કે ઓછું?",
    "More": "વધુ", "Less": "ઓછું", "Longer": "લાંબું", "Shorter": "ટૂંકું",
    "More than 1 L": "1 લિથી વધુ", "Longer than 1 cm": "1 સેમીથી લાંબું", "Shorter than 1 m": "1 મીથી ટૂંકું",
    "Tap the blinking gallon card.": "ઝબકતું ગૅલન કાર્ડ દબાવો.",
    "The top bar is one gallon and the bottom bar is one litre.": "ઉપરની પટ્ટી એક ગૅલન અને નીચેની પટ્ટી એક લિટર છે.",
    "Is an inch longer or shorter than a centimetre?": "શું એક ઇંચ એક સેન્ટિમીટરથી લાંબો છે કે ટૂંકો?",
    "Longer or shorter than 1 cm?": "1 સેમીથી લાંબું કે ટૂંકું?",
    "Tap the blinking inch card.": "ઝબકતું ઇંચ કાર્ડ દબાવો.",
    "Look again at which of the two bars is longer.": "ફરી જુઓ કે બેમાંથી કઈ પટ્ટી લાંબી છે.",
    "The top bar is the inch and the bottom bar is the centimetre.": "ઉપરની પટ્ટી ઇંચ અને નીચેની સેન્ટિમીટર છે.",
    "The inch card says about 2.54 cm: is 2.54 more than 1?": "ઇંચ કાર્ડ પર આશરે 2.54 સેમી છે: શું 2.54, 1 કરતાં વધુ છે?",
    "Is a yard longer or shorter than a metre?": "શું એક યાર્ડ એક મીટરથી લાંબો છે કે ટૂંકો?",
    "Longer or shorter than 1 m?": "1 મીથી લાંબું કે ટૂંકું?",
    "Tap the blinking yard card.": "ઝબકતું યાર્ડ કાર્ડ દબાવો.",
    "A yard sounds big, but read its card first.": "યાર્ડ મોટો લાગે, પણ પહેલાં તેનું કાર્ડ વાંચો.",
    "The top bar is the yard: does it end before the metre's bar?": "ઉપરની પટ્ટી યાર્ડ છે: શું તે મીટરની પટ્ટી પહેલાં પૂરી થાય છે?",
    "Is 0.914 more or less than 1 whole metre?": "શું 0.914, આખા 1 મીટરથી વધુ છે કે ઓછું?",
    "Stack it once for each. Now add them.": "દરેક માટે એક વાર મૂકો. હવે ઉમેરો.",
    "A rope is about 2 yards, so tap Stack to lay one yard along it.": "દોરડું આશરે 2 યાર્ડ છે: એક યાર્ડ મૂકવા 'મૂકો' દબાવો.",
    "Tap the Stack key at the bottom.": "નીચેનું 'મૂકો' બટન દબાવો.",
    "Tap Stack again, and the two yards meet the rope.": "'મૂકો' ફરી દબાવો, બે યાર્ડ દોરડા જેટલા થશે.",
    "One more tap lays the second yard.": "એક વાર વધુ દબાવવાથી બીજો યાર્ડ મુકાશે.",
    "Keep the points of the three 0.305 in one line.": "ત્રણેય 0.305 નાં દશાંશ ચિહ્ન એક લીટીમાં રાખો.",
    "Add the thousandths first: 5 + 5 + 5 is 15.": "પહેલાં હજારમા ભાગ ઉમેરો: 5 + 5 + 5 = 15.",
    "For a few lots of a unit, add the chart number that many times.": "એકમના થોડા ગણા માટે, ચાર્ટની સંખ્યા એટલી વાર ઉમેરો.",
    "You learned: for a few lots of a unit, add the chart number.": "તમે શીખ્યા: થોડા એકમ માટે ચાર્ટની સંખ્યા ઉમેરો.",
    "A plank is about 3 feet long, so about how many metres is that?": "એક પાટિયું આશરે 3 ફૂટ લાંબું છે, તો તે આશરે કેટલા મીટર છે?",
    "About how many metres is 3 feet?": "3 ફૂટ આશરે કેટલા મીટર છે?",
    "Add 0.305 three times, once for each foot.": "0.305 ત્રણ વાર ઉમેરો, દરેક ફૂટ માટે એક વાર.",
    "A book is about 2 inches thick, so about how many centimetres is that?": "એક ચોપડી આશરે 2 ઇંચ જાડી છે, તો તે આશરે કેટલા સેન્ટિમીટર છે?",
    "About how many cm is 2 inches?": "2 ઇંચ આશરે કેટલા સેમી છે?",
    "Stack the inch card twice and add its numbers.": "ઇંચ કાર્ડ બે વાર મૂકો અને તેની સંખ્યાઓ ઉમેરો.",
    "Line up the points of 2.54 and 2.54 before you add.": "ઉમેરતાં પહેલાં 2.54 અને 2.54 નાં દશાંશ ચિહ્ન એક લીટીમાં કરો.",
    "Add the hundredths first: 4 + 4 is 8.": "પહેલાં સોમા ભાગ ઉમેરો: 4 + 4 = 8.",
    "A walk is about 2 miles long, so about how many kilometres is that?": "ફરવાનો રસ્તો આશરે 2 માઈલ લાંબો છે, તો તે આશરે કેટલા કિલોમીટર છે?",
    "About how many km is 2 miles?": "2 માઈલ આશરે કેટલા કિમી છે?",
    "Add 1.61 once for each mile, not 2 + 1.61.": "દરેક માઈલ માટે 1.61 એક વાર ઉમેરો, 2 + 1.61 નહીં.",
    "Write 1.61 under 1.61 with the points in one line.": "1.61 નીચે 1.61 લખો, દશાંશ ચિહ્ન એક લીટીમાં.",
    "Add the hundredths, then the tenths, and carry when you pass 9.": "પહેલાં સોમા, પછી દસમા ભાગ ઉમેરો, 9 થી વધે તો વદી લો.",
    "Is it exact? Stamp it.": "શું એ બરાબર છે? મહોર મારો.",
    "The chart's numbers are rounded, so tap About to stamp the answer line.": "ચાર્ટની સંખ્યાઓ પૂર્ણાંકિત છે, તો 'આશરે' દબાવી જવાબ પર મહોર મારો.",
    "Tap the round About stamp.": "ગોળ 'આશરે' મહોર દબાવો.",
    "Line up the points of the three 2.2 before adding.": "ઉમેરતાં પહેલાં ત્રણેય 2.2 નાં દશાંશ ચિહ્ન એક લીટીમાં કરો.",
    "Add the three 2 tenths first, then the three 2 ones.": "પહેલાં ત્રણેય 2 દસમા ભાગ ઉમેરો, પછી ત્રણેય 2 એકમ.",
    "A chart answer is about, because its numbers are rounded.": "ચાર્ટનો જવાબ આશરે છે, કારણ કે તેની સંખ્યાઓ પૂર્ણાંકિત છે.",
    "You learned: an answer from the chart is about, not exact.": "તમે શીખ્યા: ચાર્ટનો જવાબ આશરે છે, બરાબર નહીં.",
    "A parcel weighs about 3 kg, so about how many pounds is that?": "એક પાર્સલ આશરે 3 કિગ્રાનું છે, તો તે આશરે કેટલા પાઉન્ડ છે?",
    "About how many pounds is 3 kg?": "3 કિગ્રા આશરે કેટલા પાઉન્ડ છે?",
    "Add 2.2 once for each kilogram of the parcel.": "પાર્સલના દરેક કિલોગ્રામ માટે 2.2 એક વાર ઉમેરો.",
    "A pot holds about 3 gallons, so about how many litres is that?": "એક વાસણમાં આશરે 3 ગૅલન સમાય છે, તો તે આશરે કેટલા લિટર છે?",
    "About how many litres is 3 gallons?": "3 ગૅલન આશરે કેટલા લિટર છે?",
    "Add 3.79 three times, once for each gallon.": "3.79 ત્રણ વાર ઉમેરો, દરેક ગૅલન માટે એક વાર.",
    "Keep the points of the three 3.79 in one line.": "ત્રણેય 3.79 નાં દશાંશ ચિહ્ન એક લીટીમાં રાખો.",
    "9 + 9 + 9 hundredths is 27: write 7 and carry 2.": "9 + 9 + 9 સોમા ભાગ = 27: 7 લખો અને 2 વદી લો.",
    "A letter weighs about 2 ounces, so about how many grams is that?": "એક પત્ર આશરે 2 ઔંસનો છે, તો તે આશરે કેટલા ગ્રામ છે?",
    "About how many grams is 2 ounces?": "2 ઔંસ આશરે કેટલા ગ્રામ છે?",
    "Add 28.35 and 28.35 with their points in one line.": "28.35 અને 28.35 ને દશાંશ ચિહ્ન એક લીટીમાં રાખી ઉમેરો.",
    "5 + 5 hundredths is 10: write 0 and carry 1.": "5 + 5 સોમા ભાગ = 10: 0 લખો અને 1 વદી લો.",
    "Then 3 + 3 tenths and the carried 1 make 7 tenths.": "પછી 3 + 3 દસમા ભાગ અને વદીનો 1 મળી 7 દસમા ભાગ.",
    "Put every card in a bin first.": "પહેલાં દરેક કાર્ડ કોઈ ડબ્બામાં મૂકો.",
    "Drop a card in the weight bin first.": "પહેલાં વજનના ડબ્બામાં એક કાર્ડ મૂકો.",
    "Drop a card in the capacity bin first.": "પહેલાં ક્ષમતાના ડબ્બામાં એક કાર્ડ મૂકો.",
    "Tap the blinking card first.": "પહેલાં ઝબકતું કાર્ડ દબાવો.",
    "Stamp About on the answer first.": "પહેલાં જવાબ પર 'આશરે'ની મહોર મારો.",
    "Yes, the mile and the inch measure length.": "હા, માઈલ અને ઇંચ લંબાઈ માપે છે.",
    "Yes, that card is a unit of weight.": "હા, તે કાર્ડ વજનનો એકમ છે.",
    "Yes, the gallon measures capacity.": "હા, ગૅલન ક્ષમતા માપે છે.",
    "Yes, a gallon holds more than a litre.": "હા, એક ગૅલનમાં એક લિટરથી વધુ સમાય છે.",
    "Yes, an inch is longer than a centimetre.": "હા, એક ઇંચ એક સેન્ટિમીટરથી લાંબો છે.",
    "Yes, a yard is shorter than a metre.": "હા, એક યાર્ડ એક મીટરથી ટૂંકો છે.",
    "Yes, 3 feet are about 0.915 m.": "હા, 3 ફૂટ આશરે 0.915 મી છે.",
    "Yes, 2 inches are about 5.08 cm.": "હા, 2 ઇંચ આશરે 5.08 સેમી છે.",
    "Yes, 2 miles are about 3.22 km.": "હા, 2 માઈલ આશરે 3.22 કિમી છે.",
    "Yes, the parcel is about 6.6 pounds, not exactly.": "હા, પાર્સલ આશરે 6.6 પાઉન્ડ છે, બરાબર નહીં.",
    "Yes, about 11.37 L, because the chart is rounded.": "હા, આશરે 11.37 લિ, કારણ કે ચાર્ટ પૂર્ણાંકિત છે.",
    "Yes, about 56.7 g, and not exactly.": "હા, આશરે 56.7 ગ્રા, બરાબર નહીં.",
    /* words the picture draws (tx) */
    "mile": "માઈલ", "yard": "યાર્ડ", "foot": "ફૂટ", "inch": "ઇંચ", "pound": "પાઉન્ડ", "ounce": "ઔંસ", "gallon": "ગૅલન",
    "length": "લંબાઈ", "weight": "વજન", "capacity": "ક્ષમતા", "about": "આશરે", "About": "આશરે",
    "1 mile": "1 માઈલ", "1 yard": "1 યાર્ડ", "1 foot": "1 ફૂટ", "1 inch": "1 ઇંચ", "1 kg": "1 કિગ્રા", "1 ounce": "1 ઔંસ", "1 gallon": "1 ગૅલન",
    "1 km": "1 કિમી", "1 m": "1 મી", "1 cm": "1 સેમી", "1 pound": "1 પાઉન્ડ", "1 g": "1 ગ્રા", "1 L": "1 લિ",
    "km": "કિમી", "m": "મી", "cm": "સેમી", "pounds": "પાઉન્ડ", "g": "ગ્રા", "L": "લિ",
    "this unit": "આ એકમ", "metric unit": "મેટ્રિક એકમ", "Given": "આપેલ", "Stack": "મૂકો", "About stamp": "આશરે મહોર",
    "2 yards": "2 યાર્ડ", "3 feet": "3 ફૂટ", "2 inches": "2 ઇંચ", "2 miles": "2 માઈલ", "3 kg": "3 કિગ્રા", "3 gallons": "3 ગૅલન", "2 ounces": "2 ઔંસ",
  },
};

const PHASES = [
  {
    n: 1,
    concept: "Units used elsewhere",
    conceptId: "M3.S5.T9.C40", objectiveIds: ["O15"],
    says: ["What does this unit measure? Drop it in its bin."],
    steps: [
      { say: "A foot measures length, so drag the foot card into the length bin.", on: "card-foot", hint: "Pick up the foot card and let go over the length bin." },
      { say: "A yard measures length too, so put the yard card beside the foot.", on: "card-yard", hint: "The yard card goes in the length bin." },
    ],
    ladder: ["A road is measured in miles, and a parcel is weighed in pounds.", "Ask of each card: could you pour it, weigh it or measure how long it is?"],
    closing: "A mile is a length, a pound a weight and a gallon a capacity.",
    learned: "You learned: which units measure length, weight and capacity.",
    traceback: "The cards stay where the child put them; each card's own bin lights amber with a dashed copy of the card in it.",
    items: [
      /* learn OU1: answer in the plan = Miles and inches (the whole sort, so the length bin holds those two) */
      { qid: "M3.S5.T9.C40:OU1", kind: "sort", pad: "enter", cards: ["mile", "pound", "inch", "gallon"], bin: "length", all: true,
        say: "Sort these four cards to find which units measure length.", ask: "Which measure length?",
        answer: "gallon=capacity,inch=length,mile=length,pound=weight", near: "gallon=length,inch=length,mile=length,pound=length",
        forms: ["miles and inches"],
        miss: "Each card goes in the bin of what it measures." },
      /* practice 1: answer in the plan = The pound or the ounce (either is right) */
      { qid: "M3.S5.T9.C40:1", kind: "sort", pad: "enter", cards: OU_ALL, bin: "weight", some: ["pound", "ounce"],
        say: "Name one unit of weight on the chart by dragging it into the weight bin.", ask: "A unit of weight?",
        answer: "pound=weight", near: "mile=weight",
        miss: "Which card tells how heavy something is?",
        ladder: ["Think of a shop that sells rice or sugar by weight.", "Only two cards are weights: think of what a kitchen scale shows."] },
      /* practice 2: answer in the plan = A gallon */
      { qid: "M3.S5.T9.C40:2", kind: "sort", pad: "enter", cards: ["mile", "gallon", "ounce"], bin: "capacity", need: ["gallon"],
        say: "Drop the card that measures capacity into the capacity bin.", ask: "Which is capacity?",
        answer: "gallon=capacity", near: "ounce=capacity",
        miss: "Capacity is how much a jug or a pot can hold.",
        ladder: ["Petrol is sold by this unit in some countries.", "A jug of milk is measured in this kind of unit."] },
    ],
  },
  {
    n: 2,
    concept: "Reading the chart",
    conceptId: "M3.S5.T9.C41", objectiveIds: ["O15"],
    says: ["Tap a card. Which bar is longer?"],
    steps: [
      { say: "Tap the foot card to lay its two bars side by side.", on: "card-foot", hint: "The foot card is in the chart at the top." },
      { say: "Tap the mile card: a mile is a little longer than one and a half kilometres.", on: "card-mile", hint: "Find the mile card and tap it." },
      { say: "Now tap the kg card: a kilogram is a little more than two pounds.", on: "card-pound", hint: "The kg card is in the second row." },
    ],
    ladder: ["Which bar reaches further to the right, the gallon's or the litre's?", "Read the gallon card: how many litres does one gallon fill?"],
    closing: "A mile is just over 1.5 km, and a kg is just over 2 pounds.",
    learned: "You learned to compare each unit with its metric unit on the chart.",
    traceback: "The question's card lays its two bars side by side, the longer bar glows and its words are written under them.",
    items: [
      /* learn OU2: answer in the plan = More. A gallon holds a little less than 4 litres. */
      { qid: "M3.S5.T9.C41:OU2", kind: "compare", card: "gallon",
        say: "Does a gallon hold more or less than a litre?", ask: "More or less than 1 L?",
        choices: [{ id: "more", label: "More" }, { id: "less", label: "Less" }], answer: "more", near: "less", result: "More than 1 L",
        /* the first rung is "tap the card" until its bars are laid; once they are, `missLaid` takes its place (Work sets it) */
        miss: "Tap the blinking gallon card.", missLaid: "The top bar is one gallon and the bottom bar is one litre." },
      /* practice 3: answer in the plan = Longer: the chart gives 1 inch as about 2.54 cm */
      { qid: "M3.S5.T9.C41:3", kind: "compare", card: "inch",
        say: "Is an inch longer or shorter than a centimetre?", ask: "Longer or shorter than 1 cm?",
        choices: [{ id: "longer", label: "Longer" }, { id: "shorter", label: "Shorter" }], answer: "longer", near: "shorter", result: "Longer than 1 cm",
        miss: "Tap the blinking inch card.", missLaid: "Look again at which of the two bars is longer.",
        ladder: ["The top bar is the inch and the bottom bar is the centimetre.", "The inch card says about 2.54 cm: is 2.54 more than 1?"] },
      /* practice 4: answer in the plan = Shorter, a little less than 1 m */
      { qid: "M3.S5.T9.C41:4", kind: "compare", card: "yard",
        say: "Is a yard longer or shorter than a metre?", ask: "Longer or shorter than 1 m?",
        choices: [{ id: "longer", label: "Longer" }, { id: "shorter", label: "Shorter" }], answer: "shorter", near: "longer", result: "Shorter than 1 m",
        miss: "Tap the blinking yard card.", missLaid: "A yard sounds big, but read its card first.",
        ladder: ["The top bar is the yard: does it end before the metre's bar?", "Is 0.914 more or less than 1 whole metre?"] },
    ],
  },
  {
    n: 3,
    concept: "Adding the chart's numbers",
    conceptId: "M3.S5.T9.C42", objectiveIds: ["O16"],
    says: ["Stack it once for each. Now add them."],
    steps: [
      { say: "A rope is about 2 yards, so tap Stack to lay one yard along it.", on: "stack", hint: "Tap the Stack key at the bottom." },
      { say: "Tap Stack again, and the two yards meet the rope.", on: "stack", hint: "One more tap lays the second yard." },
    ],
    /* the guide steps' warm-up (never question 1's own numbers): a rope of about 2 yards */
    warm: { card: "yard", count: 2, given: "2 yards" },
    ladder: ["Keep the points of the three 0.305 in one line.", "Add the thousandths first: 5 + 5 + 5 is 15."],
    closing: "For a few lots of a unit, add the chart number that many times.",
    learned: "You learned: for a few lots of a unit, add the chart number.",
    traceback: "The stack fills to the given length (a missing copy outlined amber) and the column adds the copies' numbers to the answer.",
    items: [
      /* learn OU3: answer in the plan = About 0.915 m. */
      { qid: "M3.S5.T9.C42:OU3", kind: "stack", card: "foot", count: 3, given: "3 feet",
        say: "A plank is about 3 feet long, so about how many metres is that?", ask: "About how many metres is 3 feet?",
        answer: "0.915", near: "3.305",
        miss: "Add 0.305 three times, once for each foot." },
      /* practice 5: answer in the plan = About 5.08 cm, because 2.54 + 2.54 = 5.08 */
      { qid: "M3.S5.T9.C42:5", kind: "stack", card: "inch", count: 2, given: "2 inches",
        say: "A book is about 2 inches thick, so about how many centimetres is that?", ask: "About how many cm is 2 inches?",
        answer: "5.08", near: "4.54",
        miss: "Stack the inch card twice and add its numbers.",
        ladder: ["Line up the points of 2.54 and 2.54 before you add.", "Add the hundredths first: 4 + 4 is 8."] },
      /* practice 6: answer in the plan = About 3.22 km, because 1.61 + 1.61 = 3.22 */
      { qid: "M3.S5.T9.C42:6", kind: "stack", card: "mile", count: 2, given: "2 miles",
        say: "A walk is about 2 miles long, so about how many kilometres is that?", ask: "About how many km is 2 miles?",
        answer: "3.22", near: "3.61",
        miss: "Add 1.61 once for each mile, not 2 + 1.61.",
        ladder: ["Write 1.61 under 1.61 with the points in one line.", "Add the hundredths, then the tenths, and carry when you pass 9."] },
    ],
  },
  {
    n: 4,
    concept: "About, not exact",
    conceptId: "M3.S5.T9.C43", objectiveIds: ["O16"],
    says: ["Is it exact? Stamp it."],
    steps: [
      { say: "The chart's numbers are rounded, so tap About to stamp the answer line.", on: "stamp", hint: "Tap the round About stamp." },
    ],
    /* the guide step's warm-up: the same rope of about 2 yards, already stacked */
    warm: { card: "yard", count: 2, given: "2 yards" },
    ladder: ["Line up the points of the three 2.2 before adding.", "Add the three 2 tenths first, then the three 2 ones."],
    closing: "A chart answer is about, because its numbers are rounded.",
    learned: "You learned: an answer from the chart is about, not exact.",
    traceback: "The column adds the copies' numbers to the answer, which waits under the About stamp.",
    items: [
      /* learn OU4: answer in the plan = About 6.6 pounds. The chart's numbers are rounded, so the answer is close, not exact. */
      { qid: "M3.S5.T9.C43:OU4", kind: "about", card: "pound", count: 3, given: "3 kg",
        say: "A parcel weighs about 3 kg, so about how many pounds is that?", ask: "About how many pounds is 3 kg?",
        answer: "6.6", near: "5.2",
        miss: "Add 2.2 once for each kilogram of the parcel." },
      /* practice 7: answer in the plan = About 11.37 L, because 3.79 + 3.79 + 3.79 = 11.37, and the chart's numbers are rounded */
      { qid: "M3.S5.T9.C43:7", kind: "about", card: "gallon", count: 3, given: "3 gallons",
        say: "A pot holds about 3 gallons, so about how many litres is that?", ask: "About how many litres is 3 gallons?",
        answer: "11.37", near: "6.79",
        miss: "Add 3.79 three times, once for each gallon.",
        ladder: ["Keep the points of the three 3.79 in one line.", "9 + 9 + 9 hundredths is 27: write 7 and carry 2."] },
      /* practice 8: answer in the plan = About 56.7 g, because 28.35 + 28.35 = 56.7 (column addition writes 56.70: both are right) */
      { qid: "M3.S5.T9.C43:8", kind: "about", card: "ounce", count: 2, given: "2 ounces",
        say: "A letter weighs about 2 ounces, so about how many grams is that?", ask: "About how many grams is 2 ounces?",
        answer: "56.7", alt: "56.70", near: "30.35",
        miss: "Add 28.35 and 28.35 with their points in one line.",
        ladder: ["5 + 5 hundredths is 10: write 0 and carry 1.", "Then 3 + 3 tenths and the carried 1 make 7 tenths."] },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL = { chart: OU_CHART, kinds: OU_KIND, bins: OU_BINS, rows: [OU_ROW1, OU_ROW2], freeMax: 4 };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: the sort by its bins; a choice by its id; a decimal by its written form (".915" and "0.9150" miss) */
const judge = (item: any, v: any) => {
  if (item.kind === "sort") return ouSortOk(item, v);
  if (item.choices) return String(v ?? "").trim().toLowerCase() === item.answer;
  return ouForms(item).includes(String(v ?? "").trim());
};
/* oracle: a second route that shares no code with judge or Work: the chart in thousandths, added by whole numbers */
const oracle = () => {
  const MILLI: any = { mile: 1610, yard: 914, foot: 305, inch: 2540, pound: 2200, ounce: 28350, gallon: 3790 };
  const LEN = ["mile", "yard", "foot", "inch"], WT = ["pound", "ounce"], CAP = ["gallon"];
  const home = (c: string) => (LEN.indexOf(c) >= 0 ? "length" : WT.indexOf(c) >= 0 ? "weight" : CAP.indexOf(c) >= 0 ? "capacity" : "?");
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "sort") {
      const pairs = String(it.answer).split(",").map((x) => x.split("="));
      return pairs.length > 0 && pairs.every(([c, b]) => home(c) === b && it.bin && (b === it.bin || it.all));
    }
    if (it.kind === "compare") {
      const bigger = MILLI[it.card] > 1000;
      return bigger ? ["more", "longer"].indexOf(it.answer) >= 0 : ["less", "shorter"].indexOf(it.answer) >= 0;
    }
    const total = MILLI[it.card] * it.count;
    return Math.round(parseFloat(it.answer) * 1000) === total;
  }));
};
/* the most likely wrong answer (the misconception: everything is length; the count added once to the chart number) */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : "~");
/* the forms of an answer that no question, hint or ladder line may print (a choice's words are in its own question) */
const answerForms = (item: any) => (item.kind === "sort" ? item.forms || []
  : item.choices ? [] : [...ouForms(item), speakable(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): the sort is set on the bins; a decimal is typed as it is (toolApi.answer strips the point);
   a choice is the runtime's own */
const answer = (item: any, v: any) => (item.kind === "sort" ? (HOOK.set ? HOOK.set(v) : undefined)
  : !item.choices ? (HOOK.type ? HOOK.type(v) : undefined) : undefined);
/* the agent's check() before Enter: in About, not exact it presses the stamp first (undefined = press Enter) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free", demo = stage === "demo", asking = stage === "ask";
  const done = stage === "win" || stage === "idle" || stage === "summary";
  const k = free ? "free" : item.kind;
  const w = box ? box.w : 1472, H = box ? box.h : 520;
  const kx = box && box.key ? box.key.x - 12 : w;
  /* a phase opens on "teach" for one frame before "demo": both are the warm-up (PATTERNS §18), never question 1's board */
  const warmup = demo || stage === "teach";
  const qk = n + ":" + index + ":" + (warmup ? "d" : free ? "f" : "q");
  const qkRef = useRef(qk);
  qkRef.current = qk;
  /* the guide steps work the phase's warm-up (its own card and count), never question 1's numbers */
  const warm = (PHASES[n - 1] as any).warm;
  const cur: any = warmup && warm ? { ...item, ...warm } : item;
  const fresh = () => ({ key: qk, bins: {}, sel: null, carry: null, ghost: null, active: null, trace: false, lit: false, fcard: "mile",
    copies: free ? 0 : k === "about" ? cur.count : 0, stamped: false, told: false, sent: null });
  const [S, setS] = useState<any>(fresh);
  /* a new question key starts a fresh board in this very render (never a passive effect, which paints the old board for a frame),
     and the stored state is replaced too, so an old board can never come back when the key returns */
  const s = S.key === qk ? S : fresh();
  if (S.key !== qk) setS(s);
  const sRef = useRef<any>(s);
  sRef.current = s;
  /* Reading the chart: until the card's bars are laid every hint rung is "tap the card", then the bars' own lines
     (the runtime reads item.miss and item.ladder when it shows a rung, so the live item carries the ones that fit the screen) */
  if (k === "compare" && item.missLaid) {
    if (!item.missTap) { item.missTap = item.miss; item.ladderOwn = item.ladder || null; }
    const laid = s.active === item.card || done;
    item.miss = laid ? item.missLaid : item.missTap;
    if (laid) { if (item.ladderOwn) item.ladder = item.ladderOwn; else delete item.ladder; }
    else item.ladder = [item.missTap, item.missTap];
  }
  const put = (p: any) => {
    if (qkRef.current !== qk) return;   /* a late callback of a question that is gone */
    const nx = { ...(sRef.current.key === qk ? sRef.current : fresh()), ...p, key: qk };
    sRef.current = nx; setS(nx);
  };
  /* an act on screen (PATTERNS §15): one at a time, react only when it resolves true */
  const playing = useRef(false);
  useEffect(() => { playing.current = false; }, [qk]);
  const viaAct = (o: any, ok: () => void, no?: () => void) => {
    if (playing.current) return;
    if (!api.act) { ok(); return; }
    playing.current = true;
    api.act(o).then((r: any) => { playing.current = false; if (r) ok(); else if (no) no(); });
  };
  const lastKey = useRef(0);
  const guard = () => { const t = Date.now(); if (t - lastKey.current < 400) return false; lastKey.current = t; return true; };
  const did = (name: string) => { if (demo) api.did(name); };

  /* ── phase 1: the sort ── */
  const sortCards: string[] = k === "sort" ? (warmup ? OU_ALL : item.cards) : [];
  /* during the guide steps the cards the finished steps placed are in their bins (a restart puts them back) */
  const demoBins: any = {};
  if (warmup && n === 1) ((PHASES[n - 1] as any).steps || []).slice(0, demo ? step || 0 : 0).forEach((st: any) => { const c = st.on.replace("card-", ""); demoBins[c] = OU_KIND[c]; });
  const bins: any = warmup ? demoBins : done && k === "sort" && !ouSortOk(item, ouEncode(s.bins)) ? ouDecode(item.answer) : s.bins;
  const P1 = (() => {
    const m = 20, gap = 14;
    const topW = Math.min(w, kx) - 2 * m;
    /* a few cards are drawn big (the last bench reads them); seven share the row */
    const cw = Math.max(150, Math.min(230, (topW - (Math.max(1, sortCards.length) - 1) * gap) / Math.max(1, sortCards.length))), ch = cw > 180 ? 96 : 80;
    const per = Math.max(1, Math.min(sortCards.length || 1, Math.floor((topW + gap) / (cw + gap))));
    const rows = Math.max(1, Math.ceil(sortCards.length / per));
    const slot: any = {};
    sortCards.forEach((id, i) => {
      const r = Math.floor(i / per), c = i % per;
      const inRow = r < rows - 1 ? per : sortCards.length - per * (rows - 1);
      const rw = inRow * cw + (inRow - 1) * gap;
      slot[id] = { x: m + (topW - rw) / 2 + c * (cw + gap), y: 8 + r * (ch + gap), w: cw, h: ch };
    });
    const by = 8 + rows * ch + (rows - 1) * gap + 36, bh = H - 8 - by, bg = 28;
    const bw = Math.min(420, (w - 2 * m - 2 * bg) / 3);
    const bx0 = (w - (3 * bw + 2 * bg)) / 2;
    const bin: any = {};
    OU_BINS.forEach((b, j) => { bin[b] = { x: bx0 + j * (bw + bg), y: by, w: bw, h: bh }; });
    const bcw = Math.min(cw, (bw - 36) / 2), bch = 72;
    return { cw, ch, slot, bin, bcw, bch };
  })();
  /* where each card sits in its bin (in the order of the question's cards), and the dashed copies after them */
  const binSpots = (b: string, list: string[]) => {
    const B = P1.bin[b];
    const rows = Math.max(1, Math.ceil(list.length / 2));
    const pitch = Math.min(P1.bch + 10, (B.h - 88) / rows);
    const o: any = {};
    list.forEach((id, j) => { o[id] = { x: B.x + 12 + (j % 2) * (P1.bcw + 12), y: B.y + 78 + Math.floor(j / 2) * pitch, w: P1.bcw, h: P1.bch }; });
    return o;
  };
  const ghostOf = (wv: any) => {
    /* the whole right sort of the question: every card the child has not put in its own bin, drawn dashed in that bin,
       and the bins of the cards that went wrong (in the picture or in the answer sent) lit amber */
    const sent = ouDecode(wv && wv.value);
    const mine = sRef.current.bins;
    const right = item.need ? item.need : item.some ? item.some : item.cards;
    const cards: any = {};
    right.forEach((c: string) => { if (mine[c] !== OU_KIND[c]) cards[c] = OU_KIND[c]; });
    const lit: any = {};
    item.cards.forEach((c: string) => { const b = mine[c] || sent[c]; if (b && b !== OU_KIND[c]) lit[OU_KIND[c]] = true; });
    Object.keys(cards).forEach((c) => { lit[cards[c]] = true; });
    return { cards, lit };
  };
  const spots: any = {};
  const ghostSpots: any = {};
  if (k === "sort") OU_BINS.forEach((b) => {
    const mine = sortCards.filter((c) => bins[c] === b);
    const gh = s.ghost ? Object.keys(s.ghost.cards).filter((c) => s.ghost.cards[c] === b) : [];
    const sp = binSpots(b, [...mine, ...gh.map((c) => "g:" + c)]);
    mine.forEach((c) => { spots[c] = sp[c]; });
    gh.forEach((c) => { ghostSpots[c] = sp["g:" + c]; });
  });
  const binAt = (p: any) => {
    if (!p || isNaN(p.x)) return null;
    for (const b of OU_BINS) { const B = P1.bin[b]; if (p.x >= B.x - 16 && p.x <= B.x + B.w + 16 && p.y >= B.y - 24 && p.y <= B.y + B.h + 16) return b; }
    return null;
  };
  const place = (id: string, b: any) => {
    const nb = { ...sRef.current.bins };
    if (b) nb[id] = b; else delete nb[id];
    const back = asking && sRef.current.told === "shown";
    put({ bins: nb, sel: null, ghost: null, carry: null, ...(back ? { told: false } : {}) });
    if (back) api.say(item.say);   /* the question comes back on the bubble at the child's next act */
    api.sfx.tick();
  };
  const cardBox = (id: string) => spots[id] || P1.slot[id];
  const carryTo = (id: string, b: string, then: () => void) => {
    const f = cardBox(id);
    if (!f) return;
    const list = sortCards.filter((c) => bins[c] === b && c !== id);
    const to = binSpots(b, [...list, id])[id];
    put({ carry: id, sel: null, ghost: null });
    viaAct({ tool: "hand", moves: "carry", from: { x: f.x + f.w / 2, y: f.y + f.h / 2 }, at: [{ x: to.x + to.w / 2, y: to.y + to.h / 2 }],
      hold: <g>{ouName(id, -P1.bcw / 2, -P1.bch / 2, P1.bcw, P1.bch, C, tx, {})}</g> },
    () => { if (demo) { put({ carry: null }); api.sfx.tick(); } else place(id, b); then(); },
    () => put({ carry: null }));
  };
  const drag = useDrag((id: any, p: any, moved: boolean) => {
    if (k !== "sort") return;
    if (demo) {
      const want = stepOn ? stepOn.replace("card-", "") : null;
      if (!moved || isNaN(p.x)) { if (id === want && !bins[id]) carryTo(id, OU_KIND[id], () => api.did("card-" + id)); else api.did("card-" + id); return; }
      const b = binAt(p);
      if (id === want && b === OU_KIND[id]) { api.sfx.tick(); api.did("card-" + id); }
      else api.did(id !== want ? "card-" + id : b ? "bin-" + b : "drop");
      return;
    }
    if (!asking) return;
    if (!moved || isNaN(p.x)) { put({ sel: sRef.current.sel === id ? null : id, ghost: null }); api.sfx.tick(); return; }
    place(id, binAt(p));
  });
  const onBin = (b: string) => {
    if (demo) { api.did("bin-" + b); return; }
    if (!asking || !sRef.current.sel) return;
    carryTo(sRef.current.sel, b, () => {});
  };
  useEffect(() => { if (k === "sort" && asking) api.answerReady(ouReady(item, s.bins)); }, [qk, stage, ouEncode(s.bins)]);
  /* the strongest hint rung shown on this question (the Hint key or a miss), latched from toolApi.getState().hint (PATTERNS §18),
     so an Enter on an unchanged wrong sort never re-shows a weaker one */
  const rungLatch = useRef<any>({ qk: "", k: -1 });
  useEffect(() => {
    if (k !== "sort" || !asking) return;
    const lad = item.ladder || (PHASES[n - 1] as any).ladder || [];
    const rungs = [item.miss, lad[0], lad[1]];
    const look = () => {
      try {
        const g = (window as any).toolApi && (window as any).toolApi.getState();
        if (!g || !g.hint || g.hintKind === "type") return;
        const i = rungs.findIndex((x: any) => x && (g.hint === x || g.hint === tx(x)));
        if (i < 0) return;
        if (rungLatch.current.qk !== qk) rungLatch.current = { qk, k: -1 };
        if (i > rungLatch.current.k) rungLatch.current.k = i;
      } catch (e) {}
    };
    look();
    const id = setInterval(look, 250);
    return () => clearInterval(id);
  }, [qk, stage]);

  /* ── phase 2 and free play: the chart's cards in two rows ── */
  /* laid out at the open-panel width in both states, so the chart never jumps when the keypad opens */
  const P2 = (() => {
    const WO = Math.min(BOARD_OPEN_W, kx), top = 0, gap = 10, ch = 100;
    const rowW = WO - 16;
    const w1 = (rowW - 3 * gap) / 4, w2 = Math.min(350, (rowW - 2 * gap) / 3);
    const pos: any = {};
    const r1 = 4 * w1 + 3 * gap, r2 = 3 * w2 + 2 * gap;
    OU_ROW1.forEach((id, i) => { pos[id] = { x: 8 + (rowW - r1) / 2 + i * (w1 + gap), y: top + 6, w: w1, h: ch }; });
    OU_ROW2.forEach((id, i) => { pos[id] = { x: 8 + (rowW - r2) / 2 + i * (w2 + gap), y: top + 6 + ch + 12, w: w2, h: ch }; });
    const lx = 20, lw = 200, bx = lx + lw + 16;
    return { pos, lx, lw, bx, maxL: Math.max(200, WO - 28 - bx), r1y: 256, r2y: 342, rh: 64 };
  })();
  const shown = done || s.trace ? item.card : s.active;
  const lens = (id: string) => {
    const r = OU_CHART[id].ratio;
    return r >= 1 ? { up: P2.maxL, low: P2.maxL / r } : { up: P2.maxL * r, low: P2.maxL };
  };
  const tapCard = (id: string) => {
    if (k !== "compare") return;
    if (demo && "card-" + id !== stepOn) { api.did("card-" + id); return; }
    if (!demo && !asking) return;
    if (playing.current) return;
    put({ active: id, trace: false });
    const L = lens(id), y = P2.r2y + P2.rh + 6;
    const ends = [L.up, L.low].sort((a, b) => a - b);
    viaAct({ tool: "ruler", moves: "slide", from: { x: P2.bx, y }, to: { x: P2.bx + ends[1], y }, at: ends.map((e) => ({ x: P2.bx + e, y })) },
      () => {
        api.sfx.settle(); did("card-" + id);
        /* the question comes back on the bubble once the card it asked for is laid */
        if (asking && id === item.card && sRef.current.told === "shown") { put({ lit: false, told: "back" }); api.say(item.say); }
      });
  };

  /* ── phases 3 and 4 and free play: the stack, the column and the About stamp ── */
  const sc = free ? OU_CHART[s.fcard] : (k === "stack" || k === "about") ? OU_CHART[cur.card] : null;
  const count = free ? MODEL.freeMax : cur.count || 0;
  const copiesNow = warmup && n === 3 ? Math.min(demo ? step || 0 : 0, count) : done ? count : s.copies;
  const stampedNow = warmup && n === 4 ? demo && (step || 0) >= 1 : done ? true : s.stamped;
  /* laid out at the open-panel width in both states (nothing jumps or slides when the keypad opens), and big: the card, the
     copies, the column at last-bench size; the one key stands right of the column at a fixed place */
  const P3 = (() => {
    const WO = BOARD_OPEN_W;
    const top = free ? 88 : 0;
    const card = free ? { x: 20, y: top + 4, w: 380, h: 100 } : { x: 20, y: 6, w: 400, h: 116 };
    const cu = free ? (WO - 40) / 4 : 300;
    const ry = free ? top + 120 : 142, rh = free ? 54 : 60, gy = ry + rh + 8, gh = 40;
    const fs = free ? 36 : 44, pitch = free ? 40 : 52;
    const colTop = free ? ry + rh + 20 : gy + gh + 20;
    const sign = 172, px = 198 + 2 * fs * 0.62 + fs * 0.21;
    const keyW = 240, keyH = 76, keyX = 610, keyY = H - keyH - 16;
    return { card, cu, ry, rh, gy, gh, fs, pitch, colTop, sign, px, keyW, keyH, keyX, keyY };
  })();
  const nAdd = sc ? (s.trace || done ? count : free ? copiesNow : Math.max(copiesNow, 0)) : 0;
  /* the rule sits clear of the last addend's descenders, the answer line under it */
  const lastBase = P3.colTop + P3.fs * 0.95 + (nAdd - 1) * P3.pitch;
  const ruleY = nAdd > 0 ? lastBase + P3.fs * 0.32 + 6 : P3.colTop + 6;
  const sumY = ruleY + P3.fs + 4;
  const aboutSpot = { x: 88, y: sumY - P3.fs * 0.35 };
  const stack = () => {
    if (!sc) return;
    if (!guard()) return;
    const c = demo ? copiesNow : sRef.current.copies;
    if (c >= count) { did("stack"); return; }
    const to = { x: 20 + c * P3.cu + P3.cu / 2, y: P3.ry + P3.rh / 2 };
    viaAct({ tool: "hand", moves: "carry", from: { x: P3.card.x + P3.card.w / 2, y: P3.card.y + P3.card.h / 2 }, at: [to],
      hold: <g>
        <rect x={-P3.cu / 2 + 2} y={-P3.rh / 2} width={P3.cu - 4} height={P3.rh} rx={10} fill={tint(OU_AMBER, 0.45)} />
        <Skin name="bar" x={-P3.cu / 2 + 2} y={-P3.rh / 2} w={P3.cu - 4} h={P3.rh} />
        <rect x={-P3.cu / 2 + 2} y={-P3.rh / 2} width={P3.cu - 4} height={P3.rh} rx={10} fill="none" stroke={shade(OU_AMBER, 0.25)} strokeWidth={3} />
      </g> },
    () => { if (!demo) put({ copies: c + 1, trace: false }); api.sfx.settle(); did("stack"); });
  };
  const stamp = () => {
    if (k !== "about") return;
    if (!guard()) return;
    if (stampedNow) { did("stamp"); return; }
    viaAct({ tool: "hand", moves: "carry", from: { x: P3.keyX + P3.keyW / 2, y: P3.keyY + P3.keyH / 2 }, at: [aboutSpot],
      hold: <g>{ouStampFace(C, tx, 0.7)}</g> },
    () => {
      const told = sRef.current.told === "shown";
      if (!demo) put({ stamped: true, lit: false, ...(told ? { told: "back" } : {}) });
      api.sfx.settle(); did("stamp");
      if (asking && told) api.say(item.say);   /* the question comes back on the bubble */
    });
  };
  /* the picture first: the Answer key blinks once the stack meets the given length (Stack) or the stamp is on (About) */
  const ready = asking && k === "about" ? s.stamped : asking && k === "compare" ? s.active === item.card : true;
  useEffect(() => { api.cardReady(ready); }, [qk, stage, ready]);
  /* a fresh answer typed after a miss clears the correction, so the child's digits show on the line */
  const typedSeen = useRef(typed);
  useEffect(() => { if (typed !== typedSeen.current) { typedSeen.current = typed; if (sRef.current.trace && (k === "stack" || k === "about")) put({ trace: false }); } }, [typed]);

  /* ── Enter, the agent and the dev driver ── */
  const act = (on: any) => {
    if (!on) return;
    if (on === "stack") stack();
    else if (on === "stamp") stamp();
    else if (on.indexOf("card-") === 0) {
      const id = on.slice(5);
      if (n === 1) { if (!bins[id]) carryTo(id, OU_KIND[id], () => api.did(on)); else api.did(on); }
      else tapCard(id);
    }
  };
  api.onEnter(demo && stepOn ? () => act(stepOn)
    /* a sort is sent only when it is ready (every card placed, or something in the asked bin): a partial sort costs no try */
    : asking && k === "sort" ? () => {
      const b = sRef.current.bins;
      if (ouReady(item, b)) {
        if (ouEncode(b) === sRef.current.sent) {
          /* the sort that just missed, unchanged: no new try, and its hint comes back (the runtime cleared it on the Enter) */
          const t = wrong && wrong.tries ? wrong.tries : 1, lad = item.ladder || (PHASES[n - 1] as any).ladder || [];
          const rungs = [item.miss, lad[0] || item.miss, lad[1] || lad[0] || item.miss];
          /* the strongest rung shown so far: the try count's, or a stronger one the Hint key already showed */
          const r = Math.max(Math.min(t, 3) - 1, rungLatch.current.qk === qk ? rungLatch.current.k : -1);
          api.say(rungs[Math.max(0, Math.min(2, r))]);
          return;
        }
        api.submit(ouEncode(b)); return;
      }
      /* a partial board on every Enter: its own line, and the question comes back at the next placement */
      put({ told: "shown" });
      if (index === 0) api.say("Put every card in a bin first.");
      else if (item.bin === "weight") api.say("Drop a card in the weight bin first.");
      else api.say("Drop a card in the capacity bin first.");
    }
    /* compare sizes before any number: no choice is taken until the question's card has laid its bars */
    : asking && k === "compare" ? (v: any) => {
      if (sRef.current.active !== item.card) {
        if (v && !sRef.current.told) { put({ lit: true, told: "shown" }); api.say("Tap the blinking card first."); } else if (v) put({ lit: true });
        api.sfx.tick(); return;
      }
      api.submit(v);
    }
    /* no answer is taken until the About stamp is on it: the stamp lights amber and waits */
    : asking && k === "about" ? (v: any) => {
      if (!sRef.current.stamped) {
        if (v && !sRef.current.told) { put({ lit: true, told: "shown" }); api.say("Stamp About on the answer first."); } else if (v) put({ lit: true });
        api.sfx.tick(); return;
      }
      api.submit(v);
    }
    : null);
  HOOK.set = asking && k === "sort" ? (v: any) => { put({ bins: ouDecode(v), sel: null, ghost: null }); api.answerReady(ouReady(item, ouDecode(v))); return true; } : null;
  HOOK.type = asking && (k === "stack" || k === "about") ? (v: any) => { api.setTyped(String(v ?? "")); return true; } : null;
  /* the agent's check(): it does the picture's act first (the card's bars, the stamp), then Enter answers */
  HOOK.check = asking && k === "about" ? () => { if (!sRef.current.stamped) put({ stamped: true, lit: false }); return undefined; }
    : asking && k === "compare" ? () => { if (sRef.current.active !== item.card) put({ active: item.card, lit: false }); return undefined; } : null;

  /* the traceback: the correction is drawn on its own layer from the question, never written into the child's pieces */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    if (k === "sort") put({ ghost: ghostOf(wrong), sel: null, sent: String(wrong.value ?? "") });
    else put({ trace: true, active: k === "compare" ? item.card : sRef.current.active });
    tl.run([[1400, () => {}]], () => api.lock(false));
  }, [wrong]);

  /* the win line (the last question's is the phase's closing line, the runtime's) */
  useEffect(() => {
    if (stage !== "win") return;
    if (n === 1 && index === 0) api.say("Yes, the mile and the inch measure length.");
    if (n === 1 && index === 1) api.say("Yes, that card is a unit of weight.");
    if (n === 2 && index === 0) api.say("Yes, a gallon holds more than a litre.");
    if (n === 2 && index === 1) api.say("Yes, an inch is longer than a centimetre.");
    if (n === 3 && index === 0) api.say("Yes, 3 feet are about 0.915 m.");
    if (n === 3 && index === 1) api.say("Yes, 2 inches are about 5.08 cm.");
    if (n === 4 && index === 0) api.say("Yes, the parcel is about 6.6 pounds, not exactly.");
    if (n === 4 && index === 1) api.say("Yes, about 11.37 L, because the chart is rounded.");
    /* the last question's line: the runtime shows the phase's closing line in its place */
    if (n === 1 && index === 2) api.say("Yes, the gallon measures capacity.");
    if (n === 2 && index === 2) api.say("Yes, a yard is shorter than a metre.");
    if (n === 3 && index === 2) api.say("Yes, 2 miles are about 3.22 km.");
    if (n === 4 && index === 2) api.say("Yes, about 56.7 g, and not exactly.");
  }, [stage, qk]);

  /* what the host and the agent read back (toolApi.getState): the child's own work, never the answer before it is given */
  api.share({ phase: n, bins: ouEncode(bins), card: free ? s.fcard : k === "compare" ? s.active : cur.card || null,
    copies: copiesNow, stamped: k === "about" ? stampedNow : false, complete: stage === "idle" });

  /* ── drawing ── */
  /* the one thing to touch blinks (a ring hugging it, kept inside the working area) */
  const inv = (x: number, y: number, bw: number, bh: number, m = 2) => <BlinkRing x={x} y={y} w={bw} h={bh} rx={16} C={C} sw={5} m={m} />;
  const label = (x: number, y: number, s0: string, fs: number, fill: string, anchor = "middle", weight = 700) =>
    <text x={x} y={y} textAnchor={anchor as any} fontSize={fs} fontWeight={weight} fill={fill}>{s0}</text>;

  const drawSort = () => {
    const dg = drag.drag && drag.drag.moved ? drag.drag : null;
    return (
      <g>
        {OU_BINS.map((b) => {
          const B = P1.bin[b], lit = !done && s.ghost && s.ghost.lit[b], win = done;
          const name = tx(b);
          return (
            <g key={"bin" + b}>
              <rect x={B.x} y={B.y} width={B.w} height={B.h} rx={22} fill={lit ? tint(OU_AMBER, 0.78) : win ? tint(OU_GREEN, 0.85) : tint(C.panel, 0.35)}
                stroke={lit ? shade(OU_AMBER, 0.15) : win ? shade(OU_GREEN, 0.2) : shade(C.rule, 0.25)} strokeWidth={lit || win ? 6 : 3} />
              {ouIcon(b, B.x + 16, B.y + 8, C)}
              {label(B.x + 92, B.y + 46, name, ouFit(name, B.w - 104, 38), C.ink, "start")}
            </g>
          );
        })}
        {sortCards.map((id) => !bins[id] || id === s.carry ? <rect key={"slot" + id} x={P1.slot[id].x} y={P1.slot[id].y} width={P1.cw} height={P1.ch} rx={14}
          fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" pointerEvents="none" /> : null)}
        {s.ghost && !done && <g pointerEvents="none">{Object.keys(ghostSpots).map((c) => { const g0 = ghostSpots[c]; return <g key={"gh" + c}>{ouName(c, g0.x, g0.y, g0.w, g0.h, C, tx, { ghost: true })}</g>; })}</g>}
        {sortCards.map((id) => {
          if (id === s.carry) return null;
          const live = dg && dg.payload === id;
          const bx = bins[id] ? spots[id] : P1.slot[id];
          const bw = live ? P1.cw : bx.w, bh = live ? P1.ch : bx.h;
          const x = live ? dg.x - bw / 2 : bx.x, y = live ? dg.y - bh / 2 : bx.y;
          const on = s.sel === id;
          return (
            <g key={"card" + id} {...control("card-" + id, tx(id) + " card")} {...drag.bind(id)} {...drag.keys(id)} style={{ cursor: "grab", touchAction: "none" } as any}>
              {(on || live) && <rect x={x - 6} y={y - 6} width={bw + 12} height={bh + 12} rx={18} fill="none" stroke={shade(OU_AMBER, 0.1)} strokeWidth={6} />}
              {ouName(id, x, y, bw, bh, C, tx, {})}
            </g>
          );
        })}
        {demo && stepOn && stepOn.indexOf("card-") === 0 && P1.slot[stepOn.slice(5)] && !bins[stepOn.slice(5)] && s.carry !== stepOn.slice(5) &&
          inv(P1.slot[stepOn.slice(5)].x, P1.slot[stepOn.slice(5)].y, P1.cw, P1.ch)}
        {/* each bin answers a tap (tap a card, then its bin) over its name band and over the room under its cards; after the cards
            in the DOM, so a keyboard reaches the cards first; never over a card (no two finger boxes overlap) */}
        {OU_BINS.map((b) => {
          const B = P1.bin[b], name = tx(b);
          const mine = sortCards.filter((c) => bins[c] === b).length + (s.ghost && !done ? Object.keys(s.ghost.cards).filter((c) => s.ghost.cards[c] === b).length : 0);
          const used = mine ? B.y + 78 + Math.ceil(mine / 2) * Math.min(P1.bch + 10, (B.h - 88) / Math.max(1, Math.ceil(mine / 2))) : B.y + 72;
          const lowH = B.y + B.h - used;
          return (
            <g key={"hit" + b}>
              <Hit id={"bin-" + b} x={B.x} y={B.y} w={B.w} h={72} onPress={() => onBin(b)} label={name + " bin"} />
              {lowH >= 72 && <Hit id={"bin-" + b + "-room"} x={B.x} y={used} w={B.w} h={lowH} onPress={() => onBin(b)} label={name + " bin"} />}
            </g>
          );
        })}
      </g>
    );
  };

  const drawChart = (pickable: boolean, mark: any) => (
    <g>
      {OU_ALL.map((id) => { const p = P2.pos[id]; return (
        <g key={"cc" + id}>
          {ouCard(id, p.x, p.y, p.w, p.h, C, tx, { now: mark === id })}
          {pickable && <Hit id={"card-" + id} x={p.x} y={p.y} w={p.w} h={p.h} onPress={() => (free ? (put({ fcard: id, copies: 0 }), api.sfx.tick()) : tapCard(id))} label={tx(OU_CHART[id].top) + " card"} />}
        </g>
      ); })}
    </g>
  );

  const drawCompare = () => {
    const id = shown;
    const L = id ? lens(id) : null;
    const longer = L ? (L.up >= L.low ? "up" : "low") : null;
    const glow = (done || s.trace) && L;
    const rail = (y: number, len: number, fill: string, edge: string, name: string, g: boolean, kp: string, ribbon = true) => (
      <g key={kp}>
        <rect x={P2.lx} y={y} width={P2.lw} height={P2.rh} rx={14} fill={tint(fill, 0.72)} stroke={edge} strokeWidth={3} />
        {label(P2.lx + P2.lw / 2, y + P2.rh / 2 + 11, name, ouFit(name, P2.lw - 20, 32), C.ink)}
        <rect x={P2.bx} y={y + 6} width={P2.maxL} height={P2.rh - 12} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 10" />
        {len > 0 && g && <rect x={P2.bx - 6} y={y} width={len + 12} height={P2.rh} rx={14} fill="none" stroke="#FFD54F" strokeWidth={10} pointerEvents="none" />}
        {len > 0 && <g>
          {/* a length of golden ribbon (the skin, plain bar under it as the fallback), the unit's colour as a tint over it */}
          <clipPath id={"ou-bar-" + kp}><rect x={P2.bx} y={y + 6} width={len} height={P2.rh - 12} rx={10} /></clipPath>
          <rect x={P2.bx} y={y + 6} width={len} height={P2.rh - 12} rx={10} fill={fill} />
          {ribbon && <Skin name="bar" x={P2.bx} y={y + 6} w={len} h={P2.rh - 12} clip={"url(#ou-bar-" + kp + ")"} />}
          <rect x={P2.bx} y={y + 6} width={len} height={P2.rh - 12} rx={10} fill={fill} fillOpacity={ribbon ? 0.45 : 0} stroke={edge} strokeWidth={3} />
        </g>}
      </g>
    );
    const askCard = asking && P2.pos[item.card] && s.active !== item.card ? P2.pos[item.card] : null;
    return (
      <g>
        {drawChart(true, id)}
        {/* the question's card blinks until it is tapped (compare sizes before any number) */}
        {askCard && s.lit && <rect x={askCard.x - 10} y={askCard.y - 10} width={askCard.w + 20} height={askCard.h + 20} rx={22} fill="none" stroke={OU_AMBER} strokeWidth={8} pointerEvents="none" />}
        {askCard && inv(askCard.x, askCard.y, askCard.w, askCard.h, 3)}
        {rail(P2.r1y, L ? L.up : 0, tint(OU_AMBER, 0.2), shade(OU_AMBER, 0.3), id ? tx(OU_CHART[id].up) : tx("this unit"), !!glow && longer === "up", "r1")}
        {/* the metric unit's bar stays plain violet (the Unit fact colour): a violet tint over the gold ribbon reads rose */}
        {rail(P2.r2y, L ? L.low : 0, OU_VIOLET, shade(OU_VIOLET, 0.35), id ? tx(OU_CHART[id].low) : tx("metric unit"), !!glow && longer === "low", "r2", false)}
        {glow && <g pointerEvents="none">{label(P2.bx, P2.r2y + P2.rh + 62, tx(item.result), 40, ouInk(OU_GREEN), "start")}</g>}
        {demo && stepOn && P2.pos[stepOn.slice(5)] && inv(P2.pos[stepOn.slice(5)].x, P2.pos[stepOn.slice(5)].y, P2.pos[stepOn.slice(5)].w, P2.pos[stepOn.slice(5)].h)}
      </g>
    );
  };

  const drawStack = () => {
    if (!sc) return null;
    const trace = s.trace && !done;
    const nCop = free ? copiesNow : count;
    const showSum = done || trace || (free && copiesNow > 0);
    const sumStr = free ? (Math.round(parseFloat(sc.num) * 1000 * copiesNow) / 1000).toFixed((sc.num.split(".")[1] || "").length) : item.answer;
    const typedOk = /^\d*\.?\d*$/.test(String(typed || "")) && String(typed || "") !== "";
    const winForm = done && typedOk && ouForms(item).includes(String(typed)) ? String(typed) : sumStr;
    const sumFill = showSum ? ouInk(OU_GREEN) : C.ink;
    const sumW = sumStr.length * P3.fs * 0.62 + 40;
    const unit = tx(sc.unit);
    const unitX = P3.px + P3.fs * 0.21 + 3 * P3.fs * 0.62 + 14;
    return (
      <g>
        {ouCard(free ? s.fcard : cur.card, P3.card.x, P3.card.y, P3.card.w, P3.card.h, C, tx, { now: true, big: !free })}
        {/* the copies laid end to end; in a correction the missing ones are outlined amber */}
        {Array.from({ length: Math.max(nCop, copiesNow) }, (_, i) => {
          const x = 20 + i * P3.cu, real = i < copiesNow;
          if (!real && !trace && !free) return <rect key={"cp" + i} x={x + 2} y={P3.ry} width={P3.cu - 4} height={P3.rh} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />;
          if (!real && free) return null;
          return (
            <g key={"cp" + i}>
              <rect x={x + 2} y={P3.ry} width={P3.cu - 4} height={P3.rh} rx={10} fill={real ? tint(OU_AMBER, 0.45) : "none"} stroke={shade(OU_AMBER, real ? 0.25 : 0.1)}
                strokeWidth={real ? 3 : 5} strokeDasharray={real ? undefined : "12 8"} />
              {real && <g>
                {/* each copy is a length of golden ribbon (the skin over the plain bar), amber as a light tint, its name on a paper chip */}
                <clipPath id={"ou-cp-" + i}><rect x={x + 2} y={P3.ry} width={P3.cu - 4} height={P3.rh} rx={10} /></clipPath>
                <Skin name="bar" x={x + 2} y={P3.ry} w={P3.cu - 4} h={P3.rh} clip={"url(#ou-cp-" + i + ")"} />
                <rect x={x + 2} y={P3.ry} width={P3.cu - 4} height={P3.rh} rx={10} fill={OU_AMBER} fillOpacity={0.22} stroke={shade(OU_AMBER, 0.25)} strokeWidth={3} />
                <rect x={x + P3.cu / 2 - (ouW(tx(sc.top)) * ouFit(tx(sc.top), P3.cu - 24, 32)) / 2 - 12} y={P3.ry + 8} rx={10}
                  width={ouW(tx(sc.top)) * ouFit(tx(sc.top), P3.cu - 24, 32) + 24} height={P3.rh - 16} fill="#FFFDF7" fillOpacity={0.88} />
              </g>}
              {label(x + P3.cu / 2, P3.ry + P3.rh / 2 + 11, tx(sc.top), ouFit(tx(sc.top), P3.cu - 24, 32), real ? C.ink : ouInk(OU_AMBER))}
            </g>
          );
        })}
        {!free && <g>
          <rect x={20} y={P3.gy} width={count * P3.cu} height={P3.gh} rx={10} fill={OU_BLUE} />
          {label(36, P3.gy + P3.gh / 2 + 10, tx("Given") + ": " + tx(cur.given), 28, "#FFFFFF", "start")}
        </g>}
        {/* the column: each copy's chart number, points in one line, then the line the answer goes on */}
        {Array.from({ length: nAdd }, (_, i) => {
          const y = P3.colTop + P3.fs * 0.95 + i * P3.pitch;
          const ghost = i >= copiesNow;
          const f = ghost ? ouInk(OU_AMBER) : ouInk(OU_VIOLET);
          return (
            <g key={"ad" + i}>
              {i === nAdd - 1 && nAdd > 1 && label(P3.sign, y, "+", P3.fs, C.ink)}
              {ouCells(sc.num, P3.px, y, P3.fs, f, "a" + i)}
              {label(unitX, y, unit, P3.fs, f, "start", 600)}
            </g>
          );
        })}
        {nAdd > 0 && <line x1={P3.sign - 24} y1={ruleY} x2={unitX + ouW(unit) * P3.fs + 8} y2={ruleY} stroke={C.ink} strokeWidth={3} />}
        <g pointerEvents="none">
          {showSum ? ouCells(done ? winForm : sumStr, P3.px, sumY, P3.fs, sumFill, "s")
            : asking && typedOk ? ouCells(String(typed), P3.px, sumY, P3.fs, C.ink, "t")
            : label(P3.px, sumY, "?", P3.fs, shade(OU_AMBER, 0.35))}
          {label(unitX, sumY, unit, P3.fs, sumFill, "start", 600)}
          {(k === "stack" || free) && label(aboutSpot.x, sumY, tx("about"), ouFit(tx("about"), 140, 34), C.ink, "middle", 600)}
          {/* the About stamp's mark on the answer line: a pill wide enough for the word in every language */}
          {k === "about" && !stampedNow && <rect x={aboutSpot.x - 78} y={aboutSpot.y - 30} width={156} height={60} rx={30} fill="none" stroke={s.lit ? shade(OU_AMBER, 0.1) : C.rule} strokeWidth={s.lit ? 5 : 3} strokeDasharray="8 7" />}
          {k === "about" && stampedNow && <g>
            <rect x={aboutSpot.x - 78} y={aboutSpot.y - 30} width={156} height={60} rx={30} fill={tint(OU_AMBER, 0.75)} stroke={C.ink} strokeWidth={4} />
            {label(aboutSpot.x, aboutSpot.y + 11, tx("about"), ouFit(tx("about"), 116, 32), C.ink)}
          </g>}
          {(done || trace) && sumW > 0 && <rect x={P3.px - 2 * P3.fs * 0.62 - 16} y={sumY - P3.fs - 2} width={unitX - (P3.px - 2 * P3.fs * 0.62 - 16) + ouW(unit) * P3.fs + 22} height={P3.fs + 16} rx={12}
            fill="none" stroke={OU_GREEN} strokeWidth={4} />}
        </g>
        {/* the one key at the bottom: Stack (adding) or the About stamp */}
        {(k === "stack" || free) && (() => {
          const off = free ? copiesNow >= count : demo ? copiesNow >= count : !asking || s.copies >= count;
          return (
            <g>
              <Key id="stack" label={tx("Stack")} x={P3.keyX} y={P3.keyY} w={P3.keyW} h={P3.keyH} C={C} tone="key" disabled={off} onClick={stack}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={off ? shade(C.dim, 0.4) : toneInk("key", C.ink)}>{tx("Stack")}</text>
              </Key>
              {((demo && stepOn === "stack") || (asking && s.copies < count && !s.trace)) && inv(P3.keyX, P3.keyY, P3.keyW, P3.keyH + EDGE, 4)}
            </g>
          );
        })()}
        {k === "about" && (() => {
          const off = !(demo || asking) || stampedNow;
          return (
            <g>
              {s.lit && !stampedNow && <rect x={P3.keyX - 14} y={P3.keyY - 12} width={P3.keyW + 28} height={P3.keyH + EDGE + 24} rx={28} fill={OU_AMBER} stroke={shade(OU_AMBER, 0.35)} strokeWidth={6} pointerEvents="none" />}
              <Key id="stamp" label={tx("About stamp")} x={P3.keyX} y={P3.keyY} w={P3.keyW} h={P3.keyH} C={C} tone="key" disabled={off} onClick={stamp}>
                <circle cx={-78} cy={0} r={22} fill="none" stroke={off ? shade(C.dim, 0.4) : toneInk("key", C.ink)} strokeWidth={4} />
                <text x={14} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={off ? shade(C.dim, 0.4) : toneInk("key", C.ink)}>{tx("About")}</text>
              </Key>
              {!stampedNow && (demo || asking) && inv(P3.keyX, P3.keyY, P3.keyW, P3.keyH + EDGE, 4)}
            </g>
          );
        })()}
      </g>
    );
  };

  /* free play: the chart's names in one row, the chosen card's stack and its sum */
  const drawFree = () => {
    const gap = 12, cw = Math.min(150, (Math.min(w, kx) - 40 - 6 * gap) / 7), ch = 72;
    const x0 = 20 + (Math.min(w, kx) - 40 - (7 * cw + 6 * gap)) / 2;
    return (
      <g>
        {OU_ALL.map((id, i) => { const x = x0 + i * (cw + gap); return (
          <g key={"fn" + id}>
            <rect x={x} y={6} width={cw} height={ch} rx={14} fill={s.fcard === id ? tint(OU_AMBER, 0.6) : tint(OU_VIOLET, 0.78)} stroke={s.fcard === id ? shade(OU_AMBER, 0.25) : shade(OU_VIOLET, 0.3)} strokeWidth={s.fcard === id ? 5 : 3} />
            {label(x + cw / 2, 6 + ch / 2 + 12, tx(id), ouFit(tx(id), cw - 16, 34), ouInk(OU_VIOLET))}
            <Hit id={"card-" + id} x={x} y={6} w={cw} h={ch} onPress={() => { put({ fcard: id, copies: 0 }); api.sfx.tick(); }} label={tx(id) + " card"} />
          </g>
        ); })}
        {drawStack()}
      </g>
    );
  };

  return (
    <g>
      {k === "sort" && drawSort()}
      {k === "compare" && drawCompare()}
      {(k === "stack" || k === "about") && drawStack()}
      {free && drawFree()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (r24: `it` is the question) */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item = it || last.it || {};
  const v = last.value;
  /* the bin's icon and the names the child put in it; the card and the word chosen; the given measure and "about" the sum.
     Every word through tx (summary-thumbs reads hi and gu for Latin letters) */
  /* the box is about 66 tall, so ONE line, sized by its own width in each language and centred so no matra touches the border */
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  const line = (x: number, s0: string, wd: number, fill: string, a = "middle") =>
    <text x={x} y={h / 2 + 10} textAnchor={a as any} fontSize={ouFit(s0, wd, 30)} fontWeight={700} fill={fill}>{s0}</text>;
  if (item.kind === "sort") {
    const b = ouDecode(v);
    const s0 = Object.keys(b).filter((c) => b[c] === item.bin).map((c) => tx(c)).join(", ");
    return (
      <g>
        {frame}
        {ouIcon(item.bin, 10, h / 2 - 24, C)}
        {line(84, s0, w - 96, ouInk(OU_VIOLET), "start")}
      </g>
    );
  }
  if (item.kind === "compare") {
    /* the two bars of the card, the longer glowing, and the word the child chose */
    const c = (item.choices || []).find((x: any) => x.id === String(v));
    const r = OU_CHART[item.card] ? OU_CHART[item.card].ratio : 1, L = 74;
    const up = r >= 1 ? L : L * r, low = r >= 1 ? L / r : L;
    const s0 = c ? tx(c.label) : "";
    return (
      <g>
        {frame}
        <rect x={12} y={h / 2 - 18} width={up} height={14} rx={5} fill={tint(OU_AMBER, 0.2)} stroke={up >= low ? "#C48E1F" : shade(OU_AMBER, 0.3)} strokeWidth={up >= low ? 3 : 2} />
        <rect x={12} y={h / 2 + 4} width={low} height={14} rx={5} fill={OU_VIOLET} stroke={low > up ? "#C48E1F" : shade(OU_VIOLET, 0.35)} strokeWidth={low > up ? 3 : 2} />
        {line(98 + (w - 106) / 2, s0, w - 110, ouInk(OU_GREEN))}
      </g>
    );
  }
  /* "about", the sum AND its unit, always (the chapter's lesson: a measure names its unit). At the 28 floor a line too wide for the
     box less 24 is squeezed to that width (textLength, at most about 15%), and past that it is set on two lines */
  const unitW = tx(OU_CHART[item.card] ? OU_CHART[item.card].unit : "");
  const full = tx("about") + " " + String(v) + " " + unitW;
  const need = ouW(full) * T.micro, room = w - 24;
  const txt = (y: number, s1: string, fs: number, squeeze: boolean) =>
    <text x={w / 2} y={y} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ouInk(OU_GREEN)}
      {...(squeeze ? { textLength: room, lengthAdjust: "spacingAndGlyphs" } : {})}>{s1}</text>;
  return (
    <g>
      {frame}
      {need <= room ? line(w / 2, full, room, ouInk(OU_GREEN))
        : need * 0.85 <= room ? txt(h / 2 + 10, full, T.micro, true)
        : <g>{txt(h / 2 - 6, tx("about"), T.micro, false)}{txt(h / 2 + 24, String(v) + " " + unitW, ouFit(String(v) + " " + unitW, room, T.micro), false)}</g>}
    </g>
  );
}

function OtherUnits(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16) */
      keyOnly: true,
      /* the standard keypad, not the wide one: the chart of seven cards (and the column under the stack) needs the 1086 width
         with the panel open (PATTERNS.md 9g, "a chart of seven columns") */
      bigPad: false,
      /* the pad's point key on every question: phases 3 and 4 type a decimal where placing the point IS the lesson (adding a chart
         number a few times; the owner's ch 9 rule, BUILD_CARD §7 2026-10-17) */
      pointKey: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d) */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default OtherUnits;
