/* ═══ M1.S1.T2.C4.2D1 · data_desk · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   The desk: phase 1 collects answers (tap a child or a class, a slip drops into the tray), phase 2
   sets count cards out under their headings and adds the table, phase 3 reads a pictograph row by
   dragging the key onto it (the key's value lands under every picture, the child finds the row's
   number), phase 4 compares and totals rows (row numbers into the total bar, onto the compare rail,
   or read with the key). Every answer is typed or chosen on the pad; the working area is the maths. */

const TOOL_ID = "data_desk";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Data Desk";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line, cut: its "Ask each child."
   is the teach's own first sentence, and there is no empty table in phase 1) */
const OPENING = ["A class stands along the top of the desk, with a tray for their answers."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Answers collected, set out under their names, read with the key, and compared.";
/* said when the child opens Free play from the summary page: exactly what the free branch offers */
const FREE_LINE = "Free play. Ask the class how they came to school, then set their answers out in the table.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    /* the tool, the opening, the finish and free play */
    "Data Desk": "आँकड़ों की मेज़",
    "A class stands along the top of the desk, with a tray for their answers.": "मेज़ के ऊपर एक कक्षा खड़ी है। उनके उत्तरों के लिए नीचे एक ट्रे है।",
    "Answers collected, set out under their names, read with the key, and compared.": "उत्तर इकट्ठे किए और नामों के नीचे लिखे। फिर कुंजी से पढ़े और उनकी तुलना की।",
    "Free play. Ask the class how they came to school, then set their answers out in the table.": "मुक्त खेल। बच्चों से पूछो वे स्कूल कैसे आए, फिर उत्तर सारणी में लगाओ।",
    /* phase 1 */
    "What data is": "आँकड़े क्या हैं",
    "Ask each child. What can all these answers tell the school?": "हर बच्चे से पूछो। ये सारे उत्तर स्कूल को क्या बता सकते हैं?",
    "Read each name with its count. What do they tell you?": "हर नाम उसकी गिनती के साथ पढ़ो। ये तुम्हें क्या बताते हैं?",
    "A fact gives information when its name says what it counts. Look again.": "तथ्य तब जानकारी देता है जब उसका नाम बताए कि वह क्या गिनता है। फिर से देखो।",
    "Facts collected to give useful information are data, and each carries a name that says what was counted.": "उपयोगी जानकारी देने के लिए इकट्ठे किए गए तथ्य आँकड़े हैं। हर एक का नाम बताता है कि क्या गिना गया।",
    "You learned: data is facts collected to give information.": "तुमने सीखा: जानकारी देने के लिए इकट्ठे किए तथ्य आँकड़े हैं।",
    "A class writes down each child's favourite colour. Is the list of answers data?": "एक कक्षा हर बच्चे का पसंदीदा रंग लिखती है। क्या उत्तरों की यह सूची आँकड़े हैं?",
    "Is this list data?": "क्या यह सूची आँकड़े हैं?",
    "Each slip names a colour. What could the class learn from the heap?": "हर पर्ची पर एक रंग का नाम है। इस ढेर से कक्षा क्या जान सकती है?",
    "A librarian writes down how many children in each of four classes have a library card. Tap each class for its count. What can this data tell the librarian? Which class has the most card holders?":
      "एक लाइब्रेरियन चार कक्षाओं के लाइब्रेरी कार्ड गिनती है। वह हर कक्षा की गिनती लिखती है। हर कक्षा पर टैप करो और उसकी गिनती देखो। ये आँकड़े लाइब्रेरियन को क्या बता सकते हैं? किस कक्षा में सबसे अधिक बच्चों के पास कार्ड है?",
    "Which class has most cards?": "सबसे अधिक कार्ड किसके?",
    "Line up the four counts. Which number is the biggest?": "चारों गिनतियाँ साथ रखो। कौन सी संख्या सबसे बड़ी है?",
    "One card counts the rainy days in each month of last year. The other is a drawing of a rain cloud. Which of these is data?":
      "एक कार्ड पिछले साल के हर महीने में बारिश के दिन गिनता है। दूसरा कार्ड बारिश के बादल का चित्र है। इनमें से आँकड़े किसमें हैं?",
    "Which one is data?": "आँकड़े किसमें हैं?",
    "What does the drawing count, and what is its name?": "चित्र क्या गिनता है, और उसका नाम क्या है?",
    /* phase 2 */
    "Setting data out in a table": "आँकड़ों को सारणी में लिखना",
    "Where does each card belong? Set it under its name, then add up the numbers.": "हर कार्ड कहाँ जाएगा? उसे उसके नाम के नीचे रखो, फिर संख्याएँ जोड़ो।",
    "Each child is counted once in the table. Which numbers are the parts of the group?": "सारणी में हर बच्चा एक बार गिना जाता है। कौन सी संख्याएँ समूह के हिस्से हैं?",
    "The parts add up to the whole group.": "सारे हिस्से जोड़ने पर पूरा समूह बनता है।",
    "A table puts each number under its own name. Its numbers add up to the children when each child gave one answer.":
      "सारणी हर संख्या को उसके अपने नाम के नीचे रखती है। हर बच्चे ने एक ही उत्तर दिया, तो संख्याओं का जोड़ कुल बच्चे हैं।",
    "You learned: a table puts each number under its own name.": "तुमने सीखा: सारणी हर संख्या को उसके नाम के नीचे रखती है।",
    "Children in a class chose their favourite season. Summer was chosen by 6 children, the rainy season by 9, winter by 8 and spring by 5. Each child chose one season. Set this out in a table and find how many children there are.":
      "एक कक्षा के बच्चों ने अपनी पसंदीदा ऋतु चुनी। गर्मी 6 बच्चों ने चुनी। बरसात 9 ने, सर्दी 8 ने और वसंत 5 बच्चों ने। हर बच्चे ने एक ही ऋतु चुनी। इसे सारणी में लिखो और पता करो कि कितने बच्चे हैं।",
    "How many children?": "कितने बच्चे?",
    "The four names are seasons, not children. Add the numbers under them.": "ये चार नाम ऋतुएँ हैं, बच्चे नहीं। उनके नीचे की संख्याएँ जोड़ो।",
    "A table of the fruit children chose shows mango 7, guava 5, banana 9 and apple 4. How many children chose a fruit?":
      "बच्चों ने अपने फल चुने। सारणी में आम 7, अमरूद 5, केला 9 और सेब 4 है। कितने बच्चों ने कोई फल चुना?",
    "Children in all?": "कुल बच्चे?",
    "Every child is counted under one fruit. Take each fruit's number once.": "हर बच्चा एक ही फल के नीचे गिना गया है। हर फल की संख्या एक बार लो।",
    "A class of 30 set out its favourite games in a table. Kabaddi has 8, cricket 11, football 6, and the kho-kho cell is empty. Everyone picked only one game. What number goes in the kho-kho cell?":
      "30 बच्चों की एक कक्षा ने अपने पसंदीदा खेल सारणी में लिखे। कबड्डी 8, क्रिकेट 11 और फुटबॉल 6 है। खो-खो का खाना खाली है। हर बच्चे ने एक ही खेल चुना। खो-खो के खाने में कौन सी संख्या आएगी?",
    "What goes in the kho-kho cell?": "खो-खो के खाने में क्या?",
    "The whole class is 30. Which part is left after the games you know?": "पूरी कक्षा 30 है। जाने हुए खेलों के बाद कौन सा हिस्सा बचता है?",
    /* phase 3 */
    "Reading a pictograph with its key": "कुंजी से चित्रालेख पढ़ना",
    "Count the pictures in this row. What does one picture stand for?": "इस पंक्ति के चित्र गिनो। एक चित्र कितनों के बराबर है?",
    "Drag the key onto the row. Its number shows once under each picture.": "कुंजी को पंक्ति पर खींचो। उसकी संख्या हर चित्र के नीचे एक बार दिखेगी।",
    "Look at the key card. How many does one picture hold?": "कुंजी वाला कार्ड देखो। एक चित्र में कितने हैं?",
    "Count on by the key's number, once for each picture.": "कुंजी की संख्या से आगे गिनो, हर चित्र के लिए एक बार।",
    "A pictograph row is read by counting its symbols and taking the key that many times.": "चित्रालेख की पंक्ति ऐसे पढ़ते हैं। चित्र गिनो और कुंजी को उतनी बार लो।",
    "You learned: count the pictures, then take the key that many times.": "तुमने सीखा: चित्र गिनो, फिर कुंजी को उतनी बार लो।",
    "A pictograph titled Mangoes Picked has the key one mango picture for 6 mangoes. The row for the tallest tree holds 5 mango pictures. How many mangoes were picked from that tree?":
      "यह चित्रालेख तोड़े गए आम दिखाता है। एक आम का चित्र 6 आमों के बराबर है। सबसे ऊँचे पेड़ की पंक्ति में आम के 5 चित्र हैं। उस पेड़ से कितने आम तोड़े गए?",
    "Mangoes from this tree?": "इस पेड़ से कितने आम?",
    "One picture is not one mango. What does the key say?": "एक चित्र एक आम नहीं है। कुंजी क्या कहती है?",
    "In a pictograph of pencils sold, one pencil picture stands for 10 pencils. A row holds 7 pencil pictures. How many pencils is that?":
      "यह चित्रालेख बिकी पेंसिलें दिखाता है। एक पेंसिल का चित्र 10 पेंसिलों के बराबर है। एक पंक्ति में पेंसिल के 7 चित्र हैं। ये कितनी पेंसिलें हुईं?",
    "How many pencils?": "कितनी पेंसिलें?",
    "Each picture holds more than one pencil. Use the key for every picture.": "हर चित्र में एक से अधिक पेंसिलें हैं। हर चित्र के लिए कुंजी लगाओ।",
    "A pictograph of glasses of juice sold has the key one glass picture for 8 glasses. The rows for three days hold 2, 5 and 4 glass pictures. How many glasses were sold on each day?":
      "यह चित्रालेख बिके जूस के गिलास दिखाता है। एक गिलास का चित्र 8 गिलासों के बराबर है। तीन दिनों की पंक्तियों में गिलास के 2, 5 और 4 चित्र हैं। हर दिन कितने गिलास बिके?",
    "Glasses each day?": "हर दिन कितने गिलास?",
    "Read each day's row on its own, with the key.": "हर दिन की पंक्ति अलग से, कुंजी के साथ पढ़ो।",
    /* phase 4 */
    "Most, least, equal and in all": "सबसे अधिक, सबसे कम, बराबर और कुल",
    "Which is the most? Which is the least? Which two are the same? Now add them all.": "सबसे अधिक कौन? सबसे कम कौन? कौन से दो बराबर हैं? अब सबको जोड़ो।",
    "Read each row's number first. Which numbers does the question need?": "पहले हर पंक्ति की संख्या पढ़ो। प्रश्न के लिए कौन सी संख्याएँ चाहिए?",
    "Compare the numbers for most and least. Add every row once for the total.": "सबसे अधिक और सबसे कम के लिए संख्याओं की तुलना करो। कुल के लिए हर पंक्ति एक बार जोड़ो।",
    "The most and the least come from comparing the numbers. The total adds every row once.": "संख्याओं की तुलना से सबसे अधिक और सबसे कम मिलते हैं। कुल में हर पंक्ति एक बार जुड़ती है।",
    "You learned: compare numbers for most and least; add all for the total.": "तुमने सीखा: अधिक और कम के लिए तुलना करो; कुल के लिए सब जोड़ो।",
    "A pictograph of stickers collected by four classes has the key one star for 4 stickers. Class 4A has 5 stars, 4B has 8, 4C has 3 and 4D has 5. Drag each row's number into the bar. How many stickers were collected in all?":
      "यह चित्रालेख चार कक्षाओं के इकट्ठे किए स्टिकर दिखाता है। एक तारा 4 स्टिकरों के बराबर है। कक्षा 4 A के पास 5 तारे और 4 B के पास 8 तारे हैं। 4 C के पास 3 और 4 D के पास 5 हैं। हर पंक्ति की संख्या पट्टी में खींचो। कुल कितने स्टिकर इकट्ठे हुए?",
    "Stickers in all?": "कुल कितने स्टिकर?",
    "Add the rows' numbers, not the stars.": "पंक्तियों की संख्याएँ जोड़ो, तारे नहीं।",
    "A canteen sold 14 plates of idli on Monday, 9 on Tuesday, 14 on Wednesday and 11 on Thursday. Stand each day's number on the rail. On which day were the fewest plates sold?":
      "एक कैंटीन ने इडली की प्लेटें बेचीं। सोमवार को 14 और मंगलवार को 9 बिकीं। बुधवार को 14 और गुरुवार को 11। हर दिन की संख्या क्रम-पट्टी पर रखो। किस दिन सबसे कम प्लेटें बिकीं?",
    "Which day sold fewest?": "किस दिन सबसे कम बिकीं?",
    "Look at the two ends of the rail. Which end holds the smallest number?": "क्रम-पट्टी के दोनों सिरे देखो। किस सिरे पर सबसे छोटी संख्या है?",
    "In a pictograph of trees planted by four houses, one tree picture stands for 5 trees. Ganga has 6 pictures, Yamuna 4, Kaveri 9 and Narmada 4. Find the house that planted the most trees. How many trees did it plant?":
      "यह चित्रालेख चार सदनों के लगाए पेड़ दिखाता है। एक पेड़ का चित्र 5 पेड़ों के बराबर है। गंगा के 6 और यमुना के 4 चित्र हैं। कावेरी के 9 और नर्मदा के 4 हैं। सबसे अधिक पेड़ लगाने वाला सदन ढूँढो। उसने कितने पेड़ लगाए?",
    "Most trees: how many?": "सबसे अधिक पेड़: कितने?",
    "Find the longest row, then read it with the key.": "सबसे लंबी पंक्ति ढूँढो, फिर उसे कुंजी से पढ़ो।",
    /* choices, the slot and the three boxes */
    "Yes": "हाँ", "No": "नहीं",
    "rainy days": "बारिश के दिन", "rain cloud": "बारिश का बादल",
    "Monday": "सोमवार", "Tuesday": "मंगलवार", "Wednesday": "बुधवार", "Thursday": "गुरुवार",
    "Day 1": "दिन 1", "Day 2": "दिन 2", "Day 3": "दिन 3",
    /* what the working area and the summary page draw */
    "asked": "पूछे", "placed": "रखे", "pictures": "चित्र", "added": "जोड़े", "on rail": "क्रम-पट्टी पर",
    "answers": "उत्तर", "cards": "कार्ड", "children": "बच्चे", "key": "कुंजी",
    "Class": "कक्षा", "most": "सबसे अधिक", "least": "सबसे कम", "fewest": "सबसे कम",
    "Yes, it is data": "हाँ, ये आँकड़े हैं", "this is data": "ये आँकड़े हैं",
    "no count, no name": "न गिनती, न नाम", "names and counts": "नाम और गिनती",
    "red": "लाल", "blue": "नीला", "green": "हरा", "yellow": "पीला",
    "Jan": "जनवरी", "Feb": "फ़रवरी", "Mar": "मार्च", "Apr": "अप्रैल", "May": "मई", "Jun": "जून",
    "Jul": "जुलाई", "Aug": "अगस्त", "Sep": "सितंबर", "Oct": "अक्टूबर", "Nov": "नवंबर", "Dec": "दिसंबर",
    "summer": "गर्मी", "rainy": "बरसात", "winter": "सर्दी", "spring": "वसंत",
    "mango": "आम", "guava": "अमरूद", "banana": "केला", "apple": "सेब",
    "kabaddi": "कबड्डी", "cricket": "क्रिकेट", "football": "फुटबॉल", "kho-kho": "खो-खो",
    "Mangoes Picked": "तोड़े गए आम", "Pencils Sold": "बिकी पेंसिलें", "Juice Sold": "बिका जूस",
    "Stickers Collected": "इकट्ठे किए स्टिकर", "Idli Plates Sold": "बिकी इडली प्लेटें", "Trees Planted": "लगाए गए पेड़",
    "mangoes": "आम", "pencils": "पेंसिलें", "glasses": "गिलास", "stickers": "स्टिकर", "trees": "पेड़",
    "tallest tree": "सबसे ऊँचा पेड़", "this week": "इस हफ़्ते",
    "Ganga": "गंगा", "Yamuna": "यमुना", "Kaveri": "कावेरी", "Narmada": "नर्मदा",
    "stickers in all": "कुल स्टिकर",
    "bus": "बस", "walk": "पैदल", "cycle": "साइकिल", "car": "कार",
  },
  gu: {
    /* the tool, the opening, the finish and free play */
    "Data Desk": "માહિતીનું મેજ",
    "A class stands along the top of the desk, with a tray for their answers.": "મેજની ઉપર એક વર્ગ ઊભો છે. તેમના જવાબો માટે નીચે એક ટ્રે છે.",
    "Answers collected, set out under their names, read with the key, and compared.": "જવાબો ભેગા કર્યા અને નામ નીચે ગોઠવ્યા. પછી ચાવીથી વાંચ્યા અને સરખાવ્યા.",
    "Free play. Ask the class how they came to school, then set their answers out in the table.": "મુક્ત રમત. બાળકો શાળાએ કેવી રીતે આવ્યા તે પૂછો, પછી જવાબો કોષ્ટકમાં ગોઠવો.",
    /* phase 1 */
    "What data is": "માહિતી એટલે શું",
    "Ask each child. What can all these answers tell the school?": "દરેક બાળકને પૂછો. આ બધા જવાબો શાળાને શું કહી શકે?",
    "Read each name with its count. What do they tell you?": "દરેક નામ તેની ગણતરી સાથે વાંચો. તે તમને શું કહે છે?",
    "A fact gives information when its name says what it counts. Look again.": "હકીકત ત્યારે જાણકારી આપે, જ્યારે તેનું નામ કહે કે તે શું ગણે છે. ફરી જુઓ.",
    "Facts collected to give useful information are data, and each carries a name that says what was counted.": "ઉપયોગી જાણકારી આપવા ભેગી કરેલી હકીકતો માહિતી છે. દરેકનું નામ કહે છે કે શું ગણાયું.",
    "You learned: data is facts collected to give information.": "તમે શીખ્યા: જાણકારી આપવા ભેગી કરેલી હકીકતો માહિતી છે.",
    "A class writes down each child's favourite colour. Is the list of answers data?": "એક વર્ગ દરેક બાળકનો મનપસંદ રંગ લખે છે. શું જવાબોની આ યાદી માહિતી છે?",
    "Is this list data?": "શું આ યાદી માહિતી છે?",
    "Each slip names a colour. What could the class learn from the heap?": "દરેક ચિઠ્ઠી પર એક રંગનું નામ છે. આ ઢગલામાંથી વર્ગ શું જાણી શકે?",
    "A librarian writes down how many children in each of four classes have a library card. Tap each class for its count. What can this data tell the librarian? Which class has the most card holders?":
      "એક ગ્રંથપાલ ચાર વર્ગના લાઇબ્રેરી કાર્ડ ગણે છે. તે દરેક વર્ગની ગણતરી લખે છે. દરેક વર્ગ પર ટૅપ કરો અને તેની ગણતરી જુઓ. આ માહિતી ગ્રંથપાલને શું કહી શકે? કયા વર્ગમાં સૌથી વધુ બાળકો પાસે કાર્ડ છે?",
    "Which class has most cards?": "સૌથી વધુ કાર્ડ કોના?",
    "Line up the four counts. Which number is the biggest?": "ચારેય ગણતરીઓ સાથે મૂકો. કઈ સંખ્યા સૌથી મોટી છે?",
    "One card counts the rainy days in each month of last year. The other is a drawing of a rain cloud. Which of these is data?":
      "એક કાર્ડ ગયા વર્ષના દરેક મહિનાના વરસાદી દિવસો ગણે છે. બીજું કાર્ડ વરસાદી વાદળનું ચિત્ર છે. આમાંથી માહિતી કઈ છે?",
    "Which one is data?": "માહિતી કઈ છે?",
    "What does the drawing count, and what is its name?": "ચિત્ર શું ગણે છે, અને તેનું નામ શું છે?",
    /* phase 2 */
    "Setting data out in a table": "માહિતીને કોષ્ટકમાં ગોઠવવી",
    "Where does each card belong? Set it under its name, then add up the numbers.": "દરેક કાર્ડ ક્યાં જશે? તેને તેના નામ નીચે મૂકો, પછી સંખ્યાઓનો સરવાળો કરો.",
    "Each child is counted once in the table. Which numbers are the parts of the group?": "કોષ્ટકમાં દરેક બાળક એક જ વાર ગણાય છે. કઈ સંખ્યાઓ જૂથના ભાગ છે?",
    "The parts add up to the whole group.": "બધા ભાગ ઉમેરતાં આખું જૂથ મળે છે.",
    "A table puts each number under its own name. Its numbers add up to the children when each child gave one answer.":
      "કોષ્ટક દરેક સંખ્યાને તેના પોતાના નામ નીચે મૂકે છે. દરેક બાળકે એક જ જવાબ આપ્યો, તો સંખ્યાઓનો સરવાળો કુલ બાળકો છે.",
    "You learned: a table puts each number under its own name.": "તમે શીખ્યા: કોષ્ટક દરેક સંખ્યાને તેના નામ નીચે મૂકે છે.",
    "Children in a class chose their favourite season. Summer was chosen by 6 children, the rainy season by 9, winter by 8 and spring by 5. Each child chose one season. Set this out in a table and find how many children there are.":
      "એક વર્ગનાં બાળકોએ પોતાની મનપસંદ ઋતુ પસંદ કરી. ઉનાળો 6 બાળકોએ પસંદ કર્યો. ચોમાસું 9, શિયાળો 8 અને વસંત 5 બાળકોએ. દરેક બાળકે એક જ ઋતુ પસંદ કરી. આને કોષ્ટકમાં ગોઠવો અને શોધો કે કેટલાં બાળકો છે.",
    "How many children?": "કેટલાં બાળકો?",
    "The four names are seasons, not children. Add the numbers under them.": "આ ચાર નામ ઋતુઓ છે, બાળકો નહીં. તેમની નીચેની સંખ્યાઓ ઉમેરો.",
    "A table of the fruit children chose shows mango 7, guava 5, banana 9 and apple 4. How many children chose a fruit?":
      "બાળકોએ પોતાનાં ફળ પસંદ કર્યાં. કોષ્ટકમાં કેરી 7, જામફળ 5, કેળું 9 અને સફરજન 4 છે. કેટલાં બાળકોએ ફળ પસંદ કર્યું?",
    "Children in all?": "કુલ બાળકો?",
    "Every child is counted under one fruit. Take each fruit's number once.": "દરેક બાળક એક જ ફળ નીચે ગણાયું છે. દરેક ફળની સંખ્યા એક વાર લો.",
    "A class of 30 set out its favourite games in a table. Kabaddi has 8, cricket 11, football 6, and the kho-kho cell is empty. Everyone picked only one game. What number goes in the kho-kho cell?":
      "30 બાળકોના એક વર્ગે મનપસંદ રમતો કોષ્ટકમાં ગોઠવી. કબડ્ડી 8, ક્રિકેટ 11 અને ફૂટબોલ 6 છે. ખો-ખોનું ખાનું ખાલી છે. દરેકે એક જ રમત પસંદ કરી. ખો-ખોના ખાનામાં કઈ સંખ્યા આવશે?",
    "What goes in the kho-kho cell?": "ખો-ખોના ખાનામાં શું?",
    "The whole class is 30. Which part is left after the games you know?": "આખો વર્ગ 30 છે. જાણીતી રમતો પછી કયો ભાગ બાકી રહે છે?",
    /* phase 3 */
    "Reading a pictograph with its key": "ચાવીથી ચિત્રાલેખ વાંચવો",
    "Count the pictures in this row. What does one picture stand for?": "આ હારનાં ચિત્રો ગણો. એક ચિત્ર કેટલા બરાબર છે?",
    "Drag the key onto the row. Its number shows once under each picture.": "ચાવીને હાર પર ખેંચો. તેની સંખ્યા દરેક ચિત્ર નીચે એક વાર દેખાશે.",
    "Look at the key card. How many does one picture hold?": "ચાવીનું કાર્ડ જુઓ. એક ચિત્રમાં કેટલા છે?",
    "Count on by the key's number, once for each picture.": "ચાવીની સંખ્યાથી આગળ ગણો, દરેક ચિત્ર માટે એક વાર.",
    "A pictograph row is read by counting its symbols and taking the key that many times.": "ચિત્રાલેખની હાર વાંચવા ચિત્રો ગણો અને ચાવીને એટલી વાર લો.",
    "You learned: count the pictures, then take the key that many times.": "તમે શીખ્યા: ચિત્રો ગણો, પછી ચાવીને એટલી વાર લો.",
    "A pictograph titled Mangoes Picked has the key one mango picture for 6 mangoes. The row for the tallest tree holds 5 mango pictures. How many mangoes were picked from that tree?":
      "આ ચિત્રાલેખ તોડેલી કેરીઓ બતાવે છે. એક કેરીનું ચિત્ર 6 કેરી બરાબર છે. સૌથી ઊંચા ઝાડની હારમાં કેરીનાં 5 ચિત્રો છે. તે ઝાડ પરથી કેટલી કેરી તોડી?",
    "Mangoes from this tree?": "આ ઝાડની કેટલી કેરી?",
    "One picture is not one mango. What does the key say?": "એક ચિત્ર એટલે એક કેરી નહીં. ચાવી શું કહે છે?",
    "In a pictograph of pencils sold, one pencil picture stands for 10 pencils. A row holds 7 pencil pictures. How many pencils is that?":
      "આ ચિત્રાલેખ વેચાયેલી પેન્સિલો બતાવે છે. એક પેન્સિલનું ચિત્ર 10 પેન્સિલ બરાબર છે. એક હારમાં પેન્સિલનાં 7 ચિત્રો છે. તે કેટલી પેન્સિલ થઈ?",
    "How many pencils?": "કેટલી પેન્સિલ?",
    "Each picture holds more than one pencil. Use the key for every picture.": "દરેક ચિત્રમાં એકથી વધુ પેન્સિલ છે. દરેક ચિત્ર માટે ચાવી વાપરો.",
    "A pictograph of glasses of juice sold has the key one glass picture for 8 glasses. The rows for three days hold 2, 5 and 4 glass pictures. How many glasses were sold on each day?":
      "આ ચિત્રાલેખ વેચાયેલા જ્યૂસના ગ્લાસ બતાવે છે. એક ગ્લાસનું ચિત્ર 8 ગ્લાસ બરાબર છે. ત્રણ દિવસની હારમાં ગ્લાસનાં 2, 5 અને 4 ચિત્રો છે. દરેક દિવસે કેટલા ગ્લાસ વેચાયા?",
    "Glasses each day?": "દરેક દિવસે કેટલા ગ્લાસ?",
    "Read each day's row on its own, with the key.": "દરેક દિવસની હાર અલગથી, ચાવી સાથે વાંચો.",
    /* phase 4 */
    "Most, least, equal and in all": "સૌથી વધુ, સૌથી ઓછું, સરખું અને કુલ",
    "Which is the most? Which is the least? Which two are the same? Now add them all.": "સૌથી વધુ કયું? સૌથી ઓછું કયું? કયા બે સરખા છે? હવે બધાનો સરવાળો કરો.",
    "Read each row's number first. Which numbers does the question need?": "પહેલાં દરેક હારની સંખ્યા વાંચો. પ્રશ્ન માટે કઈ સંખ્યાઓ જોઈએ?",
    "Compare the numbers for most and least. Add every row once for the total.": "સૌથી વધુ અને સૌથી ઓછું શોધવા સંખ્યાઓ સરખાવો. કુલ માટે દરેક હાર એક વાર ઉમેરો.",
    "The most and the least come from comparing the numbers. The total adds every row once.": "સંખ્યાઓ સરખાવવાથી સૌથી વધુ અને સૌથી ઓછું મળે છે. કુલમાં દરેક હાર એક વાર ઉમેરાય છે.",
    "You learned: compare numbers for most and least; add all for the total.": "તમે શીખ્યા: વધુ અને ઓછું જોવા સરખાવો; કુલ માટે બધું ઉમેરો.",
    "A pictograph of stickers collected by four classes has the key one star for 4 stickers. Class 4A has 5 stars, 4B has 8, 4C has 3 and 4D has 5. Drag each row's number into the bar. How many stickers were collected in all?":
      "આ ચિત્રાલેખ ચાર વર્ગે ભેગાં કરેલાં સ્ટીકર બતાવે છે. એક તારો 4 સ્ટીકર બરાબર છે. વર્ગ 4 A પાસે 5 તારા અને 4 B પાસે 8 તારા છે. 4 C પાસે 3 અને 4 D પાસે 5 છે. દરેક હારની સંખ્યા પટ્ટીમાં ખેંચો. કુલ કેટલાં સ્ટીકર ભેગાં થયાં?",
    "Stickers in all?": "કુલ કેટલાં સ્ટીકર?",
    "Add the rows' numbers, not the stars.": "હારની સંખ્યાઓ ઉમેરો, તારા નહીં.",
    "A canteen sold 14 plates of idli on Monday, 9 on Tuesday, 14 on Wednesday and 11 on Thursday. Stand each day's number on the rail. On which day were the fewest plates sold?":
      "એક કેન્ટીને ઇડલીની પ્લેટો વેચી. સોમવારે 14, મંગળવારે 9, બુધવારે 14 અને ગુરુવારે 11. દરેક દિવસની સંખ્યા ક્રમ-પટ્ટી પર મૂકો. કયા દિવસે સૌથી ઓછી પ્લેટો વેચાઈ?",
    "Which day sold fewest?": "કયા દિવસે સૌથી ઓછી વેચાઈ?",
    "Look at the two ends of the rail. Which end holds the smallest number?": "ક્રમ-પટ્ટીના બંને છેડા જુઓ. કયા છેડે સૌથી નાની સંખ્યા છે?",
    "In a pictograph of trees planted by four houses, one tree picture stands for 5 trees. Ganga has 6 pictures, Yamuna 4, Kaveri 9 and Narmada 4. Find the house that planted the most trees. How many trees did it plant?":
      "આ ચિત્રાલેખ ચાર હાઉસોએ વાવેલાં ઝાડ બતાવે છે. એક ઝાડનું ચિત્ર 5 ઝાડ બરાબર છે. ગંગાનાં 6 અને યમુનાનાં 4 ચિત્રો છે. કાવેરીનાં 9 અને નર્મદાનાં 4 છે. સૌથી વધુ ઝાડ વાવનાર હાઉસ શોધો. તેણે કેટલાં ઝાડ વાવ્યાં?",
    "Most trees: how many?": "સૌથી વધુ ઝાડ: કેટલાં?",
    "Find the longest row, then read it with the key.": "સૌથી લાંબી હાર શોધો, પછી તેને ચાવીથી વાંચો.",
    /* choices, the slot and the three boxes */
    "Yes": "હા", "No": "ના",
    "rainy days": "વરસાદી દિવસો", "rain cloud": "વરસાદી વાદળ",
    "Monday": "સોમવાર", "Tuesday": "મંગળવાર", "Wednesday": "બુધવાર", "Thursday": "ગુરુવાર",
    "Day 1": "દિવસ 1", "Day 2": "દિવસ 2", "Day 3": "દિવસ 3",
    /* what the working area and the summary page draw */
    "asked": "પૂછ્યા", "placed": "મૂક્યાં", "pictures": "ચિત્રો", "added": "ઉમેર્યા", "on rail": "ક્રમ-પટ્ટી પર",
    "answers": "જવાબો", "cards": "કાર્ડ", "children": "બાળકો", "key": "ચાવી",
    "Class": "વર્ગ", "most": "સૌથી વધુ", "least": "સૌથી ઓછું", "fewest": "સૌથી ઓછી",
    "Yes, it is data": "હા, આ માહિતી છે", "this is data": "આ માહિતી છે",
    "no count, no name": "ન ગણતરી, ન નામ", "names and counts": "નામ અને ગણતરી",
    "red": "લાલ", "blue": "વાદળી", "green": "લીલો", "yellow": "પીળો",
    "Jan": "જાન્યુ.", "Feb": "ફેબ્રુ.", "Mar": "માર્ચ", "Apr": "એપ્રિલ", "May": "મે", "Jun": "જૂન",
    "Jul": "જુલાઈ", "Aug": "ઑગ.", "Sep": "સપ્ટે.", "Oct": "ઑક્ટો.", "Nov": "નવે.", "Dec": "ડિસે.",
    "summer": "ઉનાળો", "rainy": "ચોમાસું", "winter": "શિયાળો", "spring": "વસંત",
    "mango": "કેરી", "guava": "જામફળ", "banana": "કેળું", "apple": "સફરજન",
    "kabaddi": "કબડ્ડી", "cricket": "ક્રિકેટ", "football": "ફૂટબોલ", "kho-kho": "ખો-ખો",
    "Mangoes Picked": "તોડેલી કેરીઓ", "Pencils Sold": "વેચાયેલી પેન્સિલો", "Juice Sold": "વેચાયેલો જ્યૂસ",
    "Stickers Collected": "ભેગાં કરેલાં સ્ટીકર", "Idli Plates Sold": "વેચાયેલી ઇડલી પ્લેટો", "Trees Planted": "વાવેલાં ઝાડ",
    "mangoes": "કેરી", "pencils": "પેન્સિલ", "glasses": "ગ્લાસ", "stickers": "સ્ટીકર", "trees": "ઝાડ",
    "tallest tree": "સૌથી ઊંચું ઝાડ", "this week": "આ અઠવાડિયે",
    "Ganga": "ગંગા", "Yamuna": "યમુના", "Kaveri": "કાવેરી", "Narmada": "નર્મદા",
    "stickers in all": "કુલ સ્ટીકર",
    "bus": "બસ", "walk": "ચાલીને", "cycle": "સાઇકલ", "car": "કાર",
  },
};

