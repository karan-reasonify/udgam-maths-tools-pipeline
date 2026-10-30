/* ═══ M3.S5.T10.C48.2D1 · column_adder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The lesson is action-driven: nothing moves on unless the
   child acts. THE NEW LOOK (docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar, the
   question lives only in the bubble (one sentence), every act is performed on screen (api.act).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing).
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "column_adder";
const MEDIA_ID = "M3.S5.T10.C48.2D1";
const TOOL_NAME = "Column Adder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A column frame, with one line for every point."];
/* the whole-tool line (not shown from r44) */
const FINISH_LINE = "Every point in one line, and every carry across.";
/* printed when the child opens Free play; it promises only what the free branch of Work offers */
const FREE_LINE = "Free play. Line up any of the cards and add them.";

/* THE START PAGE (docs/LAYOUT.md §1c): one printed question to wonder at, and the column frame itself */
const START_HOOK = "How do you add 3.46 and 2.3 when they are not the same length?";
function StartArt({ box, C, tx = (v: any) => v }: any) {
  const cw = 212, fx = (box.w - 4 * cw) / 2, pl = fx + 2 * cw, cx = (c: number) => fx + c * cw + cw / 2;
  const rows = [{ t: "3.46", y: 62 }, { t: "2.3", y: 140 }];
  return (
    <g>
      <rect x={fx - 20} y={0} width={4 * cw + 40} height={box.h} rx={22} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {["Tens", "Ones", "Tenths", "Hundredths"].map((h, c) => <text key={h} x={cx(c)} y={44} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(h)}</text>)}
      {[1, 3].map((k) => <line key={k} x1={fx + k * cw} y1={56} x2={fx + k * cw} y2={322} stroke={C.ink} strokeWidth={3} />)}
      {rows.map((r) => {
        const [a, b] = r.t.split("."), first = 2 - a.length, nd = a.length + b.length;
        return (
          <g key={r.t}>
            <rect x={fx + first * cw + 10} y={r.y} width={nd * cw - 20} height={68} rx={14} fill={tint(CA_COL.given, 0.86)} stroke={CA_COL.given} strokeWidth={2.5} />
            {(a + b).split("").map((ch, k) => <text key={k} x={cx(first + k)} y={r.y + 52} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CA_INK.given}>{ch}</text>)}
            <circle cx={pl} cy={r.y + 48} r={8} fill={CA_INK.line} />
          </g>
        );
      })}
      <line x1={fx} y1={232} x2={fx + 4 * cw} y2={232} stroke={CA_INK.line} strokeWidth={4} />
      <rect x={fx + 10} y={244} width={4 * cw - 20} height={70} rx={14} fill={tint(CA_COL.sum, 0.9)} stroke={CA_COL.sum} strokeWidth={2.5} strokeDasharray="10 8" />
      <line x1={pl} y1={56} x2={pl} y2={322} stroke={CA_INK.line} strokeWidth={5} />
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final. */
const TR: any = {
  hi: {
    "Column Adder": "स्तंभ जोड़",
    "Line up the points": "बिंदु एक सीध में",
    "Carrying across the point": "बिंदु के पार हासिल",
    "Adding whole numbers and decimals": "पूर्ण संख्या और दशमलव संख्या का जोड़",
    "Order and zero in adding": "जोड़ में क्रम और शून्य",
    "Points in one line. Then add as whole numbers.": "बिंदु एक सीध में रखो। फिर पूर्ण संख्याओं की तरह जोड़ो।",
    "Fifteen hundredths. Keep the five and carry one tenth.": "पंद्रह शतांश। पाँच रखो और एक दशांश हासिल ले जाओ।",
    "Where is the point in a whole number?": "पूर्ण संख्या में बिंदु कहाँ होता है?",
    "Swap them round. Did the sum change?": "उनकी जगह बदलो। क्या योग बदला?",
    "A column frame, with one line for every point.": "स्तंभों का फ्रेम, हर बिंदु के लिए एक ही रेखा।",
    "Every point in one line, and every carry across.": "हर बिंदु एक सीध में, और हर हासिल आगे।",
    "Free play. Line up any of the cards and add them.": "खुला खेल। कोई भी कार्ड सीध में रखो और जोड़ो।",
    "How do you add 3.46 and 2.3 when they are not the same length?": "3.46 और 2.3 की लंबाई अलग है, तो इन्हें कैसे जोड़ोगे?",
    /* phase 1 */
    "Tap 3.46, and the hand puts its point on the point line.": "3.46 टैप करो, हाथ उसके बिंदु को रेखा पर रखेगा।",
    "Tap the first card in the tray.": "ट्रे का पहला कार्ड टैप करो।",
    "Now tap 2.3, so its point sits on that same line.": "अब 2.3 टैप करो, उसका बिंदु भी उसी रेखा पर आएगा।",
    "Tap 2.3, the card still waiting below.": "नीचे बचा कार्ड 2.3 टैप करो।",
    "Tap Add, and the pencil adds each column from the right.": "जोड़ो दबाओ, पेंसिल दाईं ओर से हर स्तंभ जोड़ेगी।",
    "The Add key is under the frame.": "जोड़ो बटन फ्रेम के नीचे है।",
    "Every point sits on the one line, so each place keeps its own column.": "हर बिंदु एक ही रेखा पर है, इसलिए हर स्थान का अपना स्तंभ है।",
    "Add the hundredths, then the tenths, then the ones, from the right.": "दाईं ओर से पहले शतांश, फिर दशांश, फिर इकाई जोड़ो।",
    "With the points lined up, decimals add just like whole numbers.": "बिंदु सीध में हों तो दशमलव संख्याएँ पूर्ण संख्याओं की तरह जुड़ती हैं।",
    "You learned: line up the points, then add as whole numbers.": "तुमने सीखा: बिंदु सीध में रखो, फिर पूर्ण संख्याओं की तरह जोड़ो।",
    "Line up the points, then add 5.23 and 1.6.": "बिंदु सीध में रखो, फिर 5.23 और 1.6 जोड़ो।",
    "The 6 in 1.6 is six tenths, so it belongs under the 2 of 5.23.": "1.6 का 6 छह दशांश है, इसलिए वह 5.23 के 2 के नीचे आता है।",
    "Now add 4.12 and 3.5 the same way.": "अब इसी तरह 4.12 और 3.5 जोड़ो।",
    "Put the point of 3.5 on the line, and its 5 goes under the tenths.": "3.5 का बिंदु रेखा पर रखो, तब उसका 5 दशांश के नीचे जाएगा।",
    "What is 0.63 + 0.21?": "0.63 + 0.21 कितना है?",
    "Where does the point of the sum go?": "योग का बिंदु कहाँ जाएगा?",
    "5.23 + 1.6 = ?": "5.23 + 1.6 = ?", "4.12 + 3.5 = ?": "4.12 + 3.5 = ?", "0.63 + 0.21 = ?": "0.63 + 0.21 = ?",
    /* phase 2 */
    "Tap Add to add the hundredths, 8 and 7.": "शतांश 8 और 7 जोड़ने के लिए जोड़ो दबाओ।",
    "The Add key is at the bottom of the board.": "जोड़ो बटन बोर्ड में सबसे नीचे है।",
    "15 hundredths: keep the 5, carry 1 tenth, and tap Add for the tenths.": "15 शतांश में 5 रखो, 1 दशांश हासिल ले जाओ, और दशांश के लिए जोड़ो दबाओ।",
    "Tap Add again for the tenths.": "दशांश के लिए फिर से जोड़ो दबाओ।",
    "12 tenths: keep the 2, the 1 hops over the point, so tap Add for the ones.": "12 दशांश में 2 रखो, 1 बिंदु के पार जाता है, अब इकाई के लिए जोड़ो दबाओ।",
    "One more Add adds the ones.": "एक बार और जोड़ो दबाओ, इकाई जुड़ेंगी।",
    "After the hundredths, add the tenths column the same way.": "शतांश के बाद, इसी तरह दशांश स्तंभ जोड़ो।",
    "Ten tenths make one whole, which moves over the point into the ones.": "दस दशांश से एक पूरा बनता है, जो बिंदु पार करके इकाई में जाता है।",
    "Same sum": "योग वही",
    "That sum is right.": "यह योग सही है।",
    "Check each column from the right again.": "दाईं ओर से हर स्तंभ फिर से जाँचो।",
    "That is the same number; write the sum with no extra zeros.": "यह वही संख्या है, योग बिना फालतू शून्य के लिखो।",
    "Ten of one place is carried as one of the next, across the point too.": "एक स्थान के दस अगले स्थान का एक बनकर जाते हैं, बिंदु के पार भी।",
    "You learned: carry ten of a place as one of the next, across the point.": "तुमने सीखा: एक स्थान के दस अगले का एक बनते हैं, बिंदु के पार भी।",
    "Add 2.87 and 3.46, carrying where a column makes ten or more.": "2.87 और 3.46 जोड़ो, जहाँ स्तंभ दस या ज़्यादा हो वहाँ हासिल ले जाओ।",
    "Add the hundredths first: is their total ten or more?": "पहले शतांश जोड़ो, क्या कुल दस या ज़्यादा है?",
    "Now find 1.58 + 2.34.": "अब 1.58 + 2.34 निकालो।",
    "Which column do you add first?": "तुम पहले कौन सा स्तंभ जोड़ोगे?",
    "Add the hundredths, and send any ten up to the tenths.": "शतांश जोड़ो, और दस बने तो उसे दशांश में भेजो।",
    "Now add the tenths, counting anything sent up from the hundredths.": "अब शतांश से ऊपर भेजा गया भी गिनकर दशांश जोड़ो।",
    "What is 7.69 + 4.57?": "7.69 + 4.57 कितना है?",
    "Which columns make ten or more, and where do their tens go?": "कौन से स्तंभ दस या ज़्यादा बनाते हैं, और उनके दस कहाँ जाते हैं?",
    "2.87 + 3.46 = ?": "2.87 + 3.46 = ?", "1.58 + 2.34 = ?": "1.58 + 2.34 = ?", "7.69 + 4.57 = ?": "7.69 + 4.57 = ?",
    /* phase 3 */
    "A whole number has its point after its ones digit, so tap Point.": "पूर्ण संख्या का बिंदु इकाई अंक के बाद होता है, इसलिए बिंदु दबाओ।",
    "Tap the Point key under the frame.": "फ्रेम के नीचे बिंदु बटन दबाओ।",
    "Now tap 6, and its point goes on the line with the others.": "अब 6 टैप करो, उसका बिंदु बाकी बिंदुओं की रेखा पर जाएगा।",
    "Tap the 6 card in the tray.": "ट्रे में 6 वाला कार्ड टैप करो।",
    "Tap Add to add all three cards.": "तीनों कार्ड जोड़ने के लिए जोड़ो दबाओ।",
    "Add is the key under the frame.": "जोड़ो फ्रेम के नीचे वाला बटन है।",
    "Tap Point first, then line every card up by its point.": "पहले बिंदु दबाओ, फिर हर कार्ड को उसके बिंदु से सीध में रखो।",
    "Add the whole number and one decimal first, then add the last one.": "पहले पूर्ण संख्या और एक दशमलव संख्या जोड़ो, फिर आखिरी जोड़ो।",
    "With its point in place, a whole number lines up like any decimal.": "बिंदु लगने पर पूर्ण संख्या भी दशमलव संख्या की तरह सीध में आती है।",
    "You learned: a whole number's point comes after its ones digit.": "तुमने सीखा: पूर्ण संख्या का बिंदु इकाई अंक के बाद आता है।",
    "Add 9, 1.75 and 0.4.": "9, 1.75 और 0.4 जोड़ो।",
    "The 9 is nine ones, so its point comes straight after the 9.": "9 यानी नौ इकाई, इसलिए उसका बिंदु ठीक 9 के बाद आता है।",
    "Now add the whole number 6 and 2.35.": "अब पूर्ण संख्या 6 और 2.35 जोड़ो।",
    "6 belongs under the ones, not under the hundredths of 2.35.": "6 इकाई के नीचे आता है, 2.35 के शतांश के नीचे नहीं।",
    "Tap Point so the 6 shows its point after the ones digit.": "बिंदु दबाओ, ताकि 6 का बिंदु इकाई अंक के बाद दिखे।",
    "With both points on the line, add hundredths, tenths, then ones.": "दोनों बिंदु रेखा पर हों, तो शतांश, दशांश, फिर इकाई जोड़ो।",
    "What total length in metres do ribbons of 4 m, 1.85 m and 0.6 m make?": "4 मी, 1.85 मी और 0.6 मी के रिबन कुल कितने मीटर लंबे हैं?",
    "4 m is 4 whole metres, so which column holds that 4?": "4 मी यानी 4 पूरे मीटर, तो वह 4 किस स्तंभ में जाएगा?",
    "9 + 1.75 + 0.4 = ?": "9 + 1.75 + 0.4 = ?", "6 + 2.35 = ?": "6 + 2.35 = ?", "Total length in m?": "कुल लंबाई मीटर में?",
    /* phase 4 */
    "1.35 + 4.2 makes 5.55, so tap Swap to change the order.": "1.35 + 4.2 = 5.55 है, अब क्रम बदलने के लिए बदलो दबाओ।",
    "Tap the Swap key.": "बदलो बटन दबाओ।",
    "Now tap Add to add them in the new order.": "अब नए क्रम में जोड़ने के लिए जोड़ो दबाओ।",
    "Tap Add to add again.": "फिर से जोड़ने के लिए जोड़ो दबाओ।",
    "Next tap the 0 card, and the hand adds it as a third row.": "अब 0 वाला कार्ड टैप करो, हाथ उसे तीसरी पंक्ति में रखेगा।",
    "Tap the 0 card in the tray.": "ट्रे में 0 वाला कार्ड टैप करो।",
    "Tap Add to see what adding 0 does to the sum.": "0 जोड़ने से योग पर क्या असर होता है, देखने के लिए जोड़ो दबाओ।",
    "Add is next to Swap under the frame.": "जोड़ो बटन फ्रेम के नीचे बदलो के पास है।",
    "Check every column of the frame once more.": "फ्रेम का हर स्तंभ एक बार फिर देखो।",
    "Add the columns from the right, one by one.": "दाईं ओर से एक एक स्तंभ जोड़ो।",
    "So a sum can be checked by adding it in the other order.": "इसलिए दूसरे क्रम में जोड़कर योग जाँचा जा सकता है।",
    "You learned: the order of addends and adding 0 leave the sum the same.": "तुमने सीखा: संख्याओं का क्रम या 0 जोड़ना योग नहीं बदलता।",
    "Will 5.3 + 2.06 give the same sum as 2.06 + 5.3?": "क्या 5.3 + 2.06 का योग 2.06 + 5.3 जितना ही होगा?",
    "Same sum?": "योग वही?",
    "Look at the digits in each column of the two cards.": "दोनों कार्डों के हर स्तंभ के अंक देखो।",
    "Add the tenths in each order: what do you get?": "दोनों क्रम में दशांश जोड़ो, क्या मिलता है?",
    "Now try the hundredths both ways.": "अब शतांश भी दोनों तरह से जोड़कर देखो।",
    "What is 0 + 8.41?": "0 + 8.41 कितना है?",
    "0 + 8.41 = ?": "0 + 8.41 = ?",
    "Line up the 0 card by its point, then add each column.": "0 वाले कार्ड को उसके बिंदु से सीध में रखो, फिर हर स्तंभ जोड़ो।",
    "The 0 card has 0 in the ones and nothing after its point.": "0 वाले कार्ड में इकाई पर 0 है और बिंदु के बाद कुछ नहीं।",
    "Add each column from the right, the 0 card included.": "0 वाले कार्ड को भी गिनकर दाईं ओर से हर स्तंभ जोड़ो।",
    "If the cards swap to 2.18 + 4.7, is the sum still the same?": "अगर कार्ड बदलकर 2.18 + 4.7 हो जाएँ, तो क्या योग वही रहेगा?",
    "Look down each column before you choose.": "चुनने से पहले हर स्तंभ ऊपर से नीचे देखो।",
    "Work out the ones both ways: what do you get?": "दोनों तरह से इकाई जोड़ो, क्या मिलता है?",
    "Then check the tenths in the new order too.": "फिर नए क्रम में दशांश भी जाँचो।",
    "Yes": "हाँ", "No": "नहीं",
    /* the win lines (api.say, one per question) */
    "The 6 went to the tenths: 5.23 + 1.6 = 6.83.": "6 दशांश में गया, 5.23 + 1.6 = 6.83 है।",
    "3.5 lined up by its point: 4.12 + 3.5 = 7.62.": "3.5 अपने बिंदु से सीध में आया, 4.12 + 3.5 = 7.62 है।",
    "The point straight below: 0.63 + 0.21 = 0.84.": "बिंदु ठीक नीचे है, 0.63 + 0.21 = 0.84 है।",
    "Two carries, one across the point: 6.33.": "दो हासिल, एक बिंदु के पार, योग 6.33 है।",
    "One carry, from the hundredths: 3.92.": "शतांश से एक हासिल, योग 3.92 है।",
    "A carry crossed the point: 12.26.": "एक हासिल बिंदु के पार गया, योग 12.26 है।",
    "With its point after the 9, the sum is 11.15.": "9 के बाद बिंदु लगाकर योग 11.15 है।",
    "6 and 2.35, lined up by their points, make 8.35.": "बिंदुओं से सीध में 6 और 2.35 मिलकर 8.35 बनते हैं।",
    "4 m, 1.85 m and 0.6 m make 6.45 m.": "4 मी, 1.85 मी और 0.6 मी मिलकर 6.45 मी बनते हैं।",
    "Yes, swapped round, they still make 7.36.": "हाँ, जगह बदलकर भी योग 7.36 है।",
    "0 + 8.41 is still 8.41.": "0 + 8.41 अब भी 8.41 है।",
    "Yes, 2.18 + 4.7 also makes 6.88.": "हाँ, 2.18 + 4.7 भी 6.88 बनता है।",
    /* the words the working area draws, and the aria labels */
    "Tens": "दहाई", "Ones": "इकाई", "Tenths": "दशांश", "Hundredths": "शतांश", "Carry": "हासिल", "Given": "दिए गए", "Sum": "योग",
    "Added": "जोड़ा", "zero": "शून्य", "point": "बिंदु", "Add": "जोड़ो", "Point": "बिंदु", "Swap": "बदलो",
    "Card": "कार्ड", "Zero card": "शून्य कार्ड", "Take back": "वापस लो",
  },
  gu: {
    "Column Adder": "સ્તંભ સરવાળો",
    "Line up the points": "બિંદુ એક લીટીમાં",
    "Carrying across the point": "બિંદુની પાર વદી",
    "Adding whole numbers and decimals": "પૂર્ણ સંખ્યા અને દશાંશ સંખ્યાનો સરવાળો",
    "Order and zero in adding": "સરવાળામાં ક્રમ અને શૂન્ય",
    "Points in one line. Then add as whole numbers.": "બિંદુ એક લીટીમાં રાખો. પછી પૂર્ણ સંખ્યાની જેમ ઉમેરો.",
    "Fifteen hundredths. Keep the five and carry one tenth.": "પંદર શતાંશ. પાંચ રાખો અને એક દશાંશ વદી લઈ જાઓ.",
    "Where is the point in a whole number?": "પૂર્ણ સંખ્યામાં બિંદુ ક્યાં હોય?",
    "Swap them round. Did the sum change?": "તેમની જગ્યા બદલો. શું સરવાળો બદલાયો?",
    "A column frame, with one line for every point.": "સ્તંભોની ફ્રેમ, દરેક બિંદુ માટે એક જ રેખા.",
    "Every point in one line, and every carry across.": "દરેક બિંદુ એક લીટીમાં, અને દરેક વદી આગળ.",
    "Free play. Line up any of the cards and add them.": "મુક્ત રમત. કોઈ પણ કાર્ડ ગોઠવો અને ઉમેરો.",
    "How do you add 3.46 and 2.3 when they are not the same length?": "3.46 અને 2.3 ની લંબાઈ જુદી છે, તો તેમને કેવી રીતે ઉમેરશો?",
    /* phase 1 */
    "Tap 3.46, and the hand puts its point on the point line.": "3.46 ટેપ કરો, હાથ તેનું બિંદુ રેખા પર મૂકશે.",
    "Tap the first card in the tray.": "ટ્રેનું પહેલું કાર્ડ ટેપ કરો.",
    "Now tap 2.3, so its point sits on that same line.": "હવે 2.3 ટેપ કરો, તેનું બિંદુ પણ એ જ રેખા પર આવશે.",
    "Tap 2.3, the card still waiting below.": "નીચે બાકી રહેલું કાર્ડ 2.3 ટેપ કરો.",
    "Tap Add, and the pencil adds each column from the right.": "ઉમેરો દબાવો, પેન્સિલ જમણેથી દરેક સ્તંભ ઉમેરશે.",
    "The Add key is under the frame.": "ઉમેરો બટન ફ્રેમની નીચે છે.",
    "Every point sits on the one line, so each place keeps its own column.": "દરેક બિંદુ એક જ રેખા પર છે, તેથી દરેક સ્થાનનો પોતાનો સ્તંભ છે.",
    "Add the hundredths, then the tenths, then the ones, from the right.": "જમણેથી પહેલાં શતાંશ, પછી દશાંશ, પછી એકમ ઉમેરો.",
    "With the points lined up, decimals add just like whole numbers.": "બિંદુ એક લીટીમાં હોય તો દશાંશ સંખ્યાઓ પૂર્ણ સંખ્યાની જેમ ઉમેરાય.",
    "You learned: line up the points, then add as whole numbers.": "તમે શીખ્યા: બિંદુ ગોઠવો, પછી પૂર્ણ સંખ્યાની જેમ ઉમેરો.",
    "Line up the points, then add 5.23 and 1.6.": "બિંદુ ગોઠવો, પછી 5.23 અને 1.6 ઉમેરો.",
    "The 6 in 1.6 is six tenths, so it belongs under the 2 of 5.23.": "1.6 નો 6 છ દશાંશ છે, તેથી તે 5.23 ના 2 ની નીચે આવે.",
    "Now add 4.12 and 3.5 the same way.": "હવે એ જ રીતે 4.12 અને 3.5 ઉમેરો.",
    "Put the point of 3.5 on the line, and its 5 goes under the tenths.": "3.5 નું બિંદુ રેખા પર મૂકો, તો તેનો 5 દશાંશની નીચે જશે.",
    "What is 0.63 + 0.21?": "0.63 + 0.21 કેટલા થાય?",
    "Where does the point of the sum go?": "સરવાળાનું બિંદુ ક્યાં જશે?",
    "5.23 + 1.6 = ?": "5.23 + 1.6 = ?", "4.12 + 3.5 = ?": "4.12 + 3.5 = ?", "0.63 + 0.21 = ?": "0.63 + 0.21 = ?",
    /* phase 2 */
    "Tap Add to add the hundredths, 8 and 7.": "શતાંશ 8 અને 7 ઉમેરવા ઉમેરો દબાવો.",
    "The Add key is at the bottom of the board.": "ઉમેરો બટન બોર્ડમાં સૌથી નીચે છે.",
    "15 hundredths: keep the 5, carry 1 tenth, and tap Add for the tenths.": "15 શતાંશમાં 5 રાખો, 1 દશાંશ વદી લઈ જાઓ, અને દશાંશ માટે ઉમેરો દબાવો.",
    "Tap Add again for the tenths.": "દશાંશ માટે ફરી ઉમેરો દબાવો.",
    "12 tenths: keep the 2, the 1 hops over the point, so tap Add for the ones.": "12 દશાંશમાં 2 રાખો, 1 બિંદુની પાર જાય, હવે એકમ માટે ઉમેરો દબાવો.",
    "One more Add adds the ones.": "એક વાર વધુ ઉમેરો દબાવો, એકમ ઉમેરાશે.",
    "After the hundredths, add the tenths column the same way.": "શતાંશ પછી, એ જ રીતે દશાંશ સ્તંભ ઉમેરો.",
    "Ten tenths make one whole, which moves over the point into the ones.": "દસ દશાંશથી એક પૂરો એકમ બને, જે બિંદુ પાર કરીને એકમમાં જાય.",
    "Same sum": "સરવાળો એ જ",
    "That sum is right.": "આ સરવાળો સાચો છે.",
    "Check each column from the right again.": "જમણેથી દરેક સ્તંભ ફરી ચકાસો.",
    "That is the same number; write the sum with no extra zeros.": "આ એ જ સંખ્યા છે, સરવાળો વધારાના શૂન્ય વગર લખો.",
    "Ten of one place is carried as one of the next, across the point too.": "એક સ્થાનના દસ આગળના સ્થાનનો એક બનીને જાય, બિંદુની પાર પણ.",
    "You learned: carry ten of a place as one of the next, across the point.": "તમે શીખ્યા: એક સ્થાનના દસ આગળનો એક બને, બિંદુની પાર પણ.",
    "Add 2.87 and 3.46, carrying where a column makes ten or more.": "2.87 અને 3.46 ઉમેરો, જ્યાં સ્તંભ દસ કે વધુ થાય ત્યાં વદી લઈ જાઓ.",
    "Add the hundredths first: is their total ten or more?": "પહેલાં શતાંશ ઉમેરો, શું કુલ દસ કે વધુ છે?",
    "Now find 1.58 + 2.34.": "હવે 1.58 + 2.34 શોધો.",
    "Which column do you add first?": "તમે પહેલાં કયો સ્તંભ ઉમેરશો?",
    "Add the hundredths, and send any ten up to the tenths.": "શતાંશ ઉમેરો, અને દસ થાય તો તેને દશાંશમાં મોકલો.",
    "Now add the tenths, counting anything sent up from the hundredths.": "હવે શતાંશમાંથી ઉપર મોકલેલું પણ ગણીને દશાંશ ઉમેરો.",
    "What is 7.69 + 4.57?": "7.69 + 4.57 કેટલા થાય?",
    "Which columns make ten or more, and where do their tens go?": "કયા સ્તંભ દસ કે વધુ થાય છે, અને તેમના દસ ક્યાં જાય?",
    "2.87 + 3.46 = ?": "2.87 + 3.46 = ?", "1.58 + 2.34 = ?": "1.58 + 2.34 = ?", "7.69 + 4.57 = ?": "7.69 + 4.57 = ?",
    /* phase 3 */
    "A whole number has its point after its ones digit, so tap Point.": "પૂર્ણ સંખ્યાનું બિંદુ એકમના અંક પછી હોય, તેથી બિંદુ દબાવો.",
    "Tap the Point key under the frame.": "ફ્રેમની નીચે બિંદુ બટન દબાવો.",
    "Now tap 6, and its point goes on the line with the others.": "હવે 6 ટેપ કરો, તેનું બિંદુ બીજાની સાથે રેખા પર જશે.",
    "Tap the 6 card in the tray.": "ટ્રેમાં 6 વાળું કાર્ડ ટેપ કરો.",
    "Tap Add to add all three cards.": "ત્રણેય કાર્ડ ઉમેરવા ઉમેરો દબાવો.",
    "Add is the key under the frame.": "ઉમેરો ફ્રેમ નીચેનું બટન છે.",
    "Tap Point first, then line every card up by its point.": "પહેલાં બિંદુ દબાવો, પછી દરેક કાર્ડ તેના બિંદુથી ગોઠવો.",
    "Add the whole number and one decimal first, then add the last one.": "પહેલાં પૂર્ણ સંખ્યા અને એક દશાંશ સંખ્યા ઉમેરો, પછી છેલ્લી ઉમેરો.",
    "With its point in place, a whole number lines up like any decimal.": "બિંદુ મૂકતાં પૂર્ણ સંખ્યા પણ દશાંશ સંખ્યાની જેમ ગોઠવાય.",
    "You learned: a whole number's point comes after its ones digit.": "તમે શીખ્યા: પૂર્ણ સંખ્યાનું બિંદુ એકમના અંક પછી આવે.",
    "Add 9, 1.75 and 0.4.": "9, 1.75 અને 0.4 ઉમેરો.",
    "The 9 is nine ones, so its point comes straight after the 9.": "9 એટલે નવ એકમ, તેથી તેનું બિંદુ 9 પછી તરત આવે.",
    "Now add the whole number 6 and 2.35.": "હવે પૂર્ણ સંખ્યા 6 અને 2.35 ઉમેરો.",
    "6 belongs under the ones, not under the hundredths of 2.35.": "6 એકમની નીચે આવે, 2.35 ના શતાંશની નીચે નહીં.",
    "Tap Point so the 6 shows its point after the ones digit.": "બિંદુ દબાવો, જેથી 6 નું બિંદુ એકમના અંક પછી દેખાય.",
    "With both points on the line, add hundredths, tenths, then ones.": "બંને બિંદુ રેખા પર હોય, તો શતાંશ, દશાંશ, પછી એકમ ઉમેરો.",
    "What total length in metres do ribbons of 4 m, 1.85 m and 0.6 m make?": "4 મી, 1.85 મી અને 0.6 મી ની રિબન કુલ કેટલા મીટર લાંબી થાય?",
    "4 m is 4 whole metres, so which column holds that 4?": "4 મી એટલે 4 પૂરા મીટર, તો એ 4 કયા સ્તંભમાં જશે?",
    "9 + 1.75 + 0.4 = ?": "9 + 1.75 + 0.4 = ?", "6 + 2.35 = ?": "6 + 2.35 = ?", "Total length in m?": "કુલ લંબાઈ મીટરમાં?",
    /* phase 4 */
    "1.35 + 4.2 makes 5.55, so tap Swap to change the order.": "1.35 + 4.2 = 5.55 છે, હવે ક્રમ બદલવા અદલબદલ દબાવો.",
    "Tap the Swap key.": "અદલબદલ બટન દબાવો.",
    "Now tap Add to add them in the new order.": "હવે નવા ક્રમમાં ઉમેરવા ઉમેરો દબાવો.",
    "Tap Add to add again.": "ફરી ઉમેરવા ઉમેરો દબાવો.",
    "Next tap the 0 card, and the hand adds it as a third row.": "હવે 0 વાળું કાર્ડ ટેપ કરો, હાથ તેને ત્રીજી હરોળમાં મૂકશે.",
    "Tap the 0 card in the tray.": "ટ્રેમાં 0 વાળું કાર્ડ ટેપ કરો.",
    "Tap Add to see what adding 0 does to the sum.": "0 ઉમેરવાથી સરવાળા પર શું અસર થાય તે જોવા ઉમેરો દબાવો.",
    "Add is next to Swap under the frame.": "ઉમેરો બટન ફ્રેમ નીચે અદલબદલની બાજુમાં છે.",
    "Check every column of the frame once more.": "ફ્રેમનો દરેક સ્તંભ ફરી એક વાર જુઓ.",
    "Add the columns from the right, one by one.": "જમણેથી એક પછી એક સ્તંભ ઉમેરો.",
    "So a sum can be checked by adding it in the other order.": "તેથી બીજા ક્રમમાં ઉમેરીને સરવાળો ચકાસી શકાય.",
    "You learned: the order of addends and adding 0 leave the sum the same.": "તમે શીખ્યા: સંખ્યાઓનો ક્રમ કે 0 ઉમેરવાથી સરવાળો બદલાતો નથી.",
    "Will 5.3 + 2.06 give the same sum as 2.06 + 5.3?": "શું 5.3 + 2.06 નો સરવાળો 2.06 + 5.3 જેટલો જ થશે?",
    "Same sum?": "સરવાળો એ જ?",
    "Look at the digits in each column of the two cards.": "બંને કાર્ડના દરેક સ્તંભના અંક જુઓ.",
    "Add the tenths in each order: what do you get?": "બંને ક્રમમાં દશાંશ ઉમેરો, શું મળે છે?",
    "Now try the hundredths both ways.": "હવે શતાંશ પણ બંને રીતે ઉમેરી જુઓ.",
    "What is 0 + 8.41?": "0 + 8.41 કેટલા થાય?",
    "0 + 8.41 = ?": "0 + 8.41 = ?",
    "Line up the 0 card by its point, then add each column.": "0 વાળું કાર્ડ તેના બિંદુથી ગોઠવો, પછી દરેક સ્તંભ ઉમેરો.",
    "The 0 card has 0 in the ones and nothing after its point.": "0 વાળા કાર્ડમાં એકમમાં 0 છે અને બિંદુ પછી કંઈ નથી.",
    "Add each column from the right, the 0 card included.": "0 વાળું કાર્ડ પણ ગણીને જમણેથી દરેક સ્તંભ ઉમેરો.",
    "If the cards swap to 2.18 + 4.7, is the sum still the same?": "જો કાર્ડ બદલાઈને 2.18 + 4.7 થાય, તો શું સરવાળો એ જ રહેશે?",
    "Look down each column before you choose.": "પસંદ કરતાં પહેલાં દરેક સ્તંભ ઉપરથી નીચે જુઓ.",
    "Work out the ones both ways: what do you get?": "બંને રીતે એકમ ઉમેરો, શું મળે છે?",
    "Then check the tenths in the new order too.": "પછી નવા ક્રમમાં દશાંશ પણ ચકાસો.",
    "Yes": "હા", "No": "ના",
    /* the win lines (api.say, one per question) */
    "The 6 went to the tenths: 5.23 + 1.6 = 6.83.": "6 દશાંશમાં ગયો, 5.23 + 1.6 = 6.83 થાય.",
    "3.5 lined up by its point: 4.12 + 3.5 = 7.62.": "3.5 તેના બિંદુથી ગોઠવાયું, 4.12 + 3.5 = 7.62 થાય.",
    "The point straight below: 0.63 + 0.21 = 0.84.": "બિંદુ બરાબર નીચે છે, 0.63 + 0.21 = 0.84 થાય.",
    "Two carries, one across the point: 6.33.": "બે વદી, એક બિંદુની પાર, સરવાળો 6.33 છે.",
    "One carry, from the hundredths: 3.92.": "શતાંશમાંથી એક વદી, સરવાળો 3.92 છે.",
    "A carry crossed the point: 12.26.": "એક વદી બિંદુની પાર ગઈ, સરવાળો 12.26 છે.",
    "With its point after the 9, the sum is 11.15.": "9 પછી બિંદુ મૂકીને સરવાળો 11.15 છે.",
    "6 and 2.35, lined up by their points, make 8.35.": "બિંદુથી ગોઠવેલા 6 અને 2.35 મળીને 8.35 થાય.",
    "4 m, 1.85 m and 0.6 m make 6.45 m.": "4 મી, 1.85 મી અને 0.6 મી મળીને 6.45 મી થાય.",
    "Yes, swapped round, they still make 7.36.": "હા, જગ્યા બદલીને પણ સરવાળો 7.36 છે.",
    "0 + 8.41 is still 8.41.": "0 + 8.41 હજુ પણ 8.41 છે.",
    "Yes, 2.18 + 4.7 also makes 6.88.": "હા, 2.18 + 4.7 પણ 6.88 થાય.",
    /* the words the working area draws, and the aria labels */
    "Tens": "દશક", "Ones": "એકમ", "Tenths": "દશાંશ", "Hundredths": "શતાંશ", "Carry": "વદી", "Given": "આપેલ", "Sum": "સરવાળો",
    "Added": "ઉમેરેલ", "zero": "શૂન્ય", "point": "બિંદુ", "Add": "ઉમેરો", "Point": "બિંદુ", "Swap": "અદલબદલ",
    "Card": "કાર્ડ", "Zero card": "શૂન્ય કાર્ડ", "Take back": "પાછું લો",
  },
};
/* an equation never breaks across bubble lines in Hindi or Gujarati: its terms are written close, "5.23+1.6=6.83", one
   word for the bubble's line breaker (a no-break space does not hold: the bubble folds every space-like character
   into a plain space before it breaks the line). The English keys are untouched */
