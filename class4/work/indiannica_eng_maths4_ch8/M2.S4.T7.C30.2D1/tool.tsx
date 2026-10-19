/* ═══ M2.S4.T7.C30.2D1 · scale_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, the question bar and answer panel (board layout),
   bubble + mascot, phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is printed on the bubble,
   which is the guide. Each phase opens on GUIDE STEPS run on a warm-up weight (one click a step, a hint each); the
   questions are then answered on the card that holds the form they ask for (cardAnswer, r52): the Fraction card, or
   the scale's Decimal display; phase 1 asks the top number alone, typed on the pad (the point key is there, so a
   child can keep the point in, which is the phase's own misconception). Nothing moves on by itself (nextKey, r48).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints has a Hindi and a Gujarati entry in TR once the English is final. */

const TOOL_ID = "scale_bench";
const MEDIA_ID = "M2.S4.T7.C30.2D1";
const TOOL_NAME = "Scale Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* the plan's opening line (not shown: phase 1 opens on its guide steps) */
const OPENING = ["Read the display exactly as it stands, last zero and all."];
/* the whole-tool line (no longer shown from r44; kept for the sidecar) */
const FINISH_LINE = "Every weight read as printed, and a level beam under two written answers that are not the same.";
/* printed when the child opens Free play: the free branch offers exactly this (New weight, Tidy, the beam) */
const FREE_LINE = "Free play. Press New weight, then tidy it and hang both on the beam.";

/* THE START PAGE (runtime r28): one printed question to wonder at, and the object the lesson is about */
const START_HOOK = "Read the display exactly as it stands, last zero and all.";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const sx = 160, sy = 72, d = sbWin(sx, sy, 230), bx = 640, cx = 960;
  return (
    <g>
      {/* the kitchen scale with its sack of rice, printing a weight exactly as it reads */}
      {sbScale(sx, sy, 230, 64, C, "sa")}
      {sbWeightRow("2.750", d.x + d.w / 2, d.y + 64, T.speech, 0, "sw")}
      <rect x={d.x + d.w / 2 - 50} y={d.y + d.h + 6} width={100} height={38} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={d.x + d.w / 2} y={d.y + d.h + 35} textAnchor="middle" fontSize={lang === "en" ? T.label : T.micro} fontWeight={600} fill={C.ink}>{tx("kg")}</text>
      {/* the balance beam, level and unloaded */}
      <rect x={bx - 170} y={96} width={340} height={16} rx={8} fill={shade(C.rule, 0.25)} />
      <path d={`M ${bx - 22} ${146} L ${bx + 22} ${146} L ${bx} ${112} Z`} fill={shade(C.rule, 0.35)} />
      <rect x={bx - 9} y={146} width={18} height={170} fill={shade(C.rule, 0.2)} />
      <rect x={bx - 80} y={316} width={160} height={16} rx={6} fill={shade(C.rule, 0.3)} />
      {[-1, 1].map((sg: number) => (
        <g key={sg}>
          <line x1={bx + sg * 150} y1={112} x2={bx + sg * 150 - 50} y2={176} stroke={shade(C.rule, 0.3)} strokeWidth={3} />
          <line x1={bx + sg * 150} y1={112} x2={bx + sg * 150 + 50} y2={176} stroke={shade(C.rule, 0.3)} strokeWidth={3} />
          <rect x={bx + sg * 150 - 62} y={176} width={124} height={70} rx={14} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
        </g>
      ))}
      {/* an empty fraction card */}
      <rect x={cx} y={40} width={200} height={290} rx={RAD.card} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={cx + 100} y={84} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Fraction")}</text>
      <rect x={cx + 20} y={100} width={160} height={84} rx={RAD.key} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />
      <rect x={cx + 20} y={196} width={160} height={6} rx={3} fill={C.ink} />
      <rect x={cx + 20} y={214} width={160} height={84} rx={RAD.key} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11), keyed by the English byte for byte. In the bubble an instruction and its
   hint take ONE line each in hi/gu, so a question's line there names "this weight" and leaves the long spoken number
   to the question bar (whose ask keeps the digits). Terms: दशमलव बिंदु / દશાંશ ચિહ્ન (the point), अंश हर / અંશ છેદ,
   भिन्न / અપૂર્ણાંક, स्थान / સ્થાન, ऊपर की संख्या / ઉપરની સંખ્યા, नीचे की संख्या / નીચેની સંખ્યા, साफ़ करो / સાફ કરો (tidy). */
