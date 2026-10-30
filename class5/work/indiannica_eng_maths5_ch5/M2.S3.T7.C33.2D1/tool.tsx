/* ═══ M2.S3.T7.C33.2D1 · expanded_form · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, the keypad drawer, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30) and action-driven (r34).
   THE NEW LOOK (docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar (only the blinking key at the top
   right), four small clickable phase dots, a big ONE-sentence bubble, digits as written, every act performed on screen.
   NO imports in this file; only the five host hooks. Edit, never rewrite. Concepts are verbatim (check compares them).

   The picture: the decimal on digit tiles over a place strip (only the places the number uses, hundreds to
   thousandths, the point between ones and tenths), and under it the row of the phase's form, each part in the
   column of the digit it came from. Phases 1-3 open on the textbook's own example (6.83, 6.83, 5.08) for the
   guide steps (Split, then Join on phase 2: the hand pushes each part down, the pencil draws the sum line);
   each question then opens already split with ONE part asked: a place name (choice keys), a worth (on the
   Decimal card in the row) or a fraction (on the Fraction card). Phase 4 opens on 300 + 7 + 9/10 + 2/1000
   (Place: the hand sweeps the parts up into their places; Fill: the pencil writes the zeros); each question
   then has the child drag (or tap, then tap a place) the tray's parts onto the strip and write the standard
   form on the Decimal card beside the tray. */

const TOOL_ID = "expanded_form";
const MEDIA_ID = "M2.S3.T7.C33.2D1";
const TOOL_NAME = "Expanded Form Splitter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["One decimal, ready to be split three ways."];
/* the whole-tool line (no longer shown from r44; kept for the sidecar) */
const FINISH_LINE = "Three forms, one number, and it went back together.";
/* printed when the child opens Free play: exactly what free play offers */
const FREE_LINE = "Free play: tap a digit to change it, then tap Split or Build.";

/* THE START PAGE (docs/LAYOUT.md §1c): one question to wonder at, and the object: a decimal on its tiles, two of its forms */
const START_HOOK = "Can one decimal be written in three different ways?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const blueInk = shade(EF_BLUE, 0.25), greenInk = shade(EF_GREEN, 0.25);
  const cx = box.w / 2, tw = 118, cw = 210;
  const mids = [cx - cw - 12, cx + 12, cx + cw + 12];
  void lang;
  const digits = ["6", "8", "3"], names = ["ones", "tenths", "hundredths"];
  return (
    <g>
      {digits.map((d, i) => (
        <g key={i} filter="url(#fShadowSoft)">
          <rect x={mids[i] - tw / 2} y={6} width={tw} height={100} rx={RAD.piece} fill={EF_BLUE} stroke={shade(EF_BLUE, 0.3)} strokeWidth={2} />
          <text x={mids[i]} y={82} textAnchor="middle" fontSize={T.display} fontWeight={700} fill="#FFFFFF">{d}</text>
        </g>
      ))}
      <circle cx={(mids[0] + mids[1]) / 2} cy={92} r={10} fill={C.ink} />
      {names.map((nm, i) => (
        <text key={i} x={mids[i]} y={150} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(nm)}</text>
      ))}
      {["6", "0.8", "0.03"].map((s, i) => (
        <text key={i} x={mids[i]} y={222} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={greenInk}>{s}</text>
      ))}
      {[0, 1].map((i) => <text key={i} x={(mids[i] + mids[i + 1]) / 2} y={218} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>+</text>)}
      <text x={mids[0]} y={300} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={blueInk}>6</text>
      {[[8, 10], [3, 100]].map((f, i) => (
        <g key={i}>
          <text x={mids[i + 1]} y={276} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={blueInk}>{f[0]}</text>
          <rect x={mids[i + 1] - 40} y={286} width={80} height={4} rx={2} fill={blueInk} />
          <text x={mids[i + 1]} y={322} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={blueInk}>{f[1]}</text>
        </g>
      ))}
      {[0, 1].map((i) => <text key={i} x={(mids[i] + mids[i + 1]) / 2} y={296} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>+</text>)}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final. */
/* Terms (NCERT Class 5, one per idea): decimal दशमलव संख्या / દશાંશ સંખ્યા · decimal point दशमलव बिंदु / દશાંશ ચિહ્ન ·
   places सैकड़ा दहाई इकाई दशांश शतांश सहस्रांश / શતક દશક એકમ દશાંશ શતાંશ સહસ્રાંશ · place value form स्थानीय मान रूप /
   સ્થાન કિંમત રૂપ · decimal form दशमलव रूप / દશાંશ રૂપ · fractional form भिन्न रूप / અપૂર્ણાંક રૂપ · standard form मानक रूप /
   પ્રમાણિત રૂપ · fraction भिन्न / અપૂર્ણાંક · numerator अंश / અંશ · denominator (the bottom number) हर / છેદ · worth मान / કિંમત ·
   each प्रत्येक (never हर, which is the denominator) / દરેક · part भाग / ભાગ · strip पट्टी / પટ્ટી */
