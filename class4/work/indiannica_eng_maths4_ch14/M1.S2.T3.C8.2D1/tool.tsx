/* ═══ M1.S2.T3.C8.2D1 · tally_board · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "tally_board";
const MEDIA_ID = "M1.S2.T3.C8.2D1";
const TOOL_NAME = "Tally Board";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Answer cards are coming along the belt. One mark for each, as it comes."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every answer marked once, every bundle closed, and every row read in fives.";
/* said when the child opens Free play from the summary page (what free play really offers) */
const FREE_LINE = "Free play. Mark any answers from the belt, and line two rows up in the compare bar.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Tally Board": "मिलान चिह्न बोर्ड",
    "Answer cards are coming along the belt. One mark for each, as it comes.": "उत्तर कार्ड पट्टे पर आ रहे हैं। हर कार्ड के आते ही उसका एक चिह्न लगाओ।",
    "Every answer marked once, every bundle closed, and every row read in fives.": "हर उत्तर का एक ही चिह्न लगा, हर समूह पूरा हुआ। हर पंक्ति पाँच-पाँच करके पढ़ी गई।",
    "Free play. Mark any answers from the belt, and line two rows up in the compare bar.": "मुक्त खेल। कार्डों के चिह्न लगाओ, और तुलना पट्टी में दो पंक्तियाँ रखो।",
    "Every card needs its mark first.": "पहले हर कार्ड का चिह्न लगना चाहिए।",
    /* phase 1 */
    "One mark for each": "हर एक का एक चिह्न",
    "Where does this answer go? Find its row on the chart.": "यह उत्तर कहाँ जाएगा? चार्ट पर इसकी पंक्ति ढूँढो।",
    "Each card makes one mark in its own row.": "हर कार्ड अपनी पंक्ति में एक चिह्न बनाता है।",
    "Look at each card in turn. Is its mark in the row with its name?": "हर कार्ड को बारी-बारी से देखो। क्या उसका चिह्न उसके नाम वाली पंक्ति में है?",
    "One mark is drawn for each answer as it comes. So each answer gets one mark, and none is left to count later.": "हर उत्तर के आते ही उसका एक चिह्न बनता है। इसलिए हर उत्तर का एक चिह्न होता है। बाद में गिनने को कोई नहीं बचता।",
    "You learned: one mark for each answer, drawn as it comes.": "तुमने सीखा: हर उत्तर का एक चिह्न, उसके आते ही।",
    "Six children name their favourite pet. Tap the row for each card. Press Enter when every card is marked.": "छह बच्चे अपना मनपसंद पालतू जानवर बताते हैं। हर कार्ड के लिए उसकी पंक्ति पर टैप करो। सारे कार्डों के चिह्न लग जाएँ, तब एंटर दबाओ।",
    "Tally the pets": "पालतू जानवरों के चिह्न लगाओ",
    "Did every cat card go into the cat row?": "क्या सब बिल्ली कार्ड बिल्ली की पंक्ति में गए?",
    "Eight children choose a drink. Mark their cards the same way.": "आठ बच्चे एक पेय चुनते हैं। उनके कार्डों के चिह्न भी इसी तरह लगाओ।",
    "Tally the drinks": "पेयों के चिह्न लगाओ",
    "Check the milk row. Is a milk card marked somewhere else?": "दूध की पंक्ति जाँचो। क्या किसी दूध कार्ड का चिह्न कहीं और लगा है?",
    "Children said how they come to school, and each answer got its mark. How many answers were collected?": "बच्चों ने बताया कि वे स्कूल कैसे आते हैं। हर उत्तर का चिह्न लगा। कितने उत्तर इकट्ठे हुए?",
    "How many answers?": "कितने उत्तर?",
    "Count all the marks in every row together, each one once.": "सारी पंक्तियों के चिह्न मिलाकर गिनो। हर चिह्न एक ही बार।",
    /* phase 2 */
    "The fifth mark crosses the four": "पाँचवाँ चिह्न चारों को काटता है",
    "Count the standing marks. Where does the fifth one go?": "खड़े चिह्न गिनो। पाँचवाँ कहाँ जाएगा?",
    "The fifth mark lies across the marks standing before it.": "पाँचवाँ चिह्न खड़े चिह्नों पर आड़ा लगता है।",
    "Leave a gap after each bundle, then start the next one.": "हर समूह के बाद जगह छोड़ो, फिर अगला शुरू करो।",
    "Every fifth mark is drawn across the four before it, making a bundle of five.": "हर पाँचवाँ चिह्न पहले के चार पर आड़ा बनता है। इससे पाँच का एक समूह बनता है।",
    "You learned: the fifth mark lies across the four, making a bundle.": "तुमने सीखा: पाँचवाँ चिह्न चारों पर आड़ा लगकर समूह बनाता है।",
    "Show 17 in tally marks. Tap beside the marks to stand one up, or tap on them to lay one across. Then press Enter.": "17 को मिलान चिह्नों में दिखाओ। चिह्नों के बगल में टैप करो तो एक खड़ा चिह्न बनेगा। उन पर टैप करो तो एक आड़ा लगेगा। फिर एंटर दबाओ।",
    "Show 17 in tally marks": "17 के मिलान चिह्न बनाओ",
    "How many marks are standing in each bundle?": "हर समूह में कितने चिह्न खड़े हैं?",
    "Now think of 14. How many bundles of five and how many single marks does it take?": "अब 14 के बारे में सोचो। पाँच के कितने समूह, कितने अकेले चिह्न?",
    "14 in bundles and singles": "14 के समूह और अकेले चिह्न",
    "Draw 14 on the row first, then count what you made.": "पहले पंक्ति पर 14 बनाओ, फिर जो बना उसे गिनो।",
    "Draw tally marks for 20. How many of the marks lie across?": "20 के लिए मिलान चिह्न बनाओ। इनमें से कितने चिह्न आड़े हैं?",
    "Marks across for 20?": "20 में कितने आड़े चिह्न?",
    "Look at your row and count only the marks lying across.": "अपनी पंक्ति देखो और सिर्फ़ आड़े चिह्न गिनो।",
    /* phase 3 */
    "Reading a tally in fives": "मिलान चिह्न पाँच-पाँच में पढ़ना",
    "Count the bundles in fives. Then count on the marks left over.": "समूहों को पाँच-पाँच करके गिनो। फिर बचे हुए चिह्न आगे गिनो।",
    "What is each bundle worth?": "हर समूह कितने का है?",
    "Step the finger along. Say five, ten, fifteen at the bundles, then go on in ones.": "उँगली आगे बढ़ाओ। समूहों पर पाँच, दस, पंद्रह बोलो। फिर एक-एक करके गिनो।",
    "A tally is read by counting the bundles in fives and then the marks left over in ones.": "मिलान चिह्न पढ़ने के लिए समूहों को पाँच-पाँच में गिनते हैं। फिर बचे चिह्नों को एक-एक करके गिनते हैं।",
    "You learned: read a tally in fives, then count the marks left over.": "तुमने सीखा: पाँच-पाँच में पढ़ो, फिर बचे चिह्न गिनो।",
    "This row shows four bundles and 3 single marks. Tap the finger to step it along. How many marks is that?": "इस पंक्ति में चार समूह और 3 अकेले चिह्न हैं। उँगली आगे बढ़ाने के लिए उस पर टैप करो। ये कुल कितने चिह्न हैं?",
    "How many birds?": "कितने पक्षी?",
    "Did you count the mark lying across in each bundle?": "क्या तुमने हर समूह का आड़ा चिह्न भी गिना?",
    "Here is a row of three bundles and 1 single mark. How many kites does it show?": "यह तीन समूह और 1 अकेले चिह्न की पंक्ति है। यह कितनी पतंगें दिखाती है?",
    "How many kites?": "कितनी पतंगें?",
    "Did any bundle get counted twice? Step the finger once over each.": "क्या कोई समूह दो बार गिना गया? उँगली हर एक पर एक ही बार रखो।",
    "A tally of vehicles at a gate. Write the count for the cars, the buses and the bikes.": "एक गेट पर वाहनों के मिलान चिह्न। कार, बस और बाइक की गिनती लिखो।",
    "Count each vehicle": "हर वाहन गिनो",
    "After the bundles, the single marks go on in ones.": "समूहों के बाद अकेले चिह्न एक-एक करके गिनो।",
    /* phase 4 */
    "A tally chart and how many more": "मिलान सारणी और कितने अधिक",
    "How many more chose this one? Line the rows up and look at what is left.": "इसे कितने अधिक बच्चों ने चुना? पंक्तियाँ एक सीध में रखो, देखो क्या बचता है।",
    "Read each row's number in the chart first.": "पहले चार्ट में हर पंक्ति की संख्या पढ़ो।",
    "For how many more, count only the marks past the shorter row. For in all, add every row.": "कितने अधिक के लिए, छोटी पंक्ति के आगे के चिह्न ही गिनो। कुल के लिए, हर पंक्ति जोड़ो।",
    "To find how many more, take the smaller count from the larger. The rows add up to the children when each gave one answer.": "कितने अधिक, यह जानने के लिए बड़ी गिनती में से छोटी घटाओ। हर बच्चे ने एक उत्तर दिया, तो पंक्तियों का जोड़ कुल बच्चे हैं।",
    "You learned: how many more means the larger count minus the smaller.": "तुमने सीखा: कितने अधिक यानी बड़ी गिनती में से छोटी घटाना।",
    "A class chose their favourite sports. Drag cricket and kabaddi down into the compare bar. How many more children chose cricket than kabaddi?": "एक कक्षा ने अपने मनपसंद खेल चुने। क्रिकेट और कबड्डी को तुलना पट्टी में खींचो। कबड्डी से कितने अधिक बच्चों ने क्रिकेट चुना?",
    "How many more chose cricket?": "कितने अधिक ने क्रिकेट चुना?",
    "Which cricket marks have no kabaddi mark beside them?": "किस क्रिकेट चिह्न के पास कबड्डी चिह्न नहीं है?",
    "Another class chose fruit. How many more chose orange than papaya?": "दूसरी कक्षा ने फल चुने। पपीते से कितने अधिक बच्चों ने संतरा चुना?",
    "How many more chose orange?": "कितने अधिक ने संतरा चुना?",
    "Where does the papaya lane run out? Count the orange marks after it.": "पपीते की पंक्ति कहाँ खत्म होती है? उसके बाद के संतरे के चिह्न गिनो।",
    "Each child chose one snack. How many children were asked in all?": "हर बच्चे ने एक नाश्ता चुना। कुल कितने बच्चों से पूछा गया?",
    "Children in all?": "कुल कितने बच्चे?",
    "Add the number of every row, the small ones too.": "हर पंक्ति की संख्या जोड़ो, छोटी वाली भी।",
    /* what the working area draws, the headings and the row names */
    "Tally marks": "मिलान चिह्न", "Number": "संख्या", "compare": "तुलना", "full": "भरी", "answers": "उत्तर",
    "children": "बच्चे", "bundles": "समूह", "singles": "अकेले", "across": "आड़े",
    "Pet": "पालतू", "Drink": "पेय", "Way to school": "आने का साधन", "Seen": "देखे गए", "Vehicle": "वाहन",
    "Sport": "खेल", "Fruit": "फल", "Snack": "नाश्ता",
    "dog": "कुत्ता", "cat": "बिल्ली", "rabbit": "खरगोश", "milk": "दूध", "tea": "चाय", "juice": "जूस",
    "bus": "बस", "car": "कार", "bike": "बाइक", "walk": "पैदल", "birds": "पक्षी", "kites": "पतंगें",
    "cars": "कार", "buses": "बस", "bikes": "बाइक", "cricket": "क्रिकेट", "football": "फ़ुटबॉल", "kabaddi": "कबड्डी",
    "badminton": "बैडमिंटन", "guava": "अमरूद", "papaya": "पपीता", "orange": "संतरा",
    "samosa": "समोसा", "idli": "इडली", "poha": "पोहा", "dhokla": "ढोकला",
  },
  gu: {
    "Tally Board": "ટેલી બોર્ડ",
    "Answer cards are coming along the belt. One mark for each, as it comes.": "જવાબ કાર્ડ પટ્ટા પર આવી રહ્યાં છે. દરેક કાર્ડ આવે કે તરત તેનું એક ચિહ્ન કરો.",
    "Every answer marked once, every bundle closed, and every row read in fives.": "દરેક જવાબનું એક જ ચિહ્ન થયું, દરેક જૂથ પૂરું થયું. દરેક હાર પાંચ-પાંચ કરીને વંચાઈ.",
    "Free play. Mark any answers from the belt, and line two rows up in the compare bar.": "મુક્ત રમત. પટ્ટાનાં કાર્ડનાં ચિહ્ન કરો, અને સરખામણી પટ્ટીમાં બે હાર મૂકો.",
    "Every card needs its mark first.": "પહેલાં દરેક કાર્ડનું ચિહ્ન થવું જોઈએ.",
    /* phase 1 */
    "One mark for each": "દરેકનું એક ચિહ્ન",
    "Where does this answer go? Find its row on the chart.": "આ જવાબ ક્યાં જશે? ચાર્ટ પર તેની હાર શોધો.",
    "Each card makes one mark in its own row.": "દરેક કાર્ડ પોતાની હારમાં એક ચિહ્ન બનાવે છે.",
    "Look at each card in turn. Is its mark in the row with its name?": "દરેક કાર્ડ વારાફરતી જુઓ. શું તેનું ચિહ્ન તેના નામવાળી હારમાં છે?",
    "One mark is drawn for each answer as it comes. So each answer gets one mark, and none is left to count later.": "દરેક જવાબ આવે કે તરત તેનું એક ચિહ્ન થાય છે. તેથી દરેક જવાબનું એક ચિહ્ન થાય છે. પછી ગણવા કંઈ બાકી રહેતું નથી.",
    "You learned: one mark for each answer, drawn as it comes.": "તમે શીખ્યા: દરેક જવાબનું એક ચિહ્ન, તે આવે કે તરત.",
    "Six children name their favourite pet. Tap the row for each card. Press Enter when every card is marked.": "છ બાળકો પોતાનું મનપસંદ પાલતુ પ્રાણી કહે છે. દરેક કાર્ડ માટે તેની હાર પર ટૅપ કરો. બધાં કાર્ડનાં ચિહ્ન થાય પછી એન્ટર દબાવો.",
    "Tally the pets": "પાલતુનાં ચિહ્ન કરો",
    "Did every cat card go into the cat row?": "શું દરેક બિલાડી કાર્ડ બિલાડીની હારમાં ગયું?",
    "Eight children choose a drink. Mark their cards the same way.": "આઠ બાળકો એક પીણું પસંદ કરે છે. તેમનાં કાર્ડનાં ચિહ્ન પણ એ જ રીતે કરો.",
    "Tally the drinks": "પીણાંનાં ચિહ્ન કરો",
    "Check the milk row. Is a milk card marked somewhere else?": "દૂધની હાર તપાસો. શું કોઈ દૂધ કાર્ડનું ચિહ્ન બીજે થયું છે?",
    "Children said how they come to school, and each answer got its mark. How many answers were collected?": "બાળકોએ કહ્યું કે તેઓ શાળાએ કેવી રીતે આવે છે. દરેક જવાબનું ચિહ્ન થયું. કેટલા જવાબ ભેગા થયા?",
    "How many answers?": "કેટલા જવાબ?",
    "Count all the marks in every row together, each one once.": "બધી હારનાં ચિહ્ન સાથે ગણો. દરેક ચિહ્ન એક જ વાર.",
    /* phase 2 */
    "The fifth mark crosses the four": "પાંચમું ચિહ્ન ચારેયને કાપે છે",
    "Count the standing marks. Where does the fifth one go?": "ઊભાં ચિહ્ન ગણો. પાંચમું ક્યાં જશે?",
    "The fifth mark lies across the marks standing before it.": "પાંચમું ચિહ્ન ઊભાં ચિહ્નો પર આડું પડે છે.",
    "Leave a gap after each bundle, then start the next one.": "દરેક જૂથ પછી જગ્યા છોડો, પછી આગળનું શરૂ કરો.",
    "Every fifth mark is drawn across the four before it, making a bundle of five.": "દરેક પાંચમું ચિહ્ન પહેલાંનાં ચાર પર આડું દોરાય છે. તેનાથી પાંચનું એક જૂથ બને છે.",
    "You learned: the fifth mark lies across the four, making a bundle.": "તમે શીખ્યા: પાંચમું ચિહ્ન ચારેય પર આડું પડીને જૂથ બનાવે છે.",
    "Show 17 in tally marks. Tap beside the marks to stand one up, or tap on them to lay one across. Then press Enter.": "17 ને ટેલી ચિહ્નોમાં બતાવો. ચિહ્નોની બાજુમાં ટૅપ કરો તો એક ઊભું ચિહ્ન બનશે. તેમના પર ટૅપ કરો તો એક આડું પડશે. પછી એન્ટર દબાવો.",
    "Show 17 in tally marks": "17 ને ટેલી ચિહ્નોમાં બતાવો",
    "How many marks are standing in each bundle?": "દરેક જૂથમાં કેટલાં ચિહ્ન ઊભાં છે?",
    "Now think of 14. How many bundles of five and how many single marks does it take?": "હવે 14 વિશે વિચારો. પાંચનાં કેટલાં જૂથ, કેટલાં છૂટાં ચિહ્ન?",
    "14 in bundles and singles": "14 નાં જૂથ અને છૂટાં ચિહ્ન",
    "Draw 14 on the row first, then count what you made.": "પહેલાં હાર પર 14 દોરો, પછી જે બન્યું તે ગણો.",
    "Draw tally marks for 20. How many of the marks lie across?": "20 માટે ટેલી ચિહ્ન દોરો. તેમાંથી કેટલાં ચિહ્ન આડાં છે?",
    "Marks across for 20?": "20 માં કેટલાં આડાં ચિહ્ન?",
    "Look at your row and count only the marks lying across.": "તમારી હાર જુઓ અને ફક્ત આડાં ચિહ્ન ગણો.",
    /* phase 3 */
    "Reading a tally in fives": "ટેલી ચિહ્ન પાંચ-પાંચમાં વાંચવાં",
    "Count the bundles in fives. Then count on the marks left over.": "જૂથોને પાંચ-પાંચ કરીને ગણો. પછી બાકીનાં ચિહ્ન આગળ ગણો.",
    "What is each bundle worth?": "દરેક જૂથ કેટલાનું છે?",
    "Step the finger along. Say five, ten, fifteen at the bundles, then go on in ones.": "આંગળી આગળ ખસેડો. જૂથો પર પાંચ, દસ, પંદર બોલો. પછી એક-એક કરીને ગણો.",
    "A tally is read by counting the bundles in fives and then the marks left over in ones.": "ટેલી વાંચવા જૂથોને પાંચ-પાંચમાં ગણીએ છીએ. પછી બાકીનાં ચિહ્ન એક-એક કરીને ગણીએ છીએ.",
    "You learned: read a tally in fives, then count the marks left over.": "તમે શીખ્યા: પાંચ-પાંચમાં વાંચો, પછી બાકીનાં ચિહ્ન ગણો.",
    "This row shows four bundles and 3 single marks. Tap the finger to step it along. How many marks is that?": "આ હારમાં ચાર જૂથ અને 3 છૂટાં ચિહ્ન છે. આંગળી આગળ ખસેડવા તેના પર ટૅપ કરો. તે કુલ કેટલાં ચિહ્ન થયાં?",
    "How many birds?": "કેટલાં પક્ષીઓ?",
    "Did you count the mark lying across in each bundle?": "શું તમે દરેક જૂથનું આડું ચિહ્ન પણ ગણ્યું?",
    "Here is a row of three bundles and 1 single mark. How many kites does it show?": "આ ત્રણ જૂથ અને 1 છૂટા ચિહ્નની હાર છે. તે કેટલા પતંગ બતાવે છે?",
    "How many kites?": "કેટલા પતંગ?",
    "Did any bundle get counted twice? Step the finger once over each.": "શું કોઈ જૂથ બે વાર ગણાયું? આંગળી દરેક પર એક જ વાર મૂકો.",
    "A tally of vehicles at a gate. Write the count for the cars, the buses and the bikes.": "એક દરવાજે વાહનોની ટેલી. કાર, બસ અને બાઇકની ગણતરી લખો.",
    "Count each vehicle": "દરેક વાહન ગણો",
    "After the bundles, the single marks go on in ones.": "જૂથો પછી છૂટાં ચિહ્ન એક-એક કરીને ઉમેરાય છે.",
    /* phase 4 */
    "A tally chart and how many more": "ટેલી કોષ્ટક અને કેટલાં વધુ",
    "How many more chose this one? Line the rows up and look at what is left.": "આ કેટલાં વધુ બાળકોએ પસંદ કર્યું? હારો એક સીધમાં મૂકો, જુઓ શું બાકી રહે છે.",
    "Read each row's number in the chart first.": "પહેલાં ચાર્ટમાં દરેક હારની સંખ્યા વાંચો.",
    "For how many more, count only the marks past the shorter row. For in all, add every row.": "કેટલાં વધુ તે માટે, નાની હાર પછીનાં ચિહ્ન જ ગણો. કુલ માટે, દરેક હાર ઉમેરો.",
    "To find how many more, take the smaller count from the larger. The rows add up to the children when each gave one answer.": "કેટલાં વધુ તે જાણવા મોટી ગણતરીમાંથી નાની બાદ કરો. દરેક બાળકે એક જવાબ આપ્યો હોય, તો હારોનો સરવાળો કુલ બાળકો છે.",
    "You learned: how many more means the larger count minus the smaller.": "તમે શીખ્યા: કેટલાં વધુ એટલે મોટી ગણતરીમાંથી નાની બાદ કરવી.",
    "A class chose their favourite sports. Drag cricket and kabaddi down into the compare bar. How many more children chose cricket than kabaddi?": "એક વર્ગે પોતાની મનપસંદ રમત પસંદ કરી. ક્રિકેટ અને કબડ્ડીને સરખામણી પટ્ટીમાં ખેંચો. કબડ્ડીથી કેટલાં વધુ બાળકોએ ક્રિકેટ લીધું?",
    "How many more chose cricket?": "ક્રિકેટ માટે કેટલાં વધુ?",
    "Which cricket marks have no kabaddi mark beside them?": "કયાં ક્રિકેટ ચિહ્નો પાસે કબડ્ડી ચિહ્ન નથી?",
    "Another class chose fruit. How many more chose orange than papaya?": "બીજા વર્ગે ફળ પસંદ કર્યાં. પપૈયાથી કેટલાં વધુ બાળકોએ સંતરું લીધું?",
    "How many more chose orange?": "સંતરા માટે કેટલાં વધુ?",
    "Where does the papaya lane run out? Count the orange marks after it.": "પપૈયાની હાર ક્યાં પૂરી થાય છે? તેના પછીનાં સંતરાનાં ચિહ્ન ગણો.",
    "Each child chose one snack. How many children were asked in all?": "દરેક બાળકે એક નાસ્તો પસંદ કર્યો. કુલ કેટલાં બાળકોને પૂછવામાં આવ્યું?",
    "Children in all?": "કુલ કેટલાં બાળકો?",
    "Add the number of every row, the small ones too.": "દરેક હારની સંખ્યા ઉમેરો, નાની પણ.",
    /* what the working area draws, the headings and the row names */
    "Tally marks": "ટેલી ચિહ્ન", "Number": "સંખ્યા", "compare": "સરખાવો", "full": "પૂરું", "answers": "જવાબ",
    "children": "બાળકો", "bundles": "જૂથ", "singles": "છૂટાં", "across": "આડાં",
    "Pet": "પાલતુ", "Drink": "પીણું", "Way to school": "આવવાનું સાધન", "Seen": "જોયેલાં", "Vehicle": "વાહન",
    "Sport": "રમત", "Fruit": "ફળ", "Snack": "નાસ્તો",
    "dog": "કૂતરો", "cat": "બિલાડી", "rabbit": "સસલું", "milk": "દૂધ", "tea": "ચા", "juice": "જ્યૂસ",
    "bus": "બસ", "car": "કાર", "bike": "બાઇક", "walk": "ચાલીને", "birds": "પક્ષીઓ", "kites": "પતંગ",
    "cars": "કાર", "buses": "બસ", "bikes": "બાઇક", "cricket": "ક્રિકેટ", "football": "ફૂટબોલ", "kabaddi": "કબડ્ડી",
    "badminton": "બેડમિન્ટન", "guava": "જામફળ", "papaya": "પપૈયું", "orange": "સંતરું",
    "samosa": "સમોસા", "idli": "ઇડલી", "poha": "પૌંઆ", "dhokla": "ઢોકળાં",
  },
};

