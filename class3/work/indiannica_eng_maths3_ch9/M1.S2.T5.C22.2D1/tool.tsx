/* ═══ M1.S2.T5.C22.2D1 · weight_converter · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the working area already
   exists. THE LESSON IS SILENT (r30) and action-driven (r34); the new look (keyOnly, navDots, LAYOUT §1d-§1e).
   Built on the Length Converter's settled pattern (described to this builder in words, never read):
   P1 kilograms into grams: 1 kg bags of rice on a scale; Open (the hand taps each bag) shows its ten 100 g bags and a
      1,000 g chip; the child types the grams (one number, Indian commas in the slot).
   P2 grams into kilograms and grams left: a heap of rice; Gather (the hand carries rice into 1 kg bags, each tagged
      1,000 g, the given unit); the rice left is ringed amber "Left" with no number; two answer boxes (kg, g).
   P3 the kg | g column board: the question's weights sit in the columns; the Carry and the Borrow key stand together and
      the child decides (the right one opens the Answer gate, the other a calm nudge that costs no try).
   P4 shopping: watermelon, mangoes, a bag of rice, a shopping bag; a tap on each item puts its weight in the columns
      (the act); the child adds or takes away with no carry key (the fewest hints).
   THE ANSWER IS GATED BY THE ACT (PATTERNS 19): see MODEL.answerGate. MISS HIDES THE ANSWER (strict): the correction
   replays the working and stops one step short; green Answer tags and cells carry data-reveals="answer" (win only).
   Edit, never rewrite. Concepts are verbatim (check compares them). */

const TOOL_ID = "weight_converter";
const MEDIA_ID = "M1.S2.T5.C22.2D1";
const TOOL_NAME = "Weight Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed before phase 1's teach lines only (phase 1 has guide steps, so it is not shown) */
const OPENING = ["A scale and bags of rice: let us see what is inside a kilogram."];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "You changed kilograms and grams both ways, and you worked the columns grams first.";
/* printed when the child opens Free play: it promises only what the free branch offers (the bags, the Open key) */
const FREE_LINE = "Free play: choose how many bags of rice, then tap Open to see the grams.";

/* THE START PAGE (r28): one question to wonder at, and the scale with its bags of rice */
const START_HOOK = "How many grams are in one rice bag?";
function StartArt({ box, C, lang = "en", tx = (v: any) => v }: any) {
  const cx = box.w / 2, sw = 150, sh = 200, gap = 34, n = 3, row = n * sw + (n - 1) * gap, x0 = cx - row / 2, panY = 250;
  return (
    <g>
      <defs>
        <filter id="wc-start-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#1E293B" floodOpacity="0.14" />
        </filter>
        {/* the start page draws without Work: the tags and the sack fallback it shares need their own defs here */}
        <filter id="wc-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1E293B" floodOpacity="0.12" />
        </filter>
        <linearGradient id="wc-sack-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2C799" />
          <stop offset="100%" stopColor="#B38D50" />
        </linearGradient>
        <linearGradient id="wc-start-pan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D2D9E0" />
          <stop offset="100%" stopColor="#8A96A3" />
        </linearGradient>
        <linearGradient id="wc-start-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EBF0F5" />
          <stop offset="100%" stopColor="#C0C9D3" />
        </linearGradient>
      </defs>
      <rect x={cx - row / 2 - 60} y={panY} width={row + 120} height={18} rx={9} fill="url(#wc-start-pan)" stroke="#4F5B66" strokeWidth={3} filter="url(#wc-start-shadow)" />
      <path d={`M ${cx - 230} ${panY + 18} L ${cx + 230} ${panY + 18} L ${cx + 260} ${panY + 86} L ${cx - 260} ${panY + 86} Z`} fill="url(#wc-start-body)" stroke="#4F5B66" strokeWidth={3} filter="url(#wc-start-shadow)" />
      <rect x={cx - 110} y={panY + 30} width={220} height={44} rx={10} fill="#E6F1FA" stroke="#0072B2" strokeWidth={3} />
      <text x={cx} y={panY + 63} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#00507E">{`3 ${tx("kg")}`}</text>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + i * (sw + gap), y = panY - sh;
        return (
          <g key={i} filter="url(#wc-start-shadow)">
            {wcSackShape(x, y, sw, sh)}
            <Skin name="sack" x={x} y={y} w={sw} h={sh} />
            {wcChip("t" + i, x + sw / 2, y + sh * 0.62, "c", "m", "count", `1 ${tx("kg")}`, T.label, sw + gap - 10)}
          </g>
        );
      })}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled at the language pass, keyed by the English byte for byte. */
