/* ═══ M1.S2.T5.C20.2D1 · fraction_converter · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. THE NEW LOOK (keyOnly, navDots; docs/LAYOUT.md §1d-§1e,
   docs/PATTERNS.md §15-§16): no question bar, the question lives only in the bubble (one sentence), every
   act is performed on screen (api.act), one key at the bottom centre for each sequence of acts.
   NO imports in this file; only the five host hooks. Edit, never rewrite. Concepts are verbatim. */

const TOOL_ID = "fraction_converter";
const MEDIA_ID = "M1.S2.T5.C20.2D1";
const TOOL_NAME = "Fraction Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A fraction, and a row of digit cards waiting for a point."];
/* kept for the tool object's shape; not shown from r44 */
const FINISH_LINE = "The zeros told you where the point goes, every time.";
/* printed when the child opens Free play: every control it names is in the stage === "free" branch */
const FREE_LINE = "Free play: tap a card and type your own fraction or decimal.";

/* THE START PAGE (docs/LAYOUT.md §1c): one question to wonder at, and the object the lesson is about */
const START_HOOK = "Where does the point go when a fraction becomes a decimal?";
function StartArt({ box, C, lang, tx }: any) {
  const blue = shade(CONTENT.hundred, 0.25), amber = CONTENT.ten;
  const cx = 300, top = 30;
  return (
    <g>
      <rect x={cx - 130} y={top} width={260} height={280} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} filter="url(#fShadowSoft)" />
      <text x={cx} y={top + 112} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={blue}>43</text>
      <line x1={cx - 80} y1={top + 146} x2={cx + 80} y2={top + 146} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <text x={cx} y={top + 236} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>100</text>
      <path d={`M 500 170 L 640 170`} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <path d={`M 622 152 L 644 170 L 622 188`} fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      {["4", "3"].map((d, i) => (
        <g key={i}>
          <rect x={760 + i * 130} y={100} width={116} height={146} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} filter="url(#fShadowSoft)" />
          <text x={818 + i * 130} y={200} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={blue}>{d}</text>
        </g>
      ))}
      <circle cx={746} cy={58} r={14} fill={C.ink} />
      <path d="M 746 80 L 746 108" stroke={amber} strokeWidth={5} strokeLinecap="round" strokeDasharray="6 8" />
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled at the language pass, keyed by the English byte for byte. */
/* Terms, one per idea: decimal दशमलव / દશાંશ (a decimal number દશાંશ સંખ્યા), the point बिंदु / બિંદુ, fraction भिन्न /
   અપૂર્ણાંક, numerator अंश / અંશ, denominator हर / છેદ, terms पद / પદ, hundredths शतांश / શતાંશ, tenths दशांश / દશાંશ,
   common factors सार्व गुणनखंड / સામાન્ય અવયવ, HCF महत्तम समापवर्तक / ગુરુતમ સામાન્ય અવયવ (in a bubble line always in full: the
   runtime ends a sentence at the dots of म.स.प. / ગુ.સા.અ., which only the drawn label and the summary row use), lowest terms सरलतम रूप / અતિસંક્ષિપ્ત રૂપ, the ones place
   इकाई का स्थान / એકમનું સ્થાન, remainder शेष / શેષ. "each" is प्रत्येक in Hindi, never हर (the denominator). */