const TR: any = {
  hi: {
    "Expanded Form Splitter": "विस्तारित रूप में बाँटो",
    "Place value form": "स्थानीय मान रूप", "Decimal form": "दशमलव रूप", "Fractional form": "भिन्न रूप", "Back to standard form": "वापस मानक रूप में",
    "One decimal, ready to be split three ways.": "एक दशमलव संख्या, तीन तरह से बँटने को तैयार।",
    "Three forms, one number, and it went back together.": "तीन रूप, एक संख्या, और वह फिर से जुड़ गई।",
    "Free play: tap a digit to change it, then tap Split or Build.": "खुला खेल: अंक बदलने के लिए उस पर टैप करो, फिर बाँटो या बनाओ दबाओ।",
    "Can one decimal be written in three different ways?": "क्या एक दशमलव संख्या तीन अलग तरीकों से लिखी जा सकती है?",
    /* phase 1 */
    "Tap Split to bring each digit of 6.83 down with its place name.": "बाँटो दबाओ, 6.83 का प्रत्येक अंक अपने स्थान के नाम के साथ नीचे आएगा।",
    "The Split key is under the number.": "बाँटो बटन संख्या के नीचे है।",
    "A decimal is so many ones, tenths and hundredths.": "दशमलव संख्या में इतनी इकाई, दशांश और शतांश होते हैं।",
    "You learned: a decimal is so many ones, tenths and hundredths.": "तुमने सीखा: दशमलव संख्या में इकाई, दशांश और शतांश होते हैं।",
    "Finish the place value form of 9.47: the 7 is 7 what?": "9.47 का स्थानीय मान रूप पूरा करो: 7 किस स्थान का है?",
    "The 7 is 7 what?": "7 किस स्थान का?",
    "Yes, the 7 is 7 hundredths.": "हाँ, 7 यहाँ 7 शतांश है।",
    "Count the places after the point, starting next to it.": "दशमलव बिंदु के बाद के स्थान गिनो, उसके ठीक बगल से शुरू करके।",
    "The 7 is two places after the point, so count two places.": "7 दशमलव बिंदु के बाद दूसरे स्थान पर है, तो दो स्थान गिनो।",
    "One place after the point is tenths, and the next place is ten times smaller.": "दशमलव बिंदु के बाद पहला स्थान दशांश है, अगला उससे दस गुना छोटा है।",
    "Which place is the 5 of 2.56 in?": "2.56 का 5 किस स्थान पर है?",
    "The 5 is 5 what?": "5 किस स्थान का?",
    "Right, the 5 is 5 tenths.": "सही, 5 यहाँ 5 दशांश है।",
    "Places before the point count whole ones; places after it count parts of one.": "दशमलव बिंदु से पहले पूरे एक गिनते हैं, बाद में एक के भाग।",
    "The 5 is just after the point, where the place names end in ths.": "5 दशमलव बिंदु के ठीक बाद है, जहाँ स्थानों के नाम 'अंश' पर खत्म होते हैं।",
    "Ten of the first place after the point make one whole one.": "दशमलव बिंदु के बाद पहले स्थान के दस मिलकर एक पूरा बनाते हैं।",
    "Name the place of the 6 in 60.35.": "60.35 में 6 के स्थान का नाम बताओ।",
    "The 6 is 6 what?": "6 किस स्थान का?",
    "Yes, the 6 is 6 tens.": "हाँ, 6 यहाँ 6 दहाई है।",
    "Start at the point and count the places to the left.": "दशमलव बिंदु से शुरू करके बाईं ओर के स्थान गिनो।",
    "The 0 holds the ones place, and the 6 is one place to its left.": "0 इकाई का स्थान रखता है, और 6 उसके एक स्थान बाईं ओर है।",
    "Say the place names aloud from the ones to the left.": "इकाई से बाईं ओर के स्थानों के नाम ज़ोर से बोलो।",
    /* phase 2 */
    "Tap Split to bring down what each digit of 6.83 is worth.": "बाँटो दबाओ, 6.83 के प्रत्येक अंक का मान नीचे आएगा।",
    "Tap the Split key under the number.": "संख्या के नीचे वाला बाँटो बटन दबाओ।",
    "Now tap Join to add the parts back up.": "अब जोड़ो दबाओ और भागों को फिर से जोड़ो।",
    "Join adds the row: tap it.": "जोड़ो पंक्ति का योग करता है: उसे दबाओ।",
    "A decimal adds up what each digit is worth.": "दशमलव संख्या अपने प्रत्येक अंक के मान का योग है।",
    "You learned: a decimal adds up what each of its digits is worth.": "तुमने सीखा: दशमलव संख्या अपने अंकों के मानों का योग है।",
    "In the decimal form of 52.38, what is the 5 worth?": "52.38 के दशमलव रूप में 5 का मान क्या है?",
    "The 5 is worth?": "5 का मान?",
    "Yes, the 5 is worth 50.": "हाँ, 5 का मान 50 है।",
    "Find the place the 5 stands in before you write its worth.": "मान लिखने से पहले देखो कि 5 किस स्थान पर है।",
    "The 2 is in the ones; the 5 is the next place to the left.": "2 इकाई में है; 5 उससे अगले बाएँ स्थान पर है।",
    "Each place to the left is worth ten times the place on its right.": "प्रत्येक बायाँ स्थान अपने दाएँ स्थान से दस गुना होता है।",
    "What does the 1 in 3.19 add to the sum?": "3.19 का 1 योग में कितना जोड़ता है?",
    "The 1 is worth?": "1 का मान?",
    "Right, the 1 is worth 0.1.": "सही, 1 का मान 0.1 है।",
    "Look at which side of the point the 1 is on.": "देखो कि 1 दशमलव बिंदु के किस ओर है।",
    "Count the places after the point up to the 1.": "दशमलव बिंदु के बाद 1 तक के स्थान गिनो।",
    "The 1 is one of ten equal parts of a whole one: how do you write that part?": "1 एक पूरे के दस बराबर भागों में से एक है: उस भाग को कैसे लिखोगे?",
    "107.908 ends in an 8: what is it worth?": "107.908 के अंत में 8 है: उसका मान क्या है?",
    "The 8 is worth?": "8 का मान?",
    "Yes, that 8 is worth 0.008.": "हाँ, उस 8 का मान 0.008 है।",
    "Step from the point to the 8, and let the zero take a step too.": "दशमलव बिंदु से 8 तक कदम गिनो, शून्य का कदम भी गिनो।",
    "Each step you took is one digit after the point in its worth.": "प्रत्येक कदम उसके मान में दशमलव बिंदु के बाद का एक अंक है।",
    "Which places come between the point and the 8, and what is in each?": "दशमलव बिंदु और 8 के बीच कौन से स्थान हैं, और प्रत्येक में क्या है?",
    /* phase 3 */
    "Tap Split and watch what the zero in 5.08 does.": "बाँटो दबाओ और देखो कि 5.08 का शून्य क्या करता है।",
    "Split is the key under the number.": "बाँटो वाला बटन संख्या के नीचे है।",
    "Tenths go over 10, hundredths over 100, and a zero adds nothing.": "दशांश का हर 10, शतांश का हर 100 होता है, और शून्य कुछ नहीं जोड़ता।",
    "You learned: places after the point are over 10, 100 and 1000.": "तुमने सीखा: दशमलव बिंदु के बाद के स्थानों का हर 10, 100 और 1000 है।",
    "In the fractional form of 5.803, which fraction is the 3?": "5.803 के भिन्न रूप में 3 कौन सी भिन्न है?",
    "The 3 as a fraction?": "3 भिन्न के रूप में?",
    "Yes, the 3 is 3 thousandths.": "हाँ, 3 यहाँ 3 सहस्रांश है।",
    "Count the places after the point up to the 3, the zero too.": "दशमलव बिंदु के बाद 3 तक के स्थान गिनो, शून्य का स्थान भी।",
    "The zero holds the hundredths place, so the 3 is one place further on.": "शून्य शतांश का स्थान रखता है, तो 3 एक स्थान और आगे है।",
    "Each place further from the point adds one more 0 to the bottom number.": "दशमलव बिंदु से प्रत्येक अगला स्थान हर में एक और 0 जोड़ता है।",
    "Which fraction does the 4 of 1.84 stand for?": "1.84 का 4 कौन सी भिन्न दिखाता है?",
    "The 4 as a fraction?": "4 भिन्न के रूप में?",
    "Right, the 4 is 4 hundredths.": "सही, 4 यहाँ 4 शतांश है।",
    "The bottom number depends on the place the 4 is in.": "भिन्न का हर इस पर निर्भर है कि 4 किस स्थान पर है।",
    "Count from the point to the 4.": "दशमलव बिंदु से 4 तक गिनो।",
    "Tenths have one 0 in the bottom number: how many does the 4's place need?": "दशांश के हर में एक 0 होता है: 4 के स्थान को कितने 0 चाहिए?",
    "Write the 1 in 20.013 as a fraction.": "20.013 के 1 को भिन्न के रूप में लिखो।",
    "The 1 as a fraction?": "1 भिन्न के रूप में?",
    "Yes, the 1 is 1 hundredth.": "हाँ, 1 यहाँ 1 शतांश है।",
    "Start at the point and step right, one place at a time, to the 1.": "दशमलव बिंदु से दाईं ओर एक-एक स्थान चलकर 1 तक पहुँचो।",
    "The zero still holds the tenths place, so count its place too.": "शून्य फिर भी दशांश का स्थान रखता है, तो उसका स्थान भी गिनो।",
    "Tenths sit over 10: what goes under the place where the 1 is?": "दशांश का हर 10 है: 1 वाले स्थान के नीचे क्या आएगा?",
    /* phase 4 */
    "Tap Place and watch where the strip takes each part.": "रखो दबाओ और देखो कि पट्टी प्रत्येक भाग को कहाँ ले जाती है।",
    "Tap the Place key below the parts.": "भागों के नीचे वाला रखो बटन दबाओ।",
    "Now tap Fill to put a 0 in every empty place.": "अब भरो दबाओ, प्रत्येक खाली स्थान में 0 आएगा।",
    "Fill writes the zeros: tap it.": "भरो शून्य लिखता है: उसे दबाओ।",
    "Going back to standard form, a missing place gets a 0.": "मानक रूप में लौटते समय खाली स्थान में 0 आता है।",
    "You learned: going back, every missing place gets a 0.": "तुमने सीखा: वापस लिखते समय प्रत्येक खाली स्थान में 0 आता है।",
    "Put each part in its place, then write the number on the card.": "प्रत्येक भाग को उसके स्थान पर रखो, फिर संख्या कार्ड पर लिखो।",
    "Standard form?": "मानक रूप?",
    "Yes, two zeros hold the empty places.": "हाँ, दो शून्य खाली स्थानों को सँभालते हैं।",
    "Read the strip from the left, one digit for each place.": "पट्टी को बाईं ओर से पढ़ो, प्रत्येक स्थान का एक अंक।",
    "The 4 thousandths sits three places after the point.": "4 सहस्रांश दशमलव बिंदु के बाद तीसरे स्थान पर है।",
    "An empty place between two digits still needs a digit to hold it.": "दो अंकों के बीच के खाली स्थान को भी एक अंक चाहिए।",
    "Build 8 + 0.4 + 0.02 and write its standard form.": "8 + 0.4 + 0.02 बनाओ और उसका मानक रूप लिखो।",
    "Right, no place was empty this time.": "सही, इस बार कोई स्थान खाली नहीं था।",
    "Each part has one digit, so give each its own place.": "प्रत्येक भाग में एक अंक है, तो प्रत्येक को उसका अपना स्थान दो।",
    "The 2 of 0.02 is two places after the point.": "0.02 का 2 दशमलव बिंदु के बाद दूसरे स्थान पर है।",
    "Check every place from the first digit to the last: does each hold one?": "पहले अंक से आखिरी तक प्रत्येक स्थान देखो: क्या सब में एक अंक है?",
    "Last one: put these parts back together as one number.": "आखिरी: इन भागों को फिर से जोड़कर एक संख्या बनाओ।",
    "Yes, a 0 holds the tenths place open.": "हाँ, एक 0 दशांश का स्थान सँभालता है।",
    "Look along the strip for a place with no digit in it.": "पट्टी पर ऐसा स्थान ढूँढो जिसमें कोई अंक नहीं है।",
    "Find each part's place first, then look at the places between them.": "पहले प्रत्येक भाग का स्थान ढूँढो, फिर उनके बीच के स्थान देखो।",
    "How many places lie between the 3 and the 8, and what is in each?": "3 और 8 के बीच कितने स्थान हैं, और प्रत्येक में क्या है?",
    "Each part's own name tells you the place its digit goes in.": "प्रत्येक भाग खुद बताता है कि उसका अंक किस स्थान पर जाएगा।",
    "Place the parts first.": "पहले भागों को उनके स्थान पर रखो।",
    /* the picture's words, the keys and the aria labels */
    "hundreds": "सैकड़ा", "tens": "दहाई", "ones": "इकाई", "tenths": "दशांश", "hundredths": "शतांश", "thousandths": "सहस्रांश",
    "hundred": "सैकड़ा", "ten": "दहाई", "one": "इकाई", "tenth": "दशांश", "hundredth": "शतांश", "thousandth": "सहस्रांश",
    "is": "में", "adds nothing": "कुछ नहीं", "place holder": "स्थान धारक",
    "Split": "बाँटो", "Join": "जोड़ो", "Place": "रखो", "Fill": "भरो", "Build": "बनाओ",
    "Decimal card": "दशमलव कार्ड", "Fraction card": "भिन्न कार्ड", "whole number": "पूर्ण संख्या", "after the point": "दशमलव बिंदु के बाद",
    "numerator": "अंश", "denominator": "हर",
  },
  gu: {
    "Expanded Form Splitter": "વિસ્તૃત રૂપમાં વહેંચો",
    "Place value form": "સ્થાન કિંમત રૂપ", "Decimal form": "દશાંશ રૂપ", "Fractional form": "અપૂર્ણાંક રૂપ", "Back to standard form": "પાછું પ્રમાણિત રૂપમાં",
    "One decimal, ready to be split three ways.": "એક દશાંશ સંખ્યા, ત્રણ રીતે વહેંચાવા તૈયાર.",
    "Three forms, one number, and it went back together.": "ત્રણ રૂપ, એક સંખ્યા, અને તે ફરી જોડાઈ ગઈ.",
    "Free play: tap a digit to change it, then tap Split or Build.": "મુક્ત રમત: અંક બદલવા તેના પર ટૅપ કરો, પછી વહેંચો કે બનાવો દબાવો.",
    "Can one decimal be written in three different ways?": "શું એક દશાંશ સંખ્યા ત્રણ અલગ રીતે લખી શકાય?",
    /* phase 1 */
    "Tap Split to bring each digit of 6.83 down with its place name.": "વહેંચો દબાવો, 6.83 નો દરેક અંક તેના સ્થાનના નામ સાથે નીચે આવશે.",
    "The Split key is under the number.": "વહેંચો બટન સંખ્યાની નીચે છે.",
    "A decimal is so many ones, tenths and hundredths.": "દશાંશ સંખ્યામાં આટલા એકમ, દશાંશ અને શતાંશ હોય છે.",
    "You learned: a decimal is so many ones, tenths and hundredths.": "તમે શીખ્યા: દશાંશ સંખ્યામાં એકમ, દશાંશ અને શતાંશ હોય છે.",
    "Finish the place value form of 9.47: the 7 is 7 what?": "9.47 નું સ્થાન કિંમત રૂપ પૂરું કરો: 7 કયા સ્થાનનો છે?",
    "The 7 is 7 what?": "7 કયા સ્થાનનો?",
    "Yes, the 7 is 7 hundredths.": "હા, 7 અહીં 7 શતાંશ છે.",
    "Count the places after the point, starting next to it.": "દશાંશ ચિહ્ન પછીનાં સ્થાનો ગણો, તેની બરાબર બાજુથી શરૂ કરીને.",
    "The 7 is two places after the point, so count two places.": "7 દશાંશ ચિહ્ન પછી બીજા સ્થાને છે, તો બે સ્થાન ગણો.",
    "One place after the point is tenths, and the next place is ten times smaller.": "દશાંશ ચિહ્ન પછી પહેલું સ્થાન દશાંશ છે, પછીનું તેનાથી દસ ગણું નાનું છે.",
    "Which place is the 5 of 2.56 in?": "2.56 નો 5 કયા સ્થાને છે?",
    "The 5 is 5 what?": "5 કયા સ્થાનનો?",
    "Right, the 5 is 5 tenths.": "સાચું, 5 અહીં 5 દશાંશ છે.",
    "Places before the point count whole ones; places after it count parts of one.": "દશાંશ ચિહ્ન પહેલાં આખા એક ગણાય, પછી એકના ભાગ ગણાય.",
    "The 5 is just after the point, where the place names end in ths.": "5 દશાંશ ચિહ્નની બરાબર પછી છે, જ્યાં સ્થાનનાં નામ 'અંશ'થી પૂરાં થાય છે.",
    "Ten of the first place after the point make one whole one.": "દશાંશ ચિહ્ન પછીના પહેલા સ્થાનના દસ મળીને એક આખો બને છે.",
    "Name the place of the 6 in 60.35.": "60.35 માં 6 ના સ્થાનનું નામ કહો.",
    "The 6 is 6 what?": "6 કયા સ્થાનનો?",
    "Yes, the 6 is 6 tens.": "હા, 6 અહીં 6 દશક છે.",
    "Start at the point and count the places to the left.": "દશાંશ ચિહ્નથી શરૂ કરીને ડાબી બાજુનાં સ્થાનો ગણો.",
    "The 0 holds the ones place, and the 6 is one place to its left.": "0 એકમનું સ્થાન રાખે છે, અને 6 તેનાથી એક સ્થાન ડાબે છે.",
    "Say the place names aloud from the ones to the left.": "એકમથી ડાબી બાજુનાં સ્થાનોનાં નામ મોટેથી બોલો.",
    /* phase 2 */
    "Tap Split to bring down what each digit of 6.83 is worth.": "વહેંચો દબાવો, 6.83 ના દરેક અંકની કિંમત નીચે આવશે.",
    "Tap the Split key under the number.": "સંખ્યાની નીચેનું વહેંચો બટન દબાવો.",
    "Now tap Join to add the parts back up.": "હવે જોડો દબાવો અને ભાગોનો ફરી સરવાળો કરો.",
    "Join adds the row: tap it.": "જોડો હરોળનો સરવાળો કરે છે: તેને દબાવો.",
    "A decimal adds up what each digit is worth.": "દશાંશ સંખ્યા તેના દરેક અંકની કિંમતનો સરવાળો છે.",
    "You learned: a decimal adds up what each of its digits is worth.": "તમે શીખ્યા: દશાંશ સંખ્યા તેના અંકોની કિંમતોનો સરવાળો છે.",
    "In the decimal form of 52.38, what is the 5 worth?": "52.38 ના દશાંશ રૂપમાં 5 ની કિંમત શું છે?",
    "The 5 is worth?": "5 ની કિંમત?",
    "Yes, the 5 is worth 50.": "હા, 5 ની કિંમત 50 છે.",
    "Find the place the 5 stands in before you write its worth.": "કિંમત લખતાં પહેલાં જુઓ કે 5 કયા સ્થાને છે.",
    "The 2 is in the ones; the 5 is the next place to the left.": "2 એકમમાં છે; 5 તેની પછીના ડાબા સ્થાને છે.",
    "Each place to the left is worth ten times the place on its right.": "દરેક ડાબું સ્થાન તેના જમણા સ્થાન કરતાં દસ ગણું હોય છે.",
    "What does the 1 in 3.19 add to the sum?": "3.19 નો 1 સરવાળામાં કેટલું ઉમેરે છે?",
    "The 1 is worth?": "1 ની કિંમત?",
    "Right, the 1 is worth 0.1.": "સાચું, 1 ની કિંમત 0.1 છે.",
    "Look at which side of the point the 1 is on.": "જુઓ કે 1 દશાંશ ચિહ્નની કઈ બાજુ છે.",
    "Count the places after the point up to the 1.": "દશાંશ ચિહ્ન પછી 1 સુધીનાં સ્થાનો ગણો.",
    "The 1 is one of ten equal parts of a whole one: how do you write that part?": "1 એક આખાના દસ સરખા ભાગમાંથી એક છે: તે ભાગ કેવી રીતે લખશો?",
    "107.908 ends in an 8: what is it worth?": "107.908 ના અંતે 8 છે: તેની કિંમત શું છે?",
    "The 8 is worth?": "8 ની કિંમત?",
    "Yes, that 8 is worth 0.008.": "હા, તે 8 ની કિંમત 0.008 છે.",
    "Step from the point to the 8, and let the zero take a step too.": "દશાંશ ચિહ્નથી 8 સુધી પગલાં ગણો, શૂન્યનું પગલું પણ ગણો.",
    "Each step you took is one digit after the point in its worth.": "દરેક પગલું તેની કિંમતમાં દશાંશ ચિહ્ન પછીનો એક અંક છે.",
    "Which places come between the point and the 8, and what is in each?": "દશાંશ ચિહ્ન અને 8 વચ્ચે કયાં સ્થાનો છે, અને દરેકમાં શું છે?",
    /* phase 3 */
    "Tap Split and watch what the zero in 5.08 does.": "વહેંચો દબાવો અને જુઓ કે 5.08 નો શૂન્ય શું કરે છે.",
    "Split is the key under the number.": "વહેંચો વાળું બટન સંખ્યાની નીચે છે.",
    "Tenths go over 10, hundredths over 100, and a zero adds nothing.": "દશાંશનો છેદ 10, શતાંશનો છેદ 100 છે, અને શૂન્ય કંઈ ઉમેરતો નથી.",
    "You learned: places after the point are over 10, 100 and 1000.": "તમે શીખ્યા: દશાંશ ચિહ્ન પછીનાં સ્થાનોનો છેદ 10, 100 અને 1000 છે.",
    "In the fractional form of 5.803, which fraction is the 3?": "5.803 ના અપૂર્ણાંક રૂપમાં 3 કયો અપૂર્ણાંક છે?",
    "The 3 as a fraction?": "3 અપૂર્ણાંક તરીકે?",
    "Yes, the 3 is 3 thousandths.": "હા, 3 અહીં 3 સહસ્રાંશ છે.",
    "Count the places after the point up to the 3, the zero too.": "દશાંશ ચિહ્ન પછી 3 સુધીનાં સ્થાનો ગણો, શૂન્યનું સ્થાન પણ.",
    "The zero holds the hundredths place, so the 3 is one place further on.": "શૂન્ય શતાંશનું સ્થાન રાખે છે, તો 3 એક સ્થાન વધુ આગળ છે.",
    "Each place further from the point adds one more 0 to the bottom number.": "દશાંશ ચિહ્નથી દરેક આગલું સ્થાન છેદમાં એક વધુ 0 ઉમેરે છે.",
    "Which fraction does the 4 of 1.84 stand for?": "1.84 નો 4 કયો અપૂર્ણાંક દર્શાવે છે?",
    "The 4 as a fraction?": "4 અપૂર્ણાંક તરીકે?",
    "Right, the 4 is 4 hundredths.": "સાચું, 4 અહીં 4 શતાંશ છે.",
    "The bottom number depends on the place the 4 is in.": "છેદ એના પર આધાર રાખે છે કે 4 કયા સ્થાને છે.",
    "Count from the point to the 4.": "દશાંશ ચિહ્નથી 4 સુધી ગણો.",
    "Tenths have one 0 in the bottom number: how many does the 4's place need?": "દશાંશના છેદમાં એક 0 હોય છે: 4 ના સ્થાનને કેટલા 0 જોઈએ?",
    "Write the 1 in 20.013 as a fraction.": "20.013 ના 1 ને અપૂર્ણાંક તરીકે લખો.",
    "The 1 as a fraction?": "1 અપૂર્ણાંક તરીકે?",
    "Yes, the 1 is 1 hundredth.": "હા, 1 અહીં 1 શતાંશ છે.",
    "Start at the point and step right, one place at a time, to the 1.": "દશાંશ ચિહ્નથી જમણી બાજુ એક-એક સ્થાન ચાલીને 1 સુધી પહોંચો.",
    "The zero still holds the tenths place, so count its place too.": "શૂન્ય પણ દશાંશનું સ્થાન રાખે છે, તો તેનું સ્થાન પણ ગણો.",
    "Tenths sit over 10: what goes under the place where the 1 is?": "દશાંશનો છેદ 10 છે: 1 વાળા સ્થાનની નીચે શું આવશે?",
    /* phase 4 */
    "Tap Place and watch where the strip takes each part.": "મૂકો દબાવો અને જુઓ કે પટ્ટી દરેક ભાગને ક્યાં લઈ જાય છે.",
    "Tap the Place key below the parts.": "ભાગોની નીચેનું મૂકો બટન દબાવો.",
    "Now tap Fill to put a 0 in every empty place.": "હવે ભરો દબાવો, દરેક ખાલી સ્થાનમાં 0 આવશે.",
    "Fill writes the zeros: tap it.": "ભરો શૂન્ય લખે છે: તેને દબાવો.",
    "Going back to standard form, a missing place gets a 0.": "પ્રમાણિત રૂપમાં પાછા જતાં ખાલી સ્થાનમાં 0 આવે છે.",
    "You learned: going back, every missing place gets a 0.": "તમે શીખ્યા: પાછું લખતાં દરેક ખાલી સ્થાનમાં 0 આવે છે.",
    "Put each part in its place, then write the number on the card.": "દરેક ભાગને તેના સ્થાને મૂકો, પછી સંખ્યા કાર્ડ પર લખો.",
    "Standard form?": "પ્રમાણિત રૂપ?",
    "Yes, two zeros hold the empty places.": "હા, બે શૂન્ય ખાલી સ્થાનો સાચવે છે.",
    "Read the strip from the left, one digit for each place.": "પટ્ટી ડાબેથી વાંચો, દરેક સ્થાનનો એક અંક.",
    "The 4 thousandths sits three places after the point.": "4 સહસ્રાંશ દશાંશ ચિહ્ન પછી ત્રીજા સ્થાને છે.",
    "An empty place between two digits still needs a digit to hold it.": "બે અંક વચ્ચેના ખાલી સ્થાનને પણ એક અંક જોઈએ.",
    "Build 8 + 0.4 + 0.02 and write its standard form.": "8 + 0.4 + 0.02 બનાવો અને તેનું પ્રમાણિત રૂપ લખો.",
    "Right, no place was empty this time.": "સાચું, આ વખતે કોઈ સ્થાન ખાલી નહોતું.",
    "Each part has one digit, so give each its own place.": "દરેક ભાગમાં એક અંક છે, તો દરેકને તેનું પોતાનું સ્થાન આપો.",
    "The 2 of 0.02 is two places after the point.": "0.02 નો 2 દશાંશ ચિહ્ન પછી બીજા સ્થાને છે.",
    "Check every place from the first digit to the last: does each hold one?": "પહેલા અંકથી છેલ્લા સુધી દરેક સ્થાન જુઓ: શું દરેકમાં એક અંક છે?",
    "Last one: put these parts back together as one number.": "છેલ્લો: આ ભાગોને ફરી જોડીને એક સંખ્યા બનાવો.",
    "Yes, a 0 holds the tenths place open.": "હા, એક 0 દશાંશનું સ્થાન સાચવે છે.",
    "Look along the strip for a place with no digit in it.": "પટ્ટી પર એવું સ્થાન શોધો જેમાં કોઈ અંક નથી.",
    "Find each part's place first, then look at the places between them.": "પહેલાં દરેક ભાગનું સ્થાન શોધો, પછી તેમની વચ્ચેનાં સ્થાનો જુઓ.",
    "How many places lie between the 3 and the 8, and what is in each?": "3 અને 8 વચ્ચે કેટલાં સ્થાનો છે, અને દરેકમાં શું છે?",
    "Each part's own name tells you the place its digit goes in.": "દરેક ભાગ પોતે કહે છે કે તેનો અંક કયા સ્થાને જશે.",
    "Place the parts first.": "પહેલાં ભાગોને તેમના સ્થાને મૂકો.",
    /* the picture's words, the keys and the aria labels */
    "hundreds": "શતક", "tens": "દશક", "ones": "એકમ", "tenths": "દશાંશ", "hundredths": "શતાંશ", "thousandths": "સહસ્રાંશ",
    "hundred": "શતક", "ten": "દશક", "one": "એકમ", "tenth": "દશાંશ", "hundredth": "શતાંશ", "thousandth": "સહસ્રાંશ",
    "is": "માં", "adds nothing": "કંઈ નહીં", "place holder": "સ્થાન ધારક",
    "Split": "વહેંચો", "Join": "જોડો", "Place": "મૂકો", "Fill": "ભરો", "Build": "બનાવો",
    "Decimal card": "દશાંશ સંખ્યા કાર્ડ", "Fraction card": "અપૂર્ણાંક કાર્ડ", "whole number": "પૂર્ણ સંખ્યા", "after the point": "દશાંશ ચિહ્ન પછી",
    "numerator": "અંશ", "denominator": "છેદ",
  },
};

