/* ═══ M2.S3.T6.C24.2D1 · pattern_lines · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists. THE LESSON IS SILENT (runtime r30+): every line is printed on the bubble.
   Remade 2026-10-26 from the owner's new description: an ADDITION section (consecutive numbers: two make one less than twice the
   greater, three make three times the middle) and a MULTIPLICATION section (the tables of 5, 9 and 10: the digits go up or down,
   predict the next line). The child changes the numbers (a start, a table) in the guide steps and in Free play, completes missing
   values and tests a prediction with the pencil, and a miss shows WHY the pattern works.
   The picture is a strip of cards (phases 2-4) and rows of counters (phase 1), laid out ONCE at 880 wide.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "pattern_lines";
const MEDIA_ID = "M2.S3.T6.C24.2D1";
const TOOL_NAME = "Pattern Lines";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["Numbers that sit side by side make a pattern. Look for it before you write."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Every pattern read, and every guess checked against a line worked in full.";
/* printed when the child opens Free play; its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Change the numbers, test your guess and fill the missing one.";

/* THE START PAGE (docs/LAYOUT.md §1c): two rows of counters, one longer than the other, and a strip of cards from a times table.
   No digit here is a question's answer. Drawn in a 1200 x 340 box. */
const START_HOOK = "Can you see the pattern in the answers?";
function StartArt({ box, C, lang, tx }: any) {
  const cards = [["2 × 9", 18], ["3 × 9", 27], ["4 × 9", 36]];
  const rowA = 6, rowB = 7;
  const btn = (x: number, y: number, r: number, c: string, k: any, wash?: string) => (
    <g key={k}>
      <circle cx={x} cy={y} r={r} fill={c} stroke={shade(c, 0.4)} strokeWidth={3} />
      <circle cx={x} cy={y} r={r * 0.66} fill="none" stroke={shade(c, 0.3)} strokeWidth={2} />
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map((d: number[], j: number) => <circle key={j} cx={x + d[0] * r * 0.26} cy={y + d[1] * r * 0.26} r={r * 0.1} fill={shade(c, 0.6)} />)}
      <Skin name="counter" x={x - r} y={y - r} w={2 * r} h={2 * r} fit="stretch" />
      {wash && <circle cx={x} cy={y} r={r * 0.94} fill={wash} fillOpacity={0.72} />}
    </g>
  );
  return (
    <g>
      <rect x={30} y={10} width={500} height={320} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={3} />
      {Array.from({ length: rowA }, (_, q) => btn(80 + q * 66, 110, 28, "#E2A63F", "a" + q, CONTENT.hundred))}
      {Array.from({ length: rowB }, (_, q) => btn(80 + q * 66, 230, 28, "#E2A63F", "b" + q))}
      {cards.map((c: any, k: number) => (
        <g key={"c" + k}>
          <rect x={600 + k * 190} y={50} width={170} height={240} rx={20} fill="#FFFFFF" stroke={C.rule} strokeWidth={4} />
          <text x={685 + k * 190} y={130} textAnchor="middle" fontSize={T.speech} fontWeight={600} fill={C.ink}>{c[0]}</text>
          <text x={685 + k * 190} y={225} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(CONTENT.hundred, 0.25)}>{String(c[1])}</text>
        </g>
      ))}
    </g>
  );
}

