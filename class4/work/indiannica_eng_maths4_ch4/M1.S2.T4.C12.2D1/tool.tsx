/* ═══ M1.S2.T4.C12.2D1 · table_builder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "table_builder";
const MEDIA_ID = "M1.S2.T4.C12.2D1";
const TOOL_NAME = "Table Builder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["An empty table, and one number written into its top row. Every row after it is made by adding."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You built every row by adding, and then read a whole table straight off another one.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any table past ten, with the compare rail and the even check open.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English above and below stays what the checks read. NCERT class 4 terms: पहाड़ा / ઘડિયો (table),
   पंक्ति / હાર (row), सम विषम / બેકી એકી. Digits stay digits: the runtime speaks them in the language
   in use. A line of only numbers and signs needs no entry. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Table Builder": "पहाड़ा बनाओ",
    "An empty table, and one number written into its top row. Every row after it is made by adding.": "एक खाली पहाड़ा, और सबसे ऊपर की पंक्ति में लिखी एक संख्या। उसके बाद की हर पंक्ति जोड़कर बनती है।",
    "You built every row by adding, and then read a whole table straight off another one.": "तुमने हर पंक्ति जोड़कर बनाई, और फिर एक पूरा पहाड़ा दूसरे से सीधे पढ़ लिया।",
    "Free play. Any table past ten, with the compare rail and the even check open.": "मुक्त खेल। दस के बाद का कोई भी पहाड़ा, तुलना की पटरी और सम जाँच खुली हैं।",
    "A table is repeated addition written down": "पहाड़ा बार-बार जोड़ने को लिखना है",
    "Add the same number once more for every row. Never look a row up.": "हर पंक्ति के लिए वही संख्या एक बार और जोड़ो। कोई पंक्ति याद से मत लिखो।",
    "Type the next row, and press enter to write it in.": "अगली पंक्ति लिखो, और उसे भरने के लिए एंटर दबाओ।",
    "What is added to the row above to make the next one?": "अगली पंक्ति बनाने के लिए ऊपर की पंक्ति में क्या जोड़ा जाता है?",
    "Start from the row above and add the table's own number, one row at a time.": "ऊपर की पंक्ति से शुरू करो और पहाड़े की अपनी संख्या जोड़ो, एक बार में एक पंक्ति।",
    "Build a table by adding the same number once more for every row.": "हर पंक्ति के लिए वही संख्या एक बार और जोड़कर पहाड़ा बनाओ।",
    "You learned: each row is the row above plus the table's number.": "तुमने सीखा: हर पंक्ति, ऊपर की पंक्ति में पहाड़े की संख्या जोड़कर बनती है।",
    "Add 14 for each row, to row 4": "14 जोड़ते चलो, पंक्ति 4 तक",
    "Build the first four rows of the table of fourteen by repeated addition.": "बार-बार जोड़कर चौदह के पहाड़े की पहली चार पंक्तियाँ बनाओ।",
    "Each row down adds the same amount. How much is it in the table of fourteen?": "नीचे की हर पंक्ति में उतना ही जुड़ता है। चौदह के पहाड़े में वह कितना है?",
    "Add 11 for each row, to row 4": "11 जोड़ते चलो, पंक्ति 4 तक",
    "Build the first four rows of the table of eleven by repeated addition.": "बार-बार जोड़कर ग्यारह के पहाड़े की पहली चार पंक्तियाँ बनाओ।",
    "Look at the arrow off the row above. Which number is written on it?": "ऊपर की पंक्ति से निकले तीर को देखो। उस पर कौन सी संख्या लिखी है?",
    "Which row holds 75?": "किस पंक्ति में 75 है?",
    "In the table of fifteen the third row is 45. Which row holds 75?": "पंद्रह के पहाड़े में तीसरी पंक्ति 45 है। किस पंक्ति में 75 है?",
    "From 45, how many more fifteens does it take to reach 75?": "45 से 75 तक पहुँचने में और कितने पंद्रह लगते हैं?",
    "One table can be built from another": "एक पहाड़ा दूसरे से बनाया जा सकता है",
    "Read the two rows that sit level with each other. What has happened to the one on the left?": "आमने-सामने की दोनों पंक्तियाँ पढ़ो। बाईं वाली संख्या के साथ क्या हुआ है?",
    "Slide the round handle down between the two tables to light each level pair.": "दोनों पहाड़ों के बीच गोल हत्था नीचे खिसकाओ, ताकि हर आमने-सामने की जोड़ी चमके।",
    "What was done to the small table's number to make the big table's number?": "छोटे पहाड़े की संख्या के साथ क्या किया कि बड़े पहाड़े की संख्या बनी?",
    "Slide down the rail and read three level pairs in turn. How does each right one grow?": "पटरी पर नीचे खिसकाओ और बारी-बारी से तीन जोड़ियाँ पढ़ो। हर दाईं संख्या कैसे बढ़ती है?",
    "The table of twelve is the table of six doubled, row for row. The table of sixteen is the table of eight doubled.": "बारह का पहाड़ा, हर पंक्ति में छह के पहाड़े का दुगुना है। सोलह का पहाड़ा, आठ के पहाड़े का दुगुना है।",
    "You learned: the table of 12 is the table of 6 doubled, row for row.": "तुमने सीखा: 12 का पहाड़ा, हर पंक्ति में 6 के पहाड़े का दुगुना है।",
    "What is 12 × 7?": "12 × 7 कितना है?",
    "The table of six gives 6 × 7 = 42. What is 12 × 7, and why?": "छह का पहाड़ा देता है 6 × 7 = 42। 12 × 7 कितना है, और क्यों?",
    "How many sixes make twelve? Look at 42 with that in mind.": "कितने छह मिलकर बारह बनते हैं? यह ध्यान में रखकर 42 को देखो।",
    "What is 16 × 6?": "16 × 6 कितना है?",
    "The table of eight gives 8 × 6 = 48. What is 16 × 6?": "आठ का पहाड़ा देता है 8 × 6 = 48। 16 × 6 कितना है?",
    "Read row 3 of both tables. How did 24 become 48?": "दोनों पहाड़ों की पंक्ति 3 पढ़ो। 24 से 48 कैसे बना?",
    "What is 12 × 9?": "12 × 9 कितना है?",
    "6 × 9 = 54. Use it to find 12 × 9, and say what you did to get there.": "6 × 9 = 54। इससे 12 × 9 निकालो, और बताओ कि तुमने क्या किया।",
    "Slide to row 2. What was done to 12 to give 24?": "पंक्ति 2 तक खिसकाओ। 24 पाने के लिए 12 के साथ क्या किया गया?",
    "An even number gives an even product": "सम संख्या से सम गुणनफल मिलता है",
    "Look at the last digit of every answer. Could any of them be odd?": "हर उत्तर का आखिरी अंक देखो। क्या उनमें से कोई विषम हो सकता है?",
    "Drag each product into the odd tray or the even tray.": "हर गुणनफल को विषम ट्रे या सम ट्रे में खींचो।",
    "What must the last digit of any product in this table be?": "इस पहाड़े के किसी भी गुणनफल का आखिरी अंक कैसा होना चाहिए?",
    "Drag three products into the trays by their last digits. Where do they land?": "आखिरी अंक देखकर तीन गुणनफल ट्रे में खींचो। वे कहाँ जाते हैं?",
    "Every product in the table of an even number is even. So an odd answer there cannot be right.": "सम संख्या के पहाड़े का हर गुणनफल सम होता है। इसलिए वहाँ विषम उत्तर सही नहीं हो सकता।",
    "You learned: every product in an even number's table is even.": "तुमने सीखा: सम संख्या के पहाड़े का हर गुणनफल सम होता है।",
    "Can 16 × 9 be odd?": "16 × 9 विषम हो सकता है?",
    "Without working it out, say whether 16 × 9 can end in an odd digit.": "बिना हल किए बताओ, क्या 16 × 9 का आखिरी अंक विषम हो सकता है।",
    "What is the last digit of every product in this table?": "इस पहाड़े के हर गुणनफल का आखिरी अंक क्या है?",
    "14 × 7 = 99? Why not?": "14 × 7 = 99? क्यों नहीं?",
    "A child says 14 × 7 comes to 99. Why can that be wrong before you check any working?": "एक बच्चा कहता है कि 14 × 7 से 99 आता है। हल जाँचे बिना, यह गलत क्यों हो सकता है?",
    "What is the last digit of 99, and of every product of 14?": "99 का आखिरी अंक क्या है, और 14 के हर गुणनफल का?",
    "All products of 15 even?": "15 के सभी गुणनफल सम?",
    "Is every product in the table of fifteen even?": "क्या पंद्रह के पहाड़े का हर गुणनफल सम है?",
    "What is the last digit of 15? And of 30?": "15 का आखिरी अंक क्या है? और 30 का?",
    "A bigger table means fewer steps": "बड़ा पहाड़ा, कम कदम",
    "Count the steps each way took. Which of them would you rather write out?": "गिनो कि हर तरीके में कितने कदम लगे। तुम कौन सा लिखना चाहोगे?",
    "Tap a digit on top, and the table hands you its fact.": "ऊपर के किसी अंक पर टैप करो, पहाड़ा तुम्हें उसका तथ्य देगा।",
    "How many facts does the table hand you for each digit on top?": "ऊपर के हर अंक के लिए पहाड़ा कितने तथ्य देता है?",
    "Work the ones digit first, then the tens, then the hundreds, carrying as you go.": "पहले इकाई का अंक हल करो, फिर दहाई, फिर सैकड़ा, हासिल साथ लेते हुए।",
    "A table past ten turns a two digit multiplier into one fact for each column. There are no two rows to add.": "दस के बाद का पहाड़ा दो अंकों के गुणक को हर स्तंभ के लिए एक तथ्य बना देता है। दो पंक्तियाँ जोड़नी नहीं पड़तीं।",
    "You learned: a table past ten gives one fact for each column.": "तुमने सीखा: दस के बाद का पहाड़ा हर स्तंभ के लिए एक तथ्य देता है।",
    "Find 412 × 13": "412 × 13 निकालो",
    "Find 412 × 13 using the table of thirteen, and say how many steps it took.": "तेरह के पहाड़े से 412 × 13 निकालो। बताओ, कितने कदम लगे?",
    "Thirteen is one number, not a one and a three. Which row of its table goes with the 2?": "तेरह एक ही संख्या है, एक और तीन नहीं। उसके पहाड़े की कौन सी पंक्ति 2 के साथ जाती है?",
    "Find 507 × 12": "507 × 12 निकालो",
    "Find 507 × 12 using the table of twelve.": "बारह के पहाड़े से 507 × 12 निकालो।",
    "Twelve stays whole. Which row of the table of twelve goes with the 7?": "बारह पूरा रहता है। बारह के पहाड़े की कौन सी पंक्ति 7 के साथ जाती है?",
    "Find 1,428 × 16": "1,428 × 16 निकालो",
    "Find 1,428 × 16 using the table of sixteen.": "सोलह के पहाड़े से 1,428 × 16 निकालो।",
    "Sixteen stays whole. Start with the 8: which row of the table of sixteen is it?": "सोलह पूरा रहता है। 8 से शुरू करो: सोलह के पहाड़े की कौन सी पंक्ति है?",
    /* the choices, and the working area's own words */
    "yes": "हाँ", "no": "नहीं", "99 is odd": "99 विषम है", "7 is odd": "7 विषम है", "99 is even": "99 सम है",
    "rows": "पंक्तियाँ", "rows of 12": "12 की पंक्तियाँ", "rows of 16": "16 की पंक्तियाँ", "sorted": "छँटे", "steps": "कदम",
    "row": "पंक्ति", "odd": "विषम", "even": "सम", "add": "जोड़ो", "7 steps": "7 कदम", "9 steps": "9 कदम",
    "add a row": "पंक्ति जोड़ो", "compare": "तुलना", "even check": "सम जाँच", "Add a row": "एक पंक्ति जोड़ो",
    "Open the compare rail": "तुलना की पटरी खोलो", "Close the compare rail": "तुलना की पटरी बंद करो",
    "Open the even check": "सम जाँच खोलो", "Close the even check": "सम जाँच बंद करो",
    "14 × 7 = 98, even": "14 × 7 = 98, सम", "why not: 99 is odd": "क्यों नहीं: 99 विषम है", "144 is even": "144 सम है",
    "odd, even, odd, even": "विषम, सम, विषम, सम", "odd, even, odd": "विषम, सम, विषम", "so: no": "इसलिए: नहीं",
    "table of 14": "14 का पहाड़ा", "table of 11": "11 का पहाड़ा", "75 is in": "75 है", "row 5": "पंक्ति 5 में",
  },
  gu: {
    "Table Builder": "ઘડિયો બનાવો",
    "An empty table, and one number written into its top row. Every row after it is made by adding.": "એક ખાલી ઘડિયો, અને સૌથી ઉપરની હારમાં લખેલી એક સંખ્યા. પછીની દરેક હાર ઉમેરીને બને છે.",
    "You built every row by adding, and then read a whole table straight off another one.": "તમે દરેક હાર ઉમેરીને બનાવી, અને પછી આખો ઘડિયો બીજા પરથી સીધો વાંચી લીધો.",
    "Free play. Any table past ten, with the compare rail and the even check open.": "મુક્ત રમત. દસ પછીનો કોઈ પણ ઘડિયો, સરખામણીનો પાટો અને બેકી તપાસ ખુલ્લાં છે.",
    "A table is repeated addition written down": "ઘડિયો એટલે વારંવાર ઉમેરવાનું લખાણ",
    "Add the same number once more for every row. Never look a row up.": "દરેક હાર માટે એ જ સંખ્યા એક વાર વધુ ઉમેરો. કોઈ હાર યાદથી ન લખો.",
    "Type the next row, and press enter to write it in.": "પછીની હાર લખો, અને તેને ભરવા એન્ટર દબાવો.",
    "What is added to the row above to make the next one?": "પછીની હાર બનાવવા ઉપરની હારમાં શું ઉમેરાય છે?",
    "Start from the row above and add the table's own number, one row at a time.": "ઉપરની હારથી શરૂ કરો અને ઘડિયાની પોતાની સંખ્યા ઉમેરો, એક વખતે એક હાર.",
    "Build a table by adding the same number once more for every row.": "દરેક હાર માટે એ જ સંખ્યા એક વાર વધુ ઉમેરીને ઘડિયો બનાવો.",
    "You learned: each row is the row above plus the table's number.": "તમે શીખ્યા: દરેક હાર, ઉપરની હારમાં ઘડિયાની સંખ્યા ઉમેરીને બને છે.",
    "Add 14 for each row, to row 4": "14 ઉમેરો, હાર 4 સુધી",
    "Build the first four rows of the table of fourteen by repeated addition.": "વારંવાર ઉમેરીને ચૌદના ઘડિયાની પહેલી ચાર હાર બનાવો.",
    "Each row down adds the same amount. How much is it in the table of fourteen?": "નીચેની દરેક હારમાં એટલું જ ઉમેરાય છે. ચૌદના ઘડિયામાં તે કેટલું છે?",
    "Add 11 for each row, to row 4": "11 ઉમેરો, હાર 4 સુધી",
    "Build the first four rows of the table of eleven by repeated addition.": "વારંવાર ઉમેરીને અગિયારના ઘડિયાની પહેલી ચાર હાર બનાવો.",
    "Look at the arrow off the row above. Which number is written on it?": "ઉપરની હારમાંથી નીકળતું તીર જુઓ. તેના પર કઈ સંખ્યા લખી છે?",
    "Which row holds 75?": "કઈ હારમાં 75 છે?",
    "In the table of fifteen the third row is 45. Which row holds 75?": "પંદરના ઘડિયામાં ત્રીજી હાર 45 છે. કઈ હારમાં 75 છે?",
    "From 45, how many more fifteens does it take to reach 75?": "45 થી 75 સુધી પહોંચવા બીજા કેટલા પંદર જોઈએ?",
    "One table can be built from another": "એક ઘડિયો બીજા પરથી બનાવી શકાય છે",
    "Read the two rows that sit level with each other. What has happened to the one on the left?": "સામસામેની બંને હાર વાંચો. ડાબી બાજુવાળી સંખ્યાનું શું થયું છે?",
    "Slide the round handle down between the two tables to light each level pair.": "બંને ઘડિયા વચ્ચે ગોળ હાથો નીચે સરકાવો, જેથી દરેક સામસામેની જોડી ચમકે.",
    "What was done to the small table's number to make the big table's number?": "નાના ઘડિયાની સંખ્યા સાથે શું કર્યું કે મોટા ઘડિયાની સંખ્યા બની?",
    "Slide down the rail and read three level pairs in turn. How does each right one grow?": "પાટા પર નીચે સરકાવો અને વારાફરતી ત્રણ જોડી વાંચો. દરેક જમણી સંખ્યા કેવી રીતે વધે છે?",
    "The table of twelve is the table of six doubled, row for row. The table of sixteen is the table of eight doubled.": "બારનો ઘડિયો, દરેક હારમાં છના ઘડિયાનું બમણું છે. સોળનો ઘડિયો, આઠના ઘડિયાનું બમણું છે.",
    "You learned: the table of 12 is the table of 6 doubled, row for row.": "તમે શીખ્યા: 12 નો ઘડિયો, દરેક હારમાં 6 ના ઘડિયાનું બમણું છે.",
    "What is 12 × 7?": "12 × 7 કેટલા?",
    "The table of six gives 6 × 7 = 42. What is 12 × 7, and why?": "છનો ઘડિયો આપે છે 6 × 7 = 42. 12 × 7 કેટલા, અને કેમ?",
    "How many sixes make twelve? Look at 42 with that in mind.": "કેટલા છ મળીને બાર બને? એ ધ્યાનમાં રાખીને 42 જુઓ.",
    "What is 16 × 6?": "16 × 6 કેટલા?",
    "The table of eight gives 8 × 6 = 48. What is 16 × 6?": "આઠનો ઘડિયો આપે છે 8 × 6 = 48. 16 × 6 કેટલા?",
    "Read row 3 of both tables. How did 24 become 48?": "બંને ઘડિયાની હાર 3 વાંચો. 24 માંથી 48 કેવી રીતે બન્યા?",
    "What is 12 × 9?": "12 × 9 કેટલા?",
    "6 × 9 = 54. Use it to find 12 × 9, and say what you did to get there.": "6 × 9 = 54. તેનાથી 12 × 9 શોધો, અને કહો કે તમે શું કર્યું.",
    "Slide to row 2. What was done to 12 to give 24?": "હાર 2 સુધી સરકાવો. 24 મેળવવા 12 સાથે શું કર્યું?",
    "An even number gives an even product": "બેકી સંખ્યાથી બેકી ગુણાકાર મળે છે",
    "Look at the last digit of every answer. Could any of them be odd?": "દરેક જવાબનો છેલ્લો અંક જુઓ. શું તેમાંથી કોઈ એકી હોઈ શકે?",
    "Drag each product into the odd tray or the even tray.": "દરેક ગુણાકારને એકી ટ્રે કે બેકી ટ્રેમાં ખેંચો.",
    "What must the last digit of any product in this table be?": "આ ઘડિયાના કોઈ પણ ગુણાકારનો છેલ્લો અંક કેવો હોવો જોઈએ?",
    "Drag three products into the trays by their last digits. Where do they land?": "છેલ્લો અંક જોઈને ત્રણ ગુણાકાર ટ્રેમાં ખેંચો. તે ક્યાં જાય છે?",
    "Every product in the table of an even number is even. So an odd answer there cannot be right.": "બેકી સંખ્યાના ઘડિયાનો દરેક ગુણાકાર બેકી હોય છે. તેથી ત્યાં એકી જવાબ સાચો ન હોઈ શકે.",
    "You learned: every product in an even number's table is even.": "તમે શીખ્યા: બેકી સંખ્યાના ઘડિયાનો દરેક ગુણાકાર બેકી હોય છે.",
    "Can 16 × 9 be odd?": "શું 16 × 9 એકી હોઈ શકે?",
    "Without working it out, say whether 16 × 9 can end in an odd digit.": "ગણ્યા વગર કહો, શું 16 × 9 નો છેલ્લો અંક એકી હોઈ શકે.",
    "What is the last digit of every product in this table?": "આ ઘડિયાના દરેક ગુણાકારનો છેલ્લો અંક શું છે?",
    "14 × 7 = 99? Why not?": "14 × 7 = 99? કેમ નહીં?",
    "A child says 14 × 7 comes to 99. Why can that be wrong before you check any working?": "એક બાળક કહે છે કે 14 × 7 થી 99 આવે છે. ગણતરી તપાસ્યા વગર, તે ખોટું કેમ હોઈ શકે?",
    "What is the last digit of 99, and of every product of 14?": "99 નો છેલ્લો અંક શું છે, અને 14 ના દરેક ગુણાકારનો?",
    "All products of 15 even?": "15 ના બધા ગુણાકાર બેકી?",
    "Is every product in the table of fifteen even?": "શું પંદરના ઘડિયાનો દરેક ગુણાકાર બેકી છે?",
    "What is the last digit of 15? And of 30?": "15 નો છેલ્લો અંક શું છે? અને 30 નો?",
    "A bigger table means fewer steps": "મોટો ઘડિયો, ઓછાં પગલાં",
    "Count the steps each way took. Which of them would you rather write out?": "ગણો કે દરેક રીતમાં કેટલાં પગલાં થયાં. તમે કઈ રીત લખવાનું પસંદ કરશો?",
    "Tap a digit on top, and the table hands you its fact.": "ઉપરના કોઈ અંક પર ટૅપ કરો, ઘડિયો તમને તેનું તથ્ય આપશે.",
    "How many facts does the table hand you for each digit on top?": "ઉપરના દરેક અંક માટે ઘડિયો કેટલાં તથ્ય આપે છે?",
    "Work the ones digit first, then the tens, then the hundreds, carrying as you go.": "પહેલાં એકમનો અંક ઉકેલો, પછી દશક, પછી શતક, વદી સાથે લેતાં.",
    "A table past ten turns a two digit multiplier into one fact for each column. There are no two rows to add.": "દસ પછીનો ઘડિયો બે અંકના ગુણકને દરેક સ્તંભ માટે એક તથ્ય બનાવી દે છે. બે હાર ઉમેરવી પડતી નથી.",
    "You learned: a table past ten gives one fact for each column.": "તમે શીખ્યા: દસ પછીનો ઘડિયો દરેક સ્તંભ માટે એક તથ્ય આપે છે.",
    "Find 412 × 13": "412 × 13 શોધો",
    "Find 412 × 13 using the table of thirteen, and say how many steps it took.": "તેરના ઘડિયાથી 412 × 13 શોધો. કહો, કેટલાં પગલાં થયાં?",
    "Thirteen is one number, not a one and a three. Which row of its table goes with the 2?": "તેર એક જ સંખ્યા છે, એક અને ત્રણ નહીં. તેના ઘડિયાની કઈ હાર 2 સાથે જાય છે?",
    "Find 507 × 12": "507 × 12 શોધો",
    "Find 507 × 12 using the table of twelve.": "બારના ઘડિયાથી 507 × 12 શોધો.",
    "Twelve stays whole. Which row of the table of twelve goes with the 7?": "બાર આખો રહે છે. બારના ઘડિયાની કઈ હાર 7 સાથે જાય છે?",
    "Find 1,428 × 16": "1,428 × 16 શોધો",
    "Find 1,428 × 16 using the table of sixteen.": "સોળના ઘડિયાથી 1,428 × 16 શોધો.",
    "Sixteen stays whole. Start with the 8: which row of the table of sixteen is it?": "સોળ આખો રહે છે. 8 થી શરૂ કરો: સોળના ઘડિયાની કઈ હાર છે?",
    /* the choices, and the working area's own words */
    "yes": "હા", "no": "ના", "99 is odd": "99 એકી છે", "7 is odd": "7 એકી છે", "99 is even": "99 બેકી છે",
    "rows": "હાર", "rows of 12": "12 ની હાર", "rows of 16": "16 ની હાર", "sorted": "ગોઠવ્યા", "steps": "પગલાં",
    "row": "હાર", "odd": "એકી", "even": "બેકી", "add": "ઉમેરો", "7 steps": "7 પગલાં", "9 steps": "9 પગલાં",
    "add a row": "હાર ઉમેરો", "compare": "સરખામણી", "even check": "બેકી તપાસ", "Add a row": "એક હાર ઉમેરો",
    "Open the compare rail": "સરખામણીનો પાટો ખોલો", "Close the compare rail": "સરખામણીનો પાટો બંધ કરો",
    "Open the even check": "બેકી તપાસ ખોલો", "Close the even check": "બેકી તપાસ બંધ કરો",
    "14 × 7 = 98, even": "14 × 7 = 98, બેકી", "why not: 99 is odd": "કેમ નહીં: 99 એકી છે", "144 is even": "144 બેકી છે",
    "odd, even, odd, even": "એકી, બેકી, એકી, બેકી", "odd, even, odd": "એકી, બેકી, એકી", "so: no": "તેથી: ના",
    "table of 14": "14 નો ઘડિયો", "table of 11": "11 નો ઘડિયો", "75 is in": "75 છે", "row 5": "હાર 5 માં",
  },
};