const TR: any = {
  hi: {
    "Weight Converter": "वज़न की इकाई बदलो",
    "Free play: choose how many bags of rice, then tap Open to see the grams.": "मुक्त खेल: चावल की बोरियाँ चुनो और ग्राम देखने के लिए खोलो बटन छुओ।",
    "Kilograms into grams: multiply by 1000": "किलोग्राम से ग्राम: 1,000 से गुणा करो",
    "Tap Open to see what is inside each 1 kg bag of rice.": "खोलो बटन को छुओ और देखो कि 1 किग्रा की हर बोरी में क्या है।",
    "Tap the Open key below.": "नीचे वाला खोलो बटन छुओ।",
    "Tap one tray to count its small 100 g bags.": "एक ट्रे छुओ और उसकी छोटी 100 ग्राम की थैलियाँ गिनो।",
    "Tap a tray of small bags.": "छोटी थैलियों की एक ट्रे छुओ।",
    "Tap Total to put the thousands together.": "हज़ारों को जोड़ने के लिए कुल बटन छुओ।",
    "The Total key is below.": "कुल बटन नीचे है।",
    "Each opened bag is 1,000 g.": "खुली हुई हर बोरी 1,000 ग्राम की है।",
    "Thousands first, then any grams left over.": "पहले हज़ार, फिर बचे ग्राम।",
    "One kilogram equals 1,000 grams, so multiply kilograms by 1,000.": "एक किलोग्राम में 1,000 ग्राम होते हैं, तो 1,000 से गुणा करो।",
    "You learned: 1 kg is 1,000 g, so multiply kilograms by 1,000.": "तुमने सीखा: 1 किग्रा में 1,000 ग्राम, तो किग्रा को 1,000 से गुणा करो।",
    "The rice on the scale weighs 2 kg; how many grams is that?": "तराज़ू पर चावल का वज़न 2 किग्रा है, तो यह कितने ग्राम हुआ?",
    "2 kg in grams?": "2 किग्रा में कितने ग्राम?",
    "How many grams did each opened bag show?": "खुली हुई हर बोरी में कितने ग्राम दिखे?",
    "Count 1,000 g for every bag on the scale.": "तराज़ू की हर बोरी के 1,000 ग्राम गिनो।",
    "Add 1,000 g for the first bag and 1,000 g for the second.": "पहली बोरी के 1,000 ग्राम और दूसरी बोरी के 1,000 ग्राम जोड़ो।",
    "Yes, 2 kg is 2,000 g: each kilogram is 1,000 g.": "हाँ, 2 किग्रा यानी 2,000 ग्राम: हर किग्रा 1,000 ग्राम का है।",
    "How many grams in all is 4 kg 700 g of rice?": "अब चावल का वज़न 4 किग्रा 700 ग्राम है, यह कुल कितने ग्राम हुआ?",
    "4 kg 700 g in grams?": "4 किग्रा 700 ग्राम में कितने ग्राम?",
    "Change 4 kg into grams first, then add the small bag.": "पहले 4 किग्रा को ग्राम में बदलो, फिर छोटी थैली जोड़ो।",
    "Four opened bags make four thousands of grams.": "खुली हुई चार बोरियों से चार हज़ार ग्राम बनते हैं।",
    "Put the 700 g of the small bag on top of the thousands.": "छोटी थैली के 700 ग्राम हज़ारों के ऊपर रख दो।",
    "Yes, 4 kg 700 g is 4,700 g.": "हाँ, 4 किग्रा 700 ग्राम यानी 4,700 ग्राम।",
    "This rice is 2 kg 90 g: write it in grams.": "यह चावल 2 किग्रा 90 ग्राम का है: इसे ग्राम में लिखो।",
    "2 kg 90 g in grams?": "2 किग्रा 90 ग्राम में कितने ग्राम?",
    "The 2 kg is two thousands; the small bag adds just 90 g.": "2 किग्रा यानी दो हज़ार, और छोटी थैली सिर्फ़ 90 ग्राम जोड़ती है।",
    "Write the grams in three places: 90 g has no hundreds.": "ग्राम को तीन स्थानों में लिखो: 90 ग्राम में सैकड़े का अंक नहीं है।",
    "Keep a 0 in the hundreds place after the thousands.": "हज़ार के बाद सैकड़े के स्थान पर 0 रखो।",
    "Yes, 2 kg 90 g is 2,090 g, with the 0 kept.": "हाँ, 2 किग्रा 90 ग्राम यानी 2,090 ग्राम, 0 को रखकर।",
    "Grams into kilograms: divide by 1000": "ग्राम से किलोग्राम: 1,000 से भाग दो",
    "Tap Gather to fill bags from the heap, 1,000 g in each.": "ढेर से बोरियाँ भरने के लिए इकट्ठा करो बटन छुओ, हर एक में 1,000 ग्राम।",
    "Tap the Gather key below.": "नीचे इकट्ठा करो बटन छुओ।",
    "Tap the rice left in the ring to see its grams.": "गोले में बचे हुए चावल को छुओ और उसके ग्राम देखो।",
    "Tap the small heap inside the amber ring.": "पीले गोले के अंदर का छोटा ढेर छुओ।",
    "Every full bag is 1 kg.": "हर भरी हुई बोरी एक किलोग्राम की है।",
    "The rice outside the bags stays as grams.": "बोरियों के बाहर का चावल ग्राम में ही रहता है।",
    "Every 1,000 grams make one kilogram, so divide by 1,000.": "हर 1,000 ग्राम से एक किलोग्राम बनता है, इसलिए 1,000 से भाग दो।",
    "You learned: every 1,000 g makes 1 kg, and the rest stays as grams.": "तुमने सीखा: हर 1,000 ग्राम से 1 किग्रा बनता है, बाकी ग्राम रहता है।",
    "This heap of rice weighs 4,000 g; how many kilograms and grams is that?": "चावल के इस ढेर का वज़न 4,000 ग्राम है, यह कितने किलोग्राम और ग्राम है?",
    "4,000 g in kg and g?": "4,000 ग्राम में कितने किग्रा और ग्राम?",
    "Each bag holds 1,000 g: how many bags would the whole heap fill?": "हर बोरी में 1,000 ग्राम: पूरा ढेर कितनी बोरियाँ भरेगा?",
    "How many thousands are there in 4,000 g?": "4,000 ग्राम में कितने हज़ार?",
    "After the last full bag, is any rice left over?": "आखिरी भरी बोरी के बाद क्या कुछ चावल बचता है?",
    "Yes, 4,000 g is 4 kg 0 g, nothing left.": "हाँ, यह 4 किग्रा 0 ग्राम है, कुछ नहीं बचा।",
    "Now gather 3,450 g of rice: how many kg, and how many g are left over?": "अब 3,450 ग्राम चावल इकट्ठा करो: कितने किग्रा, कितने ग्राम बचे?",
    "3,450 g in kg and g?": "3,450 ग्राम में कितने किग्रा और ग्राम?",
    "How many 1,000 g bags can 3,450 g fill, and what is left over?": "3,450 ग्राम से 1,000 ग्राम की कितनी बोरियाँ भरेंगी, और कितना बचेगा?",
    "The thousands digit tells how many bags are full.": "हज़ार का अंक बताता है कि कितनी बोरियाँ भरी हैं।",
    "The three digits after the comma are the grams left.": "कॉमा के बाद के तीन अंक वे ग्राम हैं जो बचते हैं।",
    "Yes, it is 3 kg 450 g.": "हाँ, 3,450 ग्राम यानी 3 किग्रा 450 ग्राम।",
    "Gather 5,007 g of rice the same way: what is it in kg and g?": "5,007 ग्राम चावल इसी तरह इकट्ठा करो: यह कितने किग्रा और ग्राम है?",
    "5,007 g in kg and g?": "5,007 ग्राम में कितने किग्रा और ग्राम?",
    "Count the thousands in 5,007 g for the bags, then what is left over.": "बोरियों के लिए 5,007 ग्राम में हज़ार गिनो, फिर देखो कितना बचा।",
    "After the comma come 0, 0 and then one more digit.": "कॉमा के बाद 0, 0 आते हैं और फिर एक अंक।",
    "Zeros in front add nothing to a number of grams.": "आगे के शून्य ग्राम की संख्या में कुछ नहीं जोड़ते।",
    "Yes, 5,007 g is 5 kg 7 g.": "हाँ, 5,007 ग्राम यानी 5 किग्रा 7 ग्राम।",
    "Kilograms and grams together": "किलोग्राम और ग्राम एक साथ",
    "Tap the grams column to add the grams first.": "पहले ग्राम जोड़ने के लिए ग्राम के खाने को छुओ।",
    "Tap the grams column.": "ग्राम वाला खाना छुओ।",
    "1,200 g is more than 1,000 g, so tap Carry.": "1,200 ग्राम 1,000 ग्राम से ज़्यादा है, तो हासिल बटन छुओ।",
    "Carry is the key for grams that pass 1,000.": "जब ग्राम 1,000 से ज़्यादा हो जाएँ, तब हासिल बटन काम आता है।",
    "Now tap the kg column to add the kilograms.": "अब किग्रा जोड़ने के लिए किग्रा के खाने को छुओ।",
    "The kg column is on the left of the board.": "किग्रा का खाना बोर्ड के बाईं ओर है।",
    "Work the grams column before the kilograms column.": "किलोग्राम के खाने से पहले ग्राम के खाने का काम करो।",
    "1,000 g is the same as 1 kg.": "1,000 ग्राम और 1 किग्रा बराबर होते हैं।",
    "Work the grams first: carry 1,000 g as 1 kg, or borrow 1 kg as 1,000 g.": "ग्राम पहले: 1,000 ग्राम से 1 किग्रा हासिल लो या 1 किग्रा से 1,000 ग्राम उधार लो।",
    "You learned: carry 1,000 g as 1 kg, or borrow 1 kg as 1,000 g.": "तुमने सीखा: 1,000 ग्राम का 1 किग्रा हासिल, 1 किग्रा के 1,000 ग्राम उधार।",
    "How much do 3 kg 750 g of rice and 1 kg 600 g of dal weigh in all?": "चावल 3 किग्रा 750 ग्राम और दाल 1 किग्रा 600 ग्राम: कुल वज़न कितना?",
    "3 kg 750 g + 1 kg 600 g": "3 किग्रा 750 ग्राम + 1 किग्रा 600 ग्राम",
    "Start with the grams column: 750 g and 600 g.": "ग्राम के खाने से शुरू करो: 750 ग्राम और 600 ग्राम।",
    "750 g and 600 g make 1,000 g and some more grams.": "750 ग्राम और 600 ग्राम मिलकर 1,000 ग्राम और कुछ ग्राम होते हैं।",
    "After the 1 kg is carried, how many grams are left over?": "1 किग्रा हासिल लेने के बाद कितने ग्राम बचते हैं?",
    "Yes, 5 kg 350 g: a kilogram was carried.": "हाँ, 5 किग्रा 350 ग्राम, 1 किग्रा हासिल के साथ।",
    "From 5 kg 140 g of flour, a baker uses 2 kg 380 g; how much flour is left?": "5 किग्रा 140 ग्राम आटे से बेकर ने 2 किग्रा 380 ग्राम लिया: कितना बचा?",
    "5 kg 140 g − 2 kg 380 g": "5 किग्रा 140 ग्राम − 2 किग्रा 380 ग्राम",
    "Take away the grams first, from the new grams on top.": "पहले ग्राम घटाओ, ऊपर के नए ग्राम में से।",
    "After borrowing, the top kilograms are one fewer.": "उधार लेने के बाद ऊपर के किलोग्राम एक कम हो जाते हैं।",
    "Take 380 g from 1,140 g, then 2 kg from the top kilograms.": "1,140 ग्राम में से 380 ग्राम घटाओ, फिर ऊपर के किग्रा में से 2 किग्रा।",
    "Yes, 2 kg 760 g of flour is left.": "हाँ, 2 किग्रा 760 ग्राम आटा बचा है।",
    "Add 2 kg 600 g of sugar and 1 kg 400 g of flour: what is the total weight?": "चीनी 2 किग्रा 600 ग्राम और आटा 1 किग्रा 400 ग्राम: कुल वज़न कितना?",
    "2 kg 600 g + 1 kg 400 g": "2 किग्रा 600 ग्राम + 1 किग्रा 400 ग्राम",
    "Add the grams first: what do 600 g and 400 g make?": "पहले ग्राम जोड़ो: 600 ग्राम और 400 ग्राम मिलकर कितने ग्राम?",
    "Count the kilograms too: 2 kg, 1 kg and the carried 1 kg.": "किग्रा भी गिनो: 2 किग्रा, 1 किग्रा और हासिल का 1 किग्रा।",
    "The carry took exactly 1,000 g: what stays in the grams column?": "हासिल में ठीक 1,000 ग्राम चले गए: ग्राम के खाने में क्या बचा?",
    "Yes, 4 kg 0 g: all the grams became 1 kg.": "हाँ, 4 किग्रा 0 ग्राम: सारे ग्राम मिलकर 1 किग्रा बन गए।",
    "Adding and subtracting weights": "वज़न जोड़ना और घटाना",
    "Tap the bag of rice to write its weight on the board.": "चावल की बोरी छुओ और उसका वज़न बोर्ड पर लिखो।",
    "Tap the rice bag first.": "ऊपर रखी चावल की बोरी छुओ।",
    "Now tap the mango to write its weight under the rice.": "अब आम छुओ और उसका वज़न चावल के नीचे लिखो।",
    "Tap the mango under the rice bag.": "चावल के नीचे वाला आम छुओ।",
    "Tap the board to add the grams, then the kilograms.": "पहले ग्राम, फिर किलोग्राम जोड़ने के लिए बोर्ड छुओ।",
    "Tap anywhere on the board.": "बोर्ड पर कहीं भी छुओ।",
    "Kilograms go under kilograms, grams under grams.": "किलोग्राम किलोग्राम के नीचे, ग्राम ग्राम के नीचे।",
    "Work the grams column before the kilograms.": "किलोग्राम से पहले ग्राम के खाने का काम करो।",
    "You worked out shopping weights in kg and g columns.": "तुमने किग्रा और ग्राम के खानों में खरीदारी के वज़न जोड़े और घटाए।",
    "You learned: add or take away shopping weights in kg and g.": "तुमने सीखा: किग्रा और ग्राम में खरीदारी के वज़न जोड़ो या घटाओ।",
    "A 2 kg 650 g watermelon and 1 kg 140 g of mangoes: how much in all?": "तरबूज़ 2 किग्रा 650 ग्राम, आम 1 किग्रा 140 ग्राम: कुल वज़न कितना?",
    "2 kg 650 g + 1 kg 140 g": "2 किग्रा 650 ग्राम + 1 किग्रा 140 ग्राम",
    "Put kg under kg, g under g, then add up each column.": "किग्रा के नीचे किग्रा, ग्राम के नीचे ग्राम रखो, फिर हर खाना जोड़ो।",
    "Do 650 g and 140 g reach 1,000 g?": "क्या 650 ग्राम और 140 ग्राम मिलकर 1,000 ग्राम तक पहुँचते हैं?",
    "Add each column on its own: no carry is needed.": "हर खाना अलग-अलग जोड़ो: हासिल की ज़रूरत नहीं है।",
    "Yes, together they weigh 3 kg 790 g.": "हाँ, फलों का वज़न मिलाकर 3 किग्रा 790 ग्राम है।",
    "Find the total: 3 kg of rice, a 2 kg 500 g watermelon, 600 g of mangoes.": "कुल वज़न निकालो: 3 किग्रा चावल, 2 किग्रा 500 ग्राम का तरबूज़, 600 ग्राम आम।",
    "3 kg + 2 kg 500 g + 600 g": "3 किग्रा + 2 किग्रा 500 ग्राम + 600 ग्राम",
    "Which column could spill over into the next one?": "कौन-सा खाना भरकर अगले खाने में जा सकता है?",
    "Add the grams of all three items: 1,000 g or more?": "तीनों चीज़ों के ग्राम जोड़ो: क्या वे 1,000 ग्राम या उससे ज़्यादा हैं?",
    "Every 1,000 g of the grams total is one more kilogram.": "ग्राम के जोड़ में हर 1,000 ग्राम से एक किलोग्राम और बन जाता है।",
    "Yes, it is 6 kg 100 g.": "हाँ, कुल 6 किग्रा 100 ग्राम।",
    "Take a 2 kg 600 g watermelon out of a 5 kg 50 g bag: how much is left?": "5 किग्रा 50 ग्राम के थैले से 2 किग्रा 600 ग्राम का तरबूज़ निकालो: कितना बचा?",
    "5 kg 50 g − 2 kg 600 g": "5 किग्रा 50 ग्राम − 2 किग्रा 600 ग्राम",
    "Start with the grams column: 50 g on top, 600 g below.": "ग्राम के खाने से शुरू करो: ऊपर 50 ग्राम, नीचे 600 ग्राम।",
    "Can 600 g come out of 50 g, or must you borrow?": "क्या 50 ग्राम में से 600 ग्राम निकल सकते हैं, या उधार लेना पड़ेगा?",
    "Borrow 1 kg as 1,000 g for the grams on top.": "ऊपर के ग्राम के लिए 1 किग्रा के 1,000 ग्राम उधार लो।",
    "Yes, 2 kg 450 g is left in the bag.": "हाँ, 2 किग्रा 450 ग्राम बचे।",
    "First tap Open to open the bags of rice.": "पहले खोलो बटन छुओ और चावल की बोरियाँ खोलो।",
    "Open the bags of rice first with the Open key.": "पहले खोलो बटन से चावल की बोरियाँ खोलो।",
    "First tap Gather to fill the bags with rice.": "पहले इकट्ठा करो बटन छुओ और बोरियों में चावल भरो।",
    "Gather the rice into the bags first.": "पहले चावल को बोरियों में इकट्ठा करो।",
    "First choose Carry or Borrow for the grams.": "पहले ग्राम के लिए हासिल या उधार चुनो।",
    "Pick Carry or Borrow before you answer.": "उत्तर देने से पहले हासिल या उधार चुनो।",
    "First tap each item to put its weight on the board.": "पहले हर चीज़ को छुओ और उसका वज़न बोर्ड पर रखो।",
    "Put every weight on the board first: tap the items.": "पहले हर वज़न बोर्ड पर रखो: चीज़ों को छुओ।",
    "Look at the grams column: too many grams, or too few?": "ग्राम का खाना देखो: ग्राम बहुत ज़्यादा हैं या बहुत कम?",
    "Check the grams column again before you choose.": "चुनने से पहले ग्राम के खाने को फिर से देखो।",
    "kilograms": "किलोग्राम",
    "kg": "किग्रा",
    "grams": "ग्राम",
    "g": "ग्राम",
    "Open": "खोलो",
    "Total": "कुल",
    "Gather": "इकट्ठा करो",
    "Carry": "हासिल",
    "Borrow": "उधार",
    "Left": "बचा",
    "Answer": "उत्तर",
    "Count this tray": "इस ट्रे को गिनो",
    "The rice that is left": "बचा हुआ चावल",
    "The grams column": "ग्राम का खाना",
    "The kilograms column": "किलोग्राम का खाना",
    "The bag of rice": "चावल की बोरी",
    "The watermelon": "तरबूज़",
    "The shopping bag": "खरीदारी का थैला",
    "The mango": "आम",
    "The column board": "खानों वाला बोर्ड",
    "A scale and bags of rice: let us see what is inside a kilogram.": "तराज़ू और चावल की बोरियाँ: आओ देखें एक किलोग्राम के अंदर क्या है।",
    "You changed kilograms and grams both ways, and you worked the columns grams first.": "तुमने किलोग्राम और ग्राम को दोनों तरह बदला, और खानों में पहले ग्राम का काम किया।",
    "How many grams are in one rice bag?": "चावल की एक बोरी में कितने ग्राम हैं?",
    "The bags are still closed: tap Open.": "बोरियाँ अभी बंद हैं: खोलो बटन छुओ।",
    "The rice is still in a heap: tap Gather.": "चावल अभी ढेर में है: इकट्ठा करो बटन छुओ।",
    "Decide: Carry or Borrow?": "पहले तय करो: हासिल या उधार?",
    "The board is still empty: tap the items.": "बोर्ड खाली है: चीज़ें छुओ।",
    "Look at both grams numbers, then choose again.": "ग्राम की दोनों संख्याएँ देखो, फिर से चुनो।",
    "Fill both boxes.": "दोनों जगह संख्या लिखो।",
  },
  gu: {
    "Weight Converter": "વજન બદલો",
    "Free play: choose how many bags of rice, then tap Open to see the grams.": "મુક્ત રમત: ચોખાની ગૂણ પસંદ કરો અને ગ્રામ જોવા ખોલો બટનને સ્પર્શ કરો.",
    "Kilograms into grams: multiply by 1000": "કિલોગ્રામમાંથી ગ્રામ: 1,000 વડે ગુણો",
    "Tap Open to see what is inside each 1 kg bag of rice.": "દરેક 1 કિગ્રાની ગૂણમાં શું છે તે જોવા ખોલો બટનને સ્પર્શ કરો.",
    "Tap the Open key below.": "નીચેનું ખોલો બટન સ્પર્શ કરો.",
    "Tap one tray to count its small 100 g bags.": "એક ટ્રેને સ્પર્શ કરો અને તેની નાની 100 ગ્રામની થેલીઓ ગણો.",
    "Tap a tray of small bags.": "નાની થેલીઓની એક ટ્રેને સ્પર્શ કરો.",
    "Tap Total to put the thousands together.": "હજારને જોડવા કુલ બટનને સ્પર્શ કરો.",
    "The Total key is below.": "કુલ બટન નીચે છે.",
    "Each opened bag is 1,000 g.": "દરેક ખુલ્લી ગૂણ 1,000 ગ્રામની છે.",
    "Thousands first, then any grams left over.": "પહેલાં હજાર, પછી બાકી ગ્રામ.",
    "One kilogram equals 1,000 grams, so multiply kilograms by 1,000.": "એક કિલોગ્રામમાં 1,000 ગ્રામ હોય છે, તેથી કિલોગ્રામને 1,000 વડે ગુણો.",
    "You learned: 1 kg is 1,000 g, so multiply kilograms by 1,000.": "તમે શીખ્યા: 1 કિગ્રામાં 1,000 ગ્રામ, તો કિગ્રાને 1,000 વડે ગુણો.",
    "The rice on the scale weighs 2 kg; how many grams is that?": "ત્રાજવા પર ચોખાનું વજન 2 કિગ્રા છે, તો તે કેટલા ગ્રામ થાય?",
    "2 kg in grams?": "2 કિગ્રામાં કેટલા ગ્રામ?",
    "How many grams did each opened bag show?": "દરેક ખુલ્લી ગૂણમાં કેટલા ગ્રામ દેખાયા?",
    "Count 1,000 g for every bag on the scale.": "ત્રાજવા પરની દરેક ગૂણના 1,000 ગ્રામ ગણો.",
    "Add 1,000 g for the first bag and 1,000 g for the second.": "પહેલી ગૂણના 1,000 ગ્રામ અને બીજી ગૂણના 1,000 ગ્રામ ઉમેરો.",
    "Yes, 2 kg is 2,000 g: each kilogram is 1,000 g.": "હા, 2 કિગ્રા એટલે 2,000 ગ્રામ: દરેક કિગ્રા 1,000 ગ્રામનો છે.",
    "How many grams in all is 4 kg 700 g of rice?": "હવે ચોખાનું વજન 4 કિગ્રા 700 ગ્રામ છે, તો કુલ કેટલા ગ્રામ થાય?",
    "4 kg 700 g in grams?": "4 કિગ્રા 700 ગ્રામમાં કેટલા ગ્રામ?",
    "Change 4 kg into grams first, then add the small bag.": "પહેલાં 4 કિગ્રાને ગ્રામમાં બદલો, પછી નાની થેલી ઉમેરો.",
    "Four opened bags make four thousands of grams.": "ખુલ્લી ચાર ગૂણથી ચાર હજાર ગ્રામ બને છે.",
    "Put the 700 g of the small bag on top of the thousands.": "નાની થેલીના 700 ગ્રામ હજારની ઉપર મૂકો.",
    "Yes, 4 kg 700 g is 4,700 g.": "હા, 4 કિગ્રા 700 ગ્રામ એટલે 4,700 ગ્રામ.",
    "This rice is 2 kg 90 g: write it in grams.": "આ ચોખાનું વજન 2 કિગ્રા 90 ગ્રામ છે: તેને ગ્રામમાં લખો.",
    "2 kg 90 g in grams?": "2 કિગ્રા 90 ગ્રામમાં કેટલા ગ્રામ?",
    "The 2 kg is two thousands; the small bag adds just 90 g.": "2 કિગ્રા એટલે બે હજાર, અને નાની થેલી ફક્ત 90 ગ્રામ ઉમેરે છે.",
    "Write the grams in three places: 90 g has no hundreds.": "ગ્રામ ત્રણ સ્થાનમાં લખો: 90 ગ્રામમાં શતકનો અંક નથી.",
    "Keep a 0 in the hundreds place after the thousands.": "હજાર પછી શતકના સ્થાને 0 રાખો.",
    "Yes, 2 kg 90 g is 2,090 g, with the 0 kept.": "હા, 2 કિગ્રા 90 ગ્રામ એટલે 2,090 ગ્રામ, 0 રાખીને.",
    "Grams into kilograms: divide by 1000": "ગ્રામમાંથી કિલોગ્રામ: 1,000 વડે ભાગો",
    "Tap Gather to fill bags from the heap, 1,000 g in each.": "ઢગલામાંથી ગૂણ ભરવા ભેગા કરો બટનને સ્પર્શ કરો, દરેકમાં 1,000 ગ્રામ.",
    "Tap the Gather key below.": "ભેગા કરો બટનને સ્પર્શ કરો.",
    "Tap the rice left in the ring to see its grams.": "વર્તુળમાં બાકી રહેલા ચોખાને સ્પર્શ કરો અને તેના ગ્રામ જુઓ.",
    "Tap the small heap inside the amber ring.": "પીળા વર્તુળની અંદરના નાના ઢગલાને સ્પર્શ કરો.",
    "Every full bag is 1 kg.": "દરેક ભરેલી ગૂણ એક કિલોગ્રામની છે.",
    "The rice outside the bags stays as grams.": "ગૂણની બહારના ચોખા ગ્રામમાં જ રહે છે.",
    "Every 1,000 grams make one kilogram, so divide by 1,000.": "દર 1,000 ગ્રામથી એક કિલોગ્રામ બને છે, તેથી 1,000 વડે ભાગો.",
    "You learned: every 1,000 g makes 1 kg, and the rest stays as grams.": "તમે શીખ્યા: દર 1,000 ગ્રામથી 1 કિગ્રા બને છે, બાકીનું ગ્રામ રહે છે.",
    "This heap of rice weighs 4,000 g; how many kilograms and grams is that?": "ચોખાના આ ઢગલાનું વજન 4,000 ગ્રામ છે: તે કેટલા કિલોગ્રામ અને ગ્રામ?",
    "4,000 g in kg and g?": "4,000 ગ્રામમાં કેટલા કિગ્રા અને ગ્રામ?",
    "Each bag holds 1,000 g: how many bags would the whole heap fill?": "દરેક ગૂણમાં 1,000 ગ્રામ: આખો ઢગલો કેટલી ગૂણ ભરશે?",
    "How many thousands are there in 4,000 g?": "4,000 ગ્રામમાં કેટલા હજાર?",
    "After the last full bag, is any rice left over?": "છેલ્લી ભરેલી ગૂણ પછી શું કંઈ ચોખા બાકી રહે છે?",
    "Yes, 4,000 g is 4 kg 0 g, nothing left.": "હા, તે 4 કિગ્રા 0 ગ્રામ છે, કંઈ બાકી નથી.",
    "Now gather 3,450 g of rice: how many kg, and how many g are left over?": "હવે 3,450 ગ્રામ ચોખા ભેગા કરો: કેટલા કિગ્રા, કેટલા ગ્રામ બાકી?",
    "3,450 g in kg and g?": "3,450 ગ્રામમાં કેટલા કિગ્રા અને ગ્રામ?",
    "How many 1,000 g bags can 3,450 g fill, and what is left over?": "3,450 ગ્રામથી 1,000 ગ્રામની કેટલી ગૂણ ભરાશે, અને કેટલું બાકી રહેશે?",
    "The thousands digit tells how many bags are full.": "હજારનો અંક કહે છે કે કેટલી ગૂણ ભરાઈ.",
    "The three digits after the comma are the grams left.": "કૉમા પછીના ત્રણ અંક તે ગ્રામ છે જે બાકી રહે છે.",
    "Yes, it is 3 kg 450 g.": "હા, 3,450 ગ્રામ એટલે 3 કિગ્રા 450 ગ્રામ.",
    "Gather 5,007 g of rice the same way: what is it in kg and g?": "5,007 ગ્રામ ચોખા આ જ રીતે ભેગા કરો: તે કેટલા કિગ્રા અને ગ્રામ છે?",
    "5,007 g in kg and g?": "5,007 ગ્રામમાં કેટલા કિગ્રા અને ગ્રામ?",
    "Count the thousands in 5,007 g for the bags, then what is left over.": "ગૂણ માટે 5,007 ગ્રામમાં હજાર ગણો, પછી જુઓ કેટલું બાકી રહ્યું.",
    "After the comma come 0, 0 and then one more digit.": "કૉમા પછી 0, 0 આવે છે અને પછી એક વધુ અંક.",
    "Zeros in front add nothing to a number of grams.": "આગળના શૂન્ય ગ્રામની સંખ્યામાં કંઈ ઉમેરતા નથી.",
    "Yes, 5,007 g is 5 kg 7 g.": "હા, 5,007 ગ્રામ એટલે 5 કિગ્રા 7 ગ્રામ.",
    "Kilograms and grams together": "કિલોગ્રામ અને ગ્રામ એકસાથે",
    "Tap the grams column to add the grams first.": "પહેલાં ગ્રામ ઉમેરવા ગ્રામની કૉલમને સ્પર્શ કરો.",
    "Tap the grams column.": "બોર્ડની ગ્રામની કૉલમને સ્પર્શ કરો.",
    "1,200 g is more than 1,000 g, so tap Carry.": "1,200 ગ્રામ 1,000 ગ્રામથી વધુ છે, તો વદી બટનને સ્પર્શ કરો.",
    "Carry is the key for grams that pass 1,000.": "જ્યારે ગ્રામ 1,000 થી વધી જાય, ત્યારે વદી બટન કામ આવે છે.",
    "Now tap the kg column to add the kilograms.": "હવે કિગ્રા ઉમેરવા કિગ્રાની કૉલમને સ્પર્શ કરો.",
    "The kg column is on the left of the board.": "કિગ્રાની કૉલમ બોર્ડની ડાબી બાજુ છે.",
    "Work the grams column before the kilograms column.": "કિલોગ્રામની કૉલમ પહેલાં ગ્રામની કૉલમનું કામ કરો.",
    "1,000 g is the same as 1 kg.": "1,000 ગ્રામ અને 1 કિગ્રા બરાબર હોય છે.",
    "Work the grams first: carry 1,000 g as 1 kg, or borrow 1 kg as 1,000 g.": "પહેલાં ગ્રામ: 1,000 ગ્રામનો 1 કિગ્રા વદી અથવા 1 કિગ્રાના 1,000 ગ્રામ ઉછીના.",
    "You learned: carry 1,000 g as 1 kg, or borrow 1 kg as 1,000 g.": "તમે શીખ્યા: 1,000 ગ્રામનો 1 કિગ્રા વદી, 1 કિગ્રાના 1,000 ગ્રામ ઉછીના.",
    "How much do 3 kg 750 g of rice and 1 kg 600 g of dal weigh in all?": "3 કિગ્રા 750 ગ્રામ ચોખા અને 1 કિગ્રા 600 ગ્રામ દાળ: કુલ વજન?",
    "3 kg 750 g + 1 kg 600 g": "3 કિગ્રા 750 ગ્રામ + 1 કિગ્રા 600 ગ્રામ",
    "Start with the grams column: 750 g and 600 g.": "ગ્રામની કૉલમથી શરૂ કરો: 750 ગ્રામ અને 600 ગ્રામ.",
    "750 g and 600 g make 1,000 g and some more grams.": "750 ગ્રામ અને 600 ગ્રામ મળીને 1,000 ગ્રામથી થોડા વધુ થાય.",
    "After the 1 kg is carried, how many grams are left over?": "1 કિગ્રા વદી લીધા પછી કેટલા ગ્રામ બાકી રહે છે?",
    "Yes, 5 kg 350 g: a kilogram was carried.": "હા, 5 કિગ્રા 350 ગ્રામ, 1 કિગ્રા વદી સાથે.",
    "From 5 kg 140 g of flour, a baker uses 2 kg 380 g; how much flour is left?": "5 કિગ્રા 140 ગ્રામ લોટમાંથી બેકર 2 કિગ્રા 380 ગ્રામ વાપરે છે: કેટલો લોટ બચ્યો?",
    "5 kg 140 g − 2 kg 380 g": "5 કિગ્રા 140 ગ્રામ − 2 કિગ્રા 380 ગ્રામ",
    "Take away the grams first, from the new grams on top.": "પહેલાં ગ્રામ બાદ કરો, ઉપરના નવા ગ્રામમાંથી.",
    "After borrowing, the top kilograms are one fewer.": "ઉછીના લીધા પછી ઉપરના કિલોગ્રામ એક ઓછા થાય છે.",
    "Take 380 g from 1,140 g, then 2 kg from the top kilograms.": "1,140 ગ્રામમાંથી 380 ગ્રામ બાદ કરો, પછી ઉપરના કિગ્રામાંથી 2 કિગ્રા.",
    "Yes, 2 kg 760 g of flour is left.": "હા, 2 કિગ્રા 760 ગ્રામ લોટ બાકી છે.",
    "Add 2 kg 600 g of sugar and 1 kg 400 g of flour: what is the total weight?": "2 કિગ્રા 600 ગ્રામ ખાંડ અને 1 કિગ્રા 400 ગ્રામ લોટ ઉમેરો: કુલ વજન કેટલું છે?",
    "2 kg 600 g + 1 kg 400 g": "2 કિગ્રા 600 ગ્રામ + 1 કિગ્રા 400 ગ્રામ",
    "Add the grams first: what do 600 g and 400 g make?": "પહેલાં ગ્રામ ઉમેરો: 600 ગ્રામ અને 400 ગ્રામ મળીને કેટલા ગ્રામ થાય?",
    "Count the kilograms too: 2 kg, 1 kg and the carried 1 kg.": "કિગ્રા પણ ગણો: 2 કિગ્રા, 1 કિગ્રા અને વદીનો 1 કિગ્રા.",
    "The carry took exactly 1,000 g: what stays in the grams column?": "વદીમાં બરાબર 1,000 ગ્રામ ગયા: ગ્રામની કૉલમમાં શું બાકી રહ્યું?",
    "Yes, 4 kg 0 g: all the grams became 1 kg.": "હા, 4 કિગ્રા 0 ગ્રામ: બધા ગ્રામ મળીને 1 કિગ્રા બની ગયા.",
    "Adding and subtracting weights": "વજન ઉમેરવું અને બાદ કરવું",
    "Tap the bag of rice to write its weight on the board.": "ચોખાની ગૂણને સ્પર્શ કરો અને તેનું વજન બોર્ડ પર લખો.",
    "Tap the rice bag first.": "ઉપરની ગૂણને સ્પર્શ કરો.",
    "Now tap the mango to write its weight under the rice.": "હવે કેરીને સ્પર્શ કરો અને તેનું વજન ચોખાની નીચે લખો.",
    "Tap the mango under the rice bag.": "નીચેની કેરીને સ્પર્શ કરો.",
    "Tap the board to add the grams, then the kilograms.": "પહેલાં ગ્રામ, પછી કિલોગ્રામ ઉમેરવા બોર્ડને સ્પર્શ કરો.",
    "Tap anywhere on the board.": "કૉલમવાળા બોર્ડ પર ગમે ત્યાં સ્પર્શ કરો.",
    "Kilograms go under kilograms, grams under grams.": "કિલોગ્રામ કિલોગ્રામની નીચે, ગ્રામ ગ્રામની નીચે.",
    "Work the grams column before the kilograms.": "કિલોગ્રામ પહેલાં ગ્રામની કૉલમનું કામ કરો.",
    "You worked out shopping weights in kg and g columns.": "તમે કિગ્રા અને ગ્રામની કૉલમમાં ખરીદીના વજન ઉમેર્યા અને બાદ કર્યા.",
    "You learned: add or take away shopping weights in kg and g.": "તમે શીખ્યા: કિગ્રા અને ગ્રામમાં ખરીદીના વજન ઉમેરો અથવા બાદ કરો.",
    "A 2 kg 650 g watermelon and 1 kg 140 g of mangoes: how much in all?": "તડબૂચ 2 કિગ્રા 650 ગ્રામ, કેરી 1 કિગ્રા 140 ગ્રામ: કુલ કેટલું?",
    "2 kg 650 g + 1 kg 140 g": "2 કિગ્રા 650 ગ્રામ + 1 કિગ્રા 140 ગ્રામ",
    "Put kg under kg, g under g, then add up each column.": "કિગ્રા નીચે કિગ્રા અને ગ્રામ નીચે ગ્રામ ગોઠવો, પછી દરેક કૉલમ ઉમેરો.",
    "Do 650 g and 140 g reach 1,000 g?": "શું 650 ગ્રામ અને 140 ગ્રામ મળીને 1,000 ગ્રામ સુધી પહોંચે છે?",
    "Add each column on its own: no carry is needed.": "દરેક કૉલમ અલગ-અલગ ઉમેરો: વદીની જરૂર નથી.",
    "Yes, together they weigh 3 kg 790 g.": "હા, ફળોનું વજન ભેગું 3 કિગ્રા 790 ગ્રામ છે.",
    "Find the total: 3 kg of rice, a 2 kg 500 g watermelon, 600 g of mangoes.": "કુલ વજન શોધો: 3 કિગ્રા ચોખા, 2 કિગ્રા 500 ગ્રામનું તડબૂચ, 600 ગ્રામ કેરી.",
    "3 kg + 2 kg 500 g + 600 g": "3 કિગ્રા + 2 કિગ્રા 500 ગ્રામ + 600 ગ્રામ",
    "Which column could spill over into the next one?": "કઈ કૉલમ ભરાઈને આગલી કૉલમમાં જઈ શકે?",
    "Add the grams of all three items: 1,000 g or more?": "ત્રણેય વસ્તુઓના ગ્રામ ઉમેરો: શું તે 1,000 ગ્રામ કે તેથી વધુ છે?",
    "Every 1,000 g of the grams total is one more kilogram.": "ગ્રામના સરવાળામાં દર 1,000 ગ્રામથી એક કિલોગ્રામ વધુ બને છે.",
    "Yes, it is 6 kg 100 g.": "હા, કુલ 6 કિગ્રા 100 ગ્રામ.",
    "Take a 2 kg 600 g watermelon out of a 5 kg 50 g bag: how much is left?": "5 કિગ્રા 50 ગ્રામની થેલીમાંથી 2 કિગ્રા 600 ગ્રામનું તડબૂચ કાઢો: કેટલું બાકી?",
    "5 kg 50 g − 2 kg 600 g": "5 કિગ્રા 50 ગ્રામ − 2 કિગ્રા 600 ગ્રામ",
    "Start with the grams column: 50 g on top, 600 g below.": "ગ્રામની કૉલમથી શરૂ કરો: ઉપર 50 ગ્રામ, નીચે 600 ગ્રામ.",
    "Can 600 g come out of 50 g, or must you borrow?": "શું 50 ગ્રામમાંથી 600 ગ્રામ નીકળી શકે, કે ઉછીના લેવા પડશે?",
    "Borrow 1 kg as 1,000 g for the grams on top.": "ઉપરના ગ્રામ માટે 1 કિગ્રાના 1,000 ગ્રામ ઉછીના લો.",
    "Yes, 2 kg 450 g is left in the bag.": "હા, બાકી 2 કિગ્રા 450 ગ્રામ.",
    "First tap Open to open the bags of rice.": "પહેલાં ખોલો બટનને સ્પર્શ કરો અને ચોખાની ગૂણ ખોલો.",
    "Open the bags of rice first with the Open key.": "પહેલાં ખોલો બટનથી ગૂણ ખોલો.",
    "First tap Gather to fill the bags with rice.": "પહેલાં ભેગા કરો બટનને સ્પર્શ કરો અને ગૂણમાં ચોખા ભરો.",
    "Gather the rice into the bags first.": "પહેલાં ચોખા ગૂણમાં ભરો.",
    "First choose Carry or Borrow for the grams.": "પહેલાં ગ્રામ માટે વદી કે ઉછીના પસંદ કરો.",
    "Pick Carry or Borrow before you answer.": "જવાબ આપતાં પહેલાં વદી કે ઉછીના પસંદ કરો.",
    "First tap each item to put its weight on the board.": "પહેલાં દરેક વસ્તુને સ્પર્શ કરો અને તેનું વજન બોર્ડ પર મૂકો.",
    "Put every weight on the board first: tap the items.": "પહેલાં દરેક વજન બોર્ડ પર મૂકો: વસ્તુઓને સ્પર્શ કરો.",
    "Look at the grams column: too many grams, or too few?": "ગ્રામની કૉલમ જુઓ: ગ્રામ બહુ વધુ છે કે બહુ ઓછા?",
    "Check the grams column again before you choose.": "પસંદ કરતાં પહેલાં ગ્રામની કૉલમ ફરી જુઓ.",
    "kilograms": "કિલોગ્રામ",
    "kg": "કિગ્રા",
    "grams": "ગ્રામ",
    "g": "ગ્રામ",
    "Open": "ખોલો",
    "Total": "કુલ",
    "Gather": "ભેગા કરો",
    "Carry": "વદી",
    "Borrow": "ઉછીના",
    "Left": "બાકી",
    "Answer": "જવાબ",
    "Count this tray": "આ ટ્રે ગણો",
    "The rice that is left": "બાકી રહેલા ચોખા",
    "The grams column": "ગ્રામની કૉલમ",
    "The kilograms column": "કિલોગ્રામની કૉલમ",
    "The bag of rice": "ચોખાની ગૂણ",
    "The watermelon": "તડબૂચ",
    "The shopping bag": "ખરીદીની થેલી",
    "The mango": "કેરી",
    "The column board": "કૉલમવાળું બોર્ડ",
    "A scale and bags of rice: let us see what is inside a kilogram.": "ત્રાજવું અને ચોખાની ગૂણ: ચાલો જોઈએ એક કિલોગ્રામની અંદર શું છે.",
    "You changed kilograms and grams both ways, and you worked the columns grams first.": "તમે કિલોગ્રામ અને ગ્રામને બંને રીતે બદલ્યા, અને કૉલમમાં પહેલાં ગ્રામનું કામ કર્યું.",
    "How many grams are in one rice bag?": "ચોખાની એક ગૂણમાં કેટલા ગ્રામ છે?",
    "The bags are still closed: tap Open.": "ગૂણ હજી બંધ છે: ખોલો બટનને સ્પર્શ કરો.",
    "The rice is still in a heap: tap Gather.": "ચોખા હજી ઢગલામાં છે: ભેગા કરો બટનને સ્પર્શ કરો.",
    "Decide: Carry or Borrow?": "નક્કી કરો: વદી કે ઉછીના?",
    "The board is still empty: tap the items.": "બોર્ડ હજી ખાલી છે: વસ્તુઓને સ્પર્શ કરો.",
    "Look at both grams numbers, then choose again.": "ગ્રામની બંને સંખ્યા જુઓ, પછી ફરી પસંદ કરો.",
    "Fill both boxes.": "બંને જગ્યાએ સંખ્યા લખો.",
  },
};

