/* ═══ M2.S3.T5.C16.2D1 · missing_number_detective · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "missing_number_detective";
const MEDIA_ID = "M2.S3.T5.C16.2D1";
const TOOL_NAME = "Missing Number Detective";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["One of the three numbers is hiding. Say which one."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You named what was hiding before you went looking for it, every single time.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Cover a whole number or a single digit, and the build bay stays open.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English above and below stays what the checks read. NCERT class 4 terms: इकाई दहाई सैकड़ा हज़ार /
   એકમ દશક શતક હજાર, घटाना / બાદબાકી, अंतर / તફાવત, जाँच / ચકાસણી. Digits stay digits: the runtime
   speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Missing Number Detective": "गुम संख्या जासूस",
    "One of the three numbers is hiding. Say which one.": "तीन संख्याओं में से एक छिपी है। बताओ कौन सी।",
    "You named what was hiding before you went looking for it, every single time.": "तुमने हर बार, ढूँढने से पहले, छिपी संख्या का नाम बताया।",
    "Free play. Cover a whole number or a single digit, and the build bay stays open.": "मुक्त खेल। पूरी संख्या या एक अंक ढको, और हल की जगह खुली रहती है।",
    "A missing greater number is built by adding": "गुम बड़ी संख्या जोड़कर बनती है",
    "The top row is empty. Add the two you can see and see where they land.": "ऊपर की पंक्ति खाली है। जो दो दिख रही हैं, उन्हें जोड़ो और देखो क्या बनता है।",
    "Drag both rows into the bay, then type what they make.": "दोनों पंक्तियाँ हल की जगह में खींचो, फिर जो बनता है वह लिखो।",
    "Do the two you can see add up to it, or take away from it?": "जो दो दिख रही हैं, क्या वे जुड़कर इसे बनाती हैं, या इसमें से घटती हैं?",
    "Stack the two you can see in the bay. Add them, starting at the ones.": "जो दो दिख रही हैं, उन्हें एक के नीचे एक रखो। इकाई से शुरू करके जोड़ो।",
    "When the number on top is missing, the answer and the number taken away add back to it. The check is also the tool that finds it.": "जब ऊपर की संख्या गुम हो, तो उत्तर और घटाई गई संख्या जुड़कर उसे बनाते हैं। जाँच ही उसे ढूँढने का तरीका है।",
    "You learned: a missing top number is built by adding the other two.": "तुमने सीखा: गुम ऊपर की संख्या बाकी दो को जोड़कर बनती है।",
    "A subtraction takes 4,238 away and leaves 3,571. What was the number on top?": "एक घटाने में 4,238 घटाया गया और 3,571 बचा। ऊपर की संख्या क्या थी?",
    "Number on top?": "ऊपर की संख्या?",
    "Which of the three rows on your mat is empty?": "तुम्हारी चटाई की तीन पंक्तियों में से कौन सी खाली है?",
    "Find the missing number on top. Blank − 2,415 = 6,380.": "ऊपर की गुम संख्या ढूँढो। खाली जगह − 2,415 = 6,380।",
    "Which row has nothing in it, and which two rows can you still see?": "किस पंक्ति में कुछ नहीं है, और कौन सी दो पंक्तियाँ अब भी दिखती हैं?",
    "What number goes on top? Blank − 34,271 = 25,308.": "ऊपर कौन सी संख्या आएगी? खाली जगह − 34,271 = 25,308।",
    "Point to the empty row. Is it the number on top?": "खाली पंक्ति पर उँगली रखो। क्या वह ऊपर की संख्या है?",
    "A missing smaller number is found by taking away": "गुम छोटी संख्या घटाकर मिलती है",
    "This time the middle row is empty. Is adding still the move?": "इस बार बीच की पंक्ति खाली है। क्या अब भी जोड़ना ही सही चाल है?",
    "Drag the number on top and the answer into the bay.": "ऊपर की संख्या और उत्तर को हल की जगह में खींचो।",
    "Is that row above the rule or under it?": "वह पंक्ति रेखा के ऊपर है या नीचे?",
    "Set the answer under the number on top. Take it away, starting at the ones.": "उत्तर को ऊपर की संख्या के नीचे रखो। इकाई से शुरू करके घटाओ।",
    "When the number taken away is missing, take the answer off the number on top. What is left is the number that was taken away.": "जब घटाई गई संख्या गुम हो, तो ऊपर की संख्या में से उत्तर घटाओ। जो बचता है, वही घटाई गई संख्या है।",
    "You learned: take the answer off the top to find what was taken away.": "तुमने सीखा: ऊपर में से उत्तर घटाओ, तो घटाई गई संख्या मिलती है।",
    "The number on top is 62,405. The difference is 28,143. What was taken away?": "ऊपर की संख्या 62,405 है। अंतर 28,143 है। क्या घटाया गया था?",
    "What was taken away?": "क्या घटाया गया?",
    "Which row is empty this time?": "इस बार कौन सी पंक्ति खाली है?",
    "Find the missing number taken away. 7,462 − blank = 3,150.": "घटाई गई गुम संख्या ढूँढो। 7,462 − खाली जगह = 3,150।",
    "Which two rows can you see, and which one is hiding?": "कौन सी दो पंक्तियाँ दिख रही हैं, और कौन सी छिपी है?",
    "Which number was taken away? 81,354 − blank = 26,719.": "कौन सी संख्या घटाई गई थी? 81,354 − खाली जगह = 26,719।",
    "Is the hiding number the one on top, or the one taken away?": "छिपी संख्या ऊपर वाली है, या घटाई गई?",
    "A missing digit is found by rebuilding its column": "गुम अंक उसका खाना फिर से बनाकर मिलता है",
    "Read it upwards. The answer and the number taken away add back to the top.": "इसे नीचे से ऊपर पढ़ो। उत्तर और घटाई गई संख्या जुड़कर ऊपर की संख्या बनाते हैं।",
    "Tap a column to read it. Start at the ones.": "पढ़ने के लिए किसी खाने पर टैप करो। इकाई से शुरू करो।",
    "Read that column upwards. The answer's digit and the digit taken away make the top digit.": "उस खाने को नीचे से ऊपर पढ़ो। उत्तर का अंक और घटाया गया अंक मिलकर ऊपर का अंक बनाते हैं।",
    "Start at the ones column and settle it before any other.": "इकाई के खाने से शुरू करो और किसी और से पहले उसे हल करो।",
    "A starred sum is a pattern as well as a subtraction. Settle the columns from the ones, and check that each digit fits its cell.": "तारों वाला सवाल घटाना भी है और पैटर्न भी। इकाई से खाने हल करो, और देखो कि हर अंक अपने खाने में ठीक बैठे।",
    "You learned: read the columns upwards from the ones to find a digit.": "तुमने सीखा: अंक ढूँढने के लिए इकाई से खाने नीचे से ऊपर पढ़ो।",
    "Two digits are covered by stars. Find both of them, starting at the ones.": "दो अंक तारों से ढके हैं। इकाई से शुरू करके दोनों ढूँढो।",
    "The two stars?": "दोनों तारे?",
    "Which column on your mat has only one thing missing in it?": "तुम्हारी चटाई के किस खाने में बस एक चीज़ गुम है?",
    "Find the covered digit in this subtraction.": "इस घटाने में ढका हुआ अंक ढूँढो।",
    "The covered digit?": "ढका हुआ अंक?",
    "Which column is the star in, and is the column to its right settled?": "तारा किस खाने में है, और क्या उसके दाईं ओर का खाना हल हो गया?",
    "Find the covered digit. Read its column upwards.": "ढका हुआ अंक ढूँढो। उसका खाना नीचे से ऊपर पढ़ो।",
    "Which two digits can you see in the star's column?": "तारे वाले खाने में कौन से दो अंक दिखते हैं?",
    "Say which number is missing before you start": "शुरू करने से पहले बताओ कौन सी संख्या गुम है",
    "Before you work anything, say which of the three is hiding.": "कुछ भी हल करने से पहले बताओ कि तीनों में से कौन सी छिपी है।",
    "Tap its name, then type the number.": "उसके नाम पर टैप करो, फिर संख्या लिखो।",
    "A blank on top is built by adding. Any other blank is found by taking away.": "ऊपर की खाली जगह जोड़कर बनती है। बाकी कोई भी खाली जगह घटाकर मिलती है।",
    "Name what is blank first, because the blank decides the move. One hall on the first page holds 888 seats, and the other holds 384. So one hall has 504 more seats.": "पहले खाली का नाम बताओ, क्योंकि खाली जगह ही चाल तय करती है। पहले पन्ने पर एक हॉल में 888 सीटें हैं, और दूसरे में 384। तो एक हॉल में 504 सीटें ज़्यादा हैं।",
    "You learned: name what is blank first; it decides add or take away.": "तुमने सीखा: पहले खाली का नाम बताओ; वही तय करता है जोड़ो या घटाओ।",
    "Which of the three numbers is missing here, and what is it? Blank − 15,206 = 41,378.": "यहाँ तीनों में से कौन सी संख्या गुम है, और वह क्या है? खाली जगह − 15,206 = 41,378।",
    "Name it, then type it.": "नाम बताओ, फिर लिखो।",
    "Which row is the blank standing in?": "खाली जगह किस पंक्ति में है?",
    "Say which of the three numbers is missing, then find it. 93,067 − blank = 48,529.": "बताओ तीनों में से कौन सी संख्या गुम है, फिर उसे ढूँढो। 93,067 − खाली जगह = 48,529।",
    "Which of the three names fits the empty row here?": "यहाँ खाली पंक्ति पर तीनों में से कौन सा नाम ठीक बैठता है?",
    "What should be added to 36,148, to make it 80,000? Name the blank first.": "36,148 में क्या जोड़ें कि 80,000 बने? पहले खाली का नाम बताओ।",
    "Where is the empty row: on top, in the middle, or under the rule?": "खाली पंक्ति कहाँ है: ऊपर, बीच में, या रेखा के नीचे?",
    /* the working area's own lines */
    "Look again. Which row is empty?": "फिर से देखो। कौन सी पंक्ति खाली है?",
    "First tap the name of the row that is hiding.": "पहले छिपी हुई पंक्ति के नाम पर टैप करो।",
    "The number on top is hiding. Add the two you can see.": "ऊपर की संख्या छिपी है। जो दो दिख रही हैं, उन्हें जोड़ो।",
    "The number taken away is hiding. Take the answer off the top.": "घटाई गई संख्या छिपी है। ऊपर की संख्या में से उत्तर घटाओ।",
    "The answer is hiding. Take away, as usual.": "उत्तर छिपा है। हमेशा की तरह घटाओ।",
    /* the working area's own words */
    "O": "इ", "T": "द", "H": "सै", "Th": "ह", "TTh": "द.ह.",
    "stars covered": "ढके तारे", "named": "नाम बताए", "stars laid": "रखे तारे", "rows filled": "भरी पंक्तियाँ",
    "build bay": "हल की जगह", "taking away": "घटाकर", "adding": "जोड़कर",
    "on top": "ऊपर", "taken away": "घटाई गई", "the answer": "उत्तर", "digits": "अंक",
    "ones column": "इकाई का खाना", "tens column": "दहाई का खाना", "hundreds column": "सैकड़े का खाना",
    "thousands column": "हज़ार का खाना", "ten thousands column": "दस हज़ार का खाना",
    "1 ten goes left": "1 दहाई बाईं ओर जाती है",
    "Work it": "हल करो", "Work it in the bay": "हल की जगह में करो", "Check it back": "वापस जाँचो",
    "New one": "नया", "A new puzzle": "नई पहेली",
  },
  gu: {
    "Missing Number Detective": "ખૂટતી સંખ્યાનો જાસૂસ",
    "One of the three numbers is hiding. Say which one.": "ત્રણ સંખ્યાઓમાંથી એક છુપાયેલી છે. કહો કઈ.",
    "You named what was hiding before you went looking for it, every single time.": "તમે દર વખતે, શોધતાં પહેલાં, છુપાયેલી સંખ્યાનું નામ આપ્યું.",
    "Free play. Cover a whole number or a single digit, and the build bay stays open.": "મુક્ત રમત. આખી સંખ્યા કે એક અંક ઢાંકો, અને ગણતરીની જગ્યા ખુલ્લી રહે છે.",
    "A missing greater number is built by adding": "ખૂટતી મોટી સંખ્યા સરવાળાથી બને છે",
    "The top row is empty. Add the two you can see and see where they land.": "ઉપરની હરોળ ખાલી છે. જે બે દેખાય છે તેમને ઉમેરો અને જુઓ શું બને છે.",
    "Drag both rows into the bay, then type what they make.": "બંને હરોળ ગણતરીની જગ્યામાં ખેંચો, પછી જે બને તે લખો.",
    "Do the two you can see add up to it, or take away from it?": "જે બે દેખાય છે, તે ઉમેરાઈને તેને બનાવે છે, કે તેમાંથી બાદ થાય છે?",
    "Stack the two you can see in the bay. Add them, starting at the ones.": "જે બે દેખાય છે તેમને એક નીચે એક મૂકો. એકમથી શરૂ કરીને ઉમેરો.",
    "When the number on top is missing, the answer and the number taken away add back to it. The check is also the tool that finds it.": "જ્યારે ઉપરની સંખ્યા ખૂટે, ત્યારે જવાબ અને બાદ કરેલી સંખ્યા ઉમેરાઈને તે બને છે. ચકાસણી જ તેને શોધવાની રીત છે.",
    "You learned: a missing top number is built by adding the other two.": "તમે શીખ્યા: ખૂટતી ઉપરની સંખ્યા બીજી બેના સરવાળાથી બને.",
    "A subtraction takes 4,238 away and leaves 3,571. What was the number on top?": "એક બાદબાકીમાં 4,238 બાદ થયા અને 3,571 બાકી રહ્યા. ઉપરની સંખ્યા કઈ હતી?",
    "Number on top?": "ઉપરની સંખ્યા?",
    "Which of the three rows on your mat is empty?": "તમારી ચટાઈની ત્રણ હરોળમાંથી કઈ ખાલી છે?",
    "Find the missing number on top. Blank − 2,415 = 6,380.": "ઉપરની ખૂટતી સંખ્યા શોધો. ખાલી જગ્યા − 2,415 = 6,380.",
    "Which row has nothing in it, and which two rows can you still see?": "કઈ હરોળમાં કશું નથી, અને કઈ બે હરોળ હજી દેખાય છે?",
    "What number goes on top? Blank − 34,271 = 25,308.": "ઉપર કઈ સંખ્યા આવશે? ખાલી જગ્યા − 34,271 = 25,308.",
    "Point to the empty row. Is it the number on top?": "ખાલી હરોળ પર આંગળી મૂકો. શું તે ઉપરની સંખ્યા છે?",
    "A missing smaller number is found by taking away": "ખૂટતી નાની સંખ્યા બાદબાકીથી મળે છે",
    "This time the middle row is empty. Is adding still the move?": "આ વખતે વચ્ચેની હરોળ ખાલી છે. શું હજી પણ ઉમેરવું જ સાચી ચાલ છે?",
    "Drag the number on top and the answer into the bay.": "ઉપરની સંખ્યા અને જવાબને ગણતરીની જગ્યામાં ખેંચો.",
    "Is that row above the rule or under it?": "તે હરોળ રેખાની ઉપર છે કે નીચે?",
    "Set the answer under the number on top. Take it away, starting at the ones.": "જવાબને ઉપરની સંખ્યાની નીચે મૂકો. એકમથી શરૂ કરીને બાદ કરો.",
    "When the number taken away is missing, take the answer off the number on top. What is left is the number that was taken away.": "જ્યારે બાદ કરેલી સંખ્યા ખૂટે, ત્યારે ઉપરની સંખ્યામાંથી જવાબ બાદ કરો. જે બાકી રહે તે જ બાદ કરેલી સંખ્યા છે.",
    "You learned: take the answer off the top to find what was taken away.": "તમે શીખ્યા: ઉપરમાંથી જવાબ બાદ કરો, તો બાદ કરેલી સંખ્યા મળે.",
    "The number on top is 62,405. The difference is 28,143. What was taken away?": "ઉપરની સંખ્યા 62,405 છે. તફાવત 28,143 છે. શું બાદ કર્યું હતું?",
    "What was taken away?": "શું બાદ કર્યું?",
    "Which row is empty this time?": "આ વખતે કઈ હરોળ ખાલી છે?",
    "Find the missing number taken away. 7,462 − blank = 3,150.": "બાદ કરેલી ખૂટતી સંખ્યા શોધો. 7,462 − ખાલી જગ્યા = 3,150.",
    "Which two rows can you see, and which one is hiding?": "કઈ બે હરોળ દેખાય છે, અને કઈ છુપાયેલી છે?",
    "Which number was taken away? 81,354 − blank = 26,719.": "કઈ સંખ્યા બાદ કરી હતી? 81,354 − ખાલી જગ્યા = 26,719.",
    "Is the hiding number the one on top, or the one taken away?": "છુપાયેલી સંખ્યા ઉપરની છે, કે બાદ કરેલી?",
    "A missing digit is found by rebuilding its column": "ખૂટતો અંક તેનું ખાનું ફરી બનાવીને મળે છે",
    "Read it upwards. The answer and the number taken away add back to the top.": "તેને નીચેથી ઉપર વાંચો. જવાબ અને બાદ કરેલી સંખ્યા ઉમેરાઈને ઉપરની સંખ્યા બને છે.",
    "Tap a column to read it. Start at the ones.": "વાંચવા માટે કોઈ ખાના પર ટૅપ કરો. એકમથી શરૂ કરો.",
    "Read that column upwards. The answer's digit and the digit taken away make the top digit.": "તે ખાનું નીચેથી ઉપર વાંચો. જવાબનો અંક અને બાદ કરેલો અંક મળીને ઉપરનો અંક બને છે.",
    "Start at the ones column and settle it before any other.": "એકમના ખાનાથી શરૂ કરો અને બીજા કોઈ પહેલાં તેને ઉકેલો.",
    "A starred sum is a pattern as well as a subtraction. Settle the columns from the ones, and check that each digit fits its cell.": "તારાવાળો દાખલો બાદબાકી પણ છે અને ભાત પણ. એકમથી ખાનાં ઉકેલો, અને જુઓ કે દરેક અંક પોતાના ખાનામાં બરાબર બેસે.",
    "You learned: read the columns upwards from the ones to find a digit.": "તમે શીખ્યા: અંક શોધવા એકમથી ખાનાં નીચેથી ઉપર વાંચો.",
    "Two digits are covered by stars. Find both of them, starting at the ones.": "બે અંક તારાથી ઢંકાયેલા છે. એકમથી શરૂ કરીને બંને શોધો.",
    "The two stars?": "બંને તારા?",
    "Which column on your mat has only one thing missing in it?": "તમારી ચટાઈના કયા ખાનામાં ફક્ત એક જ વસ્તુ ખૂટે છે?",
    "Find the covered digit in this subtraction.": "આ બાદબાકીમાં ઢંકાયેલો અંક શોધો.",
    "The covered digit?": "ઢંકાયેલો અંક?",
    "Which column is the star in, and is the column to its right settled?": "તારો કયા ખાનામાં છે, અને શું તેની જમણી બાજુનું ખાનું ઉકેલાઈ ગયું?",
    "Find the covered digit. Read its column upwards.": "ઢંકાયેલો અંક શોધો. તેનું ખાનું નીચેથી ઉપર વાંચો.",
    "Which two digits can you see in the star's column?": "તારાવાળા ખાનામાં કયા બે અંક દેખાય છે?",
    "Say which number is missing before you start": "શરૂ કરતાં પહેલાં કહો કઈ સંખ્યા ખૂટે છે",
    "Before you work anything, say which of the three is hiding.": "કશું ઉકેલતાં પહેલાં કહો કે ત્રણમાંથી કઈ છુપાયેલી છે.",
    "Tap its name, then type the number.": "તેના નામ પર ટૅપ કરો, પછી સંખ્યા લખો.",
    "A blank on top is built by adding. Any other blank is found by taking away.": "ઉપરની ખાલી જગ્યા સરવાળાથી બને છે. બાકીની કોઈ પણ ખાલી જગ્યા બાદબાકીથી મળે છે.",
    "Name what is blank first, because the blank decides the move. One hall on the first page holds 888 seats, and the other holds 384. So one hall has 504 more seats.": "પહેલાં ખાલીનું નામ આપો, કારણ કે ખાલી જગ્યા જ ચાલ નક્કી કરે છે. પહેલા પાના પર એક હૉલમાં 888 બેઠકો છે, અને બીજામાં 384. તો એક હૉલમાં 504 બેઠકો વધારે છે.",
    "You learned: name what is blank first; it decides add or take away.": "તમે શીખ્યા: પહેલાં ખાલીનું નામ આપો; તે જ નક્કી કરે ઉમેરો કે બાદ કરો.",
    "Which of the three numbers is missing here, and what is it? Blank − 15,206 = 41,378.": "અહીં ત્રણમાંથી કઈ સંખ્યા ખૂટે છે, અને તે શું છે? ખાલી જગ્યા − 15,206 = 41,378.",
    "Name it, then type it.": "નામ આપો, પછી લખો.",
    "Which row is the blank standing in?": "ખાલી જગ્યા કઈ હરોળમાં છે?",
    "Say which of the three numbers is missing, then find it. 93,067 − blank = 48,529.": "કહો ત્રણમાંથી કઈ સંખ્યા ખૂટે છે, પછી તેને શોધો. 93,067 − ખાલી જગ્યા = 48,529.",
    "Which of the three names fits the empty row here?": "અહીં ખાલી હરોળને ત્રણમાંથી કયું નામ બંધબેસે છે?",
    "What should be added to 36,148, to make it 80,000? Name the blank first.": "36,148 માં શું ઉમેરીએ કે 80,000 બને? પહેલાં ખાલીનું નામ આપો.",
    "Where is the empty row: on top, in the middle, or under the rule?": "ખાલી હરોળ ક્યાં છે: ઉપર, વચ્ચે, કે રેખા નીચે?",
    /* the working area's own lines */
    "Look again. Which row is empty?": "ફરી જુઓ. કઈ હરોળ ખાલી છે?",
    "First tap the name of the row that is hiding.": "પહેલાં છુપાયેલી હરોળના નામ પર ટૅપ કરો.",
    "The number on top is hiding. Add the two you can see.": "ઉપરની સંખ્યા છુપાયેલી છે. જે બે દેખાય છે તેમને ઉમેરો.",
    "The number taken away is hiding. Take the answer off the top.": "બાદ કરેલી સંખ્યા છુપાયેલી છે. ઉપરની સંખ્યામાંથી જવાબ બાદ કરો.",
    "The answer is hiding. Take away, as usual.": "જવાબ છુપાયેલો છે. હંમેશની જેમ બાદ કરો.",
    /* the working area's own words */
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દ.હ.",
    "stars covered": "ઢંકાયેલા તારા", "named": "નામ આપ્યાં", "stars laid": "મૂકેલા તારા", "rows filled": "ભરેલી હરોળ",
    "build bay": "ગણતરીની જગ્યા", "taking away": "બાદ કરીને", "adding": "ઉમેરીને",
    "on top": "ઉપર", "taken away": "બાદ કરેલી", "the answer": "જવાબ", "digits": "અંક",
    "ones column": "એકમનું ખાનું", "tens column": "દશકનું ખાનું", "hundreds column": "શતકનું ખાનું",
    "thousands column": "હજારનું ખાનું", "ten thousands column": "દસ હજારનું ખાનું",
    "1 ten goes left": "1 દશક ડાબી બાજુ જાય છે",
    "Work it": "ઉકેલો", "Work it in the bay": "ગણતરીની જગ્યામાં ઉકેલો", "Check it back": "પાછું ચકાસો",
    "New one": "નવું", "A new puzzle": "નવો કોયડો",
  },
};
/* a place's name inside a Hindi / Gujarati sentence, and "2 of 3" in the language in use */
const MN_IN: any = { hi: ["इकाई", "दहाई", "सैकड़े", "हज़ार", "दस हज़ार"], gu: ["એકમ", "દશક", "શતક", "હજાર", "દસ હજાર"] };
const mnOf = (a: any, b: any, lang: string) => (lang === "hi" ? `${b} में से ${a}` : lang === "gu" ? `${b} માંથી ${a}` : `${a} of ${b}`);

