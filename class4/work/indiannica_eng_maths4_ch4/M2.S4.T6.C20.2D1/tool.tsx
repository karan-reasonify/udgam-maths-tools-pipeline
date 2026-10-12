/* ═══ M2.S4.T6.C20.2D1 · lattice_grid · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "lattice_grid";
const MEDIA_ID = "M2.S4.T6.C20.2D1";
const TOOL_NAME = "Lattice Grid";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Rule the grid first. One square for every pair of digits, and a line across each."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every square held one fact on its own, and then the strips put the places back together.";
/* said when the child opens Free play from the summary page */
const FREE_LINE = "Free play. Tap a digit to change it, compare the columns, and sweep the strips.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English above and below stays what the checks read. NCERT class 4 terms: जाली / જાળી (lattice),
   खाना / ખાનું (cell), तिरछी रेखा / ત્રાંસી રેખા (diagonal), पट्टी / પટ્ટી (strip), हासिल / વદી.
   Digits stay digits: the runtime speaks them in the language in use. A choice's id gets the same
   entry as its label, so the slot shows it in the language in use. A first draft; wants a native
   speaker's read. */
const TR: any = {
  hi: {
    "Lattice Grid": "गुणा की जाली",
    "Rule the grid first. One square for every pair of digits, and a line across each.": "पहले जाली बनाओ। अंकों की हर जोड़ी के लिए एक खाना, और हर खाने में एक तिरछी रेखा।",
    "Every square held one fact on its own, and then the strips put the places back together.": "हर खाने में अपना एक गुणा था, और फिर पट्टियों ने स्थानों को फिर से जोड़ दिया।",
    "Free play. Tap a digit to change it, compare the columns, and sweep the strips.": "मुक्त खेल। अंक बदलने के लिए उस पर टैप करो, स्तंभों से मिलाओ, और पट्टियाँ जोड़ते जाओ।",
    "One cell for every pair of digits": "अंकों की हर जोड़ी के लिए एक खाना",
    "Count the digits in each number. How many squares will the grid need?": "हर संख्या के अंक गिनो। जाली में कितने खाने चाहिए?",
    "Drag the corner to rule the grid, then press enter.": "जाली बनाने के लिए कोना खींचो, फिर एंटर दबाओ।",
    "How many pairs can you make between them?": "उनके बीच कितनी जोड़ियाँ बन सकती हैं?",
    "Pair each digit on top with every digit down the side.": "ऊपर के हर अंक की जोड़ी बगल के हर अंक से बनाओ।",
    "A lattice takes one cell for every pair of digits. A three digit number against a two digit one wants six cells. Every cell carries a diagonal running the same way.": "जाली में अंकों की हर जोड़ी के लिए एक खाना होता है। तीन अंकों और दो अंकों की संख्या के लिए छह खाने चाहिए। हर खाने में एक ही दिशा की तिरछी रेखा होती है।",
    "You learned: a lattice takes one cell for every pair of digits.": "तुमने सीखा: जाली में अंकों की हर जोड़ी के लिए एक खाना होता है।",
    "How many cells does a grid for 74 × 26 need, and what does each one hold?": "74 × 26 की जाली में कितने खाने चाहिए? हर खाने में क्या होता है?",
    "Rule the grid: 74 × 26": "जाली बनाओ: 74 × 26",
    "Does a cell hold a whole number, or one digit from each number?": "क्या एक खाने में पूरी संख्या होती है, या हर संख्या से एक अंक?",
    "A grid is ruled for a three digit number multiplied by a two digit number. How many cells does it have?": "तीन अंकों की संख्या को दो अंकों की संख्या से गुणा करने के लिए जाली बनी है। उसमें कितने खाने हैं?",
    "Rule the grid: 3 digits by 2": "जाली बनाओ: 3 अंक और 2 अंक",
    "Count the tiles along the top, then the tiles down the side.": "ऊपर की टाइलें गिनो, फिर बगल की टाइलें।",
    "Where do the digits of the two numbers go on a grid like this one?": "ऐसी जाली पर दोनों संख्याओं के अंक कहाँ जाते हैं?",
    "Where do the digits go?": "अंक कहाँ जाते हैं?",
    "How can every cell get exactly one pair?": "हर खाने को ठीक एक जोड़ी कैसे मिल सकती है?",
    "The diagonal splits tens from ones": "तिरछी रेखा दहाई को इकाई से अलग करती है",
    "Tens above the line, ones below it. Every square takes two digits, even a small one.": "रेखा के ऊपर दहाई, नीचे इकाई। हर खाने में दो अंक आते हैं, छोटी संख्या में भी।",
    "Type the two digits for the lit square, tens first.": "चमकते खाने के दो अंक लिखो, पहले दहाई।",
    "Which half of the cell is the tens half?": "खाने का कौन सा आधा दहाई का है?",
    "Say the product, then write its tens above the line and its ones below.": "गुणनफल बोलो, फिर उसकी दहाई रेखा के ऊपर और इकाई नीचे लिखो।",
    "The tens digit of a product goes above the diagonal and the ones digit below it. Every cell takes two digits, even when the pair comes to less than ten.": "गुणनफल का दहाई अंक तिरछी रेखा के ऊपर और इकाई अंक नीचे जाता है। हर खाने में दो अंक आते हैं, चाहे जोड़ी दस से कम बनाए।",
    "You learned: tens go above the diagonal and ones below it.": "तुमने सीखा: दहाई तिरछी रेखा के ऊपर और इकाई नीचे जाती है।",
    "Fill the four cells of the grid for 74 × 26.": "74 × 26 की जाली के चारों खाने भरो।",
    "Fill the four cells": "चारों खाने भरो",
    "Check every square: the right product, and two digits in it.": "हर खाना जाँचो: सही गुणनफल, और उसमें दो अंक।",
    "A cell pairs 9 and 3. What goes above its diagonal and what goes below?": "एक खाने में 9 और 3 की जोड़ी है। उसकी तिरछी रेखा के ऊपर क्या जाता है और नीचे क्या?",
    "9 × 3: above, then below?": "9 × 3: ऊपर, फिर नीचे?",
    "Which digit of that product counts the tens?": "उस गुणनफल का कौन सा अंक दहाई गिनता है?",
    "A cell pairs 4 and 2. Which digit sits above the diagonal, and which sits below?": "एक खाने में 4 और 2 की जोड़ी है। कौन सा अंक तिरछी रेखा के ऊपर बैठता है, और कौन सा नीचे?",
    "4 × 2: above, then below?": "4 × 2: ऊपर, फिर नीचे?",
    "How many tens are there in that product?": "उस गुणनफल में कितनी दहाई हैं?",
    "Nothing is carried while you multiply": "गुणा करते समय कुछ भी हासिल नहीं जाता",
    "Compare the grid with the column sum. What did the grid never ask you to do while you were multiplying?": "जाली को स्तंभ वाले सवाल से मिलाओ। गुणा करते समय जाली ने तुमसे क्या कभी नहीं करवाया?",
    "Tap a square to see the same step in the columns.": "स्तंभों में वही कदम देखने के लिए किसी खाने पर टैप करो।",
    "Where do that product's tens go?": "उस गुणनफल की दहाई कहाँ जाती है?",
    "Watch the grid and the columns fill side by side, and look for the rings.": "जाली और स्तंभों को साथ-साथ भरते देखो, और गोले ढूँढो।",
    "Nothing is carried while you multiply through the cells. Each cell is one digit times one digit, with its own half for its tens. The adding that comes after is a separate matter.": "खानों में गुणा करते समय कुछ भी हासिल नहीं जाता। हर खाना एक अंक गुणा एक अंक है, और उसकी दहाई का अपना आधा हिस्सा है। बाद में जोड़ना अलग बात है।",
    "You learned: nothing is carried while you fill the cells.": "तुमने सीखा: खाने भरते समय कुछ भी हासिल नहीं जाता।",
    "While the cells of the grid for 87 × 35 are being filled, how many times do you have to carry?": "87 × 35 की जाली के खाने भरते समय तुम्हें कितनी बार हासिल ले जाना पड़ता है?",
    "Times you carry in the grid?": "जाली में कितनी बार हासिल?",
    "Did any square send a digit to the square beside it?": "क्या किसी खाने ने बगल वाले खाने में कोई अंक भेजा?",
    "Why is nothing carried while you multiply your way through the cells?": "खानों में गुणा करते समय कुछ भी हासिल क्यों नहीं जाता?",
    "Why is nothing carried?": "हासिल क्यों नहीं जाता?",
    "What is the most a single cell's pair can come to?": "एक खाने की जोड़ी ज़्यादा से ज़्यादा कितना बना सकती है?",
    "A child says this method never needs carrying. The claim holds while you are multiplying, so where does it break down?": "एक बच्चा कहता है कि इस तरीके में कभी हासिल नहीं चाहिए। गुणा करते समय यह सही है, तो यह बात कहाँ टूटती है?",
    "Where does it break down?": "यह कहाँ टूटती है?",
    "What is left to do once every cell is full?": "हर खाना भर जाने के बाद क्या करना बाकी है?",
    "The answer is read down the diagonals": "उत्तर तिरछी पट्टियों से पढ़ा जाता है",
    "Start at the bottom right corner. If a strip comes to more than nine, pass one to the strip on its left.": "नीचे दाएँ कोने से शुरू करो। अगर किसी पट्टी का जोड़ नौ से ज़्यादा हो, तो एक को बाईं पट्टी में भेजो।",
    "Add up each strip and type the digit for its square.": "हर पट्टी जोड़ो और उसके खाने का अंक लिखो।",
    "What does a strip do when it comes to more than nine?": "जब किसी पट्टी का जोड़ नौ से ज़्यादा हो, तो वह क्या करती है?",
    "Watch each strip totalled in turn, and the one that travels to the left.": "हर पट्टी का जोड़ बारी-बारी से देखो, और वह एक जो बाईं ओर जाता है।",
    "The strips are swept from the bottom right corner, and each one is one place of the answer. A strip over nine keeps its right hand digit and passes one to its left.": "पट्टियाँ नीचे दाएँ कोने से जोड़ी जाती हैं, और हर एक उत्तर का एक स्थान है। नौ से ज़्यादा वाली पट्टी अपना दायाँ अंक रखती है और एक बाईं ओर भेजती है।",
    "You learned: sweep from the bottom right, and pass one past nine.": "तुमने सीखा: नीचे दाएँ से जोड़ो, और नौ से ज़्यादा हो तो एक आगे भेजो।",
    "Sweep the diagonals of the grid for 74 × 26 and read off the product.": "74 × 26 की पट्टियाँ जोड़ो। गुणनफल पढ़ो।",
    "Sweep 74 × 26 strip by strip": "74 × 26: पट्टियाँ जोड़ो",
    "How many digits can one square of the answer hold?": "उत्तर के एक खाने में कितने अंक आ सकते हैं?",
    "Find 68 × 45 this way, and say which strip passed one to its left.": "इस तरह 68 × 45 निकालो। बताओ, किस पट्टी ने बाईं ओर एक भेजा?",
    "Sweep 68 × 45 strip by strip": "68 × 45: पट्टियाँ जोड़ो",
    "Add every digit in the strip, and the one passed to it.": "पट्टी का हर अंक जोड़ो, और उसमें भेजा गया एक भी।",
    "Find 76 × 54 this way, and say how many strips passed one to the left.": "इस तरह 76 × 54 निकालो। बताओ, कितनी पट्टियों ने बाईं ओर एक भेजा?",
    "Sweep 76 × 54 strip by strip": "76 × 54: पट्टियाँ जोड़ो",
    "Which strips came to more than nine?": "किन पट्टियों का जोड़ नौ से ज़्यादा था?",
    "One digit goes in each half of a square.": "खाने के हर आधे हिस्से में एक अंक जाता है।",
    "Sweep the strips first, from the bottom right corner.": "पहले पट्टियाँ जोड़ो, नीचे दाएँ कोने से।",
    /* the choices (label, and id where it differs) */
    "top and side": "ऊपर और बगल में", "inside the cells": "खानों के अंदर", "inside cells": "खानों के अंदर",
    "both on top": "दोनों ऊपर", "both down the side": "दोनों बगल में", "both at side": "दोनों बगल में",
    "tens get own half": "दहाई का अपना आधा", "own tens half": "दहाई का अपना आधा",
    "numbers are small": "संख्याएँ छोटी हैं", "small numbers": "संख्याएँ छोटी हैं",
    "no tens are made": "कोई दहाई नहीं बनती", "no tens made": "कोई दहाई नहीं बनती",
    "at the strips": "पट्टियों पर", "in the cells": "खानों में", "nowhere": "कहीं नहीं",
    /* the working area's own words */
    "tens": "दहाई", "ones": "इकाई", "O": "इ", "T": "द", "H": "सै", "Th": "ह", "TTh": "द.ह",
    "carries:": "हासिल:", "carries: 0": "हासिल: 0", "swept:": "जोड़ीं:", "passed:": "आगे भेजे:", "none": "कोई नहीं",
    "cell": "खाना", "cells": "खाने", "filled": "भरे",
    "4 cells": "4 खाने", "6 cells": "6 खाने", "strips": "पट्टियाँ", "tens half": "दहाई का आधा", "0 carries": "0 हासिल",
  },
  gu: {
    "Lattice Grid": "ગુણાકારની જાળી",
    "Rule the grid first. One square for every pair of digits, and a line across each.": "પહેલાં જાળી દોરો. અંકોની દરેક જોડી માટે એક ખાનું, અને દરેકમાં એક ત્રાંસી રેખા.",
    "Every square held one fact on its own, and then the strips put the places back together.": "દરેક ખાનામાં પોતાનો એક ગુણાકાર હતો, અને પછી પટ્ટીઓએ સ્થાનોને ફરી જોડી દીધાં.",
    "Free play. Tap a digit to change it, compare the columns, and sweep the strips.": "મુક્ત રમત. અંક બદલવા તેના પર ટૅપ કરો, સ્તંભો સાથે સરખાવો, અને પટ્ટીઓ ઉમેરતા જાઓ.",
    "One cell for every pair of digits": "અંકોની દરેક જોડી માટે એક ખાનું",
    "Count the digits in each number. How many squares will the grid need?": "દરેક સંખ્યાના અંક ગણો. જાળીમાં કેટલાં ખાનાં જોઈશે?",
    "Drag the corner to rule the grid, then press enter.": "જાળી દોરવા ખૂણો ખેંચો, પછી એન્ટર દબાવો.",
    "How many pairs can you make between them?": "તેમની વચ્ચે કેટલી જોડી બની શકે?",
    "Pair each digit on top with every digit down the side.": "ઉપરના દરેક અંકની જોડી બાજુના દરેક અંક સાથે બનાવો.",
    "A lattice takes one cell for every pair of digits. A three digit number against a two digit one wants six cells. Every cell carries a diagonal running the same way.": "જાળીમાં અંકોની દરેક જોડી માટે એક ખાનું હોય છે. ત્રણ અંક અને બે અંકની સંખ્યા માટે છ ખાનાં જોઈએ. દરેક ખાનામાં એક જ દિશાની ત્રાંસી રેખા હોય છે.",
    "You learned: a lattice takes one cell for every pair of digits.": "તમે શીખ્યા: જાળીમાં અંકોની દરેક જોડી માટે એક ખાનું હોય છે.",
    "How many cells does a grid for 74 × 26 need, and what does each one hold?": "74 × 26 ની જાળીમાં કેટલાં ખાનાં જોઈએ? દરેકમાં શું હોય?",
    "Rule the grid: 74 × 26": "જાળી દોરો: 74 × 26",
    "Does a cell hold a whole number, or one digit from each number?": "શું એક ખાનામાં આખી સંખ્યા હોય, કે દરેક સંખ્યામાંથી એક અંક?",
    "A grid is ruled for a three digit number multiplied by a two digit number. How many cells does it have?": "ત્રણ અંકની સંખ્યાને બે અંકની સંખ્યાથી ગુણવા જાળી દોરી છે. તેમાં કેટલાં ખાનાં છે?",
    "Rule the grid: 3 digits by 2": "જાળી દોરો: 3 અંક અને 2 અંક",
    "Count the tiles along the top, then the tiles down the side.": "ઉપરની ટાઇલ ગણો, પછી બાજુની ટાઇલ.",
    "Where do the digits of the two numbers go on a grid like this one?": "આવી જાળી પર બંને સંખ્યાના અંક ક્યાં જાય છે?",
    "Where do the digits go?": "અંક ક્યાં જાય છે?",
    "How can every cell get exactly one pair?": "દરેક ખાનાને બરાબર એક જોડી કેવી રીતે મળે?",
    "The diagonal splits tens from ones": "ત્રાંસી રેખા દશકને એકમથી જુદા પાડે છે",
    "Tens above the line, ones below it. Every square takes two digits, even a small one.": "રેખાની ઉપર દશક, નીચે એકમ. દરેક ખાનામાં બે અંક આવે છે, નાની સંખ્યામાં પણ.",
    "Type the two digits for the lit square, tens first.": "ચમકતા ખાનાના બે અંક લખો, પહેલાં દશક.",
    "Which half of the cell is the tens half?": "ખાનાનો કયો અડધો ભાગ દશકનો છે?",
    "Say the product, then write its tens above the line and its ones below.": "ગુણાકાર બોલો, પછી તેનો દશક રેખાની ઉપર અને એકમ નીચે લખો.",
    "The tens digit of a product goes above the diagonal and the ones digit below it. Every cell takes two digits, even when the pair comes to less than ten.": "ગુણાકારનો દશક અંક ત્રાંસી રેખાની ઉપર અને એકમ અંક નીચે જાય છે. દરેક ખાનામાં બે અંક આવે છે, ભલે જોડી દસથી ઓછું બનાવે.",
    "You learned: tens go above the diagonal and ones below it.": "તમે શીખ્યા: દશક ત્રાંસી રેખાની ઉપર અને એકમ નીચે જાય છે.",
    "Fill the four cells of the grid for 74 × 26.": "74 × 26 ની જાળીનાં ચારેય ખાનાં ભરો.",
    "Fill the four cells": "ચારેય ખાનાં ભરો",
    "Check every square: the right product, and two digits in it.": "દરેક ખાનું તપાસો: સાચો ગુણાકાર, અને તેમાં બે અંક.",
    "A cell pairs 9 and 3. What goes above its diagonal and what goes below?": "એક ખાનામાં 9 અને 3 ની જોડી છે. તેની ત્રાંસી રેખાની ઉપર શું જાય અને નીચે શું?",
    "9 × 3: above, then below?": "9 × 3: ઉપર, પછી નીચે?",
    "Which digit of that product counts the tens?": "તે ગુણાકારનો કયો અંક દશક ગણે છે?",
    "A cell pairs 4 and 2. Which digit sits above the diagonal, and which sits below?": "એક ખાનામાં 4 અને 2 ની જોડી છે. કયો અંક ત્રાંસી રેખાની ઉપર બેસે, અને કયો નીચે?",
    "4 × 2: above, then below?": "4 × 2: ઉપર, પછી નીચે?",
    "How many tens are there in that product?": "તે ગુણાકારમાં કેટલા દશક છે?",
    "Nothing is carried while you multiply": "ગુણાકાર કરતી વખતે કોઈ વદી જતી નથી",
    "Compare the grid with the column sum. What did the grid never ask you to do while you were multiplying?": "જાળીને સ્તંભવાળા દાખલા સાથે સરખાવો. ગુણાકાર કરતી વખતે જાળીએ તમારી પાસે શું ક્યારેય ન કરાવ્યું?",
    "Tap a square to see the same step in the columns.": "સ્તંભોમાં એ જ પગલું જોવા કોઈ ખાના પર ટૅપ કરો.",
    "Where do that product's tens go?": "તે ગુણાકારના દશક ક્યાં જાય છે?",
    "Watch the grid and the columns fill side by side, and look for the rings.": "જાળી અને સ્તંભોને સાથે સાથે ભરાતા જુઓ, અને વર્તુળો શોધો.",
    "Nothing is carried while you multiply through the cells. Each cell is one digit times one digit, with its own half for its tens. The adding that comes after is a separate matter.": "ખાનાંમાં ગુણાકાર કરતી વખતે કોઈ વદી જતી નથી. દરેક ખાનું એક અંક ગુણ્યા એક અંક છે, અને તેના દશક માટે પોતાનો અડધો ભાગ છે. પછીનો સરવાળો જુદી વાત છે.",
    "You learned: nothing is carried while you fill the cells.": "તમે શીખ્યા: ખાનાં ભરતી વખતે કોઈ વદી જતી નથી.",
    "While the cells of the grid for 87 × 35 are being filled, how many times do you have to carry?": "87 × 35 ની જાળીનાં ખાનાં ભરતી વખતે તમારે કેટલી વાર વદી લઈ જવી પડે?",
    "Times you carry in the grid?": "જાળીમાં કેટલી વાર વદી?",
    "Did any square send a digit to the square beside it?": "શું કોઈ ખાનાએ બાજુના ખાનામાં કોઈ અંક મોકલ્યો?",
    "Why is nothing carried while you multiply your way through the cells?": "ખાનાંમાં ગુણાકાર કરતી વખતે કોઈ વદી કેમ જતી નથી?",
    "Why is nothing carried?": "વદી કેમ નથી જતી?",
    "What is the most a single cell's pair can come to?": "એક ખાનાની જોડી વધુમાં વધુ કેટલું બનાવી શકે?",
    "A child says this method never needs carrying. The claim holds while you are multiplying, so where does it break down?": "એક બાળક કહે છે કે આ રીતમાં ક્યારેય વદી જોઈતી નથી. ગુણાકાર કરતી વખતે તે સાચું છે, તો આ વાત ક્યાં તૂટે છે?",
    "Where does it break down?": "તે ક્યાં તૂટે છે?",
    "What is left to do once every cell is full?": "દરેક ખાનું ભરાઈ જાય પછી શું કરવાનું બાકી છે?",
    "The answer is read down the diagonals": "જવાબ ત્રાંસી પટ્ટીઓમાંથી વંચાય છે",
    "Start at the bottom right corner. If a strip comes to more than nine, pass one to the strip on its left.": "નીચેના જમણા ખૂણેથી શરૂ કરો. જો કોઈ પટ્ટીનો સરવાળો નવથી વધુ હોય, તો એક ડાબી પટ્ટીમાં મોકલો.",
    "Add up each strip and type the digit for its square.": "દરેક પટ્ટી ઉમેરો અને તેના ખાનાનો અંક લખો.",
    "What does a strip do when it comes to more than nine?": "જ્યારે કોઈ પટ્ટીનો સરવાળો નવથી વધુ હોય, ત્યારે તે શું કરે છે?",
    "Watch each strip totalled in turn, and the one that travels to the left.": "દરેક પટ્ટીનો સરવાળો વારાફરતી જુઓ, અને જે એક ડાબી બાજુ જાય છે તે.",
    "The strips are swept from the bottom right corner, and each one is one place of the answer. A strip over nine keeps its right hand digit and passes one to its left.": "પટ્ટીઓ નીચેના જમણા ખૂણેથી ઉમેરાય છે, અને દરેક જવાબનું એક સ્થાન છે. નવથી વધુવાળી પટ્ટી પોતાનો જમણો અંક રાખે છે અને એક ડાબી બાજુ મોકલે છે.",
    "You learned: sweep from the bottom right, and pass one past nine.": "તમે શીખ્યા: નીચે જમણેથી ઉમેરો, અને નવથી વધુ હોય તો એક આગળ મોકલો.",
    "Sweep the diagonals of the grid for 74 × 26 and read off the product.": "74 × 26 ની પટ્ટીઓ ઉમેરો. ગુણાકાર વાંચો.",
    "Sweep 74 × 26 strip by strip": "74 × 26 પટ્ટી દર પટ્ટી ઉમેરો",
    "How many digits can one square of the answer hold?": "જવાબના એક ખાનામાં કેટલા અંક આવી શકે?",
    "Find 68 × 45 this way, and say which strip passed one to its left.": "આ રીતે 68 × 45 શોધો. કહો, કઈ પટ્ટીએ ડાબી બાજુ એક મોકલ્યો?",
    "Sweep 68 × 45 strip by strip": "68 × 45 પટ્ટી દર પટ્ટી ઉમેરો",
    "Add every digit in the strip, and the one passed to it.": "પટ્ટીનો દરેક અંક ઉમેરો, અને તેમાં મોકલેલો એક પણ.",
    "Find 76 × 54 this way, and say how many strips passed one to the left.": "આ રીતે 76 × 54 શોધો. કહો, કેટલી પટ્ટીઓએ ડાબી બાજુ એક મોકલ્યો?",
    "Sweep 76 × 54 strip by strip": "76 × 54 પટ્ટી દર પટ્ટી ઉમેરો",
    "Which strips came to more than nine?": "કઈ પટ્ટીઓનો સરવાળો નવથી વધુ હતો?",
    "One digit goes in each half of a square.": "ખાનાના દરેક અડધા ભાગમાં એક અંક જાય છે.",
    "Sweep the strips first, from the bottom right corner.": "પહેલાં પટ્ટીઓ ઉમેરો, નીચેના જમણા ખૂણેથી.",
    /* the choices (label, and id where it differs) */
    "top and side": "ઉપર અને બાજુમાં", "inside the cells": "ખાનાંની અંદર", "inside cells": "ખાનાંની અંદર",
    "both on top": "બંને ઉપર", "both down the side": "બંને બાજુમાં", "both at side": "બંને બાજુમાં",
    "tens get own half": "દશકનો પોતાનો અડધો", "own tens half": "દશકનો પોતાનો અડધો",
    "numbers are small": "સંખ્યાઓ નાની છે", "small numbers": "સંખ્યાઓ નાની છે",
    "no tens are made": "કોઈ દશક બનતો નથી", "no tens made": "કોઈ દશક બનતો નથી",
    "at the strips": "પટ્ટીઓ પર", "in the cells": "ખાનાંમાં", "nowhere": "ક્યાંય નહીં",
    /* the working area's own words */
    "tens": "દશક", "ones": "એકમ", "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દ.હ",
    "carries:": "વદી:", "carries: 0": "વદી: 0", "swept:": "ઉમેરી:", "passed:": "મોકલ્યા:", "none": "કોઈ નહીં",
    "cell": "ખાનું", "cells": "ખાનાં", "filled": "ભર્યાં",
    "4 cells": "4 ખાનાં", "6 cells": "6 ખાનાં", "strips": "પટ્ટીઓ", "tens half": "દશકનો અડધો", "0 carries": "0 વદી",
  },
};