/* One entry per phase = one mount.
   Item fields of this tool: rows (the chart's rows: names, or { name, b bundles, s single marks }),
   cards (phase 1: the row each answer card belongs to, in the order they come; given = the chart comes already
   marked), head (the name column's
   heading), target (phase 2: the number drawn), start (standing marks already in the row), pair (phase 4:
   the two rows compared), near (the item's misconception, which judge rejects). */
const PHASES = [
  {
    n: 1,
    concept: "One mark for each",
    conceptId: "M1.S2.T3.C8", objectiveIds: ["O3"],
    says: ["Where does this answer go? Find its row on the chart."],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: which row does this answer belong to? Second rung, the phase's: has every card been turned over? Third rung: the belt is cut to four cards and two rows, and the child marks each as it comes. The number keys stay open behind all three rungs. */
    ladder: ["Each card makes one mark in its own row.", "Look at each card in turn. Is its mark in the row with its name?"],
    closing: "One mark is drawn for each answer as it comes. So each answer gets one mark, and none is left to count later.",
    learned: "You learned: one mark for each answer, drawn as it comes.",
    traceback: "The belt runs its cards again one at a time; each card's mark is redrawn in its row beside the child's marks (on a chart already marked, each card's own mark lights and is counted), and each row's number is written.",
    items: [
      /* learn ML1: answer in the plan = Dog 3 marks, cat 2 marks and rabbit 1 mark */
      /* the tally is the answer: made on the working area, judged when every card is turned (answer = marks a row) */
      { qid: "M1.S2.T3.C8:ML1", kind: "belt", head: "Pet", rows: ["dog", "cat", "rabbit"], cards: [0, 1, 0, 2, 0, 1],
        pad: "enter", answer: [3, 2, 1], near: "r:4-1-1", winMs: 2400,
        say: "Six children name their favourite pet. Tap the row for each card. Press Enter when every card is marked.",
        ask: "Tally the pets", miss: "Did every cat card go into the cat row?" },
      /* practice 1: answer in the plan = Milk 4, tea 2 and juice 2 */
      { qid: "M1.S2.T3.C8:1", kind: "belt", head: "Drink", rows: ["milk", "tea", "juice"], cards: [1, 0, 0, 2, 1, 0, 2, 0],
        pad: "enter", answer: [4, 2, 2], near: "r:3-2-3", winMs: 2400,
        say: "Eight children choose a drink. Mark their cards the same way.",
        ask: "Tally the drinks", miss: "Check the milk row. Is a milk card marked somewhere else?" },
      /* practice 2: answer in the plan = 9 answers, one for each mark (the chart comes already marked, as the plan asks it) */
      { qid: "M1.S2.T3.C8:2", kind: "belt", given: true, head: "Way to school", rows: ["bus", "car", "bike", "walk"], cards: [0, 1, 0, 3, 0, 2, 1, 0, 3],
        answer: 9, near: 8, winMs: 2200,
        say: "Children said how they come to school, and each answer got its mark. How many answers were collected?",
        ask: "How many answers?", miss: "Count all the marks in every row together, each one once." },
    ],
  },
  {
    n: 2,
    concept: "The fifth mark crosses the four",
    conceptId: "M1.S2.T3.C9", objectiveIds: ["O3"],
    says: ["Count the standing marks. Where does the fifth one go?"],
    /* tries, as the plan writes it: First rung, from the item: how many marks are standing in this bundle? Second rung, the phase's: where does the fifth mark go? Third rung: the row is cut to four standing marks, and the child draws the fifth. The number keys stay open. */
    ladder: ["The fifth mark lies across the marks standing before it.", "Leave a gap after each bundle, then start the next one."],
    closing: "Every fifth mark is drawn across the four before it, making a bundle of five.",
    learned: "You learned: the fifth mark lies across the four, making a bundle.",
    traceback: "The child's row stays as drawn; below it the pen draws the same number again, four standing and the fifth across, and reads it in fives.",
    items: [
      /* learn ML2: answer in the plan = Three bundles of five and 2 more marks */
      { qid: "M1.S2.T3.C9:ML2", kind: "build", target: 17, start: 4, pad: "enter", answer: 17, near: "t:17", winMs: 2600,
        say: "Show 17 in tally marks. Tap beside the marks to stand one up, or tap on them to lay one across. Then press Enter.",
        ask: "Show 17 in tally marks", miss: "How many marks are standing in each bundle?" },
      /* practice 3: answer in the plan = Two bundles and 4 single marks */
      { qid: "M1.S2.T3.C9:3", kind: "split", target: 14, parts: [{ label: "bundles" }, { label: "singles" }], answer: [2, 4], near: [0, 14], winMs: 2400,
        say: "Now think of 14. How many bundles of five and how many single marks does it take?",
        ask: "14 in bundles and singles", miss: "Draw 14 on the row first, then count what you made." },
      /* practice 4: answer in the plan = 4, one in each of the four bundles of five */
      { qid: "M1.S2.T3.C9:4", kind: "across", target: 20, answer: 4, near: 5, winMs: 2400,
        say: "Draw tally marks for 20. How many of the marks lie across?",
        ask: "Marks across for 20?", miss: "Look at your row and count only the marks lying across." },
    ],
  },
  {
    n: 3,
    concept: "Reading a tally in fives",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O4"],
    says: ["Count the bundles in fives. Then count on the marks left over."],
    /* tries, as the plan writes it: First rung, from the item: how many bundles are there? Second rung, the phase's: what is each bundle worth? Third rung: the row is cut to one bundle and two marks, and the child counts them. The number keys stay open. */
    ladder: ["What is each bundle worth?", "Step the finger along. Say five, ten, fifteen at the bundles, then go on in ones."],
    closing: "A tally is read by counting the bundles in fives and then the marks left over in ones.",
    learned: "You learned: read a tally in fives, then count the marks left over.",
    traceback: "The finger lights each bundle whole and writes its running count in fives below it, counts on the single marks in ones, and the row's number drops in.",
    items: [
      /* learn ML3: answer in the plan = 23 */
      { qid: "M1.S2.T3.C10:ML3", kind: "read", head: "Seen", rows: [{ name: "birds", b: 4, s: 3 }], answer: 23, near: 19, winMs: 2600,
        say: "This row shows four bundles and 3 single marks. Tap the finger to step it along. How many marks is that?",
        ask: "How many birds?", miss: "Did you count the mark lying across in each bundle?" },
      /* practice 5: answer in the plan = 16 */
      { qid: "M1.S2.T3.C10:5", kind: "read", head: "Seen", rows: [{ name: "kites", b: 3, s: 1 }], answer: 16, near: 21, winMs: 2600,
        say: "Here is a row of three bundles and 1 single mark. How many kites does it show?",
        ask: "How many kites?", miss: "Did any bundle get counted twice? Step the finger once over each." },
      /* practice 6: answer in the plan = Cars 12, buses 8 and bikes 19 */
      { qid: "M1.S2.T3.C10:6", kind: "read", head: "Vehicle", rows: [{ name: "cars", b: 2, s: 2 }, { name: "buses", b: 1, s: 3 }, { name: "bikes", b: 3, s: 4 }],
        parts: [{ label: "cars" }, { label: "buses" }, { label: "bikes" }], answer: [12, 8, 19], near: [20, 20, 35], winMs: 3400,
        say: "A tally of vehicles at a gate. Write the count for the cars, the buses and the bikes.",
        ask: "Count each vehicle", miss: "After the bundles, the single marks go on in ones." },
    ],
  },
  {
    n: 4,
    concept: "A tally chart and how many more",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O4"],
    says: ["How many more chose this one? Line the rows up and look at what is left."],
    /* tries, as the plan writes it: First rung, from the item: which row is longer? Second rung, the phase's: what is left when the shorter row runs out? Third rung: the compare bar is cut to one bundle against one bundle and two marks, and the child counts what is left. The number keys stay open. */
    ladder: ["Read each row's number in the chart first.", "For how many more, count only the marks past the shorter row. For in all, add every row."],
    closing: "To find how many more, take the smaller count from the larger. The rows add up to the children when each gave one answer.",
    learned: "You learned: how many more means the larger count minus the smaller.",
    traceback: "The two rows are laid in the compare bar from one edge and the marks past the shorter row are banded and counted; for a total, the total cell adds the number column row by row.",
    items: [
      /* learn ML4: answer in the plan = Kabaddi was chosen least; 7 more children chose cricket than kabaddi; 48 children in all */
      { qid: "M1.S2.T3.C11:ML4", kind: "compare", head: "Sport", pair: [0, 2], answer: 7, near: 16, winMs: 2400,
        rows: [{ name: "cricket", b: 3, s: 1 }, { name: "football", b: 2, s: 3 }, { name: "kabaddi", b: 1, s: 4 }, { name: "badminton", b: 2, s: 0 }],
        say: "A class chose their favourite sports. Drag cricket and kabaddi down into the compare bar. How many more children chose cricket than kabaddi?",
        ask: "How many more chose cricket?", miss: "Which cricket marks have no kabaddi mark beside them?" },
      /* practice 7: answer in the plan = 8 more, because orange shows 15 and papaya 7 */
      { qid: "M1.S2.T3.C11:7", kind: "compare", head: "Fruit", pair: [2, 1], answer: 8, near: 15, winMs: 2400,
        rows: [{ name: "guava", b: 2, s: 1 }, { name: "papaya", b: 1, s: 2 }, { name: "orange", b: 3, s: 0 }],
        say: "Another class chose fruit. How many more chose orange than papaya?",
        ask: "How many more chose orange?", miss: "Where does the papaya lane run out? Count the orange marks after it." },
      /* practice 8: answer in the plan = Poha, chosen by 6; 50 children in all, because 18 + 14 + 6 + 12 = 50 */
      { qid: "M1.S2.T3.C11:8", kind: "total", head: "Snack", answer: 50, near: 44, winMs: 2400,
        rows: [{ name: "samosa", b: 3, s: 3 }, { name: "idli", b: 2, s: 4 }, { name: "poha", b: 1, s: 1 }, { name: "dhokla", b: 2, s: 2 }],
        say: "Each child chose one snack. How many children were asked in all?",
        ask: "Children in all?", miss: "Add the number of every row, the small ones too." },
    ],
  },
];

