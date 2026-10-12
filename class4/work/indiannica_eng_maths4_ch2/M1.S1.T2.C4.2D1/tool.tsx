/* ═══ M1.S1.T2.C4.2D1 · column_builder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "column_builder";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Column Builder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Two numbers and a ruled mat."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every digit stood in its own column, and you worked them from the right.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any two numbers, the lining check and the expanded strip as you like.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms: इकाई दहाई सैकड़ा हज़ार / એકમ દશક શતક હજાર,
   योज्य / ઉમેરણ (addend), योगफल / સરવાળો (sum), खाना / ખાનું (column). Digits stay digits: the runtime
   speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Column Builder": "खाने बनाओ",
    "Two numbers and a ruled mat.": "दो संख्याएँ और खानों वाला एक चार्ट।",
    "Every digit stood in its own column, and you worked them from the right.": "हर अंक अपने खाने में रहा, और तुमने दाईं ओर से जोड़ा।",
    "Free play. Any two numbers, the lining check and the expanded strip as you like.": "मुक्त खेल। कोई भी दो संख्याएँ, सीध जाँच और विस्तारित पट्टी, जैसे चाहो।",
    "Columns stand for places": "खाने स्थानों को दर्शाते हैं",
    "Line them up by their right ends. Which column does the shorter number start in?": "इन्हें दाएँ सिरों से सीध में रखो। छोटी संख्या किस खाने से शुरू होती है?",
    "Which column does the last digit of any number belong in?": "किसी भी संख्या का आखिरी अंक किस खाने में आता है?",
    "Put the last digit under the ones heading. Then read the heading over each digit.": "आखिरी अंक को इकाई के शीर्षक के नीचे रखो। फिर हर अंक के ऊपर का शीर्षक पढ़ो।",
    "Line the addends up by their right ends, because every column is a place.": "योज्यों को दाएँ सिरों से सीध में रखो, क्योंकि हर खाना एक स्थान है।",
    "You learned: line the addends up by their right ends.": "तुमने सीखा: योज्यों को दाएँ सिरों से सीध में रखो।",
    "Set out 43,215 + 362 on the mat. Slide 362 in until each digit stands in its own column, then find the sum.": "चार्ट पर 43,215 + 362 रखो। 362 को तब तक खिसकाओ जब तक हर अंक अपने खाने में न आए, फिर योगफल निकालो।",
    "Line up 362, then add": "362 को सीध में रखो, फिर जोड़ो",
    "Which column is the last digit of the shorter number standing in?": "छोटी संख्या का आखिरी अंक किस खाने में खड़ा है?",
    "Set out 71,024 + 508 on the mat. Under which column does the 5 of 508 sit?": "चार्ट पर 71,024 + 508 रखो। 508 का 5 किस खाने के नीचे आता है?",
    "The 5 of 508 sits under?": "508 का 5 किसके नीचे?",
    "Which column does the 8 of 508 belong in?": "508 का 8 किस खाने में आता है?",
    "Two addends of different lengths are lined up by their left ends instead of their right. What goes wrong? Which digits of 247 are out of place?": "अलग लंबाई के दो योज्य दाएँ की जगह बाएँ सिरों से सीध में रखे हैं। क्या गलत होता है? 247 के कौन से अंक अपनी जगह पर नहीं हैं?",
    "Which digits are out of place?": "कौन से अंक गलत जगह पर हैं?",
    "Which column is the 7 standing in, and which column does it belong in?": "7 किस खाने में खड़ा है, और उसे किस खाने में होना चाहिए?",
    "only the 7": "सिर्फ़ 7", "every digit": "हर अंक", "none": "कोई नहीं", "only the 2": "सिर्फ़ 2",
    "The ones column goes first": "पहले इकाई का खाना",
    "Start at the ones. Say what that column comes to before you move left.": "इकाई से शुरू करो। बाईं ओर जाने से पहले बताओ कि उस खाने में कितना हुआ।",
    "Which way does anything that will not fit in a column have to travel?": "जो किसी खाने में न समाए, उसे किस ओर जाना पड़ता है?",
    "Add the two digits in the ones column first. Then move one column to the left.": "पहले इकाई के खाने के दोनों अंक जोड़ो। फिर एक खाना बाईं ओर जाओ।",
    "Adding starts at the ones and works left, because anything that spills has to move left.": "जोड़ इकाई से शुरू होकर बाईं ओर चलता है, क्योंकि जो न समाए वह बाईं ओर जाता है।",
    "You learned: add the ones column first, then work left.": "तुमने सीखा: पहले इकाई का खाना जोड़ो, फिर बाईं ओर चलो।",
    "Add 25,431 and 13,246. Tap the column you finish first, then type what it comes to.": "25,431 और 13,246 जोड़ो। जो खाना सबसे पहले पूरा करोगे उसे टैप करो, फिर उसका जोड़ लिखो।",
    "Which column first? Its total?": "पहले कौन सा खाना? उसका जोड़?",
    "Which column is furthest to the right?": "सबसे दाईं ओर कौन सा खाना है?",
    "Add 34,152 and 21,306. What does the ones column come to?": "34,152 और 21,306 जोड़ो। इकाई के खाने में कितना होता है?",
    "The ones column makes?": "इकाई का खाना कितना बनता है?",
    "Which two digits stand in the ones column?": "इकाई के खाने में कौन से दो अंक हैं?",
    "Add 46,023 and 23,451. Work one column at a time, from the right.": "46,023 और 23,451 जोड़ो। दाईं ओर से एक-एक खाना करो।",
    "Add, ones first": "जोड़ो, पहले इकाई",
    "Which column did you start with?": "तुमने किस खाने से शुरू किया?",
    "More columns do not mean a new method": "ज़्यादा खाने, फिर भी वही तरीका",
    "Same method, more columns. Where does it end this time?": "वही तरीका, ज़्यादा खाने। इस बार यह कहाँ खत्म होता है?",
    "How many of them have a total under the rule?": "इनमें से कितनों का जोड़ रेखा के नीचे लिखा है?",
    "Count the columns from the right, and give every one of them a total.": "दाईं ओर से खाने गिनो, और हर खाने का जोड़ लिखो।",
    "A longer sum is the same method with more steps, and it still starts at the ones.": "लंबा जोड़ भी वही तरीका है, बस ज़्यादा चरण, और यह भी इकाई से शुरू होता है।",
    "You learned: a longer sum is the same method with more steps.": "तुमने सीखा: लंबा जोड़ वही तरीका है, बस ज़्यादा चरण।",
    "Add 5,24,301 and 3,42,156.": "5,24,301 और 3,42,156 जोड़ो।",
    "How many columns is the mat ruled for?": "चार्ट में कितने खाने बने हैं?",
    "Add 2,13,046 and 5,24,132.": "2,13,046 और 5,24,132 जोड़ो।",
    "Did you stop before the last column on the left?": "क्या तुम बाईं ओर के आखिरी खाने से पहले रुक गए?",
    "Add 6,05,231 and 1,42,508.": "6,05,231 और 1,42,508 जोड़ो।",
    "Is any square in the green row still empty?": "क्या हरी पंक्ति में कोई डिब्बा अभी भी खाली है?",
    "The addends are what you add and the sum is what you get": "जिन्हें जोड़ते हो वे योज्य हैं, और जो मिलता है वह योगफल",
    "Point at the addends. Now point at the sum. Say which is which.": "योज्यों की ओर इशारा करो। अब योगफल की ओर। बताओ कौन क्या है।",
    "What is the row under the rule called?": "रेखा के नीचे वाली पंक्ति को क्या कहते हैं?",
    "Which rows hold the numbers you add, and which row holds what they make?": "किन पंक्तियों में जोड़ी जाने वाली संख्याएँ हैं, और किस पंक्ति में उनका जोड़?",
    "The addends go above the rule and the sum goes under it.": "योज्य रेखा के ऊपर आते हैं और योगफल उसके नीचे।",
    "You learned: the addends go above the rule and the sum goes under it.": "तुमने सीखा: योज्य रेखा के ऊपर, योगफल उसके नीचे।",
    "A mat shows 61,204 above 27,395 with a rule under them. Which numbers are the addends, and what is the sum? Drag a label onto each row, then press enter.": "चार्ट पर 61,204 के नीचे 27,395 है, और उनके नीचे रेखा। योज्य कौन से हैं, और योगफल क्या है? हर पंक्ति पर एक नाम खींचो, फिर एंटर दबाओ।",
    "Label each row": "हर पंक्ति को नाम दो",
    "Which rows are above the rule?": "रेखा के ऊपर कौन सी पंक्तियाँ हैं?",
    "Add the smallest five-digit number and the largest four-digit number.": "पाँच अंकों की सबसे छोटी संख्या और चार अंकों की सबसे बड़ी संख्या जोड़ो।",
    "Find the sum": "योगफल निकालो",
    "What is the smallest number with five digits?": "पाँच अंकों की सबसे छोटी संख्या कौन सी है?",
    "Add thirty-two thousand four hundred five and forty-five thousand two hundred sixty-three. Name the addends first.": "बत्तीस हज़ार चार सौ पाँच और पैंतालीस हज़ार दो सौ तिरसठ जोड़ो। पहले योज्यों के नाम लगाओ।",
    "Label the rows, then add": "पंक्तियों को नाम दो, फिर जोड़ो",
    "Where does the word sum go on the mat?": "चार्ट पर योगफल शब्द कहाँ जाता है?",
    "Slide the strip onto the mat first.": "पहले पट्टी को चार्ट पर खिसकाओ।",
    "Put a label on every row first.": "पहले हर पंक्ति पर नाम लगाओ।",
    /* the working area's own words */
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़ा", "thousands": "हज़ार", "ten thousands": "दस हज़ार", "lakhs": "लाख",
    "columns": "खाने", "added": "जुड़े", "addend": "योज्य", "sum": "योगफल",
    "1st": "पहला", "2nd": "दूसरा", "3rd": "तीसरा", "4th": "चौथा", "5th": "पाँचवाँ", "6th": "छठा",
    "New sum": "नया जोड़", "Check lining": "सीध जाँचो", "Lining check off": "सीध जाँच बंद",
    "Expanded": "विस्तार", "Expanded strip": "विस्तारित पट्टी", "Expanded strip off": "विस्तारित पट्टी बंद",
  },
  gu: {
    "Column Builder": "ખાનાં બનાવો",
    "Two numbers and a ruled mat.": "બે સંખ્યા અને ખાનાંવાળો એક ચાર્ટ.",
    "Every digit stood in its own column, and you worked them from the right.": "દરેક અંક પોતાના ખાનામાં રહ્યો, અને તમે જમણી બાજુથી ઉમેર્યું.",
    "Free play. Any two numbers, the lining check and the expanded strip as you like.": "મુક્ત રમત. કોઈ પણ બે સંખ્યા, ગોઠવણ તપાસ અને વિસ્તૃત પટ્ટી, જેમ ગમે તેમ.",
    "Columns stand for places": "ખાનાં સ્થાન દર્શાવે છે",
    "Line them up by their right ends. Which column does the shorter number start in?": "તેમને જમણા છેડેથી હારમાં ગોઠવો. નાની સંખ્યા કયા ખાનાથી શરૂ થાય છે?",
    "Which column does the last digit of any number belong in?": "કોઈ પણ સંખ્યાનો છેલ્લો અંક કયા ખાનામાં આવે છે?",
    "Put the last digit under the ones heading. Then read the heading over each digit.": "છેલ્લો અંક એકમના મથાળા નીચે મૂકો. પછી દરેક અંક ઉપરનું મથાળું વાંચો.",
    "Line the addends up by their right ends, because every column is a place.": "ઉમેરણોને જમણા છેડેથી હારમાં ગોઠવો, કારણ કે દરેક ખાનું એક સ્થાન છે.",
    "You learned: line the addends up by their right ends.": "તમે શીખ્યા: ઉમેરણોને જમણા છેડેથી હારમાં ગોઠવો.",
    "Set out 43,215 + 362 on the mat. Slide 362 in until each digit stands in its own column, then find the sum.": "ચાર્ટ પર 43,215 + 362 મૂકો. દરેક અંક પોતાના ખાનામાં આવે ત્યાં સુધી 362 ને ખસેડો, પછી સરવાળો શોધો.",
    "Line up 362, then add": "362 ગોઠવો, પછી ઉમેરો",
    "Which column is the last digit of the shorter number standing in?": "નાની સંખ્યાનો છેલ્લો અંક કયા ખાનામાં ઊભો છે?",
    "Set out 71,024 + 508 on the mat. Under which column does the 5 of 508 sit?": "ચાર્ટ પર 71,024 + 508 મૂકો. 508 નો 5 કયા ખાના નીચે આવે છે?",
    "The 5 of 508 sits under?": "508 નો 5 કોની નીચે?",
    "Which column does the 8 of 508 belong in?": "508 નો 8 કયા ખાનામાં આવે છે?",
    "Two addends of different lengths are lined up by their left ends instead of their right. What goes wrong? Which digits of 247 are out of place?": "જુદી લંબાઈના બે ઉમેરણ જમણાને બદલે ડાબા છેડેથી ગોઠવ્યા છે. શું ખોટું થાય છે? 247 ના કયા અંક પોતાની જગ્યાએ નથી?",
    "Which digits are out of place?": "કયા અંક ખોટી જગ્યાએ છે?",
    "Which column is the 7 standing in, and which column does it belong in?": "7 કયા ખાનામાં ઊભો છે, અને તેને કયા ખાનામાં હોવો જોઈએ?",
    "only the 7": "ફક્ત 7", "every digit": "દરેક અંક", "none": "એક પણ નહીં", "only the 2": "ફક્ત 2",
    "The ones column goes first": "પહેલાં એકમનું ખાનું",
    "Start at the ones. Say what that column comes to before you move left.": "એકમથી શરૂ કરો. ડાબી બાજુ જતાં પહેલાં કહો કે તે ખાનામાં કેટલા થયા.",
    "Which way does anything that will not fit in a column have to travel?": "જે ખાનામાં ન સમાય, તેને કઈ બાજુ જવું પડે?",
    "Add the two digits in the ones column first. Then move one column to the left.": "પહેલાં એકમના ખાનાના બે અંક ઉમેરો. પછી એક ખાનું ડાબી બાજુ જાઓ.",
    "Adding starts at the ones and works left, because anything that spills has to move left.": "સરવાળો એકમથી શરૂ થઈ ડાબી બાજુ જાય છે, કારણ કે જે ન સમાય તે ડાબી બાજુ જાય છે.",
    "You learned: add the ones column first, then work left.": "તમે શીખ્યા: પહેલાં એકમનું ખાનું ઉમેરો, પછી ડાબી બાજુ જાઓ.",
    "Add 25,431 and 13,246. Tap the column you finish first, then type what it comes to.": "25,431 અને 13,246 ઉમેરો. જે ખાનું સૌથી પહેલાં પૂરું કરો તેને ટેપ કરો, પછી તેનો સરવાળો લખો.",
    "Which column first? Its total?": "પહેલાં કયું ખાનું? તેનો સરવાળો?",
    "Which column is furthest to the right?": "સૌથી જમણી બાજુ કયું ખાનું છે?",
    "Add 34,152 and 21,306. What does the ones column come to?": "34,152 અને 21,306 ઉમેરો. એકમના ખાનામાં કેટલા થાય છે?",
    "The ones column makes?": "એકમનું ખાનું કેટલું થાય?",
    "Which two digits stand in the ones column?": "એકમના ખાનામાં કયા બે અંક છે?",
    "Add 46,023 and 23,451. Work one column at a time, from the right.": "46,023 અને 23,451 ઉમેરો. જમણી બાજુથી એક પછી એક ખાનું કરો.",
    "Add, ones first": "ઉમેરો, પહેલાં એકમ",
    "Which column did you start with?": "તમે કયા ખાનાથી શરૂ કર્યું?",
    "More columns do not mean a new method": "વધુ ખાનાં, તોય એ જ રીત",
    "Same method, more columns. Where does it end this time?": "એ જ રીત, વધુ ખાનાં. આ વખતે તે ક્યાં પૂરું થાય છે?",
    "How many of them have a total under the rule?": "આમાંથી કેટલાનો સરવાળો રેખા નીચે લખ્યો છે?",
    "Count the columns from the right, and give every one of them a total.": "જમણી બાજુથી ખાનાં ગણો, અને દરેક ખાનાનો સરવાળો લખો.",
    "A longer sum is the same method with more steps, and it still starts at the ones.": "લાંબો સરવાળો એ જ રીત છે, બસ વધુ પગલાં, અને તે પણ એકમથી શરૂ થાય છે.",
    "You learned: a longer sum is the same method with more steps.": "તમે શીખ્યા: લાંબો સરવાળો એ જ રીત છે, બસ વધુ પગલાં.",
    "Add 5,24,301 and 3,42,156.": "5,24,301 અને 3,42,156 ઉમેરો.",
    "How many columns is the mat ruled for?": "ચાર્ટમાં કેટલાં ખાનાં છે?",
    "Add 2,13,046 and 5,24,132.": "2,13,046 અને 5,24,132 ઉમેરો.",
    "Did you stop before the last column on the left?": "શું તમે ડાબી બાજુના છેલ્લા ખાના પહેલાં અટકી ગયા?",
    "Add 6,05,231 and 1,42,508.": "6,05,231 અને 1,42,508 ઉમેરો.",
    "Is any square in the green row still empty?": "શું લીલી હરોળમાં કોઈ ચોરસ હજી ખાલી છે?",
    "The addends are what you add and the sum is what you get": "જે ઉમેરો તે ઉમેરણ, અને જે મળે તે સરવાળો",
    "Point at the addends. Now point at the sum. Say which is which.": "ઉમેરણો તરફ આંગળી કરો. હવે સરવાળા તરફ. કહો કયું શું છે.",
    "What is the row under the rule called?": "રેખા નીચેની હરોળને શું કહેવાય?",
    "Which rows hold the numbers you add, and which row holds what they make?": "કઈ હરોળમાં ઉમેરવાની સંખ્યાઓ છે, અને કઈ હરોળમાં તેમનો સરવાળો?",
    "The addends go above the rule and the sum goes under it.": "ઉમેરણ રેખાની ઉપર આવે અને સરવાળો તેની નીચે.",
    "You learned: the addends go above the rule and the sum goes under it.": "તમે શીખ્યા: ઉમેરણ રેખાની ઉપર, સરવાળો તેની નીચે.",
    "A mat shows 61,204 above 27,395 with a rule under them. Which numbers are the addends, and what is the sum? Drag a label onto each row, then press enter.": "ચાર્ટ પર 61,204 નીચે 27,395 છે, અને તેમની નીચે રેખા. ઉમેરણ કયા છે, અને સરવાળો શું છે? દરેક હરોળ પર એક નામ ખેંચો, પછી એન્ટર દબાવો.",
    "Label each row": "દરેક હરોળને નામ આપો",
    "Which rows are above the rule?": "રેખાની ઉપર કઈ હરોળ છે?",
    "Add the smallest five-digit number and the largest four-digit number.": "પાંચ અંકની સૌથી નાની સંખ્યા અને ચાર અંકની સૌથી મોટી સંખ્યા ઉમેરો.",
    "Find the sum": "સરવાળો શોધો",
    "What is the smallest number with five digits?": "પાંચ અંકની સૌથી નાની સંખ્યા કઈ છે?",
    "Add thirty-two thousand four hundred five and forty-five thousand two hundred sixty-three. Name the addends first.": "બત્રીસ હજાર ચારસો પાંચ અને પિસ્તાલીસ હજાર બસો ત્રેસઠ ઉમેરો. પહેલાં ઉમેરણોનાં નામ મૂકો.",
    "Label the rows, then add": "હરોળને નામ આપો, પછી ઉમેરો",
    "Where does the word sum go on the mat?": "ચાર્ટ પર સરવાળો શબ્દ ક્યાં જાય છે?",
    "Slide the strip onto the mat first.": "પહેલાં પટ્ટીને ચાર્ટ પર ખસેડો.",
    "Put a label on every row first.": "પહેલાં દરેક હરોળ પર નામ મૂકો.",
    /* the working area's own words */
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર", "ten thousands": "દસ હજાર", "lakhs": "લાખ",
    "columns": "ખાનાં", "added": "ઉમેર્યાં", "addend": "ઉમેરણ", "sum": "સરવાળો",
    "1st": "પહેલું", "2nd": "બીજું", "3rd": "ત્રીજું", "4th": "ચોથું", "5th": "પાંચમું", "6th": "છઠ્ઠું",
    "New sum": "નવો સરવાળો", "Check lining": "ગોઠવણ તપાસો", "Lining check off": "ગોઠવણ તપાસ બંધ",
    "Expanded": "વિસ્તાર", "Expanded strip": "વિસ્તૃત પટ્ટી", "Expanded strip off": "વિસ્તૃત પટ્ટી બંધ",
  },
};

