/* ═══ M1.S1.T3.C11.2D1 · square_and_triangle · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide (it instructs; after a wrong act or answer the hint shows UNDER the
   pinned instruction and stays until the child acts again; r34). The lesson is action-driven: nothing moves
   on unless the child acts (a tap, a key, an answer); after a right answer the next question follows its
   short celebration by itself. The header's Hint key (r35) shows the hint on demand.
   This template is the FULL NEW STYLE and is used for a chapter whose pinned runtime is silent (a voiced runtime, r21
   and before, is scaffolded from lib/build/skeleton.voiced.tsx instead). Blocks that a given runtime has no support for
   are left out when `scaffold` writes this file (board, start page, theme).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing).
   THE NEW LOOK (the owner, 2026-10-16; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar (only the blinking key at the top
   right), four small clickable phase dots, a big ONE-sentence bubble, digits as written, every act performed on screen (api.act). The question
   lives ONLY in the bubble: each item's `say` is the whole question in one sentence. Opt out (delete `keyOnly: true` / `navDots: true` below)
   only with a reason stated in the report.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "square_and_triangle";
const MEDIA_ID = "M1.S1.T3.C11.2D1";
const TOOL_NAME = "Square and Triangle";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A shape on squared paper, ready for the ant to walk round."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You added equal sides quickly and worked back to a side.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Make squares, triangles and laps of your own.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "How far does an ant walk all the way round a shape?";
function StartArt({ box, C, lang, tx }: any) {
  return (
    <g>
      <defs>
        <linearGradient id="start-paper-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="100%" stopColor="#F7F1E5" />
        </linearGradient>
        <filter id="start-card-shadow" x="-5%" y="-5%" width={110} height={110}>
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#2B2B2B" floodOpacity="0.12" />
        </filter>
      </defs>
      <rect x={0} y={0} width={box.w} height={box.h} rx={RAD.panel} fill="url(#start-paper-grad)" stroke={C.rule} strokeWidth={2.5} filter="url(#start-card-shadow)" />
      {Array.from({ length: 39 }).map((_, i) => <line key={"v" + i} x1={30 + i * 30} y1={10} x2={30 + i * 30} y2={box.h - 10} stroke={tint(C.rule, 0.45)} strokeWidth={1.5} />)}
      {Array.from({ length: 11 }).map((_, i) => <line key={"h" + i} x1={10} y1={20 + i * 30} x2={box.w - 10} y2={20 + i * 30} stroke={tint(C.rule, 0.45)} strokeWidth={1.5} />)}
      <rect x={300} y={60} width={220} height={220} rx={4} fill={SQ_WARM} stroke={C.ink} strokeWidth={5} />
      <line x1={300} y1={280} x2={520} y2={280} stroke={SQ_VERM} strokeWidth={10} strokeLinecap="round" />
      <line x1={520} y1={280} x2={520} y2={60} stroke={SQ_VERM} strokeWidth={10} strokeLinecap="round" />
      <path d="M 660 280 L 900 280 L 820 70 Z" fill={SQ_WARM} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      <g transform="translate(520,60) rotate(-90)">{sqAnt()}</g>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each printed or drawn line
   up in it (Work draws its own words through tx("...")). Fill it AFTER the English is final and reviewed:
   `check` (tr-coverage) lists every printed line still missing. Nothing is baked: the lesson is silent.
   Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Perimeter of a square": "वर्ग का परिमाप",
    "side": "भुजा",
    "sum of the sides": "भुजाओं का जोड़",
    "length": "लंबाई",
    "breadth": "चौड़ाई",
    "Distance": "दूरी",
    "laps": "चक्कर",
    "Your answer counts tenths; divide by ten for metres.": "तुम्हारा उत्तर दसवें भाग गिनता है; मीटर के लिए दस से भाग दो।",
    "That is a count of tenths; divide it by ten for metres.": "यह दसवें भागों की गिनती है; मीटर के लिए दस से भाग दो।",
    "Work one lap, then all the laps.": "पहले एक चक्कर निकालो, फिर सारे चक्कर।",
    "Change tenths back into metres at the end.": "आखिर में दसवें भागों को फिर मीटर में बदलो।",
    "Your count is in tenths; ten tenths make a metre.": "तुम्हारी गिनती दसवें भागों में है; दस दसवें भाग एक मीटर।",
    "Times 4 gives one lap, then times 3 gives three laps.": "4 गुना एक चक्कर, फिर 3 गुना तीन चक्कर।",
    "Boundary": "सीमा",
    "Square and Triangle": "वर्ग और त्रिभुज",
    "Four equal sides": "चार बराबर भुजाएँ",
    "Three sides of a triangle": "त्रिभुज की तीन भुजाएँ",
    "Working back to a side": "उल्टा चलकर भुजा ढूँढो",
    "Laps and tenths": "चक्कर और दसवें भाग",
    "How far does an ant walk all the way round a shape?": "एक चींटी किसी आकृति के पूरे चारों ओर कितना चलती है?",
    "A shape on squared paper, ready for the ant to walk round.": "खानों वाले कागज़ पर एक आकृति, चींटी के चक्कर के लिए तैयार।",
    "Free play. Make squares, triangles and laps of your own.": "खुला खेल। अपने वर्ग, त्रिभुज और चक्कर बनाओ।",
    "You added equal sides quickly and worked back to a side.": "तुमने बराबर भुजाएँ जल्दी जोड़ीं और भुजा तक उल्टा पहुँचे।",
    "All four sides of a square are equal. How many lots of one side?": "वर्ग की चारों भुजाएँ बराबर हैं। एक भुजा कितनी बार?",
    "Tap Copy side to put 12 cm on the other three sides.": "बाकी तीन भुजाओं पर 12 सेमी लिखने के लिए भुजा कॉपी दबाओ।",
    "Tap the Copy side key under the square.": "वर्ग के नीचे भुजा कॉपी दबाओ।",
    "Now tap Times 4 to join the four equal sides.": "अब चारों बराबर भुजाएँ जोड़ने को 4 गुना दबाओ।",
    "The Times 4 key joins them.": "4 गुना बटन उन्हें जोड़ता है।",
    "Add two sides, then add the other two.": "दो भुजाएँ जोड़ो, फिर बाकी दो।",
    "Double the side, then double that again.": "भुजा को दोगुना करो, फिर उसे फिर दोगुना करो।",
    "A square has four equal sides, so its perimeter is 4 × side.": "वर्ग की चार बराबर भुजाएँ हैं, तो परिमाप 4 × भुजा है।",
    "You learned: a square's perimeter is 4 × its side.": "तुमने सीखा: वर्ग का परिमाप 4 × भुजा होता है।",
    "What is the perimeter of a square tile with sides of 19 cm?": "19 सेमी भुजा वाली वर्गाकार टाइल का परिमाप क्या है?",
    "Perimeter of the tile?": "टाइल का परिमाप?",
    "Walk all four sides of the tile, not two.": "टाइल की चारों भुजाओं पर चलो, दो पर नहीं।",
    "Yes, 4 × 19 = 76, so the tile is 76 cm round.": "हाँ, 4 × 19 = 76, टाइल के चारों ओर 76 सेमी।",
    "A square card has sides of 9 cm; find its perimeter.": "वर्गाकार कार्ड की भुजा 9 सेमी है; उसका परिमाप ढूँढो।",
    "Perimeter of the card?": "कार्ड का परिमाप?",
    "Every side of the square is 9 cm, so count them all.": "वर्ग की हर भुजा 9 सेमी है, तो सारी भुजाएँ गिनो।",
    "Yes, 4 × 9 = 36, so the card is 36 cm round.": "हाँ, 4 × 9 = 36, कार्ड के चारों ओर 36 सेमी।",
    "How far is it round a square frame with sides of 23 cm?": "23 सेमी भुजा वाले वर्गाकार फ्रेम के चारों ओर कितना है?",
    "Round the frame?": "फ्रेम के चारों ओर?",
    "Four lots of 23 cm go round the frame.": "फ्रेम के चारों ओर चार बार 23 सेमी है।",
    "Yes, 4 × 23 = 92 cm round the frame.": "हाँ, फ्रेम के चारों ओर 4 × 23 = 92 सेमी।",
    "Walk all three sides and add them.": "तीनों भुजाओं पर चलो और उन्हें जोड़ो।",
    "Tap Walk to send the ant along the first side.": "चींटी को पहली भुजा पर भेजने को चलो दबाओ।",
    "Tap the Walk key under the triangle.": "त्रिभुज के नीचे चलो दबाओ।",
    "Tap Walk again for the second side.": "दूसरी भुजा के लिए फिर चलो दबाओ।",
    "The ant waits for the Walk key.": "चींटी चलो बटन का इंतज़ार कर रही है।",
    "Walk the last side to close the triangle.": "त्रिभुज पूरा करने को आखिरी भुजा पर चलो।",
    "One more Walk closes it.": "एक और चलो से यह पूरा होगा।",
    "Add the two shorter sides first.": "पहले दो छोटी भुजाएँ जोड़ो।",
    "Then add the longest side to that sum.": "फिर उस योग में सबसे लंबी भुजा जोड़ो।",
    "The perimeter of a triangle is the sum of its three sides, in one unit.": "त्रिभुज का परिमाप उसकी तीनों भुजाओं का योग है, एक ही इकाई में।",
    "You learned: a triangle's perimeter is its three sides added.": "तुमने सीखा: त्रिभुज का परिमाप तीनों भुजाओं का योग है।",
    "A triangle has sides of 13 cm, 15 cm and 17 cm; what is its perimeter?": "त्रिभुज की भुजाएँ 13 सेमी, 15 सेमी, 17 सेमी हैं; परिमाप क्या है?",
    "Perimeter?": "परिमाप?",
    "Did the ant walk the third side too?": "क्या चींटी तीसरी भुजा पर भी चली?",
    "Yes, 13 + 15 + 17 = 45 cm.": "हाँ, 13 + 15 + 17 = 45 सेमी।",
    "Find the perimeter of a triangle with sides of 5 cm, 7 cm and 9 cm.": "5 सेमी, 7 सेमी, 9 सेमी भुजाओं वाले त्रिभुज का परिमाप ढूँढो।",
    "All three sides?": "तीनों भुजाएँ?",
    "Add every number on the strip.": "पट्टी की हर संख्या जोड़ो।",
    "Yes, 5 + 7 + 9 = 21 cm.": "हाँ, 5 + 7 + 9 = 21 सेमी।",
    "What is the perimeter in cm of a triangle with sides of 1 m, 80 cm and 65 cm?": "1 मी, 80 सेमी, 65 सेमी भुजाओं वाले त्रिभुज का परिमाप सेमी में?",
    "Perimeter in cm?": "परिमाप सेमी में?",
    "Change 1 m into centimetres first.": "पहले 1 मी को सेंटीमीटर में बदलो।",
    "One metre is 100 centimetres.": "एक मीटर 100 सेंटीमीटर होता है।",
    "Add the three sides once they are all in cm.": "तीनों सेमी में हों, तब भुजाएँ जोड़ो।",
    "Yes, 100 + 80 + 65 = 245 cm.": "हाँ, 100 + 80 + 65 = 245 सेमी।",
    "Fold the string in half. The half goes along one length and one breadth.": "रस्सी आधी मोड़ो। आधी रस्सी एक लंबाई और एक चौड़ाई पर आती है।",
    "Tap Halve to fold the 30 cm string in half.": "30 सेमी की रस्सी आधी करने को आधा करो दबाओ।",
    "Tap the Halve key first.": "पहले आधा करो दबाओ।",
    "Tap Take away to lift the 5 cm breadth off the half.": "आधे में से 5 सेमी चौड़ाई हटाने को घटाओ दबाओ।",
    "Now the Take away key lifts it.": "अब घटाओ बटन उसे हटाता है।",
    "What number added to the breadth makes the half?": "चौड़ाई में कौन-सी संख्या जोड़ने पर आधा बनता है?",
    "Check: 2 × (length + breadth) must give the perimeter.": "जाँचो: 2 × (लंबाई + चौड़ाई) परिमाप देना चाहिए।",
    "To find a missing length, halve the perimeter and take away the breadth.": "छूटी लंबाई के लिए परिमाप आधा करो और चौड़ाई घटाओ।",
    "You learned: length is half the perimeter take away the breadth.": "तुमने सीखा: लंबाई = आधा परिमाप घटा चौड़ाई।",
    "A rectangle has a perimeter of 36 cm and a breadth of 7 cm; how long is it?": "आयत का परिमाप 36 सेमी और चौड़ाई 7 सेमी है; लंबाई कितनी है?",
    "How long?": "कितना लंबा?",
    "Halve the perimeter before you take away.": "घटाने से पहले परिमाप आधा करो।",
    "Yes, 18 − 7 = 11, so it is 11 cm long.": "हाँ, 18 − 7 = 11, तो लंबाई 11 सेमी है।",
    "How long is a rectangle with a perimeter of 20 cm and a breadth of 3 cm?": "20 सेमी परिमाप और 3 सेमी चौड़ाई वाला आयत कितना लंबा है?",
    "Its length?": "उसकी लंबाई?",
    "The half holds one length and one breadth.": "आधे में एक लंबाई और एक चौड़ाई होती है।",
    "Yes, 10 − 3 = 7, so the length is 7 cm.": "हाँ, 10 − 3 = 7, तो लंबाई 7 सेमी है।",
    "A rectangle's perimeter is 50 m and its breadth is 9 m; find its length.": "आयत का परिमाप 50 मी और चौड़ाई 9 मी है; लंबाई ढूँढो।",
    "Length in m?": "लंबाई मी में?",
    "Take the breadth away from half of 50 m.": "50 मी के आधे में से चौड़ाई घटाओ।",
    "Yes, 25 − 9 = 16 m.": "हाँ, 25 − 9 = 16 मी।",
    "Find one lap first. Then count the laps.": "पहले एक चक्कर ढूँढो। फिर चक्कर गिनो।",
    "Tap Lens to read a 2.3 m side in tenths.": "2.3 मी की भुजा दसवें भागों में पढ़ने को लेंस दबाओ।",
    "Tap the Lens key at the bottom.": "नीचे लेंस बटन दबाओ।",
    "Tap Lap to send the ant once round the path.": "चींटी को रास्ते का एक चक्कर लगवाने को चक्कर दबाओ।",
    "Now the Lap key sends the ant.": "अब चक्कर बटन चींटी को भेजता है।",
    "Ten tenths make one metre, so divide by ten.": "दस दसवें भाग से एक मीटर बनता है, तो दस से भाग दो।",
    "Multiply a side's tenths by 4, then by the laps.": "भुजा के दसवें भागों को 4 से, फिर चक्करों से गुणा करो।",
    "So several laps are one lap added again and again.": "कई चक्कर एक ही चक्कर को बार-बार जोड़ना है।",
    "You learned: laps are one lap multiplied, a side read in tenths.": "तुमने सीखा: कई चक्कर = एक चक्कर का गुणा, भुजा दसवें भागों में।",
    "A square pond path has sides of 3.4 m; how far is 5 times round it?": "तालाब के वर्गाकार रास्ते की भुजा 3.4 मी है; 5 चक्कर कितने हैं?",
    "5 laps?": "5 चक्कर?",
    "Find one lap in tenths before the laps.": "चक्करों से पहले एक चक्कर दसवें भागों में ढूँढो।",
    "Yes, 680 tenths of a metre is 68 m.": "हाँ, मीटर के 680 दसवें भाग 68 मी हैं।",
    "One lap round a field is 45 m; how far are 3 laps?": "मैदान का एक चक्कर 45 मी है; 3 चक्कर कितने हैं?",
    "3 laps?": "3 चक्कर?",
    "Each lap adds 45 m again.": "हर चक्कर फिर 45 मी जोड़ता है।",
    "Multiply 45 by the number of laps.": "45 को चक्करों की संख्या से गुणा करो।",
    "Work 3 × 40 and 3 × 5, then add them.": "3 × 40 और 3 × 5 निकालो, फिर जोड़ो।",
    "Yes, 3 × 45 = 135 m.": "हाँ, 3 × 45 = 135 मी।",
    "How far do you walk going 3 times round a square path with sides of 2.6 m?": "2.6 मी भुजा वाले वर्गाकार रास्ते के 3 चक्कर में तुम कितना चलोगे?",
    "Read each side as 26 tenths first.": "पहले हर भुजा को 26 दसवें भाग पढ़ो।",
    "Yes, 312 tenths of a metre is 31.2 m.": "हाँ, मीटर के 312 दसवें भाग 31.2 मी हैं।",
    "Tap Copy side to label the other sides.": "बाकी भुजाओं पर नाप लिखने को भुजा कॉपी दबाओ।",
    "Tap Times 4 to join the four sides.": "चारों भुजाएँ जोड़ने को 4 गुना दबाओ।",
    "Tap Walk to go round the sides.": "भुजाओं पर घूमने को चलो दबाओ।",
    "Tap Halve to fold the string first.": "पहले रस्सी मोड़ने को आधा करो दबाओ।",
    "Tap Take away to lift off the breadth.": "चौड़ाई हटाने को घटाओ दबाओ।",
    "Tap Lens to read the side in tenths.": "भुजा दसवें भागों में पढ़ने को लेंस दबाओ।",
    "Tap Lap to walk one lap first.": "पहले एक चक्कर के लिए चक्कर दबाओ।",
    "cm": "सेमी",
    "m": "मी",
    "Perimeter": "परिमाप",
    "tenths": "दसवें",
    "lap": "चक्कर",
    "Laps": "चक्कर",
    "Copy side": "भुजा कॉपी",
    "Times 4": "4 गुना",
    "Walk": "चलो",
    "Halve": "आधा करो",
    "Take away": "घटाओ",
    "Lens": "लेंस",
    "Lap": "चक्कर",
    "Longer": "लंबा करो",
    "Triangle": "त्रिभुज",
    "Square": "वर्ग",
  },
  gu: {
    "Perimeter of a square": "ચોરસની પરિમિતિ",
    "side": "બાજુ",
    "sum of the sides": "બાજુઓનો સરવાળો",
    "length": "લંબાઈ",
    "breadth": "પહોળાઈ",
    "Distance": "અંતર",
    "laps": "ચક્કર",
    "Your answer counts tenths; divide by ten for metres.": "તમારો જવાબ દશાંશ ગણે છે; મીટર માટે દસથી ભાગો.",
    "That is a count of tenths; divide it by ten for metres.": "આ દશાંશની ગણતરી છે; મીટર માટે દસથી ભાગો.",
    "Work one lap, then all the laps.": "પહેલાં એક ચક્કર, પછી બધાં ચક્કર કરો.",
    "Change tenths back into metres at the end.": "છેલ્લે દશાંશને ફરી મીટરમાં ફેરવો.",
    "Your count is in tenths; ten tenths make a metre.": "તમારી ગણતરી દશાંશમાં છે; દસ દશાંશ એક મીટર.",
    "Times 4 gives one lap, then times 3 gives three laps.": "4 ગણું એક ચક્કર, પછી 3 ગણું ત્રણ ચક્કર.",
    "Boundary": "સીમા",
    "Square and Triangle": "ચોરસ અને ત્રિકોણ",
    "Four equal sides": "ચાર સરખી બાજુઓ",
    "Three sides of a triangle": "ત્રિકોણની ત્રણ બાજુઓ",
    "Working back to a side": "ઊલટું ચાલીને બાજુ શોધો",
    "Laps and tenths": "ચક્કર અને દશાંશ",
    "How far does an ant walk all the way round a shape?": "કીડી કોઈ આકારની આખી ફરતે કેટલું ચાલે?",
    "A shape on squared paper, ready for the ant to walk round.": "ખાનાવાળા કાગળ પર એક આકાર, કીડીના ચક્કર માટે તૈયાર.",
    "Free play. Make squares, triangles and laps of your own.": "મુક્ત રમત. તમારા ચોરસ, ત્રિકોણ અને ચક્કર બનાવો.",
    "You added equal sides quickly and worked back to a side.": "તમે સરખી બાજુઓ ઝડપથી ઉમેરી અને બાજુ સુધી ઊલટું પહોંચ્યા.",
    "All four sides of a square are equal. How many lots of one side?": "ચોરસની ચારેય બાજુઓ સરખી છે. એક બાજુ કેટલી વાર?",
    "Tap Copy side to put 12 cm on the other three sides.": "બાકીની ત્રણ બાજુઓ પર 12 સેમી મૂકવા બાજુ નકલ દબાવો.",
    "Tap the Copy side key under the square.": "ચોરસ નીચે બાજુ નકલ દબાવો.",
    "Now tap Times 4 to join the four equal sides.": "હવે ચારેય સરખી બાજુઓ જોડવા 4 ગણું દબાવો.",
    "The Times 4 key joins them.": "4 ગણું બટન તેમને જોડે છે.",
    "Add two sides, then add the other two.": "બે બાજુઓ ઉમેરો, પછી બાકીની બે.",
    "Double the side, then double that again.": "બાજુ બમણી કરો, પછી ફરી બમણી કરો.",
    "A square has four equal sides, so its perimeter is 4 × side.": "ચોરસની ચાર સરખી બાજુઓ છે, તેથી પરિમિતિ 4 × બાજુ.",
    "You learned: a square's perimeter is 4 × its side.": "તમે શીખ્યા: ચોરસની પરિમિતિ 4 × બાજુ હોય છે.",
    "What is the perimeter of a square tile with sides of 19 cm?": "19 સેમી બાજુવાળી ચોરસ ટાઇલની પરિમિતિ કેટલી?",
    "Perimeter of the tile?": "ટાઇલની પરિમિતિ?",
    "Walk all four sides of the tile, not two.": "ટાઇલની ચારેય બાજુ ચાલો, બે નહીં.",
    "Yes, 4 × 19 = 76, so the tile is 76 cm round.": "હા, 4 × 19 = 76, ટાઇલની ફરતે 76 સેમી.",
    "A square card has sides of 9 cm; find its perimeter.": "ચોરસ કાર્ડની બાજુ 9 સેમી છે; પરિમિતિ શોધો.",
    "Perimeter of the card?": "કાર્ડની પરિમિતિ?",
    "Every side of the square is 9 cm, so count them all.": "ચોરસની દરેક બાજુ 9 સેમી છે, તેથી બધી બાજુ ગણો.",
    "Yes, 4 × 9 = 36, so the card is 36 cm round.": "હા, 4 × 9 = 36, કાર્ડની ફરતે 36 સેમી.",
    "How far is it round a square frame with sides of 23 cm?": "23 સેમી બાજુવાળી ચોરસ ફ્રેમની ફરતે કેટલું?",
    "Round the frame?": "ફ્રેમની ફરતે?",
    "Four lots of 23 cm go round the frame.": "ફ્રેમની ફરતે ચાર વાર 23 સેમી છે.",
    "Yes, 4 × 23 = 92 cm round the frame.": "હા, ફ્રેમની ફરતે 4 × 23 = 92 સેમી.",
    "Walk all three sides and add them.": "ત્રણેય બાજુ ચાલો અને ઉમેરો.",
    "Tap Walk to send the ant along the first side.": "કીડીને પહેલી બાજુ પર મોકલવા ચાલો દબાવો.",
    "Tap the Walk key under the triangle.": "ત્રિકોણ નીચે ચાલો દબાવો.",
    "Tap Walk again for the second side.": "બીજી બાજુ માટે ફરી ચાલો દબાવો.",
    "The ant waits for the Walk key.": "કીડી ચાલો બટનની રાહ જુએ છે.",
    "Walk the last side to close the triangle.": "ત્રિકોણ પૂરો કરવા છેલ્લી બાજુ ચાલો.",
    "One more Walk closes it.": "એક વધુ ચાલો તેને પૂરો કરશે.",
    "Add the two shorter sides first.": "પહેલાં બે નાની બાજુઓ ઉમેરો.",
    "Then add the longest side to that sum.": "પછી એ સરવાળામાં સૌથી લાંબી બાજુ ઉમેરો.",
    "The perimeter of a triangle is the sum of its three sides, in one unit.": "ત્રિકોણની પરિમિતિ ત્રણેય બાજુઓનો સરવાળો છે, એક જ એકમમાં.",
    "You learned: a triangle's perimeter is its three sides added.": "તમે શીખ્યા: ત્રિકોણની પરિમિતિ ત્રણ બાજુઓનો સરવાળો છે.",
    "A triangle has sides of 13 cm, 15 cm and 17 cm; what is its perimeter?": "ત્રિકોણની બાજુઓ 13 સેમી, 15 સેમી, 17 સેમી; પરિમિતિ કેટલી?",
    "Perimeter?": "પરિમિતિ?",
    "Did the ant walk the third side too?": "શું કીડી ત્રીજી બાજુ પણ ચાલી?",
    "Yes, 13 + 15 + 17 = 45 cm.": "હા, 13 + 15 + 17 = 45 સેમી.",
    "Find the perimeter of a triangle with sides of 5 cm, 7 cm and 9 cm.": "5 સેમી, 7 સેમી, 9 સેમી બાજુવાળા ત્રિકોણની પરિમિતિ શોધો.",
    "All three sides?": "ત્રણેય બાજુઓ?",
    "Add every number on the strip.": "પટ્ટી પરની દરેક સંખ્યા ઉમેરો.",
    "Yes, 5 + 7 + 9 = 21 cm.": "હા, 5 + 7 + 9 = 21 સેમી.",
    "What is the perimeter in cm of a triangle with sides of 1 m, 80 cm and 65 cm?": "1 મી, 80 સેમી, 65 સેમી બાજુવાળા ત્રિકોણની પરિમિતિ સેમીમાં?",
    "Perimeter in cm?": "પરિમિતિ સેમીમાં?",
    "Change 1 m into centimetres first.": "પહેલાં 1 મીને સેન્ટિમીટરમાં ફેરવો.",
    "One metre is 100 centimetres.": "એક મીટર 100 સેન્ટિમીટર થાય.",
    "Add the three sides once they are all in cm.": "ત્રણેય સેમીમાં થાય પછી બાજુઓ ઉમેરો.",
    "Yes, 100 + 80 + 65 = 245 cm.": "હા, 100 + 80 + 65 = 245 સેમી.",
    "Fold the string in half. The half goes along one length and one breadth.": "દોરી અડધી વાળો. અડધી દોરી એક લંબાઈ અને એક પહોળાઈ પર આવે.",
    "Tap Halve to fold the 30 cm string in half.": "30 સેમીની દોરી અડધી કરવા અડધું કરો દબાવો.",
    "Tap the Halve key first.": "પહેલાં અડધું કરો દબાવો.",
    "Tap Take away to lift the 5 cm breadth off the half.": "અડધામાંથી 5 સેમી પહોળાઈ કાઢવા બાદ કરો દબાવો.",
    "Now the Take away key lifts it.": "હવે બાદ કરો બટન તેને કાઢે છે.",
    "What number added to the breadth makes the half?": "પહોળાઈમાં કઈ સંખ્યા ઉમેરતાં અડધું બને?",
    "Check: 2 × (length + breadth) must give the perimeter.": "ચકાસો: 2 × (લંબાઈ + પહોળાઈ) પરિમિતિ આપવી જોઈએ.",
    "To find a missing length, halve the perimeter and take away the breadth.": "ખૂટતી લંબાઈ માટે પરિમિતિ અડધી કરો અને પહોળાઈ બાદ કરો.",
    "You learned: length is half the perimeter take away the breadth.": "તમે શીખ્યા: લંબાઈ = અડધી પરિમિતિ ઓછા પહોળાઈ.",
    "A rectangle has a perimeter of 36 cm and a breadth of 7 cm; how long is it?": "લંબચોરસની પરિમિતિ 36 સેમી, પહોળાઈ 7 સેમી; લંબાઈ કેટલી?",
    "How long?": "કેટલું લાંબું?",
    "Halve the perimeter before you take away.": "બાદ કરતાં પહેલાં પરિમિતિ અડધી કરો.",
    "Yes, 18 − 7 = 11, so it is 11 cm long.": "હા, 18 − 7 = 11, તેથી લંબાઈ 11 સેમી.",
    "How long is a rectangle with a perimeter of 20 cm and a breadth of 3 cm?": "20 સેમી પરિમિતિ અને 3 સેમી પહોળાઈવાળો લંબચોરસ કેટલો લાંબો?",
    "Its length?": "તેની લંબાઈ?",
    "The half holds one length and one breadth.": "અડધામાં એક લંબાઈ અને એક પહોળાઈ હોય.",
    "Yes, 10 − 3 = 7, so the length is 7 cm.": "હા, 10 − 3 = 7, તેથી લંબાઈ 7 સેમી.",
    "A rectangle's perimeter is 50 m and its breadth is 9 m; find its length.": "લંબચોરસની પરિમિતિ 50 મી, પહોળાઈ 9 મી; લંબાઈ શોધો.",
    "Length in m?": "લંબાઈ મીમાં?",
    "Take the breadth away from half of 50 m.": "50 મીના અડધામાંથી પહોળાઈ બાદ કરો.",
    "Yes, 25 − 9 = 16 m.": "હા, 25 − 9 = 16 મી.",
    "Find one lap first. Then count the laps.": "પહેલાં એક ચક્કર શોધો. પછી ચક્કર ગણો.",
    "Tap Lens to read a 2.3 m side in tenths.": "2.3 મીની બાજુ દશાંશમાં વાંચવા લેન્સ દબાવો.",
    "Tap the Lens key at the bottom.": "નીચે લેન્સ બટન દબાવો.",
    "Tap Lap to send the ant once round the path.": "કીડીને રસ્તાનું એક ચક્કર મરાવવા ચક્કર દબાવો.",
    "Now the Lap key sends the ant.": "હવે ચક્કર બટન કીડીને મોકલે છે.",
    "Ten tenths make one metre, so divide by ten.": "દસ દશાંશ મળીને એક મીટર થાય, તેથી દસથી ભાગો.",
    "Multiply a side's tenths by 4, then by the laps.": "બાજુના દશાંશને 4 વડે, પછી ચક્કર વડે ગુણો.",
    "So several laps are one lap added again and again.": "ઘણાં ચક્કર એટલે એક ચક્કર વારંવાર ઉમેરવું.",
    "You learned: laps are one lap multiplied, a side read in tenths.": "તમે શીખ્યા: ઘણાં ચક્કર = એક ચક્કરનો ગુણાકાર, બાજુ દશાંશમાં.",
    "A square pond path has sides of 3.4 m; how far is 5 times round it?": "તળાવના ચોરસ રસ્તાની બાજુ 3.4 મી; 5 ચક્કર કેટલા?",
    "5 laps?": "5 ચક્કર?",
    "Find one lap in tenths before the laps.": "ચક્કર પહેલાં એક ચક્કર દશાંશમાં શોધો.",
    "Yes, 680 tenths of a metre is 68 m.": "હા, મીટરના 680 દશાંશ એટલે 68 મી.",
    "One lap round a field is 45 m; how far are 3 laps?": "મેદાનનું એક ચક્કર 45 મી; 3 ચક્કર કેટલા?",
    "3 laps?": "3 ચક્કર?",
    "Each lap adds 45 m again.": "દરેક ચક્કર ફરી 45 મી ઉમેરે.",
    "Multiply 45 by the number of laps.": "45 ને ચક્કરની સંખ્યાથી ગુણો.",
    "Work 3 × 40 and 3 × 5, then add them.": "3 × 40 અને 3 × 5 કરો, પછી ઉમેરો.",
    "Yes, 3 × 45 = 135 m.": "હા, 3 × 45 = 135 મી.",
    "How far do you walk going 3 times round a square path with sides of 2.6 m?": "2.6 મી બાજુવાળા ચોરસ રસ્તાના 3 ચક્કરમાં તમે કેટલું ચાલશો?",
    "Read each side as 26 tenths first.": "પહેલાં દરેક બાજુ 26 દશાંશ તરીકે વાંચો.",
    "Yes, 312 tenths of a metre is 31.2 m.": "હા, મીટરના 312 દશાંશ એટલે 31.2 મી.",
    "Tap Copy side to label the other sides.": "બાકીની બાજુઓ પર માપ લખવા બાજુ નકલ દબાવો.",
    "Tap Times 4 to join the four sides.": "ચારેય બાજુઓ જોડવા 4 ગણું દબાવો.",
    "Tap Walk to go round the sides.": "બાજુઓ ફરતે જવા ચાલો દબાવો.",
    "Tap Halve to fold the string first.": "પહેલાં દોરી વાળવા અડધું કરો દબાવો.",
    "Tap Take away to lift off the breadth.": "પહોળાઈ કાઢવા બાદ કરો દબાવો.",
    "Tap Lens to read the side in tenths.": "બાજુ દશાંશમાં વાંચવા લેન્સ દબાવો.",
    "Tap Lap to walk one lap first.": "પહેલાં એક ચક્કર માટે ચક્કર દબાવો.",
    "cm": "સેમી",
    "m": "મી",
    "Perimeter": "પરિમિતિ",
    "tenths": "દશાંશ",
    "lap": "ચક્કર",
    "Laps": "ચક્કર",
    "Copy side": "બાજુ નકલ",
    "Times 4": "4 ગણું",
    "Walk": "ચાલો",
    "Halve": "અડધું કરો",
    "Take away": "બાદ કરો",
    "Lens": "લેન્સ",
    "Lap": "ચક્કર",
    "Longer": "લાંબું કરો",
    "Triangle": "ત્રિકોણ",
    "Square": "ચોરસ",
  },
};

/* One entry per phase = one mount.
   says    the teach run, printed on the bubble a piece at a time before anything is asked (numbers are printed as words)
           keyOnly: digits print as written; a bubble line may name its number unless that gives the answer away
   steps   GUIDE STEPS (runtime r30; `hint` r34), when the plan's teach lines describe acts:
             steps: [{ say: "Tap Cut to cut the bar into ten equal parts.", on: "cut", hint: "Tap the Cut key first." },
                     { say: "Now tap one part to shade it.", on: "shade", hint: "Tap one piece of the bar." }],
           The phase then opens on steps[0].say with the question and the Answer key waiting (stage "demo"; `says` and
           OPENING are not shown). Work does the act when the CHILD does it and reports it: api.did("cut"). Only then does
           the bubble move to the next step (never on a timer); the last act opens the first question with its say.
           ONE CLICK PER STEP (2026-10-08): a step completes on one click of one control (a button such as Cut, or one
           piece of the picture), never on a count; if the idea needs more clicks, write more steps, each with the next
           instruction (the same `on` may repeat). The keypad's Enter is not a step act. Name a step's button after its
           act (data-control "cut") so the check can click it.
           Report EVERY click Work gets with api.did(name) at the moment of the click, awaited or not: a wrong act shows
           that step's `hint` UNDER the pinned instruction, unchanged until the child acts again (the header's Hint key
           shows it on demand as well). Work must also register api.onEnter so that Enter, the agent's check() and the dev
           solve() perform the CURRENT step (see Work below); props.stepOn names the act waited for: put the one <Invite/>
           on that control. ONE PAGE (r35): each `say`, each `hint`, each question's `say`, each `miss` and ladder rung is
           ONE sentence that fits the bubble (no timer ever pages it); a hint at most about 40 characters when its
           instruction runs to two lines, never over 80, never the answer; each hint unique in the phase.
           The scaffold writes ONE stub step per phase from its teach line: make it real, or delete the `steps` array of a
           phase whose teach describes no act (then `says` is the teach run and the phase opens on its first question).
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, printed once when it goes idle
           keyOnly: ONE sentence; the bubble shows it in place of the last win line
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone); steps are the newer way
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the question's line on the bubble (one sentence: one page); ask = the short prompt above the slot
                 (<= 3 lines of ~15 chars)
                 keyOnly: there is no question bar, so the bubble is the only place the question shows: `say` is the WHOLE question in ONE
                 sentence (the plan's question cut to one: put its setup back in when the child needs it). `ask` stays, because the checks and
                 the sidecar read it, but it is never drawn. A hint (miss, ladder rung) shows in place of the question: ONE sentence each
           answer what the slot or the working area must produce; miss = rung 1, shown at once UNDER the pinned
                  instruction after a miss (one sentence, never the answer; a second miss shows ladder[0], a third
                  ladder[1]), and kept there until the child acts again
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
    concept: "Four equal sides",
    conceptId: "M1.S1.T3.C10", objectiveIds: ["O3"],
    says: ["All four sides of a square are equal. How many lots of one side?"],
    /* the warm-up square (MODEL.warm[1], side 12 cm): Copy side, then Times 4 */
    steps: [
      { say: "Tap Copy side to put 12 cm on the other three sides.", on: "copy", hint: "Tap the Copy side key under the square." },
      { say: "Now tap Times 4 to join the four equal sides.", on: "times", hint: "The Times 4 key joins them." },
    ],
    stepHold: 2200,
    ladder: ["Add two sides, then add the other two.", "Double the side, then double that again."],
    closing: "A square has four equal sides, so its perimeter is 4 × side.",
    learned: "You learned: a square's perimeter is 4 × its side.",
    traceback: "the four sides light one by one, the sum strip reads side + side + side + side, then 4 × side and the perimeter in green",
    items: [
      /* learn ST1: answer in the plan = 76 cm */
      { qid: "M1.S1.T3.C10:ST1", kind: "sq", side: 19, obj: "tile", say: "What is the perimeter of a square tile with sides of 19 cm?", ask: "Perimeter of the tile?", answer: 76,
        miss: "Walk all four sides of the tile, not two.", win: "Yes, 4 × 19 = 76, so the tile is 76 cm round." },
      /* practice 1: answer in the plan = 4 x 9 = 36, so 36 cm */
      { qid: "M1.S1.T3.C10:1", kind: "sq", side: 9, obj: "card", say: "A square card has sides of 9 cm; find its perimeter.", ask: "Perimeter of the card?", answer: 36,
        miss: "Every side of the square is 9 cm, so count them all.", win: "Yes, 4 × 9 = 36, so the card is 36 cm round." },
      /* practice 4: answer in the plan = 4 x 23 = 92, so 92 cm */
      { qid: "M1.S1.T3.C10:4", kind: "sq", side: 23, obj: "frame", say: "How far is it round a square frame with sides of 23 cm?", ask: "Round the frame?", answer: 92,
        miss: "Four lots of 23 cm go round the frame.", win: "Yes, 4 × 23 = 92 cm round the frame." },
    ],
  },
  {
    n: 2,
    concept: "Three sides of a triangle",
    conceptId: "M1.S1.T3.C11", objectiveIds: ["O3"],
    says: ["Walk all three sides and add them."],
    /* the warm-up triangle (MODEL.warm[2], 6 cm, 8 cm, 10 cm): one Walk a side */
    steps: [
      { say: "Tap Walk to send the ant along the first side.", on: "walk", hint: "Tap the Walk key under the triangle." },
      { say: "Tap Walk again for the second side.", on: "walk", hint: "The ant waits for the Walk key." },
      { say: "Walk the last side to close the triangle.", on: "walk", hint: "One more Walk closes it." },
    ],
    stepHold: 2200,
    ladder: ["Add the two shorter sides first.", "Then add the longest side to that sum."],
    closing: "The perimeter of a triangle is the sum of its three sides, in one unit.",
    learned: "You learned: a triangle's perimeter is its three sides added.",
    traceback: "the ant's sides light one by one into the sum strip (a side in metres is lit amber and written in centimetres), ending on the sum in green",
    items: [
      /* learn ST2: answer in the plan = 45 cm */
      { qid: "M1.S1.T3.C11:ST2", kind: "tri", sides: [13, 15, 17], units: ["cm", "cm", "cm"], say: "A triangle has sides of 13 cm, 15 cm and 17 cm; what is its perimeter?", ask: "Perimeter?", answer: 45,
        miss: "Did the ant walk the third side too?", win: "Yes, 13 + 15 + 17 = 45 cm." },
      /* practice 2: answer in the plan = 5 + 7 + 9 = 21, so 21 cm */
      { qid: "M1.S1.T3.C11:2", kind: "tri", sides: [5, 7, 9], units: ["cm", "cm", "cm"], say: "Find the perimeter of a triangle with sides of 5 cm, 7 cm and 9 cm.", ask: "All three sides?", answer: 21,
        miss: "Add every number on the strip.", win: "Yes, 5 + 7 + 9 = 21 cm." },
      /* practice 5: answer in the plan = 1 m = 100 cm, and 100 + 80 + 65 = 245, so 245 cm */
      { qid: "M1.S1.T3.C11:5", kind: "tri", sides: [1, 80, 65], units: ["m", "cm", "cm"], say: "What is the perimeter in cm of a triangle with sides of 1 m, 80 cm and 65 cm?", ask: "Perimeter in cm?", answer: 245,
        miss: "Change 1 m into centimetres first.", ladder: ["One metre is 100 centimetres.", "Add the three sides once they are all in cm."], win: "Yes, 100 + 80 + 65 = 245 cm." },
    ],
  },
  {
    n: 3,
    concept: "Working back to a side",
    conceptId: "M1.S1.T3.C12", objectiveIds: ["O4"],
    says: ["Fold the string in half. The half goes along one length and one breadth."],
    /* the warm-up rectangle (MODEL.warm[3], perimeter 30 cm, breadth 5 cm): Halve, then Take away */
    steps: [
      { say: "Tap Halve to fold the 30 cm string in half.", on: "halve", hint: "Tap the Halve key first." },
      { say: "Tap Take away to lift the 5 cm breadth off the half.", on: "take", hint: "Now the Take away key lifts it." },
    ],
    stepHold: 2400,
    ladder: ["What number added to the breadth makes the half?", "Check: 2 × (length + breadth) must give the perimeter."],
    closing: "To find a missing length, halve the perimeter and take away the breadth.",
    learned: "You learned: length is half the perimeter take away the breadth.",
    traceback: "the string is halved along one length and one breadth, the breadth is lit amber and taken away, the length lands green and is checked by 2 × (length + breadth)",
    items: [
      /* learn ST3: answer in the plan = 11 cm */
      { qid: "M1.S1.T3.C12:ST3", kind: "rect", per: 36, br: 7, u: "cm", say: "A rectangle has a perimeter of 36 cm and a breadth of 7 cm; how long is it?", ask: "How long?", answer: 11,
        miss: "Halve the perimeter before you take away.", win: "Yes, 18 − 7 = 11, so it is 11 cm long." },
      /* practice 3: answer in the plan = Half of 20 is 10, and 10 - 3 = 7, so the length is 7 cm */
      { qid: "M1.S1.T3.C12:3", kind: "rect", per: 20, br: 3, u: "cm", say: "How long is a rectangle with a perimeter of 20 cm and a breadth of 3 cm?", ask: "Its length?", answer: 7,
        miss: "The half holds one length and one breadth.", win: "Yes, 10 − 3 = 7, so the length is 7 cm." },
      /* practice 7: answer in the plan = Half of 50 is 25, and 25 - 9 = 16, so the length is 16 m */
      { qid: "M1.S1.T3.C12:7", kind: "rect", per: 50, br: 9, u: "m", say: "A rectangle's perimeter is 50 m and its breadth is 9 m; find its length.", ask: "Length in m?", answer: 16,
        miss: "Take the breadth away from half of 50 m.", win: "Yes, 25 − 9 = 16 m." },
    ],
  },
  {
    n: 4,
    concept: "Laps and tenths",
    conceptId: "M1.S1.T3.C13", objectiveIds: ["O4"],
    says: ["Find one lap first. Then count the laps."],
    /* the warm-up path (MODEL.warm[4], side 2.3 m, one lap): Lens, then Lap */
    steps: [
      { say: "Tap Lens to read a 2.3 m side in tenths.", on: "lens", hint: "Tap the Lens key at the bottom." },
      { say: "Tap Lap to send the ant once round the path.", on: "lap", hint: "Now the Lap key sends the ant." },
    ],
    stepHold: 2400,
    ladder: ["Work one lap, then all the laps.", "Change tenths back into metres at the end."],
    closing: "So several laps are one lap added again and again.",
    learned: "You learned: laps are one lap multiplied, a side read in tenths.",
    traceback: "the lens reads the side in tenths (the word tenths lit amber), the ant walks one lap lighting four sides, then laps × one lap in tenths and the distance in metres in green",
    items: [
      /* learn ST4: answer in the plan = 68 m */
      { qid: "M1.S1.T3.C13:ST4", kind: "path", side: "3.4", laps: 5, obj: "pond", say: "A square pond path has sides of 3.4 m; how far is 5 times round it?", ask: "5 laps?", answer: 68,
        miss: "Find one lap in tenths before the laps.", slip: "Your answer counts tenths; divide by ten for metres.",
        ladder: ["Multiply a side's tenths by 4, then by the laps.", "Ten tenths make one metre, so divide by ten."], win: "Yes, 680 tenths of a metre is 68 m." },
      /* practice 6: answer in the plan = 3 x 45 = 135, so 135 m */
      { qid: "M1.S1.T3.C13:6", kind: "field", lap: 45, laps: 3, obj: "field", say: "One lap round a field is 45 m; how far are 3 laps?", ask: "3 laps?", answer: 135,
        miss: "Each lap adds 45 m again.", ladder: ["Multiply 45 by the number of laps.", "Work 3 × 40 and 3 × 5, then add them."], win: "Yes, 3 × 45 = 135 m." },
      /* practice 8: answer in the plan = 2.6 m is 26 tenths. One lap is 4 x 26 = 104 tenths, which is 10.4 m. Three laps are 3 x 104 = 312 tenths, which is 31.2 m */
      { qid: "M1.S1.T3.C13:8", kind: "path", side: "2.6", laps: 3, obj: "path", say: "How far do you walk going 3 times round a square path with sides of 2.6 m?", ask: "3 laps?", answer: "31.2",
        miss: "Read each side as 26 tenths first.", slip: "That is a count of tenths; divide it by ten for metres.",
        ladder: ["Times 4 gives one lap, then times 3 gives three laps.", "Your count is in tenths; ten tenths make a metre."], win: "Yes, 312 tenths of a metre is 31.2 m." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too).
   warm: each phase's guide-step warm-up (never a question's own numbers, and no warm-up result is an answer of its phase). */
const MODEL: any = {
  warm: {
    1: { kind: "sq", side: 12 },
    2: { kind: "tri", sides: [6, 8, 10], units: ["cm", "cm", "cm"] },
    3: { kind: "rect", per: 30, br: 5, u: "cm" },
    4: { kind: "path", side: "2.3", laps: 1 },
  },
  /* the act that wakes the Answer key, per question (PATTERNS §19); no question is ungated */
  answerGate: {
    "phase 1 (Q1-Q3)": "Copy side, then Times 4",
    "phase 2 (Q1-Q3)": "three Walk taps (one side each)",
    "phase 3 (Q1-Q3)": "Halve, then Take away",
    "phase 4 Q1, Q3 (square path)": "Lens, then ONE lap (more laps optional)",
    "phase 4 Q2 (field)": "ONE lap (more laps optional)",
    ungated: "none",
  },
  acts: { sq: ["copy", "times"], tri: ["walk", "walk", "walk"], rect: ["halve", "take"], path: ["lens", "lap x laps"], field: ["lap x laps"] },
};

/* ── Square and Triangle helpers (prefixed sq, so no name meets the runtime's) ─────────────── */
const SQ_BLUE = "#0072B2", SQ_GREEN = "#009E73", SQ_VERM = "#D55E00", SQ_AMBER = "#E69F00", SQ_WARM = "#FFFDF7";
const SQ_KEYS: any = { copy: "Copy side", times: "Times 4", walk: "Walk", halve: "Halve", take: "Take away", lens: "Lens", lap: "Lap", longer: "Longer" };
/* while the Answer key waits for the act: one number-free nudge per act (PATTERNS §19 side effect 1) */
const SQ_NUDGE: any = { copy: "Tap Copy side to label the other sides.", times: "Tap Times 4 to join the four sides.", walk: "Tap Walk to go round the sides.",
  halve: "Tap Halve to fold the string first.", take: "Tap Take away to lift off the breadth.", lens: "Tap Lens to read the side in tenths.", lap: "Tap Lap to walk one lap first." };
/* user mode: the host's own mount (the teacher agent's AI mode is never gated) */
const sqUser = () => { try { const g = (window as any).toolApi && (window as any).toolApi.getState && (window as any).toolApi.getState(); return !(g && g.mode && g.mode !== "user"); } catch (e) { return true; } };
/* the acts of a question, in order (one key at the bottom centre follows them) */
const sqSeq = (it: any): string[] => !it ? [] : it.kind === "sq" ? ["copy", "times"] : it.kind === "tri" ? ["walk", "walk", "walk"] : it.kind === "rect" ? ["halve", "take"]
  : it.kind === "path" ? ["lens"].concat(Array(it.laps).fill("lap")) : it.kind === "field" ? Array(it.laps).fill("lap") : [];
/* a side such as "3.4" as a count of tenths (34) */
const sqTenths = (a: any) => Math.round(parseFloat(String(a)) * 10);
/* a count of tenths written back in metres: 680 -> "68", 312 -> "31.2" */
const sqMetres = (t: number) => (t % 10 === 0 ? String(t / 10) : (t / 10).toFixed(1));
/* a string's width at size fs, from Poppins-bold advances (digits .62, signs .62, Latin .56, a space .26; Devanagari and Gujarati
   letters .62, their zero-width marks 0, the spacing vowel signs .3); it errs wide, so a fitted label never meets an edge */
const SQ_ZW = /[\u0900-\u0902\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0A81\u0A82\u0ABC\u0AC1-\u0AC8\u0ACD\u0AE2\u0AE3]/;
const SQ_SP = /[\u093E\u093F\u0940\u0949-\u094C\u0903\u0ABE-\u0AC0\u0AC9-\u0ACC\u0A83]/;
const sqW = (t: string, fs: number) => {
  let e = 0;
  for (const ch of String(t)) e += SQ_ZW.test(ch) ? 0 : SQ_SP.test(ch) ? 0.3 : ch === " " ? 0.26 : /[.,:]/.test(ch) ? 0.3 : /[()]/.test(ch) ? 0.36 : /[0-9]/.test(ch) ? 0.62 : /[a-z]/.test(ch) ? 0.56 : /[A-Z]/.test(ch) ? 0.68 : 0.62;
  return e * fs * 1.04;
};
/* a working line's REAL width: the bold font the tool draws with, measured on a canvas (words as eq() draws them, a 0.26 em gap
   between them); the estimate stands in where no canvas is */
let SQ_CTX: any = null;
const sqMeasure = (t: string, fs: number) => {
  try {
    if (!SQ_CTX) SQ_CTX = window.document.createElement("canvas").getContext("2d");
    SQ_CTX.font = "700 " + fs + "px " + FONT;
    const ws = String(t).split(" ");
    return ws.reduce((a: number, w: string) => a + SQ_CTX.measureText(w).width, 0) + (ws.length - 1) * 0.26 * fs;
  } catch (e) { return sqW(t, fs); }
};
/* a working line wrapped into rows that fit w at size fs (words kept whole) */
const sqWrap = (t: string, w: number, fs: number): string[] => {
  const k = String(t).indexOf(" = ");
  if (sqW(t, fs) > w && k > 0) return [...sqWrap(t.slice(0, k), w, fs), ...sqWrap(t.slice(k + 1), w, fs)];
  const out: string[] = [];
  let cur = "";
  for (const wd of String(t).split(" ")) {
    const tryL = cur ? cur + " " + wd : wd;
    if (cur && sqW(tryL, fs) > w) { out.push(cur); cur = wd; } else cur = tryL;
  }
  if (cur) out.push(cur);
  return out;
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers; a decimal in its written form) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  /* rung 1 names the tenths-as-metres slip only when the child typed ten times the answer (680 for 68, 312 for 31.2) */
  if (item.slip) {
    if (item.missGen === undefined) item.missGen = item.miss;
    item.miss = Math.abs(Number(String(v).trim()) - 10 * Number(item.answer)) < 1e-9 ? item.slip : item.missGen;
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  const t = String(v).trim();
  if (/^\d*\.?\d+$|^\d+\.$/.test(t) && /^\d*\.?\d+$/.test(String(item.answer))) return Number(t) === Number(item.answer);
  return t.toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route (repeated adding, string tenths) that shares no code with judge or Work */
const sqOracleOf = (it: any): any => {
  if (it.kind === "sq") return it.side + it.side + it.side + it.side;
  if (it.kind === "tri") { let d = 0; it.sides.forEach((v: number, i: number) => { d += it.units[i] === "m" ? v * 100 : v; }); return d; }
  if (it.kind === "rect") { let len = 0; while (2 * (len + it.br) < it.per) len++; return 2 * (len + it.br) === it.per ? len : NaN; }
  if (it.kind === "field") { let d = 0; for (let k = 0; k < it.laps; k++) d += it.lap; return d; }
  if (it.kind === "path") {
    const [w, f = "0"] = String(it.side).split(".");
    let T = 0; for (let k = 0; k < 4 * it.laps; k++) T += Number(w) * 10 + Number(f);
    return T % 10 ? Math.floor(T / 10) + "." + (T % 10) : T / 10;
  }
  return NaN;
};
const oracle = () => PHASES.every((p: any) => {
  const ans = p.items.map((it: any) => String(it.answer));
  const warm = MODEL.warm[p.n];
  return p.items.every((it: any) => String(sqOracleOf(it)) === String(it.answer)) && !ans.includes(String(sqOracleOf(warm)));
});
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "sq") return 2 * item.side;                                  /* two lots of the side, as one length and one breadth */
  if (item.kind === "tri") return item.units.includes("m") ? item.sides[0] + item.sides[1] + item.sides[2] : item.sides[0] + item.sides[1];
  if (item.kind === "rect") return item.per - item.br;                           /* the breadth taken from the whole perimeter */
  if (item.kind === "path") return String(sqTenths(item.side) * 4 * item.laps);  /* the count of tenths read as metres */
  if (item.kind === "field") return item.lap;                                    /* one lap only */
  return typeof item.answer === "number" ? item.answer + 1 : "~";
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : /^\d*\.\d+$/.test(String(item.answer)) ? [String(item.answer), speakable(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): a decimal in one box is typed whole (toolApi.answer would strip its point, PATTERNS §4); undefined = type it */
const answer = (item: any, v: any) => (typeof item.answer === "string" && HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: it performs the question's acts at once (so AI mode is never gated); undefined in the demo stage */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* an ant, drawn round 0,0 (it walks the boundary; the hand carries it on an act) */
const sqAnt = (k?: any) => (
  <g key={k} pointerEvents="none">
    {[-11, 0, 11].map((x, i) => <path key={i} d={`M ${x} -4 L ${x - 5} -15 M ${x} 4 L ${x - 5} 15`} stroke="#3B2A1E" strokeWidth={3} strokeLinecap="round" fill="none" />)}
    <ellipse cx={-17} cy={0} rx={10} ry={8} fill="#5A3B26" stroke="#2B1C12" strokeWidth={2} />
    <ellipse cx={0} cy={0} rx={8} ry={7} fill="#5A3B26" stroke="#2B1C12" strokeWidth={2} />
    <circle cx={15} cy={0} r={8} fill="#5A3B26" stroke="#2B1C12" strokeWidth={2} />
    <path d="M 20 -5 Q 28 -14 32 -12 M 20 5 Q 28 14 32 12" stroke="#3B2A1E" strokeWidth={2.5} fill="none" strokeLinecap="round" />
    {/* the ant skin (made head up, 55 x 96): turned to walk to the right, at its own aspect */}
    <g transform="rotate(90)"><Skin name="ant" x={-19} y={-33} w={38} h={66} /></g>
  </g>
);
/* the Tenths lens: a round glass 90 across with a handle, drawn round its centre */
const sqLens = (inner: any, k?: any) => (
  <g key={k} pointerEvents="none">
    <line x1={-32} y1={32} x2={-50} y2={50} stroke="#4A382A" strokeWidth={14} strokeLinecap="round" />
    <line x1={-32} y1={32} x2={-50} y2={50} stroke="#6E5542" strokeWidth={10} strokeLinecap="round" />
    <circle r={45} fill="#EAF6FB" fillOpacity={0.92} stroke="#5B6770" strokeWidth={7} filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.18))" />
    <path d="M -28 -22 A 34 34 0 0 1 -6 -36" stroke="#FFFFFF" strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.8} />
    {inner}
  </g>
);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly + bigPad: 1472 x 520 with the panel shut, 900 x 520 open. Everything is laid out inside one 900-wide frame
   (ox = its left edge: centred when the panel is shut, 0 when it is open), so the picture never runs under the panel and
   the top row stays left of box.key. The figure lies in x 0..520 of the frame, the working lines in x 560..900, the one
   act key at the bottom centre (y 424). */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const bw = box ? box.w : 1472;
  const warmOn = !free && (stage === "demo" || stage === "teach") && !!(MODEL.warm && MODEL.warm[n]);
  /* WHERE THE FIGURE STANDS (the owner, 2026-11-17): while no working card is drawn it does NOT move when the keypad opens or
     shuts: one place, OX_STILL, where the paper and the act key beside it keep 12+ clear of the open pad (work x 916). Only a shown
     card with the pad open moves it left (to 0), in a quick slide, and the card is drawn once the figure has arrived. */
  /* the owner (17:35): the visible group (paper 468 + 12 + the act key's slot 280 = 760; a given line and the Laps chip stay inside
     that slot) is CENTRED in the free room left of the open pad (work x 0..916): equal margins, 78 each */
  const GROUP_W = 468 + 24 + 280 + 8, OX_STILL = Math.round((916 - GROUP_W) / 2);   /* 24: the key (and its invite ring) 12+ clear of the paper; + 8: the ring's ink, so the INK margins match */
  const [cardSt, setCardSt] = useState(false);
  /* a shown card stays (2026-11-17): in a real question the card's place (ox 0) holds pad open OR shut, until the card is gone */
  const oxTarget = free || warmOn ? (cardSt && box && box.open ? Math.round(Math.max(0, Math.min((bw - 900) / 2, OX_STILL))) : OX_STILL) : cardSt ? 0 : OX_STILL;
  const [oxA, setOxA] = useState<any>(null);
  useEffect(() => {
    if (oxA === null || reducedMotion()) { if (oxA !== oxTarget) setOxA(oxTarget); return; }
    if (Math.abs(oxA - oxTarget) < 1.5) { if (oxA !== oxTarget) setOxA(oxTarget); return; }
    const id = setTimeout(() => setOxA((a: number) => (a === null ? oxTarget : a + (oxTarget - a) * 0.4)), 16);
    return () => clearTimeout(id);
  }, [oxTarget, oxA]);
  const ox = oxA === null ? oxTarget : Math.round(oxA);
  const oxArrived = Math.abs(ox - oxTarget) < 2;
  /* free play: a square or a triangle, its side made longer, laps walked */
  const [fr, setFr] = useState<any>({ shape: "sq", k: 12, laps: 0, pt: 0, going: "" });
  const it: any = free ? (fr.shape === "sq" ? { kind: "sq", side: fr.k } : { kind: "tri", sides: [fr.k, fr.k + 2, fr.k + 4], units: ["cm", "cm", "cm"] })
    : warmOn ? MODEL.warm[n] : item || {};

  /* the board is keyed to the ENTRY of a question (PATTERNS §18): a new key, a fresh board */
  const qk = free ? "free" : warmOn ? n + ".w" : n + "." + index;
  const ent = useRef({ qk: "", c: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, c: ent.current.c + 1 };
  const ek = qk + "#" + ent.current.c;
  const ekRef = useRef(ek);
  ekRef.current = ek;
  const fresh = (e: string) => ({ ek: e, done: 0, pt: 0, going: "" });
  const [raw, setRaw] = useState<any>(fresh(""));
  const s = free ? { ek, done: 0, pt: fr.pt, going: fr.going } : raw.ek === ek ? raw : fresh(ek);
  const put = (patch: any, at: string) => setRaw((p: any) => (ekRef.current !== at ? p : { ...(p.ek === at ? p : fresh(at)), ...patch }));

  const seq = sqSeq(it);
  const next = free ? null : seq[s.done] || null;
  const busy = useRef(false);
  const touched = useRef(false);
  const lastKey = useRef(0);

  /* the traceback: shown from the miss until the child types again (a demo-only layer; the child's own board is untouched) */
  const [tb, setTb] = useState<any>({ ek: "", k: 0 });
  /* owner 2026-11-17: misses 1 and 2 draw NO correction (only the bubble hint); owner 2026-11-18: the 3rd miss and later play the
     traceback, which ends on the whole working card with the result and stays until the next question (a shown card) */
  const tbOn = !free && !warmOn && tb.ek === ek;

  /* ── the geometry, one function for the acts and the drawing ──
     The squared paper is x ox..ox+468, y 0..512; the working-lines card x ox+480..900, y 0..410, the act key under it. Every label
     is laid out from its measured width (the longest language is the one on show) and clamped 12+ inside the paper. */
  const PX = ox, PW = 468, PH = free ? 408 : 512;           /* free play: the paper ends above its key row */
  const CX = ox + 498, CW = 383, LFS = 40, ROW = 57;
  const rowY = (r: number) => 40 + ROW * r;
  const KW = 280, KH = 84, KY = 424, KX = ox + 492;     /* the act key beside the paper, its ring 12+ clear of it (under the card's left when a card shows) */
  const NFS = 44, UFS = T.label;                         /* a side label: its number 44, its unit 32 */
  const inW = (t: string) => sqW(t, NFS) * 1.08;         /* a one-line label (top or bottom of a side); the estimate made safe for hi/gu ink */
  const stW = (num: string, un: string) => Math.max(sqW(num, NFS), sqW(un, UFS)) * 1.12;   /* a stacked label (number over unit) */
  const GAP = 26, IN = 20, LH = 52, SH = 88;             /* label gap from a line, inset from the paper, one-line and stacked label heights */
  const clampX = (x: number, w: number) => Math.max(PX + IN + w / 2, Math.min(PX + PW - IN - w / 2, x));
  const clampY = (y: number, h: number) => Math.max(12 + h / 2, Math.min(PH - 12 - h / 2, y));
  const isPathK = it.kind === "path";
  const band = isPathK ? 24 : 0;
  const sqUnit = isPathK ? tx("m") : tx("cm");
  const sqNum = String(it.side);
  const wv = stW(sqNum, sqUnit), wh = inW(sqNum + " " + sqUnit);
  const S0 = Math.min(PW - 2 * (IN + GAP + wv), PH - 2 * (IN + GAP + LH)), S = S0 - 2 * band;
  const sx = PX + (PW - S) / 2, sy = (PH - S) / 2;
  const sqC = [{ x: sx, y: sy + S }, { x: sx + S, y: sy + S }, { x: sx + S, y: sy }, { x: sx, y: sy }];          /* BL BR TR TL: the walk */
  /* bottom, right, top, left: one-line labels top and bottom, stacked ones at the sides; st = stacked */
  const sqLab = [
    { x: clampX(sx + S / 2, wh), y: sy + S + band + GAP + LH / 2, st: false, w: wh },
    { x: clampX(sx + S + band + GAP + wv / 2, wv), y: sy + S / 2, st: true, w: wv },
    { x: clampX(sx + S / 2, wh), y: sy - band - GAP - LH / 2, st: false, w: wh },
    { x: clampX(sx - band - GAP - wv / 2, wv), y: sy + S / 2, st: true, w: wv },
  ];
  const labC = (i: number) => ({ x: sqLab[i].x, y: sqLab[i].y });
  const lensAt = { x: sqLab[0].x, y: sqLab[0].y }, lensRest = { x: PX + PW - 64, y: PH - 74 };   /* the handle's tip 12+ above the paper's edge */
  /* the triangle from its three sides (in cm), as big as the paper allows once its labels have room */
  const tri = (() => {
    if (it.kind !== "tri") return null;
    const L = it.sides.map((v: number, i: number) => (it.units[i] === "m" ? v * 100 : v));
    const lab0 = it.sides.map((v: number, i: number) => ({ n: String(v), u: tx(it.units[i]) }));
    const cx = (L[0] * L[0] + L[2] * L[2] - L[1] * L[1]) / (2 * L[0]);
    const cy = Math.sqrt(Math.max(0, L[2] * L[2] - cx * cx));
    const minX = Math.min(0, cx), maxX = Math.max(L[0], cx);
    /* one layout at scale k: the corners and each label box, unclamped, with the bounds of them all */
    const build = (k: number) => {
      const P = [{ x: -minX * k, y: 0 }, { x: (L[0] - minX) * k, y: 0 }, { x: (cx - minX) * k, y: -cy * k }];
      const G = { x: (P[0].x + P[1].x + P[2].x) / 3, y: (P[0].y + P[1].y + P[2].y) / 3 };
      /* the ant stands on every corner (34 either side, 38 above): its ink counts in the bounds, so it stays 20 inside the paper */
      let x0 = Math.min(...P.map((q) => q.x)) - 34, x1 = Math.max(...P.map((q) => q.x)) + 34, y0 = Math.min(...P.map((q) => q.y)) - 38, y1 = 26;
      const lab = [0, 1, 2].map((i) => {
        const a = P[i], b = P[(i + 1) % 3];
        const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        let nx = -(b.y - a.y), ny = b.x - a.x;
        const d = Math.hypot(nx, ny) || 1; nx /= d; ny /= d;
        if (nx * (m.x - G.x) + ny * (m.y - G.y) < 0) { nx = -nx; ny = -ny; }
        const st = Math.abs(ny) < 0.7, w = st ? stW(lab0[i].n, lab0[i].u) : inW(lab0[i].n + " " + lab0[i].u), h = st ? SH : LH;
        const off = GAP + Math.abs(nx) * w / 2 + Math.abs(ny) * h / 2;
        const L1 = { x: m.x + nx * off, y: m.y + ny * off, st, w, h, n: lab0[i].n, u: lab0[i].u };
        x0 = Math.min(x0, L1.x - w / 2); x1 = Math.max(x1, L1.x + w / 2); y0 = Math.min(y0, L1.y - h / 2); y1 = Math.max(y1, L1.y + h / 2);
        return L1;
      });
      return { P, lab, x0, x1, y0, y1 };
    };
    let k = Math.min((PW - 2 * IN) / (maxX - minX), (PH - 2 * IN) / Math.max(1, cy)), g = build(k);
    for (let j = 0; j < 40 && (g.x1 - g.x0 > PW - 2 * IN || g.y1 - g.y0 > PH - 2 * IN); j++) { k *= 0.96; g = build(k); }
    const dx = PX + (PW - (g.x1 - g.x0)) / 2 - g.x0, dy = (PH - (g.y1 - g.y0)) / 2 - g.y0;
    const P = g.P.map((q: any) => ({ x: q.x + dx, y: q.y + dy }));
    const lab = g.lab.map((q: any) => ({ ...q, x: q.x + dx, y: q.y + dy }));
    return { P, lab };
  })();
  /* the rectangle, drawn to scale; its perimeter string lies 12 outside it, its breadth label stacked to the right */
  const rect = (() => {
    if (it.kind !== "rect") return null;
    const len = it.per / 2 - it.br, wb = stW(String(it.br), tx(it.u));
    const bx0 = PX + IN + 24, bx1 = PX + PW - (IN + wb + 16 + 11 + 12), by0 = IN + LH + GAP + 12, by1 = PH - (IN + 30 + 14 + 12);
    const k = Math.min((bx1 - bx0) / len, (by1 - by0) / it.br);
    const w = len * k, h = it.br * k, x = bx0 + (bx1 - bx0 - w) / 2, y = by0 + (by1 - by0 - h) / 2, d = 12;
    return { w, h, x, y, wb, o: { tl: { x: x - d, y: y - d }, tr: { x: x + w + d, y: y - d }, br: { x: x + w + d, y: y + h + d }, bl: { x: x - d, y: y + h + d } } };
  })();
  const fld = { x: PX + 34, y: 96, w: PW - 68, h: 300 };
  const fldC = [{ x: fld.x + 60, y: fld.y + fld.h - 20 }, { x: fld.x + fld.w - 60, y: fld.y + fld.h - 20 }, { x: fld.x + fld.w - 60, y: fld.y + 20 }, { x: fld.x + 60, y: fld.y + 20 }];

  /* where the ant rests: the corner after the sides walked */
  const corners = it.kind === "tri" && tri ? tri.P : it.kind === "field" ? fldC : sqC;

  /* ── the acts: each performed on screen through api.act, the board changes as it ends ── */
  const actFor = (on: string, at: string): any => {
    const up = (i: number) => (free ? setFr((p: any) => ({ ...p, pt: i + 1 })) : put({ pt: i + 1 }, at));
    if (on === "copy") {
      const chip = (
        <g pointerEvents="none"><rect x={-60} y={-26} width={120} height={52} rx={14} fill={tint(SQ_BLUE, 0.85)} stroke={SQ_BLUE} strokeWidth={3} filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.15))" />
          <text y={8} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={shade(SQ_BLUE, 0.25)}>{it.side + " " + tx("cm")}</text></g>
      );
      return { tool: "hand", moves: "carry", from: labC(0), at: [labC(1), labC(2), labC(3)], hold: chip, onPoint: up, ms: 1050 };
    }
    if (on === "times") return { tool: "hand", moves: "sweep", from: labC(1), at: [labC(1), labC(2), labC(3), labC(0)], to: { x: CX + 120, y: rowY(0) - 14 }, onPoint: up, ms: 1050 };
    if (on === "walk") {
      const k = free ? 0 : s.done % 3;
      return { tool: "hand", moves: "carry", from: corners[k], at: [corners[(k + 1) % 3]], hold: sqAnt(), onPoint: up };
    }
    if (on === "halve" && rect) return { tool: "hand", moves: "push", from: rect.o.tl, at: [rect.o.tr, rect.o.br], onPoint: up };
    if (on === "take" && rect) {
      const bar = <line x1={0} y1={-Math.min(rect.h, 120) / 2} x2={0} y2={Math.min(rect.h, 120) / 2} stroke={SQ_VERM} strokeWidth={10} strokeLinecap="round" pointerEvents="none" />;
      return { tool: "hand", moves: "carry", from: { x: rect.o.tr.x, y: rect.y + rect.h / 2 }, at: [{ x: CX + 80, y: rowY(2) + 30 }], hold: bar, onPoint: up };
    }
    if (on === "lens") return { tool: "hand", moves: "carry", from: lensRest, at: [lensAt], hold: sqLens(null), onPoint: up };
    if (on === "lap") {
      const cs = it.kind === "tri" && tri ? [tri.P[1], tri.P[2], tri.P[0]] : [corners[1], corners[2], corners[3], corners[0]];
      return { tool: "hand", moves: "carry", from: corners[0], at: cs, hold: sqAnt(), onPoint: up, ms: 1050 };
    }
    return null;
  };
  const doAct = (on: string) => {
    if (busy.current) return;
    if (free) {
      if (on === "shape") { setFr((p: any) => ({ ...p, shape: p.shape === "sq" ? "tri" : "sq", laps: 0 })); api.sfx.settle(); return; }
      if (on === "longer") { setFr((p: any) => ({ ...p, k: p.k >= 30 ? 3 : p.k + 1, laps: 0 })); api.sfx.tick(); return; }
    }
    if (!free && on !== next) { if (stage === "demo") api.did(on); return; }
    const at = ekRef.current;
    const o = actFor(on, at);
    if (!o) return;
    busy.current = true;
    if (free) setFr((p: any) => ({ ...p, pt: 0, going: on })); else put({ pt: 0, going: on }, at);
    const d0 = s.done;
    /* read BEFORE the act: was the focus on a control of the working area (a keyboard child)? then it lands on the next control after */
    let hadFocus = false;
    try { const a: any = document.activeElement; hadFocus = !!(a && a.closest && a.closest('[data-zone="work"]')); } catch (e) { hadFocus = false; }
    const refocus = (id: string) => setTimeout(() => {
      try {
        const el: any = (id && document.querySelector('[data-zone="work"] [data-control="' + id + '"]')) || document.querySelector('[data-zone="ask"] [data-control="answer-open"]:not([aria-disabled="true"])');
        if (el && el.focus) el.focus();
      } catch (e) { /* nothing to focus */ }
    }, 80);
    api.act(o).then((ok: boolean) => {
      busy.current = false;
      if (ok && hadFocus) refocus(free ? on : seq[d0 + 1] || "");
      if (free) { setFr((p: any) => ({ ...p, pt: 0, going: "", laps: ok ? p.laps + 1 : p.laps })); if (ok) api.sfx.settle(); return; }
      if (!ok) { put({ pt: 0, going: "" }, at); return; }
      put({ done: d0 + 1, pt: 0, going: "" }, at);
      api.sfx.settle();
      if (stage === "demo" || stage === "teach") api.did(on);
      else if (nudged.current && item && item.say) { nudged.current = false; api.say(item.say); }   /* the question comes back on the act */
    });
  };
  /* the child's own press on the act key (a real touch: it arms the answer gate) */
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    touched.current = true;
    setTouchN((x: number) => x + 1);
    doAct(on);
  };
  const [touchN, setTouchN] = useState(0);
  const nudged = useRef(false);
  /* Enter on a guide step is a real touch too (PATTERNS §19): the physical key only, so toolApi.check() and solve() stay ungated */
  useEffect(() => {
    if (stage !== "demo" || free) return;
    const kd = (e: any) => { if (e.key === "Enter" && e.isTrusted && !e.repeat && sqUser()) { touched.current = true; setTouchN((x: number) => x + 1); } };
    window.addEventListener("keydown", kd, true);
    return () => window.removeEventListener("keydown", kd, true);
  }, [stage, free]);

  /* Enter, the agent's check() and the dev solve() perform the CURRENT guide step */
  api.onEnter(stage === "demo" && stepOn ? () => doAct(stepOn) : null);
  HOOK.demo = () => (stepOn ? doAct(stepOn) : undefined);
  /* the agent: its check() does the question's acts at once (never gated); a decimal is typed whole */
  HOOK.check = stage === "ask" && !free ? () => { if (s.done < seq.length) put({ done: seq.length, pt: 0, going: "" }, ekRef.current); return undefined; } : null;
  HOOK.type = (v: any) => { api.setTyped(String(v)); return true; };

  /* the answer gate (PATTERNS §19): the Answer key and pad wait for the act once the child has touched the board in user mode */
  /* the acts that open the Answer key: all of them, but on a lap question the lens and ONE lap (more laps stay optional) */
  const gateLen = it.kind === "path" ? 2 : it.kind === "field" ? 1 : seq.length;
  const needAct = stage === "ask" && !free && s.done < gateLen;
  const gate = useRef(false);
  const gateEk = useRef("");
  const [gated, setGated] = useState(false);
  useEffect(() => {
    /* a new question (the child's Next, or the host's gotoStep / next / prev): the runtime already released the pad, so the gate starts unarmed */
    if (gateEk.current !== ek) { gateEk.current = ek; gate.current = false; }
    const want = needAct && touched.current && sqUser() && !tbOn;
    /* applied on EVERY run while wanted: an act's own end releases the pad (the action kit), and the gate takes it back at once */
    if (want) { gate.current = true; api.lock(true); setGated(true); }
    else if (gate.current) { gate.current = false; api.lock(false); setGated(false); }
    else setGated(false);
  }, [needAct, touchN, ek, stage, s.done, s.going, tbOn]);
  /* while it is locked, a try at the Answer key, the pad or a digit gets the nudge for the act that waits */
  const nextRef = useRef<any>(null);
  nextRef.current = next;
  const goingRef = useRef("");
  goingRef.current = s.going;
  const sayRef = useRef("");
  sayRef.current = item && item.say ? item.say : "";
  useEffect(() => {
    if (!gated) return;
    /* the nudge names the act that waits; never while an act is running */
    const nudge = () => { const k = nextRef.current; if (k && SQ_NUDGE[k] && !goingRef.current) { nudged.current = true; api.say(SQ_NUDGE[k]); } };
    /* the Hint (bulb) key on a locked question brings the QUESTION back (PATTERNS §19), after the runtime's own press */
    const hint = () => { nudged.current = false; setTimeout(() => { if (sayRef.current) api.say(sayRef.current); }, 120); };
    const onHint = (t: any) => !!(t && t.closest && t.closest('[data-control="again"]'));
    const pd = (e: any) => { const t = e.target; if (onHint(t)) hint(); else if (t && t.closest && t.closest('[data-zone="ask"], [data-zone="pad"], [data-zone="slot"], [data-zone="drawer"]')) nudge(); };
    const kd = (e: any) => { if (!e.isTrusted) return; if (e.key === "Enter" && onHint(e.target)) { hint(); return; } if (/^([0-9.]|Enter)$/.test(e.key)) nudge(); };
    document.addEventListener("pointerdown", pd, true);
    window.addEventListener("keydown", kd, true);
    return () => { document.removeEventListener("pointerdown", pd, true); window.removeEventListener("keydown", kd, true); };
  }, [gated]);

  /* the traceback: lock, redraw the maths in steps ending on the whole right answer, unlock */
  const tbRun = useRef(false);
  const figSteps = it.kind === "sq" ? 4 : it.kind === "tri" ? 3 : it.kind === "rect" ? 2 : it.kind === "path" ? 4 : 1;
  useEffect(() => {
    if (!wrong || !(wrong.tries >= 3) || stage !== "ask" || free || warmOn) return;
    api.lock(true);
    tbRun.current = true;
    const at = ek;
    const K = figSteps + sqLines(true).length;
    setTb({ ek: at, k: 0 });
    tl.run(Array.from({ length: K }, (_, j) => [650, () => setTb({ ek: at, k: j + 1 })]), () => { tbRun.current = false; api.lock(false); });
  }, [wrong]);
  /* a question change stops a correction that is still playing and gives the pad back */
  useEffect(() => () => { tl.stop(); if (tbRun.current) { tbRun.current = false; api.lock(false); } }, [ek]);

  /* the win line, said once at the win */
  const saidWin = useRef("");
  useEffect(() => {
    if (stage === "win" && !free && item && item.win && saidWin.current !== ek) { saidWin.current = ek; api.say(item.win); }
  }, [stage, ek]);

  /* the Hint key on a real question: its first press shows the working steps (kept for this question) */
  const askQ = !free && !warmOn && stage === "ask";
  const [hintEk, setHintEk] = useState<any>({ ek: "", n: 0 });
  useEffect(() => {
    if (!askQ) return;
    const onHint = (t: any) => !!(t && t.closest && t.closest('[data-control="again"]'));
    const bump = () => setHintEk((p: any) => ({ ek: ekRef.current, n: p.ek === ekRef.current ? p.n + 1 : 1 }));
    const pd = (e: any) => { if (onHint(e.target)) bump(); };
    const kd = (e: any) => { if ((e.key === "Enter" || e.key === " ") && onHint(e.target)) bump(); };
    document.addEventListener("pointerdown", pd, true);
    window.addEventListener("keydown", kd, true);
    return () => { document.removeEventListener("pointerdown", pd, true); window.removeEventListener("keydown", kd, true); };
  }, [askQ]);
  const hintOn = askQ && hintEk.ek === ek;
  const hintN = hintOn ? hintEk.n : 0;
  const stepsOf = (L: any[]) => L.map((x: any) => (x.tot ? { t: x.tot } : x));

  /* ── what is on show ── */
  const full = free ? false : tbOn ? tb.k >= figSteps + sqLines(true).length : stage === "win" || stage === "idle" || stage === "summary" || (warmOn && s.done >= seq.length);
  const fd = tbOn || full ? seq.length : s.done;                         /* acts the figure shows done */
  const going = tbOn ? "" : s.going;
  const lit = tbOn ? Math.min(tb.k, figSteps) : full ? figSteps : null;  /* sides lit by the traceback / the win */
  const amber = (k: number) => tbOn && !full && tb.k === k;
  const tbPlay = tbOn && !full;                                           /* the correction is still drawing: no act key */

  /* the working, written as the book writes it (educator + owner 2026-11-17): the FORMULA, then the SUBSTITUTION, then the result.
     { t, c }: c "f" formula, "given" what a question gives (shown before the answer), "ans"/"ans2" the result lines (only after a right
     answer, or at the end of the guide steps). mode: true = all of it; false = the guide steps as acted (a share of the lines per act);
     "given" = a real question before the answer; "steps" = after the Hint key: formula and substitution, never the result */
  function sqLines(mode: any): any[] {
    const W = sqLinesAll();
    const work = W.filter((L: any) => L.c !== "given");
    if (mode === "given") return W.filter((L: any) => L.c === "given");
    if (mode === "steps") return work.filter((L: any) => L.c !== "ans" && L.c !== "ans2");
    if (mode === false) {
      const pre = work.filter((L: any) => L.c !== "ans" && L.c !== "ans2");
      return pre.slice(0, Math.ceil((pre.length * Math.min(s.done, seq.length)) / Math.max(1, seq.length)));
    }
    return work;
  }
  function sqLinesAll(): any[] {
    const u = (x: string) => tx(x);
    const NB = "\u00A0";                                  /* a number and its unit never part across rows */
    if (it.kind === "sq") {
      const a = it.side;
      return [{ t: `${u("Perimeter of a square")} = 4 × ${u("side")}`, c: "f" }, { t: `= 4 × ${a}${NB}${u("cm")}` }, { t: `= ${4 * a}${NB}${u("cm")}`, c: "ans" }];
    }
    if (it.kind === "tri") {
      const same = it.units.every((x: string) => x === it.units[0]);
      const cm = it.sides.map((v: number, i: number) => (it.units[i] === "m" ? v * 100 : v));
      const sum = cm.reduce((a: number, b: number) => a + b, 0);
      const f = { t: `${u("Perimeter")} = ${u("sum of the sides")}`, c: "f" };
      if (same) return [f, { t: `= ${it.sides.join(" + ")}` }, { t: `= ${sum}${NB}${u(it.units[0])}`, c: "ans" }];
      return [f, { t: `= ${it.sides.map((v: number, i: number) => `${v}${NB}${u(it.units[i])}`).join(" + ")}` }, { t: `= ${cm.join(" + ")}` }, { t: `= ${sum}${NB}${u("cm")}`, c: "ans" }];
    }
    if (it.kind === "rect") {
      const P = it.per, B = it.br, H = P / 2, len = H - B, U = u(it.u), Lw = u("length");
      return [{ t: `${u("Perimeter")} ${P}${NB}${U}`, c: "given" },
        { t: `${u("Perimeter")} = 2 × (${Lw} + ${u("breadth")})`, c: "f" }, { t: `${P} = 2 × (${Lw} + ${B})` },
        { t: `${Lw} = ${P} ÷ 2 − ${B}` }, { t: `= ${H} − ${B}` }, { t: `= ${len}${NB}${U}`, c: "ans" }];
    }
    if (it.kind === "path") {
      const t = sqTenths(it.side), N = it.laps, Tt = N * 4 * t, tn = u("tenths");
      return [{ t: `${u("Distance")} = 4 × ${u("side")} × ${u("laps")}`, c: "f" }, { t: `= 4 × ${it.side}${NB}${u("m")} × ${N}` },
        { t: `= 4 × ${t}${NB}${tn} × ${N}` }, { t: `= ${Tt}${NB}${tn}`, c: "ans2" }, { t: `= ${sqMetres(Tt)}${NB}${u("m")}`, c: "ans" }];
    }
    if (it.kind === "field") {
      return [{ t: `1${NB}${u("lap")} = ${it.lap}${NB}${u("m")}`, c: "given" },
        { t: `${u("Distance")} = 1${NB}${u("lap")} × ${u("laps")}`, c: "f" }, { t: `= ${it.lap}${NB}${u("m")} × ${it.laps}` }, { t: `= ${it.laps * it.lap}${NB}${u("m")}`, c: "ans" }];
    }
    return [];
  }
  /* owner 2026-11-17: in a REAL question the acts only light the figure; the working shows at the right answer, or its steps
     (no total) once the Hint key is pressed; the guide steps keep the whole working */
  /* the traceback (3rd miss on) writes the card a line at a time after the sides light, never fewer lines than the Hint key showed
     (so the card, once in, never leaves and the figure slides once) */
  const tbLines = () => sqLines(true).slice(0, Math.max(1, tb.k - figSteps + 1, hintOn ? Math.min(1 + hintN, sqLines("steps").length) : 0));
  const lines = free ? [] : full ? sqLines(true) : warmOn ? sqLines(false) : tbOn ? tbLines() : hintOn ? stepsOf(sqLines("steps")).slice(0, 1 + hintN) : sqLines("given");
  const inkOf = (c: any) => (c === "given" || c === "conv" ? shade(SQ_BLUE, 0.25) : c === "ans" || c === "ans2" ? shade(SQ_GREEN, 0.25) : c === "amber" ? shade(SQ_AMBER, 0.35) : C.ink);

  /* what the host and the agent read back (toolApi.getState): never the answer before it is given */
  const lapsNow = it.kind === "path" ? Math.max(0, fd - 1) : it.kind === "field" ? fd : free ? fr.laps : 0;
  api.share({ phase: n, acts_done: fd, acts: seq.length, laps: lapsNow, halved: it.kind === "rect" && fd >= 1, breadth_taken: it.kind === "rect" && fd >= 2,
    working_shown: lines.some((L: any) => L.c !== "given"), complete: stage === "idle" });

  /* ── drawing helpers (called, never mounted) ── */
  const label = (x: number, y: number, t: string, o: any = {}) => (
    <text key={o.k} x={x} y={y} textAnchor={o.a || "start"} dominantBaseline="central" fontSize={o.fs || T.prompt} fontWeight={o.w || 700} fill={o.fill || C.ink}
      stroke={SQ_WARM} strokeWidth={o.halo === false ? 0 : 6} paintOrder="stroke" strokeLinejoin="round">{t}</text>
  );
  /* a working line (an equation is one label, not a sentence): its terms set apart by a small gap, not by spaces */
  const eq = (x: number, y: number, t: string, o: any = {}) => {
    const fs = o.fs || T.prompt;
    return (
      <text key={o.k} data-est={Math.round(sqW(t, fs))} x={x} y={y} dominantBaseline="central" fontSize={fs} fontWeight={700} fill={o.fill || C.ink} stroke={SQ_WARM} strokeWidth={6} paintOrder="stroke" strokeLinejoin="round">
        {t.split(" ").map((w, j) => <tspan key={j} dx={j ? fs * 0.26 : 0}>{w}</tspan>)}
      </text>
    );
  };
  /* a side label: one line (top, bottom) or stacked, number over unit (left, right), centred on x, y */
  const sideLab = (x: number, y: number, num: string, un: string, st: boolean, fill: string, k: any) => (st
    ? <g key={k}>{label(x, y - 20, num, { a: "middle", fs: NFS, fill })}{label(x, y + 27, un, { a: "middle", fs: UFS, fill })}</g>
    : label(x, y, num + " " + un, { k, a: "middle", fs: NFS, fill }));
  const boundaryCap = (x: number, y: number, op = 1) => <g key="bnd" opacity={op}>{label(x, y, tx("Boundary"), { a: "middle", fs: T.micro, w: 600, fill: shade(SQ_VERM, 0.3) })}</g>;
  const seg = (a: any, b: any, col: string, w: number, k: any, op = 1) => <line key={k} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={col} strokeOpacity={op} strokeWidth={w} strokeLinecap="round" />;
  const paper = () => {
    /* a faint hairline backdrop: its cells are not centimetres, so nothing on it invites counting */
    const g = [];
    for (let x = PX + 24; x < PX + PW - 4; x += 30) g.push(<line key={"v" + x} x1={x} y1={4} x2={x} y2={PH - 4} stroke={tint(C.rule, 0.78)} strokeWidth={1} />);
    for (let y = 24; y < PH - 4; y += 30) g.push(<line key={"h" + y} x1={PX + 4} y1={y} x2={PX + PW - 4} y2={y} stroke={tint(C.rule, 0.78)} strokeWidth={1} />);
    return (
      <g pointerEvents="none">
        <rect x={PX} y={0} width={PW} height={PH} rx={16} fill="#FFFDF8" stroke={C.rule} strokeWidth={2} filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.06))" />
        {g}
      </g>
    );
  };

  const drawSquare = () => {
    const isPath = it.kind === "path";
    const u = isPath ? tx("m") : tx("cm");
    const v = isPath ? it.side : it.side;
    /* sides labelled: the given one, then the copies (all at once for a path, whose sides are all given) */
    const labelled = (i: number) => isPath || free || i === 0 || fd >= 1 || (going === "copy" && s.pt >= i);
    /* sides lit vermilion: the walk of Times 4, a lap, the traceback or the win */
    const litN = lit !== null ? lit : isPath ? (fd >= 2 ? 4 : going === "lap" ? s.pt : 0) : free ? (going === "lap" ? s.pt : fr.laps > 0 ? 4 : 0) : fd >= 2 ? 4 : going === "times" ? s.pt : 0;
    const lensOn = isPath && (fd >= 1 || (tbOn && tb.k >= 0)) && going !== "lens";
    const antAt = going === "lap" ? null : corners[0];
    return (
      <g>
        {isPath && <rect x={sx - band} y={sy - band} width={S + 2 * band} height={S + 2 * band} rx={8} fill="#D8C29A" stroke={shade("#D8C29A", 0.45)} strokeWidth={3} filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" />}
        {/* the path skin: one earth strip a side, laid along the side (the plain band under it is the fallback) */}
        {isPath && [0, 1, 2, 3].map((i) => {
          const a = sqC[i], b = sqC[(i + 1) % 4];
          const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
          return <g key={"pk" + i} transform={`translate(${(a.x + b.x) / 2},${(a.y + b.y) / 2}) rotate(${ang})`}><Skin name="path" x={-(S + 2 * band) / 2} y={-band} w={S + 2 * band} h={2 * band} /></g>;
        })}
        <rect x={sx + band} y={sy + band} width={S - 2 * band} height={S - 2 * band} fill={isPath ? "#A9D8EA" : SQ_WARM} stroke={isPath ? shade("#A9D8EA", 0.4) : C.ink} strokeWidth={isPath ? 3 : 0} />
        {!isPath && <rect x={sx} y={sy} width={S} height={S} rx={4} fill="none" stroke={C.ink} strokeWidth={5} />}
        {[0, 1, 2, 3].filter((i) => i < litN).map((i) => seg(sqC[i], sqC[(i + 1) % 4], amber(i + 1) ? SQ_AMBER : SQ_VERM, 10, "lit" + i))}
        {litN > 0 && boundaryCap(sx + S / 2, sy + S - band - (isPath ? 18 : 30))}
        {[0, 1, 2, 3].filter((i) => !(lensOn && i === 0)).map((i) => (labelled(i)
          ? sideLab(sqLab[i].x, sqLab[i].y, String(v), u, sqLab[i].st, shade(SQ_BLUE, 0.25), "lb" + i)
          : <rect key={"lb" + i} x={sqLab[i].x - sqLab[i].w / 2 - 2} y={sqLab[i].y - (sqLab[i].st ? 42 : 26)} width={sqLab[i].w + 4} height={sqLab[i].st ? 84 : 52} rx={12} fill="none" stroke={tint(C.ink, 0.45)} strokeWidth={3} strokeDasharray="8 8" />))}
        {isPath && !lensOn && going !== "lens" && <g transform={`translate(${lensRest.x},${lensRest.y})`}>{sqLens(null)}</g>}
        {isPath && lensOn && (
          <g>
            <g transform={`translate(${lensAt.x},${lensAt.y})`}>{sqLens(<text y={4} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={shade(SQ_AMBER, 0.35)}>{sqTenths(it.side)}</text>)}</g>
            {label(lensAt.x + 56, lensAt.y, tx("tenths"), { fs: T.label, fill: tbOn && !full && tb.k <= 1 ? shade(SQ_AMBER, 0.35) : C.ink })}
          </g>
        )}
        {(isPath || free) && antAt && <g transform={`translate(${antAt.x},${antAt.y})`}>{sqAnt()}</g>}
      </g>
    );
  };

  const drawTri = () => {
    if (!tri) return null;
    const walkedN = lit !== null ? lit : free ? (going === "lap" ? s.pt : fr.laps > 0 ? 3 : 0) : fd;
    const mi = it.units.indexOf("m");
    const antAt = going ? null : free ? tri.P[0] : tri.P[fd % 3];
    return (
      <g>
        <path d={`M ${tri.P[0].x} ${tri.P[0].y} L ${tri.P[1].x} ${tri.P[1].y} L ${tri.P[2].x} ${tri.P[2].y} Z`} fill={SQ_WARM} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.08))" />
        {[0, 1, 2].filter((i) => i < walkedN).map((i) => seg(tri.P[i], tri.P[(i + 1) % 3], i === mi && tbOn && !full && tb.k === 4 ? SQ_AMBER : SQ_VERM, 10, "w" + i))}
        {walkedN > 0 && boundaryCap((tri.P[0].x + tri.P[1].x + tri.P[2].x) / 3, tri.P[0].y - 26)}
        {[0, 1, 2].map((i) => sideLab(tri.lab[i].x, tri.lab[i].y, tri.lab[i].n, tri.lab[i].u, tri.lab[i].st, i === mi && tbOn && tb.k >= 4 ? shade(SQ_AMBER, 0.35) : shade(SQ_BLUE, 0.25), "tl" + i))}
        {antAt && <g transform={`translate(${antAt.x},${antAt.y - 18})`}>{sqAnt()}</g>}
      </g>
    );
  };

  /* one side of the perimeter string: the plain vermilion line, the rope skin over it at the rope's own 9:1 shape
     (200 x 22 pieces laid end to end, a short side one piece scaled whole), the colour code over the rope */
  const rope = (a: any, b: any, col: string, k: any, op = 1) => {
    const L = Math.hypot(b.x - a.x, b.y - a.y), ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    const pcs: any[] = [];
    if (L <= 200) pcs.push({ x: 0, w: L, h: L * 0.11 });
    else { for (let x = 0; x + 200 < L; x += 200) pcs.push({ x, w: 200, h: 22 }); pcs.push({ x: L - 200, w: 200, h: 22 }); }
    return (
      <g key={k} opacity={op} transform={`translate(${a.x},${a.y}) rotate(${ang})`} pointerEvents="none">
        <line x1={0} y1={0} x2={L} y2={0} stroke={col} strokeWidth={10} strokeLinecap="round" />
        {pcs.map((p, j) => <Skin key={j} name="rope" x={p.x} y={-p.h / 2} w={p.w} h={p.h} fit="stretch" />)}
        <line x1={0} y1={0} x2={L} y2={0} stroke={col} strokeOpacity={0.45} strokeWidth={12} strokeLinecap="round" />
      </g>
    );
  };
  const drawRect = () => {
    if (!rect) return null;
    const o = rect.o;
    const halved = fd >= 1 || (tbOn && tb.k >= 1);
    const taken = fd >= 2 || (tbOn && tb.k >= 2);
    const lenGreen = taken;
    return (
      <g>
        <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} fill={SQ_WARM} stroke={C.ink} strokeWidth={5} filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.08))" />
        {/* the string: the whole loop, then its half (one length and one breadth) bright and the other half dimmed */}
        {rope(o.br, o.bl, SQ_VERM, "s3", halved ? 0.5 : 1)}
        {rope(o.bl, o.tl, SQ_VERM, "s4", halved ? 0.5 : 1)}
        {rope(o.tl, o.tr, lenGreen ? SQ_GREEN : SQ_VERM, "s1")}
        {!taken && rope(o.tr, o.br, amber(2) ? SQ_AMBER : SQ_VERM, "s2")}
        {taken && seg({ x: rect.x + rect.w, y: rect.y }, { x: rect.x + rect.w, y: rect.y + rect.h }, SQ_AMBER, 7, "b")}
        {sideLab(o.tr.x + 11 + 16 + rect.wb / 2, rect.y + rect.h / 2, String(it.br), tx(it.u), true, shade(SQ_BLUE, 0.25), "brl")}
        {boundaryCap(rect.x + rect.w / 2, o.bl.y + 12 + 18, halved ? 0.5 : 1)}
        {full
          ? label(rect.x + rect.w / 2, o.tl.y - 11 - 16 - LH / 2, `${it.per / 2 - it.br} ${tx(it.u)}`, { a: "middle", fs: NFS, fill: shade(SQ_GREEN, 0.25) })
          : label(rect.x + rect.w / 2, o.tl.y - 11 - 16 - LH / 2, "?", { a: "middle", fs: NFS })}
      </g>
    );
  };

  const drawField = () => {
    const laps = lapsNow;
    const litOn = lit !== null ? lit > 0 : laps > 0;
    return (
      <g>
        <defs>
          <linearGradient id="field-grass-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#96D178" />
            <stop offset="100%" stopColor="#7CBD5C" />
          </linearGradient>
        </defs>
        <rect x={fld.x} y={fld.y} width={fld.w} height={fld.h} rx={70} fill="url(#field-grass-grad)" stroke={shade("#8CC56F", 0.45)} strokeWidth={4} filter="drop-shadow(0px 4px 8px rgba(0,0,0,0.12))" />
        <rect x={fld.x + 20} y={fld.y + 20} width={fld.w - 40} height={fld.h - 40} rx={52} fill="none" stroke={litOn ? SQ_VERM : "#D8C29A"} strokeWidth={22} />
        {litOn && boundaryCap(fld.x + fld.w / 2, fld.y + fld.h / 2)}
        {going !== "lap" && <g transform={`translate(${fldC[0].x},${fldC[0].y})`}>{sqAnt()}</g>}
      </g>
    );
  };

  /* ── free play: a square or a triangle, a longer side, laps walked (no target) ── */
  const freeLines = () => {
    const sides = it.kind === "sq" ? [it.side, it.side, it.side, it.side] : it.sides;
    const P = sides.reduce((a: number, b: number) => a + b, 0);
    const L = [{ t: sides.join(" + ") }, { t: `1 ${tx("lap")} = ${P} ${tx("cm")}`, c: "ans" }];
    if (fr.laps > 0) L.push({ t: `${fr.laps} × ${P} = ${fr.laps * P} ${tx("cm")}` });
    return L;
  };
  const shownLines = free ? freeLines() : lines;
  /* the working lines' layout. A line stays on ONE row at 40 (a result at up to 60) when it fits; else it breaks after a formula's
     name at " = "; else it shrinks to 34; else it breaks between whole terms (outside a bracket, a number kept with its unit).
     Widths come from the estimate CALIBRATED by the drawn text (measured each render), so no line wraps with room to spare. */
  /* measured again once the font kit has loaded (a canvas measures the fallback face before that) */
  const [fontTick, setFontTick] = useState(0);
  useEffect(() => { let on = true; try { (window as any).document.fonts.ready.then(() => { if (on) setFontTick((x: number) => x + 1); }); } catch (e) { /* no font API */ } return () => { on = false; }; }, []);
  /* the REAL drawn width: an empty, invisible <text> of the same face in this svg measures each word, then is emptied again */
  const measRef = useRef<any>(null);
  const measCache = useRef<any>({});
  useEffect(() => { setFontTick((x: number) => x + 1); }, []);
  /* measured at 40 (a tiny size measures wrong: hinting and the browser's minimum size) and scaled to fs */
  const fitW = (t: string, fs: number) => fitW40(t) * fs / 40;
  const fitW40 = (t: string) => {
    const fs = 40, el = measRef.current, key = fontTick + "|" + lang + "|" + t, c = measCache.current;
    if (!el) return sqW(t, fs);
    if (c[key] !== undefined) return c[key];
    let w = 0;
    try {
      const ws = String(t).split(" ");
      el.setAttribute("font-size", String(fs));
      ws.forEach((x: string) => { el.textContent = x; w += el.getComputedTextLength(); });
      el.textContent = "";
      w += (ws.length - 1) * 0.26 * fs;
    } catch (e) { w = 0; }
    c[key] = w > 0 ? w * 1.02 : sqW(t, fs);
    return c[key];
  };
  const splitEq = (t: string) => { const k = t.indexOf(" = ", 1); return k > 0 ? [t.slice(0, k), t.slice(k + 1)] : [t]; };
  const splitOps = (t: string) => {                         /* the pieces between whole terms: a row ends AFTER an operator, a bracket stays whole */
    const out: string[] = []; let depth = 0, cur = "";
    t.split(" ").forEach((w) => {
      cur = cur ? cur + " " + w : w;
      depth += (w.match(/\(/g) || []).length - (w.match(/\)/g) || []).length;
      if (depth === 0 && /^[+×−÷]$/.test(w)) { out.push(cur); cur = ""; }
    });
    if (cur) out.push(cur);
    return out;
  };
  const oneRowFirst = it.kind === "path" || it.kind === "field";
  const layLine = (t: string, fs0: number, fsMin: number) => {
    if (fitW(t, fs0) <= CW) return { rows: [t], fs: fs0 };
    const one = Math.floor(CW / fitW(t, 1));
    if (one >= Math.max(fsMin, fs0 - 4)) return { rows: [t], fs: one };          /* nearly fits: one row a little smaller */
    if (oneRowFirst && one >= fsMin) return { rows: [t], fs: one };               /* a lap card is short (the chip under it): one row at 34+ */
    const parts = splitEq(t), need = Math.max(...parts.map((q) => fitW(q, 1)));
    if (parts.length > 1 && need * fs0 <= CW) return { rows: parts, fs: fs0 };
    if (one >= fsMin) return { rows: [t], fs: one };
    if (parts.length > 1 && Math.floor(CW / need) >= fsMin) return { rows: parts, fs: Math.floor(CW / need) };
    const rws: string[] = [];
    parts.forEach((q) => {
      let cur = "";
      splitOps(q).forEach((pc) => { const tryL = cur ? cur + " " + pc : pc; if (cur && fitW(tryL, fsMin) > CW) { rws.push(cur); cur = pc; } else cur = tryL; });
      if (cur) rws.push(cur);
    });
    /* each row at its own size, as big as fits (a long unbreakable name may sit a little smaller than the rows under it) */
    return { rows: rws, fs: fs0, fss: rws.map((q) => Math.max(26, Math.min(fs0, Math.floor(CW / (fitW(q, 1) || 1))))) };
  };
  const linesRef = useRef<any>(null);
  /* the answer line is the result: drawn at 56 or more when it fits */
  const ansFs = (t: string) => Math.max(LFS, Math.min(60, Math.floor(CW / (fitW(t, 1) || 1))));
  const rows: any[] = [];
  shownLines.forEach((L: any) => {
    const isAns = L.c === "ans";
    const lay = layLine(L.t, isAns ? ansFs(L.t) : LFS, isAns ? LFS : 34);
    lay.rows.forEach((t: string, k: number) => rows.push({ t, c: L.c, fs: (lay as any).fss ? (lay as any).fss[k] : lay.fs }));
  });
  /* the card is drawn only with working in it; a given line alone stands beside the still figure, fitted to the room left of the
     open pad (it never moves, pad open or shut) */
  const cardWant = rows.some((R: any) => R.c !== "given");
  useEffect(() => { if (cardWant !== cardSt) setCardSt(cardWant); });
  const cardShow = cardWant && cardSt && oxArrived;
  const GIVEN_W = 276;                                   /* inside the act key's slot, so the group stays 760 wide */
  if (!cardWant) rows.forEach((R: any) => { R.fs = Math.max(28, Math.min(LFS, Math.floor(GIVEN_W / (fitW(R.t, 1) || 1)))); });
  /* the rows' pitch: 1.5 em where the card has the room (12+ px of ink between rows with brackets and Indic marks), down to 1.38 em,
     then the rows shrink together; on a lap question the rows stop above the Laps chip (12+ px of ink to it) */
  const chipOn = it.kind === "path" || it.kind === "field" || free;
  const rowsTop = lang === "hi" ? 16 : 10, rowsFoot = chipOn ? 338 : 418;   /* a row's box runs ~20 under its ink: the last row's INK still ends 12+ above the card's foot (410) */
  const sumOf = () => rows.reduce((a: number, R: any) => a + R.fs, 0) || 1;
  const want = lang === "hi" || lang === "gu" ? 1.75 : 1.5;   /* Devanagari and Gujarati marks rise and hang further */
  const avail = rowsFoot - rowsTop;
  /* the pitch first: the rows give up size (never under 34, a result never under 44) before the gaps close */
  if (sumOf() * want > avail) { const f = avail / (sumOf() * want); rows.forEach((R: any) => { const fl = R.c === "ans" ? 44 : 34; R.fs = Math.max(Math.min(R.fs, fl), Math.floor(R.fs * f)); }); }
  /* spare room opens the rows a little more (never shrinks them); not on an English lap card, whose rows already part 17+ and
     whose result row must keep its 33 to the Laps chip */
  let pitch = Math.min(want + (chipOn && lang === "en" ? 0 : 0.15), Math.max(1.38, avail / sumOf()));
  if (sumOf() * pitch > avail) { const f = avail / (sumOf() * pitch); rows.forEach((R: any) => { R.fs = Math.floor(R.fs * f); }); }
  let rowAt = rowsTop;
  rows.forEach((R: any) => { R.y = rowAt + R.fs * pitch / 2; rowAt += R.fs * pitch; });

  /* the act key(s): one at the bottom centre that follows the act; three in free play */
  const keys = free
    ? [{ id: "shape", label: fr.shape === "sq" ? "Triangle" : "Square", x: PX }, { id: "longer", label: SQ_KEYS.longer, x: PX + KW + 16 }, { id: "lap", label: SQ_KEYS.lap, x: PX + 2 * (KW + 16) }]
    : next && (stage === "ask" || warmOn) && !full && !tbPlay ? [{ id: next, label: SQ_KEYS[next], x: KX }] : [];
  const invite = !free && keys.length === 1 && !tbOn && (warmOn ? stepOn === next : needAct);
  const lapsChip = (it.kind === "path" || it.kind === "field") && !free;

  return (
    <g>
      {/* keyOnly: no runs zone; nothing under box.key (everything stays in the 900-wide frame left of it) */}
      {paper()}
      {/* Equation / Working card background on the right */}
      <g pointerEvents="none">
        {cardShow && <rect x={ox + 482} y={0} width={418} height={410} rx={18} fill="#FAF5ED" stroke={C.rule} strokeWidth={2} filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.06))" />}
        {cardShow && <rect x={ox + 482} y={0} width={418} height={410} rx={18} fill="none" stroke="#FFFFFF" strokeWidth={2} opacity={0.6} />}
      </g>
      {it.kind === "sq" || it.kind === "path" ? drawSquare() : it.kind === "tri" ? drawTri() : it.kind === "rect" ? drawRect() : it.kind === "field" ? drawField() : null}
      {/* the working lines (the Sum strip): given blue, the answer green, only after the win or the traceback */}
      <g>
        <text ref={measRef} x={0} y={0} fontWeight={700} fill="none" aria-hidden="true" pointerEvents="none"></text>
        <g ref={linesRef}>{(cardShow || !cardWant) && rows.map((R: any, r: number) => eq(cardWant ? CX : ox + 484, R.y, R.t, { k: "ln" + r, fs: R.fs, fill: inkOf(R.c) }))}</g>
        {lapsChip && label(cardShow ? CX : ox + 484, 370, `${tx("Laps")}: ${lapsNow}`, { k: "laps", fs: LFS })}
        {free && label(cardShow ? CX : ox + 484, 370, `${tx("Laps")}: ${fr.laps}`, { k: "flaps", fs: LFS })}
      </g>
      {invite && <Invite x={keys[0].x + KW / 2} y={KY + KH / 2} w={KW} h={KH} C={C} />}
      {keys.map((b: any, j: number) => (
        <Key key={"act" + j} id={b.id} label={tx(b.label)} x={b.x} y={KY} w={KW} h={KH} C={C} tone="key" onClick={() => pressKey(b.id)}>
          <text y={4} textAnchor="middle" dominantBaseline="central" fontSize={lang === "gu" ? 36 : T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(b.label)}</text>
        </Key>
      ))}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the shape and the number */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  const item = it || (result.last && result.last.it) || {};
  const k = item.kind || "sq";
  const s = h - 24, x = 14, y = 12;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.06))" />
      {k === "tri" ? <path d={`M ${x} ${y + s} L ${x + s * 1.1} ${y + s} L ${x + s * 0.7} ${y} Z`} fill={SQ_WARM} stroke={SQ_VERM} strokeWidth={4} strokeLinejoin="round" />
        : k === "rect" ? <rect x={x} y={y + s * 0.25} width={s * 1.3} height={s * 0.6} rx={4} fill={SQ_WARM} stroke={SQ_VERM} strokeWidth={4} />
        : k === "field" ? <rect x={x} y={y + s * 0.15} width={s * 1.3} height={s * 0.7} rx={s * 0.3} fill="#8CC56F" stroke={SQ_VERM} strokeWidth={4} />
        : <rect x={x} y={y} width={s} height={s} rx={4} fill={k === "path" ? "#A9D8EA" : SQ_WARM} stroke={SQ_VERM} strokeWidth={4} />}
      <text x={w - 16} y={h / 2} textAnchor="end" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={shade(SQ_GREEN, 0.25)}>{String(item.answer !== undefined && item.answer !== null ? item.answer : v) + " " + tx(k === "rect" ? item.u || "cm" : k === "path" || k === "field" ? "m" : "cm")}</text>
    </g>
  );
}