/* ── the drawing kit (tb…: named clear of the runtime's own helpers) ────────────────────────────
   A mark is 9 wide and 52 tall, 20 from the mark before; a bundle's fifth mark lies across its four,
   from the foot of the first to the top of the fourth, and the next bundle starts 44 further along. */
const TB = { mw: 9, mh: 52, pitch: 20, gap: 44, tallyX: 190, numX: 810, numW: 130, right: 940, x0: 212, sky: "#56B4E9" };
/* free play's own chart: three rows and an endless belt */
const TB_FREE = { kind: "free", head: "Pet", rows: ["dog", "cat", "rabbit"] };
const tbFreeCard = (k: number) => [0, 1, 0, 2, 1, 0, 0, 2, 1, 1, 0, 2][k % 12];

/* a correct tally of n: bundles of four standing and one across, then the marks left over */
const tbGroups = (n: number) => {
  const g: any[] = [];
  for (let k = 0; k < Math.floor(n / 5); k++) g.push({ up: 4, x: true });
  if (n % 5) g.push({ up: n % 5, x: false });
  return g;
};
const tbRowGroups = (q: any) => tbGroups(q.b * 5 + q.s);
/* how many marks a row of groups holds (a group laid across holds one more than it has standing) */
const tbCount = (g: any[]) => g.reduce((a: number, q: any) => a + q.up + (q.x ? 1 : 0), 0);
/* where each group starts (a) and ends (b), from the row's left edge x0 */
const tbLayout = (g: any[], x0: number) => {
  let x = x0;
  return g.map((q: any) => {
    const w = Math.max(q.up - 1, 0) * TB.pitch + TB.mw;
    const r = { ...q, a: x, b: x + w };
    x = x + w + TB.gap;
    return r;
  });
};
/* where the next standing mark goes */
const tbNext = (g: any[], x0: number) => {
  const L = tbLayout(g, x0), last = L[L.length - 1];
  if (!last) return x0;
  return last.x ? last.b + TB.gap : last.a + last.up * TB.pitch;
};
/* every mark, in the order it was drawn */
const tbMarks = (g: any[], x0: number) => {
  const m: any[] = [];
  tbLayout(g, x0).forEach((q: any, gi: number) => {
    for (let j = 0; j < q.up; j++) m.push({ k: "up", x: q.a + j * TB.pitch, gi });
    if (q.x) m.push({ k: "x", x: q.a, x1: q.b, gi });
  });
  return m;
};
/* the stops a counting finger makes: one a bundle, then one a single mark, with the count so far */
const tbStops = (g: any[], x0: number) => {
  const st: any[] = [];
  let run = 0;
  tbLayout(g, x0).forEach((q: any) => {
    if (q.x) { run += q.up + 1; st.push({ cx: (q.a + q.b) / 2, a: q.a - 16, b: q.b + 16, v: run, one: false }); }
    else for (let j = 0; j < q.up; j++) { run += 1; const x = q.a + j * TB.pitch; st.push({ cx: x + TB.mw / 2, a: x - 7, b: x + TB.mw + 7, v: run, one: true }); }
  });
  return st;
};
/* a drawn row as the value the working area answers with ("t:4x-4x-4x-2"), and back */
const tbCode = (g: any[]) => "t:" + g.map((q: any) => q.up + (q.x ? "x" : "")).join("-");
const tbParse = (v: any) => String(v).slice(2).split("-").filter(Boolean).map((t: string) => ({ up: parseInt(t, 10) || 0, x: /x$/.test(t) }));
/* a row is right when it holds n marks, every bundle is four standing and one across, and only the last group is open */
const tbRight = (g: any[], n: number) => tbCount(g) === n
  && g.every((q: any, k: number) => (q.x ? q.up === 4 : k === g.length - 1 && q.up >= 1 && q.up <= 4));
