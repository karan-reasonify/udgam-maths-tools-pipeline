/* ═══ M1.S1.T2.C5.2D1 · tenth_strip · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, the question bar and the answer
   panel (board layout), bubble + mascot, phase dots, window.toolApi, the sound effects, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The lesson is action-driven (r34): every phase opens on
   guide steps, one click each, and nothing moves on unless the child acts.
   The picture: a strip that is one named whole, cut into ten equal pieces (amber when coloured), with
   two writing cards along its foot, a Fraction card (stacked) and a Decimal card ([ones] . [tenths]),
   joined by a bar that fills only when both carry the amount. Fractions and decimals of phases 1-3 are
   answered ON their card (cardAnswer, PATTERNS 9e); phase 4's decimals are typed whole with the point
   key, so a bare point and a digit can be written and corrected.
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md. */

const TOOL_ID = "tenth_strip";
const MEDIA_ID = "M1.S1.T2.C5.2D1";
const TOOL_NAME = "Tenth Strip";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A long strip, and nothing cut yet. Say what it is before the cutter runs."];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "Every share written twice over, and the zero standing in the ones place each time.";
/* printed when the child opens Free play: every control it names is live in the free branch of Work */
const FREE_LINE = "Free play: name, cut evenly or by eye, colour and measure.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c): one question to wonder at, and the object itself. */
const START_HOOK = "What is this strip a strip of?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const w = 1000, h = 120, x = (box.w - w) / 2, y = 124;
  return (
    <g>
      {/* the name tag, still empty */}
      <rect x={x} y={y - 104} width={330} height={76} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={x + 22} y={y - 56} fontSize={T.micro} fontWeight={700} fill={TS_INK2}>{tx("Whole")}</text>
      <text x={x + 150} y={y - 50} fontSize={T.prompt} fontWeight={700} fill={C.accent}>?</text>
      {/* one long strip, nothing cut */}
      <rect x={x} y={y} width={w} height={h} rx={18} fill={TS_SHEET} stroke={TS_LINE} strokeWidth={3} filter="url(#fShadowSoft)" />
      {/* the rail and the cutter parked at its left end */}
      <rect x={x} y={y + h + 52} width={w} height={10} rx={5} fill={tint(C.rule, 0.2)} />
      <g transform={`translate(${x + 18},${y + h + 6})`}>
        <path d="M 0 0 L 40 0 L 20 44 Z" fill="#B9C2C8" stroke={TS_LINE} strokeWidth={2.5} strokeLinejoin="round" />
        <rect x={-6} y={44} width={52} height={22} rx={8} fill={shade(C.accent, 0.1)} stroke={TS_LINE} strokeWidth={2} />
      </g>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final. */
const TR: any = {
  hi: {
    "Tenth Strip": "दसवाँ भाग पट्टी",
    "Free play: name, cut evenly or by eye, colour and measure.": "मुक्त खेल: नाम चुनो, बराबर या अंदाज़ से काटो, रंगो और नापो।",
    "Tap Lay flat to lay them down.": "लिटाओ दबाकर टुकड़े वापस रखो।", "standing pieces": "खड़े टुकड़े",
    "What is this strip a strip of?": "यह पट्टी किस चीज़ की है?",
    /* phase 1 */
    "Splitting one into ten equal parts": "एक को दस बराबर भागों में बाँटना",
    "Tap a name for this strip.": "इस पट्टी का नाम चुनो।",
    "Name the strip before you cut it.": "काटने से पहले पट्टी का नाम चुनो।",
    "Tap Cut to cut ten equal pieces.": "काटो दबाकर दस बराबर टुकड़े करो।",
    "Tap the Cut key.": "काटो वाली कुंजी दबाओ।",
    "Tap Measure to stand them up.": "नापो दबाकर टुकड़े खड़े करो।",
    "Tap the Measure key.": "नापो वाली कुंजी दबाओ।",
    "Are all ten pieces the same size?": "क्या दसों टुकड़े एक माप के हैं?",
    "A tenth is one of ten equal parts.": "दस बराबर भागों में एक, दसवाँ भाग है।",
    "Ten equal parts of one whole are tenths, and the parts must be the same size.": "एक पूर्ण के दस बराबर भाग दसवें भाग हैं, और सब भाग एक माप के हों।",
    "You learned: ten equal parts of one whole are tenths.": "तुमने सीखा: एक पूर्ण के दस बराबर भाग दसवें भाग होते हैं।",
    "Write the coloured part of the strip as a fraction.": "रंगे भाग को भिन्न में लिखो।",
    "Coloured part as a fraction?": "रंगा भाग भिन्न में?",
    "The bottom counts every piece.": "नीचे की संख्या सब टुकड़े गिनती है।",
    "Write the three coloured pieces with a point.": "तीन रंगे टुकड़े दशमलव बिंदु से लिखो।",
    "Coloured part with a point?": "रंगा भाग दशमलव बिंदु से?",
    "Is a whole strip coloured?": "क्या पूरी पट्टी रंगी है?",
    "Folded without measuring, is a short piece still one tenth?": "बिना नापे कटा छोटा टुकड़ा दसवाँ भाग है?",
    "Is a short piece a tenth?": "क्या छोटा टुकड़ा दसवाँ भाग है?",
    "Stand the pieces up and compare them.": "टुकड़े खड़े करके आपस में मिलाओ।",
    "Yes": "हाँ", "No": "नहीं",
    /* phase 2 */
    "The same amount, written with a point": "वही मात्रा, दशमलव बिंदु से लिखी",
    "Tap a piece to colour one tenth.": "एक टुकड़ा दबाकर दसवाँ भाग रंगो।",
    "Tap a piece of the chocolate bar.": "चॉकलेट का एक टुकड़ा दबाओ।",
    "Tap one more and watch both cards.": "एक और दबाओ, दोनों कार्ड देखो।",
    "Tap a piece that is still plain.": "बिना रंग का टुकड़ा दबाओ।",
    "Count the coloured pieces again.": "रंगे टुकड़े फिर से गिनो।",
    "Both cards must show one amount.": "दोनों कार्ड एक ही मात्रा बताएँ।",
    "A share over ten and the same share with a point say one amount.": "दस वाली भिन्न और दशमलव, दोनों एक ही मात्रा बताते हैं।",
    "You learned: a fraction over ten and a decimal say one amount.": "तुमने सीखा: दस वाली भिन्न और दशमलव एक ही मात्रा बताते हैं।",
    "Write the coloured part of the ribbon as a fraction.": "रिबन के रंगे भाग को भिन्न में लिखो।",
    "The top counts coloured pieces.": "ऊपर की संख्या रंगे टुकड़े गिनती है।",
    "In 0.7, what does the 7 count?": "0.7 में 7 क्या गिनता है?",
    "What does the 7 count?": "7 क्या गिनता है?",
    "Is the 7 before or after the point?": "7 बिंदु से पहले है या बाद में?",
    "Look at the seven coloured pieces.": "सात रंगे टुकड़ों को देखो।",
    "Each piece is one of ten equal parts.": "हर टुकड़ा दस बराबर भागों में एक है।",
    "tenths": "दसवें भाग", "ones": "इकाई",
    "Now write how much milk there is, with a point.": "अब लिखो कितना दूध है, दशमलव बिंदु से।",
    "How much milk?": "कितना दूध?",
    "Only one digit goes after the point.": "बिंदु के बाद एक ही अंक आता है।",
    /* phase 3 */
    "Counting more than one tenth": "एक से ज़्यादा दसवें भाग गिनना",
    "Tap Count to count the pieces.": "गिनो दबाकर टुकड़े गिनो।",
    "Tap the Count key.": "गिनो वाली कुंजी दबाओ।",
    "Tap the Decimal card to write it.": "इसे लिखने को दशमलव कार्ड दबाओ।",
    "It is the card with the point.": "जिस कार्ड में बिंदु है, वही।",
    "Which place does that count go in?": "यह गिनती किस स्थान में जाती है?",
    "Count each piece from the left.": "बाईं ओर से हर टुकड़ा गिनो।",
    "The digit after the point counts how many tenths there are.": "बिंदु के बाद का अंक बताता है कि कितने दसवें भाग हैं।",
    "You learned: the digit after the point counts the tenths.": "तुमने सीखा: बिंदु के बाद का अंक दसवें भाग गिनता है।",
    "Write the planted part of the garden with a point.": "बगीचे का बोया भाग दशमलव बिंदु से लिखो।",
    "Planted part with a point?": "बोया भाग दशमलव बिंदु से?",
    "Which pieces are coloured?": "कौन से टुकड़े रंगे हैं?",
    "Write how much of the chapati was eaten, with a point.": "रोटी का कितना भाग खाया गया, दशमलव बिंदु से लिखो।",
    "Eaten part with a point?": "खाया भाग दशमलव बिंदु से?",
    "How many pieces were eaten?": "कितने टुकड़े खाए गए?",
    "Now write the part left plain, with a point.": "अब बिना रंग वाला भाग दशमलव बिंदु से लिखो।",
    "Plain part with a point?": "बिना रंग का भाग दशमलव बिंदु से?",
    "Count only the plain pieces.": "सिर्फ़ बिना रंग के टुकड़े गिनो।",
    /* phase 4 */
    "What the zero in front is for": "आगे का शून्य किसलिए है",
    "Tap the box in front of the point.": "बिंदु के आगे वाला खाना दबाओ।",
    "Look just left of the point.": "बिंदु के ठीक बाईं ओर देखो।",
    "Put the grey zero in that box.": "स्लेटी शून्य उस खाने में रखो।",
    "The 0 tile is at the right.": "0 वाली टाइल दाईं ओर है।",
    "How many whole ones are there?": "कितनी पूरी इकाइयाँ हैं?",
    "An empty place still needs a digit.": "खाली स्थान में भी अंक चाहिए।",
    "Write a zero before the point every time a number is less than one.": "जब संख्या एक से कम हो, बिंदु से पहले शून्य लिखो।",
    "You learned: the zero in front holds the ones place open.": "तुमने सीखा: आगे का शून्य इकाई का स्थान खुला रखता है।",
    "Write this sign properly.": "इस तख्ती को सही ढंग से लिखो।",
    "Write the sign properly.": "तख्ती सही ढंग से लिखो।",
    "Which place is before the point?": "बिंदु से पहले कौन सा स्थान है?",
    "A pen cost two tenths of the money: what must you know to find its price?": "पेन में जेब खर्च के दो दसवें भाग लगे: उसका दाम जानने को क्या पता हो?",
    "What must you know to find the pen's rupees?": "पेन के रुपये जानने को क्या पता होना चाहिए?",
    "Read the story again: what is not told?": "कहानी फिर पढ़ो: क्या नहीं बताया?",
    "Is two tenths always the same rupees?": "दो दसवें भाग, हमेशा उतने ही रुपये?",
    "More money makes two tenths bigger.": "ज़्यादा पैसे, तो हिस्सा भी बड़ा।",
    "how much": "कितने पैसे", "the point": "दशमलव बिंदु",
    "Now fix this weight label.": "अब यह वज़न का लेबल ठीक करो।",
    "Write the label properly.": "लेबल सही ढंग से लिखो।",
    "What stands in front of the point on this label?": "इस लेबल पर बिंदु के आगे क्या है?",
    /* the win lines (api.say) */
    "Yes, six of ten equal pieces is six tenths of the strip.": "हाँ, दस बराबर टुकड़ों में से छह, यानी छह दसवें भाग।",
    "Yes, 0.3 is the same as three tenths.": "हाँ, 0.3 और तीन दसवें भाग एक ही हैं।",
    "Right, the pieces are not equal, so none of them is a tenth.": "सही, टुकड़े बराबर नहीं हैं, इसलिए कोई भी दसवाँ भाग नहीं है।",
    "Yes, the Decimal card writes the same amount, and its dot is the decimal point.": "हाँ, दशमलव कार्ड वही मात्रा लिखता है, और उसका बिंदु दशमलव बिंदु है।",
    "Right, the 7 sits just after the point, in the tenths place.": "सही, 7 बिंदु के ठीक बाद, दसवें भाग के स्थान पर है।",
    "Yes, the milk is 0.8 of the litre.": "हाँ, दूध एक लीटर का 0.8 भाग है।",
    "Yes, 0.7 is planted: the 7 counts seven planted tenths.": "हाँ, 0.7 भाग बोया है: 7 बोए गए सात दसवें भाग गिनता है।",
    "Yes, 0.5 of the chapati was eaten, which is half of it.": "हाँ, रोटी का 0.5 भाग खाया गया, यानी आधी रोटी।",
    "Yes, 0.1 plain and 0.9 coloured make 1 whole.": "हाँ, 0.1 बिना रंग और 0.9 रंगा मिलकर 1 पूर्ण।",
    "Yes, 0.6 is six tenths, and the 0 stands in the ones place.": "हाँ, 0.6 यानी छह दसवें भाग, और 0 इकाई के स्थान पर है।",
    "Right, nobody said how much money there was, so the rupees cannot be found.": "सही, किसी ने नहीं बताया कितने पैसे थे, इसलिए रुपये नहीं निकलते।",
    "Yes, 0.4 kg: the 0 shows there is no whole kilogram.": "हाँ, 0.4 किलोग्राम: 0 बताता है कि पूरा किलोग्राम नहीं है।",
    /* the working area's own words (tx) */
    "Whole": "पूर्ण", "coloured": "रंगा हुआ", "piece": "टुकड़ा",
    "chocolate bar": "चॉकलेट", "ribbon": "रिबन", "chapati": "रोटी", "1 L milk": "1 लीटर दूध", "garden": "बगीचा",
    "pocket money": "जेब खर्च", "1 kg": "1 किग्रा", "kg": "किग्रा",
    "Cut": "काटो", "By eye": "अंदाज़ से", "Measure": "नापो", "Lay flat": "लिटाओ", "Count": "गिनो",
    "Fraction": "भिन्न", "Decimal": "दशमलव", "Sign": "तख्ती", "Label": "लेबल",
    "numerator": "अंश", "denominator": "हर", "zero": "शून्य",
    "no whole ones": "कोई पूरी इकाई नहीं", "10 equal pieces": "10 बराबर टुकड़े",
    "equal: tenths": "बराबर: दसवें भाग", "not equal: not tenths": "बराबर नहीं: दसवें भाग नहीं",
    "same two tenths,": "वही दो दसवें भाग,", "different rupees": "अलग अलग रुपये",
  },
  gu: {
    "Tenth Strip": "દશમો ભાગ પટ્ટી",
    "Free play: name, cut evenly or by eye, colour and measure.": "મુક્ત રમત: નામ પસંદ કરો, સરખું કે અંદાજથી કાપો, રંગો અને માપો.",
    "Tap Lay flat to lay them down.": "સુવડાવો દબાવી ટુકડા પાછા મૂકો.", "standing pieces": "ઊભા ટુકડા",
    "What is this strip a strip of?": "આ પટ્ટી શેની છે?",
    /* phase 1 */
    "Splitting one into ten equal parts": "એકને દસ સરખા ભાગમાં વહેંચવું",
    "Tap a name for this strip.": "આ પટ્ટીનું નામ પસંદ કરો.",
    "Name the strip before you cut it.": "કાપતા પહેલાં પટ્ટીનું નામ પસંદ કરો.",
    "Tap Cut to cut ten equal pieces.": "કાપો દબાવી દસ સરખા ટુકડા કરો.",
    "Tap the Cut key.": "કાપો વાળી કી દબાવો.",
    "Tap Measure to stand them up.": "માપો દબાવી ટુકડા ઊભા કરો.",
    "Tap the Measure key.": "માપો વાળી કી દબાવો.",
    "Are all ten pieces the same size?": "શું દસેય ટુકડા એક જ માપના છે?",
    "A tenth is one of ten equal parts.": "દસ સરખા ભાગમાંથી એક, દશમો ભાગ છે.",
    "Ten equal parts of one whole are tenths, and the parts must be the same size.": "એક પૂર્ણના દસ સરખા ભાગ દશમા ભાગ છે, અને બધા ભાગ એક માપના હોય.",
    "You learned: ten equal parts of one whole are tenths.": "તમે શીખ્યા: એક પૂર્ણના દસ સરખા ભાગ દશમા ભાગ છે.",
    "Write the coloured part of the strip as a fraction.": "રંગેલા ભાગને અપૂર્ણાંકમાં લખો.",
    "Coloured part as a fraction?": "રંગેલો ભાગ અપૂર્ણાંકમાં?",
    "The bottom counts every piece.": "નીચેની સંખ્યા બધા ટુકડા ગણે છે.",
    "Write the three coloured pieces with a point.": "ત્રણ રંગેલા ટુકડા દશાંશ ચિહ્નથી લખો.",
    "Coloured part with a point?": "રંગેલો ભાગ દશાંશ ચિહ્નથી?",
    "Is a whole strip coloured?": "શું આખી પટ્ટી રંગેલી છે?",
    "Folded without measuring, is a short piece still one tenth?": "અંદાજથી કાપેલો નાનો ટુકડો દશમો છે?",
    "Is a short piece a tenth?": "શું નાનો ટુકડો દશમો ભાગ છે?",
    "Stand the pieces up and compare them.": "ટુકડા ઊભા કરી સરખાવો.",
    "Yes": "હા", "No": "ના",
    /* phase 2 */
    "The same amount, written with a point": "એ જ માત્રા, દશાંશ ચિહ્નથી લખેલી",
    "Tap a piece to colour one tenth.": "એક ટુકડો દબાવી દશમો ભાગ રંગો.",
    "Tap a piece of the chocolate bar.": "ચોકલેટનો એક ટુકડો દબાવો.",
    "Tap one more and watch both cards.": "એક વધુ દબાવો, બંને કાર્ડ જુઓ.",
    "Tap a piece that is still plain.": "રંગ વગરનો ટુકડો દબાવો.",
    "Count the coloured pieces again.": "રંગેલા ટુકડા ફરી ગણો.",
    "Both cards must show one amount.": "બંને કાર્ડ એક જ માત્રા બતાવે.",
    "A share over ten and the same share with a point say one amount.": "દસવાળો અપૂર્ણાંક અને દશાંશ, બંને એક જ માત્રા બતાવે છે.",
    "You learned: a fraction over ten and a decimal say one amount.": "તમે શીખ્યા: દસવાળો અપૂર્ણાંક અને દશાંશ એક જ માત્રા બતાવે છે.",
    "Write the coloured part of the ribbon as a fraction.": "રિબનના રંગેલા ભાગને અપૂર્ણાંકમાં લખો.",
    "The top counts coloured pieces.": "ઉપરની સંખ્યા રંગેલા ટુકડા ગણે છે.",
    "In 0.7, what does the 7 count?": "0.7 માં 7 શું ગણે છે?",
    "What does the 7 count?": "7 શું ગણે છે?",
    "Is the 7 before or after the point?": "7 ચિહ્નની પહેલાં છે કે પછી?",
    "Look at the seven coloured pieces.": "સાત રંગેલા ટુકડા જુઓ.",
    "Each piece is one of ten equal parts.": "દરેક ટુકડો દસ સરખા ભાગમાંથી એક છે.",
    "tenths": "દશમા ભાગ", "ones": "એકમ",
    "Now write how much milk there is, with a point.": "હવે લખો કેટલું દૂધ છે, દશાંશ ચિહ્નથી.",
    "How much milk?": "કેટલું દૂધ?",
    "Only one digit goes after the point.": "ચિહ્ન પછી એક જ અંક આવે છે.",
    /* phase 3 */
    "Counting more than one tenth": "એક કરતાં વધુ દશમા ભાગ ગણવા",
    "Tap Count to count the pieces.": "ગણો દબાવી ટુકડા ગણો.",
    "Tap the Count key.": "ગણો વાળી કી દબાવો.",
    "Tap the Decimal card to write it.": "લખવા માટે દશાંશ કાર્ડ દબાવો.",
    "It is the card with the point.": "જે કાર્ડમાં ચિહ્ન છે, તે.",
    "Which place does that count go in?": "આ ગણતરી કયા સ્થાને જાય છે?",
    "Count each piece from the left.": "ડાબેથી દરેક ટુકડો ગણો.",
    "The digit after the point counts how many tenths there are.": "ચિહ્ન પછીનો અંક કહે છે કે કેટલા દશમા ભાગ છે.",
    "You learned: the digit after the point counts the tenths.": "તમે શીખ્યા: ચિહ્ન પછીનો અંક દશમા ભાગ ગણે છે.",
    "Write the planted part of the garden with a point.": "બગીચાનો વાવેલો ભાગ દશાંશ ચિહ્નથી લખો.",
    "Planted part with a point?": "વાવેલો ભાગ દશાંશ ચિહ્નથી?",
    "Which pieces are coloured?": "કયા ટુકડા રંગેલા છે?",
    "Write how much of the chapati was eaten, with a point.": "રોટલીનો કેટલો ભાગ ખવાયો, દશાંશ ચિહ્નથી લખો.",
    "Eaten part with a point?": "ખાધેલો ભાગ દશાંશ ચિહ્નથી?",
    "How many pieces were eaten?": "કેટલા ટુકડા ખવાયા?",
    "Now write the part left plain, with a point.": "હવે રંગ વગરનો ભાગ દશાંશ ચિહ્નથી લખો.",
    "Plain part with a point?": "રંગ વગરનો ભાગ દશાંશ ચિહ્નથી?",
    "Count only the plain pieces.": "ફક્ત રંગ વગરના ટુકડા ગણો.",
    /* phase 4 */
    "What the zero in front is for": "આગળનું શૂન્ય શા માટે છે",
    "Tap the box in front of the point.": "ચિહ્નની આગળનું ખાનું દબાવો.",
    "Look just left of the point.": "ચિહ્નની બરાબર ડાબે જુઓ.",
    "Put the grey zero in that box.": "રાખોડી શૂન્ય એ ખાનામાં મૂકો.",
    "The 0 tile is at the right.": "0 વાળી ટાઇલ જમણી બાજુ છે.",
    "How many whole ones are there?": "કેટલા આખા એકમ છે?",
    "An empty place still needs a digit.": "ખાલી સ્થાનમાં પણ અંક જોઈએ.",
    "Write a zero before the point every time a number is less than one.": "સંખ્યા એક કરતાં ઓછી હોય ત્યારે ચિહ્ન પહેલાં શૂન્ય લખો.",
    "You learned: the zero in front holds the ones place open.": "તમે શીખ્યા: આગળનું શૂન્ય એકમનું સ્થાન ખુલ્લું રાખે છે.",
    "Write this sign properly.": "આ પાટિયું બરાબર લખો.",
    "Write the sign properly.": "પાટિયું બરાબર લખો.",
    "Which place is before the point?": "ચિહ્ન પહેલાં કયું સ્થાન છે?",
    "A pen cost two tenths of the money: what must you know to find its price?": "પેનમાં ખિસ્સાખર્ચના બે દશમા ભાગ ગયા: તેની કિંમત શોધવા શું જાણવું પડે?",
    "What must you know to find the pen's rupees?": "પેનના રૂપિયા શોધવા શું જાણવું પડે?",
    "Read the story again: what is not told?": "વાર્તા ફરી વાંચો: શું કહ્યું નથી?",
    "Is two tenths always the same rupees?": "બે દશમા ભાગ, હંમેશાં એટલા જ રૂપિયા?",
    "More money makes two tenths bigger.": "વધુ પૈસા, તો બે દશમા ભાગ પણ વધુ.",
    "how much": "કેટલા પૈસા", "the point": "દશાંશ ચિહ્ન",
    "Now fix this weight label.": "હવે આ વજનનું લેબલ સુધારો.",
    "Write the label properly.": "લેબલ બરાબર લખો.",
    "What stands in front of the point on this label?": "આ લેબલ પર ચિહ્નની આગળ શું છે?",
    /* the win lines (api.say) */
    "Yes, six of ten equal pieces is six tenths of the strip.": "હા, દસ સરખા ટુકડામાંથી છ, એટલે છ દશમા ભાગ.",
    "Yes, 0.3 is the same as three tenths.": "હા, 0.3 અને ત્રણ દશમા ભાગ એક જ છે.",
    "Right, the pieces are not equal, so none of them is a tenth.": "સાચું, ટુકડા સરખા નથી, તેથી કોઈ દશમો ભાગ નથી.",
    "Yes, the Decimal card writes the same amount, and its dot is the decimal point.": "હા, દશાંશ કાર્ડ એ જ માત્રા લખે છે, અને તેનું ટપકું દશાંશ ચિહ્ન છે.",
    "Right, the 7 sits just after the point, in the tenths place.": "સાચું, 7 ચિહ્નની બરાબર પછી, દશમા ભાગના સ્થાને છે.",
    "Yes, the milk is 0.8 of the litre.": "હા, દૂધ એક લિટરનો 0.8 ભાગ છે.",
    "Yes, 0.7 is planted: the 7 counts seven planted tenths.": "હા, 0.7 ભાગ વાવેલો છે: 7 વાવેલા સાત દશમા ભાગ ગણે છે.",
    "Yes, 0.5 of the chapati was eaten, which is half of it.": "હા, રોટલીનો 0.5 ભાગ ખવાયો, એટલે અડધી રોટલી.",
    "Yes, 0.1 plain and 0.9 coloured make 1 whole.": "હા, 0.1 રંગ વગરનો અને 0.9 રંગેલો મળી 1 પૂર્ણ.",
    "Yes, 0.6 is six tenths, and the 0 stands in the ones place.": "હા, 0.6 એટલે છ દશમા ભાગ, અને 0 એકમના સ્થાને છે.",
    "Right, nobody said how much money there was, so the rupees cannot be found.": "સાચું, કેટલા પૈસા હતા તે કોઈએ કહ્યું નથી, તેથી રૂપિયા ન મળે.",
    "Yes, 0.4 kg: the 0 shows there is no whole kilogram.": "હા, 0.4 કિલોગ્રામ: 0 બતાવે છે કે આખો કિલોગ્રામ નથી.",
    /* the working area's own words (tx) */
    "Whole": "પૂર્ણ", "coloured": "રંગેલો", "piece": "ટુકડો",
    "chocolate bar": "ચોકલેટ", "ribbon": "રિબન", "chapati": "રોટલી", "1 L milk": "1 લિટર દૂધ", "garden": "બગીચો",
    "pocket money": "ખિસ્સાખર્ચ", "1 kg": "1 કિગ્રા", "kg": "કિગ્રા",
    "Cut": "કાપો", "By eye": "અંદાજથી", "Measure": "માપો", "Lay flat": "સુવડાવો", "Count": "ગણો",
    "Fraction": "અપૂર્ણાંક", "Decimal": "દશાંશ", "Sign": "પાટિયું", "Label": "લેબલ",
    "numerator": "અંશ", "denominator": "છેદ", "zero": "શૂન્ય",
    "no whole ones": "કોઈ આખો એકમ નથી", "10 equal pieces": "10 સરખા ટુકડા",
    "equal: tenths": "સરખા: દશમા ભાગ", "not equal: not tenths": "સરખા નથી: દશમા ભાગ નથી",
    "same two tenths,": "એ જ બે દશમા ભાગ,", "different rupees": "જુદા જુદા રૂપિયા",
  },
};

/* ── the chapter's own inks ──────────────────────────────────────────────────────────────
   A piece of this strip stands for tenths, so it colours amber. In a written number a digit left of
   the point is deep blue, a digit right of it green, and the point vermilion between them; a zero
   that only holds a place open is grey, at the same size and weight. */
const TS_PIECES = 10;
const TS_AMBER = CONTENT.ten;
const TS_ROSE = CONTENT.bead;
const TS_INK_ONES = shade(CONTENT.hundred, 0.25);
const TS_INK_TENTH = shade(CONTENT.one, 0.25);
const TS_DOT = CONTENT.pointer;
const TS_ZERO = "#767676";
const TS_LINE = "#2B2B2B";
const TS_SHEET = "#FFF4DC";      /* a piece not coloured: pale paper */
const TS_INK2 = "#585858";       /* a caption: quiet, still about 7:1 on white */
/* ten pieces folded by eye: the same strip, and no two of them a tenth (they add up to the whole) */
const TS_UNEVEN = [150, 88, 104, 78, 142, 96, 118, 82, 110, 112];
/* phase 4's Decimal card: SLOT_DECIMAL's two boxes with the point drawn, but the ones box may stay EMPTY (free), so a
   child who writes the bare point and a digit can answer it and get its correction; judgeSlotDecimal refuses it */
const TS_DEC_OPEN = [{ label: "whole", at: "dwhole", free: true }, { label: "decimal", at: "dpart" }];
/* phase 4's rungs 2 and 3. The runtime has no ladder per question and reads the phase's `ladder` array (by reference)
   when it shows a rung, so Work sets this one array's two rungs for the question on show: the zero questions get
   TS_ZERO_RUNGS, the pocket-money question its own `ladder`. Read without Work (the checks, the sidecar) it holds
   the zero rungs. */
const TS_ZERO_RUNGS = ["How many whole ones are there?", "An empty place still needs a digit."];
const TS_L4: any[] = TS_ZERO_RUNGS.slice();
/* phase 2 the same way: its two writing questions share TS_P2_RUNGS, "what does the 7 count?" has its own */
const TS_P2_RUNGS = ["Count the coloured pieces again.", "Both cards must show one amount."];
const TS_L2: any[] = TS_P2_RUNGS.slice();
/* the wholes a child can name the strip, each drawn as itself: the chocolate tile, the ribbon and the chapati skins */
const TS_WHOLES = ["chocolate bar", "ribbon", "chapati"];

/* One entry per phase = one mount. Every phase opens on guide steps (one click each, a hint each);
   items: three a phase, each with the plan's question id.
     form  fraction  answered on the Fraction card (parts: SLOT_FRACTION)
           decimal   answered on the Decimal card, [ones] . [tenths] (parts: SLOT_DECIMAL)
           typed     phase 4: a sign written without its zero, rewritten on the Decimal card (parts: TS_DEC_OPEN), whose
                     ones box may be left empty, so the bare point ("|6") is a real miss with its correction
           uneven    a strip folded by eye, Yes / No
           digit     what the digit after the point counts, a choice
           share     a share of a whole nobody named, Yes / No
     shade the pieces coloured from the left; read "plain" asks for the pieces left plain
     whole the name of the whole the strip stands for; near: the misconception as typed */
const PHASES = [
  {
    n: 1,
    concept: "Splitting one into ten equal parts",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Say what you are cutting first. Now cut it into ten. Are the pieces the same?"],
    steps: [
      { say: "Tap a name for this strip.", on: "name", hint: "Name the strip before you cut it." },
      { say: "Tap Cut to cut ten equal pieces.", on: "cut", hint: "Tap the Cut key." },
      { say: "Tap Measure to stand them up.", on: "measure", hint: "Tap the Measure key." },
    ],
    stepHold: 2400,
    /* the plan's rung 3 was a stage direction; written here as a hint a child can act on */
    ladder: ["Are all ten pieces the same size?", "A tenth is one of ten equal parts."],
    closing: "Ten equal parts of one whole are tenths, and the parts must be the same size.",
    learned: "You learned: ten equal parts of one whole are tenths.",
    traceback: "The run the question asks for lights piece by piece with its count, both cards fill with the share, and a folded strip stands its pieces beside an evenly cut one.",
    items: [
      /* learn ML1: answer in the plan = 6/10, which is written 0.6. The fraction is typed on the
         Fraction card; the win writes the decimal of the same six pieces on the Decimal card. */
      { qid: "M1.S1.T2.C5:ML1", kind: "strip", form: "fraction", shade: 6, parts: SLOT_FRACTION, answer: [6, 10], near: "6|4", winMs: 3200,
        say: "Write the coloured part of the strip as a fraction.", ask: "Coloured part as a fraction?",
        miss: "The bottom counts every piece." },
      /* practice 1: answer in the plan = 0.3 */
      /* the plan's question names the three, so the slip is the place, not the count: 3 put in the ones box */
      { qid: "M1.S1.T2.C5:1", kind: "strip", form: "decimal", shade: 3, parts: SLOT_DECIMAL, answer: ["0", "3"], near: "3|10", winMs: 3200,
        say: "Write the three coloured pieces with a point.", ask: "Coloured part with a point?",
        miss: "Is a whole strip coloured?" },
      /* practice 2: answer in the plan = No, because tenths are ten equal parts, so every piece has
         to be the same size */
      { qid: "M1.S1.T2.C5:2", kind: "uneven", form: "uneven", shade: 0, answer: "no", near: "yes", winMs: 3000,
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        say: "Folded without measuring, is a short piece still one tenth?", ask: "Is a short piece a tenth?",
        miss: "Stand the pieces up and compare them." },
    ],
  },
  {
    n: 2,
    concept: "The same amount, written with a point",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["Write it over ten. Now write the very same thing with a point."],
    steps: [
      { say: "Tap a piece to colour one tenth.", on: "shade", hint: "Tap a piece of the chocolate bar." },
      { say: "Tap one more and watch both cards.", on: "shade", hint: "Tap a piece that is still plain." },
    ],
    stepHold: 1800,
    ladder: TS_L2,
    closing: "A share over ten and the same share with a point say one amount.",
    learned: "You learned: a fraction over ten and a decimal say one amount.",
    traceback: "The coloured pieces light one at a time with their count, and both cards fill with that share, joined by the bar.",
    items: [
      /* learn ML2: answer in the plan = 4/10, written 0.4, and the dot is called the decimal point.
         The fraction is written on the Fraction card (the plan's answer starts 4/10); the win fills the
         Decimal card and names the dot, and says nothing about tenths (the next question asks it). */
      { qid: "M1.S1.T2.C6:ML2", kind: "strip", form: "fraction", whole: "ribbon", shade: 4, parts: SLOT_FRACTION, answer: [4, 10], near: "6|10", winMs: 3200,
        say: "Write the coloured part of the ribbon as a fraction.", ask: "Coloured part as a fraction?",
        miss: "The top counts coloured pieces." },
      /* practice 4: answer in the plan = The dot standing between the zero and the seven is the
         decimal point, and the seven counts seven tenths. The question names the number; the child says
         what the seven counts. It follows ML2 (whose win names the dot) and comes before the milk, whose
         win would say tenths. */
      { qid: "M1.S1.T2.C6:4", kind: "digit", form: "digit", whole: "chocolate bar", shade: 7, answer: "tenths", near: "ones", winMs: 3200,
        choices: [{ id: "tenths", label: "tenths" }, { id: "ones", label: "ones" }],
        say: "In 0.7, what does the 7 count?", ask: "What does the 7 count?",
        miss: "Is the 7 before or after the point?",
        /* its own rungs 2 and 3 (phase 2's are about writing a card): each says more, none names the answer */
        ladder: ["Look at the seven coloured pieces.", "Each piece is one of ten equal parts."] },
      /* practice 3: answer in the plan = 0.8 of a litre */
      { qid: "M1.S1.T2.C6:3", kind: "strip", form: "decimal", whole: "1 L milk", shade: 8, parts: SLOT_DECIMAL, answer: ["0", "8"], near: "8|10", winMs: 3200,
        say: "Now write how much milk there is, with a point.", ask: "How much milk?",
        miss: "Only one digit goes after the point." },
    ],
  },
  {
    n: 3,
    concept: "Counting more than one tenth",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["How many tenths are shaded? That is the digit after the point."],
    steps: [
      { say: "Tap Count to count the pieces.", on: "count", hint: "Tap the Count key." },
      { say: "Tap the Decimal card to write it.", on: "write", hint: "It is the card with the point." },
    ],
    stepHold: 2000,
    ladder: ["Which place does that count go in?", "Count each piece from the left."],
    closing: "The digit after the point counts how many tenths there are.",
    learned: "You learned: the digit after the point counts the tenths.",
    traceback: "The run the question asks for lights one piece at a time with its count, and the count is written in the tenths place after a grey zero.",
    items: [
      /* learn ML3: answer in the plan = 0.7, and the digit after the point counts tenths (the win says it) */
      { qid: "M1.S1.T2.C7:ML3", kind: "strip", form: "decimal", whole: "garden", shade: 7, parts: SLOT_DECIMAL, answer: ["0", "7"], near: "7|10", winMs: 3400,
        say: "Write the planted part of the garden with a point.", ask: "Planted part with a point?",
        miss: "Which pieces are coloured?" },
      /* practice 5: answer in the plan = 0.5 */
      { qid: "M1.S1.T2.C7:5", kind: "strip", form: "decimal", whole: "chapati", shade: 5, parts: SLOT_DECIMAL, answer: ["0", "5"], near: "5|10", winMs: 3200,
        say: "Write how much of the chapati was eaten, with a point.", ask: "Eaten part with a point?",
        miss: "How many pieces were eaten?" },
      /* practice 6: answer in the plan = 0.9 is shaded and 0.1 is not, and the two together rebuild
         one whole. The card takes one decimal, so the plain part is asked for (the slip is counting the
         coloured run) and the win writes both runs, 0.9 and 0.1, under the strip. */
      { qid: "M1.S1.T2.C7:6", kind: "strip", form: "decimal", whole: "chocolate bar", shade: 9, read: "plain", parts: SLOT_DECIMAL, answer: ["0", "1"], near: "0|9", winMs: 3400,
        say: "Now write the part left plain, with a point.", ask: "Plain part with a point?",
        miss: "Count only the plain pieces." },
    ],
  },
  {
    n: 4,
    concept: "What the zero in front is for",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    says: ["Something is missing in front of the point. What is it holding?"],
    steps: [
      { say: "Tap the box in front of the point.", on: "ones", hint: "Look just left of the point." },
      { say: "Put the grey zero in that box.", on: "zero", hint: "The 0 tile is at the right." },
    ],
    stepHold: 2000,
    /* rungs 2 and 3 for the zero questions; a question with a `ladder` of its own (the pocket money) gets that instead */
    ladder: TS_L4,
    closing: "Write a zero before the point every time a number is less than one.",
    learned: "You learned: the zero in front holds the ones place open.",
    traceback: "The ones box in front of the point stays open and lit, the pieces count up to the digit, and a grey zero walks into the ones place.",
    items: [
      /* learn ML4: answer in the plan = The zero in front of the point is missing, so the sign should read 0.6 */
      { qid: "M1.S1.T2.C8:ML4", kind: "zero", form: "typed", whole: "ribbon", shade: 6, title: "Sign", parts: TS_DEC_OPEN, answer: ["0", "6"], near: "|6", winMs: 3200,
        say: "Write this sign properly.", ask: "Write the sign properly.",
        miss: "Which place is before the point?" },
      /* practice 7: answer in the plan = It cannot be said yet, because nobody has said how much the
         pocket money was; two tenths is a share until the amount is named. Three keys, each naming what
         could be missing (the owner's choice over Yes / No): the amount of money is the one */
      { qid: "M1.S1.T2.C8:7", kind: "share", form: "share", whole: "pocket money", shade: 2, answer: "amount", near: "tenths", winMs: 3400,
        choices: [{ id: "amount", label: "how much" }, { id: "tenths", label: "tenths" }, { id: "point", label: "the point" }],
        say: "A pen cost two tenths of the money: what must you know to find its price?", ask: "What must you know to find the pen's rupees?",
        miss: "Read the story again: what is not told?",
        /* its own rungs 2 and 3 (phase 4's ladder is about the ones place): each says more, none names the answer */
        ladder: ["Is two tenths always the same rupees?", "More money makes two tenths bigger."] },
      /* practice 8: answer in the plan = 0.4 kg, and the zero holds the ones place to show there are no
         whole kilograms */
      { qid: "M1.S1.T2.C8:8", kind: "zero", form: "typed", whole: "1 kg", shade: 4, title: "Label", unit: "kg", parts: TS_DEC_OPEN, answer: ["0", "4"], near: "|4", winMs: 3200,
        say: "Now fix this weight label.", ask: "Write the label properly.",
        miss: "What stands in front of the point on this label?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { pieces: TS_PIECES, uneven: TS_UNEVEN, wholes: TS_WHOLES, places: ["ones", "tenths"],
  strip: { maxLen: 1200, h: 132 }, cards: ["Fraction", "Decimal"], skin: "piece" };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a fraction by its two boxes; a decimal on the card by its two boxes (the tenths digit for
   digit); a typed decimal by its written form, exactly as the book writes it (".6" is not "0.6");
   a choice by its id */
const judge = (item: any, v: any) => {
  if (item.choices) return String(v ?? "").trim().toLowerCase() === String(item.answer).toLowerCase();
  if (item.parts && item.parts.some((p: any) => p.at === "dwhole")) return judgeSlotDecimal(item, v);
  if (item.parts) return judgeSlotParts(item, v);
  return String(v ?? "").trim() === String(item.answer);
};
/* oracle: every answer re-derived from the item's own numbers, by a route that touches neither judge
   nor Work (the count of tenths written as a tenth of the whole, toFixed) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const cnt = it.read === "plain" ? 10 - it.shade : it.shade;
  if (it.form === "fraction") return it.answer[0] === cnt && it.answer[1] === 10;
  if (it.form === "decimal") return it.answer.join(".") === (cnt / 10).toFixed(1);
  if (it.form === "typed") return it.answer.join(".") === (it.shade / 10).toFixed(1);
  if (it.form === "uneven") return new Set(TS_UNEVEN).size > 1 && TS_UNEVEN.reduce((a, b) => a + b, 0) === 1080 && it.answer === "no";
  if (it.form === "digit") return String(it.shade / 10).split(".")[1].length === 1 && it.answer === "tenths";
  if (it.form === "share") return !it.amount && it.answer === "amount";
  return false;
}));
/* the most likely wrong answer (the misconception), as the child would type it; judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  const cnt = item.read === "plain" ? 10 - item.shade : item.shade;
  if (item.form === "fraction") return [item.answer[0] + "/" + item.answer[1], speakable(item.answer[0] + "/" + item.answer[1])];
  if (item.form === "decimal" || item.form === "typed") { const d = item.answer.join("."); return [d, speakable(d), speakable(cnt + "/10")]; }
  if (item.form === "digit") return [cnt + " tenths", speakable(cnt + "/10")];
  if (item.form === "share") return ["how much"];
  return [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): every question is answered on a card or by a choice key, which the runtime's own answer()
   takes ("0.6", ["0", "6"], "0|6", [6, 10]), so the tool adds nothing */
const answer = (item: any, v: any) => undefined;
/* the agent's check() before Enter: nothing waits on the picture, so Enter (in a steps phase it
   reaches api.onEnter and performs the current step) */
const check = () => undefined;

/* ── the working area ───────────────────────────────────────────────────────────────────── */

const TS_CSS = `
.ts-pop{animation:tsPop 360ms cubic-bezier(.3,1.4,.5,1) both;transform-box:fill-box;transform-origin:center}
@keyframes tsPop{from{opacity:0;transform:scale(.55)}to{opacity:1;transform:scale(1)}}
.ts-fade{animation:tsFade 420ms ease-out both}
@keyframes tsFade{from{opacity:0}to{opacity:1}}
.ts-rise{animation:tsRise 520ms cubic-bezier(.3,.7,.25,1) both}
@keyframes tsRise{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
.ts-caret{animation:tsCaret 1s steps(1) infinite}
@keyframes tsCaret{50%{opacity:0}}
.ts-flash{animation:tsFlash 900ms ease-in-out both}
@keyframes tsFlash{0%,100%{stroke-opacity:0}25%,75%{stroke-opacity:1}}
@media (prefers-reduced-motion:reduce){.ts-pop,.ts-fade,.ts-rise,.ts-flash,.ts-caret{animation:none}}
`;

/* the run of pieces a question asks about */
const tsRun = (it: any) => (!it ? 0 : it.read === "plain" ? TS_PIECES - (it.shade || 0) : it.shade || 0);
/* a count of tenths, written with a point, as the card's two boxes */
const tsDec = (c: number) => (c >= TS_PIECES ? ["1", "0"] : ["0", String(c)]);
const tsFirst = (c: number) => Array.from({ length: TS_PIECES }, (_, i) => i < c);

/* the action key's words, by the act it does now (its data-control) */
const TS_KEY: any = { cut: "Cut", uneven: "By eye", measure: "Measure", flat: "Lay flat", count: "Count" };
/* each name key: a picture on a cream plate (10 in, 44 wide, 10 to the word), then the word: its English width in
   Poppins Bold at 32 (229, 109, 129) with room to spare; Hindi and Gujarati are narrower */
const TS_CHIP_W = [314, 192, 212];
/* where everything stands, from the room the working area has (box.w: 1472 shut, 1086 open). keyX is the left edge of
   the key's corner (props.box.key); `shift` (the name keys are on screen) pulls the name row left so it ends 12 short
   of that corner */
const tsGeo = (W: number, centre: boolean, keyX: number, shift: boolean) => {
  const L = Math.min(1200, W - 40), x0 = Math.round((W - L) / 2);
  /* the two cards stand under the strip's middle when nothing else needs the right of the foot */
  const cx = x0 + (centre ? Math.round((L - 664) / 2) : 0);
  const nw = 380, rowW = nw + TS_CHIP_W.reduce((a, b) => a + 12 + b, 0);
  const nx = shift ? Math.max(0, Math.min(x0, keyX - 12 - rowW)) : x0;
  return {
    L, x0,
    name: { x: nx, y: 0, w: nw, h: 76 },
    /* the name keys, each as wide as its picture and word need */
    chip: (j: number) => {
      let x = nx + nw + 12;
      for (let k = 0; k < j; k++) x += TS_CHIP_W[k] + 12;
      return { x, y: 0, w: TS_CHIP_W[j], h: 76 };
    },
    strip: { x: x0, y: 96, w: L, h: 132 },
    base: 266,
    frac: { x: cx, y: 284, w: 210, h: 236 },
    join: { x: cx + 226, y: 284 + 100, w: 72, h: 32 },
    dec: { x: cx + 314, y: 284, w: 350, h: 236 },
    right: { x: x0 + 700, y: 284, w: L - 700, h: 236 },
    /* the action key (one, or Cut and By eye side by side): at the bottom, centred under the strip, or centred in the
       free room right of the cards when they fill the foot (free play, phase 3's steps) */
    keys: (count: number, cardsLeft: boolean) => {
      const lo = cardsLeft ? cx + 664 + 16 : x0, hi = x0 + L, gap = 16;
      const w = count === 1 ? 240 : Math.min(200, (hi - lo - gap) / 2), tot = count * w + (count - 1) * gap;
      return Array.from({ length: count }, (_, j) => ({ x: Math.round((lo + hi) / 2 - tot / 2 + j * (w + gap)), y: 408, w, h: 96 }));
    },
  };
};
/* the pieces along the strip: ten of one length, or ten folded by eye */
const tsCuts = (cut: string, L: number) => {
  if (cut === "uneven") {
    let a = 0;
    return TS_UNEVEN.map((u) => { const w = (u * L) / 1080; const r = { a, w }; a += w; return r; });
  }
  return Array.from({ length: TS_PIECES }, (_, i) => ({ a: (i * L) / TS_PIECES, w: L / TS_PIECES }));
};
/* one piece: square where it meets its neighbours, round at the two ends of the whole */
const tsPieceD = (x: number, y: number, w: number, h: number, rl: boolean, rr: boolean) => {
  const r = 16, a = rl ? r : 0, b = rr ? r : 0;
  return `M ${x + a} ${y} H ${x + w - b}` + (rr ? ` A ${r} ${r} 0 0 1 ${x + w} ${y + r}` : "") + ` V ${y + h - b}`
    + (rr ? ` A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}` : "") + ` H ${x + a}` + (rl ? ` A ${r} ${r} 0 0 1 ${x} ${y + h - r}` : "")
    + ` V ${y + a}` + (rl ? ` A ${r} ${r} 0 0 1 ${x + r} ${y}` : "") + " Z";
};
/* how a scene opens: a phase's steps, a question, free play */
const tsFresh = (n: number, key: string, item: any, named: any) => {
  const base: any = { key, name: null, cut: "none", shaded: tsFirst(0), stand: false, count: 0, write: false, ones: false, zero: false, lit: 0, fix: null };
  if (key.endsWith(":free") || key.endsWith(":sum")) return base;
  if (key.endsWith(":demo")) {
    if (n === 1) return base;
    /* phase 3's steps stand under its first question ("Planted part with a point?"), so its strip is the garden */
    return { ...base, name: n === 3 ? "garden" : TS_WHOLES[0], cut: "even", shaded: tsFirst(n === 3 ? 3 : n === 4 ? 5 : 0) };
  }
  const it = item || {};
  return { ...base, name: n === 1 ? named || TS_WHOLES[0] : it.whole || TS_WHOLES[0], cut: it.kind === "uneven" ? "uneven" : "even", shaded: tsFirst(it.shade || 0) };
};

function Work({ phase, n, item, index, stage, wrong, typed, part, api, MODEL, step, stepOn, box, answerOn, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const it = item || {};
  const free = stage === "free";
  const isDemo = stage === "demo";
  const won = stage === "win" || stage === "idle";
  /* in free play `item` is the last question of the last phase: read the stage first */
  const k = free ? "free" : isDemo ? "demo" : it.form || "";
  const sceneKey = n + ":" + (free ? "free" : isDemo || stage === "teach" ? "demo" : stage === "summary" ? "sum" : "q" + index);
  const named = useRef<any>(null);
  const [raw, setRaw] = useState<any>(null);
  const s = raw && raw.key === sceneKey ? raw : tsFresh(n, sceneKey, it, named.current);
  const put = (patch: any) => setRaw((o: any) => {
    const b = o && o.key === sceneKey ? o : tsFresh(n, sceneKey, it, named.current);
    return { ...b, ...(typeof patch === "function" ? patch(b) : patch) };
  });
  const bw0 = box ? box.w : W.w;
  const G = tsGeo(bw0, k === "fraction" || k === "decimal" || k === "digit" || (isDemo && n === 2),
    box && box.key ? box.key.x : bw0, (n === 1 && isDemo) || free);
  /* a skin only where the whole IS that object (a skin never contradicts the name on screen): the chocolate tile for the
     chocolate bar, the ribbon and the chapati strips for those two; a garden, a litre of milk, pocket money or 1 kg stay
     the plain paper strip with its name label */
  const sk = s.name === "chocolate bar" ? "piece" : s.name === "ribbon" ? "ribbon" : s.name === "chapati" ? "chapati" : "";
  const choc = sk === "piece";
  /* ribbon and chapati are strip skins: one picture over the WHOLE strip's box, each piece clipped to its own section */
  const tex = sk === "ribbon" || sk === "chapati";
  /* phase 4's rungs for the question on show: its own `ladder` when it has one, else the zero rungs */
  if (n === 2 || n === 4) {
    const lad = n === 2 ? TS_L2 : TS_L4, own = !free && Array.isArray(it.ladder) ? it.ladder : n === 2 ? TS_P2_RUNGS : TS_ZERO_RUNGS;
    lad[0] = own[0]; lad[1] = own[1];
  }
  const coloured = s.shaded.filter(Boolean).length;

  /* ── the acts: each one click, reported the moment it happens ── */
  const perform = (on: string, arg?: any) => {
    /* a name gives a whole, uncut strip of that object (in free play this brings Cut and By eye back) */
    if (on === "name") { named.current = arg; put({ name: arg, lit: 0, cut: "none", stand: false, shaded: tsFirst(0) }); api.sfx.tick(); return; }
    if (on === "cut" || on === "uneven") {
      if (!s.name) { put({ lit: s.lit + 1 }); return; }   /* nothing is cut until the whole is named */
      api.sfx.cut();
      put({ cut: on === "cut" ? "even" : "uneven", stand: false, shaded: tsFirst(0) });
      tl.run([[650, () => {}]], () => api.sfx.settle());
      return;
    }
    if (on === "measure") { if (s.cut === "none") return; api.sfx.settle(); put({ stand: true }); return; }
    if (on === "flat") { api.sfx.settle(); put({ stand: false }); return; }
    if (on === "count") { api.sfx.tick(); put((b: any) => ({ count: b.count + 1 })); return; }
    if (on === "write") { api.sfx.settle(); put({ write: true }); return; }
    if (on === "ones") { api.sfx.tick(); put({ ones: true }); return; }
    if (on === "zero") { api.sfx.settle(); put({ zero: true, ones: true }); return; }
    if (on === "shade") { api.sfx.tick(); put((b: any) => { const sh = b.shaded.slice(); sh[arg] = !sh[arg]; return { shaded: sh, stand: false }; }); return; }
  };
  /* the action key changes its act under the finger (Cut, then Measure, then Lay flat): a second tap within 400 ms of
     the last is the same press and does nothing, so a double tap on Cut or By eye never also measures and a double tap
     on Measure never also lays the pieces flat. Only taps on the key: Enter, the agent and solve() go straight to act */
  const lastKey = useRef(0);
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    act(on);
  };
  const act = (on: string, arg?: any) => {
    if (isDemo) {
      /* the whole may be renamed until it is cut (as in free play): a chip is never a wrong act before Cut */
      if (on === "name" && stepOn !== on && s.name && s.cut === "none") { perform(on, arg !== undefined ? arg : s.name); return; }
      /* a guide step: only the act it waits for moves anything; any other act shows the step's hint */
      if (stepOn !== on) { api.did(on); if ((on === "cut" || on === "uneven") && !s.name) put({ lit: s.lit + 1 }); return; }
      const a = arg !== undefined ? arg : on === "name" ? TS_WHOLES[0] : on === "shade" ? s.shaded.indexOf(false) : undefined;
      if (on === "shade" && (a < 0 || s.shaded[a])) { api.did("unshade"); return; }
      perform(on, a);
      api.did(on);
      return;
    }
    api.did(on);
    perform(on, arg);
  };
  /* Enter, the agent's toolApi.check() and the dev solve() perform the CURRENT step */
  api.onEnter(isDemo && stepOn ? () => act(stepOn) : null);
  HOOK.demo = () => { if (isDemo && stepOn) act(stepOn); };

  /* a new scene: the card may blink again */
  useEffect(() => { api.cardReady(true); }, [sceneKey]);

  /* ── the traceback: count the run the question asks for, then write the whole right answer ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    api.cardReady(false);
    const v = String(wrong.value ?? "");
    put((b: any) => ({ stand: false, fix: { forTyped: v, st: 1, run: ((b.fix && b.fix.run) || 0) + 1 } }));
    const kk = it.form === "uneven" ? 3 : tsRun(it);
    tl.run([[kk * 240 + 600, () => {}], [1000, () => put((b: any) => ({ fix: { ...(b.fix || {}), st: 2 } }))], [700, () => {}]],
      () => { api.lock(false); api.cardReady(true); });
  }, [wrong]);

  /* ── the win: a line of its own for every question ── */
  useEffect(() => {
    if (stage !== "win") return;
    const q = it.qid;
    if (q === "M1.S1.T2.C5:ML1") api.say("Yes, six of ten equal pieces is six tenths of the strip.");
    else if (q === "M1.S1.T2.C5:1") api.say("Yes, 0.3 is the same as three tenths.");
    else if (q === "M1.S1.T2.C5:2") api.say("Right, the pieces are not equal, so none of them is a tenth.");
    else if (q === "M1.S1.T2.C6:ML2") api.say("Yes, the Decimal card writes the same amount, and its dot is the decimal point.");
    else if (q === "M1.S1.T2.C6:4") api.say("Right, the 7 sits just after the point, in the tenths place.");
    else if (q === "M1.S1.T2.C6:3") api.say("Yes, the milk is 0.8 of the litre.");
    else if (q === "M1.S1.T2.C7:ML3") api.say("Yes, 0.7 is planted: the 7 counts seven planted tenths.");
    else if (q === "M1.S1.T2.C7:5") api.say("Yes, 0.5 of the chapati was eaten, which is half of it.");
    else if (q === "M1.S1.T2.C7:6") api.say("Yes, 0.1 plain and 0.9 coloured make 1 whole.");
    else if (q === "M1.S1.T2.C8:ML4") api.say("Yes, 0.6 is six tenths, and the 0 stands in the ones place.");
    else if (q === "M1.S1.T2.C8:7") api.say("Right, nobody said how much money there was, so the rupees cannot be found.");
    else if (q === "M1.S1.T2.C8:8") api.say("Yes, 0.4 kg: the 0 shows there is no whole kilogram.");
  }, [stage, index]);

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ wholeName: s.name, pieces: s.cut === "none" ? 1 : TS_PIECES, equal: s.cut !== "uneven", shaded: coloured,
    measured: !!s.stand, complete: stage === "idle" });

  /* ── what each part of the picture shows now ── */
  const fixOn = !!(s.fix && stage === "ask");
  const fix2 = fixOn && s.fix.st >= 2;
  const fixCards = fix2 && String(typed ?? "") === s.fix.forTyped;   /* the correction's answer, until the child types again */
  const kk = tsRun(it);
  const cuts = tsCuts(s.cut === "none" ? "even" : s.cut, G.L);
  const standNow = s.stand || (k === "uneven" && (fixOn || won));
  /* the width of the coloured run from the left (0 when there is none, it is broken, or the row under the strip is
     taken by a correction or a win) */
  const runOk = coloured > 0 && s.shaded.every((x: boolean, i: number) => x === i < coloured);
  const runLabel = runOk && s.cut !== "none" && !standNow && !fixOn && !won ? cuts[coloured - 1].a + cuts[coloured - 1].w : 0;
  const showCards = !(n === 1 && isDemo) && k !== "uneven";
  /* the pieces whose count is written on them (a counted run) */
  let counted: number[] = [];
  if (isDemo && n === 3 && s.count > 0) counted = [0, 1, 2];
  else if (!isDemo && !free && (fixOn || won) && k !== "uneven") {
    counted = it.read === "plain" ? Array.from({ length: kk }, (_, j) => (it.shade || 0) + j) : Array.from({ length: kk }, (_, j) => j);
  }
  const countRun = isDemo ? s.count : s.fix ? s.fix.run : won ? 99 : 0;

  let fracV = ["", ""], decV = ["", ""], fracAct = -1, decAct = -1;
  /* the place headings: in phase 2 only from C5:4's win on (a "tenths" heading earlier would answer "what does the 7
     count?" before it is asked) */
  let heads = n >= 3 || free || (n === 2 ? (won || fix2) && index >= 1 : won || fix2);
  let open = false, lit = false, note = false, title = "Decimal", unit = "";
  if (free) {
    if (s.cut === "even" && coloured > 0) { fracV = [String(coloured), "10"]; decV = tsDec(coloured); }
  } else if (isDemo) {
    if (n === 2 && coloured > 0) { fracV = [String(coloured), "10"]; decV = tsDec(coloured); }
    if (n === 3 && s.write) { fracV = ["3", "10"]; decV = ["0", "3"]; }
    /* phase 4's steps: the card is the sign written without its zero (the first question's ask names a sign) */
    if (n === 4) { fracV = ["5", "10"]; decV = [s.zero ? "0" : "", "5"]; open = !s.zero; lit = s.ones && !s.zero; note = s.ones; title = "Sign"; }
  } else {
    const typedV = slotPartsOf(typed, 2);
    const asked = answerOn === "card" && box && box.open;
    if (k === "fraction") {
      fracV = won || fixCards ? [String(kk), "10"] : stage === "ask" ? typedV : ["", ""];
      if (won || fix2) decV = tsDec(kk);
      if (asked && !fixCards) fracAct = part || 0;
    } else if (k === "decimal") {
      decV = won || fixCards ? tsDec(kk) : stage === "ask" ? typedV : ["", ""];
      if (won || fix2) fracV = [String(kk), "10"];
      if (asked && !fixCards) decAct = part || 0;
      note = fix2;
    } else if (k === "typed") {
      /* the sign rewritten on the Decimal card by the child: the ones box stands open (dashed) while nothing is in it and
         is lit only by a correction; the sign itself stands at the right as it was written */
      decV = won || fixCards ? tsDec(kk) : stage === "ask" ? typedV : ["", ""];
      open = decV[0] === ""; lit = fixOn && decV[0] === ""; note = won || fix2; heads = true; unit = it.unit || "";
      if (won || fix2) fracV = [String(kk), "10"];
      if (asked && !fixCards) decAct = part || 0;
    } else if (k === "digit") {
      decV = tsDec(kk);
      heads = won || fix2;
      if (won || fix2) fracV = [String(kk), "10"];
    } else if (k === "share") {
      fracV = [String(kk), "10"]; decV = tsDec(kk); heads = true;
    }
  }
  const full = (v: string[]) => v[0] !== "" && v[1] !== "";
  const joined = showCards && full(fracV) && full(decV);

  /* ── drawing helpers (called, never mounted) ── */
  const digitSize = (vals: string[]) => { const m = Math.max(1, ...vals.map((v) => String(v || "").length)); return m <= 2 ? 48 : m <= 3 ? 40 : 32; };
  const caret = (bx: number, by: number, bw: number, bh: number, txt: string, fs: number) => {
    const cx = bx + bw / 2 + (String(txt).length * fs * 0.3) + 6;
    return <line className="ts-caret" x1={cx} y1={by + 14} x2={cx} y2={by + bh - 14} stroke={C.accent} strokeWidth={3} strokeLinecap="round" />;
  };

  /* a name key's small picture, on a cream plate at the key's left (the key's own coordinates: 0, 0 is its centre), drawn
     from the same skins: a 2 x 4 block of chocolate pieces, a round chapati with a brown rim, a ribbon with a swallow-tail
     end and a curl. The plain fills under each skin are the fallback */
  const chipPic = (w: string, cw: number) => {
    const px = -cw / 2 + 32;
    let pic: any = null;
    if (w === "chocolate bar") {
      pic = Array.from({ length: 8 }, (_, i) => {
        const x = px - 19.5 + (i % 4) * 10, y = -11.5 + Math.floor(i / 4) * 12;
        return (
          <g key={i}>
            <rect x={x} y={y} width={9} height={11} rx={1.5} fill="#6B3B22" />
            <Skin name="piece" x={x} y={y} w={9} h={11} fit="stretch" />
          </g>
        );
      });
    } else if (w === "chapati") {
      pic = (
        <g>
          <defs><clipPath id="ts-ico-chapati"><circle cx={px} cy={0} r={17} /></clipPath></defs>
          <circle cx={px} cy={0} r={17} fill="#E2B260" />
          <Skin name="chapati" x={px - 17} y={-17} w={34} h={34} clip="url(#ts-ico-chapati)" />
          <circle cx={px} cy={0} r={17} fill="none" stroke="#8A5A2B" strokeWidth={2.5} />
        </g>
      );
    } else if (w === "ribbon") {
      const bx = px - 17, d = `M ${bx + 7} -9 H ${bx + 36} L ${bx + 29} -2 L ${bx + 36} 5 H ${bx + 7} A 7 7 0 0 1 ${bx + 7} -9 Z`;
      pic = (
        <g>
          <defs><clipPath id="ts-ico-ribbon"><path d={d} /></clipPath></defs>
          <path d={d} fill="#7B2238" />
          <Skin name="ribbon" x={bx} y={-9} w={36} h={14} clip="url(#ts-ico-ribbon)" />
          <path d={`M ${bx + 6} 4 C ${bx - 2} 12, ${bx + 7} 19, ${bx + 11} 12`} fill="none" stroke="#6A1B2E" strokeWidth={3} strokeLinecap="round" />
        </g>
      );
    }
    return (
      <g pointerEvents="none">
        <rect x={px - 22} y={-22} width={44} height={44} rx={10} fill="#FFF8EC" stroke="#B9946A" strokeWidth={1.5} />
        {pic}
      </g>
    );
  };

  const nameRow = () => {
    const nb = G.name;
    /* the name chips: in phase 1's steps until the strip is cut (they rename it till then), and always in free play */
    const chips = (n === 1 && isDemo && s.cut === "none") || free;
    return (
      <g>
        <rect x={nb.x} y={nb.y} width={nb.w} height={nb.h} rx={16} fill="#FFFFFF" stroke={s.name ? C.rule : C.accent} strokeWidth={s.name ? 2 : 3}
          strokeDasharray={s.name ? undefined : "10 8"} />
        <text x={nb.x + 22} y={nb.y + 48} fontSize={T.micro} fontWeight={700} fill={TS_INK2}>{tx("Whole")}</text>
        <text x={nb.x + 122} y={nb.y + 50} fontSize={T.label} fontWeight={700} fill={s.name ? TS_LINE : C.accent}>{s.name ? tx(s.name) : "?"}</text>
        {s.lit > 0 && <rect key={"lit" + s.lit} className="ts-flash" x={nb.x - 5} y={nb.y - 5} width={nb.w + 10} height={nb.h + 10} rx={20}
          fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}
        {k === "share" && (fix2 || won) && (
          <g className="ts-pop">
            <rect x={G.chip(0).x} y={0} width={150} height={76} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="10 8" />
            <text x={G.chip(0).x + 75} y={50} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.accent}>₹ ?</text>
          </g>
        )}
        {chips && TS_WHOLES.map((w, j) => {
          const c = G.chip(j), sel = s.name === w;
          return (
            <Key key={w} id={"name-" + w} label={tx(w)} x={c.x} y={c.y} w={c.w} h={c.h - 4} C={C} tone={sel ? "enter" : "key"} primary={sel}
              onClick={() => act("name", w)}>
              {chipPic(w, c.w)}
              <text x={25} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk(sel ? "enter" : "key", sel ? "#FFFFFF" : C.ink)}>{tx(w)}</text>
            </Key>
          );
        })}
      </g>
    );
  };

  /* a ribbon's two thin, lighter selvage lines along its long edges (so a lone piece still reads as ribbon) */
  const selvage = (x: number, y: number, w: number, h: number, inset: number) => (
    <g stroke="#F2C9D3" strokeOpacity={0.8} strokeWidth={2.5} pointerEvents="none">
      <line x1={x} y1={y + inset} x2={x + w} y2={y + inset} />
      <line x1={x} y1={y + h - inset} x2={x + w} y2={y + h - inset} />
    </g>
  );
  /* a ribbon or chapati piece stood on end: drawn lying (its length along x, bw thick) and turned a quarter about its
     foot, so the picture's grain runs up the piece; clipId is a rect of that lying box. The picture (a 720 x 100 strip)
     is drawn at the SAME scale as on the lying strip (its box as tall as the strip draws it), so the grain and the spots
     match the strip; its box stays the piece's length, because a box the whole strip long, turned upright, would leave
     the working area (the `skins` and `zones` rows read the picture's own box, not its clip) */
  const skinUp = (x: number, base: number, len: number, bw: number, clipId: string) => {
    const hh = 100 * Math.max(G.L / 720, G.strip.h / 100);
    return (
      <g transform={`rotate(-90 ${x} ${base})`}>
        <Skin name={sk} x={x} y={base + bw / 2 - hh / 2} w={len} h={hh} clip={"url(#" + clipId + ")"} />
        {sk === "ribbon" && <g clipPath={"url(#" + clipId + ")"}>{selvage(x, base, len, bw, 6)}</g>}
      </g>
    );
  };

  const stripView = () => {
    const S = G.strip;
    if (standNow) return null;
    if (s.cut === "none") {
      /* the whole, uncut: one skin clipped to the rounded strip, the outline on top (owner 2026-10-15: the chocolate bar
         shows as soon as it is named, like the ribbon and the chapati: one chocolate tile stretched over the whole bar, so it
         reads as one slab and gives no squares away before the cut) */
      return (
        <g>
          {sk && <defs><clipPath id="ts-whole"><rect x={S.x} y={S.y} width={S.w} height={S.h} rx={18} /></clipPath></defs>}
          <rect x={S.x} y={S.y} width={S.w} height={S.h} rx={18} fill={TS_SHEET} stroke={TS_LINE} strokeWidth={3} filter="url(#fShadowSoft)" />
          {choc && <Skin name="piece" x={S.x} y={S.y} w={S.w} h={S.h} fit="stretch" clip="url(#ts-whole)" />}
          {tex && <Skin name={sk} x={S.x} y={S.y} w={S.w} h={S.h} clip="url(#ts-whole)" />}
          {sk === "ribbon" && <g clipPath="url(#ts-whole)">{selvage(S.x, S.y, S.w, S.h, 10)}</g>}
          {sk && <rect x={S.x} y={S.y} width={S.w} height={S.h} rx={18} fill="none" stroke={TS_LINE} strokeWidth={3} />}
        </g>
      );
    }
    const live = (n === 2 && isDemo) || free;
    return (
      <g>
        {/* each piece is its own element with its own box (S.x + a, S.y, w, S.h): the plain paper shape first (the
            fallback), the skin (the chocolate tile stretched to that box; a ribbon or chapati picture over the WHOLE strip's
            box, clipped to this piece, so the pieces read as one object), then the amber of a coloured piece over it at
            0.72 with a dark inset outline (the cue that does not rest on colour), then the outline; the equal widths come
            from the model */}
        <defs>
          {cuts.map((c, i) => (
            <clipPath key={"k" + i} id={"ts-pc" + i}><path d={tsPieceD(S.x + c.a, S.y, c.w, S.h, i === 0, i === TS_PIECES - 1)} /></clipPath>
          ))}
        </defs>
        <g filter="url(#fShadowSoft)">
          {cuts.map((c, i) => {
            const d = tsPieceD(S.x + c.a, S.y, c.w, S.h, i === 0, i === TS_PIECES - 1);
            return (
              <g key={"p" + i} data-role="piece">
                <path d={d} fill={TS_SHEET} />
                {choc && <Skin name="piece" x={S.x + c.a} y={S.y} w={c.w} h={S.h} fit="stretch" clip={"url(#ts-pc" + i + ")"} />}
                {tex && <Skin name={sk} x={S.x} y={S.y} w={S.w} h={S.h} clip={"url(#ts-pc" + i + ")"} />}
                {sk === "ribbon" && <g clipPath={"url(#ts-pc" + i + ")"}>{selvage(S.x + c.a, S.y, c.w, S.h, 10)}</g>}
                {s.shaded[i] && <path d={d} fill="url(#gTen)" fillOpacity={0.72} />}
                {s.shaded[i] && <rect x={S.x + c.a + 7} y={S.y + 7} width={c.w - 14} height={S.h - 14} rx={8} fill="none" stroke={TS_LINE} strokeWidth={4} />}
                <path d={d} fill="none" stroke={TS_LINE} strokeWidth={3} />
              </g>
            );
          })}
        </g>
        {cuts.slice(1).map((c, i) => (
          <line key={"c" + i} className="ts-fade" style={{ animationDelay: i * 45 + "ms" } as any}
            x1={S.x + c.a} y1={S.y} x2={S.x + c.a} y2={S.y + S.h} stroke={TS_LINE} strokeWidth={3.5} />
        ))}
        {/* the written word under the coloured run, so colour never carries the reading alone */}
        {runLabel && (
          <g pointerEvents="none">
            <path d={`M ${S.x + 6} ${S.y + S.h + 6} V ${S.y + S.h + 14} H ${S.x + runLabel - 6} V ${S.y + S.h + 6}`} fill="none" stroke={TS_LINE} strokeWidth={3} strokeLinejoin="round" />
            <text x={S.x + Math.max(runLabel / 2, 70)} y={S.y + S.h + (lang === "en" ? 38 : 46)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TS_LINE}>{tx("coloured")}</text>
          </g>
        )}
        {live && cuts.map((c, i) => (
          <Hit key={"h" + i} id={"piece-" + (i + 1)} x={S.x + c.a} y={S.y} w={c.w} h={S.h} label={tx("piece") + " " + (i + 1)}
            onPress={() => act("shade", i)} />
        ))}
      </g>
    );
  };

  /* the pieces lifted off the strip and stood end on against the rule: the same lengths, upright */
  const standView = () => {
    if (!standNow) return null;
    const S = G.strip, base = G.base, bw = 40;
    const lens = cuts.map((c) => c.w);
    const hi = Math.max(...lens), lo = Math.min(...lens);
    const lastX = S.x + cuts[TS_PIECES - 1].a + cuts[TS_PIECES - 1].w / 2 + bw / 2;
    const bx = Math.min(lastX + 22, S.x + S.w - 6);
    const upX = (c: any) => S.x + c.a + c.w / 2 - bw / 2;
    return (
      <g pointerEvents="none">
        {tex && <defs>{cuts.map((c, i) => (
          <clipPath key={"u" + i} id={"ts-up" + i}><rect x={upX(c)} y={base} width={c.w} height={bw} rx={6} /></clipPath>
        ))}</defs>}
        <line x1={S.x} y1={base} x2={S.x + S.w} y2={base} stroke={TS_LINE} strokeWidth={4} strokeLinecap="round" />
        {Array.from({ length: 13 }).map((_, j) => (
          <line key={"t" + j} x1={S.x + (j * S.w) / 12} y1={base} x2={S.x + (j * S.w) / 12} y2={base + 10} stroke={TS_LINE} strokeWidth={2} />
        ))}
        {cuts.map((c, i) => {
          const x = upX(c), y = base - c.w;
          return (
            <g key={"b" + i} className="ts-rise" style={{ animationDelay: i * 30 + "ms" } as any}>
              <rect x={x} y={y} width={bw} height={c.w} rx={6} fill={TS_SHEET} />
              {choc && <Skin name="piece" x={x} y={y} w={bw} h={c.w} fit="stretch" />}
              {tex && skinUp(x, base, c.w, bw, "ts-up" + i)}
              {s.shaded[i] && <rect x={x} y={y} width={bw} height={c.w} rx={6} fill="url(#gTen)" fillOpacity={0.72} />}
              {s.shaded[i] && <rect x={x + 5} y={y + 5} width={bw - 10} height={c.w - 10} rx={4} fill="none" stroke={TS_LINE} strokeWidth={3} />}
              <rect x={x} y={y} width={bw} height={c.w} rx={6} fill="none" stroke={TS_LINE} strokeWidth={2.5} />
            </g>
          );
        })}
        {hi - lo > 1 ? (
          <g stroke={TS_LINE} strokeWidth={3} strokeLinecap="round">
            <line x1={bx} y1={base - hi} x2={bx} y2={base - lo} />
            <line x1={bx - 8} y1={base - hi} x2={bx + 8} y2={base - hi} />
            <line x1={bx - 8} y1={base - lo} x2={bx + 8} y2={base - lo} />
          </g>
        ) : (
          <line x1={bx - 8} y1={base - hi} x2={bx + 8} y2={base - hi} stroke={TS_LINE} strokeWidth={3} strokeLinecap="round" />
        )}
        {/* free play: a tap on the standing pieces says how to lay them down again (never a silent tap) */}
        {free && (
          <g pointerEvents="all">
            <Hit id="stand" x={S.x} y={base - hi - 8} w={S.w} h={hi + 16} label={tx("standing pieces")}
              onPress={() => api.say("Tap Lay flat to lay them down.")} />
          </g>
        )}
      </g>
    );
  };

  const cardFrac = () => {
    const c = G.frac, bw = 120, bh = 70, bx = c.x + (c.w - bw) / 2;
    const boxes = [{ y: c.y + 46 }, { y: c.y + 142 }];
    const fs = digitSize(fracV);
    return (
      <g>
        <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
        <text x={c.x + c.w / 2} y={c.y + 34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TS_INK2}>{tx("Fraction")}</text>
        {boxes.map((b, j) => (
          <g key={j}>
            <rect x={bx} y={b.y} width={bw} height={bh} rx={10} fill={fracAct === j ? "#FFFFFF" : tint(C.panel, 0.55)}
              stroke={fracAct === j ? C.accent : C.rule} strokeWidth={fracAct === j ? 4 : 2} />
            {fracV[j] !== "" && <text key={"f" + j + fracV[j]} className={won || fixCards ? "ts-pop" : undefined} x={bx + bw / 2} y={b.y + bh / 2 + fs * 0.36}
              textAnchor="middle" fontSize={fs} fontWeight={700} fill={TS_LINE}>{fracV[j]}</text>}
            {fracAct === j && caret(bx, b.y, bw, bh, fracV[j], fs)}
          </g>
        ))}
        <line x1={bx - 18} y1={c.y + 129} x2={bx + bw + 18} y2={c.y + 129} stroke={TS_LINE} strokeWidth={5} strokeLinecap="round" />
      </g>
    );
  };

  /* the Decimal card's two boxes and the point between them; with a unit after the tenths box ("kg", "किग्रा") the
     boxes sit closer and further left, so the unit ends inside the card in every language */
  const decBoxes = () => {
    const c = G.dec, u = !!(it && it.unit && !free && !isDemo);
    const wx = c.x + (u ? 22 : 34), dx = c.x + (u ? 150 : 182);
    return { wb: { x: wx, y: c.y + 92, w: 100, h: 100 }, db: { x: dx, y: c.y + 92, w: 100, h: 100 }, px: (wx + 100 + dx) / 2 };
  };
  const cardDec = () => {
    const c = G.dec, { wb, db, px } = decBoxes();
    const fs = digitSize(decV);
    const zeroWalk = (k === "typed" && (won || fix2)) || (isDemo && n === 4 && s.zero);
    return (
      <g>
        <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
        <text x={c.x + c.w / 2} y={c.y + 34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TS_INK2}>{tx(title)}</text>
        {heads && <text x={wb.x + wb.w / 2} y={c.y + 78} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TS_INK_ONES}>{tx("ones")}</text>}
        {heads && <text x={db.x + db.w / 2} y={c.y + 78} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TS_INK_TENTH}>{tx("tenths")}</text>}
        {/* the ones box: drawn open (dashed) while nothing is in it on a written sign, lit when it is looked for */}
        <rect x={wb.x} y={wb.y} width={wb.w} height={wb.h} rx={10}
          fill={decAct === 0 ? "#FFFFFF" : lit ? tint(C.accent, 0.78) : tint(C.panel, 0.55)}
          stroke={decAct === 0 || lit ? C.accent : C.rule} strokeWidth={decAct === 0 || lit ? 4 : 2} strokeDasharray={open ? "12 8" : undefined} />
        <rect x={db.x} y={db.y} width={db.w} height={db.h} rx={10} fill={decAct === 1 ? "#FFFFFF" : tint(C.panel, 0.55)}
          stroke={decAct === 1 ? C.accent : C.rule} strokeWidth={decAct === 1 ? 4 : 2} />
        <circle cx={px} cy={wb.y + wb.h - 16} r={8} fill={TS_DOT} />
        {decV[0] !== "" && <text key={"w" + decV[0] + (zeroWalk ? "z" : "")} className={zeroWalk || won || fixCards ? "ts-pop" : undefined}
          x={wb.x + wb.w / 2} y={wb.y + wb.h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700}
          fill={decV[0] === "0" ? TS_ZERO : TS_INK_ONES}>{decV[0]}</text>}
        {decV[1] !== "" && <text key={"d" + decV[1]} className={won || fixCards ? "ts-pop" : undefined}
          x={db.x + db.w / 2} y={db.y + db.h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={TS_INK_TENTH}>{decV[1]}</text>}
        {decAct === 0 && caret(wb.x, wb.y, wb.w, wb.h, decV[0], fs)}
        {decAct === 1 && caret(db.x, db.y, db.w, db.h, decV[1], fs)}
        {unit && <text x={db.x + db.w + 10} y={db.y + db.h / 2 + 12} fontSize={lang === "en" ? T.label : T.micro} fontWeight={700} fill={TS_LINE}>{tx(unit)}</text>}
        {/* hi / gu: 6 lower, so the matras clear the boxes' bottom edge */}
        {note && <text x={c.x + 18} y={c.y + c.h - (lang === "en" ? 14 : 8)} fontSize={T.micro} fontWeight={600} fill={TS_INK2}>{tx("no whole ones")}</text>}
      </g>
    );
  };

  const cardsView = () => {
    if (!showCards) return null;
    const j = G.join;
    return (
      <g>
        {cardFrac()}
        {/* the joining bar: two bars, an equals sign, that fill only when both cards carry the amount */}
        {[0, 1].map((r) => (
          <rect key={"j" + r} x={j.x} y={j.y + r * 22} width={j.w} height={10} rx={5} fill={joined ? C.accent : "none"}
            stroke={joined ? C.accent : C.rule} strokeWidth={2} strokeDasharray={joined ? undefined : "8 6"} />
        ))}
        {cardDec()}
      </g>
    );
  };

  /* the ONE action key at the foot, its act (and data-control) following the strip: Cut until it is cut (free play: Cut
     and By eye side by side), then Measure, then Lay flat, then Measure again; phase 3's Count; the folded strip's
     Measure until its correction or win stands the pieces up and draws the even strip where the key stood */
  const actionKeys = () => {
    const flat = s.stand ? "flat" : "measure";
    let ids: string[] = [];
    if (free) ids = s.cut === "none" ? ["cut", "uneven"] : [flat];
    else if (n === 1 && isDemo) ids = s.cut === "none" ? ["cut"] : [flat];
    else if (k === "uneven" && !fixOn && !won) ids = [flat];
    else if (n === 3 && isDemo) ids = ["count"];
    const bs = G.keys(ids.length, showCards);
    return ids.map((id, j) => ({ id, j, label: TS_KEY[id], ...bs[j] }));
  };
  /* the action key, the zero tile, and the correction's own drawings at the right */
  const rightView = () => {
    return (
      <g>
        {actionKeys().map((b) => (
          <Key key={"act" + b.j} id={b.id} label={tx(b.label)} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" onClick={() => pressKey(b.id)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(b.label)}</text>
          </Key>
        ))}
        {n === 4 && isDemo && !s.zero && (
          <g>
            <rect x={G.right.x + 40} y={G.right.y + 50} width={110} height={110} rx={14} fill="#FFFFFF" stroke={TS_ZERO} strokeWidth={3} filter="url(#fShadowSoft)" />
            <text x={G.right.x + 95} y={G.right.y + 125} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={TS_ZERO}>0</text>
          </g>
        )}
        {k === "typed" && signView()}
      </g>
    );
  };
  /* the shop sign or the weight label as it was written, a bare point and a digit; the correction and the win walk a
     grey 0 into the place in front of the point */
  const signView = () => {
    const R = G.right, bw = Math.min(300, R.w - 20), bh = 150, bx = R.x + (R.w - bw) / 2, by = R.y + 50;
    const done = won || fix2;
    return (
      <g pointerEvents="none">
        <line x1={bx + 40} y1={by} x2={bx + bw / 2} y2={by - 34} stroke={TS_LINE} strokeWidth={2.5} />
        <line x1={bx + bw - 40} y1={by} x2={bx + bw / 2} y2={by - 34} stroke={TS_LINE} strokeWidth={2.5} />
        <circle cx={bx + bw / 2} cy={by - 36} r={5} fill={TS_LINE} />
        <rect x={bx} y={by} width={bw} height={bh} rx={14} fill="#FFFFFF" stroke={TS_LINE} strokeWidth={3} filter="url(#fShadowSoft)" />
        <text x={bx + bw / 2} y={by + 34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TS_INK2}>{tx(it.title || "Sign")}</text>
        <text key={done ? "z" : "b"} className={done ? "ts-pop" : undefined} x={bx + bw / 2 - (it.unit ? 30 : 0)} y={by + 118} textAnchor="middle"
          fontSize={T.display} fontWeight={700}>
          {done && <tspan fill={TS_ZERO}>0</tspan>}<tspan fill={shade(TS_DOT, 0.25)}>.</tspan><tspan fill={TS_INK_TENTH}>{String(it.shade)}</tspan>
        </text>
        {it.unit && <text x={bx + bw / 2 + (done ? 56 : 40)} y={by + 118} fontSize={T.label} fontWeight={700} fill={TS_LINE}>{tx(it.unit)}</text>}
      </g>
    );
  };

  /* the correction and the win, drawn on a layer that never takes a tap */
  const layer = () => {
    const S = G.strip;
    const items: any[] = [];
    if (counted.length) {
      items.push(
        <g key={"cnt" + countRun}>
          {counted.map((i, j) => {
            const c = cuts[i]; const cx = S.x + c.a + c.w / 2, cy = S.y + S.h / 2;
            return (
              <g key={i} className="ts-pop" style={{ animationDelay: j * 240 + "ms" } as any}>
                <circle cx={cx} cy={cy} r={26} fill="#FFFFFF" stroke={TS_LINE} strokeWidth={2.5} />
                <text x={cx} y={cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TS_LINE}>{j + 1}</text>
              </g>
            );
          })}
        </g>
      );
    }
    /* the whole is ten equal pieces: a brace under the strip (the fraction's bottom number) */
    if (k === "fraction" && (fix2 || won)) {
      const y = S.y + S.h + 6;
      items.push(
        <g key="brace" className="ts-fade">
          <path d={`M ${S.x + 4} ${y} V ${y + 12} H ${S.x + S.w - 4} V ${y}`} fill="none" stroke={TS_LINE} strokeWidth={3} strokeLinejoin="round" />
          <rect x={S.x + S.w / 2 - 130} y={y + 2} width={260} height={30} fill="#FFFFFF" />
          <text x={S.x + S.w / 2} y={y + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TS_LINE}>{tx("10 equal pieces")}</text>
        </g>
      );
    }
    /* the digit slid along (five tenths written as five hundredths): the same whole cut into a hundred */
    if (k === "typed" && fixOn && /^0?\|0\d$/.test(s.fix.forTyped)) {
      const y = S.y + S.h + 8, h = 32, d = Number(s.fix.forTyped.slice(-1));
      items.push(
        <g key="hund" className="ts-fade">
          {tex && <defs><clipPath id="ts-hund"><rect x={S.x} y={y} width={S.w} height={h} rx={8} /></clipPath></defs>}
          <rect x={S.x} y={y} width={S.w} height={h} rx={8} fill={TS_SHEET} stroke={TS_LINE} strokeWidth={2} />
          {tex && <Skin name={sk} x={S.x} y={y} w={S.w} h={h} clip="url(#ts-hund)" />}
          {tex && <rect x={S.x} y={y} width={S.w} height={h} rx={8} fill="none" stroke={TS_LINE} strokeWidth={2} />}
          {Array.from({ length: d }).map((_, j) => (
            <rect key={"r" + j} x={S.x + (j * S.w) / 100} y={y} width={S.w / 100} height={h} fill={TS_ROSE} />
          ))}
          {Array.from({ length: 99 }).map((_, j) => (
            <line key={"l" + j} x1={S.x + ((j + 1) * S.w) / 100} y1={y} x2={S.x + ((j + 1) * S.w) / 100} y2={y + h}
              stroke={TS_LINE} strokeWidth={(j + 1) % 10 === 0 ? 2.5 : 0.8} />
          ))}
        </g>
      );
    }
    /* the part left plain and the part coloured, each written with a point under its own run: together one whole */
    if (k === "decimal" && it.read === "plain" && (fix2 || won)) {
      const y = S.y + S.h + 6, sh = it.shade || 0, mid = cuts[sh - 1].a + cuts[sh - 1].w;
      const runs = [[0, mid, tsDec(sh).join(".")], [mid, S.w, tsDec(TS_PIECES - sh).join(".")]];
      items.push(
        <g key="runs" className="ts-fade">
          {runs.map((r: any, j) => (
            <g key={j}>
              <path d={`M ${S.x + r[0] + 6} ${y} V ${y + 8} H ${S.x + r[1] - 6} V ${y}`} fill="none" stroke={TS_LINE} strokeWidth={3} strokeLinejoin="round" />
              <text x={S.x + (r[0] + r[1]) / 2} y={y + 34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TS_LINE}>{r[2]}</text>
            </g>
          ))}
        </g>
      );
    }
    /* folded by eye: an evenly cut strip stood up beside it, all level */
    if (k === "uneven" && (fix2 || won)) {
      const base = 508, bw = 40, len = G.L / TS_PIECES, span = Math.min(640, G.L - 360);
      items.push(
        <g key="even" className="ts-fade">
          <text x={S.x} y={base - len - 18} fontSize={T.micro} fontWeight={700} fill={TS_LINE}>{tx("equal: tenths")}</text>
          <line x1={S.x} y1={base} x2={S.x + span} y2={base} stroke={TS_LINE} strokeWidth={4} strokeLinecap="round" />
          {Array.from({ length: TS_PIECES }).map((_, j) => {
            const x = S.x + 10 + (j * (span - 20 - bw)) / 9;
            return (
              <g key={j}>
                {tex && <defs><clipPath id={"ts-ev" + j}><rect x={x} y={base} width={len} height={bw} rx={6} /></clipPath></defs>}
                <rect x={x} y={base - len} width={bw} height={len} rx={6} fill={TS_SHEET} />
                {choc && <Skin name="piece" x={x} y={base - len} w={bw} h={len} fit="stretch" />}
                {tex && skinUp(x, base, len, bw, "ts-ev" + j)}
                <rect x={x} y={base - len} width={bw} height={len} rx={6} fill="none" stroke={TS_LINE} strokeWidth={2.5} />
              </g>
            );
          })}
          <text x={G.name.x + G.name.w + 24} y={50} fontSize={T.micro} fontWeight={700} fill={TS_LINE}>{tx("not equal: not tenths")}</text>
        </g>
      );
    }
    /* a share of a whole nobody named: two wholes, two different amounts of rupees */
    if (k === "share" && (fix2 || won)) {
      const R = G.right, mw = 160, cw = mw / TS_PIECES;
      const rows = [["₹100", "₹20"], ["₹50", "₹10"]];
      items.push(
        <g key="share" className="ts-fade">
          <text x={R.x + 6} y={R.y + 30} fontSize={T.micro} fontWeight={700} fill={TS_LINE}>{tx("same two tenths,")}</text>
          <text x={R.x + 6} y={R.y + 64} fontSize={T.micro} fontWeight={700} fill={TS_LINE}>{tx("different rupees")}</text>
          {rows.map((r, j) => {
            const y = R.y + 96 + j * 72;
            return (
              <g key={j}>
                <text x={R.x + 6} y={y + 32} fontSize={T.micro} fontWeight={700} fill={TS_LINE}>{r[0]}</text>
                {Array.from({ length: TS_PIECES }).map((_, i) => (
                  <rect key={i} x={R.x + 96 + i * cw} y={y} width={cw} height={44} fill={i < 2 ? TS_AMBER : TS_SHEET} stroke={TS_LINE} strokeWidth={1.5} />
                ))}
                <text x={R.x + 96 + mw + 14} y={y + 32} fontSize={T.micro} fontWeight={700} fill={TS_LINE}>{r[1]}</text>
              </g>
            );
          })}
        </g>
      );
    }
    return <g pointerEvents="none">{items}</g>;
  };

  /* the card's own tap targets: the asked card opens the keypad; its boxes take the caret */
  const cardControls = () => {
    const out: any[] = [];
    const busy = fixOn && s.fix.st < 2;
    if (stage === "ask" && answerOn === "card" && !busy && (k === "fraction" || k === "decimal" || k === "typed")) {
      const c = k === "fraction" ? G.frac : G.dec;
      if (!box.open) {
        out.push(<SlotPartBox key="open" id="answer-open" label={tx(k === "fraction" ? "Fraction" : "Decimal")} x={c.x} y={c.y} w={c.w} h={c.h}
          on={false} enabled={true} onPick={() => api.openAnswer()} />);
        out.push(<BlinkRing key="ring" x={c.x} y={c.y} w={c.w} h={c.h} rx={18} C={C} />);
      } else if (k === "fraction") {
        out.push(<SlotPartBox key="p1" id="part-1" label={tx("numerator")} x={c.x} y={c.y + 40} w={c.w} h={89} on={part === 0} enabled={true} onPick={() => api.pickPart(0)} />);
        out.push(<SlotPartBox key="p2" id="part-2" label={tx("denominator")} x={c.x} y={c.y + 129} w={c.w} h={93} on={part === 1} enabled={true} onPick={() => api.pickPart(1)} />);
      } else {
        /* the two finger boxes split at the point */
        const px = decBoxes().px;
        out.push(<SlotPartBox key="p1" id="part-1" label={tx("ones")} x={c.x} y={c.y + 56} w={px - c.x} h={160} on={part === 0} enabled={true} onPick={() => api.pickPart(0)} />);
        out.push(<SlotPartBox key="p2" id="part-2" label={tx("tenths")} x={px} y={c.y + 56} w={c.x + c.w - px} h={160} on={part === 1} enabled={true} onPick={() => api.pickPart(1)} />);
      }
    }
    /* the guide steps' own controls on the cards and the tray */
    if (isDemo && n === 3) out.push(<Hit key="write" id="write" x={G.dec.x} y={G.dec.y} w={G.dec.w} h={G.dec.h} label={tx("Decimal")} onPress={() => act("write")} />);
    if (isDemo && n === 4) {
      const { wb } = decBoxes();
      out.push(<Hit key="ones" id="ones" x={wb.x - 16} y={wb.y - 16} w={wb.w + 32} h={wb.h + 32} label={tx("ones")} onPress={() => act("ones")} />);
      if (!s.zero) out.push(<Hit key="zero" id="zero" x={G.right.x + 40} y={G.right.y + 50} w={110} h={110} label={tx("zero")} onPress={() => act("zero")} />);
    }
    return out;
  };

  /* the one invite, on the control the step waits for */
  /* the one invite: the runtime's pulse (c4-pulse) as a rounded rectangle 10 units outside the thing to touch, so it
     never cuts through a key's word, the question bar, a heading or the point */
  const invite = () => {
    if (!isDemo || !stepOn) return null;
    let at: any = null;
    if (stepOn === "name") { const c = G.chip(0); at = { x: c.x, y: c.y, w: c.w, h: c.h - 4 }; }
    if (stepOn === "cut" || stepOn === "measure" || stepOn === "count") at = actionKeys().find((b) => b.id === stepOn) || null;
    if (stepOn === "shade") { const i = Math.max(0, s.shaded.indexOf(false)); const c = cuts[i]; at = { x: G.strip.x + c.a, y: G.strip.y, w: c.w, h: G.strip.h }; }
    if (stepOn === "write") at = G.dec;
    if (stepOn === "ones") at = decBoxes().wb;
    if (stepOn === "zero") at = { x: G.right.x + 40, y: G.right.y + 50, w: 110, h: 110 };
    if (!at) return null;
    const ink = (THEME && THEME.enter && THEME.enter[1]) || C.accent;
    return <rect className="c4-pulse" x={at.x - 10} y={at.y - 10} width={at.w + 20} height={at.h + 20} rx={RAD.key + 10}
      fill="none" stroke={ink} strokeWidth={5} pointerEvents="none" />;
  };

  return (
    <g>
      <style>{TS_CSS}</style>
      {nameRow()}
      {stripView()}
      {standView()}
      {cardsView()}
      {rightView()}
      {layer()}
      {cardControls()}
      {invite()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   a strip of ten with the run coloured, and the answer as the child gave it */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  /* the runtime keeps the question's INDEX in its phase (last.item) and the answer as given (an array for a card) */
  const ph: any = PHASES[(n || 1) - 1] || { items: [] };
  const it: any = typeof last.item === "number" ? ph.items[last.item] || {} : last.item || {};
  const ps = slotPartsOf(last.value, 2);
  const sh0 = it.shade || 0;
  const frac = it.form === "fraction";
  /* the strip: across the top with the answer under it, or at the left beside a stacked fraction */
  /* hi / gu: the strip a little higher and the label lower, so the matras clear the bracket above them */
  const dev = lang === "hi" || lang === "gu";
  /* with the answer written under it, the strip is only as thick as leaves its bracket (3 to 8 under it) clear of the
     answer's digits (about 22 tall over their baseline at h - 12, h - 9 in hi / gu): the summary rows of r27 are short */
  const top = dev ? 5 : 6;
  const sh = frac ? (dev ? 22 : 24) : Math.max(10, Math.min(dev ? 22 : 24, h - (dev ? 9 : 12) - 22 - 11 - top));
  const sx = 12, sw = frac ? 140 : w - 24, sy = frac ? (h - sh) / 2 - 6 : top;
  const ws = it.form === "uneven" ? TS_UNEVEN.map((u) => (u * sw) / 1080) : Array.from({ length: TS_PIECES }, () => sw / TS_PIECES);
  const xs = ws.map((_: number, i: number) => sx + ws.slice(0, i).reduce((a: number, b: number) => a + b, 0));
  /* the run the answer counts: the coloured pieces, or the plain ones when the question asked for those */
  const run = it.form === "uneven" ? null : it.read === "plain" ? [sh0, TS_PIECES] : [0, sh0];
  const label = frac ? null
    : it.choices ? tx(((it.choices || []).find((c: any) => c.id === String(last.value)) || { label: String(last.value) }).label)
    : ps[0] + "." + ps[1] + (it.unit ? " " + tx(it.unit) : "");
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {ws.map((cw: number, i: number) => (
        <rect key={i} x={xs[i]} y={sy} width={cw} height={sh} fill={i < sh0 ? TS_AMBER : TS_SHEET} stroke={TS_LINE} strokeWidth={1.2} />
      ))}
      {run && run[1] > run[0] && (
        <path d={`M ${xs[run[0]] + 2} ${sy + sh + 3} V ${sy + sh + 8} H ${xs[run[1] - 1] + ws[run[1] - 1] - 2} V ${sy + sh + 3}`}
          fill="none" stroke={TS_LINE} strokeWidth={2.5} strokeLinejoin="round" />
      )}
      {label !== null ? (
        <text x={w / 2} y={h - (dev ? 9 : 12)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TS_LINE}>{label}</text>
      ) : (
        <g>
          <text x={sx + sw + 42} y={h / 2 - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TS_LINE}>{ps[0]}</text>
          <line x1={sx + sw + 18} y1={h / 2 + 1} x2={sx + sw + 66} y2={h / 2 + 1} stroke={TS_LINE} strokeWidth={2.5} />
          <text x={sx + sw + 42} y={h / 2 + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TS_LINE}>{ps[1]}</text>
        </g>
      )}
    </g>
  );
}

function TenthStrip(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the question and an Answer key on a bar across the top, the working area the
         whole card until the child taps Answer, the answer box and keypad in a panel that slides in from the right */
      board: true,
      /* answering on the card (PATTERNS 9e): a fraction on the Fraction card, a decimal of phases 1-3 on the Decimal card */
      cardAnswer: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      keyOnly: true,
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      }} />
  );
}

export default TenthStrip;