const TR: any = {
  hi: {
    "Scale Bench": "तराज़ू बेंच",
    "Read the display exactly as it stands, last zero and all.": "स्क्रीन पर जो छपा है, वैसा ही पढ़ो, आखिरी शून्य के साथ।",
    "Free play. Press New weight, then tidy it and hang both on the beam.": "मुक्त खेल। नया वज़न दबाओ, फिर साफ़ करो और दोनों को डंडी पर टाँगो।",

    "Dropping the point to get the top": "दशमलव बिंदु हटाकर ऊपर की संख्या पाना",
    "Tap the scale display to carry the weight to the bench.": "वज़न बेंच पर लाने के लिए स्क्रीन छुओ।",
    "Tap the white display on the scale.": "तराज़ू की सफ़ेद स्क्रीन छुओ।",
    "Now tap the point to lift it out and leave the top number.": "दशमलव बिंदु छुओ, ऊपर की संख्या बचेगी।",
    "Tap the point between the digits.": "अंकों के बीच का दशमलव बिंदु छुओ।",
    "Count every digit on the display.": "स्क्रीन के सारे अंक गिनो।",
    "Write the digits in order, no point.": "अंक क्रम से लिखो, बिना दशमलव बिंदु।",
    "The numerator is the digits with the point taken out and nothing else changed.": "अंश वही अंक हैं जिनमें से दशमलव बिंदु हटा दिया गया है और कुछ और नहीं बदला।",
    "You learned: the top number is the digits with the point taken out.": "तुमने सीखा: दशमलव बिंदु हटाकर बचे अंक ही ऊपर की संख्या हैं।",
    "Write 6.3 kg as a fraction.": "इस वज़न का भिन्न लिखो।",
    "This weight as a fraction": "इस वज़न का भिन्न",
    "Every digit goes into the top number.": "हर अंक ऊपर की संख्या में जाता है।",
    "What fraction does 8.4 kg give?": "इस नए वज़न से कौन-सा भिन्न बनता है?",
    "8.4 kg as a fraction": "8.4 किलोग्राम का भिन्न",
    "Did a digit stay behind with the point?": "क्या दशमलव के साथ कोई अंक छूटा?",
    "Turn 15.7 kg into a fraction.": "इस वज़न को भी भिन्न में बदलो।",
    "15.7 kg as a fraction": "15.7 किलोग्राम का भिन्न",
    "Is there a digit after the point too?": "क्या दशमलव के बाद भी कोई अंक है?",

    "Building the bottom from the places": "स्थानों से नीचे की संख्या बनाना",
    "Tap Count to light each place after the point.": "गिनो दबाकर दशमलव के बाद के स्थान जलाओ।",
    "The Count key is under the bench.": "गिनो कुंजी बेंच के नीचे है।",
    "Tap Build to write the bottom number.": "नीचे की संख्या के लिए बनाओ दबाओ।",
    "Now press Build, beside Count.": "अब गिनो के पास वाली बनाओ कुंजी दबाओ।",
    "As many zeros as there are places.": "जितने स्थान, उतने शून्य।",
    "Write a one, then those zeros after it.": "पहले एक लिखो, फिर उसके बाद वे शून्य।",
    "The denominator is one followed by a zero for every decimal place.": "हर में पहले एक होता है, फिर हर दशमलव स्थान के लिए एक शून्य।",
    "You learned: a one, then one zero for every place after the point.": "तुमने सीखा: पहले एक, फिर दशमलव के बाद हर स्थान का एक शून्य।",
    "Write 45.28 kg as a fraction.": "इस वज़न को भिन्न में लिखो।",
    "How many digits stand after the point?": "दशमलव के बाद कितने अंक हैं?",
    "Now try 30.62 kg the same way.": "अब इस वज़न के साथ भी ऐसा ही करो।",
    "30.62 kg as a fraction": "30.62 किलोग्राम का भिन्न",
    "A zero for each place after the point.": "दशमलव के बाद हर स्थान का एक शून्य।",
    "What fraction is 7.209 kg?": "इस वज़न का भिन्न क्या है?",
    "7.209 kg as a fraction": "7.209 किलोग्राम का भिन्न",
    "Count to the very last digit.": "आखिरी अंक तक गिनो।",

    "A zero on the end still counts": "आखिरी शून्य भी गिना जाता है",
    "Tap the zero on the end of the weight.": "वज़न के आखिरी शून्य को छुओ।",
    "It is the last digit on the bench.": "यह बेंच पर आखिरी अंक है।",
    "Now tap Count and watch each place light up.": "अब गिनो दबाओ और हर स्थान जलता देखो।",
    "Count is the key below the bench.": "बेंच के नीचे गिनो कुंजी है।",
    "Tap Build for a one and a zero under each place.": "बनाओ दबाकर एक और हर स्थान का शून्य लिखो।",
    "Build sits beside Count.": "बनाओ, गिनो के पास है।",
    "Each digit after the point is a place.": "दशमलव के बाद हर अंक एक स्थान है।",
    "Count the end zero as a place too.": "आखिरी शून्य को भी एक स्थान गिनो।",
    "A trailing zero takes a decimal place of its own, so the denominator comes out one zero longer.": "आखिर का शून्य अपना एक दशमलव स्थान लेता है, इसलिए हर में एक शून्य ज़्यादा आता है।",
    "You learned: a printed zero on the end takes a place of its own.": "तुमने सीखा: आखिर में छपा शून्य अपना एक स्थान लेता है।",
    "A scale prints 1.450 kg; write it as a fraction.": "तराज़ू जो छापता है, उसका भिन्न लिखो।",
    "What is the last digit printed?": "आखिरी छपा अंक कौन-सा है?",
    "A label reads 2.60 m; what is its printed fraction?": "लेबल पर जो छपा है, उसका भिन्न क्या है?",
    "2.60 m as a fraction": "2.60 मीटर का भिन्न",
    "Nothing was tidied; read every digit.": "कुछ साफ़ नहीं किया; हर अंक पढ़ो।",
    "The bench made this fraction; what weight did the scale print?": "इस भिन्न से तराज़ू ने कौन-सा वज़न छापा?",
    "The weight it came from": "जिस वज़न से यह बना",
    "Count the zeros after the one.": "एक के बाद वाले शून्य गिनो।",

    "The right amount can still be the wrong answer": "सही मात्रा भी गलत उत्तर हो सकती है",
    "Tap Tidy to drop the end zero and run the bench again.": "साफ़ करो दबाकर आखिरी शून्य हटाओ।",
    "Tidy is the key under the rows.": "साफ़ करो कुंजी पंक्तियों के नीचे है।",
    "Now tap the beam to hang both fractions on it.": "अब डंडी छुओ, दोनों भिन्न उस पर टँगेंगे।",
    "Tap the balance beam at the right.": "दाईं ओर वाली तुला की डंडी छुओ।",
    "Count the places in the asked row.": "पूछी गई पंक्ति के स्थान गिनो।",
    "Put one zero per place after a one.": "एक के बाद हर स्थान का एक शून्य लिखो।",
    "A trailing zero leaves the amount alone. It changes the denominator, not the weight.": "आखिर का शून्य मात्रा नहीं बदलता। वह हर बदलता है, वज़न नहीं।",
    "You learned: the same weight can be written as two different fractions.": "तुमने सीखा: एक ही वज़न दो अलग भिन्नों में लिखा जा सकता है।",
    "A child tidies it to 1.45 kg; what do they write?": "साफ़ करने के बाद बच्चा क्या लिखेगा?",
    "The tidied weight as a fraction": "साफ़ किए वज़न का भिन्न",
    "Count the places left after tidying.": "साफ़ करने के बाद बचे स्थान गिनो।",
    "Write 1.30 m as a fraction, just as printed.": "छपे हुए रूप जैसा ही भिन्न लिखो।",
    "1.30 m as printed": "छपा हुआ 1.30 मीटर",
    "Read the top row, end zero and all.": "ऊपर की पंक्ति पढ़ो, आखिरी शून्य समेत।",
    "What fraction is the printed 5.250 kg?": "थैले पर छपे वज़न का भिन्न क्या है?",
    "5.250 kg as printed": "छपा हुआ 5.250 किलोग्राम",
    "Did you count the zero on the end?": "क्या तुमने आखिरी शून्य गिना?",

    /* the win lines (api.say) */
    "Two digits came across to the top.": "दोनों अंक ऊपर की संख्या में आ गए।",
    "Only the point was left out of the top.": "ऊपर की संख्या से सिर्फ़ दशमलव बिंदु हटा।",
    "All three digits made the top, and the point rests above.": "तीनों अंक ऊपर की संख्या बने, और बिंदु ऊपर रखा है।",
    "Two places lit, so the bottom has three digits.": "दो स्थान जले, इसलिए नीचे की संख्या में तीन अंक हैं।",
    "Each zero sits right under its place.": "हर शून्य अपने स्थान के ठीक नीचे है।",
    "Three places gave the longest bottom yet.": "तीन स्थानों से अब तक की सबसे लंबी नीचे की संख्या बनी।",
    "Three places counted, the end zero as well.": "तीन स्थान गिने, आखिरी शून्य भी।",
    "Two zeros after the one make a bottom of three digits.": "एक के बाद दो शून्य, तो नीचे की संख्या तीन अंकों की बनी।",
    "Three zeros, so three digits after the point.": "तीन शून्य, इसलिए दशमलव के बाद तीन अंक।",
    "Same weight, but a different written fraction.": "वज़न वही, पर लिखा हुआ भिन्न अलग।",
    "That is the form the label printed.": "यही वह रूप है जो लेबल पर छपा था।",
    "The bag keeps all three printed places in its fraction.": "थैले का भिन्न तीनों छपे स्थान रखता है।",

    /* the words the working area draws (tx) and the answer boxes' names */
    "kg": "कि.ग्रा.", "m": "मी.", "Fraction": "भिन्न", "Decimal": "दशमलव",
    "top number": "ऊपर की संख्या", "bottom number": "नीचे की संख्या", "whole part": "पूर्ण भाग", "decimal part": "दशमलव भाग",
    "numerator": "अंश", "denominator": "हर", "whole": "पूर्ण", "decimal": "दशमलव",
    "Count": "गिनो", "Build": "बनाओ", "Tidy": "साफ़ करो", "New weight": "नया वज़न",
    "scale display": "तराज़ू की स्क्रीन", "the point": "दशमलव बिंदु", "the end zero": "आखिरी शून्य", "balance beam": "तुला की डंडी",
    "printed": "छपा हुआ", "tidied": "साफ़ किया", "written differently": "अलग लिखा हुआ",
    "same weight": "वही वज़न", "same length": "वही लंबाई", "place": "स्थान", "places": "स्थान",
  },
  gu: {
    "Scale Bench": "વજનકાંટો બેન્ચ",
    "Read the display exactly as it stands, last zero and all.": "સ્ક્રીન પર જે છપાયું છે તે એમ જ વાંચો, છેલ્લા શૂન્ય સાથે.",
    "Free play. Press New weight, then tidy it and hang both on the beam.": "મુક્ત રમત. નવું વજન દબાવો, પછી સાફ કરો અને બંનેને દાંડી પર લટકાવો.",

    "Dropping the point to get the top": "દશાંશ ચિહ્ન કાઢીને ઉપરની સંખ્યા મેળવવી",
    "Tap the scale display to carry the weight to the bench.": "વજન બેન્ચ પર લાવવા સ્ક્રીનને સ્પર્શ કરો.",
    "Tap the white display on the scale.": "વજનકાંટાની સફેદ સ્ક્રીનને સ્પર્શ કરો.",
    "Now tap the point to lift it out and leave the top number.": "દશાંશ ચિહ્ન સ્પર્શો, ઉપરની સંખ્યા રહેશે.",
    "Tap the point between the digits.": "અંકો વચ્ચેના દશાંશ ચિહ્નને સ્પર્શ કરો.",
    "Count every digit on the display.": "સ્ક્રીન પરના બધા અંકો ગણો.",
    "Write the digits in order, no point.": "અંકો ક્રમમાં લખો, દશાંશ ચિહ્ન વિના.",
    "The numerator is the digits with the point taken out and nothing else changed.": "અંશ એટલે દશાંશ ચિહ્ન કાઢી નાખ્યા પછીના અંકો, બીજું કંઈ બદલાયા વિના.",
    "You learned: the top number is the digits with the point taken out.": "તમે શીખ્યા: દશાંશ ચિહ્ન કાઢ્યા પછીના અંકો જ ઉપરની સંખ્યા છે.",
    "Write 6.3 kg as a fraction.": "આ વજનનો અપૂર્ણાંક લખો.",
    "This weight as a fraction": "આ વજનનો અપૂર્ણાંક",
    "Every digit goes into the top number.": "દરેક અંક ઉપરની સંખ્યામાં જાય છે.",
    "What fraction does 8.4 kg give?": "આ નવા વજનથી કયો અપૂર્ણાંક બને છે?",
    "8.4 kg as a fraction": "8.4 કિલોગ્રામનો અપૂર્ણાંક",
    "Did a digit stay behind with the point?": "શું કોઈ અંક દશાંશ ચિહ્ન સાથે રહી ગયો?",
    "Turn 15.7 kg into a fraction.": "આ વજનને પણ અપૂર્ણાંકમાં ફેરવો.",
    "15.7 kg as a fraction": "15.7 કિલોગ્રામનો અપૂર્ણાંક",
    "Is there a digit after the point too?": "શું દશાંશ ચિહ્ન પછી પણ કોઈ અંક છે?",

    "Building the bottom from the places": "સ્થાનો પરથી નીચેની સંખ્યા બનાવવી",
    "Tap Count to light each place after the point.": "ગણો દબાવીને દશાંશ પછીના સ્થાન ચમકાવો.",
    "The Count key is under the bench.": "ગણો કી બેન્ચની નીચે છે.",
    "Tap Build to write the bottom number.": "નીચેની સંખ્યા માટે બનાવો દબાવો.",
    "Now press Build, beside Count.": "હવે ગણો પાસેની બનાવો કી દબાવો.",
    "As many zeros as there are places.": "જેટલા સ્થાન, તેટલા શૂન્ય.",
    "Write a one, then those zeros after it.": "પહેલા એક લખો, પછી તે શૂન્ય.",
    "The denominator is one followed by a zero for every decimal place.": "છેદમાં પહેલા એક, પછી દરેક દશાંશ સ્થાન માટે એક શૂન્ય.",
    "You learned: a one, then one zero for every place after the point.": "તમે શીખ્યા: પહેલા એક, પછી દશાંશ પછીના દરેક સ્થાનનું એક શૂન્ય.",
    "Write 45.28 kg as a fraction.": "આ વજનને અપૂર્ણાંકમાં લખો.",
    "How many digits stand after the point?": "દશાંશ ચિહ્ન પછી કેટલા અંકો છે?",
    "Now try 30.62 kg the same way.": "હવે આ વજન માટે પણ એમ જ કરો.",
    "30.62 kg as a fraction": "30.62 કિલોગ્રામનો અપૂર્ણાંક",
    "A zero for each place after the point.": "દશાંશ પછી દરેક સ્થાનનું એક શૂન્ય.",
    "What fraction is 7.209 kg?": "આ વજનનો અપૂર્ણાંક શું છે?",
    "7.209 kg as a fraction": "7.209 કિલોગ્રામનો અપૂર્ણાંક",
    "Count to the very last digit.": "છેલ્લા અંક સુધી ગણો.",

    "A zero on the end still counts": "છેલ્લું શૂન્ય પણ ગણાય છે",
    "Tap the zero on the end of the weight.": "વજનના છેલ્લા શૂન્યને સ્પર્શ કરો.",
    "It is the last digit on the bench.": "તે બેન્ચ પરનો છેલ્લો અંક છે.",
    "Now tap Count and watch each place light up.": "હવે ગણો દબાવો, દરેક સ્થાન ચમકતું જુઓ.",
    "Count is the key below the bench.": "બેન્ચની નીચે ગણો કી છે.",
    "Tap Build for a one and a zero under each place.": "બનાવો દબાવો: એક અને દરેક સ્થાને શૂન્ય.",
    "Build sits beside Count.": "બનાવો, ગણોની બાજુમાં છે.",
    "Each digit after the point is a place.": "દશાંશ ચિહ્ન પછીનો દરેક અંક એક સ્થાન છે.",
    "Count the end zero as a place too.": "છેલ્લા શૂન્યને પણ એક સ્થાન ગણો.",
    "A trailing zero takes a decimal place of its own, so the denominator comes out one zero longer.": "છેલ્લું શૂન્ય પોતાનું એક દશાંશ સ્થાન લે છે, એટલે છેદમાં એક શૂન્ય વધુ આવે છે.",
    "You learned: a printed zero on the end takes a place of its own.": "તમે શીખ્યા: છેલ્લે છપાયેલું શૂન્ય પોતાનું એક સ્થાન લે છે.",
    "A scale prints 1.450 kg; write it as a fraction.": "વજનકાંટો જે છાપે છે તેનો અપૂર્ણાંક લખો.",
    "What is the last digit printed?": "છેલ્લો છપાયેલો અંક કયો છે?",
    "A label reads 2.60 m; what is its printed fraction?": "લેબલ પર જે છપાયું છે તેનો અપૂર્ણાંક શું?",
    "2.60 m as a fraction": "2.60 મીટરનો અપૂર્ણાંક",
    "Nothing was tidied; read every digit.": "કંઈ સાફ કર્યું નથી; દરેક અંક વાંચો.",
    "The bench made this fraction; what weight did the scale print?": "આ અપૂર્ણાંક કયા છપાયેલા વજનનો છે?",
    "The weight it came from": "જે વજનમાંથી બન્યો",
    "Count the zeros after the one.": "એક પછીના શૂન્ય ગણો.",

    "The right amount can still be the wrong answer": "સાચો જથ્થો પણ ખોટો જવાબ હોઈ શકે",
    "Tap Tidy to drop the end zero and run the bench again.": "સાફ કરો દબાવીને છેલ્લું શૂન્ય કાઢો.",
    "Tidy is the key under the rows.": "સાફ કરો કી હરોળોની નીચે છે.",
    "Now tap the beam to hang both fractions on it.": "હવે દાંડીને સ્પર્શ કરી બંને લટકાવો.",
    "Tap the balance beam at the right.": "જમણી બાજુની દાંડીને સ્પર્શ કરો.",
    "Count the places in the asked row.": "પૂછેલી હરોળના સ્થાન ગણો.",
    "Put one zero per place after a one.": "એક પછી દરેક સ્થાનનું એક શૂન્ય લખો.",
    "A trailing zero leaves the amount alone. It changes the denominator, not the weight.": "છેલ્લું શૂન્ય જથ્થો બદલતું નથી. તે છેદ બદલે છે, વજન નહીં.",
    "You learned: the same weight can be written as two different fractions.": "તમે શીખ્યા: એક જ વજન બે અલગ અપૂર્ણાંકમાં લખી શકાય.",
    "A child tidies it to 1.45 kg; what do they write?": "સાફ કર્યા પછી બાળક શું લખશે?",
    "The tidied weight as a fraction": "સાફ કરેલા વજનનો અપૂર્ણાંક",
    "Count the places left after tidying.": "સાફ કર્યા પછી બચેલા સ્થાન ગણો.",
    "Write 1.30 m as a fraction, just as printed.": "છપાયેલા રૂપ જેવો જ અપૂર્ણાંક લખો.",
    "1.30 m as printed": "છપાયેલું 1.30 મીટર",
    "Read the top row, end zero and all.": "ઉપરની હરોળ વાંચો, છેલ્લા શૂન્ય સાથે.",
    "What fraction is the printed 5.250 kg?": "થેલી પર છપાયેલા વજનનો અપૂર્ણાંક શું?",
    "5.250 kg as printed": "છપાયેલું 5.250 કિલોગ્રામ",
    "Did you count the zero on the end?": "શું તમે છેલ્લું શૂન્ય ગણ્યું?",

    /* the win lines (api.say) */
    "Two digits came across to the top.": "બંને અંકો ઉપરની સંખ્યામાં આવ્યા.",
    "Only the point was left out of the top.": "ઉપરની સંખ્યામાંથી ફક્ત દશાંશ ચિહ્ન નીકળ્યું.",
    "All three digits made the top, and the point rests above.": "ત્રણેય અંકો ઉપરની સંખ્યા બન્યા, અને ચિહ્ન ઉપર રહ્યું.",
    "Two places lit, so the bottom has three digits.": "બે સ્થાન ચમક્યા, એટલે નીચેની સંખ્યામાં ત્રણ અંકો છે.",
    "Each zero sits right under its place.": "દરેક શૂન્ય પોતાના સ્થાનની બરાબર નીચે છે.",
    "Three places gave the longest bottom yet.": "ત્રણ સ્થાનોથી અત્યાર સુધીની સૌથી લાંબી નીચેની સંખ્યા બની.",
    "Three places counted, the end zero as well.": "ત્રણ સ્થાન ગણ્યા, છેલ્લું શૂન્ય પણ.",
    "Two zeros after the one make a bottom of three digits.": "એક પછી બે શૂન્ય, એટલે નીચેની સંખ્યા ત્રણ અંકોની બની.",
    "Three zeros, so three digits after the point.": "ત્રણ શૂન્ય, એટલે દશાંશ ચિહ્ન પછી ત્રણ અંકો.",
    "Same weight, but a different written fraction.": "વજન એ જ, પણ લખેલો અપૂર્ણાંક અલગ.",
    "That is the form the label printed.": "આ જ રૂપ લેબલ પર છપાયું હતું.",
    "The bag keeps all three printed places in its fraction.": "થેલીનો અપૂર્ણાંક ત્રણેય છપાયેલા સ્થાન રાખે છે.",

    /* the words the working area draws (tx) and the answer boxes' names */
    "kg": "કિ.ગ્રા.", "m": "મી.", "Fraction": "અપૂર્ણાંક", "Decimal": "દશાંશ",
    "top number": "ઉપરની સંખ્યા", "bottom number": "નીચેની સંખ્યા", "whole part": "પૂર્ણ ભાગ", "decimal part": "દશાંશ ભાગ",
    "numerator": "અંશ", "denominator": "છેદ", "whole": "પૂર્ણ", "decimal": "દશાંશ",
    "Count": "ગણો", "Build": "બનાવો", "Tidy": "સાફ કરો", "New weight": "નવું વજન",
    "scale display": "વજનકાંટાની સ્ક્રીન", "the point": "દશાંશ ચિહ્ન", "the end zero": "છેલ્લું શૂન્ય", "balance beam": "ત્રાજવાની દાંડી",
    "printed": "છપાયેલું", "tidied": "સાફ કરેલું", "written differently": "અલગ રીતે લખેલું",
    "same weight": "સમાન વજન", "same length": "સમાન લંબાઈ", "place": "સ્થાન", "places": "સ્થાન",
  },
};