/* ── the column mat ──────────────────────────────────────────────────────────────────────
   Columns 150 wide, drawn from the right, so the ones column is always the rightmost. Two addend
   rows, a rule, the sum row under it. No pair set here takes a column past nine (the book's first
   topic), so nothing ever travels left and no circle stands over a column. */

const PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "lakhs"];
const PLACE_CHOICES = PLACES.map((p) => ({ id: p, label: p }));
/* phase 1, practice 2 (247 lined up by its left end under 60,532): which of its digits are out of place */
const WHAT_CHOICES = [
  { id: "only the 7", label: "only the 7" }, { id: "every digit", label: "every digit" },
  { id: "none", label: "none" }, { id: "only the 2", label: "only the 2" },
];
const BLUE = CONTENT.hundred, GREEN = CONTENT.one, AMBER = CONTENT.ten, ZERO = "#767676";
const BLUE_INK = shade(BLUE, 0.25), GREEN_INK = shade(GREEN, 0.25);
const CW = 150, RIGHT = 1080;
const colX = (k: number) => RIGHT - (k + 1) * CW;
const colC = (k: number) => colX(k) + CW / 2;
const GEO = { headH: 58, rowA: 66, rowB: 154, rowH: 80, rule: 244, sum: 260, check: 352, ledge: 360, ledgeH: 104,
  cardW: 112, cardH: 70, plateX: 150, plateW: 164, plateH: 56, ledgeX: 36, keysY: 448, fixH: 166 };