/* two answer boxes: kilograms and grams (PATTERNS §2); the label names the unit, so no unit is printed after the number
   (with one, Hindi and Gujarati printed "ग्राम ... ग्राम" in the grams box) */
const WC_KGG = [{ label: "kilograms" }, { label: "grams" }];

/* One entry per phase = one mount. Every phase opens on a guide-step WARM-UP (MODEL.warm[n]) whose result is none of
   the phase's answers; each question has its own miss and its own ladder (rungs 2 and 3), and a one-sentence win line. */
const PHASES = [
  {
    n: 1,
    concept: "Kilograms into grams: multiply by 1000",
    conceptId: "M1.S2.T5.C22", objectiveIds: ["O7"],
    says: [],
    /* warm-up: 3 bags of rice, 3 kg = 3,000 g (no question's answer) */
    steps: [
      { say: "Tap Open to see what is inside each 1 kg bag of rice.", on: "open", hint: "Tap the Open key below." },
      { say: "Tap one tray to count its small 100 g bags.", on: "count", hint: "Tap a tray of small bags." },
      { say: "Tap Total to put the thousands together.", on: "total", hint: "The Total key is below." },
    ],
    stepHold: 2600,
    ladder: ["Each opened bag is 1,000 g.", "Thousands first, then any grams left over."],
    closing: "One kilogram equals 1,000 grams, so multiply kilograms by 1,000.",
    learned: "You learned: 1 kg is 1,000 g, so multiply kilograms by 1,000.",
    traceback: "The opened bags light one by one, counted in kilograms, then the small bag of grams; the total is left for the child.",
    items: [
      /* learn WC1: answer in the plan = two thousand grams (plan: a bag of flour; here the rice on the scale) */
      { qid: "M1.S2.T5.C22:WC1", kind: "kg", kg: 2, g: 0, answer: 2000, near: 200,
        say: "The rice on the scale weighs 2 kg; how many grams is that?", ask: "2 kg in grams?",
        miss: "How many grams did each opened bag show?",
        ladder: ["Count 1,000 g for every bag on the scale.", "Add 1,000 g for the first bag and 1,000 g for the second."],
        win: "Yes, 2 kg is 2,000 g: each kilogram is 1,000 g.", winMs: 4200 },
      /* learn WC3 (moved from the plan's phase 3): answer in the plan = 4700 g */
      { qid: "M1.S2.T5.C24:WC3", kind: "kg", kg: 4, g: 700, answer: 4700, near: 47000,
        say: "How many grams in all is 4 kg 700 g of rice?", ask: "4 kg 700 g in grams?",
        miss: "Change 4 kg into grams first, then add the small bag.",
        ladder: ["Four opened bags make four thousands of grams.", "Put the 700 g of the small bag on top of the thousands."],
        win: "Yes, 4 kg 700 g is 4,700 g.", winMs: 4200 },
      /* practice 6 (moved from the plan's phase 3): answer in the plan = 2090 g, the zero kept (not 290 g) */
      { qid: "M1.S2.T5.C24:6", kind: "kg", kg: 2, g: 90, answer: 2090, near: 290,
        say: "This rice is 2 kg 90 g: write it in grams.", ask: "2 kg 90 g in grams?",
        miss: "The 2 kg is two thousands; the small bag adds just 90 g.",
        ladder: ["Write the grams in three places: 90 g has no hundreds.", "Keep a 0 in the hundreds place after the thousands."],
        win: "Yes, 2 kg 90 g is 2,090 g, with the 0 kept.", winMs: 4200 },
    ],
  },
  {
    n: 2,
    concept: "Grams into kilograms: divide by 1000",
    conceptId: "M1.S2.T5.C23", objectiveIds: ["O7"],
    says: [],
    /* warm-up: 2,300 g = 2 kg 300 g (no question's answer) */
    steps: [
      { say: "Tap Gather to fill bags from the heap, 1,000 g in each.", on: "gather", hint: "Tap the Gather key below." },
      { say: "Tap the rice left in the ring to see its grams.", on: "left", hint: "Tap the small heap inside the amber ring." },
    ],
    stepHold: 2600,
    ladder: ["Every full bag is 1 kg.", "The rice outside the bags stays as grams."],
    closing: "Every 1,000 grams make one kilogram, so divide by 1,000.",
    learned: "You learned: every 1,000 g makes 1 kg, and the rest stays as grams.",
    traceback: "The heap comes back whole and the 1 kg bags refill one by one, stopping one bag short: no count, no total, no Left ring.",
    items: [
      /* authored: the plan's three questions (WC2 17000 g, 2: 19000 g, 5: 29000 g) all leave 0 g and need 17 to 29 bags,
         each tagged 1,000 g, on one screen; the same kind (exact thousands) is kept with 4,000 g, the textbook's own example */
      { qid: null, kind: "group", grams: 4000, parts: WC_KGG, answer: [4, 0], near: [40, 0],
        say: "This heap of rice weighs 4,000 g; how many kilograms and grams is that?", ask: "4,000 g in kg and g?",
        miss: "Each bag holds 1,000 g: how many bags would the whole heap fill?",
        ladder: ["How many thousands are there in 4,000 g?", "After the last full bag, is any rice left over?"],
        win: "Yes, 4,000 g is 4 kg 0 g, nothing left.", winMs: 4200 },
      /* authored: grams left over (the owner's phase 2) */
      { qid: null, kind: "group", grams: 3450, parts: WC_KGG, answer: [3, 450], near: [34, 50],
        say: "Now gather 3,450 g of rice: how many kg, and how many g are left over?", ask: "3,450 g in kg and g?",
        miss: "How many 1,000 g bags can 3,450 g fill, and what is left over?",
        ladder: ["The thousands digit tells how many bags are full.", "The three digits after the comma are the grams left."],
        win: "Yes, it is 3 kg 450 g.", winMs: 4200 },
      /* authored: the zero case (5,007 g) */
      { qid: null, kind: "group", grams: 5007, parts: WC_KGG, answer: [5, 7], near: [5, 70],
        say: "Gather 5,007 g of rice the same way: what is it in kg and g?", ask: "5,007 g in kg and g?",
        miss: "Count the thousands in 5,007 g for the bags, then what is left over.",
        ladder: ["After the comma come 0, 0 and then one more digit.", "Zeros in front add nothing to a number of grams."],
        win: "Yes, 5,007 g is 5 kg 7 g.", winMs: 4200 },
    ],
  },
  {
    n: 3,
    concept: "Kilograms and grams together",
    conceptId: "M1.S2.T5.C24", objectiveIds: ["O7"],
    says: [],
    /* warm-up: 1 kg 500 g + 2 kg 700 g = 4 kg 200 g (no question's answer) */
    steps: [
      { say: "Tap the grams column to add the grams first.", on: "grams", hint: "Tap the grams column." },
      { say: "1,200 g is more than 1,000 g, so tap Carry.", on: "carry", hint: "Carry is the key for grams that pass 1,000." },
      { say: "Now tap the kg column to add the kilograms.", on: "kg", hint: "The kg column is on the left of the board." },
    ],
    stepHold: 2800,
    ladder: ["Work the grams column before the kilograms column.", "1,000 g is the same as 1 kg."],
    closing: "Work the grams first: carry 1,000 g as 1 kg, or borrow 1 kg as 1,000 g.",
    learned: "You learned: carry 1,000 g as 1 kg, or borrow 1 kg as 1,000 g.",
    traceback: "The grams column lights first, the carry or the borrow shows again, then the kilograms column lights; the answer row stays empty.",
    items: [
      /* authored: an addition with a carry (the plan's WC4 has no carry, so it went to phase 4 where the act is Place) */
      { qid: null, kind: "col", rows: [[3, 750], [1, 600]], op: "+", act: "carry", parts: WC_KGG, answer: [5, 350], near: [4, 1350],
        say: "How much do 3 kg 750 g of rice and 1 kg 600 g of dal weigh in all?", ask: "3 kg 750 g + 1 kg 600 g",
        miss: "Start with the grams column: 750 g and 600 g.",
        ladder: ["750 g and 600 g make 1,000 g and some more grams.", "After the 1 kg is carried, how many grams are left over?"],
        win: "Yes, 5 kg 350 g: a kilogram was carried.", winMs: 4200 },
      /* practice 7: answer in the plan = 2 kg 760 g (borrow: 1140 g minus 380 g, 4 kg minus 2 kg) */
      { qid: "M1.S2.T5.C25:7", kind: "col", rows: [[5, 140], [2, 380]], op: "−", act: "borrow", parts: WC_KGG, answer: [2, 760], near: [3, 240],
        say: "From 5 kg 140 g of flour, a baker uses 2 kg 380 g; how much flour is left?", ask: "5 kg 140 g − 2 kg 380 g",
        miss: "Take away the grams first, from the new grams on top.",
        ladder: ["After borrowing, the top kilograms are one fewer.", "Take 380 g from 1,140 g, then 2 kg from the top kilograms."],
        win: "Yes, 2 kg 760 g of flour is left.", winMs: 4200 },
      /* authored: the zero case, a carry that leaves 0 g */
      { qid: null, kind: "col", rows: [[2, 600], [1, 400]], op: "+", act: "carry", parts: WC_KGG, answer: [4, 0], near: [3, 1000],
        say: "Add 2 kg 600 g of sugar and 1 kg 400 g of flour: what is the total weight?", ask: "2 kg 600 g + 1 kg 400 g",
        miss: "Add the grams first: what do 600 g and 400 g make?",
        ladder: ["Count the kilograms too: 2 kg, 1 kg and the carried 1 kg.", "The carry took exactly 1,000 g: what stays in the grams column?"],
        win: "Yes, 4 kg 0 g: all the grams became 1 kg.", winMs: 4200 },
    ],
  },
  {
    n: 4,
    concept: "Adding and subtracting weights",
    conceptId: "M1.S2.T5.C25", objectiveIds: ["O8"],
    says: [],
    /* warm-up: a bag of rice 1 kg 200 g and a mango 300 g = 1 kg 500 g (no question's answer) */
    steps: [
      { say: "Tap the bag of rice to write its weight on the board.", on: "rice", hint: "Tap the rice bag first." },
      { say: "Now tap the mango to write its weight under the rice.", on: "mango", hint: "Tap the mango under the rice bag." },
      { say: "Tap the board to add the grams, then the kilograms.", on: "add", hint: "Tap anywhere on the board." },
    ],
    stepHold: 2400,
    ladder: ["Kilograms go under kilograms, grams under grams.", "Work the grams column before the kilograms."],
    closing: "You worked out shopping weights in kg and g columns.",
    learned: "You learned: add or take away shopping weights in kg and g.",
    traceback: "The grams column lights first, a carry or a borrow is drawn, then the kilograms column lights; the answer row stays empty.",
    items: [
      /* learn WC4 (moved from the plan's phase 4 order): answer in the plan = 3 kg 790 g; the plan's apples and oranges are
         the watermelon and the mangoes here (the pictures this slot has), the numbers unchanged */
      { qid: "M1.S2.T5.C25:WC4", kind: "shop", op: "+", parts: WC_KGG, answer: [3, 790], near: [0, 793],
        items: [{ id: "melon", sk: "watermelon", kg: 2, g: 650 }, { id: "mango", sk: "mango", m: 3, kg: 1, g: 140 }],
        say: "A 2 kg 650 g watermelon and 1 kg 140 g of mangoes: how much in all?", ask: "2 kg 650 g + 1 kg 140 g",
        miss: "Put kg under kg, g under g, then add up each column.",
        ladder: ["Do 650 g and 140 g reach 1,000 g?", "Add each column on its own: no carry is needed."],
        win: "Yes, together they weigh 3 kg 790 g.", winMs: 4200 },
      /* authored: the total of three items, with a carry */
      { qid: null, kind: "shop", op: "+", parts: WC_KGG, answer: [6, 100], near: [5, 1100],
        items: [{ id: "rice", sk: "sack", kg: 3, g: 0 }, { id: "melon", sk: "watermelon", kg: 2, g: 500 }, { id: "mango", sk: "mango", m: 2, kg: 0, g: 600 }],
        say: "Find the total: 3 kg of rice, a 2 kg 500 g watermelon, 600 g of mangoes.", ask: "3 kg + 2 kg 500 g + 600 g",
        miss: "Which column could spill over into the next one?",
        ladder: ["Add the grams of all three items: 1,000 g or more?", "Every 1,000 g of the grams total is one more kilogram."],
        win: "Yes, it is 6 kg 100 g.", winMs: 4200 },
      /* authored: the weight remaining after an item is taken out (a borrow, and 50 g written in three places) */
      { qid: null, kind: "shop", op: "−", parts: WC_KGG, answer: [2, 450], near: [3, 550],
        items: [{ id: "bag", sk: "bag", kg: 5, g: 50 }, { id: "melon", sk: "watermelon", kg: 2, g: 600 }],
        say: "Take a 2 kg 600 g watermelon out of a 5 kg 50 g bag: how much is left?", ask: "5 kg 50 g − 2 kg 600 g",
        miss: "Start with the grams column: 50 g on top, 600 g below.",
        ladder: ["Can 600 g come out of 50 g, or must you borrow?", "Borrow 1 kg as 1,000 g for the grams on top."],
        win: "Yes, 2 kg 450 g is left in the bag.", winMs: 4200 },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL: any = {
  unitFact: "1 kg = 1,000 g",
  warm: {
    1: { kind: "kg", kg: 3, g: 0 },
    2: { kind: "group", grams: 2300 },
    3: { kind: "col", rows: [[1, 500], [2, 700]], op: "+", act: "carry" },
    4: { kind: "shop", op: "+", items: [{ id: "rice", sk: "sack", kg: 1, g: 200 }, { id: "mango", sk: "mango", m: 1, kg: 0, g: 300 }] },
  },
  free: { kind: "kg", kg: 2, g: 0 },
  /* the sidecar's guide.answerGate note (PATTERNS 19): no sidecar writer exists, so it lives here (MODEL travels) */
  answerGate: "Every question is gated by its act (user mode, after a real touch): P1 Open (the hand opens each 1 kg bag); " +
    "P2 Gather (the hand fills a 1 kg bag for every 1,000 g); P3 the right one of Carry and Borrow (shown together; the other " +
    "gets a nudge and costs no try); P4 a tap on each item (its weight goes into the columns). No question is ungated.",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route (digit strings, never the judge or the picture) */
const wcPad3 = (g: number) => ("000" + String(g)).slice(-3);
const wcAsG = (kg: number, g: number) => Number(String(kg) + wcPad3(g));
const wcSplit = (grams: number) => { const s = String(grams); return s.length > 3 ? [Number(s.slice(0, -3)), Number(s.slice(-3))] : [0, grams]; };
const wcOracle = (it: any) => {
  if (it.kind === "kg") return wcAsG(it.kg, it.g) === it.answer;
  if (it.kind === "group") { const [a, b] = wcSplit(it.grams); return a === it.answer[0] && b === it.answer[1]; }
  const rows = it.kind === "shop" ? it.items.map((x: any) => [x.kg, x.g]) : it.rows;
  const tot = it.op === "+" ? rows.reduce((s: number, r: any) => s + wcAsG(r[0], r[1]), 0) : wcAsG(rows[0][0], rows[0][1]) - wcAsG(rows[1][0], rows[1][1]);
  const [a, b] = wcSplit(tot);
  return a === it.answer[0] && b === it.answer[1];
};
const oracle = () => PHASES.every((p: any) => p.items.length === 3 && p.items.every((it: any) => wcOracle(it)));
/* the misconception of each question: x100, the numbers pushed together, a zero dropped, no carry, smaller from larger */
const nearMiss = (item: any) => (item.parts ? item.near.join("|") : item.near);
/* the forms of an answer no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts
  ? [`${item.answer[0]} kg ${indian(item.answer[1])} g`, ...(item.answer[1] >= 10 ? [`${indian(item.answer[1])} g`] : []), ...(item.answer[0] >= 10 ? [`${item.answer[0]} kg`] : [])]
  : [String(item.answer), indian(item.answer), words(item.answer)]);
const agentKey = (item: any) => item.answer;
/* typed numbers print with Indian commas from 1,000 ("4,700 g"; a grams box "1,350"); the single box adds its unit (a part
   box draws its own); a leading zero the child typed ("050", "007") stays exactly as typed */
const format = (v: any, j: any, o: any) => {
  const s = v === null || v === undefined ? "" : String(v);
  if (!/^\d+$/.test(s)) return v;
  const shown = /^[1-9]\d{3,}$/.test(s) ? indian(Number(s)) : s;
  return j === undefined ? `${shown} ${o && o.tx ? o.tx("g") : "g"}` : shown;
};

/* the dev driver and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => undefined;
/* the agent's check(): at an open question it performs the act at once (never gated); in a guide step it returns
   undefined, so the agent's check() reaches api.onEnter and performs the current step */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── colours, words and drawing helpers (prefixed wc: tools and the runtime share one scope) ── */
const WC_COL: any = {
  given: { fill: "#E6F1FA", stroke: "#0072B2", ink: "#00507E" },
  answer: { fill: "#E1F5EC", stroke: "#009E73", ink: "#006548" },
  fact: { fill: "#FFFFFF", stroke: "#D55E00", ink: "#9A3A00" },
  second: { fill: "#FFF2D6", stroke: "#E69F00", ink: "#7A5000" },
  count: { fill: "#FFFFFF", stroke: "#2B2B2B", ink: "#2B2B2B" },
};
const WC_GREY = "#767676";
const WC_LIT = "#FFE9A8";
const WC_KEYS: any = { open: "Open", total: "Total", gather: "Gather", carry: "Carry", borrow: "Borrow" };
/* the gate's nudge names the ACT; two forms, alternating by question */
const WC_NUDGE: any = {
  open: ["First tap Open to open the bags of rice.", "Open the bags of rice first with the Open key.", "The bags are still closed: tap Open."],
  gather: ["First tap Gather to fill the bags with rice.", "Gather the rice into the bags first.", "The rice is still in a heap: tap Gather."],
  choose: ["First choose Carry or Borrow for the grams.", "Pick Carry or Borrow before you answer.", "Decide: Carry or Borrow?"],
  place: ["First tap each item to put its weight on the board.", "Put every weight on the board first: tap the items.", "The board is still empty: tap the items."],
  wrongKey: ["Look at the grams column: too many grams, or too few?", "Check the grams column again before you choose.", "Look at both grams numbers, then choose again."],
};
/* Enter on a two-box answer with a box still empty (it names no value) */
const WC_FILL = "Fill both boxes.";
const wcGr = (n: number, tx: any) => `${indian(n)} ${tx("g")}`;
/* a weight as written on a tag: the zero part left out (3 kg, 600 g) */
const wcKgG = (kg: number, g: number, tx: any) => (kg && g ? `${kg} ${tx("kg")} ${g} ${tx("g")}` : kg ? `${kg} ${tx("kg")}` : `${g} ${tx("g")}`);
/* an answer: both parts always (4 kg 0 g) */
const wcAns = (kg: number, g: number, tx: any) => `${kg} ${tx("kg")} ${indian(g)} ${tx("g")}`;

/* the width a label takes, measured with the runtime's own font stack on a canvas (no layout needed), so a Hindi or
   Gujarati tag is sized to its own text; an estimate where there is no canvas */
let WC_CTX: any = null;
function wcTW(s: any, size: number) {
  const t = String(s);
  try {
    if (!WC_CTX && typeof document !== "undefined") WC_CTX = document.createElement("canvas").getContext("2d");
    if (WC_CTX) { WC_CTX.font = `700 ${size}px ${FONT}`; return WC_CTX.measureText(t).width * 1.05; }
  } catch (e) { WC_CTX = null; }
  let w = 0;
  for (const ch of t) { const c = ch.codePointAt(0) || 0; w += c >= 0x0a80 && c <= 0x0aff ? 0.66 : c >= 0x0900 && c <= 0x097f ? 0.56 : /[ ,.]/.test(ch) ? 0.3 : 0.6; }
  return w * size;
}
const wcIndic = (s: any) => /[ऀ-૿]/.test(String(s));
/* a line's ink above and below its baseline (em): Devanagari and Gujarati rise and fall further than Latin */
const wcLineH = (s: any) => (wcIndic(s) ? 1.43 : 1.0);
/* two lines for a weight that does not fit on one: the kg part over the g part, or the number over its unit */
const wcSplit2 = (s: string) => { const t = s.split(" "); return t.length >= 4 ? [t.slice(0, 2).join(" "), t.slice(2).join(" ")] : t.length >= 2 ? [t[0], t.slice(1).join(" ")] : [s]; };
/* a tag that takes the size of its text (never a smaller font): one line when it fits maxW, else two;
   ax: c | l | r (x is its centre, left or right), ay: m | t | b (y is its middle, top or bottom) */
function wcChip(k: string, x: number, y: number, ax: string, ay: string, role: string, text: string, size: number, maxW: number, extra?: any, pad = 22) {
  const c = WC_COL[role], s = String(text);
  const lines = wcTW(s, size) + pad <= maxW ? [s] : wcSplit2(s);
  const w = Math.max(56, ...lines.map((l) => wcTW(l, size) + pad));
  const gap = 0.18 * size, inks = lines.map((l) => wcLineH(l) * size);
  const h = Math.round(16 + inks.reduce((a, b) => a + b, 0) + gap * (lines.length - 1));
  const left = ax === "l" ? x : ax === "r" ? x - w : x - w / 2, top = ay === "t" ? y : ay === "b" ? y - h : y - h / 2;
  let yy = top + 8;
  const base = lines.map((l, i) => { const asc = (wcIndic(l) ? 1.02 : 0.76) * size, b = yy + asc; yy += inks[i] + gap; return b; });
  return (
    <g key={k} {...(extra || {})}>
      <rect x={left} y={top} width={w} height={h} rx={Math.min(18, h / 2.6)} fill={c.fill} stroke={c.stroke} strokeWidth={role === "fact" ? 4 : 3} filter="url(#wc-shadow)" />
      <rect x={left + 3} y={top + 3} width={w - 6} height={Math.max(4, h * 0.3)} rx={Math.min(15, h / 2.6 - 2)} fill="#FFFFFF" fillOpacity={0.35} pointerEvents="none" />
      {lines.map((l, i) => <text key={i} x={left + w / 2} y={base[i]} textAnchor="middle" fontSize={size} fontWeight={700} fill={c.ink}>{l}</text>)}
    </g>
  );
}
/* the width a one-line chip of this text needs (layouts use it to leave room) */
const wcChipW = (text: string, size: number, pad = 22) => wcTW(text, size) + pad;
/* the width wcChip will draw it at: one line when it fits maxW, else its two lines */
const wcChipFitW = (text: string, size: number, maxW: number, pad = 22) => {
  const one = wcTW(text, size) + pad;
  return one <= maxW ? one : Math.max(...wcSplit2(String(text)).map((l) => wcTW(l, size) + pad));
};
const WC_TOTE_MAX = 130;   /* the widest chip a tote carries on one line */
/* an equality on one tag ("1 kg = 1,000 g"), set as two short labels round the sign; it takes the width of its text */
function wcEqTag(k: string, x: number, y: number, ax: string, role: string, left: string, right: string) {
  const c = WC_COL[role], sz = T.label, lw = wcTW(left, sz), rw = wcTW(right, sz), sw = wcTW("=", sz);
  const w = 22 + lw + 18 + sw + 18 + rw + 22, ind = wcIndic(left + right), h = Math.round(16 + (ind ? 1.43 : 1.0) * sz);
  const x0 = ax === "r" ? x - w : ax === "c" ? x - w / 2 : x, by = y + 8 + (ind ? 1.02 : 0.76) * sz;
  return (
    <g key={k}>
      <rect x={x0} y={y} width={w} height={h} rx={Math.min(18, h / 2.6)} fill={c.fill} stroke={c.stroke} strokeWidth={role === "fact" ? 4 : 3} filter="url(#wc-shadow)" />
      <rect x={x0 + 3} y={y + 3} width={w - 6} height={Math.max(4, h * 0.3)} rx={Math.min(15, h / 2.6 - 2)} fill="#FFFFFF" fillOpacity={0.35} pointerEvents="none" />
      <text x={x0 + 22 + lw} y={by} textAnchor="end" fontSize={sz} fontWeight={700} fill={c.ink}>{left}</text>
      <text x={x0 + 22 + lw + 18 + sw / 2} y={by} textAnchor="middle" fontSize={sz} fontWeight={700} fill={c.ink}>=</text>
      <text x={x0 + w - 22} y={by} textAnchor="end" fontSize={sz} fontWeight={700} fill={c.ink}>{right}</text>
    </g>
  );
}
/* the green Answer tag: drawn only at the win (data-reveals); its value at 40, or 32 when 40 would pass maxW */
function wcAnsTag(k: string, x: number, y: number, ax: string, maxW: number, value: string, tx: any) {
  const c = WC_COL.answer, lab = tx("Answer"), lw = wcTW(lab, T.label);
  const vs = 18 + lw + 20 + wcTW(value, T.prompt) + 18 <= maxW ? T.prompt : T.label;
  const w = 18 + lw + 20 + wcTW(value, vs) + 18, ind = wcIndic(value + lab), h = Math.round(16 + (ind ? 1.43 : 1.0) * vs);
  const x0 = ax === "c" ? x - w / 2 : ax === "r" ? x - w : x, by = y + 8 + (ind ? 1.02 : 0.76) * vs;
  return (
    <g key={k} data-reveals="answer">
      <rect x={x0} y={y} width={w} height={h} rx={16} fill={c.fill} stroke={c.stroke} strokeWidth={4} filter="url(#wc-shadow)" />
      <rect x={x0 + 3} y={y + 3} width={w - 6} height={Math.max(4, h * 0.3)} rx={13} fill="#FFFFFF" fillOpacity={0.4} pointerEvents="none" />
      <text x={x0 + 18} y={by} fontSize={T.label} fontWeight={700} fill={c.ink}>{lab}</text>
      <text x={x0 + w - 18} y={by} textAnchor="end" fontSize={vs} fontWeight={700} fill={c.ink}>{value}</text>
    </g>
  );
}
/* the plain shape under a photo is drawn only when the photo will not be: no picture, skins off (the checks' plain run),
   or a picture that failed to decode (probed once through window.Image); under a decoded photo it would peek out */
const WC_BAD: any = {};
function wcPlain(name: string) {
  const src = typeof TOOL_IMAGES !== "undefined" ? (TOOL_IMAGES as any)[name] : "";
  if (!SKINS || !src || WC_BAD[name]) return true;
  if (WC_BAD[name] === undefined) {
    WC_BAD[name] = false;
    try { const im = new (window as any).Image(); im.onerror = () => { WC_BAD[name] = true; }; im.src = src; } catch (e) { WC_BAD[name] = true; }
  }
  return false;
}
function wcSackShape(x: number, y: number, w: number, h: number) {
  const v = wcPlain("sack") ? 1 : 0;
  return (
    <g pointerEvents="none" fillOpacity={v} strokeOpacity={v}>
      <path d={`M ${x + w * 0.16} ${y + h * 0.18} Q ${x + w * 0.5} ${y + h * 0.05} ${x + w * 0.84} ${y + h * 0.18} L ${x + w * 0.94} ${y + h * 0.9} Q ${x + w * 0.5} ${y + h * 0.99} ${x + w * 0.06} ${y + h * 0.9} Z`}
        fill="url(#wc-sack-bg)" stroke="#7A5A2E" strokeWidth={3} />
      <path d={`M ${x + w * 0.3} ${y + h * 0.22} Q ${x + w * 0.5} ${y + h * 0.26} ${x + w * 0.7} ${y + h * 0.22}`} fill="none" stroke="#5A3E1B" strokeWidth={3} />
    </g>
  );
}
/* a small 100 g paper bag (ten in every opened kilogram), drawn in code */
function wcPacket(k: string, x: number, y: number, w: number, h: number, lit: boolean) {
  return (
    <g key={k}>
      {/* a small paper packet: a folded top over a full body, a dark ink edge so it reads from the back bench */}
      <path d={`M ${x + w * 0.18} ${y} L ${x + w * 0.82} ${y} L ${x + w * 0.92} ${y + h * 0.32} L ${x + w * 0.08} ${y + h * 0.32} Z`} fill={lit ? "#F5B94A" : "#E8D6AE"} stroke="#5C4320" strokeWidth={2} />
      <rect x={x + w * 0.04} y={y + h * 0.3} width={w * 0.92} height={h * 0.7} rx={4} fill={lit ? "#FFD27A" : "#F7EBD0"} stroke="#5C4320" strokeWidth={2} />
    </g>
  );
}
function wcMangoShape(k: string, x: number, y: number, w: number, h: number) {
  return (
    <g key={k} filter="url(#wc-shadow)">
      <ellipse cx={x + w / 2} cy={y + h / 2} rx={w * 0.46} ry={h * 0.42} fill="#F2B233" stroke="#A86A12" strokeWidth={2.5} fillOpacity={wcPlain("mango") ? 1 : 0} strokeOpacity={wcPlain("mango") ? 1 : 0} />
      <Skin name="mango" x={x} y={y} w={w} h={h} />
    </g>
  );
}
function wcMelonShape(k: string, x: number, y: number, w: number, h: number) {
  return (
    <g key={k} filter="url(#wc-shadow)">
      <ellipse cx={x + w / 2} cy={y + h / 2} rx={w * 0.47} ry={h * 0.44} fill="#3E8E41" stroke="#1F5A22" strokeWidth={3} fillOpacity={wcPlain("watermelon") ? 1 : 0} strokeOpacity={wcPlain("watermelon") ? 1 : 0} />
      {[-0.25, 0, 0.25].map((d, i) => <path key={i} d={`M ${x + w * (0.5 + d)} ${y + h * 0.1} Q ${x + w * (0.5 + d * 1.3)} ${y + h / 2} ${x + w * (0.5 + d)} ${y + h * 0.9}`} fill="none" stroke="#1F5A22" strokeWidth={3} strokeOpacity={wcPlain("watermelon") ? 1 : 0} />)}
      <Skin name="watermelon" x={x} y={y} w={w} h={h} />
    </g>
  );
}
function wcBagShape(k: string, x: number, y: number, w: number, h: number, v = 1) {
  return (
    <g key={k} filter={v ? "url(#wc-shadow)" : undefined} fillOpacity={v} strokeOpacity={v}>
      <path d={`M ${x + w * 0.3} ${y + h * 0.26} Q ${x + w * 0.3} ${y} ${x + w * 0.5} ${y} Q ${x + w * 0.7} ${y} ${x + w * 0.7} ${y + h * 0.26}`} fill="none" stroke="#7A5A2E" strokeWidth={5} />
      <rect x={x + w * 0.06} y={y + h * 0.24} width={w * 0.88} height={h * 0.74} rx={12} fill="#E9D3A6" stroke="#7A5A2E" strokeWidth={3} />
      <line x1={x + w * 0.06} y1={y + h * 0.38} x2={x + w * 0.94} y2={y + h * 0.38} stroke="#B9965C" strokeWidth={3} />
    </g>
  );
}
/* the cloth tote (a bag of grams, the shopping bag): its photo (86 x 140) over the code bag, which shows only without it */
function wcToteArt(k: string, x: number, y: number, w: number, h: number) {
  return (
    <g key={k}>
      {wcBagShape(k + "p", x, y, w, h, wcPlain("tote") ? 1 : 0)}
      <Skin name="tote" x={x} y={y} w={w} h={h} />
    </g>
  );
}
/* an item of the shopping phase, in a box of its picture's own aspect */
function wcItemArt(k: string, sk: string, m: number, x: number, y: number, maxW: number, maxH: number) {
  if (sk === "sack") { const h = maxH, w = h * 0.75; return <g key={k} filter="url(#wc-shadow)">{wcSackShape(x + (maxW - w) / 2, y, w, h)}<Skin name="sack" x={x + (maxW - w) / 2} y={y} w={w} h={h} /></g>; }
  if (sk === "watermelon") { const w = Math.min(maxW, maxH * 1.39), h = w / 1.39; return wcMelonShape(k, x + (maxW - w) / 2, y + (maxH - h) / 2, w, h); }
  if (sk === "bag") { const w = Math.min(maxW, (maxH * 86) / 140); return wcToteArt(k, x + (maxW - w) / 2, y, w, maxH); }
  /* mangoes: one, two side by side, or two with one on top */
  const n = Math.max(1, m || 1), mw = n === 1 ? Math.min(maxW, maxH * 1.19) : n === 2 ? Math.min(maxW * 0.6, maxH * 1.19) : Math.min(maxW * 0.55, maxH * 0.6 * 1.19), mh = mw / 1.19;
  const spots = n === 1 ? [[(maxW - mw) / 2, (maxH - mh) / 2]] : n === 2 ? [[0, (maxH - mh) / 2], [maxW - mw, (maxH - mh) / 2]] : [[0, maxH - mh], [maxW - mw, maxH - mh], [(maxW - mw) / 2, 0]];
  return <g key={k}>{spots.map((p, i) => wcMangoShape(k + i, x + p[0], y + p[1], mw, mh))}</g>;
}

/* ── layouts, from the room the working area has (box.w), plain arithmetic ── */
/* P1: the trays stand far enough apart that each one's "1,000 g" chip (cw, measured in the language in use) and the small
   bag's chip (pw2) sit on one line above it; the bags keep their own 3:4 box */
/* P1: cw = the "1,000 g" chip's width over each tray, pcw = the small tote's own chip (drawn on the tote) */
/* plateH = the plate chip's height, tagB = the bottom of the top-row tags, chipH = a tray chip's height: the column stands
   between them, its body 19 short of the Open key's ring (key 436, ring 427), the trays (3:4 sacks) as tall as the room
   leaves, 149 at most; fits = false when the trays would drop under 120 or the row runs past the card */
/* sw = the "1 kg" chip on a closed sack: the tote stands 20 or more clear of the last sack's chip */
function wcG1(W: number, kg: number, g: number, cw: number, pcw: number, plateW: number, plateH = 64, tagB = 50, chipH = 48, sw = 0) {
  /* the tray chips stand 22 under the top-row tag, rect to rect (16+ of clear ink past both 4 px outlines) */
  const bodyH = Math.max(88, plateH + 16), room = 408 - (tagB + 22 + chipH) - 22;
  const gh = Math.min(149, room - bodyH), gw = Math.round(gh * 0.752), ph = 124, pw = Math.round((ph * 86) / 140);   /* the tote photo is 86 x 140 */
  const slack = room - bodyH - gh, chipB = tagB + 22 + chipH + Math.floor(slack / 2), ty = chipB + 6, panY = ty + gh;
  const pitch = Math.max(gw + 34, cw + 20), gap = pitch - gw;        /* 20 between two "1,000 g" chips */
  const over = Math.max(0, (cw - gw) / 2);                           /* a chip wider than its tray hangs over it */
  const row = kg * gw + (kg - 1) * gap, tcR = row / 2;
  const bodyW = Math.min(W - 16, Math.max(300, plateW + 72));        /* the plate on one line, 16 clear of the slanted sides */
  /* the tote stands right of the trays; its own chip sits on one line under the pan, its right edge with the tote right edge,
     16 or more clear of the body */
  const toteCxR = g > 0 ? Math.max(row + 24 + pw / 2, row - gw / 2 + sw / 2 + 20 + pw / 2, tcR + bodyW / 2 + 16 + pcw - pw / 2) : 0;
  const chipLR = g > 0 ? Math.max(tcR + bodyW / 2 + 16, toteCxR + pw / 2 - pcw) : 0;
  const rightR = Math.max(row + over, g > 0 ? Math.max(toteCxR + pw / 2, chipLR + pcw) : 0);
  const span = over + rightR, cx = W / 2, x0 = cx - span / 2 + over, tc = x0 + tcR;
  const trays = Array.from({ length: kg }, (_, i) => ({ x: x0 + i * pitch, y: ty, w: gw, h: gh }));
  const packet = g > 0 ? { x: x0 + toteCxR - pw / 2, y: panY - ph, w: pw, h: ph } : null;
  const objR = packet ? packet.x + pw : x0 + row;
  const pL = Math.max(8, x0 - 30), pR = Math.min(W - 8, objR + 30);
  const fits = gh >= 120 && span <= W - 32 && bodyW < W - 16;
  return { cx, sc: tc, pitch, trays, packet, chipB, keyY: 436, keyH: 80, toteChipY: panY + 22, toteChipX: x0 + chipLR, fits,
    pan: { x: pL, y: panY, w: pR - pL, h: 16 }, body: { x: tc - bodyW / 2, y: panY + 16, w: bodyW, h: bodyH } };
}
/* the ten small 100 g bags of an opened kilogram: two across, five down, inside its tray */
const wcPk = (t: any, j: number) => ({ x: t.x + 8 + (j % 2) * ((t.w - 16) / 2) + 4, y: t.y + 8 + Math.floor(j / 2) * ((t.h - 16) / 5) + 3, w: (t.w - 16) / 2 - 8, h: (t.h - 16) / 5 - 6 });
/* P2: the heap (and its Gather key) on the left, the 1 kg bags on the right; each bag's one-line "1,000 g" tag stands
   above (even bags) or below (odd bags) it, so neighbouring tags never meet; tw = that tag's width */
function wcG2(W: number, grams: number, tw: number) {
  /* every tag is centred on its bag and may run past the row's ends (the row reserves that overhang); two tags in one row
     (bags i and i + 2) are 20 apart rect to rect, 16+ of clear ink past their 4 px outlines: 2 (bw + gap) - tw >= 20; two
     bags' frames (+-2, 4 px) stay 10 apart: gap >= 18. The bags narrow (96 to 78, 3:4) only when the open width needs it,
     chosen on the open width so they never change size when the keypad opens */
  const K = Math.floor(grams / 1000), RW = Math.min(W, 900);
  let bw = 96, bgap = 18, rowW = 0;
  for (const b of [96, 90, 84, 78]) {
    bw = b; bgap = Math.max(18, Math.ceil((tw + 20 - 2 * bw) / 2));
    rowW = (K - 1) * (bw + bgap) + Math.max(bw, tw);
    if (RW - 62 - Math.max(rowW, 400) >= 240) break;
  }
  const bh = Math.round((bw * 4) / 3), ov = Math.max(0, (tw - bw) / 2);
  /* the heap takes the room left (up to 400), and the scene keeps 16 or more from the card on both sides */
  const rightW = Math.max(rowW, 400), heapW = Math.max(240, Math.min(400, W - 32 - 30 - rightW));
  const sceneW = heapW + 30 + rightW, x0 = W / 2 - sceneW / 2;
  const gx = x0 + heapW + 30 + (rightW - rowW) / 2 + ov;
  return { K, x0, heapW, heap: { cx: x0 + heapW / 2, base: 320 }, given: { x: x0, y: 2, w: heapW, h: 60 },
    right: { x: x0 + heapW + 30, y: 2, w: rightW, h: 60, r: x0 + sceneW },
    bags: Array.from({ length: K }, (_, i) => ({ x: gx + i * (bw + bgap), y: 178, w: bw, h: bh })) };
}
/* narrow (P4): smaller columns, so the item cards beside it hold their weight on one line */
/* big (P3): the columns 1.3 times as wide and the digits 72, the rows only as much taller as the room over the keys allows */
function wcBoard(x0: number, y0: number, R: number, narrow = false, big = false) {
  const sw = big ? 84 : narrow ? 56 : 64, kw = big ? 196 : narrow ? 130 : 150, gw2 = big ? 300 : narrow ? 200 : 230;
  /* big: the header 70 tall, its 40 headings' baseline at 54, so a tall Devanagari or Gujarati matra stays 10+ under the board's top */
  const hb = big ? 54 : 44, hr = big ? 70 : 56, cr = big ? 48 : 52, rh = big ? 84 : 80, ah = big ? 90 : 92;
  const carryY = y0 + hr, row0 = carryY + cr;
  const rowY = (i: number) => row0 + i * rh, ruleY = row0 + R * rh + 8, ansY = ruleY + 10;
  return { x: x0, y: y0, w: 22 + sw + kw + gw2, h: ansY + ah - y0, R, sign: { x: x0 + 12, w: sw }, kg: { x: x0 + 12 + sw, w: kw }, g: { x: x0 + 12 + sw + kw, w: gw2 },
    carryY, rowY, ruleY, ansY, hb, hr,
    /* fonts: digits, headings; offsets: a digit's baseline in its row, an empty cell's height, the answer cells' height and
       baseline, the column lines' end, a mark's baseline under the rule, the carried 1's shift, the grams' right padding,
       the strike's half width, ends and the grams strike's reach */
    fd: big ? T.display : T.xl, fh: big ? T.prompt : T.label, dy: big ? 70 : 60, eh: big ? 68 : 60, ch: big ? 76 : 68, cd: big ? 68 : 60,
    ll: big ? 86 : 80, md: big ? 42 : 48, k1: big ? 52 : 40, gp: big ? 40 : 34, sk: big ? 36 : 30, s1: big ? 62 : 52, s2: big ? 30 : 28, sg: big ? 156 : 120 };
}
/* the column sums, the book's way: grams first, then a carry or a borrow */
function wcCols(rows: any[], op: string) {
  if (op === "+") {
    const sg = rows.reduce((s, r) => s + r[1], 0), carry = Math.floor(sg / 1000);
    return { sg, carry, borrow: false, g: sg % 1000, k: rows.reduce((s, r) => s + r[0], 0) + carry };
  }
  const borrow = rows[0][1] < rows[1][1];
  return { sg: rows[0][1] + (borrow ? 1000 : 0), carry: 0, borrow, g: rows[0][1] + (borrow ? 1000 : 0) - rows[1][1], k: rows[0][0] - (borrow ? 1 : 0) - rows[1][0] };
}
function wcFresh(e: number) {
  return { e, opened: 0, counted: 0, cT: -1, countDone: false, total: false, gathered: 0, leftShown: false,
    gLit: false, kLit: false, cStage: 0, carried: false, borrow: 0, placed: [] as number[], added: false, fk: 2, fix: null as any };
}
/* the act the question still waits for (null: done) */
function wcNext(it: any, S: any, free: boolean) {
  if (it.kind === "kg") return S.opened < (free ? S.fk : it.kg) ? "open" : null;
  if (it.kind === "group") return S.gathered < Math.floor(it.grams / 1000) ? "gather" : null;
  if (it.kind === "col") return (it.act === "carry" ? S.carried : S.borrow >= 2) ? null : "choose";
  if (it.kind === "shop") return S.placed.length < it.items.length ? "place" : null;
  return null;
}

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, part, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const Wd = box ? box.w : 1472;
  /* the right edge a top-row tag may reach: 20 short of the Answer key's corner (box.key, Work coordinates), 16+ clear of it */
  const keyL = box && box.key ? box.key.x - 20 : Wd;
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach") && !!(phase && phase.steps);
  const it: any = free ? MODEL.free : warm ? MODEL.warm[n] : item || {};
  const on = warm && stage === "demo" ? stepOn : null;
  const ask = stage === "ask";
  const won = !free && !warm && (stage === "win" || stage === "idle");

  /* the board belongs to the ENTRY (PATTERNS 18): rebuilt whenever the question key changes */
  const qk = free ? "free" : `${n}:${warm ? "w" : index}`;
  const ent = useRef({ qk: "", n: 0 }), entT = useRef(0);
  if (ent.current.qk !== qk) { ent.current = { qk, n: ent.current.n + 1 }; entT.current = Date.now(); }
  const eN = ent.current.n;
  const [raw, setRaw] = useState<any>({ e: -1 });
  const S: any = raw.e === eN ? raw : wcFresh(eN);
  const put = (p: any) => {
    const e = eN;
    setRaw((o: any) => { if (o.e > e) return o; const b = o.e === e ? o : wcFresh(e); return { ...b, ...(typeof p === "function" ? p(b) : p) }; });
  };

  const busy = useRef(false), fixing = useRef(false), touched = useRef(false), lastEnter = useRef(0);
  const lastTap = useRef({ t: 0, id: "" }), queued = useRef<any[]>([]), ctlRef = useRef<any[]>([]), rootRef = useRef<any>(null);
  const gateRef = useRef(false), prevGate = useRef(false), nudging = useRef(false), timers = useRef<any>({});
  const apiRef = useRef(api), sayRef = useRef(""), actRef = useRef<any>(null), idxRef = useRef(0), slotRef = useRef<any>({});
  const downRef = useRef<any>({ id: "", gated: false }), nudgeN = useRef({ e: -1, n: 0 }), openAfter = useRef(false), hintAfter = useRef(false);
  const itemRef = useRef<any>(null), phRef = useRef<any>(null), txRef = useRef<any>(tx);
  apiRef.current = api;
  sayRef.current = it.say || "";
  itemRef.current = ask ? it : null; phRef.current = phase; txRef.current = tx;
  /* the Hint key pressed while an act or a correction played: answered when it ends, with the rung after the one on show */
  const giveHint = () => {
    const itm = itemRef.current, T: any = (window as any).toolApi;
    if (!itm) return;
    const lad = itm.ladder && itm.ladder.length ? itm.ladder : (phRef.current && phRef.current.ladder) || [];
    const rungs = [itm.miss, ...lad].filter(Boolean), cur = T && T.getState ? T.getState().hint : null;
    const i = rungs.findIndex((r: string) => txRef.current(r) === cur || r === cur);
    tempSay(rungs[Math.min(i + 1, rungs.length - 1)]);
  };

  const nextAct = ask || free ? wcNext(it, S, free) : null;
  const needAct = ask && !!nextAct;
  actRef.current = needAct ? nextAct : null;
  idxRef.current = index || 0;
  /* what the slot holds now, for the "Fill both boxes." line (a two-box answer, keypad open) */
  slotRef.current = { on: ask && !free && !!it.parts && !!(box && box.open), typed, part, np: it.parts ? it.parts.length : 0 };
  /* the control the lesson waits for next (for the keyboard focus after an act): the step's control, the act still owed, or the Answer key */
  const nextCtl = warm ? stepOn : ask && nextAct ? (nextAct === "choose" ? "carry" : nextAct === "place" ? ((it.items || []).find((x: any, i: number) => !S.placed.includes(i)) || {}).id : nextAct) : ask ? "answer-open" : null;
  const nextRef = useRef<any>(null);
  nextRef.current = nextCtl;
  /* a nudge line: three forms, rotating by question and by tap */
  const nudgeLine = (kind: string) => {
    const c = nudgeN.current;
    if (c.e !== ent.current.n) { c.e = ent.current.n; c.n = 0; }
    const forms = WC_NUDGE[kind];
    return forms[(idxRef.current + c.n++) % forms.length];
  };

  /* a line for 3 s, then the question again (a nudge never contradicts an open Answer key) */
  const tempSay = (line: string) => {
    const T = timers.current;
    clearTimeout(T.b);
    apiRef.current.say(line);
    nudging.current = true;
    T.b = setTimeout(() => { if (nudging.current) apiRef.current.say(sayRef.current); nudging.current = false; }, 3000);
  };

  /* real input: a trusted Enter (a guide step's act arms the gate), a tap on the dimmed Answer key, the Hint key or a digit
     while the gate is shut (the nudge), and a tap on a control while an act plays (queued, never dropped) */
  useEffect(() => {
    const toWork = (e: any) => {
      const g = rootRef.current, svg = g && g.ownerSVGElement;
      if (!g || !svg || !g.getScreenCTM) return null;
      const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      const m = g.getScreenCTM();
      return m ? pt.matrixTransform(m.inverse()) : null;
    };
    const nudgeSoon = () => {
      const T = timers.current;
      clearTimeout(T.a);
      T.a = setTimeout(() => { if (gateRef.current && actRef.current) tempSay(nudgeLine(actRef.current)); }, 90);
    };
    const ctlOf = (e: any) => { const el = e.target, c = el && el.closest ? el.closest("[data-control]") : null; return c ? c.getAttribute("data-control") : ""; };
    /* Enter (or the pad's Enter) on a two-box answer with a box still empty: the runtime only moves the caret, so say so */
    const fillCheck = () => {
      const s = slotRef.current;
      if (!s.on || gateRef.current || fixing.current || busy.current) return;
      const ps = slotPartsOf(s.typed, s.np), at = Math.min(s.part || 0, s.np - 1);
      if (ps.some((p: string) => p === "") && (ps[at] === "" || at === s.np - 1)) setTimeout(() => tempSay(WC_FILL), 60);
    };
    /* a press that began on a locked control: only that one nudges (the release of a tap on the Next key lands on the dimmed
       Answer key of the next question), and never in the first 400 ms of a question */
    const down = (e: any) => { if (e.isTrusted) downRef.current = { id: ctlOf(e), gated: gateRef.current }; };
    const up = (e: any) => {
      if (!e.isTrusted) return;
      const id = ctlOf(e), d = downRef.current;
      downRef.current = { id: "", gated: false };
      if (id === "answer-open" && busy.current) { openAfter.current = true; return; }
      if (id === "again" && (busy.current || fixing.current)) { hintAfter.current = true; return; }   /* a tap on the key while an act plays: the pad opens when it ends */
      if (gateRef.current && d.gated && d.id === id && Date.now() - entT.current > 400 && (id === "answer-open" || id === "again" || /^key-/.test(id))) { nudgeSoon(); return; }
      if (id === "key-enter") fillCheck();
      if (busy.current && !fixing.current) {
        const p = toWork(e);
        if (p) queued.current.push({ x: p.x, y: p.y });   /* every tap kept, in order, each matched to a control when it RUNS (the next step's controls register only then) */
      }
    };
    const kd = (e: any) => {
      if (!e.isTrusted) return;
      if (e.key === "Enter" || e.key === " ") lastEnter.current = Date.now();   /* a real Enter or Space on a control is a real touch */
      if (e.key === "Enter" && !e.repeat) fillCheck();
      if (gateRef.current && /^[0-9]$/.test(e.key)) nudgeSoon();
      else if (gateRef.current && (e.key === "Enter" || e.key === " " || e.key === "Backspace")) {
        const a: any = document.activeElement, c = a && a.closest ? a.closest("[data-zone=\"work\"] [data-control]") : null;
        if (!c) nudgeSoon();
      }
    };
    window.addEventListener("pointerdown", down, true);
    window.addEventListener("pointerup", up, true);
    window.addEventListener("keydown", kd, true);
    return () => {
      window.removeEventListener("pointerdown", down, true);
      window.removeEventListener("pointerup", up, true);
      window.removeEventListener("keydown", kd, true);
      clearTimeout(timers.current.a); clearTimeout(timers.current.b);
    };
  }, []);

  /* THE ANSWER GATE (PATTERNS 19): locked only while the question still needs its act, in user mode, after a real touch;
     re-asserted on every render (a gotoStep entry resets the runtime's lock); unlocked once the act is done */
  const gateOn = needAct && touched.current && !fixing.current;
  useEffect(() => {
    gateRef.current = gateOn;
    if (gateOn) api.lock(true);
    else if (prevGate.current) {
      api.lock(false);
      if (nudging.current) { nudging.current = false; clearTimeout(timers.current.b); api.say(it.say); }
    }
    prevGate.current = gateOn;
  });

  /* a new entry: stop a correction or an act of the old one */
  useEffect(() => () => { tl.stop(); fixing.current = false; busy.current = false; queued.current = []; openAfter.current = false; hintAfter.current = false; nudging.current = false; clearTimeout(timers.current.b); }, [eN]);

  /* the win line (one sentence; a phase's last one gives way to its closing line) */
  useEffect(() => { if (stage === "win" && !free && item && item.win) api.say(item.win); }, [stage, eN]);

  /* ── geometry of this screen ── */
  const kind = it.kind;
  const K1 = kind === "kg" ? (free ? S.fk : it.kg) : 0;
  const pkText = it.g ? `${it.g} ${tx("g")}` : "";
  /* the scale plate: one line, the biggest size whose scale still fits the open width with trays 128+ tall (chosen on the open
     width, so it never changes when the keypad opens): 72 in English, 56 where Devanagari or Gujarati letters need the taller line */
  const plateTxt = kind === "kg" ? (free ? `${K1} ${tx("kg")}` : wcKgG(K1, it.g || 0, tx)) : "";
  const g1 = (W: number, s: number) => wcG1(W, K1, free ? 0 : it.g || 0, wcChipW(wcGr(1000, tx), T.label), pkText ? wcChipW(pkText, T.label) : 0, wcChipW(plateTxt, s),
    Math.round(16 + wcLineH(plateTxt) * s), 2 + Math.round(16 + wcLineH(tx("kg")) * T.label), Math.round(16 + wcLineH(wcGr(1000, tx)) * T.label), wcChipW(`1 ${tx("kg")}`, T.label));
  const plateSz = kind === "kg" ? [T.display, T.xl, T.speech].find((s) => g1(Math.min(Wd, 900), s).fits) || T.speech : T.speech;
  const G1 = kind === "kg" ? g1(Wd, plateSz) : null;
  const G2 = kind === "group" ? wcG2(Wd, it.grams, wcChipW(wcGr(1000, tx), T.label)) : null;
  const rows: any[] = kind === "col" ? it.rows : kind === "shop" ? it.items.map((x: any) => [x.kg, x.g]) : [];
  const R = rows.length;
  /* the board stands at one place whether the keypad is open or shut: laid out for the open width (LAYOUT 3) */
  const BW = Math.min(Wd, 900), BC = BW / 2;
  /* P4: the item cards (420) and the narrow board (408) side by side, 24 apart, centred on the open width */
  const ix0 = BC - 426, itemH = R === 3 ? 124 : 150;
  const B = kind === "col" ? wcBoard(BC - 301, 6, R, false, true) : kind === "shop" ? wcBoard(ix0 + 444, 8, R, true) : null;
  const itemBox = (i: number) => ({ x: ix0, y: 24 + i * (itemH + 16), w: 420, h: itemH });
  const keyY = 424, keyH = 84;
  const cols = R ? wcCols(rows, it.op) : null;

  /* ── the acts: each performed on screen by the hand (api.act), reacting 40 ms after it resolves true ── */
  /* a keyboard act never leaves the focus on BODY: back on the control just used if it is still there and live, else on the control
     the lesson waits for next (the next step's control, the act still owed, the Answer key once it opens) */
  const refocus = (id: string) => setTimeout(() => {
    const live = (sel: string) => { const el: any = sel ? document.querySelector(sel) : null; return el && el.getAttribute("aria-disabled") !== "true" && el.getAttribute("tabindex") !== "-1" ? el : null; };
    const nx = nextRef.current;
    const el = live(`[data-zone="work"] [data-control="${id}"]`) || (nx ? live(`[data-control="${nx}"]`) : null) || live(`[data-control="answer-open"]`) || live(`[data-zone="work"] [data-control]`);
    if (el && el.focus) el.focus();
  }, 240);
  /* after an act: the taps made while it played run in order (an act a tap starts drains the rest when it ends); then the Answer key
     tapped meanwhile opens the pad, and a Hint pressed meanwhile is answered */
  const drain = () => {
    if (busy.current) return;
    const q = queued.current;
    while (q.length) {
      const p = q.shift();
      const r = ctlRef.current.find((c: any) => p.x >= c.x && p.x <= c.x + c.w && p.y >= c.y && p.y <= c.y + c.h);
      if (r) { r.run(); if (busy.current) return; }
    }
    if (openAfter.current) { openAfter.current = false; setTimeout(() => { const a = apiRef.current; if (a && a.openAnswer) a.openAnswer(); }, 160); }
    if (hintAfter.current) { hintAfter.current = false; setTimeout(giveHint, 300); }
  };
  const play = (o: any, done: () => void) => {
    busy.current = true;
    api.act(o).then((ok: boolean) => {
      if (!ok) { busy.current = false; queued.current = []; openAfter.current = false; hintAfter.current = false; return; }
      setTimeout(() => {
        busy.current = false;
        done();
        setTimeout(drain, 200);
      }, 40);
    });
  };
  const chip = (text: string, role: string) => {
    const c = WC_COL[role], w = Math.max(110, wcTW(text, T.label) + 28);
    return <g><rect x={-w / 2} y={-26} width={w} height={52} rx={14} fill={c.fill} stroke={c.stroke} strokeWidth={3} filter="url(#wc-shadow)" /><text y={10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={c.ink}>{text}</text></g>;
  };
  const doAct = (name: string, arg: any, kb: boolean) => {
    const after = (fin: () => void) => () => { fin(); if (warm) api.did(name); if (kb) refocus(name); };
    if (name === "open" && G1) {
      const from = S.opened, K = K1;
      const at = G1.trays.slice(from).map((t: any) => ({ x: t.x + t.w / 2, y: t.y + t.h / 2 }));
      play({ tool: "hand", moves: "tap", at, onPoint: (i: number) => put({ opened: from + i + 1 }) }, after(() => { put({ opened: K }); api.sfx.settle(); }));
    } else if (name === "count" && G1) {
      const t = G1.trays[arg || 0];
      const at = Array.from({ length: 10 }, (_, j) => { const p = wcPk(t, j); return { x: p.x + p.w / 2, y: p.y + p.h / 2 }; });
      put({ cT: arg || 0, counted: 0 });
      play({ tool: "hand", moves: "tap", at, onPoint: (j: number) => put({ counted: j + 1 }) }, after(() => { put({ counted: 10, countDone: true }); api.sfx.settle(); }));
    } else if (name === "total" && G1) {
      play({ tool: "hand", moves: "tap", at: [{ x: G1.cx + 190, y: 38 }] }, after(() => { put({ total: true }); api.sfx.trade(); }));
    } else if (name === "gather" && G2) {
      const from = { x: G2.heap.cx, y: G2.heap.base - 80 };
      const at = G2.bags.map((b: any) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 }));
      const hold = <ellipse cx={0} cy={0} rx={30} ry={16} fill="#F4EEDD" stroke="#C8B48A" strokeWidth={2} />;
      play({ tool: "hand", moves: "carry", from, at, hold, onPoint: (i: number) => put({ gathered: i + 1 }) }, after(() => { put({ gathered: G2.K }); api.sfx.settle(); }));
    } else if (name === "left" && G2) {
      play({ tool: "hand", moves: "tap", at: [{ x: G2.heap.cx, y: G2.heap.base - 20 }] }, after(() => { put({ leftShown: true }); api.sfx.tick(); }));
    } else if ((name === "grams" || name === "kg") && B) {
      const c = name === "grams" ? B.g : B.kg;
      play({ tool: "hand", moves: "tap", at: [{ x: c.x + c.w / 2, y: B.rowY(0) + 60 }] }, after(() => put(name === "grams" ? { gLit: true } : { kLit: true })));
    } else if (name === "carry" && B) {
      const at = [{ x: B.g.x + B.g.w / 2, y: B.rowY(R - 1) + 40 }, { x: B.kg.x + B.kg.w / 2 + B.k1, y: (B.carryY + B.rowY(0)) / 2 }];
      play({ tool: "hand", moves: "carry", at, hold: chip(`1 ${tx("kg")}`, "second"), onPoint: (i: number) => put({ cStage: i + 1 }) }, after(() => put({ carried: true, cStage: 2 })));
    } else if (name === "borrow" && B) {
      const at = [{ x: B.kg.x + B.kg.w / 2, y: B.rowY(0) + 40 }, { x: B.g.x + B.g.w / 2, y: B.rowY(0) + 40 }];
      play({ tool: "hand", moves: "carry", at, hold: chip(wcGr(1000, tx), "second"), onPoint: (i: number) => put({ borrow: i + 1 }) }, after(() => put({ borrow: 2 })));
    } else if (name === "add" && B) {
      const at = [{ x: B.g.x + B.g.w / 2, y: B.ansY + 40 }, { x: B.kg.x + B.kg.w / 2, y: B.ansY + 40 }];
      play({ tool: "hand", moves: "tap", at, onPoint: (i: number) => put(i === 0 ? { gLit: true } : { kLit: true }) }, after(() => put({ added: true, gLit: true, kLit: true })));
    } else if (kind === "shop" && B) {
      const i = it.items.findIndex((x: any) => x.id === name);
      if (i < 0 || S.placed.includes(i)) return;
      const ib = itemBox(i), x = it.items[i];
      const at = [{ x: ib.x + 272, y: ib.y + ib.h / 2 }, { x: B.kg.x + B.kg.w, y: B.rowY(i) + 40 }];
      play({ tool: "hand", moves: "carry", at, hold: chip(wcKgG(x.kg, x.g, tx), i === 0 ? "given" : "second"),
        onPoint: (j: number) => { if (j === 1) put((b: any) => ({ placed: b.placed.includes(i) ? b.placed : [...b.placed, i] })); } },
        after(() => { put((b: any) => ({ placed: b.placed.includes(i) ? b.placed : [...b.placed, i] })); api.sfx.tick(); }));
    }
  };
  /* every press of a control or piece: a 400 ms double-tap guard, a wrong act in a guide step shows its hint (api.did),
     a wrong key at a carry/borrow question is a calm nudge that costs no try */
  const press = (name: string, real: boolean, arg?: any) => {
    const t = Date.now();
    if (real) {
      if (t - lastTap.current.t < 400 && lastTap.current.id === name) return;
      lastTap.current = { t, id: name };
    }
    if (busy.current || fixing.current) return;
    if (warm) { if (name !== on) { api.did(name); return; } }
    else if (!free && !ask) return;
    if (real) touched.current = true;
    const kb = real && t - lastEnter.current < 250;
    if (free) {
      if (name === "more" || name === "fewer") { put((b: any) => ({ fk: Math.max(1, Math.min(4, b.fk + (name === "more" ? 1 : -1))), opened: 0 })); api.sfx.tick(); if (kb) refocus(name); return; }
      if (name === "open" && S.opened < S.fk) doAct("open", null, kb);
      return;
    }
    if (ask && kind === "col") {
      if (!nextAct) return;
      if (name !== it.act) { tempSay(nudgeLine("wrongKey")); if (kb) refocus(name); return; }
    } else if (ask && kind !== "shop" && name !== nextAct) return;
    doAct(name, arg, kb);
  };
  const argOf = (name: string) => (name === "count" ? 0 : null);
  api.onEnter(warm && on ? () => press(on, Date.now() - lastEnter.current < 300, argOf(on)) : null);

  /* the agent: the act at once at an open question (HOOK.check), the current step in a guide step (HOOK.demo) */
  const finishAll = () => {
    if (kind === "kg") put({ opened: it.kg });
    else if (kind === "group") put({ gathered: Math.floor(it.grams / 1000) });
    else if (kind === "col") put(it.act === "carry" ? { carried: true, cStage: 2 } : { borrow: 2 });
    else if (kind === "shop") put({ placed: it.items.map((_: any, i: number) => i) });
  };
  HOOK.check = ask && !free ? () => { if (nextAct) finishAll(); return undefined; } : null;
  HOOK.demo = warm && on ? () => press(on, false, argOf(on)) : null;

  /* THE CORRECTION (MISS HIDES THE ANSWER): the act's end state, then the working replayed in steps that stop one step short;
     drawn inside pointerEvents="none", unmarked; the slot is the runtime's (emptied at the miss) */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    fixing.current = true;
    busy.current = false; queued.current = []; openAfter.current = false;
    api.lock(true);
    const e = eN;
    finishAll();
    let seq: any[] = [];
    if (kind === "kg") { seq = it.kg ? Array.from({ length: it.kg }, (_, i) => ({ k: i + 1 })) : []; if (it.g) seq.push({ k: it.kg, pk: true }); }
    /* P2: the heap whole again, then the bags refill one by one, stopping ONE bag short (no ring, no count) */
    else if (kind === "group") { const K = Math.floor(it.grams / 1000); seq = Array.from({ length: K }, (_, i) => ({ k: i })); }
    else { const c = wcCols(rows, it.op); seq = [{ g: true }, ...(c.carry || c.borrow ? [{ g: true, mark: true }] : []), { g: true, mark: true, k: true }]; }
    const ms = seq.length > 5 ? 420 : 620;
    tl.run([[360, () => put({ fix: kind === "group" ? { k: 0 } : {} })], ...seq.map((f: any) => [ms, () => put({ fix: f })])], () => {
      fixing.current = false;
      if (ent.current.n === e) api.lock(false);
      if (hintAfter.current) { hintAfter.current = false; setTimeout(giveHint, 300); }
    });
  }, [wrong]);

  /* what the host and the agent read back (never the answer before it is given) */
  api.share({ complete: stage === "idle", kilograms: kind === "kg" ? K1 : null, grams: kind === "group" ? it.grams : null,
    poured: kind === "kg" ? S.opened : kind === "group" ? S.gathered : 0, carry: !!S.carried, borrow: S.borrow >= 2, placed: S.placed.length });

  /* ── drawing ── */
  const ctls: any[] = [];
  const reg = (id: string, x: number, y: number, w: number, h: number, arg?: any) => ctls.push({ id, x, y, w, h, arg, run: () => press(id, true, arg) });
  const actKey = (slot: string, id: string, x: number, w: number, label: string, ky = keyY, kh = keyH) => {
    reg(id, x, ky, w, kh);
    return (
      <Key key={"key-" + slot} id={id} label={tx(label)} x={x} y={ky} w={w} h={kh} C={C} tone="key" onClick={() => press(id, true)}>
        <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(label)}</text>
      </Key>
    );
  };
  const inviteBox = (x: number, y: number, w: number, h: number) => <Invite x={x + w / 2} y={y + h / 2} w={w} h={h} rx={RAD.key} C={C} />;
  /* the correction's marks belong to the open question: a win draws the finished picture, never a half replay */
  const fix = stage === "ask" ? S.fix || null : null;
  let invite: any = null;

  /* P1 (and free play): the scale, the bags, the trays of ten 100 g bags */
  const draw1 = () => {
    if (!G1) return null;
    const g = free ? 0 : it.g || 0;
    const pill = !warm || S.countDone;
    /* the unit-fact ring stands over the scale's centre, and moves left only when a green tag stands beside it
       (the question's own Answer tag stands under the scale, where the Open key was) */
    const rightTag = (warm && S.total) || (free && S.opened >= S.fk);
    const keys: any[] = [];
    const sc = G1.sc, kx0 = sc - 120, ky = G1.keyY, kh = G1.keyH;
    if (free) {
      keys.push(actKey("a", "fewer", sc - 120 - 20 - 100, 100, "−", ky, kh));
      keys.push(actKey("b", "open", kx0, 240, "Open", ky, kh));
      keys.push(actKey("c", "more", sc + 120 + 20, 100, "+", ky, kh));
      if (S.opened < S.fk) invite = inviteBox(kx0, ky, 240, kh);
    } else if ((warm && (on === "open" || on === "total")) || (ask && nextAct === "open")) {
      const id = warm ? on : "open";
      keys.push(actKey("a", id, kx0, 240, WC_KEYS[id], ky, kh));
      invite = inviteBox(kx0, ky, 240, kh);
    }
    return (
      <g>
        {/* the scale: pan and body, drawn in code; the Given plate reads the weight the question gives */}
        <rect x={G1.pan.x} y={G1.pan.y} width={G1.pan.w} height={G1.pan.h} rx={8} fill="url(#wc-pan-grad)" stroke="#4F5B66" strokeWidth={3} filter="url(#wc-shadow)" />
        <path d={`M ${G1.body.x + 20} ${G1.body.y} L ${G1.body.x + G1.body.w - 20} ${G1.body.y} L ${G1.body.x + G1.body.w} ${G1.body.y + G1.body.h} L ${G1.body.x} ${G1.body.y + G1.body.h} Z`} fill="url(#wc-body-grad)" stroke="#4F5B66" strokeWidth={3} filter="url(#wc-shadow)" />
        {wcChip("plate", sc, G1.body.y + G1.body.h / 2, "c", "m", "given", plateTxt, plateSz, 9999)}
        {pill && (rightTag ? wcEqTag("pill", G1.cx - 10, 2, "r", "fact", `1 ${tx("kg")}`, wcGr(1000, tx)) : wcEqTag("pill", sc, 2, "c", "fact", `1 ${tx("kg")}`, wcGr(1000, tx)))}
        {warm && S.total && wcEqTag("wres", G1.cx + 10, 2, "l", "answer", `${K1} ${tx("kg")}`, wcGr(K1 * 1000, tx))}
        {free && S.opened >= S.fk && wcEqTag("fres", G1.cx + 10, 2, "l", "answer", `${K1} ${tx("kg")}`, wcGr(K1 * 1000, tx))}
        {won && wcAnsTag("ans", sc, G1.keyY + 6, "c", 560, wcGr(it.answer, tx), tx)}
        {G1.trays.map((t: any, i: number) => {
          const opened = i < S.opened;
          const counting = warm && i === S.cT && !S.countDone;
          const lit = !!fix && fix.k > i;
          return (
            <g key={"t" + i} filter="url(#wc-shadow)">
              {!opened ? (
                <g>
                  {wcSackShape(t.x, t.y, t.w, t.h)}
                  <Skin name="sack" x={t.x} y={t.y} w={t.w} h={t.h} />
                  {wcChip("st" + i, t.x + t.w / 2, t.y + t.h * 0.62, "c", "m", "count", `1 ${tx("kg")}`, T.label, G1.pitch - 12)}
                </g>
              ) : (
                <g>
                  <rect x={t.x} y={t.y} width={t.w} height={t.h} rx={14} fill="#FFF8EA" stroke="#D55E00" strokeWidth={3} strokeDasharray="10 7" />
                  {Array.from({ length: 10 }, (_, j) => { const p = wcPk(t, j); return wcPacket("p" + j, p.x, p.y, p.w, p.h, counting ? j < S.counted : warm && i === S.cT && S.countDone); })}
                  {counting && S.counted > 0 && wcChip("cc" + i, t.x + t.w / 2, G1.chipB, "c", "b", "count", wcGr(S.counted * 100, tx), T.label, 9999)}
                  {(!warm || S.countDone) && wcChip("ch" + i, t.x + t.w / 2, G1.chipB, "c", "b", "fact", wcGr(1000, tx), T.label, 9999)}
                </g>
              )}
              {warm && on === "count" && opened && (reg("count", t.x, t.y, t.w, t.h, i), <Hit key={"h" + i} id="count" x={t.x} y={t.y} w={t.w} h={t.h} label={tx("Count this tray")} onPress={() => press("count", true, i)} />)}
              {lit && <rect pointerEvents="none" x={t.x + 3} y={t.y + 3} width={t.w - 6} height={t.h - 6} rx={12} fill="none" stroke="#E69F00" strokeWidth={6} />}
            </g>
          );
        })}
        {warm && on === "count" && (invite = inviteBox(G1.trays[0].x, G1.trays[0].y, G1.trays[0].w, G1.trays[0].h), null)}
        {G1.packet && (
          <g>
            {wcToteArt("pk", G1.packet.x, G1.packet.y, G1.packet.w, G1.packet.h)}
            {wcChip("pkt", G1.toteChipX, G1.toteChipY, "l", "t", "second", pkText, T.label, 9999)}
            {fix && fix.pk && <rect pointerEvents="none" x={G1.packet.x - 6} y={G1.packet.y - 6} width={G1.packet.w + 12} height={G1.packet.h + 3} rx={16} fill="none" stroke="#E69F00" strokeWidth={6} />}
          </g>
        )}
        {keys}
      </g>
    );
  };

  /* P2: the heap of rice, the 1 kg bags it fills, the rice left (amber ring, no number) */
  const draw2 = () => {
    if (!G2) return null;
    const grams = it.grams, K = G2.K;
    /* after a miss the correction refills the bags and stops one bag short (fix.k <= K - 1): no Left ring, no count;
       the finished gather is drawn again only at the right answer (fix is null at the win) */
    const got = fix && fix.k !== undefined ? Math.min(fix.k, S.gathered) : S.gathered, left = grams - got * 1000;
    const done = got >= K;
    const hw = G2.heapW / 2, HM = Math.round(140 + (G2.heapW - 240) * 0.38), hm = got === 0 ? HM : left > 0 ? Math.max(26, HM * Math.sqrt(left / grams)) : 0;
    const { cx, base } = G2.heap, mw = 80 + (G2.heapW - 100) * (hm / HM);
    /* the ring hugs what is left: the small heap, or the empty bowl when nothing is left */
    const ring = left > 0 ? { cy: base - hm * 0.42, rx: mw / 2 + 36, ry: hm * 0.55 + 30 } : { cy: base + 16, rx: hw + 8, ry: 44 };
    const keys: any[] = [];
    if ((warm && on === "gather") || (ask && nextAct === "gather")) {
      keys.push(actKey("a", "gather", cx - 120, 240, "Gather"));
      invite = inviteBox(cx - 120, keyY, 240, keyH);
    }
    return (
      <g>
        {wcChip("given", G2.heap.cx, G2.given.y, "c", "t", "given", wcGr(grams, tx), T.xl, G2.given.w + 90)}
        {/* the bowl and the heap */}
        {hm > 0 && (
          <g>
            <path d={`M ${cx - mw / 2} ${base + 4} Q ${cx} ${base - 2 * hm} ${cx + mw / 2} ${base + 4} Z`} fill="#F4EEDD" stroke="#A8925E" strokeWidth={3} />
            {Array.from({ length: Math.round(4 + 12 * (hm / HM)) }, (_, j) => (
              <ellipse key={j} cx={cx + ((j * 37) % 100 - 50) * (mw / 260)} cy={base - 8 - ((j * 53) % 100) / 100 * hm * 0.8} rx={5} ry={2.4} fill="#D9CBA6" />
            ))}
          </g>
        )}
        <path d={`M ${cx - hw} ${base} L ${cx + hw} ${base} Q ${cx + hw * 0.85} ${base + 50} ${cx} ${base + 50} Q ${cx - hw * 0.85} ${base + 50} ${cx - hw} ${base} Z`} fill="#B8C2CC" stroke="#5E6B78" strokeWidth={3} filter="url(#wc-shadow)" />
        {done && !fix && (
          <g>
            <ellipse cx={cx} cy={ring.cy} rx={ring.rx} ry={ring.ry} fill="none" stroke="#E69F00" strokeWidth={4} strokeDasharray="12 8" />
            {warm && S.leftShown ? wcChip("lv", cx, base + 66, "c", "t", "second", `${left} ${tx("g")}`, T.label, 300) : wcChip("lf", cx, base + 66, "c", "t", "second", tx("Left"), T.label, 300)}
          </g>
        )}
        {warm && on === "left" && (reg("left", cx - hw, base - 130, 2 * hw, 180), <Hit key="hl" id="left" x={cx - hw} y={base - 130} w={2 * hw} h={180} label={tx("The rice that is left")} onPress={() => press("left", true)} />)}
        {G2.bags.slice(0, got).map((b: any, i: number) => (
          <g key={"b" + i} filter="url(#wc-shadow)">
            {wcSackShape(b.x, b.y, b.w, b.h)}
            <Skin name="sack" x={b.x} y={b.y} w={b.w} h={b.h} />
            {i % 2 === 0
              ? wcChip("bt" + i, b.x + b.w / 2, b.y - 14, "c", "b", "fact", wcGr(1000, tx), T.label, 300)
              : wcChip("bt" + i, b.x + b.w / 2, b.y + b.h + 14, "c", "t", "fact", wcGr(1000, tx), T.label, 300)}
            {fix && fix.k > i && <rect pointerEvents="none" x={b.x - 2} y={b.y - 2} width={b.w + 4} height={b.h + 4} rx={12} fill="none" stroke="#E69F00" strokeWidth={4} />}
          </g>
        ))}
        {warm && S.leftShown && wcChip("wres", Math.min(G2.right.r, keyL), G2.right.y, "r", "t", "answer", wcAns(K, grams % 1000, tx), T.prompt, 900)}
        {won && wcAnsTag("ans", Math.min(G2.right.r, keyL), G2.right.y, "r", G2.right.w, wcAns(it.answer[0], it.answer[1], tx), tx)}
        {keys}
      </g>
    );
  };

  /* the kg | g column board (P3 and P4) */
  const board = () => {
    if (!B || !cols) return null;
    const isP4 = kind === "shop";
    const placed = (i: number) => !isP4 || S.placed.includes(i);
    const fxg = !!fix && fix.g, fxk = !!fix && fix.k, fxm = !!fix && fix.mark;
    /* the carry or the borrow on show: the child's own act (P3, the warm-ups), or the correction's mark (P4) */
    const carryOn = (kind === "col" && S.cStage >= 2) || (isP4 && fxm && cols.carry > 0);
    const borrowK = (kind === "col" && S.borrow >= 1) || (isP4 && fxm && cols.borrow);
    const borrowG = (kind === "col" && S.borrow >= 2) || (isP4 && fxm && cols.borrow);
    const gLit = S.gLit || fxg, kLit = S.kLit || fxk;
    const rowInk = (i: number) => (i === 0 ? WC_COL.given.ink : WC_COL.second.ink);
    const top = B.carryY, colH = B.rowY(R) - top;
    const gx = B.g.x + B.g.w - B.gp, kcx = B.kg.x + B.kg.w / 2;
    const lead = (g: number) => (g >= 100 ? "" : g >= 10 ? "0" : "00");
    /* the warm-up's own working and result (never a question's) */
    const wWork = warm && kind === "col" ? (S.kLit ? { k: String(cols.k), g: String(cols.g) } : S.cStage >= 2 ? { g: String(cols.g) } : S.gLit ? { g: indian(cols.sg) } : null)
      : warm && isP4 ? (S.kLit ? { k: String(cols.k), g: String(cols.g) } : S.gLit ? { g: String(cols.g) } : null) : null;
    const wDone = warm && (kind === "col" ? S.kLit : S.added);
    return (
      <g>
        <rect x={B.x} y={B.y} width={B.w} height={B.h} rx={18} fill="#FFFFFF" stroke="#2B2B2B" strokeWidth={3} filter="url(#wc-shadow)" />
        <g pointerEvents="none">
          {gLit && <rect x={B.g.x + 4} y={top} width={B.g.w - 8} height={colH} rx={10} fill={WC_LIT} stroke="#E69F00" strokeWidth={3} />}
          {kLit && <rect x={B.kg.x + 4} y={top} width={B.kg.w - 8} height={colH} rx={10} fill={WC_LIT} stroke="#E69F00" strokeWidth={3} />}
        </g>
        <g data-scale="headings">
          <text x={kcx} y={B.y + B.hb} textAnchor="middle" fontSize={B.fh} fontWeight={700} fill="#2B2B2B">{tx("kg")}</text>
          <text x={B.g.x + B.g.w / 2} y={B.y + B.hb} textAnchor="middle" fontSize={B.fh} fontWeight={700} fill="#2B2B2B">{tx("g")}</text>
        </g>
        <line x1={B.x + 10} y1={B.y + B.hr} x2={B.x + B.w - 10} y2={B.y + B.hr} stroke="#2B2B2B" strokeWidth={2} />
        <line x1={B.kg.x} y1={B.y + 10} x2={B.kg.x} y2={B.ansY + B.ll} stroke="#C9BCA6" strokeWidth={2} />
        <line x1={B.g.x} y1={B.y + 10} x2={B.g.x} y2={B.ansY + B.ll} stroke="#2B2B2B" strokeWidth={3} />
        {rows.map((r: any, i: number) => {
          const y = B.rowY(i);
          if (!placed(i)) return (
            <g key={"r" + i}>
              <rect x={B.kg.x + 22} y={y + 10} width={B.kg.w - 44} height={B.eh} rx={10} fill="none" stroke="#4A5560" strokeWidth={2} strokeDasharray="10 6" />
              <rect x={B.g.x + 22} y={y + 10} width={B.g.w - 44} height={B.eh} rx={10} fill="none" stroke="#4A5560" strokeWidth={2} strokeDasharray="10 6" />
            </g>
          );
          const struck = i === 0 && borrowK;
          return (
            <g key={"r" + i}>
              {i === R - 1 && <text x={B.sign.x + B.sign.w / 2} y={y + B.dy} textAnchor="middle" fontSize={B.fd} fontWeight={700} fill="#2B2B2B">{it.op === "−" ? "−" : "+"}</text>}
              <text x={kcx} y={y + B.dy} textAnchor="middle" fontSize={B.fd} fontWeight={700} fill={r[0] === 0 ? WC_GREY : rowInk(i)}>{r[0]}</text>
              <text x={gx} y={y + B.dy} textAnchor="end" fontSize={B.fd} fontWeight={700} fill={rowInk(i)}><tspan fill={WC_GREY}>{lead(r[1])}</tspan>{String(r[1])}</text>
              {struck && <line x1={kcx - B.sk} y1={y + B.s1} x2={kcx + B.sk} y2={y + B.s2} stroke="#7A5000" strokeWidth={5} strokeLinecap="round" pointerEvents="none" />}
              {struck && borrowG && <line x1={gx - B.sg} y1={y + B.s1} x2={gx + 6} y2={y + B.s2} stroke="#7A5000" strokeWidth={5} strokeLinecap="round" pointerEvents="none" />}
            </g>
          );
        })}
        {/* the carry row: a carried 1 over the kg column, or the borrow's new top numbers; only after the act */}
        <g pointerEvents="none">
          {kind === "col" && S.cStage === 1 && wcChip("c1k", B.g.x + B.g.w / 2, (B.carryY + B.rowY(0)) / 2, "c", "m", "second", wcGr(1000, tx), T.label, B.g.w - 8)}
          {carryOn && <text x={kcx + B.k1} y={B.carryY + B.md} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill="#7A5000">1</text>}
          {borrowK && <text x={kcx} y={B.carryY + B.md} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill="#7A5000">{rows[0][0] - 1}</text>}
          {borrowG && <text x={gx} y={B.carryY + B.md} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill="#7A5000">{indian(rows[0][1] + 1000)}</text>}
        </g>
        <line x1={B.x + 12} y1={B.ruleY} x2={B.x + B.w - 12} y2={B.ruleY} stroke="#2B2B2B" strokeWidth={5} />
        {/* the answer row: empty cells until the win (the warm-up shows its own working and result) */}
        <rect x={B.kg.x + 16} y={B.ansY + 6} width={B.kg.w - 32} height={B.ch} rx={10} fill={wDone ? WC_COL.answer.fill : "none"} stroke={wDone ? WC_COL.answer.stroke : "#4A5560"} strokeWidth={3} strokeDasharray={wDone ? undefined : "10 6"} />
        <rect x={B.g.x + 16} y={B.ansY + 6} width={B.g.w - 32} height={B.ch} rx={10} fill={wDone ? WC_COL.answer.fill : "none"} stroke={wDone ? WC_COL.answer.stroke : "#4A5560"} strokeWidth={3} strokeDasharray={wDone ? undefined : "10 6"} />
        {wWork && wWork.k !== undefined && <text x={kcx} y={B.ansY + B.cd} textAnchor="middle" fontSize={B.fd} fontWeight={700} fill={wDone ? WC_COL.answer.ink : "#7A5000"}>{wWork.k}</text>}
        {wWork && wWork.g !== undefined && <text x={gx} y={B.ansY + B.cd} textAnchor="end" fontSize={B.fd} fontWeight={700} fill={wDone ? WC_COL.answer.ink : "#7A5000"}>{wWork.g}</text>}
        {won && (
          <g data-reveals="answer">
            <rect x={B.kg.x + 16} y={B.ansY + 6} width={B.kg.w - 32} height={B.ch} rx={10} fill={WC_COL.answer.fill} stroke={WC_COL.answer.stroke} strokeWidth={4} />
            <rect x={B.g.x + 16} y={B.ansY + 6} width={B.g.w - 32} height={B.ch} rx={10} fill={WC_COL.answer.fill} stroke={WC_COL.answer.stroke} strokeWidth={4} />
            <text x={kcx} y={B.ansY + B.cd} textAnchor="middle" fontSize={B.fd} fontWeight={700} fill={WC_COL.answer.ink}>{it.answer[0]}</text>
            <text x={gx} y={B.ansY + B.cd} textAnchor="end" fontSize={B.fd} fontWeight={700} fill={WC_COL.answer.ink}><tspan fill={WC_GREY}>{lead(it.answer[1])}</tspan>{String(it.answer[1])}</text>
          </g>
        )}
      </g>
    );
  };

  /* P3: the board, and the Carry and the Borrow key together (the child decides) */
  const draw3 = () => {
    if (!B) return null;
    const keys: any[] = [];
    const showKeys = warm ? !S.carried && on !== "kg" : ask && !!nextAct;
    if (showKeys) {
      keys.push(actKey("a", "carry", BC - 252, 240, "Carry"));
      keys.push(actKey("b", "borrow", BC + 12, 240, "Borrow"));
      if (warm && on === "carry") invite = inviteBox(BC - 252, keyY, 240, keyH);
    }
    const cg = (id: string, c: any) => (reg(id, c.x, B.y, c.w, B.rowY(R) - B.y),
      <Hit key={"h" + id} id={id} x={c.x} y={B.y} w={c.w} h={B.rowY(R) - B.y} label={tx(id === "grams" ? "The grams column" : "The kilograms column")} onPress={() => press(id, true)} />);
    return (
      <g>
        {board()}
        {warm && on === "grams" && cg("grams", B.g)}
        {warm && on === "kg" && cg("kg", B.kg)}
        {warm && (on === "grams" || on === "kg") && (invite = inviteBox(on === "grams" ? B.g.x : B.kg.x, B.y, on === "grams" ? B.g.w : B.kg.w, B.rowY(R) - B.y), null)}
        {won && wcAnsTag("ans", BC, keyY + 6, "c", 560, wcAns(it.answer[0], it.answer[1], tx), tx)}
        {keys}
      </g>
    );
  };

  /* P4: the shopping items (a tap puts each weight in its row), then the board */
  const draw4 = () => {
    if (!B) return null;
    let nextIdx = -1;
    const art = it.items.map((x: any, i: number) => {
      const ib = itemBox(i), done = S.placed.includes(i);
      const live = warm ? on === x.id || (on !== "add" && !done) : ask && !done;
      if (!done && nextIdx < 0 && (warm ? on === x.id : ask)) nextIdx = i;
      return (
        <g key={"i" + i}>
          {wcItemArt("a" + i, x.sk, x.m, ib.x + 2, ib.y + 8, 116, ib.h - 16)}
          {wcChip("w" + i, ib.x + 272, ib.y + ib.h / 2, "c", "m", i === 0 ? "given" : "second", wcKgG(x.kg, x.g, tx), T.label, 292)}
          {live && (reg(x.id, ib.x, ib.y, ib.w, ib.h), <Hit key={"h" + i} id={x.id} x={ib.x} y={ib.y} w={ib.w} h={ib.h} label={tx(x.sk === "sack" ? "The bag of rice" : x.sk === "watermelon" ? "The watermelon" : x.sk === "bag" ? "The shopping bag" : "The mango")} onPress={() => press(x.id, true)} />)}
        </g>
      );
    });
    if (nextIdx >= 0) { const ib = itemBox(nextIdx); invite = inviteBox(ib.x, ib.y, ib.w, ib.h); }
    return (
      <g>
        {art}
        {board()}
        {warm && on === "add" && (reg("add", B.x, B.y, B.w, B.h), <Hit key="hadd" id="add" x={B.x} y={B.y} w={B.w} h={B.h} label={tx("The column board")} onPress={() => press("add", true)} />)}
        {warm && on === "add" && (invite = inviteBox(B.x, B.y, B.w, B.h), null)}
        {won && wcAnsTag("ans", ix0, 432, "l", 420, wcAns(it.answer[0], it.answer[1], tx), tx)}
      </g>
    );
  };

  const pic = kind === "kg" ? draw1() : kind === "group" ? draw2() : kind === "col" ? draw3() : kind === "shop" ? draw4() : null;
  ctlRef.current = ctls;
  return (
    <g ref={rootRef}>
      <defs>
        <filter id="wc-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1E293B" floodOpacity="0.12" />
        </filter>
        <linearGradient id="wc-pan-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#8492A6" />
        </linearGradient>
        <linearGradient id="wc-body-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="wc-sack-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2C799" />
          <stop offset="100%" stopColor="#B38D50" />
        </linearGradient>
      </defs>
      {pic}
      {invite}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (a bag of rice and the weight) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item = it || last.it || {};
  /* a unit is drawn in hi/gu only where TR has its line (summary-thumbs fails a Latin letter there); TR has kg and g */
  const u = (s: string) => (lang === "en" || (TR[lang] && TR[lang][s]) ? tx(s) : "");
  let parts: string[] = [];
  if (item.kind === "kg") parts = [[indian(leadNumber(last.value)), u("g")].filter((x) => x !== "").join(" ")];
  else { const [a, b] = slotPartsOf(last.value, 2); parts = [[a, u("kg")].filter((x) => x).join(" "), [b, u("g")].filter((x) => x !== "" && x !== undefined).join(" ")]; }
  const one = parts.join(" ");
  /* each phase's own picture: a bag of rice (P1, P2), a little kg | g board (P3), the watermelon (P4); it gives way when
     the weight needs the whole width (one line at 28 with 10 above and below, never two cramped lines) */
  const ph = Math.min(h - 4, Math.round((wcIndic(one) ? 1.43 : 1.0) * T.micro + 22)), py = h / 2 - ph / 2;
  const kindN = item.kind === "kg" ? 1 : item.kind === "group" ? 2 : item.kind === "col" ? 3 : 4;
  const picW = kindN === 4 ? 62 : kindN === 3 ? 52 : 40, picH = kindN === 4 ? 44 : kindN === 3 ? 44 : 54;
  const withPic = wcTW(one, T.micro) + 20 <= w - picW - 16;
  const px = withPic ? picW + 12 : 4, room = w - px - 4;
  const pic = () => {
    const y = (h - picH) / 2;
    if (kindN === 4) return wcMelonShape("tp", 6, y, picW, picH);
    if (kindN === 3) return (
      <g>
        {/* a small kg | g board: a dark header rule, the column line, the sum rule and a green answer row */}
        <rect x={6} y={y} width={picW} height={picH} rx={6} fill="#FFFFFF" stroke="#2B2B2B" strokeWidth={2} />
        <line x1={8} y1={y + picH * 0.22} x2={4 + picW} y2={y + picH * 0.22} stroke="#2B2B2B" strokeWidth={2.5} />
        <line x1={6 + picW * 0.45} y1={y + 3} x2={6 + picW * 0.45} y2={y + picH - 3} stroke="#2B2B2B" strokeWidth={2} />
        <line x1={9} y1={y + picH * 0.62} x2={3 + picW} y2={y + picH * 0.62} stroke="#2B2B2B" strokeWidth={3} />
        <rect x={10} y={y + picH * 0.68} width={picW - 8} height={picH * 0.24} rx={3} fill={WC_COL.answer.fill} stroke={WC_COL.answer.stroke} strokeWidth={2} />
      </g>
    );
    return <g>{wcSackShape(6, y, picW, picH)}<Skin name="sack" x={6} y={y} w={picW} h={picH} /></g>;
  };
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill="#FFFDF7" stroke={C.rule} strokeWidth={1.5} />
      {withPic && pic()}
      <rect x={px} y={py} width={room} height={ph} rx={12} fill={WC_COL.answer.fill} stroke={WC_COL.answer.stroke} strokeWidth={2.5} />
      <text x={px + room / 2} y={py + 10 + (wcIndic(one) ? 1.02 : 0.76) * T.micro} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={WC_COL.answer.ink}>{one}</text>
    </g>
  );
}

function WeightConverter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default WeightConverter;