/* ── the place strip: hundreds to thousandths, the point between ones and tenths ── */
const EF_PLACES = ["hundreds", "tens", "ones", "tenths", "hundredths", "thousandths"];
const EF_ONE = ["hundred", "ten", "one", "tenth", "hundredth", "thousandth"];
const EF_BLUE = CONTENT.hundred, EF_GREEN = CONTENT.one, EF_AMBER = CONTENT.ten, EF_GREY = "#767676", EF_GREY_INK = "#666666";
/* the picture is laid out for the width the working area has with the keypad OPEN (1086, bigPad false), so it
   only slides (never resizes) when the keypad comes in */
const EF_OPEN = 1086, EF_ROOM = 1074, EF_LEAD = 34, EF_GAP = 24, EF_CWMAX = 214;
/* the vertical plan (Work units): tiles, the strip of place names, the zero zone (a zero's part drops only a little way),
   then the row of parts; every band 12 or more apart, sized for Devanagari and Gujarati too (1.09 em up, 0.40 em down) */
const EF_TOP = 98, EF_TH = 88;                                   /* the tiles sit under the key's corner (y 0 to 88) */
const EF_SY = 94, EF_SH = 60;                                    /* the strip of place names: top + 94, 60 tall */
const EF_ROW = 272;                                              /* the row of parts starts at top + 272 */
const EF_GHOST = "#8F7F66";                                      /* a dashed empty place or covered part: 3:1 or more on white */
const EF_DCW = 196, EF_DCH = 88, EF_FCW = 140, EF_FCH = 148, EF_SCW = 256, EF_SCH = 96;   /* the three cards */
const EF_KEYS: any = { split: "Split", join: "Join", place: "Place", fill: "Fill", build: "Build" };
const EF_KIND: any = { 1: "pv", 2: "dec", 3: "frac", 4: "std" };
const EF_WARM: any = { 1: "6.83", 2: "6.83", 3: "5.08" };          /* the textbook's own examples, for the guide steps */
const EF_WARM_GIVEN = [{ n: 300 }, { n: 7 }, { f: [9, 10] }, { f: [2, 1000] }];
const EF_CSS = "@keyframes efDrop{from{transform:translateY(-170px);opacity:.2}to{transform:none;opacity:1}}"
  + ".ef-drop{animation:efDrop 420ms ease-out both}@media (prefers-reduced-motion:reduce){.ef-drop{animation:none}}";

/* a decimal's digits by column (0 hundreds .. 5 thousandths); null where the number has no digit */
function efCols(dec: any): any[] {
  const out: any[] = [null, null, null, null, null, null];
  const [w = "", f = ""] = String(dec || "").split(".");
  const ws = w.slice(-3);
  for (let i = 0; i < ws.length; i++) out[3 - ws.length + i] = +ws[i];
  for (let i = 0; i < Math.min(3, f.length); i++) out[3 + i] = +f[i];
  return out;
}
const efParts = (ds: any[]) => ds.map((d: any, c: number) => ({ c, d })).filter((p: any) => p.d !== null && p.d !== undefined && p.d !== 0);
const efZeros = (ds: any[]) => ds.map((d: any, c: number) => (d === 0 ? c : -1)).filter((c: number) => c >= 0);
const efDigitCols = (ds: any[]) => ds.map((d: any, c: number) => (d !== null && d !== undefined ? c : -1)).filter((c: number) => c >= 0);
const efWorth = (c: number, d: number) => (c <= 2 ? String(d * Math.pow(10, 2 - c)) : "0." + "0".repeat(c - 3) + d);
const efName = (c: number, d: number) => (d === 1 ? EF_ONE[c] : EF_PLACES[c]);
const efFracOf = (c: number, d: number) => [d, Math.pow(10, c - 2)];
/* the columns a strip shows: from the first digit (or the ones) to the last (or the tenths) */
function efRange(ds: any[]) {
  const on = efDigitCols(ds);
  return { hi: Math.min(on.length ? on[0] : 2, 2), lo: Math.max(on.length ? on[on.length - 1] : 3, 3) };
}
/* the strip's geometry in working-area units, laid out in the OPEN width (one size and place, keypad open or shut).
   The tiles stand at an EVEN pitch (the point adds its own gap) whenever the place names fit it: the biggest size (34, or
   30 in Hindi and Gujarati, down to 28), then a little letter-spacing off, with two neighbours 14 apart. Six English names
   (hundreds to thousandths) do not fit an even pitch at the 28 floor in 1086 (measured: "thousandths" is 179 at 28 against
   a 169 pitch), so then each column is as wide as its name needs and the room left over evens them up. Measured widths:
   0.62 em a Latin letter (Poppins 600), up to 0.65 em a Devanagari or Gujarati code point (0.6 taken). */
function efLay(hi: number, lo: number, nameOf: (c: number) => string, lead: number, dev = false) {
  const cs: number[] = [];
  for (let c = hi; c <= lo; c++) cs.push(c);
  const avail = EF_ROOM - lead - EF_GAP, n = cs.length;
  const pitch = Math.min(EF_CWMAX, Math.floor(avail / n));
  const wOf = (c: number, f: number, ls: number) => String(nameOf(c)).length * (f * (dev ? 0.6 : 0.62) + ls);
  const fits = (f: number, ls: number) => cs.every((c, i) => wOf(c, f, ls) <= pitch - 12
    && (i === 0 || (wOf(cs[i - 1], f, ls) + wOf(c, f, ls)) / 2 + 14 <= pitch + (c === 3 ? EF_GAP : 0)));
  let fs = dev ? 30 : 34, ls = 0;
  while (fs > 28 && !fits(fs, 0)) fs -= 2;
  while (ls > -1.2 && !fits(fs, ls)) ls -= 0.4;
  let ws = cs.map(() => pitch);
  if (!fits(fs, ls)) {
    /* name-sized columns: the biggest size whose names fit the room, 32 first (the floor for strip names; six English
       names need 1004 of 1016 at 32 with -0.8 spacing), 28 only if even that does not fit */
    ls = -0.8;
    const sum = (a: number[]) => a.reduce((t, w) => t + w, 0);
    const needOf = (f: number) => cs.map((c) => Math.max(120, Math.ceil(wOf(c, f, ls)) + 24));
    fs = 32;
    while (fs > 28 && sum(needOf(fs)) > avail) fs -= 2;
    const need = needOf(fs);
    let lo2 = 0, hi2 = EF_CWMAX;
    for (let k = 0; k < 24; k++) { const t = (lo2 + hi2) / 2; if (sum(need.map((w) => Math.max(w, t))) <= avail) lo2 = t; else hi2 = t; }
    ws = need.map((w) => Math.floor(Math.max(w, lo2)));
  }
  const pw = lead + ws.reduce((t, w) => t + w, 0) + (hi <= 2 && lo >= 3 ? EF_GAP : 0);
  const x0 = Math.round(Math.max(4, (EF_OPEN - pw) / 2));
  const at: any = {};
  let x = x0 + lead;
  cs.forEach((c, i) => { if (c === 3 && hi <= 2) x += EF_GAP; at[c] = { l: x, w: ws[i] }; x += ws[i]; });
  const left = (c: number) => (at[c] ? at[c].l : x0), cwOf = (c: number) => (at[c] ? at[c].w : 0);
  return { hi, lo, fs, ls, pw, x0, left, cwOf, mid: (c: number) => left(c) + cwOf(c) / 2, pt: left(3) - EF_GAP / 2,
    end: left(lo) + cwOf(lo), minW: Math.min(...ws) };
}
/* a given part of an expanded form (400, 0.4, 4/1000) -> the one digit it puts in the strip, and where */
function efPlaceOf(g: any) {
  const th = g.n !== undefined ? g.n * 1000 : g.d !== undefined ? Math.round(parseFloat(g.d) * 1000) : Math.round((g.f[0] * 1000) / g.f[1]);
  const label = g.f ? g.f[0] + "/" + g.f[1] : g.d !== undefined ? String(g.d) : String(g.n);
  for (let c = 0; c < 6; c++) {
    const p = Math.pow(10, 5 - c);
    if (th % p === 0 && th / p >= 1 && th / p <= 9) return { f: g.f, n: g.n, dd: g.d, label, c, d: th / p };
  }
  return { f: g.f, n: g.n, dd: g.d, label, c: -1, d: 0 };
}
/* a decimal's parts the way the book builds it back: whole places as numbers, the rest as fractions */
const efStdParts = (ds: any[]) => efParts(ds).map((p: any) => (p.c <= 2 ? { n: p.d * Math.pow(10, 2 - p.c) } : { f: efFracOf(p.c, p.d) }));
/* the digit each part puts in each column, when every part sits in its own place */
function efOwn(gparts: any[]) {
  const ds: any[] = [null, null, null, null, null, null];
  gparts.forEach((g: any) => { if (g.c >= 0) ds[g.c] = g.d; });
  return ds;
}
/* the empty places a standard form needs a 0 in (between the first and last digit, and the ones) */
function efHoles(ds: any[]) {
  const on = efDigitCols(ds);
  if (!on.length) return [] as number[];
  const hi = Math.min(on[0], 2), lo = Math.max(on[on.length - 1], 2), out: number[] = [];
  for (let c = hi; c <= lo; c++) if (ds[c] === null || ds[c] === undefined) out.push(c);
  return out;
}
/* free play: six digits, hundreds to thousandths -> the decimal they make */
function efFreeDec(fd: number[]) {
  const w = fd.slice(0, 3).join("").replace(/^0+(?=\d)/, ""), f = fd.slice(3).join("").replace(/0+$/, "");
  return f ? w + "." + f : w;
}
/* at a question the strip hides every place name on the asked digit's side of the point (the child counts from the point) */
const efHidden = (c0: number) => (c0 < 0 ? [] : c0 >= 3 ? [3, 4, 5] : [0, 1, 2]);
const efKeyInk = (C: any) => (typeof toneInk === "function" ? toneInk("key", C.ink) : C.ink);

