/* ═══ M1.S2.T4.C15.2D1 · length_columns · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The lesson is action-driven: nothing moves on unless the
   child acts. THE NEW LOOK (keyOnly, navDots, bigPad, nextKey; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md
   §15-§16): no question bar, the question lives only in the bubble, every act is performed on screen
   (api.act). NO imports in this file; only the five host hooks. Edit, never rewrite. */

const TOOL_ID = "length_columns";
const MEDIA_ID = "M1.S2.T4.C15.2D1";
const TOOL_NAME = "Length Columns";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["Two columns and a joining sign. How many boxes does the smaller unit take?"];
/* the whole-tool line (no longer shown from r44; kept for the sidecar) */
const FINISH_LINE = "Every smaller unit in its own places, and every carry or break made by the number that joins the pair.";
/* printed when the child opens Free play: exactly what the free branch of Work offers */
const FREE_LINE = "Free play: pick the units and plus or minus, tap New, then work the columns.";

/* THE START PAGE (docs/LAYOUT.md §1c): a length on its card and an empty km | m frame with no boxes drawn, so the
   picture never answers its own hook */
const START_HOOK = "How many boxes does the smaller unit take?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  return (
    <g>
      <rect x={40} y={95} width={500} height={150} rx={24} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={3} />
      <text x={290} y={196} textAnchor="middle" fontSize={lcFit("6 " + tx("km") + " 38 " + tx("m"), T.display, 470)} fontWeight={700}>
        <tspan fill={LC_INK_BIG}>{"6 " + tx("km")}</tspan>
        <tspan fill={LC_INK_SMALL}>{" 38 " + tx("m")}</tspan>
      </text>
      <path d="M 572 170 L 652 170" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <path d="M 632 150 L 656 170 L 632 190" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={690} y={20} width={480} height={300} rx={24} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} />
      <text x={820} y={96} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={LC_INK_BIG}>{tx("km")}</text>
      <text x={1040} y={96} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={LC_INK_SMALL}>{tx("m")}</text>
      <line x1={930} y1={40} x2={930} y2={300} stroke={C.ink} strokeWidth={5} />
      <line x1={712} y1={124} x2={1148} y2={124} stroke={C.rule} strokeWidth={3} />
      <text x={820} y={232} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={LC_INK_BIG}>6</text>
      <text x={1040} y={232} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>?</text>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): keyed by the English byte for byte. Terms: मात्रक / એકમ (unit), स्तंभ / સ્તંભ
   (column), खाना / ખાનું (box), हासिल / વદી (carry), संबंध चिह्न / જોડાણ ચિહ્ન (the joining sign, the same in every line),
   इकाई दहाई सैकड़ा / એકમ દશક શતક, किमी मी सेमी मिमी / કિમી મી સેમી મિમી; a key is named by its own label (जोड़ो बटन). */
