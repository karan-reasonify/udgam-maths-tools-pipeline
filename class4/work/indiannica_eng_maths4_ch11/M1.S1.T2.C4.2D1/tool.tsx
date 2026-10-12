/* ═══ M1.S1.T2.C4.2D1 · ruler_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   Ruler Bench, one picture a phase:
   1  a tray of things and three bins (length, weight, capacity) with their unit cards: drag each
      thing into its bin, then a card from that bin onto it (a card of another bin will not stick)
   2  a bench with a big hand and a small hand: each tap on a hand lays one more of its handspans
      along the bench, and the tape reads the bench once in centimetres
   3  a 15 cm ruler whose first mark has no 0: an object slides along it a centimetre at a time
   4  a unit picker (a fingertip, a big step, a road between towns), and an estimate beside a measure */

const TOOL_ID = "ruler_bench";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Ruler Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A bench of things to measure. What kind of measure does each one need?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Each thing got a unit of its own kind. Every reading started at the zero mark, and every unit was picked to suit the size.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Pick any thing, slide it along the ruler, and read it from the zero mark.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Ruler Bench": "पैमाना बेंच",
    "A bench of things to measure. What kind of measure does each one need?": "मापने के लिए चीज़ों से भरी एक बेंच। हर चीज़ को किस तरह का माप चाहिए?",
    "Each thing got a unit of its own kind. Every reading started at the zero mark, and every unit was picked to suit the size.": "हर चीज़ को उसकी तरह का मात्रक मिला। हर माप शून्य के निशान से शुरू हुआ। हर मात्रक आकार देखकर चुना गया।",
    "Free play. Pick any thing, slide it along the ruler, and read it from the zero mark.": "मुक्त खेल। कोई भी चीज़ चुनो, पैमाने पर खिसकाओ और शून्य के निशान से पढ़ो।",
    /* phase 1 */
    "A unit for every kind of measure": "हर तरह के माप का मात्रक",
    "Is it a length, a weight or a capacity? Which units belong to it?": "यह लंबाई है, भार है या धारिता? कौन से मात्रक इसके हैं?",
    "Which kind of measure can say that?": "किस तरह का माप यह बता सकता है?",
    "Take one thing at a time, and ask what you want to know about it.": "एक बार में एक चीज़ लो, और पूछो कि उसके बारे में क्या जानना है।",
    "Length, weight and capacity each have their own units, and a measure takes a unit of its own kind.": "लंबाई, भार और धारिता, तीनों के अपने मात्रक हैं। हर माप अपनी तरह का मात्रक लेता है।",
    "You learned: length, weight and capacity each take their own units.": "तुमने सीखा: लंबाई, भार और धारिता के अपने अपने मात्रक होते हैं।",
    "A skipping rope, a school bag and a jug of milk. Put each in its bin, then give each a unit card.": "कूदने की रस्सी, स्कूल बैग और दूध का जग। हर चीज़ को उसके डिब्बे में रखो, फिर उसे मात्रक का कार्ड दो।",
    "Bin and unit card for each": "हर चीज़: डिब्बा और कार्ड",
    "Ask of each thing: how long is it, how heavy is it, or how much does it hold?": "हर चीज़ से पूछो। यह कितनी लंबी है, कितनी भारी है, या इसमें कितना आता है?",
    "A bucket holds 12 blank of water. Which unit fills the blank: centimetres, kilograms or litres?": "बाल्टी में 12 पानी आता है, पर मात्रक छूट गया है। कौन सा मात्रक सही है: सेंटीमीटर, किलोग्राम या लीटर?",
    "A bucket holds 12 ___ of water.": "बाल्टी में 12 ___ पानी आता है।",
    "Think of filling the bucket. Which kind of measure tells how much goes in?": "बाल्टी भरने के बारे में सोचो। कौन सा माप बताता है कि इसमें कितना आता है?",
    "Now a bag of rice, a ribbon and a glass of juice. Sort them the same way.": "अब चावल की थैली, एक रिबन और जूस का गिलास। इन्हें भी इसी तरह छाँटो।",
    "Sort all three.": "तीनों को छाँटो।",
    "Would you lift it, lay it out straight, or pour it? That picks its bin.": "तुम इसे उठाओगे, सीधा फैलाओगे, या उँडेलोगे? उसी से इसका डिब्बा तय होता है।",
    "Each thing needs a bin and a unit card first.": "पहले हर चीज़ को डिब्बा और मात्रक कार्ड चाहिए।",
    /* phase 2 */
    "Why everyone uses the same units": "सब एक जैसे मात्रक क्यों लेते हैं",
    "Tap a hand to lay one handspan along the bench. Tap the tape to measure it too.": "बेंच पर एक बित्ता रखने के लिए हाथ पर टैप करो। उसे नापने के लिए फ़ीते पर भी टैप करो।",
    "Which hand fits more times along it?": "कौन सा हाथ इस पर ज़्यादा बार आता है?",
    "Pull out the tape. Does its reading care whose hand it is?": "फ़ीता खींचो। क्या उसका माप इस पर निर्भर है कि हाथ किसका है?",
    "Handspans change from person to person, so standard units such as the centimetre are used. They give everyone the same reading.": "बित्ता हर व्यक्ति का अलग होता है। इसलिए सेंटीमीटर जैसे मानक मात्रक लिए जाते हैं। इनसे सबको एक ही माप मिलता है।",
    "You learned: handspans differ, so everyone uses standard units.": "तुमने सीखा: बित्ते अलग होते हैं, इसलिए सब मानक मात्रक लेते हैं।",
    "Two children measure the same bench with their hands. One counts 9 handspans and the other counts 12. Which count is right?": "दो बच्चे एक ही बेंच को अपने हाथ से नापते हैं। एक को 9 बित्ते मिलते हैं और दूसरे को 12। कौन सी गिनती सही है?",
    "Which count is right?": "कौन सी गिनती सही है?",
    "Did the bench change between the two counts?": "क्या दोनों गिनतियों के बीच बेंच बदल गई?",
    "A grown-up measures a table as 6 handspans, and a child measures it as 9. Why are the numbers different?": "एक बड़े व्यक्ति को मेज़ 6 बित्ते की मिलती है। एक बच्चे को वह 9 बित्ते की मिलती है। संख्याएँ अलग क्यों हैं?",
    "Why do the counts differ?": "गिनतियाँ अलग क्यों हैं?",
    "Lay both hands along the table. Whose handspan is longer?": "दोनों हाथ मेज़ पर रखो। किसका बित्ता लंबा है?",
    "Why is cloth sold by the metre and not by the handspan?": "कपड़ा बित्ते से नहीं, मीटर से क्यों बिकता है?",
    "Why sell cloth by the metre?": "कपड़ा मीटर से क्यों?",
    "Suppose the buyer has a bigger hand. Would their handspans give the same cloth?": "मान लो खरीदार का हाथ बड़ा है। क्या उसके बित्तों से उतना ही कपड़ा मिलेगा?",
    "just 9": "सिर्फ़ 9", "just 12": "सिर्फ़ 12", "both": "दोनों",
    "hands differ": "हाथ अलग हैं", "table changed": "मेज़ बदली", "a miscount": "गलत गिनती",
    "same for all": "सबके लिए एक", "a longer unit": "बड़ा मात्रक", "quicker": "जल्दी होता है",
    /* phase 3 */
    "Measuring from the zero mark": "शून्य के निशान से मापना",
    "Look for the 0 on this ruler. There is none, so the first mark is the zero mark.": "इस पैमाने पर 0 ढूँढो। वह नहीं है, इसलिए पहला निशान ही शून्य का निशान है।",
    "Which mark is the zero mark on this ruler?": "इस पैमाने पर शून्य का निशान कौन सा है?",
    "Put a finger on the zero mark and step one centimetre at a time.": "शून्य के निशान पर उँगली रखो और एक एक सेंटीमीटर आगे बढ़ो।",
    "Measure from the zero mark, the first mark on the ruler, even where no 0 is printed. Then the reading at the other end is the length.": "शून्य के निशान से नापो, जो पैमाने का पहला निशान है। वहाँ 0 न छपा हो, तब भी। फिर दूसरे सिरे का माप ही लंबाई है।",
    "You learned: measure from the zero mark, the ruler's first mark.": "तुमने सीखा: शून्य के निशान, यानी पैमाने के पहले निशान से नापो।",
    "A crayon lies along the ruler, its left end on the first mark. How long is the crayon?": "एक क्रेयॉन पैमाने पर रखा है। उसका बायाँ सिरा पहले निशान पर है। क्रेयॉन कितना लंबा है?",
    "How long is the crayon, in cm?": "क्रेयॉन कितने सेमी का?",
    "Count the spaces between the marks, not the marks themselves.": "निशानों के बीच की जगहें गिनो, निशान नहीं।",
    "Now a pencil, laid from the same first mark. How long is it?": "अब एक पेंसिल, उसी पहले निशान से रखी हुई। यह कितनी लंबी है?",
    "How long is the pencil, in cm?": "पेंसिल कितने सेमी की?",
    "The pencil starts at the zero mark. Which number sits under its tip?": "पेंसिल शून्य के निशान से शुरू होती है। उसकी नोक के नीचे कौन सी संख्या है?",
    "A child lays one end of a key on the mark for 1. The other end reads 6. How long is the key?": "एक बच्चा चाबी का एक सिरा 1 के निशान पर रखता है। दूसरा सिरा 6 पर है। चाबी कितनी लंबी है?",
    "How long is the key, in cm?": "चाबी कितने सेमी की?",
    "Where does the key's left end sit, and where is the zero mark?": "चाबी का बायाँ सिरा कहाँ है, और शून्य का निशान कहाँ है?",
    /* phase 4 */
    "Choosing a sensible unit": "सही मात्रक चुनना",
    "Before you guess or measure, pick a unit that suits the size.": "अनुमान लगाने या नापने से पहले, आकार के हिसाब से मात्रक चुनो।",
    "Picture the real thing beside you. How big is it?": "असली चीज़ को अपने पास सोचो। वह कितनी बड़ी है?",
    "Look at the picture again, one part at a time.": "चित्र को फिर से देखो, एक एक हिस्सा करके।",
    "Choose a unit that suits the size, guess, then measure. A good estimate is a close one, and the gap tells how close.": "आकार के हिसाब से मात्रक चुनो, अनुमान लगाओ, फिर नापो। अच्छा अनुमान पास का होता है, और अंतर बताता है कितना पास।",
    "You learned: pick a unit to suit the size; find how far a guess is out.": "तुमने सीखा: आकार देखकर मात्रक चुनो; अनुमान कितना दूर है, जानो।",
    "Is a school bus about 10 centimetres, 10 metres or 10 kilometres long? Tap the unit, then press Enter.": "एक स्कूल बस कितनी लंबी होती है? लगभग 10 सेंटीमीटर, 10 मीटर या 10 किलोमीटर? मात्रक पर टैप करो, फिर एंटर दबाओ।",
    "A bus is about 10 ___ long.": "बस लगभग 10 ___ लंबी है।",
    "How big is a bus: about a finger, a step or a journey?": "बस कितनी बड़ी है? एक उँगली जितनी, एक कदम जितनी, या एक सफ़र जितनी?",
    "And a cricket pitch: about 20 centimetres, 20 metres or 20 kilometres? Pick it the same way.": "और एक क्रिकेट पिच: लगभग 20 सेंटीमीटर, 20 मीटर या 20 किलोमीटर? इसे भी वैसे ही चुनो।",
    "A pitch is about 20 ___ long.": "पिच लगभग 20 ___ लंबी है।",
    "Walk the pitch in your head. Is it a few steps, or a long ride?": "मन में पिच पर चलकर देखो। क्या यह कुछ कदम है, या लंबा सफ़र?",
    "A child estimates a notebook at 30 centimetres. Measured from the zero mark, it is 24 centimetres. By how much was the estimate out?": "एक बच्चे का अनुमान है कि कॉपी 30 सेंटीमीटर की है। शून्य के निशान से नापने पर वह 24 सेंटीमीटर निकली। अनुमान कितना ग़लत था?",
    "Out by how many cm?": "कितने सेमी का अंतर?",
    "Count on from the measure to the estimate.": "माप से अनुमान तक आगे गिनो।",
    "Pick one of the three units first.": "पहले तीनों में से एक मात्रक चुनो।",
    /* drawn on the working area, the slot and the summary */
    "in bins": "डिब्बों में", "{a} of {n}": "{n} में से {a}",
    "length": "लंबाई", "weight": "भार", "capacity": "धारिता",
    "skipping rope": "कूदने की रस्सी", "school bag": "स्कूल बैग", "jug of milk": "दूध का जग", "bag of rice": "चावल की थैली",
    "ribbon": "रिबन", "glass of juice": "जूस का गिलास", "bucket": "बाल्टी",
    "mm": "मिमी", "cm": "सेमी", "m": "मी", "km": "किमी", "g": "ग्रा", "kg": "किग्रा", "mL": "मिली", "L": "ली",
    "bench": "बेंच", "table": "मेज़", "cloth": "कपड़ा", "tape": "फ़ीता",
    "big hand": "बड़ा हाथ", "small hand": "छोटा हाथ", "grown-up": "बड़े व्यक्ति", "child": "बच्चा", "seller": "दुकानदार", "buyer": "खरीदार",
    "both are right": "दोनों सही हैं", "the hands differ": "हाथ अलग हैं", "a metre never changes": "मीटर कभी नहीं बदलता",
    "crayon": "क्रेयॉन", "eraser": "रबड़", "key": "चाबी", "pencil": "पेंसिल",
    "school bus": "स्कूल बस", "cricket pitch": "क्रिकेट पिच", "about": "लगभग",
    "centimetres": "सेंटीमीटर", "metres": "मीटर", "kilometres": "किलोमीटर",
    "metre stick": "मीटर छड़", "metre sticks": "मीटर छड़ें", "estimate": "अनुमान", "measure": "माप",
  },
  gu: {
    "Ruler Bench": "માપપટ્ટી બેન્ચ",
    "A bench of things to measure. What kind of measure does each one need?": "માપવા માટેની વસ્તુઓની એક બેન્ચ. દરેક વસ્તુને કેવા પ્રકારનું માપ જોઈએ?",
    "Each thing got a unit of its own kind. Every reading started at the zero mark, and every unit was picked to suit the size.": "દરેક વસ્તુને તેના પ્રકારનો એકમ મળ્યો. દરેક માપ શૂન્યના નિશાનથી શરૂ થયું. દરેક એકમ કદ જોઈને પસંદ થયો.",
    "Free play. Pick any thing, slide it along the ruler, and read it from the zero mark.": "મુક્ત રમત. કોઈ પણ વસ્તુ પસંદ કરો, માપપટ્ટી પર સરકાવો અને શૂન્યના નિશાનથી વાંચો.",
    /* phase 1 */
    "A unit for every kind of measure": "દરેક પ્રકારના માપ માટે એકમ",
    "Is it a length, a weight or a capacity? Which units belong to it?": "આ લંબાઈ છે, વજન છે કે ક્ષમતા? કયા એકમ તેના છે?",
    "Which kind of measure can say that?": "કયા પ્રકારનું માપ એ કહી શકે?",
    "Take one thing at a time, and ask what you want to know about it.": "એક વારમાં એક વસ્તુ લો, અને પૂછો કે તેના વિશે શું જાણવું છે.",
    "Length, weight and capacity each have their own units, and a measure takes a unit of its own kind.": "લંબાઈ, વજન અને ક્ષમતા, ત્રણેયના પોતાના એકમ છે. દરેક માપ પોતાના પ્રકારનો એકમ લે છે.",
    "You learned: length, weight and capacity each take their own units.": "તમે શીખ્યા: લંબાઈ, વજન અને ક્ષમતાના પોતપોતાના એકમ હોય છે.",
    "A skipping rope, a school bag and a jug of milk. Put each in its bin, then give each a unit card.": "કૂદવાનું દોરડું, દફતર અને દૂધનો જગ. દરેકને તેના ડબ્બામાં મૂકો, પછી તેને એકમનું કાર્ડ આપો.",
    "Bin and unit card for each": "દરેક માટે ડબ્બો અને કાર્ડ",
    "Ask of each thing: how long is it, how heavy is it, or how much does it hold?": "દરેક વસ્તુને પૂછો. તે કેટલી લાંબી છે, કેટલી ભારે છે, કે તેમાં કેટલું સમાય છે?",
    "A bucket holds 12 blank of water. Which unit fills the blank: centimetres, kilograms or litres?": "ડોલમાં 12 પાણી સમાય છે, પણ એકમ રહી ગયો છે. કયો એકમ સાચો છે: સેન્ટિમીટર, કિલોગ્રામ કે લિટર?",
    "A bucket holds 12 ___ of water.": "ડોલમાં 12 ___ પાણી સમાય છે.",
    "Think of filling the bucket. Which kind of measure tells how much goes in?": "ડોલ ભરવાનું વિચારો. કયું માપ કહે છે કે તેમાં કેટલું સમાય?",
    "Now a bag of rice, a ribbon and a glass of juice. Sort them the same way.": "હવે ચોખાની થેલી, એક રિબન અને જ્યૂસનો ગ્લાસ. તેમને પણ એ જ રીતે ગોઠવો.",
    "Sort all three.": "ત્રણેયને ગોઠવો.",
    "Would you lift it, lay it out straight, or pour it? That picks its bin.": "તમે તેને ઉપાડશો, સીધું પાથરશો, કે રેડશો? તેનાથી તેનો ડબ્બો નક્કી થાય છે.",
    "Each thing needs a bin and a unit card first.": "પહેલાં દરેક વસ્તુને ડબ્બો અને એકમ કાર્ડ જોઈએ.",
    /* phase 2 */
    "Why everyone uses the same units": "બધા એક જ એકમ કેમ વાપરે છે",
    "Tap a hand to lay one handspan along the bench. Tap the tape to measure it too.": "બેન્ચ પર એક વેંત મૂકવા હાથ પર ટેપ કરો. તેને માપવા માટે ફીત પર પણ ટેપ કરો.",
    "Which hand fits more times along it?": "કયો હાથ તેના પર વધુ વાર સમાય છે?",
    "Pull out the tape. Does its reading care whose hand it is?": "ફીત ખેંચો. શું તેનું માપ હાથ કોનો છે તેના પર આધાર રાખે છે?",
    "Handspans change from person to person, so standard units such as the centimetre are used. They give everyone the same reading.": "વેંત દરેક વ્યક્તિની જુદી હોય છે. તેથી સેન્ટિમીટર જેવા પ્રમાણભૂત એકમ વપરાય છે. તેનાથી બધાને એક જ માપ મળે છે.",
    "You learned: handspans differ, so everyone uses standard units.": "તમે શીખ્યા: વેંત જુદી હોય છે, તેથી બધા પ્રમાણભૂત એકમ વાપરે છે.",
    "Two children measure the same bench with their hands. One counts 9 handspans and the other counts 12. Which count is right?": "બે બાળકો એક જ બેન્ચને પોતાના હાથથી માપે છે. એકને 9 વેંત મળે છે અને બીજાને 12. કઈ ગણતરી સાચી છે?",
    "Which count is right?": "કઈ ગણતરી સાચી છે?",
    "Did the bench change between the two counts?": "શું બે ગણતરી વચ્ચે બેન્ચ બદલાઈ ગઈ?",
    "A grown-up measures a table as 6 handspans, and a child measures it as 9. Why are the numbers different?": "એક વડીલને ટેબલ 6 વેંતનું મળે છે, અને એક બાળકને 9 વેંતનું. સંખ્યાઓ જુદી કેમ છે?",
    "Why do the counts differ?": "ગણતરી જુદી કેમ છે?",
    "Lay both hands along the table. Whose handspan is longer?": "બંને હાથ ટેબલ પર મૂકો. કોની વેંત લાંબી છે?",
    "Why is cloth sold by the metre and not by the handspan?": "કાપડ વેંતથી નહીં, મીટરથી કેમ વેચાય છે?",
    "Why sell cloth by the metre?": "કાપડ મીટરથી કેમ?",
    "Suppose the buyer has a bigger hand. Would their handspans give the same cloth?": "માનો કે ગ્રાહકનો હાથ મોટો છે. શું તેની વેંતથી એટલું જ કાપડ મળશે?",
    "just 9": "ફક્ત 9", "just 12": "ફક્ત 12", "both": "બંને",
    "hands differ": "હાથ જુદા છે", "table changed": "ટેબલ બદલાયું", "a miscount": "ખોટી ગણતરી",
    "same for all": "બધા માટે સરખો", "a longer unit": "મોટો એકમ", "quicker": "ઝડપી",
    /* phase 3 */
    "Measuring from the zero mark": "શૂન્યના નિશાનથી માપવું",
    "Look for the 0 on this ruler. There is none, so the first mark is the zero mark.": "આ માપપટ્ટી પર 0 શોધો. તે નથી, તેથી પહેલું નિશાન જ શૂન્યનું નિશાન છે.",
    "Which mark is the zero mark on this ruler?": "આ માપપટ્ટી પર શૂન્યનું નિશાન કયું છે?",
    "Put a finger on the zero mark and step one centimetre at a time.": "શૂન્યના નિશાન પર આંગળી મૂકો અને એક એક સેન્ટિમીટર આગળ વધો.",
    "Measure from the zero mark, the first mark on the ruler, even where no 0 is printed. Then the reading at the other end is the length.": "શૂન્યના નિશાનથી માપો, જે માપપટ્ટીનું પહેલું નિશાન છે. ત્યાં 0 છાપેલો ન હોય તો પણ. પછી બીજા છેડાનું માપ જ લંબાઈ છે.",
    "You learned: measure from the zero mark, the ruler's first mark.": "તમે શીખ્યા: શૂન્યના નિશાનથી, એટલે માપપટ્ટીના પહેલા નિશાનથી માપો.",
    "A crayon lies along the ruler, its left end on the first mark. How long is the crayon?": "એક ક્રેયોન માપપટ્ટી પર પડ્યો છે. તેનો ડાબો છેડો પહેલા નિશાન પર છે. ક્રેયોન કેટલો લાંબો છે?",
    "How long is the crayon, in cm?": "ક્રેયોનની લંબાઈ, સેમીમાં?",
    "Count the spaces between the marks, not the marks themselves.": "નિશાનો વચ્ચેની જગ્યા ગણો, નિશાન નહીં.",
    "Now a pencil, laid from the same first mark. How long is it?": "હવે એક પેન્સિલ, એ જ પહેલા નિશાનથી મૂકેલી. તે કેટલી લાંબી છે?",
    "How long is the pencil, in cm?": "પેન્સિલની લંબાઈ, સેમીમાં?",
    "The pencil starts at the zero mark. Which number sits under its tip?": "પેન્સિલ શૂન્યના નિશાનથી શરૂ થાય છે. તેની અણી નીચે કઈ સંખ્યા છે?",
    "A child lays one end of a key on the mark for 1. The other end reads 6. How long is the key?": "એક બાળક ચાવીનો એક છેડો 1ના નિશાન પર મૂકે છે. બીજો છેડો 6 પર છે. ચાવી કેટલી લાંબી છે?",
    "How long is the key, in cm?": "ચાવીની લંબાઈ, સેમીમાં?",
    "Where does the key's left end sit, and where is the zero mark?": "ચાવીનો ડાબો છેડો ક્યાં છે, અને શૂન્યનું નિશાન ક્યાં છે?",
    /* phase 4 */
    "Choosing a sensible unit": "યોગ્ય એકમ પસંદ કરવો",
    "Before you guess or measure, pick a unit that suits the size.": "અંદાજ લગાવતા કે માપતા પહેલાં, કદ પ્રમાણે એકમ પસંદ કરો.",
    "Picture the real thing beside you. How big is it?": "સાચી વસ્તુ તમારી પાસે છે એમ વિચારો. તે કેટલી મોટી છે?",
    "Look at the picture again, one part at a time.": "ચિત્ર ફરી જુઓ, એક એક ભાગ કરીને.",
    "Choose a unit that suits the size, guess, then measure. A good estimate is a close one, and the gap tells how close.": "કદ પ્રમાણે એકમ પસંદ કરો, અંદાજ લગાવો, પછી માપો. સારો અંદાજ નજીકનો હોય છે, અને તફાવત કહે છે કેટલો નજીક.",
    "You learned: pick a unit to suit the size; find how far a guess is out.": "તમે શીખ્યા: કદ જોઈને એકમ પસંદ કરો; અંદાજ કેટલો દૂર છે તે શોધો.",
    "Is a school bus about 10 centimetres, 10 metres or 10 kilometres long? Tap the unit, then press Enter.": "એક સ્કૂલ બસ કેટલી લાંબી હોય છે? આશરે 10 સેન્ટિમીટર, 10 મીટર કે 10 કિલોમીટર? એકમ પર ટેપ કરો, પછી એન્ટર દબાવો.",
    "A bus is about 10 ___ long.": "બસ આશરે 10 ___ લાંબી છે.",
    "How big is a bus: about a finger, a step or a journey?": "બસ કેટલી મોટી છે? એક આંગળી જેટલી, એક પગલા જેટલી, કે એક મુસાફરી જેટલી?",
    "And a cricket pitch: about 20 centimetres, 20 metres or 20 kilometres? Pick it the same way.": "અને એક ક્રિકેટ પીચ: આશરે 20 સેન્ટિમીટર, 20 મીટર કે 20 કિલોમીટર? તેને પણ એ જ રીતે પસંદ કરો.",
    "A pitch is about 20 ___ long.": "પીચ આશરે 20 ___ લાંબી છે.",
    "Walk the pitch in your head. Is it a few steps, or a long ride?": "મનમાં પીચ પર ચાલી જુઓ. શું તે થોડાં પગલાં છે, કે લાંબી મુસાફરી?",
    "A child estimates a notebook at 30 centimetres. Measured from the zero mark, it is 24 centimetres. By how much was the estimate out?": "એક બાળકનો અંદાજ છે કે નોટબુક 30 સેન્ટિમીટરની છે. શૂન્યના નિશાનથી માપતાં તે 24 સેન્ટિમીટરની નીકળી. અંદાજ કેટલો જુદો હતો?",
    "Out by how many cm?": "કેટલા સેમીનો ફરક?",
    "Count on from the measure to the estimate.": "માપથી અંદાજ સુધી આગળ ગણો.",
    "Pick one of the three units first.": "પહેલાં ત્રણમાંથી એક એકમ પસંદ કરો.",
    /* drawn on the working area, the slot and the summary */
    "in bins": "ડબ્બામાં", "{a} of {n}": "{n} માંથી {a}",
    "length": "લંબાઈ", "weight": "વજન", "capacity": "ક્ષમતા",
    "skipping rope": "કૂદવાનું દોરડું", "school bag": "દફતર", "jug of milk": "દૂધનો જગ", "bag of rice": "ચોખાની થેલી",
    "ribbon": "રિબન", "glass of juice": "જ્યૂસનો ગ્લાસ", "bucket": "ડોલ",
    "mm": "મિમી", "cm": "સેમી", "m": "મી", "km": "કિમી", "g": "ગ્રા", "kg": "કિગ્રા", "mL": "મિલિ", "L": "લિ",
    "bench": "બેન્ચ", "table": "ટેબલ", "cloth": "કાપડ", "tape": "ફીત",
    "big hand": "મોટો હાથ", "small hand": "નાનો હાથ", "grown-up": "વડીલ", "child": "બાળક", "seller": "વેપારી", "buyer": "ગ્રાહક",
    "both are right": "બંને સાચા છે", "the hands differ": "હાથ જુદા છે", "a metre never changes": "મીટર કદી બદલાતો નથી",
    "crayon": "ક્રેયોન", "eraser": "રબર", "key": "ચાવી", "pencil": "પેન્સિલ",
    "school bus": "સ્કૂલ બસ", "cricket pitch": "ક્રિકેટ પીચ", "about": "આશરે",
    "centimetres": "સેન્ટિમીટર", "metres": "મીટર", "kilometres": "કિલોમીટર",
    "metre stick": "મીટર પટ્ટી", "metre sticks": "મીટર પટ્ટી", "estimate": "અંદાજ", "measure": "માપ",
  },
};

