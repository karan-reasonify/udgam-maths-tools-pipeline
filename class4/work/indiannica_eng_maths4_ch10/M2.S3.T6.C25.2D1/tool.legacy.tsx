/* ═══ M2.S3.T6.C20.2D1 · pattern_lines · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "pattern_lines";
const MEDIA_ID = "M2.S3.T6.C20.2D1";
const TOOL_NAME = "Pattern Lines";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A board of sums, one to a line. Read down the answers before you write."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every board read, and every guess checked against a line worked in full.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any board, with the jumps, the slate and the hide control open.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. Terms (NCERT class 4): a jump (the gap between two answers) is
   छलाँग / છલાંગ, the difference अंतर / તફાવત, the growth of the jumps बढ़त / વધારો, a line of the board
   पंक्ति / લીટી, a row of counters कतार / હરોળ, a counter टोकन / ટોકન, a rod of counters छड़ / સળિયો,
   a column खाना / ખાનું, a times table पहाड़ा / ઘડિયો, the sum योग / સરવાળો. Digits stay digits: the runtime
   speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Pattern Lines": "पैटर्न की पंक्तियाँ",
    "A board of sums, one to a line. Read down the answers before you write.": "सवालों का एक बोर्ड, हर पंक्ति में एक। लिखने से पहले उत्तर ऊपर से नीचे पढ़ो।",
    "Every board read, and every guess checked against a line worked in full.": "हर बोर्ड पढ़ा गया। हर अनुमान एक पूरी हल की पंक्ति से जाँचा गया।",
    "Free play. Any board, with the jumps, the slate and the hide control open.": "मुक्त खेल। कोई भी बोर्ड, छलाँगें, स्लेट और छिपाने का बटन, सब खुले हैं।",

    "Adding numbers that sit side by side": "पास-पास वाली संख्याओं को जोड़ना",
    "Double the bigger one and take one away. Is it the same as the sum?": "बड़ी संख्या को दुगुना करो और एक घटा दो। क्या यह योग के बराबर है?",
    "Lay the longer rod down twice over, then lift one counter off the end.": "लंबी छड़ को दो बार रखो, फिर आखिर से एक टोकन उठा लो।",
    "Count along both rows and see where each one finishes.": "दोनों कतारों में गिनो और देखो कि हर एक कहाँ खत्म होती है।",
    "Two numbers side by side add to one less than twice the greater. Three of them add to three times the middle.": "पास-पास की दो संख्याओं का योग बड़ी संख्या के दुगुने से एक कम है। तीन संख्याओं का योग बीच वाली का तीन गुना है।",
    "You learned: two side by side make one less than twice the greater.": "तुमने सीखा: पास-पास की दो संख्याओं का योग बड़ी के दुगुने से एक कम।",
    "Two rods lie here, 12 and 13. Tap the longer one, then write the total.": "यहाँ दो छड़ें हैं, 12 और 13। लंबी वाली पर टैप करो, फिर योग लिखो।",
    "Which of the two rods holds more counters?": "दोनों छड़ों में से किसमें ज़्यादा टोकन हैं?",
    "Three rods this time, 24, 25 and 26. What do all three come to?": "इस बार तीन छड़ें हैं, 24, 25 और 26। तीनों का योग क्या है?",
    "One rod sits between the other two. Which number is that?": "एक छड़ बाकी दो के बीच में है। वह कौन सी संख्या है?",
    "Now 30 and 31 lie side by side. What is their total?": "अब 30 और 31 पास-पास हैं। इनका योग क्या है?",
    "Count the counters in the shorter rod, then in the longer one.": "छोटी छड़ के टोकन गिनो, फिर लंबी छड़ के।",

    "Digits marching down a times table": "पहाड़े में नीचे चलते अंक",
    "Read down the ones. Now read down the tens. What does each column do?": "इकाई को ऊपर से नीचे पढ़ो। अब दहाई को पढ़ो। हर खाना क्या करता है?",
    "A column of tens counts whole tens, so 108 holds ten of them.": "दहाई का खाना पूरी दहाइयाँ गिनता है। इसलिए 108 में दस दहाइयाँ हैं।",
    "Split each answer into its tens and its ones, then read each column down.": "हर उत्तर को दहाई और इकाई में बाँटो, फिर हर खाने को नीचे पढ़ो।",
    "In the nine table the ones count down while the tens count up. In the five table the ones take turns.": "नौ के पहाड़े में इकाई घटती है और दहाई बढ़ती है। पाँच के पहाड़े में इकाई बारी-बारी से आती है।",
    "You learned: in the nine table the ones fall while the tens rise.": "तुमने सीखा: नौ के पहाड़े में इकाई घटती है, दहाई बढ़ती है।",
    "Nine times table. Tap a column to walk it, then write what 14 × 9 makes.": "नौ का पहाड़ा। खाने पर टैप करके नीचे पढ़ो। फिर 14 × 9 का उत्तर लिखो।",
    "How many whole tens does 108 hold? Not the digit, the count.": "108 में पूरी कितनी दहाइयाँ हैं? अंक नहीं, गिनती बताओ।",
    "Five times table now. Watch the ones take turns, then write 5 × 14.": "अब पाँच का पहाड़ा। इकाई को बारी-बारी से आते देखो। फिर 5 × 14 लिखो।",
    "Do the tens here climb on every line, or on every second one?": "यहाँ दहाई हर पंक्ति में बढ़ती है, या हर दूसरी में?",
    "Ten times table. The ones stay still. Write what 18 × 10 makes.": "दस का पहाड़ा। इकाई वही रहती है। 18 × 10 का उत्तर लिखो।",
    "Count the tens in 170. How many will the next line hold?": "170 में दहाइयाँ गिनो। अगली पंक्ति में कितनी होंगी?",

    "When the jumps grow": "जब छलाँगें बढ़ती हैं",
    "Look at the jumps. How much bigger is each one than the last?": "छलाँगों को देखो। हर छलाँग पिछली से कितनी बड़ी है?",
    "Write the difference between each pair of answers, then look at those differences.": "हर दो उत्तरों का अंतर लिखो, फिर उन अंतरों को देखो।",
    "The growth is added to the last jump, and that jump is added to the last answer.": "बढ़त को पिछली छलाँग में जोड़ो, और उस छलाँग को पिछले उत्तर में।",
    "When the jumps grow, find how much they grow by, and carry that on.": "जब छलाँगें बढ़ें, तो देखो कि वे कितनी बढ़ती हैं। फिर उसे आगे बढ़ाओ।",
    "You learned: when the jumps grow, find how they grow.": "तुमने सीखा: छलाँगें बढ़ें, तो देखो वे कितनी बढ़ती हैं।",
    "Read the jumps down the margin, then write the next total.": "बगल की छलाँगें ऊपर से नीचे पढ़ो, फिर अगला योग लिखो।",
    "Are all the jumps the same size, or does each get bigger?": "क्या सारी छलाँगें बराबर हैं, या हर एक बड़ी होती जाती है?",
    "A new board. The jumps grow by a bigger step here. What comes next?": "नया बोर्ड। यहाँ छलाँगों की बढ़त बड़ी है। आगे क्या आएगा?",
    "Add the growth to the last jump before you add anything on.": "कुछ भी जोड़ने से पहले बढ़त को पिछली छलाँग में जोड़ो।",
    "Square numbers. Their jumps grow too. Work out 8 × 8.": "वर्ग संख्याएँ। इनकी छलाँगें भी बढ़ती हैं। 8 × 8 निकालो।",
    "Look at 11 and 13. Is one of them bigger than the other?": "11 और 13 को देखो। क्या इनमें से एक दूसरे से बड़ा है?",

    "A missing line can hide the pattern": "छूटी पंक्ति पैटर्न छिपा सकती है",
    "Work a line out in full before you trust a pattern read off a few lines.": "कुछ पंक्तियों से पैटर्न मानने से पहले एक पंक्ति पूरी हल करो।",
    "Three lines are not enough to be sure. One worked line settles it.": "पक्का होने के लिए तीन पंक्तियाँ काफ़ी नहीं हैं। एक हल की पंक्ति बात साफ़ कर देती है।",
    "The jumps only look equal while a line is missing.": "पंक्ति छूटी हो, तभी छलाँगें बराबर दिखती हैं।",
    "A line left out can make growing jumps look equal. Work one line in full to be sure.": "छूटी पंक्ति बढ़ती छलाँगों को बराबर दिखा सकती है। पक्का करने के लिए एक पंक्ति पूरी हल करो।",
    "You learned: a line left out can make growing jumps look equal.": "तुमने सीखा: छूटी पंक्ति बढ़ती छलाँगों को बराबर दिखा सकती है।",
    "Two jumps of 24 sit on this board. Check 9 × 9 on the slate.": "इस बोर्ड पर 24 की दो छलाँगें हैं। 9 × 9 को स्लेट पर जाँचो।",
    "Read the numbers being multiplied down the board. Is one missing?": "बोर्ड में नीचे गुणा की जा रही संख्याएँ पढ़ो। क्या कोई छूटी है?",
    "The answers here seem to carry their digits on. Add the last line in full.": "यहाँ उत्तरों के अंक आगे बढ़ते लगते हैं। आखिरी पंक्ति पूरी जोड़ो।",
    "Set the two numbers in columns, ones under ones, and add.": "दोनों संख्याओं को खानों में रखो, इकाई के नीचे इकाई, और जोड़ो।",
    "A list was copied and one line was left out. Put it back, then answer.": "एक सूची उतारी गई और एक पंक्ति छूट गई। उसे वापस रखो, फिर उत्तर दो।",
    "The two jumps look equal. Would they, with the missing line back?": "दोनों छलाँगें बराबर दिखती हैं। पंक्ति वापस रखने पर क्या वे बराबर रहेंगी?",

    "next total": "अगला योग",
    "next number": "अगली संख्या",
    "1st": "पहली", "2nd": "दूसरी", "3rd": "तीसरी", "4th": "चौथी", "5th": "पाँचवीं",
    "answer": "उत्तर",
    "jump": "छलाँग",
    "grows by": "बढ़त",
    "lines read": "पढ़ी पंक्तियाँ",
    "line": "पंक्ति",
    "tens": "दहाई",
    "ones": "इकाई",
    "add in columns": "खानों में जोड़ो",
    "the jumps": "छलाँगें",
    "Work it out": "हल करो",
    "Put back": "वापस रखो",
    "Another board": "दूसरा बोर्ड",
  },
  gu: {
    "Pattern Lines": "પેટર્નની લીટીઓ",
    "A board of sums, one to a line. Read down the answers before you write.": "દાખલાઓનું એક બોર્ડ, દરેક લીટીમાં એક. લખતાં પહેલાં જવાબો ઉપરથી નીચે વાંચો.",
    "Every board read, and every guess checked against a line worked in full.": "દરેક બોર્ડ વાંચ્યું. દરેક અનુમાન પૂરી ઉકેલેલી લીટીથી તપાસ્યું.",
    "Free play. Any board, with the jumps, the slate and the hide control open.": "મુક્ત રમત. કોઈ પણ બોર્ડ, છલાંગો, સ્લેટ અને છુપાવવાનું બટન ખુલ્લાં છે.",

    "Adding numbers that sit side by side": "બાજુ-બાજુની સંખ્યાઓ ઉમેરવી",
    "Double the bigger one and take one away. Is it the same as the sum?": "મોટી સંખ્યાને બમણી કરો અને એક ઘટાડો. શું તે સરવાળા જેટલું છે?",
    "Lay the longer rod down twice over, then lift one counter off the end.": "લાંબા સળિયાને બે વાર મૂકો, પછી છેડેથી એક ટોકન ઉઠાવી લો.",
    "Count along both rows and see where each one finishes.": "બંને હરોળમાં ગણો અને જુઓ કે દરેક ક્યાં પૂરી થાય છે.",
    "Two numbers side by side add to one less than twice the greater. Three of them add to three times the middle.": "બાજુ-બાજુની બે સંખ્યાનો સરવાળો મોટીના બમણા કરતાં એક ઓછો છે. ત્રણ સંખ્યાનો સરવાળો વચલીના ત્રણ ગણો છે.",
    "You learned: two side by side make one less than twice the greater.": "તમે શીખ્યા: બાજુ-બાજુની બે સંખ્યાનો સરવાળો મોટીના બમણાથી એક ઓછો.",
    "Two rods lie here, 12 and 13. Tap the longer one, then write the total.": "અહીં બે સળિયા છે, 12 અને 13. લાંબા પર ટૅપ કરો, પછી સરવાળો લખો.",
    "Which of the two rods holds more counters?": "બંને સળિયામાંથી કોનામાં વધારે ટોકન છે?",
    "Three rods this time, 24, 25 and 26. What do all three come to?": "આ વખતે ત્રણ સળિયા છે, 24, 25 અને 26. ત્રણેયનો સરવાળો શું થાય?",
    "One rod sits between the other two. Which number is that?": "એક સળિયો બાકીના બેની વચ્ચે છે. તે કઈ સંખ્યા છે?",
    "Now 30 and 31 lie side by side. What is their total?": "હવે 30 અને 31 બાજુ-બાજુમાં છે. તેમનો સરવાળો શું છે?",
    "Count the counters in the shorter rod, then in the longer one.": "નાના સળિયાના ટોકન ગણો, પછી લાંબાના.",

    "Digits marching down a times table": "ઘડિયામાં નીચે ચાલતા અંકો",
    "Read down the ones. Now read down the tens. What does each column do?": "એકમને ઉપરથી નીચે વાંચો. હવે દશકને વાંચો. દરેક ખાનું શું કરે છે?",
    "A column of tens counts whole tens, so 108 holds ten of them.": "દશકનું ખાનું પૂરા દશક ગણે છે, એટલે 108 માં દસ દશક છે.",
    "Split each answer into its tens and its ones, then read each column down.": "દરેક જવાબને દશક અને એકમમાં વહેંચો, પછી દરેક ખાનું નીચે વાંચો.",
    "In the nine table the ones count down while the tens count up. In the five table the ones take turns.": "નવના ઘડિયામાં એકમ ઘટે છે અને દશક વધે છે. પાંચના ઘડિયામાં એકમ વારાફરતી આવે છે.",
    "You learned: in the nine table the ones fall while the tens rise.": "તમે શીખ્યા: નવના ઘડિયામાં એકમ ઘટે છે, દશક વધે છે.",
    "Nine times table. Tap a column to walk it, then write what 14 × 9 makes.": "નવનો ઘડિયો. ખાના પર ટૅપ કરીને નીચે વાંચો. પછી 14 × 9 કેટલા થાય તે લખો.",
    "How many whole tens does 108 hold? Not the digit, the count.": "108 માં પૂરા કેટલા દશક છે? અંક નહીં, ગણતરી કહો.",
    "Five times table now. Watch the ones take turns, then write 5 × 14.": "હવે પાંચનો ઘડિયો. એકમને વારાફરતી આવતા જુઓ. પછી 5 × 14 લખો.",
    "Do the tens here climb on every line, or on every second one?": "અહીં દશક દરેક લીટીમાં વધે છે, કે દર બીજી લીટીમાં?",
    "Ten times table. The ones stay still. Write what 18 × 10 makes.": "દસનો ઘડિયો. એકમ એ જ રહે છે. 18 × 10 કેટલા થાય તે લખો.",
    "Count the tens in 170. How many will the next line hold?": "170 માં દશક ગણો. આગળની લીટીમાં કેટલા હશે?",

    "When the jumps grow": "જ્યારે છલાંગો વધે છે",
    "Look at the jumps. How much bigger is each one than the last?": "છલાંગો જુઓ. દરેક છલાંગ પાછલી કરતાં કેટલી મોટી છે?",
    "Write the difference between each pair of answers, then look at those differences.": "દરેક બે જવાબનો તફાવત લખો, પછી તે તફાવતો જુઓ.",
    "The growth is added to the last jump, and that jump is added to the last answer.": "વધારો પાછલી છલાંગમાં ઉમેરો, અને તે છલાંગ પાછલા જવાબમાં.",
    "When the jumps grow, find how much they grow by, and carry that on.": "જ્યારે છલાંગો વધે, ત્યારે જુઓ કે કેટલી વધે છે. પછી તેને આગળ ચલાવો.",
    "You learned: when the jumps grow, find how they grow.": "તમે શીખ્યા: છલાંગો વધે, તો જુઓ કે તે કેટલી વધે છે.",
    "Read the jumps down the margin, then write the next total.": "બાજુની છલાંગો ઉપરથી નીચે વાંચો, પછી આગળનો સરવાળો લખો.",
    "Are all the jumps the same size, or does each get bigger?": "શું બધી છલાંગો સરખી છે, કે દરેક મોટી થતી જાય છે?",
    "A new board. The jumps grow by a bigger step here. What comes next?": "નવું બોર્ડ. અહીં છલાંગોનો વધારો મોટો છે. આગળ શું આવશે?",
    "Add the growth to the last jump before you add anything on.": "કંઈ પણ ઉમેરતાં પહેલાં વધારો પાછલી છલાંગમાં ઉમેરો.",
    "Square numbers. Their jumps grow too. Work out 8 × 8.": "વર્ગ સંખ્યાઓ. તેમની છલાંગો પણ વધે છે. 8 × 8 શોધો.",
    "Look at 11 and 13. Is one of them bigger than the other?": "11 અને 13 જુઓ. શું તેમાંથી એક બીજા કરતાં મોટો છે?",

    "A missing line can hide the pattern": "છૂટી ગયેલી લીટી પેટર્ન છુપાવી શકે છે",
    "Work a line out in full before you trust a pattern read off a few lines.": "થોડી લીટી પરથી પેટર્ન માનતાં પહેલાં એક લીટી પૂરી ઉકેલો.",
    "Three lines are not enough to be sure. One worked line settles it.": "ખાતરી માટે ત્રણ લીટી પૂરતી નથી. એક ઉકેલેલી લીટી વાત સ્પષ્ટ કરે છે.",
    "The jumps only look equal while a line is missing.": "લીટી છૂટી હોય ત્યારે જ છલાંગો સરખી દેખાય છે.",
    "A line left out can make growing jumps look equal. Work one line in full to be sure.": "છૂટી ગયેલી લીટી વધતી છલાંગોને સરખી દેખાડી શકે છે. ખાતરી માટે એક લીટી પૂરી ઉકેલો.",
    "You learned: a line left out can make growing jumps look equal.": "તમે શીખ્યા: છૂટી લીટી વધતી છલાંગોને સરખી દેખાડી શકે છે.",
    "Two jumps of 24 sit on this board. Check 9 × 9 on the slate.": "આ બોર્ડ પર 24 ની બે છલાંગો છે. 9 × 9 સ્લેટ પર તપાસો.",
    "Read the numbers being multiplied down the board. Is one missing?": "બોર્ડમાં નીચે ગુણાતી સંખ્યાઓ વાંચો. શું કોઈ છૂટી ગઈ છે?",
    "The answers here seem to carry their digits on. Add the last line in full.": "અહીં જવાબોના અંકો આગળ વધતા લાગે છે. છેલ્લી લીટી પૂરી ઉમેરો.",
    "Set the two numbers in columns, ones under ones, and add.": "બંને સંખ્યાઓને ખાનામાં ગોઠવો, એકમ નીચે એકમ, અને ઉમેરો.",
    "A list was copied and one line was left out. Put it back, then answer.": "એક યાદી ઉતારી અને એક લીટી છૂટી ગઈ. તેને પાછી મૂકો, પછી જવાબ આપો.",
    "The two jumps look equal. Would they, with the missing line back?": "બંને છલાંગો સરખી દેખાય છે. છૂટેલી લીટી પાછી મૂકતાં શું તે સરખી રહેશે?",

    "next total": "આગળનો સરવાળો",
    "next number": "આગળની સંખ્યા",
    "1st": "પહેલી", "2nd": "બીજી", "3rd": "ત્રીજી", "4th": "ચોથી", "5th": "પાંચમી",
    "answer": "જવાબ",
    "jump": "છલાંગ",
    "grows by": "વધારો",
    "lines read": "વાંચેલી લીટીઓ",
    "line": "લીટી",
    "tens": "દશક",
    "ones": "એકમ",
    "add in columns": "ખાનામાં ઉમેરો",
    "the jumps": "છલાંગો",
    "Work it out": "ઉકેલો",
    "Put back": "પાછી મૂકો",
    "Another board": "બીજું બોર્ડ",
  },
};

/* One entry per phase = one mount.
   items: qid = the plan's question id; kind drives Work, judge and the traceback.
     rows     the lines already on the board: [left text, answer]
     askLeft  the line being asked for (its answer cell is empty until the child writes it)
     ora      the second route to the answer, used by oracle() only (never by judge or Work)
     near     the misconception of THIS question, which judge must reject */