/* ── this tool's own constants and maths (all named lg…, since tools and the runtime share one scope) ── */
const LG_P = 116;                                  /* the pitch of a cell */
const LG_RAIL = 76;                                /* the depth of the answer rail */
const LG_GREY = "#767676";                         /* a zero holding a place open */
const LG_BLUE = shade(CONTENT.hundred, 0.25);      /* the number along the top */
const LG_AMBER = shade(CONTENT.ten, 0.32);         /* the number down the side */
const LG_GREEN = shade(CONTENT.one, 0.3);          /* the product */
const LG_VERM = shade(CONTENT.pointer, 0.22);      /* a carry, a pass to the left */
const LG_ROSE = shade(CONTENT.bead, 0.35);         /* a partial product row */
const LG_PLACE = ["O", "T", "H", "Th", "TTh"];
const LG_BOARDS = ["rule", "fill", "sweep"];        /* answers made on the working area */

const LG_WHERE = [
  { id: "top and side", label: "top and side" }, { id: "inside cells", label: "inside the cells" },
  { id: "both on top", label: "both on top" }, { id: "both at side", label: "both down the side" },
];
const LG_WHY = [
  { id: "own tens half", label: "tens get own half" }, { id: "small numbers", label: "numbers are small" },
  { id: "no tens made", label: "no tens are made" },
];
const LG_BREAK = [
  { id: "at the strips", label: "at the strips" }, { id: "in the cells", label: "in the cells" }, { id: "nowhere", label: "nowhere" },
];