/* One entry per phase = one mount. Item fields beyond the runtime's:
   sort/blank: things (ids in MODEL.things) · blank: amount
   whose/why/cloth: thing, bench (cm), hands (cm, row above then row below the bench), who (the hand keys),
     counts (the story's handspan counts), rows (the handspans the correction lays), note (its last words)
   read: obj, from, to (the ruler marks under the object's two ends)
   unit: thing, amount, realCm (the real size, for the oracle) · gap: estimate, measure
   near: the misconception's answer (nearMiss) */
const PHASES = [
  {
    n: 1,
    concept: "A unit for every kind of measure",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O1"],
    says: ["Is it a length, a weight or a capacity? Which units belong to it?"],
    ladder: ["Which kind of measure can say that?", "Take one thing at a time, and ask what you want to know about it."],
    closing: "Length, weight and capacity each have their own units, and a measure takes a unit of its own kind.",
    learned: "You learned: length, weight and capacity each take their own units.",
    traceback: "Each thing is drawn again in the bin of its own kind, wearing a unit card from that bin, while the child's own pieces stay where they were set.",
    items: [
      /* learn ML1: answer in the plan = The rope needs a length, in metres; the bag needs a weight, in kilograms; the milk needs a capacity, in litres or millilitres */
      { qid: "M1.S1.T2.C4:ML1", kind: "sort", things: ["rope", "bag", "milk"], pad: "enter", winMs: 2200,
        say: "A skipping rope, a school bag and a jug of milk. Put each in its bin, then give each a unit card.",
        ask: "Bin and unit card for each", answer: "rope=length:m|bag=weight:kg|milk=capacity:L",
        near: "rope=length:m|bag=weight:kg|milk=length:cm",
        miss: "Ask of each thing: how long is it, how heavy is it, or how much does it hold?" },
      /* practice 1: answer in the plan = L, because how much water a bucket holds is a capacity */
      { qid: "M1.S1.T2.C4:1", kind: "blank", things: ["bucket"], amount: 12, winMs: 2200,
        say: "A bucket holds 12 blank of water. Which unit fills the blank: centimetres, kilograms or litres?",
        ask: "A bucket holds 12 ___ of water.",
        choices: [{ id: "cm", label: "cm" }, { id: "kg", label: "kg" }, { id: "L", label: "L" }],
        answer: "L", near: "kg",
        miss: "Think of filling the bucket. Which kind of measure tells how much goes in?" },
      /* practice 2: answer in the plan = The rice is a weight, in kg; the ribbon is a length, in cm or m; the juice is a capacity, in mL */
      { qid: "M1.S1.T2.C4:2", kind: "sort", things: ["rice", "ribbon", "juice"], pad: "enter", winMs: 2200,
        say: "Now a bag of rice, a ribbon and a glass of juice. Sort them the same way.",
        ask: "Sort all three.", answer: "rice=weight:kg|ribbon=length:cm|juice=capacity:mL",
        near: "rice=weight:kg|ribbon=length:cm|juice=length:cm",
        miss: "Would you lift it, lay it out straight, or pour it? That picks its bin." },
    ],
  },
  {
    n: 2,
    concept: "Why everyone uses the same units",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Tap a hand to lay one handspan along the bench. Tap the tape to measure it too."],
    ladder: ["Which hand fits more times along it?", "Pull out the tape. Does its reading care whose hand it is?"],
    closing: "Handspans change from person to person, so standard units such as the centimetre are used. They give everyone the same reading.",
    learned: "You learned: handspans differ, so everyone uses standard units.",
    traceback: "Both hands lay their handspans along the one bench, each row ending at its end, and the tape reads the bench once in centimetres under both rows.",
    items: [
      /* learn ML2: answer in the plan = Both counted correctly with their own hands. Their hands are different sizes, so the counts differ, and a centimetre tape gives both of them the same length */
      { qid: "M1.S1.T2.C5:ML2", kind: "whose", thing: "bench", bench: 108, hands: [12, 9], who: ["big hand", "small hand"],
        counts: [9, 12], rows: [9, 12], note: "both are right", winMs: 2600,
        say: "Two children measure the same bench with their hands. One counts 9 handspans and the other counts 12. Which count is right?",
        ask: "Which count is right?",
        choices: [{ id: "only9", label: "just 9" }, { id: "only12", label: "just 12" }, { id: "bothright", label: "both" }],
        answer: "bothright", near: "only12",
        miss: "Did the bench change between the two counts?" },
      /* practice 3: answer in the plan = Their hands are different sizes, so the same table takes more of the child's handspans. A standard unit such as the centimetre gives one answer */
      { qid: "M1.S1.T2.C5:3", kind: "why", thing: "table", bench: 108, hands: [18, 12], who: ["grown-up", "child"],
        counts: [6, 9], rows: [6, 9], note: "the hands differ", winMs: 2600,
        say: "A grown-up measures a table as 6 handspans, and a child measures it as 9. Why are the numbers different?",
        ask: "Why do the counts differ?",
        choices: [{ id: "handsize", label: "hands differ" }, { id: "tablegrew", label: "table changed" }, { id: "miscount", label: "a miscount" }],
        answer: "handsize", near: "miscount",
        miss: "Lay both hands along the table. Whose handspan is longer?" },
      /* practice 4: answer in the plan = A metre is the same for everyone, so the seller and the buyer get the same length. Handspans change from person to person */
      { qid: "M1.S1.T2.C5:4", kind: "cloth", thing: "cloth", bench: 108, hands: [12, 18], who: ["seller", "buyer"],
        counts: [9, 9], rows: [9, 9], note: "a metre never changes", winMs: 2600,
        say: "Why is cloth sold by the metre and not by the handspan?",
        ask: "Why sell cloth by the metre?",
        choices: [{ id: "sameforall", label: "same for all" }, { id: "longerunit", label: "a longer unit" }, { id: "quicker", label: "quicker" }],
        answer: "sameforall", near: "longerunit",
        miss: "Suppose the buyer has a bigger hand. Would their handspans give the same cloth?" },
    ],
  },
  {
    n: 3,
    concept: "Measuring from the zero mark",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O2"],
    says: ["Look for the 0 on this ruler. There is none, so the first mark is the zero mark."],
    ladder: ["Which mark is the zero mark on this ruler?", "Put a finger on the zero mark and step one centimetre at a time."],
    closing: "Measure from the zero mark, the first mark on the ruler, even where no 0 is printed. Then the reading at the other end is the length.",
    learned: "You learned: measure from the zero mark, the ruler's first mark.",
    traceback: "A bracket under the object counts the centimetre spaces it covers, the object slides back to the zero mark, and its length is written in centimetres.",
    items: [
      /* learn ML3: answer in the plan = 7 cm */
      { qid: "M1.S1.T2.C6:ML3", kind: "read", obj: "crayon", from: 0, to: 7, answer: 7, winMs: 2200,
        say: "A crayon lies along the ruler, its left end on the first mark. How long is the crayon?",
        ask: "How long is the crayon, in cm?",
        miss: "Count the spaces between the marks, not the marks themselves." },
      /* practice 5: answer in the plan = 12 cm, because the first mark is the zero mark */
      { qid: "M1.S1.T2.C6:5", kind: "read", obj: "pencil", from: 0, to: 12, answer: 12, winMs: 2200,
        say: "Now a pencil, laid from the same first mark. How long is it?",
        ask: "How long is the pencil, in cm?",
        miss: "The pencil starts at the zero mark. Which number sits under its tip?" },
      /* practice 6: answer in the plan = 5 cm. From the mark for 1 to the mark for 6 is five centimetres; laid from the zero mark, its other end would sit at 5 */
      { qid: "M1.S1.T2.C6:6", kind: "read", obj: "key", from: 1, to: 6, answer: 5, winMs: 2200,
        say: "A child lays one end of a key on the mark for 1. The other end reads 6. How long is the key?",
        ask: "How long is the key, in cm?",
        miss: "Where does the key's left end sit, and where is the zero mark?" },
    ],
  },
  {
    n: 4,
    concept: "Choosing a sensible unit",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Before you guess or measure, pick a unit that suits the size."],
    ladder: ["Picture the real thing beside you. How big is it?", "Look at the picture again, one part at a time."],
    closing: "Choose a unit that suits the size, guess, then measure. A good estimate is a close one, and the gap tells how close.",
    learned: "You learned: pick a unit to suit the size; find how far a guess is out.",
    traceback: "A metre stick is laid along the thing and counted until it fits, or the gap between the estimate and the measure is counted centimetre by centimetre.",
    items: [
      /* learn ML4: answer in the plan = About 10 m */
      { qid: "M1.S1.T2.C7:ML4", kind: "unit", thing: "bus", amount: 10, realCm: 1100, pad: "enter", winMs: 2400,
        say: "Is a school bus about 10 centimetres, 10 metres or 10 kilometres long? Tap the unit, then press Enter.",
        ask: "A bus is about 10 ___ long.", answer: "m", near: "cm",
        miss: "How big is a bus: about a finger, a step or a journey?" },
      /* practice 7: answer in the plan = About 20 m. 20 cm is about the length of a new pencil, and 20 km is a long journey */
      { qid: "M1.S1.T2.C7:7", kind: "unit", thing: "pitch", amount: 20, realCm: 2012, pad: "enter", winMs: 2400,
        say: "And a cricket pitch: about 20 centimetres, 20 metres or 20 kilometres? Pick it the same way.",
        ask: "A pitch is about 20 ___ long.", answer: "m", near: "km",
        miss: "Walk the pitch in your head. Is it a few steps, or a long ride?" },
      /* practice 8: answer in the plan = By 6 cm; the estimate was 6 cm too long */
      { qid: "M1.S1.T2.C7:8", kind: "gap", thing: "notebook", estimate: 30, measure: 24, answer: 6, winMs: 2400,
        say: "A child estimates a notebook at 30 centimetres. Measured from the zero mark, it is 24 centimetres. By how much was the estimate out?",
        ask: "Out by how many cm?",
        miss: "Count on from the measure to the estimate." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL: any = {
  families: { length: ["mm", "cm", "m", "km"], weight: ["g", "kg"], capacity: ["mL", "L"] },
  bins: ["length", "weight", "capacity"],
  things: {
    rope: { name: "skipping rope", kind: "length", unit: "m" },
    bag: { name: "school bag", kind: "weight", unit: "kg" },
    milk: { name: "jug of milk", kind: "capacity", unit: "L" },
    rice: { name: "bag of rice", kind: "weight", unit: "kg" },
    ribbon: { name: "ribbon", kind: "length", unit: "cm" },
    juice: { name: "glass of juice", kind: "capacity", unit: "mL" },
    bucket: { name: "bucket", kind: "capacity", unit: "L" },
  },
  bench: { pxPerCm: 6 },
  ruler: { pxPerCm: 60, cm: 15, zeroPrinted: false },
  scale: { pxPerCm: 30, cm: 30 },
  picker: [{ id: "cm", name: "centimetres" }, { id: "m", name: "metres" }, { id: "km", name: "kilometres" }],
  freeThings: [{ id: "crayon", cm: 7 }, { id: "eraser", cm: 4 }, { id: "key", cm: 5 }, { id: "pencil", cm: 12 }],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* a sort is written "rope=length:m|bag=weight:kg|…": each thing, its bin and the unit card it wears */
const rbPlaces = (v: any) => {
  const out: any = {};
  String(v ?? "").split("|").forEach((s: string) => {
    const m = /^([a-z]+)=([a-z]*):([A-Za-z]*)$/.exec(s.trim());
    if (m) out[m[1]] = { bin: m[2] || null, unit: m[3] || null };
  });
  return out;
};
const rbCode = (things: string[], place: any) =>
  things.map((t: string) => t + "=" + ((place[t] && place[t].bin) || "") + ":" + ((place[t] && place[t].unit) || "")).join("|");

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "sort") {
    const pl = rbPlaces(v);
    return item.things.every((t: string) => pl[t] && pl[t].bin === MODEL.things[t].kind && MODEL.families[pl[t].bin].indexOf(pl[t].unit) >= 0);
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   a thing's kind from what you would do to it (lay it out, lift it, pour it), handspan counts times
   the handspan against the bench, spaces counted one by one, the unit whose size is nearest the thing */
const oracle = () => {
  const how: any = { rope: "lay", ribbon: "lay", bag: "lift", rice: "lift", milk: "pour", juice: "pour", bucket: "pour" };
  const fam: any = { lay: ["length", "mm cm m km"], lift: ["weight", "g kg"], pour: ["capacity", "mL L"] };
  const unitOk = (t: string, u: string) => fam[how[t]][1].split(" ").indexOf(u) >= 0;
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "sort") return it.things.every((t: string) => {
      const m = new RegExp("(^|\\|)" + t + "=(\\w+):(\\w+)").exec(it.answer);
      return !!m && m[2] === fam[how[t]][0] && unitOk(t, m[3]);
    });
    if (it.kind === "blank") return unitOk(it.things[0], it.answer) && it.choices.filter((c: any) => unitOk(it.things[0], c.id)).length === 1;
    if (it.kind === "whose") return it.counts[0] * it.hands[0] === it.bench && it.counts[1] * it.hands[1] === it.bench && it.answer === "bothright";
    if (it.kind === "why") return it.hands[0] !== it.hands[1] && it.counts[0] * it.hands[0] === it.counts[1] * it.hands[1] && it.answer === "handsize";
    if (it.kind === "cloth") return it.counts[0] * it.hands[0] !== it.counts[1] * it.hands[1] && it.answer === "sameforall";
    if (it.kind === "read") { let c = 0; for (let x = it.from; x < it.to; x++) c++; return c === it.answer; }
    if (it.kind === "unit") {
      const cmIn: any = { cm: 1, m: 100, km: 100000 };
      const off = (u: string) => Math.abs(Math.log((it.amount * cmIn[u]) / it.realCm));
      return Object.keys(cmIn).sort((a, b) => off(a) - off(b))[0] === it.answer;
    }
    if (it.kind === "gap") { let c = 0; for (let x = it.measure; x < it.estimate; x++) c++; return c === it.answer; }
    return false;
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print (a word answer is one of the
   choices the question names, so only numbers have forms to hide) */
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : []);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* what the slot shows for an answer: a sort's unit cards, a choice's own words */
const RB_SHOWN: any = {};
PHASES.forEach((p: any) => p.items.forEach((it: any) => (it.choices || []).forEach((c: any) => { RB_SHOWN[c.id] = c.label; })));
const format = (v: any, _j?: any, o?: any) => {
  const s = String(v ?? ""), t = (o && o.tx) || ((x: any) => x);
  /* a sort shows its unit cards, each symbol in the language in use (the runtime's TR on the whole string
     would miss a joined string); a choice shows its own words, which the runtime then translates */
  if (s.indexOf("=") >= 0) return s.split("|").map((x: string) => x.split(":")[1] || "").filter((x: string) => x).map((u: string) => t(u))
    .join(o && o.lang && o.lang !== "en" ? " " : "  ");
  return RB_SHOWN[s] || s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the picture ──────────────────────────────────────────────────────────────────────────── */

/* the chapter's colours: a count sky blue, a zero mark and a reading mark vermilion, a gap reddish
   purple, a larger unit (the metre stick) deep blue, every liquid pale blue */
const RB_SKY = "#56B4E9";
const RB_SKY_INK = shade(RB_SKY, 0.4);
const RB_MARK = CONTENT.pointer;
const RB_MARK_INK = shade(CONTENT.pointer, 0.25);
const RB_GAP = CONTENT.bead;
const RB_METRE = CONTENT.hundred;
const RB_LIQUID = "#C4E4F4";
const RB_WOOD = "#E6D5B2";
const RB_QUIET = "#A7AFB5";
/* phase 1: the tray (0-150) and three bins, each a label bar, a body for things and a row of cards */
const RB_BIN_W = 340, RB_BIN_GAP = 33, RB_BIN_TOP = 172, RB_LABEL_H = 72, RB_BODY_Y = 250, RB_CARD_Y = 448, RB_CARD_H = 74;
const rbBinX = (b: number) => b * (RB_BIN_W + RB_BIN_GAP);
const rbSlotX = (b: number, k: number) => rbBinX(b) + 64 + k * 106;
const rbTrayX = (k: number) => 181 + k * 362;
/* phase 2: 9 units a centimetre (6 for the cloth, whose longer strip must fit); the first hand's row above
   the bench, the second hand's row below it, then the tape */
const RB_BX = 60, RB_ROW_A = 110, RB_BENCH_Y = 114, RB_BENCH_H = 50, RB_ROW_B = 168, RB_TAPE_Y = 252, RB_TAPE_H = 44;
const rbBenchScale = (it: any) => (it.kind === "cloth" ? 6 : 9);
/* phase 3: the 15 cm ruler, 60 units a centimetre, its first mark at 93 */
const RB_CM3 = 60, RB_Z3 = 93, RB_RULER_Y = 250, RB_RULER_CM = 15;
/* phase 4: the 30 cm scale for the notebook, 30 units a centimetre */
const RB_CM4 = 34, RB_Z4 = 33;

/* an everyday thing, drawn plainly about 150 x 100 around (cx, cy); quiet = a pale outline only */
function rbThing(id: string, cx: number, cy: number, s: number, ink: string, quiet?: boolean) {
  const f = (c: string) => (quiet ? "#FFFFFF" : c);
  const liq = f(RB_LIQUID);
  let body: any = null;
  if (id === "rope") body = (
    <g>
      <path d="M -54 18 C -34 -44 -8 52 8 -4 S 38 -42 54 14" fill="none" stroke={ink} strokeWidth={12} strokeLinecap="round" />
      <path d="M -54 18 C -34 -44 -8 52 8 -4 S 38 -42 54 14" fill="none" stroke={f("#BCA98C")} strokeWidth={6} strokeLinecap="round" />
      <rect x={-68} y={12} width={24} height={32} rx={9} fill={f("#8F7D66")} stroke={ink} strokeWidth={3} />
      <rect x={44} y={8} width={24} height={32} rx={9} fill={f("#8F7D66")} stroke={ink} strokeWidth={3} />
    </g>
  );
  else if (id === "bag") body = (
    <g>
      <path d="M -18 -30 Q 0 -56 18 -30" fill="none" stroke={ink} strokeWidth={6} />
      <rect x={-40} y={-32} width={80} height={76} rx={16} fill={f("#B7C2CC")} stroke={ink} strokeWidth={3} />
      <path d="M -40 -4 Q 0 18 40 -4" fill="none" stroke={ink} strokeWidth={3} />
      <rect x={-16} y={14} width={32} height={20} rx={5} fill={f("#DCE2E7")} stroke={ink} strokeWidth={2} />
    </g>
  );
  else if (id === "milk") body = (
    <g>
      <path d="M -32 -36 L 28 -36 L 22 40 Q 0 46 -26 40 Z" fill="#FFFFFF" />
      <path d="M -29.6 -6 L 25.6 -6 L 22 40 Q 0 46 -26 40 Z" fill={liq} />
      <path d="M -32 -36 L 28 -36 L 22 40 Q 0 46 -26 40 Z" fill="none" stroke={ink} strokeWidth={3} />
      <path d="M -32 -36 L -44 -44" stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <path d="M 27 -26 Q 52 -22 48 4 Q 44 22 23 22" fill="none" stroke={ink} strokeWidth={5} />
    </g>
  );
  else if (id === "rice") body = (
    <g>
      <path d="M -34 -18 Q -46 40 -30 44 L 30 44 Q 46 40 34 -18 Q 16 -28 0 -24 Q -16 -28 -34 -18 Z" fill={f("#EFE6D0")} stroke={ink} strokeWidth={3} />
      <path d="M -14 -38 L 14 -38 L 9 -22 L -9 -22 Z" fill={f("#EFE6D0")} stroke={ink} strokeWidth={3} />
      <line x1={-13} y1={-25} x2={13} y2={-25} stroke={ink} strokeWidth={4} />
      {[[-12, 14], [4, 22], [16, 8], [-4, 32], [-18, 30], [20, 30]].map((q: number[], k: number) => <ellipse key={k} cx={q[0]} cy={q[1]} rx={3} ry={2} fill={ink} />)}
    </g>
  );
  else if (id === "ribbon") body = (
    <g>
      <path d="M -66 12 C -40 -22 -18 30 4 2 S 44 -24 66 6" fill="none" stroke={ink} strokeWidth={20} strokeLinecap="round" />
      <path d="M -66 12 C -40 -22 -18 30 4 2 S 44 -24 66 6" fill="none" stroke={f("#D8CDBE")} strokeWidth={13} strokeLinecap="round" />
    </g>
  );
  else if (id === "juice") body = (
    <g>
      <path d="M -24 -38 L 24 -38 L 18 40 L -18 40 Z" fill="#FFFFFF" />
      <path d="M -21.8 -10 L 21.8 -10 L 18 40 L -18 40 Z" fill={liq} />
      <path d="M -24 -38 L 24 -38 L 18 40 L -18 40 Z" fill="none" stroke={ink} strokeWidth={3} />
      <path d="M 6 -30 L 18 -52" stroke={ink} strokeWidth={4} strokeLinecap="round" />
    </g>
  );
  else body = (
    <g>
      <path d="M -38 -22 L 38 -22 L 29 42 L -29 42 Z" fill={f("#CDD3D9")} stroke={ink} strokeWidth={3} />
      <ellipse cx={0} cy={-22} rx={38} ry={9} fill={liq} stroke={ink} strokeWidth={3} />
      <path d="M -38 -22 Q 0 -72 38 -22" fill="none" stroke={ink} strokeWidth={3} />
    </g>
  );
  return <g transform={`translate(${cx},${cy}) scale(${s})`}>{body}</g>;
}

/* a unit card worn by a thing in its bin */
function rbTag(cx: number, y: number, u: string, C: any) {
  return (
    <g>
      <rect x={cx - 38} y={y} width={76} height={44} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <text x={cx} y={y + 32} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{u}</text>
    </g>
  );
}

/* an open hand whose span (thumb tip to little finger tip) is w, top-left at (x, y), RB_HAND_H * w tall:
   a silhouette with an outline (palm, thumb out to the left, three fingers up, little finger out to the right) */
const RB_HAND_H = 0.66;
function rbHand(x: number, y: number, w: number, line: string, fill: string, sw: number) {
  const h = w * RB_HAND_H;
  const parts = [[0.5, 0.64, 0.19, 0.3, 0], [0.2, 0.7, 0.2, 0.1, 22], [0.36, 0.3, 0.075, 0.28, -12],
    [0.5, 0.24, 0.078, 0.31, 0], [0.64, 0.3, 0.074, 0.27, 12], [0.82, 0.46, 0.17, 0.085, -28]];
  const el = (q: number[], k: string, edge: boolean) => {
    const cx = x + q[0] * w, cy = y + q[1] * h;
    return <ellipse key={k} cx={cx} cy={cy} rx={q[2] * w} ry={q[3] * h} transform={`rotate(${q[4]} ${cx} ${cy})`}
      fill={edge ? line : fill} stroke={edge ? line : "none"} strokeWidth={edge ? sw * 2 : 0} />;
  };
  return <g>{parts.map((q, k) => el(q, "e" + k, true))}{parts.map((q, k) => el(q, "f" + k, false))}</g>;
}

/* the things laid on the ruler: the left end at x, the right end at x + w, inside a 90-tall band from y */
function rbObj(id: string, x: number, y: number, w: number, ink: string) {
  if (id === "crayon") return (
    <g>
      <rect x={x} y={y + 22} width={w - 54} height={46} rx={10} fill="#E7D6B3" stroke={ink} strokeWidth={3} />
      <rect x={x + 26} y={y + 22} width={Math.max(10, w - 140)} height={46} fill="#D6BF95" stroke={ink} strokeWidth={2} />
      <path d={`M ${x + w - 56} ${y + 22} L ${x + w} ${y + 45} L ${x + w - 56} ${y + 68} Z`} fill="#C8AE82" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
    </g>
  );
  if (id === "pencil") return (
    <g>
      <rect x={x} y={y + 24} width={36} height={42} rx={8} fill="#D9D3CC" stroke={ink} strokeWidth={3} />
      <rect x={x + 34} y={y + 24} width={28} height={42} fill="#BCC3CA" stroke={ink} strokeWidth={3} />
      <rect x={x + 60} y={y + 24} width={w - 130} height={42} fill="#EAD9AE" stroke={ink} strokeWidth={3} />
      <path d={`M ${x + w - 70} ${y + 24} L ${x + w - 14} ${y + 41} L ${x + w - 14} ${y + 49} L ${x + w - 70} ${y + 66} Z`} fill="#E3CBA2" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <path d={`M ${x + w - 14} ${y + 41} L ${x + w} ${y + 45} L ${x + w - 14} ${y + 49} Z`} fill={ink} />
    </g>
  );
  if (id === "key") return (
    <g>
      <rect x={x + 58} y={y + 36} width={w - 58} height={18} rx={4} fill="#C6CCD2" stroke={ink} strokeWidth={3} />
      <path d={`M ${x + w - 16} ${y + 54} v 14 h -14 v -8 h -14 v 10 h -14 v -16`} fill="#C6CCD2" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={x + 34} cy={y + 45} r={32} fill="#C6CCD2" stroke={ink} strokeWidth={3} />
      <circle cx={x + 26} cy={y + 45} r={9} fill="#FFFFFF" stroke={ink} strokeWidth={2} />
    </g>
  );
  return (
    <g>
      <rect x={x} y={y + 24} width={w} height={44} rx={9} fill="#E6E2DB" stroke={ink} strokeWidth={3} />
      <rect x={x + w * 0.5} y={y + 24} width={w * 0.5} height={44} rx={9} fill="#C8CFD6" stroke={ink} strokeWidth={3} />
    </g>
  );
}

/* the coiled tape, on its key */
function rbCoil(C: any) {
  return (
    <g>
      <rect x={20} y={-14} width={46} height={16} rx={3} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <circle cx={0} cy={-14} r={32} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
      <circle cx={0} cy={-14} r={21} fill="none" stroke={C.ink} strokeWidth={1.5} />
      <circle cx={0} cy={-14} r={10} fill="none" stroke={C.ink} strokeWidth={1.5} />
    </g>
  );
}

/* phase 4's things: a school bus 360 long (10 m) and a cricket pitch 530 long (20 m) */
function rbBus(C: any) {
  return (
    <g>
      <rect x={40} y={34} width={360} height={116} rx={18} fill="#E4DCC6" stroke={C.ink} strokeWidth={3} />
      {[0, 1, 2, 3, 4].map((k: number) => <rect key={k} x={60 + k * 58} y={52} width={44} height={40} rx={6} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />)}
      <rect x={354} y={52} width={30} height={78} rx={5} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      {[112, 326].map((x: number) => (
        <g key={x}>
          <circle cx={x} cy={150} r={22} fill="#5A5A5A" stroke={C.ink} strokeWidth={3} />
          <circle cx={x} cy={150} r={8} fill="#D0D0D0" />
        </g>
      ))}
    </g>
  );
}
function rbPitch(C: any) {
  return (
    <g>
      <rect x={30} y={78} width={530} height={64} rx={6} fill="#E7DCBF" stroke={C.ink} strokeWidth={3} />
      <line x1={72} y1={78} x2={72} y2={142} stroke={C.ink} strokeWidth={1.5} />
      <line x1={518} y1={78} x2={518} y2={142} stroke={C.ink} strokeWidth={1.5} />
      {[40, 48, 56, 534, 542, 550].map((x: number) => <line key={x} x1={x} y1={64} x2={x} y2={100} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />)}
    </g>
  );
}
/* the unit picker's pictures: a fingertip across a centimetre, one big step for a metre, a road between two towns */
function rbUnitPic(id: string, cx: number, C: any, tx: any = (v: any) => v) {
  /* label is "1 " and a unit symbol; the symbol goes through the tool's TR (सेमी, સેમી…) */
  const bracket = (x0: number, x1: number, label: string) => (
    <g>
      <path d={`M ${x0} ${398} v 10 H ${x1} v -10`} fill="none" stroke={C.ink} strokeWidth={2.5} />
      <text x={(x0 + x1) / 2} y={442} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{"1 " + tx(label.slice(2))}</text>
    </g>
  );
  if (id === "cm") return (
    <g>
      <rect x={cx - 26} y={240} width={52} height={118} rx={26} fill="#EFE2D0" stroke={C.ink} strokeWidth={3} />
      <rect x={cx - 15} y={248} width={30} height={30} rx={11} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <path d={`M ${cx - 12} 306 Q ${cx} 312 ${cx + 12} 306 M ${cx - 12} 314 Q ${cx} 320 ${cx + 12} 314`} fill="none" stroke={C.ink} strokeWidth={1.5} />
      <rect x={cx - 110} y={360} width={220} height={28} fill="#FBF5E6" stroke={C.ink} strokeWidth={2} />
      {[-78, -26, 26, 78].map((d: number) => <line key={d} x1={cx + d} y1={360} x2={cx + d} y2={374} stroke={C.ink} strokeWidth={2} />)}
      {bracket(cx - 26, cx + 26, "1 cm")}
    </g>
  );
  if (id === "m") return (
    <g>
      <path d={`M ${cx - 96} 300 Q ${cx} 226 ${cx + 96} 276`} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="8 7" />
      <ellipse cx={cx - 96} cy={338} rx={20} ry={36} fill="#E6DDCF" stroke={C.ink} strokeWidth={3} />
      <ellipse cx={cx + 96} cy={320} rx={20} ry={36} fill="#E6DDCF" stroke={C.ink} strokeWidth={3} />
      {bracket(cx - 96, cx + 96, "1 m")}
    </g>
  );
  const town = (x: number) => (
    <g>
      {[0, 30].map((d: number) => (
        <g key={d}>
          <rect x={x + d - 13} y={318 - d / 3} width={26} height={30 + d / 3} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
          <path d={`M ${x + d - 17} ${318 - d / 3} L ${x + d} ${302 - d / 3} L ${x + d + 17} ${318 - d / 3} Z`} fill="#D9CDBB" stroke={C.ink} strokeWidth={2} />
        </g>
      ))}
    </g>
  );
  return (
    <g>
      {town(cx - 140)}
      {town(cx + 96)}
      <rect x={cx - 120} y={352} width={240} height={24} rx={4} fill="#B9BDC1" stroke={C.ink} strokeWidth={2} />
      <line x1={cx - 110} y1={364} x2={cx + 110} y2={364} stroke="#FFFFFF" strokeWidth={3} strokeDasharray="14 10" />
      {bracket(cx - 110, cx + 110, "1 km")}
    </g>
  );
}

/* the working area: 1086 x 528, origin at its top-left. Drawing helpers are called, never mounted. */
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const it: any = free ? { kind: "free", things: [] } : item || { kind: "none", things: [] };
  const K = it.kind;
  /* the working area's own state belongs to one question (or to free play) */
  const ik = free ? "free" : n + ":" + index;
  const ikRef = useRef(ik);
  ikRef.current = ik;
  const fresh = (): any => ({ place: {}, sel: null, flash: null, demo: null, a: 0, b: 0, tape: false,
    left: K === "read" ? it.from : 1, touched: false, pick: null, obj: "crayon" });
  const [raw, setRaw] = useState<any>(() => ({ ik, ...fresh() }));
  const st: any = raw.ik === ik ? raw : { ik, ...fresh() };
  const stRef = useRef<any>(st);
  stRef.current = st;
  const put = (o: any) => {
    if (ikRef.current !== ik) return;
    const next = { ...stRef.current, ...o };
    stRef.current = next;
    setRaw(next);
  };
  const won = stage === "win" || stage === "idle";
  const acting = (stage === "ask" || stage === "teach" || free) && !tl.busy;
  /* the correction's layer (st.demo) or, once the answer is given, the same picture finished */
  const D: any = st.demo || (won ? { k: 999, done: true, tape: true, ring: true, list: K === "blank" ? ["bucket"] : [] } : null);
  const grab = useRef<any>(null);

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!acting) { grab.current = null; return; }
    if (pay.t === "thing") dropThing(pay.id, p, moved);
    else if (pay.t === "card") dropCard(pay, p, moved);
    else if (pay.t === "obj") dropObj(p, moved);
  });
  const dd = drag.drag;
  if (dd && dd.payload && dd.payload.t === "obj") { if (!grab.current) grab.current = { x: dd.x, left: st.left }; }
  else if (!dd) grab.current = null;

  /* ── phase 1: sort into bins, then a card from that bin ── */
  const binAt = (p: any) => {
    if (!(p.y >= RB_BIN_TOP - 12 && p.y <= 560)) return -1;
    for (let b = 0; b < 3; b++) if (p.x >= rbBinX(b) - 16 && p.x <= rbBinX(b) + RB_BIN_W + 16) return b;
    return -1;
  };
  const placeThing = (id: string, bin: string | null) => {
    const s = stRef.current, old = s.place[id];
    put({ place: { ...s.place, [id]: bin ? { bin, unit: old && old.bin === bin ? old.unit : null } : null }, sel: null, demo: null });
    api.sfx.tick();
  };
  /* a card sticks only to a thing sorted into the card's own bin; else it goes home and the thing's bin lights */
  const giveCard = (card: any, id: string) => {
    const s = stRef.current, pl = s.place[id];
    if (!pl) { put({ sel: null }); return; }
    if (pl.bin !== card.bin) { put({ sel: null, flash: pl.bin, demo: null }); return; }
    put({ place: { ...s.place, [id]: { bin: pl.bin, unit: card.u } }, sel: null, demo: null });
    api.sfx.tick();
  };
  const thingAt = (p: any) => {
    const s = stRef.current;
    return it.things.find((t: string, k: number) => {
      const pl = s.place[t];
      if (!pl) return false;
      const x0 = rbSlotX(MODEL.bins.indexOf(pl.bin), k) - 53;
      return p.x >= x0 && p.x <= x0 + 106 && p.y >= RB_BODY_Y - 10 && p.y <= RB_CARD_Y;
    });
  };
  const dropThing = (id: string, p: any, moved: boolean) => {
    const s = stRef.current;
    if (!moved) {
      if (s.sel && s.sel.t === "card" && s.place[id]) { giveCard(s.sel, id); return; }
      put({ sel: s.sel && s.sel.t === "thing" && s.sel.id === id ? null : { t: "thing", id }, demo: null });
      return;
    }
    const b = binAt(p);
    if (b >= 0) placeThing(id, MODEL.bins[b]);
    else if (p.y < RB_BIN_TOP - 12) placeThing(id, null);
  };
  const dropCard = (card: any, p: any, moved: boolean) => {
    const s = stRef.current;
    if (!moved) { put({ sel: s.sel && s.sel.t === "card" && s.sel.u === card.u ? null : { t: "card", u: card.u, bin: card.bin }, demo: null }); return; }
    const id = thingAt(p);
    if (id) giveCard(card, id); else put({ sel: null });
  };
  const pressBin = (b: number) => {
    if (!acting) return;
    const s = stRef.current;
    if (s.sel && s.sel.t === "thing") placeThing(s.sel.id, MODEL.bins[b]);
  };
  const sortDone = () => {
    const s = stRef.current;
    return it.things.every((t: string) => s.place[t] && s.place[t].unit);
  };
  /* a piece's Enter is a tap, except once the sort is whole: then Enter answers, even with a piece picked up
     (Space still picks one up to fix a mistake; no keyboard trap) */
  const pkeys = (pay: any) => {
    const k = drag.keys(pay);
    return { onKeyDown: (e: any) => { if (e.key === "Enter" && K === "sort" && sortDone()) return; k.onKeyDown(e); } };
  };

  /* ── phase 2: lay handspans, pull the tape ── */
  const stamp = (r: number) => {
    if (!acting) return;
    const s = stRef.current, max = Math.floor(it.bench / it.hands[r] + 1e-9), cur = r === 0 ? s.a : s.b;
    if (cur >= max) return;
    put(r === 0 ? { a: cur + 1, demo: null } : { b: cur + 1, demo: null });
    api.sfx.tick();
  };
  const pullTape = () => { if (!acting) return; put({ tape: !stRef.current.tape, demo: null }); api.sfx.tick(); };

  /* ── phase 3 and free play: slide the object a centimetre at a time; a tap sends it to the zero mark and back ── */
  const lenOf = (id: string) => (MODEL.freeThings.find((f: any) => f.id === id) || MODEL.freeThings[0]).cm;
  const dropObj = (p: any, moved: boolean) => {
    const s = stRef.current, g = grab.current, len = free ? lenOf(s.obj) : it.to - it.from;
    grab.current = null;
    let nl: number;
    if (!moved || !g || !isFinite(p.x)) nl = s.left === 0 ? (K === "read" && it.from > 0 ? it.from : 1) : 0;
    else nl = Math.max(0, Math.min(RB_RULER_CM - len, Math.round(g.left + (p.x - g.x) / RB_CM3)));
    if (nl !== s.left) api.sfx.tick();
    put({ left: nl, touched: true });
  };
  /* the keyboard slides it too: an arrow moves one centimetre, Home and End go to the two ends */
  const objKeys = (e: any) => {
    const step: any = { ArrowLeft: -1, ArrowRight: 1, Home: -99, End: 99 };
    if (step[e.key] === undefined) { drag.keys({ t: "obj" }).onKeyDown(e); return; }
    e.preventDefault(); e.stopPropagation();
    if (!acting) return;
    const s = stRef.current, len = free ? lenOf(s.obj) : it.to - it.from;
    const nl = Math.max(0, Math.min(RB_RULER_CM - len, s.left + step[e.key]));
    if (nl !== s.left) api.sfx.tick();
    put({ left: nl, touched: true });
  };
  const pickObj = (id: string) => {
    put({ obj: id, left: Math.min(stRef.current.left, RB_RULER_CM - lenOf(id)) });
    api.sfx.tick();
  };

  /* ── phase 4: pick a unit (Enter answers) ── */
  const picking = stage === "ask" && !tl.busy;
  const pickUnit = (id: string) => {
    if (!picking) return;
    put({ pick: id, demo: null });
    api.setTyped(id);
    api.sfx.tick();
  };
  /* Escape empties the slot; the picked card lets go with it, so Enter never answers a pick the slot no longer shows */
  const typedWas = useRef(typed);
  useEffect(() => {
    const was = typedWas.current;
    typedWas.current = typed;
    if (K === "unit" && was && !typed && stRef.current.pick) put({ pick: null });
  }, [typed]);

  /* the agent sets a working-area answer as a child would */
  HOOK.set = (v: any) => {
    if (K === "sort") {
      const pl = rbPlaces(v);
      if (!it.things.every((t: string) => pl[t])) return false;
      put({ place: pl, sel: null, demo: null });
      return true;
    }
    if (K === "unit") {
      const u = String(v ?? "").trim();
      if (!MODEL.picker.some((c: any) => c.id === u)) return false;
      put({ pick: u, demo: null });
      api.setTyped(u);
      return true;
    }
    return false;
  };

  /* Enter answers what the child has made on the working area, never the same work twice */
  if (!free && stage === "ask" && K === "sort") api.onEnter(() => {
    const s = stRef.current, code = rbCode(it.things, s.place);
    if (!it.things.every((t: string) => s.place[t] && s.place[t].unit)) { api.say("Each thing needs a bin and a unit card first."); return; }
    if (wrong && String(wrong.value) === code) return;
    if (s.sel) put({ sel: null });
    api.submit(code);
  });
  else if (!free && stage === "ask" && K === "unit") api.onEnter(() => {
    const s = stRef.current;
    if (!s.pick) { api.say("Pick one of the three units first."); return; }
    if (wrong && String(wrong.value) === s.pick) return;
    api.submit(s.pick);
  });
  else api.onEnter(null);

  /* the traceback: redraw the maths in steps, ending on the whole right answer; nothing marked */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const s0 = stRef.current;
    const set = (d: any) => put({ demo: d });
    const tick = () => api.sfx.tick();
    const steps: any[] = [];
    if (K === "blank") {
      /* the three units are held up one at a time against the water; only the capacity one can say it */
      steps.push([300, () => set({ k: 0 })]);
      for (let j = 1; j <= it.choices.length; j++) steps.push([850, () => { set({ k: j }); tick(); }]);
      steps.push([0, () => set({ k: it.choices.length, done: true })]);
    } else if (K === "sort") {
      const list = it.things.filter((t: string) => { const pl = s0.place[t]; return !(pl && pl.bin === MODEL.things[t].kind && pl.unit); });
      const litOf = (j: number) => (list[j] ? MODEL.things[list[j]].kind : null);
      steps.push([800, () => put({ sel: null, demo: { list, k: 0, lit: litOf(0) } })]);
      list.forEach((_t: string, j: number) => steps.push([900, () => { set({ list, k: j + 1, lit: litOf(j + 1) || litOf(j) }); tick(); }]));
      steps.push([0, () => set({ list, k: list.length, done: true })]);
    } else if (K === "whose" || K === "why" || K === "cloth") {
      const mx = Math.max(it.rows[0], it.rows[1]);
      steps.push([300, () => set({ k: 0 })]);
      for (let k = 1; k <= mx; k++) steps.push([220, () => { set({ k }); tick(); }]);
      steps.push([800, () => set({ k: mx, tape: true })]);
      steps.push([0, () => set({ k: mx, tape: true, done: true })]);
    } else if (K === "read") {
      const len = it.to - it.from;
      steps.push([400, () => set({ k: 0 })]);
      for (let j = 1; j <= len; j++) steps.push([260, () => { set({ k: j }); tick(); }]);
      if (s0.left !== 0) steps.push([700, () => put({ left: 0, demo: { k: len } })]);
      steps.push([0, () => set({ k: len, done: true })]);
    } else if (K === "unit") {
      const gap = it.amount > 12 ? 120 : 220;
      steps.push([500, () => set({ k: 0, ring: true })]);
      for (let j = 1; j <= it.amount; j++) steps.push([gap, () => { set({ k: j, ring: true }); if (it.amount <= 12 || j % 5 === 0) tick(); }]);
      steps.push([0, () => set({ k: it.amount, ring: true, done: true })]);
    } else if (K === "gap") {
      const g = it.estimate - it.measure;
      steps.push([400, () => set({ k: 0 })]);
      for (let j = 1; j <= g; j++) steps.push([300, () => { set({ k: j }); tick(); }]);
      steps.push([0, () => set({ k: g, done: true })]);
    }
    if (!steps.length) return;
    api.lock(true);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* a card that will not stick lights the thing's own bin for a moment */
  useEffect(() => {
    if (!st.flash) return;
    const t = setTimeout(() => put({ flash: null }), 1300);
    return () => clearTimeout(t);
  }, [st.flash, ik]);

  /* what the host and the agent read back (toolApi.getState); never the reading the question asks for */
  const bins: any = {}, units: any = {};
  (it.things || []).forEach((t: string) => { const pl = st.place[t]; bins[t] = pl ? pl.bin : null; units[t] = pl ? pl.unit : null; });
  api.share({ bins, unitsChosen: units, spanCount: [st.a, st.b], tapeReading: st.tape && it.bench ? it.bench : null,
    objectStart: K === "read" || free ? st.left : null, unit: st.pick });

  /* ── drawing ─────────────────────────────────────────────────────────────────── */
  const sorterView = () => {
    const things: string[] = it.things;
    const dg = dd && dd.moved ? dd : null;
    const litBin = st.flash || (D && !D.done && D.lit) || null;
    const list: string[] = (D && D.list) || [];
    const ghosts = D ? list.slice(0, Math.min(D.k, list.length)) : [];
    /* the count climbs with the correction too: a thing the correction lays in its bin is in a bin */
    const inBins = things.filter((t: string) => st.place[t] || ghosts.indexOf(t) >= 0).length;
    /* a thing in a bin sits on its own tile, its unit card on the tile under it */
    const tile = (cx: number, fill: string, edge: string, sw: number) => (
      <rect x={cx - 46} y={RB_BODY_Y + 6} width={92} height={146} rx={14} fill={fill} stroke={edge} strokeWidth={sw} />
    );
    const cx0 = (x: number) => Math.min(Math.max(x, 76), 1010), cy0 = (y: number) => Math.min(Math.max(y, 56), 470);
    return (
      <g>
        {K === "sort" && (
          <g data-zone="runs">
            <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
            <text x={24} y={-45} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("in bins")}</text>
            <text x={306} y={-43} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("{a} of {n}").replace("{a}", String(inBins)).replace("{n}", String(things.length))}</text>
          </g>
        )}
        <rect x={1} y={1} width={1084} height={148} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
        {MODEL.bins.map((bin: string, b: number) => {
          const lit = litBin === bin;
          return (
            <g key={bin}>
              <rect x={rbBinX(b) + 1} y={RB_BIN_TOP} width={RB_BIN_W - 2} height={354} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              <rect x={rbBinX(b) + 1} y={RB_BIN_TOP} width={RB_BIN_W - 2} height={RB_LABEL_H} rx={RAD.panel} fill={lit ? tint(C.accent, 0.72) : tint(C.panel, 0.55)}
                stroke={lit ? C.accent : C.rule} strokeWidth={lit ? 4 : 2} />
              <text x={rbBinX(b) + RB_BIN_W / 2} y={RB_BIN_TOP + 47} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(bin)}</text>
              <rect x={rbBinX(b) + 5} y={RB_CARD_Y - 5} width={RB_BIN_W - 10} height={RB_CARD_H + 10} rx={14} fill={tint(C.panel, 0.7)} />
            </g>
          );
        })}
        {/* the keyboard meets the things first, then the bins, then the cards */}
        {things.map((t: string, k: number) => {
          const pl = st.place[t], b = pl ? MODEL.bins.indexOf(pl.bin) : -1;
          const cx = b >= 0 ? rbSlotX(b, k) : rbTrayX(k), cy = b >= 0 ? RB_BODY_Y + 54 : 58;
          const box = b >= 0 ? { x: cx - 52, y: RB_BODY_Y + 2, w: 104, h: 184 } : { x: cx - 120, y: 6, w: 240, h: 140 };
          const lifted = dg && dg.payload.t === "thing" && dg.payload.id === t;
          const chosen = st.sel && st.sel.t === "thing" && st.sel.id === t;
          const misplaced = !!(st.demo && list.indexOf(t) >= 0 && pl && pl.bin !== MODEL.things[t].kind);
          const pay = { t: "thing", id: t };
          return (
            <g key={"thing-" + t} {...control("thing-" + t, MODEL.things[t].name)} {...drag.bind(pay)} {...pkeys(pay)}>
              <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={16} fill="transparent" stroke={chosen ? C.accent : "none"} strokeWidth={4} />
              {b >= 0 && !lifted && tile(cx, tint(C.panel, 0.6), C.rule, 2)}
              {lifted
                ? <rect x={box.x + 12} y={box.y + 12} width={box.w - 24} height={box.h - 24} rx={14} fill="none" stroke={RB_QUIET} strokeWidth={2} strokeDasharray="8 8" />
                : rbThing(t, cx, cy, b >= 0 ? 0.62 : 1.1, misplaced ? RB_QUIET : C.ink, misplaced)}
              {b < 0 && !lifted && <text x={cx} y={138} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(MODEL.things[t].name)}</text>}
              {b >= 0 && pl.unit && !lifted && rbTag(cx, RB_BODY_Y + 100, tx(pl.unit), C)}
            </g>
          );
        })}
        {MODEL.bins.map((bin: string, b: number) => (
          <Hit key={"hit-" + bin} id={"bin-" + bin} x={rbBinX(b)} y={RB_BIN_TOP} w={RB_BIN_W} h={RB_LABEL_H} onPress={() => pressBin(b)} label={"the " + bin + " bin"} />
        ))}
        {MODEL.bins.map((bin: string, b: number) => {
          const us: string[] = MODEL.families[bin], m = us.length, w = (RB_BIN_W - 12 - (m - 1) * 12) / m;
          return us.map((u: string, j: number) => {
            const x = rbBinX(b) + 6 + j * (w + 12), pay = { t: "card", u, bin };
            const chosen = st.sel && st.sel.t === "card" && st.sel.u === u;
            const lifted = dg && dg.payload.t === "card" && dg.payload.u === u;
            const hot = chosen || litBin === bin;
            const face = (
              <g>
                <rect x={x} y={RB_CARD_Y} width={w} height={RB_CARD_H} rx={12} fill={chosen ? tint(C.accent, 0.72) : "#FFFFFF"}
                  stroke={hot ? C.accent : C.ink} strokeWidth={hot ? 4 : 2} strokeDasharray={lifted ? "8 6" : undefined} />
                {/* the length bin's four cards are 73 wide: its Devanagari and Gujarati symbols (मिमी, કિમી) take the smaller size */}
                <text x={x + w / 2} y={RB_CARD_Y + 47} textAnchor="middle" fontSize={lang !== "en" && m === 4 ? T.micro : T.label} fontWeight={700} fill={C.ink}>{tx(u)}</text>
              </g>
            );
            return K === "sort" ? (
              <g key={"card-" + u} {...control("card-" + u, u + " card")} {...drag.bind(pay)} {...pkeys(pay)}>{face}</g>
            ) : <g key={"card-" + u}>{face}</g>;
          });
        })}
        <g pointerEvents="none">
          {ghosts.map((t: string) => {
            const k = things.indexOf(t), cx = rbSlotX(MODEL.bins.indexOf(MODEL.things[t].kind), k);
            return (
              <g key={"ghost-" + t}>
                {tile(cx, tint(C.accent, 0.86), C.accent, 3)}
                {rbThing(t, cx, RB_BODY_Y + 54, 0.62, C.ink)}
                {rbTag(cx, RB_BODY_Y + 100, tx(MODEL.things[t].unit), C)}
              </g>
            );
          })}
        </g>
        {dg && (dg.payload.t === "thing" || dg.payload.t === "card") && (
          <g pointerEvents="none" filter="url(#fLift)">
            {dg.payload.t === "thing" ? rbThing(dg.payload.id, cx0(dg.x), cy0(dg.y), 0.8, C.ink) : (
              <g>
                <rect x={cx0(dg.x) - 40} y={cy0(dg.y) - 37} width={80} height={74} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
                <text x={cx0(dg.x)} y={cy0(dg.y) + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(dg.payload.u)}</text>
              </g>
            )}
          </g>
        )}
        {K === "sort" && inBins === 0 && !st.sel && (stage === "ask" || stage === "teach") && <Invite x={rbTrayX(0)} y={58} r={52} C={C} />}
      </g>
    );
  };

  /* phase 1's word-key question: the bucket and the blank alone (no bins: they would answer it). The
     correction holds the three units up one at a time, each with its kind, and the capacity one lights */
  const blankView = () => {
    const kindOf = (u: string) => MODEL.bins.find((b: string) => MODEL.families[b].indexOf(u) >= 0);
    const shown = D ? Math.min(D.k, it.choices.length) : 0;
    return (
      <g>
        {rbThing(it.things[0], 250, 196, 2, C.ink)}
        <text x={250} y={326} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(MODEL.things[it.things[0]].name)}</text>
        <text x={450} y={230} fontSize={T.display} fontWeight={700} fill={C.ink}>{it.amount}</text>
        <rect x={560} y={150} width={160} height={100} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} strokeDasharray="12 9" />
        <g pointerEvents="none">
          {D && D.done && <text x={640} y={226} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{tx(it.answer)}</text>}
          {it.choices.slice(0, shown).map((c: any, j: number) => {
            const x = 120 + j * 300, lit = kindOf(c.id) === MODEL.things[it.things[0]].kind;
            return (
              <g key={"unit-" + c.id}>
                <rect x={x} y={364} width={240} height={150} rx={RAD.card} fill={lit ? tint(C.accent, 0.75) : "#FFFFFF"} stroke={lit ? C.accent : C.rule} strokeWidth={lit ? 5 : 2} />
                <text x={x + 120} y={434} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{tx(c.label)}</text>
                <text x={x + 120} y={490} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(kindOf(c.id) || "")}</text>
              </g>
            );
          })}
        </g>
      </g>
    );
  };

  const benchView = () => {
    const cm = rbBenchScale(it), x0 = RB_BX, L = it.bench * cm;
    const wA = it.hands[0] * cm, wB = it.hands[1] * cm;
    const dk = D ? D.k : 0;
    const nA = Math.max(st.a, D ? Math.min(dk, it.rows[0]) : 0);
    const nB = Math.max(st.b, D ? Math.min(dk, it.rows[1]) : 0);
    const demoTape = !!(D && D.tape);
    const tapeLen = demoTape && K === "cloth" ? it.hands[1] * it.rows[1] : it.bench;
    const readings = demoTape && K === "cloth" ? [it.bench, tapeLen] : [it.bench];
    const row = (count: number, w: number, top: number, key: string) =>
      Array.from({ length: count }).map((_: any, k: number) => <g key={key + k}>{rbHand(x0 + k * w, top, w, RB_SKY, "#EEF7FC", 2.5)}</g>);
    return (
      <g>
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
          <line x1={165} y1={-84} x2={165} y2={-28} stroke={C.rule} strokeWidth={2} />
          {[0, 1].map((r: number) => {
            /* the count is what the rows show, the correction's handspans included */
            const c = r === 0 ? nA : nB, w = it.hands[r] * 4;
            return (
              <g key={"count" + r}>
                {rbHand(20 + r * 165, -56 - (w * RB_HAND_H) / 2, w, RB_SKY, "#EEF7FC", 1.5)}
                <text x={r * 165 + 146} y={-40} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={RB_SKY_INK}>{c}</text>
              </g>
            );
          })}
        </g>
        {row(nA, wA, RB_ROW_A - wA * RB_HAND_H, "a")}
        <rect x={x0} y={RB_BENCH_Y} width={L} height={RB_BENCH_H} rx={8} fill={K === "cloth" ? "#ECE6DA" : RB_WOOD} stroke={C.ink} strokeWidth={3} />
        {K === "cloth" && Array.from({ length: 17 }).map((_: any, j: number) => (
          <line key={"weave" + j} x1={x0 + 20 + j * 38} y1={RB_BENCH_Y + 4} x2={x0 + 6 + j * 38} y2={RB_BENCH_Y + RB_BENCH_H - 4} stroke="#CFC6B6" strokeWidth={2} />
        ))}
        <rect x={x0 + L / 2 - 54} y={RB_BENCH_Y + 8} width={108} height={34} rx={17} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={x0 + L / 2} y={RB_BENCH_Y + 35} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(it.thing)}</text>
        {row(nB, wB, RB_ROW_B, "b")}
        {(st.tape || demoTape) && (
          <g pointerEvents="none">
            <rect x={x0} y={RB_TAPE_Y} width={tapeLen * cm} height={RB_TAPE_H} rx={4} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
            {Array.from({ length: Math.floor(tapeLen / 2) + 1 }).map((_: any, j: number) => {
              const v = j * 2, x = x0 + v * cm, long = v % 10 === 0;
              return <line key={"tick" + j} x1={x} y1={RB_TAPE_Y} x2={x} y2={RB_TAPE_Y + (long ? 16 : 8)} stroke={C.ink} strokeWidth={long ? 2.5 : 1.5} />;
            })}
            {Array.from({ length: Math.floor(tapeLen / 20) }).map((_: any, j: number) => ((j + 1) * 20 > 0 && readings.every((r: number) => Math.abs(r - (j + 1) * 20) >= 5) ? (
              <text key={"num" + j} x={x0 + (j + 1) * 20 * cm} y={RB_TAPE_Y + 39} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{(j + 1) * 20}</text>
            ) : null))}
            <rect x={x0 - 3} y={RB_TAPE_Y - 8} width={6} height={RB_TAPE_H + 16} rx={2} fill={RB_MARK} />
            {readings.map((r: number) => {
              const x = x0 + r * cm, edge = x > 960;
              return (
                <g key={"reading" + r}>
                  <rect x={x - 3} y={RB_TAPE_Y - 8} width={6} height={RB_TAPE_H + 16} rx={2} fill={RB_MARK} />
                  <text x={edge ? x + 6 : x} y={RB_TAPE_Y + RB_TAPE_H + 42} textAnchor={edge ? "end" : "middle"} fontSize={T.label} fontWeight={700} fill={RB_MARK_INK}>{r + " " + tx("cm")}</text>
                </g>
              );
            })}
          </g>
        )}
        {[0, 1].map((r: number) => {
          const w = it.hands[r] * 6.5;
          return (
            <Key key={"hand" + r} id={"hand-" + r} x={40 + r * 240} y={384} w={220} h={136} C={C} disabled={!acting} onClick={() => stamp(r)} label={"lay a " + it.who[r] + " handspan"}>
              {rbHand(-w / 2, -28 - w * RB_HAND_H / 2, w, C.ink, "#FFFFFF", 2)}
              <text y={52} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(it.who[r])}</text>
            </Key>
          );
        })}
        <Key id="tape" x={520} y={384} w={220} h={136} C={C} disabled={!acting} onClick={pullTape} label={st.tape ? "roll up the tape" : "pull out the tape"}>
          {rbCoil(C)}
          <text y={52} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("tape")}</text>
        </Key>
        {/* the correction's last words: one line under the tape, on the row of its readings */}
        {D && D.done && <text x={x0} y={RB_TAPE_Y + RB_TAPE_H + 42} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(it.note)}</text>}
        {!st.a && !st.b && !st.tape && !D && (stage === "ask" || stage === "teach") && <Invite x={150} y={432} r={44} C={C} />}
      </g>
    );
  };

  const rulerView = (fm: boolean) => {
    const cm = RB_CM3, z = RB_Z3;
    const objId = fm ? st.obj : it.obj;
    const len = fm ? lenOf(st.obj) : it.to - it.from;
    const live = dd && dd.payload && dd.payload.t === "obj" && grab.current
      ? Math.max(0, Math.min(RB_RULER_CM - len, grab.current.left + (dd.x - grab.current.x) / cm)) : st.left;
    const snap = Math.round(live);
    const xL = z + live * cm;
    const bx0 = z + snap * cm, bx1 = bx0 + len * cm;
    const counted = fm ? len : D ? Math.min(D.k, len) : 0;
    return (
      <g>
        <rect x={53} y={RB_RULER_Y} width={980} height={100} rx={10} fill="#FBF5E6" stroke={C.ink} strokeWidth={3} />
        {Array.from({ length: RB_RULER_CM * 2 + 1 }).map((_: any, i: number) => {
          const x = z + (i * cm) / 2, whole = i % 2 === 0;
          return <line key={"k" + i} x1={x} y1={RB_RULER_Y} x2={x} y2={RB_RULER_Y + (whole ? 42 : 22)} stroke={C.ink} strokeWidth={whole ? 3 : 2} />;
        })}
        <text x={z} y={RB_RULER_Y + 76} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("cm")}</text>
        {Array.from({ length: RB_RULER_CM }).map((_: any, i: number) => (
          <text key={"n" + i} x={z + (i + 1) * cm} y={RB_RULER_Y + 78} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{i + 1}</text>
        ))}
        {snap === 0 && <rect x={z - 4} y={RB_RULER_Y - 4} width={8} height={50} rx={3} fill={RB_MARK} />}
        {/* the reading mark lights only once the reading is no longer the question: in the correction, after
            the answer, in free play (before it, it would point at the answer's numeral) */}
        {(fm || D) && <rect x={z + (snap + len) * cm - 4} y={RB_RULER_Y - 4} width={8} height={50} rx={3} fill={RB_MARK} />}
        <g {...control("object", "slide the " + objId)} {...drag.bind({ t: "obj" })} onKeyDown={objKeys}>
          <rect x={xL - 12} y={146} width={len * cm + 24} height={100} rx={14} fill="transparent" />
          {rbObj(objId, xL, 152, len * cm, C.ink)}
        </g>
        {(fm || D) && (
          <g pointerEvents="none">
            <path d={`M ${bx0} 362 V 384 H ${bx1} V 362`} fill="none" stroke={C.ink} strokeWidth={3} />
            {Array.from({ length: len - 1 }).map((_: any, j: number) => (
              <line key={"sp" + j} x1={bx0 + (j + 1) * cm} y1={374} x2={bx0 + (j + 1) * cm} y2={384} stroke={C.ink} strokeWidth={2} />
            ))}
            {Array.from({ length: counted }).map((_: any, j: number) => (
              <text key={"c" + j} x={bx0 + (j + 0.5) * cm} y={420} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={RB_SKY_INK}>{j + 1}</text>
            ))}
            {!fm && D && D.done && <text x={(bx0 + bx1) / 2} y={494} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{len + " " + tx("cm")}</text>}
          </g>
        )}
        {fm && MODEL.freeThings.map((f: any, k: number) => (
          <Key key={"free-" + f.id} id={"free-" + f.id} x={53 + k * 250} y={444} w={230} h={78} C={C} primary={st.obj === f.id} onClick={() => pickObj(f.id)} label={"lay the " + f.id}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={st.obj === f.id ? "#FFFFFF" : C.ink}>{tx(f.id)}</text>
          </Key>
        ))}
        {!fm && !st.touched && st.left !== 0 && !D && (stage === "ask" || stage === "teach") && <Invite x={xL + (len * cm) / 2} y={198} r={56} C={C} />}
      </g>
    );
  };

  const pickView = () => {
    const bus = it.thing === "bus";
    const x0 = bus ? 40 : 30, span = bus ? 360 : 530, stickY = bus ? 184 : 150;
    const seg = span / it.amount;
    const laid = D ? Math.min(D.k, it.amount) : 0;
    const ai = MODEL.picker.findIndex((c: any) => c.id === it.answer);
    return (
      <g>
        {bus ? rbBus(C) : rbPitch(C)}
        <text x={bus ? 220 : 295} y={bus ? 26 : 46} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(bus ? "school bus" : "cricket pitch")}</text>
        <text x={600} y={100} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("about")}</text>
        <text x={700} y={104} fontSize={T.xl} fontWeight={700} fill={C.ink}>{it.amount}</text>
        <rect x={790} y={48} width={120} height={72} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} strokeDasharray="10 8" />
        {MODEL.picker.map((c: any, b: number) => {
          const x = rbBinX(b), cx = x + RB_BIN_W / 2, mine = st.pick === c.id;
          return (
            <g key={"unit-card-" + c.id}>
              <rect x={x + 2} y={214} width={RB_BIN_W - 4} height={308} rx={RAD.card} fill={mine ? tint(C.accent, 0.75) : "#FFFFFF"}
                stroke={mine ? C.accent : C.rule} strokeWidth={mine ? 5 : 2} />
              {rbUnitPic(c.id, cx, C, tx)}
              <text x={cx} y={500} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(c.name)}</text>
            </g>
          );
        })}
        {MODEL.picker.map((c: any, b: number) => (
          <Hit key={"pick-" + c.id} id={"unit-" + c.id} x={rbBinX(b)} y={214} w={RB_BIN_W} h={308} enabled={picking && st.pick !== c.id}
            onPress={() => pickUnit(c.id)} label={c.name} />
        ))}
        <g pointerEvents="none">
          {Array.from({ length: laid }).map((_: any, j: number) => (
            <rect key={"stick" + j} x={x0 + j * seg} y={stickY} width={seg} height={16} fill={j % 2 ? "#FFFFFF" : RB_METRE} stroke={C.ink} strokeWidth={1.5} />
          ))}
          {laid > 0 && <text x={600} y={176} fontSize={T.label} fontWeight={700} fill={RB_SKY_INK}>{laid + " " + tx(laid === 1 ? "metre stick" : "metre sticks")}</text>}
          {D && D.done && <text x={850} y={102} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{tx(it.answer)}</text>}
          {D && D.ring && ai >= 0 && <rect x={rbBinX(ai) + 2} y={214} width={RB_BIN_W - 4} height={308} rx={RAD.card} fill="none" stroke={C.ink} strokeWidth={6} />}
        </g>
      </g>
    );
  };

  const gapView = () => {
    const z = RB_Z4, cm = RB_CM4, xs = (v: number) => z + v * cm;
    const E = it.estimate, M = it.measure, g = E - M;
    const counted = D ? Math.min(D.k, g) : 0;
    const card = (x: number, label: string, v: number) => (
      <g>
        <rect x={x} y={8} width={300} height={104} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={x + 22} y={46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(label)}</text>
        <text x={x + 22} y={96} fontSize={T.prompt} fontWeight={700} fill={C.ink}>{v + " " + tx("cm")}</text>
      </g>
    );
    return (
      <g>
        {card(93, "estimate", E)}
        {card(423, "measure", M)}
        <rect x={z} y={162} width={M * cm} height={80} rx={6} fill="#DCE4EA" stroke={C.ink} strokeWidth={3} />
        {Array.from({ length: M - 1 }).map((_: any, j: number) => <circle key={"ring" + j} cx={z + 16 + j * cm} cy={170} r={5} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />)}
        <rect x={z - 20} y={RB_RULER_Y} width={30 * cm + 40} height={84} rx={10} fill="#FBF5E6" stroke={C.ink} strokeWidth={3} />
        {Array.from({ length: 31 }).map((_: any, i: number) => (
          <line key={"t" + i} x1={xs(i)} y1={RB_RULER_Y} x2={xs(i)} y2={RB_RULER_Y + (i % 5 === 0 ? 30 : 16)} stroke={C.ink} strokeWidth={i % 5 === 0 ? 3 : 1.5} />
        ))}
        <text x={z} y={RB_RULER_Y + 68} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("cm")}</text>
        {[5, 10, 15, 20, 25, 30].map((v: number) => (
          <text key={"v" + v} x={xs(v)} y={RB_RULER_Y + 68} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{v}</text>
        ))}
        <line x1={xs(E)} y1={126} x2={xs(E)} y2={RB_RULER_Y} stroke={C.ink} strokeWidth={3} strokeDasharray="9 7" />
        <rect x={xs(M) - 4} y={236} width={8} height={48} rx={3} fill={RB_MARK} />
        <rect x={z - 4} y={236} width={8} height={48} rx={3} fill={RB_MARK} />
        <g pointerEvents="none">
          {/* the gap is the answer: its bar is drawn only in the correction and once the answer is given */}
          {D && <rect x={xs(M)} y={346} width={g * cm} height={28} rx={4} fill={RB_GAP} stroke={C.ink} strokeWidth={2} />}
          {Array.from({ length: counted }).map((_: any, j: number) => (
            <text key={"g" + j} x={xs(M + j + 0.5)} y={412} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={RB_SKY_INK}>{j + 1}</text>
          ))}
          {D && D.done && <text x={xs(M + g / 2)} y={492} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{g + " " + tx("cm")}</text>}
        </g>
      </g>
    );
  };

  let view: any = null;
  if (free) view = rulerView(true);
  else if (K === "sort") view = sorterView();
  else if (K === "blank") view = blankView();
  else if (K === "whose" || K === "why" || K === "cloth") view = benchView();
  else if (K === "read") view = rulerView(false);
  else if (K === "unit") view = pickView();
  else if (K === "gap") view = gapView();
  return <g>{view}</g>;
}