/* One entry per phase = one mount. Each phase opens on its guide steps (one click a step, run on a warm-up weight
   that is none of its questions' weights), then asks three questions. The plan's teach lines stay in `says` (a
   steps phase never shows them). */
const PHASES = [
  {
    n: 1,
    concept: "Dropping the point to get the top",
    conceptId: "M2.S4.T7.C30", objectiveIds: ["O11"],
    says: ["Take the point out and leave the digits alone. What have you got?"],
    steps: [
      { say: "Tap the scale display to carry the weight to the bench.", on: "carry", hint: "Tap the white display on the scale." },
      { say: "Now tap the point to lift it out and leave the top number.", on: "drop", hint: "Tap the point between the digits." },
    ],
    stepHold: 2200,
    ladder: ["Count every digit on the display.", "Write the digits in order, no point."],
    closing: "The numerator is the digits with the point taken out and nothing else changed.",
    learned: "You learned: the top number is the digits with the point taken out.",
    traceback: "The weight is carried to the bench, the point lifts out to its rest and the digits close up into the top number.",
    items: [
      /* learn ML1: answer in the plan = 63/10, and the top number is the digits with the point taken out.
         Answered on the Fraction card, like phases 2 to 4 (the owner's word); the near miss keeps only the whole part. */
      { qid: "M2.S4.T7.C30:ML1", kind: "top", weight: "6.3", unit: "kg", parts: SLOT_FRACTION, answer: [63, 10], near: "6|10", winMs: 3500,
        say: "Write 6.3 kg as a fraction.", ask: "This weight as a fraction",
        miss: "Every digit goes into the top number." },
      /* practice 1: answer in the plan = 84/10 */
      { qid: "M2.S4.T7.C30:1", kind: "top", weight: "8.4", unit: "kg", parts: SLOT_FRACTION, answer: [84, 10], near: "8|10", winMs: 3500,
        say: "What fraction does 8.4 kg give?", ask: "8.4 kg as a fraction",
        miss: "Did a digit stay behind with the point?" },
      /* practice 2: answer in the plan = 157, which is the digits with the point taken out */
      { qid: "M2.S4.T7.C30:2", kind: "top", weight: "15.7", unit: "kg", parts: SLOT_FRACTION, answer: [157, 10], near: "15|10", winMs: 3500,
        say: "Turn 15.7 kg into a fraction.", ask: "15.7 kg as a fraction",
        miss: "Is there a digit after the point too?" },
    ],
  },
  {
    n: 2,
    concept: "Building the bottom from the places",
    conceptId: "M2.S4.T7.C31", objectiveIds: ["O11"],
    says: ["Count the places after the point. Now write one and that many zeros."],
    steps: [
      { say: "Tap Count to light each place after the point.", on: "count", hint: "The Count key is under the bench." },
      { say: "Tap Build to write the bottom number.", on: "build", hint: "Now press Build, beside Count." },
    ],
    stepHold: 2400,
    ladder: ["As many zeros as there are places.", "Write a one, then those zeros after it."],
    closing: "The denominator is one followed by a zero for every decimal place.",
    learned: "You learned: a one, then one zero for every place after the point.",
    traceback: "The point drops out, the places light one at a time from the point outwards, and the bottom is built a zero at a time under them.",
    items: [
      /* learn ML2: answer in the plan = 4528/100 */
      { qid: "M2.S4.T7.C31:ML2", kind: "frac", weight: "45.28", unit: "kg", parts: SLOT_FRACTION, answer: [4528, 100], near: "4528|10", winMs: 3800,
        say: "Write 45.28 kg as a fraction.", ask: "This weight as a fraction",
        miss: "How many digits stand after the point?" },
      /* practice 3: answer in the plan = 3062/100 (near: the count written underneath) */
      { qid: "M2.S4.T7.C31:3", kind: "frac", weight: "30.62", unit: "kg", parts: SLOT_FRACTION, answer: [3062, 100], near: "3062|2", winMs: 3800,
        say: "Now try 30.62 kg the same way.", ask: "30.62 kg as a fraction",
        miss: "A zero for each place after the point." },
      /* practice 4: answer in the plan = 7209/1000, because three decimal places give one followed by three zeros */
      { qid: "M2.S4.T7.C31:4", kind: "frac", weight: "7.209", unit: "kg", parts: SLOT_FRACTION, answer: [7209, 1000], near: "7209|10", winMs: 4500,
        say: "What fraction is 7.209 kg?", ask: "7.209 kg as a fraction",
        miss: "Count to the very last digit." },
    ],
  },
  {
    n: 3,
    concept: "A zero on the end still counts",
    conceptId: "M2.S4.T7.C32", objectiveIds: ["O12"],
    says: ["There is a zero on the end. Does it take a place or not?"],
    steps: [
      { say: "Tap the zero on the end of the weight.", on: "zero", hint: "It is the last digit on the bench." },
      { say: "Now tap Count and watch each place light up.", on: "count", hint: "Count is the key below the bench." },
      { say: "Tap Build for a one and a zero under each place.", on: "build", hint: "Build sits beside Count." },
    ],
    stepHold: 2400,
    ladder: ["Each digit after the point is a place.", "Count the end zero as a place too."],
    closing: "A trailing zero takes a decimal place of its own, so the denominator comes out one zero longer.",
    learned: "You learned: a printed zero on the end takes a place of its own.",
    traceback: "The weight is read as printed, the last zero lights like every other place, and the bottom is built a zero longer.",
    items: [
      /* learn ML3: answer in the plan = Three decimal places, so 1450/1000 kg */
      { qid: "M2.S4.T7.C32:ML3", kind: "frac", weight: "1.450", unit: "kg", parts: SLOT_FRACTION, answer: [1450, 1000], near: "145|100", winMs: 4500,
        say: "A scale prints 1.450 kg; write it as a fraction.", ask: "This weight as a fraction",
        miss: "What is the last digit printed?" },
      /* practice 5: answer in the plan = 260/100 */
      { qid: "M2.S4.T7.C32:5", kind: "frac", weight: "2.60", unit: "m", parts: SLOT_FRACTION, answer: [260, 100], near: "26|10", winMs: 3800,
        say: "A label reads 2.60 m; what is its printed fraction?", ask: "2.60 m as a fraction",
        miss: "Nothing was tidied; read every digit." },
      /* practice 6: the plan asks whether 4.500 is the same amount as 4.5 and the same written form (the same amount,
         not the same written form: 4.500 has three places, 4.5 one). Run backwards so the child answers it on the
         scale's Decimal display: the bench holds 4500/1000 and the child writes the weight it came from; a tidier
         writes 4.5 and loses two printed places (the amount half is phase 4's beam). */
      { qid: "M2.S4.T7.C32:6", kind: "back", weight: "4.500", unit: "kg", given: [4500, 1000], parts: SLOT_DECIMAL, answer: ["4", "500"], near: "4|5", winMs: 3300,
        say: "The bench made this fraction; what weight did the scale print?", ask: "The weight it came from",
        miss: "Count the zeros after the one." },
    ],
  },
  {
    n: 4,
    concept: "The right amount can still be the wrong answer",
    conceptId: "M2.S4.T7.C33", objectiveIds: ["O12"],
    says: ["Tidy it first and run it again. Same amount? Same writing?"],
    steps: [
      { say: "Tap Tidy to drop the end zero and run the bench again.", on: "tidy", hint: "Tidy is the key under the rows." },
      { say: "Now tap the beam to hang both fractions on it.", on: "beam", hint: "Tap the balance beam at the right." },
    ],
    stepHold: 2200,
    ladder: ["Count the places in the asked row.", "Put one zero per place after a one."],
    closing: "A trailing zero leaves the amount alone. It changes the denominator, not the weight.",
    learned: "You learned: the same weight can be written as two different fractions.",
    traceback: "The asked row is run, both fractions hang on the beam, which stays level, and the two written forms stand apart.",
    items: [
      /* learn ML4: answer in the plan = They write 145/100, which is the same weight and not the number that was printed
         (near: the printed row's fraction kept, as if the two cannot both be right) */
      { qid: "M2.S4.T7.C33:ML4", kind: "rows", row: "t", weight: "1.450", unit: "kg", parts: SLOT_FRACTION, answer: [145, 100], near: "1450|1000", winMs: 3000,
        say: "A child tidies it to 1.45 kg; what do they write?", ask: "The tidied weight as a fraction",
        miss: "Count the places left after tidying." },
      /* practice 7: answer in the plan = The first one (130/100), because the printed number has two decimal places;
         the tidied 13/10 stands in the lower row and the child writes the printed one */
      { qid: "M2.S4.T7.C33:7", kind: "rows", row: "p", tPre: true, weight: "1.30", unit: "m", parts: SLOT_FRACTION, answer: [130, 100], near: "13|10", winMs: 3000,
        say: "Write 1.30 m as a fraction, just as printed.", ask: "1.30 m as printed",
        miss: "Read the top row, end zero and all." },
      /* practice 8: answer in the plan = 5250/1000, and a child who tidied to 5.25 first would have written 525/100
         (the win runs the tidied row too and hangs both on the beam) */
      { qid: "M2.S4.T7.C33:8", kind: "rows", row: "p", weight: "5.250", unit: "kg", parts: SLOT_FRACTION, answer: [5250, 1000], near: "525|100", winMs: 5000,
        say: "What fraction is the printed 5.250 kg?", ask: "5.250 kg as printed",
        miss: "Did you count the zero on the end?" },
    ],
  },
];