/* One entry per phase = one mount. Each phase opens on guide steps (the textbook's example), then three
   questions. Tool fields on an item: dec (the decimal on the tiles), col (the asked column, 0 hundreds ..
   5 thousandths), given (phase 4's parts), near (the item's misconception, which judge must reject). */
const PHASES = [
  {
    n: 1,
    concept: "Place value form",
    conceptId: "M2.S3.T7.C30", objectiveIds: ["O11"],
    says: ["Each digit takes its place name with it. Say them in order."],
    steps: [{ say: "Tap Split to bring each digit of 6.83 down with its place name.", on: "split", hint: "The Split key is under the number." }],
    ladder: [],   /* every question carries its own rungs (item.ladder) */
    closing: "A decimal is so many ones, tenths and hundredths.",
    learned: "You learned: a decimal is so many ones, tenths and hundredths.",
    traceback: "The hidden place names light up one by one from the point, and the asked part's name is written into the row.",
    items: [
      /* learn EF1: answer in the plan = 9.47 is 9 ones + 4 tenths + 7 hundredths (the row shows it; the 7's place is asked) */
      { qid: "M2.S3.T7.C30:EF1", kind: "pv", dec: "9.47", col: 4, choices: [{ id: "hundredths", label: "hundredths" }, { id: "tenths", label: "tenths" }, { id: "thousandths", label: "thousandths" }],
        say: "Finish the place value form of 9.47: the 7 is 7 what?", ask: "The 7 is 7 what?", win: "Yes, the 7 is 7 hundredths.", answer: "hundredths", near: "tenths",
        miss: "Count the places after the point, starting next to it.",
        ladder: ["The 7 is two places after the point, so count two places.", "One place after the point is tenths, and the next place is ten times smaller."] },
      /* practice 1: answer in the plan = 2.56 is 2 ones + 5 tenths + 6 hundredths (the 5's place is asked) */
      { qid: "M2.S3.T7.C30:1", kind: "pv", dec: "2.56", col: 3, choices: [{ id: "tens", label: "tens" }, { id: "hundredths", label: "hundredths" }, { id: "tenths", label: "tenths" }],
        say: "Which place is the 5 of 2.56 in?", ask: "The 5 is 5 what?", win: "Right, the 5 is 5 tenths.", answer: "tenths", near: "tens",
        miss: "Places before the point count whole ones; places after it count parts of one.",
        ladder: ["The 5 is just after the point, where the place names end in ths.", "Ten of the first place after the point make one whole one."] },
      /* practice 5: answer in the plan = 60.35 is 6 tens + 3 tenths + 5 hundredths. The 0 ones add nothing, so they can be left out (the 6's place is asked) */
      { qid: "M2.S3.T7.C30:5", kind: "pv", dec: "60.35", col: 1, choices: [{ id: "hundreds", label: "hundreds" }, { id: "tens", label: "tens" }, { id: "ones", label: "ones" }],
        say: "Name the place of the 6 in 60.35.", ask: "The 6 is 6 what?", win: "Yes, the 6 is 6 tens.", answer: "tens", near: "ones",
        miss: "Start at the point and count the places to the left.",
        ladder: ["The 0 holds the ones place, and the 6 is one place to its left.", "Say the place names aloud from the ones to the left."] },
    ],
  },
  {
    n: 2,
    concept: "Decimal form",
    conceptId: "M2.S3.T7.C31", objectiveIds: ["O11"],
    says: ["What is each digit worth? Add them back up."],
    steps: [
      { say: "Tap Split to bring down what each digit of 6.83 is worth.", on: "split", hint: "Tap the Split key under the number." },
      { say: "Now tap Join to add the parts back up.", on: "join", hint: "Join adds the row: tap it." },
    ],
    ladder: [],   /* every question carries its own rungs (item.ladder) */
    closing: "A decimal adds up what each digit is worth.",
    learned: "You learned: a decimal adds up what each of its digits is worth.",
    traceback: "The places after the point light up one by one up to the asked digit, and its worth is written on the Decimal card.",
    items: [
      /* learn EF2: answer in the plan = 52.38 = 50 + 2 + 0.3 + 0.08 (the 5's worth is asked: a whole number, typed on the
         pad, since the Decimal card does not take an empty box after the point; so the phase is not always "0 point ...") */
      { qid: "M2.S3.T7.C31:EF2", kind: "dec", dec: "52.38", col: 1, answer: 50, near: 5,
        say: "In the decimal form of 52.38, what is the 5 worth?", ask: "The 5 is worth?", win: "Yes, the 5 is worth 50.",
        miss: "Find the place the 5 stands in before you write its worth.",
        ladder: ["The 2 is in the ones; the 5 is the next place to the left.", "Each place to the left is worth ten times the place on its right."] },
      /* practice 2: answer in the plan = 3.19 = 3 + 0.1 + 0.09 (the 1's worth is asked) */
      { qid: "M2.S3.T7.C31:2", kind: "dec", dec: "3.19", col: 3, parts: SLOT_DECIMAL, answer: ["0", "1"], near: "1|",
        say: "What does the 1 in 3.19 add to the sum?", ask: "The 1 is worth?", win: "Right, the 1 is worth 0.1.",
        miss: "Look at which side of the point the 1 is on.",
        ladder: ["Count the places after the point up to the 1.", "The 1 is one of ten equal parts of a whole one: how do you write that part?"] },
      /* practice 6: answer in the plan = 107.908 = 100 + 7 + 0.9 + 0.008 (the 8's worth is asked) */
      { qid: "M2.S3.T7.C31:6", kind: "dec", dec: "107.908", col: 5, parts: SLOT_DECIMAL, answer: ["0", "008"], near: "0|08",
        say: "107.908 ends in an 8: what is it worth?", ask: "The 8 is worth?", win: "Yes, that 8 is worth 0.008.",
        miss: "Step from the point to the 8, and let the zero take a step too.",
        ladder: ["Each step you took is one digit after the point in its worth.", "Which places come between the point and the 8, and what is in each?"] },
    ],
  },
  {
    n: 3,
    concept: "Fractional form",
    conceptId: "M2.S3.T7.C32", objectiveIds: ["O11"],
    says: ["The zero adds nothing. Where does the eight go?"],
    steps: [{ say: "Tap Split and watch what the zero in 5.08 does.", on: "split", hint: "Split is the key under the number." }],
    ladder: [],   /* every question carries its own rungs (item.ladder) */
    closing: "Tenths go over 10, hundredths over 100, and a zero adds nothing.",
    learned: "You learned: places after the point are over 10, 100 and 1000.",
    traceback: "Each place after the point shows its denominator, the zero holding its place, and the asked part is written on the Fraction card.",
    items: [
      /* learn EF3: answer in the plan = 5.803 = 5 + 8/10 + 3/1000 (the 3, after the zero, is asked) */
      { qid: "M2.S3.T7.C32:EF3", kind: "frac", dec: "5.803", col: 5, parts: SLOT_FRACTION, answer: [3, 1000], near: "3|100",
        say: "In the fractional form of 5.803, which fraction is the 3?", ask: "The 3 as a fraction?", win: "Yes, the 3 is 3 thousandths.",
        miss: "Count the places after the point up to the 3, the zero too.",
        ladder: ["The zero holds the hundredths place, so the 3 is one place further on.", "Each place further from the point adds one more 0 to the bottom number."] },
      /* practice 4: answer in the plan = 1.84 = 1 + 8/10 + 4/100 (the 4 is asked) */
      { qid: "M2.S3.T7.C32:4", kind: "frac", dec: "1.84", col: 4, parts: SLOT_FRACTION, answer: [4, 100], near: "4|10",
        say: "Which fraction does the 4 of 1.84 stand for?", ask: "The 4 as a fraction?", win: "Right, the 4 is 4 hundredths.",
        miss: "The bottom number depends on the place the 4 is in.",
        ladder: ["Count from the point to the 4.", "Tenths have one 0 in the bottom number: how many does the 4's place need?"] },
      /* practice 8: answer in the plan = 20.013 = 20 + 1/100 + 3/1000 (the 1, after the zero, is asked) */
      { qid: "M2.S3.T7.C32:8", kind: "frac", dec: "20.013", col: 4, parts: SLOT_FRACTION, answer: [1, 100], near: "1|10",
        say: "Write the 1 in 20.013 as a fraction.", ask: "The 1 as a fraction?", win: "Yes, the 1 is 1 hundredth.",
        miss: "Start at the point and step right, one place at a time, to the 1.",
        ladder: ["The zero still holds the tenths place, so count its place too.", "Tenths sit over 10: what goes under the place where the 1 is?"] },
    ],
  },
  {
    n: 4,
    concept: "Back to standard form",
    conceptId: "M2.S3.T7.C33", objectiveIds: ["O12"],
    says: ["Put each part in its place. What goes where nothing is?"],
    stepHold: 2200,
    steps: [
      { say: "Tap Place and watch where the strip takes each part.", on: "place", hint: "Tap the Place key below the parts." },
      { say: "Now tap Fill to put a 0 in every empty place.", on: "fill", hint: "Fill writes the zeros: tap it." },
    ],
    ladder: [],   /* every question carries its own rungs (item.ladder) */
    closing: "Going back to standard form, a missing place gets a 0.",
    learned: "You learned: going back, every missing place gets a 0.",
    traceback: "Every part slides to the place it names, each empty place takes a grey 0, and the number is written on the Decimal card.",
    items: [
      /* learn EF4: answer in the plan = 406.104 (the plan: Write 400 + 6 + 1/10 + 4/1000 in standard form) */
      { qid: "M2.S3.T7.C33:EF4", kind: "std", given: [{ n: 400 }, { n: 6 }, { f: [1, 10] }, { f: [4, 1000] }], parts: SLOT_DECIMAL, answer: ["406", "104"], near: "406|14",
        say: "Put each part in its place, then write the number on the card.", ask: "Standard form?", win: "Yes, two zeros hold the empty places.",
        miss: "Read the strip from the left, one digit for each place.",
        ladder: ["The 4 thousandths sits three places after the point.", "An empty place between two digits still needs a digit to hold it."] },
      /* practice 3: answer in the plan = 8.42 (the plan: What is 8 + 0.4 + 0.02 in standard form?) */
      { qid: "M2.S3.T7.C33:3", kind: "std", given: [{ n: 8 }, { d: "0.4" }, { d: "0.02" }], parts: SLOT_DECIMAL, answer: ["8", "42"], near: "8|402",
        say: "Build 8 + 0.4 + 0.02 and write its standard form.", ask: "Standard form?", win: "Right, no place was empty this time.",
        miss: "Each part has one digit, so give each its own place.",
        ladder: ["The 2 of 0.02 is two places after the point.", "Check every place from the first digit to the last: does each hold one?"] },
      /* practice 7: answer in the plan = 53.081. There are no tenths, so a 0 goes in the tenths place (the plan: Write 50 + 3 + 8/100 + 1/1000 in standard form) */
      { qid: "M2.S3.T7.C33:7", kind: "std", given: [{ n: 50 }, { n: 3 }, { f: [8, 100] }, { f: [1, 1000] }], parts: SLOT_DECIMAL, answer: ["53", "081"], near: "53|81",
        say: "Last one: put these parts back together as one number.", ask: "Standard form?", win: "Yes, a 0 holds the tenths place open.",
        miss: "Look along the strip for a place with no digit in it.",
        ladder: ["Find each part's place first, then look at the places between them.", "How many places lie between the 3 and the 8, and what is in each?"] },
    ],
  },
];

