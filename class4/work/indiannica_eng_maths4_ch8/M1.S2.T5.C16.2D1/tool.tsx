/* ═══ M1.S2.T5.C16.2D1 · place_and_worth_chart · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, question bar + Answer key + keypad
   panel (the board layout), bubble + mascot, phase dots, window.toolApi, the sound effects, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is printed
   on the bubble, which is the guide; the lesson moves on only when the child acts (r34).
   A place value chart that carries on past the ones, through a dot of its own, as tenths, hundredths and
   thousandths. Phase 1 grows it and the child names the new columns; phase 2 counts places from the dot;
   phase 3 keeps the place (a name) apart from the place value (an amount, typed on the Worth card);
   phase 4 sends every worth down into a bar and adds them back to the number.
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints has a Hindi and a Gujarati entry in TR once the English is final. */

const TOOL_ID = "place_and_worth_chart";
const MEDIA_ID = "M1.S2.T5.C16.2D1";
const TOOL_NAME = "Place and Worth Chart";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* the plan's opening line (not shown: phase 1 opens on its guide steps) */
const OPENING = ["Your chart stops at the ones. There is more of it than that."];
/* not shown from r44 (the summary page says its own line); kept for the sidecar */
const FINISH_LINE = "Every digit given a name and an amount, and every amount added back to where it came from.";
/* printed when the child opens Free play; it names exactly what the free branch of Work offers */
const FREE_LINE = "Free play: tap a column to change its digit, then tap Worths to see each worth.";

/* THE START PAGE (runtime r28): one question to wonder at, and the chart the lesson is about */
const START_HOOK = "What comes after the ones on a place value chart?";
function StartArt({ box, C, lang = "en", tx = (v: any) => v }: any) {
  const cw = 176, dw = 64, x0 = (box.w - (6 * cw + dw)) / 2;
  const cx = (k: number) => (k < 3 ? x0 + k * cw : x0 + 3 * cw + dw + (k - 3) * cw);
  const digs = ["3", "6", "7"];
  return (
    <g>
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={cx(k) + 4} y={8} width={cw - 8} height={52} rx={10} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
          <text x={cx(k) + cw / 2} y={43} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(PW_NAMES[k])}</text>
          <rect x={cx(k) + 4} y={68} width={cw - 8} height={120} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={cx(k) + cw / 2} y={154} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={pwInk(PW_WHOLE)}>{digs[k]}</text>
        </g>
      ))}
      {/* the dot, in a column of its own */}
      <rect x={x0 + 3 * cw + 4} y={68} width={dw - 8} height={120} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <circle cx={x0 + 3 * cw + dw / 2} cy={142} r={10} fill={PW_DOT} />
      {/* the ground past the ones: bare columns, each piece smaller than the last */}
      {[3, 4, 5].map((k) => (
        <g key={k}>
          <rect x={cx(k) + 4} y={8} width={cw - 8} height={52} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />
          <rect x={cx(k) + 4} y={68} width={cw - 8} height={120} rx={12} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />
          {k === 5 ? pwPieces(cx(k) + cw / 2 - 94, 226, 80, k, 1, C, true) : pwPieces(cx(k) + cw / 2 - 40, 226, 80, k, 1, C)}
        </g>
      ))}
      {pwPieces(cx(2) + cw / 2 - 40, 226, 80, 2, 1, C)}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled once the English is final (the language pass). */
/* Hindi and Gujarati (docs/PATTERNS.md §11): keyed by the English, byte for byte; terms follow the NCERT Class 4 books
   (इकाई दहाई सैकड़ा / એકમ દશક શતક; दसवाँ, सौवाँ, हज़ारवाँ भाग / દશમો, સોમો, હજારમો ભાગ; बिंदु / ટપકું for the point;
   मान / કિંમત for a worth, स्थानीय मान / સ્થાનકિંમત for a place value; खाना / ખાનું for a column). Digits stay digits. */
