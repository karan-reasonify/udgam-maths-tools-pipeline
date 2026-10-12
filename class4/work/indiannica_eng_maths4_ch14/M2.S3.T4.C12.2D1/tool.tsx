/* ═══ M2.S3.T4.C12.2D1 · pictograph_reader · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "pictograph_reader";
const MEDIA_ID = "M2.S3.T4.C12.2D1";
const TOOL_NAME = "Pictograph Reader";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A pictograph, and its key card face down. What does one picture stand for?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every row read with its key, the rows compared, and only the row asked read.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any pictograph and any key, with the lamp, the rail and the total open.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. Chapter terms: pictograph चित्रालेख / ચિત્રાલેખ,
   key कुंजी / ચાવી, row पंक्ति / હાર, symbol प्रतीक / પ્રતીક, data आँकड़े / માહિતી, class कक्षा / વર્ગ. */
const TR: any = {
  hi: {
    /* the tool, the opening, the summary page and Free play */
    "Pictograph Reader": "चित्रालेख पढ़ना",
    "A pictograph, and its key card face down. What does one picture stand for?": "एक चित्रालेख है, उसका कुंजी कार्ड उल्टा है। एक चित्र कितने के बराबर है?",
    "Every row read with its key, the rows compared, and only the row asked read.": "हर पंक्ति कुंजी से पढ़ी। पंक्तियों की तुलना की। और सिर्फ़ पूछी गई पंक्ति पढ़ी।",
    "Free play. Any pictograph and any key, with the lamp, the rail and the total open.": "मुक्त खेल। कोई भी चित्रालेख और कुंजी लो, सब खुला है।",
    /* phase 1 */
    "The key says what one symbol stands for": "कुंजी बताती है, एक प्रतीक कितने का है",
    "How many does this row stand for? What do you need to know first?": "यह पंक्ति कितने के बराबर है? पहले क्या जानना होगा?",
    "What is this pictograph about?": "यह चित्रालेख किस बारे में है?",
    "Turn the key card first. Then read one row at a time.": "पहले कुंजी कार्ड पलटो। फिर एक एक पंक्ति पढ़ो।",
    "The key says what one symbol stands for, and the title says what the data is about.": "कुंजी बताती है कि एक प्रतीक कितने का है। शीर्षक बताता है कि आँकड़े किस बारे में हैं।",
    "You learned: the key gives a symbol's worth; the title tells the topic.": "तुमने सीखा: कुंजी एक प्रतीक का मान बताती है। शीर्षक विषय बताता है।",
    "Two pictographs each show a row of 3 apple pictures. Their keys are different. Turn each key card. How many apples does each row show?":
      "दो चित्रालेख हैं। हर एक में सेब के 3 चित्रों की पंक्ति है। उनकी कुंजियाँ अलग हैं। हर कुंजी कार्ड पलटो। हर पंक्ति कितने सेब दिखाती है?",
    "Apples in each row?": "हर पंक्ति में सेब?",
    "Pictures are not apples yet. Each chart has its own card for what one picture is worth.": "चित्र अभी सेब नहीं हैं। हर चित्रालेख का अपना कुंजी कार्ड है। वह बताता है कि एक चित्र कितने का है।",
    "This pictograph has rows of fish pictures. Can you tell how many fish one row shows?": "यहाँ मछली के चित्रों की पंक्तियाँ हैं। एक पंक्ति में कितनी मछलियाँ हैं, बता सकते हो?",
    "Can you tell the fish in a row?": "मछलियाँ बता सकते हो?",
    "Counting gives pictures, not fish. What would say how many fish one picture is?": "गिनने से चित्र मिलते हैं, मछलियाँ नहीं। एक चित्र कितनी मछलियाँ है, यह कौन बताएगा?",
    "This pictograph is titled Cups of Tea Sold This Week. Its key reads one cup picture for 10 cups. Which one tells you what the data is about?":
      "इसका शीर्षक है, इस हफ़्ते बिके चाय के कप। इसकी कुंजी में एक कप का चित्र 10 कप है। आँकड़े किस बारे में हैं, कौन बताता है?",
    "Which tells what it is about?": "विषय कौन बताता है?",
    "The key card gives the worth of one cup picture. Is that what the chart is about?": "कुंजी कार्ड एक कप के चित्र का मान बताता है। क्या चित्रालेख उसी के बारे में है?",
    "Yes": "हाँ", "No": "नहीं", "the title": "शीर्षक", "the key": "कुंजी",
    /* phase 2 */
    "Symbols times the key": "प्रतीकों की गिनती गुणा कुंजी",
    "Count the symbols. Then use the key for each one.": "प्रतीक गिनो। फिर हर एक के लिए कुंजी लगाओ।",
    "What does each one stand for?": "हर एक प्रतीक कितने का है?",
    "Write the key under each picture, then add them all up.": "हर चित्र के नीचे कुंजी लिखो, फिर सबको जोड़ो।",
    "Count the symbols in the row, then take the key that many times.": "पंक्ति के प्रतीक गिनो। फिर कुंजी उतनी बार लो।",
    "You learned: a row is its symbols counted, times the key.": "तुमने सीखा: पंक्ति का मान, प्रतीक गुणा कुंजी।",
    "In a pictograph of umbrellas sold, one umbrella picture stands for 6 umbrellas. The row for June holds 7 umbrella pictures. How many umbrellas were sold in June?":
      "यह बिके छातों का चित्रालेख है। एक छाते का चित्र 6 छातों के बराबर है। जून की पंक्ति में छाते के 7 चित्र हैं। जून में कितने छाते बिके?",
    "Umbrellas sold in June?": "जून में बिके छाते?",
    "The key counts once for every picture, not once for the row. How many pictures are in June?": "कुंजी हर चित्र के लिए एक बार गिनो। पूरी पंक्ति के लिए एक ही बार नहीं। जून में कितने चित्र हैं?",
    "One shell picture stands for 3 shells. The lit row holds 8 shell pictures. How many shells does it show?": "एक सीप का चित्र 3 सीपियों के बराबर है। चमकती पंक्ति में सीप के 8 चित्र हैं। वह कितनी सीपियाँ दिखाती है?",
    "Shells in the lit row?": "चमकती पंक्ति में सीपियाँ?",
    "That adds the key only once. Every picture in the row brings its own share.": "इसमें कुंजी सिर्फ़ एक बार जुड़ी है। पंक्ति का हर चित्र अपना हिस्सा लाता है।",
    "One car picture stands for 5 cars. Car parks A, B and C hold 9, 6 and 7 pictures. How many cars are in car park A?": "एक कार का चित्र 5 कारों के बराबर है। पार्किंग A, B और C में 9, 6 और 7 चित्र हैं। पार्किंग A में कितनी कारें हैं?",
    "Cars in car park A?": "पार्किंग A में कारें?",
    "Those two numbers were added. How many times does park A use the key?": "वे दो संख्याएँ जोड़ी गईं। पार्किंग A में कुंजी कितनी बार लगती है?",
    /* phase 3 */
    "Most, least and the same": "सबसे ज़्यादा, सबसे कम और बराबर",
    "Which row is the longest? Which is the shortest? Are two the same?": "सबसे लंबी पंक्ति कौन सी है? सबसे छोटी कौन सी? क्या दो बराबर हैं?",
    "Do all the rows use the same key?": "क्या सब पंक्तियों की कुंजी एक ही है?",
    "Put the rows side by side on the rail, then read the one you need.": "पंक्तियों को पट्टी पर साथ साथ रखो। फिर जो चाहिए, वह पढ़ो।",
    "With one key for every row, compare by numbers or by symbols. With different keys, compare only the numbers.":
      "कुंजी एक हो, तो संख्या या प्रतीक से तुलना करो। कुंजियाँ अलग हों, तो सिर्फ़ संख्याओं से।",
    "You learned: with one key, the longest row stands for the most.": "तुमने सीखा: कुंजी एक हो, तो लंबी पंक्ति अधिक।",
    "A pictograph shows visitors to a book fair, one person picture for 10 visitors. Monday holds 6 pictures, Tuesday 9, Wednesday 4 and Thursday 6. How many visitors came on the busiest day?":
      "यह पुस्तक मेले के दर्शकों का चित्रालेख है। एक व्यक्ति का चित्र 10 दर्शकों के बराबर है। सोमवार के 6 चित्र हैं, मंगलवार के 9। बुधवार के 4 हैं और गुरुवार के 6। सबसे व्यस्त दिन कितने दर्शक आए?",
    "Visitors on the busiest day?": "सबसे व्यस्त दिन के दर्शक?",
    "That is how many pictures, not how many visitors. Use the key on the longest row.": "यह चित्रों की गिनती है, दर्शकों की नहीं। सबसे लंबी पंक्ति पर कुंजी लगाओ।",
    "One leaf picture stands for 4 leaves. Groups A, B, C and D hold 5, 8, 3 and 5 leaf pictures. Two groups collected the same number. How many leaves did each of those two collect?":
      "एक पत्ती का चित्र 4 पत्तियों के बराबर है। समूह A, B, C और D में 5, 8, 3 और 5 चित्र हैं। दो समूहों ने बराबर पत्तियाँ इकट्ठी कीं। उनमें से हर एक ने कितनी इकट्ठी कीं?",
    "Leaves in each equal row?": "हर बराबर पंक्ति में पत्तियाँ?",
    "Which two rows are just as long as each other? Read one of them with the key.": "कौन सी दो पंक्तियाँ एक जितनी लंबी हैं? उनमें से एक को कुंजी से पढ़ो।",
    "One bowl picture stands for 8 bowls of rice served. Monday holds 3 bowl pictures, Tuesday 6, Wednesday 5 and Thursday 2. How many bowls were served on the day with the fewest?":
      "एक कटोरी का चित्र 8 कटोरी चावल के बराबर है। सोमवार के 3 चित्र हैं, मंगलवार के 6। बुधवार के 5 हैं और गुरुवार के 2। सबसे कम वाले दिन कितनी कटोरियाँ परोसी गईं?",
    "Bowls on the day with fewest?": "सबसे कम वाले दिन कटोरियाँ?",
    "The shortest row has the fewest. What is each of its pictures worth?": "सबसे छोटी पंक्ति में सबसे कम हैं। उसका हर चित्र कितने का है?",
    /* phase 4 */
    "Read only the row asked": "सिर्फ़ पूछी गई पंक्ति पढ़ो",
    "Which row does the question ask about? Read that one.": "प्रश्न किस पंक्ति के बारे में पूछता है? वही पढ़ो।",
    "Does it ask about one row, or about all of them?": "यह एक पंक्ति पूछता है, या सारी पंक्तियाँ?",
    "Light just that row, count its pictures, then use the key.": "वही पंक्ति चमकाओ, चित्र गिनो, फिर कुंजी लगाओ।",
    "Read only the row a question asks about. Add every row only when it asks for all of them.": "प्रश्न जो पंक्ति पूछे, सिर्फ़ वही पढ़ो। सब पंक्तियाँ तभी जोड़ो, जब सबका पूछा जाए।",
    "You learned: answer from the row asked; add all rows only for a total.": "तुमने सीखा: पूछी गई पंक्ति से उत्तर दो। कुल के लिए ही सब जोड़ो।",
    "A pictograph shows the sport each child in a class chose, one face for 5 children. Swimming has 6 faces, chess 3, skating 4 and football 8. How many children chose chess?":
      "इसमें कक्षा के बच्चों के चुने खेल हैं। एक चेहरा 5 बच्चों के बराबर है। तैराकी के 6 चेहरे हैं, शतरंज के 3। स्केटिंग के 4 हैं और फ़ुटबॉल के 8। कितने बच्चों ने शतरंज चुना?",
    "How many chose chess?": "शतरंज कितनों ने चुना?",
    "Adding every row counts every sport, not just one.": "हर पंक्ति जोड़ने से हर खेल गिना गया, एक नहीं।",
    "A pictograph of fruit sold at a stall has one fruit picture for 6 fruits. It holds 5 pictures for apples, 2 for pears, 7 for plums and 4 for figs. How many pears were sold?":
      "यह ठेले पर बिके फलों का चित्रालेख है। एक फल का चित्र 6 फलों के बराबर है। सेब के 5 चित्र हैं, नाशपाती के 2। आलूबुखारे के 7 हैं और अंजीर के 4। कितनी नाशपातियाँ बिकीं?",
    "How many pears were sold?": "नाशपाती कितनी बिकीं?",
    "Is that the pears row, or a row beside it? Light the pears row.": "क्या वह नाशपाती की पंक्ति है, या पास वाली? नाशपाती की पंक्ति चमकाओ।",
    "A pictograph of four clubs has one face for 3 children. It holds 4 faces for art, 6 for music, 5 for dance and 3 for science. Each child is in one club. How many children are in the dance club, and how many are in the four clubs together?":
      "यह चार क्लबों का चित्रालेख है। एक चेहरा 3 बच्चों के बराबर है। कला के 4 चेहरे हैं, संगीत के 6। नृत्य के 5 हैं और विज्ञान के 3। हर बच्चा एक ही क्लब में है। नृत्य क्लब में कितने बच्चे हैं? और चारों क्लबों में मिलाकर कितने?",
    "Dance club, then all four clubs?": "नृत्य क्लब, फिर चारों क्लब?",
    "The first box is one club. The second box counts every club, not one.": "पहला खाना एक क्लब है। दूसरा खाना हर क्लब गिनता है, एक नहीं।",
    /* the answer boxes' names */
    "Asha": "आशा", "Ravi": "रवि", "dance": "नृत्य", "together": "कुल",
    /* the working area: charts, rows, units */
    "Chart 1: Apples Picked": "चित्रालेख 1: तोड़े गए सेब", "Chart 2: Apples Picked": "चित्रालेख 2: तोड़े गए सेब",
    "Fish Caught by Three Boats": "तीन नावों की पकड़ी मछलियाँ", "Cups of Tea Sold This Week": "इस हफ़्ते बिके चाय के कप",
    "Umbrellas Sold": "बिके छाते", "Shells Collected": "इकट्ठी सीपियाँ", "Cars in Three Car Parks": "तीन पार्किंग में कारें",
    "Visitors to the Book Fair": "पुस्तक मेले के दर्शक", "Leaves Collected": "इकट्ठी पत्तियाँ", "Bowls of Rice Served": "परोसी गई चावल की कटोरियाँ",
    "Sport Each Child Chose": "हर बच्चे का चुना खेल", "Fruit Sold at a Stall": "ठेले पर बिके फल", "Children in Four Clubs": "चार क्लबों में बच्चे",
    "Boat A": "नाव A", "Boat B": "नाव B", "Boat C": "नाव C",
    "Mon": "सोम", "Tue": "मंगल", "Wed": "बुध", "Thu": "गुरु", "May": "मई", "June": "जून", "July": "जुलाई",
    "Anu": "अनु", "Dev": "देव", "Mira": "मीरा", "Park A": "पार्किंग A", "Park B": "पार्किंग B", "Park C": "पार्किंग C",
    "Group A": "समूह A", "Group B": "समूह B", "Group C": "समूह C", "Group D": "समूह D",
    "Swimming": "तैराकी", "Chess": "शतरंज", "Skating": "स्केटिंग", "Football": "फ़ुटबॉल",
    "Apples": "सेब", "Pears": "नाशपाती", "Plums": "आलूबुखारा", "Figs": "अंजीर",
    "Art": "कला", "Music": "संगीत", "Dance": "नृत्य", "Science": "विज्ञान",
    "apples": "सेब", "fish": "मछलियाँ", "cups": "कप", "umbrellas": "छाते", "shells": "सीपियाँ", "cars": "कारें",
    "visitors": "दर्शक", "leaves": "पत्तियाँ", "bowls": "कटोरी", "children": "बच्चे", "fruits": "फल",
    "Key": "कुंजी", "missing": "नहीं है", "most": "सबसे ज़्यादा", "least": "सबसे कम", "total for all rows": "सब पंक्तियों का कुल",
    "rows read": "पढ़ी पंक्तियाँ", "all rows": "सब पंक्तियाँ", "next chart": "नया चित्रालेख",
    "No key: can't tell": "कुंजी नहीं: बता नहीं सकते", "Title: what is counted": "शीर्षक: क्या गिना गया",
  },
  gu: {
    "Pictograph Reader": "ચિત્રાલેખ વાંચન",
    "A pictograph, and its key card face down. What does one picture stand for?": "એક ચિત્રાલેખ છે, તેનું ચાવી કાર્ડ ઊંધું છે. એક ચિત્ર કેટલા બરાબર છે?",
    "Every row read with its key, the rows compared, and only the row asked read.": "દરેક હાર ચાવીથી વાંચી, હારોની સરખામણી કરી. અને ફક્ત પૂછેલી હાર જ વાંચી.",
    "Free play. Any pictograph and any key, with the lamp, the rail and the total open.": "મુક્ત રમત. કોઈ પણ ચિત્રાલેખ ને ચાવી લો, બધું ખુલ્લું છે.",
    "The key says what one symbol stands for": "ચાવી કહે છે, એક પ્રતીક કેટલાનું છે",
    "How many does this row stand for? What do you need to know first?": "આ હાર કેટલા બરાબર છે? પહેલાં શું જાણવું પડશે?",
    "What is this pictograph about?": "આ ચિત્રાલેખ શેના વિશે છે?",
    "Turn the key card first. Then read one row at a time.": "પહેલાં ચાવી કાર્ડ ફેરવો. પછી એક એક હાર વાંચો.",
    "The key says what one symbol stands for, and the title says what the data is about.": "ચાવી કહે છે કે એક પ્રતીક કેટલાનું છે. શીર્ષક કહે છે કે માહિતી શેના વિશે છે.",
    "You learned: the key gives a symbol's worth; the title tells the topic.": "તમે શીખ્યા: ચાવી એક પ્રતીકનું મૂલ્ય કહે છે. શીર્ષક વિષય કહે છે.",
    "Two pictographs each show a row of 3 apple pictures. Their keys are different. Turn each key card. How many apples does each row show?":
      "બે ચિત્રાલેખ છે. દરેકમાં સફરજનનાં 3 ચિત્રોની હાર છે. તેમની ચાવીઓ જુદી છે. દરેક ચાવી કાર્ડ ફેરવો. દરેક હાર કેટલાં સફરજન બતાવે છે?",
    "Apples in each row?": "દરેક હારમાં સફરજન?",
    "Pictures are not apples yet. Each chart has its own card for what one picture is worth.": "ચિત્રો હજી સફરજન નથી. દરેક ચિત્રાલેખનું પોતાનું ચાવી કાર્ડ છે. તે કહે છે કે એક ચિત્ર કેટલાનું છે.",
    "This pictograph has rows of fish pictures. Can you tell how many fish one row shows?": "અહીં માછલીનાં ચિત્રોની હારો છે. એક હારમાં કેટલી માછલીઓ છે, તમે કહી શકો?",
    "Can you tell the fish in a row?": "હારની માછલીઓ કહી શકો?",
    "Counting gives pictures, not fish. What would say how many fish one picture is?": "ગણવાથી ચિત્રો મળે છે, માછલીઓ નહીં. એક ચિત્ર કેટલી માછલી છે, તે કોણ કહેશે?",
    "This pictograph is titled Cups of Tea Sold This Week. Its key reads one cup picture for 10 cups. Which one tells you what the data is about?":
      "તેનું શીર્ષક છે, આ અઠવાડિયે વેચાયેલા ચાના કપ. તેની ચાવીમાં એક કપનું ચિત્ર 10 કપ છે. માહિતી શેના વિશે છે, તે કોણ કહે છે?",
    "Which tells what it is about?": "શેના વિશે છે, તે કોણ કહે?",
    "The key card gives the worth of one cup picture. Is that what the chart is about?": "ચાવી કાર્ડ એક કપના ચિત્રનું મૂલ્ય કહે છે. શું ચિત્રાલેખ તેના વિશે છે?",
    "Yes": "હા", "No": "ના", "the title": "શીર્ષક", "the key": "ચાવી",
    "Symbols times the key": "પ્રતીકોની ગણતરી ગુણ્યા ચાવી",
    "Count the symbols. Then use the key for each one.": "પ્રતીકો ગણો. પછી દરેક માટે ચાવી વાપરો.",
    "What does each one stand for?": "દરેક પ્રતીક કેટલાનું છે?",
    "Write the key under each picture, then add them all up.": "દરેક ચિત્ર નીચે ચાવી લખો, પછી બધું ઉમેરો.",
    "Count the symbols in the row, then take the key that many times.": "હારનાં પ્રતીકો ગણો, પછી ચાવીને એટલી વાર લો.",
    "You learned: a row is its symbols counted, times the key.": "તમે શીખ્યા: હારનું મૂલ્ય, પ્રતીક ગુણ્યા ચાવી.",
    "In a pictograph of umbrellas sold, one umbrella picture stands for 6 umbrellas. The row for June holds 7 umbrella pictures. How many umbrellas were sold in June?":
      "આ વેચાયેલી છત્રીઓનો ચિત્રાલેખ છે. એક છત્રીનું ચિત્ર 6 છત્રી બરાબર છે. જૂનની હારમાં છત્રીનાં 7 ચિત્રો છે. જૂનમાં કેટલી છત્રીઓ વેચાઈ?",
    "Umbrellas sold in June?": "જૂનમાં વેચાયેલી છત્રીઓ?",
    "The key counts once for every picture, not once for the row. How many pictures are in June?": "ચાવી દરેક ચિત્ર માટે એક વાર ગણો. આખી હાર માટે એક જ વાર નહીં. જૂનમાં કેટલાં ચિત્રો છે?",
    "One shell picture stands for 3 shells. The lit row holds 8 shell pictures. How many shells does it show?": "એક છીપનું ચિત્ર 3 છીપ બરાબર છે. ચમકતી હારમાં છીપનાં 8 ચિત્રો છે. તે કેટલી છીપ બતાવે છે?",
    "Shells in the lit row?": "ચમકતી હારમાં છીપ?",
    "That adds the key only once. Every picture in the row brings its own share.": "આમાં ચાવી ફક્ત એક જ વાર ઉમેરાઈ છે. હારનું દરેક ચિત્ર પોતાનો ભાગ લાવે છે.",
    "One car picture stands for 5 cars. Car parks A, B and C hold 9, 6 and 7 pictures. How many cars are in car park A?": "એક કારનું ચિત્ર 5 કાર બરાબર છે. પાર્કિંગ A, B અને Cમાં 9, 6 અને 7 ચિત્રો છે. પાર્કિંગ Aમાં કેટલી કાર છે?",
    "Cars in car park A?": "પાર્કિંગ Aમાં કાર?",
    "Those two numbers were added. How many times does park A use the key?": "એ બે સંખ્યાઓ ઉમેરાઈ. પાર્કિંગ Aમાં ચાવી કેટલી વાર વપરાય છે?",
    "Most, least and the same": "સૌથી વધુ, સૌથી ઓછું અને સરખું",
    "Which row is the longest? Which is the shortest? Are two the same?": "સૌથી લાંબી હાર કઈ છે? સૌથી ટૂંકી કઈ? શું બે સરખી છે?",
    "Do all the rows use the same key?": "શું બધી હારની ચાવી એક જ છે?",
    "Put the rows side by side on the rail, then read the one you need.": "હારોને પટ્ટી પર બાજુબાજુમાં મૂકો. પછી જોઈતી હાર વાંચો.",
    "With one key for every row, compare by numbers or by symbols. With different keys, compare only the numbers.":
      "ચાવી એક હોય, તો સંખ્યા કે પ્રતીકથી સરખાવો. ચાવીઓ જુદી હોય, તો ફક્ત સંખ્યાઓથી.",
    "You learned: with one key, the longest row stands for the most.": "તમે શીખ્યા: ચાવી એક હોય, તો લાંબી હાર વધુ.",
    "A pictograph shows visitors to a book fair, one person picture for 10 visitors. Monday holds 6 pictures, Tuesday 9, Wednesday 4 and Thursday 6. How many visitors came on the busiest day?":
      "આ પુસ્તક મેળાના મુલાકાતીઓનો ચિત્રાલેખ છે. એક વ્યક્તિનું ચિત્ર 10 મુલાકાતી બરાબર છે. સોમવારનાં 6 ચિત્રો છે, મંગળવારનાં 9. બુધવારનાં 4 છે અને ગુરુવારનાં 6. સૌથી ભીડવાળા દિવસે કેટલા મુલાકાતી આવ્યા?",
    "Visitors on the busiest day?": "સૌથી ભીડવાળા દિવસે મુલાકાતી?",
    "That is how many pictures, not how many visitors. Use the key on the longest row.": "આ ચિત્રોની ગણતરી છે, મુલાકાતીઓની નહીં. સૌથી લાંબી હાર પર ચાવી વાપરો.",
    "One leaf picture stands for 4 leaves. Groups A, B, C and D hold 5, 8, 3 and 5 leaf pictures. Two groups collected the same number. How many leaves did each of those two collect?":
      "એક પાંદડાનું ચિત્ર 4 પાંદડાં બરાબર છે. જૂથ A, B, C અને Dમાં 5, 8, 3 અને 5 ચિત્રો છે. બે જૂથોએ સરખાં પાંદડાં ભેગાં કર્યાં. એ બેમાંથી દરેકે કેટલાં ભેગાં કર્યાં?",
    "Leaves in each equal row?": "દરેક સરખી હારમાં પાંદડાં?",
    "Which two rows are just as long as each other? Read one of them with the key.": "કઈ બે હાર એકસરખી લાંબી છે? તેમાંથી એકને ચાવીથી વાંચો.",
    "One bowl picture stands for 8 bowls of rice served. Monday holds 3 bowl pictures, Tuesday 6, Wednesday 5 and Thursday 2. How many bowls were served on the day with the fewest?":
      "એક વાટકાનું ચિત્ર ભાતના 8 વાટકા બરાબર છે. સોમવારનાં 3 ચિત્રો છે, મંગળવારનાં 6. બુધવારનાં 5 છે અને ગુરુવારનાં 2. સૌથી ઓછાવાળા દિવસે કેટલા વાટકા પીરસાયા?",
    "Bowls on the day with fewest?": "સૌથી ઓછાવાળા દિવસે વાટકા?",
    "The shortest row has the fewest. What is each of its pictures worth?": "સૌથી ટૂંકી હારમાં સૌથી ઓછા છે. તેનું દરેક ચિત્ર કેટલાનું છે?",
    "Read only the row asked": "ફક્ત પૂછેલી હાર વાંચો",
    "Which row does the question ask about? Read that one.": "પ્રશ્ન કઈ હાર વિશે પૂછે છે? એ જ વાંચો.",
    "Does it ask about one row, or about all of them?": "એ એક હાર વિશે પૂછે છે, કે બધી વિશે?",
    "Light just that row, count its pictures, then use the key.": "એ જ હાર ચમકાવો, ચિત્રો ગણો, પછી ચાવી વાપરો.",
    "Read only the row a question asks about. Add every row only when it asks for all of them.": "પ્રશ્ન જે હાર પૂછે, ફક્ત એ જ વાંચો. બધી હાર ત્યારે જ ઉમેરો, જ્યારે બધીનું પૂછે.",
    "You learned: answer from the row asked; add all rows only for a total.": "તમે શીખ્યા: પૂછેલી હારથી જવાબ આપો. કુલ માટે જ બધી ઉમેરો.",
    "A pictograph shows the sport each child in a class chose, one face for 5 children. Swimming has 6 faces, chess 3, skating 4 and football 8. How many children chose chess?":
      "આમાં વર્ગનાં બાળકોની પસંદની રમતો છે. એક ચહેરો 5 બાળકો બરાબર છે. તરણના 6 ચહેરા છે, શતરંજના 3. સ્કેટિંગના 4 છે અને ફૂટબોલના 8. કેટલાં બાળકોએ શતરંજ પસંદ કરી?",
    "How many chose chess?": "શતરંજ કેટલાંએ પસંદ કરી?",
    "Adding every row counts every sport, not just one.": "બધી હાર ઉમેરવાથી બધી રમતો ગણાય, ફક્ત એક નહીં.",
    "A pictograph of fruit sold at a stall has one fruit picture for 6 fruits. It holds 5 pictures for apples, 2 for pears, 7 for plums and 4 for figs. How many pears were sold?":
      "આ લારી પર વેચાયેલાં ફળનો ચિત્રાલેખ છે. એક ફળનું ચિત્ર 6 ફળ બરાબર છે. સફરજનનાં 5 ચિત્રો છે, નાસપતીનાં 2. આલુનાં 7 છે અને અંજીરનાં 4. કેટલી નાસપતી વેચાઈ?",
    "How many pears were sold?": "કેટલી નાસપતી વેચાઈ?",
    "Is that the pears row, or a row beside it? Light the pears row.": "એ નાસપતીની હાર છે, કે બાજુની? નાસપતીની હાર ચમકાવો.",
    "A pictograph of four clubs has one face for 3 children. It holds 4 faces for art, 6 for music, 5 for dance and 3 for science. Each child is in one club. How many children are in the dance club, and how many are in the four clubs together?":
      "આ ચાર ક્લબનો ચિત્રાલેખ છે. એક ચહેરો 3 બાળકો બરાબર છે. કલાના 4 ચહેરા છે, સંગીતના 6. નૃત્યના 5 છે અને વિજ્ઞાનના 3. દરેક બાળક એક જ ક્લબમાં છે. નૃત્ય ક્લબમાં કેટલાં બાળકો છે? અને ચારેય ક્લબમાં મળીને કેટલાં?",
    "Dance club, then all four clubs?": "નૃત્ય ક્લબ, પછી ચારેય ક્લબ?",
    "The first box is one club. The second box counts every club, not one.": "પહેલું ખાનું એક ક્લબ છે. બીજું ખાનું દરેક ક્લબ ગણે છે, એક નહીં.",
    "Asha": "આશા", "Ravi": "રવિ", "dance": "નૃત્ય", "together": "કુલ",
    "Chart 1: Apples Picked": "ચિત્રાલેખ 1: તોડેલાં સફરજન", "Chart 2: Apples Picked": "ચિત્રાલેખ 2: તોડેલાં સફરજન",
    "Fish Caught by Three Boats": "ત્રણ હોડીએ પકડેલી માછલીઓ", "Cups of Tea Sold This Week": "આ અઠવાડિયે વેચાયેલા ચાના કપ",
    "Umbrellas Sold": "વેચાયેલી છત્રીઓ", "Shells Collected": "ભેગી કરેલી છીપ", "Cars in Three Car Parks": "ત્રણ પાર્કિંગમાં કાર",
    "Visitors to the Book Fair": "પુસ્તક મેળાના મુલાકાતીઓ", "Leaves Collected": "ભેગાં કરેલાં પાંદડાં", "Bowls of Rice Served": "પીરસેલા ભાતના વાટકા",
    "Sport Each Child Chose": "દરેક બાળકે પસંદ કરેલી રમત", "Fruit Sold at a Stall": "લારી પર વેચાયેલાં ફળ", "Children in Four Clubs": "ચાર ક્લબમાં બાળકો",
    "Boat A": "હોડી A", "Boat B": "હોડી B", "Boat C": "હોડી C",
    "Mon": "સોમ", "Tue": "મંગળ", "Wed": "બુધ", "Thu": "ગુરુ", "May": "મે", "June": "જૂન", "July": "જુલાઈ",
    "Anu": "અનુ", "Dev": "દેવ", "Mira": "મીરા", "Park A": "પાર્કિંગ A", "Park B": "પાર્કિંગ B", "Park C": "પાર્કિંગ C",
    "Group A": "જૂથ A", "Group B": "જૂથ B", "Group C": "જૂથ C", "Group D": "જૂથ D",
    "Swimming": "તરણ", "Chess": "શતરંજ", "Skating": "સ્કેટિંગ", "Football": "ફૂટબોલ",
    "Apples": "સફરજન", "Pears": "નાસપતી", "Plums": "આલુ", "Figs": "અંજીર",
    "Art": "કલા", "Music": "સંગીત", "Dance": "નૃત્ય", "Science": "વિજ્ઞાન",
    "apples": "સફરજન", "fish": "માછલીઓ", "cups": "કપ", "umbrellas": "છત્રીઓ", "shells": "છીપ", "cars": "કાર",
    "visitors": "મુલાકાતી", "leaves": "પાંદડાં", "bowls": "વાટકા", "children": "બાળકો", "fruits": "ફળ",
    "Key": "ચાવી", "missing": "નથી", "most": "સૌથી વધુ", "least": "સૌથી ઓછું", "total for all rows": "બધી હારનો સરવાળો",
    "rows read": "વાંચેલી હાર", "all rows": "બધી હાર", "next chart": "નવો ચિત્રાલેખ",
    "No key: can't tell": "ચાવી નથી: કહી ન શકાય", "Title: what is counted": "શીર્ષક: શું ગણ્યું છે",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone)
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the spoken question; ask = the short prompt above the slot (<= 3 lines of ~15 chars)
           answer what the slot or the working area must produce; miss = rung 1, never the answer
           choices? [{ id, label }] for a word answer; pad?: "enter" when it is made on the working area
           parts?  [{ label, unit? }, …] with answer [a, b]: two boxes in the slot (quotient · remainder;
                   label at most 10 characters, e.g. { label: "each bowl", unit: "mL" }); typed reads "16|1".
                   A fraction: parts: SLOT_FRACTION, answer [3, 4] (drawn stacked). A mixed number or a
                   tidied answer: parts: SLOT_MIXED, answer [1, 2, 3] · [5, null, null] · [null, 7, 10]
                   (null = that box stays empty; the slot never says which kind the answer is)
                   A decimal: answer "0.09", a string in its written form (so "0.30" is not "0.3" and ".3"
                   is not "0.3"), with pointKey: true in the tool object below (the pad's point key) */
const PHASES = [
  {
    n: 1,
    concept: "The key says what one symbol stands for",
    conceptId: "M2.S3.T4.C12", objectiveIds: ["O5"],
    says: ["How many does this row stand for? What do you need to know first?"],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: what does the key card say? Second rung, the phase's: what is this pictograph about? Third rung: the board is cut to one row of two symbols with the key turned, and the child reads that one row. The number keys stay open behind all three rungs. */
    ladder: ["What is this pictograph about?", "Turn the key card first. Then read one row at a time."],
    closing: "The key says what one symbol stands for, and the title says what the data is about.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: the key gives a symbol's worth; the title tells the topic.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Each key card turns, each row is read with its key written under every symbol as a running sum, and each row's number lands in its tag.",
    items: [
      /* learn ML1: answer in the plan = 6 apples in the first row and 30 in the second.
         Two boxes named by the rows (Asha, Ravi). The keys are on the two face-down cards, not in the voice: turning them is the act. */
      { qid: "M2.S3.T4.C12:ML1", kind: "twokeys", charts: ["apples1", "apples2"], faceDown: true,
        parts: [{ label: "Asha" }, { label: "Ravi" }], answer: [6, 30], near: "3|3", winMs: 3000,
        say: "Two pictographs each show a row of 3 apple pictures. Their keys are different. Turn each key card. How many apples does each row show?",
        ask: "Apples in each row?", miss: "Pictures are not apples yet. Each chart has its own card for what one picture is worth." },
      /* practice 1: answer in the plan = No. Without the key you cannot tell what one fish picture stands for.
         The voice leaves the missing key to the board: the dashed card says it, and noticing it is the question. */
      { qid: "M2.S3.T4.C12:1", kind: "nokey", charts: ["fish"], lit: 0,
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], answer: "no", near: "yes", winMs: 2200,
        say: "This pictograph has rows of fish pictures. Can you tell how many fish one row shows?",
        ask: "Can you tell the fish in a row?", miss: "Counting gives pictures, not fish. What would say how many fish one picture is?" },
      /* practice 2: answer in the plan = The title says what the data is about, the cups of tea sold this week. The key says one cup picture stands for 10 cups.
         A choice: which of the two tells what the data is about (the key's half is said in the question). */
      { qid: "M2.S3.T4.C12:2", kind: "title", charts: ["tea"], faceDown: true,
        choices: [{ id: "title", label: "the title" }, { id: "key", label: "the key" }], answer: "title", near: "key", winMs: 2400,
        say: "This pictograph is titled Cups of Tea Sold This Week. Its key reads one cup picture for 10 cups. Which one tells you what the data is about?",
        ask: "Which tells what it is about?", miss: "The key card gives the worth of one cup picture. Is that what the chart is about?" },
    ],
  },
  {
    n: 2,
    concept: "Symbols times the key",
    conceptId: "M2.S3.T4.C13", objectiveIds: ["O5"],
    says: ["Count the symbols. Then use the key for each one."],
    /* tries, as the plan writes it: First rung, from the item: how many symbols are in the row? Second rung, the phase's: what does each one stand for? Third rung: the row is cut to two symbols, and the child writes the key under each and adds. The number keys stay open. */
    ladder: ["What does each one stand for?", "Write the key under each picture, then add them all up."],
    closing: "Count the symbols in the row, then take the key that many times.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a row is its symbols counted, times the key.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The asked row is lit and read: the key is added under each symbol as a running sum until the row's number lands in its tag.",
    items: [
      /* learn ML2: answer in the plan = 42 umbrellas */
      { qid: "M2.S3.T4.C13:ML2", kind: "times", charts: ["umbrellas"], row: 1, lit: 1, answer: 42, near: 13, winMs: 2800,
        say: "In a pictograph of umbrellas sold, one umbrella picture stands for 6 umbrellas. The row for June holds 7 umbrella pictures. How many umbrellas were sold in June?",
        ask: "Umbrellas sold in June?", miss: "The key counts once for every picture, not once for the row. How many pictures are in June?" },
      /* practice 3: answer in the plan = 24 shells, because 8 x 3 = 24 */
      { qid: "M2.S3.T4.C13:3", kind: "times", charts: ["shells"], row: 1, lit: 1, answer: 24, near: 11, winMs: 2800,
        say: "One shell picture stands for 3 shells. The lit row holds 8 shell pictures. How many shells does it show?",
        ask: "Shells in the lit row?", miss: "That adds the key only once. Every picture in the row brings its own share." },
      /* practice 4: answer in the plan = 45, 30 and 35 cars. One box: car park A, the longest product of the three */
      { qid: "M2.S3.T4.C13:4", kind: "times", charts: ["cars"], row: 0, lit: 0, answer: 45, near: 14, winMs: 3000,
        say: "One car picture stands for 5 cars. Car parks A, B and C hold 9, 6 and 7 pictures. How many cars are in car park A?",
        ask: "Cars in car park A?", miss: "Those two numbers were added. How many times does park A use the key?" },
    ],
  },
  {
    n: 3,
    concept: "Most, least and the same",
    conceptId: "M2.S3.T4.C14", objectiveIds: ["O6"],
    says: ["Which row is the longest? Which is the shortest? Are two the same?"],
    /* tries, as the plan writes it: First rung, from the item: which row has the most symbols? Second rung, the phase's: do all the rows use the same key? Third rung: the board is cut to two rows, and the child places both on the rail. The number keys and the row names stay open. */
    ladder: ["Do all the rows use the same key?", "Put the rows side by side on the rail, then read the one you need."],
    closing: "With one key for every row, compare by numbers or by symbols. With different keys, compare only the numbers.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: with one key, the longest row stands for the most.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Every row stands on the compare rail with its number, largest at the top, then the asked row is lit and read with its key until its number lands in its tag.",
    items: [
      /* learn ML3: answer in the plan = Tuesday the most, 90; Wednesday the fewest, 40; Monday and Thursday the same, 60 each.
         One box: the most (the misconception is the 9 symbols); the fewest and the same are the next two questions. */
      { qid: "M2.S3.T4.C14:ML3", kind: "most", charts: ["fair"], rail: true, answer: 90, near: 9, winMs: 3000,
        say: "A pictograph shows visitors to a book fair, one person picture for 10 visitors. Monday holds 6 pictures, Tuesday 9, Wednesday 4 and Thursday 6. How many visitors came on the busiest day?",
        ask: "Visitors on the busiest day?", miss: "That is how many pictures, not how many visitors. Use the key on the longest row." },
      /* practice 5: answer in the plan = Groups A and D, 20 leaves each */
      { qid: "M2.S3.T4.C14:5", kind: "same", charts: ["leaves"], rail: true, answer: 20, near: 5, winMs: 3200,
        say: "One leaf picture stands for 4 leaves. Groups A, B, C and D hold 5, 8, 3 and 5 leaf pictures. Two groups collected the same number. How many leaves did each of those two collect?",
        ask: "Leaves in each equal row?", miss: "Which two rows are just as long as each other? Read one of them with the key." },
      /* practice 6: answer in the plan = Tuesday the most, 48 bowls; Thursday the fewest, 16 bowls. One box: the fewest */
      { qid: "M2.S3.T4.C14:6", kind: "least", charts: ["bowls"], rail: true, answer: 16, near: 2, winMs: 3000,
        say: "One bowl picture stands for 8 bowls of rice served. Monday holds 3 bowl pictures, Tuesday 6, Wednesday 5 and Thursday 2. How many bowls were served on the day with the fewest?",
        ask: "Bowls on the day with fewest?", miss: "The shortest row has the fewest. What is each of its pictures worth?" },
    ],
  },
  {
    n: 4,
    concept: "Read only the row asked",
    conceptId: "M2.S3.T4.C15", objectiveIds: ["O6"],
    says: ["Which row does the question ask about? Read that one."],
    /* tries, as the plan writes it: First rung, from the item: which row does the question name? Second rung, the phase's: does it ask about one row, or about all of them? Third rung: the board is cut to two rows, one lit, and the child reads the lit one. The number keys stay open. */
    ladder: ["Does it ask about one row, or about all of them?", "Light just that row, count its pictures, then use the key."],
    closing: "Read only the row a question asks about. Add every row only when it asks for all of them.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: answer from the row asked; add all rows only for a total.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Only the asked row is lit and read with its key until its number lands in its tag; the total for all the rows sits apart in the strip under the board.",
    items: [
      /* learn ML4: answer in the plan = 15 children */
      { qid: "M2.S3.T4.C15:ML4", kind: "one", charts: ["sports"], row: 1, allRows: true, answer: 15, near: 105, winMs: 3000,
        say: "A pictograph shows the sport each child in a class chose, one face for 5 children. Swimming has 6 faces, chess 3, skating 4 and football 8. How many children chose chess?",
        ask: "How many chose chess?", miss: "Adding every row counts every sport, not just one." },
      /* practice 7: answer in the plan = 12 pears. Read only the pears row: 2 x 6 = 12 */
      { qid: "M2.S3.T4.C15:7", kind: "one", charts: ["fruit"], row: 1, allRows: true, answer: 12, near: 30, winMs: 3000,
        say: "A pictograph of fruit sold at a stall has one fruit picture for 6 fruits. It holds 5 pictures for apples, 2 for pears, 7 for plums and 4 for figs. How many pears were sold?",
        ask: "How many pears were sold?", miss: "Is that the pears row, or a row beside it? Light the pears row." },
      /* practice 8: answer in the plan = 15 in the dance club, and 54 in all, because 12 + 18 + 15 + 9 = 54. Two boxes */
      { qid: "M2.S3.T4.C15:8", kind: "both", charts: ["clubs"], row: 2, allRows: true,
        parts: [{ label: "dance" }, { label: "together" }], answer: [15, 54], near: "15|15", winMs: 3600,
        say: "A pictograph of four clubs has one face for 3 children. It holds 4 faces for art, 6 for music, 5 for dance and 3 for science. Each child is in one club. How many children are in the dance club, and how many are in the four clubs together?",
        ask: "Dance club, then all four clubs?", miss: "The first box is one club. The second box counts every club, not one." },
    ],
  },
];

/* The pictographs the tool draws: a title, one symbol for every row, a key (what one symbol stands for;
   null = the chart has no key), the unit, and each row's name and number of symbols. `rail` is the short
   name the compare rail writes. Every symbol is green (no chart here names its rows by colour). */
const PG_BOARDS: any = {
  apples1: { title: "Chart 1: Apples Picked", sym: "apple", unit: "apples", key: 2, rows: [{ name: "Asha", n: 3 }] },
  apples2: { title: "Chart 2: Apples Picked", sym: "apple", unit: "apples", key: 10, rows: [{ name: "Ravi", n: 3 }] },
  fish: { title: "Fish Caught by Three Boats", sym: "fish", unit: "fish", key: null,
    rows: [{ name: "Boat A", n: 4 }, { name: "Boat B", n: 6 }, { name: "Boat C", n: 3 }] },
  tea: { title: "Cups of Tea Sold This Week", sym: "cup", unit: "cups", key: 10,
    rows: [{ name: "Mon", n: 5 }, { name: "Tue", n: 3 }, { name: "Wed", n: 6 }, { name: "Thu", n: 4 }] },
  umbrellas: { title: "Umbrellas Sold", sym: "umbrella", unit: "umbrellas", key: 6,
    rows: [{ name: "May", n: 4 }, { name: "June", n: 7 }, { name: "July", n: 5 }] },
  shells: { title: "Shells Collected", sym: "shell", unit: "shells", key: 3,
    rows: [{ name: "Anu", n: 5 }, { name: "Dev", n: 8 }, { name: "Mira", n: 6 }] },
  cars: { title: "Cars in Three Car Parks", sym: "car", unit: "cars", key: 5,
    rows: [{ name: "Park A", n: 9 }, { name: "Park B", n: 6 }, { name: "Park C", n: 7 }] },
  fair: { title: "Visitors to the Book Fair", sym: "person", unit: "visitors", key: 10,
    rows: [{ name: "Mon", n: 6 }, { name: "Tue", n: 9 }, { name: "Wed", n: 4 }, { name: "Thu", n: 6 }] },
  leaves: { title: "Leaves Collected", sym: "leaf", unit: "leaves", key: 4,
    rows: [{ name: "Group A", n: 5, rail: "A" }, { name: "Group B", n: 8, rail: "B" }, { name: "Group C", n: 3, rail: "C" }, { name: "Group D", n: 5, rail: "D" }] },
  bowls: { title: "Bowls of Rice Served", sym: "bowl", unit: "bowls", key: 8,
    rows: [{ name: "Mon", n: 3 }, { name: "Tue", n: 6 }, { name: "Wed", n: 5 }, { name: "Thu", n: 2 }] },
  sports: { title: "Sport Each Child Chose", sym: "face", unit: "children", key: 5,
    rows: [{ name: "Swimming", n: 6 }, { name: "Chess", n: 3 }, { name: "Skating", n: 4 }, { name: "Football", n: 8 }] },
  fruit: { title: "Fruit Sold at a Stall", sym: "basket", unit: "fruits", key: 6,
    rows: [{ name: "Apples", n: 5 }, { name: "Pears", n: 2 }, { name: "Plums", n: 7 }, { name: "Figs", n: 4 }] },
  clubs: { title: "Children in Four Clubs", sym: "face", unit: "children", key: 3,
    rows: [{ name: "Art", n: 4 }, { name: "Music", n: 6 }, { name: "Dance", n: 5 }, { name: "Science", n: 3 }] },
};
/* Free play: any of these charts, with any of these keys */
const PG_FREE = ["tea", "umbrellas", "shells", "cars", "fair", "leaves", "bowls", "sports", "fruit", "clubs"];
const PG_KEYS = [2, 3, 4, 5, 6, 8, 10];
/* the board's geometry, in working-area units: a row is 80 tall on an 88 pitch (a 72 finger box each, no
   overlap), its name in a 172-wide cell, its symbols 48 wide on a 58 pitch from x 182, then its tag */
const PG = { w: 840, first: 56, pitch: 88, rowH: 80, sx: 182, step: 58, sym: 48, keyX: 860, keyW: 220, railY: 204, place: 52, stripY: 446 };
/* the chapter's own colours: amber for what a symbol is worth once read, reddish purple for a total of every
   row, a pale sky band behind the row a question asks about */
const PG_AMBER = shade(CONTENT.ten, 0.45);
const PG_TOTAL = shade(CONTENT.bead, 0.4);
const PG_SKY = tint("#56B4E9", 0.78);

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { boards: PG_BOARDS, freeCharts: PG_FREE, freeKeys: PG_KEYS, layout: PG };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers; a choice by its id) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from the chart itself, by repeated addition down the row (never a
   product), with the row picked by its own rule; it shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const bs = (it.charts || []).map((id: string) => PG_BOARDS[id]);
  if (!bs.length || bs.some((b: any) => !b)) return false;
  const worth = (b: any, r: number) => { let s = 0; for (let k = 0; k < b.rows[r].n; k++) s += b.key; return s; };
  const b = bs[0], counts = b.rows.map((r: any) => r.n);
  switch (it.kind) {
    case "twokeys": return bs.length === 2 && it.answer[0] === worth(bs[0], 0) && it.answer[1] === worth(bs[1], 0);
    case "nokey": return b.key === null && it.answer === "no";
    case "title": return b.key !== null && typeof b.title === "string" && it.answer === "title";
    case "times": case "one": return it.answer === worth(b, it.row);
    case "most": { let m = 0; counts.forEach((c: number, r: number) => { if (c > counts[m]) m = r; }); return counts.filter((c: number) => c === counts[m]).length === 1 && it.answer === worth(b, m); }
    case "least": { let m = 0; counts.forEach((c: number, r: number) => { if (c < counts[m]) m = r; }); return counts.filter((c: number) => c === counts[m]).length === 1 && it.answer === worth(b, m); }
    case "same": {
      const pairs: number[] = [];
      counts.forEach((c: number, r: number) => { if (counts.indexOf(c) !== r) pairs.push(counts.indexOf(c)); });
      return pairs.length === 1 && it.answer === worth(b, pairs[0]);
    }
    case "both": { let all = 0; b.rows.forEach((_: any, r: number) => { all += worth(b, r); }); return it.answer[0] === worth(b, it.row) && it.answer[1] === all; }
    default: return false;
  }
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near
  : item.parts ? item.answer.map((x: any, k: number, a: any[]) => (x !== null && a.slice(k + 1).every((y: any) => y === null) ? x + 1 : x ?? "")).join("|")
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print. A choice item has none: its
   question has to name both of its choices ("no key", "the title"), and the answer is a tap, not a number. */