/* a cell's two digits: tens above the diagonal, ones below ("08" for 4 × 2) */
const lgFact = (a: number, b: number) => { const q = a * b; return String(Math.floor(q / 10)) + String(q % 10); };
const lgNum = (s: string) => /^\d+$/.test(String(s));
/* every cell of a lattice, row by row (the top number across, the side number down) */
const lgCells = (top: string, side: string) => {
  const out: string[] = [];
  if (!lgNum(top) || !lgNum(side)) return out;
  for (let j = 0; j < side.length; j++) for (let i = 0; i < top.length; i++) out.push(lgFact(+top[i], +side[j]));
  return out;
};
/* strip k: the ones half of every cell whose place is k and the tens half of every cell whose place is
   k - 1; cell (i, j) of an A by B lattice has place (A-1-i)+(B-1-j). Strip 0 is the bottom right corner. */
const lgStrips = (top: string, side: string) => {
  const A = top.length, B = side.length;
  const out = Array.from({ length: A + B }, () => ({ parts: [] as any[], sum: 0 }));
  if (!lgNum(top) || !lgNum(side)) return out;
  for (let j = 0; j < B; j++) for (let i = 0; i < A; i++) {
    const q = +top[i] * +side[j], k = (A - 1 - i) + (B - 1 - j);
    out[k].parts.push({ i, j, h: "o", d: q % 10 });
    out[k + 1].parts.push({ i, j, h: "t", d: Math.floor(q / 10) });
  }
  out.forEach((s) => { s.sum = s.parts.reduce((a: number, x: any) => a + x.d, 0); });
  return out;
};
/* the sweep from the bottom right: a strip's total is its digits and what was passed to it; it keeps
   its right hand digit and passes the rest to the strip on its left (the last strip keeps it all) */
const lgSweep = (strips: any[]) => {
  let pass = 0;
  return strips.map((s: any, k: number) => {
    const total = s.sum + pass, last = k === strips.length - 1;
    const row = { k, pin: pass, total, digit: last ? String(total) : String(total % 10), pout: last ? 0 : Math.floor(total / 10) };
    pass = row.pout;
    return row;
  });
};
/* what the rail reads, from the top left strip down to the bottom right */
const lgRailNum = (rail: string[]) => Number(rail.slice().reverse().join("") || "0");
/* the same product set out in columns, the book's method (2 digits by 2): each row with its carries */
const lgColumns = (top: string, side: string) => {
  const t1 = +top[0], t0 = +top[1], s1 = +side[0], s0 = +side[1];
  const a1 = t0 * s0, c1 = Math.floor(a1 / 10), b1 = t1 * s0 + c1;
  const a2 = t0 * s1, c2 = Math.floor(a2 / 10), b2 = t1 * s1 + c2;
  const r1: any = { 0: a1 % 10, 1: b1 % 10 };
  if (b1 >= 10) r1[2] = Math.floor(b1 / 10);
  const r2: any = { 0: 0, 1: a2 % 10, 2: b2 % 10 };
  if (b2 >= 10) r2[3] = Math.floor(b2 / 10);
  const pd = String(+top * +side), pr: any = {};
  for (let q = 0; q < pd.length; q++) pr[q] = +pd[pd.length - 1 - q];
  return { r1, r2, pr, c1, c2, rings: (c1 > 0 ? 1 : 0) + (c2 > 0 ? 1 : 0), m1: s0, m2: s1 * 10 };
};
/* a tapped cell of a 2 by 2 grid and the step it is in the columns: the digits it multiplies, the
   digits that step writes, and the carry ring it makes or uses (rings stand at places 1 and 2) */
const LG_LINKS: any = {
  3: { m: [0], x: [0], r1: [0], ring: [1] },
  2: { m: [1], x: [0], r1: [1, 2], ring: [1] },
  1: { m: [0], x: [1], r2: [0, 1], ring: [2] },
  0: { m: [1], x: [1], r2: [2, 3], ring: [2] },
};
const lgIJ = (idx: number, A: number) => ({ i: idx % A, j: Math.floor(idx / A) });
const lgSnap = (d: number, max: number) => Math.min(max, Math.max(1, Math.round(d / LG_P)));
const lgCount = (v: number) => (v === 0 ? "none" : words(v));

