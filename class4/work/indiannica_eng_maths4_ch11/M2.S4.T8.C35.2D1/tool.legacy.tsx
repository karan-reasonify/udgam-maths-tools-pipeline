/* ═══ M2.S4.T8.C28.2D1 · capacity_columns · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "capacity_columns";
const MEDIA_ID = "M2.S4.T8.C28.2D1";
const TOOL_NAME = "Capacity Columns";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Litres and millilitres, in columns. How many boxes do the millilitres take?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Litres carried and broken as a thousand, answers in the question's words, and jars counted by pouring.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Pour any jar into either bottle. Its count shows when the bottle is full.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Capacity Columns": "धारिता के स्तंभ",
    "Litres and millilitres, in columns. How many boxes do the millilitres take?": "लीटर और मिलीलीटर, स्तंभों में। मिलीलीटर कितने खाने लेते हैं?",
    "Litres carried and broken as a thousand, answers in the question's words, and jars counted by pouring.": "लीटर हज़ार बनकर हासिल गए और टूटे। उत्तर प्रश्न के शब्दों में दिए, और जार उंडेलकर गिने।",
    "Free play. Pour any jar into either bottle. Its count shows when the bottle is full.": "मुक्त खेल। कोई भी जार किसी भी बोतल में उंडेलो, बोतल भरने पर उसकी गिनती दिखेगी।",
    /* phase 1 */
    "Three places for millilitres": "मिलीलीटर के तीन स्थान",
    "The millilitres column has three boxes. Where does a two-digit number of millilitres go?": "मिलीलीटर के स्तंभ में तीन खाने हैं। दो अंकों वाली मिलीलीटर की संख्या कहाँ जाती है?",
    "Which places does this number fill?": "यह संख्या कौन से स्थान भरती है?",
    "Every millilitres box is filled. An empty place takes a zero.": "मिलीलीटर का हर खाना भरा जाता है। खाली स्थान में शून्य आता है।",
    "Beside litres the millilitres take three places, as grams do beside kilograms and metres beside kilometres.": "लीटर के साथ मिलीलीटर तीन स्थान लेते हैं। वैसे ही किलोग्राम के साथ ग्राम, और किलोमीटर के साथ मीटर।",
    "You learned: millilitres take three places beside litres.": "तुमने सीखा: लीटर के साथ मिलीलीटर तीन स्थान लेते हैं।",
    "Add 23 litres 40 millilitres and 15 litres 685 millilitres in columns.": "स्तंभों में जोड़ो: 23 लीटर 40 मिलीलीटर और 15 लीटर 685 मिलीलीटर।",
    "Add 23 L 40 mL and 15 L 685 mL": "23 ली 40 मिली + 15 ली 685 मिली",
    "Is 40 millilitres in the tens and ones boxes? Add the millilitres first.": "क्या 40 मिलीलीटर दहाई और इकाई के खानों में है? पहले मिलीलीटर जोड़ो।",
    "How is 8 millilitres written in the millilitres column beside litres?": "लीटर के साथ, मिलीलीटर के स्तंभ में 8 मिलीलीटर कैसे लिखते हैं?",
    "8 mL in the three boxes": "8 मिली, तीनों खानों में",
    "8 millilitres is a very small amount. Which box holds the ones?": "8 मिलीलीटर बहुत थोड़ा है। इकाई किस खाने में आती है?",
    "19 litres 65 millilitres is written in columns. What goes in the millilitres column?": "19 लीटर 65 मिलीलीटर स्तंभों में लिखा है। मिलीलीटर के स्तंभ में क्या आता है?",
    "The mL boxes for 19 L 65 mL": "19 ली 65 मिली: मिली के खाने",
    "Read your three boxes aloud. Do they say 65 millilitres?": "अपने तीनों खाने ज़ोर से पढ़ो। क्या वे 65 मिलीलीटर कहते हैं?",
    /* phase 2 */
    "Carrying and borrowing a litre": "एक लीटर का हासिल और उधार",
    "More than a thousand here, too few there. Carry a litre, or break one?": "यहाँ हज़ार से ज़्यादा, वहाँ बहुत कम। लीटर हासिल लें, या एक लीटर तोड़ें?",
    "Is a litre carried, or broken?": "लीटर हासिल जाता है, या टूटता है?",
    "Work the millilitres column first, then the litres.": "पहले मिलीलीटर का स्तंभ हल करो, फिर लीटर का।",
    "Each full thousand millilitres is carried as one litre. To borrow, break one litre into a thousand millilitres, and the litres on top go down by one.": "हर पूरे हज़ार मिलीलीटर एक लीटर बनकर हासिल जाते हैं। उधार के लिए एक लीटर को हज़ार मिलीलीटर में तोड़ो, और ऊपर के लीटर एक कम हो जाते हैं।",
    "You learned: 1,000 millilitres carry as 1 litre, and a litre breaks up.": "तुमने सीखा: 1,000 मिलीलीटर = 1 लीटर, हासिल में भी और तोड़ने में भी।",
    "Add 36 litres 575 millilitres and 48 litres 690 millilitres.": "36 लीटर 575 मिलीलीटर और 48 लीटर 690 मिलीलीटर जोड़ो।",
    "Add 36 L 575 mL and 48 L 690 mL": "दोनों मात्राएँ जोड़ो",
    "Can the three boxes hold more than 999?": "क्या तीन खानों में 999 से ज़्यादा आ सकता है?",
    "Add 14 litres 380 millilitres, 26 litres 745 millilitres and 9 litres 90 millilitres.": "14 लीटर 380 मिलीलीटर, 26 लीटर 745 मिलीलीटर और 9 लीटर 90 मिलीलीटर जोड़ो।",
    "Add the three amounts": "तीनों मात्राएँ जोड़ो",
    "Where does each full thousand millilitres go?": "हर पूरा हज़ार मिलीलीटर कहाँ जाता है?",
    "One cow gives 12 litres 750 millilitres of milk, and another gives 14 litres 380 millilitres. How much more milk does one cow give than the other?": "एक गाय 12 लीटर 750 मिलीलीटर दूध देती है, और दूसरी 14 लीटर 380 मिलीलीटर। एक गाय दूसरी से कितना ज़्यादा दूध देती है?",
    "How much more milk?": "कितना दूध ज़्यादा?",
    "The larger amount has only 380 millilitres. Can 750 millilitres come out of 380?": "बड़ी मात्रा में सिर्फ़ 380 मिलीलीटर हैं। क्या 380 में से 750 मिलीलीटर निकल सकते हैं?",
    "1st cow": "पहली गाय",
    "2nd cow": "दूसरी गाय",
    "So the 2nd cow gives more milk.": "तो दूसरी गाय ज़्यादा दूध देती है।",
    /* phase 3 */
    "How much is left": "कितना बचा",
    "What does the question ask for? Say the answer in those words.": "प्रश्न क्या पूछता है? उत्तर उन्हीं शब्दों में कहो।",
    "Watch the tank: where does its level settle?": "टंकी को देखो: पानी का स्तर कहाँ रुकता है?",
    "Take away each amount used and add each amount added, line by line.": "हर पंक्ति पर, इस्तेमाल हुई मात्रा घटाओ और डाली गई मात्रा जोड़ो।",
    "Work a story's steps in the order it gives. Answer in the question's own words: what is left, not just a difference.": "कहानी के कदम उसी क्रम में हल करो। उत्तर प्रश्न के अपने शब्दों में दो: कितना बचा, सिर्फ़ अंतर नहीं।",
    "You learned: work a story in its order, and answer in its own words.": "तुमने सीखा: कहानी उसके क्रम में हल करो, उत्तर उसके शब्दों में दो।",
    "A tank holds 50 litres of water. 32 litres 650 millilitres of it is used. How much water is left in the tank?": "एक टंकी में 50 लीटर पानी है। उसमें से 32 लीटर 650 मिलीलीटर इस्तेमाल होता है। टंकी में कितना पानी बचा?",
    "Water left in the tank?": "टंकी में कितना पानी बचा?",
    "Check the millilitres. Then choose words that fit the question.": "मिलीलीटर जाँचो। फिर प्रश्न से मेल खाते शब्द चुनो।",
    "A jar holds 5 litres of juice. 2 litres 640 millilitres of it is poured out. How much juice is left in the jar?": "एक जार में 5 लीटर रस है। उसमें से 2 लीटर 640 मिलीलीटर उंडेल दिया जाता है। जार में कितना रस बचा?",
    "Juice left in the jar?": "जार में कितना रस बचा?",
    "Look at the millilitres again, and at the words on the card.": "मिलीलीटर फिर से देखो, और कार्ड के शब्द भी।",
    "A water tank has 60 litres. First 34 litres 500 millilitres is used, then 20 litres is added. Then 27 litres 750 millilitres is used. What is left in the tank at the end?": "पानी की एक टंकी में 60 लीटर है। पहले 34 लीटर 500 मिलीलीटर इस्तेमाल होता है, फिर 20 लीटर डाला जाता है। फिर 27 लीटर 750 मिलीलीटर इस्तेमाल होता है। अंत में टंकी में कितना बचा?",
    "Water left at the end?": "अंत में कितना पानी बचा?",
    "Play the whole story on the tank, then read your answer card again.": "पूरी कहानी टंकी पर चलाओ, फिर अपना उत्तर कार्ड दोबारा पढ़ो।",
    "Choose the words that answer the question.": "वे शब्द चुनो जो प्रश्न का उत्तर दें।",
    "50 litres has no millilitres on top. Break a litre first.": "50 लीटर में ऊपर कोई मिलीलीटर नहीं है। पहले एक लीटर तोड़ो।",
    "5 litres is the same as 4 litres and 1,000 millilitres.": "5 लीटर उतना ही है जितना 4 लीटर और 1,000 मिलीलीटर।",
    "Did the tank run to the last line of the story?": "क्या टंकी कहानी की आखिरी पंक्ति तक चली?",
    "Does the question ask what is left, or what was used?": "प्रश्न क्या पूछता है, कितना बचा, या कितना इस्तेमाल हुआ?",
    "Which words tell what is still in the jar?": "कौन से शब्द बताते हैं कि जार में अभी क्या है?",
    "The story ends with water in the tank. Which words say that?": "कहानी टंकी में बचे पानी पर खत्म होती है। कौन से शब्द यह कहते हैं?",
    /* phase 4 */
    "How many small jars fill a bottle": "कितने छोटे जार बोतल भरते हैं",
    "Pour and count. Will a smaller jar need more pourings or fewer?": "उंडेलो और गिनो। छोटे जार को ज़्यादा बार डालना होगा या कम बार?",
    "Is the bottle full yet?": "क्या बोतल भर गई?",
    "Count the marks on the pour counter, one for each pouring.": "गिनती पट्टी के निशान गिनो, हर बार डालने का एक निशान।",
    "When a jar goes into a bottle exactly, the pourings say how many of that jar fill it. For the same bottle, a smaller jar then needs more pourings.": "जब जार बोतल में ठीक से समाता है, डालने की गिनती बताती है कि कितने जार बोतल भरते हैं। उसी बोतल के लिए छोटे जार को ज़्यादा बार डालना पड़ता है।",
    "You learned: a smaller jar needs more pourings to fill the same bottle.": "तुमने सीखा: छोटे जार से वही बोतल भरने में ज़्यादा बार लगते हैं।",
    "How many 300 millilitre glasses fill a jug that holds 2 litres 400 millilitres?": "2 लीटर 400 मिलीलीटर वाले जग को 300 मिलीलीटर के कितने गिलास भरते हैं?",
    "Glasses to fill the jug?": "जग भरने को कितने गिलास?",
    "The jug holds 2,400 millilitres, and each glass adds 300.": "जग में 2,400 मिलीलीटर आते हैं, और हर गिलास 300 जोड़ता है।",
    "A bottle holds 1 litre 200 millilitres. How many 150 millilitre cups of water fill it?": "एक बोतल में 1 लीटर 200 मिलीलीटर आता है। 150 मिलीलीटर के कितने कप पानी से वह भरेगी?",
    "Cups to fill the bottle?": "बोतल भरने को कितने कप?",
    "1 litre is not one cup. It is 1,000 millilitres, and the bottle holds 200 more.": "1 लीटर एक कप नहीं है। वह 1,000 मिलीलीटर है, और बोतल में 200 और आते हैं।",
    "A 400 millilitre mug and a 200 millilitre glass each fill a jug of 3 litres 200 millilitres. How many pourings does each need?": "400 मिलीलीटर का मग और 200 मिलीलीटर का गिलास, दोनों से 3 लीटर 200 मिलीलीटर का जग भरना है। हर एक को कितनी बार डालना होगा?",
    "Pourings for each?": "हर एक को कितनी बार?",
    "Which goes back and forth more often, the big mug or the small glass?": "कौन ज़्यादा बार आता जाता है, बड़ा मग या छोटा गिलास?",
    "The glass holds half as much, so it needs twice as many.": "गिलास में आधा आता है, इसलिए उसे दोगुनी बार डालना पड़ता है।",
    /* the picture's words and the answer boxes */
    "L": "ली", "mL": "मिली", "kg": "किग्रा", "g": "ग्रा", "km": "किमी", "m": "मी",
    "mug": "मग", "glass": "गिलास", "cup": "कप", "mug, glass": "मग, गिलास", "jar": "जार", "tank": "टंकी",
    "mugs": "मग", "glasses": "गिलास", "cups": "कप",
    "pourings": "कितनी बार", "empty": "खाली", "break": "तोड़ो", "run": "चलाओ", "back": "पीछे",
    "in the tank": "टंकी में", "in the jar": "जार में", "used": "इस्तेमाल", "added": "डाला गया", "poured out": "उंडेल दिया",
    "left in the tank": "टंकी में बचा", "left in the jar": "जार में बचा", "the difference": "अंतर", "used in all": "कुल इस्तेमाल",
  },
  gu: {
    "Capacity Columns": "ક્ષમતાના સ્તંભ",
    "Litres and millilitres, in columns. How many boxes do the millilitres take?": "લિટર અને મિલિલિટર, સ્તંભમાં. મિલિલિટર કેટલાં ખાનાં લે છે?",
    "Litres carried and broken as a thousand, answers in the question's words, and jars counted by pouring.": "લિટર હજાર બનીને વદીમાં ગયા અને તૂટ્યા. જવાબ પ્રશ્નના શબ્દોમાં આપ્યા, અને બરણી રેડીને ગણી.",
    "Free play. Pour any jar into either bottle. Its count shows when the bottle is full.": "મુક્ત રમત. કોઈ પણ બરણી કોઈ પણ બાટલીમાં રેડો, બાટલી ભરાય ત્યારે તેની ગણતરી દેખાશે.",
    /* phase 1 */
    "Three places for millilitres": "મિલિલિટરનાં ત્રણ સ્થાન",
    "The millilitres column has three boxes. Where does a two-digit number of millilitres go?": "મિલિલિટરના સ્તંભમાં ત્રણ ખાનાં છે. બે અંકની મિલિલિટર સંખ્યા ક્યાં જાય?",
    "Which places does this number fill?": "આ સંખ્યા કયાં સ્થાન ભરે છે?",
    "Every millilitres box is filled. An empty place takes a zero.": "મિલિલિટરનું દરેક ખાનું ભરાય છે. ખાલી સ્થાનમાં શૂન્ય આવે છે.",
    "Beside litres the millilitres take three places, as grams do beside kilograms and metres beside kilometres.": "લિટર સાથે મિલિલિટર ત્રણ સ્થાન લે છે. એ જ રીતે કિલોગ્રામ સાથે ગ્રામ, અને કિલોમીટર સાથે મીટર.",
    "You learned: millilitres take three places beside litres.": "તમે શીખ્યા: લિટર સાથે મિલિલિટર ત્રણ સ્થાન લે છે.",
    "Add 23 litres 40 millilitres and 15 litres 685 millilitres in columns.": "સ્તંભમાં જોડો: 23 લિટર 40 મિલિલિટર અને 15 લિટર 685 મિલિલિટર.",
    "Add 23 L 40 mL and 15 L 685 mL": "23 લિ 40 મિલિ + 15 લિ 685 મિલિ",
    "Is 40 millilitres in the tens and ones boxes? Add the millilitres first.": "શું 40 મિલિલિટર દશક અને એકમનાં ખાનાંમાં છે? પહેલાં મિલિલિટર જોડો.",
    "How is 8 millilitres written in the millilitres column beside litres?": "લિટર સાથે, મિલિલિટરના સ્તંભમાં 8 મિલિલિટર કેવી રીતે લખાય?",
    "8 mL in the three boxes": "8 મિલિ, ત્રણેય ખાનાંમાં",
    "8 millilitres is a very small amount. Which box holds the ones?": "8 મિલિલિટર બહુ થોડું છે. એકમ કયા ખાનામાં આવે?",
    "19 litres 65 millilitres is written in columns. What goes in the millilitres column?": "19 લિટર 65 મિલિલિટર સ્તંભમાં લખ્યું છે. મિલિલિટરના સ્તંભમાં શું આવે?",
    "The mL boxes for 19 L 65 mL": "19 લિ 65 મિલિ: મિલિનાં ખાનાં",
    "Read your three boxes aloud. Do they say 65 millilitres?": "તમારાં ત્રણેય ખાનાં મોટેથી વાંચો. શું તે 65 મિલિલિટર કહે છે?",
    /* phase 2 */
    "Carrying and borrowing a litre": "એક લિટરની વદી અને ઉછીનું",
    "More than a thousand here, too few there. Carry a litre, or break one?": "અહીં હજારથી વધારે, ત્યાં બહુ ઓછા. લિટરની વદી લઈએ, કે એક લિટર તોડીએ?",
    "Is a litre carried, or broken?": "લિટર વદીમાં જાય છે, કે તૂટે છે?",
    "Work the millilitres column first, then the litres.": "પહેલાં મિલિલિટરનો સ્તંભ ગણો, પછી લિટરનો.",
    "Each full thousand millilitres is carried as one litre. To borrow, break one litre into a thousand millilitres, and the litres on top go down by one.": "દરેક પૂરા હજાર મિલિલિટર એક લિટર બનીને વદીમાં જાય છે. ઉછીનું લેવા એક લિટરને હજાર મિલિલિટરમાં તોડો, અને ઉપરના લિટર એક ઓછા થાય છે.",
    "You learned: 1,000 millilitres carry as 1 litre, and a litre breaks up.": "તમે શીખ્યા: 1,000 મિલિલિટર = 1 લિટર, વદીમાં પણ અને તોડવામાં પણ.",
    "Add 36 litres 575 millilitres and 48 litres 690 millilitres.": "36 લિટર 575 મિલિલિટર અને 48 લિટર 690 મિલિલિટર જોડો.",
    "Add 36 L 575 mL and 48 L 690 mL": "બંને માપ જોડો",
    "Can the three boxes hold more than 999?": "શું ત્રણ ખાનાંમાં 999થી વધારે સમાય?",
    "Add 14 litres 380 millilitres, 26 litres 745 millilitres and 9 litres 90 millilitres.": "14 લિટર 380 મિલિલિટર, 26 લિટર 745 મિલિલિટર અને 9 લિટર 90 મિલિલિટર જોડો.",
    "Add the three amounts": "ત્રણેય માપ જોડો",
    "Where does each full thousand millilitres go?": "દરેક પૂરા હજાર મિલિલિટર ક્યાં જાય?",
    "One cow gives 12 litres 750 millilitres of milk, and another gives 14 litres 380 millilitres. How much more milk does one cow give than the other?": "એક ગાય 12 લિટર 750 મિલિલિટર દૂધ આપે છે, અને બીજી 14 લિટર 380 મિલિલિટર. એક ગાય બીજી કરતાં કેટલું વધારે દૂધ આપે છે?",
    "How much more milk?": "કેટલું દૂધ વધારે?",
    "The larger amount has only 380 millilitres. Can 750 millilitres come out of 380?": "મોટા માપમાં ફક્ત 380 મિલિલિટર છે. શું 380માંથી 750 મિલિલિટર નીકળી શકે?",
    "1st cow": "પહેલી ગાય",
    "2nd cow": "બીજી ગાય",
    "So the 2nd cow gives more milk.": "તો બીજી ગાય વધારે દૂધ આપે છે.",
    /* phase 3 */
    "How much is left": "કેટલું બાકી",
    "What does the question ask for? Say the answer in those words.": "પ્રશ્ન શું પૂછે છે? જવાબ એ જ શબ્દોમાં કહો.",
    "Watch the tank: where does its level settle?": "ટાંકી જુઓ: પાણીનું સ્તર ક્યાં અટકે છે?",
    "Take away each amount used and add each amount added, line by line.": "દરેક લીટીએ, વપરાયેલું માપ બાદ કરો અને ઉમેરેલું માપ ઉમેરો.",
    "Work a story's steps in the order it gives. Answer in the question's own words: what is left, not just a difference.": "વાર્તાનાં પગલાં એ જ ક્રમમાં ગણો. જવાબ પ્રશ્નના પોતાના શબ્દોમાં આપો: કેટલું બાકી, ફક્ત તફાવત નહીં.",
    "You learned: work a story in its order, and answer in its own words.": "તમે શીખ્યા: વાર્તા તેના ક્રમમાં ગણો, જવાબ તેના શબ્દોમાં આપો.",
    "A tank holds 50 litres of water. 32 litres 650 millilitres of it is used. How much water is left in the tank?": "એક ટાંકીમાં 50 લિટર પાણી છે. તેમાંથી 32 લિટર 650 મિલિલિટર વપરાય છે. ટાંકીમાં કેટલું પાણી બાકી રહ્યું?",
    "Water left in the tank?": "ટાંકીમાં કેટલું પાણી બાકી?",
    "Check the millilitres. Then choose words that fit the question.": "મિલિલિટર તપાસો. પછી પ્રશ્નને બંધબેસતા શબ્દો પસંદ કરો.",
    "A jar holds 5 litres of juice. 2 litres 640 millilitres of it is poured out. How much juice is left in the jar?": "એક બરણીમાં 5 લિટર રસ છે. તેમાંથી 2 લિટર 640 મિલિલિટર રેડી દેવાય છે. બરણીમાં કેટલો રસ બાકી રહ્યો?",
    "Juice left in the jar?": "બરણીમાં કેટલો રસ બાકી?",
    "Look at the millilitres again, and at the words on the card.": "મિલિલિટર ફરી જુઓ, અને કાર્ડ પરના શબ્દો પણ.",
    "A water tank has 60 litres. First 34 litres 500 millilitres is used, then 20 litres is added. Then 27 litres 750 millilitres is used. What is left in the tank at the end?": "પાણીની એક ટાંકીમાં 60 લિટર છે. પહેલાં 34 લિટર 500 મિલિલિટર વપરાય છે, પછી 20 લિટર ઉમેરાય છે. પછી 27 લિટર 750 મિલિલિટર વપરાય છે. અંતે ટાંકીમાં કેટલું બાકી રહ્યું?",
    "Water left at the end?": "અંતે કેટલું પાણી બાકી?",
    "Play the whole story on the tank, then read your answer card again.": "આખી વાર્તા ટાંકી પર ચલાવો, પછી તમારું જવાબ કાર્ડ ફરી વાંચો.",
    "Choose the words that answer the question.": "પ્રશ્નનો જવાબ આપે એવા શબ્દો પસંદ કરો.",
    "50 litres has no millilitres on top. Break a litre first.": "50 લિટરમાં ઉપર કોઈ મિલિલિટર નથી. પહેલાં એક લિટર તોડો.",
    "5 litres is the same as 4 litres and 1,000 millilitres.": "5 લિટર એટલે 4 લિટર અને 1,000 મિલિલિટર.",
    "Did the tank run to the last line of the story?": "શું ટાંકી વાર્તાની છેલ્લી લીટી સુધી ચાલી?",
    "Does the question ask what is left, or what was used?": "પ્રશ્ન શું પૂછે છે, કેટલું બાકી, કે કેટલું વપરાયું?",
    "Which words tell what is still in the jar?": "કયા શબ્દો કહે છે કે બરણીમાં હજી શું છે?",
    "The story ends with water in the tank. Which words say that?": "વાર્તા ટાંકીમાં બાકી પાણી પર પૂરી થાય છે. કયા શબ્દો એ કહે છે?",
    /* phase 4 */
    "How many small jars fill a bottle": "કેટલી નાની બરણીથી બાટલી ભરાય",
    "Pour and count. Will a smaller jar need more pourings or fewer?": "રેડો અને ગણો. નાની બરણીને વધારે વાર રેડવી પડશે કે ઓછી વાર?",
    "Is the bottle full yet?": "બાટલી ભરાઈ ગઈ?",
    "Count the marks on the pour counter, one for each pouring.": "ગણતરી પટ્ટી પરનાં નિશાન ગણો, દરેક વાર રેડવાનું એક નિશાન.",
    "When a jar goes into a bottle exactly, the pourings say how many of that jar fill it. For the same bottle, a smaller jar then needs more pourings.": "જ્યારે બરણી બાટલીમાં બરાબર સમાય, ત્યારે રેડવાની ગણતરી કહે છે કે કેટલી બરણી બાટલી ભરે. એ જ બાટલી માટે નાની બરણીને વધારે વાર રેડવી પડે.",
    "You learned: a smaller jar needs more pourings to fill the same bottle.": "તમે શીખ્યા: નાની બરણીથી એ જ બાટલી ભરવામાં વધારે વાર લાગે.",
    "How many 300 millilitre glasses fill a jug that holds 2 litres 400 millilitres?": "2 લિટર 400 મિલિલિટરનો જગ 300 મિલિલિટરના કેટલા ગ્લાસથી ભરાય?",
    "Glasses to fill the jug?": "જગ ભરવા કેટલા ગ્લાસ?",
    "The jug holds 2,400 millilitres, and each glass adds 300.": "જગમાં 2,400 મિલિલિટર સમાય છે, અને દરેક ગ્લાસ 300 ઉમેરે છે.",
    "A bottle holds 1 litre 200 millilitres. How many 150 millilitre cups of water fill it?": "એક બાટલીમાં 1 લિટર 200 મિલિલિટર સમાય છે. 150 મિલિલિટરના કેટલા કપ પાણીથી તે ભરાશે?",
    "Cups to fill the bottle?": "બાટલી ભરવા કેટલા કપ?",
    "1 litre is not one cup. It is 1,000 millilitres, and the bottle holds 200 more.": "1 લિટર એક કપ નથી. તે 1,000 મિલિલિટર છે, અને બાટલીમાં 200 વધુ સમાય છે.",
    "A 400 millilitre mug and a 200 millilitre glass each fill a jug of 3 litres 200 millilitres. How many pourings does each need?": "400 મિલિલિટરનો મગ અને 200 મિલિલિટરનો ગ્લાસ, બંનેથી 3 લિટર 200 મિલિલિટરનો જગ ભરવો છે. દરેકને કેટલી વાર રેડવું પડશે?",
    "Pourings for each?": "દરેકને કેટલી વાર?",
    "Which goes back and forth more often, the big mug or the small glass?": "કોણ વધારે વાર આવજા કરે, મોટો મગ કે નાનો ગ્લાસ?",
    "The glass holds half as much, so it needs twice as many.": "ગ્લાસમાં અડધું સમાય છે, એટલે તેને બમણી વાર રેડવું પડે.",
    /* the picture's words and the answer boxes */
    "L": "લિ", "mL": "મિલિ", "kg": "કિગ્રા", "g": "ગ્રા", "km": "કિમી", "m": "મી",
    "mug": "મગ", "glass": "ગ્લાસ", "cup": "કપ", "mug, glass": "મગ, ગ્લાસ", "jar": "બરણી", "tank": "ટાંકી",
    "mugs": "મગ", "glasses": "ગ્લાસ", "cups": "કપ",
    "pourings": "કેટલી વાર", "empty": "ખાલી", "break": "તોડો", "run": "ચલાવો", "back": "પાછળ",
    "in the tank": "ટાંકીમાં", "in the jar": "બરણીમાં", "used": "વપરાયું", "added": "ઉમેર્યું", "poured out": "રેડી દીધું",
    "left in the tank": "ટાંકીમાં બાકી", "left in the jar": "બરણીમાં બાકી", "the difference": "તફાવત", "used in all": "કુલ વપરાયું",
  },
};