const ROWY: Record<string, number> = { a: GEO.rowA, b: GEO.rowB, s: GEO.sum };
const ROW_WORD: Record<string, string> = { a: "addend", b: "addend", s: "sum" };
const PLATE_IDS = ["add1", "add2", "sum"];
const PLATE_WORD: Record<string, string> = { add1: "addend", add2: "addend", sum: "sum" };
const PLATES_OFF: any = { add1: null, add2: null, sum: null };
const PLATES_RIGHT: any = { add1: "a", add2: "b", sum: "s" };
const ORD = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
/* the two nudges ("Slide the strip onto the mat first.", "Put a label on every row first.") are written
   as literals at their api.say calls, so `node cli.mjs voice` finds and bakes them */

const lenOf = (v: number) => String(Math.max(0, Math.trunc(v))).length;
const digAt = (v: number, k: number) => Math.floor(v / Math.pow(10, k)) % 10;
const digitsRow = (v: number, cols: number) => Array.from({ length: cols }, (_, k) => (k < lenOf(v) ? digAt(v, k) : null));
const blankRow = (cols: number): any[] => Array.from({ length: cols }, () => null);
const noneOwn = (cols: number) => Array.from({ length: cols }, () => false);
/* the sum row as a number, read from the ones leftwards; null when it is empty or has a gap */
const rowNumber = (r: any[]) => {
  let m = 0;
  while (m < r.length && r[m] !== null && r[m] <= 9) m++;
  if (m === 0 || r.slice(m).some((d) => d !== null)) return null;
  return r.slice(0, m).reduce((s: number, d: number, k: number) => s + d * Math.pow(10, k), 0);
};
const labelIn = (p: any, r: string) => { const k = PLATE_IDS.find((id) => p[id] === r); return k ? PLATE_WORD[k] : null; };
const namedRight = (p: any) => labelIn(p, "a") === "addend" && labelIn(p, "b") === "addend" && labelIn(p, "s") === "sum";