const caKeep = (s: string) => s.replace(/(\S) ([+=]) (?=\S)/g, "$1$2");
["hi", "gu"].forEach((L) => Object.keys(TR[L]).forEach((k) => { TR[L][k] = caKeep(TR[L][k]); }));

/* One entry per phase = one mount. steps: GUIDE STEPS, one click on one control each (the step's `on` is that
   control's data-control); ladder: rungs 2 and 3 (rung 1 is each item's miss); items: three a phase, each with the
   plan's qid. An item: cards = the addends (tray: wait under the frame; frame: already lined up by their points),
   zero = an Add zero card waits in the tray, swap = the correction swaps the cards at its end, near = the
   misconception's sum, selfShown = the number IS the question (adding 0), so the question may print it. */
const PHASES = [
  {
    n: 1,
    concept: "Line up the points",
    conceptId: "M3.S5.T10.C45", objectiveIds: ["O17"],
    says: ["Points in one line. Then add as whole numbers."],
    steps: [
      { say: "Tap 3.46, and the hand puts its point on the point line.", on: "card-1", hint: "Tap the first card in the tray." },
      { say: "Now tap 2.3, so its point sits on that same line.", on: "card-2", hint: "Tap 2.3, the card still waiting below." },
      { say: "Tap Add, and the pencil adds each column from the right.", on: "add", hint: "The Add key is under the frame." },
    ],
    /* tries, as the plan writes it: First rung: line up one card. Second rung: line up the other. Third rung: the same task with two cards of the same length, before different lengths return. */
    ladder: ["Every point sits on the one line, so each place keeps its own column.", "Add the hundredths, then the tenths, then the ones, from the right."],
    closing: "With the points lined up, decimals add just like whole numbers.",
    learned: "You learned: line up the points, then add as whole numbers.",
    traceback: "The cards line up by their points, zeros make like decimals, each column is added from the right and the point drops straight below, ending on the whole sum.",
    items: [
      /* learn CA1: answer in the plan = 6.83; near: lining up the last digits (5.23 + 0.16) */
      { qid: "M3.S5.T10.C45:CA1", kind: "add", cards: ["5.23", "1.6"], start: "tray", near: "5.39",
        say: "Line up the points, then add 5.23 and 1.6.", ask: "5.23 + 1.6 = ?", answer: "6.83", miss: "The 6 in 1.6 is six tenths, so it belongs under the 2 of 5.23." },
      /* practice 1: answer in the plan = 7.62; near: 4.12 + 0.35 */
      { qid: "M3.S5.T10.C45:1", kind: "add", cards: ["4.12", "3.5"], start: "tray", near: "4.47",
        say: "Now add 4.12 and 3.5 the same way.", ask: "4.12 + 3.5 = ?", answer: "7.62", miss: "Put the point of 3.5 on the line, and its 5 goes under the tenths." },
      /* practice 2: answer in the plan = 0.84 (like decimals: the slip here is a sum with no point) */
      { qid: "M3.S5.T10.C45:2", kind: "add", cards: ["0.63", "0.21"], start: "tray", near: "84",
        say: "What is 0.63 + 0.21?", ask: "0.63 + 0.21 = ?", answer: "0.84", miss: "Where does the point of the sum go?" },
    ],
  },
  {
    n: 2,
    concept: "Carrying across the point",
    conceptId: "M3.S5.T10.C46", objectiveIds: ["O17"],
    says: ["Fifteen hundredths. Keep the five and carry one tenth."],
    steps: [
      { say: "Tap Add to add the hundredths, 8 and 7.", on: "add", hint: "The Add key is at the bottom of the board." },
      { say: "15 hundredths: keep the 5, carry 1 tenth, and tap Add for the tenths.", on: "add", hint: "Tap Add again for the tenths." },
      { say: "12 tenths: keep the 2, the 1 hops over the point, so tap Add for the ones.", on: "add", hint: "One more Add adds the ones." },
    ],
    stepHold: 2200,
    /* tries, as the plan writes it: First rung: add the hundredths only. Second rung: add the tenths with the carry. Third rung: the same task where only one column carries. */
    ladder: ["After the hundredths, add the tenths column the same way.", "Ten tenths make one whole, which moves over the point into the ones."],
    closing: "Ten of one place is carried as one of the next, across the point too.",
    learned: "You learned: carry ten of a place as one of the next, across the point.",
    traceback: "Each column lights from the right and shows its total; the ten rolls on as a carry, across the point too, and the whole sum is written below.",
    items: [
      /* learn CA2: answer in the plan = 6.33. The cards start lined up (phase 1 taught that); near: the tenths' carry forgotten */
      { qid: "M3.S5.T10.C46:CA2", kind: "carry", cards: ["2.87", "3.46"], start: "frame", near: "6.23",
        say: "Add 2.87 and 3.46, carrying where a column makes ten or more.", ask: "2.87 + 3.46 = ?", answer: "6.33", miss: "Add the hundredths first: is their total ten or more?" },
      /* practice 3: answer in the plan = 3.92. Hundredths: 8 + 4 = 12, so write 2 and carry 1 tenth */
      { qid: "M3.S5.T10.C46:3", kind: "carry", cards: ["1.58", "2.34"], start: "frame", near: "3.82",
        say: "Now find 1.58 + 2.34.", ask: "1.58 + 2.34 = ?", answer: "3.92", miss: "Which column do you add first?",
        ladder: ["Add the hundredths, and send any ten up to the tenths.", "Now add the tenths, counting anything sent up from the hundredths."] },
      /* practice 5: answer in the plan = 12.26 */
      { qid: "M3.S5.T10.C46:5", kind: "carry", cards: ["7.69", "4.57"], start: "frame", near: "12.16",
        say: "What is 7.69 + 4.57?", ask: "7.69 + 4.57 = ?", answer: "12.26", miss: "Which columns make ten or more, and where do their tens go?" },
    ],
  },
  {
    n: 3,
    concept: "Adding whole numbers and decimals",
    conceptId: "M3.S5.T10.C47", objectiveIds: ["O17"],
    says: ["Where is the point in a whole number?"],
    steps: [
      { say: "A whole number has its point after its ones digit, so tap Point.", on: "point", hint: "Tap the Point key under the frame." },
      { say: "Now tap 6, and its point goes on the line with the others.", on: "card-1", hint: "Tap the 6 card in the tray." },
      { say: "Tap Add to add all three cards.", on: "add", hint: "Add is the key under the frame." },
    ],
    /* tries, as the plan writes it: First rung: find the ones digit of the whole number. Second rung: tap Point first. Third rung: the same task with one decimal, before two return. */
    ladder: ["Tap Point first, then line every card up by its point.", "Add the whole number and one decimal first, then add the last one."],
    closing: "With its point in place, a whole number lines up like any decimal.",
    learned: "You learned: a whole number's point comes after its ones digit.",
    traceback: "The whole number takes its point after the ones digit, every card lines up by its point, zeros make like decimals, and the columns add to the whole sum.",
    items: [
      /* learn CA3: answer in the plan = 11.15; near: the 9 lined up under the last digit (0.09 + 1.75 + 0.4) */
      { qid: "M3.S5.T10.C47:CA3", kind: "whole", cards: ["9", "1.75", "0.4"], start: "tray", near: "2.24",
        say: "Add 9, 1.75 and 0.4.", ask: "9 + 1.75 + 0.4 = ?", answer: "11.15", miss: "The 9 is nine ones, so its point comes straight after the 9." },
      /* practice 4: answer in the plan = 8.35. Write 6 as 6.00 first, with its point after the 6; near: 0.06 + 2.35 */
      { qid: "M3.S5.T10.C47:4", kind: "whole", cards: ["6", "2.35"], start: "tray", near: "2.41",
        say: "Now add the whole number 6 and 2.35.", ask: "6 + 2.35 = ?", answer: "8.35", miss: "6 belongs under the ones, not under the hundredths of 2.35.",
        ladder: ["Tap Point so the 6 shows its point after the ones digit.", "With both points on the line, add hundredths, tenths, then ones."] },
      /* practice 7: answer in the plan = 6.45 m, because 4.00 + 1.85 + 0.60 = 6.45; near: 0.04 + 1.85 + 0.6 */
      { qid: "M3.S5.T10.C47:7", kind: "whole", cards: ["4", "1.85", "0.6"], start: "tray", near: "2.49",
        say: "What total length in metres do ribbons of 4 m, 1.85 m and 0.6 m make?", ask: "Total length in m?", answer: "6.45", miss: "4 m is 4 whole metres, so which column holds that 4?" },
    ],
  },
  {
    n: 4,
    concept: "Order and zero in adding",
    conceptId: "M3.S5.T10.C48", objectiveIds: ["O18"],
    says: ["Swap them round. Did the sum change?"],
    steps: [
      { say: "1.35 + 4.2 makes 5.55, so tap Swap to change the order.", on: "swap", hint: "Tap the Swap key." },
      { say: "Now tap Add to add them in the new order.", on: "add", hint: "Tap Add to add again." },
      { say: "Next tap the 0 card, and the hand adds it as a third row.", on: "zero", hint: "Tap the 0 card in the tray." },
      { say: "Tap Add to see what adding 0 does to the sum.", on: "add", hint: "Add is next to Swap under the frame." },
    ],
    /* tries, as the plan writes it: First rung: add in the first order. Second rung: tap Swap and add again. Third rung: the same task with no carrying, before carries return.
       (every item has its own rungs: the prediction items have no Swap key, the zero item no second order) */
    ladder: ["Check every column of the frame once more.", "Add the columns from the right, one by one."],
    closing: "So a sum can be checked by adding it in the other order.",
    learned: "You learned: the order of addends and adding 0 leave the sum the same.",
    traceback: "A prediction: the hand swaps the cards and the pencil adds them again, writing the same sum. Adding 0: the 0 card lines up by its point and the columns add to the whole sum.",
    items: [
      /* learn CA4: answer in the plan = Yes. Both are 7.36. A PREDICTION (the owner's decision): the first order is
         already added (sum = 7.36 in the sum row), the child predicts the other order with Yes / No; after the answer
         (the win, or the correction) the hand swaps the cards and the pencil adds them again: the same sum */
      { qid: "M3.S5.T10.C48:CA4", kind: "predict", cards: ["2.06", "5.3"], start: "frame", sum: "7.36", near: "No",
        choices: [{ id: "Yes", label: "Yes" }, { id: "No", label: "No" }],
        say: "Will 5.3 + 2.06 give the same sum as 2.06 + 5.3?", ask: "Same sum?", answer: "Yes",
        miss: "Look at the digits in each column of the two cards.",
        ladder: ["Add the tenths in each order: what do you get?", "Now try the hundredths both ways."] },
      /* practice 6: answer in the plan = 8.41. Adding 0 changes nothing. The number IS the question here (adding 0),
         so answerForms lets the question print it; the 0 card carries its point, as any whole number does;
         near: a zero digit written on the end */
      { qid: "M3.S5.T10.C48:6", kind: "zero", cards: ["8.41"], start: "frame", zero: true, selfShown: true, near: "8.401",
        say: "What is 0 + 8.41?", ask: "0 + 8.41 = ?", answer: "8.41", miss: "Line up the 0 card by its point, then add each column.",
        ladder: ["The 0 card has 0 in the ones and nothing after its point.", "Add each column from the right, the 0 card included."] },
      /* practice 8: answer in the plan = Yes. Changing the order does not change the sum, which is 6.88. A PREDICTION as CA4 */
      { qid: "M3.S5.T10.C48:8", kind: "predict", cards: ["4.7", "2.18"], start: "frame", sum: "6.88", near: "No",
        choices: [{ id: "Yes", label: "Yes" }, { id: "No", label: "No" }],
        say: "If the cards swap to 2.18 + 4.7, is the sum still the same?", ask: "Same sum?", answer: "Yes",
        miss: "Look down each column before you choose.",
        ladder: ["Work out the ones both ways: what do you get?", "Then check the tenths in the new order too."] },
    ],
  },
];