const TR: any = {
  hi: {
    "Place and Worth Chart": "स्थान और मान का चार्ट",
    "Free play: tap a column to change its digit, then tap Worths to see each worth.": "मुक्त खेल: खाने पर टैप कर अंक बदलो, फिर मान पर टैप करो।",
    "What comes after the ones on a place value chart?": "स्थानीय मान चार्ट में इकाई के बाद क्या आता है?",
    "The chart carries on past the point": "चार्ट दशमलव बिंदु के आगे भी चलता है",
    "Tap Grow to carry the chart on.": "बढ़ाओ पर टैप कर चार्ट आगे ले जाओ।",
    "Grow is the key under the chart.": "बढ़ाओ बटन चार्ट के नीचे है।",
    "The dot comes right after the ones; tap Grow.": "इकाई के बाद बिंदु; अब बढ़ाओ दबाओ।",
    "Press the glowing Grow key.": "चमकता बढ़ाओ बटन दबाओ।",
    "That is a tenth of a one; tap Grow once more.": "यह एक का दसवाँ भाग; फिर बढ़ाओ दबाओ।",
    "Press Grow at the foot once more.": "नीचे वाला बढ़ाओ एक बार और दबाओ।",
    "Smaller again; tap Grow one last time.": "और छोटा; आखिरी बार बढ़ाओ दबाओ।",
    "One last press on the Grow key.": "बस एक बार और बढ़ाओ बटन दबाओ।",
    "Which way do the pieces get smaller?": "टुकड़े किस ओर छोटे होते जाते हैं?",
    "Each column is a tenth of the one on its left.": "हर खाना बाएँ वाले का दसवाँ भाग।",
    "The chart runs on past the ones, through a dot. Then come tenths, hundredths and thousandths.": "चार्ट इकाई के आगे, एक बिंदु के पार चलता है। फिर दसवाँ, सौवाँ और हज़ारवाँ भाग आते हैं।",
    "You learned: the chart runs on past the ones, through a dot.": "तुमने सीखा: चार्ट इकाई के आगे, एक बिंदु के पार भी चलता है।",
    "Name the columns after the dot": "बिंदु के बाद के खानों के नाम दो",
    "Tap the names in, from the dot out.": "बिंदु से शुरू करके नाम टैप करो।",
    "Tap a heading to take its name back.": "नाम वापस लेने को शीर्षक टैप करो।",
    "How many tens are in 5,470?": "5,470 में कितनी दहाइयाँ हैं?",
    "Cut at the tens and type how many.": "दहाई पर काटो और गिनती लिखो।",
    "Read all the digits up to the cut.": "कट तक के सारे अंक एक साथ पढ़ो।",
    "Name the places after the dot in 36.907": "36.907 में बिंदु के बाद के स्थानों के नाम दो",
    "Same again, on a new number.": "नई संख्या पर फिर वैसे ही करो।",
    "Which place sits right by the dot?": "बिंदु के ठीक पास कौन सा स्थान है?",
    "Yes: 5 tenths, 7 hundredths and 3 thousandths.": "हाँ: 5 दसवें, 7 सौवें और 3 हज़ारवें भाग।",
    "Yes, 547 tens in all.": "हाँ, कुल 547 दहाइयाँ।",
    "Right, the pieces shrink as the chart runs on.": "सही, चार्ट आगे बढ़ते ही टुकड़े छोटे होते हैं।",
    "Counting places from the point": "दशमलव बिंदु से स्थान गिनना",
    "Places count from the dot; tap Count.": "गिनती बिंदु से; गिनो दबाओ।",
    "Count sits just under the chart.": "गिनो बटन चार्ट के ठीक नीचे है।",
    "Tap Count to step one more column.": "एक खाना और आगे जाने को गिनो दबाओ।",
    "Each tap moves one column right.": "हर टैप एक खाना दाईं ओर ले जाता है।",
    "Tap Count once more for the third.": "तीसरे के लिए एक बार और गिनो दबाओ।",
    "The heading turns as you count.": "गिनते ही शीर्षक पलट जाता है।",
    "Find your starting column first.": "पहले शुरू वाला खाना ढूँढो।",
    "Step one column at a time and count.": "एक एक खाना आगे बढ़ते हुए गिनो।",
    "Position alone decides a digit's place. Places are counted from the point outwards.": "अंक का स्थान सिर्फ़ उसकी जगह से तय होता है। स्थान बिंदु से बाहर की ओर गिने जाते हैं।",
    "You learned: places are counted from the point outwards.": "तुमने सीखा: स्थान बिंदु से बाहर की ओर गिने जाते हैं।",
    "Place of the lit digit?": "चमकते अंक का स्थान?",
    "Name the lit digit's place.": "चमकते अंक का स्थान बताओ।",
    "A big digit gets no bigger place.": "बड़े अंक को बड़ा स्थान नहीं मिलता।",
    "Place of the 3 in 7.328?": "7.328 में 3 का स्थान?",
    "Find this one's place the same way.": "इसका स्थान भी उसी तरह ढूँढो।",
    "Where did your counting begin?": "तुम्हारी गिनती कहाँ से शुरू हुई?",
    "How many hundreds are in 48,600?": "48,600 में कितने सैकड़े हैं?",
    "Cut at the hundreds; type how many.": "सैकड़े पर काटो; गिनती लिखो।",
    "Every digit up to the cut counts.": "कट तक का हर अंक गिना जाता है।",
    "Yes: the 8 in hundredths, the 2 in thousandths.": "हाँ: 8 सौवें भाग में, 2 हज़ारवें भाग में।",
    "Yes, the 3 is the first column past the dot.": "हाँ, 3 बिंदु के बाद पहले खाने में है।",
    "Yes, 486 hundreds in all.": "हाँ, कुल 486 सैकड़े।",
    "Place and place value are not the same word": "स्थान और स्थानीय मान एक जैसे नहीं हैं",
    "Tap the name over the lit digit.": "चमकते अंक के ऊपर का नाम टैप करो।",
    "The name sits on top of its column.": "नाम अपने खाने के ऊपर लिखा है।",
    "That is its place; now tap the digit.": "यह उसका स्थान है; अब अंक टैप करो।",
    "The digit is in the ringed box.": "अंक घेरे वाले डिब्बे में है।",
    "Say where it sits first, then how much.": "पहले बताओ कहाँ है, फिर कितने का।",
    "The digit tells how many pieces; the heading tells which piece.": "अंक: कितने; शीर्षक: कौन सा टुकड़ा।",
    "A place is where a digit sits, a name. Its place value is what it is worth, an amount.": "स्थान वह जगह है जहाँ अंक बैठा है, एक नाम। स्थानीय मान वहाँ उसका मान है, एक राशि।",
    "You learned: the place is a name, the place value an amount.": "तुमने सीखा: स्थान एक नाम है, स्थानीय मान एक राशि।",
    "Which place holds the lit digit?": "चमकता अंक किस स्थान पर है?",
    "Choose the name for its place.": "उसके स्थान का नाम चुनो।",
    "Read the headings on either side of it.": "उसके दोनों ओर के शीर्षक पढ़ो।",
    "Worth of the 7 in 91.507?": "91.507 में 7 का मान?",
    "Fill both boxes of the Worth card.": "मान कार्ड के दोनों डिब्बे भरो।",
    "How many of that piece make one?": "कितने ऐसे टुकड़े मिलकर एक बनें?",
    "Real worth of the 6 in 5.63?": "5.63 में 6 का असली मान?",
    "Tenths is a place; type the worth.": "दसवाँ भाग एक स्थान है; मान लिखो।",
    "Is it worth 6, or 6 of some piece?": "मान 6 है, या किसी टुकड़े के 6?",
    "Yes, and there the 1 is worth one tenth, which is 0.1.": "हाँ, और वहाँ 1 का मान एक दसवाँ भाग है, यानी 0.1।",
    "Yes, the 7 is worth seven thousandths, which is 0.007.": "हाँ, 7 का मान सात हज़ारवें भाग है, यानी 0.007।",
    "Yes, the 6 is worth six tenths, which is 0.6, not 6.": "हाँ, 6 का मान छह दसवें भाग है, यानी 0.6, न कि 6।",
    "Adding the worths back up": "मानों को वापस जोड़ना",
    "Tap Down to send every worth down.": "नीचे भेजो दबाकर हर मान नीचे लाओ।",
    "Down is the key under the bar.": "नीचे भेजो बटन पट्टी के नीचे है।",
    "Now tap Add to add up the row.": "अब जोड़ो दबाकर पंक्ति जोड़ो।",
    "Add sits to the right of Down.": "जोड़ो बटन उसके दाईं ओर है।",
    "Add each digit's worth, not the digit.": "अंक नहीं, हर अंक का मान जोड़ो।",
    "Each worth fills only its own column.": "हर मान सिर्फ़ अपना खाना भरता है।",
    "The worths of all the digits add back to the number, and that checks every one.": "सभी अंकों के मान जोड़ने पर वही संख्या मिलती है, और यही हर एक की जाँच है।",
    "You learned: every digit's worth adds back to the number.": "तुमने सीखा: हर अंक का मान जोड़ने पर वही संख्या मिलती है।",
    "Add all the worths in the bar": "पट्टी के सारे मान जोड़ो",
    "Now you do it: tap Down, then add.": "अब तुम करो: नीचे भेजो, फिर जोड़ो।",
    "What is each digit worth in its column?": "अपने खाने में हर अंक का मान?",
    "What do all five worths make?": "पाँचों मान मिलकर कितने बनते हैं?",
    "Tap Down, then total the worths.": "नीचे भेजो दबाओ, फिर मान जोड़ो।",
    "Did the worths after the dot go in?": "क्या बिंदु के बाद के मान जुड़े?",
    "Add up all six worths": "छहों मान जोड़ो",
    "One more worth this time; tap Down.": "इस बार एक मान ज़्यादा; नीचे भेजो।",
    "Was each worth added in full?": "क्या हर मान पूरा जोड़ा गया?",
    "Yes, the worths add back to 23.451.": "हाँ, मान जुड़कर फिर 23.451 बने।",
    "Right, now the total is whole.": "सही, अब जोड़ पूरा है।",
    "Yes, they make 472.836.": "हाँ, ये मिलकर 472.836 बनाते हैं।",
    "hundreds": "सैकड़ा",
    "tens": "दहाई",
    "ones": "इकाई",
    "tenths": "दसवाँ भाग",
    "hundredths": "सौवाँ भाग",
    "thousandths": "हज़ारवाँ भाग",
    "tenth": "दसवाँ भाग",
    "hundredth": "सौवाँ भाग",
    "thousandth": "हज़ारवाँ भाग",
    "thousands": "हज़ार",
    "ten thousands": "दस हज़ार",
    "place": "स्थान",
    "worth": "मान",
    "Worth": "मान",
    "Grow": "बढ़ाओ",
    "Count": "गिनो",
    "Down": "नीचे भेजो",
    "Add": "जोड़ो",
    "Worths": "मान",
    "Tap a name, then press Enter.": "पहले नाम टैप करो, फिर दर्ज करें दबाओ।",
    "Tap all three names in, then press Enter.": "तीनों नाम टैप करो, फिर दर्ज करें दबाओ।",
    "numerator": "अंश",
    "denominator": "हर",
    "the heading over the lit digit": "चमकते अंक के ऊपर का शीर्षक",
    "the lit digit": "चमकता अंक",
    "take back tenths": "दसवाँ भाग वापस लो",
    "take back hundredths": "सौवाँ भाग वापस लो",
    "take back thousandths": "हज़ारवाँ भाग वापस लो",
    "cut at the ten thousands": "दस हज़ार पर काटो",
    "cut at the thousands": "हज़ार पर काटो",
    "cut at the hundreds": "सैकड़े पर काटो",
    "cut at the tens": "दहाई पर काटो",
    "cut at the ones": "इकाई पर काटो",
    "change the hundreds digit": "सैकड़े का अंक बदलो",
    "change the tens digit": "दहाई का अंक बदलो",
    "change the ones digit": "इकाई का अंक बदलो",
    "change the tenths digit": "दसवें भाग का अंक बदलो",
    "change the hundredths digit": "सौवें भाग का अंक बदलो",
    "change the thousandths digit": "हज़ारवें भाग का अंक बदलो",
  },
  gu: {
    "Place and Worth Chart": "સ્થાન અને કિંમતનો ચાર્ટ",
    "Free play: tap a column to change its digit, then tap Worths to see each worth.": "મુક્ત રમત: ખાના પર ટેપ કરી અંક બદલો, પછી કિંમતો પર ટેપ કરો.",
    "What comes after the ones on a place value chart?": "સ્થાનકિંમત ચાર્ટમાં એકમ પછી શું આવે છે?",
    "The chart carries on past the point": "ચાર્ટ દશાંશ ચિહ્નથી આગળ પણ ચાલે છે",
    "Tap Grow to carry the chart on.": "વધારો પર ટેપ કરી ચાર્ટ આગળ લઈ જાઓ.",
    "Grow is the key under the chart.": "વધારો બટન ચાર્ટની નીચે છે.",
    "The dot comes right after the ones; tap Grow.": "એકમ પછી તરત ટપકું આવે; વધારો દબાવો.",
    "Press the glowing Grow key.": "ચમકતું વધારો બટન દબાવો.",
    "That is a tenth of a one; tap Grow once more.": "આ એકનો દશમો ભાગ; ફરી વધારો દબાવો.",
    "Press Grow at the foot once more.": "નીચેનું વધારો ફરી એક વાર દબાવો.",
    "Smaller again; tap Grow one last time.": "હજી નાનું; છેલ્લી વાર વધારો દબાવો.",
    "One last press on the Grow key.": "બસ એક વાર ફરી વધારો બટન દબાવો.",
    "Which way do the pieces get smaller?": "ટુકડા કઈ બાજુ નાના થતા જાય છે?",
    "Each column is a tenth of the one on its left.": "દરેક ખાનું ડાબાનો દશમો ભાગ છે.",
    "The chart runs on past the ones, through a dot. Then come tenths, hundredths and thousandths.": "ચાર્ટ એકમથી આગળ, ટપકા પછી ચાલે છે. પછી દશમો, સોમો અને હજારમો ભાગ આવે.",
    "You learned: the chart runs on past the ones, through a dot.": "તમે શીખ્યા: ચાર્ટ એકમથી આગળ, એક ટપકા પછી પણ ચાલે છે.",
    "Name the columns after the dot": "ટપકા પછીનાં ખાનાંનાં નામ આપો",
    "Tap the names in, from the dot out.": "ટપકાથી શરૂ કરીને નામ ટેપ કરો.",
    "Tap a heading to take its name back.": "નામ પાછું લેવા શીર્ષક ટેપ કરો.",
    "How many tens are in 5,470?": "5,470 માં કેટલા દશક છે?",
    "Cut at the tens and type how many.": "દશક પાસે કાપો અને સંખ્યા લખો.",
    "Read all the digits up to the cut.": "કાપ સુધીના બધા અંક સાથે વાંચો.",
    "Name the places after the dot in 36.907": "36.907 માં ટપકા પછીનાં સ્થાનોનાં નામ આપો",
    "Same again, on a new number.": "નવી સંખ્યા પર ફરી એમ જ કરો.",
    "Which place sits right by the dot?": "ટપકાની તરત પાસે કયું સ્થાન છે?",
    "Yes: 5 tenths, 7 hundredths and 3 thousandths.": "હા: 5 દશમા, 7 સોમા અને 3 હજારમા ભાગ.",
    "Yes, 547 tens in all.": "હા, કુલ 547 દશક.",
    "Right, the pieces shrink as the chart runs on.": "સાચું, ચાર્ટ આગળ વધે તેમ ટુકડા નાના થાય છે.",
    "Counting places from the point": "દશાંશ ચિહ્નથી સ્થાન ગણવા",
    "Places count from the dot; tap Count.": "સ્થાન ટપકાથી ગણાય છે; ગણો દબાવો.",
    "Count sits just under the chart.": "ગણો બટન ચાર્ટની બરાબર નીચે છે.",
    "Tap Count to step one more column.": "એક ખાનું આગળ જવા ગણો દબાવો.",
    "Each tap moves one column right.": "દરેક ટેપ એક ખાનું જમણે લઈ જાય છે.",
    "Tap Count once more for the third.": "ત્રીજા માટે ફરી ગણો દબાવો.",
    "The heading turns as you count.": "ગણતાં જ શીર્ષક ફરી જાય છે.",
    "Find your starting column first.": "પહેલાં શરૂઆતનું ખાનું શોધો.",
    "Step one column at a time and count.": "એક એક ખાનું આગળ વધતાં ગણો.",
    "Position alone decides a digit's place. Places are counted from the point outwards.": "અંકનું સ્થાન ફક્ત તેની જગ્યાથી નક્કી થાય છે. સ્થાન ટપકાથી બહારની તરફ ગણાય છે.",
    "You learned: places are counted from the point outwards.": "તમે શીખ્યા: સ્થાન ટપકાથી બહારની તરફ ગણાય છે.",
    "Place of the lit digit?": "ચમકતા અંકનું સ્થાન?",
    "Name the lit digit's place.": "ચમકતા અંકનું સ્થાન કહો.",
    "A big digit gets no bigger place.": "મોટા અંકને મોટું સ્થાન મળતું નથી.",
    "Place of the 3 in 7.328?": "7.328 માં 3 નું સ્થાન?",
    "Find this one's place the same way.": "આનું સ્થાન પણ એ જ રીતે શોધો.",
    "Where did your counting begin?": "તમારી ગણતરી ક્યાંથી શરૂ થઈ?",
    "How many hundreds are in 48,600?": "48,600 માં કેટલા શતક છે?",
    "Cut at the hundreds; type how many.": "શતક પાસે કાપો; સંખ્યા લખો.",
    "Every digit up to the cut counts.": "કાપ સુધીનો દરેક અંક ગણાય છે.",
    "Yes: the 8 in hundredths, the 2 in thousandths.": "હા: 8 સોમા ભાગમાં, 2 હજારમા ભાગમાં.",
    "Yes, the 3 is the first column past the dot.": "હા, 3 ટપકા પછીના પહેલા ખાનામાં છે.",
    "Yes, 486 hundreds in all.": "હા, કુલ 486 શતક.",
    "Place and place value are not the same word": "સ્થાન અને સ્થાનકિંમત એક જ નથી",
    "Tap the name over the lit digit.": "ચમકતા અંકની ઉપરનું નામ ટેપ કરો.",
    "The name sits on top of its column.": "નામ પોતાના ખાનાની ઉપર લખેલું છે.",
    "That is its place; now tap the digit.": "આ તેનું સ્થાન છે; હવે અંક ટેપ કરો.",
    "The digit is in the ringed box.": "અંક ઘેરાવાળા ડબ્બામાં છે.",
    "Say where it sits first, then how much.": "પહેલાં ક્યાં છે તે, પછી કેટલાનો.",
    "The digit tells how many pieces; the heading tells which piece.": "અંક: કેટલા; શીર્ષક: કયો ટુકડો.",
    "A place is where a digit sits, a name. Its place value is what it is worth, an amount.": "સ્થાન એ જગ્યા છે જ્યાં અંક બેઠો છે, એક નામ. સ્થાનકિંમત ત્યાં તેની કિંમત છે, એક રકમ.",
    "You learned: the place is a name, the place value an amount.": "તમે શીખ્યા: સ્થાન એક નામ છે, સ્થાનકિંમત એક રકમ.",
    "Which place holds the lit digit?": "ચમકતો અંક કયા સ્થાને છે?",
    "Choose the name for its place.": "તેના સ્થાનનું નામ પસંદ કરો.",
    "Read the headings on either side of it.": "તેની બંને બાજુનાં શીર્ષક વાંચો.",
    "Worth of the 7 in 91.507?": "91.507 માં 7 ની કિંમત?",
    "Fill both boxes of the Worth card.": "કિંમત કાર્ડના બંને ડબ્બા ભરો.",
    "How many of that piece make one?": "એવા કેટલા ટુકડા મળીને એક બને?",
    "Real worth of the 6 in 5.63?": "5.63 માં 6 ની સાચી કિંમત?",
    "Tenths is a place; type the worth.": "દશમો ભાગ એક સ્થાન છે; કિંમત લખો.",
    "Is it worth 6, or 6 of some piece?": "કિંમત 6 છે, કે કોઈ ટુકડાના 6?",
    "Yes, and there the 1 is worth one tenth, which is 0.1.": "હા, અને ત્યાં 1 ની કિંમત એક દશમો ભાગ છે, એટલે 0.1.",
    "Yes, the 7 is worth seven thousandths, which is 0.007.": "હા, 7 ની કિંમત સાત હજારમા ભાગ છે, એટલે 0.007.",
    "Yes, the 6 is worth six tenths, which is 0.6, not 6.": "હા, 6 ની કિંમત છ દશમા ભાગ છે, એટલે 0.6, 6 નહીં.",
    "Adding the worths back up": "કિંમતો પાછી ઉમેરવી",
    "Tap Down to send every worth down.": "નીચે મોકલો દબાવી કિંમતો લાવો.",
    "Down is the key under the bar.": "નીચે મોકલો બટન પટ્ટીની નીચે છે.",
    "Now tap Add to add up the row.": "હવે ઉમેરો દબાવી હરોળ ઉમેરો.",
    "Add sits to the right of Down.": "ઉમેરો બટન તેની જમણી બાજુ છે.",
    "Add each digit's worth, not the digit.": "અંક નહીં, દરેક અંકની કિંમત ઉમેરો.",
    "Each worth fills only its own column.": "દરેક કિંમત પોતાનું જ ખાનું ભરે.",
    "The worths of all the digits add back to the number, and that checks every one.": "બધા અંકોની કિંમત ઉમેરતાં એ જ સંખ્યા મળે છે, અને એ જ દરેકની ચકાસણી છે.",
    "You learned: every digit's worth adds back to the number.": "તમે શીખ્યા: દરેક અંકની કિંમત ઉમેરતાં એ જ સંખ્યા મળે છે.",
    "Add all the worths in the bar": "પટ્ટીની બધી કિંમતો ઉમેરો",
    "Now you do it: tap Down, then add.": "હવે તમે કરો: નીચે મોકલો, પછી ઉમેરો.",
    "What is each digit worth in its column?": "દરેક અંકની તેના ખાનામાં કિંમત શું?",
    "What do all five worths make?": "પાંચેય કિંમતો મળીને કેટલી થાય?",
    "Tap Down, then total the worths.": "નીચે મોકલો દબાવો, પછી કિંમતો ઉમેરો.",
    "Did the worths after the dot go in?": "શું ટપકા પછીની કિંમતો ઉમેરાઈ?",
    "Add up all six worths": "છએ છ કિંમતો ઉમેરો",
    "One more worth this time; tap Down.": "આ વખતે એક કિંમત વધુ; નીચે મોકલો.",
    "Was each worth added in full?": "શું દરેક કિંમત પૂરી ઉમેરાઈ?",
    "Yes, the worths add back to 23.451.": "હા, કિંમતો ઉમેરતાં ફરી 23.451 થયા.",
    "Right, now the total is whole.": "સાચું, હવે સરવાળો પૂરો છે.",
    "Yes, they make 472.836.": "હા, તે મળીને 472.836 થાય છે.",
    "hundreds": "શતક",
    "tens": "દશક",
    "ones": "એકમ",
    "tenths": "દશમો ભાગ",
    "hundredths": "સોમો ભાગ",
    "thousandths": "હજારમો ભાગ",
    "tenth": "દશમો ભાગ",
    "hundredth": "સોમો ભાગ",
    "thousandth": "હજારમો ભાગ",
    "thousands": "હજાર",
    "ten thousands": "દસ હજાર",
    "place": "સ્થાન",
    "worth": "કિંમત",
    "Worth": "કિંમત",
    "Grow": "વધારો",
    "Count": "ગણો",
    "Down": "નીચે મોકલો",
    "Add": "ઉમેરો",
    "Worths": "કિંમતો",
    "Tap a name, then press Enter.": "પહેલાં નામ ટેપ કરો, પછી દાખલ કરો દબાવો.",
    "Tap all three names in, then press Enter.": "ત્રણેય નામ ટેપ કરો, પછી દાખલ કરો દબાવો.",
    "numerator": "અંશ",
    "denominator": "છેદ",
    "the heading over the lit digit": "ચમકતા અંકની ઉપરનું શીર્ષક",
    "the lit digit": "ચમકતો અંક",
    "take back tenths": "દશમો ભાગ પાછો લો",
    "take back hundredths": "સોમો ભાગ પાછો લો",
    "take back thousandths": "હજારમો ભાગ પાછો લો",
    "cut at the ten thousands": "દસ હજાર પાસે કાપો",
    "cut at the thousands": "હજાર પાસે કાપો",
    "cut at the hundreds": "શતક પાસે કાપો",
    "cut at the tens": "દશક પાસે કાપો",
    "cut at the ones": "એકમ પાસે કાપો",
    "change the hundreds digit": "શતકનો અંક બદલો",
    "change the tens digit": "દશકનો અંક બદલો",
    "change the ones digit": "એકમનો અંક બદલો",
    "change the tenths digit": "દશમા ભાગનો અંક બદલો",
    "change the hundredths digit": "સોમા ભાગનો અંક બદલો",
    "change the thousandths digit": "હજારમા ભાગનો અંક બદલો",
  },
};

