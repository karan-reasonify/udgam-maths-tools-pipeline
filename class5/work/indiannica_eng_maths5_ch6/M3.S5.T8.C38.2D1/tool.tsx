/* ═══ M3.S5.T8.C38.2D1 · three_names · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build: the header, canvas, keypad, bubble, mascot,
   phase dots, toolApi, sounds, scoring and events already exist. The lesson is silent and action-driven (r30, r34);
   the new look (keyOnly, navDots), the Next key and answering on the card (cardAnswer) are on.
   A shape (a circle, a bar or a square grid) at the left and three name cards at the right: Fraction, Decimal and
   Per cent. Each question asks for ONE name, typed on its own card (a per cent in the keypad's one box, the % printed);
   the win fills the other two cards and all three turn green together. Phase 4 matches the chapter's words (the choice
   keys are the word cards) and ends on the child's own can-do cards, ungraded. NO imports; only the five host hooks. */

const TOOL_ID = "three_names";
const MEDIA_ID = "M3.S5.T8.C38.2D1";
const TOOL_NAME = "Three Names";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* the plan's opening line (not shown: phase 1 opens on its guide step) */
const OPENING = ["A shape, cut into equal parts, waiting to be named."];
const FINISH_LINE = "Every shaded part had three names, and all three agreed.";
/* printed when the child opens Free play: Shape, Parts, + and − are its four keys */
const FREE_LINE = "Free play: pick a shape and its parts, shade some, and read the three names.";

const START_HOOK = "Can one shaded part have three different names?";

/* ── Three Names: shapes, numbers and colours (tn* names never clash with the runtime's) ── */
const TN_BLUE = "#0072B2", TN_WARM = "#FFF8EC", TN_LINE = "#2B2B2B", TN_GREY0 = "#767676";
/* the wash over a chocolate cell: cream at TN_WASHED (uncounted), deep blue at TN_COUNTED (counted) */
const TN_WASHED = 0.82, TN_COUNTED = 0.94;
/* the deep blue over the light skins (cake, ribbon): 0.9 keeps counted against uncounted at 3:1 or more, rim included */
const TN_TINT = 0.9;
/* over the light skins (the cake with its darker crust, the ribbon darkening downward) the counted parts take the same blue
   30 % deeper, so counted against uncounted is 3:1 or more out to the edge */
const TN_CAKE_BLUE = "#00507D";
/* a skin stretched over a grid of more than 40 cells is drawn this much oversize under the clip, so its rounded corners
   and bevel band fall outside the grid */
const TN_OVER = 0.035;
const TN_CUTS = [2, 4, 5, 10, 20, 25, 50];
/* what each word means, written under its picture in a correction (at most 4 words) */
const TN_MEAN: any = { A: "out of 100", B: "amount written with %", C: "the same amount" };
const TN_GRID: any = { 2: [1, 2], 4: [2, 2], 5: [1, 5], 10: [2, 5], 20: [4, 5], 25: [5, 5], 50: [5, 10], 100: [10, 10] };
const TN_SHAPES = ["circle", "bar", "grid"];
const TN_WORDS: any = { percent: "Per cent", percentage: "Percentage", equivalent: "Equivalent" };
const TN_CARD_WORD: any = { percent: "Per cent", percentage: "Percentage", equivalent: "Equivalent fractions" };
const TN_CANDO = ["Fraction from shading", "Decimal from shading", "Per cent from shading", "Lowest terms with HCF", "Per cent and percentage"];
const TN_TICKS = ["Yes", "Almost", "Not sure"];
/* each phase's warm-up for its guide step: none of its results (25/100, 2/5, 30/100) is an answer of that phase */
const TN_WARMUP: any = {
  1: { kind: "warm", shape: "circle", cut: 4, shaded: 1, given: [1, 4] },
  2: { kind: "warm", shape: "bar", cut: 20, shaded: 8, given: [8, 20] },
  3: { kind: "warm", shape: "grid", cut: 100, pct: 30, given: [30, 100] },
};
const W4 = [{ id: "percent", label: "Per cent" }, { id: "percentage", label: "Percentage" }, { id: "equivalent", label: "Equivalent" }];
const tnGcd = (a: number, b: number): number => (b ? tnGcd(b, a % b) : a);
const tnLow = (a: number, b: number) => { const g = tnGcd(a, b) || 1; return [a / g, b / g]; };
/* the amount in hundredths: a per cent, or the shaded parts grown to 100 */
const tnHund = (it: any) => (it.pct !== undefined ? it.pct : Math.round((it.shaded * 100) / it.cut));
/* the decimal of a number of hundredths, as the book writes it (50 -> "0.5", 8 -> "0.08", 36 -> "0.36") */
const tnDec = (h: number) => (h >= 100 ? String(h / 100) : h === 0 ? "0" : "0." + String(h).padStart(2, "0").replace(/0$/, ""));
const tnPol = (cx: number, cy: number, r: number, deg: number) => { const t = (deg * Math.PI) / 180; return [cx + r * Math.sin(t), cy - r * Math.cos(t)]; };
const tnWedge = (cx: number, cy: number, r: number, a: number, w: number) => {
  const [x1, y1] = tnPol(cx, cy, r, a), [x2, y2] = tnPol(cx, cy, r, a + w);
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${w > 180 ? 1 : 0} 1 ${x2} ${y2} Z`;
};
const tnInk = (c: string) => shade(c, 0.3);
/* the edge washes (IMAGES §7): the cake's dark crust ring and the ribbon's darker lower half get a cream wash over the
   UNCOUNTED part only, so counted against uncounted stays 3:1 or more out to the edge; plain shapes, drawn with or without
   the skin. tnCrust washes the uncounted wedges from angle `from` round to 360, fading in from 0.8 r to the rim. */
const tnCrust = (id: string, cx: number, cy: number, r: number, from: number) => (
  <g>
    <defs>
      <radialGradient id={id} cx={cx} cy={cy} r={r} gradientUnits="userSpaceOnUse">
        <stop offset="0.8" stopColor={TN_WARM} stopOpacity={0} />
        <stop offset="0.9" stopColor={TN_WARM} stopOpacity={0.45} />
        <stop offset="1" stopColor={TN_WARM} stopOpacity={0.7} />
      </radialGradient>
    </defs>
    {from <= 0 ? <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
      : from < 360 ? <path d={tnWedge(cx, cy, r, from, 360 - from)} fill={`url(#${id})`} /> : null}
  </g>
);
const tnRibbonWash = (id: string, x: number, y: number, w: number, h: number) => (w <= 0 ? null : (
  <g>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.45" stopColor={TN_WARM} stopOpacity={0} />
        <stop offset="1" stopColor={TN_WARM} stopOpacity={0.6} />
      </linearGradient>
    </defs>
    <rect x={x} y={y} width={w} height={h} fill={`url(#${id})`} />
  </g>
));

/* THE START PAGE: the chapter's cake cut in four with one part shaded, and its three names */
function StartArt({ box, C, tx = (v: any) => v }: any) {
  const cx = 230, cy = 170, r = 150;
  const cards = [{ t: "Fraction", x: 450 }, { t: "Decimal", x: 700 }, { t: "Per cent", x: 950 }];
  return (
    <g>
      <defs><clipPath id="tn-start"><circle cx={cx} cy={cy} r={r} /></clipPath></defs>
      {[0, 1, 2, 3].map((k) => <path key={k} d={tnWedge(cx, cy, r, k * 90, 90)} fill={k === 0 ? TN_BLUE : TN_WARM} />)}
      <Skin name="cake" x={cx - r} y={cy - r} w={2 * r} h={2 * r} clip="url(#tn-start)" />
      {tnCrust("tn-crust-s", cx, cy, r, 90)}
      <path d={tnWedge(cx, cy, r, 0, 90)} fill={TN_CAKE_BLUE} fillOpacity={TN_TINT} />
      {[0, 1, 2, 3].map((k) => { const [px, py] = tnPol(cx, cy, r, k * 90); return <line key={"l" + k} x1={cx} y1={cy} x2={px} y2={py} stroke={TN_LINE} strokeWidth={3} />; })}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={TN_LINE} strokeWidth={5} />
      {cards.map((c, k) => (
        <g key={k}>
          <rect x={c.x} y={40} width={220} height={260} rx={RAD.card} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} filter="url(#fShadowSoft)" />
          <text x={c.x + 110} y={92} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(c.t)}</text>
          {k === 0 ? (
            <g>
              <text x={c.x + 110} y={172} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={tnInk(TN_BLUE)}>1</text>
              <line x1={c.x + 80} y1={186} x2={c.x + 140} y2={186} stroke={tnInk(TN_BLUE)} strokeWidth={4} strokeLinecap="round" />
              <text x={c.x + 110} y={246} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={tnInk(TN_BLUE)}>4</text>
            </g>
          ) : <text x={c.x + 110} y={210} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={tnInk(TN_BLUE)}>{k === 1 ? "0.25" : "25%"}</text>}
        </g>
      ))}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11), keyed by the English byte for byte. Terms, one per idea (NCERT Class 5):
   भिन्न / અપૂર્ણાંક · दशमलव / દશાંશ · प्रतिशत / ટકા · प्रतिशतता / ટકાવારી · तुल्य भिन्न / સમ અપૂર્ણાંક · अंश / અંશ · हर / છેદ ·
   सरलतम रूप / અતિસંક્ષિપ્ત રૂપ · HCF = महत्तम समापवर्तक / ગુરુત્તમ સાધારણ અવયવ (म.स. / ગુ.સા.અ. only on labels: a dotted
   abbreviation splits a bubble line into pages) · सौवाँ भाग / સોમો ભાગ · दसवाँ / દસમો · रंगा / રંગેલું · पद / પદ · मात्रा / જથ્થો */