/* the marks, drawn: upright in deep blue, the fifth across in vermilion */
const tbInk = (m: any[], y: number, id: string) => m.map((q: any, k: number) => (q.k === "up"
  ? <rect key={id + k} x={q.x} y={y} width={TB.mw} height={TB.mh} rx={4} fill={CONTENT.hundred} />
  : <line key={id + k} x1={q.x - 9} y1={y + TB.mh - 3} x2={q.x1 + 9} y2={y + 3} stroke={CONTENT.pointer} strokeWidth={8} strokeLinecap="round" />));
/* the band behind the marks from mark i to mark j of a row (a mark across is banded by its tip) */
const tbSpan = (m: any[], i: number, j: number) => {
  const A = m[i], B = m[j];
  if (!A || !B) return null;
  return { a: A.k === "x" ? A.x1 + 2 : A.x - 7, b: B.k === "x" ? B.x1 + 16 : B.x + TB.mw + 7 };
};
/* each question's fresh working area (a given chart comes with every card already marked in its own row) */
const tbFresh = (it: any) => ({
  marked: it && it.given ? it.cards.length : 0, rowOf: it && it.given ? it.cards.slice() : ([] as number[]),
  fr: [0, 0, 0], fk: 0, fhist: [] as number[],
  groups: it && it.kind === "build" && it.start ? [{ up: it.start, x: false }] : [],
  finger: { row: 0, stop: -1 }, lanes: [null, null] as any[],
  acted: false, dirty: false, demo: null as any, flash: false, nudge: false,
});
/* every whole number in an answer, in order: [3, 2, 1], "r:3-2-1" and "dog 3, cat 2, rabbit 1" all read 3, 2, 1 */
const tbNums = (v: any) => (Array.isArray(v) ? v.map((x: any) => Number(x)) : (String(v).match(/\d+/g) || []).map((x: string) => Number(x)));
/* a phase-1 tally as the value the working area answers with: the marks in each row ("r:3-2-1") */
const tbBeltCode = (rows: any[], rowOf: number[]) => "r:" + rows.map((_: any, r: number) => rowOf.filter((x: number) => x === r).length).join("-");

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  mark: { width: TB.mw, height: TB.mh, pitch: TB.pitch, bundleGap: TB.gap },
  columns: { name: [0, TB.tallyX], tally: [TB.tallyX, TB.numX], number: [TB.numX, TB.right] },
  colours: { upright: "deep blue #0072B2", across: "vermilion #D55E00", number: "amber #E69F00", total: "reddish purple #CC79A7", band: "sky blue #56B4E9" },
  freePlay: TB_FREE,
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers; a drawn row must be a right tally) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (Array.isArray(item.answer)) { const a = tbNums(v); return a.length === item.answer.length && a.every((x: number, k: number) => x === item.answer[k]); }
  if (item.kind === "build" && typeof v === "string" && v.startsWith("t:")) return tbRight(tbParse(v), item.answer);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from the item's own data by counting, sharing no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const fives = (b: number, s: number) => { let t = s; for (let k = 0; k < b; k++) t += 5; return t; };
  const split = (t: number) => { let b = 0, r = t; while (r >= 5) { r -= 5; b += 1; } return [b, r]; };
  let want: any = null;
  if (it.kind === "belt") {
    const per = it.rows.map((_: any, r: number) => it.cards.reduce((a: number, c: number) => a + (c === r ? 1 : 0), 0));
    want = Array.isArray(it.answer) ? per : per.reduce((a: number, x: number) => a + x, 0);
  } else if (it.kind === "build") want = it.target;
  else if (it.kind === "split") want = split(it.target);
  else if (it.kind === "across") want = split(it.target)[0];
  else {
    const vals = it.rows.map((q: any) => fives(q.b, q.s));
    if (it.kind === "read") want = it.parts ? vals : vals[0];
    else if (it.kind === "compare") want = Math.abs(vals[it.pair[0]] - vals[it.pair[1]]);
    else if (it.kind === "total") want = vals.reduce((a: number, x: number) => a + x, 0);
  }
  return JSON.stringify(want) === JSON.stringify(it.answer);
}));
/* the item's misconception (the missed card, the fifth mark stood up, a bundle read as four, the bigger row's own count) */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print (a build target is the question itself) */
const answerForms = (item: any) => (item.kind === "build" ? []
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it; a tally made on the
   working area is given row by row in words ("dog 3, cat 2, rabbit 1"), since nothing is typed for it */
const agentKey = (item: any) => (item.kind === "belt" && Array.isArray(item.answer)
  ? item.rows.map((nm: string, r: number) => nm + " " + item.answer[r]).join(", ") : item.answer);
/* what the slot shows: a row or a tally drawn on the working area answers there, so the slot keeps nothing of it */
const tbFormat = (v: any) => (typeof v === "string" && /[a-z:]/i.test(v) ? "" : v);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const it: any = free ? TB_FREE : item;
  const key = free ? "free" : n + ":" + index;
  const [box, setBox] = useState<any>(null);
  const ref = useRef<any>(null);
  if (!ref.current || ref.current.key !== key) ref.current = box && box.key === key ? box : { key, ...tbFresh(it) };
  const s = ref.current;
  /* every change goes through put; a callback left over from an earlier question changes nothing */
  const put = (p: any) => {
    const b = ref.current;
    if (!b || b.key !== key) return;
    const next = { ...b, ...(typeof p === "function" ? p(b) : p) };
    ref.current = next;
    setBox(next);
  };
  const live = (free || stage === "ask" || stage === "teach") && !tl.busy;
  const win = !free && (stage === "win" || stage === "idle");
  const amber = shade(CONTENT.ten, 0.25), purple = shade(CONTENT.bead, 0.25), band = tint(TB.sky, 0.45);
  const names: string[] = (it.rows || []).map((q: any) => (typeof q === "string" ? q : q.name));
  const G: any[] = (it.rows || []).map((q: any) => (typeof q === "string" ? [] : tbRowGroups(q)));
  const d = s.demo;

  /* the traceback (and phase 3's win): the maths redrawn step by step, ending on the whole right answer */
  const steps = (f: number) => {
    const st: any[] = [];
    const D = (v: any) => () => put({ demo: v });
    if (it.kind === "belt") {
      st.push([250 * f, D({ n: 0, card: -1 })]);
      it.cards.forEach((_: any, i: number) => st.push([420 * f, D({ n: i + 1, card: i })]));
      st.push([300 * f, D({ n: it.cards.length, card: -1, done: true })]);
    } else if (it.kind === "build" || it.kind === "split" || it.kind === "across") {
      const R = tbGroups(it.target), M = tbMarks(R, TB.x0).length;
      for (let m = 1; m <= M; m++) st.push([110 * f, D({ m })]);
      if (it.kind === "across") for (let j = 1; j <= R.filter((q: any) => q.x).length; j++) st.push([380 * f, D({ m: M, x: j })]);
      else for (let j = 1; j <= tbStops(R, TB.x0).length; j++) st.push([300 * f, D({ m: M, r: j })]);
      st.push([300 * f, D({ m: M, r: 99, x: 99, done: true })]);
    } else if (it.kind === "read") {
      G.forEach((g: any, rr: number) => {
        for (let j = 1; j <= tbStops(g, TB.x0).length; j++) st.push([260 * f, D({ rr, j })]);
        st.push([380 * f, D({ rr: rr + 1, j: 0 })]);
      });
      st.push([200 * f, D({ rr: G.length, j: 0, done: true })]);
    } else if (it.kind === "compare") {
      const E = Math.abs(tbCount(G[it.pair[0]]) - tbCount(G[it.pair[1]]));
      st.push([500 * f, D({ k: 0 })]);
      for (let k = 1; k <= E; k++) st.push([300 * f, D({ k })]);
      st.push([300 * f, D({ k: E, done: true })]);
    } else if (it.kind === "total") {
      G.forEach((_: any, r: number) => st.push([450 * f, D({ t: r + 1 })]));
      st.push([300 * f, D({ t: G.length, done: true })]);
    }
    return st;
  };
  useEffect(() => () => { tl.stop(); api.lock(false); }, [key]);
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    tl.run(steps(1), () => api.lock(false));
  }, [wrong]);
  useEffect(() => {
    if (stage === "win" && !free && it.kind === "read") tl.run(steps(0.45));
  }, [stage]);
  /* what a right answer leaves on the picture, when no traceback is standing: a tally that does not match
     its cards (an answer given another way) gets the pen's right marks beside it, as after a miss */
  const beltOk = it.kind === "belt" && s.marked === it.cards.length && tbBeltCode(it.rows, s.rowOf) === tbBeltCode(it.rows, it.cards);
  const FINAL: any = it.kind === "belt" ? { n: it.cards.length, card: -1, done: true, nopen: beltOk }
    : it.kind === "build" ? (tbRight(s.groups, it.target) ? { own: true } : { m: 99, r: 99, done: true })
    : it.kind === "split" || it.kind === "across" ? { m: 99, r: 99, x: 99, done: true }
    : it.kind === "compare" ? { k: 99, done: true }
    : it.kind === "total" ? { t: 99, done: true } : null;
  const view: any = d || (win && it.kind !== "read" ? FINAL : null);
  /* the lanes the compare bar shows: while a correction or a win stands, the two rows the question names
     (in the child's order when the child already laid them); the chips and getState() follow the same lanes */
  const shownLanes = (b: any, v: any) => (it.kind === "compare" && v && v.k !== undefined
    ? (b.lanes.indexOf(it.pair[0]) >= 0 && b.lanes.indexOf(it.pair[1]) >= 0 ? b.lanes : it.pair) : b.lanes);
  const lanesNow = shownLanes(s, view);

  /* the agent works on the picture as a child would, then Enter answers: a drawn row, or a tally of the belt */
  HOOK.set = (v: any) => {
    if (it.kind === "belt" && !it.given) {
      const want = tbNums(v);
      if (want.length !== it.rows.length) return false;
      const left = want.slice();
      const rowOf = it.cards.map((r: number) => { if (left[r] > 0) { left[r] -= 1; return r; } const k = left.findIndex((x: number) => x > 0); if (k >= 0) { left[k] -= 1; return k; } return r; });
      put({ marked: it.cards.length, rowOf, acted: true, dirty: true });
      return true;
    }
    if (it.kind !== "build") return undefined;
    const want = leadNumber(v);
    if (!(want > 0)) return false;
    put({ groups: tbGroups(want), acted: true, dirty: true });
    return true;
  };
  /* work made on the picture answers with Enter: a tally only once every card is turned (the belt empty),
     and only when the child has worked on it since it was last judged (dirty). A bare Enter after a miss
     costs nothing; a card taken back and marked again is new work, even if it spells the same counts */
  api.onEnter(!free && it.pad === "enter" ? () => {
    const b = ref.current;
    if (!b) return;
    if (it.kind === "belt" && b.marked < it.cards.length) { put({ nudge: true }); api.say("Every card needs its mark first."); return; }
    if (!b.dirty) return;
    const code = it.kind === "belt" ? tbBeltCode(it.rows, b.rowOf) : tbCode(b.groups);
    put({ dirty: false });
    api.submit(code);
  } : null);

  /* ── the child's acts (each one ticks only when it changes something) ── */
  const markRow = (r: number) => {
    const b = ref.current;
    if (free) {
      if (b.fr[r] >= 24) return;
      const fr = b.fr.slice(); fr[r] += 1;
      put({ fr, fk: b.fk + 1, fhist: b.fhist.concat([r]), acted: true, flash: false });
    } else {
      if (it.given || b.marked >= it.cards.length) return;
      put({ marked: b.marked + 1, rowOf: b.rowOf.concat([r]), acted: true, dirty: true, flash: false, nudge: false });
    }
    api.sfx.tick();
  };
  /* take the last card back: its mark comes off and the card lies face up again */
  const takeBack = () => {
    const b = ref.current;
    if (free) {
      if (!b.fhist.length) return;
      const r = b.fhist[b.fhist.length - 1], fr = b.fr.slice(); fr[r] -= 1;
      put({ fr, fk: b.fk - 1, fhist: b.fhist.slice(0, -1), acted: true });
    } else {
      if (it.given || !b.marked) return;
      put({ marked: b.marked - 1, rowOf: b.rowOf.slice(0, -1), acted: true, dirty: true });
    }
    api.sfx.tick();
  };
  /* the head card: dragged onto a row it is marked there; a tap lights the rows it can go to */
  const dropCard = (p: any, moved: boolean) => {
    if (!moved) {
      put({ flash: true });
      window.setTimeout(() => put({ flash: false }), 1200);
      return;
    }
    const r = Math.floor((p.y - Y.y0) / Y.rh);
    if (p.x >= -20 && p.x <= TB.right + 20 && r >= 0 && r < it.rows.length) markRow(r);
  };
  const edit = (fn: (g: any[]) => boolean) => {
    const g = ref.current.groups.map((q: any) => ({ ...q }));
    if (!fn(g)) return;
    put({ groups: g, acted: true, dirty: true });
    api.sfx.tick();
  };
  const standUp = () => edit((g) => { const l = g[g.length - 1]; if (l && !l.x) l.up += 1; else g.push({ up: 1, x: false }); return true; });
  const layAcross = () => edit((g) => { const l = g[g.length - 1]; if (!l || l.x) return false; l.x = true; return true; });
  const rubOut = () => edit((g) => { const l = g[g.length - 1]; if (!l) return false; if (l.x) l.x = false; else { l.up -= 1; if (l.up <= 0) g.pop(); } return true; });

  /* rows and lanes of the chart, by phase */
  const Y = free ? { y0: 144, rh: 76, bar: 384, lane: 64 } : it.kind === "belt" ? { y0: 144, rh: 76 } : it.kind === "read" ? { y0: 52, rh: 152 }
    : { y0: 40, rh: 72, bar: 344, lane: 80 };
  const laneY = (k: number) => Y.bar + (free ? 6 + k * 70 : 10 + k * 86);
  const stopsOf = (r: number) => tbStops(G[r], TB.x0);

  const moveFinger = (p: any, moved: boolean) => {
    put((b: any) => {
      const f = b.finger;
      if (!moved) {
        if (f.stop + 1 < stopsOf(f.row).length) return { finger: { row: f.row, stop: f.stop + 1 }, acted: true };
        if (f.row + 1 < G.length) return { finger: { row: f.row + 1, stop: 0 }, acted: true };
        return { finger: { row: 0, stop: -1 }, acted: true };
      }
      let row = 0, best = 1e9;
      G.forEach((_: any, r: number) => { const dy = Math.abs(p.y - (Y.y0 + r * Y.rh + 72)); if (dy < best) { best = dy; row = r; } });
      const st = stopsOf(row);
      let stop = -1, bx = 1e9;
      if (p.x >= st[0].a - 30) st.forEach((q: any, j: number) => { const dx = Math.abs(p.x - q.cx); if (dx < bx) { bx = dx; stop = j; } });
      return { finger: { row, stop }, acted: true };
    });
    api.sfx.tick();
  };
  /* a tag dropped on a lane lays its row there; dropped anywhere else it leaves the bar; a tap puts it in the
     next free lane or takes it out. The child works from the lanes on screen (a correction's lanes included) */
  const dropTag = (r: number, p: any, moved: boolean) => {
    const b = ref.current, L0 = shownLanes(b, b.demo), L = L0.slice();
    if (!moved) {
      const at = L.indexOf(r);
      if (at >= 0) L[at] = null;
      else if (L[0] === null) L[0] = r;
      else if (L[1] === null) L[1] = r;
      else { L[0] = L[1]; L[1] = r; }
    } else {
      const k = [0, 1].find((j) => p.y >= laneY(j) - 12 && p.y <= laneY(j) + Y.lane + 12 && p.x >= -20 && p.x <= 820);
      if (k === undefined) { const at = L.indexOf(r); if (at >= 0) L[at] = null; }
      else { if (L[1 - k] === r) L[1 - k] = null; L[k] = r; }
    }
    const same = L[0] === L0[0] && L[1] === L0[1];
    if (same && !b.demo) return;
    put({ lanes: L, acted: true, demo: null });
    if (!same) api.sfx.tick();
  };
  const dg = useDrag((pay: any, p: any, moved: boolean) => {
    if (!live) return;
    if (pay && pay.f) moveFinger(p, moved);
    else if (pay && pay.c) dropCard(p, moved);
    else if (pay) dropTag(pay.r, p, moved);
  });
  const dragging = dg.drag && dg.drag.moved ? dg.drag : null;
  /* the physical Backspace rubs out the last mark of work the child makes as its answer (LAYOUT §7): the last
     mark of a drawn row, or the last card of a tally (the same act as the take-back key) */
  const rubLive = useRef(false);
  rubLive.current = live && (free || it.kind === "build" || (it.kind === "belt" && !it.given));
  useEffect(() => {
    const h = (e: any) => { if (e.key === "Backspace" && rubLive.current) { if (free || it.kind === "belt") takeBack(); else rubOut(); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  /* what the host and the agent read back (never an answer before it is given: a given chart's cards are not counted here) */
  api.share({ rows: names, answers: free ? s.fk : it.given ? null : s.marked, bundles: s.groups.filter((q: any) => q.x).length,
    compared: lanesNow.map((r: any) => (r === null ? null : names[r])), finger: s.finger.stop + 1 });

  /* ── drawing ── */
  /* a long row name drops a size so it sits inside its 170-wide tag */
  const nameSize = (nm: string) => (String(tx(nm)).length > 8 ? T.micro : T.label);
  const numText =(v: any, y: number, col = amber, id = "") => (
    <text key={"v" + id + y} x={TB.numX + TB.numW / 2} y={y} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={col}>{v}</text>
  );
  const chart = (y0: number, rh: number, withNames: boolean) => {
    const h = names.length * rh;
    return (
      <g>
        <text x={16} y={y0 - 12} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(it.head)}</text>
        {/* a long name heading ("Way to school") runs past its column: the next heading moves along to keep clear */}
        <text x={String(tx(it.head)).length > 10 ? TB.tallyX + 44 : TB.tallyX + 18} y={y0 - 12} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Tally marks")}</text>
        <text x={TB.numX + TB.numW / 2} y={y0 - 12} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Number")}</text>
        <rect x={0} y={y0} width={TB.right} height={h} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        {names.map((_: any, r: number) => (r > 0 ? <line key={"l" + r} x1={0} x2={TB.right} y1={y0 + r * rh} y2={y0 + r * rh} stroke={C.ink} strokeWidth={1.5} /> : null))}
        <line x1={TB.tallyX} x2={TB.tallyX} y1={y0} y2={y0 + h} stroke={C.ink} strokeWidth={1.5} />
        <line x1={TB.numX} x2={TB.numX} y1={y0} y2={y0 + h} stroke={C.ink} strokeWidth={1.5} />
        {withNames && names.map((nm: string, r: number) => (
          <text key={"t" + r} x={18} y={y0 + r * rh + rh / 2 + 11} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(nm)}</text>
        ))}
      </g>
    );
  };
  /* the belt of answer cards: a marked card lies face down; the next one waits lifted at the head, and it can
     be dragged onto its row. A won tally shows every card turned */
  const belt = (canMark: boolean) => {
    const cards: any[] = [];
    if (free) { const from = Math.max(0, s.fk - 2); for (let k = from; k < from + 8; k++) cards.push({ k, r: tbFreeCard(k), down: k < s.fk, head: k === s.fk }); }
    /* a chart that comes already marked keeps its cards off the belt until the correction or the win lays them
       there: counting the cards would be a second tally of the very number asked */
    else if (!it.given || view) it.cards.forEach((r: number, k: number) => cards.push({ k, r, down: k < s.marked || win, head: k === s.marked && !win }));
    const cardFace = (c: any, x: number, y: number, up: boolean, replay: boolean) => (
      <g>
        <rect x={x} y={y} width={110} height={64} rx={10} fill={up ? "#FFFFFF" : tint(C.rule, 0.3)}
          stroke={replay ? C.accent : C.ink} strokeWidth={replay ? 5 : 2} filter={c.head && !c.down ? "url(#fShadowSoft)" : undefined} />
        {up ? <text x={x + 55} y={y + 42} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(names[c.r])}</text>
          : <rect x={x + 14} y={y + 12} width={82} height={40} rx={6} fill="none" stroke={shade(C.rule, 0.2)} strokeWidth={2} />}
      </g>
    );
    const back = free ? s.fhist.length > 0 : !it.given && s.marked > 0;
    return (
      <g>
        {!free && it.given && !view
          ? <rect x={0} y={0} width={W.w} height={92} rx={18} fill={tint(C.panel, 0.75)} stroke={C.dim} strokeWidth={2} strokeDasharray="12 10" />
          : <rect x={0} y={0} width={W.w} height={92} rx={18} fill={tint(C.panel, 0.35)} stroke={C.ink} strokeWidth={2} />}
        {cards.map((c: any, j: number) => {
          const replay = view && !view.done && view.card === c.k;
          const up = !c.down || replay;
          const x = 8 + j * 120, y = c.head && !replay ? 8 : 14;
          return c.head && canMark ? (
            <g key={"c" + c.k} {...control("card", "answer card " + names[c.r] + ": drag it to its row")} {...dg.bind({ c: 1 })} {...dg.keys({ c: 1 })}>
              <rect x={x} y={2} width={110} height={78} fill="transparent" />
              {cardFace(c, x, y, true, false)}
            </g>
          ) : <g key={"c" + c.k}>{cardFace(c, x, y, up, !!replay)}</g>;
        })}
        {!it.given && (
          <Key id="take-back" label="take the last card back" x={970} y={10} w={106} h={72} C={C} disabled={!live || !back} onClick={takeBack}>
            <path d="M 20 16 V 6 A 12 12 0 0 0 8 -6 H -18 M -8 -16 L -19 -6 L -8 4" stroke={C.ink} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </Key>
        )}
      </g>
    );
  };
  /* the head card while it is dragged: it follows the finger, above the chart */
  const cardGhost = () => (dragging && dragging.payload && dragging.payload.c ? (
    <g pointerEvents="none" filter="url(#fLift)">
      <rect x={dragging.x - 55} y={dragging.y - 32} width={110} height={64} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <text x={dragging.x} y={dragging.y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(names[free ? tbFreeCard(s.fk) : it.cards[s.marked]])}</text>
    </g>
  ) : null);
  /* row name tags: drag one down into the compare bar (a tap puts it in the next free lane) */
  const tags = (y0: number, rh: number) => names.map((nm: string, r: number) => {
    const inLane = lanesNow.indexOf(r) >= 0;
    return (
      <g key={"tag" + r} {...control("tag-" + (r + 1), "move " + nm + " to the compare bar")} {...(live ? dg.bind({ r }) : {})} {...(live ? dg.keys({ r }) : {})}>
        <rect x={0} y={y0 + r * rh} width={TB.tallyX} height={rh} fill="transparent" />
        <rect x={10} y={y0 + r * rh + 8} width={170} height={rh - 16} rx={14} fill={inLane ? tint(TB.sky, 0.6) : tint(C.panel, 0.2)} stroke={C.ink} strokeWidth={1.5} filter="url(#fShadowSoft)" />
        <text x={95} y={y0 + r * rh + rh / 2 + 11} textAnchor="middle" fontSize={nameSize(nm)} fontWeight={600} fill={C.ink}>{tx(nm)}</text>
      </g>
    );
  });
  /* the compare bar: two rows laid from the same left edge, the marks past the shorter row banded */
  const compareBar = (lanes: any[], lit: any, showCount: boolean, bw: number) => {
    const g = lanes.map((r: any) => (r === null ? null : free ? tbGroups(s.fr[r]) : G[r]));
    const c = g.map((q: any) => (q ? tbCount(q) : 0));
    let bandEl: any = null;
    if (g[0] && g[1] && c[0] !== c[1]) {
      const L = c[0] > c[1] ? 0 : 1, lo = Math.min(c[0], c[1]), M = tbMarks(g[L], TB.x0);
      const k = lit === null ? M.length - lo : Math.min(lit, M.length - lo);
      /* one clean band from just past the shorter row's last mark (a mark across is banded by its tip) */
      const sp = k > 0 ? tbSpan(M, lo, lo + k - 1) : null;
      if (sp) bandEl = (
        <g>
          <rect x={sp.a} y={laneY(L) + 4} width={sp.b - sp.a} height={Y.lane - 8} rx={10} fill={band} />
          {showCount && <text x={sp.b + 14} y={laneY(L) + Y.lane / 2 + 12} fontSize={T.label} fontWeight={700} fill={C.ink}>{k}</text>}
        </g>
      );
    }
    return (
      <g>
        <rect x={0} y={Y.bar} width={bw} height={W.h - Y.bar} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <line x1={TB.tallyX} x2={TB.tallyX} y1={Y.bar} y2={W.h} stroke={C.ink} strokeWidth={1.5} />
        <text x={bw - 16} y={Y.bar + 34} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("compare")}</text>
        {bandEl}
        {[0, 1].map((k) => (
          <g key={"lane" + k}>
            <rect x={12} y={laneY(k) + 6} width={TB.tallyX - 24} height={Y.lane - 12} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
            {lanes[k] !== null && <text x={TB.tallyX / 2} y={laneY(k) + Y.lane / 2 + 11} textAnchor="middle" fontSize={nameSize(names[lanes[k]])} fontWeight={600} fill={C.ink}>{tx(names[lanes[k]])}</text>}
            {g[k] && tbInk(tbMarks(g[k], TB.x0), laneY(k) + (Y.lane - TB.mh) / 2, "ln" + k)}
          </g>
        ))}
      </g>
    );
  };
  const dragTag = () => (dragging && dragging.payload && !dragging.payload.f ? (
    <g pointerEvents="none" filter="url(#fLift)">
      <rect x={dragging.x - 85} y={dragging.y - 28} width={170} height={56} rx={14} fill={tint(C.panel, 0.2)} stroke={C.ink} strokeWidth={2} />
      <text x={dragging.x} y={dragging.y + 11} textAnchor="middle" fontSize={nameSize(names[dragging.payload.r])} fontWeight={600} fill={C.ink}>{tx(names[dragging.payload.r])}</text>
    </g>
  ) : null);

  /* ── phase 1 (and free play): answer cards along the belt, one tap one mark ── */
  const beltView = () => {
    const { y0, rh } = Y;
    const cnt = names.map((_: any, r: number) => (free ? s.fr[r] : s.rowOf.filter((x: number) => x === r).length));
    const right = free ? cnt : names.map((_: any, r: number) => it.cards.filter((x: number) => x === r).length);
    const pen = view && !view.nopen && !free && !it.given ? names.map((_: any, r: number) => it.cards.slice(0, view.n).filter((x: number) => x === r).length) : null;
    const nums = free || (view && view.done);
    const total = !free && !Array.isArray(it.answer);
    const canMark = live && (free || (!it.given && s.marked < it.cards.length));
    const head = free ? Math.min(s.fk, 2) : s.marked;
    /* a given chart's correction: each card's own mark lights as the card comes round, and the total counts on */
    let lit: any = null;
    if (it.given && view && !view.done && view.card >= 0) {
      const r = it.cards[view.card], at = it.cards.slice(0, view.card).filter((x: number) => x === r).length;
      const sp = tbSpan(tbMarks(tbGroups(cnt[r]), TB.x0), at, at);
      if (sp) lit = <rect x={sp.a} y={y0 + r * rh + 6} width={sp.b - sp.a} height={rh - 12} rx={8} fill={band} />;
    }
    return (
      <g>
        {belt(canMark)}
        {chart(y0, rh, !free && !(s.flash && canMark))}
        {/* a tap on the card lights the rows it can go to, for a moment */}
        {s.flash && canMark && names.map((nm: string, r: number) => (
          <g key={"fl" + r} pointerEvents="none">
            <rect x={free ? TB.tallyX + 6 : 6} y={y0 + r * rh + 6} width={free ? TB.numX - TB.tallyX - 12 : TB.right - 12} height={rh - 12} rx={10} fill={band} />
            {!free && <text x={18} y={y0 + r * rh + rh / 2 + 11} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(nm)}</text>}
          </g>
        ))}
        {lit}
        {names.map((_: any, r: number) => <g key={"m" + r}>{tbInk(tbMarks(tbGroups(cnt[r]), TB.x0), y0 + r * rh + 12, "m" + r)}</g>)}
        {free && names.map((_: any, r: number) => (s.fr[r] >= 24
          ? <text key={"full" + r} x={TB.numX - 16} y={y0 + r * rh + rh / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("full")}</text> : null))}
        {pen && (
          <g pointerEvents="none">
            {names.map((_: any, r: number) => (
              <g key={"p" + r}>
                <line x1={500} x2={500} y1={y0 + r * rh + 10} y2={y0 + r * rh + rh - 10} stroke={C.dim} strokeWidth={2} strokeDasharray="6 8" />
                {tbInk(tbMarks(tbGroups(pen[r]), 524), y0 + r * rh + 12, "p" + r)}
              </g>
            ))}
          </g>
        )}
        {nums && names.map((_: any, r: number) => numText(right[r], y0 + r * rh + rh / 2 + 15, amber, "r" + r))}
        {total && (
          <g>
            <text x={TB.numX - 14} y={y0 + names.length * rh + 46} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("answers")}</text>
            <rect x={TB.numX} y={y0 + names.length * rh + 8} width={TB.numW} height={64} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
            {(nums || (view && view.n > 0)) && numText(nums ? it.cards.length : view.n, y0 + names.length * rh + 56, purple, "tot")}
          </g>
        )}
        {free && tags(y0, rh)}
        {canMark && names.map((nm: string, r: number) => (
          <Hit key={"h" + r} id={"row-" + (r + 1)} x={free ? TB.tallyX : 0} y={y0 + r * rh} w={TB.right - (free ? TB.tallyX : 0)} h={rh}
            label={"mark a card for " + nm} onPress={() => markRow(r)} />
        ))}
        {canMark && ((!s.acted && !view) || s.nudge) && <Invite x={8 + head * 120 + 55} y={46} r={40} C={C} />}
        {free && compareBar(s.lanes, null, true, TB.right)}
        {free && dragTag()}
        {cardGhost()}
      </g>
    );
  };

  /* ── phase 2: the child's own row, drawn mark by mark; the pen's row appears only after a miss ── */
  const drawView = () => {
    const RY = 30, RH = 100, RY2 = 236;
    const g = s.groups, L = tbLayout(g, TB.x0), last = L[L.length - 1];
    const open = last && !last.x ? last : null;
    const nx = tbNext(g, TB.x0);
    const gA = open ? open.a - 16 : 0, gB = open ? Math.min(Math.max(open.b + 16, open.a - 16 + 76), TB.numX - 4) : 0;
    const sA = open ? gB : nx - 20, sB = TB.numX - 4;
    const room = nx + TB.mw <= TB.numX - 8 && sB - sA >= HIT;
    const R = tbGroups(it.target), RM = tbMarks(R, TB.x0), RS = tbStops(R, TB.x0);
    const own = view && view.own;
    const pen = view && !own ? view : null;
    const readOf = (st: any[], upto: number, y: number, id: string) => st.map((q: any, j: number) => {
      if (j >= upto) return null;
      if (q.one && j + 1 < Math.min(upto, st.length) && st[j + 1].one) return null; /* single marks: only the latest count stands */
      return <text key={id + j} x={q.cx} y={y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={amber}>{q.v}</text>;
    });
    const rowFrame = (y: number, label: any, id: string) => (
      <g key={id}>
        <rect x={0} y={y} width={TB.right} height={RH} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <line x1={TB.tallyX} x2={TB.tallyX} y1={y} y2={y + RH} stroke={C.ink} strokeWidth={1.5} />
        <line x1={TB.numX} x2={TB.numX} y1={y} y2={y + RH} stroke={C.ink} strokeWidth={1.5} />
        <text x={TB.tallyX / 2} y={y + RH / 2 + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{label}</text>
      </g>
    );
    const crosses = RM.filter((q: any) => q.k === "x");
    const bundles = RS.filter((q: any) => !q.one), singles = RS.filter((q: any) => q.one);
    return (
      <g>
        {rowFrame(RY, it.target, "own")}
        {tbInk(tbMarks(g, TB.x0), RY + 24, "o")}
        {own && readOf(tbStops(g, TB.x0), 99, RY + RH + 34, "or")}
        {live && open && <Hit id="lay-across" x={gA} y={RY} w={gB - gA} h={RH} label="lay a mark across the standing marks" onPress={layAcross} />}
        {live && room && <Hit id="stand-up" x={sA} y={RY} w={sB - sA} h={RH} label="stand a mark up" onPress={standUp} />}
        <Key id="rub-mark" label="rub out the last mark" x={TB.numX + 12} y={RY + 12} w={TB.numW - 24} h={RH - 24} C={C} disabled={!live || !g.length} onClick={rubOut}>
          <g transform="rotate(-30)">
            <rect x={-24} y={-13} width={48} height={26} rx={6} fill={tint(C.ink, 0.55)} />
            <rect x={-24} y={-13} width={18} height={26} rx={6} fill={C.ink} />
          </g>
        </Key>
        {live && !s.acted && !view && <Invite x={open ? (open.a + open.b) / 2 : TB.x0 + 30} y={RY + RH / 2} r={48} C={C} />}
        {pen && (
          <g pointerEvents="none">
            {rowFrame(RY2, it.target, "pen")}
            {tbInk(RM.slice(0, pen.m), RY2 + 24, "pm")}
            {it.kind !== "across" && readOf(RS, pen.r || 0, RY2 + RH + 34, "pr")}
            {it.kind === "across" && crosses.map((q: any, j: number) => (j < (pen.x || 0)
              ? <text key={"cx" + j} x={(q.x + q.x1) / 2} y={RY2 - 14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={amber}>{j + 1}</text> : null))}
            {pen.done && it.kind === "build" && numText(it.target, RY2 + RH / 2 + 15)}
            {pen.done && it.kind === "split" && (
              <g>
                <text x={(bundles[0].a + bundles[bundles.length - 1].b) / 2} y={RY2 + RH + 104} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={amber}>{bundles.length}</text>
                <text x={(bundles[0].a + bundles[bundles.length - 1].b) / 2} y={RY2 + RH + 144} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("bundles")}</text>
                <text x={(singles[0].a + singles[singles.length - 1].b) / 2} y={RY2 + RH + 104} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={amber}>{singles.length}</text>
                <text x={(singles[0].a + singles[singles.length - 1].b) / 2} y={RY2 + RH + 144} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("singles")}</text>
              </g>
            )}
            {pen.done && it.kind === "across" && (
              <g>
                <text x={TB.x0} y={RY2 + RH + 72} fontSize={T.xl} fontWeight={700} fill={amber}>{crosses.length}</text>
                <text x={TB.x0 + 48} y={RY2 + RH + 72} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("across")}</text>
              </g>
            )}
          </g>
        )}
      </g>
    );
  };

  /* ── phase 3: a finished chart, the number column empty, and the counting finger ── */
  const readView = () => {
    const { y0, rh } = Y;
    const f = s.finger;
    const rowY = (r: number) => y0 + r * rh;
    const shownRow = (r: number) => (view ? (r < view.rr ? 99 : r === view.rr ? view.j : 0) : 0);
    const litStop = !view ? f : null;
    const fx = f.stop < 0 ? TB.tallyX - 30 : stopsOf(f.row)[f.stop].cx;
    const tip = rowY(f.row) + 52;
    /* the counting finger, drawn as a plain marker pointing down: its tip rests just above the marks */
    const fingerAt = (x: number, y: number, quiet: boolean) => {
      const col = quiet ? tint(C.accent, 0.45) : C.accent;
      return (
        <g transform={`translate(${x},${y})`}>
          <rect x={-8} y={-46} width={16} height={26} rx={6} fill={col} />
          <path d="M -20 -24 L 20 -24 L 0 0 Z" fill={col} stroke={col} strokeWidth={4} strokeLinejoin="round" />
        </g>
      );
    };
    const fingerDrag = dragging && dragging.payload && dragging.payload.f;
    return (
      <g>
        {chart(y0, rh, true)}
        {G.map((g: any, r: number) => {
          const st = stopsOf(r), upto = shownRow(r);
          return (
            <g key={"rw" + r}>
              {litStop && litStop.row === r && litStop.stop >= 0 && (
                <rect x={st[litStop.stop].a} y={rowY(r) + 48} width={st[litStop.stop].b - st[litStop.stop].a} height={TB.mh + 12} rx={10} fill={band} />
              )}
              {view && upto > 0 && upto < 99 && st[upto - 1] && (
                <rect x={st[upto - 1].a} y={rowY(r) + 48} width={st[upto - 1].b - st[upto - 1].a} height={TB.mh + 12} rx={10} fill={band} />
              )}
              {tbInk(tbMarks(g, TB.x0), rowY(r) + 54, "rm" + r)}
              {!view && st.map((q: any, j: number) => ((r < f.row || (r === f.row && j < f.stop))
                ? <circle key={"dot" + j} cx={q.cx} cy={rowY(r) + 124} r={5} fill={C.ink} /> : null))}
              {view && st.map((q: any, j: number) => {
                if (j >= upto) return null;
                if (q.one && j + 1 < Math.min(upto, st.length) && st[j + 1].one) return null;
                return <text key={"rv" + j} x={q.cx} y={rowY(r) + 138} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={amber}>{q.v}</text>;
              })}
              <rect x={TB.numX + 22} y={rowY(r) + 28} width={TB.numW - 44} height={rh - 56} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
              {view && upto === 99 && numText(tbCount(g), rowY(r) + rh / 2 + 15, amber, "n" + r)}
            </g>
          );
        })}
        {/* one piece, kept mounted through a drag: it follows the finger, then lands on the nearest stop */}
        {live ? (
          <g {...control("finger", "counting finger: step it along the row")} {...dg.bind({ f: 1 })} {...dg.keys({ f: 1 })}>
            <rect x={(fingerDrag ? dragging.x : fx) - 36} y={(fingerDrag ? dragging.y + 24 : tip) - 64} width={72} height={72} fill="transparent" />
            {fingerAt(fingerDrag ? dragging.x : fx, fingerDrag ? dragging.y + 24 : tip, false)}
          </g>
        ) : <g pointerEvents="none">{fingerAt(fx, tip, !!view)}</g>}
        {live && !s.acted && !view && <Invite x={fx} y={tip - 18} r={26} C={C} />}
      </g>
    );
  };

  /* ── phase 4: a chart with its numbers, the compare bar, and (for a total) the total cell ── */
  const cmpView = () => {
    const { y0, rh } = Y;
    const tot = it.kind === "total";
    const lanes = lanesNow;
    const lit = view && !tot ? (view.done ? null : view.k) : 0;
    const sum = view && tot ? G.slice(0, Math.min(view.t, G.length)).reduce((a: number, g: any) => a + tbCount(g), 0) : null;
    const adding = view && tot && !view.done ? view.t - 1 : -1;
    return (
      <g>
        {chart(y0, rh, false)}
        {adding >= 0 && <rect x={TB.numX + 8} y={y0 + adding * rh + 6} width={TB.numW - 16} height={rh - 12} rx={10} fill={band} />}
        {G.map((g: any, r: number) => <g key={"cm" + r}>{tbInk(tbMarks(g, TB.x0), y0 + r * rh + 10, "cm" + r)}</g>)}
        {G.map((g: any, r: number) => numText(tbCount(g), y0 + r * rh + rh / 2 + 15, amber, "c" + r))}
        {tags(y0, rh)}
        {compareBar(lanes, view && !tot ? lit : null, !!(view && !tot), tot ? TB.numX - 10 : TB.right)}
        {tot && (
          <g>
            <rect x={TB.numX} y={Y.bar} width={TB.numW} height={80} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
            {sum !== null && numText(sum, Y.bar + 56, purple, "sum")}
            <text x={TB.numX + TB.numW / 2} y={Y.bar + 116} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("children")}</text>
          </g>
        )}
        {/* the one pulse rings the whole chip to drag, as phases 1 to 3 ring their whole object (the runtime's
            pulse, drawn as a rounded rectangle because a chip is wide) */}
        {live && !s.acted && !view && !tot && (
          <rect className="c4-pulse" x={4} y={y0 + it.pair[0] * rh + 3} width={182} height={rh - 6} rx={18}
            fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
        )}
        {dragTag()}
      </g>
    );
  };

  return (
    <g>
      {free || it.kind === "belt" ? beltView()
        : it.kind === "build" || it.kind === "split" || it.kind === "across" ? drawView()
        : it.kind === "read" ? readView()
        : cmpView()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined || last.value === "") return null;
  const v = last.value;
  /* the question it answered: for marks across and a split, the tally drawn is the number the question named */
  const src: any = PHASES.flatMap((p: any) => p.items).find((q: any) => q.kind === last.kind && JSON.stringify(q.answer) === JSON.stringify(last.answer));
  const code = typeof v === "string" && v.startsWith("t:");
  const nums: number[] = code ? [tbCount(tbParse(v))] : tbNums(v);
  let rows: any[] = code ? [tbParse(v)] : src && src.target ? [tbGroups(src.target)] : nums.map((x: number) => (x > 0 && x <= 24 ? tbGroups(x) : null));
  if (rows.some((g: any) => !g)) rows = [];
  /* several counts are a list ("12, 8, 19"), never one number */
  const text = nums.join(", ");
  /* small tallies side by side, as large as fit beside the number; else the number alone */
  const tw = (g: any[]) => { const L = tbLayout(g, 0); return L.length ? L[L.length - 1].b : 0; };
  const k = [0.5, 0.42, 0.34, 0.26].find((kk) => TB.mh * kk <= h - 16 && rows.reduce((a: number, g: any) => a + tw(g) * kk, 0) + (rows.length - 1) * 14 + text.length * T.label * 0.6 + 36 <= w) || 0;
  let at = 10;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {k > 0 && rows.map((g: any, j: number) => {
        const x = at; at += tw(g) * k + 14;
        return <g key={"th" + j} transform={`translate(${x},${(h - TB.mh * k) / 2}) scale(${k})`}>{tbInk(tbMarks(g, 0), 0, "th" + j)}</g>;
      })}
      <text x={w - 14} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={shade(CONTENT.ten, 0.25)}>{text}</text>
    </g>
  );
}

function TallyBoard(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: tbFormat, fitHost: () => null }} />
  );
}

export default TallyBoard;