/* A sum numerically equal to the answer but written with extra zeros ("6.830", "06.83") is still a miss (the written
   form is judged exactly) and gets its own hint, whatever rung the child is on: judge marks it (CA_SAME) and each sum
   question's hint lines read the mark. With the mark off (every static check) they are the lines written above. */
let CA_SAME = false;
const CA_SAME_LINE = "That is the same number; write the sum with no extra zeros.";
PHASES.forEach((p: any) => {
  const pl = p.ladder;
  Object.defineProperty(p, "ladder", { get: () => (CA_SAME ? [CA_SAME_LINE, CA_SAME_LINE] : pl), enumerable: true, configurable: true });
  p.items.forEach((it: any) => {
    if (it.choices) return;
    const m = it.miss, l = it.ladder;
    Object.defineProperty(it, "miss", { get: () => (CA_SAME ? CA_SAME_LINE : m), enumerable: true, configurable: true });
    if (l) Object.defineProperty(it, "ladder", { get: () => (CA_SAME ? [CA_SAME_LINE, CA_SAME_LINE] : l), enumerable: true, configurable: true });
  });
});

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  /* the frame's columns, left to right; the point line runs between Ones and Tenths. Every question stays
     within hundredths, so the brief's Thousandths column is left out */
  columns: ["Tens", "Ones", "Tenths", "Hundredths"],
  rows: 3,
  /* the guide steps' screens: the book's own examples (3.46 + 2.3; 4.68 + 1.57 carrying; 6 + 0.35 + 2.4; 1.35 + 4.2 = 5.55) */
  demo: {
    "1": { tray: ["3.46", "2.3"], frame: [], perColumn: false },
    "2": { tray: [], frame: ["4.68", "1.57"], perColumn: true },
    "3": { tray: ["6"], frame: ["0.35", "2.4"], perColumn: false },
    "4": { tray: [], frame: ["1.35", "4.2"], sum: "5.55", zero: true, perColumn: false },
  },
  /* Free play's tray */
  free: ["3.46", "6", "12.5"],
};