/* ── the chapter's colours and the table's ruling ─────────────────────────────────────────────
   the number being multiplied deep blue, the number it is multiplied by amber, the product green,
   a carried digit vermilion, a partial product row rose, a zero that only holds a place grey */
const TB_BLUE = CONTENT.hundred;
const TB_AMBER = CONTENT.ten;
const TB_GREEN = CONTENT.one;
const TB_VERM = CONTENT.pointer;
const TB_ROSE = CONTENT.bead;
const TB_GREY = "#767676";
/* numerals take a deeper ink so they read at 4.5:1 (amber needs more than the usual quarter) */
const TB_INK = { b: shade(TB_BLUE, 0.25), a: shade(TB_AMBER, 0.4), g: shade(TB_GREEN, 0.25), v: shade(TB_VERM, 0.25), r: shade(TB_ROSE, 0.3) };
/* a table: a header row and ten rows, 48 each, so it stands the whole 528 of the working area */
const TB = { head: 48, rh: 48, rows: 10 };
const tbTop = (r: number) => TB.head + r * TB.rh;          /* r = 0 is row 1 */
const tbMid = (r: number) => tbTop(r) + TB.rh / 2;
const tbBase = (r: number) => tbMid(r) + 11;
const tbRowAt = (y: number) => Math.max(0, Math.min(TB.rows - 1, Math.floor((y - TB.head) / TB.rh)));
const tbTimes = (n: number, k = TB.rows) => Array.from({ length: k }, (_, i) => n * (i + 1));
/* the numbers written in an answer ("14, 28, 42, 56" -> [14, 28, 42, 56]; "5,356" stays one number) */
const tbNums = (v: any) => (String(v ?? "").match(/\d{1,3}(?:,\d{2,3})+(?!\d)|\d+/g) || []).map((s) => Number(s.replace(/,/g, "")));
const tbDigits = (v: number) => String(v).split("").reverse().map(Number); /* ones first */
const TB_PLACE = ["ones", "tens", "hundreds", "thousands", "ten thousands"];
const TB_YES_NO = [{ id: "yes", label: "yes" }, { id: "no", label: "no" }];
/* the two trays of the even check */
const TB_TRAY: any = { odd: { x: 330, y: 180, w: 360, h: 344 }, even: { x: 716, y: 180, w: 360, h: 344 } };
const tbTrayAt = (p: any) => {
  if (!p || !isFinite(p.x) || !isFinite(p.y)) return null;
  for (const side of ["odd", "even"]) { const t = TB_TRAY[side]; if (p.x >= t.x && p.x <= t.x + t.w && p.y >= t.y - 40 && p.y <= t.y + t.h) return side; }
  return null;
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>)
           kind  build (rows typed one by one) · row · double · parity · claim · steps */