/* ── the chart ───────────────────────────────────────────────────────────────────────────
   Six digit columns and the dot's own column between the ones (2) and the tenths (3). */
const PW_NAMES = ["hundreds", "tens", "ones", "tenths", "hundredths", "thousandths"];
/* one piece of a column, said of the digit 1 ("1 tenth") */
const PW_ONE = ["hundred", "ten", "one", "tenth", "hundredth", "thousandth"];
const PW_DEC = ["tenths", "hundredths", "thousandths"];
const PW_TRAY = ["ones", "tenths", "hundredths", "thousandths"];
/* a long whole number read the other way along: its own places, right to left from the ones */
const PW_BAY = ["ten thousands", "thousands", "hundreds", "tens", "ones"];
const PW_DEN = [1, 1, 1, 10, 100, 1000];
/* the number each guide-steps phase is taught on: the chapter's own worked examples */
const PW_STEPNUM = ["367.912", "367.912", "12.563", "12.563"];

/* the chapter's colours: a digit left of the point deep blue, right of it green, the point vermilion; a tenth
   piece amber, a hundredth rose, a thousandth sky blue; a zero only holding a place open grey (never faint) */
const PW_WHOLE = CONTENT.hundred;
const PW_FRACT = CONTENT.one;
const PW_DOT = CONTENT.pointer;
const PW_AMBER = CONTENT.ten;
const PW_ROSE = CONTENT.bead;
const PW_SKY = "#56B4E9";
const PW_GREY = "#767676";
const PW_PIECE = [PW_WHOLE, PW_WHOLE, PW_WHOLE, PW_AMBER, PW_ROSE, PW_SKY];
/* a heading turned face down: the chrome's own slate, never a content colour */
const PW_BACK = mix(CHROME.accent, "#FFFFFF", 0.42);
/* words on a key that cannot act now: still 4.5:1 on its flat face */
const PW_QUIET = mix(CHROME.ink, CHROME.panel, 0.35);
/* numerals take a deeper ink of their colour, so they read at 4.5:1 */
const pwInk = (c: string) => shade(c, 0.25);
/* a heading that would spill its column is set condensed, never smaller than the floor */
const pwFit = (s: string, w: number, size: number): any => (String(s).length * size * 0.6 > w ? { textLength: w, lengthAdjust: "spacingAndGlyphs" } : {});

/* the chart's columns from the room the working area has (box.w): the decimal columns keep 176 so their long
   headings fit; the whole columns give way first when the answer panel is open */
const pwGeo = (bw: number) => {
  const DW = 64, avail = bw - 32 - DW, even = Math.min(190, avail / 6);
  const CD = even >= 176 ? even : 176, CWw = even >= 176 ? even : (avail - 3 * 176) / 3;
  const width = 3 * CWw + DW + 3 * CD, x0 = (bw - width) / 2;
  const colX = (k: number) => (k < 3 ? x0 + k * CWw : x0 + 3 * CWw + DW + (k - 3) * CD);
  const colW = (k: number) => (k < 3 ? CWw : CD);
  return { x0, width, DW, dotX: x0 + 3 * CWw, colX, colW, colC: (k: number) => colX(k) + colW(k) / 2 };
};

/* "248.573" -> one digit a column, the ones pinned at column 2; null where a column is empty */
const pwCells = (s: string) => {
  const parts = String(s || "").split(".");
  const w = parts[0] || "", d = parts[1] || "";
  const c: any[] = [null, null, null, null, null, null];
  for (let i = 0; i < w.length && i < 3; i++) c[2 - i] = w[w.length - 1 - i];
  for (let i = 0; i < d.length && i < 3; i++) c[3 + i] = d[i];
  return c;
};
/* what the digit in column k is worth there: a whole number, or [numerator, denominator] */
const pwWorth = (k: number, d: string) => (k < 3 ? Number(d) * Math.pow(10, 2 - k) : [Number(d), PW_DEN[k]]);
/* two written numbers read digit for digit from the left: the first column where they part, "dot" where only one
   of them has a point, null when they read the same */
const pwFirstPart = (a: string, b: string) => {
  const ca = pwCells(a), cb = pwCells(b);
  for (let k = 0; k < 3; k++) if ((ca[k] ?? "") !== (cb[k] ?? "")) return k;
  if (String(a).includes(".") !== String(b).includes(".")) return "dot";
  for (let k = 3; k < 6; k++) if ((ca[k] ?? "") !== (cb[k] ?? "")) return k;
  return null;
};

/* ── phases ──────────────────────────────────────────────────────────────────────────────
   kinds:  grow    the columns past the dot stand bare: tap the three names in, from the dot out; Enter
           bay     a long whole number in its own chart: tap a column to cut there, then type how many
           place   count from the dot (Count), then tap the NAME of the lit digit's place in; Enter
           worth   the AMOUNT the lit digit is worth there, typed on the Worth card (a stacked fraction)
           rebuild Down sends every worth into the bar; type what they add up to (a decimal, the point key) */
