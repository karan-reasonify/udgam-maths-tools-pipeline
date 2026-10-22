/* ═══ M2.S3.T5.C20.2D1 · weighing_bench · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "weighing_bench";
const MEDIA_ID = "M2.S3.T5.C20.2D1";
const TOOL_NAME = "Weighing Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A balance and a shelf of things. Is each one heavy or light?"];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Every thing weighed in a unit that suits it, and every weight changed by a thousand, the remainder kept as grams.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play: weigh things on the balance with up to 30 weights of 1 kg and 100 g.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "Is each one heavy or light?";
function StartArt({ box, C, lang = "en", tx = (v: any) => v }: any) {
  /* the bench: a sack of onions against the kilogram weight (the beam down on the onions' side), and the converter */
  const s = Math.min(box.h / 500, 0.68);
  WB_SK.n = 40;
  WB_TXT.thin = lang === "gu";
  return (
    <g>
      <g transform={`translate(${Math.round(box.w / 2 - 60 - 500 * s)},${Math.round((box.h - 490 * s) / 2)}) scale(${s})`}>
        {wbBalance(C, 12, null, wbKgW(WB_B.bx + WB_B.L, WB_RIM - 2, "1 " + tx("kg"), lang !== "en" ? 170 : 140, Math.ceil(30 / s)), null, null, false, undefined)}
        <g transform={`translate(${WB_B.bx - WB_B.L},${WB_RIM - 2 + wbDy(12)}) scale(0.9)`}>{wbThing("onions")}</g>
      </g>
      <g transform={`translate(${Math.round(box.w / 2 + 80)},${Math.round((box.h - 170) / 2)})`}>{wbConv({ x: 0, y: 0, w: 300, h: 170 }, false, C)}</g>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each printed or drawn line
   up in it (Work draws its own words through tx("...")). Fill it AFTER the English is final and reviewed:
   `check` (tr-coverage) lists every printed line still missing. Nothing is baked: the lesson is silent.
   Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Weighing Bench": "तौलने की मेज़",
    "A balance and a shelf of things. Is each one heavy or light?": "एक तराजू और ताक पर कुछ चीज़ें। हर चीज़ भारी है या हल्की?",
    "Every thing weighed in a unit that suits it, and every weight changed by a thousand, the remainder kept as grams.": "हर चीज़ सही इकाई में तौली गई, हर वज़न एक हज़ार से बदला गया, और शेष ग्राम में रहा।",
    "Free play: weigh things on the balance with up to 30 weights of 1 kg and 100 g.": "मुक्त खेल: 1 किग्रा और 100 ग्रा के 30 तक बाटों से तराजू पर चीज़ें तौलो।",
    "Is each one heavy or light?": "हर चीज़ भारी है या हल्की?",
    "The pan is full, so tap it to take a weight off.": "पलड़ा भर गया है, एक बाट उतारने के लिए उसे छुओ।",
    "Send each thing to a tray first, then press Enter.": "पहले हर चीज़ को ट्रे में भेजो, फिर दर्ज करें दबाओ।",
    "Lift a thing onto the pan first, then tap a tray.": "पहले कोई चीज़ पलड़े पर रखो, फिर ट्रे छुओ।",
    "TL": "द.ला.", "L": "ला.",
    /* phase 1 */
    "Grams or kilograms": "ग्राम या किलोग्राम",
    "Is it heavy or light? Grams or kilograms?": "यह भारी है या हल्का? ग्राम या किलोग्राम?",
    "Tap the bunch of keys to lift it onto the empty pan.": "चाबियों के गुच्छे को छूकर खाली पलड़े पर रखो।",
    "Tap the keys on the shelf.": "ताक पर रखी चाबियाँ छुओ।",
    "The keys' pan went up, so they are light: tap the grams tray.": "चाबियों का पलड़ा ऊपर गया, यानी वे हल्की हैं: ग्राम वाली ट्रे छुओ।",
    "Tap the tray marked grams.": "जिस ट्रे पर ग्राम लिखा है, उसे छुओ।",
    "Which pan went down?": "कौन-सा पलड़ा नीचे गया?",
    "Lift each thing in turn: if its pan goes down, it needs kilograms.": "हर चीज़ बारी-बारी से रखो: उसका पलड़ा नीचे जाए, तो किलोग्राम चाहिए।",
    "Heavy things are usually weighed in kilograms and light things in grams.": "भारी चीज़ें आमतौर पर किलोग्राम में और हल्की चीज़ें ग्राम में तौली जाती हैं।",
    "You learned: heavy things in kilograms, light things in grams.": "तुमने सीखा: भारी चीज़ें किलोग्राम में, हल्की चीज़ें ग्राम में।",
    "Send the bag of cement and the steel spoon each to its tray.": "सीमेंट की बोरी और स्टील का चम्मच, दोनों को उनकी ट्रे में भेजो।",
    "Cement, spoon: which tray?": "सीमेंट, चम्मच: कौन-सी ट्रे?",
    "Is each thing heavy or light in the hand?": "हाथ में हर चीज़ भारी लगती है या हल्की?",
    "Yes, cement is weighed in kilograms and a spoon in grams.": "हाँ, सीमेंट किलोग्राम में और चम्मच ग्राम में तौला जाता है।",
    "Now a letter in an envelope and a sack of onions: grams or kilograms for each?": "अब लिफ़ाफ़े में चिट्ठी और प्याज़ की बोरी: हर एक के लिए ग्राम या किलोग्राम?",
    "Letter, onions: which tray?": "चिट्ठी, प्याज़: कौन-सी ट्रे?",
    "Which of the two could you lift with one finger?": "इन दोनों में से किसे तुम एक उँगली से उठा सकते हो?",
    "Right, the letter goes in grams and the onions in kilograms.": "सही, चिट्ठी ग्राम में और प्याज़ किलोग्राम में।",
    "A child wrote 20 kg for an eraser: which tray is right for it?": "एक बच्चे ने रबड़ के लिए 20 किग्रा लिखा: इसकी सही ट्रे कौन-सी है?",
    "Eraser: 20 kg? Which unit?": "रबड़: 20 किग्रा? कौन-सी इकाई?",
    "Could an eraser weigh as much as 20 bags of sugar?": "क्या एक रबड़ चीनी की 20 थैलियों जितना भारी हो सकता है?",
    "Yes, an eraser weighs about 20 g, not 20 kg.": "हाँ, रबड़ का वज़न लगभग 20 ग्रा है, 20 किग्रा नहीं।",
    /* phase 2 */
    "A thousand grams make a kilogram": "एक हज़ार ग्राम से एक किलोग्राम बनता है",
    "How many grams level the kilogram? Now use that number.": "कितने ग्राम किलोग्राम के बराबर होते हैं? अब वही संख्या काम में लो।",
    "Tap the 100 g pile to put one weight on the empty pan.": "100 ग्रा का ढेर छुओ, ताकि एक बाट खाली पलड़े पर आए।",
    "Tap the pile of green 100 g weights.": "100 ग्रा के हरे बाटों का ढेर छुओ।",
    "The beam is still tipped, so tap the pile again to fill the pan.": "डंडी अब भी झुकी है, पलड़ा भरने के लिए ढेर फिर से छुओ।",
    "Tap the green pile once more.": "हरा ढेर एक बार और छुओ।",
    "How many grams levelled one kilogram?": "कितने ग्राम से एक किलोग्राम बराबर हुआ?",
    "Multiply the kilograms by the one number on the converter, then add any grams.": "किलोग्राम को मशीन की एक संख्या से गुणा करो, फिर बचे ग्राम जोड़ो।",
    "1,000 g make 1 kg, so kilograms become grams by multiplying by 1,000 only.": "1,000 ग्रा से 1 किग्रा बनता है, सो ग्राम के लिए केवल 1,000 से गुणा करो।",
    "You learned: 1 kilogram is 1,000 grams, so multiply by 1,000 only.": "तुमने सीखा: 1 किलोग्राम में 1,000 ग्राम, सो केवल 1,000 से गुणा करो।",
    "How many grams are there in 9 kg?": "9 किग्रा में कितने ग्राम होते हैं?",
    "9 kg in grams?": "9 किग्रा में कितने ग्राम?",
    "What number is printed on the converter?": "मशीन पर कौन-सी संख्या छपी है?",
    "Yes, 9 kg is 9,000 g.": "हाँ, 9 किग्रा में 9,000 ग्रा होते हैं।",
    "Change 5 kg into grams the same way.": "इसी तरह 5 किग्रा को ग्राम में बदलो।",
    "5 kg is how many grams?": "5 किग्रा कितने ग्राम हैं?",
    "Each of the 5 kilogram weights is as heavy as the pile that levelled 1 kg.": "किलोग्राम का हर बाट उस ढेर जितना भारी है, जिसने 1 किग्रा बराबर किया।",
    "Right, 5 kilograms make 5,000 grams.": "सही, 5 किलोग्राम से 5,000 ग्राम बनते हैं।",
    "A bag holds 13 kg 640 g, so change it all into grams.": "एक थैले में 13 किग्रा 640 ग्रा है, पूरा वज़न ग्राम में बदलो।",
    "13 kg 640 g in grams?": "13 किग्रा 640 ग्रा कितने ग्राम?",
    "Change the 13 kg first, and the 640 g are grams already.": "पहले 13 किग्रा बदलो, 640 ग्रा तो पहले से ग्राम में हैं।",
    "Yes, 13,000 g and 640 g more make 13,640 g.": "हाँ, 13,000 ग्रा और 640 ग्रा मिलकर 13,640 ग्रा बनते हैं।",
    /* phase 3 */
    "Grams into kilograms and grams": "ग्राम से किलोग्राम और ग्राम",
    "How many whole kilograms are in it? What is left stays in grams.": "इसमें कितने पूरे किलोग्राम हैं? जो बचता है, वह ग्राम में रहता है।",
    "Tap the card to pass 3,250 g up through the converter.": "कार्ड छुओ, ताकि 3,250 ग्रा मशीन से ऊपर जाए।",
    "Tap the card below the converter.": "मशीन के नीचे वाला कार्ड छुओ।",
    "How many whole kilograms fit, and what is left?": "कितने पूरे किलोग्राम आते हैं, और क्या बचता है?",
    "Each 1,000 g makes a kilogram; the grams that cannot make one more stay grams.": "हर 1,000 ग्रा से 1 किग्रा बनता है; जो ग्राम कम पड़ें, वे ग्राम ही रहते हैं।",
    "Divide by 1,000: the quotient is the kilograms and the remainder stays as grams.": "1,000 से भाग दो: भागफल किलोग्राम है और शेषफल ग्राम में रहता है।",
    "You learned: divide by 1,000. Whole kilograms, then grams left over.": "तुमने सीखा: 1,000 से भाग दो। पूरे किलोग्राम, फिर बचे ग्राम।",
    "Write 6,385 g in kilograms and grams.": "6,385 ग्रा को किलोग्राम और ग्राम में लिखो।",
    "6,385 g in kilograms and grams": "6,385 ग्रा को किलोग्राम और ग्राम में",
    "How many grams make one kilogram?": "कितने ग्राम से एक किलोग्राम बनता है?",
    "Yes, 6,385 g is 6 kg 385 g.": "हाँ, 6,385 ग्रा यानी 6 किग्रा 385 ग्रा।",
    "Now split 2,750 g the same way.": "अब 2,750 ग्रा को भी ऐसे ही बाँटो।",
    "2,750 g in kilograms and grams": "2,750 ग्रा को किलोग्राम और ग्राम में",
    "How many whole thousands are there in 2,750?": "2,750 में कितने पूरे हज़ार हैं?",
    "Right: 2 whole kilograms, and 750 g left over.": "सही: 2 पूरे किलोग्राम, और 750 ग्रा बचे।",
    "A sack of rice weighs 25,400 g: how many kilograms and grams is that?": "चावल की एक बोरी 25,400 ग्रा की है: यह कितने किलोग्राम और ग्राम हुआ?",
    "25,400 g in kilograms and grams": "25,400 ग्रा को किलोग्राम और ग्राम में",
    "Count every 1,000 g in 25,400 g, even if there are many.": "25,400 ग्रा में हर 1,000 ग्रा गिनो, चाहे बहुत हों।",
    "Yes: 25 whole kilograms, and 400 g stay as grams.": "हाँ: 25 पूरे किलोग्राम, और 400 ग्रा ग्राम में रहते हैं।",
    /* phase 4 */
    "A zero that holds a place in grams": "ग्राम में स्थान रखने वाला शून्य",
    "The grams leave some places empty. What goes in each one?": "ग्राम कुछ स्थान खाली छोड़ते हैं। हर खाली स्थान में क्या आता है?",
    "Tap the card to pass 2 kg 5 g down into grams.": "कार्ड छुओ, ताकि 2 किग्रा 5 ग्रा नीचे जाकर ग्राम बने।",
    "Tap the card above the converter.": "मशीन के ऊपर वाला कार्ड छुओ।",
    "The hundreds box is empty, so tap it to write a 0.": "सैकड़ा का खाना खाली है, 0 लिखने के लिए उसे छुओ।",
    "Tap the empty box under H.": "सैकड़ा वाला खाली खाना छुओ।",
    "Now tap the empty tens box to write its 0.": "अब दहाई का खाली खाना छुओ और उसमें 0 लिखो।",
    "Tap the empty box under T.": "दहाई वाला खाली खाना छुओ।",
    "Which boxes are still empty?": "कौन-से खाने अब भी खाली हैं?",
    "Each empty place between the digits needs a zero.": "अंकों के बीच हर खाली स्थान में शून्य चाहिए।",
    "Beside kilograms the grams take three places, and a zero holds each empty one.": "किलोग्राम के साथ ग्राम तीन स्थान लेते हैं, और हर खाली स्थान में शून्य आता है।",
    "You learned: a zero holds each place the grams leave empty.": "तुमने सीखा: ग्राम जो स्थान खाली छोड़ें, वहाँ शून्य आता है।",
    "Write 7 kg 9 g in grams.": "7 किग्रा 9 ग्रा को ग्राम में लिखो।",
    "7 kg 9 g in grams?": "7 किग्रा 9 ग्रा कितने ग्राम?",
    "Which boxes do the grams fill?": "ग्राम कौन-से खाने भरते हैं?",
    "Yes, 7 kg 9 g is 7,009 g.": "हाँ, 7 किग्रा 9 ग्रा यानी 7,009 ग्रा।",
    "Now 30 kg 8 g: how many grams in all?": "अब 30 किग्रा 8 ग्रा: कुल कितने ग्राम?",
    "30 kg 8 g in grams?": "30 किग्रा 8 ग्रा कितने ग्राम?",
    "Where do the 8 g go: hundreds, tens or ones?": "8 ग्रा कहाँ जाएँगे: सैकड़ा, दहाई या इकाई?",
    "Right, zeros hold the places, so it is 30,008 g.": "सही, शून्य स्थान रखते हैं, इसलिए यह 30,008 ग्रा है।",
    "Which three digits of 4,070 are the grams?": "4,070 के कौन-से तीन अंक ग्राम हैं?",
    "The 0 in the hundreds is a grams digit that holds a place.": "सैकड़े का 0 ग्राम का अंक है, जो स्थान रखता है।",
    "A child wrote 4,070 g as 4 kg 700 g: what is right?": "एक बच्चे ने 4,070 ग्रा को 4 किग्रा 700 ग्रा लिखा: सही क्या है?",
    "4,070 g in kilograms and grams": "4,070 ग्रा को किलोग्राम और ग्राम में",
    "Change your kilograms and grams back into grams: do they make 4,070 g?": "अपने किलोग्राम और ग्राम को फिर ग्राम में बदलो: क्या 4,070 ग्रा बनते हैं?",
    "Yes, 4,070 g is 4 kg 70 g, with a zero in the hundreds.": "हाँ, 4,070 ग्रा यानी 4 किग्रा 70 ग्रा, सैकड़े में शून्य के साथ।",
    /* drawn on the working area, the slot, the thumbnails and the controls' names */
    "kg": "किग्रा", "g": "ग्रा", "grams": "ग्राम", "kilograms": "किलोग्राम", "and more": "और भी",
    "TTh": "द.ह.", "Th": "ह.", "H": "सै.", "T": "द.", "O": "इ.",
    "grams tray": "ग्राम वाली ट्रे", "kilograms tray": "किलोग्राम वाली ट्रे", "hundreds box": "सैकड़ा का खाना", "tens box": "दहाई का खाना",
    "weight card": "वज़न कार्ड", "kilogram weights": "किलोग्राम के बाट", "100 gram weights": "100 ग्राम के बाट", "right pan": "दायाँ पलड़ा",
    "steel spoon": "स्टील का चम्मच", "letter": "चिट्ठी", "bunch of keys": "चाबियों का गुच्छा", "eraser": "रबड़",
    "sack of onions": "प्याज़ की बोरी", "bag of cement": "सीमेंट की बोरी",
  },
  gu: {
    "Weighing Bench": "તોલવાનું ટેબલ",
    "A balance and a shelf of things. Is each one heavy or light?": "એક ત્રાજવું અને છાજલી પર થોડી વસ્તુઓ. દરેક વસ્તુ ભારે છે કે હલકી?",
    "Every thing weighed in a unit that suits it, and every weight changed by a thousand, the remainder kept as grams.": "દરેક વસ્તુ યોગ્ય એકમમાં તોલાઈ, દરેક વજન એક હજારથી બદલાયું, અને શેષ ગ્રામમાં રહી.",
    "Free play: weigh things on the balance with up to 30 weights of 1 kg and 100 g.": "મુક્ત રમત: 1 કિગ્રા અને 100 ગ્રાનાં 30 સુધી વજનિયાંથી ત્રાજવા પર વસ્તુઓ તોલો.",
    "Is each one heavy or light?": "દરેક વસ્તુ ભારે છે કે હલકી?",
    "The pan is full, so tap it to take a weight off.": "પલ્લું ભરાઈ ગયું છે, એક વજનિયું ઉતારવા તેને દબાવો.",
    "Send each thing to a tray first, then press Enter.": "પહેલાં દરેક વસ્તુ ટ્રેમાં મોકલો, પછી દાખલ કરો દબાવો.",
    "Lift a thing onto the pan first, then tap a tray.": "પહેલાં કોઈ વસ્તુ પલ્લામાં મૂકો, પછી ટ્રે દબાવો.",
    "TL": "દ.લા.", "L": "લા.",
    /* phase 1 */
    "Grams or kilograms": "ગ્રામ કે કિલોગ્રામ",
    "Is it heavy or light? Grams or kilograms?": "તે ભારે છે કે હલકું? ગ્રામ કે કિલોગ્રામ?",
    "Tap the bunch of keys to lift it onto the empty pan.": "ચાવીઓના ઝૂમખાને દબાવી ખાલી પલ્લામાં મૂકો.",
    "Tap the keys on the shelf.": "છાજલી પરની ચાવીઓ દબાવો.",
    "The keys' pan went up, so they are light: tap the grams tray.": "ચાવીઓનું પલ્લું ઉપર ગયું, એટલે તે હલકી છે: ગ્રામની ટ્રે દબાવો.",
    "Tap the tray marked grams.": "જે ટ્રે પર ગ્રામ લખ્યું છે તે દબાવો.",
    "Which pan went down?": "કયું પલ્લું નીચે ગયું?",
    "Lift each thing in turn: if its pan goes down, it needs kilograms.": "દરેક વસ્તુ વારાફરતી મૂકો: તેનું પલ્લું નીચે જાય, તો કિલોગ્રામ જોઈએ.",
    "Heavy things are usually weighed in kilograms and light things in grams.": "ભારે વસ્તુઓ સામાન્ય રીતે કિલોગ્રામમાં અને હલકી વસ્તુઓ ગ્રામમાં તોલાય છે.",
    "You learned: heavy things in kilograms, light things in grams.": "તમે શીખ્યા: ભારે વસ્તુ કિલોગ્રામમાં, હલકી વસ્તુ ગ્રામમાં.",
    "Send the bag of cement and the steel spoon each to its tray.": "સિમેન્ટની થેલી અને સ્ટીલની ચમચી, બંનેને તેમની ટ્રેમાં મોકલો.",
    "Cement, spoon: which tray?": "સિમેન્ટ, ચમચી: કઈ ટ્રે?",
    "Is each thing heavy or light in the hand?": "હાથમાં દરેક વસ્તુ ભારે લાગે કે હલકી?",
    "Yes, cement is weighed in kilograms and a spoon in grams.": "હા, સિમેન્ટ કિલોગ્રામમાં અને ચમચી ગ્રામમાં તોલાય છે.",
    "Now a letter in an envelope and a sack of onions: grams or kilograms for each?": "હવે પરબીડિયામાં પત્ર અને ડુંગળીની ગૂણ: દરેક માટે ગ્રામ કે કિલોગ્રામ?",
    "Letter, onions: which tray?": "પત્ર, ડુંગળી: કઈ ટ્રે?",
    "Which of the two could you lift with one finger?": "આ બેમાંથી કઈ વસ્તુ તમે એક આંગળીથી ઉપાડી શકો?",
    "Right, the letter goes in grams and the onions in kilograms.": "સાચું, પત્ર ગ્રામમાં અને ડુંગળી કિલોગ્રામમાં.",
    "A child wrote 20 kg for an eraser: which tray is right for it?": "એક બાળકે રબર માટે 20 કિગ્રા લખ્યું: તેની સાચી ટ્રે કઈ?",
    "Eraser: 20 kg? Which unit?": "રબર: 20 કિગ્રા? કયો એકમ?",
    "Could an eraser weigh as much as 20 bags of sugar?": "શું એક રબર ખાંડની 20 થેલી જેટલું ભારે હોઈ શકે?",
    "Yes, an eraser weighs about 20 g, not 20 kg.": "હા, રબરનું વજન આશરે 20 ગ્રા છે, 20 કિગ્રા નહીં.",
    /* phase 2 */
    "A thousand grams make a kilogram": "એક હજાર ગ્રામથી એક કિલોગ્રામ બને",
    "How many grams level the kilogram? Now use that number.": "કેટલા ગ્રામ કિલોગ્રામની બરાબર થાય? હવે એ જ સંખ્યા વાપરો.",
    "Tap the 100 g pile to put one weight on the empty pan.": "100 ગ્રાનો ઢગલો દબાવો, જેથી એક વજનિયું ખાલી પલ્લામાં આવે.",
    "Tap the pile of green 100 g weights.": "100 ગ્રાનાં લીલાં વજનિયાંનો ઢગલો દબાવો.",
    "The beam is still tipped, so tap the pile again to fill the pan.": "દાંડી હજી નમેલી છે, પલ્લું ભરવા ઢગલો ફરી દબાવો.",
    "Tap the green pile once more.": "લીલો ઢગલો ફરી એક વાર દબાવો.",
    "How many grams levelled one kilogram?": "કેટલા ગ્રામથી એક કિલોગ્રામ બરાબર થયું?",
    "Multiply the kilograms by the one number on the converter, then add any grams.": "કિલોગ્રામને મશીન પરની એક સંખ્યાથી ગુણો, પછી બાકીના ગ્રામ ઉમેરો.",
    "1,000 g make 1 kg, so kilograms become grams by multiplying by 1,000 only.": "1,000 ગ્રાથી 1 કિગ્રા બને, તેથી ગ્રામ માટે ફક્ત 1,000થી ગુણો.",
    "You learned: 1 kilogram is 1,000 grams, so multiply by 1,000 only.": "તમે શીખ્યા: 1 કિલોગ્રામમાં 1,000 ગ્રામ, તેથી ફક્ત 1,000થી ગુણો.",
    "How many grams are there in 9 kg?": "9 કિગ્રામાં કેટલા ગ્રામ હોય?",
    "9 kg in grams?": "9 કિગ્રા એટલે કેટલા ગ્રામ?",
    "What number is printed on the converter?": "મશીન પર કઈ સંખ્યા છાપેલી છે?",
    "Yes, 9 kg is 9,000 g.": "હા, 9 કિગ્રામાં 9,000 ગ્રા હોય.",
    "Change 5 kg into grams the same way.": "એ જ રીતે 5 કિગ્રાને ગ્રામમાં બદલો.",
    "5 kg is how many grams?": "5 કિગ્રા કેટલા ગ્રામ?",
    "Each of the 5 kilogram weights is as heavy as the pile that levelled 1 kg.": "કિલોગ્રામનું દરેક વજનિયું, 1 કિગ્રા બરાબર કરનાર ઢગલા જેટલું ભારે છે.",
    "Right, 5 kilograms make 5,000 grams.": "સાચું, 5 કિલોગ્રામથી 5,000 ગ્રામ બને.",
    "A bag holds 13 kg 640 g, so change it all into grams.": "એક થેલીમાં 13 કિગ્રા 640 ગ્રા છે, આખું વજન ગ્રામમાં બદલો.",
    "13 kg 640 g in grams?": "13 કિગ્રા 640 ગ્રા કેટલા ગ્રામ?",
    "Change the 13 kg first, and the 640 g are grams already.": "પહેલાં 13 કિગ્રા બદલો, 640 ગ્રા તો પહેલેથી ગ્રામમાં છે.",
    "Yes, 13,000 g and 640 g more make 13,640 g.": "હા, 13,000 ગ્રા અને 640 ગ્રા મળીને 13,640 ગ્રા થાય.",
    /* phase 3 */
    "Grams into kilograms and grams": "ગ્રામમાંથી કિલોગ્રામ અને ગ્રામ",
    "How many whole kilograms are in it? What is left stays in grams.": "તેમાં કેટલા આખા કિલોગ્રામ છે? જે બાકી રહે, તે ગ્રામમાં રહે છે.",
    "Tap the card to pass 3,250 g up through the converter.": "કાર્ડ દબાવો, જેથી 3,250 ગ્રા મશીનમાંથી ઉપર જાય.",
    "Tap the card below the converter.": "મશીનની નીચેનું કાર્ડ દબાવો.",
    "How many whole kilograms fit, and what is left?": "કેટલા આખા કિલોગ્રામ સમાય છે, અને શું બાકી રહે છે?",
    "Each 1,000 g makes a kilogram; the grams that cannot make one more stay grams.": "દરેક 1,000 ગ્રાથી 1 કિગ્રા બને; જે ગ્રામ ઓછા પડે, તે ગ્રામ જ રહે.",
    "Divide by 1,000: the quotient is the kilograms and the remainder stays as grams.": "1,000થી ભાગો: ભાગફળ કિલોગ્રામ છે અને શેષ ગ્રામમાં રહે છે.",
    "You learned: divide by 1,000. Whole kilograms, then grams left over.": "તમે શીખ્યા: એક હજારથી ભાગો. આખા કિલોગ્રામ, પછી બાકીના ગ્રામ.",
    "Write 6,385 g in kilograms and grams.": "6,385 ગ્રાને કિલોગ્રામ અને ગ્રામમાં લખો.",
    "6,385 g in kilograms and grams": "6,385 ગ્રા ને કિલોગ્રામ અને ગ્રામમાં",
    "How many grams make one kilogram?": "કેટલા ગ્રામથી એક કિલોગ્રામ બને?",
    "Yes, 6,385 g is 6 kg 385 g.": "હા, 6,385 ગ્રા એટલે 6 કિગ્રા 385 ગ્રા.",
    "Now split 2,750 g the same way.": "હવે 2,750 ગ્રાને પણ એ જ રીતે વહેંચો.",
    "2,750 g in kilograms and grams": "2,750 ગ્રા ને કિલોગ્રામ અને ગ્રામમાં",
    "How many whole thousands are there in 2,750?": "2,750 માં કેટલા આખા હજાર છે?",
    "Right: 2 whole kilograms, and 750 g left over.": "સાચું: 2 આખા કિલોગ્રામ, અને 750 ગ્રા બાકી.",
    "A sack of rice weighs 25,400 g: how many kilograms and grams is that?": "ચોખાની એક ગૂણ 25,400 ગ્રાની છે: તે કેટલા કિલોગ્રામ અને ગ્રામ થાય?",
    "25,400 g in kilograms and grams": "25,400 ગ્રા ને કિલોગ્રામ અને ગ્રામમાં",
    "Count every 1,000 g in 25,400 g, even if there are many.": "25,400 ગ્રામાં દરેક 1,000 ગ્રા ગણો, ભલે ઘણા હોય.",
    "Yes: 25 whole kilograms, and 400 g stay as grams.": "હા: 25 આખા કિલોગ્રામ, અને 400 ગ્રા ગ્રામમાં રહે.",
    /* phase 4 */
    "A zero that holds a place in grams": "ગ્રામમાં સ્થાન સાચવતો શૂન્ય",
    "The grams leave some places empty. What goes in each one?": "ગ્રામ કેટલાંક સ્થાન ખાલી છોડે છે. દરેક ખાલી સ્થાનમાં શું આવે?",
    "Tap the card to pass 2 kg 5 g down into grams.": "કાર્ડ દબાવો, જેથી 2 કિગ્રા 5 ગ્રા નીચે જઈ ગ્રામ બને.",
    "Tap the card above the converter.": "મશીનની ઉપરનું કાર્ડ દબાવો.",
    "The hundreds box is empty, so tap it to write a 0.": "શતકનું ખાનું ખાલી છે, તેમાં 0 લખવા તેને દબાવો.",
    "Tap the empty box under H.": "શતકવાળું ખાલી ખાનું દબાવો.",
    "Now tap the empty tens box to write its 0.": "હવે દશકનું ખાલી ખાનું દબાવી તેમાં 0 લખો.",
    "Tap the empty box under T.": "દશકવાળું ખાલી ખાનું દબાવો.",
    "Which boxes are still empty?": "કયાં ખાનાં હજી ખાલી છે?",
    "Each empty place between the digits needs a zero.": "અંકોની વચ્ચેના દરેક ખાલી સ્થાનમાં શૂન્ય જોઈએ.",
    "Beside kilograms the grams take three places, and a zero holds each empty one.": "કિલોગ્રામની સાથે ગ્રામ ત્રણ સ્થાન લે છે, અને દરેક ખાલી સ્થાનમાં શૂન્ય આવે છે.",
    "You learned: a zero holds each place the grams leave empty.": "તમે શીખ્યા: ગ્રામ જે સ્થાન ખાલી છોડે, ત્યાં શૂન્ય આવે.",
    "Write 7 kg 9 g in grams.": "7 કિગ્રા 9 ગ્રાને ગ્રામમાં લખો.",
    "7 kg 9 g in grams?": "7 કિગ્રા 9 ગ્રા કેટલા ગ્રામ?",
    "Which boxes do the grams fill?": "ગ્રામ કયાં ખાનાં ભરે છે?",
    "Yes, 7 kg 9 g is 7,009 g.": "હા, 7 કિગ્રા 9 ગ્રા એટલે 7,009 ગ્રા.",
    "Now 30 kg 8 g: how many grams in all?": "હવે 30 કિગ્રા 8 ગ્રા: કુલ કેટલા ગ્રામ?",
    "30 kg 8 g in grams?": "30 કિગ્રા 8 ગ્રા કેટલા ગ્રામ?",
    "Where do the 8 g go: hundreds, tens or ones?": "8 ગ્રા ક્યાં જશે: શતક, દશક કે એકમ?",
    "Right, zeros hold the places, so it is 30,008 g.": "સાચું, શૂન્ય સ્થાન સાચવે છે, તેથી તે 30,008 ગ્રા છે.",
    "Which three digits of 4,070 are the grams?": "4,070ના કયા ત્રણ અંક ગ્રામ છે?",
    "The 0 in the hundreds is a grams digit that holds a place.": "શતકનો 0 ગ્રામનો અંક છે, જે સ્થાન સાચવે છે.",
    "A child wrote 4,070 g as 4 kg 700 g: what is right?": "એક બાળકે 4,070 ગ્રાને 4 કિગ્રા 700 ગ્રા લખ્યું: સાચું શું છે?",
    "4,070 g in kilograms and grams": "4,070 ગ્રા ને કિલોગ્રામ અને ગ્રામમાં",
    "Change your kilograms and grams back into grams: do they make 4,070 g?": "તમારા કિલોગ્રામ અને ગ્રામને પાછા ગ્રામમાં બદલો: શું 4,070 ગ્રા થાય?",
    "Yes, 4,070 g is 4 kg 70 g, with a zero in the hundreds.": "હા, 4,070 ગ્રા એટલે 4 કિગ્રા 70 ગ્રા, શતકમાં શૂન્ય સાથે.",
    /* drawn on the working area, the slot, the thumbnails and the controls' names */
    "kg": "કિગ્રા", "g": "ગ્રા", "grams": "ગ્રામ", "kilograms": "કિલોગ્રામ", "and more": "અને વધુ",
    "TTh": "દ.હ.", "Th": "હ.", "H": "શ.", "T": "દ.", "O": "એ.",
    "grams tray": "ગ્રામની ટ્રે", "kilograms tray": "કિલોગ્રામની ટ્રે", "hundreds box": "શતકનું ખાનું", "tens box": "દશકનું ખાનું",
    "weight card": "વજન કાર્ડ", "kilogram weights": "કિલોગ્રામનાં વજનિયાં", "100 gram weights": "100 ગ્રામનાં વજનિયાં", "right pan": "જમણું પલ્લું",
    "steel spoon": "સ્ટીલની ચમચી", "letter": "પત્ર", "bunch of keys": "ચાવીઓનું ઝૂમખું", "eraser": "રબર",
    "sack of onions": "ડુંગળીની ગૂણ", "bag of cement": "સિમેન્ટની થેલી",
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
/* the two boxes of a weight in two units: labelled with the unit symbol only (BUILD_CARD §7, 2026-09-24) */
const WB_KG = [{ label: "kg" }, { label: "g" }];
const PHASES = [
  {
    n: 1,
    concept: "Grams or kilograms",
    conceptId: "M2.S3.T5.C20", objectiveIds: ["O7"],
    says: ["Is it heavy or light? Grams or kilograms?"],
    /* the warm-up (WB_WARM[1]): a bunch of keys, in no question, lifted against the kilogram and sent to grams */
    steps: [
      { say: "Tap the bunch of keys to lift it onto the empty pan.", on: "keys", hint: "Tap the keys on the shelf." },
      { say: "The keys' pan went up, so they are light: tap the grams tray.", on: "tray-g", hint: "Tap the tray marked grams." },
    ],
    /* a short hold: the keys in their tray need no long look, and the question opens before a tap waits long */
    stepHold: 800,
    /* tries, as the plan writes it: rung 1 the item's own miss (heavy or light in the hand?); rung 2 which pan went
       down; rung 3 weigh each thing in turn against the kilogram. The trays stay open behind all three rungs. */
    ladder: ["Which pan went down?", "Lift each thing in turn: if its pan goes down, it needs kilograms."],
    closing: "Heavy things are usually weighed in kilograms and light things in grams.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: heavy things in kilograms, light things in grams.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Each thing in the wrong tray goes back on the pan against the kilogram, the arrow lit on the pan that went down, then into its right tray (the eraser's 20 kg is set against it first, then 20 g, which balances).",
    items: [
      /* learn ML1: answer in the plan = The bag of cement in kilograms, and the spoon in grams.
         Made on the working area: each thing goes into a tray; the answer lists the trays in `things` order. */
      { qid: "M2.S3.T5.C20:ML1", kind: "sort", things: ["cement", "spoon"], pad: "enter", answer: "kg,g", winMs: 3900,
        say: "Send the bag of cement and the steel spoon each to its tray.", ask: "Cement, spoon: which tray?",
        miss: "Is each thing heavy or light in the hand?", win: "Yes, cement is weighed in kilograms and a spoon in grams." },
      /* practice 1: answer in the plan = The letter in grams, and the sack of onions in kilograms */
      { qid: "M2.S3.T5.C20:1", kind: "sort", things: ["letter", "onions"], pad: "enter", answer: "g,kg", winMs: 4100,
        say: "Now a letter in an envelope and a sack of onions: grams or kilograms for each?", ask: "Letter, onions: which tray?",
        miss: "Which of the two could you lift with one finger?", win: "Right, the letter goes in grams and the onions in kilograms." },
      /* practice 2: answer in the plan = 20 g. An eraser is light, so it is weighed in grams (the unit is the answer,
         given on the working area: the eraser is sent to the grams tray, as the things before it) */
      { qid: "M2.S3.T5.C20:2", kind: "unit", things: ["eraser"], pad: "enter", answer: "g", winMs: 3000,
        say: "A child wrote 20 kg for an eraser: which tray is right for it?", ask: "Eraser: 20 kg? Which unit?",
        miss: "Could an eraser weigh as much as 20 bags of sugar?", win: "Yes, an eraser weighs about 20 g, not 20 kg." },
    ],
  },
  {
    n: 2,
    concept: "A thousand grams make a kilogram",
    conceptId: "M2.S3.T5.C21", objectiveIds: ["O7"],
    says: ["How many grams level the kilogram? Now use that number."],
    /* the warm-up (the Delight): hundred gram weights go on until the beam levels the kilogram */
    steps: [
      { say: "Tap the 100 g pile to put one weight on the empty pan.", on: "pile", hint: "Tap the pile of green 100 g weights." },
      { say: "The beam is still tipped, so tap the pile again to fill the pan.", on: "pile", hint: "Tap the green pile once more." },
    ],
    stepHold: 2400,
    /* tries, as the plan writes it: rung 1 the item's own miss; rung 2 how many grams levelled one kilogram; rung 3
       multiply the kilograms by the converter's one number, then add the grams. The number pad stays open. */
    ladder: ["How many grams levelled one kilogram?", "Multiply the kilograms by the one number on the converter, then add any grams."],
    closing: "1,000 g make 1 kg, so kilograms become grams by multiplying by 1,000 only.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: 1 kilogram is 1,000 grams, so multiply by 1,000 only.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The converter's 1,000 lights; the card's kilograms go on one pan and the child's grams on the other, and the beam tips; the card passes down and comes out in grams, and the grams pan levels at the right number.",
    items: [
      /* learn ML2: answer in the plan = 9000 g */
      { qid: "M2.S3.T5.C21:ML2", kind: "toG", kg: 9, g: 0, answer: 9000, winMs: 3000,
        say: "How many grams are there in 9 kg?", ask: "9 kg in grams?",
        miss: "What number is printed on the converter?", win: "Yes, 9 kg is 9,000 g." },
      /* practice 3: answer in the plan = 5000 g */
      { qid: "M2.S3.T5.C21:3", kind: "toG", kg: 5, g: 0, answer: 5000, winMs: 3000,
        say: "Change 5 kg into grams the same way.", ask: "5 kg is how many grams?",
        miss: "Each of the 5 kilogram weights is as heavy as the pile that levelled 1 kg.", win: "Right, 5 kilograms make 5,000 grams." },
      /* practice 4: answer in the plan = 13,640 g. 13 kg is 13,000 g, and 640 g more makes 13,640 g */
      { qid: "M2.S3.T5.C21:4", kind: "toG", kg: 13, g: 640, answer: 13640, winMs: 3400,
        say: "A bag holds 13 kg 640 g, so change it all into grams.", ask: "13 kg 640 g in grams?",
        miss: "Change the 13 kg first, and the 640 g are grams already.", win: "Yes, 13,000 g and 640 g more make 13,640 g." },
    ],
  },
  {
    n: 3,
    concept: "Grams into kilograms and grams",
    conceptId: "M2.S3.T5.C22", objectiveIds: ["O8"],
    says: ["How many whole kilograms are in it? What is left stays in grams."],
    /* the warm-up: a card of 3,250 g (in no question) passed back up through the converter */
    steps: [
      { say: "Tap the card to pass 3,250 g up through the converter.", on: "card", hint: "Tap the card below the converter." },
    ],
    stepHold: 2600,
    /* tries, as the plan writes it: rung 1 the item's own miss; rung 2 how many whole kilograms fit, and what is
       left; rung 3 the whole thousands are the kilograms and the rest stays grams. The number pad stays open. */
    ladder: ["How many whole kilograms fit, and what is left?", "Each 1,000 g makes a kilogram; the grams that cannot make one more stay grams."],
    closing: "Divide by 1,000: the quotient is the kilograms and the remainder stays as grams.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: divide by 1,000. Whole kilograms, then grams left over.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The converter's 1,000 lights and the card passes back up through it: the quotient lands in the kilograms slot and the remainder stays in the grams slot.",
    items: [
      /* learn ML3: answer in the plan = 6 kg 385 g */
      { qid: "M2.S3.T5.C22:ML3", kind: "toKg", grams: 6385, parts: WB_KG, answer: [6, 385], winMs: 3000,
        say: "Write 6,385 g in kilograms and grams.", ask: "6,385 g in kilograms and grams",
        miss: "How many grams make one kilogram?", win: "Yes, 6,385 g is 6 kg 385 g." },
      /* practice 5: answer in the plan = 2 kg 750 g */
      { qid: "M2.S3.T5.C22:5", kind: "toKg", grams: 2750, parts: WB_KG, answer: [2, 750], winMs: 3300,
        say: "Now split 2,750 g the same way.", ask: "2,750 g in kilograms and grams",
        miss: "How many whole thousands are there in 2,750?", win: "Right: 2 whole kilograms, and 750 g left over." },
      /* practice 6: answer in the plan = 25 kg 400 g, because 25,400 divided by 1000 is 25 remainder 400 */
      { qid: "M2.S3.T5.C22:6", kind: "toKg", grams: 25400, parts: WB_KG, answer: [25, 400], winMs: 3400,
        say: "A sack of rice weighs 25,400 g: how many kilograms and grams is that?", ask: "25,400 g in kilograms and grams",
        miss: "Count every 1,000 g in 25,400 g, even if there are many.", win: "Yes: 25 whole kilograms, and 400 g stay as grams." },
    ],
  },
  {
    n: 4,
    concept: "A zero that holds a place in grams",
    conceptId: "M2.S3.T5.C23", objectiveIds: ["O8"],
    says: ["The grams leave some places empty. What goes in each one?"],
    /* the warm-up: a card of 2 kg 5 g (in no question) passed down into grams, then a zero written in each empty place */
    steps: [
      { say: "Tap the card to pass 2 kg 5 g down into grams.", on: "card", hint: "Tap the card above the converter." },
      { say: "The hundreds box is empty, so tap it to write a 0.", on: "zero-h", hint: "Tap the empty box under H." },
      { say: "Now tap the empty tens box to write its 0.", on: "zero-t", hint: "Tap the empty box under T." },
    ],
    stepHold: 2000,
    /* tries, as the plan writes it: rung 1 the item's own miss; rung 2 which boxes are still empty; rung 3 a zero in
       every empty place between the digits. The number pad stays open. */
    ladder: ["Which boxes are still empty?", "Each empty place between the digits needs a zero."],
    closing: "Beside kilograms the grams take three places, and a zero holds each empty one.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a zero holds each place the grams leave empty.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The card passes through the converter and the place board fills: kilograms in blue, grams in green in their own places, grey zeros dropping into every empty place.",
    items: [
      /* learn ML4: answer in the plan = 7009 g */
      { qid: "M2.S3.T5.C23:ML4", kind: "place", kg: 7, g: 9, answer: 7009, winMs: 3400,
        say: "Write 7 kg 9 g in grams.", ask: "7 kg 9 g in grams?",
        miss: "Which boxes do the grams fill?", win: "Yes, 7 kg 9 g is 7,009 g." },
      /* practice 7: answer in the plan = 30,008 g. Zeros hold the hundreds and the tens of the grams */
      { qid: "M2.S3.T5.C23:7", kind: "place", kg: 30, g: 8, answer: 30008, winMs: 3400,
        say: "Now 30 kg 8 g: how many grams in all?", ask: "30 kg 8 g in grams?",
        miss: "Where do the 8 g go: hundreds, tens or ones?", win: "Right, zeros hold the places, so it is 30,008 g." },
      /* practice 8: answer in the plan = Dividing by 1000 leaves a remainder of 70, read from the last three digits
         070, whose zero holds the hundreds. The weight is 4 kg 70 g (what is right: two boxes, as phase 3) */
      { qid: "M2.S3.T5.C23:8", kind: "fix", grams: 4070, wrote: [4, 700], parts: WB_KG, answer: [4, 70], winMs: 3800,
        /* its own rungs 2 and 3: no box of this board is empty */
        ladder: ["Which three digits of 4,070 are the grams?", "The 0 in the hundreds is a grams digit that holds a place."],
        say: "A child wrote 4,070 g as 4 kg 700 g: what is right?", ask: "4,070 g in kilograms and grams",
        miss: "Change your kilograms and grams back into grams: do they make 4,070 g?", win: "Yes, 4,070 g is 4 kg 70 g, with a zero in the hundreds." },
    ],
  },
];

/* the warm-up each phase's guide steps work (never a question's own numbers) */
const WB_WARM: any = {
  1: { kind: "sort", things: ["keys"] },
  2: { kind: "level" },
  3: { kind: "toKg", grams: 3250, answer: [3, 250] },
  4: { kind: "place", kg: 2, g: 5, answer: 2005 },
};
/* what each thing weighs in grams (the beam reads these), and the heavy ones */
const WB_THINGS: any = { spoon: 40, letter: 20, keys: 100, eraser: 20, onions: 10000, cement: 50000 };
const WB_HEAVY: any = { cement: true, onions: true };
const WB_NAME: any = { spoon: "steel spoon", letter: "letter", keys: "bunch of keys", eraser: "eraser", onions: "sack of onions", cement: "bag of cement" };
const WB_FREE = ["spoon", "letter", "keys", "eraser", "onions", "cement"];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  converter: 1000, thingsGrams: WB_THINGS, reference: "one 1 kg weight", gramWeight: 100, trays: ["grams", "kilograms"],
  placeBoard: ["TTh", "Th", "H", "T", "O"], warmUps: WB_WARM,
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: the unit from which
   things a child cannot lift in one hand, a weight in grams by writing the grams in three places after the
   kilograms, kilograms and grams by cutting the last three digits off */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "sort") return it.answer === it.things.map((t: string) => (WB_HEAVY[t] ? "kg" : "g")).join(",");
  if (it.kind === "unit") return it.answer === (WB_HEAVY[it.things[0]] ? "kg" : "g");
  if (it.kind === "toG" || it.kind === "place") return it.answer === Number(String(it.kg) + ("00" + it.g).slice(-3));
  if (it.kind === "toKg" || it.kind === "fix") {
    const s = String(it.grams);
    return it.answer[0] === Number(s.slice(0, -3) || "0") && it.answer[1] === Number(s.slice(-3));
  }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it: the raised pan read as the heavier, so
   every thing goes to kilograms; the eraser's 20 kept as kilograms; a hundred in place of a thousand (or the grams
   left behind); dividing by a hundred; the digits set side by side with no zeros; the child's 4 kg 700 g */