const TR: any = {
  hi: {
    "Fraction Converter": "भिन्न परिवर्तक",
    "Free play: tap a card and type your own fraction or decimal.": "खुला खेल: कार्ड दबाओ और अपनी भिन्न या दशमलव संख्या लिखो।",
    "Count needs a bottom number of 10, 100 or 1,000.": "गिनो के लिए हर 10, 100 या 1,000 होना चाहिए।",
    "Where does the point go when a fraction becomes a decimal?": "भिन्न को दशमलव में बदलें तो बिंदु कहाँ आता है?",
    "A fraction, and a row of digit cards waiting for a point.": "एक भिन्न, और बिंदु का इंतज़ार करते अंक कार्ड।",
    "The zeros told you where the point goes, every time.": "शून्यों ने हर बार बताया कि बिंदु कहाँ जाता है।",
    /* phase 1 */
    "Counting the zeros": "शून्य गिनना",
    "Count the zeros at the bottom. That many digits go after the point.": "हर के शून्य गिनो। उतने अंक बिंदु के बाद जाते हैं।",
    "Tap Count to count the zeros at the bottom and as many digits on top.": "हर के शून्य और अंश के उतने ही अंक गिनने के लिए गिनो दबाओ।",
    "Tap the Count key under the cards.": "कार्डों के नीचे गिनो वाली कुंजी दबाओ।",
    "Now tap Point to put the point before the lit digits.": "अब बिंदु दबाओ और चमकते अंकों से पहले बिंदु लगाओ।",
    "The key under the cards now says Point.": "कार्डों के नीचे की कुंजी पर अब बिंदु लिखा है।",
    "Count that many digits from the right of the top number.": "अंश में दाईं ओर से उतने अंक गिनो।",
    "The point goes just before those digits, and 0 goes in front of it.": "बिंदु उन अंकों के ठीक पहले आता है, और उसके आगे 0 आता है।",
    "The zeros at the bottom say how many digits come after the point.": "हर के शून्य बताते हैं कि बिंदु के बाद कितने अंक आते हैं।",
    "You learned: the zeros say how many digits come after the point": "तुमने सीखा: शून्य बताते हैं कि बिंदु के बाद कितने अंक आते हैं",
    "Write the fraction on the card as a decimal.": "कार्ड की भिन्न को दशमलव में लिखो।",
    "As a decimal?": "दशमलव में?",
    "100 has two zeros, so how many digits go after the point?": "100 में दो शून्य हैं, तो बिंदु के बाद कितने अंक जाएँगे?",
    "Do the same for this card.": "इस कार्ड के लिए भी ऐसा ही करो।",
    "Count the zeros of 100 before you place the point.": "बिंदु लगाने से पहले 100 के शून्य गिनो।",
    "Count first, then write this card as a decimal.": "पहले गिनो, फिर इस कार्ड को दशमलव में लिखो।",
    "This time count the zeros of 1,000, not of 100.": "इस बार 100 के नहीं, 1,000 के शून्य गिनो।",
    /* phase 2 */
    "Zeros in front": "आगे शून्य",
    "Three places are needed, but there is only one digit. What fills the gap?": "तीन स्थान चाहिए, पर अंक एक ही है। खाली जगह कौन भरता है?",
    "Tap Count to see what fills the empty places.": "खाली स्थान कौन भरता है, यह देखने के लिए गिनो दबाओ।",
    "Tap Count, the key under the cards.": "गिनो दबाओ, जो कार्डों के नीचे है।",
    "Now tap Point to put the point before the three cards.": "अब बिंदु दबाओ और तीनों कार्डों से पहले बिंदु लगाओ।",
    "Point is the key under the cards now.": "अब कार्डों के नीचे की कुंजी बिंदु है।",
    "Count the digits on top, and give each empty place a zero.": "अंश के अंक गिनो, और प्रत्येक खाली स्थान में शून्य रखो।",
    "The zeros go between the point and the digits, never at the end.": "शून्य बिंदु और अंकों के बीच आते हैं, अंत में कभी नहीं।",
    "A short top number gets zeros in front, and 0 in the ones place.": "छोटे अंश के आगे शून्य आते हैं, और इकाई के स्थान पर 0 आता है।",
    "You learned: zeros fill the gap, and 0 goes in the ones place": "तुमने सीखा: शून्य खाली जगह भरते हैं, और इकाई के स्थान पर 0 आता है",
    "Write the number on the card as a decimal.": "कार्ड की संख्या को दशमलव में लिखो।",
    "The 7 fills one place, so what goes in the other two?": "7 एक स्थान भरता है, तो बाकी दो में क्या आएगा?",
    "Now this card: write its fraction as a decimal.": "अब यह कार्ड: इसकी भिन्न को दशमलव में लिखो।",
    "Two places but one digit: what fills the gap?": "दो स्थान पर अंक एक: खाली जगह कौन भरेगा?",
    "Mind the gap, then write this card as a decimal.": "खाली जगह का ध्यान रखो, फिर इस कार्ड को दशमलव में लिखो।",
    "41 fills two of the three places, so which place is empty?": "41 तीन में से दो स्थान भरता है, तो कौन-सा स्थान खाली है?",
    /* phase 3 */
    "Make the denominator 10, 100 or 1000": "हर को 10, 100 या 1000 बनाओ",
    "The count only works on ten, a hundred or a thousand. Can you reach one?": "गिनती सिर्फ़ दस, सौ या हज़ार पर चलती है। क्या तुम वहाँ पहुँच सकते हो?",
    "Tap or drag the Times both slider until the bottom is 100.": "दोनों का गुणा स्लाइडर दबाओ या खींचो, जब तक हर 100 न हो जाए।",
    "The handle sits on the line under the cards.": "हैंडल कार्डों के नीचे की रेखा पर है।",
    "Now tap Count to count the zeros and the digits.": "अब शून्य और अंक गिनने के लिए गिनो दबाओ।",
    "Count works now that the bottom is 100.": "अब हर 100 है, इसलिए गिनो काम करता है।",
    "Tap Point to put the point before the lit digits.": "चमकते अंकों से पहले बिंदु लगाने के लिए बिंदु दबाओ।",
    "Try 100: which number times the bottom makes 100?": "100 आज़माओ: हर को किस संख्या से गुणा करें कि 100 बने?",
    "Think of one fifth: times 2 it is two tenths, which is 0.2.": "एक बटा पाँच सोचो: 2 से गुणा करने पर दो दशांश, यानी 0.2 बनता है।",
    "Multiply both terms to get 10, 100 or 1,000, but some fractions never do.": "दोनों पद गुणा कर हर 10, 100 या 1,000 बनाओ, पर कुछ भिन्नों में नहीं बनता।",
    "You learned: multiply both terms to reach 10, 100 or 1,000, if you can": "तुमने सीखा: दोनों पदों को गुणा करके 10, 100 या 1,000 तक पहुँचो",
    "Write the card's fraction as a decimal.": "कार्ड वाली भिन्न को दशमलव में लिखो।",
    "20 is not 10, 100 or 1,000, so slide to multiply both terms.": "20 तो 10, 100 या 1,000 नहीं है, इसलिए स्लाइडर से दोनों पद गुणा करो।",
    "Find the decimal for this new card.": "इस नए कार्ड का दशमलव ढूँढो।",
    "Multiply the top by the same number as the bottom.": "अंश को भी उसी संख्या से गुणा करो जिससे हर को किया।",
    "Can one sixth be written with a denominator of 10, 100 or 1,000?": "क्या एक बटा छह को हर 10, 100 या 1,000 के साथ लिख सकते हैं?",
    "Reach 10, 100 or 1,000?": "10, 100 या 1,000 तक?",
    "Slide all the way along: does the bottom ever land on 10, 100 or 1,000?": "पूरा खिसकाओ: क्या हर कभी 10, 100 या 1,000 बनता है?",
    "Which number times 6 gives 10, 100 or 1,000?": "6 को किस संख्या से गुणा करें कि 10, 100 या 1,000 बने?",
    "Share 10, 100 and 1,000 by 6: does any of them leave nothing over?": "10, 100 और 1,000 को 6 से भाग दो: क्या किसी में शेष शून्य बचता है?",
    "Yes": "हाँ",
    "No": "नहीं",
    /* phase 4 */
    "Decimals back to fractions": "दशमलव से वापस भिन्न",
    "Count the digits after the point. Then find the biggest factor both terms share.": "बिंदु के बाद के अंक गिनो। फिर दोनों पदों का सबसे बड़ा सार्व गुणनखंड ढूँढो।",
    "Tap To fraction: digits over a 1 with a zero for each digit after the point.": "भिन्न बनाओ दबाओ: अंक 1 के ऊपर, बिंदु के बाद प्रत्येक अंक पर एक शून्य।",
    "Tap the To fraction key under the cards.": "कार्डों के नीचे भिन्न बनाओ कुंजी दबाओ।",
    "Now tap Factors to find the factors that 275 and 100 share.": "अब 275 और 100 के सार्व गुणनखंड ढूँढने के लिए गुणनखंड दबाओ।",
    "The key under the cards now says Factors.": "कार्डों के नीचे की कुंजी पर अब गुणनखंड लिखा है।",
    "Tap Divide to divide both terms by the lit factor, the HCF.": "भाग दो दबाओ: दोनों पदों को चमकते महत्तम समापवर्तक से भाग दो।",
    "Divide is the key under the cards now.": "अब कार्डों के नीचे की कुंजी भाग दो है।",
    "Find the biggest number that goes into both terms.": "वह सबसे बड़ी संख्या ढूँढो जो दोनों पदों को पूरा बाँटे।",
    "Tap Factors, then divide the top and the bottom by the biggest one.": "गुणनखंड दबाओ, फिर अंश और हर को सबसे बड़े से भाग दो।",
    "Put the digits over 10, 100 or 1,000, then divide by the HCF.": "अंकों को 10, 100 या 1,000 के ऊपर रखो, फिर महत्तम समापवर्तक से भाग दो।",
    "You learned: digits over 10, 100 or 1,000, then divide by the HCF": "तुमने सीखा: अंक 10, 100 या 1,000 के ऊपर, फिर म.स.प. से भाग",
    "Write 4.35 as a fraction in lowest terms.": "4.35 को सरलतम रूप की भिन्न में लिखो।",
    "In lowest terms?": "सरलतम रूप में?",
    "4.35 is 435 hundredths, so divide both terms by their HCF.": "4.35 यानी 435 शतांश, तो दोनों पदों को महत्तम समापवर्तक से भाग दो।",
    "Now turn 0.8 into a fraction in lowest terms.": "अब 0.8 को सरलतम भिन्न में बदलो।",
    "One digit after the point means 10 at the bottom: what do 8 and 10 share?": "बिंदु के बाद एक अंक, यानी हर 10: 8 और 10 का सार्व गुणनखंड क्या है?",
    "Watch the zero after the point, and give 12.05 as a fraction in lowest terms.": "बिंदु के बाद के शून्य पर ध्यान दो, और 12.05 को सरलतम भिन्न में लिखो।",
    "1205 hundredths is equal, but is it as small as it gets?": "1205 शतांश बराबर है, पर क्या यह सबसे सरल रूप है?",
    /* win lines (api.say literals in Work) */
    "Yes, two zeros, two digits.": "हाँ, दो शून्य, दो अंक।",
    "Right, two digits after the point.": "सही, बिंदु के बाद दो अंक।",
    "Yes, three zeros, three digits.": "हाँ, तीन शून्य, तीन अंक।",
    "Yes, two zeros fill the gap.": "हाँ, दो शून्य खाली जगह भरते हैं।",
    "Right, a zero in front of the 6.": "सही, 6 के आगे एक शून्य।",
    "Yes, one zero fills the gap.": "हाँ, एक शून्य खाली जगह भरता है।",
    "Yes, times 5 made it 100.": "हाँ, 5 से गुणा करके 100 बना।",
    "Right, times 4 took 25 to 100.": "सही, 4 से गुणा करके 25 से 100 बना।",
    "Right, 6 does not go exactly into 10, 100 or 1,000.": "सही, 10, 100 या 1,000 में 6 से पूरा भाग नहीं जाता।",
    "Yes, 435 and 100 share 5.": "हाँ, 435 और 100 दोनों 5 से बँटते हैं।",
    "Right, 8 and 10 share 2.": "सही, 8 और 10 दोनों 2 से बँटते हैं।",
    "Yes, 1205 and 100 share 5.": "हाँ, 1205 और 100 दोनों 5 से बँटते हैं।",
    /* drawn words, key labels (built from FC_KEY), counter words and aria-labels (tx in Work) */
    "zero": "शून्य",
    "zeros": "शून्य",
    "Times both": "दोनों का गुणा",
    "Times both slider": "दोनों का गुणा स्लाइडर",
    "Common factors": "सार्व गुणनखंड",
    "HCF": "म.स.प.",
    "leaves": "शेष",
    "Count": "गिनो",
    "Point": "बिंदु",
    "To fraction": "भिन्न बनाओ",
    "Factors": "गुणनखंड",
    "Divide": "भाग दो",
    "Turn": "पलटो",
    "Fraction card": "भिन्न कार्ड",
    "numerator": "अंश",
    "denominator": "हर",
    "type a numerator": "अंश लिखो",
    "type a denominator": "हर लिखो",
    "type a decimal": "दशमलव संख्या लिखो",
  },
  gu: {
    "Fraction Converter": "અપૂર્ણાંક રૂપાંતરક",
    "Free play: tap a card and type your own fraction or decimal.": "મુક્ત રમત: કાર્ડ દબાવો અને તમારો અપૂર્ણાંક કે દશાંશ સંખ્યા લખો.",
    "Count needs a bottom number of 10, 100 or 1,000.": "ગણો માટે છેદ 10, 100 કે 1,000 હોવો જોઈએ.",
    "Where does the point go when a fraction becomes a decimal?": "અપૂર્ણાંકને દશાંશમાં ફેરવીએ ત્યારે બિંદુ ક્યાં આવે?",
    "A fraction, and a row of digit cards waiting for a point.": "એક અપૂર્ણાંક, અને બિંદુની રાહ જોતાં અંક કાર્ડ.",
    "The zeros told you where the point goes, every time.": "શૂન્યોએ દર વખતે કહ્યું કે બિંદુ ક્યાં જાય.",
    /* phase 1 */
    "Counting the zeros": "શૂન્ય ગણવા",
    "Count the zeros at the bottom. That many digits go after the point.": "છેદના શૂન્ય ગણો. એટલા અંક બિંદુ પછી જાય.",
    "Tap Count to count the zeros at the bottom and as many digits on top.": "છેદના શૂન્ય અને અંશના એટલા જ અંક ગણવા ગણો દબાવો.",
    "Tap the Count key under the cards.": "કાર્ડ નીચેની ગણો કી દબાવો.",
    "Now tap Point to put the point before the lit digits.": "હવે બિંદુ દબાવો અને ચમકતા અંક પહેલાં બિંદુ મૂકો.",
    "The key under the cards now says Point.": "કાર્ડ નીચેની કી પર હવે બિંદુ લખ્યું છે.",
    "Count that many digits from the right of the top number.": "અંશમાં જમણી બાજુથી એટલા અંક ગણો.",
    "The point goes just before those digits, and 0 goes in front of it.": "બિંદુ એ અંકોની બરાબર પહેલાં આવે, અને તેની આગળ 0 આવે.",
    "The zeros at the bottom say how many digits come after the point.": "છેદના શૂન્ય કહે છે કે બિંદુ પછી કેટલા અંક આવે.",
    "You learned: the zeros say how many digits come after the point": "તમે શીખ્યા: શૂન્ય કહે છે કે બિંદુ પછી કેટલા અંક આવે",
    "Write the fraction on the card as a decimal.": "કાર્ડ પરના અપૂર્ણાંકને દશાંશમાં લખો.",
    "As a decimal?": "દશાંશમાં?",
    "100 has two zeros, so how many digits go after the point?": "100માં બે શૂન્ય છે, તો બિંદુ પછી કેટલા અંક જાય?",
    "Do the same for this card.": "આ કાર્ડ માટે પણ એમ જ કરો.",
    "Count the zeros of 100 before you place the point.": "બિંદુ મૂકતાં પહેલાં 100ના શૂન્ય ગણો.",
    "Count first, then write this card as a decimal.": "પહેલાં ગણો, પછી આ કાર્ડને દશાંશમાં લખો.",
    "This time count the zeros of 1,000, not of 100.": "આ વખતે 100ના નહીં, 1,000ના શૂન્ય ગણો.",
    /* phase 2 */
    "Zeros in front": "આગળ શૂન્ય",
    "Three places are needed, but there is only one digit. What fills the gap?": "ત્રણ સ્થાન જોઈએ, પણ અંક એક જ છે. ખાલી જગ્યા કોણ ભરે?",
    "Tap Count to see what fills the empty places.": "ખાલી સ્થાન કોણ ભરે તે જોવા ગણો દબાવો.",
    "Tap Count, the key under the cards.": "ગણો દબાવો, જે કાર્ડ નીચે છે.",
    "Now tap Point to put the point before the three cards.": "હવે બિંદુ દબાવો અને ત્રણ કાર્ડ પહેલાં બિંદુ મૂકો.",
    "Point is the key under the cards now.": "હવે કાર્ડ નીચેની કી બિંદુ છે.",
    "Count the digits on top, and give each empty place a zero.": "અંશના અંક ગણો, અને દરેક ખાલી સ્થાનમાં શૂન્ય મૂકો.",
    "The zeros go between the point and the digits, never at the end.": "શૂન્ય બિંદુ અને અંકની વચ્ચે આવે, છેડે ક્યારેય નહીં.",
    "A short top number gets zeros in front, and 0 in the ones place.": "નાના અંશની આગળ શૂન્ય આવે, અને એકમના સ્થાને 0 આવે.",
    "You learned: zeros fill the gap, and 0 goes in the ones place": "તમે શીખ્યા: શૂન્ય ખાલી જગ્યા ભરે, અને એકમના સ્થાને 0 આવે",
    "Write the number on the card as a decimal.": "કાર્ડ પરની સંખ્યાને દશાંશમાં લખો.",
    "The 7 fills one place, so what goes in the other two?": "7 એક સ્થાન ભરે છે, તો બાકીના બેમાં શું આવે?",
    "Now this card: write its fraction as a decimal.": "હવે આ કાર્ડ: તેના અપૂર્ણાંકને દશાંશમાં લખો.",
    "Two places but one digit: what fills the gap?": "બે સ્થાન પણ અંક એક: ખાલી જગ્યા કોણ ભરે?",
    "Mind the gap, then write this card as a decimal.": "ખાલી જગ્યાનું ધ્યાન રાખો, પછી આ કાર્ડને દશાંશમાં લખો.",
    "41 fills two of the three places, so which place is empty?": "41 ત્રણમાંથી બે સ્થાન ભરે છે, તો કયું સ્થાન ખાલી છે?",
    /* phase 3 */
    "Make the denominator 10, 100 or 1000": "છેદને 10, 100 કે 1000 બનાવો",
    "The count only works on ten, a hundred or a thousand. Can you reach one?": "ગણતરી ફક્ત દસ, સો કે હજાર પર ચાલે. શું તમે ત્યાં પહોંચી શકો?",
    "Tap or drag the Times both slider until the bottom is 100.": "છેદ 100 થાય ત્યાં સુધી બંનેનો ગુણાકાર સ્લાઇડર દબાવો કે ખેંચો.",
    "The handle sits on the line under the cards.": "હેન્ડલ કાર્ડ નીચેની રેખા પર છે.",
    "Now tap Count to count the zeros and the digits.": "હવે શૂન્ય અને અંક ગણવા ગણો દબાવો.",
    "Count works now that the bottom is 100.": "હવે છેદ 100 છે, તેથી ગણો કામ કરે.",
    "Tap Point to put the point before the lit digits.": "ચમકતા અંક પહેલાં બિંદુ મૂકવા બિંદુ દબાવો.",
    "Try 100: which number times the bottom makes 100?": "100 અજમાવો: છેદને કઈ સંખ્યાથી ગુણીએ તો 100 થાય?",
    "Think of one fifth: times 2 it is two tenths, which is 0.2.": "એક પંચમાંશ વિચારો: 2 વડે ગુણતાં બે દશાંશ, એટલે 0.2 થાય.",
    "Multiply both terms to get 10, 100 or 1,000, but some fractions never do.": "બંને પદ ગુણી છેદ 10, 100 કે 1,000 બનાવો, પણ કેટલાકમાં નથી બનતો.",
    "You learned: multiply both terms to reach 10, 100 or 1,000, if you can": "તમે શીખ્યા: બંને પદને ગુણીને 10, 100 કે 1,000 સુધી પહોંચો",
    "Write the card's fraction as a decimal.": "કાર્ડનો અપૂર્ણાંક દશાંશમાં લખો.",
    "20 is not 10, 100 or 1,000, so slide to multiply both terms.": "20 એ 10, 100 કે 1,000 નથી, તેથી સ્લાઇડરથી બંને પદ ગુણો.",
    "Find the decimal for this new card.": "આ નવા કાર્ડની દશાંશ સંખ્યા શોધો.",
    "Multiply the top by the same number as the bottom.": "અંશને પણ એ જ સંખ્યાથી ગુણો જેનાથી છેદને ગુણ્યો.",
    "Can one sixth be written with a denominator of 10, 100 or 1,000?": "શું છઠ્ઠા ભાગને છેદ 10, 100 કે 1,000 સાથે લખી શકાય?",
    "Reach 10, 100 or 1,000?": "10, 100 કે 1,000 સુધી?",
    "Slide all the way along: does the bottom ever land on 10, 100 or 1,000?": "આખું ખસેડો: શું છેદ ક્યારેય 10, 100 કે 1,000 બને છે?",
    "Which number times 6 gives 10, 100 or 1,000?": "6ને કઈ સંખ્યાથી ગુણીએ તો 10, 100 કે 1,000 થાય?",
    "Share 10, 100 and 1,000 by 6: does any of them leave nothing over?": "10, 100 અને 1,000ને 6 વડે ભાગો: શું કોઈમાં શેષ શૂન્ય રહે છે?",
    "Yes": "હા",
    "No": "ના",
    /* phase 4 */
    "Decimals back to fractions": "દશાંશથી પાછા અપૂર્ણાંક",
    "Count the digits after the point. Then find the biggest factor both terms share.": "બિંદુ પછીના અંક ગણો. પછી બંને પદનો સૌથી મોટો સામાન્ય અવયવ શોધો.",
    "Tap To fraction: digits over a 1 with a zero for each digit after the point.": "અપૂર્ણાંક બનાવો દબાવો: અંક 1 ઉપર, બિંદુ પછીના દરેક અંક માટે એક શૂન્ય.",
    "Tap the To fraction key under the cards.": "કાર્ડ નીચેની અપૂર્ણાંક બનાવો કી દબાવો.",
    "Now tap Factors to find the factors that 275 and 100 share.": "હવે 275 અને 100ના સામાન્ય અવયવ શોધવા અવયવ દબાવો.",
    "The key under the cards now says Factors.": "કાર્ડ નીચેની કી પર હવે અવયવ લખ્યું છે.",
    "Tap Divide to divide both terms by the lit factor, the HCF.": "ભાગો દબાવો: બંને પદને ચમકતા ગુરુતમ સામાન્ય અવયવ વડે ભાગો.",
    "Divide is the key under the cards now.": "હવે કાર્ડ નીચેની કી ભાગો છે.",
    "Find the biggest number that goes into both terms.": "બંને પદને પૂરા ભાગે એવી સૌથી મોટી સંખ્યા શોધો.",
    "Tap Factors, then divide the top and the bottom by the biggest one.": "અવયવ દબાવો, પછી અંશ અને છેદને સૌથી મોટાથી ભાગો.",
    "Put the digits over 10, 100 or 1,000, then divide by the HCF.": "અંકને 10, 100 કે 1,000 ઉપર મૂકો, પછી ગુરુતમ સામાન્ય અવયવ વડે ભાગો.",
    "You learned: digits over 10, 100 or 1,000, then divide by the HCF": "તમે શીખ્યા: અંક 10, 100 કે 1,000 ઉપર, પછી ગુ.સા.અ. વડે ભાગ",
    "Write 4.35 as a fraction in lowest terms.": "4.35ને અતિસંક્ષિપ્ત રૂપના અપૂર્ણાંકમાં લખો.",
    "In lowest terms?": "અતિસંક્ષિપ્ત રૂપમાં?",
    "4.35 is 435 hundredths, so divide both terms by their HCF.": "4.35 એટલે 435 શતાંશ, તો બંને પદને ગુરુતમ સામાન્ય અવયવ વડે ભાગો.",
    "Now turn 0.8 into a fraction in lowest terms.": "હવે 0.8ને અતિસંક્ષિપ્ત અપૂર્ણાંકમાં ફેરવો.",
    "One digit after the point means 10 at the bottom: what do 8 and 10 share?": "બિંદુ પછી એક અંક એટલે છેદ 10: 8 અને 10નો સામાન્ય અવયવ કયો?",
    "Watch the zero after the point, and give 12.05 as a fraction in lowest terms.": "બિંદુ પછીના શૂન્ય પર ધ્યાન આપો, અને 12.05ને અતિસંક્ષિપ્ત અપૂર્ણાંકમાં લખો.",
    "1205 hundredths is equal, but is it as small as it gets?": "1205 શતાંશ સરખું છે, પણ શું એ સૌથી સાદું રૂપ છે?",
    /* win lines (api.say literals in Work) */
    "Yes, two zeros, two digits.": "હા, બે શૂન્ય, બે અંક.",
    "Right, two digits after the point.": "સાચું, બિંદુ પછી બે અંક.",
    "Yes, three zeros, three digits.": "હા, ત્રણ શૂન્ય, ત્રણ અંક.",
    "Yes, two zeros fill the gap.": "હા, બે શૂન્ય ખાલી જગ્યા ભરે છે.",
    "Right, a zero in front of the 6.": "સાચું, 6ની આગળ એક શૂન્ય.",
    "Yes, one zero fills the gap.": "હા, એક શૂન્ય ખાલી જગ્યા ભરે છે.",
    "Yes, times 5 made it 100.": "હા, 5 વડે ગુણતાં 100 થયું.",
    "Right, times 4 took 25 to 100.": "સાચું, 4 વડે ગુણતાં 25ના 100 થયા.",
    "Right, 6 does not go exactly into 10, 100 or 1,000.": "સાચું, 10, 100 કે 1,000ને 6 પૂરા ભાગતા નથી.",
    "Yes, 435 and 100 share 5.": "હા, 435 અને 100 બંને 5 વડે ભાગી શકાય.",
    "Right, 8 and 10 share 2.": "સાચું, 8 અને 10 બંને 2 વડે ભાગી શકાય.",
    "Yes, 1205 and 100 share 5.": "હા, 1205 અને 100 બંને 5 વડે ભાગી શકાય.",
    /* drawn words, key labels (built from FC_KEY), counter words and aria-labels (tx in Work) */
    "zero": "શૂન્ય",
    "zeros": "શૂન્ય",
    "Times both": "બંનેનો ગુણાકાર",
    "Times both slider": "બંનેનો ગુણાકાર સ્લાઇડર",
    "Common factors": "સામાન્ય અવયવ",
    "HCF": "ગુ.સા.અ.",
    "leaves": "શેષ",
    "Count": "ગણો",
    "Point": "બિંદુ",
    "To fraction": "અપૂર્ણાંક બનાવો",
    "Factors": "અવયવ",
    "Divide": "ભાગો",
    "Turn": "ફેરવો",
    "Fraction card": "અપૂર્ણાંક કાર્ડ",
    "numerator": "અંશ",
    "denominator": "છેદ",
    "type a numerator": "અંશ લખો",
    "type a denominator": "છેદ લખો",
    "type a decimal": "દશાંશ સંખ્યા લખો",
  },
};