const PHASES = [
  {
    n: 1,
    concept: "The chart carries on past the point",
    conceptId: "M1.S2.T5.C16", objectiveIds: ["O7"],
    says: ["What could come after the ones?"],
    steps: [
      { say: "Tap Grow to carry the chart on.", on: "grow", hint: "Grow is the key under the chart." },
      { say: "The dot comes right after the ones; tap Grow.", on: "grow", hint: "Press the glowing Grow key." },
      { say: "That is a tenth of a one; tap Grow once more.", on: "grow", hint: "Press Grow at the foot once more." },
      { say: "Smaller again; tap Grow one last time.", on: "grow", hint: "One last press on the Grow key." },
    ],
    stepHold: 2200,
    ladder: ["Which way do the pieces get smaller?", "Each column is a tenth of the one on its left."],
    closing: "The chart runs on past the ones, through a dot. Then come tenths, hundredths and thousandths.",
    learned: "You learned: the chart runs on past the ones, through a dot.",
    traceback: "The chart is grown again from the ones outwards, each new column named in turn with its piece under it, below the child's own headings; a long number is cut again at the right column and read.",
    items: [
      /* learn ML1: answer in the plan = 2 hundreds, 4 tens, 8 ones, then the dot, then 5 tenths, 7 hundredths, 3 thousandths */
      { qid: "M1.S2.T5.C16:ML1", kind: "grow", num: "248.573", cards: ["hundredths", "thousandths", "tenths"], pad: "enter", winMs: 4100,
        ask: "Name the columns after the dot", say: "Tap the names in, from the dot out.",
        answer: "tenths|hundredths|thousandths", miss: "Tap a heading to take its name back." },
      /* practice 1: answer in the plan = 547 */
      { qid: "M1.S2.T5.C16:1", kind: "bay", num: "5470", drop: 1, winMs: 3400,
        ask: "How many tens are in 5,470?", say: "Cut at the tens and type how many.",
        answer: 547, miss: "Read all the digits up to the cut." },
      /* practice 2: answer in the plan = Tenths, then hundredths, then thousandths */
      { qid: "M1.S2.T5.C16:2", kind: "grow", num: "36.907", cards: ["thousandths", "tenths", "hundredths"], pad: "enter", winMs: 3400,
        ask: "Name the places after the dot in 36.907", say: "Same again, on a new number.",
        answer: "tenths|hundredths|thousandths", miss: "Which place sits right by the dot?" },
    ],
  },
  {
    n: 2,
    concept: "Counting places from the point",
    conceptId: "M1.S2.T5.C17", objectiveIds: ["O7"],
    says: ["Count along from the dot. Where does this one sit?"],
    steps: [
      { say: "Places count from the dot; tap Count.", on: "count", hint: "Count sits just under the chart." },
      { say: "Tap Count to step one more column.", on: "count", hint: "Each tap moves one column right." },
      { say: "Tap Count once more for the third.", on: "count", hint: "The heading turns as you count." },
    ],
    stepHold: 2000,
    ladder: ["Find your starting column first.", "Step one column at a time and count."],
    closing: "Position alone decides a digit's place. Places are counted from the point outwards.",
    learned: "You learned: places are counted from the point outwards.",
    traceback: "The count runs again from the dot, numbering each column it passes, and the lit column's heading turns over; where the count began at the left hand end, that count is drawn first and both stay; a long number is cut again at the right column.",
    items: [
      /* learn ML2: answer in the plan = The 8 is in the hundredths place and the 2 is in the thousandths place
         (graded on the 8; the 2 is named at the win); meets the misconception: the bigger digit given the bigger place */
      { qid: "M1.S2.T5.C17:ML2", kind: "place", num: "6.482", lit: 4, pad: "enter", winMs: 3900,
        ask: "Place of the lit digit?", say: "Name the lit digit's place.",
        answer: "hundredths", miss: "A big digit gets no bigger place." },
      /* practice 3: answer in the plan = The tenths place; meets the misconception: places counted from the left hand end */
      { qid: "M1.S2.T5.C17:3", kind: "place", num: "7.328", lit: 3, err: "left", pad: "enter", winMs: 3600,
        ask: "Place of the 3 in 7.328?", say: "Find this one's place the same way.",
        answer: "tenths", miss: "Where did your counting begin?" },
      /* practice 4: answer in the plan = 486 */
      { qid: "M1.S2.T5.C17:4", kind: "bay", num: "48600", drop: 2, winMs: 3600,
        ask: "How many hundreds are in 48,600?", say: "Cut at the hundreds; type how many.",
        answer: 486, miss: "Every digit up to the cut counts." },
    ],
  },
  {
    n: 3,
    concept: "Place and place value are not the same word",
    conceptId: "M1.S2.T5.C18", objectiveIds: ["O8"],
    says: ["Where does it sit? Now say how much it is worth sitting there."],
    steps: [
      { say: "Tap the name over the lit digit.", on: "place", hint: "The name sits on top of its column." },
      { say: "That is its place; now tap the digit.", on: "worth", hint: "The digit is in the ringed box." },
    ],
    stepHold: 2400,
    ladder: ["Say where it sits first, then how much.", "The digit tells how many pieces; the heading tells which piece."],
    closing: "A place is where a digit sits, a name. Its place value is what it is worth, an amount.",
    learned: "You learned: the place is a name, the place value an amount.",
    traceback: "The lit column is read twice over: its heading turns over to name the place, and its pieces are drawn at their real size with their worth on the Worth card.",
    items: [
      /* learn ML3: answer in the plan = Its place is the tenths place, and its place value is 1/10, which is 0.1
         (the place is asked; the place value 1/10 fills the Worth card at the win) */
      { qid: "M1.S2.T5.C18:ML3", kind: "place", num: "34.16", lit: 3, pad: "enter", winMs: 4800,
        ask: "Which place holds the lit digit?", say: "Choose the name for its place.",
        answer: "tenths", miss: "Read the headings on either side of it." },
      /* practice 5: answer in the plan = Its place is the thousandths place, and its place value is 7/1000, which is 0.007 */
      { qid: "M1.S2.T5.C18:5", kind: "worth", num: "91.507", lit: 5, parts: SLOT_FRACTION, cardName: "Worth", winMs: 5600,
        ask: "Worth of the 7 in 91.507?", say: "Fill both boxes of the Worth card.",
        answer: [7, 1000], miss: "How many of that piece make one?" },
      /* practice 6: answer in the plan = Tenths is the name of the place, not the worth; the place value is 6/10, which is 0.6
         the word tenths stands in the place slot, where it belongs; the child gives the worth */
      { qid: "M1.S2.T5.C18:6", kind: "worth", num: "5.63", lit: 3, parts: SLOT_FRACTION, cardName: "Worth", winMs: 4800,
        ask: "Real worth of the 6 in 5.63?", say: "Tenths is a place; type the worth.",
        answer: [6, 10], miss: "Is it worth 6, or 6 of some piece?" },
    ],
  },
  {
    n: 4,
    concept: "Adding the worths back up",
    conceptId: "M1.S2.T5.C19", objectiveIds: ["O8"],
    says: ["Add all the worths together. Where should they land?"],
    steps: [
      { say: "Tap Down to send every worth down.", on: "down", hint: "Down is the key under the bar." },
      { say: "Now tap Add to add up the row.", on: "add", hint: "Add sits to the right of Down." },
    ],
    stepHold: 3000,
    ladder: ["Add each digit's worth, not the digit.", "Each worth fills only its own column."],
    closing: "The worths of all the digits add back to the number, and that checks every one.",
    learned: "You learned: every digit's worth adds back to the number.",
    traceback: "The child's own sum is drawn with its total under the number and the first pair that parts ringed; then every worth walks down into a second row, which is added and reads as the number, digit for digit.",
    items: [
      /* learn ML4: answer in the plan = 20 + 3 + 4/10 + 5/100 + 1/1000, which comes back to 23.451 */
      { qid: "M1.S2.T5.C19:ML4", kind: "rebuild", num: "23.451", winMs: 4400,
        ask: "Add all the worths in the bar", say: "Now you do it: tap Down, then add.",
        answer: "23.451", miss: "What is each digit worth in its column?" },
      /* practice 7: answer in the plan = 50 + 2 + 8/10 + 7/100 + 4/1000, which comes back to 52.874
         meets the misconception: the digits after the dot left out of the sum */
      { qid: "M1.S2.T5.C19:7", kind: "rebuild", num: "52.874", err: "whole", winMs: 2600,
        ask: "What do all five worths make?", say: "Tap Down, then total the worths.",
        answer: "52.874", miss: "Did the worths after the dot go in?" },
      /* practice 8: answer in the plan = 400 + 70 + 2 + 8/10 + 3/100 + 6/1000, which comes to 472.836 */
      { qid: "M1.S2.T5.C19:8", kind: "rebuild", num: "472.836", winMs: 4700,
        ask: "Add up all six worths", say: "One more worth this time; tap Down.",
        answer: "472.836", miss: "Was each worth added in full?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  places: PW_NAMES, decimalPlaces: PW_DEC, denominators: PW_DEN, wholeNumberPlaces: PW_BAY,
  taughtOn: PW_STEPNUM, dotColumn: true, decimalColumnWidth: 176,
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a worth is a fraction (both boxes, as numbers); a count is digits only ("547", never "547." or
   "0547"); a total is a decimal in its written form ("23.451", never "23.45" or "23.4510"); a place is a
   name; a grown chart is the three names in the order they were put in */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return String(v ?? "").replace(/[\s,]/g, "") === String(item.answer);
  return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: every answer re-derived from the number itself, sharing no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const s = String(it.num || ""), cut = s.split("."), dec = cut[1] || "";
  const nameOf = (den: number) => ({ 10: "tenths", 100: "hundredths", 1000: "thousandths" } as any)[den];
  if (it.kind === "grow") return dec.length === 3 && [10, 100, 1000].map(nameOf).join("|") === it.answer;
  if (it.kind === "bay") return Math.floor(Number(s) / Math.pow(10, it.drop)) === it.answer;
  const at = it.lit - 2;   /* how many columns past the dot the lit digit stands */
  if (it.kind === "place") return at >= 1 && dec.length >= at && nameOf(Math.pow(10, at)) === it.answer;
  if (it.kind === "worth") return at >= 1 && Number(dec[at - 1]) === it.answer[0] && Math.pow(10, at) === it.answer[1];
  if (it.kind === "rebuild") {
    /* add every digit's worth in thousandths: the number must come back exactly */
    let sum = 0;
    (cut[0] || "").split("").reverse().forEach((c: string, i: number) => { sum += Number(c) * Math.pow(10, i) * 1000; });
    dec.split("").forEach((c: string, i: number) => { sum += Number(c) * Math.pow(10, 2 - i); });
    return dec.length === 3 && sum === Math.round(Number(s) * 1000) && String(it.answer) === s;
  }
  return false;
}));

/* a count of places that began at the left hand end of the number instead of at the dot */
const pwFromLeft = (item: any) => {
  const whole = String(item.num || "").split(".")[0] || "";
  return PW_DEC[Math.min(whole.length + (item.lit - 3), 2)];
};
/* the bare digits added, as if each were worth only itself */
const pwDigitSum = (s: string) => String(String(s).replace(/[^0-9]/g, "").split("").reduce((a: number, c: string) => a + Number(c), 0));
/* the whole number part alone, the digits after the dot left out */
const pwWholeOnly = (s: string) => String(Number(String(s).split(".")[0] || "0"));

/* the most likely wrong answer (the misconception the item meets); judge must reject it */
const nearMiss = (item: any) => {
  /* reads the columns after the point leftwards, so tenths ends up at the far right */
  if (item.kind === "grow") return String(item.answer).split("|").reverse().join("|");
  /* gives the digit standing in that column, not how many there are in all */
  if (item.kind === "bay") { const d = String(item.num); return Number(d[d.length - 1 - item.drop]); }
  /* counts from the left hand end, else gives the bigger digit the bigger place */
  if (item.kind === "place") return item.err === "left" ? pwFromLeft(item) : item.answer === "tenths" ? "hundredths" : "tenths";
  /* says the digit itself is the worth (six is worth six) */
  if (item.kind === "worth") return item.answer[0] + "|1";
  /* leaves the digits after the dot out, else adds the bare digits */
  if (item.kind === "rebuild") return item.err === "whole" ? pwWholeOnly(item.num) : pwDigitSum(item.num);
  return "~";
};

/* the forms of an answer that no question, hint or ladder line may print. A grown chart's names are printed on
   its cards, and a total IS the number in the question, so neither has a form to hide */
const answerForms = (item: any) =>
  item.kind === "grow" || item.kind === "rebuild" ? []
    : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
      : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
        : [String(item.answer)];

/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* what the answer slot prints. A grown chart's answer is three place names, far too long for the slot, so it carries
   how many columns from the dot each name stands for, in the order they were put in ("1 2 3" is right). Every other
   answer is printed as it is (a part box is never rewritten). */
const format = (v: any, k?: any) => {
  if (k !== undefined && k !== null && typeof k === "number") return v;
  const s = String(v === null || v === undefined ? "" : v);
  if (s.indexOf("|") < 0) return s;
  const at = s.split("|").map((x: string) => PW_DEC.indexOf(x));
  return at.some((i: number) => i < 0) ? s : "";
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (HOOK.set) HOOK.set(item.answer);
  return T.submit(item.parts ? item.answer.join("|") : item.answer);
};
/* the agent's answer(): it sets the working area as a child would. A name or a grown chart is made on the picture
   (Enter then sends it); a total is a decimal, so the tool types it itself (the runtime's typing keeps digits only);
   a count is typed by the runtime; a worth goes into the card's two boxes by the runtime */
const answer = (item: any, v: any) => {
  if (!HOOK.set) return undefined;
  if (item.kind === "grow" || item.kind === "place") return HOOK.set(v) ? true : undefined;
  if (item.kind === "rebuild") { HOOK.set(v); if (HOOK.type) { HOOK.type(String(v)); return true; } return undefined; }
  if (item.kind === "bay") HOOK.set(v);
  return undefined;
};
/* the agent's check() before Enter: nothing waits, so Enter (undefined); in a guide step Enter performs the step */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* a teacher agent drives (AI mode, or any mount where toolApi.check() has been called: only the agent calls it, a
   child's Enter never does). window.toolApi refuses an answer while the pad is locked, so for an agent the phase 4
   totals are not held behind Down: its answer() sends the worths down itself */
let PW_AGENT = false;
const pwAgentMode = () => {
  if (PW_AGENT) return true;
  try { const A: any = (window as any)[TOOL_ID] || (window as any).toolApi; return !!(A && A.getState && A.getState().mode === "ai"); } catch (e) { return false; }
};

/* every right answer gets its own line, one sentence */
function pwSayWin(qid: any, api: any) {
  if (qid === "M1.S2.T5.C16:ML1") api.say("Yes: 5 tenths, 7 hundredths and 3 thousandths.");
  else if (qid === "M1.S2.T5.C16:1") api.say("Yes, 547 tens in all.");
  else if (qid === "M1.S2.T5.C16:2") api.say("Right, the pieces shrink as the chart runs on.");
  else if (qid === "M1.S2.T5.C17:ML2") api.say("Yes: the 8 in hundredths, the 2 in thousandths.");
  else if (qid === "M1.S2.T5.C17:3") api.say("Yes, the 3 is the first column past the dot.");
  else if (qid === "M1.S2.T5.C17:4") api.say("Yes, 486 hundreds in all.");
  else if (qid === "M1.S2.T5.C18:ML3") api.say("Yes, and there the 1 is worth one tenth, which is 0.1.");
  else if (qid === "M1.S2.T5.C18:5") api.say("Yes, the 7 is worth seven thousandths, which is 0.007.");
  else if (qid === "M1.S2.T5.C18:6") api.say("Yes, the 6 is worth six tenths, which is 0.6, not 6.");
  else if (qid === "M1.S2.T5.C19:ML4") api.say("Yes, the worths add back to 23.451.");
  else if (qid === "M1.S2.T5.C19:7") api.say("Right, now the total is whole.");
  else if (qid === "M1.S2.T5.C19:8") api.say("Yes, they make 472.836.");
}

/* ── small pieces the working area draws ─────────────────────────────────────────────────── */

const PW_CSS = `
.pw-in{animation:pwIn 420ms ease-out both}
.pw-drop{animation:pwDrop 520ms cubic-bezier(.3,.7,.25,1) both}
@keyframes pwIn{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:none}}
@keyframes pwDrop{from{opacity:0;transform:translateY(-80px)}to{opacity:1;transform:none}}
.pw-ring{animation:pwRing 1.2s ease-in-out infinite}
@keyframes pwRing{50%{stroke-opacity:.25}}
@media (prefers-reduced-motion:reduce){.pw-in,.pw-drop,.pw-ring{animation:none}}
`;

/* a worth drawn stacked, the way the book writes it: numerator over a bar over denominator (never "5/10") */
function pwFrac(x: number, cy: number, a: any, b: any, ink: string, size = T.micro) {
  const w = Math.max(40, Math.max(String(a).length, String(b).length) * size * 0.62 + 10);
  return (
    <g>
      <text x={x} y={cy - 8} textAnchor="middle" fontSize={size} fontWeight={700} fill={ink}>{a}</text>
      <rect x={x - w / 2} y={cy - 2} width={w} height={4} rx={2} fill={ink} />
      <text x={x} y={cy + size + 2} textAnchor="middle" fontSize={size} fontWeight={700} fill={ink}>{b}</text>
    </g>
  );
}

/* d pieces of column k drawn at their real size inside one whole one (an s x s square): a tenth is a strip of the
   ten, a hundredth one square of the hundred, a thousandth a sliver of a hundredth; with `zoom` that hundredth is
   drawn again large beside the whole, so the slivers can be counted.
   The whole is the chapter's chocolate piece: its plain square first (the fallback, the whole drawing without
   pictures), the <Skin name="piece"> over it (only for a one or a part of one, k >= 2: a ten or a hundred is never one
   piece of chocolate), then the cut lines of every strip, cell and sliver (each its own rect, transparent unless
   shaded) and the shaded pieces as tints with a dark outline, so every reading is drawn in code over the picture. */
function pwPieces(x: number, y: number, s: number, k: number, d: number, C: any, zoom = false) {
  const u = s / 10, col = PW_PIECE[k], out: any[] = [], op = k === 4 ? 0.8 : 0.72;
  const unit = (key: string, ux: number, uy: number, uw: number, uh: number, on: boolean) =>
    out.push(on ? <rect key={key} x={ux} y={uy} width={uw} height={uh} fill={col} fillOpacity={op} stroke={shade(col, 0.45)} strokeWidth={1.5} />
      : <rect key={key} x={ux} y={uy} width={uw} height={uh} fill="none" stroke={C.rule} strokeWidth={1} />);
  /* the whole one: its plain square, then the chocolate over it */
  out.push(<rect key="one" x={x} y={y} width={s} height={s} fill={k <= 2 ? tint(PW_WHOLE, 0.45) : "#FFFFFF"} />);
  if (k >= 2) out.push(<Skin key="skin" name="piece" x={x} y={y} w={s} h={s} fit="stretch" />);
  /* ten strips, the first d shaded */
  if (k === 3) for (let i = 0; i < 10; i++) unit("t" + i, x + i * u, y, u, s, i < d);
  /* a hundred cells, the first d shaded */
  if (k === 4) for (let i = 0; i < 100; i++) unit("h" + i, x + (i % 10) * u, y + Math.floor(i / 10) * u, u, u, i < d);
  /* a hundred cells, the first one cut into ten slivers, the first d of them shaded */
  if (k === 5) {
    for (let i = 1; i < 100; i++) unit("h" + i, x + (i % 10) * u, y + Math.floor(i / 10) * u, u, u, false);
    for (let i = 0; i < 10; i++) unit("m" + i, x + i * (u / 10), y, u / 10, u, i < d);
    out.push(<rect key="cell" x={x} y={y} width={u} height={u} fill="none" stroke={C.ink} strokeWidth={2} />);
  }
  out.push(<rect key="edge" x={x} y={y} width={s} height={s} fill="none" stroke={C.ink} strokeWidth={2} />);
  if (k === 5 && zoom) {
    /* that one cell drawn large (the chocolate again under it): its ten slivers, each its own rect */
    const zx = x + s + Math.min(36, Math.round(s * 0.36));
    out.push(<line key="z1" x1={x + u} y1={y} x2={zx} y2={y} stroke={C.dim} strokeWidth={2} strokeDasharray="5 5" />);
    out.push(<line key="z2" x1={x + u} y1={y + u} x2={zx} y2={y + s} stroke={C.dim} strokeWidth={2} strokeDasharray="5 5" />);
    out.push(<rect key="zw" x={zx} y={y} width={s} height={s} fill="#FFFFFF" />);
    out.push(<Skin key="zskin" name="piece" x={zx} y={y} w={s} h={s} fit="stretch" />);
    for (let i = 0; i < 10; i++) unit("zs" + i, zx + i * u, y, u, s, i < d);
    out.push(<rect key="ze" x={zx} y={y} width={s} height={s} fill="none" stroke={C.ink} strokeWidth={2} />);
  }
  return <g>{out}</g>;
}

/* a row of worths with the plus signs drawn between, centred on cx; `empty` draws the bar before anything comes down */
function pwChipRow(cx: number, y: number, h: number, maxW: number, chips: any[], C: any, empty = false, drop = false) {
  const n = chips.length;
  if (!n) return null;
  const gap = 44, cw = Math.min(124, (maxW - (n - 1) * gap) / n);
  const x0 = cx - (n * cw + (n - 1) * gap) / 2;
  return (
    <g>
      {chips.map((c: any, i: number) => {
        const x = x0 + i * (cw + gap), ink = pwInk(c.k < 3 ? PW_WHOLE : PW_FRACT), zero = String(c.v) === "0";
        return (
          <g key={i}>
            {i > 0 && <text x={x - gap / 2} y={y + h / 2 + 13} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>+</text>}
            {empty ? (
              <rect x={x} y={y} width={cw} height={h} rx={12} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 7" />
            ) : (
              <g className={drop ? "pw-drop" : undefined} style={drop ? ({ animationDelay: i * 110 + "ms" } as any) : undefined}>
                <rect x={x} y={y} width={cw} height={h} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
                <rect x={x + 10} y={y + 6} width={cw - 20} height={5} rx={2.5} fill={PW_PIECE[c.k]} />
                {Array.isArray(c.v) ? pwFrac(x + cw / 2, y + h / 2 + 4, c.v[0], c.v[1], ink)
                  : <text x={x + cw / 2} y={y + h / 2 + 15} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={zero ? PW_GREY : ink}>{String(c.v)}</text>}
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Its size is `box` ({ w, h, open }): the whole card (1472 x 528) with the answer panel shut and 1086 x 528 with
   it open; everything is laid out from box.w. The guide steps draw from props.step (what the child has done);
   a question's picture is the child's own; a correction is a layer of its own (`show`), drawn last with no
   pointer events, and the child's next act clears it, so it never writes into the child's pieces. */
function Work({ phase, n, item, index, stage, wrong, typed, part, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const busy = tl.busy;
  const bw = box && box.w ? box.w : W.w;
  const open = !!(box && box.open);
  const pn = (phase && phase.n) || n || 1;
  const free = stage === "free";
  const guide = !free && (stage === "demo" || stage === "teach");
  const kind = free ? "free" : guide ? "steps" : String(item.kind || "");
  const st = guide ? Math.max(0, Number(step) || 0) : 0;
  const won = !free && !guide && (stage === "win" || stage === "idle");
  const g = pwGeo(bw);
  const num = free ? "" : guide ? PW_STEPNUM[pn - 1] || "" : String(item.num || "");
  const lit = guide ? (pn === 3 ? 4 : -1) : kind === "place" || kind === "worth" ? Number(item.lit) : -1;

  const [pick, setPick] = useState<any[]>([]);          /* grow: the names put in, from the dot out */
  const [chosen, setChosen] = useState<any>(null);      /* place: the name in the place slot */
  const [cut, setCut] = useState(-1);                   /* bay: the column the child cut at */
  const [cnt, setCnt] = useState(0);                    /* place: columns counted from the dot */
  const [down, setDown] = useState(false);              /* rebuild: the worths are down in the bar */
  const [show, setShow] = useState<any>(null);          /* the correction's own layer */
  const [lightK, setLightK] = useState<any>(null);      /* the pair being read, digit for digit */
  const [fc, setFc] = useState<any[]>([null, null, null, null, null, null]);   /* free play: the digits */
  const [fw, setFw] = useState(false);                  /* free play: the worths on show */
  const pickRef = useRef<any[]>([]);
  const chosenRef = useRef<any>(null);
  const actedRef = useRef(true);       /* the child has acted since the last miss (a stale answer is never re-sent) */
  const staleRef = useRef<any>(null);  /* what the slot held when the last miss came */
  const setupFor = useRef<any>(null);
  const winFor = useRef<any>(null);
  const actAt = useRef<any>(null);
  const readFor = useRef(false);
  const downRef = useRef(false);     /* the worths are down (read by the agent's check() between renders) */

  /* a fresh picture when a question opens */
  useEffect(() => {
    if (stage !== "ask") return;
    const key = pn + ":" + index;
    if (setupFor.current === key) return;
    setupFor.current = key;
    tl.stop();
    pickRef.current = []; chosenRef.current = null; actedRef.current = true; staleRef.current = null;
    setPick([]); setChosen(null); setCut(-1); setCnt(0); setDown(false); setShow(null); setLightK(null);
    /* a total is only added once the worths are down: the pad and the Answer key wait, locked, until Down is tapped
       (released by Down, by the agent's answer, or by a miss's traceback) */
    downRef.current = false;
    if (kind === "rebuild" && !pwAgentMode()) api.lock(true);
  }, [stage, index]);
  /* ...and locked BEFORE such a total opens (while the last step's result or the win before it is on show), so the
     question never opens on the runtime's "tap the Answer key" line while the key still waits behind Down */
  useEffect(() => {
    if (free || pwAgentMode()) return;
    const items = (phase && phase.items) || [], steps = (phase && phase.steps) || [];
    const afterSteps = stage === "demo" && steps.length > 0 && st >= steps.length && items[0] && items[0].kind === "rebuild";
    const afterWin = stage === "win" && items[index + 1] && items[index + 1].kind === "rebuild";
    if (afterSteps || afterWin) api.lock(true);
  }, [stage, st, index]);
  useEffect(() => {
    if (!free) return;
    tl.stop(); setShow(null); setLightK(null);
    setFc([null, null, null, null, null, null]); setFw(false); api.lock(false);
  }, [free]);

  /* the pairs of two numbers read digit for digit from the left, each lighting as it is read */
  const readPairs = (s: string) => {
    const c = pwCells(s), order: any[] = [];
    [0, 1, 2].forEach((k) => { if (c[k] !== null) order.push(k); });
    if (String(s).includes(".")) order.push("dot");
    [3, 4, 5].forEach((k) => { if (c[k] !== null) order.push(k); });
    tl.run([[240, null], ...order.map((k: any) => [300, () => setLightK(k)]), [320, () => setLightK(null)]]);
  };
  useEffect(() => {
    if (guide && pn === 4 && st < 2) { readFor.current = false; return; }
    if (!(guide && pn === 4 && st >= 2) || readFor.current) return;
    readFor.current = true;
    readPairs(PW_STEPNUM[3]);
  }, [st, guide]);

  /* ── the guide steps: the act is the click; the picture follows props.step ── */
  const act = (on: any) => {
    if (stage !== "demo" || on !== stepOn) { api.did(on); return; }
    if (actAt.current === st) return;          /* the same step started twice (a click and an Enter): once */
    actAt.current = st;
    if (on === "down") api.sfx.settle(); else if (on === "add") api.sfx.trade(); else api.sfx.tick();
    /* the last act opens a total (phase 4): lock in the same update, so it opens with the pad waiting for Down */
    const steps = (phase && phase.steps) || [], items = (phase && phase.items) || [];
    const pre = st === steps.length - 1 && items[0] && items[0].kind === "rebuild" && !pwAgentMode();
    if (pre) api.lock(true);
    if (!api.did(on)) { actAt.current = null; if (pre) api.lock(false); }
  };

  /* a second tap on the same control within 400 ms is the same tap (a 45 ms double tap must not take two steps) */
  const lastTap = useRef<any>({});
  const tapAct = (on: any) => {
    const now = Date.now(), t0 = lastTap.current[on] || 0;
    lastTap.current[on] = now;
    if (now - t0 < 400) return;
    act(on);
  };

  /* ── what the child does at a question ── */
  const liveAsk = stage === "ask" && !busy;
  const touch = () => { actedRef.current = true; if (show) { setShow(null); staleRef.current = null; } };
  const putName = (name: string) => {
    if (!liveAsk || kind !== "grow") return;
    const cur = pickRef.current;
    if (cur.includes(name) || cur.length >= 3) return;
    touch();
    const nx = [...cur, name];
    pickRef.current = nx; setPick(nx);
    api.sfx.tick();
  };
  const takeBack = () => {
    if (!liveAsk || kind !== "grow" || !pickRef.current.length) return;
    touch();
    const nx = pickRef.current.slice(0, -1);
    pickRef.current = nx; setPick(nx);
  };
  const chooseName = (name: string) => {
    if (!liveAsk || kind !== "place") return;
    touch();
    chosenRef.current = name; setChosen(name);
    api.sfx.tick();
  };
  const cutAt = (j: number) => { if (!liveAsk || kind !== "bay") return; touch(); setCut(j); api.sfx.cut(); };
  const countOn = () => { if (!liveAsk || kind !== "place") return; touch(); setCnt((c: number) => (c >= 3 ? 0 : c + 1)); api.sfx.tick(); };
  const sendDown = () => { if (!liveAsk || kind !== "rebuild" || down) return; touch(); downRef.current = true; setDown(true); api.lock(false); api.sfx.settle(); };
  const freeTap = (k: number) => {
    if (!free) return;
    const order = [null, "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    setFc((c: any[]) => { const nx = c.slice(); nx[k] = order[(order.indexOf(nx[k]) + 1) % order.length]; return nx; });
    api.sfx.tick();
  };

  /* Enter: in a guide step it performs the step; at a question made on the picture it sends what the child made,
     once it is whole, and never the answer that just missed unchanged */
  const sendMade = () => {
    if (!liveAsk || !actedRef.current) return;
    if (kind === "grow") {
      if (pickRef.current.length === 3) { actedRef.current = false; api.submit(pickRef.current.join("|")); }
      else if (!wrong) api.say("Tap all three names in, then press Enter.");
    } else if (kind === "place") {
      if (chosenRef.current) { actedRef.current = false; api.submit(chosenRef.current); }
      else if (!wrong) api.say("Tap a name, then press Enter.");
    }
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : stage === "ask" && (kind === "grow" || kind === "place") ? sendMade : null);
  /* r24 (PATTERNS 9f): the bar's Enter key blinks only once a name question has something whole to send: a name in the place
     slot, or all three names in the grown chart, made since the last miss (never the stale answer); steady otherwise */
  useEffect(() => {
    if (!api.answerReady || (kind !== "grow" && kind !== "place")) return;
    const whole = kind === "grow" ? pick.length === 3 : !!chosen;
    api.answerReady(stage === "ask" && !busy && whole && actedRef.current);
  }, [stage, index, kind, pick.length, chosen, wrong, busy, show]);

  /* the agent and the dev driver */
  const bd = kind === "bay" ? String(item.num) : "";
  const bn = bd.length;
  const bCut = kind === "bay" ? bn - 1 - Number(item.drop) : -1;
  /* the agent's check(): on a total still waiting for Down it drops that token (the worths go down and the pad opens);
     otherwise undefined, so Enter answers (and in a guide step Enter performs the step) */
  HOOK.check = () => {
    PW_AGENT = true;
    if (kind === "rebuild" && stage === "ask" && !downRef.current) { downRef.current = true; setDown(true); api.lock(false); api.sfx.settle(); return true; }
    return undefined;
  };
  HOOK.demo = () => { if (stage === "demo" && stepOn) act(stepOn); };
  HOOK.type = (s: string) => api.setTyped(String(s));
  HOOK.set = (v: any) => {
    if (kind === "grow") {
      const nx = String(v || "").split("|").filter((x: string) => PW_DEC.includes(x));
      pickRef.current = nx; setPick(nx); actedRef.current = true; return true;
    }
    if (kind === "place") { chosenRef.current = String(v); setChosen(String(v)); actedRef.current = true; return true; }
    if (kind === "bay") { setCut(bCut); return undefined; }
    if (kind === "rebuild") { downRef.current = true; setDown(true); api.lock(false); return undefined; }
    return undefined;
  };

  /* ── the win: the maths settles, and the tool's own line ── */
  useEffect(() => {
    if (stage !== "win" || free) return;
    const key = pn + ":" + index;
    if (winFor.current === key) return;
    winFor.current = key;
    tl.stop(); setShow(null); setLightK(null);
    pwSayWin(item.qid, api);
    if (kind === "rebuild") readPairs(String(item.num));
  }, [stage]);

  /* ── the traceback: the maths redrawn on its own layer, ending on the whole right answer ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    staleRef.current = typed;
    actedRef.current = false;
    const steps: any[] = [];
    if (kind === "grow") {
      steps.push([300, () => setShow({ t: "grow", n: 0 })]);
      [1, 2, 3].forEach((j) => steps.push([700, () => setShow({ t: "grow", n: j })]));
      steps.push([500, null]);
    } else if (kind === "bay") {
      steps.push([300, () => setShow({ t: "bay", on: false })], [800, () => setShow({ t: "bay", on: true })], [600, null]);
    } else if (kind === "place") {
      const c = pwCells(String(item.num));
      const filled = [0, 1, 2, 3, 4, 5].filter((k) => c[k] !== null);
      const leftN = item.err === "left" ? filled.indexOf(lit) + 1 : 0;
      const dotN = lit - 2;
      steps.push([300, () => setShow({ t: "place", left: 0, dot: 0, flip: false })]);
      for (let i = 1; i <= leftN; i++) steps.push([480, () => setShow({ t: "place", left: i, dot: 0, flip: false })]);
      for (let i = 1; i <= dotN; i++) steps.push([480, () => setShow({ t: "place", left: leftN, dot: i, flip: false })]);
      /* where the bigger digit was given the bigger place: the lit digit and the biggest other one after the dot trade
         columns and back, the ring and the count staying on the column, so the column decides, never the digit */
      const other = pn === 2 && item.err !== "left" ? [3, 4, 5].filter((k) => k !== lit && c[k] !== null).sort((a, b) => Number(c[b]) - Number(c[a]))[0] : undefined;
      if (other !== undefined) {
        steps.push([1300, () => setShow({ t: "place", left: leftN, dot: dotN, flip: false, swap: other })]);
        steps.push([500, () => setShow({ t: "place", left: leftN, dot: dotN, flip: false })]);
      }
      steps.push([700, () => setShow({ t: "place", left: leftN, dot: dotN, flip: true, piece: pn === 3 })]);
      steps.push([600, null]);
    } else if (kind === "worth") {
      steps.push([300, () => setShow({ t: "worth", piece: false, card: false })],
        [800, () => setShow({ t: "worth", piece: true, card: false })],
        [900, () => setShow({ t: "worth", piece: true, card: true })], [500, null]);
    } else if (kind === "rebuild") {
      const s = String(item.num), v = String(typed || "");
      const c = pwCells(s), ks = [0, 1, 2, 3, 4, 5].filter((k) => c[k] !== null);
      const mine = v === pwDigitSum(s) ? { chips: ks.map((k) => ({ v: c[k], k })), total: v }
        : v === pwWholeOnly(s) ? { chips: ks.filter((k) => k < 3).map((k) => ({ v: pwWorth(k, c[k]), k })), total: v } : null;
      const base = { t: "rb", a: mine, aTot: false, b: 0, bTot: false };
      steps.push([300, () => setShow({ ...base })]);
      if (mine) steps.push([900, () => setShow({ ...base, aTot: true })], [1100, null]);
      ks.forEach((_: any, i: number) => steps.push([420, () => setShow({ ...base, aTot: !!mine, b: i + 1 })]));
      steps.push([700, () => setShow({ ...base, aTot: !!mine, b: ks.length, bTot: true })], [500, null]);
    }
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* on the card the correction's worth stands until the child types something new; its pieces stay */
  useEffect(() => {
    if (!show || show.t !== "worth" || !show.card || busy) return;
    if (staleRef.current !== null && typed !== staleRef.current) setShow({ ...show, card: false });
  }, [typed]);

  /* what the host and the agent read back (toolApi.getState); never the answer before it is given */
  api.share({ complete: stage === "idle", columns: pick.join("|") || null, placeSlot: chosen, cutAt: cut, worthsDown: down });

  /* ── drawing ── */
  const HY = 4, HH = 52, CY = 62, CH = 104;
  const cells: any[] = free ? fc : pwCells(num);
  /* the correction's swap beat: the lit digit and the other trade columns for a moment */
  const swapK = !free && show && show.t === "place" && show.swap !== undefined ? show.swap : -1;
  if (swapK >= 0 && lit >= 0) { const tmp = cells[lit]; cells[lit] = cells[swapK]; cells[swapK] = tmp; }
  const grownN = guide && pn === 1 ? st : 4;            /* phase 1's steps: the dot, then a decimal column a step */
  const colOn = (k: number) => k < 3 || grownN >= k - 1;
  const quietInk = mix(C.ink, "#FFFFFF", 0.3);

  const headOf = (k: number) => {
    if (k < 3) return "up";
    if (kind === "grow") return pick[k - 3] ? pick[k - 3] : won ? PW_NAMES[k] : "blank";
    if (kind === "steps" && pn === 2) return k - 3 < st ? "up" : "down";
    if (kind === "steps" && pn === 3 && st >= 1 && k === lit) return "lit";
    if (kind === "place") {
      if (k === lit && (won || (show && show.t === "place" && show.flip))) return "lit";
      if (pn === 2) return "down";
      return k === lit ? "down" : "up";
    }
    if (kind === "worth" && k === lit) return "lit";
    return "up";
  };
  const headEl = (k: number) => {
    const x = g.colX(k) + 3, w = g.colW(k) - 6, s = headOf(k);
    if (s === "blank") return <rect key={"h" + k} x={x} y={HY} width={w} height={HH} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 7" />;
    if (s === "down") {
      return (
        <g key={"h" + k}>
          <rect x={x} y={HY} width={w} height={HH} rx={10} fill={PW_BACK} stroke={shade(PW_BACK, 0.18)} strokeWidth={2} />
          {[0.25, 0.5, 0.75].map((f: number) => <line key={f} x1={x + w * f - 14} y1={HY + HH - 12} x2={x + w * f + 14} y2={HY + 12} stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" />)}
        </g>
      );
    }
    const label = tx(s === "up" || s === "lit" ? PW_NAMES[k] : s);
    return (
      <g key={"h" + k} className={kind === "grow" && pick[k - 3] ? "pw-in" : undefined}>
        <rect x={x} y={HY} width={w} height={HH} rx={10} fill={s === "lit" ? tint(C.accent, 0.72) : tint(C.panel, 0.45)} stroke={s === "lit" ? C.accent : C.rule} strokeWidth={s === "lit" ? 3 : 2} />
        {k >= 3 && <rect x={x + 12} y={HY + HH - 8} width={w - 24} height={4} rx={2} fill={PW_PIECE[k]} />}
        <text x={x + w / 2} y={HY + 34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink} {...pwFit(label, w - 16, T.micro)}>{label}</text>
      </g>
    );
  };
  /* phase 4: once Down is tapped the digits LEAVE the chart as their worths come down, each column left lit behind;
     only the worths remain to add, and the number stands again (beside its total) at the win */
  const gone = (kind === "steps" && pn === 4 && st === 1) || (kind === "rebuild" && down && !won && !(show && show.t === "rb"));
  const cellEl = (k: number) => {
    const x = g.colX(k) + 3, w = g.colW(k) - 6, d = cells[k], left = gone && d !== null && d !== undefined;
    return (
      <g key={"c" + k}>
        <rect x={x} y={CY} width={w} height={CH} rx={12} fill={lightK === k ? tint(C.accent, 0.8) : left ? tint(C.accent, 0.86) : "#FFFFFF"} stroke={C.rule} strokeWidth={2} />
        {d !== null && d !== undefined && !left && (
          <text key={swapK >= 0 && (k === lit || k === swapK) ? "s" : "d"} className={swapK >= 0 && (k === lit || k === swapK) ? "pw-in" : undefined}
            x={x + w / 2} y={CY + 80} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={d === "0" ? PW_GREY : pwInk(k < 3 ? PW_WHOLE : PW_FRACT)}>{d}</text>
        )}
      </g>
    );
  };
  const badge = (k: number, txt: any, where: string, solid: boolean, key: string) => {
    const x = where === "tr" ? g.colX(k) + g.colW(k) - 28 : g.colX(k) + 28;
    const y = where === "bl" ? CY + CH - 24 : CY + 24;
    return (
      <g key={key}>
        <circle cx={x} cy={y} r={19} fill={solid ? C.accent : "#FFFFFF"} stroke={solid ? "none" : where === "bl" ? C.dim : C.accent} strokeWidth={3} />
        <text x={x} y={y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={solid ? "#FFFFFF" : where === "bl" ? C.ink : shade(C.accent, 0.1)}>{txt}</text>
      </g>
    );
  };

  /* the place value chart, with the dot's own column */
  const chartEl = () => {
    const dotOn = grownN >= 1;
    const counted = kind === "steps" && pn === 2 ? st : kind === "place" && pn === 2 ? cnt : 0;
    const sh = show && show.t === "place" ? show : null;
    const c = pwCells(num), filled = [0, 1, 2, 3, 4, 5].filter((k) => c[k] !== null);
    return (
      <g>
        {[0, 1, 2, 3, 4, 5].filter(colOn).map(headEl)}
        {[0, 1, 2, 3, 4, 5].filter(colOn).map(cellEl)}
        {dotOn ? (
          <g className={guide && pn === 1 && st === 1 ? "pw-in" : undefined}>
            <rect x={g.dotX + 3} y={CY} width={g.DW - 6} height={CH} rx={12} fill={lightK === "dot" ? tint(C.accent, 0.8) : "#FFFFFF"} stroke={C.rule} strokeWidth={2} />
            <circle cx={g.dotX + g.DW / 2} cy={CY + 72} r={10} fill={PW_DOT} />
          </g>
        ) : (
          /* plain ruled ground past the ones, with no headings on it */
          <rect x={g.dotX + 3} y={HY} width={g.x0 + g.width - g.dotX - 6} height={CY + CH - HY} rx={14} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 12" />
        )}
        {/* the count from the dot: the child's own, or the steps' */}
        {Array.from({ length: counted }, (_: any, i: number) => badge(3 + i, i + 1, "tl", true, "n" + i))}
        {/* the correction's counts: from the left hand end (bottom), then from the dot (top right) */}
        {sh && filled.slice(0, sh.left).map((k: number, i: number) => badge(k, i + 1, "bl", false, "l" + i))}
        {sh && Array.from({ length: sh.dot }, (_: any, i: number) => badge(3 + i, i + 1, "tr", false, "d" + i))}
        {lit >= 0 && <rect x={g.colX(lit) - 2} y={CY - 5} width={g.colW(lit) + 4} height={CH + 10} rx={16} fill="none" stroke={shade(C.accent, 0.1)} strokeWidth={5} />}
      </g>
    );
  };

  /* a long whole number in its own chart, read the other way along */
  const bayEl = () => {
    const names = PW_BAY.slice(PW_BAY.length - bn), BW = Math.min(220, (bw - 32) / bn), bx0 = (bw - bn * BW) / 2;
    const xAt = (j: number) => bx0 + j * BW;
    const cutMark = (j: number, y: number, solid: boolean, label: string, size: number, key: string) => (
      <g key={key}>
        <line x1={xAt(j + 1)} y1={0} x2={xAt(j + 1)} y2={y + 8} stroke={solid ? C.accent : C.ink} strokeWidth={solid ? 5 : 3} strokeDasharray={solid ? undefined : "9 8"} />
        <path d={`M ${xAt(0) + 10} ${y} v 16 H ${xAt(j + 1) - 10} v -16`} fill="none" stroke={solid ? C.accent : C.ink} strokeWidth={4} strokeLinejoin="round" />
        <text x={(xAt(0) + xAt(j + 1)) / 2} y={y + 16 + size + 8} textAnchor="middle" fontSize={size} fontWeight={700} fill={solid ? shade(C.accent, 0.1) : C.ink}>{label}</text>
      </g>
    );
    const right = won || (show && show.t === "bay" && show.on);
    return (
      <g>
        {names.map((nm: string, j: number) => {
          const x = xAt(j) + 3, w = BW - 6, d = bd[j], lab = tx(nm);
          return (
            <g key={j}>
              <rect x={x} y={HY} width={w} height={HH} rx={10} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
              <text x={x + w / 2} y={HY + 34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink} {...pwFit(lab, w - 16, T.micro)}>{lab}</text>
              <rect x={x} y={CY} width={w} height={CH} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              <text x={x + w / 2} y={CY + 80} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={d === "0" ? PW_GREY : pwInk(PW_WHOLE)}>{d}</text>
            </g>
          );
        })}
        {cut >= 0 && !(right && cut === bCut) && cutMark(cut, 178, false, tx(names[cut]), T.micro, "mine")}
        {right && <g pointerEvents="none">{cutMark(bCut, 262, true, indian(Number(bd.slice(0, bCut + 1))) + " " + tx(names[bCut]), T.prompt, "right")}</g>}
        {liveAsk && names.map((nm: string, j: number) => (
          <Hit key={"col" + j} id={"col-" + j} x={xAt(j)} y={0} w={BW} h={CY + CH + 4} label={tx("cut at the " + nm)} onPress={() => cutAt(j)} />
        ))}
      </g>
    );
  };

  /* the foot keys (Grow, Count, Down, Add, Worths): live only when they can act */
  const footKey = (id: string, label: string, x: number, y: number, live: boolean, onPress: any, w = 240) => (
    <Key key={id} id={id} label={tx(label)} x={x} y={y} w={w} h={76} C={C} tone="key" disabled={!live} onClick={onPress}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={live ? toneInk("key", C.ink) : PW_QUIET}>{tx(label)}</text>
    </Key>
  );
  const FOOT = 436;

  /* a slot under the chart: its heading at the top, what it holds in the middle */
  const slotEl = (x: number, y: number, w: number, h: number, head: string, body: any, lightOn = false) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill="#FFFFFF" stroke={lightOn ? C.accent : C.rule} strokeWidth={lightOn ? 3 : 2} />
      <text x={x + 16} y={y + 30} fontSize={T.micro} fontWeight={600} fill={quietInk}>{tx(head)}</text>
      {body}
    </g>
  );
  /* the tray of place names (phases 2 and 3) or the three cards to put in (phase 1) */
  const trayEl = (names: string[], y: number, onTap: any, used: (nm: string) => boolean) => {
    const nN = names.length, gap = 18, cw = Math.min(250, (bw - 32 - (nN - 1) * gap) / nN), x0 = (bw - (nN * cw + (nN - 1) * gap)) / 2;
    return names.map((nm: string, i: number) => {
      const x = x0 + i * (cw + gap), lab = tx(nm);
      if (used(nm)) return <rect key={nm} x={x} y={y} width={cw} height={76} rx={RAD.key} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 7" />;
      return (
        <Key key={nm} id={"name-" + nm} label={lab} x={x} y={y} w={cw} h={76} C={C} tone="key" disabled={!liveAsk} onClick={() => onTap(nm)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={liveAsk ? toneInk("key", C.ink) : PW_QUIET} {...pwFit(lab, cw - 24, T.label)}>{lab}</text>
        </Key>
      );
    });
  };

  /* the Worth card (phase 3): a stacked fraction answered ON the card (cardAnswer) */
  const worthCard = (x: number, y: number) => {
    const w = 240, h = 184, top = y + 40, half = (h - 40) / 2;
    const asked = kind === "worth" && stage === "ask";
    const live = asked && !busy;
    let vals: any[] = ["", ""], caretAt = -1;
    if (kind === "steps" && pn === 3 && st >= 2) vals = ["6", "100"];
    else if (kind === "worth") {
      if (won) vals = item.answer.map(String);
      else if (show && show.t === "worth" && show.card) vals = item.answer.map(String);
      else if (asked) { vals = slotPartsOf(typed, 2); if (open && live) caretAt = Number(part) || 0; }
    } else if (kind === "place" && pn === 3 && (won || (show && show.t === "place" && show.piece))) {
      const d = pwCells(num)[lit]; vals = [String(d), String(PW_DEN[lit])];
    }
    const longest = Math.max(String(vals[0]).length, String(vals[1]).length), size = longest > 4 ? T.label : T.prompt;
    const boxAt = (j: number) => ({ x: x + 46, y: j === 0 ? top + 4 : top + half + 8, w: w - 92, h: half - 12 });
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={x + 16} y={y + 30} fontSize={T.micro} fontWeight={600} fill={quietInk}>{tx("worth")}</text>
        {[0, 1].map((j: number) => {
          const b = boxAt(j), on = caretAt === j, v = String(vals[j] ?? "");
          return (
            <g key={j}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={10} fill={on ? "#FFFFFF" : tint(C.panel, 0.6)} stroke={on ? C.accent : C.rule} strokeWidth={on ? 3 : 2} strokeDasharray={asked && !on && !v ? "7 6" : undefined} />
              {v && <text x={b.x + b.w / 2} y={b.y + b.h / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={pwInk(PW_FRACT)}>{v}</text>}
              {on && <rect className="c4-caret" x={b.x + b.w / 2 + (v.length * size * 0.31) + 4} y={b.y + 12} width={3} height={b.h - 24} fill={C.ink} />}
            </g>
          );
        })}
        <rect x={x + 40} y={top + half - 2} width={w - 80} height={5} rx={2.5} fill={C.ink} />
        {live && !open && <SlotPartBox id="answer-open" label={tx("Worth")} x={x} y={y} w={w} h={h} on={false} enabled onPick={() => api.openAnswer()} />}
        {live && !open && <BlinkRing x={x} y={y} w={w} h={h} rx={16} C={C} />}
        {live && open && [0, 1].map((j: number) => (
          <SlotPartBox key={"p" + j} id={"part-" + (j + 1)} label={tx(j === 0 ? "numerator" : "denominator")} x={x} y={j === 0 ? y + 30 : top + half} w={w} h={j === 0 ? top + half - y - 30 : y + h - top - half}
            on={caretAt === j} enabled onPick={() => api.pickPart(j)} />
        ))}
      </g>
    );
  };

  /* phase 3: the place slot, the Worth card and the pieces the lit digit counts */
  const p3El = () => {
    const sx = g.x0, cx = g.x0 + 330, px = g.x0 + 610, py = 206, ps = 140;
    const d = lit >= 0 ? pwCells(num)[lit] : null;
    let placeTxt: any = null, lightPlace = false;
    if (kind === "steps" && st >= 1) placeTxt = PW_NAMES[lit];
    else if (kind === "place") placeTxt = chosen;
    else if (kind === "worth") { placeTxt = PW_NAMES[lit]; lightPlace = true; }
    const pieceOn = (kind === "steps" && st >= 2) || ((kind === "worth" || kind === "place") && (won || (show && show.piece)));
    const sh = show && (show.t === "worth" || show.t === "place") && !won;
    return (
      <g>
        {slotEl(sx, 196, 300, 100, "place", placeTxt ? (
          <text className="pw-in" x={sx + 150} y={196 + 80} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink} {...pwFit(tx(placeTxt), 270, T.prompt)}>{tx(placeTxt)}</text>
        ) : null, lightPlace)}
        {worthCard(cx, 196)}
        {pieceOn && d !== null && (
          <g className="pw-in" pointerEvents={sh ? "none" : undefined}>
            {pwPieces(px, py, ps, lit, Number(d), C, lit === 5)}
            <text x={px} y={py + ps + 44} fontSize={T.label} fontWeight={700} fill={C.ink}>{d + " " + tx(d === "1" ? PW_ONE[lit] : PW_NAMES[lit])}</text>
          </g>
        )}
        {kind === "place" && trayEl(PW_TRAY, 414, chooseName, () => false)}
      </g>
    );
  };

  /* phase 2: the place slot, the Count key and the tray of names */
  const p2El = () => {
    const sx = g.x0;
    return (
      <g>
        {slotEl(sx, 196, 300, 100, "place", chosen ? (
          <text className="pw-in" x={sx + 150} y={196 + 80} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink} {...pwFit(tx(chosen), 270, T.prompt)}>{tx(chosen)}</text>
        ) : null)}
        {footKey("count", "Count", sx + 330, 208, liveAsk, countOn, 220)}
        {trayEl(PW_TRAY, 332, chooseName, () => false)}
      </g>
    );
  };

  /* phase 1: the pieces each column counts (the steps and the win), the correction's own reading, the cards */
  const p1El = () => {
    const sh = show && show.t === "grow" ? show : null;
    const pieces = kind === "steps" ? [2, 3, 4, 5].filter((k) => k === 2 || colOn(k)) : won ? [3, 4, 5] : [];
    return (
      <g>
        {pieces.map((k: number) => <g key={k} className="pw-in">{k === 5 ? pwPieces(g.colC(k) - 85, 194, 72, k, 1, C, true) : pwPieces(g.colC(k) - 36, 194, 72, k, 1, C)}</g>)}
        {sh && (
          <g pointerEvents="none">
            {PW_DEC.slice(0, sh.n).map((nm: string, i: number) => {
              const k = 3 + i, x = g.colX(k) + 10, w = g.colW(k) - 20;
              return (
                <g key={nm} className="pw-in">
                  <rect x={x} y={182} width={w} height={42} rx={10} fill={tint(C.accent, 0.8)} stroke={C.accent} strokeWidth={2} />
                  <text x={x + w / 2} y={182 + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink} {...pwFit(tx(nm), w - 14, T.micro)}>{tx(nm)}</text>
                  {k === 5 ? pwPieces(g.colC(k) - 75, 232, 64, k, 1, C, true) : pwPieces(g.colC(k) - 32, 232, 64, k, 1, C)}
                </g>
              );
            })}
          </g>
        )}
        {kind === "grow" && !won && trayEl(item.cards || PW_DEC, 336, putName, (nm: string) => pick.includes(nm))}
        {kind === "grow" && liveAsk && pick.length > 0 && (
          <Hit id={"head-" + (2 + pick.length)} x={g.colX(2 + pick.length)} y={0} w={g.colW(2 + pick.length)} h={CY + 14} label={tx("take back " + pick[pick.length - 1])} onPress={takeBack} />
        )}
      </g>
    );
  };

  /* phase 4: the bar the worths come down into, and the total under the number, column for column */
  const strip = (y: number, h: number, s: string, size: number, ring: any, reading: boolean, key: string) => {
    const c = pwCells(s);
    const ringAt = (x: number, w: number) => <rect x={x} y={y + 4} width={w} height={h - 8} rx={(h - 8) / 2} fill="none" stroke={PW_AMBER} strokeWidth={4} strokeDasharray="7 6" strokeLinecap="round" />;
    return (
      <g key={key}>
        <rect x={g.x0} y={y} width={g.width} height={h} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        {[0, 1, 2, 3, 4, 5].map((k: number) => (
          <g key={k}>
            {reading && lightK === k && <rect x={g.colX(k) + 8} y={y + 5} width={g.colW(k) - 16} height={h - 10} rx={10} fill={tint(C.accent, 0.8)} />}
            {c[k] !== null && <text x={g.colC(k)} y={y + h / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={c[k] === "0" ? PW_GREY : pwInk(k < 3 ? PW_WHOLE : PW_FRACT)}>{c[k]}</text>}
            {ring === k && ringAt(g.colX(k) + 30, g.colW(k) - 60)}
          </g>
        ))}
        {reading && lightK === "dot" && <rect x={g.dotX + 6} y={y + 5} width={g.DW - 12} height={h - 10} rx={10} fill={tint(C.accent, 0.8)} />}
        {String(s).includes(".") && <text x={g.dotX + g.DW / 2} y={y + h / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={pwInk(PW_DOT)}>.</text>}
        {ring === "dot" && ringAt(g.dotX + 6, g.DW - 12)}
      </g>
    );
  };
  const p4El = () => {
    const c = pwCells(num), ks = [0, 1, 2, 3, 4, 5].filter((k) => c[k] !== null);
    const worths = ks.map((k: number) => ({ v: pwWorth(k, c[k]), k }));
    const isDown = kind === "steps" ? st >= 1 : down || won;
    const totalOn = kind === "steps" ? st >= 2 : won;
    const sh = show && show.t === "rb" ? show : null;
    if (sh) {
      const aY = 182, bY = sh.a ? 340 : 182;
      return (
        <g pointerEvents="none">
          {sh.a && pwChipRow(bw / 2, aY, 80, bw - 40, sh.a.chips, C)}
          {sh.a && sh.aTot && strip(aY + 86, 58, sh.a.total, T.prompt, pwFirstPart(num, sh.a.total), false, "a")}
          {sh.b > 0 && pwChipRow(bw / 2, bY, 80, bw - 40, worths.slice(0, sh.b), C)}
          {sh.bTot && strip(bY + 86, 58, num, T.prompt, null, false, "b")}
        </g>
      );
    }
    return (
      <g>
        {pwChipRow(bw / 2, 190, 96, bw - 40, worths, C, !isDown, isDown && !won)}
        {strip(302, 86, totalOn ? num : "", T.xl, null, true, "t")}
        {kind === "steps" && footKey("down", "Down", bw / 2 - 260, FOOT, stepOn === "down", () => tapAct("down"))}
        {kind === "steps" && footKey("add", "Add", bw / 2 + 20, FOOT, stepOn === "add", () => tapAct("add"))}
        {kind === "rebuild" && footKey("down", "Down", bw / 2 - 120, FOOT, liveAsk && !down, sendDown)}
      </g>
    );
  };

  /* free play: any number in the chart, and every digit's worth under it */
  const freeEl = () => (
    <g>
      {fw && [0, 1, 2, 3, 4, 5].map((k: number) => {
        const d = fc[k];
        if (d === null) return null;
        const w = pwWorth(k, d), x = g.colX(k) + 8, cw = g.colW(k) - 16, ink = pwInk(k < 3 ? PW_WHOLE : PW_FRACT);
        return (
          <g key={k} className="pw-in">
            <rect x={x} y={186} width={cw} height={96} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
            <rect x={x + 10} y={192} width={cw - 20} height={5} rx={2.5} fill={PW_PIECE[k]} />
            {Array.isArray(w) ? pwFrac(x + cw / 2, 186 + 52, w[0], w[1], ink)
              : <text x={x + cw / 2} y={186 + 63} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={d === "0" ? PW_GREY : ink}>{String(w)}</text>}
          </g>
        );
      })}
      {[0, 1, 2, 3, 4, 5].map((k: number) => (
        <Hit key={"cell" + k} id={"cell-" + k} x={g.colX(k)} y={0} w={g.colW(k)} h={CY + CH + 4} label={tx("change the " + PW_NAMES[k] + " digit")} onPress={() => freeTap(k)} />
      ))}
      {footKey("worths", "Worths", bw / 2 - 120, FOOT, true, () => { setFw((v: boolean) => !v); api.sfx.tick(); })}
    </g>
  );

  /* the guide steps' own controls, and the one invite on the control the step waits for */
  const stepsEl = () => {
    if (kind !== "steps") return null;
    if (pn === 1) return footKey("grow", "Grow", bw / 2 - 120, FOOT, stepOn === "grow", () => tapAct("grow"));
    if (pn === 2) return footKey("count", "Count", g.x0 + 330, 208, stepOn === "count", () => tapAct("count"), 220);
    if (pn === 3 && stepOn === "place") return <Hit id="place" x={g.colX(4)} y={0} w={g.colW(4)} h={CY + 14} label={tx("the heading over the lit digit")} onPress={() => tapAct("place")} />;
    if (pn === 3 && stepOn === "worth") return <Hit id="worth" x={g.colX(4)} y={CY + 14} w={g.colW(4)} h={CH - 10} label={tx("the lit digit")} onPress={() => tapAct("worth")} />;
    return null;
  };
  const ring = (x: number, y: number, w: number, h: number, rx: number) => (
    <rect className="pw-ring" x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx={rx + 6} fill="none" strokeWidth={5} pointerEvents="none"
      stroke={(THEME && THEME.enter && THEME.enter[1]) || C.accent} />
  );
  const keyRing = (x: number, y: number, w = 240) => ring(x, y, w, 76 + EDGE, RAD.key);
  const inviteEl = () => {
    /* a total waits for Down (the pad is locked till then): Down is the one thing to touch */
    if (kind === "rebuild" && liveAsk && !down && !show) return keyRing(bw / 2 - 120, FOOT);
    /* a long number waits for its cut: the column the question names */
    if (kind === "bay" && liveAsk && cut < 0 && !show) {
      const BW = Math.min(220, (bw - 32) / bn), bx0 = (bw - bn * BW) / 2;
      return ring(bx0 + bCut * BW + 3, HY, BW - 6, CY + CH - HY, 12);
    }
    if (stage !== "demo" || !stepOn) return null;
    if (stepOn === "grow") return keyRing(bw / 2 - 120, FOOT);
    if (stepOn === "count") return keyRing(g.x0 + 330, 208, 220);
    if (stepOn === "place") return ring(g.colX(4) + 3, HY, g.colW(4) - 6, HH, 10);
    if (stepOn === "worth") return ring(g.colX(4) - 5, CY - 9, g.colW(4) + 10, CH + 18, 18);
    if (stepOn === "down") return keyRing(bw / 2 - 260, FOOT);
    if (stepOn === "add") return keyRing(bw / 2 + 20, FOOT);
    return null;
  };

  return (
    <g>
      <style>{PW_CSS}</style>
      {kind === "bay" ? bayEl() : chartEl()}
      {((kind === "steps" && pn === 1) || kind === "grow") && p1El()}
      {kind === "place" && pn === 2 && p2El()}
      {((kind === "steps" && pn === 3) || (kind === "place" && pn === 3) || kind === "worth") && p3El()}
      {((kind === "steps" && pn === 4) || kind === "rebuild") && p4El()}
      {kind === "free" && freeEl()}
      {stepsEl()}
      {inviteEl()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const ph: any = PHASES[(Number(n) || 1) - 1] || PHASES[0];
  const it: any = (typeof last.item === "number" ? ph.items[last.item] : last.item) || {};
  const kd = String(last.kind || it.kind || ""), v = last.value, cy = h / 2;
  let body: any = null;
  if (kd === "grow") {
    const sizes = [44, 30, 18], x0 = w / 2 - 70;
    body = (
      <g>
        <circle cx={x0 - 18} cy={cy + 14} r={7} fill={PW_DOT} />
        {sizes.map((s: number, i: number) => <rect key={i} x={x0 + i * 52} y={cy + 20 - s} width={s} height={s} rx={4} fill={PW_PIECE[3 + i]} stroke={C.ink} strokeWidth={1.5} />)}
      </g>
    );
  } else if (kd === "worth") {
    const ps = slotPartsOf(v, 2);
    body = pwFrac(w / 2, cy + 2, ps[0], ps[1], pwInk(PW_FRACT));
  } else {
    const txt = kd === "bay" ? indian(Number(v)) + " " + tx(PW_BAY[PW_BAY.length - 1 - Number(it.drop)]) : kd === "place" ? tx(String(v)) : String(v);
    body = <text x={w / 2} y={cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} {...pwFit(txt, w - 24, T.label)}>{txt}</text>;
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {body}
    </g>
  );
}

function PlaceAndWorthChart(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the question and an Answer key on a bar across the top, the working area the
         whole card until the child taps Answer, the answer box and keypad in a panel that slides in from the right */
      board: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; the win picture waits for the child's tap on Next */
      nextKey: true,
      /* a worth is answered ON the Worth card (PATTERNS.md 9e); a count and a total keep the blinking Answer key */
      cardAnswer: true,
      /* a total is a decimal: the pad's point key on every question (PATTERNS.md 4) */
      pointKey: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      }} />
  );
}

export default PlaceAndWorthChart;
