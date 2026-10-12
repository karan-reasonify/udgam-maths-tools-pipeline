/* ═══ M1.S1.T2.C4.2D1 · borrow_mat · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "borrow_mat";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Borrow Mat";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A ruled mat, and two numbers lined up by their right ends. The greater one on top."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every column settled, and every column that lent is standing one less than it was.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any two numbers, with the bundle tray, the naming labels and the tally as you like.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English above and below stays what the checks read. NCERT class 4 terms: इकाई दहाई सैकड़ा हज़ार लाख /
   એકમ દશક શતક હજાર લાખ, वियोज्य वियोजक अंतर / વિયોજ્ય વિયોજક તફાવત, उधार / ઉછીનું. Digits stay digits: the
   runtime speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Borrow Mat": "उधार चटाई",
    "A ruled mat, and two numbers lined up by their right ends. The greater one on top.": "खानों वाली एक चटाई, और दाईं ओर से मिलाकर रखी दो संख्याएँ। बड़ी संख्या ऊपर।",
    "Every column settled, and every column that lent is standing one less than it was.": "हर खाना हल हुआ, और जिस खाने ने उधार दिया, वह पहले से एक कम है।",
    "Free play. Any two numbers, with the bundle tray, the naming labels and the tally as you like.": "मुक्त खेल। कोई भी दो संख्याएँ, गड्डी की ट्रे, नाम के लेबल और गिनती, जैसे तुम चाहो।",
    "Three names for the three numbers": "तीन संख्याओं के तीन नाम",
    "Point at the number on top. Now the one under it. Now the answer. Name each one.": "ऊपर की संख्या पर उँगली रखो। अब उसके नीचे वाली पर। अब उत्तर पर। हर एक का नाम बताओ।",
    "Which row did the working make?": "कौन सी पंक्ति हल करने से बनी?",
    "Read the rows from the top. Which two were there before any working started?": "पंक्तियाँ ऊपर से पढ़ो। हल शुरू होने से पहले कौन सी दो थीं?",
    "The number on top is the minuend, and the number taken away is the subtrahend. The answer under the rule is the difference.": "ऊपर की संख्या वियोज्य है, और घटाई जाने वाली संख्या वियोजक है। रेखा के नीचे का उत्तर अंतर है।",
    "You learned: minuend on top, subtrahend under it, difference below.": "तुमने सीखा: ऊपर वियोज्य, उसके नीचे वियोजक, सबसे नीचे अंतर।",
    "Name the three numbers in this working. Drag a label onto each row, then press enter.": "इस हल की तीनों संख्याओं के नाम बताओ। हर पंक्ति पर एक लेबल खींचो, फिर एंटर दबाओ।",
    "Label each row": "हर पंक्ति पर लेबल लगाओ",
    "The lowest row is not the number taken away. It is what the working made.": "सबसे नीचे की पंक्ति घटाई गई संख्या नहीं है। वह हल करने से बनी है।",
    "The working is 84,596, take away 31,072. Which number is the subtrahend? Lay its label on its row. Then find the difference.": "यहाँ 84,596 में से 31,072 घटाना है। वियोजक कौन सी संख्या है? उसका लेबल उसकी पंक्ति पर रखो। फिर अंतर निकालो।",
    "Label the subtrahend, then subtract": "वियोजक पर लेबल लगाओ, फिर घटाओ",
    "Which row holds the number being taken away? Work the difference from the ones.": "घटाई जा रही संख्या किस पंक्ति में है? अंतर इकाई से शुरू करके निकालो।",
    "What is the greater number in a subtraction called, and where is it written? Tap its row, then its name.": "घटाने में बड़ी संख्या को क्या कहते हैं, और वह कहाँ लिखी जाती है? उसकी पंक्ति पर टैप करो, फिर उसके नाम पर।",
    "Greater number: tap its row, then its name": "बड़ी संख्या: उसकी पंक्ति, फिर नाम टैप करो",
    "The difference is what you get at the end. What is the number you start with called?": "अंतर तो आखिर में मिलता है। जिस संख्या से शुरू करते हो, उसे क्या कहते हैं?",
    "minuend": "वियोज्य", "subtrahend": "वियोजक", "difference": "अंतर",
    "The smaller number comes off the greater one": "छोटी संख्या बड़ी संख्या में से घटती है",
    "Which one goes on top? Try it the other way and say what goes wrong.": "कौन सी ऊपर आएगी? उल्टा करके देखो और बताओ क्या गड़बड़ होती है।",
    "Can you take more away from a number than the number holds?": "क्या किसी संख्या में से उससे ज़्यादा घटा सकते हो?",
    "Look at the first digit of each card. The card with more in it goes on top.": "हर कार्ड का पहला अंक देखो। जिस कार्ड में ज़्यादा है, वह ऊपर जाता है।",
    "The greater number goes on top and the smaller one under it. That is not a choice you get to make.": "बड़ी संख्या ऊपर और छोटी उसके नीचे जाती है। यह तुम्हारी मर्ज़ी की बात नहीं है।",
    "You learned: the greater number goes on top; the two cannot swap.": "तुमने सीखा: बड़ी संख्या ऊपर जाती है; दोनों की जगह नहीं बदलती।",
    "Two number cards read 34,081 and 52,706. Lay them on the mat and find the difference.": "दो संख्या कार्ड पर 34,081 और 52,706 लिखा है। उन्हें चटाई पर रखो और अंतर निकालो।",
    "Lay the cards, then the difference": "कार्ड रखो, फिर अंतर",
    "In every column the lower digit comes off the upper one, never the other way round.": "हर खाने में नीचे का अंक ऊपर के अंक में से घटता है, कभी उल्टा नहीं।",
    "Two cards read 19,408 and 46,150. Which card belongs on top, and why? Put it there, then press enter.": "दो कार्ड पर 19,408 और 46,150 है। कौन सा कार्ड ऊपर आएगा, और क्यों? उसे वहाँ रखो, फिर एंटर दबाओ।",
    "Which card goes on top?": "कौन सा कार्ड ऊपर जाएगा?",
    "The card read out first is not always the greater one. Which has more ten thousands?": "पहले पढ़ा गया कार्ड हमेशा बड़ा नहीं होता। किसमें ज़्यादा दस हज़ार हैं?",
    "Subtract 23,415 from 87,639.": "87,639 में से 23,415 घटाओ।",
    "Subtract 23,415 from 87,639": "87,639 में से 23,415 घटाओ",
    "Subtract means take away. Which number are you taking something from?": "घटाना यानी कम करना। तुम किस संख्या में से कम कर रहे हो?",
    "A column that cannot pay borrows from its left": "जो खाना नहीं दे पाता, वह बाईं ओर से उधार लेता है",
    "This column cannot pay. Which way do you reach for a ten?": "यह खाना नहीं दे पा रहा। दहाई लेने किस ओर जाओगे?",
    "After a column has lent, is there more in it or less?": "उधार देने के बाद खाने में ज़्यादा बचता है या कम?",
    "Find the column worth ten of this one, and drag a ten out of it.": "वह खाना ढूँढो जो इसके दस के बराबर है, और उसमें से एक दहाई खींचो।",
    "When a column cannot pay, fetch the ten from the column on its left. Strike that column's digit down by one.": "जब कोई खाना नहीं दे पाता, तो उसके बाएँ खाने से दहाई लाओ। उस खाने का अंक काटकर एक कम करो।",
    "You learned: a ten comes from the column on the left, left one less.": "तुमने सीखा: दहाई बाएँ खाने से आती है, जो एक कम रह जाता है।",
    "Subtract 27,648 from 63,215. Which column is the first to lend?": "63,215 में से 27,648 घटाओ। सबसे पहले कौन सा खाना उधार देता है?",
    "Difference?": "अंतर?",
    "A borrowed ten came from somewhere. Did the column that lent go down by one?": "उधार की दहाई कहीं से तो आई। क्या उधार देने वाला खाना एक कम हुआ?",
    "Subtract 38,164 from 55,432. Which column lends to the ones?": "55,432 में से 38,164 घटाओ। इकाई को कौन सा खाना उधार देता है?",
    "Which column is worth ten of the column that cannot pay?": "कौन सा खाना, न दे पाने वाले खाने के दस के बराबर है?",
    "The working is 52,381, take away 27,905. A child filled the hundreds with a ten from the tens, on its right. What is wrong, and what is the difference?": "यहाँ 52,381 में से 27,905 घटाना है। एक बच्चे ने सैकड़े के लिए दाईं ओर की दहाई से दहाई ली। क्या गलत है, और अंतर क्या है?",
    "Difference, fetched the right way?": "सही ओर से लेकर, अंतर?",
    "The tens are worth less than the hundreds. Which column is worth ten hundreds?": "दहाई का मान सैकड़े से कम है। कौन सा खाना दस सैकड़ों के बराबर है?",
    "Work from the ones and go leftwards": "इकाई से शुरू करके बाईं ओर बढ़ो",
    "Start at the ones and go left. Say each column as you finish it.": "इकाई से शुरू करो और बाईं ओर जाओ। हर खाना पूरा होते ही उसका नाम बोलो।",
    "How many of them have an answer under the rule yet?": "इनमें से कितनों का उत्तर रेखा के नीचे लिखा जा चुका है?",
    "Settle the ones first, then one column at a time to the left.": "पहले इकाई हल करो, फिर बाईं ओर एक-एक खाना।",
    "A longer subtraction is the same method with more steps, and it still starts at the ones column.": "लंबा घटाना भी वही तरीका है, बस चरण ज़्यादा हैं, और यह भी इकाई के खाने से शुरू होता है।",
    "You learned: start at the ones and go left, however long the number.": "तुमने सीखा: संख्या कितनी भी लंबी हो, इकाई से शुरू करके बाईं ओर जाओ।",
    "Subtract 1,48,367 from 5,20,543. Then say how many columns had to fetch a ten. Tap the column you work first.": "5,20,543 में से 1,48,367 घटाओ। फिर बताओ कितने खानों को दहाई लानी पड़ी। जो खाना पहले हल करोगे, उस पर टैप करो।",
    "A trade on the right can change a column you already wrote. Where should you start?": "दाईं ओर का उधार, पहले से लिखे खाने को बदल सकता है। तुम्हें कहाँ से शुरू करना चाहिए?",
    "Subtract 2,84,516 from 6,03,240. Which column is worked first? Tap it to start.": "6,03,240 में से 2,84,516 घटाओ। सबसे पहले कौन सा खाना हल होता है? शुरू करने के लिए उस पर टैप करो।",
    "How many columns is the mat ruled for, and which of them can no later trade change?": "चटाई पर कितने खाने बने हैं, और उनमें से किसे बाद का कोई उधार नहीं बदल सकता?",
    "Subtract 1,75,648 from 9,00,000. Keep count of every ten you fetch. Start with a tap on your first column.": "9,00,000 में से 1,75,648 घटाओ। जितनी दहाई लाओ, सबकी गिनती रखो। अपने पहले खाने पर टैप करके शुरू करो।",
    "The zeros have nothing to lend. Where does the first ten really come from?": "शून्य के पास उधार देने को कुछ नहीं है। पहली दहाई असल में कहाँ से आती है?",
    /* the working area's nudges */
    "Put a label on every row first.": "पहले हर पंक्ति पर लेबल लगाओ।",
    "Lay the subtrahend label on its row first.": "पहले वियोजक का लेबल उसकी पंक्ति पर रखो।",
    "Put a card on the top row first.": "पहले ऊपर की पंक्ति पर एक कार्ड रखो।",
    "Tap the row where it is written first.": "पहले उस पंक्ति पर टैप करो जहाँ यह लिखी जाती है।",
    "Tap the column you will work first.": "जो खाना पहले हल करोगे, उस पर टैप करो।",
    "Type the whole difference, then press enter.": "पूरा अंतर लिखो, फिर एंटर दबाओ।",
    "This column cannot pay. Fetch a ten first.": "यह खाना नहीं दे सकता। पहले एक दहाई लाओ।",
    "This column cannot pay, and nothing on its left can lend.": "यह खाना नहीं दे सकता, और बाईं ओर कोई उधार नहीं दे सकता।",
    "A ten comes from the column just to its left.": "दहाई ठीक बाईं ओर वाले खाने से आती है।",
    "A ten only ever comes out of the column on the left.": "दहाई हमेशा बाईं ओर के खाने से ही आती है।",
    "Drag a ten into the column that cannot pay.": "जो खाना नहीं दे सकता, उसमें एक दहाई खींचो।",
    /* the working area's own words */
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़ा", "thousands": "हज़ार", "ten thousands": "दस हज़ार", "lakhs": "लाख",
    "O": "इ", "T": "द", "H": "सै", "Th": "ह", "TTh": "द.ह.", "L": "ला",
    "1st": "पहला", "2nd": "दूसरा", "3rd": "तीसरा", "4th": "चौथा", "5th": "पाँचवाँ", "6th": "छठा",
    "settled": "हल हुए", "trades": "उधार",
    "Swap": "बदलो", "Swap the two cards": "दोनों कार्ड की जगह बदलो",
    "New pair": "नई जोड़ी", "Ones first": "पहले इकाई", "Ones first is on": "पहले इकाई: चालू", "Ones first is off": "पहले इकाई: बंद",
    "Names": "नाम", "Show the names": "नाम दिखाओ", "Hide the names": "नाम छिपाओ",
    "Replay": "फिर देखो", "Replay the trades": "उधार फिर से देखो",
  },
  gu: {
    "Borrow Mat": "ઉછીની ચટાઈ",
    "A ruled mat, and two numbers lined up by their right ends. The greater one on top.": "ખાનાંવાળી એક ચટાઈ, અને જમણી બાજુથી ગોઠવેલી બે સંખ્યાઓ. મોટી સંખ્યા ઉપર.",
    "Every column settled, and every column that lent is standing one less than it was.": "દરેક ખાનું ઉકેલાયું, અને જે ખાનાએ ઉછીનું આપ્યું તે પહેલાં કરતાં એક ઓછું છે.",
    "Free play. Any two numbers, with the bundle tray, the naming labels and the tally as you like.": "મુક્ત રમત. કોઈ પણ બે સંખ્યાઓ, બંડલની ટ્રે, નામનાં લેબલ અને ગણતરી, જેમ તમે ઇચ્છો.",
    "Three names for the three numbers": "ત્રણ સંખ્યાઓનાં ત્રણ નામ",
    "Point at the number on top. Now the one under it. Now the answer. Name each one.": "ઉપરની સંખ્યા પર આંગળી મૂકો. હવે તેની નીચેની પર. હવે જવાબ પર. દરેકનું નામ કહો.",
    "Which row did the working make?": "કઈ હરોળ ગણતરીથી બની?",
    "Read the rows from the top. Which two were there before any working started?": "હરોળો ઉપરથી વાંચો. ગણતરી શરૂ થયા પહેલાં કઈ બે હતી?",
    "The number on top is the minuend, and the number taken away is the subtrahend. The answer under the rule is the difference.": "ઉપરની સંખ્યા વિયોજ્ય છે, અને બાદ થતી સંખ્યા વિયોજક છે. રેખા નીચેનો જવાબ તફાવત છે.",
    "You learned: minuend on top, subtrahend under it, difference below.": "તમે શીખ્યા: ઉપર વિયોજ્ય, તેની નીચે વિયોજક, સૌથી નીચે તફાવત.",
    "Name the three numbers in this working. Drag a label onto each row, then press enter.": "આ ગણતરીની ત્રણેય સંખ્યાઓનાં નામ આપો. દરેક હરોળ પર એક લેબલ ખેંચો, પછી એન્ટર દબાવો.",
    "Label each row": "દરેક હરોળ પર લેબલ મૂકો",
    "The lowest row is not the number taken away. It is what the working made.": "સૌથી નીચેની હરોળ બાદ કરેલી સંખ્યા નથી. તે ગણતરીથી બની છે.",
    "The working is 84,596, take away 31,072. Which number is the subtrahend? Lay its label on its row. Then find the difference.": "અહીં 84,596 માંથી 31,072 બાદ કરવાના છે. વિયોજક કઈ સંખ્યા છે? તેનું લેબલ તેની હરોળ પર મૂકો. પછી તફાવત શોધો.",
    "Label the subtrahend, then subtract": "વિયોજક પર લેબલ મૂકો, પછી બાદ કરો",
    "Which row holds the number being taken away? Work the difference from the ones.": "બાદ થતી સંખ્યા કઈ હરોળમાં છે? તફાવત એકમથી શરૂ કરીને શોધો.",
    "What is the greater number in a subtraction called, and where is it written? Tap its row, then its name.": "બાદબાકીમાં મોટી સંખ્યાને શું કહેવાય, અને તે ક્યાં લખાય છે? તેની હરોળ પર ટૅપ કરો, પછી તેના નામ પર.",
    "Greater number: tap its row, then its name": "મોટી સંખ્યા: તેની હરોળ, પછી નામ ટૅપ કરો",
    "The difference is what you get at the end. What is the number you start with called?": "તફાવત તો છેલ્લે મળે છે. જે સંખ્યાથી શરૂ કરો છો તેને શું કહેવાય?",
    "minuend": "વિયોજ્ય", "subtrahend": "વિયોજક", "difference": "તફાવત",
    "The smaller number comes off the greater one": "નાની સંખ્યા મોટી સંખ્યામાંથી બાદ થાય છે",
    "Which one goes on top? Try it the other way and say what goes wrong.": "કઈ ઉપર આવશે? ઊલટું કરી જુઓ અને કહો શું ખોટું થાય છે.",
    "Can you take more away from a number than the number holds?": "શું કોઈ સંખ્યામાંથી તેના કરતાં વધારે બાદ કરી શકાય?",
    "Look at the first digit of each card. The card with more in it goes on top.": "દરેક કાર્ડનો પહેલો અંક જુઓ. જે કાર્ડમાં વધારે હોય તે ઉપર જાય.",
    "The greater number goes on top and the smaller one under it. That is not a choice you get to make.": "મોટી સંખ્યા ઉપર અને નાની તેની નીચે જાય. એ તમારી પસંદગીની વાત નથી.",
    "You learned: the greater number goes on top; the two cannot swap.": "તમે શીખ્યા: મોટી સંખ્યા ઉપર જાય; બંનેની જગ્યા બદલાય નહીં.",
    "Two number cards read 34,081 and 52,706. Lay them on the mat and find the difference.": "બે સંખ્યા કાર્ડ પર 34,081 અને 52,706 લખ્યું છે. તેમને ચટાઈ પર મૂકો અને તફાવત શોધો.",
    "Lay the cards, then the difference": "કાર્ડ મૂકો, પછી તફાવત",
    "In every column the lower digit comes off the upper one, never the other way round.": "દરેક ખાનામાં નીચેનો અંક ઉપરના અંકમાંથી બાદ થાય, ક્યારેય ઊલટું નહીં.",
    "Two cards read 19,408 and 46,150. Which card belongs on top, and why? Put it there, then press enter.": "બે કાર્ડ પર 19,408 અને 46,150 છે. કયું કાર્ડ ઉપર આવે, અને કેમ? તેને ત્યાં મૂકો, પછી એન્ટર દબાવો.",
    "Which card goes on top?": "કયું કાર્ડ ઉપર જશે?",
    "The card read out first is not always the greater one. Which has more ten thousands?": "પહેલાં વંચાયેલું કાર્ડ હંમેશાં મોટું નથી હોતું. કોનામાં વધારે દસ હજાર છે?",
    "Subtract 23,415 from 87,639.": "87,639 માંથી 23,415 બાદ કરો.",
    "Subtract 23,415 from 87,639": "87,639 માંથી 23,415 બાદ કરો",
    "Subtract means take away. Which number are you taking something from?": "બાદ કરવું એટલે ઓછું કરવું. તમે કઈ સંખ્યામાંથી ઓછું કરો છો?",
    "A column that cannot pay borrows from its left": "જે ખાનું આપી ન શકે તે ડાબી બાજુથી ઉછીનું લે",
    "This column cannot pay. Which way do you reach for a ten?": "આ ખાનું આપી શકતું નથી. દશક લેવા કઈ બાજુ જશો?",
    "After a column has lent, is there more in it or less?": "ઉછીનું આપ્યા પછી ખાનામાં વધારે રહે કે ઓછું?",
    "Find the column worth ten of this one, and drag a ten out of it.": "જે ખાનું આના દસ બરાબર છે તે શોધો, અને તેમાંથી એક દશક ખેંચો.",
    "When a column cannot pay, fetch the ten from the column on its left. Strike that column's digit down by one.": "કોઈ ખાનું આપી ન શકે, ત્યારે તેના ડાબા ખાનામાંથી દશક લાવો. તે ખાનાનો અંક છેકીને એક ઓછો કરો.",
    "You learned: a ten comes from the column on the left, left one less.": "તમે શીખ્યા: દશક ડાબા ખાનામાંથી આવે, જે એક ઓછું રહી જાય.",
    "Subtract 27,648 from 63,215. Which column is the first to lend?": "63,215 માંથી 27,648 બાદ કરો. સૌથી પહેલાં કયું ખાનું ઉછીનું આપે છે?",
    "Difference?": "તફાવત?",
    "A borrowed ten came from somewhere. Did the column that lent go down by one?": "ઉછીનો દશક ક્યાંકથી તો આવ્યો. શું ઉછીનું આપનાર ખાનું એક ઓછું થયું?",
    "Subtract 38,164 from 55,432. Which column lends to the ones?": "55,432 માંથી 38,164 બાદ કરો. એકમને કયું ખાનું ઉછીનું આપે છે?",
    "Which column is worth ten of the column that cannot pay?": "કયું ખાનું, આપી ન શકનાર ખાનાના દસ બરાબર છે?",
    "The working is 52,381, take away 27,905. A child filled the hundreds with a ten from the tens, on its right. What is wrong, and what is the difference?": "અહીં 52,381 માંથી 27,905 બાદ કરવાના છે. એક બાળકે શતક માટે જમણી બાજુના દશકમાંથી દશક લીધો. શું ખોટું છે, અને તફાવત શું છે?",
    "Difference, fetched the right way?": "સાચી બાજુથી લઈને, તફાવત?",
    "The tens are worth less than the hundreds. Which column is worth ten hundreds?": "દશકની કિંમત શતક કરતાં ઓછી છે. કયું ખાનું દસ શતક બરાબર છે?",
    "Work from the ones and go leftwards": "એકમથી શરૂ કરી ડાબી બાજુ જાઓ",
    "Start at the ones and go left. Say each column as you finish it.": "એકમથી શરૂ કરો અને ડાબી બાજુ જાઓ. દરેક ખાનું પૂરું થતાં તેનું નામ બોલો.",
    "How many of them have an answer under the rule yet?": "આમાંથી કેટલાંનો જવાબ રેખા નીચે લખાઈ ગયો છે?",
    "Settle the ones first, then one column at a time to the left.": "પહેલાં એકમ ઉકેલો, પછી ડાબી બાજુ એક પછી એક ખાનું.",
    "A longer subtraction is the same method with more steps, and it still starts at the ones column.": "લાંબી બાદબાકી પણ એ જ રીત છે, ફક્ત પગલાં વધારે છે, અને તે પણ એકમના ખાનાથી શરૂ થાય છે.",
    "You learned: start at the ones and go left, however long the number.": "તમે શીખ્યા: સંખ્યા ગમે તેટલી લાંબી હોય, એકમથી શરૂ કરી ડાબી બાજુ જાઓ.",
    "Subtract 1,48,367 from 5,20,543. Then say how many columns had to fetch a ten. Tap the column you work first.": "5,20,543 માંથી 1,48,367 બાદ કરો. પછી કહો કેટલાં ખાનાંને દશક લાવવો પડ્યો. જે ખાનું પહેલાં ઉકેલો તેના પર ટૅપ કરો.",
    "A trade on the right can change a column you already wrote. Where should you start?": "જમણી બાજુનું ઉછીનું, પહેલેથી લખેલા ખાનાને બદલી શકે. તમારે ક્યાંથી શરૂ કરવું જોઈએ?",
    "Subtract 2,84,516 from 6,03,240. Which column is worked first? Tap it to start.": "6,03,240 માંથી 2,84,516 બાદ કરો. સૌથી પહેલાં કયું ખાનું ઉકેલાય? શરૂ કરવા તેના પર ટૅપ કરો.",
    "How many columns is the mat ruled for, and which of them can no later trade change?": "ચટાઈ પર કેટલાં ખાનાં છે, અને તેમાંથી કોને પછીનું કોઈ ઉછીનું બદલી ન શકે?",
    "Subtract 1,75,648 from 9,00,000. Keep count of every ten you fetch. Start with a tap on your first column.": "9,00,000 માંથી 1,75,648 બાદ કરો. જેટલા દશક લાવો તેની ગણતરી રાખો. તમારા પહેલા ખાના પર ટૅપ કરીને શરૂ કરો.",
    "The zeros have nothing to lend. Where does the first ten really come from?": "શૂન્ય પાસે ઉછીનું આપવા કશું નથી. પહેલો દશક ખરેખર ક્યાંથી આવે છે?",
    /* the working area's nudges */
    "Put a label on every row first.": "પહેલાં દરેક હરોળ પર લેબલ મૂકો.",
    "Lay the subtrahend label on its row first.": "પહેલાં વિયોજકનું લેબલ તેની હરોળ પર મૂકો.",
    "Put a card on the top row first.": "પહેલાં ઉપરની હરોળ પર એક કાર્ડ મૂકો.",
    "Tap the row where it is written first.": "પહેલાં તે હરોળ પર ટૅપ કરો જ્યાં તે લખાય છે.",
    "Tap the column you will work first.": "જે ખાનું પહેલાં ઉકેલશો તેના પર ટૅપ કરો.",
    "Type the whole difference, then press enter.": "આખો તફાવત લખો, પછી એન્ટર દબાવો.",
    "This column cannot pay. Fetch a ten first.": "આ ખાનું આપી શકતું નથી. પહેલાં એક દશક લાવો.",
    "This column cannot pay, and nothing on its left can lend.": "આ ખાનું આપી શકતું નથી, અને ડાબી બાજુ કોઈ ઉછીનું આપી શકે નહીં.",
    "A ten comes from the column just to its left.": "દશક તરત ડાબી બાજુના ખાનામાંથી આવે છે.",
    "A ten only ever comes out of the column on the left.": "દશક હંમેશાં ડાબી બાજુના ખાનામાંથી જ આવે છે.",
    "Drag a ten into the column that cannot pay.": "જે ખાનું આપી શકતું નથી તેમાં એક દશક ખેંચો.",
    /* the working area's own words */
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર", "ten thousands": "દસ હજાર", "lakhs": "લાખ",
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દ.હ.", "L": "લા",
    "1st": "પહેલું", "2nd": "બીજું", "3rd": "ત્રીજું", "4th": "ચોથું", "5th": "પાંચમું", "6th": "છઠ્ઠું",
    "settled": "ઉકેલાયાં", "trades": "ઉછીનાં",
    "Swap": "બદલો", "Swap the two cards": "બંને કાર્ડની જગ્યા બદલો",
    "New pair": "નવી જોડ", "Ones first": "પહેલાં એકમ", "Ones first is on": "પહેલાં એકમ: ચાલુ", "Ones first is off": "પહેલાં એકમ: બંધ",
    "Names": "નામ", "Show the names": "નામ બતાવો", "Hide the names": "નામ છુપાવો",
    "Replay": "ફરી જુઓ", "Replay the trades": "ઉછીનાં ફરી જુઓ",
  },
};
/* a place's name inside a Hindi / Gujarati sentence (the Work's own spoken nudges, built per column) */
const PL_IN: any = { hi: ["इकाई", "दहाई", "सैकड़े", "हज़ार", "दस हज़ार", "लाख"], gu: ["એકમ", "દશક", "શતક", "હજાર", "દસ હજાર", "લાખ"] };

