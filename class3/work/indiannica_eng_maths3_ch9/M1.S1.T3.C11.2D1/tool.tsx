/* ═══ M1.S1.T3.C11.2D1 · length_converter · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists. THE LESSON IS SILENT (runtime r30+): every line is printed on the bubble.
   THE NEW LOOK (keyOnly, navDots): no question bar, the question lives only in the bubble, every act is
   performed on screen (api.act). MISS HIDES THE ANSWER (rules.missHidesAnswer "strict"): a correction replays
   the working and stops one step before the answer; whatever shows the answer is tagged data-reveals="answer"
   and drawn only at the win. MISS CLEARS THE SLOT (r3): the runtime empties the slot at a miss.
   THE ANSWER IS GATED BY THE ACT (PATTERNS 19): every question has an act on the board (Break, Cut, Slide,
   Carry or Borrow); the Answer key stays locked until it is done (user mode, after a real touch).
   guide.answerGate (for the sidecar): P1 Q1-Q3 Break (the hand breaks each metre rod into 100 cm);
   P2 Q1-Q3 Cut (scissors cut the ribbon at every 100 cm); P3 Q1-Q3 Slide (the hand slides a post 1 km at a
   time); P4 Q1-Q2 Carry (100 cm hop into the metres column as 1 m), P4 Q3 Borrow (1 m breaks into 100 cm). In P4 the
   Carry and Borrow keys stand side by side at every question: the right one opens the gate, the wrong one gets a nudge.
   No question is ungated. Edit, never rewrite. */

const TOOL_ID = "length_converter";
const MEDIA_ID = "M1.S1.T3.C11.2D1";
const TOOL_NAME = "Length Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A metre rod, a long road and a board for adding."];
/* the whole-tool line (no longer shown from r44; kept for the sidecar) */
const FINISH_LINE = "You changed the unit and kept the length the same.";
/* printed when the child opens Free play; every control it names is in the free branch of Work */
const FREE_LINE = "Free play: break rods, cut ribbons, slide posts, carry and borrow centimetres.";

/* THE START PAGE: one question to wonder at, and the objects of the lesson */
const START_HOOK = "How many centimetres are in a metre rod?";