const TR: any = {
  hi: {
    "Length Columns": "लंबाई के स्तंभ",
    "Two columns and a joining sign. How many boxes does the smaller unit take?": "दो स्तंभ और एक संबंध चिह्न। छोटा मात्रक कितने खाने लेता है?",
    "Every smaller unit in its own places, and every carry or break made by the number that joins the pair.": "हर छोटा मात्रक अपने खानों में। हर हासिल और हर तोड़ मिलाने वाली संख्या से।",
    "Free play: pick the units and plus or minus, tap New, then work the columns.": "मुक्त खेल: मात्रक और जोड़ या घटाव चुनो, नया दबाओ, फिर स्तंभ हल करो।",
    "How many boxes does the smaller unit take?": "छोटा मात्रक कितने खाने लेता है?",
    /* phase 1 */
    "Lining up the units": "मात्रकों को सीध में रखना",
    "The metres column has three boxes. How is a two-digit number of metres written?": "मीटर वाले स्तंभ में तीन खाने हैं। दो अंकों वाले मीटर कैसे लिखे जाते हैं?",
    "Tap under km to write the 6 km of this card in its column.": "कार्ड के 6 किमी को उसके स्तंभ में लिखने के लिए किमी के नीचे दबाओ।",
    "The km column is on the left.": "किमी का स्तंभ बाईं ओर है।",
    "38 m ends in the ones place, so tap the ones box.": "38 मी इकाई के स्थान पर खत्म होता है, इसलिए इकाई का खाना दबाओ।",
    "It is the last of the three metres boxes.": "यह मीटर के तीन खानों में आखिरी है।",
    "Tap the first metres box to fill its empty place with a zero.": "मीटर का पहला खाना दबाओ और उसका खाली स्थान शून्य से भरो।",
    "Only one metres box is still empty.": "मीटर का बस एक खाना अभी खाली है।",
    "Which places does your number fill, counting from the ones box?": "इकाई के खाने से गिनकर, तुम्हारी संख्या कौन से स्थान भरती है?",
    "Fill the boxes so the last digit sits in the ones box, with zeros in front.": "खाने ऐसे भरो कि आखिरी अंक इकाई के खाने में आए और आगे शून्य हों।",
    "Each unit has its own column, and beside km the metres take three places.": "हर मात्रक का अपना स्तंभ है, और किमी के साथ मीटर तीन स्थान लेते हैं।",
    "You learned: beside kilometres the metres always take three places.": "तुमने सीखा: किलोमीटर के साथ मीटर हमेशा तीन स्थान लेते हैं।",
    "Tap the box for the 9 of 52 km 9 m, then add 17 km 640 m.": "52 किमी 9 मी के 9 का खाना दबाओ, फिर 17 किमी 640 मी जोड़ो।",
    "Add 52 km 9 m and 17 km 640 m": "52 किमी 9 मी, 17 किमी 640 मी जोड़ो",
    "Nine metres is less than ten, so which metres box holds it?": "नौ मीटर दस से कम है, तो यह मीटर के किस खाने में आएगा?",
    "Add the metres column first, then the kilometres.": "पहले मीटर का स्तंभ जोड़ो, फिर किलोमीटर।",
    "Read each metres box down: the hundreds, the tens, then the ones.": "मीटर के हर खाने को नीचे तक पढ़ो: सैकड़ा, दहाई, फिर इकाई।",
    "Right, the 9 sits in the ones box, so the sum is 69 km 649 m.": "सही, 9 इकाई के खाने में है, इसलिए योग 69 किमी 649 मी है।",
    "31 km 58 m is written in columns, so what goes in the metres boxes?": "31 किमी 58 मी स्तंभों में लिखा है, तो मीटर के खानों में क्या जाएगा?",
    "Metres boxes for 31 km 58 m": "मीटर के खाने: 31 किमी 58 मी",
    "Read your boxes aloud: do they say 58 metres?": "अपने खाने ज़ोर से पढ़ो: क्या वे 58 मीटर कहते हैं?",
    "Yes, 058 keeps 58 m in the tens and ones boxes.": "हाँ, 058 में 58 मी दहाई और इकाई के खानों में रहता है।",
    "In columns of m and cm, how is 7 cm written in the boxes?": "मी और सेमी के स्तंभों में, खानों में 7 सेमी कैसे लिखा जाता है?",
    "Centimetres boxes for 7 cm": "सेमी के खाने: 7 सेमी",
    "Is 7 cm a number of tens or of ones?": "7 सेमी दहाई की संख्या है या इकाई की?",
    "07 it is: a zero fills the tens box and the 7 stays in the ones box.": "07 ही है: दहाई का खाना शून्य से भरता है और 7 इकाई के खाने में रहता है।",
    /* phase 2 */
    "Carrying a whole unit": "एक पूरे मात्रक का हासिल",
    "The metres make more than a thousand. What is written, and what is carried?": "मीटर एक हज़ार से ज़्यादा हो गए। क्या लिखा जाएगा, और क्या हासिल जाएगा?",
    "Tap Add to add the metres column first.": "पहले मीटर का स्तंभ जोड़ने के लिए जोड़ो बटन दबाओ।",
    "Start with the key at the bottom.": "नीचे वाले बटन से शुरू करो।",
    "The joining sign says 1,000 m, and 1,100 m is more, so tap Carry.": "संबंध चिह्न 1,000 मी कहता है, और 1,100 मी ज़्यादा है, इसलिए हासिल बटन दबाओ।",
    "Carry lifts 1,000 m over the km column.": "हासिल 1,000 मी को किमी स्तंभ के ऊपर ले जाता है।",
    "Tap Add again to add the kilometres and the carried one.": "किमी और हासिल वाला एक जोड़ने के लिए फिर से जोड़ो बटन दबाओ।",
    "The chip over the km column counts too.": "किमी स्तंभ के ऊपर वाली चिप भी गिनी जाती है।",
    "How many times does the big number on the joining sign fit in the sum?": "संबंध चिह्न की बड़ी संख्या योग में कितनी बार आती है?",
    "Carry one larger unit for each, and write only what is left in the boxes.": "हर एक के लिए एक बड़ा मात्रक हासिल लो, और खानों में केवल बचा हुआ लिखो।",
    "Add the smaller unit first and carry one kilometre for each full 1,000 m.": "पहले छोटा मात्रक जोड़ो और हर पूरे 1,000 मी पर एक किलोमीटर हासिल लो।",
    "You learned: carry one kilometre for each full thousand metres.": "तुमने सीखा: हर पूरे हज़ार मीटर पर एक किलोमीटर हासिल जाता है।",
    "Add 45 km 738 m and 28 km 564 m.": "45 किमी 738 मी और 28 किमी 564 मी जोड़ो।",
    "Add 45 km 738 m and 28 km 564 m": "45 किमी 738 मी, 28 किमी 564 मी जोड़ो",
    "Do all of those metres fit in three boxes?": "क्या वे सारे मीटर तीन खानों में आते हैं?",
    "Yes, 1,302 m makes 1 km 302 m, so the sum is 74 km 302 m.": "हाँ, 1,302 मी से 1 किमी 302 मी बनता है, इसलिए योग 74 किमी 302 मी है।",
    "Now add 64 m 58 cm and 29 m 73 cm.": "अब 64 मी 58 सेमी और 29 मी 73 सेमी जोड़ो।",
    "Add 64 m 58 cm and 29 m 73 cm": "64 मी 58 सेमी, 29 मी 73 सेमी जोड़ो",
    "Do the centimetres make a hundred or more?": "क्या सेंटीमीटर सौ या उससे ज़्यादा हो जाते हैं?",
    "Right, 131 cm gives 1 m to carry, so it is 94 m 31 cm.": "सही, 131 सेमी से 1 मी हासिल आता है, इसलिए उत्तर 94 मी 31 सेमी है।",
    "Three children ran 3 km 480 m, 2 km 365 m and 4 km 290 m: how far together?": "तीन बच्चे 3 किमी 480 मी, 2 किमी 365 मी और 4 किमी 290 मी दौड़े: कुल कितना?",
    "The three runs together": "तीनों दौड़ मिलाकर",
    "Did the carried kilometre go into the kilometres column?": "क्या हासिल वाला किलोमीटर, किलोमीटर के स्तंभ में जुड़ा?",
    "Together they ran 10 km 135 m, since 1,135 m makes 1 km 135 m.": "वे मिलकर 10 किमी 135 मी दौड़े, क्योंकि 1,135 मी से 1 किमी 135 मी बनता है।",
    /* phase 3 */
    "Borrowing a whole unit": "एक पूरा मात्रक उधार लेना",
    "Too few centimetres on top. Break one metre. How many centimetres does it give?": "ऊपर सेंटीमीटर बहुत कम हैं। एक मीटर तोड़ो। उससे कितने सेंटीमीटर मिलते हैं?",
    "15 cm is less than 40 cm, so tap Break to take one metre from 6 m.": "15 सेमी, 40 सेमी से कम है, इसलिए 6 मी से एक मीटर लेने के लिए तोड़ो बटन दबाओ।",
    "The Break key is at the bottom.": "तोड़ो बटन नीचे है।",
    "Tap Split to cut that metre into centimetres.": "उस मीटर को सेंटीमीटर में काटने के लिए काटो बटन दबाओ।",
    "Split is the key that said Break.": "काटो वही बटन है जिस पर तोड़ो लिखा था।",
    "Tap Take away to work the centimetres first, then the metres.": "पहले सेंटीमीटर, फिर मीटर हल करने के लिए घटाओ बटन दबाओ।",
    "Take away is the key that said Split.": "घटाओ वही बटन है जिस पर काटो लिखा था।",
    "Break one larger unit, and its pieces join the smaller number on top.": "एक बड़ा मात्रक तोड़ो, उसके टुकड़े ऊपर की छोटी संख्या में मिल जाते हैं।",
    "The larger number on top is now one less, so take away each column.": "ऊपर की बड़ी संख्या अब एक कम है, इसलिए हर स्तंभ घटाओ।",
    "When the centimetres on top are too few, break one metre into 100 cm.": "जब ऊपर सेंटीमीटर कम हों, तो एक मीटर को 100 सेमी में तोड़ो।",
    "You learned: break one metre into a hundred centimetres to take away.": "तुमने सीखा: घटाने के लिए एक मीटर को सौ सेंटीमीटर में तोड़ो।",
    "Take 18 m 64 cm from 52 m 27 cm.": "52 मी 27 सेमी में से 18 मी 64 सेमी घटाओ।",
    "From 52 m 27 cm take 18 m 64 cm": "ऊपर से नीचे वाली लंबाई घटाओ",
    "Which number is on top in the centimetres column?": "सेंटीमीटर वाले स्तंभ में ऊपर कौन सी संख्या है?",
    "Yes, 127 cm take away 64 cm leaves 63 cm, so it is 33 m 63 cm.": "हाँ, 127 सेमी में से 64 सेमी घटाकर 63 सेमी बचे, तो उत्तर 33 मी 63 सेमी है।",
    "How much longer is a 5 m 8 cm jump than 4 m 76 cm, in m and cm?": "5 मी 8 सेमी की कूद 4 मी 76 सेमी से कितनी लंबी है, मी और सेमी में?",
    "How much longer in m and cm?": "मी और सेमी में कितना लंबा?",
    "Can 76 cm come away from 8 cm?": "क्या 8 सेमी में से 76 सेमी घट सकते हैं?",
    "Right, 108 cm take away 76 cm is 32 cm, with no metres left.": "सही, 108 सेमी में से 76 सेमी घटाकर 32 सेमी, और कोई मीटर नहीं बचा।",
    "Now take 16 km 875 m from 40 km 230 m.": "अब 40 किमी 230 मी में से 16 किमी 875 मी घटाओ।",
    "What is left?": "कितना बचा?",
    "Was a kilometre taken from the top length?": "क्या ऊपर की लंबाई से एक किलोमीटर लिया गया?",
    "Well done, 1,230 m take away 875 m is 355 m, so 23 km 355 m is left.": "शाबाश, 1,230 मी में से 875 मी घटाकर 355 मी, तो 23 किमी 355 मी बचा।",
    /* phase 4 */
    "The number depends on the units": "संख्या मात्रकों पर निर्भर है",
    "One centimetre breaks into how many millimetres? Check the joining sign.": "एक सेंटीमीटर टूटकर कितने मिलीमीटर बनता है? संबंध चिह्न देखो।",
    "These lengths are in cm and mm, so tap cm and mm on the switch.": "ये लंबाइयाँ सेमी और मिमी में हैं, इसलिए स्विच पर सेमी, मिमी दबाओ।",
    "The switch is the row of units at the top.": "स्विच ऊपर मात्रकों वाली पंक्ति है।",
    "1 mm is less than 2 mm, so tap Break to take one centimetre.": "1 मिमी, 2 मिमी से कम है, इसलिए एक सेंटीमीटर लेने के लिए तोड़ो बटन दबाओ।",
    "Break takes from the top centimetres.": "तोड़ो ऊपर के सेंटीमीटर में से लेता है।",
    "Tap Split and count the millimetres that one centimetre gives.": "काटो बटन दबाओ और गिनो कि एक सेंटीमीटर से कितने मिलीमीटर मिलते हैं।",
    "Tap Take away to finish both columns.": "दोनों स्तंभ पूरे करने के लिए घटाओ बटन दबाओ।",
    "Take away is the key at the bottom.": "घटाओ बटन नीचे है।",
    "What does the joining sign say for these two units?": "इन दो मात्रकों के लिए संबंध चिह्न क्या कहता है?",
    "Work the millimetres first; one centimetre is that many millimetres.": "पहले मिलीमीटर हल करो, एक सेंटीमीटर उतने ही मिलीमीटर का होता है।",
    "Carry or break by the number that joins the two units: 10, 100 or 1,000.": "दोनों मात्रकों को मिलाने वाली संख्या से हासिल लो या तोड़ो: 10, 100 या 1,000।",
    "You learned: carry or break by the number that joins the two units.": "तुमने सीखा: मिलाने वाली संख्या से हासिल लो या तोड़ो।",
    "Take 23 cm 8 mm from 41 cm 3 mm.": "41 सेमी 3 मिमी में से 23 सेमी 8 मिमी घटाओ।",
    "From 41 cm 3 mm take 23 cm 8 mm": "ऊपर से नीचे वाली लंबाई घटाओ",
    "Which two units are in the frame?": "ढाँचे में कौन से दो मात्रक हैं?",
    "Yes, 13 mm take away 8 mm is 5 mm, so it is 17 cm 5 mm.": "हाँ, 13 मिमी में से 8 मिमी घटाकर 5 मिमी, तो उत्तर 17 सेमी 5 मिमी है।",
    "Now add 36 cm 7 mm and 18 cm 6 mm.": "अब 36 सेमी 7 मिमी और 18 सेमी 6 मिमी जोड़ो।",
    "Add 36 cm 7 mm and 18 cm 6 mm": "36 सेमी 7 मिमी, 18 सेमी 6 मिमी जोड़ो",
    "Do the millimetres make ten or more?": "क्या मिलीमीटर दस या उससे ज़्यादा हो जाते हैं?",
    "Right, 13 mm is 1 cm 3 mm, so the sum is 55 cm 3 mm.": "सही, 13 मिमी यानी 1 सेमी 3 मिमी, इसलिए योग 55 सेमी 3 मिमी है।",
    "A child broke 1 cm into 100 mm: do 15 cm 2 mm take away 8 cm 9 mm correctly.": "किसी ने 1 सेमी के 100 मिमी किए: 15 सेमी 2 मिमी में से 8 सेमी 9 मिमी सही घटाओ।",
    "From 15 cm 2 mm take 8 cm 9 mm": "ऊपर से नीचे वाली लंबाई घटाओ",
    "Does one centimetre really give a hundred millimetres?": "क्या एक सेंटीमीटर से सच में सौ मिलीमीटर मिलते हैं?",
    "Every box needs a number, even a zero.": "हर खाने में एक संख्या चाहिए, शून्य भी।",
    "1 cm gives only 10 mm, so the right answer is 6 cm 3 mm.": "1 सेमी से केवल 10 मिमी मिलते हैं, इसलिए सही उत्तर 6 सेमी 3 मिमी है।",
    /* the words the picture draws, the slot's box labels and the keys */
    "km, m": "किमी, मी", "m, cm": "मी, सेमी", "cm, mm": "सेमी, मिमी",
    "km": "किमी", "m": "मी", "cm": "सेमी", "mm": "मिमी",
    "Add": "जोड़ो", "Carry": "हासिल", "Break": "तोड़ो", "Split": "काटो", "Take away": "घटाओ", "New": "नया",
  },
  gu: {
    "Length Columns": "લંબાઈના સ્તંભ",
    "Two columns and a joining sign. How many boxes does the smaller unit take?": "બે સ્તંભ અને એક જોડાણ ચિહ્ન. નાનો એકમ કેટલાં ખાનાં લે છે?",
    "Every smaller unit in its own places, and every carry or break made by the number that joins the pair.": "દરેક નાનો એકમ પોતાનાં ખાનાંમાં. દરેક વદી અને દરેક તોડ જોડતી સંખ્યાથી.",
    "Free play: pick the units and plus or minus, tap New, then work the columns.": "મુક્ત રમત: એકમ અને સરવાળો કે બાદબાકી પસંદ કરો, નવું દબાવો, પછી સ્તંભ ઉકેલો.",
    "How many boxes does the smaller unit take?": "નાનો એકમ કેટલાં ખાનાં લે છે?",
    /* phase 1 */
    "Lining up the units": "એકમોને હારમાં ગોઠવવા",
    "The metres column has three boxes. How is a two-digit number of metres written?": "મીટરના સ્તંભમાં ત્રણ ખાનાં છે. બે અંકના મીટર કેવી રીતે લખાય?",
    "Tap under km to write the 6 km of this card in its column.": "કાર્ડના 6 કિમી તેના સ્તંભમાં લખવા કિમીની નીચે દબાવો.",
    "The km column is on the left.": "કિમીનો સ્તંભ ડાબી બાજુ છે.",
    "38 m ends in the ones place, so tap the ones box.": "38 મી એકમના સ્થાને પૂરું થાય છે, તેથી એકમનું ખાનું દબાવો.",
    "It is the last of the three metres boxes.": "તે મીટરનાં ત્રણ ખાનાંમાં છેલ્લું છે.",
    "Tap the first metres box to fill its empty place with a zero.": "મીટરનું પહેલું ખાનું દબાવો અને તેનું ખાલી સ્થાન શૂન્યથી ભરો.",
    "Only one metres box is still empty.": "મીટરનું ફક્ત એક ખાનું હજી ખાલી છે.",
    "Which places does your number fill, counting from the ones box?": "એકમના ખાનાથી ગણીને, તમારી સંખ્યા કયાં સ્થાન ભરે છે?",
    "Fill the boxes so the last digit sits in the ones box, with zeros in front.": "ખાનાં એવી રીતે ભરો કે છેલ્લો અંક એકમના ખાનામાં આવે અને આગળ શૂન્ય હોય.",
    "Each unit has its own column, and beside km the metres take three places.": "દરેક એકમનો પોતાનો સ્તંભ છે, અને કિમીની સાથે મીટર ત્રણ સ્થાન લે છે.",
    "You learned: beside kilometres the metres always take three places.": "તમે શીખ્યા: કિલોમીટરની સાથે મીટર હંમેશાં ત્રણ સ્થાન લે છે.",
    "Tap the box for the 9 of 52 km 9 m, then add 17 km 640 m.": "52 કિમી 9 મીના 9 માટેનું ખાનું દબાવો, પછી 17 કિમી 640 મી ઉમેરો.",
    "Add 52 km 9 m and 17 km 640 m": "52 કિમી 9 મી, 17 કિમી 640 મી ઉમેરો",
    "Nine metres is less than ten, so which metres box holds it?": "નવ મીટર દસ કરતાં ઓછા છે, તો તે મીટરના કયા ખાનામાં આવે?",
    "Add the metres column first, then the kilometres.": "પહેલાં મીટરનો સ્તંભ ઉમેરો, પછી કિલોમીટર.",
    "Read each metres box down: the hundreds, the tens, then the ones.": "મીટરના દરેક ખાનાને નીચે સુધી વાંચો: શતક, દશક, પછી એકમ.",
    "Right, the 9 sits in the ones box, so the sum is 69 km 649 m.": "સાચું, 9 એકમના ખાનામાં છે, તેથી સરવાળો 69 કિમી 649 મી છે.",
    "31 km 58 m is written in columns, so what goes in the metres boxes?": "31 કિમી 58 મી સ્તંભોમાં લખ્યું છે, તો મીટરનાં ખાનાંમાં શું આવશે?",
    "Metres boxes for 31 km 58 m": "મીટરનાં ખાનાં: 31 કિમી 58 મી",
    "Read your boxes aloud: do they say 58 metres?": "તમારાં ખાનાં મોટેથી વાંચો: શું તે 58 મીટર કહે છે?",
    "Yes, 058 keeps 58 m in the tens and ones boxes.": "હા, 058માં 58 મી દશક અને એકમનાં ખાનાંમાં રહે છે.",
    "In columns of m and cm, how is 7 cm written in the boxes?": "મી અને સેમીના સ્તંભોમાં, ખાનાંમાં 7 સેમી કેવી રીતે લખાય?",
    "Centimetres boxes for 7 cm": "સેમીનાં ખાનાં: 7 સેમી",
    "Is 7 cm a number of tens or of ones?": "7 સેમી દશકની સંખ્યા છે કે એકમની?",
    "07 it is: a zero fills the tens box and the 7 stays in the ones box.": "07 જ છે: દશકનું ખાનું શૂન્યથી ભરાય છે અને 7 એકમના ખાનામાં રહે છે.",
    /* phase 2 */
    "Carrying a whole unit": "આખા એકમની વદી",
    "The metres make more than a thousand. What is written, and what is carried?": "મીટર એક હજારથી વધુ થયા. શું લખાશે, અને શું વદીમાં જશે?",
    "Tap Add to add the metres column first.": "પહેલાં મીટરનો સ્તંભ ઉમેરવા ઉમેરો બટન દબાવો.",
    "Start with the key at the bottom.": "નીચેના બટનથી શરૂ કરો.",
    "The joining sign says 1,000 m, and 1,100 m is more, so tap Carry.": "જોડાણ ચિહ્ન 1,000 મી કહે છે, અને 1,100 મી વધુ છે, તેથી વદી બટન દબાવો.",
    "Carry lifts 1,000 m over the km column.": "વદી 1,000 મીને કિમીના સ્તંભ ઉપર લઈ જાય છે.",
    "Tap Add again to add the kilometres and the carried one.": "કિમી અને વદીનો એક ઉમેરવા ફરી ઉમેરો બટન દબાવો.",
    "The chip over the km column counts too.": "કિમીના સ્તંભ ઉપરની ચિપ પણ ગણાય છે.",
    "How many times does the big number on the joining sign fit in the sum?": "જોડાણ ચિહ્નની મોટી સંખ્યા સરવાળામાં કેટલી વાર આવે છે?",
    "Carry one larger unit for each, and write only what is left in the boxes.": "દરેક માટે એક મોટો એકમ વદીમાં લો, અને ખાનાંમાં ફક્ત બાકી રહેલું લખો.",
    "Add the smaller unit first and carry one kilometre for each full 1,000 m.": "પહેલાં નાનો એકમ ઉમેરો અને દરેક પૂરા 1,000 મી માટે એક કિલોમીટર વદી લો.",
    "You learned: carry one kilometre for each full thousand metres.": "તમે શીખ્યા: દરેક પૂરા હજાર મીટર પર એક કિલોમીટર વદી જાય છે.",
    "Add 45 km 738 m and 28 km 564 m.": "45 કિમી 738 મી અને 28 કિમી 564 મી ઉમેરો.",
    "Add 45 km 738 m and 28 km 564 m": "45 કિમી 738 મી, 28 કિમી 564 મી ઉમેરો",
    "Do all of those metres fit in three boxes?": "શું એ બધા મીટર ત્રણ ખાનાંમાં સમાય છે?",
    "Yes, 1,302 m makes 1 km 302 m, so the sum is 74 km 302 m.": "હા, 1,302 મીના 1 કિમી 302 મી બને છે, તેથી સરવાળો 74 કિમી 302 મી છે.",
    "Now add 64 m 58 cm and 29 m 73 cm.": "હવે 64 મી 58 સેમી અને 29 મી 73 સેમી ઉમેરો.",
    "Add 64 m 58 cm and 29 m 73 cm": "64 મી 58 સેમી, 29 મી 73 સેમી ઉમેરો",
    "Do the centimetres make a hundred or more?": "શું સેન્ટિમીટર સો કે તેથી વધુ થાય છે?",
    "Right, 131 cm gives 1 m to carry, so it is 94 m 31 cm.": "સાચું, 131 સેમીમાંથી 1 મી વદી આવે છે, તેથી જવાબ 94 મી 31 સેમી છે.",
    "Three children ran 3 km 480 m, 2 km 365 m and 4 km 290 m: how far together?": "ત્રણ બાળકો 3 કિમી 480 મી, 2 કિમી 365 મી અને 4 કિમી 290 મી દોડ્યાં: કુલ કેટલું?",
    "The three runs together": "ત્રણેય દોડ મળીને",
    "Did the carried kilometre go into the kilometres column?": "શું વદીનો કિલોમીટર કિલોમીટરના સ્તંભમાં ઉમેરાયો?",
    "Together they ran 10 km 135 m, since 1,135 m makes 1 km 135 m.": "તેઓ મળીને 10 કિમી 135 મી દોડ્યાં, કારણ કે 1,135 મીના 1 કિમી 135 મી બને છે.",
    /* phase 3 */
    "Borrowing a whole unit": "આખો એકમ ઉછીનો લેવો",
    "Too few centimetres on top. Break one metre. How many centimetres does it give?": "ઉપર સેન્ટિમીટર બહુ ઓછા છે. એક મીટર તોડો. તેમાંથી કેટલા સેન્ટિમીટર મળે?",
    "15 cm is less than 40 cm, so tap Break to take one metre from 6 m.": "15 સેમી, 40 સેમી કરતાં ઓછા છે, તેથી 6 મીમાંથી એક મીટર લેવા તોડો બટન દબાવો.",
    "The Break key is at the bottom.": "તોડો બટન નીચે છે.",
    "Tap Split to cut that metre into centimetres.": "તે મીટરને સેન્ટિમીટરમાં કાપવા કાપો બટન દબાવો.",
    "Split is the key that said Break.": "કાપો એ જ બટન છે જેના પર તોડો લખેલું હતું.",
    "Tap Take away to work the centimetres first, then the metres.": "પહેલાં સેન્ટિમીટર, પછી મીટર ઉકેલવા બાદ કરો બટન દબાવો.",
    "Take away is the key that said Split.": "બાદ કરો એ જ બટન છે જેના પર કાપો લખેલું હતું.",
    "Break one larger unit, and its pieces join the smaller number on top.": "એક મોટો એકમ તોડો, તેના ટુકડા ઉપરની નાની સંખ્યામાં ભળે છે.",
    "The larger number on top is now one less, so take away each column.": "ઉપરની મોટી સંખ્યા હવે એક ઓછી છે, તેથી દરેક સ્તંભ બાદ કરો.",
    "When the centimetres on top are too few, break one metre into 100 cm.": "જ્યારે ઉપર સેન્ટિમીટર ઓછા હોય, ત્યારે એક મીટરને 100 સેમીમાં તોડો.",
    "You learned: break one metre into a hundred centimetres to take away.": "તમે શીખ્યા: બાદ કરવા એક મીટરને સો સેન્ટિમીટરમાં તોડો.",
    "Take 18 m 64 cm from 52 m 27 cm.": "52 મી 27 સેમીમાંથી 18 મી 64 સેમી બાદ કરો.",
    "From 52 m 27 cm take 18 m 64 cm": "ઉપરમાંથી નીચેની લંબાઈ બાદ કરો",
    "Which number is on top in the centimetres column?": "સેન્ટિમીટરના સ્તંભમાં ઉપર કઈ સંખ્યા છે?",
    "Yes, 127 cm take away 64 cm leaves 63 cm, so it is 33 m 63 cm.": "હા, 127 સેમીમાંથી 64 સેમી બાદ કરતાં 63 સેમી બચે, તેથી જવાબ 33 મી 63 સેમી.",
    "How much longer is a 5 m 8 cm jump than 4 m 76 cm, in m and cm?": "5 મી 8 સેમીનો કૂદકો 4 મી 76 સેમી કરતાં કેટલો લાંબો છે, મી અને સેમીમાં?",
    "How much longer in m and cm?": "મી અને સેમીમાં કેટલું લાંબું?",
    "Can 76 cm come away from 8 cm?": "શું 8 સેમીમાંથી 76 સેમી બાદ થઈ શકે?",
    "Right, 108 cm take away 76 cm is 32 cm, with no metres left.": "સાચું, 108 સેમીમાંથી 76 સેમી બાદ કરતાં 32 સેમી, અને કોઈ મીટર બાકી નથી.",
    "Now take 16 km 875 m from 40 km 230 m.": "હવે 40 કિમી 230 મીમાંથી 16 કિમી 875 મી બાદ કરો.",
    "What is left?": "કેટલું બાકી?",
    "Was a kilometre taken from the top length?": "શું ઉપરની લંબાઈમાંથી એક કિલોમીટર લીધો?",
    "Well done, 1,230 m take away 875 m is 355 m, so 23 km 355 m is left.": "શાબાશ, 1,230 મીમાંથી 875 મી બાદ કરતાં 355 મી, તેથી 23 કિમી 355 મી બાકી.",
    /* phase 4 */
    "The number depends on the units": "સંખ્યા એકમો પર આધાર રાખે છે",
    "One centimetre breaks into how many millimetres? Check the joining sign.": "એક સેન્ટિમીટર તૂટીને કેટલા મિલિમીટર બને? જોડાણ ચિહ્ન જુઓ.",
    "These lengths are in cm and mm, so tap cm and mm on the switch.": "આ લંબાઈઓ સેમી અને મિમીમાં છે, તેથી સ્વિચ પર સેમી, મિમી દબાવો.",
    "The switch is the row of units at the top.": "સ્વિચ ઉપર એકમોની હાર છે.",
    "1 mm is less than 2 mm, so tap Break to take one centimetre.": "1 મિમી, 2 મિમી કરતાં ઓછો છે, તેથી એક સેન્ટિમીટર લેવા તોડો બટન દબાવો.",
    "Break takes from the top centimetres.": "તોડો ઉપરના સેન્ટિમીટરમાંથી લે છે.",
    "Tap Split and count the millimetres that one centimetre gives.": "કાપો બટન દબાવો અને ગણો કે એક સેન્ટિમીટરમાંથી કેટલા મિલિમીટર મળે.",
    "Tap Take away to finish both columns.": "બંને સ્તંભ પૂરા કરવા બાદ કરો બટન દબાવો.",
    "Take away is the key at the bottom.": "બાદ કરો બટન નીચે છે.",
    "What does the joining sign say for these two units?": "આ બે એકમો માટે જોડાણ ચિહ્ન શું કહે છે?",
    "Work the millimetres first; one centimetre is that many millimetres.": "પહેલાં મિલિમીટર ઉકેલો, એક સેન્ટિમીટર એટલા જ મિલિમીટરનો હોય છે.",
    "Carry or break by the number that joins the two units: 10, 100 or 1,000.": "બે એકમોને જોડતી સંખ્યાથી વદી લો કે તોડો: 10, 100 કે 1,000.",
    "You learned: carry or break by the number that joins the two units.": "તમે શીખ્યા: બંને એકમોને જોડતી સંખ્યાથી વદી લો કે તોડો.",
    "Take 23 cm 8 mm from 41 cm 3 mm.": "41 સેમી 3 મિમીમાંથી 23 સેમી 8 મિમી બાદ કરો.",
    "From 41 cm 3 mm take 23 cm 8 mm": "ઉપરમાંથી નીચેની લંબાઈ બાદ કરો",
    "Which two units are in the frame?": "ચોકઠામાં કયા બે એકમ છે?",
    "Yes, 13 mm take away 8 mm is 5 mm, so it is 17 cm 5 mm.": "હા, 13 મિમીમાંથી 8 મિમી બાદ કરતાં 5 મિમી, તેથી જવાબ 17 સેમી 5 મિમી.",
    "Now add 36 cm 7 mm and 18 cm 6 mm.": "હવે 36 સેમી 7 મિમી અને 18 સેમી 6 મિમી ઉમેરો.",
    "Add 36 cm 7 mm and 18 cm 6 mm": "36 સેમી 7 મિમી, 18 સેમી 6 મિમી ઉમેરો",
    "Do the millimetres make ten or more?": "શું મિલિમીટર દસ કે તેથી વધુ થાય છે?",
    "Right, 13 mm is 1 cm 3 mm, so the sum is 55 cm 3 mm.": "સાચું, 13 મિમી એટલે 1 સેમી 3 મિમી, તેથી સરવાળો 55 સેમી 3 મિમી છે.",
    "A child broke 1 cm into 100 mm: do 15 cm 2 mm take away 8 cm 9 mm correctly.": "કોઈએ 1 સેમીના 100 મિમી કર્યા: 15 સેમી 2 મિમીમાંથી 8 સેમી 9 મિમી સાચું બાદ કરો.",
    "From 15 cm 2 mm take 8 cm 9 mm": "ઉપરમાંથી નીચેની લંબાઈ બાદ કરો",
    "Does one centimetre really give a hundred millimetres?": "શું એક સેન્ટિમીટરમાંથી ખરેખર સો મિલિમીટર મળે?",
    "Every box needs a number, even a zero.": "દરેક ખાનામાં એક સંખ્યા જોઈએ, શૂન્ય પણ.",
    "1 cm gives only 10 mm, so the right answer is 6 cm 3 mm.": "1 સેમીમાંથી ફક્ત 10 મિમી મળે છે, તેથી સાચો જવાબ 6 સેમી 3 મિમી છે.",
    /* the words the picture draws, the slot's box labels and the keys */
    "km, m": "કિમી, મી", "m, cm": "મી, સેમી", "cm, mm": "સેમી, મિમી",
    "km": "કિમી", "m": "મી", "cm": "સેમી", "mm": "મિમી",
    "Add": "ઉમેરો", "Carry": "વદી", "Break": "તોડો", "Split": "કાપો", "Take away": "બાદ કરો", "New": "નવું",
  },
};