/* ── the borrow mat ──────────────────────────────────────────────────────────────────────
   Columns 128 wide, drawn from the right, so the ones column is always the rightmost. From the top:
   the trade band (a lending column's smaller value in rose, the ten that arrived in vermilion, and a
   short arrow from the lender to the receiver, left to right), the headings, the minuend row (blue),
   the subtrahend row (amber), the rule, the difference row (green). Under it the ledge (labels or
   cards waiting) or the bundle tray: the lit column as loose straws and the column on its left as
   bundles of ten straws; a fetched ten walks across tied and unties, its empty tie left lying. A ten is fetched by dragging it out of a
   minuend card into the column on its right; a tap on a card sends its ten to its right. */

const PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "lakhs"];
const HEADS = ["O", "T", "H", "Th", "TTh", "L"];
const ROWS = ["top", "middle", "bottom"];
const ROW_NAME: Record<string, string> = { top: "minuend", middle: "subtrahend", bottom: "difference" };
const NAME_CHOICES = ["minuend", "subtrahend", "difference"].map((w) => ({ id: w, label: w }));
const BLUE = CONTENT.hundred, AMBER = CONTENT.ten, GREEN = CONTENT.one, VERM = CONTENT.pointer, ROSE = CONTENT.bead, ZERO = "#767676";
const BLUE_INK = shade(BLUE, 0.25), AMBER_INK = shade(AMBER, 0.4), GREEN_INK = shade(GREEN, 0.25), VERM_INK = shade(VERM, 0.25), ROSE_INK = shade(ROSE, 0.25);
const CW = 128, RIGHT = 1040;
const colX = (k: number) => RIGHT - (k + 1) * CW;
const colC = (k: number) => colX(k) + CW / 2;
const GEO = { head: 68, headH: 42, rowA: 112, rowB: 196, rowH: 84, rule: 287, sum: 294, ledge: 392, ledgeH: 134, check: 396,
  cardW: 96, cardH: 72, plateX: 8, plateW: 170, plateH: 60, nameX: 340, lcard: 76, lstep: 88 };
