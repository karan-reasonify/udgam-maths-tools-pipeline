/* ═══ M1.S1.T2.C4.2D1 · pattern_strip · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "pattern_strip";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Pattern Strip";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A strip of shapes, with its last cells still empty. Find the rule and carry it on."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every row carried on, and every order brought round to its start.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Draw any number, then walk the ring round to the start again.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. Patterns: पैटर्न / પેટર્ન, rule नियम / નિયમ, group समूह / જૂથ,
   cell खाना / ખાનું, strip पट्टी / પટ્ટી, row पंक्ति / હરોળ, bracket कोष्ठक / કૌંસ, quarter turn चौथाई घुमाव /
   ચોથા ભાગનો ફેરો, side (of a shape) भुजा / બાજુ, ring (of places) चक्र / ચક્ર, step चरण / પગલું. Digits stay
   digits: the runtime speaks them in the language in use. The answer slot's own words (a direction, a shape, a
   number of cells, a player) have keys too. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Pattern Strip": "पैटर्न पट्टी",
    "A strip of shapes, with its last cells still empty. Find the rule and carry it on.": "आकृतियों की एक पट्टी है, जिसके आखिरी खाने अभी खाली हैं। नियम ढूँढो और उसे आगे बढ़ाओ।",
    "Every row carried on, and every order brought round to its start.": "हर पंक्ति आगे बढ़ाई गई, और हर क्रम घूमकर अपनी शुरुआत पर लौटा।",
    "Free play. Draw any number, then walk the ring round to the start again.": "मुक्त खेल। कोई भी संख्या निकालो, फिर चक्र में चलते हुए वापस शुरू तक आओ।",

    "The group that repeats": "दोहराने वाला समूह",
    "A pattern lays one group down over and over. Find the smallest group and bracket it.": "पैटर्न एक ही समूह को बार-बार रखता है। सबसे छोटा समूह ढूँढो और उस पर कोष्ठक लगाओ।",
    "Does every copy of your group match?": "क्या तुम्हारे समूह की हर नकल एक जैसी है?",
    "Start at the first cell and stop where the row begins again.": "पहले खाने से शुरू करो और जहाँ पंक्ति फिर शुरू हो, वहाँ रुको।",
    "Find the smallest group that repeats, and every blank takes the cell one whole group before it.": "सबसे छोटा दोहराने वाला समूह ढूँढो। हर खाली खाने में वही आता है, जो उससे एक पूरा समूह पहले है।",
    "You learned: the smallest group that repeats fills every blank.": "तुमने सीखा: सबसे छोटा दोहराने वाला समूह हर खाली खाना भरता है।",
    "These beads keep one group going. How many cells long is that group?": "ये मोती एक ही समूह को दोहराते रहते हैं। उस समूह में कितने खाने हैं?",
    "How many cells in the group?": "समूह में कितने खाने?",
    "Read the beads along until the first colour comes back.": "मोतियों को पढ़ते जाओ, जब तक पहला रंग लौट न आए।",
    "Star and moon, over and over again. Where does the group end?": "तारा और चाँद, बार-बार। समूह कहाँ खत्म होता है?",
    "How far to the repeat?": "दोहराव तक कितने खाने?",
    "Name the shapes aloud and stop where the first one returns.": "आकृतियों के नाम बोलो और जहाँ पहली लौट आए, वहीं रुको।",
    "This strip hides a longer group. Where does it come round again?": "इस पट्टी में एक लंबा समूह छिपा है। वह फिर से कहाँ शुरू होता है?",
    "How many cells this time?": "इस बार कितने खाने?",
    "One shape may come more than once inside a group.": "एक आकृति एक समूह में एक से ज़्यादा बार आ सकती है।",

    "A quarter turn at every step": "हर चरण पर चौथाई घुमाव",
    "Each arrow turns the same way by the same amount. Tap the dial to make that turn.": "हर तीर एक ही दिशा में उतना ही घूमता है। वही घुमाव करने के लिए डायल पर टैप करो।",
    "Which way do the hands of a clock go?": "घड़ी की सुइयाँ किस ओर घूमती हैं?",
    "Count the quarter turns between two arrows you can see.": "तुम्हें दिखते दो तीरों के बीच चौथाई घुमाव गिनो।",
    "A turning pattern makes the same quarter turn at every step, and four quarter turns make a full turn.": "घूमने वाला पैटर्न हर चरण पर वही चौथाई घुमाव करता है। चार चौथाई घुमाव मिलकर एक पूरा घुमाव बनाते हैं।",
    "You learned: the same quarter turn at each step, four make a full turn.": "तुमने सीखा: हर चरण पर वही घुमाव; चार चौथाई घुमाव से पूरा घुमाव।",
    "Look at the turn from one cell to the next. Which way does the last arrow point?": "एक खाने से अगले खाने तक का घुमाव देखो। आखिरी तीर किस ओर होगा?",
    "Which way next?": "अगला तीर किस ओर?",
    "Put your thumb on the arrow before the empty cell and turn it.": "खाली खाने से पहले वाले तीर पर अँगूठा रखो और उसे घुमाओ।",
    "Now a dot walks round a plus, one place at a time. Where does it sit next?": "अब एक बिंदु जोड़ के निशान पर एक-एक भुजा चलता है। अगला बिंदु कहाँ होगा?",
    "Where does the dot go?": "बिंदु कहाँ जाएगा?",
    "The dot steps to the next arm of the plus, no further.": "बिंदु जोड़ के निशान की अगली भुजा तक ही जाता है, उससे आगे नहीं।",
    "This arrow makes eight quarter turns, one for each cell. Where does it end?": "यह तीर आठ चौथाई घुमाव करता है, हर खाने में एक। यह कहाँ रुकेगा?",
    "Which way after eight turns?": "आठ घुमाव के बाद किस ओर?",
    "Fill every cell, and watch the ring close each time.": "हर खाना भरो और देखो कि छोटा गोला हर बार कैसे पूरा होता है।",

    "One side fewer, then start again": "एक भुजा कम, फिर से शुरू",
    "Under each shape stands its number of straight sides. Read them along the row.": "हर आकृति के नीचे उसकी सीधी भुजाओं की संख्या है। उन्हें पंक्ति में आगे पढ़ो।",
    "Can a closed shape with straight sides have fewer than three?": "क्या बंद आकृति में तीन से कम सीधी भुजाएँ हो सकती हैं?",
    "Say the side counts out loud, from the row's start.": "पंक्ति की शुरुआत से भुजाओं की संख्याएँ ज़ोर से बोलो।",
    "A row can lose one side at each step, down to the triangle. Then it starts again from its first shape.": "एक पंक्ति हर चरण पर एक भुजा खोती है, त्रिभुज तक। फिर वह अपनी पहली आकृति से दोबारा शुरू होती है।",
    "You learned: a row loses a side down to three, then starts again.": "तुमने सीखा: पंक्ति में भुजाएँ तीन तक घटती हैं, फिर दोबारा शुरू।",
    "Watch what the counts do along this row. Which shape belongs in the empty cell?": "देखो, इस पंक्ति में संख्याएँ कैसे बदलती हैं। खाली खाने में कौन सी आकृति आएगी?",
    "Which shape fills the cell?": "खाना कौन सी आकृति भरेगी?",
    "Read the counts again and do the same to the last one.": "संख्याएँ फिर पढ़ो और आखिरी संख्या के साथ भी वही करो।",
    "This row changes the other way. What must fill the cell now?": "यह पंक्ति दूसरी तरह बदलती है। अब खाने में कौन सी आकृति आनी चाहिए?",
    "What comes next here?": "यहाँ आगे क्या आएगा?",
    "Do the counts fall here, or do they climb?": "यहाँ संख्याएँ घटती हैं या बढ़ती हैं?",
    "Lay each next shape with one side fewer. How many shapes until the row starts again?": "हर अगली आकृति एक भुजा कम की रखो। पंक्ति फिर शुरू होने तक कितनी आकृतियाँ?",
    "How many shapes?": "कितनी आकृतियाँ?",
    "Count the shapes you laid before the first one came back.": "पहली आकृति लौटने से पहले जो आकृतियाँ रखीं, उन्हें गिनो।",

    "After the last comes the first": "आखिरी के बाद पहला आता है",
    "Whoever is drawn takes the first turn. Then the ring keeps going round.": "जिसकी संख्या निकलती है, उसकी बारी पहले आती है। फिर चक्र घूमता रहता है।",
    "Who comes after the last number?": "आखिरी संख्या के बाद कौन आता है?",
    "On a ring there is no end. Keep walking round to the start.": "चक्र का कोई अंत नहीं होता। चलते रहो और शुरू पर लौट आओ।",
    "In an order that goes round, whoever is drawn goes first, and after the last number comes the first again.": "घूमते क्रम में जिसकी संख्या निकलती है, वह पहले जाता है। आखिरी संख्या के बाद फिर पहली आती है।",
    "You learned: after the last number on a ring comes the first again.": "तुमने सीखा: चक्र में आखिरी संख्या के बाद फिर पहली आती है।",
    "Five children bat in turn, going round. Tap the drum to see who starts.": "पाँच बच्चे बारी-बारी से बल्लेबाज़ी करते हैं, गोल घूमते हुए। डिब्बे पर टैप करो, कौन शुरू करेगा?",
    "The whole order?": "पूरा क्रम?",
    "The ring does not stop at the last place. Keep walking.": "चक्र आखिरी जगह पर नहीं रुकता। चलते रहो।",
    "Two teams, one draw. Read the order for both teams off the ring.": "दो टीमें, एक ही संख्या निकली। चक्र से दोनों टीमों का क्रम पढ़ो।",
    "What order for both teams?": "दोनों टीमों का क्रम क्या है?",
    "Each player keeps the same neighbour, wherever the order starts.": "क्रम कहीं से भी शुरू हो, हर खिलाड़ी का पड़ोसी वही रहता है।",
    "Six players take turns round the ring. This one goes last, so who went first?": "छह खिलाड़ी बारी-बारी से चक्र में घूमते हैं। यह आखिर में जाता है, तो पहले कौन गया?",
    "Who went first?": "पहले कौन गया?",
    "The one who goes last still has a neighbour after them.": "जो आखिर में जाता है, उसके बाद भी एक पड़ोसी होता है।",

    /* the answer slot's words, and what the working area draws */
    "1 cell": "1 खाना", "2 cells": "2 खाने", "3 cells": "3 खाने", "4 cells": "4 खाने", "5 cells": "5 खाने", "6 cells": "6 खाने", "7 cells": "7 खाने",
    "up": "ऊपर", "right": "दाएँ", "down": "नीचे", "left": "बाएँ",
    "two lines": "दो रेखाएँ", "triangle": "त्रिभुज", "square": "वर्ग", "pentagon": "पंचभुज", "hexagon": "षट्भुज", "heptagon": "सप्तभुज", "octagon": "अष्टभुज", "shape": "आकृति",
    "player 1": "खिलाड़ी 1", "player 2": "खिलाड़ी 2", "player 3": "खिलाड़ी 3", "player 4": "खिलाड़ी 4", "player 5": "खिलाड़ी 5", "player 6": "खिलाड़ी 6",
    "5 shapes": "5 आकृतियाँ",
    "Cells filled": "भरे खाने",
    "Places filled": "भरी जगहें",
    "last": "आखिरी",
    "Team 1": "टीम 1",
    "Team 2": "टीम 2",
  },
  gu: {
    "Pattern Strip": "પેટર્ન પટ્ટી",
    "A strip of shapes, with its last cells still empty. Find the rule and carry it on.": "આકૃતિઓની એક પટ્ટી છે, જેના છેલ્લા ખાના હજી ખાલી છે. નિયમ શોધો અને તેને આગળ વધારો.",
    "Every row carried on, and every order brought round to its start.": "દરેક હરોળ આગળ વધી, અને દરેક ક્રમ ફરીને શરૂઆતે પાછો આવ્યો.",
    "Free play. Draw any number, then walk the ring round to the start again.": "મુક્ત રમત. કોઈ પણ સંખ્યા કાઢો, પછી ચક્રમાં ચાલીને ફરી શરૂઆત પર આવો.",

    "The group that repeats": "ફરી ફરી આવતું જૂથ",
    "A pattern lays one group down over and over. Find the smallest group and bracket it.": "પેટર્ન એક જ જૂથને વારંવાર મૂકે છે. સૌથી નાનું જૂથ શોધો અને તેના પર કૌંસ મૂકો.",
    "Does every copy of your group match?": "શું તમારા જૂથની દરેક નકલ એકસરખી છે?",
    "Start at the first cell and stop where the row begins again.": "પહેલા ખાનાથી શરૂ કરો અને જ્યાં હરોળ ફરી શરૂ થાય ત્યાં અટકો.",
    "Find the smallest group that repeats, and every blank takes the cell one whole group before it.": "સૌથી નાનું ફરી આવતું જૂથ શોધો. દરેક ખાલી ખાનામાં તે જ આવે છે, જે તેનાથી એક આખું જૂથ પહેલાં છે.",
    "You learned: the smallest group that repeats fills every blank.": "તમે શીખ્યા: સૌથી નાનું ફરી આવતું જૂથ દરેક ખાલી ખાનું ભરે છે.",
    "These beads keep one group going. How many cells long is that group?": "આ મણકા એક જ જૂથને દોહરાવ્યા કરે છે. તે જૂથમાં કેટલા ખાના છે?",
    "How many cells in the group?": "જૂથમાં કેટલા ખાના?",
    "Read the beads along until the first colour comes back.": "મણકા વાંચતા જાઓ, જ્યાં સુધી પહેલો રંગ પાછો ન આવે.",
    "Star and moon, over and over again. Where does the group end?": "તારો અને ચાંદો, વારંવાર. જૂથ ક્યાં પૂરું થાય છે?",
    "How far to the repeat?": "ફરી આવવા સુધી કેટલા ખાના?",
    "Name the shapes aloud and stop where the first one returns.": "આકૃતિઓનાં નામ બોલો અને જ્યાં પહેલી પાછી આવે ત્યાં અટકો.",
    "This strip hides a longer group. Where does it come round again?": "આ પટ્ટીમાં એક લાંબું જૂથ છુપાયેલું છે. તે ફરી ક્યાં શરૂ થાય છે?",
    "How many cells this time?": "આ વખતે કેટલા ખાના?",
    "One shape may come more than once inside a group.": "એક આકૃતિ એક જૂથમાં એકથી વધુ વાર આવી શકે.",

    "A quarter turn at every step": "દરેક પગલે ચોથા ભાગનો ફેરો",
    "Each arrow turns the same way by the same amount. Tap the dial to make that turn.": "દરેક તીર એક જ દિશામાં એટલું જ ફરે છે. એ જ ફેરો કરવા ડાયલ પર ટૅપ કરો.",
    "Which way do the hands of a clock go?": "ઘડિયાળના કાંટા કઈ તરફ ફરે છે?",
    "Count the quarter turns between two arrows you can see.": "તમને દેખાતા બે તીર વચ્ચે ચોથા ભાગના ફેરા ગણો.",
    "A turning pattern makes the same quarter turn at every step, and four quarter turns make a full turn.": "ફરતી પેટર્ન દરેક પગલે એ જ ચોથા ભાગનો ફેરો કરે છે. ચાર ચોથા ભાગના ફેરા મળીને એક પૂરો ફેરો બને છે.",
    "You learned: the same quarter turn at each step, four make a full turn.": "તમે શીખ્યા: દરેક પગલે એ જ ફેરો; ચાર ચોથા ભાગથી પૂરો ફેરો.",
    "Look at the turn from one cell to the next. Which way does the last arrow point?": "એક ખાનાથી બીજા ખાના સુધીનો ફેરો જુઓ. છેલ્લું તીર કઈ તરફ હશે?",
    "Which way next?": "આગળનું તીર કઈ તરફ?",
    "Put your thumb on the arrow before the empty cell and turn it.": "ખાલી ખાનાની પહેલાંના તીર પર અંગૂઠો મૂકો અને તેને ફેરવો.",
    "Now a dot walks round a plus, one place at a time. Where does it sit next?": "હવે એક ટપકું વત્તાની નિશાની પર એક એક હાથ ચાલે છે. આગળનું ટપકું ક્યાં હશે?",
    "Where does the dot go?": "ટપકું ક્યાં જશે?",
    "The dot steps to the next arm of the plus, no further.": "ટપકું વત્તાની નિશાનીના આગળના હાથ સુધી જ જાય છે, તેનાથી આગળ નહીં.",
    "This arrow makes eight quarter turns, one for each cell. Where does it end?": "આ તીર આઠ ચોથા ભાગના ફેરા કરે છે, દરેક ખાનામાં એક. તે ક્યાં અટકશે?",
    "Which way after eight turns?": "આઠ ફેરા પછી કઈ તરફ?",
    "Fill every cell, and watch the ring close each time.": "દરેક ખાનું ભરો અને નાના વર્તુળને દર વખતે પૂરું થતું જુઓ.",

    "One side fewer, then start again": "એક બાજુ ઓછી, પછી ફરી શરૂ",
    "Under each shape stands its number of straight sides. Read them along the row.": "દરેક આકૃતિની નીચે તેની સીધી બાજુઓની સંખ્યા છે. તેમને હરોળમાં આગળ વાંચો.",
    "Can a closed shape with straight sides have fewer than three?": "શું સીધી બાજુઓવાળી બંધ આકૃતિને ત્રણથી ઓછી બાજુ હોઈ શકે?",
    "Say the side counts out loud, from the row's start.": "હરોળની શરૂઆતથી બાજુઓની સંખ્યા મોટેથી બોલો.",
    "A row can lose one side at each step, down to the triangle. Then it starts again from its first shape.": "એક હરોળ દરેક પગલે એક બાજુ ગુમાવે છે, ત્રિકોણ સુધી. પછી તે પોતાની પહેલી આકૃતિથી ફરી શરૂ થાય છે.",
    "You learned: a row loses a side down to three, then starts again.": "તમે શીખ્યા: હરોળમાં બાજુઓ ત્રણ સુધી ઘટે છે, પછી ફરી શરૂ.",
    "Watch what the counts do along this row. Which shape belongs in the empty cell?": "જુઓ, આ હરોળમાં સંખ્યાઓ કેવી રીતે બદલાય છે. ખાલી ખાનામાં કઈ આકૃતિ આવશે?",
    "Which shape fills the cell?": "ખાનું કઈ આકૃતિ ભરશે?",
    "Read the counts again and do the same to the last one.": "સંખ્યાઓ ફરી વાંચો અને છેલ્લી સંખ્યા સાથે પણ એ જ કરો.",
    "This row changes the other way. What must fill the cell now?": "આ હરોળ બીજી રીતે બદલાય છે. હવે ખાનામાં કઈ આકૃતિ આવવી જોઈએ?",
    "What comes next here?": "અહીં આગળ શું આવશે?",
    "Do the counts fall here, or do they climb?": "અહીં સંખ્યાઓ ઘટે છે કે વધે છે?",
    "Lay each next shape with one side fewer. How many shapes until the row starts again?": "દરેક આગળની આકૃતિ એક બાજુ ઓછી રાખો. હરોળ ફરી શરૂ થાય ત્યાં સુધી કેટલી આકૃતિઓ?",
    "How many shapes?": "કેટલી આકૃતિઓ?",
    "Count the shapes you laid before the first one came back.": "પહેલી આકૃતિ પાછી આવે તે પહેલાં જે આકૃતિઓ મૂકી, તે ગણો.",

    "After the last comes the first": "છેલ્લા પછી પહેલું આવે છે",
    "Whoever is drawn takes the first turn. Then the ring keeps going round.": "જેની સંખ્યા નીકળે તેની વારી પહેલી આવે છે. પછી ચક્ર ફરતું રહે છે.",
    "Who comes after the last number?": "છેલ્લી સંખ્યા પછી કોણ આવે છે?",
    "On a ring there is no end. Keep walking round to the start.": "ચક્રને કોઈ અંત નથી. ચાલતા રહો અને શરૂઆત પર પાછા આવો.",
    "In an order that goes round, whoever is drawn goes first, and after the last number comes the first again.": "ફરતા ક્રમમાં જેની સંખ્યા નીકળે તે પહેલો જાય છે. છેલ્લી સંખ્યા પછી ફરી પહેલી આવે છે.",
    "You learned: after the last number on a ring comes the first again.": "તમે શીખ્યા: ચક્રમાં છેલ્લી સંખ્યા પછી ફરી પહેલી આવે છે.",
    "Five children bat in turn, going round. Tap the drum to see who starts.": "પાંચ બાળકો વારાફરતી બેટિંગ કરે છે, ગોળ ફરતાં. ડબ્બા પર ટૅપ કરો અને જુઓ કોણ શરૂ કરે છે.",
    "The whole order?": "આખો ક્રમ?",
    "The ring does not stop at the last place. Keep walking.": "ચક્ર છેલ્લી જગ્યાએ અટકતું નથી. ચાલતા રહો.",
    "Two teams, one draw. Read the order for both teams off the ring.": "બે ટીમ, એક જ સંખ્યા નીકળી. ચક્રમાંથી બંને ટીમનો ક્રમ વાંચો.",
    "What order for both teams?": "બંને ટીમનો ક્રમ શું છે?",
    "Each player keeps the same neighbour, wherever the order starts.": "ક્રમ ગમે ત્યાંથી શરૂ થાય, દરેક ખેલાડીનો પાડોશી એ જ રહે છે.",
    "Six players take turns round the ring. This one goes last, so who went first?": "છ ખેલાડીઓ વારાફરતી ચક્રમાં ફરે છે. આ છેલ્લો જાય છે, તો પહેલો કોણ ગયો?",
    "Who went first?": "પહેલો કોણ ગયો?",
    "The one who goes last still has a neighbour after them.": "જે છેલ્લો જાય છે, તેની પછી પણ એક પાડોશી હોય છે.",

    /* the answer slot's words, and what the working area draws */
    "1 cell": "1 ખાનું", "2 cells": "2 ખાના", "3 cells": "3 ખાના", "4 cells": "4 ખાના", "5 cells": "5 ખાના", "6 cells": "6 ખાના", "7 cells": "7 ખાના",
    "up": "ઉપર", "right": "જમણે", "down": "નીચે", "left": "ડાબે",
    "two lines": "બે રેખાઓ", "triangle": "ત્રિકોણ", "square": "ચોરસ", "pentagon": "પંચકોણ", "hexagon": "ષટ્કોણ", "heptagon": "સપ્તકોણ", "octagon": "અષ્ટકોણ", "shape": "આકૃતિ",
    "player 1": "ખેલાડી 1", "player 2": "ખેલાડી 2", "player 3": "ખેલાડી 3", "player 4": "ખેલાડી 4", "player 5": "ખેલાડી 5", "player 6": "ખેલાડી 6",
    "5 shapes": "5 આકૃતિઓ",
    "Cells filled": "ભરેલા ખાના",
    "Places filled": "ભરેલી જગ્યાઓ",
    "last": "છેલ્લો",
    "Team 1": "ટીમ 1",
    "Team 2": "ટીમ 2",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase, with the plan's question id (qid)
           kind  "group" | "turn" | "sides" | "count" | "order" | "first" (Work, judge and oracle switch on it)
           near  the item's own misconception, the value judge must reject (nearMiss)
           pad "enter": the answer is made on the working area; the digit keys stay quiet */
const PHASES = [
  {
    n: 1,
    concept: "The group that repeats",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O1"],
    says: ["A pattern lays one group down over and over. Find the smallest group and bracket it."],
    ladder: ["Does every copy of your group match?","Start at the first cell and stop where the row begins again."],
    closing: "Find the smallest group that repeats, and every blank takes the cell one whole group before it.",
    learned: "You learned: the smallest group that repeats fills every blank.",
    traceback: "Every copy of the child's run is lit along the strip and the cell that breaks a copy is ringed; then the smallest group is bracketed, its copies light and the blanks fill.",
    items: [
      /* learn ML1: answer in the plan = Red, then blue (the blanks). The tool asks for the group that makes them. */
      { qid: "M1.S1.T2.C4:ML1", kind: "group", pad: "enter",
        say: "These beads keep one group going. How many cells long is that group?",
        ask: "How many cells in the group?", answer: "3 cells", near: "2 cells",
        miss: "Read the beads along until the first colour comes back." },
      /* practice 1: answer in the plan = Moon, because star and moon take turns */
      { qid: "M1.S1.T2.C4:1", kind: "group", pad: "enter",
        say: "Star and moon, over and over again. Where does the group end?",
        ask: "How far to the repeat?", answer: "2 cells", near: "1 cell",
        miss: "Name the shapes aloud and stop where the first one returns." },
      /* practice 2: answer in the plan = Square, and the group is square, square, circle */
      { qid: "M1.S1.T2.C4:2", kind: "group", pad: "enter",
        say: "This strip hides a longer group. Where does it come round again?",
        ask: "How many cells this time?", answer: "3 cells", near: "2 cells",
        miss: "One shape may come more than once inside a group." },
    ],
  },
  {
    n: 2,
    concept: "A quarter turn at every step",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Each arrow turns the same way by the same amount. Tap the dial to make that turn."],
    ladder: ["Which way do the hands of a clock go?","Count the quarter turns between two arrows you can see."],
    closing: "A turning pattern makes the same quarter turn at every step, and four quarter turns make a full turn.",
    learned: "You learned: the same quarter turn at each step, four make a full turn.",
    traceback: "The dial replays the turn between the last two cells as a clockwise arc, quarter by quarter, and a ghost row under the strip ends on the arrow the rule makes.",
    items: [
      /* learn ML2: answer in the plan = Up, then right, then down, then left again */
      { qid: "M1.S1.T2.C5:ML2", kind: "turn", pad: "enter",
        say: "Look at the turn from one cell to the next. Which way does the last arrow point?",
        ask: "Which way next?", answer: "down", near: "up",
        miss: "Put your thumb on the arrow before the empty cell and turn it." },
      /* practice 3: answer in the plan = At the right */
      { qid: "M1.S1.T2.C5:3", kind: "turn", pad: "enter",
        say: "Now a dot walks round a plus, one place at a time. Where does it sit next?",
        ask: "Where does the dot go?", answer: "right", near: "left",
        miss: "The dot steps to the next arm of the plus, no further." },
      /* practice 4: answer in the plan = Down again, because eight quarter turns make two full turns */
      { qid: "M1.S1.T2.C5:4", kind: "turn", pad: "enter",
        say: "This arrow makes eight quarter turns, one for each cell. Where does it end?",
        ask: "Which way after eight turns?", answer: "down", near: "right",
        miss: "Fill every cell, and watch the ring close each time." },
    ],
  },
  {
    n: 3,
    concept: "One side fewer, then start again",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O2"],
    says: ["Under each shape stands its number of straight sides. Read them along the row."],
    ladder: ["Can a closed shape with straight sides have fewer than three?","Say the side counts out loud, from the row's start."],
    closing: "A row can lose one side at each step, down to the triangle. Then it starts again from its first shape.",
    learned: "You learned: a row loses a side down to three, then starts again.",
    traceback: "The child's figure is redrawn with its open end ringed, then the row's own counts are read out under it and the shape the rule makes lands in the cell.",
    items: [
      /* learn ML3: answer in the plan = A triangle, and then a pentagon again */
      { qid: "M1.S1.T2.C6:ML3", kind: "sides", pad: "enter",
        say: "Watch what the counts do along this row. Which shape belongs in the empty cell?",
        ask: "Which shape fills the cell?", answer: "triangle", near: "two lines",
        miss: "Read the counts again and do the same to the last one." },
      /* practice 5: answer in the plan = A pentagon, because the shapes gain one side each time */
      { qid: "M1.S1.T2.C6:5", kind: "sides", pad: "enter",
        say: "This row changes the other way. What must fill the cell now?",
        ask: "What comes next here?", answer: "pentagon", near: "triangle",
        miss: "Do the counts fall here, or do they climb?" },
      /* practice 6: answer in the plan = Five: seven sides, six, five, four and three */
      { qid: "M1.S1.T2.C6:6", kind: "count",
        say: "Lay each next shape with one side fewer. How many shapes until the row starts again?",
        ask: "How many shapes?", answer: 5, near: 6,
        miss: "Count the shapes you laid before the first one came back." },
    ],
  },
  {
    n: 4,
    concept: "After the last comes the first",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Whoever is drawn takes the first turn. Then the ring keeps going round."],
    ladder: ["Who comes after the last number?","On a ring there is no end. Keep walking round to the start."],
    closing: "In an order that goes round, whoever is drawn goes first, and after the last number comes the first again.",
    learned: "You learned: after the last number on a ring comes the first again.",
    traceback: "The places still to fill are drawn as empty boxes, the ring is walked from the drawn place past the last number and on to the first, and an arc joins them.",
    items: [
      /* learn ML4: answer in the plan = 4, 5, 1, 2, 3 */
      { qid: "M1.S1.T2.C7:ML4", kind: "order", pad: "enter",
        say: "Five children bat in turn, going round. Tap the drum to see who starts.",
        ask: "The whole order?", answer: "4 5 1 2 3", near: "4 5",
        miss: "The ring does not stop at the last place. Keep walking." },
      /* practice 7: answer in the plan = 3, 4, 5, 1, 2 for both teams, because the same draw starts both */
      { qid: "M1.S1.T2.C7:7", kind: "order", pad: "enter",
        say: "Two teams, one draw. Read the order for both teams off the ring.",
        ask: "What order for both teams?", answer: "3 4 5 1 2", near: "3 1 2 4 5",
        miss: "Each player keeps the same neighbour, wherever the order starts." },
      /* practice 8: answer in the plan = Player 3, because the order was 3, 4, 5, 6, 1, 2 */
      { qid: "M1.S1.T2.C7:8", kind: "first", pad: "enter",
        say: "Six players take turns round the ring. This one goes last, so who went first?",
        ask: "Who went first?", answer: "player 3", near: "player 1",
        miss: "The one who goes last still has a neighbour after them." },
    ],
  },
];

/* The strips, rows and rings the working area draws (they go into the sidecar too).
   face: "blue" / "amber" say which kind of counter, not which shape, so the colour grammar holds. */
const MODEL = {
  cell: 100, gap: 8, top: 86,
  items: {
    "1.1": { pic: "bead", strip: ["blue", "amber", "amber", "blue", "amber", "amber"], blanks: 2, group: 3 },
    "1.2": { pic: "shape", strip: ["star", "moon", "star", "moon", "star"], blanks: 1, group: 2 },
    "1.3": { pic: "shape", strip: ["square", "square", "circle", "square", "square", "circle", "square"], blanks: 1, group: 3 },
    "2.1": { pic: "arrow", given: [3, 0, 1], blanks: 1 },
    "2.2": { pic: "plus", given: [2, 3, 0], blanks: 1 },
    "2.3": { pic: "arrow", given: [2], blanks: 8 },
    "3.1": { counts: [5, 4, 3, 5, 4], blanks: 1, cap: 1 },
    "3.2": { counts: [3, 4, 5, 3, 4], blanks: 1, cap: 1 },
    "3.3": { counts: [7], blanks: 5, cap: 7, floor: 3 },
    "4.1": { ring: 5, drawn: 4, teams: 1, blanks: 5 },
    "4.2": { ring: 5, drawn: 3, teams: 2, blanks: 5 },
    "4.3": { ring: 6, last: 2, teams: 1, blanks: 6 },
  },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const PS_DIRS = ["up", "right", "down", "left"];
const PS_SHAPES: any = { 2: "two lines", 3: "triangle", 4: "square", 5: "pentagon", 6: "hexagon", 7: "heptagon", 8: "octagon" };
const psShapeName = (k: number) => PS_SHAPES[k] || "shape";
const psSidesOf = (name: string) => { const k = Object.keys(PS_SHAPES).find((s) => PS_SHAPES[s] === String(name).trim().toLowerCase()); return k ? +k : 0; };
const psCellWord = (k: number) => (k === 1 ? "1 cell" : k + " cells");

/* judge: is this value right for this item? (the count question compares as a number) */
const judge = (item: any, v: any) => {
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work.
   group  a period is a length whose whole strip is one group written again and again
   turn   a unit vector turned by ninety degrees a step, read back off its cosine and sine
   sides  the counts of a row that starts over read as a cycle: the next count is the one a cycle back
   count  the run of side counts from the first shape down to the smallest closed shape
   order  a circular walk built by following each place's neighbour round the ring */
const oracle = () => {
  const M = MODEL.items;
  const period = (a: any[]) => { for (let p = 1; p <= a.length; p++) { let ok = true; for (let i = p; i < a.length; i++) if (a[i] !== a[i - p]) { ok = false; break; } if (ok) return p; } return a.length; };
  const spin = (d0: number, steps: number) => {
    let x = Math.round(Math.cos((d0 - 1) * Math.PI / 2)), y = Math.round(Math.sin((d0 - 1) * Math.PI / 2));
    for (let s = 0; s < steps; s++) { const nx = -y, ny = x; x = nx; y = ny; }
    return (Math.round(Math.atan2(y, x) / (Math.PI / 2)) + 5) % 4;
  };
  const walk = (size: number, from: number) => { const out = []; let at = from; for (let k = 0; k < size; k++) { out.push(at); at = at === size ? 1 : at + 1; } return out; };
  const want: any = {};
  want["1.1"] = psCellWord(period(M["1.1"].strip));
  want["1.2"] = psCellWord(period(M["1.2"].strip));
  want["1.3"] = psCellWord(period(M["1.3"].strip));
  want["2.1"] = PS_DIRS[spin(M["2.1"].given[M["2.1"].given.length - 1], M["2.1"].blanks)];
  want["2.2"] = PS_DIRS[spin(M["2.2"].given[M["2.2"].given.length - 1], M["2.2"].blanks)];
  want["2.3"] = PS_DIRS[spin(M["2.3"].given[M["2.3"].given.length - 1], M["2.3"].blanks)];
  const cyc = (c: number[]) => { const p = period(c); return psShapeName(c[c.length - p]); };
  want["3.1"] = cyc(M["3.1"].counts);
  want["3.2"] = cyc(M["3.2"].counts);
  let run = 0; for (let s = M["3.3"].counts[0]; s >= M["3.3"].floor; s--) run++;
  want["3.3"] = run;
  want["4.1"] = walk(M["4.1"].ring, M["4.1"].drawn).join(" ");
  want["4.2"] = walk(M["4.2"].ring, M["4.2"].drawn).join(" ");
  want["4.3"] = "player " + walk(M["4.3"].ring, M["4.3"].last)[1];
  return PHASES.every((p: any, k: number) => p.items.every((it: any, j: number) => String(want[`${k + 1}.${j + 1}`]) === String(it.answer)));
};
/* the most likely wrong answer (the item's own misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent's answer() for an item made on the working area: set it as a child would */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: nothing waits here, so Enter carries the working area's value */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */

const PS_INK = { blue: CONTENT.hundred, amber: CONTENT.ten, made: CONTENT.one, step: CONTENT.pointer, look: CONTENT.bead };
const psGeo = (count: number) => {
  const pitch = MODEL.cell + MODEL.gap, total = count * MODEL.cell + (count - 1) * MODEL.gap;
  const x0 = Math.round((W.w - total) / 2);
  return { x0, pitch, count, top: MODEL.top, bot: MODEL.top + MODEL.cell,
    x: (i: number) => x0 + i * pitch, cx: (i: number) => x0 + i * pitch + MODEL.cell / 2, cy: MODEL.top + MODEL.cell / 2 };
};
/* every whole block of `len` cells along the strip, and the first cell in it that breaks the match */
const psCopies = (given: any[], len: number) => {
  const out: any[] = [];
  if (len < 1) return out;
  for (let s = 0; s + len <= given.length; s += len) {
    let bad = -1;
    for (let t = 0; t < len; t++) if (given[s + t] !== given[t]) { bad = s + t; break; }
    out.push({ start: s, len, ok: bad < 0, bad });
  }
  return out;
};
const psRound = (size: number, from: number) => { const out = []; for (let k = 0; k < size; k++) out.push(((from - 1 + k) % size) + 1); return out; };

/* ── little pictures ───────────────────────────────────────────────────────────────────── */

const psPoly = (k: number, cx: number, cy: number, r: number) => {
  const pts: string[] = [], off = k === 4 ? Math.PI / 4 : 0;
  for (let i = 0; i < k; i++) { const t = -Math.PI / 2 + off + (i * 2 * Math.PI) / k; pts.push(`${(cx + r * Math.cos(t)).toFixed(1)},${(cy + r * Math.sin(t)).toFixed(1)}`); }
  return pts.join(" ");
};
const psStar = (cx: number, cy: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.44 : r, t = -Math.PI / 2 + (i * Math.PI) / 5; pts.push(`${(cx + rr * Math.cos(t)).toFixed(1)},${(cy + rr * Math.sin(t)).toFixed(1)}`); }
  return pts.join(" ");
};
const psMoon = (cx: number, cy: number, r: number) =>
  `M ${cx + r * 0.22} ${cy - r} A ${r} ${r} 0 1 0 ${cx + r * 0.22} ${cy + r} A ${r * 0.86} ${r * 0.86} 0 1 1 ${cx + r * 0.22} ${cy - r} Z`;
const psPlus = (cx: number, cy: number, r: number) => {
  const a = r * 0.34;
  return `M ${cx - a} ${cy - r} H ${cx + a} V ${cy - a} H ${cx + r} V ${cy + a} H ${cx + a} V ${cy + r} H ${cx - a} V ${cy + a} H ${cx - r} V ${cy - a} Z`;
};
const psArrow = (cx: number, cy: number, r: number) =>
  `M ${cx} ${cy - r} L ${cx + r * 0.62} ${cy - r * 0.1} L ${cx + r * 0.24} ${cy - r * 0.1} L ${cx + r * 0.24} ${cy + r} L ${cx - r * 0.24} ${cy + r} L ${cx - r * 0.24} ${cy - r * 0.1} L ${cx - r * 0.62} ${cy - r * 0.1} Z`;
/* a clockwise arc of `q` quarters from the top, drawn on a circle of radius r */
const psArc = (cx: number, cy: number, r: number, from: number, q: number) => {
  const a0 = (from - 1) * Math.PI / 2, a1 = a0 + q * Math.PI / 2;
  const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
  return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${q > 2 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};

/** one face of the strip: a bead, a shape, an arrow, or a dot on a plus */
function PsFace({ pic, face, dir, cx, cy, r, paint, ink }: any) {
  if (pic === "bead") return <Disc x={cx} y={cy} r={r} paint={face === "amber" ? "gTen" : "gHundred"} />;
  if (pic === "arrow") return <path d={psArrow(cx, cy, r)} transform={`rotate(${dir * 90} ${cx} ${cy})`} fill={paint} stroke={ink} strokeWidth={3} strokeLinejoin="round" />;
  if (pic === "plus") {
    const d = [[0, -r * 0.7], [r * 0.7, 0], [0, r * 0.7], [-r * 0.7, 0]][dir % 4];
    return (<g><path d={psPlus(cx, cy, r)} fill="none" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={cx + d[0]} cy={cy + d[1]} r={r * 0.26} fill={paint} /></g>);
  }
  if (face === "circle") return <circle cx={cx} cy={cy} r={r} fill={paint} stroke={ink} strokeWidth={3} />;
  if (face === "square") return <rect x={cx - r * 0.88} y={cy - r * 0.88} width={r * 1.76} height={r * 1.76} rx={RAD.piece} fill={paint} stroke={ink} strokeWidth={3} />;
  if (face === "star") return <polygon points={psStar(cx, cy, r)} fill={paint} stroke={ink} strokeWidth={3} strokeLinejoin="round" />;
  if (face === "moon") return <path d={psMoon(cx, cy, r)} fill={paint} stroke={ink} strokeWidth={3} strokeLinejoin="round" />;
  return null;
}

/** a straight-sided shape by its number of sides; two sides cannot close, so it is drawn open */
function PsSided({ k, cx, cy, r, paint, ink }: any) {
  if (k <= 2) return <path d={`M ${cx - r} ${cy + r * 0.62} L ${cx} ${cy - r * 0.72} L ${cx + r} ${cy + r * 0.62}`} fill="none" stroke={ink} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />;
  return <polygon points={psPoly(k, cx, cy, r)} fill={paint} stroke={ink} strokeWidth={3} strokeLinejoin="round" />;
}

/** an empty outlined cell, or a cell with a face in it */
function PsCell({ g, i, children, C, lit }: any) {
  return (
    <g>
      <rect x={g.x(i)} y={g.top} width={MODEL.cell} height={MODEL.cell} rx={RAD.panel}
        fill={children ? "url(#gCard)" : C.paper} stroke={lit ? shade(PS_INK.made, 0.25) : C.rule} strokeWidth={lit ? 4 : 3}
        strokeDasharray={children ? undefined : "9 9"} />
      {children}
    </g>
  );
}

/* ── the child's state, one item at a time ─────────────────────────────────────────────── */

const psFresh = (key: string, n: number) => {
  if (key === "free") return { key, drawn: null, order: [], picked: null, demo: null };
  if (n === 1) return { key, len: 1, touched: false, demo: null };
  if (n === 2) return { key, fills: [], turns: 0, demo: null };
  if (n === 3) return { key, laid: [], demo: null };
  return { key, drawn: null, order: [], picked: null, demo: null };
};
/* what the working area would send if Enter came now ("" = nothing to send yet) */
const psValue = (n: number, md: any, S: any, item: any) => {
  if (n === 1) return S.touched ? psCellWord(S.len) : "";
  if (n === 2) return S.fills.length >= md.blanks ? PS_DIRS[S.fills[S.fills.length - 1]] : "";
  if (n === 3) return S.laid.length ? psShapeName(S.laid[S.laid.length - 1]) : "";
  if (item.kind === "first") return S.picked ? "player " + S.picked : "";
  return S.order.length ? S.order.join(" ") : "";
};

function Work({ phase, n, item, index, stage, wrong, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [, bump] = useState(0);
  const free = stage === "free";
  /* the runtime clamps `item` to the phase's last question but passes `index` raw: clamp it too,
     so the model, the item and the child's state can never come from different questions */
  const at = Math.max(0, Math.min(index || 0, ((phase.items || []).length || 1) - 1));
  const key = free ? "free" : `${n}.${at + 1}`;
  const stRef = useRef<any>(null);
  if (!stRef.current || stRef.current.key !== key) stRef.current = psFresh(key, n);
  const S = stRef.current;
  const put = (o: any) => { stRef.current = { ...stRef.current, ...o }; bump((x) => x + 1); };
  const act = (o: any) => put({ ...o, demo: null });       /* the child's next act clears the demo layer */
  const dput = (o: any) => put({ demo: { ...(stRef.current.demo || {}), ...o } });

  const md = MODEL.items[free ? "4.3" : key] || MODEL.items[`${n}.1`] || MODEL.items["1.1"];
  const won = stage === "win" || stage === "idle";
  const live = (stage === "ask" || free) && !tl.busy;
  const value = free ? "" : psValue(n, md, S, item);

  /* the agent sets the working area as a child would, then Enter sends it */
  HOOK.set = (v: any) => {
    const s = String(v);
    if (n === 1) put({ len: leadNumber(s) || 1, touched: true, demo: null });
    else if (n === 2) {
      const last = PS_DIRS.indexOf(s.trim().toLowerCase()), b = md.blanks, f = [];
      for (let j = 0; j < b; j++) f.push((last - (b - 1 - j) + 40) % 4);
      put({ fills: f, turns: b, demo: null });
    } else if (n === 3) put({ laid: [psSidesOf(s)], demo: null });
    else if (item.kind === "first") put({ picked: leadNumber(s) || null, demo: null });
    else put({ drawn: md.drawn, order: s.split(/\s+/).map((x: string) => +x).filter((x: number) => x > 0), demo: null });
    api.setTyped(s);
    return true;
  };

  /* Enter carries what the working area holds (the pad's digits are quiet on these items) */
  api.onEnter(stage === "ask" && item.pad === "enter" ? () => { if (value) api.submit(value); } : null);

  /* the traceback: redraw the maths, end on the whole right answer, never mark anything */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const v = String(wrong.value == null ? "" : wrong.value);
    const steps: any[] = [];
    if (n === 1) {
      const k = Math.max(1, Math.min(leadNumber(v) || 1, md.strip.length));
      steps.push([700, () => put({ demo: { step: 1, k } })], [1500, () => dput({ step: 2 })],
        [1500, () => dput({ step: 3 })], [1600, () => dput({ step: 4 })], [600, () => {}]);
    } else if (n === 2) {
      const k = PS_DIRS.indexOf(v.trim().toLowerCase());
      steps.push([700, () => put({ demo: { step: 1, k } })], [1500, () => dput({ step: 2 })],
        [1600, () => dput({ step: 3 })], [600, () => {}]);
    } else if (n === 3) {
      const k = psSidesOf(v);
      steps.push([700, () => put({ demo: { step: 1, k } })], [1500, () => dput({ step: 2 })],
        [1600, () => dput({ step: 3 })], [600, () => {}]);
    } else {
      steps.push([700, () => put({ demo: { step: 1 } })], [1500, () => dput({ step: 2 })],
        [1600, () => dput({ step: 3 })], [600, () => {}]);
    }
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ strip: md.strip || md.given || md.counts || null, bracket: n === 1 ? S.len : null,
    turns: n === 2 ? S.turns : null, sideCounts: n === 3 ? [...(md.counts || []), ...S.laid] : null,
    ringSize: md.ring || null, drawn: S.drawn || null, order: S.order && S.order.length ? S.order : null });

  /* the running count: places filled against the places this phase leaves empty */
  const filled = () => {
    if (free) return S.order.length;
    let done = 0;
    for (let j = 0; j < at; j++) done += (MODEL.items[`${n}.${j + 1}`] || {}).blanks || 0;
    const here = n === 1 ? (won ? md.blanks : 0) : n === 2 ? (won ? md.blanks : S.fills.length)
      : n === 3 ? (won ? md.blanks : Math.min(S.laid.length, md.blanks)) : won ? md.blanks : (item.kind === "first" ? (S.picked ? 1 : 0) : S.order.length);
    return done + Math.min(here, md.blanks);
  };
  let total = 0;
  for (let j = 0; j < phase.items.length; j++) total += (MODEL.items[`${n}.${j + 1}`] || {}).blanks || 0;

  return (
    <g>
      {!free && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={20} y={lang === "en" ? -62 : -67} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(n === 4 ? "Places filled" : "Cells filled")}</text>
          <text x={20} y={lang === "en" ? -26 : -23} fontSize={lang === "en" ? T.prompt : T.label} fontWeight={700} fill={C.ink}>{lang === "hi" ? `${total} में से ${filled()}` : lang === "gu" ? `${total} માંથી ${filled()}` : `${filled()} of ${total}`}</text>
        </g>
      )}
      {free ? <PsRing C={C} md={MODEL.items["4.3"]} S={S} act={act} live={live} free won={false} item={item} stage={stage} api={api} tx={tx} />
        : n === 1 ? <PsStrip C={C} md={md} S={S} act={act} live={live} won={won} item={item} stage={stage} api={api} tx={tx} />
        : n === 2 ? <PsTurn C={C} md={md} S={S} act={act} live={live} won={won} item={item} stage={stage} api={api} />
        : n === 3 ? <PsSides C={C} md={md} S={S} act={act} live={live} won={won} item={item} stage={stage} api={api} tx={tx} />
        : <PsRing C={C} md={md} S={S} act={act} live={live} won={won} item={item} stage={stage} api={api} tx={tx} />}
    </g>
  );
}