/* the three unit pairs the frame can be set to: the larger unit, the smaller one, the number that joins
   them (J) and how many fixed boxes the smaller unit takes (the digits of J - 1) */
const LC_PAIRS: any = {
  km: { key: "km", big: "km", small: "m", J: 1000, boxes: 3, bigWord: "kilometres", smallWord: "metres", label: "km, m" },
  m: { key: "m", big: "m", small: "cm", J: 100, boxes: 2, bigWord: "metres", smallWord: "centimetres", label: "m, cm" },
  cm: { key: "cm", big: "cm", small: "mm", J: 10, boxes: 1, bigWord: "centimetres", smallWord: "millimetres", label: "cm, mm" },
};
const LC_PAIR_KEYS = ["km", "m", "cm"];
/* the slot's two boxes for a two-unit answer: the larger unit, then the smaller one */
const LC_SLOT: any = {
  km: [{ label: "km" }, { label: "m", rtl: true, digits: 3 }],
  m: [{ label: "m" }, { label: "cm", rtl: true, digits: 2 }],
  cm: [{ label: "cm" }, { label: "mm", rtl: true, digits: 1 }],
};

/* kinds:  place  the child types what the smaller unit's boxes hold (a string with its zeros, "058")
           add    lengths in columns added; a two-unit answer [larger, smaller]
           sub    the second length taken from the first; a two-unit answer
   rows    [larger, smaller] per length, top to bottom (larger null: the length has none)
   place   (add) the row whose smaller part the child puts in its box by tapping one (ML1)
   near    the item's own misconception (judge must reject it)
   win     the one-sentence line said at the right answer (winMs covers its reading time, 68 ms a character) */