const ROWY: Record<string, number> = { top: GEO.rowA, middle: GEO.rowB, bottom: GEO.sum };
const ORD = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
const NUDGE = {
  name: "Put a label on every row first.",
  plate: "Lay the subtrahend label on its row first.",
  cards: "Put a card on the top row first.",
  row: "Tap the row where it is written first.",
  tap: "Tap the column you will work first.",
  whole: "Type the whole difference, then press enter.",
  fetch: "This column cannot pay. Fetch a ten first.",
  stuck: "This column cannot pay, and nothing on its left can lend.",
  far: "A ten comes from the column just to its left.",
  left: "A ten only ever comes out of the column on the left.",
  drag: "Drag a ten into the column that cannot pay.",
};

/* ── the mat's own arithmetic (the picture's rules; judge and oracle never use these) ── */
const lenOf = (v: number) => String(Math.max(0, Math.trunc(v))).length;
const digAt = (v: number, k: number) => Math.floor(v / Math.pow(10, k)) % 10;
const hasDig = (v: any, k: number) => v !== null && v !== undefined && k < lenOf(v);
const blank = (n: number): any[] => Array.from({ length: n }, () => null);
const falses = (n: number): boolean[] => Array.from({ length: n }, () => false);
const digitsOf = (v: number, n: number) => Array.from({ length: n }, (_, k) => (k < lenOf(v) ? digAt(v, k) : null));
const tDig = (x: any, k: number) => (hasDig(x.top, k) ? digAt(x.top, k) : null);
const bDig = (x: any, k: number) => (hasDig(x.bot, k) ? digAt(x.bot, k) : 0);
const gotTen = (x: any, k: number) => x.seq[k].includes("recv");
const gaveTen = (x: any, k: number) => x.seq[k].includes("lend");
const topCur = (x: any, k: number) => { const t = tDig(x, k); return t === null ? null : t + (gotTen(x, k) ? 10 : 0) - (gaveTen(x, k) ? 1 : 0); };
const canPay = (x: any, k: number) => { const t = topCur(x, k); return t !== null && t >= bDig(x, k); };
const isSettled = (x: any, k: number) => x.diff[k] !== null && !x.bad[k];
const needy = (x: any, k: number) => tDig(x, k) !== null && !gotTen(x, k) && !isSettled(x, k) && !canPay(x, k);
/* a column wants a ten when it cannot pay, or when it holds nothing and the column on its right wants one */
const wants = (x: any, k: number): boolean => needy(x, k) || (k > 0 && tDig(x, k) !== null && !gotTen(x, k) && topCur(x, k) === 0 && wants(x, k - 1));
const workCol = (x: any) => { for (let k = 0; k < x.cols; k++) if (tDig(x, k) !== null && !isSettled(x, k)) return k; return null; };
const ready = (x: any) => x.top !== null && x.bot !== null && ["namediff", "order", "work", "free"].includes(x.kind) && (x.kind !== "namediff" || !!x.plates.subtrahend);
const litOf = (x: any) => (!ready(x) ? null : x.lock ? workCol(x) : x.lit);
const allSettled = (x: any) => { for (let k = 0; k < x.cols; k++) if (tDig(x, k) !== null && !isSettled(x, k)) return false; return true; };
const rowValue = (d: any[]) => d.reduce((s: number, v: any, k: number) => s + (v === null ? 0 : v * Math.pow(10, k)), 0);
/* ones first: only the working column, and the empty columns reaching left from it, may take a ten */
const receivable = (x: any, k: number) => {
  if (!wants(x, k)) return false;
  if (!x.lock) return true;
  const w = workCol(x);
  if (w === null || k < w) return false;
  for (let j = w; j < k; j++) if (!wants(x, j)) return false;
  return true;
};
const tradeOn = (x: any, from: number, to: number) => ({ ...x, focus: to,
  seq: x.seq.map((s: string[], k: number) => (k === from ? [...s, "lend"] : k === to ? [...s, "recv"] : s)),
  trades: [...x.trades, { from, to }] });
const lastOf = (a: string[]) => (a.length ? a[a.length - 1] : null);
/* a ten can go back to the column that lent it while neither column has been settled since */
const canUndo = (x: any, k: number) => k + 1 < x.cols && lastOf(x.seq[k]) === "recv" && lastOf(x.seq[k + 1]) === "lend"
  && x.diff[k] === null && x.diff[k + 1] === null && x.trades.some((t: any) => t.from === k + 1 && t.to === k);
const undoOn = (x: any, k: number) => {
  let i = -1;
  x.trades.forEach((t: any, j: number) => { if (t.from === k + 1 && t.to === k) i = j; });
  return { ...x, focus: k, trades: x.trades.filter((_: any, j: number) => j !== i),
    seq: x.seq.map((s: string[], j: number) => (j === k || j === k + 1 ? s.slice(0, -1) : s)) };
};
const writeOn = (x: any, k: number, d: number, own: boolean, bad = false) => {
  const diff = x.diff.slice(), o = x.own.slice(), b = x.bad.slice();
  diff[k] = d; o[k] = own; b[k] = bad;
  return { ...x, diff, own: o, bad: b, focus: k, lit: x.lock || bad ? (bad ? k : x.lit) : null, done: own && !bad ? [...x.done, k] : x.done };
};
const checkOn = (x: any, k: number, d: number) => { const c = (x.check || blank(x.cols)).slice(); c[k] = d; return { ...x, check: c, order: x.order + 1 }; };
const cleared = (x: any) => ({ ...x, seq: x.seq.map(() => []), trades: [], diff: blank(x.cols), own: falses(x.cols), bad: falses(x.cols),
  check: null, order: 0, lit: null, focus: null, done: [] });
/* the two cards laid on the mat, `topId` on top ("a" is always the greater) */
const layOn = (x: any, topId: string) => {
  const botId = topId === "a" ? "b" : "a";
  return { ...cleared(x), shelf: { [topId]: "top", [botId]: "middle" }, top: x[topId], bot: x[botId] };
};
/* the trades that bring a ten into column c: from the nearest column on its left that has something, through the empty ones */
const chainFor = (x0: any, c: number) => {
  let k = c + 1;
  while (k < x0.cols && tDig(x0, k) !== null && topCur(x0, k) === 0) k++;
  if (k >= x0.cols || tDig(x0, k) === null) return null;
  const out: any[] = [];
  let x = x0;
  for (let j = k; j > c; j--) { x = tradeOn(x, j, j - 1); out.push({ t: "trade", c: j - 1, snap: x }); }
  return out;
};
/* the mat works on from where it stands, ones first: each step is a snapshot to show */
const planFinish = (x0: any, into: string) => {
  let x = into === "check" ? { ...x0, check: blank(x0.cols), order: 0 } : x0;
  const acts: any[] = [];
  for (let c = 0; c < x.cols; c++) {
    if (tDig(x, c) === null) continue;
    acts.push({ t: "lit", c, snap: x });
    if (!gotTen(x, c) && !canPay(x, c)) {
      const ch = chainFor(x, c);
      if (!ch) { acts.push({ t: "stuck", c, snap: x }); return acts; }
      ch.forEach((a: any) => acts.push(a));
      x = ch[ch.length - 1].snap;
    }
    const d = (topCur(x, c) as number) - bDig(x, c);
    if (into === "check") { x = checkOn(x, c, d); acts.push({ t: "write", c, snap: x }); }
    else if (x.diff[c] !== d || x.bad[c]) { x = writeOn(x, c, d, false); acts.push({ t: "write", c, snap: x }); }
  }
  return acts;
};

/* free play: any pair of five-digit and smaller numbers with two to four trades in it */
const dealFree = () => {
  const rnd = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
  for (let n = 0; n < 80; n++) {
    const a = rnd(20000, 99999), b = rnd(1000, a - 1);
    let fetched = 0, lend = 0;
    for (let k = 0; k < 5; k++) { const t = digAt(a, k) - lend, bo = k < lenOf(b) ? digAt(b, k) : 0; lend = t < bo ? 1 : 0; fetched += lend; }
    if (fetched >= 2 && fetched <= 4) return { kind: "free", a, b, cols: 5, free: false };
  }
  return { kind: "free", a: 52706, b: 34081, cols: 5, free: false };
};

/* One entry per phase = one mount.
   items   kind  name: lay the three labels on a finished working, then Enter
                 namediff: lay the subtrahend label, then work the difference (column by column or whole)
                 where: tap the row, then its name on the word pad
                 order: put the greater card on top (the other drops under it), then subtract
                 top: put the card that goes on top up, then Enter
                 work: subtract on the mat; free: true = no ones-first lock (the child picks the order) */