/* ── the column frame, in working-area units (keyOnly: the area is 64,108; everything stays inside the 900
   the open keypad leaves, at ONE place whether the keypad is open or shut, so nothing moves while the child types) ── */
const CA = {
  FX: 136, COLW: [160, 184, 184, 212],        /* frame left (after the row labels); the columns Tens, Ones, Tenths, Hundredths (each wide enough for its head) */
  PL: 480, RIGHT: 876,                        /* the point line (Ones | Tenths), the frame's right edge */
  HEADY: 34, TOP: 46, CARRYY: 74,             /* the column heads' baseline, the frame's top, the carries' centre */
  ROWS: [108, 184, 260], RH: 72,              /* the card rows */
  RULE: 342, SUMY: 350, SUMH: 64, BASE: 400,  /* the ruled line, the sum row and its baseline */
  LINE_END: 410,                              /* the column and point lines end here, well clear of the tray and the keys */
  CARDY: 432, CARDH: 80, KW: 196, GAP: 16,    /* the tray and the keys along the bottom (the tray's edge ends by 518) */
};
const CA_COL = { given: CONTENT.hundred, sum: CONTENT.one, carry: CONTENT.pointer, zero: CONTENT.bead, now: CONTENT.ten, hold: "#767676" };
const CA_INK = { given: shade(CONTENT.hundred, 0.25), sum: shade(CONTENT.one, 0.3), carry: shade(CONTENT.pointer, 0.3),
  zero: shade(CONTENT.bead, 0.35), now: shade(CONTENT.ten, 0.45), hold: "#767676", line: CONTENT.line };