/* the summary page's small drawing of the child's last right answer in a phase (236 x 82):
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment).
   phase 1: each thing on its tile with its unit card · phase 2: two hands over one tape, and the reason
   phase 3: a little ruler with the object from its zero mark · phase 4: the gap between guess and measure */
function Thumb({ result, C, w, h, n, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const v = String(last.value), kind = last.kind;
  const ph: any = PHASES.find((p: any) => p.n === n) || PHASES.find((p: any) => p.items.some((x: any) => x.kind === kind)) || { items: [] };
  const itm: any = ph.items[last.item] || {};
  const label = (s: string, y: number) => <text x={w - 10} y={y} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(s)}</text>;
  const big = (s: string) => <text x={w - 12} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{s}</text>;
  /* Hindi and Gujarati symbols (किग्रा, કિગ્રા) and "सेमी" run wider than cm / kg: chips take the tile's
     full width and the little pictures leave the number more room */
  const wide = lang !== "en";
  const pw = wide ? 96 : 128;
  const chip = (x: number, u: string) => (
    <g>
      <rect x={wide ? x - 6 : x} y={47} width={wide ? 70 : 58} height={30} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.5} />
      <text x={x + 29} y={71} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(u)}</text>
    </g>
  );
  let pic: any = null;
  if (kind === "sort") pic = (
    <g>
      {v.split("|").slice(0, 3).map((s: string, j: number) => {
        const t = s.split("=")[0], u = (s.split(":")[1] || ""), x = 4 + j * 77;
        return (
          <g key={t}>
            <rect x={x} y={4} width={74} height={h - 8} rx={10} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={1.5} />
            {rbThing(t, x + 37, 25, 0.4, C.ink)}
            {chip(x + 8, u)}
          </g>
        );
      })}
    </g>
  );
  else if (kind === "blank") pic = (
    <g>
      {rbThing((itm.things || ["bucket"])[0], 40, 40, 0.55, C.ink)}
      {big((itm.amount || "") + " " + tx(v))}
    </g>
  );
  else if (kind === "whose" || kind === "why" || kind === "cloth") {
    /* a row of big handspans and a row of small ones over one tape, and the reason on one line under it */
    pic = (
      <g>
        {[0, 1].map((k: number) => <g key={"big" + k}>{rbHand(10 + k * 46, 4, 46, RB_SKY, "#EEF7FC", 1.5)}</g>)}
        {[0, 1, 2].map((k: number) => <g key={"small" + k}>{rbHand(112 + k * 38, 10, 38, RB_SKY, "#EEF7FC", 1.5)}</g>)}
        <rect x={8} y={36} width={w - 16} height={9} rx={3} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.5} />
        {[8, w - 8].map((x: number) => <rect key={x} x={x - 2} y={32} width={4} height={17} fill={RB_MARK} />)}
        <text x={w / 2} y={h - 5} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(RB_SHOWN[v] || v)}</text>
      </g>
    );
  } else if (kind === "read") {
    const len = itm.to !== undefined ? itm.to - itm.from : leadNumber(v) || 1, s = pw / (len + 1);
    pic = (
      <g>
        <rect x={8} y={20} width={len * s} height={18} rx={5} fill="#E7D6B3" stroke={C.ink} strokeWidth={1.5} />
        <rect x={4} y={42} width={(len + 1) * s + 8} height={26} rx={4} fill="#FBF5E6" stroke={C.ink} strokeWidth={1.5} />
        {Array.from({ length: len + 2 }).map((_: any, j: number) => <line key={j} x1={8 + j * s} y1={42} x2={8 + j * s} y2={52} stroke={C.ink} strokeWidth={1.5} />)}
        <rect x={6} y={38} width={4} height={18} fill={RB_MARK} />
        {big(leadNumber(v) + " " + tx("cm"))}
      </g>
    );
  } else if (kind === "unit") pic = (
    <g>
      {Array.from({ length: 5 }).map((_: any, j: number) => (
        <rect key={j} x={8 + j * 22} y={34} width={22} height={16} fill={j % 2 ? "#FFFFFF" : RB_METRE} stroke={C.ink} strokeWidth={1.5} />
      ))}
      {big((itm.amount || "") + " " + tx(v))}
    </g>
  );
  else {
    const E = itm.estimate || 30, Mv = itm.measure || 24, s = (pw - 8) / E;
    pic = (
      <g>
        <rect x={8} y={12} width={Mv * s} height={22} rx={4} fill="#DCE4EA" stroke={C.ink} strokeWidth={1.5} />
        <line x1={8 + E * s} y1={6} x2={8 + E * s} y2={70} stroke={C.ink} strokeWidth={2} strokeDasharray="5 4" />
        <rect x={8 + Mv * s} y={42} width={(E - Mv) * s} height={14} rx={3} fill={RB_GAP} stroke={C.ink} strokeWidth={1.5} />
        <line x1={8} y1={66} x2={8 + E * s} y2={66} stroke={C.ink} strokeWidth={1.5} />
        <rect x={6} y={8} width={4} height={62} fill={RB_MARK} />
        {big(leadNumber(v) + " " + tx("cm"))}
      </g>
    );
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {pic}
    </g>
  );
}

function RulerBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default RulerBench;