/* ── phase 1: the group that repeats ───────────────────────────────────────────────────── */

function PsStrip({ C, md, S, act, live, won, item, stage, api, tx = (v: any) => v }: any) {
  const given = md.strip, count = given.length + md.blanks, g = psGeo(count);
  const kinds: string[] = [];
  given.forEach((f: string) => { if (!kinds.includes(f)) kinds.push(f); });
  const paintOf = (f: string, made: boolean) => (made ? PS_INK.made : kinds.indexOf(f) === 1 ? PS_INK.amber : PS_INK.blue);
  const drag = useDrag((p: any, at: any, moved: boolean) => {
    const max = given.length;
    const k = moved && !isNaN(at.x) ? Math.max(1, Math.min(max, Math.round((at.x - g.x0) / g.pitch + 0.5))) : (S.len % max) + 1;
    act({ len: k, touched: true });
    api.sfx.tick();
    api.setTyped(psCellWord(k));
  });
  const shown = drag.drag && !isNaN(drag.drag.x) && drag.drag.moved
    ? Math.max(1, Math.min(given.length, Math.round((drag.drag.x - g.x0) / g.pitch + 0.5))) : S.len;
  const RAIL = 216, GRIP = 226;
  const bx1 = g.x(0) - 4, bx2 = g.x(shown - 1) + MODEL.cell + 4;
  const D = S.demo, dk = D ? Math.max(1, Math.min(D.k || 1, given.length)) : 1;
  const mine = D ? psCopies(given, dk) : [];
  const right = psCopies(given, md.group);
  const DR = 306;

  return (
    <g>
      {given.map((f: string, i: number) => (
        <PsCell key={i} g={g} i={i} C={C}>
          <PsFace pic={md.pic} face={f} cx={g.cx(i)} cy={g.cy} r={34} paint={paintOf(f, false)} ink={shade(paintOf(f, false), 0.3)} />
        </PsCell>
      ))}
      {Array.from({ length: md.blanks }, (_, j) => given.length + j).map((i) => {
        const f = given[i % md.group], fill = won || (D && D.step >= 4);
        return (
          <PsCell key={i} g={g} i={i} C={C} lit={fill}>
            {fill ? <PsFace pic={md.pic} face={f} cx={g.cx(i)} cy={g.cy} r={34} paint={PS_INK.made} ink={shade(PS_INK.made, 0.3)} /> : null}
          </PsCell>
        );
      })}

      {/* copy light: every copy of the child's run, and the one cell that breaks a copy */}
      {D && D.step >= 1 && mine.filter((c: any) => c.start > 0).map((c: any) => (
        c.ok ? <rect key={c.start} x={g.x(c.start) - 2} y={g.bot + 8} width={c.len * g.pitch - MODEL.gap + 4} height={7} rx={3} fill={PS_INK.made} /> : null
      ))}
      {D && D.step >= 2 && mine.filter((c: any) => !c.ok && c.bad >= 0)[0] && (
        <circle cx={g.cx(mine.filter((c: any) => !c.ok && c.bad >= 0)[0].bad)} cy={g.cy} r={54} fill="none" stroke={PS_INK.look} strokeWidth={5} />
      )}

      {/* the child's bracket, on its rail: the correction never moves it */}
      <path d={`M ${bx1} ${RAIL - 12} V ${RAIL} H ${bx2} V ${RAIL - 12}`} fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      {won && right.filter((c: any) => c.ok).map((c: any) => (
        <rect key={"w" + c.start} x={g.x(c.start) - 2} y={g.bot + 8} width={c.len * g.pitch - MODEL.gap + 4} height={7} rx={3} fill={PS_INK.made} />
      ))}

      {/* the correction: the smallest group bracketed, every copy lit, and its size named */}
      {D && D.step >= 3 && (
        <g>
          <path d={`M ${g.x(0) - 4} ${DR - 12} V ${DR} H ${g.x(md.group - 1) + MODEL.cell + 4} V ${DR - 12}`} fill="none"
            stroke={shade(PS_INK.made, 0.3)} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          {right.filter((c: any) => c.ok).map((c: any) => (
            <rect key={"d" + c.start} x={g.x(c.start) - 2} y={DR + 16} width={c.len * g.pitch - MODEL.gap + 4} height={7} rx={3} fill={PS_INK.made} />
          ))}
          <text x={g.x(0) + 4} y={DR + 70} fontSize={T.label} fontWeight={700} fill={shade(PS_INK.made, 0.3)}>{tx(psCellWord(md.group))}</text>
        </g>
      )}

      {/* the cells and the bracket end are the controls */}
      {live && given.map((f: string, i: number) => (
        <Hit key={"h" + i} id={`cell-${i + 1}`} x={g.x(i)} y={g.top} w={MODEL.cell} h={MODEL.cell}
          label={`bracket the first ${i + 1} cells`} onPress={() => { act({ len: i + 1, touched: true }); api.sfx.tick(); api.setTyped(psCellWord(i + 1)); }} />
      ))}
      {live && (
        <g {...control("grip", "bracket end")} {...drag.bind("grip")} {...drag.keys("grip")}>
          <rect x={bx2 - 38} y={GRIP - 38} width={76} height={76} fill="transparent" />
          <circle cx={bx2} cy={GRIP} r={22} fill={C.accent} stroke={shade(C.accent, 0.3)} strokeWidth={3} filter="url(#fShadowSoft)" />
          <path d={`M ${bx2 - 9} ${GRIP - 7} L ${bx2 + 9} ${GRIP - 7} M ${bx2 - 9} ${GRIP} L ${bx2 + 9} ${GRIP} M ${bx2 - 9} ${GRIP + 7} L ${bx2 + 9} ${GRIP + 7}`}
            stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" />
        </g>
      )}
      {(stage === "teach" || (stage === "ask" && !S.touched && !S.demo)) && <Invite x={bx2} y={GRIP} r={46} C={C} />}
    </g>
  );
}