/* One entry per phase = one mount. The guide steps work the textbook's own example (`warm`, the brief's
   opening screen); the three questions then use the plan's items on a fresh picture. In a question the one
   key offers only the method's acts (Count; Back, Factors): the last act, the point or the division, is
   the child's answer. */
const PHASES = [
  {
    n: 1,
    concept: "Counting the zeros",
    conceptId: "M1.S2.T5.C20", objectiveIds: ["O7"],
    says: ["Count the zeros at the bottom. That many digits go after the point."],
    warm: { kind: "count", num: 43, den: 100 },
    steps: [
      { say: "Tap Count to count the zeros at the bottom and as many digits on top.", on: "count", hint: "Tap the Count key under the cards." },
      { say: "Now tap Point to put the point before the lit digits.", on: "point", hint: "The key under the cards now says Point." },
    ],
    stepHold: 2200,
    /* tries, as the plan writes it: First rung: count the zeros at the bottom. Second rung: count that many digits from the right. Third rung: the same task with a denominator of 10, before the longer denominators return.
       (rung 1 is each question's own miss; the plan's rung 3 is a stage direction, so the child gets the method's last step) */
    ladder: ["Count that many digits from the right of the top number.", "The point goes just before those digits, and 0 goes in front of it."],
    closing: "The zeros at the bottom say how many digits come after the point.",
    learned: "You learned: the zeros say how many digits come after the point",
    traceback: "The zeros light one by one, as many digits light from the right, the point drops before them, a 0 fills the ones place and the decimal is written green.",
    items: [
      /* learn FC1: answer in the plan = 0.67 */
      { qid: "M1.S2.T5.C20:FC1", kind: "count", num: 67, den: 100, near: "6.7",
        say: "Write the fraction on the card as a decimal.", ask: "As a decimal?", answer: "0.67",
        miss: "100 has two zeros, so how many digits go after the point?" },
      /* practice 1: answer in the plan = 0.41 */
      { qid: "M1.S2.T5.C20:1", kind: "count", num: 41, den: 100, near: "4.1",
        say: "Do the same for this card.", ask: "As a decimal?", answer: "0.41",
        miss: "Count the zeros of 100 before you place the point." },
      /* practice 2: answer in the plan = 0.263 */
      { qid: "M1.S2.T5.C20:2", kind: "count", num: 263, den: 1000, near: "2.63",
        say: "Count first, then write this card as a decimal.", ask: "As a decimal?", answer: "0.263",
        miss: "This time count the zeros of 1,000, not of 100." },
    ],
  },
  {
    n: 2,
    concept: "Zeros in front",
    conceptId: "M1.S2.T5.C21", objectiveIds: ["O7"],
    says: ["Three places are needed, but there is only one digit. What fills the gap?"],
    warm: { kind: "front", num: 4, den: 1000 },
    steps: [
      { say: "Tap Count to see what fills the empty places.", on: "count", hint: "Tap Count, the key under the cards." },
      { say: "Now tap Point to put the point before the three cards.", on: "point", hint: "Point is the key under the cards now." },
    ],
    stepHold: 2200,
    /* tries, as the plan writes it: First rung: count the zeros at the bottom. Second rung: count the digits on top. Third rung: the same task with a denominator of 100, before 1000 returns. */
    ladder: ["Count the digits on top, and give each empty place a zero.", "The zeros go between the point and the digits, never at the end."],
    closing: "A short top number gets zeros in front, and 0 in the ones place.",
    learned: "You learned: zeros fill the gap, and 0 goes in the ones place",
    traceback: "The count runs past the top number into empty places, grey zero cards slide into them, the point drops, the whole number or a 0 fills the ones place and the decimal is written green.",
    items: [
      /* learn FC2: answer in the plan = 9.007 */
      { qid: "M1.S2.T5.C21:FC2", kind: "front", whole: 9, num: 7, den: 1000, near: "9.7",
        say: "Write the number on the card as a decimal.", ask: "As a decimal?", answer: "9.007",
        miss: "The 7 fills one place, so what goes in the other two?" },
      /* practice 3: answer in the plan = 0.06. 100 has two zeros, so a zero goes in front of the 6 */
      { qid: "M1.S2.T5.C21:3", kind: "front", num: 6, den: 100, near: "0.6",
        say: "Now this card: write its fraction as a decimal.", ask: "As a decimal?", answer: "0.06",
        miss: "Two places but one digit: what fills the gap?" },
      /* practice 4: answer in the plan = 3.041. 1000 has three zeros, so a zero goes in front of 41 */
      { qid: "M1.S2.T5.C21:4", kind: "front", whole: 3, num: 41, den: 1000, near: "3.41",
        say: "Mind the gap, then write this card as a decimal.", ask: "As a decimal?", answer: "3.041",
        miss: "41 fills two of the three places, so which place is empty?" },
    ],
  },
  {
    n: 3,
    concept: "Make the denominator 10, 100 or 1000",
    conceptId: "M1.S2.T5.C22", objectiveIds: ["O7"],
    says: ["The count only works on ten, a hundred or a thousand. Can you reach one?"],
    warm: { kind: "reach", num: 3, den: 20 },
    steps: [
      { say: "Tap or drag the Times both slider until the bottom is 100.", on: "times", hint: "The handle sits on the line under the cards." },
      { say: "Now tap Count to count the zeros and the digits.", on: "count", hint: "Count works now that the bottom is 100." },
      { say: "Tap Point to put the point before the lit digits.", on: "point", hint: "The key under the cards now says Point." },
    ],
    stepHold: 2200,
    /* tries, as the plan writes it: First rung: ask whether the denominator goes into 10 exactly. Second rung: try 100. Third rung: the same task with a denominator of 5, before larger denominators return. */
    ladder: ["Try 100: which number times the bottom makes 100?", "Think of one fifth: times 2 it is two tenths, which is 0.2."],
    closing: "Multiply both terms to get 10, 100 or 1,000, but some fractions never do.",
    learned: "You learned: multiply both terms to reach 10, 100 or 1,000, if you can",
    traceback: "Count stays off and rings once, the slider steps until the bottom lands on 100, the zeros are counted and the point drops; for one sixth the slider runs to its end and 10, 100 and 1,000 shared by 6 each leave 4.",
    items: [
      /* learn FC3: answer in the plan = 0.35 */
      { qid: "M1.S2.T5.C22:FC3", kind: "reach", num: 7, den: 20, near: "0.7",
        say: "Write the card's fraction as a decimal.", ask: "As a decimal?", answer: "0.35",
        miss: "20 is not 10, 100 or 1,000, so slide to multiply both terms." },
      /* practice 5: answer in the plan = 0.36. 25 goes into 100 four times, so 9/25 = 36/100 = 0.36 */
      { qid: "M1.S2.T5.C22:5", kind: "reach", num: 9, den: 25, near: "0.09",
        say: "Find the decimal for this new card.", ask: "As a decimal?", answer: "0.36",
        miss: "Multiply the top by the same number as the bottom." },
      /* practice 7: answer in the plan = No. 6 does not go exactly into 10, 100 or 1000, so 1/6 has no such form
         (plan: "Can 1/6 be written with a denominator of 10, 100 or 1000? Explain." The explanation is the correction's:
         the slider runs to its end and 10, 100 and 1000 shared by 6 each leave 4) */
      { qid: "M1.S2.T5.C22:7", kind: "never", num: 1, den: 6, near: "yes",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        say: "Can one sixth be written with a denominator of 10, 100 or 1,000?", ask: "Reach 10, 100 or 1,000?", answer: "no",
        miss: "Slide all the way along: does the bottom ever land on 10, 100 or 1,000?",
        ladder: ["Which number times 6 gives 10, 100 or 1,000?", "Share 10, 100 and 1,000 by 6: does any of them leave nothing over?"] },
    ],
  },
  {
    n: 4,
    concept: "Decimals back to fractions",
    conceptId: "M1.S2.T5.C23", objectiveIds: ["O8"],
    says: ["Count the digits after the point. Then find the biggest factor both terms share."],
    warm: { kind: "back", dec: "2.75" },
    steps: [
      { say: "Tap To fraction: digits over a 1 with a zero for each digit after the point.", on: "back", hint: "Tap the To fraction key under the cards." },
      { say: "Now tap Factors to find the factors that 275 and 100 share.", on: "factors", hint: "The key under the cards now says Factors." },
      { say: "Tap Divide to divide both terms by the lit factor, the HCF.", on: "divide", hint: "Divide is the key under the cards now." },
    ],
    stepHold: 2200,
    /* tries, as the plan writes it: First rung: count the digits after the point. Second rung: write the fraction over 10, 100 or 1000. Third rung: the same task with one digit after the point, before longer decimals return. */
    ladder: ["Find the biggest number that goes into both terms.", "Tap Factors, then divide the top and the bottom by the biggest one."],
    closing: "Put the digits over 10, 100 or 1,000, then divide by the HCF.",
    learned: "You learned: digits over 10, 100 or 1,000, then divide by the HCF",
    traceback: "The digits after the point light one by one with a zero on the denominator for each, the common factors fill with the HCF lit, and both terms are divided by it to lowest terms, in green.",
    items: [
      /* learn FC4: answer in the plan = 87/20 */
      { qid: "M1.S2.T5.C23:FC4", kind: "back", dec: "4.35", parts: SLOT_FRACTION, near: "435|100",
        say: "Write 4.35 as a fraction in lowest terms.", ask: "In lowest terms?", answer: [87, 20],
        miss: "4.35 is 435 hundredths, so divide both terms by their HCF." },
      /* practice 6: answer in the plan = 4/5. 0.8 = 8/10, and dividing both terms by their HCF, 2, gives 4/5 */
      { qid: "M1.S2.T5.C23:6", kind: "back", dec: "0.8", parts: SLOT_FRACTION, near: "8|10",
        say: "Now turn 0.8 into a fraction in lowest terms.", ask: "In lowest terms?", answer: [4, 5],
        miss: "One digit after the point means 10 at the bottom: what do 8 and 10 share?" },
      /* practice 8: answer in the plan = 241/20. 12.05 = 1205/100, and dividing both terms by their HCF, 5, gives 241/20 */
      { qid: "M1.S2.T5.C23:8", kind: "back", dec: "12.05", parts: SLOT_FRACTION, near: "1205|100",
        say: "Watch the zero after the point, and give 12.05 as a fraction in lowest terms.", ask: "In lowest terms?", answer: [241, 20],
        miss: "1205 hundredths is equal, but is it as small as it gets?" },
    ],
  },
];