const CA_KEY: any = { add: "Add", point: "Point", swap: "Swap" };
/* the left edge of column c (c = 4: the frame's right edge), its width and its centre */
const caL = (c: number) => CA.FX + CA.COLW.slice(0, Math.max(0, Math.min(4, c))).reduce((a: number, b: number) => a + b, 0);
const caW = (c: number) => CA.COLW[c] || CA.COLW[3];
const caX = (c: number) => caL(c) + caW(c) / 2;
/* the centre of a card whose first digit stands in column col and which has nd digits */
const caMid = (col: number, nd: number) => (caL(col) + caL(col + nd)) / 2;

/* a card's digits after the point ("1.6" -> "6"); a whole number has none */
const caFrac = (t: string) => (String(t).split(".")[1] || "");
/* the digits a card puts in each column once its point is on the line (0 Tens, 1 Ones, 2 Tenths, 3 Hundredths) */
const caCells = (card: any) => {
  const [a, b = ""] = String(card.text).split(".");
  const out: any[] = [];
  for (let k = 0; k < a.length; k++) out.push({ col: 2 - a.length + k, ch: a[k], kind: a[k] === "0" ? "hold" : "given" });
  for (let j = 0; j < b.length; j++) out.push({ col: 2 + j, ch: b[j], kind: b[j] === "0" ? "hold" : "given" });
  for (let z = 0; z < (card.zeros || 0); z++) out.push({ col: 2 + b.length + z, ch: "0", kind: "zero" });
  return out;
};
/* the column a card's first digit takes when its point sits on the line */
const caAligned = (card: any) => 2 - String(card.text).split(".")[0].length;
/* the column method on the lined-up cards: from the right, ten of a place carried into the next */
const caColumnWork = (rows: any[]) => {
  const per = rows.map((r) => { const m: any = {}; caCells(r).forEach((c: any) => { m[c.col] = +c.ch; }); return m; });
  const used = per.flatMap((m: any) => Object.keys(m).map(Number));
  if (!used.length) return [];
  const right = Math.max(...used), left = Math.min(...used);
  const steps: any[] = [];
  let carry = 0;
  for (let c = right; c >= 0; c--) {
    if (c < left && !carry) break;
    const total = per.reduce((a: number, m: any) => a + (m[c] || 0), 0) + carry;
    steps.push({ col: c, carryIn: carry, total, keep: total % 10, carryOut: c > 0 ? Math.floor(total / 10) : 0 });
    carry = c > 0 ? Math.floor(total / 10) : 0;
  }
  return steps;
};
/* the sum row read as a number: digits left to right, the point before the tenths */
const caBuilt = (sum: any) => Object.keys(sum).map(Number).sort((a, b) => a - b).map((c) => (c === 2 ? "." : "") + sum[c]).join("");
const caWalk0 = () => ({ sum: {} as any, carry: {} as any, open: null as any, typing: "", point: false, done: false });
/* the right sum of the cards in the frame, written as the sum row reads it (Free play's own check) */
const caFreeSum = (s: any) => { const m: any = {}; caColumnWork(s.rows.map((r: any) => s.cards[r.id])).forEach((x: any) => { m[x.col] = String(x.keep); }); return caBuilt(m); };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: the sum in its written form, exactly (a decimal answer is a string, PATTERNS §4) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  const s = String(v).trim(), a = String(item.answer).trim();
  CA_SAME = !item.choices && s !== a && /^[0-9.]+$/.test(s) && s.length > a.length && parseFloat(s) === parseFloat(a);
  return s.toLowerCase() === a.toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: the addends
   as whole thousandths (parseFloat), summed, written back with as many places as the longest addend */