/* free play: any two numbers that add without a carry (4 to 6 digits over 2 to as many) */
const dealFree = () => {
  const rnd = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
  const la = rnd(4, 6), lb = rnd(2, la);
  let a = 0, b = 0;
  for (let k = 0; k < la; k++) {
    const top = rnd(k === la - 1 ? 1 : 0, k < lb ? 8 : 9);
    const bot = k < lb ? rnd(k === lb - 1 ? 1 : 0, 9 - top) : 0;
    a += top * Math.pow(10, k); b += bot * Math.pow(10, k);
  }
  return { kind: "free", a, b };
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   kind  linesum: slide the short strip in, then add it (column by column or the whole sum)
                 column / what: word keys; first: tap a column, type its total; sum: the columns
                 one at a time from the right (or the whole sum); name: lay the three labels;
                 namesum: labels first, then the sum. a over b is the sum on the mat. */
const PHASES = [
  {
    n: 1,
    concept: "Columns stand for places",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O1"],
    says: ["Line them up by their right ends. Which column does the shorter number start in?"],
    ladder: ["Which column does the last digit of any number belong in?",
      "Put the last digit under the ones heading. Then read the heading over each digit."],
    closing: "Line the addends up by their right ends, because every column is a place.",
    learned: "You learned: line the addends up by their right ends.",
    traceback: "Check lining rings each digit out of its place and lights the heading it stands under; the strip slides home by its right end with each digit's worth under it, and the sum is worked from the ones under the child's own (a wrong column total is put right for that column alone: its equation, the total boxed in amber, over counters that make it).",
    items: [
      /* learn ML1: answer in the plan = The hundreds column, and the sum is 43,577. The child slides 362 in (the heading
         and the worth over its 3 show the hundreds) and then gives the sum, which only comes out right when every
         digit is in its own column: lined up by the left end it would read 79,415 */
      { qid: "M1.S1.T2.C4:ML1", kind: "linesum", a: 43215, b: 362, winMs: 2600, ask: "Line up 362, then add",
        say: "Set out 43,215 + 362 on the mat. Slide 362 in until each digit stands in its own column, then find the sum.",
        answer: 43577, miss: "Which column is the last digit of the shorter number standing in?" },
      /* practice 1: answer in the plan = The hundreds column, because 508 is five hundred eight */
      { qid: "M1.S1.T2.C4:1", kind: "column", a: 71024, b: 508, digit: 5, at: 2, choices: PLACE_CHOICES, winMs: 1900, ask: "The 5 of 508 sits under?",
        say: "Set out 71,024 + 508 on the mat. Under which column does the 5 of 508 sit?",
        answer: "hundreds", miss: "Which column does the 8 of 508 belong in?" },
      /* practice 2: answer in the plan = Every digit lands in the wrong column, so tens are added to ones and hundreds to tens,
         and the sum is wrong before any adding starts. Word keys on the mat's own picture: 247 set by its left end under 60,532. */
      { qid: "M1.S1.T2.C4:2", kind: "what", a: 60532, b: 247, choices: WHAT_CHOICES, winMs: 1600, ask: "Which digits are out of place?",
        say: "Two addends of different lengths are lined up by their left ends instead of their right. What goes wrong? Which digits of 247 are out of place?",
        answer: "every digit", miss: "Which column is the 7 standing in, and which column does it belong in?" },
    ],
  },
  {
    n: 2,
    concept: "The ones column goes first",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Start at the ones. Say what that column comes to before you move left."],
    ladder: ["Which way does anything that will not fit in a column have to travel?",
      "Add the two digits in the ones column first. Then move one column to the left."],
    closing: "Adding starts at the ones and works left, because anything that spills has to move left.",
    learned: "You learned: add the ones column first, then work left.",
    traceback: "Started in the wrong column: the mat works every column from the right, writing each total in green with its order under it, and the ones column is ringed in amber. A column added wrong: that column's equation, its total boxed in amber, over counters that make it.",
    items: [
      /* learn ML2: answer in the plan = The ones column, which comes to 7, and the sum is 38,677 (the win finishes 38,677) */
      { qid: "M1.S1.T2.C5:ML2", kind: "first", a: 25431, b: 13246, winMs: 2600, ask: "Which column first? Its total?",
        say: "Add 25,431 and 13,246. Tap the column you finish first, then type what it comes to.",
        answer: 7, miss: "Which column is furthest to the right?" },
      /* practice 3: answer in the plan = The ones column comes to 8, and the sum is 55,458 */
      { qid: "M1.S1.T2.C5:3", kind: "first", a: 34152, b: 21306, lit: 0, winMs: 2600, ask: "The ones column makes?",
        say: "Add 34,152 and 21,306. What does the ones column come to?",
        answer: 8, miss: "Which two digits stand in the ones column?" },
      /* practice 4: answer in the plan = 69,474 */
      { qid: "M1.S1.T2.C5:4", kind: "sum", a: 46023, b: 23451, winMs: 2400, ask: "Add, ones first",
        say: "Add 46,023 and 23,451. Work one column at a time, from the right.",
        answer: 69474, miss: "Which column did you start with?" },
    ],
  },
  {
    n: 3,
    concept: "More columns do not mean a new method",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O2"],
    says: ["Same method, more columns. Where does it end this time?"],
    ladder: ["How many of them have a total under the rule?",
      "Count the columns from the right, and give every one of them a total."],
    closing: "A longer sum is the same method with more steps, and it still starts at the ones.",
    learned: "You learned: a longer sum is the same method with more steps.",
    traceback: "A sum read as finished too soon: the mat works all six columns from the right with the steps counted under them, and the first column where the child's sum parts from it (the empty square at the left) is ringed in amber. A column added wrong: that column's equation over counters that make it.",
    items: [
      /* learn ML3: answer in the plan = 8,66,457 */
      { qid: "M1.S1.T2.C6:ML3", kind: "sum", a: 524301, b: 342156, winMs: 2600, ask: "Add, ones first",
        say: "Add 5,24,301 and 3,42,156.", answer: 866457, miss: "How many columns is the mat ruled for?" },
      /* practice 5: answer in the plan = 7,37,178 */
      { qid: "M1.S1.T2.C6:5", kind: "sum", a: 213046, b: 524132, winMs: 2600, ask: "Add, ones first",
        say: "Add 2,13,046 and 5,24,132.", answer: 737178, miss: "Did you stop before the last column on the left?" },
      /* practice 6: answer in the plan = 7,47,739 */
      { qid: "M1.S1.T2.C6:6", kind: "sum", a: 605231, b: 142508, winMs: 2600, ask: "Add, ones first",
        say: "Add 6,05,231 and 1,42,508.", answer: 747739, miss: "Is any square in the green row still empty?" },
    ],
  },
  {
    n: 4,
    concept: "The addends are what you add and the sum is what you get",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Point at the addends. Now point at the sum. Say which is which."],
    ladder: ["What is the row under the rule called?",
      "Which rows hold the numbers you add, and which row holds what they make?"],
    closing: "The addends go above the rule and the sum goes under it.",
    learned: "You learned: the addends go above the rule and the sum goes under it.",
    traceback: "The rule is drawn heavier, the two rows above it lift together, and addend, addend and sum are written beside the rows while the child's labels stay where they were put; a sum is worked again from the right (for the smallest five-digit and largest four-digit numbers the two blank addend rows fill in first), and a column added wrong is put right for that column alone.",
    items: [
      /* learn ML4: answer in the plan = The addends are 61,204 and 27,395, and the sum is 88,599 (the finished sum stands
         on the mat; the answer is the name the row under the rule takes) */
      { qid: "M1.S1.T2.C7:ML4", kind: "name", a: 61204, b: 27395, pad: "enter", winMs: 1600, ask: "Label each row",
        say: "A mat shows 61,204 above 27,395 with a rule under them. Which numbers are the addends, and what is the sum? Drag a label onto each row, then press enter.",
        answer: "sum", miss: "Which rows are above the rule?" },
      /* practice 7: answer in the plan = 19,999, because the addends are 10,000 and 9,999. The labels stay on the rows,
         the addend rows stand blank (the numbers are named only in words), so the typed sum proves the recall; a right
         answer or a miss's correction fills the two rows in, then adds them */
      { qid: "M1.S1.T2.C7:7", kind: "recall", a: 10000, b: 9999, plates: "keep", winMs: 3000, ask: "Find the sum",
        say: "Add the smallest five-digit number and the largest four-digit number.",
        answer: 19999, miss: "What is the smallest number with five digits?" },
      /* practice 8: answer in the plan = The addends are 32,405 and 45,263, and the sum is 77,668 (labels first, then the sum) */
      { qid: "M1.S1.T2.C7:8", kind: "namesum", a: 32405, b: 45263, winMs: 2400, ask: "Label the rows, then add",
        say: "Add thirty-two thousand four hundred five and forty-five thousand two hundred sixty-three. Name the addends first.",
        answer: 77668, miss: "Where does the word sum go on the mat?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { columnWidth: CW, places: PLACES, rows: ["addend", "addend", "sum"], matColumns: [5, 5, 6, 5],
  carries: "none: every pair adds without a column passing nine" };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a working-area answer arrives as { col, value } (which column was worked first) or
   { name, value } (the label under the rule, then the sum); numbers compare as numbers */
const judge = (item: any, v: any) => {
  if (v && typeof v === "object" && v.column) return false;   /* one wrong column total written on the mat: a miss, never the sum */
  if (v && typeof v === "object") {
    if (item.kind === "first") return (v.col === 0 || v.col === null || v.col === undefined) && Number(v.value) === item.answer;
    if (item.kind === "namesum") return v.name === "sum" && Number(v.value) === item.answer;
    return false;
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v ?? "").trim().toLowerCase() === String(item.answer).toLowerCase();
};

/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   its own digit split, column by column */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const split = (v: number) => { const out: number[] = []; let x = v; do { out.push(x % 10); x = Math.floor(x / 10); } while (x > 0); return out; };
  const A = split(it.a), B = split(it.b);
  const fits = A.every((d, k) => d + (B[k] || 0) <= 9) && A.length >= B.length;
  if (it.kind === "column") return B[it.at] === it.digit && it.answer === PLACES[it.at];
  if (it.kind === "what") return A.length > B.length && it.answer === "every digit";
  if (it.kind === "first") return fits && it.answer === A[it.lit || 0] + B[it.lit || 0];
  if (it.kind === "sum" || it.kind === "namesum" || it.kind === "linesum") {
    let s = 0;
    for (let k = 0; k < A.length; k++) s += (A[k] + (B[k] || 0)) * Math.pow(10, k);
    return fits && s === it.answer;
  }
  if (it.kind === "name") return fits && it.answer === "sum";
  /* the smallest five digit number is one followed by four zeros; the largest four digit one is one less */
  if (it.kind === "recall") return it.a === Math.pow(10, 4) && it.b === Math.pow(10, 4) - 1 && it.answer === 2 * Math.pow(10, 4) - 1
    && /smallest five-digit/.test(it.say) && /largest four-digit/.test(it.say);
  return false;
}));

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  const k = item.kind;
  if (k === "column") return "ten thousands";                                /* pushed under the left end */
  if (k === "linesum") return item.a + item.b * Math.pow(10, lenOf(item.a) - lenOf(item.b)); /* added lined up by the left ends */
  if (k === "what") return "none";                                          /* left ends look fine */
  if (k === "name") return "addend";                                        /* the biggest number called an addend */
  if (k === "first") return digAt(item.a, 4) + digAt(item.b, 4);            /* started at the ten thousands */
  if (k === "namesum") return item.a;                                       /* an addend given as the sum */
  if (k === "recall") return item.b;                                        /* an addend given as the sum */
  if (k === "sum") return item.answer % Math.pow(10, lenOf(item.answer) - 1); /* the last column left out */
  return Number(item.answer) + 1;
};
/* the forms of an answer that no question, hint or ladder line may print. For the naming item the
   words addend and sum are the vocabulary every line uses; the answer is which row takes which */