/* ── the maths the picture uses (fc… names: tools and the runtime share one scope) ─────────── */
const FC_TENS = [10, 100, 1000];
const fcIsTen = (d: number) => FC_TENS.indexOf(d) >= 0;
/* the zeros a denominator ends in: Count taps these, left to right */
const fcTrail = (d: number) => { let z = 0, x = Math.round(d); while (x > 0 && x % 10 === 0) { z++; x = x / 10; } return z; };
/* what the count writes: N's digits with the point before the last `places` of them, zeros in front
   where N runs out, and the whole number (or a 0) in the ones place */
const fcDecimal = (whole: number, N: number, places: number) => {
  const s = String(N).padStart(places + 1, "0");
  const head = String(Number(s.slice(0, s.length - places)) + whole);
  return places ? head + "." + s.slice(s.length - places) : head;
};
/* every factor two terms share, smallest first: the last one is their HCF */
const fcCommon = (a: number, b: number) => { const out: number[] = []; for (let k = 1; k <= Math.min(a, b); k++) if (a % k === 0 && b % k === 0) out.push(k); return out; };
/* a decimal written back: its digits without the point over 10, 100 or 1000, one zero for each digit after the point */
const fcBack = (dec: string) => { const [a, b = ""] = String(dec).split("."); return { a, b, N: Number(a + b), places: b.length, D: Math.pow(10, b.length) }; };
/* the Times both slider: 1 to 25 on a question (7/20 and 9/25 land only on 100; 1/6 never lands); Free play
   adds 40, 50, 125, 250 and 500, so every fraction that has a form over 10, 100 or 1000 can reach it (1/8 at 125) */
const FC_STOPS = Array.from({ length: 25 }, (_, k) => k + 1);
const FC_FREE_STOPS = [...FC_STOPS, 40, 50, 125, 250, 500];
/* the first stop that lands a denominator on 10, 100 or 1000 (0: none does) */
const fcLand = (den: number, stops: number[]) => stops.find((m) => fcIsTen(den * m)) || 0;
/* Free play opens on the book's own examples: 43/100 one way, 2.75 the other */
const FC_FREE_START = { kind: "free", num: 43, den: 100, dec: "2.75" };
/* the one key's labels (its data-control is the act) */
const FC_KEY: any = { count: "Count", point: "Point", back: "To fraction", factors: "Factors", divide: "Divide", turn: "Turn" };

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { tens: FC_TENS, timesStops: FC_STOPS, freeTimesStops: FC_FREE_STOPS, freeStart: FC_FREE_START,
  warm: PHASES.map((p: any) => p.warm),
  colours: { given: CONTENT.hundred, answer: CONTENT.one, working: CONTENT.ten, placeHolder: "#767676" } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a decimal is a string in its written form, judged exactly ("0.67", never ".67" or "0.670"); a fraction
   must be in lowest terms (87 over 20, not 435 over 100); the Yes/No question takes the choice's id */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: a decimal by
   dividing and finding the places it needs, a fraction from thousandths by Euclid's remainders, and the
   Yes/No by asking whether the fraction's lowest denominator goes into 1000 */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const euclid = (a: number, b: number): number => (b ? euclid(b, a % b) : a);
  if (it.dec !== undefined) {
    const a = Math.round(Number(it.dec) * 1000), g = euclid(a, 1000);
    return Array.isArray(it.answer) && it.answer[0] === a / g && it.answer[1] === 1000 / g;
  }
  if (it.choices) return (1000 % (it.den / euclid(it.den, it.num)) === 0 ? "yes" : "no") === it.answer;
  const value = (it.whole || 0) + it.num / it.den;
  const p = [1, 2, 3].find((k) => Math.abs(Math.round(value * Math.pow(10, k)) - value * Math.pow(10, k)) < 1e-6);
  return p !== undefined && value.toFixed(p) === it.answer;
}));
/* the most likely wrong answer (each item's own misconception: one place short, the zeros in front left out,
   the one zero of 20 counted, only the bottom multiplied, stopping before lowest terms); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : item.choices ? [String(item.answer)]
  : [String(item.answer), speakable(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): toolApi.answer strips everything but digits, so a decimal is typed with its point
   here (PATTERNS §4); a fraction and the Yes/No go the runtime's own way (undefined) */