/* each question waits for its own win line to be read (68 ms a character, 2.4 s at least) */
PHASES.forEach((p: any) => p.items.forEach((it: any) => { it.winMs = Math.max(2400, Math.ceil((String(it.win || "").length * 68) / 100) * 100); }));

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { places: EF_PLACES, wholePlaces: 3, decimalPlaces: 3, strip: { lead: EF_LEAD, evenPitchUpTo: EF_CWMAX, pointGap: EF_GAP, room: EF_ROOM },
  warmUps: { 1: "6.83", 2: "6.83", 3: "5.08", 4: "300 + 7 + 9/10 + 2/1000" },
  rows: ["Place value form", "Decimal form", "Fractional form"], tray: "phase 4 and Free play's Build: the parts of an expanded form",
  cards: { decimal: "phases 2 and 4: [whole] . [after the point]", fraction: "phase 3: numerator over denominator" } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a place name as written; a decimal card by its two boxes (the whole by value, the rest digit for digit); a fraction by its two numbers */
const judge = (item: any, v: any) => {
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;     /* a whole-number worth, typed on the pad */
  if (item.kind === "dec" || item.kind === "std") return judgeSlotDecimal(item, v);
  if (item.parts) return judgeSlotParts(item, v);
  return String(v ?? "").trim().toLowerCase() === String(item.answer);
};
/* oracle: every answer re-derived by arithmetic on the number, sharing no code with judge or Work */
const efOracleOne = (it: any) => {
  const thOf = (s: string) => Math.round(parseFloat(s) * 1000);
  if (it.kind === "std") {
    let t = 0;
    it.given.forEach((g: any) => { t += g.n !== undefined ? g.n * 1000 : g.d !== undefined ? thOf(g.d) : (g.f[0] * 1000) / g.f[1]; });
    const w = String(Math.floor(t / 1000)), f = String(t % 1000).padStart(3, "0").replace(/0+$/, "");
    return it.answer[0] === w && it.answer[1] === f && it.near !== w + "|" + f;
  }
  const t = thOf(it.dec), place = [100000, 10000, 1000, 100, 10, 1], p = place[it.col];
  const dig = Math.floor(t / p) % 10;
  const asked = /\b(\d) (is|as)\b/.exec(String(it.ask));
  if (!asked || +asked[1] !== dig || dig === 0) return false;
  if (it.kind === "pv") {
    const byPower: any = { 2: "hundreds", 1: "tens", 0: "ones", "-1": "tenths", "-2": "hundredths", "-3": "thousandths" };
    return byPower[Math.round(Math.log10(p)) - 3] === it.answer && it.near !== it.answer;
  }
  if (it.kind === "dec") {
    const worth = String((dig * p) / 1000).split(".");
    if (typeof it.answer === "number") return !worth[1] && it.answer === +worth[0] && it.near !== it.answer;
    return it.answer[0] === worth[0] && it.answer[1] === (worth[1] || "") && it.near !== it.answer.join("|");
  }
  if (it.kind === "frac") return it.answer[0] === dig && it.answer[1] === 1000 / p && it.near !== it.answer.join("|");
  return false;
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => efOracleOne(it)));
/* the item's misconception (judge must reject it) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.kind === "pv") return [String(item.answer)];
  if (item.kind === "frac") { const f = item.answer[0] + "/" + item.answer[1]; return [f, speakable(f)]; }
  const s = efCardText(item.answer);
  return [s, speakable(s)];
};
/* a Decimal card's two boxes as written: "0.08", or "50" when the box after the point stays empty */
const efCardText = (a: any) => (!Array.isArray(a) ? String(a) : a[1] === "" || a[1] === null || a[1] === undefined ? String(a[0]) : a[0] + "." + a[1]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : (HOOK.placeAll && HOOK.placeAll(), T.submit(item.answer)));
/* every answer goes the runtime's own way: a choice key, a card's two boxes (toolApi.answer takes "0.08" or [0, 8]) */
/* phase 4: the teacher agent sets the parts on the strip as a child would (the card waits for them), then types the number */
const answer = (item: any, v: any) => { void v; if (item.kind === "std" && HOOK.placeAll) HOOK.placeAll(); return undefined; };
/* the agent's check() before Enter: nothing waits on the picture, so press Enter (undefined in the guide steps too) */
const check = () => (HOOK.placeAll ? HOOK.placeAll() : undefined);