/* ── the puzzles: place 0 is the ones; row a = the number on top, b = the number taken away, d = the answer ── */
const MN_PLACE = ["ones", "tens", "hundreds", "thousands", "ten thousands"];
const MN_HEAD = ["O", "T", "H", "Th", "TTh"];
const MN_NAME: any = { a: "on top", b: "taken away", d: "the answer" };
/* the chapter's content colours: on top deep blue, taken away amber, the answer green, a ten on the move
   vermilion, a digit rewritten after a trade rose, a zero holding a place grey */
const MN_INK: any = { a: shade(CONTENT.hundred, 0.25), b: shade(CONTENT.ten, 0.45), d: shade(CONTENT.one, 0.25),
  verm: shade(CONTENT.pointer, 0.25), rose: shade(CONTENT.bead, 0.4), zero: "#767676" };
const mnDig = (v: number, k: number) => Math.floor(v / Math.pow(10, k)) % 10;
const mnLen = (v: number) => String(Math.max(0, Math.round(v))).length;
/* Indian grouping of a typed digit string (kept as typed, leading zeros too) */
const mnCommas = (s: string) => {
  if (s.length <= 3) return s;
  let head = s.slice(0, -3), out = s.slice(-3);
  while (head.length > 2) { out = head.slice(-2) + "," + out; head = head.slice(0, -2); }
  return head + "," + out;
};
/* free play: subtractions to hide a row or a digit of (888 less 384 is the opening page's two halls) */
const MN_FREE = [[888, 384], [7242, 3417], [9980, 5286], [80000, 36148], [62405, 28143]];