const answer = (item: any, v: any) => (typeof item.answer === "string" && !item.choices && HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: nothing waits on the working area, so Enter (in a steps phase: the step's act) */
const check = () => undefined;

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 1472 x 520 with the panel shut, 900 x 520 with it open (bigPad). The picture is laid out ONCE in a
   900-wide frame (FCG.FW) at the same size open or shut, centred in the room left of the key's corner while the
   panel is shut (ox), so nothing ever runs under the panel or the key. */
const FCG = { FW: 900, RR: 876, cardX: 16, cardY: 8, cardH: 312, rowY: 96, cw: 104, ch: 130, pitch: 114, gap: 40, dig: 44,
  keyW: 300, keyH: 72, keyY: 440, trackX0: 380, trackX1: 820, trackY: 376,
  rowX: 16, dRowY: 8, chipX: 540, chipY: 74, chipH: 80, cardBY: 176, cardBH: 228, cardBW: 252, cardBX: 368 };
/* the size of every label round the picture: the last bench reads it (32 is the floor) */
const FC_LAB = 36;
const FC_CLEAR_F2D = { zc: 0, sw: 0, fill: 0, enter: 0, point: 0, ones: false, green: false };
const FC_CLEAR_D2F = { backN: -1, facN: 0, divided: false };
/* one picture, fresh: dir f2d (a fraction to a decimal) or d2f (a decimal back to a fraction) */
const fcFresh = (src: any, key: string) => ({
  key, dir: src.dec !== undefined && !src.num ? "d2f" : "f2d",
  whole: src.whole || 0, num: src.num || 1, den: src.den || 10, dec: src.dec || FC_FREE_START.dec, mult: 1,
  ...FC_CLEAR_F2D, ...FC_CLEAR_D2F, proof: 0, no: false, ring: false, hot: false, edit: null as any, buf: "",
  /* help: a question's helper key (Count; To fraction, Factors) shows only after a miss or the Hint key;
     full: the HCF is lit and "÷ HCF" written only by the correction or the win */
  help: false, full: false, typed0: false,
});
/* the factor chips the row shows: every common factor, or the four biggest (Free play: 0.40 has six), ending on the HCF */
const fcChips = (cm: number[]) => (cm.length > 4 ? cm.slice(-4) : cm);

function Work({ phase, n, item, index, stage, wrong, typed, part, captured, answerOn, api, box, stepOn, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free", demo = stage === "demo";
  const src: any = free ? FC_FREE_START : demo && phase && phase.warm ? phase.warm : item || {};
  const kind = free ? "free" : src.kind || "";
  const key = free ? "free" : n + ":" + (demo ? "demo" : index);
  const [raw, setRaw] = useState<any>(() => fcFresh(src, key));
  const s = raw.key === key ? raw : fcFresh(src, key);
  const sRef = useRef<any>(s);
  sRef.current = s;
  /* every change merges into the latest picture of this question (a timeline step runs later) */
  const upd = (fn: (p: any) => any) => setRaw((p: any) => { const b = p.key === key ? p : fcFresh(src, key); return { ...b, ...fn(b) }; });
  const put = (o: any) => upd(() => o);
  const hush = useRef(false);
  const tick = () => { if (!hush.current) api.sfx.tick(); };
  const [acting, setActing] = useState(false);
  const actRef = useRef(false);
  const lastKey = useRef(0);
  const missTyped = useRef<any>(null);

  /* a new question, a new phase, the guide's example or Free play: a fresh picture */
  useEffect(() => { tl.stop(); setRaw(fcFresh(src, key)); missTyped.current = null; }, [key]);

  /* the room: ONE 900-wide frame at the left, the same size and place with the keypad open or shut (it is the
     open panel's room), so nothing jumps while the child types and nothing reaches the key's corner (x 1178 on) */
  const ox = 0;
  const open = !!(box && box.open);

  const f2d = s.dir === "f2d";
  const stops = free ? FC_FREE_STOPS.filter((m) => m === 1 || String(s.num * m).length <= 6) : FC_STOPS;
  const showSlider = f2d && (free || kind === "reach" || kind === "never");
  const playable = (demo || stage === "ask" || free) && !tl.busy && !acting;
  const sliderLive = ((demo && !!stepOn) || stage === "ask" || free) && !tl.busy;   /* inert in a guide step's hold */
  const lastSlide = useRef(0);
  const stepW = (FCG.trackX1 - FCG.trackX0) / (stops.length - 1);
  const nearest = (x: number) => Math.min(stops.length - 1, Math.max(0, Math.round((x - FCG.trackX0) / stepW)));
  const handleX = (m: number) => FCG.trackX0 + Math.max(0, stops.indexOf(m)) * stepW;
  /* in a question the empty places only light; the grey zero cards come with the point (the guide, Free play, the win, the correction) */
  const fillOnCount = demo || free;

  /* ── Free play: the pad is lent to a card cell or the digit row the child tapped (api.capture) ── */
  const applyEdit = (p: any) => {
    const v = String(p.buf || ""), out: any = { edit: null, buf: "" };
    if (p.edit === "num" && /^\d+$/.test(v) && Number(v) >= 1) Object.assign(out, { num: Number(v), whole: 0, mult: 1 }, FC_CLEAR_F2D);
    if (p.edit === "den" && /^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 1000) Object.assign(out, { den: Number(v), mult: 1 }, FC_CLEAR_F2D);
    if (p.edit === "dec") {
      const [a, f = ""] = v.split(".");
      const dec = String(Number(a || "0")) + "." + f;
      if (/^\d{1,3}$/.test(f) && Number(dec) > 0) Object.assign(out, { dec }, FC_CLEAR_D2F);
    }
    return out;
  };
  const endEdit = () => { if (!sRef.current.edit) return; api.capture(null); upd(applyEdit); };
  const onKey = (k: string) => {
    if (k === "enter") { endEdit(); return; }
    upd((p: any) => {
      if (!p.edit) return {};
      if (k === "clear") return { buf: "" };
      if (k === "back") return { buf: p.buf.slice(0, -1) };
      if (k === "point") return p.edit === "dec" && !p.buf.includes(".") ? { buf: (p.buf || "0") + "." } : {};
      if (!/^\d$/.test(k)) return {};
      const b = p.buf + k, [a, f] = b.split(".");
      if (p.edit === "num" && b.length > 3) return {};
      if (p.edit === "den" && (b.length > 4 || Number(b) > 1000)) return {};
      if (p.edit === "dec" && (f === undefined ? a.length > 2 : f.length > 3)) return {};
      return { buf: b };
    });
  };
  const startEdit = (which: string) => {
    if (!free || !playable) return;
    if (sRef.current.edit && sRef.current.edit !== which) upd(applyEdit);
    put({ edit: which, buf: "", typed0: true });
    api.capture(onKey);
  };
  /* the runtime took the pad back (a tap on the slot, restart, the summary): keep what was typed */
  useEffect(() => { if (!captured && sRef.current.edit) upd(applyEdit); }, [captured]);

  /* ── what the picture shows ── */
  const drag = useDrag((payload: any, p: any, moved: boolean) => onSlide(payload, p, moved));
  const dragging = showSlider && drag.drag && drag.drag.payload === "times" ? drag.drag : null;
  /* the grab offset: drag.drag reports the POINTER, so a press off the handle's centre would leap; the offset taken at the
     press (frame units) is subtracted while dragging and at the drop */
  const grab = useRef(0);
  const liveMult = dragging ? stops[nearest(dragging.x - ox - grab.current)] : s.mult;
  const moving = liveMult !== s.mult;
  const N = s.num * liveMult, D = s.den * liveMult;
  const need = fcTrail(D), ten = fcIsTen(D), places = ten ? need : 0;
  const digits = String(N), len = digits.length;
  const decimal = fcDecimal(s.whole, N, places);
  const countDone = ten && places > 0 && s.sw >= places;
  const bk = fcBack(s.dec), common = fcCommon(bk.N, bk.D), chips = fcChips(common), hcf = common[common.length - 1] || 1;
  const facDone = s.facN >= chips.length;
  /* in a question the HCF is not lit, and "÷ HCF" not written, before the correction or the win */
  const hcfShown = demo || free || s.full || stage === "win" || stage === "idle";

  /* where things sit (frame coordinates; Work coordinates add ox) */
  const numStr = s.edit === "num" ? s.buf : String(N), denStr = s.edit === "den" ? s.buf : String(D);
  const wholeW = f2d && s.whole ? String(s.whole).length * FCG.dig + 18 : 0;
  const termLen = Math.max(numStr.length, denStr.length, 1);
  const barW = termLen * FCG.dig + 36;
  const cardW = Math.max(230, 40 + wholeW + barW);
  /* the whole number and the stacked fraction, centred together in the card */
  const cx0 = FCG.cardX + (cardW - wholeW - barW) / 2;
  const fx = cx0 + wholeW + barW / 2;
  const yNum = FCG.cardY + 112, yBar = FCG.cardY + 150, yDen = FCG.cardY + 240;
  const digX = (str: string, i: number) => fx + (i - (str.length - 1) / 2) * FCG.dig;
  const slotX = (j: number, gapAt: number) => FCG.RR - FCG.cw - j * FCG.pitch - (gapAt >= 0 && j >= gapAt ? FCG.gap : 0);
  const gapX = (pl: number) => FCG.RR - pl * FCG.pitch - FCG.gap / 2 + (FCG.pitch - FCG.cw) / 2;
  /* the decimal's own row (a decimal back to a fraction): its cards narrow so a 5-digit decimal still ends 34 short of the
     Common factors row */
  const dStr = String(s.edit === "dec" ? s.buf : s.dec).replace(".", "");
  const dN = Math.max(3, dStr.length + (s.edit === "dec" ? 1 : 0));
  const dPitch = Math.min(FCG.pitch, Math.floor((FCG.chipX - 34 - FCG.rowX - FCG.gap) / dN));
  const dCw = dPitch - (FCG.pitch - FCG.cw);
  const dSlotX = (k: number, intLen: number) => FCG.rowX + k * dPitch + (k >= intLen ? FCG.gap : 0);
  const dRowL = FCG.rowX, dRowW = Math.max(dCw, dN * dPitch + FCG.gap - (dPitch - dCw));
  const chipPitch = Math.min(110, (FCG.RR - FCG.chipX) / Math.max(1, chips.length));
  const chipW = chipPitch - 10;
  /* the factors block is right-aligned, so the lit chip and its HCF tag always stand clear of the second card */
  const chipXAt = (k: number) => FCG.RR - (chips.length - k) * chipPitch + (chipPitch - chipW);
  const cardAX = FCG.cardX, cardBX = FCG.cardBX;

  /* ── acts: each one performed on screen by api.act, the state changing as it passes each point ── */
  const play = async (o: any) => {
    if (actRef.current) return false;
    actRef.current = true;
    setActing(true);
    try { return await api.act(o); } finally { actRef.current = false; setActing(false); }
  };
  const doCount = async () => {
    const st = sRef.current;
    const NN = st.num * st.mult, DD = st.den * st.mult, z = fcTrail(DD), dl = String(DD), nl = String(NN).length;
    if (st.dir !== "f2d" || !fcIsTen(DD) || st.sw >= z) { api.did("count"); return; }
    endEdit();
    const zp = Array.from({ length: z }, (_, i) => ({ x: ox + digX(dl, dl.length - z + i), y: yDen - 24 }));
    const pp = Array.from({ length: z }, (_, j) => ({ x: ox + slotX(j, -1) + FCG.cw / 2, y: FCG.rowY + FCG.ch / 2 }));
    const ok = await play({ tool: "hand", moves: "tap", at: [...zp, ...pp], onPoint: (i: number) => {
      if (i < z) { put({ zc: i + 1 }); return; }
      const j = i - z;
      put({ sw: j + 1, ...(fillOnCount && j >= nl ? { fill: j - nl + 1, enter: j - nl + 1 } : {}) });
    } });
    if (!ok) return;
    put({ zc: z, sw: z, fill: fillOnCount ? Math.max(0, z - nl) : 0, enter: 0 });
    api.sfx.settle();
    api.did("count");
  };
  const doPoint = async () => {
    const st = sRef.current;
    const DD = st.den * st.mult, z = fcTrail(DD);
    if (st.dir !== "f2d" || !fcIsTen(DD) || st.sw < z || st.point >= 2 || !(demo || free)) { api.did("point"); return; }
    put({ point: 1 });
    const gx = ox + gapX(z), gy = FCG.rowY + FCG.ch - 16;
    const ok = await play({ tool: "hand", moves: "carry", from: { x: gx, y: FCG.rowY - 70 }, at: [{ x: gx, y: gy }],
      hold: <circle cx={0} cy={0} r={11} fill={C.ink} />, onPoint: () => put({ point: 2 }) });
    if (!ok) { put({ point: 0 }); return; }
    put({ point: 2, ones: true, green: true });
    api.sfx.settle();
    api.did("point");
  };
  /* the guide's Times both: the hand pushes the handle along, stop by stop, until the bottom lands */
  const doTimes = async () => {
    const st = sRef.current;
    const target = fcLand(st.den, stops);
    if (st.dir !== "f2d" || !showSlider || !target || st.mult === target) { api.did("times"); return; }
    const path = stops.filter((m) => (target > st.mult ? m > st.mult && m <= target : m >= target && m < st.mult)).sort((a, b) => (target > st.mult ? a - b : b - a));
    const ok = await play({ tool: "hand", moves: "push", from: { x: ox + handleX(st.mult), y: FCG.trackY }, at: path.map((m) => ({ x: ox + handleX(m), y: FCG.trackY })),
      onPoint: (i: number) => put({ mult: path[i], ...FC_CLEAR_F2D }) });
    if (!ok) return;
    put({ mult: target, ...FC_CLEAR_F2D });
    api.did("times");
  };
  const doBack = async () => {
    const st = sRef.current, b0 = fcBack(st.dec);
    if (st.dir !== "d2f" || st.backN >= b0.places) { api.did("back"); return; }
    endEdit();
    put({ backN: 0 });
    const pts = Array.from({ length: b0.places }, (_, i) => ({ x: ox + dSlotX(b0.a.length + i, b0.a.length) + dCw / 2, y: FCG.dRowY + FCG.ch / 2 }));
    const ok = await play({ tool: "hand", moves: "tap", at: pts, onPoint: (i: number) => put({ backN: i + 1 }) });
    if (!ok) { put({ backN: -1 }); return; }
    put({ backN: b0.places });
    api.sfx.settle();
    api.did("back");
  };
  const doFactors = async () => {
    const st = sRef.current, b0 = fcBack(st.dec), cs = fcChips(fcCommon(b0.N, b0.D));
    if (st.dir !== "d2f" || st.backN < b0.places || st.facN >= cs.length) { api.did("factors"); return; }
    const pts = cs.map((_, k) => ({ x: ox + chipXAt(k) + chipW / 2, y: FCG.chipY + FCG.chipH / 2 }));
    const ok = await play({ tool: "hand", moves: "tap", at: pts, onPoint: (i: number) => put({ facN: i + 1 }) });
    if (!ok) return;
    put({ facN: cs.length });
    api.sfx.settle();
    api.did("factors");
  };
  /* the guide's and Free play's last act: the pencil writes the lowest terms on the second card */
  const doDivide = async () => {
    const st = sRef.current, b0 = fcBack(st.dec), cs = fcChips(fcCommon(b0.N, b0.D));
    if (st.dir !== "d2f" || st.facN < cs.length || st.divided || !(demo || free)) { api.did("divide"); return; }
    const bx = ox + cardBX + FCG.cardBW / 2;
    const ok = await play({ tool: "pencil", moves: "draw", from: { x: bx - 60, y: FCG.cardBY + 70 }, at: [{ x: bx, y: FCG.cardBY + 80 }, { x: bx, y: FCG.cardBY + 190 }] });
    if (!ok) return;
    put({ divided: true });
    api.sfx.settle();
    api.did("divide");
  };
  /* Free play's Turn: a finished decimal goes back to the fraction side, a finished fraction to the decimal side */
  const doTurn = () => {
    if (!free) return;
    endEdit();
    upd((p: any) => {
      if (p.dir === "f2d") {
        const NN = p.num * p.mult, DD = p.den * p.mult;
        return p.green ? { dir: "d2f", dec: fcDecimal(p.whole, NN, fcTrail(DD)), ...FC_CLEAR_D2F } : { dir: "d2f" };
      }
      const b0 = fcBack(p.dec), cm = fcCommon(b0.N, b0.D), g = cm[cm.length - 1] || 1;
      return p.divided ? { dir: "f2d", whole: 0, num: b0.N / g, den: b0.D / g, mult: 1, ...FC_CLEAR_F2D } : { dir: "f2d" };
    });
    api.sfx.settle();
  };
  const act = async (on: any) => {
    const had = focusedHere();
    if (on === "count") await doCount();
    else if (on === "point") await doPoint();
    else if (on === "times") await doTimes();
    else if (on === "back") await doBack();
    else if (on === "factors") await doFactors();
    else if (on === "divide") await doDivide();
    else if (on === "turn") doTurn();
    refocus(had, ["point", "factors", "divide", "count", "back", "answer-open", "times", "turn"]);
  };
  /* Enter and the agent's toolApi.check() perform the CURRENT guide step, 400 ms apart, so two Enters never do two
     steps; the dev solve() goes straight to the act */
  const lastEnter = useRef(0);
  api.onEnter(demo && stepOn ? () => {
    const t = Date.now();
    if (t - lastEnter.current < 400) return;
    lastEnter.current = t;
    act(stepOn);
  } : null);
  HOOK.demo = () => (stepOn ? act(stepOn) : undefined);
  /* one key for a sequence: 400 ms, so one tap never also presses the next label; in a guide step only that step's
     act may happen (anything else is a wrong act: the step's hint, no change) and nothing acts in the step's hold */
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    if (demo && on !== stepOn) { api.did(on); return; }
    act(on);
  };
  /* a tap on the grey Count at a question says why it is off, then the question comes back on the bubble */
  const offAt = useRef(0);
  const offCount = () => {
    const t = Date.now();
    if (t - offAt.current < 400 || stage !== "ask") return;
    offAt.current = t;
    const T: any = (window as any).toolApi, g0 = T && T.getState ? T.getState() : null;
    const k0 = key, q = item && item.say, tries0 = g0 ? g0.tries : 0;
    /* a hint on show already says what to do, and the runtime keeps it over any line until the child's next key */
    if (g0 && g0.hint && g0.hintKind !== "type") return;
    api.say("Count needs a bottom number of 10, 100 or 1,000.", () => {
      const g = T && T.getState ? T.getState() : null;
      /* only while nothing else happened: the same question, no new try, no hint on show */
      if (q && g && g.stage === "ask" && sRef.current.key === k0 && g.tries === tries0 && !(g.hint && g.hintKind !== "type")) api.say(q);
    });
  };
  /* when an act ends, the keyboard stays on the key (its label now the next act) or goes to the next live key */
  const refocus = (had: boolean, ids: string[]) => {
    if (!had) return;
    setTimeout(() => {
      for (const id of ids) {
        const el: any = document.querySelector('[data-control="' + id + '"]');
        if (el && el.getAttribute("aria-disabled") !== "true" && el.focus) { el.focus(); return; }
      }
    }, 60);
  };
  const focusedHere = () => { const a: any = document.activeElement; return !!(a && a.getAttribute && a.getAttribute("data-control") && a.closest && a.closest('[data-zone="work"]')); };

  /* ── the Times both slider: a drag snaps to the nearest stop; a tap steps on one stop (in the guide, it does the step) ── */
  const onSlide = (payload: any, p: any, moved: boolean) => {
    if (payload !== "times" || !playable || !showSlider) return;
    if (demo && stepOn !== "times") { api.did("times"); return; }   /* another step waits: a wrong act, nothing moves */
    if (demo && !moved) { act("times"); return; }
    if (!moved) { const t = Date.now(); if (t - lastSlide.current < 350) return; lastSlide.current = t; }
    endEdit();
    const st = sRef.current, cur = Math.max(0, stops.indexOf(st.mult));
    const k = moved && p && isFinite(p.x) ? nearest(p.x - ox - grab.current) : (cur + 1) % stops.length;
    grab.current = 0;
    slideTo(k);
  };
  const slideTo = (k: number) => {
    const st = sRef.current, m = stops[k];
    if (m !== st.mult) put({ mult: m, ...FC_CLEAR_F2D, hot: false });
    if (fcIsTen(st.den * m)) { tick(); api.did("times"); } else api.did("slide");
  };
  /* the handle's keys: Enter / Space step on one stop (a held key's auto-repeat is ignored), the arrows move one stop and stop at the ends */
  const sliderKeys = (e: any) => {
    if (e.repeat) { e.preventDefault(); return; }
    const arrow = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!arrow) { const h = drag.keys("times"); if (h && h.onKeyDown) h.onKeyDown(e); return; }
    e.preventDefault();
    if (!playable || !showSlider) return;
    if (demo && stepOn !== "times") { api.did("times"); return; }
    const cur = Math.max(0, stops.indexOf(sRef.current.mult)), k = Math.max(0, Math.min(stops.length - 1, cur + arrow));
    if (k === cur) return;
    endEdit();
    slideTo(k);
  };
  const sliderBind = () => {
    const b: any = drag.bind("times") || {};
    const pd = b.onPointerDown;
    return { ...b, onPointerDown: (e: any) => {
      try {
        const m = e.currentTarget.getScreenCTM().inverse(), pt = new (window as any).DOMPoint(e.clientX, e.clientY).matrixTransform(m);
        grab.current = pt.x - handleX(sRef.current.mult);
      } catch (_) { grab.current = 0; }
      if (pd) pd(e);
    } };
  };

  /* ── the whole method from where the picture stands: the correction draws it slowly from a fresh picture,
     the win finishes it quickly from wherever the child left it ── */
  const doneSteps = (len0: number, pl: number, st: any, quick: boolean) => {
    const out: any[] = [];
    for (let f = st.fill + 1; f <= Math.max(0, pl - len0); f++)
      out.push([40, () => put({ fill: f, enter: f })], [quick ? 170 : 320, () => { put({ enter: 0 }); tick(); }]);
    if (st.point < 2) out.push([40, () => put({ point: 1 })], [quick ? 260 : 480, () => put({ point: 2 })]);
    if (!st.ones) out.push([quick ? 180 : 400, () => { put({ ones: true }); tick(); }]);
    if (!st.green) out.push([200, () => put({ green: true })]);
    return out;
  };
  const solveSteps = (st: any, quick: boolean) => {
    const out: any[] = [];
    if (st.dir === "d2f") {
      const b0 = fcBack(st.dec), cs = fcChips(fcCommon(b0.N, b0.D));
      for (let b = st.backN + 1; b <= b0.places; b++) out.push([quick ? 170 : 440, () => { put({ backN: b }); if (b > 0) tick(); }]);
      for (let f = st.facN + 1; f <= cs.length; f++) out.push([quick ? 150 : 400, () => { put({ facN: f }); tick(); }]);
      if (!st.divided) out.push([quick ? 300 : 650, () => put({ divided: true })]);
      return out;
    }
    if (kind === "never") {
      /* the slider runs to its end and never lands; then 10, 100 and 1000 each leave 4 when shared by 6 */
      for (let m = st.mult + 1; m <= FC_STOPS.length; m++) out.push([quick ? 25 : 90, () => put({ mult: m, ...FC_CLEAR_F2D })]);
      for (let r = st.proof + 1; r <= 3; r++) out.push([quick ? 220 : 700, () => { put({ proof: r }); tick(); }]);
      if (!st.no) out.push([300, () => put({ no: true })]);
      return out;
    }
    let mult = st.mult, z0 = st.zc, w0 = st.sw, base = st;
    if (kind === "reach") {
      const target = fcLand(st.den, FC_STOPS);
      if (mult !== target) {
        /* Count stays off and rings once; the handle lights where to start, then steps up to 100 */
        if (!quick) out.push([700, () => put({ ring: true })], [80, () => put({ ring: false, hot: true })]);
        if (mult > target) out.push([quick ? 200 : 420, () => put({ mult: target, ...FC_CLEAR_F2D })]);
        else for (let m = mult + 1; m <= target; m++) out.push([quick ? 120 : 400, () => { put({ mult: m, ...FC_CLEAR_F2D }); if (m === target) tick(); }]);
        mult = target; z0 = 0; w0 = 0; base = { ...st, ...FC_CLEAR_F2D };
      }
    }
    const pl = fcTrail(st.den * mult), l0 = String(st.num * mult).length;
    for (let k = z0 + 1; k <= pl; k++) out.push([quick ? 150 : 430, () => { put({ zc: k, hot: false }); tick(); }]);
    for (let k = w0 + 1; k <= pl; k++) out.push([quick ? 150 : 400, () => { put({ sw: k }); tick(); }]);
    return out.concat(doneSteps(l0, pl, base, quick));
  };
  /* the correction: lock, redraw the method from the start, end on the whole right answer, unlock */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    missTyped.current = typed;
    api.lock(true);
    const base = { ...fcFresh(src, key), help: true, full: true };
    setRaw(base);
    tl.run([[450, null], ...solveSteps(base, false)], () => { put({ hot: false, ring: false }); api.lock(false); });
  }, [wrong]);
  /* the win: the maths finishes moving (the point drops, the card settles) and the tool says its one line */
  useEffect(() => {
    if (stage !== "win") return;
    /* the win settles AT ONCE (the cards and the point glide by CSS, 320 ms), so the party's frame never meets a half-done
       picture; every step is applied in order, silently, and a second run changes nothing */
    tl.stop();
    put({ full: true });
    hush.current = true;
    solveSteps(sRef.current, true).forEach((st: any) => st[1] && st[1]());
    hush.current = false;
    api.sfx.settle();
    /* one short sentence each (read in about 2.4 s); a phase's last one gives way to its closing line */
    if (key === "1:0") api.say("Yes, two zeros, two digits.");
    if (key === "1:1") api.say("Right, two digits after the point.");
    if (key === "1:2") api.say("Yes, three zeros, three digits.");
    if (key === "2:0") api.say("Yes, two zeros fill the gap.");
    if (key === "2:1") api.say("Right, a zero in front of the 6.");
    if (key === "2:2") api.say("Yes, one zero fills the gap.");
    if (key === "3:0") api.say("Yes, times 5 made it 100.");
    if (key === "3:1") api.say("Right, times 4 took 25 to 100.");
    if (key === "3:2") api.say("Right, 6 does not go exactly into 10, 100 or 1,000.");
    if (key === "4:0") api.say("Yes, 435 and 100 share 5.");
    if (key === "4:1") api.say("Right, 8 and 10 share 2.");
    if (key === "4:2") api.say("Yes, 1205 and 100 share 5.");
  }, [stage]);

  /* the Hint key at an open question also brings the helper key (the runtime tells Work nothing of it: read the
     shown hint from getState(), a rung, never the built-in "type" line) */
  useEffect(() => {
    if (stage !== "ask" || s.help) return;
    const id = setInterval(() => {
      const T: any = (window as any).toolApi;
      const g = T && T.getState ? T.getState() : null;
      if (g && g.hint && g.hintKind !== "type") put({ help: true });
    }, 250);
    return () => clearInterval(id);
  }, [stage, key, s.help]);

  /* the teacher agent types a decimal with its point (toolApi.answer would strip it) */
  HOOK.type = (v: any) => { api.setTyped(String(v ?? "").replace(/[^0-9.]/g, "").slice(0, 9)); return true; };

  /* what the host and the agent read back (toolApi.getState); never the answer before it is given */
  api.share({
    direction: f2d ? "to decimal" : "to fraction",
    fraction: f2d ? (s.whole ? s.whole + " " : "") + N + "/" + D
      : s.backN < 0 ? null : s.divided ? bk.N / hcf + "/" + bk.D / hcf : bk.N + "/" + Math.pow(10, s.backN),
    zeros: f2d ? s.zc : 0, counted: f2d ? s.sw : Math.max(0, s.backN), times: liveMult,
    decimal: f2d ? (s.green && !moving ? decimal : null) : s.dec,
    factors: f2d ? [] : chips.slice(0, s.facN),
    complete: stage === "idle",
  });

  /* ── drawing (helpers are called, never mounted) ── */
  const blue = shade(CONTENT.hundred, 0.25), green = shade(CONTENT.one, 0.25), amber = CONTENT.ten;
  const amberInk = shade(CONTENT.ten, 0.45), grey = "#767676";
  const motion = !reducedMotion();
  const at = (x: number, y: number) => ({ transform: `translate(${x}px, ${y}px)`, transition: motion ? "transform 320ms ease-out" : undefined } as any);
  const lit = (x: number, y: number, w: number, h: number) => <rect x={x} y={y} width={w} height={h} rx={10} fill={tint(amber, 0.55)} stroke={amber} strokeWidth={3} />;

  /* the fraction card (a fraction to a decimal) */
  const cardF2D = () => {
    const litFrom = denStr.length - need, z = moving ? 0 : s.zc;
    const side = liveMult > 1 ? "× " + liveMult : "";
    return (
      <g>
        <rect x={FCG.cardX} y={FCG.cardY} width={cardW} height={FCG.cardH} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} filter="url(#fShadowSoft)" />
        {s.whole ? <text x={cx0} y={FCG.cardY + 176} fontSize={T.display} fontWeight={700} fill={blue}>{s.whole}</text> : null}
        {s.edit === "num" && <rect x={fx - barW / 2} y={yNum - 66} width={barW} height={80} rx={10} fill="none" stroke={amber} strokeWidth={3} strokeDasharray="10 8" />}
        {s.edit === "den" && <rect x={fx - barW / 2} y={yDen - 66} width={barW} height={80} rx={10} fill="none" stroke={amber} strokeWidth={3} strokeDasharray="10 8" />}
        {numStr.split("").map((ch, i) => <text key={"n" + i} x={digX(numStr, i)} y={yNum} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={blue}>{ch}</text>)}
        <line x1={fx - barW / 2 + 6} y1={yBar} x2={fx + barW / 2 - 6} y2={yBar} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
        {denStr.split("").map((ch, i) => {
          const on = !s.edit && i >= litFrom && i < litFrom + z;
          return (
            <g key={"d" + i}>
              {on && lit(digX(denStr, i) - 22, yDen - 58, 44, 68)}
              <text x={digX(denStr, i)} y={yDen} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{ch}</text>
            </g>
          );
        })}
        {s.edit && <rect x={fx + (s.edit === "num" ? numStr : denStr).length / 2 * FCG.dig + 4} y={(s.edit === "num" ? yNum : yDen) - 50} width={5} height={56} fill={amber} />}
        {side && (
          <g pointerEvents="none">
            <text x={FCG.cardX + cardW + 12} y={yNum - 14} fontSize={FC_LAB} fontWeight={700} fill={amberInk}>{side}</text>
            <text x={FCG.cardX + cardW + 12} y={yDen - 14} fontSize={FC_LAB} fontWeight={700} fill={amberInk}>{side}</text>
          </g>
        )}
        {z > 0 && <text x={FCG.cardX + 4} y={FCG.cardY + FCG.cardH + 52} fontSize={T.speech} fontWeight={700} fill={amberInk}>{z + " " + tx(z === 1 ? "zero" : "zeros")}</text>}
        {free && (
          <g>
            <Hit id="fc-top" x={FCG.cardX} y={FCG.cardY} w={cardW} h={FCG.cardH / 2} label={tx("type a numerator")} onPress={() => startEdit("num")} enabled={playable && !(captured && s.edit === "num")} />
            <Hit id="fc-bottom" x={FCG.cardX} y={FCG.cardY + FCG.cardH / 2} w={cardW} h={FCG.cardH / 2} label={tx("type a denominator")} onPress={() => startEdit("den")} enabled={playable && !(captured && s.edit === "den")} />
          </g>
        )}
      </g>
    );
  };

  /* the digit cards: slot j counts from the right; the point opens a gap before slot `gapAt` */
  const slotCard = (k: string, j: number, gapAt: number, ch: string, look: string, dx = 0) => {
    const ring = look === "lit" || look === "empty";
    const fill = look === "lit" ? tint(amber, 0.6) : look === "fill" ? "#F2F2F2" : "#FFFFFF";
    const stroke = ring ? amber : look === "fill" ? "#8A8A8A" : C.ink;
    const ink = look === "fill" || look === "zero" ? grey : look === "done" ? green : blue;
    return (
      <g key={k} style={at(slotX(j, gapAt) + dx, FCG.rowY)}>
        <rect x={0} y={0} width={FCG.cw} height={FCG.ch} rx={14} fill={look === "empty" ? tint(amber, 0.85) : fill} stroke={stroke}
          strokeWidth={ring ? 4 : 3} strokeDasharray={look === "empty" ? "12 8" : undefined} />
        {ch !== "" && <text x={FCG.cw / 2} y={92} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={ink}>{ch}</text>}
      </g>
    );
  };
  const pointDot = (x: number, dropped: boolean) => (
    <g key="pt" style={at(x, dropped ? FCG.rowY + FCG.ch - 16 : FCG.rowY - 30)}>
      <circle cx={0} cy={0} r={12} fill={C.ink} />
    </g>
  );
  const rowF2D = () => {
    const out: any[] = [];
    const gapAt = !moving && s.point >= 1 ? places : -1, dropped = !moving && s.point >= 2;
    const sw = moving ? 0 : s.sw, done = s.green && !moving;
    for (let j = 0; j < len; j++) out.push(slotCard("s" + j, j, gapAt, digits[len - 1 - j], done ? "done" : sw > j ? "lit" : "own"));
    if (ten && !moving) {
      for (let j = len; j < places; j++) {
        const f = j - len + 1;
        if (s.fill >= f) out.push(slotCard("f" + j, j, gapAt, "0", "fill", s.enter === f ? -80 : 0));
        else if (sw > j) out.push(slotCard("e" + j, j, gapAt, "", "empty"));
      }
      if (len <= places && s.ones)
        (s.whole ? String(s.whole) : "0").split("").reverse().forEach((ch, t) => out.push(slotCard("o" + t, places + t, gapAt, ch, s.whole ? (done ? "done" : "own") : "fill")));
      if (s.point >= 1) out.push(pointDot(gapX(places), dropped));
    }
    return out;
  };

  /* a decimal back to a fraction: the decimal's own row, card A (over 10, 100 or 1000), the factors, card B */
  const rowD2F = () => {
    const out: any[] = [], editing = s.edit === "dec";
    const [a, f] = String(editing ? s.buf : s.dec).split(".");
    const fr = f === undefined ? "" : f, ia = a || "";
    for (let k = 0; k < ia.length; k++) out.push(dCard("i" + k, dSlotX(k, ia.length), ia[k], "own"));
    for (let k = 0; k < fr.length; k++) out.push(dCard("f" + k, dSlotX(ia.length + k, ia.length), fr[k], !editing && k < s.backN ? "lit" : "own"));
    if (editing && !ia && f === undefined) out.push(dCard("e0", dSlotX(0, 0), "", "empty"));
    if (f !== undefined) out.push(<circle key="pt" cx={FCG.rowX + ia.length * dPitch - (dPitch - dCw) / 2 + FCG.gap / 2} cy={FCG.dRowY + FCG.ch - 16} r={12} fill={C.ink} />);
    if (editing) out.push(<rect key="caret" x={dSlotX(ia.length + fr.length, f === undefined ? 99 : ia.length) + 4} y={FCG.dRowY + 14} width={6} height={100} fill={amber} />);
    return out;
  };
  const dCard = (k: string, x: number, ch: string, look: string) => (
    <g key={k}>
      <rect x={x} y={FCG.dRowY} width={dCw} height={FCG.ch} rx={14} fill={look === "lit" ? tint(amber, 0.6) : look === "empty" ? "none" : "#FFFFFF"}
        stroke={look === "lit" || look === "empty" ? amber : C.ink} strokeWidth={look === "own" ? 3 : 4} strokeDasharray={look === "empty" ? "12 8" : undefined} />
      {ch !== "" && <text x={x + dCw / 2} y={FCG.dRowY + 92} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={blue}>{ch}</text>}
    </g>
  );
  const fracCard = (x: number, nn: any, dd: any, col: string, dCol: string, dashed: boolean) => {
    const cx = x + FCG.cardBW / 2, y = FCG.cardBY;
    return (
      <g>
        <rect x={x} y={y} width={FCG.cardBW} height={FCG.cardBH} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} filter="url(#fShadowSoft)" />
        {dashed ? (
          <g>
            <rect x={cx - 90} y={y + 22} width={180} height={84} rx={12} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="12 8" />
            <rect x={cx - 90} y={y + 136} width={180} height={84} rx={12} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="12 8" />
          </g>
        ) : (
          <g>
            <text x={cx} y={y + 96} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={col}>{nn}</text>
            <text x={cx} y={y + 206} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={dCol}>{dd}</text>
          </g>
        )}
        <line x1={cx - 100} y1={y + 121} x2={cx + 100} y2={y + 121} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      </g>
    );
  };
  /* card B in a question: the asked card (PATTERNS §9e). It blinks while the keypad is shut; with it open the
     typed digits show in its own boxes; after a miss it shows the correction's answer until the child types again */
  const cardQ = !free && !demo && item && item.parts && f2d === false;
  const cardB = () => {
    const x = cardBX, y = FCG.cardBY, w = FCG.cardBW, h = FCG.cardBH, cx = x + w / 2;
    if (!cardQ) return s.divided ? fracCard(x, bk.N / hcf, bk.D / hcf, green, green, false) : fracCard(x, "", "", C.ink, C.ink, true);
    const ans = item.answer, fresh = missTyped.current !== null && typed === missTyped.current;
    const showAns = stage === "win" || stage === "idle" || (s.divided && (fresh || !typed));
    const [tn, td] = slotPartsOf(typed, 2);
    const activeJ = part === 1 || part === "1" ? 1 : 0;
    const typedOn = open || !!(tn || td);
    return (
      <g>
        {showAns ? fracCard(x, ans[0], ans[1], green, green, false) : typedOn ? (
          <g>
            <rect x={x} y={y} width={w} height={h} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} filter="url(#fShadowSoft)" />
            {[0, 1].map((j) => {
              const by = y + (j ? 136 : 22), on = open && activeJ === j, v = j ? td : tn;
              return (
                <g key={j}>
                  <rect x={cx - 90} y={by} width={180} height={84} rx={12} fill={on ? tint(C.panel, 0.4) : "#FFFFFF"} stroke={on ? C.ink : C.rule} strokeWidth={on ? 4 : 3} />
                  <text x={cx} y={by + 66} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{v || ""}</text>
                  {on && <rect x={cx + (String(v || "").length * FCG.dig) / 2 + 4} y={by + 14} width={5} height={58} fill={C.ink} />}
                </g>
              );
            })}
            <line x1={cx - 100} y1={y + 121} x2={cx + 100} y2={y + 121} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          </g>
        ) : fracCard(x, "", "", C.ink, C.ink, true)}
        {stage === "ask" && !open && !tl.busy && answerOn === "card" && (
          <g>
            <BlinkRing x={x - 8} y={y - 8} w={w + 16} h={h + 16} rx={RAD.panel + 8} />
            <SlotPartBox id="answer-open" x={x} y={y} w={w} h={h} label={tx("Fraction card")} onPick={() => api.openAnswer()} />
          </g>
        )}
        {stage === "ask" && open && answerOn === "card" && [0, 1].map((j) => (
          <SlotPartBox key={j} id={"part-" + (j + 1)} x={x} y={y + (j ? h / 2 : 0)} w={w} h={h / 2} label={j ? tx("denominator") : tx("numerator")} onPick={() => api.pickPart(j)} />
        ))}
      </g>
    );
  };
  const pictureD2F = () => {
    const backed = s.backN >= 0, bigD = Math.pow(10, Math.max(0, s.backN));
    return (
      <g>
        {rowD2F()}
        {free && <Hit id="fc-row" x={FCG.rowX} y={FCG.dRowY} w={FCG.chipX - 34 - FCG.rowX} h={FCG.ch} label={tx("type a decimal")} onPress={() => startEdit("dec")} enabled={playable && !(captured && s.edit === "dec")} />}
        {backed ? fracCard(cardAX, bk.N, bigD, blue, C.ink, false) : fracCard(cardAX, "", "", C.ink, C.ink, true)}
        <text x={(cardAX + FCG.cardBW + cardBX) / 2} y={FCG.cardBY + 142} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>=</text>
        {facDone && backed && hcfShown && hcf > 1 && <text x={(cardAX + FCG.cardBW + cardBX) / 2} y={FCG.cardBY + 76} textAnchor="middle" fontSize={hcf >= 100 ? T.label : FC_LAB} fontWeight={700} fill={amberInk}>{"÷ " + hcf}</text>}
        {cardB()}
        {s.facN > 0 && (
          <g pointerEvents="none">
            <text x={FCG.RR} y={FCG.chipY - 26} textAnchor="end" fontSize={FC_LAB} fontWeight={700} fill={C.ink}>{tx("Common factors")}</text>
            {chips.slice(0, s.facN).map((fct, k) => {
              const hl = facDone && hcfShown && k === chips.length - 1, x = chipXAt(k);
              return (
                <g key={k}>
                  <rect x={x} y={FCG.chipY} width={chipW} height={FCG.chipH} rx={14} fill={hl ? tint(amber, 0.55) : "#FFFFFF"} stroke={hl ? amber : C.ink} strokeWidth={hl ? 4 : 2.5} />
                  <text x={x + chipW / 2} y={FCG.chipY + 54} textAnchor="middle" fontSize={Math.max(T.label, Math.min(T.prompt, Math.floor((chipW - 18) / (String(fct).length * 0.62))))} fontWeight={700} fill={C.ink}>{fct}</text>
                  {hl && <text x={x + chipW / 2} y={FCG.chipY + FCG.chipH + 42} textAnchor="middle" fontSize={FC_LAB} fontWeight={700} fill={amberInk}>{tx("HCF")}</text>}
                </g>
              );
            })}
          </g>
        )}
      </g>
    );
  };

  /* the slider handle, live only while the child may play */
  const slider = () => {
    const hx = dragging ? Math.min(FCG.trackX1, Math.max(FCG.trackX0, dragging.x - ox)) : handleX(s.mult);
    return (
      <g>
        <text x={FCG.trackX0 - 40} y={FCG.trackY - 70} fontSize={FC_LAB} fontWeight={700} fill={C.ink}>{tx("Times both")}</text>
        <line x1={FCG.trackX0} y1={FCG.trackY} x2={FCG.trackX1} y2={FCG.trackY} stroke={shade(C.rule, 0.2)} strokeWidth={8} strokeLinecap="round" />
        {stops.map((m, k) => <line key={k} x1={FCG.trackX0 + k * stepW} y1={FCG.trackY - 12} x2={FCG.trackX0 + k * stepW} y2={FCG.trackY + 12} stroke={shade(C.rule, 0.3)} strokeWidth={2.5} />)}
        {/* aria-disabled follows the stage, never the act: the browser's click lands AFTER the drag's release has started the act */}
        <g {...control("times", tx("Times both slider"))} tabIndex={sliderLive ? 0 : -1} aria-disabled={sliderLive ? undefined : "true"}
          {...(playable && sliderLive ? sliderBind() : {})} {...(playable && sliderLive ? { onKeyDown: sliderKeys } : {})}>
          <rect x={hx - 60} y={FCG.trackY - 36} width={120} height={72} rx={18} fill="url(#gAccent)" stroke={s.hot ? amber : shade(C.accent, 0.18)} strokeWidth={s.hot ? 6 : 2} />
          <text x={hx} y={FCG.trackY + 13} textAnchor="middle" fontSize={FC_LAB} fontWeight={700} fill="#FFFFFF">{"× " + liveMult}</text>
        </g>
      </g>
    );
  };

  /* the one key at the bottom centre: its label and data-control follow the act; two side by side in Free play (the act, Turn) */
  const seq = (): any => {
    if (!(demo || free || (stage === "ask" && !open))) return null;
    if (stage === "ask" && !s.help && !tl.busy) return null;   /* before a miss or the Hint key the child answers unhelped */
    /* the correction moves the picture itself; only the off Count key of a denominator not yet at 100 stays, for its ring */
    if (tl.busy) return f2d && kind === "reach" && !ten ? { id: "count", off: true } : null;
    if (f2d) {
      if (kind === "never" && s.proof > 0) return null;
      if (!ten) return showSlider && kind !== "never" ? { id: "count", off: true } : null;   /* one sixth never lands: no key that cannot act */
      if (!countDone) return { id: "count" };
      if (s.point < 2 && (demo || free)) return { id: "point" };
      return null;
    }
    if (s.backN < bk.places) return { id: "back" };
    if (!facDone) return { id: "factors" };
    if (!s.divided && (demo || free)) return { id: "divide" };
    return null;
  };
  const sq = seq();
  const ids: any[] = free ? [sq ? sq : null, { id: "turn" }].filter(Boolean) : sq ? [sq] : [];
  const kw = ids.length > 1 ? 260 : FCG.keyW, kgap = 24;
  const kx0 = FCG.FW / 2 - (ids.length * kw + (ids.length - 1) * kgap) / 2;
  /* a key is off by the maths only, never while an act plays (the runtime holds the area then; a key that turned
     aria-disabled under the finger would make the browser's click after the release read as a wrong act) */
  const keyBoxes = ids.map((b: any, j: number) => ({ ...b, j, x: kx0 + j * (kw + kgap), y: FCG.keyY, w: kw, h: FCG.keyH, off: !!b.off }));

  /* the one thing to touch next */
  let inv: any = null;
  if ((demo || stage === "ask") && !tl.busy && !acting && !open) {
    const live = keyBoxes.find((b: any) => !b.off);
    /* the invite hugs what it invites (r57: Invite x, y = the centre, w, h, rx), so it never cuts a label */
    if (live) inv = [live.x + live.w / 2, live.y + live.h / 2, live.w, live.h, 22];
    else if (showSlider && !ten && !(kind === "never" && s.mult >= FC_STOPS.length)) inv = [handleX(s.mult), FCG.trackY, 120, 72, 18];
  } else if (free && !s.edit && !s.typed0 && !tl.busy && !acting) {
    /* Free play: the card the child types on blinks until it is first tapped (the bubble says "tap a card") */
    inv = f2d ? [FCG.cardX + cardW / 2, FCG.cardY + FCG.cardH / 2, cardW, FCG.cardH, RAD.panel]
      : [dRowL + dRowW / 2, FCG.dRowY + FCG.ch / 2, dRowW, FCG.ch, 14];
  }

  return (
    <g transform={`translate(${ox},0)`}>
      {f2d ? (
        <g>
          {cardF2D()}
          {!(kind === "never" && s.proof > 0) && rowF2D()}
          {s.green && !moving && <text x={FCG.RR} y={FCG.rowY + FCG.ch + 92} textAnchor="end" fontSize={T.display} fontWeight={700} fill={green} pointerEvents="none">{decimal}</text>}
          {showSlider && slider()}
          {/* one sixth in the correction: 10, 100 and 1000 shared by 6 each leave 4, so no denominator of 10, 100 or 1000 */}
          {kind === "never" && s.proof > 0 && (
            <g pointerEvents="none">
              {FC_TENS.slice(0, s.proof).map((t, k) => (
                <text key={k} x={FCG.RR} y={60 + k * 62} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{indian(t) + " ÷ " + s.den + " " + tx("leaves") + " " + (t % s.den)}</text>
              ))}
              {s.no && <text x={FCG.RR} y={282} textAnchor="end" fontSize={T.display} fontWeight={700} fill={green}>{tx("No")}</text>}
            </g>
          )}
          {s.ring && <rect x={FCG.FW / 2 - FCG.keyW / 2 - 6} y={FCG.keyY - 6} width={FCG.keyW + 12} height={FCG.keyH + 12} rx={22} fill="none" stroke={amber} strokeWidth={6} pointerEvents="none" />}
        </g>
      ) : pictureD2F()}

      {keyBoxes.map((b: any) => (
        <g key={"actw" + b.j}>
        <Key key={"act" + b.j} id={b.id} label={tx(FC_KEY[b.id])} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" disabled={b.off} onClick={() => pressKey(b.id)}>
          {/* one line, sized to the key (never under 32): "To fraction" in a 260-wide Free play key */}
          <text y={lang === "hi" ? 20 : 12} textAnchor="middle" fontSize={Math.max(T.label, Math.min(T.prompt, Math.floor((b.w - 40) / (tx(FC_KEY[b.id]).length * 0.56))))} fontWeight={700} fill={b.off ? shade(C.dim, 0.35) : toneInk("key", C.ink)}>{tx(FC_KEY[b.id])}</text>
        </Key>
        {/* the grey key swallows a tap and does nothing, so at a question a clear rect over it says why it is off */}
        {b.off && b.id === "count" && stage === "ask" && <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={18} fill="#FFFFFF" fillOpacity={0} onClick={offCount} />}
        </g>
      ))}

      {inv && <Invite x={inv[0]} y={inv[1]} w={inv[2]} h={inv[3]} rx={inv[4]} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (r24: `it` is the item) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const ph: any = PHASES[(n || 1) - 1], item: any = it || (last && ph ? ph.items[last.item] : null);
  if (!item) return null;
  const blue = shade(CONTENT.hundred, 0.25), green = shade(CONTENT.one, 0.25);
  /* one size for every digit, as big as the card's height and width allow (28 the floor), the bar 9 clear of both
     terms; the whole drawing centred in the card. Widths: a digit 0.62 em, a point 0.3, "=" with its room 0.62 em + 24 */
  const wOf = (t: any) => String(t).split("").reduce((a: number, ch: string) => a + (ch === "." ? 0.28 : 0.56), 0);
  const fw = (a: any, b: any) => Math.max(wOf(a), wOf(b));
  const isDec = item.dec !== undefined;
  const A: any = isDec ? item.answer : [item.num, item.den];
  const left = isDec ? wOf(item.dec) : item.whole ? wOf(item.whole) : 0;
  const right = isDec ? 0 : item.choices ? wOf(tx("No")) * 1.1 : wOf(item.answer);
  const ems = left + fw(A[0], A[1]) + right + (item.choices ? 0 : 0.6);
  const pads = 24 + (left ? 8 : 0) + 8 + (item.choices ? 14 : 16);
  const fsH = (h - 3 - 4 * 5) / (2 * 0.73), fsW = (w - pads) / ems;
  const fs = Math.max(T.micro, Math.floor(Math.min(40, fsH, fsW)));
  /* the free height shared out evenly: edge, numerator, gap, bar, gap, denominator, edge */
  const capH = 0.73 * fs, gapB = Math.max(4, (h - 3 - 2 * capH) / 4);
  const mid = h / 2, yN = mid - 1.5 - gapB, yD = mid + 1.5 + gapB + capH, yIn = mid + 0.36 * fs;
  const total = ems * fs + pads - 24;
  let x = Math.max(8, (w - total) / 2);
  const stack = (cx: number, a: any, b: any, col: string) => (
    <g>
      <text x={cx} y={yN} textAnchor="middle" fontSize={fs} fontWeight={700} fill={col}>{a}</text>
      <line x1={cx - (fw(a, b) * fs + 8) / 2} y1={mid} x2={cx + (fw(a, b) * fs + 8) / 2} y2={mid} stroke={col} strokeWidth={3} strokeLinecap="round" />
      <text x={cx} y={yD} textAnchor="middle" fontSize={fs} fontWeight={700} fill={col}>{b}</text>
    </g>
  );
  const parts: any[] = [];
  if (left) { parts.push(<text key="l" x={x} y={yIn} fontSize={fs} fontWeight={700} fill={blue}>{isDec ? item.dec : item.whole}</text>); x += left * fs + 8; }
  if (isDec) {
    parts.push(<text key="e" x={x + 8} y={yIn} fontSize={fs} fontWeight={600} fill={C.ink}>=</text>); x += 0.6 * fs + 16;
    parts.push(<g key="f">{stack(x + (fw(A[0], A[1]) * fs + 8) / 2, A[0], A[1], green)}</g>);
  } else {
    parts.push(<g key="f">{stack(x + (fw(A[0], A[1]) * fs + 8) / 2, A[0], A[1], blue)}</g>); x += fw(A[0], A[1]) * fs + 8;
    if (!item.choices) { parts.push(<text key="e" x={x + 8} y={yIn} fontSize={fs} fontWeight={600} fill={C.ink}>=</text>); x += 0.6 * fs + 16; }
    else x += 14;
    parts.push(<text key="r" x={x} y={yIn} fontSize={fs} fontWeight={700} fill={green}>{item.choices ? tx("No") : item.answer}</text>);
  }
  const body = <g>{parts}</g>;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {body}
    </g>
  );
}

function FractionConverter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right */
      keyOnly: true,
      /* the wide keypad: the picture is laid out in a 900-wide frame, so it fits beside the 556-wide panel */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look): one small clickable dot per phase */
      navDots: true,
      /* the pad's point key on every question: placing the point IS this tool's lesson (phases 1 to 3 type a decimal) */
      pointKey: true,
      /* phase 4's fractions are written ON the second fraction card (PATTERNS §9e); 1/6's Yes and No stand in the key's corner */
      cardAnswer: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      }} />
  );
}

export default FractionConverter;