const TR: any = {
  hi: {
    "Three Names": "तीन नाम",
    "Free play: pick a shape and its parts, shade some, and read the three names.": "खुला खेल: आकृति और भाग चुनो, कुछ भाग रंगो और तीनों नाम पढ़ो।",
    "Can one shaded part have three different names?": "क्या एक रंगे भाग के तीन अलग नाम हो सकते हैं?",
    "A shape, cut into equal parts, waiting to be named.": "बराबर भागों में कटी एक आकृति, अपने नाम की राह देख रही है।",
    "Three names for one part": "एक भाग के तीन नाम",
    "Lowest terms or not": "सरलतम रूप या नहीं",
    "Starting from a per cent": "प्रतिशत से शुरू",
    "Words to know": "जानने योग्य शब्द",
    "Count the shaded parts and all the parts. Then find the hundredths.": "रंगे भाग और सारे भाग गिनो। फिर सौवें भाग निकालो।",
    "Tap Hundredths to grow 1/4 into hundredths.": "1/4 को सौवें भागों में बदलने के लिए सौवें भाग दबाओ।",
    "The Hundredths key is under the three cards.": "सौवें भाग वाला बटन तीनों कार्डों के नीचे है।",
    "One shaded part has three names, and all three name one amount.": "एक रंगे भाग के तीन नाम हैं, और तीनों एक ही मात्रा बताते हैं।",
    "You learned: a fraction, a decimal and a per cent can name one amount": "तुमने सीखा: भिन्न, दशमलव और प्रतिशत एक ही मात्रा बता सकते हैं",
    "What fraction of this circle is shaded?": "इस गोले का कितना भिन्न भाग रंगा है?",
    "Shaded part as a fraction?": "रंगा भाग, भिन्न में?",
    "The bottom number counts every part of the circle, shaded or not.": "हर में गोले के सारे भाग गिने जाते हैं, रंगे हों या नहीं।",
    "Count the shaded parts for the top number.": "अंश के लिए रंगे भाग गिनो।",
    "Write the shaded count over the count of all the parts.": "रंगे भागों की गिनती को सारे भागों की गिनती के ऊपर लिखो।",
    "Name the shaded part of this square as a decimal.": "इस वर्ग का रंगा भाग दशमलव में बताओ।",
    "Shaded part as a decimal?": "रंगा भाग, दशमलव में?",
    "Look at the bottom number on the Fraction card.": "भिन्न कार्ड पर हर को देखो।",
    "Multiply the top and the bottom by the number that makes the bottom 100.": "अंश और हर को उस संख्या से गुणा करो जिससे हर 100 बने।",
    "The top number over 100 gives the two digits after the point.": "100 के ऊपर का अंश दशमलव बिंदु के बाद के दो अंक देता है।",
    "What per cent of this bar is shaded?": "इस पट्टी का कितना प्रतिशत रंगा है?",
    "Shaded part as a per cent?": "रंगा भाग, प्रतिशत में?",
    "Per cent counts out of 100, so look at the bottom number of 1/2.": "प्रतिशत 100 में से गिनता है, इसलिए 1/2 का हर देखो।",
    "Find what to multiply 2 by to make 100, then multiply the top by it too.": "2 को किससे गुणा करें कि 100 बने, फिर अंश को भी उसी से गुणा करो।",
    "When the bottom is 100, the top number is the per cent.": "जब हर 100 हो, तब अंश ही प्रतिशत है।",
    "per cent": "प्रतिशत",
    "%": "%",
    "Two fractions can name the same shading, and only one of them is in lowest terms.": "दो भिन्न एक ही रंगा भाग बता सकती हैं, और उनमें से एक ही सरलतम रूप में है।",
    "Tap Simplify to divide the top and the bottom of 8/20 by their HCF.": "8/20 के अंश और हर को उनके महत्तम समापवर्तक से भाग देने के लिए सरल करो दबाओ।",
    "The Simplify key is under the three cards.": "सरल करो बटन तीनों कार्डों के नीचे है।",
    "Any equivalent fraction is right, unless the question asks for lowest terms.": "कोई भी तुल्य भिन्न सही है, जब तक प्रश्न सरलतम रूप न माँगे।",
    "You learned: lowest terms only when asked, and the HCF gives them": "तुमने सीखा: सरलतम रूप तभी जब माँगा जाए, और म.स. उसे देता है",
    "22/50 simplifies to 11/25: which of them names the shaded part of the bar?": "22/50 सरल होकर 11/25 बनता है: इनमें से कौन पट्टी का रंगा भाग बताता है?",
    "Which names it?": "कौन सा नाम सही?",
    "Look at the shaded cells of the bar, then read each fraction against them.": "पट्टी के रंगे खाने देखो, फिर प्रत्येक भिन्न को उनसे मिलाकर पढ़ो।",
    "Does dividing the top and the bottom by 2 change which cells are shaded?": "क्या अंश और हर को 2 से भाग देने पर रंगे खाने बदलते हैं?",
    "Check whether this question asked for lowest terms at all.": "देखो, क्या इस प्रश्न ने सरलतम रूप माँगा भी है।",
    "22/50": "22/50",
    "11/25": "11/25",
    "Both": "दोनों",
    "Write the shaded part of this bar as a fraction in lowest terms.": "इस पट्टी का रंगा भाग सरलतम रूप वाली भिन्न में लिखो।",
    "Lowest terms?": "सरलतम रूप?",
    "Lowest terms means no number above 1 divides both terms.": "सरलतम रूप में 1 से बड़ी कोई संख्या दोनों पदों को नहीं बाँटती।",
    "Find the HCF of the shaded parts and all the parts.": "रंगे भागों और सारे भागों का महत्तम समापवर्तक निकालो।",
    "Divide the top and the bottom by that HCF.": "अंश और हर को उस महत्तम समापवर्तक से भाग दो।",
    "Name the shaded part of this circle as a fraction, in any terms you like.": "इस गोले का रंगा भाग किसी भी रूप की भिन्न में बताओ।",
    "Any fraction that fits?": "कोई भी सही भिन्न?",
    "Count the shaded parts and every part of the circle.": "रंगे भाग और गोले के सभी भाग गिनो।",
    "The bottom number is every part, shaded or not.": "हर में सभी भाग आते हैं, रंगे हों या नहीं।",
    "If you divide, divide the top and the bottom by one and the same number.": "भाग दो तो अंश और हर को एक ही संख्या से भाग दो।",
    "Out of a hundred first. Then make the fraction as simple as it goes.": "पहले 100 में से। फिर भिन्न को जितना हो सके सरल करो।",
    "Tap Hundredths to shade 30 hundredths of the square.": "वर्ग के 30 सौवें भाग रंगने के लिए सौवें भाग दबाओ।",
    "A per cent over 100 gives the fraction, and its hundredths give the decimal.": "प्रतिशत को 100 के ऊपर लिखो तो भिन्न मिलती है, और सौवें भागों से दशमलव।",
    "You learned: a per cent over 100 gives the fraction and the decimal": "तुमने सीखा: 100 के ऊपर लिखा प्रतिशत भिन्न और दशमलव देता है",
    "A field is 45% sown: write the sown part as a fraction in lowest terms.": "एक खेत 45% बोया गया है: बोया भाग सरलतम रूप वाली भिन्न में लिखो।",
    "Sown part, lowest terms?": "बोया भाग, सरलतम रूप?",
    "Write 45 over 100, then divide both numbers as far as they go.": "45 को 100 के ऊपर लिखो, फिर दोनों संख्याओं को जितना हो सके भाग दो।",
    "Find the HCF of 45 and 100.": "45 और 100 का महत्तम समापवर्तक निकालो।",
    "Divide both 45 and 100 by their HCF.": "45 और 100 दोनों को उनके महत्तम समापवर्तक से भाग दो।",
    "Write 8% as a decimal.": "8% को दशमलव में लिखो।",
    "8% as a decimal?": "8% दशमलव में?",
    "Per cent counts hundredths, not tenths.": "प्रतिशत सौवें भाग गिनता है, दसवें नहीं।",
    "Hundredths take two places after the point.": "सौवें भाग दशमलव बिंदु के बाद दो स्थान लेते हैं।",
    "Fill the places after the point in order: tenths first, then hundredths.": "बिंदु के बाद के स्थान क्रम से भरो: पहले दसवाँ, फिर सौवाँ।",
    "A garden is 64% planted: what fraction in lowest terms is planted?": "एक बगीचे का 64% भाग लगाया गया है: सरलतम रूप में यह कौन सी भिन्न है?",
    "Planted part, lowest terms?": "लगाया भाग, सरलतम रूप?",
    "Start from 64 over 100, then keep going to lowest terms.": "100 के ऊपर 64 से शुरू करो, फिर सरलतम रूप तक चलते रहो।",
    "Find a number that divides both 64 and 100 exactly.": "ऐसी संख्या खोजो जो 64 और 100 दोनों को पूरा भाग दे।",
    "Keep dividing both terms until no number above 1 divides both.": "दोनों पदों को तब तक भाग दो जब तक 1 से बड़ी कोई संख्या दोनों को न बाँटे।",
    "Each word card fits one picture best.": "प्रत्येक शब्द कार्ड एक चित्र पर सबसे ठीक बैठता है।",
    "Per cent means out of 100, and equivalent fractions name one amount.": "प्रतिशत का अर्थ है 100 में से, और तुल्य भिन्न एक ही मात्रा बताती हैं।",
    "You learned: per cent, percentage and equivalent fractions": "तुमने सीखा: प्रतिशत, प्रतिशतता और तुल्य भिन्न",
    "Which word card tells what the % sign in 37% means?": "कौन सा शब्द कार्ड बताता है कि 37% में % चिह्न का क्या अर्थ है?",
    "Word for the % sign?": "% चिह्न का शब्द?",
    "Count how many of the 100 squares are shaded.": "गिनो कि 100 खानों में से कितने रंगे हैं।",
    "Think of what the % sign tells you about the 100 squares.": "सोचो कि % चिह्न 100 खानों के बारे में क्या बताता है।",
    "Pick the word that means out of a hundred, not the word for an amount.": "वह शब्द चुनो जिसका अर्थ 100 में से है, मात्रा वाला शब्द नहीं।",
    "Which word card names an amount written as a per cent, like 90%?": "कौन सा शब्द कार्ड 90% जैसी, प्रतिशत में लिखी मात्रा का नाम है?",
    "Word for an amount like 90%?": "90% जैसी मात्रा का शब्द?",
    "Look at the three amounts: only one is written with a % sign.": "तीनों मात्राएँ देखो: केवल एक % चिह्न के साथ लिखी है।",
    "One word names the % sign, and another names an amount written with it.": "एक शब्द % चिह्न का नाम है, और दूसरा उसके साथ लिखी मात्रा का।",
    "Say 90% out loud as an amount, then find the word that names such an amount.": "90% को मात्रा की तरह बोलकर पढ़ो, फिर ऐसी मात्रा का शब्द खोजो।",
    "Which word card names two fractions like 3/10 and 6/20?": "कौन सा शब्द कार्ड 3/10 और 6/20 जैसी दो भिन्नों का नाम है?",
    "Word for the two bars?": "दोनों पट्टियों का शब्द?",
    "Look at where the shading ends on each bar.": "देखो कि प्रत्येक पट्टी पर रंग कहाँ खत्म होता है।",
    "Compare the two shaded lengths, then think what that says about the fractions.": "दोनों रंगी लंबाइयाँ मिलाओ, फिर सोचो कि भिन्नों के बारे में यह क्या कहती हैं।",
    "Fractions that name the same amount have a word of their own.": "एक ही मात्रा बताने वाली भिन्नों का अपना एक नाम है।",
    "Yes, and that is 55/100, 0.55 and 55%.": "हाँ, और यही 55/100, 0.55 और 55% है।",
    "Yes, 36/100 is also 0.36 and 36%.": "हाँ, 36/100 ही 0.36 और 36% भी है।",
    "Yes, both name 44 hundredths of the bar.": "हाँ, दोनों पट्टी के 44 सौवें भाग बताती हैं।",
    "Yes, 9/10 is also 0.9 and 90%.": "हाँ, 9/10 ही 0.9 और 90% भी है।",
    "Yes, and as a decimal it is 0.45.": "हाँ, और दशमलव में यह 0.45 है।",
    "Yes, the zero holds the tenths place.": "हाँ, शून्य दसवें स्थान को भरता है।",
    "Yes, 37% means 37 of the 100 squares.": "हाँ, 37% का अर्थ है 100 खानों में से 37।",
    "Yes, 90% is a percentage, and so is 37%.": "हाँ, 90% एक प्रतिशतता है, और 37% भी।",
    "Fraction": "भिन्न",
    "Decimal": "दशमलव",
    "Per cent": "प्रतिशत",
    "Percentage": "प्रतिशतता",
    "Equivalent": "तुल्य भिन्न",
    "Equivalent fractions": "तुल्य भिन्न",
    "Whole": "पूर्ण",
    "Shaded": "रंगे",
    "Parts": "भाग",
    "Both are right": "दोनों सही हैं",
    "hundredths": "सौवें भाग",
    "Both terms": "दोनों पद",
    "Hundredths": "सौवें भाग",
    "Simplify": "सरल करो",
    "Over 100": "हर 100",
    "Shape": "आकृति",
    "out of 100": "100 में से",
    "amount written with %": "% के साथ लिखी मात्रा",
    "the same amount": "एक ही मात्रा",
    "Fraction from shading": "रंगे भाग से भिन्न",
    "Decimal from shading": "रंगे भाग से दशमलव",
    "Per cent from shading": "रंगे भाग से प्रतिशत",
    "Lowest terms with HCF": "म.स. से सरलतम रूप",
    "Per cent and percentage": "प्रतिशत और प्रतिशतता",
    "Yes": "हाँ",
    "Almost": "लगभग",
    "Not sure": "पक्का नहीं",
    "Place holder": "स्थानधारक",
    "Shade one more": "एक भाग और रंगो",
    "Shade one less": "एक भाग कम रंगो",
    "Fraction card": "भिन्न कार्ड",
    "Decimal card": "दशमलव कार्ड",
    "Per cent card": "प्रतिशत कार्ड",
    "whole part": "पूर्ण भाग",
    "decimal part": "दशमलव भाग",
    "numerator": "अंश",
    "denominator": "हर",
  },
  gu: {
    "Three Names": "ત્રણ નામ",
    "Free play: pick a shape and its parts, shade some, and read the three names.": "મુક્ત રમત: આકાર અને ભાગ પસંદ કરો, થોડા ભાગ રંગો અને ત્રણેય નામ વાંચો.",
    "Can one shaded part have three different names?": "શું એક રંગેલા ભાગનાં ત્રણ જુદાં નામ હોઈ શકે?",
    "A shape, cut into equal parts, waiting to be named.": "સરખા ભાગમાં કાપેલો એક આકાર, પોતાના નામની રાહ જુએ છે.",
    "Three names for one part": "એક ભાગનાં ત્રણ નામ",
    "Lowest terms or not": "અતિસંક્ષિપ્ત રૂપ કે નહીં",
    "Starting from a per cent": "ટકાથી શરૂઆત",
    "Words to know": "જાણવા જેવા શબ્દો",
    "Count the shaded parts and all the parts. Then find the hundredths.": "રંગેલા ભાગ અને બધા ભાગ ગણો. પછી સોમા ભાગ શોધો.",
    "Tap Hundredths to grow 1/4 into hundredths.": "1/4ને સોમા ભાગમાં ફેરવવા સોમા ભાગ દબાવો.",
    "The Hundredths key is under the three cards.": "સોમા ભાગ વાળું બટન ત્રણેય કાર્ડની નીચે છે.",
    "One shaded part has three names, and all three name one amount.": "એક રંગેલા ભાગનાં ત્રણ નામ છે, અને ત્રણેય એક જ જથ્થો બતાવે છે.",
    "You learned: a fraction, a decimal and a per cent can name one amount": "તમે શીખ્યા: અપૂર્ણાંક, દશાંશ અને ટકા એક જ જથ્થો બતાવી શકે",
    "What fraction of this circle is shaded?": "આ વર્તુળનો કેટલો અપૂર્ણાંક ભાગ રંગેલો છે?",
    "Shaded part as a fraction?": "રંગેલો ભાગ, અપૂર્ણાંકમાં?",
    "The bottom number counts every part of the circle, shaded or not.": "છેદમાં વર્તુળના બધા ભાગ ગણાય, રંગેલા હોય કે નહીં.",
    "Count the shaded parts for the top number.": "અંશ માટે રંગેલા ભાગ ગણો.",
    "Write the shaded count over the count of all the parts.": "રંગેલા ભાગની ગણતરી બધા ભાગની ગણતરીની ઉપર લખો.",
    "Name the shaded part of this square as a decimal.": "આ ચોરસનો રંગેલો ભાગ દશાંશમાં કહો.",
    "Shaded part as a decimal?": "રંગેલો ભાગ, દશાંશમાં?",
    "Look at the bottom number on the Fraction card.": "અપૂર્ણાંક કાર્ડ પરનો છેદ જુઓ.",
    "Multiply the top and the bottom by the number that makes the bottom 100.": "અંશ અને છેદને એવી સંખ્યાથી ગુણો કે છેદ 100 થાય.",
    "The top number over 100 gives the two digits after the point.": "100 ઉપરનો અંશ દશાંશ ચિહ્ન પછીના બે અંક આપે છે.",
    "What per cent of this bar is shaded?": "આ પટ્ટીના કેટલા ટકા રંગેલા છે?",
    "Shaded part as a per cent?": "રંગેલો ભાગ, ટકામાં?",
    "Per cent counts out of 100, so look at the bottom number of 1/2.": "ટકા 100માંથી ગણાય છે, તેથી 1/2નો છેદ જુઓ.",
    "Find what to multiply 2 by to make 100, then multiply the top by it too.": "2ને શાનાથી ગુણીએ તો 100 થાય તે શોધો, પછી અંશને પણ તેનાથી ગુણો.",
    "When the bottom is 100, the top number is the per cent.": "છેદ 100 હોય ત્યારે અંશ જ ટકા છે.",
    "per cent": "ટકા",
    "%": "%",
    "Two fractions can name the same shading, and only one of them is in lowest terms.": "બે અપૂર્ણાંક એક જ રંગેલો ભાગ બતાવી શકે, અને એક જ અતિસંક્ષિપ્ત રૂપમાં છે.",
    "Tap Simplify to divide the top and the bottom of 8/20 by their HCF.": "8/20ના અંશ અને છેદને તેમના ગુરુત્તમ સાધારણ અવયવથી ભાગવા સરળ કરો દબાવો.",
    "The Simplify key is under the three cards.": "સરળ કરો બટન ત્રણેય કાર્ડની નીચે છે.",
    "Any equivalent fraction is right, unless the question asks for lowest terms.": "કોઈ પણ સમ અપૂર્ણાંક સાચો છે, સિવાય કે પ્રશ્ન અતિસંક્ષિપ્ત રૂપ માગે.",
    "You learned: lowest terms only when asked, and the HCF gives them": "તમે શીખ્યા: અતિસંક્ષિપ્ત રૂપ માગે ત્યારે જ, અને ગુ.સા.અ. તે આપે",
    "22/50 simplifies to 11/25: which of them names the shaded part of the bar?": "22/50 સરળ થઈને 11/25 બને છે: તેમાંથી કયો પટ્ટીનો રંગેલો ભાગ બતાવે છે?",
    "Which names it?": "કયું નામ સાચું?",
    "Look at the shaded cells of the bar, then read each fraction against them.": "પટ્ટીનાં રંગેલાં ખાનાં જુઓ, પછી દરેક અપૂર્ણાંક તેની સાથે મેળવીને વાંચો.",
    "Does dividing the top and the bottom by 2 change which cells are shaded?": "શું અંશ અને છેદને 2થી ભાગવાથી રંગેલાં ખાનાં બદલાય છે?",
    "Check whether this question asked for lowest terms at all.": "જુઓ, આ પ્રશ્નમાં અતિસંક્ષિપ્ત રૂપ માગ્યું પણ છે કે નહીં.",
    "22/50": "22/50",
    "11/25": "11/25",
    "Both": "બંને",
    "Write the shaded part of this bar as a fraction in lowest terms.": "આ પટ્ટીનો રંગેલો ભાગ અતિસંક્ષિપ્ત રૂપના અપૂર્ણાંકમાં લખો.",
    "Lowest terms?": "અતિસંક્ષિપ્ત રૂપ?",
    "Lowest terms means no number above 1 divides both terms.": "અતિસંક્ષિપ્ત રૂપમાં 1થી મોટી કોઈ સંખ્યા બંને પદને ભાગતી નથી.",
    "Find the HCF of the shaded parts and all the parts.": "રંગેલા ભાગ અને બધા ભાગનો ગુરુત્તમ સાધારણ અવયવ શોધો.",
    "Divide the top and the bottom by that HCF.": "અંશ અને છેદને તે ગુરુત્તમ સાધારણ અવયવથી ભાગો.",
    "Name the shaded part of this circle as a fraction, in any terms you like.": "આ વર્તુળનો રંગેલો ભાગ કોઈ પણ રૂપના અપૂર્ણાંકમાં કહો.",
    "Any fraction that fits?": "કોઈ પણ સાચો અપૂર્ણાંક?",
    "Count the shaded parts and every part of the circle.": "રંગેલા ભાગ અને વર્તુળના દરેક ભાગ ગણો.",
    "The bottom number is every part, shaded or not.": "છેદમાં બધા ભાગ આવે, રંગેલા હોય કે નહીં.",
    "If you divide, divide the top and the bottom by one and the same number.": "ભાગો તો અંશ અને છેદને એક જ સંખ્યાથી ભાગો.",
    "Out of a hundred first. Then make the fraction as simple as it goes.": "પહેલાં 100માંથી. પછી અપૂર્ણાંકને બને તેટલો સરળ કરો.",
    "Tap Hundredths to shade 30 hundredths of the square.": "ચોરસના 30 સોમા ભાગ રંગવા સોમા ભાગ દબાવો.",
    "A per cent over 100 gives the fraction, and its hundredths give the decimal.": "ટકાને 100 ઉપર લખવાથી અપૂર્ણાંક મળે, અને સોમા ભાગથી દશાંશ.",
    "You learned: a per cent over 100 gives the fraction and the decimal": "તમે શીખ્યા: 100 ઉપર લખેલા ટકા અપૂર્ણાંક અને દશાંશ આપે",
    "A field is 45% sown: write the sown part as a fraction in lowest terms.": "એક ખેતર 45% વાવેલું છે: વાવેલો ભાગ અતિસંક્ષિપ્ત રૂપના અપૂર્ણાંકમાં લખો.",
    "Sown part, lowest terms?": "વાવેલો ભાગ, અતિસંક્ષિપ્ત રૂપ?",
    "Write 45 over 100, then divide both numbers as far as they go.": "45ને 100 ઉપર લખો, પછી બંને સંખ્યાને બને તેટલી ભાગો.",
    "Find the HCF of 45 and 100.": "45 અને 100નો ગુરુત્તમ સાધારણ અવયવ શોધો.",
    "Divide both 45 and 100 by their HCF.": "45 અને 100 બંનેને તેમના ગુરુત્તમ સાધારણ અવયવથી ભાગો.",
    "Write 8% as a decimal.": "8%ને દશાંશમાં લખો.",
    "8% as a decimal?": "8% દશાંશમાં?",
    "Per cent counts hundredths, not tenths.": "ટકા સોમા ભાગ ગણે છે, દસમા નહીં.",
    "Hundredths take two places after the point.": "સોમા ભાગ દશાંશ ચિહ્ન પછી બે સ્થાન લે છે.",
    "Fill the places after the point in order: tenths first, then hundredths.": "ચિહ્ન પછીનાં સ્થાન ક્રમમાં ભરો: પહેલાં દસમો, પછી સોમો.",
    "A garden is 64% planted: what fraction in lowest terms is planted?": "એક બગીચાનો 64% ભાગ રોપેલો છે: અતિસંક્ષિપ્ત રૂપમાં એ કયો અપૂર્ણાંક છે?",
    "Planted part, lowest terms?": "રોપેલો ભાગ, અતિસંક્ષિપ્ત રૂપ?",
    "Start from 64 over 100, then keep going to lowest terms.": "100 ઉપર 64થી શરૂ કરો, પછી અતિસંક્ષિપ્ત રૂપ સુધી આગળ વધો.",
    "Find a number that divides both 64 and 100 exactly.": "એવી સંખ્યા શોધો જે 64 અને 100 બંનેને પૂરેપૂરી ભાગે.",
    "Keep dividing both terms until no number above 1 divides both.": "બંને પદને ભાગતા રહો, જ્યાં સુધી 1થી મોટી કોઈ સંખ્યા બંનેને ન ભાગે.",
    "Each word card fits one picture best.": "દરેક શબ્દ કાર્ડ એક ચિત્ર સાથે સૌથી સારું બેસે છે.",
    "Per cent means out of 100, and equivalent fractions name one amount.": "ટકા એટલે 100માંથી, અને સમ અપૂર્ણાંક એક જ જથ્થો બતાવે છે.",
    "You learned: per cent, percentage and equivalent fractions": "તમે શીખ્યા: ટકા, ટકાવારી અને સમ અપૂર્ણાંક",
    "Which word card tells what the % sign in 37% means?": "કયું શબ્દ કાર્ડ કહે છે કે 37%માં % ચિહ્નનો અર્થ શું છે?",
    "Word for the % sign?": "% ચિહ્નનો શબ્દ?",
    "Count how many of the 100 squares are shaded.": "ગણો કે 100 ખાનામાંથી કેટલાં રંગેલાં છે.",
    "Think of what the % sign tells you about the 100 squares.": "વિચારો કે % ચિહ્ન 100 ખાના વિશે શું કહે છે.",
    "Pick the word that means out of a hundred, not the word for an amount.": "જેનો અર્થ 100માંથી થાય તે શબ્દ પસંદ કરો, જથ્થાનો શબ્દ નહીં.",
    "Which word card names an amount written as a per cent, like 90%?": "કયું શબ્દ કાર્ડ 90% જેવા, ટકામાં લખેલા જથ્થાનું નામ છે?",
    "Word for an amount like 90%?": "90% જેવા જથ્થાનો શબ્દ?",
    "Look at the three amounts: only one is written with a % sign.": "ત્રણેય જથ્થા જુઓ: ફક્ત એક જ % ચિહ્ન સાથે લખેલો છે.",
    "One word names the % sign, and another names an amount written with it.": "એક શબ્દ % ચિહ્નનું નામ છે, અને બીજો તેની સાથે લખેલા જથ્થાનું.",
    "Say 90% out loud as an amount, then find the word that names such an amount.": "90%ને જથ્થા તરીકે મોટેથી બોલો, પછી એવા જથ્થાનો શબ્દ શોધો.",
    "Which word card names two fractions like 3/10 and 6/20?": "કયું શબ્દ કાર્ડ 3/10 અને 6/20 જેવા બે અપૂર્ણાંકનું નામ છે?",
    "Word for the two bars?": "બંને પટ્ટીનો શબ્દ?",
    "Look at where the shading ends on each bar.": "જુઓ કે દરેક પટ્ટી પર રંગ ક્યાં પૂરો થાય છે.",
    "Compare the two shaded lengths, then think what that says about the fractions.": "બંને રંગેલી લંબાઈ સરખાવો, પછી વિચારો કે એ અપૂર્ણાંક વિશે શું કહે છે.",
    "Fractions that name the same amount have a word of their own.": "એક જ જથ્થો બતાવતા અપૂર્ણાંકનું પોતાનું એક નામ છે.",
    "Yes, and that is 55/100, 0.55 and 55%.": "હા, અને એ જ 55/100, 0.55 અને 55% છે.",
    "Yes, 36/100 is also 0.36 and 36%.": "હા, 36/100 એ જ 0.36 અને 36% પણ છે.",
    "Yes, both name 44 hundredths of the bar.": "હા, બંને પટ્ટીના 44 સોમા ભાગ બતાવે છે.",
    "Yes, 9/10 is also 0.9 and 90%.": "હા, 9/10 એ જ 0.9 અને 90% પણ છે.",
    "Yes, and as a decimal it is 0.45.": "હા, અને દશાંશમાં એ 0.45 છે.",
    "Yes, the zero holds the tenths place.": "હા, શૂન્ય દસમા સ્થાનને ભરે છે.",
    "Yes, 37% means 37 of the 100 squares.": "હા, 37% એટલે 100 ખાનામાંથી 37.",
    "Yes, 90% is a percentage, and so is 37%.": "હા, 90% એક ટકાવારી છે, અને 37% પણ.",
    "Fraction": "અપૂર્ણાંક",
    "Decimal": "દશાંશ",
    "Per cent": "ટકા",
    "Percentage": "ટકાવારી",
    "Equivalent": "સમ અપૂર્ણાંક",
    "Equivalent fractions": "સમ અપૂર્ણાંક",
    "Whole": "પૂર્ણ",
    "Shaded": "રંગેલા",
    "Parts": "ભાગ",
    "Both are right": "બંને સાચા છે",
    "hundredths": "સોમા ભાગ",
    "Both terms": "બંને પદ",
    "Hundredths": "સોમા ભાગ",
    "Simplify": "સરળ કરો",
    "Over 100": "છેદ 100",
    "Shape": "આકાર",
    "out of 100": "100માંથી",
    "amount written with %": "% સાથે લખેલો જથ્થો",
    "the same amount": "એક જ જથ્થો",
    "Fraction from shading": "રંગેલા ભાગથી અપૂર્ણાંક",
    "Decimal from shading": "રંગેલા ભાગથી દશાંશ",
    "Per cent from shading": "રંગેલા ભાગથી ટકા",
    "Lowest terms with HCF": "ગુ.સા.અ.થી અતિસંક્ષિપ્ત રૂપ",
    "Per cent and percentage": "ટકા અને ટકાવારી",
    "Yes": "હા",
    "Almost": "લગભગ",
    "Not sure": "ખાતરી નથી",
    "Place holder": "સ્થાનધારક",
    "Shade one more": "એક ભાગ વધુ રંગો",
    "Shade one less": "એક ભાગ ઓછો રંગો",
    "Fraction card": "અપૂર્ણાંક કાર્ડ",
    "Decimal card": "દશાંશ કાર્ડ",
    "Per cent card": "ટકા કાર્ડ",
    "whole part": "પૂર્ણ ભાગ",
    "decimal part": "દશાંશ ભાગ",
    "numerator": "અંશ",
    "denominator": "છેદ",
  },
};

