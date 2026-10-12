/* ═══ M1.S1.T2.C4.2D1 · line_kit · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "line_kit";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Line Kit";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["An empty board, a point stamp and a ruler. What does the end of a stroke tell you?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every point named, every end capped, and both rays found where only one was drawn.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Stamp your own points, join any two of them, and cap every end.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13: `lineFor(line, lang, TR)`); the
   English everywhere else stays what the checks read. NCERT class 4 geometry terms: बिंदु / બિંદુ point,
   रेखा / રેખા line, रेखाखंड / રેખાખંડ segment, किरण / કિરણ ray; a drawn stroke is लकीर / લીટી and its dot
   is बिंदी / ટપકું. Digits stay digits: the runtime speaks them in the language in use. A first draft;
   wants a native speaker's read. */
const TR: any = {
  hi: {
    "Line Kit": "रेखा किट",
    "An empty board, a point stamp and a ruler. What does the end of a stroke tell you?": "एक खाली बोर्ड, बिंदु की मुहर और एक स्केल। लकीर का सिरा तुम्हें क्या बताता है?",
    "Every point named, every end capped, and both rays found where only one was drawn.": "हर बिंदु का नाम रखा और हर सिरे पर निशान लगाया। जहाँ एक ही किरण बनी थी, वहाँ दोनों ढूँढ लीं।",
    "Free play. Stamp your own points, join any two of them, and cap every end.": "मुक्त खेल। अपने बिंदु छापो, कोई भी दो को जोड़ो, और हर सिरे पर निशान लगाओ।",
    /* phase 1 */
    "A point marks a place": "बिंदु एक जगह बताता है",
    "Put a point down and give it a name. Look closer. Does it get any bigger?": "एक बिंदु रखो और उसे नाम दो। पास से देखो। क्या वह कुछ बड़ा होता है?",
    "Does the place grow when the ink does?": "जब स्याही बढ़ती है, तो क्या जगह भी बढ़ती है?",
    "Look at the middle of the dot. That is the place it marks.": "बिंदी के बीच में देखो। वही वह जगह है जो वह बताती है।",
    "A point marks a place and has no size. It is shown by a dot and named by a capital letter.": "बिंदु एक जगह बताता है और उसका कोई आकार नहीं होता। उसे बिंदी से दिखाते हैं और बड़े अक्षर से नाम देते हैं।",
    "You learned: a point marks a place and has no size of its own.": "तुमने सीखा: बिंदु एक जगह बताता है, उसका अपना कोई आकार नहीं।",
    "Drag the glass over point R. The dot looks bigger under it. What has really grown?": "लेंस को बिंदु R पर खींचो। उसके नीचे बिंदी बड़ी दिखती है। असल में क्या बढ़ा है?",
    "What grew?": "क्या बढ़ा?",
    "The ink": "स्याही",
    "The point": "बिंदु",
    "Both": "दोनों",
    "What does the dot show?": "बिंदी क्या दिखाती है?",
    "Tap each dot to name it and join it to the one before. How many curved pieces do you draw?": "हर बिंदी को छूकर उसका नाम रखो और पिछली बिंदी से जोड़ो। तुम कितने वक्र टुकड़े बनाते हो?",
    "How many curves?": "कितने वक्र?",
    "Count the joins between the dots, not the dots.": "बिंदियों के बीच के जोड़ गिनो, बिंदियाँ नहीं।",
    "One dot is tiny and one is fat. Pass the glass over each. Which point is bigger?": "एक बिंदी छोटी है और एक मोटी। लेंस को दोनों पर ले जाओ। कौन सा बिंदु बड़ा है?",
    "Which is bigger?": "कौन सा बड़ा है?",
    "Neither": "कोई नहीं",
    "The fat dot": "मोटी बिंदी",
    "The tiny dot": "छोटी बिंदी",
    "Look at the place each dot marks, not the ink.": "स्याही को नहीं, हर बिंदी की बताई जगह को देखो।",
    /* phase 2 */
    "A line goes on for ever both ways": "रेखा दोनों ओर हमेशा चलती रहती है",
    "Cap both ends of this stroke. Then run the tape along it. Where does it stop?": "इस लकीर के दोनों सिरों पर निशान लगाओ। फिर उस पर फीता चलाओ। वह कहाँ रुकता है?",
    "Follow the tape past the arrowhead. Does it ever stop?": "फीते के साथ तीर के निशान से आगे चलो। क्या वह कभी रुकता है?",
    "Only a dot stops the tape. Look at both ends again.": "फीते को सिर्फ़ बिंदी रोकती है। दोनों सिरों को फिर देखो।",
    "A line is straight, has an arrowhead at each end, and no length that can be measured.": "रेखा सीधी होती है, हर सिरे पर तीर का निशान होता है। उसकी नापने लायक लंबाई नहीं होती।",
    "You learned: a line has an arrowhead at each end and no length.": "तुमने सीखा: रेखा के हर सिरे पर तीर होता है और लंबाई नहीं होती।",
    "Give this stroke through C and D an arrowhead at each end. Now how long is it?": "C और D से गुज़रती इस लकीर के हर सिरे पर तीर का निशान लगाओ। अब यह कितनी लंबी है?",
    "How long is it?": "यह कितनी लंबी है?",
    "No length": "लंबाई नहीं",
    "12 cm": "12 सेमी",
    "Very long": "बहुत लंबी",
    "What sits at each end of the stroke now?": "अब लकीर के हर सिरे पर क्या है?",
    "Here are lines across, upright and slanting. Tap each one to arrow both its ends. How many arrowheads in all?": "यहाँ आड़ी, खड़ी और तिरछी रेखाएँ हैं। हर रेखा को छुओ, दोनों सिरों पर तीर का निशान लगाओ। कुल कितने निशान हुए?",
    "How many arrowheads?": "तीर के कितने निशान?",
    "Every line takes an arrowhead at both of its ends.": "हर रेखा के दोनों सिरों पर तीर का निशान लगता है।",
    "Turn the ruler until it lies through U and V, then let go to draw. Which way does line UV run?": "स्केल को घुमाओ जब तक वह U और V से होकर जाए। फिर छोड़ दो, रेखा बन जाएगी। रेखा UV किस ओर जाती है?",
    "Which way?": "किस ओर?",
    "Upright": "खड़ी",
    "Across": "आड़ी",
    "Slanting": "तिरछी",
    "Look at where U and V sit on the board.": "देखो U और V बोर्ड पर कहाँ हैं।",
    /* phase 3 */
    "A segment has two ends, a ray has one": "रेखाखंड के दो सिरे होते हैं, किरण का एक",
    "Run the tape along each stroke. Why does one of them run away?": "हर लकीर पर फीता चलाओ। उनमें से एक का फीता आगे भागता क्यों चला जाता है?",
    "At which end does the tape stop?": "फीता किस सिरे पर रुकता है?",
    "A dot says stop. An arrowhead says keep going.": "बिंदी कहती है रुको। तीर का निशान कहता है चलते रहो।",
    "A line segment has two end points and a length. A ray has one end point and cannot be measured.": "रेखाखंड के दो अंत बिंदु और लंबाई होती है। किरण का एक अंत बिंदु है, उसे नापा नहीं जाता।",
    "You learned: a segment has two ends and a length, a ray has one.": "तुमने सीखा: रेखाखंड के दो सिरे और लंबाई, किरण का एक सिरा।",
    "Stroke GH has a dot at each end. Stroke MN has a dot at M and an arrowhead past N. Which one can the tape measure?": "लकीर GH के दोनों सिरों पर बिंदी है। लकीर MN के M पर बिंदी और N के आगे तीर का निशान है। फीता किसे नापेगा?",
    "Which one measures?": "कौन सी नापी जा सकती है?",
    "Stroke GH": "लकीर GH",
    "Stroke MN": "लकीर MN",
    "How many dots does each stroke have?": "हर लकीर में कितनी बिंदियाँ हैं?",
    "This stroke has a dot at W. Cap the open end with an arrowhead. What is it then?": "इस लकीर के W पर बिंदी है। खुले सिरे पर तीर का निशान लगाओ। तब यह क्या बन जाती है?",
    "What is it?": "यह क्या है?",
    "Ray": "किरण",
    "Line": "रेखा",
    "Segment": "रेखाखंड",
    "What does the end you just capped say now?": "जिस सिरे पर अभी निशान लगाया, वह अब क्या कहता है?",
    "Segment JK is six centimetres long. Swap the dot at K for an arrowhead. How long is it now?": "रेखाखंड JK 6 सेंटीमीटर लंबा है। K की बिंदी को तीर के निशान से बदलो। अब इसकी लंबाई कितनी है?",
    "How long now?": "अब लंबाई कितनी?",
    "6 cm": "6 सेमी",
    "Longer": "इससे लंबी",
    "Look for the end that would stop the tape.": "वह सिरा ढूँढो जो फीते को रोक देगा।",
    /* phase 4 */
    "Two rays start at every point on a line": "रेखा के हर बिंदु से दो किरणें शुरू होती हैं",
    "Tap a point on the line and watch it light both ways.": "रेखा पर एक बिंदु छुओ और उसे दोनों ओर चमकते देखो।",
    "Which ways can you go along the line from there?": "वहाँ से रेखा पर तुम किन-किन ओर जा सकते हो?",
    "Name each ray from the point it starts at.": "हर किरण का नाम उस बिंदु से शुरू करो जहाँ से वह शुरू होती है।",
    "A point on a line starts two rays, one going each way. Name each from that point.": "रेखा के बिंदु से दो किरणें शुरू होती हैं, हर ओर एक। नाम उसी बिंदु से शुरू करो।",
    "You learned: a point on a line starts two rays, one each way.": "तुमने सीखा: रेखा के बिंदु से दो किरणें निकलती हैं, हर ओर एक।",
    "Points E, F and G lie on this line. Tap F, then tap the point each ray runs through.": "बिंदु E, F और G इस रेखा पर हैं। F को छुओ, फिर वह बिंदु छुओ जिससे होकर किरण जाती है।",
    "Name both rays": "दोनों किरणों के नाम बताओ",
    "Which point do the rays start at?": "किरणें किस बिंदु से शुरू होती हैं?",
    "A, B, C and D lie on this line in order. Find the two rays that start at C.": "A, B, C और D इस रेखा पर क्रम से हैं। C से शुरू होने वाली दो किरणें ढूँढो।",
    "Name its two rays": "इसकी दो किरणों के नाम बताओ",
    "Stand on C and walk each way along the line.": "C पर खड़े हो जाओ और रेखा पर हर ओर चलो।",
    "A line runs through K, L and M. A ray from L passes through P. Find three rays that start at L.": "एक रेखा K, L और M से होकर जाती है। L से एक किरण P से होकर जाती है। L से शुरू होने वाली तीन किरणें ढूँढो।",
    "Name three rays": "तीन किरणों के नाम बताओ",
    "One ray is drawn already. The line itself holds more.": "एक किरण पहले से बनी है। रेखा में और भी हैं।",
    /* the picture */
    "Places found": "मिली जगहें",
    "Points named": "नाम दिए बिंदु",
    "Ends capped": "निशान वाले सिरे",
    "Lines made": "बनी रेखाएँ",
    "Lines drawn": "खींची रेखाएँ",
    "Strokes read": "नापी लकीरें",
    "Rays named": "नाम दी किरणें",
    "Points stamped": "छापे बिंदु",
    "Only the ink grew": "सिर्फ़ स्याही बढ़ी",
    "Both the same": "दोनों एक जैसे",
    "4 curves": "4 वक्र",
    "line CD": "रेखा CD",
    "16 arrowheads": "16 तीर के निशान",
    "line UV": "रेखा UV",
    "ray": "किरण",
    "cm": "सेमी",
    "segment GH: 8 cm": "रेखाखंड GH: 8 सेमी",
    "ray MN: no length": "किरण MN: लंबाई नहीं",
  },
  gu: {
    "Line Kit": "રેખા કિટ",
    "An empty board, a point stamp and a ruler. What does the end of a stroke tell you?": "એક ખાલી બોર્ડ, બિંદુની મહોર અને એક પટ્ટી. લીટીનો છેડો તમને શું કહે છે?",
    "Every point named, every end capped, and both rays found where only one was drawn.": "દરેક બિંદુને નામ આપ્યું અને દરેક છેડે નિશાન લગાવ્યું. જ્યાં એક જ કિરણ દોર્યું હતું, ત્યાં બંને કિરણ શોધ્યાં.",
    "Free play. Stamp your own points, join any two of them, and cap every end.": "મુક્ત રમત. તમારાં બિંદુ છાપો, કોઈ પણ બે જોડો, અને દરેક છેડે નિશાન લગાવો.",
    /* phase 1 */
    "A point marks a place": "બિંદુ એક જગ્યા દર્શાવે છે",
    "Put a point down and give it a name. Look closer. Does it get any bigger?": "એક બિંદુ મૂકો અને તેને નામ આપો. નજીકથી જુઓ. શું તે થોડું પણ મોટું થાય છે?",
    "Does the place grow when the ink does?": "શાહી વધે ત્યારે શું જગ્યા પણ વધે છે?",
    "Look at the middle of the dot. That is the place it marks.": "ટપકાની વચ્ચે જુઓ. તે જે જગ્યા દર્શાવે છે તે આ જ છે.",
    "A point marks a place and has no size. It is shown by a dot and named by a capital letter.": "બિંદુ એક જગ્યા દર્શાવે છે અને તેનું કોઈ કદ નથી. તેને ટપકાથી બતાવાય છે અને મોટા અક્ષરથી નામ અપાય છે.",
    "You learned: a point marks a place and has no size of its own.": "તમે શીખ્યા: બિંદુ એક જગ્યા દર્શાવે છે, તેનું પોતાનું કોઈ કદ નથી.",
    "Drag the glass over point R. The dot looks bigger under it. What has really grown?": "લેન્સને બિંદુ R પર ખેંચો. તેની નીચે ટપકું મોટું દેખાય છે. ખરેખર શું વધ્યું છે?",
    "What grew?": "શું વધ્યું?",
    "The ink": "શાહી",
    "The point": "બિંદુ",
    "Both": "બંને",
    "What does the dot show?": "ટપકું શું દર્શાવે છે?",
    "Tap each dot to name it and join it to the one before. How many curved pieces do you draw?": "દરેક ટપકાને સ્પર્શ કરી નામ આપો અને પહેલાના ટપકા સાથે જોડો. તમે કેટલા વક્ર ટુકડા દોરો છો?",
    "How many curves?": "કેટલા વક્ર?",
    "Count the joins between the dots, not the dots.": "ટપકાં નહીં, ટપકાં વચ્ચેના જોડાણ ગણો.",
    "One dot is tiny and one is fat. Pass the glass over each. Which point is bigger?": "એક ટપકું નાનું છે અને એક જાડું. લેન્સને દરેક પર લઈ જાઓ. કયું બિંદુ મોટું છે?",
    "Which is bigger?": "કયું મોટું છે?",
    "Neither": "એકેય નહીં",
    "The fat dot": "જાડું ટપકું",
    "The tiny dot": "નાનું ટપકું",
    "Look at the place each dot marks, not the ink.": "શાહી નહીં, દરેક ટપકું દર્શાવે છે તે જગ્યા જુઓ.",
    /* phase 2 */
    "A line goes on for ever both ways": "રેખા બંને બાજુ હંમેશાં ચાલતી રહે છે",
    "Cap both ends of this stroke. Then run the tape along it. Where does it stop?": "આ લીટીના બંને છેડે નિશાન લગાવો. પછી તેની સાથે ટેપ ચલાવો. તે ક્યાં અટકે છે?",
    "Follow the tape past the arrowhead. Does it ever stop?": "ટેપ સાથે તીરના નિશાનથી આગળ જાઓ. શું તે ક્યારેય અટકે છે?",
    "Only a dot stops the tape. Look at both ends again.": "ટેપને ફક્ત ટપકું અટકાવે છે. બંને છેડા ફરી જુઓ.",
    "A line is straight, has an arrowhead at each end, and no length that can be measured.": "રેખા સીધી હોય છે અને દરેક છેડે તીરનું નિશાન હોય છે. તેની માપી શકાય એવી કોઈ લંબાઈ હોતી નથી.",
    "You learned: a line has an arrowhead at each end and no length.": "તમે શીખ્યા: રેખાના દરેક છેડે તીર હોય છે અને લંબાઈ હોતી નથી.",
    "Give this stroke through C and D an arrowhead at each end. Now how long is it?": "C અને D માંથી પસાર થતી આ લીટીના દરેક છેડે તીરનું નિશાન લગાવો. હવે તે કેટલી લાંબી છે?",
    "How long is it?": "તે કેટલી લાંબી છે?",
    "No length": "લંબાઈ નથી",
    "12 cm": "12 સેમી",
    "Very long": "બહુ લાંબી",
    "What sits at each end of the stroke now?": "હવે લીટીના દરેક છેડે શું છે?",
    "Here are lines across, upright and slanting. Tap each one to arrow both its ends. How many arrowheads in all?": "અહીં આડી, ઊભી અને ત્રાંસી રેખાઓ છે. દરેકને સ્પર્શ કરી બંને છેડે તીરનું નિશાન લગાવો. કુલ કેટલાં નિશાન થયાં?",
    "How many arrowheads?": "તીરનાં કેટલાં નિશાન?",
    "Every line takes an arrowhead at both of its ends.": "દરેક રેખાના બંને છેડે તીરનું નિશાન લાગે છે.",
    "Turn the ruler until it lies through U and V, then let go to draw. Which way does line UV run?": "પટ્ટીને ફેરવો જ્યાં સુધી તે U અને V માંથી પસાર ન થાય. પછી છોડી દો, રેખા દોરાશે. રેખા UV કઈ તરફ જાય છે?",
    "Which way?": "કઈ તરફ?",
    "Upright": "ઊભી",
    "Across": "આડી",
    "Slanting": "ત્રાંસી",
    "Look at where U and V sit on the board.": "બોર્ડ પર U અને V ક્યાં છે તે જુઓ.",
    /* phase 3 */
    "A segment has two ends, a ray has one": "રેખાખંડને બે છેડા હોય છે, કિરણને એક",
    "Run the tape along each stroke. Why does one of them run away?": "દરેક લીટી સાથે ટેપ ચલાવો. તેમાંથી એકની ટેપ આગળ ભાગતી કેમ જાય છે?",
    "At which end does the tape stop?": "ટેપ કયા છેડે અટકે છે?",
    "A dot says stop. An arrowhead says keep going.": "ટપકું કહે છે અટકો. તીરનું નિશાન કહે છે ચાલતા રહો.",
    "A line segment has two end points and a length. A ray has one end point and cannot be measured.": "રેખાખંડને બે અંત બિંદુ અને લંબાઈ હોય છે. કિરણને એક અંત બિંદુ હોય છે અને તે માપી શકાતું નથી.",
    "You learned: a segment has two ends and a length, a ray has one.": "તમે શીખ્યા: રેખાખંડને બે છેડા અને લંબાઈ, કિરણને એક છેડો.",
    "Stroke GH has a dot at each end. Stroke MN has a dot at M and an arrowhead past N. Which one can the tape measure?": "લીટી GH ના બંને છેડે ટપકું છે. લીટી MN ના M પર ટપકું અને N ની આગળ તીરનું નિશાન છે. ટેપ કઈ માપી શકે?",
    "Which one measures?": "કઈ મપાય છે?",
    "Stroke GH": "લીટી GH",
    "Stroke MN": "લીટી MN",
    "How many dots does each stroke have?": "દરેક લીટીમાં કેટલાં ટપકાં છે?",
    "This stroke has a dot at W. Cap the open end with an arrowhead. What is it then?": "આ લીટીના W પર ટપકું છે. ખુલ્લા છેડે તીરનું નિશાન લગાવો. તો તે શું બને છે?",
    "What is it?": "તે શું છે?",
    "Ray": "કિરણ",
    "Line": "રેખા",
    "Segment": "રેખાખંડ",
    "What does the end you just capped say now?": "જે છેડે હમણાં નિશાન લગાવ્યું તે હવે શું કહે છે?",
    "Segment JK is six centimetres long. Swap the dot at K for an arrowhead. How long is it now?": "રેખાખંડ JK 6 સેન્ટિમીટર લાંબો છે. K નું ટપકું બદલીને તીરનું નિશાન લગાવો. હવે તેની લંબાઈ કેટલી છે?",
    "How long now?": "હવે લંબાઈ કેટલી?",
    "6 cm": "6 સેમી",
    "Longer": "વધારે લાંબી",
    "Look for the end that would stop the tape.": "ટેપને અટકાવે એવો છેડો શોધો.",
    /* phase 4 */
    "Two rays start at every point on a line": "રેખા પરના દરેક બિંદુથી બે કિરણો શરૂ થાય છે",
    "Tap a point on the line and watch it light both ways.": "રેખા પર એક બિંદુને સ્પર્શ કરો અને તેને બંને તરફ ચમકતું જુઓ.",
    "Which ways can you go along the line from there?": "ત્યાંથી રેખા પર તમે કઈ કઈ તરફ જઈ શકો?",
    "Name each ray from the point it starts at.": "દરેક કિરણનું નામ તે જ્યાંથી શરૂ થાય તે બિંદુથી શરૂ કરો.",
    "A point on a line starts two rays, one going each way. Name each from that point.": "રેખા પરના એક બિંદુથી બે કિરણો શરૂ થાય છે, દરેક તરફ એક. દરેકનું નામ તે જ બિંદુથી શરૂ કરો.",
    "You learned: a point on a line starts two rays, one each way.": "તમે શીખ્યા: રેખા પરના બિંદુથી બે કિરણો શરૂ થાય, દરેક તરફ એક.",
    "Points E, F and G lie on this line. Tap F, then tap the point each ray runs through.": "બિંદુ E, F અને G આ રેખા પર છે. F ને સ્પર્શ કરો, પછી કિરણ જ્યાંથી જાય તે બિંદુને સ્પર્શ કરો.",
    "Name both rays": "બંને કિરણોનાં નામ આપો",
    "Which point do the rays start at?": "કિરણો કયા બિંદુથી શરૂ થાય છે?",
    "A, B, C and D lie on this line in order. Find the two rays that start at C.": "A, B, C અને D આ રેખા પર ક્રમમાં છે. C થી શરૂ થતાં બે કિરણો શોધો.",
    "Name its two rays": "તેનાં બે કિરણોનાં નામ આપો",
    "Stand on C and walk each way along the line.": "C પર ઊભા રહો અને રેખા પર દરેક તરફ ચાલો.",
    "A line runs through K, L and M. A ray from L passes through P. Find three rays that start at L.": "એક રેખા K, L અને M માંથી પસાર થાય છે. L થી એક કિરણ P માંથી પસાર થાય છે. L થી શરૂ થતાં ત્રણ કિરણો શોધો.",
    "Name three rays": "ત્રણ કિરણોનાં નામ આપો",
    "One ray is drawn already. The line itself holds more.": "એક કિરણ પહેલેથી દોરેલું છે. રેખામાં બીજાં પણ છે.",
    /* the picture */
    "Places found": "મળેલી જગ્યાઓ",
    "Points named": "બિંદુનાં નામ",
    "Ends capped": "છેડે નિશાન",
    "Lines made": "બનેલી રેખાઓ",
    "Lines drawn": "દોરેલી રેખાઓ",
    "Strokes read": "માપેલી લીટીઓ",
    "Rays named": "કિરણનાં નામ",
    "Points stamped": "છાપેલાં બિંદુ",
    "Only the ink grew": "ફક્ત શાહી વધી",
    "Both the same": "બંને સરખા",
    "4 curves": "4 વક્ર",
    "line CD": "રેખા CD",
    "16 arrowheads": "16 તીરનાં નિશાન",
    "line UV": "રેખા UV",
    "ray": "કિરણ",
    "cm": "સેમી",
    "segment GH: 8 cm": "રેખાખંડ GH: 8 સેમી",
    "ray MN: no length": "કિરણ MN: લંબાઈ નથી",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id; kind = the board this question is asked on (MODEL.boards)
           choices [{ id, label }] a word answer on the pad; pad "enter" = made on the working area
           rays  the ray names the working area must produce, one group per ray (any name of that
                 ray is accepted: ray CB and ray CA are the same ray)
           near  the item's misconception, which judge must reject */
const PHASES = [
  {
    n: 1,
    concept: "A point marks a place",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O1"],
    says: ["Put a point down and give it a name. Look closer. Does it get any bigger?"],
    ladder: ["Does the place grow when the ink does?", "Look at the middle of the dot. That is the place it marks."],
    closing: "A point marks a place and has no size. It is shown by a dot and named by a capital letter.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a point marks a place and has no size of its own.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The glass spreads the paper apart while the place each dot marks stays one small mark.",
    items: [
      /* learn ML1: answer in the plan = No. Point R has no size at all; the dot only shows where it is */
      { qid: "M1.S1.T2.C4:ML1", kind: "glass", say: "Drag the glass over point R. The dot looks bigger under it. What has really grown?",
        ask: "What grew?", answer: "grew_ink", near: "grew_point", winMs: 2600,
        choices: [{ id: "grew_ink", label: "The ink" }, { id: "grew_point", label: "The point" }, { id: "grew_both", label: "Both" }],
        miss: "What does the dot show?" },
      /* practice 1: answer in the plan = Four. With the dots named A, B, C, D and E, the pieces go from A to B, B to C, C to D and D to E */
      { qid: "M1.S1.T2.C4:1", kind: "join", say: "Tap each dot to name it and join it to the one before. How many curved pieces do you draw?",
        ask: "How many curves?", answer: 4, near: 5, winMs: 3000,
        miss: "Count the joins between the dots, not the dots." },
      /* practice 2: answer in the plan = Neither. A point has no size, so both dots only mark a place */
      { qid: "M1.S1.T2.C4:2", kind: "glass", say: "One dot is tiny and one is fat. Pass the glass over each. Which point is bigger?",
        ask: "Which is bigger?", answer: "same_size", near: "big_dot", winMs: 3800,
        choices: [{ id: "same_size", label: "Neither" }, { id: "big_dot", label: "The fat dot" }, { id: "small_dot", label: "The tiny dot" }],
        miss: "Look at the place each dot marks, not the ink." },
    ],
  },
  {
    n: 2,
    concept: "A line goes on for ever both ways",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Cap both ends of this stroke. Then run the tape along it. Where does it stop?"],
    ladder: ["Follow the tape past the arrowhead. Does it ever stop?", "Only a dot stops the tape. Look at both ends again."],
    closing: "A line is straight, has an arrowhead at each end, and no length that can be measured.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a line has an arrowhead at each end and no length.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The tape runs from arrowhead to arrowhead, off both edges of the board, with its reading blank.",
    items: [
      /* learn ML2: answer in the plan = It is line CD, and it has no length that can be measured, because it goes on for ever both ways */
      { qid: "M1.S1.T2.C5:ML2", kind: "caps", say: "Give this stroke through C and D an arrowhead at each end. Now how long is it?",
        ask: "How long is it?", answer: "len_none", near: "len_twelve", winMs: 3200,
        choices: [{ id: "len_none", label: "No length" }, { id: "len_twelve", label: "12 cm" }, { id: "len_verylong", label: "Very long" }],
        miss: "What sits at each end of the stroke now?" },
      /* practice 3: answer in the plan = Sixteen, because each of the eight lines has an arrowhead at both ends */
      { qid: "M1.S1.T2.C5:3", kind: "grid", say: "Here are lines across, upright and slanting. Tap each one to arrow both its ends. How many arrowheads in all?",
        ask: "How many arrowheads?", answer: 16, near: 8, winMs: 3200,
        miss: "Every line takes an arrowhead at both of its ends." },
      /* practice 4: answer in the plan = It is vertical, and it has no length that can be given, because a line goes on for ever both ways */
      { qid: "M1.S1.T2.C5:4", kind: "ruler", say: "Turn the ruler until it lies through U and V, then let go to draw. Which way does line UV run?",
        ask: "Which way?", answer: "way_up", near: "way_slant", winMs: 2800,
        choices: [{ id: "way_up", label: "Upright" }, { id: "way_across", label: "Across" }, { id: "way_slant", label: "Slanting" }],
        miss: "Look at where U and V sit on the board." },
    ],
  },
  {
    n: 3,
    concept: "A segment has two ends, a ray has one",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O2"],
    says: ["Run the tape along each stroke. Why does one of them run away?"],
    ladder: ["At which end does the tape stop?", "A dot says stop. An arrowhead says keep going."],
    closing: "A line segment has two end points and a length. A ray has one end point and cannot be measured.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a segment has two ends and a length, a ray has one.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The tape stops at the second dot with a reading, and runs off the board at the arrowhead.",
    items: [
      /* learn ML3: answer in the plan = Segment GH, because it has two end points. Ray MN starts at M and goes on for ever beyond N */
      { qid: "M1.S1.T2.C6:ML3", kind: "tape2", say: "Stroke GH has a dot at each end. Stroke MN has a dot at M and an arrowhead past N. Which one can the tape measure?",
        ask: "Which one measures?", answer: "meas_gh", near: "meas_mn", winMs: 3000,
        choices: [{ id: "meas_gh", label: "Stroke GH" }, { id: "meas_mn", label: "Stroke MN" }, { id: "meas_both", label: "Both" }],
        miss: "How many dots does each stroke have?" },
      /* practice 5: answer in the plan = A ray, because it has one end point and goes on in one direction */
      { qid: "M1.S1.T2.C6:5", kind: "cap1", say: "This stroke has a dot at W. Cap the open end with an arrowhead. What is it then?",
        ask: "What is it?", answer: "kind_ray", near: "kind_seg", winMs: 2800,
        choices: [{ id: "kind_ray", label: "Ray" }, { id: "kind_line", label: "Line" }, { id: "kind_seg", label: "Segment" }],
        miss: "What does the end you just capped say now?" },
      /* practice 6: answer in the plan = No. It is now ray JK, which starts at J and goes on for ever beyond K */
      { qid: "M1.S1.T2.C6:6", kind: "swap", say: "Segment JK is six centimetres long. Swap the dot at K for an arrowhead. How long is it now?",
        ask: "How long now?", answer: "now_none", near: "now_six", winMs: 3000,
        choices: [{ id: "now_none", label: "No length" }, { id: "now_six", label: "6 cm" }, { id: "now_more", label: "Longer" }],
        miss: "Look for the end that would stop the tape." },
    ],
  },
  {
    n: 4,
    concept: "Two rays start at every point on a line",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Tap a point on the line and watch it light both ways."],
    ladder: ["Which ways can you go along the line from there?", "Name each ray from the point it starts at."],
    closing: "A point on a line starts two rays, one going each way. Name each from that point.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a point on a line starts two rays, one each way.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The splitter lights the line one way and then the other, and every ray name writes itself from that point.",
    items: [
      /* learn ML4: answer in the plan = Ray FE and ray FG, one going each way from F */
      { qid: "M1.S1.T2.C7:ML4", kind: "rays", say: "Points E, F and G lie on this line. Tap F, then tap the point each ray runs through.",
        ask: "Name both rays", pad: "enter", answer: "FE|FG", rays: [["FE"], ["FG"]], near: "EF|GF", winMs: 3400,
        miss: "Which point do the rays start at?" },
      /* practice 7: answer in the plan = Ray CB, which carries on through A, and ray CD, going the other way */
      { qid: "M1.S1.T2.C7:7", kind: "rays", say: "A, B, C and D lie on this line in order. Find the two rays that start at C.",
        ask: "Name its two rays", pad: "enter", answer: "CB|CD", rays: [["CB", "CA"], ["CD"]], near: "BC|DC", winMs: 3400,
        miss: "Stand on C and walk each way along the line." },
      /* practice 8: answer in the plan = Ray LP, which is drawn, and ray LK and ray LM along the line, one going each way */
      { qid: "M1.S1.T2.C7:8", kind: "rays", say: "A line runs through K, L and M. A ray from L passes through P. Find three rays that start at L.",
        ask: "Name three rays", pad: "enter", answer: "LK|LM|LP", rays: [["LK"], ["LM"], ["LP"]], near: "KL|ML|LP", winMs: 3600,
        miss: "One ray is drawn already. The line itself holds more." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too).
   Every coordinate is in working-area units (1086 x 528, origin at its top-left).
   A stroke runs from point a to point b and reaches e1 / e2 units past each of them; c1 / c2 are
   the caps it comes with ("dot", "arrow", or none = an open socket the child fills). */
const MODEL = {
  board: { x: 156, y: 12, w: 780, h: 440 },
  strip: { x: 156, y: 464, w: 780, h: 56 },
  column: { x: 0, y: 12, w: 140, h: 500 },
  tray: { x: 952, y: 12, w: 134, h: 380 },
  cm: 50,
  boards: {
    "1.1": { kind: "glass", runs: "Places found",
      pts: [{ id: "R", x: 546, y: 232 }] },
    "1.2": { kind: "join", runs: "Points named", letters: ["A", "B", "C", "D", "E"],
      pts: [{ id: "d1", x: 246, y: 242 }, { id: "d2", x: 396, y: 242 }, { id: "d3", x: 546, y: 242 },
        { id: "d4", x: 696, y: 242 }, { id: "d5", x: 846, y: 242 }] },
    "1.3": { kind: "glass", runs: "Places found",
      pts: [{ id: "S", x: 406, y: 222 }, { id: "T", x: 706, y: 222, fat: true }] },
    "2.1": { kind: "caps", runs: "Ends capped", need: 2,
      pts: [{ id: "C", x: 316, y: 242 }, { id: "D", x: 776, y: 242 }],
      strokes: [{ k: "CD", a: "C", b: "D", e1: 70, e2: 70 }] },
    "2.2": { kind: "grid", runs: "Lines made", cols: 4,
      /* four across, two upright, two slanting, mixed over both rows: a = the slope in degrees,
         L = half the stroke, dx / dy nudge it inside its cell so no two are twins */
      bars: [{ a: 0, L: 78, dy: -6 }, { a: 90, L: 70 }, { a: 0, L: 56, dy: 8 }, { a: 45, L: 68 },
        { a: 0, L: 62, dy: 10 }, { a: 135, L: 72 }, { a: 90, L: 66, dy: -4 }, { a: 0, L: 84, dy: -8 }] },
    "2.3": { kind: "ruler", runs: "Lines drawn",
      pts: [{ id: "U", x: 546, y: 112 }, { id: "V", x: 546, y: 352 }],
      strokes: [{ k: "UV", a: "U", b: "V", e1: 80, e2: 80, c1: "arrow", c2: "arrow" }] },
    "3.1": { kind: "tape2", runs: "Strokes read",
      pts: [{ id: "G", x: 306, y: 132 }, { id: "H", x: 706, y: 132 }, { id: "M", x: 306, y: 342 }, { id: "N", x: 606, y: 342 }],
      strokes: [{ k: "GH", a: "G", b: "H", e1: 0, e2: 0, c1: "dot", c2: "dot" },
        { k: "MN", a: "M", b: "N", e1: 0, e2: 290, c1: "dot", c2: "arrow" }] },
    "3.2": { kind: "cap1", runs: "Ends capped", need: 1,
      pts: [{ id: "W", x: 316, y: 242 }, { id: "X", x: 716, y: 242 }],
      strokes: [{ k: "WX", a: "W", b: "X", e1: 0, e2: 90, c1: "dot" }] },
    "3.3": { kind: "swap", runs: "Ends capped", need: 1, swap: ["JK2"], swapRun: 190,
      pts: [{ id: "J", x: 346, y: 242 }, { id: "K", x: 646, y: 242 }],
      strokes: [{ k: "JK", a: "J", b: "K", e1: 0, e2: 0, c1: "dot", c2: "dot" }] },
    "4.1": { kind: "rays", runs: "Rays named", start: "F", need: 2,
      pts: [{ id: "E", x: 346, y: 232 }, { id: "F", x: 546, y: 232 }, { id: "G", x: 746, y: 232 }],
      strokes: [{ k: "L1", a: "E", b: "G", e1: 160, e2: 160, c1: "arrow", c2: "arrow" }] },
    "4.2": { kind: "rays", runs: "Rays named", start: "C", need: 2,
      pts: [{ id: "A", x: 246, y: 232 }, { id: "B", x: 446, y: 232 }, { id: "C", x: 646, y: 232 }, { id: "D", x: 846, y: 232 }],
      strokes: [{ k: "L2", a: "A", b: "D", e1: 70, e2: 70, c1: "arrow", c2: "arrow" }] },
    "4.3": { kind: "rays", runs: "Rays named", start: "L", need: 3,
      pts: [{ id: "K", x: 306, y: 322 }, { id: "L", x: 546, y: 322 }, { id: "M", x: 786, y: 322 }, { id: "P", x: 546, y: 132, side: true }],
      strokes: [{ k: "L3", a: "K", b: "M", e1: 130, e2: 130, c1: "arrow", c2: "arrow" },
        { k: "R3", a: "L", b: "P", e1: 0, e2: 80, c1: "dot", c2: "arrow" }] },
    "free": { kind: "free", runs: "Points stamped", letters: ["A", "B", "C", "D", "E", "F"],
      spots: [{ x: 306, y: 132 }, { x: 546, y: 132 }, { x: 786, y: 132 },
        { x: 306, y: 342 }, { x: 546, y: 342 }, { x: 786, y: 342 }] },
  },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* the two-letter ray names inside anything the child or the agent gives ("FE FG", "FE|FG") */
const rayNames = (v: any) => String(v).toUpperCase().replace(/[^A-Z]/g, " ").trim().split(/\s+/).filter((x: string) => x.length === 2);

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.rays) {
    const list = rayNames(v);
    if (list.length !== item.rays.length) return false;
    const used = item.rays.map(() => false);
    for (const nm of list) {
      const k = item.rays.findIndex((g: any, i: number) => !used[i] && g.indexOf(nm) >= 0);
      if (k < 0) return false;
      used[k] = true;
    }
    return used.every(Boolean);
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: every answer re-derived by a second route that shares no code with judge or Work.
   It reads the board table and the rules of the chapter, never the items' own answers. */
const oracle = () => {
  const bd: any = MODEL.boards;
  /* what a stroke is, from its two caps alone */
  const shapeOf = (c1: string, c2: string) => {
    const d = [c1, c2].filter((x) => x === "dot").length, a = [c1, c2].filter((x) => x === "arrow").length;
    return d === 2 ? "seg" : d === 1 && a === 1 ? "ray" : a === 2 ? "line" : "open";
  };
  const measures = (c1: string, c2: string) => shapeOf(c1, c2) === "seg";
  const want: any = {
    /* a glass magnifies ink; the place a point marks has no size to magnify */
    "1.1": "grew_ink",
    "1.3": "same_size",
    /* k dots joined one to the next take k - 1 curved pieces */
    "1.2": bd["1.2"].pts.length - 1,
    /* arrowed at both ends: a line, so nothing for the tape to stop at */
    "2.1": measures("arrow", "arrow") ? "len_twelve" : "len_none",
    /* every line takes an arrowhead at each of its two ends */
    "2.2": bd["2.2"].bars.length * 2,
    /* U and V share a column, so the stroke through them stands up the page */
    "2.3": bd["2.3"].pts[0].x === bd["2.3"].pts[1].x ? "way_up" : "way_across",
    "3.1": measures("dot", "dot") ? "meas_gh" : "meas_mn",
    "3.2": shapeOf("dot", "arrow") === "ray" ? "kind_ray" : "kind_seg",
    "3.3": measures("dot", "arrow") ? "now_six" : "now_none",
  };
  /* a point on a line starts one ray each way along it, plus any ray already drawn from it */
  for (const k of ["4.1", "4.2", "4.3"]) {
    const b = bd[k], s = b.pts.filter((p: any) => p.id === b.start)[0];
    const along = b.pts.filter((p: any) => p.id !== b.start && p.y === s.y)
      .sort((u: any, w: any) => Math.abs(u.x - s.x) - Math.abs(w.x - s.x));
    const back = along.filter((p: any) => p.x < s.x)[0], on = along.filter((p: any) => p.x > s.x)[0];
    const off = b.pts.filter((p: any) => p.y !== s.y).map((p: any) => b.start + p.id);
    want[k] = [back ? b.start + back.id : "", on ? b.start + on.id : "", ...off].filter(Boolean).sort().join("|");
  }
  return PHASES.every((p: any, i: number) => p.items.every((it: any, j: number) => {
    const w = want[(i + 1) + "." + (j + 1)];
    const a = it.rays ? String(it.answer).split("|").sort().join("|") : it.answer;
    return String(w) === String(a);
  }));
};

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (typeof item.answer === "number"
  ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* what the slot shows: a word key reads back as its own word, and ray names as the child said them */
const format = (v: any) => {
  const s = String(v === null || v === undefined ? "" : v);
  if (!s) return s;
  for (const p of PHASES) for (const it of p.items) if (it.choices) {
    const c = it.choices.filter((x: any) => x.id === s)[0];
    if (c) return c.label;
  }
  return /^[A-Za-z]{2}([ |][A-Za-z]{2})+$/.test(s) ? rayNames(s).join(", ") : s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */

/* the chapter's own colours: the figure deep blue, every point vermilion, a length amber,
   and the second thing set beside the first a sky blue (a tint of the figure's own blue) */
const FIG = CONTENT.hundred;
const PT = CONTENT.pointer;
const MEAS = CONTENT.ten;
const SKY = tint(CONTENT.hundred, 0.3);
const SKY_EDGE = shade(CONTENT.hundred, 0.2);
const nearBy = (x: number, y: number, p: any) => Math.hypot(x - p.x, y - p.y);
const pin = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
/* a name written on the strip: "ray FE" takes the word "ray" in the language in use and keeps its letters;
   any other line ("segment GH: 8 cm") is one key in TR */
const stripName = (t: string, tx: any) => (/^ray [A-Z]{2}$/.test(t) ? tx("ray") + t.slice(3) : tx(t));

/* a stroke's two ends, from its points and how far it reaches past them */
const endsOf = (pts: any[], s: any) => {
  const a = pts.filter((p: any) => p.id === s.a)[0], b = pts.filter((p: any) => p.id === s.b)[0];
  if (!a || !b) return null;
  const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
  return { x1: a.x - ux * (s.e1 || 0), y1: a.y - uy * (s.e1 || 0), x2: b.x + ux * (s.e2 || 0), y2: b.y + uy * (s.e2 || 0), ux, uy, len: L + (s.e1 || 0) + (s.e2 || 0) };
};

/* one end of a stroke: a dot that stops it, an arrowhead that says it carries on, or an open socket */
function LkCap({ x, y, ux, uy, cap, C }: any) {
  if (cap === "dot") return <circle cx={x} cy={y} r={10} fill={PT} />;
  if (cap === "arrow") {
    const L = 30, wd = 11, bx = x - ux * L, by = y - uy * L;
    return <polygon points={`${x + ux * 4},${y + uy * 4} ${bx - uy * wd},${by + ux * wd} ${bx + uy * wd},${by - ux * wd}`} fill={FIG} />;
  }
  return <circle cx={x} cy={y} r={13} fill={C.paper} stroke={C.accent} strokeWidth={3} strokeDasharray="5 5" />;
}

/* a straight stroke with whatever sits on each of its ends */
function LkStroke({ e, c1, c2, C, colour, thick }: any) {
  if (!e) return null;
  return (
    <g>
      <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke={colour || FIG} strokeWidth={thick || 7} strokeLinecap="round" />
      <LkCap x={e.x1} y={e.y1} ux={-e.ux} uy={-e.uy} cap={c1} C={C} />
      <LkCap x={e.x2} y={e.y2} ux={e.ux} uy={e.uy} cap={c2} C={C} />
    </g>
  );
}

/* a point: one small vermilion dot, never bigger, whatever the ink round it does */
function LkPoint({ p, fat, faint }: any) {
  return (
    <g>
      {fat ? <circle cx={p.x} cy={p.y} r={19} fill={PT} fillOpacity={faint ? 0.3 : 1} /> : null}
      <circle cx={p.x} cy={p.y} r={10} fill={PT} />
    </g>
  );
}

/* the capital letter a point is named by (drawn over everything, so the glass never hides it) */
function LkName({ p, name }: any) {
  if (!name) return null;
  return <text x={p.side ? p.x + 34 : p.x} y={p.side ? p.y + 12 : p.y - 30} textAnchor={p.side ? "start" : "middle"}
    fontSize={T.label} fontWeight={700} fill={shade(PT, 0.35)}>{name}</text>;
}

/* the tape: it unrolls along a stroke from its first end, stops at a dot and reads the length,
   and at an arrowhead runs on past the edge of the board with its reading left blank */
function LkTape({ e, stops, back, reading, C }: any) {
  if (!e) return null;
  const off = 30, px = -e.uy * off, py = e.ux * off;
  const far = stops ? 0 : 420, from = back ? 420 : 0;
  const x1 = e.x1 - e.ux * from, y1 = e.y1 - e.uy * from;
  const x2 = e.x2 + e.ux * far, y2 = e.y2 + e.uy * far;
  const ticks = [];
  for (let d = MODEL.cm; d < e.len + far + from; d += MODEL.cm)
    ticks.push(<line key={d} x1={x1 + e.ux * d + px} y1={y1 + e.uy * d + py} x2={x1 + e.ux * d + px - e.uy * 11} y2={y1 + e.uy * d + py + e.ux * 11} stroke={shade(MEAS, 0.45)} strokeWidth={2} />);
  return (
    <g clipPath="url(#lkBoard)">
      <line x1={x1 + px} y1={y1 + py} x2={x2 + px} y2={y2 + py} stroke={MEAS} strokeWidth={22} strokeLinecap="butt" />
      {ticks}
      {reading ? <text x={(e.x1 + e.x2) / 2 + px * 2.1} y={(e.y1 + e.y2) / 2 + py * 2.1 + 12} textAnchor="middle"
        fontSize={T.label} fontWeight={700} fill={shade(MEAS, 0.5)}>{reading}</text> : null}
    </g>
  );
}

/* the magnifier: the grain of the paper spreads apart under the glass while the dot stays one mark */
function LkGlass({ x, y, C, over, fat }: any) {
  const lines = [];
  for (let k = -4; k <= 4; k++) lines.push(<line key={k} x1={x - 52} y1={y + k * 15} x2={x + 52} y2={y + k * 15} stroke={C.rule} strokeWidth={2.5} />);
  return (
    <g>
      <line x1={x + 40} y1={y + 40} x2={x + 74} y2={y + 74} stroke={C.accent} strokeWidth={13} strokeLinecap="round" />
      <circle cx={x} cy={y} r={56} fill={C.paper} />
      <g clipPath="url(#lkGlass)">{lines}</g>
      {over ? <g><circle cx={x} cy={y} r={fat ? 34 : 24} fill={PT} fillOpacity={0.28} /><circle cx={x} cy={y} r={10} fill={PT} /></g> : null}
      <circle cx={x} cy={y} r={56} fill="none" stroke={C.accent} strokeWidth={8} />
      <clipPath id="lkGlass"><circle cx={x} cy={y} r={52} /></clipPath>
    </g>
  );
}

/* a tool that waits in its tray: a plate the child drags a piece out of */
function LkPlate({ x, y, w, h, C, on }: any) {
  return <rect x={x} y={y} width={w} height={h} rx={RAD.key} fill={on ? tint(C.panel, 0.3) : tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={2} />;
}

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const bkey = free ? "free" : n + "." + (index + 1);
  const bd = MODEL.boards[bkey] || MODEL.boards["1.1"];
  const kind = bd.kind;
  const B = MODEL.board, SP = MODEL.strip;
  const live = free || stage === "ask" || stage === "teach";

  const [st, setSt] = useState<any>({ named: {}, order: [], caps: {}, cells: [], ang: 0, drawn: false, glass: null, seen: [], tape: null, lit: null, pend: null, rays: [], sent: false, demo: null, spots: {}, made: [] });
  const put = (o: any) => setSt((s: any) => ({ ...s, ...o }));
  useEffect(() => { setSt({ named: {}, order: [], caps: {}, cells: [], ang: 0, drawn: false, glass: null, seen: [], tape: null, lit: null, pend: null, rays: [], sent: false, demo: null, spots: {}, made: [] }); }, [bkey]);

  /* Enter and choice taps go to the runtime; the working area only fills the slot. On a question
     answered by naming rays, Enter answers only a naming the child has made and not yet had judged,
     so a bare Enter after the correction sends nothing and costs no try. */
  api.onEnter(kind === "rays" && !free ? () => {
    const v = st.rays.join(" ");
    if (st.rays.length < bd.need || v === st.judged) return;
    api.setTyped(v);
    put({ sent: true, judged: v });
    api.submit(v);
  } : null);

  /* the points and strokes on the board right now (free play grows its own) */
  const pts = free ? Object.keys(st.spots).map((k: string) => ({ id: st.spots[k], x: bd.spots[+k].x, y: bd.spots[+k].y })) : (bd.pts || []);
  const strokes = free ? st.made : (bd.strokes || []);
  const dm = st.demo;
  const capAt = (s: any, w: string) => (dm && dm.caps && dm.caps[s.k + w]) || st.caps[s.k + w] || (w === "1" ? s.c1 : s.c2) || null;
  const takesCap = (s: any, w: string) => !capAt(s, w) || ((bd.swap || []).indexOf(s.k + w) >= 0 && !st.caps[s.k + w]);
  const openEnds = () => {
    const out: any[] = [];
    strokes.forEach((s: any) => {
      const e = endsOf(pts, s);
      if (!e) return;
      if (takesCap(s, "1")) out.push({ id: s.k + "1", x: e.x1, y: e.y1 });
      if (takesCap(s, "2")) out.push({ id: s.k + "2", x: e.x2, y: e.y2 });
    });
    return out;
  };
  /* a swapped end carries on past its point: the arrowhead lands beyond K, never on top of it */
  const strokeRowOf = () => strokes.map((s: any) => {
    const run = (bd.swap || []).indexOf(s.k + "2") >= 0 && capAt(s, "2") === "arrow" ? (bd.swapRun || 0) : 0;
    return { s, e: endsOf(pts, run ? { ...s, e2: (s.e2 || 0) + run } : s) };
  }).filter((x: any) => x.e);
  const readingOf = (s: any) => {
    const e = endsOf(pts, s);
    if (!e) return null;
    return capAt(s, "1") === "dot" && capAt(s, "2") === "dot" ? Math.round(e.len / MODEL.cm) + " cm" : null;
  };

  /* the child's next act always takes the correction down first: their own pieces are never moved */
  /* the child's next act takes the correction down and starts a fresh try, and then lands: the act
     is spread last, or it would be wiped by the reset it asked for */
  const fresh = (o: any) => put(dm
    ? { ...(kind === "rays" ? { rays: [], pend: null, sent: false, judged: "" } : {}), demo: null, ...o }
    : o);

  /* ── the acts ─────────────────────────────────────────────────────────────── */
  const glass = useDrag((pay: any, p: any, moved: boolean) => {
    /* a tap puts the glass where it belongs: over the next point whose place has not been found */
    const hit = moved ? pts.filter((q: any) => nearBy(p.x, p.y, q) < 80).sort((a: any, b: any) => nearBy(p.x, p.y, a) - nearBy(p.x, p.y, b))[0]
      : pts.filter((q: any) => st.seen.indexOf(q.id) < 0)[0] || pts[0];
    const at = hit ? { x: hit.x, y: hit.y } : { x: pin(p.x, 70, 980), y: pin(p.y, 70, 436) };
    fresh({ glass: at, seen: hit && st.seen.indexOf(hit.id) < 0 ? [...st.seen, hit.id] : st.seen });
    api.sfx.tick();
  });

  const cap = useDrag((pay: any, p: any, moved: boolean) => {
    const open = openEnds();
    if (!open.length) return;
    const near = moved ? open.filter((e: any) => nearBy(p.x, p.y, e) < 130).sort((a: any, b: any) => nearBy(p.x, p.y, a) - nearBy(p.x, p.y, b))[0] : open[0];
    if (!near) return;
    fresh({ caps: { ...st.caps, [near.id]: pay } });
    api.sfx.tick();
  });

  const tape = useDrag((pay: any, p: any, moved: boolean) => {
    const pick = strokes.map((s: any) => ({ s, e: endsOf(pts, s) })).filter((x: any) => x.e)
      .map((x: any) => ({ k: x.s.k, d: moved ? Math.abs((p.x - x.e.x1) * x.e.uy - (p.y - x.e.y1) * x.e.ux) : 0 }))
      .sort((a: any, b: any) => a.d - b.d)[0];
    if (!pick || pick.d > 150) return;
    fresh({ tape: pick.k });
    api.sfx.tick();
  });

  const ruler = useDrag((pay: any, p: any, moved: boolean) => {
    const cx = 546, cy = 232;
    const a = moved ? Math.atan2(p.y - cy, p.x - cx) : st.ang + Math.PI / 4;
    let t = a % Math.PI; if (t < 0) t += Math.PI;
    const up = Math.abs(t - Math.PI / 2) < 0.38;
    fresh({ ang: up ? Math.PI / 2 : t, drawn: st.drawn || up });
    api.sfx.tick();
  });

  const nameDot = (id: string) => {
    if (st.named[id]) return;
    const k = Object.keys(st.named).length;
    fresh({ named: { ...st.named, [id]: bd.letters[k] }, order: [...st.order, id] });
    api.sfx.tick();
  };

  const capCell = (k: number) => {
    if (st.cells.indexOf(k) >= 0) return;
    fresh({ cells: [...st.cells, k] });
    api.sfx.tick();
  };

  const tapRay = (id: string) => {
    if (!st.pend) {
      /* only a point that sits on the line has a ray each way to light */
      const q = pts.filter((p: any) => p.id === id)[0];
      const on = strokeRowOf().filter((x: any) => x.s.k.charAt(0) === "L")[0];
      fresh({ pend: id, lit: on && q && Math.abs(q.y - on.e.y1) < 6 ? id : null });
      api.sfx.tick(); return;
    }
    if (id === st.pend) { fresh({ pend: null }); return; }
    const nm = st.pend + id;
    const rays = st.rays.indexOf(nm) >= 0 ? st.rays : [...st.rays, nm];
    fresh({ rays, pend: null });
    api.sfx.tick();
  };

  const stamp = (k: number) => {
    if (st.spots[k]) {
      const id = st.spots[k];
      if (!st.pend) { put({ pend: id }); api.sfx.tick(); return; }
      if (st.pend === id) { put({ pend: null }); return; }
      put({ made: [...st.made, { k: st.pend + id, a: st.pend, b: id, e1: 0, e2: 0 }], pend: null });
      api.sfx.tick();
      return;
    }
    const used = Object.keys(st.spots).length;
    if (used >= bd.letters.length) return;
    put({ spots: { ...st.spots, [k]: bd.letters[used] } });
    api.sfx.tick();
  };

  /* the rays of a question answer themselves once every ray asked for has a name */
  useEffect(() => {
    if (kind !== "rays" || stage !== "ask" || st.sent || st.demo) return;
    if (st.rays.length < bd.need) { if (st.rays.length) api.setTyped(st.rays.join(" ")); return; }
    const v = st.rays.join(" ");
    api.setTyped(v);
    put({ sent: true, judged: v });
    const id = setTimeout(() => api.submit(v), 420);
    return () => clearTimeout(id);
  }, [st.rays.length, stage]);

  /* the agent sets a ray answer the way a child does: the names appear in the strip */
  HOOK.set = (v: any) => {
    if (kind !== "rays") return undefined;
    const list = rayNames(v);
    if (!list.length) return false;
    put({ rays: list, pend: null, lit: bd.start, sent: true, judged: "", demo: null });
    api.setTyped(list.join(" "));
    return true;
  };

  /* ── the correction: the maths redrawn, ending on the whole right answer, nothing marked ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const D = (o: any) => () => put({ demo: o });
    const S = MODEL.boards[bkey];
    let steps: any[] = [];
    if (kind === "glass" && bkey === "1.1") {
      const p = S.pts[0];
      steps = [[700, D({ glass: { x: p.x, y: p.y }, over: p.id })],
        [900, D({ glass: { x: p.x, y: p.y }, over: p.id, ink: true })],
        [900, D({ glass: { x: p.x, y: p.y }, over: p.id, ink: true, note: "Only the ink grew", noteAt: { x: 546, y: 392 } })]];
    } else if (kind === "glass") {
      const a = S.pts[0], b = S.pts[1];
      steps = [[750, D({ glass: { x: a.x, y: a.y }, over: a.id, ink: true })],
        [900, D({ glass: { x: b.x, y: b.y }, over: b.id, ink: true })],
        [900, D({ marks: [{ x: 476, y: 352 }, { x: 636, y: 352 }], note: "Both the same", noteAt: { x: 556, y: 422 } })]];
    } else if (kind === "join") {
      steps = [[450, D({ curves: 1 })], [450, D({ curves: 2 })], [450, D({ curves: 3 })], [550, D({ curves: 4 })],
        [700, D({ curves: 4, big: "4 curves" })]];
    } else if (kind === "caps") {
      const cs = { CD1: "arrow", CD2: "arrow" };
      steps = [[700, D({ caps: cs })], [900, D({ caps: cs, tape: "CD" })],
        [900, D({ caps: cs, tape: "CD", big: "line CD", note: "No length", noteAt: { x: 546, y: 372 } })]];
    } else if (kind === "grid") {
      steps = [[450, D({ cells: 2 })], [450, D({ cells: 4 })], [450, D({ cells: 6 })], [550, D({ cells: 8 })],
        [700, D({ cells: 8, big: "16 arrowheads" })]];
    } else if (kind === "ruler") {
      steps = [[550, D({ ang: 0.7 })], [450, D({ ang: 1.15 })], [550, D({ ang: Math.PI / 2, drawn: true })],
        [700, D({ ang: Math.PI / 2, drawn: true, big: "line UV", note: "Upright", noteAt: { x: 760, y: 242 } })]];
    } else if (kind === "tape2") {
      steps = [[750, D({ tape: "GH" })], [950, D({ tape: "MN" })],
        [900, D({ tape: "GH", names: ["segment GH: 8 cm", "ray MN: no length"] })]];
    } else if (kind === "cap1") {
      steps = [[700, D({ caps: { WX2: "arrow" } })], [900, D({ caps: { WX2: "arrow" }, names: ["ray WX"] })]];
    } else if (kind === "swap") {
      const cs = { JK2: "arrow" };
      steps = [[700, D({ caps: cs })], [900, D({ caps: cs, tape: "JK" })],
        [900, D({ caps: cs, tape: "JK", names: ["ray JK"], note: "No length", noteAt: { x: 496, y: 372 } })]];
    } else if (kind === "rays") {
      const want = String(item.answer).split("|");
      steps = want.map((w: string, k: number) => [k ? 850 : 700, D({ lit: S.start, rays: want.slice(0, k + 1), names: want.slice(0, k + 1).map((r: string) => "ray " + r) })]);
    }
    api.lock(true);
    tl.run(steps, () => api.lock(false));
    return () => { tl.stop(); api.lock(false); };
  }, [wrong]);

  /* the glass proof is the phase's best moment, so a right answer sees it too, not only a miss */
  useEffect(() => {
    if (stage !== "win" || bkey !== "1.3") return;
    const S = MODEL.boards["1.3"], a = S.pts[0], b = S.pts[1];
    tl.run([
      [420, () => put({ demo: { glass: { x: a.x, y: a.y }, over: a.id, ink: true } })],
      [640, () => put({ demo: { glass: { x: b.x, y: b.y }, over: b.id, ink: true } })],
      [640, () => put({ demo: { marks: [{ x: 476, y: 352 }, { x: 636, y: 352 }], note: "Both the same", noteAt: { x: 556, y: 422 } } })],
    ]);
    return () => tl.stop();
  }, [stage, bkey]);

  /* what the host and the agent read back (toolApi.getState) */
  api.share({
    points: pts.length, strokes: strokes.length, caps: Object.keys(st.caps).length,
    tapeReading: st.tape ? readingOf(strokes.filter((s: any) => s.k === st.tape)[0] || {}) : null,
    curve: Math.max(0, st.order.length - 1), tappedPoint: st.lit, raysFound: st.rays.length,
    complete: stage === "idle",
  });

  /* ── the picture ──────────────────────────────────────────────────────────── */
  const runs = { name: bd.runs, n: 0, of: 0 };
  if (kind === "glass") { runs.n = st.seen.length; runs.of = pts.length; }
  else if (kind === "join") { runs.n = st.order.length; runs.of = pts.length; }
  else if (kind === "grid") { runs.n = st.cells.length; runs.of = bd.bars.length; }
  else if (kind === "ruler") { runs.n = st.drawn ? 1 : 0; runs.of = 1; }
  else if (kind === "tape2") { runs.n = st.tape ? 1 : 0; runs.of = 2; }
  else if (kind === "rays") { runs.n = st.rays.length; runs.of = bd.need; }
  else if (kind === "free") { runs.n = Object.keys(st.spots).length; runs.of = bd.spots.length; }
  else { runs.n = Object.keys(st.caps).length; runs.of = bd.need || 1; }

  /* the one thing to touch */
  let inv: any = null;
  if (live && !dm) {
    if (kind === "glass") inv = st.seen.length < pts.length ? (st.glass ? { x: st.glass.x, y: st.glass.y, r: 74 } : { x: 74, y: 448, r: 74 }) : null;
    else if (kind === "join") { const q = pts.filter((p: any) => !st.named[p.id])[0]; inv = q ? { x: q.x, y: q.y, r: 44 } : null; }
    else if (kind === "grid") { const k = bd.bars.map((_: any, i: number) => i).filter((i: number) => st.cells.indexOf(i) < 0)[0];
      inv = k === undefined ? null : { x: B.x + (k % bd.cols) * 195 + 97 + (bd.bars[k].dx || 0), y: B.y + ((k / bd.cols) | 0) * 220 + 110 + (bd.bars[k].dy || 0), r: 58 }; }
    else if (kind === "ruler") inv = st.drawn ? null : { x: 546 + Math.cos(st.ang) * 210, y: 232 + Math.sin(st.ang) * 210, r: 52 };
    else if (kind === "rays") { const q = pts.filter((p: any) => p.id === bd.start)[0]; inv = !st.pend && st.rays.length < bd.need && q ? { x: q.x, y: q.y, r: 44 } : null; }
    else if (kind === "free") { const k = bd.spots.map((s: any, i: number) => i).filter((i: number) => !st.spots[i])[0]; inv = k === undefined ? null : { x: bd.spots[k].x, y: bd.spots[k].y, r: 52 }; }
    else if (openEnds().length) inv = { x: 1019, y: 146, r: 52 };
    else if (kind !== "cap1" && !st.tape) inv = { x: 1019, y: 253, r: 52 };
  }

  /* the tape, the caps and the glass, wherever they are being held right now */
  const held = (d: any, rest: any) => (d.drag && d.drag.moved ? { x: d.drag.x, y: d.drag.y } : rest);
  const useCap = ["caps", "cap1", "swap", "free"].indexOf(kind) >= 0;
  const useTape = ["caps", "tape2", "swap", "free"].indexOf(kind) >= 0;
  const useGlass = kind === "glass";
  const useRuler = kind === "ruler";
  const capPos = held(cap, null);
  const tapePos = held(tape, null);
  const glassPos = held(glass, st.glass || { x: 74, y: 448 });
  const dmTape = dm && dm.tape ? dm.tape : null;
  const shownTape = dmTape || (dm ? null : st.tape);
  const ang = dm && dm.ang !== undefined ? dm.ang : (ruler.drag && ruler.drag.moved ? Math.atan2(ruler.drag.y - 232, ruler.drag.x - 546) : st.ang);
  const drawn = dm ? !!dm.drawn : st.drawn;
  const litFrom = dm ? dm.lit : st.lit;
  const rayList = dm && dm.rays ? dm.rays : st.rays;
  const names = dm && dm.names ? dm.names : kind === "rays" ? st.rays.map((r: string) => "ray " + r) : [];
  const curves = dm && dm.curves !== undefined ? dm.curves : Math.max(0, st.order.length - 1);
  const cells = dm && dm.cells !== undefined ? (bd.bars || []).map((_: any, i: number) => i).slice(0, dm.cells) : st.cells;
  const named = dm && dm.curves !== undefined ? { d1: "A", d2: "B", d3: "C", d4: "D", d5: "E" } : st.named;
  const order = dm && dm.curves !== undefined ? ["d1", "d2", "d3", "d4", "d5"] : st.order;

  /* the strokes of the board, each with what sits on its ends */
  const strokeRow = strokeRowOf();

  return (
    <g>
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
        <text x={18} y={-46} fontSize={T.micro} fontWeight={600} fill={C.accent}>{tx(runs.name)}</text>
        <text x={312} y={-44} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{runs.n} / {runs.of}</text>
      </g>

      <clipPath id="lkBoard"><rect x={B.x} y={B.y} width={B.w} height={B.h} rx={RAD.panel} /></clipPath>
      <rect x={B.x} y={B.y} width={B.w} height={B.h} rx={RAD.panel} fill={C.panel} stroke={C.rule} strokeWidth={2} />
      <rect x={SP.x} y={SP.y} width={SP.w} height={SP.h} rx={RAD.key} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />

      {/* the grid of strokes that become lines, one tap each */}
      {kind === "grid" ? bd.bars.map((bar: any, k: number) => {
        const col = k % bd.cols, row = (k / bd.cols) | 0;
        const cx = B.x + col * 195 + 97 + (bar.dx || 0), cy = B.y + row * 220 + 110 + (bar.dy || 0);
        const a = (bar.a * Math.PI) / 180;
        const ux = Math.cos(a), uy = Math.sin(a), on = cells.indexOf(k) >= 0;
        const e = { x1: cx - ux * bar.L, y1: cy - uy * bar.L, x2: cx + ux * bar.L, y2: cy + uy * bar.L, ux, uy, len: bar.L * 2 };
        return <g key={k}><LkStroke e={e} c1={on ? "arrow" : null} c2={on ? "arrow" : null} C={C} /></g>;
      }) : null}

      {/* the ruler, lying across the board and turning about its middle */}
      {useRuler ? (
        <g transform={`rotate(${(ang * 180) / Math.PI} 546 232)`} opacity={0.92}>
          <rect x={546 - 210} y={232 - 30} width={420} height={60} rx={12} fill={tint(C.panel, 0.35)} stroke={C.accent} strokeWidth={3} />
          {[-160, -110, -60, -10, 40, 90, 140, 190].map((d) => <line key={d} x1={546 + d} y1={232 - 30} x2={546 + d} y2={232 - 12} stroke={C.ink} strokeWidth={2} />)}
        </g>
      ) : null}

      {/* every stroke on the board */}
      {strokeRow.map((x: any) => {
        if (useRuler && !drawn) return null;
        return <g key={x.s.k}><LkStroke e={x.e} c1={capAt(x.s, "1")} c2={capAt(x.s, "2")} C={C} /></g>;
      })}

      {/* the end the question offers for a swap: its dot can still come off for an arrowhead */}
      {!dm ? (bd.swap || []).map((id: string) => {
        const w = id.slice(-1), row = strokeRow.filter((x: any) => x.s.k === id.slice(0, -1))[0];
        if (!row || st.caps[id]) return null;
        return <circle key={id} cx={w === "1" ? row.e.x1 : row.e.x2} cy={w === "1" ? row.e.y1 : row.e.y2}
          r={21} fill="none" stroke={C.accent} strokeWidth={3} strokeDasharray="5 5" />;
      }) : null}

      {/* the two rays that start at a tapped point: one way, then the other beside it */}
      {kind === "rays" && litFrom ? strokeRow.filter((x: any) => x.s.k[0] === "L").map((x: any) => {
        const s = pts.filter((p: any) => p.id === litFrom)[0];
        if (!s) return null;
        return (
          <g key="lit">
            <line x1={s.x} y1={s.y} x2={x.e.x2} y2={x.e.y2} stroke={FIG} strokeWidth={14} strokeLinecap="round" />
            <line x1={s.x} y1={s.y} x2={x.e.x1} y2={x.e.y1} stroke={SKY_EDGE} strokeWidth={19} strokeLinecap="round" />
            <line x1={s.x} y1={s.y} x2={x.e.x1} y2={x.e.y1} stroke={SKY} strokeWidth={13} strokeLinecap="round" />
            <LkCap x={x.e.x2} y={x.e.y2} ux={x.e.ux} uy={x.e.uy} cap="arrow" C={C} />
            <polygon points={`${x.e.x1 - x.e.ux * 4},${x.e.y1 - x.e.uy * 4} ${x.e.x1 + x.e.ux * 30 + x.e.uy * 11},${x.e.y1 + x.e.uy * 30 - x.e.ux * 11} ${x.e.x1 + x.e.ux * 30 - x.e.uy * 11},${x.e.y1 + x.e.uy * 30 + x.e.ux * 11}`} fill={SKY} stroke={SKY_EDGE} strokeWidth={3} strokeLinejoin="round" />
            <circle cx={s.x} cy={s.y} r={10} fill={PT} />
          </g>
        );
      }) : null}

      {/* the curved pen: one freehand piece from each named dot to the next */}
      {order.slice(1).map((id: string, k: number) => {
        if (k >= curves) return null;
        const a = pts.filter((p: any) => p.id === order[k])[0], b = pts.filter((p: any) => p.id === id)[0];
        if (!a || !b) return null;
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 + (k % 2 ? 58 : -58);
        return <path key={id} d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`} fill="none" stroke={FIG} strokeWidth={7} strokeLinecap="round" />;
      })}

      {/* free play: where a point can still be stamped */}
      {kind === "free" ? bd.spots.map((s: any, k: number) => (st.spots[k] ? null :
        <g key={k}>
          <line x1={s.x - 16} y1={s.y} x2={s.x + 16} y2={s.y} stroke={C.rule} strokeWidth={4} strokeLinecap="round" />
          <line x1={s.x} y1={s.y - 16} x2={s.x} y2={s.y + 16} stroke={C.rule} strokeWidth={4} strokeLinecap="round" />
        </g>)) : null}

      {/* the points themselves */}
      {pts.map((p: any) => <LkPoint key={p.id} p={p} fat={p.fat} faint={dm && dm.over === p.id} />)}

      {/* the place a point marks, restamped at its one small size */}
      {dm && dm.marks ? dm.marks.map((m: any, k: number) => <circle key={k} cx={m.x} cy={m.y} r={10} fill={PT} />) : null}

      {/* the point a ray is being named from */}
      {st.pend && !dm ? (() => { const q = pts.filter((p: any) => p.id === st.pend)[0]; return q ? <circle cx={q.x} cy={q.y} r={24} fill="none" stroke={MEAS} strokeWidth={6} /> : null; })() : null}

      {/* the tape, unrolled along one stroke */}
      {shownTape ? (() => {
        const x = strokeRow.filter((r: any) => r.s.k === shownTape)[0];
        if (!x) return null;
        const stops = capAt(x.s, "2") === "dot" && capAt(x.s, "1") === "dot";
        return <LkTape e={x.e} stops={stops} back={capAt(x.s, "1") === "arrow"} reading={stops ? Math.round(x.e.len / MODEL.cm) + " " + tx("cm") : null} C={C} />;
      })() : null}

      {/* the magnifier */}
      {useGlass && !(dm && dm.glass) ? <LkGlass x={glassPos.x} y={glassPos.y} C={C}
        over={!!st.glass && pts.filter((p: any) => nearBy(glassPos.x, glassPos.y, p) < 40).length > 0}
        fat={pts.filter((p: any) => p.fat && nearBy(glassPos.x, glassPos.y, p) < 40).length > 0} /> : null}
      {dm && dm.glass ? <LkGlass x={dm.glass.x} y={dm.glass.y} C={C} over={dm.ink} fat={!!(pts.filter((p: any) => p.id === dm.over)[0] || {}).fat} /> : null}

      {/* every capital letter, drawn last so nothing on the board can hide a point's name */}
      {pts.map((p: any) => <LkName key={p.id} p={p} name={kind === "join" ? named[p.id] || "" : p.id} />)}

      {/* the tray: a dot, an arrowhead and the tape, waiting to be dragged out */}
      {useCap ? <LkPlate x={952} y={104} w={134} h={84} C={C} /> : null}
      {useCap && kind !== "cap1" && kind !== "swap" ? <LkPlate x={952} y={12} w={134} h={84} C={C} /> : null}
      {useTape ? <LkPlate x={952} y={208} w={134} h={90} C={C} /> : null}
      {useCap ? (
        <g>
          {kind !== "cap1" && kind !== "swap" ? <g {...control("cap-dot", "end dot")} {...cap.bind("dot")} {...cap.keys("dot")} style={{ cursor: "grab" }}>
            <rect x={956} y={16} width={126} height={76} rx={RAD.key} fill="transparent" />
            <circle cx={1019} cy={54} r={13} fill={PT} />
          </g> : null}
          <g {...control("cap-arrow", "arrowhead")} {...cap.bind("arrow")} {...cap.keys("arrow")} style={{ cursor: "grab" }}>
            <rect x={956} y={108} width={126} height={76} rx={RAD.key} fill="transparent" />
            <line x1={984} y1={146} x2={1030} y2={146} stroke={FIG} strokeWidth={7} strokeLinecap="round" />
            <polygon points="1054,146 1026,158 1026,134" fill={FIG} />
          </g>
        </g>
      ) : null}
      {useTape ? (
        <g {...control("tape", "tape measure")} {...tape.bind("tape")} {...tape.keys("tape")} style={{ cursor: "grab" }}>
          <rect x={956} y={210} width={126} height={84} rx={RAD.key} fill="transparent" />
          <circle cx={1019} cy={252} r={34} fill={MEAS} stroke={shade(MEAS, 0.35)} strokeWidth={3} />
          <circle cx={1019} cy={252} r={12} fill={tint(MEAS, 0.75)} />
        </g>
      ) : null}
      {capPos ? <g opacity={0.85}><circle cx={capPos.x} cy={capPos.y} r={13} fill={cap.drag.payload === "dot" ? PT : FIG} /></g> : null}
      {tapePos ? <circle cx={tapePos.x} cy={tapePos.y} r={28} fill={MEAS} opacity={0.85} /> : null}

      {useGlass ? <g {...control("glass", "magnifying glass")} {...glass.bind("glass")} {...glass.keys("glass")} style={{ cursor: "grab" }}>
        <rect x={glassPos.x - 60} y={glassPos.y - 60} width={120} height={120} rx={60} fill="transparent" />
      </g> : null}

      {/* the ruler's turning handle */}
      {useRuler ? <g {...control("ruler", "turn the ruler")} {...ruler.bind("ruler")} {...ruler.keys("ruler")} style={{ cursor: "grab" }}>
        <circle cx={546 + Math.cos(ang) * 210} cy={232 + Math.sin(ang) * 210} r={38} fill={tint(C.accent, 0.72)} stroke={C.accent} strokeWidth={4} />
        <rect x={546 + Math.cos(ang) * 210 - 40} y={232 + Math.sin(ang) * 210 - 40} width={80} height={80} rx={40} fill="transparent" />
      </g> : null}

      {/* the taps: a dot to name, a cell to arrow, a point to split, a spot to stamp */}
      {live && kind === "join" ? pts.map((p: any) => <Hit key={p.id} id={"dot-" + p.id} x={p.x - 45} y={p.y - 45} w={90} h={90} label={"name this point"} onPress={() => nameDot(p.id)} />) : null}
      {live && kind === "grid" ? bd.bars.map((_: any, k: number) => <Hit key={k} id={"cell-" + k} x={B.x + (k % bd.cols) * 195 + 8} y={B.y + ((k / bd.cols) | 0) * 220 + 8} w={179} h={204} label={"arrow both ends"} onPress={() => capCell(k)} />) : null}
      {live && kind === "rays" ? pts.map((p: any) => <Hit key={p.id} id={"pt-" + p.id} x={p.x - 45} y={p.y - 45} w={90} h={90} label={"point " + p.id} onPress={() => tapRay(p.id)} />) : null}
      {live && kind === "free" ? bd.spots.map((s: any, k: number) => <Hit key={k} id={"spot-" + k} x={s.x - 60} y={s.y - 60} w={120} h={120} label={"stamp a point"} onPress={() => stamp(k)} />) : null}

      {/* the name strip: a stroke's name as its second cap lands, a ray's name from its own point */}
      {names.map((t0: string, k: number) => {
        const t = stripName(t0, tx);
        const at = names.slice(0, k).reduce((a: number, s: string) => a + stripName(s, tx).length * 17 + 44, SP.x + 24);
        return <text key={t + k} x={at} y={SP.y + 38} fontSize={T.label} fontWeight={600} fill={shade(FIG, 0.3)}>{t}</text>;
      })}
      {dm && dm.big ? <text x={546} y={SP.y + 40} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={shade(FIG, 0.3)}>{tx(dm.big)}</text> : null}
      {dm && dm.note ? <text x={dm.noteAt.x} y={dm.noteAt.y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(dm.note)}</text> : null}

      {inv ? <Invite x={inv.x} y={inv.y} r={inv.r} C={C} /> : null}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const k = last.kind, cy = h / 2 - 6;
  const label = k === "rays" ? rayNames(last.value).join(" ") : tx(format(last.value));
  const fig = [];
  if (k === "glass") {
    fig.push(<circle key="d" cx={40} cy={cy} r={6} fill={PT} />);
    fig.push(<circle key="g" cx={40} cy={cy} r={20} fill="none" stroke={C.accent} strokeWidth={4} />);
  } else if (k === "join") {
    [10, 26, 42, 58, 74].forEach((x, i) => {
      fig.push(<circle key={"p" + x} cx={x} cy={cy} r={5} fill={PT} />);
      if (i) fig.push(<path key={"c" + x} d={`M ${x - 16} ${cy} Q ${x - 8} ${cy + (i % 2 ? 14 : -14)} ${x} ${cy}`} fill="none" stroke={FIG} strokeWidth={3} />);
    });
  } else if (k === "rays") {
    fig.push(<line key="l" x1={14} y1={cy} x2={70} y2={cy} stroke={FIG} strokeWidth={5} />);
    fig.push(<polygon key="a1" points={`74,${cy} 60,${cy - 7} 60,${cy + 7}`} fill={FIG} />);
    fig.push(<polygon key="a2" points={`10,${cy} 24,${cy - 7} 24,${cy + 7}`} fill={SKY} stroke={SKY_EDGE} strokeWidth={2} strokeLinejoin="round" />);
    fig.push(<circle key="p" cx={42} cy={cy} r={7} fill={PT} />);
  } else {
    const both = k === "caps" || k === "grid" || k === "ruler";
    fig.push(<line key="l" x1={18} y1={cy} x2={66} y2={cy} stroke={FIG} strokeWidth={5} />);
    fig.push(<polygon key="a" points={`72,${cy} 58,${cy - 7} 58,${cy + 7}`} fill={FIG} />);
    fig.push(both ? <polygon key="b" points={`12,${cy} 26,${cy - 7} 26,${cy + 7}`} fill={FIG} /> : <circle key="b" cx={18} cy={cy} r={7} fill={PT} />);
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {fig}
      <text x={w - 10} y={cy + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{label.slice(0, 12)}</text>
    </g>
  );
}

function LineKit(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default LineKit;