/* the two answer boxes of a measure in litres and millilitres: labelled with the unit symbol alone
   (BUILD_CARD §7, 2026-09-24) */
const CC_LML = [{ label: "L" }, { label: "mL" }];

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase. Own fields: rows (the frame's measures), story (the tank's lines), phrases and
           words (the answer card), jar / bottle (the pouring), near (the item's misconception) */
const PHASES = [
  {
    n: 1,
    concept: "Three places for millilitres",
    conceptId: "M2.S4.T8.C28", objectiveIds: ["O13"],
    says: ["The millilitres column has three boxes. Where does a two-digit number of millilitres go?"],
    ladder: ["Which places does this number fill?", "Every millilitres box is filled. An empty place takes a zero."],
    closing: "Beside litres the millilitres take three places, as grams do beside kilograms and metres beside kilometres.",
    learned: "You learned: millilitres take three places beside litres.",
    traceback: "The millilitres slide to the ones end with grey zeros in front, and the columns are added to the whole answer.",
    items: [
      /* learn ML1: answer in the plan = 38 L 725 mL. The child slides the 40 into the boxes, then adds */
      { qid: "M2.S4.T8.C28:ML1", kind: "place", say: "Add 23 litres 40 millilitres and 15 litres 685 millilitres in columns.",
        ask: "Add 23 L 40 mL and 15 L 685 mL", parts: CC_LML, answer: [38, 725], near: [38, 1085],
        rows: [{ L: 23, ml: 40 }, { L: 15, ml: 685, sign: "+" }],
        miss: "Is 40 millilitres in the tens and ones boxes? Add the millilitres first." },
      /* practice 1: answer in the plan = 008, because millilitres take three places */
      { qid: "M2.S4.T8.C28:1", kind: "write", say: "How is 8 millilitres written in the millilitres column beside litres?",
        ask: "8 mL in the three boxes", answer: "008", near: "8", L: "", ml: 8, card: "8 mL",
        miss: "8 millilitres is a very small amount. Which box holds the ones?" },
      /* practice 2: answer in the plan = 065 */
      { qid: "M2.S4.T8.C28:2", kind: "write", say: "19 litres 65 millilitres is written in columns. What goes in the millilitres column?",
        ask: "The mL boxes for 19 L 65 mL", answer: "065", near: "65", L: 19, ml: 65, card: "19 L 65 mL",
        miss: "Read your three boxes aloud. Do they say 65 millilitres?" },
    ],
  },
  {
    n: 2,
    concept: "Carrying and borrowing a litre",
    conceptId: "M2.S4.T8.C29", objectiveIds: ["O13"],
    says: ["More than a thousand here, too few there. Carry a litre, or break one?"],
    ladder: ["Is a litre carried, or broken?", "Work the millilitres column first, then the litres."],
    closing: "Each full thousand millilitres is carried as one litre. To borrow, break one litre into a thousand millilitres, and the litres on top go down by one.",
    learned: "You learned: 1,000 millilitres carry as 1 litre, and a litre breaks up.",
    traceback: "The millilitres are worked first: a full thousand rises as one litre, or a litre breaks into a thousand, and the answer row fills.",
    items: [
      /* learn ML2: answer in the plan = 85 L 265 mL */
      { qid: "M2.S4.T8.C29:ML2", kind: "carry", say: "Add 36 litres 575 millilitres and 48 litres 690 millilitres.",
        ask: "Add 36 L 575 mL and 48 L 690 mL", parts: CC_LML, answer: [85, 265], near: [84, 1265],
        rows: [{ L: 36, ml: 575 }, { L: 48, ml: 690, sign: "+" }],
        miss: "Can the three boxes hold more than 999?" },
      /* practice 3: answer in the plan = 50 L 215 mL. The millilitres make 1215, so write 215 and carry 1 L */
      { qid: "M2.S4.T8.C29:3", kind: "carry", say: "Add 14 litres 380 millilitres, 26 litres 745 millilitres and 9 litres 90 millilitres.",
        ask: "Add the three amounts", parts: CC_LML, answer: [50, 215], near: [49, 1215],
        rows: [{ L: 14, ml: 380 }, { L: 26, ml: 745, sign: "+" }, { L: 9, ml: 90, sign: "+" }],
        miss: "Where does each full thousand millilitres go?" },
      /* practice 4: answer in the plan = The second cow gives more, by 1 L 630 mL. Break one litre: 13 L 1380 mL less 12 L 750 mL */
      { qid: "M2.S4.T8.C29:4", kind: "break", say: "One cow gives 12 litres 750 millilitres of milk, and another gives 14 litres 380 millilitres. How much more milk does one cow give than the other?",
        ask: "How much more milk?", parts: CC_LML, answer: [1, 630], near: [2, 370], winMs: 3400,
        rows: [{ L: 12, ml: 750, label: "1st cow" }, { L: 14, ml: 380, label: "2nd cow" }],
        miss: "The larger amount has only 380 millilitres. Can 750 millilitres come out of 380?" },
    ],
  },
  {
    n: 3,
    concept: "How much is left",
    conceptId: "M2.S4.T8.C30", objectiveIds: ["O14"],
    says: ["What does the question ask for? Say the answer in those words."],
    ladder: ["Watch the tank: where does its level settle?", "Take away each amount used and add each amount added, line by line."],
    closing: "Work a story's steps in the order it gives. Answer in the question's own words: what is left, not just a difference.",
    learned: "You learned: work a story in its order, and answer in its own words.",
    traceback: "The tank plays the story line by line, and the answer card ends on the amount left with the question's words.",
    items: [
      /* learn ML3: answer in the plan = 17 L 350 mL of water is left in the tank */
      { qid: "M2.S4.T8.C30:ML3", kind: "story", say: "A tank holds 50 litres of water. 32 litres 650 millilitres of it is used. How much water is left in the tank?",
        ask: "Water left in the tank?", parts: CC_LML, answer: [17, 350], near: [18, 650], vessel: "tank",
        story: [{ amt: 50000, op: "start", verb: "in the tank" }, { amt: 32650, op: "use", verb: "used" }],
        phrases: [{ id: "used", label: "used" }, { id: "left", label: "left in the tank" }, { id: "diff", label: "the difference" }], words: "left",
        unbundle: { from: "50 L", to: "49 L 1,000 mL", ml: "1,000 − 650", mlAns: "350 mL", L: "49 − 32", LAns: "17 L" },
        miss: "Check the millilitres. Then choose words that fit the question." },
      /* practice 5: answer in the plan = 2 L 360 mL of juice is left in the jar */
      { qid: "M2.S4.T8.C30:5", kind: "story", say: "A jar holds 5 litres of juice. 2 litres 640 millilitres of it is poured out. How much juice is left in the jar?",
        ask: "Juice left in the jar?", parts: CC_LML, answer: [2, 360], near: [3, 640], vessel: "jar",
        story: [{ amt: 5000, op: "start", verb: "in the jar" }, { amt: 2640, op: "use", verb: "poured out" }],
        phrases: [{ id: "left", label: "left in the jar" }, { id: "diff", label: "the difference" }, { id: "out", label: "poured out" }], words: "left",
        unbundle: { from: "5 L", to: "4 L 1,000 mL", ml: "1,000 − 640", mlAns: "360 mL", L: "4 − 2", LAns: "2 L" },
        miss: "Look at the millilitres again, and at the words on the card." },
      /* practice 6: answer in the plan = 17 L 750 mL of water is left. 60 L less 34 L 500 mL is 25 L 500 mL, 20 L more makes 45 L 500 mL, and taking 27 L 750 mL leaves 17 L 750 mL */
      { qid: "M2.S4.T8.C30:6", kind: "story", say: "A water tank has 60 litres. First 34 litres 500 millilitres is used, then 20 litres is added. Then 27 litres 750 millilitres is used. What is left in the tank at the end?",
        ask: "Water left at the end?", parts: CC_LML, answer: [17, 750], near: [25, 500], vessel: "tank",
        story: [{ amt: 60000, op: "start", verb: "in the tank" }, { amt: 34500, op: "use", verb: "used" }, { amt: 20000, op: "add", verb: "added" }, { amt: 27750, op: "use", verb: "used" }],
        phrases: [{ id: "used", label: "used in all" }, { id: "added", label: "added" }, { id: "left", label: "left in the tank" }], words: "left",
        miss: "Play the whole story on the tank, then read your answer card again." },
    ],
  },
  {
    n: 4,
    concept: "How many small jars fill a bottle",
    conceptId: "M2.S4.T8.C31", objectiveIds: ["O14"],
    says: ["Pour and count. Will a smaller jar need more pourings or fewer?"],
    ladder: ["Is the bottle full yet?", "Count the marks on the pour counter, one for each pouring."],
    closing: "When a jar goes into a bottle exactly, the pourings say how many of that jar fill it. For the same bottle, a smaller jar then needs more pourings.",
    learned: "You learned: a smaller jar needs more pourings to fill the same bottle.",
    traceback: "The bottle is marked off one pouring at a time up to its neck line, and the count is written under it.",
    items: [
      /* learn ML4: answer in the plan = 8 glasses */
      { qid: "M2.S4.T8.C31:ML4", kind: "pour", say: "How many 300 millilitre glasses fill a jug that holds 2 litres 400 millilitres?",
        ask: "Glasses to fill the jug?", answer: 8, near: 2, jar: 300, jarName: "glasses", head: "glass", pot: "jug", bottle: 2400, winMs: 2800,
        miss: "The jug holds 2,400 millilitres, and each glass adds 300." },
      /* practice 7: answer in the plan = 8 cups, because 8 times 150 mL is 1200 mL. Near miss: the 1 L counted as 1 cup */
      { qid: "M2.S4.T8.C31:7", kind: "pour", say: "A bottle holds 1 litre 200 millilitres. How many 150 millilitre cups of water fill it?",
        ask: "Cups to fill the bottle?", answer: 8, near: 1, jar: 150, jarName: "cups", head: "cup", pot: "bottle", bottle: 1200, winMs: 2800,
        miss: "1 litre is not one cup. It is 1,000 millilitres, and the bottle holds 200 more." },
      /* practice 8: answer in the plan = The mug needs 8 and the glass needs 16, so the smaller glass needs more pourings */
      { qid: "M2.S4.T8.C31:8", kind: "pour2", say: "A 400 millilitre mug and a 200 millilitre glass each fill a jug of 3 litres 200 millilitres. How many pourings does each need?",
        ask: "Pourings for each?", parts: [{ label: "mug" }, { label: "glass" }], answer: [8, 16], near: [16, 8], winMs: 4200,
        head: "mug, glass", pot: "jug", jars: [{ id: "mug", cap: 400 }, { id: "glass", cap: 200 }], bottle: 3200,
        miss: "Which goes back and forth more often, the big mug or the small glass?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  frame: { smallUnitBoxes: 3, joiningNumber: 1000, pairs: [["L", "mL"], ["kg", "g"], ["km", "m"]] },
  freePlay: { jars: [100, 200, 250, 500], bottles: [1000, 2000] },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* the answer card's words, when the child's Enter sent them with the measure ([17, 350, "left"]) */
const ccWordsOf = (v: any) => (Array.isArray(v) ? (v.length > 2 ? v[2] : null) : String(v ?? "").split("|")[2] ?? null);

/* judge: is this value right for this item? A measure is its two boxes; an answer card also needs the
   question's own words (the child's Enter always sends them, see Work); "008" is judged as written */
const judge = (item: any, v: any) => {
  if (item.words) { const w = ccWordsOf(v); if (w !== null && w !== undefined && w !== "" && w !== item.words) return false; }
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v ?? "").trim() === String(item.answer);
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   measures in millilitres, stories run line by line, and pourings counted one at a time */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const two = (t: number) => Array.isArray(it.answer) && it.answer[0] === Math.floor(t / 1000) && it.answer[1] === t % 1000;
  if (it.kind === "write") { const s = String(it.ml); return it.answer === "000".slice(s.length) + s; }
  if (it.kind === "place" || it.kind === "carry") return two(it.rows.reduce((a: number, r: any) => a + r.L * 1000 + r.ml, 0));
  if (it.kind === "break") { const v = it.rows.map((r: any) => r.L * 1000 + r.ml); return two(Math.max(...v) - Math.min(...v)); }
  if (it.kind === "story") { let t = 0; it.story.forEach((s: any) => { t = s.op === "use" ? t - s.amt : t + s.amt; if (t < 0) t = NaN; }); return two(t); }
  const fill = (jar: number) => { let lv = 0, k = 0; while (lv < it.bottle) { lv += jar; k++; } return lv === it.bottle ? k : -1; };
  if (it.kind === "pour") return fill(it.jar) === it.answer;
  if (it.kind === "pour2") return it.jars.every((j: any, k: number) => fill(j.cap) === it.answer[k]);
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? (Array.isArray(item.near) ? item.near.join("|") : item.near)
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print: a measure as a whole */
const answerForms = (item: any) => (item.parts === CC_LML ? [`${item.answer[0]} L ${item.answer[1]} mL`, `${item.answer[0]} litres ${item.answer[1]} millilitres`]
  : item.parts ? item.answer.flatMap((x: number) => [String(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): on an answer card it also sets the question's words, as a child taps them; the
   measure is then typed (undefined = type it) */
const answer = (item: any, v: any) => { if (item.words && HOOK.pickWords) HOOK.pickWords(); return undefined; };
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── this tool's drawing: colours, the column frame, the tank and the bottles ────────────────
   Every name is prefixed cc, so nothing shadows a runtime name. */
const CC = { big: "#0072B2", small: "#009E73", amber: "#E69F00", zero: "#767676", left: "#CC79A7", count: "#56B4E9",
  water: "#D3ECFA", waterEdge: "#7DB9DE", line: "#2B2B2B" };
const CC_INK = { big: shade(CC.big, 0.25), small: shade(CC.small, 0.25), amber: shade(CC.amber, 0.35), left: shade(CC.left, 0.3), count: shade(CC.count, 0.45) };
const CC_UNITS = [["L", "mL"], ["kg", "g"], ["km", "m"]];
const CC_UNIT_NAMES = ["litres and millilitres", "kilograms and grams", "kilometres and metres"];
/* the frame: litres cell 344-500, the joining line at 511, three millilitres boxes from 522 */
const CC_FX = { sign: 318, lx: 344, lw: 156, lr: 488, div: 511, bx: [522, 610, 698], bw: 80, right: 790, lc: 422, mc: 650 };
const ccNum = (v: number) => (Math.abs(v) >= 1000 ? indian(v) : String(v));
const ccMeas = (ml: number) => { const L = Math.floor(ml / 1000), m = ml % 1000; return L && m ? `${L} L ${ccNum(m)} mL` : L ? `${L} L` : `${ccNum(m)} mL`; };
const ccPad3 = (v: number) => { const s = String(v); return s.length >= 3 ? s : "000".slice(s.length) + s; };
/* the tank: level after the first `step` lines of the story, in millilitres */
const ccLevel = (story: any[], step: number) => story.slice(0, step + 1).reduce((a: number, s: any) => (s.op === "use" ? a - s.amt : a + s.amt), 0);
const CC_TANK = { x: 90, w: 190, top: 40, bot: 420 };
/* the answer card and its phrase keys end at 1040 (stage 1104), well clear of the pad at stage 1170 */
const CC_CARD = { x: 700, w: 340, y: 16, h: 160 };
const CC_STORY = { x: 300, w: 380 };
const CC_BOT = 340; /* the floor of every bottle */
const CC_FREE_JARS = [{ id: "j100", cap: 100, hx: 52 }, { id: "j200", cap: 200, hx: 174 }, { id: "j250", cap: 250, hx: 296 }, { id: "j500", cap: 500, hx: 418 }];
const CC_FREE_POTS = [{ id: "b1", cap: 1000, x: 482, w: 110, top: 190, nw: 42, label: "1 L", shape: "bottle" }, { id: "b2", cap: 2000, x: 626, w: 140, top: 40, nw: 52, label: "2 L", shape: "bottle" }];
/* the top-lit fills of this tool's glassware and boxes (drawn once in Work's own <defs>) */
const ccDefs = () => (
  <defs>
    <linearGradient id="ccGlass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#EAF1F6" /></linearGradient>
    <linearGradient id="ccBox" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#F6EFE3" /></linearGradient>
    <linearGradient id="ccWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E2F2FC" /><stop offset="1" stopColor="#BFE0F4" /></linearGradient>
  </defs>
);
const ccJarSize = (cap: number) => ({ w: 50 + cap * 0.08, h: 60 + cap * 0.12 });

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  /* a measure drawn on the picture ("17 L 350 mL") with its unit symbols in the language in use */
  const U = (s: any) => String(s).replace(/\b(mL|L)\b/g, (m: string) => tx(m));
  const tl = useTimeline(); /* the traceback */
  const tp = useTimeline(); /* a jar tipping, a litre pouring across the line */
  const free = stage === "free";
  const kind = free ? "free" : item.kind;
  const key = free ? "free" : n + ":" + index;
  const [S, setS] = useState<any>({ key: "" });
  const [demo, setDemo] = useState<any>(null);
  const [tip, setTip] = useState<any>(null);
  const blank = () => ({ key, chip: -1, unit: 0, carried: false, swapped: false, broken: false, step: 0, dir: 1, ran: false,
    words: null, waiting: false, lv: {}, mk: {}, sel: "b1", res: {}, shown: false });
  const st: any = S.key === key ? S : blank();
  const put = (patch: any) => setS((p: any) => { const b = p.key === key ? p : blank(); return { ...b, ...(typeof patch === "function" ? patch(b) : patch), key }; });
  const dm = demo && demo.key === key ? demo : null;
  const live = (stage === "ask" || stage === "teach" || free) && !tl.busy;
  const settled = stage === "win" || stage === "idle";
  /* the child's next act wipes a correction's drawing */
  const touch = () => { if (dm) setDemo(null); };
  const tpp = slotPartsOf(typed, 2);

  /* ── the answer card's words (phase 3): the Enter that sends the measure sends them too ── */
  const wordsRef = useRef<any>(null);
  wordsRef.current = st.words;
  HOOK.pickWords = () => { if (item && item.words) { wordsRef.current = item.words; put({ words: item.words, waiting: false }); } };
  api.onEnter(kind === "story" && stage === "ask" ? (v: any) => {
    const ps = slotPartsOf(v === undefined ? typed : v, 2);
    if (!wordsRef.current) { put({ waiting: true }); api.say("Choose the words that answer the question."); return; }
    /* the answer that just missed, words and all, is never sent again unchanged */
    const lw = wrong && Array.isArray(wrong.value) ? wrong.value : null;
    if (lw && String(lw[0]) === ps[0] && String(lw[1]) === ps[1] && lw[2] === wordsRef.current) return;
    api.submit([ps[0], ps[1], wordsRef.current]);
  } : null);
  const pickWords = (id: string) => {
    if (!live) return;
    touch();
    wordsRef.current = id;
    put({ words: id, waiting: false });
    api.sfx.tick();
    /* after a miss the measure may stay as it was: new words make it a fresh answer */
    if (wrong && typed) api.setTyped(tpp.join("|"));
  };

  /* a correction wipes itself when the child types again */
  useEffect(() => { if (dm && typed !== dm.typed) setDemo(null); }, [typed]);

  /* ── the traceback: redraw the maths in steps, ending on the whole right answer ── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    const k = key, t0 = typed;
    /* phase 3: a miss with the right measure and the wrong words replays the tank and goes straight to
       the card; the unbundling is only for a measure that went wrong */
    const wordsOnly = kind === "story" && judgeSlotParts(item, wrong.value);
    const at = (s: number) => () => setDemo({ key: k, typed: t0, s, wordsOnly });
    const steps: any[] = [];
    const nStep = kind === "place" ? 4 : kind === "write" ? 2 : kind === "carry" || kind === "break" ? 5
      : kind === "story" ? (wordsOnly ? item.story.length + 1 : cardAt()) : kind === "pour" ? item.answer + 1 : kind === "pour2" ? Math.max(...item.answer) + 1 : 1;
    const ms = kind === "pour" || kind === "pour2" ? 240 : kind === "story" ? 850 : 750;
    for (let s = 1; s <= nStep; s++) {
      if (kind === "place" && s === 1) steps.push([ms, () => { put({ chip: 1 }); at(1)(); }]);
      else steps.push([ms, at(s)]);
    }
    tl.run(steps, () => api.lock(false));
    /* phase 3, first miss: the hint follows the error. A wrong measure gets the arithmetic hint, the right
       measure with the wrong words gets the words hint; both wrong keeps the item's own miss line */
    if (kind === "story" && wrong.tries === 1) {
      const w = ccWordsOf(wrong.value), measOk = judgeSlotParts(item, wrong.value), wordsOk = !w || w === item.words;
      const q = item.qid;
      if (!measOk && wordsOk) {
        if (q === "M2.S4.T8.C30:ML3") api.say("50 litres has no millilitres on top. Break a litre first.");
        if (q === "M2.S4.T8.C30:5") api.say("5 litres is the same as 4 litres and 1,000 millilitres.");
        if (q === "M2.S4.T8.C30:6") api.say("Did the tank run to the last line of the story?");
      } else if (measOk && !wordsOk) {
        if (q === "M2.S4.T8.C30:ML3") api.say("Does the question ask what is left, or what was used?");
        if (q === "M2.S4.T8.C30:5") api.say("Which words tell what is still in the jar?");
        if (q === "M2.S4.T8.C30:6") api.say("The story ends with water in the tank. Which words say that?");
      }
    }
  }, [wrong]);

  /* a win in phase 4: a count given without pouring still wins (the child may reason it out), but the
     bottle is filled first, one quick pouring at a time, and only then does the count drop into its cell.
     Two questions say which is more. */
  useEffect(() => {
    if (stage !== "win" || free) return;
    if (kind === "pour" || kind === "pour2") {
      const w = world();
      const steps: any[] = [[0, () => setTip(null)]];
      w.jars.forEach((j: any) => {
        const c = w.pots.find((p: any) => p.own === j.id);
        let lv = st.lv[c.id] || 0;
        while (lv < c.cap) {
          const nl = Math.min(c.cap, lv + j.cap);
          steps.push([110, () => put((b: any) => ({ lv: { ...b.lv, [c.id]: nl }, mk: { ...b.mk, [c.id]: [...(b.mk[c.id] || []), { j: j.id, a: nl - (b.lv[c.id] || 0), full: true }] } }))]);
          lv = nl;
        }
      });
      steps.push([200, () => put({ shown: true })]);
      tp.run(steps);
    }
    if (item.qid === "M2.S4.T8.C29:4") api.say("So the 2nd cow gives more milk.");
    if (item.qid === "M2.S4.T8.C31:8") api.say("The glass holds half as much, so it needs twice as many.");
  }, [stage]);

  /* ── pouring (phase 4 and Free play) ── */
  const world = (): any => {
    if (free) return { free: true, jars: CC_FREE_JARS, pots: CC_FREE_POTS };
    if (kind === "pour") return { jars: [{ id: "v", cap: item.jar, hx: 140 }], pots: [{ id: "c", cap: item.bottle, x: 360, w: 220, top: 40, nw: 60, own: "v", label: ccMeas(item.bottle), shape: item.pot }] };
    if (kind === "pour2") return { jars: [{ id: "mug", cap: 400, hx: 70, handle: true }, { id: "glass", cap: 200, hx: 214 }],
      pots: [{ id: "A", cap: item.bottle, x: 294, w: 160, top: 40, nw: 50, own: "mug", tag: "mug", label: ccMeas(item.bottle), shape: item.pot },
        { id: "B", cap: item.bottle, x: 522, w: 160, top: 40, nw: 50, own: "glass", tag: "glass", label: ccMeas(item.bottle), shape: item.pot }] };
    return null;
  };
  const pour = (jid: string, cid: string | null) => {
    const w = world();
    if (!w || tip) return;
    const j = w.jars.find((x: any) => x.id === jid);
    let c = w.free ? w.pots.find((p: any) => p.id === (cid || st.sel)) : w.pots.find((p: any) => p.own === jid);
    if (!j || !c) return;
    /* Free play: a tap on a jar when the chosen bottle is full goes to the other bottle */
    if (w.free && !cid && (st.lv[c.id] || 0) >= c.cap) c = w.pots.find((p: any) => (st.lv[p.id] || 0) < p.cap) || c;
    const lv = st.lv[c.id] || 0;
    if (lv >= c.cap) { if (w.free) put({ sel: c.id }); return; }
    const amt = Math.min(j.cap, c.cap - lv);
    put((b: any) => {
      const mk = [...(b.mk[c.id] || []), { j: jid, a: amt, full: amt === j.cap }];
      const nl = (b.lv[c.id] || 0) + amt;
      const res = { ...b.res };
      if (w.free && nl === c.cap && mk.every((m: any) => m.j === jid && m.full)) res[c.id + ":" + jid] = mk.length;
      /* once it is full, the selection moves on to a bottle that still has room */
      const other = nl >= c.cap ? w.pots.find((p: any) => p.id !== c.id && (b.lv[p.id] || 0) < p.cap) : null;
      return { lv: { ...b.lv, [c.id]: nl }, mk: { ...b.mk, [c.id]: mk }, res, sel: w.free ? (other ? other.id : c.id) : b.sel };
    });
    api.sfx.tick();
    tp.run([[0, () => setTip({ j: jid, c: c.id })], [420, () => setTip(null)]]);
  };
  const emptyPot = (cid: string) => { if (!live) return; touch(); put((b: any) => ({ lv: { ...b.lv, [cid]: 0 }, mk: { ...b.mk, [cid]: [] } })); };

  /* ── every drag piece: the 40 millilitres, the carried thousand, a jar ── */
  const lay = n === 1 ? { join: 106, head: 156, lane: -1, row0: 172 } : { join: 28, head: 74, lane: 88, row0: 150 };
  const rowY = (k: number) => lay.row0 + 80 * k;
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!live || !pay) return;
    touch();
    const tapped = !moved || !isFinite(p.x) || !isFinite(p.y);
    if (pay.k === "chip") {
      if (tapped) { put((b: any) => ({ chip: b.chip < 0 ? 0 : 1 - b.chip })); api.sfx.tick(); return; }
      const inCol = p.x > CC_FX.bx[0] - 70 && p.x < CC_FX.right + 40 && p.y > rowY(0) - 60 && p.y < rowY(0) + 132;
      if (!inCol) { put({ chip: -1 }); return; }
      put({ chip: Math.abs(p.x - 606) <= Math.abs(p.x - 694) ? 0 : 1 });
      api.sfx.tick();
      return;
    }
    if (pay.k === "carry") {
      if (tapped || (p.x > 280 && p.x < 520 && p.y > 30 && p.y < 500)) { put({ carried: true }); api.sfx.tick(); }
      return;
    }
    if (pay.k === "jar") {
      const w = world();
      if (!w) return;
      if (tapped) { pour(pay.id, null); return; }
      const mid = (c: any) => Math.abs(p.x - (c.x + c.w / 2));
      const over = w.pots.filter((c: any) => p.x > c.x - 50 && p.x < c.x + c.w + 50 && p.y > c.top - 90 && p.y < CC_BOT + 20)
        .sort((a: any, b: any) => mid(a) - mid(b))[0];
      /* a jar dropped on another jar's jug pours nothing: it goes back */
      if (over && (w.free || over.own === pay.id)) pour(pay.id, over.id);
    }
  });
  const dg = drag.drag;
  const dragging = (k: string, id?: string) => dg && dg.payload && dg.payload.k === k && (id === undefined || dg.payload.id === id);

  /* ── the column frame (phases 1 and 2) ── */
  const cells = (y: number, L: any, ml: any, o: any = {}) => {
    const all = String(ml ?? "").split("");
    /* one digit too many stands on the joining line with no box; more than that is clamped to the last
       three, with a small mark on the line saying the number runs on */
    const many = all.length > 4;
    const digs = many ? all.slice(-3) : all;
    const over = Math.max(0, digs.length - 3);
    const nz = all.findIndex((d) => d !== "0");
    const lead = many ? 0 : nz < 0 ? digs.length : nz;
    return (
      <g>
        <g filter="url(#fShadowSoft)">
          <rect x={CC_FX.lx} y={y} width={CC_FX.lw} height={72} rx={10} fill="url(#ccBox)" stroke={CC.line} strokeWidth={2} />
          {CC_FX.bx.map((bx, k) => <rect key={"b" + k} x={bx} y={y} width={CC_FX.bw} height={72} rx={10} fill="url(#ccBox)" stroke={CC.line} strokeWidth={2} />)}
        </g>
        {many && (
          <g pointerEvents="none">
            <rect x={CC_FX.div - 15} y={y + 22} width={30} height={28} rx={8} fill="#FFFFFF" stroke={CC.line} strokeWidth={1.5} />
            {[-8, 0, 8].map((dx) => <circle key={"o" + dx} cx={CC_FX.div + dx} cy={y + 36} r={3.5} fill={C.ink} />)}
          </g>
        )}
        {L !== "" && L !== null && L !== undefined && (
          <text x={CC_FX.lr} y={y + 56} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={CC_INK.big}>{String(L)}</text>
        )}
        {digs.map((d, k) => {
          const slot = k - over;
          return (
            <text key={"d" + k} x={slot >= 0 ? CC_FX.bx[slot] + 40 : CC_FX.div} y={y + 56} textAnchor="middle" fontSize={T.xl} fontWeight={700}
              fill={k < lead ? CC.zero : CC_INK.small}>{d}</text>
          );
        })}
        {o.strike && (
          <g stroke={CC.line} strokeWidth={4} strokeLinecap="round">
            <line x1={CC_FX.lx + 58} y1={y + 36} x2={CC_FX.lx + 150} y2={y + 36} />
            <line x1={CC_FX.bx[0] + 10} y1={y + 36} x2={CC_FX.bx[2] + 70} y2={y + 36} />
          </g>
        )}
      </g>
    );
  };
  const frame = (o: any) => {
    const nr = o.rows.length, yA = rowY(nr) + 10;
    const bottom = o.ans ? yA + 72 : rowY(nr) - 8;
    return (
      <g>
        <text x={CC_FX.lr} y={lay.join} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{`1 ${tx(o.units[0])} =`}</text>
        <text x={CC_FX.bx[0]} y={lay.join} fontSize={T.micro} fontWeight={600} fill={C.ink}>{`1,000 ${tx(o.units[1])}`}</text>
        <text x={CC_FX.lc} y={lay.head} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK.big}>{tx(o.units[0])}</text>
        <text x={CC_FX.mc} y={lay.head} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK.small}>{tx(o.units[1])}</text>
        <line x1={330} y1={lay.head + 10} x2={CC_FX.right} y2={lay.head + 10} stroke={CC.line} strokeWidth={2} />
        <line x1={CC_FX.div} y1={lay.head - 34} x2={CC_FX.div} y2={bottom} stroke={CC.line} strokeWidth={4} />
        {o.rows.map((r: any, k: number) => (
          <g key={"r" + k}>
            {cells(rowY(k), r.L, r.ml, { strike: r.strike })}
            {r.sign && <text x={CC_FX.sign} y={rowY(k) + 50} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{r.sign}</text>}
            {r.label && <text x={284} y={rowY(k) + 46} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(r.label)}</text>}
          </g>
        ))}
        {o.ans && <line x1={300} y1={yA - 6} x2={CC_FX.right} y2={yA - 6} stroke={CC.line} strokeWidth={3} />}
        {o.ans && cells(yA, o.ans.L, o.ans.ml)}
        {o.lane && o.lane.chip && (
          <g>
            <rect x={428} y={lay.lane + 2} width={68} height={48} rx={12} fill={CC.big} stroke={shade(CC.big, 0.3)} strokeWidth={2} />
            <text x={462} y={lay.lane + 37} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{U("1 L")}</text>
          </g>
        )}
        {o.lane && o.lane.lText && <text x={CC_FX.lr} y={lay.lane + 44} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={CC_INK.amber}>{o.lane.lText}</text>}
        {o.lane && o.lane.mlText && <text x={CC_FX.mc} y={lay.lane + 44} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={o.lane.mlInk}>{o.lane.mlText}</text>}
        {o.card && (
          <g pointerEvents="none">
            <rect x={806} y={yA} width={270} height={72} rx={16} fill="#FFFFFF" stroke={CC.line} strokeWidth={2} />
            <text x={941} y={yA + 47} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={o.cardInk || C.ink}>{U(o.card)}</text>
          </g>
        )}
      </g>
    );
  };

  /* phase 1: the unit switch relabels the frame; the three millilitres boxes stay */
  /* a correction redraws the frame in litres and millilitres, so the switch shows that pair while it stands */
  const unitOn = dm ? 0 : st.unit;
  const unitSwitch = () => (
    <g>
      {CC_UNITS.map((u, k) => (
        <Key key={"u" + k} id={"unit-" + k} label={CC_UNIT_NAMES[k]} x={330 + 155 * k} y={0} w={150} h={72} C={C} primary={unitOn === k}
          onClick={() => { if (!live) return; touch(); put({ unit: k }); }}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={unitOn === k ? "#FFFFFF" : C.ink}>{tx(u[0]) + "  " + tx(u[1])}</text>
        </Key>
      ))}
    </g>
  );
  const units = dm ? CC_UNITS[0] : CC_UNITS[st.unit];

  /* the 40 millilitres of phase 1, question 1: slid into two of the three boxes */
  const chipPiece = () => {
    const pos = dragging("chip") ? { x: dg.x - 84, y: dg.y - 36 } : st.chip < 0 ? { x: 70, y: rowY(0) } : { x: CC_FX.bx[st.chip], y: rowY(0) };
    /* no keyboard trap: once the 40 sits in the boxes and both answer boxes are filled, Enter answers
       (Space still slides it) */
    const keys = drag.keys({ k: "chip" });
    const onKeyDown = (e: any) => { if (e.key === "Enter" && st.chip >= 0 && tpp[0] && tpp[1]) return; keys.onKeyDown(e); };
    return (
      <g transform={`translate(${pos.x},${pos.y})`} {...control("chip-40", "40 millilitres")} {...drag.bind({ k: "chip" })} onKeyDown={onKeyDown}>
        <rect x={0} y={0} width={168} height={72} fill="transparent" />
        <g filter={dragging("chip") ? "url(#fLift)" : "url(#fShadowSoft)"}>
          <rect x={0} y={0} width={80} height={72} rx={10} fill="url(#ccBox)" stroke={CC.small} strokeWidth={4} />
          <rect x={88} y={0} width={80} height={72} rx={10} fill="url(#ccBox)" stroke={CC.small} strokeWidth={4} />
        </g>
        <text x={40} y={56} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CC_INK.small}>4</text>
        <text x={128} y={56} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CC_INK.small}>0</text>
      </g>
    );
  };

  /* the measuring jug of a phase 1 correction: the child's row read as it stands, beside the true measure */
  const readingJug = () => {
    const ds = String((dm && dm.typed) || "");
    if (!dm || !ds || ds.length > 3) return null;
    const r = Number((ds + "000").slice(0, 3)), truth = item.ml;
    if (r === truth) return null;
    const top = 110, bot = 470, yOf = (ml: number) => bot - (ml / 1000) * (bot - top);
    const yr = yOf(r), yt = yOf(truth);
    const lr = Math.min(yr + 10, yt - 30);
    return (
      <g pointerEvents="none">
        <rect x={930} y={top} width={136} height={bot - top} rx={14} fill="url(#ccGlass)" stroke={CC.line} strokeWidth={2.5} filter="url(#fShadowSoft)" />
        <rect x={934} y={yr} width={128} height={bot - 4 - yr} rx={10} fill="url(#ccWater)" />
        <line x1={930} y1={yr} x2={1066} y2={yr} stroke={CC.waterEdge} strokeWidth={3} />
        <line x1={930} y1={yt} x2={1066} y2={yt} stroke={CC.line} strokeWidth={2.5} strokeDasharray="8 6" />
        <line x1={920} y1={top} x2={930} y2={top} stroke={CC.line} strokeWidth={2} />
        <text x={920} y={top + 10} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{U("1 L")}</text>
        {lr > top + 44 && <text x={920} y={lr} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={CC_INK.small}>{U(ccNum(r) + " mL")}</text>}
        <text x={920} y={Math.min(yt + 10, bot + 6)} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={CC_INK.small}>{U(truth + " mL")}</text>
      </g>
    );
  };

  /* ── phase 3: the tank, the story card, the run control, the answer card ── */
  const tankPic = () => {
    const story = item.story, max = story[0].amt;
    const step = dm ? Math.min(dm.s - 1, story.length - 1) : st.step;
    const lvl = ccLevel(story, step);
    const H = CC_TANK.bot - CC_TANK.top, yOf = (ml: number) => CC_TANK.bot - (ml / max) * H;
    const tick = max > 10000 ? 10000 : 1000;
    const marks: number[] = [];
    for (let m = tick; m <= max; m += tick) marks.push(m);
    const yl = yOf(lvl);
    return (
      <g pointerEvents="none">
        {marks.map((m) => (
          <g key={"m" + m}>
            <line x1={CC_TANK.x - 12} y1={yOf(m)} x2={CC_TANK.x} y2={yOf(m)} stroke={CC.line} strokeWidth={2} />
            <text x={CC_TANK.x - 16} y={yOf(m) + 10} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{U(m / 1000 + " L")}</text>
          </g>
        ))}
        <rect x={CC_TANK.x} y={CC_TANK.top} width={CC_TANK.w} height={H} rx={16} fill="url(#ccGlass)" stroke={CC.line} strokeWidth={3} filter="url(#fShadowSoft)" />
        {lvl > 0 && <rect x={CC_TANK.x + 4} y={yl} width={CC_TANK.w - 8} height={CC_TANK.bot - 4 - yl} rx={12} fill="url(#ccWater)" />}
        {lvl > 0 && <line x1={CC_TANK.x + 4} y1={yl} x2={CC_TANK.x + CC_TANK.w - 4} y2={yl} stroke={CC.waterEdge} strokeWidth={3} />}
        <text x={CC_TANK.x + CC_TANK.w / 2} y={CC_TANK.bot + 40} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(item.vessel)}</text>
        {dm && (
          <g>
            <rect x={CC_TANK.x - 8} y={yl + (CC_TANK.bot - yl > 56 ? 8 : -52)} width={CC_TANK.w + 16} height={44} rx={12} fill="#FFFFFF" stroke={CC.line} strokeWidth={2} />
            <text x={CC_TANK.x + CC_TANK.w / 2} y={yl + (CC_TANK.bot - yl > 56 ? 40 : -20)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{U(ccMeas(lvl))}</text>
          </g>
        )}
      </g>
    );
  };
  const storyCard = () => {
    const story = item.story, lit = dm ? Math.min(dm.s - 1, story.length - 1) : st.step;
    const h = 16 + 64 * story.length;
    return (
      <g pointerEvents="none">
        <rect x={CC_STORY.x} y={16} width={CC_STORY.w} height={h} rx={18} fill="url(#ccBox)" stroke={CC.line} strokeWidth={2} filter="url(#fShadowSoft)" />
        {story.map((s: any, k: number) => (
          <g key={"s" + k}>
            {k === lit && <rect x={CC_STORY.x + 8} y={24 + 64 * k} width={CC_STORY.w - 16} height={56} rx={12} fill="none" stroke={C.accent} strokeWidth={4} />}
            <text x={CC_STORY.x + 20} y={64 + 64 * k} fontSize={T.label} fontWeight={700} fill={C.ink}>{U(ccMeas(s.amt))}</text>
            <text x={CC_STORY.x + CC_STORY.w - 18} y={64 + 64 * k} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(s.verb)}</text>
          </g>
        ))}
      </g>
    );
  };
  const runKeyY = () => 88 + 64 * item.story.length;
  /* the correction's last step: the answer card; before it, a take-away from whole litres is unbundled */
  const cardAt = () => item.story.length + (item.unbundle && !(dm && dm.wordsOnly) ? 4 : 1);
  /* the unbundling, in amber: 50 L becomes 49 L and 1,000 mL, then 1,000 less 650, then 49 less 32 */
  const unbundleRows = () => {
    const u = item.unbundle;
    if (!u || !dm || dm.wordsOnly) return null;
    const s0 = item.story.length, x0 = CC_STORY.x + 16, xr = CC_STORY.x + CC_STORY.w - 16, y0 = runKeyY() + 118;
    return (
      <g pointerEvents="none">
        {dm.s > s0 && (
          <g>
            <text x={x0} y={y0} fontSize={T.label} fontWeight={700} fill={C.ink}>{U(u.from)}</text>
            <line x1={x0 - 4} y1={y0 - 11} x2={x0 + 4 + 17 * u.from.length} y2={y0 - 11} stroke={CC.line} strokeWidth={3} />
            <path d={`M ${x0 + 84} ${y0 - 11} H ${x0 + 106} M ${x0 + 96} ${y0 - 21} L ${x0 + 108} ${y0 - 11} L ${x0 + 96} ${y0 - 1}`} fill="none" stroke={CC.line} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            <text x={x0 + 118} y={y0} fontSize={T.label} fontWeight={700} fill={CC_INK.amber}>{U(u.to)}</text>
          </g>
        )}
        {dm.s > s0 + 1 && (
          <g>
            <text x={x0} y={y0 + 54} fontSize={T.label} fontWeight={700} fill={CC_INK.amber}>{u.ml}</text>
            <text x={xr} y={y0 + 54} textAnchor="end" fontSize={T.label} fontWeight={700} fill={CC_INK.small}>{U(u.mlAns)}</text>
          </g>
        )}
        {dm.s > s0 + 2 && (
          <g>
            <text x={x0} y={y0 + 108} fontSize={T.label} fontWeight={700} fill={CC_INK.amber}>{u.L}</text>
            <text x={xr} y={y0 + 108} textAnchor="end" fontSize={T.label} fontWeight={700} fill={CC_INK.big}>{U(u.LAns)}</text>
          </g>
        )}
      </g>
    );
  };
  const runStory = () => {
    if (!live) return;
    touch();
    const last = item.story.length - 1;
    put((b: any) => {
      let step = b.step, dir = b.dir;
      if (dir > 0) { if (step < last) step++; else { dir = -1; step--; } }
      else if (step > 0) step--;
      else { dir = 1; step++; }
      return { step, dir, ran: b.ran || step === last };
    });
  };
  const answerCard = () => {
    const showRight = dm && dm.s >= cardAt();
    const wid = showRight ? item.words : settled ? st.words || item.words : st.words;
    const ph = item.phrases.find((p: any) => p.id === wid);
    const L = showRight ? String(item.answer[0]) : tpp[0], m = showRight ? String(item.answer[1]) : tpp[1];
    const meas = (L || "__") + " L " + (m ? ccNum(Number(m)) : "___") + " mL";
    return (
      <g pointerEvents="none">
        <rect x={CC_CARD.x} y={CC_CARD.y} width={CC_CARD.w} height={CC_CARD.h} rx={18} fill="url(#ccBox)" stroke={showRight ? C.accent : CC.line} strokeWidth={showRight ? 5 : 2} filter="url(#fShadowSoft)" />
        <text x={CC_CARD.x + CC_CARD.w / 2} y={CC_CARD.y + 66} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={L || m ? CC_INK.left : C.ink}>{U(meas)}</text>
        {ph ? (
          <text x={CC_CARD.x + CC_CARD.w / 2} y={CC_CARD.y + 128} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(ph.label)}</text>
        ) : (
          <rect x={CC_CARD.x + 60} y={CC_CARD.y + 96} width={CC_CARD.w - 120} height={44} rx={10} fill="none" stroke={CC.line} strokeWidth={2} strokeDasharray="10 8" />
        )}
      </g>
    );
  };

  /* ── phase 4 and Free play: jars, the bucket, the bottles, the pour counter, the results table ── */
  const jarShape = (j: any, fullNow: boolean, o: any = {}) => {
    const { w, h } = ccJarSize(j.cap), bw = w * 0.78;
    const path = `M ${-w / 2} ${-h} L ${w / 2} ${-h} L ${bw / 2} 0 L ${-bw / 2} 0 Z`;
    const wy = -h * 0.82, ww = w - (w - bw) * 0.18;
    return (
      <g>
        {j.handle && <path d={`M ${w / 2 - 6} ${-h * 0.8} C ${w / 2 + 26} ${-h * 0.8}, ${w / 2 + 26} ${-h * 0.25}, ${bw / 2 + 2} ${-h * 0.25}`} fill="none" stroke={CC.line} strokeWidth={5} />}
        <path d={path} fill="url(#ccGlass)" stroke={CC.line} strokeWidth={3} strokeLinejoin="round" filter={o.lift ? undefined : "url(#fShadowSoft)"} />
        {fullNow && <path d={`M ${-ww / 2 + 3} ${wy} L ${ww / 2 - 3} ${wy} L ${bw / 2 - 3} -3 L ${-bw / 2 + 3} -3 Z`} fill="url(#ccWater)" />}
        {!o.bare && <text x={0} y={-h - 14} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{U(j.cap + " mL")}</text>}
      </g>
    );
  };
  const jarPiece = (j: any, w: any) => {
    const { h, w: jw } = ccJarSize(j.cap), bw = Math.max(90, jw + 10);
    const tipping = tip && tip.j === j.id;
    const pot = tipping ? w.pots.find((c: any) => c.id === tip.c) : null;
    const pos = dragging("jar", j.id) ? { x: dg.x, y: dg.y + h / 2, r: 0 }
      : pot ? { x: pot.x + pot.w / 2 - 34, y: pot.top + 30, r: 40 } : { x: j.hx, y: 356, r: 0 };
    /* no keyboard trap: once its own bottle is full, Enter passes on to answer */
    const own = w.free ? null : w.pots.find((c: any) => c.own === j.id);
    const keys = drag.keys({ k: "jar", id: j.id });
    const onKeyDown = (e: any) => { if (e.key === "Enter" && own && (st.lv[own.id] || 0) >= own.cap) return; keys.onKeyDown(e); };
    return (
      <g key={j.id} transform={`translate(${pos.x},${pos.y}) rotate(${pos.r})`} {...control("jar-" + j.id, j.cap + " millilitre jar")}
        {...drag.bind({ k: "jar", id: j.id })} onKeyDown={onKeyDown}>
        <rect x={-bw / 2} y={-h - 44} width={bw} height={h + 50} fill="transparent" />
        <g filter={dragging("jar", j.id) ? "url(#fLift)" : undefined}>{jarShape(j, !tipping, { bare: tipping, lift: dragging("jar", j.id) })}</g>
      </g>
    );
  };
  const potShape = (c: any, lv: number, on: boolean) => {
    const H = CC_BOT - c.top, wh = Math.min(1, lv / c.cap) * (H - 6);
    /* a bottle has a neck; a jug has an open top with a spout and a handle */
    const jug = c.shape === "jug";
    return (
      <g pointerEvents="none">
        <g filter="url(#fShadowSoft)">
          {jug ? (
            <g>
              <path d={`M ${c.x + c.w} ${c.top + 34} C ${c.x + c.w + 44} ${c.top + 34}, ${c.x + c.w + 44} ${c.top + 150}, ${c.x + c.w} ${c.top + 160}`} fill="none" stroke={CC.line} strokeWidth={6} strokeLinecap="round" />
              <path d={`M ${c.x + 6} ${c.top + 2} L ${c.x - 22} ${c.top - 18} L ${c.x + 34} ${c.top + 2} Z`} fill="url(#ccGlass)" stroke={CC.line} strokeWidth={2.5} strokeLinejoin="round" />
            </g>
          ) : (
            <rect x={c.x + c.w / 2 - c.nw / 2} y={c.top - 30} width={c.nw} height={36} rx={6} fill="url(#ccGlass)" stroke={CC.line} strokeWidth={2.5} />
          )}
          <rect x={c.x} y={c.top} width={c.w} height={H} rx={18} fill="url(#ccGlass)" stroke={on ? C.accent : CC.line} strokeWidth={on ? 5 : 2.5} />
        </g>
        {wh > 0 && <rect x={c.x + 4} y={CC_BOT - 3 - wh} width={c.w - 8} height={wh} rx={Math.min(12, wh / 2)} fill="url(#ccWater)" />}
        <line x1={c.x + 3} y1={c.top + 3} x2={c.x + c.w - 3} y2={c.top + 3} stroke={CC.line} strokeWidth={2} strokeDasharray="8 6" />
        {c.tag && <text x={c.x + 14} y={c.top + 40} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(c.tag)}</text>}
        <text x={c.x + c.w / 2} y={CC_BOT + 38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{U(c.label)}</text>
      </g>
    );
  };
  const counter = (cx: number, list: any[], pitch: number) => {
    const nm = list.length, gap = 6, total = nm * pitch + Math.floor(Math.max(nm - 1, 0) / 5) * gap;
    const x0 = cx - total / 2, half = Math.max(free ? 48 : 70, total / 2 + 12);
    return (
      <g pointerEvents="none">
        <line x1={cx - half} y1={CC_BOT + 88} x2={cx + half} y2={CC_BOT + 88} stroke={CC.line} strokeWidth={2} />
        {list.map((m: any, k: number) => {
          const hh = m.full ? 34 : 17;
          return <rect key={"k" + k} x={x0 + k * pitch + Math.floor(k / 5) * gap} y={CC_BOT + 86 - hh} width={pitch - 5} height={hh} rx={3} fill={CC.count} stroke={shade(CC.count, 0.3)} strokeWidth={1} />;
        })}
      </g>
    );
  };
  const bucket = (x0: number, x1: number) => (
    <g pointerEvents="none">
      <path d={`M ${x0} 372 L ${x1} 372 L ${x1 - 22} 500 L ${x0 + 22} 500 Z`} fill="url(#ccGlass)" stroke={CC.line} strokeWidth={3} strokeLinejoin="round" filter="url(#fShadowSoft)" />
      <rect x={x0 + 6} y={384} width={x1 - x0 - 12} height={22} rx={10} fill="url(#ccWater)" />
    </g>
  );
  /* the results table: this question's jars only, every cell empty until the bottle is full and the
     count has been given (the count then drops in) */
  const resultsTable = () => {
    const show = st.shown || stage === "idle";
    const two = kind === "pour2";
    const rows: any[] = two ? item.jars.map((j: any, q: number) => ({ label: U(j.cap + " mL") + " " + tx(j.id), v: item.answer[q] })) : [{ label: U(item.jar + " mL"), v: item.answer }];
    return (
      <g pointerEvents="none">
        <rect x={760} y={16} width={326} height={60 + 64 * rows.length} rx={16} fill="url(#ccBox)" stroke={CC.line} strokeWidth={2} filter="url(#fShadowSoft)" />
        <text x={776} y={58} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(item.head)}</text>
        <text x={1070} y={58} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("pourings")}</text>
        <line x1={760} y1={72} x2={1086} y2={72} stroke={CC.line} strokeWidth={2} />
        {rows.map((r: any, k: number) => (
          <g key={"t" + k}>
            <text x={776} y={118 + 64 * k} fontSize={two ? T.micro : T.label} fontWeight={600} fill={C.ink}>{r.label}</text>
            <rect x={988} y={84 + 64 * k} width={82} height={50} rx={10} fill="#FFFFFF" stroke={CC.line} strokeWidth={2} strokeDasharray={show ? undefined : "8 6"} />
            {show && <text x={1029} y={120 + 64 * k} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK.count}>{String(r.v)}</text>}
          </g>
        ))}
      </g>
    );
  };
  /* Free play's table: a row for each jar, a column for each bottle, a cell filled only by a pouring */
  const freeTable = () => {
    const x0 = 820, c1 = 944, cw = 71, top = 16, hh = 52, rh = 52;
    return (
      <g pointerEvents="none">
        <rect x={x0} y={top} width={1086 - x0} height={hh + rh * CC_FREE_JARS.length + 8} rx={16} fill="url(#ccBox)" stroke={CC.line} strokeWidth={2} filter="url(#fShadowSoft)" />
        <text x={x0 + 16} y={top + 36} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("jar")}</text>
        {CC_FREE_POTS.map((c, k) => <text key={"h" + k} x={c1 + cw * k + cw / 2} y={top + 36} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{U(c.label)}</text>)}
        <line x1={x0} y1={top + hh} x2={1086} y2={top + hh} stroke={CC.line} strokeWidth={2} />
        <line x1={c1} y1={top + 8} x2={c1} y2={top + hh + rh * CC_FREE_JARS.length} stroke={CC.line} strokeWidth={1.5} />
        <line x1={c1 + cw} y1={top + 8} x2={c1 + cw} y2={top + hh + rh * CC_FREE_JARS.length} stroke={CC.line} strokeWidth={1.5} />
        {CC_FREE_JARS.map((j, r) => (
          <g key={"fr" + r}>
            <text x={x0 + 12} y={top + hh + rh * r + 37} fontSize={T.micro} fontWeight={600} fill={C.ink}>{U(j.cap + " mL")}</text>
            {CC_FREE_POTS.map((c, k) => {
              const v = st.res[c.id + ":" + j.id];
              return (
                <g key={"c" + k}>
                  <rect x={c1 + cw * k + 12} y={top + hh + rh * r + 8} width={cw - 24} height={38} rx={8} fill="#FFFFFF" stroke={CC.line} strokeWidth={1.5} strokeDasharray={v === undefined ? "6 5" : undefined} />
                  {v !== undefined && <text x={c1 + cw * k + cw / 2} y={top + hh + rh * r + 37} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC_INK.count}>{String(v)}</text>}
                </g>
              );
            })}
          </g>
        ))}
      </g>
    );
  };
  /* a correction on a bottle: the bottle marked off one pouring at a time, the count written under it */
  const bands = (c: any, jarCap: number, upto: number, total: number, word: string, py: number) => {
    const H = CC_BOT - c.top - 6, step = H * (jarCap / c.cap);
    const shown = Math.min(upto, total);
    return (
      <g pointerEvents="none">
        {Array.from({ length: shown }).map((_, k) => (
          <g key={"band" + k}>
            <rect x={c.x + 4} y={CC_BOT - 3 - step * (k + 1)} width={c.w - 8} height={step} fill="url(#ccWater)" stroke={CC.waterEdge} strokeWidth={2} />
            {total <= 8 && <text x={c.x + c.w / 2} y={CC_BOT - 3 - step * k - step / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{String(k + 1)}</text>}
          </g>
        ))}
        {upto > total && (
          <g>
            <rect x={30} y={py} width={220} height={52} rx={14} fill="url(#ccBox)" stroke={CC.line} strokeWidth={2} filter="url(#fShadowSoft)" />
            <text x={140} y={py + 37} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK.count}>{total + " " + tx(word)}</text>
          </g>
        )}
      </g>
    );
  };

  /* what the host and the agent read back (toolApi.getState); never an answer before it is given */
  api.share({
    operation: kind === "carry" || kind === "place" ? "add" : kind === "break" || kind === "story" ? "take away" : kind === "write" ? "write" : "pour",
    unit: CC_UNITS[st.unit].join(" "), chip: st.chip, carries: st.carried ? 1 : 0, breaks: st.broken ? 1 : 0, rowsSwapped: st.swapped,
    storyLinesRun: kind === "story" ? st.step : null, answerCard: st.words,
    pourings: Object.values(st.mk).reduce((a: number, l: any) => a + l.length, 0),
  });

  /* ── one invite: a ring that hugs the one thing to touch next ── */
  let inv: any = null;
  if (stage === "ask" && !tl.busy) {
    if (!dm && kind === "place" && st.chip < 0) inv = { x: 60, y: rowY(0) - 10, w: 188, h: 92 };
    if (!dm && kind === "carry" && !st.carried) inv = { x: 820, y: rowY(0) - 10, w: 190, h: 92 };
    /* the cow question opens on the slot (its caret is the cue); the swap and the break are pointed at
       only after a first miss */
    /* (the ring on the "break" tag waits until the correction's drawing is gone, since that drawing
       shows the litre already broken and hides the tag) */
    if (kind === "break" && wrong) inv = !st.swapped ? { x: 40, y: rowY(0) + 30, w: 110, h: 92 }
      : !st.broken && !dm ? { x: CC_FX.lc - 64, y: lay.lane - 4, w: 128, h: 62 } : null;
    if (!dm && kind === "story") inv = !st.ran ? { x: 325, y: runKeyY() - 10, w: 170, h: 92 } : !st.words ? { x: CC_CARD.x - 10, y: 186, w: CC_CARD.w + 20, h: 256 } : null;
    if (!dm && (kind === "pour" || kind === "pour2")) {
      const w = world();
      const j = w.jars.find((x: any) => (st.lv[w.pots.find((c: any) => c.own === x.id).id] || 0) < item.bottle);
      /* the ring clears the label (about 96 wide) and a mug's handle by at least 12 */
      if (j) {
        const sz = ccJarSize(j.cap), lh = 48, left = Math.max(lh, sz.w / 2) + 12, right = Math.max(lh, sz.w / 2 + (j.handle ? 30 : 0)) + 12;
        inv = { x: j.hx - left, y: 356 - sz.h - 52, w: left + right, h: sz.h + 62 };
      }
    }
  }
  const ring = () => inv && <rect className="c4-pulse" x={inv.x} y={inv.y} width={inv.w} height={inv.h} rx={22} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />;

  /* ════ phase 1 ════ */
  if (kind === "place" || kind === "write") {
    const place = kind === "place";
    let rows: any[], ans: any = null, card: any = null;
    if (place) {
      rows = [{ L: item.rows[0].L, ml: st.chip === 1 ? "0" : "" }, { L: item.rows[1].L, ml: ccPad3(item.rows[1].ml), sign: "+" }];
      ans = dm ? { L: dm.s >= 3 ? String(item.answer[0]) : "", ml: dm.s >= 2 ? ccPad3(item.answer[1]) : "" } : { L: tpp[0], ml: tpp[1] };
      card = dm && dm.s >= 4 ? ccMeas(item.answer[0] * 1000 + item.answer[1]) : null;
    } else {
      rows = [{ L: item.L, ml: dm && dm.s >= 2 ? item.answer : typed }];
    }
    return (
      <g>
        {ccDefs()}
        {unitSwitch()}
        {frame({ units, rows, ans, card })}
        {!place && <text x={150} y={rowY(0) + 50} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{U(item.card)}</text>}
        {place && st.chip < 0 && !dragging("chip") && <text x={258} y={rowY(0) + 48} fontSize={T.label} fontWeight={700} fill={CC_INK.small}>{tx("mL")}</text>}
        {!place && readingJug()}
        {place && chipPiece()}
        {ring()}
      </g>
    );
  }

  /* ════ phase 2 ════ */
  if (kind === "carry" || kind === "break") {
    let rows: any[], lane: any = {}, ans: any, card: any = null, cardInk: any;
    if (kind === "carry") {
      const mlSum = item.rows.reduce((a: number, r: any) => a + r.ml, 0);
      rows = item.rows.map((r: any) => ({ L: r.L, ml: ccPad3(r.ml), sign: r.sign }));
      lane = { chip: st.carried || (dm && dm.s >= 2), mlText: dm && dm.s >= 1 ? indian(mlSum) : null, mlInk: CC_INK.small };
      ans = dm ? { L: dm.s >= 4 ? String(item.answer[0]) : "", ml: dm.s >= 3 ? ccPad3(item.answer[1]) : "" } : { L: tpp[0], ml: tpp[1] };
      card = dm && dm.s >= 5 ? ccMeas(item.answer[0] * 1000 + item.answer[1]) : null;
    } else {
      const swapped = dm ? true : st.swapped, broken = dm ? dm.s >= 2 : st.broken;
      const order = swapped ? [1, 0] : [0, 1];
      const top = item.rows[order[0]];
      rows = order.map((i: number, k: number) => ({ L: item.rows[i].L, ml: ccPad3(item.rows[i].ml), label: item.rows[i].label, sign: k === 1 ? "−" : undefined, strike: k === 0 && broken }));
      if (broken) lane = { lText: String(top.L - 1), mlText: indian(top.ml + 1000), mlInk: CC_INK.amber };
      ans = dm ? { L: dm.s >= 4 ? String(item.answer[0]) : "", ml: dm.s >= 3 ? ccPad3(item.answer[1]) : "" } : { L: tpp[0], ml: tpp[1] };
      card = dm && dm.s >= 5 ? ccMeas(item.answer[0] * 1000 + item.answer[1]) : null;
      cardInk = CC_INK.left;
    }
    const canBreak = kind === "break" && st.swapped && !st.broken;
    const doBreak = () => {
      if (!live || !canBreak) return;
      touch();
      put({ broken: true });
      api.sfx.tick();
      tp.run([[0, () => setTip({ k: "litre", at: 0 })], [280, () => setTip({ k: "litre", at: 1 })], [280, () => setTip(null)]]);
    };
    return (
      <g>
        {ccDefs()}
        {frame({ units: CC_UNITS[0], rows, lane, ans, card, cardInk })}
        {kind === "carry" && !st.carried && (() => {
          const pos = dragging("carry") ? { x: dg.x - 85, y: dg.y - 36 } : { x: 830, y: rowY(0) };
          return (
            <g transform={`translate(${pos.x},${pos.y})`} {...control("carry-litre", "carry 1,000 millilitres as a litre")} {...drag.bind({ k: "carry" })} {...drag.keys({ k: "carry" })}>
              <rect x={0} y={0} width={170} height={72} rx={14} fill="url(#ccBox)" stroke={CC.small} strokeWidth={4} filter={dragging("carry") ? "url(#fLift)" : "url(#fShadowSoft)"} />
              <text x={85} y={47} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK.small}>{U("1,000 mL")}</text>
            </g>
          );
        })()}
        {kind === "break" && (
          <Key id="swap-rows" label="swap the rows" x={50} y={rowY(0) + 40} w={90} h={72} C={C} onClick={() => { if (!live) return; touch(); put((b: any) => ({ swapped: !b.swapped, broken: false })); api.sfx.tick(); }}>
            <g stroke={C.ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M -12 16 L -12 -18 M -22 -8 L -12 -20 L -2 -8" />
              <path d="M 12 -16 L 12 18 M 2 8 L 12 20 L 22 8" />
            </g>
          </Key>
        )}
        {canBreak && !dm && (
          <g pointerEvents="none">
            <rect x={CC_FX.lc - 52} y={lay.lane + 6} width={104} height={42} rx={12} fill="url(#ccBox)" stroke={CC.line} strokeWidth={2} filter="url(#fShadowSoft)" />
            <text x={CC_FX.lc} y={lay.lane + 37} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("break")}</text>
          </g>
        )}
        {canBreak && <Hit id="break-litre" x={CC_FX.lx} y={lay.lane} w={CC_FX.lw} h={rowY(0) + 72 - lay.lane} onPress={doBreak} label="break a litre into 1,000 millilitres" enabled={live} />}
        {tip && tip.k === "litre" && (
          <g pointerEvents="none">
            <rect x={tip.at ? 560 : 380} y={rowY(0) + 10} width={112} height={52} rx={12} fill={tint(CC.small, 0.75)} stroke={CC.small} strokeWidth={3} />
          </g>
        )}
        {ring()}
      </g>
    );
  }

  /* ════ phase 3 ════ */
  if (kind === "story") {
    const last = item.story.length - 1;
    const back = (st.dir > 0 && st.step >= last) || (st.dir < 0 && st.step > 0);
    const ky = runKeyY();
    return (
      <g>
        {ccDefs()}
        {tankPic()}
        {storyCard()}
        {unbundleRows()}
        <Key id="run-story" label={back ? "run the story back" : "run the next line"} x={335} y={ky} w={150} h={72} C={C} onClick={runStory}>
          <text x={-18} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{back ? tx("back") : tx("run")}</text>
          <path d={back ? "M 50 -14 L 30 0 L 50 14 Z" : "M 34 -14 L 54 0 L 34 14 Z"} fill={C.ink} />
        </Key>
        {answerCard()}
        {item.phrases.map((p: any, k: number) => (
          <Key key={"w" + p.id} id={"words-" + p.id} label={p.label} x={CC_CARD.x} y={196 + 82 * k} w={CC_CARD.w} h={72} C={C} primary={st.words === p.id}
            onClick={() => pickWords(p.id)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={st.words === p.id ? "#FFFFFF" : C.ink}>{tx(p.label)}</text>
          </Key>
        ))}
        {ring()}
      </g>
    );
  }

  /* ════ phase 4 and Free play ════ */
  const w = world();
  if (!w) return <g />;
  const pitch = w.free ? 9 : kind === "pour2" ? 11 : 16;
  return (
    <g>
      {ccDefs()}
      {w.free ? bucket(8, 470) : bucket(20, kind === "pour2" ? 250 : 260)}
      {w.pots.map((c: any) => (
        <g key={"pot" + c.id}>
          {potShape(c, st.lv[c.id] || 0, w.free && st.sel === c.id)}
          {w.free && <Hit id={"bottle-" + c.id} x={c.x} y={c.top} w={c.w} h={CC_BOT - c.top} label={"pour into the " + c.label + " bottle"}
            onPress={() => { if (!live) return; put({ sel: c.id }); }} />}
          {counter(c.x + c.w / 2, st.mk[c.id] || [], pitch)}
          <Key id={"empty-" + c.id} label={"empty the " + (c.label) + " bottle"} x={c.x + c.w / 2 - 60} y={448} w={120} h={72} C={C} onClick={() => emptyPot(c.id)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("empty")}</text>
          </Key>
        </g>
      ))}
      {dm && kind === "pour" && bands(w.pots[0], item.jar, dm.s, item.answer, item.jarName, 40)}
      {dm && kind === "pour2" && bands(w.pots[0], 400, dm.s, item.answer[0], "mugs", 40)}
      {dm && kind === "pour2" && bands(w.pots[1], 200, dm.s, item.answer[1], "glasses", 104)}
      {w.free ? freeTable() : resultsTable()}
      {w.jars.map((j: any) => jarPiece(j, w))}
      {ring()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.answer === undefined || last.answer === null) return null;
  const a = last.answer, kind = last.kind, cy = h / 2;
  let body: any = null;
  if (kind === "write") {
    body = (
      <g>
        {String(a).split("").map((d: string, k: number) => (
          <g key={k}>
            <rect x={24 + 50 * k} y={cy - 26} width={44} height={52} rx={8} fill="#FFFFFF" stroke={CC.line} strokeWidth={2} />
            <text x={46 + 50 * k} y={cy + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={d === "0" && k < String(a).search(/[1-9]/) ? CC.zero : CC_INK.small}>{d}</text>
          </g>
        ))}
        <text x={184} y={cy + 12} fontSize={T.label} fontWeight={700} fill={CC_INK.small}>{tx("mL")}</text>
      </g>
    );
  } else if (kind === "pour") {
    body = (
      <g>
        {Array.from({ length: Number(a) }).map((_, k) => <rect key={k} x={20 + k * 16 + Math.floor(k / 5) * 6} y={cy - 17} width={11} height={34} rx={3} fill={CC.count} />)}
        <text x={w - 18} y={cy + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={CC_INK.count}>{String(a)}</text>
      </g>
    );
  } else if (kind === "pour2") {
    body = (
      <g>
        <text x={w / 2} y={cy - 6} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC_INK.count}>{a[0] + " " + tx("mugs")}</text>
        <text x={w / 2} y={cy + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC_INK.count}>{a[1] + " " + tx("glasses")}</text>
      </g>
    );
  } else if (Array.isArray(a)) {
    body = <text x={w / 2} y={cy + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={kind === "break" || kind === "story" ? CC_INK.left : C.ink}>{ccMeas(a[0] * 1000 + a[1]).replace(/\b(mL|L)\b/g, (m: string) => tx(m))}</text>;
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {body}
    </g>
  );
}

function CapacityColumns(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default CapacityColumns;