/* item fields: kind (frac: any equivalent fraction · low: lowest terms only · dec: a decimal · pct: a per cent ·
   pick: three choice keys · word), shape and cut (the parts) and shaded, or pct (phase 3: a 10 x 10 grid shaded to the per cent),
   given (the fraction already on the Fraction card), card (the asked card: fm = the Fraction card's first place,
   fr = its second place, dec, pct), near (the misconception, as typed) */
const PHASES = [
  {
    n: 1,
    concept: "Three names for one part",
    conceptId: "M3.S5.T8.C35", objectiveIds: ["O13"],
    says: ["Count the shaded parts and all the parts. Then find the hundredths."],
    steps: [{ say: "Tap Hundredths to grow 1/4 into hundredths.", on: "hundredths", hint: "The Hundredths key is under the three cards." }],
    ladder: [],
    closing: "One shaded part has three names, and all three name one amount.",
    learned: "You learned: a fraction, a decimal and a per cent can name one amount",
    traceback: "counts the shaded parts and all the parts, grows the fraction to hundredths, then writes the decimal or the per cent",
    items: [
      /* learn TN1: answer in the plan = 11/20, 0.55 and 55% (here the fraction; the win fills 0.55 and 55%) */
      { qid: "M3.S5.T8.C35:TN1", kind: "frac", shape: "circle", cut: 20, shaded: 11, card: "fm", parts: SLOT_FRACTION, answer: [11, 20], near: "11|9",
        say: "What fraction of this circle is shaded?", ask: "Shaded part as a fraction?",
        miss: "The bottom number counts every part of the circle, shaded or not.",
        ladder: ["Count the shaded parts for the top number.", "Write the shaded count over the count of all the parts."] },
      /* practice 5: answer in the plan = 9/25, 0.36 and 36%, because 9/25 = 36/100 (here the decimal) */
      { qid: "M3.S5.T8.C35:5", kind: "dec", shape: "grid", cut: 25, shaded: 9, given: [9, 25], card: "dec", parts: SLOT_DECIMAL, answer: ["0", "36"], near: "0|9",
        say: "Name the shaded part of this square as a decimal.", ask: "Shaded part as a decimal?",
        miss: "Look at the bottom number on the Fraction card.",
        ladder: ["Multiply the top and the bottom by the number that makes the bottom 100.", "The top number over 100 gives the two digits after the point."] },
      /* practice 1: answer in the plan = 1/2, 0.5 and 50%. 1/2 = 50/100 (here the per cent) */
      { qid: "M3.S5.T8.C35:1", kind: "pct", shape: "bar", cut: 2, shaded: 1, given: [1, 2], card: "pct", parts: [{ label: "per cent", unit: "%" }], answer: [50], near: "1",
        say: "What per cent of this bar is shaded?", ask: "Shaded part as a per cent?",
        miss: "Per cent counts out of 100, so look at the bottom number of 1/2.",
        ladder: ["Find what to multiply 2 by to make 100, then multiply the top by it too.", "When the bottom is 100, the top number is the per cent."] },
    ],
  },
  {
    n: 2,
    concept: "Lowest terms or not",
    conceptId: "M3.S5.T8.C36", objectiveIds: ["O13"],
    says: ["Two fractions can name the same shading, and only one of them is in lowest terms."],
    steps: [{ say: "Tap Simplify to divide the top and the bottom of 8/20 by their HCF.", on: "simplify", hint: "The Simplify key is under the three cards." }],
    ladder: [],
    closing: "Any equivalent fraction is right, unless the question asks for lowest terms.",
    learned: "You learned: lowest terms only when asked, and the HCF gives them",
    traceback: "lays both fractions over the same shading and grows them to the same hundredths, or divides both terms by the HCF",
    items: [
      /* learn TN2: answer in the plan = Both. 22/50 = 11/25, so each is right unless lowest terms are asked */
      { qid: "M3.S5.T8.C36:TN2", kind: "pick", shape: "bar", cut: 50, shaded: 22, given: [22, 50],
        choices: [{ id: "a", label: "22/50" }, { id: "b", label: "11/25" }, { id: "both", label: "Both" }], answer: "both", near: "b",
        say: "22/50 simplifies to 11/25: which of them names the shaded part of the bar?", ask: "Which names it?",
        miss: "Look at the shaded cells of the bar, then read each fraction against them.",
        ladder: ["Does dividing the top and the bottom by 2 change which cells are shaded?", "Check whether this question asked for lowest terms at all."] },
      /* practice 2: answer in the plan = 9/10. The HCF of 18 and 20 is 2, and 18/20 = 9/10 */
      { qid: "M3.S5.T8.C36:2", kind: "low", shape: "bar", cut: 20, shaded: 18, card: "fm", parts: SLOT_FRACTION, answer: [9, 10], near: "18|20",
        say: "Write the shaded part of this bar as a fraction in lowest terms.", ask: "Lowest terms?",
        miss: "Lowest terms means no number above 1 divides both terms.",
        ladder: ["Find the HCF of the shaded parts and all the parts.", "Divide the top and the bottom by that HCF."] },
      /* practice 6: answer in the plan = Such as 15/50 and 3/10, since 15/50 = 3/10. Either is right */
      { qid: "M3.S5.T8.C36:6", kind: "frac", shape: "circle", cut: 50, shaded: 15, card: "fm", parts: SLOT_FRACTION, answer: [15, 50], near: "3|5",
        say: "Name the shaded part of this circle as a fraction, in any terms you like.", ask: "Any fraction that fits?",
        miss: "Count the shaded parts and every part of the circle.",
        ladder: ["The bottom number is every part, shaded or not.", "If you divide, divide the top and the bottom by one and the same number."] },
    ],
  },
  {
    n: 3,
    concept: "Starting from a per cent",
    conceptId: "M3.S5.T8.C37", objectiveIds: ["O13"],
    says: ["Out of a hundred first. Then make the fraction as simple as it goes."],
    steps: [{ say: "Tap Hundredths to shade 30 hundredths of the square.", on: "hundredths", hint: "The Hundredths key is under the three cards." }],
    ladder: [],
    closing: "A per cent over 100 gives the fraction, and its hundredths give the decimal.",
    learned: "You learned: a per cent over 100 gives the fraction and the decimal",
    traceback: "writes the per cent over 100 and divides both terms by their HCF, or reads the hundredths as a decimal",
    items: [
      /* learn TN3: answer in the plan = 9/20 and 0.45 (here the fraction; the win fills 0.45) */
      { qid: "M3.S5.T8.C37:TN3", kind: "low", shape: "grid", cut: 100, pct: 45, card: "fr", parts: SLOT_FRACTION, answer: [9, 20], near: "45|10",
        say: "A field is 45% sown: write the sown part as a fraction in lowest terms.", ask: "Sown part, lowest terms?",
        miss: "Write 45 over 100, then divide both numbers as far as they go.",
        ladder: ["Find the HCF of 45 and 100.", "Divide both 45 and 100 by their HCF."] },
      /* practice 3: answer in the plan = 2/25 and 0.08 (here the decimal; the win fills 2/25) */
      { qid: "M3.S5.T8.C37:3", kind: "dec", shape: "grid", cut: 100, pct: 8, card: "dec", parts: SLOT_DECIMAL, answer: ["0", "08"], near: "0|8",
        say: "Write 8% as a decimal.", ask: "8% as a decimal?",
        miss: "Per cent counts hundredths, not tenths.",
        ladder: ["Hundredths take two places after the point.", "Fill the places after the point in order: tenths first, then hundredths."] },
      /* practice 7: answer in the plan = 16/25 and 0.64 (here the fraction; the win fills 0.64) */
      { qid: "M3.S5.T8.C37:7", kind: "low", shape: "grid", cut: 100, pct: 64, card: "fr", parts: SLOT_FRACTION, answer: [16, 25], near: "64|100",
        say: "A garden is 64% planted: what fraction in lowest terms is planted?", ask: "Planted part, lowest terms?",
        miss: "Start from 64 over 100, then keep going to lowest terms.",
        ladder: ["Find a number that divides both 64 and 100 exactly.", "Keep dividing both terms until no number above 1 divides both."] },
    ],
  },
  {
    n: 4,
    concept: "Words to know",
    conceptId: "M3.S5.T8.C38", objectiveIds: ["O14"],
    says: ["Each word card fits one picture best."],
    ladder: [],
    closing: "Per cent means out of 100, and equivalent fractions name one amount.",
    learned: "You learned: per cent, percentage and equivalent fractions",
    traceback: "rings the picture and puts the right word card under it, the child's choice untouched",
    items: [
      /* learn TN4: answer in the plan = 37 out of every hundred, which is 37/100. Yes, it is a percentage */
      { qid: "M3.S5.T8.C38:TN4", kind: "word", pic: "A", choices: W4, answer: "percent", near: "percentage",
        say: "Which word card tells what the % sign in 37% means?", ask: "Word for the % sign?",
        miss: "Count how many of the 100 squares are shaded.",
        ladder: ["Think of what the % sign tells you about the 100 squares.", "Pick the word that means out of a hundred, not the word for an amount."] },
      /* practice 4: answer in the plan = 90%, the amount written as a per cent. All three name one amount
         plan question: "Which of these is a percentage: 0.9, 9/10 or 90%?" Asked here as the word for such an amount, since the
         choice keys are the word cards ("which card names 90%" could fairly be answered Per cent, as 90% is read ninety per cent) */
      { qid: "M3.S5.T8.C38:4", kind: "word", pic: "B", choices: W4, answer: "percentage", near: "percent",
        say: "Which word card names an amount written as a per cent, like 90%?", ask: "Word for an amount like 90%?",
        miss: "Look at the three amounts: only one is written with a % sign.",
        ladder: ["One word names the % sign, and another names an amount written with it.", "Say 90% out loud as an amount, then find the word that names such an amount."] },
      /* practice 8: answer in the plan = Such as 6/20 and 30/100. Equivalent fractions name the same amount */
      { qid: "M3.S5.T8.C38:8", kind: "word", pic: "C", choices: W4, answer: "equivalent", near: "percentage",
        say: "Which word card names two fractions like 3/10 and 6/20?", ask: "Word for the two bars?",
        miss: "Look at where the shading ends on each bar.",
        ladder: ["Compare the two shaded lengths, then think what that says about the fractions.", "Fractions that name the same amount have a word of their own."] },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL = { shapes: TN_SHAPES, cuts: TN_CUTS, words: TN_CARD_WORD, canDo: TN_CANDO };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: frac takes any equivalent fraction (cross products), low only the fraction in lowest terms, dec any written
   form of the same value with the whole part typed (0.3 = 0.30), pct and the choices exactly */
const judge = (item: any, v: any) => {
  if (item.kind === "frac" || item.kind === "low") {
    const [a, b] = slotPartsOf(v, 2);
    if (a === "" || b === "" || Number(b) === 0) return false;
    const A = Number(a), B = Number(b), top = item.pct !== undefined ? item.pct : item.shaded, bot = item.pct !== undefined ? 100 : item.cut;
    if (A * bot !== B * top) return false;
    if (item.kind === "frac") return true;
    for (let k = 2; k <= Math.min(A, B); k++) if (A % k === 0 && B % k === 0) return false;
    return true;
  }
  if (item.kind === "dec") {
    const [w, d] = decimalPartsOf(v);
    if (w === "" || d === "") return false;
    return Number(d) * 100 === (tnHund(item) - Number(w) * 100) * Math.pow(10, d.length);
  }
  if (item.parts) return judgeSlotParts(item, v);
  return String(v).trim().toLowerCase() === String(item.answer).toLowerCase();
};
/* oracle: every answer re-derived from the item's own picture (the shading, the parts or the per cent), by gcd and
   by place value, sharing no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const g = (a: number, b: number): number => { while (b) { const t = b; b = a % b; a = t; } return a; };
  const top = it.pct !== undefined ? it.pct : it.shaded, bot = it.pct !== undefined ? 100 : it.cut;
  const pc = (top * 100) / bot;
  if (it.kind === "frac") return it.answer[0] * g(top, bot) === top * g(it.answer[0], it.answer[1]) && it.answer[1] * g(top, bot) === bot * g(it.answer[0], it.answer[1]);
  if (it.kind === "low") return g(it.answer[0], it.answer[1]) === 1 && it.answer[0] === top / g(top, bot) && it.answer[1] === bot / g(top, bot);
  if (it.kind === "dec") return Math.round(parseFloat(it.answer[0] + "." + it.answer[1]) * 100) === pc && it.answer[1].length === 2;
  if (it.kind === "pct") return it.answer[0] === pc;
  if (it.kind === "pick") { const s = it.given.map((x: number) => x / g(it.given[0], it.given[1])), b = it.choices[1].label.split("/").map(Number);
    return it.answer === (s[0] === b[0] && s[1] === b[1] ? "both" : "a"); }
  if (it.kind === "word") return it.answer === ({ A: "percent", B: "percentage", C: "equivalent" } as any)[it.pic];
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the written forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.kind === "frac" || item.kind === "low" ? [item.answer.join("/"), tnLow(item.answer[0], item.answer[1]).join("/")]
  : item.kind === "dec" ? [item.answer.join(".")] : item.kind === "pct" ? [String(item.answer[0])]
  : item.choices ? [item.choices.find((c: any) => c.id === item.answer).label] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => undefined;
const check = () => undefined;

/* ── the working area: x 0 to 900 whether the keypad is open or shut (the grids keep one size and place) ──
   the shape in a 440 square at the left, the three name cards in a column at the right, one act key under them */
const TN_S = { x: 20, y: 64, s: 440 };
const TN_X = 488, TN_CW = 392;
/* the Fraction card keeps a title band on top: a Hindi or Gujarati title rises 1.09 em over its baseline */
const TN_F = { y: 0, h: 212, by: 132 }, TN_D = { y: 220, h: 104 }, TN_P = { y: 332, h: 104 }, TN_KEY = { y: 440, h: 72 };
const TN_MAIN = TN_X + 100, TN_RES = TN_X + 300, TN_MID = TN_X + 200;
/* phase 4: three pictures in a row, a slot under each for its word card */
const TN_PIC: any = {
  A: { ring: [26, 100, 328, 324], slot: [40, 432, 300, 80] },
  B: { ring: [392, 136, 498, 152], slot: [404, 432, 474, 80] },
  C: { ring: [920, 120, 424, 212], slot: [934, 432, 350, 80] },
};

function Work({ n, item, index, stage, wrong, typed, part, api, stepOn, box, answerOn, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  /* the guide step works a WARM-UP of its own (never question 1's item), so question 1 opens as questions 2 and 3 do */
  const warmOn = !free && !!TN_WARMUP[n] && (stage === "demo" || stage === "teach");
  const qk = n + ":" + index + (warmOn ? ":w" : "");
  const FRESH = { k: qk, hund: false, simp: false, over: false, marks: 0, prog: -1 };
  const [A, setA] = useState<any>(FRESH);
  const a = A.k === qk ? A : FRESH;
  const put = (o: any) => setA((p: any) => ({ ...(p.k === qk ? p : FRESH), ...o, k: qk }));
  const [TB, setTB] = useState<any>({ w: null, v: 0 });
  const tb = wrong && TB.w === wrong ? TB.v : 0;
  const [RV, setRV] = useState<any>({ k: "", v: 0 });
  const won = !free && (stage === "win" || stage === "idle");
  const rev = won ? (RV.k === qk ? RV.v : 0) : 0;
  const [F, setF] = useState<any>({ shape: "circle", ci: 4, sh: 7 });
  const [can, setCan] = useState<any>([null, null, null, null, null]);
  const playing = useRef(false);
  const live = useRef(stage);
  live.current = stage;

  const it: any = free ? { kind: "free", shape: F.shape, cut: TN_CUTS[F.ci], shaded: Math.min(F.sh, TN_CUTS[F.ci]) } : warmOn ? TN_WARMUP[n] : item;
  const words = !free && n === 4;
  const H = words ? 0 : tnHund(it);
  const low = tnLow(H, 100);
  const kind = it.kind;
  const fresh = !wrong || String(typed) !== String(wrong.value);
  const asking = stage === "ask" && !free;

  /* ── the acts: Simplify (phase 2's step), Hundredths (phase 1's and 3's steps, phase 1's second question) and
     Over 100 (phase 3's questions: the pencil writes the per cent over 100, working only) ── */
  const markAt = [{ x: TN_MID, y: TN_F.by - 30 }, { x: TN_MID, y: TN_F.by + 44 }];
  const doAct = (on: any) => {
    const demo = live.current === "demo";
    if (playing.current) return;
    if (on === "over") {
      if (a.over) return;
      playing.current = true;
      api.act({ tool: "pencil", moves: "draw", at: [{ x: TN_MAIN, y: TN_F.by - 30 }, { x: TN_MAIN, y: TN_F.by + 44 }] }).then((ok: boolean) => {
        playing.current = false;
        if (ok) { put({ over: true }); api.sfx.settle(); }
      });
      return;
    }
    if (on === "simplify") {
      if (a.simp) { if (demo) api.did("simplify"); return; }
      playing.current = true;
      api.act({ tool: "pencil", moves: "draw", at: markAt, onPoint: (i: number) => put({ marks: i + 1 }) }).then((ok: boolean) => {
        playing.current = false;
        if (!ok) return;
        put({ simp: true, marks: 2 }); api.sfx.settle();
        if (live.current === "demo") api.did("simplify");
      });
      return;
    }
    if (on === "hundredths") {
      if (a.hund) { if (demo) api.did("hundredths"); return; }
      playing.current = true;
      let o: any;
      if (n === 3) {
        const cell = TN_S.s / 10, rows = Math.ceil(H / 10);
        o = { tool: "pencil", moves: "draw", from: { x: TN_S.x + 10, y: TN_S.y + cell / 2 },
          at: Array.from({ length: rows }, (_, r) => ({ x: TN_S.x + cell * (r === rows - 1 && H % 10 ? H % 10 : 10) - 10, y: TN_S.y + cell * (r + 0.5) })),
          onPoint: (i: number) => put({ prog: i + 1 }) };
      } else o = { tool: "pencil", moves: "draw", at: markAt, onPoint: (i: number) => put({ marks: i + 1 }) };
      api.act(o).then((ok: boolean) => {
        playing.current = false;
        if (!ok) return;
        put({ hund: true, marks: 2 }); api.sfx.settle();
        if (live.current === "demo") api.did("hundredths");
      });
    }
  };
  api.onEnter(stage === "demo" && stepOn ? () => doAct(stepOn) : null);
  HOOK.demo = stage === "demo" && stepOn ? () => doAct(stepOn) : null;

  /* the traceback: redraws the maths in steps and ends on the whole right answer, then gives the pad back */
  /* phase 1's first question counts every part in turn (steps 1 to cut), then the counts, then the fraction */
  const counting = n === 1 && kind === "frac";
  const tbK = counting ? it.cut + 2 : kind === "frac" ? (it.cut === 50 ? 3 : 2) : kind === "low" ? 3 : kind === "word" ? 1 : 2;
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const run: any[] = [];
    for (let j = 1; j <= tbK; j++) run.push([counting && j < it.cut ? 130 : 800, () => setTB({ w: wrong, v: j })]);
    tl.run([[200, () => {}], ...run], () => api.lock(false));
  }, [wrong]);

  /* the win: the three cards fill one after another and turn green together, with the tool's one line */
  useEffect(() => {
    if (stage !== "win" || free) return;
    if (n === 1 && index === 0) api.say("Yes, and that is 55/100, 0.55 and 55%.");
    if (n === 1 && index === 1) api.say("Yes, 36/100 is also 0.36 and 36%.");
    if (n === 2 && index === 0) api.say("Yes, both name 44 hundredths of the bar.");
    if (n === 2 && index === 1) api.say("Yes, 9/10 is also 0.9 and 90%.");
    if (n === 3 && index === 0) api.say("Yes, and as a decimal it is 0.45.");
    if (n === 3 && index === 1) api.say("Yes, the zero holds the tenths place.");
    if (n === 4 && index === 0) api.say("Yes, 37% means 37 of the 100 squares.");
    if (n === 4 && index === 1) api.say("Yes, 90% is a percentage, and so is 37%.");
    /* a phase's last right answer: the runtime shows the phase's closing in place of whatever is said here */
    if (index === PHASES[n - 1].items.length - 1) api.say(PHASES[n - 1].closing);
    tl.run([[320, () => { setRV({ k: qk, v: 1 }); api.sfx.tick(); }], [320, () => { setRV({ k: qk, v: 2 }); api.sfx.tick(); }],
      [320, () => { setRV({ k: qk, v: 3 }); api.sfx.tick(); }]], () => setRV({ k: qk, v: 4 }));
  }, [stage, qk]);

  /* what the host and the agent read back (toolApi.getState): the picture and the three names as drawn, the asked
     name masked until it is answered (PATTERNS §10); share() is called once per render, in each return path below */
  const base = { phase: n, shape: words ? null : it.shape || null, parts: words ? null : it.cut || null,
    shaded: words ? null : it.pct !== undefined ? it.pct : it.shaded, can_do: can, complete: stage === "idle" };

  /* ── drawing helpers (called, never mounted) ── */
  const fracG = (key: string, cx: number, by: number, f: any, fs: number, fill: string) => {
    const w = Math.max(String(f[0] ?? "").length, String(f[1]).length) * fs * 0.62 + 18;
    return (
      <g key={key}>
        {f[0] !== null && <text x={cx} y={by - fs * 0.2} textAnchor="middle" fontSize={fs} fontWeight={700} fill={fill}>{f[0]}</text>}
        {f[0] === null && <rect x={cx - 34} y={by - fs * 1.05} width={68} height={fs * 0.9} rx={10} fill="none" stroke={fill} strokeWidth={3} strokeDasharray="8 6" />}
        <line x1={cx - w / 2} y1={by} x2={cx + w / 2} y2={by} stroke={fill} strokeWidth={4} strokeLinecap="round" />
        <text x={cx} y={by + fs * 0.86} textAnchor="middle" fontSize={fs} fontWeight={700} fill={fill}>{f[1]}</text>
      </g>
    );
  };
  const decG = (key: string, cx: number, y: number, s: string, fs: number, fill: string) => {
    const [w, d] = s.split(".");
    return (
      <text key={key} x={cx} y={y} textAnchor="middle" fontSize={fs} fontWeight={700} fill={fill}>
        {w}{d !== undefined && "."}{d !== undefined && d[0] === "0" && d.length > 1 ? <tspan fill={TN_GREY0}>0</tspan> : null}{d !== undefined ? (d[0] === "0" && d.length > 1 ? d.slice(1) : d) : null}
      </text>
    );
  };
  /* a shape: the plain shape first (the fallback), then its skin, then the shading and the cuts in code (IMAGES §7).
     cake and ribbon are light: an unshaded part is the skin itself, a shaded one deep blue at 0.72 over it. The
     chocolate cell is dark: an uncounted cell wears a pale cream wash, a counted one a deep blue (the owner's rule). */
  const shapeG = (sh: number, hund: boolean, group: number, nums = 0) => {
    const { x, y, s } = TN_S, cut = it.cut;
    const fillOf = (k: number) => (k < sh ? TN_BLUE : TN_WARM);
    if (it.shape === "circle") {
      const cx = x + s / 2, cy = y + s / 2, r = s / 2 - 4, w = 360 / cut;
      return (
        <g>
          <defs><clipPath id="tn-cake"><circle cx={cx} cy={cy} r={r} /></clipPath></defs>
          {Array.from({ length: cut }, (_, k) => <path key={k} d={tnWedge(cx, cy, r, k * w, w)} fill={fillOf(k)} />)}
          <Skin name="cake" x={cx - r} y={cy - r} w={2 * r} h={2 * r} clip="url(#tn-cake)" />
          {tnCrust("tn-crust", cx, cy, r, Math.min(sh, cut) * w)}
          {sh > 0 && <path d={tnWedge(cx, cy, r, 0, Math.min(sh, cut) * w - (sh >= cut ? 0.01 : 0))} fill={TN_CAKE_BLUE} fillOpacity={TN_TINT} />}
          {/* the cuts start a little out from the centre where there are many, so the centre never goes black */}
          {Array.from({ length: cut }, (_, k) => { const [px, py] = tnPol(cx, cy, r, k * w), [qx, qy] = tnPol(cx, cy, cut >= 20 ? 20 : 0, k * w); return <line key={"c" + k} x1={qx} y1={qy} x2={px} y2={py} stroke={TN_LINE} strokeWidth={cut >= 50 ? 1.6 : 2.6} />; })}
          {hund && Array.from({ length: 100 }, (_, k) => { const [px, py] = tnPol(cx, cy, r, k * 3.6), [qx, qy] = tnPol(cx, cy, 40, k * 3.6); return <line key={"h" + k} x1={qx} y1={qy} x2={px} y2={py} stroke={TN_LINE} strokeWidth={1} />; })}
          {group > 1 && Array.from({ length: cut / group }, (_, k) => { const [px, py] = tnPol(cx, cy, r, k * group * w), [qx, qy] = tnPol(cx, cy, 20, k * group * w); return <line key={"g" + k} x1={qx} y1={qy} x2={px} y2={py} stroke={TN_LINE} strokeWidth={5} />; })}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={TN_LINE} strokeWidth={4.5} />
          {/* a correction counts every part in turn, shaded first; the last count is lit amber */}
          {Array.from({ length: Math.min(nums, cut) }, (_, k) => {
            const [px, py] = tnPol(cx, cy, r * 0.79, (k + 0.5) * w), last = k === cut - 1;
            return (
              <g key={"n" + k}>
                <circle cx={px} cy={py} r={24} fill={last ? tint(CONTENT.ten, 0.55) : "#FFFFFF"} stroke={last ? shade(CONTENT.ten, 0.2) : TN_LINE} strokeWidth={2} />
                <text x={px} y={py + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{k + 1}</text>
              </g>
            );
          })}
        </g>
      );
    }
    if (it.shape === "bar") {
      const bh = 240, by = y + (s - bh) / 2, cw = s / cut;
      return (
        <g>
          {Array.from({ length: cut }, (_, k) => <rect key={k} x={x + k * cw} y={by} width={cw} height={bh} fill={fillOf(k)} />)}
          <Skin name="ribbon" x={x} y={by} w={s} h={bh} />
          {tnRibbonWash("tn-rib", x + Math.min(sh, cut) * cw, by, s - Math.min(sh, cut) * cw, bh)}
          {sh > 0 && <rect x={x} y={by} width={Math.min(sh, cut) * cw} height={bh} fill={TN_CAKE_BLUE} fillOpacity={TN_TINT} />}
          {Array.from({ length: cut - 1 }, (_, k) => <line key={"c" + k} x1={x + (k + 1) * cw} y1={by} x2={x + (k + 1) * cw} y2={by + bh} stroke={TN_LINE} strokeWidth={cut >= 50 ? (group > 1 ? 0.8 : 1.4) : 2.4} />)}
          {hund && Array.from({ length: 99 }, (_, k) => <line key={"h" + k} x1={x + (s * (k + 1)) / 100} y1={by} x2={x + (s * (k + 1)) / 100} y2={by + bh} stroke={TN_LINE} strokeWidth={1} />)}
          {group > 1 && Array.from({ length: cut / group - 1 }, (_, k) => <line key={"g" + k} x1={x + (k + 1) * group * cw} y1={by - 10} x2={x + (k + 1) * group * cw} y2={by + bh + 10} stroke={TN_LINE} strokeWidth={cut / group > 12 ? 2.6 : 4} />)}
          <rect x={x} y={by} width={s} height={bh} fill="none" stroke={TN_LINE} strokeWidth={4.5} />
        </g>
      );
    }
    const [rows, cols] = TN_GRID[cut] || [1, cut];
    const c = Math.min(s / cols, s / rows), gx = x + (s - c * cols) / 2, gy = y + (s - c * rows) / 2;
    const one = cut > 40;   /* above 40 cells: ONE chocolate piece stretched over the grid, under the code-drawn cells */
    return (
      <g>
        <defs><clipPath id="tn-grid"><rect x={gx} y={gy} width={c * cols} height={c * rows} /></clipPath></defs>
        {Array.from({ length: cut }, (_, k) => <rect key={k} x={gx + (k % cols) * c} y={gy + Math.floor(k / cols) * c} width={c} height={c} fill={fillOf(k)} />)}
        {one ? <Skin name="cell" x={gx - TN_OVER * c * cols} y={gy - TN_OVER * c * rows} w={(1 + 2 * TN_OVER) * c * cols} h={(1 + 2 * TN_OVER) * c * rows} fit="stretch" clip="url(#tn-grid)" />
          : Array.from({ length: cut }, (_, k) => <Skin key={"s" + k} name="cell" x={gx + (k % cols) * c} y={gy + Math.floor(k / cols) * c} w={c} h={c} fit="stretch" />)}
        {Array.from({ length: cut }, (_, k) => <rect key={"w" + k} x={gx + (k % cols) * c} y={gy + Math.floor(k / cols) * c} width={c} height={c}
          fill={k < sh ? TN_BLUE : TN_WARM} fillOpacity={k < sh ? TN_COUNTED : TN_WASHED} stroke={TN_LINE} strokeWidth={2.4} />)}
        {hund && rows === cols && cut < 100 && Array.from({ length: 9 }, (_, k) => (
          <g key={"h" + k}>
            <line x1={gx + ((k + 1) * c * cols) / 10} y1={gy} x2={gx + ((k + 1) * c * cols) / 10} y2={gy + c * rows} stroke={TN_LINE} strokeWidth={1} />
            <line x1={gx} y1={gy + ((k + 1) * c * rows) / 10} x2={gx + c * cols} y2={gy + ((k + 1) * c * rows) / 10} stroke={TN_LINE} strokeWidth={1} />
          </g>
        ))}
        <rect x={gx} y={gy} width={c * cols} height={c * rows} fill="none" stroke={TN_LINE} strokeWidth={4.5} />
      </g>
    );
  };
  const chip = (key: string, cx: number, y: number, w: number, label: string, col: string) => (
    <g key={key}>
      <rect x={cx - w / 2} y={y} width={w} height={50} rx={14} fill={tint(col, 0.82)} stroke={shade(col, 0.2)} strokeWidth={2.5} />
      <text x={cx} y={y + 36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(col, 0.45)}>{label}</text>
    </g>
  );
  /* a card's typed boxes (answering on the card, PATTERNS §9e) */
  const boxG = (key: string, j: number, x: number, y: number, w: number, h: number, val: string) => {
    const on = box.open && part === j;
    const fs = val.length >= 3 ? T.speech : T.xl;
    return (
      <g key={key}>
        <rect x={x} y={y} width={w} height={h} rx={12} fill="#FFFFFF" stroke={on ? shade(CONTENT.ten, 0.2) : C.rule} strokeWidth={on ? 4 : 2.5} strokeDasharray={on || val ? undefined : "8 6"} />
        {val && <text x={x + w / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>{val}</text>}
        {on && <rect className="c4-caret" x={x + w / 2 + (val.length * fs * 0.31) + 4} y={y + 14} width={3} height={h - 28} rx={1.5} fill={C.accent} />}
      </g>
    );
  };

  /* ── phase 4: the words ── */
  if (words) {
    const cando = index === 2 && won;
    api.share({ ...base, words: PHASES[3].items.filter((q: any, k: number) => k < index || (k === index && won)).map((q: any) => q.answer) });
    if (cando) {
      return (
        <g>
          {TN_CANDO.map((t, r) => {
            const y = 104 + r * 82;
            return (
              <g key={r}>
                <text x={40} y={y + 47} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(t)}</text>
                {TN_TICKS.map((w, j) => (
                  <Key key={j} id={"can-" + (r + 1) + "-" + (j + 1)} label={tx(t) + ": " + tx(w)} x={520 + j * 206} y={y} w={190} h={72} C={C} tone={can[r] === j ? "enter" : "key"}
                    onClick={() => setCan((p: any) => p.map((x: any, k: number) => (k === r ? j : x)))}>
                    <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={can[r] === j ? toneInk("enter", "#FFFFFF") : toneInk("key", C.ink)}>{tx(w)}</text>
                  </Key>
                ))}
              </g>
            );
          })}
        </g>
      );
    }
    const pics = ["A", "B", "C"];
    const sat = (p: string) => PHASES[3].items.findIndex((q: any) => q.pic === p);
    const placed = (p: string) => sat(p) < index || (sat(p) === index && rev >= 1);
    const ghost = (p: string) => !!wrong && tb >= 1 && item.pic === p && !placed(p);
    const gs = 30, gx = 40, gy = 112;
    return (
      <g>
        {/* A: a hundred grid, 37 shaded (one chocolate piece stretched under the code-drawn cells) */}
        <defs><clipPath id="tn-grid4"><rect x={gx} y={gy} width={10 * gs} height={10 * gs} /></clipPath></defs>
        {Array.from({ length: 100 }, (_, k) => <rect key={"a" + k} x={gx + (k % 10) * gs} y={gy + Math.floor(k / 10) * gs} width={gs} height={gs} fill={k < 37 ? TN_BLUE : TN_WARM} />)}
        <Skin name="cell" x={gx - TN_OVER * 10 * gs} y={gy - TN_OVER * 10 * gs} w={(1 + 2 * TN_OVER) * 10 * gs} h={(1 + 2 * TN_OVER) * 10 * gs} fit="stretch" clip="url(#tn-grid4)" />
        {Array.from({ length: 100 }, (_, k) => <rect key={"aw" + k} x={gx + (k % 10) * gs} y={gy + Math.floor(k / 10) * gs} width={gs} height={gs}
          fill={k < 37 ? TN_BLUE : TN_WARM} fillOpacity={k < 37 ? TN_COUNTED : TN_WASHED} stroke={TN_LINE} strokeWidth={2} />)}
        <rect x={gx} y={gy} width={10 * gs} height={10 * gs} fill="none" stroke={TN_LINE} strokeWidth={4.5} />
        {/* B: one amount written three ways */}
        {["0.9", "9/10", "90%"].map((t, j) => {
          const x = 404 + j * 162;
          return (
            <g key={"b" + j}>
              <rect x={x} y={148} width={150} height={128} rx={RAD.panel} fill="#FFFFFF" stroke={j === 2 ? TN_LINE : C.rule} strokeWidth={j === 2 ? 4 : 2.5} />
              {j === 1 ? fracG("bf", x + 75, 212, [9, 10], T.prompt, tnInk(TN_BLUE)) : <text x={x + 75} y={232} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={tnInk(TN_BLUE)}>{t}</text>}
            </g>
          );
        })}
        {/* C: two bars shaded alike, 3 of 10 and 6 of 20 */}
        {[[10, 3, 150], [20, 6, 250]].map(([cut, sh, y]) => (
          <g key={"c" + cut}>
            {Array.from({ length: cut }, (_, k) => <rect key={k} x={934 + (k * 300) / cut} y={y} width={300 / cut} height={56} fill={k < sh ? TN_BLUE : TN_WARM} />)}
            <Skin name="ribbon" x={934} y={y} w={300} h={56} />
            {tnRibbonWash("tn-rib4-" + cut, 934 + (sh * 300) / cut, y, 300 - (sh * 300) / cut, 56)}
            <rect x={934} y={y} width={(sh * 300) / cut} height={56} fill={TN_CAKE_BLUE} fillOpacity={TN_TINT} />
            {Array.from({ length: cut - 1 }, (_, k) => <line key={"l" + k} x1={934 + ((k + 1) * 300) / cut} y1={y} x2={934 + ((k + 1) * 300) / cut} y2={y + 56} stroke={TN_LINE} strokeWidth={2} />)}
            <rect x={934} y={y} width={300} height={56} fill="none" stroke={TN_LINE} strokeWidth={4} />
            {fracG("cf" + cut, 1286, y + 34, [sh, cut], T.label, tnInk(TN_BLUE))}
          </g>
        ))}
        {pics.map((p) => {
          const P = TN_PIC[p], [sx, sy, sw, shh] = P.slot, [rx, ry, rw, rh] = P.ring, q = PHASES[3].items[sat(p)];
          const asked = item.pic === p && stage === "ask";
          const done = placed(p);
          return (
            <g key={"s" + p}>
              {asked && <rect x={rx} y={ry} width={rw} height={rh} rx={RAD.panel} fill="none" stroke={shade(CONTENT.ten, 0.1)} strokeWidth={5} />}
              <rect x={sx} y={sy} width={sw} height={shh} rx={RAD.panel} fill={done ? tint(CONTENT.one, 0.85) : "#FFFFFF"}
                stroke={done ? shade(CONTENT.one, 0.2) : ghost(p) ? shade(CONTENT.one, 0.2) : C.rule} strokeWidth={done ? 4 : 2.5} strokeDasharray={done ? undefined : "10 8"} />
              {done && <text x={sx + sw / 2} y={sy + shh / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(TN_CARD_WORD[q.answer])}</text>}
              {/* the correction: the right word under its picture, and what the word means */}
              {ghost(p) && (
                <g>
                  <text x={sx + sw / 2} y={sy + 34} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(TN_CARD_WORD[q.answer])}</text>
                  <text x={sx + sw / 2} y={sy + 70} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={shade(CONTENT.one, 0.45)}>{tx(TN_MEAN[p])}</text>
                </g>
              )}
            </g>
          );
        })}
      </g>
    );
  }

  /* ── phases 1 to 3 and free play: the shape and the three cards ── */
  const tp = slotPartsOf(typed, 2);
  const corr = !!wrong && tb >= tbK && !fresh;           /* the correction's own answer stands until the child types again */
  /* phase 3: the per cent over 100 is the child's working (the Over 100 key), drawn in the win and the correction too */
  const overOn = n === 3 && !free && !warmOn && (a.over || won || (!!wrong && tb >= 1));
  const ask0 = asking ? it.card : null;
  const ask = ask0 === "fr" && !overOn ? "fm" : ask0;   /* the answer boxes take the first place until N/100 stands there */
  /* the shape */
  const step3 = warmOn && n === 3 && !a.hund;
  const shaded = free ? it.shaded : step3 ? (a.prog > 0 ? Math.min(H, a.prog * 10) : 0) : it.pct !== undefined ? it.pct : it.shaded;
  const hundLines = n === 1 && !free && (a.hund || (won && rev >= 1) || (!!wrong && tb >= 1 && kind !== "frac"));
  /* the warm-up after its act; TN2 only in its win and its correction (it opens on a bare 22/50) */
  const simpShown = n === 2 && !free && (kind === "warm" ? a.simp : kind === "pick" && ((won && rev >= 1) || (!!wrong && tb >= 1)));
  const lowCut = tnLow(it.shaded || 0, it.cut || 1);
  const group = n !== 2 || free ? 1 : simpShown ? it.given[1] / tnLow(it.given[0], it.given[1])[1] : (kind === "low" || kind === "frac") && ((won && rev >= 1) || (!!wrong && tb >= 2)) ? it.cut / lowCut[1] : 1;

  /* the Fraction card: main (the first place) and res (the second), with the marks between */
  let main: any = null, res: any = null, marks: string | null = null, marksN = 2, eq = false, mainCol = tnInk(TN_BLUE), resCol = tnInk(TN_BLUE);
  const given = it.given && !step3 ? it.given : null;
  const childF = tp[0] !== "" && tp[1] !== "" ? [Number(tp[0]), Number(tp[1])] : null;
  if (free) { main = [it.shaded, it.cut]; }
  else if (n !== 3 && given && a.marks > 0 && !a.hund && !a.simp) {
    /* the pencil is writing the operation under both terms right now */
    main = given; marksN = a.marks; marks = n === 2 ? "÷" + tnGcd(given[0], given[1]) : "×" + 100 / given[1];
  }
  else {
    main = given;
    if (n === 1 && (a.hund || (won && rev >= 1) || (!!wrong && tb >= 1 && kind !== "frac"))) {
      const base = given || [it.shaded, it.cut];
      marks = "×" + 100 / base[1];
      res = a.hund && kind !== "warm" && !(won && rev >= 1) && !(wrong && tb >= 1) ? [null, 100] : [H, 100];
      if (kind === "frac" && won) main = childF || [it.shaded, it.cut];
      if (kind === "frac" && won && childF && childF[1] !== it.cut) { marks = null; eq = true; }
      if (kind === "frac" && won && childF && childF[1] === 100) { res = null; eq = false; }   /* already in hundredths: shown once */
    } else if (n === 2 && simpShown) {
      marks = rev >= 1 || tb >= 2 ? null : "÷" + tnGcd(given[0], given[1]); res = tnLow(given[0], given[1]); eq = !marks;
    } else if (n === 2 && (kind === "low" || kind === "frac")) {
      if (won) { main = childF || it.answer; const l = tnLow(main[0], main[1]); if (l[1] !== main[1]) { res = l; eq = true; } }
      else if (wrong && tb >= 2) { main = [it.shaded, it.cut]; marks = "÷" + tnGcd(it.shaded, it.cut); if (tb >= 3 || kind === "low") res = lowCut; if (kind === "frac" && tb < 3) res = null; }
    } else if (n === 3 && overOn) {
      main = [it.pct, 100];
      if (won) { res = kind === "low" ? childF || it.answer : low; eq = true; }
      else if (kind === "low" && wrong && tb >= 2) { marks = "÷" + tnGcd(it.pct, 100); if (tb >= 3) res = low; }
    }
  }
  if (won && rev >= 1) { mainCol = C.ink; resCol = C.ink; }
  if (corr && it.card === "fm") main = kind === "frac" ? [it.shaded, it.cut] : main;
  /* the Decimal card and the Per cent card */
  const warmDone = kind === "warm" && (a.hund || a.simp);   /* the warm-up's own three names, shown once its act is done */
  const decVal = free || warmDone ? tnDec(H) : won && rev >= 2 ? (it.card === "dec" && tp[0] !== "" ? tp[0] + "." + tp[1] : tnDec(H))
    : (it.card === "dec" && wrong && tb >= tbK) || (kind === "pick" && wrong && tb >= 2) ? tnDec(H) : null;
  const pctVal = free || warmDone ? H + "%" : n === 3 ? it.pct + "%" : won && rev >= 3 ? H + "%" : (it.card === "pct" && wrong && tb >= tbK) || (kind === "pick" && wrong && tb >= 2) ? H + "%" : null;
  const green = won && rev >= 4;
  const fs =(f: any) => (f && f[0] !== null ? f.join("/") : null);
  const askedName = it.card === "fm" || it.card === "fr" ? "fraction" : it.card === "dec" ? "decimal" : it.card === "pct" ? "per_cent" : "";
  const mask = (name: string, v: any) => (!free && !won && askedName === name ? null : v);
  api.share({ ...base, given: it.given || null,
    fraction: mask("fraction", fs(main) && (fs(res) ? fs(main) + " = " + fs(res) : fs(main))), decimal: mask("decimal", decVal), per_cent: mask("per_cent", pctVal) });
  const card = (y: number, h: number, title: string, asked: boolean) => (
    <g>
      <rect x={TN_X} y={y} width={TN_CW} height={h} rx={RAD.card} fill={green ? tint(CONTENT.one, 0.82) : "#FFFFFF"} stroke={green ? shade(CONTENT.one, 0.2) : asked ? shade(CONTENT.ten, 0.1) : C.rule} strokeWidth={green || asked ? 4 : 2.5} filter="url(#fShadowSoft)" />
      <text x={TN_X + 20} y={h > 150 ? y + 40 : y + h / 2 + 12} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(title)}</text>
    </g>
  );
  const fy = TN_F.by;
  const askBoxes = (cx: number) => [boxG("n", 0, cx - 60, fy - 74, 120, 72, tp[0]), boxG("d", 1, cx - 60, fy + 2, 120, 72, tp[1])];
  const showTyped = ask && !corr;
  const decAsked = ask === "dec";
  const pctAsked = ask === "pct";
  const holder = !free && (won || !!wrong) && !(showTyped && decAsked) && !!decVal && /^0\.0[1-9]/.test(decVal);
  const actKey = free ? null : n === 1 && asking && index === 1 && !a.hund && !wrong ? "hundredths"
    : n === 3 && asking && !a.over && !wrong && !box.open ? "over"
    : stage === "demo" && stepOn ? stepOn : null;
  const actLabel = actKey === "simplify" ? "Simplify" : actKey === "over" ? "Over 100" : "Hundredths";
  const kx = TN_X + 66, kw = 260;
  const cardTap = asking && answerOn === "card" && (ask === "fm" || ask === "fr" || ask === "dec");
  const tapBox: any = ask === "dec" ? [TN_X, TN_D.y, TN_CW, TN_D.h] : [TN_X, TN_F.y, TN_CW, TN_F.h];
  return (
    <g>
      {/* the shape, labelled as the whole; in a correction the counts stand in its place */}
      {!!wrong && tb >= (counting ? it.cut + 1 : 1) && (kind === "frac" || (kind === "low" && n === 2))
        ? [chip("cs", TN_S.x + 110, 4, 210, tx("Shaded") + " " + it.shaded, TN_BLUE), chip("ca", TN_S.x + 330, 4, 210, tx("Parts") + " " + it.cut, CONTENT.ten)]
        : !!wrong && tb >= 2 && kind === "pick" ? chip("cy", TN_S.x + TN_S.s / 2, 4, 300, tx("Both are right"), CONTENT.one)
        : !!wrong && tb >= 1 && kind === "dec" && n === 3 ? chip("ch", TN_S.x + TN_S.s / 2, 4, 300, it.pct + " " + tx("hundredths"), CONTENT.ten)
        : <text x={TN_S.x + TN_S.s / 2} y={40} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Whole") + " = 100%"}</text>}
      {shapeG(shaded, hundLines, group, counting && wrong ? tb : 0)}

      {/* the Fraction card */}
      {card(TN_F.y, TN_F.h, "Fraction", ask === "fm" || ask === "fr")}
      {showTyped && ask === "fm" ? askBoxes(TN_MAIN) : main && fracG("fm", TN_MAIN, fy, main, T.xl, corr && it.card === "fm" ? C.ink : mainCol)}
      {marks && (
        <g>
          <text x={TN_MID} y={fy - 22} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={tnInk(CONTENT.pointer)}>{marks}</text>
          {marksN > 1 && <text x={TN_MID} y={fy + 50} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={tnInk(CONTENT.pointer)}>{marks}</text>}
          <text x={TN_X + TN_CW - 20} y={40} textAnchor="end" fontSize={T.label} fontWeight={700} fill={tnInk(CONTENT.pointer)}>{tx("Both terms")}</text>
        </g>
      )}
      {(eq || (!marks && (res || ask === "fr"))) && <text x={TN_MID} y={fy + 14} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>=</text>}
      {showTyped && ask === "fr" ? askBoxes(TN_RES) : res && fracG("fr", TN_RES, fy, res, res[1] >= 100 || (res[0] ?? 0) >= 100 ? T.speech : T.xl, resCol)}
      {/* the Decimal card */}
      {card(TN_D.y, TN_D.h, "Decimal", decAsked)}
      {showTyped && decAsked ? (
        <g>
          {boxG("w", 0, TN_X + 176, TN_D.y + 16, 86, 72, tp[0])}
          <circle cx={TN_X + 277} cy={TN_D.y + 78} r={6.5} fill={C.ink} />
          {boxG("p", 1, TN_X + 292, TN_D.y + 16, 92, 72, tp[1])}
        </g>
      ) : decVal && decG("dv", TN_X + 290, TN_D.y + (holder ? 62 : 72), decVal, T.xl, green ? C.ink : tnInk(TN_BLUE))}
      {/* the zero that holds the tenths place open is named, in the win and the correction (0.08) */}
      {holder && <text x={TN_X + 290} y={TN_D.y + 98} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill="#555555">{tx("Place holder")}</text>}
      {/* the Per cent card: the % sign is printed, the child gives the number */}
      {card(TN_P.y, TN_P.h, "Per cent", pctAsked)}
      {pctAsked && !corr ? (
        <g>
          {boxG("pc", -1, TN_X + 206, TN_P.y + 16, 110, 72, slotPartsOf(typed, 1)[0])}
          <text x={TN_X + 330} y={TN_P.y + 72} fontSize={T.xl} fontWeight={700} fill={C.ink}>%</text>
        </g>
      ) : pctVal && <text x={TN_X + 290} y={TN_P.y + 72} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={green ? C.ink : tnInk(TN_BLUE)}>{pctVal}</text>}

      {/* the act key under the cards (one at a time); free play's four keys */}
      {actKey && (
        <g>
          <Key id={actKey} label={tx(actLabel)} x={kx} y={TN_KEY.y} w={kw} h={TN_KEY.h} C={C} tone="key" onClick={() => doAct(actKey)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(actLabel)}</text>
          </Key>
          {/* only a guide step's key is invited: an optional act key at a question is working only (the asked card blinks) */}
          {stage === "demo" && <Invite x={kx + kw / 2} y={TN_KEY.y + TN_KEY.h / 2} w={kw} h={TN_KEY.h} C={C} />}
        </g>
      )}
      {free && [["shape", "Shape", 116], ["parts", "Parts", 116], ["more", "+", 72], ["less", "−", 72]].map(([id, lab, w]: any, j: number) => {
        const x = TN_X + [0, 121, 242, 319][j];
        const go = () => setF((p: any) => {
          const cut = TN_CUTS[p.ci];
          if (id === "shape") return { ...p, shape: TN_SHAPES[(TN_SHAPES.indexOf(p.shape) + 1) % 3] };
          if (id === "parts") { const ci = (p.ci + 1) % TN_CUTS.length; return { ...p, ci, sh: Math.min(p.sh, TN_CUTS[ci]) }; }
          return { ...p, sh: Math.max(0, Math.min(cut, Math.min(p.sh, cut) + (id === "more" ? 1 : -1))) };
        });
        return (
          <Key key={id} id={id} label={tx(id === "more" ? "Shade one more" : id === "less" ? "Shade one less" : lab)} x={x} y={TN_KEY.y} w={w} h={TN_KEY.h} C={C} tone="key" onClick={() => { go(); api.sfx.tick(); }}>
            <text y={lab.length > 1 ? 11 : 14} textAnchor="middle" fontSize={lab.length > 1 ? T.label : T.prompt} fontWeight={700} fill={toneInk("key", C.ink)}>{lab.length > 1 ? tx(lab) : lab}</text>
          </Key>
        );
      })}

      {/* answering on the card: the whole card opens the keypad; with it open, the two boxes are the finger boxes */}
      {cardTap && !box.open && (
        <g>
          <BlinkRing x={tapBox[0]} y={tapBox[1]} w={tapBox[2]} h={tapBox[3]} rx={RAD.card} C={C} />
          <SlotPartBox id="answer-open" label={tx(ask === "dec" ? "Decimal card" : "Fraction card")} x={tapBox[0]} y={tapBox[1]} w={tapBox[2]} h={tapBox[3]} on={false} enabled={true} onPick={api.openAnswer} />
        </g>
      )}
      {cardTap && box.open && (ask === "dec"
        ? [<SlotPartBox key="p1" id="part-1" label={tx("whole part")} x={TN_X + 170} y={TN_D.y + 10} w={98} h={84} on={part === 0} enabled={true} onPick={() => api.pickPart(0)} />,
           <SlotPartBox key="p2" id="part-2" label={tx("decimal part")} x={TN_X + 286} y={TN_D.y + 10} w={104} h={84} on={part === 1} enabled={true} onPick={() => api.pickPart(1)} />]
        : [<SlotPartBox key="p1" id="part-1" label={tx("numerator")} x={(ask === "fr" ? TN_RES : TN_MAIN) - 66} y={fy - 78} w={132} h={76} on={part === 0} enabled={true} onPick={() => api.pickPart(0)} />,
           <SlotPartBox key="p2" id="part-2" label={tx("denominator")} x={(ask === "fr" ? TN_RES : TN_MAIN) - 66} y={fy + 2} w={132} h={78} on={part === 1} enabled={true} onPick={() => api.pickPart(1)} />])}
      {/* the asked Per cent card opens the keypad too, as the Fraction and Decimal cards do (the Answer key in the corner blinks) */}
      {pctAsked && !box.open && answerOn === "key" && (
        <SlotPartBox id="pct-card" label={tx("Per cent card")} x={TN_X} y={TN_P.y} w={TN_CW} h={TN_P.h} on={false} enabled={true} onPick={api.openAnswer} />
      )}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, tx = (v: any) => v }: any) {
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined || !it) return null;
  const k = it.kind, ink = C.ink, cy = h / 2;
  let body: any;
  if (k === "frac" || k === "low") {
    const [a, b] = slotPartsOf(v, 2);
    body = (
      <g>
        <text x={w / 2} y={cy - 6} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{a}</text>
        <line x1={w / 2 - 26} y1={cy} x2={w / 2 + 26} y2={cy} stroke={ink} strokeWidth={3} />
        <text x={w / 2} y={cy + 27} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{b}</text>
      </g>
    );
  } else if (k === "word" && it.pic === "C") {
    /* the picture the word card landed on: two bars shaded alike (no letters, so it reads in every language) */
    body = (
      <g>
        {[[10, 3, cy - 22], [20, 6, cy + 4]].map(([cut, sh, y]) => (
          <g key={cut}>
            {Array.from({ length: cut }, (_, j) => <rect key={j} x={w / 2 - 90 + (j * 180) / cut} y={y} width={180 / cut} height={18} fill={j < sh ? TN_BLUE : TN_WARM} stroke={TN_LINE} strokeWidth={1} />)}
          </g>
        ))}
      </g>
    );
  } else {
    const s = k === "dec" ? slotPartsOf(v, 2).join(".") : k === "pct" ? slotPartsOf(v, 1)[0] + "%" : k === "pick" ? it.choices[0].label + " = " + it.choices[1].label
      : k === "word" ? (it.pic === "A" ? "37%" : "90%") : String(v);
    body = <text x={w / 2} y={cy + 11} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{s}</text>;
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(CONTENT.one, 0.85)} stroke={shade(CONTENT.one, 0.2)} strokeWidth={2} />
      {body}
    </g>
  );
}

function ThreeNames(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      /* the fraction and decimal questions are answered ON their card (PATTERNS §9e) */
      cardAnswer: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default ThreeNames;