/* One entry per phase = one mount.
   items   the plan's questions, three a phase.
           kind  top = the number on top is blank (built by adding) · mid = the number taken away is blank
                 (found by taking away) · star = single digits under star cards (typed from the ones leftwards)
                 · name = three puzzles; name the blank row on the gate, then find it
           A, B, D  the number on top, the number taken away and the answer (A − B = D)
           near  the item's misconception (nearMiss) */
const PHASES = [
  {
    n: 1,
    concept: "A missing greater number is built by adding",
    conceptId: "M2.S3.T5.C16", objectiveIds: ["O7"],
    says: ["The top row is empty. Add the two you can see and see where they land.", "Drag both rows into the bay, then type what they make."],
    /* tries, as the plan writes it: first rung the item's miss line, second the phase's question, third the
       bay stacking the two with a plus (said here; the traceback draws it) */
    ladder: ["Do the two you can see add up to it, or take away from it?", "Stack the two you can see in the bay. Add them, starting at the ones."],
    closing: "When the number on top is missing, the answer and the number taken away add back to it. The check is also the tool that finds it.",
    learned: "You learned: a missing top number is built by adding the other two.",
    traceback: "If the child took one showing number off the other, that working is set under the bay in ink; then the two rows drop into the bay under a plus and are added from the ones, each ten carried left; the total rises into the empty top row and the subtraction is checked downwards.",
    items: [
      /* learn ML1: answer in the plan = 7,809 */
      { qid: "M2.S3.T5.C16:ML1", kind: "top", A: 7809, B: 4238, D: 3571, answer: 7809, near: 667, winMs: 5400, ask: "Number on top?",
        say: "A subtraction takes 4,238 away and leaves 3,571. What was the number on top?", miss: "Which of the three rows on your mat is empty?" },
      /* practice 1: answer in the plan = 8,795 */
      { qid: "M2.S3.T5.C16:1", kind: "top", A: 8795, B: 2415, D: 6380, answer: 8795, near: 3965, winMs: 5400, ask: "Number on top?",
        say: "Find the missing number on top. Blank − 2,415 = 6,380.", miss: "Which row has nothing in it, and which two rows can you still see?" },
      /* practice 2: answer in the plan = 59,579 */
      { qid: "M2.S3.T5.C16:2", kind: "top", A: 59579, B: 34271, D: 25308, answer: 59579, near: 8963, winMs: 5400, ask: "Number on top?",
        say: "What number goes on top? Blank − 34,271 = 25,308.", miss: "Point to the empty row. Is it the number on top?" },
    ],
  },
  {
    n: 2,
    concept: "A missing smaller number is found by taking away",
    conceptId: "M2.S3.T5.C17", objectiveIds: ["O7"],
    says: ["This time the middle row is empty. Is adding still the move?", "Drag the number on top and the answer into the bay."],
    ladder: ["Is that row above the rule or under it?", "Set the answer under the number on top. Take it away, starting at the ones."],
    closing: "When the number taken away is missing, take the answer off the number on top. What is left is the number that was taken away.",
    learned: "You learned: take the answer off the top to find what was taken away.",
    traceback: "If the child added the two showing, that working is set under the bay in ink; then the number on top and the answer drop into the bay under a minus and are worked from the ones, one ten unbundled at a time, each lending digit struck through in ink with its new value in rose; the result drops into the middle row and the subtraction is checked.",
    items: [
      /* learn ML2: answer in the plan = 34,262 */
      { qid: "M2.S3.T5.C17:ML2", kind: "mid", A: 62405, B: 34262, D: 28143, answer: 34262, near: 90548, winMs: 5400, ask: "What was taken away?",
        say: "The number on top is 62,405. The difference is 28,143. What was taken away?", miss: "Which row is empty this time?" },
      /* practice 3: answer in the plan = 4,312 */
      { qid: "M2.S3.T5.C17:3", kind: "mid", A: 7462, B: 4312, D: 3150, answer: 4312, near: 10612, winMs: 5400, ask: "What was taken away?",
        say: "Find the missing number taken away. 7,462 − blank = 3,150.", miss: "Which two rows can you see, and which one is hiding?" },
      /* practice 4: answer in the plan = 54,635 */
      { qid: "M2.S3.T5.C17:4", kind: "mid", A: 81354, B: 54635, D: 26719, answer: 54635, near: 108073, winMs: 5400, ask: "What was taken away?",
        say: "Which number was taken away? 81,354 − blank = 26,719.", miss: "Is the hiding number the one on top, or the one taken away?" },
    ],
  },
  {
    n: 3,
    concept: "A missing digit is found by rebuilding its column",
    conceptId: "M2.S3.T5.C18", objectiveIds: ["O8"],
    says: ["Read it upwards. The answer and the number taken away add back to the top.", "Tap a column to read it. Start at the ones."],
    ladder: ["Read that column upwards. The answer's digit and the digit taken away make the top digit.", "Start at the ones column and settle it before any other."],
    closing: "A starred sum is a pattern as well as a subtraction. Settle the columns from the ones, and check that each digit fits its cell.",
    learned: "You learned: read the columns upwards from the ones to find a digit.",
    traceback: "The columns are read upwards from the ones: each star lifts, the column's total shows the ten it sends left in vermilion, the ten lands small above the next column, the column is read downwards too, and the whole subtraction is checked.",
    items: [
      /* learn ML3: answer in the plan = The star on top is 4 and the star in the answer is 6, so 55,743 − 24,317 = 31,426.
         Two boxes, each named by its star's place: the ones star (in the answer) and the tens star (on top) */
      { qid: "M2.S3.T5.C18:ML3", kind: "star", A: 55743, B: 24317, D: 31426, stars: ["d0", "a1"], parts: [{ label: "ones star" }, { label: "tens star" }],
        answer: [6, 4], near: [6, 3], winMs: 5800,
        ask: "The two stars?", say: "Two digits are covered by stars. Find both of them, starting at the ones.", miss: "Which column on your mat has only one thing missing in it?" },
      /* practice 5: answer in the plan = 5, because 2,415 + 2,341 = 4,756 */
      { qid: "M2.S3.T5.C18:5", kind: "star", A: 4756, B: 2341, D: 2415, stars: ["a1"], answer: 5, near: 3, winMs: 5800,
        ask: "The covered digit?", say: "Find the covered digit in this subtraction.", miss: "Which column is the star in, and is the column to its right settled?" },
      /* practice 6: answer in the plan = 8, because 37,231 + 31,251 = 68,482 */
      { qid: "M2.S3.T5.C18:6", kind: "star", A: 68482, B: 31251, D: 37231, stars: ["a1"], answer: 8, near: 2, winMs: 5800,
        ask: "The covered digit?", say: "Find the covered digit. Read its column upwards.", miss: "Which two digits can you see in the star's column?" },
    ],
  },
  {
    n: 4,
    concept: "Say which number is missing before you start",
    conceptId: "M2.S3.T5.C19", objectiveIds: ["O8"],
    says: ["Before you work anything, say which of the three is hiding.", "Tap its name, then type the number."],
    ladder: ["Is that row above the rule or under it?", "A blank on top is built by adding. Any other blank is found by taking away."],
    closing: "Name what is blank first, because the blank decides the move. One hall on the first page holds 888 seats, and the other holds 384. So one hall has 504 more seats.",
    learned: "You learned: name what is blank first; it decides add or take away.",
    traceback: "The three puzzles are named in their margins with the sign each needs: the number on top (+), the number taken away (−) and, on the third, the answer under the rule (−). If the child added the two showing out of habit, that working is set beside the bay in ink; then the bay works the move the current blank needs, lifts the result into its empty row and checks it downwards.",
    items: [
      /* learn ML4: answer in the plan = The number on top is missing, and it is 56,584 (named on the gate, typed on the pad) */
      { qid: "M2.S3.T5.C19:ML4", kind: "name", blank: "a", A: 56584, B: 15206, D: 41378, answer: 56584, near: 26172, winMs: 5600, ask: "Name it, then type it.",
        say: "Which of the three numbers is missing here, and what is it? Blank − 15,206 = 41,378.", miss: "Which row is the blank standing in?" },
      /* practice 7: answer in the plan = The number taken away is missing, and it is 44,538 */
      { qid: "M2.S3.T5.C19:7", kind: "name", blank: "b", A: 93067, B: 44538, D: 48529, answer: 44538, near: 141596, winMs: 5600, ask: "Name it, then type it.",
        say: "Say which of the three numbers is missing, then find it. 93,067 − blank = 48,529.", miss: "Which of the three names fits the empty row here?" },
      /* practice 8: answer in the plan = 43,852, because 80,000 − 36,148 = 43,852 (the row under the rule is blank) */
      { qid: "M2.S3.T5.C19:8", kind: "name", blank: "d", A: 80000, B: 36148, D: 43852, answer: 43852, near: 116148, winMs: 5600, ask: "Name it, then type it.",
        say: "What should be added to 36,148, to make it 80,000? Name the blank first.", miss: "Where is the empty row: on top, in the middle, or under the rule?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  rows: { a: "the number on top (deep blue)", b: "the number taken away (amber)", d: "the answer, under the rule (green)" },
  moves: { top: "answer + number taken away", middle: "number on top − answer", answer: "number on top − number taken away" },
  mat: { columns: MN_HEAD, columnWidth: 80, rowPitch: 84 },
  bay: "stacks the two rows that show under the sign the blank needs, works its own columns from the ones and lifts the result into the empty row",
  trades: "a ten on the move is small and vermilion above the column it reaches; a digit that lent is struck through in ink with its new value small in rose",
  stars: "ink cards over single digits; typed digits land on them from the ones leftwards; a column opens only when every column to its right is settled",
  gate: "phase 4: the empty row is named (on top, taken away, the answer) before the bay draws any sign",
  freePuzzles: MN_FREE.map(([a, b]) => ({ top: a, takenAway: b, answer: a - b })),
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: two stars are two boxes (each named by its star's place); numbers compare as numbers */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from the printed puzzle by a second route (strings and whole-number
   arithmetic; no code shared with judge or the working area) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.A - it.B !== it.D || String(it.near) === String(it.answer)) return false;
  if (it.kind === "top") return it.answer === it.D + it.B;
  if (it.kind === "mid") return it.answer === it.A - it.D;
  if (it.kind === "name") return it.answer === (it.blank === "a" ? it.B + it.D : it.blank === "b" ? it.A - it.D : it.A - it.B);
  if (it.kind === "star") {
    /* read upwards: the answer and the number taken away, added with their carries, spell the number on top */
    const up = String(Number(it.D) + Number(it.B));
    if (up !== String(it.A)) return false;
    const row = (c: string) => String(c[0] === "a" ? it.A : c[0] === "b" ? it.B : it.D);
    const got = it.stars.slice().sort((x: string, y: string) => Number(x.slice(1)) - Number(y.slice(1)))
      .map((c: string) => { const s = row(c); return s[s.length - 1 - Number(c.slice(1))]; });
    return got.join(",") === (Array.isArray(it.answer) ? it.answer : [it.answer]).map(String).join(",");
  }
  return false;
}));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.parts ? item.answer.join("|") : item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: on the naming phase it names the empty row, as a child taps the gate */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* the slot: a star's digit stays as typed; a typed number takes its Indian commas */
const MN_NOW: any = { star: false };
const format = (t: any) => {
  const s = String(t ?? ""), d = s.replace(/\D/g, "");
  if (!/^[\d,\s]+$/.test(s) || !d || MN_NOW.star) return s;
  return mnCommas(d);
};

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */

/* one column board (the mat, the bay or a small mat), right-aligned to the ones */
const mnGeo = (o: any) => {
  const w = o.pad * 2 + o.sg + o.nc * o.cw;
  const colX = (k: number) => o.x + o.pad + o.sg + (o.nc - 1 - k) * o.cw;
  return { ...o, w, colX, cx: (k: number) => colX(k) + o.cw / 2, sx: o.x + o.pad + o.sg / 2 };
};
const MN_BIG = { cw: 80, sg: 64, pad: 16, head: 10, headH: 36, strip: 80, r1: 128, r2: 212, rule: 254, r3: 300, h: 350, fs: T.xl, base: 20, cellH: 70 };
const MN_SMALL = { cw: 58, sg: 40, pad: 10, head: null, strip: 0, r1: 48, r2: 100, rule: 126, r3: 156, h: 192, fs: T.speech, base: 16, cellH: 44 };
const MN_BAY4 = { cw: 80, sg: 64, pad: 16, head: null, strip: 30, r1: 72, r2: 134, rule: 168, r3: 210, h: 248, fs: T.xl, base: 20, cellH: 54 };
const MN_AT: any = { a: 1, b: 2, d: 3 };
/* the move a blank needs: which two rows the bay stacks, its sign, and the row its result fills */
const mnBay = (blank: any) => (blank === "a" ? { r1: "d", r2: "b", sign: "+", tot: "a" }
  : blank === "b" ? { r1: "a", r2: "d", sign: "−", tot: "b" } : { r1: "a", r2: "b", sign: "−", tot: "d" });

/* column addition from the ones: after each column, the digits so far and the carries (small, vermilion,
   above the column a ten reaches) */
const mnAdd = (x: number, y: number, nc: number) => {
  const out: any[] = [], res: any = {}, trade: any = {};
  let c = 0;
  for (let k = 0; k < nc; k++) {
    const s = mnDig(x, k) + mnDig(y, k) + c;
    res[k] = s % 10; c = s >= 10 ? 1 : 0;
    if (c && k + 1 < nc) trade[k + 1] = [{ s: "1", f: "verm" }];
    out.push({ res: { ...res }, trade: { ...trade }, strike: {} });
  }
  return out;
};
/* column subtraction from the ones, trading as the book does, one ten unbundled at a time: across zeros
   (80,000 less 36,148) the ten thousands opens a ten into the thousands, that opens one into the hundreds,
   and so on down to the ones, each its own step. A digit that lends is struck through in ink with its new
   value small above it (rose); a ten arriving is the small vermilion 1. Every step is a snapshot. */
const mnSub = (x: number, y: number, nc: number) => {
  const cur: number[] = [], sub: number[] = [], got: boolean[] = [], lent: boolean[] = [];
  for (let k = 0; k < nc; k++) { cur[k] = mnDig(x, k); sub[k] = mnDig(y, k); got[k] = false; lent[k] = false; }
  const out: any[] = [], res: any = {};
  const snap = () => {
    const trade: any = {}, strike: any = {};
    for (let m = 0; m < nc; m++) {
      if (!got[m] && !lent[m]) continue;
      strike[m] = true;
      trade[m] = got[m] && cur[m] >= 10 ? [{ s: "1", f: "verm" }, { s: String(cur[m] - 10), f: lent[m] ? "rose" : "ink" }] : [{ s: String(cur[m]), f: "rose" }];
    }
    out.push({ res: { ...res }, trade, strike });
  };
  for (let k = 0; k < nc; k++) {
    if (cur[k] < sub[k]) {
      let j = k + 1;
      while (j < nc && cur[j] === 0) j++;
      if (j < nc) for (let m = j; m > k; m--) { cur[m] -= 1; lent[m] = true; cur[m - 1] += 10; got[m - 1] = true; snap(); }
    }
    res[k] = cur[k] - sub[k];
    snap();
  }
  return out;
};
/* the bay's working for a puzzle, step by step */
const mnSteps = (A: number, B: number, D: number, blank: any, nc: number) => {
  const P = mnBay(blank), v: any = { a: A, b: B, d: D };
  return P.sign === "+" ? mnAdd(v[P.r1], v[P.r2], nc) : mnSub(v[P.r1], v[P.r2], nc);
};
/* the rival route a child takes when the blank is not named: the other move on the two numbers that show */
const mnRival = (A: number, B: number, D: number, blank: any) =>
  blank === "a" ? { v: Math.abs(D - B), x: Math.max(D, B), y: Math.min(D, B), op: "−", label: "taking away" }
    : blank === "b" ? { v: A + D, x: A, y: D, op: "+", label: "adding" } : { v: A + B, x: A, y: B, op: "+", label: "adding" };