const answerForms = (item: any) => (item.kind === "name" ? []
  /* the recall item: its two addends give the sum away as surely as the sum does */
  : item.kind === "recall" ? [item.answer, item.a, item.b].flatMap((v: number) => [String(v), indian(v), words(v)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the slot writes a typed sum with Indian commas */
const format = (s: any) => (/^\d{4,}$/.test(String(s ?? "")) ? indian(Number(s)) : String(s ?? ""));

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  const k = item.kind, soon = (fn: () => void) => setTimeout(fn, 80);
  if (k === "name") { HOOK.set(item.answer); soon(() => HOOK.enter()); return; }
  if (k === "linesum") { HOOK.home(); soon(() => HOOK.enter(String(item.answer))); return; }
  if (k === "first") { HOOK.light(0); soon(() => HOOK.enter(String(item.answer))); return; }
  if (k === "namesum") { HOOK.name(); soon(() => HOOK.enter(String(item.answer))); return; }
  if (k === "sum" || k === "recall") { HOOK.enter(String(item.answer)); return; }
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it
   (the ones column is lit first, and the labels laid first, where the item asks for them) */
const answer = (item: any, v: any) => {
  if (item.pad === "enter") return HOOK.set ? HOOK.set(v) : false;
  if (item.kind === "linesum" && HOOK.home) HOOK.home();
  if (item.kind === "first" && HOOK.light) HOOK.light(0);
  if (item.kind === "namesum" && HOOK.name) HOOK.name();
  return undefined;
};
/* the agent's check() before Enter: nothing waits on this mat; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

const setupOf = (it: any) => {
  const k = it.kind || "free", a = it.a || 0, b = it.b || 0;
  const cols = Math.max(4, lenOf(a), lenOf(b));
  return {
    kind: k, a, b, cols, at: it.at ?? null,
    offB: k === "linesum" || k === "column" ? null : k === "what" ? cols - lenOf(b) : 0,  /* null = on the ledge */
    lit: it.lit !== undefined ? it.lit : k === "sum" || k === "namesum" ? 0 : null,
    plates: k === "name" || k === "namesum" ? "ledge" : it.plates || "none",
    shown: k === "name" ? a + b : null,                                                /* a finished sum on the mat */
  };
};

const CB_CSS = `
.cb-move{transition:transform 520ms cubic-bezier(.3,.7,.25,1)}
.cb-lift{transition:transform 320ms ease}
.cb-grab{cursor:grab}
.cb-in{animation:cbIn 380ms ease-out both}
@keyframes cbIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.cb-move,.cb-lift{transition:none}.cb-in{animation:none}}
`;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, item, index, stage, wrong, api, lang = "en", tx: tr = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const init = setupOf(item || {});
  const [cfg, setCfg] = useState<any>(init);
  const [offA, setOffAState] = useState(0);
  const offARef = useRef(0);
  const [offB, setOffBState] = useState<number | null>(init.offB);
  const offBRef = useRef<number | null>(init.offB);
  const [row, setRowState] = useState<any[]>(() => (init.shown !== null ? digitsRow(init.shown, init.cols) : blankRow(init.cols)));
  const rowRef = useRef<any[]>(row);
  const [own, setOwnState] = useState<boolean[]>(() => noneOwn(init.cols)); /* cells the child wrote */
  const ownRef = useRef<boolean[]>(own);
  const [lit, setLitState] = useState<number | null>(init.lit);
  const litRef = useRef<number | null>(init.lit);
  const [plates, setPlatesState] = useState<any>(init.plates === "keep" ? PLATES_RIGHT : PLATES_OFF);
  const platesRef = useRef<any>(plates);
  const [run, setRun] = useState<any>(null);          /* the mat's own run after a miss: { at, order, digits } */
  const [fix, setFix] = useState<any>(null);          /* one column put right after a miss: { col, da, db, total, step } */
  const [hl, setHl] = useState<number[]>([]);          /* headings lit */
  const [ring, setRing] = useState<number[]>([]);      /* strip digits ringed, by the column they stand in */
  const [part, setPart] = useState<number | null>(null);
  const [worth, setWorth] = useState(false);
  const [ghostB, setGhostB] = useState(false);
  const [veil, setVeil] = useState(init.kind === "recall" ? 2 : 0); /* addend rows still blank: 2 both, 1 the lower */
  const [tagWhat, setTagWhat] = useState(false);
  const [ghostNames, setGhostNames] = useState(0);
  const [heavy, setHeavy] = useState(false);
  const [lift, setLift] = useState(false);
  const [touched, setTouched] = useState(false);
  const [liningOn, setLining] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const setupFor = useRef(index);
  const grab = useRef<any>(null);

  const setOffA = (v: number) => { offARef.current = v; setOffAState(v); };
  const setOffB = (v: number | null) => { offBRef.current = v; setOffBState(v); };
  const setRow = (r: any[], o?: boolean[]) => { rowRef.current = r; setRowState(r); if (o) { ownRef.current = o; setOwnState(o); } };
  const setLit = (v: number | null) => { litRef.current = v; setLitState(v); };
  const setPlates = (p: any) => { platesRef.current = p; setPlatesState(p); };

  const busy = tl.busy;
  const kind = cfg.kind, cols = cfg.cols;
  const lenA = lenOf(cfg.a), lenB = lenOf(cfg.b);
  const target = digitsRow(cfg.a + cfg.b, cols);
  const rowKind = kind === "sum" || kind === "namesum" || kind === "linesum";   /* worked column by column */
  const sumKind = rowKind || kind === "first" || kind === "recall";
  const lining = kind === "linesum" || kind === "column";                    /* the short strip waits on the ledge */
  /* nothing is live on the one render where a new question is asked but its mat is not set out yet */
  const fresh = free || setupFor.current === index;
  const asking = stage === "ask" && !busy && fresh;

  const reset = (it: any) => {
    tl.stop();
    const s = setupOf(it);
    setCfg(s); setOffA(0); setOffB(s.offB);
    setRow(s.shown !== null ? digitsRow(s.shown, s.cols) : blankRow(s.cols), noneOwn(s.cols));
    setLit(s.lit); setRun(null); setFix(null); setHl([]); setRing([]); setPart(null);
    setWorth(false); setGhostB(false); setTagWhat(false); setGhostNames(0); setHeavy(false); setLift(false); setTouched(false);
    setVeil(s.kind === "recall" ? 2 : 0);
    if (s.plates === "ledge") setPlates(PLATES_OFF);
    else if (s.plates === "keep" && !namedRight(platesRef.current)) setPlates(PLATES_RIGHT);
    api.lock(false);
  };

  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);

  /* free play (the plan's freePlay): any two numbers, slide either strip, check the lining, open the
     expanded strip, tap under a column to add it; nothing to get right */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset(dealFree()); setLining(false); setExpanded(false);
  }, [free]);

  /* ── moves ── */
  const allPlaced = () => PLATE_IDS.every((id) => !!platesRef.current[id]);
  const nextEmpty = () => { const r = rowRef.current; for (let k = 0; k < r.length; k++) if (r[k] === null) return k; return null; };
  const writeCell = (c: number, d: number, mine: boolean) => {
    const r = rowRef.current.slice(), o = ownRef.current.slice();
    r[c] = d; o[c] = mine;
    setRow(r, o); api.sfx.tick();
  };
  const stripLive = (id: string) => !busy && (free || (asking && id === "b" && lining));
  const place = (id: string, off: number | null) => {
    if (id === "a") setOffA(off || 0); else setOffB(off);
    api.sfx.tick();
    if (!free && lining) setWorth(off !== null);
    if (free || kind === "linesum") {                /* totals of the old lining no longer stand */
      setRow(blankRow(cols), noneOwn(cols)); setRun(null); setFix(null); setPart(null);
      if (kind === "linesum") setLit(off !== null ? 0 : null);
    }
  };
  /* a strip lands with its digits centred in columns; let go below the mat, it goes back to the ledge.
     A tap (or Enter) moves it one column toward the ones; from the ledge it steps onto the mat at its left end */
  const dropStrip = (id: string, at: any) => {
    if (!stripLive(id)) return;
    setTouched(true);
    const len = id === "a" ? lenA : lenB, maxOff = cols - len;
    const cur = id === "a" ? offARef.current : offBRef.current;
    if (!at) { place(id, cur === null ? maxOff : cur > 0 ? cur - 1 : maxOff); return; }
    const cy = at.y + GEO.rowH / 2;
    if (cy < GEO.rowA - 40 || cy > GEO.sum + GEO.rowH + 10) { if (id === "b" && !free) place("b", null); return; }
    const rc = at.x + (len - 1) * CW + CW / 2;
    place(id, Math.max(0, Math.min(maxOff, Math.round((RIGHT - CW / 2 - rc) / CW))));
  };
  const nudge = (id: string, dir: number) => {
    if (!stripLive(id)) return;
    setTouched(true);
    const len = id === "a" ? lenA : lenB, maxOff = cols - len;
    const cur = id === "a" ? offARef.current : offBRef.current;
    place(id, cur === null ? maxOff : Math.max(0, Math.min(maxOff, cur - dir)));
  };
  const keysFor = (id: string) => (e: any) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); e.stopPropagation(); nudge(id, e.key === "ArrowRight" ? 1 : -1); return; }
    drag.keys({ strip: id }).onKeyDown(e);
  };

  const platesLive = asking && (kind === "name" || kind === "namesum");
  /* a label lands on the row it is let go over (swapping with a label already there); a tap puts it on
     the first free row from the top, or back on the ledge */
  const dropPlate = (id: string, p: any) => {
    if (!platesLive) return;
    setTouched(true);
    const cur = platesRef.current, from = cur[id];
    let to: string | null = null;
    if (!p) to = from ? null : ["a", "b", "s"].find((r) => !PLATE_IDS.some((q) => cur[q] === r)) || null;
    else if (p.x < RIGHT) to = p.y >= GEO.rowA - 8 && p.y < GEO.rowB - 4 ? "a" : p.y >= GEO.rowB - 4 && p.y < GEO.rule ? "b"
      : p.y >= GEO.rule && p.y <= GEO.sum + GEO.rowH + 8 ? "s" : null;
    const next = { ...cur };
    const other = to ? PLATE_IDS.find((q) => q !== id && cur[q] === to) : null;
    if (other) next[other] = from;
    next[id] = to;
    setPlates(next); api.sfx.tick();
  };

  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    const g = grab.current;
    if (payload.plate) dropPlate(payload.plate, moved ? p : null);
    else if (payload.strip) dropStrip(payload.strip, moved && g ? { x: p.x - g.x0 + g.left, y: p.y - g.y0 + g.top } : null);
  });
  const stripOrigin = (id: string) => {
    if (id === "a") return { x: colX(offARef.current + lenA - 1), y: GEO.rowA };
    const o = offBRef.current;
    return o === null ? { x: GEO.ledgeX, y: GEO.ledge + (GEO.ledgeH - GEO.rowH) / 2 } : { x: colX(o + lenB - 1), y: GEO.rowB };
  };
  if (drag.drag && !grab.current) {
    const pl = drag.drag.payload, o = pl && pl.strip ? stripOrigin(pl.strip) : { x: 0, y: 0 };
    grab.current = { x0: drag.drag.x, y0: drag.drag.y, left: o.x, top: o.y };
  }
  if (!drag.drag) grab.current = null;

  /* the column to work: in "first" any column; in a sum only the rightmost empty one lights (ones
     first), or one already written to rewrite it; after a miss, any */
  const firstEmpty = (() => { for (let k = 0; k < row.length; k++) if (row[k] === null) return k; return null; })();
  const placedAll = PLATE_IDS.every((id) => !!plates[id]);
  const colLive = (c: number) => {
    if (!asking || free) return false;
    if (kind === "first") return true;
    if (!rowKind || (kind === "namesum" && !placedAll) || (kind === "linesum" && offB === null)) return false;
    return !!wrong || row[c] !== null || c === firstEmpty;
  };
  const pickCol = (c: number) => { if (!colLive(c)) return; setLit(c); setTouched(true); api.sfx.tick(); };
  /* free play: the digits standing in a column, whatever the lining, added and written under the rule */
  const standing = (c: number) => {
    const ia = c - offA, ib = offB === null ? -1 : c - offB;
    return { da: ia >= 0 && ia < lenA ? digAt(cfg.a, ia) : null, db: ib >= 0 && ib < lenB ? digAt(cfg.b, ib) : null };
  };
  const addCol = (c: number) => {
    if (!free || busy) return;
    const { da, db } = standing(c);
    if (da === null && db === null) return;
    writeCell(c, (da || 0) + (db || 0), true);
  };

  /* ── Enter (and the agent's check) ── */
  const submitSum = (v: number) => {
    if (kind === "namesum") { api.setTyped(String(v)); api.submit({ name: labelIn(platesRef.current, "s"), value: v }); }
    else api.submit(v);
  };
  const enterFn: any = !asking ? null
    : kind === "name" ? () => {
      if (!allPlaced()) { api.say("Put a label on every row first."); return; }
      api.submit(labelIn(platesRef.current, "s"));    /* the name the row under the rule was given */
    }
    : kind === "first" ? (v: any) => {
      const s = String(v ?? "").trim();
      if (!/^\d+$/.test(s)) return;
      const c = litRef.current;
      if (s.length === 1 && c !== null) writeCell(c, Number(s), true);
      api.submit({ col: c, value: Number(s) });
    }
    : kind === "recall" ? (v: any) => {                /* the addends are not on the mat: the whole sum is typed */
      const s = String(v ?? "").trim();
      if (/^\d+$/.test(s)) api.submit(Number(s));
    }
    : rowKind ? (v: any) => {
      if (kind === "namesum" && !allPlaced()) { api.say("Put a label on every row first."); return; }
      const s = String(v ?? "").trim();
      if (s === "") { const rv = rowNumber(rowRef.current); if (rv !== null) { api.setTyped(String(rv)); submitSum(rv); } return; }
      if (!/^\d+$/.test(s)) return;
      if (s.length > 1) { submitSum(Number(s)); return; }   /* a whole sum typed at once */
      if (kind === "linesum" && offBRef.current === null) { api.say("Slide the strip onto the mat first."); return; }
      const c = litRef.current !== null ? litRef.current : nextEmpty();
      if (c === null) { submitSum(Number(s)); return; }
      writeCell(c, Number(s), true); api.setTyped("");      /* one column's total, written under it */
      /* the chapter's rule: a wrong column total is a miss, put right for that column only; the child's
         digit stays in its square and the column stays lit, so the child writes it again and carries on */
      if (Number(s) !== target[c]) { api.submit({ column: true, col: c, digit: Number(s) }); return; }
      setFix(null);
      const ne = nextEmpty();
      setLit(ne);
      if (ne === null) { const rv = rowNumber(rowRef.current); if (rv !== null) { api.setTyped(String(rv)); submitSum(rv); } }
    }
    : null;
  api.onEnter(enterFn);
  HOOK.enter = (v?: any) => enterFn && enterFn(v);
  HOOK.home = () => { if (kind !== "linesum") return; setOffB(0); setWorth(true); setLit(nextEmpty()); setTouched(true); };
  HOOK.set = (v: any) => {
    if (kind === "name") { setPlates(String(v ?? "").trim().toLowerCase() === "sum" ? PLATES_RIGHT : { add1: "a", add2: "s", sum: "b" }); setTouched(true); return true; }
    return false;
  };
  HOOK.light = (c: number) => setLit(c);
  HOOK.name = () => { setPlates(PLATES_RIGHT); setTouched(true); };

  /* ── win motions: the maths moving ── */
  const fillSteps = (ms: number) => {
    const S: any[] = [];
    for (let k = 0; k < cols; k++) {
      const u = k;
      S.push(rowRef.current[u] === null ? [ms, () => { setLit(u); writeCell(u, target[u], false); }] : [140, () => setLit(u)]);
    }
    return S;
  };
  useEffect(() => {
    if (stage !== "win") return;
    const S: any[] = [];
    if (kind === "linesum") {
      /* home by its right end (if it was typed without the strip in line), then the sum from the ones */
      if (offBRef.current !== 0) S.push([620, () => { setRing([]); setOffB(0); setWorth(true); }]);
      S.push(...fillSteps(300), [200, () => setLit(null)]);
    } else if (kind === "column") {
      S.push([700, () => { setRing([]); setOffB(0); setWorth(true); }], [900, () => setHl([cfg.at])]);
    } else if (kind === "what") {
      S.push([900, () => { setRing([]); setHl([]); setGhostB(false); setTagWhat(false); setOffB(0); setWorth(true); }]);
    } else if (sumKind) {
      if (kind === "recall") S.push([560, () => setVeil(1)], [560, () => setVeil(0)]);   /* the two addends fill in, then the sum */
      S.push(...fillSteps(260), [200, () => setLit(null)]);
    } else if (kind === "name") {
      S.push([300, () => setHeavy(true)], [400, () => setLift(true)], [400, () => setLift(false)], [200, () => setHeavy(false)]);
    }
    if (S.length) tl.run(S);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
     nothing marked, nothing the child did is cleared ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const done = () => api.lock(false);
    const S: any[] = [[300, () => {}]];
    if (lining) {
      const o = offBRef.current;
      if (o !== null && o !== 0) {
        const cs = Array.from({ length: lenB }, (_, j) => o + j);
        S.push([1500, () => { setWorth(true); setRing(cs); setHl(cs); }]);   /* check lining: every digit out of its place */
      }
      /* home by its right end (the child's totals, if any, stay where they were written) */
      if (o !== 0) S.push([760, () => { setRing([]); setHl([]); setWorth(true); setOffB(0); }]);
      if (kind === "column") {
        /* the headings over its digits light from the ones; the one over the 5 stays lit: its place is the answer */
        for (let j = 0; j < lenB; j++) { const u = j; S.push([460, () => setHl(Array.from({ length: u + 1 }, (_, q) => q))]); }
        S.push([300, () => setHl([cfg.at])]);
      }
    }
    const wv = wrong.value;
    /* one column put right: the equation for that column (the two digits standing in it, deep blue, and
       its total boxed in amber) over a row of counters that makes it; it ends on that column's total */
    const firstCol = kind === "first" && wv && typeof wv === "object" ? wv.col : null;
    const firstVal = kind === "first" ? (wv && typeof wv === "object" ? Number(wv.value) : leadNumber(wv)) : null;
    const orderMiss = kind === "first" && ((firstCol !== null && firstCol !== undefined && firstCol !== 0)
      || ((firstCol === null || firstCol === undefined) && target.some((d, k) => k > 0 && d === firstVal)));
    const colFix = (wv && typeof wv === "object" && wv.column) ? wv.col : kind === "first" && !orderMiss ? 0 : null;
    if (colFix !== null) {
      const c = colFix, da = c < lenA ? digAt(cfg.a, c) : null, db = c < lenB ? digAt(cfg.b, c) : null;
      const base = { col: c, da: da === null ? db : da, db: da === null ? null : db, total: target[c] };
      S.push([240, () => { setRun(null); setPart(null); setHl([]); setLit(c); setFix({ ...base, step: 1 }); }],
        [800, () => setFix({ ...base, step: 2 })], [700, () => setFix({ ...base, step: 3 })]);
    } else if (kind === "column") {
      /* done above */
    } else if (kind === "what") {
      const o = offBRef.current === null ? cols - lenB : offBRef.current;
      S.push([200, () => setWorth(true)]);
      for (let j = 0; j < lenB; j++) { const c = o + j; S.push([650, () => { setRing((r) => [...r, c]); setHl((h) => [...h, c]); }]); }
      S.push([500, () => setGhostB(true)], [300, () => setTagWhat(true)]);
    } else if (kind === "name") {
      S.push([400, () => setHeavy(true)], [500, () => setLift(true)], [600, () => setGhostNames(1)], [600, () => setGhostNames(2)],
        [400, () => setLift(false)], [500, () => setGhostNames(3)]);
    } else if (sumKind) {
      if (kind === "namesum" && labelIn(platesRef.current, "s") !== "sum")
        S.push([400, () => setHeavy(true)], [450, () => setGhostNames(1)], [450, () => setGhostNames(2)], [450, () => setGhostNames(3)]);
      /* the recall item: the two addends are written into their rows first, then added */
      if (kind === "recall") S.push([700, () => setVeil(1)], [700, () => setVeil(0)]);
      /* the whole sum worked again from the ones, each column numbered in the order it is done */
      const r0 = rowRef.current, o0 = ownRef.current;
      const mineAny = o0.some(Boolean);
      const at = mineAny ? "check" : "sum";     /* the child's own totals stay; the mat writes its run under them */
      const given = wv && typeof wv === "object" ? Number(wv.value) : leadNumber(wv);
      const mine = mineAny ? r0.map((d, k) => (o0[k] ? d : null))
        : given !== null && given !== undefined && isFinite(given) ? digitsRow(given, cols) : blankRow(cols);
      let pc: number | null = kind === "first" ? 0 : null;
      if (pc === null) for (let k = 0; k < cols; k++) if (mine[k] !== target[k]) { pc = k; break; }
      S.push([200, () => {
        setLit(null); setPart(null); setFix(null); setRun({ at, order: 0, digits: blankRow(cols) });
        if (at === "sum") setRow(blankRow(cols), noneOwn(cols));
      }]);
      for (let k = 0; k < cols; k++) {
        const u = k;
        S.push([560, () => {
          setLit(u);
          setRun({ at, order: u + 1, digits: target.map((d, q) => (q <= u ? d : null)) });
          if (at === "sum") writeCell(u, target[u], false); else api.sfx.tick();
        }]);
      }
      S.push([300, () => { setLit(null); setPart(pc); }]);
    }
    tl.run(S, done);
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  api.share({
    columns: cols, addends: [veil >= 2 ? null : cfg.a, veil >= 1 ? null : cfg.b], offsets: [offA, offB], lined: offA === 0 && offB === 0,
    columnDone: row.map((d) => d !== null), sum: rowNumber(row), expandedOpen: expanded,
    labels: { a: labelIn(plates, "a"), b: labelIn(plates, "b"), s: labelIn(plates, "s") },
  });

  /* ── drawing ── */
  const doneCount = row.filter((d) => d !== null).length;
  const showPlates = cfg.plates !== "none" && !free;
  const litShown = lit !== null && !(kind === "namesum" && !placedAll) ? lit : null;
  const left = colX(cols - 1);
  const matBottom = GEO.sum + GEO.rowH;
  const dd = drag.drag && drag.drag.moved ? drag.drag : null;
  const dStrip = dd && dd.payload && dd.payload.strip ? dd.payload.strip : null;
  const dPlate = dd && dd.payload && dd.payload.plate ? dd.payload.plate : null;
  let hover: any = null;
  if (dStrip && grab.current) {
    const g = grab.current, len = dStrip === "a" ? lenA : lenB;
    const x = dd.x - g.x0 + g.left, y = dd.y - g.y0 + g.top, cy = y + GEO.rowH / 2;
    const over = cy >= GEO.rowA - 40 && cy <= GEO.sum + GEO.rowH + 10;
    const off = over ? Math.max(0, Math.min(cols - len, Math.round((RIGHT - CW / 2 - (x + (len - 1) * CW + CW / 2)) / CW))) : null;
    hover = { id: dStrip, x, y, off, len };
  }
  const hoverCols = hover && hover.off !== null ? Array.from({ length: hover.len }, (_, j) => hover.off + j) : [];
  const liningA = free && liningOn && offA ? Array.from({ length: lenA }, (_, j) => offA + j) : [];
  const liningB = free && liningOn && offB ? Array.from({ length: lenB }, (_, j) => (offB as number) + j) : [];
  const headLit = (k: number) => hl.includes(k) || hoverCols.includes(k) || liningA.includes(k) || liningB.includes(k) || litShown === k;
  const ledgeOn = !free && ((lining && (offB === null || dStrip === "b")) || ghostB || (showPlates && (PLATE_IDS.some((id) => !plates[id]) || !!dPlate)));
  const plateAt = (id: string) => {
    const r = plates[id];
    if (r) return { x: GEO.plateX, y: ROWY[r] + (GEO.rowH - GEO.plateH) / 2 };
    return { x: GEO.ledgeX + PLATE_IDS.indexOf(id) * 190, y: GEO.ledge + (GEO.ledgeH - GEO.plateH) / 2 };
  };
  const bLive = stripLive("b"), aLive = stripLive("a");
  const bAt = offB === null ? { x: GEO.ledgeX, y: GEO.ledge + (GEO.ledgeH - GEO.rowH) / 2 } : { x: colX(offB + lenB - 1), y: GEO.rowB };

  /* a strip of digit cards joined into one piece, left end at 0; `off` = the column its ones digit stands in */
  const stripBody = (v: number, len: number, off: number | null, o: any) => (
    <g>
      <rect x={10} y={2} width={len * CW - 20} height={GEO.rowH - 4} rx={20} fill={o.ghost ? "#FFFFFF" : tint(BLUE, 0.84)}
        stroke={tint(BLUE, o.ghost ? 0.3 : 0.45)} strokeWidth={2} strokeDasharray={o.ghost ? "10 8" : undefined} />
      {Array.from({ length: len }).map((_, i) => {
        const j = len - 1 - i, d = digAt(v, j), cx = i * CW + CW / 2;
        const col = off === null ? null : off + j;
        const showW = !!o.worth && col !== null;
        return (
          <g key={i}>
            <rect x={cx - GEO.cardW / 2} y={5} width={GEO.cardW} height={GEO.cardH} rx={12} fill="#FFFFFF" stroke={tint(BLUE, 0.35)} strokeWidth={2}
              strokeDasharray={o.ghost ? "8 6" : undefined} />
            <text x={cx} y={showW ? 44 : 58} textAnchor="middle" fontSize={showW ? T.speech : T.xl} fontWeight={700} fill={d === 0 ? ZERO : BLUE_INK}>{d}</text>
            {showW && <text x={cx} y={70} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={d === 0 ? ZERO : C.ink}>{indian(d * Math.pow(10, col as number))}</text>}
            {o.ring && col !== null && o.ring.includes(col) && (
              <rect x={cx - GEO.cardW / 2 - 5} y={0} width={GEO.cardW + 10} height={GEO.cardH + 10} rx={16} fill="none" stroke={AMBER} strokeWidth={5} />
            )}
          </g>
        );
      })}
    </g>
  );
  const plateBody = (w: string) => (
    <g>
      <rect x={0} y={-10} width={GEO.plateW} height={GEO.plateH + 20} fill="transparent" />
      <rect x={0} y={0} width={GEO.plateW} height={GEO.plateH} rx={14} fill="url(#gAccent)" stroke={shade(C.accent, 0.2)} strokeWidth={2} />
      <text x={GEO.plateW / 2} y={GEO.plateH / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{tr(w)}</text>
    </g>
  );

  const invite =
    lining && asking && offB === null && !touched ? { x: GEO.ledgeX + (lenB - 1) * CW + CW / 2, y: GEO.ledge + GEO.ledgeH / 2, r: 58 }
      : showPlates && platesLive && !placedAll ? (() => { const p = plateAt(PLATE_IDS.find((q) => !plates[q]) as string); return { x: p.x + GEO.plateW / 2, y: p.y + GEO.plateH / 2, r: 58 }; })()
        : sumKind && asking && litShown !== null && doneCount === 0 && !wrong ? { x: colC(litShown), y: GEO.sum + GEO.rowH / 2, r: 50 }
          : null;

  return (
    <g>
      <style>{CB_CSS}</style>

      {/* the running count: columns closed against the columns the mat is ruled for */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={20} y={-36} fontSize={T.xl} fontWeight={700} fill={C.ink}>{`${doneCount} / ${cols}`}</text>
        {/* Hindi and Gujarati lines are taller: a little more room between the two */}
        <text x={312} y={lang === "en" ? -60 : -64} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tr("columns")}</text>
        <text x={312} y={lang === "en" ? -30 : -27} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tr("added")}</text>
      </g>

      {/* the column being worked lights the full height of both addend rows */}
      {litShown !== null && (
        <rect x={colX(litShown) + 3} y={GEO.headH + 3} width={CW - 6} height={(run && run.at === "check" ? GEO.check + GEO.rowH : matBottom) - GEO.headH}
          rx={16} fill={tint(AMBER, 0.78)} stroke={AMBER} strokeWidth={3} />
      )}

      {/* a heading over every column */}
      {Array.from({ length: cols }).map((_, k) => {
        const x = colX(k), on = headLit(k), two = lang === "en" && PLACES[k] === "ten thousands";   /* one line fits in hi/gu */
        return (
          <g key={"h" + k}>
            <rect x={x + 4} y={0} width={CW - 8} height={GEO.headH} rx={14} fill={on ? tint(AMBER, 0.6) : tint(C.panel, 0.25)} stroke={on ? AMBER : C.rule} strokeWidth={on ? 3 : 1.5} />
            {two ? (
              <g>
                <text x={colC(k)} y={25} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>ten</text>
                <text x={colC(k)} y={51} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>thousands</text>
              </g>
            ) : (
              <text x={colC(k)} y={39} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tr(PLACES[k])}</text>
            )}
          </g>
        );
      })}
      {/* the rules between the columns */}
      {Array.from({ length: cols + 1 }).map((_, k) => {
        const x = k === cols ? left : colX(k) + CW;
        return <line key={"v" + k} x1={x} y1={GEO.headH + 4} x2={x} y2={matBottom + 2} stroke={tint(C.rule, 0.2)} strokeWidth={2} />;
      })}

      {/* the ledge: where a strip or a label waits for a home */}
      {ledgeOn && <rect x={0} y={GEO.ledge} width={RIGHT} height={GEO.ledgeH} rx={22} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />}

      {/* the addend rows (they lift together while their name is written) */}
      <g className="cb-lift" style={{ transform: `translateY(${lift ? -8 : 0}px)` } as any}>
        <g className={"cb-move" + (aLive ? " cb-grab c4-piece" : "")} style={{ transform: `translate(${colX(offA + lenA - 1)}px, ${GEO.rowA}px)` } as any}
          display={dStrip === "a" ? "none" : undefined}
          {...(aLive ? { ...control("strip-a", "Slide " + indian(cfg.a) + " along the mat"), ...drag.bind({ strip: "a" }), onKeyDown: keysFor("a") } : {})}>
          {veil >= 2 ? null : <g className={kind === "recall" ? "cb-in" : undefined}>{stripBody(cfg.a, lenA, offA, { ring: liningA })}</g>}
        </g>
        <g className={"cb-move" + (bLive ? " cb-grab c4-piece" : "")} style={{ transform: `translate(${bAt.x}px, ${bAt.y}px)` } as any}
          display={dStrip === "b" ? "none" : undefined}
          {...(bLive ? { ...control("strip-b", "Slide " + indian(cfg.b) + " along the mat"), ...drag.bind({ strip: "b" }), onKeyDown: keysFor("b") } : {})}>
          {veil >= 1 ? null : <g className={kind === "recall" ? "cb-in" : undefined}>{stripBody(cfg.b, lenB, offB, { worth: (worth || (free && liningOn)) && offB !== null, ring: free ? liningB : ring })}</g>}
        </g>
        {/* an addend row still blank (the recall item): no cells, so not even how many digits it holds */}
        {[GEO.rowA, GEO.rowB].map((y, i) => (veil > (1 - i) ? (
          <rect key={"blank" + i} x={left + 6} y={y + 2} width={RIGHT - left - 12} height={GEO.rowH - 4} rx={20} fill="#FFFFFF" stroke={tint(BLUE, 0.45)} strokeWidth={2} strokeDasharray="10 8" />
        ) : null))}
        {!showPlates && offB !== null && <text x={left - 28} y={GEO.rowB + 56} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>+</text>}
      </g>

      {/* the rule, heavier while the rows are being named */}
      <line x1={showPlates ? GEO.plateX : left - 8} y1={GEO.rule + 3} x2={RIGHT - 6} y2={GEO.rule + 3} stroke={C.ink} strokeWidth={heavy ? 10 : 6} strokeLinecap="round" />

      {/* the sum row: a square under every column, a total written in green */}
      {Array.from({ length: cols }).map((_, k) => {
        const d = row[k], cx = colC(k), y = GEO.sum;
        return (
          <g key={"s" + k}>
            <rect x={cx - GEO.cardW / 2} y={y + 5} width={GEO.cardW} height={GEO.cardH} rx={12} fill={d === null ? "#FFFFFF" : tint(GREEN, 0.86)}
              stroke={d === null ? C.rule : tint(GREEN, 0.4)} strokeWidth={2} strokeDasharray={d === null ? "8 7" : undefined} />
            {d !== null && <text x={cx} y={y + 58} textAnchor="middle" fontSize={d > 9 ? T.speech : T.xl} fontWeight={700} fill={d === 0 ? ZERO : GREEN_INK}>{d}</text>}
            {free && <Hit id={"add-" + k} label={"Add the " + PLACES[k] + " column"} x={colX(k)} y={y} w={CW} h={GEO.rowH} onPress={() => addCol(k)} />}
          </g>
        );
      })}

      {/* the mat's own run after a miss: under the child's totals when there are any, with its order */}
      {run && run.at === "check" && (
        <g>
          <rect x={left + 6} y={GEO.check + 2} width={RIGHT - left - 12} height={GEO.rowH - 4} rx={20} fill={tint(GREEN, 0.92)} stroke={tint(GREEN, 0.55)} strokeWidth={2} />
          {run.digits.map((d: any, k: number) => (d === null ? null : (
            <text key={"r" + k} x={colC(k)} y={GEO.check + 58} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={d === 0 ? ZERO : GREEN_INK}>{d}</text>
          )))}
        </g>
      )}
      {run && Array.from({ length: run.order }).map((_, k) => (
        <text key={"o" + k} x={colC(k)} y={(run.at === "check" ? GEO.check : GEO.sum) + GEO.rowH + 32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tr(ORD[k])}</text>
      ))}
      {part !== null && run && (
        <rect x={colC(part) - GEO.cardW / 2 - 9} y={GEO.sum - 2} width={GEO.cardW + 18} height={(run.at === "check" ? GEO.check + GEO.rowH : matBottom) - GEO.sum + 4}
          rx={18} fill="none" stroke={AMBER} strokeWidth={5} />
      )}

      {/* one column put right: its equation, and counters that make it; the child's digit stays in its square */}
      {fix && (() => {
        const mid = (left + RIGHT) / 2, y0 = GEO.check + 2;
        const parts: any[] = fix.db === null
          ? [{ t: fix.da, ink: BLUE_INK }, { t: "=", ink: C.ink }, { t: fix.total, box: true }]
          : [{ t: fix.da, ink: BLUE_INK }, { t: "+", ink: C.ink }, { t: fix.db, ink: BLUE_INK }, { t: "=", ink: C.ink }, { t: fix.total, box: true }];
        const x0 = mid - (parts.length * 76) / 2 + 38;
        const groups = fix.db === null ? [fix.da] : [fix.da, fix.db];
        const tokW = groups.reduce((s: number, g: number) => s + g * 40, 0) + (groups.length - 1) * 28;
        let tx = mid - tokW / 2 + 20;
        const dots: any[] = [];
        groups.forEach((g: number, gi: number) => { for (let q = 0; q < g; q++) { dots.push(tx); tx += 40; } if (gi < groups.length - 1) tx += 28; });
        return (
          <g>
            <rect x={colC(fix.col) - GEO.cardW / 2 - 9} y={GEO.sum - 2} width={GEO.cardW + 18} height={GEO.rowH + 4} rx={18} fill="none" stroke={AMBER} strokeWidth={5} />
            <rect x={left + 6} y={y0} width={RIGHT - left - 12} height={GEO.fixH} rx={20} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
            {parts.map((p, i) => (p.box ? (
              <g key={"q" + i}>
                <rect x={x0 + i * 76 - 32} y={y0 + 10} width={64} height={70} rx={12} fill={fix.step >= 3 ? tint(GREEN, 0.86) : "#FFFFFF"} stroke={AMBER} strokeWidth={5}
                  strokeDasharray={fix.step >= 3 ? undefined : "8 6"} />
                {fix.step >= 3 && <text x={x0 + i * 76} y={y0 + 64} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={fix.total === 0 ? ZERO : GREEN_INK}>{fix.total}</text>}
              </g>
            ) : (
              <text key={"q" + i} x={x0 + i * 76} y={y0 + 64} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={p.t === 0 ? ZERO : p.ink}>{p.t}</text>
            )))}
            {fix.step >= 2 && <g filter="url(#fShadowSoft)">{dots.map((x, i) => <Disc key={"t" + i} x={x} y={y0 + 124} r={16} paint="gHundred" flat />)}</g>}
          </g>
        );
      })()}

      {/* where the out-of-place digits belong, laid on the ledge under their own columns */}
      {ghostB && <g transform={`translate(${colX(lenB - 1)},${GEO.ledge + (GEO.ledgeH - GEO.rowH) / 2})`}>{stripBody(cfg.b, lenB, 0, { worth: true, ghost: true })}</g>}
      {tagWhat && <text x={24} y={GEO.rowB + 52} fontSize={T.label} fontWeight={700} fill={C.ink}>{tr("every digit")}</text>}

      {/* the names written beside the rows after a miss (the child's labels stay where they were put) */}
      {["a", "b", "s"].slice(0, ghostNames).map((r) => (
        <g key={"gn" + r} className="cb-in">
          <rect x={4} y={ROWY[r] + (GEO.rowH - GEO.plateH) / 2} width={136} height={GEO.plateH} rx={14} fill="#FFFFFF" stroke={C.accent} strokeWidth={2} strokeDasharray="8 6" />
          <text x={72} y={ROWY[r] + GEO.rowH / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tr(ROW_WORD[r])}</text>
        </g>
      ))}

      {/* the naming labels */}
      {showPlates && PLATE_IDS.map((id) => {
        const p = plateAt(id), pay = { plate: id };
        return (
          <g key={id} className={"cb-move" + (platesLive ? " cb-grab c4-piece" : "")} style={{ transform: `translate(${p.x}px, ${p.y}px)` } as any}
            display={dPlate === id ? "none" : undefined}
            {...(platesLive ? { ...control("plate-" + id, "Label " + PLATE_WORD[id]), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
            {plateBody(PLATE_WORD[id])}
          </g>
        );
      })}

      {/* free play: the expanded strip, each part under the column it came out of */}
      {free && expanded && (
        <g>
          <rect x={left + 6} y={GEO.check + 2} width={RIGHT - left - 12} height={GEO.rowH + 6} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          {[{ id: "a", v: cfg.a, len: lenA, off: offA, y: GEO.check + 36 }, { id: "b", v: cfg.b, len: lenB, off: offB, y: GEO.check + 76 }].map((s: any) => (s.off === null ? null : (
            <g key={"x" + s.id}>
              {Array.from({ length: s.len }).map((_, j) => {
                const d = digAt(s.v, j), c = s.off + j;
                return <text key={j} x={colC(c)} y={s.y} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={d === 0 ? ZERO : BLUE_INK}>{indian(d * Math.pow(10, c))}</text>;
              })}
              {Array.from({ length: s.len - 1 }).map((_, j) => (
                <text key={"p" + j} x={colX(s.off + j)} y={s.y} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>+</text>
              ))}
            </g>
          )))}
        </g>
      )}
      {free && (
        <g>
          <Key id="new-sum" label={tr("New sum")} x={0} y={GEO.keysY} w={236} h={72} C={C} onClick={() => reset(dealFree())}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tr("New sum")}</text>
          </Key>
          <Key id="check-lining" label={tr(liningOn ? "Lining check off" : "Check lining")} x={252} y={GEO.keysY} w={256} h={72} C={C} primary={liningOn} onClick={() => setLining((b) => !b)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={liningOn ? "#FFFFFF" : C.ink}>{tr("Check lining")}</text>
          </Key>
          <Key id="expanded" label={tr(expanded ? "Expanded strip off" : "Expanded strip")} x={524} y={GEO.keysY} w={236} h={72} C={C} primary={expanded} onClick={() => setExpanded((b) => !b)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={expanded ? "#FFFFFF" : C.ink}>{tr("Expanded")}</text>
          </Key>
        </g>
      )}

      {/* a column is tapped to work it (while the short strip can still slide, only its square under the rule) */}
      {sumKind && Array.from({ length: cols }).map((_, k) => (colLive(k) ? (
        <Hit key={"c" + k} id={"col-" + k} label={"Work the " + PLACES[k] + " column"} x={colX(k)} y={kind === "linesum" ? GEO.sum : GEO.headH + 2} w={CW}
          h={kind === "linesum" ? GEO.rowH : matBottom - GEO.headH} onPress={() => pickCol(k)} />
      ) : null))}

      {/* the piece under the finger */}
      {hover && (
        <g pointerEvents="none" filter="url(#fLift)" transform={`translate(${hover.x},${hover.y})`}>
          {stripBody(hover.id === "a" ? cfg.a : cfg.b, hover.len, hover.off, { worth: hover.off !== null })}
        </g>
      )}
      {dPlate && <g pointerEvents="none" filter="url(#fLift)" transform={`translate(${dd.x - GEO.plateW / 2},${dd.y - GEO.plateH / 2})`}>{plateBody(PLATE_WORD[dPlate])}</g>}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: a sum under a
   rule in green, or the word the child gave */
function Thumb({ result, C, w, h, tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const v = L.value;
  const num = v && typeof v === "object" ? Number(v.value) : typeof v === "number" ? v : /^\d+$/.test(String(v ?? "")) ? Number(v) : null;
  const word = num === null && v !== null && v !== undefined && typeof v !== "object" ? String(v) : null;
  if (num === null && !word) return null;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {num !== null ? (
        <g>
          <line x1={24} y1={20} x2={w - 16} y2={20} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
          <text x={w - 16} y={h - 18} textAnchor="end" fontSize={T.label} fontWeight={700} fill={GREEN_INK}>{indian(num)}</text>
        </g>
      ) : (
        <text x={w / 2} y={h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(word)}</text>
      )}
    </g>
  );
}

function ColumnBuilder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default ColumnBuilder;