const nearMiss = (item: any) => {
  if (item.kind === "sort") return item.answer.split(",").map((u: string) => (u === "kg" ? "g" : "kg")).join(",");
  if (item.kind === "unit") return "kg";
  if (item.kind === "toG") return item.g ? item.kg * 1000 : item.kg * 100;
  if (item.kind === "toKg") return [Math.floor(item.grams / 100), item.grams % 100];
  if (item.kind === "place") return Number(String(item.kg) + String(item.g));
  if (item.kind === "fix") return item.wrote;
  return typeof item.answer === "number" ? item.answer + 1 : "~";
};
/* the forms of an answer that no question, hint or ladder line may print. A two-unit answer is given away only
   as the pair (the question's own 6,385 holds the digits of 385); a sort, by naming each thing with its unit */
const answerForms = (item: any) => {
  if (item.kind === "sort") return item.things.map((t: string, k: number) => `${t} in ${item.answer.split(",")[k] === "kg" ? "kilograms" : "grams"}`);
  if (item.kind === "unit") return ["20 g", "20 grams"];
  if (item.parts) {
    const [a, b] = item.answer;
    return [`${a} kg ${b} g`, `${a} kilograms ${b} grams`, `${a} kilograms and ${b} grams`, `${words(a)} kilograms ${words(b)} grams`,
      `${words(a)} kilograms and ${words(b)} grams`];
  }
  return [String(item.answer), indian(item.answer), words(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* what the answer slot shows: a sort as its two units, a chosen unit in full, grams with their commas */
const format = (v: any, _j?: any, o?: any) => {
  const s = String(v ?? "");
  const tr = (o && o.tx) || ((x: any) => x);
  if (/^(kg|g),(kg|g)$/.test(s)) return s.split(",").map((u: string) => tr(u)).join(o && o.lang && o.lang !== "en" ? ", " : " and ");
  if (s === "g") return tr("grams");
  if (s === "kg") return tr("kilograms");
  return /^[1-9]\d{3,8}$/.test(s) ? indian(Number(s)) : s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.pad === "enter" && HOOK.set) HOOK.set(item.answer);
  return T.submit(item.answer);
};
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
/* ── the bench, in picture coordinates: 900 wide (it fits beside the open keypad, x 0 to 900 with bigPad) and placed in
   the working area at (ox, WB_OY), so it never runs under the key's corner ── */
const WB_PW = 900;
const WB_OY = 12;
const WB_B = { bx: 240, by: 150, L: 150, hang: 165 };       /* the balance: pivot, half beam, string length */
const WB_RIM = WB_B.by + WB_B.hang;                          /* the pans' rim with the beam level */
const WB_SHELF = 176;                                         /* the shelf's top: things stand on it */
const WB_TRAY: any = { g: { x: 530, y: 234, w: 180, h: 220 }, kg: { x: 720, y: 234, w: 180, h: 220 } };
const WB_PILE = { x: 558, base: 470 };                        /* phase 2's pile of hundred gram weights (two columns) */
const WB_FPILE: any = { kg: { x: 615, base: 470 }, g100: { x: 805, base: 470 } };   /* free play's two piles */
const WB_L2 = { card: { x: 628, y: 20, w: 268, h: 84 }, cv: { x: 628, y: 124, w: 268, h: 170 }, out: { x: 628, y: 318, w: 268, h: 84 } };
const WB_L3 = { kgs: { x: 240, y: 6, w: 200, h: 104 }, gs: { x: 460, y: 6, w: 200, h: 104 }, cv: { x: 280, y: 138, w: 340, h: 180 }, card: { x: 280, y: 350, w: 340, h: 100 } };
const WB_L4 = { card: { x: 540, y: 0, w: 300, h: 84 }, kgs: { x: 480, y: 0, w: 180, h: 88 }, gs: { x: 676, y: 0, w: 180, h: 88 }, cv: { x: 540, y: 104, w: 300, h: 140 },
  /* the correction's second board: the child's own number, left of the converter */
  mine: { x: 16, y: 96, w: 500, bh: 116, gap: 8 },
  bx: 136, by: 272, bw: 116, bh: 130, gap: 12 };
const WB_HEADS = ["TTh", "Th", "H", "T", "O"];
/* a typed number of 6 or 7 digits opens the lakh places on the left (Indian places) */
const WB_HEADS7 = ["TL", "L", "TTh", "Th", "H", "T", "O"];
const WB_EDGE = "#3A3A3A";
const WB_ZERO = "#767676";
const wbKInk = () => shade(CONTENT.hundred, 0.25);
const wbGInk = () => shade(CONTENT.one, 0.25);
/* a load's weight in grams */
const wbGrams = (ld: any) => (!ld ? 0 : (ld.ref ? 1000 : 0) + (ld.kg || 0) * 1000 + (ld.g || 0) + (ld.g100 || 0) * 100 + (ld.chip || 0)
  + (ld.thing ? WB_THINGS[ld.thing] : 0));
/* the beam tips toward the heavier pan (6 to 12 degrees; positive: the left pan down) and is level only for equal loads */
const wbTilt = (l: number, r: number) => (l === r ? 0 : Math.sign(l - r) * (6 + 6 * Math.min(1, Math.abs(l - r) / Math.max(l, r, 1))));
const wbDy = (a: number) => WB_B.L * Math.sin((a * Math.PI) / 180);
/* a line's width in em, a little generous: a digit 0.62, a comma 0.3, a space 0.28, a Latin letter 0.58, a Devanagari or
   Gujarati letter or spacing sign 0.46; the marks that take no room are skipped (PATTERNS §18). A text that must fit a box
   shrinks to it, never below the 28 floor (NOTES: Hindi/Gujarati FIT lessons 1) */
const WB_ZW = /[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/;
function wbEm(s: string) {
  let e = 0;
  for (const ch of String(s)) {
    if (WB_ZW.test(ch)) continue;
    e += /[0-9]/.test(ch) ? 0.62 : ch === "," || ch === "." ? 0.3 : ch === " " ? 0.28 : /[ऀ-૿]/.test(ch) ? 0.46 : 0.58;
  }
  return e;
}
const wbFitFs = (s: string, fs: number, w: number) => Math.max(T.micro, Math.min(fs, Math.floor(w / Math.max(0.1, wbEm(s)))));
/* the same weight as one plain string (to measure it) */
const wbAmtStr = (kg: any, g: any, tx: any) => [kg !== null && kg !== undefined ? indian(kg) + " " + tx("kg") : "",
  g !== null && g !== undefined ? indian(g) + " " + tx("g") : ""].filter(Boolean).join(" ");
/* Gujarati's thin strokes look hollow under a heavy outline: its white labels on a weight get a thin one (set per render) */
const WB_TXT = { thin: false };
/* a weight as written: the kilograms in blue, the grams in green, the unit names in ink (never a decimal) */
function wbAmt(kg: any, g: any, tx: any, ink: string) {
  const out: any[] = [];
  if (kg !== null && kg !== undefined) out.push(<tspan key="a" fill={wbKInk()}>{indian(kg)}</tspan>, <tspan key="b" fill={ink}>{" " + tx("kg")}</tspan>);
  if (g !== null && g !== undefined) out.push(<tspan key="c" fill={wbGInk()}>{(out.length ? " " : "") + indian(g)}</tspan>, <tspan key="d" fill={ink}>{" " + tx("g")}</tspan>);
  return out;
}

/* a thing from the shelf, drawn plainly, standing on (0, 0), the middle of its base */
function wbThing(id: string) {
  const E = WB_EDGE;
  if (id === "spoon") return (
    <g>
      <rect x={-70} y={-24} width={86} height={13} rx={6.5} fill="#C4CBD2" stroke={E} strokeWidth={2.5} />
      <ellipse cx={34} cy={-20} rx={32} ry={18} fill="#C4CBD2" stroke={E} strokeWidth={2.5} />
      <ellipse cx={27} cy={-26} rx={13} ry={5} fill="#FFFFFF" fillOpacity={0.75} />
    </g>
  );
  if (id === "letter") return (
    <g>
      <rect x={-56} y={-76} width={112} height={76} rx={6} fill="#FFFFFF" stroke={E} strokeWidth={2.5} />
      <path d="M -56 -76 L 0 -34 L 56 -76" fill="none" stroke={E} strokeWidth={2.5} strokeLinejoin="round" />
      <rect x={28} y={-68} width={20} height={22} rx={2} fill="#AEB6BE" stroke={E} strokeWidth={1.5} />
    </g>
  );
  if (id === "cement") return (
    <g>
      <path d="M -56 0 Q -64 -60 -50 -120 L 50 -120 Q 64 -60 56 0 Z" fill="#BDB6AA" stroke="#5F584E" strokeWidth={3} strokeLinejoin="round" />
      <path d="M -48 -106 H 48" stroke="#5F584E" strokeWidth={2} strokeDasharray="6 5" />
      <rect x={-34} y={-82} width={68} height={42} rx={6} fill="#ECE7DD" stroke="#5F584E" strokeWidth={2} />
      <path d="M -22 -61 H 22" stroke="#5F584E" strokeWidth={3} strokeLinecap="round" />
    </g>
  );
  if (id === "onions") return (
    <g>
      <path d="M -52 0 Q -62 -58 -40 -100 L -14 -112 L 14 -112 L 40 -100 Q 62 -58 52 0 Z" fill="#CFB38C" stroke="#6B5236" strokeWidth={3} strokeLinejoin="round" />
      <circle cx={-22} cy={-30} r={17} fill="#A9744C" stroke="#6B5236" strokeWidth={2} />
      <circle cx={17} cy={-26} r={18} fill="#B8845A" stroke="#6B5236" strokeWidth={2} />
      <circle cx={-3} cy={-62} r={17} fill="#A9744C" stroke="#6B5236" strokeWidth={2} />
      <path d="M -14 -112 L 0 -128 L 14 -112" fill="none" stroke="#6B5236" strokeWidth={3} strokeLinejoin="round" />
      {/* the sack's picture at its own shape (112 x 140), over the plain sack */}
      <Skin name="sack" x={-56} y={-140} w={112} h={140} />
    </g>
  );
  if (id === "eraser") return (
    <g>
      <rect x={-42} y={-38} width={84} height={38} rx={7} fill="#F4EFE5" stroke={E} strokeWidth={2.5} />
      <path d="M 12 -38 H 35 A 7 7 0 0 1 42 -31 V -7 A 7 7 0 0 1 35 0 H 12 Z" fill="#8E9AA6" stroke={E} strokeWidth={2.5} />
    </g>
  );
  /* a bunch of keys hanging from a ring, inside the keyring picture's own box (84 x 112) */
  return (
    <g>
      <circle cx={0} cy={-94} r={13} fill="none" stroke="#8D7C4E" strokeWidth={6} />
      {[-20, 0, 20].map((x, k) => (
        <g key={k} transform={`rotate(${x * 0.9} 0 -82)`}>
          <circle cx={0} cy={-70} r={10} fill="none" stroke="#9C8A55" strokeWidth={6} />
          <path d={`M 0 -60 V -10 M 0 -22 H 9 M 0 -32 H 7`} fill="none" stroke="#9C8A55" strokeWidth={6} strokeLinecap="round" />
        </g>
      ))}
      <Skin name="keyring" x={-42} y={-112} w={84} h={112} />
    </g>
  );
}
/* the weight picture (a brass block, 128 x 82) is skinned on at most 40 weights a screen (IMAGES §2); the rest stay plain.
   Work and StartArt set the count at the start of each render */
const WB_SK = { n: 40 };
const WB_AR = 82 / 128;   /* every weight block keeps the picture's own shape, so no skin is stretched */
/* one weight block, top-left (x, y): the plain block, the brass picture over it, then the colour code over the picture
   (blue for kilograms at 0.86, so brass reads blue; green for grams at 0.72), then the outline */
function wbBlock(x: number, y: number, w: number, h: number, paint: string, base: string, sk: boolean) {
  const edge = shade(base, 0.25), rx = Math.max(3, Math.round(h * 0.16));
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={`url(#${paint})`} />
      {sk ? <Skin name="weight" x={x} y={y} w={w} h={h} /> : null}
      {sk ? <rect x={x} y={y} width={w} height={h} rx={rx} fill={`url(#${paint})`} fillOpacity={paint === "gHundred" ? 0.86 : 0.72} /> : null}
      <rect x={x} y={y} width={w} height={h} rx={rx} fill="none" stroke={edge} strokeWidth={Math.min(2.5, h / 8)} />
    </g>
  );
}
const wbSkOk = (sk?: boolean) => (sk === undefined ? WB_SK.n-- > 0 : sk);
/* a deep blue kilogram weight with its handle, standing on (cx, base); w is its width (wider for a longer label) */
function wbKgW(cx: number, base: number, label: string, w = 100, fs = T.label, sk?: boolean) {
  const edge = shade(CONTENT.hundred, 0.25), h = Math.round(w * WB_AR);
  return (
    <g>
      <path d={`M ${cx - 15} ${base - h + 2} A 15 13 0 0 1 ${cx + 15} ${base - h + 2}`} fill="none" stroke={edge} strokeWidth={7} />
      {wbBlock(cx - w / 2, base - h, w, h, "gHundred", CONTENT.hundred, wbSkOk(sk))}
      {label ? <text x={cx} y={base - h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill="#FFFFFF" stroke={edge} strokeWidth={WB_TXT.thin ? 1.2 : 3} paintOrder="stroke">{label}</text> : null}
    </g>
  );
}
/* a green gram weight carrying its own number (the eraser's 20 g), standing on (cx, base) */
function wbGW(cx: number, base: number, label: string, w: number) {
  const edge = shade(CONTENT.one, 0.25), h = Math.round(w * WB_AR);
  return (
    <g>
      {wbBlock(cx - w / 2, base - h, w, h, "gOne", CONTENT.one, wbSkOk())}
      <text x={cx} y={base - h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF" stroke={edge} strokeWidth={WB_TXT.thin ? 1.2 : 3} paintOrder="stroke">{label}</text>
    </g>
  );
}
/* one hundred gram weight: a small green block, base at (cx, base) */
const WB_SLAB = { w: 46, h: 29 };
function wbSlab(cx: number, base: number, sk?: boolean) {
  return wbBlock(cx - WB_SLAB.w / 2, base - WB_SLAB.h, WB_SLAB.w, WB_SLAB.h, "gOne", CONTENT.one, wbSkOk(sk));
}
/* a counted load on a pan or the bench, packed in rows from its base up. Kilograms are blue weights WITH a handle (a big
   one for each 10 kg, then 1 kg ones); grams are green weights WITHOUT one (a big one for each 10,000 g, then 1,000 g bars,
   hundreds, tens and ones). So a 1 kg weight and a 1,000 g bar differ by shape as well as colour, and a load ten times as
   heavy draws a heap far bigger. `raw`: free play's own pieces as they were put on (1 kg weights never grouped in tens).
   Past its cap a kind draws the cap and the heap gets a torn top marked "and more", so a capped heap never passes for
   the whole load. Each block keeps the weight picture's own shape (128 x 82) */
function wbPile(load: any, px: number, base: number, tx: any = (v: any) => v, top = -1e9) {
  const bl: any[] = [];
  let over = false;
  const add = (k: number, w: number, h: number, p: string, c: string, handle: boolean, cap = 25) => {
    if (k > cap) over = true;
    for (let j = 0; j < Math.min(k, cap); j++) bl.push({ w, h, p, c, handle });
  };
  const kg = load.kg || 0, g = load.g || 0, B = CONTENT.hundred, G = CONTENT.one;
  if (load.raw) add(kg, 31, 20, "gHundred", B, true);
  else { add(Math.floor(kg / 10), 48, 31, "gHundred", B, true, 18); add(kg % 10, 31, 20, "gHundred", B, true); }
  add(Math.floor(g / 10000), 48, 31, "gOne", G, false, 18);
  add(Math.floor((g % 10000) / 1000), 31, 20, "gOne", G, false);
  add(Math.floor((g % 1000) / 100) + (load.g100 || 0), 22, 14, "gOne", G, false);
  add(Math.floor((g % 100) / 10), 17, 11, "gOne", G, false);
  add(g % 10, 14, 9, "gOne", G, false);
  const out: any[] = [];
  let y = base, row: any[] = [], rowH = 0;
  const lift = (b: any) => b.h + (b.handle ? Math.round(b.h * 0.32) : 0);
  const flush = () => {
    const rw = row.reduce((a: number, b: any) => a + b.w + 3, -3);
    let x = px - rw / 2;
    row.forEach((b: any) => {
      const top = y - b.h, r = b.h * 0.28;
      out.push(
        <g key={out.length}>
          {b.handle ? <path d={`M ${x + b.w / 2 - r} ${top + 1} A ${r} ${r} 0 0 1 ${x + b.w / 2 + r} ${top + 1}`} fill="none" stroke={shade(b.c, 0.25)} strokeWidth={Math.max(2.5, b.h / 7)} /> : null}
          {wbBlock(x, top, b.w, b.h, b.p, b.c, wbSkOk())}
        </g>
      );
      x += b.w + 3;
    });
    y -= rowH + 3; row = []; rowH = 0;
  };
  /* `top`: the highest a heap may reach (its torn top and "and more" stay under it); rows past it are left off */
  let full = false;
  const flushIn = () => { if (y - rowH - 3 < top + 52) { full = true; over = true; row = []; rowH = 0; return; } flush(); };
  bl.forEach((b: any) => {
    if (full) return;
    if (row.length && row.reduce((a: number, q: any) => a + q.w + 3, 0) + b.w > 150) flushIn();
    if (full) return;
    row.push(b); rowH = Math.max(rowH, lift(b));
  });
  if (row.length && !full) flushIn();
  if (over) out.push(
    <g key="over">
      <path d={`M ${px - 66} ${y} l 11 -9 l 11 9 l 11 -9 l 11 9 l 11 -9 l 11 9 l 11 -9 l 11 9 l 11 -9 l 11 9 l 11 -9 l 11 9`} fill="none" stroke="#2B2B2B" strokeWidth={3} strokeLinejoin="round" />
      <text x={px} y={y - 18} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#2B2B2B">{tx("and more")}</text>
    </g>
  );
  return out;
}
/* the pan balance: the post, the beam (tilt a), the pans with what stands on them, the arrow to the pan that went
   down (lit in a correction), and a counter under each pan */
function wbBalance(C: any, a: number, leftNode: any, rightNode: any, lc: any, rc: any, lit: boolean, tr: any) {
  const { bx, by, L } = WB_B, rim = WB_RIM, dy = wbDy(a);
  const pan = (px: number, d: number, node: any, k: string) => (
    <g key={k} style={{ transform: `translateY(${d}px)`, transition: tr } as any}>
      <path d={`M ${px - 80} ${rim} L ${px} ${by} L ${px + 80} ${rim}`} fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
      {node}
      <path d={`M ${px - 88} ${rim} Q ${px} ${rim + 48} ${px + 88} ${rim} Z`} fill="#E6E0D5" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
    </g>
  );
  const ar = lit ? C.accent : C.ink;
  return (
    <g>
      <rect x={bx - 9} y={by} width={18} height={466 - by} rx={4} fill={C.ink} />
      <rect x={bx - 90} y={466} width={180} height={22} rx={10} fill={C.ink} />
      {pan(bx - L, dy, leftNode, "pl")}
      {pan(bx + L, -dy, rightNode, "pr")}
      <g transform={`translate(${bx},${by})`}>
        <g style={{ transform: `rotate(${-a}deg)`, transition: tr } as any}>
          <rect x={-L - 12} y={-8} width={2 * L + 24} height={16} rx={8} fill={C.ink} />
        </g>
        <circle r={15} fill={C.ink} />
        <circle r={6} fill="#FFFFFF" />
      </g>
      <rect x={bx - 50} y={by + 46} width={100} height={44} rx={12} fill="#FFFFFF" stroke={ar} strokeWidth={lit ? 5 : 2} />
      {a === 0
        ? <path d={`M ${bx - 14} ${by + 79} L ${bx} ${by + 56} L ${bx + 14} ${by + 79} Z`} fill={C.ink} />
        : <path d={a > 0 ? `M ${bx + 32} ${by + 68} H ${bx - 30} M ${bx - 14} ${by + 56} L ${bx - 32} ${by + 68} L ${bx - 14} ${by + 80}`
            : `M ${bx - 32} ${by + 68} H ${bx + 30} M ${bx + 14} ${by + 56} L ${bx + 32} ${by + 68} L ${bx + 14} ${by + 80}`}
            fill="none" stroke={ar} strokeWidth={lit ? 8 : 6} strokeLinecap="round" strokeLinejoin="round" />}
      {/* a counter is { n: the tspans, s: the same as a string }: it shrinks to stay under its pan and inside the area */}
      {/* when even the 28 floor is wider than the room, it slides inboard (never past the area's left edge or the trays) */}
      {lc ? (() => { const fs = wbFitFs(lc.s, T.label, 2 * (bx - L) - 8), hw = (wbEm(lc.s) * fs) / 2;
        return <text x={Math.max(bx - L, 4 + hw)} y={rim + 100} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>{lc.n}</text>; })() : null}
      {rc ? (() => { const fs = wbFitFs(rc.s, T.label, 200), hw = (wbEm(rc.s) * fs) / 2;
        return <text x={Math.min(bx + L, 520 - hw)} y={rim + 100} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>{rc.n}</text>; })() : null}
    </g>
  );
}
/* the converter: one number on its front, a thousand, and no dial; down it multiplies, up it divides */
function wbConv(cv: any, lit: boolean, C: any) {
  const cx = cv.x + cv.w / 2, cy = cv.y + cv.h / 2, ah = Math.min(42, cv.h / 2 - 24);
  const arrow = (x: number, down: boolean) => {
    const tip = down ? cy + ah : cy - ah, back = down ? -15 : 15;
    return <path d={`M ${x} ${cy - ah} V ${cy + ah} M ${x - 13} ${tip + back} L ${x} ${tip} L ${x + 13} ${tip + back}`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />;
  };
  return (
    <g>
      <rect x={cv.x} y={cv.y} width={cv.w} height={cv.h} rx={26} fill="url(#gPanel)" stroke={C.ink} strokeWidth={3} filter="url(#fShadowSoft)" />
      <rect x={cv.x + 50} y={cv.y - 7} width={cv.w - 100} height={14} rx={7} fill={C.ink} />
      <rect x={cv.x + 50} y={cv.y + cv.h - 7} width={cv.w - 100} height={14} rx={7} fill={C.ink} />
      {lit ? <rect x={cx - 104} y={cy - 46} width={208} height={86} rx={20} fill="#FFFFFF" stroke={C.accent} strokeWidth={6} /> : null}
      <text x={cx} y={cy + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>1,000</text>
      {arrow(cv.x + 34, true)}
      {arrow(cv.x + cv.w - 34, false)}
    </g>
  );
}
/* a weight card: white, its weight written across it */
function wbCard(r: any, content: any, C: any, fs0: number, str?: string) {
  const fs = str ? wbFitFs(str, fs0, r.w - 24) : fs0;
  return (
    <g>
      <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} filter="url(#fShadowSoft)" />
      <text x={r.x + r.w / 2} y={r.y + r.h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>{content}</text>
    </g>
  );
}

function Work({ phase, n, item, index, stage, wrong, typed, api, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR) */
  const C = api.C;
  const tl = useTimeline();
  const fast = reducedMotion();
  const tr = fast ? undefined : "transform 520ms cubic-bezier(.3,1.35,.5,1)";
  const glide = fast ? undefined : "transform 480ms ease-in-out";
  const free = stage === "free";
  /* a phase with guide steps opens on "teach" for a frame, then "demo": both are the warm-up (PATTERNS §18) */
  const warm = !free && (stage === "demo" || stage === "teach");
  const it: any = free ? {} : warm ? WB_WARM[n] || {} : item || {};
  const asking = !free && !warm && stage === "ask";
  const done = !free && !warm && (stage === "win" || stage === "idle");
  const kgW = lang !== "en" ? 132 : 104;
  WB_SK.n = 40;   /* at most 40 weight pictures on this screen; the rest are drawn plain */
  WB_TXT.thin = lang === "gu";
  const ind = lang !== "en";

  /* the room: the picture is 900 wide, beside the open keypad, and never under the key's corner */
  const bw = box ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : bw;
  const ox = Math.round(Math.max(0, Math.min((bw - WB_PW) / 2, kx - WB_PW)));
  const P = (x: number, y: number) => ({ x: ox + x, y: WB_OY + y });

  /* one board per ENTRY of a question (PATTERNS §18): rebuilt in render whenever the question key changes */
  const qk = free ? "free" : n + ":" + (warm ? "w" : index);
  const ent = useRef<any>({ qk: null, e: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, e: ent.current.e + 1 };
  const ek = ent.current.e;
  const fresh = (): any => ({ ek, where: {}, moving: null, w100: n === 2 && !warm && !free ? 10 : 0, pass: 0, lit: false, zd: false,
    zeros: {}, demo: null, acted: true, stack: [] });
  const [raw, setRaw] = useState<any>(fresh);
  const s = raw.ek === ek ? raw : fresh();
  const put = (o: any) => setRaw((p: any) => {
    if (p.ek > ek) return p;   /* a late write from an older entry never touches this one */
    const cur = p.ek === ek ? p : fresh();
    return { ...cur, ...(typeof o === "function" ? o(cur) : o) };
  });
  const sRef = useRef<any>(s);
  sRef.current = s;
  const playing = useRef(false);
  const locked = useRef(false);
  const fullSaid = useRef(false);
  const typedAtMiss = useRef<any>(null);
  /* a tap that lands while the hand is still carrying (or while a step's result is on show) is kept, and done as soon as
     the hand is free; one tap is kept, the last one */
  const pending = useRef<any>(null);
  const pressRef = useRef<any>(null);
  const nudged = useRef(false);
  const settleAct = () => {
    playing.current = false;
    const p = pending.current;
    pending.current = null;
    if (p) setTimeout(() => { if (pressRef.current) pressRef.current(p); }, 140);
  };
  const dropAct = () => { playing.current = false; pending.current = null; };
  /* a question left mid-replay: the replay stops and the pad is given back */
  useEffect(() => () => {
    tl.stop(); playing.current = false;
    if (locked.current) { locked.current = false; api.lock(false); }
  }, [qk]);

  /* ── phase 1 and free play: the things, the pans and the trays ── */
  const things: string[] = free ? WB_FREE : n === 1 ? it.things || [] : [];
  const wOf = (wm: any, t: string) => wm[t] || "shelf";
  /* the things already sorted in this phase (the warm-up's keys, then each question before this one) */
  const settled: any = { g: [], kg: [] };
  if (n === 1 && !free && !warm) {
    settled.g.push("keys");
    ((phase && phase.items) || []).slice(0, index).forEach((q: any) => q.things.forEach((t: string, k: number) =>
      settled[q.kind === "unit" ? q.answer : q.answer.split(",")[k]].push(t)));
  }
  const panThingOf = (wm: any, mv: any) => things.find((t) => wOf(wm, t) === "pan" && t !== mv) || null;
  const leftLoad = (): any => (s.demo && s.demo.left ? s.demo.left : n === 2 && !free ? { ref: 1 } : null);
  const rightLoad = (): any => {
    if (s.demo && s.demo.right) return s.demo.right;
    if (free) return { kg: s.stack.filter((x: string) => x === "kg").length, g100: s.stack.filter((x: string) => x === "g100").length, raw: true };
    if (n === 1) return { ref: 1 };
    if (n === 2) return { g100: s.w100 };
    return null;
  };
  const tiltFor = (wm: any, mv: any) => {
    const t = panThingOf(wm, mv);
    return wbTilt(wbGrams(leftLoad()) + (t ? WB_THINGS[t] : 0), wbGrams(rightLoad()));
  };
  const tilt = n === 1 || n === 2 || free ? tiltFor(s.where, s.moving) : 0;
  const dyNow = wbDy(tilt);
  const shelfAt = (t: string) => {
    if (free) { const i = WB_FREE.indexOf(t); return { x: 600 + 120 * (i % 3), y: i < 3 ? 104 : 238, s: 0.8 }; }
    return { x: things.length === 1 ? 660 : things.indexOf(t) === 0 ? 630 : 800, y: WB_SHELF, s: 1 };
  };
  /* a tray: its labelled band on top (the control that takes the thing on the pan), then two rows of two places */
  const trayAt = (k: string, j: number) => ({ x: WB_TRAY[k].x + 46 + 88 * (j % 2), y: WB_TRAY[k].y + WB_TRAY[k].h - 4 - 72 * Math.floor(j / 2), s: 0.56 });
  const placeIn = (wm: any, t: string, dy: number) => {
    const p = wOf(wm, t);
    if (p === "pan") return { x: WB_B.bx - WB_B.L, y: WB_RIM - 2 + dy, s: 0.9 };
    if (p === "g" || p === "kg") return trayAt(p, [...settled[p], ...things.filter((x) => wOf(wm, x) === p)].indexOf(t));
    return shelfAt(t);
  };

  /* every act the child taps is done on screen by the hand (PATTERNS §15); the state moves when it resolves true */
  const moveThing = (t: string, to: string, after?: () => void) => {
    if (playing.current) return;
    const cur = sRef.current;
    if (wOf(cur.where, t) === to) { if (after) after(); return; }
    const wm = { ...cur.where };
    if (to === "pan") things.forEach((x) => { if (x !== t && wOf(wm, x) === "pan") wm[x] = "shelf"; });
    wm[t] = to;
    const q0 = placeIn(cur.where, t, wbDy(tiltFor(cur.where, null))), q1 = placeIn(wm, t, wbDy(tiltFor(wm, null)));
    playing.current = true;
    put({ where: wm, moving: t, demo: null });
    api.act({ tool: "hand", moves: "carry", from: P(q0.x, q0.y - 112), to: P(q1.x, q1.y - 112),
      hold: <g transform="translate(0,112) scale(0.85)">{wbThing(t)}</g> }).then((ok: boolean) => {
      if (!ok) { dropAct(); put({ where: cur.where, moving: null }); return; }
      put({ moving: null, acted: true });
      api.sfx.tick();
      if (after) after();
      /* a nudge line gives way to the question again once the child has moved something */
      if (nudged.current && asking) { nudged.current = false; api.say(it.say); }
      settleAct();
    });
  };
  /* a tray's band takes the thing on the pan (a thing in a tray is its own control: a tap lifts it back onto the pan) */
  const trayPress = (k: string) => {
    const onPan = things.find((x) => wOf(sRef.current.where, x) === "pan");
    if (onPan) { moveThing(onPan, k); return; }
    /* a tray tapped with nothing on the pan is answered on the bubble, never silent */
    nudged.current = true;
    api.say("Lift a thing onto the pan first, then tap a tray.");
  };
  /* phase 2: hundred gram weights go on, one, then the rest in one carry, and the beam levels on the last */
  /* on the right pan: three across, rows 31 apart; in the pile: two across */
  const slabAt = (j: number) => ({ x: WB_B.bx + WB_B.L + 50 * ((j % 3) - 1), y: WB_RIM - 2 - 31 * Math.floor(j / 3) });
  const pileAt = (k: number) => ({ x: WB_PILE.x + (k % 2 ? 25 : -25), y: WB_PILE.base - 31 * Math.floor(k / 2) });
  const pileTopOf = (left: number) => WB_PILE.base - 31 * Math.ceil(left / 2);
  const pileAct = () => {
    const cur = sRef.current;
    if (playing.current || cur.w100 >= 10) return;
    const from = cur.w100, upto = from === 0 ? 1 : 10, js: number[] = [];
    for (let j = from; j < upto; j++) js.push(j);
    playing.current = true;
    api.act({ tool: "hand", moves: "carry", from: P(WB_PILE.x, pileTopOf(10 - from) - 40),
      at: js.map((j) => { const q = slabAt(j); return P(q.x, q.y - dyNow - 40); }),
      hold: <g transform="translate(0,40)">{wbSlab(0, 0, true)}</g>, onPoint: (i: number) => put({ w100: js[i] + 1 }) }).then((ok: boolean) => {
      if (!ok) { dropAct(); return; }
      put({ w100: upto });
      api.sfx.settle();
      api.did("pile");
      settleAct();
    });
  };
  /* phases 3 and 4: the warm-up's card is pushed through the converter */
  const LY: any = n === 2 ? WB_L2 : n === 3 ? WB_L3 : WB_L4;
  const cardAct = () => {
    const cur = sRef.current;
    if (playing.current || cur.pass) return;
    const c = LY.card, cv = LY.cv;
    playing.current = true;
    put({ moving: "card" });
    api.act({ tool: "hand", moves: "push", from: P(c.x + c.w / 2, c.y + c.h / 2), to: P(cv.x + cv.w / 2, cv.y + cv.h / 2),
      hold: wbCard({ x: -c.w / 2, y: -c.h / 2, w: c.w, h: c.h }, cardText(), C, n === 3 ? T.xl : T.speech, cardStr()) }).then((ok: boolean) => {
      if (!ok) { dropAct(); put({ moving: null }); return; }
      put({ moving: null, pass: 2 });
      api.sfx.trade();
      api.did("card");
      settleAct();
    });
  };
  /* phase 4: a pencil writes a zero in an empty place */
  const cellBox = (k: number) => ({ x: WB_L4.bx + k * (WB_L4.bw + WB_L4.gap), y: WB_L4.by, w: WB_L4.bw, h: WB_L4.bh });
  const zeroAct = (on: string) => {
    if (playing.current) return;
    const k = on === "zero-h" ? 2 : 3, b = cellBox(k);
    playing.current = true;
    api.act({ tool: "pencil", moves: "push", at: [P(b.x + b.w / 2, b.y + 96)],
      onPoint: () => put((c: any) => ({ zeros: { ...c.zeros, [k]: true } })) }).then((ok: boolean) => {
      if (!ok) { dropAct(); return; }
      put((c: any) => ({ zeros: { ...c.zeros, [k]: true } }));
      api.did(on);
      settleAct();
    });
  };
  /* free play: a weight from its pile onto the right pan, or the last one back */
  const weightAct = (kind: any, add: boolean) => {
    const cur = sRef.current;
    if (playing.current || (!add && !cur.stack.length)) return;
    /* the pan holds 30 weights: a tap past that is answered on the bubble, never silent; the next weight taken off brings
       the free-play line back (PATTERNS §18: a nudge stays until something replaces it) */
    if (add && cur.stack.length >= 30) { if (!fullSaid.current) { fullSaid.current = true; api.say("The pan is full, so tap it to take a weight off."); } return; }
    if (!add && fullSaid.current) { fullSaid.current = false; api.say(FREE_LINE); }
    const k = add ? kind : cur.stack[cur.stack.length - 1];
    const pp = WB_FPILE[k], pilePt = P(pp.x, pp.base - 200), panPt = P(WB_B.bx + WB_B.L, WB_RIM - 70 - dyNow);
    playing.current = true;
    if (!add) put((c: any) => ({ stack: c.stack.slice(0, -1) }));
    api.act({ tool: "hand", moves: "carry", from: add ? pilePt : panPt, to: add ? panPt : pilePt,
      hold: <g transform="translate(0,40)">{k === "kg" ? wbKgW(0, 0, "", 60, T.label, true) : wbSlab(0, 0, true)}</g> }).then((ok: boolean) => {
      if (!ok) { dropAct(); if (!add) put((c: any) => ({ stack: [...c.stack, k] })); return; }
      if (add) put((c: any) => ({ stack: [...c.stack, k] }));
      api.sfx.tick();
      settleAct();
    });
  };

  /* GUIDE STEPS: the step's act, done when the child does it; Enter, the agent's check() and the dev solve() do it too */
  const act = (on: string) => {
    if (playing.current) return;
    if (n === 1 && on === "keys") moveThing("keys", "pan", () => api.did("keys"));
    else if (n === 1 && on === "tray-g") moveThing("keys", "g", () => api.did("tray-g"));
    else if (n === 2 && on === "pile") pileAct();
    else if ((n === 3 || n === 4) && on === "card") cardAct();
    else if (n === 4 && (on === "zero-h" || on === "zero-t")) zeroAct(on);
  };
  /* every tap on a control: in a guide step the awaited one is done, any other is reported (its hint shows) */
  const press = (name: string) => {
    if (tl.busy || locked.current) return;
    /* while the hand carries, or while the last step's result is on show, the tap waits its turn */
    if (playing.current || (stage === "demo" && !stepOn) || stage === "teach") { pending.current = name; return; }
    if (stage === "demo") { if (stepOn && name === stepOn) act(name); else api.did(name); return; }
    if (free) {
      if (WB_FREE.includes(name)) moveThing(name, wOf(sRef.current.where, name) === "pan" ? "shelf" : "pan");
      else if (name === "pile-kg") weightAct("kg", true);
      else if (name === "pile-g") weightAct("g100", true);
      else if (name === "pan-right") weightAct(null, false);
      return;
    }
    if (!asking || n !== 1) return;
    if (name === "tray-g" || name === "tray-kg") trayPress(name === "tray-g" ? "g" : "kg");
    else if (things.includes(name)) moveThing(name, wOf(sRef.current.where, name) === "pan" ? "shelf" : "pan");
  };
  /* a sort is sent with Enter once every thing is in a tray */
  const sortEnter = () => {
    const cur = sRef.current;
    if (playing.current || locked.current || !cur.acted) return;
    if (!things.every((t) => { const w = wOf(cur.where, t); return w === "g" || w === "kg"; })) {
      /* Enter before every thing is in a tray is answered on the bubble (the question comes back at the next move) */
      nudged.current = true;
      api.say("Send each thing to a tray first, then press Enter.");
      return;
    }
    api.submit(things.map((t) => wOf(cur.where, t)).join(","));
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : asking && n === 1 ? sortEnter : null);
  pressRef.current = press;
  /* a tap kept through the last step's hold is done as soon as the question opens */
  useEffect(() => {
    if ((asking || free) && pending.current && !playing.current) {
      const p = pending.current;
      pending.current = null;
      setTimeout(() => { if (pressRef.current) pressRef.current(p); }, 140);
    }
  }, [stage, qk]);
  /* the boxes take what the picture can show: a phase 4 number up to 7 digits (the board opens the lakh places), a phase 3
     answer up to 4 digits a box, the phase 4 pair up to 3 and 4 (its grams fit a 7-place board) */
  useEffect(() => {
    if (!asking) return;
    const t = String(typed ?? "");
    if (it.kind === "place") {
      const d = t.replace(/\D/g, "");
      if (d.length > 7) api.setTyped(d.slice(0, 7));
    } else if (it.kind === "toKg" || it.kind === "fix") {
      const cap = it.kind === "fix" ? [3, 4] : [4, 4], ps = t.split("|");
      if (ps.some((p: string, j: number) => p.length > (cap[j] || 4))) api.setTyped(ps.map((p: string, j: number) => p.slice(0, cap[j] || 4)).join("|"));
    }
  }, [typed]);
  HOOK.demo = stage === "demo" && stepOn ? () => act(stepOn) : undefined;
  HOOK.set = (v: any) => {
    if (free || n !== 1 || !asking) return undefined;
    const us = String(v ?? "").split(",");
    const wm: any = {};
    things.forEach((t, k) => { wm[t] = us[k] === "kg" ? "kg" : "g"; });
    put({ where: wm, moving: null, acted: true, demo: null });
    sRef.current = { ...sRef.current, where: wm, moving: null, acted: true, demo: null };
    return true;
  };
  const allIn = n === 1 && asking && things.length > 0 && !s.moving && things.every((t) => { const w = wOf(s.where, t); return w === "g" || w === "kg"; });
  useEffect(() => { if (n === 1 && asking) api.answerReady(allIn && s.acted); }, [allIn, s.acted, qk, stage]);

  /* the card's weight as written */
  const cardAmt = () => (n === 2 ? [it.kg, it.g || null] : n === 3 || it.kind === "fix" ? [null, it.grams] : [it.kg, it.g]);
  const cardText = () => { const [a, b] = cardAmt(); return wbAmt(a, b, tx, C.ink); };
  const cardStr = () => { const [a, b] = cardAmt(); return wbAmtStr(a, b, tx); };

  /* a right answer: the card passes through the converter and the answer comes out (the win picture stays until Next) */
  useEffect(() => {
    if (stage !== "win" || free || warm) return;
    if (item && item.win) api.say(item.win);
    const k = item && item.kind;
    if (k === "toG" || k === "toKg") {
      put({ demo: null, pass: 0, lit: false, zd: false });
      tl.run([[450, () => put({ lit: true })], [650, () => put({ pass: 1 })], [0, () => put({ pass: 2, lit: false })]]);
    } else if (k === "place") {
      put({ demo: null, pass: 0, lit: false, zd: false });
      tl.run([[450, () => put({ lit: true })], [650, () => put({ pass: 1 })], [700, () => put({ pass: 2, lit: false })], [0, () => put({ zd: true })]]);
    } else if (k === "fix") {
      put({ demo: null, pass: 0, lit: false, zd: false });
      tl.run([[450, () => put({ lit: true })], [700, () => put({ pass: 2, lit: false })], [0, () => put({ zd: true })]]);
    } else api.sfx.settle();
  }, [stage]);

  /* a miss: the traceback redraws the maths and ends on the whole right answer, the pad locked while it runs */
  const traceSteps = (q: any, v: any) => {
    const S: any[] = [];
    /* phase 1 replays on a demo layer: a copy of each thing in the wrong tray is weighed against the kilogram (the arrow lit),
       then a copy settles in its right tray; the child's own things stay where the child put them, and the first real move
       clears the copies (BUILD_CARD §6: the child's own picks stay theirs) */
    if (q.kind === "sort") {
      const right = q.answer.split(","), ghosts: any[] = [];
      q.things.forEach((t: string, k: number) => {
        if (wOf(sRef.current.where, t) === right[k]) return;
        S.push([1500, () => put({ demo: { left: { thing: t }, ghosts: ghosts.slice() }, lit: true })]);
        S.push([800, () => { ghosts.push({ id: t, tray: right[k] }); put({ demo: { ghosts: ghosts.slice() }, lit: false }); }]);
      });
    } else if (q.kind === "unit") {
      S.push([1700, () => put({ demo: { left: { thing: "eraser" }, right: { kg: 20 } }, lit: true })]);
      S.push([1700, () => put({ demo: { left: { thing: "eraser" }, right: { chip: 20 } } })]);
      /* it ends on the whole answer: the copy still levels 20 g on the pan, a copy sits in grams and the tag reads 20 g */
      S.push([700, () => put({ demo: { left: { thing: "eraser" }, right: { chip: 20 }, ghosts: [{ id: "eraser", tray: "g" }] }, lit: false })]);
    } else if (q.kind === "toG") {
      const child = leadNumber(v) || 0;
      S.push([700, () => put({ lit: true })]);
      S.push([1800, () => put({ demo: { left: { kg: q.kg, g: q.g }, right: { g: child } } })]);
      S.push([650, () => put({ pass: 1 })]);
      S.push([900, () => put({ pass: 2, lit: false })]);
      S.push([0, () => put((c: any) => ({ demo: { ...(c.demo || {}), right: { g: q.answer } } }))]);
    } else if (q.kind === "toKg") {
      /* the child's kilograms and grams as a heap of weights beside the card's own weight, then the card passes back up */
      const ps = slotPartsOf(v, 2).map((x: string) => Number(x) || 0);
      S.push([1400, () => put({ lit: true, demo: { mine: ps } })], [650, () => put({ pass: 1 })], [0, () => put({ pass: 2, lit: false })]);
    } else if (q.kind === "place" || q.kind === "fix") {
      /* the child's number is laid on a second board, then the card passes and the place board fills */
      const ps = q.kind === "fix" ? slotPartsOf(v, 2).map((x: string) => Number(x) || 0) : null;
      const mine = ps ? String(ps[0] * 1000 + ps[1]) : String(v ?? "").replace(/\D/g, "");
      const demo = { mine: mine.length && mine.length <= 7 ? mine : "", mineAmt: ps || [null, Number(mine) || 0] };
      if (q.kind === "place") S.push([900, () => put({ lit: true, demo })], [650, () => put({ pass: 1 })], [700, () => put({ pass: 2, lit: false })], [0, () => put({ zd: true })]);
      else S.push([900, () => put({ lit: true, demo })], [700, () => put({ pass: 2, lit: false })], [0, () => put({ zd: true })]);
    }
    return S;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true); locked.current = true;
    typedAtMiss.current = typed;
    put({ demo: null, pass: 0, lit: false, zd: false, acted: false });
    /* phase 1: Enter sends the trays again only after the child's own next move */
    tl.run(traceSteps(item, wrong.value), () => { locked.current = false; api.lock(false); if (n !== 1) put({ acted: true }); });
  }, [wrong]);
  /* phase 4: the board shows the child's typing, so a new digit after a correction clears the correction */
  useEffect(() => {
    if (n !== 4 || !asking || it.kind !== "place" || locked.current) return;
    if (s.pass && typed !== typedAtMiss.current) put({ pass: 0, zd: false, lit: false, demo: null });
  }, [typed]);

  /* what the host and the agent read back (toolApi.getState) */
  const lThing = panThingOf(s.where, s.moving);
  api.share({ complete: stage === "idle", thing: lThing, tray: s.where, panWeights: wbGrams(rightLoad()), card: n >= 2 ? s.pass : null });

  /* ── drawing ── */
  const ink = C.ink;
  const inv = (x: number, y: number, w: number, h: number, rx = 18) => <Invite x={x + w / 2} y={y + h / 2} w={w} h={h} rx={rx} C={C} />;
  const hit = (id: string, x: number, y: number, w: number, h: number, label: string) =>
    <Hit key={"hit-" + id} id={id} x={x} y={y} w={w} h={h} label={label} onPress={() => press(id)} />;
  const showInvite = stage === "demo" && !!stepOn;
  /* while a correction's copy of a thing stands in its right tray, the child's own one (where the child put it) is drawn faint */
  const ghostOf = (t: string) => !!(s.demo && s.demo.ghosts && s.demo.ghosts.some((gh: any) => gh.id === t));
  const thingNode = (t: string) => {
    const q = placeIn(s.where, t, dyNow);
    return (
      <g key={"th-" + t} style={{ transform: `translate(${q.x}px, ${q.y}px) scale(${q.s})`, transition: glide, opacity: s.moving === t ? 0 : ghostOf(t) ? 0.4 : 1 } as any}>
        {wbThing(t)}
      </g>
    );
  };
  const counter = (ld: any) => {
    if (!ld || ld.ref) return null;
    const gs = (ld.g || 0) + (ld.g100 || 0) * 100 + (ld.chip || 0);
    if (!ld.kg && !gs) return null;
    /* free play reads the right pan tidied: 2 kg and twelve 100 g weights read 3 kg 200 g */
    const a = free ? Math.floor(((ld.kg || 0) * 1000 + gs) / 1000) || null : ld.kg || null;
    const b = free ? ((ld.kg || 0) * 1000 + gs) % 1000 || null : gs || null;
    return { n: wbAmt(a, b, tx, ink), s: wbAmtStr(a, b, tx) };
  };
  const rightNode = (ld: any) => {
    if (!ld) return null;
    const px = WB_B.bx + WB_B.L, base = WB_RIM - 2;
    if (ld.ref) return wbKgW(px, base, "1 " + tx("kg"), kgW);
    if (ld.chip) return wbGW(px, base, ld.chip + " " + tx("g"), lang !== "en" ? 132 : 96);
    if (n === 2 && !s.demo && !free) return <g>{Array.from({ length: ld.g100 || 0 }).map((_, j) => { const q = slabAt(j); return <g key={j}>{wbSlab(q.x, q.y)}</g>; })}</g>;
    return <g>{wbPile(ld, px, base, tx, 44)}</g>;
  };
  const leftNode = (ld: any) => {
    if (!ld) return null;
    const px = WB_B.bx - WB_B.L, base = WB_RIM - 2;
    if (ld.ref) return wbKgW(px, base, "1 " + tx("kg"), kgW);
    return <g>{wbPile(ld, px, base, tx, 44)}</g>;
  };

  /* phase 1 and free play: the bench */
  const bench = () => {
    const rl = rightLoad();
    const panT = lThing;
    return (
      <g>
        {/* the shelf */}
        {free
          ? <g><rect x={530} y={104} width={370} height={12} rx={5} fill="#B08A5E" stroke={WB_EDGE} strokeWidth={2} />
              <rect x={530} y={238} width={370} height={12} rx={5} fill="#B08A5E" stroke={WB_EDGE} strokeWidth={2} /></g>
          : <rect x={530} y={WB_SHELF} width={370} height={14} rx={5} fill="#B08A5E" stroke={WB_EDGE} strokeWidth={2} />}
        {/* the trays (phase 1 only) */}
        {!free && ["g", "kg"].map((k) => {
          const r = WB_TRAY[k];
          return (
            <g key={"tray-" + k}>
              <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={18} fill="url(#gPanel)" stroke={ink} strokeWidth={2.5} />
              <path d={`M ${r.x} ${r.y + 72} H ${r.x + r.w}`} stroke={ink} strokeWidth={2} />
              <text x={r.x + r.w / 2} y={r.y + 47} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{tx(k === "g" ? "grams" : "kilograms")}</text>
            </g>
          );
        })}
        {/* free play's two piles */}
        {free && (
          <g>
            {/* every 1 kg weight of the stack carries its label */}
            {/* a gap between the two, so the lower weight's handle (the colour-free kg cue) always shows */}
            {[0, 1].map((j) => <g key={"fk" + j}>{wbKgW(WB_FPILE.kg.x, WB_FPILE.kg.base - (Math.round(kgW * WB_AR) + 22) * j, "1 " + tx("kg"), kgW)}</g>)}
            {[0, 1, 2, 3, 4, 5].map((j) => <g key={"fg" + j}>{wbSlab(WB_FPILE.g100.x + (j % 2 ? 25 : -25), WB_FPILE.g100.base - 31 * Math.floor(j / 2))}</g>)}
            <rect x={WB_FPILE.g100.x - (ind ? 72 : 62)} y={WB_FPILE.g100.base - 154} width={ind ? 144 : 124} height={50} rx={12} fill="#FFFFFF" stroke={ink} strokeWidth={2} />
            <text x={WB_FPILE.g100.x} y={WB_FPILE.g100.base - 118} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{"100 " + tx("g")}</text>
          </g>
        )}
        {wbBalance(C, tilt, s.demo && s.demo.left && s.demo.left.thing
          ? <g transform={`translate(${WB_B.bx - WB_B.L},${WB_RIM - 2}) scale(0.9)`}>{wbThing(s.demo.left.thing)}</g> : null,
          rightNode(rl), null, counter(rl), !!s.lit, tr)}
        {/* the things sorted before this question */}
        {["g", "kg"].map((k) => settled[k].map((t: string, j: number) => {
          const q = trayAt(k, j);
          return <g key={"st-" + k + t} transform={`translate(${q.x},${q.y}) scale(${q.s})`}>{wbThing(t)}</g>;
        }))}
        {things.map((t) => thingNode(t))}
        {/* the correction's copies in their right trays (a demo layer: not the child's, no control, gone at the next move) */}
        {!free && s.demo && s.demo.ghosts && s.demo.ghosts.map((gh: any, j: number) => {
          const before = s.demo.ghosts.slice(0, j).filter((x: any) => x.tray === gh.tray).length;
          const q = trayAt(gh.tray, settled[gh.tray].length + things.filter((x) => wOf(s.where, x) === gh.tray).length + before);
          const own = placeIn(s.where, gh.id, dyNow);
          return (
            <g key={"gh-" + gh.id} pointerEvents="none">
              {/* the copy in its right tray; the child's own one stays where the child put it, drawn faint (thingNode) */}
              <g transform={`translate(${q.x},${q.y}) scale(${q.s})`}>{wbThing(gh.id)}</g>
            </g>
          );
        })}
        {/* the eraser's tag: what the child wrote, and at the win what is right */}
        {!free && it.kind === "unit" && (
          <g>
            <rect x={ind ? 716 : 770} y={84} width={ind ? 178 : 124} height={62} rx={12} fill="#FFFDF0" stroke={ink} strokeWidth={2.5} />
            <text x={ind ? 805 : 832} y={128} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={ink}>{"20 " + tx(done || (s.demo && s.demo.ghosts && s.demo.ghosts.length) ? "g" : "kg")}</text>
          </g>
        )}
        {/* the controls: each thing on the shelf or the pan, the trays, free play's piles and right pan */}
        {(warm || asking || free) && things.map((t) => {
          const w = wOf(s.where, t);
          if (w === "pan") return hit(t, WB_B.bx - WB_B.L - 85, 110, 170, 270, tx(WB_NAME[t]));
          if (w === "g" || w === "kg") { const q = placeIn(s.where, t, dyNow); return hit(t, q.x - 44, q.y - 72, 88, 72, tx(WB_NAME[t])); }
          const q = shelfAt(t);
          return free ? hit(t, q.x - 58, q.y - 104, 116, 108, tx(WB_NAME[t])) : hit(t, q.x - 75, WB_SHELF - 146, 150, 146, tx(WB_NAME[t]));
        })}
        {!free && (warm || asking) && hit("tray-g", WB_TRAY.g.x, WB_TRAY.g.y, WB_TRAY.g.w, 72, tx("grams tray"))}
        {!free && (warm || asking) && hit("tray-kg", WB_TRAY.kg.x, WB_TRAY.kg.y, WB_TRAY.kg.w, 72, tx("kilograms tray"))}
        {free && hit("pile-kg", 530, 270, 170, 204, tx("kilogram weights"))}
        {free && hit("pile-g", 720, 270, 170, 204, tx("100 gram weights"))}
        {free && hit("pan-right", WB_B.bx + WB_B.L - 88, 110, 176, 270, tx("right pan"))}
        {showInvite && stepOn === "keys" && inv(shelfAt("keys").x - 75, WB_SHELF - 146, 150, 146)}
        {showInvite && stepOn === "tray-g" && inv(WB_TRAY.g.x, WB_TRAY.g.y, WB_TRAY.g.w, 72)}
      </g>
    );
  };

  /* phase 2: the balance with the kilogram and the hundred gram weights, and the converter with a card */
  const levelBench = () => {
    const ll = leftLoad(), rl = rightLoad(), L = WB_L2;
    const left = 10 - s.w100;
    const pileTop = pileTopOf(left);
    return (
      <g>
        {wbBalance(C, tilt, leftNode(ll), rightNode(rl), s.demo ? counter(ll) : null, counter(rl), !!s.lit, tr)}
        {warm && left > 0 && (
          <g>
            {Array.from({ length: left }).map((_, k) => { const q = pileAt(k); return <g key={"pl" + k}>{wbSlab(q.x, q.y)}</g>; })}
            <rect x={WB_PILE.x - (ind ? 62 : 46)} y={pileTop - 52} width={ind ? 124 : 92} height={46} rx={12} fill="#FFFFFF" stroke={ink} strokeWidth={2} />
            <text x={WB_PILE.x} y={pileTop - 18} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{"100 " + tx("g")}</text>
            {/* the tap target and its ring take the chip's width (wider in hi and gu), so the ring always encloses it */}
            {hit("pile", WB_PILE.x - (ind ? 64 : 50), pileTop - 56, ind ? 128 : 100, WB_PILE.base - pileTop + 60, tx("100 gram weights"))}
            {showInvite && stepOn === "pile" && inv(WB_PILE.x - (ind ? 64 : 50), pileTop - 56, ind ? 128 : 100, WB_PILE.base - pileTop + 60)}
          </g>
        )}
        {!warm && (
          <g>
            {s.pass < 2 && (
              <g style={{ transform: `translateY(${s.pass ? L.cv.y + L.cv.h / 2 - (L.card.y + L.card.h / 2) : 0}px)`, transition: glide } as any}>
                {wbCard(L.card, cardText(), C, T.speech, cardStr())}
              </g>
            )}
            {wbConv(L.cv, !!s.lit, C)}
            {s.pass >= 2 && wbCard(L.out, wbAmt(null, it.answer, tx, ink), C, T.speech, wbAmtStr(null, it.answer, tx))}
          </g>
        )}
        {warm && wbConv(L.cv, false, C)}
      </g>
    );
  };

  /* phases 3 and 4: the slots, the card, the converter and the place board */
  const slotBox = (r: any, v: any, unit: string, vInk: string) => {
    const uw = lang === "en" ? (unit === "kg" ? 44 : 22) : (unit === "kg" ? 74 : 46);
    return (
      <g>
        <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={16} fill="#FFFFFF" stroke={v === null ? C.dim : ink} strokeWidth={3} strokeDasharray={v === null ? "10 8" : undefined} />
        {v !== null ? <text x={r.x + r.w - 16 - uw - 10} y={r.y + r.h / 2 + 20} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={vInk}>{indian(v)}</text> : null}
        <text x={r.x + r.w - 16} y={r.y + r.h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={ink}>{tx(unit)}</text>
      </g>
    );
  };
  const splitBench = () => {
    const L = WB_L3, ans = it.answer || [null, null], out = s.pass >= 2;
    const dy = s.pass ? L.cv.y + L.cv.h / 2 - (L.card.y + L.card.h / 2) : 0;
    return (
      <g>
        {slotBox(L.kgs, out ? ans[0] : null, "kg", wbKInk())}
        {slotBox(L.gs, out ? ans[1] : null, "g", wbGInk())}
        {s.pass < 2 && s.moving !== "card" && (
          <g style={{ transform: `translateY(${dy}px)`, transition: glide } as any}>{wbCard(L.card, cardText(), C, T.xl, cardStr())}</g>
        )}
        {wbConv(L.cv, !!s.lit, C)}
        {/* the correction: the child's kilograms and grams as weights (left) beside the card's own grams (right); a heap stops
            at the top of the area with "and more", and its label shrinks to stay inside it */}
        {s.demo && s.demo.mine && (
          <g pointerEvents="none">
            <g>{wbPile({ kg: s.demo.mine[0], g: s.demo.mine[1] }, 125, 430, tx, 8)}</g>
            {(() => { const ls = wbAmtStr(s.demo.mine[0], s.demo.mine[1], tx), fs = wbFitFs(ls, T.label, 236), hw = (wbEm(ls) * fs) / 2;
              /* at the 28 floor a long label slides right, never left of the area's edge */
              return <text x={Math.max(125, 6 + hw)} y={476} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{wbAmt(s.demo.mine[0], s.demo.mine[1], tx, ink)}</text>; })()}
            <g>{wbPile({ g: it.grams }, 775, 430, tx, 8)}</g>
            {(() => { const ls = wbAmtStr(null, it.grams, tx), fs = wbFitFs(ls, T.label, 236), hw = (wbEm(ls) * fs) / 2;
              return <text x={Math.min(775, 894 - hw)} y={476} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{wbAmt(null, it.grams, tx, ink)}</text>; })()}
          </g>
        )}
        {warm && !s.pass && hit("card", L.card.x, L.card.y, L.card.w, L.card.h, tx("weight card"))}
        {showInvite && stepOn === "card" && inv(L.card.x, L.card.y, L.card.w, L.card.h)}
      </g>
    );
  };
  const placeBench = () => {
    const L = WB_L4, fix = it.kind === "fix", out = s.pass >= 2;
    const dy = s.pass ? L.cv.y + L.cv.h / 2 - (L.card.y + L.card.h / 2) : 0;
    /* the boxes: five places, and up to seven while a longer number is typed (the lakh places open on the left, so the
       whole typed number is always on the board) */
    const typedD = String(typed ?? "").replace(/\D/g, "").slice(0, 7);
    const nb = !fix && !out && asking ? Math.max(5, typedD.length) : 5;
    const cw = nb > 5 ? 104 : L.bw, cx0 = Math.round((WB_PW - (nb * cw + (nb - 1) * L.gap)) / 2);
    const cellAt = (i: number) => ({ x: cx0 + i * (cw + L.gap), y: L.by, w: cw, h: L.bh });
    const heads = WB_HEADS7.slice(7 - nb);
    /* hi and gu: a taller heading band and a lower baseline, so a matra never touches the box's outline */
    const band = ind ? 54 : 48, headY = ind ? 42 : 36;
    /* the boxes' digits: { ch, fill } or null */
    const cells: any[] = Array.from({ length: nb }).map(() => null);
    if (fix) {
      const d = String(it.grams).padStart(5, " ");
      for (let i = 0; i < 5; i++) if (d[i] !== " ") cells[i] = { ch: d[i], fill: !out ? ink : i < 2 ? wbKInk() : i === 2 ? WB_ZERO : wbGInk() };
    } else if (out) {
      const kgS = String(it.kg), gS = ("00" + it.g).slice(-3), d = (kgS + gS).padStart(5, " ");
      const lead = gS.length - gS.replace(/^0+/, "").length;
      for (let i = 0; i < 5; i++) {
        if (d[i] === " ") continue;
        if (i < 2) cells[i] = { ch: d[i], fill: wbKInk() };
        else if (i - 2 < lead) { if (s.zd || s.zeros[i]) cells[i] = { ch: "0", fill: WB_ZERO }; }
        else cells[i] = { ch: d[i], fill: wbGInk() };
      }
    } else if (asking) {
      const d = typedD.padStart(nb, " ");
      for (let i = 0; i < nb; i++) if (d[i] !== " ") cells[i] = { ch: d[i], fill: ink };
    }
    const brackets = out || (fix && done);
    const bracket = (i0: number, i1: number, label: string, fill: string) => {
      const a = cellBox(i0).x + 6, b = cellBox(i1).x + L.bw - 6, y = L.by + L.bh + 12;
      return (
        <g key={"br" + label}>
          <path d={`M ${a} ${y} V ${y + 12} H ${b} V ${y}`} fill="none" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
          <text x={(a + b) / 2} y={y + 52} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={fill}>{tx(label)}</text>
        </g>
      );
    };
    const waitZero = (k: number) => warm && s.pass >= 2 && !s.zeros[k];
    return (
      <g>
        {fix ? (
          <g>
            {slotBox(L.kgs, s.zd ? it.answer[0] : null, "kg", wbKInk())}
            {slotBox(L.gs, s.zd ? it.answer[1] : null, "g", wbGInk())}
          </g>
        ) : s.pass < 2 && s.moving !== "card" && (
          <g style={{ transform: `translateY(${dy}px)`, transition: glide } as any}>{wbCard(L.card, cardText(), C, T.speech, cardStr())}</g>
        )}
        {wbConv(L.cv, !!s.lit, C)}
        {heads.map((hd, i) => {
          const b = cellAt(i), c = cells[i];
          return (
            <g key={"cell" + i}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={14} fill="#FFFFFF" stroke={ink} strokeWidth={c ? 3 : 2.5} strokeDasharray={c ? undefined : "9 7"} />
              <path d={`M ${b.x} ${b.y + band} H ${b.x + b.w}`} stroke={ink} strokeWidth={2} />
              <text x={b.x + b.w / 2} y={b.y + headY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{tx(hd)}</text>
              {c ? <text x={b.x + b.w / 2} y={b.y + 114} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={c.fill}>{c.ch}</text> : null}
            </g>
          );
        })}
        {brackets && bracket(0, 1, "kg", wbKInk())}
        {brackets && bracket(2, 4, "g", wbGInk())}
        {/* the correction's second board: the child's own number, laid left of the converter and kept beside the right one */}
        {s.demo && s.demo.mineAmt && (() => {
          /* as many places as the child's number has (5 to 7), headings at 32 in a band tall enough for a matra */
          const M = L.mine, mineS = String(s.demo.mine || ""), mn = Math.max(5, Math.min(7, mineS.length)), am = s.demo.mineAmt;
          /* six or seven places take the whole room left of the converter (x 4 to 530), the gaps closed up */
          /* the two-part headings (TL, TTh) get wider boxes, so their 32 type never meets the outline */
          const mhds = WB_HEADS7.slice(7 - mn), mg = mn > 5 ? 4 : M.gap, mx0 = mn > 5 ? 4 : M.x, d = mineS.padStart(mn, " ");
          const wideH = (hd: string) => hd === "TL" || hd === "TTh", nwide = mhds.filter(wideH).length;
          const narrowW = mn > 5 ? Math.floor((526 - nwide * 92 - (mn - 1) * mg) / (mn - nwide)) : 80;
          const mws = mhds.map((hd) => (mn > 5 && wideH(hd) ? 92 : narrowW));
          const mxs = mws.map((_, i) => mx0 + mws.slice(0, i).reduce((a, b) => a + b + mg, 0));
          const mband = ind ? 50 : 44, mhead = ind ? 39 : 33, tw = mws.reduce((a, b) => a + b, 0) + (mn - 1) * mg;
          return (
            <g pointerEvents="none">
              {mhds.map((hd, i) => {
                const x = mxs[i], mw = mws[i];
                return (
                  <g key={"mine" + i}>
                    <rect x={x} y={M.y} width={mw} height={M.bh} rx={10} fill="#FFFFFF" stroke={ink} strokeWidth={2.5} />
                    <path d={`M ${x} ${M.y + mband} H ${x + mw}`} stroke={ink} strokeWidth={2} />
                    <text x={x + mw / 2} y={M.y + mhead} textAnchor="middle" fontSize={wbFitFs(tx(hd), T.label, mw - 12)} fontWeight={700} fill={ink}>{tx(hd)}</text>
                    {d[i] !== " " ? <text x={x + mw / 2} y={M.y + M.bh - 14} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink}>{d[i]}</text> : null}
                  </g>
                );
              })}
              <text x={mx0 + tw / 2} y={M.y + M.bh + 36} textAnchor="middle" fontSize={wbFitFs(wbAmtStr(am[0], am[1], tx), T.label, tw)} fontWeight={700} fill={ink}>{wbAmt(am[0], am[1], tx, ink)}</text>
            </g>
          );
        })()}
        {warm && !s.pass && hit("card", L.card.x, L.card.y, L.card.w, L.card.h, tx("weight card"))}
        {waitZero(2) && hit("zero-h", cellBox(2).x, cellBox(2).y, L.bw, L.bh, tx("hundreds box"))}
        {waitZero(3) && hit("zero-t", cellBox(3).x, cellBox(3).y, L.bw, L.bh, tx("tens box"))}
        {showInvite && stepOn === "card" && inv(L.card.x, L.card.y, L.card.w, L.card.h)}
        {showInvite && (stepOn === "zero-h" || stepOn === "zero-t") && (() => { const b = cellBox(stepOn === "zero-h" ? 2 : 3); return inv(b.x, b.y, b.w, b.h, 14); })()}
      </g>
    );
  };

  return (
    <g>
      {/* keyOnly: no runs zone; nothing under box.key; the question is in the bubble only */}
      <g transform={`translate(${ox},${WB_OY})`}>
        {free || n === 1 ? bench() : n === 2 ? levelBench() : n === 3 ? splitBench() : placeBench()}
      </g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (`it` is the question, r24) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L) return null;
  WB_TXT.thin = lang === "gu";
  const q = it || L.it || (n && PHASES[n - 1] ? PHASES[n - 1].items[L.item] : null) || {};
  const fs = Math.min(T.label, Math.round(h * 0.42));
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  const sc = Math.max(0.2, Math.min(0.4, (h - 14) / 140));
  if (q.kind === "sort" || q.kind === "unit") {
    const us = q.kind === "unit" ? ["g"] : String(q.answer).split(",");
    const step = w / q.things.length;
    return (
      <g>
        {frame}
        {q.things.map((t: string, k: number) => (
          <g key={t}>
            <g transform={`translate(${k * step + 34},${h - 8}) scale(${sc})`}>{wbThing(t)}</g>
            <text x={k * step + 66} y={h / 2 + fs * 0.36} fontSize={fs} fontWeight={700} fill={us[k] === "kg" ? wbKInk() : wbGInk()}>
              {q.kind === "unit" ? "20 " + tx("g") : tx(us[k] === "kg" ? "kg" : "g")}
            </text>
          </g>
        ))}
      </g>
    );
  }
  /* the child's answer as the tool's own objects: a small weight (a blue kilogram weight with its handle, or a green gram
     bar) beside a white weight card with the answer written on it; a long kilograms-and-grams answer takes two lines */
  if (q.parts) {
    /* kilograms and grams: the answer AS the tool's weights, a blue kilogram weight (its handle) carrying the kilograms
       and a green gram block carrying the grams, the same code as on the bench (a row is too short for both unit words) */
    const [a, b] = slotPartsOf(L.value ?? q.answer, 2).map((x: string) => Number(x));
    /* the weights sit low enough that the kilogram's handle clears the thumbnail's top border */
    const ww = 70, wh = Math.round(ww * WB_AR), base = Math.min(h - 3, Math.round(h / 2 + wh / 2 + 9)), gEdge = shade(CONTENT.one, 0.25);
    const lab = (s: string, x: number, y: number, edge: string) => <text x={x} y={y} textAnchor="middle" fontSize={wbFitFs(s, T.label, ww - 8)} fontWeight={700} fill="#FFFFFF" stroke={edge} strokeWidth={WB_TXT.thin ? 1.2 : 3} paintOrder="stroke">{s}</text>;
    return (
      <g>
        {frame}
        {wbKgW(w * 0.3, base, "", ww, T.label, false)}
        {lab(indian(a), w * 0.3, base - wh / 2 + 11, wbKInk())}
        {wbBlock(w * 0.7 - ww / 2, base - wh, ww, wh, "gOne", CONTENT.one, false)}
        {lab(indian(b), w * 0.7, base - wh / 2 + 11, gEdge)}
      </g>
    );
  }
  /* grams alone: a green gram block beside a white weight card with the grams written on it */
  const gv = leadNumber(L.value) ?? q.answer, cardX = 60, cardW = w - cardX - 6, str = wbAmtStr(null, gv, tx);
  const fsT = wbFitFs(str, T.label, cardW - 12);
  return (
    <g>
      {frame}
      {wbBlock(10, h / 2 - 14, 44, 28, "gOne", CONTENT.one, false)}
      <rect x={cardX} y={6} width={cardW} height={h - 12} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <text x={cardX + cardW / 2} y={h / 2 + fsT * 0.36} textAnchor="middle" fontSize={fsT} fontWeight={700} fill={C.ink}>{wbAmt(null, gv, tx, C.ink)}</text>
    </g>
  );
}

function WeighingBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, format, solve, answer, check, fitHost: () => null,
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

export default WeighingBench;