/* each bay question waits out its whole win: the bay's steps, the lift and the check */
PHASES.forEach((p: any) => p.items.forEach((it: any) => {
  if (it.kind !== "top" && it.kind !== "mid" && it.kind !== "name") return;
  const blank = it.kind === "top" ? "a" : it.kind === "mid" ? "b" : it.blank;
  const nc = Math.max(mnLen(it.A), mnLen(it.B), mnLen(it.D));
  it.winMs = Math.max(5400, 3000 + 400 * mnSteps(it.A, it.B, it.D, blank, nc).length);
}));

/* one puzzle, set up for the working area. The hidden number is known here but never drawn before it is found. */
const mnSetup = (it: any) => {
  const kind = it.kind || "free";
  const A = it.A, B = it.B, D = it.D;
  const nc = Math.max(mnLen(A), mnLen(B), mnLen(D));
  const blank = kind === "top" ? "a" : kind === "mid" ? "b" : kind === "name" || kind === "free" ? it.blank || null : null;
  const stars = (it.stars || []).slice().sort((x: string, y: string) => Number(x.slice(1)) - Number(y.slice(1)));
  const cin: any = { 0: 0 }; /* the carries of the upward reading (answer + taken away = top), into each column */
  for (let k = 0; k < nc; k++) cin[k + 1] = mnDig(D, k) + mnDig(B, k) + cin[k] >= 10 ? 1 : 0;
  return { kind, A, B, D, nc, blank, stars, cin };
};
const mnFree = (fi: number, mode: string) => {
  const [a, b] = MN_FREE[fi % MN_FREE.length];
  return { kind: "free", A: a, B: b, D: a - b, blank: mode === "digits" ? null : mode };
};

const MN_CSS = `
.mn-in{animation:mnIn 380ms ease-out both}
@keyframes mnIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
.mn-move{transition:transform 560ms cubic-bezier(.3,.7,.25,1)}
@media (prefers-reduced-motion:reduce){.mn-in{animation:none}.mn-move{transition:none}}
`;

/* drawn marks (no glyphs) */
const mnStar = (x: number, y: number, r: number) => {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r;
    d += (i ? "L " : "M ") + (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1) + " ";
  }
  return d + "Z";
};
const mnTick = (x: number, y: number) => `M ${x - 12} ${y} L ${x - 3} ${y + 10} L ${x + 14} ${y - 12}`;
const mnArrow = (x: number, y0: number, y1: number) => `M ${x} ${y0} L ${x} ${y1} M ${x - 12} ${y1 + (y1 < y0 ? 13 : -13)} L ${x} ${y1} L ${x + 12} ${y1 + (y1 < y0 ? 13 : -13)}`;
const mnInk = (r: string, v: number, k: number) => (mnDig(v, k) === 0 && mnLen(v) > 1 ? MN_INK.zero : MN_INK[r]);

/* a star card laid over a digit; the child's digit is pencilled on it in white */
function MnStarCard({ x, y, C, pencil, w = 60, h = 70, fs, hot }: any) {
  const pf = String(pencil ?? "").length > 1 ? T.label : fs;
  return (
    <g pointerEvents="none">
      {hot && <rect x={x - w / 2 - 6} y={y - h / 2 - 6} width={w + 12} height={h + 12} rx={16} fill="none" stroke={C.accent} strokeWidth={4} />}
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={12} fill={C.ink} filter="url(#fShadowSoft)" />
      {pencil !== undefined && pencil !== ""
        ? <g>
            <text x={x} y={y + pf * 0.36} textAnchor="middle" fontSize={pf} fontWeight={700} fill="#FFFFFF">{String(pencil).slice(0, 2)}</text>
            <path d={mnStar(x + w / 2 - 12, y - h / 2 + 12, 8)} fill="#FFFFFF" />
          </g>
        : <path d={mnStar(x, y, Math.min(w, h) * 0.34)} fill="#FFFFFF" />}
    </g>
  );
}

/* the digits of one row: all of it, the columns worked so far, the child's typing, or ruled empty cells */
function mnCells(G: any, C: any, r: any, cy: number) {
  const fh = G.cellH, cellW = G.cw - 16;
  if (r.show === "slot")
    return [<rect key="slot" x={G.colX(G.nc - 1) + 6} y={cy - fh / 2} width={G.nc * G.cw - 12} height={fh} rx={14} fill="none" stroke={shade(C.rule, 0.2)} strokeWidth={2.5} strokeDasharray="10 9" />];
  const digs: any = {};
  if (r.show === "all") {
    const L = mnLen(r.v);
    for (let k = 0; k < L; k++) digs[k] = String(mnDig(r.v, k));
  } else if (r.show === "res") {
    const L = mnLen(r.v);
    Object.keys(r.res || {}).forEach((k: any) => { if (Number(k) < L) digs[k] = String(r.res[k]); });
  } else if (r.show === "mirror") {
    const s = r.text || "";
    for (let k = 0; k < s.length && k <= G.nc; k++) digs[k] = s[s.length - 1 - k];
  }
  const out: any[] = [];
  for (let k = 0; k <= G.nc; k++) {
    const x = G.cx(k), st = r.stars && r.stars[k];
    if (k < G.nc && digs[k] === undefined && r.show !== "all")
      out.push(<rect key={"e" + k} x={x - cellW / 2} y={cy - fh / 2} width={cellW} height={fh} rx={10} fill="none" stroke={shade(C.rule, 0.2)} strokeWidth={2} strokeDasharray="8 7" />);
    if (st && !st.lifted) { out.push(<MnStarCard key={"s" + k} x={x} y={cy} C={C} pencil={st.pencil} hot={st.hot} w={Math.min(60, G.cw - 12)} h={G.cellH} fs={G.fs} />); continue; }
    /* where a star was lifted, the found digit keeps a ring */
    if (st && st.lifted) out.push(<rect key={"f" + k} x={x - cellW / 2 - 2} y={cy - fh / 2} width={cellW + 4} height={fh} rx={12} fill="none" stroke={C.accent} strokeWidth={4} />);
    if (digs[k] === undefined) continue;
    const fill = r.ink ? r.ink : r.show === "mirror" ? C.ink : mnInk(r.key, r.v, k);
    out.push(<text key={"d" + k} x={x} y={cy + G.base} textAnchor="middle" fontSize={G.fs} fontWeight={700} fill={fill}>{digs[k]}</text>);
  }
  return out;
}

/* one board: panel, headings, white column bands, three rows, the sign, the rule, the trade strip, strikes */
function MnBoard({ G, C, rows, sign, trade, strike, lit, hot, tx = (v: any) => v }: any) {
  const top = G.y, half = G.cellH / 2 + 6;
  const rowY = (at: number) => top + (at === 1 ? G.r1 : at === 2 ? G.r2 : G.r3);
  return (
    <g>
      <rect x={G.x} y={top} width={G.w} height={G.h} rx={RAD.panel} fill="url(#gPanel)" stroke={hot ? C.accent : C.rule} strokeWidth={hot ? 4 : 2} />
      {Array.from({ length: G.nc }).map((_, k) => (
        <g key={"c" + k}>
          {G.head !== null && (
            <g>
              <rect x={G.colX(k) + 5} y={top + G.head} width={G.cw - 10} height={G.headH} rx={10} fill={lit === k ? tint(C.accent, 0.72) : tint(C.panel, 0.3)}
                stroke={lit === k ? C.accent : C.rule} strokeWidth={lit === k ? 3 : 1.5} />
              <text x={G.cx(k)} y={top + G.head + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(MN_HEAD[k])}</text>
            </g>
          )}
          <rect x={G.colX(k) + 5} y={top + G.r1 - half} width={G.cw - 10} height={G.r3 - G.r1 + 2 * half} rx={12} fill="#FFFFFF"
            stroke={lit === k ? C.accent : C.rule} strokeWidth={lit === k ? 4 : 1.5} />
        </g>
      ))}
      {sign && <text x={G.sx} y={rowY(2) + G.base} textAnchor="middle" fontSize={G.fs} fontWeight={600} fill={C.ink}>{sign}</text>}
      <rect x={G.x + G.pad} y={top + G.rule} width={G.w - 2 * G.pad} height={4} rx={2} fill={C.ink} />
      {trade && Object.keys(trade).map((k: any) => (
        <text key={"t" + k} x={G.cx(Number(k))} y={top + G.strip} textAnchor="middle" fontSize={T.micro} fontWeight={700}>
          {trade[k].map((p: any, i: number) => <tspan key={i} fill={p.f === "verm" ? MN_INK.verm : p.f === "rose" ? MN_INK.rose : C.ink}>{p.s}</tspan>)}
        </text>
      ))}
      {rows.map((r: any) => <g key={"r" + r.at} className={r.cls}>{mnCells(G, C, r, rowY(r.at))}</g>)}
      {strike && Object.keys(strike).map((k: any) => {
        const x = G.cx(Number(k)), y = rowY(1);
        return <path key={"x" + k} d={`M ${x - 20} ${y + 17} L ${x + 20} ${y - 21}`} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />;
      })}
    </g>
  );
}

/* the reading strip's terms: a digit, an operator, a star cell, an unknown ten, or a two-digit total */
const MN_TW: any = { d: 50, op: 46, box: 56, star: 66, tot: 82 };