const caOracleSum = (xs: string[]) => {
  const places = Math.max(...xs.map((x) => (x.indexOf(".") < 0 ? 0 : x.length - x.indexOf(".") - 1)));
  let th = 0;
  for (let k = xs.length - 1; k >= 0; k--) th += Math.round(parseFloat(xs[k]) * 1000);
  return (th / 1000).toFixed(places);
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const xs: string[] = [...it.cards, ...(it.zero ? ["0"] : [])];
  /* a prediction: both orders, summed separately, must agree ("Yes") and give the sum already written */
  if (it.choices) return (caOracleSum(xs) === caOracleSum([...xs].reverse()) ? "Yes" : "No") === it.answer && caOracleSum(xs) === it.sum && it.near !== it.answer;
  return caOracleSum(xs) === it.answer && it.near !== it.answer;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (adding 0: the number IS the question) */
const answerForms = (item: any) => (item.selfShown || item.choices ? [] : [String(item.answer), speakable(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): toolApi.answer strips the point, so a decimal is typed into the slot whole (PATTERNS §4) */
const answer = (item: any, v: any) => (HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: nothing waits on the working area, so Enter answers (and performs a guide step) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* the correction, frame by frame: the cards lined up by their points, zeros to make like decimals, then each
   column from the right (its total, the digit that stays, the ten carried on), the point dropped straight
   below after the tenths; an order question then swaps the cards and the sum stays put */
const caFrames = (item: any, swap: boolean) => {
  const xs: string[] = [...(item.cards || []), ...(item.zero ? ["0"] : [])];
  const places = Math.max(...xs.map((x) => caFrac(x).length));
  const base = xs.map((t, k) => ({ id: "d" + k, text: t, pt: t.includes(".") ? "given" : "added", zeros: 0, zero: !!item.zero && k === xs.length - 1 }));
  const like = base.map((r) => ({ ...r, zeros: places - caFrac(r.text).length }));
  const frames: any[] = [];
  let carry: any = {}, sum: any = {}, point = false;
  frames.push({ rows: base, carry, sum, point, lit: null, total: null });
  frames.push({ rows: like, carry, sum, point, lit: null, total: null });
  caColumnWork(like).forEach((s: any) => {
    frames.push({ rows: like, carry, sum, point, lit: s.col, total: { col: s.col, text: String(s.total) } });
    sum = { ...sum, [s.col]: String(s.keep) };
    if (s.carryOut) carry = { ...carry, [s.col - 1]: s.carryOut };
    if (s.col === 2) point = true;
    frames.push({ rows: like, carry, sum, point, lit: s.col, total: null });
  });
  if (swap) frames.push({ rows: [...like].reverse(), carry, sum, point, lit: null, total: null, swapped: true });
  frames.push({ ...frames[frames.length - 1], lit: null, total: null });
  return frames;
};
/* a card in the tray: its characters, coloured by what they are */
const caChars = (card: any) => {
  const [a, b = ""] = String(card.text).split(".");
  const out: any[] = [];
  for (const ch of a) out.push({ ch, kind: ch === "0" && !card.zero ? "hold" : "given" });
  if (card.pt) out.push({ ch: ".", kind: card.pt === "added" ? "zero" : "point" });
  for (const ch of b) out.push({ ch, kind: ch === "0" ? "hold" : "given" });
  return out;
};
const caCompactW = (chars: any[]) => Math.max(110, Math.round(44 + chars.reduce((a: number, c: any) => a + (c.ch === "." ? 18 : 35), 0)));
const caInkOf = (kind: string) => (kind === "hold" ? CA_INK.hold : kind === "zero" ? CA_INK.zero : kind === "point" ? CA_INK.line : CA_INK.given);
/* where each tray card stands: left to right along the bottom */
const caTray = (s: any) => {
  const pos: any = {};
  let x = 14;
  s.tray.forEach((id: string) => { const w = caCompactW(caChars(s.cards[id])); pos[id] = { x, w }; x += w + CA.GAP; });
  return { pos, right: s.tray.length ? x - CA.GAP : 0 };
};
/* the screen a question, the guide steps or Free play opens on (card ids: the tray's first, then the frame's) */
const caScreen = (n: number, item: any, screen: string) => {
  let tray: string[] = [], frame: string[] = [], zero = false, sum = "";
  if (/free$/.test(screen)) tray = MODEL.free;
  else if (/demo$/.test(screen)) { const d: any = (MODEL.demo as any)[String(n)] || {}; tray = d.tray || []; frame = d.frame || []; sum = d.sum || ""; zero = !!d.zero; }
  else if (item) { if (item.start === "frame") frame = item.cards || []; else tray = item.cards || []; zero = !!item.zero; sum = item.sum || ""; }
  const cards: any = {};
  const mk = (t: string) => { const id = "card-" + (Object.keys(cards).length + 1); cards[id] = { id, text: t, pt: t.includes(".") ? "given" : null }; return id; };
  const trayIds = tray.map(mk), frameIds = frame.map(mk);
  /* the 0 card is a whole number: its point is written after its ones digit (violet, an added point) */
  if (zero) { cards.zero = { id: "zero", text: "0", pt: "added", zero: true }; trayIds.push("zero"); }
  const walk: any = caWalk0();
  if (sum) { caCells({ text: sum }).forEach((c: any) => { walk.sum[c.col] = c.ch; }); walk.point = true; walk.done = true; }
  return { screen, cards, tray: trayIds, rows: frameIds.map((id) => ({ id, col: caAligned(cards[id]) })), walk,
    dm: null as any, flash: null as any, wob: null as any, moving: null as any, tried: false, swapped: false };
};

/* ── the working area ────────────────────────────────────────────────────────────────────────
   The column frame: heads, the point line, three card rows, the ruled line and the sum row; the tray and the
   keys along the bottom. Every act is performed on screen (api.act): the hand carries a card into line (or
   pushes a dropped card until its point sits on the line), carries a carry to the next column and swaps the
   cards; the pencil writes a whole number's point and, in the guide steps, the sum. The child adds the sum
   column by column in the sum row itself (Add lends the pad to the open column, api.capture), or types it in
   the slot. Helpers are called, never mounted. */
function Work({ n, item, index, stage, wrong, captured, api, stepOn, lang = "en", tx = (v: any) => v }: any) {
  void lang;
  const C = api.C;
  const tl = useTimeline();
  const anim = !reducedMotion();
  const free = stage === "free";
  const demo = stage === "demo" || stage === "teach";
  const screen = n + ":" + (free ? "free" : demo ? "demo" : "q" + index);
  const [st, setSt] = useState<any>(() => caScreen(n, item, screen));
  const S = st.screen === screen ? st : caScreen(n, item, screen);
  const sr = useRef<any>(S);
  sr.current = S;
  const put = (p: any) => { const base = sr.current; const nx = { ...base, ...(typeof p === "function" ? p(base) : p) }; sr.current = nx; setSt(nx); };
  const timers = useRef<any[]>([]);
  const later = (ms: number, fn: () => void) => { timers.current.push(setTimeout(fn, reducedMotion() ? Math.min(ms, 25) : ms)); };
  const stopAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => stopAll, []);
  useEffect(() => {
    CA_SAME = false;   /* a new question: the extra-zeros hint mark belongs to the last one */
    if (st.screen === screen) return;
    stopAll(); tl.stop();
    setSt(sr.current);
  }, [screen]);
  /* what the callbacks (a drag ending, the lent pad, the act's promise) read: always this render's */
  const ctx = useRef<any>({});
  ctx.current = { demo, free, stage, stepOn, n, item };
  const playing = useRef(false);
  const lastKey = useRef(0);
  const lastCommit = useRef(0);

  /* a keyboard child keeps the focus: an act started by Enter or Space hands it back when it ends (to the control
     that started it while it is live, else to the next live key or card) */
  const kbAt = useRef(0);
  useEffect(() => {
    const kd = (e: any) => { if (e.key === "Enter" || e.key === " ") kbAt.current = Date.now(); };
    window.addEventListener("keydown", kd, true);
    return () => window.removeEventListener("keydown", kd, true);
  }, []);
  const refocus = (prefer: any) => later(80, () => {
    const live = (e: any) => e && e.getAttribute("aria-disabled") !== "true";
    /* in a guide step the focus goes to the control the NEW step waits for, never the first live piece */
    const k = ctx.current, want = k.demo && k.stepOn ? k.stepOn : prefer;
    let el: any = want ? document.querySelector('[data-zone="work"] [data-control="' + want + '"]') : null;
    if (!live(el)) el = Array.from(document.querySelectorAll('[data-zone="work"] [data-control]')).find(live);
    if (el && el.focus) el.focus({ preventScroll: true });
  });
  /* every act through the ACTION KIT (PATTERNS §15): hide the piece the tool carries, react only when it ends true */
  const viaTool = (o: any, hide: string, done: () => void) => {
    if (playing.current) return;
    playing.current = true;
    const scr = sr.current.screen;
    const byKey = Date.now() - kbAt.current < 300;
    const from = byKey && document.activeElement ? document.activeElement.getAttribute("data-control") : null;
    put({ moving: hide });
    const end = (ok: any) => {
      playing.current = false;
      if (sr.current.screen !== scr) return;
      put({ moving: null });
      if (ok !== true) return;
      done();
      if (byKey) refocus(from);
    };
    Promise.resolve(api.act(o)).then(end, () => end(false));
  };

  const pointless = (s: any) => s.tray.filter((id: string) => !s.cards[id].pt && !s.cards[id].zero);
  const allIn = (s: any) => (ctx.current.free ? s.rows.length >= 2 : s.tray.length === 0 && s.rows.length > 0);
  const rowMid = (s: any, k: number) => { const r = s.rows[k], c = s.cards[r.id]; return { x: caMid(r.col, caCells(c).length), y: CA.ROWS[k] + CA.RH / 2 }; };
  const colTotal = (s: any, c: number) => s.rows.reduce((a: number, r: any) => a + caCells(s.cards[r.id]).filter((x: any) => x.col === c).reduce((b: number, x: any) => b + +x.ch, 0), 0);
  /* the next column to add: from the right, then on to the left while a carry waits */
  const nextCol = (s: any, w: any) => {
    const used = s.rows.flatMap((r: any) => caCells(s.cards[r.id]).map((c: any) => c.col));
    if (!used.length) return null;
    const right = Math.max(...used), left = Math.min(...used);
    for (let c = right; c >= 0; c--) if (w.sum[c] === undefined) return c >= left || w.carry[c] ? c : null;
    return null;
  };
  const didStep = (on: string) => { if (ctx.current.demo) api.did(on); };

  /* a card into the frame. A tap: the hand carries it to the next row with its point on the point line. A drop in
     the frame: it lands where it was dropped and the hand pushes it until its point sits on the line; a column it
     covered by mistake lights amber. A whole number with no point will not settle. */
  const wobble = (id: string) => {
    put({ wob: { id, t: 0 }, tried: true });
    [1, 2, 3, 4].forEach((t) => later(110 * t, () => put((o: any) => (o.wob ? { wob: { ...o.wob, t } } : {}))));
    later(560, () => put({ wob: null }));
  };
  const land = (id: string, col: number) => {
    put((o: any) => ({ tray: o.tray.filter((x: string) => x !== id), rows: o.rows.some((r: any) => r.id === id) ? o.rows.map((r: any) => (r.id === id ? { ...r, col } : r)) : [...o.rows, { id, col }], walk: caWalk0() }));
    api.sfx.tick();
    didStep(id);
  };
  const placeCard = (id: string, at: any) => {
    const s0 = sr.current, card = s0.cards[id];
    if (!card || !s0.tray.includes(id) || s0.rows.length >= MODEL.rows) return;
    if (!card.pt && !card.zero) { wobble(id); return; }
    const k = s0.rows.length, al = caAligned(card), nd = caCells(card).length, y = CA.ROWS[k] + CA.RH / 2;
    put({ dm: null });
    if (!at) {
      const p = caTray(s0).pos[id];
      viaTool({ tool: "hand", moves: "carry", from: { x: p.x + p.w / 2, y: CA.CARDY + CA.CARDH / 2 }, at: [{ x: caMid(al, nd), y }],
        hold: <g>{compactNode(card, -p.w / 2, -CA.CARDH / 2, p.w)}</g> }, id, () => land(id, al));
      return;
    }
    /* the column the dropped card's first digit lands in: the place whose centre is nearest the drop */
    let entry = 0;
    for (let e = 1; e <= 4 - nd; e++) if (Math.abs(caMid(e, nd) - at.x) < Math.abs(caMid(entry, nd) - at.x)) entry = e;
    const flash = entry === al ? null : Array.from({ length: nd }, (_, j) => entry + j).filter((c) => c < al || c >= al + nd);
    put((o: any) => ({ tray: o.tray.filter((x: string) => x !== id), rows: [...o.rows, { id, col: entry }], flash, walk: caWalk0() }));
    if (entry === al) { api.sfx.tick(); didStep(id); return; }
    viaTool({ tool: "hand", moves: "push", from: { x: caMid(entry, nd), y }, at: [{ x: caMid(al, nd), y }],
      hold: <g>{rowCardNode(card, -caMid(al, nd), -CA.RH / 2)}</g> }, id, () => {
      land(id, al);
      later(900, () => put({ flash: null }));
    });
  };
  /* Point: the pencil writes the point after the ones digit of every whole number card in the tray */
  const doPoint = () => {
    const s0 = sr.current, ids = pointless(s0);
    if (!ids.length) return;
    const lay = caTray(s0);
    const setPt = (id: string) => put((o: any) => (o.cards[id].pt ? {} : { cards: { ...o.cards, [id]: { ...o.cards[id], pt: "added" } } }));
    put({ dm: null });
    viaTool({ tool: "pencil", moves: "draw",
      at: ids.map((id: string) => { const p = lay.pos[id], dw = String(s0.cards[id].text).length * 35; return { x: p.x + p.w / 2 + dw / 2 + 6, y: CA.CARDY + 56 }; }),
      onPoint: (i: number) => setPt(ids[i]) }, "act", () => {
      ids.forEach(setPt);
      api.sfx.tick();
      didStep("point");
    });
  };
  /* Swap: the hand pushes the top card down and the cards change places; the sum is added again */
  const doSwap = (then?: () => void) => {
    const s0 = sr.current;
    if (s0.rows.length < 2) return;
    let swapped = false;
    const flip = () => { if (swapped) return; swapped = true; put((o: any) => ({ rows: [...o.rows].reverse().map((r: any) => ({ ...r, col: caAligned(o.cards[r.id]) })), swapped: !o.swapped, walk: caWalk0() })); };
    put({ dm: null });
    viaTool({ tool: "hand", moves: "push", from: rowMid(s0, 0), at: [rowMid(s0, s0.rows.length - 1)], onPoint: () => flip() }, "act", () => {
      flip();
      api.sfx.settle();
      didStep("swap");
      if (then) then();
    });
  };
  /* a prediction's proof (the win, and the correction): the hand swaps the cards, then the pencil adds them again */
  const proveOrder = () => doSwap(() => autoAdd(() => put({ proved: true })));
  /* the guide steps' Add: the pencil writes the book's sum, column by column from the right (phase 2: one column a
     tap, and a column of ten or more keeps its ones digit while the hand carries the ten on, across the point too) */
  const autoAdd = (then?: () => void) => {
    const s0 = sr.current;
    const work = caColumnWork(s0.rows.map((r: any) => s0.cards[r.id]));
    const todo = work.filter((s: any) => s0.walk.sum[s.col] === undefined);
    if (!todo.length) { didStep("add"); if (then) then(); return; }
    const per = !!((MODEL.demo as any)[String(ctx.current.n)] || {}).perColumn;
    const batch = per ? [todo[0]] : todo;
    const write = (s: any, withCarry: boolean) => put((o: any) => ({ walk: { ...o.walk, sum: { ...o.walk.sum, [s.col]: String(s.keep) },
      carry: withCarry && s.carryOut ? { ...o.walk.carry, [s.col - 1]: s.carryOut } : o.walk.carry, point: o.walk.point || s.col === 2,
      done: Object.keys(o.walk.sum).length + 1 >= work.length } }));
    put({ dm: null });
    if (per && batch[0].carryOut) {
      const s = batch[0];
      write(s, false);
      viaTool({ tool: "hand", moves: "carry", from: { x: caX(s.col) - 34, y: CA.SUMY + CA.SUMH / 2 }, at: [{ x: caX(s.col - 1), y: CA.CARRYY }],
        hold: <g>{badge(0, 0, String(s.carryOut))}</g> }, "act", () => {
        write(s, true);
        api.sfx.tick();
        didStep("add");
      });
      return;
    }
    viaTool({ tool: "pencil", moves: "draw", at: batch.map((s: any) => ({ x: caX(s.col), y: CA.SUMY + CA.SUMH / 2 })), onPoint: (i: number) => write(batch[i], true) }, "act", () => {
      batch.forEach((s: any) => write(s, true));
      api.sfx.settle();
      didStep("add");
      if (then) then();
    });
  };

  /* the child's Add: the next column from the right lights and its cell in the sum row takes the pad; the child
     types what the column makes and presses Enter. A two-digit total keeps its ones digit and the hand carries the
     ten to the top of the next column (across the point from the tenths). The last column sends the sum. */
  const walkOn = (w: any) => {
    const c = nextCol(sr.current, w);
    if (c !== null) { put({ walk: { ...w, open: c, typing: "" } }); return; }
    put({ walk: { ...w, open: null, done: true } });
    api.capture(null);
    if (ctx.current.stage === "ask") { const v = caBuilt(w.sum); api.setTyped(v); api.submit(v); }
    /* Free play has no question: the finished sum is checked here (green only when right; a wrong one gets the column hint) */
    else if (ctx.current.free) {
      const s1 = sr.current, ok = caBuilt(w.sum) === caFreeSum(s1);
      if (ok) api.say("That sum is right."); else api.say("Check each column from the right again.");
    }
  };
  const commitCell = () => {
    const s0 = sr.current, w = s0.walk, c = w.open, t = w.typing;
    const total = colTotal(s0, c) + (w.carry[c] || 0);
    /* the cell keeps the last digit typed; a column whose true total is ten or more always sends its true ten on
       (nothing is judged before Enter: the sum is) */
    const keep = t.slice(-1), out = c > 0 && total >= 10 ? Math.floor(total / 10) : 0;
    const nw = { ...w, sum: { ...w.sum, [c]: keep }, open: null, typing: "", point: w.point || c === 2 };
    put({ walk: nw });
    if (out > 0) {
      viaTool({ tool: "hand", moves: "carry", from: { x: caX(c) - 34, y: CA.SUMY + CA.SUMH / 2 }, at: [{ x: caX(c - 1), y: CA.CARRYY }],
        hold: <g>{badge(0, 0, String(out))}</g> }, "act", () => {
        const w2 = { ...sr.current.walk, carry: { ...sr.current.walk.carry, [c - 1]: out } };
        put({ walk: w2 });
        api.sfx.tick();
        walkOn(w2);
      });
    } else { api.sfx.tick(); walkOn(nw); }
  };
  const cellKey = (k: string) => {
    const s0 = sr.current, w = s0.walk;
    if (w.open === null || playing.current) return;
    if (/^\d$/.test(k)) { if (w.typing.length < (w.open === 0 ? 1 : 2)) put({ walk: { ...w, typing: w.typing + k } }); }
    else if (k === "back") put({ walk: { ...w, typing: w.typing.slice(0, -1) } });
    else if (k === "clear") put({ walk: { ...w, typing: "" } });
    else if (k === "enter") {
      /* an empty cell gives the pad back, but not the second Enter of a double press (400 ms after a commit) */
      if (w.typing === "") { if (Date.now() - lastCommit.current >= 400) { put({ walk: { ...w, open: null } }); api.capture(null); } }
      else { lastCommit.current = Date.now(); commitCell(); }
    }
    /* "point": the point is already on the point line */
  };
  const startWalk = () => {
    const s0 = sr.current;
    if (!allIn(s0)) return;
    const w0 = s0.walk.done ? caWalk0() : s0.walk;
    const c = nextCol(s0, w0);
    if (c === null) return;
    put({ dm: null, walk: { ...w0, open: c, typing: "" } });
    api.capture(cellKey);
  };
  /* Free play: a card in the frame goes back to the tray when tapped */
  const takeBack = (id: string) => {
    const s0 = sr.current, k = s0.rows.findIndex((r: any) => r.id === id);
    if (k < 0) return;
    const card = s0.cards[id], w = caCompactW(caChars(card));
    viaTool({ tool: "hand", moves: "carry", from: rowMid(s0, k), at: [{ x: caTray(s0).right + CA.GAP + w / 2, y: CA.CARDY + CA.CARDH / 2 }],
      hold: <g>{compactNode(card, -w / 2, -CA.CARDH / 2, w)}</g> }, id, () => {
      put((o: any) => ({ rows: o.rows.filter((r: any) => r.id !== id), tray: [...o.tray, id], walk: caWalk0(), dm: null }));
      api.sfx.tick();
    });
  };

  /* every act the child (or Enter in a guide step) does goes through here: a wrong act in a guide step shows its hint */
  const act = (on: string, at?: any) => {
    const k = ctx.current;
    if (k.demo) { if (on !== k.stepOn) { api.did(on); return; } }
    else if (k.stage !== "ask" && !k.free) return;
    if (playing.current) return;
    if (on === "add") { if (k.demo) autoAdd(); else startWalk(); return; }
    if (on === "point") { doPoint(); return; }
    if (on === "swap") { doSwap(); return; }
    if (on.indexOf("back-") === 0) { takeBack(on.slice(5)); return; }
    placeCard(on, at);
  };
  /* the one key (PATTERNS §16c): 400 ms, so one tap never also presses the label that follows */
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    act(on);
  };
  /* a second tap on a piece within 350 ms is the same tap (a double tap never lands two cards) */
  const lastTap = useRef<any>({ on: "", t: 0 });
  const tapPiece = (on: string, at?: any) => {
    const t = Date.now();
    if (t - lastTap.current.t < 350) return;
    lastTap.current = { on, t };
    act(on, at);
  };
  /* Enter, the agent's toolApi.check() and the dev solve() perform the CURRENT guide step; 400 ms, so two Enters
     never finish two steps */
  const lastEnter = useRef(0);
  const enterStep = () => {
    const t = Date.now(), k = ctx.current;
    if (t - lastEnter.current < 400 || !k.demo || !k.stepOn) return;
    lastEnter.current = t;
    act(k.stepOn);
  };
  api.onEnter(demo && stepOn ? enterStep : null);
  HOOK.demo = () => { const k = ctx.current; if (k.demo && k.stepOn) act(k.stepOn); };

  /* who may act now (once the guide steps are done, nothing acts during the step hold) */
  /* (a shaking whole-number card stays a live control, so a keyboard child keeps the focus on it) */
  const live = (demo ? !!stepOn : stage === "ask" || free) && !tl.busy && !S.moving && S.walk.open === null;
  const liveRef = useRef(live);
  liveRef.current = live;
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!liveRef.current) return;
    const at = moved && p && isFinite(p.x) && isFinite(p.y) ? p : null;
    if (at && (at.y > CA.RULE || at.x < CA.FX - 20 || at.x > CA.RIGHT + 20)) return;   /* put back on the tray: it stays there */
    tapPiece(pay.id, at);
  });

  /* the pad taken back by the runtime (Close, a new question, Free play's start): the open cell closes */
  useEffect(() => {
    if (captured) return;
    const s0 = sr.current;
    if (s0.walk.open !== null) put({ walk: { ...s0.walk, open: null, typing: "" } });
  }, [captured]);

  /* the traceback: on a layer of its own (the child's cards and sum stay theirs underneath), it lines the cards
     up, makes like decimals, adds each column from the right with its carry and ends on the whole sum */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const s0 = sr.current;
    stopAll();
    if (s0.walk.open !== null) { put({ walk: { ...s0.walk, open: null, typing: "" } }); api.capture(null); }
    put({ flash: null, wob: null });
    api.lock(true);
    /* a prediction: the proof itself (the hand swaps the cards, the pencil adds them again: the same sum) */
    /* (once proved, the board stays on the second order: a later miss or the win never swaps it back) */
    if (item.choices) { if (!s0.swapped) proveOrder(); later(s0.swapped ? 300 : 3200, () => api.lock(false)); return; }
    const frames = caFrames(item, false);
    tl.run(frames.map((f: any, k: number) => [k === frames.length - 1 ? 60 : k === 0 ? 450 : 620, () => put({ dm: f })]), () => api.lock(false));
  }, [wrong]);

  /* a right answer: the win line (one per question, saying what the picture shows); the columns are shown worked
     (a prediction: its proof plays) */
  useEffect(() => {
    if (stage !== "win") return;
    /* one sentence (at a phase's last question the runtime shows the phase's closing in its place) */
    const q = item && item.qid;
    if (q === "M3.S5.T10.C45:CA1") api.say("The 6 went to the tenths: 5.23 + 1.6 = 6.83.");
    else if (q === "M3.S5.T10.C45:1") api.say("3.5 lined up by its point: 4.12 + 3.5 = 7.62.");
    else if (q === "M3.S5.T10.C45:2") api.say("The point straight below: 0.63 + 0.21 = 0.84.");
    else if (q === "M3.S5.T10.C46:CA2") api.say("Two carries, one across the point: 6.33.");
    else if (q === "M3.S5.T10.C46:3") api.say("One carry, from the hundredths: 3.92.");
    else if (q === "M3.S5.T10.C46:5") api.say("A carry crossed the point: 12.26.");
    else if (q === "M3.S5.T10.C47:CA3") api.say("With its point after the 9, the sum is 11.15.");
    else if (q === "M3.S5.T10.C47:4") api.say("6 and 2.35, lined up by their points, make 8.35.");
    else if (q === "M3.S5.T10.C47:7") api.say("4 m, 1.85 m and 0.6 m make 6.45 m.");
    else if (q === "M3.S5.T10.C48:CA4") api.say("Yes, swapped round, they still make 7.36.");
    else if (q === "M3.S5.T10.C48:6") api.say("0 + 8.41 is still 8.41.");
    else if (q === "M3.S5.T10.C48:8") api.say("Yes, 2.18 + 4.7 also makes 6.88.");
    const s0 = sr.current;
    if (item && item.choices) {
      /* the phase's LAST right answer: the party is about to fall over the board, so the proof is drawn settled at once */
      const last = index === ((PHASES[n - 1] as any).items.length - 1);
      if (last) {
        const rows = s0.swapped ? s0.rows : [...s0.rows].reverse().map((r: any) => ({ ...r, col: caAligned(s0.cards[r.id]) }));
        const w: any = caWalk0();
        caColumnWork(rows.map((r: any) => s0.cards[r.id])).forEach((x: any) => { w.sum[x.col] = String(x.keep); if (x.carryOut) w.carry[x.col - 1] = x.carryOut; if (x.col === 2) w.point = true; });
        w.done = true;
        put({ rows, swapped: true, walk: w, proved: true, dm: null });
        return;
      }
      if (!s0.swapped) proveOrder(); else put({ proved: true });
      return;
    }
    if (s0.walk.done && caBuilt(s0.walk.sum) === item.answer && !s0.dm) return;
    /* a sum typed straight into the slot: the worked frame takes every card, so the tray empties with it */
    const f = caFrames(item, false);
    put({ dm: f[f.length - 1], flash: null, wob: null, tray: [] });
  }, [stage]);

  /* the agent types the whole decimal into the slot (toolApi.answer would drop its point) */
  HOOK.type = (v: any) => {
    const s0 = sr.current;
    if (s0.walk.open !== null) put({ walk: { ...s0.walk, open: null, typing: "" } });
    api.capture(null);
    api.setTyped(String(v));
    return true;
  };

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ cards: S.rows.map((r: any) => S.cards[r.id].text), aligned: S.rows.length > 0 && S.rows.every((r: any) => r.col === caAligned(S.cards[r.id])),
    columns: Object.keys(S.walk.sum).length, carries: Object.keys(S.walk.carry).length, sum: S.walk.done ? caBuilt(S.walk.sum) : "", swapped: S.swapped,
    complete: stage === "idle" });

  /* ── drawing (helpers are called, never mounted) ── */
  /* a card on its row, lined up by its point, shifted by dx (a card dropped off the line, or the hand's copy) */
  function rowCardNode(card: any, dx: number, y0: number, withPoint = true) {
    const cells = caCells(card), nd = cells.length, al = caAligned(card);
    /* a whole number's point stands at the card's end: the card reaches past it, so the point never sits on its edge */
    const x0 = caL(al) + dx, x1 = caL(al + nd) + dx, px = CA.PL + dx, right = card.pt ? Math.max(x1 - 10, px + 28) : x1 - 10;
    return (
      <g>
        <rect x={x0 + 10} y={y0} width={right - x0 - 10} height={CA.RH} rx={14} fill={tint(CA_COL.given, 0.86)} stroke={CA_COL.given} strokeWidth={2.5} />
        {cells.map((c: any) => <text key={c.col} x={caX(c.col) + dx} y={y0 + 54} textAnchor="middle" fontSize={T.xl} fontWeight={700}
          fill={card.zero && c.kind === "hold" ? CA_INK.given : caInkOf(c.kind)}>{c.ch}</text>)}
        {withPoint && card.pt && pointMark(card, px, y0)}
      </g>
    );
  }
  /* a card's point: a given point in ink; an ADDED point violet, bigger and ringed, drawn over the point line */
  function pointMark(card: any, px: number, y0: number) {
    return card.pt === "added"
      ? <circle cx={px} cy={y0 + 50} r={11} fill={CA_INK.zero} stroke="#FFFFFF" strokeWidth={3} />
      : <circle cx={px} cy={y0 + 50} r={8} fill={CA_INK.line} />;
  }
  function compactNode(card: any, x: number, y: number, w: number) {
    return (
      <g>
        <rect x={x} y={y} width={w} height={CA.CARDH} rx={14} fill={tint(CA_COL.given, 0.86)} stroke={CA_COL.given} strokeWidth={2.5} />
        <text x={x + w / 2} y={y + 58} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CA_INK.given}>
          {caChars(card).map((c: any, k: number) => <tspan key={k} fill={caInkOf(c.kind)}>{c.ch}</tspan>)}
        </text>
      </g>
    );
  }
  function badge(x: number, y: number, d: string) {
    return (
      <g>
        <circle cx={x} cy={y} r={24} fill="#FFFFFF" stroke={CA_COL.carry} strokeWidth={3} />
        <text x={x} y={y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CA_INK.carry}>{d}</text>
      </g>
    );
  }

  const view = S.dm
    ? { rows: S.dm.rows.map((c: any) => ({ card: c, col: caAligned(c) })), carry: S.dm.carry, sum: S.dm.sum, point: S.dm.point, lit: S.dm.lit, total: S.dm.total, open: null, typing: "" }
    : { rows: S.rows.map((r: any) => ({ card: S.cards[r.id], col: r.col })), carry: S.walk.carry, sum: S.walk.sum, point: S.walk.point, lit: S.walk.open, total: null, open: S.walk.open, typing: S.walk.typing };
  /* which rows carry violet marks (a zero or a point written to line the card up): each gets its own label */
  /* (a whole number's row shows "Added point" in every frame, its zeros too: the point is that phase's lesson) */
  const addedOf = (card: any) => (card.pt === "added" ? "point" : (card.zeros || 0) > 0 ? "zero" : "");
  const givenRow = view.rows.length ? view.rows.findIndex((r: any) => !addedOf(r.card)) : 0;
  const lits: number[] = [...(view.lit !== null && view.lit !== undefined ? [view.lit] : []), ...(!S.dm && S.flash ? S.flash : [])];
  const tr = anim ? "transform 420ms ease-out" : undefined;
  /* the card's shift off its lined-up place (a card dropped off the line, before the hand pushes it on) */
  const offOf = (r: any) => caL(r.col) - caL(caAligned(r.card));
  /* Free play: the child's digits are ink, and the sum turns green only once it is finished and right */
  const freeRight = free && S.walk.done && caBuilt(S.walk.sum) === caFreeSum(S);
  const frameBack = () => (
    <g>
      {MODEL.columns.map((name: string, c: number) => <text key={"h" + c} x={caX(c)} y={CA.HEADY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(name)}</text>)}
      {[0, 1, 3, 4].map((k) => <line key={"v" + k} x1={caL(k)} y1={CA.TOP} x2={caL(k)} y2={CA.LINE_END} stroke={C.ink} strokeWidth={3} />)}
      <text x={CA.FX - 10} y={CA.CARRYY + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={CA_INK.carry}>{tx("Carry")}</text>
      {givenRow >= 0 && <text x={CA.FX - 10} y={CA.ROWS[givenRow] + 48} textAnchor="end" fontSize={T.label} fontWeight={700} fill={CA_INK.given}>{tx("Given")}</text>}
      <text x={CA.FX - 10} y={CA.BASE - 6} textAnchor="end" fontSize={T.label} fontWeight={700} fill={CA_INK.sum}>{tx("Sum")}</text>
      <line x1={CA.FX} y1={CA.RULE} x2={caL(4)} y2={CA.RULE} stroke={CA_INK.line} strokeWidth={4} />
    </g>
  );
  const frame = () => (
    <g>
      {/* the column being added, and a column a card covered by mistake: amber, under the digits */}
      {lits.map((c: number, k: number) => <rect key={"l" + k} x={caL(c) + 4} y={CA.TOP + 2} width={caW(c) - 8} height={CA.SUMY + CA.SUMH - CA.TOP} rx={12} fill={CA_COL.now} fillOpacity={0.16} stroke={CA_COL.now} strokeWidth={3} />)}
      {/* the cards on their rows (an added point is drawn after the point line, so the line never covers it) */}
      {view.rows.map((r: any, k: number) => (!S.dm && S.moving === r.card.id ? null :
        <g key={r.card.id} style={{ transform: `translate(${offOf(r)}px, ${CA.ROWS[k]}px)`, transition: tr } as any}>
          {rowCardNode(r.card, 0, 0, r.card.pt !== "added")}
        </g>))}
      {/* what the violet marks are, beside the row that carries them (two authored lines; the labels follow their rows) */}
      {view.rows.map((r: any, k: number) => (addedOf(r.card) ? (
        <g key={"a" + r.card.id}>
          <text x={CA.FX - 10} y={CA.ROWS[k] + 26} textAnchor="end" fontSize={T.label} fontWeight={700} fill={CA_INK.zero}>{tx("Added")}</text>
          <text x={CA.FX - 10} y={CA.ROWS[k] + 66} textAnchor="end" fontSize={T.label} fontWeight={700} fill={CA_INK.zero}>{addedOf(r.card) === "zero" ? tx("zero") : tx("point")}</text>
        </g>) : null))}
      {/* the point line, through the sum row */}
      <line x1={CA.PL} y1={CA.TOP} x2={CA.PL} y2={CA.LINE_END} stroke={CA_INK.line} strokeWidth={5} />
      {view.rows.map((r: any, k: number) => (r.card.pt === "added" && (S.dm || S.moving !== r.card.id) ? (
        <g key={"p" + r.card.id} style={{ transform: `translate(${offOf(r)}px, ${CA.ROWS[k]}px)`, transition: tr } as any}>{pointMark(r.card, CA.PL, 0)}</g>) : null))}
      {/* the carries waiting on top of their columns */}
      {Object.keys(view.carry).map((c: string) => <g key={"k" + c}>{badge(caX(+c), CA.CARRYY, String(view.carry[c]))}</g>)}
      {/* the sum row: the digits written so far, the point straight below the others */}
      {Object.keys(view.sum).map((c: string) => (+c === view.open ? null :
        <text key={"s" + c} x={caX(+c)} y={CA.BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700}
          fill={free && !S.dm ? (freeRight ? CA_INK.sum : C.ink) : view.sum[c] === "0" ? CA_INK.hold : CA_INK.sum}>{view.sum[c]}</text>))}
      {view.point && <g><circle cx={CA.PL} cy={CA.BASE - 6} r={10} fill={CA_INK.line} /><text x={CA.PL} y={CA.BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CA_INK.line}>.</text></g>}
      {view.open !== null && view.open !== undefined && (
        <g>
          <rect x={caL(view.open) + 12} y={CA.SUMY} width={caW(view.open) - 24} height={CA.SUMH} rx={12} fill="#FFFFFF" stroke={CA_COL.now} strokeWidth={4} />
          {view.typing && <text x={caX(view.open)} y={CA.BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={free ? C.ink : CA_INK.sum}>{view.typing}</text>}
          <line className="c4-caret" x1={caX(view.open) + view.typing.length * 17 + 6} y1={CA.SUMY + 12} x2={caX(view.open) + view.typing.length * 17 + 6} y2={CA.SUMY + CA.SUMH - 12} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
        </g>
      )}
      {view.total && (
        <g>
          <rect x={caL(view.total.col) + 12} y={CA.SUMY} width={caW(view.total.col) - 24} height={CA.SUMH} rx={12} fill="#FFFFFF" stroke={CA_COL.now} strokeWidth={4} />
          <text x={caX(view.total.col)} y={CA.BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CA_INK.now}>{view.total.text}</text>
        </g>
      )}
    </g>
  );

  /* the tray: cards waiting; the one being dragged follows the finger */
  const lay = caTray(S);
  const dragging = drag.drag;
  const tray = () => (
    <g>
      {S.tray.length > 0 && <rect x={2} y={CA.CARDY - 6} width={lay.right + 10} height={CA.CARDH + 12} rx={20} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />}
      {S.tray.map((id: string) => {
        if (S.moving === id) return null;
        const card = S.cards[id], pos = lay.pos[id];
        const dd = dragging && dragging.payload && dragging.payload.id === id ? dragging : null;
        const shake = S.wob && S.wob.id === id ? (S.wob.t % 2 ? 12 : S.wob.t ? -12 : 0) : 0;
        const off = dd ? `translate(${dd.x - (pos.x + pos.w / 2)}px, ${dd.y - (CA.CARDY + CA.CARDH / 2)}px)` : shake ? `translate(${shake}px, 0px)` : undefined;
        return (
          <g key={id} {...(live ? { ...control(id, card.zero ? tx("Zero card") : tx("Card") + " " + card.text), ...drag.bind({ id }), ...drag.keys({ id }), className: "c4-piece" } : {})}
            style={{ transform: off } as any} filter={dd ? "url(#fLift)" : undefined}>
            {compactNode(card, pos.x, CA.CARDY, pos.w)}
          </g>
        );
      })}
    </g>
  );

  /* the keys at the bottom: ONE key for a sequence (Point, then Add), two side by side where both stay choices (Swap, Add) */
  const pts = pointless(S);
  const keyIds: string[] = free ? [...(pts.length ? ["point"] : []), ...(S.rows.length >= 2 ? ["swap", "add"] : [])]
    : n === 3 ? [pts.length ? "point" : "add"] : n === 4 ? (!demo && item && item.choices ? [] : ["swap", "add"]) : ["add"];   /* a prediction has no keys: the other order's sum stays hidden until the answer */
  const keyOn = (id: string) => (!live ? false : demo ? id === stepOn
    : id === "point" ? pts.length > 0 : id === "swap" ? S.rows.length >= 2 : allIn(S));
  const kw = keyIds.length * CA.KW + (keyIds.length - 1) * CA.GAP;
  const kx0 = lay.right ? lay.right + 32 : 0;
  const kx = kx0 + Math.max(0, (CA.RIGHT - kx0 - kw) / 2);
  const keys = keyIds.map((id, j) => ({ id, j, on: keyOn(id), x: kx + j * (CA.KW + CA.GAP) }));

  /* the one thing to touch */
  let invAt: any = null;
  if (live && !S.dm) {
    /* the ring hugs the piece's outline (Invite w / h / rx, r57+; it draws 6 outside the box it is given), outside its
       digits and its key word, and inside the working area */
    const keyAt = (id: string) => { const b = keys.find((x) => x.id === id); return b ? { x: b.x + CA.KW / 2, y: CA.CARDY + CA.CARDH / 2, w: CA.KW } : null; };
    const cardAt = (id: string) => (lay.pos[id] ? { x: lay.pos[id].x + lay.pos[id].w / 2, y: CA.CARDY + CA.CARDH / 2, w: lay.pos[id].w } : null);
    if (demo) invAt = stepOn ? cardAt(stepOn) || keyAt(stepOn) : null;
    else if (stage === "ask") {
      const ready = S.tray.find((id: string) => S.cards[id].pt || S.cards[id].zero);
      invAt = pts.length && (S.tried || !ready) ? keyAt("point") : S.tray.length ? cardAt(ready || S.tray[0]) : !Object.keys(S.walk.sum).length ? keyAt("add") : null;
    }
  }

  return (
    <g>
      {frameBack()}
      <g pointerEvents={S.dm ? "none" : undefined}>{frame()}</g>
      {free && live && S.rows.map((r: any, k: number) => {
        const card = S.cards[r.id], nd = caCells(card).length;
        return <Hit key={"back-" + r.id} id={"back-" + r.id} x={caL(r.col) + 10} y={CA.ROWS[k]} w={caL(r.col + nd) - caL(r.col) - 20} h={CA.RH} onPress={() => tapPiece("back-" + r.id)} label={tx("Take back") + " " + card.text} />;
      })}
      {tray()}
      {keys.map((b) => (
        <Key key={"act" + b.j} id={b.id} label={tx(CA_KEY[b.id])} x={b.x} y={CA.CARDY} w={CA.KW} h={CA.CARDH} C={C} tone="key" disabled={!b.on} onClick={() => pressKey(b.id)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={b.on ? toneInk("key", C.ink) : shade(C.dim, 0.35)}>{tx(CA_KEY[b.id])}</text>
        </Key>
      ))}
      {/* a prediction, once proved (the correction or the win): the answer itself, Yes, under the frame */}
      {item && item.choices && !demo && !free && S.proved && (
        <g pointerEvents="none" data-role="proof-answer">
          <rect x={CA.RIGHT / 2 - 270} y={CA.CARDY} width={540} height={CA.CARDH} rx={18} fill={tint(CA_COL.sum, 0.85)} stroke={CA_COL.sum} strokeWidth={3} />
          {/* one line, centred in the chip in every language */}
          <text x={CA.RIGHT / 2} y={CA.CARDY + 55} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>
            <tspan fontSize={T.label} fill={C.ink}>{tx("Same sum")}</tspan>
            <tspan dx={28} fontSize={T.speech} fill={CA_INK.sum}>{tx("Yes")}</tspan>
          </text>
        </g>
      )}
      {invAt && <Invite x={invAt.x} y={invAt.y} w={invAt.w} h={CA.CARDH} rx={16} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, it, C, w, h }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item = it || last.it || ((PHASES[(n || 1) - 1] || { items: [] }) as any).items[last.item] || {};
  /* a prediction shows the swapped order and the sum both orders give (no Latin letters in hi / gu) */
  const cs = item.choices ? [...(item.cards || [])].reverse() : [...(item.zero ? ["0"] : []), ...(item.cards || [])];
  const line = cs.join(" + "), val = "= " + (item.choices ? String(item.sum) : String(last.value));
  /* as big as the card allows: the addition on the upper half, the sum as big as the room left under it (a short card
     keeps the two at 28 and 32, a taller one grows them) */
  const fs1 = h >= 110 ? 32 : T.micro;
  const top = Math.round(h / 2 - 6);
  const fs2 = Math.max(T.label, Math.min(56, Math.floor((h - 10 - (top + 0.25 * fs1) - 2) / 0.95), Math.floor((w - 28) / (val.length * 0.62))));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {line && <text x={w - 14} y={top} textAnchor="end" fontSize={fs1} fontWeight={700} fill={CA_INK.given}>{line}</text>}
      <text x={w - 14} y={h - 10} textAnchor="end" fontSize={fs2} fontWeight={700} fill={CA_INK.sum}>{val}</text>
    </g>
  );
}

function ColumnAdder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the sum is typed with its point (the point straight below the others IS the lesson): the pad's point key */
      pointKey: true,
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right */
      keyOnly: true,
      /* the wide keypad: the whole frame stands in x 0 to 884 of the working area, inside the 900 the open panel leaves */
      bigPad: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default ColumnAdder;