/* ── the working area: 1472 x 520 shut, 1086 x 520 open (keyOnly, bigPad false), origin at its top-left ── */
function Work({ phase, n, item, index, stage, wrong, typed, part, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = stage === "demo" || stage === "teach";  /* the guide steps: the textbook's own example (a phase opens on "teach" for a frame) */
  const kind = free ? "free" : EF_KIND[n] || item.kind;
  const solved = !free && !warm && (stage === "win" || stage === "idle");
  const asking = stage === "ask";
  const bw = box ? box.w : W.w, bh = box ? box.h : 520;
  const open = !!(box && box.open);
  const blueInk = shade(EF_BLUE, 0.25), greenInk = shade(EF_GREEN, 0.25), amberInk = shade(EF_AMBER, 0.45);
  void phase; void step; void lang;

  /* the child's state, fresh for the guide steps, for each question and for Free play */
  const sk = free ? "free" : warm ? "w" + n : "q" + n + "." + index;
  const fresh = (): any => ({ sk, drop: 0, split: false, lit: 0, joined: false, placed: {}, pick: -1, fill: 0, demo: null,
    fd: [0, 0, 6, 8, 3, 0], fmode: "" });
  const [raw, setRaw] = useState<any>(null);
  const S = raw && raw.sk === sk ? raw : fresh();
  const ref = useRef<any>(S);
  ref.current = S;
  const put = (o: any) => setRaw((r: any) => { const b = r && r.sk === sk ? r : fresh(); return { ...b, ...(typeof o === "function" ? o(b) : o) }; });
  const busy = useRef(false);
  busy.current = tl.busy;
  /* every act is performed on screen (PATTERNS §15): one at a time, the state changes only when it ends */
  const playing = useRef(false);
  const [acting, setActing] = useState(false);
  const perform = (o: any, done: () => void) => {
    if (playing.current || busy.current) return;
    playing.current = true;
    setActing(true);
    api.act(o).then((ok: boolean) => {
      playing.current = false;
      setActing(false);
      if (ok !== true) return;                          /* refused or ended (a phase change, a restart): change nothing */
      done();
      /* give the keyboard back: the key that started the act, or the next live key */
      setTimeout(() => {
        const k = document.querySelector('[data-ef-key] [data-control]') as any;
        if (k && k.focus) k.focus();
      }, 80);
    });
  };

  /* what the picture is about */
  const dec = free ? efFreeDec(S.fd) : warm ? EF_WARM[n] : item.dec;
  const building = kind === "std" || (free && S.fmode === "build");
  const gparts = kind === "std" ? (warm ? EF_WARM_GIVEN : item.given).map(efPlaceOf)
    : free ? efStdParts(efCols(dec)).map(efPlaceOf) : [];
  const cols = building ? efOwn(gparts) : efCols(dec);
  const parts = efParts(cols), zeroCols = efZeros(cols), digitCols = efDigitCols(cols);
  /* every place, hundreds to thousandths: free play (any digit can change), phase 1's questions (thousandths and hundreds
     are real choices) and all of phase 4 (the strip never gives away how many places the answer has) */
  const R = free || kind === "std" || (kind === "pv" && !warm) ? { hi: 0, lo: 5 } : efRange(cols);
  const askCol = !free && !warm && item && item.col !== undefined ? item.col : -1;
  /* ONE size and place with the keypad open or shut: laid out in the open width (1086), never from box.w */
  const dev = lang === "hi" || lang === "gu";
  const L = efLay(R.hi, R.lo, (c: number) => tx(EF_PLACES[c]), building ? 0 : EF_LEAD, dev);
  /* free play's Split has three rows to show; its picture never reaches x 1178, so it may rise beside the key's corner */
  const top = free && S.fmode !== "build" ? 30 : EF_TOP;
  const ROW = top + EF_ROW, SMID = top + EF_SY + EF_SH / 2;   /* the row of parts; the strip's middle line */
  const demo = S.demo || {};
  const placedIdx = Object.keys(S.placed).map((k) => S.placed[k]);
  const allIn = gparts.length > 0 && gparts.every((g: any, j: number) => placedIdx.includes(j));
  const holes = efHoles(efOwn(gparts));
  const splitNow = warm || free ? S.split : true;
  const dropped = (c: number) => splitNow || digitCols.indexOf(c) < S.drop;

  /* ── the acts (the hand pushes, the pencil draws, the hand sweeps; PATTERNS §15) ── */
  const doSplit = () => {
    if (ref.current.split) { if (warm) api.did("split"); return; }
    if (free && !digitCols.some((c: number) => cols[c] !== 0)) { api.sfx.tick(); return; }   /* all zeros: nothing to split */
    perform({ tool: "hand", moves: "push", at: digitCols.map((c: number) => ({ x: L.mid(c), y: top + EF_TH - 12 })),
      onPoint: (i: number) => { put({ drop: i + 1 }); api.sfx.tick(); } },
      () => { put({ split: true, drop: 99, fmode: free ? "split" : "" }); api.sfx.settle(); if (warm) api.did("split"); });
  };
  const doJoin = () => {
    if (ref.current.joined) { api.did("join"); return; }
    perform({ tool: "pencil", moves: "draw", from: { x: L.left(R.hi), y: ROW + 92 }, to: { x: L.end, y: ROW + 92 },
      at: parts.map((p: any) => ({ x: L.mid(p.c), y: ROW + 92 })),
      onPoint: (i: number) => { put({ lit: i + 1 }); api.sfx.tick(); } },
      () => { put({ joined: true, lit: 99 }); api.sfx.settle(); api.did("join"); });
  };
  const trayXY = (j: number) => ({ x: tray.x(j) + tray.tw / 2, y: tray.y + tray.th / 2 });
  const doPlace = () => {
    if (allIn) { api.did("place"); return; }
    perform({ tool: "hand", moves: "sweep", at: gparts.map((g: any, j: number) => trayXY(j)),
      onPoint: (i: number) => { put((b: any) => ({ placed: { ...b.placed, [gparts[i].c]: i } })); api.sfx.tick(); } },
      () => { const pl: any = {}; gparts.forEach((g: any, j: number) => { pl[g.c] = j; }); put({ placed: pl }); api.sfx.settle(); api.did("place"); });
  };
  const doFill = () => {
    if (ref.current.fill >= 99) { api.did("fill"); return; }
    perform({ tool: "pencil", moves: "draw", at: holes.map((c: number) => ({ x: L.mid(c), y: top + EF_TH / 2 })),
      onPoint: (i: number) => { put({ fill: i + 1 }); api.sfx.tick(); } },
      () => { put({ fill: 99 }); api.sfx.settle(); api.did("fill"); });
  };
  const doBuild = () => {
    if (!parts.length) { api.sfx.tick(); return; }                  /* all zeros: no parts to build with */
    perform({ tool: "hand", moves: "sweep", at: digitCols.map((c: number) => ({ x: L.mid(c), y: top + EF_TH / 2 })) },
      () => { put({ fmode: "build", placed: {}, pick: -1, split: false, drop: 0 }); api.sfx.settle(); });
  };
  const doAct = (on: any) => {
    if (on === "split") doSplit();
    else if (on === "join") doJoin();
    else if (on === "place") doPlace();
    else if (on === "fill") doFill();
    else if (on === "build") doBuild();
  };
  /* ONE key for the sequence (Split, then Join; Place, then Fill), at the bottom centre; a 400 ms guard, shared with Enter */
  const lastKey = useRef(0);
  const pressKey = (id: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    if (warm && id !== stepOn) { api.did(id); return; }   /* only the step's own key acts; any other is a wrong act */
    if (free && id === "split" && ref.current.fmode === "build") { put({ fmode: "", split: false, drop: 0 }); setTimeout(() => doAct("split"), 0); return; }
    if (free && id === "build" && ref.current.fmode === "build") return;
    doAct(id);
  };
  /* Enter and the agent's check() perform the current guide step (through the same guard); the dev solve() directly */
  api.onEnter(warm && stepOn ? () => pressKey(stepOn) : null);
  HOOK.demo = () => { if (warm && stepOn) doAct(stepOn); };
  /* (phase 4) every part to its own place; returns undefined so Enter follows */
  HOOK.placeAll = () => {
    if (kind !== "std" || stage !== "ask") return undefined;
    const pl: any = {};
    gparts.forEach((g: any, j: number) => { pl[g.c] = j; });
    put({ placed: pl, pick: -1 });
    return undefined;
  };

  /* ── phase 4 and Free play's Build: drag a part to a place, or tap it and then tap a place ── */
  const canBuild = !solved && !acting && ((kind === "std" && asking) || (free && S.fmode === "build" && !allIn));
  const tray = (() => {
    /* the gap holds a + clear of a ringed card (12+ each side): as wide as the room allows, 44 to 64 */
    const np = gparts.length, tw = np >= 4 ? 140 : 146, th = 108;
    const side = kind === "std" ? 88 + EF_SCW : 88 + 220;
    const tg = np > 1 ? Math.max(44, Math.min(64, Math.floor((EF_OPEN - 8 - side - np * tw) / (np - 1)))) : 44;
    const trayW = np * tw + Math.max(0, np - 1) * tg;
    const gx = Math.round(Math.max(4, (EF_OPEN - (trayW + side)) / 2));
    const y = top + EF_SY + EF_SH + 12 + 40 + 12;                   /* under the correction's row of chips */
    return { np, tw, th, tg, trayW, gx, y, x: (j: number) => gx + j * (tw + tg), eqX: gx + trayW + 44, cardX: gx + trayW + 88,
      cardY: y + (th - EF_SCH) / 2 };
  })();
  /* phase 4 refuses a part dropped in the WRONG place: it goes back to the tray, that place flashes, a hint shows,
     and nothing else changes (the brief's second wrong path); free play takes any place */
  const refuseT = useRef<any>(null);
  /* the refusal's hint stands in the bubble in place of the question until the child's next act (a part, the card, a key) */
  const hintUp = useRef(false);
  const restoreQ = () => { if (hintUp.current) { hintUp.current = false; if (free) api.say(FREE_LINE); else if (stage === "ask" && item) api.say(item.say); } };
  useEffect(() => { hintUp.current = false; }, [sk]);
  useEffect(() => {
    if (stage === "ask" && kind === "std" && !allIn && !wrong) return;   /* the card still waits: "Place the parts first." stays up (a stray digit opened the pad) */
    if (String(typed ?? "") !== "" || open) restoreQ();
  }, [typed, open]);   /* (a typed digit cleared by the card's wait keeps its hint) */
  const place = (j: number, c: number) => {
    if (building && gparts[j] && gparts[j].c !== c) {
      if (refuseT.current) clearTimeout(refuseT.current);
      put({ pick: -1, refused: { j, c } });
      api.sfx.settle();                                   /* neutral: nothing is marked wrong */
      api.say("Each part's own name tells you the place its digit goes in.");
      hintUp.current = true;
      refuseT.current = setTimeout(() => put({ refused: null }), 900);
      return;
    }
    restoreQ();
    put((b: any) => { const pl: any = { ...b.placed }; Object.keys(pl).forEach((k) => { if (pl[k] === j) delete pl[k]; }); pl[c] = j; return { placed: pl, pick: -1, demo: null, refused: null }; });
    api.sfx.tick();
  };
  const colAt = (at: any) => {
    if (!at || !isFinite(at.x) || !isFinite(at.y) || at.y < top - 40 || at.y > top + EF_SY + EF_SH) return -1;   /* the band ends at the strip */
    for (let c = R.hi; c <= R.lo; c++) {
      const a = L.left(c) - (c === 3 ? EF_GAP / 2 : 0), z = L.left(c) + L.cwOf(c) + (c === 2 ? EF_GAP / 2 : 0);
      if (at.x >= a && at.x < z) return c;
    }
    return -1;
  };
  const lastTap = useRef<any>({ j: -1, t: 0 });
  const drag = useDrag((pay: any, at: any, moved: boolean) => {
    if (!pay || pay.t !== "part" || !canBuild || busy.current) return;
    if (!moved || !at || !isFinite(at.x)) {
      const t = Date.now();
      if (lastTap.current.j === pay.j && t - lastTap.current.t < 350) return;   /* a double tap on one part is one tap */
      lastTap.current = { j: pay.j, t };
      restoreQ();
      put((b: any) => ({ pick: b.pick === pay.j ? -1 : pay.j, demo: null })); api.sfx.tick(); return;
    }
    const c = colAt(at);
    if (c < 0) { put({ pick: -1 }); return; }
    place(pay.j, c);
  });
  const lastCol = useRef<any>({ c: -1, t: 0 });
  const colPress = (c: number) => {
    const s = ref.current, t = Date.now();
    if (!canBuild || busy.current) return;
    if (lastCol.current.c === c && t - lastCol.current.t < 350) return;   /* a double tap places once, never places-then-removes */
    lastCol.current = { c, t };
    if (s.pick >= 0) { place(s.pick, c); return; }
    if (s.placed[c] !== undefined) { put((b: any) => { const pl: any = { ...b.placed }; delete pl[c]; return { placed: pl, demo: null }; }); api.sfx.tick(); }
  };
  /* free play: a tap on a tile changes its digit */
  const lastTile = useRef<any>({ c: -1, t: 0 });
  const cycle = (c: number) => {
    const t = Date.now();
    if (playing.current || (lastTile.current.c === c && t - lastTile.current.t < 350)) return;
    lastTile.current = { c, t };
    put((b: any) => { const fd = b.fd.slice(); fd[c] = (fd[c] + 1) % 10; return { fd }; });
    api.sfx.tick();
    setTimeout(() => { const e = document.querySelector('[data-control="tile-' + (c + 1) + '"]') as any; if (e && e.focus) e.focus(); }, 0);
  };

  /* the traceback: redraws the maths in steps and ends on the whole right answer (PATTERNS §7) */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    const at = String(typed ?? "");
    const steps: any[] = [];
    if (kind === "pv") {
      const c0 = item.col, path = c0 >= 3 ? [3, 4, 5].filter((c) => c <= c0) : [2, 1, 0].filter((c) => c >= c0);
      path.forEach((c, k) => steps.push([560, () => { put({ demo: { hl: c, reveal: path.slice(0, k + 1) } }); api.sfx.tick(); }]));
      steps.push([420, () => put({ demo: { hl: c0, reveal: efHidden(c0), fill: true } })]);
    } else if (kind === "dec") {
      /* the places are counted from the point to the asked digit (to the right after it, to the left before it), each name shown */
      const c0 = item.col, path = c0 >= 3 ? [3, 4, 5].filter((c) => c <= c0) : [2, 1, 0].filter((c) => c >= c0);
      path.forEach((c, k) => steps.push([560, () => { put({ demo: { hl: c, path, count: k + 1, reveal: path.slice(0, k + 1) } }); api.sfx.tick(); }]));
      steps.push([420, () => put({ demo: { hl: c0, path, count: path.length, reveal: efHidden(c0), card: true, at } })]);
    } else if (kind === "frac") {
      const dcs = [3, 4, 5].filter((c) => c <= R.lo);
      dcs.forEach((c, k) => steps.push([560, () => { put({ demo: { den: dcs.slice(0, k + 1), hl: c } }); api.sfx.tick(); }]));
      steps.push([420, () => put({ demo: { den: dcs, hl: item.col, card: true, at } })]);
    } else if (kind === "std") {
      /* the correct row is built in a row of its own under the strip; the child's own placed parts are never moved */
      steps.push([300, () => put({ pick: -1, demo: { row: 0, zeros: 0 } })]);
      gparts.forEach((g: any, j: number) => steps.push([420, () => { put({ demo: { row: j + 1, zeros: 0 } }); api.sfx.tick(); }]));
      holes.forEach((c: number, k: number) => steps.push([480, () => { put({ demo: { row: gparts.length, zeros: k + 1 } }); api.sfx.tick(); }]));
      steps.push([400, () => put({ demo: { row: gparts.length, zeros: holes.length, card: true, at } })]);
    }
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* phase 4: the Decimal card waits (no blink, no tap target, a typed digit not taken) until every part is on the strip; after
     a miss the correction has shown them, so it is ready again. The tool holds it itself: on r64 api.cardReady(false) does not
     stop a physical digit (it opens the keypad and types), and the runtime keeps that flag into the next questions */
  /* at most 4 digits a box: a longer number would overprint its box */
  useEffect(() => {
    const t = String(typed ?? "");
    /* (phase 4) a digit typed while the card waits is not taken: it is cleared and the bubble says why */
    if (stage === "ask" && kind === "std" && !allIn && !wrong && t.replace(/\|/g, "").length === 1) {   /* a first keystroke, never a whole submitted answer */
      api.setTyped("");
      api.say("Place the parts first."); hintUp.current = true;
      return;
    }
    if (stage !== "ask" || !t || !(item.parts || typeof item.answer === "number") || !/^[\d|]+$/.test(t)) return;   /* digits only, never a choice */
    const ps = t.split("|");
    if (ps.some((x) => x.length > 4)) api.setTyped(ps.map((x) => x.slice(0, 4)).join("|"));
  }, [typed]);

  /* a right answer: the total lands under the row (phase 2), the empty places take their zeros (phase 4) */
  useEffect(() => {
    if (stage !== "win" || free) return;
    if (item && item.win) api.say(item.win);            /* the question's own win line (a phase's last gives way to its closing) */
    const steps: any[] = [];
    const count = kind === "std" ? holes.length : kind === "dec" ? 1 : 0;
    for (let j = 1; j <= count; j++) steps.push([340, () => { put({ lit: j }); api.sfx.tick(); }]);
    steps.push([200, () => put({ lit: 99 })]);
    tl.run(steps);
  }, [stage, index]);

  /* what the host and the agent read back (toolApi.getState): only what the child has given */
  api.share({
    decimal: building ? null : dec, split: building ? null : !!splitNow, freeMode: free ? S.fmode || "split" : null,
    zeros: building ? null : zeroCols.map((c: number) => EF_PLACES[c]),
    tray: building ? gparts.filter((g: any, j: number) => !placedIdx.includes(j)).map((g: any) => g.label) : null,
    placed: building ? Object.keys(S.placed).map((c) => ({ place: EF_PLACES[+c], part: gparts[S.placed[c]] ? gparts[S.placed[c]].label : "" })) : null,
    complete: stage === "idle",
  });

  /* ── drawing (helpers are called, never mounted) ── */
  const txt = (x: number, y: number, s: any, size: number, fill: string, o: any = {}) => (
    <text x={x} y={y} textAnchor={o.anchor || "middle"} fontSize={size} fontWeight={o.weight || 600} fill={fill} letterSpacing={o.ls}>{s}</text>
  );
  const fit = (s: any, w: number, max: number, min = 28) => Math.max(min, Math.min(max, Math.floor(w / (Math.max(1, String(s).length) * 0.56))));
  const tw = Math.min(132, L.minW - 22);
  const plus = (x: number, y: number, k: string) => <g key={k}>{txt(x, y, "+", T.label, C.ink, { weight: 700 })}</g>;
  /* the + between two parts of a row: at the point when it crosses it, else at the column edge, kept 16 clear of a wide
     card or a dashed box; past a skipped zero column it stands just left of the next part, clear of "adds nothing" */
  const halfW = (c: number) => (c === askCol && kind === "dec" ? (typeof item.answer === "number" ? 70 : EF_DCW / 2)
    : c === askCol && kind === "frac" ? EF_FCW / 2 : (kind === "dec" || kind === "frac") && veiled(c) ? (kind === "frac" ? 60 : Math.min(L.cwOf(c) - 24, 140) / 2) : 0);
  const plusX = (c: number, c2: number) => {
    const gap = (k: number) => (k === askCol && kind !== "pv" ? 30 : 16);     /* a card wears a blinking ring: more room */
    const right = L.mid(c) + halfW(c) + gap(c), left = L.mid(c2) - halfW(c2) - gap(c2);
    if (c <= 2 && c2 >= 3) return right > left ? (right + left) / 2 : Math.max(right, Math.min(L.pt, left));   /* at the point, but clear of a card */
    if (c2 - c > 1) return Math.min(L.left(c2) + 10, left);
    const edge = L.left(c) + L.cwOf(c);
    return Math.max(right, Math.min(edge, left));
  };

  const tiles = (ds: any[], o: any = {}) => (
    <g>
      {Array.from({ length: R.lo - R.hi + 1 }, (_, k) => R.hi + k).map((c: number) => {
        const d = ds[c], x = L.mid(c) - tw / 2, y = top;
        if (d === null || d === undefined) {
          const hole = o.holes && o.holes.includes(c);
          return <rect key={"e" + c} x={x} y={y} width={tw} height={EF_TH} rx={RAD.piece} fill="#FFFFFF"
            stroke={o.pickOn ? EF_AMBER : hole ? EF_GREY : EF_GHOST} strokeWidth={o.pickOn ? 4 : 3} strokeDasharray={o.pickOn ? undefined : "10 8"} />;
        }
        const zero = d === 0, on = o.lit ? o.lit(c) : false, ring = zero && o.amberZero && c >= 3;
        const fill = zero ? EF_GREY : on ? EF_GREEN : EF_BLUE;
        return (
          <g key={"t" + c} filter="url(#fShadowSoft)">
            <rect x={x} y={y} width={tw} height={EF_TH} rx={RAD.piece} fill={fill} stroke={ring ? EF_AMBER : shade(fill, 0.3)} strokeWidth={ring ? 6 : 2} />
            {txt(L.mid(c), y + 70, d, T.display, "#FFFFFF", { weight: 700 })}
          </g>
        );
      })}
      <circle cx={L.pt} cy={top + 74} r={9} fill={C.ink} />
    </g>
  );
  /* a line of text centred on the middle line `cy` by its ink: Latin caps rise 0.7 em, Devanagari and Gujarati 1.09 em and
     fall 0.40 em, so the baseline sits 0.35 em under the middle in every script */
  const midBase = (cy: number, fs: number) => cy + 0.35 * fs;
  const strip = (o: any = {}) => (
    <g>
      <rect x={L.left(R.hi) - 4} y={top + EF_SY} width={L.end - L.left(R.hi) + 8} height={EF_SH} rx={14} fill={tint(C.panel, 0.35)} stroke={C.rule} strokeWidth={2} />
      {Array.from({ length: R.lo - R.hi + 1 }, (_, k) => R.hi + k).map((c: number) => {
        const nm = tx(EF_PLACES[c]), hide = o.hide ? o.hide(c) : false;
        return (
          <g key={c}>
            {o.hl === c && <rect x={L.left(c) + 4} y={top + EF_SY + 3} width={L.cwOf(c) - 8} height={EF_SH - 6} rx={12} fill={tint(EF_AMBER, 0.55)} stroke={EF_AMBER} strokeWidth={3} />}
            {o.den && o.den.includes(c) ? (
              /* the correction of phase 3: the place shows its denominator, the bottom of a fraction */
              <g>
                <rect x={L.mid(c) - 34} y={SMID - 18} width={68} height={4} rx={2} fill={C.ink} />
                {txt(L.mid(c), SMID + 20, Math.pow(10, c - 2), T.label, C.ink, { weight: 700 })}
              </g>
            ) : hide ? (o.ask === c ? txt(L.mid(c), midBase(SMID, T.label), "?", T.label, amberInk, { weight: 700 }) : null)
              : txt(L.mid(c), midBase(SMID, L.fs), nm, L.fs, C.ink, { ls: L.ls || undefined })}
          </g>
        );
      })}
    </g>
  );
  /* a zero's part drops only a little way: a grey 0 in the zero zone under the strip, "adds nothing" under it on one
     line (32 bold; it may run past its own column, whose neighbours hold nothing at that height) */
  const capFs = lang === "gu" ? 34 : T.label;
  const zeroPart = (c: number, k: string) => (
    <g key={k} className="ef-drop">
      {txt(L.mid(c), top + 201, "0", 48, EF_GREY_INK, { weight: 700 })}
      {txt(L.mid(c), top + (dev ? 252 : 238), tx("adds nothing"), capFs, EF_GREY_INK, { weight: 700 })}
    </g>
  );
  const dashed = (cx: number, y: number, w: number, h: number, k: string) => (
    <rect key={k} x={cx - w / 2} y={y} width={w} height={h} rx={12} fill="none" stroke={EF_GHOST} strokeWidth={3} strokeDasharray="10 8" />
  );
  /* "is" / "=" stands just left of the number's first digit column (the strip may show empty places before it) */
  const signAt = (s: string, y: number) => txt(Math.max(L.x0 + EF_LEAD / 2, (digitCols.length ? L.left(digitCols[0]) : L.x0 + EF_LEAD) - 22), y, s, T.label, C.ink, { weight: 700 });
  /* a fraction stacked tight by its digits' ink (cap height 0.72 em): numerator, a bar, denominator; `top0` is the ink top */
  const stacked = (cx: number, top0: number, a: any, b: any, ink: string, size = 48) => {
    const cap = 0.72 * size, bw = Math.max(String(a).length, String(b).length) * size * 0.6 + 16;
    return (
      <g>
        {txt(cx, top0 + cap, a, size, ink, { weight: 700 })}
        <rect x={cx - bw / 2} y={top0 + cap + 9} width={bw} height={5} rx={2.5} fill={ink} />
        {txt(cx, top0 + 2 * cap + 23, b, size, ink, { weight: 700 })}
      </g>
    );
  };
  const stackH = (size = 48) => 2 * 0.72 * size + 23;
  const caret = (x: number, y: number, h: number) => <rect className="c4-caret" x={x} y={y} width={4} height={h} rx={2} fill={C.accent} />;
  /* a number set inside a box: its own size, stepping down to fit the box (never under 28) */
  const inBox = (s: string, w: number, fs: number) => Math.max(28, Math.min(fs, Math.floor((w - 16) / (Math.max(1, s.length) * 0.66))));   /* digits: 0.66 em in Poppins 700 */

  /* the cards a question is answered on (PATTERNS §9e): drawn by the tool, the runtime's SlotPartBox and BlinkRing on them */
  const showFix = !!(demo.card && wrong && String(typed ?? "") === demo.at);
  const cardVals = (): any[] => {
    if (solved || showFix) return item.answer.map((v: any) => String(v));
    const ps = slotPartsOf(typed, 2) || [];
    return [0, 1].map((j) => (ps[j] === null || ps[j] === undefined ? "" : String(ps[j])));
  };
  const cardInk = solved || showFix ? greenInk : C.ink;
  const cardEdge = solved || showFix ? EF_GREEN : EF_BLUE;
  const cardLive = asking && !busy.current && !acting;
  /* phase 4: the Decimal card waits until every part is on the strip (or after a miss, when the correction has shown them) */
  const cardWait = kind === "std" && asking && !allIn && !wrong;
  const decCard = (x: number, y: number, w: number, h: number, vals: any[], o: any = {}) => {
    const pad = 6, pg = 22, ww = o.ww, dw = w - 2 * pad - pg - ww, by = y + pad, bh2 = h - 2 * pad;
    const bx = [x + pad, x + pad + ww + pg], bws = [ww, dw];
    const act = o.live && open ? part : -1;
    const fs = Math.min(inBox(String(vals[0] || ""), bws[0], o.fs), inBox(String(vals[1] || ""), bws[1], o.fs));   /* one size for both boxes */
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={16} fill="#FFFFFF" stroke={o.edge || C.rule} strokeWidth={3} />
        {[0, 1].map((j) => (
          <rect key={"b" + j} x={bx[j]} y={by} width={bws[j]} height={bh2} rx={10} fill={act === j ? "#FFFFFF" : tint(C.panel, 0.55)}
            stroke={act === j ? C.accent : C.rule} strokeWidth={act === j ? 4 : 2} />
        ))}
        <circle cx={x + pad + ww + pg / 2} cy={by + bh2 - 14} r={6.5} fill={C.ink} />
        {[0, 1].map((j) => vals[j] !== "" && <g key={"v" + j}>{txt(bx[j] + bws[j] / 2, by + bh2 / 2 + fs * 0.36, vals[j], fs, o.ink || C.ink, { weight: 700 })}</g>)}
        {act >= 0 && caret(bx[act] + bws[act] / 2 + String(vals[act] || "").length * fs * 0.3 + 4, by + 12, bh2 - 24)}
        {o.live && !open && <g><BlinkRing x={x - 6} y={y - 6} w={w + 12} h={h + 12} /><SlotPartBox id="answer-open" x={x} y={y} w={w} h={Math.max(72, h)} onPick={api.openAnswer} label={tx("Decimal card")} /></g>}
        {o.live && open && [0, 1].map((j) => {
          const sx = x + Math.max(72, pad + ww + pg / 2);   /* the finger boxes split at the point, each 72 wide or more */
          return <SlotPartBox key={"p" + j} id={"part-" + (j + 1)} x={j ? sx : x} y={y} w={j ? x + w - sx : sx - x} h={Math.max(72, h)}
            onPick={() => api.pickPart(j)} label={tx(j ? "after the point" : "whole number")} />;
        })}
        {o.wait && <Hit id="card-wait" x={x} y={y} w={w} h={Math.max(72, h)} label={tx("Decimal card")}
          onPress={() => { api.say("Place the parts first."); hintUp.current = true; }} />}
      </g>
    );
  };
  const fracCard = (cx: number, y: number, vals: any[], o: any = {}) => {
    const w = EF_FCW, x = cx - w / 2, bh2 = 58;
    const ys = [y + 6, y + EF_FCH - 6 - bh2];
    const act = o.live && open ? part : -1;
    const fs = Math.min(inBox(String(vals[0] || ""), w - 16, 48), inBox(String(vals[1] || ""), w - 16, 48));
    return (
      <g>
        <rect x={x} y={y} width={w} height={EF_FCH} rx={16} fill="#FFFFFF" stroke={o.edge || C.rule} strokeWidth={3} />
        {[0, 1].map((j) => (
          <rect key={"b" + j} x={x + 8} y={ys[j]} width={w - 16} height={bh2} rx={10} fill={act === j ? "#FFFFFF" : tint(C.panel, 0.55)}
            stroke={act === j ? C.accent : C.rule} strokeWidth={act === j ? 4 : 2} />
        ))}
        <rect x={x + 14} y={y + EF_FCH / 2 - 2.5} width={w - 28} height={5} rx={2.5} fill={C.ink} />
        {[0, 1].map((j) => vals[j] !== "" && <g key={"v" + j}>{txt(cx, ys[j] + bh2 / 2 + fs * 0.36, vals[j], fs, o.ink || C.ink, { weight: 700 })}</g>)}
        {act >= 0 && caret(cx + String(vals[act] || "").length * fs * 0.3 + 4, ys[act] + 10, bh2 - 20)}
        {o.live && !open && <g><BlinkRing x={x - 6} y={y - 6} w={w + 12} h={EF_FCH + 12} /><SlotPartBox id="answer-open" x={x} y={y} w={w} h={EF_FCH} onPick={api.openAnswer} label={tx("Fraction card")} /></g>}
        {o.live && open && [0, 1].map((j) => (
          <SlotPartBox key={"p" + j} id={"part-" + (j + 1)} x={x} y={j ? y + EF_FCH / 2 : y} w={w} h={EF_FCH / 2} onPick={() => api.pickPart(j)} label={tx(j ? "denominator" : "numerator")} />
        ))}
      </g>
    );
  };

  /* phase 1: the place value form: "is", then each digit with its place name; the asked name is a ? */
  const pvRow = () => {
    const c0 = askCol, hid = c0 >= 0 ? efHidden(c0) : [];
    const chipY = ROW + 56, chipH = 58, chipMid = chipY + chipH / 2;
    return (
      <g>
        {signAt(tx("is"), ROW + 44)}
        {parts.map((p: any, j: number) => {
          if (!dropped(p.c)) return null;
          const ask = p.c === c0, done = solved || (ask && demo.fill);
          const shown = !hid.includes(p.c) || solved || (demo.reveal && demo.reveal.includes(p.c));
          const nm = tx(efName(p.c, p.d)), cw2 = L.cwOf(p.c) - 12;
          const nxt = parts[j + 1];
          return (
            <g key={"p" + p.c} className="ef-drop">
              {txt(L.mid(p.c), ROW + 44, p.d, T.xl, done && ask ? greenInk : C.ink, { weight: 700 })}
              <rect x={L.mid(p.c) - cw2 / 2} y={chipY} width={cw2} height={chipH} rx={12} fill="#FFFFFF"
                stroke={ask && !done ? EF_AMBER : ask ? EF_GREEN : C.rule} strokeWidth={ask ? 4 : 2} />
              {ask && !done ? txt(L.mid(p.c), midBase(chipMid, T.label), "?", T.label, amberInk, { weight: 700 })
                : (shown || done) && txt(L.mid(p.c), midBase(chipMid, L.fs), nm, L.fs, done && ask ? greenInk : C.ink, { ls: L.ls || undefined })}
              {nxt && dropped(nxt.c) && plus(plusX(p.c, nxt.c), ROW + 38, "+" + p.c)}
            </g>
          );
        })}
        {zeroCols.map((c: number) => dropped(c) && zeroPart(c, "z" + c))}
      </g>
    );
  };

  /* phases 2 and 3: at a question the other parts on the asked digit's side of the point stay covered (dashed) until
     the answer or the correction, so no neighbour pre-empts the count; the correction shows the whole row */
  /* a whole-number worth asked on the pad: its box in the row shows ? until the child types, then the typed number;
     the answer (green) at the win and in the correction, until the child types again */
  const padBox = (cx: number, w: number) => {
    const fixed = solved || showFix, t = String(typed ?? "");
    const s = fixed ? String(item.answer) : t !== "" ? t : "?";
    const fs = s === "?" ? T.label : inBox(s, w, T.xl);
    return (
      <g>
        <rect x={cx - w / 2} y={ROW} width={w} height={76} rx={12} fill="#FFFFFF" stroke={fixed ? EF_GREEN : EF_AMBER} strokeWidth={4} />
        {txt(cx, ROW + 38 + fs * 0.36, s, fs, fixed ? greenInk : s === "?" ? amberInk : C.ink, { weight: 700 })}
      </g>
    );
  };
  const veiled = (c: number) => askCol >= 0 && c !== askCol && efHidden(askCol).includes(c) && !solved && !demo.card;
  /* phase 2: the decimal form: "=", then what each digit is worth; the asked worth is the Decimal card */
  const decRow = () => {
    const showSum = (warm && (S.joined || S.lit > 0)) || (solved && S.lit >= 1);
    return (
      <g>
        {signAt("=", ROW + 48)}
        {parts.map((p: any, j: number) => {
          if (!dropped(p.c)) return null;
          const ask = p.c === askCol;
          const nxt = parts[j + 1];
          const w0 = efWorth(p.c, p.d);
          return (
            <g key={"p" + p.c} className="ef-drop">
              {ask && typeof item.answer === "number" ? padBox(L.mid(p.c), Math.min(EF_DCW - 32, L.cwOf(p.c) - 24))
                : ask ? decCard(L.mid(p.c) - EF_DCW / 2, ROW - 6, EF_DCW, EF_DCH, cardVals(), { ww: 58, fs: 48, ink: cardInk, edge: cardEdge, live: cardLive })
                : veiled(p.c) ? dashed(L.mid(p.c), ROW + 2, Math.min(L.cwOf(p.c) - 24, 140), 72, "d" + p.c)
                : txt(L.mid(p.c), ROW + 52, w0, fit(w0, L.cwOf(p.c) - 44, T.xl), C.ink, { weight: 700 })}
              {nxt && dropped(nxt.c) && plus(plusX(p.c, nxt.c), ROW + 44, "+" + p.c)}
            </g>
          );
        })}
        {zeroCols.map((c: number) => dropped(c) && zeroPart(c, "z" + c))}
        {showSum && (
          <g pointerEvents="none">
            <rect x={L.left(R.hi) + 8} y={ROW + 90} width={(S.joined || solved ? L.end : L.mid(parts[Math.min(parts.length, Math.max(1, S.lit)) - 1].c) + 30) - L.left(R.hi) - 8} height={5} rx={2.5} fill={greenInk} />
            {(S.joined || solved) && txt(L.x0 + EF_LEAD + (L.pw - EF_LEAD) / 2, ROW + 138, dec, 48, greenInk, { weight: 700 })}
          </g>
        )}
        {/* the correction: the places from the point are counted up to the asked digit */}
        {!solved && demo.count && (
          <g pointerEvents="none">
            {(demo.path || []).slice(0, demo.count).map((c: number, k: number) => (
              <g key={"n" + c}>
                <circle cx={L.mid(c)} cy={top - 34} r={27} fill="#FFFFFF" stroke={EF_AMBER} strokeWidth={3} />
                {txt(L.mid(c), top - 34 + 13, k + 1, 36, amberInk, { weight: 700 })}
              </g>
            ))}
          </g>
        )}
      </g>
    );
  };

  /* phase 3: the fractional form: "=", the whole number, then each place after the point as a fraction */
  const fracRow = () => {
    const wcols = [0, 1, 2].filter((c) => cols[c] !== null);
    const whole = parseInt(String(dec).split(".")[0] || "0", 10);
    const wx = wcols.length ? (L.mid(wcols[0]) + L.mid(2)) / 2 : L.mid(2);
    const fps = parts.filter((p: any) => p.c >= 3), fz = zeroCols.filter((c: number) => c >= 3);
    const wholeOn = whole > 0 && dropped(2);
    const fTop = ROW + 4, fMid = fTop + stackH() / 2;            /* the fractions' ink box, and its middle line */
    return (
      <g>
        {signAt("=", midBase(fMid, T.label))}
        {wholeOn && <g className="ef-drop">{txt(wx, midBase(fMid, T.xl) - 4, whole, T.xl, C.ink, { weight: 700 })}</g>}
        {wholeOn && fps.length > 0 && dropped(fps[0].c) && plus(L.pt, midBase(fMid, T.label), "w+")}
        {fps.map((p: any, j: number) => {
          if (!dropped(p.c)) return null;
          const [a, b] = efFracOf(p.c, p.d), ask = p.c === askCol;
          const nxt = fps[j + 1];
          return (
            <g key={"f" + p.c} className="ef-drop">
              {ask ? fracCard(L.mid(p.c), ROW - 10, cardVals(), { ink: cardInk, edge: cardEdge, live: cardLive })
                : veiled(p.c) ? dashed(L.mid(p.c), fTop - 4, 120, stackH() + 8, "d" + p.c)
                : stacked(L.mid(p.c), fTop, a, b, C.ink)}
              {nxt && dropped(nxt.c) && plus(plusX(p.c, nxt.c), midBase(fMid, T.label), "+" + p.c)}
            </g>
          );
        })}
        {fz.map((c: number) => dropped(c) && zeroPart(c, "z" + c))}
      </g>
    );
  };

  /* phases 1-3: the decimal on its tiles, over the strip, and the phase's row under it */
  const splitView = () => {
    const hid = efHidden(askCol);
    const hideName = (c: number) => hid.includes(c) && !solved && !(demo.reveal && demo.reveal.includes(c));
    const hl = demo.hl !== undefined && !solved ? demo.hl : -1;
    const litTile = (c: number) => kind === "dec" && ((warm && (S.joined || parts.findIndex((p: any) => p.c === c) < S.lit) && parts.some((p: any) => p.c === c)) || (solved && S.lit >= 1 && c !== 99 && parts.some((p: any) => p.c === c)));
    return (
      <g>
        {tiles(cols, { amberZero: kind === "frac", lit: litTile })}
        {strip({ hide: hideName, ask: kind === "pv" ? askCol : -1, hl, den: !solved && demo.den ? demo.den : null })}
        {kind === "pv" ? pvRow() : kind === "dec" ? decRow() : fracRow()}
      </g>
    );
  };

  /* phase 4 and Free play's Build: the parts go back onto an empty strip */
  const buildView = () => {
    const own = efOwn(gparts);
    const ds: any[] = [null, null, null, null, null, null];
    if (solved) gparts.forEach((g: any) => { ds[g.c] = g.d; });
    else Object.keys(S.placed).forEach((c) => { const g = gparts[S.placed[c]]; if (g) ds[+c] = g.d; });
    const zn = solved ? (S.lit >= 99 ? 99 : S.lit) : warm ? S.fill : free && allIn ? 99 : 0;
    const zcols = holes.slice(0, zn);
    const fixRow = !solved && demo.row !== undefined;
    const rf = S.refused;
    const dragging = drag.drag && drag.drag.moved && drag.drag.payload ? drag.drag : null;
    const firstFree = gparts.findIndex((g: any, j: number) => !placedIdx.includes(j));
    const read = (solved && S.lit >= 99) || (warm && S.fill >= 99) || (free && allIn);
    const cardY = tray.cardY, cardX = tray.cardX;
    const chipY = top + EF_SY + EF_SH + 12, chipH = 40;              /* the correction's row, 12 under the strip, 12 over the tray */
    return (
      <g>
        {tiles(ds, { pickOn: canBuild && S.pick >= 0, holes: zcols })}
        <g pointerEvents="none">
          {zcols.map((c: number) => (
            <g key={"z" + c} className="ef-drop">
              <rect x={L.mid(c) - tw / 2} y={top} width={tw} height={EF_TH} rx={RAD.piece} fill={EF_GREY} stroke={shade(EF_GREY, 0.3)} strokeWidth={2} />
              {txt(L.mid(c), top + 70, "0", T.display, "#FFFFFF", { weight: 700 })}
              {/* "place holder" stands over its tile, on one line (nothing else is drawn above the tiles in this phase) */}
              {txt(L.mid(c), top - 14, tx("place holder"), capFs, EF_GREY_INK, { weight: 700 })}
            </g>
          ))}
        </g>
        {strip({})}
        {rf && <rect x={L.mid(rf.c) - tw / 2 - 5} y={top - 5} width={tw + 10} height={EF_TH + 10} rx={RAD.piece + 4} fill="none" stroke={EF_AMBER} strokeWidth={5} pointerEvents="none" />}
        {/* the correction: the correct row, built in a row of its own under the strip (each part to its place, a grey 0
            in every empty place between), so the child's own placed parts are never moved */}
        {fixRow && (
          <g pointerEvents="none">
            {Array.from({ length: R.lo - R.hi + 1 }, (_, k) => R.hi + k).map((c: number) => {
              const j = gparts.findIndex((g: any) => g.c === c), hz = holes.indexOf(c);
              const on = j >= 0 && j < demo.row, zero = hz >= 0 && hz < demo.zeros;
              if (!on && !zero) return null;
              return (
                <g key={"f" + c} className="ef-drop">
                  <rect x={L.mid(c) - tw / 2} y={chipY} width={tw} height={chipH} rx={12} fill={zero ? tint(EF_GREY, 0.85) : tint(EF_GREEN, 0.85)} stroke={zero ? EF_GREY : EF_GREEN} strokeWidth={2.5} />
                  {txt(L.mid(c), chipY + chipH / 2 + 13, zero ? 0 : gparts[j].d, T.label + 4, zero ? EF_GREY_INK : greenInk, { weight: 700 })}
                </g>
              );
            })}
            {demo.row > 0 && <circle cx={L.pt} cy={chipY + chipH - 8} r={6} fill={C.ink} />}
          </g>
        )}
        {/* the tray: the expanded form, its parts joined by plus signs */}
        {gparts.map((g: any, j: number) => {
          const x0 = tray.x(j), y0 = tray.y, away = solved || placedIdx.includes(j);
          const sign = j < gparts.length - 1 ? plus(x0 + tray.tw + tray.tg / 2, y0 + tray.th / 2 + 12, "tp" + j) : null;
          const picked = S.pick === j || (rf && rf.j === j);
          /* a part already on the strip stays readable in the sum (a dashed, quiet card), so the expanded form never vanishes */
          const face = (
            <g>
              <rect x={x0} y={y0} width={tray.tw} height={tray.th} rx={14} fill={away ? tint(C.panel, 0.6) : "#FFFFFF"}
                stroke={away ? EF_GHOST : picked ? EF_AMBER : EF_BLUE} strokeWidth={away ? 3 : picked ? 6 : 3} strokeDasharray={away ? "10 8" : undefined} />
              {g.f ? stacked(x0 + tray.tw / 2, y0 + (tray.th - stackH()) / 2, g.f[0], g.f[1], blueInk)
                : txt(x0 + tray.tw / 2, y0 + tray.th / 2 + 20, g.label, fit(g.label, tray.tw - 30, T.xl), blueInk, { weight: 700 })}
            </g>
          );
          if (away) return <g key={"s" + j}>{face}{sign}</g>;
          const me = dragging && dragging.payload.t === "part" && dragging.payload.j === j;
          const dx = me ? dragging.x - (x0 + tray.tw / 2) : 0, dy = me ? dragging.y - (y0 + tray.th / 2) : 0;
          return (
            <g key={"g" + j}>
              {canBuild ? (
                <g className="c4-piece" {...control("tray-" + (j + 1), g.label)} {...drag.bind({ t: "part", j })} {...drag.keys({ t: "part", j })}
                  transform={`translate(${dx},${dy})`} filter={me ? "url(#fLift)" : "url(#fShadowSoft)"}>{face}</g>
              ) : <g filter="url(#fShadowSoft)">{face}</g>}
              {sign}
            </g>
          );
        })}
        {canBuild && kind === "std" && !wrong && !placedIdx.length && S.pick < 0 && firstFree >= 0 && invite(tray.x(firstFree), tray.y, tray.tw, tray.th, 14)}
        {canBuild && Array.from({ length: R.lo - R.hi + 1 }, (_, k) => R.hi + k).filter((c) => S.pick >= 0 || S.placed[c] !== undefined).map((c: number) => (
          <Hit key={"c" + c} id={"place-" + (c + 1)} x={L.left(c) + 4} y={top} w={L.cwOf(c) - 8} h={EF_TH} onPress={() => colPress(c)}
            label={tx(EF_PLACES[c])} />
        ))}
        {/* the standard form: the Decimal card beside the tray, 12 or more clear of its ring (free play: the number read off the strip) */}
        {gparts.length > 0 && txt(tray.eqX, tray.y + tray.th / 2 + 20, "=", T.xl, C.ink, { weight: 700 })}
        {kind === "std" && decCard(cardX, cardY, EF_SCW, EF_SCH, warm ? (S.fill >= 99 ? efOwnText(own) : ["", ""]) : cardVals(),
          { ww: 108, fs: 48, ink: warm ? greenInk : cardInk, edge: warm && S.fill >= 99 ? EF_GREEN : cardEdge, live: cardLive && !cardWait, wait: cardWait && cardLive })}
        {free && read && txt(cardX + 6, tray.y + tray.th / 2 + 20, efReadText(efOwn(gparts)), T.xl, greenInk, { anchor: "start", weight: 700 })}
      </g>
    );
  };

  /* Free play: the six tiles change by a tap; Split shows the three forms at once; Build sends the parts to the tray */
  const freeRows = () => {
    if (!parts.length) return null;                                 /* all zeros: nothing to split, no signs dangling */
    /* three rows under the strip, all above the keys: "6 ones", "0.8", then the fractions */
    const y1 = top + 196, yn = y1 + (dev ? 42 : 32), y2 = top + 286, yf = top + 304;
    const wcols = [0, 1, 2].filter((c) => cols[c] !== null);
    const whole = parseInt(String(dec).split(".")[0] || "0", 10);
    const wx = wcols.length ? (L.mid(wcols[0]) + L.mid(2)) / 2 : L.mid(2);
    const fps = parts.filter((p: any) => p.c >= 3);
    const fMid = yf + stackH(32) / 2;
    return (
      <g pointerEvents="none">
        {signAt(tx("is"), y1)}
        {parts.map((p: any, j: number) => {
          const nm = tx(efName(p.c, p.d));
          return (
            <g key={"a" + p.c}>
              {txt(L.mid(p.c), y1, p.d, T.label, C.ink, { weight: 700 })}
              {txt(L.mid(p.c), yn, nm, fit(nm, L.cwOf(p.c) - 16, 30), C.ink, { weight: 600, ls: L.ls || undefined })}
              {parts[j + 1] && plus(plusX(p.c, parts[j + 1].c), y1 - 2, "a+" + p.c)}
            </g>
          );
        })}
        {signAt("=", y2)}
        {parts.map((p: any, j: number) => (
          <g key={"b" + p.c}>
            {txt(L.mid(p.c), y2, efWorth(p.c, p.d), fit(efWorth(p.c, p.d), L.cwOf(p.c) - 44, T.label), C.ink, { weight: 700 })}
            {parts[j + 1] && plus(plusX(p.c, parts[j + 1].c), y2, "b+" + p.c)}
          </g>
        ))}
        {signAt("=", midBase(fMid, T.label))}
        {whole > 0 && txt(wx, midBase(fMid, T.label), whole, T.label, C.ink, { weight: 700 })}
        {whole > 0 && fps.length > 0 && plus(L.pt, midBase(fMid, T.label), "c+w")}
        {fps.map((p: any, j: number) => {
          const [a, b] = efFracOf(p.c, p.d);
          return (
            <g key={"c" + p.c}>
              {stacked(L.mid(p.c), yf, a, b, C.ink, 32)}
              {fps[j + 1] && plus(plusX(p.c, fps[j + 1].c), midBase(fMid, T.label), "c+" + p.c)}
            </g>
          );
        })}
      </g>
    );
  };
  const freeView = () => {
    if (S.fmode === "build") return buildView();
    return (
      <g>
        {tiles(cols, {})}
        {strip({})}
        {S.split && freeRows()}
        {!acting && Array.from({ length: R.lo - R.hi + 1 }, (_, k) => R.hi + k).map((c: number) => (
          <Hit key={"t" + c} id={"tile-" + (c + 1)} x={L.mid(c) - tw / 2} y={top} w={tw} h={EF_TH} onPress={() => cycle(c)} label={tx(EF_PLACES[c])} />
        ))}
      </g>
    );
  };

  /* the one invite: the runtime's ring hugging the piece's own box (x, y its centre; PATTERNS §18) */
  function invite(x: number, y: number, w: number, h: number, rx: number) {
    return <Invite x={x + w / 2} y={y + h / 2} w={w} h={h} rx={rx} C={C} />;
  }
  /* the key at the bottom centre: the guide step's act (Split, then Join; Place, then Fill); in free play Split and Build.
     It stands down while an act plays (the act locks it anyway), so a part landing in the row never runs under it */
  const keyIds: string[] = acting ? [] : free ? ["split", "build"] : warm && stepOn && EF_KEYS[stepOn] ? [stepOn] : [];
  const kw = 240, kh = 72, kg = 28, ky = bh - kh - 4;
  const kx0 = Math.round((EF_OPEN - (keyIds.length * kw + Math.max(0, keyIds.length - 1) * kg)) / 2);   /* under the picture */
  const keys = () => (
    <g data-ef-key="1">
      {keyIds.map((id: string, j: number) => (
        <Key key={"act" + j} id={id} label={tx(EF_KEYS[id])} x={kx0 + j * (kw + kg)} y={ky} w={kw} h={kh} C={C} tone="key" onClick={() => pressKey(id)}>
          {txt(0, 11, tx(EF_KEYS[id]), T.label, efKeyInk(C), { weight: 700 })}
        </Key>
      ))}
      {warm && keyIds.length === 1 && invite(kx0, ky, kw, kh, RAD.key)}
    </g>
  );

  return (
    <g>
      <style>{EF_CSS}</style>
      {free ? freeView() : kind === "std" ? buildView() : splitView()}
      {keys()}
    </g>
  );
}