function Work({ phase, n, item, index, stage, wrong, typed, part, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const busy = tl.busy;
  const free = stage === "free";
  const init = useMemo(() => mnSetup(item), []);
  const [cfg, setCfg] = useState<any>(init);
  const [bayIn, setBayIn] = useState<any>({});          /* bay rows set: { 1: true, 2: true } */
  const [work, setWork] = useState(-1);                  /* bay columns worked, from the ones */
  const [fly, setFly] = useState<any>(null);             /* the result on its way up to the empty row */
  const [lifted, setLifted] = useState(false);           /* the empty row holds the result */
  const [checked, setChecked] = useState(false);         /* the subtraction worked downwards, laid under the mat */
  const [touched, setTouched] = useState(false);
  const [opened, setOpened] = useState<number[]>([]);    /* phase 3: columns read, in order */
  const [open, setOpen] = useState<number | null>(null); /* the column in the reading strip */
  const [solved, setSolved] = useState<number[]>([]);    /* columns read in full (win / traceback) */
  const [down, setDown] = useState<number[]>([]);        /* columns read downwards too */
  const [carries, setCarries] = useState<any>({});       /* tens that rode up into a column */
  const [liftedStars, setLiftedStars] = useState<string[]>([]);
  const [named, setNamed] = useState<any>({});           /* phase 4: puzzle index -> the row named (a right naming only) */
  const [filled, setFilled] = useState<any>({});         /* phase 4: puzzles already solved */
  const [tags, setTags] = useState(false);               /* phase 4 traceback: every puzzle named in its margin */
  const [rival, setRival] = useState<any>(null);         /* a miss that took the other move: that working, in ink */
  const [fi, setFi] = useState(0);
  const [fmode, setFmode] = useState("a");
  const [fstars, setFstars] = useState<string[]>([]);
  const namedRef = useRef<any>({});
  const setupFor = useRef(index);
  const kind = cfg.kind;
  MN_NOW.star = kind === "star";

  const reset = (it: any) => {
    tl.stop();
    const s = mnSetup(it);
    setCfg(s); setWork(-1); setFly(null); setLifted(false); setChecked(false); setTouched(false);
    setOpened([]); setOpen(null); setSolved([]); setDown([]); setCarries({}); setLiftedStars([]); setTags(false); setRival(null);
    setBayIn(s.kind === "name" && !namedRef.current[index] ? {} : s.kind === "name" ? { 1: true, 2: true } : {});
    api.lock(false);
  };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    setFi(0); setFmode("a"); setFstars([]);
    reset(mnFree(0, "a"));
  }, [free]);

  const val: any = { a: cfg.A, b: cfg.B, d: cfg.D };
  const P = mnBay(cfg.blank);
  const bayKind = kind === "top" || kind === "mid" || kind === "name" || (kind === "free" && !!cfg.blank);
  const tdig = String(typed ?? "").replace(/\D/g, "");
  const pw = 2 * 16 + 64 + cfg.nc * 80, gx = Math.round((W.w - 2 * pw - 70) / 2);
  const matG = kind === "star" ? mnGeo({ ...MN_BIG, cw: 88, nc: cfg.nc, x: 0, y: 0 }) : mnGeo({ ...MN_BIG, nc: cfg.nc, x: gx, y: 0 });
  const bayG = kind === "name" ? mnGeo({ ...MN_BAY4, nc: cfg.nc, x: 330, y: 236 }) : mnGeo({ ...MN_BIG, nc: cfg.nc, x: gx + pw + 70, y: 0 });
  const smalls = kind === "name" ? (phase.items as any[]).map((it: any, i: number) => {
    const s = mnSetup(it), sw = 2 * 10 + 40 + s.nc * 58;
    return { s, G: mnGeo({ ...MN_SMALL, nc: s.nc, x: 368 * i + Math.round((350 - sw) / 2), y: 0 }) };
  }) : [];
  const steps = useMemo(() => mnSteps(cfg.A, cfg.B, cfg.D, cfg.blank, cfg.nc), [cfg]);
  const snap = work >= 0 ? steps[Math.min(work, steps.length - 1)] : null;

  /* ── phase 3: stars, pencils and the ones-first column lock ── */
  /* two stars: two boxes in the slot, box k for star k (named by its place); one star: the typed digit */
  const partVals = kind === "star" && item && item.parts ? slotPartsOf(typed, item.parts.length) : null;
  const pencilOf = (c: string) => {
    const i = cfg.stars.indexOf(c);
    if (i < 0 || !(stage === "ask" || stage === "win")) return undefined;
    if (partVals) return partVals[i] ? partVals[i] : undefined;
    return i < tdig.length ? tdig[i] : undefined;
  };
  const starsAt = (k: number) => cfg.stars.filter((c: string) => Number(c.slice(1)) === k);
  const settled = (k: number) => opened.includes(k) && starsAt(k).every((c: string) => liftedStars.includes(c) || pencilOf(c) !== undefined);
  const lastCol = cfg.stars.length ? Math.max(...cfg.stars.map((c: string) => Number(c.slice(1)))) : -1;
  const lockFor = (k: number) => { for (let j = 0; j < k; j++) if (!settled(j)) return j; return null; };
  const firstOpen = () => { for (let j = 0; j <= lastCol; j++) if (!settled(j)) return j; return null; };
  const carryKnown = (k: number) => { for (let j = 0; j < k; j++) if (starsAt(j).some((c: string) => !liftedStars.includes(c))) return false; return true; };

  const tapCol = (k: number) => {
    if (stage !== "ask" || busy) return;
    setTouched(true);
    const first = lockFor(k);
    if (first !== null) {
      setOpen(null);
      api.say({ en: `First the ${MN_PLACE[first]} column.`, hi: `पहले ${MN_IN.hi[first]} का खाना।`, gu: `પહેલાં ${MN_IN.gu[first]}નું ખાનું.` });
      return;
    }
    setOpen(k); setOpened((o: number[]) => (o.includes(k) ? o : [...o, k]));
    api.sfx.tick();
  };

  /* ── phases 1, 2 and free play: rows dragged into the bay ── */
  const slotOf = (r: string) => (P.r1 === r ? 1 : P.r2 === r ? 2 : 0);
  const putIn = (r: string) => {
    const sl = slotOf(r);
    if (!sl || bayIn[sl]) return;
    setTouched(true);
    setBayIn((b: any) => ({ ...b, [sl]: true }));
    api.sfx.tick();
  };
  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (!(stage === "ask" || free) || busy) return;
    if (moved && p.x < bayG.x - 40) return; /* let go short of the bay: the row simply stays on the mat */
    putIn(payload.row);
  });

  /* ── phase 4: the gate ── */
  const nameIt = (r: string) => {
    namedRef.current = { ...namedRef.current, [index]: r };
    setNamed({ ...namedRef.current });
    setBayIn({ 1: true, 2: true });
  };
  const pick = (r: string) => {
    if (stage !== "ask" || busy || namedRef.current[index]) return;
    setTouched(true);
    if (r === cfg.blank) {
      nameIt(r); api.sfx.tick();
      /* one literal line per row (the same three lines as before), so `cli voice` can bake each one */
      if (r === "a") api.say("The number on top is hiding. Add the two you can see.");
      else if (r === "b") api.say("The number taken away is hiding. Take the answer off the top.");
      else api.say("The answer is hiding. Take away, as usual.");
    } else api.say("Look again. Which row is empty?");
  };

  /* Enter: the naming phase waits for the blank to be named (two stars are two boxes: the runtime waits for both) */
  const enterFn: any =
    stage !== "ask" ? null
      : busy ? () => {}
        : kind === "name" ? (v: any) => {
          if (!namedRef.current[index]) { api.say("First tap the name of the row that is hiding."); return; }
          api.submit(v);
        }
          : null;
  api.onEnter(enterFn);
  HOOK.check = () => { if (kind === "name" && stage === "ask" && !namedRef.current[index]) nameIt(cfg.blank); return undefined; };

  /* ── motion: the bay works its columns, the result rises into the empty row, the subtraction is checked ── */
  const baySteps = (andCheck = true) => {
    const S: any[] = [[60, () => { setBayIn({ 1: true, 2: true }); setWork(-1); setLifted(false); setChecked(false); setFly(null); }], [520, () => {}]];
    for (let k = 0; k < steps.length; k++) { const kk = k; S.push([kk ? 400 : 440, () => { setWork(kk); api.sfx.tick(); }]); }
    S.push([320, () => setFly({ go: false })], [40, () => setFly({ go: true })], [580, () => { setFly(null); setLifted(true); api.sfx.tick(); }]);
    if (andCheck) S.push([460, () => setChecked(true)], [600, () => {}]);
    return S;
  };
  /* the other move on the two numbers that show, when the child's answer is that move's result: set out in ink */
  const rivalSteps = (v: any) => {
    if (!cfg.blank) return [];
    const rv = mnRival(cfg.A, cfg.B, cfg.D, cfg.blank);
    if (leadNumber(v) !== rv.v) return [];
    return [[60, () => setRival({ ...rv, shown: 1 })], [800, () => { setRival({ ...rv, shown: 2 }); api.sfx.tick(); }], [1200, () => {}]];
  };
  /* phase 3: each column from the ones to the last star, read upwards, its ten riding left, then read downwards */
  const starSteps = () => {
    const S: any[] = [[60, () => setOpen(null)]];
    for (let k = 0; k <= lastCol; k++) {
      const kk = k, here = starsAt(k);
      S.push([60, () => { setOpen(kk); setOpened((o: number[]) => (o.includes(kk) ? o : [...o, kk])); }], [320, () => {}]);
      if (here.length) S.push([380, () => { setLiftedStars((l: string[]) => [...l, ...here.filter((c: string) => !l.includes(c))]); api.sfx.tick(); }]);
      S.push([420, () => setSolved((s: number[]) => (s.includes(kk) ? s : [...s, kk]))]);
      if (cfg.cin[kk + 1] && kk + 1 < cfg.nc) S.push([480, () => { setCarries((c: any) => ({ ...c, [kk + 1]: 1 })); api.sfx.tick(); }]);
      S.push([500, () => setDown((d: number[]) => (d.includes(kk) ? d : [...d, kk]))], [380, () => {}]);
    }
    S.push([60, () => setChecked(true)]);
    return S;
  };

  /* ── win ── */
  useEffect(() => {
    if (stage !== "win") return;
    setTouched(true);
    if (kind === "star") tl.run([...starSteps(), [300, () => {}]]);
    else if (bayKind) {
      if (kind === "name") { setFilled((f: any) => ({ ...f, [index]: true })); if (!namedRef.current[index]) nameIt(cfg.blank); }
      tl.run(baySteps());
    }
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer; nothing marked ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const done = () => api.lock(false);
    if (kind === "star") tl.run([...starSteps(), [300, () => {}]], done);
    else if (kind === "name") tl.run([[60, () => { setTags(true); nameIt(cfg.blank); setRival(null); }], [900, () => {}], ...rivalSteps(wrong.value), ...baySteps()], done);
    else tl.run([[60, () => setRival(null)], ...rivalSteps(wrong.value), ...baySteps()], done);
  }, [wrong]);

  /* ── free play: pick what to hide, drag the rows in or work it, a new puzzle on the key ── */
  const freeMode = (m: string) => { setFmode(m); setFstars([]); reset(mnFree(fi, m)); api.sfx.tick(); };
  const freeNew = () => { const f = (fi + 1) % MN_FREE.length; setFi(f); setFstars([]); reset(mnFree(f, fmode)); api.sfx.tick(); };
  const freeWork = () => { if (busy || !cfg.blank) return; setTouched(true); tl.run(baySteps(false)); };
  const freeCheck = () => { if (busy || !lifted || checked) return; tl.run([[60, () => { setChecked(true); api.sfx.tick(); }], [300, () => {}]]); };
  const toggleStar = (c: string) => { setFstars((f: string[]) => (f.includes(c) ? f.filter((x) => x !== c) : [...f, c])); api.sfx.tick(); };

  /* ── what the host and the agent read back (toolApi.getState): never a hidden number or digit ── */
  const mask = (r: string) => {
    const v = val[r], L = mnLen(v);
    let s = "";
    for (let k = L - 1; k >= 0; k--) s += cfg.stars.includes(r + k) && !liftedStars.includes(r + k) ? "*" : String(mnDig(v, k));
    return mnCommas(s);
  };
  const hidden = (r: string) => cfg.blank === r && !lifted;
  api.share({
    phase: n,
    minuend: hidden("a") ? null : kind === "star" ? mask("a") : cfg.A,
    subtrahend: hidden("b") ? null : kind === "star" ? mask("b") : cfg.B,
    difference: hidden("d") ? null : kind === "star" ? mask("d") : cfg.D,
    covered: kind === "star" ? cfg.stars.length - liftedStars.length : kind === "name" ? (named[index] ? MN_NAME[named[index]] : null) : cfg.blank ? MN_NAME[cfg.blank] : null,
    found: kind === "star" ? liftedStars.length : lifted,
    columnSettled: kind === "star" ? opened.filter((k) => settled(k)).map((k) => MN_PLACE[k]) : [],
    checked,
  });

  /* ── drawing ── */
  const live = stage === "ask" && !busy;
  const mirrorOk = stage === "ask" && !busy && !wrong && work < 0 && !lifted && !fly && tdig && (kind !== "name" || named[index]);
  const totRow: any = fly || lifted ? { show: "blank" } : snap ? { show: "res", res: snap.res } : mirrorOk ? { show: "mirror", text: tdig } : { show: "blank" };
  const showSign = kind !== "name" || !!named[index] || tags;
  const bayRows = [
    { at: 1, key: P.r1, v: val[P.r1], show: bayIn[1] ? "all" : "slot", cls: bayIn[1] ? "mn-in" : undefined },
    { at: 2, key: P.r2, v: val[P.r2], show: bayIn[2] ? "all" : "slot", cls: bayIn[2] ? "mn-in" : undefined },
    { at: 3, key: P.tot, v: val[P.tot], ...totRow },
  ];
  const starMap = (r: string) => {
    const m: any = {};
    const list = free ? fstars : cfg.stars;
    list.filter((c: string) => c[0] === r).forEach((c: string) => {
      m[Number(c.slice(1))] = { lifted: !free && liftedStars.includes(c), pencil: free ? undefined : pencilOf(c),
        hot: !free && !!partVals && stage === "ask" && !busy && cfg.stars.indexOf(c) === part };
    });
    return m;
  };
  const matRows = ["a", "b", "d"].map((r) => ({
    at: MN_AT[r], key: r, v: val[r], stars: starMap(r),
    show: cfg.blank === r ? (lifted ? "all" : "blank") : "all", cls: cfg.blank === r && lifted ? "mn-in" : undefined,
  }));
  const dragOver = drag.drag && drag.drag.moved && drag.drag.x >= bayG.x - 40;
  const rowMid = (G: any) => (G.colX(G.nc - 1) + G.colX(0) + G.cw) / 2;
  const litCol = kind === "star" && (stage === "ask" || stage === "teach") ? firstOpen() : null;
  const need = [P.r1, P.r2].filter((r) => !bayIn[slotOf(r)]);
  const invite = stage !== "ask" || busy || wrong || tdig ? null
    : (kind === "top" || kind === "mid") && need.length ? { x: matG.sx, y: matG.y + (need[0] === "a" ? matG.r1 : need[0] === "b" ? matG.r2 : matG.r3), r: 32 }
      : kind === "star" && !touched && litCol !== null ? { x: matG.cx(litCol), y: matG.head + matG.headH / 2, r: 26 }
        : kind === "name" && !named[index] && smalls[index] ? (() => { const G = smalls[index].G, at = MN_AT[cfg.blank]; return { x: rowMid(G), y: G.y + (at === 1 ? G.r1 : at === 2 ? G.r2 : G.r3), r: 30 }; })()
          : null;
  const runs = kind === "star" ? { label: "stars covered", v: String(cfg.stars.length - liftedStars.length) }
    : kind === "name" ? { label: "named", v: mnOf(Object.keys(named).length, 3, lang) }
      : free && !cfg.blank ? { label: "stars laid", v: String(fstars.length) }
        : { label: "rows filled", v: mnOf(lifted ? 3 : 2, 3, lang) };

  /* the fly: the result's digits leave the bay's answer row and land in the empty row */
  const flyTarget = () => {
    const G = kind === "name" ? smalls[index].G : matG, at = MN_AT[P.tot];
    return { dx: G.cx(0) - bayG.cx(0), dy: G.y + (at === 1 ? G.r1 : at === 2 ? G.r2 : G.r3) - (bayG.y + bayG.r3) };
  };

  /* the check line: the whole subtraction worked downwards, with a drawn tick */
  const checkLine = (x0: number, y: number) => (
    <g className="mn-in" data-role="reading">
      <path d={mnTick(x0 + 16, y - 12)} fill="none" stroke={CONTENT.one} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <text x={x0 + 46} y={y} fontSize={T.label} fontWeight={700}>
        <tspan fill={MN_INK.a}>{indian(cfg.A)}</tspan><tspan fill={C.ink}>{" − "}</tspan><tspan fill={MN_INK.b}>{indian(cfg.B)}</tspan>
        <tspan fill={C.ink}>{" = "}</tspan><tspan fill={MN_INK.d}>{indian(cfg.D)}</tspan>
      </text>
    </g>
  );

  /* phase 3: the reading strip for column k */
  const cellOf = (r: string, k: number) => {
    const c = r + k;
    if (cfg.stars.includes(c) && !liftedStars.includes(c)) return { t: "star", v: pencilOf(c) };
    return { t: "d", v: String(mnDig(val[r], k)), ink: mnInk(r, val[r], k) };
  };
  const upTerms = (k: number) => {
    const out: any[] = [cellOf("d", k), { t: "op", v: "+" }, cellOf("b", k)], full = solved.includes(k);
    if (k > 0) {
      if (!full && !carryKnown(k)) out.push({ t: "op", v: "+" }, { t: "box" });
      else if (cfg.cin[k]) out.push({ t: "op", v: "+" }, { t: "d", v: "1", ink: MN_INK.verm });
    }
    out.push({ t: "op", v: "=" });
    const s = mnDig(cfg.D, k) + mnDig(cfg.B, k) + cfg.cin[k];
    out.push(full && s >= 10 ? { t: "tot", hi: "1", lo: String(s % 10), loInk: MN_INK.a } : cellOf("a", k));
    return out;
  };
  const downTerms = (k: number) => {
    const ci = cfg.cin[k] || 0, co = cfg.cin[k + 1] || 0, w = mnDig(cfg.A, k) - ci + 10 * co, ink = ci ? MN_INK.rose : MN_INK.a;
    return [w >= 10 ? { t: "tot", hi: "1", lo: String(w - 10), loInk: ink } : { t: "d", v: String(w), ink },
      { t: "op", v: "−" }, cellOf("b", k), { t: "op", v: "=" }, cellOf("d", k)];
  };
  const drawTerms = (terms: any[], x0: number, y: number, key: string) => {
    let x = x0;
    return terms.map((t: any, i: number) => {
      const w = MN_TW[t.t], mid = x + w / 2;
      x += w;
      if (t.t === "star") return <MnStarCard key={key + i} x={mid} y={y - 20} C={C} pencil={t.v} w={56} h={70} fs={T.xl} />;
      if (t.t === "box") return (
        <g key={key + i}>
          <rect x={mid - 22} y={y - 52} width={44} height={62} rx={8} fill="none" stroke={CONTENT.pointer} strokeWidth={3} strokeDasharray="7 6" />
          <text x={mid} y={y - 9} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MN_INK.verm}>?</text>
        </g>
      );
      if (t.t === "tot") return (
        <text key={key + i} x={mid} y={y} textAnchor="middle" fontSize={T.xl} fontWeight={700}><tspan fill={MN_INK.verm}>{t.hi}</tspan><tspan fill={t.loInk}>{t.lo}</tspan></text>
      );
      return <text key={key + i} x={mid} y={y} textAnchor="middle" fontSize={T.xl} fontWeight={t.t === "op" ? 600 : 700} fill={t.t === "op" ? C.ink : t.ink}>{t.v}</text>;
    });
  };
  const SX = 572, SW = W.w - SX;

  /* the mode rail: what can be blank. In phases 1 to 3 it names the phase's own blank (a label, not a control);
     in free play the same three are keys; on the naming phase the gate turns into it once the blank is named */
  const RAIL: any[] = [["a", "on top", 0, 140], ["b", "taken away", 150, 200], ["digits", "digits", 360, 130]];
  const railPill = (key: string, lab: string, x: number, y: number, w: number, h: number, proud: boolean, sign?: string) => (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={RAD.key} fill={proud ? shade(C.accent, 0.22) : "none"} stroke={proud ? shade(C.accent, 0.35) : C.rule} strokeWidth={2} />
      <text x={x + w / 2 - (sign ? 24 : 0)} y={y + h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={proud ? "#FFFFFF" : C.ink}>{tx(lab)}</text>
      {sign && <text x={x + w - 36} y={y + h / 2 + 14} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill="#FFFFFF">{sign}</text>}
    </g>
  );
  const railOf = kind === "top" ? "a" : kind === "mid" ? "b" : kind === "star" ? "digits" : null;
  const rivalText = rival ? `${indian(rival.x)} ${rival.op} ${indian(rival.y)} =${rival.shown > 1 ? " " + indian(rival.v) : ""}` : "";

  return (
    <g>
      <style>{MN_CSS}</style>

      {/* the running count: rows filled, stars still covered, or puzzles named */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(runs.label)}</text>
        <text x={312} y={-44} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{runs.v}</text>
      </g>

      {/* ── phases 1 and 2, free play: the mat and the build bay side by side ── */}
      {(kind === "top" || kind === "mid" || kind === "free") && (
        <g>
          <MnBoard G={matG} C={C} rows={matRows} sign="−" lit={null} tx={tx} />
          {(bayKind || !free) && (
            <MnBoard G={bayG} C={C} rows={bayRows} sign={P.sign} trade={snap && snap.trade} strike={snap && snap.strike} lit={null} hot={dragOver} tx={tx} />
          )}
          {(bayKind || !free) && <text x={bayG.x + bayG.w / 2} y={384} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("build bay")}</text>}
          {checked && checkLine(matG.x + 4, 400)}
          {rival && (
            <g className="mn-in" data-role="reading">
              <text x={bayG.x + 8} y={428} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(rival.label)}</text>
              <text x={bayG.x + 8} y={472} fontSize={T.label} fontWeight={700} fill={C.ink}>{rivalText}</text>
            </g>
          )}
        </g>
      )}

      {/* the rail names the blank of phases 1 to 3 (a label; the phase's topic, so it gives nothing away) */}
      {railOf && !free && <g>{RAIL.map(([m, lab, x, w]: any) => railPill("rail-" + m, lab, x, 448, w, 72, m === railOf))}</g>}

      {/* ── phase 3: the starred mat and the reading strip ── */}
      {kind === "star" && (
        <g>
          <MnBoard G={matG} C={C} rows={matRows} sign="−" lit={litCol}
            trade={Object.keys(carries).reduce((o: any, k: any) => ({ ...o, [k]: [{ s: "1", f: "verm" }] }), {})} tx={tx} />
          <rect x={SX} y={0} width={SW} height={350} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray={open === null ? "10 10" : undefined} />
          {open !== null && (
            <g className="mn-in" data-role="reading" key={"strip" + open}>
              <text x={SX + 26} y={48} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(MN_PLACE[open] + " column")}</text>
              <path d={mnArrow(SX + 40, 164, 112)} fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
              {drawTerms(upTerms(open), SX + 76, 152, "u")}
              {down.includes(open) && (
                <g className="mn-in">
                  <path d={mnArrow(SX + 40, 212, 264)} fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
                  {drawTerms(downTerms(open), SX + 76, 256, "d")}
                </g>
              )}
              {solved.includes(open) && cfg.cin[open + 1] && open + 1 < cfg.nc ? (
                <text x={SX + 26} y={326} fontSize={T.micro} fontWeight={700} fill={MN_INK.verm}>{tx("1 ten goes left")}</text>
              ) : null}
            </g>
          )}
          {checked && checkLine(matG.x + 4, 400)}
        </g>
      )}

      {/* ── phase 4: three puzzles, the gate, the bay ── */}
      {kind === "name" && (
        <g>
          {smalls.map(({ s, G }: any, i: number) => {
            const fillIt = i === index ? lifted : !!filled[i];
            const rows = ["a", "b", "d"].map((r) => ({ at: MN_AT[r], key: r, v: r === "a" ? s.A : r === "b" ? s.B : s.D,
              show: r === s.blank && !fillIt ? "blank" : "all", cls: r === s.blank && fillIt && i === index ? "mn-in" : undefined }));
            const tag = tags || named[i];
            return (
              <g key={"m" + i}>
                <MnBoard G={G} C={C} rows={rows} sign="−" lit={null} hot={i === index && stage !== "idle"} tx={tx} />
                {tag && (
                  <g className="mn-in">
                    <text x={G.x + 16} y={224} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(MN_NAME[s.blank])}</text>
                    <text x={G.x + G.w - 16} y={228} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{s.blank === "a" ? "+" : "−"}</text>
                  </g>
                )}
              </g>
            );
          })}
          {!named[index] ? ["a", "b", "d"].map((r, i) => (
            <Key key={r} id={"name-" + r} label={r === "d" ? "The answer is hiding" : "The number " + MN_NAME[r] + " is hiding"} x={0} y={240 + i * 84} w={300} h={76} C={C}
              disabled={!live} onClick={() => pick(r)}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(MN_NAME[r])}</text>
            </Key>
          )) : (
            <g className="mn-in">
              {["a", "b", "d"].map((r, i) => railPill("named-" + r, MN_NAME[r], 0, 240 + i * 84, 300, 76, named[index] === r, named[index] === r ? (r === "a" ? "+" : "−") : undefined))}
            </g>
          )}
          <MnBoard G={bayG} C={C} rows={bayRows} sign={showSign ? P.sign : null} trade={snap && snap.trade} strike={snap && snap.strike} lit={null} tx={tx} />
          {checked && checkLine(bayG.x + 4, 520)}
          {rival && (
            <g className="mn-in" data-role="reading">
              <rect x={846} y={236} width={240} height={248} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              <text x={866} y={278} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(rival.label)}</text>
              <text x={1066} y={334} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(rival.x)}</text>
              <text x={866} y={382} fontSize={T.label} fontWeight={700} fill={C.ink}>{rival.op}</text>
              <text x={1066} y={382} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(rival.y)}</text>
              <rect x={866} y={398} width={200} height={3} rx={1.5} fill={C.ink} />
              {rival.shown > 1 && <text x={1066} y={448} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(rival.v)}</text>}
            </g>
          )}
        </g>
      )}

      {/* the rows the bay needs are the pieces: drag one into the bay (a tap puts it there) */}
      {(kind === "top" || kind === "mid" || (free && cfg.blank)) && (live || (free && !busy)) && need.map((r) => {
        const y = matG.y + (r === "a" ? matG.r1 : r === "b" ? matG.r2 : matG.r3), x0 = matG.colX(cfg.nc - 1) - 4;
        const nm = r === "d" ? "the answer" : "the number " + MN_NAME[r];
        return (
          <g key={"drag" + r} className="c4-piece" {...control("row-" + r, "Drag " + nm + " into the bay")} {...drag.bind({ row: r })} {...drag.keys({ row: r })}>
            <rect x={x0} y={y - 40} width={cfg.nc * matG.cw + 8} height={80} rx={14} fill="transparent"
              stroke={CONTENT[r === "a" ? "hundred" : r === "b" ? "ten" : "one"]} strokeWidth={3} />
          </g>
        );
      })}

      {/* phase 3: the columns are the controls */}
      {kind === "star" && live && Array.from({ length: cfg.nc }).map((_, k) => (
        <Hit key={"col" + k} id={"col-" + MN_PLACE[k].replace(" ", "-")} label={"Read the " + MN_PLACE[k] + " column"} x={matG.colX(k)} y={6} w={matG.cw} h={338} onPress={() => tapCol(k)} />
      ))}

      {/* the row under the finger */}
      {drag.drag && drag.drag.moved && (() => {
        const r = drag.drag.payload.row, v = val[r], L = mnLen(v), w = L * 64 + 28;
        return (
          <g pointerEvents="none" filter="url(#fLift)">
            <rect x={drag.drag.x - w / 2} y={drag.drag.y - 38} width={w} height={76} rx={16} fill="#FFFFFF" stroke={CONTENT[r === "a" ? "hundred" : r === "b" ? "ten" : "one"]} strokeWidth={4} />
            {Array.from({ length: L }).map((_, i) => (
              <text key={i} x={drag.drag.x - w / 2 + 14 + 32 + i * 64} y={drag.drag.y + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={mnInk(r, v, L - 1 - i)}>{String(mnDig(v, L - 1 - i))}</text>
            ))}
          </g>
        );
      })()}

      {/* the result on its way up */}
      {fly && (() => {
        const tg = flyTarget(), v = val[P.tot];
        return (
          <g className="mn-move" style={{ transform: fly.go ? `translate(${tg.dx}px, ${tg.dy}px)` : "translate(0px, 0px)" } as any} pointerEvents="none">
            {Array.from({ length: mnLen(v) }).map((_, k) => (
              <text key={k} x={bayG.cx(k)} y={bayG.y + bayG.r3 + bayG.base} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={mnInk(P.tot, v, k)}>{String(mnDig(v, k))}</text>
            ))}
          </g>
        );
      })()}

      {/* free play: hide a row or lay stars; work it; a new puzzle */}
      {free && (
        <g>
          {!cfg.blank && ["a", "b", "d"].map((r) => Array.from({ length: mnLen(val[r]) }).map((_, k) => (
            <Hit key={"fs" + r + k} id={"star-" + r + k} label={(fstars.includes(r + k) ? "Lift the star off the " : "Lay a star on the ") + MN_PLACE[k] + " digit"}
              x={matG.colX(k)} y={(r === "a" ? matG.r1 : r === "b" ? matG.r2 : matG.r3) - 38} w={matG.cw} h={76} onPress={() => toggleStar(r + k)} />
          )))}
          {RAIL.map(([m, lab, x, w]: any) => (
            <Key key={m} id={"mode-" + m} label={"Hide " + (m === "digits" ? "single digits" : "the number " + lab)} x={x} y={448} w={w} h={72} C={C} primary={fmode === m} onClick={() => freeMode(m)}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={fmode === m ? "#FFFFFF" : C.ink}>{tx(lab)}</text>
            </Key>
          ))}
          <Key id="work-it" label={tx("Work it in the bay")} x={504} y={448} w={150} h={72} C={C} disabled={!cfg.blank || busy} onClick={freeWork}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Work it")}</text>
          </Key>
          <Key id="check-back" label={tx("Check it back")} x={666} y={448} w={262} h={72} C={C} disabled={!cfg.blank || busy || !lifted || checked} onClick={freeCheck}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={!cfg.blank || busy || !lifted || checked ? mix(C.ink, "#FFFFFF", 0.3) : C.ink}>{tx("Check it back")}</text>
          </Key>
          <Key id="new-puzzle" label={tx("A new puzzle")} x={936} y={448} w={150} h={72} C={C} onClick={freeNew}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("New one")}</text>
          </Key>
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing: the child's last right answer, in its row's colour */
function Thumb({ n, result, C, w, h }: any) {
  const last = result && result.last;
  if (!last) return null;
  const it: any = ((PHASES[(n || 1) - 1] || { items: [] }).items as any[])[last.item] || {};
  let num = "", ink = C.ink, cap = "";
  if (it.kind === "top" || it.kind === "mid" || it.kind === "name") {
    const r = it.kind === "top" ? "a" : it.kind === "mid" ? "b" : it.blank;
    num = indian(it.answer); ink = MN_INK[r];
    cap = r === "a" ? "by adding" : r === "b" ? "taken away" : "the answer";
  } else if (it.kind === "star") {
    const st = it.stars.slice().sort((x: string, y: string) => Number(x.slice(1)) - Number(y.slice(1)));
    const c = st[st.length - 1], r = c[0];
    num = indian(r === "a" ? it.A : r === "b" ? it.B : it.D); ink = MN_INK[r];
    cap = st.length > 1 ? "two stars" : MN_PLACE[Number(c.slice(1))] + " digit";
  } else return null;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{num}</text>
      <text x={w / 2} y={h - 12} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{cap}</text>
    </g>
  );
}

function MissingNumberDetective(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default MissingNumberDetective;
