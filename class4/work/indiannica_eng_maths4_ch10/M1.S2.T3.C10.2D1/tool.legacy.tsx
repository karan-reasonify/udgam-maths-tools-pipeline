/* ═══ M1.S2.T3.C8.2D1 · step_track · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "step_track";
const MEDIA_ID = "M1.S2.T3.C8.2D1";
const TOOL_NAME = "Step Track";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A track of stones, with a jump between each pair. How far is every jump?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every jump labelled, and every series carried on by its own rule.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Choose a start and a rule, and watch the track fill.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 patterns: पैटर्न / પેટર્ન, नियम / નિયમ,
   क्रम / ક્રમ, चरण / પગલું (the step between two numbers), अगला / આગળનું, सम-विषम / બેકી-એકી.
   The jump between two stones is छलाँग / કૂદકો, a stone पत्थर / પથ્થર, a counter गोटी / ગોટી, a landing
   (one letter passed) पड़ाव / પડાવ. Letters stay A to Z on the picture, so a line that names them keeps the
   Latin letter beside a word of its own script (a line of Latin letters alone would have no clip).
   Digits stay digits: the runtime speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Step Track": "चरणों का रास्ता",
    "A track of stones, with a jump between each pair. How far is every jump?": "पत्थरों का एक रास्ता है। हर दो पत्थरों के बीच एक छलाँग है। हर छलाँग कितनी बड़ी है?",
    "Every jump labelled, and every series carried on by its own rule.": "हर छलाँग पर माप लिखी। हर क्रम अपने नियम से आगे बढ़ा।",
    "Free play. Choose a start and a rule, and watch the track fill.": "मुक्त खेल। शुरुआत और नियम चुनो, और रास्ता भरते देखो।",

    "The step between neighbours": "पास-पास की संख्याओं के बीच का चरण",
    "Tap a jump to find its size. Check them all before you fill a stone.": "छलाँग पर टैप करके उसकी माप जानो। पत्थर भरने से पहले सभी छलाँगें जाँच लो।",
    "Is every jump the same size?": "क्या हर छलाँग की माप एक ही है?",
    "Use that same jump again from the last stone.": "आखिरी पत्थर से वही छलाँग फिर लगाओ।",
    "The step is the same between every pair. A count down stops at zero.": "हर दो पत्थरों के बीच चरण एक ही रहता है। उलटी गिनती शून्य पर रुकती है।",
    "You learned: find the step, check every jump, and stop at zero.": "तुमने सीखा: चरण ढूँढो, हर छलाँग जाँचो, और शून्य पर रुको।",
    "Next stone?": "अगला पत्थर?",
    "7, 12, 17, 22. What number lands on the next stone?": "7, 12, 17, 22। अगले पत्थर पर कौन सी संख्या आएगी?",
    "Find the jump from the first stone to the second.": "पहले पत्थर से दूसरे पत्थर तक की छलाँग ढूँढो।",
    "Now 5, 11, 17, 23. Which number fills the empty stone?": "अब 5, 11, 17, 23। खाली पत्थर में कौन सी संख्या आएगी?",
    "Check the jump between the middle stones too.": "बीच वाले पत्थरों की छलाँग भी जाँचो।",
    "Where does it stop?": "यह कहाँ रुकता है?",
    "This track counts down. Where does this one stop?": "यह रास्ता उलटी गिनती में चलता है। यह कहाँ रुकेगा?",
    "Look at the stone at the far left of this track.": "इस रास्ते में सबसे बाईं ओर का पत्थर देखो।",

    "Letters can step too": "अक्षर भी चरणों में बढ़ते हैं",
    "Letters line up like numbers. A is 1, B is 2, all the way to Z.": "अक्षर संख्याओं की तरह कतार में हैं। A का स्थान 1, B का 2, और ऐसे ही Z तक।",
    "How many landings does one jump take?": "एक छलाँग में कितने पड़ाव आते हैं?",
    "Move the letter and its number together.": "अक्षर और उसकी संख्या को साथ-साथ आगे बढ़ाओ।",
    "Letters step along the alphabet just as numbers step along counting.": "अक्षर वर्णमाला में आगे बढ़ते हैं। संख्याएँ भी गिनती में ऐसे ही बढ़ती हैं।",
    "You learned: letters step along the alphabet, each with its place.": "तुमने सीखा: अक्षर वर्णमाला में चलते हैं, हर एक का अपना स्थान है।",
    "Next place?": "अगला स्थान?",
    "B is at 2, D at 4, F at 6, H at 8. Which place comes next?": "B का स्थान 2, D का 4, F का 6, H का 8 है। आगे कौन सा स्थान आएगा?",
    "Count the landings from one letter to the next.": "एक अक्षर से अगले अक्षर तक के पड़ाव गिनो।",
    "Next letter?": "अगला अक्षर?",
    "A, D, G, J. Which letter follows J?": "अक्षर A, D, G, J हैं। J के बाद कौन सा अक्षर आएगा?",
    "Walk the track from J and count each landing.": "J से रास्ते पर चलो और हर पड़ाव गिनो।",
    "Y is at 25, V at 22, S at 19. What place comes after S?": "Y का स्थान 25, V का 22, S का 19 है। S के बाद कौन सा स्थान आएगा?",
    "These letters go backwards. Which way does the place go?": "ये अक्षर पीछे की ओर जाते हैं। स्थान किस ओर जाता है?",

    "Paired or one left over": "जोड़ी बनी या एक बचा",
    "Set the counters out two by two, and look at what is left.": "गोटियों को दो-दो करके रखो, और देखो कि क्या बचा।",
    "Think in twos. Does anything get left over?": "दो-दो में सोचो। क्या कुछ बच जाता है?",
    "Odd and even take turns, all the way along.": "विषम और सम बारी-बारी से आते हैं, आगे तक।",
    "A number that pairs up with none left over is even, and one that leaves one over is odd.": "जोड़ियाँ बनकर कुछ न बचे, तो संख्या सम है। एक बचे, तो विषम है।",
    "You learned: pairing with none over is even, one over is odd.": "तुमने सीखा: कुछ न बचे तो सम, एक बचे तो विषम।",
    "even": "सम",
    "odd": "विषम",
    "Even or odd?": "सम या विषम?",
    "Pair up these 11 buttons. Are they even or odd?": "इन 11 बटनों की जोड़ियाँ बनाओ। क्या वे सम हैं या विषम?",
    "Count again at the end of the row. Is anyone alone?": "पंक्ति के आखिर में फिर गिनो। क्या कोई अकेला है?",
    "Now 14 socks. Does every sock find a partner?": "अब 14 मोज़े हैं। क्या हर मोज़े को साथी मिलता है?",
    "Do not go by the first digit. Lay all 14 out.": "पहले अंक को देखकर मत बताओ। सभी 14 बिछा दो।",
    "31, 33, 35, 37. Which number lands next?": "31, 33, 35, 37। आगे कौन सी संख्या आएगी?",
    "Look at the jump between the stones you can see.": "जो पत्थर दिख रहे हैं, उनके बीच की छलाँग देखो।",

    "When the steps are not equal": "जब चरण बराबर न हों",
    "These jumps are not the same size. Look at where each one comes from.": "ये छलाँगें एक ही माप की नहीं हैं। देखो कि हर छलाँग किससे बनी है।",
    "Are the jumps all the same size?": "क्या सभी छलाँगें एक ही माप की हैं?",
    "Look at the stones behind the jump.": "छलाँग के पीछे के पत्थर देखो।",
    "When the steps are not equal, look at what each step is: here each number is added to itself.": "जब चरण बराबर न हों, तो देखो कि हर चरण क्या है। यहाँ हर संख्या में वही संख्या जुड़ती है।",
    "You learned: when jumps differ, see where each one comes from.": "तुमने सीखा: छलाँगें अलग हों, तो देखो हर एक किससे बनी।",
    "The jumps go 6, then 12, then 24. What lands after 48?": "छलाँगें 6, फिर 12, फिर 24 हैं। 48 के बाद कौन सी संख्या आएगी?",
    "Put each jump beside the stone it starts from.": "हर छलाँग को उसके शुरुआती पत्थर के पास रखो।",
    "9, 18, 36, 72. What fills the empty stone?": "9, 18, 36, 72। खाली पत्थर में क्या आएगा?",
    "Compare the first jump with the last one.": "पहली छलाँग की तुलना आखिरी छलाँग से करो।",
    "Your series runs 3, 4, 7. Each number adds the two before it. What comes next?": "तुम्हारा क्रम 3, 4, 7 है। हर संख्या पिछली दो संख्याओं का जोड़ है। आगे क्या आएगा?",
    "Which two stones does this jump come out of?": "यह छलाँग किन दो पत्थरों से बनती है?",

    "side by side": "साथ-साथ",
    "step back": "पीछे चलो",
    "step on": "आगे चलो",
    "tray": "ट्रे",
    "your card": "तुम्हारा कार्ड",
    "pair them": "जोड़ी बनाओ",
    "add a": "एक चरण", "step": "जोड़ो",
    "take a step": "एक चरण", "away": "घटाओ",
    "add it to": "उसे खुद में", "itself": "जोड़ो",
    "add the two": "पिछली दो", "before": "संख्याएँ जोड़ो",
    "Jumps labelled": "लिखी गई छलाँगें",
    "Counters paired": "जोड़ी बनी गोटियाँ",
    "Stones filled": "भरे पत्थर",
    "less": "कम",
    "more": "ज़्यादा",
  },
  gu: {
    "Step Track": "પગલાંનો રસ્તો",
    "A track of stones, with a jump between each pair. How far is every jump?": "પથ્થરોનો એક રસ્તો છે. દરેક બે પથ્થર વચ્ચે એક કૂદકો છે. દરેક કૂદકો કેટલો મોટો છે?",
    "Every jump labelled, and every series carried on by its own rule.": "દરેક કૂદકા પર માપ લખ્યું. દરેક ક્રમ પોતાના નિયમથી આગળ વધ્યો.",
    "Free play. Choose a start and a rule, and watch the track fill.": "મુક્ત રમત. શરૂઆત અને નિયમ પસંદ કરો, અને રસ્તો ભરાતો જુઓ.",

    "The step between neighbours": "બાજુ-બાજુની સંખ્યાઓ વચ્ચેનું પગલું",
    "Tap a jump to find its size. Check them all before you fill a stone.": "કૂદકા પર ટૅપ કરીને તેનું માપ જાણો. પથ્થર ભરતાં પહેલાં બધા કૂદકા તપાસી લો.",
    "Is every jump the same size?": "શું દરેક કૂદકાનું માપ એકસરખું છે?",
    "Use that same jump again from the last stone.": "છેલ્લા પથ્થરથી એ જ કૂદકો ફરી લગાવો.",
    "The step is the same between every pair. A count down stops at zero.": "દરેક બે પથ્થર વચ્ચે પગલું એક જ રહે છે. ઊલટી ગણતરી શૂન્ય પર અટકે છે.",
    "You learned: find the step, check every jump, and stop at zero.": "તમે શીખ્યા: પગલું શોધો, દરેક કૂદકો તપાસો, અને શૂન્ય પર અટકો.",
    "Next stone?": "આગળનો પથ્થર?",
    "7, 12, 17, 22. What number lands on the next stone?": "7, 12, 17, 22. આગળના પથ્થર પર કઈ સંખ્યા આવશે?",
    "Find the jump from the first stone to the second.": "પહેલા પથ્થરથી બીજા પથ્થર સુધીનો કૂદકો શોધો.",
    "Now 5, 11, 17, 23. Which number fills the empty stone?": "હવે 5, 11, 17, 23. ખાલી પથ્થરમાં કઈ સંખ્યા આવશે?",
    "Check the jump between the middle stones too.": "વચ્ચેના પથ્થરોનો કૂદકો પણ તપાસો.",
    "Where does it stop?": "તે ક્યાં અટકે છે?",
    "This track counts down. Where does this one stop?": "આ રસ્તો ઊલટી ગણતરીમાં ચાલે છે. તે ક્યાં અટકશે?",
    "Look at the stone at the far left of this track.": "આ રસ્તામાં સૌથી ડાબી બાજુનો પથ્થર જુઓ.",

    "Letters can step too": "અક્ષરો પણ પગલાંમાં આગળ વધે છે",
    "Letters line up like numbers. A is 1, B is 2, all the way to Z.": "અક્ષરો સંખ્યાઓની જેમ હારમાં ગોઠવાયેલા છે. A નું સ્થાન 1, B નું 2, એમ Z સુધી.",
    "How many landings does one jump take?": "એક કૂદકામાં કેટલા પડાવ આવે છે?",
    "Move the letter and its number together.": "અક્ષર અને તેની સંખ્યાને સાથે આગળ વધારો.",
    "Letters step along the alphabet just as numbers step along counting.": "અક્ષરો વર્ણમાળામાં આગળ વધે છે. સંખ્યાઓ પણ ગણતરીમાં એમ જ વધે છે.",
    "You learned: letters step along the alphabet, each with its place.": "તમે શીખ્યા: અક્ષરો વર્ણમાળામાં ચાલે છે, દરેકનું પોતાનું સ્થાન છે.",
    "Next place?": "આગળનું સ્થાન?",
    "B is at 2, D at 4, F at 6, H at 8. Which place comes next?": "B નું સ્થાન 2, D નું 4, F નું 6, H નું 8 છે. આગળ કયું સ્થાન આવશે?",
    "Count the landings from one letter to the next.": "એક અક્ષરથી બીજા અક્ષર સુધીના પડાવ ગણો.",
    "Next letter?": "આગળનો અક્ષર?",
    "A, D, G, J. Which letter follows J?": "અક્ષરો A, D, G, J છે. J પછી કયો અક્ષર આવશે?",
    "Walk the track from J and count each landing.": "J થી રસ્તા પર ચાલો અને દરેક પડાવ ગણો.",
    "Y is at 25, V at 22, S at 19. What place comes after S?": "Y નું સ્થાન 25, V નું 22, S નું 19 છે. S પછી કયું સ્થાન આવશે?",
    "These letters go backwards. Which way does the place go?": "આ અક્ષરો પાછળ જાય છે. સ્થાન કઈ તરફ જાય છે?",

    "Paired or one left over": "જોડી બની કે એક વધ્યો",
    "Set the counters out two by two, and look at what is left.": "ગોટીઓને બે-બે કરીને ગોઠવો, અને જુઓ કે શું વધ્યું.",
    "Think in twos. Does anything get left over?": "બે-બેમાં વિચારો. શું કંઈ વધે છે?",
    "Odd and even take turns, all the way along.": "એકી અને બેકી વારાફરતી આવે છે, છેક સુધી.",
    "A number that pairs up with none left over is even, and one that leaves one over is odd.": "જોડી બનીને કંઈ ન વધે, તો સંખ્યા બેકી છે. એક વધે, તો એકી છે.",
    "You learned: pairing with none over is even, one over is odd.": "તમે શીખ્યા: કંઈ ન વધે તો બેકી, એક વધે તો એકી.",
    "even": "બેકી",
    "odd": "એકી",
    "Even or odd?": "બેકી કે એકી?",
    "Pair up these 11 buttons. Are they even or odd?": "આ 11 બટનની જોડીઓ બનાવો. શું તે બેકી છે કે એકી?",
    "Count again at the end of the row. Is anyone alone?": "હારના છેડે ફરી ગણો. શું કોઈ એકલું છે?",
    "Now 14 socks. Does every sock find a partner?": "હવે 14 મોજાં છે. શું દરેક મોજાને જોડીદાર મળે છે?",
    "Do not go by the first digit. Lay all 14 out.": "પહેલા અંક પરથી ન કહો. બધા 14 પાથરી દો.",
    "31, 33, 35, 37. Which number lands next?": "31, 33, 35, 37. આગળ કઈ સંખ્યા આવશે?",
    "Look at the jump between the stones you can see.": "જે પથ્થરો દેખાય છે તેમની વચ્ચેનો કૂદકો જુઓ.",

    "When the steps are not equal": "જ્યારે પગલાં સરખાં ન હોય",
    "These jumps are not the same size. Look at where each one comes from.": "આ કૂદકા એકસરખા માપના નથી. જુઓ, દરેક કૂદકો ક્યાંથી બન્યો છે.",
    "Are the jumps all the same size?": "શું બધા કૂદકા એક જ માપના છે?",
    "Look at the stones behind the jump.": "કૂદકાની પાછળના પથ્થરો જુઓ.",
    "When the steps are not equal, look at what each step is: here each number is added to itself.": "પગલાં સરખાં ન હોય, ત્યારે જુઓ કે દરેક પગલું શું છે. અહીં દરેક સંખ્યામાં તે જ સંખ્યા ઉમેરાય છે.",
    "You learned: when jumps differ, see where each one comes from.": "તમે શીખ્યા: કૂદકા અલગ હોય, તો જુઓ દરેક ક્યાંથી બન્યો.",
    "The jumps go 6, then 12, then 24. What lands after 48?": "કૂદકા 6, પછી 12, પછી 24 છે. 48 પછી કઈ સંખ્યા આવશે?",
    "Put each jump beside the stone it starts from.": "દરેક કૂદકાને તેના શરૂઆતના પથ્થર પાસે મૂકો.",
    "9, 18, 36, 72. What fills the empty stone?": "9, 18, 36, 72. ખાલી પથ્થરમાં શું આવશે?",
    "Compare the first jump with the last one.": "પહેલા કૂદકાની સરખામણી છેલ્લા કૂદકા સાથે કરો.",
    "Your series runs 3, 4, 7. Each number adds the two before it. What comes next?": "તમારો ક્રમ 3, 4, 7 છે. દરેક સંખ્યા પાછલી બે સંખ્યાઓનો સરવાળો છે. આગળ શું આવશે?",
    "Which two stones does this jump come out of?": "આ કૂદકો કયા બે પથ્થરોથી બને છે?",

    "side by side": "સાથે-સાથે",
    "step back": "પાછળ જાઓ",
    "step on": "આગળ જાઓ",
    "tray": "ટ્રે",
    "your card": "તમારું કાર્ડ",
    "pair them": "જોડી બનાવો",
    "add a": "એક પગલું", "step": "ઉમેરો",
    "take a step": "એક પગલું", "away": "બાદ કરો",
    "add it to": "તેને પોતામાં", "itself": "ઉમેરો",
    "add the two": "પાછલી બે", "before": "ઉમેરો",
    "Jumps labelled": "લખાયેલા કૂદકા",
    "Counters paired": "જોડી બનેલી ગોટીઓ",
    "Stones filled": "ભરેલા પથ્થર",
    "less": "ઓછું",
    "more": "વધુ",
  },
};

/* One entry per phase = one mount. */
const PHASES = [
  {
    n: 1,
    concept: "The step between neighbours",
    conceptId: "M1.S2.T3.C8", objectiveIds: ["O3"],
    says: ["Tap a jump to find its size. Check them all before you fill a stone."],
    ladder: ["Is every jump the same size?", "Use that same jump again from the last stone."],
    closing: "The step is the same between every pair. A count down stops at zero.",
    learned: "You learned: find the step, check every jump, and stop at zero.",
    traceback: "every arc is labelled again from the left, two arcs stand side by side, and the next stone fills with its number",
    items: [
      /* learn ML1: answer in the plan = 27, 32, 37 */
      { qid: "M1.S2.T3.C8:ML1", kind: "track", answer: 27, slip: 26, winMs: 2600,
        track: { series: [7, 12, 17, 22, 27, 32, 37], given: 4 },
        ask: "Next stone?", say: "7, 12, 17, 22. What number lands on the next stone?",
        miss: "Find the jump from the first stone to the second." },
      /* practice 1: answer in the plan = 29, 35, 41 */
      { qid: "M1.S2.T3.C8:1", kind: "track", answer: 29, slip: 28, winMs: 2600,
        track: { series: [5, 11, 17, 23, 29, 35, 41], given: 4 },
        ask: "Next stone?", say: "Now 5, 11, 17, 23. Which number fills the empty stone?",
        miss: "Check the jump between the middle stones too." },
      /* practice 2: answer in the plan = 24, 16, 8 and 0. The step takes away 8 each time, and the count
         stops at zero; the graded term is the last one, where the count down has to stop */
      { qid: "M1.S2.T3.C8:2", kind: "track", answer: 0, slip: 8, winMs: 1800,
        track: { series: [56, 48, 40, 32, 24, 16, 8, 0], given: 7, down: true },
        ask: "Where does it stop?", say: "This track counts down. Where does this one stop?",
        miss: "Look at the stone at the far left of this track." },
    ],
  },
  {
    n: 2,
    concept: "Letters can step too",
    conceptId: "M1.S2.T3.C9", objectiveIds: ["O3"],
    says: ["Letters line up like numbers. A is 1, B is 2, all the way to Z."],
    ladder: ["How many landings does one jump take?", "Move the letter and its number together."],
    closing: "Letters step along the alphabet just as numbers step along counting.",
    learned: "You learned: letters step along the alphabet, each with its place.",
    traceback: "the walker counts landing by landing along the alphabet and the letter lights with its place written under it",
    items: [
      /* learn ML2: answer in the plan = J10, L12, N14 */
      { qid: "M1.S2.T3.C9:ML2", kind: "letter", answer: 10, slip: 9, winMs: 2200,
        letters: { seq: ["B", "D", "F", "H", "J", "L", "N"], given: 4 },
        ask: "Next place?", say: "B is at 2, D at 4, F at 6, H at 8. Which place comes next?",
        miss: "Count the landings from one letter to the next." },
      /* practice 3: answer in the plan = M and P, because each letter is three places on from the one before */
      { qid: "M1.S2.T3.C9:3", kind: "letter", answer: "M", slip: "L", winMs: 2200,
        choices: [{ id: "K", label: "K" }, { id: "L", label: "L" }, { id: "M", label: "M" }, { id: "N", label: "N" }],
        letters: { seq: ["A", "D", "G", "J", "M", "P"], given: 4 },
        ask: "Next letter?", say: "A, D, G, J. Which letter follows J?",
        miss: "Walk the track from J and count each landing." },
      /* practice 4: answer in the plan = P16, M13, J10, because each letter goes three places back and its number is its place in the alphabet */
      { qid: "M1.S2.T3.C9:4", kind: "letter", answer: 16, slip: 17, winMs: 2200,
        letters: { seq: ["Y", "V", "S", "P", "M", "J"], given: 3, down: true },
        ask: "Next place?", say: "Y is at 25, V at 22, S at 19. What place comes after S?",
        miss: "These letters go backwards. Which way does the place go?" },
    ],
  },
  {
    n: 3,
    concept: "Paired or one left over",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O4"],
    says: ["Set the counters out two by two, and look at what is left."],
    ladder: ["Think in twos. Does anything get left over?", "Odd and even take turns, all the way along."],
    closing: "A number that pairs up with none left over is even, and one that leaves one over is odd.",
    learned: "You learned: pairing with none over is even, one over is odd.",
    traceback: "the counters are set out two by two again, any counter left over stands apart, and the card turns to the right word",
    items: [
      /* learn ML3: answer in the plan = Five pairs with one button left over, so eleven is odd */
      { qid: "M1.S2.T3.C10:ML3", kind: "pair", answer: "odd", slip: "even", heap: 11, winMs: 1800,
        choices: [{ id: "even", label: "even" }, { id: "odd", label: "odd" }],
        ask: "Even or odd?", say: "Pair up these 11 buttons. Are they even or odd?",
        miss: "Count again at the end of the row. Is anyone alone?" },
      /* practice 5: answer in the plan = Even, because fourteen socks make seven pairs with none left over */
      { qid: "M1.S2.T3.C10:5", kind: "pair", answer: "even", slip: "odd", heap: 14, winMs: 1800,
        choices: [{ id: "even", label: "even" }, { id: "odd", label: "odd" }],
        ask: "Even or odd?", say: "Now 14 socks. Does every sock find a partner?",
        miss: "Do not go by the first digit. Lay all 14 out." },
      /* practice 6: answer in the plan = 39, 41 and 43. Each is odd, because adding two adds one more pair and the one left over stays */
      { qid: "M1.S2.T3.C10:6", kind: "track", answer: 39, slip: 38, winMs: 2600,
        track: { series: [31, 33, 35, 37, 39, 41, 43], given: 4, leftover: true },
        ask: "Next stone?", say: "31, 33, 35, 37. Which number lands next?",
        miss: "Look at the jump between the stones you can see." },
    ],
  },
  {
    n: 4,
    concept: "When the steps are not equal",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O4"],
    says: ["These jumps are not the same size. Look at where each one comes from."],
    ladder: ["Are the jumps all the same size?", "Look at the stones behind the jump."],
    closing: "When the steps are not equal, look at what each step is: here each number is added to itself.",
    learned: "You learned: when jumps differ, see where each one comes from.",
    traceback: "each jump is laid as a bar under the stone it starts from, two bars stand side by side, and the next stone fills",
    items: [
      /* learn ML4: answer in the plan = Each step is the number already reached, so 96 comes next */
      { qid: "M1.S2.T3.C11:ML4", kind: "track", answer: 96, slip: 72, winMs: 2400,
        track: { series: [6, 12, 24, 48, 96], given: 4, arcsGiven: true },
        ask: "Next stone?", say: "The jumps go 6, then 12, then 24. What lands after 48?",
        miss: "Put each jump beside the stone it starts from." },
      /* practice 7: answer in the plan = 144 and 288. The steps 9, 18 and 36 are not equal. Each step is the number already reached, so each number is added to itself: 72 + 72 = 144 and 144 + 144 = 288 */
      { qid: "M1.S2.T3.C11:7", kind: "track", answer: 144, slip: 108, winMs: 2600,
        track: { series: [9, 18, 36, 72, 144, 288], given: 4, arcsGiven: true },
        ask: "Next stone?", say: "9, 18, 36, 72. What fills the empty stone?",
        miss: "Compare the first jump with the last one." },
      /* practice 8: answer in the plan = 7, 11, 18 and 29, because 3 + 4 = 7, 4 + 7 = 11, 7 + 11 = 18 and 11 + 18 = 29 */
      { qid: "M1.S2.T3.C11:8", kind: "maker", answer: 11, slip: 10, winMs: 3000,
        track: { series: [3, 4, 7, 11, 18, 29], given: 3, twoBefore: true },
        ask: "Next stone?", say: "Your series runs 3, 4, 7. Each number adds the two before it. What comes next?",
        miss: "Which two stones does this jump come out of?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  stone: { w: 96, h: 96, gap: 12, pitch: 108, y: 150, h2: 96 },
  arc: { top: 148, apex: 80, ctrl: 57, pill: 34 },
  bar: { y: 268, h: 26, span: 100 },
  cmp: { w: 320, h: 150, y: 320 },
  letter: { w: 38, gap: 3, pitch: 41, x0: 11, y: 218, h: 52, place: 302, hit: 140, apex: 160, ctrl: 141, top: 216, badge: 316, walkY: 380 },
  tray: { x: 64, y: 150, w: 620, h: 250, cx: 374, cy: 275, col: 80, r: 22, top: 240, bot: 310 },
  card: { x: 770, y: 210, w: 200, h: 140 },
  maker: { x: 686, y: 300, w: 400, h: 196, kw: 190, kh: 88 },
  rules: [
    { id: "step", a: "add a", b: "step" },
    { id: "away", a: "take a step", b: "away" },
    { id: "self", a: "add it to", b: "itself" },
    { id: "two", a: "add the two", b: "before" },
  ],
  runs: [["Jumps labelled", 19], ["Jumps labelled", 16], ["Counters paired", 25], ["Jumps labelled", 14]],
  free: { stones: 6, start: 3, min: 2, max: 20 },
};

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work.
   Counting on by repeated addition, and the alphabet read as a plain string of letters. */
const oracle = () => {
  const countOn = (from: number, step: number, times: number) => { let x = from; for (let k = 0; k < times; k++) x = x + step; return x; };
  const at = (L: string) => ALPHA.indexOf(L) + 1;
  const rows: any[] = [
    [1, 0, countOn(22, 12 - 7, 1)],
    [1, 1, countOn(23, 11 - 5, 1)],
    [1, 2, countOn(56, 48 - 56, 7)],
    [2, 0, countOn(at("H"), at("D") - at("B"), 1)],
    [2, 1, ALPHA.charAt(at("J") - 1 + (at("D") - at("A")))],
    [2, 2, countOn(at("S"), at("V") - at("Y"), 1)],
    [3, 0, 11 - 2 * Math.floor(11 / 2) === 0 ? "even" : "odd"],
    [3, 1, 14 - 2 * Math.floor(14 / 2) === 0 ? "even" : "odd"],
    [3, 2, countOn(37, 33 - 31, 1)],
    [4, 0, countOn(48, 48, 1)],
    [4, 1, countOn(72, 72, 1)],
    [4, 2, countOn(4, 7, 1)],
  ];
  return rows.every((r: any) => String(PHASES[r[0] - 1].items[r[1]].answer) === String(r[2]));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.slip !== undefined ? item.slip : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print.
   A word-choice item names both of its words in the question, and the pad shows them: nothing is hidden. */
const answerForms = (item: any) => (item.choices ? []
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */

/* where each stone of a series sits. A count down is laid from the right, so it runs towards a
   zero stone at its left end and nothing is drawn beyond it. */
const laneOf = (i: number, len: number, down: boolean) => (down ? len - 1 - i : i);
const trackX0 = (len: number) => Math.round((1086 - (len * 96 + (len - 1) * 12)) / 2);
const stoneCx = (i: number, len: number, down: boolean) => trackX0(len) + laneOf(i, len, down) * 108 + 48;
/* one scale for every bar of a track, so a longer jump is plainly a longer bar */
const barScale = (series: number[]) => {
  const steps = series.slice(1).map((v: number, i: number) => Math.abs(v - series[i]));
  const head = steps.length > 1 ? steps.slice(0, -1) : steps;
  return 100 / Math.max(1, Math.max.apply(null, head as any));
};
const arcPath = (x1: number, x2: number, top: number, ctrl: number) =>
  `M ${x1} ${top} C ${x1} ${ctrl}, ${x2} ${ctrl}, ${x2} ${top}`;
const signed = (d: number) => (d < 0 ? "−" + Math.abs(d) : "+" + d);
const heapSpot = (k: number, total: number, M: any) => {
  const a = (k * 2.399963) % (Math.PI * 2);
  const r = 18 + 64 * Math.sqrt((k + 1) / (total + 1));
  return { x: M.tray.cx + r * Math.cos(a) * 1.75, y: M.tray.cy + r * Math.sin(a) };
};
const pairSpot = (k: number, heap: number, M: any) => {
  const alone = heap % 2 === 1 && k === heap - 1;
  const col = Math.floor(k / 2);
  return { x: M.tray.x + 64 + col * M.tray.col + (alone ? 44 : 0), y: alone ? M.tray.cy : k % 2 === 0 ? M.tray.top : M.tray.bot, alone };
};
/* free play: a start and a rule make a series of your own */
const freeSeries = (s: number, rule: string, len: number) => {
  const out: number[] = [s];
  if (rule === "step") { for (let k = 1; k < len; k++) out.push(out[k - 1] + 2); }
  else if (rule === "away") { for (let k = 1; k < len; k++) { const v = out[k - 1] - 2; if (v < 0) break; out.push(v); } }
  else if (rule === "self") { for (let k = 1; k < len; k++) out.push(out[k - 1] + out[k - 1]); }
  else if (rule === "two") { out.push(s + 2); for (let k = 2; k < len; k++) out.push(out[k - 1] + out[k - 2]); }
  return out;
};

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [labs, setLabs] = useState<number[]>([]);
  const [walk, setWalk] = useState(0);
  const [pairN, setPairN] = useState(0);
  const [rule, setRule] = useState("");
  const [cmp, setCmp] = useState<number[]>([]);
  const [won, setWon] = useState(0);
  const [demo, setDemo] = useState<any>(null);
  const [zeroLit, setZeroLit] = useState(false);
  const [fStart, setFStart] = useState(MODEL.free.start);
  const [fRule, setFRule] = useState("");
  const [fFill, setFFill] = useState(0);

  api.onEnter(null);

  const free = stage === "free";
  const trk = item && item.track;
  const ltr = item && item.letters;
  const winAll = stage === "win" || stage === "idle" || won > 0;

  /* a fresh question: the working area starts over */
  useEffect(() => {
    tl.stop(); setLabs([]); setWalk(0); setPairN(0); setRule(""); setCmp([]); setWon(0); setDemo(null); setZeroLit(false);
  }, [n, index]);
  useEffect(() => { if (free) { setFRule(""); setFFill(0); } }, [free]);

  /* winning is the maths moving: the blank stones fill one jump at a time */
  useEffect(() => {
    if (stage !== "win") return;
    setDemo(null);
    const steps: any[] = [];
    if (trk) {
      const blanks = trk.series.length - trk.given;
      for (let k = 1; k <= blanks; k++) { const kk = k; steps.push([360, () => setWon(kk)]); }
      if (trk.down) steps.push([320, () => setZeroLit(true)]);
    } else if (ltr) {
      const blanks = ltr.seq.length - ltr.given;
      for (let k = 1; k <= blanks; k++) { const kk = k; steps.push([340, () => setWon(kk)]); }
    }
    if (steps.length) tl.run(steps);
  }, [stage, index, n]);

  /* the traceback: redraw the mathematics, ending on the whole right answer. It is drawn on a
     demo-only layer, so the child's own arcs, counters and rule stay theirs and nothing is undone. */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const steps: any[] = [];
    if (item.kind === "track") {
      const known = trk.given - 1;
      for (let j = 0; j < known; j++) { const jj = j; steps.push([420, () => setDemo((d: any) => ({ ...(d || {}), labs: [...((d && d.labs) || []), jj] }))]); }
      steps.push([520, () => setDemo((d: any) => ({ ...(d || {}), cmp: known > 1 ? [0, known - 1] : [0] }))]);
      steps.push([560, () => setDemo((d: any) => ({ ...(d || {}), fill: 1 }))]);
      steps.push([460, () => setDemo((d: any) => ({ ...(d || {}), labs: [...((d && d.labs) || []), known] }))]);
      if (trk.down) steps.push([500, () => setDemo((d: any) => ({ ...(d || {}), zero: true }))]);
      steps.push([600, () => {}]);
    } else if (item.kind === "letter") {
      const from = ALPHA.indexOf(ltr.seq[ltr.given - 1]);
      const to = ALPHA.indexOf(ltr.seq[ltr.given]);
      const dir = to > from ? 1 : -1;
      for (let k = 1; k <= Math.abs(to - from); k++) { const kk = k; steps.push([300, () => setDemo((d: any) => ({ ...(d || {}), walk: from + dir * kk, count: kk }))]); }
      steps.push([560, () => setDemo((d: any) => ({ ...(d || {}), lit: 1 }))]);
      steps.push([600, () => {}]);
    } else if (item.kind === "pair") {
      steps.push([260, () => setDemo({ pair: 0 })]);
      for (let k = 2; k <= item.heap; k += 2) { const kk = Math.min(k, item.heap); steps.push([240, () => setDemo((d: any) => ({ ...(d || {}), pair: kk }))]); }
      if (item.heap % 2 === 1) steps.push([300, () => setDemo((d: any) => ({ ...(d || {}), pair: item.heap }))]);
      steps.push([560, () => setDemo((d: any) => ({ ...(d || {}), card: item.answer }))]);
      steps.push([600, () => {}]);
    } else {
      for (let j = 0; j < trk.given - 1; j++) { const jj = j; steps.push([380, () => setDemo((d: any) => ({ ...(d || {}), labs: [...((d && d.labs) || []), jj] }))]); }
      steps.push([420, () => setDemo((d: any) => ({ ...(d || {}), cmp: [0, trk.given - 2] }))]);
      steps.push([540, () => setDemo((d: any) => ({ ...(d || {}), arcsIn: true }))]);
      steps.push([680, () => setDemo((d: any) => ({ ...(d || {}), fill: 1 }))]);
      steps.push([600, () => {}]);
    }
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* the child's next act clears the demo layer, so a correction is never undone and never stands in the way */
  const act = () => { if (demo) setDemo(null); };

  const dLabs: number[] = (demo && demo.labs) || [];
  const fill = won + ((demo && demo.fill) || 0);
  const shownPair = Math.max(pairN, (demo && demo.pair) || 0);

  /* ── the number track ─────────────────────────────────────────────────────────────── */
  const drawTrack = () => {
    const S = trk.series, len = S.length, down = !!trk.down;
    const known = trk.given + fill;
    const sc = barScale(S);
    const tapArc = (j: number) => { act(); if (labs.indexOf(j) >= 0) return; setLabs(labs.concat([j])); setCmp(cmp.concat([j]).slice(-2)); api.sfx.tick(); };
    const shown = (j: number) => labs.indexOf(j) >= 0 || dLabs.indexOf(j) >= 0 || winAll;
    const firstOpen = trk.arcsGiven ? -1 : (() => { for (let j = 0; j + 1 < known; j++) if (labs.indexOf(j) < 0) return j; return -1; })();
    const pair = (demo && demo.cmp) || cmp;
    return (
      <g>
        {S.map((v: number, i: number) => {
          if (i >= known) return null;
          const x = stoneCx(i, len, down) - 48, made = i >= trk.given;
          const lit = (zeroLit || !!(demo && demo.zero)) && down && i === len - 1;
          return (
            <g key={"s" + i}>
              <rect x={x} y={MODEL.stone.y} width={96} height={96} rx={RAD.panel} fill={`url(#${made ? "gOne" : "gHundred"})`}
                stroke={lit ? shade(CONTENT.bead, 0.25) : shade(made ? CONTENT.one : CONTENT.hundred, 0.25)} strokeWidth={lit ? 6 : 2} filter="url(#fShadowSoft)" />
              <text x={x + 48} y={MODEL.stone.y + 62} textAnchor="middle" fontSize={String(v).length > 2 ? T.label : T.speech} fontWeight={700}
                fill="#FFFFFF" stroke={shade(made ? CONTENT.one : CONTENT.hundred, 0.3)} strokeWidth={3} paintOrder="stroke">{indian(v)}</text>
              {trk.leftover && <circle cx={x + 48} cy={MODEL.stone.y + 80} r={10} fill={`url(#gBead)`} stroke={shade(CONTENT.bead, 0.25)} strokeWidth={1.5} />}
            </g>
          );
        })}
        {S.map((v: number, i: number) => {
          if (i < known) return null;
          const x = stoneCx(i, len, down) - 48;
          return <rect key={"b" + i} x={x} y={MODEL.stone.y} width={96} height={96} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} strokeDasharray="8 8" />;
        })}
        {S.slice(1).map((v: number, j: number) => {
          if (j + 1 >= known) return null;
          const x1 = stoneCx(j, len, down), x2 = stoneCx(j + 1, len, down), mid = (x1 + x2) / 2;
          const d = v - S[j], on = shown(j) || !!trk.arcsGiven, label = on;
          return (
            <g key={"a" + j}>
              <path d={arcPath(x1, x2, MODEL.arc.top, MODEL.arc.ctrl)} fill="none"
                stroke={on ? shade(CONTENT.pointer, 0.25) : C.rule} strokeWidth={on ? 5 : 4} strokeLinecap="round" strokeDasharray={on ? undefined : "7 8"} />
              <path d={`M ${x2} ${MODEL.arc.top} l ${down ? 11 : -11} -13 l ${down ? 3 : -3} 16 z`} fill={on ? shade(CONTENT.pointer, 0.25) : C.rule} />
              {label && <g>
                <rect x={mid - 34} y={MODEL.arc.apex - 20} width={68} height={40} rx={12} fill="#FFFFFF" stroke={shade(CONTENT.pointer, 0.25)} strokeWidth={2} />
                <text x={mid} y={MODEL.arc.apex + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(CONTENT.pointer, 0.25)}>{signed(d)}</text>
              </g>}
            </g>
          );
        })}
        {S.slice(1).map((v: number, j: number) => {
          if (j + 1 >= known || !shown(j)) return null;
          const d = Math.abs(v - S[j]) * sc, x1 = stoneCx(j, len, down);
          const bx = down ? x1 - d : x1;
          return <rect key={"r" + j} x={bx} y={MODEL.bar.y} width={Math.max(8, d)} height={MODEL.bar.h} rx={8} fill="url(#gPointer)" stroke={shade(CONTENT.pointer, 0.25)} strokeWidth={1.5} />;
        })}
        {S.slice(1).map((v: number, j: number) => {
          if (j + 1 >= known) return null;
          const x1 = stoneCx(j, len, down), x2 = stoneCx(j + 1, len, down);
          return <Hit key={"h" + j} id={"arc-" + j} x={Math.min(x1, x2) + 8} y={MODEL.arc.apex - 46} w={92} h={92} onPress={() => tapArc(j)} label={"jump " + (j + 1)} />;
        })}
        {stage !== "win" && stage !== "idle" && firstOpen >= 0 && !demo && (item.kind !== "maker" || !!rule) &&
          <Invite x={(stoneCx(firstOpen, len, down) + stoneCx(firstOpen + 1, len, down)) / 2} y={MODEL.arc.apex} r={44} C={C} />}
        {stage !== "win" && stage !== "idle" && trk.arcsGiven && !demo && known < len &&
          <Invite x={stoneCx(known, len, down)} y={MODEL.stone.y + 48} r={58} C={C} />}
        {drawCompare(pair, S, sc, down)}
      </g>
    );
  };

  /* two jumps stood side by side: a difference in length is seen at once */
  const drawCompare = (pick: number[], S: number[], sc: number, down: boolean) => {
    const x0 = item.kind === "maker" ? 40 : Math.round((1086 - MODEL.cmp.w) / 2);
    const use = pick.filter((j: number) => j + 1 < S.length).slice(-2);
    return (
      <g>
        <rect x={x0} y={MODEL.cmp.y} width={MODEL.cmp.w} height={MODEL.cmp.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={x0 + MODEL.cmp.w / 2} y={MODEL.cmp.y + 34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={shade(C.accent, 0.35)}>{tx("side by side")}</text>
        {use.map((j: number, k: number) => {
          const d = Math.abs(S[j + 1] - S[j]);
          const w = Math.max(16, Math.min(128, d * sc * 1.3));
          const cx = x0 + 86 + k * 148;
          return (
            <g key={"c" + j}>
              <path d={arcPath(cx - w / 2, cx + w / 2, MODEL.cmp.y + 112, MODEL.cmp.y + 58)} fill="none" stroke={shade(CONTENT.pointer, 0.25)} strokeWidth={5} strokeLinecap="round" />
              <text x={cx} y={MODEL.cmp.y + 142} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(CONTENT.pointer, 0.25)}>{signed(S[j + 1] - S[j])}</text>
            </g>
          );
        })}
      </g>
    );
  };

  /* ── the letter track ─────────────────────────────────────────────────────────────── */
  const drawLetters = () => {
    const L = MODEL.letter, seq = ltr.seq, known = ltr.given + fill, down = !!ltr.down;
    const idxOf = (s: string) => ALPHA.indexOf(s);
    const cx = (k: number) => L.x0 + k * L.pitch + L.w / 2;
    const wk = demo && demo.walk !== undefined ? demo.walk : walk;
    const wc = wk + 1; /* the badge is the place the walker stands on: A is 1, B is 2 */
    const litIdx = seq.slice(0, known).map(idxOf);
    const extra = demo && demo.lit ? [idxOf(seq[ltr.given])] : [];
    const all = litIdx.concat(extra);
    const tapArc = (j: number) => { act(); if (labs.indexOf(j) >= 0) return; setLabs(labs.concat([j])); api.sfx.tick(); };
    const shown = (j: number) => labs.indexOf(j) >= 0 || winAll || (demo && demo.lit);
    const firstOpen = (() => { for (let j = 0; j + 1 < known; j++) if (labs.indexOf(j) < 0) return j; return -1; })();
    return (
      <g>
        {ALPHA.split("").map((s: string, k: number) => {
          const on = all.indexOf(k) >= 0;
          return (
            <g key={"L" + k}>
              <rect x={L.x0 + k * L.pitch} y={L.y} width={L.w} height={L.h} rx={8} fill={on ? "url(#gHundred)" : "#FFFFFF"}
                stroke={on ? shade(CONTENT.hundred, 0.25) : C.rule} strokeWidth={2} />
              <text x={cx(k)} y={L.y + 37} textAnchor="middle" fontSize={T.label} fontWeight={on ? 700 : 500}
                fill={on ? "#FFFFFF" : C.accent} stroke={on ? shade(CONTENT.hundred, 0.3) : undefined} strokeWidth={on ? 3 : undefined} paintOrder={on ? "stroke" : undefined}>{s}</text>
              {on && <text x={cx(k)} y={L.place} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(CONTENT.hundred, 0.25)}>{k + 1}</text>}
            </g>
          );
        })}
        {seq.slice(1).map((s: string, j: number) => {
          if (j + 1 >= known) return null;
          const x1 = cx(idxOf(seq[j])), x2 = cx(idxOf(s)), mid = (x1 + x2) / 2, on = shown(j);
          const d = idxOf(s) - idxOf(seq[j]);
          return (
            <g key={"la" + j}>
              <path d={arcPath(x1, x2, L.top, L.ctrl)} fill="none" stroke={on ? shade(CONTENT.pointer, 0.25) : C.rule} strokeWidth={on ? 5 : 4} strokeLinecap="round" strokeDasharray={on ? undefined : "7 8"} />
              {on && <g>
                <rect x={mid - 32} y={L.apex - 19} width={64} height={38} rx={12} fill="#FFFFFF" stroke={shade(CONTENT.pointer, 0.25)} strokeWidth={2} />
                <text x={mid} y={L.apex + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(CONTENT.pointer, 0.25)}>{signed(d)}</text>
              </g>}
            </g>
          );
        })}
        {seq.slice(1).map((s: string, j: number) => {
          if (j + 1 >= known) return null;
          const x1 = cx(idxOf(seq[j])), x2 = cx(idxOf(s)), mid = (x1 + x2) / 2, w = Math.max(72, Math.abs(x2 - x1) - 16);
          return <Hit key={"lh" + j} id={"arc-" + j} x={mid - w / 2} y={L.hit} w={w} h={72} onPress={() => tapArc(j)} label={"jump " + (j + 1)} />;
        })}
        {(() => {
          const bx = Math.max(3, Math.min(1086 - 71, cx(wk) - 34));
          return (
            <g>
              <path d={`M ${cx(wk)} ${L.y - 8} l -13 -18 h 26 z`} fill={shade(CONTENT.pointer, 0.25)} />
              <rect x={L.x0 + wk * L.pitch - 4} y={L.y - 4} width={L.w + 8} height={L.h + 8} rx={10} fill="none" stroke={shade(CONTENT.pointer, 0.25)} strokeWidth={4} />
              <rect x={bx} y={L.badge} width={68} height={42} rx={12} fill="url(#gPointer)" stroke={shade(CONTENT.pointer, 0.25)} strokeWidth={2} />
              <text x={bx + 34} y={L.badge + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF"
                stroke={shade(CONTENT.pointer, 0.3)} strokeWidth={3} paintOrder="stroke">{wc}</text>
            </g>
          );
        })()}
        <Key id="walk-back" label="step back" x={300} y={L.walkY} w={200} h={80} C={C} disabled={wk <= 0}
          onClick={() => { act(); setWalk(Math.max(0, wk - 1)); api.sfx.tick(); }}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={wk <= 0 ? mix(C.ink, C.panel, 0.5) : C.ink}>{tx("step back")}</text>
        </Key>
        <Key id="walk-on" label="step on" x={586} y={L.walkY} w={200} h={80} C={C} disabled={wk >= 25}
          onClick={() => { act(); setWalk(Math.min(25, wk + 1)); api.sfx.tick(); }}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={wk >= 25 ? mix(C.ink, C.panel, 0.5) : C.ink}>{tx("step on")}</text>
        </Key>
        {stage !== "win" && stage !== "idle" && firstOpen >= 0 && !demo &&
          <Invite x={(cx(idxOf(seq[firstOpen])) + cx(idxOf(seq[firstOpen + 1]))) / 2} y={L.apex} r={40} C={C} />}
      </g>
    );
  };

  /* ── the pairing tray ─────────────────────────────────────────────────────────────── */
  const drawTray = () => {
    const M = MODEL.tray, heap = item.heap;
    const card = (demo && demo.card) || (stage === "win" || stage === "idle" ? item.answer : typed);
    const runPair = () => {
      act();
      const steps: any[] = [];
      for (let k = 2; k <= heap; k += 2) { const kk = Math.min(k, heap); steps.push([220, () => { setPairN(kk); api.sfx.tick(); }]); }
      if (heap % 2 === 1) steps.push([260, () => setPairN(heap)]);
      steps.push([200, () => {}]);
      tl.run(steps);
    };
    return (
      <g>
        <rect x={M.x} y={M.y} width={M.w} height={M.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={M.x + 20} y={M.y + 36} fontSize={T.micro} fontWeight={600} fill={shade(C.accent, 0.35)}>{tx("tray")}</text>
        {Array.from({ length: heap }).map((_: any, k: number) => {
          const laid = k < shownPair;
          const p = laid ? pairSpot(k, heap, MODEL) : heapSpot(k, heap, MODEL);
          return <Disc key={"d" + k} x={p.x} y={p.y} r={M.r} paint={laid && (p as any).alone ? "gBead" : "gHundred"} flat />;
        })}
        <text x={MODEL.card.x + MODEL.card.w / 2} y={MODEL.card.y - 16} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={shade(C.accent, 0.35)}>{tx("your card")}</text>
        <rect x={MODEL.card.x} y={MODEL.card.y} width={MODEL.card.w} height={MODEL.card.h} rx={RAD.panel}
          fill={card ? "#FFFFFF" : "url(#gPanel)"} stroke={C.rule} strokeWidth={3} />
        {card
          ? <text x={MODEL.card.x + MODEL.card.w / 2} y={MODEL.card.y + 88} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{tx(String(card))}</text>
          : <path d={`M ${MODEL.card.x + 50} ${MODEL.card.y + 70} H ${MODEL.card.x + 150}`} stroke={C.rule} strokeWidth={4} strokeLinecap="round" />}
        <Key id="pair-them" label="pair them" x={250} y={430} w={220} h={80} C={C} disabled={shownPair >= heap} onClick={runPair}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={shownPair >= heap ? mix(C.ink, C.panel, 0.5) : C.ink}>{tx("pair them")}</text>
        </Key>
        {stage !== "win" && stage !== "idle" && shownPair < heap && !demo && <Invite x={360} y={470} r={54} C={C} />}
      </g>
    );
  };

  /* ── the rule maker ───────────────────────────────────────────────────────────────── */
  const drawMaker = () => {
    const M = MODEL.maker;
    const pick = (id: string) => { act(); setRule(id); api.sfx.tick(); };
    return (
      <g>
        {MODEL.rules.map((r: any, k: number) => {
          const x = M.x + (k % 2) * (M.kw + 20), y = M.y + Math.floor(k / 2) * (M.kh + 20);
          const on = rule === r.id;
          return (
            <Key key={r.id} id={"rule-" + r.id} label={r.a + " " + r.b} x={x} y={y} w={M.kw} h={M.kh} C={C} primary={on} onClick={() => pick(r.id)}>
              <text y={-6} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={on ? "#FFFFFF" : C.ink}>{tx(r.a)}</text>
              <text y={26} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={on ? "#FFFFFF" : C.ink}>{tx(r.b)}</text>
            </Key>
          );
        })}
        {stage !== "win" && stage !== "idle" && !rule && !demo && <Invite x={M.x + M.kw / 2} y={M.y + M.kh / 2} r={40} C={C} />}
      </g>
    );
  };

  /* the rule drawn into the next stone: where the jump comes from, never what it makes */
  const drawRuleArcs = () => {
    const S = trk.series, len = S.length;
    const shows = demo && demo.arcsIn;
    const known = shows ? trk.given : trk.given + fill;
    const r = shows ? "two" : rule;
    if (!r || known >= len) return null;
    const to = stoneCx(known, len, false);
    const from = r === "two" ? [known - 2, known - 1] : r === "self" ? [known - 1, known - 1] : [known - 1];
    return (
      <g>
        {from.map((i: number, k: number) => {
          if (i < 0) return null;
          const x1 = stoneCx(i, len, false);
          return <path key={"ra" + k} d={arcPath(x1, to, MODEL.arc.top, MODEL.arc.ctrl - k * 26)} fill="none"
            stroke={shade(CONTENT.pointer, 0.25)} strokeWidth={4} strokeDasharray="10 8" strokeLinecap="round" />;
        })}
      </g>
    );
  };

  /* ── free play: a start and a rule, and the track fills ───────────────────────────── */
  const drawFree = () => {
    const len = MODEL.free.stones;
    const S = fRule ? freeSeries(fStart, fRule, len) : [fStart];
    const shownN = fRule ? Math.min(fFill, S.length) : 1;
    const sc = barScale(S.length > 1 ? S : [fStart, fStart + 2]);
    const play = (id: string) => {
      setFRule(id); setFFill(1);
      const ser = freeSeries(fStart, id, len);
      const steps: any[] = [];
      for (let k = 2; k <= ser.length; k++) { const kk = k; steps.push([360, () => { setFFill(kk); api.sfx.tick(); }]); }
      steps.push([200, () => {}]);
      tl.run(steps);
    };
    const bump = (d: number) => { setFRule(""); setFFill(0); setFStart(Math.max(MODEL.free.min, Math.min(MODEL.free.max, fStart + d))); api.sfx.tick(); };
    return (
      <g>
        {Array.from({ length: len }).map((_: any, i: number) => {
          const x = trackX0(len) + i * 108;
          const v = i < shownN ? S[i] : null;
          return v === null
            ? <rect key={"fb" + i} x={x} y={MODEL.stone.y} width={96} height={96} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} strokeDasharray="8 8" />
            : <g key={"fs" + i}>
                <rect x={x} y={MODEL.stone.y} width={96} height={96} rx={RAD.panel} fill={`url(#${i === 0 ? "gHundred" : "gOne"})`}
                  stroke={shade(i === 0 ? CONTENT.hundred : CONTENT.one, 0.25)} strokeWidth={2} filter="url(#fShadowSoft)" />
                <text x={x + 48} y={MODEL.stone.y + 62} textAnchor="middle" fontSize={String(v).length > 2 ? T.label : T.speech} fontWeight={700}
                  fill="#FFFFFF" stroke={shade(i === 0 ? CONTENT.hundred : CONTENT.one, 0.3)} strokeWidth={3} paintOrder="stroke">{indian(v)}</text>
              </g>;
        })}
        {S.slice(1).map((v: number, j: number) => {
          if (j + 1 >= shownN) return null;
          const x1 = trackX0(len) + j * 108 + 48, x2 = x1 + 108, mid = x1 + 54;
          return (
            <g key={"fa" + j}>
              <path d={arcPath(x1, x2, MODEL.arc.top, MODEL.arc.ctrl)} fill="none" stroke={shade(CONTENT.pointer, 0.25)} strokeWidth={5} strokeLinecap="round" />
              <rect x={mid - 34} y={MODEL.arc.apex - 20} width={68} height={40} rx={12} fill="#FFFFFF" stroke={shade(CONTENT.pointer, 0.25)} strokeWidth={2} />
              <text x={mid} y={MODEL.arc.apex + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(CONTENT.pointer, 0.25)}>{signed(v - S[j])}</text>
            </g>
          );
        })}
        {fRule === "away" && S[S.length - 1] - 2 < 0 && shownN >= S.length &&
          <circle cx={trackX0(len) + (S.length - 1) * 108 + 48} cy={MODEL.stone.y + 48} r={62} fill="none" stroke={shade(CONTENT.bead, 0.25)} strokeWidth={6} />}
        <Key id="start-less" label="smaller start" x={225} y={290} w={140} h={80} C={C} disabled={fStart <= MODEL.free.min} onClick={() => bump(-1)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={fStart <= MODEL.free.min ? mix(C.ink, C.panel, 0.5) : C.ink}>{tx("less")}</text>
        </Key>
        <Key id="start-more" label="bigger start" x={381} y={290} w={140} h={80} C={C} disabled={fStart >= MODEL.free.max} onClick={() => bump(1)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={fStart >= MODEL.free.max ? mix(C.ink, C.panel, 0.5) : C.ink}>{tx("more")}</text>
        </Key>
        {MODEL.rules.map((r: any, k: number) => {
          const M = MODEL.maker, x = M.x + (k % 2) * (M.kw + 20), y = M.y + Math.floor(k / 2) * (M.kh + 20);
          const on = fRule === r.id;
          return (
            <Key key={r.id} id={"rule-" + r.id} label={r.a + " " + r.b} x={x} y={y} w={M.kw} h={M.kh} C={C} primary={on} onClick={() => play(r.id)}>
              <text y={-6} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={on ? "#FFFFFF" : C.ink}>{tx(r.a)}</text>
              <text y={26} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={on ? "#FFFFFF" : C.ink}>{tx(r.b)}</text>
            </Key>
          );
        })}
        {!fRule && <Invite x={MODEL.maker.x + MODEL.maker.kw / 2} y={MODEL.maker.y + MODEL.maker.kh / 2} r={40} C={C} />}
      </g>
    );
  };

  /* the running count: what this phase has filled against what it holds. It never counts down
     and it is never a score. */
  const unitOf = (it: any) => (n === 3 ? it.heap || 0 : it.track ? it.track.series.length - 1 : it.letters ? it.letters.seq.length - 1 : 0);
  const doneBefore = phase.items.slice(0, index).reduce((a: number, it: any) => a + unitOf(it), 0);
  const liveCount = n === 3 ? (item.heap ? shownPair : 0) : trk && trk.arcsGiven ? trk.given - 1 : labs.length;
  const nowCount = free ? 0 : winAll ? unitOf(item) : liveCount;
  const runLabel = tx(free ? "Stones filled" : MODEL.runs[n - 1][0]);
  const runTotal = free ? MODEL.free.stones : MODEL.runs[n - 1][1];
  const runNow = free ? (fRule ? Math.min(fFill, freeSeries(fStart, fRule, MODEL.free.stones).length) : 1) : doneBefore + nowCount;

  /* what the host and the agent read back (toolApi.getState): only what is on the stage */
  api.share({
    terms: trk ? trk.series.slice(0, trk.given + fill) : null,
    arcs: labs.slice().sort((a: number, b: number) => a - b),
    step: trk && trk.series.length > 1 ? trk.series[1] - trk.series[0] : ltr ? ALPHA.indexOf(ltr.seq[1]) - ALPHA.indexOf(ltr.seq[0]) : null,
    letterTrack: ltr ? ltr.seq.slice(0, ltr.given + fill) : null,
    paired: item && item.heap ? shownPair : null,
    leftOver: item && item.heap ? (shownPair >= item.heap && item.heap % 2 === 1 ? 1 : 0) : null,
    start: free ? fStart : trk ? trk.series[0] : null,
    rule: free ? fRule : rule,
  });

  return (
    <g>
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={-60} fontSize={T.micro} fontWeight={600} fill={shade(C.accent, 0.35)}>{runLabel}</text>
        <text x={18} y={-26} fontSize={T.label} fontWeight={700} fill={C.ink}>{runNow + " / " + runTotal}</text>
      </g>
      {free ? drawFree()
        : item.kind === "pair" ? drawTray()
        : item.kind === "letter" ? drawLetters()
        : <g>{drawTrack()}{item.kind === "maker" ? <g>{drawRuleArcs()}{drawMaker()}</g> : null}</g>}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const v = last ? last.value : null;
  if (v === null || v === undefined || v === "") return null;
  const num = /^\d+$/.test(String(v));
  return (
    <g>
      <path d={arcPath(w / 2 - 54, w / 2 + 54, h / 2 - 6, h / 2 - 44)} fill="none" stroke={shade(CONTENT.pointer, 0.25)} strokeWidth={4} strokeLinecap="round" />
      <rect x={w / 2 - 54} y={h / 2 - 2} width={108} height={52} rx={12} fill={`url(#${num ? "gOne" : "gHundred"})`} stroke={shade(num ? CONTENT.one : CONTENT.hundred, 0.25)} strokeWidth={2} />
      <text x={w / 2} y={h / 2 + 36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF"
        stroke={shade(num ? CONTENT.one : CONTENT.hundred, 0.3)} strokeWidth={3} paintOrder="stroke">{tx(String(v))}</text>
    </g>
  );
}

function StepTrack(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default StepTrack;