/* ── phase 2: a quarter turn at every step ─────────────────────────────────────────────── */

function PsTurn({ C, md, S, act, live, won, item, stage, api }: any) {
  const count = md.given.length + md.blanks, g = psGeo(count);
  const fills = won ? Array.from({ length: md.blanks }, (_, j) => (md.given[md.given.length - 1] + 1 + j) % 4) : S.fills;
  const dock = md.given.length + Math.min(fills.length, md.blanks - 1);
  const dialCx = Math.max(158, Math.min(990, g.cx(dock)));
  const dialCy = 330, ringCx = dialCx - 118;
  const dial = fills.length ? fills[fills.length - 1] : md.given[md.given.length - 1];
  const D = S.demo;
  const quarters = S.turns % 4, rounds = Math.floor(S.turns / 4);

  const tap = () => {
    const from = S.fills.length ? S.fills[S.fills.length - 1] : md.given[md.given.length - 1];
    const next = (from + 1) % 4;
    const f = S.fills.length < md.blanks ? [...S.fills, next] : [...S.fills.slice(0, -1), next];
    act({ fills: f, turns: S.turns + 1 });
    api.sfx.tick();
    api.setTyped(f.length >= md.blanks ? PS_DIRS[f[f.length - 1]] : "");
  };

  return (
    <g>
      {md.given.map((d: number, i: number) => (
        <PsCell key={i} g={g} i={i} C={C}>
          <PsFace pic={md.pic} dir={d} cx={g.cx(i)} cy={g.cy} r={32} paint={PS_INK.blue} ink={shade(PS_INK.blue, 0.3)} />
        </PsCell>
      ))}
      {Array.from({ length: md.blanks }, (_, j) => j).map((j) => {
        const i = md.given.length + j, land = !!(S.demo && S.demo.step >= 2), has = land || j < fills.length;
        const d = land ? (md.given[md.given.length - 1] + 1 + j) % 4 : fills[j];
        return (
          <PsCell key={i} g={g} i={i} C={C} lit={has}>
            {has ? <PsFace pic={md.pic} dir={d} cx={g.cx(i)} cy={g.cy} r={32} paint={PS_INK.made} ink={shade(PS_INK.made, 0.3)} /> : null}
          </PsCell>
        );
      })}

      {/* the dial, docked under the cell being filled, and the turn ring beside it */}
      <circle cx={dialCx} cy={dialCy} r={80} fill="url(#gCard)" stroke={C.rule} strokeWidth={3} filter="url(#fShadowSoft)" />
      <PsFace pic={md.pic} dir={dial} face="" cx={dialCx} cy={dialCy} r={44} paint={PS_INK.blue} ink={shade(PS_INK.blue, 0.3)} />
      {S.turns > 0 && (
        <path d={psArc(dialCx, dialCy, 66, (dial + 3) % 4, 1)} fill="none" stroke={PS_INK.step} strokeWidth={6} strokeLinecap="round" />
      )}
      <circle cx={ringCx} cy={dialCy} r={36} fill={C.paper} stroke={C.rule} strokeWidth={3} />
      {quarters > 0 && <path d={psArc(ringCx, dialCy, 26, 0, quarters)} fill="none" stroke={PS_INK.step} strokeWidth={14} />}
      {rounds > 0 && Array.from({ length: Math.min(rounds, 3) }, (_, k) => (
        <circle key={k} cx={ringCx - 22 + k * 22} cy={dialCy + 56} r={8} fill={shade(PS_INK.made, 0.2)} />
      ))}

      {/* the correction: the same turn replayed, then the row the rule makes */}
      {D && D.step >= 1 && (
        <g>
          <circle cx={dialCx} cy={dialCy} r={80} fill="none" stroke={C.dim} strokeWidth={3} strokeDasharray="8 9" />
          <path d={psArc(dialCx, dialCy, 66, md.given[md.given.length - 1], 1)} fill="none" stroke={PS_INK.step} strokeWidth={7} strokeLinecap="round" />
        </g>
      )}
      {/* the child's own turns stay in view, just below, while the correction stands */}
      {D && D.step >= 3 && (() => {
        const mine = S.fills.length ? S.fills : D.k >= 0 ? [D.k] : [];
        const cw = 60, gp = 6, tot = mine.length * cw + (mine.length - 1) * gp, x0 = Math.round((W.w - tot) / 2);
        return mine.map((d: number, j: number) => (
          <g key={"m" + j}>
            <rect x={x0 + j * (cw + gp)} y={440} width={cw} height={cw} rx={RAD.piece} fill="url(#gCard)" stroke={C.rule} strokeWidth={2} />
            <PsFace pic={md.pic} dir={d} cx={x0 + j * (cw + gp) + cw / 2} cy={470} r={20} paint={PS_INK.blue} ink={shade(PS_INK.blue, 0.3)} />
          </g>
        ));
      })()}

      {live && <Hit id="dial" x={dialCx - 80} y={dialCy - 80} w={160} h={160} label="turn a quarter clockwise" onPress={tap} />}
      {(stage === "teach" || (stage === "ask" && !S.turns && !S.demo)) && <Invite x={dialCx} y={dialCy} r={92} C={C} />}
    </g>
  );
}