/* ── the working area's own numbers (they go into the sidecar too) ──────────────────────────── */
/* the warm-up weight each phase's guide steps run on (none is a question's weight) */
const SB_WARM: any = { 1: { weight: "9.2", unit: "kg" }, 2: { weight: "6.25", unit: "kg" }, 3: { weight: "3.70", unit: "kg" }, 4: { weight: "2.750", unit: "kg" } };
/* free play's weights: each ends in a printed zero, so Tidy always has one to drop */
const SB_FREE = [{ weight: "2.750", unit: "kg" }, { weight: "1.50", unit: "kg" }, { weight: "6.800", unit: "kg" }, { weight: "3.20", unit: "kg" }, { weight: "9.40", unit: "kg" }];
const MODEL = {
  warmUps: [1, 2, 3, 4].map((k: number) => SB_WARM[k].weight + " " + SB_WARM[k].unit),
  freeWeights: SB_FREE.map((f: any) => f.weight + " " + f.unit),
  method: ["the digits without the point are the numerator", "count the printed places, an end zero included",
    "write one and a zero for every counted place underneath"],
};

/* the written form, read off as the chapter does it (shared by the picture only, never by judge or oracle) */
const sbDecs = (s: string) => String(s).split(".")[1] || "";
const sbTop = (s: string) => String(s).replace(".", "").replace(/^0+(?=\d)/, "");
const sbBot = (s: string) => "1" + new Array(sbDecs(s).length).fill("0").join("");
const sbTidy = (s: string) => (/\.\d*0$/.test(String(s)) ? String(s).slice(0, -1) : String(s));

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: phase 1 wants the top number as digits alone (a point kept in is the phase's misconception); a fraction
   wants both boxes; the weight on the Decimal display is judged digit for digit, so 4.5 is not 4.500 */
const judge = (item: any, v: any) => {
  if (item.parts === SLOT_DECIMAL) return judgeSlotDecimal(item, v);
  if (item.parts) return judgeSlotParts(item, v);
  const t = String(v ?? "").trim();
  return /^\d+$/.test(t) && Number(t) === item.answer;
};
/* oracle: a second route. The printed weight is walked character by character: every digit is pushed into the
   numerator, every character after the dot counts one place, and the denominator is one multiplied by ten once per
   place. The backwards item is proved the other way: the point goes back as many digits from the right as there are
   zeros under the one. */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const walk = (s: string) => {
    let num = 0, after = false, places = 0;
    for (const ch of String(s)) {
      if (ch === ".") { if (after) return null; after = true; continue; }
      const d = "0123456789".indexOf(ch);
      if (d < 0) return null;
      num = num * 10 + d;
      if (after) places += 1;
    }
    let den = 1;
    for (let q = 0; q < places; q++) den *= 10;
    return [num, den];
  };
  if (it.kind === "back") {
    const r = walk(it.weight), g = it.given || [];
    if (!r || r[0] !== g[0] || r[1] !== g[1]) return false;
    let z = 0, q = g[1];
    while (q > 1) { q = q / 10; z += 1; }
    const ds = String(g[0]);
    return ds.slice(0, ds.length - z) === String(it.answer[0]) && ds.slice(ds.length - z) === String(it.answer[1]);
  }
  /* the tidied row drops one printed zero off the end before it is converted */
  const w = it.row === "t" ? String(it.weight).replace(/0$/, "") : it.weight;
  const r = walk(w);
  return !!r && r[0] === it.answer[0] && r[1] === it.answer[1];
}));
/* the item's own misconception: the point kept in the top, a digit left behind, ten under any number of places,
   the count written underneath, the end zero rubbed off, the printed row answered for the tidied one */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (no commas inside a fraction or a decimal:
   the chapter counts digits and zeros, so 2750/1000 is written plain) */