/*TR-BEGIN*/
/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte. */
const TR: any = {
  hi: {
    "Pattern Lines": "पैटर्न की पंक्तियाँ",
    "Adding consecutive numbers, one after another": "लगातार संख्याएँ जोड़ना, एक के बाद एक",
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
    "Yes, both ways come to the same number.": "हाँ, दोनों तरीकों से एक ही संख्या आती है।",
    "Find 24 + 25 + 26, then check it against 3 times the middle number.": "24+25+26 निकालो, फिर बीच वाली संख्या के तीन गुना से जाँचो।",
    "Let the longest rod give one counter to the shortest rod.": "सबसे लंबी छड़ से एक टोकन सबसे छोटी छड़ को दे दो।",
    "Then all three rods are as long as the middle one.": "तब तीनों छड़ें बीच वाली छड़ जितनी लंबी हो जाती हैं।",
    "Yes, three rods of 25 make the same total.": "हाँ, 25 की तीन छड़ों का योग वही आता है।",
    "Check the sum 30 + 31 by doubling the greater number and taking one away.": "बड़ी संख्या को दुगुना करके एक घटाओ और 30+31 जाँचो।",
    "Yes, twice 31 less 1 matches the sum.": "हाँ, 31 का दुगुना एक कम, योग के बराबर है।",
    "Digits marching down a times table": "पहाड़े में नीचे चलते अंक",
    "Split each answer into its tens and its ones.": "हर उत्तर को दहाई और इकाई में बाँटो।",
    "Tap the blinking Split key.": "चमकते अलग करो बटन पर टैप करो।",
    "Tap the Read key now.": "अब पढ़ो बटन पर टैप करो।",
    "The tens of 99, 108 and 117 are 9, 10 and 11.": "99, 108 और 117 में दहाइयाँ 9, 10 और 11 हैं।",
    "The tens go up by 1 and the ones go down by 1 on each line.": "हर पंक्ति में दहाई 1 बढ़ती है और इकाई 1 घटती है।",
    "In a times table the ones and the tens each follow a pattern.": "पहाड़े में इकाई और दहाई, दोनों एक पैटर्न पर चलती हैं।",
    "You learned: in the nine table the ones fall while the tens rise.": "तुमने सीखा: नौ के पहाड़े में इकाई घटती है, दहाई बढ़ती है।",
    "Check your tens and ones against the line before it.": "अपनी दहाई और इकाई को पिछली पंक्ति से मिलाओ।",
    "Do the tens here climb on every line, or on every second one?": "यहाँ दहाई हर पंक्ति में बढ़ती है, या हर दूसरी में?",
    "Write down the ones digit of each answer, one by one.": "हर उत्तर का इकाई अंक एक-एक करके लिखो।",
    "The ones go 5, then 0, then 5, so what comes after that?": "इकाई 5, फिर 0, फिर 5 है, तो इसके बाद क्या आएगा?",
    "Yes, the ones took turns between 5 and 0.": "हाँ, इकाई बारी-बारी से 5 और 0 रही।",
    "Find the pattern in the ten table, then write 18 × 10.": "दस के पहाड़े में पैटर्न खोजो, फिर 18×10 लिखो।",
    "What do the ones digits of 150, 160 and 170 do?": "150, 160 और 170 के इकाई अंक क्या करते हैं?",
    "Count how many whole tens are in 170.": "170 में पूरी कितनी दहाइयाँ हैं, गिनो।",
    "Look at the tens and the ones digit down the table of ten.": "दस के पहाड़े में दहाई और इकाई अंक को देखो।",
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
    "When the jumps are found, does each get bigger?": "छलाँगें मिलने पर, क्या हर एक बड़ी है?",
    "Yes, the jumps grew by 1 each time.": "हाँ, हर बार छलाँग 1 से बढ़ी।",
    "Find the jumps first, then write the next total.": "पहले छलाँगें खोजो, फिर अगला योग लिखो।",
    "Is each jump bigger than the last by the same amount?": "क्या हर छलाँग पिछली से उतनी ही बड़ी है?",
    "Yes, the jumps grew by 3 each time.": "हाँ, हर बार छलाँग 3 से बढ़ी।",
    "Carry on the jumps of 5 × 5, 6 × 6 and 7 × 7 to find 8 × 8.": "5×5, 6×6 और 7×7 की छलाँगें आगे बढ़ाकर 8×8 निकालो।",
    "Which jump is bigger, the one to 36 or the one to 49?": "कौन सी छलाँग बड़ी है, 36 तक की या 49 तक की?",
    "Yes, the jumps 11 and 13 grew by 2.": "हाँ, 11 और 13 की छलाँगें 2 से बढ़ीं।",
    "A missing line can hide the pattern": "छूटी पंक्ति पैटर्न छिपा सकती है",
    "Does the guess hold up?": "क्या अनुमान सही निकलता है?",
    "Work out the missing line, 15 × 15, in full.": "छूटी पंक्ति 15×15 को पूरा हल करो।",
    "Tap the blinking Work it out key.": "चमकते हल करो बटन पर टैप करो।",
    "Now put the missing line back on the board.": "अब छूटी पंक्ति को बोर्ड पर वापस रखो।",
    "Tap the Put back key now.": "अब वापस रखो बटन पर टैप करो।",
    "Work the line out in full before you trust the jumps.": "छलाँगों पर भरोसा करने से पहले पंक्ति को पूरा हल करो।",
    "Put the skipped line back, then read the jumps once more.": "छूटी पंक्ति वापस रखो, फिर छलाँगें दोबारा पढ़ो।",
    "A line left out can make growing jumps look equal, so work one line in full.": "छूटी पंक्ति बढ़ती छलाँगों को बराबर दिखा सकती है, एक पंक्ति पूरी हल करो।",
    "You learned: a line left out can make growing jumps look equal.": "तुमने सीखा: छूटी पंक्ति बढ़ती छलाँगों को बराबर दिखा सकती है।",
    "The jumps look equal, so work out 9 × 9 in full to check.": "छलाँगें बराबर दिखती हैं, इसलिए 9×9 पूरा हल करके जाँचो।",
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
    "start": "शुरुआत",
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
    "12 + 13": "12 + 13",
    "24 + 25 + 26": "24 + 25 + 26",
    "30 + 31": "30 + 31",
    "14 × 9": "14 × 9",
    "5 × 14": "5 × 14",
    "18 × 10": "18 × 10",
    "8 × 8": "8 × 8",
    "9 × 9": "9 × 9",
    "Numbers that sit side by side make a pattern. Look for it before you write.": "पास-पास की संख्याओं से पैटर्न बनता है। लिखने से पहले उसे खोजो।",
    "Every pattern read, and every guess checked against a line worked in full.": "हर पैटर्न पढ़ा गया। हर अनुमान एक पूरी हल की पंक्ति से जाँचा गया।",
    "Free play. Change the numbers, test your guess and fill the missing one.": "मुक्त खेल। संख्याएँ बदलो, अपना अनुमान जाँचो और छूटी संख्या भरो।",
    "Can you see the pattern in the answers?": "क्या तुम उत्तरों में पैटर्न देख सकते हो?",
    "Now try the next pair of numbers.": "अब संख्याओं की अगली जोड़ी आज़माओ।",
    "Tap the blinking Next pair key.": "चमकते अगली जोड़ी बटन पर टैप करो।",
    "Which of the two rods is the one to double?": "दोनों छड़ों में से किसे दुगुना करना है?",
    "Join the two rods first, then look at the greater one.": "पहले दोनों छड़ें जोड़ो, फिर बड़ी छड़ को देखो।",
    "Twice the greater, less one, lies along the two rods joined.": "बड़ी का दुगुना एक कम, जुड़ी दोनों छड़ों के बराबर बैठता है।",
    "Three of the biggest is too many, so use the middle number.": "सबसे बड़ी के तीन गुने ज़्यादा हैं, इसलिए बीच वाली संख्या लो।",
    "Which number is the greater, and what do you do to it?": "कौन सी संख्या बड़ी है, और उसके साथ क्या करना है?",
    "Lay the two rods end to end, then lay 31 twice under them.": "दोनों छड़ें सिरे से सिरे मिलाकर रखो, फिर 31 को उनके नीचे दो बार रखो।",
    "Twice 31 less one should match the sum you found.": "31 का दुगुना एक कम, तुम्हारे निकाले योग से मिलना चाहिए।",
    "What does each one do?": "हर एक क्या करती है?",
    "Now read along the ones, then along the tens.": "अब इकाई को पढ़ो, फिर दहाई को पढ़ो।",
    "Now try the table of five.": "अब पाँच का पहाड़ा आज़माओ।",
    "Tap the blinking Table of 5 key.": "चमकते 5 का पहाड़ा बटन पर टैप करो।",
    "Now test what the next line will be.": "अब जाँचो कि अगली पंक्ति क्या होगी।",
    "Tap the blinking Test it key.": "चमकते जाँचो बटन पर टैप करो।",
    "Look at both rows, then write 14 × 9.": "दोनों पंक्तियाँ देखो, फिर 14×9 लिखो।",
    "Yes, the next line fits both rows.": "हाँ, अगली पंक्ति दोनों में ठीक बैठती है।",
    "Look at the ones along the table of five, then write 5 × 14.": "पाँच के पहाड़े में इकाई देखो, फिर 5×14 लिखो।",
    "Now test what the next total will be.": "अब जाँचो कि अगला योग क्या होगा।",
    "Tap Find jumps, then write the next total.": "छलाँग खोजो बटन पर टैप करो, फिर अगला योग लिखो।",
    "The jumps are 2, 3 and 4, so each is 1 bigger.": "छलाँगें 2, 3 और 4 हैं, तो हर एक 1 बड़ी है।",
    "The next jump is 1 bigger than 4, so add it on.": "अगली छलाँग 4 से 1 बड़ी है, उसे जोड़ दो।",
    "The jumps are 6 and 9, so each is 3 bigger.": "छलाँगें 6 और 9 हैं, तो हर एक 3 बड़ी है।",
    "Add 3 to the last jump, then add that to the last total.": "पिछली छलाँग में 3 जोड़ो, फिर उसे पिछले योग में जोड़ो।",
    "The jumps are 11 and 13, so each is 2 bigger.": "छलाँगें 11 और 13 हैं, तो हर एक 2 बड़ी है।",
    "The next jump is 15, so add it to the last answer.": "अगली छलाँग 15 है, उसे पिछले उत्तर में जोड़ो।",
    "Do the numbers on the cards go up by equal steps?": "क्या कार्डों की संख्याएँ बराबर कदम से बढ़ती हैं?",
    "guess": "अनुमान",
    "Test it": "जाँचो",
    "Next pair": "अगली जोड़ी",
    "Table of 5": "5 का पहाड़ा",
    "Add": "जोड़ो",
    "Times": "गुणा",
    "2 numbers": "2 संख्याएँ",
    "3 numbers": "3 संख्याएँ",
    "twice 13, less 1": "13 का दुगुना, एक कम",
    "25 counted 3 times": "25 तीन बार गिना",
    "twice 31, less 1": "31 का दुगुना, एक कम",
    "tens up, ones down": "दहाई ऊपर, इकाई नीचे",
    "ones take turns": "इकाई बारी-बारी से",
    "ones stay 0": "इकाई 0 रहती है",
    "jumps grow by 1": "छलाँगें 1 बढ़ती हैं",
    "jumps grow by 3": "छलाँगें 3 बढ़ती हैं",
    "jumps grow by 2": "छलाँगें 2 बढ़ती हैं",
    "3 × 3 was missing": "3×3 छूटा था",
    "digit pattern stops": "अंकों का पैटर्न रुकता है",
    "the 6 was missing": "6 छूटी थी",
    "15 × 15 was missing": "15×15 छूटा था",
    "double, less one": "दुगुना, एक कम",
    "middle counted 3 times": "बीच वाली तीन बार गिनी",
  },
  gu: {
    "Pattern Lines": "પેટર્નની લીટીઓ",
    "Adding consecutive numbers, one after another": "ક્રમિક સંખ્યાઓ ઉમેરવી, એક પછી એક",
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
    "Yes, both ways come to the same number.": "હા, બંને રીતે એક જ સંખ્યા આવે છે.",
    "Find 24 + 25 + 26, then check it against 3 times the middle number.": "24+25+26 શોધો, પછી વચલી સંખ્યાના ત્રણ ગણા સાથે તપાસો.",
    "Let the longest rod give one counter to the shortest rod.": "સૌથી લાંબા સળિયામાંથી એક ટોકન સૌથી નાના સળિયાને આપો.",
    "Then all three rods are as long as the middle one.": "પછી ત્રણેય સળિયા વચલા સળિયા જેટલા લાંબા થઈ જાય છે.",
    "Yes, three rods of 25 make the same total.": "હા, 25 ના ત્રણ સળિયાનો સરવાળો એ જ આવે છે.",
    "Check the sum 30 + 31 by doubling the greater number and taking one away.": "મોટી સંખ્યાને બમણી કરીને એક ઘટાડો અને 30+31 તપાસો.",
    "Yes, twice 31 less 1 matches the sum.": "હા, 31 નું બમણું એક ઓછું, સરવાળા જેટલું છે.",
    "Digits marching down a times table": "ઘડિયામાં નીચે ચાલતા અંકો",
    "Split each answer into its tens and its ones.": "દરેક જવાબને દશક અને એકમમાં વહેંચો.",
    "Tap the blinking Split key.": "ઝબકતા અલગ કરો બટન પર ટૅપ કરો.",
    "Tap the Read key now.": "હવે વાંચો બટન પર ટૅપ કરો.",
    "The tens of 99, 108 and 117 are 9, 10 and 11.": "99, 108 અને 117 માં દશક 9, 10 અને 11 છે.",
    "The tens go up by 1 and the ones go down by 1 on each line.": "દરેક લીટીમાં દશક 1 વધે છે અને એકમ 1 ઘટે છે.",
    "In a times table the ones and the tens each follow a pattern.": "ઘડિયામાં એકમ અને દશક, બંને એક પેટર્ન પર ચાલે છે.",
    "You learned: in the nine table the ones fall while the tens rise.": "તમે શીખ્યા: નવના ઘડિયામાં એકમ ઘટે છે, દશક વધે છે.",
    "Check your tens and ones against the line before it.": "તમારા દશક અને એકમને પાછલી લીટી સાથે મેળવો.",
    "Do the tens here climb on every line, or on every second one?": "અહીં દશક દરેક લીટીમાં વધે છે, કે દર બીજી લીટીમાં?",
    "Write down the ones digit of each answer, one by one.": "દરેક જવાબનો એકમ અંક એક-એક કરીને લખો.",
    "The ones go 5, then 0, then 5, so what comes after that?": "એકમ 5, પછી 0, પછી 5 છે, તો તે પછી શું આવશે?",
    "Yes, the ones took turns between 5 and 0.": "હા, એકમ વારાફરતી 5 અને 0 રહ્યો.",
    "Find the pattern in the ten table, then write 18 × 10.": "દસના ઘડિયામાં પેટર્ન શોધો, પછી 18×10 લખો.",
    "What do the ones digits of 150, 160 and 170 do?": "150, 160 અને 170 ના એકમ અંક શું કરે છે?",
    "Count how many whole tens are in 170.": "170 માં પૂરા કેટલા દશક છે, ગણો.",
    "Look at the tens and the ones digit down the table of ten.": "દસના ઘડિયામાં દશક અને એકમ અંક જુઓ.",
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
    "When the jumps are found, does each get bigger?": "છલાંગો મળ્યા પછી, શું દરેક મોટી છે?",
    "Yes, the jumps grew by 1 each time.": "હા, દર વખતે છલાંગ 1 વધી.",
    "Find the jumps first, then write the next total.": "પહેલાં છલાંગો શોધો, પછી આગળનો સરવાળો લખો.",
    "Is each jump bigger than the last by the same amount?": "શું દરેક છલાંગ પાછલી કરતાં એટલી જ મોટી છે?",
    "Yes, the jumps grew by 3 each time.": "હા, દર વખતે છલાંગ 3 વધી.",
    "Carry on the jumps of 5 × 5, 6 × 6 and 7 × 7 to find 8 × 8.": "5×5, 6×6 અને 7×7 ની છલાંગો આગળ ચલાવીને 8×8 શોધો.",
    "Which jump is bigger, the one to 36 or the one to 49?": "કઈ છલાંગ મોટી છે, 36 સુધીની કે 49 સુધીની?",
    "Yes, the jumps 11 and 13 grew by 2.": "હા, 11 અને 13 ની છલાંગો 2 વધી.",
    "A missing line can hide the pattern": "છૂટી ગયેલી લીટી પેટર્ન છુપાવી શકે છે",
    "Does the guess hold up?": "શું અનુમાન સાચું ઠરે છે?",
    "Work out the missing line, 15 × 15, in full.": "છૂટેલી લીટી 15×15 પૂરી ઉકેલો.",
    "Tap the blinking Work it out key.": "ઝબકતા ઉકેલો બટન પર ટૅપ કરો.",
    "Now put the missing line back on the board.": "હવે છૂટેલી લીટી બોર્ડ પર પાછી મૂકો.",
    "Tap the Put back key now.": "હવે પાછી મૂકો બટન પર ટૅપ કરો.",
    "Work the line out in full before you trust the jumps.": "છલાંગો પર ભરોસો કરતાં પહેલાં લીટી પૂરી ઉકેલો.",
    "Put the skipped line back, then read the jumps once more.": "છૂટેલી લીટી પાછી મૂકો, પછી છલાંગો ફરી વાંચો.",
    "A line left out can make growing jumps look equal, so work one line in full.": "છૂટેલી લીટી વધતી છલાંગોને સરખી દેખાડી શકે છે, એક લીટી પૂરી ઉકેલો.",
    "You learned: a line left out can make growing jumps look equal.": "તમે શીખ્યા: છૂટી લીટી વધતી છલાંગોને સરખી દેખાડી શકે છે.",
    "The jumps look equal, so work out 9 × 9 in full to check.": "છલાંગો સરખી દેખાય છે, એટલે 9×9 પૂરું ઉકેલીને તપાસો.",
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
    "start": "શરૂઆત",
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
    "12 + 13": "12 + 13",
    "24 + 25 + 26": "24 + 25 + 26",
    "30 + 31": "30 + 31",
    "14 × 9": "14 × 9",
    "5 × 14": "5 × 14",
    "18 × 10": "18 × 10",
    "8 × 8": "8 × 8",
    "9 × 9": "9 × 9",
    "Numbers that sit side by side make a pattern. Look for it before you write.": "બાજુ-બાજુની સંખ્યાઓથી પેટર્ન બને છે. લખતાં પહેલાં તેને શોધો.",
    "Every pattern read, and every guess checked against a line worked in full.": "દરેક પેટર્ન વાંચી. દરેક અનુમાન પૂરી ઉકેલેલી લીટીથી તપાસ્યું.",
    "Free play. Change the numbers, test your guess and fill the missing one.": "મુક્ત રમત. સંખ્યાઓ બદલો, તમારું અનુમાન તપાસો અને છૂટેલી સંખ્યા ભરો.",
    "Can you see the pattern in the answers?": "શું તમે જવાબોમાં પેટર્ન જોઈ શકો છો?",
    "Now try the next pair of numbers.": "હવે સંખ્યાઓની આગળની જોડી અજમાવો.",
    "Tap the blinking Next pair key.": "ઝબકતા આગળની જોડી બટન પર ટૅપ કરો.",
    "Which of the two rods is the one to double?": "બંને સળિયામાંથી કોને બમણો કરવાનો છે?",
    "Join the two rods first, then look at the greater one.": "પહેલાં બંને સળિયા જોડો, પછી મોટા સળિયાને જુઓ.",
    "Twice the greater, less one, lies along the two rods joined.": "મોટીનું બમણું એક ઓછું, જોડેલા બંને સળિયા જેટલું થાય છે.",
    "Three of the biggest is too many, so use the middle number.": "સૌથી મોટીના ત્રણ ગણા વધારે છે, એટલે વચલી સંખ્યા લો.",
    "Which number is the greater, and what do you do to it?": "કઈ સંખ્યા મોટી છે, અને તેનું શું કરવાનું છે?",
    "Lay the two rods end to end, then lay 31 twice under them.": "બંને સળિયા છેડે છેડા મેળવીને મૂકો, પછી 31 ને તેની નીચે બે વાર મૂકો.",
    "Twice 31 less one should match the sum you found.": "31 નું બમણું એક ઓછું, તમારા શોધેલા સરવાળા જેટલું હોવું જોઈએ.",
    "What does each one do?": "દરેક શું કરે છે?",
    "Now read along the ones, then along the tens.": "હવે એકમ વાંચો, પછી દશક વાંચો.",
    "Now try the table of five.": "હવે પાંચનો ઘડિયો અજમાવો.",
    "Tap the blinking Table of 5 key.": "ઝબકતા 5 નો ઘડિયો બટન પર ટૅપ કરો.",
    "Now test what the next line will be.": "હવે તપાસો કે આગળની લીટી શું હશે.",
    "Tap the blinking Test it key.": "ઝબકતા તપાસો બટન પર ટૅપ કરો.",
    "Look at both rows, then write 14 × 9.": "બંને લીટીઓ જુઓ, પછી 14×9 લખો.",
    "Yes, the next line fits both rows.": "હા, આગળની લીટી બંનેમાં બંધ બેસે છે.",
    "Look at the ones along the table of five, then write 5 × 14.": "પાંચના ઘડિયામાં એકમ જુઓ, પછી 5×14 લખો.",
    "Now test what the next total will be.": "હવે તપાસો કે આગળનો સરવાળો શું હશે.",
    "Tap Find jumps, then write the next total.": "છલાંગ શોધો બટન પર ટૅપ કરો, પછી આગળનો સરવાળો લખો.",
    "The jumps are 2, 3 and 4, so each is 1 bigger.": "છલાંગો 2, 3 અને 4 છે, તો દરેક 1 મોટી છે.",
    "The next jump is 1 bigger than 4, so add it on.": "આગળની છલાંગ 4 કરતાં 1 મોટી છે, તેને ઉમેરો.",
    "The jumps are 6 and 9, so each is 3 bigger.": "છલાંગો 6 અને 9 છે, તો દરેક 3 મોટી છે.",
    "Add 3 to the last jump, then add that to the last total.": "પાછલી છલાંગમાં 3 ઉમેરો, પછી તેને પાછલા સરવાળામાં ઉમેરો.",
    "The jumps are 11 and 13, so each is 2 bigger.": "છલાંગો 11 અને 13 છે, તો દરેક 2 મોટી છે.",
    "The next jump is 15, so add it to the last answer.": "આગળની છલાંગ 15 છે, તેને પાછલા જવાબમાં ઉમેરો.",
    "Do the numbers on the cards go up by equal steps?": "શું કાર્ડ પરની સંખ્યાઓ સરખા ડગલે વધે છે?",
    "guess": "અનુમાન",
    "Test it": "તપાસો",
    "Next pair": "આગળની જોડી",
    "Table of 5": "5 નો ઘડિયો",
    "Add": "ઉમેરો",
    "Times": "ગુણાકાર",
    "2 numbers": "2 સંખ્યાઓ",
    "3 numbers": "3 સંખ્યાઓ",
    "twice 13, less 1": "13 નું બમણું, એક ઓછું",
    "25 counted 3 times": "25 ત્રણ વાર ગણ્યું",
    "twice 31, less 1": "31 નું બમણું, એક ઓછું",
    "tens up, ones down": "દશક વધે, એકમ ઘટે",
    "ones take turns": "એકમ વારાફરતી",
    "ones stay 0": "એકમ 0 રહે છે",
    "jumps grow by 1": "છલાંગો 1 વધે છે",
    "jumps grow by 3": "છલાંગો 3 વધે છે",
    "jumps grow by 2": "છલાંગો 2 વધે છે",
    "3 × 3 was missing": "3×3 છૂટી ગયું હતું",
    "digit pattern stops": "અંકોની પેટર્ન અટકે છે",
    "the 6 was missing": "6 છૂટી ગઈ હતી",
    "15 × 15 was missing": "15×15 છૂટી ગયું હતું",
    "double, less one": "બમણું, એક ઓછું",
    "middle counted 3 times": "વચલી ત્રણ વાર ગણી",
  },
};
/*TR-END*/