const PHASES = [
  {
    n: 1,
    concept: "Three names for the three numbers",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O2"],
    says: ["Point at the number on top. Now the one under it. Now the answer. Name each one."],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: which of these rows was on the page before any working was done? Second rung, the phase's: which row did the working make? Third rung: the mat is cut to two columns with a finished subtraction on it and the child lays the three plates on those three rows. The word pad stays open behind all three rungs. */
    ladder: ["Which row did the working make?",
      "Read the rows from the top. Which two were there before any working started?"],
    closing: "The number on top is the minuend, and the number taken away is the subtrahend. The answer under the rule is the difference.",
    learned: "You learned: minuend on top, subtrahend under it, difference below.",
    traceback: "The rule is drawn heavier and the two rows above it lift together; a label that names the wrong row is ringed in amber with its row and stays where the child put it, and the three names are written beside their rows from the top. For a difference, the mat works it from the ones.",
    items: [
      /* learn ML1: answer in the plan = The minuend is 68,473, the subtrahend is 25,140, and the difference is 43,333.
         The finished working stands on the mat; the answer is the three labels read from the top */
      { qid: "M1.S1.T2.C4:ML1", kind: "name", a: 68473, b: 25140, pad: "enter", winMs: 1800, ask: "Label each row",
        say: "Name the three numbers in this working. Drag a label onto each row, then press enter.",
        answer: "minuend, subtrahend, difference", miss: "The lowest row is not the number taken away. It is what the working made." },
      /* practice 1: answer in the plan = 31,072 is the subtrahend and the difference is 53,524
         (the label on the row under the top one, then the difference) */
      { qid: "M1.S1.T2.C4:1", kind: "namediff", a: 84596, b: 31072, winMs: 2800, ask: "Label the subtrahend, then subtract",
        say: "The working is 84,596, take away 31,072. Which number is the subtrahend? Lay its label on its row. Then find the difference.",
        answer: 53524, miss: "Which row holds the number being taken away? Work the difference from the ones." },
      /* practice 2: answer in the plan = It is the minuend, and it is written on top (the top row, then its name) */
      { qid: "M1.S1.T2.C4:2", kind: "where", choices: NAME_CHOICES, winMs: 1600, ask: "Greater number: tap its row, then its name",
        say: "What is the greater number in a subtraction called, and where is it written? Tap its row, then its name.",
        answer: "minuend", miss: "The difference is what you get at the end. What is the number you start with called?" },
    ],
  },
  {
    n: 2,
    concept: "The smaller number comes off the greater one",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O2"],
    says: ["Which one goes on top? Try it the other way and say what goes wrong."],
    /* tries, as the plan writes it: First rung, from the item: which of the two numbers has more in it? Second rung, the phase's: can you take more away from a number than the number holds? Third rung: the mat is cut to two columns with two small strips on the ledge and the child chooses which one goes up. The number pad stays open. */
    ladder: ["Can you take more away from a number than the number holds?",
      "Look at the first digit of each card. The card with more in it goes on top."],
    closing: "The greater number goes on top and the smaller one under it. That is not a choice you get to make.",
    learned: "You learned: the greater number goes on top; the two cannot swap.",
    traceback: "The pair is worked exactly as the child laid it, from the ones, until the leftmost column cannot pay and nothing on its left can lend; then the cards swap, the greater on top, and the mat works it through to the difference. Columns where the child's number parts from it are ringed in amber.",
    items: [
      /* learn ML2: answer in the plan = 52,706 goes on top, and the difference is 18,625 */
      { qid: "M1.S1.T2.C5:ML2", kind: "order", a: 52706, b: 34081, winMs: 3000, ask: "Lay the cards, then the difference",
        say: "Two number cards read 34,081 and 52,706. Lay them on the mat and find the difference.",
        answer: 18625, miss: "In every column the lower digit comes off the upper one, never the other way round." },
      /* practice 3: answer in the plan = 46,150, because the smaller number is taken from the greater one and the two cannot be
         swapped (the card put on top; the win shows the swapped attempt running out of things to take) */
      { qid: "M1.S1.T2.C5:3", kind: "top", a: 46150, b: 19408, pad: "enter", winMs: 4200, ask: "Which card goes on top?",
        say: "Two cards read 19,408 and 46,150. Which card belongs on top, and why? Put it there, then press enter.",
        answer: 46150, miss: "The card read out first is not always the greater one. Which has more ten thousands?" },
      /* practice 4: answer in the plan = 64,224 */
      { qid: "M1.S1.T2.C5:4", kind: "order", a: 87639, b: 23415, winMs: 3000, ask: "Subtract 23,415 from 87,639",
        say: "Subtract 23,415 from 87,639.", answer: 64224, miss: "Subtract means take away. Which number are you taking something from?" },
    ],
  },
  {
    n: 3,
    concept: "A column that cannot pay borrows from its left",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["This column cannot pay. Which way do you reach for a ten?"],
    /* tries, as the plan writes it: First rung, from the item: which column is worth ten of the column that cannot pay? Second rung, the phase's: after a column has lent, is there more in it or less? Third rung: the mat is cut to two columns with one trade in it and the bundle tray opens itself, and the child unties the bundle before the reach is made. The number pad stays open. */
    ladder: ["After a column has lent, is there more in it or less?",
      "Find the column worth ten of this one, and drag a ten out of it."],
    closing: "When a column cannot pay, fetch the ten from the column on its left. Strike that column's digit down by one.",
    learned: "You learned: a ten comes from the column on the left, left one less.",
    traceback: "A reach to the right springs back and stays as a faint line; the column on the left lights, is struck one less, and its ten lands over the column that could not pay with an arrow left to right. A column written wrong: its things in the tray, the ones taken away struck in ink, and its answer boxed. A whole difference: the mat works it from the ones.",
    items: [
      /* learn ML3: answer in the plan = 35,567, and the tens column is the first to lend (the first reach the mat lets through) */
      { qid: "M1.S1.T2.C6:ML3", kind: "work", a: 63215, b: 27648, firstLend: 1, winMs: 2800, ask: "Difference?",
        say: "Subtract 27,648 from 63,215. Which column is the first to lend?", answer: 35567,
        miss: "A borrowed ten came from somewhere. Did the column that lent go down by one?" },
      /* practice 5: answer in the plan = 17,268, and the tens column lends to the ones */
      { qid: "M1.S1.T2.C6:5", kind: "work", a: 55432, b: 38164, firstLend: 1, winMs: 2800, ask: "Difference?",
        say: "Subtract 38,164 from 55,432. Which column lends to the ones?", answer: 17268,
        miss: "Which column is worth ten of the column that cannot pay?" },
      /* practice 6: answer in the plan = A ten is fetched from the column on the left, not the right, so the thousands column
         lends and is left one less. The difference is 24,476 (the other child's reach stands as a faint line) */
      { qid: "M1.S1.T2.C6:6", kind: "work", a: 52381, b: 27905, ghost: { from: 1, to: 2 }, winMs: 2800, ask: "Difference, fetched the right way?",
        say: "The working is 52,381, take away 27,905. A child filled the hundreds with a ten from the tens, on its right. What is wrong, and what is the difference?",
        answer: 24476, miss: "The tens are worth less than the hundreds. Which column is worth ten hundreds?" },
    ],
  },
  {
    n: 4,
    concept: "Work from the ones and go leftwards",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O1"],
    says: ["Start at the ones and go left. Say each column as you finish it."],
    /* tries, as the plan writes it: First rung, from the item: how many columns is the mat ruled for? Second rung, the phase's: how many of them have an answer under the rule yet? Third rung: the mat is cut back to four columns, the child works it through, and then two columns are opened at the left and the same working is done again. The number pad stays open. */
    ladder: ["How many of them have an answer under the rule yet?",
      "Settle the ones first, then one column at a time to the left."],
    closing: "A longer subtraction is the same method with more steps, and it still starts at the ones column.",
    learned: "You learned: start at the ones and go left, however long the number.",
    traceback: "The child's answers stay under the rule; the ones-first order locks itself and the mat works the same pair again from the right, one column lit at a time, writing its own run under the child's with the order numbered; columns where a later trade changed a digit already used are ringed in amber.",
    items: [
      /* learn ML4: answer in the plan = 3,72,176, and four columns had to fetch a ten (the trade tally counts them) */
      { qid: "M1.S1.T2.C7:ML4", kind: "work", free: true, a: 520543, b: 148367, fetches: 4, winMs: 3400, ask: "Difference?",
        say: "Subtract 1,48,367 from 5,20,543. Then say how many columns had to fetch a ten. Tap the column you work first.",
        answer: 372176, miss: "A trade on the right can change a column you already wrote. Where should you start?" },
      /* practice 7: answer in the plan = 3,18,724, and the ones column is worked first (the child taps it) */
      { qid: "M1.S1.T2.C7:7", kind: "work", free: true, a: 603240, b: 284516, winMs: 3400, ask: "Difference?",
        say: "Subtract 2,84,516 from 6,03,240. Which column is worked first? Tap it to start.",
        answer: 318724, miss: "How many columns is the mat ruled for, and which of them can no later trade change?" },
      /* practice 8: answer in the plan = 7,24,352, and five columns had to fetch a ten */
      { qid: "M1.S1.T2.C7:8", kind: "work", free: true, a: 900000, b: 175648, fetches: 5, winMs: 3400, ask: "Difference?",
        say: "Subtract 1,75,648 from 9,00,000. Keep count of every ten you fetch. Start with a tap on your first column.",
        answer: 724352, miss: "The zeros have nothing to lend. Where does the first ten really come from?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  columnWidth: CW, places: PLACES, headings: HEADS, rows: ["minuend", "subtrahend", "difference"], matColumns: [5, 5, 5, 6],
  onesFirstLocked: [true, true, true, false],
  colours: { minuend: "blue", subtrahend: "amber", difference: "green", tenFetched: "vermilion", rewritten: "rose", placeHoldingZero: "grey" },
  trade: "drag a ten out of the minuend card on the left into the column that cannot pay (a tap sends a card's ten to its right); the lender is struck once and its smaller value written above it in rose, the ten lands over the receiver in vermilion with an arrow left to right; a reach to the right is refused",
  tally: "columns settled of the columns ruled, and the trades made",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: working-area answers arrive as { sub, value } (the row the subtrahend label is on, the
   difference), { row, name } (the row tapped, the word), { column } (one column written wrong: a
   miss) or { reach } (a ten fetched from the right: a miss); numbers compare as numbers */
const namesOf = (v: any) => String(v ?? "").toLowerCase().split(/[^a-z]+/).filter(Boolean).join(",");
const judge = (item: any, v: any) => {
  if (v && typeof v === "object") {
    if (v.column || v.reach) return false;
    if (item.kind === "namediff") return v.sub === "middle" && Number(v.value) === item.answer;
    if (item.kind === "where") return v.row === "top" && String(v.name) === item.answer;
    if ("value" in v && typeof item.answer === "number") return Number(v.value) === item.answer;
    return false;
  }
  if (item.kind === "name") return namesOf(v) === namesOf(item.answer);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v ?? "").trim().toLowerCase() === String(item.answer).toLowerCase();
};

/* oracle: every answer re-derived by a second route that shares no code with judge or Work: the
   chapter's own check, adding the difference back onto the subtrahend digit by digit, whose carries
   are exactly the columns that had to fetch a ten */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "name") return it.answer === ["minuend", "subtrahend", "difference"].join(", ");
  if (it.kind === "where") return it.answer === "minuend" && it.choices.filter((c: any) => c.id === it.answer).length === 1;
  const A = String(it.a), B = String(it.b);
  if (it.kind === "top") return A.length === B.length && A > B && it.answer === it.a;
  const D = String(it.answer).split("").reverse().map(Number), Bd = B.split("").reverse().map(Number);
  const out: number[] = [], carries: number[] = [];
  let carry = 0;
  for (let k = 0; k < Math.max(D.length, Bd.length); k++) {
    const s = (D[k] || 0) + (Bd[k] || 0) + carry;
    out.push(s % 10); carry = s >= 10 ? 1 : 0; carries.push(carry);
  }
  if (carry) out.push(carry);
  if (Number(out.reverse().join("")) !== it.a) return false;
  if (it.fetches !== undefined && carries.filter(Boolean).length !== it.fetches) return false;
  if (it.firstLend !== undefined && carries.indexOf(1) + 1 !== it.firstLend) return false;
  return true;
}));

/* the most likely wrong answer (the misconception); judge must reject it */
const smallFromGreat = (a: number, b: number) => {           /* every column pays: the smaller digit off the greater */
  let v = 0;
  for (let k = 0; k < lenOf(a); k++) v += Math.abs(digAt(a, k) - (k < lenOf(b) ? digAt(b, k) : 0)) * Math.pow(10, k);
  return v;
};
const noStrike = (a: number, b: number) => {                  /* a ten borrowed in every column that needs one, nothing struck */
  let v = 0;
  for (let k = 0; k < lenOf(a); k++) v += ((digAt(a, k) - (k < lenOf(b) ? digAt(b, k) : 0) + 10) % 10) * Math.pow(10, k);
  return v;
};
const leftFirst = (a: number, b: number) => {                 /* worked from the left: a digit already written is never changed */
  const n = lenOf(a), t = Array.from({ length: n }, (_, k) => digAt(a, k)), out: number[] = [];
  for (let k = n - 1; k >= 0; k--) {
    const bo = k < lenOf(b) ? digAt(b, k) : 0;
    if (t[k] < bo) {
      let j = k + 1;
      while (j < n && t[j] === 0) j++;
      if (j < n) { t[j] -= 1; for (let q = j - 1; q > k; q--) t[q] = 9; }
      t[k] += 10;
    }
    out[k] = t[k] - bo;
  }
  return out.reduce((s, d, k) => s + d * Math.pow(10, k), 0);
};
const nearMiss = (item: any) => {
  const k = item.kind;
  if (k === "name") return "minuend, difference, subtrahend";   /* the answer called the subtrahend: it is the lowest row */
  if (k === "where") return "difference";                       /* the number on top called the difference */
  if (k === "namediff") return item.b;                           /* the subtrahend given as the difference */
  if (k === "top") return item.b;                                /* the card read out first put on top */
  if (k === "order") { const s = smallFromGreat(item.a, item.b); return s !== item.answer ? s : item.a + item.b; }
  if (item.ghost) return item.answer + Math.pow(10, item.ghost.to + 1);   /* the ten taken from the right: the left column never paid */
  if (item.free) return leftFirst(item.a, item.b);
  return noStrike(item.a, item.b);                                /* a bigger digit written, nothing struck */
};
/* the forms of an answer that no question, hint or ladder line may print. The card item's two
   numbers are the question itself; its answer is which of them goes on top */
