/* ═══ M2.S4.T7.C24.2D1 · litre_jug · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "litre_jug";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Litre Jug";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A tap, some containers and a jug. How much can each one hold?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every container got its capacity, the glasses were counted, and every capacity was changed by a thousand.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line, cut to what
   free play really offers: the tap with five containers, and the kettle with two sets of glasses) */
const FREE_LINE = "Free play. Fill any container from the tap, and pour the kettle into the glasses or the mugs.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Litre Jug": "लीटर जग",
    "A tap, some containers and a jug. How much can each one hold?": "एक नल, कुछ बर्तन और एक जग। हर बर्तन में कितना आ सकता है?",
    "Every container got its capacity, the glasses were counted, and every capacity was changed by a thousand.": "हर बर्तन को उसकी धारिता मिली और गिलास गिने गए। हर धारिता हज़ार से बदली गई।",
    "Free play. Fill any container from the tap, and pour the kettle into the glasses or the mugs.": "मुक्त खेल। नल से कोई भी बर्तन भरो, और केतली को गिलासों या मगों में उँडेलो।",
    /* phase 1 */
    "What capacity is": "धारिता क्या है",
    "Put a container under the tap and fill it to the top. Then pin the tag that tells how much it holds onto it.": "किसी बर्तन को नल के नीचे रखो और ऊपर तक भरो। फिर उस पर वह पर्ची लगाओ जो बताए कि उसमें कितना आता है।",
    "What fills the container to the top?": "बर्तन को ऊपर तक क्या भरता है?",
    "Capacity is how much water fits inside, from a spoonful to a whole tank.": "धारिता यानी अंदर कितना पानी समाता है, एक चम्मच भर से पूरी टंकी तक।",
    "Capacity is the quantity of liquid a container can hold, measured in millilitres and litres.": "धारिता वह मात्रा है जितना द्रव एक बर्तन में आ सकता है। इसे मिलीलीटर और लीटर में मापते हैं।",
    "You learned: capacity is how much liquid a container can hold.": "तुमने सीखा: धारिता यानी बर्तन में कितना द्रव आ सकता है।",
    "A jug is 25 centimetres tall, weighs 400 grams and holds 2 litres when full. Pin its capacity on the jug.": "एक जग 25 सेंटीमीटर ऊँचा है और 400 ग्राम भारी है। भरने पर उसमें 2 लीटर आता है। जग पर उसकी धारिता लगाओ।",
    "Which tag is its capacity?": "कौन-सी पर्ची उसकी धारिता है?",
    "A bigger number is not a bigger capacity. Which tag tells about the water inside?": "बड़ी संख्या का मतलब बड़ी धारिता नहीं। कौन-सी पर्ची अंदर के पानी के बारे में बताती है?",
    "Which of these is a capacity: how tall a bottle is, how heavy it is, or how much water it holds?": "बोतल कितनी ऊँची है, कितनी भारी है, या उसमें कितना पानी आता है? इनमें से धारिता कौन-सी है?",
    "Which is a capacity?": "धारिता कौन-सी है?",
    "Think of pouring water in. Which tag tells about that?": "अंदर पानी डालने के बारे में सोचो। कौन-सी पर्ची उसके बारे में बताती है?",
    "Would you give the capacity of a teaspoon in millilitres or litres? And of a water tank? Pin one unit on each.": "छोटे चम्मच की धारिता तुम मिलीलीटर में बताओगे या लीटर में? और पानी की टंकी की? हर एक पर एक मात्रक लगाओ।",
    "Spoon and tank: mL or L?": "चम्मच और टंकी: मिली या ली?",
    "A teaspoon holds very little, and a tank holds a lot. Which unit is the small one?": "चम्मच में बहुत थोड़ा आता है, और टंकी में बहुत ज़्यादा। छोटा मात्रक कौन-सा है?",
    "25 cm": "25 सेमी", "400 g": "400 ग्रा", "2 L": "2 ली",
    "how tall": "कितनी ऊँची", "how heavy": "कितनी भारी", "how much water": "कितना पानी",
    "mL": "मिली", "L": "ली",
    "mL and L": "मिली और ली", "L and mL": "ली और मिली", "mL and mL": "मिली और मिली", "L and L": "ली और ली",
    "spoon": "चम्मच", "tank": "टंकी",
    /* phase 2 */
    "Counting in glasses": "गिलासों में गिनती",
    "A kettle, some glasses and some mugs. Pour it and count.": "एक केतली, कुछ गिलास और कुछ मग। उँडेलो और गिनो।",
    "How much does one glass hold?": "एक गिलास में कितना आता है?",
    "A big glass takes more water than a small one, so fewer of them are filled.": "बड़े गिलास में छोटे से ज़्यादा पानी आता है, इसलिए कम गिलास भरते हैं।",
    "A count of glasses is a capacity in glasses, and it depends on the glass. To give the exact capacity, measure it in litres and millilitres.": "गिलासों की गिनती गिलासों में धारिता है। यह गिलास पर निर्भर करती है। ठीक धारिता बताने के लिए उसे लीटर और मिलीलीटर में मापो।",
    "You learned: a count of glasses depends on the size of the glass.": "तुमने सीखा: गिलासों की गिनती गिलास के आकार पर निर्भर करती है।",
    "A full kettle fills 4 mugs. The same full kettle fills 8 small glasses. Why are the counts different?": "भरी केतली से 4 मग भरते हैं। वही भरी केतली 8 छोटे गिलास भरती है। गिनती अलग क्यों है?",
    "Why do the counts differ?": "गिनती अलग क्यों है?",
    "The kettle was filled to the same line both times. So what else was different?": "दोनों बार केतली एक ही रेखा तक भरी गई थी। तो और क्या अलग था?",
    "The kettle changed": "केतली बदल गई", "Mugs hold more": "मग में ज़्यादा", "Glasses hold more": "गिलास में ज़्यादा",
    "Two jugs each fill 7 glasses, but the second jug's glasses are bigger. Do the two jugs hold the same?": "दो जग, हर एक 7 गिलास भरता है, पर दूसरे जग के गिलास बड़े हैं। क्या दोनों जगों में बराबर आता है?",
    "Do they hold the same?": "क्या बराबर आता है?",
    "The count is the same, seven and seven. Now look at the size of each glass.": "गिनती बराबर है, सात और सात। अब हर गिलास का आकार देखो।",
    "They hold the same": "बराबर आता है", "The first holds more": "पहले में ज़्यादा", "The second holds more": "दूसरे में ज़्यादा",
    "A bottle fills 6 glasses, and each glass holds exactly 150 millilitres. What is the bottle's capacity?": "एक बोतल 6 गिलास भरती है, और हर गिलास में ठीक 150 मिलीलीटर आता है। बोतल की धारिता क्या है?",
    "Bottle's capacity in mL?": "बोतल की धारिता मिली में?",
    "Six is how many glasses, not how much water. How much do all six glasses hold?": "छह गिलासों की गिनती है, पानी कितना है यह नहीं। सभी छह गिलासों में कुल कितना आता है?",
    "glasses filled": "भरे गिलास", "mugs filled": "भरे मग",
    "mugs hold more": "मगों में ज़्यादा", "second jug holds more": "दूसरे जग में ज़्यादा",
    "the kettle": "केतली", "the mugs": "मग", "the glasses": "गिलास", "the same": "बराबर", "the first": "पहला", "the second": "दूसरा",
    /* phase 3 */
    "A thousand millilitres make a litre": "हज़ार मिलीलीटर से एक लीटर बनता है",
    "How many millilitres fill the litre bottle? The converter uses that number.": "लीटर की बोतल में कितने मिलीलीटर आते हैं? परिवर्तक उसी संख्या से काम करता है।",
    "Where did the litre bottle stop on the measuring jug?": "मापने वाले जग पर लीटर की बोतल कहाँ तक पहुँची?",
    "Multiply the litres by the converter's number. Then add any millilitres on.": "लीटर को परिवर्तक की संख्या से गुणा करो। फिर जो मिलीलीटर हों, जोड़ दो।",
    "A thousand millilitres make a litre. Litres become millilitres by multiplying by a thousand, and only by a thousand, with any millilitres added on.": "हज़ार मिलीलीटर से एक लीटर बनता है। लीटर से मिलीलीटर बनाने के लिए हज़ार से गुणा करो, सिर्फ़ हज़ार से। फिर बचे मिलीलीटर जोड़ो।",
    "You learned: a litre is 1,000 millilitres; multiply litres by 1,000.": "तुमने सीखा: एक लीटर 1,000 मिलीलीटर है; लीटर को 1,000 से गुणा करो।",
    "How many millilitres are there in 9 litres 340 millilitres?": "9 लीटर 340 मिलीलीटर में कितने मिलीलीटर हैं?",
    "How many mL in 9 L 340 mL?": "9 ली 340 मिली में कितने मिली?",
    "What number is printed on the converter?": "परिवर्तक पर कौन-सी संख्या छपी है?",
    "Convert 14 litres into millilitres.": "14 लीटर को मिलीलीटर में बदलो।",
    "How many mL in 14 L?": "14 ली में कितने मिली?",
    "Fourteen litres is fourteen full litre bottles. How much does each one hold?": "चौदह लीटर यानी लीटर की चौदह भरी बोतलें। हर एक में कितना आता है?",
    "Now 2 litres 75 millilitres. Change it the same way.": "अब 2 लीटर 75 मिलीलीटर। इसे भी वैसे ही बदलो।",
    "How many mL in 2 L 75 mL?": "2 ली 75 मिली में कितने मिली?",
    "75 millilitres has no hundreds. Which place needs a zero?": "75 मिलीलीटर में कोई सैकड़ा नहीं है। किस स्थान पर शून्य चाहिए?",
    "TTh": "द.ह.", "Th": "ह.", "H": "सै.", "T": "द.", "O": "इ.",
    /* phase 4 */
    "Millilitres into litres and millilitres": "मिलीलीटर से लीटर और मिलीलीटर",
    "How many whole litres are in it? What is left stays in millilitres.": "इसमें कितने पूरे लीटर हैं? जो बचे, वह मिलीलीटर में रहता है।",
    "Take out as many thousands as you can. What stays behind?": "जितने हज़ार निकाल सको, निकालो। पीछे क्या बचता है?",
    "Split off the last three digits. They stay as millilitres.": "आख़िरी तीन अंक अलग करो। वे मिलीलीटर रहते हैं।",
    "Millilitres become litres and millilitres by dividing by a thousand. The quotient is the litres and the remainder stays as millilitres.": "हज़ार से भाग देकर मिलीलीटर, लीटर और मिलीलीटर बनते हैं। भागफल लीटर है और शेषफल मिलीलीटर रहता है।",
    "You learned: divide by 1,000; the remainder stays as millilitres.": "तुमने सीखा: 1,000 से भाग दो; शेषफल मिलीलीटर रहता है।",
    "Write 6,090 millilitres in litres and millilitres.": "6,090 मिलीलीटर को लीटर और मिलीलीटर में लिखो।",
    "6,090 mL in L and mL?": "6,090 मिली, ली और मिली में?",
    "What does the zero in the hundreds place tell you?": "सैकड़े के स्थान का शून्य तुम्हें क्या बताता है?",
    "Now 12,400 millilitres. Split it into litres and millilitres.": "अब 12,400 मिलीलीटर। इसे लीटर और मिलीलीटर में बाँटो।",
    "12,400 mL in L and mL?": "12,400 मिली, ली और मिली में?",
    "A litre is a thousand millilitres, not a hundred. So divide by a thousand.": "एक लीटर हज़ार मिलीलीटर है, सौ नहीं। इसलिए हज़ार से भाग दो।",
    "A child writes 7,400 millilitres as 74 litres. What went wrong? Write it the right way.": "एक बच्चा 7,400 मिलीलीटर को 74 लीटर लिखता है। क्या गलती हुई? इसे सही तरह लिखो।",
    "7,400 mL in L and mL?": "7,400 मिली, ली और मिली में?",
    "74 litres would be 74,000 millilitres. Is that the card?": "74 लीटर तो 74,000 मिलीलीटर होंगे। क्या कार्ड पर यही है?",
    "remainder": "शेषफल",
  },
  gu: {
    "Litre Jug": "લિટર જગ",
    "A tap, some containers and a jug. How much can each one hold?": "એક નળ, થોડાં વાસણ અને એક જગ. દરેક વાસણમાં કેટલું સમાઈ શકે?",
    "Every container got its capacity, the glasses were counted, and every capacity was changed by a thousand.": "દરેક વાસણને તેની ક્ષમતા મળી અને ગ્લાસ ગણાયા. દરેક ક્ષમતા હજારથી બદલાઈ.",
    "Free play. Fill any container from the tap, and pour the kettle into the glasses or the mugs.": "મુક્ત રમત. નળથી કોઈ પણ વાસણ ભરો, અને કીટલીને ગ્લાસ કે મગમાં રેડો.",
    /* phase 1 */
    "What capacity is": "ક્ષમતા એટલે શું",
    "Put a container under the tap and fill it to the top. Then pin the tag that tells how much it holds onto it.": "કોઈ વાસણ નળ નીચે મૂકો અને ઉપર સુધી ભરો. પછી તેના પર એ ચિઠ્ઠી લગાવો જે કહે કે તેમાં કેટલું સમાય છે.",
    "What fills the container to the top?": "વાસણને ઉપર સુધી શું ભરે છે?",
    "Capacity is how much water fits inside, from a spoonful to a whole tank.": "ક્ષમતા એટલે અંદર કેટલું પાણી સમાય, એક ચમચીથી આખી ટાંકી સુધી.",
    "Capacity is the quantity of liquid a container can hold, measured in millilitres and litres.": "ક્ષમતા એટલે વાસણમાં સમાઈ શકે તેટલું પ્રવાહી. તે મિલિલિટર અને લિટરમાં મપાય છે.",
    "You learned: capacity is how much liquid a container can hold.": "તમે શીખ્યા: ક્ષમતા એટલે વાસણમાં કેટલું પ્રવાહી સમાય.",
    "A jug is 25 centimetres tall, weighs 400 grams and holds 2 litres when full. Pin its capacity on the jug.": "એક જગ 25 સેન્ટિમીટર ઊંચો છે અને 400 ગ્રામ વજનનો છે. ભરેલો હોય ત્યારે તેમાં 2 લિટર સમાય છે. જગ પર તેની ક્ષમતા લગાવો.",
    "Which tag is its capacity?": "કઈ ચિઠ્ઠી તેની ક્ષમતા છે?",
    "A bigger number is not a bigger capacity. Which tag tells about the water inside?": "મોટી સંખ્યા એટલે મોટી ક્ષમતા નહીં. કઈ ચિઠ્ઠી અંદરના પાણી વિશે કહે છે?",
    "Which of these is a capacity: how tall a bottle is, how heavy it is, or how much water it holds?": "બોટલ કેટલી ઊંચી છે, કેટલી ભારે છે, કે તેમાં કેટલું પાણી સમાય છે? આમાંથી ક્ષમતા કઈ છે?",
    "Which is a capacity?": "ક્ષમતા કઈ છે?",
    "Think of pouring water in. Which tag tells about that?": "અંદર પાણી રેડવાનું વિચારો. કઈ ચિઠ્ઠી એના વિશે કહે છે?",
    "Would you give the capacity of a teaspoon in millilitres or litres? And of a water tank? Pin one unit on each.": "ચમચીની ક્ષમતા તમે મિલિલિટરમાં કહેશો કે લિટરમાં? અને પાણીની ટાંકીની? દરેક પર એક માપનો એકમ લગાવો.",
    "Spoon and tank: mL or L?": "ચમચી અને ટાંકી: મિલિ કે લિ?",
    "A teaspoon holds very little, and a tank holds a lot. Which unit is the small one?": "ચમચીમાં બહુ થોડું સમાય, અને ટાંકીમાં ઘણું બધું. નાનો એકમ કયો છે?",
    "25 cm": "25 સેમી", "400 g": "400 ગ્રા", "2 L": "2 લિ",
    "how tall": "કેટલી ઊંચી", "how heavy": "કેટલી ભારે", "how much water": "કેટલું પાણી",
    "mL": "મિલિ", "L": "લિ",
    "mL and L": "મિલિ અને લિ", "L and mL": "લિ અને મિલિ", "mL and mL": "મિલિ અને મિલિ", "L and L": "લિ અને લિ",
    "spoon": "ચમચી", "tank": "ટાંકી",
    /* phase 2 */
    "Counting in glasses": "ગ્લાસમાં ગણતરી",
    "A kettle, some glasses and some mugs. Pour it and count.": "એક કીટલી, થોડા ગ્લાસ અને થોડા મગ. રેડો અને ગણો.",
    "How much does one glass hold?": "એક ગ્લાસમાં કેટલું સમાય છે?",
    "A big glass takes more water than a small one, so fewer of them are filled.": "મોટા ગ્લાસમાં નાના કરતાં વધુ પાણી સમાય, એટલે ઓછા ગ્લાસ ભરાય.",
    "A count of glasses is a capacity in glasses, and it depends on the glass. To give the exact capacity, measure it in litres and millilitres.": "ગ્લાસની ગણતરી એ ગ્લાસમાં ક્ષમતા છે. તે ગ્લાસ પર આધાર રાખે છે. ચોક્કસ ક્ષમતા કહેવા તેને લિટર અને મિલિલિટરમાં માપો.",
    "You learned: a count of glasses depends on the size of the glass.": "તમે શીખ્યા: ગ્લાસની ગણતરી ગ્લાસના કદ પર આધાર રાખે છે.",
    "A full kettle fills 4 mugs. The same full kettle fills 8 small glasses. Why are the counts different?": "ભરેલી કીટલીથી 4 મગ ભરાય છે. એ જ ભરેલી કીટલી 8 નાના ગ્લાસ ભરે છે. ગણતરી જુદી કેમ છે?",
    "Why do the counts differ?": "ગણતરી જુદી કેમ છે?",
    "The kettle was filled to the same line both times. So what else was different?": "બંને વાર કીટલી એક જ રેખા સુધી ભરાઈ હતી. તો બીજું શું જુદું હતું?",
    "The kettle changed": "કીટલી બદલાઈ", "Mugs hold more": "મગમાં વધુ", "Glasses hold more": "ગ્લાસમાં વધુ",
    "Two jugs each fill 7 glasses, but the second jug's glasses are bigger. Do the two jugs hold the same?": "બે જગ, દરેક 7 ગ્લાસ ભરે છે, પણ બીજા જગના ગ્લાસ મોટા છે. શું બંને જગમાં સરખું સમાય છે?",
    "Do they hold the same?": "શું સરખું સમાય છે?",
    "The count is the same, seven and seven. Now look at the size of each glass.": "ગણતરી સરખી છે, સાત અને સાત. હવે દરેક ગ્લાસનું કદ જુઓ.",
    "They hold the same": "સરખું સમાય", "The first holds more": "પહેલામાં વધુ", "The second holds more": "બીજામાં વધુ",
    "A bottle fills 6 glasses, and each glass holds exactly 150 millilitres. What is the bottle's capacity?": "એક બોટલ 6 ગ્લાસ ભરે છે, અને દરેક ગ્લાસમાં બરાબર 150 મિલિલિટર સમાય છે. બોટલની ક્ષમતા કેટલી છે?",
    "Bottle's capacity in mL?": "બોટલની ક્ષમતા મિલિમાં?",
    "Six is how many glasses, not how much water. How much do all six glasses hold?": "છ એ ગ્લાસની ગણતરી છે, પાણી કેટલું તે નહીં. બધા છ ગ્લાસમાં કુલ કેટલું સમાય?",
    "glasses filled": "ભરેલા ગ્લાસ", "mugs filled": "ભરેલા મગ",
    "mugs hold more": "મગમાં વધુ સમાય", "second jug holds more": "બીજા જગમાં વધુ",
    "the kettle": "કીટલી", "the mugs": "મગ", "the glasses": "ગ્લાસ", "the same": "સરખું", "the first": "પહેલો", "the second": "બીજો",
    /* phase 3 */
    "A thousand millilitres make a litre": "હજાર મિલિલિટરથી એક લિટર બને",
    "How many millilitres fill the litre bottle? The converter uses that number.": "લિટરની બોટલમાં કેટલા મિલિલિટર સમાય? રૂપાંતરક એ જ સંખ્યા વાપરે છે.",
    "Where did the litre bottle stop on the measuring jug?": "માપવાના જગ પર લિટરની બોટલ ક્યાં સુધી પહોંચી?",
    "Multiply the litres by the converter's number. Then add any millilitres on.": "લિટરને રૂપાંતરકની સંખ્યાથી ગુણો. પછી જે મિલિલિટર હોય તે ઉમેરો.",
    "A thousand millilitres make a litre. Litres become millilitres by multiplying by a thousand, and only by a thousand, with any millilitres added on.": "હજાર મિલિલિટરથી એક લિટર બને. લિટરમાંથી મિલિલિટર બનાવવા હજારથી ગુણો, ફક્ત હજારથી. પછી વધેલા મિલિલિટર ઉમેરો.",
    "You learned: a litre is 1,000 millilitres; multiply litres by 1,000.": "તમે શીખ્યા: એક લિટર 1,000 મિલિલિટર છે; લિટરને 1,000 થી ગુણો.",
    "How many millilitres are there in 9 litres 340 millilitres?": "9 લિટર 340 મિલિલિટરમાં કેટલા મિલિલિટર છે?",
    "How many mL in 9 L 340 mL?": "9 લિ 340 મિલિમાં કેટલા મિલિ?",
    "What number is printed on the converter?": "રૂપાંતરક પર કઈ સંખ્યા છાપેલી છે?",
    "Convert 14 litres into millilitres.": "14 લિટરને મિલિલિટરમાં ફેરવો.",
    "How many mL in 14 L?": "14 લિમાં કેટલા મિલિ?",
    "Fourteen litres is fourteen full litre bottles. How much does each one hold?": "ચૌદ લિટર એટલે લિટરની ચૌદ ભરેલી બોટલ. દરેકમાં કેટલું સમાય?",
    "Now 2 litres 75 millilitres. Change it the same way.": "હવે 2 લિટર 75 મિલિલિટર. તેને પણ એ જ રીતે ફેરવો.",
    "How many mL in 2 L 75 mL?": "2 લિ 75 મિલિમાં કેટલા મિલિ?",
    "75 millilitres has no hundreds. Which place needs a zero?": "75 મિલિલિટરમાં કોઈ શતક નથી. કયા સ્થાને શૂન્ય જોઈએ?",
    "TTh": "દ.હ.", "Th": "હ.", "H": "શ.", "T": "દ.", "O": "એ.",
    /* phase 4 */
    "Millilitres into litres and millilitres": "મિલિલિટરથી લિટર અને મિલિલિટર",
    "How many whole litres are in it? What is left stays in millilitres.": "તેમાં કેટલા આખા લિટર છે? જે વધે તે મિલિલિટરમાં રહે.",
    "Take out as many thousands as you can. What stays behind?": "જેટલા હજાર કાઢી શકો, કાઢો. પાછળ શું વધે છે?",
    "Split off the last three digits. They stay as millilitres.": "છેલ્લા ત્રણ અંક જુદા પાડો. તે મિલિલિટર રહે છે.",
    "Millilitres become litres and millilitres by dividing by a thousand. The quotient is the litres and the remainder stays as millilitres.": "હજારથી ભાગીને મિલિલિટરના લિટર અને મિલિલિટર બને. ભાગફળ લિટર છે અને શેષ મિલિલિટર રહે છે.",
    "You learned: divide by 1,000; the remainder stays as millilitres.": "તમે શીખ્યા: 1,000 થી ભાગો; શેષ મિલિલિટર રહે છે.",
    "Write 6,090 millilitres in litres and millilitres.": "6,090 મિલિલિટરને લિટર અને મિલિલિટરમાં લખો.",
    "6,090 mL in L and mL?": "6,090 મિલિ, લિ અને મિલિમાં?",
    "What does the zero in the hundreds place tell you?": "શતકના સ્થાનનો શૂન્ય તમને શું કહે છે?",
    "Now 12,400 millilitres. Split it into litres and millilitres.": "હવે 12,400 મિલિલિટર. તેને લિટર અને મિલિલિટરમાં વહેંચો.",
    "12,400 mL in L and mL?": "12,400 મિલિ, લિ અને મિલિમાં?",
    "A litre is a thousand millilitres, not a hundred. So divide by a thousand.": "એક લિટર હજાર મિલિલિટર છે, સો નહીં. એટલે હજારથી ભાગો.",
    "A child writes 7,400 millilitres as 74 litres. What went wrong? Write it the right way.": "એક બાળક 7,400 મિલિલિટરને 74 લિટર લખે છે. શું ભૂલ થઈ? તેને સાચી રીતે લખો.",
    "7,400 mL in L and mL?": "7,400 મિલિ, લિ અને મિલિમાં?",
    "74 litres would be 74,000 millilitres. Is that the card?": "74 લિટર તો 74,000 મિલિલિટર થાય. શું કાર્ડ પર એ છે?",
    "remainder": "શેષ",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase. Item fields of this tool:
           tag    cont (the container), tags [{ id, text, k }]: the child fills it and pins a tag (pad "enter")
           units  cont [spoon, tank], tags mL and L: one unit pinned on each (pad "enter")
           twoRows / twoJugs / cups  rows [{ g, n, ml }]: pour a full jug into glasses and count
           toml   L, mL: a card in litres and millilitres, typed in millilitres
           tolml  card (mL): typed in two boxes, litres and millilitres
           near   the item's misconception (nearMiss) */
const PHASES = [
  {
    n: 1,
    concept: "What capacity is",
    conceptId: "M2.S4.T7.C24", objectiveIds: ["O11"],
    says: ["Put a container under the tap and fill it to the top. Then pin the tag that tells how much it holds onto it."],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: which tag says how much it holds? Second rung, the phase's: what fills the container to the brim? Third rung: the row is cut to one container, and the child fills it and tags it before the others come back. The tags and the number pad stay open behind all three rungs. */
    ladder: ["What fills the container to the top?", "Capacity is how much water fits inside, from a spoonful to a whole tank."],
    closing: "Capacity is the quantity of liquid a container can hold, measured in millilitres and litres.",
    learned: "You learned: capacity is how much liquid a container can hold.",
    traceback: "The tag goes back, the container fills from the tap to the top (a bottle is also poured into an empty jug, a spoon into a small measuring jug, a tank read in litres), and the right tag is pinned on it.",
    items: [
      /* learn ML1: answer in the plan = 2 L, because capacity is how much liquid the jug can hold */
      { qid: "M2.S4.T7.C24:ML1", kind: "tag", pad: "enter", cont: "jug", winMs: 2200,
        tags: [{ id: "t-25cm", text: ["25 cm"], k: "height" }, { id: "t-400g", text: ["400 g"], k: "weight" }, { id: "t-2L", text: ["2 L"], k: "capacity" }],
        say: "A jug is 25 centimetres tall, weighs 400 grams and holds 2 litres when full. Pin its capacity on the jug.",
        ask: "Which tag is its capacity?", answer: "t-2L", near: "t-400g",
        miss: "A bigger number is not a bigger capacity. Which tag tells about the water inside?" },
      /* practice 1: answer in the plan = How much water it holds */
      { qid: "M2.S4.T7.C24:1", kind: "tag", pad: "enter", cont: "bottle", winMs: 2200,
        tags: [{ id: "t-tall", text: ["how tall"], k: "height" }, { id: "t-heavy", text: ["how heavy"], k: "weight" }, { id: "t-holds", text: ["how much", "water"], k: "capacity" }],
        say: "Which of these is a capacity: how tall a bottle is, how heavy it is, or how much water it holds?",
        ask: "Which is a capacity?", answer: "t-holds", near: "t-tall",
        miss: "Think of pouring water in. Which tag tells about that?" },
      /* practice 2: answer in the plan = The teaspoon in millilitres, and the water tank in litres */
      { qid: "M2.S4.T7.C24:2", kind: "units", pad: "enter", cont: ["spoon", "tank"], winMs: 2200,
        tags: [{ id: "mL", text: ["mL"], k: "small" }, { id: "L", text: ["L"], k: "large" }],
        say: "Would you give the capacity of a teaspoon in millilitres or litres? And of a water tank? Pin one unit on each.",
        ask: "Spoon and tank: mL or L?", answer: "mL|L", near: "L|mL",
        miss: "A teaspoon holds very little, and a tank holds a lot. Which unit is the small one?" },
    ],
  },
  {
    n: 2,
    concept: "Counting in glasses",
    conceptId: "M2.S4.T7.C25", objectiveIds: ["O11"],
    says: ["A kettle, some glasses and some mugs. Pour it and count."],
    /* tries, as the plan writes it: First rung, from the item: did the jug or the glasses change? Second rung, the phase's: how much does one glass hold? Third rung: the bay is cut to one row of glasses, and the child pours and counts it before the second row comes back. The word pad and the number pad stay open. */
    ladder: ["How much does one glass hold?", "A big glass takes more water than a small one, so fewer of them are filled."],
    closing: "A count of glasses is a capacity in glasses, and it depends on the glass. To give the exact capacity, measure it in litres and millilitres.",
    learned: "You learned: a count of glasses depends on the size of the glass.",
    traceback: "The glasses tip back into the kettle up to the same line; two jugs' glasses tip into two same measuring jugs; the glasses of a bottle are laid out as bars of millilitres that add up to its capacity.",
    items: [
      /* learn ML2: answer in the plan = The mugs hold more than the cups. The kettle's capacity is 4 mugs or 8 cups, and to give it exactly it is measured in litres and millilitres */
      { qid: "M2.S4.T7.C25:ML2", kind: "twoRows", winMs: 1800,
        rows: [{ g: "cup", n: 8, ml: 250 }, { g: "mug", n: 4, ml: 500 }],
        choices: [{ id: "c-kettle", label: "The kettle changed" }, { id: "c-mug", label: "Mugs hold more" }, { id: "c-cup", label: "Glasses hold more" }],
        say: "A full kettle fills 4 mugs. The same full kettle fills 8 small glasses. Why are the counts different?",
        ask: "Why do the counts differ?", answer: "c-mug", near: "c-kettle",
        miss: "The kettle was filled to the same line both times. So what else was different?" },
      /* practice 3: answer in the plan = No. The second jug holds more, because its glasses are bigger. A count of glasses depends on the glass */
      { qid: "M2.S4.T7.C25:3", kind: "twoJugs", winMs: 1800,
        rows: [{ g: "cup", n: 7, ml: 100 }, { g: "glassL", n: 7, ml: 200 }],
        choices: [{ id: "j-same", label: "They hold the same" }, { id: "j-first", label: "The first holds more" }, { id: "j-second", label: "The second holds more" }],
        say: "Two jugs each fill 7 glasses, but the second jug's glasses are bigger. Do the two jugs hold the same?",
        ask: "Do they hold the same?", answer: "j-second", near: "j-same",
        miss: "The count is the same, seven and seven. Now look at the size of each glass." },
      /* practice 4: answer in the plan = 900 mL, because 6 times 150 mL is 900 mL */
      { qid: "M2.S4.T7.C25:4", kind: "cups", winMs: 2400,
        rows: [{ g: "cup", n: 6, ml: 150 }],
        say: "A bottle fills 6 glasses, and each glass holds exactly 150 millilitres. What is the bottle's capacity?",
        ask: "Bottle's capacity in mL?", answer: 900, near: 6,
        miss: "Six is how many glasses, not how much water. How much do all six glasses hold?" },
    ],
  },
  {
    n: 3,
    concept: "A thousand millilitres make a litre",
    conceptId: "M2.S4.T7.C26", objectiveIds: ["O12"],
    says: ["How many millilitres fill the litre bottle? The converter uses that number."],
    /* tries, as the plan writes it: First rung, from the item: what number is printed on the converter? Second rung, the phase's: where did the litre bottle stop on the measuring jug? Third rung: the card is cut to one litre and a few millilitres, and the child passes it through before the larger card comes back. The number pad stays open. */
    ladder: ["Where did the litre bottle stop on the measuring jug?", "Multiply the litres by the converter's number. Then add any millilitres on."],
    closing: "A thousand millilitres make a litre. Litres become millilitres by multiplying by a thousand, and only by a thousand, with any millilitres added on.",
    learned: "You learned: a litre is 1,000 millilitres; multiply litres by 1,000.",
    traceback: "The converter's thousand lights, the litre bottle fills the measuring jug to 1,000, the litres become thousands of millilitres, the millilitres join them, and the place board shows every place.",
    items: [
      /* learn ML3: answer in the plan = 9340 mL */
      { qid: "M2.S4.T7.C26:ML3", kind: "toml", L: 9, mL: 340, winMs: 2600,
        say: "How many millilitres are there in 9 litres 340 millilitres?",
        ask: "How many mL in 9 L 340 mL?", answer: 9340, near: 1240,
        miss: "What number is printed on the converter?" },
      /* practice 5: answer in the plan = 14,000 mL */
      { qid: "M2.S4.T7.C26:5", kind: "toml", L: 14, mL: 0, winMs: 2600,
        say: "Convert 14 litres into millilitres.",
        ask: "How many mL in 14 L?", answer: 14000, near: 1400,
        miss: "Fourteen litres is fourteen full litre bottles. How much does each one hold?" },
      /* practice 6: answer in the plan = 2075 mL. A zero holds the hundreds of the millilitres */
      { qid: "M2.S4.T7.C26:6", kind: "toml", L: 2, mL: 75, winMs: 2600,
        say: "Now 2 litres 75 millilitres. Change it the same way.",
        ask: "How many mL in 2 L 75 mL?", answer: 2075, near: 275,
        miss: "75 millilitres has no hundreds. Which place needs a zero?" },
    ],
  },
  {
    n: 4,
    concept: "Millilitres into litres and millilitres",
    conceptId: "M2.S4.T7.C27", objectiveIds: ["O12"],
    says: ["How many whole litres are in it? What is left stays in millilitres."],
    /* tries, as the plan writes it: First rung, from the item: how many millilitres make one litre? Second rung, the phase's: how many whole litres fit, and what is left? Third rung: the card is cut to a little more than one litre, and the child passes it back before the larger card returns. The number pad stays open. */
    ladder: ["Take out as many thousands as you can. What stays behind?", "Split off the last three digits. They stay as millilitres."],
    closing: "Millilitres become litres and millilitres by dividing by a thousand. The quotient is the litres and the remainder stays as millilitres.",
    learned: "You learned: divide by 1,000; the remainder stays as millilitres.",
    traceback: "The converter's thousand lights, the child's answer is built back into millilitres beside the card, the place board splits the thousands from the last three places, and the litres and the millilitres land in their own slots.",
    items: [
      /* learn ML4: answer in the plan = 6 L 90 mL */
      { qid: "M2.S4.T7.C27:ML4", kind: "tolml", card: 6090, winMs: 2600,
        parts: [{ label: "L" }, { label: "mL" }],
        say: "Write 6,090 millilitres in litres and millilitres.",
        ask: "6,090 mL in L and mL?", answer: [6, 90], near: [6, 900],
        miss: "What does the zero in the hundreds place tell you?" },
      /* practice 7: answer in the plan = 12 L 400 mL, because 12,400 divided by 1000 is 12 remainder 400 */
      { qid: "M2.S4.T7.C27:7", kind: "tolml", card: 12400, winMs: 2600,
        parts: [{ label: "L" }, { label: "mL" }],
        say: "Now 12,400 millilitres. Split it into litres and millilitres.",
        ask: "12,400 mL in L and mL?", answer: [12, 400], near: [124, 0],
        miss: "A litre is a thousand millilitres, not a hundred. So divide by a thousand." },
      /* practice 8: answer in the plan = The child divided by a hundred. For millilitres the only number is a thousand: 7400 divided by 1000 is 7 remainder 400, so it is 7 L 400 mL */
      { qid: "M2.S4.T7.C27:8", kind: "tolml", card: 7400, winMs: 2600,
        parts: [{ label: "L" }, { label: "mL" }],
        say: "A child writes 7,400 millilitres as 74 litres. What went wrong? Write it the right way.",
        ask: "7,400 mL in L and mL?", answer: [7, 400], near: [74, 0],
        miss: "74 litres would be 74,000 millilitres. Is that the card?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  capacityMl: { bucket: 10000, bottle: 1000, jug: 2000, mug: 300, spoon: 5, tank: 500000 },
  converter: 1000,
  kettleMl: 2000,
  freePlay: { containers: ["bucket", "bottle", "jug", "mug", "spoon"], kettle: { cups: 6, mugs: 3 } },
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
  if (it.kind === "tag") return it.tags.filter((t: any) => /\b(m?L)$/.test(t.text[0]) || t.k === "capacity").map((t: any) => t.id).join() === it.answer
    && it.tags.filter((t: any) => t.k === "capacity").length === 1;
  if (it.kind === "units") return it.cont.map((c: string) => (MODEL.capacityMl[c as "spoon"] < 1000 ? "mL" : "L")).join("|") === it.answer;
  if (it.kind === "twoRows") { const big = it.rows.slice().sort((a: any, b: any) => a.n - b.n)[0]; return it.answer === "c-" + big.g && it.rows.every((r: any) => r.n * r.ml === MODEL.kettleMl); }
  if (it.kind === "twoJugs") { const a = it.rows[0].n * it.rows[0].ml, b = it.rows[1].n * it.rows[1].ml; return it.answer === (a === b ? "j-same" : a > b ? "j-first" : "j-second"); }
  if (it.kind === "cups") { let s = 0; for (let k = 0; k < it.rows[0].n; k++) s += it.rows[0].ml; return it.answer === s; }
  if (it.kind === "toml") return it.answer === Number(String(it.L) + ("000" + it.mL).slice(-3));
  if (it.kind === "tolml") { const s = String(it.card); return it.answer[0] === Number(s.slice(0, -3)) && it.answer[1] === Number(s.slice(-3)); }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near
  : item.parts ? item.answer.map((x: any, k: number, a: any[]) => (x !== null && a.slice(k + 1).every((y: any) => y === null) ? x + 1 : x ?? "")).join("|")
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* what the slot shows for a tag, a choice or a number (commas from 1,000; a box's own digits as typed) */
const LJ_SHOW: any = {
  "t-25cm": "25 cm", "t-400g": "400 g", "t-2L": "2 L", "t-tall": "how tall", "t-heavy": "how heavy", "t-holds": "how much water",
  "mL|L": "mL and L", "L|mL": "L and mL", "mL|mL": "mL and mL", "L|L": "L and L",
  "c-kettle": "the kettle", "c-mug": "the mugs", "c-cup": "the glasses",
  "j-same": "the same", "j-first": "the first", "j-second": "the second",
};
/* j is the box of a two-box answer (its unit is the box's label); a single-number answer here is always in
   millilitres, so its unit is written beside the number, never left off */
const ljFormat = (v: any, j?: number, o?: any) => {
  const s = String(v ?? "");
  if (LJ_SHOW[s]) return LJ_SHOW[s];
  const num = /^[1-9]\d{3,}$/.test(s) ? indian(Number(s)) : s;
  /* the unit symbol in the language in use (the runtime then looks the whole text up in TR, and a number stays) */
  const mL = o && o.tx ? o.tx("mL") : "mL";
  return j === undefined && /^\d+$/.test(s) ? num + " " + mL : num;
};

/* ── the pictures: water, containers, tags, the tap ──────────────────────────────────────── */
const LJ_C = { water: "#BFE2F5", edge: "#6FB3DB", litre: "#0072B2", ml: "#009E73", zero: "#767676", count: "#56B4E9", mark: "#D55E00", metal: "#E3E7EA" };
const LJ_INK = { litre: shade(LJ_C.litre, 0.25), ml: shade(LJ_C.ml, 0.25), count: shade(LJ_C.count, 0.45), mark: shade(LJ_C.mark, 0.25) };

/* each container in its own units: bottom-centre at 0,0, the brim at -h; box = [x0, y0, x1, y1] for its finger box;
   mouth = where it pours from */
const LJ_VES: any = {
  jug: { h: 140, w: 110, inner: "M -50 0 L 50 0 L 42 -140 L -42 -140 Z", extra: ["M -46 -112 C -84 -112 -84 -36 -50 -36"],
    spout: "M 38 -140 L 64 -152 L 60 -140 L 44 -124 Z", box: [-86, -154, 66, 0], mouth: [62, -150] },
  bottle: { h: 175, w: 60, inner: "M -28 0 L 28 0 L 28 -118 Q 28 -138 12 -150 L 12 -175 L -12 -175 L -12 -150 Q -28 -138 -28 -118 Z",
    extra: [], box: [-30, -177, 30, 0], mouth: [0, -175] },
  bucket: { h: 110, w: 130, inner: "M -48 0 L 48 0 L 64 -110 L -64 -110 Z", extra: ["M -64 -110 Q 0 -178 64 -110"], box: [-66, -146, 66, 0] },
  mug: { h: 78, w: 62, inner: "M -30 0 L 30 0 L 30 -78 L -30 -78 Z", extra: ["M 30 -62 C 54 -62 54 -18 30 -18"], box: [-32, -80, 50, 0] },
  /* a teaspoon seen from above: an egg-shaped bowl narrowing to a thin handle that widens at its end */
  spoon: { h: 40, w: 70, inner: "M -34 -20 C -34 -44 18 -42 32 -20 C 18 2 -34 4 -34 -20 Z", extra: [],
    spout: "M 30 -23 L 96 -30 Q 118 -32 118 -21 Q 118 -11 96 -13 L 30 -17 Z", box: [-36, -44, 120, 0] },
  tank: { h: 160, w: 162, inner: "M -80 0 L 80 0 L 80 -160 L -80 -160 Z", extra: ["M -80 -160 Q 0 -186 80 -160", "M 80 -24 L 98 -24 L 98 -10"], box: [-82, -178, 100, 0] },
  kettle: { h: 100, w: 106, inner: "M -52 0 L 52 0 Q 62 -55 44 -100 L -44 -100 Q -62 -55 -52 0 Z", extra: ["M -32 -100 Q 0 -146 32 -100"],
    spout: "M 50 -30 L 92 -96 L 102 -88 L 58 -60 Z", box: [-58, -134, 102, 0], mouth: [97, -92] },
  cup: { h: 54, w: 44, inner: "M -17 0 L 17 0 L 21 -54 L -21 -54 Z", extra: [], box: [-22, -56, 22, 0] },
  glassL: { h: 76, w: 60, inner: "M -24 0 L 24 0 L 29 -76 L -29 -76 Z", extra: [], box: [-30, -78, 30, 0] },
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
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <clipPath id={id}><path d={V.inner} /></clipPath>
      <path d={V.inner} fill="#FFFFFF" />
      {lv > 0 && (
        <g clipPath={`url(#${id})`}>
          {/* sized to the container itself: a clip hides the rest, but the checks measure the unclipped box */}
          <rect x={-V.w / 2 - 6} y={wy} width={V.w + 12} height={-wy + 4} fill={LJ_C.water} />
          <line x1={-V.w / 2 - 6} x2={V.w / 2 + 6} y1={wy} y2={wy} stroke={LJ_C.edge} strokeWidth={3} />
        </g>
      )}
      {V.spout && <path d={V.spout} fill="#FFFFFF" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />}
      {V.extra.map((d: string, k: number) => <path key={k} d={d} fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />)}
      <path d={V.inner} fill="none" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
      {o.brim && <line x1={-V.w * 0.5} x2={V.w * 0.5} y1={-V.h} y2={-V.h} stroke={o.brim} strokeWidth={4} strokeDasharray="8 6" />}
    </g>
  );
}

/* a luggage tag. quiet: a tag the correction is holding elsewhere, drawn in place with a dashed edge;
   lit: the child's own tag after a miss (an accent edge, never red); up: a tag the child has picked up */
function ljTag(C: any, x: number, y: number, w: number, h: number, lines: string[], o: any = {}) {
  const stroke = o.lit || o.up ? C.accent : o.quiet ? C.dim : C.ink;
  const size = lines.length > 1 ? T.micro : T.label;
  return (
    <g transform={o.up ? "translate(0,-10)" : undefined}>
      <path d={`M ${x + 20} ${y} H ${x + w - 12} Q ${x + w} ${y} ${x + w} ${y + 12} V ${y + h - 12} Q ${x + w} ${y + h} ${x + w - 12} ${y + h} H ${x + 20} L ${x} ${y + h / 2} Z`}
        fill="#FFFFFF" stroke={stroke} strokeWidth={o.lit || o.up ? 6 : 3} strokeDasharray={o.quiet ? "10 7" : undefined} strokeLinejoin="round"
        filter={o.quiet ? undefined : o.up ? "url(#fLift)" : "url(#fShadowSoft)"} />
      <circle cx={x + 22} cy={y + h / 2} r={6} fill="none" stroke={stroke} strokeWidth={3} />
      {lines.map((ln: string, k: number) => (
        <text key={k} x={x + 18 + w / 2} y={y + h / 2 + size * 0.36 + (k - (lines.length - 1) / 2) * (size + 4)} textAnchor="middle"
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
      <rect x={px} y={sy - 62 * k} width={sx - px + 2} height={22 * k} fill={LJ_C.metal} stroke={C.ink} strokeWidth={3} />
      <rect x={sx - 22 * k} y={sy - 70 * k} width={44 * k} height={50 * k} rx={10 * k} fill={LJ_C.metal} stroke={C.ink} strokeWidth={3} />
      <rect x={sx - 9 * k} y={sy - 22 * k} width={18 * k} height={22 * k} rx={4 * k} fill={LJ_C.metal} stroke={C.ink} strokeWidth={3} />
      <rect x={sx - 26 * k} y={sy - 86 * k} width={52 * k} height={12 * k} rx={6 * k} fill={LJ_C.metal} stroke={C.ink} strokeWidth={3} />
      <rect x={sx - 4 * k} y={sy - 76 * k} width={8 * k} height={8 * k} fill={C.ink} />
    </g>
  );
}

/* a measuring jug marked in millilitres: base-centre (cx, base), H units tall for `max` mL */
function ljMeasure(C: any, cx: number, base: number, H: number, max: number, step: number, labels: number[], ml: number, read: boolean, o: any = {}) {
  const w = o.w || 110, x = cx - w / 2, top = base - H, y = (v: number) => base - (H * v) / max;
  const lvY = y(Math.min(ml, max));
  const ticks: number[] = [];
  for (let v = step; v <= max; v += step) ticks.push(v);
  return (
    <g>
      {o.unit !== false && <text x={cx} y={top - 14} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{o.u || "mL"}</text>}
      <path d={`M ${x} ${top} V ${base - 10} Q ${x} ${base} ${x + 10} ${base} H ${x + w - 10} Q ${x + w} ${base} ${x + w} ${base - 10} V ${top}`} fill="#FFFFFF" />
      {ml > 0 && <rect x={x + 2} y={lvY} width={w - 4} height={base - lvY - 2} fill={LJ_C.water} />}
      {ml > 0 && <line x1={x + 2} x2={x + w - 2} y1={lvY} y2={lvY} stroke={LJ_C.edge} strokeWidth={3} />}
      {ticks.map((v) => <line key={v} x1={x} x2={x + (labels.includes(v) ? 30 : 18)} y1={y(v)} y2={y(v)} stroke={C.ink} strokeWidth={3} />)}
      <path d={`M ${x} ${top} V ${base - 10} Q ${x} ${base} ${x + 10} ${base} H ${x + w - 10} Q ${x + w} ${base} ${x + w} ${base - 10} V ${top}`} fill="none" stroke={C.ink} strokeWidth={4} />
      {labels.map((v) => {
        const on = read && v === ml;
        return <text key={v} x={x + w + 12} y={y(v) + 10} fontSize={T.micro} fontWeight={on ? 700 : 500} fill={C.ink}>{indian(v)}</text>;
      })}
      {/* the reading is taken where the water stops: an ink pointer (one hue fewer than a vermilion one) */}
      {read && ml > 0 && <path d={`M ${x - 22} ${lvY - 11} L ${x - 4} ${lvY} L ${x - 22} ${lvY + 11} Z`} fill={C.ink} />}
    </g>
  );
}

/* the pouring bay of phase 2 and free play: jugs (their water is in the jug or in one row), and rows of glasses */
/* a jug with more than one row is refilled from its own tap (tap: its spout) after a pour while a row is still empty */
function ljLay2(kind: string) {
  if (kind === "twoRows") return {
    jugs: [{ id: "kettle", v: "kettle", x: 130, y: 300, s: 1.3, rows: [0, 1], tap: { x: 130, y: 96, px: 2 } }],
    rows: [{ g: "cup", n: 8, y: 312, s: 1.2, x0: 340, dx: 84, jug: "kettle", lx: 1020, ly: 300, word: "glasses" },
      { g: "mug", n: 4, y: 510, s: 1.2, x0: 360, dx: 180, jug: "kettle", lx: 1020, ly: 498, word: "mugs" }] };
  /* two jugs that look exactly alike: only the glasses they fill tell them apart */
  if (kind === "twoJugs") return {
    jugs: [{ id: "A", v: "jug", x: 120, y: 230, s: 1, rows: [0], opaque: true }, { id: "B", v: "jug", x: 120, y: 505, s: 1, rows: [1], opaque: true }],
    rows: [{ g: "cup", n: 7, y: 250, s: 1.1, x0: 310, dx: 95, jug: "A", lx: 245, ly: 240, word: "glasses" },
      { g: "glassL", n: 7, y: 505, s: 1.1, x0: 310, dx: 95, jug: "B", lx: 245, ly: 495, word: "glasses" }] };
  if (kind === "cups") return {
    jugs: [{ id: "bottle", v: "bottle", x: 110, y: 390, s: 1.2, rows: [0] }],
    rows: [{ g: "cup", n: 6, y: 420, s: 1.2, x0: 250, dx: 88, jug: "bottle", lx: 782, ly: 412, word: "glasses" }] };
  return {
    jugs: [{ id: "kettle", v: "kettle", x: 630, y: 290, s: 1, rows: [0, 1], tap: { x: 630, y: 124, px: 560 } }],
    rows: [{ g: "cup", n: 6, y: 340, x0: 770, dx: 56, jug: "kettle", lx: -1, ly: 0, word: "glasses" },
      { g: "mug", n: 3, y: 505, x0: 790, dx: 120, jug: "kettle", lx: -1, ly: 0, word: "mugs" }] };
}

/* phase 1 and free play: where the tap is and where the containers stand */
const LJ_P1 = { tapX: 200, tapY: 132, base: 480, homeX: 530, s: 1.35 };
const LJ_FREE = { tapX: 180, tapY: 96, under: 340, shelf: 505, s: 0.7,
  at: { bucket: 60, bottle: 150, jug: 255, mug: 350, spoon: 440 } as any, kinds: ["bucket", "bottle", "jug", "mug", "spoon"] };

function ljFresh(key: string, kind: string, item: any) {
  const s: any = { key, at: null, clv: {}, pins: {}, judged: false, flow: null, demo: null,
    loc: {}, jlv: {}, fill: {}, cnt: {}, cur: null, meas: false, blv: 1, mlv: 0, poured: false };
  if (kind === "units") (item.cont || []).forEach((c: string) => { s.clv[c] = 1; });
  if (["twoRows", "twoJugs", "cups", "free"].includes(kind)) ljLay2(kind).jugs.forEach((j: any) => { s.loc[j.id] = "jug"; s.jlv[j.id] = 1; });
  return s;
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  /* the unit symbols and a tag's words in the language in use (a two-line English tag is one line in hi/gu) */
  const uL = tx("L"), umL = tx("mL");
  const tagText = (t: any) => (lang === "en" ? t.text : [tx(t.text.join(" "))]);
  const tl = useTimeline();
  const free = stage === "free";
  const solved = stage === "win" || stage === "idle";
  const live = stage === "ask";
  const kind = free ? "free" : item.kind;
  const key = free ? "free" : n + ":" + index;
  const ref = useRef<any>(null);
  const [, bump] = useState(0);
  if (!ref.current || ref.current.key !== key) ref.current = ljFresh(key, kind, item);
  const S = ref.current;
  /* a write to this item's picture; a timeline step from an item already left writes nothing */
  const put = (o: any, k?: string) => {
    if (k !== undefined && ref.current.key !== k) return;
    const d = typeof o === "function" ? o(ref.current) : o;
    ref.current = { ...ref.current, ...d };
    bump((t: number) => t + 1);
  };
  useEffect(() => { if (tl.busy) { tl.stop(); api.lock(false); } }, [key]);

  /* the one drag hook: containers, tags, jugs and the litre bottle */
  const drag = useDrag((pay: any, p: any, moved: boolean) => onDrop(pay, p, moved));
  const grab = useRef<any>(null);
  const D = drag.drag;
  if (!D) grab.current = null;
  else if (!grab.current || grab.current.id !== D.payload.id) grab.current = { id: D.payload.id, x: D.x, y: D.y };
  const held = (id: string) => !!(D && D.payload.id === id);
  const piece = (id: string, label: string, pay: any, box: number[], body: any) => {
    const dx = held(id) ? D.x - grab.current.x : 0, dy = held(id) ? D.y - grab.current.y : 0;
    return (
      <g key={id} {...control(id, label)} {...drag.bind({ ...pay, id })} {...drag.keys({ ...pay, id })}
        transform={`translate(${dx},${dy})`} filter={held(id) ? "url(#fLift)" : undefined}>
        <rect x={box[0]} y={box[1]} width={box[2] - box[0]} height={box[3] - box[1]} fill="transparent" />
        {body}
      </g>
    );
  };

  /* every timeline ends by playing a drop the child made while it ran (a tag let go during a fill is
     pinned when the container is full, not thrown away) */
  const queued = useRef<any>(null);
  const dropNow = useRef<any>(null);
  const runT = (steps: any[], done?: () => void) => tl.run(steps, () => {
    if (done) done();
    const q = queued.current;
    queued.current = null;
    if (q) setTimeout(() => dropNow.current && dropNow.current(q[0], q[1], q[2]), 40);
  });

  /* ── phase 1: fill a container from the tap, pin a tag ── */
  const fillC = (c: string) => {
    const k = S.key, lv0 = S.clv[c] || 0;
    const steps: any[] = [[260, () => put({ at: c, flow: true }, k)]];
    for (let i = 1; i <= 6; i++) { const v = lv0 + ((1 - lv0) * i) / 6; steps.push([110, () => put((s: any) => ({ clv: { ...s.clv, [c]: v } }), k)]); }
    steps.push([10, () => put({ flow: null }, k)]);
    runT(steps, () => api.sfx.tick());
  };
  const pinValue = (pins: any) => {
    if (kind === "tag") return pins[item.cont] || null;
    if (kind === "units") return item.cont.every((c: string) => pins[c]) ? item.cont.map((c: string) => pins[c]).join("|") : null;
    return null;
  };
  const pinBox = (c: string) => (kind === "units"
    ? (c === "spoon" ? [130, 290, 470, 510] : [480, 90, 790, 510])
    : S.at === c ? [40, 160, 560, 510] : [0, 0, -1, -1]);
  /* a tag onto a container: the one it held goes home, and two filled containers answer */
  const pinTo = (tag: string, c: string) => {
    const pins: any = { ...S.pins };
    Object.keys(pins).forEach((q) => { if (pins[q] === tag) delete pins[q]; });
    pins[c] = tag;
    put({ pins, sel: null, demo: null, judged: false });
    api.sfx.tick();
    const v = pinValue(pins);
    if (v !== null) { put({ judged: true }); api.submit(v); }
  };
  const unpin = (tag: string) => {
    const pins: any = { ...S.pins };
    Object.keys(pins).forEach((q) => { if (pins[q] === tag) delete pins[q]; });
    put({ pins, sel: null, demo: null });
    api.sfx.tick();
  };
  const dropTag = (tag: any, p: any, tap: boolean) => {
    if (!live) return;
    if (kind === "tag") {
      /* one container: a tap puts the tag where it belongs; only a full container takes it */
      const b = pinBox(item.cont);
      if (!(tap || (p.x >= b[0] && p.x <= b[2] && p.y >= b[1] && p.y <= b[3]))) return;
      if (!(S.at === item.cont && (S.clv[item.cont] || 0) >= 1)) { api.sfx.tick(); return; }
      pinTo(tag, item.cont);
      return;
    }
    /* two containers: a tap picks a tag up (or puts a pinned one back); the child chooses the container */
    const pinnedOn = item.cont.find((c: string) => S.pins[c] === tag);
    if (tap) {
      if (pinnedOn) unpin(tag);
      else { put({ sel: S.sel === tag ? null : tag, demo: null }); api.sfx.tick(); }
      return;
    }
    const target = item.cont.find((c: string) => { const b = pinBox(c); return p.x >= b[0] && p.x <= b[2] && p.y >= b[1] && p.y <= b[3]; });
    if (target) pinTo(tag, target);
    else if (pinnedOn) unpin(tag);
  };
  const tapCont = (c: string) => {
    if (!live) return;
    if (S.sel) pinTo(S.sel, c);
    else api.sfx.tick();
  };
  const dropCont = (c: string, p: any, tap: boolean) => {
    put({ demo: null });
    if (tap) { if (S.at !== c || (S.clv[c] || 0) < 1) fillC(c); return; }
    /* a container under the tap stays there: it is where its tag is pinned */
    if (Math.abs(p.x - LJ_P1.tapX) < 170 && p.y > 150 && (S.at !== c || (S.clv[c] || 0) < 1)) fillC(c);
  };

  /* ── phase 2 and free play: pour a jug into a row of glasses, or tip the row back ── */
  const L2 = ["twoRows", "twoJugs", "cups", "free"].includes(kind) ? ljLay2(kind) : null;
  const jugOf = (id: string) => (L2 ? L2.jugs.find((j: any) => j.id === id) : null);
  const pourSteps = (j: string, r: number, k: string) => {
    const R = L2.rows[r], out: any[] = [[120, () => put((s: any) => ({ cnt: { ...s.cnt, [r]: 0 }, cur: r }), k)]];
    for (let g = 0; g < R.n; g++) out.push([300, () => put((s: any) => ({ fill: { ...s.fill, [r]: g + 1 }, cnt: { ...s.cnt, [r]: g + 1 }, jlv: { ...s.jlv, [j]: 1 - (g + 1) / R.n }, flow: { j, r, g } }), k)]);
    out.push([200, () => put((s: any) => ({ loc: { ...s.loc, [j]: r }, flow: null }), k)]);
    return out;
  };
  const backSteps = (j: string, r: number, k: string) => {
    const R = L2.rows[r], out: any[] = [[60, () => put({ meas: false }, k)]];
    for (let g = R.n - 1; g >= 0; g--) out.push([220, () => put((s: any) => ({ fill: { ...s.fill, [r]: g }, jlv: { ...s.jlv, [j]: (R.n - g) / R.n }, flow: { j, r, g, back: true } }), k)]);
    out.push([200, () => put((s: any) => ({ loc: { ...s.loc, [j]: "jug" }, flow: null }), k)]);
    return out;
  };
  /* the jug's own tap fills it again to the same top line */
  const refillSteps = (j: string, k: string) => {
    const out: any[] = [[250, () => put({ tapflow: j }, k)]];
    for (let i = 1; i <= 5; i++) out.push([120, () => put((s: any) => ({ jlv: { ...s.jlv, [j]: i / 5 } }), k)]);
    out.push([150, () => put((s: any) => ({ tapflow: null, loc: { ...s.loc, [j]: "jug" } }), k)]);
    return out;
  };
  const rowFull = (r: number) => (S.fill[r] || 0) >= L2.rows[r].n;
  /* a full jug pours into an empty row (and is filled again while another row is still empty); an empty jug
     takes a full row back, up to the same line */
  const act2 = (j: string, r: number | null) => {
    const J = jugOf(j);
    if (!J) return;
    const k = S.key, full = (S.jlv[j] ?? 0) >= 0.999;
    const empty = J.rows.filter((q: number) => !((S.fill[q] || 0) > 0));
    put({ demo: null });
    let steps: any[] = [];
    if (full) {
      const target = r !== null ? r : empty[0];
      if (target === undefined || (S.fill[target] || 0) > 0) { api.sfx.tick(); return; }
      steps = pourSteps(j, target, k);
      if (J.tap && empty.some((q: number) => q !== target)) steps = steps.concat(refillSteps(j, k));
    } else {
      const fulls = J.rows.filter((q: number) => rowFull(q));
      const target = r !== null ? r : fulls.find((q: number) => q !== S.cur) ?? fulls[0];
      if (target === undefined || !rowFull(target)) { api.sfx.tick(); return; }
      steps = backSteps(j, target, k);
    }
    runT(steps, () => api.sfx.tick());
  };
  const dropJug = (j: string, p: any, tap: boolean) => {
    const J = jugOf(j);
    if (!J) return;
    if (tap) { act2(j, null); return; }
    const near = J.rows.find((r: number) => { const R = L2.rows[r]; return p.x > R.x0 - 60 && Math.abs(p.y - (R.y - 40)) < 90; });
    if (near !== undefined) act2(j, near);
  };
  const measure = () => {
    if (tl.busy || kind !== "cups" || !rowFull(0)) return;
    put({ meas: !S.meas, demo: null });
    api.sfx.tick();
  };

  /* ── phases 3 and 4: the litre bottle poured into the measuring jug ── */
  const pourLitre = () => {
    const k = S.key;
    if (S.poured) { put({ poured: false, blv: 1, mlv: 0 }); return; }
    const steps: any[] = [];
    for (let i = 1; i <= 6; i++) steps.push([150, () => put({ blv: 1 - i / 6, mlv: i / 6, flow: true }, k)]);
    steps.push([10, () => put({ poured: true, flow: null }, k)]);
    runT(steps, () => api.sfx.tick());
  };

  /* ── free play: the tap and its shelf of five containers ── */
  const dropFree = (c: string, p: any, tap: boolean) => {
    const toTap = tap ? S.at !== c : Math.abs(p.x - LJ_FREE.tapX) < 150 && p.y > 120 && p.y < LJ_FREE.under + 40;
    if (toTap) { put({ at: c }); fillC(c); }
    else if (S.at === c) put({ at: null });
  };

  function onDrop(pay: any, p: any, moved: boolean) {
    const tap = !moved || !isFinite(p.x) || !isFinite(p.y);
    /* busy (a fill, a pour, a correction): the drop waits for it, with a tick so the child hears it was taken */
    if (tl.busy) { queued.current = [pay, p, moved]; api.sfx.tick(); return; }
    if (pay.t === "cont") dropCont(pay.c, p, tap);
    else if (pay.t === "tag") dropTag(pay.tag, p, tap);
    else if (pay.t === "jug") dropJug(pay.j, p, tap);
    else if (pay.t === "litre") { if (tap || (p.x > 150 && p.x < 420 && p.y < 380)) pourLitre(); }
    else if (pay.t === "fcont") dropFree(pay.c, p, tap);
  }
  dropNow.current = onDrop;

  /* Enter on a working-area answer (phase 1): send the pinned tag once, and never again unchanged */
  const onEnter = () => {
    const s = ref.current;
    if (s.judged || live === false) return;
    const v = pinValue(s.pins);
    if (v !== null) { put({ judged: true }); api.submit(v); }
  };
  api.onEnter(!free && item.pad === "enter" ? onEnter : null);
  /* the agent: fill the container and pin the tags as a child would; Enter then answers */
  /* a tag the agent names by its id ("t-2L") or its printed words ("2 L"); anything else is refused */
  const tagNamed = (v: any) => item.tags.find((x: any) => x.id.toLowerCase() === String(v).trim().toLowerCase()
    || x.text.join(" ").toLowerCase() === String(v).trim().toLowerCase());
  HOOK.set = (v: any) => {
    if (kind !== "tag" && kind !== "units") return false;
    if (kind === "tag") {
      const t = tagNamed(v);
      if (!t) return false;
      put({ at: item.cont, clv: { ...S.clv, [item.cont]: 1 }, pins: { [item.cont]: t.id }, sel: null, judged: false, demo: null });
      return true;
    }
    const ts = String(v ?? "").split(/\s*[|,]\s*|\s+and\s+/).map(tagNamed);
    if (ts.length !== item.cont.length || ts.some((t: any) => !t)) return false;
    const pins: any = {};
    item.cont.forEach((c: string, i: number) => { pins[c] = ts[i].id; });
    put({ pins, sel: null, judged: false, demo: null });
    return true;
  };

  /* the traceback: redraw the maths in steps and end on the whole right answer, on a layer of its own */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const k = S.key;
    let steps: any[] = [];
    const dm = (o: any) => (s: any) => ({ demo: { ...(s.demo || {}), ...o } });
    if (kind === "tag") {
      /* the child's tag goes home and stays lit; the container fills to the top; the right tag is pinned on */
      const c = item.cont;
      const lit = item.tags.some((t: any) => t.id === String(wrong.value)) ? String(wrong.value) : null;
      steps.push([450, () => put({ pins: {}, sel: null, judged: false, demo: { lit } }, k)]);
      if (S.at !== c) steps.push([300, () => put({ at: c, flow: true }, k)]);
      const lv0 = S.at === c ? S.clv[c] || 0 : 0;
      for (let i = 1; i <= 5; i++) { const v = lv0 + ((1 - lv0) * i) / 5; steps.push([120, () => put((s: any) => ({ at: c, flow: true, clv: { ...s.clv, [c]: v } }), k)]); }
      steps.push([400, () => put({ flow: null }, k)]);
      if (c === "bottle") {
        /* the plan's second correction: the tall thin bottle, poured into the empty short wide jug, fills it only half way */
        steps.push([600, () => put(dm({ jug: 0 }), k)]);
        for (let i = 1; i <= 5; i++) steps.push([160, () => put((s: any) => ({ clv: { ...s.clv, bottle: 1 - i / 5 }, ...dm({ jug: (0.5 * i) / 5, pour: true })(s) }), k)]);
        steps.push([700, () => put(dm({ pour: false }), k)]);
        for (let i = 1; i <= 5; i++) steps.push([120, () => put((s: any) => ({ flow: true, clv: { ...s.clv, bottle: i / 5 } }), k)]);
        steps.push([400, () => put({ flow: null }, k)]);
      }
      steps.push([900, () => put(dm({ pin: { [c]: item.answer } }), k)]);
    } else if (kind === "units") {
      /* a spoonful barely wets a jug marked in millilitres; the tank is read in hundreds of litres; then the tags */
      const a = String(item.answer).split("|");
      steps.push([450, () => put({ pins: {}, sel: null, judged: false, demo: {} }, k)]);
      for (let i = 1; i <= 4; i++) steps.push([180, () => put((s: any) => ({ clv: { ...s.clv, spoon: 1 - i / 4 }, ...dm({ spoonMl: (5 * i) / 4, pour: true })(s) }), k)]);
      steps.push([700, () => put(dm({ pour: false, spoonRead: true }), k)]);
      steps.push([900, () => put(dm({ tankScale: true }), k)]);
      steps.push([700, () => put(dm({ pin: { [item.cont[0]]: a[0] } }), k)]);
      steps.push([900, () => put(dm({ pin: { [item.cont[0]]: a[0], [item.cont[1]]: a[1] } }), k)]);
    } else if (kind === "twoRows") {
      /* the kettle fills the glasses, takes them back up to its line, fills the mugs, takes them back to the same line */
      const j = "kettle";
      steps.push([300, () => put({ fill: {}, jlv: { [j]: 1 }, loc: { [j]: "jug" }, tapflow: null, demo: null }, k)]);
      steps = steps.concat(pourSteps(j, 0, k), backSteps(j, 0, k), [[500, () => put({ demo: { brim: true } }, k)]],
        pourSteps(j, 1, k), backSteps(j, 1, k), [[900, () => put({ demo: { brim: true, label: "mugs hold more" } }, k)]]);
    } else if (kind === "twoJugs") {
      /* both rows poured, then each tipped into one of two same measuring jugs: the levels say which jug held more */
      L2.rows.forEach((R: any, r: number) => {
        if (!rowFull(r)) steps = steps.concat([[100, () => put((s: any) => ({ jlv: { ...s.jlv, [R.jug]: 1 } }), k)]], pourSteps(R.jug, r, k));
      });
      steps.push([500, () => put({ demo: { mj: [0, 0] } }, k)]);
      L2.rows.forEach((R: any, r: number) => {
        for (let g = R.n - 1; g >= 0; g--) steps.push([200, () => put((s: any) => {
          const mj = s.demo && s.demo.mj ? s.demo.mj.slice() : [0, 0];
          mj[r] = (R.n - g) * item.rows[r].ml;
          return { fill: { ...s.fill, [r]: g }, demo: { ...(s.demo || {}), mj, mflow: { r, g } } };
        }, k)]);
        steps.push([400, () => put(dm({ mflow: null }), k)]);
      });
      steps.push([900, () => put((s: any) => ({ jlv: { A: 1, B: 1 }, loc: { A: "jug", B: "jug" }, ...dm({ label: "second jug holds more" })(s) }), k)]);
    } else if (kind === "cups") {
      if (!rowFull(0)) steps = steps.concat([[100, () => put((s: any) => ({ jlv: { ...s.jlv, bottle: 1 } }), k)]], pourSteps("bottle", 0, k));
      steps.push([700, () => put({ meas: true, demo: { strip: 0 } }, k)]);
      for (let i = 1; i <= 6; i++) steps.push([320, () => put({ demo: { strip: i } }, k)]);
      steps.push([900, () => put({ demo: { strip: 6, total: true } }, k)]);
    } else if (kind === "toml" || kind === "tolml") {
      /* phase 4: the child's own litres and millilitres, built back into millilitres, beside the card */
      let child: any = null;
      if (kind === "tolml") {
        const ps = slotPartsOf(wrong.value, 2).map((x: string) => Number(x || 0));
        if (ps[0] * 1000 + ps[1] !== item.card) child = { a: ps[0], b: ps[1] };
      }
      steps.push([700, () => put({ demo: { lit: true, step: 0, child } }, k)]);
      if (!S.poured) {
        for (let i = 1; i <= 6; i++) steps.push([120, () => put({ blv: 1 - i / 6, mlv: i / 6, flow: true }, k)]);
        steps.push([500, () => put({ poured: true, flow: null }, k)]);
      }
      const rows = (kind === "toml" ? (item.mL ? 4 : 2) : 3) + (child ? 1 : 0);
      for (let i = 1; i <= rows; i++) steps.push([850, () => put({ demo: { lit: true, step: i, child } }, k)]);
      steps.push([900, () => put({ demo: { lit: true, step: rows, child, done: true } }, k)]);
    }
    api.lock(true);
    runT(steps, () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState): the question's own things, and the
     litres and millilitres only once they are the child's */
  const L3 = kind === "toml" ? { L: item.L, mL: item.mL, ml: item.L * 1000 + item.mL } : null;
  const L4 = kind === "tolml" ? { ml: item.card, L: Math.floor(item.card / 1000), mL: item.card % 1000 } : null;
  const curRow = L2 && S.cur !== null ? L2.rows[S.cur] : null;
  api.share({
    container: kind === "tag" ? item.cont : kind === "units" ? item.cont.join(" and ") : free ? S.at : null,
    filled: kind === "tag" ? (S.clv[item.cont] || 0) >= 1 : kind === "units" ? true : free && S.at ? (S.clv[S.at] || 0) >= 1 : null,
    glassSize: curRow ? (curRow.g === "cup" ? "small" : "large") : null,
    glassCount: curRow ? S.cnt[S.cur] || 0 : null,
    card: L3 ? `${L3.L} L${L3.mL ? " " + L3.mL + " mL" : ""}` : L4 ? `${indian(L4.ml)} mL` : null,
    litres: L4 && solved ? L4.L : L3 ? L3.L : null,
    millilitres: (L4 || L3) && solved ? (L4 ? L4.mL : L3.ml) : null,
  });

  /* ── drawing ── */
  const invite = (x: number, y: number, r = 64) => (stage === "ask" || stage === "teach") && !tl.busy ? <Invite x={x} y={y} r={r} C={C} /> : null;
  const flowArc = (x1: number, y1: number, x2: number, y2: number) => (
    <path d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - 50} ${x2} ${y2}`} fill="none" stroke={LJ_C.edge} strokeWidth={7} strokeLinecap="round" pointerEvents="none" />
  );

  const drawP1 = () => {
    const units = kind === "units";
    const conts: string[] = units ? item.cont : [item.cont];
    const answerPins: any = {};
    if (units) String(item.answer).split("|").forEach((u, i) => { answerPins[conts[i]] = u; });
    else answerPins[item.cont] = item.answer;
    const pins = solved ? answerPins : S.pins;
    const tagOf = (id: string) => item.tags.find((t: any) => t.id === id);
    /* the correction's layer: a right tag pinned solid, the child's own tag lit at home (both clear on the next act) */
    const demo = !solved && !(D && D.payload.t === "tag") ? S.demo || {} : {};
    const held2: any = demo.pin || {};
    const c0 = conts[0], V0 = LJ_VES[c0];
    const under = !units && (S.at === c0 || solved);
    const lv0 = solved ? 1 : S.clv[c0] || 0;
    const sOf = (c: string) => (c === "tank" ? 1.4 : LJ_P1.s);
    const posOf = (c: string) => (units ? (c === "spoon" ? { x: 200, y: LJ_P1.base } : { x: 620, y: LJ_P1.base })
      : { x: under ? LJ_P1.tapX : LJ_P1.homeX, y: LJ_P1.base });
    const TH = 90;
    const pinAt = (c: string) => (units ? (c === "spoon" ? { x: 130, y: 300, w: 150 } : { x: 470, y: 110, w: 150 })
      : { x: LJ_P1.tapX + 116, y: LJ_P1.base - LJ_VES[c].h * LJ_P1.s - 64, w: 240 });
    const rimOf = (c: string) => {
      const p = posOf(c), V = LJ_VES[c], s = sOf(c);
      return c === "spoon" ? { x: p.x - 4 * s, y: p.y - 38 * s } : c === "tank" ? { x: p.x, y: p.y - 182 * s } : { x: p.x + V.w * 0.36 * s, y: p.y - V.h * s };
    };
    const homes = units ? [{ x: 840, y: 120, w: 150 }, { x: 840, y: 250, w: 150 }] : [{ x: 800, y: 70, w: 240 }, { x: 800, y: 190, w: 240 }, { x: 800, y: 310, w: 240 }];
    const pinned = new Set(Object.values(pins));
    const heldBy = new Set(Object.values(held2));
    /* the string is drawn apart from the tag, so a pinned tag's finger box stays the tag's own */
    const stringOf = (c: string) => { const at = pinAt(c), rim = rimOf(c); return <line key={"str-" + c} x1={at.x + 22} y1={at.y + TH / 2} x2={rim.x} y2={rim.y} stroke={C.ink} strokeWidth={2.5} pointerEvents="none" />; };
    const pinnedTag = (c: string, id: string, o: any = {}) => {
      const at = pinAt(c), t = units ? { text: [id] } : tagOf(id);
      return ljTag(C, at.x, at.y, at.w, TH, t ? tagText(t) : [tx(String(id))], o);
    };
    return (
      <g>
        {ljTap(C, LJ_P1.tapX, LJ_P1.tapY, S.flow && under ? LJ_P1.base - V0.h * LJ_P1.s * lv0 : null, 1.4)}
        <rect x={20} y={LJ_P1.base} width={730} height={14} rx={7} fill={tint(C.rule, 0.45)} stroke={C.rule} strokeWidth={2} />
        {demo.jug !== undefined && (
          <g pointerEvents="none">{ljVessel(C, "demo-jug", "jug", LJ_P1.homeX, LJ_P1.base, demo.jug, { s: LJ_P1.s })}</g>
        )}
        {demo.pour && demo.jug !== undefined && flowArc(LJ_P1.tapX, LJ_P1.base - 175 * LJ_P1.s - 4, LJ_P1.homeX - 10, LJ_P1.base - 140 * LJ_P1.s - 6)}
        {conts.map((c) => {
          const p = posOf(c), V = LJ_VES[c], lv = solved ? 1 : S.clv[c] || 0, s = sOf(c);
          const body = ljVessel(C, "c-" + c, c, p.x, p.y, lv, { s });
          if (units) return <g key={c}>{body}</g>;
          if (solved) return <g key={c}>{body}</g>;
          return piece("cont-" + c, c, { t: "cont", c }, [p.x + V.box[0] * s - 6, p.y + V.box[1] * s - 6, p.x + V.box[2] * s + 6, p.y + 4], body);
        })}
        {/* two containers: each is a tap target for the tag the child has picked up */}
        {units && !solved && (
          <g>
            <Hit id="cont-spoon" x={140} y={410} w={235} h={86} onPress={() => tapCont("spoon")} label="teaspoon" />
            <Hit id="cont-tank" x={500} y={214} w={272} h={282} onPress={() => tapCont("tank")} label="water tank" />
          </g>
        )}
        {units && demo.spoonMl !== undefined && (
          <g pointerEvents="none">
            {ljMeasure(C, 425, LJ_P1.base, 110, 50, 10, [], demo.spoonMl, false, { w: 70, unit: false })}
            {demo.pour && flowArc(200, LJ_P1.base - 50, 404, LJ_P1.base - 114)}
            {demo.spoonRead && <text x={425} y={LJ_P1.base - 126} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LJ_INK.ml}>{"5 " + umL}</text>}
          </g>
        )}
        {units && demo.tankScale && (
          <g pointerEvents="none">
            {[100, 200, 300, 400, 500].map((v) => {
              const y = LJ_P1.base - (160 * 1.4 * v) / 500;
              return (
                <g key={v}>
                  <line x1={510} x2={540} y1={y} y2={y} stroke={C.ink} strokeWidth={3} />
                  <text x={548} y={y + 30} fontSize={T.micro} fontWeight={v === 500 ? 700 : 500} fill={v === 500 ? LJ_INK.litre : C.ink}>{v + " " + uL}</text>
                </g>
              );
            })}
          </g>
        )}
        {conts.map((c) => (pins[c] || (held2[c] && !pins[c]) ? stringOf(c) : null))}
        {conts.map((c) => {
          const id = pins[c];
          if (!id) return null;
          /* a unit tag pinned by the child can be lifted back (tap) or moved (drag) */
          if (units && !solved) {
            const at = pinAt(c);
            return piece("tag-" + id, "tag " + id + " on the " + (c === "spoon" ? "teaspoon" : "water tank"), { t: "tag", tag: id },
              [at.x - 4, at.y - 4, at.x + at.w + 4, at.y + TH + 4], pinnedTag(c, id));
          }
          return <g key={"pin-" + c}>{pinnedTag(c, id)}</g>;
        })}
        {item.tags.map((t: any, i: number) => {
          if (pinned.has(t.id)) return null;
          const h = homes[i];
          const body = ljTag(C, h.x, h.y, h.w, TH, tagText(t), { quiet: heldBy.has(t.id), lit: demo.lit === t.id, up: S.sel === t.id });
          if (solved) return <g key={t.id}>{body}</g>;
          return piece("tag-" + t.id, "tag " + t.text.join(" "), { t: "tag", tag: t.id }, [h.x - 4, h.y - 14, h.x + h.w + 4, h.y + TH + 4], body);
        })}
        {Object.keys(held2).length > 0 && (
          <g pointerEvents="none">
            {conts.map((c) => (held2[c] && !pins[c] ? <g key={"held-" + c}>{pinnedTag(c, held2[c])}</g> : null))}
          </g>
        )}
        {!units && lv0 < 1 && invite(posOf(c0).x, LJ_P1.base - (V0.h * LJ_P1.s) / 2, 84)}
      </g>
    );
  };

  const drawBay = (L: any, o: any = {}) => {
    const demo = S.demo || {};
    return (
      <g>
        {L.rows.map((R: any, r: number) => {
          const V = LJ_VES[R.g];
          return (
            <g key={"row" + r}>
              {Array.from({ length: R.n }).map((_, g) => {
                const full = g < (S.fill[r] || 0) && !(kind === "cups" && S.meas && g === 0);
                return <g key={g}>{ljVessel(C, `g${r}-${g}`, R.g, R.x0 + g * R.dx, R.y, full ? 1 : 0, { s: R.s || 1 })}</g>;
              })}
              {R.lx > 0 && (S.cnt[r] || 0) > 0 && (
                <text x={R.lx} y={R.ly} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={LJ_INK.count}>{S.cnt[r]}</text>
              )}
            </g>
          );
        })}
        {L.jugs.map((J: any) => J.tap ? (
          <g key={"tap-" + J.id}>{ljTap(C, J.tap.x, J.tap.y, S.tapflow === J.id ? J.y - LJ_VES[J.v].h * J.s * (S.jlv[J.id] ?? 0) : null, 1, J.tap.px)}</g>
        ) : null)}
        {L.jugs.map((J: any) => {
          const V = LJ_VES[J.v], lv = S.jlv[J.id] ?? 0;
          const body = ljVessel(C, "j-" + J.id, J.v, J.x, J.y, lv, { s: J.s, opaque: J.opaque, brim: J.opaque ? null : demo.brim ? C.accent : mix(C.dim, "#FFFFFF", 0.2) });
          if (solved) return <g key={J.id}>{body}</g>;
          const b = V.box.map((v: number) => v * J.s);
          return piece("jug-" + J.id, J.v === "bottle" ? "bottle" : J.id === "B" ? "second jug" : J.id === "A" ? "first jug" : J.v,
            { t: "jug", j: J.id }, [J.x + Math.min(b[0], -45) - 4, J.y + b[1] - 4, J.x + Math.max(b[2], 45) + 4, J.y + 4], body);
        })}
        {S.flow && S.flow.j && (() => {
          const J = jugOf(S.flow.j), R = L.rows[S.flow.r], V = LJ_VES[J.v], VG = LJ_VES[R.g];
          const mx = J.x + (V.mouth ? V.mouth[0] : 0) * J.s, my = J.y + (V.mouth ? V.mouth[1] : -V.h) * J.s;
          const gx = R.x0 + S.flow.g * R.dx, gy = R.y - VG.h * (R.s || 1) - 4;
          return S.flow.back ? flowArc(gx, gy, mx + 4, my + 10) : flowArc(mx, my, gx, gy);
        })()}
        {/* the correction of the two jugs: each row tipped into one of two same measuring jugs */}
        {demo.mj && (
          <g pointerEvents="none">
            {L.rows.map((R: any, r: number) => <g key={"mj" + r}>{ljMeasure(C, 1030, R.y, 150, 1500, 250, [], demo.mj[r], false, { w: 90, unit: false })}</g>)}
            {demo.mflow && (() => {
              const R = L.rows[demo.mflow.r], VG = LJ_VES[R.g];
              return flowArc(R.x0 + demo.mflow.g * R.dx, R.y - VG.h * (R.s || 1) - 4, 1010, R.y - 154);
            })()}
          </g>
        )}
        {o.children}
      </g>
    );
  };

  const drawP2 = () => {
    const L = L2, demo = S.demo || {};
    /* the invite: on a full jug that still has an empty row to pour into (the kettle again once refilled) */
    const firstIdle = L.jugs.find((J: any) => (S.jlv[J.id] ?? 0) >= 0.999 && J.rows.some((q: number) => !((S.fill[q] || 0) > 0)));
    const showStrip = kind === "cups" && (solved || demo.strip !== undefined);
    const stripN = solved ? 6 : demo.strip || 0;
    const R0 = L.rows[0];
    return drawBay(L, { children: (
      <g>
        {kind === "cups" && (
          <g>
            {ljMeasure(C, 930, 410, 200, 200, 50, [50, 100, 150, 200], S.meas ? 150 : 0, S.meas, { u: umL })}
            <Hit id="measure" x={862} y={180} w={140} h={240} onPress={measure} label="measuring jug" />
          </g>
        )}
        {showStrip && (
          <g pointerEvents="none">
            {Array.from({ length: stripN }).map((_, g) => {
              const x = R0.x0 + g * R0.dx - R0.dx / 2 + 3;
              return (
                <g key={g}>
                  <rect x={x} y={442} width={R0.dx - 6} height={44} rx={8} fill={tint(LJ_C.ml, 0.72)} stroke={LJ_INK.ml} strokeWidth={2} />
                  <text x={x + (R0.dx - 6) / 2} y={474} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={LJ_INK.ml}>150</text>
                </g>
              );
            })}
            {(solved || demo.total) && <text x={R0.x0 + 6 * R0.dx - R0.dx / 2 + 16} y={476} fontSize={T.label} fontWeight={700} fill={LJ_INK.ml}>{"= 900 " + umL}</text>}
          </g>
        )}
        {demo.label && (
          <g pointerEvents="none">
            <text x={kind === "twoRows" ? 1076 : 970} y={kind === "twoRows" ? 380 : 322} textAnchor="end" fontSize={T.label} fontWeight={700} fill={shade(C.accent, 0.3)}>{tx(demo.label)}</text>
          </g>
        )}
        {!solved && !tl.busy && !S.demo && firstIdle && invite(firstIdle.x + 10, firstIdle.y - (LJ_VES[firstIdle.v].h * firstIdle.s) / 2, 70)}
        {!solved && !firstIdle && kind === "cups" && rowFull(0) && !S.meas && invite(930, 310, 70)}
      </g>
    ) });
  };

  /* phases 3 and 4: the litre bottle, the measuring jug, the converter, the place board */
  const drawConv = () => {
    const toMl = kind === "toml", demo = S.demo || {};
    const done = solved || demo.done;
    const step = solved ? 9 : demo.step || 0;
    const ml = toMl ? L3.ml : L4.ml;
    const digits = String(ml).split("");
    /* before any answer the board is empty, four places: it fills (the ten thousands opening only when the
       capacity needs them) in the correction and on the win */
    const nb = !done ? 4 : digits.length, bw = 96, gap = 8, bx0 = 760 - (nb * bw + (nb - 1) * gap) / 2;
    const heads = ["TTh", "Th", "H", "T", "O"].slice(5 - nb);
    const litreDigits = nb - 3;
    const showDigits = done;
    const coloured = done;
    const inkOf = (d: string, i: number) => (d === "0" && (!coloured || i >= litreDigits) ? LJ_C.zero : !coloured ? C.ink : i < litreDigits ? LJ_INK.litre : LJ_INK.ml);
    /* the worked lines, each a row of short pieces; in phase 4 the child's own answer is built back first */
    const ch = !toMl && demo.child ? demo.child : null;
    const rowsTo: string[][] = toMl
      ? [[`${L3.L} ${uL} × 1,000`], [`= ${indian(L3.L * 1000)} ${umL}`], ...(L3.mL ? [[`+ ${L3.mL} ${umL}`], [`= ${indian(L3.ml)} ${umL}`]] : [])]
      : [...(ch ? [[`${ch.a} ${uL}${ch.b ? ` ${ch.b} ${umL}` : ""}`, `= ${indian(ch.a * 1000 + ch.b)} ${umL}`]] : []),
        [`${indian(L4.ml)} ÷ 1,000`], [`= ${L4.L} ${tx("remainder")} ${L4.mL}`], [`${L4.L} ${uL} ${L4.mL} ${umL}`]];
    const BY = 318;
    return (
      <g>
        {/* the litre bottle and the measuring jug (the one thing to play with before answering) */}
        {ljMeasure(C, 262, BY + 10, 240, 1000, 100, [500, 1000], S.mlv * 1000, S.poured, { u: umL })}
        {S.flow && flowArc(90, BY - 226, 226, BY - 222)}
        {piece("litre", "litre bottle", { t: "litre" }, [44, BY - 238, 136, BY + 4],
          <g>
            {ljVessel(C, "litre", "bottle", 90, BY, S.blv, { s: 1.3 })}
            <text x={90} y={BY - 66} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LJ_INK.litre}>{"1 " + uL}</text>
          </g>)}
        {toMl && !S.poured && !tl.busy && invite(90, BY - 110, 74)}
        {/* the card */}
        <rect x={600} y={4} width={320} height={72} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} filter="url(#fShadowSoft)" />
        <text x={760} y={56} textAnchor="middle" fontSize={T.speech} fontWeight={700}>
          {toMl ? (
            <tspan>
              <tspan fill={LJ_INK.litre}>{`${L3.L} ${uL}`}</tspan>
              {L3.mL ? <tspan fill={LJ_INK.ml}>{` ${L3.mL} ${umL}`}</tspan> : null}
            </tspan>
          ) : <tspan fill={LJ_INK.ml}>{`${indian(L4.ml)} ${umL}`}</tspan>}
        </text>
        {/* the converter: one number, a thousand */}
        <path d="M 700 96 L 820 96 L 800 84 L 720 84 Z" fill={tint(C.rule, 0.3)} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
        <rect x={500} y={96} width={520} height={120} rx={24} fill="url(#gPanel)" stroke={C.ink} strokeWidth={3} />
        <circle cx={530} cy={126} r={7} fill="none" stroke={C.ink} strokeWidth={2.5} />
        <circle cx={990} cy={126} r={7} fill="none" stroke={C.ink} strokeWidth={2.5} />
        {(demo.lit && !solved) && <rect x={635} y={118} width={250} height={80} rx={18} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}
        <text x={760} y={177} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{toMl ? "× 1,000" : "÷ 1,000"}</text>
        <path d="M 720 216 L 800 216 L 790 228 L 730 228 Z" fill={tint(C.rule, 0.3)} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
        {/* what comes out */}
        {toMl ? (
          <g>
            <rect x={600} y={238} width={320} height={72} rx={14} fill="#FFFFFF" stroke={done ? C.ink : C.rule} strokeWidth={3} strokeDasharray={done ? undefined : "10 8"} />
            {done && <text x={760} y={290} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={LJ_INK.ml}>{`${indian(L3.ml)} ${umL}`}</text>}
          </g>
        ) : (
          <g>
            <rect x={560} y={238} width={180} height={72} rx={14} fill="#FFFFFF" stroke={done ? LJ_INK.litre : C.rule} strokeWidth={3} strokeDasharray={done ? undefined : "10 8"} />
            <rect x={780} y={238} width={180} height={72} rx={14} fill="#FFFFFF" stroke={done ? LJ_INK.ml : C.rule} strokeWidth={3} strokeDasharray={done ? undefined : "10 8"} />
            <text x={722} y={290} textAnchor="end" fontSize={done ? T.speech : T.micro} fontWeight={700} fill={done ? LJ_INK.litre : C.ink}>
              {done ? <tspan>{L4.L}<tspan fontSize={T.micro} dx={8}>{uL}</tspan></tspan> : uL}</text>
            <text x={942} y={290} textAnchor="end" fontSize={done ? T.speech : T.micro} fontWeight={700} fill={done ? LJ_INK.ml : C.ink}>
              {done ? <tspan>{L4.mL}<tspan fontSize={T.micro} dx={8}>{umL}</tspan></tspan> : umL}</text>
          </g>
        )}
        {/* the place board: a box a place, a zero holding every empty place */}
        {heads.map((hd, i) => {
          const x = bx0 + i * (bw + gap), d = digits[i];
          return (
            <g key={hd}>
              <text x={x + bw / 2} y={346} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(hd)}</text>
              <rect x={x} y={356} width={bw} height={100} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
              {showDigits && <text x={x + bw / 2} y={426} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={inkOf(d, i)}>{d}</text>}
            </g>
          );
        })}
        {!toMl && coloured && (
          <g pointerEvents="none">
            <line x1={bx0 + litreDigits * (bw + gap) - gap / 2} x2={bx0 + litreDigits * (bw + gap) - gap / 2} y1={350} y2={464} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <text x={bx0 + (litreDigits * (bw + gap) - gap) / 2} y={490} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={LJ_INK.litre}>{uL}</text>
            <text x={bx0 + litreDigits * (bw + gap) + (3 * (bw + gap) - gap) / 2} y={490} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={LJ_INK.ml}>{umL}</text>
          </g>
        )}
        {/* the correction's steps: one row a step, each piece a short text of its own */}
        {!solved && step > 0 && (
          <g pointerEvents="none">
            {rowsTo.slice(0, step).map((row, i) => {
              const last = i === rowsTo.length - 1 && demo.done;
              let x = 18;
              return row.map((t, j) => {
                const el = <text key={i + "-" + j} x={x} y={368 + i * 42} fontSize={T.label} fontWeight={700} fill={last && toMl ? LJ_INK.ml : C.ink}>{t}</text>;
                x += t.length * 18 + 16;
                return el;
              });
            })}
          </g>
        )}
      </g>
    );
  };

  const drawFree = () => {
    const under = S.at;
    const V = under ? LJ_VES[under] : null;
    const lvU = under ? S.clv[under] || 0 : 0;
    const L = L2;
    return (
      <g>
        {ljTap(C, LJ_FREE.tapX, LJ_FREE.tapY, S.flow && under ? LJ_FREE.under - V.h * lvU : null)}
        <rect x={6} y={LJ_FREE.shelf} width={520} height={12} rx={6} fill={tint(C.rule, 0.45)} stroke={C.rule} strokeWidth={2} />
        {/* a sink under the tap: the container stands in it to be filled */}
        <path d={`M 64 ${LJ_FREE.under} L 296 ${LJ_FREE.under} L 278 ${LJ_FREE.under + 30} L 82 ${LJ_FREE.under + 30} Z`} fill={LJ_C.metal} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
        <ellipse cx={180} cy={LJ_FREE.under + 16} rx={10} ry={4} fill={C.ink} />
        {LJ_FREE.kinds.map((c: string) => {
          const V2 = LJ_VES[c], at = under === c, s = at ? 1 : LJ_FREE.s;
          const x = at ? LJ_FREE.tapX : LJ_FREE.at[c], y = at ? LJ_FREE.under : LJ_FREE.shelf;
          const b = V2.box.map((v: number) => v * s);
          const x0 = x + Math.min(b[0], -40), x1 = x + Math.max(b[2], 40), y0 = y + Math.min(b[1], -80);
          return piece("free-" + c, c, { t: "fcont", c }, [x0, y0, x1, y + 2], ljVessel(C, "f-" + c, c, x, y, S.clv[c] || 0, { s }));
        })}
        {drawBay(L)}
      </g>
    );
  };

  const count = L2 && S.cur !== null ? S.cnt[S.cur] || 0 : 0;
  return (
    <g>
      {L2 && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={22} y={-45} fontSize={T.label} fontWeight={600} fill={C.ink}>{curRow && curRow.word === "mugs" ? tx("mugs filled") : tx("glasses filled")}</text>
          <text x={308} y={-38} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={LJ_INK.count}>{count}</text>
        </g>
      )}
      {free ? drawFree()
        : kind === "tag" || kind === "units" ? drawP1()
        : L2 ? drawP2()
        : kind === "toml" || kind === "tolml" ? drawConv() : null}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const it: any = ((PHASES[(n || 1) - 1] || { items: [] }) as any).items[last.item] || {};
  /* every word through tx (the tag and choice words and the unit symbols); the numbers stay digits */
  let lines: string[] = [];
  if (it.kind === "tag") lines = [tx((it.tags.find((t: any) => t.id === last.value) || { text: [""] }).text.join(" "))];
  else if (it.kind === "units") { const u = String(last.value).split("|"); lines = [tx("spoon") + ": " + tx(u[0]), tx("tank") + ": " + tx(u[1])]; }
  else if (it.choices) lines = wrapText(tx((it.choices.find((c: any) => c.id === last.value) || { label: "" }).label), 15).slice(0, 2);
  else if (it.parts) { const p = slotPartsOf(last.value, 2); lines = [`${p[0]} ${tx("L")} ${p[1]} ${tx("mL")}`]; }
  else lines = [`${indian(Number(last.value))} ${tx("mL")}`];
  const size = lines.length > 1 ? T.micro : T.label;
  /* a long line (a two-unit answer, longer still in Hindi and Gujarati) takes the drop's room */
  const wide = lines.some((ln) => ln.length > 9);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {!wide && <path d={`M 34 ${h / 2 - 22} Q 18 ${h / 2 + 2} 22 ${h / 2 + 10} Q 34 ${h / 2 + 26} 46 ${h / 2 + 10} Q 50 ${h / 2 + 2} 34 ${h / 2 - 22} Z`}
        fill={LJ_C.water} stroke={LJ_C.edge} strokeWidth={2.5} />}
      {lines.map((ln, k) => (
        <text key={k} x={w - 14} y={h / 2 + size * 0.36 + (k - (lines.length - 1) / 2) * (size + 2)} textAnchor="end"
          fontSize={size} fontWeight={700} fill={C.ink}>{ln}</text>
      ))}
    </g>
  );
}

function LitreJug(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: ljFormat, fitHost: () => null }} />
  );
}

export default LitreJug;