const PHASES = [
  {
    n: 1,
    concept: "Adding numbers that sit side by side",
    conceptId: "M2.S3.T6.C20", objectiveIds: ["O9"],
    says: ["Double the bigger one and take one away. Is it the same as the sum?"],
    ladder: ["Lay the longer rod down twice over, then lift one counter off the end.",
      "Count along both rows and see where each one finishes."],
    closing: "Two numbers side by side add to one less than twice the greater. Three of them add to three times the middle.",
    learned: "You learned: two side by side make one less than twice the greater.",
    traceback: "the rods join end to end, the greater rod is laid down twice with one counter lifted off, and the two rows finish level on the whole answer",
    items: [
      /* learn ML1: answer in the plan = Both give 25, because two numbers side by side add up to one less than twice the greater */
      { qid: "M2.S3.T6.C20:ML1", kind: "rods", nums: [12, 13], rows: [], askLeft: "12 + 13",
        answer: 25, near: 23, ora: { r: "rule2", a: 12, b: 13 }, winMs: 3400,
        ask: "12 + 13", say: "Two rods lie here, 12 and 13. Tap the longer one, then write the total.",
        miss: "Which of the two rods holds more counters?" },
      /* practice 1: answer in the plan = Yes. 24 + 25 + 26 = 75, and 25 x 3 = 75 */
      { qid: "M2.S3.T6.C20:1", kind: "rods", nums: [24, 25, 26], rows: [["12 + 13", 25]], askLeft: "24 + 25 + 26",
        answer: 75, near: 78, ora: { r: "rule3", a: 24, m: 25, g: 26 }, winMs: 3800,
        ask: "24 + 25 + 26", say: "Three rods this time, 24, 25 and 26. What do all three come to?",
        miss: "One rod sits between the other two. Which number is that?" },
      /* practice 2: answer in the plan = 31 x 2 = 62, and one less is 61, so the sum is right */
      { qid: "M2.S3.T6.C20:2", kind: "rods", nums: [30, 31], rows: [["12 + 13", 25], ["24 + 25 + 26", 75]], askLeft: "30 + 31",
        answer: 61, near: 59, ora: { r: "rule2", a: 30, b: 31 }, winMs: 3400,
        ask: "30 + 31", say: "Now 30 and 31 lie side by side. What is their total?",
        miss: "Count the counters in the shorter rod, then in the longer one." },
    ],
  },
  {
    n: 2,
    concept: "Digits marching down a times table",
    conceptId: "M2.S3.T6.C21", objectiveIds: ["O9"],
    says: ["Read down the ones. Now read down the tens. What does each column do?"],
    ladder: ["A column of tens counts whole tens, so 108 holds ten of them.",
      "Split each answer into its tens and its ones, then read each column down."],
    closing: "In the nine table the ones count down while the tens count up. In the five table the ones take turns.",
    learned: "You learned: in the nine table the ones fall while the tens rise.",
    traceback: "the digit bay splits every answer into whole tens and ones, the two columns are read down, and the next line lands complete",
    items: [
      /* learn ML2: answer in the plan = 99, 108, 117 and 126. The ones digits count down 9, 8, 7, 6, and the number of tens counts up 9, 10, 11, 12 */
      { qid: "M2.S3.T6.C21:ML2", kind: "table", rows: [["11 × 9", 99], ["12 × 9", 108], ["13 × 9", 117]], askLeft: "14 × 9",
        answer: 126, near: 26, ora: { r: "rep", a: 14, b: 9 }, winMs: 3400,
        ask: "14 × 9", say: "Nine times table. Tap a column to walk it, then write what 14 × 9 makes.",
        miss: "How many whole tens does 108 hold? Not the digit, the count." },
      /* practice 3: answer in the plan = 55, 60, 65 and 70. The ones digits take turns, 5 then 0 */
      { qid: "M2.S3.T6.C21:3", kind: "table", rows: [["5 × 11", 55], ["5 × 12", 60], ["5 × 13", 65]], askLeft: "5 × 14",
        answer: 70, near: 75, ora: { r: "rep", a: 5, b: 14 }, winMs: 3400,
        ask: "5 × 14", say: "Five times table now. Watch the ones take turns, then write 5 × 14.",
        miss: "Do the tens here climb on every line, or on every second one?" },
      /* practice 4: answer in the plan = 160, 170 and 180. The ones digit is always 0, and the number of tens is the number multiplied by ten: 16, 17 and 18 */
      { qid: "M2.S3.T6.C21:4", kind: "table", rows: [["15 × 10", 150], ["16 × 10", 160], ["17 × 10", 170]], askLeft: "18 × 10",
        answer: 180, near: 18, ora: { r: "rep", a: 18, b: 10 }, winMs: 3400,
        ask: "18 × 10", say: "Ten times table. The ones stay still. Write what 18 × 10 makes.",
        miss: "Count the tens in 170. How many will the next line hold?" },
    ],
  },
  {
    n: 3,
    concept: "When the jumps grow",
    conceptId: "M2.S3.T6.C22", objectiveIds: ["O10"],
    says: ["Look at the jumps. How much bigger is each one than the last?"],
    ladder: ["Write the difference between each pair of answers, then look at those differences.",
      "The growth is added to the last jump, and that jump is added to the last answer."],
    closing: "When the jumps grow, find how much they grow by, and carry that on.",
    learned: "You learned: when the jumps grow, find how they grow.",
    traceback: "the jumps are read down the margin, the growth beside them stays the same, the next jump writes itself in and the next total lands under it",
    items: [
      /* learn ML3: answer in the plan = 15 and 21 */
      { qid: "M2.S3.T6.C22:ML3", kind: "grow", rows: [["1", 1], ["1 + 2", 3], ["1 + 2 + 3", 6], ["1 + 2 + 3 + 4", 10]],
        askLeft: "1 + 2 + 3 + 4 + 5", answer: 15, near: 14, ora: { r: "tri", n: 5 }, winMs: 3400,
        ask: "next total", say: "Read the jumps down the margin, then write the next total.",
        miss: "Are all the jumps the same size, or does each get bigger?" },
      /* practice 5: answer in the plan = 30 and 45. The totals 3, 9, 18, 30 and 45 jump by 6, 9, 12 and 15, growing by three each time */
      { qid: "M2.S3.T6.C22:5", kind: "grow", rows: [["3", 3], ["3 + 6", 9], ["3 + 6 + 9", 18]],
        askLeft: "3 + 6 + 9 + 12", answer: 30, near: 27, ora: { r: "mulsum", step: 3, n: 4 }, winMs: 3400,
        ask: "next total", say: "A new board. The jumps grow by a bigger step here. What comes next?",
        miss: "Add the growth to the last jump before you add anything on." },
      /* practice 6: answer in the plan = No. The jumps are 11 and 13, growing by two, so the next jump is 15 and 8 x 8 = 64 */
      { qid: "M2.S3.T6.C22:6", kind: "grow", rows: [["5 × 5", 25], ["6 × 6", 36], ["7 × 7", 49]],
        askLeft: "8 × 8", answer: 64, near: 62, ora: { r: "rep", a: 8, b: 8 }, winMs: 3400,
        ask: "8 × 8", say: "Square numbers. Their jumps grow too. Work out 8 × 8.",
        miss: "Look at 11 and 13. Is one of them bigger than the other?" },
    ],
  },
  {
    n: 4,
    concept: "A missing line can hide the pattern",
    conceptId: "M2.S3.T6.C23", objectiveIds: ["O10"],
    says: ["Work a line out in full before you trust a pattern read off a few lines."],
    ladder: ["Three lines are not enough to be sure. One worked line settles it.",
      "The jumps only look equal while a line is missing."],
    closing: "A line left out can make growing jumps look equal. Work one line in full to be sure.",
    learned: "You learned: a line left out can make growing jumps look equal.",
    traceback: "the hidden line slides back into its place, the jump labels either side are rewritten where they stand, the slate works the line in full and the whole answer lands",
    items: [
      /* learn ML4: answer in the plan = No. 9 x 9 = 81. The line 3 x 3 = 9 is missing, and with it put back the jumps are 8, 16 and 24, so the next jump is 32 */
      { qid: "M2.S3.T6.C23:ML4", kind: "hidden", rows: [["1 × 1", 1], ["5 × 5", 25], ["7 × 7", 49]], askLeft: "9 × 9",
        rowsBack: [["1 × 1", 1], ["3 × 3", 9], ["5 × 5", 25], ["7 × 7", 49]], askBack: "9 × 9", hideAt: 1,
        slate: { title: "9 × 9", steps: ["9 × 10 = 90", "90 − 9 ="] },
        answer: 81, near: 73, ora: { r: "rep", a: 9, b: 9 }, winMs: 3800,
        ask: "9 × 9", say: "Two jumps of 24 sit on this board. Check 9 × 9 on the slate.",
        miss: "Read the numbers being multiplied down the board. Is one missing?" },
      /* practice 7: answer in the plan = No, the guess is wrong. 2468 + 22222 = 24690, so working one line in full shows where the digit pattern stops */
      { qid: "M2.S3.T6.C23:7", kind: "hidden", rows: [["2", 2], ["+ 22", 24], ["+ 222", 246], ["+ 2,222", 2468]],
        askLeft: "+ 22,222", noJumps: true,
        slate: { title: "add in columns", col: { a: 2468, b: 22222 } },
        answer: 24690, near: 246810, ora: { r: "col", a: 2468, b: 22222 }, winMs: 4200,
        ask: "next total", say: "The answers here seem to carry their digits on. Add the last line in full.",
        miss: "Set the two numbers in columns, ones under ones, and add." },
      /* practice 8: answer in the plan = 24. The full list is 4, 6, 10, 16, with jumps 2, 4 and 6, so the next jump is 8. The equal jumps of 6 came from the missing number, and 22 is wrong */
      { qid: "M2.S3.T6.C23:8", kind: "hidden", rows: [["1st", 4], ["2nd", 10], ["3rd", 16]], askLeft: "4th",
        rowsBack: [["1st", 4], ["2nd", 6], ["3rd", 10], ["4th", 16]], askBack: "5th", hideAt: 1,
        slate: { title: "the jumps", steps: ["10 − 4 = 6", "16 − 10 = 6"], stepsBack: ["6 − 4 = 2", "10 − 6 = 4", "16 − 10 = 6"] },
        answer: 24, near: 22, ora: { r: "addjumps", start: 4, jumps: [2, 4, 6, 8] }, winMs: 3800,
        ask: "next number", say: "A list was copied and one line was left out. Put it back, then answer.",
        miss: "The two jumps look equal. Would they, with the missing line back?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  board: { top: 72, lineH: 60, gap: 8, slots: 6, w: 600, textX: 20, textW: 400, cellX: 430, cellW: 165 },
  wide: { top: 60, lineH: 60, gap: 8, slots: 3, w: 1086, textX: 20, textW: 800, cellX: 850, cellW: 200 },
  bay: { top: 284, rowH: 82, hit: 72, x: 24, w: 1030, maxPitch: 34, groupOf: 10 },
  digits: { tensX: 735, onesX: 965, colX: [630, 860], colW: 210 },
  jump: { x: 630, w: 160, cx: 710 },
  growth: { x: 810, w: 190, cx: 905 },
  jumpNarrow: { x: 630, w: 120, cx: 690 },
  slate: { x: 775, y: 72, w: 310, h: 228, keyY: [316, 404], keyH: 76 },
  slateFree: { x: 775, y: 72, w: 310, h: 170, keyY: [258, 342, 426], keyH: 76 },
  /* free play: any board, each with one line left out, so the hide control and the slate have work */
  free: [
    { rows: [["2 × 2", 4], ["3 × 3", 9], ["5 × 5", 25], ["6 × 6", 36]],
      rowsBack: [["2 × 2", 4], ["3 × 3", 9], ["4 × 4", 16], ["5 × 5", 25], ["6 × 6", 36]], hideAt: 2,
      slate: { title: "4 × 4", steps: ["4 + 4 = 8", "8 + 8 = 16"] } },
    { rows: [["1", 1], ["1 + 2", 3], ["1 + 2 + 3 + 4", 10], ["1 + 2 + 3 + 4 + 5", 15]],
      rowsBack: [["1", 1], ["1 + 2", 3], ["1 + 2 + 3", 6], ["1 + 2 + 3 + 4", 10], ["1 + 2 + 3 + 4 + 5", 15]], hideAt: 2,
      slate: { title: "1 + 2 + 3", steps: ["1 + 2 = 3", "3 + 3 = 6"] } },
    { rows: [["5 × 1", 5], ["5 × 2", 10], ["5 × 4", 20], ["5 × 5", 25]],
      rowsBack: [["5 × 1", 5], ["5 × 2", 10], ["5 × 3", 15], ["5 × 4", 20], ["5 × 5", 25]], hideAt: 2,
      slate: { title: "5 × 3", steps: ["5 + 5 = 10", "10 + 5 = 15"] } },
  ],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: every answer re-derived by a second route that shares no code with judge or Work.
   rule2 / rule3 use the chapter's PATTERN (twice the greater less one; three times the middle),
   rep is repeated addition, col adds digit by digit with carries, the rest build the sequence. */
const plColumnSum = (a: number, b: number) => {
  const A = String(a).split("").reverse(), B = String(b).split("").reverse();
  const out: number[] = [];
  let carry = 0;
  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    const s = Number(A[i] || 0) + Number(B[i] || 0) + carry;
    out.push(s % 10);
    carry = s >= 10 ? 1 : 0;
  }
  if (carry) out.push(carry);
  return Number(out.reverse().join(""));
};
const plReDerive = (o: any) => {
  if (!o) return null;
  if (o.r === "rule2") return 2 * Math.max(o.a, o.b) - 1;
  if (o.r === "rule3") return o.m + o.m + o.m;
  if (o.r === "rep") { let s = 0; for (let k = 0; k < o.b; k++) s += o.a; return s; }
  if (o.r === "tri") { let s = 0; for (let k = 1; k <= o.n; k++) s += k; return s; }
  if (o.r === "mulsum") { let s = 0; for (let k = 1; k <= o.n; k++) s += o.step * k; return s; }
  if (o.r === "col") return plColumnSum(o.a, o.b);
  if (o.r === "addjumps") { let s = o.start; for (const j of o.jumps) s += j; return s; }
  return null;
};
const oracle = () => PHASES.every((p: any) => p.items.length === 3 && p.items.every((it: any) => plReDerive(it.ora) === it.answer));

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) drives the pad, as a child does */
const solve = (item: any, T: any) => T.submit(item.answer);
/* every answer of this tool is typed on the 12-key pad: nothing to set on the working area */
const answer = () => undefined;
const check = () => undefined;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */

/* deeper inks for coloured numerals, so every one of them reads at 4.5:1 on the card */
const PL_INK: any = {
  blue: shade(CONTENT.hundred, 0.25), amber: shade(CONTENT.ten, 0.42), green: shade(CONTENT.one, 0.25),
  step: shade(CONTENT.pointer, 0.25), plum: shade(CONTENT.bead, 0.3),
};
const PL_PAINT: any = { blue: "gHundred", amber: "gTen", green: "gOne", plum: "gBead", step: "gPointer" };

/* text that has no layout engine: pick the biggest size from the scale that still fits */
const plFit = (s: any, w: number, max: number) => {
  const n = Math.max(String(s === null || s === undefined ? "" : s).length, 1);
  const want = w / (0.6 * n);
  return want >= max ? max : want >= T.prompt ? T.prompt : want >= T.label ? T.label : T.micro;
};
/* a blank on the working area: a dashed rule to write on, never a box that looks like the answer slot */
const plBlank = (x: number, y: number, w: number, C: any, k?: any) => (
  <line key={k} x1={x} y1={y} x2={x + w} y2={y} stroke={shade(C.rule, 0.35)} strokeWidth={4} strokeDasharray="12 9" strokeLinecap="round" />
);
const plNum = (v: any) => (v === null || v === undefined ? "" : indian(Number(v)));

/* one rod of counters: the pitch shrinks so the longest row of the question still fits */
const plRod = (total: number) => {
  const g = MODEL.bay;
  const gaps = Math.floor(Math.max(total - 1, 0) / g.groupOf) * 12;
  const pitch = Math.max(9, Math.min(g.maxPitch, (g.w - gaps) / Math.max(total, 1)));
  return { pitch, r: Math.max(6, Math.min(15, pitch * 0.42)) };
};
const plRodX = (i: number, pitch: number) => MODEL.bay.x + i * pitch + Math.floor(i / MODEL.bay.groupOf) * 12;

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  /* act: what the child (or the traceback) has already opened up. Every flag is one way, so the
     child's next tap can never switch a corrected picture back off (BUILD_CARD §6). */
  const [act, setAct] = useState<any>({});
  /* the demo layer: the whole right answer written on the board after a miss; it clears the
     moment the child writes something of their own */
  const [demo, setDemo] = useState<any>(null);
  const [free, setFree] = useState(0);

  api.onEnter(null);

  useEffect(() => { tl.stop(); api.lock(false); setAct({}); setDemo(null); }, [n, index]);
  useEffect(() => { if (stage === "free") { setAct({}); setDemo(null); } }, [stage]);
  useEffect(() => { setDemo((d: any) => (d && d.at !== typed ? null : d)); }, [typed]);

  /* the traceback: redraw the maths in steps and end on the whole right answer, unmarked */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const at = String(wrong.value);
    api.lock(true);
    const open = (o: any) => setAct((a: any) => ({ ...a, ...o }));
    const steps: any[] = [];
    if (item.kind === "rods") steps.push([900, () => open({ shown: true })], [900, () => open({ level: true })]);
    else if (item.kind === "table") steps.push([900, () => open({ ones: true })], [900, () => open({ tens: true })], [700, () => open({ split: true })]);
    else if (item.kind === "grow") steps.push([900, () => open({ walk: true })], [900, () => open({ growth: true })]);
    else steps.push([1000, () => open({ restored: true })], [1000, () => open({ worked: true })]);
    steps.push([500, () => setDemo({ at, answer: item.answer })]);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* the board of this question, with the hidden line put back where it belongs */
  const won = stage === "win" || stage === "idle";
  /* the win shows the maths, not only the number: the rods lie along, the columns light, the
     hidden line is back. Every one of these is one way, so nothing the child taps undoes it. */
  const restored = !!act.restored || (won && item.hideAt !== undefined);
  const src = restored && item.rowsBack ? item.rowsBack : item.rows || [];
  const askLeft = restored && item.askBack ? item.askBack : item.askLeft;
  const lines = src.map((r: any, k: number) => ({ left: r[0], value: r[1], tone: restored && item.hideAt === k ? "plum" : "blue" }));
  const askValue = won ? item.answer : demo && demo.answer !== undefined ? demo.answer : null;
  lines.push({ left: askLeft, value: askValue, tone: "green", ask: true });

  const vals = lines.map((l: any) => l.value);
  const jumps = vals.slice(1).map((v: any, k: number) => (v === null || vals[k] === null ? null : v - vals[k]));
  const grows = jumps.slice(1).map((v: any, k: number) => (v === null || jumps[k] === null ? null : v - jumps[k]));

  /* the running count never goes back: every board of this phase counts, the earlier ones in full */
  const sizeOf = (it: any) => ((it.rowsBack || it.rows) || []).length + 1;
  const before = phase.items.slice(0, index).reduce((a: number, it: any) => a + sizeOf(it), 0);
  const boardTotal = phase.items.reduce((a: number, it: any) => a + sizeOf(it), 0);
  const read = before + vals.filter((v: any) => v !== null).length;
  api.share({ lines: vals, jumps, jumpGrowth: grows, hiddenLines: item.hideAt !== undefined && !restored ? 1 : 0,
    workedLine: act.worked ? askLeft : null, digitColumns: n === 2, askLine: askLeft, linesRead: read, complete: stage === "idle" });

  const live = (stage === "ask" || stage === "teach" || stage === "free") && !tl.busy;
  const act1 = (o: any) => { setDemo(null); setAct((a: any) => ({ ...a, ...o })); };

  /* ── drawing helpers (plain functions: every hook stays in Work) ────────────────── */
  const G = n === 1 ? MODEL.wide : MODEL.board;
  const lineY = (k: number, g: any) => g.top + k * (g.lineH + g.gap);
  const boardOf = (g: any, ls: any[], slots: number) => (
    <g>
      {Array.from({ length: slots }, (_, k) => (
        <line key={"r" + k} x1={4} y1={lineY(k, g) + g.lineH} x2={g.w - 6} y2={lineY(k, g) + g.lineH} stroke={C.rule} strokeWidth={2} strokeLinecap="round" />
      ))}
      <text x={g.cellX + g.cellW / 2} y={g.top - 22} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("answer")}</text>
      <g data-role="reading">
        {ls.map((l: any, k: number) => {
          const y = lineY(k, g);
          const blank = l.value === null;
          const lt = tx(l.left);
          return (
            <g key={"l" + k}>
              <text x={g.textX} y={y + 42} fontSize={plFit(lt, g.textW, n === 1 ? T.speech : T.label)} fontWeight={600}
                fill={l.tone === "plum" ? PL_INK.plum : C.ink}>{lt}</text>
              {blank && l.ask && (
                plBlank(g.cellX + 10, y + 50, g.cellW - 16, C)
              )}
              {!blank && (
                <text x={g.cellX + g.cellW - 12} y={y + 44} textAnchor="end" fontSize={plFit(plNum(l.value), g.cellW - 22, T.speech)}
                  fontWeight={700} fill={PL_INK[l.tone]}>{plNum(l.value)}</text>
              )}
              {blank && l.ask && typed !== "" && stage === "ask" && (
                <text x={g.cellX + g.cellW - 12} y={y + 44} textAnchor="end" fontSize={plFit(typed, g.cellW - 22, T.speech)}
                  fontWeight={700} fill={C.ink}>{typed}</text>
              )}
            </g>
          );
        })}
      </g>
    </g>
  );

  const marginOf = (g: any, list: any[], tone: string, upto: number, half: number) => (
    <g data-role="reading">
      {list.map((v: any, k: number) =>
        v === null ? null : (
          <g key={"m" + k}>
            <rect x={g.cx - 52} y={MODEL.board.top + half + k * 68 - 23} width={104} height={46} rx={14}
              fill="#FFFFFF" stroke={k < upto ? PL_INK[tone] : C.rule} strokeWidth={k < upto ? 3 : 2} />
            <text x={g.cx} y={MODEL.board.top + half + k * 68 + 11} textAnchor="middle"
              fontSize={plFit(plNum(v), 86, T.label)} fontWeight={700} fill={PL_INK[tone]}>{plNum(v)}</text>
          </g>
        ))}
    </g>
  );

  /* ── phase 1: the side by side bay ──────────────────────────────────────────────── */
  const bayRows = () => {
    const nums = (item.nums || []).slice();
    const three = nums.length === 3;
    const b = nums[nums.length - 1], a = nums[0];
    const total = three ? Math.max.apply(null, nums) : Math.max(a + b, 2 * b);
    const shown = !!act.shown || won;
    let rows: any[] = [];
    if (three) {
      const m = nums[1], g = nums[2];
      rows = shown
        ? [[{ n: a, c: "blue" }, { n: 1, c: "green" }], [{ n: m, c: "amber" }], [{ n: g - 1, c: "blue" }, { n: 1, c: "gone" }]]
        : [[{ n: a, c: "blue" }], [{ n: m, c: "amber" }], [{ n: g, c: "blue" }]];
    } else {
      rows = shown
        ? [[{ n: a, c: "blue" }, { n: b, c: "amber" }], [{ n: b, c: "amber" }, { n: b - 1, c: "green" }, { n: 1, c: "gone" }]]
        : [[{ n: b, c: "amber" }], [{ n: a, c: "blue" }]];
    }
    return { rows, total: three ? total : Math.max(a + b, 2 * b), hitRow: three ? 1 : 0, level: three ? nums[1] : a + b, shown };
  };

  const bay = () => {
    const { rows, total, hitRow, level, shown } = bayRows();
    const { pitch, r } = plRod(total);
    const g = MODEL.bay;
    return (
      <g>
        {rows.map((segs: any[], k: number) => {
          const y = g.top + k * g.rowH + 36;
          let i = 0;
          return (
            <g key={"row" + k}>
              {segs.map((s: any, j: number) => {
                const from = i;
                i += s.n;
                return (
                  <g key={"s" + j}>
                    {Array.from({ length: s.n }, (_, q) =>
                      s.c === "gone" ? (
                        <circle key={q} cx={plRodX(from + q, pitch)} cy={y} r={r} fill="none" stroke={PL_INK.step} strokeWidth={3} strokeDasharray="5 5" />
                      ) : (
                        <Disc key={q} x={plRodX(from + q, pitch)} y={y} r={r} paint={PL_PAINT[s.c]} flat />
                      ))}
                  </g>
                );
              })}
            </g>
          );
        })}
        {shown && (act.level || won) && (
          <line x1={plRodX(level - 1, pitch) + r + 6} y1={g.top + 18} x2={plRodX(level - 1, pitch) + r + 6}
            y2={g.top + (rows.length - 1) * g.rowH + 56} stroke={PL_INK.step} strokeWidth={3} strokeLinecap="round" />
        )}
        {live && !shown && (
          <Hit id="rod" label={hitRow === 1 ? "the middle rod" : "the longer rod"} x={0} y={g.top + hitRow * g.rowH} w={1082} h={g.hit}
            onPress={() => act1({ shown: true })} />
        )}
        {live && !shown && <Invite x={62} y={g.top + hitRow * g.rowH + 36} r={48} C={C} />}
      </g>
    );
  };

  /* ── phase 2: the digit bay ─────────────────────────────────────────────────────── */
  const digits = () => {
    const d = MODEL.digits;
    const cols: any[] = [{ key: "tens", x: d.tensX, tone: "blue", on: !!act.tens || won }, { key: "ones", x: d.onesX, tone: "amber", on: !!act.ones || won }];
    return (
      <g>
        {cols.map((c) => (
          <text key={"h" + c.key} x={c.x} y={46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(c.key)}</text>
        ))}
        <g data-role="reading">
          {lines.map((l: any, k: number) => {
            const y = lineY(k, MODEL.board);
            const v = l.value === null && l.ask && act.split ? item.answer : l.value;
            return (
              <g key={"dl" + k}>{cols.map((c) => {
              const shownV = v === null ? null : c.key === "tens" ? Math.floor(v / 10) : v % 10;
              return (
                <g key={c.key + k}>
                  {shownV === null ? (
                    plBlank(c.x - 45, y + 50, 90, C)
                  ) : (
                    <g>
                      {c.on && <rect x={c.x - 55} y={y + 5} width={110} height={50} rx={12} fill={tint(CONTENT[c.key === "tens" ? "hundred" : "ten"], 0.82)} />}
                      <text x={c.x} y={y + 44} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={PL_INK[c.tone]}>{String(shownV)}</text>
                    </g>
                  )}
                </g>
              );
            })}</g>
            );
          })}
        </g>
        {cols.map((c, j) => (
          live ? <Hit key={"hit" + c.key} id={"col-" + c.key} label={"the " + c.key + " column"} x={d.colX[j]} y={4} w={d.colW} h={476}
            onPress={() => act1({ [c.key]: true })} /> : null
        ))}
        {live && !act.ones && <Invite x={d.onesX} y={lineY(0, MODEL.board) + 30} r={46} C={C} />}
      </g>
    );
  };

  /* ── phase 4: the slate ─────────────────────────────────────────────────────────── */
  const slateOf = (g: any, sp: any, done: boolean, steps: string[], keys: any[], invite?: boolean) => {
    const colA = sp.col ? String(sp.col.a).split("") : [];
    const colB = sp.col ? String(sp.col.b).split("") : [];
    const cw = 50, right = 1056;
    const colX = (i: number, len: number) => right - (len - 1 - i) * cw - cw / 2;
    const rules = [0, 1, 2].filter((k) => g.y + 100 + k * 46 < g.y + g.h - 16);
    return (
      <g>
        <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
        <g data-role="reading">
          <text x={g.x + g.w / 2} y={g.y + 40} textAnchor="middle" fontSize={plFit(tx(sp.title), g.w - 40, T.label)} fontWeight={600} fill={C.ink}>{tx(sp.title || "")}</text>
          {!done && rules.map((k) => (
            <line key={"sr" + k} x1={g.x + 20} y1={g.y + 100 + k * 46} x2={g.x + g.w - 20} y2={g.y + 100 + k * 46} stroke={C.rule} strokeWidth={2} />
          ))}
          {done && !sp.col && steps.map((t: string, k: number) => {
            const last = /=$/.test(t);
            return (
              <g key={"st" + k}>
                <text x={g.x + 26} y={g.y + 96 + k * 50} fontSize={plFit(t, g.w - 120, T.label)} fontWeight={600} fill={C.ink}>{t}</text>
                {last && (demo && demo.answer !== undefined ? (
                  <text x={g.x + 250} y={g.y + 96 + k * 50} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PL_INK.green}>{plNum(item.answer)}</text>
                ) : (
                  plBlank(g.x + 210, g.y + 100 + k * 50, 80, C)
                ))}
              </g>
            );
          })}
          {done && sp.col && (
            <g>
              {colA.map((d: string, i: number) => (
                <text key={"a" + i} x={colX(i, colA.length)} y={g.y + 90} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{d}</text>
              ))}
              <text x={g.x + 16} y={g.y + 138} fontSize={T.label} fontWeight={600} fill={PL_INK.step}>+</text>
              {colB.map((d: string, i: number) => (
                <text key={"b" + i} x={colX(i, colB.length)} y={g.y + 138} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{d}</text>
              ))}
              <line x1={g.x + 16} y1={g.y + 154} x2={g.x + g.w - 16} y2={g.y + 154} stroke={C.ink} strokeWidth={3} />
              {demo && demo.answer !== undefined ? (
                <text x={g.x + g.w - 24} y={g.y + 200} textAnchor="end" fontSize={T.label} fontWeight={700} fill={PL_INK.green}>{plNum(item.answer)}</text>
              ) : (
                plBlank(g.x + 60, g.y + 206, g.w - 84, C)
              )}
            </g>
          )}
        </g>
        {keys.map((k: any, j: number) => (
          <Key key={k.id} id={k.id} label={k.label} x={g.x} y={g.keyY[j]} w={g.w} h={g.keyH} C={C} disabled={k.off} onClick={k.onPress}>
            <text x={k.dx || 0} y={12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(k.text)}</text>
          </Key>
        ))}
        {invite && <Invite x={g.x + 36} y={g.keyY[0] + g.keyH / 2} r={27} C={C} />}
      </g>
    );
  };

  /* ── free play: any board, with the jumps, the slate and the hide control open ──── */
  if (stage === "free") {
    const b = MODEL.free[free % MODEL.free.length];
    const fsrc = act.restored ? b.rowsBack : b.rows;
    const fl = fsrc.map((r: any, k: number) => ({ left: r[0], value: r[1], tone: act.restored && b.hideAt === k ? "plum" : "blue" }));
    const fv = fl.map((l: any) => l.value);
    const fj = fv.slice(1).map((v: any, k: number) => v - fv[k]);
    const jn = MODEL.jumpNarrow;
    return (
      <g>
        {runsBox(C, fl.length, fl.length, tx)}
        {boardOf(MODEL.board, fl, MODEL.board.slots)}
        <text x={jn.cx} y={46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("jump")}</text>
        {marginOf(jn, fj, "step", act.walk ? fj.length : 0, 64)}
        <Hit id="jump-margin" label="the jump margin" x={jn.x} y={MODEL.board.top} w={jn.w} h={408} onPress={() => act1({ walk: true })} />
        {slateOf(MODEL.slateFree, b.slate, !!act.worked, b.slate.steps, [
          { id: "work-it-out", label: "Work it out", text: "Work it out", dx: 18, off: !!act.worked, onPress: () => act1({ worked: true }) },
          { id: "put-back", label: "Put the line back", text: "Put back", off: !!act.restored, onPress: () => act1({ restored: true }) },
          { id: "new-board", label: "Another board", text: "Another board", off: false, onPress: () => { setDemo(null); setAct({}); setFree((f: number) => f + 1); } },
        ])}
      </g>
    );
  }

  const showJumps = (n === 3 || (n === 4 && !item.noJumps));
  const jg = n === 4 ? MODEL.jumpNarrow : MODEL.jump;
  const jUpto = act.walk || demo ? jumps.length : 0;
  const gUpto = act.growth || demo ? grows.length : 0;

  return (
    <g>
      {runsBox(C, read, boardTotal, tx)}
      {boardOf(G, lines, G.slots)}
      {n === 1 && bay()}
      {n === 2 && digits()}
      {showJumps && (
        <g>
          <text x={jg.cx} y={46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("jump")}</text>
          {marginOf(jg, jumps, "step", jUpto, 64)}
          {live && <Hit id="jump-margin" label="the jump margin" x={jg.x} y={MODEL.board.top} w={jg.w} h={408} onPress={() => act1({ walk: true })} />}
        </g>
      )}
      {n === 3 && (
        <g>
          <text x={MODEL.growth.cx} y={46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("grows by")}</text>
          {marginOf(MODEL.growth, grows, "plum", gUpto, 98)}
          {live && <Hit id="growth-margin" label="the growth margin" x={MODEL.growth.x} y={MODEL.board.top} w={MODEL.growth.w} h={408} onPress={() => act1({ growth: true })} />}
        </g>
      )}
      {n === 3 && live && !act.walk && <Invite x={jg.cx} y={MODEL.board.top + 64 + (jumps.filter((v: any) => v !== null).length - 1) * 68} r={44} C={C} />}
      {n === 4 && slateOf(MODEL.slate, item.slate || {}, !!act.worked || won,
        ((restored && (item.slate || {}).stepsBack ? item.slate.stepsBack : (item.slate || {}).steps) || []), [
        { id: "work-it-out", label: "Work it out", text: "Work it out", dx: 18, off: !live || !!act.worked || won, onPress: () => act1({ worked: true }) },
        { id: "put-back", label: "Put the line back", text: "Put back", off: !live || item.hideAt === undefined || restored, onPress: () => act1({ restored: true }) },
      ], live && !act.worked && !won)}
    </g>
  );
}