const PHASES = [
  {
    n: 1,
    concept: "Lining up the units",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O5"],
    says: ["The metres column has three boxes. How is a two-digit number of metres written?"],
    /* guide steps work a WARM-UP (LC_WARM[1], 6 km 38 m), never question 1 */
    steps: [
      { say: "Tap under km to write the 6 km of this card in its column.", on: "big", hint: "The km column is on the left." },
      { say: "38 m ends in the ones place, so tap the ones box.", on: "ones", hint: "It is the last of the three metres boxes." },
      { say: "Tap the first metres box to fill its empty place with a zero.", on: "hundreds", hint: "Only one metres box is still empty." },
    ],
    stepHold: 900,
    ladder: ["Which places does your number fill, counting from the ones box?", "Fill the boxes so the last digit sits in the ones box, with zeros in front."],
    closing: "Each unit has its own column, and beside km the metres take three places.",
    learned: "You learned: beside kilometres the metres always take three places.",
    traceback: "The row is read as it stands, then its digits slide right into the ones and tens, and a grey zero fills each empty place in front.",
    items: [
      /* learn ML1: answer in the plan = 69 km 649 m */
      { qid: "M1.S2.T4.C15:ML1", kind: "add", pair: "km", op: "+", rows: [[52, 9], [17, 640]], place: 0, parts: LC_SLOT.km, answer: [69, 649], near: "70|540",
        say: "Tap the box for the 9 of 52 km 9 m, then add 17 km 640 m.", ask: "Add 52 km 9 m and 17 km 640 m",
        miss: "Nine metres is less than ten, so which metres box holds it?",
        ladder: ["Add the metres column first, then the kilometres.", "Read each metres box down: the hundreds, the tens, then the ones."],
        win: "Right, the 9 sits in the ones box, so the sum is 69 km 649 m.", winMs: 4300 },
      /* practice 1: answer in the plan = 058, three places, because a thousand metres make a kilometre */
      { qid: "M1.S2.T4.C15:1", kind: "place", pair: "km", op: "", rows: [[31, 58]], answer: "058", near: "58",
        say: "31 km 58 m is written in columns, so what goes in the metres boxes?", ask: "Metres boxes for 31 km 58 m",
        miss: "Read your boxes aloud: do they say 58 metres?",
        win: "Yes, 058 keeps 58 m in the tens and ones boxes.", winMs: 3300 },
      /* practice 2: answer in the plan = 07, two places, because a hundred centimetres make a metre */
      { qid: "M1.S2.T4.C15:2", kind: "place", pair: "m", op: "", rows: [[null, 7]], answer: "07", near: "7",
        say: "In columns of m and cm, how is 7 cm written in the boxes?", ask: "Centimetres boxes for 7 cm",
        miss: "Is 7 cm a number of tens or of ones?",
        win: "07 it is: a zero fills the tens box and the 7 stays in the ones box.", winMs: 4700 },
    ],
  },
  {
    n: 2,
    concept: "Carrying a whole unit",
    conceptId: "M1.S2.T4.C16", objectiveIds: ["O5"],
    says: ["The metres make more than a thousand. What is written, and what is carried?"],
    /* warm-up LC_WARM[2]: 2 km 600 m + 1 km 500 m */
    steps: [
      { say: "Tap Add to add the metres column first.", on: "add-small", hint: "Start with the key at the bottom." },
      { say: "The joining sign says 1,000 m, and 1,100 m is more, so tap Carry.", on: "carry", hint: "Carry lifts 1,000 m over the km column." },
      { say: "Tap Add again to add the kilometres and the carried one.", on: "add-big", hint: "The chip over the km column counts too." },
    ],
    stepHold: 900,
    ladder: ["How many times does the big number on the joining sign fit in the sum?", "Carry one larger unit for each, and write only what is left in the boxes."],
    closing: "Add the smaller unit first and carry one kilometre for each full 1,000 m.",
    learned: "You learned: carry one kilometre for each full thousand metres.",
    traceback: "The smaller column's sum shows in the carry box, each full joining number rises as an amber chip, what is left goes down, and the larger column is added with the chip.",
    items: [
      /* learn ML2: answer in the plan = 74 km 302 m */
      { qid: "M1.S2.T4.C16:ML2", kind: "add", pair: "km", op: "+", rows: [[45, 738], [28, 564]], parts: LC_SLOT.km, answer: [74, 302], near: "73|1302",
        say: "Add 45 km 738 m and 28 km 564 m.", ask: "Add 45 km 738 m and 28 km 564 m",
        miss: "Do all of those metres fit in three boxes?",
        win: "Yes, 1,302 m makes 1 km 302 m, so the sum is 74 km 302 m.", winMs: 4100 },
      /* practice 3: answer in the plan = 94 m 31 cm. The centimetres make 131, so write 31 and carry 1 m */
      { qid: "M1.S2.T4.C16:3", kind: "add", pair: "m", op: "+", rows: [[64, 58], [29, 73]], parts: LC_SLOT.m, answer: [94, 31], near: "93|131",
        say: "Now add 64 m 58 cm and 29 m 73 cm.", ask: "Add 64 m 58 cm and 29 m 73 cm",
        miss: "Do the centimetres make a hundred or more?",
        win: "Right, 131 cm gives 1 m to carry, so it is 94 m 31 cm.", winMs: 3800 },
      /* practice 4: answer in the plan = 10 km 135 m. The metres make 1135, so write 135 and carry 1 km */
      { qid: "M1.S2.T4.C16:4", kind: "add", pair: "km", op: "+", rows: [[3, 480], [2, 365], [4, 290]], parts: LC_SLOT.km, answer: [10, 135], near: "9|135",
        say: "Three children ran 3 km 480 m, 2 km 365 m and 4 km 290 m: how far together?", ask: "The three runs together",
        miss: "Did the carried kilometre go into the kilometres column?",
        win: "Together they ran 10 km 135 m, since 1,135 m makes 1 km 135 m.", winMs: 4300 },
    ],
  },
  {
    n: 3,
    concept: "Borrowing a whole unit",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O6"],
    says: ["Too few centimetres on top. Break one metre. How many centimetres does it give?"],
    /* warm-up LC_WARM[3]: 6 m 15 cm less 2 m 40 cm */
    steps: [
      { say: "15 cm is less than 40 cm, so tap Break to take one metre from 6 m.", on: "break", hint: "The Break key is at the bottom." },
      { say: "Tap Split to cut that metre into centimetres.", on: "split", hint: "Split is the key that said Break." },
      { say: "Tap Take away to work the centimetres first, then the metres.", on: "take", hint: "Take away is the key that said Split." },
    ],
    stepHold: 900,
    ladder: ["Break one larger unit, and its pieces join the smaller number on top.", "The larger number on top is now one less, so take away each column."],
    closing: "When the centimetres on top are too few, break one metre into 100 cm.",
    learned: "You learned: break one metre into a hundred centimetres to take away.",
    traceback: "The top larger number is struck through with one less above it, one larger unit splits into the joining number of pieces that join the top, and both columns are taken away.",
    items: [
      /* learn ML3: answer in the plan = 33 m 63 cm */
      { qid: "M1.S2.T4.C17:ML3", kind: "sub", pair: "m", op: "-", rows: [[52, 27], [18, 64]], parts: LC_SLOT.m, answer: [33, 63], near: "34|37",
        say: "Take 18 m 64 cm from 52 m 27 cm.", ask: "From 52 m 27 cm take 18 m 64 cm",
        miss: "Which number is on top in the centimetres column?",
        win: "Yes, 127 cm take away 64 cm leaves 63 cm, so it is 33 m 63 cm.", winMs: 4400 },
      /* practice 5: answer in the plan = The first jump is 32 cm longer. 5 m 08 cm becomes 4 m 108 cm, and 108 less 76 is 32, with no metres left */
      { qid: "M1.S2.T4.C17:5", kind: "sub", pair: "m", op: "-", rows: [[5, 8], [4, 76]], parts: LC_SLOT.m, answer: [0, 32], near: "1|68",
        say: "How much longer is a 5 m 8 cm jump than 4 m 76 cm, in m and cm?", ask: "How much longer in m and cm?",
        miss: "Can 76 cm come away from 8 cm?",
        win: "Right, 108 cm take away 76 cm is 32 cm, with no metres left.", winMs: 4200 },
      /* practice 6: answer in the plan = 23 km 355 m. Break one kilometre: 39 km 1230 m, and 1230 less 875 is 355 */
      { qid: "M1.S2.T4.C17:6", kind: "sub", pair: "km", op: "-", rows: [[40, 230], [16, 875]], parts: LC_SLOT.km, answer: [23, 355], near: "24|645",
        say: "Now take 16 km 875 m from 40 km 230 m.", ask: "What is left?",
        miss: "Was a kilometre taken from the top length?",
        win: "Well done, 1,230 m take away 875 m is 355 m, so 23 km 355 m is left.", winMs: 4700 },
    ],
  },
  {
    n: 4,
    concept: "The number depends on the units",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O6"],
    says: ["One centimetre breaks into how many millimetres? Check the joining sign."],
    /* warm-up LC_WARM[4]: 9 cm 1 mm less 4 cm 2 mm, the frame still set to m and cm until the child switches it */
    steps: [
      { say: "These lengths are in cm and mm, so tap cm and mm on the switch.", on: "pair-cm", hint: "The switch is the row of units at the top." },
      { say: "1 mm is less than 2 mm, so tap Break to take one centimetre.", on: "break", hint: "Break takes from the top centimetres." },
      { say: "Tap Split and count the millimetres that one centimetre gives.", on: "split", hint: "Split is the key that said Break." },
      { say: "Tap Take away to finish both columns.", on: "take", hint: "Take away is the key at the bottom." },
    ],
    stepHold: 900,
    ladder: ["What does the joining sign say for these two units?", "Work the millimetres first; one centimetre is that many millimetres."],
    closing: "Carry or break by the number that joins the two units: 10, 100 or 1,000.",
    learned: "You learned: carry or break by the number that joins the two units.",
    traceback: "The joining sign lights, one centimetre splits into exactly ten slivers or ten millimetres gather into one chip, and each column is worked again.",
    items: [
      /* learn ML4: answer in the plan = 17 cm 5 mm */
      { qid: "M1.S2.T4.C18:ML4", kind: "sub", pair: "cm", op: "-", rows: [[41, 3], [23, 8]], parts: LC_SLOT.cm, answer: [17, 5], near: "17|95",
        say: "Take 23 cm 8 mm from 41 cm 3 mm.", ask: "From 41 cm 3 mm take 23 cm 8 mm",
        miss: "Which two units are in the frame?",
        win: "Yes, 13 mm take away 8 mm is 5 mm, so it is 17 cm 5 mm.", winMs: 3900 },
      /* practice 7: answer in the plan = 55 cm 3 mm. The millimetres make 13, so write 3 and carry 1 cm, because ten millimetres make a centimetre */
      { qid: "M1.S2.T4.C18:7", kind: "add", pair: "cm", op: "+", rows: [[36, 7], [18, 6]], parts: LC_SLOT.cm, answer: [55, 3], near: "54|13",
        say: "Now add 36 cm 7 mm and 18 cm 6 mm.", ask: "Add 36 cm 7 mm and 18 cm 6 mm",
        miss: "Do the millimetres make ten or more?",
        win: "Right, 13 mm is 1 cm 3 mm, so the sum is 55 cm 3 mm.", winMs: 3700 },
      /* practice 8: answer in the plan = 10 mm, because ten millimetres make a centimetre. 15 cm 2 mm becomes 14 cm 12 mm, so the answer is 6 cm 3 mm.
         The slot takes the take-away itself (6 cm 3 mm); the 10 mm shows when the child breaks the centimetre. The child's 100 mm break is the near miss. */
      { qid: "M1.S2.T4.C18:8", kind: "sub", pair: "cm", op: "-", rows: [[15, 2], [8, 9]], parts: LC_SLOT.cm, answer: [6, 3], near: "6|93",
        say: "A child broke 1 cm into 100 mm: do 15 cm 2 mm take away 8 cm 9 mm correctly.", ask: "From 15 cm 2 mm take 8 cm 9 mm",
        miss: "Does one centimetre really give a hundred millimetres?",
        win: "1 cm gives only 10 mm, so the right answer is 6 cm 3 mm.", winMs: 3900 },
    ],
  },
];

/* the WARM-UPS the guide steps work (outside PHASES: their numbers and results are none of the phase's answers or
   answer parts). from: the pair the frame stands at until the child switches it */
const LC_WARM: any = {
  1: { kind: "warm1", pair: "km", op: "", rows: [[6, 38]] },
  2: { kind: "add", pair: "km", op: "+", rows: [[2, 600], [1, 500]] },
  3: { kind: "sub", pair: "m", op: "-", rows: [[6, 15], [2, 40]] },
  4: { kind: "sub", pair: "cm", op: "-", rows: [[9, 1], [4, 2]], from: "m" },
};

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  pairs: LC_PAIRS,
  warmUps: LC_WARM,
  frame: { picture: [900, 520], unitSwitch: [0, 0, 554, 72], joiningSign: [566, 4, 334, 64], columns: [0, 80, 568, 368], carryBox: [600, 80, 296, 116], pieces: [608, 222, 280, 124], key: [628, 440, 240, 72], bars: [12, 460, 544, 50] },
  rule: "the smaller unit takes as many boxes as J - 1 has digits; carry one larger unit for each full J of the smaller column; break one larger unit into J smaller units",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: two units: each box as a number (judgeSlotParts), and the smaller part fits its fixed boxes ("1302" has a
   digit with no box, so it is never 302 m); the smaller unit's boxes ("place"): the digits exactly, zeros in front
   included, so "58" is not "058" */
const judge = (item: any, v: any) => {
  if (item.parts) {
    if (!judgeSlotParts(item, v)) return false;
    return slotPartsOf(v, 2)[1].length <= LC_PAIRS[item.pair].boxes;
  }
  if (item.kind === "place") return String(v ?? "").replace(/[^0-9]/g, "") === String(item.answer);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route that shares no code with judge or Work. It turns every length into the smaller unit alone
   (52 km 9 m = 52,009 m), adds or takes away those, and splits the total back by division; a "place" answer is the
   smaller part printed at the width of the largest smaller part (J - 1) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const J = { km: 1000, m: 100, cm: 10 }[it.pair as "km" | "m" | "cm"];
  if (it.kind === "place") {
    const width = String(J - 1).length;
    const s = String(it.rows[0][1]);
    return s.length <= width && "0".repeat(width - s.length) + s === it.answer;
  }
  const flat = it.rows.map((r: any) => (r[0] || 0) * J + r[1]);
  const total = it.kind === "sub" ? flat[0] - flat[1] : flat.reduce((a: number, b: number) => a + b, 0);
  return total >= 0 && Math.floor(total / J) === it.answer[0] && total - Math.floor(total / J) * J === it.answer[1];
}));
/* the most likely wrong answer: the item's own misconception (9 m under the hundreds, 1,302 in the metres boxes, the
   smaller taken from the larger, a centimetre broken into a hundred millimetres); judge rejects it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): a "place" answer keeps its zeros in front ("058"), which a number path would drop, so it is
   set in the slot as written; a two-unit answer is typed by the runtime */