function SquareAndTriangle(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the question and an Answer key on a bar across the top, the working area the
         whole card until the child taps Answer, the answer box and keypad in a panel that slides in from the right */
      board: true,
      /* the pad's point key on every question (PATTERNS §4, the owner's decision): phase 4 types 31.2 */
      pointKey: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16; needs board: true): no question bar, only its blinking key at the top right;
         the working area is 64,108, 1472 x 520 and the key's corner is props.box.key (keep every element out of it); the question lives
         only in the bubble. Opt out (a picture that needs the bar's room) by deleting this line, with the reason in the report. */
      keyOnly: true,
      /* the wide keypad (LAYOUT.md §1b, PATTERNS.md 9g; the owner: "empty space left of the keypad, increase its size"): the answer
         panel is 556 wide and the picture has x 64 to 964 while it is open. Keep it when the picture fits there; set it to false (or
         delete it) when the picture needs the full 1086 width: `check`'s board-fit names what runs under the panel. */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; after a right answer the win picture waits for the child's tap on
         the blinking Next key (the question bar's right end; the classic layout: the answer slot's place). Delete to keep the timers. */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d; stands alone): the phase bar becomes one small clickable dot per phase, no text; a tap starts
         THAT phase, in user and AI mode. Delete this line to keep the bar. */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      /* the keypad colours: leave THEME unset and the image agent's TOOL_THEME (the slot's images.tsx) is picked up by the
         runtime by itself; set THEME here only to override it (docs/IMAGES.md) */
      }} />
  );
}

export default SquareAndTriangle;
