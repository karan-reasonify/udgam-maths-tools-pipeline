/* ═══ M2.S3.T6.C24.2D1 · pattern_lines · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): every line is printed on the bubble, which is the guide.
   THE NEW LOOK (docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): keyOnly + navDots, the question lives only in the bubble (one
   sentence each), digits as written, every act performed on screen (api.act), bigPad.
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing).
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "pattern_lines";
const MEDIA_ID = "M2.S3.T6.C24.2D1";
const TOOL_NAME = "Pattern Lines";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A board of sums, one to a line. Read down the answers before you write."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Every board read, and every guess checked against a line worked in full.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Any board, with the jumps, Work it out, Put back, Hide and Another board.";

/* THE START PAGE (docs/LAYOUT.md §1c): a ruled board of squares with its jumps, and two rods of counters, one longer than the other.
   No digit here is a question's answer. Drawn in a 1200 x 340 box. */
const START_HOOK = "Can you see the pattern down the answers?";
function StartArt({ box, C, lang, tx }: any) {
  const rows = [["1 × 1", 1], ["2 × 2", 4], ["3 × 3", 9], ["4 × 4", 16]];
  const jumps = [3, 5, 7];
  const rodA = 6, rodB = 7;
  return (
    <g>
      <rect x={40} y={10} width={560} height={320} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={3} />
      {rows.map((r: any, k: number) => (
        <g key={"sr" + k}>
          <line x1={64} y1={96 + k * 76} x2={576} y2={96 + k * 76} stroke={C.rule} strokeWidth={3} />
          <text x={72} y={74 + k * 76} fontSize={T.prompt} fontWeight={600} fill={C.ink}>{r[0]}</text>
          <text x={450} y={76 + k * 76} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={shade(CONTENT.hundred, 0.25)}>{String(r[1])}</text>
        </g>
      ))}
      {jumps.map((j: number, k: number) => (
        <g key={"sj" + k}>
          <rect x={500} y={96 + k * 76 - 20} width={84} height={42} rx={14} fill="#FFFFFF" stroke={shade(CONTENT.pointer, 0.25)} strokeWidth={3} />
          <text x={542} y={96 + k * 76 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(CONTENT.pointer, 0.25)}>{"+" + j}</text>
        </g>
      ))}
      {Array.from({ length: rodA }, (_, q) => (
        <g key={"ra" + q}>
          {plBtn(700 + q * 56, 120, 24, "blue")}
          <Skin name="counter" x={700 + q * 56 - 24} y={96} w={48} h={48} fit="stretch" />
          <circle cx={700 + q * 56} cy={120} r={22.5} fill={CONTENT.hundred} fillOpacity={0.72} />
        </g>
      ))}
      {Array.from({ length: rodB }, (_, q) => (
        <g key={"rb" + q}>
          {plBtn(700 + q * 56, 220, 24, "amber")}
          <Skin name="counter" x={700 + q * 56 - 24} y={196} w={48} h={48} fit="stretch" />
        </g>
      ))}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte. Fill it AFTER the English is final and reviewed. */
const TR: any = {
  hi: {
    "Pattern Lines": "पैटर्न की पंक्तियाँ",
    "Can you see the pattern down the answers?": "क्या तुम उत्तरों में पैटर्न देख सकते हो?",
    "A board of sums, one to a line. Read down the answers before you write.": "सवालों का एक बोर्ड, हर पंक्ति में एक। लिखने से पहले उत्तर ऊपर से नीचे पढ़ो।",
    "Every board read, and every guess checked against a line worked in full.": "हर बोर्ड पढ़ा गया। हर अनुमान एक पूरी हल की पंक्ति से जाँचा गया।",
    "Free play. Any board, with the jumps, Work it out, Put back, Hide and Another board.": "मुक्त खेल। कोई भी बोर्ड, छलाँगें, हल करो, वापस रखो, छिपाओ और दूसरा बोर्ड।",
    "Adding numbers that sit side by side": "पास-पास वाली संख्याओं को जोड़ना",
    "Double the bigger one and take one away. Is it the same as the sum?": "बड़ी संख्या को दुगुना करो और एक घटा दो। क्या यह योग के बराबर है?",
    "Slide the two rods end to end.": "दोनों छड़ों को सिरे से सिरे तक मिलाओ।",
    "Tap the blinking Join key.": "चमकते मिलाओ बटन पर टैप करो।",
    "Lay the longer rod down twice.": "लंबी छड़ को दो बार रखो।",
    "Now tap the Double key.": "अब दुगुना बटन पर टैप करो।",
    "Lift one counter off the doubled rod.": "दुगुनी छड़ से एक टोकन उठा लो।",
    "Last, tap the Take one key.": "आख़िर में एक हटाओ बटन पर टैप करो।",
    "Double the longer rod, then take one counter away.": "लंबी छड़ को दुगुना करो, फिर एक टोकन हटा दो।",
    "Two rods side by side hold one less than twice the longer rod.": "पास-पास की दो छड़ों में लंबी छड़ के दुगुने से एक टोकन कम होता है।",
    "Two make one less than twice the greater, and three make three times the middle.": "दो का योग बड़ी के दुगुने से एक कम, तीन का योग बीच वाली का तीन गुना।",
    "You learned: two side by side make one less than twice the greater.": "तुमने सीखा: पास-पास की दो संख्याओं का योग बड़ी के दुगुने से एक कम।",
    "Find 12 + 13, then check it against double 13 less 1.": "12+13 निकालो, फिर 13 के दुगुने से एक कम से जाँचो।",
    "Which of the two rods holds more counters?": "दोनों छड़ों में से किसमें ज़्यादा टोकन हैं?",
    "Yes, both ways come to the same number.": "हाँ, दोनों तरीकों से एक ही संख्या आती है।",
    "Find 24 + 25 + 26, then check it against 3 times the middle number.": "24+25+26 निकालो, फिर बीच वाली संख्या के तीन गुना से जाँचो।",
    "Which number sits between the other two rods?": "कौन सी संख्या बाकी दो छड़ों के बीच में है?",
    "Let the longest rod give one counter to the shortest rod.": "सबसे लंबी छड़ से एक टोकन सबसे छोटी छड़ को दे दो।",
    "Then all three rods are as long as the middle one.": "तब तीनों छड़ें बीच वाली छड़ जितनी लंबी हो जाती हैं।",
    "Yes, three rods of 25 make the same total.": "हाँ, 25 की तीन छड़ों का योग वही आता है।",
    "Check the sum 30 + 31 by doubling the greater number and taking one away.": "बड़ी संख्या को दुगुना करके एक घटाओ और 30+31 जाँचो।",
    "Count the counters in the shorter rod, then in the longer one.": "छोटी छड़ के टोकन गिनो, फिर लंबी छड़ के।",
    "Yes, twice 31 less 1 matches the sum.": "हाँ, 31 का दुगुना एक कम, योग के बराबर है।",
    "Digits marching down a times table": "पहाड़े में नीचे चलते अंक",
    "Read down the ones. Now read down the tens. What does each one do?": "इकाई को ऊपर से नीचे पढ़ो। अब दहाई को पढ़ो। हर एक क्या करती है?",
    "Split each answer into its tens and its ones.": "हर उत्तर को दहाई और इकाई में बाँटो।",
    "Tap the blinking Split key.": "चमकते अलग करो बटन पर टैप करो।",
    "Now read the ones column, then the tens column.": "अब इकाई का खाना पढ़ो, फिर दहाई का खाना।",
    "Tap the Read key now.": "अब पढ़ो बटन पर टैप करो।",
    "The tens of 99, 108 and 117 are 9, 10 and 11.": "99, 108 और 117 में दहाइयाँ 9, 10 और 11 हैं।",
    "The tens go up by 1 and the ones go down by 1 on each line.": "हर पंक्ति में दहाई 1 बढ़ती है और इकाई 1 घटती है।",
    "In the nine table the ones count down while the tens count up.": "नौ के पहाड़े में इकाई घटती है और दहाई बढ़ती है।",
    "You learned: in the nine table the ones fall while the tens rise.": "तुमने सीखा: नौ के पहाड़े में इकाई घटती है, दहाई बढ़ती है।",
    "Look at both columns, then write 14 × 9.": "दोनों खाने देखो, फिर 14×9 लिखो।",
    "Count the whole tens in 108, not just its digit.": "108 में पूरी दहाइयाँ गिनो, सिर्फ़ अंक नहीं।",
    "Yes, the next line fits both columns.": "हाँ, अगली पंक्ति दोनों खानों में ठीक बैठती है।",
    "Look at the ones down the table of five, then write 5 × 14.": "पाँच के पहाड़े में इकाई देखो, फिर 5×14 लिखो।",
    "Do the tens here climb on every line, or on every second one?": "यहाँ दहाई हर पंक्ति में बढ़ती है, या हर दूसरी में?",
    "Write down the ones digit of each answer, one by one.": "हर उत्तर का इकाई अंक एक-एक करके लिखो।",
    "The ones go 5, then 0, then 5, so what comes after that?": "इकाई 5, फिर 0, फिर 5 है, तो इसके बाद क्या आएगा?",
    "Yes, the ones took turns between 5 and 0.": "हाँ, इकाई बारी-बारी से 5 और 0 रही।",
    "Find the pattern in the ten table, then write 18 × 10.": "दस के पहाड़े में पैटर्न खोजो, फिर 18×10 लिखो।",
    "What do the ones digits of 150, 160 and 170 do?": "150, 160 और 170 के इकाई अंक क्या करते हैं?",
    "Count how many whole tens are in 170.": "170 में पूरी कितनी दहाइयाँ हैं, गिनो।",
    "Every answer ends in 0, and its tens are the number being multiplied.": "हर उत्तर 0 पर खत्म होता है, और दहाई गुणा की जा रही संख्या है।",
    "Yes, the ones stayed 0 and the tens counted on.": "हाँ, इकाई 0 रही और दहाई आगे गिनती रही।",
    "When the jumps grow": "जब छलाँगें बढ़ती हैं",
    "Look at the jumps. How much bigger is each one than the last?": "छलाँगों को देखो। हर छलाँग पिछली से कितनी बड़ी है?",
    "Write the jump between each pair of totals.": "हर दो योगों के बीच की छलाँग लिखो।",
    "Tap the blinking Find jumps key.": "चमकते छलाँग खोजो बटन पर टैप करो।",
    "Now write how much each jump grows by.": "अब लिखो कि हर छलाँग कितनी बढ़ती है।",
    "Tap the Find growth key now.": "अब बढ़त खोजो बटन पर टैप करो।",
    "Write the jump between each pair of answers, then look at those jumps.": "हर दो उत्तरों के बीच की छलाँग लिखो, फिर उन्हें देखो।",
    "Add the growth to the last jump, then add that jump to the last answer.": "बढ़त को पिछली छलाँग में जोड़ो, फिर उसे पिछले उत्तर में।",
    "When the jumps grow, find how they grow, and carry that on.": "छलाँगें बढ़ें, तो देखो कैसे बढ़ती हैं, और उसे आगे चलाओ।",
    "You learned: when the jumps grow, find how they grow.": "तुमने सीखा: छलाँगें बढ़ें, तो देखो वे कितनी बढ़ती हैं।",
    "next total": "अगला योग",
    "Read the jumps down the margin, then write the next total.": "बगल की छलाँगें ऊपर से नीचे पढ़ो, फिर अगला योग लिखो।",
    "Are all the jumps the same size, or does each get bigger?": "क्या सारी छलाँगें बराबर हैं, या हर एक बड़ी होती जाती है?",
    "Yes, the jumps grew by 1 each time.": "हाँ, हर बार छलाँग 1 से बढ़ी।",
    "The jumps grow by a bigger step here, so what is the next total?": "यहाँ छलाँगें बड़े कदम से बढ़ती हैं, तो अगला योग क्या है?",
    "Is each jump bigger than the last by the same amount?": "क्या हर छलाँग पिछली से उतनी ही बड़ी है?",
    "Yes, the jumps grew by 3 each time.": "हाँ, हर बार छलाँग 3 से बढ़ी।",
    "Carry on the jumps of 5 × 5, 6 × 6 and 7 × 7 to find 8 × 8.": "5×5, 6×6 और 7×7 की छलाँगें आगे बढ़ाकर 8×8 निकालो।",
    "Which jump is bigger, the one to 36 or the one to 49?": "कौन सी छलाँग बड़ी है, 36 तक की या 49 तक की?",
    "Yes, the jumps 11 and 13 grew by 2.": "हाँ, 11 और 13 की छलाँगें 2 से बढ़ीं।",
    "A missing line can hide the pattern": "छूटी पंक्ति पैटर्न छिपा सकती है",
    "Work this line out in full. Does it agree with the guess?": "इस पंक्ति को पूरा हल करो। क्या यह अनुमान से मेल खाती है?",
    "Work out the missing line, 15 × 15, in full.": "छूटी पंक्ति 15×15 को पूरा हल करो।",
    "Tap the blinking Work it out key.": "चमकते हल करो बटन पर टैप करो।",
    "Now put the missing line back on the board.": "अब छूटी पंक्ति को बोर्ड पर वापस रखो।",
    "Tap the Put back key now.": "अब वापस रखो बटन पर टैप करो।",
    "Work the line out in full before you trust the jumps.": "छलाँगों पर भरोसा करने से पहले पंक्ति को पूरा हल करो।",
    "Put the skipped line back, then read the jumps once more.": "छूटी पंक्ति वापस रखो, फिर छलाँगें दोबारा पढ़ो।",
    "A line left out can make growing jumps look equal, so work one line in full.": "छूटी पंक्ति बढ़ती छलाँगों को बराबर दिखा सकती है, एक पंक्ति पूरी हल करो।",
    "You learned: a line left out can make growing jumps look equal.": "तुमने सीखा: छूटी पंक्ति बढ़ती छलाँगों को बराबर दिखा सकती है।",
    "The jumps look equal, so work out 9 × 9 in full to check.": "छलाँगें बराबर दिखती हैं, इसलिए 9×9 पूरा हल करके जाँचो।",
    "Do the numbers being multiplied down the board skip one?": "क्या बोर्ड में नीचे गुणा की जा रही संख्याओं में कोई छूटी है?",
    "Right, 3 × 3 was missing, so the jumps were never equal.": "सही, 3×3 छूटा था, इसलिए छलाँगें कभी बराबर नहीं थीं।",
    "Add 2,468 and 22,222 in full to test the guess of 2,46,810.": "अनुमान 2,46,810 जाँचने के लिए 2,468 और 22,222 पूरे जोड़ो।",
    "Set the two numbers in columns, ones under ones, and add.": "दोनों संख्याओं को खानों में रखो, इकाई के नीचे इकाई, और जोड़ो।",
    "Start at the ones column and carry whenever a column reaches ten.": "इकाई के खाने से शुरू करो, और खाना दस हो तो हासिल ले जाओ।",
    "The ones make 8 + 2 = 10, so write 0 and carry 1.": "इकाई में 8+2=10 होता है, तो 0 लिखो और 1 हासिल ले जाओ।",
    "Right, the digit pattern stops at the last line.": "सही, अंकों का पैटर्न आखिरी पंक्ति पर रुक जाता है।",
    "Put the missing 6 back between 4 and 10, then find what comes after 16.": "छूटी 6 को 4 और 10 के बीच वापस रखो, फिर 16 के बाद क्या है, खोजो।",
    "Would the two jumps still look equal with the missing line back?": "छूटी पंक्ति वापस रखने पर क्या दोनों छलाँगें बराबर दिखेंगी?",
    "Write the jumps again with the 6 in place.": "6 को उसकी जगह रखकर छलाँगें फिर से लिखो।",
    "The jumps are 2, 4 and 6, so the next jump is 8.": "छलाँगें 2, 4 और 6 हैं, तो अगली छलाँग 8 है।",
    "Right, the list was never growing by equal jumps.": "सही, सूची बराबर छलाँगों से कभी नहीं बढ़ रही थी।",
    "next number": "अगली संख्या",
    "tens": "दहाई",
    "ones": "इकाई",
    "jump": "छलाँग",
    "grows by": "बढ़त",
    "add in columns": "खानों में जोड़ो",
    "the jumps": "छलाँगें",
    "1st": "पहली",
    "2nd": "दूसरी",
    "3rd": "तीसरी",
    "4th": "चौथी",
    "5th": "पाँचवीं",
    "Join": "मिलाओ",
    "Double": "दुगुना",
    "Take one": "एक हटाओ",
    "Share one": "एक दे दो",
    "Split": "अलग करो",
    "Read": "पढ़ो",
    "Find jumps": "छलाँग खोजो",
    "Find growth": "बढ़त खोजो",
    "Work it out": "हल करो",
    "Put back": "वापस रखो",
    "Hide": "छिपाओ",
    "Another board": "दूसरा बोर्ड",
    "12 + 13": "12 + 13",
    "24 + 25 + 26": "24 + 25 + 26",
    "30 + 31": "30 + 31",
    "14 × 9": "14 × 9",
    "5 × 14": "5 × 14",
    "18 × 10": "18 × 10",
    "8 × 8": "8 × 8",
    "9 × 9": "9 × 9",
  },
  gu: {
    "Pattern Lines": "પેટર્નની લીટીઓ",
    "Can you see the pattern down the answers?": "શું તમે જવાબોમાં પેટર્ન જોઈ શકો છો?",
    "A board of sums, one to a line. Read down the answers before you write.": "દાખલાઓનું એક બોર્ડ, દરેક લીટીમાં એક. લખતાં પહેલાં જવાબો ઉપરથી નીચે વાંચો.",
    "Every board read, and every guess checked against a line worked in full.": "દરેક બોર્ડ વાંચ્યું. દરેક અનુમાન પૂરી ઉકેલેલી લીટીથી તપાસ્યું.",
    "Free play. Any board, with the jumps, Work it out, Put back, Hide and Another board.": "મુક્ત રમત. કોઈ પણ બોર્ડ, છલાંગો, ઉકેલો, પાછી મૂકો, છુપાવો અને બીજું બોર્ડ.",
    "Adding numbers that sit side by side": "બાજુ-બાજુની સંખ્યાઓ ઉમેરવી",
    "Double the bigger one and take one away. Is it the same as the sum?": "મોટી સંખ્યાને બમણી કરો અને એક ઘટાડો. શું તે સરવાળા જેટલું છે?",
    "Slide the two rods end to end.": "બંને સળિયાને છેડે છેડે જોડો.",
    "Tap the blinking Join key.": "ઝબકતા જોડો બટન પર ટૅપ કરો.",
    "Lay the longer rod down twice.": "લાંબા સળિયાને બે વાર મૂકો.",
    "Now tap the Double key.": "હવે બમણું બટન પર ટૅપ કરો.",
    "Lift one counter off the doubled rod.": "બમણા સળિયા પરથી એક ટોકન ઉઠાવી લો.",
    "Last, tap the Take one key.": "છેલ્લે એક કાઢો બટન પર ટૅપ કરો.",
    "Double the longer rod, then take one counter away.": "લાંબા સળિયાને બમણો કરો, પછી એક ટોકન કાઢી નાખો.",
    "Two rods side by side hold one less than twice the longer rod.": "બાજુ-બાજુના બે સળિયામાં લાંબા સળિયાના બમણા કરતાં એક ટોકન ઓછું હોય છે.",
    "Two make one less than twice the greater, and three make three times the middle.": "બેનો સરવાળો મોટીના બમણાથી એક ઓછો, ત્રણનો સરવાળો વચલીના ત્રણ ગણો.",
    "You learned: two side by side make one less than twice the greater.": "તમે શીખ્યા: બાજુ-બાજુની બે સંખ્યાનો સરવાળો મોટીના બમણાથી એક ઓછો.",
    "Find 12 + 13, then check it against double 13 less 1.": "12+13 શોધો, પછી 13 ના બમણાથી એક ઓછા સાથે તપાસો.",
    "Which of the two rods holds more counters?": "બંને સળિયામાંથી કોનામાં વધારે ટોકન છે?",
    "Yes, both ways come to the same number.": "હા, બંને રીતે એક જ સંખ્યા આવે છે.",
    "Find 24 + 25 + 26, then check it against 3 times the middle number.": "24+25+26 શોધો, પછી વચલી સંખ્યાના ત્રણ ગણા સાથે તપાસો.",
    "Which number sits between the other two rods?": "કઈ સંખ્યા બાકીના બે સળિયાની વચ્ચે છે?",
    "Let the longest rod give one counter to the shortest rod.": "સૌથી લાંબા સળિયામાંથી એક ટોકન સૌથી નાના સળિયાને આપો.",
    "Then all three rods are as long as the middle one.": "પછી ત્રણેય સળિયા વચલા સળિયા જેટલા લાંબા થઈ જાય છે.",
    "Yes, three rods of 25 make the same total.": "હા, 25 ના ત્રણ સળિયાનો સરવાળો એ જ આવે છે.",
    "Check the sum 30 + 31 by doubling the greater number and taking one away.": "મોટી સંખ્યાને બમણી કરીને એક ઘટાડો અને 30+31 તપાસો.",
    "Count the counters in the shorter rod, then in the longer one.": "નાના સળિયાના ટોકન ગણો, પછી લાંબાના.",
    "Yes, twice 31 less 1 matches the sum.": "હા, 31 નું બમણું એક ઓછું, સરવાળા જેટલું છે.",
    "Digits marching down a times table": "ઘડિયામાં નીચે ચાલતા અંકો",
    "Read down the ones. Now read down the tens. What does each one do?": "એકમને ઉપરથી નીચે વાંચો. હવે દશકને વાંચો. દરેક શું કરે છે?",
    "Split each answer into its tens and its ones.": "દરેક જવાબને દશક અને એકમમાં વહેંચો.",
    "Tap the blinking Split key.": "ઝબકતા અલગ કરો બટન પર ટૅપ કરો.",
    "Now read the ones column, then the tens column.": "હવે એકમનું ખાનું વાંચો, પછી દશકનું ખાનું.",
    "Tap the Read key now.": "હવે વાંચો બટન પર ટૅપ કરો.",
    "The tens of 99, 108 and 117 are 9, 10 and 11.": "99, 108 અને 117 માં દશક 9, 10 અને 11 છે.",
    "The tens go up by 1 and the ones go down by 1 on each line.": "દરેક લીટીમાં દશક 1 વધે છે અને એકમ 1 ઘટે છે.",
    "In the nine table the ones count down while the tens count up.": "નવના ઘડિયામાં એકમ ઘટે છે અને દશક વધે છે.",
    "You learned: in the nine table the ones fall while the tens rise.": "તમે શીખ્યા: નવના ઘડિયામાં એકમ ઘટે છે, દશક વધે છે.",
    "Look at both columns, then write 14 × 9.": "બંને ખાના જુઓ, પછી 14×9 લખો.",
    "Count the whole tens in 108, not just its digit.": "108 માં પૂરા દશક ગણો, ફક્ત અંક નહીં.",
    "Yes, the next line fits both columns.": "હા, આગળની લીટી બંને ખાનામાં બંધ બેસે છે.",
    "Look at the ones down the table of five, then write 5 × 14.": "પાંચના ઘડિયામાં એકમ જુઓ, પછી 5×14 લખો.",
    "Do the tens here climb on every line, or on every second one?": "અહીં દશક દરેક લીટીમાં વધે છે, કે દર બીજી લીટીમાં?",
    "Write down the ones digit of each answer, one by one.": "દરેક જવાબનો એકમ અંક એક-એક કરીને લખો.",
    "The ones go 5, then 0, then 5, so what comes after that?": "એકમ 5, પછી 0, પછી 5 છે, તો તે પછી શું આવશે?",
    "Yes, the ones took turns between 5 and 0.": "હા, એકમ વારાફરતી 5 અને 0 રહ્યો.",
    "Find the pattern in the ten table, then write 18 × 10.": "દસના ઘડિયામાં પેટર્ન શોધો, પછી 18×10 લખો.",
    "What do the ones digits of 150, 160 and 170 do?": "150, 160 અને 170 ના એકમ અંક શું કરે છે?",
    "Count how many whole tens are in 170.": "170 માં પૂરા કેટલા દશક છે, ગણો.",
    "Every answer ends in 0, and its tens are the number being multiplied.": "દરેક જવાબ 0 પર પૂરો થાય છે, અને દશક ગુણાતી સંખ્યા છે.",
    "Yes, the ones stayed 0 and the tens counted on.": "હા, એકમ 0 રહ્યો અને દશક આગળ ગણાતા ગયા.",
    "When the jumps grow": "જ્યારે છલાંગો વધે છે",
    "Look at the jumps. How much bigger is each one than the last?": "છલાંગો જુઓ. દરેક છલાંગ પાછલી કરતાં કેટલી મોટી છે?",
    "Write the jump between each pair of totals.": "દરેક બે સરવાળા વચ્ચેની છલાંગ લખો.",
    "Tap the blinking Find jumps key.": "ઝબકતા છલાંગ શોધો બટન પર ટૅપ કરો.",
    "Now write how much each jump grows by.": "હવે લખો કે દરેક છલાંગ કેટલી વધે છે.",
    "Tap the Find growth key now.": "હવે વધારો શોધો બટન પર ટૅપ કરો.",
    "Write the jump between each pair of answers, then look at those jumps.": "દરેક બે જવાબ વચ્ચેની છલાંગ લખો, પછી તેમને જુઓ.",
    "Add the growth to the last jump, then add that jump to the last answer.": "વધારો પાછલી છલાંગમાં ઉમેરો, પછી તેને પાછલા જવાબમાં.",
    "When the jumps grow, find how they grow, and carry that on.": "છલાંગો વધે, તો જુઓ કેવી રીતે વધે છે, અને તેને આગળ ચલાવો.",
    "You learned: when the jumps grow, find how they grow.": "તમે શીખ્યા: છલાંગો વધે, તો જુઓ કે તે કેટલી વધે છે.",
    "next total": "આગળનો સરવાળો",
    "Read the jumps down the margin, then write the next total.": "બાજુની છલાંગો ઉપરથી નીચે વાંચો, પછી આગળનો સરવાળો લખો.",
    "Are all the jumps the same size, or does each get bigger?": "શું બધી છલાંગો સરખી છે, કે દરેક મોટી થતી જાય છે?",
    "Yes, the jumps grew by 1 each time.": "હા, દર વખતે છલાંગ 1 વધી.",
    "The jumps grow by a bigger step here, so what is the next total?": "અહીં છલાંગો મોટા પગલે વધે છે, તો આગળનો સરવાળો શું છે?",
    "Is each jump bigger than the last by the same amount?": "શું દરેક છલાંગ પાછલી કરતાં એટલી જ મોટી છે?",
    "Yes, the jumps grew by 3 each time.": "હા, દર વખતે છલાંગ 3 વધી.",
    "Carry on the jumps of 5 × 5, 6 × 6 and 7 × 7 to find 8 × 8.": "5×5, 6×6 અને 7×7 ની છલાંગો આગળ ચલાવીને 8×8 શોધો.",
    "Which jump is bigger, the one to 36 or the one to 49?": "કઈ છલાંગ મોટી છે, 36 સુધીની કે 49 સુધીની?",
    "Yes, the jumps 11 and 13 grew by 2.": "હા, 11 અને 13 ની છલાંગો 2 વધી.",
    "A missing line can hide the pattern": "છૂટી ગયેલી લીટી પેટર્ન છુપાવી શકે છે",
    "Work this line out in full. Does it agree with the guess?": "આ લીટી પૂરી ઉકેલો. શું તે અનુમાન સાથે મેળ ખાય છે?",
    "Work out the missing line, 15 × 15, in full.": "છૂટેલી લીટી 15×15 પૂરી ઉકેલો.",
    "Tap the blinking Work it out key.": "ઝબકતા ઉકેલો બટન પર ટૅપ કરો.",
    "Now put the missing line back on the board.": "હવે છૂટેલી લીટી બોર્ડ પર પાછી મૂકો.",
    "Tap the Put back key now.": "હવે પાછી મૂકો બટન પર ટૅપ કરો.",
    "Work the line out in full before you trust the jumps.": "છલાંગો પર ભરોસો કરતાં પહેલાં લીટી પૂરી ઉકેલો.",
    "Put the skipped line back, then read the jumps once more.": "છૂટેલી લીટી પાછી મૂકો, પછી છલાંગો ફરી વાંચો.",
    "A line left out can make growing jumps look equal, so work one line in full.": "છૂટેલી લીટી વધતી છલાંગોને સરખી દેખાડી શકે છે, એક લીટી પૂરી ઉકેલો.",
    "You learned: a line left out can make growing jumps look equal.": "તમે શીખ્યા: છૂટી લીટી વધતી છલાંગોને સરખી દેખાડી શકે છે.",
    "The jumps look equal, so work out 9 × 9 in full to check.": "છલાંગો સરખી દેખાય છે, એટલે 9×9 પૂરું ઉકેલીને તપાસો.",
    "Do the numbers being multiplied down the board skip one?": "શું બોર્ડમાં નીચે ગુણાતી સંખ્યાઓમાં કોઈ છૂટી ગઈ છે?",
    "Right, 3 × 3 was missing, so the jumps were never equal.": "બરાબર, 3×3 છૂટી ગયું હતું, એટલે છલાંગો ક્યારેય સરખી ન હતી.",
    "Add 2,468 and 22,222 in full to test the guess of 2,46,810.": "2,46,810 ના અનુમાનને તપાસવા 2,468 અને 22,222 પૂરા ઉમેરો.",
    "Set the two numbers in columns, ones under ones, and add.": "બંને સંખ્યાઓને ખાનામાં ગોઠવો, એકમ નીચે એકમ, અને ઉમેરો.",
    "Start at the ones column and carry whenever a column reaches ten.": "એકમના ખાનાથી શરૂ કરો, અને ખાનું દસ થાય ત્યારે વદી લઈ જાઓ.",
    "The ones make 8 + 2 = 10, so write 0 and carry 1.": "એકમમાં 8+2=10 થાય છે, તો 0 લખો અને 1 વદી લઈ જાઓ.",
    "Right, the digit pattern stops at the last line.": "બરાબર, અંકોની પેટર્ન છેલ્લી લીટી પર અટકી જાય છે.",
    "Put the missing 6 back between 4 and 10, then find what comes after 16.": "છૂટેલી 6 ને 4 અને 10 વચ્ચે પાછી મૂકો, પછી 16 પછી શું છે તે શોધો.",
    "Would the two jumps still look equal with the missing line back?": "છૂટેલી લીટી પાછી મૂકતાં શું બંને છલાંગો સરખી દેખાશે?",
    "Write the jumps again with the 6 in place.": "6 ને તેની જગ્યાએ મૂકીને છલાંગો ફરી લખો.",
    "The jumps are 2, 4 and 6, so the next jump is 8.": "છલાંગો 2, 4 અને 6 છે, તો આગળની છલાંગ 8 છે.",
    "Right, the list was never growing by equal jumps.": "બરાબર, યાદી સરખી છલાંગોથી ક્યારેય વધતી ન હતી.",
    "next number": "આગળની સંખ્યા",
    "tens": "દશક",
    "ones": "એકમ",
    "jump": "છલાંગ",
    "grows by": "વધારો",
    "add in columns": "ખાનામાં ઉમેરો",
    "the jumps": "છલાંગો",
    "1st": "પહેલી",
    "2nd": "બીજી",
    "3rd": "ત્રીજી",
    "4th": "ચોથી",
    "5th": "પાંચમી",
    "Join": "જોડો",
    "Double": "બમણું",
    "Take one": "એક કાઢો",
    "Share one": "એક આપો",
    "Split": "અલગ કરો",
    "Read": "વાંચો",
    "Find jumps": "છલાંગ શોધો",
    "Find growth": "વધારો શોધો",
    "Work it out": "ઉકેલો",
    "Put back": "પાછી મૂકો",
    "Hide": "છુપાવો",
    "Another board": "બીજું બોર્ડ",
    "12 + 13": "12 + 13",
    "24 + 25 + 26": "24 + 25 + 26",
    "30 + 31": "30 + 31",
    "14 × 9": "14 × 9",
    "5 × 14": "5 × 14",
    "18 × 10": "18 × 10",
    "8 × 8": "8 × 8",
    "9 × 9": "9 × 9",
  },
};

/* One entry per phase = one mount.
   items: qid = the plan's question id; kind drives Work, judge and the traceback.
     nums     (phase 1) the rods of counters, in counting order
     rows     the lines already on the board: [left text, answer]
     askLeft  the line being asked for (its answer cell is empty until the child writes it)
     rowsBack / hideAt / askBack   (phase 4) the board with its hidden line put back, and where that line goes
     slate    (phase 4) the line worked in full: title and the steps written there (a step ending "=" leaves its answer blank)
     ora      the second route to the answer, used by oracle() only (never by judge or Work)
     near     the misconception of THIS question, which judge must reject
     win      the one-sentence win line, said at the right answer (the last of a phase is replaced by the closing)
     tl       the short left text of the summary thumbnail */
const PHASES = [
  {
    n: 1,
    concept: "Adding numbers that sit side by side",
    conceptId: "M2.S3.T6.C25", objectiveIds: ["O9"],
    says: ["Double the bigger one and take one away. Is it the same as the sum?"],
    steps: [
      { say: "Slide the two rods end to end.", on: "join", hint: "Tap the blinking Join key." },
      { say: "Lay the longer rod down twice.", on: "double", hint: "Now tap the Double key." },
      { say: "Lift one counter off the doubled rod.", on: "take", hint: "Last, tap the Take one key." },
    ],
    stepHold: 3600,
    ladder: ["Double the longer rod, then take one counter away.", "Two rods side by side hold one less than twice the longer rod."],
    closing: "Two make one less than twice the greater, and three make three times the middle.",
    learned: "You learned: two side by side make one less than twice the greater.",
    traceback: "when the wrong answer is the near miss its own route is laid out first (the smaller rod doubled less one falls short of the joined rods; three rods of the greatest overhang the three), then the two rods join end to end, the greater rod is laid down twice with one counter lifted off, and the rows finish level on the whole answer; three rods share a counter until they stand level",
    items: [
      /* learn ML1: answer in the plan = Both give 25, because two numbers side by side add up to one less than twice the greater */
      { qid: "M2.S3.T6.C25:ML1", kind: "rods", nums: [12, 13], askLeft: "12 + 13", tl: "12 + 13",
        answer: 25, near: 23, ora: { r: "rule2", a: 12, b: 13 }, winMs: 3400,
        ask: "12 + 13", say: "Find 12 + 13, then check it against double 13 less 1.",
        miss: "Which of the two rods holds more counters?",
        win: "Yes, both ways come to the same number." },
      /* practice 1: answer in the plan = Yes. 24 + 25 + 26 = 75, and 25 x 3 = 75 */
      { qid: "M2.S3.T6.C25:1", kind: "rods", nums: [24, 25, 26], askLeft: "24 + 25 + 26", tl: "24 + 25 + 26",
        answer: 75, near: 78, ora: { r: "rule3", a: 24, m: 25, g: 26 }, winMs: 3400,
        ask: "24 + 25 + 26", say: "Find 24 + 25 + 26, then check it against 3 times the middle number.",
        miss: "Which number sits between the other two rods?",
        ladder: ["Let the longest rod give one counter to the shortest rod.", "Then all three rods are as long as the middle one."],
        win: "Yes, three rods of 25 make the same total." },
      /* practice 2: answer in the plan = 31 x 2 = 62, and one less is 61, so the sum is right */
      { qid: "M2.S3.T6.C25:2", kind: "rods", nums: [30, 31], askLeft: "30 + 31", tl: "30 + 31",
        answer: 61, near: 59, ora: { r: "rule2", a: 30, b: 31 }, winMs: 3400,
        ask: "30 + 31", say: "Check the sum 30 + 31 by doubling the greater number and taking one away.",
        miss: "Count the counters in the shorter rod, then in the longer one.",
        win: "Yes, twice 31 less 1 matches the sum." },
    ],
  },
  {
    n: 2,
    concept: "Digits marching down a times table",
    conceptId: "M2.S3.T6.C26", objectiveIds: ["O9"],
    says: ["Read down the ones. Now read down the tens. What does each one do?"],
    steps: [
      { say: "Split each answer into its tens and its ones.", on: "split", hint: "Tap the blinking Split key." },
      { say: "Now read the ones column, then the tens column.", on: "read", hint: "Tap the Read key now." },
    ],
    stepHold: 3600,
    ladder: ["The tens of 99, 108 and 117 are 9, 10 and 11.", "The tens go up by 1 and the ones go down by 1 on each line."],
    closing: "In the nine table the ones count down while the tens count up.",
    learned: "You learned: in the nine table the ones fall while the tens rise.",
    traceback: "the digit bay splits every answer into whole tens and ones, the two columns are read down, and the next line lands complete",
    items: [
      /* learn ML2: answer in the plan = 99, 108, 117 and 126. The ones digits count down 9, 8, 7, 6, and the number of tens counts up 9, 10, 11, 12 */
      { qid: "M2.S3.T6.C26:ML2", kind: "table", rows: [["11 × 9", 99], ["12 × 9", 108], ["13 × 9", 117]], askLeft: "14 × 9", tl: "14 × 9",
        answer: 126, near: 26, ora: { r: "rep", a: 14, b: 9 }, winMs: 3400,
        ask: "14 × 9", say: "Look at both columns, then write 14 × 9.",
        miss: "Count the whole tens in 108, not just its digit.",
        win: "Yes, the next line fits both columns." },
      /* practice 3: answer in the plan = 55, 60, 65 and 70. The ones digits take turns, 5 then 0 */
      { qid: "M2.S3.T6.C26:3", kind: "table", rows: [["5 × 11", 55], ["5 × 12", 60], ["5 × 13", 65]], askLeft: "5 × 14", tl: "5 × 14",
        answer: 70, near: 75, ora: { r: "rep", a: 5, b: 14 }, winMs: 3400,
        ask: "5 × 14", say: "Look at the ones down the table of five, then write 5 × 14.",
        miss: "Do the tens here climb on every line, or on every second one?",
        ladder: ["Write down the ones digit of each answer, one by one.", "The ones go 5, then 0, then 5, so what comes after that?"],
        win: "Yes, the ones took turns between 5 and 0." },
      /* practice 4: answer in the plan = 160, 170 and 180. The ones digit is always 0, and the number of tens is the number multiplied by ten: 16, 17 and 18 */
      { qid: "M2.S3.T6.C26:4", kind: "table", rows: [["15 × 10", 150], ["16 × 10", 160], ["17 × 10", 170]], askLeft: "18 × 10", tl: "18 × 10",
        answer: 180, near: 18, ora: { r: "rep", a: 18, b: 10 }, winMs: 3400,
        ask: "18 × 10", say: "Find the pattern in the ten table, then write 18 × 10.",
        miss: "What do the ones digits of 150, 160 and 170 do?",
        ladder: ["Count how many whole tens are in 170.", "Every answer ends in 0, and its tens are the number being multiplied."],
        win: "Yes, the ones stayed 0 and the tens counted on." },
    ],
  },
  {
    n: 3,
    concept: "When the jumps grow",
    conceptId: "M2.S3.T6.C27", objectiveIds: ["O10"],
    says: ["Look at the jumps. How much bigger is each one than the last?"],
    steps: [
      { say: "Write the jump between each pair of totals.", on: "jumps", hint: "Tap the blinking Find jumps key." },
      { say: "Now write how much each jump grows by.", on: "growth", hint: "Tap the Find growth key now." },
    ],
    stepHold: 3600,
    ladder: ["Write the jump between each pair of answers, then look at those jumps.", "Add the growth to the last jump, then add that jump to the last answer."],
    closing: "When the jumps grow, find how they grow, and carry that on.",
    learned: "You learned: when the jumps grow, find how they grow.",
    traceback: "the jumps are written down the margin, the growth beside them stays the same, the next jump writes itself in and the next total lands under it",
    items: [
      /* learn ML3: answer in the plan = 15 and 21 */
      { qid: "M2.S3.T6.C27:ML3", kind: "grow", rows: [["1", 1], ["1 + 2", 3], ["1 + 2 + 3", 6], ["1 + 2 + 3 + 4", 10]],
        askLeft: "1 + 2 + 3 + 4 + 5", blankLeft: "next total", tl: "next total", answer: 15, near: 14, ora: { r: "tri", n: 5 }, winMs: 3400,
        ask: "next total", say: "Read the jumps down the margin, then write the next total.",
        miss: "Are all the jumps the same size, or does each get bigger?",
        win: "Yes, the jumps grew by 1 each time." },
      /* practice 5: answer in the plan = 30 and 45. The totals 3, 9, 18, 30 and 45 jump by 6, 9, 12 and 15, growing by three each time */
      { qid: "M2.S3.T6.C27:5", kind: "grow", rows: [["3", 3], ["3 + 6", 9], ["3 + 6 + 9", 18]],
        askLeft: "3 + 6 + 9 + 12", blankLeft: "next total", tl: "next total", answer: 30, near: 27, ora: { r: "mulsum", step: 3, n: 4 }, winMs: 3400,
        ask: "next total", say: "The jumps grow by a bigger step here, so what is the next total?",
        miss: "Is each jump bigger than the last by the same amount?",
        win: "Yes, the jumps grew by 3 each time." },
      /* practice 6: answer in the plan = No. The jumps are 11 and 13, growing by two, so the next jump is 15 and 8 x 8 = 64 */
      { qid: "M2.S3.T6.C27:6", kind: "grow", rows: [["5 × 5", 25], ["6 × 6", 36], ["7 × 7", 49]],
        askLeft: "8 × 8", tl: "8 × 8", answer: 64, near: 62, ora: { r: "rep", a: 8, b: 8 }, winMs: 3400,
        ask: "8 × 8", say: "Carry on the jumps of 5 × 5, 6 × 6 and 7 × 7 to find 8 × 8.",
        miss: "Which jump is bigger, the one to 36 or the one to 49?",
        win: "Yes, the jumps 11 and 13 grew by 2." },
    ],
  },
  {
    n: 4,
    concept: "A missing line can hide the pattern",
    conceptId: "M2.S3.T6.C28", objectiveIds: ["O10"],
    says: ["Work this line out in full. Does it agree with the guess?"],
    steps: [
      { say: "Work out the missing line, 15 × 15, in full.", on: "work", hint: "Tap the blinking Work it out key." },
      { say: "Now put the missing line back on the board.", on: "putback", hint: "Tap the Put back key now." },
    ],
    stepHold: 3600,
    ladder: ["Work the line out in full before you trust the jumps.", "Put the skipped line back, then read the jumps once more."],
    closing: "A line left out can make growing jumps look equal, so work one line in full.",
    learned: "You learned: a line left out can make growing jumps look equal.",
    traceback: "the slate works the line in full, the hidden line slides back into its place, the jump labels either side are rewritten where they stand and the whole answer lands",
    items: [
      /* learn ML4: answer in the plan = No. 9 x 9 = 81. The line 3 x 3 = 9 is missing, and with it put back the jumps are 8, 16 and 24, so the next jump is 32 */
      { qid: "M2.S3.T6.C28:ML4", kind: "hidden", rows: [["1 × 1", 1], ["5 × 5", 25], ["7 × 7", 49]], askLeft: "9 × 9",
        rowsBack: [["1 × 1", 1], ["3 × 3", 9], ["5 × 5", 25], ["7 × 7", 49]], askBack: "9 × 9", hideAt: 1, tl: "9 × 9",
        slate: { title: "9 × 9", steps: ["9 × 5 = 45", "9 × 4 = 36", "45 + 36 ="] },
        answer: 81, near: 73, ora: { r: "rep", a: 9, b: 9 }, winMs: 3800,
        ask: "9 × 9", say: "The jumps look equal, so work out 9 × 9 in full to check.",
        miss: "Do the numbers being multiplied down the board skip one?",
        win: "Right, 3 × 3 was missing, so the jumps were never equal." },
      /* practice 7: answer in the plan = No, the guess is wrong. 2468 + 22222 = 24690, so working one line in full shows where the digit pattern stops */
      { qid: "M2.S3.T6.C28:7", kind: "hidden", rows: [["2", 2], ["+ 22", 24], ["+ 222", 246], ["+ 2,222", 2468]],
        askLeft: "+ 22,222", noJumps: true, tl: "+ 22,222",
        slate: { title: "add in columns", col: { a: 2468, b: 22222 } },
        answer: 24690, near: 246810, ora: { r: "col", a: 2468, b: 22222 }, winMs: 4200,
        ask: "next total", say: "Add 2,468 and 22,222 in full to test the guess of 2,46,810.",
        miss: "Set the two numbers in columns, ones under ones, and add.",
        ladder: ["Start at the ones column and carry whenever a column reaches ten.", "The ones make 8 + 2 = 10, so write 0 and carry 1."],
        win: "Right, the digit pattern stops at the last line." },
      /* practice 8: answer in the plan = 24. The full list is 4, 6, 10, 16, with jumps 2, 4 and 6, so the next jump is 8. The equal jumps of 6 came from the missing number, and 22 is wrong */
      { qid: "M2.S3.T6.C28:8", kind: "hidden", rows: [["1st", 4], ["2nd", 10], ["3rd", 16]], askLeft: "4th",
        rowsBack: [["1st", 4], ["2nd", 6], ["3rd", 10], ["4th", 16]], askBack: "5th", hideAt: 1, tl: "16 + 8",
        slate: { title: "the jumps", steps: ["10 − 4 = 6", "16 − 10 = 6"], stepsBack: ["6 − 4 = 2", "10 − 6 = 4", "16 − 10 = 6"] },
        answer: 24, near: 22, ora: { r: "addjumps", start: 4, jumps: [2, 4, 6, 8] }, winMs: 3800,
        ask: "next number", say: "Put the missing 6 back between 4 and 10, then find what comes after 16.",
        miss: "Would the two jumps still look equal with the missing line back?",
        ladder: ["Write the jumps again with the 6 in place.", "The jumps are 2, 4 and 6, so the next jump is 8."],
        win: "Right, the list was never growing by equal jumps." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too).
   pic     the picture is ONE fixed 880-wide drawing, centred in the working area (the open width with bigPad is 900)
   warm    the board the guide steps work on (never question 1's own board)
   free    Free play: any board, each with one line left out, so the hide control and the slate have work */
const MODEL = {
  pic: { w: 880, top: 58, pitch: 70 },
  warm: {
    1: { nums: [7, 8], askLeft: "7 + 8" },
    2: { rows: [["2 × 9", 18], ["3 × 9", 27], ["4 × 9", 36]] },
    3: { rows: [["2", 2], ["2 + 4", 6], ["2 + 4 + 6", 12]] },
    4: { rows: [["5 × 5", 25], ["25 × 25", 625], ["35 × 35", 1225]],
      rowsBack: [["5 × 5", 25], ["15 × 15", 225], ["25 × 25", 625], ["35 × 35", 1225]], hideAt: 1,
      slate: { title: "15 × 15", steps: ["15 × 10 = 150", "15 × 5 = 75", "150 + 75 = 225"] } },
  } as any,
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

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* every answer of this tool is typed on the 12-key pad: nothing to set on the working area */
const answer = () => undefined;
/* in a guide-steps phase (stage "demo") check() must return undefined so the agent's check() reaches api.onEnter */
const check = () => undefined;

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 with the panel shut, 900 x 520 open (bigPad). The picture is ONE fixed 880-wide drawing centred in
   that room (OX), so it never reflows when the keypad opens and nothing ever runs under the key's corner (box.key). */

/* deeper inks for coloured numerals, so every one of them reads at 4.5:1 on the card */
const PL_INK: any = {
  blue: shade(CONTENT.hundred, 0.25), amber: shade(CONTENT.ten, 0.42), green: shade(CONTENT.one, 0.25),
  step: shade(CONTENT.pointer, 0.25), plum: shade(CONTENT.bead, 0.3), plum2: shade(CONTENT.bead, 0.3),
};
const PL_PAINT: any = { blue: "gHundred", amber: "gTen", green: "gOne", plum: "gBead", step: "gPointer" };
/* the wash over a counter's button skin: the greater rod is the skin's own amber (no wash), the smaller rod blue, the built rod green */
const PL_WASH: any = { blue: CONTENT.hundred, green: CONTENT.one, plum: CONTENT.bead };
/* the one key at the bottom centre: its label follows the act */
const PL_KEY: any = { join: "Join", double: "Double", take: "Take one", level: "Share one", split: "Split", read: "Read", jumps: "Find jumps",
  growth: "Find growth", work: "Work it out", putback: "Put back", hide: "Hide", "another-board": "Another board" };
/* the acts a board offers, in order (the guide steps name the same ids) */
const plActs = (n: number, it: any) => (n === 1 ? (it.nums && it.nums.length === 3 ? ["level"] : ["join", "double", "take"])
  : n === 2 ? ["split", "read"] : n === 3 ? ["jumps", "growth"] : it.hideAt !== undefined ? ["work", "putback"] : ["work"]);
/* a tap on the one key counts once: this time stamp lives at module level, so it survives a remount of Work between a guide step's
   last act and question 1 (four fast taps are one step, in both motion modes), and a double tap on Free play never lands on a key */
const PL_GUARD: any = { press: 0, free: 0 };
/* the width of a text in em: digits and signs 0.62, a space 0.28, a comma or point 0.3, any other letter 0.62 */
const plW = (s: any) => { let w = 0; String(s === null || s === undefined ? "" : s).split("").forEach((ch: string) => { w += ch === " " ? 0.28 : ch === "," || ch === "." ? 0.3 : 0.62; }); return Math.max(w, 0.62); };
/* text that has no layout engine: the biggest size of the scale that still fits the column */
const plFit = (s: any, w: number, max: number) => {
  const want = w / plW(s);
  return want >= max ? max : want >= T.prompt ? T.prompt : T.label;
};
/* a counter drawn as a flat button (a rim, a pressed ring and four holes), the plain look under a skin and above the 40-skin cap */
const PL_BTN: any = { blue: CONTENT.hundred, amber: "#E2A63F", green: CONTENT.one, plum: CONTENT.bead, plum2: tint(CONTENT.bead, 0.5) };
const plBtn = (x: number, y: number, r: number, c: string, k?: any) => {
  const f = PL_BTN[c] || PL_BTN.amber, o = r * 0.26;
  return (
    <g key={k}>
      <circle cx={x} cy={y} r={r} fill={f} stroke={shade(f, 0.4)} strokeWidth={Math.max(1.5, r * 0.14)} />
      <circle cx={x} cy={y} r={r * 0.66} fill="none" stroke={shade(f, 0.3)} strokeWidth={Math.max(1, r * 0.08)} />
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map((d: number[], j: number) => <circle key={j} cx={x + d[0] * o} cy={y + d[1] * o} r={Math.max(1.4, r * 0.1)} fill={shade(f, 0.6)} />)}
    </g>
  );
};
const plFmt = (v: any) => (v === null || v === undefined || v === "" ? "" : indian(Number(v)));
/* a blank waiting for the child: a dashed rule to write on */
const plBlank = (x: number, y: number, w: number, C: any, k?: any) => (
  <line key={k} x1={x} y1={y} x2={x + w} y2={y} stroke={shade(C.rule, 0.35)} strokeWidth={4} strokeDasharray="12 9" strokeLinecap="round" />
);
/* a jump or growth chip, centred on cx, cy */
const plChip = (cx: number, cy: number, w: number, text: string, tone: string, k: any) => (
  <g key={k} data-role="reading">
    <rect x={cx - w / 2} y={cy - 24} width={w} height={48} rx={14} fill="#FFFFFF" stroke={PL_INK[tone]} strokeWidth={3} />
    <text x={cx} y={cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PL_INK[tone]}>{text}</text>
  </g>
);

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const free = stage === "free";
  /* the guide steps work a warm-up board, never question 1's own; a phase opens on "teach" for one frame before "demo" */
  const warm = !free && (stage === "teach" || stage === "demo") && MODEL.warm[n] ? MODEL.warm[n] : null;
  const qk = free ? "free" : n + ":" + (warm ? "w" : index);
  /* the board belongs to the question's entry: derived in render, never reset by a passive effect */
  const fresh = (k: string) => ({ qk: k, done: {}, pr: {}, back: false, demo: null, fb: 0 });
  const [raw, setRaw] = useState<any>(() => fresh(qk));
  const S: any = raw.qk === qk ? raw : fresh(qk);
  const upd = (f: any) => setRaw((p: any) => f(p.qk === qk ? p : fresh(qk)));
  const [playing, setPlaying] = useState(false);
  const [hold, setHold] = useState(false);       /* the key is undrawn for 450 ms after a tap, so a lit key is never a dead key */
  const busy = useRef(false);
  const gen = useRef(0);
  const mine = useRef(false);

  const fbd = MODEL.free[S.fb % MODEL.free.length];
  const it: any = free ? { kind: "hidden", rows: fbd.rows, rowsBack: fbd.rowsBack, hideAt: fbd.hideAt, slate: fbd.slate } : warm || item;
  const kindN = free ? 4 : n;
  const order = free ? [] : plActs(kindN, it);

  const won = !free && (stage === "win" || stage === "idle");
  const has = (a: string) => won || !!S.done[a] || (S.pr[a] || 0) > 0;
  /* how many points of a progressive act have been reached (everything once it is done) */
  const cnt = (a: string) => (won || S.done[a] ? 99 : S.pr[a] || 0);
  const restored = it.hideAt !== undefined && (free ? !!S.back : has("putback"));
  const showAns = won || S.demo !== null;

  const OX = Math.max(0, Math.round((box.w - MODEL.pic.w) / 2));
  const ptX = (x: number) => OX + x;
  const TOP = MODEL.pic.top, PITCH = MODEL.pic.pitch;
  const rowY = (k: number) => TOP + k * PITCH;

  /* ── the lines of the board, the jumps between them and how the jumps grow ─────────────────── */
  const src = restored && it.rowsBack ? it.rowsBack : it.rows || [];
  const askLeft = restored && it.askBack ? it.askBack : it.askLeft;
  const lines: any[] = src.map((r: any, k: number) => ({ left: r[0], value: r[1], tone: restored && it.hideAt === k ? "plum" : "blue" }));
  const known = lines.length;
  if (askLeft && kindN !== 1) lines.push({ left: showAns || !it.blankLeft ? askLeft : it.blankLeft, value: showAns ? it.answer : null, tone: "green", ask: true });
  const vals = lines.map((l: any) => l.value);
  const jumps = vals.slice(1).map((v: any, k: number) => (v === null || vals[k] === null ? null : v - vals[k]));
  const grows = jumps.slice(1).map((v: any, k: number) => (v === null || jumps[k] === null ? null : v - jumps[k]));
  const jN = jumps.filter((v: any) => v !== null).length, gN = grows.filter((v: any) => v !== null).length;
  const jumpY = (k: number) => rowY(k + 1) - 4;
  const growY = (k: number) => (jumpY(k) + jumpY(k + 1)) / 2;
  const typedTxt = typed && /^\d+$/.test(String(typed)) ? indian(Number(typed)) : typed;

  /* ── the columns of each board ─────────────────────────────────────────────────────────────── */
  const COL: any = kindN === 2 ? { exprW: 240, ansR: 410, ruleW: 830, tensC: 560, onesC: 720 }
    : kindN === 3 ? { exprW: 340, ansR: 470, ruleW: 830, jumpC: 590, growC: 750 }
    : it.noJumps ? { exprW: 240, ansR: 440, ruleW: 470, slateX: 500, slateW: 380 }
    : { exprW: 190, ansR: 330, ruleW: 460, jumpC: 410, slateX: 490, slateW: 390 };
  const slateStepY = (i: number) => 116 + i * 60;
  const BIG = kindN === 2 ? 52 : 44;                                              /* the numerals of the board */

  /* ── phase 1: the rods ─────────────────────────────────────────────────────────────────────── */
  const nums: number[] = it.nums || [];
  const three = nums.length === 3;
  const rodTotal = nums.length ? (three ? Math.max.apply(null, nums) : Math.max(nums[0] + nums[1], 2 * nums[1])) : 1;
  const gap10 = 12;
  /* a rod row over 40 counters wraps into lines of 31 (the tens groups kept: 10, 10, 10, 1 then 10, 10, 10), so the counters stay
     r 10-11 even with the keypad open; every logical row then takes two lines, and the two rows stay aligned for the comparison */
  const wrapped = rodTotal > 40;
  const WRAP = wrapped ? 31 : 1e9;
  const pitch = wrapped ? (840 - 3 * gap10) / 31 : Math.min(40, (840 - Math.floor((rodTotal - 1) / 10) * gap10) / rodTotal);
  const rr = wrapped ? Math.min(11, pitch * 0.42) : Math.max(5, Math.min(17, pitch * 0.44));
  const cxl = (i: number) => { const q = i % WRAP; return 24 + rr + q * pitch + Math.floor(q / 10) * gap10; };      /* centre x of counter i */
  const lineTop = (v: number) => 84 + v * 54;
  const rowTop = (r: number) => (wrapped ? lineTop(2 * r) : 96 + r * 104);
  const cyl = (r: number, i: number) => (wrapped ? lineTop(2 * r + Math.floor(i / WRAP)) + 42 : rowTop(r) + 74);   /* centre y of counter i of rod row r */
  const rc = (r: number) => cyl(r, 0);                                               /* centre y of a rod row */
  /* the child's own wrong route (the near miss), shown FIRST by the correction: two rods, the smaller one doubled less one falls short of
     the joined rods; three rods, three rods of the greatest overhang the three. Plum, because it is what the child is asked to notice. */
  const routeOn = !!S.done.route || (S.pr.route || 0) > 0;
  const rodRows = (): any[] => {
    if (!nums.length) return [];
    if (three) {
      const lv = has("level"), lifted = lv || (S.pr.level || 0) > 0, rt = routeOn && !lifted;
      const g = nums[2];
      return [[{ n: nums[0], c: "blue" }].concat(lv ? [{ n: 1, c: "green" }] : rt ? [{ n: g - nums[0], c: "plum" }] : []),
        [{ n: nums[1], c: "amber" }].concat(rt ? [{ n: g - nums[1], c: "plum" }] : []),
        lifted ? [{ n: nums[2] - 1, c: "blue" }, { n: 1, c: "gone" }] : [{ n: nums[2], c: "blue" }]];
    }
    const a = nums[0], b = nums[1], jn = has("join"), db = has("double"), tk = has("take");
    const rows = [jn ? [{ n: a, c: "blue" }, { n: b, c: "amber" }] : [{ n: b, c: "amber" }],
      !jn ? [{ n: a, c: "blue" }] : !db ? [] : !tk ? [{ n: b, c: "amber" }, { n: b, c: "amber" }] : [{ n: b, c: "amber" }, { n: b - 1, c: "green" }, { n: 1, c: "gone" }]];
    if (routeOn) rows.push([{ n: a, c: "plum" }, { n: a - 1, c: "plum2" }, { n: b - a + 1, c: "gone" }]);
    return rows;
  };

  /* ── the acts: each is performed on screen by a real tool (api.act), and counts only when it ends ── */
  const mark = (k: string, v: number = 1) => upd((p: any) => ({ ...p, pr: { ...p.pr, [k]: v } }));
  const specOf = (a: string): any => {
    if (a === "join") return { tool: "hand", moves: "push", at: [{ x: ptX(cxl(0) + 60), y: rc(1) }, { x: ptX(cxl(0) + 60), y: rc(0) }], onPoint: (i: number) => { if (i === 1) mark("join"); } };
    if (a === "route") {
      if (three) return { tool: "hand", moves: "tap", at: [0, 1].map((r: number) => ({ x: ptX(cxl(nums[2] - 1)), y: rc(r) })), onPoint: (i: number) => { if (i === 1) mark("route"); } };
      return { tool: "hand", moves: "tap", at: [{ x: ptX(cxl(3)), y: rc(2) }], onPoint: () => mark("route") };
    }
    if (a === "double") return { tool: "hand", moves: "tap", at: [{ x: ptX(cxl(3)), y: rc(1) }], onPoint: () => mark("double") };
    if (a === "take") { const x = ptX(cxl(2 * nums[1] - 1)), ty = cyl(1, 2 * nums[1] - 1); return { tool: "eraser", moves: "rub", at: [{ x: x - 10, y: ty }, { x, y: ty }, { x: x + 10, y: ty }], onPoint: (i: number) => { if (i === 1) mark("take"); } }; }
    if (a === "level") {
      return { tool: "hand", moves: "carry", from: { x: ptX(cxl(nums[2] - 1)), y: rc(2) }, at: [{ x: ptX(cxl(nums[2] - 4)), y: rc(1) }], to: { x: ptX(cxl(nums[0])), y: rc(0) },
        hold: <circle cx={0} cy={0} r={rr} fill="url(#gOne)" stroke="#00000033" strokeWidth={1.5} />, onPoint: () => mark("level") };
    }
    if (a === "split") return { tool: "pencil", moves: "push", at: lines.slice(0, known).map((l: any, k: number) => ({ x: ptX(COL.tensC - 50), y: rowY(k) + 34 })), onPoint: (i: number) => mark("split", i + 1) };
    if (a === "read") {
      const ys = lines.slice(0, known).map((l: any, k: number) => rowY(k) + 30);
      return { tool: "hand", moves: "sweep", at: ys.map((y: number) => ({ x: ptX(COL.onesC), y })).concat(ys.slice().reverse().map((y: number) => ({ x: ptX(COL.tensC), y }))), onPoint: (i: number) => mark("read", i + 1) };
    }
    if (a === "jumps") return { tool: "pencil", moves: "push", at: Array.from({ length: jN }, (_, k) => ({ x: ptX(COL.jumpC - 30), y: jumpY(k) })), onPoint: (i: number) => mark("jumps", i + 1) };
    if (a === "growth") return { tool: "pencil", moves: "push", at: Array.from({ length: gN }, (_, k) => ({ x: ptX(COL.growC - 30), y: growY(k) })), onPoint: (i: number) => mark("growth", i + 1) };
    if (a === "work") {
      const sp = it.slate || {};
      const m = sp.col ? 3 : ((restored && sp.stepsBack ? sp.stepsBack : sp.steps) || []).length;
      return { tool: "pencil", moves: "push", at: Array.from({ length: m }, (_, i) => ({ x: ptX(COL.slateX + 70), y: slateStepY(i) - 10 + (sp.col ? 28 : 0) })), onPoint: (i: number) => mark("work", i + 1) };
    }
    if (a === "putback") {
      const y = rowY(it.hideAt) + 30;
      return { tool: "hand", moves: "push", at: [{ x: ptX(70), y: y + 70 }, { x: ptX(70), y }], onPoint: (i: number) => { if (i === 1) { if (free) upd((p: any) => ({ ...p, back: true })); else mark("putback"); } } };
    }
    if (a === "hide") {
      const y = rowY(it.hideAt) + 30;
      return { tool: "eraser", moves: "rub", at: [{ x: ptX(50), y }, { x: ptX(110), y }, { x: ptX(50), y }], onPoint: (i: number) => { if (i === 1) upd((p: any) => ({ ...p, back: false })); } };
    }
    return null;
  };
  const doAct = async (a: string, quiet?: boolean) => {
    if (busy.current) return false;
    const sp = specOf(a);
    if (!sp) return false;
    busy.current = true; setPlaying(true);
    /* the act is reported as it starts, so the Hint key never shows the hint of an act that is already running (it shows the next step's) */
    if (!quiet) api.did(a);
    const ok = await api.act(sp);
    busy.current = false; setPlaying(false);
    if (!ok) return false;
    upd((p: any) => ({ ...p, done: { ...p.done, [a]: true } }));
    api.sfx.settle();
    return true;
  };
  /* one tap never also presses the next label of the same key */
  const pressKey = (id: string) => {
    const t = Date.now();
    if (t - PL_GUARD.press < 450) return;
    if (free && t - PL_GUARD.free < 800) return;
    PL_GUARD.press = t;
    setHold(true); setTimeout(() => setHold(false), 450);
    if (id === "another-board") { api.did(id); upd((p: any) => ({ ...p, fb: p.fb + 1, done: {}, pr: {}, back: false, demo: null })); return; }
    if (free && id === "work") upd((p: any) => ({ ...p, done: { ...p.done, work: false }, pr: { ...p.pr, work: 0 } }));
    doAct(id);
  };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step's act */
  api.onEnter(stage === "demo" && stepOn ? () => {
    /* a real Enter (or Space) is one step: a repeat, or a second press within 450 ms, is ignored; the agent's check() and solve() are not key events */
    const ev: any = (window as any).event;
    if (ev && ev.type === "keydown") { const t = Date.now(); if (ev.repeat || t - PL_GUARD.press < 450) return; PL_GUARD.press = t; }
    if (S.done[stepOn]) api.did(stepOn); else doAct(stepOn);
  } : null);

  /* the traceback: the acts the child has not done are performed one after another, then the whole right answer is written on the
     line. Nothing the child can tap is undone by it, and it clears when the child types something else. */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const my = ++gen.current;
    const local: any = { ...S.done };
    (async () => {
      mine.current = true; api.lock(true);
      /* phase 1: when the child's wrong answer is the near miss, the wrong route is laid out first, then the right one */
      const viaRoute = n === 1 && item && Number(wrong.value) === item.near;
      const seq = viaRoute ? (three ? ["route"].concat(order) : ["join", "route", "double", "take"]) : order;
      for (const a of seq) {
        if (gen.current !== my) return;
        if (!local[a]) { const ok = await doAct(a, true); if (!ok && gen.current !== my) return; local[a] = true; }
      }
      if (gen.current !== my) return;
      upd((p: any) => ({ ...p, demo: String(wrong.value) }));
      mine.current = false; api.lock(false);
    })();
  }, [wrong]);
  /* a new question (or a new mount) stops a correction still playing and gives the pad back */
  useEffect(() => { if (free) PL_GUARD.free = Date.now(); }, [free]);
  useEffect(() => () => { gen.current++; if (mine.current) { mine.current = false; api.lock(false); } }, [qk]);
  useEffect(() => { if (S.demo !== null && S.demo !== typed) upd((p: any) => ({ ...p, demo: null })); }, [typed]);
  /* the win line, one sentence (the last question of a phase has it replaced by the closing) */
  useEffect(() => { if (stage === "win" && !free && item && item.win) api.say(item.win); }, [stage, n, index]);

  /* what the host and the agent read back (toolApi.getState): only what the picture shows */
  const sp0 = it.slate || {};
  const jOn = kindN >= 3 && !it.noJumps;
  api.share({ lines: vals, jumps: jumps.map((v: any, k: number) => (jOn && (kindN === 4 || k < cnt("jumps")) ? v : null)),
    jumpGrowth: kindN === 3 ? grows.map((v: any, k: number) => (k < cnt("growth") ? v : null)) : [], hiddenLines: it.hideAt !== undefined && !restored ? 1 : 0,
    workedLine: has("work") ? (sp0.title || null) : null, digitColumns: kindN === 2 && has("split"), complete: stage === "idle" });

  /* ── drawing helpers (plain functions: every hook stays above) ────────────────────────────── */
  const keyDefs = (): any[] => {
    if (won || (hold && !playing)) return [];
    if (free) return [{ id: "work", off: false }, { id: S.back ? "hide" : "putback", off: false }, { id: "another-board", off: false }];
    const a = order.find((x: string) => !S.done[x]);
    return a ? [{ id: a, off: false }] : [];
  };
  const keyRow = () => {
    const ks = keyDefs();
    const kw = ks.length > 1 ? 280 : 300, kh = 76, kg = 14;
    const total = ks.length * kw + (ks.length - 1) * kg;
    const x0 = (MODEL.pic.w - total) / 2, ky = box.h - 92;
    return (
      <g onKeyDownCapture={(e: any) => { if (e.repeat) { e.stopPropagation(); e.preventDefault(); } }}>
        {ks.map((k: any, j: number) => {
          const x = x0 + j * (kw + kg);
          return (
            <Key key={"k" + j} id={k.id} label={tx(PL_KEY[k.id])} x={x} y={ky} w={kw} h={kh} C={C} tone="key" disabled={playing} onClick={() => pressKey(k.id)}>
              <text y={lang === "en" ? 11 : 13} textAnchor="middle" fontSize={lang === "en" ? T.label : plFit(tx(PL_KEY[k.id]), (kw - 20) / 0.8, T.prompt)} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(PL_KEY[k.id])}</text>
            </Key>
          );
        })}
        {stepOn && ks.length > 0 && ks[0].id === stepOn && (
          <Invite x={x0 + kw / 2} y={ky + kh / 2} w={kw} h={kh} C={C} />
        )}
      </g>
    );
  };

  /* the equation line of phase 1, and the rods under it */
  const rodsView = () => {
    const rows = rodRows();
    const exprW = String(it.askLeft || "").length * 34;
    const lvl = three ? has("level") : has("take");
    const xe = (three ? cxl(nums[1] - 1) : cxl(nums[0] + nums[1] - 1)) + rr + 12;
    const lvTop = wrapped ? lineTop(1) + 8 : rowTop(0) + 42, lvBot = wrapped ? lineTop(2 * rows.length - 1) + 52 : rowTop(rows.length - 1) + 100;
    /* the button skin only while a board never shows more than 40 counters at once (IMAGES §2): decided per question from its largest
       state, so a board never changes its look mid-question. Above that the plain dots stay (the 7 + 8 warm-up peaks at 31). */
    const peak = nums.length ? (three ? nums[0] + nums[1] + nums[2] : nums[0] + 3 * nums[1]) : 0;
    const skinned = peak > 0 && peak <= 40;
    return (
      <g>
        <g data-role="reading">
          <text x={24} y={62} fontSize={T.xl} fontWeight={700} fill={C.ink}>{tx(it.askLeft)}</text>
          {!warm && <text x={24 + exprW + 18} y={62} fontSize={T.xl} fontWeight={700} fill={C.ink}>=</text>}
          {!warm && (showAns ? (
            <text x={24 + exprW + 76} y={62} fontSize={T.xl} fontWeight={700} fill={PL_INK.green}>{plFmt(it.answer)}</text>
          ) : typed ? (
            <text x={24 + exprW + 76} y={62} fontSize={T.xl} fontWeight={700} fill={C.ink}>{typedTxt}</text>
          ) : plBlank(24 + exprW + 76, 62, 190, C))}
        </g>
        {rows.map((segs: any[], r: number) => {
          let i = 0;
          /* the wrong-route row is two halves: the second half is a lighter plum with half a counter of gap at the join, so each half reads as its label */
          const J = !three && r === 2 ? segs[0].n : -1;
          const gx = (idx: number) => cxl(idx) + (J >= 0 && idx >= J && Math.floor(idx / WRAP) === Math.floor(J / WRAP) ? pitch * 0.5 : 0);
          return (
            <g key={"rod" + r}>
              {segs.map((s: any, j: number) => {
                const from = i; i += s.n;
                return (
                  <g key={"sg" + j}>
                    {Array.from({ length: s.n }, (_, q) => (s.c === "gone" ? (
                      <circle key={q} cx={gx(from + q)} cy={cyl(r, from + q)} r={rr} fill={tint(PL_INK.step, 0.88)} stroke={PL_INK.step} strokeWidth={4} strokeDasharray="7 6" />
                    ) : (
                      <g key={q}>
                        {plBtn(gx(from + q), cyl(r, from + q), rr, s.c)}
                        {skinned && <Skin name="counter" x={gx(from + q) - rr} y={cyl(r, from + q) - rr} w={2 * rr} h={2 * rr} fit="stretch" />}
                        {skinned && PL_WASH[s.c] && <circle cx={gx(from + q)} cy={cyl(r, from + q)} r={rr * 0.94} fill={PL_WASH[s.c]} fillOpacity={0.72} />}
                      </g>
                    )))}
                    {s.c !== "gone" && s.n >= 3 && (() => {
                      const mid = from + Math.floor((s.n - 1) / 2);
                      return wrapped
                        ? <text x={gx(mid)} y={lineTop(2 * r + Math.floor(mid / WRAP)) + 27} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PL_INK[s.c]}>{String(s.n)}</text>
                        : <text x={(gx(from) + gx(from + s.n - 1)) / 2} y={rowTop(r) + 36} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={PL_INK[s.c]}>{String(s.n)}</text>;
                    })()}
                  </g>
                );
              })}
            </g>
          );
        })}
        {lvl && <line x1={xe} y1={lvTop} x2={xe} y2={lvBot} stroke={PL_INK.step} strokeWidth={4} strokeLinecap="round" />}
      </g>
    );
  };

  /* the board of lines of phases 2 to 4: every line's expression at ONE size, the largest that fits the longest of them */
  const exprFs = Math.min.apply(null, lines.map((l: any) => plFit(tx(l.left), COL.exprW, kindN === 2 ? 48 : 40)).concat([99]));
  const boardView = () => (
    <g>
      {lines.map((l: any, k: number) => {
        const y = rowY(k);
        const blank = l.value === null;
        const lt = tx(l.left);
        return (
          <g key={"ln" + k} data-role="reading">
            {l.tone === "plum" && <rect x={0} y={y} width={COL.ruleW} height={PITCH - 8} rx={12} fill={tint(CONTENT.bead, 0.8)} />}
            <line x1={0} y1={y + PITCH - 8} x2={COL.ruleW} y2={y + PITCH - 8} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
            <text x={12} y={y + 48} fontSize={exprFs} fontWeight={600} fill={l.tone === "plum" ? PL_INK.plum : C.ink}>{lt}</text>
            {!blank && <text x={COL.ansR} y={y + 50} textAnchor="end" fontSize={BIG} fontWeight={700} fill={PL_INK[l.tone]}>{plFmt(l.value)}</text>}
            {blank && l.ask && (typed && !showAns
              ? <text x={COL.ansR} y={y + 50} textAnchor="end" fontSize={BIG} fontWeight={700} fill={C.ink}>{typedTxt}</text>
              : plBlank(COL.ansR - 150, y + 56, 150, C))}
          </g>
        );
      })}
    </g>
  );

  /* phase 2: every answer split into its tens and its ones, and the two columns read */
  const digitsView = () => {
    const m = known, r = cnt("read");
    const cols = [{ key: "tens", c: COL.tensC, hue: "hundred", ink: PL_INK.blue }, { key: "ones", c: COL.onesC, hue: "ten", ink: PL_INK.amber }];
    return (
      <g>
        {cnt("split") > 0 && cols.map((c: any) => (
          <text key={"h" + c.key} x={c.c} y={38} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx(c.key)}</text>
        ))}
        {lines.map((l: any, k: number) => {
          const y = rowY(k);
          const on = l.ask ? cnt("split") > 0 : k < cnt("split");
          if (!on) return null;
          return cols.map((c: any) => {
            const lit = l.ask ? r >= 2 * m : c.key === "ones" ? k < Math.min(r, m) : r - m > m - 1 - k;
            const v = l.value;
            const t = v === null ? "" : String(c.key === "tens" ? Math.floor(v / 10) : v % 10);
            return (
              <g key={c.key + k} data-role="reading">
                <rect x={c.c - 64} y={y + 2} width={128} height={PITCH - 14} rx={12} fill={lit && v !== null ? tint(CONTENT[c.hue], 0.78) : "none"} stroke={C.rule} strokeWidth={2.5} />
                {t !== "" && <text x={c.c} y={y + 50} textAnchor="middle" fontSize={BIG} fontWeight={700} fill={c.ink}>{t}</text>}
              </g>
            );
          });
        })}
      </g>
    );
  };

  /* phases 3 and 4: the jump written between every pair of answers, and phase 3's growth beside them */
  const jumpsView = () => {
    const showJ = kindN === 4 ? true : null;
    return (
      <g>
        {(kindN === 4 || cnt("jumps") > 0) && <text x={COL.jumpC} y={38} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx("jump")}</text>}
        {kindN === 3 && cnt("growth") > 0 && <text x={COL.growC} y={38} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx("grows by")}</text>}
        {jumps.map((v: any, k: number) => (v === null || !(showJ || k < cnt("jumps")) ? null : plChip(COL.jumpC, jumpY(k), kindN === 4 ? 100 : 110, "+" + plFmt(v), "step", "j" + k)))}
        {kindN === 3 && grows.map((v: any, k: number) => (v === null || k >= cnt("growth") ? null : plChip(COL.growC, growY(k), 120, "+" + plFmt(v), "plum", "g" + k)))}
      </g>
    );
  };

  /* phase 4: the slate, where one line is worked in full */
  const slateView = () => {
    const sx = COL.slateX, sw = COL.slateW;
    const done = cnt("work");
    const steps: string[] = ((restored && sp0.stepsBack ? sp0.stepsBack : sp0.steps) || []);
    const col = sp0.col;
    const colA = col ? String(col.a).split("") : [], colB = col ? String(col.b).split("") : [];
    const cw = 52, right = sx + sw - 28;
    const colX = (i: number, len: number) => right - (len - 1 - i) * cw - cw / 2;
    /* the column sum's carries: the digit that moves up into the next column (8 + 2 = 10 in the ones carries 1 into the tens) */
    const cy = (i: number) => slateStepY(i) + 28;
    const carries: number[] = [];
    if (col) {
      const da = colA.slice().reverse().map(Number), db = colB.slice().reverse().map(Number);
      let cr = 0;
      for (let j = 0; j < Math.max(da.length, db.length); j++) { const t = (da[j] || 0) + (db[j] || 0) + cr; cr = t >= 10 ? 1 : 0; carries.push(cr); }
    }
    return (
      <g>
        <rect x={sx} y={0} width={sw} height={372} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={3} />
        <g data-role="reading">
          <text x={sx + sw / 2} y={52} textAnchor="middle" fontSize={plFit(tx(sp0.title || ""), sw - 40, T.xl - 12)} fontWeight={700} fill={C.ink}>{tx(sp0.title || "")}</text>
          {col ? (
            <g>
              {done >= 3 && carries.map((c: number, j: number) => (c === 1 && j + 1 < Math.max(colA.length, colB.length) + 1 ? (
                <text key={"cr" + j} x={right - (j + 1) * cw - cw / 2} y={cy(0) - 46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PL_INK.step}>1</text>
              ) : null))}
              {done >= 1 && colA.map((d: string, i: number) => <text key={"a" + i} x={colX(i, colA.length)} y={cy(0)} textAnchor="middle" fontSize={T.xl - 12} fontWeight={700} fill={C.ink}>{d}</text>)}
              {done >= 2 && <text x={sx + 22} y={cy(1)} fontSize={T.xl - 12} fontWeight={700} fill={PL_INK.step}>+</text>}
              {done >= 2 && colB.map((d: string, i: number) => <text key={"b" + i} x={colX(i, colB.length)} y={cy(1)} textAnchor="middle" fontSize={T.xl - 12} fontWeight={700} fill={C.ink}>{d}</text>)}
              {done >= 3 && <line x1={sx + 20} y1={cy(1) + 24} x2={sx + sw - 20} y2={cy(1) + 24} stroke={C.ink} strokeWidth={4} />}
              {done >= 3 && (showAns
                ? <text x={right} y={cy(2) + 8} textAnchor="end" fontSize={T.xl - 12} fontWeight={700} fill={PL_INK.green}>{plFmt(it.answer)}</text>
                : plBlank(sx + 60, cy(2) + 8, sw - 90, C))}
            </g>
          ) : steps.map((t: string, i: number) => {
            if (i >= done) return null;
            const fs = plFit(tx(t), sw - 48, T.speech - 8);
            const open = /=$/.test(t);
            return (
              <g key={"st" + i}>
                <text x={sx + 24} y={slateStepY(i) + 8} fontSize={fs} fontWeight={600} fill={C.ink}>{tx(t)}</text>
                {open && (showAns
                  ? <text x={sx + 24 + t.length * 0.62 * fs + 14} y={slateStepY(i) + 8} fontSize={fs} fontWeight={700} fill={PL_INK.green}>{plFmt(it.answer)}</text>
                  : plBlank(sx + 24 + t.length * 0.62 * fs + 14, slateStepY(i) + 12, 90, C))}
              </g>
            );
          })}
        </g>
      </g>
    );
  };

  return (
    <g>
      <g transform={"translate(" + OX + ",0)"}>
        {kindN === 1 && rodsView()}
        {kindN > 1 && boardView()}
        {kindN === 2 && digitsView()}
        {kindN >= 3 && !it.noJumps && jumpsView()}
        {kindN === 4 && slateView()}
        {keyRow()}
      </g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the line they wrote and its answer */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const q: any = it || {};
  const lt = tx(q.tl || q.askLeft || "");
  /* the card is inset 4 on every side so two neighbouring cards never touch, and both lines sit inside it, the answer above its bottom edge */
  const ins = 4, H = h - 2 * ins;
  const f1 = plW(lt) * T.label <= w - 28 ? T.label : T.micro;
  return (
    <g>
      <rect x={ins} y={ins} width={w - 2 * ins} height={H} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <g data-role="reading">
        <text x={w / 2} y={ins + 0.42 * H} textAnchor="middle" fontSize={f1} fontWeight={600} fill={C.ink}>{lt}</text>
        <text x={w / 2} y={ins + 0.92 * H} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PL_INK.green}>{plFmt(last.value)}</text>
      </g>
    </g>
  );
}

function PatternLines(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area is the whole card until the child taps Answer, then the panel slides in */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right */
      keyOnly: true,
      /* the wide keypad: the picture is one fixed 880-wide drawing, which fits x 64 to 964 while the panel is open */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d): one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default PatternLines;