/* One entry per phase = one mount. */
const PHASES = [
  {
    n: 1,
    concept: "One cell for every pair of digits",
    conceptId: "M2.S4.T6.C20", objectiveIds: ["O9"],
    says: ["Count the digits in each number. How many squares will the grid need?", "Drag the corner to rule the grid, then press enter."],
    ladder: ["How many pairs can you make between them?", "Pair each digit on top with every digit down the side."],
    closing: "A lattice takes one cell for every pair of digits. A three digit number against a two digit one wants six cells. Every cell carries a diagonal running the same way.",
    learned: "You learned: a lattice takes one cell for every pair of digits.",
    traceback: "Each digit pairs with every digit of the other in a numbered list beside the grid, and the right grid is drawn in dashes over the child's, one cell a pair.",
    items: [
      { qid: "M2.S4.T6.C20:ML1", kind: "rule", top: "74", side: "26", pad: "enter", winMs: 2600,
        say: "How many cells does a grid for 74 × 26 need, and what does each one hold?", ask: "Rule the grid: 74 × 26",
        answer: "2 × 2", miss: "Does a cell hold a whole number, or one digit from each number?" },
      /* the plan's question names no digits, so the numbers are blank digit tiles: three across, two down */
      { qid: "M2.S4.T6.C20:1", kind: "rule", top: "???", side: "??", blank: true, pad: "enter", winMs: 3200,
        say: "A grid is ruled for a three digit number multiplied by a two digit number. How many cells does it have?",
        ask: "Rule the grid: 3 digits by 2", answer: "3 × 2", miss: "Count the tiles along the top, then the tiles down the side." },
      { qid: "M2.S4.T6.C20:2", kind: "place", top: "74", side: "26", winMs: 2600, choices: LG_WHERE,
        say: "Where do the digits of the two numbers go on a grid like this one?", ask: "Where do the digits go?",
        answer: "top and side", miss: "How can every cell get exactly one pair?" },
    ],
  },
  {
    n: 2,
    concept: "The diagonal splits tens from ones",
    conceptId: "M2.S4.T6.C21", objectiveIds: ["O9"],
    says: ["Tens above the line, ones below it. Every square takes two digits, even a small one.", "Type the two digits for the lit square, tens first."],
    ladder: ["Which half of the cell is the tens half?", "Say the product, then write its tens above the line and its ones below."],
    closing: "The tens digit of a product goes above the diagonal and the ones digit below it. Every cell takes two digits, even when the pair comes to less than ten.",
    learned: "You learned: tens go above the diagonal and ones below it.",
    traceback: "The cell is opened large with its halves named tens and ones, the fact is written beside it, and the product goes into the halves one digit at a time.",
    items: [
      { qid: "M2.S4.T6.C21:ML2", kind: "fill", top: "74", side: "26", winMs: 2000,
        say: "Fill the four cells of the grid for 74 × 26.", ask: "Fill the four cells",
        answer: "14 08 42 24", miss: "Check every square: the right product, and two digits in it." },
      { qid: "M2.S4.T6.C21:3", kind: "cell", top: "9", side: "3", winMs: 1800,
        say: "A cell pairs 9 and 3. What goes above its diagonal and what goes below?", ask: "9 × 3: above, then below?",
        answer: "27", miss: "Which digit of that product counts the tens?" },
      { qid: "M2.S4.T6.C21:4", kind: "cell", top: "4", side: "2", winMs: 1800,
        say: "A cell pairs 4 and 2. Which digit sits above the diagonal, and which sits below?", ask: "4 × 2: above, then below?",
        answer: "08", miss: "How many tens are there in that product?" },
    ],
  },
  {
    n: 3,
    concept: "Nothing is carried while you multiply",
    conceptId: "M2.S4.T6.C22", objectiveIds: ["O9"],
    says: ["Compare the grid with the column sum. What did the grid never ask you to do while you were multiplying?", "Tap a square to see the same step in the columns."],
    ladder: ["Where do that product's tens go?", "Watch the grid and the columns fill side by side, and look for the rings."],
    closing: "Nothing is carried while you multiply through the cells. Each cell is one digit times one digit, with its own half for its tens. The adding that comes after is a separate matter.",
    learned: "You learned: nothing is carried while you fill the cells.",
    traceback: "The grid and the column working fill side by side at the same pace: the rings arrive in the columns and never in the grid.",
    items: [
      { qid: "M2.S4.T6.C22:ML3", kind: "carries", top: "87", side: "35", winMs: 1800,
        say: "While the cells of the grid for 87 × 35 are being filled, how many times do you have to carry?", ask: "Times you carry in the grid?",
        answer: 0, miss: "Did any square send a digit to the square beside it?" },
      { qid: "M2.S4.T6.C22:5", kind: "why", top: "87", side: "35", winMs: 3400, choices: LG_WHY,
        say: "Why is nothing carried while you multiply your way through the cells?", ask: "Why is nothing carried?",
        answer: "own tens half", miss: "What is the most a single cell's pair can come to?" },
      { qid: "M2.S4.T6.C22:6", kind: "where", top: "87", side: "35", winMs: 5600, choices: LG_BREAK,
        say: "A child says this method never needs carrying. The claim holds while you are multiplying, so where does it break down?", ask: "Where does it break down?",
        answer: "at the strips", miss: "What is left to do once every cell is full?" },
    ],
  },
  {
    n: 4,
    concept: "The answer is read down the diagonals",
    conceptId: "M2.S4.T6.C23", objectiveIds: ["O10"],
    says: ["Start at the bottom right corner. If a strip comes to more than nine, pass one to the strip on its left.", "Add up each strip and type the digit for its square."],
    ladder: ["What does a strip do when it comes to more than nine?", "Watch each strip totalled in turn, and the one that travels to the left."],
    closing: "The strips are swept from the bottom right corner, and each one is one place of the answer. A strip over nine keeps its right hand digit and passes one to its left.",
    learned: "You learned: sweep from the bottom right, and pass one past nine.",
    traceback: "The strips are swept again from the bottom right: each total is printed in its square, a total past nine keeps its right hand digit and sends its one to the strip on the left, and the product is read off the edge.",
    items: [
      { qid: "M2.S4.T6.C23:ML4", kind: "sweep", top: "74", side: "26", winMs: 4200,
        say: "Sweep the diagonals of the grid for 74 × 26 and read off the product.", ask: "Sweep 74 × 26 strip by strip",
        answer: 1924, miss: "How many digits can one square of the answer hold?" },
      { qid: "M2.S4.T6.C23:7", kind: "sweep", top: "68", side: "45", winMs: 4200,
        say: "Find 68 × 45 this way, and say which strip passed one to its left.", ask: "Sweep 68 × 45 strip by strip",
        answer: 3060, miss: "Add every digit in the strip, and the one passed to it." },
      { qid: "M2.S4.T6.C23:8", kind: "sweep", top: "76", side: "54", winMs: 4200,
        say: "Find 76 × 54 this way, and say how many strips passed one to the left.", ask: "Sweep 76 × 54 strip by strip",
        answer: 4104, miss: "Which strips came to more than nine?" },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL = {
  pitch: LG_P, railDepth: LG_RAIL, places: LG_PLACE,
  method: "one cell for each pair of digits; tens above the diagonal, ones below; strips added from the bottom right, a strip over nine keeps its right hand digit and passes one to its left",
  colours: { top: "deep blue", side: "amber", product: "green", carry: "vermilion", partialRow: "rose", zeroHoldingAPlace: "grey" },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a ruled grid is judged by its size, a cell by both its digits (08, never a bare 8), a grid by
   every cell, a product as a number */
const judge = (item: any, v: any) => {
  const s = String(v ?? "").trim();
  if (item.kind === "rule") { const m = /^(\d+)\s*[×x]\s*(\d+)$/.exec(s); return !!m && `${+m[1]} × ${+m[2]}` === item.answer; }
  if (item.kind === "fill") return s.split(/\s+/).join(" ") === item.answer;
  if (item.kind === "cell") return s === item.answer;
  if (typeof item.answer === "number") return /^[\d,]+$/.test(s) && leadNumber(s) === item.answer;
  return s.toLowerCase() === String(item.answer).toLowerCase();
};
/* oracle: every answer again by a second route (digit counts, repeated addition, the plain product),
   sharing no code with judge or the picture */
const oracle = () => PHASES.every((ph: any) => ph.items.every((it: any) => {
  const times = (a: number, b: number) => { let s = 0; for (let q = 0; q < b; q++) s += a; return s; };
  const two = (v: number) => (v < 10 ? "0" : "") + String(v);
  if (it.kind === "rule") return it.answer === `${String(it.top).length} × ${String(it.side).length}`;
  if (it.kind === "place" || it.kind === "why" || it.kind === "where") {
    const want = it.kind === "place" ? "top and side" : it.kind === "why" ? "own tens half" : "at the strips";
    return it.answer === want && it.choices.filter((c: any) => c.id === want).length === 1;
  }
  if (it.kind === "fill") {
    const out: string[] = [];
    for (const b of String(it.side)) for (const a of String(it.top)) out.push(two(times(+a, +b)));
    return it.answer === out.join(" ");
  }
  if (it.kind === "cell") return it.answer === two(times(+it.top, +it.side));
  if (it.kind === "carries") {
    let most = 0;
    for (const b of String(it.side)) for (const a of String(it.top)) most = Math.max(most, times(+a, +b));
    return most < 100 && it.answer === 0; /* a cell never holds more than two digits, so nothing leaves it */
  }
  if (it.kind === "sweep") return it.answer === Number(it.top) * Number(it.side);
  return false;
}));
/* the misconception each item is there to break; judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "rule") return "1 × 2";                  /* one cell for each of the two numbers */
  if (item.kind === "place") return "inside cells";
  if (item.kind === "fill") {
    const r = lgCells(item.top, item.side), bare = r.map((c) => (c[0] === "0" ? c[1] : c));
    return bare.join(" ") !== r.join(" ") ? bare.join(" ") : r.map((c) => c[1] + c[0]).join(" ");
  }
  if (item.kind === "cell") { const c = String(item.answer); return c[0] === "0" ? c[1] : c[1] + c[0]; }
  if (item.kind === "carries") return lgColumns(item.top, item.side).rings || 1; /* the columns' carries */
  if (item.kind === "why") return "small numbers";
  if (item.kind === "where") return "nowhere";
  if (item.kind === "sweep") return Number(lgStrips(item.top, item.side).map((s: any) => String(s.sum)).reverse().join("")); /* a whole total in one square */
  return typeof item.answer === "number" ? item.answer + 1 : "~";
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  const a = item.answer;
  if (item.kind === "rule") { const m = /(\d+) × (\d+)/.exec(a) || [0, 0, 0]; const c = +m[1] * +m[2]; return [a, String(c), words(c)]; }
  if (item.choices) return [a, (item.choices.find((c: any) => c.id === a) || {}).label].filter(Boolean);
  if (item.kind === "fill") return [a, ...String(a).split(" ")];
  if (item.kind === "cell") return [a, String(+a), words(+a)];
  return [String(a), indian(a), words(a)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (LG_BOARDS.includes(item.kind) && HOOK.set) { HOOK.set(item.answer); return HOOK.check && HOOK.check(); }
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (LG_BOARDS.includes(item.kind) && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: a finished board is given; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */

/* where a lattice sits: its top left corner and its pitch */
const lgGeo = (kind: string) =>
  kind === "rule" || kind === "place" ? { gx: 150, gy: 130, p: LG_P }
    : kind === "cell" ? { gx: 197, gy: 150, p: 2 * LG_P }
      : { gx: 197, gy: 150, p: LG_P };

/* a fresh board for an item: what stands on the working area before anything is touched */
function lgBoard(it: any) {
  const kind = it.kind || "free";
  const top = String(it.top || "87"), side = String(it.side || "35");
  const S = top.length + side.length;
  const right = lgCells(top, side);
  const b: any = {
    kind, top, side, blank: !!it.blank, A: top.length, B: side.length, placed: true, cells: right.map(() => ""),
    lit: -1, hl: -1, zoom: null, ghost: null, list: 0, pstep: 0, pprod: false, cur: -1, rail: Array(S).fill(""),
    pin: Array(S).fill(0), lits: [], fly: null, total: null, tally: false, label: null, names: false, fact: false,
    done: false, readAt: -1, readCell: -1, touched: false, pairLit: null, swept: false,
  };
  if (kind === "rule") return { ...b, A: 0, B: 0, placed: false };
  if (kind === "place") return { ...b, placed: false };
  if (kind === "fill") return { ...b, lit: 0 };
  if (kind === "cell") return b;
  if (kind === "sweep") return { ...b, cells: right, names: true };
  return { ...b, cells: right, pstep: 4, pprod: true }; /* carries, why, where and free play: the grid stands full */
}

const LG_CSS = `
.lg-move{transition:transform 520ms cubic-bezier(.3,.7,.25,1)}
.lg-pop{transform-box:fill-box;transform-origin:center;animation:lgPop 360ms ease-out both}
@keyframes lgPop{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:none}}
.lg-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.lg-move{transition:none}.lg-pop{animation:none}}
`;

function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  HOOK.tx = tx;   /* the slot (a picked choice) and the summary's Thumb draw their words in the language in use */
  const count = (v: number) => (v === 0 ? tx("none") : wordsIn(v, lang));   /* lgCount, in the language in use */
  const tl = useTimeline();
  const free = stage === "free";
  const [bd, setBd] = useState<any>(() => lgBoard(item));
  const bdRef = useRef<any>(bd);
  const put = (patch: any) => {
    const cur = bdRef.current;
    const nb = { ...cur, ...(typeof patch === "function" ? patch(cur) : patch) };
    bdRef.current = nb;
    setBd(nb);
  };
  const setFor = useRef<number>(index);
  const busy = tl.busy;

  /* each question opens on its own board; free play on the free board */
  useEffect(() => {
    if (free) return;
    if ((stage === "ask" || stage === "teach") && setFor.current !== index) {
      setFor.current = index; tl.stop(); put(lgBoard(item)); api.lock(false);
    }
  }, [stage, index]);
  useEffect(() => {
    if (!free) return;
    setFor.current = -2; tl.stop(); put(lgBoard({ kind: "free", top: "87", side: "35" }));
  }, [free]);

  const K = bd.kind, top: string = bd.top, side: string = bd.side;
  const nA = top.length, nB = side.length, S = nA + nB;
  const { gx, gy, p } = lgGeo(K);
  const right = useMemo(() => lgCells(top, side), [top, side]);
  const strips = useMemo(() => lgStrips(top, side), [top, side]);
  const rows = useMemo(() => lgSweep(strips), [strips]);
  const cols = useMemo(() => (nA === 2 && nB === 2 && lgNum(top + side) ? lgColumns(top, side) : null), [top, side]);
  const railSq = (k: number) => (k < nA
    ? { x: gx + (nA - 1 - k) * p, y: gy + nB * p, w: p, h: LG_RAIL, b: true }
    : { x: gx - LG_RAIL, y: gy + (nB - 1 - (k - nA)) * p, w: LG_RAIL, h: p, b: false });

  /* ── the ruler (phase 1): drag the corner, or the arrow keys on it ── */
  const liveRule = K === "rule" && stage === "ask" && !busy;
  const drag = useDrag((pay: any, pt: any, moved: boolean) => {
    const b = bdRef.current;
    if (!pay || pay.src !== "knob" || b.kind !== "rule" || !moved || !isFinite(pt.x)) return;
    const a = lgSnap(pt.x - gx, 4), c = lgSnap(pt.y - gy, 3);
    api.sfx.tick();
    put({ A: a, B: c, touched: true });
  });
  const knobKeys = (e: any) => {
    const step: any = ({ ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] } as any)[e.key];
    if (!step) return; /* Enter goes on to the page: it gives the grid */
    e.preventDefault(); e.stopPropagation();
    const b = bdRef.current;
    if (b.kind !== "rule" || tl.busy) return;
    const a = b.A === 0 ? 1 : Math.min(4, Math.max(1, b.A + step[0])), c = b.B === 0 ? 1 : Math.min(3, Math.max(1, b.B + step[1]));
    api.sfx.tick();
    put({ A: a, B: c, touched: true });
  };

  /* ── writing: a cell (phase 2) and a strip's square (phase 4) take what the child typed ── */
  const tooLong = () => api.say("One digit goes in each half of a square.");
  const fillEnter = (v: any) => {
    const b = bdRef.current, s = String(v ?? "").replace(/\D/g, "");
    if (b.cells.every((c: string) => c !== "")) { api.submit(b.cells.join(" ")); return; } /* a full grid is given */
    if (!s) return;
    if (s.length > 2) { tooLong(); return; }
    const at = b.lit >= 0 ? b.lit : b.cells.findIndex((c: string) => c === "");
    const cells = b.cells.slice();
    cells[at] = s;
    let nx = -1;
    for (let q = 1; q <= cells.length; q++) { const c = (at + q) % cells.length; if (cells[c] === "") { nx = c; break; } }
    api.sfx.tick();
    put({ cells, lit: nx, touched: true, zoom: null });
    if (nx < 0) api.submit(cells.join(" ")); else api.setTyped("");
  };
  const cellEnter = (v: any) => {
    const s = String(v ?? "").replace(/\D/g, "");
    if (!s) return;
    if (s.length > 2) { tooLong(); return; }
    api.sfx.tick();
    put({ cells: [s], touched: true, fact: false });
    api.submit(s);
  };
  const sweepEnter = (v: any) => {
    const b = bdRef.current, s = String(v ?? "").replace(/\D/g, "");
    if (b.rail.every((r: string) => r !== "")) { api.submit(lgRailNum(b.rail)); return; } /* a full rail is given */
    if (!s) return;
    if (s.length > 2) { api.setTyped(""); api.say("Sweep the strips first, from the bottom right corner."); return; } /* the sweep is the question */
    const k = Math.max(0, b.rail.findIndex((r: string) => r === ""));
    const total = strips[k].sum + b.pin[k], last = k === S - 1;
    /* the child kept the right hand digit of a total past nine: the rest travels to the next strip */
    const pass = !last && total > 9 && s === String(total % 10) ? Math.floor(total / 10) : 0;
    const rail = b.rail.slice();
    rail[k] = s;
    api.sfx.tick();
    if (!pass) {
      put({ rail, cur: last ? -1 : k + 1, touched: true, swept: true });
      if (last) { api.lock(true); tl.run([[300, () => {}]], () => { api.lock(false); api.submit(lgRailNum(rail)); }); }
      else api.setTyped("");
      return;
    }
    const a = railSq(k), z = railSq(k + 1);
    api.lock(true); api.setTyped("");
    tl.run([
      [40, () => put({ rail, cur: k, touched: true, swept: true, fly: { x: a.x + 20, y: a.y + 32, t: String(pass) } })],
      [560, () => put({ fly: { x: z.x + 12, y: z.y + 32, t: String(pass) } })],
      [20, () => { const pin = bdRef.current.pin.slice(); pin[k + 1] = pass; put({ fly: null, pin, cur: k + 1 }); api.sfx.tick(); }],
    ], () => api.lock(false));
  };

  const tapCell = (idx: number) => {
    const b = bdRef.current;
    api.sfx.tick();
    if (b.kind === "fill") { if (idx !== b.lit) api.setTyped(""); put({ lit: idx, touched: true }); return; }
    put({ hl: b.hl === idx ? -1 : idx, touched: true });
  };
  const startSweep = () => { const b = bdRef.current; if (b.cur >= 0 || b.rail.some((r: string) => r)) return; api.sfx.tick(); put({ cur: 0, touched: true }); };

  /* ── motions: each is the mathematics moving, in steps ── */
  /* the digits take their places along the top and down the side, and every cell lights its pair */
  const placeSteps = () => {
    const L: any[] = [[60, () => put({ placed: true, ghost: null, list: 0, label: null })], [650, () => {}]];
    for (let j = 0; j < nB; j++) for (let i = 0; i < nA; i++) { const idx = j * nA + i; L.push([300, () => put({ hl: idx, pairLit: { i, j } })]); }
    L.push([300, () => put({ hl: -1, pairLit: null, label: K === "place" ? "top and side" : null })]);
    return L;
  };
  /* each digit pairs with every digit of the other, into a numbered list; the right grid in dashes */
  const ruleTrace = () => {
    const L: any[] = [[60, () => put({ list: 0, ghost: null, pairLit: null, placed: false })], [300, () => {}]];
    for (let j = 0; j < nB; j++) for (let i = 0; i < nA; i++) {
      const k = j * nA + i;
      L.push([560, () => { put({ list: k + 1, pairLit: { i, j } }); api.sfx.tick(); }]);
    }
    L.push([500, () => put({ pairLit: null, ghost: { A: nA, B: nB }, placed: true })]);
    L.push([300, () => {}]);
    return L;
  };
  /* one cell opened: the child's digits as written, the halves named, the fact, then the right digits */
  const fixSteps = (child: string, want: string, write: (c: string) => void, flag: (f: any) => void) => {
    const s = String(child ?? "").replace(/\D/g, "").slice(0, 2);
    const L: any[] = [[60, () => { write(s); flag({ names: false, fact: false }); }], [650, () => flag({ names: true })], [650, () => flag({ fact: true })]];
    if (s.length === 1 && Number(s) === Number(want)) {
      L.push([650, () => { write("_" + s); api.sfx.tick(); }]);   /* the digit drops into the ones half */
      L.push([550, () => { write(want); api.sfx.tick(); }]);      /* and the tens half takes a grey zero */
    } else if (s.length === 2 && s[1] + s[0] === want) {
      L.push([700, () => { write(want); api.sfx.tick(); }]);      /* each digit turns into its own half */
    } else {
      L.push([500, () => write("__")]);
      L.push([450, () => { write(want[0] + "_"); api.sfx.tick(); }]);
      L.push([450, () => { write(want); api.sfx.tick(); }]);
    }
    L.push([350, () => {}]);
    return L;
  };
  const fillTrace = (value: any) => {
    const b = bdRef.current;
    const g = String(value ?? "").trim().split(/\s+/);
    const mine = g.length === b.cells.length ? g : b.cells.map((c: string, q: number) => (q === b.lit ? String(value ?? "") : c));
    const L: any[] = [[60, () => put({ cells: mine.slice(), zoom: null })], [250, () => {}]];
    mine.forEach((c: string, q: number) => {
      if (c === right[q]) return;
      L.push([60, () => put({ zoom: { idx: q, c: "", names: false, fact: false }, lit: q, pairLit: lgIJ(q, nA) })]);
      L.push(...fixSteps(c, right[q], (x) => put((bb: any) => ({ zoom: { ...bb.zoom, c: x } })), (f) => put((bb: any) => ({ zoom: { ...bb.zoom, ...f } }))));
      L.push([300, () => { put((bb: any) => { const cells = bb.cells.slice(); cells[q] = right[q]; return { cells }; }); api.sfx.tick(); }]);
    });
    L.push([60, () => put({ lit: -1, pairLit: null })]);
    return L;
  };
  /* the grid and the columns filled side by side, one column step for every cell */
  const paceSteps = () => {
    const L: any[] = [[60, () => put({ cells: right.map(() => ""), pstep: 0, pprod: false, tally: false, hl: -1 })], [500, () => {}]];
    [3, 2, 1, 0].forEach((idx, q) => L.push([800, () => {
      put((b: any) => { const cells = b.cells.slice(); cells[idx] = right[idx]; return { cells, pstep: q + 1, hl: idx }; });
      api.sfx.tick();
    }]));
    L.push([600, () => put({ hl: -1, pprod: true })]);
    L.push([400, () => put({ tally: true })]);
    return L;
  };
  /* where the columns carry, the grid's cell keeps its tens in its own upper half */
  const whySteps = () => {
    const L: any[] = [[60, () => put({ label: null, hl: -1 })]];
    [3, 1].filter((idx) => (cols ? (idx === 3 ? cols.c1 : cols.c2) > 0 : false)).forEach((idx) => {
      L.push([60, () => put({ hl: idx })]);
      L.push([1200, () => {}]);
    });
    L.push([60, () => put({ hl: -1, label: "tens get own half" })]);
    L.push([500, () => {}]);
    return L;
  };
  /* one strip swept: shaded, its digits lit one at a time, its total in its square, a pass to the left */
  const stripSteps = (k: number, sp: number) => {
    const r = rows[k], L: any[] = [];
    L.push([320 * sp, () => put({ cur: k, lits: [] })]);
    strips[k].parts.forEach((pt: any) => L.push([240 * sp, () => put((b: any) => ({ lits: [...b.lits, pt.i + "," + pt.j + "," + pt.h] }))]));
    L.push([420 * sp, () => put({ total: { k, text: String(r.total) } })]);
    if (r.pout > 0) {
      const a = railSq(k), z = railSq(k + 1);
      L.push([40, () => put({ total: { k, text: r.digit }, fly: { x: a.x + 20, y: a.y + 32, t: String(r.pout) } })]);
      L.push([560 * sp, () => put({ fly: { x: z.x + 12, y: z.y + 32, t: String(r.pout) } })]);
      L.push([20, () => {
        put((b: any) => { const pin = b.pin.slice(); pin[k + 1] = r.pout; const rail = b.rail.slice(); rail[k] = r.digit; return { pin, rail, fly: null, total: null }; });
        api.sfx.tick();
      }]);
    } else L.push([300 * sp, () => { put((b: any) => { const rail = b.rail.slice(); rail[k] = r.digit; return { rail, total: null }; }); api.sfx.tick(); }]);
    L.push([200 * sp, () => put({ lits: [] })]);
    return L;
  };
  /* the whole sweep; `clear` empties the rail first (an answer the agent gave), a traceback keeps the child's digits */
  const sweepSteps = (final: any, sp: number, clear = false) => {
    const L: any[] = [[60, () => put({ cur: -1, total: null, lits: [], fly: null, pin: Array(S).fill(0), done: false, label: null, readAt: -1, ...(clear ? { rail: Array(S).fill("") } : {}) })]];
    for (let k = 0; k < S; k++) L.push(...stripSteps(k, sp));
    L.push([300, () => put({ cur: -1, swept: true, ...final })]);
    return L;
  };
  /* the product read off the edge, from the top left strip down to the bottom right */
  const readSteps = () => {
    const L: any[] = [[60, () => put({ cur: -1 })]];
    for (let k = S - 1; k >= 0; k--) L.push([280, () => put({ readAt: k })]);
    L.push([300, () => put({ readAt: -1, done: true })]);
    L.push([500, () => {}]);
    return L;
  };

  /* win motions */
  useEffect(() => {
    if (stage !== "win") return;
    const L: any[] =
      K === "rule" || K === "place" ? placeSteps()
        : K === "fill" ? [[60, () => put({ lit: -1, zoom: null })], ...right.map((_, q) => [300, () => put({ readCell: q, pairLit: lgIJ(q, nA) })]), [300, () => put({ readCell: -1, pairLit: null })]]
          : K === "cell" ? [[60, () => put({ cells: [right[0]], fact: true })], [900, () => {}]]
            : K === "carries" ? [[60, () => put({ tally: true, hl: -1 })], [900, () => {}]]
              : K === "why" ? whySteps()
                : K === "where" ? sweepSteps({ label: "at the strips" }, 0.55)
                  : K === "sweep" ? (bdRef.current.swept ? readSteps() : sweepSteps({ done: true }, 0.45, true)) : [];
    tl.run(L);
  }, [stage]);

  /* the traceback: the mathematics redrawn in steps, ending on the whole right answer; nothing marked */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const done = () => api.lock(false);
    const b = bdRef.current;
    const L: any[] =
      K === "rule" ? ruleTrace()
        : K === "place" ? placeSteps()
          : K === "fill" ? fillTrace(wrong.value)
            : K === "cell" ? [...fixSteps(String(wrong.value ?? ""), right[0], (c) => put({ cells: [c] }), (f) => put(f))]
              : K === "carries" ? paceSteps()
                : K === "why" ? whySteps()
                  : K === "where" ? sweepSteps({ label: "at the strips" }, 0.7)
                    : K === "sweep" ? sweepSteps({ done: true, names: true }, 0.8) : [];
    put({ touched: true });
    tl.run(L, done);
  }, [wrong]);

  /* free play: any two digits on each side, the compare panel, and the sweep */
  const stepDigit = (which: string, k: number) => {
    const b = bdRef.current, s = which === "top" ? b.top : b.side;
    const d = +s[k], nd = k === 0 ? (d % 9) + 1 : (d + 1) % 10;
    const ns = s.slice(0, k) + nd + s.slice(k + 1);
    tl.stop();
    api.sfx.tick();
    put(lgBoard({ kind: "free", top: which === "top" ? ns : b.top, side: which === "side" ? ns : b.side }));
  };
  const freeSweep = () => {
    if (tl.busy) return;
    const k = bdRef.current.rail.findIndex((r: string) => r === "");
    if (k < 0) { put({ rail: Array(S).fill(""), pin: Array(S).fill(0), cur: -1, lits: [], total: null, done: false }); api.sfx.tick(); return; }
    tl.run([...stripSteps(k, 0.8), [60, () => put({ cur: k === S - 1 ? -1 : bdRef.current.cur })]]);
  };

  /* Enter while the working area owns the answer (a choice or the carries count goes straight to judge) */
  const handles = K === "rule" || K === "fill" || K === "cell" || K === "sweep";
  const enterFn: any = stage !== "ask" || !handles ? null
    : busy ? () => {}
      : K === "rule" ? () => { const b = bdRef.current; if (b.A * b.B > 0) api.submit(`${b.A} × ${b.B}`); }
        : K === "fill" ? fillEnter
          : K === "cell" ? cellEnter
            : sweepEnter;
  api.onEnter(enterFn);

  HOOK.set = (v: any) => {
    const b = bdRef.current;
    if (b.kind === "rule") {
      const m = /(\d+)\s*[×x]\s*(\d+)/.exec(String(v ?? ""));
      if (!m) return false;
      put({ A: Math.min(4, Math.max(1, +m[1])), B: Math.min(3, Math.max(1, +m[2])), touched: true });
      return true;
    }
    if (b.kind === "fill") {
      const g = String(v ?? "").trim().split(/\s+/);
      if (g.length !== b.cells.length || g.some((x) => !/^\d{1,2}$/.test(x))) return false;
      put({ cells: g, lit: -1, touched: true, zoom: null });
      return true;
    }
    if (b.kind === "sweep") {
      const d = String(leadNumber(v) ?? "");
      if (!d || d === "null") return false;
      const rail: string[] = [];
      for (let k = 0; k < S - 1; k++) rail.push(d.length - 1 - k >= 0 ? d[d.length - 1 - k] : "0");
      rail.push(d.length > S - 1 ? d.slice(0, d.length - (S - 1)) : "0");
      const pin = rows.map((r: any, k: number) => (k > 0 && rail[k - 1] === rows[k - 1].digit ? r.pin : 0));
      put({ rail, pin, cur: -1, touched: true, swept: false });
      return true;
    }
    return false;
  };
  HOOK.check = () => {
    const b = bdRef.current;
    if (stage !== "ask" || tl.busy) return undefined;
    if (b.kind === "rule" && b.A * b.B > 0) { api.submit(`${b.A} × ${b.B}`); return true; }
    if (b.kind === "fill" && b.cells.every((c: string) => c !== "")) { api.submit(b.cells.join(" ")); return true; }
    if (b.kind === "sweep" && b.rail.every((r: string) => r !== "")) { api.submit(lgRailNum(b.rail)); return true; }
    return undefined;
  };

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const dragging = !!(drag.drag && drag.drag.payload && drag.drag.payload.src === "knob" && drag.drag.moved);
  const sA = K === "rule" ? (dragging ? lgSnap(drag.drag.x - gx, 4) : bd.A) : K === "cell" ? 1 : nA;
  const sB = K === "rule" ? (dragging ? lgSnap(drag.drag.y - gy, 3) : bd.B) : K === "cell" ? 1 : nB;
  const cellsN = sA * sB;
  const filledN = K === "rule" || K === "place" ? 0 : bd.cells.filter((c: string) => c && c !== "__").length;
  const sweptN = bd.rail.filter((r: string) => r !== "").length;
  const passesN = bd.pin.filter((x: number) => x > 0).length;
  api.share({
    phase: n, top, side, across: sA, down: sB, cells: cellsN, filled: filledN, sweptStrips: sweptN, passes: passesN,
    product: K === "sweep" && sweptN === S ? lgRailNum(bd.rail) : null, complete: stage === "idle",
  });

  /* ── drawing ── */
  const halves = (c: string) => (!c ? [null, null] : c.length === 1 ? [c, null] : [c[0] === "_" ? null : c[0], c[1] === "_" ? null : c[1]]);
  const eA = bd.ghost ? bd.ghost.A : sA;
  const pl = bd.pairLit || (K === "fill" && stage === "ask" && bd.lit >= 0 ? lgIJ(bd.lit, nA) : bd.hl >= 0 ? lgIJ(bd.hl, nA) : null);
  const sweeping = K === "sweep" || K === "free" || (K === "where" && (bd.cur >= 0 || bd.rail.some((r: string) => r)));
  const showPanel = !!cols && (K === "carries" || K === "why" || K === "where" || K === "free");
  const line = shade(C.rule, 0.3), diag = shade(C.rule, 0.18);
  const tri = (pt: any) => {
    const x = gx + pt.i * p, y = gy + pt.j * p;
    return pt.h === "t" ? `${x},${y} ${x + p},${y} ${x},${y + p}` : `${x + p},${y} ${x + p},${y + p} ${x},${y + p}`;
  };

  /* an outside digit (or a blank digit tile), waiting beside the bay or set along an edge */
  const waitTop = (i: number) => (K === "place" ? { x: 690 + i * 36, y: 300 } : { x: gx + 64 + i * (bd.blank ? 48 : 36), y: gy - 44 });
  const waitSide = (j: number) => (K === "place" ? { x: 834 + j * 36, y: 300 } : { x: 690 + j * (bd.blank ? 48 : 36), y: gy + 80 });
  const edgeTop = (i: number) => ({ x: gx + (i + 0.5) * p, y: gy - 22 });
  const edgeSide = (j: number) => ({ x: gx + (K === "cell" ? 1 : eA) * p + 40, y: gy + (j + 0.5) * p + 20 });
  const outDigit = (key: string, ch: string, at: any, blue: boolean, lit: boolean) => (
    <g key={key} className="lg-move" style={{ transform: `translate(${at.x}px, ${at.y}px)` } as any}>
      {lit && <rect x={-31} y={-54} width={62} height={66} rx={14} fill={tint(blue ? CONTENT.hundred : CONTENT.ten, 0.78)} />}
      {bd.blank
        ? <rect x={-19} y={-44} width={38} height={48} rx={8} fill={tint(blue ? CONTENT.hundred : CONTENT.ten, 0.72)} stroke={blue ? LG_BLUE : LG_AMBER} strokeWidth={3} />
        : <text x={0} y={0} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={blue ? LG_BLUE : LG_AMBER}>{ch}</text>}
    </g>
  );

  /* a big cell: its diagonal, its halves (named once the traceback names them), its pair outside it */
  const bigCell = (x: number, y: number, c: string, names: boolean, a: string, b: string) => {
    const s = 2 * LG_P, [t, o] = halves(c);
    return (
      <g>
        <rect x={x} y={y} width={s} height={s} rx={6} fill="#FFFFFF" stroke={line} strokeWidth={3} />
        <line x1={x + s} y1={y} x2={x} y2={y + s} stroke={diag} strokeWidth={3} />
        {names && <text x={x + 14} y={y + 40} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("tens")}</text>}
        {names && <text x={x + s - 14} y={y + s - 16} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("ones")}</text>}
        {t !== null && <text key={"bt" + t} className="lg-pop" x={x + 0.33 * s} y={y + 0.33 * s + 26} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={t === "0" ? LG_GREY : C.ink}>{t}</text>}
        {o !== null && <text key={"bo" + o} className="lg-pop" x={x + 0.67 * s} y={y + 0.67 * s + 26} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{o}</text>}
        {K !== "cell" && <text x={x + s / 2} y={y - 22} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={LG_BLUE}>{a}</text>}
        {K !== "cell" && <text x={x + s + 40} y={y + s / 2 + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={LG_AMBER}>{b}</text>}
      </g>
    );
  };
  const big = K === "fill" && bd.zoom ? { c: bd.zoom.c, names: bd.zoom.names, fact: bd.zoom.fact, ...lgIJ(bd.zoom.idx, nA) }
    : K === "fill" && stage === "ask" && bd.lit >= 0 ? { c: bd.cells[bd.lit], names: bd.names, fact: false, ...lgIJ(bd.lit, nA) } : null;

  /* the compare panel: the same product in columns, the book's way */
  const PX = 650, PY = 36;
  const colX = (q: number) => PX + 70 + (3 - q) * 82 + 41;
  const links = bd.hl >= 0 && cols ? LG_LINKS[bd.hl] : null;
  const litP = (row: string, q: number) => !!(links && links[row] && links[row].includes(q));
  const pDigit = (key: string, q: number, d: any, y: number, fill: string, row: string) => (
    <g key={key}>
      {litP(row, q) && <rect x={colX(q) - 34} y={y - 44} width={68} height={54} rx={10} fill={tint(C.accent, 0.72)} />}
      <text x={colX(q)} y={y} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={d === 0 && row === "r2" && q === 0 ? LG_GREY : fill}>{d}</text>
    </g>
  );
  const panel = showPanel && cols && (() => {
    const r1 = Object.keys(cols.r1).map(Number).filter((q) => bd.pstep >= (q === 0 ? 1 : 2));
    const r2 = Object.keys(cols.r2).map(Number).filter((q) => bd.pstep >= (q <= 1 ? 3 : 4));
    const rings = [{ q: 1, d: cols.c1, at: 1 }, { q: 2, d: cols.c2, at: 3 }].filter((r) => r.d > 0 && bd.pstep >= r.at);
    return (
      <g>
        <rect x={PX - 14} y={PY - 14} width={426} height={468} rx={18} fill={tint(C.panel, 0.7)} stroke={C.rule} strokeWidth={2} />
        {[3, 2, 1, 0].map((q) => (
          <g key={"ph" + q}>
            <rect x={colX(q) - 39} y={PY} width={78} height={40} rx={8} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
            <text x={colX(q)} y={PY + 29} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(LG_PLACE[q])}</text>
          </g>
        ))}
        {rings.map((r) => (
          <g key={"ring" + r.q}>
            <circle cx={colX(r.q)} cy={PY + 62} r={19} fill={litP("ring", r.q) ? tint(CONTENT.pointer, 0.8) : "#FFFFFF"} stroke={LG_VERM} strokeWidth={3} />
            <text x={colX(r.q)} y={PY + 72} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={LG_VERM}>{r.d}</text>
          </g>
        ))}
        {[1, 0].map((q) => pDigit("m" + q, q, +top[1 - q], PY + 128, LG_BLUE, "m"))}
        {[1, 0].map((q) => litP("x", q) ? <rect key={"xl" + q} x={colX(q) - 34} y={PY + 144} width={68} height={54} rx={10} fill={tint(C.accent, 0.72)} /> : null)}
        <text y={PY + 188} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>
          <tspan x={PX + 34}>×</tspan>
          {[1, 0].map((q) => <tspan key={"x" + q} x={colX(q)} fill={LG_AMBER}>{side[1 - q]}</tspan>)}
        </text>
        <rect x={PX + 60} y={PY + 202} width={338} height={4} rx={2} fill={C.ink} />
        {r1.length > 0 && <text x={PX + 34} y={PY + 254} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={LG_ROSE}>{"× " + cols.m1}</text>}
        {r1.map((q) => pDigit("a" + q, q, cols.r1[q], PY + 258, LG_ROSE, "r1"))}
        {r2.length > 0 && <text x={PX + 34} y={PY + 314} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={LG_ROSE}>{"× " + cols.m2}</text>}
        {r2.map((q) => pDigit("b" + q, q, cols.r2[q], PY + 318, LG_ROSE, "r2"))}
        <rect x={PX + 60} y={PY + 334} width={338} height={4} rx={2} fill={C.ink} />
        {bd.pprod && Object.keys(cols.pr).map(Number).map((q) => pDigit("p" + q, q, cols.pr[q], PY + 390, LG_GREEN, "pr"))}
        {bd.tally && <text x={PX + 199} y={474} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("carries:") + " " + cols.rings}</text>}
      </g>
    );
  })();

  /* the running count, in the runs zone (64,108) */
  const runs = (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      {K === "sweep" ? (
        <g>
          <text x={20} y={-62} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("swept:") + " " + count(sweptN)}</text>
          <text x={20} y={-28} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("passed:") + " " + count(passesN)}</text>
        </g>
      ) : (
        <g>
          <text x={20} y={-44} fontSize={T.label} fontWeight={700} fill={C.ink}>{cellsN}<tspan fontSize={T.micro} fontWeight={500}>{" " + tx(cellsN === 1 ? "cell" : "cells")}</tspan></text>
          <text x={312} y={-44} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{filledN}<tspan fontSize={T.micro} fontWeight={500}>{" " + tx("filled")}</tspan></text>
        </g>
      )}
    </g>
  );

  const kx = dragging ? Math.min(gx + 4 * p, Math.max(gx, drag.drag.x)) : gx + bd.A * p;
  const ky = dragging ? Math.min(gy + 3 * p, Math.max(gy, drag.drag.y)) : gy + bd.B * p;
  const cellHits = K !== "cell" && K !== "rule" && K !== "place" && K !== "sweep" && !busy
    && ((K === "fill" && stage === "ask" && bd.cells.some((c: string) => c === "")) || (stage === "ask" && K !== "fill") || free);
  const sweepHit = K === "sweep" && stage === "ask" && !busy && bd.cur < 0 && bd.rail.every((r: string) => r === "");
  const idle0 = stage === "ask" || stage === "teach";
  const inv = busy || !idle0 ? null
    : K === "rule" && bd.A === 0 ? { x: gx, y: gy, r: 46 }
      : K === "fill" && !bd.touched && index === 0 && bd.lit >= 0 ? { x: gx + (lgIJ(bd.lit, nA).i + 0.5) * p, y: gy + (lgIJ(bd.lit, nA).j + 0.5) * p, r: 66 }
        : K === "carries" && !bd.touched && index === 0 ? { x: gx + 1.5 * p, y: gy + 1.5 * p, r: 66 }
          : K === "sweep" && bd.cur < 0 && bd.rail.every((r: string) => r === "") ? { x: gx + nA * p, y: gy + nB * p, r: 46 }
            : null;
  const product = lgNum(top + side) ? +top * +side : 0;

  return (
    <g>
      <style>{LG_CSS}</style>
      {runs}

      {/* phase 1: faint marks where the ruler's lines can fall */}
      {K === "rule" && Array.from({ length: 4 }).map((_, j) => Array.from({ length: 5 }).map((__, i) => (
        <circle key={"g" + i + "-" + j} cx={gx + i * p} cy={gy + j * p} r={4} fill={C.rule} />
      )))}

      {/* the lattice: cell faces, the strip being swept, the lines and the one diagonal in every cell */}
      {K !== "cell" && (
        <g>
          {Array.from({ length: sB }).map((_, j) => Array.from({ length: sA }).map((__, i) => {
            const idx = j * nA + i;
            const on = (K === "fill" && stage === "ask" && bd.lit === idx) || bd.hl === idx || bd.readCell === idx;
            return <rect key={"f" + i + "-" + j} x={gx + i * p} y={gy + j * p} width={p} height={p} fill={on ? tint(C.accent, 0.88) : "#FFFFFF"} />;
          }))}
          {bd.cur >= 0 && strips[bd.cur] && strips[bd.cur].parts.map((pt: any, q: number) => <polygon key={"sw" + q} points={tri(pt)} fill={tint(C.panel, 0.15)} />)}
          {Array.from({ length: sB }).map((_, j) => Array.from({ length: sA }).map((__, i) => (
            <g key={"l" + i + "-" + j}>
              <rect x={gx + i * p} y={gy + j * p} width={p} height={p} fill="none" stroke={line} strokeWidth={2.5} />
              <line x1={gx + (i + 1) * p} y1={gy + j * p} x2={gx + i * p} y2={gy + (j + 1) * p} stroke={diag} strokeWidth={K === "sweep" ? 3.5 : 2.5} />
            </g>
          )))}
          {K === "fill" && stage === "ask" && bd.lit >= 0 && (
            <rect x={gx + lgIJ(bd.lit, nA).i * p + 3} y={gy + lgIJ(bd.lit, nA).j * p + 3} width={p - 6} height={p - 6} fill="none" stroke={C.accent} strokeWidth={5} />
          )}
        </g>
      )}

      {/* what each cell holds */}
      {K !== "rule" && K !== "place" && K !== "cell" && bd.cells.map((c: string, idx: number) => {
        const { i, j } = lgIJ(idx, nA), x = gx + i * p, y = gy + j * p, [t, o] = halves(c);
        const lt = bd.lits.includes(i + "," + j + ",t"), lo = bd.lits.includes(i + "," + j + ",o");
        return (
          <g key={"d" + idx}>
            {lt && <circle cx={x + 0.31 * p} cy={y + 0.31 * p} r={25} fill={tint(CONTENT.one, 0.75)} stroke={LG_GREEN} strokeWidth={3} />}
            {lo && <circle cx={x + 0.69 * p} cy={y + 0.69 * p} r={25} fill={tint(CONTENT.one, 0.75)} stroke={LG_GREEN} strokeWidth={3} />}
            {t !== null && <text key={"t" + t} className="lg-pop" x={x + 0.31 * p} y={y + 0.31 * p + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={t === "0" ? LG_GREY : C.ink}>{t}</text>}
            {o !== null && <text key={"o" + o} className="lg-pop" x={x + 0.69 * p} y={y + 0.69 * p + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{o}</text>}
          </g>
        );
      })}

      {/* the single big cell of a one-cell question */}
      {K === "cell" && bigCell(gx, gy, bd.cells[0], bd.names, top, side)}

      {/* the digits outside the grid: blue along the top, amber down the side */}
      {K !== "cell" && Array.from({ length: nA }).map((_, i) => outDigit("top" + i + "-" + index + K, top[i], bd.placed ? edgeTop(i) : waitTop(i), true, !!pl && pl.i === i))}
      {K !== "cell" && Array.from({ length: nB }).map((_, j) => outDigit("side" + j + "-" + index + K, side[j], bd.placed ? edgeSide(j) : waitSide(j), false, !!pl && pl.j === j))}
      {K === "cell" && outDigit("top0", top, edgeTop(0), true, false)}
      {K === "cell" && outDigit("side0", side, edgeSide(0), false, false)}
      {K === "place" && !bd.placed && <text x={780} y={300} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>×</text>}

      {/* the answer rail: one square for every strip, bent round the foot and up the left side */}
      {sweeping && Array.from({ length: S }).map((_, k) => {
        const q = railSq(k), val = bd.total && bd.total.k === k ? bd.total.text : bd.rail[k];
        const on = bd.cur === k || bd.readAt === k;
        return (
          <g key={"r" + k}>
            <rect x={q.x + 3} y={q.y + 3} width={q.w - 6} height={q.h - 6} rx={10} fill="#FFFFFF" stroke={on ? C.accent : C.rule} strokeWidth={on ? 4 : 2} />
            {bd.names && <text x={q.b ? q.x + 12 : q.x + q.w / 2} y={q.y + q.h - 12} textAnchor={q.b ? "start" : "middle"} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(LG_PLACE[k])}</text>}
            {bd.pin[k] > 0 && <text x={q.x + 12} y={q.y + 32} fontSize={T.micro} fontWeight={700} fill={LG_VERM}>{bd.pin[k]}</text>}
            {val !== "" && val !== undefined && (
              <text key={"rv" + val} className="lg-pop" x={q.b ? q.x + q.w / 2 + 10 : q.x + q.w / 2} y={q.b ? q.y + 56 : q.y + 76} textAnchor="middle"
                fontSize={T.speech} fontWeight={700} fill={val === "0" ? LG_GREY : LG_GREEN}>{val}</text>
            )}
          </g>
        );
      })}

      {/* phase 4: the product read off the edge, one place to a square */}
      {K === "sweep" && (
        <g>
          {[3, 2, 1, 0].map((q, c) => (
            <g key={"pr" + q}>
              <rect x={700 + c * 90} y={176} width={86} height={44} rx={10} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={1.5} />
              <text x={743 + c * 90} y={207} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(LG_PLACE[q])}</text>
              <rect x={700 + c * 90} y={226} width={86} height={86} rx={12} fill="#FFFFFF" stroke={bd.readAt === q ? C.accent : C.rule} strokeWidth={bd.readAt === q ? 4 : 2} />
            </g>
          ))}
          <text textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={LG_GREEN}>
            {[3, 2, 1, 0].map((q, c) => (bd.rail[q] ? <tspan key={"pt" + q} x={743 + c * 90} y={289} fill={bd.rail[q] === "0" ? LG_GREY : undefined}>{bd.rail[q]}</tspan> : null))}
          </text>
          {bd.done && (
            <g data-role="reading">
              <text x={880} y={392} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{`${top} × ${side} = `}<tspan fill={LG_GREEN}>{indian(product)}</tspan></text>
            </g>
          )}
        </g>
      )}

      {/* phase 1's traceback: the pairs, numbered, and the right grid drawn in dashes */}
      {K === "rule" && bd.list > 0 && Array.from({ length: bd.list }).map((_, k) => {
        const i = k % nA, j = Math.floor(k / nA), y = 96 + k * 60;
        return (
          <g key={"ls" + k} className="lg-pop">
            <text x={806} y={y} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{k + 1}</text>
            {bd.blank ? (
              <g>
                <rect x={838} y={y - 40} width={34} height={42} rx={7} fill={tint(CONTENT.hundred, 0.72)} stroke={LG_BLUE} strokeWidth={3} />
                <text x={904} y={y} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>×</text>
                <rect x={936} y={y - 40} width={34} height={42} rx={7} fill={tint(CONTENT.ten, 0.72)} stroke={LG_AMBER} strokeWidth={3} />
              </g>
            ) : (
              <text x={838} y={y} fontSize={T.speech} fontWeight={700} fill={C.ink}><tspan fill={LG_BLUE}>{top[i]}</tspan>{" × "}<tspan fill={LG_AMBER}>{side[j]}</tspan></text>
            )}
          </g>
        );
      })}
      {K === "rule" && bd.ghost && Array.from({ length: bd.ghost.B }).map((_, j) => Array.from({ length: bd.ghost.A }).map((__, i) => (
        <g key={"gh" + i + "-" + j}>
          <rect x={gx + i * p + 4} y={gy + j * p + 4} width={p - 8} height={p - 8} rx={6} fill="none" stroke={C.accent} strokeWidth={4} strokeDasharray="12 9" />
          <text x={gx + (i + 0.31) * p} y={gy + (j + 0.31) * p + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(C.accent, 0.3)}>{j * bd.ghost.A + i + 1}</text>
        </g>
      )))}

      {/* phase 2: the lit cell opened large beside the grid, where its digits are written and mended */}
      {big && bigCell(720, 120, big.c, big.names, top[big.i], side[big.j])}
      {big && big.fact && (
        <g data-role="reading">
          <text x={836} y={418} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{`${top[big.i]} × ${side[big.j]} = ${+top[big.i] * +side[big.j]}`}</text>
        </g>
      )}
      {K === "cell" && bd.fact && (
        <g data-role="reading">
          <text x={790} y={292} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{`${top} × ${side} = ${+top * +side}`}</text>
        </g>
      )}

      {panel}
      {K === "carries" && bd.tally && <text x={gx + p} y={474} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("carries: 0")}</text>}
      {bd.label && <text x={gx + p} y={K === "place" ? 430 : 506} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(bd.label)}</text>}

      {/* a pass travelling to the strip on the left */}
      {bd.fly && (
        <g className="lg-move" style={{ transform: `translate(${bd.fly.x}px, ${bd.fly.y}px)` } as any} pointerEvents="none">
          <text x={0} y={0} fontSize={T.micro} fontWeight={700} fill={LG_VERM}>{bd.fly.t}</text>
        </g>
      )}

      {/* the ruler's corner */}
      {K === "rule" && idle0 && (
        <g className={liveRule ? "lg-grab c4-piece" : ""}
          {...(liveRule ? { ...control("ruler", "Rule the grid: drag the corner, or use the arrow keys"), ...drag.bind({ src: "knob" }), onKeyDown: knobKeys } : {})}>
          <rect x={kx - 42} y={ky - 42} width={84} height={84} fill="transparent" />
          <circle cx={kx} cy={ky} r={27} fill="url(#gAccent)" stroke={shade(C.accent, 0.25)} strokeWidth={2.5} filter="url(#fShadowSoft)" />
          <path d={`M ${kx - 10} ${ky - 10} L ${kx + 10} ${ky + 10} M ${kx + 10} ${ky + 1} L ${kx + 10} ${ky + 10} L ${kx + 1} ${ky + 10} M ${kx - 10} ${ky - 1} L ${kx - 10} ${ky - 10} L ${kx - 1} ${ky - 10}`}
            stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      )}

      {/* tap targets */}
      {cellHits && Array.from({ length: nB }).map((_, j) => Array.from({ length: nA }).map((__, i) => (
        <Hit key={"h" + i + "-" + j} id={"cell-" + (j * nA + i)} x={gx + i * p} y={gy + j * p} w={p} h={p} onPress={() => tapCell(j * nA + i)}
          label={(K === "fill" ? "Write in the square for " : "Compare the square for ") + top[i] + " and " + side[j]} />
      )))}
      {sweepHit && <Hit id="sweep-start" x={gx + (nA - 1) * p} y={gy + (nB - 1) * p} w={p} h={p + LG_RAIL} onPress={startSweep} label="Start the sweep at the bottom right corner" />}
      {free && !busy && Array.from({ length: nA }).map((_, i) => (
        <Hit key={"ft" + i} id={"top-" + i} x={gx + (i + 0.5) * p - 40} y={gy - 94} w={80} h={84} onPress={() => stepDigit("top", i)} label={"Change the top digit " + top[i]} />
      ))}
      {free && !busy && Array.from({ length: nB }).map((_, j) => (
        <Hit key={"fs" + j} id={"side-" + j} x={gx + nA * p + 2} y={gy + (j + 0.5) * p - 42} w={80} h={84} onPress={() => stepDigit("side", j)} label={"Change the side digit " + side[j]} />
      ))}
      {free && !busy && Array.from({ length: S }).map((_, k) => {
        const q = railSq(k);
        return <Hit key={"fr" + k} id={"rail-" + k} x={q.x} y={q.y} w={q.w} h={q.h} onPress={freeSweep} label="Sweep the next strip" />;
      })}

      {inv && <Invite x={inv.x} y={inv.y} r={inv.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, n }: any) {
  const L = (result && result.last) || {};
  const ph: any = PHASES[Math.max(0, (n || 1) - 1)] || PHASES[0];
  const it: any = (ph.items || [])[L.item] || {};
  const sh = L.shared || {};
  const k = it.kind;
  const tt = (s: string) => (HOOK.tx ? HOOK.tx(s) : s);   /* Work's lookup, for the language in use */
  const bg = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  const mini = (x0: number, y0: number, s: number, a: number, b: number, strip: boolean) => (
    <g>
      {Array.from({ length: b }).map((_, j) => Array.from({ length: a }).map((__, i) => {
        const x = x0 + i * s, y = y0 + j * s;
        return (
          <g key={i + "-" + j}>
            <rect x={x} y={y} width={s} height={s} fill="#FFFFFF" stroke={shade(C.rule, 0.35)} strokeWidth={2} />
            {strip && (a - 1 - i) + (b - 1 - j) === 1 && <polygon points={`${x + s},${y} ${x + s},${y + s} ${x},${y + s}`} fill={tint(CONTENT.one, 0.55)} />}
            {strip && (a - 1 - i) + (b - 1 - j) === 0 && <polygon points={`${x},${y} ${x + s},${y} ${x},${y + s}`} fill={tint(CONTENT.one, 0.55)} />}
            <line x1={x + s} y1={y} x2={x} y2={y + s} stroke={shade(C.rule, 0.2)} strokeWidth={1.5} />
          </g>
        );
      }))}
      {Array.from({ length: a }).map((_, i) => <rect key={"t" + i} x={x0 + i * s + s / 2 - 6} y={y0 - 8} width={12} height={4} rx={2} fill={LG_BLUE} />)}
      {Array.from({ length: b }).map((_, j) => <rect key={"s" + j} x={x0 + a * s + 4} y={y0 + j * s + s / 2 - 6} width={4} height={12} rx={2} fill={LG_AMBER} />)}
    </g>
  );
  if (k === "rule" || k === "place") {
    const a = sh.across || 2, b = sh.down || 2;
    return <g>{bg}{mini(18, (h - b * 24) / 2 + 2, 24, a, b, false)}<text x={w - 16} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{tt(a * b + " cells")}</text></g>;
  }
  if (k === "cell" || k === "fill") {
    const v = String(L.value ?? it.answer ?? ""), c = k === "cell" ? v : "", s = 62, x0 = 16, y0 = (h - s) / 2;
    return (
      <g>
        {bg}
        <rect x={x0} y={y0} width={s} height={s} fill="#FFFFFF" stroke={shade(C.rule, 0.35)} strokeWidth={2} />
        <line x1={x0 + s} y1={y0} x2={x0} y2={y0 + s} stroke={shade(C.rule, 0.2)} strokeWidth={1.5} />
        {c.length === 2 && <text x={x0 + 19} y={y0 + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={c[0] === "0" ? LG_GREY : C.ink}>{c[0]}</text>}
        {c.length === 2 && <text x={x0 + 43} y={y0 + 56} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{c[1]}</text>}
        <text x={w - 16} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{k === "cell" ? `${it.top} × ${it.side}` : tt("filled")}</text>
      </g>
    );
  }
  if (k === "sweep") {
    const v = leadNumber(L.value);
    return (
      <g>
        {bg}
        <text x={w / 2} y={32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{`${it.top} × ${it.side}`}</text>
        <text x={w / 2} y={70} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LG_GREEN}>{v === null ? "" : indian(v)}</text>
      </g>
    );
  }
  if (k === "carries" || k === "why" || k === "where") {
    return <g>{bg}{mini(18, (h - 48) / 2 + 2, 24, 2, 2, k === "where")}<text x={w - 16} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{tt(k === "where" ? "strips" : k === "why" ? "tens half" : "0 carries")}</text></g>;
  }
  const v = L.value;
  if (v === null || v === undefined) return null;
  return <g>{bg}<text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(v)}</text></g>;
}

/* the slot: a number from 1,000 up is shown with Indian commas (a grid or a grid size stays as typed) */
const lgFormat = (s: any) => (/^\d{4,}$/.test(String(s ?? "")) ? indian(Number(s)) : HOOK.tx ? HOOK.tx(String(s ?? "")) : String(s ?? ""));

function LatticeGrid(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: lgFormat, fitHost: () => null }} />
  );
}

export default LatticeGrid;