const answerForms = (item: any) => (item.kind === "top" ? []
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => (item.kind === "namediff" ? { sub: "middle", value: item.answer } : item.answer);
/* the slot: a number with Indian commas; three labels read from the top show the one under the rule */
const format = (s: any) => {
  const t = String(s ?? "");
  if (/^\d{4,}$/.test(t)) return indian(Number(t));
  if (/,/.test(t) && /[a-z]/i.test(t)) return t.split(",").pop()!.trim();
  return t;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  const k = item.kind, soon = (fn: () => void) => setTimeout(fn, 80);
  if (k === "name" || k === "top") { HOOK.set(item.answer); soon(() => HOOK.enter()); return; }
  if (k === "namediff") { HOOK.plate("middle"); soon(() => HOOK.enter(String(item.answer))); return; }
  if (k === "where") { HOOK.row("top"); soon(() => HOOK.enter(item.answer)); return; }
  if (k === "order") HOOK.place();
  soon(() => HOOK.enter(String(item.answer)));
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => {
  const k = item.kind;
  if (k === "name" || k === "top") return HOOK.set ? HOOK.set(v) : false;
  if (k === "namediff") {
    if (!HOOK.plate) return false;
    const o = v && typeof v === "object" ? v : { sub: "middle", value: v };
    HOOK.plate(o.sub || "middle"); HOOK.type(String(o.value ?? "").replace(/[^0-9]/g, "").slice(0, 9));
    return true;
  }
  if (k === "where" && HOOK.row) HOOK.row(v && typeof v === "object" ? v.row : "top");
  if (k === "order" && HOOK.place) HOOK.place();
  return undefined;
};
/* the agent's check() before Enter: nothing waits on this mat; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

const BM_CSS = `
.bm-move{transition:transform 460ms cubic-bezier(.3,.7,.25,1)}
.bm-lift{transition:transform 320ms ease}
.bm-walk{transition:transform 900ms cubic-bezier(.4,.1,.3,1)}
.bm-grab{cursor:grab}
.bm-in{animation:bmIn 360ms ease-out both}
@keyframes bmIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.bm-move,.bm-lift,.bm-walk{transition:none}.bm-in{animation:none}}
`;

/* the tray's things: a straw is one thing of a column; a bundle is ten straws under one tie, one thing
   of the column on its left. Blue: the minuend's own; vermilion: the ten that was fetched */
const STRAW = { w: 7, h: 66, step: 16, bstep: 46 };
function Straw({ x, y, fetched }: any) {
  return <rect x={x - STRAW.w / 2} y={y} width={STRAW.w} height={STRAW.h} rx={3.5} fill={fetched ? "url(#gPointer)" : "url(#gHundred)"}
    stroke={fetched ? VERM_INK : BLUE_INK} strokeWidth={1.2} />;
}
function StrawBundle({ x, y, fetched }: any) {
  const ink = fetched ? VERM_INK : BLUE_INK;
  return (
    <g>
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={x - 20 + i * 3.6} y={y} width={6.5} height={STRAW.h} rx={3} fill={fetched ? "url(#gPointer)" : "url(#gHundred)"} stroke={ink} strokeWidth={0.8} />
      ))}
      <rect x={x - 23} y={y + STRAW.h / 2 - 5} width={46} height={10} rx={5} fill={ink} />
    </g>
  );
}
/* an empty tie, lying where its bundle was untied */
const EmptyTie = ({ x, y }: any) => <ellipse cx={x} cy={y} rx={19} ry={7} fill="none" stroke={VERM_INK} strokeWidth={4} />;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [m, setM] = useState<any>(() => matOfItem(item || {}));
  const mRef = useRef<any>(m);
  const put = (x: any) => { mRef.current = x; setM(x); };
  const upd = (f: (x: any) => any) => put(f(mRef.current));
  const [heavy, setHeavy] = useState(false);
  const [lift, setLift] = useState(false);
  const [ringRows, setRingRows] = useState<string[]>([]);
  const [ringPlates, setRingPlates] = useState<string[]>([]);
  const [ghost, setGhost] = useState(0);            /* names written beside the rows, from the top */
  const [refused, setRefused] = useState<any>(null); /* a reach to the right, left as a faint line */
  const [stuck, setStuck] = useState<number | null>(null);
  const [amber, setAmber] = useState<number[]>([]);  /* difference squares ringed */
  const [fix, setFix] = useState<any>(null);         /* one column put right in the tray */
  const [hl, setHl] = useState<number[]>([]);        /* headings lit */
  const [move, setMove] = useState<any>(null);        /* a bundle walking in the tray: { to, stage, back } */
  const [runLit, setRunLit] = useState<number | null>(null);
  const [replay, setReplay] = useState<number | null>(null);
  const [names, setNames] = useState(false);
  const [touched, setTouched] = useState(false);
  const setupFor = useRef(index);
  const moveT = useRef<any[]>([]);

  const clearVis = () => {
    setHeavy(false); setLift(false); setRingRows([]); setRingPlates([]); setGhost(0); setRefused(null); setStuck(null);
    setAmber([]); setFix(null); setHl([]); setRunLit(null); setReplay(null); clearMove();
  };
  const reset = (it: any) => { tl.stop(); put(matOfItem(it)); clearVis(); setTouched(false); api.lock(false); };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);
  /* free play (the plan's freePlay): any two numbers; tap a square under the rule to settle its
     column, drag tens, ones first on or off, the names, the tally and a replay of the trades */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset(dealFree()); setNames(false);
  }, [free]);
  useEffect(() => () => moveT.current.forEach(clearTimeout), []);

  const busy = tl.busy;
  const fresh = free || setupFor.current === index;
  const asking = stage === "ask" && !busy && fresh;
  const live = asking || (free && !busy);
  const kind = m.kind, cols = m.cols;
  const workKind = ["namediff", "order", "work", "free"].includes(kind);
  const dx = kind === "order" || kind === "top" || kind === "work" ? -72 : 0;   /* the mat sits a little left when no labels need the room */

  function clearMove() { moveT.current.forEach(clearTimeout); moveT.current = []; setMove(null); }
  const after = (ms: number, fn: () => void) => { moveT.current.push(setTimeout(fn, ms)); };
  /* the ten crossing into column c: a tied bundle walks over from the column on the left, stands, then
     unties into ten loose straws beside its empty tie (quick: it lands tied and unties, for a win) */
  const walkTen = (c: number, quick = false) => {
    clearMove();
    if (reducedMotion()) return;
    if (quick) { setMove({ to: c, stage: 2 }); after(420, () => setMove(null)); return; }
    setMove({ to: c, stage: 0 });
    after(40, () => setMove({ to: c, stage: 1 }));
    after(1700, () => setMove(null));
  };
  /* and backwards: the straws tie up again and the bundle walks home */
  const walkBack = (c: number) => {
    clearMove();
    if (reducedMotion()) return;
    setMove({ to: c, stage: 2, back: true });
    after(500, () => setMove({ to: c, stage: 0, back: true }));
    after(1450, () => setMove(null));
  };
  const say = (line: any) => api.say(line);
  /* the per-column nudges, in each language (a Spoken value: the runtime reads the one in use) */
  const canPayOwn = (k: number) => ({ en: `The ${PLACES[k]} can pay on their own.`,
    hi: `${PL_IN.hi[k]} का खाना खुद दे सकता है।`, gu: `${PL_IN.gu[k]}નું ખાનું જાતે આપી શકે છે.` });
  const settleFirst = (k: number) => ({ en: `Settle the ${PLACES[k]} first.`,
    hi: `पहले ${PL_IN.hi[k]} का खाना हल करो।`, gu: `પહેલાં ${PL_IN.gu[k]}નું ખાનું ઉકેલો.` });

  /* ── moves ── */
  const cardsLive = asking && (kind === "order" || kind === "top") && !!m.shelf && (m.shelf.a === "ledge" || m.shelf.b === "ledge");
  const dropCard = (id: string, p: any) => {
    const x = mRef.current;
    if (!cardsLive || x.shelf[id] !== "ledge") return;
    const row = !p ? "top" : p.y < GEO.rowB ? "top" : p.y < GEO.ledge - 8 ? "middle" : "ledge";
    if (row === "ledge") return;
    setTouched(true);
    put(layOn(x, row === "top" ? id : id === "a" ? "b" : "a")); api.sfx.tick();
  };
  const swapCards = () => {
    const x = mRef.current;
    if (!asking || x.top === null) return;
    setTouched(true); setStuck(null); setAmber([]); setFix(null); setHl([]);
    put(layOn(x, x.top === x.a ? "b" : "a")); api.sfx.tick();
  };

  const platesLive = asking && (kind === "name" || kind === "namediff");
  const dropPlate = (id: string, p: any) => {
    if (!platesLive) return;
    setTouched(true);
    const cur = mRef.current.plates, from = cur[id];
    let to: string | null = null;
    if (!p) to = from ? null : ROWS.find((r) => !Object.keys(cur).some((q) => cur[q] === r)) || null;
    else if (p.x < RIGHT + 20 && p.y >= GEO.rowA - 12 && p.y <= GEO.sum + GEO.rowH + 12) to = p.y < GEO.rowB ? "top" : p.y < GEO.rule - 2 ? "middle" : "bottom";
    const next = { ...cur };
    const other = to ? Object.keys(cur).find((q) => q !== id && cur[q] === to) : null;
    if (other) next[other] = from;
    next[id] = to;
    upd((x) => ({ ...x, plates: next })); api.sfx.tick();
  };

  const pickRow = (r: string) => { if (!asking || kind !== "where") return; setTouched(true); upd((x) => ({ ...x, pick: r })); api.sfx.tick(); };

  /* a ten out of column s, let go over column d (a tap: to the column on its right) */
  const reach = (s: number, d: number | null) => {
    const x = mRef.current;
    if (!live || !ready(x) || tDig(x, s) === null) return;
    setTouched(true);
    if (d === null || d === s || d < 0 || d >= x.cols || tDig(x, d) === null) return;
    if (d === s - 1) {
      const w = workCol(x);
      if (!wants(x, d)) { say(canPayOwn(d)); return; }
      if (!receivable(x, d)) { say(settleFirst(w === null ? 0 : w)); return; }
      if ((topCur(x, s) as number) < 1) {
        say({ en: `The ${PLACES[s]} have nothing to lend yet. They fetch a ten first.`,
          hi: `${PL_IN.hi[s]} के खाने में अभी उधार देने को कुछ नहीं। पहले वह एक दहाई लाए।`,
          gu: `${PL_IN.gu[s]}ના ખાનામાં હજી ઉછીનું આપવા કશું નથી. પહેલાં તે એક દશક લાવે.` });
        setHl([s]); return;
      }
      put(tradeOn(x, s, d)); api.sfx.tick(); setHl([]); walkTen(d);
      return;
    }
    if (d === s + 1 && wants(x, d)) {
      if (free) { say(NUDGE.left); return; }
      const w = workCol(x);
      if (!receivable(x, d)) { say(settleFirst(w === null ? 0 : w)); return; }
      api.submit({ reach: "right", from: s, to: d });   /* the ten fetched from the right: a miss, never a trade */
      return;
    }
    if (wants(x, d)) say(NUDGE.far);
  };
  /* a tap (or Enter) on a card sends its ten to the column on its right */
  const tapTen = (s: number) => {
    const x = mRef.current;
    if (!live || !ready(x)) return;
    if (s > 0 && wants(x, s - 1)) { reach(s, s - 1); return; }
    setTouched(true);
    if (wants(x, s)) say({ en: `The ${PLACES[s]} need a ten. Drag one in.`,
      hi: `${PL_IN.hi[s]} के खाने को एक दहाई चाहिए। एक खींचकर लाओ।`, gu: `${PL_IN.gu[s]}ના ખાનાને એક દશક જોઈએ. એક ખેંચી લાવો.` });
    else if (s > 0 && tDig(x, s - 1) !== null) say(canPayOwn(s - 1));
    else say(NUDGE.drag);
  };
  const colAt = (p: any) => {
    if (!p || p.y < -20 || p.y > GEO.sum + GEO.rowH + 10) return null;
    const k = Math.floor((RIGHT + dx - p.x) / CW);
    return k >= 0 && k < mRef.current.cols ? k : null;
  };

  /* the ten dragged back out of the column that took it: the trade runs backwards (never a try) */
  const unTrade = (k: number) => {
    const x = mRef.current;
    if (!live || !canUndo(x, k)) return;
    setTouched(true);
    put(undoOn(x, k)); api.sfx.tick(); setHl([]); walkBack(k);
  };
  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (payload.ten !== undefined) { if (moved) reach(payload.ten, colAt(p)); else tapTen(payload.ten); }
    else if (payload.back !== undefined) { if (!moved || colAt(p) !== payload.back) unTrade(payload.back); }
    else if (payload.card) dropCard(payload.card, moved ? p : null);
    else if (payload.plate) dropPlate(payload.plate, moved ? p : null);
  });

  /* a column's square under the rule: free order lights it; ones first names the column that must settle before it */
  const tapCol = (c: number) => {
    const x = mRef.current;
    if (!live || !ready(x) || tDig(x, c) === null) return;
    setTouched(true);
    const w = workCol(x);
    if (x.lock && w !== null && c !== w && !isSettled(x, c)) { say(settleFirst(w)); return; }
    if (free) {
      if (isSettled(x, c) || (x.lock && c !== w)) return;
      if (!canPay(x, c)) { upd((y) => ({ ...y, lit: c, focus: c })); setHl([c]); say(NUDGE.fetch); return; }
      put(writeOn(x, c, (topCur(x, c) as number) - bDig(x, c), true)); setHl([]); api.sfx.tick();
      return;
    }
    if (x.lock) return;
    upd((y) => ({ ...y, lit: c, focus: c })); api.sfx.tick();
  };

  /* ── Enter (and the agent's check) ── */
  const finish = (x: any) => {
    const v = rowValue(x.diff);
    api.setTyped(String(v));
    if (kind === "namediff") api.submit({ sub: x.plates.subtrahend, value: v }); else api.submit(v);
  };
  const typeIn = (s: string) => {
    const x = mRef.current;
    if (s === "") {
      if (ready(x) && allSettled(x) && x.own.every((o: boolean, k: number) => o || tDig(x, k) === null)) finish(x);
      return;
    }
    if (!/^\d+$/.test(s)) return;
    if (kind === "namediff" && !x.plates.subtrahend) { if (s.length === 1) api.setTyped(""); say(NUDGE.plate); return; }
    if (s.length > 1) {                                   /* the whole difference typed at once */
      if (kind === "namediff") api.submit({ sub: x.plates.subtrahend, value: Number(s) }); else api.submit(Number(s));
      return;
    }
    if (!ready(x)) { api.setTyped(""); say(kind === "order" ? NUDGE.cards : NUDGE.plate); return; }
    const c = litOf(x);
    if (c === null) { api.setTyped(""); say(workCol(x) === null ? NUDGE.whole : NUDGE.tap); return; }
    if (!canPay(x, c)) {
      api.setTyped(""); setHl([c]);
      const nothing = chainFor(x, c) === null;
      if (nothing) setStuck(c);
      say(nothing ? NUDGE.stuck : NUDGE.fetch);
      return;
    }
    const d = Number(s), right = (topCur(x, c) as number) - bDig(x, c);
    const nx = writeOn(x, c, d, true, d !== right);
    put(nx); api.setTyped(""); api.sfx.tick(); setHl([]);
    if (d !== right) { api.submit({ column: true, col: c, digit: d }); return; }
    if (fix && fix.col === c) { setFix(null); }
    setAmber((a) => a.filter((q) => q !== c));
    if (allSettled(nx) && nx.own.every((o: boolean, k: number) => o || tDig(nx, k) === null)) finish(nx);
  };
  const enterFn: any = !asking ? null
    : kind === "name" ? () => {
      const p = mRef.current.plates;
      if (Object.keys(p).some((id) => !p[id])) { say(NUDGE.name); return; }
      api.submit(ROWS.map((r) => Object.keys(p).find((id) => p[id] === r)).join(", "));
    }
    : kind === "top" ? () => {
      const x = mRef.current;
      if (x.top === null) { say(NUDGE.cards); return; }
      api.submit(x.top);
    }
    : kind === "where" ? (v: any) => {
      const x = mRef.current, w = String(v ?? "").trim();
      if (!w) return;
      if (!x.pick) { say(NUDGE.row); return; }
      api.setTyped(w); api.submit({ row: x.pick, name: w });
    }
    : (v: any) => typeIn(String(v ?? "").trim());
  api.onEnter(enterFn);
  HOOK.enter = (v?: any) => enterFn && enterFn(v);
  HOOK.type = (s: string) => api.setTyped(s);
  HOOK.set = (v: any) => {
    if (kind === "name") {
      const w = namesOf(v).split(",");
      if (w.length !== 3) return false;
      const p: any = { minuend: null, subtrahend: null, difference: null };
      w.forEach((id, i) => { if (id in p) p[id] = ROWS[i]; });
      upd((x) => ({ ...x, plates: p })); setTouched(true); return true;
    }
    if (kind === "top") {
      const x = mRef.current, n = leadNumber(v);
      if (n !== x.a && n !== x.b) return false;
      put(layOn(x, n === x.a ? "a" : "b")); setTouched(true); return true;
    }
    return false;
  };
  HOOK.plate = (r: string) => { upd((x) => ({ ...x, plates: { ...x.plates, subtrahend: r } })); setTouched(true); };
  HOOK.row = (r: string) => { upd((x) => ({ ...x, pick: r })); setTouched(true); };
  HOOK.place = () => { const x = mRef.current; if (x.top !== x.a) put(layOn(x, "a")); setTouched(true); };

  /* a run of the mat's own steps (snapshots), lit one column at a time */
  const pushRun = (S: any[], acts: any[], ms: number, quick = false) => {
    let lit: number | null = null;
    acts.forEach((a: any) => {
      if (a.t === "lit") lit = a.c;
      const walk = a.t === "trade" && (a.c === lit || lit === null);
      const wait = a.t === "lit" ? Math.round(ms * 0.45) : walk ? (quick ? 460 : 1800) : ms;
      const shown = lit !== null ? lit : a.c;
      S.push([wait, () => {
        put(a.snap); setRunLit(shown);
        if (a.t === "trade") { api.sfx.tick(); if (walk) walkTen(a.c, quick); }
        if (a.t === "write") api.sfx.tick();
        if (a.t === "stuck") { setStuck(a.c); setHl([a.c]); }
      }]);
    });
  };

  /* ── win motions: the maths moving ── */
  useEffect(() => {
    if (stage !== "win") return;
    const x0 = mRef.current, S: any[] = [];
    if (kind === "name") S.push([300, () => setHeavy(true)], [400, () => setLift(true)], [400, () => setLift(false)], [300, () => setHeavy(false)]);
    else if (kind === "where") S.push([250, () => setGhost(1)], [250, () => setGhost(2)], [250, () => setGhost(3)]);
    else if (kind === "top") {
      /* the swapped attempt: worked from the ones until it runs out of things to take, then back */
      const sw = layOn(x0, "b");
      S.push([520, () => put(sw)]);
      pushRun(S, planFinish(sw, "diff"), 230, true);
      S.push([900, () => {}], [500, () => { setStuck(null); setHl([]); setRunLit(null); put(layOn(x0, "a")); }]);
    } else if (workKind) {
      let x = x0;
      if (kind === "order" && x.top !== x.a) { x = layOn(x, "a"); const lx = x; S.push([520, () => put(lx)]); }
      pushRun(S, planFinish(x, "diff"), 220, true);
      S.push([200, () => setRunLit(null)]);
    }
    if (S.length) tl.run(S);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
     nothing marked, nothing the child did is cleared ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const x0 = mRef.current, wv = wrong.value;
    const S: any[] = [[300, () => { setHl([]); setStuck(null); }]];
    const right = digitsOf(x0.a - x0.b, x0.cols);
    const given = wv && typeof wv === "object" ? (wv.value !== undefined ? Number(wv.value) : null) : leadNumber(wv);
    const namesBack = (plates: any) => {
      const off = plates ? ROWS.filter((r) => { const id = Object.keys(plates).find((q) => plates[q] === r); return !!id && ROW_NAME[r] !== id; }) : [];
      const offPlates = plates ? Object.keys(plates).filter((id) => plates[id] && ROW_NAME[plates[id]] !== id) : [];
      S.push([400, () => setHeavy(true)], [500, () => setLift(true)], [700, () => { setRingRows(off); setRingPlates(offPlates); }],
        [600, () => setGhost(1)], [600, () => setGhost(2)], [400, () => setLift(false)], [500, () => setGhost(3)]);
    };
    const wholeBack = (x: any) => {
      const mine = x.own.some((o: boolean, k: number) => o && x.diff[k] !== null);
      const into = mine ? "check" : "diff";
      pushRun(S, planFinish(x, into), 420);
      const typedDigits = given !== null && isFinite(given) && lenOf(given) === x.cols ? digitsOf(given, x.cols) : null;
      const rings = mine ? right.map((d, k) => (x.own[k] && x.diff[k] !== null && x.diff[k] !== d ? k : -1)).filter((k) => k >= 0)
        : typedDigits ? right.map((d, k) => (typedDigits[k] !== d ? k : -1)).filter((k) => k >= 0) : [];
      S.push([300, () => { setRunLit(null); setAmber(rings); }]);
      if (!x.lock) S.push([60, () => upd((y) => ({ ...y, lock: true, lit: null }))]);   /* ones first locks itself */
    };

    if (wv && typeof wv === "object" && wv.column) {
      /* one column written wrong: its things in the tray, the ones taken away struck, its answer boxed */
      const c = wv.col, top = topCur(x0, c) as number, bot = bDig(x0, c), res = top - bot;
      S.push([200, () => { setRunLit(c); setAmber([c]); setFix({ col: c, top, bot, res, step: 1 }); }],
        [900, () => setFix({ col: c, top, bot, res, step: 2 })], [800, () => setFix({ col: c, top, bot, res, step: 3 })],
        [200, () => setRunLit(null)]);
    } else if (wv && typeof wv === "object" && wv.reach) {
      /* the reach to the right springs back and stays as a faint line; the column on the left lights and pays */
      const to = wv.to;
      S.push([200, () => setRefused({ from: wv.from, to })], [600, () => { setRunLit(to); setHl([to + 1, to]); }]);
      const ch = chainFor(x0, to);
      if (ch) { pushRun(S, ch, 700); S.push([300, () => { setHl([]); setRunLit(null); }]); }
      else if (kind === "order") {
        S.push([700, () => { setStuck(to); }], [900, () => {}]);
        const sw = layOn(x0, "a");
        S.push([600, () => { setStuck(null); setHl([]); setRefused(null); put(sw); }]);
        pushRun(S, planFinish(sw, "diff"), 380);
        S.push([200, () => setRunLit(null)]);
      }
    } else if (kind === "name") {
      namesBack(x0.plates);
    } else if (kind === "where") {
      S.push([400, () => setHeavy(true)], [500, () => setGhost(1)], [500, () => setGhost(2)], [500, () => setGhost(3)],
        [300, () => { setHeavy(false); setRingRows(["top"]); }]);
    } else if (kind === "top" || (kind === "order" && x0.top !== null && x0.top === x0.b)) {
      /* worked exactly as the child laid it, until it runs out of things to take; then the other way up */
      const laid = x0.top !== null ? x0 : layOn(x0, given === x0.a ? "a" : "b");
      if (laid !== x0) S.push([560, () => put(laid)]);
      if (laid.top === laid.b) {
        pushRun(S, planFinish(laid, "diff"), 280);
        S.push([1000, () => {}]);
      }
      const sw = layOn(laid, "a");
      S.push([620, () => { setStuck(null); setHl([]); setRunLit(null); put(sw); }]);
      if (kind === "order") { pushRun(S, planFinish(sw, "diff"), 380); S.push([200, () => setRunLit(null)]); }
    } else {
      /* a whole difference: the labels first where they were wrong, then the mat works it from the ones */
      let x = x0;
      if (kind === "namediff" && x.plates.subtrahend !== "middle") namesBack(x.plates);
      if (kind === "order" && x.top !== x.a) { x = layOn(x, "a"); const lx = x; S.push([600, () => put(lx)]); }
      if (given !== x0.a - x0.b) wholeBack(x);
    }
    tl.run(S, () => { setRunLit(null); api.lock(false); });
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const settledN = Array.from({ length: cols }).filter((_, k) => tDig(m, k) !== null && isSettled(m, k)).length;
  const rowCols = Array.from({ length: cols }).filter((_, k) => tDig(m, k) !== null || m.top === null).length;
  api.share({
    columns: cols, minuend: m.top, subtrahend: m.bot, cardsWaiting: m.shelf ? Object.keys(m.shelf).filter((id) => m.shelf[id] === "ledge").map((id) => m[id]) : [],
    columnDone: Array.from({ length: cols }, (_, k) => isSettled(m, k)),
    trades: m.trades.map((t: any) => ({ from: PLACES[t.from], to: PLACES[t.to] })), tradeCount: m.trades.length,
    difference: ready(m) && allSettled(m) ? rowValue(m.diff) : null, onesFirst: !!m.lock,
    labels: m.plates ? { ...m.plates } : null, rowPicked: m.pick,
  });

  /* ── drawing ── */
  const left = colX(cols - 1);
  const matBottom = GEO.sum + GEO.rowH;
  const litC = runLit !== null ? runLit : replay !== null ? null : litOf(m);
  const dd = drag.drag && drag.drag.moved ? drag.drag : null;
  const pay = dd ? dd.payload : null;
  const dTen = pay && pay.ten !== undefined ? pay.ten : null;
  const dBack = pay && pay.back !== undefined ? pay.back : null;
  const dCard = pay && pay.card ? pay.card : null;
  const dPlate = pay && pay.plate ? pay.plate : null;
  const overCol = dTen !== null ? colAt(dd) : null;
  const cardRow = dCard ? (dd.y < GEO.rowB ? "top" : dd.y < GEO.ledge - 8 ? "middle" : null) : null;
  const rp = replay !== null ? m.trades[replay] : null;
  const headLit = (k: number) => hl.includes(k) || litC === k || overCol === k || (rp && (rp.from === k || rp.to === k));
  const tenLive = live && ready(m) && workKind;
  const showRuns = workKind;
  const onLedge = (m.shelf && (m.shelf.a === "ledge" || m.shelf.b === "ledge")) || (m.plates && Object.keys(m.plates).some((id) => !m.plates[id]));
  const trayX = free ? 190 : 0;
  const trayOf = litC !== null ? litC : m.focus;   /* the lit column, else the last one worked or traded into */
  const trayCol = !onLedge && !m.check && trayOf !== null && trayOf !== undefined && tDig(m, trayOf) !== null && workKind ? trayOf : null;
  const trayShown = trayCol !== null || (fix && !onLedge);
  const plateIds = m.plates ? Object.keys(m.plates) : [];
  const plateAt = (id: string) => {
    const r = m.plates[id];
    if (r) return { x: GEO.plateX, y: ROWY[r] + (GEO.rowH - GEO.plateH) / 2 };
    return { x: 40 + plateIds.indexOf(id) * 220, y: GEO.ledge + (GEO.ledgeH - GEO.plateH) / 2 };
  };
  const cardLedgeX = (id: string) => (id === "b" ? 40 : 40 + lenOf(m.b) * GEO.lstep + 12 + 60);
  const noteOf = (k: number) => {
    const s = m.seq[k], t = tDig(m, k);
    if (!s.length || t === null) return null;
    const ri = s.indexOf("recv"), li = s.indexOf("lend");
    if (ri >= 0 && li > ri) return [{ t: String(t + 9), ink: ROSE_INK }];                          /* took a ten, then gave one */
    if (ri >= 0 && li >= 0) return [{ t: "1", ink: VERM_INK }, { t: String(t - 1), ink: ROSE_INK }]; /* gave one, then took a ten */
    if (li >= 0) return [{ t: String(t - 1), ink: ROSE_INK }];
    return [{ t: "1", ink: VERM_INK }, { t: String(t), ink: t === 0 ? ZERO : BLUE_INK }];
  };

  /* a number laid on a row: digit cards joined into one strip */
  const rowStrip = (v: number, y: number, base: string, ink: string, row: string) => {
    const len = lenOf(v);
    return (
      <g>
        <rect x={colX(len - 1) + 6} y={y + 3} width={len * CW - 12} height={GEO.rowH - 6} rx={22} fill={tint(base, 0.84)} stroke={tint(base, 0.45)} strokeWidth={2} />
        {Array.from({ length: len }).map((_, k) => {
          const d = digAt(v, k), cx = colC(k), gave = row === "top" && m.top === v && gaveTen(m, k);
          const tenPay = { ten: k };
          const src = row === "top" && tenLive;
          return (
            <g key={k} className={src ? "bm-grab c4-piece" : undefined}
              {...(src ? { ...control("ten-" + k, `Fetch a ten from the ${PLACES[k]}`), ...drag.bind(tenPay), ...drag.keys(tenPay) } : {})}>
              {src && <rect x={cx - 60} y={y} width={120} height={GEO.rowH} fill="transparent" />}
              <rect x={cx - GEO.cardW / 2} y={y + 6} width={GEO.cardW} height={GEO.cardH} rx={12} fill="#FFFFFF" stroke={tint(base, 0.35)} strokeWidth={2} />
              <text x={cx} y={y + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={d === 0 ? ZERO : ink}>{d}</text>
              {gave && <line x1={cx - 24} y1={y + 66} x2={cx + 24} y2={y + 14} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />}
            </g>
          );
        })}
      </g>
    );
  };
  /* a card waiting on the ledge: the digits closer together, no row colour yet */
  const ledgeCard = (v: number, x0: number, y0: number) => {
    const len = lenOf(v);
    return (
      <g>
        <rect x={x0} y={y0} width={len * GEO.lstep + 12} height={84} rx={20} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        {Array.from({ length: len }).map((_, i) => {
          const d = digAt(v, len - 1 - i), cx = x0 + 6 + i * GEO.lstep + GEO.lstep / 2;
          return (
            <g key={i}>
              <rect x={cx - GEO.lcard / 2} y={y0 + 6} width={GEO.lcard} height={72} rx={12} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={1.5} />
              <text x={cx} y={y0 + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={d === 0 ? ZERO : C.ink}>{d}</text>
            </g>
          );
        })}
      </g>
    );
  };
  const plateBody = (w: string, ring: boolean) => (
    <g>
      <rect x={0} y={-8} width={GEO.plateW} height={GEO.plateH + 16} fill="transparent" />
      <rect x={0} y={0} width={GEO.plateW} height={GEO.plateH} rx={14} fill="url(#gAccent)" stroke={shade(C.accent, 0.2)} strokeWidth={2} />
      <text x={GEO.plateW / 2} y={GEO.plateH / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{tx(w)}</text>
      {ring && <rect x={-6} y={-6} width={GEO.plateW + 12} height={GEO.plateH + 12} rx={18} fill="none" stroke={AMBER} strokeWidth={5} />}
    </g>
  );

  /* the bundle tray: the lit column counted out as things */
  /* the bundle tray: the column being worked as loose straws, the column on its left as bundles of ten
     straws. A fetched ten walks across tied, stands, then unties into ten loose straws, and its empty
     tie stays lying under them; dragged back, the straws tie up again and the bundle walks home */
  const partsOf = (k: number) => {
    const s0 = m.seq[k], t = tDig(m, k) || 0, ri = s0.indexOf("recv"), li = s0.indexOf("lend");
    return { own: Math.max(0, t - (li >= 0 && !(ri >= 0 && li > ri) ? 1 : 0)), ten: ri >= 0 ? (li > ri ? 9 : 10) : 0 };
  };
  const trayBody = () => {
    const c = fix ? fix.col : trayCol;
    if (c === null || c === undefined) return null;
    const y0 = GEO.ledge, sy = y0 + 46, x0 = trayX + 26, R0 = x0 + 470;
    const L = c + 1 < cols && tDig(m, c + 1) !== null ? c + 1 : null;
    const mv = move && move.to === c && L !== null ? move : null;
    const me = partsOf(c), lend = L !== null ? partsOf(L) : { own: 0, ten: 0 };
    const nL = Math.max(0, lend.own + lend.ten - (mv && mv.back ? 1 : 0));   /* the bundle walking home is not back yet */
    const showTen = me.ten > 0 && !mv;                                       /* while the ten walks or stands tied, it is not loose */
    const straws: any[] = [];
    for (let i = 0; i < me.own; i++) straws.push({ x: R0 + 14 + i * STRAW.step, fetched: false });
    if (showTen) for (let i = 0; i < me.ten; i++) straws.push({ x: R0 + 14 + (me.own + i) * STRAW.step, fetched: true });
    const struck = fix && fix.col === c && fix.step >= 2 ? fix.bot : 0;
    const home = x0 + 22 + nL * STRAW.bstep, land = R0 + 14 + me.own * STRAW.step + 30;
    const at = mv ? (mv.stage === 0 ? home : land) : 0;
    return (
      <g>
        <rect x={trayX} y={y0} width={1086 - trayX} height={GEO.ledgeH} rx={22} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {fix && fix.col === c ? (
          <g>
            <text x={x0} y={y0 + 98} fontSize={T.label} fontWeight={700} fill={C.ink}>{`${fix.top} − ${fix.bot} =`}</text>
            <rect x={x0 + 170} y={y0 + 46} width={64} height={70} rx={12} fill={fix.step >= 3 ? tint(GREEN, 0.86) : "#FFFFFF"} stroke={AMBER} strokeWidth={5}
              strokeDasharray={fix.step >= 3 ? undefined : "8 6"} />
            {fix.step >= 3 && <text x={x0 + 202} y={y0 + 100} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={fix.res === 0 ? ZERO : GREEN_INK}>{fix.res}</text>}
          </g>
        ) : L !== null ? (
          <g>
            <text x={x0} y={y0 + 36} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(PLACES[L])}</text>
            {Array.from({ length: nL }).map((_, i) => <StrawBundle key={"b" + i} x={x0 + 22 + i * STRAW.bstep} y={sy} fetched={i >= lend.own} />)}
          </g>
        ) : null}
        <text x={R0} y={y0 + 36} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(PLACES[c])}</text>
        {straws.map((d, i) => <Straw key={"s" + i} x={d.x} y={sy} fetched={d.fetched} />)}
        {straws.map((d, i) => (i >= straws.length - struck ? <line key={"x" + i} x1={d.x - 11} y1={sy + STRAW.h - 8} x2={d.x + 11} y2={sy + 8} stroke={C.ink} strokeWidth={4} strokeLinecap="round" /> : null))}
        {showTen && <EmptyTie x={R0 + 14 + (me.own + 4.5) * STRAW.step} y={sy + STRAW.h + 11} />}
        {mv && (
          <g key="walker" className={mv.stage === 2 ? undefined : "bm-walk"} style={{ transform: `translate(${at}px, 0px)` } as any}>
            <StrawBundle x={0} y={sy} fetched />
          </g>
        )}
      </g>
    );
  };

  /* the one thing to touch, before the first touch */
  let invite: any = null;
  if (asking && !touched && !wrong) {
    if (kind === "name" || (kind === "namediff" && !m.plates.subtrahend)) {
      const id = plateIds.find((q) => !m.plates[q]);
      if (id) { const p = plateAt(id); invite = { x: p.x + GEO.plateW / 2, y: p.y + GEO.plateH / 2, r: 60 }; }
    } else if ((kind === "order" || kind === "top") && m.top === null) invite = { x: (left + RIGHT) / 2, y: GEO.rowA + GEO.rowH / 2, r: 44 };
    else if (workKind && litC !== null && canPay(m, litC)) invite = { x: colC(litC), y: GEO.sum + GEO.rowH / 2, r: 50 };
  }

  const nameShown = (r: string, i: number) => ghost > i || (free && names);
  const litRow = kind === "where" && m.pick ? m.pick : null;

  return (
    <g>
      <style>{BM_CSS}</style>

      {/* the running count: columns settled against the columns ruled, and the trades made */}
      {showRuns && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={20} y={-60} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("settled")}</text>
          <text x={176} y={-58} fontSize={T.label} fontWeight={700} fill={C.ink}>{`${settledN} / ${rowCols}`}</text>
          <text x={20} y={-28} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("trades")}</text>
          <text x={176} y={-26} fontSize={T.label} fontWeight={700} fill={VERM_INK}>{String(m.trades.length)}</text>
        </g>
      )}

      {/* the bundle tray */}
      {trayShown && !m.check && trayBody()}

      {/* the ledge: labels or cards waiting for a row */}
      {onLedge && <rect x={0} y={GEO.ledge} width={1086} height={GEO.ledgeH} rx={22} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />}
      {m.shelf && ["b", "a"].map((id) => (m.shelf[id] !== "ledge" ? null : (
        <g key={"cd" + id} className={cardsLive ? "bm-grab c4-piece" : undefined} display={dCard === id ? "none" : undefined}
          {...(cardsLive ? { ...control("card-" + id, `Put ${indian(m[id])} on the mat`), ...drag.bind({ card: id }), ...drag.keys({ card: id }) } : {})}>
          {ledgeCard(m[id], cardLedgeX(id), GEO.ledge + 14)}
        </g>
      )))}

      {/* the mat itself: set a little left of the answer column when no labels need the room */}
      <g transform={`translate(${dx},0)`}>

      {/* the column being worked lights the full height of both upper rows */}
      {litC !== null && (
        <rect x={colX(litC) + 3} y={GEO.head} width={CW - 6} height={GEO.sum - 6 - GEO.head} rx={16} fill={tint(C.accent, 0.84)} stroke={C.accent} strokeWidth={3} />
      )}
      {litRow && <rect x={left + 2} y={ROWY[litRow] + 2} width={RIGHT - left - 4} height={GEO.rowH - 4} rx={20} fill={tint(C.accent, 0.8)} stroke={C.accent} strokeWidth={3} />}

      {/* a heading over every column */}
      {Array.from({ length: cols }).map((_, k) => {
        const on = headLit(k);
        return (
          <g key={"h" + k}>
            <rect x={colX(k) + 4} y={GEO.head} width={CW - 8} height={GEO.headH} rx={12} fill={on ? tint(C.accent, 0.62) : tint(C.panel, 0.25)} stroke={on ? C.accent : C.rule} strokeWidth={on ? 3 : 1.5} />
            <text x={colC(k)} y={GEO.head + 32} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(HEADS[k])}</text>
          </g>
        );
      })}
      {Array.from({ length: cols + 1 }).map((_, k) => {
        const xx = k === cols ? left : colX(k) + CW;
        return <line key={"v" + k} x1={xx} y1={GEO.head + GEO.headH + 2} x2={xx} y2={matBottom + 2} stroke={tint(C.rule, 0.2)} strokeWidth={2} />;
      })}

      {/* the trade band: what each column holds after a trade, and the arrows, left to right */}
      {Array.from({ length: cols }).map((_, k) => {
        const note = noteOf(k);
        if (!note) return null;
        return (
          <text key={"n" + k} className="bm-in" x={colC(k)} y={44} textAnchor="middle" fontSize={T.label} fontWeight={700}>
            {note.map((p, i) => <tspan key={i} fill={p.ink}>{p.t}</tspan>)}
          </text>
        );
      })}
      {m.trades.map((t: any, i: number) => {
        const x1 = colC(t.from) + 20, x2 = colC(t.to) - 30, on = !rp || rp === t;
        return (
          <g key={"ar" + i} className="bm-in">
            <line x1={x1} y1={60} x2={x2 - 8} y2={60} stroke={on ? VERM_INK : tint(VERM, 0.55)} strokeWidth={4} strokeLinecap="round" />
            <path d={`M ${x2} 60 L ${x2 - 14} 52 L ${x2 - 14} 68 Z`} fill={on ? VERM_INK : tint(VERM, 0.55)} />
          </g>
        );
      })}
      {[refused, !free && item && item.ghost && kind === "work" ? item.ghost : null].filter(Boolean).map((g: any, i: number) => {
        const x1 = colC(g.from) - 20, x2 = colC(g.to) + 30;
        return (
          <g key={"rf" + i}>
            <line x1={x1} y1={9} x2={x2 + 8} y2={9} stroke={ZERO} strokeWidth={3} strokeDasharray="8 7" strokeLinecap="round" />
            <path d={`M ${x2} 9 L ${x2 + 13} 3 L ${x2 + 13} 15 Z`} fill={ZERO} />
          </g>
        );
      })}

      {tenLive && Array.from({ length: cols }).map((_, k) => (canUndo(m, k) ? (
        <g key={"bk" + k} className="bm-grab c4-piece"
          {...{ ...control("back-" + k, `Send the ten back to the ${PLACES[k + 1]}`), ...drag.bind({ back: k }), ...drag.keys({ back: k }) }}>
          <rect x={colC(k) - 56} y={0} width={112} height={72} fill="transparent" />
        </g>
      ) : null))}

      {/* the minuend and subtrahend rows (they lift together while their names are read) */}
      <g className="bm-lift" style={{ transform: `translateY(${lift ? -8 : 0}px)` } as any}>
        {m.top !== null && rowStrip(m.top, GEO.rowA, BLUE, BLUE_INK, "top")}
        {m.bot !== null && rowStrip(m.bot, GEO.rowB, AMBER, AMBER_INK, "middle")}
        {kind === "where" && ["top", "middle"].map((r) => (
          <rect key={"bl" + r} x={left + 6} y={ROWY[r] + 3} width={RIGHT - left - 12} height={GEO.rowH - 6} rx={22} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="10 8" />
        ))}
        {(m.bot !== null || kind === "where") && <text x={left - 26} y={GEO.rowB + 58} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>−</text>}
        {m.top === null && kind !== "where" && ["top", "middle"].map((r) => (
          <rect key={"em" + r} x={left + 6} y={ROWY[r] + 3} width={RIGHT - left - 12} height={GEO.rowH - 6} rx={22} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 8" />
        ))}
      </g>

      {/* the lit column's outline stays on top of the two rows */}
      {litC !== null && <rect x={colX(litC) + 3} y={GEO.head} width={CW - 6} height={GEO.sum - 6 - GEO.head} rx={16} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}

      {/* the rule, heavier while the rows are being named */}
      <line x1={left - 8} y1={GEO.rule} x2={RIGHT - 6} y2={GEO.rule} stroke={C.ink} strokeWidth={heavy ? 10 : 6} strokeLinecap="round" />

      {/* the difference row: a square under every column, the answer written in green */}
      {Array.from({ length: cols }).map((_, k) => {
        const d = m.diff[k], cx = colC(k);
        return (
          <g key={"s" + k}>
            <rect x={cx - GEO.cardW / 2} y={GEO.sum + 6} width={GEO.cardW} height={GEO.cardH} rx={12} fill={d === null ? "#FFFFFF" : tint(GREEN, 0.86)}
              stroke={d === null ? C.rule : tint(GREEN, 0.4)} strokeWidth={2} strokeDasharray={d === null ? "8 7" : undefined} />
            {d !== null && <text x={cx} y={GEO.sum + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={d === 0 ? ZERO : GREEN_INK}>{d}</text>}
            {amber.includes(k) && <rect x={cx - GEO.cardW / 2 - 7} y={GEO.sum} width={GEO.cardW + 14} height={GEO.cardH + 12} rx={16} fill="none" stroke={AMBER} strokeWidth={5} />}
          </g>
        );
      })}

      {/* rows ringed after a miss */}
      {ringRows.map((r) => <rect key={"rr" + r} x={left - 2} y={ROWY[r] - 2} width={RIGHT - left + 4} height={GEO.rowH + 4} rx={24} fill="none" stroke={AMBER} strokeWidth={5} />)}

      {/* nothing on its left can lend: the empty place where a lender would stand */}
      {stuck !== null && <rect x={colX(stuck + 1) + 16} y={GEO.rowA + 6} width={GEO.cardW} height={GEO.cardH} rx={12} fill="none" stroke={ZERO} strokeWidth={3} strokeDasharray="8 7" />}

      {/* the mat's own run under the child's, with the order of work */}
      {m.check && (
        <g>
          <rect x={left + 6} y={GEO.check} width={RIGHT - left - 12} height={GEO.rowH} rx={20} fill={tint(GREEN, 0.92)} stroke={tint(GREEN, 0.55)} strokeWidth={2} />
          {m.check.map((d: any, k: number) => (d === null ? null : (
            <text key={"ck" + k} x={colC(k)} y={GEO.check + 60} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={d === 0 ? ZERO : GREEN_INK}>{d}</text>
          )))}
          {Array.from({ length: m.order }).map((_, k) => (
            <text key={"o" + k} x={colC(k)} y={GEO.check + GEO.rowH + 30} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(ORD[k])}</text>
          ))}
        </g>
      )}

      {/* the names beside the rows (after a miss, or in free play) */}
      {ROWS.map((r, i) => (nameShown(r, i) ? (
        <text key={"gn" + r} className="bm-in" x={GEO.nameX} y={ROWY[r] + 52} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={shade(C.accent, 0.25)}>{tx(ROW_NAME[r])}</text>
      ) : null))}

      {/* the naming labels */}
      {m.plates && plateIds.map((id) => {
        const p = plateAt(id), pl = { plate: id };
        return (
          <g key={id} className={"bm-move" + (platesLive ? " bm-grab c4-piece" : "")} style={{ transform: `translate(${p.x}px, ${p.y}px)` } as any}
            display={dPlate === id ? "none" : undefined}
            {...(platesLive ? { ...control("plate-" + id, "Label " + id), ...drag.bind(pl), ...drag.keys(pl) } : {})}>
            {plateBody(id, ringPlates.includes(id))}
          </g>
        );
      })}

      {/* the rows of the blank mat are tapped to say where */}
      {kind === "where" && asking && ROWS.map((r) => (
        <Hit key={"hr" + r} id={"row-" + r} label={`The ${r} row`} x={left} y={ROWY[r]} w={RIGHT - left} h={GEO.rowH} onPress={() => pickRow(r)} />
      ))}

      {/* a column's square under the rule */}
      {live && ready(m) && workKind && Array.from({ length: cols }).map((_, k) => (tDig(m, k) === null ? null : (
        <Hit key={"c" + k} id={"col-" + k} label={`Work the ${PLACES[k]} column`} x={colX(k)} y={GEO.sum} w={CW} h={GEO.rowH} onPress={() => tapCol(k)} />
      )))}

      {/* replay: every column that paid on its own is dimmed while the trades walk again */}
      {rp && Array.from({ length: cols }).map((_, k) => (rp.from === k || rp.to === k ? null : (
        <rect key={"dim" + k} x={colX(k)} y={0} width={CW} height={matBottom} fill="#FFFFFF" fillOpacity={0.62} pointerEvents="none" />
      )))}
      {/* a card dragged over a row shows where it will lie */}
      {dCard && cardRow && <g pointerEvents="none" filter="url(#fLift)">{rowStrip(m[dCard], ROWY[cardRow], cardRow === "top" ? BLUE : AMBER, cardRow === "top" ? BLUE_INK : AMBER_INK, "hover")}</g>}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
      </g>

      {/* the cards swap over, to try it the other way up */}
      {!free && (kind === "order" || kind === "top") && m.top !== null && (
        <Key id="swap" label={tx("Swap the two cards")} x={40} y={150} w={196} h={80} C={C} disabled={!asking} onClick={swapCards}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={asking ? C.ink : mix(C.ink, C.panel, 0.5)}>{tx("Swap")}</text>
        </Key>
      )}

      {/* free play */}
      {free && (
        <g>
          <Key id="new-pair" label={tx("New pair")} x={16} y={112} w={160} h={76} C={C} onClick={() => reset(dealFree())}>
            <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("New pair")}</text>
          </Key>
          <Key id="ones-first" label={tx(m.lock ? "Ones first is on" : "Ones first is off")} x={16} y={200} w={160} h={76} C={C} primary={m.lock}
            onClick={() => upd((x) => ({ ...x, lock: !x.lock, lit: null }))}>
            <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={m.lock ? "#FFFFFF" : C.ink}>{tx("Ones first")}</text>
          </Key>
          <Key id="names" label={tx(names ? "Hide the names" : "Show the names")} x={16} y={288} w={160} h={76} C={C} primary={names} onClick={() => setNames((b) => !b)}>
            <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={names ? "#FFFFFF" : C.ink}>{tx("Names")}</text>
          </Key>
          <Key id="replay" label={tx("Replay the trades")} x={16} y={376} w={160} h={76} C={C} disabled={!m.trades.length || busy}
            onClick={() => tl.run([...m.trades.map((_: any, i: number) => [900, () => setReplay(i)]), [300, () => setReplay(null)]])}>
            <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={m.trades.length && !busy ? C.ink : mix(C.ink, C.panel, 0.5)}>{tx("Replay")}</text>
          </Key>
        </g>
      )}
      {/* the piece under the finger */}
      {(dTen !== null || dBack !== null) && <g pointerEvents="none" filter="url(#fLift)"><StrawBundle x={dd.x} y={dd.y - STRAW.h / 2} fetched /></g>}
      {dCard && !cardRow && <g pointerEvents="none" filter="url(#fLift)">{ledgeCard(m[dCard], dd.x - (lenOf(m[dCard]) * GEO.lstep) / 2, dd.y - 42)}</g>}
      {dPlate && <g pointerEvents="none" filter="url(#fLift)" transform={`translate(${dd.x - GEO.plateW / 2},${dd.y - GEO.plateH / 2})`}>{plateBody(dPlate, false)}</g>}
    </g>
  );
}