const answer = (item: any, v: any) => (item.kind === "place" && HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: nothing waits on the working area, so Enter (in a steps phase it performs the step) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 with the panel shut, 900 x 520 open (bigPad). The picture is laid out ONE size, 900 x 520,
   at ox = max(0, min((box.w - 900) / 2, kx - 900)): centred when shut, never under the key's corner (box.key).
   the chapter's colours: the larger unit deep blue, the smaller unit green, a carried or broken unit amber, a
   difference reddish purple, a zero set in an empty place grey (at full size and weight) */
const LC_BLUE = CONTENT.hundred, LC_GREEN = CONTENT.one, LC_AMBER = CONTENT.ten, LC_PURPLE = CONTENT.bead, LC_ZERO = "#767676";
const LC_INK_BIG = shade(LC_BLUE, 0.25), LC_INK_SMALL = shade(LC_GREEN, 0.25), LC_INK_AMBER = shade(LC_AMBER, 0.4);
/* the colour code over the ribbon skin: a deeper blue strongly, the green lightly, so whole units and the leftover stay
   about 3:1 apart in luminance on the built frame (0.72 of each measured 1.35:1 over the gold ribbon) */
const LC_BAR_BLUE = shade(LC_BLUE, 0.3), LC_OP_BLUE = 0.85, LC_OP_GREEN = 0.45;
/* the picture: the frame at x 0-568 (the larger column's numbers end at bigR, the smaller unit's fixed boxes end at
   boxR), the right panel at x 600-896 (card or carry box, the pieces tray, the one action key) */
const LC = { W: 900, top: 80, frameW: 568, head: 110, chipY: 122, amber: 159, rowTop: 168, pitch: 68, boxH: 60, base: 46,
  bigR: 228, div: 252, boxR: 552, boxW: 70, gap: 10, cx: 748, trayX: 608, trayY: 222, keyY: 440, swP: 186, swW: 182, signX: 566 };
const lcBoxX = (B: number, k: number) => LC.boxR - (B - k) * LC.boxW - (B - 1 - k) * LC.gap;
const lcRowY = (r: number) => LC.rowTop + r * LC.pitch;
const lcWait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const lcSeq = (n: number) => Array.from({ length: Math.max(0, n) }, (_, i) => i);
/* a smaller part written into its boxes, zeros in front */
const lcPad = (v: number, B: number) => { const s = String(v); return s.length >= B ? s : "0".repeat(B - s.length) + s; };
/* where each character of a right-aligned number stands (digits 0.6 em, a comma 0.3 em) */
const lcCharXs = (s: string, xr: number, size: number) => {
  const ws = s.split("").map((c) => (c === "," ? 0.3 : 0.6) * size);
  let x = xr - ws.reduce((a, b) => a + b, 0);
  return ws.map((w) => { const c = x + w / 2; x += w; return c; });
};
/* a text's width estimate, for shrink-to-fit in every language (NOTES "Hindi/Gujarati FIT lessons"): Latin and digits about
   0.62 em, a Devanagari or Gujarati letter or spacing sign 0.88 em, the zero-advance marks nothing (docs/PATTERNS.md §18) */
const LC_ZERO_ADV = /[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/;
const lcTW = (s: string, size: number) => {
  let w = 0;
  for (const ch of String(s)) {
    if (LC_ZERO_ADV.test(ch)) continue;
    const c = ch.charCodeAt(0);
    /* measured in the tool's own page (NOTES FIT lesson 8): an Indic advance about 0.6 em (0.7 kept for margin), Latin 0.66, digits 0.62 */
    w += (c >= 0x900 && c <= 0x97f) || (c >= 0xa80 && c <= 0xaff) ? 0.64 : ch === " " || ch === "," || ch === "." ? 0.3 : /[0-9]/.test(ch) ? 0.62 : 0.66;
  }
  return w * size;
};
/* the biggest size up to max that fits the room, never under the 28 floor */
const lcFit = (s: string, max: number, room: number) => Math.max(T.micro, Math.min(max, Math.floor((max * room) / Math.max(1, lcTW(s, max)))));
/* the column method, as the book works it: the smaller column first, carry or break by J (the picture's own route;
   the oracle takes another) */
function lcColumns(pair: string, op: string, rows: any[]) {
  const J = LC_PAIRS[pair].J;
  if (op === "-") {
    const t = rows[0], b = rows[1];
    const need = t[1] < b[1];
    const topBig = need ? t[0] - 1 : t[0], topSmall = need ? t[1] + J : t[1];
    return { need, topBig, topSmall, small: topSmall - b[1], big: topBig - (b[0] || 0), sSum: 0, carry: 0 };
  }
  const sSum = rows.reduce((a: number, r: any) => a + r[1], 0);
  const carry = Math.floor(sSum / J);
  const big = rows.reduce((a: number, r: any) => a + (r[0] || 0), 0) + carry;
  return { need: false, topBig: 0, topSmall: 0, sSum, carry, small: sSum - carry * J, big };
}
/* free play's lengths: a take-away always needs a break, a sum always carries */
function lcDeal(pair: string, op: string) {
  const J = LC_PAIRS[pair].J;
  const r = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
  if (op === "-") {
    const bs = r(1, J - 1), ts = r(0, bs - 1), bb = r(1, 40);
    return [[bb + r(1, 40), ts], [bb, bs]];
  }
  const s1 = r(Math.ceil(J / 2), J - 1);
  return [[r(1, 50), s1], [r(1, 49), r(J - s1, J - 1)]];
}
/* the board of one entry: the acts done, the act in progress ({ on, p }: p points passed), ML1's placed 9 */
const lcBlank = (e: number) => ({ e, done: [] as string[], prog: null as any, at: null as any, atN: 0 });
/* the one action key's label for each act */
const LC_KEY: any = { "add-small": "Add", carry: "Carry", "add-big": "Add", break: "Break", split: "Split", take: "Take away", brk: "Break" };
const LC_SEQ: any = { add: ["add-small", "carry", "add-big"], sub: ["break", "split", "take"] };

function Work({ n, item, index, stage, wrong, typed, part, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && (stage === "teach" || stage === "demo");
  const [fp, setFp] = useState<any>(() => ({ pair: "km", op: "+", rows: lcDeal("km", "+"), k: 0 }));
  const W0: any = LC_WARM[n] || LC_WARM[1];
  const it: any = free ? { kind: fp.op === "-" ? "sub" : "add", pair: fp.pair, op: fp.op, rows: fp.rows } : warm ? W0 : item || W0;
  /* the board belongs to the ENTRY: a new question, a warm-up or a free deal opens a fresh one */
  const qk = free ? "free:" + fp.k : warm ? n + ":w" : n + ":" + index;
  const ekRef = useRef<any>({ qk: "", e: 0 });
  if (ekRef.current.qk !== qk) ekRef.current = { qk, e: ekRef.current.e + 1 };
  const e = ekRef.current.e;
  const [raw, setRaw] = useState<any>(null);
  const S: any = raw && raw.e === e ? raw : lcBlank(e);
  /* a write belongs to the entry open when it was called: a late write from an older entry is dropped */
  const putE = (k: number, f: any) => setRaw((p: any) => {
    if (k !== ekRef.current.e) return p;
    const b = p && p.e === k ? p : lcBlank(k);
    return { ...b, ...(typeof f === "function" ? f(b) : f) };
  });
  /* the correction's layer: { e, d, typed }; it stays as a model until the child's next act on the frame, and the
     answer row follows the child's typing again as soon as a fresh digit comes */
  const [demo, setDemo] = useState<any>(null);
  const dm = demo && demo.e === e ? demo : null;
  const ty = String(typed ?? "");
  const fresh = !!dm && ty !== dm.typed;
  const kind = it.kind;
  const asking = !free && !warm && stage === "ask";
  const full = !free && !warm && !!item && (stage === "win" || stage === "idle");
  const FIN = kind === "place" ? 1 : 4;
  const d = full ? FIN : dm ? dm.d : -1;
  const R = (on: string) => (S.done.indexOf(on) >= 0 ? 999 : S.prog && S.prog.on === on ? S.prog.p : 0);
  const pairNow = it.from && R("pair-cm") < 1 ? it.from : it.pair;
  const rowsIn = pairNow === it.pair;
  const P = LC_PAIRS[pairNow] || LC_PAIRS.km;
  const B = P.boxes, J = P.J;
  const rows: any[] = it.rows || [];
  const nR = rows.length;
  const hasAns = kind === "add" || kind === "sub";
  const sol: any = hasAns ? lcColumns(it.pair, it.op, rows) : null;
  const placeRow = kind === "add" ? it.place : undefined;
  const ansTop = lcRowY(nR) + 4;
  const fBot = hasAns ? ansTop + LC.boxH + 12 : lcRowY(1) + 4;
  /* the room */
  const bw = box ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : bw;
  const ox = Math.round(Math.max(0, Math.min((bw - LC.W) / 2, kx - LC.W)));
  const ax = (p: any) => ({ x: p.x + ox, y: p.y });
  /* the column headings: Devanagari and Gujarati hang a line and hooks above the letters, so they sit 9 lower, clear of the frame top */
  const headY = LC.head + (lang === "en" ? 0 : 9);

  /* ── what each part shows: the acts done (warm-up, free play, the child's Break), the correction's step d, the win ── */
  const ALL = 999;
  const sumS = sol ? indian(sol.sSum) : "";
  const sumN = Math.max(R("add-small"), d >= 1 ? ALL : 0);
  const carryN = Math.max(R("carry"), d >= 2 ? 1 : 0, d >= 3 ? ALL : 0);
  const addBigN = Math.max(R("add-big"), d >= 4 ? ALL : 0);
  const brN = Math.max(R("break"), d >= 1 ? ALL : 0);
  const spN = Math.max(R("split"), d >= 2 ? ALL : 0);
  const tkN = Math.max(R("take"), d >= 3 ? B : 0, d >= 4 ? ALL : 0);
  const topBigS = sol ? String(sol.topBig) : "", topSmallS = sol ? indian(sol.topSmall) : "";
  const chipUp = kind === "add" && sol.carry > 0 && carryN >= 1;
  const carrying = S.prog && S.prog.on === "carry";
  const gathered = kind === "add" && sol.carry > 0 && sumN >= sumS.length && carryN < 1 && !carrying;
  const strikeF = kind === "sub" && sol.need ? Math.min(brN, 5) / 5 : 0;
  const chipInTray = kind === "sub" && sol.need && brN >= 6 + topBigS.length;
  const cuts = kind === "sub" ? Math.min(spN, 9) : 0;
  const split = kind === "sub" && sol.need && spN >= 9;
  const sPad = sol ? lcPad(sol.small, B) : "";
  const bigS = sol ? String(sol.big) : "";

  /* the answer row: B box characters, the digits with no box, and the larger part */
  let ansCells: string[] = [], ansOver = "", ansBig = "";
  if (hasAns && rowsIn) {
    if (full) { ansCells = sPad.split(""); ansBig = bigS; }
    else if (asking) {
      const tp = slotPartsOf(ty, 2);
      const sm = dm && !fresh && d >= 3 ? sPad : String(tp[1] || "");
      ansBig = dm && !fresh && d >= 4 ? bigS : String(tp[0] || "");
      ansOver = sm.length > B ? sm.slice(0, sm.length - B) : "";
      const tail = sm.slice(ansOver.length);
      ansCells = lcSeq(B).map((k) => (k >= B - tail.length ? tail[k - (B - tail.length)] : ""));
    } else {
      const nS = kind === "add" ? Math.max(0, Math.min(B, carryN - 1)) : Math.min(tkN, B);
      const nB = kind === "add" ? addBigN : Math.max(0, tkN - B);
      ansCells = lcSeq(B).map((k) => (k < nS ? sPad[k] : ""));
      ansBig = bigS.slice(0, nB);
      if (ansBig.length < bigS.length && nB > 0) ansBig = bigS.slice(0, nB);
    }
  }
  /* a zero is grey only where it fills an empty place in front of the number */
  const greyOf = (cells: string[]) => { let lead = true; return cells.map((c, k) => { if (c && c !== "0") lead = false; return lead && c === "0" && k < cells.length - 1; }); };

  /* the rows' smaller parts */
  const rowCells = (r: number): { cells: string[]; grey: boolean[] } => {
    const blank = lcSeq(B).map(() => "");
    if (!rowsIn) return { cells: blank, grey: blank.map(() => false) };
    const v = rows[r][1];
    if (kind === "warm1") {
      const s = String(v), off = B - s.length;
      const cells = lcSeq(B).map((k) => (k >= off ? (k - off < R("ones") ? s[k - off] : "") : R("hundreds") > k ? "0" : ""));
      return { cells, grey: cells.map((c, k) => k < off && c === "0") };
    }
    if (kind === "place") {
      let s = "";
      let trailZeros = 0;
      if (full) s = String(item.answer);
      else if (dm && !fresh) {
        if (d >= 1) s = String(item.answer);
        else { s = dm.typed.replace(/[^0-9]/g, "").slice(0, B); trailZeros = B - s.length; s = s + "0".repeat(trailZeros); }
      } else s = ty.replace(/[^0-9]/g, "").slice(0, B);
      const cells = lcSeq(B).map((k) => s[k] || "");
      const g = greyOf(cells).map((x, k) => x || k >= B - trailZeros);
      return { cells, grey: g };
    }
    if (r === placeRow) {
      let at = full || (dm && d >= 1) ? B - 1 : S.at;
      let atN = full || (dm && d >= 1) ? B : S.atN;
      /* the correction's first frame redraws the child's misconception: a sum typed as the near miss put the 9 in the hundreds box */
      if (dm && !fresh && d === 0 && (S.at === null || S.at === undefined) && slotPartsOf(dm.typed, 2).join("|") === item.near) { at = 0; atN = B; }
      if (at === null || at === undefined) return { cells: blank, grey: blank.map(() => false) };
      const order = [at, ...lcSeq(B).filter((j) => j !== at)];
      const cells = lcSeq(B).map((j) => (order.indexOf(j) < atN ? (j === at ? String(v) : "0") : ""));
      return { cells, grey: cells.map((c, j) => j !== at && c === "0") };
    }
    const cells = lcPad(v, B).split("");
    return { cells, grey: greyOf(cells) };
  };
  const rowBig = (r: number) => {
    if (!rowsIn) return "";
    const v = rows[r][0];
    if (v === null || v === undefined) return "";
    if (kind === "warm1") return String(v).slice(0, R("big"));
    return String(v);
  };

  /* ── the acts: every one is performed on screen (api.act), the board reacts as the tool passes each point ── */
  const playing = useRef(false);
  const [actOn, setActOn] = useState(false);
  const lastKey = useRef(0);
  const ptsAt = (pts: any[]) => pts.map(ax);
  const pen = (pts: any[], onP: any, ms?: number) => api.act({ tool: "pencil", moves: "push", at: ptsAt(pts), onPoint: onP, ms: ms || 900 });
  /* a Devanagari or Gujarati chip label hangs its line and hooks high: the chip is 52 tall there and the text sits lower */
  const chipTall = lang !== "en";
  const chipNode = (label: string) => (
    <g>
      <rect x={-54} y={chipTall ? -26 : -22} width={108} height={chipTall ? 52 : 44} rx={11} fill={tint(LC_AMBER, 0.45)} stroke={shade(LC_AMBER, 0.3)} strokeWidth={2} />
      <text y={chipTall ? 14 : 11} textAnchor="middle" fontSize={lcFit(label, T.label, 96)} fontWeight={700} fill={LC_INK_AMBER}>{label}</text>
    </g>
  );
  const trayC = { x: LC.cx, y: LC.trayY + 62 };
  /* the carried chip rides over the larger column, left of its numbers and below the heading, clear of both in every language */
  const addChipC = { x: 72, y: LC.chipY + (chipTall ? 26 : 24) };
  const subChipC = { x: 118, y: LC.chipY + 21 };
  const boxPt = (k: number, top: number) => ({ x: lcBoxX(B, k) + LC.boxW / 2, y: top + 30 });
  const bigPts = (s: string, top: number) => lcCharXs(s, LC.bigR, T.xl).map((x) => ({ x, y: top + 30 }));
  const runAct = async (on: string, k: number): Promise<boolean> => {
    const setP = (name: string, p: number) => putE(k, { prog: { on: name, p } });
    const doBreak = async (name: string, ms?: number) => {
      const xs = lcCharXs(String(rows[0][0]), LC.bigR, T.xl);
      const x1 = xs[0] - 22, x2 = LC.bigR + 6, y = lcRowY(0) + 26;
      const strike = lcSeq(5).map((i) => ({ x: x1 + ((x2 - x1) * (i + 1)) / 5, y }));
      const nb = lcCharXs(topBigS, LC.bigR, T.prompt).map((x) => ({ x, y: LC.chipY + 20 }));
      setP(name, 0);
      if (!(await pen([...strike, ...nb], (i: number) => setP(name, i + 1), ms))) return false;
      await lcWait(70);
      return api.act({ tool: "hand", moves: "carry", from: ax(subChipC), at: [ax(trayC)], hold: chipNode("1 " + tx(P.big)), ms: ms || 1000,
        onPoint: () => setP(name, 6 + topBigS.length) });
    };
    const doSplit = async (name: string, ms?: number) => {
      setP(name, 0);
      const cutPts = lcSeq(9).map((i) => ({ x: LC.trayX + (i + 1) * 28, y: trayC.y }));
      if (!(await api.act({ tool: "knife", moves: "slice", at: ptsAt(cutPts), ms: ms || 1000, onPoint: (i: number) => { setP(name, i + 1); if (i === 8) api.sfx.trade(); } }))) return false;
      await lcWait(70);
      const ns = lcCharXs(topSmallS, LC.boxR, T.prompt).map((x) => ({ x, y: LC.chipY + 20 }));
      return pen(ns, (i: number) => setP(name, 10 + i), ms);
    };
    if (on === "big") return pen(bigPts(String(rows[0][0]), lcRowY(0)), (i: number) => setP(on, i + 1));
    if (on === "ones") {
      const s = String(rows[0][1]);
      return pen(s.split("").map((_, j) => boxPt(B - s.length + j, lcRowY(0))), (i: number) => setP(on, i + 1));
    }
    if (on === "hundreds") return pen(lcSeq(B - String(rows[0][1]).length).map((j) => boxPt(j, lcRowY(0))), (i: number) => setP(on, i + 1));
    if (on === "add-small") {
      const xs = lcCharXs(sumS, LC.cx + 40, T.xl);
      return pen(xs.map((x) => ({ x, y: 128 })), (i: number) => setP(on, i + 1));
    }
    if (on === "carry") {
      setP(on, 0);
      if (!(await api.act({ tool: "hand", moves: "carry", from: ax(trayC), at: [ax(addChipC)], hold: chipNode(sol.carry + " " + tx(P.big)), ms: 1000,
        onPoint: () => { setP(on, 1); api.sfx.trade(); } }))) return false;
      await lcWait(70);
      return pen(lcSeq(B).map((j) => boxPt(j, ansTop)), (i: number) => setP(on, 2 + i));
    }
    if (on === "add-big") return pen(bigPts(bigS, ansTop), (i: number) => setP(on, i + 1));
    if (on === "break") return doBreak(on);
    if (on === "split") return doSplit(on);
    if (on === "take") return pen([...lcSeq(B).map((j) => boxPt(j, ansTop)), ...bigPts(bigS, ansTop)], (i: number) => setP(on, i + 1));
    if (on === "brk") {
      /* at a question one Break is two acts: the hand lifts one larger unit off the top number (struck through, one less written
         over it, as it leaves) and lays it in the tray; the knife cuts it into the joining number of pieces, which join the smaller
         number on top (rewritten in amber). About 2.5 s in all */
      setP("break", 0);
      if (!(await api.act({ tool: "hand", moves: "carry", from: ax({ x: subChipC.x - 40, y: subChipC.y - 40 }), at: [ax(subChipC), ax(trayC)],
        hold: chipNode("1 " + tx(P.big)), ms: 800, onPoint: (i: number) => setP("break", i === 0 ? 5 + topBigS.length : 6 + topBigS.length) }))) return false;
      putE(k, (b: any) => ({ done: b.done.concat(["break"]), prog: null }));
      await lcWait(70);
      setP("split", 0);
      const cutPts = lcSeq(9).map((i) => ({ x: LC.trayX + (i + 1) * 28, y: trayC.y }));
      return api.act({ tool: "knife", moves: "slice", at: ptsAt(cutPts), ms: 800,
        onPoint: (i: number) => { setP("split", i < 8 ? i + 1 : 9 + topSmallS.length); if (i === 8) api.sfx.trade(); } });
    }
    if (on === "pair-cm") return api.act({ tool: "hand", moves: "tap", at: [ax({ x: 2 * LC.swP + LC.swW / 2, y: 36 })], onPoint: () => setP(on, 1) });
    if (on.indexOf("box-") === 0) {
      const kk = Number(on.slice(4)) - 1;
      const order = [kk, ...lcSeq(B).filter((j) => j !== kk)];
      putE(k, { at: kk, atN: 0 });
      return pen(order.map((j) => boxPt(j, lcRowY(0))), (i: number) => putE(k, { atN: i + 1 }));
    }
    return false;
  };
  const perform = async (on: string) => {
    if (playing.current) return;
    const k = e, wasWarm = warm;
    playing.current = true;
    setActOn(true);
    setDemo(null);
    api.lock(true);   /* held across the whole chain: between two acts the runtime's own lock drops for a frame (NOTES runtime gap) */
    let ok = false;
    try { ok = await runAct(on, k); } catch (err) { ok = false; }
    /* the runtime clears `acting` a frame before its act layer goes (NOTES runtime-gap list): let that frame pass alone */
    await lcWait(70);
    playing.current = false;
    setActOn(false);
    if (!locked.current) api.lock(false);
    if (!ok) { putE(k, { prog: null }); return; }
    if (on.indexOf("box-") === 0) { api.sfx.tick(); return; }
    const names = on === "brk" ? ["break", "split"] : [on];
    putE(k, (b: any) => ({ done: b.done.concat(names), prog: null }));
    if (on === "take" || on === "add-big") api.sfx.settle();
    if (wasWarm) api.did(on);
  };
  /* the free play's next act, in the book's order */
  const freeNext = free ? (LC_SEQ[kind] || []).find((s: string) => S.done.indexOf(s) < 0) || null : null;
  /* every tap on a control: the step's act, or a wrong act reported (the runtime shows the step's hint) */
  const tap = (on: string) => {
    if (free) { if (on === freeNext) perform(on); return; }
    if (warm) { if (stepOn && on === stepOn) perform(on); else api.did(on); return; }
    if (asking) perform(on);
  };
  const pressKey = (on: string) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; tap(on); };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  /* a physical Enter performs a step at most once in 400 ms (in reduced motion an act ends at once); the agent's check() is not held */
  const lastEnterKey = useRef(0), lastEnterStep = useRef(0);
  const enterStep = () => {
    if (!stepOn) return;
    const t = Date.now();
    if (t - lastEnterKey.current < 80) { if (t - lastEnterStep.current < 400) return; lastEnterStep.current = t; }
    tap(stepOn);
  };
  api.onEnter(stage === "demo" && stepOn ? enterStep : null);
  /* Enter on an empty answer box does nothing in the runtime: ring that box for 1.6 s and, when no hint is up, say why */
  const liveRef = useRef<any>({});
  liveRef.current = { asking, item, ty, part, e, busy: tl.busy, api };
  const [nudge, setNudge] = useState<any>(null);
  const nudged = useRef("");
  const tryNudge = () => {
    const L = liveRef.current;
    if (!L.asking || !L.item || !L.item.parts || L.busy || playing.current) return;
    const ps = slotPartsOf(L.ty, 2), at = Math.min(L.part || 0, 1);
    if (ps[at] !== "" || ps.every((x: string) => x === "")) return;
    const t = Date.now();
    setNudge({ e: L.e, k: at, t });
    setTimeout(() => setNudge((p: any) => (p && p.t === t ? null : p)), 1600);
    let hintUp = false;
    try { const g = (window as any).toolApi.getState(); hintUp = !!g.hint && g.hintKind !== "type"; } catch (err) { hintUp = false; }
    if (!hintUp && !nudged.current) { L.api.say("Every box needs a number, even a zero."); nudged.current = L.item.say; }
  };
  useEffect(() => {
    const kd = (ev: any) => { if (ev.key !== "Enter" || ev.repeat) return; lastEnterKey.current = Date.now(); tryNudge(); };
    const pu = (ev: any) => { const el = ev.target && ev.target.closest ? ev.target.closest('[data-control="key-enter"]') : null; if (el) tryNudge(); };
    window.addEventListener("keydown", kd, true);
    window.addEventListener("pointerup", pu, true);
    return () => { window.removeEventListener("keydown", kd, true); window.removeEventListener("pointerup", pu, true); };
  }, []);
  /* the child's next keystroke after a nudge brings the question back */
  useEffect(() => { if (nudged.current && asking) { const q = nudged.current; nudged.current = ""; api.say(q); } }, [ty]);
  useEffect(() => { nudged.current = ""; }, [qk]);
  /* the dev solve() calls this again and again: a call that comes while an act plays waits its turn (at most the steps left),
     so a driven walk never drops a step; a child's tap or Enter during an act is ignored as before */
  const pend = useRef(0);
  const stepsLeft = (PHASES[n - 1] && PHASES[n - 1].steps ? PHASES[n - 1].steps.length : 0) - ((step || 0) + 1);
  HOOK.demo = () => {
    if (!stepOn) return undefined;
    if (playing.current) { pend.current = Math.min(pend.current + 1, Math.max(0, stepsLeft)); return undefined; }
    return tap(stepOn);
  };
  useEffect(() => { if (stage === "demo" && stepOn && pend.current > 0 && !playing.current) { pend.current -= 1; tap(stepOn); } }, [stepOn, stage]);
  useEffect(() => { pend.current = 0; }, [qk]);
  HOOK.type = (v: any) => { api.setTyped(String(v).replace(/[^0-9]/g, "")); return true; };

  /* the traceback: the child's answer drawn, then the maths redrawn in steps, ending on the whole right answer */
  const locked = useRef(false);
  useEffect(() => {
    if (!wrong || stage !== "ask" || free || !item) return;
    const t0 = ty, k = e;
    locked.current = true;
    api.lock(true);
    const steps: any[] = [];
    for (let s = 0; s <= FIN; s++) {
      if (kind === "add" && sol && sol.carry === 0 && s === 2) continue;
      steps.push([s === 0 ? 600 : 1000, () => setDemo({ e: k, d: s, typed: t0 })]);
    }
    tl.run(steps, () => { locked.current = false; api.lock(false); });
  }, [wrong]);
  /* a correction never outlives its question */
  useEffect(() => () => { tl.stop(); if (locked.current) { locked.current = false; api.lock(false); } }, [qk]);
  /* the boxes take what they can hold: a "place" answer its B digits, a smaller part one digit more (the one with no box) */
  useEffect(() => {
    if (!asking || !item) return;
    if (kind === "place") { const s = ty.replace(/[^0-9]/g, ""); if (s.length > B) api.setTyped(s.slice(0, B)); return; }
    if (item.parts) {
      const tp = String(ty).split("|"), a0 = tp[0] || "", b0 = tp[1] || "";
      if (a0.length > 3 || b0.length > B + 1) api.setTyped(a0.slice(0, 3) + (tp.length > 1 ? "|" + b0.slice(0, B + 1) : ""));
    }
  }, [ty]);
  /* the win line, once per entry */
  const saidWin = useRef("");
  useEffect(() => {
    if (free || !item || stage !== "win" || !item.win) return;
    const k = qk + ":" + e;
    if (saidWin.current === k) return;
    saidWin.current = k;
    api.say(item.win);
  }, [stage, qk]);

  /* what the host and the agent read back (toolApi.getState); never the answer before it is given */
  api.share({
    unitPair: P.label, operation: it.op === "-" ? "take away" : it.op === "+" ? "add" : "write",
    rows: rows.map((r: any) => (r[0] === null ? "" : r[0] + " " + it.pair + " ") + r[1] + " " + LC_PAIRS[it.pair].small),
    carries: chipUp ? sol.carry : 0, breaks: split ? 1 : 0, complete: stage === "idle",
  });

  /* ── drawing (helpers are called, never mounted) ── */
  const busy = tl.busy && !!dm;
  const signLit = (busy && d === 2) || (S.prog && ["carry", "split", "pair-cm"].indexOf(S.prog.on) >= 0);
  const litSmall = busy && ((kind === "add" && (d === 1 || d === 3)) || (kind === "sub" && (d === 2 || d === 3)));
  const litBig = busy && ((kind === "add" && d === 4) || (kind === "sub" && (d === 1 || d === 4)));
  const digit = (ch: string, x: number, y: number, fill: string, size: number, key: string) =>
    <text key={key} x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>{ch}</text>;
  /* a number written digit by digit at fixed places, as ONE text (each digit its own x), so it reads as the whole number */
  const spread = (cs: { ch: string; x: number; fill: string }[], y: number, size: number, key: string) => (cs.length ? (
    <text key={key} y={y} textAnchor="middle" fontSize={size} fontWeight={700}>
      {cs.map((c, j) => <tspan key={j} x={c.x} fill={c.fill}>{c.ch}</tspan>)}
    </text>
  ) : null);
  const bigText = (s: string, top: number, key: string, ink: string) =>
    spread(lcCharXs(s, LC.bigR, T.xl).map((x, j) => ({ ch: s[j], x, fill: ink })), top + LC.base, T.xl, key);
  const boxRow = (top: number, key: string, cells: string[], grey: boolean[], ring: boolean) => (
    <g key={key}>
      {lcSeq(B).map((k) => (
        <rect key={"b" + k} x={lcBoxX(B, k)} y={top} width={LC.boxW} height={LC.boxH} rx={10} fill="#FFFFFF"
          stroke={ring ? C.accent : tint(C.ink, 0.45)} strokeWidth={ring ? 4 : 2.5} />
      ))}
      {spread(cells.map((c, k) => ({ ch: c, x: lcBoxX(B, k) + LC.boxW / 2, fill: grey[k] ? LC_ZERO : LC_INK_SMALL })).filter((c) => !!c.ch), top + LC.base, T.xl, "d")}
    </g>
  );

  /* the unit switch: three live keys in free play and in the phase 4 warm-up (where the child sets it); everywhere else only
     the pair the frame is set to, one plain tag, so nothing there looks like a key to tap */
  const unitSwitch = () => {
    const live = free || (warm && !!it.from);
    return (
      <g>
        {LC_PAIR_KEYS.map((k, i) => {
          const x = i * LC.swP, on = (free ? fp.pair : pairNow) === k, label = tx(LC_PAIRS[k].label), fs = lcFit(label, T.label, LC.swW - 20);
          if (live) return (
            <g key={k}>
              <Key id={"pair-" + k} x={x} y={0} w={LC.swW} h={72} C={C} tone="key"
                onClick={() => { if (!free) { tap("pair-" + k); return; } if (!playing.current) setFree({ pair: k, rows: lcDeal(k, fp.op) }); }}
                label={"set the columns to " + LC_PAIRS[k].bigWord + " and " + LC_PAIRS[k].smallWord}>
                <text y={11} textAnchor="middle" fontSize={fs} fontWeight={700} fill={toneInk("key", C.ink)}>{label}</text>
              </Key>
              {on && <rect x={x + 5} y={5} width={LC.swW - 10} height={62} rx={14} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}
            </g>
          );
          if (!on) return null;
          return (
            <g key={k}>
              <rect x={0} y={4} width={LC.swW} height={64} rx={14} fill={shade(C.accent, 0.22)} />
              <text x={LC.swW / 2} y={47} textAnchor="middle" fontSize={fs} fontWeight={700} fill="#FFFFFF">{label}</text>
            </g>
          );
        })}
      </g>
    );
  };
  /* the joining sign: "=" at the box's centre, so both sides sit clear of the box in every language */
  const joiningSign = () => {
    const sl = "1 " + tx(P.big), sr = indian(J) + " " + tx(P.small);
    const fs = lcFit(sl + " = " + sr, T.label, LC.W - LC.signX - 24);
    const wl = lcTW(sl, fs), wr = lcTW(sr, fs), gap = fs * 0.6;
    const x1 = LC.signX + (LC.W - LC.signX - (wl + wr + 2 * gap)) / 2;
    return (
      <g>
        <rect x={LC.signX} y={4} width={LC.W - LC.signX} height={64} rx={16} fill={signLit ? tint(LC_AMBER, 0.75) : "#FFFFFF"} stroke={signLit ? shade(LC_AMBER, 0.3) : C.ink} strokeWidth={signLit ? 5 : 2} />
        <text x={x1 + wl} y={47} textAnchor="end" fontSize={fs} fontWeight={700} fill={C.ink}>{sl}</text>
        <text x={x1 + wl + gap} y={47} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>=</text>
        <text x={x1 + wl + 2 * gap} y={47} fontSize={fs} fontWeight={700} fill={C.ink}>{sr}</text>
      </g>
    );
  };

  const frame = () => (
    <g>
      <rect x={0} y={LC.top} width={LC.frameW} height={fBot - LC.top} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {litSmall && <rect x={LC.div + 8} y={LC.top + 8} width={LC.frameW - LC.div - 16} height={fBot - LC.top - 16} rx={14} fill={tint(C.accent, 0.86)} />}
      {litBig && <rect x={56} y={LC.top + 8} width={LC.div - 64} height={fBot - LC.top - 16} rx={14} fill={tint(C.accent, 0.86)} />}
      <text x={146} y={headY} textAnchor="middle" fontSize={lcFit(tx(P.big), T.label, 170)} fontWeight={700} fill={LC_INK_BIG}>{tx(P.big)}</text>
      {(() => {
        const fs = lcFit(tx(P.small), T.label, LC.frameW - LC.div - 24), hw = lcTW(tx(P.small), fs);
        return <text x={Math.min((lcBoxX(B, 0) + LC.boxR) / 2, LC.frameW - 10 - hw / 2)} y={headY} textAnchor="middle" fontSize={fs} fontWeight={700} fill={LC_INK_SMALL}>{tx(P.small)}</text>;
      })()}
      <line x1={LC.div} y1={LC.top + 8} x2={LC.div} y2={fBot - 8} stroke={C.ink} strokeWidth={3} />
      {chipRow()}
      {rows.map((r: any, i: number) => {
        const top = lcRowY(i);
        const rc = rowCells(i);
        const ring = kind === "place" && asking && !!box && box.open;
        return (
          <g key={"row" + i}>
            {boxRow(top, "bx" + i, rc.cells, rc.grey, ring)}
            {bigText(rowBig(i), top, "big" + i, LC_INK_BIG)}
          </g>
        );
      })}
      {strikeF > 0 && (() => {
        const xs = lcCharXs(String(rows[0][0]), LC.bigR, T.xl);
        const x1 = xs[0] - 22, x2 = LC.bigR + 6;
        return <line x1={x1} y1={lcRowY(0) + 26} x2={x1 + (x2 - x1) * strikeF} y2={lcRowY(0) + 26} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />;
      })()}
      {it.op && (free ? (
        <Key id="sign" x={8} y={lcRowY(nR - 1) - 12} w={72} h={72} rx={36} C={C} tone="key" onClick={() => { if (!playing.current) { const op = fp.op === "+" ? "-" : "+"; setFree({ op, rows: lcDeal(fp.pair, op) }); } }} label="swap plus and minus">
          <text y={20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={toneInk("key", C.ink)}>{fp.op === "-" ? "−" : "+"}</text>
        </Key>
      ) : <text x={34} y={lcRowY(nR - 1) + LC.base} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{it.op === "-" ? "−" : "+"}</text>)}
      {hasAns && (
        <g>
          <line x1={12} y1={ansTop - 6} x2={LC.frameW - 12} y2={ansTop - 6} stroke={C.ink} strokeWidth={3} />
          <rect x={92} y={ansTop} width={144} height={LC.boxH} rx={10} fill="#FFFFFF"
            stroke={asking && box && box.open && part === 0 ? C.accent : tint(C.ink, 0.45)} strokeWidth={asking && box && box.open && part === 0 ? 4 : 2.5} />
          {boxRow(ansTop, "ans", ansCells, greyOf(ansCells), asking && !!box && box.open && part === 1, asking && !!box && box.open && part === 1 ? Math.max(0, B - 1 - (slotPartsOf(ty, 2)[1] || "").length) : void 0)}
          {bigText(ansBig, ansTop, "ansbig", LC_INK_BIG)}
          {/* Enter on an empty answer box: that box is ringed for 1.6 s */}
          {nudge && nudge.e === e && (nudge.k === 0
            ? <rect x={86} y={ansTop - 6} width={156} height={LC.boxH + 12} rx={14} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
            : <rect x={lcBoxX(B, 0) - 6} y={ansTop - 6} width={LC.boxR - lcBoxX(B, 0) + 12} height={LC.boxH + 12} rx={14} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />)}
          {ansOver.split("").map((c, j) => {
            const gx = lcBoxX(B, 0) - 8 - (ansOver.length - j) * 56 + 6;
            return (
              <g key={"ov" + j}>
                <rect x={gx} y={ansTop} width={50} height={LC.boxH} rx={10} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="7 7" />
                {digit(c, gx + 25, ansTop + LC.base, LC_INK_SMALL, T.xl, "ovd" + j)}
              </g>
            );
          })}
        </g>
      )}
      {/* the tap targets: phase 1's warm-up (the km column and each metres box) and ML1's boxes for its 9 */}
      {warm && kind === "warm1" && (
        <g>
          <Hit id="big" x={56} y={lcRowY(0) - 6} w={184} h={72} onPress={() => tap("big")} label="write the kilometres in the km column" />
          {lcSeq(B).map((k) => (
            <Hit key={"wb" + k} id={["hundreds", "tens", "ones"][3 - B + k]} x={lcBoxX(B, k) - 3} y={lcRowY(0) - 6} w={LC.boxW + 6} h={72}
              onPress={() => tap(["hundreds", "tens", "ones"][3 - B + k])} label={"the " + ["hundreds", "tens", "ones"][3 - B + k] + " box"} />
          ))}
        </g>
      )}
      {asking && placeRow !== undefined && !tl.busy && (
        lcSeq(B).map((k) => (
          <Hit key={"put" + k} id={"box-" + (k + 1)} x={lcBoxX(B, k) - 3} y={lcRowY(placeRow) - 6} w={LC.boxW + 6} h={72}
            onPress={() => tap("box-" + (k + 1))} label={"put the " + rows[placeRow][1] + " in the " + ["hundreds", "tens", "ones"][3 - B + k] + " box"} />
        ))
      )}
    </g>
  );

  /* a carried chip rides over the larger column; a break writes one less above the larger number on top and the grown
     smaller number above its boxes, in amber */
  function chipRow() {
    const out: any[] = [];
    if (chipUp) out.push(
      <g key="chip" transform={`translate(${addChipC.x},${addChipC.y})`}>{chipNode(sol.carry + " " + tx(P.big))}</g>
    );
    if (kind === "sub" && sol.need) {
      const nb = Math.max(0, Math.min(topBigS.length, brN - 5));
      out.push(spread(lcCharXs(topBigS, LC.bigR, T.prompt).slice(0, nb).map((x, j) => ({ ch: topBigS[j], x, fill: LC_INK_AMBER })), LC.amber, T.prompt, "nb"));
      const ns = Math.max(0, Math.min(topSmallS.length, spN - 9));
      out.push(spread(lcCharXs(topSmallS, LC.boxR, T.prompt).slice(0, ns).map((x, j) => ({ ch: topSmallS[j], x, fill: LC_INK_AMBER })), LC.amber, T.prompt, "ns"));
    }
    return <g>{out}</g>;
  }

  /* the right panel: the card of the given length (phase 1, the phase 4 warm-up before the switch), the carry box, the tray */
  const card = () => {
    if (kind === "warm1" || kind === "place" || placeRow !== undefined) {
      const r = rows[placeRow !== undefined ? placeRow : 0];
      const Q = LC_PAIRS[it.pair];
      const cs = (r[0] !== null ? r[0] + " " + tx(Q.big) + " " : "") + r[1] + " " + tx(Q.small);
      return (
        <g>
          <rect x={600} y={LC.top} width={296} height={96} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
          <text x={LC.cx} y={LC.top + 63} textAnchor="middle" fontSize={lcFit(cs, T.speech, 268)} fontWeight={700}>
            {r[0] !== null && <tspan fill={LC_INK_BIG}>{r[0] + " " + tx(LC_PAIRS[it.pair].big) + " "}</tspan>}
            <tspan fill={LC_INK_SMALL}>{r[1] + " " + tx(LC_PAIRS[it.pair].small)}</tspan>
          </text>
        </g>
      );
    }
    if (it.from && !rowsIn) {
      const Q = LC_PAIRS[it.pair];
      return (
        <g>
          <rect x={600} y={LC.top} width={296} height={130} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
          {rows.map((r: any, i: number) => (
            <text key={"c" + i} x={LC.cx + 16} y={LC.top + 52 + i * 54} textAnchor="middle" fontWeight={700}
              fontSize={Math.min(...rows.map((q: any) => lcFit(q[0] + " " + tx(Q.big) + " " + q[1] + " " + tx(Q.small), T.prompt, 240)))}>
              <tspan fill={LC_INK_BIG}>{r[0] + " " + tx(Q.big) + " "}</tspan>
              <tspan fill={LC_INK_SMALL}>{r[1] + " " + tx(Q.small)}</tspan>
            </text>
          ))}
          <text x={624} y={LC.top + 106} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>−</text>
        </g>
      );
    }
    return null;
  };
  const carryBox = () => {
    if (kind !== "add") return null;
    /* at a question the box stands only once the correction (or the win) writes in it */
    if (!warm && !free && sumN < 1) return null;
    const y0 = placeRow !== undefined ? 188 : LC.top;
    const nS = Math.min(sumS.length, sumN);
    const two = chipUp;
    const xs = lcCharXs(sumS, LC.cx + 40, two ? T.label : T.xl);
    const by = two ? y0 + 44 : y0 + 76;
    return (
      <g>
        <rect x={600} y={y0} width={296} height={116} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        {spread(xs.slice(0, nS).map((x, j) => ({ ch: sumS[j], x, fill: LC_INK_SMALL })), by, two ? T.label : T.xl, "sum")}
        {nS >= sumS.length && sumS.length > 0 && <text x={LC.cx + (two ? 50 : 54)} y={by} fontWeight={700} fill={LC_INK_SMALL}
          fontSize={lcFit(tx(P.small), two ? T.label : T.xl, 888 - LC.cx - (two ? 50 : 54))}>{tx(P.small)}</text>}
        {two && (
          <text x={LC.cx} y={y0 + 96} textAnchor="middle" fontWeight={700}
            fontSize={lcFit(sol.carry + " " + tx(P.big) + " " + sol.small + " " + tx(P.small), T.label, 272)}>
            <tspan fill={LC_INK_AMBER}>{sol.carry + " " + tx(P.big) + " "}</tspan>
            <tspan fill={LC_INK_SMALL}>{sol.small + " " + tx(P.small)}</tspan>
          </text>
        )}
      </g>
    );
  };
  /* one larger unit as the joining number of smaller pieces: ten slivers of a centimetre, a hundred strips of a metre,
     ten bars of 100 m for a kilometre; whole (a broken unit before its split), gathered (a carry) or loose (a split) */
  const tray = () => {
    const X = LC.trayX, Y = LC.trayY;
    const pieces = (Jv: number) => {
      const bits: any[] = [];
      if (Jv === 100) for (let i = 0; i < 100; i++) bits.push(<rect key={i} x={X + 4 + (i % 10) * 27.6} y={Y + 6 + Math.floor(i / 10) * 11.6} width={23} height={8} rx={2} />);
      else for (let i = 0; i < 10; i++) {
        bits.push(<rect key={i} x={X + 5 + i * 27.6} y={Y + 6} width={20} height={110} rx={4} />);
        if (Jv === 1000) for (let t = 1; t < 10; t++) bits.push(<line key={i + "t" + t} x1={X + 5 + i * 27.6} y1={Y + 6 + t * 11} x2={X + 25 + i * 27.6} y2={Y + 6 + t * 11} stroke={shade(LC_AMBER, 0.3)} strokeWidth={1.2} />);
      }
      return <g fill={tint(LC_AMBER, 0.25)} stroke={shade(LC_AMBER, 0.3)} strokeWidth={1.5}>{bits}</g>;
    };
    const label = (s: string) => <text x={LC.cx} y={Y + 162} textAnchor="middle" fontSize={lcFit(s, T.label, 276)} fontWeight={700} fill={LC_INK_AMBER}>{s}</text>;
    if (gathered) return (
      <g pointerEvents="none">
        <rect x={X - 4} y={Y - 2} width={288} height={130} rx={16} fill={tint(LC_AMBER, 0.7)} stroke={shade(LC_AMBER, 0.3)} strokeWidth={5} />
        {pieces(J)}
        {label(sol.carry + " " + tx(P.big))}
      </g>
    );
    if (split) return <g pointerEvents="none">{pieces(J)}{label(indian(J) + " " + tx(P.small))}</g>;
    if (chipInTray) return (
      <g pointerEvents="none">
        <rect x={X + 4} y={Y + 26} width={272} height={72} rx={14} fill={tint(LC_AMBER, 0.45)} stroke={shade(LC_AMBER, 0.3)} strokeWidth={3} />
        {lcSeq(cuts).map((i) => <line key={"cut" + i} x1={X + (i + 1) * 28} y1={Y + 22} x2={X + (i + 1) * 28} y2={Y + 102} stroke={C.ink} strokeWidth={3} />)}
        {label("1 " + tx(P.big))}
      </g>
    );
    return null;
  };

  /* the length bars, one scale: a ruler of one larger unit for a smaller part on its own (phase 1); a sum laid end to
     end; a take-away one along the other, the difference in reddish purple */
  const ribbonSeg = (x: number, y: number, w: number, h: number, fill: string, key: string, op = 0.72) => (w <= 0 ? null : (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} fill={fill} />
      <Skin name="ribbon" x={x} y={y} w={w} h={h} fit="stretch" />
      <rect x={x} y={y} width={w} height={h} fill={fill} fillOpacity={op} />
    </g>
  ));
  const barLine = (x: number, y: number, w: number, h: number, key: string, dashed: boolean) =>
    <rect key={key} x={x} y={y} width={w} height={h} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray={dashed ? "6 5" : undefined} />;
  const bars = () => {
    if (!rowsIn) return null;
    const x0 = 12, Lw = LC.frameW - 24;
    if (kind === "warm1" || kind === "place" || placeRow !== undefined) {
      /* a ruler of one larger unit, and under it the first tenth of it blown up ten times (a zoom), so a short smaller part is a
         real bar: 58 m is a sliver on the 1 km ruler and more than half of the 100 m zoom; a reading past the zoom runs off its end */
      const y0 = Math.min(fBot + 12, 520 - 126);
      const Lr = Lw - 96, Z = J / 10;
      const pr = placeRow !== undefined ? placeRow : 0;
      const cardV = rows[pr][1];
      let rowV: any = null;
      const rc = rowCells(pr);
      if (kind === "warm1") rowV = R("hundreds") >= 1 ? cardV : null;
      else if (kind === "place") rowV = full || (dm && !fresh) ? Number(rc.cells.join("") || 0) : null;
      else rowV = rc.cells.every((c) => c !== "") ? Number(rc.cells.join("")) : null;
      const wOf = (v: number) => Math.max(4, Math.min(Lr, (v / J) * Lr));
      const zOf = (v: number) => Math.max(4, Math.min(Lr, (v / Z) * Lr));
      const ruler = (y: number, key: string, lab: string) => (
        <g key={key}>
          <line x1={x0} y1={y} x2={x0 + Lr} y2={y} stroke={C.ink} strokeWidth={2.5} />
          {lcSeq(11).map((i) => <line key={i} x1={x0 + (i * Lr) / 10} y1={y - (i % 5 ? 6 : 9)} x2={x0 + (i * Lr) / 10} y2={y + 6}
            stroke={i ? C.ink : CONTENT.pointer} strokeWidth={i ? 2 : 4} />)}
          <text x={x0 + Lr + 10} y={y + (key === "r2" ? 12 : 10)} fontSize={T.micro} fontWeight={600} fill={C.ink}>{lab}</text>
        </g>
      );
      const off = rowV !== null && rowV > Z;
      return (
        <g pointerEvents="none">
          {ribbonSeg(x0, y0, wOf(cardV), 16, LC_GREEN, "card", LC_OP_GREEN)}
          {barLine(x0, y0, wOf(cardV), 16, "cardo", false)}
          {/* what the boxes read: the same ribbon, a dashed outline */}
          {rowV !== null && ribbonSeg(x0, y0 + 20, wOf(rowV), 16, LC_GREEN, "rowv", LC_OP_GREEN)}
          {rowV !== null && barLine(x0, y0 + 20, wOf(rowV), 16, "rowvo", true)}
          {ruler(y0 + 46, "r1", "1 " + tx(P.big))}
          {/* the zoom: the first tenth of the ruler, ten times as long */}
          <rect x={x0} y={y0 + 38} width={Lr / 10} height={16} fill={tint(C.accent, 0.8)} fillOpacity={0.6} />
          <line x1={x0} y1={y0 + 54} x2={x0} y2={y0 + 64} stroke={C.ink} strokeWidth={1.5} strokeDasharray="4 4" />
          <line x1={x0 + Lr / 10} y1={y0 + 54} x2={x0 + Lr} y2={y0 + 64} stroke={C.ink} strokeWidth={1.5} strokeDasharray="4 4" />
          {ribbonSeg(x0, y0 + 66, zOf(cardV), 16, LC_GREEN, "zcard", LC_OP_GREEN)}
          {barLine(x0, y0 + 66, zOf(cardV), 16, "zcardo", false)}
          {rowV !== null && ribbonSeg(x0, y0 + 86, zOf(rowV), 16, LC_GREEN, "zrow", LC_OP_GREEN)}
          {rowV !== null && barLine(x0, y0 + 86, zOf(rowV), 16, "zrowo", true)}
          {off && <path d={`M ${x0 + Lr + 2} ${y0 + 86} L ${x0 + Lr + 15} ${y0 + 93} L ${x0 + Lr + 2} ${y0 + 100} Z`} fill={C.ink} />}
          {ruler(y0 + 114, "r2", indian(Z) + " " + tx(P.small))}
        </g>
      );
    }
    const flat = rows.map((r: any) => (r[0] || 0) * J + r[1]);
    const y0 = fBot + 12;
    const tp = slotPartsOf(dm ? dm.typed : "", 2);
    /* the child's own answer, drawn under the bars through the correction (a dashed outline, a lighter tint) */
    const childV = asking && dm && !fresh && tp[0] !== "" ? Number(tp[0] || 0) * J + Number(tp[1] || 0) : null;
    /* one length: the whole units deep blue, the leftover green, a seam between them, a near-black outline */
    const seg = (r: any, x: number, y: number, k: number, key: string, dashed = false, faint = false) => {
      const wb = Math.max(0, (r[0] || 0) * J * k), ws = Math.max(3, r[1] * k);
      return (
        <g key={key}>
          {ribbonSeg(x, y, wb, 22, LC_BAR_BLUE, "b", faint ? 0.5 : LC_OP_BLUE)}
          {ribbonSeg(x + wb, y, ws, 22, LC_GREEN, "s", faint ? 0.3 : LC_OP_GREEN)}
          {wb > 0 && <line x1={x + wb} y1={y} x2={x + wb} y2={y + 22} stroke={C.ink} strokeWidth={2} />}
          {barLine(x, y, wb + ws, 22, "o", dashed)}
        </g>
      );
    };
    if (kind === "add") {
      const total = flat.reduce((a: number, b: number) => a + b, 0);
      const k = Lw / Math.max(total, childV || 0);
      let x = x0;
      return (
        <g pointerEvents="none">
          {rows.map((r: any, i: number) => { const g = seg(r, x, y0, k, "seg" + i); x += flat[i] * k; return g; })}
          {rows.slice(1).map((_: any, i: number) => {
            const xs = x0 + flat.slice(0, i + 1).reduce((a: number, b: number) => a + b, 0) * k;
            return <line key={"cut" + i} x1={xs} y1={y0 - 4} x2={xs} y2={y0 + 26} stroke={C.ink} strokeWidth={3} />;
          })}
          {childV !== null && seg([Number(tp[0] || 0), Number(tp[1] || 0)], x0, y0 + 28, k, "child", true, true)}
        </g>
      );
    }
    const k = Lw / Math.max(flat[0], childV !== null ? flat[1] + childV : 0);
    const fin = d >= 4 || (free && tkN >= ALL) || (warm && tkN > B);
    const diff = flat[0] - flat[1];
    return (
      <g pointerEvents="none">
        {seg(rows[0], x0, y0, k, "top")}
        {seg(rows[1], x0, y0 + 28, k, "bot")}
        {fin && ribbonSeg(x0 + flat[1] * k, y0 + 28, Math.max(3, diff * k), 22, LC_PURPLE, "diff")}
        {fin && barLine(x0 + flat[1] * k, y0 + 28, Math.max(3, diff * k), 22, "diffo", false)}
        {/* the child's own difference, laid from the same start: a lighter reddish purple, dashed; the part past (or short of)
            the top length's end is drawn at least 14 wide, with a heavy outline and an ink bracket 8 below it */}
        {childV !== null && (() => {
          const xs0 = x0 + flat[1] * k, xt = x0 + flat[0] * k;
          let xc = xs0 + childV * k;
          if (Math.abs(xc - xt) >= 0.5 && Math.abs(xc - xt) < 14) xc = xt + (xc > xt ? 14 : -14);
          const a = Math.min(xt, xc), b = Math.max(xt, xc), yb = y0 + 98;
          return (
            <g key="own">
              <rect x={xs0} y={y0 + 56} width={Math.max(3, xc - xs0)} height={22} fill={LC_PURPLE} fillOpacity={0.3} stroke={shade(LC_PURPLE, 0.35)} strokeWidth={2} strokeDasharray="6 5" />
              {b - a >= 0.5 && <rect x={a} y={y0 + 56} width={b - a} height={22} fill="none" stroke={C.ink} strokeWidth={4} />}
              {b - a >= 0.5 && <path d={`M ${a} ${yb - 12} L ${a} ${yb} L ${b} ${yb} L ${b} ${yb - 12}`} fill="none" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />}
            </g>
          );
        })()}
        {(fin || childV !== null) && <line x1={x0 + flat[0] * k} y1={y0 - 4} x2={x0 + flat[0] * k} y2={y0 + (childV !== null ? 82 : 54)} stroke={C.ink} strokeWidth={2} strokeDasharray="5 5" />}
      </g>
    );
  };

  /* the one action key at the foot of the right panel: in a guide step it names the step's act; at a take-away
     question it is Break (the child's own tool); in free play New stands beside it */
  const keys = () => {
    const out: any[] = [];
    const keyFor = (id: string, on: string, x: number, w: number, enabled: boolean) => {
      const lab = LC_KEY[on] || on;
      out.push(
        <Key key={"seq" + x} id={id} x={x} y={LC.keyY} w={w} h={72} C={C} tone="key" disabled={!enabled} onClick={() => pressKey(on)} label={lab}>
          <text y={10} textAnchor="middle" fontSize={lcFit(tx(lab), T.label, w - 22)} fontWeight={700} fill={enabled ? toneInk("key", C.ink) : C.ink}>{tx(lab)}</text>
        </Key>
      );
    };
    if (warm && stepOn && LC_KEY[stepOn]) keyFor(stepOn, stepOn, 628, 240, true);
    if (asking && kind === "sub" && sol.need && S.done.indexOf("split") < 0) keyFor("break", "brk", 628, 240, !tl.busy && !actOn);   /* live with the keypad open too: its key stands inside the 900-wide picture, clear of the pad */
    if (free) {
      out.push(
        <Key key="new" id="new" x={600} y={LC.keyY} w={120} h={72} C={C} tone="key" onClick={() => { if (!playing.current) setFree({ rows: lcDeal(fp.pair, fp.op) }); }} label="new lengths">
          <text y={10} textAnchor="middle" fontSize={lcFit(tx("New"), T.label, 100)} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("New")}</text>
        </Key>
      );
      if (freeNext) keyFor(freeNext, freeNext, 728, 168, true);
    }
    return <g>{out}</g>;
  };
  /* free play: a new deal is a new entry */
  function setFree(f: any) { tl.stop(); setDemo(null); setFp((p: any) => ({ ...p, ...f, k: p.k + 1 })); }

  /* the one invite: on the control the guide step waits for (none while a question is open) */
  const invite = () => {
    if (!warm || !stepOn) return null;
    if (stepOn === "big") return <Invite x={148} y={lcRowY(0) + 30} w={176} h={64} rx={12} C={C} />;
    if (stepOn === "ones" || stepOn === "hundreds") {
      const k = stepOn === "ones" ? B - 1 : 0;
      return <Invite x={lcBoxX(B, k) + LC.boxW / 2} y={lcRowY(0) + 30} w={LC.boxW} h={LC.boxH} rx={10} C={C} />;
    }
    if (stepOn === "pair-cm") return <Invite x={2 * LC.swP + LC.swW / 2} y={36} w={LC.swW - 14} h={58} rx={14} C={C} />;
    if (LC_KEY[stepOn]) return <Invite x={748} y={LC.keyY + 36} w={240} h={72} rx={18} C={C} />;
    return null;
  };

  return (
    <g transform={`translate(${ox},0)`}>
      {unitSwitch()}
      {joiningSign()}
      {frame()}
      {card()}
      {carryBox()}
      {tray()}
      {bars()}
      {keys()}
      {invite()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the length as the frame writes it,
   the larger unit blue, the smaller unit green with its zeros in front grey */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item: any = it || last.it || (n && PHASES[n - 1] ? PHASES[n - 1].items[last.item] : null) || {};
  const P = LC_PAIRS[item.pair] || LC_PAIRS.km;
  let big = "", small = "";
  if (item.kind === "place") { big = item.rows && item.rows[0][0] !== null ? String(item.rows[0][0]) : ""; small = String(last.value).replace(/[^0-9]/g, ""); }
  else { const p = slotPartsOf(last.value, 2); big = String(p[0] ?? ""); small = lcPad(Number(p[1] || 0), P.boxes); }
  const nz = small.search(/[1-9]/);
  const lead = nz < 0 ? Math.max(0, small.length - 1) : nz;
  /* a real picture: the length written over its own ribbon (whole units blue, the leftover green), shrunk to fit any language */
  const s = (big !== "" ? big + " " + tx(P.big) + " " : "") + small + " " + tx(P.small);
  const fs = lcFit(s, T.label, w - 20);
  const bv = Number(big || 0), sv = Number(small || 0), tot = bv * P.J + sv;
  const bw = w - 24, by = h - 20, wb = tot ? Math.round(((bv * P.J) / tot) * bw) : 0, ws = Math.max(4, bw - wb);
  const rib = (x: number, ww: number, fill: string, op: number, key: string) => (ww <= 0 ? null : (
    <g key={key}>
      <rect x={x} y={by} width={ww} height={12} fill={fill} />
      <Skin name="ribbon" x={x} y={by} w={ww} h={12} fit="stretch" />
      <rect x={x} y={by} width={ww} height={12} fill={fill} fillOpacity={op} />
    </g>
  ));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {rib(12, wb, LC_BAR_BLUE, LC_OP_BLUE, "tb")}
      {rib(12 + wb, ws, LC_GREEN, LC_OP_GREEN, "ts")}
      {wb > 0 && <line x1={12 + wb} y1={by} x2={12 + wb} y2={by + 12} stroke={C.ink} strokeWidth={1.5} />}
      <rect x={12} y={by} width={wb + ws} height={12} fill="none" stroke={C.ink} strokeWidth={1.5} />
      <text x={w / 2} y={by - 8} textAnchor="middle" fontSize={fs} fontWeight={700}>
        {big !== "" && <tspan fill={LC_INK_BIG}>{big + " " + tx(P.big) + " "}</tspan>}
        {lead > 0 && <tspan fill={LC_ZERO}>{small.slice(0, lead)}</tspan>}
        <tspan fill={LC_INK_SMALL}>{small.slice(lead) + " " + tx(P.small)}</tspan>
      </text>
    </g>
  );
}

function LengthColumns(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right */
      keyOnly: true,
      /* the wide keypad (LAYOUT.md §1b, PATTERNS.md 9g): the picture is 900 wide, so it fits x 64 to 964 */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d) */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default LengthColumns;