/* ── phase 3: one side fewer, then start again ─────────────────────────────────────────── */

function PsSides({ C, md, S, act, live, won, item, stage, api, tx = (v: any) => v }: any) {
  const count = md.counts.length + md.blanks + (md.cap > 1 ? 2 : 0), g = psGeo(count);
  const winLaid = item.kind === "count"
    ? (() => { const a: number[] = []; for (let s = md.counts[0] - 1; s >= md.floor; s--) a.push(s); a.push(md.counts[0]); return a; })()
    : [psSidesOf(String(item.answer))];
  const laid = won ? winLaid : S.laid;
  const chain = [...md.counts, ...laid];
  const D0 = S.demo, wc = md.counts.length, rightK0 = item.kind === "count" ? md.floor : psSidesOf(String(item.answer));
  const demoSides = !!D0 && item.kind !== "count";
  const childK = S.laid.length ? S.laid[S.laid.length - 1] : D0 && D0.k > 0 ? D0.k : 0;
  /* what each cell shows: the child's own shapes, and while the correction stands, its answer in the cell
     being filled (a demo layer: the child's shape is redrawn below and comes back on their next act) */
  const shown = chain.slice();
  if (demoSides) { if (D0.step >= 3) shown[wc] = rightK0; else if (shown[wc] === undefined && childK) shown[wc] = childK; }
  /* where the row starts over: the count jumps against the row's own step */
  const sign = md.counts.length > 1 ? Math.sign(md.counts[1] - md.counts[0]) || -1 : -1;
  const restarts = shown.map((k: number, i: number) => (i > 0 && k !== undefined && shown[i - 1] !== undefined && (k - shown[i - 1]) * sign < 0 ? i : -1)).filter((i: number) => i > 0);
  const cCx = Math.max(122, Math.min(960, g.cx(Math.min(md.counts.length + laid.length, count - 1))));
  const D = S.demo;

  const step = (dir: number) => {
    const last = S.laid.length ? S.laid[S.laid.length - 1] : md.counts[md.counts.length - 1];
    const k = Math.max(2, Math.min(8, last + dir));
    const a = S.laid.length < md.cap ? [...S.laid, k] : [...S.laid.slice(0, -1), k];
    act({ laid: a });
    api.sfx.tick();
    if (item.pad === "enter") api.setTyped(psShapeName(k));
  };
  const again = () => {
    const k = md.counts[0];
    const a = S.laid.length < md.cap ? [...S.laid, k] : [...S.laid.slice(0, -1), k];
    act({ laid: a });
    api.sfx.tick();
    if (item.pad === "enter") api.setTyped(psShapeName(k));
  };

  return (
    <g>
      {Array.from({ length: count }, (_, i) => i).map((i) => {
        const k = shown[i], made = i >= md.counts.length;
        return (
          <PsCell key={i} g={g} i={i} C={C} lit={made && k !== undefined}>
            {k === undefined ? null : <PsSided k={k} cx={g.cx(i)} cy={g.cy} r={36}
              paint={made ? PS_INK.made : PS_INK.blue} ink={shade(made ? PS_INK.made : PS_INK.blue, 0.3)} />}
          </PsCell>
        );
      })}
      {shown.map((k: number, i: number) => (k === undefined ? null :
        <text key={"c" + i} x={g.cx(i)} y={g.bot + 40} textAnchor="middle" fontSize={T.label} fontWeight={700}
          fill={i >= md.counts.length ? shade(PS_INK.made, 0.3) : C.ink}>{String(k)}</text>
      ))}
      {/* the row starts over here: a mark in the gap, turning back */}
      {restarts.map((i: number) => {
        const x = g.x(i) - MODEL.gap / 2;
        return (
          <g key={"r" + i}>
            <path d={`M ${x} ${g.top - 8} V ${g.bot + 8}`} stroke={PS_INK.step} strokeWidth={5} strokeLinecap="round" />
            <path d={`M ${x + 34} ${g.top - 22} C ${x + 20} ${g.top - 50}, ${x - 20} ${g.top - 50}, ${x - 34} ${g.top - 22}`} fill="none" stroke={PS_INK.step} strokeWidth={5} strokeLinecap="round" />
            <path d={`M ${x - 46} ${g.top - 34} L ${x - 34} ${g.top - 22} L ${x - 20} ${g.top - 34}`} fill="none" stroke={PS_INK.step} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}

      {/* the correction: the child's figure is read back in its cell (an open end ringed), then the shape
          the rule makes lands in that cell and the child's own shape stands just below it */}
      {demoSides && D0.step >= 2 && D0.step < 3 && childK > 0 && (
        childK <= 2
          ? <circle cx={g.cx(wc)} cy={g.cy + 22} r={30} fill="none" stroke={PS_INK.look} strokeWidth={5} />
          : <circle cx={g.cx(wc)} cy={g.cy} r={58} fill="none" stroke={PS_INK.look} strokeWidth={5} />
      )}
      {demoSides && D0.step >= 3 && childK > 0 && (
        <g>
          <PsSided k={childK} cx={g.cx(wc)} cy={438} r={34} paint={PS_INK.blue} ink={shade(PS_INK.blue, 0.3)} />
          <text x={g.cx(wc)} y={510} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(childK)}</text>
        </g>
      )}
      {/* the count question: the whole row laid again below, down to the triangle and back to the start */}
      {D && item.kind === "count" && (() => {
        const seq = [md.counts[0], ...winLaid], cw = 60, gp = 6;
        const gx0 = Math.round((W.w - (seq.length * cw + (seq.length - 1) * gp)) / 2), gy = 390;
        const show = D.step >= 3 ? seq.length : seq.length - 1;
        return (
          <g>
            {seq.slice(0, show).map((k: number, j: number) => (
              <g key={"q" + j}>
                <rect x={gx0 + j * (cw + gp)} y={gy} width={cw} height={cw} rx={RAD.piece} fill="url(#gCard)"
                  stroke={shade(PS_INK.made, 0.25)} strokeWidth={3} />
                <PsSided k={k} cx={gx0 + j * (cw + gp) + cw / 2} cy={gy + cw / 2} r={21} paint={PS_INK.made} ink={shade(PS_INK.made, 0.3)} />
              </g>
            ))}
            {D.step >= 2 && <circle cx={gx0 + (seq.length - 2) * (cw + gp) + cw / 2} cy={gy + cw / 2} r={36} fill="none" stroke={PS_INK.look} strokeWidth={5} />}
            {D.step >= 3 && (
              <g>
                <path d={`M ${gx0 - 4} ${gy + cw + 12} V ${gy + cw + 24} H ${gx0 + (seq.length - 2) * (cw + gp) + cw + 4} V ${gy + cw + 12}`}
                  fill="none" stroke={shade(PS_INK.made, 0.3)} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
                <text x={gx0} y={gy + cw + 68} fontSize={T.label} fontWeight={700} fill={shade(PS_INK.made, 0.3)}>{tx(String(item.answer) + " shapes")}</text>
              </g>
            )}
          </g>
        );
      })()}

      {live && (
        <g>
          <PsKnob C={C} id="fewer" cx={cCx - 70} cy={330} label="one side fewer" onPress={() => step(-1)} sign={-1} />
          <PsKnob C={C} id="more" cx={cCx + 70} cy={330} label="one more side" onPress={() => step(1)} sign={1} />
          {md.cap > 1 && <Hit id="again" x={g.x(0)} y={g.top} w={MODEL.cell} h={MODEL.cell} label="start the row again" onPress={again} />}
        </g>
      )}
      {(stage === "teach" || (stage === "ask" && !S.laid.length && !S.demo)) && (
        <Invite x={g.cx(Math.min(md.counts.length, count - 1))} y={g.cy} r={60} C={C} />
      )}
    </g>
  );
}

/** a round side-counter control: a plus or a minus on a toy face */
function PsKnob({ C, id, cx, cy, label, onPress, sign }: any) {
  return (
    <g>
      <Hit id={id} x={cx - 42} y={cy - 42} w={84} h={84} label={label} onPress={onPress} />
      <circle cx={cx} cy={cy} r={38} fill={C.accent} stroke={shade(C.accent, 0.3)} strokeWidth={3} filter="url(#fShadowSoft)" pointerEvents="none" />
      <path d={sign > 0 ? `M ${cx - 16} ${cy} H ${cx + 16} M ${cx} ${cy - 16} V ${cy + 16}` : `M ${cx - 16} ${cy} H ${cx + 16}`}
        stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" pointerEvents="none" />
    </g>
  );
}

/* ── phase 4: after the last comes the first ───────────────────────────────────────────── */

function PsRing({ C, md, S, act, live, won, item, stage, api, free, tx = (v: any) => v }: any) {
  const size = md.ring || 5, cx = 250, cy = 195, R = 118, pr = 38;
  const isFirst = !free && !!item && item.kind === "first" && !!md.last;
  const at = (k: number) => { const t = -Math.PI / 2 + (k * 2 * Math.PI) / size; return { x: cx + R * Math.cos(t), y: cy + R * Math.sin(t) }; };
  const drawn = isFirst ? null : S.drawn;
  const start = free ? S.drawn || 1 : isFirst ? (md.last % size) + 1 : md.drawn || 1;
  const right = psRound(size, start);
  const order = won ? right : S.order;
  const bw = 72, bg = 10, bx0 = 510;
  const line = (row: number) => 260 + row * 100;
  const D = S.demo;
  const showDemo = !!(D && D.step >= 2);
  /* the child's line; a "who went first" question has no line to fill until the walk is shown */
  const twoTeams = !free && md.teams > 1;
  const row0 = isFirst ? (won || showDemo ? right : null) : twoTeams && showDemo ? right : order;
  const row1 = isFirst ? null : won && md.teams > 1 ? right : showDemo ? right : null;
  const arcRow = row1 ? 1 : row0 && (won || showDemo || (free && order.length === size)) ? 0 : -1;

  const tapDrum = () => {
    if (free) { const d = (S.drawn ? S.drawn % size : 0) + 1; act({ drawn: d, order: [] }); api.sfx.tick(); return; }
    act({ drawn: md.drawn });
    api.sfx.tick();
  };
  const tapPlace = (v: number) => {
    if (isFirst) { act({ picked: v }); api.sfx.tick(); api.setTyped("player " + v); return; }
    const k = S.order.indexOf(v);
    const o = k >= 0 ? S.order.slice(0, k) : [...S.order, v];
    act({ order: o });
    api.sfx.tick();
    if (!free) api.setTyped(o.length ? o.join(" ") : "");
  };

  return (
    <g>
      {/* the ring of numbered places */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.rule} strokeWidth={4} />
      {Array.from({ length: size }, (_, k) => k).map((k) => {
        const p = at(k), v = k + 1, isDrawn = drawn === v, isLast = isFirst && md.last === v;
        const inOrder = order.indexOf(v) >= 0, picked = isFirst && S.picked === v;
        return (
          <g key={k}>
            <circle cx={p.x} cy={p.y} r={pr} fill={inOrder || picked ? tint(PS_INK.made, 0.72) : isDrawn ? tint(PS_INK.blue, 0.72) : C.paper}
              stroke={picked ? shade(PS_INK.made, 0.3) : isDrawn ? shade(PS_INK.blue, 0.3) : C.rule} strokeWidth={picked || isDrawn ? 4 : 3} />
            <text x={p.x} y={p.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700}
              fill={picked || inOrder ? shade(PS_INK.made, 0.3) : isDrawn ? shade(PS_INK.blue, 0.3) : C.ink}>{String(v)}</text>
            {isLast && <text x={p.x} y={p.y + pr + 34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("last")}</text>}
          </g>
        );
      })}

      {/* the draw drum */}
      {!isFirst && (
        <g>
          <rect x={570} y={90} width={140} height={140} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={3} filter="url(#fShadowSoft)" />
          {drawn || (D && !free && md.drawn) ? <text x={640} y={180} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={shade(PS_INK.blue, 0.3)}>{String(drawn || md.drawn)}</text>
            : <path d={`M 606 160 h 68 M 640 126 v 68`} stroke={C.dim} strokeWidth={6} strokeLinecap="round" />}
        </g>
      )}

      {/* the order line: one box a place, filled as the ring is read off */}
      {[0, 1].map((row) => {
        const vals = row === 0 ? row0 : row1;
        if (!vals) return null;
        return (
          <g key={row}>
            {md.teams > 1 && !free && (
              <text x={bx0 - 14} y={line(row) + 44} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(row === 0 ? "Team 1" : "Team 2")}</text>
            )}
            {Array.from({ length: size }, (_, k) => k).map((k) => {
              const v = vals && vals[k];
              return (
                <g key={k}>
                  <rect x={bx0 + k * (bw + bg)} y={line(row)} width={bw} height={bw} rx={RAD.piece}
                    fill={v ? "url(#gCard)" : C.paper} stroke={v ? shade(PS_INK.made, 0.25) : C.rule} strokeWidth={v ? 4 : 3} strokeDasharray={v ? undefined : "9 9"} />
                  {v ? <text x={bx0 + k * (bw + bg) + bw / 2} y={line(row) + 50} textAnchor="middle" fontSize={T.prompt} fontWeight={700}
                    fill={shade(PS_INK.made, 0.3)}>{String(v)}</text> : null}
                </g>
              );
            })}
          </g>
        );
      })}
      {/* the arc that joins the last number back to the first */}
      {arcRow >= 0 && (
        <g>
          <path d={`M ${bx0 + (size - 1) * (bw + bg) + bw / 2} ${line(arcRow) + bw + 6} C ${bx0 + (size - 1) * (bw + bg)} ${line(arcRow) + bw + 78}, ${bx0 + bw} ${line(arcRow) + bw + 78}, ${bx0 + bw / 2} ${line(arcRow) + bw + 6}`}
            fill="none" stroke={PS_INK.step} strokeWidth={5} strokeLinecap="round" />
          <path d={`M ${bx0 + bw / 2 - 12} ${line(arcRow) + bw + 22} L ${bx0 + bw / 2} ${line(arcRow) + bw + 4} L ${bx0 + bw / 2 + 12} ${line(arcRow) + bw + 22}`}
            fill="none" stroke={PS_INK.step} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {/* the correction walks the ring from the drawn place, lighting each neighbour as it passes */}
      {D && D.step >= 1 && !free && (isFirst ? md.last : md.drawn) > 0 && (
        <circle cx={at(((isFirst ? md.last : md.drawn) - 1) % size).x} cy={at(((isFirst ? md.last : md.drawn) - 1) % size).y}
          r={pr + 12} fill="none" stroke={PS_INK.look} strokeWidth={5} />
      )}

      {live && (
        <g>
          {!isFirst && <Hit id="drum" x={570} y={90} w={140} h={140} label={free ? "draw another number" : "draw the starting number"} onPress={tapDrum} />}
          {(free || isFirst || S.drawn) && Array.from({ length: size }, (_, k) => k).map((k) => {
            const p = at(k);
            return <Hit key={k} id={`place-${k + 1}`} x={p.x - 38} y={p.y - 38} w={76} h={76} label={`place ${k + 1}`} onPress={() => tapPlace(k + 1)} />;
          })}
        </g>
      )}
      {!free && (stage === "teach" || (stage === "ask" && !S.demo && !S.order.length && !S.picked)) && (
        isFirst ? <Invite x={cx} y={cy} r={R + 50} C={C} /> : !S.drawn ? <Invite x={640} y={160} r={86} C={C} /> : null
      )}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const v = String(last.value), kind = last.kind, cy = h / 2;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {kind === "turn" ? (
        <g>
          <circle cx={42} cy={cy} r={26} fill="none" stroke={C.rule} strokeWidth={3} />
          <path d={psArrow(42, cy, 18)} transform={`rotate(${Math.max(0, PS_DIRS.indexOf(v)) * 90} 42 ${cy})`} fill={CONTENT.one} stroke={shade(CONTENT.one, 0.3)} strokeWidth={2} />
        </g>
      ) : kind === "sides" ? (
        <PsSided k={psSidesOf(v) || 3} cx={42} cy={cy} r={24} paint={CONTENT.one} ink={shade(CONTENT.one, 0.3)} />
      ) : (
        <circle cx={42} cy={cy} r={20} fill={CONTENT.hundred} />
      )}
      <text x={w - 14} y={cy + 11} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(v)}</text>
    </g>
  );
}

function PatternStrip(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default PatternStrip;