/* the chapter's colour roles: Given blue, Answer green, Second / Left amber, Unit fact vermilion; marks near-black */
const LC_BLUE = "#0072B2", LC_GREEN = "#009E73", LC_AMBER = "#E69F00", LC_VERM = "#D55E00";
/* the ribbon's plain fallback is a deep wine, never a red the wrong-is-unmarked row would read as a mark */
const LC_INK = "#2B2B2B", LC_WOOD = "#E4C590", LC_CREAM = "#FFF9EC", LC_ROAD = "#7B746A", LC_RIB = "#7A1F3D", LC_POST = "#8A5A2B";
const lcInk = (c: string) => shade(c, c === LC_AMBER ? 0.5 : 0.32);
/* a text's width in stage units (Poppins: about 0.58 em a Latin character; Devanagari and Gujarati counted letter by letter) */
const lcTW = (s: any, size: number) => {
  let n = 0;
  for (const ch of String(s)) {
    const c = ch.codePointAt(0) || 0;
    if ((c >= 0x0900 && c <= 0x0902) || c === 0x093c || (c >= 0x0941 && c <= 0x0948) || c === 0x094d || (c >= 0x0951 && c <= 0x0957) || c === 0x0962 || c === 0x0963) continue;
    if ((c >= 0x0a81 && c <= 0x0a82) || c === 0x0abc || (c >= 0x0ac1 && c <= 0x0ac8) || c === 0x0acd || c === 0x0ae2 || c === 0x0ae3) continue;
    n += c >= 0x0a80 ? 0.8 : c >= 0x0900 ? 0.63 : ch === " " ? 0.3 : /[0-9]/.test(ch) ? 0.64 : /[mwMW]/.test(ch) ? 0.95 : /[il.,:;'|]/.test(ch) ? 0.3 : /[frtj]/.test(ch) ? 0.42 : /[A-Z]/.test(ch) ? 0.72 : 0.62;
  }
  return n * size;
};

function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const rx = 100, ry = 30, rw = 1000, rh = 56;
  const tk: string[] = [];
  for (let i = 1; i < 100; i++) tk.push(`M${(rx + (i * rw) / 100).toFixed(1)} ${ry}v${i % 10 === 0 ? 26 : i % 5 === 0 ? 17 : 10}`);
  const ru = { x: 100, y: 250, w: 450, h: 75 };
  const rt: string[] = [];
  for (let i = 1; i < 20; i++) rt.push(`M${(ru.x + 12 + (i * (ru.w - 24)) / 20).toFixed(1)} ${ru.y}v${i % 10 === 0 ? 30 : i % 5 === 0 ? 22 : 14}`);
  const tiles = [0, 1, 2];
  return (
    <g pointerEvents="none">
      <defs>
        <filter id="start-shadow" x="-5%" y="-10%" width="110%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.16" />
        </filter>
      </defs>
      <g filter="url(#start-shadow)">
        <rect x={rx} y={ry} width={rw} height={rh} rx={8} fill={LC_WOOD} />
        <Skin name="rod" x={rx} y={ry} w={rw} h={rh} fit="stretch" />
        <path d={tk.join(" ")} stroke={LC_INK} strokeWidth={2} opacity={0.85} />
        <rect x={rx} y={ry} width={rw} height={rh} rx={8} fill="none" stroke={LC_INK} strokeWidth={2.5} />
        <text x={rx + rw / 2} y={ry + rh + 38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LC_INK}>{`1 ${tx("m")}`}</text>
      </g>
      <g filter="url(#start-shadow)">
        <rect x={100} y={150} width={450} height={78} rx={6} fill={LC_RIB} />
        <Skin name="ribbon" x={100} y={150} w={450} h={78} fit="stretch" />
        <rect x={100} y={150} width={450} height={78} rx={6} fill="none" stroke={LC_INK} strokeWidth={2} />
      </g>
      <g filter="url(#start-shadow)">
        <rect x={ru.x} y={ru.y} width={ru.w} height={ru.h} rx={2} fill={LC_CREAM} />
        <Skin name="ruler" x={ru.x} y={ru.y} w={ru.w} h={ru.h} fit="stretch" />
        <path d={rt.join(" ")} stroke={LC_INK} strokeWidth={2} opacity={0.85} />
        <rect x={ru.x} y={ru.y} width={ru.w} height={ru.h} rx={2} fill="none" stroke={LC_INK} strokeWidth={2} />
      </g>
      <g filter="url(#start-shadow)">
        {tiles.map((s) => (
          <g key={"t" + s}>
            <rect x={620 + s * 160} y={240} width={160} height={56} fill={LC_ROAD} />
            <Skin name="road" x={620 + s * 160} y={240} w={160} h={56} fit="stretch" />
          </g>
        ))}
        <path d="M620 268 H1100" stroke="#FFF" strokeWidth={3} strokeDasharray="16 12" opacity={0.7} />
        <rect x={620} y={240} width={480} height={56} rx={4} fill="none" stroke={LC_INK} strokeWidth={2} />
        {[0, 1, 2, 3].map((s) => (
          <g key={"p" + s}>
            <rect x={620 + s * 160 - 5} y={178} width={10} height={62} rx={3} fill={LC_POST} stroke={LC_INK} strokeWidth={1.5} />
            <rect x={620 + s * 160 - 5} y={178} width={5} height={62} rx={2} fill="#FFF" opacity={0.25} />
            <rect x={620 + s * 160 - 20} y={168} width={40} height={22} rx={4} fill={LC_CREAM} stroke={LC_POST} strokeWidth={2.5} />
          </g>
        ))}
      </g>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final and reviewed. */
const TR: any = {
  hi: {
    "Length Converter": "लंबाई बदलो",
    "Metres into centimetres: multiply by 100": "मीटर से सेंटीमीटर: 100 से गुणा करो",
    "Tap Break to break each metre rod into centimetres.": "तोड़ो बटन छुओ और हर छड़ को सेंटीमीटर में तोड़ो।",
    "Break sits under the rods.": "तोड़ो बटन छड़ों के नीचे है।",
    "Break one metre at a time and count the lots of 100.": "एक बार में एक मीटर तोड़ो और 100 के समूह गिनो।",
    "Write the hundreds from the rods, then the centimetres from the piece.": "छड़ों से सैकड़े लिखो, फिर टुकड़े से सेंटीमीटर लिखो।",
    "To change metres into centimetres multiply by 100 and add the centimetres.": "सेंटीमीटर के लिए मीटर को 100 से गुणा करो और सेंटीमीटर जोड़ो।",
    "You learned: 1 m is 100 cm, so multiply metres by 100 for centimetres": "तुमने सीखा: 1 मी में 100 सेमी होते हैं, इसलिए मी को 100 से गुणा करो",
    "How many centimetres long is a kite string of 6 m 37 cm?": "6 मीटर 37 सेंटीमीटर लंबी पतंग की डोर कितने सेंटीमीटर लंबी है?",
    "6 m 37 cm in cm?": "6 मी 37 सेमी में कितने सेमी?",
    "Change the metres into centimetres before you add the piece.": "बचा टुकड़ा जोड़ने से पहले मीटर को सेंटीमीटर में बदलो।",
    "Count 100 cm for every rod, then add the short piece.": "हर छड़ के 100 सेंटीमीटर गिनो, फिर छोटा टुकड़ा जोड़ो।",
    "Six rods make 600 cm, so add the 37 cm piece to that.": "छह छड़ों के 600 सेंटीमीटर हैं, इसमें 37 सेंटीमीटर जोड़ो।",
    "Yes, 6 m 37 cm is 637 cm.": "हाँ, 6 मीटर 37 सेंटीमीटर यानी 637 सेंटीमीटर।",
    "In centimetres, how long is a garden hose of 5 m 7 cm?": "5 मीटर 7 सेंटीमीटर लंबे बगीचे के पाइप की लंबाई सेंटीमीटर में लिखो।",
    "5 m 7 cm in cm?": "5 मी 7 सेमी में कितने सेमी?",
    "The metres make hundreds of centimetres.": "मीटर से सैकड़ों सेंटीमीटर बनते हैं।",
    "A 7 cm piece has no tens, so the tens place needs a zero.": "7 सेंटीमीटर के टुकड़े में दहाई नहीं है, तो दहाई के स्थान पर शून्य लिखो।",
    "Five rods make 500 cm, and the 7 cm piece adds only 7 more.": "पाँच छड़ें 500 सेंटीमीटर हैं, और 7 सेंटीमीटर का टुकड़ा बस 7 और जोड़ता है।",
    "Right, 507 cm, with a zero in the tens place.": "सही, पाइप 507 सेंटीमीटर लंबा है और दहाई में शून्य है।",
    "A school wall is 13 m long; what is that in centimetres?": "स्कूल की दीवार की लंबाई 13 मीटर को सेंटीमीटर में बदलो।",
    "13 m in cm?": "13 मी में कितने सेमी?",
    "The wall has no short piece; every rod is a whole metre.": "दीवार में कोई छोटा टुकड़ा नहीं है, हर छड़ पूरा एक मीटर है।",
    "Count the rods in centimetres: 100 cm, 200 cm, 300 cm and on.": "छड़ों को सौ-सौ सेंटीमीटर में गिनो: 100, 200, 300 और आगे।",
    "Ten rods make 1,000 cm; add 100 cm for each extra rod.": "दस छड़ों के 1,000 सेंटीमीटर होते हैं, फिर हर छड़ पर 100 सेंटीमीटर जोड़ते जाओ।",
    "Well done, the wall is 1,300 cm long.": "शाबाश, दीवार 1,300 सेंटीमीटर लंबी है।",
    "Centimetres into metres: divide by 100": "सेंटीमीटर से मीटर: 100 से भाग दो",
    "Tap Cut to cut the ribbon into pieces of 1 m.": "काटो बटन छुओ और रिबन को 1 मीटर के टुकड़ों में काटो।",
    "Cut sits under the ribbon.": "काटो बटन रिबन के नीचे है।",
    "Each 100 cm makes one metre piece.": "हर 100 सेंटीमीटर से एक मीटर का टुकड़ा बनता है।",
    "Metres first, then the centimetres that do not make a metre.": "पहले मीटर, फिर बचे हुए सेंटीमीटर।",
    "Divide by 100 for metres; the last two digits are the cm.": "मीटर के लिए 100 से भाग दो, आख़िरी दो अंक सेंटीमीटर हैं।",
    "You learned: 100 cm make 1 m, and the last two digits are the cm": "तुमने सीखा: 100 सेमी का 1 मी होता है, और आख़िरी दो अंक सेमी हैं",
    "How many metres and centimetres is a ribbon of 834 cm on a reel?": "रील पर लिपटा 834 सेंटीमीटर का रिबन कितने मीटर और सेंटीमीटर का है?",
    "834 cm in m and cm?": "834 सेमी में कितने मी और सेमी?",
    "Only the 1 m pieces count as metres.": "सिर्फ़ पूरे 1 मीटर के टुकड़े मीटर में गिने जाते हैं।",
    "The piece left over is shorter than 1 m, so it stays in centimetres.": "बचा हुआ टुकड़ा 1 मीटर से छोटा है, तो वह सेंटीमीटर में ही रहता है।",
    "The last two digits of 834 are the cm left over.": "834 के आख़िरी दो अंक बचे हुए सेंटीमीटर हैं।",
    "Yes, 834 cm is 8 m 34 cm.": "हाँ, 834 सेंटीमीटर यानी 8 मीटर 34 सेंटीमीटर।",
    "metres": "मीटर",
    "m": "मी",
    "left over": "बचा हुआ",
    "cm": "सेमी",
    "Write a ribbon of 605 cm in metres and centimetres.": "605 सेंटीमीटर के रिबन की लंबाई मीटर और सेंटीमीटर में लिखो।",
    "605 cm in m and cm?": "605 सेमी में कितने मी और सेमी?",
    "Count the 1 m pieces, then look at the tiny piece left.": "1 मीटर के टुकड़े गिनो, फिर बचा हुआ छोटा टुकड़ा देखो।",
    "The tiny end piece is not a whole metre; leave it out of the metres.": "आख़िरी छोटा टुकड़ा पूरा मीटर नहीं है, उसे मीटर में मत गिनो।",
    "Take away the 1 m pieces; the rest is under 100 cm.": "1 मीटर के टुकड़े हटा दो, 100 से कम सेंटीमीटर बाकी बचते हैं।",
    "Right, 6 m 5 cm is the ribbon's length.": "सही, 6 मीटर 5 सेंटीमीटर रिबन की लंबाई है।",
    "Change a ribbon as long as a train coach, 1,867 cm, into m and cm.": "रेल के डिब्बे जितने लंबे 1,867 सेंटीमीटर के रिबन को मीटर और सेंटीमीटर में बदलो।",
    "1,867 cm in m and cm?": "1,867 सेमी में कितने मी और सेमी?",
    "Count the whole 1 m pieces, row by row.": "पूरे 1 मीटर के टुकड़े गिनो, एक-एक पंक्ति करके।",
    "Count the rows of 5 m first, then the single pieces.": "पहले 5 मीटर की पंक्तियाँ गिनो, फिर उनके बाद के अकेले टुकड़े।",
    "Cover the last two digits of 1,867; the digits before them are the metres.": "1,867 के आख़िरी दो अंक ढक दो, उनसे पहले के अंक मीटर हैं।",
    "Well done, 1,867 cm makes 18 m 67 cm.": "शाबाश, 1,867 सेंटीमीटर से 18 मीटर 67 सेंटीमीटर बनता है।",
    "Kilometres and metres: use 1,000": "किलोमीटर और मीटर: 1,000 का उपयोग करो",
    "Tap Slide to move the post along the road, 1 km a step.": "सरकाओ बटन छुओ, खंभा हर बार 1 किलोमीटर चलेगा।",
    "Slide sits under the road.": "सरकाओ बटन सड़क के नीचे है।",
    "Slide one kilometre at a time and count the stops.": "एक बार में एक किलोमीटर सरकाओ और पड़ाव गिनो।",
    "Kilometres to metres is times 1,000, and back is divided by 1,000.": "किलोमीटर से मीटर में 1,000 से गुणा और वापस 1,000 से भाग।",
    "Multiply km by 1,000 for metres and divide by 1,000 for kilometres.": "मीटर के लिए 1,000 से गुणा, किलोमीटर के लिए 1,000 से भाग।",
    "You learned: 1 km is 1,000 m, so multiply or divide by 1,000": "तुमने सीखा: 1 किमी में 1,000 मी होते हैं, इसलिए 1,000 से गुणा या भाग करो",
    "How many metres long is a road of 6 km 275 m from the village to the river?": "6 किलोमीटर 275 मीटर लंबी सड़क कितने मीटर लंबी है?",
    "6 km 275 m in m?": "6 किमी 275 मी में कितने मी?",
    "One kilometre is 1,000 m.": "एक किलोमीटर में 1,000 मीटर होते हैं।",
    "Change each kilometre into 1,000 m, then add the rest.": "बाकी जोड़ने से पहले हर किलोमीटर को 1,000 मीटर में बदलो।",
    "6 km is 6,000 m, so add the 275 m to it.": "6 किलोमीटर के 6,000 मीटर होते हैं, तो इसमें 275 मीटर जोड़ो।",
    "Yes, 6 km 275 m is 6,275 m.": "हाँ, 6 किलोमीटर 275 मीटर यानी 6,275 मीटर।",
    "In kilometres, how long is a train track of 3,000 m?": "3,000 मीटर लंबी रेलवे लाइन की लंबाई किलोमीटर में लिखो।",
    "3,000 m in km?": "3,000 मी में कितने किमी?",
    "Every 1,000 m along the road makes one kilometre.": "सड़क पर हर 1,000 मीटर से एक किलोमीटर बनता है।",
    "Count the posts the slide planted; each stands 1 km further on.": "सरकाने से लगे खंभे गिनो, हर खंभा पिछले से 1 किलोमीटर आगे है।",
    "Divide the metres by 1,000 to find the kilometres.": "किलोमीटर पाने के लिए मीटर को 1,000 से भाग दो।",
    "Right, 3 km of track.": "सही, रेलवे लाइन 3 किलोमीटर लंबी है।",
    "Change 7,461 m of cycle path into kilometres and metres.": "7,461 मीटर लंबे साइकिल पथ को किलोमीटर और मीटर में बदलो।",
    "7,461 m in km and m?": "7,461 मी में कितने किमी और मी?",
    "Count whole kilometres first, 1,000 m for each.": "पहले पूरे किलोमीटर गिनो, हर एक के 1,000 मीटर।",
    "The part of the road after the last post is under 1 km, so it stays in metres.": "आख़िरी खंभे के बाद 1 किलोमीटर से कम है, वह मीटर में रहेगा।",
    "The last three digits are the metres left over.": "आख़िरी तीन अंक मीटर हैं।",
    "Well done, 7,461 m makes 7 km 461 m.": "शाबाश, 7,461 मीटर से 7 किलोमीटर 461 मीटर बनता है।",
    "kilometres": "किलोमीटर",
    "km": "किमी",
    "Adding and subtracting lengths": "लंबाइयों का जोड़ और घटाव",
    "Tap the cm column to add the centimetres first.": "पहले सेंटीमीटर जोड़ो: उसका खाना छुओ।",
    "The cm column is the right half of the board.": "सेंटीमीटर का खाना बोर्ड के दाईं तरफ़ है।",
    "That is more than 100 cm, so tap Carry.": "यह 100 सेंटीमीटर से ज़्यादा है, तो हासिल बटन छुओ।",
    "The Carry key sits under the board.": "हासिल बटन बोर्ड के नीचे है।",
    "Start with the small unit in every sum.": "हर सवाल में छोटी इकाई से शुरू करो।",
    "Carry or borrow where the cm column needs it.": "सेंटीमीटर के खाने में ज़रूरत हो तो हासिल या उधार लो।",
    "Carry 100 cm as 1 m, or borrow 1 m as 100 cm.": "100 सेंटीमीटर का 1 मीटर हासिल लो, या 1 मीटर के 100 सेंटीमीटर उधार लो।",
    "You learned: add and subtract lengths in m and cm columns, cm first": "तुमने सीखा: पहले सेमी का खाना, फिर मी का खाना जोड़ो या घटाओ",
    "2 m 74 cm and 1 m 69 cm were cut from one rope; how long was the rope?": "रस्सी से 2 मीटर 74 सेंटीमीटर और 1 मीटर 69 सेंटीमीटर कटे, रस्सी कितनी लंबी थी?",
    "2 m 74 cm + 1 m 69 cm": "2 मी 74 सेमी + 1 मी 69 सेमी",
    "100 cm or more cannot stay in the cm column.": "सेंटीमीटर के खाने में 100 सेंटीमीटर या उससे ज़्यादा नहीं रह सकते।",
    "The carried 1 m joins the metres column too.": "हासिल हुआ 1 मीटर, मीटर के खाने में जोड़ो।",
    "Take 100 cm off the centimetres total, then add 1 m to the metres.": "सेंटीमीटर के जोड़ में से 100 सेंटीमीटर घटाओ, फिर मीटर में 1 मीटर जोड़ो।",
    "Yes, 4 m 43 cm is the whole rope.": "हाँ, 4 मीटर 43 सेंटीमीटर की पूरी रस्सी है।",
    "m column": "मी का खाना",
    "cm column": "सेमी का खाना",
    "How long are two ribbons of 3 m 45 cm and 2 m 55 cm laid end to end?": "दो रिबन 3 मीटर 45 सेंटीमीटर और 2 मीटर 55 सेंटीमीटर के हैं, मिलाकर कितने लंबे?",
    "3 m 45 cm + 2 m 55 cm": "3 मी 45 सेमी + 2 मी 55 सेमी",
    "Keep metres and centimetres in their own columns.": "मीटर और सेंटीमीटर को अपने-अपने खानों में रखो।",
    "Count the metres again with the carried 1 m added.": "हासिल का 1 मीटर जोड़कर मीटर फिर से गिनो।",
    "45 cm and 55 cm fill a whole metre exactly.": "45 सेंटीमीटर और 55 सेंटीमीटर से ठीक एक मीटर भरता है।",
    "Yes, 6 m 0 cm, which is just 6 m.": "हाँ, 6 मीटर 0 सेंटीमीटर, यानी बस 6 मीटर।",
    "How much cloth is left when a tailor cuts 2 m 47 cm from 5 m 28 cm?": "दर्ज़ी 5 मीटर 28 सेंटीमीटर में से 2 मीटर 47 सेंटीमीटर काटे तो कितना कपड़ा बचेगा?",
    "5 m 28 cm − 2 m 47 cm": "5 मी 28 सेमी − 2 मी 47 सेमी",
    "Look at the top row after the borrow.": "उधार लेने के बाद ऊपर की पंक्ति देखो।",
    "Subtract each column on its own, centimetres first.": "हर खाने को अलग-अलग घटाओ, पहले सेंटीमीटर।",
    "Take 47 cm from 128 cm, then take 2 m from 4 m.": "128 में से 47 सेंटीमीटर घटाओ, फिर 4 में से 2 मीटर घटाओ।",
    "Yes, 2 m 81 cm of cloth is left.": "हाँ, 2 मीटर 81 सेंटीमीटर कपड़ा बचा है।",
    "Break the rods, and then you can answer.": "पहले छड़ें तोड़ो, फिर उत्तर दो।",
    "The rods are still whole, so tap Break first.": "छड़ें अभी पूरी हैं, तो पहले तोड़ो बटन छुओ।",
    "Cut the ribbon, and then you can answer.": "पहले रिबन काटो, फिर उत्तर दो।",
    "The ribbon is still in one piece, so tap Cut first.": "रिबन अभी एक ही टुकड़े में है, तो पहले काटो बटन छुओ।",
    "Slide the post along the road before you answer.": "पहले खंभा सरकाओ, फिर उत्तर दो।",
    "The post has not moved yet, so tap Slide first.": "खंभा अभी हिला नहीं है, तो पहले सरकाओ बटन छुओ।",
    "Look at the cm column, then tap Carry or Borrow.": "सेंटीमीटर का खाना देखो, फिर हासिल या उधार बटन छुओ।",
    "Choose Carry or Borrow for the cm column first.": "पहले सेंटीमीटर के खाने के लिए हासिल या उधार चुनो।",
    "Check the cm column again before you choose.": "चुनने से पहले सेंटीमीटर के खाने को फिर से देखो।",
    "Look at the cm column: do the centimetres fit?": "सेंटीमीटर का खाना देखो, क्या सेंटीमीटर उसमें समा जाते हैं?",
    "Break": "तोड़ो",
    "Cut": "काटो",
    "Slide": "सरकाओ",
    "Carry": "हासिल",
    "Borrow": "उधार",
    "Left": "बचा",
    "Given": "दिया है",
    "Answer": "उत्तर",
    "How many centimetres are in a metre rod?": "एक मीटर की छड़ में कितने सेंटीमीटर होते हैं?",
    "The Break key comes before the answer.": "उत्तर से पहले तोड़ो बटन छुओ।",
    "The Cut key comes before the answer.": "उत्तर से पहले काटो बटन छुओ।",
    "The Slide key comes before the answer.": "उत्तर से पहले सरकाओ बटन छुओ।",
    "Carry or Borrow comes before the answer.": "पहले हासिल या उधार चुनो।",
    "Think about the cm column once more.": "सेंटीमीटर के खाने के बारे में एक बार फिर सोचो।",
    "Fill both boxes.": "दोनों खाने भरो।",
    "Free play: break rods, cut ribbons, slide posts, carry and borrow centimetres.": "मुक्त खेल: छड़ तोड़ो, रिबन काटो, खंभा सरकाओ, हासिल और उधार लो।",
  },
  gu: {
    "Length Converter": "લંબાઈ બદલો",
    "Metres into centimetres: multiply by 100": "મીટરમાંથી સેન્ટીમીટર: 100 વડે ગુણો",
    "Tap Break to break each metre rod into centimetres.": "તોડો બટનને સ્પર્શ કરો અને દરેક સળિયાને સેન્ટીમીટરમાં તોડો.",
    "Break sits under the rods.": "તોડો બટન સળિયાની નીચે છે.",
    "Break one metre at a time and count the lots of 100.": "એક વારમાં એક મીટર તોડો અને 100 ના સમૂહ ગણો.",
    "Write the hundreds from the rods, then the centimetres from the piece.": "સળિયા પરથી શતક લખો, પછી ટુકડા પરથી સેન્ટીમીટર લખો.",
    "To change metres into centimetres multiply by 100 and add the centimetres.": "મીટરને સેન્ટીમીટરમાં બદલવા 100 વડે ગુણો અને સેન્ટીમીટર ઉમેરો.",
    "You learned: 1 m is 100 cm, so multiply metres by 100 for centimetres": "તમે શીખ્યા: 1 મીમાં 100 સેમી હોય છે, તેથી મીટરને 100 વડે ગુણો",
    "How many centimetres long is a kite string of 6 m 37 cm?": "6 મીટર 37 સેન્ટીમીટર લાંબી પતંગની દોરી કેટલા સેન્ટીમીટર લાંબી છે?",
    "6 m 37 cm in cm?": "6 મી 37 સેમીમાં કેટલા સેમી?",
    "Change the metres into centimetres before you add the piece.": "બાકીનો ટુકડો ઉમેરતાં પહેલાં મીટરને સેન્ટીમીટરમાં બદલો.",
    "Count 100 cm for every rod, then add the short piece.": "દરેક સળિયાના 100 સેન્ટીમીટર ગણો, પછી નાનો ટુકડો ઉમેરો.",
    "Six rods make 600 cm, so add the 37 cm piece to that.": "છ સળિયાના 600 સેન્ટીમીટર થાય, તો તેમાં 37 સેન્ટીમીટરનો ટુકડો ઉમેરો.",
    "Yes, 6 m 37 cm is 637 cm.": "હા, 6 મીટર 37 સેન્ટીમીટર એટલે 637 સેન્ટીમીટર.",
    "In centimetres, how long is a garden hose of 5 m 7 cm?": "5 મીટર 7 સેન્ટીમીટર લાંબી બગીચાની નળીની લંબાઈ સેન્ટીમીટરમાં લખો.",
    "5 m 7 cm in cm?": "5 મી 7 સેમીમાં કેટલા સેમી?",
    "The metres make hundreds of centimetres.": "1 મીટર એટલે 100 સેન્ટીમીટર.",
    "A 7 cm piece has no tens, so the tens place needs a zero.": "7 સેન્ટીમીટરના ટુકડામાં દશક નથી, તો દશકના સ્થાને શૂન્ય લખો.",
    "Five rods make 500 cm, and the 7 cm piece adds only 7 more.": "પાંચ સળિયાના 500 સેન્ટીમીટર થાય અને 7 સેન્ટીમીટરનો ટુકડો ફક્ત 7 વધુ ઉમેરે છે.",
    "Right, 507 cm, with a zero in the tens place.": "સાચું, નળી 507 સેન્ટીમીટર લાંબી છે અને દશકમાં શૂન્ય છે.",
    "A school wall is 13 m long; what is that in centimetres?": "શાળાની દીવાલની લંબાઈ 13 મીટરને સેન્ટીમીટરમાં બદલો.",
    "13 m in cm?": "13 મીમાં કેટલા સેમી?",
    "The wall has no short piece; every rod is a whole metre.": "દીવાલમાં કોઈ નાનો ટુકડો નથી, દરેક સળિયો પૂરો એક મીટર છે.",
    "Count the rods in centimetres: 100 cm, 200 cm, 300 cm and on.": "સળિયાને સો-સો સેન્ટીમીટરમાં ગણો: 100, 200, 300 અને આગળ.",
    "Ten rods make 1,000 cm; add 100 cm for each extra rod.": "દસ સળિયાના 1,000 સેન્ટીમીટર થાય, પછી દરેક સળિયા પર 100 સેન્ટીમીટર ઉમેરતા જાઓ.",
    "Well done, the wall is 1,300 cm long.": "શાબાશ, દીવાલ 1,300 સેન્ટીમીટર લાંબી છે.",
    "Centimetres into metres: divide by 100": "સેન્ટીમીટરમાંથી મીટર: 100 વડે ભાગો",
    "Tap Cut to cut the ribbon into pieces of 1 m.": "કાપો બટનને સ્પર્શ કરો અને રિબનને 1 મીટરના ટુકડામાં કાપો.",
    "Cut sits under the ribbon.": "કાપો બટન રિબનની નીચે છે.",
    "Each 100 cm makes one metre piece.": "દરેક 100 સેન્ટીમીટરથી એક મીટરનો ટુકડો બને છે.",
    "Metres first, then the centimetres that do not make a metre.": "પહેલાં મીટર, પછી બાકી રહેલા સેન્ટીમીટર.",
    "Divide by 100 for metres; the last two digits are the cm.": "સેન્ટીમીટરના મીટર કરવા 100 વડે ભાગો, છેલ્લા બે અંક સેન્ટીમીટર છે.",
    "You learned: 100 cm make 1 m, and the last two digits are the cm": "તમે શીખ્યા: 100 સેમીનો 1 મી થાય, અને છેલ્લા બે અંક સેમી છે",
    "How many metres and centimetres is a ribbon of 834 cm on a reel?": "રીલ પરની 834 સેન્ટીમીટરની રિબન કેટલા મીટર અને સેન્ટીમીટરની છે?",
    "834 cm in m and cm?": "834 સેમીમાં કેટલા મી અને સેમી?",
    "Only the 1 m pieces count as metres.": "ફક્ત 1 મીટરના ટુકડા જ મીટર ગણાય છે.",
    "The piece left over is shorter than 1 m, so it stays in centimetres.": "બાકી રહેલો ટુકડો 1 મીટરથી નાનો છે, તો તે સેન્ટીમીટરમાં જ રહે છે.",
    "The last two digits of 834 are the cm left over.": "834 ના છેલ્લા બે અંક બાકી સેન્ટીમીટર છે.",
    "Yes, 834 cm is 8 m 34 cm.": "હા, 834 સેન્ટીમીટર એટલે 8 મીટર 34 સેન્ટીમીટર.",
    "metres": "મીટર",
    "m": "મી",
    "left over": "બાકી",
    "cm": "સેમી",
    "Write a ribbon of 605 cm in metres and centimetres.": "605 સેન્ટીમીટરની રિબનની લંબાઈ મીટર અને સેન્ટીમીટરમાં લખો.",
    "605 cm in m and cm?": "605 સેમીમાં કેટલા મી અને સેમી?",
    "Count the 1 m pieces, then look at the tiny piece left.": "1 મીટરના ટુકડા ગણો, પછી બાકી રહેલો નાનો ટુકડો જુઓ.",
    "The tiny end piece is not a whole metre; leave it out of the metres.": "છેલ્લો નાનો ટુકડો પૂરો મીટર નથી, તેને મીટરમાં ન ગણો.",
    "Take away the 1 m pieces; the rest is under 100 cm.": "1 મીટરના ટુકડા કાઢી નાખો, 100 થી ઓછા સેન્ટીમીટર બાકી રહે છે.",
    "Right, 6 m 5 cm is the ribbon's length.": "સાચું, 6 મીટર 5 સેન્ટીમીટર રિબનની લંબાઈ છે.",
    "Change a ribbon as long as a train coach, 1,867 cm, into m and cm.": "રેલના ડબ્બા જેટલી લાંબી 1,867 સેન્ટીમીટરની રિબનને મીટર અને સેન્ટીમીટરમાં બદલો.",
    "1,867 cm in m and cm?": "1,867 સેમીમાં કેટલા મી અને સેમી?",
    "Count the whole 1 m pieces, row by row.": "આખા 1 મીટરના ટુકડા ગણો, એક એક હરોળ કરીને.",
    "Count the rows of 5 m first, then the single pieces.": "પહેલાં 5 મીટરની હરોળ ગણો, પછી તેના પછીના એકલા ટુકડા.",
    "Cover the last two digits of 1,867; the digits before them are the metres.": "1,867 ના છેલ્લા બે અંક ઢાંકી દો, તેની પહેલાંના અંક મીટર છે.",
    "Well done, 1,867 cm makes 18 m 67 cm.": "શાબાશ, 1,867 સેન્ટીમીટરમાંથી 18 મીટર 67 સેન્ટીમીટર બને છે.",
    "Kilometres and metres: use 1,000": "કિલોમીટર અને મીટર: 1,000 વાપરો",
    "Tap Slide to move the post along the road, 1 km a step.": "સરકાવો બટનને સ્પર્શ કરો, થાંભલો દર વખતે 1 કિલોમીટર ચાલશે.",
    "Slide sits under the road.": "સરકાવો બટન રસ્તાની નીચે છે.",
    "Slide one kilometre at a time and count the stops.": "એક વારમાં એક કિલોમીટર સરકાવો અને પડાવ ગણો.",
    "Kilometres to metres is times 1,000, and back is divided by 1,000.": "કિલોમીટરથી મીટરમાં 1,000 વડે ગુણાકાર અને પાછા 1,000 વડે ભાગાકાર.",
    "Multiply km by 1,000 for metres and divide by 1,000 for kilometres.": "કિલોમીટરના મીટર કરવા 1,000 વડે ગુણો, મીટરના કિલોમીટર કરવા 1,000 વડે ભાગો.",
    "You learned: 1 km is 1,000 m, so multiply or divide by 1,000": "તમે શીખ્યા: 1 કિમીમાં 1,000 મી હોય છે, તેથી 1,000 વડે ગુણો અથવા ભાગો",
    "How many metres long is a road of 6 km 275 m from the village to the river?": "6 કિલોમીટર 275 મીટરનો રસ્તો કેટલા મીટર લાંબો છે?",
    "6 km 275 m in m?": "6 કિમી 275 મીમાં કેટલા મી?",
    "One kilometre is 1,000 m.": "એક કિલોમીટર એટલે 1,000 મીટર.",
    "Change each kilometre into 1,000 m, then add the rest.": "બાકીનું ઉમેરતાં પહેલાં દરેક કિલોમીટરને 1,000 મીટરમાં બદલો.",
    "6 km is 6,000 m, so add the 275 m to it.": "6 કિલોમીટરના 6,000 મીટર થાય, તો તેમાં 275 મીટર ઉમેરો.",
    "Yes, 6 km 275 m is 6,275 m.": "હા, 6 કિલોમીટર 275 મીટર એટલે 6,275 મીટર.",
    "In kilometres, how long is a train track of 3,000 m?": "3,000 મીટર લાંબી રેલવે લાઇનની લંબાઈ કિલોમીટરમાં લખો.",
    "3,000 m in km?": "3,000 મીમાં કેટલા કિમી?",
    "Every 1,000 m along the road makes one kilometre.": "રસ્તા પર દર 1,000 મીટરથી એક કિલોમીટર બને છે.",
    "Count the posts the slide planted; each stands 1 km further on.": "લાગેલા થાંભલા ગણો, દરેક 1 કિલોમીટર આગળ છે.",
    "Divide the metres by 1,000 to find the kilometres.": "કિલોમીટર મેળવવા મીટરને 1,000 વડે ભાગો.",
    "Right, 3 km of track.": "સાચું, રેલવે લાઇન 3 કિલોમીટર લાંબી છે.",
    "Change 7,461 m of cycle path into kilometres and metres.": "7,461 મીટર લાંબા સાઇકલ માર્ગને કિલોમીટર અને મીટરમાં બદલો.",
    "7,461 m in km and m?": "7,461 મીમાં કેટલા કિમી અને મી?",
    "Count whole kilometres first, 1,000 m for each.": "પહેલાં આખા કિલોમીટર ગણો, દરેકના 1,000 મીટર.",
    "The part of the road after the last post is under 1 km, so it stays in metres.": "છેલ્લા થાંભલા પછીનો ભાગ 1 કિલોમીટરથી ઓછો છે, તો તે મીટરમાં રહે છે.",
    "The last three digits are the metres left over.": "છેલ્લા ત્રણ અંક બાકી રહેલા મીટર છે.",
    "Well done, 7,461 m makes 7 km 461 m.": "શાબાશ, 7,461 મીટરમાંથી 7 કિલોમીટર 461 મીટર બને છે.",
    "kilometres": "કિલોમીટર",
    "km": "કિમી",
    "Adding and subtracting lengths": "લંબાઈનો સરવાળો અને બાદબાકી",
    "Tap the cm column to add the centimetres first.": "સેન્ટીમીટરની કૉલમને સ્પર્શ કરો, પહેલાં તેનો સરવાળો કરો.",
    "The cm column is the right half of the board.": "સેન્ટીમીટરની કૉલમ બોર્ડનો જમણો અડધો ભાગ છે.",
    "That is more than 100 cm, so tap Carry.": "આ 100 સેન્ટીમીટરથી વધુ છે, તો વદી બટનને સ્પર્શ કરો.",
    "The Carry key sits under the board.": "વદી બટન બોર્ડની નીચે છે.",
    "Start with the small unit in every sum.": "દરેક દાખલામાં નાના એકમથી શરૂ કરો.",
    "Carry or borrow where the cm column needs it.": "સેન્ટીમીટરની કૉલમમાં જરૂર હોય ત્યાં વદી કે ઉછીના લો.",
    "Carry 100 cm as 1 m, or borrow 1 m as 100 cm.": "100 સેન્ટીમીટરનો 1 મીટર વદી લો, કે 1 મીટરના 100 સેન્ટીમીટર ઉછીના લો.",
    "You learned: add and subtract lengths in m and cm columns, cm first": "તમે શીખ્યા: પહેલાં સેમી કૉલમ, પછી મી કૉલમ ઉમેરો કે બાદ કરો",
    "2 m 74 cm and 1 m 69 cm were cut from one rope; how long was the rope?": "ટુકડા 2 મીટર 74 સેન્ટીમીટર અને 1 મીટર 69 સેન્ટીમીટર, દોરડું કેટલું લાંબું હતું?",
    "2 m 74 cm + 1 m 69 cm": "2 મી 74 સેમી + 1 મી 69 સેમી",
    "100 cm or more cannot stay in the cm column.": "સેન્ટીમીટરની કૉલમમાં 100 સેન્ટીમીટર કે વધુ ન રહે.",
    "The carried 1 m joins the metres column too.": "વદીનો 1 મીટર, મીટરની કૉલમમાં પણ ઉમેરાય છે.",
    "Take 100 cm off the centimetres total, then add 1 m to the metres.": "સેન્ટીમીટરના સરવાળામાંથી 100 સેન્ટીમીટર બાદ કરો, પછી મીટરમાં 1 મીટર ઉમેરો.",
    "Yes, 4 m 43 cm is the whole rope.": "હા, 4 મીટર 43 સેન્ટીમીટર એ આખું દોરડું છે.",
    "m column": "મી કૉલમ",
    "cm column": "સેમી કૉલમ",
    "How long are two ribbons of 3 m 45 cm and 2 m 55 cm laid end to end?": "બે રિબન 3 મીટર 45 સેન્ટીમીટર અને 2 મીટર 55 સેન્ટીમીટર, મળીને કેટલી લાંબી છે?",
    "3 m 45 cm + 2 m 55 cm": "3 મી 45 સેમી + 2 મી 55 સેમી",
    "Keep metres and centimetres in their own columns.": "મીટર અને સેન્ટીમીટરને પોતપોતાની કૉલમમાં રાખો.",
    "Count the metres again with the carried 1 m added.": "વદીનો 1 મીટર ઉમેરીને મીટર ફરી ગણો.",
    "45 cm and 55 cm fill a whole metre exactly.": "45 સેન્ટીમીટર અને 55 સેન્ટીમીટરથી બરાબર એક મીટર ભરાય છે.",
    "Yes, 6 m 0 cm, which is just 6 m.": "હા, 6 મીટર 0 સેન્ટીમીટર, એટલે બસ 6 મીટર.",
    "How much cloth is left when a tailor cuts 2 m 47 cm from 5 m 28 cm?": "દરજી 5 મીટર 28 સેન્ટીમીટરમાંથી 2 મીટર 47 સેન્ટીમીટર કાપે, તો કેટલું બચે?",
    "5 m 28 cm − 2 m 47 cm": "5 મી 28 સેમી − 2 મી 47 સેમી",
    "Look at the top row after the borrow.": "ઉછીના પછી ઉપરની હરોળ જુઓ.",
    "Subtract each column on its own, centimetres first.": "દરેક કૉલમ અલગ-અલગ બાદ કરો, પહેલાં સેન્ટીમીટર.",
    "Take 47 cm from 128 cm, then take 2 m from 4 m.": "128 માંથી 47 સેન્ટીમીટર બાદ કરો, પછી 4 માંથી 2 મીટર બાદ કરો.",
    "Yes, 2 m 81 cm of cloth is left.": "હા, 2 મીટર 81 સેન્ટીમીટર કાપડ બાકી છે.",
    "Break the rods, and then you can answer.": "પહેલાં સળિયા તોડો, પછી જવાબ આપો.",
    "The rods are still whole, so tap Break first.": "સળિયા હજી આખા છે, તો પહેલાં તોડો બટનને સ્પર્શ કરો.",
    "Cut the ribbon, and then you can answer.": "પહેલાં રિબન કાપો, પછી જવાબ આપો.",
    "The ribbon is still in one piece, so tap Cut first.": "રિબન હજી એક જ ટુકડામાં છે, તો પહેલાં કાપો બટનને સ્પર્શ કરો.",
    "Slide the post along the road before you answer.": "પહેલાં થાંભલો સરકાવો, પછી જવાબ આપો.",
    "The post has not moved yet, so tap Slide first.": "થાંભલો હજી ખસ્યો નથી, તો પહેલાં સરકાવો બટનને સ્પર્શ કરો.",
    "Look at the cm column, then tap Carry or Borrow.": "સેન્ટીમીટરની કૉલમ જુઓ, પછી વદી કે ઉછીના બટનને સ્પર્શ કરો.",
    "Choose Carry or Borrow for the cm column first.": "પહેલાં સેન્ટીમીટરની કૉલમ માટે વદી કે ઉછીના પસંદ કરો.",
    "Check the cm column again before you choose.": "પસંદ કરતાં પહેલાં સેન્ટીમીટરની કૉલમ ફરી જુઓ.",
    "Look at the cm column: do the centimetres fit?": "સેન્ટીમીટરની કૉલમ જુઓ, શું સેન્ટીમીટર તેમાં સમાય છે?",
    "Break": "તોડો",
    "Cut": "કાપો",
    "Slide": "સરકાવો",
    "Carry": "વદી",
    "Borrow": "ઉછીના",
    "Left": "બાકી",
    "Given": "આપેલું",
    "Answer": "જવાબ",
    "How many centimetres are in a metre rod?": "એક મીટરના સળિયામાં કેટલા સેન્ટીમીટર હોય છે?",
    "The Break key comes before the answer.": "જવાબ પહેલાં તોડો બટનને સ્પર્શ કરો.",
    "The Cut key comes before the answer.": "જવાબ પહેલાં કાપો બટનને સ્પર્શ કરો.",
    "The Slide key comes before the answer.": "જવાબ પહેલાં સરકાવો બટનને સ્પર્શ કરો.",
    "Carry or Borrow comes before the answer.": "પહેલાં વદી કે ઉછીના પસંદ કરો.",
    "Think about the cm column once more.": "સેન્ટીમીટરની કૉલમ વિશે ફરી એક વાર વિચારો.",
    "Fill both boxes.": "બંને ખાનાં ભરો.",
    "Free play: break rods, cut ribbons, slide posts, carry and borrow centimetres.": "મુક્ત રમત: સળિયો તોડો, રિબન કાપો, થાંભલો સરકાવો, વદી અને ઉછીના લો.",
  },
};

/* One entry per phase = one mount. Every phase opens on guide steps that work a WARM-UP (`warm`, never one of the
   phase's answers); each question then has its own act (`kind` picks the picture and the act). Every item carries
   its own rungs 2 and 3 (`ladder`), a one-sentence `win` line (said by Work at the win: TR by hand) and `nm`, the
   misconception's answer (nearMiss). */
const PHASES = [
  {
    n: 1,
    concept: "Metres into centimetres: multiply by 100",
    conceptId: "M1.S1.T3.C11", objectiveIds: ["O3"],
    says: ["Break the metres into centimetres. Then add the rest."],
    steps: [{ say: "Tap Break to break each metre rod into centimetres.", on: "break", hint: "Break sits under the rods." }],
    warm: { kind: "m2cm", m: 2, cm: 15 },
    stepHold: 2000,
    ladder: ["Break one metre at a time and count the lots of 100.", "Write the hundreds from the rods, then the centimetres from the piece."],
    closing: "To change metres into centimetres multiply by 100 and add the centimetres.",
    learned: "You learned: 1 m is 100 cm, so multiply metres by 100 for centimetres",
    traceback: "the broken rods are counted again in hundreds of centimetres and the short piece is lit in amber; the count stops before the total, which the child writes",
    items: [
      /* learn LC1: answer in the plan = 637 cm. Plan: A kite string is 6 m 37 cm long. How many centimetres is that? */
      { qid: "M1.S1.T3.C11:LC1", kind: "m2cm", m: 6, cm: 37, answer: 637, nm: "43",
        say: "How many centimetres long is a kite string of 6 m 37 cm?", ask: "6 m 37 cm in cm?",
        miss: "Change the metres into centimetres before you add the piece.",
        ladder: ["Count 100 cm for every rod, then add the short piece.", "Six rods make 600 cm, so add the 37 cm piece to that."],
        win: "Yes, 6 m 37 cm is 637 cm." },
      /* authored (the owner: a case with a zero, e.g. 5 m 7 cm; replaces practice 1, 3 m 29 cm, the same kind as LC1): 507 cm */
      { qid: null, kind: "m2cm", m: 5, cm: 7, answer: 507, nm: "57",
        say: "In centimetres, how long is a garden hose of 5 m 7 cm?", ask: "5 m 7 cm in cm?",
        miss: "The metres make hundreds of centimetres.",
        ladder: ["A 7 cm piece has no tens, so the tens place needs a zero.", "Five rods make 500 cm, and the 7 cm piece adds only 7 more."],
        win: "Right, 507 cm, with a zero in the tens place." },
      /* practice 5: answer in the plan = 1300 cm, because 13 m is thirteen hundreds of centimetres. Plan: A school wall is 13 m long. */
      { qid: "M1.S1.T3.C11:5", kind: "m2cm", m: 13, cm: 0, answer: 1300, nm: "130",
        say: "A school wall is 13 m long; what is that in centimetres?", ask: "13 m in cm?",
        miss: "The wall has no short piece; every rod is a whole metre.",
        ladder: ["Count the rods in centimetres: 100 cm, 200 cm, 300 cm and on.", "Ten rods make 1,000 cm; add 100 cm for each extra rod."],
        win: "Well done, the wall is 1,300 cm long." },
    ],
  },
  {
    n: 2,
    concept: "Centimetres into metres: divide by 100",
    conceptId: "M1.S1.T3.C12", objectiveIds: ["O3"],
    says: ["Gather the centimetres into metres. What is left over?"],
    steps: [{ say: "Tap Cut to cut the ribbon into pieces of 1 m.", on: "cut", hint: "Cut sits under the ribbon." }],
    warm: { kind: "cm2m", total: 250 },
    stepHold: 2000,
    ladder: ["Each 100 cm makes one metre piece.", "Metres first, then the centimetres that do not make a metre."],
    closing: "Divide by 100 for metres; the last two digits are the cm.",
    learned: "You learned: 100 cm make 1 m, and the last two digits are the cm",
    traceback: "the 1 m pieces are counted again one by one, stopping before the last one, and the piece left over is lit in amber",
    items: [
      /* learn LC2: answer in the plan = 8 m 34 cm. Plan: A ribbon on a reel is 834 cm long. */
      { qid: "M1.S1.T3.C12:LC2", kind: "cm2m", total: 834, parts: [{ label: "metres", unit: "m" }, { label: "left over", unit: "cm" }], answer: [8, 34], nm: "83|4",
        say: "How many metres and centimetres is a ribbon of 834 cm on a reel?", ask: "834 cm in m and cm?",
        miss: "Only the 1 m pieces count as metres.",
        ladder: ["The piece left over is shorter than 1 m, so it stays in centimetres.", "The last two digits of 834 are the cm left over."],
        win: "Yes, 834 cm is 8 m 34 cm." },
      /* authored (a zero in the tens; replaces practice 2, 917 cm, the same kind as LC2): 6 m 5 cm */
      { qid: null, kind: "cm2m", total: 605, parts: [{ label: "metres", unit: "m" }, { label: "left over", unit: "cm" }], answer: [6, 5], nm: "60|5",
        say: "Write a ribbon of 605 cm in metres and centimetres.", ask: "605 cm in m and cm?",
        miss: "Count the 1 m pieces, then look at the tiny piece left.",
        ladder: ["The tiny end piece is not a whole metre; leave it out of the metres.", "Take away the 1 m pieces; the rest is under 100 cm."],
        win: "Right, 6 m 5 cm is the ribbon's length." },
      /* practice 6: answer in the plan = 18 m 67 cm. Plan: A train coach is 1867 cm long. */
      { qid: "M1.S1.T3.C12:6", kind: "cm2m", total: 1867, parts: [{ label: "metres", unit: "m" }, { label: "left over", unit: "cm" }], answer: [18, 67], nm: "186|7",
        say: "Change a ribbon as long as a train coach, 1,867 cm, into m and cm.", ask: "1,867 cm in m and cm?",
        miss: "Count the whole 1 m pieces, row by row.",
        ladder: ["Count the rows of 5 m first, then the single pieces.", "Cover the last two digits of 1,867; the digits before them are the metres."],
        win: "Well done, 1,867 cm makes 18 m 67 cm." },
    ],
  },
  {
    n: 3,
    concept: "Kilometres and metres: use 1,000",
    conceptId: "M1.S1.T3.C13", objectiveIds: ["O3"],
    says: ["Slide the post along the road. How many metres is each step?"],
    steps: [{ say: "Tap Slide to move the post along the road, 1 km a step.", on: "slide", hint: "Slide sits under the road." }],
    warm: { kind: "km2m", km: 2, m: 500 },
    stepHold: 2000,
    ladder: ["Slide one kilometre at a time and count the stops.", "Kilometres to metres is times 1,000, and back is divided by 1,000."],
    closing: "Multiply km by 1,000 for metres and divide by 1,000 for kilometres.",
    learned: "You learned: 1 km is 1,000 m, so multiply or divide by 1,000",
    traceback: "the posts are counted again in kilometres along the road and the stretch left over is lit in amber; the count stops before the answer",
    items: [
      /* learn LC3: answer in the plan = 6275 m. Plan: A road from the village to the river is 6 km 275 m long. */
      { qid: "M1.S1.T3.C13:LC3", kind: "km2m", km: 6, m: 275, answer: 6275, nm: "875",
        say: "How many metres long is a road of 6 km 275 m from the village to the river?", ask: "6 km 275 m in m?",
        miss: "One kilometre is 1,000 m.",
        ladder: ["Change each kilometre into 1,000 m, then add the rest.", "6 km is 6,000 m, so add the 275 m to it."],
        win: "Yes, 6 km 275 m is 6,275 m." },
      /* practice 3: answer in the plan = 3 km. Plan: A train track is 3000 m long. */
      { qid: "M1.S1.T3.C13:3", kind: "m2km", total: 3000, answer: 3, nm: "30",
        say: "In kilometres, how long is a train track of 3,000 m?", ask: "3,000 m in km?",
        miss: "Every 1,000 m along the road makes one kilometre.",
        ladder: ["Count the posts the slide planted; each stands 1 km further on.", "Divide the metres by 1,000 to find the kilometres."],
        win: "Right, 3 km of track." },
      /* practice 7: answer in the plan = 7 km 461 m. Plan: A cycle path is 7461 m long. */
      { qid: "M1.S1.T3.C13:7", kind: "m2km", total: 7461, parts: [{ label: "kilometres", unit: "km" }, { label: "left over", unit: "m" }], answer: [7, 461], nm: "74|61",
        say: "Change 7,461 m of cycle path into kilometres and metres.", ask: "7,461 m in km and m?",
        miss: "Count whole kilometres first, 1,000 m for each.",
        ladder: ["The part of the road after the last post is under 1 km, so it stays in metres.", "The last three digits are the metres left over."],
        win: "Well done, 7,461 m makes 7 km 461 m." },
    ],
  },
  {
    n: 4,
    concept: "Adding and subtracting lengths",
    conceptId: "M1.S1.T3.C14", objectiveIds: ["O4"],
    says: ["Write the lengths in two columns. Start with the small unit."],
    steps: [
      { say: "Tap the cm column to add the centimetres first.", on: "cm", hint: "The cm column is the right half of the board." },
      { say: "That is more than 100 cm, so tap Carry.", on: "carry", hint: "The Carry key sits under the board." },
    ],
    warm: { kind: "add", a: [1, 60], b: [1, 50] },
    stepHold: 2200,
    ladder: ["Start with the small unit in every sum.", "Carry or borrow where the cm column needs it."],
    closing: "Carry 100 cm as 1 m, or borrow 1 m as 100 cm.",
    learned: "You learned: add and subtract lengths in m and cm columns, cm first",
    traceback: "the centimetres column is worked again and the carry or the borrow is shown again; the answer row is left for the child",
    items: [
      /* learn LC4: answer in the plan = 4 m 43 cm. Plan: A rope is cut in two pieces, 2 m 74 cm and 1 m 69 cm. How long was the rope? */
      { qid: "M1.S1.T3.C14:LC4", kind: "add", a: [2, 74], b: [1, 69], parts: [{ label: "m column", unit: "m" }, { label: "cm column", unit: "cm" }], answer: [4, 43], nm: "3|143",
        say: "2 m 74 cm and 1 m 69 cm were cut from one rope; how long was the rope?", ask: "2 m 74 cm + 1 m 69 cm",
        miss: "100 cm or more cannot stay in the cm column.",
        ladder: ["The carried 1 m joins the metres column too.", "Take 100 cm off the centimetres total, then add 1 m to the metres."],
        win: "Yes, 4 m 43 cm is the whole rope." },
      /* authored (the owner: separate m and cm columns and a zero case; replaces practice 4, 21 km + 34 km, which has no cm column): 6 m 0 cm */
      { qid: null, kind: "add", a: [3, 45], b: [2, 55], parts: [{ label: "m column", unit: "m" }, { label: "cm column", unit: "cm" }], answer: [6, 0], nm: "5|100",
        say: "How long are two ribbons of 3 m 45 cm and 2 m 55 cm laid end to end?", ask: "3 m 45 cm + 2 m 55 cm",
        miss: "Keep metres and centimetres in their own columns.",
        ladder: ["Count the metres again with the carried 1 m added.", "45 cm and 55 cm fill a whole metre exactly."],
        win: "Yes, 6 m 0 cm, which is just 6 m." },
      /* practice 8: answer in the plan = 2 m 81 cm (5 m 28 cm is 4 m 128 cm after borrowing a metre). Plan: a tailor cuts 2 m 47 cm from 5 m 28 cm. */
      { qid: "M1.S1.T3.C14:8", kind: "sub", a: [5, 28], b: [2, 47], parts: [{ label: "m column", unit: "m" }, { label: "cm column", unit: "cm" }], answer: [2, 81], nm: "3|19",
        say: "How much cloth is left when a tailor cuts 2 m 47 cm from 5 m 28 cm?", ask: "5 m 28 cm − 2 m 47 cm",
        miss: "Look at the top row after the borrow.",
        ladder: ["Subtract each column on its own, centimetres first.", "Take 47 cm from 128 cm, then take 2 m from 4 m."],
        win: "Yes, 2 m 81 cm of cloth is left." },
    ],
  },
];

/* free play: a new example each time a key is tapped (none of them is a question's answer) */
const LC_FREE: any = {
  break: [{ kind: "m2cm", m: 3, cm: 25 }, { kind: "m2cm", m: 4, cm: 60 }, { kind: "m2cm", m: 7, cm: 8 }, { kind: "m2cm", m: 9, cm: 0 }],
  cut: [{ kind: "cm2m", total: 456 }, { kind: "cm2m", total: 1203 }, { kind: "cm2m", total: 990 }],
  slide: [{ kind: "km2m", km: 2, m: 340 }, { kind: "m2km", total: 5000 }, { kind: "m2km", total: 4706 }],
  carry: [{ kind: "add", a: [1, 85], b: [2, 40] }, { kind: "add", a: [4, 36], b: [2, 64] }, { kind: "add", a: [3, 58], b: [1, 77] }],
  borrow: [{ kind: "sub", a: [6, 15], b: [3, 50] }, { kind: "sub", a: [8, 20], b: [2, 75] }, { kind: "sub", a: [4, 5], b: [1, 40] }],
};

/* The sizes the working area uses (they go into the sidecar too). */
const LC_M = { rodLen: 420, rodH: 36, ribM: 160, roadKm: 104, roadN: 8 };
const MODEL = { ...LC_M, free: LC_FREE, units: { m: 100, km: 1000 } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route (digit strings and the column method), sharing no code with judge */
const lcOracle = (it: any) => {
  if (it.kind === "m2cm") return [Number(String(it.m) + String(it.cm).padStart(2, "0"))];
  if (it.kind === "km2m") return [Number(String(it.km) + String(it.m).padStart(3, "0"))];
  if (it.kind === "cm2m") { const s = String(it.total); return [Number(s.slice(0, -2) || "0"), Number(s.slice(-2))]; }
  if (it.kind === "m2km") { const s = String(it.total), r = Number(s.slice(-3)); return r ? [Number(s.slice(0, -3)), r] : [Number(s.slice(0, -3))]; }
  const c = it.kind === "add" ? it.a[1] + it.b[1] : it.a[1] - it.b[1];
  const sw = it.kind === "add" ? (c >= 100 ? 1 : 0) : (c < 0 ? -1 : 0);
  return [it.kind === "add" ? it.a[0] + it.b[0] + sw : it.a[0] - it.b[0] + sw, c - 100 * sw];
};
const oracle = () => PHASES.every((p: any) => {
  const w = p.warm ? lcOracle(p.warm).join("|") : "";
  return p.items.length === 3 && p.items.every((it: any) => {
    const o = lcOracle(it).join("|"), a = (Array.isArray(it.answer) ? it.answer : [it.answer]).join("|");
    return o === a && o !== w && String(it.nm) !== a;
  });
});
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => item.nm;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  const a = Array.isArray(item.answer) ? item.answer : [item.answer];
  return (a.length === 1 ? a : a.filter((x: number) => x >= 10)).flatMap((x: number) => [String(x), indian(x), words(x)]);
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
/* the dev driver: a guide step is performed; at a question the act is done at once, then the answer is sent */
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (HOOK.done) HOOK.done();
  return T.submit(item.answer);
};
/* every answer is typed */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check(): at a question whose act is not done, the act is done at once (and the gate released), then Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* the slot shows the unit after a typed single number ("637 cm"); a two-box answer carries its units in `parts` */
let LC_UNIT = "";
/* Indian commas from 1,000 on what the child typed (a number with no leading zero), then the unit */
const lcCommas = (v: any) => (/^[1-9]\d{3,}$/.test(String(v)) ? indian(Number(v)) : v);
const lcFormat = (v: any, j: any, o: any) => (j === undefined && LC_UNIT && v !== "" && v !== null && v !== undefined
  ? `${lcCommas(v)} ${o && o.tx ? o.tx(LC_UNIT) : LC_UNIT}` : lcCommas(v));

/* ── words and numbers the picture prints ── */
const lcGiven = (it: any, tx: any) => {
  if (it.kind === "m2cm") return it.cm ? `${it.m} ${tx("m")} ${it.cm} ${tx("cm")}` : `${it.m} ${tx("m")}`;
  if (it.kind === "cm2m") return `${indian(it.total)} ${tx("cm")}`;
  if (it.kind === "km2m") return `${it.km} ${tx("km")} ${it.m} ${tx("m")}`;
  if (it.kind === "m2km") return `${indian(it.total)} ${tx("m")}`;
  return `${it.a[0]} ${tx("m")} ${it.a[1]} ${tx("cm")} ${it.kind === "add" ? "+" : "−"} ${it.b[0]} ${tx("m")} ${it.b[1]} ${tx("cm")}`;
};
/* the answer in words of units: the item's own, or the value the child sent */
const lcAnsStr = (it: any, tx: any, v?: any) => {
  const a = v === undefined || v === null ? (Array.isArray(it.answer) ? it.answer : it.answer === undefined ? lcOracle(it) : [it.answer])
    : it.parts ? slotPartsOf(v, it.parts.length).map((x: any) => Number(x)) : [Number(leadNumber(String(v)))];
  if (it.kind === "m2cm") return `${indian(a[0])} ${tx("cm")}`;
  if (it.kind === "km2m") return `${indian(a[0])} ${tx("m")}`;
  if (it.kind === "m2km") return a.length > 1 ? `${a[0]} ${tx("km")} ${a[1]} ${tx("m")}` : `${a[0]} ${tx("km")}`;
  return `${a[0]} ${tx("m")} ${a[1]} ${tx("cm")}`;
};
const lcUnit = (it: any) => (it.kind === "m2cm" ? "cm" : it.kind === "km2m" ? "m" : it.kind === "m2km" ? "km" : "");
const lcActName = (it: any) => (it.kind === "m2cm" ? "break" : it.kind === "cm2m" ? "cut" : it.kind === "add" ? "carry" : it.kind === "sub" ? "borrow" : "slide");
const LC_KEYS: any = { break: "Break", cut: "Cut", slide: "Slide", carry: "Carry", borrow: "Borrow" };
/* the steps of a correction, one step short of the answer */
const lcTbN = (it: any) => (it.kind === "m2cm" ? (it.cm > 0 ? it.m + 1 : it.m - 1)
  : it.kind === "cm2m" ? Math.floor(it.total / 100) - 1 + (it.total % 100 > 0 ? 1 : 0)
  : it.kind === "km2m" ? it.km - 1 + (it.m > 0 ? 1 : 0)
  : it.kind === "m2km" ? Math.floor(it.total / 1000) - 1 + (it.total % 1000 > 0 ? 1 : 0) : 3);
/* the nudge while the Answer key waits for the act (literal lines, so tr-coverage lists them) */
/* two forms of each, alternating question by question, so a phase never shows one line three times; in phase 4 the
   nudge names both keys, never which one is right */
function lcNudge(api: any, act: string, f: number) {
  if (act === "break") { if (f === 1) api.say("Break the rods, and then you can answer."); else if (f === 2) api.say("The Break key comes before the answer."); else api.say("The rods are still whole, so tap Break first."); }
  else if (act === "cut") { if (f === 1) api.say("Cut the ribbon, and then you can answer."); else if (f === 2) api.say("The Cut key comes before the answer."); else api.say("The ribbon is still in one piece, so tap Cut first."); }
  else if (act === "slide") { if (f === 1) api.say("Slide the post along the road before you answer."); else if (f === 2) api.say("The Slide key comes before the answer."); else api.say("The post has not moved yet, so tap Slide first."); }
  else if (f === 1) api.say("Look at the cm column, then tap Carry or Borrow.");
  else if (f === 2) api.say("Carry or Borrow comes before the answer.");
  else api.say("Choose Carry or Borrow for the cm column first.");
}
/* phase 4: the key that does not fit this sum (no try is lost, the right key is never named); three forms, rotating */
function lcWrongKey(api: any, f: number) {
  if (f === 1) api.say("Check the cm column again before you choose.");
  else if (f === 2) api.say("Think about the cm column once more.");
  else api.say("Look at the cm column: do the centimetres fit?");
}
const lcFocusAnswer = () => setTimeout(() => {
  try {
    const a: any = document.querySelector('[data-zone="ask"] [data-control="answer-open"]');
    const f: any = document.activeElement;
    if (a && (!f || f === document.body || (f.closest && f.closest('[data-zone="work"]')))) a.focus();
  } catch (e) { /* nothing to focus */ }
}, 80);

/* ── geometry: ONE function per picture, used by the drawing AND by the act (scene units: 900 wide, 520 tall) ── */
/* phase 1: metre rods in two columns, the short piece after them */
function lcRods(it: any) {
  const L = LC_M.rodLen, m = it.m, cm = it.cm || 0, n = m + (cm > 0 ? 1 : 0), rows = Math.ceil(n / 2);
  /* fewer rods are drawn TALLER (px per metre stays fixed): 4 rows or fewer 64 tall, 5 rows 50, 6 or 7 rows 30 with no chip on
     the rods (the unit fact above says 1 m = 100 cm), so a chip is never taller than its rod */
  const H = rows <= 4 ? 64 : rows <= 5 ? 50 : 30, pitch = rows <= 4 ? 82 : rows <= 5 ? 66 : 50;
  const y0 = 96 + Math.max(0, (338 - ((rows - 1) * pitch + H)) / 2);
  return Array.from({ length: n }, (_, i) => ({ i, x: 20 + (i % 2) * 450, y: Math.round(y0 + Math.floor(i / 2) * pitch), w: i < m ? L : (cm / 100) * L, h: H, piece: i >= m, chip: H >= 44 }));
}
/* phase 2: a ribbon in rows of 5 m; `cuts` boundaries (every 100 cm) cut so far part the pieces by 8 */
function lcRib(total: number, cuts: number) {
  const M = LC_M.ribM, full = Math.floor(total / 100), rem = total % 100, n = full + (rem > 0 ? 1 : 0), rows = Math.ceil(n / 5);
  /* one or two rows: a tall ribbon with a "1 m" chip above each piece; three or four rows: a thinner ribbon and no chips on the pieces
     (they are counted by eye), so nothing crowds; px per metre is the same in every row */
  const big = rows <= 2, rib = big ? 56 : 34, band = big ? 16 : 12, pitch = big ? 140 : 74, top = big ? 52 : 0;
  const y0 = 96 + Math.max(0, (338 - ((rows - 1) * pitch + top + rib + band)) / 2);
  const ps = Array.from({ length: n }, (_, k) => {
    const r = Math.floor(k / 5), c = k % 5;
    return { k, r, c, left: k >= full, x: 34 + c * M + 8 * Math.max(0, Math.min(c, cuts - r * 5)), cy: Math.round(y0 + r * pitch + 22), y: Math.round(y0 + r * pitch + top), w: k >= full ? (rem / 100) * M : M };
  });
  const snips = Array.from({ length: full }, (_, j) => {
    const b = j + 1, r = Math.floor((b - 1) / 5), c = b - r * 5;
    return { x: 34 + c * M + 8 * (c - 1) + 4, y: Math.round(y0 + r * pitch + top + (rib + band) / 2) };
  });
  return { ps, snips, full, rem, M, rib, band, big, rows, y0, pitch, top, cs: T.label };
}
/* phase 3: a road of 8 stretches of 1 km, a post at every km reached, a flag at the given distance */
function lcRoad(it: any) {
  const K = LC_M.roadKm, x0 = 34, y = 242, h = 56;
  const kms = it.kind === "km2m" ? it.km : Math.floor(it.total / 1000);
  const rest = it.kind === "km2m" ? it.m : it.total % 1000;
  return { K, x0, y, h, kms, rest, flagX: x0 + (kms + rest / 1000) * K, posts: Array.from({ length: kms }, (_, j) => ({ k: j + 1, x: x0 + (j + 1) * K })) };
}
/* phase 4: the column board */
/* every row leaves Hindi and Gujarati matras (1.09 em above the baseline) at least 6 clear of a ring, a box or a rule */
/* the board keeps 12 or more from the unit fact above it and from the keys' ring below it */
const LC_B = { x0: 110, x1: 790, y0: 94, y1: 410, sX: 160, mX: 340, cX: 630, div: 470, mL: 210, head: 152, headLine: 170, carryY: 132, cbX: 380, ccX: 670, aY: 217, bY: 284, line: 322, ansY: 365 };
/* centimetre (or 10 cm) ticks along a length, from its top edge down */
function lcTicks(x: number, y: number, w: number, perCm: number) {
  let d = "";
  const n = Math.round(w / perCm);
  for (let i = 1; i < n; i++) d += `M${(x + i * perCm).toFixed(1)} ${y}v${i % 10 === 0 ? 18 : i % 5 === 0 ? 13 : 8}`;
  return d;
}
const lcPostNode = () => (
  <g filter="url(#lc-shadow)">
    <rect x={-5} y={-50} width={10} height={50} rx={3} fill={LC_POST} stroke={LC_INK} strokeWidth={1.5} />
    <rect x={-5} y={-50} width={5} height={50} rx={2} fill="#FFFFFF" fillOpacity={0.25} />
    <rect x={-18} y={-60} width={36} height={18} rx={4} fill={LC_CREAM} stroke={LC_POST} strokeWidth={2.5} />
    <rect x={-16} y={-58} width={32} height={7} rx={3} fill="#FFFFFF" opacity={0.5} />
  </g>
);
const lcMiniRod = () => {
  const tk: string[] = [];
  for (let i = 1; i < 10; i++) tk.push(`M${(-46 + i * 9.2).toFixed(1)} -11v${i === 5 ? 10 : 6}`);
  return (
    <g filter="url(#lc-shadow)">
      <rect x={-46} y={-11} width={92} height={22} rx={5} fill={LC_WOOD} />
      <Skin name="rod" x={-46} y={-11} w={92} h={22} />
      <path d={tk.join(" ")} stroke={LC_INK} strokeWidth={1.5} opacity={0.8} />
      <rect x={-46} y={-11} width={92} height={22} rx={5} fill="none" stroke={LC_INK} strokeWidth={2} />
    </g>
  );
};
/* the act a key starts: { tool, moves, at, ... } in WORK coordinates (the scene sits ox to the right) */
function lcActOf(it: any, name: string, ox: number, onP: (i: number) => void) {
  if (name === "break") {
    const rods = lcRods(it).filter((r: any) => !r.piece);
    return { tool: "hand", moves: "tap", at: rods.map((r: any) => ({ x: ox + r.x + r.w / 2, y: r.y + r.h / 2 })), onPoint: onP };
  }
  if (name === "cut") { const R = lcRib(it.total, 0); return { tool: "scissors", moves: "snip", at: R.snips.map((s: any) => ({ x: ox + s.x, y: s.y })), onPoint: onP }; }
  if (name === "slide") {
    const R = lcRoad(it);
    return { tool: "hand", moves: "push", from: { x: ox + R.x0, y: R.y }, at: R.posts.map((p: any) => ({ x: ox + p.x, y: R.y })), hold: lcPostNode(), onPoint: onP };
  }
  if (name === "cm") return { tool: "hand", moves: "tap", at: [{ x: ox + LC_B.cX, y: LC_B.aY }, { x: ox + LC_B.cX, y: LC_B.bY }], onPoint: onP };
  if (name === "carry") return { tool: "hand", moves: "carry", from: { x: ox + LC_B.cX, y: LC_B.aY }, at: [{ x: ox + LC_B.cbX, y: LC_B.carryY }], hold: lcMiniRod(), onPoint: onP };
  if (name === "borrow") return { tool: "hand", moves: "carry", from: { x: ox + LC_B.mX, y: LC_B.aY }, at: [{ x: ox + LC_B.ccX, y: LC_B.carryY }], hold: lcMiniRod(), onPoint: onP };
  return null;
}
/* a reading on a cream chip, its role in the outline colour (called, never mounted) */
const lcChip = (k: string, cx: number, cy: number, s: string, col: string, strong = false, extra: any = {}, size = T.label) => {
  const w = lcTW(s, size) + 28, h = size + 14;
  return (
    <g key={k} filter="url(#lc-shadow)" {...extra}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h / 2} fill={strong ? tint(col, 0.78) : LC_CREAM} stroke={col} strokeWidth={strong ? 4 : 3} />
      <rect x={cx - w / 2 + 2} y={cy - h / 2 + 2} width={w - 4} height={h / 2} rx={h / 4} fill="#FFFFFF" fillOpacity={0.35} />
      <text x={cx} y={cy + size * 0.35} textAnchor="middle" fontSize={size} fontWeight={700} fill={LC_INK}>{s}</text>
    </g>
  );
};
/* a one-line tag: a role word (Given, Answer) and the value */
/* the role word gets a little slack (its letter spacing; Gujarati glyphs run wide); vs = the value size, smaller only when a top row would not fit */
const lcRoleW = (role: string) => (role ? lcTW(role, T.label) * 1.1 + 14 : 0);
const lcTagW = (role: string, value: string, vs = T.speech) => 20 + lcRoleW(role) + lcTW(value, vs) + 20;
const lcTag = (k: string, x: number, y: number, role: string, value: string, col: string, extra: any = {}, vs = T.speech) => {
  const w = lcTagW(role, value, vs), h = 72, rw = lcRoleW(role);
  return (
    <g key={k} filter="url(#lc-shadow)" {...extra}>
      <rect x={x} y={y} width={w} height={h} rx={18} fill={tint(col, 0.88)} stroke={col} strokeWidth={3.5} />
      <rect x={x + 3} y={y + 3} width={w - 6} height={26} rx={15} fill="#FFFFFF" fillOpacity={0.4} />
      {role ? <text x={x + 18} y={y + 47} fontSize={T.label} fontWeight={700} fill={lcInk(col)} letterSpacing="0.02em">{role}</text> : null}
      <text x={x + 20 + rw} y={y + 36 + vs * 0.36} fontSize={vs} fontWeight={700} fill={LC_INK}>{value}</text>
    </g>
  );
};
/* the unit fact in a vermilion ring: 1 m = 100 cm or 1 km = 1,000 m (three separate terms) */
const lcFactW = (a: string, b: string, fs = T.speech) => 18 + lcTW(a, fs) + 56 + lcTW(b, fs) + 10;
const lcFact = (k: string, x: number, y: number, a: string, b: string, fs = T.speech) => {
  const eq = x + 18 + lcTW(a, fs) + 28;   /* the "=" is the anchor: each side sits 28 from it, so an estimate never closes a gap */
  const w = lcFactW(a, b, fs);
  return (
    <g key={k} filter="url(#lc-shadow)">
      <rect x={x} y={y} width={w} height={72} rx={36} fill="#FFFFFF" stroke={LC_VERM} strokeWidth={3.5} />
      <text x={eq - 25} y={y + 36 + fs * 0.36} textAnchor="end" fontSize={fs} fontWeight={700} fill={lcInk(LC_VERM)}>{a}</text>
      <text x={eq} y={y + 36 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={lcInk(LC_VERM)}>=</text>
      <text x={eq + 25} y={y + 36 + fs * 0.36} textAnchor="start" fontSize={fs} fontWeight={700} fill={lcInk(LC_VERM)}>{b}</text>
    </g>
  );
};

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: the area is 1472 x 520 shut, 900 x 520 open (bigPad); the whole picture is laid out in a 900-wide scene
   that sits centred while the panel is shut (clear of box.key) and at the left while it is open. */
function Work({ n, item, index, stage, wrong, typed, part, api, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tb = useTimeline();
  const free = stage === "free";
  const P: any = PHASES[Math.max(0, Math.min(PHASES.length - 1, (n || 1) - 1))];
  const warm = !free && !!P.warm && (stage === "demo" || stage === "teach");
  const [fr, setFr] = useState({ mode: "break", k: 0, done: false, prog: 0, sum: false, tb: 0 } as any);
  const it: any = free ? LC_FREE[fr.mode][fr.k] : warm ? P.warm : item;
  /* the board belongs to an ENTRY of a question (PATTERNS 18): rebuilt whenever the question key changes */
  const base = `${n}|${free ? "free" : warm ? "warm" : "q" + index}`;
  const entry = useRef({ base: "", n: 0 });
  if (entry.current.base !== base) entry.current = { base, n: entry.current.n + 1 };
  const qk = base + "#" + entry.current.n;
  const qkRef = useRef(qk);
  qkRef.current = qk;
  const blank = (k: string) => ({ qk: k, done: false, prog: 0, sum: false, tb: 0 });
  const [raw, setRaw] = useState(() => blank(qk) as any);
  const S: any = free ? fr : raw.qk === qk ? raw : blank(qk);
  const put = (patch: any, key: string) => {
    if (free) { setFr((p: any) => ({ ...p, ...patch })); return; }
    if (key !== qkRef.current) return;
    setRaw((p: any) => ({ ...(p.qk === key ? p : blank(key)), ...patch }));
  };
  const asking = !free && !warm && stage === "ask";
  const actName = it ? lcActName(it) : "";
  const win = !free && !warm && !!item && (stage === "win" || (stage === "idle" && index === P.items.length - 1));
  LC_UNIT = !free && item && !item.parts ? lcUnit(item) : "";

  /* the room: a 900-wide scene, centred while the panel is shut, never under the key's corner */
  const bw = box ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : bw;
  /* the top row (Given tag and unit fact) can run longer in Hindi and Gujarati: the scene then sits further left, clear of the key */
  const kmTop = !!it && (it.kind === "km2m" || it.kind === "m2km"), boardTop = !!it && (it.kind === "add" || it.kind === "sub");
  /* the widest top row of the PHASE (its warm-up and its three questions), so the Given size stays steady within a phase */
  const topItems: any[] = free ? (it ? [it] : []) : [P.warm, ...P.items].filter(Boolean);
  const rowW = (q: any, s: number) => {
    if (q.kind === "add" || q.kind === "sub") return 0;
    const km = q.kind === "km2m" || q.kind === "m2km";
    return lcTagW(tx("Given"), lcGiven(q, tx), s) + 24 + lcFactW(km ? `1 ${tx("km")}` : `1 ${tx("m")}`, km ? `${indian(1000)} ${tx("m")}` : `100 ${tx("cm")}`, s);
  };
  const topRAt = (s: number) => Math.max(0, ...topItems.map((q: any) => rowW(q, s)));
  /* the top row's value size: 44, or 40 (then 32) when a translation would run past its room: up to the key's corner while the
     answer panel is shut (the scene then sits further left), up to the open panel's edge while it is open */
  const topL = Math.min(kx - 10, bw - 4);
  const ts = topRAt(T.speech) <= topL ? T.speech : topRAt(T.prompt) <= topL ? T.prompt : T.label;
  void kmTop; void boardTop;
  const ox = Math.round(Math.max(0, Math.min((bw - 900) / 2, kx - 10 - Math.max(886, it && !boardTop ? rowW(it, ts) : 886))));

  /* THE ANSWER GATE: locked while the act waits, in user mode after a real touch (PATTERNS 19) */
  const [tch, setTch] = useState(0);
  const touched = useRef(false);
  const lastN = useRef(n);
  if (lastN.current !== n) { lastN.current = n; touched.current = false; }
  void tch;
  const gateOn = asking && !S.done && touched.current;
  const gl = useRef(false);
  useEffect(() => {
    if (gateOn) { gl.current = true; api.lock(true); }
    else if (gl.current) { gl.current = false; api.lock(false); }
  }, [gateOn, qk]);
  useEffect(() => () => { if (gl.current) { gl.current = false; api.lock(false); } }, []);
  /* a real touch arms the gate; a tap on the dimmed Answer key, the Hint key or a digit while it is locked names the act */
  const stageRef = useRef(stage);
  stageRef.current = stage;
  /* the nudge rotates through three forms (from the question's own one, then on each further tap), so a phase never shows one line twice in a row */
  const nudgeN = useRef(0);
  const nudgeRef = useRef(null as any);
  nudgeRef.current = () => { lcNudge(api, actName, (index + nudgeN.current) % 3); nudgeN.current++; };
  const sayRef = useRef("");
  sayRef.current = item && item.say ? item.say : "";
  /* what the "Fill both boxes." line reads: the slot as typed, the box with the caret, the parts */
  const slotRef = useRef({ typed: "", part: 0, parts: 0, ask: false });
  slotRef.current = { typed: typed || "", part: part || 0, parts: item && item.parts ? item.parts.length : 0, ask: asking && !wrong };
  /* the nudge's timers, whether one is on the bubble now (the act that answers it says the question again), the question's start,
     a tap on the dimmed Answer key made while the act plays (queued: the keypad opens when the act ends) */
  const nt = useRef({ back: null as any, soon: null as any, shown: false, at: 0, queued: false, down: "", downLocked: false });
  useEffect(() => { const N = nt.current; N.shown = false; N.queued = false; N.at = Date.now(); nudgeN.current = 0; clearTimeout(N.back); clearTimeout(N.soon); }, [qk]);
  const playing = useRef(false);
  useEffect(() => {
    const N = nt.current;
    const inWork = (t: any) => !!(t && t.closest && t.closest('[data-zone="work"]'));
    const ctlOf = (t: any) => { const c = t && t.closest ? t.closest("[data-control]") : null; return c ? c.getAttribute("data-control") : ""; };
    const locks = (c: string) => c === "answer-open" || c === "again" || /^key-/.test(c);
    const mark = () => { if (!touched.current) { touched.current = true; setTch((x: number) => x + 1); } };
    const later = (fn: any) => {
      clearTimeout(N.soon);
      N.soon = setTimeout(() => {
        if (!fn()) return;
        N.shown = true;
        clearTimeout(N.back);
        N.back = setTimeout(() => { if (N.shown && sayRef.current && stageRef.current === "ask") { N.shown = false; api.say(sayRef.current); } }, 3000);
      }, 60);
    };
    const nudge = () => later(() => { if (!gl.current || playing.current) return false; if (nudgeRef.current) nudgeRef.current(); return true; });
    /* Enter on an answer box that is still empty: a short line that names no value */
    const fillCheck = () => {
      const s = slotRef.current;
      if (!s.ask || s.parts < 2 || gl.current || playing.current) return;
      const ps = slotPartsOf(s.typed, s.parts), cur = Math.max(0, Math.min(s.parts - 1, s.part));
      if (!ps.some((x: any) => x === "" || x === null || x === undefined)) return;
      if (!(ps[cur] === "" || ps[cur] === null || ps[cur] === undefined || cur === s.parts - 1)) return;
      later(() => { if (!slotRef.current.ask) return false; api.say("Fill both boxes."); return true; });
    };
    const down = (e: any) => {
      if (!e.isTrusted) return;
      if (inWork(e.target)) mark();
      /* a nudge needs the press to START on the locked key (a tap on Next, then the dimmed key under the finger, is no nudge) */
      N.down = ctlOf(e.target); N.downLocked = gl.current && Date.now() - N.at > 400;
      if (N.down === "key-enter") fillCheck();
    };
    const up = (e: any) => {
      if (!e.isTrusted) return;
      const c = ctlOf(e.target);
      if (playing.current) { if (c === "answer-open" && N.down === "answer-open") N.queued = true; return; }
      if (!gl.current || !N.downLocked || c !== N.down || !locks(c) || Date.now() - N.at < 400) return;
      nudge();
    };
    const key = (e: any) => {
      if (!e.isTrusted) return;
      /* a real Enter or Space on a guide step, or on the board's own key, arms the gate */
      if ((e.key === "Enter" || e.key === " ") && (stageRef.current === "demo" || inWork(e.target))) mark();
      /* Enter or Space on the act key (or on any control of the board) is the act itself, never a reason to nudge */
      if (inWork(e.target) || playing.current) return;
      if (e.key === "Enter") fillCheck();
      if (gl.current && (e.key === "Enter" || /^[0-9]$/.test(e.key))) nudge();
    };
    window.addEventListener("pointerdown", down, true);
    window.addEventListener("pointerup", up);
    window.addEventListener("keydown", key, true);
    return () => {
      clearTimeout(N.back); clearTimeout(N.soon);
      window.removeEventListener("pointerdown", down, true);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("keydown", key, true);
    };
  }, []);

  /* THE ACTS: each is performed on screen (api.act) and the picture reacts as the tool passes each point */
  const lastKey = useRef(0);
  const wrongN = useRef(0);
  useEffect(() => { wrongN.current = 0; }, [qk]);
  const doAct = (name: string) => {
    if (!it || playing.current) return;
    if (name === "cm" ? S.sum : S.done) { if (stage === "demo") api.did(name); return; }
    const key = qk, st = stage;
    const o: any = lcActOf(it, name, ox, (i: number) => put(name === "cm" ? (i >= 1 ? { sum: true } : {}) : { prog: i + 1 }, key));
    if (!o) return;
    playing.current = true;
    api.act(o).then((ok: boolean) => {
      if (!ok) { playing.current = false; return; }
      /* react a beat after the act layer has gone, so the runtime's own render that removes it commits alone (NOTES: the
         action-anim race between acting=false and the layer leaving) */
      setTimeout(() => { playing.current = false; after(); }, 40);
    });
    const after = () => {
      put(name === "cm" ? { sum: true } : { done: true, prog: o.at.length }, key);
      api.sfx.settle();
      if (st === "demo") api.did(name);
      if (st === "ask") {
        /* the act answers a nudge: its timers go and, if it is on the bubble, the question comes back */
        const N = nt.current;
        clearTimeout(N.back); clearTimeout(N.soon);
        if (N.shown && key === qkRef.current && sayRef.current) { N.shown = false; api.say(sayRef.current); }
        /* a tap on the dimmed Answer key made while the act played was queued: the keypad opens now */
        if (N.queued && key === qkRef.current) { N.queued = false; setTimeout(() => { try { api.openAnswer(); } catch (e) { /* no keypad here */ } }, 120); }
        else lcFocusAnswer();
      }
    };
  };
  const press = (name: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    /* phase 4: Carry and Borrow stand together; the one that does not fit this sum changes nothing and costs no try */
    if ((name === "carry" || name === "borrow") && name !== actName) {
      if (stage === "demo") { api.did(name); return; }
      if (!asking || playing.current) return;
      const N = nt.current;
      clearTimeout(N.back); clearTimeout(N.soon);
      lcWrongKey(api, (index + wrongN.current) % 3);
      wrongN.current++;
      N.shown = true;
      N.back = setTimeout(() => { if (N.shown && sayRef.current) { N.shown = false; api.say(sayRef.current); } }, 3000);
      return;
    }
    doAct(name);
  };
  /* free play: each key plays its act on the scene, or on a new example once that one is done */
  const freeGo = (mode: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400 || playing.current) return;
    lastKey.current = t;
    const same = fr.mode === mode;
    const k = same && !fr.done ? fr.k : same ? (fr.k + 1) % LC_FREE[mode].length : 0;
    const itm = LC_FREE[mode][k];
    if (!(same && k === fr.k)) setFr({ mode, k, done: false, prog: 0, sum: false, tb: 0 });
    const keep = (patch: any) => setFr((p: any) => (p.mode === mode && p.k === k ? { ...p, ...patch } : p));
    const o: any = lcActOf(itm, lcActName(itm), ox, (i: number) => keep({ prog: i + 1 }));
    if (!o) return;
    playing.current = true;
    api.act(o).then((ok: boolean) => {
      playing.current = false;
      if (!ok) return;
      keep({ done: true, sum: true, prog: o.at.length });
      api.sfx.settle();
    });
  };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT guide step */
  api.onEnter(stage === "demo" && stepOn ? () => doAct(stepOn) : null);
  const doneNow = () => {
    put({ done: true, sum: true, prog: 99 }, qk);
    if (gl.current) { gl.current = false; api.lock(false); }
  };
  HOOK.demo = stage === "demo" && stepOn ? () => doAct(stepOn) : null;
  HOOK.check = asking && !S.done ? () => { doneNow(); return undefined; } : null;
  HOOK.done = asking && !S.done ? doneNow : null;

  /* THE CORRECTION: replays the working step by step and stops one step before the answer (MISS HIDES THE ANSWER) */
  useEffect(() => {
    if (!wrong || !asking || !it) return;
    const N = lcTbN(it), key = qk;
    const ms = Math.round(Math.max(120, Math.min(300, 1200 / Math.max(1, N))));
    /* the correction shows the act done (a miss sent without it, by the agent, still sees the rods broken, the ribbon cut ...) */
    put({ tb: 0, done: true, sum: true, prog: 99 }, key);
    if (gl.current) { gl.current = false; api.lock(false); }
    /* the pad, the keys and Enter are dead while the replay plays (about 1.5 s): nothing typed, no answer sent; free again at its end */
    rl.current = true; api.lock(true);
    tb.run([[200, () => {}], ...Array.from({ length: N }, (_, i) => [ms, () => put({ tb: i + 1 }, key)])], () => { if (rl.current) { rl.current = false; api.lock(false); } });
  }, [wrong]);
  const rl = useRef(false);
  useEffect(() => () => { tb.stop(); if (rl.current) { rl.current = false; api.lock(false); } }, [qk]);
  /* at the win the picture is the FINISHED act (never a half replay) */
  useEffect(() => {
    if (stage !== "win" || free || warm) return;
    tb.stop();
    if (rl.current) { rl.current = false; api.lock(false); }
    put({ done: true, sum: true, prog: 99, tb: 0 }, qk);
  }, [stage, qk]);

  /* the win line: one sentence, said at the right answer (the phase's closing replaces it at its last question) */
  const saidWin = useRef("");
  useEffect(() => {
    if (stage === "win" && !free && !warm && item && item.win && saidWin.current !== qk) { saidWin.current = qk; api.say(item.win); }
  }, [stage, qk]);

  /* what the host and the agent read back (toolApi.getState): never the answer before the child gave it */
  api.share({ given: it ? lcGiven(it, (v: any) => v) : "", act: actName, acted: !!S.done, complete: stage === "idle",
    ...(win && item ? { answer: lcAnsStr(item, (v: any) => v) } : {}) });

  const U = (u: string) => tx(u);

  /* ── phase 1: metre rods ── */
  const sceneRods = () => {
    const rods = lcRods(it), cnt = it.cm > 0 ? it.m : it.m - 1;
    return rods.map((r: any) => {
      const H = r.h, cs = T.label;
      const broken = r.piece || S.prog > r.i || S.done;
      /* the correction lights the rods one by one; every rod keeps its own uniform label (never a running total) */
      const counted = !r.piece && S.tb > r.i && r.i < cnt;
      const lit = r.piece && S.tb >= it.m + 1;
      const label = r.piece ? `${it.cm} ${U("cm")}` : broken ? `100 ${U("cm")}` : `1 ${U("m")}`;
      const col = r.piece ? LC_AMBER : broken ? LC_VERM : LC_BLUE;
      const cw = lcTW(label, cs) + 28;
      return (
        <g key={"r" + r.i} filter="url(#lc-shadow)">
          <rect x={r.x} y={r.y} width={r.w} height={H} rx={2} fill={LC_WOOD} />
          <Skin name="rod" x={r.x} y={r.y} w={r.w} h={H} />
          {broken ? <path d={lcTicks(r.x, r.y, r.w, LC_M.rodLen / 100)} stroke={LC_INK} strokeWidth={1.4} opacity={0.8} /> : null}
          <rect x={r.x} y={r.y} width={r.w} height={H} rx={2} fill="none" stroke={lit ? LC_AMBER : LC_INK} strokeWidth={lit ? 5 : 2} />
          {counted ? <rect x={r.x + 2.5} y={r.y + 2.5} width={r.w - 5} height={H - 5} rx={2} fill={LC_VERM} fillOpacity={0.16} stroke={LC_VERM} strokeWidth={5} /> : null}
          {r.chip || r.piece ? lcChip("c" + r.i, r.piece ? r.x + r.w + 14 + cw / 2 : r.x + r.w / 2, r.y + H / 2, label, col, lit, {}, cs) : null}
        </g>
      );
    });
  };

  /* ── phase 2: a ribbon cut into 1 m pieces ── */
  const sceneRibbon = () => {
    const cuts = S.done ? 99 : S.prog, R = lcRib(it.total, cuts), M = R.M, rib = R.rib, band = R.band, out: any[] = [];
    const runs: any[] = [];
    R.ps.forEach((p: any) => {
      const cut = p.c > 0 && cuts >= p.k;
      const last = runs[runs.length - 1];
      if (!last || last.r !== p.r || cut) runs.push({ r: p.r, x: p.x, y: p.y, w: p.w });
      else last.w = p.x + p.w - last.x;
    });
    runs.forEach((u: any, j: number) => {
      const tk: string[] = [];
      for (let c = 10; c < Math.round((u.w / M) * 100); c += 10) tk.push(`M${(u.x + (c * M) / 100).toFixed(1)} ${u.y + rib + band}v${c % 50 === 0 ? -11 : -7}`);
      out.push(
        <g key={"u" + j} filter="url(#lc-shadow)">
          <rect x={u.x} y={u.y} width={u.w} height={rib} fill={LC_RIB} />
          <Skin name="ribbon" x={u.x} y={u.y} w={u.w} h={rib} fit="stretch" />
          <rect x={u.x} y={u.y + rib} width={u.w} height={band} fill={LC_CREAM} />
          <path d={tk.join(" ")} stroke={LC_INK} strokeWidth={2} opacity={0.8} />
          <rect x={u.x} y={u.y} width={u.w} height={rib + band} fill="none" stroke={LC_INK} strokeWidth={2} />
        </g>,
      );
    });
    /* a ribbon that wraps onto the next row says so: a dashed "continues" line from a row's end to the next row's start */
    for (let r = 0; r < R.rows - 1; r++) {
      const row = R.ps.filter((p: any) => p.r === r);
      const ex = Math.max(...row.map((p: any) => p.x + p.w)), my = row[0].y + (rib + band) / 2;
      const gy = row[0].y + rib + band + (R.pitch - R.top - rib - band) / 2, ny = my + R.pitch;
      out.push(
        <g key={"cont" + r} pointerEvents="none">
          <path d={`M${ex + 3} ${my} C${ex + 22} ${my} ${ex + 22} ${gy} ${ex + 3} ${gy} L${34 - 3} ${gy} C${16} ${gy} ${16} ${ny} ${34 - 6} ${ny}`} fill="none" stroke={LC_INK} strokeWidth={2.5} strokeDasharray="8 6" opacity={0.75} />
          <path d={`M${34 - 13} ${ny - 6} L${34 - 5} ${ny} L${34 - 13} ${ny + 6}`} fill="none" stroke={LC_INK} strokeWidth={2.5} opacity={0.75} />
        </g>,
      );
    }
    R.ps.forEach((p: any) => {
      /* the correction lights the 1 m pieces one by one, one short of the last; every piece keeps its own uniform label */
      const counted = !p.left && S.tb > p.k && p.k < R.full - 1;
      if (counted) out.push(<rect key={"cr" + p.k} x={p.x + 2.5} y={p.y + 2.5} width={p.w - 5} height={rib + band - 5} fill={LC_VERM} fillOpacity={0.18} stroke={LC_VERM} strokeWidth={5} />);
      if (!p.left && R.big && cuts >= p.k + 1) out.push(lcChip("c" + p.k, p.x + p.w / 2, p.cy, `1 ${U("m")}`, LC_BLUE, false, {}, R.cs));
      if (p.left && cuts >= R.full) {
        const lit = S.tb >= R.full;
        /* the leftover's chip stands to its RIGHT, 8 clear of its ring (above it when the row has no room) */
        const lw = lcTW(win || (free && S.done) ? `${R.rem} ${U("cm")}` : tx("Left"), R.cs) + 28;
        const right = p.x + p.w + 16 + lw <= 886;
        const cx = right ? p.x + p.w + 16 + lw / 2 : Math.max(lw / 2 + 4, Math.min(886 - lw / 2, p.x + p.w / 2));
        const cy = right ? p.y + (rib + band) / 2 : p.cy;
        out.push(<rect key="lr" x={p.x - 5} y={p.y - 5} width={p.w + 10} height={rib + band + 10} rx={6} fill="none" stroke={LC_AMBER} strokeWidth={lit ? 6 : 4} />);
        out.push(win ? lcChip("lv", cx, cy, `${R.rem} ${U("cm")}`, LC_GREEN, true, { "data-reveals": "answer" }, R.cs)
          : lcChip("lv", cx, cy, free && S.done ? `${R.rem} ${U("cm")}` : tx("Left"), LC_AMBER, lit, {}, R.cs));
      }
    });
    return out;
  };

  /* ── phase 3: a road with a post at every kilometre ── */
  const sceneRoad = () => {
    const R = lcRoad(it), out: any[] = [], planted = S.done ? R.kms : S.prog;
    for (let s = 0; s < LC_M.roadN; s++) {
      out.push(
        <g key={"t" + s}>
          <rect x={R.x0 + s * R.K} y={R.y} width={R.K} height={R.h} fill={LC_ROAD} />
          <Skin name="road" x={R.x0 + s * R.K} y={R.y} w={R.K} h={R.h} fit="stretch" />
        </g>,
      );
    }
    out.push(<path key="rd-line" d={`M${R.x0} ${R.y + R.h / 2} H${R.x0 + R.K * LC_M.roadN}`} stroke="#FFFFFF" strokeWidth={3} strokeDasharray="16 12" opacity={0.65} />);
    out.push(<rect key="rb" x={R.x0} y={R.y} width={R.K * LC_M.roadN} height={R.h} fill="none" stroke={LC_INK} strokeWidth={2.5} rx={3} />);
    const post = (k: string, x: number) => (
      <g key={k} filter="url(#lc-shadow)">
        <rect x={x - 5} y={R.y - 54} width={10} height={54} rx={3} fill={LC_POST} stroke={LC_INK} strokeWidth={1.5} />
        <rect x={x - 5} y={R.y - 54} width={5} height={54} rx={2} fill="#FFFFFF" opacity={0.25} />
        <rect x={x - 18} y={R.y - 64} width={36} height={18} rx={4} fill={LC_CREAM} stroke={LC_POST} strokeWidth={2.5} />
        <rect x={x - 16} y={R.y - 62} width={32} height={7} rx={3} fill="#FFFFFF" opacity={0.5} />
      </g>
    );
    /* post labels in two tiers (odd posts low, even posts and the zero high, on a leader), so neighbours never meet */
    out.push(
      <g key="zero" data-scale="road">
        {post("p0", R.x0)}
        <path d={`M${R.x0} ${R.y - 114} V${R.y - 66}`} stroke={LC_POST} strokeWidth={2} />
        <text x={R.x0} y={R.y - 120} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LC_INK}>{`0 ${U("m")}`}</text>
      </g>,
    );
    /* under the road: two rows of chips, 56 apart (a chip is 44 tall), each on a leader to its post; row A for odd posts, row B for even */
    const rowY = (k: number) => R.y + R.h + (k % 2 ? 34 : 100);
    const leader = (key: string, x: number, cy: number, col: string) => <path key={key} d={`M${x} ${R.y + R.h + 2} V${cy - 22}`} stroke={col} strokeWidth={2.5} strokeDasharray="5 4" />;
    /* the stretch left over after the last post: its chip takes the free place of that post's row */
    const lx = R.x0 + R.kms * R.K;
    if (S.done && R.rest > 0) {
      const lit = S.tb >= R.kms;
      const lv = it.kind === "km2m" || (free && S.done) || win ? `${R.rest} ${U("m")}` : tx("Left");
      const lw = lcTW(lv, T.label) + 28;
      const mid = (lx + R.flagX) / 2, cx = Math.max(lw / 2 + 4, Math.min(886 - lw / 2, mid)), cy = rowY(R.kms);
      out.push(<rect key="lb" x={lx} y={R.y + 3} width={R.flagX - lx} height={R.h - 6} fill={LC_AMBER} fillOpacity={0.6} stroke={LC_AMBER} strokeWidth={lit ? 6 : 3} rx={3} />);
      out.push(<path key="ll" d={`M${mid} ${R.y + R.h + 2} L${cx} ${cy - 22}`} stroke={LC_AMBER} strokeWidth={3} strokeDasharray="4 4" />);
      out.push(win && it.kind === "m2km" ? lcChip("lv", cx, cy, lv, LC_GREEN, true, { "data-reveals": "answer" }, T.label)
        : lcChip("lv", cx, cy, lv, LC_AMBER, lit, {}, T.label));
    }
    R.posts.forEach((p: any) => {
      if (p.k > planted) return;
      const ly = p.k % 2 ? R.y - 72 : R.y - 120;
      out.push(
        <g key={"p" + p.k}>
          {post("ps" + p.k, p.x)}
          {p.k % 2 ? null : <path d={`M${p.x} ${R.y - 114} V${R.y - 66}`} stroke={LC_POST} strokeWidth={2} />}
          {/* each post is labelled in the GIVEN unit: km on a km-to-m road, metres on a m-to-km road (the picture never does the x1000) */}
          <text x={p.x} y={ly} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LC_INK}>{it.kind === "km2m" ? `${p.k} ${U("km")}` : `${indian(p.k * 1000)} ${U("m")}`}</text>
        </g>,
      );
    });
    /* the correction counts the posts in the ANSWER unit and stops one short */
    const cnt = R.kms - 1;
    R.posts.forEach((p: any) => {
      if (p.k > Math.min(S.tb, cnt) || !S.done) return;
      const cy = rowY(p.k);
      out.push(leader("kl" + p.k, p.x, cy, LC_VERM));
      out.push(lcChip("k" + p.k, p.x, cy, it.kind === "km2m" ? `${indian(p.k * 1000)} ${U("m")}` : `${p.k} ${U("km")}`, LC_VERM, true, {}, T.label));
    });
    /* the given distance: a blue flag */
    const fx = R.flagX + (R.rest === 0 ? 10 : 0);
    out.push(
      <g key="flag" filter="url(#lc-shadow)">
        <rect x={fx - 2} y={R.y - 44} width={4} height={44} fill={LC_INK} rx={1} />
        <path d={`M${fx + 2} ${R.y - 44} l36 11 l-36 11 z`} fill={LC_BLUE} stroke={shade(LC_BLUE, 0.3)} strokeWidth={1.5} />
      </g>,
    );
    return out;
  };

  /* ── phase 4: the column board, m and cm ── */
  const sceneBoard = () => {
    const B = LC_B, add = it.kind === "add", out: any[] = [];
    const [a0, a1] = it.a, [b0, b1] = it.b;
    const res = lcOracle(it);
    out.push(<rect key="fr" x={B.x0} y={B.y0} width={B.x1 - B.x0} height={B.y1 - B.y0} rx={16} fill={LC_CREAM} stroke={LC_INK} strokeWidth={2.5} filter="url(#lc-shadow)" />);
    out.push(<path key="dv" d={`M${B.div} ${B.y0} V${B.y1} M${B.mL} ${B.headLine} V${B.y1}`} stroke={LC_INK} strokeWidth={2} opacity={0.8} />);
    out.push(<path key="hd" d={`M${B.x0} ${B.headLine} H${B.x1}`} stroke={C.rule} strokeWidth={2.5} />);
    /* the column captions sit low in the heading band, 26 in from the column line: the cm column's invite ring keeps 12 clear of them */
    out.push(<text key="hm" x={B.mL + 26} y={B.head} textAnchor="start" fontSize={T.label} fontWeight={700} fill={LC_INK}>{U("m")}</text>);
    out.push(<text key="hc" x={B.div + 26} y={B.head} textAnchor="start" fontSize={T.label} fontWeight={700} fill={LC_INK}>{U("cm")}</text>);
    /* the carry mark above the metres column, or the exchanged top row */
    if (add) {
      /* nothing stands in the carry row before the act: an empty carry box would decide Carry for the child */
      /* 44 tall, so the correction's ring round it keeps 6+ clear of the board's top and of the heading rule */
      if (S.done) out.push(<rect key="cb" x={B.cbX - 56} y={B.carryY - 22} width={112} height={44} rx={10} fill={tint(LC_AMBER, 0.78)} stroke={LC_AMBER} strokeWidth={3} filter="url(#lc-shadow)" />);
      if (S.done) out.push(<text key="ct" x={B.cbX} y={B.carryY + (lang && lang !== "en" ? 16 : 12)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={lcInk(LC_AMBER)}>{`1 ${U("m")}`}</text>);
    } else if (S.done) {
      out.push(<text key="xm" x={B.cbX} y={B.carryY + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={lcInk(LC_AMBER)}>{`${a0 - 1} ${U("m")}`}</text>);
      out.push(<text key="xc" x={B.ccX} y={B.carryY + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={lcInk(LC_AMBER)}>{`${a1 + 100} ${U("cm")}`}</text>);
    }
    /* the two lengths: the first in Given blue, the second in amber */
    out.push(<text key="am" x={B.mX} y={B.aY + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={lcInk(LC_BLUE)}>{`${a0} ${U("m")}`}</text>);
    out.push(<text key="ac" x={B.cX} y={B.aY + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={lcInk(LC_BLUE)}>{`${a1} ${U("cm")}`}</text>);
    if (!add && S.done) out.push(<path key="st" d={`M${B.mX - 78} ${B.aY} H${B.mX + 78} M${B.cX - 98} ${B.aY} H${B.cX + 98}`} stroke={LC_INK} strokeWidth={4} strokeLinecap="round" />);
    out.push(<text key="sg" x={B.sX} y={B.bY + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={LC_INK}>{add ? "+" : "−"}</text>);
    out.push(<text key="bm" x={B.mX} y={B.bY + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={lcInk(LC_AMBER)}>{`${b0} ${U("m")}`}</text>);
    out.push(<text key="bc" x={B.cX} y={B.bY + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={lcInk(LC_AMBER)}>{`${b1} ${U("cm")}`}</text>);
    out.push(<path key="ln" d={`M${B.x0 + 16} ${B.line} H${B.x1 - 16}`} stroke={LC_INK} strokeWidth={4} strokeLinecap="round" />);
    /* the answer row: empty boxes, filled green only at the win */
    out.push(<rect key="xa" x={B.mX - 95} y={B.ansY - 34} width={190} height={68} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2.5} strokeDasharray="8 6" />);
    out.push(<rect key="xb" x={B.cX - 130} y={B.ansY - 34} width={260} height={68} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2.5} strokeDasharray="8 6" />);
    if (win || ((free || warm) && S.done)) {
      out.push(
        <g key="aw" {...(win ? { "data-reveals": "answer" } : {})}>
          <text x={B.mX} y={B.ansY + 18} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={lcInk(LC_GREEN)}>{`${res[0]} ${U("m")}`}</text>
          <text x={B.cX} y={B.ansY + 18} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={lcInk(LC_GREEN)}>{`${res[1]} ${U("cm")}`}</text>
        </g>,
      );
    }
    /* the correction: the cm column first, then the carry or the exchange again */
    if (asking && S.tb >= 1) out.push(<rect key="r1" x={B.div + 6} y={B.aY - 43} width={B.x1 - B.div - 12} height={B.bY - B.aY + 72} rx={10} fill={LC_VERM} fillOpacity={0.14} />);
    if (asking && S.tb >= 3) out.push((add ? <rect key="r3" x={B.cbX - 64} y={B.carryY - 29} width={128} height={58} rx={12} fill="none" stroke={LC_VERM} strokeWidth={3} />
      : <rect key="r3" x={B.mL + 6} y={B.y0 + 5} width={B.x1 - B.mL - 12} height={B.headLine - B.y0 - 10} rx={8} fill={LC_VERM} fillOpacity={0.14} />));
    return out;
  };

  /* the working of the cm column, as separate terms (warm-up, correction, free play) */
  /* the correction shows the cm column's two terms only (its total would print a part of the answer: 143 holds 43); the warm-up and free play show the total */
  const termsOf = (q: any, full: boolean) => {
    const add = q.kind === "add", [, a1] = q.a, [, b1] = q.b;
    return add ? [`${a1} ${U("cm")}`, "+", `${b1} ${U("cm")}`, ...(full ? ["=", `${a1 + b1} ${U("cm")}`] : [])] : [`${a1 + 100} ${U("cm")}`, "−", `${b1} ${U("cm")}`];
  };
  const sumTerms = (full = !asking) => termsOf(it, full);
  const wOf = (ts2: string[], s: number) => 36 + ts2.reduce((a, t) => a + lcTW(t, s), 0) + 10 * (ts2.length - 1);
  const sumWMax = (s: number) => Math.max(0, ...topItems.filter((q: any) => q.kind === "add" || q.kind === "sub").map((q: any) => wOf(termsOf(q, true), s)));
  const sumW = (s: number, full = !asking) => { const ts2 = sumTerms(full); return 36 + ts2.reduce((a, t) => a + lcTW(t, s), 0) + 10 * (ts2.length - 1); };
  const sumChip = () => {
    const terms = sumTerms();
    const ws = terms.map((s) => lcTW(s, sfs));
    const w = sumW(sfs);
    const x0 = Math.min(lcFactW(fa, fb, bfs) + 22, 886 - w);
    let x = x0 + 18;
    return (
      <g key="sum" filter="url(#lc-shadow)">
        <rect x={x0} y={2} width={w} height={72} rx={18} fill="#FFFFFF" stroke={LC_INK} strokeWidth={2.5} />
        {terms.map((s, j) => { const t = <text key={"s" + j} x={x} y={38 + sfs * 0.36} fontSize={sfs} fontWeight={700} fill={LC_INK}>{s}</text>; x += ws[j] + 10; return t; })}
      </g>
    );
  };

  const board = it && (it.kind === "add" || it.kind === "sub");
  const big = it && (it.kind === "km2m" || it.kind === "m2km") ? "km" : "m";
  const fa = big === "km" ? `1 ${U("km")}` : `1 ${U("m")}`, fb = big === "km" ? `${indian(1000)} ${U("m")}` : `100 ${U("cm")}`;
  const gv = it && !board ? lcGiven(it, U) : "";
  const showSum = board && ((warm && S.sum) || (asking && S.tb >= 2) || (free && S.done));
  /* phase 4's top row: the unit fact and the cm working side by side; sizes step down (never under 28) until both fit beside the key */
  const bfs = !board ? T.speech : [T.speech, T.prompt, T.label].find((s) => lcFactW(fa, fb, s) + 22 + sumWMax(T.label) <= 886) || T.label;
  /* the correction's chip (its two terms only) reads at 40 when it fits beside the fact */
  const shortWMax = (s: number) => Math.max(0, ...topItems.filter((q: any) => q.kind === "add" || q.kind === "sub").map((q: any) => wOf(termsOf(q, false), s)));
  const sfs = !board ? T.label : asking && lcFactW(fa, fb, bfs) + 22 + shortWMax(T.prompt) <= 886 ? T.prompt
    : lcFactW(fa, fb, bfs) + 22 + sumWMax(T.label) <= 886 ? T.label : T.micro;
  const showKey = !!it && !free && !S.done && ((stage === "demo" && stepOn === actName) || asking);
  const KW = 260, KH = 72, KX = 450 - KW / 2, KY = 442;
  const ansVal = win ? lcAnsStr(item, U) : "";
  const freeModes = ["break", "cut", "slide", "carry", "borrow"];

  return (
    <g>
      <defs>
        <filter id="lc-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.14" />
        </filter>
      </defs>
      <g transform={`translate(${ox},0)`}>
        <g pointerEvents="none">
          {board ? lcFact("fact", 0, 2, fa, fb, bfs) : null}
          {!board && it ? lcTag("given", 0, 2, tx("Given"), gv, LC_BLUE, {}, ts) : null}
          {!board && it && !(free && S.done) ? lcFact("fact", lcTagW(tx("Given"), gv, ts) + 24, 2, fa, fb, ts) : null}
          {free && it && S.done && !board ? lcTag("res", lcTagW(tx("Given"), gv, ts) + 24, 2, tx("Answer"), lcAnsStr(it, U), LC_GREEN, {}, ts) : null}
          {showSum ? sumChip() : null}
          {it ? (it.kind === "m2cm" ? sceneRods() : it.kind === "cm2m" ? sceneRibbon() : board ? sceneBoard() : sceneRoad()) : null}
          {win ? lcTag("ans", 450 - lcTagW(tx("Answer"), ansVal) / 2, KY + 2, tx("Answer"), ansVal, LC_GREEN, { "data-reveals": "answer" }) : null}
        </g>
        {/* the warm-up's cm column: tap it to add the centimetres first */}
        {board && stage === "demo" && stepOn === "cm" && !S.sum ? (
          <g>
            <Hit id="cm" x={LC_B.div} y={LC_B.y0 + 6} w={LC_B.x1 - LC_B.div} h={LC_B.line - LC_B.y0 - 10} onPress={() => press("cm")} label="cm column" />
            {/* the ring sits 7 or more inside the board's outline, the column line and the sum rule, 12 clear of the caption */}
            <Invite x={(LC_B.div + 16 + LC_B.x1 - 17) / 2} y={(LC_B.y0 + 16 + LC_B.line - 17) / 2} w={LC_B.x1 - 17 - LC_B.div - 16} h={LC_B.line - 17 - LC_B.y0 - 16} rx={12} C={C} />
          </g>
        ) : null}
        {/* the one act key at the bottom centre: its label follows the act */}
        {showKey && !board ? (
          <g filter="url(#lc-shadow)">
            <Key key="act" id={actName} label={tx(LC_KEYS[actName])} x={KX} y={KY} w={KW} h={KH} C={C} tone="key" onClick={() => press(actName)}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(LC_KEYS[actName])}</text>
            </Key>
            <Invite x={450} y={KY + KH / 2} w={KW} h={KH} rx={RAD.key} C={C} />
          </g>
        ) : null}
        {/* phase 4: Carry and Borrow side by side at every question, the choice is the child's; one invite round both */}
        {showKey && board ? (
          <g filter="url(#lc-shadow)">
            {["carry", "borrow"].map((m, j) => (
              <Key key={"cb" + j} id={m} label={tx(LC_KEYS[m])} x={450 - 250 + j * 260} y={KY} w={240} h={KH} C={C} tone="key" onClick={() => press(m)}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(LC_KEYS[m])}</text>
              </Key>
            ))}
            <Invite x={450} y={KY + KH / 2} w={500} h={KH} rx={RAD.key} C={C} />
          </g>
        ) : null}
        {/* the warm-up ends on its result (never one of the phase's answers) */}
        {warm && it && S.done ? (
          <g pointerEvents="none">{lcTag("wres", 450 - lcTagW(tx("Answer"), lcAnsStr(it, U)) / 2, KY + 2, tx("Answer"), lcAnsStr(it, U), LC_GREEN)}</g>
        ) : null}
        {/* free play: four keys, each plays its act */}
        {free ? freeModes.map((m, j) => (
          <Key key={"free" + j} id={m} label={tx(LC_KEYS[m])} x={12 + j * 180} y={KY} w={156} h={KH} C={C} tone="key" onClick={() => freeGo(m)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(LC_KEYS[m])}</text>
          </Key>
        )) : null}
      </g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L) return null;
  const item = it || L.it || (n && PHASES[n - 1] ? PHASES[n - 1].items[L.item] : null);
  if (!item) return null;
  const W = w || 236, H = h || 66;
  /* a unit is drawn from its TR entry in Hindi and Gujarati (सेमी / મી ...); only a unit with no entry would be left out */
  const tu = (u: string) => (lang !== "en" && !(TR[lang] && TR[lang][u]) ? "" : tx(u));
  /* the whole question: a sum or difference names BOTH lengths */
  const top = lcGiven(item, tu).replace(/ +/g, " ").trim();
  const bot = ("= " + lcAnsStr(item, tu, L.value)).replace(/ +/g, " ").trim();
  /* the box is 236 x 66: the question (blue) and the answer (green) are both RIGHT-ALIGNED to one edge, the question in the row's top band
     (it may reach left over the empty end of the title line, never as far as a learn line), the answer under it; no box round either,
     so a Hindi or Gujarati matra never meets an outline, and the two lines keep 5 or more apart */
  return (
    <g>
      <text x={W - 8} y={26} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={lcInk(LC_BLUE)}>{top}</text>
      <text x={W - 8} y={H - 3} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={lcInk(LC_GREEN)}>{bot}</text>
      <path d={`M${W - 8 - lcTW(bot, T.micro)} ${H + 2} H${W - 8}`} stroke={LC_GREEN} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

function LengthConverter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: lcFormat, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default LengthConverter;