/* the running count: the lines read against the lines on this phase's board */
function runsBox(C: any, read: number, total: number, tx: any = (v: any) => v) {
  return (
    <g data-zone="runs">
      <rect x={3} y={-91} width={324} height={70} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={22} y={-59} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("lines read")}</text>
      <text x={306} y={-35} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{read + " / " + total}</text>
    </g>
  );
}

/* the summary page's small drawing: the last two lines of the board the child finished (the hidden
   line back in place), the answer they wrote in green, and the jump between them where the phase reads jumps */
const plThumbLeft = (t: any, tx: any = (v: any) => v) => {
  const s = String(t || ""), m = s.match(/^(\d+)(st|nd|rd|th)$/);
  return m ? tx("line") + " " + m[1] : tx(s);
};
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const ph: any = PHASES[(n || 1) - 1] || { items: [] };
  const it: any = ph.items[last.item] || {};
  const rows = it.rowsBack || it.rows || [];
  const prev = rows[rows.length - 1];
  const askL = plThumbLeft(it.askBack || it.askLeft, tx);
  const v = Number(last.value);
  const jump = prev && (it.kind === "grow" || (it.kind === "hidden" && !it.noJumps)) ? v - prev[1] : null;
  const vx = jump === null ? w - 14 : w - 72;
  const two = prev && String(prev[0]).length <= 12 && String(askL).length <= 12;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <g data-role="reading">
        {two ? (
          <g>
            <text x={12} y={33} fontSize={T.micro} fontWeight={600} fill={C.ink}>{plThumbLeft(prev[0], tx)}</text>
            <text x={vx} y={33} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={PL_INK.blue}>{indian(prev[1])}</text>
            <line x1={10} y1={42} x2={vx + 4} y2={42} stroke={C.rule} strokeWidth={2} />
            <text x={12} y={72} fontSize={T.micro} fontWeight={600} fill={C.ink}>{askL}</text>
            <text x={vx} y={72} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={PL_INK.green}>{indian(v)}</text>
            {jump !== null && <text x={w - 34} y={62} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PL_INK.step}>{"+" + indian(jump)}</text>}
          </g>
        ) : (
          <g>
            <text x={w / 2} y={33} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{askL}</text>
            <text x={w / 2} y={72} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PL_INK.green}>{indian(v)}</text>
          </g>
        )}
      </g>
    </g>
  );
}

function PatternLines(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default PatternLines;
