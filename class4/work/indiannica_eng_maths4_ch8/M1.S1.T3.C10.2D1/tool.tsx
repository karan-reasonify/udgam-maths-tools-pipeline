/* ═══ M1.S1.T3.C10.2D1 · zoom_grid · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, question bar + answer panel, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The lesson is action-driven: guide steps wait for the child's act,
   and after a right answer the blinking Next key waits for a tap (nextKey).
   A fraction is answered ON the Fraction card of the picture (cardAnswer, PATTERNS §9e); a decimal is typed in the
   panel with the point key (pointKey, PATTERNS §4) and judged in its written form.
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md. */

const TOOL_ID = "zoom_grid";
const MEDIA_ID = "M1.S1.T3.C10.2D1";
const TOOL_NAME = "Zoom Grid";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed before phase 1's teach lines only (not shown: phase 1 has guide steps) */
const OPENING = ["One piece off the strip and into the glass. Watch what happens when it is cut again."];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "Three names on the ladder, and every one of them made by the same single cut.";
/* printed when the child opens Free play: the grid, its three keys and the two cards are what free play offers */
const FREE_LINE = "Free play. Add ten or add one to the grid, then read the fraction and the decimal.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c): the strip of ten tenths with one lifted into the glass, cut again */
const START_HOOK = "What do we call a tenth of a tenth?";
function StartArt({ box, C }: any) {
  const sx = 60, sy = 124, pw = 56, sh = 100, gap = 6;
  const gx = sx + gap * pw;
  const g = { cx: 900, cy: 168, r: 148 };
  const mw = 118, mh = 152, mx = g.cx - mw / 2, my = g.cy - mh / 2;
  return (
    <g>
      {Array.from({ length: ZG_CUT }, (_, i) => (i === gap
        ? <rect key={i} x={sx + i * pw + 2} y={sy} width={pw - 4} height={sh} rx={6} fill="#FFFFFF" stroke={zgInk(CONTENT.ten)} strokeWidth={2.5} strokeDasharray="8 6" />
        : zgPiece(i, sx + i * pw + 1, sy, pw - 2, sh, null, C)))}
      <line x1={gx + pw} y1={sy} x2={g.cx - g.r * 0.86} y2={g.cy - g.r * 0.5} stroke={C.dim} strokeWidth={2.5} strokeDasharray="7 7" />
      <line x1={gx + pw} y1={sy + sh} x2={g.cx - g.r * 0.86} y2={g.cy + g.r * 0.5} stroke={C.dim} strokeWidth={2.5} strokeDasharray="7 7" />
      {zgGlass(g, C, <g>{zgSlices(mx, my, mw, mh, ZG_CUT, ZG_PLACES[1], 3, () => false, C)}</g>)}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final. */
const TR: any = {
  hi: {
    "Zoom Grid": "ज़ूम जाली",
    "What do we call a tenth of a tenth?": "दसवें भाग के दसवें भाग को क्या कहते हैं?",
    "One piece off the strip and into the glass. Watch what happens when it is cut again.": "पट्टी से एक टुकड़ा उठाकर काँच में रखा। देखो, इसे फिर से काटने पर क्या होता है।",
    "Three names on the ladder, and every one of them made by the same single cut.": "सीढ़ी पर तीन नाम, और हर नाम एक ही तरह काटने से बना।",
    "Free play. Add ten or add one to the grid, then read the fraction and the decimal.": "मुक्त खेल। जाली में दस जोड़ो या एक जोड़ो, फिर भिन्न और दशमलव पढ़ो।",
    /* phase 1 */
    "Splitting a tenth again": "दसवें भाग को फिर से बाँटना",
    "Tap the ringed tenth to lift it.": "घेरे वाला दसवाँ भाग टैप करके उठाओ।",
    "Tap the piece with the ring.": "घेरे वाले टुकड़े पर टैप करो।",
    "Tap Split to cut it into pieces.": "बाँटो दबाकर इसे टुकड़ों में काटो।",
    "The Split key is by the glass.": "बाँटो बटन काँच के पास है।",
    "Tap Put back to fill the gap.": "वापस रखो दबाकर खाली जगह भरो।",
    "Put back sits under Split.": "वापस रखो बटन बाँटो के नीचे है।",
    "Every tenth splits like this one.": "हर दसवाँ भाग इसी तरह बँटता है।",
    "Look at one tenth and the small pieces it makes.": "एक दसवाँ भाग और उसके छोटे टुकड़े देखो।",
    "A hundredth is one tenth split into ten, so one tenth is ten hundredths.": "एक दसवें भाग के दस टुकड़े करो तो दस सौवें भाग बनते हैं।",
    "You learned: ten hundredths fit exactly into one tenth.": "तुमने सीखा: दस सौवें भाग मिलकर ठीक एक दसवाँ भाग बनाते हैं।",
    "One small piece of the whole strip": "पूरी पट्टी का एक छोटा टुकड़ा",
    "Write one small piece as a fraction.": "एक छोटे टुकड़े को भिन्न में लिखो।",
    "What was in the glass before it was cut?": "काटने से पहले काँच में क्या था?",
    "Yes, one small piece is one hundredth of the strip. It is written 0.01.": "हाँ, एक छोटा टुकड़ा पट्टी का एक सौवाँ भाग है। इसे 0.01 लिखते हैं।",
    "Hundredths in one tenth?": "एक दसवें भाग में कितने सौवें भाग?",
    "How many hundredths make a tenth?": "कितने सौवें भाग से एक दसवाँ बनता है?",
    "How many pieces fill the gap?": "खाली जगह कितने टुकड़ों से भरी?",
    "Yes, ten hundredths fill one tenth exactly.": "हाँ, दस सौवें भाग ठीक एक दसवाँ भाग भरते हैं।",
    "Shaded part, as a fraction": "रंगा भाग, भिन्न में",
    "What fraction is shaded here?": "यहाँ रंगा भाग कौन सा भिन्न है?",
    "How many squares are shaded, and how many in all?": "कितने खाने रंगे हैं, और कुल कितने?",
    "Right, seven squares out of a hundred are shaded.": "सही, सौ में से सात खाने रंगे हैं।",
    /* phase 2 */
    "One more split, and the pattern is clear": "एक और बँटवारा, और पैटर्न साफ़ है",
    "Tap the ringed square to lift it.": "घेरे वाला खाना टैप करके उठाओ।",
    "Tap the square with the ring.": "घेरे वाले खाने पर टैप करो।",
    "Tap Split to cut it again.": "बाँटो दबाकर इसे फिर काटो।",
    "Split waits under the glass.": "बाँटो बटन काँच के नीचे है।",
    "A tenth cut again made hundredths.": "दसवें भाग को फिर काटकर सौवें भाग बने।",
    "The same cut makes each new place.": "वही कट हर नया स्थान बनाता है।",
    "A thousandth is one hundredth split into ten. Every place is a tenth of the place on its left.": "सौवें भाग के दस टुकड़ों से हज़ारवाँ भाग बनता है। हर स्थान बाईं ओर वाले स्थान का दसवाँ भाग है।",
    "You learned: the same cut by ten makes each new place, again and again.": "तुमने सीखा: दस टुकड़े करने से हर बार एक नया स्थान बनता है।",
    "Name one new piece": "एक नए टुकड़े का नाम",
    "What is one new piece called?": "एक नए टुकड़े को क्या कहते हैं?",
    "Look at the ten new pieces, not the piece before the cut.": "पुराना टुकड़ा नहीं, दस नए टुकड़े देखो।",
    "Yes, one new piece is one thousandth of the grid. It is written 0.001.": "हाँ, एक नया टुकड़ा जाली का एक हज़ारवाँ भाग है। इसे 0.001 लिखते हैं।",
    "Thousandths in one hundredth?": "एक सौवें में कितने हज़ारवें?",
    "How many thousandths make one hundredth?": "एक सौवें भाग में कितने हज़ारवें भाग हैं?",
    "Count the pieces in the glass.": "काँच में टुकड़े गिनो।",
    "Yes, ten thousandths make one hundredth.": "हाँ, दस हज़ारवें भाग से एक सौवाँ भाग बनता है।",
    "Which is ten times smaller?": "कौन सा दस गुना छोटा है?",
    "Which piece is ten times smaller than a hundredth?": "कौन सा टुकड़ा सौवें से दस गुना छोटा है?",
    "What did the last cut make?": "आखिरी कट से क्या बना?",
    "Right, each cut makes pieces ten times smaller.": "सही, हर कट टुकड़ों को दस गुना छोटा करता है।",
    /* phase 3 */
    "Reading a shaded grid": "रंगी हुई जाली पढ़ना",
    "Tap Count to count shaded squares.": "गिनो दबाकर रंगे खाने गिनो।",
    "The Count key is under the grid.": "गिनो बटन जाली के नीचे है।",
    "Tap Whole to count every square.": "पूरा दबाकर सारे खाने गिनो।",
    "The Whole key is beside Count.": "पूरा बटन गिनो के पास है।",
    "Tap the Fraction card to write it.": "भिन्न कार्ड पर टैप करके लिखो।",
    "The Fraction card is at the top right.": "भिन्न कार्ड ऊपर दाईं ओर है।",
    "Now tap the Decimal card.": "अब दशमलव कार्ड पर टैप करो।",
    "Look for the card with the point.": "बिंदु वाला कार्ड ढूँढो।",
    "How many of them are coloured?": "उनमें से कितने रंगे हैं?",
    "Count rows as tens, then the rest.": "पंक्तियाँ दस दस करके गिनो, फिर बाकी।",
    "A shaded figure is read by counting the shaded parts for the top number. The total parts go underneath.": "रंगी आकृति पढ़ने के लिए रंगे भाग गिनो, वह ऊपर की संख्या है। कुल भाग नीचे लिखे जाते हैं।",
    "You learned: the whole grid goes below, the coloured part on top.": "तुमने सीखा: पूरी जाली नीचे, रंगा भाग ऊपर।",
    "This grid, as a fraction": "यह जाली, भिन्न में",
    "What part of this grid is shaded?": "इस जाली का कितना भाग रंगा है?",
    "How many squares are there in all?": "कुल कितने खाने हैं?",
    "Yes, 43 of the 100 squares are shaded.": "हाँ, 100 में से 43 खाने रंगे हैं।",
    "Shaded part, as a decimal": "रंगा भाग, दशमलव में",
    "Now write this one as a decimal.": "अब इसे दशमलव में लिखो।",
    "How many hundredths are shaded?": "कितने सौवें भाग रंगे हैं?",
    "Yes, 86 hundredths is written 0.86.": "हाँ, 86 सौवें भाग को 0.86 लिखते हैं।",
    "The score, as a decimal": "अंक, दशमलव में",
    "Write this test score out of a hundred as a decimal.": "सौ में से मिले अंक दशमलव में लिखो।",
    "Two digits go after the point.": "बिंदु के बाद दो अंक आते हैं।",
    "Right, the score is 0.52 of the whole test.": "सही, अंक पूरी परीक्षा का 0.52 है।",
    /* phase 4 */
    "From words straight to a decimal fraction": "शब्दों से सीधे दशमलव भिन्न",
    "Tap the last word of the amount.": "मात्रा के आखिरी शब्द पर टैप करो।",
    "The last word is on the right.": "आखिरी शब्द दाईं ओर है।",
    "What does that word put below?": "वह शब्द नीचे क्या रखता है?",
    "The last word names the piece size.": "आखिरी शब्द टुकड़े का आकार बताता है।",
    "The last word of a spoken amount names the denominator.": "बोली गई मात्रा का आखिरी शब्द हर का नाम बताता है।",
    "You learned: the word an amount ends on tells you the bottom number.": "तुमने सीखा: मात्रा का आखिरी शब्द नीचे की संख्या बताता है।",
    "Write it as a fraction": "इसे भिन्न में लिखो",
    "Write two hundred five thousandths as a decimal fraction.": "दो सौ पाँच हज़ारवें को भिन्न में लिखो।",
    "What is the last word of the amount?": "मात्रा का आखिरी शब्द क्या है?",
    "Yes, thousandths put a thousand underneath.": "हाँ, हज़ारवें भाग नीचे हज़ार रखते हैं।",
    "Write this amount": "यह मात्रा लिखो",
    "Write thirty-seven thousandths.": "सैंतीस हज़ारवें भाग लिखो।",
    "Which word tells the piece size?": "कौन सा शब्द टुकड़े का आकार बताता है?",
    "Right, the last word gave you the bottom number.": "सही, आखिरी शब्द ने नीचे की संख्या बताई।",
    "Write this one too": "इसे भी लिखो",
    "One more: write four hundred nine thousandths.": "एक और: चार सौ नौ हज़ारवें भाग लिखो।",
    "The hundred is in the top number.": "सौ ऊपर की संख्या में है।",
    "Yes, the hundred went on top, and the word thousandths set the bottom.": "हाँ, सौ ऊपर गया, और हज़ारवें शब्द ने नीचे की संख्या तय की।",
    /* the amounts in the words bay, one tile a "|" */
    "sixty-one hundredths": "इकसठ|सौवें भाग",
    "two hundred five thousandths": "दो|सौ|पाँच|हज़ारवें भाग",
    "thirty-seven thousandths": "सैंतीस|हज़ारवें भाग",
    "four hundred nine thousandths": "चार|सौ|नौ|हज़ारवें भाग",
    /* the working area's words: places, choices, chips, cards, keys */
    "tenths": "दसवें भाग", "hundredths": "सौवें भाग", "thousandths": "हज़ारवें भाग",
    "tenth": "दसवाँ भाग", "hundredth": "सौवाँ भाग", "thousandth": "हज़ारवाँ भाग",
    "one tenth": "एक दसवाँ भाग", "one hundredth": "एक सौवाँ भाग", "one thousandth": "एक हज़ारवाँ भाग",
    "from one tenth": "एक दसवें भाग से", "from one hundredth": "एक सौवें भाग से",
    "times smaller": "गुना छोटा",
    "Fraction": "भिन्न", "Decimal": "दशमलव", "numerator": "अंश", "denominator": "हर",
    "whole part": "पूर्ण भाग", "decimal part": "दशमलव भाग",
    "Split": "बाँटो", "Put back": "वापस रखो", "Count": "गिनो", "Whole": "पूरा",
    "Add ten": "दस जोड़ो", "Add one": "एक जोड़ो", "Clear": "मिटाओ",
    "Lift this tenth": "यह दसवाँ भाग उठाओ", "Lift this square": "यह खाना उठाओ", "The last word": "आखिरी शब्द",
  },
  gu: {
    "Zoom Grid": "ઝૂમ ગ્રીડ",
    "What do we call a tenth of a tenth?": "દશમા ભાગના દશમા ભાગને શું કહેવાય?",
    "One piece off the strip and into the glass. Watch what happens when it is cut again.": "પટ્ટીમાંથી એક ટુકડો કાઢીને કાચમાં મૂક્યો. જુઓ, તેને ફરી કાપવાથી શું થાય છે.",
    "Three names on the ladder, and every one of them made by the same single cut.": "સીડી પર ત્રણ નામ, અને દરેક નામ એક જ રીતે કાપવાથી બન્યું.",
    "Free play. Add ten or add one to the grid, then read the fraction and the decimal.": "મુક્ત રમત. ગ્રીડમાં દસ કે એક ઉમેરો, પછી અપૂર્ણાંક અને દશાંશ વાંચો.",
    /* phase 1 */
    "Splitting a tenth again": "દશમા ભાગને ફરી વહેંચવો",
    "Tap the ringed tenth to lift it.": "વર્તુળવાળો દશમો ભાગ ટૅપ કરી ઉપાડો.",
    "Tap the piece with the ring.": "વર્તુળવાળા ટુકડા પર ટૅપ કરો.",
    "Tap Split to cut it into pieces.": "વહેંચો દબાવી તેના ટુકડા કરો.",
    "The Split key is by the glass.": "વહેંચો બટન કાચની પાસે છે.",
    "Tap Put back to fill the gap.": "પાછા મૂકો દબાવી ખાલી જગ્યા ભરો.",
    "Put back sits under Split.": "પાછા મૂકો બટન વહેંચોની નીચે છે.",
    "Every tenth splits like this one.": "દરેક દશમો ભાગ આ જ રીતે વહેંચાય છે.",
    "Look at one tenth and the small pieces it makes.": "એક દશમો ભાગ અને તેના નાના ટુકડા જુઓ.",
    "A hundredth is one tenth split into ten, so one tenth is ten hundredths.": "એક દશમા ભાગના દસ ટુકડા કરો તો દસ સોમા ભાગ બને છે.",
    "You learned: ten hundredths fit exactly into one tenth.": "તમે શીખ્યા: દસ સોમા ભાગ મળીને બરાબર એક દશમો ભાગ બને છે.",
    "One small piece of the whole strip": "આખી પટ્ટીનો એક નાનો ટુકડો",
    "Write one small piece as a fraction.": "એક નાના ટુકડાને અપૂર્ણાંકમાં લખો.",
    "What was in the glass before it was cut?": "કાપતા પહેલાં કાચમાં શું હતું?",
    "Yes, one small piece is one hundredth of the strip. It is written 0.01.": "હા, એક નાનો ટુકડો પટ્ટીનો એક સોમો ભાગ છે. તે 0.01 લખાય છે.",
    "Hundredths in one tenth?": "એક દશમા ભાગમાં કેટલા સોમા ભાગ?",
    "How many hundredths make a tenth?": "કેટલા સોમા ભાગથી એક દશમો બને?",
    "How many pieces fill the gap?": "ખાલી જગ્યા કેટલા ટુકડાથી ભરાઈ?",
    "Yes, ten hundredths fill one tenth exactly.": "હા, દસ સોમા ભાગ બરાબર એક દશમો ભાગ ભરે છે.",
    "Shaded part, as a fraction": "રંગેલો ભાગ, અપૂર્ણાંકમાં",
    "What fraction is shaded here?": "અહીં રંગેલો ભાગ કયો અપૂર્ણાંક છે?",
    "How many squares are shaded, and how many in all?": "કેટલાં ખાનાં રંગેલાં, અને કુલ કેટલાં?",
    "Right, seven squares out of a hundred are shaded.": "સાચું, સોમાંથી સાત ખાનાં રંગેલાં છે.",
    /* phase 2 */
    "One more split, and the pattern is clear": "એક વધુ ભાગ, અને પેટર્ન સ્પષ્ટ છે",
    "Tap the ringed square to lift it.": "વર્તુળવાળું ખાનું ટૅપ કરી ઉપાડો.",
    "Tap the square with the ring.": "વર્તુળવાળા ખાના પર ટૅપ કરો.",
    "Tap Split to cut it again.": "વહેંચો દબાવી તેને ફરી કાપો.",
    "Split waits under the glass.": "વહેંચો બટન કાચની નીચે છે.",
    "A tenth cut again made hundredths.": "દશમા ભાગને ફરી કાપતાં સોમા ભાગ બન્યા.",
    "The same cut makes each new place.": "એ જ કાપ દરેક નવું સ્થાન બનાવે છે.",
    "A thousandth is one hundredth split into ten. Every place is a tenth of the place on its left.": "એક સોમા ભાગના દસ ટુકડા કરવાથી હજારમો ભાગ બને છે. દરેક સ્થાન તેની ડાબી બાજુના સ્થાનનો દશમો ભાગ છે.",
    "You learned: the same cut by ten makes each new place, again and again.": "તમે શીખ્યા: દસ ટુકડા કરવાથી દર વખતે એક નવું સ્થાન બને છે.",
    "Name one new piece": "એક નવા ટુકડાનું નામ",
    "What is one new piece called?": "એક નવા ટુકડાને શું કહેવાય?",
    "Look at the ten new pieces, not the piece before the cut.": "કાપ પહેલાંનો નહીં, દસ નવા ટુકડા જુઓ.",
    "Yes, one new piece is one thousandth of the grid. It is written 0.001.": "હા, એક નવો ટુકડો ગ્રીડનો એક હજારમો ભાગ છે. તે 0.001 લખાય છે.",
    "Thousandths in one hundredth?": "એક સોમામાં કેટલા હજારમા?",
    "How many thousandths make one hundredth?": "એક સોમા ભાગમાં કેટલા હજારમા ભાગ છે?",
    "Count the pieces in the glass.": "કાચમાંના ટુકડા ગણો.",
    "Yes, ten thousandths make one hundredth.": "હા, દસ હજારમા ભાગથી એક સોમો ભાગ બને છે.",
    "Which is ten times smaller?": "કયો દસ ગણો નાનો છે?",
    "Which piece is ten times smaller than a hundredth?": "કયો ટુકડો સોમાથી દસ ગણો નાનો છે?",
    "What did the last cut make?": "છેલ્લા કાપથી શું બન્યું?",
    "Right, each cut makes pieces ten times smaller.": "સાચું, દરેક કાપ ટુકડાને દસ ગણા નાના કરે છે.",
    /* phase 3 */
    "Reading a shaded grid": "રંગેલી ગ્રીડ વાંચવી",
    "Tap Count to count shaded squares.": "ગણો દબાવી રંગેલાં ખાનાં ગણો.",
    "The Count key is under the grid.": "ગણો બટન ગ્રીડની નીચે છે.",
    "Tap Whole to count every square.": "આખું દબાવી બધાં ખાનાં ગણો.",
    "The Whole key is beside Count.": "આખું બટન ગણોની બાજુમાં છે.",
    "Tap the Fraction card to write it.": "અપૂર્ણાંક કાર્ડ પર ટૅપ કરી લખો.",
    "The Fraction card is at the top right.": "અપૂર્ણાંક કાર્ડ ઉપર જમણે છે.",
    "Now tap the Decimal card.": "હવે દશાંશ કાર્ડ પર ટૅપ કરો.",
    "Look for the card with the point.": "દશાંશ ચિહ્નવાળું કાર્ડ શોધો.",
    "How many of them are coloured?": "તેમાંથી કેટલાં રંગેલાં છે?",
    "Count rows as tens, then the rest.": "હરોળ દસ દસ કરી ગણો, પછી બાકીનાં.",
    "A shaded figure is read by counting the shaded parts for the top number. The total parts go underneath.": "રંગેલી આકૃતિ વાંચવા માટે રંગેલા ભાગ ગણો, તે ઉપરની સંખ્યા છે. કુલ ભાગ નીચે લખાય છે.",
    "You learned: the whole grid goes below, the coloured part on top.": "તમે શીખ્યા: આખી ગ્રીડ નીચે, રંગેલો ભાગ ઉપર.",
    "This grid, as a fraction": "આ ગ્રીડ, અપૂર્ણાંકમાં",
    "What part of this grid is shaded?": "આ ગ્રીડનો કેટલો ભાગ રંગેલો છે?",
    "How many squares are there in all?": "કુલ કેટલાં ખાનાં છે?",
    "Yes, 43 of the 100 squares are shaded.": "હા, 100 ખાનાંમાંથી 43 રંગેલાં છે.",
    "Shaded part, as a decimal": "રંગેલો ભાગ, દશાંશમાં",
    "Now write this one as a decimal.": "હવે આને દશાંશમાં લખો.",
    "How many hundredths are shaded?": "કેટલા સોમા ભાગ રંગેલા છે?",
    "Yes, 86 hundredths is written 0.86.": "હા, 86 સોમા ભાગ 0.86 લખાય છે.",
    "The score, as a decimal": "ગુણ, દશાંશમાં",
    "Write this test score out of a hundred as a decimal.": "સોમાંથી મળેલા આ ગુણ દશાંશમાં લખો.",
    "Two digits go after the point.": "ચિહ્ન પછી બે અંક આવે છે.",
    "Right, the score is 0.52 of the whole test.": "સાચું, ગુણ આખી પરીક્ષાનો 0.52 છે.",
    /* phase 4 */
    "From words straight to a decimal fraction": "શબ્દોથી સીધા દશાંશ અપૂર્ણાંક",
    "Tap the last word of the amount.": "માત્રાના છેલ્લા શબ્દ પર ટૅપ કરો.",
    "The last word is on the right.": "છેલ્લો શબ્દ જમણી બાજુ છે.",
    "What does that word put below?": "તે શબ્દ નીચે શું મૂકે છે?",
    "The last word names the piece size.": "છેલ્લો શબ્દ ટુકડાનું કદ બતાવે છે.",
    "The last word of a spoken amount names the denominator.": "બોલેલી માત્રાનો છેલ્લો શબ્દ છેદનું નામ બતાવે છે.",
    "You learned: the word an amount ends on tells you the bottom number.": "તમે શીખ્યા: માત્રાનો છેલ્લો શબ્દ નીચેની સંખ્યા બતાવે છે.",
    "Write it as a fraction": "તેને અપૂર્ણાંકમાં લખો",
    "Write two hundred five thousandths as a decimal fraction.": "બસો પાંચ હજારમા, દશાંશ અપૂર્ણાંકમાં લખો.",
    "What is the last word of the amount?": "માત્રાનો છેલ્લો શબ્દ કયો છે?",
    "Yes, thousandths put a thousand underneath.": "હા, હજારમા ભાગ નીચે હજાર મૂકે છે.",
    "Write this amount": "આ માત્રા લખો",
    "Write thirty-seven thousandths.": "સાડત્રીસ હજારમા ભાગ લખો.",
    "Which word tells the piece size?": "કયો શબ્દ ટુકડાનું કદ બતાવે છે?",
    "Right, the last word gave you the bottom number.": "સાચું, છેલ્લા શબ્દે નીચેની સંખ્યા આપી.",
    "Write this one too": "આ પણ લખો",
    "One more: write four hundred nine thousandths.": "એક વધુ: ચારસો નવ હજારમા ભાગ લખો.",
    "The hundred is in the top number.": "સો ઉપરની સંખ્યામાં છે.",
    "Yes, the hundred went on top, and the word thousandths set the bottom.": "હા, સો ઉપર ગયા, અને હજારમા શબ્દે નીચેની સંખ્યા નક્કી કરી.",
    /* the amounts in the words bay, one tile a "|" */
    "sixty-one hundredths": "એકસઠ|સોમા ભાગ",
    "two hundred five thousandths": "બસો|પાંચ|હજારમા ભાગ",
    "thirty-seven thousandths": "સાડત્રીસ|હજારમા ભાગ",
    "four hundred nine thousandths": "ચારસો|નવ|હજારમા ભાગ",
    /* the working area's words: places, choices, chips, cards, keys */
    "tenths": "દશમા ભાગ", "hundredths": "સોમા ભાગ", "thousandths": "હજારમા ભાગ",
    "tenth": "દશમો ભાગ", "hundredth": "સોમો ભાગ", "thousandth": "હજારમો ભાગ",
    "one tenth": "એક દશમો ભાગ", "one hundredth": "એક સોમો ભાગ", "one thousandth": "એક હજારમો ભાગ",
    "from one tenth": "એક દશમા ભાગમાંથી", "from one hundredth": "એક સોમા ભાગમાંથી",
    "times smaller": "ગણો નાનો",
    "Fraction": "અપૂર્ણાંક", "Decimal": "દશાંશ", "numerator": "અંશ", "denominator": "છેદ",
    "whole part": "પૂર્ણ ભાગ", "decimal part": "દશાંશ ભાગ",
    "Split": "વહેંચો", "Put back": "પાછા મૂકો", "Count": "ગણો", "Whole": "આખું",
    "Add ten": "દસ ઉમેરો", "Add one": "એક ઉમેરો", "Clear": "સાફ",
    "Lift this tenth": "આ દશમો ભાગ ઉપાડો", "Lift this square": "આ ખાનું ઉપાડો", "The last word": "છેલ્લો શબ્દ",
  },
};

/* ── the places this tool makes, each a tenth of the one above ───────────────────────── */
const ZG_CUT = 10;
const ZG_PLACES = [
  { name: "tenths", den: 10, color: CONTENT.ten, paint: "gTen" },          /* amber */
  { name: "hundredths", den: 100, color: CONTENT.bead, paint: "gBead" },   /* rose */
  { name: "thousandths", den: 1000, color: CONTENT.hundred, paint: "gHundred" }, /* blue */
];
/* coloured numerals take a deeper ink, so they read at 4.5:1 */
const zgInk = (c: string) => shade(c, 0.25);
/* the chapter's reading of a decimal: left of the point deep blue, right of it green, the point vermilion */
const ZG_DEC = { left: shade(CONTENT.hundred, 0.25), right: shade(CONTENT.one, 0.25), point: shade(CONTENT.pointer, 0.25) };
const ZG_M = 24;                      /* the margin inside the working area */
const ZG_LW = 270;                    /* the name ladder's width */
const ZG_FC = { w: 220, h: 232 };     /* the Fraction card */
const ZG_DC = { w: 300, h: 164 };     /* the Decimal card */
const ZG_TENTH = 6;                   /* the tenth phase 1 lifts */
const ZG_CELL = 49;                   /* the hundredth phase 2 lifts: row 5, at the right edge */
const ZG_WARM = 61;                   /* the chapter's own worked figure: 61 of a hundred, 61/100, 0.61 */
const ZG_WARM_WORDS = "sixty-one hundredths";
const ZG_FREE0 = 25;                  /* free play opens on a quarter of the grid shaded */

/* One entry per phase = one mount. Every phase opens on guide steps (one click each, a hint each). */
const PHASES = [
  {
    n: 1,
    concept: "Splitting a tenth again",
    conceptId: "M1.S1.T3.C10", objectiveIds: ["O3"],
    says: ["Cut that one tenth again, and count what comes out."],
    steps: [
      { say: "Tap the ringed tenth to lift it.", on: "lift", hint: "Tap the piece with the ring." },
      { say: "Tap Split to cut it into pieces.", on: "split", hint: "The Split key is by the glass." },
      { say: "Tap Put back to fill the gap.", on: "back", hint: "Put back sits under Split." },
    ],
    ladder: ["Every tenth splits like this one.", "Look at one tenth and the small pieces it makes."],
    closing: "A hundredth is one tenth split into ten, so one tenth is ten hundredths.",
    learned: "You learned: ten hundredths fit exactly into one tenth.",
    traceback: "Every tenth of the strip splits the same way and is counted in tens along the strip, and the card shows the fraction.",
    items: [
      /* learn ML1: answer in the plan = One hundredth, written 1/100 and also 0.01 */
      { qid: "M1.S1.T3.C10:ML1", kind: "piece", depth: 2, parts: SLOT_FRACTION, answer: [1, 100], near: [1, 10], winMs: 6200,
        ask: "One small piece of the whole strip",
        say: "Write one small piece as a fraction.",
        miss: "What was in the glass before it was cut?",
        win: "Yes, one small piece is one hundredth of the strip. It is written 0.01." },
      /* practice 1: answer in the plan = Ten, because hundredths are made by splitting one tenth into ten equal pieces */
      { qid: "M1.S1.T3.C10:1", kind: "count", depth: 2, answer: 10, near: 100, winMs: 3000,
        ask: "Hundredths in one tenth?",
        say: "How many hundredths make a tenth?",
        miss: "How many pieces fill the gap?",
        win: "Yes, ten hundredths fill one tenth exactly." },
      /* practice 2: answer in the plan = 7/100 */
      { qid: "M1.S1.T3.C10:2", kind: "read", shaded: 7, parts: SLOT_FRACTION, answer: [7, 100], near: [7, 10], winMs: 3400,
        ask: "Shaded part, as a fraction",
        say: "What fraction is shaded here?",
        miss: "How many squares are shaded, and how many in all?",
        win: "Right, seven squares out of a hundred are shaded." },
    ],
  },
  {
    n: 2,
    concept: "One more split, and the pattern is clear",
    conceptId: "M1.S1.T3.C11", objectiveIds: ["O3"],
    says: ["Split it once more. What do you think this one will be called?"],
    steps: [
      { say: "Tap the ringed square to lift it.", on: "lift", hint: "Tap the square with the ring." },
      { say: "Tap Split to cut it again.", on: "split", hint: "Split waits under the glass." },
    ],
    ladder: ["A tenth cut again made hundredths.", "The same cut makes each new place."],
    closing: "A thousandth is one hundredth split into ten. Every place is a tenth of the place on its left.",
    learned: "You learned: the same cut by ten makes each new place, again and again.",
    traceback: "The whole is counted rung by rung, tenths, hundredths and thousandths, and the third name lands on the ladder from that count.",
    items: [
      /* learn ML2: answer in the plan = One thousandth, and ten thousandths make one hundredth */
      { qid: "M1.S1.T3.C11:ML2", kind: "name", depth: 3, answer: "thousandth", near: "hundredth", winMs: 5800,
        choices: [{ id: "tenth", label: "tenth" }, { id: "hundredth", label: "hundredth" }, { id: "thousandth", label: "thousandth" }],
        ask: "Name one new piece",
        say: "What is one new piece called?",
        miss: "Look at the ten new pieces, not the piece before the cut.",
        win: "Yes, one new piece is one thousandth of the grid. It is written 0.001." },
      /* practice 3: answer in the plan = Ten */
      { qid: "M1.S1.T3.C11:3", kind: "count", depth: 3, answer: 10, near: 1000, winMs: 2800,
        ask: "Thousandths in one hundredth?",
        say: "How many thousandths make one hundredth?",
        miss: "Count the pieces in the glass.",
        win: "Yes, ten thousandths make one hundredth." },
      /* practice 4: answer in the plan = One thousandth, and it is ten times smaller than one hundredth */
      { qid: "M1.S1.T3.C11:4", kind: "smaller", answer: "thousandth", near: "tenth", winMs: 3300,
        choices: [{ id: "hundredth", label: "hundredth" }, { id: "thousandth", label: "thousandth" }, { id: "tenth", label: "tenth" }],
        ask: "Which is ten times smaller?",
        say: "Which piece is ten times smaller than a hundredth?",
        miss: "What did the last cut make?",
        win: "Right, each cut makes pieces ten times smaller." },
    ],
  },
  {
    n: 3,
    concept: "Reading a shaded grid",
    conceptId: "M1.S1.T3.C12", objectiveIds: ["O4"],
    says: ["Count what is shaded. Now count the whole thing. Write both of them."],
    /* the chapter's worked figure (61 of a hundred) is read off together first; the questions then open on new grids */
    steps: [
      { say: "Tap Count to count shaded squares.", on: "count", hint: "The Count key is under the grid." },
      { say: "Tap Whole to count every square.", on: "whole", hint: "The Whole key is beside Count." },
      { say: "Tap the Fraction card to write it.", on: "fraction", hint: "The Fraction card is at the top right." },
      { say: "Now tap the Decimal card.", on: "decimal", hint: "Look for the card with the point." },
    ],
    stepHold: 2400,
    ladder: ["How many of them are coloured?", "Count rows as tens, then the rest."],
    closing: "A shaded figure is read by counting the shaded parts for the top number. The total parts go underneath.",
    learned: "You learned: the whole grid goes below, the coloured part on top.",
    traceback: "The shaded rows are counted in tens down the left edge, every row to a hundred down the right, and the cards show the amount.",
    items: [
      /* learn ML3: answer in the plan = 43/100, which is written 0.43 */
      { qid: "M1.S1.T3.C12:ML3", kind: "read", shaded: 43, parts: SLOT_FRACTION, answer: [43, 100], near: [43, 10], winMs: 3800,
        ask: "This grid, as a fraction",
        say: "What part of this grid is shaded?",
        miss: "How many squares are there in all?",
        win: "Yes, 43 of the 100 squares are shaded." },
      /* practice 5: answer in the plan = 86/100, which is 0.86 */
      { qid: "M1.S1.T3.C12:5", kind: "decimal", shaded: 86, parts: SLOT_DECIMAL, answer: ["0", "86"], near: "8|6", winMs: 4000,
        ask: "Shaded part, as a decimal",
        say: "Now write this one as a decimal.",
        miss: "How many hundredths are shaded?",
        win: "Yes, 86 hundredths is written 0.86." },
      /* practice 6: answer in the plan = 0.52 */
      { qid: "M1.S1.T3.C12:6", kind: "decimal", shaded: 52, parts: SLOT_DECIMAL, answer: ["0", "52"], near: "5|2", winMs: 3800,
        ask: "The score, as a decimal",
        say: "Write this test score out of a hundred as a decimal.",
        miss: "Two digits go after the point.",
        win: "Right, the score is 0.52 of the whole test." },
    ],
  },
  {
    n: 4,
    concept: "From words straight to a decimal fraction",
    conceptId: "M1.S1.T3.C13", objectiveIds: ["O4"],
    says: ["Listen to the last word. What does that word put underneath?"],
    /* the act shows the method on a warm-up amount (sixty-one hundredths): the last word lights its rung and the
       bottom number lands from it, then the top */
    steps: [
      { say: "Tap the last word of the amount.", on: "last", hint: "The last word is on the right." },
    ],
    stepHold: 2800,
    ladder: ["What does that word put below?", "The last word names the piece size."],
    closing: "The last word of a spoken amount names the denominator.",
    learned: "You learned: the word an amount ends on tells you the bottom number.",
    traceback: "The last word lights with its rung, the number words light together as the top number, and the fraction lands bottom first.",
    items: [
      /* learn ML4: answer in the plan = 205/1000 */
      { qid: "M1.S1.T3.C13:ML4", kind: "words", amount: "two hundred five thousandths", parts: SLOT_FRACTION, answer: [205, 1000], near: [205, 10], winMs: 3000,
        ask: "Write it as a fraction",
        say: "Write two hundred five thousandths as a decimal fraction.",
        miss: "What is the last word of the amount?",
        win: "Yes, thousandths put a thousand underneath." },
      /* practice 7: answer in the plan = 37/1000 */
      { qid: "M1.S1.T3.C13:7", kind: "words", amount: "thirty-seven thousandths", parts: SLOT_FRACTION, answer: [37, 1000], near: [37, 10], winMs: 3300,
        ask: "Write this amount",
        say: "Write thirty-seven thousandths.",
        miss: "Which word tells the piece size?",
        win: "Right, the last word gave you the bottom number." },
      /* practice 8: answer in the plan = 409/1000, and the word thousandths told you */
      { qid: "M1.S1.T3.C13:8", kind: "words", amount: "four hundred nine thousandths", parts: SLOT_FRACTION, answer: [409, 1000], near: [409, 100], winMs: 4800,
        ask: "Write this one too",
        say: "One more: write four hundred nine thousandths.",
        miss: "The hundred is in the top number.",
        win: "Yes, the hundred went on top, and the word thousandths set the bottom." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  cut: ZG_CUT, strip: ZG_CUT, grid: { rows: ZG_CUT, cols: ZG_CUT, cells: ZG_CUT * ZG_CUT },
  places: ZG_PLACES.map((p) => ({ name: p.name, den: p.den })),
  warmUp: { shaded: ZG_WARM, words: ZG_WARM_WORDS },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a fraction fills both boxes of the card; a decimal is its written form exactly (the zero in front counts);
   a count is its digits exactly */
const zgIsDec = (item: any) => !!(item && item.parts && item.parts.some((p: any) => p.at === "dwhole"));
const judge = (item: any, v: any) => {
  /* a decimal on the Decimal card: both boxes digit for digit, the whole box too ("0", never empty, never "00") */
  if (zgIsDec(item)) { const g = decimalPartsOf(v), want = decimalPartsOf(item.answer); return g[0] === want[0] && g[1] === want[1]; }
  if (item.parts) return judgeSlotParts(item, v);
  return String(v).trim() === String(item.answer);
};

/* a second route to every answer, sharing no code with judge or the picture: the places are rebuilt by repeated
   cutting, a shaded grid is read digit by digit, and an amount in words is read word by word */
const ZG_WORDNUM: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18,
  nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const ZG_DENOF: Record<string, number> = { tenths: 10, hundredths: 100, thousandths: 1000 };
/* "two hundred five thousandths" -> { top: 205, den: 1000 } */
const zgReadAmount = (line: string) => {
  const ws = String(line).toLowerCase().split(/[\s-]+/).filter(Boolean);
  let top = 0;
  for (const x of ws.slice(0, -1)) {
    if (x === "hundred") top *= 100;
    else if (ZG_WORDNUM[x] !== undefined) top += ZG_WORDNUM[x];
  }
  return { top, den: ZG_DENOF[ws[ws.length - 1]] || 0 };
};
const oracle = () => {
  const dens = [ZG_CUT];
  while (dens.length < 3) dens.push(dens[dens.length - 1] * ZG_CUT);
  const okPlaces = ZG_PLACES.every((p, k) => p.den === dens[k]);
  return okPlaces && PHASES.every((p: any) => p.items.length === 3 && p.items.every((it: any) => {
    const A = it.answer;
    if (it.kind === "piece") return Array.isArray(A) && A[0] === 1 && A[1] === dens[it.depth - 1];
    if (it.kind === "count") return A === dens[it.depth - 1] / dens[it.depth - 2];
    /* a piece is named by how many of it make the whole: 10 -> tenth, 100 -> hundredth, 1000 -> thousandth */
    const nameOf = (den: number) => (({ 10: "tenth", 100: "hundredth", 1000: "thousandth" } as any)[den] || "");
    const offered = (x: any) => (it.choices || []).some((c: any) => c.id === x);
    if (it.kind === "name") return A === nameOf(dens[it.depth - 1]) && offered(A);
    if (it.kind === "smaller") return A === nameOf(dens[1] * ZG_CUT) && offered(A) && offered(nameOf(dens[1]));
    if (it.kind === "read") return Array.isArray(A) && A[0] === it.shaded && A[1] === dens[1] && it.shaded < dens[1];
    if (it.kind === "decimal") return Array.isArray(A) && A[0] === "0" && A[1] === String(Math.floor(it.shaded / 10)) + String(it.shaded % 10);
    if (it.kind === "words") {
      const r = zgReadAmount(it.amount);
      return Array.isArray(A) && r.top === A[0] && r.den === A[1] && String(it.say).toLowerCase().indexOf(it.amount) >= 0;
    }
    return false;
  })) && zgReadAmount(ZG_WARM_WORDS).top === ZG_WARM;
};

/* the most likely wrong answer (each item's misconception): a piece or a grid written over ten, a spoken amount
   over ten or over the hundred it heard, a count read off the place's name, a decimal with the zero left off */
const nearMiss = (item: any) => (Array.isArray(item.near) ? item.near.join("|") : item.near);
/* the forms of an answer that no question, hint or ladder line may print (no commas inside a fraction or a decimal;
   in phase 4 the number in words IS the question, so its top number in words is not listed) */
const answerForms = (item: any) => {
  if (item.choices) return [String(item.answer)];
  if (item.kind === "decimal") { const s = item.answer.join("."); return [s, speakable(s)]; }
  if (item.parts) {
    const top = item.answer[0], den = item.answer[1];
    const out = [String(den), words(den)];
    if (den >= 1000) out.push(indian(den));
    if (item.kind !== "words" && top >= 10) out.push(String(top), words(top));
    return out;
  }
  return [String(item.answer), words(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T2: any) => (T2.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T2.submit(item.answer));
/* the agent's answer(): nothing of the tool's own; a decimal's two boxes take "0.86", ["0", "86"] or "0|86" through the
   runtime's own toolApi.answer (SLOT_DECIMAL), a fraction its two numbers, a choice its id */
const answer = (item: any, v: any) => { void item; void v; return undefined; };
/* the agent's check() before Enter: nothing waits on the picture, so Enter answers (in the demo it performs the step) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing helpers (called, never mounted) ─────────────────────────────────────────── */

const zgNorm = (v: any) => (Array.isArray(v) ? v.map((x: any) => (x === null || x === undefined ? "" : String(x))).join("|") : String(v ?? ""));
const zgRows = (s: number) => Math.ceil(s / ZG_CUT);
const zgDecOf = (s: number) => (s >= 100 ? ["1", "00"] : ["0", String(Math.floor(s / 10)) + String(s % 10)]);
const zgLerp = (a: any, b: any, t: number) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, w: a.w + (b.w - a.w) * t, h: a.h + (b.h - a.h) * t });
const zgLadX = (w: number) => w - ZG_M - ZG_LW;
const zgRungY = (k: number) => 16 + k * 94;

/* the layouts, from the room the working area has just now (box.w: 1472 shut, 1086 with the panel open) */
const zgP1 = (w: number) => {
  const ladX = zgLadX(w);
  const L = Math.min(780, ladX - 32 - ZG_M);
  return {
    ladX, strip: { x: ZG_M, y: 48, w: L, h: 96, pw: L / ZG_CUT },
    glass: { cx: Math.max(398, ZG_M + L / 2), cy: 316, r: 140 },
    grid: { cell: 40, y: 40, x: ZG_M + 60 + Math.max(0, (ladX - 32 - ZG_M - 60 - 400 - 64) / 2) },
    card: { x: ladX + (ZG_LW - ZG_FC.w) / 2, y: 290 },
    split: { x: ZG_M, y: 232, w: 200, h: 72 }, back: { x: ZG_M, y: 324, w: 200, h: 72 }, noteX: ZG_M + 108,
  };
};
const zgP2 = (w: number) => {
  const ladX = zgLadX(w);
  const grid = { x: ZG_M + 16, y: 64, cell: 30 };
  const cx = (grid.x + 300 + ladX) / 2;
  return { ladX, grid, glass: { cx, cy: 210, r: 140 }, split: { x: cx - 100, y: 384, w: 200, h: 72 },
    card: { x: ladX + (ZG_LW - ZG_FC.w) / 2, y: 290 } };
};
const zgP3 = (w: number) => {
  const colX = w - ZG_M - ZG_DC.w;
  const lo = ZG_M + 64, hi = colX - 72;
  const gx = lo + Math.max(0, (hi - lo - 380) / 2);
  /* the grid stands 40 down so the warm-up can count its columns along the top edge */
  return { grid: { x: gx, y: 40, cell: 38 }, fc: { x: colX + (ZG_DC.w - ZG_FC.w) / 2, y: 16 }, dc: { x: colX, y: 272 }, lo, hi };
};
const zgP4 = (w: number) => {
  const ladX = zgLadX(w);
  const bw = ladX - 32 - ZG_M;
  return { ladX, bay: { x: ZG_M, w: bw, y: 48, h: 72 }, card: { x: ZG_M + bw / 2 - ZG_FC.w / 2, y: 280 } };
};

/* a magnifier: a lens with a plain rim and a handle; what it holds is drawn inside */
function zgGlass(g: any, C: any, inner: any) {
  const a = g.r * 0.71;
  return (
    <g>
      <line x1={g.cx + a} y1={g.cy + a} x2={g.cx + a + 36} y2={g.cy + a + 36} stroke={shade(C.rule, 0.35)} strokeWidth={18} strokeLinecap="round" />
      <circle cx={g.cx} cy={g.cy} r={g.r} fill="#FFFFFF" stroke={shade(C.rule, 0.2)} strokeWidth={10} filter="url(#fShadowSoft)" />
      {inner}
      <circle cx={g.cx} cy={g.cy} r={g.r - 6} fill="none" stroke={tint(C.rule, 0.5)} strokeWidth={2} />
    </g>
  );
}

/* ONE PIECE of the chocolate the child acts on, in its own box: the plain shape (the fallback, the whole drawing when
   no picture loads), the `piece` skin stretched over it, then, for a piece that stands for a place being talked about
   (P: tenths amber, hundredths rose, thousandths blue), that place's light wash (0.5, so the chocolate shows through) with a dark outline. The wash and
   the outline are drawn with or without the picture, so the plain drawing never changes. */
function zgPiece(key: any, x: number, y: number, w: number, h: number, P: any, C: any, hl = false) {
  const rx = Math.min(6, h / 3);
  const edge = hl ? C.ink : P ? shade(P.color, 0.45) : zgInk(CONTENT.ten);
  return (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={`url(#${(P || ZG_PLACES[0]).paint})`} />
      <Skin name="piece" x={x} y={y} w={w} h={h} fit="stretch" />
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={P ? P.color : "none"} fillOpacity={P ? 0.5 : undefined}
        stroke={edge} strokeWidth={hl ? 4 : P ? 2 : 1.5} />
    </g>
  );
}

/* a piece cut into n slices along its height, each slice its own piece; `sep` pulls them apart, `hl(j)` outlines one */
function zgSlices(x: number, y: number, w: number, h: number, n: number, P: any, sep: number, hl: any, C: any) {
  const sh = (h - sep * (n - 1)) / n;
  return Array.from({ length: n }, (_, j) => zgPiece(j, x, y + j * (sh + sep), w, sh, P, C, !!hl(j)));
}

/* the written place of what the glass holds, on a light chip (the tint is never the only cue) */
function zgChip(cx: number, y: number, text: string, C: any) {
  const w = Math.round(text.length * T.micro * 0.58) + 32;
  return (
    <g pointerEvents="none">
      <rect x={cx - w / 2} y={y} width={w} height={40} rx={12} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={1.5} />
      <text x={cx} y={y + 29} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{text}</text>
    </g>
  );
}

/* a ten by ten grid: `shaded` cells filled row by row; `lit` rows counted down the left edge (in tens, the part row
   last), `right` rows counted down the right edge; `tintAll` shades every cell faintly (a grid of hundredths); `gap` a lifted cell */
function zgGridPic(g: any, C: any, shaded: number, o: any = {}) {
  const c = g.cell, S = c * ZG_CUT, full = Math.floor(shaded / ZG_CUT);
  const lit = o.lit || 0;
  /* every cell is its own piece with its own box (x, y, c, c): the plain cell, then (later) its skin, then the shading
     over it, so a picture laid on a cell never hides which cells are shaded */
  const cells: any[] = [];
  for (let k = 0; k < ZG_CUT * ZG_CUT; k++) {
    const q = k % ZG_CUT, r = Math.floor(k / ZG_CUT);
    const x = g.x + q * c, y = g.y + r * c;
    /* the order the cells are shaded in: row by row, or column by column (the textbook's 61: seven in the top row) */
    const at = o.byCol ? q * ZG_CUT + r : k;
    if (o.gap === k) continue;
    cells.push(
      <g key={k}>
        <rect x={x} y={y} width={c} height={c} fill={o.tintAll ? tint(CONTENT.bead, 0.62) : "#FFFFFF"} />
        {at < shaded && <rect x={x} y={y} width={c} height={c} fill="url(#gBead)" />}
      </g>
    );
  }
  const lines: any[] = [];
  for (let j = 0; j <= ZG_CUT; j++) {
    const edge = j === 0 || j === ZG_CUT;
    lines.push(<line key={"h" + j} x1={g.x} y1={g.y + j * c} x2={g.x + S} y2={g.y + j * c} stroke={edge ? shade(C.rule, 0.35) : shade(C.rule, 0.15)} strokeWidth={edge ? 3 : 1.5} />);
    lines.push(<line key={"v" + j} x1={g.x + j * c} y1={g.y} x2={g.x + j * c} y2={g.y + S} stroke={edge ? shade(C.rule, 0.35) : shade(C.rule, 0.15)} strokeWidth={edge ? 3 : 1.5} />);
  }
  const gx = o.gap !== undefined ? g.x + (o.gap % ZG_CUT) * c : 0, gy = o.gap !== undefined ? g.y + Math.floor(o.gap / ZG_CUT) * c : 0;
  return (
    <g>
      <rect x={g.x} y={g.y} width={S} height={S} fill="#FFFFFF" filter="url(#fShadowSoft)" />
      {cells}
      {o.gap !== undefined && <rect x={gx} y={gy} width={c} height={c} fill="#FFFFFF" />}
      {lines}
      {o.gap !== undefined && <rect x={gx + 2} y={gy + 2} width={c - 4} height={c - 4} fill="none" stroke={zgInk(CONTENT.bead)} strokeWidth={2.5} strokeDasharray="5 4" />}
      {lit > 0 && o.byCol && (
        <rect x={g.x + (lit - 1) * c + 2} y={g.y - 3} width={c - 4} height={((lit - 1) < full ? ZG_CUT : shaded % ZG_CUT) * c + 6} rx={6}
          fill="none" stroke={zgInk(CONTENT.bead)} strokeWidth={4} />
      )}
      {o.byCol && Array.from({ length: lit }, (_, q) => (
        <text key={"T" + q} x={g.x + q * c + c / 2} y={g.y - 12} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>
          {q < full ? (q + 1) * ZG_CUT : shaded}
        </text>
      ))}
      {lit > 0 && !o.byCol && (
        <rect x={g.x - 3} y={g.y + (lit - 1) * c + 2} width={((lit - 1) < full ? ZG_CUT : shaded % ZG_CUT) * c + 6} height={c - 4} rx={6}
          fill="none" stroke={zgInk(CONTENT.bead)} strokeWidth={4} />
      )}
      {!o.byCol && Array.from({ length: lit }, (_, r) => (
        <text key={"L" + r} x={g.x - 12} y={g.y + r * c + c / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>
          {r < full ? (r + 1) * ZG_CUT : shaded}
        </text>
      ))}
      {Array.from({ length: o.right || 0 }, (_, r) => (
        <text key={"R" + r} x={g.x + S + 12} y={g.y + r * c + c / 2 + 10} fontSize={T.micro} fontWeight={600} fill={C.ink}>{(r + 1) * ZG_CUT}</text>
      ))}
    </g>
  );
}

/* the name ladder: one rung a place, each written in as the cut that makes it is understood; a dashed blank rung waits
   under the last one; an arrow down from a rung is the tie to the place below it (the same split) */
function zgLadder(x: number, C: any, tx: any, o: any) {
  const out: any[] = [];
  for (let k = 0; k < 3; k++) {
    const y = zgRungY(k), P = ZG_PLACES[k];
    if (k < o.rungs) {
      const lit = o.lit === k;
      out.push(
        <g key={"r" + k}>
          <rect x={x} y={y} width={ZG_LW} height={64} rx={14} fill={lit ? tint(P.color, 0.78) : "#FFFFFF"} stroke={lit ? zgInk(P.color) : C.rule} strokeWidth={lit ? 4 : 2} filter="url(#fShadowSoft)" />
          <rect x={x + 7} y={y + 7} width={14} height={50} rx={7} fill={`url(#${P.paint})`} />
          <text x={x + 12 + (ZG_LW - 12) / 2} y={y + 43} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(P.name)}</text>
        </g>
      );
    } else if (k === o.rungs && o.blank) {
      out.push(
        <g key={"r" + k}>
          <rect x={x} y={y} width={ZG_LW} height={64} rx={14} fill="none" stroke={shade(C.dim, 0.2)} strokeWidth={2.5} strokeDasharray="10 8" />
          <text x={x + ZG_LW / 2} y={y + 43} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>?</text>
        </g>
      );
    }
    if (k < 2 && k < o.ties) {
      const ax = x + ZG_LW / 2, y1 = y + 70, y2 = y + 88;
      out.push(<path key={"t" + k} d={`M ${ax} ${y1} V ${y2} M ${ax - 9} ${y2 - 9} L ${ax} ${y2} L ${ax + 9} ${y2 - 9}`} fill="none"
        stroke={C.ink} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />);
    }
  }
  return <g>{out}</g>;
}

/* a card that is not being asked and holds nothing yet is COVERED: its title over a plain cover, no empty boxes that
   would look like a place to answer (it fills at the win, or never) */
function zgCover(x: number, y: number, w: number, h: number, title: string, C: any) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      <text x={x + w / 2} y={y + 32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{title}</text>
      <rect x={x + 16} y={y + 44} width={w - 32} height={h - 60} rx={12} fill={tint(C.panel, 0.35)} stroke={tint(C.rule, 0.3)} strokeWidth={1.5} />
    </g>
  );
}

/* the Fraction card: a numerator box over a bar over a denominator box; `active` is the box with the caret */
function zgFracCard(x: number, y: number, top: string, bot: string, C: any, tx: any, active = -1, covered = false) {
  if (covered) return zgCover(x, y, ZG_FC.w, ZG_FC.h, tx("Fraction"), C);
  const sz = Math.max(String(top).length, String(bot).length) > 4 ? T.prompt : T.xl;
  const box = (j: number, by: number, v: string) => {
    const on = active === j, nw = String(v).length * sz * 0.6;
    return (
      <g key={j}>
        <rect x={x + 35} y={by} width={150} height={76} rx={12} fill={v === "" ? tint(C.panel, 0.55) : "#FFFFFF"} stroke={on ? C.accent : C.rule} strokeWidth={on ? 4 : 2} />
        {v !== "" && <text x={x + 110} y={by + 38 + sz * 0.36} textAnchor="middle" fontSize={sz} fontWeight={700} fill={C.ink}>{v}</text>}
        {on && <rect className="c4-caret" x={x + 110 + nw / 2 + 4} y={by + (76 - sz * 0.8) / 2} width={3} height={sz * 0.8} rx={1.5} fill={C.accent} />}
      </g>
    );
  };
  return (
    <g>
      <rect x={x} y={y} width={ZG_FC.w} height={ZG_FC.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      <text x={x + ZG_FC.w / 2} y={y + 32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Fraction")}</text>
      {box(0, y + 44, String(top))}
      <line x1={x + 30} y1={y + 132} x2={x + ZG_FC.w - 30} y2={y + 132} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      {box(1, y + 144, String(bot))}
    </g>
  );
}

/* the Decimal card: [whole] . [decimal part], the point already drawn between them; on a decimal question it is the
   answer box (`active` is the box with the caret); digits set at one size in both boxes, stepping down together */
function zgDecCard(x: number, y: number, whole0: string, dec0: string, C: any, tx: any, active = -1, covered = false) {
  if (covered) return zgCover(x, y, ZG_DC.w, ZG_DC.h, tx("Decimal"), C);
  const whole = String(whole0).slice(-5), dec = String(dec0).slice(-6);
  const n = Math.max(whole.length, Math.ceil(dec.length * 0.8));
  const size = n <= 3 ? T.xl : n <= 4 ? T.label : T.micro;
  const box = (j: number, bx: number, bw: number, v: string, ink: string) => {
    const on = active === j, nw = v.length * size * 0.6;
    return (
      <g key={j}>
        <rect x={bx} y={y + 48} width={bw} height={96} rx={12} fill={v === "" && !on ? tint(C.panel, 0.55) : "#FFFFFF"} stroke={on ? C.accent : C.rule} strokeWidth={on ? 4 : 2} />
        {v !== "" && <text x={bx + bw / 2} y={y + 96 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={ink}>{v}</text>}
        {on && <rect className="c4-caret" x={bx + bw / 2 + nw / 2 + 4} y={y + 96 - size * 0.4} width={3} height={size * 0.8} rx={1.5} fill={C.accent} />}
      </g>
    );
  };
  return (
    <g>
      <rect x={x} y={y} width={ZG_DC.w} height={ZG_DC.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      <text x={x + ZG_DC.w / 2} y={y + 32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Decimal")}</text>
      {box(0, x + 20, 100, whole, ZG_DEC.left)}
      <circle cx={x + 140} cy={y + 132} r={7} fill={ZG_DEC.point} />
      {box(1, x + 160, 120, dec, ZG_DEC.right)}
    </g>
  );
}

/* a toy key of the picture (Split, Put back, Count, Whole, the free-play keys); quiet and inert while its act is not awaited */
/* the one invite on a key, a card or a word chip: the runtime's pulse on a rounded rectangle that hugs the whole thing
   (10 off its edge, so even at the pulse's smallest it never crosses the label); a piece keeps the round <Invite/> */
function zgInviteBox(x: number, y: number, w: number, h: number, C: any) {
  const ink = (typeof THEME !== "undefined" && THEME && THEME.enter && THEME.enter[1]) || C.accent;
  return <rect className="c4-pulse" x={x - 10} y={y - 10} width={w + 20} height={h + 20} rx={24} fill="none" stroke={ink} strokeWidth={5} pointerEvents="none" />;
}

function zgKey(id: string, r: any, label: string, live: boolean, onClick: any, C: any) {
  return (
    <Key key={id} id={id} x={r.x} y={r.y} w={r.w} h={r.h} C={C} tone="key" disabled={!live} label={label} onClick={onClick}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={live ? toneInk("key", C.ink) : C.accent}>{label}</text>
    </Key>
  );
}

/* the words bay: the amount one word a tile; `lit` lights the last word (it names the pieces), `group` lights the
   number words together, with the top number they build written under them */
const zgTileW = (s: string) => Math.max(110, Math.round(s.length * T.label * 0.6) + 40);
function zgBayLayout(b: any, ws: string[]) {
  const wide = ws.map(zgTileW), gap = 14;
  const total = wide.reduce((a: number, c: number) => a + c, 0) + (ws.length - 1) * gap;
  let x = b.x + Math.max(0, (b.w - total) / 2);
  return wide.map((tw: number) => { const at = x; x += tw + gap; return { x: at, w: tw }; });
}

/* the step a traceback is drawn in, item by item (ms each); the drawing reads how many have run */
function zgFixPlan(it: any): number[] {
  const rep = (k: number, ms: number) => Array.from({ length: k }, () => ms);
  if (it.kind === "piece" && it.depth === 2) return rep(10, 90).concat(rep(10, 150), [700]);
  if (it.kind === "name") return rep(3, 650).concat([700]);
  if (it.kind === "count" || it.kind === "smaller") return rep(10, 230).concat([700]);
  if (it.kind === "read") return rep(zgRows(it.shaded), 300).concat(rep(10, 110), [700]);
  if (it.kind === "decimal") return rep(zgRows(it.shaded), 300).concat(rep(10, 110), [600, 700]);
  if (it.kind === "words") return [600, 650, 500, 700];
  return [600];
}

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Laid out from box.w (1472 shut, 1086 with the panel open). Origin at the area's top-left. */
function Work({ n, item, index, stage, wrong, typed, part, api, stepOn, box, answerOn, tx = (v: any) => v }: any) {
  const C = api.C;
  const w = box ? box.w : W.w;
  const open = !!(box && box.open);
  const tlA = useTimeline();
  const tlF = useTimeline();
  const [d, setD] = useState(0);                 /* the guide steps' acts done so far */
  const [an, setAn] = useState<any>({});         /* what an act in progress has drawn so far */
  const [fix, setFix] = useState<any>(null);     /* the traceback: { k: steps drawn, done, stale: the miss as typed } */
  const [freeN, setFreeN] = useState(ZG_FREE0);
  const busy = useRef(false);
  const free = stage === "free";
  const demo = stage === "demo" || stage === "teach";
  const won = stage === "win" || stage === "idle" || stage === "summary";
  const it = item || {};
  const kind = free ? "free" : it.kind;
  const fk = fix ? fix.k : 0;
  const fixing = !!fix && !fix.done;

  /* GUIDE STEPS: each act runs when the child does it and is reported with api.did the moment it is done */
  const frames = (k: number, ms: number, f: (j: number) => void) => Array.from({ length: k }, (_, j) => [ms, () => f(j)]);
  const doAct = (on: any) => {
    if (busy.current || stage !== "demo" || !on || on !== stepOn) return;
    busy.current = true;
    const end = (fx?: any) => () => { busy.current = false; setAn({}); if (fx) fx(); api.did(on); };
    if ((n === 1 || n === 2) && on === "lift") {
      tlA.run(frames(4, 70, (j) => setAn({ rise: (j + 1) / 4 })), end(() => { setD(1); api.sfx.settle(); }));
    } else if ((n === 1 || n === 2) && on === "split") {
      api.sfx.cut();
      tlA.run(frames(9, 55, (j) => setAn({ cuts: j + 1 })).concat([[260, () => setAn({ cuts: 9, apart: true })]]), end(() => { setD(2); api.sfx.settle(); }));
    } else if (n === 1 && on === "back") {
      tlA.run(frames(4, 80, (j) => setAn({ home: (j + 1) / 4 })), end(() => { setD(3); api.sfx.trade(); }));
    } else if (n === 3 && on === "count") {
      tlA.run(frames(zgRows(ZG_WARM), 230, (j) => { setAn({ rows: j + 1 }); api.sfx.tick(); }), end(() => setD(1)));
    } else if (n === 3 && on === "whole") {
      tlA.run(frames(ZG_CUT, 100, (j) => setAn({ right: j + 1 })), end(() => { setD(2); api.sfx.settle(); }));
    } else if (n === 3 && on === "fraction") {
      tlA.run([[320, () => setAn({ frac: true })]], end(() => { setD(3); api.sfx.settle(); }));
    } else if (n === 3 && on === "decimal") {
      tlA.run([[320, () => setAn({ dec: true })]], end(() => { setD(4); api.sfx.settle(); }));
    } else if (n === 4 && on === "last") {
      tlA.run([[380, () => setAn({ lit: true })], [440, () => setAn({ lit: true, bot: true })]], end(() => { setD(1); api.sfx.settle(); }));
    } else busy.current = false;
  };
  /* a tap on a control of the picture: the awaited act runs, any other is reported (its step's hint shows) */
  const press = (on: any) => {
    if (stage !== "demo") return;
    if (on !== stepOn) { api.did(on); return; }
    doAct(on);
  };
  api.onEnter(stage === "demo" && stepOn ? () => doAct(stepOn) : null);
  HOOK.demo = () => { if (stage === "demo" && stepOn) doAct(stepOn); };

  /* a new question opens on a fresh picture; the traceback of the last one goes */
  useEffect(() => { setFix(null); tlF.stop(); }, [n, index]);
  /* once the correction has run and the pad is back, the child's FIRST act (any key, a digit equal to the one there,
     rub out, Enter, a tap on a key or a box) takes the correction's answer off the card, so what is drawn is what is judged */
  const fixDone = !!(fix && fix.done && !fix.cleared);
  useEffect(() => {
    if (!fixDone) return;
    const clear = () => setFix((f: any) => (f ? { ...f, cleared: true } : f));
    window.addEventListener("keydown", clear, true);
    window.addEventListener("pointerdown", clear, true);
    return () => { window.removeEventListener("keydown", clear, true); window.removeEventListener("pointerdown", clear, true); };
  }, [fixDone]);

  /* the traceback: redraw the maths in steps and end on the whole right answer; the child's answer stays */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const plan = zgFixPlan(it);
    api.lock(true);
    setFix({ k: 0, done: false, stale: zgNorm(wrong.value) });
    tlF.run(plan.map((ms: number, j: number) => [ms, () => setFix((f: any) => ({ ...(f || {}), k: j + 1 }))]), () => {
      setFix((f: any) => ({ ...(f || {}), done: true }));
      api.lock(false);
    });
  }, [wrong]);

  /* a right answer: one short line of the tool's own */
  useEffect(() => { if (stage === "win" && it.win) api.say(it.win); }, [stage, index]);

  /* what the host and the agent read back (toolApi.getState): never the answer before it is given */
  api.share({ lifted: (n === 1 || n === 2) && (!demo || d >= 1), splitDepth: (n === 1 || n === 2) && (!demo || d >= 2) ? n + 1 : n, complete: stage === "idle" });

  /* the asked Fraction card: the typed digits, or the correction's answer until the child types something new */
  const cardQ = answerOn === "card";
  const tp = slotPartsOf(typed || "", 2);
  const fixVals = (): any => {
    if (!fix || fix.cleared || zgNorm(typed) !== fix.stale || !it.parts) return null;
    const A = it.answer;
    if (kind === "piece") return fk >= 21 ? A : null;
    if (kind === "read") return fk >= zgRows(it.shaded) + 11 ? A : null;
    if (kind === "decimal") return fk >= zgRows(it.shaded) + 12 ? A : null;
    if (kind === "words") return fk >= 4 ? A : fk >= 3 ? ["", A[1]] : null;
    return null;
  };
  const fv = fixVals();
  /* the asked card is the answer box (PATTERNS 9e): shut, it blinks and one tap opens the keypad; open, its two boxes are
     part-1 and part-2 with the digits typed IN them; after a miss it shows the correction's answer until the child types */
  const asked = (x: number, y: number) => {
    const top = fv ? String(fv[0]) : tp[0], bot = fv ? String(fv[1]) : tp[1];
    const dec = zgIsDec(it), cw = dec ? ZG_DC.w : ZG_FC.w, ch = dec ? ZG_DC.h : ZG_FC.h;
    const boxes = dec
      ? [{ x: x + 16, y: y + 44, w: 124, h: 104, label: "whole part" }, { x: x + 148, y: y + 44, w: 140, h: 104, label: "decimal part" }]
      : [{ x: x + 20, y: y + 40, w: ZG_FC.w - 40, h: 88, label: "numerator" }, { x: x + 20, y: y + 138, w: ZG_FC.w - 40, h: 88, label: "denominator" }];
    return (
      <g>
        {dec ? zgDecCard(x, y, top, bot, C, tx, cardQ && open ? part : -1) : zgFracCard(x, y, top, bot, C, tx, cardQ && open ? part : -1)}
        {cardQ && open && boxes.map((b, j) => (
          <SlotPartBox key={"p" + j} id={"part-" + (j + 1)} label={tx(b.label)} x={b.x} y={b.y} w={b.w} h={b.h} on={part === j} onPick={() => api.pickPart(j)} />
        ))}
        {cardQ && !open && !fixing && <BlinkRing x={x} y={y} w={cw} h={ch} rx={18} C={C} />}
        {cardQ && !open && !fixing && <SlotPartBox id="answer-open" label={tx(dec ? "Decimal" : "Fraction")} x={x} y={y} w={cw} h={ch} on={false} onPick={api.openAnswer} />}
      </g>
    );
  };

  /* ── phase 1: the strip, the glass, the ladder ── */
  const p1 = () => {
    const L = zgP1(w), s = L.strip, g = L.glass;
    const gapR = { x: s.x + ZG_TENTH * s.pw + 1, y: s.y, w: s.pw - 2, h: s.h };
    const magR = { x: g.cx - 75, y: g.cy - 96, w: 150, h: 192 };
    const gridView = !demo && kind === "read";
    const lift = demo ? d >= 1 : true, cut = demo ? d >= 2 : true, home = demo ? d >= 3 : true;
    const splitAll = kind === "piece" && fix ? Math.min(ZG_CUT, fk) : 0;
    const tens = kind === "piece" && fix ? Math.max(0, Math.min(ZG_CUT, fk - ZG_CUT)) : 0;
    const cnt = kind === "count" ? (won ? ZG_CUT : fix ? Math.min(ZG_CUT, fk) : 0) : 0;
    const note = kind === "count" && (won || fk > ZG_CUT);
    const rungs = demo ? 1 : (index > 0 || won || (kind === "piece" && fk >= 21)) ? 2 : 1;
    const ties = !demo && (index > 1 || (index === 1 && (won || fk > ZG_CUT))) ? 1 : 0;
    const hl = (j: number) => (cnt > 0 ? j < cnt : !demo && kind === "piece" && j === 0);
    /* a tenth cut into ten, at its real size: one piece of chocolate tinted as hundredths, with its nine cuts drawn */
    const cutTenth = (key: any, x: number, y: number, pw: number, ph: number) => (
      <g key={key}>
        {zgPiece("p", x, y, pw, ph, ZG_PLACES[1], C)}
        {Array.from({ length: ZG_CUT - 1 }, (_, j) => <line key={j} x1={x} y1={y + (j + 1) * ph / ZG_CUT} x2={x + pw} y2={y + (j + 1) * ph / ZG_CUT} stroke={shade(CONTENT.bead, 0.45)} strokeWidth={1.5} />)}
      </g>
    );
    const tenth = (i: number) => {
      const x = s.x + i * s.pw;
      const sliced = (i === ZG_TENTH && home) || i < splitAll;
      if (i === ZG_TENTH && (lift || an.rise) && !home)
        return <rect key={i} x={x + 2} y={s.y} width={s.pw - 4} height={s.h} rx={6} fill="#FFFFFF" stroke={zgInk(CONTENT.ten)} strokeWidth={2.5} strokeDasharray="8 6" />;
      if (sliced) return cutTenth(i, x + 1, s.y, s.pw - 2, s.h);
      return zgPiece(i, x + 1, s.y, s.pw - 2, s.h, null, C);
    };
    /* what the glass holds: the lifted tenth (amber, the tenth being talked about), cut into hundredths (rose) */
    const inGlass = () => {
      if (!lift) return null;
      if (!cut && !an.apart) return (
        <g>
          {zgPiece("m", magR.x, magR.y, magR.w, magR.h, ZG_PLACES[0], C)}
          {Array.from({ length: an.cuts || 0 }, (_, j) => <line key={j} x1={magR.x - 6} y1={magR.y + (j + 1) * magR.h / ZG_CUT} x2={magR.x + magR.w + 6} y2={magR.y + (j + 1) * magR.h / ZG_CUT} stroke={C.ink} strokeWidth={2.5} />)}
        </g>
      );
      return <g>{zgSlices(magR.x, magR.y - 9, magR.w, magR.h + 18, ZG_CUT, ZG_PLACES[1], 2, hl, C)}</g>;
    };
    /* the place of what the glass holds, written: the name of the new pieces only once it has been found */
    const named = index > 0 || won || (kind === "piece" && fk >= 21);
    const chip = !lift || an.rise ? "" : !cut && !an.apart ? tx("one tenth") : named ? tx("hundredths") : tx("from one tenth");
    if (gridView) {
      const R = zgRows(it.shaded);
      return (
        <g>
          {zgGridPic(L.grid, C, it.shaded, { lit: fix ? Math.min(R, fk) : 0, right: fix ? Math.max(0, Math.min(ZG_CUT, fk - R)) : 0 })}
          {zgLadder(L.ladX, C, tx, { rungs: 2, blank: false, ties: 1, lit: -1 })}
          {asked(L.card.x, L.card.y)}
        </g>
      );
    }
    const fly = an.rise ? zgLerp(gapR, magR, an.rise) : an.home ? zgLerp(magR, gapR, an.home) : null;
    return (
      <g>
        {Array.from({ length: ZG_CUT }, (_, i) => tenth(i))}
        {Array.from({ length: tens }, (_, i) => (
          <text key={"t" + i} x={s.x + (i + 0.5) * s.pw} y={s.y - 12} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{(i + 1) * ZG_CUT}</text>
        ))}
        {lift && !an.rise && (
          <g pointerEvents="none">
            <line x1={gapR.x} y1={s.y + s.h} x2={g.cx - g.r * 0.62} y2={g.cy - g.r * 0.79} stroke={shade(C.dim, 0.2)} strokeWidth={2} strokeDasharray="6 6" />
            <line x1={gapR.x + gapR.w} y1={s.y + s.h} x2={g.cx + g.r * 0.62} y2={g.cy - g.r * 0.79} stroke={shade(C.dim, 0.2)} strokeWidth={2} strokeDasharray="6 6" />
          </g>
        )}
        {zgGlass(g, C, <g pointerEvents="none">{inGlass()}</g>)}
        {chip && zgChip(g.cx, g.cy + g.r + 14, chip, C)}
        {fly && (
          <g pointerEvents="none">
            {an.home ? cutTenth("f", fly.x, fly.y, fly.w, fly.h) : zgPiece("f", fly.x, fly.y, fly.w, fly.h, ZG_PLACES[0], C)}
          </g>
        )}
        {demo && d === 0 && !an.rise && (
          <g>
            <Hit id="lift" x={gapR.x} y={s.y} w={gapR.w} h={s.h} label={tx("Lift this tenth")} onPress={() => press("lift")} />
            {stepOn === "lift" && <Invite x={gapR.x + gapR.w / 2} y={s.y + s.h / 2} r={56} C={C} />}
          </g>
        )}
        {demo && zgKey("split", L.split, tx("Split"), stepOn === "split", () => press("split"), C)}
        {demo && zgKey("back", L.back, tx("Put back"), stepOn === "back", () => press("back"), C)}
        {demo && stepOn === "split" && zgInviteBox(L.split.x, L.split.y, L.split.w, L.split.h, C)}
        {demo && stepOn === "back" && zgInviteBox(L.back.x, L.back.y, L.back.w, L.back.h, C)}
        {cnt > 0 && (
          <g pointerEvents="none">
            <text x={L.noteX} y={300} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={zgInk(CONTENT.bead)}>{cnt}</text>
            {note && <text x={L.noteX} y={352} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("hundredths")}</text>}
            {note && <text x={L.noteX} y={394} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{"= 1 " + tx("tenth")}</text>}
          </g>
        )}
        {zgLadder(L.ladX, C, tx, { rungs, blank: rungs < 2, ties, lit: -1 })}
        {kind === "piece" && !demo ? asked(L.card.x, L.card.y)
          : !demo && zgFracCard(L.card.x, L.card.y, "", "", C, tx, -1, true)}
      </g>
    );
  };

  /* ── phase 2: a grid of hundredths, one lifted into the glass and cut again ── */
  const p2 = () => {
    const L = zgP2(w), gr = L.grid, g = L.glass;
    const cellR = { x: gr.x + (ZG_CELL % ZG_CUT) * gr.cell, y: gr.y + Math.floor(ZG_CELL / ZG_CUT) * gr.cell, w: gr.cell, h: gr.cell };
    const magR = { x: g.cx - 85, y: g.cy - 85, w: 170, h: 170 };
    const lift = demo ? d >= 1 : true, cut = demo ? d >= 2 : true;
    const counted = kind === "count" || kind === "smaller";
    const cnt = counted ? (won ? ZG_CUT : fix ? Math.min(ZG_CUT, fk) : 0) : 0;
    const note = counted && (won || fk > ZG_CUT);
    const notes = kind === "name" && fix ? Math.min(3, fk) : 0;
    /* the third name is written once it is found (Q1's win), but practice 4 asks for that very rung: it is blank again
       there until its win or the end of its correction */
    const named = kind === "smaller" ? won || fk > ZG_CUT : index > 0 || won || notes >= 3;
    const rungs = demo ? 2 : named ? 3 : 2;
    const ties = 1 + (!demo && (index > 1 || (index === 1 && (won || fk > ZG_CUT))) ? 1 : 0);
    const hl = (j: number) => (cnt > 0 ? j < cnt : !demo && kind === "name" && j === 0);
    /* the lifted hundredth (rose), cut into thousandths (blue): the same chocolate, a place tint each */
    const inGlass = () => {
      if (!lift) return null;
      if (!cut && !an.apart) return (
        <g>
          {zgPiece("m", magR.x, magR.y, magR.w, magR.h, ZG_PLACES[1], C)}
          {Array.from({ length: an.cuts || 0 }, (_, j) => <line key={j} x1={magR.x - 6} y1={magR.y + (j + 1) * magR.h / ZG_CUT} x2={magR.x + magR.w + 6} y2={magR.y + (j + 1) * magR.h / ZG_CUT} stroke={C.ink} strokeWidth={2.5} />)}
        </g>
      );
      return <g>{zgSlices(magR.x, magR.y - 9, magR.w, magR.h + 18, ZG_CUT, ZG_PLACES[2], 2, hl, C)}</g>;
    };
    /* the new pieces' name is written only where no question asks for it: practice 4 answers with that very word, so
       its chip and card stay unnamed until the win (the ladder keeps its rungs: one rung down is the relation it tests) */
    const chipNamed = kind === "smaller" ? won : named;
    const chip = !lift || an.rise ? "" : !cut && !an.apart ? tx("one hundredth") : chipNamed ? tx("thousandths") : tx("from one hundredth");
    /* the Fraction card is never asked in this phase: covered, filling with one thousandth only when the piece has been
       named (the name's win, or its correction); the count question opens it covered again */
    const cardOn = (kind === "name" || kind === "smaller") && won || (kind === "name" && fk >= 4);
    const fly = an.rise ? zgLerp(cellR, magR, an.rise) : null;
    const counts = [[ZG_CUT, "tenths"], [ZG_CUT * ZG_CUT, "hundredths"], [ZG_CUT * ZG_CUT * ZG_CUT, "thousandths"]];
    return (
      <g>
        {zgGridPic(gr, C, 0, { tintAll: true, gap: lift || an.rise ? ZG_CELL : undefined })}
        {lift && !an.rise && (
          <g pointerEvents="none">
            <line x1={cellR.x + cellR.w} y1={cellR.y} x2={g.cx - g.r * 0.79} y2={g.cy - g.r * 0.62} stroke={shade(C.dim, 0.2)} strokeWidth={2} strokeDasharray="6 6" />
            <line x1={cellR.x + cellR.w} y1={cellR.y + cellR.h} x2={g.cx - g.r * 0.79} y2={g.cy + g.r * 0.62} stroke={shade(C.dim, 0.2)} strokeWidth={2} strokeDasharray="6 6" />
          </g>
        )}
        {zgGlass(g, C, <g pointerEvents="none">{inGlass()}</g>)}
        {chip && zgChip(g.cx, 14, chip, C)}
        {fly && <g pointerEvents="none">{zgPiece("f", fly.x, fly.y, fly.w, fly.h, ZG_PLACES[1], C)}</g>}
        {demo && d === 0 && !an.rise && (
          <g>
            <Hit id="lift" x={cellR.x + cellR.w / 2 - 36} y={cellR.y + cellR.h / 2 - 36} w={72} h={72} label={tx("Lift this square")} onPress={() => press("lift")} />
            {stepOn === "lift" && <Invite x={cellR.x + cellR.w / 2} y={cellR.y + cellR.h / 2} r={40} C={C} />}
          </g>
        )}
        {demo && zgKey("split", L.split, tx("Split"), stepOn === "split", () => press("split"), C)}
        {demo && stepOn === "split" && zgInviteBox(L.split.x, L.split.y, L.split.w, L.split.h, C)}
        {notes > 0 && (
          <g pointerEvents="none">
            {counts.slice(0, notes).map(([num, nm]: any, k: number) => (
              <text key={k} x={g.cx} y={396 + k * 44} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={zgInk(ZG_PLACES[k].color)}>{indian(num) + " " + tx(nm)}</text>
            ))}
          </g>
        )}
        {cnt > 0 && (
          <g pointerEvents="none">
            <text x={g.cx} y={414} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={zgInk(CONTENT.hundred)}>{cnt}</text>
            {note && kind === "count" && <text x={g.cx} y={458} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("thousandths")}</text>}
            {note && kind === "count" && <text x={g.cx} y={498} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{"= 1 " + tx("hundredth")}</text>}
            {note && kind === "smaller" && <text x={g.cx} y={458} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("times smaller")}</text>}
            {note && kind === "smaller" && <text x={g.cx} y={498} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={zgInk(CONTENT.hundred)}>{tx("one thousandth")}</text>}
          </g>
        )}
        {zgLadder(L.ladX, C, tx, { rungs, blank: rungs < 3, ties, lit: notes > 0 ? notes - 1 : kind === "smaller" && note ? 2 : -1 })}
        {!demo && zgFracCard(L.card.x, L.card.y, cardOn ? "1" : "", cardOn ? "1000" : "", C, tx, -1, !cardOn)}
      </g>
    );
  };

  /* ── phase 3 and free play: a shaded hundred grid read as a fraction and a decimal ── */
  const p3 = () => {
    const L = zgP3(w), gr = L.grid;
    const sh = free ? freeN : demo ? ZG_WARM : it.shaded;
    const R = zgRows(sh);
    let lit = 0, right = 0, frac: any = ["", ""], dec: any = ["", ""];
    if (demo) {
      lit = an.rows !== undefined ? an.rows : d >= 1 ? R : 0;
      right = an.right !== undefined ? an.right : d >= 2 ? ZG_CUT : 0;
      if (d >= 3 || an.frac) frac = [String(ZG_WARM), "100"];
      if (d >= 4 || an.dec) dec = zgDecOf(ZG_WARM);
    } else if (free) {
      frac = [String(freeN), "100"]; dec = zgDecOf(freeN);
    } else {
      if (fix) { lit = Math.min(R, fk); right = Math.max(0, Math.min(ZG_CUT, fk - R)); }
      /* the card that is not asked fills at the win (the next question asks about a new grid, so nothing is given away),
         and in a decimal question's correction the fraction it is read from comes first */
      if (kind === "decimal" && (won || (fix && fk >= R + 11))) frac = [String(sh), "100"];
      if (kind === "read" && won) dec = zgDecOf(sh);
    }
    const qOpen = !demo && !free;
    const blank = (v: any) => v[0] === "" && v[1] === "";
    const fixKeys = { x: gr.x, y: 432 };
    const fk3 = { x: (L.lo + L.hi) / 2 - 301, y: 432, w: 190, h: 72 };
    return (
      <g>
        {zgGridPic(gr, C, sh, { lit, right, byCol: demo })}
        {qOpen && kind === "read" ? asked(L.fc.x, L.fc.y) : zgFracCard(L.fc.x, L.fc.y, frac[0], frac[1], C, tx, -1, qOpen && blank(frac))}
        {qOpen && kind === "decimal" ? asked(L.dc.x, L.dc.y) : zgDecCard(L.dc.x, L.dc.y, dec[0], dec[1], C, tx, -1, qOpen && blank(dec))}
        {demo && zgKey("count", { x: fixKeys.x, y: fixKeys.y, w: 190, h: 72 }, tx("Count"), stepOn === "count", () => press("count"), C)}
        {demo && zgKey("whole", { x: fixKeys.x + 210, y: fixKeys.y, w: 190, h: 72 }, tx("Whole"), stepOn === "whole", () => press("whole"), C)}
        {demo && stepOn === "count" && zgInviteBox(fixKeys.x, fixKeys.y, 190, 72, C)}
        {demo && stepOn === "whole" && zgInviteBox(fixKeys.x + 210, fixKeys.y, 190, 72, C)}
        {demo && stepOn === "fraction" && (
          <g>
            <Hit id="fraction" x={L.fc.x} y={L.fc.y} w={ZG_FC.w} h={ZG_FC.h} label={tx("Fraction")} onPress={() => press("fraction")} />
            {zgInviteBox(L.fc.x, L.fc.y, ZG_FC.w, ZG_FC.h, C)}
          </g>
        )}
        {demo && stepOn === "decimal" && (
          <g>
            <Hit id="decimal" x={L.dc.x} y={L.dc.y} w={ZG_DC.w} h={ZG_DC.h} label={tx("Decimal")} onPress={() => press("decimal")} />
            {zgInviteBox(L.dc.x, L.dc.y, ZG_DC.w, ZG_DC.h, C)}
          </g>
        )}
        {free && zgKey("add-ten", fk3, tx("Add ten"), freeN <= 90, () => setFreeN((v: number) => Math.min(100, v + ZG_CUT)), C)}
        {free && zgKey("add-one", { ...fk3, x: fk3.x + 206 }, tx("Add one"), freeN < 100, () => setFreeN((v: number) => Math.min(100, v + 1)), C)}
        {free && zgKey("clear", { ...fk3, x: fk3.x + 412 }, tx("Clear"), freeN > 0, () => setFreeN(0), C)}
      </g>
    );
  };

  /* ── phase 4: an amount in words; its last word names the bottom number ── */
  const p4 = () => {
    const L = zgP4(w);
    const amount = demo ? ZG_WARM_WORDS : it.amount || "";
    /* one tile a word: in Hindi and Gujarati the amount's TR entry gives its own tiles, split on "|" (the place name,
       the last tile, may be two words there); the place itself is read from the English */
    const enWs = amount.split(" ");
    const loc = tx(amount);
    const ws = loc !== amount && loc.indexOf("|") >= 0 ? loc.split("|") : enWs;
    const tiles = zgBayLayout(L.bay, ws);
    const last = ws.length - 1;
    const place = ZG_PLACES.findIndex((p) => p.name === enWs[enWs.length - 1]);
    const P = ZG_PLACES[Math.max(0, place)];
    const litLast = demo ? !!an.lit || d >= 1 : won || fk >= 1;
    const group = !demo && fk >= 2;
    const top = demo ? zgReadAmount(ZG_WARM_WORDS).top : it.parts ? it.answer[0] : 0;
    const g0 = tiles[0], gl = tiles[last - 1] || tiles[0];
    const by = L.bay.y + L.bay.h;
    return (
      <g>
        {ws.map((wd: string, k: number) => {
          const t = tiles[k], isLast = k === last;
          const on = isLast ? litLast : group;
          return (
            <g key={k}>
              <rect x={t.x} y={L.bay.y} width={t.w} height={L.bay.h} rx={14} fill={on ? (isLast ? tint(P.color, 0.78) : tint(C.panel, 0.2)) : "#FFFFFF"}
                stroke={on ? (isLast ? zgInk(P.color) : shade(C.rule, 0.3)) : C.rule} strokeWidth={on ? 4 : 2} filter="url(#fShadowSoft)" />
              <text x={t.x + t.w / 2} y={L.bay.y + L.bay.h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={isLast ? 700 : 600} fill={C.ink}>{wd}</text>
            </g>
          );
        })}
        {demo && d === 0 && !an.lit && (
          <g>
            <Hit id="last" x={tiles[last].x} y={L.bay.y} w={tiles[last].w} h={L.bay.h} label={tx("The last word")} onPress={() => press("last")} />
            {stepOn === "last" && zgInviteBox(tiles[last].x, L.bay.y, tiles[last].w, L.bay.h, C)}
          </g>
        )}
        {group && last > 0 && (
          <g pointerEvents="none">
            <path d={`M ${g0.x + 6} ${by + 10} V ${by + 22} H ${gl.x + gl.w - 6} V ${by + 10}`} fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
            <text x={(g0.x + gl.x + gl.w) / 2} y={by + 80} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{top}</text>
          </g>
        )}
        {zgLadder(L.ladX, C, tx, { rungs: 3, blank: false, ties: 2, lit: litLast ? place : -1 })}
        {demo ? zgFracCard(L.card.x, L.card.y, d >= 1 ? String(top) : "", d >= 1 || an.bot ? String(P.den) : "", C, tx)
          : asked(L.card.x, L.card.y)}
      </g>
    );
  };

  return (
    <g>
      {free || n === 3 ? p3() : n === 1 ? p1() : n === 2 ? p2() : p4()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
/* the item is read from PHASES by the phase (n) and its index (last.item); last.value is the child's own answer: two boxes
   (a fraction, a decimal) through slotPartsOf, a choice's id, or a count */
function Thumb({ n, result, C, w, h, tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L) return null;
  const ph: any = PHASES[(n || 1) - 1] || { items: [] };
  const it: any = ph.items[L.item] || {};
  const two = it.parts ? slotPartsOf(L.value, 2) : null;
  const A: any = two && zgIsDec(it) ? two.join(".") : two ? two : L.value;
  const shaded = it.kind === "read" || it.kind === "decimal" ? Number(it.shaded) || 0 : -1;
  const gs = h - 16, c = gs / ZG_CUT;
  const tx0 = shaded >= 0 ? 8 + gs + (w - 8 - gs) / 2 : w / 2;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {shaded >= 0 && (
        <g>
          <rect x={8} y={8} width={gs} height={gs} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
          {Array.from({ length: shaded }, (_, k) => <rect key={k} x={8 + (k % ZG_CUT) * c} y={8 + Math.floor(k / ZG_CUT) * c} width={c} height={c} fill="url(#gBead)" />)}
        </g>
      )}
      {Array.isArray(A) ? (
        <g>
          <text x={tx0} y={h / 2 - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{A[0]}</text>
          <line x1={tx0 - 34} y1={h / 2} x2={tx0 + 34} y2={h / 2} stroke={C.ink} strokeWidth={3} />
          <text x={tx0} y={h / 2 + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{A[1]}</text>
        </g>
      ) : (
        <text x={tx0} y={h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{it.choices ? tx(String(A)) : String(A ?? "")}</text>
      )}
    </g>
  );
}

function ZoomGrid(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the question on a bar across the top, the working area the whole card until the
         keypad panel slides in from the right */
      board: true,
      /* a fraction is answered on the Fraction card of the picture (PATTERNS §9e) */
      cardAnswer: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      }} />
  );
}

export default ZoomGrid;