const PHASES = [
  {
    n: 1,
    concept: "A table is repeated addition written down",
    conceptId: "M1.S2.T4.C12", objectiveIds: ["O5"],
    says: ["Add the same number once more for every row. Never look a row up.", "Type the next row, and press enter to write it in."],
    ladder: ["What is added to the row above to make the next one?", "Start from the row above and add the table's own number, one row at a time."],
    closing: "Build a table by adding the same number once more for every row.",
    learned: "You learned: each row is the row above plus the table's number.",
    traceback: "The missed row is emptied and built again as an arrow off the row above carrying the table's own number, down to the last row asked; the child's row stays faintly beside it.",
    items: [
      /* learn ML1: answer in the plan = 14, 28, 42 and 56 (row 1 is given; the child adds rows 2, 3 and 4) */
      { qid: "M1.S2.T4.C12:ML1", kind: "build", n: 14, upto: 4, answer: "14, 28, 42, 56", winMs: 2400, ask: "Add 14 for each row, to row 4",
        say: "Build the first four rows of the table of fourteen by repeated addition.", miss: "Each row down adds the same amount. How much is it in the table of fourteen?" },
      /* practice 1: answer in the plan = 11, 22, 33 and 44 */
      { qid: "M1.S2.T4.C12:1", kind: "build", n: 11, upto: 4, answer: "11, 22, 33, 44", winMs: 2400, ask: "Add 11 for each row, to row 4",
        say: "Build the first four rows of the table of eleven by repeated addition.", miss: "Look at the arrow off the row above. Which number is written on it?" },
      /* practice 2: answer in the plan = The fifth row, because 45 + 15 = 60 and 60 + 15 = 75 */
      { qid: "M1.S2.T4.C12:2", kind: "row", n: 15, given: 3, target: 75, answer: 5, winMs: 2600, ask: "Which row holds 75?",
        say: "In the table of fifteen the third row is 45. Which row holds 75?", miss: "From 45, how many more fifteens does it take to reach 75?" },
    ],
  },
  {
    n: 2,
    concept: "One table can be built from another",
    conceptId: "M1.S2.T4.C13", objectiveIds: ["O6"],
    says: ["Read the two rows that sit level with each other. What has happened to the one on the left?", "Slide the round handle down between the two tables to light each level pair."],
    ladder: ["What was done to the small table's number to make the big table's number?", "Slide down the rail and read three level pairs in turn. How does each right one grow?"],
    closing: "The table of twelve is the table of six doubled, row for row. The table of sixteen is the table of eight doubled.",
    learned: "You learned: the table of 12 is the table of 6 doubled, row for row.",
    traceback: "The level pair lights, a second copy of the left product lands beside the first and the doubled product is written in; the row the child's number belongs to is lit in amber.",
    items: [
      /* learn ML2: answer in the plan = 84, because every product in the table of twelve is double the product in the same row of the table of six */
      { qid: "M1.S2.T4.C13:ML2", kind: "double", small: 6, big: 12, row: 7, answer: 84, winMs: 2600, ask: "What is 12 × 7?",
        say: "The table of six gives 6 × 7 = 42. What is 12 × 7, and why?", miss: "How many sixes make twelve? Look at 42 with that in mind." },
      /* practice 3: answer in the plan = 96, because the table of sixteen is the table of eight doubled */
      { qid: "M1.S2.T4.C13:3", kind: "double", small: 8, big: 16, row: 6, answer: 96, winMs: 2600, ask: "What is 16 × 6?",
        say: "The table of eight gives 8 × 6 = 48. What is 16 × 6?", miss: "Read row 3 of both tables. How did 24 become 48?" },
      /* practice 4: answer in the plan = 108, by doubling 54 */
      { qid: "M1.S2.T4.C13:4", kind: "double", small: 6, big: 12, row: 9, answer: 108, winMs: 2600, ask: "What is 12 × 9?",
        say: "6 × 9 = 54. Use it to find 12 × 9, and say what you did to get there.", miss: "Slide to row 2. What was done to 12 to give 24?" },
    ],
  },
  {
    n: 3,
    concept: "An even number gives an even product",
    conceptId: "M1.S2.T4.C14", objectiveIds: ["O6"],
    says: ["Look at the last digit of every answer. Could any of them be odd?", "Drag each product into the odd tray or the even tray."],
    ladder: ["What must the last digit of any product in this table be?", "Drag three products into the trays by their last digits. Where do they land?"],
    closing: "Every product in the table of an even number is even. So an odd answer there cannot be right.",
    learned: "You learned: every product in an even number's table is even.",
    traceback: "The row counts are covered and every product is offered to the trays one at a time; the hidden or claimed product is worked out in the open and sorted.",
    items: [
      /* learn ML3: answer in the plan = No. 16 is even, so every product in its table is even, and 16 x 9 = 144 */
      { qid: "M1.S2.T4.C14:ML3", kind: "parity", q: "canOdd", n: 16, hide: 8, answer: "no", choices: TB_YES_NO, winMs: 3400, ask: "Can 16 × 9 be odd?",
        say: "Without working it out, say whether 16 × 9 can end in an odd digit.", miss: "What is the last digit of every product in this table?" },
      /* practice 5: answer in the plan = Because 14 is even, so every product in its table is even, and 99 is odd. The product is 98 */
      { qid: "M1.S2.T4.C14:5", kind: "claim", n: 14, row: 6, claim: 99, answer: "99 is odd", winMs: 3400, ask: "14 × 7 = 99? Why not?",
        choices: [{ id: "99 is odd", label: "99 is odd" }, { id: "7 is odd", label: "7 is odd" }, { id: "99 is even", label: "99 is even" }],
        say: "A child says 14 × 7 comes to 99. Why can that be wrong before you check any working?", miss: "What is the last digit of 99, and of every product of 14?" },
      /* practice 6: answer in the plan = No. 15 is odd, so its products are odd and even by turns, such as 15, 30 and 45 */
      { qid: "M1.S2.T4.C14:6", kind: "parity", q: "allEven", n: 15, answer: "no", choices: TB_YES_NO, winMs: 3400, ask: "All products of 15 even?",
        say: "Is every product in the table of fifteen even?", miss: "What is the last digit of 15? And of 30?" },
    ],
  },
  {
    n: 4,
    concept: "A bigger table means fewer steps",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O5"],
    says: ["Count the steps each way took. Which of them would you rather write out?", "Tap a digit on top, and the table hands you its fact."],
    ladder: ["How many facts does the table hand you for each digit on top?", "Work the ones digit first, then the tens, then the hundreds, carrying as you go."],
    closing: "A table past ten turns a two digit multiplier into one fact for each column. There are no two rows to add.",
    learned: "You learned: a table past ten gives one fact for each column.",
    traceback: "The multiplier is split into its tens and ones, then both routes are worked side by side: one table fact a column with its carry, and the two rose rows added, ending on the same product.",
    items: [
      /* learn ML4: answer in the plan = 5356, in three steps, one for each column of the multiplicand */
      { qid: "M1.S2.T4.C15:ML4", kind: "steps", a: 412, b: 13, answer: 5356, winMs: 4200, ask: "Find 412 × 13",
        say: "Find 412 × 13 using the table of thirteen, and say how many steps it took.", miss: "Thirteen is one number, not a one and a three. Which row of its table goes with the 2?" },
      /* practice 7: answer in the plan = 6084 */
      { qid: "M1.S2.T4.C15:7", kind: "steps", a: 507, b: 12, answer: 6084, winMs: 4200, ask: "Find 507 × 12",
        say: "Find 507 × 12 using the table of twelve.", miss: "Twelve stays whole. Which row of the table of twelve goes with the 7?" },
      /* practice 8: answer in the plan = 22,848 */
      { qid: "M1.S2.T4.C15:8", kind: "steps", a: 1428, b: 16, answer: 22848, winMs: 4800, ask: "Find 1,428 × 16",
        say: "Find 1,428 × 16 using the table of sixteen.", miss: "Sixteen stays whole. Start with the 8: which row of the table of sixteen is it?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  rowsRuled: TB.rows, rowHeight: TB.rh, tablesPastTen: [11, 12, 13, 14, 15, 16],
  colours: { multiplied: "deep blue", multiplier: "amber", product: "green", carry: "vermilion", partialProduct: "rose", placeHolder: "grey" },
  trays: ["odd", "even"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a built table must be the whole column, row for row; a word answer by its id; numbers as numbers */
const judge = (item: any, v: any) => {
  if (item.kind === "build") { const a = tbNums(v), b = tbNums(item.answer); return a.length === b.length && a.every((x, i) => x === b[i]); }
  if (item.choices) return String(v ?? "").trim().toLowerCase() === String(item.answer).toLowerCase();
  return leadNumber(v) === item.answer;
};
/* oracle: every answer again by a route that shares no code with judge or Work
   (rows by multiplication, not addition; the row by division; doubling by the bigger table itself;
   parity by the written last digit; the product by splitting the multiplier into tens and ones) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "build") { const out: string[] = []; for (let r = 1; r <= it.upto; r++) out.push(String(it.n * r)); return out.join(", ") === it.answer; }
  if (it.kind === "row") return it.target % it.n === 0 && it.target / it.n === it.answer && it.n * it.given < it.target;
  if (it.kind === "double") return it.big === it.small + it.small && it.big * it.row === it.answer;
  if (it.kind === "parity") {
    const ends = Array.from({ length: 10 }, (_, i) => String(it.n * (i + 1)).slice(-1));
    if (it.q === "canOdd") return ("13579".includes(String(it.n * (it.hide + 1)).slice(-1)) ? "yes" : "no") === it.answer;
    return (ends.every((d) => "02468".includes(d)) ? "yes" : "no") === it.answer;
  }
  if (it.kind === "claim") {
    const real = it.n * (it.row + 1);
    return real !== it.claim && "13579".includes(String(it.claim).slice(-1)) && "02468".includes(String(real).slice(-1)) && it.answer === it.claim + " is odd";
  }
  if (it.kind === "steps") { const ones = it.b % 10, tens = (it.b - ones) / 10; return it.a * ones + it.a * tens * 10 === it.answer && it.a * it.b === it.answer; }
  return false;
}));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "build") { const out = [item.n]; for (let r = 2; r <= item.upto; r++) out.push(out[out.length - 1] + r); return out.join(", "); } /* adds the row count */
  if (item.kind === "row") return item.answer - 1;                          /* counts one step short */
  if (item.kind === "double") return item.small * item.row + item.small;    /* adds six instead of doubling */
  if (item.kind === "parity") return item.answer === "no" ? "yes" : "no";   /* the odd multiplier decides */
  if (item.kind === "claim") return (item.row + 1) + " is odd";             /* the multiplier, not the product */
  if (item.kind === "steps") return item.a * Math.floor(item.b / 10) + item.a * (item.b % 10); /* 1 and 3 as two multipliers */
  return "~";
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.kind === "build") { const rows = tbNums(item.answer).slice(1); return [item.answer, ...rows.map(String), ...rows.map((x) => words(x))]; }
  if (item.choices) return [String(item.answer)];
  return [String(item.answer), indian(item.answer), words(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent's answer(): a whole column is written into the table as a child would; anything else is typed */
const answer = (item: any, v: any) => {
  if (item.kind === "build" && HOOK.column) { const xs = tbNums(v); if (xs.length >= 2) { HOOK.column(xs); return true; } }
  return undefined;
};
/* the agent's check() before Enter: a column written in is sent; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── shared drawing ─────────────────────────────────────────────────────────────────────── */

const TB_CSS = `
.tb-slide{transition:transform 420ms cubic-bezier(.3,.7,.25,1)}
.tb-pop{transform-box:fill-box;transform-origin:center;animation:tbPop 420ms ease-out both}
@keyframes tbPop{from{transform:scale(.55);opacity:0}to{transform:none;opacity:1}}
.tb-thread{animation:tbThread 760ms cubic-bezier(.3,.7,.25,1) both}
@keyframes tbThread{from{transform:translateX(-320px);opacity:0}to{transform:none;opacity:1}}
.tb-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.tb-slide{transition:none}.tb-pop,.tb-thread{animation:none}}
`;

/* an equation written without spaces in its text, the gaps drawn as offsets (a reading, not a sentence) */
function TbEq({ x, y, size, parts, anchor, C, weight }: any) {
  return (
    <text x={x} y={y} textAnchor={anchor || "start"} fontSize={size} fontWeight={weight || 700} fill={C.ink}>
      {parts.map((p: any, i: number) => (
        <tspan key={i} dx={i ? Math.round(size * 0.22) : 0} {...(p.f ? { fill: p.f } : {})}>{String(p.t)}</tspan>
      ))}
    </text>
  );
}

/* the running count in the runs zone (64,108), drawn 94 above the working area */
function TbRuns({ C, count, of, label, tr = (v: any) => v }: any) {
  return (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={22} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>
        {String(count)}{of !== undefined ? <tspan fontSize={T.label} fontWeight={600}>{" / " + of}</tspan> : null}
      </text>
      <text x={310} y={-46} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tr(label)}</text>
    </g>
  );
}

/* a table of ten rows: the row count (how many times the number is taken) in a narrow band, then
   the product cell. cells[r] = { v, ink, box (dashed outline colour), cls, delay } or null */
function TbTable({ C, x = 0, cw = 64, pw = 236, n, cells, noCount = false, cover = false, lit = -1, litColor = TB_GREEN,
  rings = [], right = false, lastRing = false, countInk = TB_INK.a, headInk = TB_INK.b, lang = "en" }: any) {
  const bw = noCount ? 0 : cw, w = bw + pw, px = x + bw;
  const tx = right ? px + pw - 28 : px + pw / 2;
  return (
    <g>
      <rect x={x} y={2} width={w} height={TB.head - 6} rx={12} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
      <text x={x + w / 2} y={TB.head / 2 + 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{lang === "hi" || lang === "gu"
        ? <><tspan fill={headInk}>{n}</tspan>{lang === "hi" ? " का पहाड़ा" : " નો ઘડિયો"}</>
        : <>table of <tspan fill={headInk}>{n}</tspan></>}</text>
      <rect x={x} y={TB.head} width={w} height={TB.rh * TB.rows} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {Array.from({ length: TB.rows - 1 }).map((_, r) => (
        <line key={"l" + r} x1={x + 2} y1={tbTop(r + 1)} x2={x + w - 2} y2={tbTop(r + 1)} stroke={tint(C.rule, 0.35)} strokeWidth={1.5} />
      ))}
      {!noCount && <line x1={px} y1={TB.head} x2={px} y2={TB.head + TB.rh * TB.rows} stroke={C.rule} strokeWidth={2} />}
      {lit >= 0 && <rect x={x + 3} y={tbTop(lit) + 3} width={w - 6} height={TB.rh - 6} rx={9} fill={tint(litColor, 0.86)} stroke={litColor} strokeWidth={2.5} />}
      {rings.map((g: any, i: number) => (
        <rect key={"g" + i} x={x + 3} y={tbTop(g.r) + 3} width={w - 6} height={TB.rh - 6} rx={9} fill={g.fill || "none"} stroke={g.color} strokeWidth={4} strokeDasharray={g.dashed ? "9 7" : undefined} />
      ))}
      {!noCount && (cover
        ? <rect x={x + 5} y={TB.head + 5} width={bw - 10} height={TB.rh * TB.rows - 10} rx={9} fill={tint(C.panel, 0.1)} stroke={C.rule} strokeWidth={1.5} />
        : Array.from({ length: TB.rows }).map((_, r) => (
          <text key={"c" + r} x={x + bw / 2} y={tbBase(r)} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={countInk}>{r + 1}</text>
        )))}
      {cells.map((c: any, r: number) => c && (
        <g key={"p" + r}>
          {c.box && <rect x={px + 12} y={tbTop(r) + 5} width={pw - 24} height={TB.rh - 10} rx={9} fill="none" stroke={c.box} strokeWidth={2.5} strokeDasharray="7 6" />}
          {lastRing && c.v !== undefined && c.v !== null && c.v !== "?" && <circle cx={tx - 10} cy={tbMid(r)} r={17} fill="none" stroke={C.accent} strokeWidth={2.5} />}
          {c.v !== undefined && c.v !== null && (
            <text className={c.cls || "tb-pop"} style={c.delay ? ({ animationDelay: c.delay + "ms" } as any) : undefined}
              x={tx} y={tbBase(r)} textAnchor={right ? "end" : "middle"} fontSize={T.label} fontWeight={700} fill={c.ink || TB_INK.g}>{String(c.v)}</text>
          )}
        </g>
      ))}
    </g>
  );
}

/* the step down the table: an arrow leaves the product above, the table's own number written on it */
function TbArrow({ x, r, n, hot, dashed }: any) {
  const y1 = tbMid(r - 1) + 2, y2 = tbMid(r) - 2, bx = x + 32, col = hot ? TB_INK.b : tint(TB_BLUE, 0.35), sw = hot ? 5 : 3;
  return (
    <g>
      <path d={`M ${x + 2} ${y1} C ${bx} ${y1} ${bx} ${y2} ${x + 8} ${y2}`} fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round" strokeDasharray={dashed ? "5 7" : undefined} />
      <path d={`M ${x + 8} ${y2} l 10 -7 M ${x + 8} ${y2} l 11 5`} fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round" />
      <text x={bx + 6} y={(y1 + y2) / 2 + 10} fontSize={T.micro} fontWeight={700} fill={TB_INK.b}>+{n}</text>
    </g>
  );
}

/* a state that belongs to one question: reset when the question changes, readable by the timeline */
function useTbState(fresh: (idx: number) => any, index: number, stage: string, onReset: () => void) {
  const [st, setSt] = useState<any>(() => fresh(index));
  const ref = useRef<any>(st);
  const put = (p: any) => { ref.current = { ...ref.current, ...p }; setSt(ref.current); };
  useEffect(() => {
    if (ref.current.idx !== index && (stage === "ask" || stage === "teach")) { onReset(); ref.current = fresh(index); setSt(ref.current); }
  }, [stage, index]);
  return { view: st.idx === index ? st : fresh(index), ref, put };
}

/* ── phase 1: rows built by adding ───────────────────────────────────────────────────────── */

/* the step card: the row above, the table's number under it, and the new row (or a gap) */
function TbSumCard({ C, row, top, add, res, tr = (v: any) => v }: any) {
  const X = 480, xr = 880;
  return (
    <g>
      <rect x={X} y={16} width={590} height={372} rx={RAD.card} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      <text x={X + 32} y={70} fontSize={T.label} fontWeight={700} fill={C.ink}>{tr("row") + " "}<tspan fill={TB_INK.a}>{row}</tspan></text>
      <text x={xr} y={164} textAnchor="end" fontSize={T.display} fontWeight={700} fill={TB_INK.g}>{String(top)}</text>
      <text x={660} y={254} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>+</text>
      <text x={xr} y={254} textAnchor="end" fontSize={T.display} fontWeight={700} fill={TB_INK.b}>{String(add)}</text>
      <line x1={630} y1={280} x2={xr + 18} y2={280} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      {res !== null && res !== undefined
        ? <text key={"res" + row} className="tb-pop" x={xr} y={362} textAnchor="end" fontSize={T.display} fontWeight={700} fill={TB_INK.g}>{String(res)}</text>
        : (
          <g>
            <rect x={xr - 150} y={298} width={168} height={76} rx={16} fill="none" stroke={C.accent} strokeWidth={3} strokeDasharray="10 8" />
            <text x={xr - 66} y={350} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>?</text>
          </g>
        )}
    </g>
  );
}

/* the row card: the number looked for, then the count on from the last given row, then its row */
function TbRowCard({ C, item, chain, solved, tr = (v: any) => v }: any) {
  const X = 480, cx = X + 295;
  const lines = Array.from({ length: chain }, (_, i) => { const r = item.given + i; return [item.n * r, item.n, item.n * (r + 1)]; });
  return (
    <g data-role="reading">
      <rect x={X} y={16} width={590} height={372} rx={RAD.card} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      {chain === 0 && <text x={cx} y={176} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={TB_INK.g}>{String(item.target)}</text>}
      {lines.map((l, i) => (
        <g key={i} className="tb-pop">
          <TbEq x={cx} y={104 + i * 72} anchor="middle" size={T.speech} C={C} parts={[{ t: l[0], f: TB_INK.g }, { t: "+" }, { t: l[1], f: TB_INK.b }, { t: "=" }, { t: l[2], f: TB_INK.g }]} />
        </g>
      ))}
      <text x={cx} y={318} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{tr("row") + " "}<tspan fill={TB_INK.a}>{solved ? String(item.answer) : "?"}</tspan></text>
    </g>
  );
}

function TbRows({ item, index, stage, wrong, api, lang = "en", tx: tr = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const isRow = item.kind === "row";
  const n = item.n, upto = isRow ? item.answer : item.upto, given = isRow ? item.given : 1;
  const agentCol = useRef<any>(null);
  const fresh = (idx: number) => {
    const rows: any[] = Array(TB.rows).fill(null);
    for (let r = 0; r < given; r++) rows[r] = n * (r + 1);
    return { idx, rows, own: given, pencil: [] as number[], ghosts: [] as any[], hot: -1, card: -1, chain: 0, solved: false, ghostRow: -1, touched: false };
  };
  const { view, ref, put } = useTbState(fresh, index, stage, () => { tl.stop(); agentCol.current = null; api.lock(false); });

  /* a typed row lands only if it is the row above plus the table's own number; the last row sends the column */
  const building = !isRow && stage === "ask" && !tl.busy;
  const enter = (v: any) => {
    const val = leadNumber(v);
    if (val === null || String(v ?? "") === "") return;
    const s = ref.current, r = s.own;
    if (r >= upto) { api.submit(s.rows.slice(0, upto).join(", ")); return; }
    if (val !== s.rows[r - 1] + n) { api.submit(String(val)); return; }
    const rows = s.rows.slice(); rows[r] = val;
    put({ rows, own: r + 1, pencil: s.pencil.filter((k: number) => k !== r), ghosts: s.ghosts.filter((g: any) => g.r !== r), hot: r, card: -1, touched: true });
    api.sfx.tick();
    if (r + 1 >= upto) api.submit(rows.slice(0, upto).join(", "));
    else api.setTyped("");
  };
  api.onEnter(building ? enter : null);
  HOOK.column = (xs: number[]) => {
    agentCol.current = xs;
    const rows: any[] = Array(TB.rows).fill(null);
    xs.slice(0, TB.rows).forEach((x, i) => (rows[i] = x));
    put({ rows, own: Math.min(xs.length, TB.rows), pencil: [], ghosts: [], touched: true });
  };
  HOOK.check = () => {
    if (isRow || stage !== "ask" || !agentCol.current) return undefined;
    const col = agentCol.current; agentCol.current = null;
    api.submit(col.join(", "));
    return true;
  };

  /* the count on from the last given row, one arrow at a time, to the row that holds the number */
  const countOn = (S: any[], ms: number) => {
    for (let r = item.given; r < item.answer; r++) {
      const k = r;
      S.push([ms, () => put({ hot: k })]);
      S.push([ms, () => { const c = ref.current, rw = c.rows.slice(); rw[k] = n * (k + 1); put({ rows: rw, chain: k - item.given + 1 }); api.sfx.tick(); }]);
    }
    S.push([ms * 0.6, () => put({ hot: -1, solved: true })]);
  };

  /* the traceback: the missed row is emptied and built again off the row above, down to the last row
     asked (the whole right column); the child's own row stays faintly beside it; nothing is marked */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const s = ref.current, S: any[] = [];
    if (!isRow) {
      let from = 1;
      while (from < upto && s.rows[from] === n * (from + 1)) from++;
      const xs = tbNums(wrong.value);
      const ghosts = xs.length >= 2
        ? xs.map((v, r) => ({ r, v })).filter((g) => g.r > 0 && g.r < upto && g.v !== n * (g.r + 1))
        : xs.length === 1 ? [{ r: Math.min(from, upto - 1), v: xs[0] }] : [];
      const rows = s.rows.slice();
      for (let r = from; r < TB.rows; r++) rows[r] = null;
      S.push([500, () => put({ rows, own: from, pencil: [], ghosts, hot: -1, card: -1, touched: true })]);
      for (let r = from; r < upto; r++) {
        const k = r;
        S.push([700, () => put({ hot: k, card: k })]);
        S.push([760, () => { const c = ref.current, rw = c.rows.slice(); rw[k] = rw[k - 1] + n; put({ rows: rw, pencil: [...c.pencil, k] }); api.sfx.tick(); }]);
      }
      /* the card stays on the last step, done, until the child writes the next row in */
      S.push([500, () => put({ hot: -1, card: upto - 1 })]);
    } else {
      const v = leadNumber(wrong.value);
      const gr = v !== null && v >= 1 && v <= TB.rows && v !== item.answer ? v - 1 : -1;
      const rows = s.rows.slice();
      for (let r = item.given; r < TB.rows; r++) rows[r] = null;
      S.push([450, () => put({ rows, ghostRow: gr, chain: 0, solved: false, touched: true })]);
      countOn(S, 760);
    }
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  /* the win: every row lights down the table, each out of the one above */
  useEffect(() => {
    if (stage !== "win") return;
    const S: any[] = [];
    if (!isRow) {
      const rows = ref.current.rows.slice();
      for (let r = 0; r < upto; r++) rows[r] = n * (r + 1);
      S.push([60, () => put({ rows, own: upto, pencil: [], ghosts: [] })]);
      for (let r = 1; r < upto; r++) { const k = r; S.push([300, () => put({ hot: k, card: k })]); }
      S.push([300, () => put({ hot: -1 })]);
    } else if (!ref.current.solved) countOn(S, 380);
    tl.run(S);
  }, [stage]);

  const rows = view.rows;
  const filled = rows.filter((v: any) => v !== null).length;
  const open = stage === "ask" || stage === "teach";
  const pending = !open ? -1 : isRow ? (rows[given] === null ? given : -1) : view.own < upto ? view.own : -1;
  const cells = rows.map((v: any, r: number) => (v !== null ? { v, box: view.pencil.includes(r) ? C.accent : undefined }
    : r === pending ? { box: tint(C.accent, 0.35) } : null));
  const rings: any[] = [];
  if (view.ghostRow >= 0) rings.push({ r: view.ghostRow, color: TB_GREY, dashed: true });
  if (view.solved) rings.push({ r: item.answer - 1, color: C.accent });
  const arrows: any[] = [];
  for (let r = 1; r < TB.rows; r++) {
    if (rows[r - 1] === null) continue;
    const has = rows[r] !== null, hot = view.hot === r;
    if (has || hot || r === pending) arrows.push(<TbArrow key={"a" + r} x={300} r={r} n={n} hot={hot} dashed={!has} />);
  }
  const R = view.card >= 0 ? view.card : Math.min(view.own, upto - 1);
  const res = view.card >= 0 || view.own >= upto ? rows[R] : null;

  api.share({ tableOf: n, rows: rows.filter((v: any) => v !== null), runningCount: filled });

  return (
    <g>
      <style>{TB_CSS}</style>
      <TbRuns C={C} count={filled} of={TB.rows} label="rows" tr={tr} />
      <TbTable C={C} x={0} cw={64} pw={236} n={n} cells={cells} rings={rings} lang={lang} />
      {arrows}
      {view.ghosts.map((g: any) => (
        <g key={"gh" + g.r}>
          <rect x={398} y={tbTop(g.r) + 5} width={70} height={TB.rh - 10} rx={9} fill="#FFFFFF" stroke={TB_GREY} strokeWidth={2} strokeDasharray="6 5" />
          <text x={433} y={tbBase(g.r) - 1} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={TB_GREY}>{String(g.v)}</text>
        </g>
      ))}
      {isRow
        ? <TbRowCard C={C} item={item} chain={view.chain} solved={view.solved} tr={tr} />
        : <TbSumCard C={C} row={R + 1} top={rows[R - 1]} add={n} res={res} tr={tr} />}
      {!isRow && stage === "ask" && !view.touched && !tl.busy && view.own < upto && <Invite x={182} y={tbMid(view.own)} r={34} C={C} />}
    </g>
  );
}

/* ── phase 2: the compare rail ───────────────────────────────────────────────────────────── */

/* the lit pair, read out: the left product, and the right one as copies of it laid end to end */
function TbPairCard({ C, small, big, r, known, copies, why }: any) {
  const L = small * (r + 1), D = big * (r + 1), bw = 64 + L * 1.7, X = 646;
  const bar = (x: number, y: number, k: string) => (
    <g key={k} className="tb-pop">
      <rect x={x} y={y} width={bw} height={44} rx={10} fill={tint(TB_GREEN, 0.72)} stroke={TB_GREEN} strokeWidth={2.5} />
      <text x={x + bw / 2} y={y + 33} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(L)}</text>
    </g>
  );
  return (
    <g data-role="reading">
      <rect x={616} y={0} width={470} height={430} rx={RAD.card} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      <TbEq x={X} y={76} size={T.speech} C={C} parts={[{ t: small, f: TB_INK.b }, { t: "×" }, { t: r + 1, f: TB_INK.a }, { t: "=" }, { t: L, f: TB_INK.g }]} />
      {bar(X, 98, "top")}
      <TbEq x={X} y={218} size={T.speech} C={C} parts={[{ t: big, f: TB_INK.b }, { t: "×" }, { t: r + 1, f: TB_INK.a }, { t: "=" }, known ? { t: D, f: TB_INK.g } : { t: "?" }]} />
      {Array.from({ length: copies }).map((_, i) => bar(X + i * bw, 240, "cp" + i))}
      {why && (
        <g className="tb-pop">
          <TbEq x={X} y={370} size={T.speech} C={C} parts={[{ t: big, f: TB_INK.b }, { t: "=" }, { t: small, f: TB_INK.b }, { t: "+" }, { t: small, f: TB_INK.b }]} />
        </g>
      )}
    </g>
  );
}

function TbRail({ item, index, stage, wrong, api, lang = "en", tx: tr = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const small = item.small, big = item.big, row = item.row - 1;
  const fresh = (idx: number) => {
    const filled: any[] = Array(TB.rows).fill(null);
    tbTimes(big, 3).forEach((v, i) => (filled[i] = v));
    return { idx, filled, lit: null as any, copies: 0, amber: -1, why: false, touched: false };
  };
  const { view, ref, put } = useTbState(fresh, index, stage, () => { tl.stop(); api.lock(false); });

  /* the handle: drawn down the channel it lights the pair level with it; a tap (or Enter) lights the next pair */
  const canSlide = stage === "ask" && !tl.busy;
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!canSlide || !pay || pay.src !== "knob") return;
    const s = ref.current;
    const lit = moved && isFinite(p.y) ? tbRowAt(p.y) : s.lit === null ? 0 : (s.lit + 1) % TB.rows;
    put({ lit, touched: true });
    api.sfx.tick();
  });
  api.onEnter(null);
  HOOK.column = null;
  HOOK.check = () => undefined;

  /* the traceback: the asked pair lights, the left product lands a second time beside itself, and the
     doubled product is written into the table; the row the child's number really belongs to goes amber */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const v = leadNumber(wrong.value);
    const k = v !== null && v % small === 0 && v / small >= 1 && v / small <= TB.rows && v / small - 1 !== row ? v / small - 1 : -1;
    const S: any[] = [
      [500, () => put({ lit: row, copies: 0, amber: -1, why: false, touched: true })],
      [760, () => { put({ copies: 1 }); api.sfx.tick(); }],
      [760, () => { put({ copies: 2 }); api.sfx.tick(); }],
      [640, () => { const f = ref.current.filled.slice(); f[row] = big * (row + 1); put({ filled: f, why: true }); }],
    ];
    if (k >= 0) S.push([520, () => put({ amber: k })]);
    S.push([300, () => {}]);
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  /* the win: the product lands and the pairs light down the rail, each a number and its double */
  useEffect(() => {
    if (stage !== "win") return;
    const f = ref.current.filled.slice(); f[row] = big * (row + 1);
    const S: any[] = [[60, () => put({ filled: f, copies: 2 })]];
    [0, 1, 2, row].forEach((r) => S.push([380, () => put({ lit: r })]));
    S.push([200, () => put({ why: true })]);
    tl.run(S);
  }, [stage]);

  const dragging = !!(drag.drag && drag.drag.payload && drag.drag.payload.src === "knob" && drag.drag.moved);
  const litNow = dragging ? tbRowAt(drag.drag.y) : view.lit;
  const ky = dragging ? Math.max(tbMid(0), Math.min(tbMid(TB.rows - 1), drag.drag.y)) : view.lit === null ? 50 : tbMid(view.lit);
  const leftCells = tbTimes(small).map((v) => ({ v, cls: "tb-none" }));
  const rightCells = view.filled.map((v: any, r: number) => (v !== null
    ? { v, cls: r < 3 ? "tb-thread" : "tb-pop", delay: r < 3 ? 150 + r * 160 : 0 }
    : r === row ? { v: "?", ink: C.ink, box: C.accent, cls: "tb-none" } : null));
  const known = litNow !== null && view.filled[litNow] !== null;
  const copies = litNow === null ? 0 : known ? 2 : litNow === row ? view.copies : 0;
  const lf = view.filled.filter((v: any) => v !== null).length;

  api.share({ tableOf: big, compareWith: small, litPair: litNow === null ? null : litNow + 1, rows: view.filled.filter((v: any) => v !== null), runningCount: lf });

  return (
    <g>
      <style>{TB_CSS}</style>
      <TbRuns C={C} count={lf} of={TB.rows} label={"rows of " + big} tr={tr} />
      <TbTable C={C} x={0} cw={64} pw={200} n={small} cells={leftCells} lit={litNow === null ? -1 : litNow} lang={lang}
        rings={view.amber >= 0 ? [{ r: view.amber, color: TB_AMBER, fill: tint(TB_AMBER, 0.85) }] : []} />
      <g key={"rt" + index}>
        <TbTable C={C} x={384} pw={200} noCount n={big} cells={rightCells} lit={litNow === null ? -1 : litNow} lang={lang} />
      </g>
      {litNow !== null && (
        <g>
          <line x1={268} y1={tbMid(litNow)} x2={374} y2={tbMid(litNow)} stroke={TB_GREEN} strokeWidth={4} strokeLinecap="round" />
          <path d={`M 376 ${tbMid(litNow)} l -13 -8 M 376 ${tbMid(litNow)} l -13 8`} fill="none" stroke={TB_GREEN} strokeWidth={4} strokeLinecap="round" />
        </g>
      )}
      <g className={canSlide ? "tb-grab c4-piece" : ""}
        {...(canSlide ? { ...control("knob", "Slide to light a pair of rows"), ...drag.bind({ src: "knob" }), ...drag.keys({ src: "knob" }) } : {})}>
        <rect x={288} y={ky - 36} width={72} height={72} fill="transparent" />
        <circle cx={324} cy={ky} r={28} fill="url(#gKey)" stroke={C.accent} strokeWidth={4} filter={dragging ? "url(#fLift)" : "url(#fShadowSoft)"} />
        <path d={`M 312 ${ky - 8} H 336 M 312 ${ky} H 336 M 312 ${ky + 8} H 336`} stroke={C.accent} strokeWidth={3} strokeLinecap="round" />
      </g>
      {litNow !== null && <TbPairCard C={C} small={small} big={big} r={litNow} known={known} copies={copies} why={view.why} />}
      {stage === "ask" && !view.touched && !tl.busy && <Invite x={324} y={ky} r={42} C={C} />}
    </g>
  );
}

/* ── phase 3: the even check ─────────────────────────────────────────────────────────────── */

function TbSort({ item, index, stage, wrong, api, lang = "en", tx: tr = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const bump = useTimeline();
  const n = item.n, claim = item.kind === "claim";
  const realOf = (r: number) => n * (r + 1);
  const fresh = (idx: number) => {
    const q: any[] = [];
    for (let r = 0; r < TB.rows; r++) {
      if (item.hide === r) continue;
      q.push(claim && item.row === r ? { id: r, v: item.claim, claim: true } : { id: r, v: realOf(r) });
    }
    return { idx, queue: q, odd: [] as any[], even: [] as any[], back: null as any, shown: false, fixed: false, caption: null as any, cover: false, touched: false };
  };
  const { view, ref, put } = useTbState(fresh, index, stage, () => { tl.stop(); bump.stop(); api.lock(false); });

  /* a product goes in only by its last digit; in the other tray it is pushed straight back out */
  const canSort = stage === "ask" && !tl.busy;
  const sortTo = (side: string, at?: any) => {
    const s = ref.current, e = s.queue[0];
    if (!canSort || !e) return;
    if ((e.v % 2 === 0) === (side === "even")) {
      put({ queue: s.queue.slice(1), [side]: [...s[side], e], back: null, touched: true });
      api.sfx.tick();
    } else {
      const t = TB_TRAY[side];
      const from = at && isFinite(at.x) ? { x: at.x - 100, y: at.y - 50 } : { x: t.x + t.w / 2 - 100, y: t.y + 90 };
      put({ touched: true });
      bump.run([[40, () => put({ back: from })], [40, () => put({ back: null })]]);
    }
  };
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!pay || pay.src !== "chip" || !moved) return;
    const side = tbTrayAt(p);
    if (side) sortTo(side, p);
  });
  api.onEnter(null);
  HOOK.column = null;
  HOOK.check = () => undefined;

  const into = (e: any) => () => {
    const s = ref.current, side = e.v % 2 === 0 ? "even" : "odd";
    put({ queue: s.queue.filter((x: any) => x.id !== e.id), [side]: [...s[side], e] });
    api.sfx.tick();
  };
  /* the reasoning, then the right choice itself in words (a correction ends on the whole answer) */
  const captionOf = () => (claim ? [n + " × " + (item.row + 1) + " = " + realOf(item.row) + ", even", "why not: " + item.answer]
    : [item.q === "canOdd" ? realOf(item.hide) + " is even" : "odd, even, odd, even", "so: " + item.answer]);
  /* the product the question is about, worked in the open and sorted too */
  const finish = (ms: number) => {
    const S: any[] = [];
    if (item.hide !== undefined) {
      S.push([ms * 2, () => put({ shown: true })]);
      S.push([ms * 2, () => { const s = ref.current; put({ even: [...s.even, { id: "h", v: realOf(item.hide) }] }); api.sfx.tick(); }]);
    }
    if (claim) {
      S.push([ms * 2, () => put({ fixed: true })]);
      S.push([ms * 2, () => { const s = ref.current; put({ even: [...s.even, { id: "f", v: realOf(item.row) }] }); api.sfx.tick(); }]);
    }
    S.push([ms * 2, () => put({ caption: captionOf() })]);
    return S;
  };

  /* the traceback: the row counts are covered, every product is offered to the trays one at a time,
     and the product the question is about is worked out in the open */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const S: any[] = [[400, () => put({ cover: true, caption: null, back: null, touched: true })]];
    ref.current.queue.forEach((e: any) => { S.push([420, () => {}]); S.push([380, into(e)]); });
    S.push(...finish(340));
    S.push([400, () => put({ cover: false })]);
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  /* the win: whatever is left sorts itself, then the product the question is about joins its tray */
  useEffect(() => {
    if (stage !== "win") return;
    const S: any[] = [];
    ref.current.queue.forEach((e: any) => S.push([200, into(e)]));
    S.push(...finish(200));
    tl.run(S);
  }, [stage]);

  const offer = view.queue[0] || null;
  const dragging = !!(drag.drag && drag.drag.payload && drag.drag.payload.src === "chip" && drag.drag.moved);
  const over = dragging ? tbTrayAt(drag.drag) : null;
  const home = { x: 603, y: 28 };
  const pos = dragging ? { x: drag.drag.x - 100, y: drag.drag.y - 50 } : view.back || home;
  const cells = Array.from({ length: TB.rows }).map((_, r) => {
    if (item.hide === r) return view.shown ? { v: realOf(r), box: C.accent } : { v: "?", ink: C.ink, box: C.rule, cls: "tb-none" };
    if (claim && item.row === r) return view.fixed ? { v: realOf(r), box: C.accent } : { v: item.claim, ink: C.ink, box: C.ink, cls: "tb-none" };
    return { v: realOf(r), cls: "tb-none" };
  });
  /* the table's own products standing in a tray, out of its ten rows (a claimed number is not one of them) */
  const sorted = [...view.odd, ...view.even].filter((e: any) => !e.claim).length;

  api.share({ tableOf: n, evenCheck: true, sorted: { odd: view.odd.map((e: any) => e.v), even: view.even.map((e: any) => e.v) }, runningCount: sorted });

  return (
    <g>
      <style>{TB_CSS}</style>
      <TbRuns C={C} count={sorted} of={TB.rows} label="sorted" tr={tr} />
      <TbTable C={C} x={0} cw={64} pw={236} n={n} cells={cells} right lastRing cover={view.cover} lit={offer ? offer.id : -1} lang={lang} />
      {["odd", "even"].map((side) => {
        const t = TB_TRAY[side], list = view[side], hot = over === side;
        return (
          <g key={side}>
            <rect x={t.x} y={t.y} width={t.w} height={t.h} rx={22} fill={hot ? tint(C.accent, 0.86) : tint(C.panel, 0.55)} stroke={hot ? C.accent : C.rule} strokeWidth={hot ? 4 : 2} />
            <text x={t.x + t.w / 2} y={t.y + 42} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tr(side)}</text>
            {list.map((e: any, j: number) => {
              const cx = t.x + 14 + (j % 3) * 114, cy = t.y + 62 + Math.floor(j / 3) * 58;
              return (
                <g key={"s" + e.id} className="tb-pop">
                  <rect x={cx} y={cy} width={104} height={50} rx={12} fill="#FFFFFF" stroke={e.claim ? C.ink : C.rule} strokeWidth={2} strokeDasharray={e.claim ? "6 5" : undefined} />
                  <text x={cx + 52} y={cy + 36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={e.claim ? C.ink : TB_INK.g}>{String(e.v)}</text>
                </g>
              );
            })}
            {canSort && offer && <Hit id={"tray-" + side} x={t.x} y={t.y} w={t.w} h={t.h} label={"Put it in the " + side + " tray"} onPress={() => sortTo(side)} />}
          </g>
        );
      })}
      {offer && (
        <g key={"chip" + index + "-" + offer.id} className={"tb-grab c4-piece" + (dragging || view.back ? "" : " tb-slide")}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` } as any}
          {...(canSort ? { ...control("chip", "Product " + offer.v), ...drag.bind({ src: "chip" }), ...drag.keys({ src: "chip" }) } : {})}>
          <rect x={0} y={0} width={200} height={100} rx={20} fill="#FFFFFF" stroke={offer.claim ? C.ink : C.rule} strokeWidth={2.5}
            strokeDasharray={offer.claim ? "9 7" : undefined} filter={dragging ? "url(#fLift)" : "url(#fShadowSoft)"} />
          <circle cx={156} cy={50} r={32} fill="none" stroke={C.accent} strokeWidth={3} />
          <text x={178} y={76} textAnchor="end" fontSize={T.display} fontWeight={700} fill={offer.claim ? C.ink : TB_INK.g}>{String(offer.v)}</text>
        </g>
      )}
      {!offer && view.caption && (
        <g className="tb-pop" data-role="reading">
          <text x={703} y={74} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{tr(view.caption[0])}</text>
          <text x={703} y={140} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{tr(view.caption[1])}</text>
        </g>
      )}
      {offer && stage === "ask" && !view.touched && !tl.busy && <Invite x={home.x + 156} y={home.y + 50} r={44} C={C} />}
    </g>
  );
}

/* ── phase 4: the steps counter ──────────────────────────────────────────────────────────── */

const TB_RX = 694;                                   /* right edge of the column working */
const tbCol = (k: number) => TB_RX - 36 - k * 72;    /* centre of column k (0 = ones), 72 across */

function TbSteps({ item, index, stage, wrong, api, lang = "en", tx: tr = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const a = item.a, b = item.b, ds = tbDigits(a), len = ds.length;
  const ones = b % 10, tens = (b - ones) / 10;
  const fresh = (idx: number) => ({ idx, facts: [] as number[], lit: -1, written: [] as any[], carries: [] as any[], split: 0, splitLit: false, touched: false });
  const { view, ref, put } = useTbState(fresh, index, stage, () => { tl.stop(); api.lock(false); });

  /* a tap on a digit of the number on top: the table hands over its fact, and that is one step */
  const canTap = stage === "ask" && !tl.busy;
  const tap = (k: number) => {
    if (!canTap) return;
    const s = ref.current, d = ds[k];
    put({ lit: d > 0 ? d - 1 : -1, facts: s.facts.includes(k) ? s.facts : [...s.facts, k], touched: true });
    api.sfx.tick();
  };
  api.onEnter(null);
  HOOK.column = null;
  HOOK.check = () => undefined;

  /* both routes worked: one table fact a column with its carry ringed above the next column, then the
     ones row and the tens row in rose, added; both land on the same product */
  const workSteps = (slow: number) => {
    /* the child's own facts keep their order; a column not yet taken adds its fact at the end */
    const S: any[] = [[80 * slow, () => put({ written: [], carries: [], split: 0, lit: -1 })]];
    let carry = 0;
    const w: any[] = [], c: any[] = [];
    ds.forEach((d, k) => {
      const v = d * b + carry;
      S.push([420 * slow, () => { const f = ref.current.facts; put({ lit: d > 0 ? d - 1 : -1, facts: f.includes(k) ? f : [...f, k] }); }]);
      if (k === len - 1) String(v).split("").reverse().forEach((x, j) => (w[k + j] = Number(x)));
      else { w[k] = v % 10; carry = Math.floor(v / 10); if (carry) c[k + 1] = carry; }
      const ws = w.slice(), cs = c.slice();
      S.push([520 * slow, () => { put({ written: ws, carries: cs }); api.sfx.tick(); }]);
    });
    S.push([300 * slow, () => put({ lit: -1, splitLit: true })]);
    [1, 2, 3].forEach((k) => S.push([540 * slow, () => { put({ split: k }); api.sfx.tick(); }]));
    return S;
  };

  /* the traceback: the multiplier is drawn out as its places (a ten and the ones), then both routes */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tl.run([[700, () => put({ splitLit: true, touched: true })], ...workSteps(1.3)], () => api.lock(false));
  }, [wrong]);

  useEffect(() => {
    if (stage !== "win") return;
    tl.run(workSteps(0.55));
  }, [stage]);

  const written = view.written, anyWritten = written.some((x: any) => x !== undefined && x !== null);
  const SX = 996;
  const oneRow = a * ones, tenRow = a * tens * 10;
  const tenStr = indian(tenRow);
  const dots = [len, len, 1];
  const worked = view.split;

  api.share({ tableOf: b, steps: view.facts.length, facts: view.facts.map((k: number) => ds[k] * b), runningCount: view.facts.length });

  return (
    <g>
      <style>{TB_CSS}</style>
      <TbRuns C={C} count={view.facts.length} label="steps" tr={tr} />
      <TbTable C={C} x={0} cw={56} pw={180} n={b} cells={tbTimes(b).map((v) => ({ v, cls: "tb-none" }))} lit={view.lit} litColor={TB_AMBER}
        countInk={TB_INK.b} headInk={TB_INK.a} lang={lang} />

      {/* the table route: the number on top, one fact for each of its digits */}
      {Array.from({ length: 6 }).map((_, k) => (view.carries[k] ? (
        <g key={"c" + k} className="tb-pop">
          <circle cx={tbCol(k)} cy={40} r={view.carries[k] >= 10 ? 23 : 19} fill="#FFFFFF" stroke={TB_VERM} strokeWidth={3} />
          <text x={tbCol(k)} y={50} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TB_INK.v}>{String(view.carries[k])}</text>
        </g>
      ) : null))}
      {ds.map((d, k) => (
        <g key={"m" + k}>
          {view.facts.includes(k) && <rect x={tbCol(k) - 30} y={74} width={60} height={66} rx={12} fill={tint(TB_AMBER, 0.85)} />}
          <text x={tbCol(k)} y={126} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={d === 0 ? TB_GREY : TB_INK.b}>{String(d)}</text>
          {canTap && <Hit id={"digit-" + k} x={tbCol(k) - 36} y={68} w={72} h={78} label={"The fact for the " + TB_PLACE[k] + " digit, " + d} onPress={() => tap(k)} />}
        </g>
      ))}
      {a >= 1000 && <text x={tbCol(2) - 36} y={126} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>,</text>}
      <text y={196} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>
        <tspan x={tbCol(len)}>×</tspan>
        {String(b).split("").map((ch, i) => <tspan key={i} x={tbCol(String(b).length - 1 - i)} fill={TB_INK.a}>{ch}</tspan>)}
      </text>
      <line x1={330} y1={214} x2={TB_RX} y2={214} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      {anyWritten
        ? Array.from({ length: 6 }).map((_, k) => (written[k] !== undefined && written[k] !== null ? (
          <text key={"w" + k} className="tb-pop" x={tbCol(k)} y={284} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={written[k] === 0 ? TB_GREY : TB_INK.g}>{String(written[k])}</text>
        ) : null))
        : <rect x={334} y={228} width={TB_RX - 334} height={72} rx={14} fill="none" stroke={tint(C.accent, 0.3)} strokeWidth={3} strokeDasharray="10 9" />}
      {item.answer >= 1000 && written[3] !== undefined && written[3] !== null && <text x={tbCol(2) - 36} y={284} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>,</text>}
      <g data-role="reading">
        {view.facts.map((k: number, i: number) => {
          const d = ds[k], y = 348 + i * 46, grey = d === 0;
          return (
            <g key={"f" + k} className="tb-pop">
              {/* a plain grey step tag: square, beside its line (only a carry is ringed, above its column) */}
              <rect x={275} y={y - 30} width={34} height={38} rx={6} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              <text x={292} y={y - 1} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={TB_GREY}>{String(i + 1)}</text>
              <TbEq x={324} y={y} size={T.label} C={C} parts={grey
                ? [{ t: d, f: TB_GREY }, { t: "×" }, { t: b, f: TB_GREY }, { t: "=" }, { t: 0, f: TB_GREY }]
                : [{ t: d, f: TB_INK.b }, { t: "×" }, { t: b, f: TB_INK.a }, { t: "=" }, { t: d * b, f: TB_INK.g }]} />
            </g>
          );
        })}
      </g>

      {/* the split route: the multiplier as a ten and the ones, a rose row for each, then added */}
      <g data-role="reading">
        {view.splitLit && <rect x={748} y={10} width={250} height={48} rx={12} fill={tint(TB_AMBER, 0.85)} />}
        <TbEq x={760} y={46} size={T.label} C={C} parts={[{ t: b, f: TB_INK.a }, { t: "=" }, { t: tens * 10, f: TB_INK.a }, { t: "+" }, { t: ones, f: TB_INK.a }]} />
      </g>
      <text x={SX} y={104} textAnchor="end" fontSize={T.label} fontWeight={700} fill={TB_INK.b}>{indian(a)}</text>
      <text x={SX} y={148} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>×<tspan dx={8} fill={TB_INK.a}>{String(b)}</tspan></text>
      <line x1={850} y1={164} x2={SX + 6} y2={164} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      {worked >= 1
        ? <text className="tb-pop" x={SX} y={210} textAnchor="end" fontSize={T.label} fontWeight={700} fill={TB_INK.r}>{indian(oneRow)}</text>
        : <rect x={SX - 124} y={178} width={128} height={42} rx={10} fill="none" stroke={tint(TB_ROSE, 0.2)} strokeWidth={2.5} strokeDasharray="7 6" />}
      <text x={1010} y={209} fontSize={T.micro} fontWeight={700} fill={TB_INK.a}>× {ones}</text>
      {worked >= 2
        ? <text className="tb-pop" x={SX} y={256} textAnchor="end" fontSize={T.label} fontWeight={700} fill={TB_INK.r}>{tenStr.slice(0, -1)}<tspan fill={TB_GREY}>0</tspan></text>
        : <rect x={SX - 124} y={224} width={128} height={42} rx={10} fill="none" stroke={tint(TB_ROSE, 0.2)} strokeWidth={2.5} strokeDasharray="7 6" />}
      <text x={1010} y={255} fontSize={T.micro} fontWeight={700} fill={TB_INK.a}>× {tens * 10}</text>
      <line x1={850} y1={272} x2={SX + 6} y2={272} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      {worked >= 3
        ? <text className="tb-pop" x={SX} y={318} textAnchor="end" fontSize={T.label} fontWeight={700} fill={TB_INK.g}>{indian(item.answer)}</text>
        : <rect x={SX - 124} y={286} width={128} height={42} rx={10} fill="none" stroke={tint(TB_GREEN, 0.2)} strokeWidth={2.5} strokeDasharray="7 6" />}
      <text x={1010} y={317} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tr("add")}</text>
      {dots.map((cnt, gi) => Array.from({ length: cnt }).map((_, j) => {
        const x0 = 770 + dots.slice(0, gi).reduce((s, c) => s + c * 22 + 16, 0) + j * 22;
        return worked > gi ? <circle key={"d" + gi + "-" + j} className="tb-pop" cx={x0} cy={374} r={9} fill={C.accent} /> : null;
      }))}
      {worked >= 3 && <text className="tb-pop" x={760} y={436} fontSize={T.label} fontWeight={700} fill={C.ink}>{tr((2 * len + 1) + " steps")}</text>}

      {stage === "ask" && !view.touched && !tl.busy && <Invite x={tbCol(0)} y={106} r={42} C={C} />}
    </g>
  );
}

/* ── free play: any table past ten, the compare rail and the even check ──────────────────── */

function TbFree({ api, lang = "en", tx: tr = (v: any) => v }: any) {
  const C = api.C;
  /* opens as the free-play line says: the compare rail and the even check open */
  const [fs, setFs] = useState<any>({ n: 12, k: 1, compare: true, even: true, hot: -1 });
  const pick = (m: number) => { setFs({ ...fs, n: m, k: 1, hot: -1 }); api.sfx.tick(); };
  const add = () => { if (fs.k >= TB.rows) return; setFs({ ...fs, k: fs.k + 1, hot: fs.k }); api.sfx.tick(); };
  api.onEnter(null);
  HOOK.column = null;
  HOOK.check = () => undefined;
  api.share({ tableOf: fs.n, rows: tbTimes(fs.n, fs.k), compareWith: fs.compare ? 2 * fs.n : null, evenCheck: fs.even, runningCount: fs.k });

  const cells = Array.from({ length: TB.rows }).map((_, r) => (r < fs.k ? { v: fs.n * (r + 1) } : null));
  const twin = Array.from({ length: TB.rows }).map((_, r) => (r < fs.k ? { v: 2 * fs.n * (r + 1) } : null));
  const tagX = fs.compare ? 640 : 420;
  const label = (on: boolean, s: string) => <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={on ? "#FFFFFF" : C.ink}>{s}</text>;
  return (
    <g>
      <style>{TB_CSS}</style>
      <TbRuns C={C} count={fs.k} of={TB.rows} label="rows" tr={tr} />
      <TbTable C={C} x={0} cw={64} pw={236} n={fs.n} cells={cells} right={fs.even} lastRing={fs.even} lang={lang} />
      {Array.from({ length: fs.k - 1 }).map((_, i) => <TbArrow key={"a" + i} x={300} r={i + 1} n={fs.n} hot={fs.hot === i + 1} />)}
      {fs.compare && <TbTable C={C} x={420} pw={200} noCount n={2 * fs.n} cells={twin} right={fs.even} lastRing={fs.even} lang={lang} />}
      {fs.even && Array.from({ length: fs.k }).map((_, r) => (
        <text key={"t" + r} x={tagX} y={tbBase(r)} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tr(fs.n * (r + 1) % 2 === 0 ? "even" : "odd")}</text>
      ))}
      {[11, 12, 13, 14, 15, 16].map((m, i) => (
        <Key key={m} id={"pick-" + m} label={"Table of " + m} x={800 + (i % 3) * 99} y={Math.floor(i / 3) * 84} w={88} h={72} C={C} primary={fs.n === m} onClick={() => pick(m)}>
          {label(fs.n === m, String(m))}
        </Key>
      ))}
      <Key id="add-row" label={tr("Add a row")} x={800} y={172} w={286} h={84} C={C} primary disabled={fs.k >= TB.rows} onClick={add}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={fs.k >= TB.rows ? mix(C.ink, C.panel, 0.5) : "#FFFFFF"}>{tr("add a row")}</text>
      </Key>
      <Key id="compare" label={tr(fs.compare ? "Close the compare rail" : "Open the compare rail")} x={800} y={272} w={286} h={76} C={C} primary={fs.compare} onClick={() => setFs({ ...fs, compare: !fs.compare })}>
        {label(fs.compare, tr("compare"))}
      </Key>
      <Key id="even-check" label={tr(fs.even ? "Close the even check" : "Open the even check")} x={800} y={364} w={286} h={76} C={C} primary={fs.even} onClick={() => setFs({ ...fs, even: !fs.even })}>
        {label(fs.even, tr("even check"))}
      </Key>
    </g>
  );
}

/* ── the working area: 1086 x 528, one board a phase (free play after the summary) ────────── */
function Work(props: any) {
  HOOK.tx = props.tx;   /* the slot (format) and the summary's Thumb draw their words in the language in use */
  if (props.stage === "free") return <TbFree {...props} />;
  const n = props.phase.n;
  if (n === 1) return <TbRows {...props} />;
  if (n === 2) return <TbRail {...props} />;
  if (n === 3) return <TbSort {...props} />;
  return <TbSteps {...props} />;
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, C, w, h }: any) {
  const L = result && result.last;
  if (!L) return null;
  const P: any = PHASES[(n || 1) - 1] || PHASES[0];
  const it: any = (P.items || [])[L.item] || {};
  const lines =
    it.kind === "build" ? ["table of " + it.n, tbNums(it.answer).slice(1).join(", ")]
      : it.kind === "row" ? [it.target + " is in", "row " + it.answer]
        : it.kind === "double" ? [it.big + " × " + it.row + " = " + it.answer]
          : it.kind === "parity" ? [it.q === "canOdd" ? it.n * (it.hide + 1) + " is even" : "odd, even, odd", "so: " + it.answer]
            : it.kind === "claim" ? [it.n + " × " + (it.row + 1) + " = " + it.n * (it.row + 1), it.claim + " is odd"]
              : it.kind === "steps" ? [indian(it.a) + " × " + it.b, "= " + indian(it.answer)]
                : [String(L.value)];
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {lines.map((ln: string, i: number) => (
        <text key={i} x={w / 2} y={h / 2 + 10 + (i - (lines.length - 1) / 2) * 32} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{HOOK.tx ? HOOK.tx(ln) : ln}</text>
      ))}
    </g>
  );
}

function TableBuilder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* a picked choice (yes, no, "99 is odd") shows in the slot in the language in use; English is unchanged */
      format: (s: any) => (HOOK.tx ? HOOK.tx(String(s ?? "")) : String(s ?? "")) }} />
  );
}

export default TableBuilder;