/* One entry per phase = one mount.
   items: qid = the plan's question id; kind drives Work, judge and the traceback.
     nums       (phase 1) the rods of counters, in counting order
     rows       the lines already on the strip: [left text, answer]
     askLeft    the line being asked for (its card is blank until the child writes it)
     tbl        (phase 2) the table the legend shows: 5, 9 or 10
     shape      (phase 3) the counters drawn under each total: tri (rows 1, 2, 3 ...), mul (rows g, 2g, 3g ...), sq (an s x s array)
     rowsBack / hideAt / askBack   (phase 4) the strip with its hidden line put back, and where that line goes
     slate      (phase 4) the line worked in full: title and the steps written there (a step ending "=" leaves its answer blank)
     ora        the second route to the answer, used by oracle() only (never by judge or Work)
     near       the misconception of THIS question, which judge must reject
     why        a label of at most four words, drawn once the whole answer is on show (the pattern's reason)
     win        the one-sentence win line, said at the right answer (the last of a phase is replaced by the closing) */
const PHASES = [
  {
    n: 1,
    concept: "Adding consecutive numbers, one after another",
    conceptId: "M2.S3.T6.C25", objectiveIds: ["O9"],
    says: ["Double the bigger one and take one away. Is it the same as the sum?"],
    steps: [
      { say: "Slide the two rods end to end.", on: "join", hint: "Tap the blinking Join key." },
      { say: "Lay the longer rod down twice.", on: "double", hint: "Now tap the Double key." },
      { say: "Lift one counter off the doubled rod.", on: "take", hint: "Last, tap the Take one key." },
      { say: "Now try the next pair of numbers.", on: "pair", hint: "Tap the blinking Next pair key." },
    ],
    stepHold: 3600,
    ladder: ["Double the longer rod, then take one counter away.", "Two rods side by side hold one less than twice the longer rod."],
    closing: "Two make one less than twice the greater, and three make three times the middle.",
    learned: "You learned: two side by side make one less than twice the greater.",
    traceback: "when the wrong answer is the near miss its own route is laid out first (the smaller rod doubled less one falls short of the joined rods; three rods of the greatest overhang the three), then the two rods join end to end, the greater rod is laid down twice with one counter lifted off, and the rows finish level on the whole answer with the reason written under them; three rods share a counter until they stand level",
    items: [
      /* learn ML1: answer in the plan = Both give 25, because two numbers side by side add up to one less than twice the greater */
      { qid: "M2.S3.T6.C25:ML1", kind: "rods", nums: [12, 13], askLeft: "12 + 13", tl: "12 + 13",
        answer: 25, near: 23, ora: { r: "rule2", a: 12, b: 13 }, winMs: 3400,
        ask: "12 + 13", say: "Find 12 + 13, then check it against double 13 less 1.",
        miss: "Which of the two rods is the one to double?",
        ladder: ["Join the two rods first, then look at the greater one.", "Twice the greater, less one, lies along the two rods joined."],
        win: "Yes, both ways come to the same number.", why: "twice 13, less 1" },
      /* practice 1: answer in the plan = Yes. 24 + 25 + 26 = 75, and 25 x 3 = 75 */
      { qid: "M2.S3.T6.C25:1", kind: "rods", nums: [24, 25, 26], askLeft: "24 + 25 + 26", tl: "24 + 25 + 26",
        answer: 75, near: 78, ora: { r: "rule3", a: 24, m: 25, g: 26 }, winMs: 3400,
        ask: "24 + 25 + 26", say: "Find 24 + 25 + 26, then check it against 3 times the middle number.",
        miss: "Three of the biggest is too many, so use the middle number.",
        ladder: ["Let the longest rod give one counter to the shortest rod.", "Then all three rods are as long as the middle one."],
        win: "Yes, three rods of 25 make the same total.", why: "25 counted 3 times" },
      /* practice 2: answer in the plan = 31 x 2 = 62, and one less is 61, so the sum is right */
      { qid: "M2.S3.T6.C25:2", kind: "rods", nums: [30, 31], askLeft: "30 + 31", tl: "30 + 31",
        answer: 61, near: 59, ora: { r: "rule2", a: 30, b: 31 }, winMs: 3400,
        ask: "30 + 31", say: "Check the sum 30 + 31 by doubling the greater number and taking one away.",
        miss: "Which number is the greater, and what do you do to it?",
        ladder: ["Lay the two rods end to end, then lay 31 twice under them.", "Twice 31 less one should match the sum you found."],
        win: "Yes, twice 31 less 1 matches the sum.", why: "twice 31, less 1" },
    ],
  },
  {
    n: 2,
    concept: "Digits marching down a times table",
    conceptId: "M2.S3.T6.C26", objectiveIds: ["O9"],
    says: ["What does each one do?"],
    steps: [
      { say: "Split each answer into its tens and its ones.", on: "split", hint: "Tap the blinking Split key." },
      { say: "Now read along the ones, then along the tens.", on: "read", hint: "Tap the Read key now." },
      { say: "Now try the table of five.", on: "table", hint: "Tap the blinking Table of 5 key." },
      { say: "Now test what the next line will be.", on: "fill", hint: "Tap the blinking Test it key." },
    ],
    stepHold: 3600,
    ladder: ["The tens of 99, 108 and 117 are 9, 10 and 11.", "The tens go up by 1 and the ones go down by 1 on each line."],
    closing: "In a times table the ones and the tens each follow a pattern.",
    learned: "You learned: in the nine table the ones fall while the tens rise.",
    traceback: "the card of every known line splits into its tens and its ones, the two rows are read along with their steps, the next card lands complete and the reason is written under it",
    items: [
      /* learn ML2: answer in the plan = 99, 108, 117 and 126. The ones digits count down 9, 8, 7, 6, and the number of tens counts up 9, 10, 11, 12 */
      { qid: "M2.S3.T6.C26:ML2", kind: "table", tbl: 9, rows: [["11 × 9", 99], ["12 × 9", 108], ["13 × 9", 117]], askLeft: "14 × 9", tl: "14 × 9",
        answer: 126, near: 26, ora: { r: "rep", a: 14, b: 9 }, winMs: 3400,
        ask: "14 × 9", say: "Look at both rows, then write 14 × 9.",
        miss: "Check your tens and ones against the line before it.",
        win: "Yes, the next line fits both rows.", why: "tens up, ones down" },
      /* practice 3: answer in the plan = 55, 60, 65 and 70. The ones digits take turns, 5 then 0 */
      { qid: "M2.S3.T6.C26:3", kind: "table", tbl: 5, rows: [["5 × 11", 55], ["5 × 12", 60], ["5 × 13", 65]], askLeft: "5 × 14", tl: "5 × 14",
        answer: 70, near: 75, ora: { r: "rep", a: 5, b: 14 }, winMs: 3400,
        ask: "5 × 14", say: "Look at the ones along the table of five, then write 5 × 14.",
        miss: "Do the tens here climb on every line, or on every second one?",
        ladder: ["Write down the ones digit of each answer, one by one.", "The ones go 5, then 0, then 5, so what comes after that?"],
        win: "Yes, the ones took turns between 5 and 0.", why: "ones take turns" },
      /* practice 4: answer in the plan = 160, 170 and 180. The ones digit is always 0, and the number of tens is the number multiplied by ten: 16, 17 and 18 */
      { qid: "M2.S3.T6.C26:4", kind: "table", tbl: 10, rows: [["15 × 10", 150], ["16 × 10", 160], ["17 × 10", 170]], askLeft: "18 × 10", tl: "18 × 10",
        answer: 180, near: 18, ora: { r: "rep", a: 18, b: 10 }, winMs: 3400,
        ask: "18 × 10", say: "Find the pattern in the ten table, then write 18 × 10.",
        miss: "What do the ones digits of 150, 160 and 170 do?",
        ladder: ["Count how many whole tens are in 170.", "Look at the tens and the ones digit down the table of ten."],
        win: "Yes, the ones stayed 0 and the tens counted on.", why: "ones stay 0" },
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
      { say: "Now test what the next total will be.", on: "fill", hint: "Tap the blinking Test it key." },
    ],
    stepHold: 3600,
    ladder: ["Write the jump between each pair of answers, then look at those jumps.", "Add the growth to the last jump, then add that jump to the last answer."],
    closing: "When the jumps grow, find how they grow, and carry that on.",
    learned: "You learned: when the jumps grow, find how they grow.",
    traceback: "the jumps are written along the top, the growth between them stays the same, the next jump writes itself in and the next total lands with its counters and the reason under it",
    items: [
      /* learn ML3: answer in the plan = 15 and 21 */
      { qid: "M2.S3.T6.C27:ML3", kind: "grow", shape: "tri", g: 1, rows: [["1", 1], ["1 + 2", 3], ["1 + 2 + 3", 6], ["1 + 2 + 3 + 4", 10]],
        askLeft: "1 + 2 + 3 + 4 + 5", blankLeft: "next total", tl: "next total", answer: 15, near: 14, ora: { r: "tri", n: 5 }, winMs: 3400,
        ask: "next total", say: "Tap Find jumps, then write the next total.",
        miss: "When the jumps are found, does each get bigger?",
        ladder: ["The jumps are 2, 3 and 4, so each is 1 bigger.", "The next jump is 1 bigger than 4, so add it on."],
        win: "Yes, the jumps grew by 1 each time.", why: "jumps grow by 1" },
      /* practice 5: answer in the plan = 30 and 45. The totals 3, 9, 18, 30 and 45 jump by 6, 9, 12 and 15, growing by three each time */
      { qid: "M2.S3.T6.C27:5", kind: "grow", shape: "mul", g: 3, rows: [["3", 3], ["3 + 6", 9], ["3 + 6 + 9", 18]],
        askLeft: "3 + 6 + 9 + 12", blankLeft: "next total", tl: "next total", answer: 30, near: 27, ora: { r: "mulsum", step: 3, n: 4 }, winMs: 3400,
        ask: "next total", say: "Find the jumps first, then write the next total.",
        miss: "Is each jump bigger than the last by the same amount?",
        ladder: ["The jumps are 6 and 9, so each is 3 bigger.", "Add 3 to the last jump, then add that to the last total."],
        win: "Yes, the jumps grew by 3 each time.", why: "jumps grow by 3" },
      /* practice 6: answer in the plan = No. The jumps are 11 and 13, growing by two, so the next jump is 15 and 8 x 8 = 64 */
      { qid: "M2.S3.T6.C27:6", kind: "grow", shape: "sq", lab: true, rows: [["5 × 5", 25], ["6 × 6", 36], ["7 × 7", 49]],
        askLeft: "8 × 8", tl: "8 × 8", answer: 64, near: 62, ora: { r: "rep", a: 8, b: 8 }, winMs: 3400,
        ask: "8 × 8", say: "Carry on the jumps of 5 × 5, 6 × 6 and 7 × 7 to find 8 × 8.",
        miss: "Which jump is bigger, the one to 36 or the one to 49?",
        ladder: ["The jumps are 11 and 13, so each is 2 bigger.", "The next jump is 15, so add it to the last answer."],
        win: "Yes, the jumps 11 and 13 grew by 2.", why: "jumps grow by 2" },
    ],
  },
  {
    n: 4,
    concept: "A missing line can hide the pattern",
    conceptId: "M2.S3.T6.C28", objectiveIds: ["O10"],
    says: ["Does the guess hold up?"],
    steps: [
      { say: "Work out the missing line, 15 × 15, in full.", on: "work", hint: "Tap the blinking Work it out key." },
      { say: "Now put the missing line back on the board.", on: "putback", hint: "Tap the Put back key now." },
    ],
    stepHold: 3600,
    ladder: ["Work the line out in full before you trust the jumps.", "Put the skipped line back, then read the jumps once more."],
    closing: "A line left out can make growing jumps look equal, so work one line in full.",
    learned: "You learned: a line left out can make growing jumps look equal.",
    traceback: "the slate works the line in full, the hidden line slides back into its place, the jump labels either side are rewritten where they stand, the whole answer lands and the reason is written under it",
    items: [
      /* learn ML4: answer in the plan = No. 9 x 9 = 81. The line 3 x 3 = 9 is missing, and with it put back the jumps are 8, 16 and 24, so the next jump is 32 */
      { qid: "M2.S3.T6.C28:ML4", kind: "hidden", rows: [["1 × 1", 1], ["5 × 5", 25], ["7 × 7", 49]], askLeft: "9 × 9",
        rowsBack: [["1 × 1", 1], ["3 × 3", 9], ["5 × 5", 25], ["7 × 7", 49]], askBack: "9 × 9", hideAt: 1, tl: "9 × 9",
        slate: { title: "9 × 9", steps: ["9 × 5 = 45", "9 × 4 = 36", "45 + 36 ="] },
        answer: 81, near: 73, ora: { r: "rep", a: 9, b: 9 }, winMs: 3800,
        ask: "9 × 9", say: "The jumps look equal, so work out 9 × 9 in full to check.",
        miss: "Do the numbers on the cards go up by equal steps?",
        win: "Right, 3 × 3 was missing, so the jumps were never equal.", why: "3 × 3 was missing" },
      /* practice 7: answer in the plan = No, the guess is wrong. 2468 + 22222 = 24690, so working one line in full shows where the digit pattern stops */
      { qid: "M2.S3.T6.C28:7", kind: "hidden", rows: [["2", 2], ["+ 22", 24], ["+ 222", 246], ["+ 2,222", 2468]],
        askLeft: "+ 22,222", noJumps: true, tl: "+ 22,222",
        slate: { title: "add in columns", col: { a: 2468, b: 22222 } },
        answer: 24690, near: 246810, ora: { r: "col", a: 2468, b: 22222 }, winMs: 4200,
        ask: "next total", say: "Add 2,468 and 22,222 in full to test the guess of 2,46,810.",
        miss: "Set the two numbers in columns, ones under ones, and add.",
        ladder: ["Start at the ones column and carry whenever a column reaches ten.", "The ones make 8 + 2 = 10, so write 0 and carry 1."],
        win: "Right, the digit pattern stops at the last line.", why: "digit pattern stops" },
      /* practice 8: answer in the plan = 24. The full list is 4, 6, 10, 16, with jumps 2, 4 and 6, so the next jump is 8. The equal jumps of 6 came from the missing number, and 22 is wrong */
      { qid: "M2.S3.T6.C28:8", kind: "hidden", rows: [["1st", 4], ["2nd", 10], ["3rd", 16]], askLeft: "4th",
        rowsBack: [["1st", 4], ["2nd", 6], ["3rd", 10], ["4th", 16]], askBack: "5th", hideAt: 1, tl: "16 + 8",
        slate: { title: "the jumps", steps: ["10 − 4 = 6", "16 − 10 = 6"], stepsBack: ["6 − 4 = 2", "10 − 6 = 4", "16 − 10 = 6"] },
        answer: 24, near: 22, ora: { r: "addjumps", start: 4, jumps: [2, 4, 6, 8] }, winMs: 3800,
        ask: "next number", say: "Put the missing 6 back between 4 and 10, then find what comes after 16.",
        miss: "Would the two jumps still look equal with the missing line back?",
        ladder: ["Write the jumps again with the 6 in place.", "The jumps are 2, 4 and 6, so the next jump is 8."],
        win: "Right, the list was never growing by equal jumps.", why: "the 6 was missing" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too).
   pic     the picture is ONE fixed 880-wide drawing, centred in the working area (the open width with bigPad is 900)
   warm    the boards the guide steps work on (never question 1's own board); phases 1 and 2 build theirs from the start / table
   free    Free play: the start numbers of its two sections */
const MODEL = {
  pic: { w: 880 },
  warm: {
    3: { kind: "grow", shape: "mul", g: 2, rows: [["2", 2], ["2 + 4", 6], ["2 + 4 + 6", 12]], askLeft: "next total", answer: 20, why: "jumps grow by 2" },
    4: { kind: "hidden", rows: [["5 × 5", 25], ["25 × 25", 625], ["35 × 35", 1225]],
      rowsBack: [["5 × 5", 25], ["15 × 15", 225], ["25 × 25", 625], ["35 × 35", 1225]], hideAt: 1,
      slate: { title: "15 × 15", steps: ["15 × 10 = 150", "15 × 5 = 75", "150 + 75 = 225"] }, why: "15 × 15 was missing" },
  } as any,
  free: { a: 7, t: 9, s: 2, aMax: 15, sMax: 20 },
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
/* the agent's check() before Enter: in the ask stage it performs the acts the child has not done (the answer gate never holds an agent);
   in a guide-steps phase (stage "demo") it returns undefined so the agent's check() reaches api.onEnter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 with the panel shut, 900 x 520 open (bigPad). The picture is ONE fixed 880-wide drawing centred in
   that room (OX), laid out once, so nothing runs under the key's corner (box.key) and nothing reflows when the keypad opens.
   Phase 1 is rows of counters (the rods); phases 2-4 are a strip of cards, one card to a line of the pattern, with the jumps
   written on arcs above it and (phase 4) the slate below it. Free play has a row of controls along the top. */

/* deeper inks for coloured numerals, so every one of them reads at 4.5:1 on the card */
const PL_INK: any = {
  blue: shade(CONTENT.hundred, 0.25), amber: shade(CONTENT.ten, 0.42), green: shade(CONTENT.one, 0.25),
  step: shade(CONTENT.pointer, 0.25), plum: shade(CONTENT.bead, 0.3), plum2: shade(CONTENT.bead, 0.3),
  /* the wrong route's rows of phase 1: one neutral slate, never a pink */
  neutral: "#4B5560",
};
/* chips, card titles and the slate title: 34 and up */
const PL_CH = 34;
/* a written digit run keeps its cell tight, so "11" never reads "1 1" (a pencil digit's own advance is 0.84 of its height): only runs of digits and a plus sign */
const plStepOf = (t: any) => (t.step !== undefined ? t.step : !t.line && typeof t.t === "string" && /^[+\d]{2,}$/.test(t.t) ? Math.round(t.size * 0.72 * 0.8) : 0);
/* the wash over a counter's button skin: the greater rod is the skin's own amber (no wash), the smaller rod blue, the built rod green */
const PL_WASH: any = { blue: CONTENT.hundred, green: CONTENT.one, plum: CONTENT.bead };
const PL_BTN: any = { blue: CONTENT.hundred, amber: "#E2A63F", green: CONTENT.one, plum: CONTENT.bead, plum2: tint(CONTENT.bead, 0.5) };
/* the one key at the bottom centre: its label follows the act */
const PL_KEY: any = { join: "Join", double: "Double", take: "Take one", level: "Share one", split: "Split", read: "Read", jumps: "Find jumps",
  growth: "Find growth", work: "Work it out", putback: "Put back", fill: "Test it", pair: "Next pair", table: "Table of 5" };
/* the baseline of a key's label: Devanagari carries its marks above the line (and Gujarati a tail below), so the label sits lower than a Latin one to look centred */
const plLy = (lang: string, en: number) => (lang === "hi" ? en + 9 : lang === "gu" ? en + 5 : en);
/* a tap on a key counts once: this time stamp lives at module level, so it survives a remount of Work between a guide step's
   last act and question 1 (four fast taps are one step) */
const PL_GUARD: any = { press: 0, free: 0 };
/* the width of a text in em: digits and signs 0.62, a space 0.28, a comma or point 0.3, any other letter 0.62 */
const plW = (s: any) => { let w = 0; String(s === null || s === undefined ? "" : s).split("").forEach((ch: string) => { w += ch === " " ? 0.28 : ch === "," || ch === "." ? 0.3 : 0.62; }); return Math.max(w, 0.62); };
/* text that has no layout engine: the biggest size of the scale that still fits the width */
const plFit = (s: any, w: number, max: number) => {
  const want = w / plW(s);
  return want >= max ? max : want >= T.prompt ? T.prompt : want >= PL_CH ? PL_CH : want >= T.label ? T.label : T.micro;
};
const plFmt = (v: any) => (v === null || v === undefined || v === "" ? "" : indian(Number(v)));
/* a counter drawn as a flat button (a rim, a pressed ring and four holes), the plain look under a skin and above the 40-skin cap */
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
/* a place a counter could go: an outlined ring (the doubled rod, the route, the counter that was lifted off) */
const plRing = (x: number, y: number, r: number, c: string, k?: any) => {
  const gone = c === "gone";
  const route = c === "plum" || c === "plum2";
  const ink = gone ? PL_INK.step : route ? PL_INK.neutral : PL_INK[c] || PL_INK.amber;
  return <circle key={k} cx={x} cy={y} r={r} fill={gone ? tint(PL_INK.step, 0.88) : tint(ink, c === "plum2" ? 0.93 : 0.86)} stroke={ink} strokeWidth={gone ? 4 : 3} strokeDasharray={gone ? "7 6" : undefined} />;
};
/* a blank waiting for the child: a dashed rule to write on */
const plBlank = (x: number, y: number, w: number, C: any, k?: any) => (
  <line key={k} x1={x} y1={y} x2={x + w} y2={y} stroke={shade(C.rule, 0.35)} strokeWidth={4} strokeDasharray="12 9" strokeLinecap="round" />
);
/* a jump or growth chip, centred on cx, cy */
const plChip = (cx: number, cy: number, text: string, tone: string, k: any, pen?: number) => {
  const w = Math.max(80, plW(text) * PL_CH + 34);
  return (
    <g key={k} data-role="reading">
      <rect x={cx - w / 2} y={cy - 26} width={w} height={52} rx={14} fill="#FFFFFF" stroke={PL_INK[tone]} strokeWidth={3} />
      {pen === undefined
        ? <text x={cx} y={cy + 12} textAnchor="middle" fontSize={PL_CH} fontWeight={700} fill={PL_INK[tone]}>{text}</text>
        : <PencilText text={text} x={cx} y={cy + 12} size={PL_CH} align="middle" step={plStepOf({ t: text, size: PL_CH })} chars={pen} color={PL_INK[tone]} />}
    </g>
  );
};
/* the counters of one card of phase 3: tri (rows 1, 2, 3 ...), mul (rows g, 2g, 3g ...) or sq (an s x s array); the newest layer is amber */
const plShape = (it: any, k: number) => {
  const pts: any[] = [];
  if (it.shape === "sq") {
    const s0 = parseInt(String((it.rows[0] || ["5"])[0]), 10) || 5, s = s0 + k;
    for (let r = 0; r < s; r++) for (let c = 0; c < s; c++) pts.push({ r, c, col: r < s - 1 && c < s - 1 || k === 0 ? "blue" : "amber" });
    return { pts, cols: s, rows: s };
  }
  const g = it.shape === "mul" ? it.g || 1 : 1, m = k + 1;
  for (let r = 1; r <= m; r++) for (let c = 0; c < g * r; c++) pts.push({ r: r - 1, c, col: r === m ? "amber" : "blue" });
  return { pts, cols: g * m, rows: m };
};

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const free = stage === "free";
  /* the guide steps work a warm-up board, never question 1's own; a phase opens on "teach" for one frame before "demo" */
  const warm = !free && (stage === "teach" || stage === "demo");
  const qk = free ? "free" : n + ":" + (warm ? "w" : index);
  /* the board belongs to the question's entry: derived in render, never reset by a passive effect */
  const fresh = (k: string) => ({ qk: k, done: {}, pr: {}, demo: null, touched: false, k: 0, guess: "", sec: "add", a: MODEL.free.a, three: false, t: MODEL.free.t, s: MODEL.free.s });
  const [raw, setRaw] = useState<any>(() => fresh(qk));
  const S: any = raw.qk === qk ? raw : fresh(qk);
  const upd = (f: any) => setRaw((p: any) => f(p.qk === qk ? p : fresh(qk)));
  const [playing, setPlaying] = useState(false);
  const [corr, setCorr] = useState(false);       /* a correction is playing: the key is undrawn */
  const [hold, setHold] = useState(false);       /* the key is undrawn for 450 ms after a tap, so a lit key is never a dead key */
  const busy = useRef(false);
  const gen = useRef(0);
  const mine = useRef(false);
  const gate = useRef(false);

  /* ── the board: a question, a warm-up built from a start or a table, or a Free play board ─────── */
  const mkAdd = (a: number, three: boolean) => {
    const nums = three ? [a, a + 1, a + 2] : [a, a + 1];
    return { kind: "rods", nums, askLeft: nums.join(" + "), answer: nums.reduce((s: number, v: number) => s + v, 0), why: three ? "middle counted 3 times" : "double, less one" };
  };
  const mkTimes = (t: number, s: number) => {
    const L = (m: number) => (t === 5 ? "5 × " + m : m + " × " + t);
    /* the nine table's reason is written only when the four lines shown really have the tens up by 1 and the ones down by 1 (not across 90 to 99) */
    const nine = [s, s + 1, s + 2, s + 3].every((m: number, i: number) => i === 0 || (Math.floor(m * 9 / 10) - Math.floor((m - 1) * 9 / 10) === 1 && (m * 9) % 10 - ((m - 1) * 9) % 10 === -1));
    return { kind: "table", tbl: t, rows: [s, s + 1, s + 2].map((m: number) => [L(m), m * t]), askLeft: L(s + 3), answer: (s + 3) * t,
      why: t === 9 ? (nine ? "tens up, ones down" : undefined) : t === 5 ? "ones take turns" : "ones stay 0" };
  };
  const spec: any = free ? (S.sec === "add" ? mkAdd(S.a, S.three) : mkTimes(S.t, S.s))
    : warm ? (n === 1 ? mkAdd(7 + S.k, false) : n === 2 ? mkTimes(S.k ? 5 : 9, 2) : MODEL.warm[n])
    : item;
  const kd: string = spec.kind;
  const nums: number[] = spec.nums || [];
  const three = nums.length === 3;
  /* the acts of the board, in order (the guide steps name the same ids) */
  const order: string[] = free ? (kd === "rods" ? (three ? ["level", "fill"] : ["join", "double", "take", "fill"]) : ["split", "read", "fill"])
    : warm ? (n === 1 ? ["join", "double", "take", "pair"] : n === 2 ? ["split", "read", "table", "fill"] : n === 3 ? ["jumps", "growth", "fill"] : ["work", "putback"])
    : kd === "rods" ? (three ? ["level"] : ["join", "double", "take"]) : kd === "table" ? ["split", "read"] : kd === "grow" ? ["jumps", "growth"]
    : spec.hideAt !== undefined ? ["work", "putback"] : ["work"];

  const won = !free && (stage === "win" || stage === "idle");
  const has = (a: string) => won || !!S.done[a] || (S.pr[a] || 0) > 0;
  /* how many points of a progressive act have been reached (everything once it is done) */
  const cnt = (a: string) => (won || S.done[a] ? 99 : S.pr[a] || 0);
  const actsDone = order.every((a: string) => !!S.done[a]);
  const restored = spec.hideAt !== undefined && has("putback");
  const fillN = cnt("fill");
  const shown = won || S.demo !== null;                       /* the whole right answer is on show (a win or the end of a correction) */
  const lab = free || warm;                                   /* a board the child may fill in with the pencil */
  const showAns = shown || (lab && fillN >= 1);
  const whyOn = !!spec.why && (shown || (lab && actsDone));
  const typedTxt = typed && /^\d+$/.test(String(typed)) ? indian(Number(typed)) : typed;
  /* what the child has written into the asked place: the slot's typed number, or in Free play the guess typed into the card */
  const entry = free ? S.guess : typed;
  const entryTxt = entry && /^\d+$/.test(String(entry)) ? indian(Number(entry)) : entry;
  const OX = Math.max(0, Math.round((box.w - MODEL.pic.w) / 2));
  const ptX = (x: number) => OX + x;
  const PW = MODEL.pic.w;
  const Y0 = free ? 94 : 0;                                   /* Free play: a 30 px gap under its row of controls (72 tall) */

  /* ── phase 1: the rods ──────────────────────────────────────────────────────────────────────── */
  const rodMax = three ? Math.max.apply(null, nums) : nums.length ? Math.max(nums[0] + nums[1], 2 * nums[1]) : 1;
  /* a rod row over 40 wraps into lines of 31 (the tens groups kept), so the counters stay r 10-11 with the keypad open */
  const wrapped = rodMax > 40;
  const WRAP = wrapped ? 31 : 1e9;
  const G10 = 12;
  const pitch = wrapped ? (840 - 3 * G10) / 31 : Math.min(64, (840 - Math.floor((rodMax - 1) / 10) * G10) / rodMax);
  const rr = wrapped ? Math.min(12, pitch * 0.46) : Math.max(5, Math.min(three ? 22 : 28, pitch * 0.44));
  const rpx = (i: number) => { const q = i % WRAP; return 24 + rr + q * pitch + Math.floor(q / 10) * G10; };
  const LP = wrapped ? 84 : free ? (three ? 80 : 100) : 108;
  const lineY = (v: number) => Y0 + (wrapped ? 118 : free ? 141 : 150) + v * LP;
  const routeOn = !!S.done.route || (S.pr.route || 0) > 0;
  const rowsOf = (): any[] => {
    if (!nums.length) return [];
    if (three) {
      const lv = has("level"), rt = routeOn && !lv, g = nums[2];
      return [
        { btn: true, segs: [{ n: nums[0], c: "blue" }].concat(lv ? [{ n: 1, c: "green" }] : rt ? [{ n: g - nums[0], c: "plum" }] : []) },
        { btn: true, segs: [{ n: nums[1], c: "amber" }].concat(rt ? [{ n: g - nums[1], c: "plum" }] : []) },
        { btn: true, segs: lv ? [{ n: nums[2] - 1, c: "amber" }, { n: 1, c: "gone" }] : [{ n: nums[2], c: "amber" }] },
      ];
    }
    const a = nums[0], b = nums[1], jn = has("join"), db = has("double"), tk = has("take");
    const rows: any[] = [];
    if (!jn) { rows.push({ btn: true, segs: [{ n: a, c: "blue" }] }); rows.push({ btn: true, segs: [{ n: b, c: "amber" }] }); }
    else {
      rows.push({ btn: true, segs: [{ n: a, c: "blue" }, { n: b, c: "amber" }] });
      if (db) rows.push({ btn: false, segs: tk ? [{ n: b, c: "amber" }, { n: b - 1, c: "green" }, { n: 1, c: "gone" }] : [{ n: b, c: "amber" }, { n: b, c: "amber" }] });
      /* the child's own wrong route (the near miss): the smaller rod doubled less one falls short of the joined rods */
      if (routeOn) rows.push({ btn: false, segs: [{ n: a, c: "plum" }, { n: a - 1, c: "plum2" }, { n: b - a + 1, c: "gone" }] });
    }
    return rows;
  };
  const rods = rowsOf();
  const rowStart: number[] = [];
  let acc = 0;
  rods.forEach((r: any) => { rowStart.push(acc); const tot = r.segs.reduce((s: number, g: any) => s + g.n, 0); acc += wrapped ? Math.ceil(tot / WRAP) : 1; });
  const rodX = (r: number, i: number) => rpx(i);
  const rodY = (r: number, i: number) => lineY((rowStart[r] || 0) + Math.floor(i / WRAP));
  /* the button skin only while a board never shows more than 40 counters at once (IMAGES §2): decided per question from its largest state */
  const peak = three ? nums[0] + nums[1] + nums[2] : nums.length ? nums[0] + nums[1] : 0;
  const skinned = peak > 0 && peak <= 40;

  /* ── phases 2-4: the strip of cards ────────────────────────────────────────────────────────── */
  const src = restored && spec.rowsBack ? spec.rowsBack : spec.rows || [];
  const askLeft = restored && spec.askBack ? spec.askBack : spec.askLeft;
  const lines: any[] = src.map((r: any, k: number) => ({ left: r[0], value: r[1], tone: restored && spec.hideAt === k ? "plum" : "blue" }));
  const known = lines.length;
  if (askLeft && kd !== "rods") lines.push({ left: showAns || !spec.blankLeft ? askLeft : spec.blankLeft, value: showAns ? spec.answer : null, tone: "green", ask: true });
  const vals = lines.map((l: any) => l.value);
  const jumps = vals.slice(1).map((v: any, k: number) => (v === null || vals[k] === null ? null : v - vals[k]));
  const grows = jumps.slice(1).map((v: any, k: number) => (v === null || jumps[k] === null ? null : v - jumps[k]));
  const nC = lines.length;
  const GAP = kd === "table" ? 52 : 14;
  const cw = nC ? (PW - 20 - (nC - 1) * GAP) / nC : 0;
  const cx0 = (k: number) => 10 + k * (cw + GAP);
  /* a table's bay (the bundles of ten sticks) sits above the cards with a 24 px gap, so the cards start lower and are a little shorter */
  const CY = kd === "table" ? (free ? 206 : 172) : kd === "grow" ? 150 : 108;
  const CH = kd === "table" ? (free ? 216 : 244) : 112;
  const T2 = free ? { expr: 44, val: 92, t0: 100, h: 50, o0: 156 } : { expr: 40, val: 92, t0: 102, h: 62, o0: 170 };
  const tensY = (k: number) => CY + T2.t0 + T2.h / 2;
  const onesY = (k: number) => CY + T2.o0 + T2.h / 2;
  const chipY = kd === "grow" ? 90 : 48;
  const jumpPt = (k: number) => ({ x: (cx0(k) + cw / 2 + cx0(k + 1) + cw / 2) / 2, y: chipY });
  const growPt = (k: number) => ({ x: cx0(k + 1) + cw / 2, y: 32 });
  const jOn = (kd === "grow" || (kd === "hidden" && !spec.noJumps));
  /* the counters under the cards of phase 3: the card of the asked line shows its counters once the answer is on show */
  const shapeCards = kd === "grow" && spec.shape ? lines.map((l: any, k: number) => (l.ask && !(showAns && (!lab || fillN >= 2)) ? null : k)).filter((k: any) => k !== null) : [];
  const shapePeak = shapeCards.reduce((s: number, k: number) => s + plShape(spec, k).pts.length, 0) + (kd === "grow" && spec.shape && !shapeCards.includes(nC - 1) ? plShape(spec, nC - 1).pts.length : 0);
  const shapeSkin = shapePeak <= 40;

  /* ── the acts: each is performed on screen by a real tool (api.act), and counts only when it ends ── */
  const mark = (k: string, v: number = 1) => upd((p: any) => ({ ...p, pr: { ...p.pr, [k]: v } }));
  const slateOf = () => (restored && spec.slate && spec.slate.stepsBack ? spec.slate.stepsBack : (spec.slate || {}).steps) || [];
  const exprEnd = Math.round(plW(spec.askLeft) * T.xl * 1.02) + 8;
  /* ── the pencil WRITES (runtime r30, PATTERNS 15): one token list per written act, read by the act AND by the drawing, so the act's last
     frame and the finished writing are one drawing. A token is { t, x, y (baseline), size, align, color } or { line: [x1, y1, x2, y2], size } (a bar:
     one character); onPoint(i) counts characters across the tokens, so a progress mark is a character count (cnt(key)) ── */
  const tkLen = (t: any) => (t.line ? 1 : t.t.length);
  const tkChars = (toks: any[], key: string) => { const c = cnt(key); let o = 0; return toks.map((t: any) => { const n = Math.max(0, Math.min(tkLen(t), c - o)); o += tkLen(t); return n; }); };
  const tkBegun = (toks: any[], key: string) => tkChars(toks, key).filter((n: number) => n > 0).length;
  const tkDraw = (t: any, n: number, k: any) => (!t || !(n > 0) ? null : t.line
    ? <PencilLine key={k} x1={t.line[0]} y1={t.line[1]} x2={t.line[2]} y2={t.line[3]} size={t.size} />
    : <PencilText key={k} text={t.t} x={t.x} y={t.y} size={t.size} align={t.align || "middle"} step={plStepOf(t)} chars={n} color={t.color} />);
  const plWrite = (toks: any[], key: string) => ({ tool: "pencil", moves: "write",
    text: toks.map((t: any) => (t.line ? { line: [ptX(t.line[0]), t.line[1], ptX(t.line[2]), t.line[3]], size: t.size } : t.t)),
    at: toks.map((t: any) => (t.line ? null : { x: ptX(t.x), y: t.y })), size: toks.map((t: any) => t.size), align: toks.map((t: any) => t.align || "middle"),
    color: toks.map((t: any) => t.color), step: toks.map((t: any) => plStepOf(t)), onPoint: (i: number) => mark(key, i + 1) });
  const sl = spec.slate || {};
  /* a slate step of pure maths is written WITHOUT its spaces (a space costs the pencil 80 ms; the glyphs' own advance spaces it anyway) */
  const slLt = (t: string) => (/^[\d×÷+−\-=., ]+$/.test(t) ? t.replace(/ /g, "") : tx(t));
  const nums52 = free ? 44 : 52;
  const kA = nC - 1;
  /* split: the tens of every known card (one token each), then ALL the ones as ONE run, every digit in its own card-wide cell: four tokens a
     write act keep it under 3 s (each token costs about half a second of ink) */
  const splitTok: any[] = [];
  if (kd === "table") {
    lines.slice(0, known).forEach((l: any, k: number) => {
      splitTok.push({ t: String(Math.floor(l.value / 10)), x: cx0(k) + cw - 24, y: CY + T2.t0 + T2.h / 2 + 17, size: nums52, align: "end", color: PL_INK.blue });
    });
    const cell = cw + GAP;
    splitTok.push({ t: lines.slice(0, known).map((l: any) => String(l.value % 10)).join(""), x: cx0(0) + cw - 24 - 0.3025 * nums52 - cell / 2, y: CY + T2.o0 + T2.h / 2 + 17, size: nums52, align: "start", step: cell, color: PL_INK.amber });
  }
  /* the jumps and the growths of phase 3 (chips with their text) */
  const jTok: any[] = [], gTok: any[] = [];
  if (kd === "grow") {
    jumps.forEach((v: any, k: number) => { if (v !== null) { const p = jumpPt(k); jTok.push({ t: "+" + plFmt(v), x: p.x, y: p.y + 12, size: PL_CH, align: "middle", color: PL_INK.step }); } });
    grows.forEach((v: any, k: number) => { if (v !== null) { const p = growPt(k); gTok.push({ t: "+" + plFmt(v), x: p.x, y: p.y + 12, size: PL_CH, align: "middle", color: PL_INK.plum }); } });
  }
  /* Test it: the true value is written where the child guessed (a card: its value, its tens, its ones; phase 3 also its jump and its growth) */
  const fillTok: any[] = [];
  if (spec.answer !== undefined && spec.answer !== null) {
    const ansT = plFmt(spec.answer);
    if (kd === "rods") fillTok.push({ t: String(spec.answer), x: 24 + exprEnd + 76, y: Y0 + 56, size: T.xl, align: "start", color: PL_INK.green });
    else if (kd === "table") {
      fillTok.push({ t: ansT, x: cx0(kA) + cw / 2, y: CY + T2.val, size: plFit(ansT, cw - 24, 52), align: "middle", color: PL_INK.green });
      fillTok.push({ t: String(Math.floor(spec.answer / 10)), x: cx0(kA) + cw - 24, y: CY + T2.t0 + T2.h / 2 + 17, size: nums52, align: "end", color: PL_INK.blue });
      fillTok.push({ t: String(spec.answer % 10), x: cx0(kA) + cw - 24, y: CY + T2.o0 + T2.h / 2 + 17, size: nums52, align: "end", color: PL_INK.amber });
    } else if (kd === "grow" && kA >= 2) {
      const lj = lines[kA - 1].value - lines[kA - 2].value, nj = spec.answer - lines[kA - 1].value;
      fillTok.push({ t: ansT, x: cx0(kA) + cw / 2, y: CY + (spec.lab ? CH - 18 : CH / 2 + 18), size: plFit(ansT, cw - 24, T.xl), align: "middle", color: PL_INK.green });
      fillTok.push({ t: "+" + plFmt(nj), x: jumpPt(kA - 1).x, y: jumpPt(kA - 1).y + 12, size: PL_CH, align: "middle", color: PL_INK.step });
      fillTok.push({ t: "+" + plFmt(nj - lj), x: growPt(kA - 2).x, y: growPt(kA - 2).y + 12, size: PL_CH, align: "middle", color: PL_INK.plum });
    }
  }
  const fillCh = tkChars(fillTok, "fill");
  const splitCh = tkChars(splitTok, "split");
  /* phase 4's slate: the steps of a line worked in full, or the columns of a sum with its bar and carries */
  const workTok: any[] = [];
  const slY = 228, slRight = PW / 2 + 190, slCwd = 46;
  if (kd === "hidden") {
    if (sl.col) {
      const A = String(sl.col.a).split(""), B = String(sl.col.b).split(""), LL = Math.max(A.length, B.length);
      const cX = (i: number, len: number) => slRight - (len - 1 - i) * slCwd - slCwd / 2;
      /* each row is ONE run of digits in its own cells (the plus sign joins the bottom row when its digits fill the widest column): fewer tokens, a written act under 3 s */
      workTok.push({ t: A.join(""), x: slRight - A.length * slCwd, y: slY + 72, size: T.prompt, align: "start", step: slCwd });
      if (B.length === LL) workTok.push({ t: "+" + B.join(""), x: slRight - (LL + 1) * slCwd, y: slY + 112, size: T.prompt, align: "start", step: slCwd });
      else {
        workTok.push({ t: "+", x: slRight - LL * slCwd - 22, y: slY + 112, size: T.prompt, align: "middle", color: PL_INK.step });
        workTok.push({ t: B.join(""), x: slRight - B.length * slCwd, y: slY + 112, size: T.prompt, align: "start", step: slCwd });
      }
      workTok.push({ line: [slRight - (A.length + 1) * slCwd, slY + 124, slRight + 6, slY + 124], size: T.prompt });
      const da = A.slice().reverse().map(Number), db = B.slice().reverse().map(Number);
      let cr = 0;
      for (let j = 0; j < LL; j++) { const s = (da[j] || 0) + (db[j] || 0) + cr; cr = s >= 10 ? 1 : 0; if (cr === 1) workTok.push({ t: "1", x: slRight - (j + 1) * slCwd - slCwd / 2, y: slY + 30, size: T.micro, align: "middle", color: PL_INK.step }); }
    } else {
      const sts = slateOf(), m2 = sts.length || 1, sw2 = (PW - 48 - (m2 - 1) * 14) / m2;
      sts.forEach((t: string, i: number) => {
        const open = /=$/.test(t), lt = slLt(t);
        workTok.push({ t: lt, x: 24 + i * (sw2 + 14) + 14, y: slY + 70 + 46, size: plFit(lt + (open && showAns ? " " + plFmt(spec.answer) : open ? " 0000" : ""), sw2 - 24, T.prompt), align: "start" });
      });
    }
  }
  const workCh = tkChars(workTok, "work");
  /* how many of the jumps / growths are written: phase 3 writes them with the pencil, phase 4 always shows the jumps */
  const jShown = kd === "hidden" ? 99 : tkBegun(jTok, "jumps") + (kd === "grow" && shown ? 99 : 0);
  const gShown = tkBegun(gTok, "growth") + (shown ? 99 : 0);
  const specOf = (a: string): any => {
    if (a === "join") return { tool: "hand", moves: "push", at: [{ x: ptX(rpx(2)), y: lineY(1) }, { x: ptX(rpx(2)), y: lineY(0) }], onPoint: (i: number) => { if (i === 1) mark("join"); } };
    if (a === "route") {
      if (three) return { tool: "hand", moves: "tap", at: [0, 1].map((r: number) => ({ x: ptX(rpx(nums[2] - 1)), y: lineY(r) })), onPoint: (i: number) => { if (i === 1) mark("route"); } };
      return { tool: "hand", moves: "tap", at: [{ x: ptX(rpx(3)), y: lineY(rowStart[2] || 2) }], onPoint: () => mark("route") };
    }
    if (a === "double") return { tool: "hand", moves: "tap", at: [{ x: ptX(rpx(3)), y: lineY(wrapped ? 2 : 1) }], onPoint: () => mark("double") };
    if (a === "take") { const e = 2 * nums[1] - 1, x = ptX(rpx(e)), ty = lineY((wrapped ? 2 : 1) + Math.floor(e / WRAP)); return { tool: "eraser", moves: "rub", at: [{ x: x - 10, y: ty }, { x, y: ty }, { x: x + 10, y: ty }], onPoint: (i: number) => { if (i === 1) mark("take"); } }; }
    if (a === "level") {
      return { tool: "hand", moves: "carry", from: { x: ptX(rpx(nums[2] - 1)), y: lineY(2) }, at: [{ x: ptX(rpx(nums[2] - 4)), y: lineY(1) }], to: { x: ptX(rpx(nums[0])), y: lineY(0) },
        hold: <circle cx={0} cy={0} r={rr} fill="url(#gOne)" stroke="#00000033" strokeWidth={1.5} />, onPoint: () => mark("level") };
    }
    if (a === "pair") return { tool: "hand", moves: "tap", at: [{ x: ptX(rpx(3)), y: lineY(0) }], onPoint: () => upd((p: any) => ({ ...p, k: 1 })) };
    if (a === "table") return { tool: "hand", moves: "tap", at: [{ x: ptX(60), y: 50 }], onPoint: () => upd((p: any) => ({ ...p, k: 1 })) };
    if (a === "split") return plWrite(splitTok, "split");
    if (a === "read") {
      const ys = lines.slice(0, known);
      return { tool: "hand", moves: "sweep", at: ys.map((l: any, k: number) => ({ x: ptX(cx0(k) + cw / 2), y: onesY(k) })).concat(ys.map((l: any, k: number) => ({ x: ptX(cx0(k) + cw / 2), y: tensY(k) }))), onPoint: (i: number) => mark("read", i + 1) };
    }
    if (a === "jumps") return plWrite(jTok, "jumps");
    if (a === "growth") return plWrite(gTok, "growth");
    if (a === "fill") return fillTok.length ? plWrite(fillTok, "fill") : null;
    if (a === "work") return workTok.length ? plWrite(workTok, "work") : null;
    if (a === "putback") {
      const x = cx0(spec.hideAt) + cw / 2;
      return { tool: "hand", moves: "push", at: [{ x: ptX(x), y: CY + CH + 60 }, { x: ptX(x), y: CY + CH / 2 }], onPoint: (i: number) => { if (i === 1) mark("putback"); } };
    }
    return null;
  };
  const doAct = async (a: string, quiet?: boolean) => {
    if (busy.current) return false;
    const sp = specOf(a);
    if (!sp) return false;
    busy.current = true; setPlaying(true);
    /* the act is reported as it starts, so the Hint key never shows the hint of an act that is already running */
    if (!quiet) api.did(a);
    /* every pencil act of this tool is a WRITE (digits, signs and the bar): written literally here so `pencil-acts` reads it; the hand and the eraser acts go through the plain call */
    const ok = await (sp.tool === "pencil" ? api.act({ tool: "pencil", moves: "write", text: sp.text, at: sp.at, size: sp.size, align: sp.align, color: sp.color, step: sp.step, onPoint: sp.onPoint }) : api.act(sp));
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
    if (stage === "ask") upd((p: any) => ({ ...p, touched: true }));
    /* the lock is taken BEFORE the act starts: api.act hands the keys back to the state they had when it began, so a lock set mid-act (by the effect below) was lost at the act's end */
    if (stage === "ask" && !free && !gate.current && !mine.current && order.some((a: string) => !S.done[a])) { gate.current = true; api.lock(true); }
    doAct(id);
  };
  /* Free play: a change of the numbers is itself an act (a tap), and starts the board's acts over */
  const freeSet = (f: any, at: any) => {
    const t = Date.now();
    if (t - PL_GUARD.press < 450) return;
    PL_GUARD.press = t;
    if (busy.current) return;
    busy.current = true; setPlaying(true);
    api.did("free");
    api.act({ tool: "hand", moves: "tap", at: [{ x: ptX(at.x), y: at.y }], onPoint: () => upd((p: any) => ({ ...f(p), done: {}, pr: {}, demo: null, guess: "" })) }).then(() => { busy.current = false; setPlaying(false); });
  };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step's act */
  api.onEnter(stage === "demo" && stepOn ? () => {
    /* a real Enter (or Space) is one step: a repeat, or a second press within 450 ms, is ignored; the agent's check() and solve() are not key events */
    const ev: any = (window as any).event;
    if (ev && ev.type === "keydown") { const t = Date.now(); if (ev.repeat || t - PL_GUARD.press < 450) return; PL_GUARD.press = t; }
    if (S.done[stepOn]) api.did(stepOn); else doAct(stepOn);
  } : null);

  /* the answer gate: the keypad and the Answer key wait until the child has done the board's acts, once the child has touched it for real
     (a tap on the key). The agent's check() performs the acts at once, so an AI-mode or toolApi run is never held. */
  const needAct = stage === "ask" && !free && !!item && order.some((a: string) => !S.done[a]);
  HOOK.check = needAct ? () => { upd((p: any) => ({ ...p, done: order.reduce((o: any, a: string) => { o[a] = true; return o; }, { ...p.done }) })); return undefined; } : undefined;
  useEffect(() => {
    if (mine.current) return;
    const want = needAct && S.touched;
    if (want === gate.current) return;
    gate.current = want; api.lock(want);
  }, [needAct, S.touched]);

  /* the traceback: the acts the child has not done are performed one after another, then the whole right answer is written on the
     board with its reason. Nothing the child can tap is undone by it, and it clears when the child types something else. */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const my = ++gen.current;
    const local: any = { ...S.done };
    (async () => {
      mine.current = true; gate.current = false; api.lock(true); setCorr(true);
      /* phase 1: when the child's wrong answer is the near miss, the wrong route is laid out first, then the right one */
      const viaRoute = n === 1 && item && Number(wrong.value) === item.near;
      const seq = viaRoute ? (three ? ["route"].concat(order) : ["join", "route", "double", "take"]) : order;
      /* the child already shared a counter: the rods stand apart again so the overhang route shows, then they are shared once more */
      if (viaRoute && three && local.level) { local.level = false; upd((p: any) => ({ ...p, done: { ...p.done, level: false }, pr: { ...p.pr, level: 0 } })); }
      for (const a of seq) {
        if (gen.current !== my) return;
        if (!local[a]) { const ok = await doAct(a, true); if (!ok && gen.current !== my) return; local[a] = true; }
      }
      if (gen.current !== my) return;
      upd((p: any) => ({ ...p, demo: String(wrong.value) }));
      mine.current = false; setCorr(false); api.lock(false);
    })();
  }, [wrong]);
  /* a new question (or a new mount) stops a correction still playing and gives the pad back */
  useEffect(() => { if (free) PL_GUARD.free = Date.now(); }, [free]);
  useEffect(() => () => { gen.current++; if (mine.current || gate.current) { mine.current = false; gate.current = false; api.lock(false); } }, [qk]);
  useEffect(() => { if (S.demo !== null && S.demo !== typed) upd((p: any) => ({ ...p, demo: null })); }, [typed]);
  /* the win line, one sentence (the last question of a phase has it replaced by the closing) */
  useEffect(() => { if (stage === "win" && !free && item && item.win) api.say(item.win); }, [stage, n, index]);

  /* what the host and the agent read back (toolApi.getState): only what the picture shows */
  const sp0 = spec.slate || {};
  api.share({ lines: vals, jumps: jumps.map((v: any, k: number) => (jOn && k < jShown ? v : null)),
    jumpGrowth: kd === "grow" ? grows.map((v: any, k: number) => (k < gShown ? v : null)) : [], hiddenLines: spec.hideAt !== undefined && !restored ? 1 : 0,
    workedLine: has("work") ? (sp0.title || null) : null, digitColumns: kd === "table" && has("split"), complete: stage === "idle" });

  /* ── drawing helpers (plain functions: every hook stays above) ────────────────────────────── */
  const keyDefs = (): any[] => {
    if (won || corr || S.demo !== null || (hold && !playing)) return [];
    const a = order.find((x: string) => !S.done[x]);
    return a ? [{ id: a }] : [];
  };
  const KY = box.h - 92;
  const keyRow = () => {
    const ks = keyDefs();
    const kw = 300, kh = 76;
    const x0 = (PW - kw) / 2;
    return (
      <g onKeyDownCapture={(e: any) => { if (e.repeat) { e.stopPropagation(); e.preventDefault(); } }}>
        {ks.map((k: any, j: number) => {
          const lb = tx(PL_KEY[k.id]);
          return (
            <Key key={"k" + j} id={k.id} label={lb} x={x0} y={KY} w={kw} h={kh} C={C} tone="key" disabled={playing} onClick={() => pressKey(k.id)}>
              <text y={plLy(lang, 11)} textAnchor="middle" fontSize={lang === "en" ? T.label : plFit(lb, (kw - 20) / 0.8, T.prompt)} fontWeight={700} fill={toneInk("key", C.ink)}>{lb}</text>
            </Key>
          );
        })}
        {stepOn && ks.length > 0 && ks[0].id === stepOn && <Invite x={x0 + kw / 2} y={KY + kh / 2} w={kw} h={kh} C={C} />}
      </g>
    );
  };

  /* Free play's row of controls: the two sections, what changes in each, and the start up or down */
  const freeRow = () => {
    if (!free) return null;
    const FS = MODEL.free;
    const mk = (id: string, x: number, w: number, label: string, sel: boolean, f: any, tr?: boolean) => (
      <Key key={id} id={id} label={label} x={x} y={0} w={w} h={72} C={C} tone={sel ? "key" : "soft"} disabled={playing} onClick={() => freeSet(f, { x: x + w / 2, y: 36 })}>
        <text y={!tr ? 11 : plLy(lang, 11)} textAnchor="middle" fontSize={tr ? plFit(label, (w - 16) / 0.8, T.label) : T.label} fontWeight={700} fill={toneInk(sel ? "key" : "soft", C.ink)}>{label}</text>
      </Key>
    );
    const add = S.sec === "add";
    const keys: any[] = [
      mk("sec-add", 0, 120, tx("Add"), add, (p: any) => ({ ...p, sec: "add" }), true),
      mk("sec-times", 128, 140, tx("Times"), !add, (p: any) => ({ ...p, sec: "times" }), true),
    ];
    if (add) keys.push(mk("three", 280, 200, S.three ? tx("2 numbers") : tx("3 numbers"), false, (p: any) => ({ ...p, three: !p.three }), true));
    else [5, 9, 10].forEach((t: number, j: number) => keys.push(mk("tbl-" + t, 280 + j * 88, 80, "× " + t, S.t === t, (p: any) => ({ ...p, t }))));
    /* the start keys say what they move (the start), with a real minus sign */
    keys.push(mk("step-down", 556, 156, "− " + tx("start"), false, (p: any) => (add ? { ...p, a: Math.max(2, p.a - 1) } : { ...p, s: Math.max(2, p.s - 1) }), true));
    keys.push(mk("step-up", 722, 156, "+ " + tx("start"), false, (p: any) => (add ? { ...p, a: Math.min(FS.aMax, p.a + 1) } : { ...p, s: Math.min(FS.sMax, p.s + 1) }), true));
    return <g data-role="free-controls">{keys}</g>;
  };

  /* the rods of phase 1, and the line under which they stand */
  const rodsView = () => {
    const lvl = three ? has("level") : has("take");
    const endI = three ? nums[1] - 1 : nums[0] + nums[1] - 1;
    const lastRow = three ? 2 : 1;
    const xe = rpx(endI) + rr + 12;
    const yTop = rodY(0, 0) - rr - 6, yBot = rodY(lastRow, endI) + rr + 6;
    const ans = String(spec.answer);
    return (
      <g>
        <g data-role="reading">
          <text x={24} y={Y0 + 56} fontSize={T.xl} fontWeight={700} fill={C.ink}>{tx(spec.askLeft)}</text>
          {!(warm && n === 1) && <text x={24 + exprEnd + 18} y={Y0 + 56} fontSize={T.xl} fontWeight={700} fill={C.ink}>=</text>}
          {!(warm && n === 1) && (showAns ? (
            lab && !shown ? tkDraw(fillTok[0], fillCh[0], "fl") : <text x={24 + exprEnd + 76} y={Y0 + 56} fontSize={T.xl} fontWeight={700} fill={PL_INK.green}>{plFmt(spec.answer)}</text>
          ) : entry ? (
            <text x={24 + exprEnd + 76} y={Y0 + 56} fontSize={T.xl} fontWeight={700} fill={C.ink}>{entryTxt}</text>
          ) : plBlank(24 + exprEnd + 76, Y0 + 56, 190, C))}
        </g>
        {rods.map((row: any, r: number) => {
          let i = 0;
          /* the wrong-route row is two halves: the second half is a lighter plum with half a counter of gap at the join */
          const J = !three && r === 2 ? row.segs[0].n : -1;
          const gx = (idx: number) => rodX(r, idx) + (J >= 0 && idx >= J && Math.floor(idx / WRAP) === Math.floor(J / WRAP) ? pitch * 0.5 : 0);
          return (
            <g key={"rod" + r}>
              {row.segs.map((sg: any, j: number) => {
                const from = i; i += sg.n;
                return (
                  <g key={"sg" + j}>
                    {Array.from({ length: sg.n }, (_, q) => {
                      const x = gx(from + q), y = rodY(r, from + q);
                      if (!row.btn || sg.c === "gone" || sg.c === "plum" || sg.c === "plum2") return plRing(x, y, rr, sg.c, q);
                      return (
                        <g key={q}>
                          {plBtn(x, y, rr, sg.c)}
                          {skinned && <Skin name="counter" x={x - rr} y={y - rr} w={2 * rr} h={2 * rr} fit="stretch" />}
                          {skinned && PL_WASH[sg.c] && <circle cx={x} cy={y} r={rr * 0.94} fill={PL_WASH[sg.c]} fillOpacity={0.72} />}
                        </g>
                      );
                    })}
                    {sg.c !== "gone" && sg.n >= 2 && (() => {
                      const mid = from + Math.floor((sg.n - 1) / 2);
                      const small = wrapped || (free && three);
                      return <text x={gx(mid)} y={rodY(r, mid) - rr - (small ? 6 : 8)} textAnchor="middle" fontSize={small ? T.label : T.prompt} fontWeight={700} fill={sg.c === "plum" || sg.c === "plum2" ? PL_INK.neutral : PL_INK[sg.c]}>{String(sg.n)}</text>;
                    })()}
                  </g>
                );
              })}
            </g>
          );
        })}
        {lvl && <line x1={xe} y1={yTop} x2={xe} y2={yBot} stroke={PL_INK.step} strokeWidth={4} strokeLinecap="round" />}
      </g>
    );
  };

  /* phase 2's bay: the line on show as real things, a bundle of ten level sticks (tied at the middle) for each ten and a button for each one;
     it shows the last KNOWN line until the answer is on show, then the asked line (so it never gives the answer away early) */
  const bayView = () => {
    const lg = free ? 0.85 : 1, y0 = free ? 102 : 4;
    const ln = lines[showAns ? nC - 1 : known - 1];
    if (!ln || ln.value === null) return null;
    const tens = Math.floor(ln.value / 10), ones = ln.value % 10;
    /* two rows of bundles (six to a row, more across when there are over twelve tens), the line's name and its loose buttons to the right */
    const cols = tens > 12 ? Math.ceil(tens / 2) : 6;
    const pitch = free ? Math.min(108, 650 / cols) : Math.min(96, 560 / cols), bw = pitch - 10, bh = free ? 44 * lg : 68, sw = bw / 10;
    const lt = tx(ln.left), zx = 10 + cols * pitch + 14;
    return (
      <g data-role="bay">
        {Array.from({ length: tens }, (_, q) => {
          const x = 10 + (q % cols) * pitch, y = y0 + Math.floor(q / cols) * (bh + (free ? 6 : 8));
          return (
            <g key={"bd" + q}>
              {Array.from({ length: 10 }, (_, j) => <rect key={j} x={x + j * sw + 0.9} y={y} width={Math.max(2, sw - 1.8)} height={bh} rx={2} fill="#E2BC72" stroke="#8A6A2B" strokeWidth={1.3} />)}
              <rect x={x - 1} y={y + bh * 0.38} width={bw + 2} height={bh * 0.24} rx={3} fill={PL_INK.blue} stroke={shade(CONTENT.hundred, 0.45)} strokeWidth={1.5} />
            </g>
          );
        })}
        <text x={zx} y={y0 + 30} fontSize={PL_CH} fontWeight={700} fill={C.ink}>{lt}</text>
        {Array.from({ length: ones }, (_, q) => {
          /* the loose ones are ONE row, as big as the room to the right of the bundles allows */
          const r = Math.min(16, (880 - zx - 12) / (Math.max(ones, 1) * 2.25)), x = zx + r + q * (2 * r + 5), y = y0 + 30 + 14 + r;
          return (
            <g key={"on" + q}>
              {plBtn(x, y, r, "amber")}
              <Skin name="counter" x={x - r} y={y - r} w={2 * r} h={2 * r} fit="stretch" />
            </g>
          );
        })}
      </g>
    );
  };

  /* the strip of cards of phases 2-4 */
  const cardsView = () => {
    const r = cnt("read"), m = known;
    return (
      <g>
        {kd === "table" && bayView()}
        {lines.map((l: any, k: number) => {
          const x = cx0(k), y = CY;
          const blank = l.value === null;
          const lt = tx(l.left);
          const plum = l.tone === "plum";
          const lblFs = kd === "table" ? plFit(lt, cw - 20, T.prompt) : plFit(lt, cw - 20, PL_CH);
          /* a Hindi ordinal ("पहली") has its mark above the line: its title sits 6 px lower so the mark clears the card's top edge */
          const ordLow = lang === "hi" && /^\d(st|nd|rd|th)$/.test(String(l.left)) ? 6 : 0;
          const tens = blank ? "" : String(Math.floor(l.value / 10)), ones = blank ? "" : String(l.value % 10);
          return (
            <g key={"cd" + k} data-role="reading">
              <rect x={x} y={y} width={cw} height={CH} rx={18} fill={plum ? tint(CONTENT.bead, 0.8) : "#FFFFFF"} stroke={l.ask ? C.ink : plum ? PL_INK.plum : C.rule} strokeWidth={l.ask ? 3 : 4} strokeDasharray={l.ask && blank ? "12 9" : undefined} />
              {kd === "table" && <text x={x + cw / 2} y={y + T2.expr} textAnchor="middle" fontSize={lblFs} fontWeight={600} fill={C.ink}>{lt}</text>}
              {kd !== "table" && spec.lab !== false && (kd === "hidden" || spec.lab) && <text x={x + cw / 2} y={y + 36 + ordLow} textAnchor="middle" fontSize={lblFs} fontWeight={600} fill={C.ink}>{lt}</text>}
              {!blank && (l.ask && lab && !shown ? tkDraw(fillTok[0], fillCh[0], "fv") : <text x={x + cw / 2} y={y + (kd === "table" ? T2.val : (kd === "hidden" || spec.lab) ? CH - 18 : CH / 2 + 18)} textAnchor="middle" fontSize={plFit(plFmt(l.value), cw - 24, kd === "table" ? 52 : T.xl)} fontWeight={700} fill={plum ? PL_INK.blue : PL_INK[l.tone]}>{plFmt(l.value)}</text>)}
              {blank && l.ask && (entry
                ? <text x={x + cw / 2} y={y + (kd === "table" ? T2.val : (kd === "hidden" || spec.lab) ? CH - 18 : CH / 2 + 18)} textAnchor="middle" fontSize={plFit(entryTxt, cw - 24, kd === "table" ? 52 : T.xl)} fontWeight={700} fill={C.ink}>{entryTxt}</text>
                : plBlank(x + 24, y + (kd === "table" ? T2.val : (kd === "hidden" || spec.lab) ? CH - 18 : CH / 2 + 18) + 4, cw - 48, C))}
              {kd === "table" && (l.ask ? cnt("split") > 0 : splitCh[k] > 0) && [{ key: "tens", y: CY + T2.t0, v: tens, ink: PL_INK.blue, hue: "hundred", lit: l.ask ? r >= 2 * m : k < r - m, on: l.ask ? (shown || (lab && fillCh[1] > 0)) : true },
                { key: "ones", y: CY + T2.o0, v: ones, ink: PL_INK.amber, hue: "ten", lit: l.ask ? r >= 2 * m : k < Math.min(r, m), on: l.ask ? (shown || (lab && fillCh[2] > 0)) : true }].map((c: any) => (
                <g key={c.key}>
                  <rect x={x + 12} y={c.y} width={cw - 24} height={T2.h} rx={12} fill={c.lit && c.v !== "" ? tint(CONTENT[c.hue], 0.78) : "#FFFFFF"} stroke={C.ink} strokeWidth={2.5} strokeDasharray={l.ask && !c.on ? "8 7" : undefined} />
                  <text x={x + 22} y={c.y + T2.h / 2 + 10} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(c.key)}</text>
                  {c.on && c.v !== "" && (l.ask ? (lab && !shown ? tkDraw(fillTok[c.key === "tens" ? 1 : 2], fillCh[c.key === "tens" ? 1 : 2], c.key) : <text x={x + cw - 24} y={c.y + T2.h / 2 + 17} textAnchor="end" fontSize={free ? 44 : 52} fontWeight={700} fill={c.ink}>{c.v}</text>)
                    : c.key === "tens" ? tkDraw(splitTok[k], splitCh[k], c.key) : null)}
                </g>
              ))}
            </g>
          );
        })}
        {kd === "table" && splitTok.length > known && splitCh[known] > 0 && <g data-role="reading">{tkDraw(splitTok[known], splitCh[known], "onesrun")}</g>}
      </g>
    );
  };
  /* phase 2: the step from each card's tens (and ones) to the next, written between the cards once the rows have been read */
  const deltaView = () => {
    if (kd !== "table") return null;
    const r = cnt("read"), m = known;
    const out: any[] = [];
    const chip = (k: number, y: number, v: number, tone: string, key: string) => {
      const x = cx0(k) + cw + GAP / 2, t = (v < 0 ? "−" : "+") + Math.abs(v);
      return (
        <g key={key} data-role="reading">
          <rect x={x - 25} y={y - 21} width={50} height={42} rx={12} fill="#FFFFFF" stroke={PL_INK[tone]} strokeWidth={3} />
          <text x={x} y={y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PL_INK[tone]}>{t}</text>
        </g>
      );
    };
    const cell = (k: number, f: (v: number) => number) => f(lines[k].value);
    const nChip = (k: number) => k + 1 < nC && lines[k + 1].value !== null;
    for (let j = 0; j < nC - 1; j++) {
      if (!nChip(j)) continue;
      const askSide = lines[j + 1].ask;
      const okOnes = askSide ? r >= 2 * m : j < r - 1;
      const okTens = askSide ? r >= 2 * m : j < r - m - 1;
      if (okOnes) out.push(chip(j, onesY(j), cell(j + 1, (v: number) => v % 10) - cell(j, (v: number) => v % 10), "amber", "o" + j));
      if (okTens) out.push(chip(j, tensY(j), cell(j + 1, (v: number) => Math.floor(v / 10)) - cell(j, (v: number) => Math.floor(v / 10)), "blue", "t" + j));
    }
    return <g>{out}</g>;
  };
  /* phases 3 and 4: the jump written on an arc above every pair of neighbouring cards, and phase 3's growth above those */
  const jumpsView = () => {
    if (!jOn) return null;
    const items: any[] = [];
    /* phase 3: a chip is written with the pencil, by its own act, or (the asked line, on a board the child fills in) by Test it */
    const jCh = tkChars(jTok, "jumps"), gCh = tkChars(gTok, "growth");
    const askJ = lab && !shown && kd === "grow";
    jumps.forEach((v: any, k: number) => {
      if (v === null || k >= jShown) return;
      const pen = kd !== "grow" ? undefined : askJ && k === nC - 2 ? (fillCh[1] || 0) : k < jCh.length ? jCh[k] : 99;
      if (pen !== undefined && !(pen > 0)) return;
      const a = jumpPt(k);
      items.push(<path key={"ar" + k} d={"M " + (cx0(k) + cw / 2) + " " + (CY - 4) + " Q " + a.x + " " + (CY - 56) + " " + (cx0(k + 1) + cw / 2) + " " + (CY - 4)} fill="none" stroke={PL_INK.step} strokeWidth={3} strokeLinecap="round" />);
      items.push(plChip(a.x, a.y, "+" + plFmt(v), "step", "j" + k, pen));
    });
    if (kd === "grow") grows.forEach((v: any, k: number) => {
      if (v === null || k >= gShown) return;
      const pen = askJ && k === nC - 3 ? (fillCh[2] || 0) : k < gCh.length ? gCh[k] : 99;
      if (!(pen > 0)) return;
      const p = growPt(k); items.push(plChip(p.x, p.y, "+" + plFmt(v), "plum", "g" + k, pen));
    });
    const showCap = kd === "hidden" || jShown > 0;
    return (
      <g>
        {showCap && <text x={10} y={chipY + 12} fontSize={PL_CH} fontWeight={700} fill={C.ink}>{tx("jump")}</text>}
        {kd === "grow" && gShown > 0 && <text x={10} y={32 + 12} fontSize={PL_CH} fontWeight={700} fill={C.ink}>{tx("grows by")}</text>}
        {items}
      </g>
    );
  };
  /* phase 3: the counters of every total, a new row or layer in amber */
  const shapesView = () => {
    if (kd !== "grow" || !spec.shape) return null;
    return (
      <g>
        {shapeCards.map((k: number) => {
          const sh = plShape(spec, k);
          const p = Math.min(34, (cw - 12) / sh.cols, 140 / sh.rows), r = p * 0.44;
          const ox = cx0(k) + (cw - sh.cols * p) / 2, oy = 280;
          return (
            <g key={"sh" + k}>
              {sh.pts.map((q: any, j: number) => {
                const x = ox + (q.c + 0.5) * p, y = oy + (q.r + 0.5) * p;
                return (
                  <g key={j}>
                    {plBtn(x, y, r, q.col)}
                    {shapeSkin && <Skin name="counter" x={x - r} y={y - r} w={2 * r} h={2 * r} fit="stretch" />}
                    {shapeSkin && PL_WASH[q.col] && <circle cx={x} cy={y} r={r * 0.94} fill={PL_WASH[q.col]} fillOpacity={0.72} />}
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    );
  };
  /* phase 4: the slate, where one line is worked in full */
  const slateView = () => {
    if (kd !== "hidden") return null;
    const yP = 228, hP = 180;
    const col = sl.col;
    const colA = col ? String(col.a).split("") : [];
    const right = slRight, cwd = slCwd;
    const m = (slateOf().length) || 1, sw = (PW - 48 - (m - 1) * 14) / m;
    const lineI = workTok.findIndex((t: any) => t.line);
    return (
      <g>
        <rect x={0} y={yP} width={PW} height={hP} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={3} />
        <g data-role="reading">
          <text x={24} y={yP + 46} fontSize={PL_CH + 2} fontWeight={700} fill={C.ink}>{tx(sp0.title || "")}</text>
          {col ? (
            <g>
              {workTok.map((t: any, j: number) => tkDraw(t, workCh[j], "w" + j))}
              {lineI >= 0 && workCh[lineI] > 0 && (showAns
                ? <text x={right} y={yP + 164} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={PL_INK.green}>{plFmt(spec.answer)}</text>
                : plBlank(right - colA.length * cwd, yP + 164, colA.length * cwd + 6, C))}
            </g>
          ) : slateOf().map((t: string, i: number) => {
            if (!(workCh[i] > 0)) return null;
            const open = /=$/.test(t), x = 24 + i * (sw + 14);
            const lt = slLt(t), fs = workTok[i].size;
            return (
              <g key={"st" + i}>
                <rect x={x} y={yP + 70} width={sw} height={72} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} />
                {tkDraw(workTok[i], workCh[i], "wt" + i)}
                {open && (showAns
                  ? <text x={x + 14 + plW(lt) * fs + 10} y={yP + 70 + 46} fontSize={fs} fontWeight={700} fill={PL_INK.green}>{plFmt(spec.answer)}</text>
                  : plBlank(x + 14 + plW(lt) * fs + 10, yP + 70 + 52, Math.max(40, sw - 28 - plW(lt) * fs - 10), C))}
              </g>
            );
          })}
        </g>
      </g>
    );
  };
  /* Free play: tap the asked place to lend it the pad, type a guess, press Enter; "Test it" then writes the true value beside it */
  const guessHit = () => {
    if (!free || showAns) return null;
    const box = kd === "rods" ? { x: 24 + exprEnd + 50, y: Y0 + 8, w: 240, h: 72 } : { x: cx0(nC - 1), y: CY, w: cw, h: CH };
    const take = () => {
      api.did("guess");
      api.capture((k: any) => {
        if (k === "enter") { api.capture(null); return; }
        upd((p: any) => ({ ...p, guess: k === "back" ? p.guess.slice(0, -1) : k === "clear" ? "" : /^\d$/.test(String(k)) ? (p.guess + String(k)).slice(0, 5) : p.guess }));
      });
    };
    return <Hit id="guess" x={box.x} y={box.y} w={box.w} h={box.h} label="Guess" onPress={take} />;
  };
  const guessPill = () => {
    if (!free || !showAns || !S.guess) return null;
    const right = String(S.guess) === String(spec.answer);
    const t = tx("guess") + " " + plFmt(S.guess);
    const w = plW(t) * T.label + 44;
    return (
      <g data-role="reading">
        <rect x={10} y={KY + 12} width={w} height={56} rx={28} fill="#FFFFFF" stroke={right ? PL_INK.green : C.ink} strokeWidth={3} />
        <text x={10 + w / 2} y={KY + 12 + 38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={right ? PL_INK.green : C.ink}>{t}</text>
      </g>
    );
  };
  /* the reason the pattern works, once the whole answer is on show: a label of at most four words */
  const whyView = () => {
    if (!whyOn) return null;
    const t = tx(spec.why), fs = lang === "en" ? T.label : plFit(t, 800, T.label);
    const w = Math.min(PW - 40, plW(t) * fs + 56), ph = lang === "hi" ? 66 : 56;
    return (
      <g data-role="reading">
        <rect x={(PW - w) / 2} y={KY + 12} width={w} height={ph} rx={ph / 2} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
        <text x={PW / 2} y={KY + 12 + (lang === "hi" ? 45 : 38)} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>{t}</text>
      </g>
    );
  };

  return (
    <g>
      <g transform={"translate(" + OX + ",0)"}>
        {kd === "rods" && rodsView()}
        {kd !== "rods" && cardsView()}
        {kd === "table" && deltaView()}
        {kd !== "table" && kd !== "rods" && jumpsView()}
        {shapesView()}
        {slateView()}
        {freeRow()}
        {guessHit()}
        {guessPill()}
        {whyView()}
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