/* the standard form a strip of digits reads (a 0 in every empty place), as the card's two boxes / as one number */
function efOwnText(ds: any[]) {
  const t = efReadText(ds), [w = "", f = ""] = t.split(".");
  return [w, f];
}
function efReadText(ds: any[]) {
  const on = efDigitCols(ds);
  if (!on.length) return "";
  const hi = Math.min(on[0], 2), lo = Math.max(on[on.length - 1], 2);
  let s = "";
  for (let c = hi; c <= lo; c++) { if (c === 3) s += "."; s += ds[c] === null || ds[c] === undefined ? "0" : ds[c]; }
  return s;
}

/* the summary page's small drawing of the child's last right answer in a phase (r24: `it` is the item) */
function Thumb({ n, result, it, C, w, h, tx = (v: any) => v }: any) {
  const last = result && result.last;
  const ph: any = PHASES[(n || 1) - 1];
  const item = it || (last && ph && ph.items[last.item]);
  if (!item) return null;
  const blueInk = shade(EF_BLUE, 0.25), greenInk = shade(EF_GREEN, 0.25);
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  const line = (x: number, y: number, s: any, size: number, fill: string, anchor = "start") => (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={fill}>{s}</text>
  );
  /* everything scaled to the card's inner height, so nothing pokes out */
  const big = Math.min(T.label, Math.max(T.micro, Math.floor(h * 0.42)));
  const mid = h / 2, base = mid + big * 0.36;
  /* a place value or a fraction: the digit and its place's NAME, translated ("7 hundredths", "3 thousandths"), fitted, 12 clear of the frame */
  if (item.kind === "pv" || item.kind === "frac") {
    const d = item.kind === "pv" ? efCols(item.dec)[item.col] : item.answer[0];
    const nm = d + " " + tx(efName(item.col, d));
    const fs = Math.max(T.micro, Math.min(big, Math.floor((w - 28) / (nm.length * 0.58))));
    return <g>{frame}{line(w / 2, mid + fs * 0.36, nm, fs, greenInk, "middle")}</g>;
  }
  if (item.kind === "dec") return <g>{frame}{line(14, base, item.dec, big, blueInk)}{line(w - 14, base, efCardText(item.answer), big, greenInk, "end")}</g>;
  return <g>{frame}{line(w / 2, mid + big * 0.36, efCardText(item.answer), big, greenInk, "middle")}</g>;
}

function ExpandedForm(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right */
      keyOnly: true,
      /* the standard keypad, not the wide one: six place columns (hundreds to thousandths) with their names and a
         Decimal card in the row need the whole 1086 width while the keypad is open */
      bigPad: false,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d) */
      navDots: true,
      /* answering on the card (PATTERNS.md 9e): the worth on a Decimal card, the fraction on a Fraction card, the standard form on a Decimal card */
      cardAnswer: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      }} />
  );
}

export default ExpandedForm;
