/* ═══ M3.S4.T6.C25.2D1 · measure_columns · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "measure_columns";
const MEDIA_ID = "M3.S4.T6.C25.2D1";
const TOOL_NAME = "Unit Column Adder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["Two measures, stacked in their unit columns."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You added and took away, one unit column at a time.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Work each column with the key, then tap New for another sum.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "What happens when the grams add up to more than 1 kg?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  /* the column frame: kg and g, the book's two weights stacked, and the carry bundle waiting to hop across */
  const vi = shade(UC.unit, 0.25), gi = shade(UC.given, 0.25), X = box.w / 2 - 420;
  const num = (x: number, y: number, t: any, fill: string, a = "end") => <text x={x} y={y} textAnchor={a} fontSize={T.xl} fontWeight={700} fill={fill}>{t}</text>;
  return (
    <g>
      {[[X + 190, 260, "kg"], [X + 470, 300, "g"]].map(([x, w, u]: any) => (
        <g key={u}>
          <rect x={x} y={50} width={w} height={280} rx={18} fill={u === "g" ? tint(UC.now, 0.8) : C.paper} stroke={C.rule} strokeWidth={3} />
          <rect x={x} y={0} width={w} height={52} rx={14} fill={tint(UC.unit, 0.86)} stroke={UC.unit} strokeWidth={2.5} />
          <text x={x + w / 2} y={lang === "hi" ? 41 : 38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={vi}>{tx(u)}</text>
        </g>))}
      {ucGlyph("wt", X, 92, 110, 76, C)}
      {ucGlyph("wt", X, 172, 110, 76, C)}
      {num(X + 420, 150, 3, gi)}{num(X + 740, 150, 650, gi)}
      {num(X + 150, 230, "+", C.ink, "middle")}{num(X + 420, 230, 2, gi)}{num(X + 740, 230, 480, gi)}
      <line x1={X + 120} y1={262} x2={X + 770} y2={262} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      <g transform={`translate(${X + 920},${120})`}>{ucTile("1 " + tx("kg"))}</g>
      <path d={`M ${X + 900} ${80} C ${X + 860} ${30} ${X + 760} ${30} ${X + 700} ${66}`} fill="none" stroke={vi} strokeWidth={4} strokeDasharray="10 8" />
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
    "Unit Column Adder": "मात्रक स्तंभ जोड़",
    "Adding in unit columns": "मात्रक के स्तंभों में जोड़",
    "Adding as decimals": "दशमलव में जोड़",
    "Taking away with a borrow": "उधार लेकर घटाना",
    "A boundary in mixed units": "मिले-जुले मात्रकों में परिमाप",
    "Smaller unit first. Is there a whole metre in there?": "पहले छोटा मात्रक। क्या उसमें पूरा एक मीटर है?",
    "Points in a line. Which unit is the answer in?": "दशमलव बिंदु एक सीध में। उत्तर किस मात्रक में है?",
    "Not enough grams. Break a kilogram.": "ग्राम कम हैं। एक किलोग्राम तोड़ो।",
    "Every side in metres first. Then walk round.": "पहले हर भुजा मीटर में। फिर चारों ओर चलो।",
    "Two measures, stacked in their unit columns.": "दो माप, अपने मात्रक स्तंभों में एक के नीचे एक।",
    "You added and took away, one unit column at a time.": "तुमने एक-एक मात्रक स्तंभ करके जोड़ा और घटाया।",
    "Free play. Work each column with the key, then tap New for another sum.": "मुक्त खेल। बटन से हर स्तंभ हल करो, फिर नए सवाल के लिए नया बटन दबाओ।",
    "What happens when the grams add up to more than 1 kg?": "जब ग्राम जुड़कर 1 किग्रा से ज़्यादा हो जाएँ, तब क्या होता है?",
    "Tap Add to add the grams column first.": "पहले ग्राम का स्तंभ जोड़ने के लिए जोड़ो बटन दबाओ।",
    "The Add key is at the bottom; the smaller unit always goes first.": "जोड़ो बटन नीचे है; छोटा मात्रक हमेशा पहले आता है।",
    "1130 g is more than 1 kg, so tap Bundle.": "1130 ग्रा तो 1 किग्रा से ज़्यादा है, इसलिए बंडल बनाओ बटन दबाओ।",
    "1000 g make 1 kg, so wrap them up.": "1000 ग्रा से 1 किग्रा बनता है, इसलिए उन्हें बाँध लो।",
    "Tap Carry to move the 1 kg over to the kilograms.": "1 किग्रा को किलोग्राम में ले जाने के लिए हासिल बटन दबाओ।",
    "The bundle belongs in the kg column.": "बंडल किग्रा के स्तंभ में जाता है।",
    "Now tap Add to add the kilograms, carry and all.": "अब हासिल समेत किलोग्राम जोड़ने के लिए जोड़ो बटन दबाओ।",
    "Add 3, 2 and the carried 1.": "3, 2 और हासिल का 1 जोड़ो।",
    "Bundle one larger unit out of the smaller column.": "छोटे स्तंभ में से एक बड़े मात्रक का बंडल बनाओ।",
    "Write what is left, then add the larger column with the carry.": "जो बचा उसे लिखो, फिर हासिल के साथ बड़ा स्तंभ जोड़ो।",
    "Add the smaller unit first, and carry when it fills one larger unit.": "पहले छोटा मात्रक जोड़ो, और एक बड़ा मात्रक भर जाए तो हासिल ले जाओ।",
    "You learned: add the smaller unit first, then carry one larger unit.": "तुमने सीखा: पहले छोटा मात्रक जोड़ो, फिर एक बड़ा मात्रक हासिल लो।",
    "How long are two wires of 4 m 65 cm and 2 m 58 cm together?": "4 मी 65 सेमी और 2 मी 58 सेमी के दो तार मिलकर कितने लंबे हैं?",
    "Both wires?": "दोनों तार?",
    "Is there a whole metre in the centimetres?": "क्या सेंटीमीटर में पूरा एक मीटर है?",
    "65 cm and 58 cm make more than 100 cm, so bundle 1 m.": "65 सेमी और 58 सेमी मिलकर 100 सेमी से ज़्यादा हैं, इसलिए 1 मी का बंडल बनाओ।",
    "Write the cm left over, then add 4 m, 2 m and the carried 1 m.": "बचे सेमी लिखो, फिर 4 मी, 2 मी और हासिल का 1 मी जोड़ो।",
    "Yes, the two wires make 7 m 23 cm.": "हाँ, दोनों तार मिलकर 7 मी 23 सेमी हैं।",
    "Add 2 kg 300 g and 1 kg 500 g.": "2 किग्रा 300 ग्रा और 1 किग्रा 500 ग्रा जोड़ो।",
    "Total weight?": "कुल भार?",
    "Do the grams reach 1000 g this time?": "क्या इस बार ग्राम 1000 ग्रा तक पहुँचते हैं?",
    "300 g and 500 g stay under 1000 g, so nothing is carried.": "300 ग्रा और 500 ग्रा मिलकर 1000 ग्रा से कम हैं, इसलिए कोई हासिल नहीं।",
    "Write the grams as they are, then add 2 kg and 1 kg.": "ग्राम जैसे हैं वैसे लिखो, फिर 2 किग्रा और 1 किग्रा जोड़ो।",
    "Yes, 3 kg 800 g, with nothing to carry.": "हाँ, 3 किग्रा 800 ग्रा, बिना किसी हासिल के।",
    "Add 3 km 640 m and 2 km 755 m.": "3 किमी 640 मी और 2 किमी 755 मी जोड़ो।",
    "Total distance?": "कुल दूरी?",
    "Do the metres fill a whole kilometre?": "क्या मीटर मिलकर पूरा एक किलोमीटर बनाते हैं?",
    "640 m and 755 m make more than 1000 m, so carry 1 km.": "640 मी और 755 मी मिलकर 1000 मी से ज़्यादा हैं, इसलिए 1 किमी हासिल लो।",
    "Write the metres left over, then add 3 km, 2 km and the carried 1 km.": "बचे मीटर लिखो, फिर 3 किमी, 2 किमी और हासिल का 1 किमी जोड़ो।",
    "Tap Write to put 3 kg 650 g in kg as a decimal.": "3 किग्रा 650 ग्रा को किग्रा में दशमलव में लिखने के लिए लिखो बटन दबाओ।",
    "Kilograms go before the point.": "किलोग्राम दशमलव बिंदु से पहले आते हैं।",
    "Tap Write again for 2 kg 480 g, point under point.": "2 किग्रा 480 ग्रा के लिए फिर लिखो बटन दबाओ, बिंदु के नीचे बिंदु।",
    "The grams fill three places after the point.": "ग्राम दशमलव बिंदु के बाद तीन स्थान भरते हैं।",
    "Now tap Add to add the two decimals.": "अब दोनों दशमलव संख्याएँ जोड़ने के लिए जोड़ो बटन दबाओ।",
    "Add them like whole numbers, with the point kept in line.": "पूर्ण संख्याओं की तरह जोड़ो, पर दशमलव बिंदु सीध में रहे।",
    "Write each measure as a decimal in the larger unit.": "हर माप को बड़े मात्रक में दशमलव के रूप में लिखो।",
    "Line up the points, then add as with whole numbers.": "दशमलव बिंदु एक सीध में रखो, फिर पूर्ण संख्याओं जैसे जोड़ो।",
    "Line up the points, and the answer is in the larger unit.": "दशमलव बिंदु सीध में रखो, उत्तर बड़े मात्रक में आता है।",
    "You learned: line up the points; the decimal is in the larger unit.": "तुमने सीखा: बिंदु सीध में; दशमलव बड़े मात्रक में होता है।",
    "A jug holds 5 L 340 mL and a bottle 1 L 785 mL; add them as decimals in litres.": "जग में 5 ली 340 मिली, बोतल में 1 ली 785 मिली; लीटर में दशमलव से जोड़ो।",
    "Both in litres?": "दोनों लीटर में?",
    "Write 5 L 340 mL as a decimal in litres first.": "पहले 5 ली 340 मिली को लीटर में दशमलव में लिखो।",
    "Write 1 L 785 mL under it, point under point.": "उसके नीचे 1 ली 785 मिली लिखो, बिंदु के नीचे बिंदु।",
    "Add the rows and keep the point in line; the answer is in litres.": "पंक्तियाँ जोड़ो और बिंदु सीध में रखो; उत्तर लीटर में है।",
    "Yes, 7.125 L, in litres.": "हाँ, 7.125 ली, लीटर में।",
    "Write 3 m 45 cm as a decimal in metres, ready to add.": "जोड़ने के लिए 3 मी 45 सेमी को मीटर में दशमलव में लिखो।",
    "In metres?": "मीटर में?",
    "The whole metres go before the point.": "पूरे मीटर दशमलव बिंदु से पहले आते हैं।",
    "100 cm make 1 m, so the centimetres take two places.": "100 सेमी से 1 मी बनता है, इसलिए सेंटीमीटर दो स्थान लेते हैं।",
    "Write the metres, the point, then the centimetres.": "पहले मीटर, फिर दशमलव बिंदु, फिर सेंटीमीटर लिखो।",
    "Yes, 3 m 45 cm is 3.45 m.": "हाँ, 3 मी 45 सेमी यानी 3.45 मी।",
    "Add 2.450 kg and 1.625 kg with the points in one line.": "2.450 किग्रा और 1.625 किग्रा को बिंदु एक सीध में रखकर जोड़ो।",
    "Total in kg?": "कुल किग्रा में?",
    "Start with the thousandths, as in whole numbers.": "पूर्ण संख्याओं की तरह, सहस्रांश से शुरू करो।",
    "The tenths make 10 tenths, so carry 1 to the ones.": "दशांश मिलकर 10 दशांश बनते हैं, इसलिए 1 हासिल इकाई में ले जाओ।",
    "Keep a zero in the tenths place once its 10 tenths are carried.": "10 दशांश हासिल जाने पर दशांश के स्थान पर शून्य रखो।",
    "120 g is too few to take 450 g away, so tap Break.": "120 ग्रा में से 450 ग्रा नहीं घट सकते, इसलिए तोड़ो बटन दबाओ।",
    "Change one kilogram into grams.": "एक किलोग्राम को ग्राम में बदलो।",
    "Tap Borrow to take 1 kg over as 1000 g.": "1 किग्रा को 1000 ग्रा बनाकर ले जाने के लिए उधार लो बटन दबाओ।",
    "The broken kilogram goes to the g column.": "टूटा किलोग्राम ग्रा के स्तंभ में जाता है।",
    "Tap Take away to take 450 g from 1120 g.": "1120 ग्रा में से 450 ग्रा घटाने के लिए घटाओ बटन दबाओ।",
    "Work the grams column first.": "पहले ग्राम का स्तंभ हल करो।",
    "Tap Take away again for the kilograms.": "किलोग्राम के लिए फिर घटाओ बटन दबाओ।",
    "One kilogram was broken, so 6 kg are left.": "एक किलोग्राम टूटा, इसलिए 6 किग्रा बचे।",
    "Change one larger unit into the smaller unit.": "एक बड़े मात्रक को छोटे मात्रक में बदलो।",
    "Take away the smaller unit first, then the larger.": "पहले छोटा मात्रक घटाओ, फिर बड़ा।",
    "When the smaller unit runs short, break one larger unit first.": "छोटा मात्रक कम पड़े तो पहले एक बड़ा मात्रक तोड़ो।",
    "You learned: when the smaller unit runs short, break a larger one.": "तुमने सीखा: छोटा मात्रक कम पड़े तो एक बड़ा मात्रक तोड़ो।",
    "A drum held 6 kg 240 g of paint and 3 kg 580 g was used; how much is left?": "ड्रम में 6 किग्रा 240 ग्रा पेंट था, 3 किग्रा 580 ग्रा लगा; कितना बचा?",
    "Paint left?": "कितना पेंट बचा?",
    "240 g is too few, so break 1 kg first.": "240 ग्रा कम है, इसलिए पहले 1 किग्रा तोड़ो।",
    "1 kg is 1000 g, so the grams column now has 1240 g.": "1 किग्रा यानी 1000 ग्रा, इसलिए अब ग्राम के स्तंभ में 1240 ग्रा हैं।",
    "Take 580 g from 1240 g, then 3 kg from the 5 kg left.": "1240 ग्रा में से 580 ग्रा घटाओ, फिर बचे 5 किग्रा में से 3 किग्रा।",
    "Yes, 2 kg 660 g of paint is left.": "हाँ, 2 किग्रा 660 ग्रा पेंट बचा है।",
    "Take 1 m 75 cm from 4 m 30 cm.": "4 मी 30 सेमी में से 1 मी 75 सेमी घटाओ।",
    "What is left?": "क्या बचा?",
    "Is 30 cm enough to take 75 cm away?": "क्या 30 सेमी में से 75 सेमी घट सकते हैं?",
    "Break 1 m into 100 cm, so there are 130 cm.": "1 मी को 100 सेमी में तोड़ो, तो 130 सेमी हो जाते हैं।",
    "Take 75 cm from 130 cm, then 1 m from the 3 m left.": "130 सेमी में से 75 सेमी घटाओ, फिर बचे 3 मी में से 1 मी।",
    "Yes, 2 m 55 cm is left.": "हाँ, 2 मी 55 सेमी बचा है।",
    "A roll had 15 m 20 cm of tape and 6 m 85 cm was used; how much is left?": "रोल में 15 मी 20 सेमी टेप था, 6 मी 85 सेमी लगा; कितना बचा?",
    "Tape left?": "कितना टेप बचा?",
    "Break 1 m before you take away the centimetres.": "सेंटीमीटर घटाने से पहले 1 मी तोड़ो।",
    "With 1 m broken, the cm column has 120 cm.": "1 मी तोड़ने पर सेमी के स्तंभ में 120 सेमी हैं।",
    "Take 85 cm from 120 cm, then 6 m from the 14 m left.": "120 सेमी में से 85 सेमी घटाओ, फिर बचे 14 मी में से 6 मी।",
    "Tap the 350 cm card to write it in metres.": "350 सेमी वाले कार्ड को मीटर में लिखने के लिए उसे दबाओ।",
    "Find the side given in centimetres.": "सेंटीमीटर में दी गई भुजा ढूँढो।",
    "Now tap the 3500 mm card to write it in metres.": "अब 3500 मिमी वाले कार्ड को मीटर में लिखने के लिए दबाओ।",
    "Find the side given in millimetres.": "मिलीमीटर में दी गई भुजा ढूँढो।",
    "Every side is in metres now, so tap Walk.": "अब हर भुजा मीटर में है, इसलिए चलाओ बटन दबाओ।",
    "Send the walker round the bed.": "चलने वाले को क्यारी के चारों ओर भेजो।",
    "Rewrite each side card in metres.": "हर भुजा का कार्ड मीटर में फिर से लिखो।",
    "Add every side once all of them are in metres.": "सब भुजाएँ मीटर में होने पर उन्हें जोड़ो।",
    "Write every side in one unit, then add all the sides.": "हर भुजा एक ही मात्रक में लिखो, फिर सब भुजाएँ जोड़ो।",
    "You learned: put every side in one unit before adding the boundary.": "तुमने सीखा: परिमाप जोड़ने से पहले हर भुजा एक मात्रक में लिखो।",
    "Find the boundary in metres of a bed with sides 7 m, 450 cm, 7 m and 4500 mm.": "भुजाएँ 7 मी, 450 सेमी, 7 मी और 4500 मिमी हों तो क्यारी का परिमाप मीटर में बताओ।",
    "Boundary in m?": "परिमाप मी में?",
    "Write the 450 cm side in metres first.": "पहले 450 सेमी वाली भुजा मीटर में लिखो।",
    "1000 mm make 1 m, so 4500 mm is 4.5 m.": "1000 मिमी से 1 मी बनता है, इसलिए 4500 मिमी यानी 4.5 मी।",
    "Add 7 m, 4.5 m, 7 m and 4.5 m.": "7 मी, 4.5 मी, 7 मी और 4.5 मी जोड़ो।",
    "Yes, the walker came home after 23 m.": "हाँ, चलने वाला 23 मी चलकर वापस आ गया।",
    "A rope triangle has sides 3 m, 250 cm and 3500 mm; how far round in metres?": "रस्सी के त्रिभुज की भुजाएँ 3 मी, 250 सेमी और 3500 मिमी हैं; मीटर में परिमाप?",
    "Rope in m?": "रस्सी मी में?",
    "250 cm is not 250 m, so write it in metres.": "250 सेमी का मतलब 250 मी नहीं, इसलिए उसे मीटर में लिखो।",
    "250 cm is 2.5 m, and 3500 mm is 3.5 m.": "250 सेमी यानी 2.5 मी, और 3500 मिमी यानी 3.5 मी।",
    "Add 3 m, 2.5 m and 3.5 m.": "3 मी, 2.5 मी और 3.5 मी जोड़ो।",
    "Yes, the rope goes 9 m round.": "हाँ, रस्सी का परिमाप 9 मी है।",
    "What is the boundary in metres of a card triangle of 60 cm, 0.8 m and 1000 mm?": "60 सेमी, 0.8 मी और 1000 मिमी के कार्ड त्रिभुज का परिमाप मीटर में कितना है?",
    "Card in m?": "कार्ड मी में?",
    "Write 60 cm and 1000 mm in metres before adding.": "जोड़ने से पहले 60 सेमी और 1000 मिमी को मीटर में लिखो।",
    "60 cm is 0.6 m, and 1000 mm is 1 m.": "60 सेमी यानी 0.6 मी, और 1000 मिमी यानी 1 मी।",
    "Add 0.6 m, 0.8 m and 1 m.": "0.6 मी, 0.8 मी और 1 मी जोड़ो।",
    "m": "मी",
    "cm": "सेमी",
    "km": "किमी",
    "mm": "मिमी",
    "kg": "किग्रा",
    "g": "ग्रा",
    "L": "ली",
    "mL": "मिली",
    "Add": "जोड़ो",
    "Bundle": "बंडल बनाओ",
    "Carry": "हासिल",
    "Borrow": "उधार लो",
    "Break": "तोड़ो",
    "Take away": "घटाओ",
    "Write": "लिखो",
    "Walk": "चलाओ",
    "New": "नया",
    "Boundary": "परिमाप",
  },
  gu: {
    "Unit Column Adder": "એકમ સ્તંભનો સરવાળો",
    "Adding in unit columns": "એકમના સ્તંભમાં સરવાળો",
    "Adding as decimals": "દશાંશમાં સરવાળો",
    "Taking away with a borrow": "ઉછીનું લઈને બાદબાકી",
    "A boundary in mixed units": "મિશ્ર એકમોમાં પરિમિતિ",
    "Smaller unit first. Is there a whole metre in there?": "પહેલાં નાનો એકમ. શું તેમાં આખો એક મીટર છે?",
    "Points in a line. Which unit is the answer in?": "દશાંશ ચિહ્ન એક લીટીમાં. જવાબ કયા એકમમાં છે?",
    "Not enough grams. Break a kilogram.": "ગ્રામ ઓછા છે. એક કિલોગ્રામ તોડો.",
    "Every side in metres first. Then walk round.": "પહેલાં દરેક બાજુ મીટરમાં. પછી ચારે બાજુ ચાલો.",
    "Two measures, stacked in their unit columns.": "બે માપ, પોતાના એકમના સ્તંભમાં એક નીચે એક.",
    "You added and took away, one unit column at a time.": "તમે એક એક એકમ સ્તંભ કરીને સરવાળો અને બાદબાકી કરી.",
    "Free play. Work each column with the key, then tap New for another sum.": "મુક્ત રમત. બટનથી દરેક સ્તંભ ગણો, પછી બીજા દાખલા માટે નવું બટન દબાવો.",
    "What happens when the grams add up to more than 1 kg?": "ગ્રામ ઉમેરતાં 1 કિગ્રાથી વધી જાય ત્યારે શું થાય?",
    "Tap Add to add the grams column first.": "પહેલાં ગ્રામનો સ્તંભ ઉમેરવા ઉમેરો બટન દબાવો.",
    "The Add key is at the bottom; the smaller unit always goes first.": "ઉમેરો બટન નીચે છે; નાનો એકમ હંમેશાં પહેલાં આવે.",
    "1130 g is more than 1 kg, so tap Bundle.": "1130 ગ્રા તો 1 કિગ્રાથી વધુ છે, તેથી બંડલ બનાવો બટન દબાવો.",
    "1000 g make 1 kg, so wrap them up.": "1000 ગ્રાથી 1 કિગ્રા બને, તેથી તેમને બાંધી દો.",
    "Tap Carry to move the 1 kg over to the kilograms.": "1 કિગ્રાને કિલોગ્રામમાં લઈ જવા વદી બટન દબાવો.",
    "The bundle belongs in the kg column.": "બંડલ કિગ્રાના સ્તંભમાં જાય છે.",
    "Now tap Add to add the kilograms, carry and all.": "હવે વદી સાથે કિલોગ્રામ ઉમેરવા ઉમેરો બટન દબાવો.",
    "Add 3, 2 and the carried 1.": "3, 2 અને વદીનો 1 ઉમેરો.",
    "Bundle one larger unit out of the smaller column.": "નાના સ્તંભમાંથી એક મોટા એકમનું બંડલ બનાવો.",
    "Write what is left, then add the larger column with the carry.": "જે બાકી રહે તે લખો, પછી વદી સાથે મોટો સ્તંભ ઉમેરો.",
    "Add the smaller unit first, and carry when it fills one larger unit.": "પહેલાં નાનો એકમ ઉમેરો, અને એક મોટો એકમ ભરાય ત્યારે વદી લઈ જાઓ.",
    "You learned: add the smaller unit first, then carry one larger unit.": "તમે શીખ્યા: પહેલાં નાનો એકમ ઉમેરો, પછી એક મોટો એકમ વદી લો.",
    "How long are two wires of 4 m 65 cm and 2 m 58 cm together?": "4 મી 65 સેમી અને 2 મી 58 સેમીના બે તાર મળીને કેટલા લાંબા છે?",
    "Both wires?": "બંને તાર?",
    "Is there a whole metre in the centimetres?": "શું સેન્ટિમીટરમાં આખો એક મીટર છે?",
    "65 cm and 58 cm make more than 100 cm, so bundle 1 m.": "65 સેમી અને 58 સેમી મળીને 100 સેમીથી વધુ છે, તેથી 1 મીનું બંડલ બનાવો.",
    "Write the cm left over, then add 4 m, 2 m and the carried 1 m.": "બાકી સેમી લખો, પછી 4 મી, 2 મી અને વદીનો 1 મી ઉમેરો.",
    "Yes, the two wires make 7 m 23 cm.": "હા, બંને તાર મળીને 7 મી 23 સેમી છે.",
    "Add 2 kg 300 g and 1 kg 500 g.": "2 કિગ્રા 300 ગ્રા અને 1 કિગ્રા 500 ગ્રા ઉમેરો.",
    "Total weight?": "કુલ વજન?",
    "Do the grams reach 1000 g this time?": "શું આ વખતે ગ્રામ 1000 ગ્રા સુધી પહોંચે છે?",
    "300 g and 500 g stay under 1000 g, so nothing is carried.": "300 ગ્રા અને 500 ગ્રા મળીને 1000 ગ્રાથી ઓછા છે, તેથી કોઈ વદી નથી.",
    "Write the grams as they are, then add 2 kg and 1 kg.": "ગ્રામ જેમ છે તેમ લખો, પછી 2 કિગ્રા અને 1 કિગ્રા ઉમેરો.",
    "Yes, 3 kg 800 g, with nothing to carry.": "હા, 3 કિગ્રા 800 ગ્રા, કોઈ વદી વગર.",
    "Add 3 km 640 m and 2 km 755 m.": "3 કિમી 640 મી અને 2 કિમી 755 મી ઉમેરો.",
    "Total distance?": "કુલ અંતર?",
    "Do the metres fill a whole kilometre?": "શું મીટર મળીને આખો એક કિલોમીટર બને છે?",
    "640 m and 755 m make more than 1000 m, so carry 1 km.": "640 મી અને 755 મી મળીને 1000 મીથી વધુ છે, તેથી 1 કિમી વદી લો.",
    "Write the metres left over, then add 3 km, 2 km and the carried 1 km.": "બાકી મીટર લખો, પછી 3 કિમી, 2 કિમી અને વદીનો 1 કિમી ઉમેરો.",
    "Tap Write to put 3 kg 650 g in kg as a decimal.": "3 કિગ્રા 650 ગ્રાને કિગ્રામાં દશાંશમાં લખવા લખો બટન દબાવો.",
    "Kilograms go before the point.": "કિલોગ્રામ દશાંશ ચિહ્નની પહેલાં આવે.",
    "Tap Write again for 2 kg 480 g, point under point.": "2 કિગ્રા 480 ગ્રા માટે ફરી લખો બટન દબાવો, ચિહ્નની નીચે ચિહ્ન.",
    "The grams fill three places after the point.": "ગ્રામ દશાંશ ચિહ્ન પછી ત્રણ સ્થાન ભરે છે.",
    "Now tap Add to add the two decimals.": "હવે બંને દશાંશ સંખ્યા ઉમેરવા ઉમેરો બટન દબાવો.",
    "Add them like whole numbers, with the point kept in line.": "પૂર્ણ સંખ્યાની જેમ ઉમેરો, પણ દશાંશ ચિહ્ન લીટીમાં રહે.",
    "Write each measure as a decimal in the larger unit.": "દરેક માપને મોટા એકમમાં દશાંશ તરીકે લખો.",
    "Line up the points, then add as with whole numbers.": "દશાંશ ચિહ્ન એક લીટીમાં રાખો, પછી પૂર્ણ સંખ્યા જેમ ઉમેરો.",
    "Line up the points, and the answer is in the larger unit.": "દશાંશ ચિહ્ન એક લીટીમાં રાખો, જવાબ મોટા એકમમાં આવે.",
    "You learned: line up the points; the decimal is in the larger unit.": "તમે શીખ્યા: ચિહ્ન એક લીટીમાં; દશાંશ મોટા એકમમાં હોય.",
    "A jug holds 5 L 340 mL and a bottle 1 L 785 mL; add them as decimals in litres.": "જગમાં 5 લિ 340 મિલિ, બોટલમાં 1 લિ 785 મિલિ; લિટરમાં દશાંશથી ઉમેરો.",
    "Both in litres?": "બંને લિટરમાં?",
    "Write 5 L 340 mL as a decimal in litres first.": "પહેલાં 5 લિ 340 મિલિને લિટરમાં દશાંશમાં લખો.",
    "Write 1 L 785 mL under it, point under point.": "તેની નીચે 1 લિ 785 મિલિ લખો, ચિહ્ન નીચે ચિહ્ન.",
    "Add the rows and keep the point in line; the answer is in litres.": "હરોળ ઉમેરો અને ચિહ્ન લીટીમાં રાખો; જવાબ લિટરમાં છે.",
    "Yes, 7.125 L, in litres.": "હા, 7.125 લિ, લિટરમાં.",
    "Write 3 m 45 cm as a decimal in metres, ready to add.": "ઉમેરવા માટે 3 મી 45 સેમીને મીટરમાં દશાંશમાં લખો.",
    "In metres?": "મીટરમાં?",
    "The whole metres go before the point.": "આખા મીટર દશાંશ ચિહ્નની પહેલાં આવે.",
    "100 cm make 1 m, so the centimetres take two places.": "100 સેમીથી 1 મી બને, તેથી સેન્ટિમીટર બે સ્થાન લે.",
    "Write the metres, the point, then the centimetres.": "પહેલાં મીટર, પછી દશાંશ ચિહ્ન, પછી સેન્ટિમીટર લખો.",
    "Yes, 3 m 45 cm is 3.45 m.": "હા, 3 મી 45 સેમી એટલે 3.45 મી.",
    "Add 2.450 kg and 1.625 kg with the points in one line.": "2.450 કિગ્રા અને 1.625 કિગ્રાને ચિહ્ન એક લીટીમાં રાખી ઉમેરો.",
    "Total in kg?": "કુલ કિગ્રામાં?",
    "Start with the thousandths, as in whole numbers.": "પૂર્ણ સંખ્યાની જેમ, સહસ્રાંશથી શરૂ કરો.",
    "The tenths make 10 tenths, so carry 1 to the ones.": "દશાંશ મળીને 10 દશાંશ થાય, તેથી 1 વદી પૂર્ણાંકમાં લઈ જાઓ.",
    "Keep a zero in the tenths place once its 10 tenths are carried.": "10 દશાંશ વદી જાય પછી દશાંશના સ્થાને શૂન્ય રાખો.",
    "120 g is too few to take 450 g away, so tap Break.": "120 ગ્રામાંથી 450 ગ્રા બાદ ન થાય, તેથી તોડો બટન દબાવો.",
    "Change one kilogram into grams.": "એક કિલોગ્રામને ગ્રામમાં ફેરવો.",
    "Tap Borrow to take 1 kg over as 1000 g.": "1 કિગ્રાને 1000 ગ્રા તરીકે લઈ જવા ઉછીનું લો બટન દબાવો.",
    "The broken kilogram goes to the g column.": "તૂટેલો કિલોગ્રામ ગ્રાના સ્તંભમાં જાય.",
    "Tap Take away to take 450 g from 1120 g.": "1120 ગ્રામાંથી 450 ગ્રા બાદ કરવા બાદ કરો બટન દબાવો.",
    "Work the grams column first.": "પહેલાં ગ્રામનો સ્તંભ ગણો.",
    "Tap Take away again for the kilograms.": "કિલોગ્રામ માટે ફરી બાદ કરો બટન દબાવો.",
    "One kilogram was broken, so 6 kg are left.": "એક કિલોગ્રામ તૂટ્યો, તેથી 6 કિગ્રા બાકી.",
    "Change one larger unit into the smaller unit.": "એક મોટા એકમને નાના એકમમાં ફેરવો.",
    "Take away the smaller unit first, then the larger.": "પહેલાં નાનો એકમ બાદ કરો, પછી મોટો.",
    "When the smaller unit runs short, break one larger unit first.": "નાનો એકમ ઓછો પડે ત્યારે પહેલાં એક મોટો એકમ તોડો.",
    "You learned: when the smaller unit runs short, break a larger one.": "તમે શીખ્યા: નાનો એકમ ઓછો પડે તો એક મોટો એકમ તોડો.",
    "A drum held 6 kg 240 g of paint and 3 kg 580 g was used; how much is left?": "ડ્રમમાં 6 કિગ્રા 240 ગ્રા રંગ હતો, 3 કિગ્રા 580 ગ્રા વપરાયો; કેટલો બાકી?",
    "Paint left?": "કેટલો રંગ બાકી?",
    "240 g is too few, so break 1 kg first.": "240 ગ્રા ઓછા છે, તેથી પહેલાં 1 કિગ્રા તોડો.",
    "1 kg is 1000 g, so the grams column now has 1240 g.": "1 કિગ્રા એટલે 1000 ગ્રા, તેથી હવે ગ્રામના સ્તંભમાં 1240 ગ્રા છે.",
    "Take 580 g from 1240 g, then 3 kg from the 5 kg left.": "1240 ગ્રામાંથી 580 ગ્રા બાદ કરો, પછી બાકીના 5 કિગ્રામાંથી 3 કિગ્રા.",
    "Yes, 2 kg 660 g of paint is left.": "હા, 2 કિગ્રા 660 ગ્રા રંગ બાકી છે.",
    "Take 1 m 75 cm from 4 m 30 cm.": "4 મી 30 સેમીમાંથી 1 મી 75 સેમી બાદ કરો.",
    "What is left?": "શું બાકી?",
    "Is 30 cm enough to take 75 cm away?": "શું 30 સેમીમાંથી 75 સેમી બાદ થાય?",
    "Break 1 m into 100 cm, so there are 130 cm.": "1 મીને 100 સેમીમાં તોડો, તો 130 સેમી થાય.",
    "Take 75 cm from 130 cm, then 1 m from the 3 m left.": "130 સેમીમાંથી 75 સેમી બાદ કરો, પછી બાકીના 3 મીમાંથી 1 મી.",
    "Yes, 2 m 55 cm is left.": "હા, 2 મી 55 સેમી બાકી છે.",
    "A roll had 15 m 20 cm of tape and 6 m 85 cm was used; how much is left?": "રોલમાં 15 મી 20 સેમી ટેપ હતી, 6 મી 85 સેમી વપરાઈ; કેટલી બાકી?",
    "Tape left?": "કેટલી ટેપ બાકી?",
    "Break 1 m before you take away the centimetres.": "સેન્ટિમીટર બાદ કરતાં પહેલાં 1 મી તોડો.",
    "With 1 m broken, the cm column has 120 cm.": "1 મી તોડતાં સેમીના સ્તંભમાં 120 સેમી થાય.",
    "Take 85 cm from 120 cm, then 6 m from the 14 m left.": "120 સેમીમાંથી 85 સેમી બાદ કરો, પછી બાકીના 14 મીમાંથી 6 મી.",
    "Tap the 350 cm card to write it in metres.": "350 સેમીવાળું કાર્ડ મીટરમાં લખવા તેને દબાવો.",
    "Find the side given in centimetres.": "સેન્ટિમીટરમાં આપેલી બાજુ શોધો.",
    "Now tap the 3500 mm card to write it in metres.": "હવે 3500 મિમીવાળું કાર્ડ મીટરમાં લખવા દબાવો.",
    "Find the side given in millimetres.": "મિલિમીટરમાં આપેલી બાજુ શોધો.",
    "Every side is in metres now, so tap Walk.": "હવે દરેક બાજુ મીટરમાં છે, તેથી ચલાવો બટન દબાવો.",
    "Send the walker round the bed.": "ચાલનારને ક્યારીની ચારે બાજુ મોકલો.",
    "Rewrite each side card in metres.": "દરેક બાજુનું કાર્ડ મીટરમાં ફરી લખો.",
    "Add every side once all of them are in metres.": "બધી બાજુ મીટરમાં થાય પછી તેમને ઉમેરો.",
    "Write every side in one unit, then add all the sides.": "દરેક બાજુ એક જ એકમમાં લખો, પછી બધી બાજુ ઉમેરો.",
    "You learned: put every side in one unit before adding the boundary.": "તમે શીખ્યા: પરિમિતિ ઉમેરતાં પહેલાં દરેક બાજુ એક એકમમાં લખો.",
    "Find the boundary in metres of a bed with sides 7 m, 450 cm, 7 m and 4500 mm.": "બાજુ 7 મી, 450 સેમી, 7 મી અને 4500 મિમી હોય તો ક્યારીની પરિમિતિ મીટરમાં કહો.",
    "Boundary in m?": "પરિમિતિ મીમાં?",
    "Write the 450 cm side in metres first.": "પહેલાં 450 સેમીવાળી બાજુ મીટરમાં લખો.",
    "1000 mm make 1 m, so 4500 mm is 4.5 m.": "1000 મિમીથી 1 મી બને, તેથી 4500 મિમી એટલે 4.5 મી.",
    "Add 7 m, 4.5 m, 7 m and 4.5 m.": "7 મી, 4.5 મી, 7 મી અને 4.5 મી ઉમેરો.",
    "Yes, the walker came home after 23 m.": "હા, ચાલનાર 23 મી ચાલીને પાછો આવ્યો.",
    "A rope triangle has sides 3 m, 250 cm and 3500 mm; how far round in metres?": "દોરડાના ત્રિકોણની બાજુ 3 મી, 250 સેમી અને 3500 મિમી છે; મીટરમાં પરિમિતિ?",
    "Rope in m?": "દોરડું મીમાં?",
    "250 cm is not 250 m, so write it in metres.": "250 સેમી એટલે 250 મી નહીં, તેથી તેને મીટરમાં લખો.",
    "250 cm is 2.5 m, and 3500 mm is 3.5 m.": "250 સેમી એટલે 2.5 મી, અને 3500 મિમી એટલે 3.5 મી.",
    "Add 3 m, 2.5 m and 3.5 m.": "3 મી, 2.5 મી અને 3.5 મી ઉમેરો.",
    "Yes, the rope goes 9 m round.": "હા, દોરડાની પરિમિતિ 9 મી છે.",
    "What is the boundary in metres of a card triangle of 60 cm, 0.8 m and 1000 mm?": "60 સેમી, 0.8 મી અને 1000 મિમીના કાર્ડ ત્રિકોણની પરિમિતિ મીટરમાં કેટલી?",
    "Card in m?": "કાર્ડ મીમાં?",
    "Write 60 cm and 1000 mm in metres before adding.": "ઉમેરતાં પહેલાં 60 સેમી અને 1000 મિમીને મીટરમાં લખો.",
    "60 cm is 0.6 m, and 1000 mm is 1 m.": "60 સેમી એટલે 0.6 મી, અને 1000 મિમી એટલે 1 મી.",
    "Add 0.6 m, 0.8 m and 1 m.": "0.6 મી, 0.8 મી અને 1 મી ઉમેરો.",
    "m": "મી",
    "cm": "સેમી",
    "km": "કિમી",
    "mm": "મિમી",
    "kg": "કિગ્રા",
    "g": "ગ્રા",
    "L": "લિ",
    "mL": "મિલિ",
    "Add": "ઉમેરો",
    "Bundle": "બંડલ બનાવો",
    "Carry": "વદી",
    "Borrow": "ઉછીનું લો",
    "Break": "તોડો",
    "Take away": "બાદ કરો",
    "Write": "લખો",
    "Walk": "ચલાવો",
    "New": "નવું",
    "Boundary": "પરિમિતિ",
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
    concept: "Adding in unit columns",
    conceptId: "M3.S4.T6.C25", objectiveIds: ["O9"],
    says: ["Smaller unit first. Is there a whole metre in there?"],
    /* the guide steps work the book's own sum (3 kg 650 g + 2 kg 480 g, MODEL.warm[0]), never a question's numbers */
    steps: [
      { say: "Tap Add to add the grams column first.", on: "addsmall", hint: "The Add key is at the bottom; the smaller unit always goes first." },
      { say: "1130 g is more than 1 kg, so tap Bundle.", on: "bundle", hint: "1000 g make 1 kg, so wrap them up." },
      { say: "Tap Carry to move the 1 kg over to the kilograms.", on: "carry", hint: "The bundle belongs in the kg column." },
      { say: "Now tap Add to add the kilograms, carry and all.", on: "addbig", hint: "Add 3, 2 and the carried 1." },
    ],
    stepHold: 1600,
    ladder: ["Bundle one larger unit out of the smaller column.", "Write what is left, then add the larger column with the carry."],
    closing: "Add the smaller unit first, and carry when it fills one larger unit.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: add the smaller unit first, then carry one larger unit.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Works the smaller column, bundles one larger unit and carries it across, then adds the larger column, ending on the whole sum.",
    items: [
      /* learn UC1: answer in the plan = 7 m 23 cm. Plan: Two pieces of wire are 4 m 65 cm and 2 m 58 cm long. How long are they together? */
      { qid: "M3.S4.T6.C25:UC1", kind: "add", op: "+", big: "m", small: "cm", a: [4, 65], b: [2, 58], obj: "wire",
        parts: [{ label: "m" }, { label: "cm" }], answer: [7, 23], near: "6|123",
        say: "How long are two wires of 4 m 65 cm and 2 m 58 cm together?", ask: "Both wires?",
        miss: "Is there a whole metre in the centimetres?",
        ladder: ["65 cm and 58 cm make more than 100 cm, so bundle 1 m.", "Write the cm left over, then add 4 m, 2 m and the carried 1 m."],
        win: "Yes, the two wires make 7 m 23 cm." },
      /* practice 1: answer in the plan = 3 kg 800 g (no carry: the grams stay under 1000 g) */
      { qid: "M3.S4.T6.C25:1", kind: "add", op: "+", big: "kg", small: "g", a: [2, 300], b: [1, 500], obj: "bag",
        parts: [{ label: "kg" }, { label: "g" }], answer: [3, 800], near: "4|800",
        say: "Add 2 kg 300 g and 1 kg 500 g.", ask: "Total weight?",
        miss: "Do the grams reach 1000 g this time?",
        ladder: ["300 g and 500 g stay under 1000 g, so nothing is carried.", "Write the grams as they are, then add 2 kg and 1 kg."],
        win: "Yes, 3 kg 800 g, with nothing to carry." },
      /* practice 4: answer in the plan = 6 km 395 m */
      { qid: "M3.S4.T6.C25:4", kind: "add", op: "+", big: "km", small: "m", a: [3, 640], b: [2, 755], obj: "length",
        parts: [{ label: "km" }, { label: "m" }], answer: [6, 395], near: "5|1395",
        say: "Add 3 km 640 m and 2 km 755 m.", ask: "Total distance?",
        miss: "Do the metres fill a whole kilometre?",
        ladder: ["640 m and 755 m make more than 1000 m, so carry 1 km.", "Write the metres left over, then add 3 km, 2 km and the carried 1 km."] },
    ],
  },
  {
    n: 2,
    concept: "Adding as decimals",
    conceptId: "M3.S4.T6.C26", objectiveIds: ["O9"],
    says: ["Points in a line. Which unit is the answer in?"],
    /* the guide steps write the book's own sum as decimals (3 kg 650 g + 2 kg 480 g, MODEL.warm[1]) */
    steps: [
      { say: "Tap Write to put 3 kg 650 g in kg as a decimal.", on: "write", hint: "Kilograms go before the point." },
      { say: "Tap Write again for 2 kg 480 g, point under point.", on: "write", hint: "The grams fill three places after the point." },
      { say: "Now tap Add to add the two decimals.", on: "add", hint: "Add them like whole numbers, with the point kept in line." },
    ],
    stepHold: 1600,
    ladder: ["Write each measure as a decimal in the larger unit.", "Line up the points, then add as with whole numbers."],
    closing: "Line up the points, and the answer is in the larger unit.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: line up the points; the decimal is in the larger unit.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Writes each measure as a decimal in the larger unit with the points in one line, then adds, ending on the decimal in that unit.",
    items: [
      /* learn UC2: answer in the plan = 7.125 L. Plan: A jug holds 5 L 340 mL and a bottle holds 1 L 785 mL. Add them as decimals in litres. */
      { qid: "M3.S4.T6.C26:UC2", kind: "dec", rows: [{ w: 5, s: 340, big: "L", small: "mL" }, { w: 1, s: 785, big: "L", small: "mL", obj: "bottle" }], sum: true, unit: "L", obj: "jug",
        answer: "7.125", near: "7125",
        say: "A jug holds 5 L 340 mL and a bottle 1 L 785 mL; add them as decimals in litres.", ask: "Both in litres?",
        miss: "Write 5 L 340 mL as a decimal in litres first.",
        ladder: ["Write 1 L 785 mL under it, point under point.", "Add the rows and keep the point in line; the answer is in litres."],
        win: "Yes, 7.125 L, in litres." },
      /* practice 2: answer in the plan = 3.45 m */
      { qid: "M3.S4.T6.C26:2", kind: "dec", rows: [{ w: 3, s: 45, big: "m", small: "cm" }], sum: false, unit: "m", obj: "length",
        answer: "3.45", near: "345",
        say: "Write 3 m 45 cm as a decimal in metres, ready to add.", ask: "In metres?",
        miss: "The whole metres go before the point.",
        ladder: ["100 cm make 1 m, so the centimetres take two places.", "Write the metres, the point, then the centimetres."],
        win: "Yes, 3 m 45 cm is 3.45 m." },
      /* practice 5: answer in the plan = 4.075 kg */
      { qid: "M3.S4.T6.C26:5", kind: "dec", rows: [{ dec: "2.450", big: "kg", small: "g" }, { dec: "1.625", big: "kg", small: "g" }], sum: true, unit: "kg", obj: "bag",
        answer: "4.075", near: "4.75",
        say: "Add 2.450 kg and 1.625 kg with the points in one line.", ask: "Total in kg?",
        miss: "Start with the thousandths, as in whole numbers.",
        ladder: ["The tenths make 10 tenths, so carry 1 to the ones.", "Keep a zero in the tenths place once its 10 tenths are carried."] },
    ],
  },
  {
    n: 3,
    concept: "Taking away with a borrow",
    conceptId: "M3.S4.T6.C27", objectiveIds: ["O10"],
    says: ["Not enough grams. Break a kilogram."],
    /* the guide steps work the book's own take-away (7 kg 120 g - 2 kg 450 g, MODEL.warm[2]).
       Unused: practice 3 (M3.S4.T6.C27:3, "1 kg broken into grams is how many grams?" = 1000 g): the Break act and the unit-fact
       chip on this picture print "1000 g = 1 kg", its answer, and it is not a take-away; three borrows stay. */
    steps: [
      { say: "120 g is too few to take 450 g away, so tap Break.", on: "break", hint: "Change one kilogram into grams." },
      { say: "Tap Borrow to take 1 kg over as 1000 g.", on: "carry", hint: "The broken kilogram goes to the g column." },
      { say: "Tap Take away to take 450 g from 1120 g.", on: "takesmall", hint: "Work the grams column first." },
      { say: "Tap Take away again for the kilograms.", on: "takebig", hint: "One kilogram was broken, so 6 kg are left." },
    ],
    stepHold: 1600,
    ladder: ["Change one larger unit into the smaller unit.", "Take away the smaller unit first, then the larger."],
    closing: "When the smaller unit runs short, break one larger unit first.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: when the smaller unit runs short, break a larger one.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Breaks one larger unit into the smaller unit and carries it across, takes away the smaller column, then the larger, ending on what is left.",
    items: [
      /* learn UC3: answer in the plan = 2 kg 660 g. Plan: A drum held 6 kg 240 g of paint, and 3 kg 580 g was used. How much is left? */
      { qid: "M3.S4.T6.C27:UC3", kind: "sub", op: "-", big: "kg", small: "g", a: [6, 240], b: [3, 580], obj: "drum",
        parts: [{ label: "kg" }, { label: "g" }], answer: [2, 660], near: "3|340",
        say: "A drum held 6 kg 240 g of paint and 3 kg 580 g was used; how much is left?", ask: "Paint left?",
        miss: "240 g is too few, so break 1 kg first.",
        ladder: ["1 kg is 1000 g, so the grams column now has 1240 g.", "Take 580 g from 1240 g, then 3 kg from the 5 kg left."],
        win: "Yes, 2 kg 660 g of paint is left." },
      /* practice 6: answer in the plan = 2 m 55 cm */
      { qid: "M3.S4.T6.C27:6", kind: "sub", op: "-", big: "m", small: "cm", a: [4, 30], b: [1, 75], obj: "length",
        parts: [{ label: "m" }, { label: "cm" }], answer: [2, 55], near: "3|45",
        say: "Take 1 m 75 cm from 4 m 30 cm.", ask: "What is left?",
        miss: "Is 30 cm enough to take 75 cm away?",
        ladder: ["Break 1 m into 100 cm, so there are 130 cm.", "Take 75 cm from 130 cm, then 1 m from the 3 m left."],
        win: "Yes, 2 m 55 cm is left." },
      /* practice 8: answer in the plan = 8 m 35 cm. Plan: A roll had 15 m 20 cm of tape, and 6 m 85 cm was used. How much is left? */
      { qid: "M3.S4.T6.C27:8", kind: "sub", op: "-", big: "m", small: "cm", a: [15, 20], b: [6, 85], obj: "tape",
        parts: [{ label: "m" }, { label: "cm" }], answer: [8, 35], near: "9|65",
        say: "A roll had 15 m 20 cm of tape and 6 m 85 cm was used; how much is left?", ask: "Tape left?",
        miss: "Break 1 m before you take away the centimetres.",
        ladder: ["With 1 m broken, the cm column has 120 cm.", "Take 85 cm from 120 cm, then 6 m from the 14 m left."] },
    ],
  },
  {
    n: 4,
    concept: "A boundary in mixed units",
    conceptId: "M3.S4.T6.C28", objectiveIds: ["O10"],
    says: ["Every side in metres first. Then walk round."],
    /* the guide steps walk the book's own flower bed (4 m, 350 cm, 4 m, 3500 mm = 15 m, MODEL.warm[3]) */
    steps: [
      { say: "Tap the 350 cm card to write it in metres.", on: "side-2", hint: "Find the side given in centimetres." },
      { say: "Now tap the 3500 mm card to write it in metres.", on: "side-4", hint: "Find the side given in millimetres." },
      { say: "Every side is in metres now, so tap Walk.", on: "walk", hint: "Send the walker round the bed." },
    ],
    stepHold: 1600,
    ladder: ["Rewrite each side card in metres.", "Add every side once all of them are in metres."],
    closing: "Write every side in one unit, then add all the sides.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: put every side in one unit before adding the boundary.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Rewrites every side card in metres, walks round lighting each side, and ends on the whole boundary in metres.",
    items: [
      /* learn UC4: answer in the plan = 23 m. Plan: A flower bed has sides of 7 m, 450 cm, 7 m and 4500 mm. What is its boundary in metres? */
      { qid: "M3.S4.T6.C28:UC4", kind: "bound", sides: [{ v: 7, u: "m" }, { v: 450, u: "cm" }, { v: 7, u: "m" }, { v: 4500, u: "mm" }], obj: "bed", unit: "m",
        answer: 23, near: "4964", winMs: 1300,
        say: "Find the boundary in metres of a bed with sides 7 m, 450 cm, 7 m and 4500 mm.", ask: "Boundary in m?",
        miss: "Write the 450 cm side in metres first.",
        ladder: ["1000 mm make 1 m, so 4500 mm is 4.5 m.", "Add 7 m, 4.5 m, 7 m and 4.5 m."],
        win: "Yes, the walker came home after 23 m." },
      /* authored (qid null): the plan has only two questions for this concept and the guide steps use the book's own bed;
         the plan's third rung names "a triangle", so this is a rope triangle in three units */
      { qid: null, kind: "bound", sides: [{ v: 3, u: "m" }, { v: 250, u: "cm" }, { v: 3500, u: "mm" }], obj: "rope", unit: "m",
        answer: 9, near: "3753", winMs: 1300,
        say: "A rope triangle has sides 3 m, 250 cm and 3500 mm; how far round in metres?", ask: "Rope in m?",
        miss: "250 cm is not 250 m, so write it in metres.",
        ladder: ["250 cm is 2.5 m, and 3500 mm is 3.5 m.", "Add 3 m, 2.5 m and 3.5 m."],
        win: "Yes, the rope goes 9 m round." },
      /* practice 7: answer in the plan = 2.4 m, because 0.6 + 0.8 + 1 = 2.4. Plan: A triangle of card has sides of 60 cm, 0.8 m and 1000 mm. What is its boundary in metres? */
      { qid: "M3.S4.T6.C28:7", kind: "bound", sides: [{ v: 60, u: "cm" }, { v: 0.8, u: "m" }, { v: 1000, u: "mm" }], obj: "card", unit: "m",
        answer: "2.4", near: "1060.8", winMs: 1300,
        say: "What is the boundary in metres of a card triangle of 60 cm, 0.8 m and 1000 mm?", ask: "Card in m?",
        miss: "Write 60 cm and 1000 mm in metres before adding.",
        ladder: ["60 cm is 0.6 m, and 1000 mm is 1 m.", "Add 0.6 m, 0.8 m and 1 m."] },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
/* warm = the guide steps' own example per phase (the book's worked sums, p.140 to 142); free = Free play's sums, in turn */
const MODEL = {
  warm: [
    { op: "+", big: "kg", small: "g", a: [3, 650], b: [2, 480], obj: "bag" },
    { rows: [{ w: 3, s: 650, big: "kg", small: "g" }, { w: 2, s: 480, big: "kg", small: "g" }], sum: true, unit: "kg", obj: "bag" },
    { op: "-", big: "kg", small: "g", a: [7, 120], b: [2, 450], obj: "bag" },
    { sides: [{ v: 4, u: "m" }, { v: 350, u: "cm" }, { v: 4, u: "m" }, { v: 3500, u: "mm" }], obj: "bed", unit: "m" },
  ],
  free: [
    { op: "+", big: "kg", small: "g", a: [3, 650], b: [2, 480], obj: "bag" },
    { op: "-", big: "m", small: "cm", a: [5, 40], b: [2, 75], obj: "length" },
    { op: "+", big: "L", small: "mL", a: [2, 750], b: [1, 600], obj: "jug" },
    { op: "-", big: "km", small: "m", a: [9, 200], b: [4, 650], obj: "length" },
    { op: "+", big: "m", small: "cm", a: [6, 35], b: [1, 40], obj: "length" },
  ],
};

/* the chapter's content colours (brief: Look): given deep blue, answer green, move vermilion, unit fact violet, taken away rose,
   worked now amber, a zero holding a place grey; text takes a deeper ink of each */
const UC = { given: "#0072B2", answer: "#009E73", move: "#D55E00", unit: "#7B4FA0", taken: "#CC79A7", now: "#E69F00", hold: "#767676" };
const UC_KIND: any = { m: "len", cm: "len", km: "len", mm: "len", kg: "wt", g: "wt", L: "cap", mL: "cap" };
const UC_FACT: any = { "m|cm": 100, "kg|g": 1000, "km|m": 1000, "L|mL": 1000, "m|mm": 1000 };
const ucF = (big: string, small: string) => UC_FACT[big + "|" + small] || 1000;
/* one key at the bottom centre; its label follows the act (PATTERNS 16c) */
const UC_KEY: any = { addsmall: "Add", bundle: "Bundle", carry: "Carry", addbig: "Add", break: "Break", takesmall: "Take away",
  takebig: "Take away", write: "Write", add: "Add", walk: "Walk", new: "New" };
/* the column working, as the page does it: the smaller unit first, a carry or a borrow of one larger unit */
const ucCol = (ex: any) => {
  const f = ucF(ex.big, ex.small);
  if (ex.op === "+") { const st = ex.a[1] + ex.b[1], c = st >= f ? 1 : 0; return { f, st, c, small: st - c * f, big: ex.a[0] + ex.b[0] + c }; }
  const c = ex.a[1] < ex.b[1] ? 1 : 0, top = ex.a[1] + c * f;
  return { f, c, top, small: top - ex.b[1], big: ex.a[0] - c - ex.b[0] };
};
/* the acts in order, each with the working stage it reaches (0 given, 4 the whole answer) */
const ucSeq = (ex: any) => {
  const c = ucCol(ex).c;
  if (ex.op === "+") return c ? [["addsmall", 1], ["bundle", 2], ["carry", 3], ["addbig", 4]] : [["addsmall", 1], ["addbig", 4]];
  return c ? [["break", 1], ["carry", 2], ["takesmall", 3], ["takebig", 4]] : [["takesmall", 3], ["takebig", 4]];
};
/* decimal rows: a measure written in its larger unit ("5 L 340 mL" -> "5.340"); the places come from the unit fact */
const ucDecOf = (r: any) => (r.dec ? r.dec : r.w + "." + String(r.s).padStart(String(ucF(r.big, r.small)).length - 1, "0"));
const ucPre = (ex: any) => { let k = 0; while (ex.rows && k < ex.rows.length && ex.rows[k].dec) k++; return k; };
const ucDecSeq = (ex: any) => [...ex.rows.map((r: any, i: number) => (r.dec ? null : ["write", i + 1])).filter(Boolean), ...(ex.sum ? [["add", ex.rows.length + 1]] : [])];
/* the decimal sum, column by column on whole thousandths, written with as many places as the rows */
const ucDecSum = (rows: any[]) => {
  const ds = rows.map(ucDecOf), pl = Math.max(...ds.map((d: string) => d.split(".")[1].length));
  const tot = ds.reduce((a: number, d: string) => { const [wp, dp] = d.split("."); return a + Number(wp) * 10 ** pl + Number(dp.padEnd(pl, "0")); }, 0);
  return Math.floor(tot / 10 ** pl) + "." + String(tot % 10 ** pl).padStart(pl, "0");
};
/* a side in metres, and a number as the book writes it (4.5, 0.6, 1) */
const ucSideM = (sd: any) => (sd.u === "m" ? sd.v : sd.u === "cm" ? sd.v / 100 : sd.v / 1000);
const ucNum = (x: number) => String(Math.round(x * 1000) / 1000);
const ucCorners = (N: number, x0: number) => (N === 4
  ? [{ x: x0 + 110, y: 110 }, { x: x0 + 440, y: 110 }, { x: x0 + 440, y: 330 }, { x: x0 + 110, y: 330 }]
  : [{ x: x0 + 280, y: 92 }, { x: x0 + 380, y: 340 }, { x: x0 + 180, y: 340 }]);

/* the thing measured: a sack of rice (a weight), a jug (a capacity), a satin ribbon (a length). The plain shape is the
   fallback; the image pass's skin goes over it in a box of the picture's own shape (images.json: sack 112 x 140, jug 140 x 111) */
function ucGlyph(kind: string, x: number, y: number, w: number, h: number, C: any, obj = "") {
  const cx = x + w / 2, cy = y + h / 2;
  /* a row whose question NAMES another thing (wires, a drum of paint, a roll of tape, a bottle) stays plain: a skin never
     contradicts a name on screen */
  if (obj === "wire") return <path d={`M ${x + 4} ${cy + 10} C ${x + 30} ${cy - 22} ${x + 50} ${cy + 26} ${x + 76} ${cy - 6} S ${x + 100} ${cy - 2} ${x + w - 4} ${cy - 12}`} fill="none" stroke="#B5651D" strokeWidth={6} strokeLinecap="round" />;
  if (obj === "tape") return (
    <g>
      <rect x={cx + 6} y={cy + 12} width={38} height={14} rx={3} fill="#E9DCB5" stroke={C.ink} strokeWidth={2.5} />
      <circle cx={cx - 8} cy={cy} r={28} fill="#E9DCB5" stroke={C.ink} strokeWidth={3} />
      <circle cx={cx - 8} cy={cy} r={11} fill={C.paper} stroke={C.ink} strokeWidth={3} />
    </g>);
  if (obj === "drum") return (
    <g>
      <path d={`M ${cx - 28} ${cy - 26} V ${cy + 26} A 28 9 0 0 0 ${cx + 28} ${cy + 26} V ${cy - 26}`} fill="#7A8C99" stroke={C.ink} strokeWidth={3} />
      <ellipse cx={cx} cy={cy - 26} rx={28} ry={9} fill="#A9B7C2" stroke={C.ink} strokeWidth={3} />
    </g>);
  if (obj === "bottle") return <path d={`M ${cx - 7} ${cy - 38} H ${cx + 7} V ${cy - 22} C ${cx + 22} ${cy - 16} ${cx + 22} ${cy - 8} ${cx + 22} ${cy} V ${cy + 36} H ${cx - 22} V ${cy} C ${cx - 22} ${cy - 8} ${cx - 22} ${cy - 16} ${cx - 7} ${cy - 22} Z`} fill="#CFE8F5" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />;
  if (kind === "wt") {
    const bw = Math.min(w, h * 0.8), bh = bw / 0.8, bx = cx - bw / 2, by = cy - bh / 2, X = (f: number) => bx + f * bw, Y = (f: number) => by + f * bh;
    return (
      <g>
        <path d={`M ${X(0.32)} ${Y(0.1)} H ${X(0.68)} L ${X(0.6)} ${Y(0.26)} C ${X(1)} ${Y(0.36)} ${X(1)} ${Y(0.96)} ${X(0.5)} ${Y(0.96)} C ${X(0)} ${Y(0.96)} ${X(0)} ${Y(0.36)} ${X(0.4)} ${Y(0.26)} Z`}
          fill="#C9A36B" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
        <Skin name="sack" x={bx} y={by} w={bw} h={bh} fit="stretch" />
      </g>);
  }
  if (kind === "cap") {
    const bw = Math.min(w, h * 1.26), bh = bw / 1.26, bx = cx - bw / 2, by = cy - bh / 2;
    return (
      <g>
        <path d={`M ${bx + bw * 0.78} ${cy - bh * 0.2} C ${bx + bw} ${cy - bh * 0.2} ${bx + bw} ${cy + bh * 0.25} ${bx + bw * 0.76} ${cy + bh * 0.25}`} fill="none" stroke={C.ink} strokeWidth={5} />
        <ellipse cx={cx - bw * 0.06} cy={cy} rx={bw * 0.36} ry={bh * 0.44} fill="#D9A86C" stroke={C.ink} strokeWidth={3} />
        <ellipse cx={cx - bw * 0.06} cy={cy} rx={bw * 0.24} ry={bh * 0.3} fill="#F4E2C4" stroke={C.ink} strokeWidth={2} />
        <Skin name="jug" x={bx} y={by} w={bw} h={bh} fit="stretch" />
      </g>);
  }
  const bh = Math.min(34, h * 0.45);
  return (
    <g>
      <rect x={x} y={cy - bh / 2} width={w} height={bh} rx={6} fill="#F3D27A" stroke={C.ink} strokeWidth={2.5} />
      <Skin name="ribbon" x={x} y={cy - bh / 2} w={w} h={bh} />
    </g>);
}
/* the carry or borrow: a bundle of satin ribbon tied with a violet band, drawn round 0,0 (it travels with the hand) */
function ucTile(label: string) {
  return (
    <g>
      <clipPath id="uc-tile-clip"><rect x={-86} y={-30} width={172} height={60} rx={14} /></clipPath>
      <rect x={-86} y={-30} width={172} height={60} rx={14} fill={tint(UC.unit, 0.86)} />
      <Skin name="ribbon" x={-86} y={-30} w={172} h={60} clip="url(#uc-tile-clip)" />
      <rect x={-86} y={-30} width={172} height={60} rx={14} fill="none" stroke={shade(UC.unit, 0.1)} strokeWidth={3} />
      <rect x={-72} y={-30} width={14} height={60} fill={UC.unit} />
      <text x={10} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(UC.unit, 0.25)}>{label}</text>
    </g>);
}
/* the walker, feet at 0,0 */
function ucWalker() {
  return (
    <g transform="scale(1.5)">
      <path d="M 0 -10 L -11 6 M 0 -10 L 11 6 M -14 -28 L 14 -24" stroke="#2B2B2B" strokeWidth={5} strokeLinecap="round" fill="none" />
      <rect x={-10} y={-36} width={20} height={28} rx={8} fill={UC.move} stroke="#2B2B2B" strokeWidth={2.5} />
      <circle cx={0} cy={-48} r={12} fill="#F2C9A0" stroke="#2B2B2B" strokeWidth={2.5} />
    </g>);
}

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* a typed number or decimal, judged by its value ("6.130" and "6.13" are one measure, as the book says), with a digit before
   the point and no extra zero in front ("07.125", ".4" and "4." are misses) */
const ucDec = (v: any, a: any) => { const t = String(v ?? "").trim(); return /^(0|[1-9]\d*)(\.\d+)?$/.test(t) && Number(t) === Number(a); };
/* judge: is this value right for this item? two boxes compare as numbers */
const judge = (item: any, v: any) => (item.parts ? judgeSlotParts(item, v) : ucDec(v, item.answer));
/* oracle: a second route, sharing no code with judge or Work: everything in the smallest unit, then back */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const per: any = { cm: 100, mm: 1000 };
  if (it.op) {
    const f = per[it.small] || 1000, x = it.a[0] * f + it.a[1], y = it.b[0] * f + it.b[1], t = it.op === "+" ? x + y : x - y;
    return Math.floor(t / f) === it.answer[0] && t % f === it.answer[1];
  }
  if (it.rows) {
    const milli = it.rows.reduce((acc: number, r: any) => acc + (r.dec ? Math.round(parseFloat(r.dec) * 1000) : r.w * 1000 + r.s * (1000 / (per[r.small] || 1000))), 0);
    return milli === Math.round(parseFloat(it.answer) * 1000);
  }
  const mm = it.sides.reduce((acc: number, sd: any) => acc + Math.round(sd.v * ({ m: 1000, cm: 10, mm: 1 } as any)[sd.u]), 0);
  return mm === Math.round(Number(it.answer) * 1000);
}));
/* the most likely wrong answer (the item's misconception, its `near`); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : /^\d*\.\d+$/.test(String(item.answer)) ? [String(item.answer), speakable(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
/* a decimal in one box: toolApi.answer would strip its point, so the agent types it whole (PATTERNS 4); check() then answers */
const answer = (item: any, v: any) => (!item.parts && typeof item.answer === "string" && HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter. In a guide-steps phase
   (stage "demo") it must return undefined, so the agent's check() reaches api.onEnter and performs the current step:
   set HOOK.check only while a question is open */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Its size is `box` ({ w, h, open }): the whole card (1472 x 528) with the answer panel shut and 1086 x 528 with it
   open, easing between (the board layout, docs/LAYOUT.md §1b, docs/PATTERNS.md §14): lay everything out from box.w
   with plain arithmetic in render, never from constants or api.W. Origin at the area's top-left.
   keyOnly (LAYOUT.md §1d): the question bar is gone, so the working area is 64,108, 1472 x 520 (NOT 64,202 x 528) with the panel shut, 1086 (900
   with bigPad) x 520 open. box.key = { x, y, w, h } is the key's corner in THIS area's coordinates (about x 1190, y 0, 282 x 88; wider on a
   Yes/No question): keep every element out of it, e.g. const kx = box.key ? box.key.x - 12 : box.w; (board-fit). There is no runs zone.
   Every act (cut, measure, count, tidy ...) is performed on screen: await api.act({ tool, moves, at, onPoint }) from the child's tap and
   react only when it resolves true (PATTERNS.md §15).
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the bubble already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked.
   Sound effects where the picture moves: api.sfx.cut() (a knife), settle() (pieces come to rest),
   trade() (pieces close into one), tick() (a snap); correct, wrong, win and cheer are the runtime's.
   step / stepOn: the guide step the child is on and the act it waits for (null outside a steps phase).
   nextKey: true (the ToolFrame below, runtime r48+): nothing moves on by itself. After a right answer the win picture
   stays on the board until the child presses the blinking Next key, so never reset it on a timer (PATTERNS.md 9d).
   A SKIN (docs/IMAGES.md, docs/PATTERNS.md §14): when the slot has an images.tsx, draw <Skin name x y w h clip /> over
   the plain shape the tool already draws for the object (the plain shape stays the fallback); never a raster tag of your own here (no-raster-in-tool).
   */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free", demo = stage === "demo";
  /* a phase opens on "teach" for one frame before "demo": the warm-up board from that frame on (PATTERNS 18) */
  const warmUp = demo || stage === "teach";
  const done = !free && (stage === "win" || stage === "idle" || stage === "summary");
  /* the sum on the board: the phase's warm-up during the guide steps, Free play's list in free play, else the question
     (in free play `item` is the last question: never read it there) */
  const [fi, setFi] = useState(0);
  const ex: any = free ? MODEL.free[fi % MODEL.free.length] : warmUp ? MODEL.warm[n - 1] : item || MODEL.warm[n - 1];
  const mode = ex.op ? "col" : ex.rows ? "dec" : "bound";
  const pk = free ? "f" + fi : warmUp ? "d" + n : "q" + n + ":" + index;
  const w0 = mode === "dec" ? ucPre(ex) : 0;
  const base = { key: pk, ws: w0, conv: [] as boolean[], lit: 0, total: false, moving: false, walk: 0, walked: false };
  const [s0, setS] = useState<any>(base);
  const s = s0.key === pk ? s0 : base;
  const busy = useRef(false);
  const lastKey = useRef(0);
  /* a new picture: stop a running correction; the reset sits inside the setter, so an act that already resolved is never wiped */
  useEffect(() => { tl.stop(); setS((p: any) => (p.key === pk ? p : base)); }, [pk]);
  const put = (o: any) => setS((p: any) => { const b = p.key === pk ? p : base; return { ...b, ...(typeof o === "function" ? o(b) : o), key: pk }; });

  /* the working stage: 0 = only the given measures, then one stage an act, the last = the whole answer */
  const seq: any[] = mode === "col" ? ucSeq(ex) : mode === "dec" ? ucDecSeq(ex) : [];
  const maxWs = mode === "col" ? 4 : mode === "dec" ? ex.rows.length + (ex.sum ? 1 : 0) : 0;
  const ws = done ? maxWs : s.ws;
  const nextOn = (seq.find((q: any) => q[1] > ws) || [null])[0];
  const sides = ex.sides || [];
  const inM = (i: number) => sides[i].u === "m" || done || !!s.conv[i];
  /* at a win the walker walks round the sides as they light (the win effect below) and the boundary shows once it is home */
  const lit = done && s.walked ? sides.length : s.lit;
  const showTotal = done ? !!(s.walked || s.total) : s.total;
  const walkAt = done && s.walked ? 0 : (s.walk || 0) % Math.max(1, sides.length);

  /* the room: one picture 840 wide, the same size with the keypad open (900) or shut (1472), clear of the key's corner */
  const FW = 840, bw = box ? box.w : W.w;
  const kx = box && box.key ? box.key.x - 12 : bw;
  const x0 = Math.round(Math.max(16, Math.min((bw - FW) / 2, kx - FW)));
  const kb = { x: x0 + 310, y: 428, w: 260, h: 80 };
  const G = { bigR: x0 + 444, smR: x0 + 810, tileBig: x0 + 286, tileSm: x0 + 596, carryY: 105, A: 188, B: 276, ans: 380, px: x0 + 600 };
  const rowY = (i: number) => 110 + i * 104;
  const corners = mode === "bound" ? ucCorners(sides.length, x0) : [];
  /* a side card's centre: on the side's middle, except a triangle's slanted side, whose card stands out beside it, clear of the edge
     (half the card's width, plus its half height along the slope, plus 6) */
  /* a triangle's base card hangs under the base, so the base is drawn and lights */
  const tri = corners.length === 3, cw = tri ? 200 : 220;
  const midOf = (i: number) => {
    const a = corners[i], b = corners[(i + 1) % corners.length], m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, dy = Math.abs(b.y - a.y);
    if (!tri) return Math.abs(b.x - a.x) < 1 ? { x: m.x, y: m.y - 8 } : m;   /* a side card on an upright side sits 8 up, clear of the walker's head */
    if (dy < 1) return { x: m.x, y: m.y + 46 };
    const cx = corners.reduce((t: number, p: any) => t + p.x, 0) / 3;
    return { x: m.x + (m.x > cx ? 1 : -1) * (cw / 2 + 16 + (36 * Math.abs(b.x - a.x)) / dy), y: m.y };
  };

  /* each act, performed on screen by the action kit (api.act), and what it leaves on the board */
  const actFor = (on: string): any => {
    const pen = (x: number, y: number, then: () => void) => ({ a: { tool: "pencil", moves: "draw", from: { x: x - 130, y }, at: [{ x, y }] }, then });
    if (mode === "col") {
      const f = ucF(ex.big, ex.small), add = ex.op === "+";
      if (on === "addsmall" || on === "takesmall") return pen(G.smR - 20, G.ans, () => put({ ws: on === "addsmall" ? 1 : 3 }));
      if (on === "addbig" || on === "takebig") return pen(G.bigR - 10, G.ans, () => put({ ws: 4 }));
      if (on === "bundle") return { a: { tool: "hand", moves: "sweep", from: { x: G.tileSm, y: G.ans }, at: [{ x: G.tileSm, y: G.carryY }] }, then: () => put({ ws: 2 }) };
      if (on === "break") return { a: { tool: "hand", moves: "tap", at: [{ x: G.bigR - 20, y: G.A }] }, then: () => put({ ws: 1 }) };
      if (on === "carry") {
        const from = { x: add ? G.tileSm : G.tileBig, y: G.carryY }, to = { x: add ? G.tileBig : G.tileSm, y: G.carryY };
        return { pre: () => put({ moving: true }), fail: () => put({ moving: false }), then: () => put({ ws: add ? 3 : 2, moving: false }),
          a: { tool: "hand", moves: "carry", from, at: [to], hold: ucTile(add ? f + " " + tx(ex.small) : "1 " + tx(ex.big)) } };
      }
    }
    if (mode === "dec") {
      if (on === "write") return pen(G.px + 130, rowY(ws), () => put((b: any) => ({ ws: b.ws + 1 })));
      if (on === "add") return pen(G.px + 130, rowY(ex.rows.length - 1) + 104, () => put({ ws: maxWs }));
    }
    if (mode === "bound") {
      if (on.indexOf("side-") === 0) {
        const i = Number(on.slice(5)) - 1, m = midOf(i);
        return pen(m.x + 50, m.y, () => put((b: any) => { const cv = b.conv.slice(); cv[i] = true; return { conv: cv }; }));
      }
      if (on === "walk") return { pre: () => put({ moving: true, lit: 0 }), fail: () => put({ moving: false }), then: () => put({ moving: false, total: true }),
        a: { tool: "hand", moves: "push", from: corners[0], at: [...corners.slice(1), corners[0]], hold: ucWalker(), onPoint: (k: number) => put({ lit: k + 1 }) } };
    }
    return null;
  };
  /* GUIDE STEPS: an act is done when the child does it and reported with api.did once it has played; an act the step is not
     waiting for is reported at once (did() then shows the step's hint) and does nothing */
  const act = (on: string) => {
    if (busy.current) return;
    if (demo && on !== stepOn) { api.did(on); return; }
    if (free && on === "new") { setFi((v: number) => v + 1); return; }
    const o = actFor(on);
    if (!o) { if (demo) api.did(on); return; }
    busy.current = true;
    if (o.pre) o.pre();
    api.act(o.a).then((ok: boolean) => {
      busy.current = false;
      if (!ok) { if (o.fail) o.fail(); return; }
      o.then();
      if (on === "carry" || on === "bundle") api.sfx.trade(); else api.sfx.settle();
      if (demo) api.did(on);
    });
  };
  /* one key, a 400 ms guard so one tap never also presses the next label */
  const pressKey = (on: string) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; act(on); };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step's act */
  api.onEnter(demo && stepOn ? () => act(stepOn) : null);
  HOOK.demo = demo && stepOn ? () => act(stepOn) : null;
  HOOK.type = (v: any) => { api.setTyped(String(v)); return true; };

  /* the traceback: the working redrawn act by act, ending on the whole right answer (drawn, never marked) */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const st: any[] = [[350, () => put({ ws: w0, conv: [], lit: 0, total: false, moving: false })]];
    if (mode === "bound") {
      sides.forEach((sd: any, i: number) => { if (sd.u !== "m") st.push([750, () => put((b: any) => { const cv = b.conv.slice(); cv[i] = true; return { conv: cv }; })]); });
      sides.forEach((_: any, i: number) => st.push([420, () => put({ lit: i + 1, walk: i + 1 })]));
      st.push([600, () => put({ total: true })]);
    } else seq.forEach((q: any) => st.push([850, () => put({ ws: q[1] })]));
    tl.run(st, () => api.lock(false));
  }, [wrong]);

  /* a short win line (the phase's last question gets its closing line instead); phase 4: the walker walks home, about 0.9 s
     (the item's winMs covers it; it runs on through the phase's "idle") */
  useEffect(() => {
    if (stage !== "win" || !item) return;
    api.say(item.win || phase.closing);
    if (mode !== "bound") return;
    const st: any[] = [[180, () => put({ lit: 0, walk: 0, total: false, walked: false })]];
    sides.forEach((_: any, i: number) => st.push([180, () => put({ lit: i + 1, walk: i + 1 })]));
    st.push([0, () => put({ walked: true })]);
    tl.run(st);
  }, [stage, index]);

  /* what the host and the agent read back (toolApi.getState): the working, never the answer before it is given */
  const cc = mode === "col" ? ucCol(ex).c > 0 : false;
  api.share({ complete: stage === "idle", worked: ws, carry: mode === "col" && ex.op === "+" ? cc && ws >= 3 : null,
    borrow: mode === "col" && ex.op === "-" ? cc && ws >= 2 : null, sides: mode === "bound" ? sides.map((sd: any, i: number) => (inM(i) ? "m" : sd.u)) : null });

  const gi = shade(UC.given, 0.25), ai = shade(UC.answer, 0.25), ni = shade(UC.now, 0.4), vi = shade(UC.unit, 0.25);
  const hy = lang === "hi" ? 4 : 0;   /* a Hindi column name sits 4 lower: the ि of किग्रा rises to the pill's outline */
  const big64 = (x: number, y: number, t: any, fill: string, anchor = "end") => <text x={x} y={y + 25} textAnchor={anchor} fontSize={T.display} fontWeight={700} fill={fill}>{t}</text>;
  const strike = (xr: number, y: number, t: any) => <line x1={xr - String(t).length * T.display * 0.6 - 6} y1={y} x2={xr + 6} y2={y} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />;
  /* the unit fact, in three pieces so each label stays short */
  const fact = (x: number, y: number, w: number, l: string, r: string) => (
    <g>
      <rect x={x} y={y} width={w} height={60} rx={14} fill={tint(UC.unit, 0.86)} stroke={UC.unit} strokeWidth={2.5} />
      <text x={x + w / 2} y={y + 41} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={vi}>{l}<tspan dx={10}>=</tspan><tspan dx={10}>{r}</tspan></text>
    </g>);

  /* phases 1 and 3, Free play: two unit columns, the larger on the left; the smaller worked first */
  const colView = () => {
    const w: any = ucCol(ex), add = ex.op === "+", f = w.f, kind = UC_KIND[ex.big];
    const litCol = done ? "" : add ? (ws <= 2 ? "sm" : ws === 3 ? "big" : "") : ws === 0 || ws === 2 ? "sm" : ws === 1 || ws === 3 ? "big" : "";
    const bi = add ? gi : shade(UC.taken, 0.25), fin = ws >= 4, ri = fin ? ai : ni;
    const cols: any[] = [["big", x0 + 190, 280, ex.big], ["sm", x0 + 490, 350, ex.small]];
    return (
      <g pointerEvents="none">
        {cols.map(([id, x, cw, u]: any) => (
          <g key={id}>
            <rect x={x} y={66} width={cw} height={360} rx={18} fill={litCol === id ? tint(UC.now, 0.8) : C.paper} stroke={litCol === id ? shade(UC.now, 0.1) : C.rule} strokeWidth={3} />
            <rect x={x} y={0} width={cw} height={58} rx={14} fill={tint(UC.unit, 0.86)} stroke={UC.unit} strokeWidth={2.5} />
            <text x={x + cw / 2} y={43 + hy} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={vi}>{tx(u)}</text>
          </g>))}
        {ucGlyph(kind, x0, G.A - 42, 110, 84, C, ex.obj)}
        {ucGlyph(kind, x0, G.B - 42, 110, 84, C, ex.obj)}
        {big64(G.bigR, G.A, ex.a[0], gi)}
        {big64(G.smR, G.A, ex.a[1], gi)}
        {big64(x0 + 150, G.B, add ? "+" : "−", C.ink, "middle")}
        {big64(G.bigR, G.B, ex.b[0], bi)}
        {big64(G.smR, G.B, ex.b[1], bi)}
        <line x1={x0 + 120} y1={328} x2={x0 + 840} y2={328} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
        {/* a carry: bundled over the smaller column, then carried over the larger */}
        {add && ws === 2 && !s.moving && <g transform={`translate(${G.tileSm},${G.carryY})`}>{ucTile(f + " " + tx(ex.small))}</g>}
        {add && ws >= 3 && w.c > 0 && <g transform={`translate(${G.tileBig},${G.carryY})`}>{ucTile("1 " + tx(ex.big))}</g>}
        {/* a borrow: one larger unit broken, then carried over to the smaller column */}
        {!add && ws >= 1 && w.c > 0 && <g>{strike(G.bigR, G.A, ex.a[0])}<text x={G.bigR} y={G.carryY + 16} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={fin ? gi : ni}>{ex.a[0] - 1}</text></g>}
        {!add && ws === 1 && w.c > 0 && !s.moving && <g transform={`translate(${G.tileBig},${G.carryY})`}>{ucTile("1 " + tx(ex.big))}</g>}
        {!add && ws >= 2 && w.c > 0 && <g>
          <g transform={`translate(${G.tileSm},${G.carryY})`}>{ucTile(f + " " + tx(ex.small))}</g>
          {strike(G.smR, G.A, ex.a[1])}
          <text x={G.smR} y={G.carryY + 16} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={fin ? gi : ni}>{w.top}</text>
        </g>}
        {/* the answer row */}
        {add && ws >= 1 && big64(G.smR, G.ans, ws === 1 ? w.st : w.small, ri)}
        {!add && ws >= 3 && big64(G.smR, G.ans, w.small, ri)}
        {fin && big64(G.bigR, G.ans, w.big, ai)}
        {fact(x0, 446, 280, f + " " + tx(ex.small), "1 " + tx(ex.big))}
      </g>);
  };

  /* phase 2: each measure written as a decimal in the larger unit, the points locked in one line */
  const decText = (d: string, y: number, ink: string, u: string, k: any) => {
    const [wp, dp] = d.split("."), nz = dp.search(/[1-9]/);
    const xs = [...wp.split("").map((_: any, j: number) => G.px - 26 - (wp.length - 1 - j) * 40), G.px, ...dp.split("").map((_: any, j: number) => G.px + 26 + j * 40)];
    return (
      <g key={k}>
        <text y={y + 20} fontSize={T.xl} fontWeight={700} fill={ink} textAnchor="middle">
          {(wp + "." + dp).split("").map((ch: string, j: number) => (
            <tspan key={j} x={xs[j]} fill={j > wp.length && j - wp.length - 1 < (nz < 0 ? dp.length : nz) ? UC.hold : undefined}>{ch}</tspan>))}
        </text>
        {/* a long unit (किग्रा, કિગ્રા) takes a smaller size so it ends inside the column's pill */}
        <text x={G.px + 150} y={y + 20} fontSize={tx(u).length > 3 ? 34 : T.speech} fontWeight={700} fill={ink}>{tx(u)}</text>
      </g>);
  };
  const decView = () => {
    const rows = ex.rows, R = rows.length, r0 = rows[0], ruleY = rowY(R - 1) + 52, sumY = rowY(R - 1) + 104;
    return (
      <g pointerEvents="none">
        <rect x={x0 + 380} y={0} width={460} height={58} rx={14} fill={tint(UC.unit, 0.86)} stroke={UC.unit} strokeWidth={2.5} />
        <text x={x0 + 610} y={43 + hy} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={vi}>{tx(ex.unit)}</text>
        <line x1={G.px} y1={66} x2={G.px} y2={(ex.sum ? sumY : rowY(R - 1)) + 44} stroke={UC.unit} strokeOpacity={0.45} strokeWidth={3} strokeDasharray="8 8" />
        {rows.map((r: any, i: number) => {
          const y = rowY(i), shown = !!r.dec || ws > i;
          return (
            <g key={i}>
              {ucGlyph(UC_KIND[r.big], x0, y - 44, 100, 88, C, r.obj || ex.obj)}
              <rect x={x0 + 104} y={y - 38} width={282} height={76} rx={16} fill={C.paper} stroke={C.rule} strokeWidth={3} />
              {/* a long Hindi or Gujarati measure takes a smaller size, never under the floor */}
              {(() => { const t = r.dec ? r.dec + " " + tx(r.big) : r.w + " " + tx(r.big) + " " + r.s + " " + tx(r.small);
                return <text x={x0 + 116} y={y + 14} fontSize={t.length > 11 ? 34 : T.prompt} fontWeight={700} fill={gi}>{t}</text>; })()}
              {i > 0 && ex.sum && big64(x0 + 424, y, "+", C.ink, "middle")}
              {shown ? decText(ucDecOf(r), y, ex.sum ? gi : ai, r.big, "d" + i)
                : <g>
                    <rect x={G.px - 150} y={y - 36} width={290} height={72} rx={12} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="10 8" />
                    <circle cx={G.px} cy={y + 16} r={7} fill={C.rule} />
                  </g>}
            </g>);
        })}
        {ex.sum && <line x1={x0 + 390} y1={ruleY} x2={x0 + 840} y2={ruleY} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />}
        {ex.sum && ws > R && decText(ucDecSum(rows), sumY, ai, ex.unit, "sum")}
        {fact(x0, 446, 280, ucF(r0.big, r0.small) + " " + tx(r0.small), "1 " + tx(r0.big))}
      </g>);
  };

  /* phase 4: the shape with a card on each side, the walker at a corner, the boundary box */
  const boundView = () => {
    const N = sides.length, path = corners.map((p: any, i: number) => (i ? "L " : "M ") + p.x + " " + p.y).join(" ") + " Z";
    const fill = ex.obj === "bed" ? "#BFE3B4" : ex.obj === "rope" ? "#F1E3C6" : "#F6E7B0";
    /* the side cards are live only in the guide steps: at a question the rewriting in metres is the child's own work */
    const tap = (i: number) => demo;
    const tot = sides.reduce((a: number, sd: any) => a + ucSideM(sd), 0);
    const inv = demo && stepOn && stepOn.indexOf("side-") === 0 ? Number(stepOn.slice(5)) - 1 : -1;
    return (
      <g>
        <g pointerEvents="none">
          <path d={path} fill={fill} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
          {corners.map((p: any, i: number) => (i < lit ? <line key={i} x1={p.x} y1={p.y} x2={corners[(i + 1) % N].x} y2={corners[(i + 1) % N].y} stroke={UC.answer} strokeWidth={10} strokeLinecap="round" /> : null))}
          {/* the walker: at home, or at the corner it has walked to (it slides along each side as that side lights) */}
          {!s.moving && <g style={{ transform: `translate(${corners[walkAt].x}px, ${corners[walkAt].y - 4}px)`, transition: reducedMotion() ? "none" : "transform 170ms linear" } as any}>{ucWalker()}</g>}
          <text x={x0 + 715} y={112} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Boundary")}</text>
          <rect x={x0 + 590} y={130} width={250} height={100} rx={18} fill={showTotal ? tint(UC.answer, 0.86) : C.paper} stroke={showTotal ? UC.answer : C.rule} strokeWidth={3} strokeDasharray={showTotal ? undefined : "10 8"} />
          {showTotal && <text x={x0 + 690} y={200} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ai}>{ucNum(tot)}</text>}
          <text x={x0 + 795} y={196} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={showTotal ? ai : C.ink}>{tx("m")}</text>
          {fact(x0 + 554, 270, 286, "1 " + tx("m"), "100 " + tx("cm"))}
          {fact(x0 + 554, 344, 286, "1 " + tx("m"), "1000 " + tx("mm"))}
        </g>
        {sides.map((sd: any, i: number) => {
          const m = midOf(i), conv = inM(i) && sd.u !== "m", t = inM(i) ? ucNum(ucSideM(sd)) + " " + tx("m") : sd.v + " " + tx(sd.u);
          return (
            <g key={"s" + i}>
              <g pointerEvents="none">
                <rect x={m.x - cw / 2} y={m.y - 36} width={cw} height={72} rx={16} fill={C.paper} stroke={conv ? UC.answer : C.ink} strokeWidth={3} />
                <text x={m.x} y={m.y + 14} textAnchor="middle" fontSize={tri && t.length > 7 ? 34 : T.prompt} fontWeight={700} fill={conv ? ai : gi}>{t}</text>
              </g>
              {tap(i) && <Hit id={"side-" + (i + 1)} x={m.x - cw / 2} y={m.y - 36} w={cw} h={72} label={"Side " + (i + 1)} onPress={() => act("side-" + (i + 1))} />}
            </g>);
        })}
        {inv >= 0 && <BlinkRing x={midOf(inv).x - cw / 2} y={midOf(inv).y - 36} w={cw} h={72} rx={16} C={C} />}
      </g>);
  };

  /* the one key: the act the guide step waits for, or Free play's next act (New starts another sum) */
  const keyOn = free ? nextOn || "new" : demo && stepOn && UC_KEY[stepOn] ? stepOn : null;
  /* a take-away's carry is a borrow: same act and control id, its own word */
  const keyLabel = keyOn === "carry" && ex.op === "-" ? "Borrow" : keyOn ? UC_KEY[keyOn] : "";
  return (
    <g>
      {/* keyOnly: no runs zone; nothing under box.key; the question is in the bubble only */}
      {mode === "col" ? colView() : mode === "dec" ? decView() : boundView()}
      {keyOn && (
        <Key key="act0" id={keyOn} label={tx(keyLabel)} x={kb.x} y={kb.y} w={kb.w} h={kb.h} C={C} tone="key" onClick={() => pressKey(keyOn)}>
          <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(keyLabel)}</text>
        </Key>)}
      {/* the one invite: a ring round the key the step waits for (a pulse in its middle would cross the label) */}
      {keyOn && demo && <BlinkRing x={kb.x} y={kb.y} w={kb.w} h={kb.h} rx={RAD.key} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item = it || last.it || (PHASES[n - 1] && PHASES[n - 1].items[last.item]) || {};
  const ut = (u: string) => " " + tx(u);
  let t = "";
  if (item.parts) { const [a, b] = slotPartsOf(last.value, 2); t = a + ut(item.parts[0].label) + " " + b + ut(item.parts[1].label); }
  else t = String(last.value) + ut(item.unit || "m");
  const fs = Math.max(28, Math.min(T.label, Math.floor((w - 28) / (t.length * 0.6))));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(UC.answer, 0.88)} stroke={UC.answer} strokeWidth={2} />
      <rect x={10} y={h - 14} width={w - 20} height={5} rx={2.5} fill={UC.answer} />
      <text x={w / 2} y={h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={shade(UC.answer, 0.25)}>{t}</text>
    </g>
  );
}

function MeasureColumns(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the pad's point key: adding as decimals with the points lined up IS the lesson (BUILD_CARD §7, 2026-10-17); a mixed
         measure is two boxes labelled with the unit symbol, where the point key is off */
      pointKey: true,
      /* the board layout (LAYOUT.md §1b): the question and an Answer key on a bar across the top, the working area the
         whole card until the child taps Answer, the answer box and keypad in a panel that slides in from the right */
      board: true,
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

export default MeasureColumns;
