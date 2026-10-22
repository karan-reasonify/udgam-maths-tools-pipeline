/* ═══ M2.S4.T7.C30.2D1 · litre_jug · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The new look (keyOnly, navDots, bigPad, nextKey): the question
   lives only in the bubble, one sentence a screen; every act the child taps is performed on screen (api.act).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), gets a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing).
   The picture is one 900 x 520 board, centred with the keypad shut and at the left with it open,
   never under the key's corner (box.key). Edit, never rewrite. */

const TOOL_ID = "litre_jug";
const MEDIA_ID = "M2.S4.T7.C30.2D1";
const TOOL_NAME = "Litre Jug";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has guide steps) */
const OPENING: string[] = [];
/* the whole-tool line (no longer shown from r44; kept for the sidecar) */
const FINISH_LINE = "Every container got its capacity, the glasses were counted, and every capacity was changed by a thousand.";
/* printed when the child opens Free play: exactly what the free branch draws (the pouring bay) */
const FREE_LINE = "Free play: pour the jug into the small or the big glasses, and back again.";

/* THE START PAGE: a tap filling a jug, two sizes of glass and a measuring jug (no digit that answers anything) */
const START_HOOK = "How much can each one hold?";
function StartArt({ box, C }: any) {
  const base = box.h - 40;
  return (
    <g>
      <rect x={60} y={base} width={box.w - 120} height={16} rx={8} fill={tint(C.rule, 0.45)} stroke={C.rule} strokeWidth={2} />
      {ljTap(C, 300, 120, ljSkinTop("jug", base, 182, 0.7), 1.3, 120)}
      {ljSkinV(C, "sa-jug", "jug", 300, base, 182, 0.7)}
      {[0, 1, 2].map((i) => <g key={"s" + i}>{ljSkinV(C, "sa-c" + i, "glass", 520 + i * 90, base, 76, 1)}</g>)}
      {[0, 1].map((i) => <g key={"b" + i}>{ljSkinV(C, "sa-g" + i, "glass", 820 + i * 120, base, 114, 1)}</g>)}
      {ljMJug(C, "sa-mj", 1080, base, 230, 600, false, [], null)}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled at the language pass, once the English is final. */
const TR: any = {
  hi: {
    "Litre Jug": "लीटर जग",
    "Pin one of the tags on first, then press Enter.": "पहले एक पर्ची लगाओ, फिर दर्ज करें दबाओ।",
    "Pin mL or L on both of them first, then press Enter.": "पहले दोनों पर मिली या ली लगाओ, फिर दर्ज करें दबाओ।",
    "It is already full right to the top.": "यह पहले से ही ठीक ऊपर तक भरा है।",
    "The jug is full, so pour it into empty glasses first.": "जग भरा है, तो पहले उसे खाली गिलासों में उँडेलो।",
    "The bottle is empty now: its 1 L is in the measuring jug.": "बोतल अब खाली है: उसका 1 ली मापने वाले जग में है।",
    "Free play: pour the jug into the small or the big glasses, and back again.": "मुक्त खेल: जग को छोटे या बड़े गिलासों में उँडेलो, और फिर वापस।",
    "How much can each one hold?": "हर एक में कितना आ सकता है?",
    "What capacity is": "धारिता क्या है",
    "Tap the water tap to fill the mug right to the top.": "मग को ऊपर तक भरने के लिए पानी का नल दबाओ।",
    "The tap is just above the mug.": "नल ठीक मग के ऊपर है।",
    "It is full now, so pin the 300 mL tag on the mug.": "अब मग भरा है, तो 300 मिली वाली पर्ची मग पर लगाओ।",
    "It is one of the three tags at the right.": "यह दाईं ओर की तीन पर्चियों में से एक है।",
    "What fills the container right to the top?": "बर्तन को ठीक ऊपर तक क्या भरता है?",
    "Look at the full container: which tag tells about the water in it?": "भरे बर्तन को देखो: कौन-सी पर्ची उसके अंदर के पानी के बारे में बताती है?",
    "Capacity is how much liquid a container holds, in millilitres or litres.": "धारिता यानी बर्तन में कितना द्रव आता है, मिलीलीटर या लीटर में।",
    "You learned: capacity is how much liquid a container can hold.": "तुमने सीखा: धारिता यानी बर्तन में कितना द्रव आ सकता है।",
    "This jug is 25 cm tall, weighs 400 g and holds 2 L: pin on its capacity tag.": "यह जग 25 सेमी ऊँचा, 400 ग्रा भारी है और इसमें 2 ली आता है: धारिता की पर्ची लगाओ।",
    "Which tag is its capacity?": "कौन-सी पर्ची उसकी धारिता है?",
    "Is the jug height or weight about the water it holds?": "क्या जग की ऊँचाई या भार उसके अंदर के पानी के बारे में बताते हैं?",
    "Yes, the 2 L tag is its capacity, not the 25 cm or the 400 g.": "हाँ, 2 ली वाली पर्ची इसकी धारिता है, 25 सेमी या 400 ग्रा नहीं।",
    "Which tag is a capacity: how tall a bottle is, how heavy, or how much it holds?": "कौन-सी पर्ची धारिता है: बोतल कितनी ऊँची, कितनी भारी, या उसमें कितना आता है?",
    "Which is a capacity?": "धारिता कौन-सी है?",
    "Think of pouring water into the bottle until it is full.": "बोतल भरने तक उसमें पानी डालने के बारे में सोचो।",
    "Yes, how much it holds is the capacity of the bottle.": "हाँ, उसमें कितना आता है, यही बोतल की धारिता है।",
    "Pin mL or L on the teaspoon and on the water tank to give each capacity.": "हर एक की धारिता के लिए चम्मच और पानी की टंकी पर मिली या ली लगाओ।",
    "Spoon and tank: mL or L?": "चम्मच और टंकी: मिली या ली?",
    "Which holds more water, a teaspoon or a water tank?": "किसमें ज़्यादा पानी आता है, चम्मच में या पानी की टंकी में?",
    "A teaspoon holds a little and a tank a lot, so which unit is the small one?": "चम्मच में थोड़ा आता है और टंकी में बहुत, तो छोटा मात्रक कौन-सा है?",
    "Think of one spoonful and one full tank: which needs the bigger unit?": "एक चम्मच भर और एक भरी टंकी सोचो: किसके लिए बड़ा मात्रक चाहिए?",
    "Yes, a teaspoon holds millilitres and a water tank holds litres.": "हाँ, चम्मच में मिलीलीटर आते हैं और पानी की टंकी में लीटर।",
    "9 cm": "9 सेमी",
    "250 g": "250 ग्रा",
    "300 mL": "300 मिली",
    "25 cm": "25 सेमी",
    "400 g": "400 ग्रा",
    "2 L": "2 ली",
    "how heavy": "कितनी भारी",
    "how much it holds": "कितना आता है",
    "how tall": "कितनी ऊँची",
    "mL": "मिली",
    "L": "ली",
    "teaspoon": "चम्मच",
    "water tank": "पानी की टंकी",
    "mL and L": "मिली और ली",
    "L and mL": "ली और मिली",
    "mL and mL": "मिली और मिली",
    "L and L": "ली और ली",
    "Counting in glasses": "गिलासों में गिनती",
    "Tap the jug to pour it into the small glasses.": "जग को छोटे गिलासों में उँडेलने के लिए उसे दबाओ।",
    "Tap the jug itself, not a glass.": "गिलास नहीं, जग को ही दबाओ।",
    "Tap the jug again to fill it from the tap and pour it into the big glasses.": "जग को फिर दबाओ, वह नल से भरकर बड़े गिलासों में उँडलेगा।",
    "The jug is at the left, under the tap.": "जग बाईं ओर, नल के नीचे है।",
    "How much does one small cup hold?": "एक छोटे कप में कितना आता है?",
    "Pour the kettle into both rows and compare one cup with one mug.": "केतली को दोनों पंक्तियों में उँडेलो और एक कप की तुलना एक मग से करो।",
    "A glass count depends on the glass, so we measure in litres and millilitres.": "गिलासों की गिनती गिलास पर निर्भर है, इसलिए हम लीटर और मिलीलीटर में मापते हैं।",
    "You learned: a count of glasses depends on the size of the glass.": "तुमने सीखा: गिलासों की गिनती गिलास के आकार पर निर्भर करती है।",
    "A full kettle fills 4 mugs or 8 small cups: why are the counts different?": "भरी केतली से 4 मग या 8 छोटे कप भरते हैं: गिनती अलग क्यों है?",
    "Why do the counts differ?": "गिनतियाँ अलग क्यों हैं?",
    "The kettle was filled to the same line both times, so what else changed?": "दोनों बार केतली एक ही रेखा तक भरी गई, तो और क्या बदला?",
    "Yes, a mug holds more than a cup, so fewer mugs are filled.": "हाँ, मग में कप से ज़्यादा आता है, इसलिए कम मग भरते हैं।",
    "The kettle changed": "केतली बदल गई",
    "Mugs hold more": "मग में ज़्यादा",
    "Cups hold more": "कप में ज़्यादा",
    "Jug 1 and jug 2 each fill 7 glasses: do they hold the same?": "जग 1 और जग 2, हर एक 7 गिलास भरता है: क्या दोनों में बराबर आता है?",
    "Do they hold the same?": "क्या बराबर आता है?",
    "The count is 7 both times, so look at the size of each glass.": "गिनती दोनों बार 7 है, तो हर गिलास का आकार देखो।",
    "Which holds more water, one small glass or one big glass?": "किसमें ज़्यादा पानी आता है, एक छोटे गिलास में या एक बड़े गिलास में?",
    "Each jug fills its own seven glasses, so compare one glass from each row.": "हर जग अपने सात गिलास भरता है, तो हर पंक्ति से एक गिलास की तुलना करो।",
    "Yes, jug 2 holds more, because its glasses are bigger.": "हाँ, जग 2 में ज़्यादा आता है, क्योंकि उसके गिलास बड़े हैं।",
    "They hold the same": "दोनों में बराबर",
    "Jug 1 holds more": "जग 1 में ज़्यादा",
    "Jug 2 holds more": "जग 2 में ज़्यादा",
    "A bottle fills 6 cups and each cup holds exactly 150 mL: what is its capacity?": "एक बोतल 6 कप भरती है और हर कप में ठीक 150 मिली आता है: इसकी धारिता क्या है?",
    "Bottle's capacity in mL?": "बोतल की धारिता मिली में?",
    "6 is how many cups, not how much water they hold.": "6 कपों की गिनती है, उनमें कितना पानी है यह नहीं।",
    "Add 150 mL once for every cup the bottle filled.": "बोतल ने जितने कप भरे, हर कप के लिए 150 मिली एक बार जोड़ो।",
    "Six cups of 150 mL each make 6 times 150 mL.": "150 मिली वाले छह कप यानी 6 गुना 150 मिली।",
    "Yes, 6 cups of 150 mL make 900 mL, the capacity of the bottle.": "हाँ, 150 मिली के 6 कप से 900 मिली बनता है, यही बोतल की धारिता है।",
    "each cup:": "हर कप:",
    "each glass:": "हर गिलास:",
    "cups": "कप",
    "mugs": "मग",
    "mugs hold more": "मग में ज़्यादा",
    "jug 2 holds more": "जग 2 में ज़्यादा",
    "A thousand millilitres make a litre": "हज़ार मिलीलीटर से एक लीटर बनता है",
    "Tap the 1 L bottle to pour it into the measuring jug.": "1 ली की बोतल को मापने वाले जग में उँडेलने के लिए उसे दबाओ।",
    "The 1 L bottle stands at the far left.": "1 ली की बोतल सबसे बाईं ओर है।",
    "Now tap the 3 L card to send it through the converter.": "अब 3 ली वाला कार्ड परिवर्तक से गुज़ारने के लिए उसे दबाओ।",
    "It is the white card at the top.": "यह ऊपर वाला सफ़ेद कार्ड है।",
    "Where does the water from the litre bottle stop on the measuring jug?": "लीटर की बोतल का पानी मापने वाले जग पर कहाँ रुकता है?",
    "Multiply the litres by the converter number, then add the millilitres on.": "लीटर को परिवर्तक की संख्या से गुणा करो, फिर मिलीलीटर जोड़ो।",
    "A litre is 1,000 mL, so multiply by 1,000 and only 1,000, then add the mL.": "एक लीटर 1,000 मिली है, तो 1,000 से और सिर्फ़ 1,000 से गुणा करो, फिर मिली जोड़ो।",
    "You learned: a litre is 1,000 millilitres; multiply litres by 1,000.": "तुमने सीखा: एक लीटर 1,000 मिलीलीटर है; लीटर को 1,000 से गुणा करो।",
    "How many millilitres are there in 9 L 340 mL?": "9 ली 340 मिली में कितने मिलीलीटर हैं?",
    "How many mL in 9 L 340 mL?": "9 ली 340 मिली में कितने मिली?",
    "What number is printed on the converter?": "परिवर्तक पर कौन-सी संख्या छपी है?",
    "Yes, 9 L is 9,000 mL, and 340 mL more makes 9,340 mL.": "हाँ, 9 ली यानी 9,000 मिली, और 340 मिली मिलाकर 9,340 मिली।",
    "Convert 14 L into millilitres.": "14 ली को मिलीलीटर में बदलो।",
    "How many mL in 14 L?": "14 ली में कितने मिली?",
    "14 L is 14 litre bottles, and how many millilitres fill each one?": "14 ली यानी लीटर की 14 बोतलें, और हर एक में कितने मिलीलीटर आते हैं?",
    "Yes, 14 L is 14,000 mL.": "हाँ, 14 ली यानी 14,000 मिली।",
    "Now change 2 L 75 mL into millilitres the same way.": "अब 2 ली 75 मिली को भी इसी तरह मिलीलीटर में बदलो।",
    "How many mL in 2 L 75 mL?": "2 ली 75 मिली में कितने मिली?",
    "75 mL has no hundreds, so which place needs a zero?": "75 मिली में कोई सैकड़ा नहीं है, तो किस स्थान पर शून्य चाहिए?",
    "Write 2 L as millilitres first, then add the 75 mL on.": "पहले 2 ली को मिलीलीटर में लिखो, फिर 75 मिली जोड़ो।",
    "75 mL fills only the tens and the ones, so the hundreds place keeps a zero.": "75 मिली सिर्फ़ दहाई और इकाई भरता है, तो सैकड़े के स्थान पर शून्य रहता है।",
    "Yes, 2,000 mL and 75 mL make 2,075 mL.": "हाँ, 2,000 मिली और 75 मिली से 2,075 मिली बनता है।",
    "TTh": "द.ह.",
    "Th": "ह.",
    "H": "सै.",
    "T": "द.",
    "O": "इ.",
    "remainder": "शेषफल",
    "Millilitres into litres and millilitres": "मिलीलीटर से लीटर और मिलीलीटर",
    "Pour the 1 L bottle into the measuring jug.": "1 ली की बोतल को मापने वाले जग में उँडेलो।",
    "The bottle stands to the left of the measuring jug.": "बोतल मापने वाले जग के बाईं ओर है।",
    "Tap the 2,300 mL card to send it back through the converter.": "2,300 मिली वाले कार्ड को परिवर्तक से वापस भेजने के लिए उसे दबाओ।",
    "Look at the top for the white card.": "सफ़ेद कार्ड ऊपर देखो।",
    "Take out as many thousands as you can: what stays behind is millilitres.": "जितने हज़ार निकाल सको, निकालो: जो बचता है वह मिलीलीटर है।",
    "The last three digits stay behind as the millilitres.": "आख़िरी तीन अंक मिलीलीटर बनकर बचते हैं।",
    "Divide by 1,000: the quotient is the litres, the remainder stays millilitres.": "1,000 से भाग दो: भागफल लीटर है, शेषफल मिलीलीटर रहता है।",
    "You learned: divide by 1,000; the remainder stays as millilitres.": "तुमने सीखा: 1,000 से भाग दो; शेषफल मिलीलीटर रहता है।",
    "Write 6,090 mL in litres and millilitres.": "6,090 मिली को लीटर और मिलीलीटर में लिखो।",
    "6,090 mL in L and mL?": "6,090 मिली, ली और मिली में?",
    "What does the zero in the hundreds place tell you?": "सैकड़े के स्थान का शून्य तुम्हें क्या बताता है?",
    "Yes, 6,090 mL is 6 L 90 mL.": "हाँ, 6,090 मिली यानी 6 ली 90 मिली।",
    "Now 12,400 mL: how many whole litres, and how many millilitres are left?": "अब 12,400 मिली: कितने पूरे लीटर, और कितने मिलीलीटर बचे?",
    "12,400 mL in L and mL?": "12,400 मिली, ली और मिली में?",
    "A litre is a thousand millilitres, not a hundred, so divide by a thousand.": "एक लीटर हज़ार मिलीलीटर है, सौ नहीं, तो हज़ार से भाग दो।",
    "Right: 12 whole litres, and 400 mL left over.": "सही: 12 पूरे लीटर, और 400 मिली बचे।",
    "A child wrote 7,400 mL as 74 L: write it the right way in L and mL.": "एक बच्चे ने 7,400 मिली को 74 ली लिखा: इसे ली और मिली में सही लिखो।",
    "7,400 mL in L and mL?": "7,400 मिली, ली और मिली में?",
    "74 L would be 74,000 mL, far more than this card.": "74 ली तो 74,000 मिली होंगे, इस कार्ड से बहुत ज़्यादा।",
    "Yes: dividing by 100 gives 74 L, but dividing by 1,000 gives 7 L 400 mL.": "हाँ: 100 से भाग देने पर 74 ली आता है, पर 1,000 से भाग देने पर 7 ली 400 मिली।",
  },
  gu: {
    "Litre Jug": "લિટર જગ",
    "Pin one of the tags on first, then press Enter.": "પહેલાં એક ચિઠ્ઠી લગાવો, પછી દાખલ કરો દબાવો.",
    "Pin mL or L on both of them first, then press Enter.": "પહેલાં બંને પર મિલિ કે લિ લગાવો, પછી દાખલ કરો દબાવો.",
    "It is already full right to the top.": "તે પહેલેથી જ બરાબર ઉપર સુધી ભરેલું છે.",
    "The jug is full, so pour it into empty glasses first.": "જગ ભરેલો છે, તો પહેલાં તેને ખાલી ગ્લાસમાં રેડો.",
    "The bottle is empty now: its 1 L is in the measuring jug.": "બોટલ હવે ખાલી છે: તેનો 1 લિ માપવાના જગમાં છે.",
    "Free play: pour the jug into the small or the big glasses, and back again.": "મુક્ત રમત: જગને નાના કે મોટા ગ્લાસમાં રેડો, અને પાછું પણ.",
    "How much can each one hold?": "દરેકમાં કેટલું સમાઈ શકે?",
    "What capacity is": "ક્ષમતા એટલે શું",
    "Tap the water tap to fill the mug right to the top.": "મગને ઉપર સુધી ભરવા પાણીનો નળ દબાવો.",
    "The tap is just above the mug.": "નળ મગની બરાબર ઉપર છે.",
    "It is full now, so pin the 300 mL tag on the mug.": "હવે મગ ભરેલો છે, તો 300 મિલિની ચિઠ્ઠી મગ પર લગાવો.",
    "It is one of the three tags at the right.": "તે જમણી બાજુની ત્રણ ચિઠ્ઠીમાંથી એક છે.",
    "What fills the container right to the top?": "વાસણને બરાબર ઉપર સુધી શું ભરે છે?",
    "Look at the full container: which tag tells about the water in it?": "ભરેલું વાસણ જુઓ: કઈ ચિઠ્ઠી તેની અંદરના પાણી વિશે કહે છે?",
    "Capacity is how much liquid a container holds, in millilitres or litres.": "ક્ષમતા એટલે વાસણમાં કેટલું પ્રવાહી સમાય, મિલિલિટર કે લિટરમાં.",
    "You learned: capacity is how much liquid a container can hold.": "તમે શીખ્યા: ક્ષમતા એટલે વાસણમાં કેટલું પ્રવાહી સમાય.",
    "This jug is 25 cm tall, weighs 400 g and holds 2 L: pin on its capacity tag.": "આ જગ 25 સેમી ઊંચો, 400 ગ્રા વજનનો છે અને તેમાં 2 લિ સમાય: ક્ષમતાની ચિઠ્ઠી લગાવો.",
    "Which tag is its capacity?": "કઈ ચિઠ્ઠી તેની ક્ષમતા છે?",
    "Is the jug height or weight about the water it holds?": "શું જગની ઊંચાઈ કે વજન તેની અંદરના પાણી વિશે કહે છે?",
    "Yes, the 2 L tag is its capacity, not the 25 cm or the 400 g.": "હા, 2 લિની ચિઠ્ઠી તેની ક્ષમતા છે, 25 સેમી કે 400 ગ્રા નહીં.",
    "Which tag is a capacity: how tall a bottle is, how heavy, or how much it holds?": "કઈ ચિઠ્ઠી ક્ષમતા છે: બોટલ કેટલી ઊંચી, કેટલી ભારે, કે તેમાં કેટલું સમાય?",
    "Which is a capacity?": "ક્ષમતા કઈ છે?",
    "Think of pouring water into the bottle until it is full.": "બોટલ ભરાય ત્યાં સુધી તેમાં પાણી રેડવાનું વિચારો.",
    "Yes, how much it holds is the capacity of the bottle.": "હા, તેમાં કેટલું સમાય એ જ બોટલની ક્ષમતા છે.",
    "Pin mL or L on the teaspoon and on the water tank to give each capacity.": "દરેકની ક્ષમતા માટે ચમચી અને પાણીની ટાંકી પર મિલિ કે લિ લગાવો.",
    "Spoon and tank: mL or L?": "ચમચી અને ટાંકી: મિલિ કે લિ?",
    "Which holds more water, a teaspoon or a water tank?": "કોનામાં વધુ પાણી સમાય, ચમચીમાં કે પાણીની ટાંકીમાં?",
    "A teaspoon holds a little and a tank a lot, so which unit is the small one?": "ચમચીમાં થોડું સમાય અને ટાંકીમાં ઘણું, તો નાનો એકમ કયો છે?",
    "Think of one spoonful and one full tank: which needs the bigger unit?": "એક ચમચી ભર અને એક ભરેલી ટાંકી વિચારો: કોને મોટો એકમ જોઈએ?",
    "Yes, a teaspoon holds millilitres and a water tank holds litres.": "હા, ચમચીમાં મિલિલિટર સમાય અને પાણીની ટાંકીમાં લિટર.",
    "9 cm": "9 સેમી",
    "250 g": "250 ગ્રા",
    "300 mL": "300 મિલિ",
    "25 cm": "25 સેમી",
    "400 g": "400 ગ્રા",
    "2 L": "2 લિ",
    "how heavy": "કેટલી ભારે",
    "how much it holds": "કેટલું સમાય",
    "how tall": "કેટલી ઊંચી",
    "mL": "મિલિ",
    "L": "લિ",
    "teaspoon": "ચમચી",
    "water tank": "પાણીની ટાંકી",
    "mL and L": "મિલિ અને લિ",
    "L and mL": "લિ અને મિલિ",
    "mL and mL": "મિલિ અને મિલિ",
    "L and L": "લિ અને લિ",
    "Counting in glasses": "ગ્લાસમાં ગણતરી",
    "Tap the jug to pour it into the small glasses.": "જગને નાના ગ્લાસમાં રેડવા તેને દબાવો.",
    "Tap the jug itself, not a glass.": "ગ્લાસ નહીં, જગને જ દબાવો.",
    "Tap the jug again to fill it from the tap and pour it into the big glasses.": "જગને ફરી દબાવો, તે નળથી ભરાઈને મોટા ગ્લાસમાં રેડાશે.",
    "The jug is at the left, under the tap.": "જગ ડાબી બાજુ, નળની નીચે છે.",
    "How much does one small cup hold?": "એક નાના કપમાં કેટલું સમાય?",
    "Pour the kettle into both rows and compare one cup with one mug.": "કીટલીને બંને હરોળમાં રેડો અને એક કપને એક મગ સાથે સરખાવો.",
    "A glass count depends on the glass, so we measure in litres and millilitres.": "ગ્લાસની ગણતરી ગ્લાસ પર આધાર રાખે, એટલે આપણે લિટર અને મિલિલિટરમાં માપીએ.",
    "You learned: a count of glasses depends on the size of the glass.": "તમે શીખ્યા: ગ્લાસની ગણતરી ગ્લાસના કદ પર આધાર રાખે છે.",
    "A full kettle fills 4 mugs or 8 small cups: why are the counts different?": "ભરેલી કીટલીથી 4 મગ કે 8 નાના કપ ભરાય: ગણતરી જુદી કેમ છે?",
    "Why do the counts differ?": "ગણતરીઓ જુદી કેમ?",
    "The kettle was filled to the same line both times, so what else changed?": "બંને વાર કીટલી એક જ રેખા સુધી ભરાઈ, તો બીજું શું બદલાયું?",
    "Yes, a mug holds more than a cup, so fewer mugs are filled.": "હા, મગમાં કપ કરતાં વધુ સમાય, એટલે ઓછા મગ ભરાય.",
    "The kettle changed": "કીટલી બદલાઈ",
    "Mugs hold more": "મગમાં વધુ",
    "Cups hold more": "કપમાં વધુ",
    "Jug 1 and jug 2 each fill 7 glasses: do they hold the same?": "જગ 1 અને જગ 2 દરેક 7 ગ્લાસ ભરે છે: શું બંનેમાં સરખું સમાય?",
    "Do they hold the same?": "શું સરખું સમાય છે?",
    "The count is 7 both times, so look at the size of each glass.": "ગણતરી બંને વાર 7 છે, તો દરેક ગ્લાસનું કદ જુઓ.",
    "Which holds more water, one small glass or one big glass?": "કોનામાં વધુ પાણી સમાય, એક નાના ગ્લાસમાં કે એક મોટા ગ્લાસમાં?",
    "Each jug fills its own seven glasses, so compare one glass from each row.": "દરેક જગ પોતાના સાત ગ્લાસ ભરે છે, તો દરેક હરોળમાંથી એક ગ્લાસ સરખાવો.",
    "Yes, jug 2 holds more, because its glasses are bigger.": "હા, જગ 2 માં વધુ સમાય, કારણ કે તેના ગ્લાસ મોટા છે.",
    "They hold the same": "સરખું સમાય",
    "Jug 1 holds more": "જગ 1 માં વધુ",
    "Jug 2 holds more": "જગ 2 માં વધુ",
    "A bottle fills 6 cups and each cup holds exactly 150 mL: what is its capacity?": "એક બોટલ 6 કપ ભરે છે અને દરેક કપમાં બરાબર 150 મિલિ સમાય: તેની ક્ષમતા કેટલી?",
    "Bottle's capacity in mL?": "બોટલની ક્ષમતા મિલિમાં?",
    "6 is how many cups, not how much water they hold.": "6 એ કપની ગણતરી છે, તેમાં કેટલું પાણી છે તે નહીં.",
    "Add 150 mL once for every cup the bottle filled.": "બોટલે ભરેલા દરેક કપ માટે 150 મિલિ એક વાર ઉમેરો.",
    "Six cups of 150 mL each make 6 times 150 mL.": "150 મિલિના છ કપ એટલે 6 ગણા 150 મિલિ.",
    "Yes, 6 cups of 150 mL make 900 mL, the capacity of the bottle.": "હા, 150 મિલિના 6 કપથી 900 મિલિ થાય, એ જ બોટલની ક્ષમતા.",
    "each cup:": "દરેક કપ:",
    "each glass:": "દરેક ગ્લાસ:",
    "cups": "કપ",
    "mugs": "મગ",
    "mugs hold more": "મગમાં વધુ",
    "jug 2 holds more": "જગ 2 માં વધુ",
    "A thousand millilitres make a litre": "હજાર મિલિલિટરથી એક લિટર બને",
    "Tap the 1 L bottle to pour it into the measuring jug.": "1 લિની બોટલને માપવાના જગમાં રેડવા તેને દબાવો.",
    "The 1 L bottle stands at the far left.": "1 લિની બોટલ સૌથી ડાબી બાજુ છે.",
    "Now tap the 3 L card to send it through the converter.": "હવે 3 લિનું કાર્ડ રૂપાંતરકમાંથી પસાર કરવા તેને દબાવો.",
    "It is the white card at the top.": "તે ઉપરનું સફેદ કાર્ડ છે.",
    "Where does the water from the litre bottle stop on the measuring jug?": "લિટરની બોટલનું પાણી માપવાના જગ પર ક્યાં અટકે છે?",
    "Multiply the litres by the converter number, then add the millilitres on.": "લિટરને રૂપાંતરકની સંખ્યાથી ગુણો, પછી મિલિલિટર ઉમેરો.",
    "A litre is 1,000 mL, so multiply by 1,000 and only 1,000, then add the mL.": "એક લિટર 1,000 મિલિ છે, તો 1,000 થી અને ફક્ત 1,000 થી ગુણો, પછી મિલિ ઉમેરો.",
    "You learned: a litre is 1,000 millilitres; multiply litres by 1,000.": "તમે શીખ્યા: એક લિટર 1,000 મિલિલિટર છે; લિટરને 1,000 થી ગુણો.",
    "How many millilitres are there in 9 L 340 mL?": "9 લિ 340 મિલિમાં કેટલા મિલિલિટર છે?",
    "How many mL in 9 L 340 mL?": "9 લિ 340 મિલિમાં કેટલા મિલિ?",
    "What number is printed on the converter?": "રૂપાંતરક પર કઈ સંખ્યા છાપેલી છે?",
    "Yes, 9 L is 9,000 mL, and 340 mL more makes 9,340 mL.": "હા, 9 લિ એટલે 9,000 મિલિ, અને 340 મિલિ ઉમેરતાં 9,340 મિલિ.",
    "Convert 14 L into millilitres.": "14 લિને મિલિલિટરમાં ફેરવો.",
    "How many mL in 14 L?": "14 લિમાં કેટલા મિલિ?",
    "14 L is 14 litre bottles, and how many millilitres fill each one?": "14 લિ એટલે લિટરની 14 બોટલ, અને દરેકમાં કેટલા મિલિલિટર સમાય?",
    "Yes, 14 L is 14,000 mL.": "હા, 14 લિ એટલે 14,000 મિલિ.",
    "Now change 2 L 75 mL into millilitres the same way.": "હવે 2 લિ 75 મિલિને પણ એ જ રીતે મિલિલિટરમાં ફેરવો.",
    "How many mL in 2 L 75 mL?": "2 લિ 75 મિલિમાં કેટલા મિલિ?",
    "75 mL has no hundreds, so which place needs a zero?": "75 મિલિમાં કોઈ શતક નથી, તો કયા સ્થાને શૂન્ય જોઈએ?",
    "Write 2 L as millilitres first, then add the 75 mL on.": "પહેલાં 2 લિને મિલિલિટરમાં લખો, પછી 75 મિલિ ઉમેરો.",
    "75 mL fills only the tens and the ones, so the hundreds place keeps a zero.": "75 મિલિ ફક્ત દશક અને એકમ ભરે છે, તો શતકના સ્થાને શૂન્ય રહે છે.",
    "Yes, 2,000 mL and 75 mL make 2,075 mL.": "હા, 2,000 મિલિ અને 75 મિલિથી 2,075 મિલિ થાય.",
    "TTh": "દ.હ.",
    "Th": "હ.",
    "H": "શ.",
    "T": "દ.",
    "O": "એ.",
    "remainder": "શેષ",
    "Millilitres into litres and millilitres": "મિલિલિટરથી લિટર અને મિલિલિટર",
    "Pour the 1 L bottle into the measuring jug.": "1 લિની બોટલને માપવાના જગમાં રેડો.",
    "The bottle stands to the left of the measuring jug.": "બોટલ માપવાના જગની ડાબી બાજુ છે.",
    "Tap the 2,300 mL card to send it back through the converter.": "2,300 મિલિનું કાર્ડ રૂપાંતરકમાંથી પાછું મોકલવા તેને દબાવો.",
    "Look at the top for the white card.": "સફેદ કાર્ડ ઉપર જુઓ.",
    "Take out as many thousands as you can: what stays behind is millilitres.": "જેટલા હજાર કાઢી શકો, કાઢો: જે વધે તે મિલિલિટર છે.",
    "The last three digits stay behind as the millilitres.": "છેલ્લા ત્રણ અંક મિલિલિટર તરીકે વધે છે.",
    "Divide by 1,000: the quotient is the litres, the remainder stays millilitres.": "1,000 થી ભાગો: ભાગફળ લિટર છે, શેષ મિલિલિટર રહે છે.",
    "You learned: divide by 1,000; the remainder stays as millilitres.": "તમે શીખ્યા: 1,000 થી ભાગો; શેષ મિલિલિટર રહે છે.",
    "Write 6,090 mL in litres and millilitres.": "6,090 મિલિને લિટર અને મિલિલિટરમાં લખો.",
    "6,090 mL in L and mL?": "6,090 મિલિ, લિ અને મિલિમાં?",
    "What does the zero in the hundreds place tell you?": "શતકના સ્થાનનો શૂન્ય તમને શું કહે છે?",
    "Yes, 6,090 mL is 6 L 90 mL.": "હા, 6,090 મિલિ એટલે 6 લિ 90 મિલિ.",
    "Now 12,400 mL: how many whole litres, and how many millilitres are left?": "હવે 12,400 મિલિ: કેટલા આખા લિટર, અને કેટલા મિલિલિટર વધ્યા?",
    "12,400 mL in L and mL?": "12,400 મિલિ, લિ અને મિલિમાં?",
    "A litre is a thousand millilitres, not a hundred, so divide by a thousand.": "એક લિટર હજાર મિલિલિટર છે, સો નહીં, તો હજારથી ભાગો.",
    "Right: 12 whole litres, and 400 mL left over.": "સાચું: 12 આખા લિટર, અને 400 મિલિ વધ્યા.",
    "A child wrote 7,400 mL as 74 L: write it the right way in L and mL.": "એક બાળકે 7,400 મિલિને 74 લિ લખ્યું: તેને લિ અને મિલિમાં સાચી રીતે લખો.",
    "7,400 mL in L and mL?": "7,400 મિલિ, લિ અને મિલિમાં?",
    "74 L would be 74,000 mL, far more than this card.": "74 લિ તો 74,000 મિલિ થાય, આ કાર્ડ કરતાં ઘણું વધારે.",
    "Yes: dividing by 100 gives 74 L, but dividing by 1,000 gives 7 L 400 mL.": "હા: 100 થી ભાગતાં 74 લિ આવે, પણ 1,000 થી ભાગતાં 7 લિ 400 મિલિ આવે.",
  },
};

/* One entry per phase = one mount. Guide steps work a WARM-UP kept outside PHASES (LJ_WARM[n]): numbers that are
   no question's answer. Every line is ONE sentence of at most 80 characters (keyOnly: one sentence a screen). */
const PHASES = [
  {
    n: 1,
    concept: "What capacity is",
    conceptId: "M2.S4.T7.C30", objectiveIds: ["O11"],
    says: [],
    /* the last act's result stays 0.9 s, then the question (the runtime keeps the last step's line for the hold) */
    stepHold: 900,
    steps: [
      { say: "Tap the water tap to fill the mug right to the top.", on: "fill", hint: "The tap is just above the mug." },
      { say: "It is full now, so pin the 300 mL tag on the mug.", on: "pin", hint: "It is one of the three tags at the right." },
    ],
    ladder: ["What fills the container right to the top?", "Look at the full container: which tag tells about the water in it?"],
    closing: "Capacity is how much liquid a container holds, in millilitres or litres.",
    learned: "You learned: capacity is how much liquid a container can hold.",
    traceback: "The child's tag goes back home, lit; the container fills from the tap to its brim, and the capacity tag hangs on it (the teaspoon takes mL and the tank takes L).",
    items: [
      /* learn ML1: answer in the plan = 2 L, because capacity is how much liquid the jug can hold */
      { qid: "M2.S4.T7.C30:ML1", kind: "tag", pad: "enter", cont: "jug", winMs: 4500,
        tags: [{ id: "t-25cm", text: ["25 cm"], k: "height" }, { id: "t-400g", text: ["400 g"], k: "weight" }, { id: "t-2L", text: ["2 L"], k: "capacity" }],
        say: "This jug is 25 cm tall, weighs 400 g and holds 2 L: pin on its capacity tag.",
        ask: "Which tag is its capacity?", answer: "t-2L", near: "t-400g",
        miss: "Is the jug height or weight about the water it holds?",
        win: "Yes, the 2 L tag is its capacity, not the 25 cm or the 400 g." },
      /* practice 1: answer in the plan = How much water it holds */
      { qid: "M2.S4.T7.C30:1", kind: "tag", pad: "enter", cont: "bottle", winMs: 3700,
        tags: [{ id: "t-heavy", text: ["how heavy"], k: "weight" }, { id: "t-holds", text: ["how much", "it holds"], k: "capacity" }, { id: "t-tall", text: ["how tall"], k: "height" }],
        say: "Which tag is a capacity: how tall a bottle is, how heavy, or how much it holds?",
        ask: "Which is a capacity?", answer: "t-holds", near: "t-tall",
        miss: "Think of pouring water into the bottle until it is full.",
        win: "Yes, how much it holds is the capacity of the bottle." },
      /* practice 2: answer in the plan = The teaspoon in millilitres, and the water tank in litres */
      { qid: "M2.S4.T7.C30:2", kind: "units", pad: "enter", cont: ["spoon", "tank"], winMs: 4400,
        say: "Pin mL or L on the teaspoon and on the water tank to give each capacity.",
        ask: "Spoon and tank: mL or L?", answer: "mL|L", near: "L|mL",
        miss: "Which holds more water, a teaspoon or a water tank?",
        ladder: ["A teaspoon holds a little and a tank a lot, so which unit is the small one?", "Think of one spoonful and one full tank: which needs the bigger unit?"],
        win: "Yes, a teaspoon holds millilitres and a water tank holds litres." },
    ],
  },
  {
    n: 2,
    concept: "Counting in glasses",
    conceptId: "M2.S4.T7.C31", objectiveIds: ["O11"],
    says: [],
    /* the last act's result stays 0.9 s, then the question (the runtime keeps the last step's line for the hold) */
    stepHold: 900,
    steps: [
      { say: "Tap the jug to pour it into the small glasses.", on: "pour", hint: "Tap the jug itself, not a glass." },
      { say: "Tap the jug again to fill it from the tap and pour it into the big glasses.", on: "pour", hint: "The jug is at the left, under the tap." },
    ],
    ladder: ["How much does one small cup hold?", "Pour the kettle into both rows and compare one cup with one mug."],
    closing: "A glass count depends on the glass, so we measure in litres and millilitres.",
    learned: "You learned: a count of glasses depends on the size of the glass.",
    traceback: "Every glass is filled from the same full jug, its brim line marked; the counts stand under the glasses and the bigger glasses are named, or the cups add up 150 mL at a time to the bottle's 900 mL.",
    items: [
      /* learn ML2: answer in the plan = The mugs hold more than the cups. The kettle's capacity is 4 mugs or 8 cups */
      { qid: "M2.S4.T7.C31:ML2", kind: "twoRows", winMs: 4100,
        rows: [{ g: "cup", n: 8, ml: 250 }, { g: "mug", n: 4, ml: 500 }],
        choices: [{ id: "c-kettle", label: "The kettle changed" }, { id: "c-mug", label: "Mugs hold more" }, { id: "c-cup", label: "Cups hold more" }],
        say: "A full kettle fills 4 mugs or 8 small cups: why are the counts different?",
        ask: "Why do the counts differ?", answer: "c-mug", near: "c-kettle",
        miss: "The kettle was filled to the same line both times, so what else changed?",
        win: "Yes, a mug holds more than a cup, so fewer mugs are filled." },
      /* practice 3: answer in the plan = No. The second jug holds more, because its glasses are bigger */
      { qid: "M2.S4.T7.C31:3", kind: "twoJugs", winMs: 3700,
        rows: [{ g: "cup", n: 7, ml: 100 }, { g: "glassL", n: 7, ml: 200 }],
        choices: [{ id: "j-same", label: "They hold the same" }, { id: "j-first", label: "Jug 1 holds more" }, { id: "j-second", label: "Jug 2 holds more" }],
        say: "Jug 1 and jug 2 each fill 7 glasses: do they hold the same?",
        ask: "Do they hold the same?", answer: "j-second", near: "j-same",
        miss: "The count is 7 both times, so look at the size of each glass.",
        ladder: ["Which holds more water, one small glass or one big glass?", "Each jug fills its own seven glasses, so compare one glass from each row."],
        win: "Yes, jug 2 holds more, because its glasses are bigger." },
      /* practice 4: answer in the plan = 900 mL, because 6 times 150 mL is 900 mL */
      { qid: "M2.S4.T7.C31:4", kind: "cups", winMs: 4300,
        rows: [{ g: "cup", n: 6, ml: 150 }],
        say: "A bottle fills 6 cups and each cup holds exactly 150 mL: what is its capacity?",
        ask: "Bottle's capacity in mL?", answer: 900, near: 6,
        miss: "6 is how many cups, not how much water they hold.",
        ladder: ["Add 150 mL once for every cup the bottle filled.", "Six cups of 150 mL each make 6 times 150 mL."],
        win: "Yes, 6 cups of 150 mL make 900 mL, the capacity of the bottle." },
    ],
  },
  {
    n: 3,
    concept: "A thousand millilitres make a litre",
    conceptId: "M2.S4.T7.C32", objectiveIds: ["O12"],
    says: [],
    stepHold: 900,
    steps: [
      { say: "Tap the 1 L bottle to pour it into the measuring jug.", on: "pour", hint: "The 1 L bottle stands at the far left." },
      { say: "Now tap the 3 L card to send it through the converter.", on: "convert", hint: "It is the white card at the top." },
    ],
    ladder: ["Where does the water from the litre bottle stop on the measuring jug?", "Multiply the litres by the converter number, then add the millilitres on."],
    closing: "A litre is 1,000 mL, so multiply by 1,000 and only 1,000, then add the mL.",
    learned: "You learned: a litre is 1,000 millilitres; multiply litres by 1,000.",
    traceback: "The converter's 1,000 lights; the litres are multiplied by 1,000, the millilitres added on, line by line; the card comes out in millilitres and the place board shows every place, a grey zero in an empty one.",
    items: [
      /* learn ML3: answer in the plan = 9340 mL */
      { qid: "M2.S4.T7.C32:ML3", kind: "toml", L: 9, mL: 340, winMs: 3700,
        say: "How many millilitres are there in 9 L 340 mL?", ask: "How many mL in 9 L 340 mL?", answer: 9340, near: 1240,
        miss: "What number is printed on the converter?",
        win: "Yes, 9 L is 9,000 mL, and 340 mL more makes 9,340 mL." },
      /* practice 5: answer in the plan = 14,000 mL */
      { qid: "M2.S4.T7.C32:5", kind: "toml", L: 14, mL: 0, winMs: 2400,
        say: "Convert 14 L into millilitres.", ask: "How many mL in 14 L?", answer: 14000, near: 1400,
        miss: "14 L is 14 litre bottles, and how many millilitres fill each one?",
        win: "Yes, 14 L is 14,000 mL." },
      /* practice 6: answer in the plan = 2075 mL. A zero holds the hundreds of the millilitres */
      { qid: "M2.S4.T7.C32:6", kind: "toml", L: 2, mL: 75, winMs: 2600,
        say: "Now change 2 L 75 mL into millilitres the same way.", ask: "How many mL in 2 L 75 mL?", answer: 2075, near: 275,
        miss: "75 mL has no hundreds, so which place needs a zero?",
        ladder: ["Write 2 L as millilitres first, then add the 75 mL on.", "75 mL fills only the tens and the ones, so the hundreds place keeps a zero."],
        win: "Yes, 2,000 mL and 75 mL make 2,075 mL." },
    ],
  },
  {
    n: 4,
    concept: "Millilitres into litres and millilitres",
    conceptId: "M2.S4.T7.C33", objectiveIds: ["O12"],
    says: [],
    stepHold: 900,
    steps: [
      { say: "Pour the 1 L bottle into the measuring jug.", on: "pour", hint: "The bottle stands to the left of the measuring jug." },
      { say: "Tap the 2,300 mL card to send it back through the converter.", on: "convert", hint: "Look at the top for the white card." },
    ],
    ladder: ["Take out as many thousands as you can: what stays behind is millilitres.", "The last three digits stay behind as the millilitres."],
    closing: "Divide by 1,000: the quotient is the litres, the remainder stays millilitres.",
    learned: "You learned: divide by 1,000; the remainder stays as millilitres.",
    traceback: "The converter's 1,000 lights; the card is divided by 1,000 line by line, the quotient lands in the litres slot and the remainder in the millilitres slot, and the place board splits the thousands from the last three places.",
    items: [
      /* learn ML4: answer in the plan = 6 L 90 mL */
      { qid: "M2.S4.T7.C33:ML4", kind: "tolml", card: 6090, winMs: 2400,
        parts: [{ label: "L" }, { label: "mL" }],
        say: "Write 6,090 mL in litres and millilitres.", ask: "6,090 mL in L and mL?", answer: [6, 90], near: [6, 900],
        miss: "What does the zero in the hundreds place tell you?",
        win: "Yes, 6,090 mL is 6 L 90 mL." },
      /* practice 7: answer in the plan = 12 L 400 mL, because 12,400 divided by 1000 is 12 remainder 400 */
      { qid: "M2.S4.T7.C33:7", kind: "tolml", card: 12400, winMs: 3100,
        parts: [{ label: "L" }, { label: "mL" }],
        say: "Now 12,400 mL: how many whole litres, and how many millilitres are left?", ask: "12,400 mL in L and mL?", answer: [12, 400], near: [124, 0],
        miss: "A litre is a thousand millilitres, not a hundred, so divide by a thousand.",
        win: "Right: 12 whole litres, and 400 mL left over." },
      /* practice 8: answer in the plan = The child divided by a hundred: 7400 divided by 1000 is 7 remainder 400, so 7 L 400 mL */
      { qid: "M2.S4.T7.C33:8", kind: "tolml", card: 7400, winMs: 4900,
        parts: [{ label: "L" }, { label: "mL" }],
        say: "A child wrote 7,400 mL as 74 L: write it the right way in L and mL.", ask: "7,400 mL in L and mL?", answer: [7, 400], near: [74, 0],
        miss: "74 L would be 74,000 mL, far more than this card.",
        win: "Yes: dividing by 100 gives 74 L, but dividing by 1,000 gives 7 L 400 mL." },
    ],
  },
];

/* The guide steps' warm-ups (numbers that are no question's answer), and free play's bay */
const LJ_WARM: any = {
  1: { kind: "tag", cont: "mug", warm: true, answer: "w-300mL",
    tags: [{ id: "w-9cm", text: ["9 cm"], k: "height" }, { id: "w-250g", text: ["250 g"], k: "weight" }, { id: "w-300mL", text: ["300 mL"], k: "capacity" }] },
  2: { kind: "bay", warm: true },
  3: { kind: "toml", L: 3, mL: 0, warm: true },
  4: { kind: "tolml", card: 2300, warm: true },
};
const LJ_FREE_IT = { kind: "bay", free: true };

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  capacityMl: { bucket: 10000, bottle: 1000, jug: 2000, mug: 300, spoon: 5, tank: 500000 },
  converter: 1000,
  kettleMl: 2000,
  warmUps: { p1: "a mug: 9 cm, 250 g, 300 mL", p2: "one jug: 6 small glasses, 3 big glasses", p3: "3 L -> 3,000 mL", p4: "2,300 mL -> 2 L 300 mL" },
  freePlay: { bay: { smallGlasses: 6, bigGlasses: 3 } },
  placeBoard: ["TTh", "Th", "H", "T", "O"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "tag") { const cap = it.tags.filter((t: any) => /\bm?L$/.test(t.text.join(" ")) || t.k === "capacity"); return cap.length === 1 && cap[0].id === it.answer; }
  if (it.kind === "units") return it.cont.map((c: string) => ((MODEL.capacityMl as any)[c] < 1000 ? "mL" : "L")).join("|") === it.answer;
  if (it.kind === "twoRows") { const few = it.rows.slice().sort((a: any, b: any) => a.n - b.n)[0]; return it.answer === "c-" + few.g && it.rows.every((r: any) => r.n * r.ml === MODEL.kettleMl); }
  if (it.kind === "twoJugs") { const a = it.rows[0].n * it.rows[0].ml, b = it.rows[1].n * it.rows[1].ml; return it.answer === (a === b ? "j-same" : a > b ? "j-first" : "j-second"); }
  if (it.kind === "cups") { let s = 0; for (let k = 0; k < it.rows[0].n; k++) s += it.rows[0].ml; return it.answer === s; }
  if (it.kind === "toml") return it.answer === Number(String(it.L) + ("000" + it.mL).slice(-3));
  if (it.kind === "tolml") { const s = String(it.card); return it.answer[0] === Number(s.slice(0, -3)) && it.answer[1] === Number(s.slice(-3)); }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? (Array.isArray(item.near) ? item.near.join("|") : item.near)
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print (a two-unit answer: the pair only, so the
   question's own "6,090" never trips it) */
const answerForms = (item: any) => (item.parts ? [`${item.answer[0]} L ${item.answer[1]} mL`, `${item.answer[0]} L and ${item.answer[1]} mL`,
  `${item.answer[0]} litres ${item.answer[1]} millilitres`, `${words(item.answer[0])} litres ${words(item.answer[1])} millilitres`]
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: nothing waits on this board, so it is always undefined (Enter) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* what the slot shows for a tag, a choice or a number (commas from 1,000; a box's own digits as typed) */
const LJ_SHOW: any = {
  "t-25cm": "25 cm", "t-400g": "400 g", "t-2L": "2 L", "t-tall": "how tall", "t-heavy": "how heavy", "t-holds": "how much it holds",
  "mL|L": "mL and L", "L|mL": "L and mL", "mL|mL": "mL and mL", "L|L": "L and L",
  "c-kettle": "The kettle changed", "c-mug": "Mugs hold more", "c-cup": "Cups hold more",
  "j-same": "They hold the same", "j-first": "Jug 1 holds more", "j-second": "Jug 2 holds more",
};
/* j is the box of a two-box answer (its unit is the box's label); a single-number answer here is always in
   millilitres, so its unit is written beside the number */
const ljFormat = (v: any, j?: number, o?: any) => {
  const s = String(v ?? "");
  if (LJ_SHOW[s]) return LJ_SHOW[s];
  const num = /^[1-9]\d{3,}$/.test(s) ? indian(Number(s)) : s;
  const mL = o && o.tx ? o.tx("mL") : "mL";
  return j === undefined && /^\d+$/.test(s) ? num + " " + mL : num;
};

/* ── the pictures: water, containers, tags, the tap, the measuring jug ───────────────────────── */
const LJ_C = { water: "#BFE2F5", edge: "#6FB3DB", litre: "#0072B2", ml: "#009E73", zero: "#767676", count: "#56B4E9", metal: "#E3E7EA" };
/* the plain pieces' look beside the skins: a pale cream fill and a lighter warm outline; the tap a pale grey-cream */
const LJ_CREAM = "#FBEBD7", LJ_LINE = "#8A6A50", LJ_TAPF = "#EFE6DA", LJ_TAPL = "#8C7B6B";
const LJ_INK = { litre: shade(LJ_C.litre, 0.25), ml: shade(LJ_C.ml, 0.25), count: shade(LJ_C.count, 0.45) };

/* how wide a line is, in em (bold): measured in this tool's own page (getComputedTextLength at 100): a Devanagari or Gujarati
   advance is about 0.6 em ("मिली" 2.4, "પાણીની ટાંકી" 5.64), Latin letters 0.66, digits 0.62; Indic is counted at 0.7 for a margin,
   zero-advance marks skipped (PATTERNS §18); ljFit = the biggest size, from max down to min, that fits w */
const LJ_ZW = /[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/;
const ljEm = (s: string) => {
  let e = 0;
  for (const ch of String(s)) {
    if (LJ_ZW.test(ch)) continue;
    e += /[ऀ-૿]/.test(ch) ? 0.7 : ch === " " ? 0.3 : /[.,:]/.test(ch) ? 0.32 : /[0-9]/.test(ch) ? 0.62 : 0.66;
  }
  return e;
};
const ljFit = (s: string, w: number, max: number, min = 28) => Math.max(min, Math.min(max, Math.floor(w / Math.max(0.1, ljEm(s)))));
/* a translated label too long for one line at 32 (the label size) splits at the space nearest its middle */
const ljSplit = (s: string, w: number) => {
  if (ljEm(s) * T.label <= w || s.indexOf(" ") < 0) return [s];
  const mid = s.length / 2;
  let best = -1;
  for (let i = 0; i < s.length; i++) if (s[i] === " " && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
  return [s.slice(0, best), s.slice(best + 1)];
};

/* each container in its own units: bottom-centre at 0,0, the brim at -h; mouth = where it pours from */
const LJ_VES: any = {
  jug: { h: 140, w: 110, inner: "M -50 0 L 50 0 L 42 -140 L -42 -140 Z", extra: ["M -46 -112 C -84 -112 -84 -36 -50 -36"],
    spout: "M 38 -140 L 64 -152 L 60 -140 L 44 -124 Z", mouth: [62, -150] },
  bottle: { h: 175, w: 60, inner: "M -28 0 L 28 0 L 28 -118 Q 28 -138 12 -150 L 12 -175 L -12 -175 L -12 -150 Q -28 -138 -28 -118 Z",
    extra: [], mouth: [0, -175] },
  mug: { h: 78, w: 62, inner: "M -30 0 L 30 0 L 30 -78 L -30 -78 Z", extra: ["M 30 -62 C 54 -62 54 -18 30 -18"] },
  /* a teaspoon seen from above: an egg-shaped bowl narrowing to a thin handle that widens at its end */
  spoon: { h: 40, w: 70, inner: "M -34 -20 C -34 -44 18 -42 32 -20 C 18 2 -34 4 -34 -20 Z", extra: [],
    spout: "M 30 -23 L 96 -30 Q 118 -32 118 -21 Q 118 -11 96 -13 L 30 -17 Z" },
  tank: { h: 160, w: 162, inner: "M -80 0 L 80 0 L 80 -160 L -80 -160 Z", extra: ["M -80 -160 Q 0 -186 80 -160", "M 80 -24 L 98 -24 L 98 -10"] },
  kettle: { h: 100, w: 106, inner: "M -52 0 L 52 0 Q 62 -55 44 -100 L -44 -100 Q -62 -55 -52 0 Z", extra: ["M -32 -100 Q 0 -146 32 -100"],
    spout: "M 50 -30 L 92 -96 L 102 -88 L 58 -60 Z", mouth: [97, -92] },
  cup: { h: 54, w: 44, inner: "M -17 0 L 17 0 L 21 -54 L -21 -54 Z", extra: [] },
  glassL: { h: 76, w: 60, inner: "M -24 0 L 24 0 L 29 -76 L -29 -76 Z", extra: [] },
};

/* a container at (x, y) (bottom-centre), scaled by o.s, filled to `level` of its brim; called, never mounted */
function ljVessel(C: any, key: string, kind: string, x: number, y: number, level: number, o: any = {}) {
  const V = LJ_VES[kind], s = o.s || 1, lv = Math.max(0, Math.min(1, level || 0)), id = "lj-clip-" + key;
  const wy = -V.h * lv;
  /* opaque: a jug you cannot see into (phase 2, question 2), so its picture claims nothing about its capacity */
  if (o.opaque) return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {V.spout && <path d={V.spout} fill={LJ_C.metal} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />}
      {V.extra.map((d: string, k: number) => <path key={k} d={d} fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />)}
      <path d={V.inner} fill={LJ_C.metal} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
    </g>
  );
  /* a plain piece (no skin: the 3-skin cap) wears a pale cream fill and ONE thin stroke in the tap's tone (3 on screen at any
     scale; a thumbnail's tiny icon 1.5), so the plain family is uniform beside the skins */
  const sw = o.sw || 3;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <clipPath id={id}><path d={V.inner} /></clipPath>
      <path d={V.inner} fill={LJ_CREAM} />
      {lv > 0 && (
        <g clipPath={`url(#${id})`}>
          <rect x={-V.w / 2 - 6} y={wy} width={V.w + 12} height={-wy + 4} fill={LJ_C.water} />
          <line x1={-V.w / 2 - 6} x2={V.w / 2 + 6} y1={wy} y2={wy} stroke={LJ_EDGE} strokeWidth={sw} vectorEffect="non-scaling-stroke" />
        </g>
      )}
      {V.spout && <path d={V.spout} fill={LJ_CREAM} stroke={LJ_TAPL} strokeWidth={sw} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />}
      {V.extra.map((d: string, k: number) => <path key={k} d={d} fill="none" stroke={LJ_TAPL} strokeWidth={sw} strokeLinecap="round" vectorEffect="non-scaling-stroke" />)}
      <path d={V.inner} fill="none" stroke={LJ_TAPL} strokeWidth={sw} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      {o.brim && <line x1={-V.w * 0.5} x2={V.w * 0.5} y1={-V.h} y2={-V.h} stroke={o.brim} strokeWidth={4} strokeDasharray="8 6" />}
    </g>
  );
}

/* a luggage tag. ghost: the empty place a tag left; lit: the child's own tag after a miss (an accent edge, never red) */
function ljTag(C: any, x: number, y: number, w: number, h: number, lines: string[], o: any = {}) {
  const stroke = o.lit ? C.accent : o.ghost ? C.rule : C.ink;
  /* the words fit the tag: 44 for a short label, smaller for a longer one (never under the 32 label size) */
  /* Devanagari and Gujarati take a taller line pitch (their matras rise above the line: LAYOUT §5), so two lines stay apart */
  const indic = lines.some((ln: string) => /[ऀ-૿]/.test(ln)), two = lines.length > 1;
  const size = o.size || Math.min(...lines.map((ln: string) => ljFit(ln, w - 60, two ? (indic ? T.label : T.prompt) : T.speech, T.label)));
  const pitch = indic ? size * 1.42 : size + 4;
  const d = `M ${x + 20} ${y} H ${x + w - 12} Q ${x + w} ${y} ${x + w} ${y + 12} V ${y + h - 12} Q ${x + w} ${y + h} ${x + w - 12} ${y + h} H ${x + 20} L ${x} ${y + h / 2} Z`;
  if (o.ghost) return <path d={d} fill="none" stroke={stroke} strokeWidth={3} strokeDasharray="10 8" strokeLinejoin="round" />;
  return (
    <g>
      <path d={d} fill="#FFFFFF" stroke={stroke} strokeWidth={o.lit ? 6 : 3} strokeLinejoin="round" filter="url(#fShadowSoft)" />
      <circle cx={x + 24} cy={y + h / 2} r={6} fill="none" stroke={stroke} strokeWidth={3} />
      {lines.map((ln: string, k: number) => (
        <text key={k} x={x + (38 + w) / 2} y={y + h / 2 + size * 0.36 + (k - (lines.length - 1) / 2) * pitch} textAnchor="middle"
          fontSize={size} fontWeight={700} fill={C.ink}>{ln}</text>
      ))}
    </g>
  );
}

/* the tap: its spout's mouth at (sx, sy); `flowTo` = where the running water meets the water in the container */
function ljTap(C: any, sx: number, sy: number, flowTo: number | null, k = 1, px = 2) {
  return (
    <g>
      {flowTo !== null && flowTo > sy && <rect x={sx - 6 * k} y={sy} width={12 * k} height={flowTo - sy} rx={6 * k} fill={LJ_C.edge} />}
      <rect x={px} y={sy - 62 * k} width={sx - px + 2} height={22 * k} fill={LJ_TAPF} stroke={LJ_TAPL} strokeWidth={3} />
      <rect x={sx - 22 * k} y={sy - 70 * k} width={44 * k} height={50 * k} rx={10 * k} fill={LJ_TAPF} stroke={LJ_TAPL} strokeWidth={3} />
      <rect x={sx - 9 * k} y={sy - 22 * k} width={18 * k} height={22 * k} rx={4 * k} fill={LJ_TAPF} stroke={LJ_TAPL} strokeWidth={3} />
      <rect x={sx - 26 * k} y={sy - 86 * k} width={52 * k} height={12 * k} rx={6 * k} fill={LJ_TAPF} stroke={LJ_TAPL} strokeWidth={3} />
      <rect x={sx - 4 * k} y={sy - 76 * k} width={8 * k} height={8 * k} fill={LJ_TAPL} />
    </g>
  );
}

/* a measuring jug marked in millilitres: base-centre (cx, base), H units tall for `max` mL */
function ljMeasure(C: any, cx: number, base: number, H: number, max: number, step: number, labels: number[], ml: number, read: boolean, o: any = {}) {
  const w = o.w || 110, x = cx - w / 2, top = base - H, y = (v: number) => base - (H * v) / max;
  const lvY = y(Math.min(ml, max));
  const ticks: number[] = [];
  for (let v = step; v <= max; v += step) ticks.push(v);
  const outline = `M ${x} ${top} V ${base - 10} Q ${x} ${base} ${x + 10} ${base} H ${x + w - 10} Q ${x + w} ${base} ${x + w} ${base - 10} V ${top}`;
  return (
    <g>
      {o.unit !== false && <text x={cx} y={top - 14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{o.u || "mL"}</text>}
      <path d={outline} fill="#FFFFFF" />
      {ml > 0 && <rect x={x + 2} y={lvY} width={w - 4} height={base - lvY - 2} fill={LJ_C.water} />}
      {ml > 0 && <line x1={x + 2} x2={x + w - 2} y1={lvY} y2={lvY} stroke={LJ_C.edge} strokeWidth={3} />}
      {ticks.map((v) => <line key={v} x1={x} x2={x + (labels.includes(v) ? 34 : 20)} y1={y(v)} y2={y(v)} stroke={C.ink} strokeWidth={3} />)}
      <path d={outline} fill="none" stroke={C.ink} strokeWidth={4} />
      {labels.map((v) => {
        const on = read && v === ml;
        return <text key={v} x={x + w + 10} y={y(v) + 11} fontSize={T.micro} fontWeight={on ? 700 : 600} fill={C.ink}>{indian(v)}</text>;
      })}
      {/* the reading is taken where the water stops: an ink pointer */}
      {read && ml > 0 && <path d={`M ${x - 24} ${lvY - 12} L ${x - 4} ${lvY} L ${x - 24} ${lvY + 12} Z`} fill={C.ink} />}
    </g>
  );
}

/* the three skins (images.tsx), drawn at their own aspect (never stretched out of it): the body in the skin's 0..1 box is
   where the water may stand (a code overlay clipped to it, with a darker top edge), and the mouth is where it pours from */
const LJ_SK: any = {
  /* the jug's body sits well inside the picture's own edge (its rounded base), so the plain fallback never shows round it */
  jug: { ar: 157 / 200, body: [[0.11, 0.16], [0.69, 0.16], [0.63, 0.9], [0.21, 0.9]], brim: 0.16, base: 0.9, mouth: [0.04, 0.09] },
  glass: { ar: 108 / 160, body: [[0.08, 0.08], [0.92, 0.08], [0.84, 0.92], [0.16, 0.92]], brim: 0.08, base: 0.92, mouth: [0.5, 0.05] },
  bottle: { ar: 66 / 160, body: [[0.34, 0.15], [0.66, 0.15], [0.66, 0.21], [0.9, 0.33], [0.9, 0.94], [0.1, 0.94], [0.1, 0.33], [0.34, 0.21]],
    brim: 0.15, base: 0.94, mouth: [0.5, 0.03] },
};
const LJ_EDGE = "#2C6F9E";
/* the plain body (the fallback, always drawn), the skin over it, then the water: bottom-centre (cx, base), h tall */
function ljSkinV(C: any, key: string, name: string, cx: number, base: number, h: number, level: number, o: any = {}) {
  const K = LJ_SK[name], w = h * K.ar, x = cx - w / 2, y = base - h;
  const X = (u: number) => x + (o.flip ? 1 - u : u) * w, Y = (v: number) => y + v * h;
  /* the body's outline with its bottom corners rounded (the picture's base is round), for the fallback and the water's clip */
  const P = K.body.map((p: number[]) => [X(p[0]), Y(p[1])]), r = 0.07 * h;
  let body = "";
  P.forEach((p: number[], i: number) => {
    if (K.body[i][1] < K.base - 0.001) { body += (i ? " L " : "M ") + p[0] + " " + p[1]; return; }
    const a = P[(i - 1 + P.length) % P.length], b = P[(i + 1) % P.length];
    const ta = Math.min(0.5, r / Math.hypot(a[0] - p[0], a[1] - p[1])), tb = Math.min(0.5, r / Math.hypot(b[0] - p[0], b[1] - p[1]));
    body += (i ? " L " : "M ") + (p[0] + (a[0] - p[0]) * ta) + " " + (p[1] + (a[1] - p[1]) * ta) + " Q " + p[0] + " " + p[1] + " " + (p[0] + (b[0] - p[0]) * tb) + " " + (p[1] + (b[1] - p[1]) * tb);
  });
  body += " Z";
  const lv = Math.max(0, Math.min(1, level || 0)), wy = Y(K.base - (K.base - K.brim) * lv), id = "lj-sk-" + key;
  /* the picture at its own aspect (literal names, so check's skin-keys reads them) */
  const pic = name === "jug" ? <Skin name="jug" x={x} y={y} w={w} h={h} fit="stretch" />
    : name === "glass" ? <Skin name="glass" x={x} y={y} w={w} h={h} fit="stretch" />
    : <Skin name="bottle" x={x} y={y} w={w} h={h} fit="stretch" />;
  return (
    <g>
      <path d={body} fill={o.dry ? LJ_C.metal : "#FFFFFF"} stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
      {o.flip ? <g transform={`translate(${2 * cx},0) scale(-1,1)`}>{pic}</g> : pic}
      {lv > 0 && !o.dry && (
        <g>
          <clipPath id={id}><path d={body} /></clipPath>
          <g clipPath={`url(#${id})`}>
            {/* ONE water blue in every vessel, skinned or plain (the visual review) */}
            <rect x={x} y={wy} width={w} height={Y(K.base) - wy + 2} fill={LJ_C.water} />
            <line x1={x} x2={x + w} y1={wy} y2={wy} stroke={LJ_EDGE} strokeWidth={4} />
          </g>
        </g>
      )}
      {o.brim && <line x1={X(K.body[0][0])} x2={X(K.body[1][0])} y1={Y(K.brim) + 3} y2={Y(K.brim) + 3} stroke={o.brim} strokeWidth={4} strokeDasharray="8 6" />}
    </g>
  );
}
/* where a skinned vessel's water stands, its rim (top right of the body) and its mouth, in board units */
const ljSkinTop = (name: string, base: number, h: number, level: number) => { const K = LJ_SK[name]; return base - h + h * (K.base - (K.base - K.brim) * Math.max(0, Math.min(1, level))); };
const ljSkinRim = (name: string, cx: number, base: number, h: number, flip = false) => {
  const K = LJ_SK[name], w = h * K.ar, u = flip ? 1 - K.body[0][0] : K.body[1][0];
  return { x: cx - w / 2 + u * w, y: base - h + K.brim * h };
};
/* the measuring jug (the jug skin, mirrored so its marks stand beside their numbers): mL marks span the drawn body */
function ljMJug(C: any, key: string, cx: number, base: number, h: number, ml: number, read: boolean, labels: number[], uText: string | null) {
  const K = LJ_SK.jug, w = h * K.ar, x = cx - w / 2, y = base - h;
  const X = (u: number) => x + (1 - u) * w, Y = (v: number) => y + v * h;
  const v0 = K.base, v1 = K.brim + 0.04, yOf = (m: number) => Y(v0 - ((v0 - v1) * m) / 1000);
  /* the body's right edge (mirrored: from the top right down to the bottom right) */
  const xr = (yy: number) => { const a = { x: X(K.body[0][0]), y: Y(K.body[0][1]) }, b = { x: X(K.body[3][0]), y: Y(K.body[3][1]) }; return a.x + ((b.x - a.x) * (yy - a.y)) / (b.y - a.y); };
  const marks: number[] = [];
  for (let m = 100; m <= 1000; m += 100) marks.push(m);
  const lvY = yOf(Math.min(ml, 1000));
  return (
    <g>
      {uText && <text x={cx + w * 0.11} y={y - 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{uText}</text>}
      {ljSkinV(C, key, "jug", cx, base, h, ml / 1000 * ((v0 - v1) / (v0 - K.brim)), { flip: true })}
      {marks.map((m) => { const yy = yOf(m), xx = xr(yy); return <line key={m} x1={xx - (labels.includes(m) ? 34 : 20)} x2={xx - 4} y1={yy} y2={yy} stroke={C.ink} strokeWidth={3} />; })}
      {labels.map((m) => (
        <text key={"l" + m} x={x + w + 8} y={yOf(m) + 11} fontSize={T.label} fontWeight={read && m === ml ? 700 : 600} fill={C.ink}>{indian(m)}</text>
      ))}
      {read && ml > 0 && <path d={`M ${x + w + 4} ${lvY} L ${xr(lvY) + 4} ${lvY}`} stroke={C.ink} strokeWidth={4} strokeDasharray="6 5" />}
    </g>
  );
}

/* a tap target over a plain shape: one top-level control (data-control, a label, aria-disabled when it cannot act now) */
function LjPress({ id, label, x, y, w, h, onPress, live = true }: any) {
  const p = usePress(onPress, live);
  return (
    <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label} aria-disabled={live ? undefined : "true"}
      x={x} y={y} width={w} height={h} rx={16} fill="transparent" style={{ cursor: live ? "pointer" : "default", touchAction: "none" }}
      {...p.bind()} onKeyDown={p.keys} />
  );
}

/* ── the layouts, in the 900 x 520 board's own units ─────────────────────────────────────────── */
const LJ_BW = 900, LJ_BH = 520;
/* phase 1: the tap over one container on a counter; three tags at the right; a pinned tag hangs at LJ_PIN */
const LJ_P1 = { tapX: 210, tapY: 150, k: 1.4, base: 440 };
const LJ_SC: any = { jug: 1.6, bottle: 1.3, mug: 2.3 };
const LJ_TW = 270, LJ_TH = 104;
const LJ_HOME = [{ x: 612, y: 30 }, { x: 612, y: 168 }, { x: 612, y: 306 }];
const LJ_PIN = { x: 360, y: 118, w: 236, h: 104 };
/* phase 1, question 3: the teaspoon and the water tank, each with its own two unit tags under the counter */
const LJ_UW = 170, LJ_UH = 90;
const LJ_U: any = {
  /* a little against a lot: the teaspoon small, the tank big (the review, the owner's question c) */
  spoon: { x: 150, y: 336, s: 1.4, name: "teaspoon", nx: 215, rim: [150, 280], pin: { x: 150, y: 120 },
    tray: { mL: { x: 30, y: 420 }, L: { x: 226, y: 420 } } },
  tank: { x: 680, y: 340, s: 1.5, name: "water tank", nx: 680, rim: null, pin: { x: 595, y: 200 },
    tray: { mL: { x: 500, y: 420 }, L: { x: 696, y: 420 } } },
};
/* phase 2 and free play: the pouring bay (jugs and rows of glasses) */
function ljBay(kind: string) {
  if (kind === "twoRows") return {
    jugs: [{ id: "kettle", v: "kettle", x: 125, y: 370, s: 1.35, rows: [0, 1], tap: { x: 125, y: 118 } }],
    rows: [{ g: "cup", n: 8, base: 250, s: 1.35, x0: 318, dx: 76, jug: "kettle", word: "cups" },
      { g: "mug", n: 4, base: 445, s: 1.45, x0: 360, dx: 150, jug: "kettle", word: "mugs" }] };
  /* two jugs that look exactly alike: only the glasses they fill tell them apart */
  if (kind === "twoJugs") return {
    jugs: [{ id: "A", v: "jug", x: 115, y: 200, s: 1.0, rows: [0], opaque: true, name: "1" },
      { id: "B", v: "jug", x: 115, y: 466, s: 1.0, rows: [1], opaque: true, name: "2" }],
    rows: [{ g: "cup", n: 7, base: 200, s: 1.25, x0: 292, dx: 88, jug: "A", sk: "glass" },
      { g: "glassL", n: 7, base: 466, s: 1.25, x0: 292, dx: 88, jug: "B", sk: "glass" }] };
  if (kind === "cups") return {
    jugs: [{ id: "bottle", v: "bottle", x: 115, y: 420, s: 1.4, rows: [0] }],
    rows: [{ g: "cup", n: 6, base: 420, s: 1.5, x0: 292, dx: 106, jug: "bottle" }] };
  /* the warm-up and free play: one jug, six small glasses and three big ones */
  return {
    jugs: [{ id: "jug", v: "jug", x: 125, y: 370, s: 1.45, rows: [0, 1], tap: { x: 125, y: 118 } }],
    rows: [{ g: "cup", n: 6, base: 250, s: 1.45, x0: 340, dx: 100, jug: "jug", sk: "glass" },
      { g: "glassL", n: 3, base: 445, s: 1.55, x0: 400, dx: 180, jug: "jug", sk: "glass" }] };
}
/* phases 3 and 4: the litre bottle and the measuring jug at the left, the card, the converter and what comes out at the
   right, the worked lines under the jugs and the place board under the converter */
const LJ_CV = { bx: 70, by: 310, bs: 1.25, mx: 216, mb: 310, mh: 210, mw: 104,
  card: { x: 480, y: 2, w: 320, h: 84 }, conv: { x: 430, y: 100, w: 420, h: 110 }, out: { x: 480, y: 226, w: 320, h: 80 },
  slotL: { x: 436, y: 226, w: 196, h: 80 }, slotM: { x: 648, y: 226, w: 216, h: 80 },
  board: { cx: 650, hy: 348, y: 358, h: 92, bw: 82, gap: 8 }, rows: { x: 10, y: 380, dy: 44 } };

function ljFresh(ek: string, it: any) {
  const s: any = { ek, lv: {}, flow: false, pins: {}, carry: null, sent: null,
    jlv: {}, fill: {}, away: null, last: {}, tapflow: null,
    blv: 1, mlv: 0, poured: false, bAway: false, conv: false, cAway: false, demo: null };
  if (it.kind === "units") (it.cont || []).forEach((c: string) => { s.lv[c] = 1; });
  if (["twoRows", "twoJugs", "cups", "bay"].includes(it.kind)) ljBay(it.kind).jugs.forEach((j: any) => { s.jlv[j.id] = 1; });
  return s;
}

/* ── the working area: 1472 x 520 shut, 900 x 520 open (bigPad); the board is laid out 900 wide ── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const uL = tx("L"), umL = tx("mL");
  const tlA = useTimeline();   /* the water moving during an act */
  const tlB = useTimeline();   /* the correction and the win */
  const free = stage === "free";
  /* the guide steps work the warm-up; a phase opens on "teach" for one frame before "demo" (PATTERNS §18) */
  const warm = !free && (stage === "demo" || stage === "teach") && !!LJ_WARM[n];
  const it: any = free ? LJ_FREE_IT : warm ? LJ_WARM[n] : item || {};
  const kind = it.kind;
  const solved = !free && !warm && (stage === "win" || stage === "idle");
  const live = (warm && stage === "demo") || (!warm && stage === "ask") || free;
  /* the board is keyed to the ENTRY (question key + a count), so an away-and-back opens a fresh board */
  const qk = free ? "free" : warm ? "w" + n : n + ":" + index;
  const ent = useRef<any>({ qk: null, e: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, e: ent.current.e + 1 };
  const ek = qk + "#" + ent.current.e;
  const ref = useRef<any>(null);
  const [, bump] = useState(0);
  if (!ref.current || ref.current.ek !== ek) ref.current = ljFresh(ek, it);
  const S = ref.current;
  /* a write to this entry's board; a late write from an older entry writes nothing */
  const put = (o: any, k?: string) => {
    if (k !== undefined && ref.current.ek !== k) return;
    const d = typeof o === "function" ? o(ref.current) : o;
    ref.current = { ...ref.current, ...d };
    bump((t: number) => t + 1);
  };
  const locked = useRef(false);
  useEffect(() => () => { tlA.stop(); tlB.stop(); if (locked.current) { locked.current = false; api.lock(false); } }, [ek]);

  /* the board's place: 900 wide, centred with the keypad shut, at the left with it open, never under the key */
  const bw = box ? box.w : W.w, bh = box ? box.h : LJ_BH;
  const kx = box && box.key ? box.key.x - 12 : bw;
  const ox = Math.round(Math.max(0, Math.min((bw - LJ_BW) / 2, kx - LJ_BW)));
  const oy = Math.round(Math.max(0, (bh - LJ_BH) / 2));
  const P = (x: number, y: number) => ({ x: x + ox, y: y + oy });
  const D = S.demo || {};

  /* ── acts: each performed on screen by api.act, the board changing only when it resolves true ── */
  const playing = useRef(false);
  const doAct = async (o: any) => {
    if (playing.current) return false;
    playing.current = true;
    /* the board reacts one beat after the act ends, so the runtime's own end of the act (its layer going) is drawn first */
    try { const ok = await api.act(o); await new Promise((r) => setTimeout(r, 60)); return ok; } finally { playing.current = false; }
  };
  const isWarm = warm;
  const done = (name: string) => { if (isWarm) api.did(name); };
  /* the last act a control did and when: the same tap again within 400 ms is the same tap (a double tap never does two acts) */
  const lastAct = useRef<any>({ name: "", t: 0 });
  /* a line the tool said in the question's place (a nudge): the child's next act brings the question back */
  const nudged = useRef(false);
  const nudge = (line: string) => { api.sfx.tick(); api.say(line); nudged.current = true; };
  /* a tap on a control: in a guide step only the awaited act is performed (any other is reported: the step's hint) */
  const tryAct = (name: string, fn: () => any) => {
    const now = Date.now();
    if (lastAct.current.name === name && now - lastAct.current.t < 400) return;
    const after = () => { lastAct.current = { name, t: Date.now() }; };
    if (warm) {
      if (stage !== "demo") return;
      if (name !== stepOn) { api.did(name); return; }
      lastAct.current = { name, t: now };
      Promise.resolve(fn()).then(after);
      return;
    }
    if (!live || playing.current) return;
    /* a tap while the tool's own correction plays ends it first, so it never rebuilds over the child's new act (play test 1) */
    if (kind !== "toml" && kind !== "tolml" && (tlB.busy || ref.current.demo)) {
      tlB.stop();
      if (locked.current) { locked.current = false; api.lock(false); }
      put({ demo: null });
    }
    if (nudged.current) { nudged.current = false; api.say(free ? FREE_LINE : it.say); }
    lastAct.current = { name, t: now };
    Promise.resolve(fn()).then(after);
  };

  /* phase 1: the tap fills the container to its brim */
  const fillNow = async () => {
    const c = it.cont, k = ref.current.ek;
    if ((ref.current.lv[c] || 0) >= 1) { if (isWarm) done("fill"); else nudge("It is already full right to the top."); return; }
    const ok = await doAct({ tool: "hand", moves: "tap", at: [P(LJ_P1.tapX, LJ_P1.tapY - 78 * LJ_P1.k)], onPoint: () => {
      const steps: any[] = [[40, () => put({ flow: true }, k)]];
      for (let i = 1; i <= 6; i++) steps.push([100, () => put((s: any) => ({ lv: { ...s.lv, [c]: i / 6 } }), k)]);
      steps.push([20, () => put({ flow: false }, k)]);
      tlA.run(steps);
    } });
    tlA.stop();
    put((s: any) => ({ flow: false, lv: ok ? { ...s.lv, [c]: 1 } : s.lv }), k);
    if (!ok) return;
    api.sfx.settle();
    done("fill");
  };
  /* phase 1: a tag carried by the hand onto its container (a tag already there goes home) */
  const tagHome = (id: string) => {
    if (kind === "units") { const [, c, u] = id.split(":"); const t = LJ_U[c].tray[u]; return { x: t.x, y: t.y, w: LJ_UW, h: LJ_UH }; }
    const i = it.tags.findIndex((t: any) => t.id === id);
    return { x: LJ_HOME[i].x, y: LJ_HOME[i].y, w: LJ_TW, h: LJ_TH };
  };
  const pinSpot = (c: string) => (kind === "units" ? { x: LJ_U[c].pin.x, y: LJ_U[c].pin.y, w: LJ_UW, h: LJ_UH } : LJ_PIN);
  const tagLines = (id: string) => {
    if (kind === "units") return [tx(id.split(":")[2])];
    const t = it.tags.find((x: any) => x.id === id);
    return t ? (lang === "en" ? t.text : ljSplit(tx(t.text.join(" ")), LJ_PIN.w - 60)) : [];
  };
  const pinNow = async (c: string, id: string, name: string) => {
    const k = ref.current.ek, val = kind === "units" ? id.split(":")[2] : id;
    if (ref.current.pins[c] === val) { done(name); return; }
    /* a tag pins only onto a FULL container: an empty one is filled from the tap first (the review, item 9) */
    if (kind === "tag" && (ref.current.lv[c] || 0) < 1) { await fillNow(); if ((ref.current.lv[c] || 0) < 1 || ref.current.ek !== k) return; }
    const h = tagHome(id), to = pinSpot(c);
    const node = ljTag(C, -h.w / 2, -h.h / 2, h.w, h.h, tagLines(id));
    put({ carry: id }, k);
    const ok = await doAct({ tool: "hand", moves: "carry", from: P(h.x + h.w / 2, h.y + h.h / 2), at: [P(to.x + to.w / 2, to.y + to.h / 2)], hold: node,
      onPoint: () => put((s: any) => ({ pins: { ...s.pins, [c]: val }, carry: null }), k) });
    put({ carry: null }, k);
    if (!ok) return;
    api.sfx.tick();
    done(name);
  };

  /* phase 2 and free play: a jug pours into a row a glass at a time, is filled again from its tap, or takes a row back */
  const lay = ["twoRows", "twoJugs", "cups", "bay"].includes(kind) ? ljBay(kind) : null;
  const jugOf = (j: string) => (lay ? lay.jugs.find((x: any) => x.id === j) : null);
  const glassAt = (R: any, i: number) => ({ x: R.x0 + i * R.dx, top: R.base - LJ_VES[R.g].h * R.s });
  /* a skinned vessel carried by the hand, tipped about its mouth (the jug mirrored, so its spout leads to the right) */
  const skinHold = (name: string, key: string, h: number, tilt: number, o: any = {}) => {
    const K = LJ_SK[name], w = h * K.ar, mu = o.flip ? 1 - K.mouth[0] : K.mouth[0];
    const mx = -w / 2 + mu * w, my = -h + K.mouth[1] * h;
    return (
      <g>
        <g transform={`rotate(${tilt}) translate(${-mx},${-my})`}>{ljSkinV(C, key, name, 0, 0, h, o.dry ? 0 : 0.55, o)}</g>
        {!o.dry && <rect x={-5} y={4} width={10} height={58} rx={5} fill={LJ_C.edge} />}
      </g>
    );
  };
  const skinOf = (v: string) => (v === "jug" ? "jug" : v === "bottle" ? "bottle" : null);
  const jugHold = (J: any) => {
    const V = LJ_VES[J.v], m = V.mouth || [0, -V.h], tilt = J.v === "bottle" ? 115 : J.v === "kettle" ? 42 : 50;
    /* carried at 0.72 of its size, so the tipped jug (handle and glove) stays inside the working box over the top row */
    if (skinOf(J.v)) return skinHold(skinOf(J.v) as string, "hold-" + J.id, V.h * J.s * 0.72, tilt, { flip: J.v === "jug", dry: J.opaque });
    return (
      <g>
        <g transform={`rotate(${tilt}) translate(${-m[0] * J.s * 0.72},${-m[1] * J.s * 0.72})`}>{ljVessel(C, "hold-" + J.id, J.v, 0, 0, 0.55, { s: J.s * 0.72, opaque: J.opaque })}</g>
        <rect x={-5} y={4} width={10} height={58} rx={5} fill={LJ_C.edge} />
      </g>
    );
  };
  const pourInto = async (J: any, r: number, k: string) => {
    const R = lay.rows[r];
    /* the mouth just above each glass, so the tipped jug and the hand stay inside the working box over the top row */
    const pts = Array.from({ length: R.n }, (_, i) => { const g = glassAt(R, i); return P(g.x, g.top - 14); });
    put({ away: J.id }, k);
    const ok = await doAct({ tool: "hand", moves: "carry", from: P(J.x, J.y - LJ_VES[J.v].h * J.s * 0.6), at: pts, to: P(J.x, J.y - LJ_VES[J.v].h * J.s * 0.6),
      hold: jugHold(J), ms: 1500,
      onPoint: (i: number) => put((s: any) => ({ fill: { ...s.fill, [r]: i + 1 }, jlv: { ...s.jlv, [J.id]: 1 - (i + 1) / R.n } }), k) });
    put((s: any) => ({ away: null, fill: ok ? { ...s.fill, [r]: R.n } : s.fill, jlv: ok ? { ...s.jlv, [J.id]: 0 } : s.jlv, last: { ...s.last, [J.id]: r } }), k);
    return ok;
  };
  const pourBack = async (J: any, r: number, k: string) => {
    const R = lay.rows[r];
    const pts = Array.from({ length: R.n }, (_, i) => { const g = glassAt(R, R.n - 1 - i); return P(g.x, g.top + 10); });
    const ok = await doAct({ tool: "hand", moves: "sweep", at: pts, to: P(J.x + 40, J.y - LJ_VES[J.v].h * J.s), ms: 1300,
      onPoint: (i: number) => put((s: any) => ({ fill: { ...s.fill, [r]: R.n - 1 - i }, jlv: { ...s.jlv, [J.id]: (i + 1) / R.n } }), k) });
    put((s: any) => ({ fill: ok ? { ...s.fill, [r]: 0 } : s.fill, jlv: ok ? { ...s.jlv, [J.id]: 1 } : s.jlv }), k);
    return ok;
  };
  const refill = async (J: any, k: string) => {
    const ok = await doAct({ tool: "hand", moves: "tap", at: [P(J.tap.x, J.tap.y - 78)], onPoint: () => {
      const steps: any[] = [[40, () => put({ tapflow: J.id }, k)]];
      for (let i = 1; i <= 5; i++) steps.push([100, () => put((s: any) => ({ jlv: { ...s.jlv, [J.id]: i / 5 } }), k)]);
      steps.push([20, () => put({ tapflow: null }, k)]);
      tlA.run(steps);
    } });
    tlA.stop();
    put((s: any) => ({ tapflow: null, jlv: ok ? { ...s.jlv, [J.id]: 1 } : s.jlv }), k);
    return ok;
  };
  /* the jug's own act (or a row's, when r is given): pour into an empty row, filling it again first; or take a full row back */
  const pourNow = async (jid: string, r: number | null, name: string) => {
    const J = jugOf(jid);
    if (!J) return;
    const k = ref.current.ek, s = ref.current;
    const full = (s.jlv[J.id] ?? 0) >= 0.999;
    const empties = J.rows.filter((q: number) => !((s.fill[q] || 0) > 0));
    const target = r !== null ? r : empties.length ? empties[0] : (s.last[J.id] ?? J.rows[J.rows.length - 1]);
    const rowEmpty = !((s.fill[target] || 0) > 0);
    let ok = false;
    if (rowEmpty) {
      if (!full) { if (!J.tap) { api.sfx.tick(); return; } if (!(await refill(J, k))) return; }
      ok = await pourInto(J, target, k);
    } else {
      if (full) { nudge("The jug is full, so pour it into empty glasses first."); return; }
      ok = await pourBack(J, target, k);
    }
    if (!ok) return;
    api.sfx.settle();
    done(name);
  };

  /* phases 3 and 4: the litre bottle poured into the measuring jug; the warm-up's card sent through the converter */
  const bottleHold = skinHold("bottle", "hold-litre", 175 * LJ_CV.bs, 115);
  const pourBottle = async (name: string) => {
    const k = ref.current.ek;
    if (ref.current.poured) { if (isWarm) done(name); else nudge("The bottle is empty now: its 1 L is in the measuring jug."); return; }
    put({ bAway: true }, k);
    const home = P(LJ_CV.bx, LJ_CV.by - 110);
    const ok = await doAct({ tool: "hand", moves: "carry", from: home, at: [P(LJ_CV.mx, LJ_CV.mb - LJ_CV.mh - 56)], to: home, hold: bottleHold,
      onPoint: () => {
        const steps: any[] = [];
        for (let i = 1; i <= 6; i++) steps.push([90, () => put({ blv: 1 - i / 6, mlv: i / 6 }, k)]);
        tlA.run(steps);
      } });
    tlA.stop();
    put(ok ? { bAway: false, poured: true, blv: 0, mlv: 1 } : { bAway: false, blv: 1, mlv: 0 }, k);
    if (!ok) return;
    api.sfx.settle();
    done(name);
  };
  const cardText = () => (kind === "toml" ? `${it.L} ${uL}${it.mL ? ` ${it.mL} ${umL}` : ""}` : kind === "tolml" ? `${indian(it.card)} ${umL}` : "");
  const cardNode = (cx: number, cy: number) => {
    const c = LJ_CV.card;
    return (
      <g>
        <rect x={cx - c.w / 2} y={cy - c.h / 2} width={c.w} height={c.h} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} filter="url(#fShadowSoft)" />
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize={ljFit(cardText(), c.w - 28, T.speech)} fontWeight={700}>
          {kind === "toml" ? (
            <tspan>
              <tspan fill={LJ_INK.litre}>{`${it.L} ${uL}`}</tspan>
              {it.mL ? <tspan fill={LJ_INK.ml}>{` ${it.mL} ${umL}`}</tspan> : null}
            </tspan>
          ) : <tspan fill={LJ_INK.ml}>{cardText()}</tspan>}
        </text>
      </g>
    );
  };
  const convertNow = async (name: string) => {
    const k = ref.current.ek, c = LJ_CV.card, cv = LJ_CV.conv, o = LJ_CV.out;
    if (ref.current.conv) { done(name); return; }
    put({ cAway: true }, k);
    const ok = await doAct({ tool: "hand", moves: "push", from: P(c.x + c.w / 2, c.y + c.h / 2), at: [P(cv.x + cv.w / 2, cv.y + cv.h / 2)],
      to: P(o.x + o.w / 2, o.y + o.h / 2), hold: cardNode(0, 0), onPoint: () => api.sfx.trade() });
    put(ok ? { cAway: false, conv: true, demo: { k: 9, done: true } } : { cAway: false }, k);
    if (!ok) return;
    api.sfx.settle();
    done(name);
  };

  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  const doStep = (on: string) => {
    if (on === "fill") fillNow();
    else if (on === "pin") pinNow(it.cont, it.answer, "pin");
    else if (on === "pour") { if (lay) pourNow(lay.jugs[0].id, null, "pour"); else pourBottle("pour"); }
    else if (on === "convert") convertNow("convert");
  };
  /* Enter on a working-area answer (phase 1): send the pinned tags once, and never again unchanged */
  const pinValue = (pins: any) => (kind === "tag" ? pins[it.cont] || null
    : kind === "units" ? (it.cont.every((c: string) => pins[c]) ? it.cont.map((c: string) => pins[c]).join("|") : null) : null);
  /* an early Enter (nothing pinned, one unit missing, or the same tags again): the tags still waiting ring for 1.6 s, and when no
     hint is up the bubble says what to do (a shown hint cannot be replaced by the tool, so the ring is the cue there) */
  const hintUp = () => { try { const g = (window as any).toolApi.getState(); return !!(g && g.hint && g.hintKind !== "type"); } catch (e) { return false; } };
  const ringWaiting = (line: string | null) => {
    const k = ref.current.ek;
    put({ ring: true }, k);
    setTimeout(() => put({ ring: false }, k), 1600);
    if (line && !hintUp()) nudge(line); else api.sfx.tick();
  };
  const commit = () => {
    const s = ref.current;
    if (playing.current || s.demo || stage !== "ask") return;
    const v = pinValue(s.pins);
    if (v === null) { ringWaiting(kind === "units" ? "Pin mL or L on both of them first, then press Enter." : "Pin one of the tags on first, then press Enter."); return; }
    if (v === s.sent) { ringWaiting(null); return; }
    put({ sent: v });
    api.submit(v);
  };
  api.onEnter(warm && stage === "demo" && stepOn ? () => doStep(stepOn) : !free && stage === "ask" && it.pad === "enter" ? commit : null);
  HOOK.demo = warm && stage === "demo" && stepOn ? () => doStep(stepOn) : undefined;
  /* the agent: the tags pinned as a child would pin them (the container filled); Enter then answers */
  const tagNamed = (v: any) => (it.tags || []).find((x: any) => x.id.toLowerCase() === String(v).trim().toLowerCase()
    || x.text.join(" ").toLowerCase() === String(v).trim().toLowerCase());
  HOOK.set = (v: any) => {
    if (kind === "tag") {
      const t = tagNamed(v);
      if (!t) return false;
      put({ lv: { [it.cont]: 1 }, pins: { [it.cont]: t.id }, demo: null });
      return true;
    }
    if (kind === "units") {
      const us = String(v ?? "").split(/\s*[|,]\s*|\s+and\s+/).map((u: string) => (/^ml$/i.test(u) ? "mL" : /^l$/i.test(u) ? "L" : null));
      if (us.length !== 2 || us.some((u: any) => !u)) return false;
      put({ pins: { spoon: us[0], tank: us[1] }, demo: null });
      return true;
    }
    return false;
  };
  /* the Enter key in the bar blinks once a working-area answer is complete and new */
  const pv = it.pad === "enter" ? pinValue(S.pins) : null;
  const ready = !free && stage === "ask" && it.pad === "enter" && pv !== null && pv !== S.sent && !S.demo && !S.carry;
  useEffect(() => { if (stage === "ask" && it.pad === "enter") api.answerReady(ready); }, [ready, ek, stage]);

  /* ── the correction (a miss) and the win: drawn on a layer of their own, ending on the whole right answer ── */
  const rowsOf = () => {
    if (kind === "toml") {
      const tot = it.L * 1000 + it.mL;
      return [`${it.L} ${uL} × 1,000`, `= ${indian(it.L * 1000)} ${umL}`].concat(it.mL ? [`+ ${it.mL} ${umL}`, `= ${indian(tot)} ${umL}`] : []);
    }
    if (kind === "tolml") {
      const q = Math.floor(it.card / 1000), r = it.card % 1000;
      return [`${indian(it.card)} ÷ 1,000`, `= ${q}, ${tx("remainder")} ${r}`, `${q} ${uL} ${r} ${umL}`];
    }
    return [];
  };
  const seq = (fast: boolean, lit: boolean, k: string) => {
    const t = (a: number, b: number) => (fast ? a : b);
    const steps: any[] = [];
    const dm = (o: any) => (s: any) => ({ demo: { ...(s.demo || {}), ...o } });
    if (kind === "tag") {
      const c = it.cont, lv0 = ref.current.lv[c] || 0;
      const childTag = lit ? (wrong && it.tags.some((x: any) => x.id === String(wrong.value)) ? String(wrong.value) : null) : null;
      steps.push([t(60, 450), () => put({ demo: { lit: childTag, hide: lit, lv: lv0 } }, k)]);
      if (lv0 < 1) {
        steps.push([t(60, 200), () => put(dm({ flow: true }), k)]);
        for (let i = 1; i <= 5; i++) steps.push([t(80, 120), () => put(dm({ lv: lv0 + ((1 - lv0) * i) / 5 }), k)]);
        steps.push([t(60, 300), () => put(dm({ flow: false }), k)]);
      }
      if (lit) steps.push([600, () => put(dm({ pin: it.answer }), k)]);
    } else if (kind === "units") {
      const a = String(it.answer).split("|");
      if (lit) {
        steps.push([450, () => put({ demo: { hide: true, pins: {} } }, k)]);
        steps.push([600, () => put(dm({ pins: { spoon: a[0] } }), k)]);
        steps.push([600, () => put(dm({ pins: { spoon: a[0], tank: a[1] } }), k)]);
      }
    } else if (lay) {
      /* one kettle, two rows (ML2): each row is filled from the full kettle, then tipped back, and the kettle water climbs to the
         same dashed brim line both times; it ends full at that line with both counts under it. Other bays: the jugs pour out. */
      const two = kind === "twoRows";
      const setF = (r: number, i: number, jl?: number) => put((s: any) => ({ demo: { ...(s.demo || {}), fill: { ...((s.demo || {}).fill || {}), [r]: i },
        ...(jl !== undefined ? { jlv: jl } : {}) } }), k);
      steps.push([t(80, 300), () => put({ demo: { fill: {}, jlv: two ? 1 : 0, brim: two } }, k)]);
      lay.rows.forEach((R: any, r: number) => {
        for (let i = 1; i <= R.n; i++) steps.push([t(40, 90), () => setF(r, i, two ? 1 - i / R.n : undefined)]);
        steps.push([t(60, 300), () => {}]);
        if (two) {
          for (let i = R.n - 1; i >= 0; i--) steps.push([t(40, 80), () => setF(r, i, (R.n - i) / R.n)]);
          steps.push([t(60, 300), () => put((s: any) => ({ demo: { ...(s.demo || {}), counted: { ...((s.demo || {}).counted || {}), [r]: R.n } } }), k)]);
        }
      });
      if (kind === "cups") for (let i = 1; i <= lay.rows[0].n; i++) steps.push([t(90, 240), () => put(dm({ tot: i }), k)]);
      if (kind === "twoJugs") steps.push([t(150, 500), () => put(dm({ tot: 2 }), k)]);
      steps.push([t(150, 500), () => put(dm({ verdict: true }), k)]);
    } else if (kind === "toml" || kind === "tolml") {
      const nr = rowsOf().length;
      steps.push([t(100, 550), () => put({ demo: { lit, k: 0 } }, k)]);
      for (let i = 1; i <= nr; i++) steps.push([t(260, 560), () => put(dm({ k: i }), k)]);
      steps.push([t(10, 10), () => put(dm({ done: true }), k)]);
    }
    return steps;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const k = ref.current.ek;
    locked.current = true;
    api.lock(true);
    tlB.run(seq(false, true, k), () => { locked.current = false; api.lock(false); });
  }, [wrong]);
  /* the win: the maths moves to the answer, the tool's own line is said once, and the picture stays until Next */
  useEffect(() => {
    if (stage !== "win" || free || warm) return;
    if (it.win) api.say(it.win);
    const k = ref.current.ek;
    put({ demo: null }, k);
    tlB.run(seq(true, false, k));
  }, [stage, ek]);

  /* what the host and the agent read back (toolApi.getState): the question's own things, the answer only once given */
  const curRow = lay && S.last && Object.keys(S.last).length ? lay.rows[S.last[Object.keys(S.last)[0]]] : null;
  api.share({
    container: kind === "tag" ? it.cont : kind === "units" ? it.cont.join(" and ") : null,
    filled: kind === "tag" ? (S.lv[it.cont] || 0) >= 1 : kind === "units" ? true : null,
    glassSize: curRow ? (curRow.g === "cup" ? "small" : "large") : null,
    glassCount: curRow ? (S.fill[lay.rows.indexOf(curRow)] || 0) : null,
    card: kind === "toml" || kind === "tolml" ? cardText() : null,
    litres: solved && kind === "tolml" ? Math.floor(it.card / 1000) : solved && kind === "toml" ? it.L : null,
    millilitres: solved && kind === "tolml" ? it.card % 1000 : solved && kind === "toml" ? it.L * 1000 + it.mL : null,
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const invite = (id: string, x: number, y: number, w: number, h: number) =>
    (warm && stage === "demo" && stepOn === id && !playing.current ? <Invite x={x + w / 2} y={y + h / 2} w={w} h={h} rx={18} C={C} /> : null);
  const counter = (x: number, y: number, w: number) => <rect x={x} y={y} width={w} height={16} rx={8} fill={tint(C.rule, 0.45)} stroke={C.rule} strokeWidth={2} />;

  /* phase 1: one container under the tap, three tags */
  const drawTag1 = () => {
    const c = it.cont, s = LJ_SC[c] || 1.4, V = LJ_VES[c], base = LJ_P1.base;
    const lv = D.lv !== undefined ? Math.max(D.lv, S.lv[c] || 0) : solved ? 1 : S.lv[c] || 0;
    const brim = base - V.h * s, sk = skinOf(c), hh = V.h * s;
    const childPin = D.hide ? null : S.pins[c];
    const shown = D.pin || (S.carry ? null : childPin);
    /* the jug and the bottle wear their skins (at their own aspect, as tall as the plain shape); the mug stays plain */
    const rim = sk ? ljSkinRim(sk, LJ_P1.tapX, base, hh) : { x: LJ_P1.tapX + V.w * 0.38 * s, y: brim + 4 };
    const waterTop = sk ? ljSkinTop(sk, base, hh, lv) : base - V.h * s * lv;
    return (
      <g>
        {counter(10, base, 600)}
        {ljTap(C, LJ_P1.tapX, LJ_P1.tapY, S.flow || D.flow ? waterTop : null, LJ_P1.k, 0)}
        {sk ? ljSkinV(C, "c-" + c, sk, LJ_P1.tapX, base, hh, lv) : ljVessel(C, "c-" + c, c, LJ_P1.tapX, base, lv, { s })}
        {it.tags.map((t: any, i: number) => {
          const h = LJ_HOME[i], away = t.id === S.carry || (t.id === childPin && !D.hide);
          return <g key={t.id}>{ljTag(C, h.x, h.y, LJ_TW, LJ_TH, tagLines(t.id), away ? { ghost: true } : { lit: D.lit === t.id })}</g>;
        })}
        {shown && (
          <g pointerEvents={D.pin ? "none" : undefined}>
            <line x1={LJ_PIN.x + 24} y1={LJ_PIN.y + LJ_PIN.h / 2} x2={rim.x} y2={rim.y} stroke={C.ink} strokeWidth={3} />
            {ljTag(C, LJ_PIN.x, LJ_PIN.y, LJ_PIN.w, LJ_PIN.h, tagLines(shown))}
          </g>
        )}
        <LjPress id="fill" label={tx("tap")} x={LJ_P1.tapX - 70} y={LJ_P1.tapY - 130} w={140} h={140} live={live && !solved} onPress={() => tryAct("fill", fillNow)} />
        {it.tags.map((t: any, i: number) => {
          const h = LJ_HOME[i], name = warm && t.id === it.answer ? "pin" : "tag-" + t.id;
          const here = t.id === childPin && !D.hide;
          return <LjPress key={"p" + t.id} id={name} label={tx("tag") + " " + t.text.join(" ")} x={h.x} y={h.y} w={LJ_TW} h={LJ_TH}
            live={live && !solved && !here} onPress={() => tryAct(name, () => pinNow(c, t.id, name))} />;
        })}
        {S.ring && it.tags.map((t: any, i: number) => (t.id === childPin ? null
          : <rect key={"rg" + t.id} x={LJ_HOME[i].x - 8} y={LJ_HOME[i].y - 8} width={LJ_TW + 16} height={LJ_TH + 16} rx={20} fill="none"
            stroke={C.accent} strokeWidth={5} strokeDasharray="12 8" pointerEvents="none" />))}
        {invite("fill", LJ_P1.tapX - 70, LJ_P1.tapY - 130, 140, 140)}
        {it.tags.map((t: any, i: number) => (warm && t.id === it.answer ? <g key={"i" + t.id}>{invite("pin", LJ_HOME[i].x, LJ_HOME[i].y, LJ_TW, LJ_TH)}</g> : null))}
      </g>
    );
  };

  /* phase 1, question 3: the teaspoon and the water tank, each takes a unit tag from its own pair */
  const drawUnits = () => (
    <g>
      {counter(20, 340, 860)}
      {it.cont.map((c: string) => {
        const U = LJ_U[c];
        const pinned = D.pins ? D.pins[c] : D.hide ? null : S.pins[c];
        const showPin = pinned && !(S.carry && S.carry.split(":")[1] === c);
        return (
          <g key={c}>
            <text x={U.nx} y={44} textAnchor="middle" fontSize={ljFit(tx(U.name), 380, T.prompt, T.label)} fontWeight={700} fill={C.ink}>{tx(U.name)}</text>
            {ljVessel(C, "u-" + c, c, U.x, U.y, 1, { s: U.s })}
            {showPin && (
              <g pointerEvents={D.pins ? "none" : undefined}>
                {U.rim && <line x1={U.pin.x + 24} y1={U.pin.y + LJ_UH / 2} x2={U.rim[0]} y2={U.rim[1]} stroke={C.ink} strokeWidth={3} />}
                {ljTag(C, U.pin.x, U.pin.y, LJ_UW, LJ_UH, [tx(pinned)])}
              </g>
            )}
            {["mL", "L"].map((u: string) => {
              const t = U.tray[u], id = "unit:" + c + ":" + u;
              const gone = (S.pins[c] === u && !D.hide) || S.carry === id;
              const lit = D.hide && S.pins[c] === u;
              /* an early Enter rings the trays of a container still without its unit (or every tag still to choose) */
              const ringIt = S.ring && !gone && (!S.pins[c] || pinValue(S.pins) !== null);
              return (
                <g key={u}>
                  {ljTag(C, t.x, t.y, LJ_UW, LJ_UH, [tx(u)], gone ? { ghost: true } : { lit })}
                  {ringIt && <rect x={t.x - 8} y={t.y - 8} width={LJ_UW + 16} height={LJ_UH + 16} rx={20} fill="none" stroke={C.accent} strokeWidth={5} strokeDasharray="12 8" pointerEvents="none" />}
                </g>
              );
            })}
          </g>
        );
      })}
      {it.cont.map((c: string) => ["mL", "L"].map((u: string) => {
        const t = LJ_U[c].tray[u], id = "unit:" + c + ":" + u, name = "unit-" + c + "-" + u;
        const here = S.pins[c] === u && !D.hide;
        return <LjPress key={name} id={name} label={tx(u) + " " + tx(LJ_U[c].name)} x={t.x} y={t.y} w={LJ_UW} h={LJ_UH}
          live={live && !solved && !here} onPress={() => tryAct(name, () => pinNow(c, id, name))} />;
      }))}
    </g>
  );

  /* phase 2 and free play: the pouring bay */
  const drawBay = () => {
    /* while a correction or a win stands, its own levels are drawn (the child's come back on the child's next act) */
    const demoOn = !!D.fill;
    const fillOf = (r: number) => (demoOn ? D.fill[r] || 0 : S.fill[r] || 0);
    return (
      <g>
        {lay.jugs.map((J: any) => {
          /* the jug (mirrored: its spout leads to the glasses) and the bottle wear their skins; the kettle stays plain */
          const V = LJ_VES[J.v], sk = skinOf(J.v), hh = V.h * J.s;
          const lv = demoOn ? D.jlv ?? 0 : S.jlv[J.id] ?? 1;
          const top = sk ? ljSkinTop(sk, J.y, hh, lv) : J.y - hh * lv;
          const brim = D.brim ? LJ_EDGE : undefined;
          return (
            <g key={J.id}>
              {J.tap && ljTap(C, J.tap.x, J.tap.y, S.tapflow === J.id ? top : null, 1, 0)}
              {counter(J.x - 105, J.y, 210)}
              {S.away !== J.id && (sk ? ljSkinV(C, "j-" + J.id, sk, J.x, J.y, hh, lv, { flip: J.v === "jug", dry: J.opaque, brim })
                : ljVessel(C, "j-" + J.id, J.v, J.x, J.y, lv, { s: J.s, opaque: J.opaque, brim }))}
              {J.name && S.away !== J.id && (
                <g>
                  <circle cx={J.x + hh * LJ_SK.jug.ar * 0.11} cy={J.y - hh * 0.42 - 20} r={30} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
                  <text x={J.x + hh * LJ_SK.jug.ar * 0.11} y={J.y - hh * 0.42} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{J.name}</text>
                </g>
              )}
            </g>
          );
        })}
        {lay.rows.map((R: any, r: number) => {
          const nFull = fillOf(r);
          const lastX = R.x0 + (R.n - 1) * R.dx, gh = LJ_VES[R.g].h * R.s;
          return (
            <g key={"r" + r}>
              {counter(R.x0 - 44, R.base, lastX - R.x0 + 88)}
              {Array.from({ length: R.n }, (_, i) => (
                <g key={i}>
                  {R.sk ? ljSkinV(C, "g" + r + "-" + i, R.sk, R.x0 + i * R.dx, R.base, gh, i < nFull ? 1 : 0)
                    : ljVessel(C, "g" + r + "-" + i, R.g, R.x0 + i * R.dx, R.base, i < nFull ? 1 : 0, { s: R.s })}
                  {i < nFull && <text x={R.x0 + i * R.dx} y={R.base + 50} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={LJ_INK.count}>{i + 1}</text>}
                </g>
              ))}
            </g>
          );
        })}
        {/* the kettle's two counts, under it once each row has been tipped back (the correction and the win) */}
        {kind === "twoRows" && D.counted && lay.rows.map((R: any, r: number) => (D.counted[r]
          ? <text key={"cn" + r} x={r === 0 ? 64 : 218} y={424} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LJ_INK.count}>{`${D.counted[r]} ${tx(R.word)}`}</text> : null))}
        {/* the two jugs' glasses: how much each glass holds, beside its row (the correction and the win) */}
        {kind === "twoJugs" && D.tot && lay.rows.map((R: any, r: number) => (
          <text key={"eg" + r} x={556} y={r === 0 ? 118 : lang === "en" ? 360 : 365} textAnchor="middle" fontSize={ljFit(`${tx("each glass:")} ${it.rows[r].ml} ${umL}`, 540, T.label)} fontWeight={700} fill={LJ_INK.ml}>{`${tx("each glass:")} ${it.rows[r].ml} ${umL}`}</text>
        ))}
        {kind === "cups" && <text x={560} y={274} textAnchor="middle" fontSize={ljFit(`${tx("each cup:")} ${it.rows[0].ml} ${umL}`, 520, T.prompt, T.label)} fontWeight={700} fill={C.ink}>{`${tx("each cup:")} ${it.rows[0].ml} ${umL}`}</text>}
        {/* the correction and the win: running totals (the bottle's cups), each jug's water, and which glasses are bigger */}
        <g pointerEvents="none">
          {kind === "cups" && D.tot && lay.rows[0] && Array.from({ length: Math.min(D.tot, lay.rows[0].n) }, (_, i) => {
            const R = lay.rows[0], g = glassAt(R, i);
            return <text key={"t" + i} x={g.x} y={g.top - 14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LJ_INK.ml}>{(i + 1) * it.rows[0].ml}</text>;
          })}
          {kind === "cups" && D.verdict && (
            <text x={560} y={196} textAnchor="middle" fontSize={ljFit(`${it.rows[0].n} × ${it.rows[0].ml} ${umL} = ${it.rows[0].n * it.rows[0].ml} ${umL}`, 600, T.speech)} fontWeight={700} fill={LJ_INK.ml}>
              {`${it.rows[0].n} × ${it.rows[0].ml} ${umL} = ${it.rows[0].n * it.rows[0].ml} ${umL}`}</text>
          )}
          {kind === "twoJugs" && D.tot && lay.jugs.map((J: any, j: number) => (
            <text key={"jt" + j} x={J.x} y={J.y + 46} textAnchor="middle" fontSize={ljFit(`${indian(it.rows[j].n * it.rows[j].ml)} ${umL}`, 220, T.label)} fontWeight={700} fill={LJ_INK.ml}>{`${indian(it.rows[j].n * it.rows[j].ml)} ${umL}`}</text>
          ))}
          {(kind === "twoJugs" || kind === "twoRows") && D.verdict && (() => {
            /* the verdict chip: between the rows (two jugs), or in the room under the kettle (one kettle, two rows) */
            /* two jugs: in the free room at the top right (a 56-tall band holds a Devanagari line, matras and all); one kettle: under it */
            const ind = lang !== "en";
            const vb = kind === "twoJugs" ? { x: 10, y: 262, w: 330, h: 56 } : { x: 0, y: 444, w: 300, h: 56 };
            return (
              <g>
                <rect x={vb.x} y={vb.y} width={vb.w} height={vb.h} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
                <text x={vb.x + vb.w / 2} y={vb.y + vb.h / 2 + (ind ? 13 : 11)} textAnchor="middle" fontWeight={700} fill={C.ink}
                  fontSize={ljFit(kind === "twoJugs" ? tx("jug 2 holds more") : tx("mugs hold more"), vb.w - 24, T.label)}>
                  {kind === "twoJugs" ? tx("jug 2 holds more") : tx("mugs hold more")}</text>
              </g>
            );
          })()}
        </g>
        {lay.jugs.map((J: any) => {
          const V = LJ_VES[J.v], name = lay.jugs.length > 1 ? "pour-" + J.name : "pour";
          const x = J.x - 95, y = J.y - V.h * J.s - (J.v === "kettle" ? 60 : 20), w = 190, h = J.y - y + 10;
          return (
            <g key={"pj" + J.id}>
              <LjPress id={name} label={tx(J.v === "bottle" ? "bottle" : J.v === "kettle" ? "kettle" : "jug") + (J.name ? " " + J.name : "")} x={x} y={y} w={w} h={h}
                live={live && !solved} onPress={() => tryAct(name, () => pourNow(J.id, null, name))} />
              {invite(name, x, y, w, h)}
            </g>
          );
        })}
        {lay.rows.map((R: any, r: number) => {
          const g0 = glassAt(R, 0), lastX = R.x0 + (R.n - 1) * R.dx, name = "row-" + (r + 1);
          return <LjPress key={"pr" + r} id={name} label={tx(R.g === "glassL" || R.g === "mug" ? "big glasses" : "small glasses")} x={R.x0 - 44} y={g0.top - 8}
            w={lastX - R.x0 + 88} h={R.base - g0.top + 64} live={live && !solved} onPress={() => tryAct(name, () => pourNow(R.jug, r, name))} />;
        })}
      </g>
    );
  };

  /* phases 3 and 4: the litre bottle, the measuring jug, the card, the converter, what comes out, the place board */
  const drawConv = () => {
    const toMl = kind === "toml", V = LJ_CV;
    const full = !!D.done;
    const rows = rowsOf(), nk = Math.min(D.k || 0, rows.length);
    const ml = toMl ? it.L * 1000 + it.mL : it.card;
    const q = Math.floor(ml / 1000), r = ml % 1000;
    const digits = String(ml).split("");
    /* before the card goes through, always five empty places (ten thousands to ones), so the board never tells how many digits */
    const nb = full ? digits.length : 5, B = V.board;
    const bx0 = B.cx - (nb * B.bw + (nb - 1) * B.gap) / 2;
    const heads = ["TTh", "Th", "H", "T", "O"].slice(5 - nb);
    const litreDigits = nb - 3;
    const inkOf = (d: string, i: number) => (d === "0" && i >= litreDigits ? LJ_C.zero : i < litreDigits ? LJ_INK.litre : LJ_INK.ml);
    const cardGone = S.cAway || (warm && S.conv);
    return (
      <g>
        {/* the litre bottle and the measuring jug (the one thing to play with before answering) */}
        {counter(4, V.by, 300)}
        {ljMJug(C, "mj", V.mx, V.mb, V.mh, S.mlv * 1000, S.poured, [500, 1000], umL)}
        {!S.bAway && (
          <g>
            {ljSkinV(C, "litre", "bottle", V.bx, V.by, 175 * V.bs, S.blv)}
            {/* the bottle's name on a white chip, so it reads on the copper and on the water alike */}
            {(() => {
              const t1 = "1 " + uL, fs = lang === "en" ? T.label : T.micro, cw = Math.max(68, Math.ceil(ljEm(t1) * fs) + 20);
              return (
                <g>
                  <rect x={V.bx - cw / 2} y={V.by - 92} width={cw} height={44} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
                  <text x={V.bx} y={V.by - 60} textAnchor="middle" fontSize={fs} fontWeight={700} fill={LJ_INK.litre}>{t1}</text>
                </g>
              );
            })()}
          </g>
        )}
        {/* the card */}
        {cardGone ? <rect x={V.card.x} y={V.card.y} width={V.card.w} height={V.card.h} rx={14} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="10 8" />
          : cardNode(V.card.x + V.card.w / 2, V.card.y + V.card.h / 2)}
        {/* the converter: one number, a thousand */}
        <path d={`M 600 ${V.conv.y} L 680 ${V.conv.y} L 668 ${V.conv.y - 12} L 612 ${V.conv.y - 12} Z`} fill={tint(C.rule, 0.3)} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
        <rect x={V.conv.x} y={V.conv.y} width={V.conv.w} height={V.conv.h} rx={24} fill="url(#gPanel)" stroke={C.ink} strokeWidth={3} />
        <circle cx={V.conv.x + 28} cy={V.conv.y + 28} r={7} fill="none" stroke={C.ink} strokeWidth={2.5} />
        <circle cx={V.conv.x + V.conv.w - 28} cy={V.conv.y + 28} r={7} fill="none" stroke={C.ink} strokeWidth={2.5} />
        <text x={V.conv.x + V.conv.w / 2} y={V.conv.y + 80} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{toMl ? "× 1,000" : "÷ 1,000"}</text>
        {D.lit && <rect x={V.conv.x + 52} y={V.conv.y + 10} width={V.conv.w - 104} height={V.conv.h - 20} rx={18} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}
        <path d={`M 612 ${V.conv.y + V.conv.h} L 668 ${V.conv.y + V.conv.h} L 658 ${V.conv.y + V.conv.h + 12} L 622 ${V.conv.y + V.conv.h + 12} Z`} fill={tint(C.rule, 0.3)} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
        {/* what comes out: empty until the card has gone through (the warm-up, the correction, the win) */}
        {toMl ? (
          <g>
            <rect x={V.out.x} y={V.out.y} width={V.out.w} height={V.out.h} rx={14} fill="#FFFFFF" stroke={full ? C.ink : C.rule} strokeWidth={3} strokeDasharray={full ? undefined : "10 8"} />
            {full && <text x={V.out.x + V.out.w / 2} y={V.out.y + 56} textAnchor="middle" fontSize={ljFit(`${indian(ml)} ${umL}`, V.out.w - 28, T.speech)} fontWeight={700} fill={LJ_INK.ml}>{`${indian(ml)} ${umL}`}</text>}
          </g>
        ) : (
          <g>
            {[{ b: V.slotL, u: uL, v: q, ink: LJ_INK.litre }, { b: V.slotM, u: umL, v: r, ink: LJ_INK.ml }].map((sl: any, j: number) => {
              /* the unit at the slot's right end, the number ending 10 before it (both measured, so a long unit never runs into it) */
              const uw = Math.ceil(ljEm(sl.u) * T.label), nx = sl.b.x + sl.b.w - 16 - uw - 10;
              return (
                <g key={j}>
                  <rect x={sl.b.x} y={sl.b.y} width={sl.b.w} height={sl.b.h} rx={14} fill="#FFFFFF" stroke={full ? sl.ink : C.rule} strokeWidth={3} strokeDasharray={full ? undefined : "10 8"} />
                  {full && <text x={nx} y={sl.b.y + 56} textAnchor="end" fontSize={ljFit(String(sl.v), nx - sl.b.x - 14, T.speech)} fontWeight={700} fill={sl.ink}>{sl.v}</text>}
                  <text x={sl.b.x + sl.b.w - 16} y={sl.b.y + 54} textAnchor="end" fontSize={T.label} fontWeight={700} fill={full ? sl.ink : C.ink}>{sl.u}</text>
                </g>
              );
            })}
          </g>
        )}
        {/* the place board: a box a place, a grey zero holding every empty place of the millilitres */}
        {heads.map((hd: string, i: number) => {
          const x = bx0 + i * (B.bw + B.gap), d = digits[i];
          return (
            <g key={hd}>
              <text x={x + B.bw / 2} y={B.hy} textAnchor="middle" fontSize={ljFit(tx(hd), B.bw + B.gap - 6, T.label)} fontWeight={700} fill={C.ink}>{tx(hd)}</text>
              <rect x={x} y={B.y} width={B.bw} height={B.h} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
              {full && <text x={x + B.bw / 2} y={B.y + 66} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={inkOf(d, i)}>{d}</text>}
            </g>
          );
        })}
        {full && (
          <g pointerEvents="none">
            <line x1={bx0 + litreDigits * (B.bw + B.gap) - B.gap / 2} x2={bx0 + litreDigits * (B.bw + B.gap) - B.gap / 2} y1={B.y - 6} y2={B.y + B.h + 8} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <text x={bx0 + (litreDigits * (B.bw + B.gap) - B.gap) / 2} y={B.y + B.h + 42} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LJ_INK.litre}>{uL}</text>
            <text x={bx0 + litreDigits * (B.bw + B.gap) + (3 * (B.bw + B.gap) - B.gap) / 2} y={B.y + B.h + 42} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LJ_INK.ml}>{umL}</text>
          </g>
        )}
        {/* the worked lines, one a step */}
        {nk > 0 && (
          <g pointerEvents="none">
            {rows.slice(0, nk).map((row: string, i: number) => {
              const last = i === rows.length - 1;
              return <text key={i} x={V.rows.x} y={V.rows.y + i * V.rows.dy} fontSize={ljFit(row, 400, T.label)} fontWeight={700} fill={last ? (toMl ? LJ_INK.ml : C.ink) : C.ink}>{row}</text>;
            })}
          </g>
        )}
        <LjPress id="pour" label={tx("1 L bottle")} x={V.bx - 56} y={V.by - 238} w={112} h={244} live={live && !solved && (!S.poured || !warm)} onPress={() => tryAct("pour", () => pourBottle("pour"))} />
        {invite("pour", V.bx - 56, V.by - 238, 112, 244)}
        {warm && !S.conv && (
          <g>
            <LjPress id="convert" label={tx("card")} x={V.card.x} y={V.card.y} w={V.card.w} h={V.card.h} live={live} onPress={() => tryAct("convert", () => convertNow("convert"))} />
            {invite("convert", V.card.x, V.card.y, V.card.w, V.card.h)}
          </g>
        )}
      </g>
    );
  };

  return (
    <g transform={`translate(${ox},${oy})`}>
      {kind === "tag" ? drawTag1()
        : kind === "units" ? drawUnits()
        : lay ? drawBay()
        : kind === "toml" || kind === "tolml" ? drawConv() : null}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (`it` is the item, r24) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item: any = it || last.it || (((PHASES as any)[(n || 1) - 1] || { items: [] }).items[last.item]) || {};
  /* a real picture of the question, wholly inside the frame (236 x 66 with four phases), every word through tx and fitted, never
     under 28: a tag answer is a mini tag, the units answer a tiny spoon and tank with their units, the rest the card the phase shows */
  const key = String((item && item.qid) || "x").replace(/[^A-Za-z0-9]/g, "");
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  const card = (body: any, text: string) => {
    const fs = ljFit(text, w - 32, T.label, T.micro);
    return (
      <g>
        {frame}
        <rect x={8} y={7} width={w - 16} height={h - 14} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={w / 2} y={h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>{body}</text>
      </g>
    );
  };
  if (item.kind === "tag") {
    const t = (item.tags || []).find((x: any) => x.id === last.value), s = tx(t ? t.text.join(" ") : "");
    return <g>{frame}{ljTag(C, 8, 6, w - 16, h - 12, [s], { size: ljFit(s, w - 16 - 54, T.label, T.micro) })}</g>;
  }
  if (item.kind === "units") {
    const u = String(last.value).split("|").map((x: string) => tx(x || ""));
    /* two pairs, each unit tight to its own picture (about 5) and 24 between the pairs, so no unit reads as the other's */
    const f = lang === "en" ? T.label : T.micro, w0 = ljEm(u[0]) * f, sx = 6, tx0 = sx + 46, tk = tx0 + w0 + 24, tx1 = tk + 38;
    return (
      <g>
        {frame}
        {ljVessel(C, "ths" + key, "spoon", sx + 10, h / 2 + 6, 1, { s: 0.26, sw: 1.5 })}
        <text x={tx0} y={h / 2 + f * 0.36} fontSize={f} fontWeight={700} fill={LJ_INK.ml}>{u[0]}</text>
        {ljVessel(C, "tht" + key, "tank", tk + 16, h - 12, 1, { s: 0.2, sw: 1.5 })}
        <text x={tx1} y={h / 2 + f * 0.36} fontSize={f} fontWeight={700} fill={LJ_INK.litre}>{u[1]}</text>
      </g>
    );
  }
  if (item.choices) { const s = tx((item.choices.find((c: any) => c.id === last.value) || { label: "" }).label); return card(s, s); }
  if (item.parts) {
    const p = slotPartsOf(last.value, 2), a = `${p[0]} ${tx("L")}`, b = `${p[1]} ${tx("mL")}`;
    return card(<tspan><tspan fill={LJ_INK.litre}>{a}</tspan><tspan fill={LJ_INK.ml}>{" " + b}</tspan></tspan>, a + " " + b);
  }
  const s = `${indian(Number(last.value))} ${tx("mL")}`;
  return card(<tspan fill={LJ_INK.ml}>{s}</tspan>, s);
}

function LitreJug(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: ljFormat, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area the whole card until the child taps Answer */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right */
      keyOnly: true,
      /* the wide keypad (PATTERNS.md 9g): the picture is laid out 900 wide, so it fits x 64 to 964 with the panel open */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (LAYOUT.md §1d): one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default LitreJug;