const answerForms = (item: any) => (item.parts === SLOT_DECIMAL
  ? [item.answer[0] + "." + item.answer[1], speakable(item.answer[0] + "." + item.answer[1])]
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
    : [String(item.answer), indian(item.answer), words(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* every answer is typed (a card, the Decimal display or the pad): nothing is set on the working area */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* nothing waits on the working area before Enter; in a guide step check() reaches api.onEnter (HOOK.check unset) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing ─────────────────────────────────────────────────────────────────────────────── */

const SB_CSS = `
.sb-move{transition:transform 460ms cubic-bezier(.3,.7,.25,1)}
.sb-ring{transform-box:fill-box;transform-origin:center;animation:sbring 1.6s ease-out infinite}
@keyframes sbring{0%{opacity:.95;transform:scale(1)}100%{opacity:.2;transform:scale(1.06)}}
@media (prefers-reduced-motion:reduce){.sb-move{transition:none}.sb-ring{animation:none}}
`;
const SB_P = 88, SB_TW = 78, SB_TH = 88;
/* the chapter's colours: a digit left of the point deep blue, right of it green, the point vermilion, a zero holding a
   place grey (same size and weight); tenths amber, hundredths rose, thousandths sky blue */
const SB_LEFT = shade(CONTENT.hundred, 0.25), SB_RIGHT = shade(CONTENT.one, 0.25), SB_DOT = shade(CONTENT.pointer, 0.25), SB_ZERO = "#767676";
const sbHue = (k: number) => [CONTENT.ten, CONTENT.bead, "#56B4E9"][Math.min(Math.max(k, 0), 2)];
const sbInk = (s: string, j: number) => {
  const ch = s[j], di = s.indexOf(".");
  return ch === "." ? SB_DOT : ch === "0" ? SB_ZERO : di >= 0 && j > di ? SB_RIGHT : SB_LEFT;
};
const sbAdv = (ch: string, size: number) => (ch === "." ? 0.36 : 0.6) * size;

/** A printed weight as one reading, each character at its own place so a lit place can sit behind its digit. */
function sbWeightRow(str: string, cx: number, base: number, size: number, lit: number, kp: string) {
  const s = String(str), di = s.indexOf(".");
  const total = s.split("").reduce((a: number, ch: string) => a + sbAdv(ch, size), 0);
  let x = cx - total / 2;
  const out: any[] = [];
  s.split("").forEach((ch: string, j: number) => {
    const a = sbAdv(ch, size), place = di >= 0 && j > di ? j - di - 1 : -1;
    if (place >= 0 && place < lit) out.push(<rect key={kp + "l" + j} x={x - 1} y={base - size * 0.86} width={a + 2} height={size * 1.04} rx={8} fill={tint(sbHue(place), 0.5)} />);
    out.push(<text key={kp + "t" + j} x={x + a / 2} y={base} textAnchor="middle" fontSize={size} fontWeight={700} fill={sbInk(s, j)}>{ch}</text>);
    x += a;
  });
  return out;
}

/** A small stacked fraction (the beam's pans, the summary drawing). */
function sbMini(cx: number, base: number, a: any, b: any, size: number, C: any, kp: string) {
  const wd = Math.max(String(a).length, String(b).length) * size * 0.6 + 14;
  return (
    <g key={kp}>
      <text x={cx} y={base} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{String(a)}</text>
      <rect x={cx - wd / 2} y={base + size * 0.26} width={wd} height={4} rx={2} fill={C.ink} />
      <text x={cx} y={base + size * 1.22} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{String(b)}</text>
    </g>
  );
}

/* The kitchen scale and its sack of rice. The plain pan, body and sack are the whole drawing; the `scale` and `bag`
   skins are laid over them (their boxes keep the pictures' own proportions, 172:200 and 112:140); the display window
   is drawn in code over the picture, with its own opaque face, so the digits never depend on it. */
const SB_SCALE_R = 200 / 172, SB_BAG_R = 112 / 140;
const sbWin = (x: number, y: number, sw: number) => ({ x: x + 0.15 * sw, y: y + 0.47 * sw * SB_SCALE_R, w: 0.7 * sw, h: 0.38 * sw * SB_SCALE_R });
function sbScale(x: number, y: number, sw: number, bagH: number, C: any, kp: string) {
  const sh = sw * SB_SCALE_R, bw = bagH * SB_BAG_R, bx = x + sw / 2 - bw / 2, by = y + 0.05 * sh - bagH + 25 * sw / 270, wn = sbWin(x, y, sw);
  return (
    <g key={kp}>
      {/* plain: a bowl, its neck and the body, kept inside the picture's outline so none of it peeks out round the skin */}
      <path d={`M ${x + 0.1 * sw} ${y + 0.1 * sh} L ${x + 0.9 * sw} ${y + 0.1 * sh} Q ${x + 0.82 * sw} ${y + 0.24 * sh} ${x + 0.5 * sw} ${y + 0.24 * sh} Q ${x + 0.18 * sw} ${y + 0.24 * sh} ${x + 0.1 * sw} ${y + 0.1 * sh} Z`}
        fill={tint(C.rule, 0.45)} stroke={C.rule} strokeWidth={2} />
      <rect x={x + 0.44 * sw} y={y + 0.24 * sh} width={0.12 * sw} height={0.16 * sh} fill={tint(C.rule, 0.3)} />
      <rect x={x + 0.16 * sw} y={y + 0.42 * sh} width={0.68 * sw} height={0.53 * sh} rx={RAD.card} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <Skin name="scale" x={x} y={y} w={sw} h={sh} fit="stretch" />
      <path d={`M ${bx + 0.32 * bw} ${by + 0.4 * bagH} Q ${bx + 0.2 * bw} ${by + 0.7 * bagH} ${bx + 0.26 * bw} ${by + 0.9 * bagH} L ${bx + 0.74 * bw} ${by + 0.9 * bagH} Q ${bx + 0.8 * bw} ${by + 0.7 * bagH} ${bx + 0.68 * bw} ${by + 0.4 * bagH} Z`}
        fill={tint(C.rule, 0.15)} />
      <path d={`M ${bx + 0.4 * bw} ${by + 0.4 * bagH} L ${bx + 0.43 * bw} ${by + 0.2 * bagH} L ${bx + 0.57 * bw} ${by + 0.2 * bagH} L ${bx + 0.6 * bw} ${by + 0.4 * bagH} Z`}
        fill={tint(C.rule, 0.25)} />
      <Skin name="bag" x={bx} y={by} w={bw} h={bagH} fit="stretch" />
      <rect x={wn.x} y={wn.y} width={wn.w} height={wn.h} rx={RAD.key} fill="#EEF1EA" stroke={shade(C.rule, 0.3)} strokeWidth={2} />
    </g>
  );
}

/* A measuring tape, for a length (the plan's metre items): no scale and no sack. The case and the yellow strip with its
   marks are drawn in code; the reading is printed on a white label under it, in code too, like the scale's window. */
function sbTape(x: number, y: number, w: number, h: number, C: any, kp: string) {
  const sy = y + h * 0.24, sh = h * 0.52, sx0 = x + h * 0.8, sx1 = x + w - 4, marks: any[] = [];
  for (let px = sx0 + 10, k = 0; px < sx1 - 10; px += 12, k++) marks.push(<line key={kp + k} x1={px} y1={sy} x2={px} y2={sy + (k % 5 === 0 ? sh * 0.5 : sh * 0.25)} stroke="#4A4030" strokeWidth={2} />);
  return (
    <g key={kp}>
      <rect x={sx0} y={sy} width={sx1 - sx0} height={sh} rx={6} fill="#F6D860" stroke="#B8962E" strokeWidth={2} />
      {marks}
      <rect x={sx1 - 6} y={sy - 6} width={10} height={sh + 12} rx={3} fill="#6B6B6B" />
      <rect x={x} y={y} width={h} height={h} rx={h * 0.24} fill="#F2C94C" stroke="#B8962E" strokeWidth={3} />
      <circle cx={x + h / 2} cy={y + h / 2} r={h * 0.22} fill="#FFFFFF" stroke="#B8962E" strokeWidth={3} />
    </g>
  );
}

/* the invite on a key: a rounded ring that hugs the key (a circle would cut through a wide key's label) */
function sbKeyRing(x: number, y: number, w: number, h: number, C: any) {
  return <rect className="sb-ring" x={x - 5} y={y - 5} width={w + 10} height={h + EDGE + 10} rx={RAD.key + 5} fill="none"
    stroke={(THEME && THEME.enter && THEME.enter[1]) || C.accent} strokeWidth={5} pointerEvents="none" />;
}

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, part, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const demo = stage === "demo";
  const w = box ? box.w : W.w;
  const open = !!(box && box.open);
  const [fk, setFk] = useState(0);
  const [S, setS] = useState<any>({});
  const [fixAt, setFixAt] = useState<any>(null);
  const [fixing, setFixing] = useState(false);
  const lastAct = useRef<any>({ name: "", t: 0 });

  /* what is on the pan: free play's weight, the warm-up of the guide steps, or the question's (stage first: in free play
     `item` is the last question of the last phase) */
  const it: any = free ? { kind: "free", ...SB_FREE[fk % SB_FREE.length] } : demo ? { kind: "warm", ...SB_WARM[n] } : (item || {});
  const k = free ? "free" : demo ? "warm" : it.kind;
  const rows = free || n === 4;
  const s = String(it.weight || "");
  const nd = sbDecs(s).length;

  /* the opening picture of what is on the pan */
  const full = (x: string) => ({ shown: true, lit: sbDecs(x).length, top: sbTop(x), bot: sbBot(x) });
  const none = { shown: false, lit: 0, top: null, bot: null };
  const opening = (): any => {
    if (rows) {
      if (k === "free" || k === "warm") return { p: full(s), t: none, hung: false };
      if (it.row === "t") return { p: full(s), t: { ...none, shown: true }, hung: false };
      return { p: { ...none, shown: true }, t: it.tPre ? full(sbTidy(s)) : { ...none, shown: true }, hung: false };
    }
    if (k === "warm") return n === 1 ? {} : { carried: true, dropped: true };
    /* the backwards item opens on the given fraction's top as plain ink tiles and the point parked aside: nothing on the
       bench says where the point goes until the correction or the win counts the zeros under the one */
    if (k === "back") return { carried: true, dropped: true, built: 0, lit: 0, cardTop: String(it.given[0]), cardBot: String(it.given[1]) };
    if (k === "top") return {};
    return { carried: true };
  };
  const group = free ? "free" : demo ? "demo" : "q";
  const setupKey = group + "|" + n + "|" + (group === "q" ? index : "") + "|" + (group === "free" ? fk : "");
  const fresh = () => ({ ...opening(), key: setupKey });
  const V: any = S.key === setupKey ? S : fresh();
  useEffect(() => { tl.stop(); setS(fresh()); setFixAt(null); setFixing(false); }, [setupKey]);
  /* a restart puts the guide back on its first step: the warm-up starts again */
  useEffect(() => { if (demo && step === 0) { tl.stop(); setS(fresh()); } }, [demo, step]);

  const put = (o: any) => setS((x: any) => ({ ...(x.key === setupKey ? x : fresh()), ...o }));
  const putRow = (row: string, o: any) => setS((x: any) => { const b = x.key === setupKey ? x : fresh(); return { ...b, [row]: { ...b[row], ...o } }; });

  /* ── the acts, as timed steps (each sets what it needs first, so a quick second act never finds half a bench) ── */
  const benchSeq = (name: string) => {
    const top = sbTop(s), bot = sbBot(s), Q: any[] = [];
    if (name === "carry") { Q.push([520, () => { put({ carried: true, carry: true }); api.sfx.settle(); }]); Q.push([0, () => put({ carry: false })]); }
    if (name === "drop") { Q.push([480, () => { put({ carried: true, dropped: true }); api.sfx.tick(); }]); Q.push([220, () => { put({ cardTop: top }); api.sfx.settle(); }]); }
    if (name === "zero") Q.push([300, () => { put({ zero: true }); api.sfx.tick(); }]);
    if (name === "count") {
      Q.push([340, () => put({ carried: true, dropped: true, cardTop: top, lit: 0 })]);
      for (let q = 1; q <= nd; q++) Q.push([380, () => { put({ lit: q }); api.sfx.tick(); }]);
    }
    if (name === "build") {
      Q.push([300, () => put({ carried: true, dropped: true, cardTop: top, lit: nd, built: 0 })]);
      for (let q = 1; q <= nd + 1; q++) Q.push([300, () => { put({ built: q }); api.sfx.tick(); }]);
      Q.push([0, () => { put({ cardBot: bot }); api.sfx.settle(); }]);
    }
    return Q;
  };
  /* the backwards item: the zeros under the one are counted, and the dot goes back that many digits from the right */
  const backSeq = () => {
    const Q: any[] = [[300, () => put({ lit: 0, built: 0, dotIn: false, disp: null })], [420, () => { put({ built: 1 }); api.sfx.tick(); }]];
    for (let q = 1; q <= nd; q++) Q.push([420, () => { put({ lit: q, built: q + 1 }); api.sfx.tick(); }]);
    Q.push([520, () => { put({ dotIn: true }); api.sfx.settle(); }]);
    Q.push([0, () => put({ disp: s })]);
    return Q;
  };
  /* a row of the two-row bench: its places light from the dot outwards, then the top, then the bottom */
  const rowSeq = (row: string, x: string, first?: () => void) => {
    const m = sbDecs(x).length, Q: any[] = [];
    Q.push([380, () => { putRow(row, { shown: true, lit: 0, top: null, bot: null }); if (row === "t") put({ hung: false }); if (first) first(); }]);
    for (let q = 1; q <= m; q++) Q.push([340, () => { putRow(row, { lit: q }); api.sfx.tick(); }]);
    Q.push([320, () => putRow(row, { top: sbTop(x) })]);
    Q.push([320, () => { putRow(row, { bot: sbBot(x) }); api.sfx.settle(); }]);
    return Q;
  };
  const beamSeq = () => [[650, () => { setS((x: any) => { const b = x.key === setupKey ? x : fresh(); return { ...b, t: b.t && b.t.bot ? b.t : full(sbTidy(s)), hung: true }; }); api.sfx.settle(); }]];
  const seqOf = (name: string) => {
    if (!rows) return benchSeq(name);
    if (name === "tidy") return rowSeq("t", sbTidy(s), () => api.sfx.cut());
    if (name === "beam") return beamSeq();
    return [];
  };

  /* the child's click on a control: reported at once (api.did), and only the act the step waits for moves the bench */
  const doAct = (name: string) => {
    const now = Date.now();
    if (lastAct.current.name === name && now - lastAct.current.t < 600) return;
    lastAct.current = { name, t: now };
    if (demo) { if (api.did(name)) tl.run(seqOf(name)); return; }
    if (free) {
      if (name === "weight") { tl.stop(); setFk((f: number) => (f + 1) % SB_FREE.length); api.sfx.settle(); return; }
      if (name === "beam" && !(V.t && V.t.bot)) return;
      tl.run(seqOf(name));
    }
  };
  /* Enter, the agent's toolApi.check() and the dev solve() perform the CURRENT step */
  api.onEnter(demo && stepOn ? () => doAct(stepOn) : null);
  HOOK.demo = () => { if (stepOn) doAct(stepOn); };

  /* the whole working of the question on the pan: the win runs it, the correction runs it slowly */
  const workSeq = (slow: boolean) => {
    if (k === "top") return [...benchSeq("carry"), ...benchSeq("drop"), ...benchSeq("count"), ...benchSeq("build")];
    if (k === "frac") return [...benchSeq("drop"), ...benchSeq("count"), ...benchSeq("build")];
    if (k === "back") return backSeq();
    if (k === "rows") {
      if (it.row === "t") return [...rowSeq("t", sbTidy(s), () => api.sfx.cut()), ...beamSeq()];
      if (it.tPre) return [...rowSeq("p", s), ...beamSeq()];
      return [...rowSeq("p", s), ...rowSeq("t", sbTidy(s), () => api.sfx.cut()), ...beamSeq()];
    }
    return [];
  };

  /* the win: the bench finishes the work the child's answer called for (it stays until Next) */
  useEffect(() => {
    if (stage !== "win" || free) return;
    setFixing(false);
    const key = n + "-" + index;
    if (key === "1-0") api.say("Two digits came across to the top.");
    else if (key === "1-1") api.say("Only the point was left out of the top.");
    else if (key === "1-2") api.say("All three digits made the top, and the point rests above.");
    else if (key === "2-0") api.say("Two places lit, so the bottom has three digits.");
    else if (key === "2-1") api.say("Each zero sits right under its place.");
    else if (key === "2-2") api.say("Three places gave the longest bottom yet.");
    else if (key === "3-0") api.say("Three places counted, the end zero as well.");
    else if (key === "3-1") api.say("Two zeros after the one make a bottom of three digits.");
    else if (key === "3-2") api.say("Three zeros, so three digits after the point.");
    else if (key === "4-0") api.say("Same weight, but a different written fraction.");
    else if (key === "4-1") api.say("That is the form the label printed.");
    else if (key === "4-2") api.say("The bag keeps all three printed places in its fraction.");
    tl.run([[200, () => setS(fresh())], ...workSeq(false)]);
  }, [stage]);

  /* the traceback: the bench redrawn from the start, ending on the whole right answer; unmarked, and the child's
     answer stays (the card shows the correction's answer until the child types something new) */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    setFixing(true);
    setFixAt(String(wrong.value ?? typed ?? ""));
    tl.run([[420, () => setS(fresh())], ...workSeq(true), [700, () => {}]], () => { setFixing(false); api.lock(false); });
  }, [wrong]);

  /* ── what the cards show ── */
  const fixShow = !!wrong && fixAt !== null && String(typed ?? "") === fixAt;
  /* the child's next key (a digit typed or a pad key pressed) clears the correction's card, even when it types the same
     digit again (typed then does not change), so the card shows what the child is typing */
  useEffect(() => {
    if (!fixShow || fixing) return;
    const clear = (e: any) => {
      const hit = e.type === "keydown" ? /^([0-9.]|Backspace|Escape)$/.test(String(e.key))
        : !!(e.target && e.target.closest && e.target.closest('[data-control^="key-"]'));
      if (hit) setFixAt(null);
    };
    window.addEventListener("keydown", clear, true); window.addEventListener("pointerdown", clear, true);
    return () => { window.removeEventListener("keydown", clear, true); window.removeEventListener("pointerdown", clear, true); };
  }, [fixShow, fixing]);
  const tp = slotPartsOf(typed, 2);
  const typedIn = !!(tp[0] || tp[1]);
  const fracAsked = !free && !demo && !!item && !!item.parts && item.parts !== SLOT_DECIMAL;
  const decAsked = !free && !demo && !!item && item.parts === SLOT_DECIMAL;
  const asking = stage === "ask" && !fixing;
  /* [top, bottom] for a fraction card: the asked card shows the typing (or the correction), any other the bench */
  const cardVals = (asked: boolean, a: any, b: any) => {
    if (asked && stage === "ask") return fixShow ? [a, b] : [tp[0] || null, tp[1] || null];
    if (asked && (stage === "win" || stage === "idle") && typedIn) return [tp[0] || null, tp[1] || null];
    return [a, b];
  };

  /* ── what the host and the agent read back (never an answer before it is given) ── */
  const reveal = stage !== "ask" || !!wrong;
  const ar = rows ? (it.row === "t" ? "t" : "p") : "";
  api.share({
    phase: n, printed: k === "back" && !reveal ? null : s,
    numerator: rows ? (reveal ? (V[ar] && V[ar].top) || null : null) : (reveal || k === "back" ? V.cardTop || null : null),
    placesCounted: rows ? (V[ar] ? V[ar].lit : 0) : V.lit || 0,
    denominator: rows ? (reveal ? (V[ar] && V[ar].bot) || null : null) : (reveal || k === "back" ? V.cardBot || null : null),
    tidiedRow: rows ? !!(V.t && V.t.shown) : false, balanced: rows ? !!V.hung : false, complete: stage === "idle",
  });

  /* one fraction card: two boxes over and under a bar; the asked one is the tap target, then the two finger boxes */
  const fracCard = (x: number, y: number, cw: number, ch: number, vals: any[], asked: boolean, size: number, head: boolean, kp: string) => {
    const hTop = head ? 44 : 10, bh = (ch - hTop - 26) / 2, bw = cw - 36;
    const y1 = y + hTop, yb = y1 + bh + 7, y2 = yb + 13;
    const typing = asked && asking && open;
    const box1 = (yy: number, v: any, j: number) => {
      const on = typing && part === j, has = v !== null && v !== undefined && v !== "";
      const tw = has ? String(v).length * size * 0.6 : 0;
      return (
        <g key={kp + "b" + j}>
          <rect x={x + 18} y={yy} width={bw} height={bh} rx={RAD.key} fill="#FFFFFF"
            stroke={on ? C.accent : C.rule} strokeWidth={on ? 4 : 2} strokeDasharray={has || typing ? undefined : "8 8"} />
          {has && <text x={x + cw / 2} y={yy + bh / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{String(v)}</text>}
          {on && <rect className="c4-caret" x={x + cw / 2 + tw / 2 + 6} y={yy + bh / 2 - size * 0.4} width={4} height={size * 0.8} rx={2} fill={C.accent} />}
        </g>
      );
    };
    return (
      <g key={kp}>
        <rect x={x} y={y} width={cw} height={ch} rx={RAD.card} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
        {head && <text x={x + cw / 2} y={y + 34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Fraction")}</text>}
        {box1(y1, vals[0], 0)}
        <rect x={x + 18} y={yb} width={bw} height={6} rx={3} fill={C.ink} />
        {box1(y2, vals[1], 1)}
        {asked && asking && !open && (
          <g>
            <BlinkRing x={x} y={y} w={cw} h={ch} rx={RAD.card} C={C} />
            <SlotPartBox id="answer-open" label={tx("Fraction")} x={x} y={y} w={cw} h={ch} on={false} enabled onPick={() => api.openAnswer()} />
          </g>
        )}
        {typing && (
          <g>
            <SlotPartBox id="part-1" label={tx("top number")} x={x} y={y} w={cw} h={yb - y + 3} on={part === 0} enabled onPick={() => api.pickPart(0)} />
            <SlotPartBox id="part-2" label={tx("bottom number")} x={x} y={yb + 3} w={cw} h={y + ch - yb - 3} on={part === 1} enabled onPick={() => api.pickPart(1)} />
          </g>
        )}
      </g>
    );
  };

  const invite = (on: string) => demo && stepOn === on;
  /* the unit: kg or m in English, a wider abbreviation in Hindi and Gujarati (कि.ग्रा., મી.) */
  const uS = lang === "en" ? T.label : T.micro, uW = lang === "en" ? 80 : 112;

  /* ═══ phases 1 to 3: the scale, the bench of tiles, the Fraction card ═══ */
  const bench = () => {
    const m = Math.max(30, Math.min(80, (w - 930) / 4));
    const scX = m, bL = scX + 270 + m, R = bL + 5 * SB_P, cardX = R + m - 10;
    /* the scale (box 270 x 314 from y 110), its sack on the pan, and the display window in it */
    const scY = 110, d = sbWin(scX, scY, 270), isLen = it.unit === "m";
    const di = s.indexOf("."), chars = s.split("");
    const dropped = !!V.dropped && !V.dotIn;
    const nT = dropped ? chars.length - 1 : chars.length;
    const tileY = 64, botY = 184;
    /* the lifted point rests over the gap it left; the backwards item's point is parked at the bench's far left, a spot
       that says nothing about where it goes, until the correction or the win puts it back */
    const parked = k === "back" && !V.dotIn;
    const restX = parked ? bL + SB_TW / 2 : R - nd * SB_P - 5, restY = 30;
    const built = V.built || 0;
    const lit = V.lit || 0;
    /* the scale's display: the weight as printed, or (the backwards item) the Decimal card the child writes on */
    const dispAsked = decAsked && (stage === "ask" || stage === "win" || stage === "idle");
    const dParts = dispAsked ? (stage === "ask" ? (fixShow ? null : tp) : typedIn ? tp : null) : null;
    const dText = dispAsked ? (dParts ? null : V.disp) : s;
    const dTyping = decAsked && asking && open;
    const pv0 = dParts || ["", ""], nW = Math.max(1, pv0[0].length), nD = Math.max(2, pv0[1].length), room = d.w - 16 - 22;
    const wB = Math.max(54, Math.round(room * nW / (nW + nD))), wD = room - wB, xP = d.x + 8 + wB + 2, xD = xP + 20;
    const dbY = d.y + 22, dbH = 76;
    const pv = dParts || ["", ""];
    const dSize = [T.xl, T.speech, T.prompt, T.label, T.micro].find((z: number) => pv[0].length * z * 0.6 <= wB - 10 && pv[1].length * z * 0.6 <= wD - 10) || T.micro;
    const dBox = (bx: number, bw: number, v: string, j: number) => {
      const on = dTyping && part === j, has = !!v, tw = has ? v.length * dSize * 0.6 : 0;
      return (
        <g key={"db" + j}>
          <rect x={bx} y={dbY} width={bw} height={dbH} rx={RAD.key} fill="#FFFFFF" stroke={on ? C.accent : C.rule}
            strokeWidth={on ? 4 : 2} strokeDasharray={has || dTyping ? undefined : "8 8"} />
          {has && <text x={bx + bw / 2} y={dbY + dbH / 2 + dSize * 0.36} textAnchor="middle" fontSize={dSize} fontWeight={700} fill={j === 0 ? SB_LEFT : SB_RIGHT}>{v}</text>}
          {on && <rect className="c4-caret" x={bx + bw / 2 + tw / 2 + 4} y={dbY + dbH / 2 - dSize * 0.4} width={4} height={dSize * 0.8} rx={2} fill={C.accent} />}
        </g>
      );
    };
    return (
      <g>
        {/* the kitchen scale, the sack of rice on its pan, the display window */}
        {isLen ? sbTape(scX, 104, 270, 110, C, "tp") : sbScale(scX, scY, 270, 70, C, "sc")}
        {isLen && <rect x={d.x} y={d.y} width={d.w} height={d.h} rx={RAD.key} fill="#FFFFFF" stroke={shade(C.rule, 0.3)} strokeWidth={2} />}
        <rect x={d.x + d.w / 2 - 70} y={d.y - 42} width={140} height={36} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={d.x + d.w / 2} y={d.y - 14} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Decimal")}</text>
        {dText ? sbWeightRow(dText, d.x + d.w / 2, d.y + d.h / 2 + 20, T.xl, 0, "dw") : null}
        {dispAsked && !dText && (
          <g>
            {dBox(d.x + 8, wB, pv[0], 0)}
            <text x={xP + 9} y={dbY + dbH / 2 + 18} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={SB_DOT}>.</text>
            {dBox(xD, wD, pv[1], 1)}
          </g>
        )}
        <rect x={scX + 135 - uW / 2} y={d.y + d.h + 6} width={uW} height={38} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={scX + 135} y={d.y + d.h + 36} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(it.unit || "kg")}</text>
        {decAsked && asking && !open && (
          <g>
            <BlinkRing x={d.x} y={d.y} w={d.w} h={d.h} rx={RAD.panel} C={C} />
            <SlotPartBox id="answer-open" label={tx("Decimal")} x={d.x} y={d.y} w={d.w} h={d.h} on={false} enabled onPick={() => api.openAnswer()} />
          </g>
        )}
        {dTyping && (
          <g>
            <SlotPartBox id="part-1" label={tx("whole part")} x={d.x} y={d.y} w={xP + 9 - d.x} h={d.h} on={part === 0} enabled onPick={() => api.pickPart(0)} />
            <SlotPartBox id="part-2" label={tx("decimal part")} x={xP + 9} y={d.y} w={d.x + d.w - xP - 9} h={d.h} on={part === 1} enabled onPick={() => api.pickPart(1)} />
          </g>
        )}
        {/* the carry: the display's weight comes across to the bench, unchanged on the way */}
        <path d={`M ${scX + 272} ${d.y + 30} C ${scX + 272 + m / 2} ${d.y + 30}, ${bL - m / 2 - 8} ${tileY + 44}, ${bL - 10} ${tileY + 44}`}
          fill="none" stroke={V.carry ? C.accent : C.rule} strokeWidth={V.carry ? 5 : 3} strokeDasharray={V.carry ? undefined : "8 10"} />
        {!V.carried && <rect x={R - 5 * SB_P - 4} y={tileY - 6} width={5 * SB_P - 2} height={SB_TH + 12} rx={RAD.card} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 12" />}
        {/* the weight's tiles (the top number once the dot is out), each a printed character, keyed by where it was printed */}
        {V.carried && chars.map((ch: string, j: number) => {
          if (ch === ".") {
            const inRow = !dropped;
            const cx = inRow ? R - (nT - j) * SB_P + SB_TW / 2 : restX, cy = inRow ? tileY + SB_TH / 2 : restY;
            return (
              <g key={"t" + j} className="sb-move" style={{ transform: `translate(${cx}px, ${cy}px)` } as any}>
                {inRow && <rect x={-SB_TW / 2} y={-SB_TH / 2} width={SB_TW} height={SB_TH} rx={RAD.key} fill={tint(CONTENT.pointer, 0.85)} stroke={C.rule} strokeWidth={2} />}
                {!inRow && <circle cx={0} cy={0} r={22} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="5 5" />}
                <circle cx={0} cy={inRow ? 18 : 0} r={9} fill={SB_DOT} />
              </g>
            );
          }
          const q = dropped && j > di ? j - 1 : j;
          const place = j > di ? j - di - 1 : -1;
          const on = place >= 0 && place < lit;
          const hue = sbHue(place);
          const x = R - (nT - q) * SB_P;
          return (
            <g key={"t" + j} className="sb-move" style={{ transform: `translate(${x}px, ${tileY}px)` } as any}>
              <rect x={0} y={0} width={SB_TW} height={SB_TH} rx={RAD.key} fill={on ? tint(hue, 0.55) : "#FFFFFF"} stroke={on ? shade(hue, 0.3) : C.rule} strokeWidth={on ? 3 : 2} />
              <text x={SB_TW / 2} y={64} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={parked ? C.ink : sbInk(s, j)}>{ch}</text>
              {on && (
                <g>
                  <circle cx={SB_TW - 12} cy={2} r={17} fill="#FFFFFF" stroke={shade(hue, 0.3)} strokeWidth={3} />
                  <text x={SB_TW - 12} y={12} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{place + 1}</text>
                </g>
              )}
              {V.zero && j === chars.length - 1 && <rect x={-7} y={-7} width={SB_TW + 14} height={SB_TH + 14} rx={RAD.key + 6} fill="none" stroke={C.accent} strokeWidth={4} />}
            </g>
          );
        })}
        {/* the bottom number: a one, then a zero under every counted place */}
        {built > 0 && <rect x={R - Math.max(nT, nd + 1) * SB_P} y={botY - 16} width={Math.max(nT, nd + 1) * SB_P - 10} height={6} rx={3} fill={C.ink} />}
        {new Array(Math.min(built, nd + 1)).fill(0).map((_: any, q: number) => {
          /* a zero takes its place's colour once that place is counted (the build counts first; the backwards item counts as
             it builds) */
          const x = R - (nd + 1 - q) * SB_P, hue = sbHue(q - 1), tinted = q > 0 && q - 1 < lit;
          return (
            <g key={"b" + q}>
              <rect x={x} y={botY} width={SB_TW} height={SB_TH} rx={RAD.key} fill={tinted ? tint(hue, 0.55) : "#FFFFFF"} stroke={tinted ? shade(hue, 0.3) : C.rule} strokeWidth={tinted ? 3 : 2} />
              <text x={x + SB_TW / 2} y={botY + 64} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{q === 0 ? "1" : "0"}</text>
            </g>
          );
        })}
        {lit > 0 && <text x={bL + 5 * SB_P / 2} y={322} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{lit + " " + tx(lit === 1 ? "place" : "places")}</text>}
        {/* the step keys (phases 2 and 3): live in a guide step, quiet while a question is asked */}
        {n !== 1 && (
          <g>
            <Key id="count" label={tx("Count")} x={bL} y={420} w={200} h={72} C={C} tone="key" disabled={!demo} onClick={() => doAct("count")}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={demo ? toneInk("key", C.ink) : mix(C.ink, C.panel, 0.35)}>{tx("Count")}</text>
            </Key>
            <Key id="build" label={tx("Build")} x={bL + 240} y={420} w={200} h={72} C={C} tone="key" disabled={!demo} onClick={() => doAct("build")}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={demo ? toneInk("key", C.ink) : mix(C.ink, C.panel, 0.35)}>{tx("Build")}</text>
            </Key>
          </g>
        )}
        {/* the step pieces: the display (carry), the dot (drop), the end zero (zero) */}
        {demo && n === 1 && !V.carried && <Hit id="carry" x={d.x} y={d.y} w={d.w} h={d.h} label={tx("scale display")} onPress={() => doAct("carry")} />}
        {demo && n === 1 && V.carried && !dropped && di >= 0 && <Hit id="drop" x={R - (nT - di) * SB_P} y={tileY} w={SB_TW} h={SB_TH} label={tx("the point")} onPress={() => doAct("drop")} />}
        {demo && n === 3 && <Hit id="zero" x={R - SB_TW - 10} y={tileY} w={SB_TW} h={SB_TH} label={tx("the end zero")} onPress={() => doAct("zero")} />}
        {invite("carry") && <Invite x={d.x + d.w / 2} y={d.y + d.h / 2} r={52} C={C} />}
        {invite("drop") && V.carried && <Invite x={R - (nT - di) * SB_P + SB_TW / 2} y={tileY + SB_TH / 2} r={52} C={C} />}
        {invite("zero") && <Invite x={R - SB_TW / 2 - 10} y={tileY + SB_TH / 2} r={52} C={C} />}
        {invite("count") && sbKeyRing(bL, 420, 200, 72, C)}
        {invite("build") && sbKeyRing(bL + 240, 420, 200, 72, C)}
        {/* the Fraction card */}
        {fracCard(cardX, 40, 220, 330, cardVals(fracAsked, V.cardTop ?? null, V.cardBot ?? null), fracAsked, T.xl, true, "fc")}
      </g>
    );
  };

  /* ═══ phase 4 and free play: the printed row over the tidied row, and the balance beam ═══ */
  const twoRows = () => {
    const m4 = Math.max(30, Math.min(90, (w - 830) / 4));
    const rL = m4, cX = rL + 300, bx = cX + 190 + m4 + 215;
    const asked = (row: string) => !free && !demo && fracAsked && (it.row === "t" ? "t" : "p") === row;
    const P = V.p || none, Tr = V.t || none;
    /* the printed row: the scale itself (box 150 x 174 from y 56, the sack on its pan) prints the weight in its window */
    const pw = sbWin(rL, 40, 190), pMid = pw.y + pw.h / 2, isLen = it.unit === "m";
    const pVals = cardVals(asked("p"), P.top, P.bot);
    /* the tidied row: the same weight written again with one end zero dropped */
    const tVals = cardVals(asked("t"), Tr.top, Tr.bot), ts = sbTidy(s);
    const arrow = (x0: number, x1: number, y: number) => (
      <path d={`M ${x0} ${y} H ${x1 - 2} M ${x1 - 14} ${y - 10} L ${x1} ${y} L ${x1 - 14} ${y + 10}`} fill="none" stroke={C.rule} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    );
    const hung = !!V.hung;
    return (
      <g>
        {isLen ? sbTape(rL, 34, 240, 84, C, "pt") : sbScale(rL, 40, 190, 56, C, "ps")}
        {isLen && <rect x={pw.x} y={pw.y} width={pw.w} height={pw.h} rx={RAD.key} fill="#FFFFFF" stroke={shade(C.rule, 0.3)} strokeWidth={2} />}
        <text x={rL + 132} y={30} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("printed")}</text>
        {sbWeightRow(s, pw.x + pw.w / 2, pw.y + pw.h / 2 + 15, T.prompt, P.lit, "pw")}
        <text x={rL + 198} y={pMid - 4} fontSize={uS} fontWeight={600} fill={C.ink}>{tx(it.unit || "kg")}</text>
        {P.lit > 0 && <text x={rL + 95} y={288} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{P.lit + " " + tx(P.lit === 1 ? "place" : "places")}</text>}
        {arrow(rL + 198, cX - 10, pMid + 24)}
        {fracCard(cX, pMid - 75, 190, 150, pVals, asked("p"), T.speech, false, "pc")}
        {hung && <text x={cX + 95} y={294} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("written differently")}</text>}

        <text x={rL} y={326} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("tidied")}</text>
        <rect x={rL} y={334} width={214} height={64} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray={Tr.shown ? undefined : "10 12"} />
        {Tr.shown && sbWeightRow(ts, rL + (lang === "en" ? 88 : 76), 382, T.speech, Tr.lit, "tw")}
        {Tr.shown && <text x={rL + 204} y={382} textAnchor="end" fontSize={uS} fontWeight={600} fill={C.ink}>{tx(it.unit || "kg")}</text>}
        {Tr.shown && Tr.lit > 0 && <text x={rL + 107} y={428} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{Tr.lit + " " + tx(Tr.lit === 1 ? "place" : "places")}</text>}
        {arrow(rL + 224, cX - 10, 366)}
        {fracCard(cX, 320, 190, 150, tVals, asked("t"), T.speech, false, "tc")}

        {/* the balance beam: it is about how much, so it is level, always */}
        <rect x={bx - 170} y={120} width={340} height={16} rx={8} fill={shade(C.rule, 0.25)} />
        <path d={`M ${bx - 24} ${172} L ${bx + 24} ${172} L ${bx} ${136} Z`} fill={shade(C.rule, 0.35)} />
        <rect x={bx - 9} y={172} width={18} height={228} fill={shade(C.rule, 0.2)} />
        <rect x={bx - 80} y={400} width={160} height={16} rx={6} fill={shade(C.rule, 0.3)} />
        {[["p", -1], ["t", 1]].map(([row, sg]: any) => {
          const r = V[row] || none, px = bx + sg * 150;
          return (
            <g key={"pan" + row}>
              <line x1={px} y1={136} x2={px - 52} y2={194} stroke={shade(C.rule, 0.3)} strokeWidth={3} />
              <line x1={px} y1={136} x2={px + 52} y2={194} stroke={shade(C.rule, 0.3)} strokeWidth={3} />
              <rect x={px - 65} y={194} width={130} height={112} rx={16} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
              {hung && r.bot && sbMini(px, 236, r.top, r.bot, T.label, C, "m" + row)}
            </g>
          );
        })}
        {hung && <text x={bx} y={92} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(it.unit === "m" ? "same length" : "same weight")}</text>}
        {(demo || (free && V.t && V.t.bot)) && <Hit id="beam" x={bx - 215} y={76} w={430} h={340} label={tx("balance beam")} onPress={() => doAct("beam")} />}
        <Key id="tidy" label={tx("Tidy")} x={rL} y={446} w={214} h={72} C={C} tone="key" disabled={!(demo || free)} onClick={() => doAct("tidy")}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={demo || free ? toneInk("key", C.ink) : mix(C.ink, C.panel, 0.35)}>{tx("Tidy")}</text>
        </Key>
        {free && (
          <Key id="weight" label={tx("New weight")} x={bx - 110} y={446} w={220} h={72} C={C} tone="key" onClick={() => doAct("weight")}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={toneInk("key", C.ink)}>{tx("New weight")}</text>
          </Key>
        )}
        {invite("tidy") && sbKeyRing(rL, 446, 214, 72, C)}
        {invite("beam") && <Invite x={bx} y={230} r={60} C={C} />}
      </g>
    );
  };

  return (
    <g>
      <style>{SB_CSS}</style>
      {rows ? twoRows() : bench()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  /* result.last.item is the question's index in its phase (n): the item itself is read from PHASES */
  const ph: any = PHASES[(n || 1) - 1] || PHASES[0];
  const it: any = (typeof last.item === "number" ? ph.items[last.item] : last.item) || {};
  const s = String(it.weight || ""), mid = h / 2;
  const ws = it.row === "t" ? sbTidy(s) : s;
  const ans: any = last.answer !== undefined && last.answer !== null ? last.answer : it.answer;
  const pair = Array.isArray(ans) && ans.length === 2 && it.kind !== "back" ? ans : [sbTop(ws), sbBot(ws)];
  const arrow = <path d={`M 104 ${mid} H 124 M 116 ${mid - 8} L 126 ${mid} L 116 ${mid + 8}`} fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {it.kind === "back" ? (
        <g>
          {sbMini(54, mid - 6, sbTop(s), sbBot(s), T.micro, C, "tg")}
          {arrow}
          <text x={142} y={mid + 11} fontSize={T.label} fontWeight={700} fill={C.ink}>{s}</text>
        </g>
      ) : (
        <g>
          <text x={12} y={mid + 11} fontSize={T.label} fontWeight={700} fill={C.ink}>{ws}</text>
          {arrow}
          {sbMini(142 + (Math.max(String(pair[0]).length, String(pair[1]).length) * T.micro * 0.6 + 14) / 2, mid - 6, pair[0], pair[1], T.micro, C, "tf")}
        </g>
      )}
    </g>
  );
}

function ScaleBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* no point key: every answer is written in boxes (a fraction on the Fraction card, a weight on the Decimal display,
         whose point is already drawn), so a single-box decimal never comes up */
      /* the board layout (LAYOUT.md §1b): the question on a bar across the top, the working area the whole card until
         the keypad opens, the keypad in a panel that slides in from the right */
      board: true,
      /* answering on the card (PATTERNS.md 9e): a fraction is written on the Fraction card, a weight on the scale's
         Decimal display; phase 1's top number keeps the blinking Answer key */
      cardAnswer: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; the win picture waits for the child's tap on Next */
      nextKey: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default ScaleBench;