/* a fresh mat for an item */
function matOfItem(it: any) {
  const k = it.kind || "free", a = it.a || 0, b = it.b || 0, cols = it.cols || Math.max(5, lenOf(a));
  const cards = k === "order" || k === "top", empty = k === "where";
  return {
    kind: k, a, b, cols,
    top: cards || empty ? null : a, bot: cards || empty ? null : b,
    shelf: cards ? { a: "ledge", b: "ledge" } : null,
    seq: Array.from({ length: cols }, () => [] as string[]), trades: [] as any[],
    diff: k === "name" ? digitsOf(a - b, cols) : blank(cols), own: falses(cols), bad: falses(cols),
    check: null as any, order: 0, lit: null as any, focus: null as any, done: [] as number[],
    lock: !it.free,
    plates: k === "name" ? { minuend: null, subtrahend: null, difference: null } : k === "namediff" ? { subtrahend: null } : null,
    pick: null as any,
  };
}

/* the summary page's small drawing of the child's last right answer in a phase: the names on a
   little mat, the card put on top, or the difference under a rule in green */
function Thumb({ result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const k = L.kind, v = L.value;
  const box = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (k === "name" || k === "where") {
    return (
      <g>
        {box}
        <text x={w / 2} y={34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={BLUE_INK}>minuend</text>
        <line x1={24} y1={46} x2={w - 24} y2={46} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
        {k === "name" && <text x={w / 2} y={h - 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={GREEN_INK}>difference</text>}
      </g>
    );
  }
  const num = v && typeof v === "object" ? Number(v.value) : leadNumber(v);
  if (num === null || num === undefined || !isFinite(num)) return null;
  return (
    <g>
      {box}
      {k === "top" ? (
        <g>
          <text x={w - 16} y={42} textAnchor="end" fontSize={T.label} fontWeight={700} fill={BLUE_INK}>{indian(num)}</text>
          <line x1={24} y1={58} x2={w - 16} y2={58} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <line x1={24} y1={20} x2={w - 16} y2={20} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
          <text x={w - 16} y={h - 18} textAnchor="end" fontSize={T.label} fontWeight={700} fill={GREEN_INK}>{indian(num)}</text>
        </g>
      )}
    </g>
  );
}

function BorrowMat(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default BorrowMat;