const answerForms = (item: any) => (item.choices ? []
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : /^\d*\.\d+$/.test(String(item.answer)) ? [String(item.answer), speakable(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* what the slot shows for a word answer: the choice's own label ("the key", "Yes"), never its id; a number
   is shown as typed. The runtime then looks the label up in TR for Hindi and Gujarati. */
const PG_SAID: any = { yes: "Yes", no: "No", title: "the title", key: "the key" };
const format = (v: any, _i?: any, o?: any) => (PG_SAID[String(v)] !== undefined ? (o && o.tx ? o.tx(PG_SAID[String(v)]) : PG_SAID[String(v)]) : v);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
/* one pictograph symbol, drawn in a 48 box and scaled to s (called, never mounted) */
function pgIcon(kind: string, x: number, y: number, s: number, fill: string, edge: string) {
  const sw = 2.2;
  let body: any = null;
  switch (kind) {
    case "apple": body = (
      <g>
        <path d="M24 13 C 16 7, 5 11, 6 25 C 7 37, 15 45, 24 41 C 33 45, 41 37, 42 25 C 43 11, 32 7, 24 13 Z" fill={fill} stroke={edge} strokeWidth={sw} />
        <path d="M24 13 C 24 9, 25 6, 28 3" fill="none" stroke={edge} strokeWidth={3} strokeLinecap="round" />
        <path d="M28 8 C 32 3, 38 4, 40 6 C 36 10, 31 10, 28 8 Z" fill={fill} stroke={edge} strokeWidth={1.6} />
      </g>); break;
    case "fish": body = (
      <g>
        <path d="M4 24 C 10 13, 26 11, 34 24 C 26 37, 10 35, 4 24 Z" fill={fill} stroke={edge} strokeWidth={sw} />
        <path d="M33 24 L 45 14 L 43 24 L 45 34 Z" fill={fill} stroke={edge} strokeWidth={sw} strokeLinejoin="round" />
        <circle cx={12} cy={22} r={2.6} fill={edge} />
      </g>); break;
    case "cup": body = (
      <g>
        <path d="M7 14 H 35 L 32 38 C 31 41, 29 42, 26 42 H 16 C 13 42, 11 41, 10 38 Z" fill={fill} stroke={edge} strokeWidth={sw} strokeLinejoin="round" />
        <path d="M34 19 C 44 18, 45 31, 32 32" fill="none" stroke={edge} strokeWidth={3} strokeLinecap="round" />
        <path d="M4 45 H 38" stroke={edge} strokeWidth={3} strokeLinecap="round" />
        <path d="M15 4 C 13 7, 17 8, 15 11 M 24 3 C 22 6, 26 7, 24 10" fill="none" stroke={edge} strokeWidth={2} strokeLinecap="round" />
      </g>); break;
    case "umbrella": body = (
      <g>
        <path d="M3 25 C 4 12, 14 5, 24 5 C 34 5, 44 12, 45 25 C 41 21, 37 21, 34 25 C 31 21, 27 21, 24 25 C 21 21, 17 21, 14 25 C 11 21, 7 21, 3 25 Z" fill={fill} stroke={edge} strokeWidth={sw} strokeLinejoin="round" />
        <path d="M24 25 V 40 C 24 45, 17 45, 17 40" fill="none" stroke={edge} strokeWidth={3} strokeLinecap="round" />
      </g>); break;
    case "shell": body = (
      <g>
        <path d="M24 42 L 5 21 C 7 10, 15 5, 24 5 C 33 5, 41 10, 43 21 Z" fill={fill} stroke={edge} strokeWidth={sw} strokeLinejoin="round" />
        <path d="M24 42 L 13 8 M 24 42 L 24 5 M 24 42 L 35 8" stroke={edge} strokeWidth={1.8} fill="none" />
        <path d="M18 41 H 30 V 46 H 18 Z" fill={fill} stroke={edge} strokeWidth={1.6} />
      </g>); break;
    case "car": body = (
      <g>
        <path d="M11 22 L 15 12 C 16 10, 17 9, 19 9 H 29 C 31 9, 32 10, 33 12 L 37 22 Z" fill={fill} stroke={edge} strokeWidth={sw} strokeLinejoin="round" />
        <rect x={3} y={21} width={42} height={15} rx={6} fill={fill} stroke={edge} strokeWidth={sw} />
        <path d="M18 13 H 23 V 21 H 15 Z M 26 13 H 30 L 33 21 H 26 Z" fill="#FFFFFF" />
        <circle cx={13} cy={37} r={5.5} fill={edge} />
        <circle cx={35} cy={37} r={5.5} fill={edge} />
      </g>); break;
    case "person": body = (
      <g>
        <circle cx={24} cy={12} r={8} fill={fill} stroke={edge} strokeWidth={sw} />
        <path d="M8 44 C 8 29, 15 23, 24 23 C 33 23, 40 29, 40 44 Z" fill={fill} stroke={edge} strokeWidth={sw} strokeLinejoin="round" />
      </g>); break;
    case "leaf": body = (
      <g>
        <path d="M6 42 C 5 22, 20 6, 43 5 C 44 27, 29 43, 6 42 Z" fill={fill} stroke={edge} strokeWidth={sw} strokeLinejoin="round" />
        <path d="M8 40 C 18 30, 28 20, 38 10" fill="none" stroke={edge} strokeWidth={2} strokeLinecap="round" />
      </g>); break;
    case "basket": body = ( /* a basket of round fruit: one symbol for any fruit, so no row shows another row's fruit */
      <g>
        <circle cx={15} cy={19} r={7} fill={fill} stroke={edge} strokeWidth={1.8} />
        <circle cx={33} cy={19} r={7} fill={fill} stroke={edge} strokeWidth={1.8} />
        <circle cx={24} cy={15} r={7.5} fill={fill} stroke={edge} strokeWidth={1.8} />
        <path d="M4 24 H 44 L 38 44 H 10 Z" fill={fill} stroke={edge} strokeWidth={sw} strokeLinejoin="round" />
        <path d="M7 31 H 41 M 9 38 H 39 M 17 24 L 19 44 M 31 24 L 29 44" fill="none" stroke={edge} strokeWidth={1.6} />
      </g>); break;
    case "bowl": body = (
      <g>
        <path d="M9 22 C 11 11, 37 11, 39 22 Z" fill="#FFFFFF" stroke={edge} strokeWidth={sw} />
        <path d="M3 22 H 45 C 45 33, 36 40, 24 40 C 12 40, 3 33, 3 22 Z" fill={fill} stroke={edge} strokeWidth={sw} strokeLinejoin="round" />
        <path d="M17 40 H 31 L 29 45 H 19 Z" fill={fill} stroke={edge} strokeWidth={1.6} />
      </g>); break;
    default: body = (
      <g>
        <circle cx={24} cy={24} r={19} fill={fill} stroke={edge} strokeWidth={sw} />
        <circle cx={17} cy={20} r={2.6} fill={edge} />
        <circle cx={31} cy={20} r={2.6} fill={edge} />
        <path d="M15 29 C 19 35, 29 35, 33 29" fill="none" stroke={edge} strokeWidth={2.4} strokeLinecap="round" />
      </g>);
  }
  return <g transform={`translate(${x},${y}) scale(${s / 48})`} pointerEvents="none">{body}</g>;
}

/* a symbol opened like a paper packet: the key's worth of small amber counters inside (called, never mounted) */
function pgPacket(x: number, y: number, kv: number, green: string, edge: string) {
  const cols = kv <= 4 ? 2 : kv <= 9 ? 3 : 4, rows = Math.ceil(kv / cols), p = 11;
  const x0 = x + 24 - ((cols - 1) * p) / 2, y0 = y + 24 - ((rows - 1) * p) / 2;
  return (
    <g pointerEvents="none">
      <rect x={x} y={y} width={48} height={48} rx={8} fill={tint(green, 0.85)} stroke={edge} strokeWidth={2} />
      {Array.from({ length: kv }).map((_: any, j: number) => (
        <circle key={j} cx={x0 + (j % cols) * p} cy={y0 + Math.floor(j / cols) * p} r={4.5} fill={CONTENT.ten} stroke={shade(CONTENT.ten, 0.35)} strokeWidth={1} />
      ))}
    </g>
  );
}

/* a rough drawn width for a label in any of the three languages, in bold Poppins (measured in the page, within
   about 5 %): a Latin letter 0.6 of the font size (M, W, m, w 0.88; another capital 0.68; i, l, j, t, f, r 0.35);
   a Devanagari or Gujarati letter 0.72, a vowel letter 0.95, a vowel sign beside a letter 0.35, a mark above or
   below a letter nothing, a half letter (letter + virama) 0.42 and a reph (र्) nothing. Gujarati sits 0x180
   above Devanagari, sign for sign. */
function pgWide(s: string, fs: number) {
  let w = 0, prev = 0;
  for (const ch of String(s)) {
    const c = ch.charCodeAt(0);
    if (c < 0x0900 || c > 0x0aff) { w += (/[MWmw]/.test(ch) ? 0.88 : /[A-Z]/.test(ch) ? 0.68 : /[iljtfr ]/.test(ch) ? 0.35 : 0.6) * fs; prev = 0; continue; }
    const k = (c >= 0x0a80 ? c - 0x0180 : c) - 0x0900;
    if (k === 0x4d) w -= (prev === 0x30 ? 0.72 : 0.3) * fs;
    else if (k <= 0x02 || k === 0x3c || (k >= 0x41 && k <= 0x48) || (k >= 0x51 && k <= 0x57) || k === 0x62 || k === 0x63) { /* above or below */ }
    else w += ((k >= 0x3e && k <= 0x4c) ? 0.35 : (k >= 0x05 && k <= 0x14) ? 0.95 : 0.72) * fs;
    prev = k;
  }
  return w;
}
/* how far a label's marks reach above and below its baseline, roughly, in bold at size fs: a mark above the
   letters (ि ी े ै ो ौ ं ँ ॉ, a reph, a vowel letter that carries one) to about 1.08 of the size, else 0.75; a
   mark below (ु ू ृ ़) to about 0.36, a letter that hangs a little (ज्ञ, the Gujarati જ ફ ણ) 0.2, else 0.04.
   Only to centre a Hindi or Gujarati label in its box. */
function pgInk(s: string, fs: number) {
  const up = /[ँंईऐओऔिीॅ-ौઁંઈઐઓઔિીૅ-ૌ]|र्|ર્/.test(s);
  const dn = /[़ु-ॄॢॣ઼ુ-ૄૢૣ]/.test(s) ? 0.36
    : /ज्ञ|[જણફ]/.test(s) ? 0.2 : 0.04;
  return { a: (up ? 1.08 : 0.75) * fs, d: dn * fs };
}

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const tl = useTimeline();   /* the tool's own motion: a win, or a correction (the pad is locked while it runs) */
  const tc = useTimeline();   /* the child's own act: a row being read */
  const tk = useTimeline();   /* a key card turning */
  const free = stage === "free";
  const [fi, setFi] = useState(0);    /* Free play: which chart */
  const [fk, setFk] = useState(-1);   /* Free play: which key (-1: the chart's own) */
  const charts: any[] = free ? [PG_BOARDS[PG_FREE[fi]]] : (item.charts || ["tea"]).map((c: string) => PG_BOARDS[c]);
  const keyOf = (ci: number) => (free && fk >= 0 ? PG_KEYS[fk] : charts[ci].key);
  /* the board belongs to one question (or one Free play chart and key): a new one starts clean */
  const tag = free ? `free:${fi}:${fk}` : `item:${index}`;
  const blank = () => ({
    at: tag, turned: charts.map(() => free || !item.faceDown), sx: charts.map(() => 1),
    lit: !free && item.lit !== undefined ? ["0:" + item.lit] : [], cur: null, k: 0, count: 0,
    marks: {}, tags: {}, read: [], rail: [], railNums: false, total: null,
    titleLit: false, note: null, tries: [], outline: null, open: null,
  });
  const [st, setSt] = useState<any>(blank);
  const S: any = st.at === tag ? st : blank();
  const put = (f: any) => setSt((p: any) => { const b = p.at === tag ? p : blank(); return { ...b, ...(typeof f === "function" ? f(b) : f) }; });
  useEffect(() => { tl.stop(); tc.stop(); tk.stop(); setSt(blank()); }, [tag]);

  /* every answer here is typed or chosen, so Enter and the choice keys go straight to the runtime */
  api.onEnter(null);

  const multi = charts.length > 1;
  const chartY = (ci: number) => (multi ? 10 + ci * 220 : 10);
  const rowY = (ci: number, r: number) => chartY(ci) + PG.first + r * PG.pitch;
  const boardH = (b: any) => PG.first + b.rows.length * PG.pitch + 2;
  /* Hindi and Gujarati marks reach higher and lower than Latin letters: those two languages get a few
     roomier sizes (hg); English draws exactly as it did. `tight`: the rail and the total strip share the key
     column (Free play), so there the key card is a little shorter to leave the rail its room. */
  const hg = lang !== "en";
  const keyH = (ci: number) => Math.min(hg && tight ? 138 : 150, boardH(charts[ci]));
  const rid = (ci: number, r: number) => ci + ":" + r;
  const busy = tl.busy;
  const canAct = () => (stage === "ask" || stage === "teach" || free) && !busy;
  const railOn = free || !!item.rail;
  const stripOn = free || !!item.allRows;
  const tight = railOn && stripOn;
  const b0 = charts[0];
  const G = CONTENT.one, GE = shade(CONTENT.one, 0.25);
  const DIM = mix(C.ink, "#FFFFFF", 0.3);

  /* ── the child's acts ── */
  const setSx = (ci: number, v: number) => put((p: any) => ({ sx: p.sx.map((x: number, j: number) => (j === ci ? v : x)) }));
  const turn = (ci: number) => {
    if (!canAct()) return;
    if (free) { /* Free play: the key card changes the key */
      api.sfx.tick();
      setFk((k: number) => (k < 0 ? PG_KEYS.indexOf(b0.key) + 1 : k + 1) % PG_KEYS.length);
      return;
    }
    if (S.turned[ci]) return;
    tk.run([
      [90, () => setSx(ci, 0.55)],
      [90, () => setSx(ci, 0.1)],
      [90, () => { api.sfx.tick(); put((p: any) => ({ turned: p.turned.map((t: boolean, j: number) => t || j === ci), sx: p.sx.map((x: number, j: number) => (j === ci ? 0.55 : x)) })); }],
      [60, () => setSx(ci, 1)],
    ]);
  };
  /* the row reader and the row lamp: a tap on a row lights it alone, rings its symbols one by one into the
     running count, and (with the key turned) writes the key's value once under each symbol. Its tag stays an
     empty box: the number is the child's to give. */
  /* a read that another act cut short leaves nothing behind: only rows read to their last symbol keep the key
     written under them */
  const settled = (p: any) => {
    const m: any = {};
    Object.keys(p.marks).forEach((s: string) => {
      const [ci, r] = s.split(":").map(Number);
      const row = charts[ci] && charts[ci].rows[r];
      if (row && p.marks[s].shown >= row.n) m[s] = p.marks[s];
    });
    return m;
  };
  const readRow = (ci: number, r: number) => {
    if (!canAct()) return;
    const b = charts[ci], id = rid(ci, r), nn = b.rows[r].n, kv = keyOf(ci);
    const on = S.turned[ci] && kv !== null;
    /* the delight (phase 2 and Free play): a row whose number has landed opens every symbol like a paper
       packet, the key's worth of small amber counters inside, then folds shut. Silent, nothing marked. */
    if (on && S.tags[id] !== undefined && (free || n === 2)) {
      tc.run([[1600, () => put((p: any) => ({ open: id, lit: [id], cur: null, marks: settled(p) }))], [0, () => put({ open: null })]]);
      return;
    }
    const steps: any[] = [[160, () => put((p: any) => ({ lit: [id], cur: id, k: 0, count: 0, open: null, marks: { ...settled(p), [id]: { mode: on ? "key" : "none", shown: 0 } } }))]];
    for (let k = 1; k <= nn; k++) steps.push([200, () => { api.sfx.tick(); put((p: any) => ({ k, count: k, marks: { ...p.marks, [id]: { ...p.marks[id], shown: k } } })); }]);
    steps.push([0, () => put((p: any) => ({
      read: p.read.includes(id) ? p.read : [...p.read, id],
      rail: railOn && !p.rail.includes(r) ? [...p.rail, r] : p.rail,
      tags: free && on ? { ...p.tags, [id]: kv * nn } : p.tags,
    }))]);
    tc.run(steps);
  };
  /* the all-rows control: lights every row and reads them all in turn; the strip's total is written only in
     Free play, or after an answer */
  const readAll = () => {
    if (!canAct()) return;
    const kv = keyOf(0);
    const steps: any[] = [[160, () => put({ lit: b0.rows.map((_: any, r: number) => rid(0, r)), cur: null, k: 0, count: 0, open: null, marks: {} })]];
    let c = 0;
    b0.rows.forEach((row: any, r: number) => {
      const id = rid(0, r);
      steps.push([0, () => put((p: any) => ({ cur: id, k: 0, marks: { ...p.marks, [id]: { mode: "key", shown: 0 } } }))]);
      for (let k = 1; k <= row.n; k++) { const cc = ++c; steps.push([130, () => { api.sfx.tick(); put((p: any) => ({ k, count: cc, marks: { ...p.marks, [id]: { ...p.marks[id], shown: k } } })); }]); }
    });
    steps.push([0, () => put((p: any) => {
      const tags: any = { ...p.tags };
      if (free) b0.rows.forEach((row: any, r: number) => { tags[rid(0, r)] = kv * row.n; });
      return {
        cur: null, read: b0.rows.map((_: any, r: number) => rid(0, r)), tags,
        rail: free ? b0.rows.map((_: any, r: number) => r) : p.rail,
        total: free ? b0.rows.reduce((a: number, row: any) => a + kv * row.n, 0) : p.total,
      };
    })]);
    tc.run(steps);
  };
  const nextChart = () => { if (!canAct()) return; api.sfx.tick(); setFi((f: number) => (f + 1) % PG_FREE.length); setFk(-1); };

  /* ── the tool's own motion: the win, and the traceback after a miss. Both redraw the reading from a clean
     board and end on the whole right answer; the pad stays locked until a correction has finished. ── */
  const reveal = (ci: number, r: number, ms: number) => {
    const b = charts[ci], id = rid(ci, r), nn = b.rows[r].n, kv = b.key;
    const out: any[] = [[ms, () => put((p: any) => ({ lit: p.lit.includes(id) ? p.lit : [...p.lit, id], cur: id, k: 0, count: 0, marks: { ...p.marks, [id]: { mode: "sum", shown: 0 } } }))]];
    for (let k = 1; k <= nn; k++) out.push([ms, () => put((p: any) => ({ k, count: k, marks: { ...p.marks, [id]: { mode: "sum", shown: k } } }))]);
    out.push([ms * 2, () => put((p: any) => ({ tags: { ...p.tags, [id]: kv * nn }, read: p.read.includes(id) ? p.read : [...p.read, id] }))]);
    return out;
  };
  const sumAll = () => b0.rows.reduce((a: number, row: any) => a + b0.key * row.n, 0);
  const target = () => {
    const cs = b0.rows.map((row: any) => row.n);
    if (item.kind === "most") return [cs.indexOf(Math.max(...cs))];
    if (item.kind === "least") return [cs.indexOf(Math.min(...cs))];
    const d = cs.findIndex((c: number, r: number) => cs.indexOf(c) !== r);
    return [cs.indexOf(cs[d]), d];
  };
  const show = (w: any, ms: number): any[] => {
    const clean: any = [0, () => put((p: any) => ({ lit: [], cur: null, k: 0, count: 0, marks: {}, tags: {}, rail: [], railNums: false, total: null, titleLit: false, note: null, tries: [], outline: null, open: null }))];
    const turnAll: any = [ms, () => put((p: any) => ({ turned: p.turned.map(() => true), sx: p.sx.map(() => 1) }))];
    switch (item.kind) {
      case "twokeys": return [clean, turnAll, ...reveal(0, 0, ms), ...reveal(1, 0, ms)];
      case "nokey": {
        if (!w) return [clean, [ms, () => put({ note: "No key: can't tell" })]];
        /* the row is counted, then read with three keys it might have had: three numbers, so no one number */
        const nn = b0.rows[0].n;
        const out: any[] = [clean, [ms, () => put({ lit: ["0:0"], cur: "0:0", k: 0, count: 0, marks: { "0:0": { mode: "none", shown: 0 } } })]];
        for (let j = 1; j <= nn; j++) out.push([ms, () => put({ k: j, count: j, marks: { "0:0": { mode: "none", shown: j } } })]);
        [2, 5, 10].forEach((kv) => out.push([ms * 2, () => put((p: any) => ({ tries: [...p.tries, { n: nn, k: kv, v: kv * nn }] }))]));
        out.push([ms * 2, () => put({ note: "No key: can't tell" })]);
        return out;
      }
      case "title": return [clean, turnAll, [ms * 2, () => put({ titleLit: true })], [ms, () => put({ note: "Title: what is counted" })]];
      case "times": return [clean, ...reveal(0, item.row, ms)];
      case "most": case "least": case "same":
        return [clean, [ms * 2, () => put({ rail: b0.rows.map((_: any, r: number) => r), railNums: true })], ...target().flatMap((r: number) => reveal(0, r, ms))];
      case "one": {
        /* the row the child read instead (its number is the child's answer) is outlined, apart from the asked one */
        const v = w ? leadNumber(w.value) : null;
        const other = v === null ? -1 : b0.rows.findIndex((row: any, r: number) => r !== item.row && b0.key * row.n === v);
        return [clean, ...(other >= 0 ? [[ms * 3, () => put({ outline: rid(0, other) })]] : []), ...reveal(0, item.row, ms), [ms * 2, () => put({ total: sumAll() })]];
      }
      case "both":
        return [clean, ...reveal(0, item.row, ms),
          [ms * 2, () => put({ lit: b0.rows.map((_: any, r: number) => rid(0, r)), cur: null })],
          ...b0.rows.map((row: any, r: number) => [ms * 2, () => put((p: any) => ({ tags: { ...p.tags, [rid(0, r)]: b0.key * row.n }, marks: { ...p.marks, [rid(0, r)]: { mode: "sum", shown: row.n } } }))]),
          [ms * 2, () => put({ total: sumAll() })]];
      default: return [clean];
    }
  };

  /* the traceback: nothing marked, nothing reset in the slot; the pad re-opens when it has ended */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tc.stop(); tk.stop();
    tl.run(show(wrong, 300), () => api.lock(false));
  }, [wrong]);
  /* the win: the same reading, quicker, and the number lands in its tag */
  useEffect(() => {
    if (stage !== "win") return;
    tc.stop(); tk.stop();
    tl.run(show(null, 130));
  }, [stage]);

  /* the one invitation: the first face-down key card, else the row to read, until a row has been read */
  const invite = (): any => {
    if (!(stage === "ask" || stage === "teach") || busy || wrong) return null;
    const fd = charts.findIndex((b: any, ci: number) => b.key !== null && !S.turned[ci]);
    if (fd >= 0) return { x: PG.keyX + PG.keyW / 2, y: chartY(fd) + keyH(fd) / 2, r: 70 };
    /* never a row in phase 3 (a row pointed at there picks the busiest, the fewest or one of the equal pair
       for the child), nor on the title question, where reading a row does not help */
    if (S.read.length || item.kind === "title" || item.rail) return null;
    const r = item.row !== undefined ? item.row : item.lit !== undefined ? item.lit : 0;
    return { x: PG.sx + 24, y: rowY(0, r) + 26, r: 36 };
  };

  /* ── drawing (helpers are called, never mounted) ── */
  const drawRow = (ci: number, r: number, small: boolean) => {
    const b = charts[ci], row = b.rows[r], id = rid(ci, r), y = rowY(ci, r), kv = keyOf(ci);
    const on = S.lit.includes(id), dim = S.lit.length > 0 && !on, mk = S.marks[id];
    const tx0 = PG.sx + row.n * PG.step + 4, val = S.tags[id];
    return (
      <g key={id}>
        {on && <rect x={6} y={y - 3} width={PG.w - 12} height={PG.rowH + 4} rx={12} fill={PG_SKY} />}
        {r > 0 && <line x1={0} y1={y - 4} x2={PG.w} y2={y - 4} stroke={C.ink} strokeWidth={1} />}
        <text x={16} y={y + 37} fontSize={small ? T.micro : T.label} fontWeight={700} fill={dim ? DIM : C.ink}>{tx(row.name)}</text>
        {Array.from({ length: row.n }).map((_: any, k: number) => {
          const x = PG.sx + k * PG.step;
          return (
            <g key={k}>
              {S.open === id && kv !== null ? pgPacket(x, y + 2, kv, G, GE)
                : pgIcon(b.sym, x, y + 2, PG.sym, dim ? tint(G, 0.5) : "url(#gOne)", dim ? tint(GE, 0.3) : GE)}
              {S.cur === id && k < S.k && <circle cx={x + 24} cy={y + 26} r={28} fill="none" stroke={C.ink} strokeWidth={2.5} />}
              {mk && mk.mode !== "none" && kv !== null && k < mk.shown && (
                <text x={x + 24} y={y + (hg ? 74 : 76)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PG_AMBER}>{mk.mode === "sum" ? kv * (k + 1) : kv}</text>
              )}
            </g>
          );
        })}
        {/* Hindi and Gujarati: a flatter tag (34) and the unit a little higher, so the unit's top marks clear
            the tag and its foot marks clear the next row's rule */}
        <rect x={tx0} y={y + 2} width={96} height={hg ? 34 : 48} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        {val !== undefined && (
          <g>
            <text x={tx0 + 48} y={y + (hg ? 31 : 38)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{val}</text>
            <text x={tx0 + 48} y={y + (hg ? 74 : 76)} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(b.unit)}</text>
          </g>
        )}
        {S.outline === id && <rect x={3} y={y - 4} width={PG.w - 6} height={PG.rowH + 6} rx={12} fill="none" stroke={C.ink} strokeWidth={3} strokeDasharray="12 9" />}
        <Hit id={`row-${ci + 1}-${r + 1}`} x={0} y={y} w={PG.w} h={PG.rowH} onPress={() => readRow(ci, r)} label={"Read the " + row.name + " row"} enabled={canAct()} />
      </g>
    );
  };
  const drawBoard = (ci: number) => {
    const b = charts[ci], y0 = chartY(ci), h = boardH(b), W0 = PG.w;
    /* a long name takes the small size on every row of the board (a translated name by its drawn width in the
       156-wide cell) */
    const small = b.rows.some((row: any) => (lang === "en" ? row.name.length > 6 : pgWide(tx(row.name), T.label) > 140));
    /* the title strip: Hindi and Gujarati take it 48 tall with the title at 28, so the marks above and below
       the line stay clear of its outline */
    const th = hg ? 48 : 44;
    return (
      <g key={"board" + ci}>
        <rect x={0} y={y0} width={W0} height={h} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <g data-role="reading">
          <path d={`M 0 ${y0 + th} V ${y0 + 16} Q 0 ${y0} 16 ${y0} H ${W0 - 16} Q ${W0} ${y0} ${W0} ${y0 + 16} V ${y0 + th} Z`}
            fill={S.titleLit ? PG_SKY : tint(C.panel, 0.45)} stroke={C.ink} strokeWidth={2} />
          <text x={W0 / 2} y={y0 + (hg ? 35 : 32)} textAnchor="middle" fontSize={hg ? T.micro : T.label} fontWeight={700} fill={C.ink}>{tx(b.title)}</text>
        </g>
        {b.rows.map((_: any, r: number) => drawRow(ci, r, small))}
        <line x1={172} y1={y0 + th} x2={172} y2={y0 + h} stroke={C.ink} strokeWidth={1.5} pointerEvents="none" />
      </g>
    );
  };
  const drawKey = (ci: number) => {
    const b = charts[ci], y0 = chartY(ci), h = keyH(ci), kv = keyOf(ci), x = PG.keyX, w = PG.keyW;
    const cx = x + w / 2, cy = y0 + h / 2;
    if (kv === null) {
      /* the dashed card grows to hold the keys it might have had; like every key card, its unit sits at the foot */
      const hh = S.tries.length ? 360 : h;
      return (
        <g key={"key" + ci}>
          <rect x={x} y={y0} width={w} height={hh} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} strokeDasharray="12 9" />
          <text x={x + 16} y={y0 + 34} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("Key")}</text>
          {S.tries.length === 0 && <text x={cx} y={cy + 22} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("missing")}</text>}
          {/* a key it might have had, and what the lit row would then be: one fish picture = 2, so its four
              ringed fish (the running count) are 4 × 2 = 8. A bold arrow for "so"; the product in two texts. */}
          {S.tries.map((t: any, j: number) => {
            const ty = y0 + 48 + j * 92, lhs = t.n + " × " + t.k;
            const lw = (String(t.n).length + String(t.k).length) * 17.5 + 34;
            return (
              <g key={j}>
                {pgIcon(b.sym, x + 16, ty, 40, "url(#gOne)", GE)}
                <text x={x + 66} y={ty + 32} fontSize={T.label} fontWeight={700} fill={PG_AMBER}>{"= " + t.k}</text>
                <path d={`M ${x + 15} ${ty + 62} H ${x + 37} M ${x + 28} ${ty + 53} L ${x + 38} ${ty + 62} L ${x + 28} ${ty + 71}`}
                  fill="none" stroke={PG_AMBER} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
                <text x={x + 48} y={ty + 72} fontSize={T.micro} fontWeight={700} fill={PG_AMBER}>{lhs}</text>
                <text x={x + 56 + lw} y={ty + 72} fontSize={T.micro} fontWeight={700} fill={PG_AMBER}>{"= " + t.v}</text>
              </g>
            );
          })}
          {S.tries.length > 0 && <text x={cx} y={y0 + hh - 18} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(b.unit)}</text>}
        </g>
      );
    }
    const up = S.turned[ci];
    return (
      <g key={"key" + ci} transform={`translate(${cx} ${cy}) scale(${S.sx[ci]} 1) translate(${-cx} ${-cy})`}>
        <rect x={x} y={y0} width={w} height={h} rx={16} fill={up ? "#FFFFFF" : "url(#gPanel)"} stroke={C.ink} strokeWidth={2} />
        {up ? (
          <g>
            <text x={x + 16} y={y0 + 34} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("Key")}</text>
            {pgIcon(b.sym, x + 18, y0 + 42, 52, "url(#gOne)", GE)}
            <text x={x + 84} y={y0 + 86} fontSize={T.speech} fontWeight={700} fill={C.ink}>{"= " + kv}</text>
            <text x={cx} y={y0 + h - (hg && tight ? 12 : 14)} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(b.unit)}</text>
          </g>
        ) : (
          <g>
            <rect x={x + 12} y={y0 + 12} width={w - 24} height={h - 24} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="6 8" />
            <text x={cx} y={cy + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Key")}</text>
          </g>
        )}
        {(!up || free) && <Hit id={"keycard-" + (ci + 1)} x={x} y={y0} w={w} h={h} onPress={() => turn(ci)} label={free ? "Change the key" : "Turn the key card"} enabled={canAct()} />}
      </g>
    );
  };
  /* the compare rail: one place a number, largest at the top; a read row stands in its place by its
     symbols (one key for every row); two equal rows share one place under a bracket; the numbers come with
     the answer (or at once in Free play) */
  const drawRail = () => {
    const kv = keyOf(0);
    const places = b0.rows.map((row: any) => row.n).filter((v: number, j: number, a: number[]) => a.indexOf(v) === j).sort((a: number, c: number) => c - a);
    const nm = (r: number) => tx(b0.rows[r].rail || b0.rows[r].name);
    const small = b0.rows.some((row: any, r: number) => (lang === "en" ? (row.rail || row.name).length > 4 : pgWide(nm(r), T.label) > 110));
    /* Hindi and Gujarati: names at 28, each centred by its own marks in a taller place (50, or what the key
       column leaves: 47 for four places beside the total strip), the labels a little further off */
    const N = places.length, top = hg ? (tight ? 200 : 212) : PG.railY;
    let ph = 44, pgap = 8;
    if (hg) {
      ph = 50; pgap = 6;
      const room = (tight ? 398 : 430) - top;
      if (N * ph + (N - 1) * pgap > room) { pgap = 3; ph = Math.min(50, Math.floor((room - (N - 1) * pgap) / N)); }
    }
    const y1 = top + N * (ph + pgap) - pgap;
    return (
      <g>
        <text x={880} y={hg ? top - 12 : PG.railY - 10} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("most")}</text>
        <line x1={866} y1={top} x2={866} y2={y1 - 4} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
        <path d={`M 859 ${y1 - 12} L 866 ${y1} L 873 ${y1 - 12}`} fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        {places.map((v: number, p: number) => {
          const y = top + p * (ph + pgap);
          const here = S.rail.filter((r: number) => b0.rows[r].n === v);
          const lit = here.some((r: number) => S.lit.includes(rid(0, r)));
          const fs = hg ? T.micro : small ? T.micro : T.label;
          /* the two-name bracket's bar, and the shared baseline of two names above it */
          const yb = y + ph - 4;
          const two = here.length > 1 ? [pgInk(nm(here[0]), T.micro), pgInk(nm(here[1]), T.micro)] : [];
          const nb2 = two.length ? (y + yb) / 2 + 1 + (Math.max(two[0].a, two[1].a) - Math.max(two[0].d, two[1].d)) / 2 : 0;
          return (
            <g key={p}>
              <rect x={880} y={y} width={200} height={ph} rx={10} fill={lit ? PG_SKY : "#FFFFFF"} stroke={C.ink} strokeWidth={2} />
              {here.length === 1 && (() => {
                /* a long name ("Swimming") is held to 124 wide, clear of the border and of the number */
                const s = nm(here[0]), fit = pgWide(s, fs) > 124 ? { textLength: 124, lengthAdjust: "spacingAndGlyphs" } : {};
                const ink = pgInk(s, fs);
                return <text x={953} y={hg ? y + ph / 2 + (ink.a - ink.d) / 2 : y + 31} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink} {...fit}>{s}</text>;
              })()}
              {here.length > 1 && (() => {
                /* two equal rows share the place: the first name from the left border, the second ending short of
                   the number, each held to 56 wide, under one bracket (Mon ... Thu: 14 clear of the border and of the
                   number, about 20 apart) */
                const hold = (s: string) => (pgWide(s, T.micro) > 56 ? { textLength: 56, lengthAdjust: "spacingAndGlyphs" } : {});
                const a = nm(here[0]), c = nm(here[1]);
                return (
                  <g>
                    <text x={894} y={hg ? nb2 : y + 28} textAnchor="start" fontSize={T.micro} fontWeight={700} fill={C.ink} {...hold(a)}>{a}</text>
                    <text x={1020} y={hg ? nb2 : y + 28} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink} {...hold(c)}>{c}</text>
                    <path d={hg ? `M 890 ${yb - 6} V ${yb} H 1024 V ${yb - 6}` : `M 890 ${y + 32} V ${y + 38} H 1024 V ${y + 32}`} fill="none" stroke={C.ink} strokeWidth={2} />
                  </g>
                );
              })()}
              {(S.railNums || free) && here.length > 0 && kv !== null && (
                <text x={1070} y={hg ? y + ph / 2 + 11.5 : y + 31} textAnchor="end" fontSize={T.label} fontWeight={700} fill={PG_AMBER}>{v * kv}</text>
              )}
            </g>
          );
        })}
        <text x={880} y={y1 + (hg ? 38 : 30)} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("least")}</text>
      </g>
    );
  };
  /* the one place a sum of rows is written, apart from every row */
  const drawStrip = () => {
    const w = free ? 600 : PG.w, y = PG.stripY;
    return (
      <g>
        <rect x={0} y={y} width={w} height={76} rx={14} fill={tint(CONTENT.bead, 0.88)} stroke={C.ink} strokeWidth={2} />
        <text x={20} y={y + 49} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("total for all rows")}</text>
        <rect x={w - 140} y={y + 10} width={120} height={56} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        {S.total !== null && <text x={w - 80} y={y + 54} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={PG_TOTAL}>{S.total}</text>}
      </g>
    );
  };
  /* the running count: the symbols counted in the row being read, and the rows read so far */
  const drawRuns = () => {
    const all = charts.reduce((a: number, b: any) => a + b.rows.length, 0);
    return (
      <g data-zone="runs">
        <rect x={2} y={-92} width={326} height={72} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {pgIcon(b0.sym, 16, -78, 44, "url(#gOne)", GE)}
        <text x={104} y={-36} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{S.count}</text>
        <line x1={150} y1={-80} x2={150} y2={-32} stroke={C.rule} strokeWidth={2} />
        <text x={166} y={hg ? -54 : -62} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("rows read")}</text>
        {/* "2 of 4" (never "2 / 4", a fraction). Hindi and Gujarati marks need more height than the pill has for two
            lines of words, so there the rows are a line of small bars, one a row, filled as each is read */}
        {hg ? Array.from({ length: all }).map((_: any, j: number) => (
          <rect key={j} x={166 + j * 36} y={-43} width={28} height={17} rx={5} fill={j < S.read.length ? C.ink : "#FFFFFF"} stroke={C.ink} strokeWidth={2} />
        )) : <text x={166} y={-30} fontSize={T.label} fontWeight={700} fill={C.ink}>{S.read.length + " " + tx("of") + " " + all}</text>}
      </g>
    );
  };

  /* what the host and the agent read back (toolApi.getState): never a row's number before it is given */
  const nameOf = (s: string) => { const [ci, r] = s.split(":").map(Number); return charts[ci] ? charts[ci].rows[r].name : s; };
  const rowNumbers: any = {};
  Object.keys(S.tags).forEach((s: string) => { rowNumbers[nameOf(s)] = S.tags[s]; });
  api.share({
    rows: charts.map((b: any) => b.rows.map((row: any) => row.name)).reduce((a: any[], x: any[]) => a.concat(x), []),
    keyShown: S.turned.every(Boolean), keyValue: charts.map((b: any, ci: number) => (S.turned[ci] ? keyOf(ci) : null)),
    rowNumbers, compared: S.rail.map((r: number) => b0.rows[r].name), litRow: S.lit.map(nameOf), total: S.total,
    sym: b0.sym, unit: b0.unit,
  });

  const inv = invite();
  const noteY = chartY(0) + boardH(b0) + 56;
  return (
    <g>
      {drawRuns()}
      {charts.map((_: any, ci: number) => drawBoard(ci))}
      {charts.map((_: any, ci: number) => drawKey(ci))}
      {railOn && drawRail()}
      {stripOn && drawStrip()}
      {S.note && <text x={PG.w / 2} y={noteY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(S.note)}</text>}
      {stripOn && (
        <Key id="all-rows" x={PG.keyX} y={448} w={PG.keyW} h={72} C={C} onClick={readAll} disabled={!canAct()} label="Add all the rows">
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("all rows")}</text>
        </Key>
      )}
      {free && (
        <Key id="next-chart" x={620} y={448} w={220} h={72} C={C} onClick={nextChart} label="Next chart">
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("next chart")}</text>
        </Key>
      )}
      {inv && <Invite x={inv.x} y={inv.y} r={inv.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, n, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const v = last ? last.value : null;
  if (v === null || v === undefined) return null;
  const sh = last.shared || {};
  const it: any = ((PHASES[(n || 1) - 1] || { items: [] }).items || [])[last.item] || {};
  /* the child's own answer as one finished thought: a choice by its label ("the title"), two boxes each
     with its own name ("dance 15", "together 54"), a number with its unit ("45 cars") */
  const vals = (Array.isArray(v) ? v : String(v).split("|")).map((x: any) => String(x));
  const lines: string[] = it.choices ? [tx(PG_SAID[String(v)] !== undefined ? PG_SAID[String(v)] : String(v))]
    : it.parts ? it.parts.map((p: any, j: number) => tx(p.label) + " " + (vals[j] ?? ""))
    : [vals[0] + (sh.unit ? " " + tx(sh.unit) : "")];
  const two = lines.length > 1, s = two ? 34 : Math.min(48, h - 16);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {sh.sym && pgIcon(sh.sym, 10, (h - s) / 2, s, "url(#gOne)", shade(CONTENT.one, 0.25))}
      {two ? lines.map((ln: string, j: number) => (
        <text key={j} x={w - 14} y={h / 2 - 5 + j * 32} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{ln}</text>
      )) : <text x={w - 14} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{lines[0]}</text>}
    </g>
  );
}

function PictographReader(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default PictographReader;