/* The numbers, rows and names the working area draws (they go into the sidecar too). The oracle
   re-derives every answer from here by its own arithmetic. */
const MODEL: any = {
  colours: { kids: ["red", "blue", "blue", "green", "yellow", "blue", "red", "green", "blue", "red"], names: ["red", "blue", "green", "yellow"] },
  library: { rows: [["4A", 23], ["4B", 31], ["4C", 18], ["4D", 27]], unit: "cards" },
  rain: { months: [["Jan", 1], ["Feb", 0], ["Mar", 1], ["Apr", 2], ["May", 5], ["Jun", 13], ["Jul", 20], ["Aug", 18], ["Sep", 11], ["Oct", 4], ["Nov", 2], ["Dec", 1]] },
  seasons: { names: ["summer", "rainy", "winter", "spring"], counts: [6, 9, 8, 5], order: [2, 0, 3, 1], label: "children" },
  fruit: { names: ["mango", "guava", "banana", "apple"], counts: [7, 5, 9, 4], order: [1, 3, 0, 2], label: "children" },
  games: { names: ["kabaddi", "cricket", "football", "kho-kho"], counts: [8, 11, 6, null], order: [2, 0, 1], whole: 30, label: "children" },
  mangoes: { title: "Mangoes Picked", sym: "mango", key: 6, unit: "mangoes", rows: [["tallest tree", 5]] },
  pencils: { title: "Pencils Sold", sym: "pencil", key: 10, unit: "pencils", rows: [["this week", 7]] },
  juice: { title: "Juice Sold", sym: "glass", key: 8, unit: "glasses", rows: [["Day 1", 2], ["Day 2", 5], ["Day 3", 4]] },
  stickers: { title: "Stickers Collected", sym: "star", key: 4, unit: "stickers", rows: [["4A", 5], ["4B", 8], ["4C", 3], ["4D", 5]] },
  idli: { title: "Idli Plates Sold", rows: [["Monday", 14], ["Tuesday", 9], ["Wednesday", 14], ["Thursday", 11]] },
  trees: { title: "Trees Planted", sym: "tree", key: 5, unit: "trees", rows: [["Ganga", 6], ["Yamuna", 4], ["Kaveri", 9], ["Narmada", 4]] },
  free: { kids: ["bus", "walk", "cycle", "car", "bus", "walk", "bus", "car", "cycle", "walk", "bus", "walk"], names: ["bus", "walk", "cycle", "car"], label: "children" },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase. qid = the plan's question id; kind = the desk the Work draws; set = its MODEL
           entry; near = the misconception's answer (judge rejects it); reveal = the forms of a word
           answer that no line may print (a choice question that names both its options reveals nothing
           by naming them, so it lists none) */
const PHASES = [
  {
    n: 1,
    concept: "What data is",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O1"],
    says: ["Ask each child. What can all these answers tell the school?"],
    ladder: ["Read each name with its count. What do they tell you?", "A fact gives information when its name says what it counts. Look again."],
    closing: "Facts collected to give useful information are data, and each carries a name that says what was counted.",
    learned: "You learned: data is facts collected to give information.",
    traceback: "Every answer drops into the tray, the slips gather under their names with a count for each, and the desk shows what the facts tell.",
    items: [
      /* practice 1: answer in the plan = Yes. It is a collection of facts that gives useful information: which colours the class likes */
      { qid: "M1.S1.T2.C4:1", kind: "collect", set: "colours", winMs: 2600,
        say: "A class writes down each child's favourite colour. Is the list of answers data?",
        ask: "Is this list data?", choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], answer: "yes", near: "no", reveal: ["Yes"],
        miss: "Each slip names a colour. What could the class learn from the heap?" },
      /* learn ML1: answer in the plan = Yes, it is data. It tells that Class 4B has the most card holders, 31, and that 99 children have a card in all */
      { qid: "M1.S1.T2.C4:ML1", kind: "classes", set: "library", winMs: 2600,
        say: "A librarian writes down how many children in each of four classes have a library card. Tap each class for its count. What can this data tell the librarian? Which class has the most card holders?",
        ask: "Which class has most cards?", choices: [{ id: "4A", label: "4A" }, { id: "4B", label: "4B" }, { id: "4C", label: "4C" }, { id: "4D", label: "4D" }],
        answer: "4B", near: "4D", reveal: ["4B"],
        miss: "Line up the four counts. Which number is the biggest?" },
      /* practice 2: answer in the plan = The number of rainy days in each month, because those are facts collected to give useful information */
      { qid: "M1.S1.T2.C4:2", kind: "which", set: "rain", winMs: 2400,
        say: "One card counts the rainy days in each month of last year. The other is a drawing of a rain cloud. Which of these is data?",
        ask: "Which one is data?", choices: [{ id: "days", label: "rainy days" }, { id: "cloud", label: "rain cloud" }], answer: "days", near: "cloud", reveal: [],
        miss: "What does the drawing count, and what is its name?" },
    ],
  },
  {
    n: 2,
    concept: "Setting data out in a table",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Where does each card belong? Set it under its name, then add up the numbers."],
    ladder: ["Each child is counted once in the table. Which numbers are the parts of the group?", "The parts add up to the whole group."],
    closing: "A table puts each number under its own name. Its numbers add up to the children when each child gave one answer.",
    learned: "You learned: a table puts each number under its own name.",
    traceback: "Every card goes under its heading; the numbers are added one at a time into the total cell, or taken one at a time from the whole into the empty cell.",
    items: [
      /* learn ML2: answer in the plan = A table with Summer 6, Rainy season 9, Winter 8 and Spring 5, and 28 children in all */
      { qid: "M1.S1.T2.C5:ML2", kind: "table", set: "seasons", unit: "children", answer: 28, near: 4, winMs: 2800,
        say: "Children in a class chose their favourite season. Summer was chosen by 6 children, the rainy season by 9, winter by 8 and spring by 5. Each child chose one season. Set this out in a table and find how many children there are.",
        ask: "How many children?",
        miss: "The four names are seasons, not children. Add the numbers under them." },
      /* practice 3: answer in the plan = 25, because 7 + 5 + 9 + 4 = 25 */
      { qid: "M1.S1.T2.C5:3", kind: "table", set: "fruit", unit: "children", answer: 25, near: 4, winMs: 2800,
        say: "A table of the fruit children chose shows mango 7, guava 5, banana 9 and apple 4. How many children chose a fruit?",
        ask: "Children in all?",
        miss: "Every child is counted under one fruit. Take each fruit's number once." },
      /* practice 4: answer in the plan = 5, because 8 + 11 + 6 = 25 and 30 - 25 = 5 */
      { qid: "M1.S1.T2.C5:4", kind: "table", set: "games", unit: "children", answer: 5, near: 25, winMs: 2800,
        say: "A class of 30 set out its favourite games in a table. Kabaddi has 8, cricket 11, football 6, and the kho-kho cell is empty. Everyone picked only one game. What number goes in the kho-kho cell?",
        ask: "What goes in the kho-kho cell?",
        miss: "The whole class is 30. Which part is left after the games you know?" },
    ],
  },
  {
    n: 3,
    concept: "Reading a pictograph with its key",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O2"],
    says: ["Count the pictures in this row. What does one picture stand for?", "Drag the key onto the row. Its number shows once under each picture."],
    ladder: ["Look at the key card. How many does one picture hold?", "Count on by the key's number, once for each picture."],
    closing: "A pictograph row is read by counting its symbols and taking the key that many times.",
    learned: "You learned: count the pictures, then take the key that many times.",
    traceback: "The key is taken once under every picture, climbing to the row's number, which lands in the row's tag.",
    items: [
      /* learn ML3: answer in the plan = 30 mangoes */
      { qid: "M1.S1.T2.C6:ML3", kind: "read", set: "mangoes", unit: "mangoes", answer: 30, near: 5, winMs: 2600,
        say: "A pictograph titled Mangoes Picked has the key one mango picture for 6 mangoes. The row for the tallest tree holds 5 mango pictures. How many mangoes were picked from that tree?",
        ask: "Mangoes from this tree?",
        miss: "One picture is not one mango. What does the key say?" },
      /* practice 5: answer in the plan = 70 pencils, because 7 x 10 = 70 */
      { qid: "M1.S1.T2.C6:5", kind: "read", set: "pencils", unit: "pencils", answer: 70, near: 7, winMs: 2600,
        say: "In a pictograph of pencils sold, one pencil picture stands for 10 pencils. A row holds 7 pencil pictures. How many pencils is that?",
        ask: "How many pencils?",
        miss: "Each picture holds more than one pencil. Use the key for every picture." },
      /* practice 6: answer in the plan = 16, 40 and 32 glasses (three boxes, one a day) */
      { qid: "M1.S1.T2.C6:6", kind: "read", set: "juice", unit: "glasses", answer: [16, 40, 32], near: "2|5|4", winMs: 3000,
        parts: [{ label: "Day 1" }, { label: "Day 2" }, { label: "Day 3" }],
        say: "A pictograph of glasses of juice sold has the key one glass picture for 8 glasses. The rows for three days hold 2, 5 and 4 glass pictures. How many glasses were sold on each day?",
        ask: "Glasses each day?",
        miss: "Read each day's row on its own, with the key." },
    ],
  },
  {
    n: 4,
    concept: "Most, least, equal and in all",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Which is the most? Which is the least? Which two are the same? Now add them all."],
    ladder: ["Read each row's number first. Which numbers does the question need?", "Compare the numbers for most and least. Add every row once for the total."],
    closing: "The most and the least come from comparing the numbers. The total adds every row once.",
    learned: "You learned: compare numbers for most and least; add all for the total.",
    traceback: "The rows' numbers go into the total bar and are added one at a time, or stand in order on the compare rail, or are read with the key; the answer is banded.",
    items: [
      /* learn ML4: answer in the plan = 4B the most, 32 stickers; 4C the fewest, 12; 4A and 4D the same, 20 each; 84 stickers in all
         (the slot takes the total, the plan's own misconception: 21 stars) */
      { qid: "M1.S1.T2.C7:ML4", kind: "total", set: "stickers", unit: "stickers", answer: 84, near: 21, winMs: 2800,
        say: "A pictograph of stickers collected by four classes has the key one star for 4 stickers. Class 4A has 5 stars, 4B has 8, 4C has 3 and 4D has 5. Drag each row's number into the bar. How many stickers were collected in all?",
        ask: "Stickers in all?",
        miss: "Add the rows' numbers, not the stars." },
      /* practice 7: answer in the plan = Tuesday the fewest; Monday and Wednesday the same, 14 each; 48 plates in all
         (the slot takes the fewest; the rail shows the two that are the same) */
      { qid: "M1.S1.T2.C7:7", kind: "rail", set: "idli", winMs: 2600,
        say: "A canteen sold 14 plates of idli on Monday, 9 on Tuesday, 14 on Wednesday and 11 on Thursday. Stand each day's number on the rail. On which day were the fewest plates sold?",
        ask: "Which day sold fewest?",
        choices: [{ id: "mon", label: "Monday" }, { id: "tue", label: "Tuesday" }, { id: "wed", label: "Wednesday" }, { id: "thu", label: "Thursday" }],
        answer: "tue", near: "thu", reveal: [],
        miss: "Look at the two ends of the rail. Which end holds the smallest number?" },
      /* practice 8: answer in the plan = Kaveri, 45 trees; 115 trees in all, because 30 + 20 + 45 + 20 = 115
         (the slot takes the most, read with the key) */
      { qid: "M1.S1.T2.C7:8", kind: "most", set: "trees", unit: "trees", answer: 45, near: 9, winMs: 2800,
        say: "In a pictograph of trees planted by four houses, one tree picture stands for 5 trees. Ganga has 6 pictures, Yamuna 4, Kaveri 9 and Narmada 4. Find the house that planted the most trees. How many trees did it plant?",
        ask: "Most trees: how many?",
        miss: "Find the longest row, then read it with the key." },
    ],
  },
];

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers, a choice by its id) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from MODEL by its own arithmetic (no code shared with judge or Work) */
const oracle = () => {
  const M = MODEL, add = (a: number[]) => a.reduce((x, y) => x + y, 0);
  const top = (rows: any[], sign: number) => rows.reduce((b: any, r: any) => (sign * r[1] > sign * b[1] ? r : b))[0];
  const want: any = {
    "M1.S1.T2.C4:1": M.colours.kids.every((c: string) => M.colours.names.indexOf(c) >= 0) ? "yes" : "no",
    "M1.S1.T2.C4:ML1": top(M.library.rows, 1),
    "M1.S1.T2.C4:2": M.rain.months.every((m: any) => !!m[0] && typeof m[1] === "number") ? "days" : "cloud",
    "M1.S1.T2.C5:ML2": add(M.seasons.counts),
    "M1.S1.T2.C5:3": add(M.fruit.counts),
    "M1.S1.T2.C5:4": M.games.whole - add(M.games.counts.filter((x: any) => x !== null)),
    "M1.S1.T2.C6:ML3": M.mangoes.key * M.mangoes.rows[0][1],
    "M1.S1.T2.C6:5": M.pencils.key * M.pencils.rows[0][1],
    "M1.S1.T2.C6:6": M.juice.rows.map((r: any) => M.juice.key * r[1]),
    "M1.S1.T2.C7:ML4": add(M.stickers.rows.map((r: any) => r[1] * M.stickers.key)),
    "M1.S1.T2.C7:7": String(top(M.idli.rows, -1)).slice(0, 3).toLowerCase(),
    "M1.S1.T2.C7:8": Math.max(...M.trees.rows.map((r: any) => r[1])) * M.trees.key,
  };
  return PHASES.every((p: any) => p.items.every((it: any) => JSON.stringify(want[it.qid]) === JSON.stringify(it.answer)));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.choices ? (item.reveal || [String(item.answer)])
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : [String(item.answer), indian(item.answer), words(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* a chosen word shows its label in the slot, not its id */
const DD_LABEL: any = { yes: "Yes", no: "No", days: "rainy days", cloud: "rain cloud", mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday" };
const format = (v: any) => (DD_LABEL[String(v)] !== undefined ? DD_LABEL[String(v)] : v);

/* every answer is typed or chosen on the pad: the agent types it, and Enter answers */
const solve = (item: any, T: any) => T.submit(item.answer);
const answer = (item: any, v: any) => undefined;
const check = () => undefined;

/* ── drawing: the desk's pieces (plain functions, called, never mounted) ─────────────────── */

const DD_GREEN = CONTENT.one;
const DD_EDGE = shade(CONTENT.one, 0.35);
const DD_AMBER_INK = shade(CONTENT.ten, 0.35);
const DD_PURPLE_INK = shade(CONTENT.bead, 0.3);
const DD_BAND = tint("#56B4E9", 0.62);

/* a pictograph symbol, green, in a square of side s with its top-left at (x, y) */
function ddSym(kind: string, x: number, y: number, s: number, key?: any) {
  const cx = x + s / 2, cy = y + s / 2, f = "url(#gOne)";
  if (kind === "mango") return (
    <g key={key} pointerEvents="none">
      <ellipse cx={cx} cy={cy + s * 0.06} rx={s * 0.3} ry={s * 0.4} transform={`rotate(-30 ${cx} ${cy})`} fill={f} stroke={DD_EDGE} strokeWidth={2} />
      <path d={`M ${cx + s * 0.06} ${cy - s * 0.34} C ${cx + s * 0.18} ${cy - s * 0.5}, ${cx + s * 0.4} ${cy - s * 0.5}, ${cx + s * 0.46} ${cy - s * 0.4} C ${cx + s * 0.32} ${cy - s * 0.3}, ${cx + s * 0.16} ${cy - s * 0.28}, ${cx + s * 0.06} ${cy - s * 0.34} Z`}
        fill={shade(DD_GREEN, 0.15)} stroke={DD_EDGE} strokeWidth={1.5} />
    </g>
  );
  if (kind === "pencil") return (
    <g key={key} transform={`rotate(35 ${cx} ${cy})`} pointerEvents="none">
      <rect x={cx - s * 0.11} y={y + s * 0.05} width={s * 0.22} height={s * 0.62} rx={2} fill={f} stroke={DD_EDGE} strokeWidth={2} />
      <path d={`M ${cx - s * 0.11} ${y + s * 0.67} L ${cx + s * 0.11} ${y + s * 0.67} L ${cx} ${y + s * 0.95} Z`} fill="#FFFFFF" stroke={DD_EDGE} strokeWidth={2} strokeLinejoin="round" />
      <path d={`M ${cx - s * 0.04} ${y + s * 0.85} L ${cx + s * 0.04} ${y + s * 0.85} L ${cx} ${y + s * 0.95} Z`} fill={DD_EDGE} />
    </g>
  );
  if (kind === "glass") {
    const out = `M ${cx - s * 0.3} ${y + s * 0.08} L ${cx + s * 0.3} ${y + s * 0.08} L ${cx + s * 0.22} ${y + s * 0.92} L ${cx - s * 0.22} ${y + s * 0.92} Z`;
    const juice = `M ${cx - s * 0.278} ${y + s * 0.32} L ${cx + s * 0.278} ${y + s * 0.32} L ${cx + s * 0.22} ${y + s * 0.92} L ${cx - s * 0.22} ${y + s * 0.92} Z`;
    return (
      <g key={key} pointerEvents="none">
        <path d={out} fill="#FFFFFF" />
        <path d={juice} fill={f} />
        <path d={out} fill="none" stroke={DD_EDGE} strokeWidth={2.5} strokeLinejoin="round" />
      </g>
    );
  }
  if (kind === "star") {
    const pts: string[] = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? s * 0.22 : s * 0.48;
      pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + s * 0.03 + rr * Math.sin(a)).toFixed(1)}`);
    }
    return <path key={key} d={"M" + pts.join("L") + "Z"} fill={f} stroke={DD_EDGE} strokeWidth={2} strokeLinejoin="round" pointerEvents="none" />;
  }
  /* tree */
  return (
    <g key={key} pointerEvents="none">
      <rect x={cx - s * 0.07} y={y + s * 0.58} width={s * 0.14} height={s * 0.36} rx={2} fill={shade(DD_GREEN, 0.3)} />
      <circle cx={cx} cy={y + s * 0.38} r={s * 0.32} fill={f} stroke={DD_EDGE} strokeWidth={2} />
    </g>
  );
}

/* a child of the class row: a line drawing in near-black ink on the panel colour, `sc` = 1 is 108 tall */
function ddKid(cx: number, top: number, sc: number, ink: string, body: string) {
  const u = (v: number) => v * sc;
  return (
    <g stroke={ink} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" pointerEvents="none">
      <path d={`M ${cx - u(15)} ${top + u(46)} L ${cx - u(28)} ${top + u(76)} M ${cx + u(15)} ${top + u(46)} L ${cx + u(28)} ${top + u(76)}`} fill="none" />
      <path d={`M ${cx - u(20)} ${top + u(84)} L ${cx - u(14)} ${top + u(42)} Q ${cx} ${top + u(34)} ${cx + u(14)} ${top + u(42)} L ${cx + u(20)} ${top + u(84)} Z`} fill={body} />
      <path d={`M ${cx - u(8)} ${top + u(84)} L ${cx - u(9)} ${top + u(106)} M ${cx + u(8)} ${top + u(84)} L ${cx + u(9)} ${top + u(106)}`} fill="none" />
      <circle cx={cx} cy={top + u(19)} r={u(15)} fill="#FFFFFF" />
    </g>
  );
}
/* the small tick at the feet of a child who has answered */
const ddTick = (x: number, y: number, ink: string) => (
  <path d={`M ${x - 11} ${y} L ${x - 3} ${y + 8} L ${x + 12} ${y - 8}`} fill="none" stroke={ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" pointerEvents="none" />
);
/* a word at a size that fits a width (label, else micro) */
const ddFit = (s: string, w: number) => (String(s).length * T.label * 0.58 <= w ? T.label : T.micro);
/* a word in a small box at the floor size: measured once drawn, and condensed only when it is wider than
   `max` (a Hindi "साइकिल" in a free-play slip); every English word here fits and is drawn as it is.
   Key it by its text, so a new word is measured afresh. */
function DdFitText({ max, children, ...rest }: any) {
  const ref = useRef<any>(null);
  const [len, setLen] = useState<any>(null);
  useEffect(() => {
    let on = true;
    const measure = () => {
      const el = ref.current;
      if (!on || !el || !el.getComputedTextLength || el.hasAttribute("textLength")) return;
      if (el.getComputedTextLength() > max) setLen(max);
    };
    measure();
    /* a font that arrives late changes the width: measure again once the fonts are in */
    const fs: any = typeof document !== "undefined" ? (document as any).fonts : null;
    if (fs && fs.ready) fs.ready.then(measure);
    return () => { on = false; };
  }, []);
  return <text ref={ref} {...rest} {...(len ? { textLength: len, lengthAdjust: "spacingAndGlyphs" } : {})}>{children}</text>;
}
/* Hindi and Gujarati only: the drawn width of one word (0 until it is drawn), measured after each render
   and again once the fonts are in, so the pieces beside it make room on any tablet's font. English never
   measures and draws exactly as before. Returns [ref for the <text>, width]. */
function useDdTextW(on: boolean) {
  const ref = useRef<any>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!on) return;
    let live = true;
    const measure = () => {
      const el = ref.current;
      if (!live || !el || !el.getComputedTextLength) return;
      const v = Math.ceil(el.getComputedTextLength());
      setW((p: number) => (p === v ? p : v));
    };
    measure();
    const fs: any = typeof document !== "undefined" ? (document as any).fonts : null;
    if (fs && fs.ready) fs.ready.then(measure);
    return () => { live = false; };
  });
  return [ref, w] as any;
}

/* the table of phase 2 and of free play: columns, their heading and number cells */
const DD_TABLE = { x0: 280, w: 144, pitch: 152, headY: 40, headH: 72, numY: 118, numH: 120 };
const DD_FREE = { x0: 330, w: 142, pitch: 150, headY: 170, headH: 64, numY: 234, numH: 100 };
const ddColAt = (at: any, G: any, cnt: number) => {
  for (let c = 0; c < cnt; c++) {
    const x = G.x0 + c * G.pitch;
    if (at.x >= x - 4 && at.x <= x + G.w + 4 && at.y >= G.headY - 30 && at.y <= G.numY + G.numH + 30) return c;
  }
  return -1;
};
/* the rows of a pictograph board: phase 3 (big, one or three rows) and phase 4 (four rows) */
const ddRows = (kind: string, D: any) => {
  const R = (D.rows || []).length;
  if (kind === "read") {
    /* one row: big pictures (up to 7 fit with the tag); three rows: a little smaller */
    const one = R === 1, ys = one ? [196] : [112, 248, 384], h = one ? 96 : 72, pitch = one ? 100 : 92, sz = one ? 84 : 62;
    return D.rows.map((row: any, r: number) => ({ y: ys[r], h, nameW: 236, x0: 262, pitch, sz, top: ys[r] + (h - sz) / 2, val: ys[r] + h + (one ? 46 : 32), vsz: T.label,
      tagX: 262 + row[1] * pitch + 6, tagY: ys[r] + (h - 72) / 2 }));
  }
  const nameW = kind === "rail" ? 230 : 150;
  return (D.rows || []).map((row: any, r: number) => {
    /* the key-read board has nothing under it, so its rows stand further apart (values under pictures) */
    const y = 76 + r * (kind === "most" ? 102 : 80), x0 = nameW + 20, N = kind === "rail" ? 0 : row[1], sz = kind === "most" ? 46 : 50;
    return { y, h: 72, nameW, x0, pitch: 58, sz, top: kind === "most" ? y + 2 : y + 11, val: y + 78, vsz: T.micro, tagX: x0 + N * 58 + 10, tagY: y };
  });
};

/* the child's own desk for a question, fresh; and the same desk with every piece done (a correction
   completes the child's pieces, which only ever add: nothing a tap does can take them back) */
const ddFresh = () => ({ asked: [], placed: [], read: {}, lit: 0, added: [], rail: [] });
const ddAll = (kind: string, D: any, cur: any): any => {
  const all = (len: number, have: number[]) => [...have, ...Array.from({ length: len }, (_, i) => i).filter((i) => have.indexOf(i) < 0)];
  if (kind === "collect") return { asked: all(D.kids.length, cur.asked) };
  if (kind === "classes") return { asked: all(D.rows.length, cur.asked) };
  if (kind === "table") return { placed: all(D.names.length, cur.placed).filter((i: number) => D.counts[i] !== null) };
  if (kind === "read" || kind === "most") { const read: any = {}; D.rows.forEach((r: any, i: number) => { read[i] = r[1]; }); return { read }; }
  if (kind === "total") return { added: all(D.rows.length, cur.added) };
  if (kind === "rail") return { rail: all(D.rows.length, cur.rail) };
  return {};
};
/* how many steps a correction draws, after it has completed the child's pieces */
const ddSteps = (kind: string, D: any) => (kind === "read" ? D.rows.reduce((a: number, r: any) => a + r[1] + 1, 0)
  : kind === "which" ? 3 : kind === "rail" ? 2 : kind === "table" ? (D.whole ? 4 : 5) : 5);

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline(); /* the child's own acts (a row being read) */
  const tb = useTimeline(); /* the correction */
  const free = stage === "free";
  const it: any = free ? { kind: "free", set: "free" } : item || {};
  const kind = it.kind;
  const D: any = MODEL[it.set] || {};
  const k = free ? "free" : n + "." + index;
  const [book, setBook] = useState<any>({});
  const [demo, setDemo] = useState<any>(null);
  /* Hindi and Gujarati draw wider words and taller glyphs than the English: the key word's and the
     "fewest" label's widths (measured), and a small baseline drop for words that sit high in a box */
  const nonEn = lang !== "en";
  const [keyRef, keyW] = useDdTextW(nonEn);
  const [fewRef, fewW] = useDdTextW(nonEn);
  const lowDy = nonEn ? 4 : 0;
  /* a card or slip dropped on another column: its own column lights for a moment (nothing is marked) */
  const [cue, setCue] = useState<any>(null);
  useEffect(() => { if (!cue) return; const h = setTimeout(() => setCue(null), 1300); return () => clearTimeout(h); }, [cue]);
  const cueCol = cue && cue.k === k ? cue.col : -1;
  const s: any = book[k] || ddFresh();
  const upd = (fn: any) => setBook((b: any) => { const cur = b[k] || ddFresh(); return { ...b, [k]: { ...cur, ...fn(cur) } }; });
  const fin = stage === "win" || stage === "idle";
  /* ts: how far the correction has drawn (the win shows it whole) */
  const ts = fin ? 999 : demo && demo.k === k ? demo.t : 0;
  const S: any = fin ? { ...s, ...ddAll(kind, D, s) } : s;
  const live = (stage === "ask" || stage === "teach" || free) && !tb.busy;
  const fresh = (stage === "ask" || stage === "teach" || free) && ts === 0;
  const tick = () => api.sfx.tick();

  api.onEnter(null);

  useEffect(() => { tl.stop(); }, [index, n, free]);

  /* the traceback: complete the child's pieces, then redraw the maths step by step, ending on the whole
     right answer; the pad is locked while it runs and nothing is marked */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const kk = k, M = ddSteps(kind, D);
    api.lock(true);
    tl.stop();
    setDemo(null);
    const seq: any[] = [[450, () => upd((cur: any) => ddAll(kind, D, cur))]];
    for (let t = 1; t <= M; t++) seq.push([kind === "read" ? 380 : 600, () => setDemo({ k: kk, t })]);
    tb.run(seq, () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState): the desk, never the answer */
  api.share({
    desk: kind, answers: S.asked.length, placed: S.placed.length, added: S.added.length,
    rowsRead: Object.keys(S.read).filter((r: any) => S.read[r] > 0).length,
    rail: S.rail.map((r: number) => (D.rows ? D.rows[r][1] : null)),
  });

  /* ── acts ── */
  const askKid = (i: number) => { if (!live || S.asked.indexOf(i) >= 0) return; upd((cur: any) => (cur.asked.indexOf(i) >= 0 ? {} : { asked: [...cur.asked, i] })); tick(); };
  const place = (i: number) => { upd((cur: any) => (cur.placed.indexOf(i) >= 0 ? {} : { placed: [...cur.placed, i] })); tick(); };
  const readRow = (r: number) => {
    const N = D.rows[r][1];
    upd((cur: any) => ({ lit: r, read: { ...cur.read, [r]: 0 } }));
    tl.run(Array.from({ length: N }, (_, i) => [230, () => { upd((cur: any) => ({ read: { ...cur.read, [r]: i + 1 } })); tick(); }]));
  };
  const addRow = (r: number) => { upd((cur: any) => (cur.added.indexOf(r) >= 0 ? {} : { added: [...cur.added, r] })); tick(); };
  const railRow = (r: number) => { upd((cur: any) => (cur.rail.indexOf(r) >= 0 ? {} : { rail: [...cur.rail, r] })); tick(); };

  /* a drop: a move under 8 (or Enter) is a tap, which puts the piece where it belongs */
  const drag = useDrag((p: any, at: any, moved: boolean) => {
    if (!live || !p) return;
    const tap = !moved || !isFinite(at.x) || !isFinite(at.y);
    if (p.t === "card" || p.t === "slip") {
      /* its own column takes it; another column sends it back with a soft tone while its own column lights */
      const G = p.t === "card" ? DD_TABLE : DD_FREE, want = p.t === "card" ? p.i : D.names.indexOf(D.kids[p.i]);
      const c = tap ? want : ddColAt(at, G, D.names.length);
      if (c === want) place(p.i);
      else if (c >= 0) { api.sfx.wrong(); setCue({ k, col: want, n: Date.now() }); }
      return;
    }
    if (p.t === "key") {
      const rows = ddRows(kind, D);
      if (tap) { const next = rows.findIndex((_: any, r: number) => !((S.read[r] || 0) >= D.rows[r][1])); readRow(next >= 0 ? next : S.lit); return; }
      const r = rows.findIndex((g: any) => at.y >= g.y - 16 && at.y <= g.y + g.h + (kind === "read" ? 44 : 14));
      if (r >= 0) readRow(r);
      return;
    }
    if (p.t === "tag") {
      if (!tap && at.y < 396) return;
      if (kind === "total") addRow(p.r); else railRow(p.r);
    }
  });

  /* a drag piece: the same element follows the finger (so a real drag keeps its node), lifted */
  const piece = (id: string, label: string, pay: any, x: number, y: number, w: number, h: number, body: any) => {
    const d = drag.drag;
    const mine = !!(d && d.moved && d.payload && d.payload.t === pay.t && d.payload.i === pay.i && d.payload.r === pay.r);
    return (
      <g key={id} {...control(id, label)} {...drag.bind(pay)} {...drag.keys(pay)}
        transform={mine ? `translate(${d.x - (x + w / 2)},${d.y - (y + h / 2)})` : undefined} filter={mine ? "url(#fLift)" : undefined}>
        <rect x={x} y={y} width={w} height={h} fill="transparent" />
        {body}
      </g>
    );
  };

  /* the running count, top left of the canvas */
  const runs = (label: string, a: number, b: number) => (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={20} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(label)}</text>
      <text x={310} y={-41} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{a + " / " + b}</text>
    </g>
  );
  const cellText = (x: number, y: number, v: any, size: number, fill: string, anchor = "middle") => (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={fill}>{v}</text>
  );
  /* a sum written out token by token (each number and sign its own text, so the picture holds labels) */
  const strip = (toks: any[], x: number, y: number) => {
    let at = x;
    return (
      <g pointerEvents="none">
        {toks.map(([t, fill]: any, j: number) => {
          const w = String(t).length * T.prompt * 0.58, cx = at + w / 2;
          at += w + 18;
          return <text key={"tk" + j} x={cx} y={y} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={fill}>{t}</text>;
        })}
      </g>
    );
  };
  /* the column a dropped piece belongs to, lit for a moment after it went to another column */
  const colCue = (G: any) => (cueCol < 0 ? null : (
    <rect x={G.x0 + cueCol * G.pitch - 7} y={G.headY - 7} width={G.w + 14} height={G.numY + G.numH - G.headY + 14} rx={12}
      fill={DD_BAND} stroke={C.accent} strokeWidth={4} pointerEvents="none" />
  ));
  /* the one invite, as a pulsing frame round a card (a ring would cross the card's words) */
  const inviteBox = (x: number, y: number, w: number, h: number) => (
    <rect className="c4-pulse" x={x} y={y} width={w} height={h} rx={16} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
  );
  const blank = (x: number, y: number, w: number, h: number) => <rect x={x} y={y} width={w} height={h} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />;
  /* dy: hi/gu drop the card tray's word off the outline (the answer trays keep theirs clear of the slips) */
  const tray = (label: string, x: number, y: number, w: number, h: number, dy = 0) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={RAD.panel} fill={tint(C.panel, 0.35)} stroke={C.ink} strokeWidth={2} />
      <text x={x + 20} y={y + 36 + dy} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(label)}</text>
    </g>
  );

  /* ── phase 1 and free play: the class row and the answer tray ── */
  const classRow = (K: number, pitch: number, cx0: number, sc: number) => (
    <g>
      {Array.from({ length: K }, (_, i) => {
        const cx = cx0 + i * pitch, hw = Math.min(46, pitch / 2 - 3);
        return (
          <g key={"kid" + i}>
            {ddKid(cx, 6, sc, C.ink, C.panel)}
            {S.asked.indexOf(i) >= 0 && ddTick(cx, 126, C.ink)}
            <Hit id={"kid-" + (i + 1)} x={cx - hw} y={0} w={hw * 2} h={140} label={"child " + (i + 1)} enabled={live} onPress={() => askKid(i)} />
          </g>
        );
      })}
      {fresh && S.asked.length === 0 && <Invite x={cx0} y={62} r={52} C={C} />}
    </g>
  );
  /* what the heap tells: a small table of names and counts (the correction and the win) */
  const tells = (names: string[], counts: number[], most: number) => (
    <g pointerEvents="none">
      {most >= 0 && <rect x={322 + most * 184} y={158} width={208} height={192} rx={16} fill={DD_BAND} />}
      {names.map((nm: string, c: number) => {
        if (ts < c + 1) return null;
        const x = 340 + c * 184;
        return (
          <g key={"t" + c}>
            <rect x={x} y={176} width={172} height={60} fill={tint(C.panel, 0.35)} stroke={C.ink} strokeWidth={2} />
            <text x={x + 86} y={217} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(nm)}</text>
            <rect x={x} y={236} width={172} height={96} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
            {cellText(x + 86, 304, counts[c], T.xl, DD_AMBER_INK)}
          </g>
        );
      })}
    </g>
  );

  const drawCollect = () => {
    const kids: string[] = D.kids, names: string[] = D.names;
    return (
      <g>
        {runs("asked", S.asked.length, kids.length)}
        {tray("answers", 0, 160, 300, 362)}
        {S.asked.map((i: number, j: number) => {
          const x = 16 + (j % 2) * 140, y = 212 + Math.floor(j / 2) * 60;
          return (
            <g key={"slip" + i} pointerEvents="none">
              <rect x={x} y={y} width={128} height={50} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
              <text x={x + 64} y={y + 35} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(kids[i])}</text>
            </g>
          );
        })}
        {tells(names, names.map((nm: string) => kids.filter((c: string) => c === nm).length), -1)}
        {ts >= 5 && (
          <g pointerEvents="none">
            <rect x={340} y={368} width={340} height={66} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
            <text x={510} y={412} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Yes, it is data")}</text>
          </g>
        )}
        {classRow(kids.length, 104, 70, 1)}
      </g>
    );
  };

  const drawClasses = () => {
    const rows = D.rows, most = rows.reduce((b: number, r: any, i: number) => (r[1] > rows[b][1] ? i : b), 0);
    return (
      <g>
        {runs("asked", S.asked.length, rows.length)}
        {tray("answers", 0, 160, 300, 362)}
        {S.asked.map((i: number, j: number) => {
          const y = 212 + j * 70;
          return (
            <g key={"slip" + i} pointerEvents="none">
              <rect x={16} y={y} width={268} height={58} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
              <text x={34} y={y + 40} fontSize={T.label} fontWeight={700} fill={C.ink}>{rows[i][0]}</text>
              <text x={266} y={y + 39} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{rows[i][1] + " " + tx(D.unit)}</text>
            </g>
          );
        })}
        {tells(rows.map((r: any) => r[0]), rows.map((r: any) => r[1]), ts >= 5 ? most : -1)}
        {ts >= 5 && <text x={340 + most * 184 + 86} y={392} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} pointerEvents="none">{tx("most")}</text>}
        {rows.map((r: any, i: number) => {
          const gx = 16 + i * 268;
          return (
            <g key={"cls" + i}>
              {[0, 1, 2].map((q) => <g key={q}>{ddKid(gx + 50 + q * 75, 4, 0.72, C.ink, C.panel)}</g>)}
              <text x={gx + 125} y={124} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Class") + " " + r[0]}</text>
              {S.asked.indexOf(i) >= 0 && ddTick(gx + 222, 110, C.ink)}
              <Hit id={"class-" + (i + 1)} x={gx} y={0} w={250} h={140} label={"Class " + r[0]} enabled={live} onPress={() => askKid(i)} />
            </g>
          );
        })}
        {fresh && S.asked.length === 0 && inviteBox(20, 3, 242, 134)}
      </g>
    );
  };

  const drawWhich = () => {
    const cloud = "M 812 250 Q 788 250 790 226 Q 792 200 822 200 Q 828 160 870 158 Q 904 128 940 158 Q 984 158 986 202 Q 1006 212 998 236 Q 992 250 968 250 Z";
    return (
      <g>
        {ts >= 3 && <rect x={-6} y={12} width={662} height={352} rx={24} fill={DD_BAND} pointerEvents="none" />}
        <rect x={0} y={20} width={650} height={336} rx={RAD.panel} fill={tint(C.panel, 0.35)} stroke={C.ink} strokeWidth={2} />
        <text x={24} y={62} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("rainy days")}</text>
        {D.months.map((m: any, i: number) => {
          const x = 22 + (i % 6) * 104, y = 84 + Math.floor(i / 6) * 132;
          return (
            <g key={"m" + i}>
              <rect x={x} y={y} width={96} height={120} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.5} />
              <DdFitText key={"mt" + tx(m[0])} max={86} x={x + 48} y={y + 42} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(m[0])}</DdFitText>
              {cellText(x + 48, y + 96, m[1], T.label, C.ink)}
            </g>
          );
        })}
        <rect x={690} y={20} width={396} height={336} rx={RAD.panel} fill={tint(C.panel, 0.35)} stroke={C.ink} strokeWidth={2} />
        <text x={714} y={62} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("rain cloud")}</text>
        <path d={cloud} transform="translate(-6,20)" fill="#FFFFFF" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
        {[0, 1, 2, 3, 4].map((q) => <path key={q} d={`M ${822 + q * 36} 292 L ${812 + q * 36} 322`} stroke={C.ink} strokeWidth={3.5} strokeLinecap="round" />)}
        {ts >= 1 && <text x={888} y={408} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink} pointerEvents="none">{tx("no count, no name")}</text>}
        {ts >= 2 && <text x={325} y={408} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink} pointerEvents="none">{tx("names and counts")}</text>}
        {ts >= 3 && (
          <g pointerEvents="none">
            <rect x={195} y={432} width={260} height={62} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
            <text x={325} y={474} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("this is data")}</text>
          </g>
        )}
      </g>
    );
  };

  /* ── phase 2: count cards set out under their headings, then the table added ── */
  const drawTable = () => {
    const G = DD_TABLE, names: string[] = D.names, counts: any[] = D.counts, whole = D.whole;
    const known = names.map((_: any, c: number) => c).filter((c: number) => counts[c] !== null);
    const miss = counts.indexOf(null);
    const steps = whole ? 3 : 4;
    const shown = Math.min(ts, steps);                      /* addends (or take-aways) drawn so far */
    const running = whole ? whole - known.slice(0, shown).reduce((a: number, c: number) => a + counts[c], 0)
      : known.slice(0, shown).reduce((a: number, c: number) => a + counts[c], 0);
    const lit = ts >= 1 && ts <= steps ? known[ts - 1] : -1;
    const done = ts > steps;
    const colX = (c: number) => G.x0 + c * G.pitch;
    return (
      <g>
        {runs("placed", S.placed.length, D.order.length)}
        {lit >= 0 && <rect x={colX(lit) - 6} y={G.headY - 6} width={G.w + 12} height={G.numY + G.numH - G.headY + 12} rx={10} fill={DD_BAND} pointerEvents="none" />}
        {colCue(G)}
        {names.map((nm: string, c: number) => {
          const x = colX(c), on = S.placed.indexOf(c) >= 0;
          return (
            <g key={"col" + c}>
              <rect x={x} y={G.headY} width={G.w} height={G.headH} fill={tint(C.panel, 0.35)} stroke={C.ink} strokeWidth={2} />
              <text x={x + G.w / 2} y={G.headY + 46} textAnchor="middle" fontSize={ddFit(tx(nm), G.w - 14)} fontWeight={700} fill={C.ink}>{tx(nm)}</text>
              <rect x={x} y={G.numY} width={G.w} height={G.numH} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
              {on && cellText(x + G.w / 2, G.numY + 80, counts[c], T.xl, DD_AMBER_INK)}
              {c === miss && (done ? cellText(x + G.w / 2, G.numY + 80, running, T.xl, DD_AMBER_INK) : blank(x + 32, G.numY + 22, G.w - 64, 76))}
            </g>
          );
        })}
        <rect x={910} y={40} width={170} height={198} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={995} y={76 + lowDy} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(D.label)}</text>
        <path d="M 910 92 H 1080" stroke={C.ink} strokeWidth={2} />
        {whole ? cellText(995, 190, whole, T.xl, DD_PURPLE_INK)
          : ts >= 1 ? cellText(995, 190, running, T.xl, DD_PURPLE_INK) : blank(945, 116, 100, 96)}
        {ts >= 1 && strip([...(whole ? [[String(whole), DD_PURPLE_INK]] : []),
          ...known.slice(0, shown).flatMap((c: number, j: number) => [...(whole || j ? [[whole ? "−" : "+", C.ink]] : []), [String(counts[c]), DD_AMBER_INK]]),
          ...(done ? [["=", C.ink], [String(running), whole ? DD_AMBER_INK : DD_PURPLE_INK]] : [])], 290, 336)}
        {tray("cards", 0, 20, 250, 450, lowDy)}
        {D.order.map((c: number, p: number) => {
          if (S.placed.indexOf(c) >= 0) return null;
          const x = 16, y = 76 + p * 94;
          return piece("card-" + (c + 1), names[c] + " card", { t: "card", i: c }, x, y, 218, 80, (
            <g>
              <rect x={x} y={y} width={218} height={80} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
              <text x={x + 18} y={y + 51} fontSize={ddFit(tx(names[c]), 150)} fontWeight={600} fill={C.ink}>{tx(names[c])}</text>
              <text x={x + 200} y={y + 52} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{counts[c]}</text>
            </g>
          ));
        })}
        {fresh && S.placed.length === 0 && inviteBox(8, 68, 234, 96)}
      </g>
    );
  };

  /* ── phases 3 and 4: the pictograph board ── */
  const titleStrip = (w: number, h: number) => (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={12} fill={tint(C.panel, 0.35)} stroke={C.ink} strokeWidth={2} />
      <text x={20} y={h / 2 + 11 + (nonEn && h < 60 ? (lang === "hi" ? 4 : 5) : 0)} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(D.title)}</text>
    </g>
  );
  const keyCard = (x: number, y: number, w: number, h: number, sz: number, draggable: boolean) => {
    /* hi/gu: the picture, its ring and "= n unit" start 22 after the key word as drawn (72 until it is
       measured), and "= n unit" stands 6 further off the ring; the English "key" is short and keeps
       the picture at x + 86 */
    const ringR = Math.min(34, h / 2 - 4);
    const px = x + (nonEn ? Math.max(86, 20 + (keyW || 72) + 22 + Math.max(0, ringR - sz / 2)) : 86);
    const body = (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
        <text ref={keyRef} x={x + 20} y={y + h / 2 + 10} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("key")}</text>
        {ddSym(D.sym, px, y + (h - sz) / 2, sz)}
        <text x={px + 14 + sz + (nonEn ? 6 : 0)} y={y + h / 2 + 11} fontSize={T.label} fontWeight={700} fill={C.ink}>{"= " + D.key + " " + tx(D.unit)}</text>
      </g>
    );
    if (!draggable) return body;
    const moving = !!(drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.t === "key");
    return (
      <g>
        {moving && <rect x={x} y={y} width={w} height={h} rx={14} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="10 10" />}
        {piece("pict-key", "key", { t: "key" }, x, y, w, h, body)}
        {fresh && Object.keys(S.read).length === 0 && <Invite x={px + sz / 2} y={y + h / 2} r={ringR} C={C} />}
      </g>
    );
  };
  /* a row's values under its pictures: the key once a picture, or (in the correction) the running sum */
  const offs = (D.rows || []).map((_: any, r: number) => D.rows.slice(0, r).reduce((a: number, q: any) => a + q[1] + 1, 0));

  const drawRead = () => {
    const rows = ddRows("read", D);
    const tracing = ts > 0 && ts < 999 ? offs.findIndex((o: number, r: number) => ts > o && ts <= o + D.rows[r][1] + 1) : -1;
    const bandRow = tracing >= 0 ? tracing : S.lit;
    const litN = D.rows[S.lit][1];
    return (
      <g>
        {runs("pictures", Math.min(S.read[S.lit] || 0, litN), litN)}
        {titleStrip(620, 64)}
        {rows.map((g: any, r: number) => {
          const N = D.rows[r][1], o = offs[r], got = S.read[r] || 0, sumAt = ts - o;
          return (
            <g key={"row" + r}>
              {r === bandRow && <rect x={g.x0 - 12} y={g.y - 8} width={N * g.pitch + 132} height={g.val - g.y + 14} rx={14} fill={DD_BAND} pointerEvents="none" />}
              <rect x={0} y={g.y} width={g.nameW} height={g.h} rx={10} fill={tint(C.panel, 0.35)} stroke={C.ink} strokeWidth={2} />
              <text x={18} y={g.y + g.h / 2 + 11} fontSize={ddFit(tx(D.rows[r][0]), g.nameW - 30)} fontWeight={700} fill={C.ink}>{tx(D.rows[r][0])}</text>
              {Array.from({ length: N }, (_, i) => ddSym(D.sym, g.x0 + i * g.pitch + (g.pitch - 20 - g.sz) / 2 + 10, g.top, g.sz, "s" + i))}
              {Array.from({ length: N }, (_, i) => (i < got
                ? <text key={"v" + i} x={g.x0 + i * g.pitch + g.pitch / 2} y={g.val} textAnchor="middle" fontSize={g.vsz} fontWeight={700} fill={DD_AMBER_INK} pointerEvents="none">{sumAt >= i + 1 ? D.key * (i + 1) : D.key}</text>
                : null))}
              {blank(g.tagX, g.tagY, 100, 72)}
              {sumAt >= N + 1 && cellText(g.tagX + 50, g.tagY + 48, D.key * N, T.label, DD_AMBER_INK)}
            </g>
          );
        })}
        {keyCard(660, 0, 426, 100, 60, true)}
      </g>
    );
  };

  const board4 = (tags: any) => {
    const rows = ddRows(kind, D);
    return rows.map((g: any, r: number) => {
      const N = kind === "rail" ? 0 : D.rows[r][1], got = S.read[r] || 0;
      return (
        <g key={"row" + r}>
          <rect x={0} y={g.y} width={g.nameW} height={g.h} rx={10} fill={tint(C.panel, 0.35)} stroke={C.ink} strokeWidth={2} />
          <text x={16} y={g.y + 47} fontSize={ddFit(tx(D.rows[r][0]), g.nameW - 26)} fontWeight={700} fill={C.ink}>{tx(D.rows[r][0])}</text>
          {Array.from({ length: N }, (_, i) => ddSym(D.sym, g.x0 + i * g.pitch + (g.pitch - g.sz) / 2, g.top, g.sz, "s" + i))}
          {kind === "most" && Array.from({ length: N }, (_, i) => (i < got
            ? <text key={"v" + i} x={g.x0 + i * g.pitch + g.pitch / 2} y={g.val} textAnchor="middle" fontSize={g.vsz} fontWeight={700} fill={DD_AMBER_INK} pointerEvents="none">{D.key}</text>
            : null))}
          {tags(g, r)}
        </g>
      );
    });
  };
  /* a row's number tag in phase 4: a drag piece until it is used, then quiet in place */
  const rowTag = (g: any, r: number, used: boolean) => {
    const v = D.rows[r][1] * (D.key || 1);
    const face = (dash: boolean) => (
      <g>
        <rect x={g.tagX} y={g.tagY} width={100} height={72} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} strokeDasharray={dash ? "8 7" : undefined} />
        {cellText(g.tagX + 50, g.tagY + 48, v, T.label, DD_AMBER_INK)}
      </g>
    );
    if (used || fin || !live) return <g key={"tag" + r}>{face(used)}</g>;
    return piece("row-" + (r + 1), D.rows[r][0] + " number", { t: "tag", r }, g.tagX, g.tagY, 100, 72, face(false));
  };

  const drawTotal = () => {
    const rows = ddRows("total", D), vals = D.rows.map((r: any) => r[1] * D.key);
    const order: number[] = S.added, shown = Math.min(ts, order.length), sum = order.slice(0, shown).reduce((a: number, r: number) => a + vals[r], 0);
    const cx = (j: number) => 60 + j * 104;
    return (
      <g>
        {runs("added", order.length, D.rows.length)}
        {titleStrip(600, 56)}
        {keyCard(640, 0, 446, 72, 48, false)}
        <rect x={0} y={414} width={640} height={108} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
        <text x={20} y={448 + (nonEn ? 7 : 0)} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("stickers in all")}</text>
        {ts >= 1 && ts <= order.length && <rect x={cx(ts - 1) - 34} y={468} width={68} height={46} rx={8} fill={DD_BAND} pointerEvents="none" />}
        {order.map((r: number, j: number) => (
          <g key={"add" + r} pointerEvents="none">
            {j > 0 && <text x={cx(j) - 52} y={502} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>+</text>}
            {cellText(cx(j), 502, vals[r], T.label, DD_AMBER_INK)}
          </g>
        ))}
        <text x={486} y={482} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>=</text>
        {ts >= 1 ? cellText(568, 486, sum, T.xl, DD_PURPLE_INK) : blank(510, 426, 116, 84)}
        {board4((g: any, r: number) => rowTag(g, r, order.indexOf(r) >= 0))}
        {fresh && order.length === 0 && <Invite x={rows[0].tagX + 50} y={rows[0].tagY + 36} r={52} C={C} />}
      </g>
    );
  };

  const drawRail = () => {
    const rows = ddRows("rail", D);
    const on: number[] = S.rail, vals = D.rows.map((r: any) => r[1]);
    const groups: number[][] = [];
    [...on].sort((a, b) => vals[b] - vals[a]).forEach((r) => {
      const gr = groups.find((q) => vals[q[0]] === vals[r]);
      if (gr) gr.push(r); else groups.push([r]);
    });
    const least = D.rows.reduce((b: number, r: any, i: number) => (r[1] < D.rows[b][1] ? i : b), 0);
    const G = Math.max(groups.length, 1);
    /* hi/gu: the rail steps in 24 a side so its longer end words stay inside the working area (condensed
       only if a tablet's font is wider still); the least row's band grows to hold the longer "fewest" */
    const rl = nonEn ? 174 : 150, rw = nonEn ? 752 : 800;
    const bandW = nonEn ? Math.max(nameTagBand(), 138 + (fewW || 150) + 18) : nameTagBand();
    return (
      <g>
        {runs("on rail", on.length, D.rows.length)}
        {ts >= 1 && <rect x={rows[least].x0 - 10} y={rows[least].y - 6} width={bandW} height={84} rx={12} fill={DD_BAND} pointerEvents="none" />}
        {titleStrip(600, 56)}
        <rect x={rl} y={414} width={rw} height={100} rx={RAD.panel} fill={tint(C.panel, 0.35)} stroke={C.ink} strokeWidth={2} />
        <DdFitText key={"re" + tx("most")} max={rl - 18} x={rl - 10} y={474} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("most")}</DdFitText>
        <DdFitText key={"rs" + tx("least")} max={1078 - (rl + rw + 12)} x={rl + rw + 12} y={474} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("least")}</DdFitText>
        {groups.map((gr: number[], gi: number) => {
          const cx = rl + ((gi + 0.5) * rw) / G, wAll = gr.length * 84 + (gr.length - 1) * 8, x0 = cx - wAll / 2;
          const isLeast = ts >= 1 && gr.indexOf(least) >= 0;
          return (
            <g key={"g" + gi} pointerEvents="none">
              {isLeast && <rect x={x0 - 8} y={422} width={wAll + 16} height={68} rx={10} fill={DD_BAND} />}
              {gr.map((r: number, j: number) => (
                <g key={"rt" + r}>
                  <rect x={x0 + j * 92} y={428} width={84} height={56} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
                  {cellText(x0 + j * 92 + 42, 467, vals[r], T.label, DD_AMBER_INK)}
                </g>
              ))}
              {gr.length > 1 && <path d={`M ${x0} 492 V 500 H ${x0 + wAll} V 492`} fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />}
            </g>
          );
        })}
        {board4((g: any, r: number) => rowTag(g, r, on.indexOf(r) >= 0))}
        {ts >= 2 && <text ref={fewRef} x={rows[least].tagX + 118} y={rows[least].y + 47} fontSize={T.label} fontWeight={700} fill={C.ink} pointerEvents="none">{tx("fewest")}</text>}
        {fresh && on.length === 0 && <Invite x={rows[0].tagX + 50} y={rows[0].tagY + 36} r={52} C={C} />}
      </g>
    );
  };
  const nameTagBand = () => 100 + 20 + 128;

  const drawMost = () => {
    const rows = ddRows("most", D), vals = D.rows.map((r: any) => r[1] * D.key);
    const most = vals.reduce((b: number, v: number, i: number) => (v > vals[b] ? i : b), 0);
    const litN = D.rows[S.lit][1];
    const bandRow = ts >= 5 ? most : ts === 0 && (S.read[S.lit] || 0) > 0 ? S.lit : -1;
    return (
      <g>
        {runs("pictures", Math.min(S.read[S.lit] || 0, litN), litN)}
        {bandRow >= 0 && <rect x={rows[bandRow].x0 - 10} y={rows[bandRow].y - 4} width={D.rows[bandRow][1] * 58 + 20 + (ts >= 5 ? 110 : 0)} height={80} rx={12} fill={DD_BAND} pointerEvents="none" />}
        {titleStrip(600, 56)}
        {board4((g: any, r: number) => (ts >= r + 1 ? (
          <g key={"tag" + r} pointerEvents="none">
            <rect x={g.tagX} y={g.tagY} width={100} height={72} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
            {cellText(g.tagX + 50, g.tagY + 48, vals[r], T.label, DD_AMBER_INK)}
          </g>
        ) : null))}
        {ts >= 5 && <text x={rows[most].tagX + 118} y={rows[most].y + 47} fontSize={T.label} fontWeight={700} fill={C.ink} pointerEvents="none">{tx("most")}</text>}
        {keyCard(640, 0, 446, 72, 48, true)}
      </g>
    );
  };

  /* ── free play: ask the class how they came to school, then set the slips out in the table ── */
  const drawFree = () => {
    const G = DD_FREE, kids: string[] = D.kids, names: string[] = D.names;
    const count = (c: number) => S.placed.filter((i: number) => kids[i] === names[c]).length;
    const total = names.reduce((a: number, _: any, c: number) => a + count(c), 0);
    return (
      <g>
        {runs("asked", S.asked.length, kids.length)}
        {tray("answers", 0, 160, 300, 364)}
        {colCue(G)}
        {names.map((nm: string, c: number) => {
          const x = G.x0 + c * G.pitch;
          return (
            <g key={"col" + c}>
              <rect x={x} y={G.headY} width={G.w} height={G.headH} fill={tint(C.panel, 0.35)} stroke={C.ink} strokeWidth={2} />
              <text x={x + G.w / 2} y={G.headY + 43 + lowDy} textAnchor="middle" fontSize={ddFit(tx(nm), G.w - 14)} fontWeight={700} fill={C.ink}>{tx(nm)}</text>
              <rect x={x} y={G.numY} width={G.w} height={G.numH} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
              {count(c) > 0 && cellText(x + G.w / 2, G.numY + 70, count(c), T.xl, DD_AMBER_INK)}
            </g>
          );
        })}
        <rect x={940} y={170} width={146} height={164} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={1013} y={204 + lowDy} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(D.label)}</text>
        <path d="M 940 218 H 1086" stroke={C.ink} strokeWidth={2} />
        {total > 0 && cellText(1013, 300, total, T.xl, DD_PURPLE_INK)}
        {S.asked.filter((i: number) => S.placed.indexOf(i) < 0).map((i: number, j: number) => {
          const x = 8 + (j % 3) * 98, y = 206 + Math.floor(j / 3) * 79;
          return piece("slip-" + (i + 1), kids[i] + " slip", { t: "slip", i }, x, y, 92, 76, (
            <g>
              <rect x={x} y={y} width={92} height={76} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
              <DdFitText key={"st" + tx(kids[i])} max={82} x={x + 46} y={y + 48} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(kids[i])}</DdFitText>
            </g>
          ));
        })}
        {classRow(kids.length, 90, 46, 0.92)}
      </g>
    );
  };

  return (
    <g>
      {kind === "collect" ? drawCollect() : kind === "classes" ? drawClasses() : kind === "which" ? drawWhich()
        : kind === "table" ? drawTable() : kind === "read" ? drawRead() : kind === "total" ? drawTotal()
        : kind === "rail" ? drawRail() : kind === "most" ? drawMost() : kind === "free" ? drawFree() : null}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, n = 1, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const ph: any = PHASES[n - 1] || {}, it: any = (ph.items || [])[last.item] || {}, D: any = MODEL[it.set] || {};
  let big = String(last.value), unit = "";
  if (it.choices) { const c = it.choices.find((x: any) => String(x.id) === String(last.value)); big = c ? tx(c.label) : big; }
  else if (it.parts) big = slotPartsOf(last.value, it.parts.length).join(", ");
  else { const v = leadNumber(last.value); big = v === null ? big : indian(v); if (it.unit) unit = tx(it.unit); }
  const icon = !!D.sym && !it.choices, x0 = icon ? 60 : 18;
  /* the unit rides along only where it fits beside the number */
  if (big.length * T.label * 0.58 + unit.length * T.micro * 0.58 + 8 > w - x0 - 14) unit = "";
  const size = big.length * T.label * 0.58 <= w - x0 - 14 ? T.label : T.micro;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      {icon && ddSym(D.sym, 14, (h - 38) / 2, 38)}
      <text x={x0} y={h / 2 + 11} fontSize={size} fontWeight={700} fill={C.ink}>{big}
        {unit && <tspan fontSize={T.micro} fontWeight={600} dx={8}>{unit}</tspan>}</text>
    </g>
  );
}

function DataDesk(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default DataDesk;
