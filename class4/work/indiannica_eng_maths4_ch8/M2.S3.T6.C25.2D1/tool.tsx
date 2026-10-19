/* ═══ M2.S3.T6.C25.2D1 · point_slider · tool-specific part ═══════════════════════════════
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
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "point_slider";
const MEDIA_ID = "M2.S3.T6.C25.2D1";
const TOOL_NAME = "Point Slider";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["Count the zeros underneath first. That is how many places you are going to need."];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "Every point walked in from the right, and every filling zero standing in front of the digits.";
/* printed when the child opens Free play: every control it names is live in the free branch of Work */
const FREE_LINE = "Free play: tap the top or bottom number to change it, then walk, fill and run.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "Which side of the digits do the filling zeros go on?";
function StartArt({ box, C, lang, tx }: any) {
  /* 9 hundredths: the fraction, and its digit card with the point card WAITING at its right hand end (nothing walked,
     no gap, no arrow: the start page never answers its own question) */
  const ink = C.ink, red = CONTENT.pointer;
  const fx = 400, cy = box.h / 2;
  const cards = [{ k: "whole", ch: "9" }, { k: "point" }];
  let x = 720;
  const laid = cards.map((c: any) => { const w = c.k === "point" ? 56 : 96; const o = { ...c, x, w }; x += w + 10; return o; });
  const ry = cy - 70;
  return (
    <g>
      <text x={fx} y={cy - 34} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={ink}>9</text>
      <rect x={fx - 80} y={cy - 6} width={160} height={10} rx={5} fill={ink} />
      <text x={fx} y={cy + 82} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={ink}>100</text>
      <path d={`M ${fx + 140} ${cy} H ${680}`} stroke={shade(C.rule, 0.2)} strokeWidth={6} strokeLinecap="round" />
      <path d={`M 668 ${cy - 14} L 688 ${cy} L 668 ${cy + 14} Z`} fill={shade(C.rule, 0.2)} />
      {laid.map((c: any, i: number) => {
        if (c.k === "point") return (
          <g key={i}>
            <rect x={c.x} y={ry} width={c.w} height={140} rx={RAD.piece} fill={tint(red, 0.86)} stroke={red} strokeWidth={3} />
            <circle cx={c.x + c.w / 2} cy={ry + 102} r={11} fill={red} />
          </g>
        );
        return (
          <g key={i}>
            <rect x={c.x} y={ry} width={c.w} height={140} rx={RAD.piece} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
            <text x={c.x + c.w / 2} y={ry + 70 + T.display * 0.35} textAnchor="middle" fontSize={T.display} fontWeight={700}
              fill={shade(CONTENT.hundred, 0.25)}>{c.ch}</text>
          </g>
        );
      })}
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
    "Point Slider": "बिंदु सरकाओ",
    "Free play: tap the top or bottom number to change it, then walk, fill and run.": "मुक्त खेल: ऊपर या नीचे की संख्या छूकर बदलो, फिर सरकाओ, भरो, चलाओ।",
    "Which side of the digits do the filling zeros go on?": "भरने वाले शून्य अंकों की किस तरफ़ जाते हैं?",
    /* phase 1 */
    "Counting the zeros underneath": "नीचे के शून्य गिनना",
    "Tap the zero under the bar.": "रेखा के नीचे का शून्य छुओ।",
    "The zero is in the bottom number.": "शून्य नीचे की संख्या में है।",
    "How many zeros has the bottom got?": "नीचे की संख्या में कितने शून्य हैं?",
    "Light each zero below the bar.": "रेखा के नीचे के सब शून्य छुओ।",
    "The zeros in the denominator count the decimal places, one place for each zero.": "हर के शून्य दशमलव स्थान बताते हैं, प्रत्येक शून्य का एक स्थान।",
    "You learned: the zeros underneath count the decimal places.": "तुमने सीखा: नीचे के शून्य दशमलव स्थान गिनते हैं।",
    "Count the zeros and type how many.": "शून्य गिनो और संख्या लिखो।",
    "How many decimal places?": "कितने दशमलव स्थान?",
    "Count only the zeros, not the 1.": "सिर्फ़ शून्य गिनो, 1 नहीं।",
    "Now count for this bottom number.": "अब इस हर के शून्य गिनो।",
    "Places for a denominator of 1000?": "हर 1000 हो तो कितने स्थान?",
    "Is every digit of that number a zero?": "क्या उसके सारे अंक शून्य हैं?",
    "Count again and type the number.": "फिर गिनो और गिनती लिखो।",
    "29 tenths: digits after the point?": "29 दसवें: दशमलव के बाद कितने अंक?",
    "Look under the bar, not above it.": "रेखा के नीचे देखो, ऊपर नहीं।",
    "Yes, the two zeros give two places.": "हाँ, दो शून्य, तो दो स्थान।",
    "A thousand needs three decimal places.": "हज़ार को तीन दशमलव स्थान चाहिए।",
    "The 29 on top does not change the count.": "ऊपर का 29 गिनती नहीं बदलता।",
    /* phase 2 */
    "Placing the point from the right": "दशमलव बिंदु दाएँ से लगाना",
    "Tap the point card to walk it in.": "बिंदु कार्ड छूकर उसे अंदर सरकाओ।",
    "The point card waits at the right.": "बिंदु कार्ड दाईं ओर है।",
    "Tap again to meet the counter.": "गिनती तक पहुँचने को फिर छुओ।",
    "The counter says two places.": "गिनती दो स्थान बताती है।",
    "What does the places counter say?": "स्थान गिनती क्या बताती है?",
    "Walk one digit in for each zero.": "एक शून्य, एक अंक अंदर।",
    "The point goes in from the right hand end of the numerator. It walks one digit for each zero underneath.": "बिंदु अंश के दाएँ सिरे से अंदर जाता है। नीचे के प्रत्येक शून्य के लिए वह एक अंक चलता है।",
    "You learned: the point walks in from the right hand end.": "तुमने सीखा: बिंदु दाएँ सिरे से अंदर आता है।",
    "Walk the point in, then type it.": "बिंदु अंदर सरकाओ, फिर लिखो।",
    "Write it as a decimal.": "इसे दशमलव में लिखो।",
    "Start the walk at the right end.": "दाएँ सिरे से चलना शुरू करो।",
    "Now turn this one into a decimal.": "अब इसे दशमलव में बदलो।",
    "47 tenths as a decimal?": "47 दसवें भाग दशमलव में?",
    "How far does the counter let it go?": "गिनती उसे कितना आगे जाने देती है?",
    "Walk it in as far as the counter says.": "गिनती जितना बताए, उतना अंदर चलो।",
    "What decimal does it make?": "कौन सा दशमलव बनता है?",
    "Which end do the steps count from?": "कदम किस सिरे से गिने जाते हैं?",
    "The point walked in three digits.": "बिंदु तीन अंक अंदर चला।",
    "One step in from the right.": "दाएँ से एक कदम अंदर।",
    "Three steps in, so the 2 stays as a whole one.": "तीन कदम अंदर, तो 2 इकाई में रहा।",
    /* phase 3 */
    "When the numerator is too short": "जब अंश में अंक कम पड़ें",
    "Tap the zero tray to fill a place.": "स्थान भरने को शून्य ट्रे छुओ।",
    "Tap the grey zeros in the tray.": "ट्रे के स्लेटी शून्य छुओ।",
    "Tap the tray for the last place.": "आखिरी स्थान के लिए ट्रे छुओ।",
    "Another empty place is waiting.": "एक और खाली स्थान बचा है।",
    "Walk in: what is left empty?": "अंदर चलो: क्या खाली बचा?",
    "Fill the places nearest the point.": "बिंदु के सबसे पास के स्थान भरो।",
    "A filling zero goes on the left of the digits, between them and the point.": "भरने वाला शून्य अंकों के बाईं ओर जाता है, उनके और बिंदु के बीच।",
    "You learned: a filling zero goes on the left, next to the point.": "तुमने सीखा: भरने वाला शून्य बाईं ओर, बिंदु के पास जाता है।",
    "Walk the point in, then fill any empty place.": "बिंदु अंदर सरकाओ, खाली स्थान भरो।",
    "What decimal is it?": "यह कौन सा दशमलव है?",
    "Never hang a zero on the right end.": "दाएँ सिरे पर शून्य कभी मत लटकाओ।",
    "Walk it in and fill what is empty.": "अंदर चलाओ और खाली जगह भरो।",
    "5 hundredths as a decimal?": "5 सौवें भाग दशमलव में?",
    "Walk on until it matches the counter.": "गिनती से मिलने तक चलते रहो।",
    "Walk the point in, then write the decimal.": "बिंदु अंदर सरकाओ, फिर दशमलव लिखो।",
    "72 thousandths as a decimal?": "72 हज़ारवें भाग दशमलव में?",
    "Put the zero before the digits.": "शून्य अंकों से पहले रखो।",
    "The zero went in front of the three.": "शून्य तीन के आगे गया।",
    "Five hundredths has no tenths at all.": "पाँच सौवें में कोई दसवाँ भाग नहीं है।",
    "72 thousandths needs one filling zero.": "72 हज़ारवें को एक भरने वाला शून्य चाहिए।",
    /* phase 4 */
    "Why the side matters so much": "तरफ़ इतनी ज़रूरी क्यों है",
    "Tap Run to hang zeros on the right.": "चलाओ छूकर शून्य दाईं ओर लटकाओ।",
    "Run is beside the lower lane.": "चलाओ नीचे के रास्ते के पास है।",
    "Tap Measure to see the gap.": "नापो छूकर अंतर देखो।",
    "Measure is beside the bar.": "नापो पट्टी के पास है।",
    "Is that the same size as the fraction?": "क्या वह भिन्न जितना ही है?",
    "Walk the top point in, then read it.": "ऊपर का बिंदु अंदर चलाओ, फिर पढ़ो।",
    "Zeros on the left make a number smaller. Zeros on the right make it bigger.": "बाईं ओर के शून्य संख्या को छोटा बनाते हैं। दाईं ओर के शून्य उसे बड़ा बनाते हैं।",
    "You learned: zeros on the right make a number bigger, not smaller.": "तुमने सीखा: दाईं ओर के शून्य संख्या को बड़ा बनाते हैं, छोटा नहीं।",
    "Run the lower lane, then type the right decimal.": "नीचे का रास्ता चलाओ, फिर सही दशमलव लिखो।",
    "What should it really be?": "असल में यह क्या होना चाहिए?",
    "Count the places in the lower lane.": "नीचे के रास्ते के स्थान गिनो।",
    "Run it and build the top lane.": "उसे चलाओ और ऊपर का रास्ता बनाओ।",
    "Someone wrote 4.00: what is right?": "किसी ने 4.00 लिखा: सही क्या है?",
    "Which side got that lane's zeros?": "उस रास्ते के शून्य किस तरफ़ गए?",
    "Write this turmeric weight as a decimal.": "हल्दी का यह वज़न दशमलव में लिखो।",
    "Turmeric: 5 tenths of a kilogram?": "हल्दी: एक किलोग्राम के 5 दसवें भाग?",
    "The counter holds a single place.": "गिनती में सिर्फ़ एक स्थान है।",
    "That lane was a thousand times too big.": "वह रास्ता हज़ार गुना बड़ा निकला।",
    "4.00 is four whole ones, not four hundredths.": "4.00 चार पूरे हैं, चार सौवें नहीं।",
    "One place, one digit: no zero needed.": "एक स्थान, एक अंक: शून्य नहीं चाहिए।",
    /* the words the picture draws (Work, Runs, Thumb) */
    "done": "हो गए",
    "Count this top digit": "ऊपर का यह अंक गिनो",
    "Count this bottom digit": "नीचे का यह अंक गिनो",
    "Change the top number": "ऊपर की संख्या बदलो",
    "Change the bottom number": "नीचे की संख्या बदलो",
    "Walk the point in one digit": "बिंदु को एक अंक अंदर सरकाओ",
    "Take a zero for an empty place": "खाली स्थान के लिए शून्य लो",
    "Measure how far apart they are": "नापो कि दोनों में कितना अंतर है",
    "Run the other lane": "दूसरा रास्ता चलाओ",
    "places counter": "स्थान गिनती",
    "place": "स्थान", "places": "स्थान",
    "zero tray": "शून्य ट्रे",
    "you typed": "तुमने लिखा",
    "times bigger": "गुना बड़ा",
    "zeros left": "शून्य बाएँ",
    "zeros right": "शून्य दाएँ",
    "Measure": "नापो",
    "Run": "चलाओ",
  },
  gu: {
    "Point Slider": "દશાંશ ચિહ્ન સરકાવો",
    "Free play: tap the top or bottom number to change it, then walk, fill and run.": "મુક્ત રમત: ઉપર કે નીચેની સંખ્યા દબાવી બદલો, પછી સરકાવો, ભરો, ચલાવો.",
    "Which side of the digits do the filling zeros go on?": "ભરનાર શૂન્ય અંકોની કઈ બાજુ જાય છે?",
    /* phase 1 */
    "Counting the zeros underneath": "નીચેના શૂન્ય ગણવા",
    "Tap the zero under the bar.": "રેખા નીચેનું શૂન્ય દબાવો.",
    "The zero is in the bottom number.": "શૂન્ય નીચેની સંખ્યામાં છે.",
    "How many zeros has the bottom got?": "નીચેની સંખ્યામાં કેટલા શૂન્ય છે?",
    "Light each zero below the bar.": "રેખા નીચેના બધા શૂન્ય દબાવો.",
    "The zeros in the denominator count the decimal places, one place for each zero.": "છેદના શૂન્ય દશાંશ સ્થાન બતાવે છે, દરેક શૂન્યનું એક સ્થાન.",
    "You learned: the zeros underneath count the decimal places.": "તમે શીખ્યા: નીચેના શૂન્ય દશાંશ સ્થાન ગણે છે.",
    "Count the zeros and type how many.": "શૂન્ય ગણો અને સંખ્યા લખો.",
    "How many decimal places?": "કેટલા દશાંશ સ્થાન?",
    "Count only the zeros, not the 1.": "ફક્ત શૂન્ય ગણો, 1 નહીં.",
    "Now count for this bottom number.": "હવે આ છેદના શૂન્ય ગણો.",
    "Places for a denominator of 1000?": "છેદ 1000 હોય તો કેટલા સ્થાન?",
    "Is every digit of that number a zero?": "શું તેના બધા અંક શૂન્ય છે?",
    "Count again and type the number.": "ફરી ગણો અને ગણતરી લખો.",
    "29 tenths: digits after the point?": "29 દશમા: દશાંશ પછી કેટલા અંક?",
    "Look under the bar, not above it.": "રેખાની નીચે જુઓ, ઉપર નહીં.",
    "Yes, the two zeros give two places.": "હા, બે શૂન્ય, એટલે બે સ્થાન.",
    "A thousand needs three decimal places.": "હજારને ત્રણ દશાંશ સ્થાન જોઈએ.",
    "The 29 on top does not change the count.": "ઉપરના 29થી ગણતરી બદલાતી નથી.",
    /* phase 2 */
    "Placing the point from the right": "દશાંશ ચિહ્ન જમણેથી મૂકવું",
    "Tap the point card to walk it in.": "ચિહ્ન કાર્ડ દબાવી અંદર સરકાવો.",
    "The point card waits at the right.": "ચિહ્ન કાર્ડ જમણી બાજુ છે.",
    "Tap again to meet the counter.": "ગણતરી સુધી પહોંચવા ફરી દબાવો.",
    "The counter says two places.": "ગણતરી બે સ્થાન બતાવે છે.",
    "What does the places counter say?": "સ્થાન ગણતરી શું બતાવે છે?",
    "Walk one digit in for each zero.": "દરેક શૂન્ય માટે એક અંક અંદર.",
    "The point goes in from the right hand end of the numerator. It walks one digit for each zero underneath.": "ચિહ્ન અંશના જમણા છેડેથી અંદર જાય છે. નીચેના દરેક શૂન્ય માટે તે એક અંક ચાલે છે.",
    "You learned: the point walks in from the right hand end.": "તમે શીખ્યા: ચિહ્ન જમણા છેડેથી અંદર આવે છે.",
    "Walk the point in, then type it.": "ચિહ્ન અંદર સરકાવો, પછી લખો.",
    "Write it as a decimal.": "તેને દશાંશમાં લખો.",
    "Start the walk at the right end.": "જમણા છેડેથી ચાલવાનું શરૂ કરો.",
    "Now turn this one into a decimal.": "હવે આને દશાંશમાં બદલો.",
    "47 tenths as a decimal?": "47 દશમા ભાગ દશાંશમાં?",
    "How far does the counter let it go?": "ગણતરી તેને કેટલું આગળ જવા દે છે?",
    "Walk it in as far as the counter says.": "ગણતરી કહે એટલું અંદર ચલાવો.",
    "What decimal does it make?": "કયો દશાંશ બને છે?",
    "Which end do the steps count from?": "પગલાં કયા છેડેથી ગણાય છે?",
    "The point walked in three digits.": "ચિહ્ન ત્રણ અંક અંદર ચાલ્યું.",
    "One step in from the right.": "જમણેથી એક પગલું અંદર.",
    "Three steps in, so the 2 stays as a whole one.": "ત્રણ પગલાં અંદર, એટલે 2 એકમમાં રહ્યો.",
    /* phase 3 */
    "When the numerator is too short": "જ્યારે અંશમાં અંક ઓછા પડે",
    "Tap the zero tray to fill a place.": "સ્થાન ભરવા શૂન્ય ટ્રે દબાવો.",
    "Tap the grey zeros in the tray.": "ટ્રેના રાખોડી શૂન્ય દબાવો.",
    "Tap the tray for the last place.": "છેલ્લા સ્થાન માટે ટ્રે દબાવો.",
    "Another empty place is waiting.": "હજી એક ખાલી સ્થાન બાકી છે.",
    "Walk in: what is left empty?": "અંદર ચાલો: શું ખાલી રહ્યું?",
    "Fill the places nearest the point.": "ચિહ્નની સૌથી પાસેનાં સ્થાન ભરો.",
    "A filling zero goes on the left of the digits, between them and the point.": "ભરનાર શૂન્ય અંકોની ડાબી બાજુ જાય છે, અંકો અને ચિહ્નની વચ્ચે.",
    "You learned: a filling zero goes on the left, next to the point.": "તમે શીખ્યા: ભરનાર શૂન્ય ડાબી બાજુ, ચિહ્નની પાસે જાય છે.",
    "Walk the point in, then fill any empty place.": "ચિહ્ન અંદર સરકાવો, ખાલી સ્થાન ભરો.",
    "What decimal is it?": "આ કયો દશાંશ છે?",
    "Never hang a zero on the right end.": "જમણા છેડે શૂન્ય ક્યારેય ન લટકાવો.",
    "Walk it in and fill what is empty.": "અંદર ચલાવો અને ખાલી જગ્યા ભરો.",
    "5 hundredths as a decimal?": "5 સોમા ભાગ દશાંશમાં?",
    "Walk on until it matches the counter.": "ગણતરી સાથે મળે ત્યાં સુધી ચાલો.",
    "Walk the point in, then write the decimal.": "ચિહ્ન અંદર સરકાવો, પછી દશાંશ લખો.",
    "72 thousandths as a decimal?": "72 હજારમા ભાગ દશાંશમાં?",
    "Put the zero before the digits.": "શૂન્ય અંકોની પહેલાં મૂકો.",
    "The zero went in front of the three.": "શૂન્ય ત્રણની આગળ ગયું.",
    "Five hundredths has no tenths at all.": "પાંચ સોમામાં એક પણ દશમો ભાગ નથી.",
    "72 thousandths needs one filling zero.": "72 હજારમાને એક ભરનાર શૂન્ય જોઈએ.",
    /* phase 4 */
    "Why the side matters so much": "બાજુ આટલી જરૂરી કેમ છે",
    "Tap Run to hang zeros on the right.": "ચલાવો દબાવી શૂન્ય જમણે લટકાવો.",
    "Run is beside the lower lane.": "ચલાવો નીચલા રસ્તા પાસે છે.",
    "Tap Measure to see the gap.": "માપો દબાવી અંતર જુઓ.",
    "Measure is beside the bar.": "માપો પટ્ટી પાસે છે.",
    "Is that the same size as the fraction?": "શું તે અપૂર્ણાંક જેટલું જ છે?",
    "Walk the top point in, then read it.": "ઉપરનું ચિહ્ન અંદર ચલાવો, પછી વાંચો.",
    "Zeros on the left make a number smaller. Zeros on the right make it bigger.": "ડાબી બાજુના શૂન્ય સંખ્યાને નાની બનાવે છે. જમણી બાજુના શૂન્ય તેને મોટી બનાવે છે.",
    "You learned: zeros on the right make a number bigger, not smaller.": "તમે શીખ્યા: જમણી બાજુના શૂન્ય સંખ્યાને મોટી બનાવે છે, નાની નહીં.",
    "Run the lower lane, then type the right decimal.": "નીચલો રસ્તો ચલાવો, પછી સાચો દશાંશ લખો.",
    "What should it really be?": "ખરેખર તે શું હોવું જોઈએ?",
    "Count the places in the lower lane.": "નીચલા રસ્તાના સ્થાન ગણો.",
    "Run it and build the top lane.": "તે ચલાવો અને ઉપરનો રસ્તો બનાવો.",
    "Someone wrote 4.00: what is right?": "કોઈએ 4.00 લખ્યું: સાચું શું છે?",
    "Which side got that lane's zeros?": "એ રસ્તાના શૂન્ય કઈ બાજુ ગયા?",
    "Write this turmeric weight as a decimal.": "હળદરનું આ વજન દશાંશમાં લખો.",
    "Turmeric: 5 tenths of a kilogram?": "હળદર: એક કિલોગ્રામના 5 દશમા ભાગ?",
    "The counter holds a single place.": "ગણતરીમાં ફક્ત એક સ્થાન છે.",
    "That lane was a thousand times too big.": "તે રસ્તો હજાર ગણો મોટો નીકળ્યો.",
    "4.00 is four whole ones, not four hundredths.": "4.00 ચાર આખા છે, ચાર સોમા નહીં.",
    "One place, one digit: no zero needed.": "એક સ્થાન, એક અંક: શૂન્ય જોઈતું નથી.",
    /* the words the picture draws (Work, Runs, Thumb) */
    "done": "થયા",
    "Count this top digit": "ઉપરનો આ અંક ગણો",
    "Count this bottom digit": "નીચેનો આ અંક ગણો",
    "Change the top number": "ઉપરની સંખ્યા બદલો",
    "Change the bottom number": "નીચેની સંખ્યા બદલો",
    "Walk the point in one digit": "ચિહ્નને એક અંક અંદર સરકાવો",
    "Take a zero for an empty place": "ખાલી સ્થાન માટે શૂન્ય લો",
    "Measure how far apart they are": "બંને વચ્ચે કેટલું અંતર છે તે માપો",
    "Run the other lane": "બીજો રસ્તો ચલાવો",
    "places counter": "સ્થાન ગણતરી",
    "place": "સ્થાન", "places": "સ્થાન",
    "zero tray": "શૂન્ય ટ્રે",
    "you typed": "તમે લખ્યું",
    "times bigger": "ગણું મોટું",
    "zeros left": "શૂન્ય ડાબે",
    "zeros right": "શૂન્ય જમણે",
    "Measure": "માપો",
    "Run": "ચલાવો",
  },
};

/* One entry per phase = one mount.
   says    the teach run, printed on the bubble a piece at a time before anything is asked (numbers are printed as words)
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
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone); steps are the newer way
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the question's line on the bubble (one sentence: one page); ask = the short prompt above the slot
                 (<= 3 lines of ~15 chars)
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
    concept: "Counting the zeros underneath",
    conceptId: "M2.S3.T6.C25", objectiveIds: ["O9"],
    says: ["Count the zeros underneath. That is how many places you need."],
    /* the warm-up counts 7/10 (not Q1's 100): a tap on the zero of the ten lights it and draws its place */
    steps: [{ say: "Tap the zero under the bar.", on: "den-1", hint: "The zero is in the bottom number." }],
    /* tries: rung 1 is each item's miss; then these (no number words here: the answers are counts). Every instruction
       is at most 35 characters and every hint 34 as printed, so a pair takes one bubble line each */
    ladder: ["How many zeros has the bottom got?", "Light each zero below the bar."],
    closing: "The zeros in the denominator count the decimal places, one place for each zero.",
    learned: "You learned: the zeros underneath count the decimal places.",
    traceback: "The zeros of the denominator light one at a time with the leading digit left plain, and a point is drawn with one empty place for each zero, ending on the count of places.",
    items: [
      /* learn ML1: answer in the plan = Two decimal places, because the hundred underneath has two zeros, and the decimal is 3.56.
         The phase counts places, so the slot takes the count; the win drops 356 into the places it found (3.56).
         rival 3 = the digits of the top number counted */
      { qid: "M2.S3.T6.C25:ML1", kind: "count", num: "356", den: 100, rival: 3, answer: 2,
        say: "Count the zeros and type how many.", ask: "How many decimal places?",
        miss: "Count only the zeros, not the 1." },
      /* practice 1: answer in the plan = Three, one for each zero in the thousand (rival 4 = every digit of 1,000) */
      { qid: "M2.S3.T6.C25:1", kind: "count", num: "", den: 1000, rival: 4, answer: 3,
        say: "Now count for this bottom number.", ask: "Places for a denominator of 1000?",
        miss: "Is every digit of that number a zero?" },
      /* practice 2: answer in the plan = One zero, so one digit goes after the point (rival 2 = the digits of 29 or of 10) */
      { qid: "M2.S3.T6.C25:2", kind: "count", num: "29", den: 10, rival: 2, answer: 1,
        say: "Count again and type the number.", ask: "29 tenths: digits after the point?",
        miss: "Look under the bar, not above it." },
    ],
  },
  {
    n: 2,
    concept: "Placing the point from the right",
    conceptId: "M2.S3.T6.C26", objectiveIds: ["O9"],
    says: ["Start at the right hand end and walk the point in. Count as you go."],
    /* the warm-up walks the point into 349/100 (none of the questions' numbers): one tap a digit */
    steps: [
      { say: "Tap the point card to walk it in.", on: "point", hint: "The point card waits at the right." },
      { say: "Tap again to meet the counter.", on: "point", hint: "The counter says two places." },
    ],
    ladder: ["What does the places counter say?", "Walk one digit in for each zero."],
    closing: "The point goes in from the right hand end of the numerator. It walks one digit for each zero underneath.",
    learned: "You learned: the point walks in from the right hand end.",
    traceback: "A second row is laid under the child's: its point card starts at the right hand end and walks in one digit for each zero, each place numbered from the point, ending on the decimal.",
    items: [
      /* learn ML2: answer in the plan = 0.617 (rival 6.17 = the point dropped after the first digit, counted from the left) */
      { qid: "M2.S3.T6.C26:ML2", kind: "point", num: "617", den: 1000, rival: "6.17", answer: "0.617",
        say: "Walk the point in, then type it.", ask: "Write it as a decimal.",
        miss: "Start the walk at the right end." },
      /* practice 3: answer in the plan = 4.7 (rival 0.47 = the card walked past the count) */
      { qid: "M2.S3.T6.C26:3", kind: "point", num: "47", den: 10, rival: "0.47", answer: "4.7",
        say: "Now turn this one into a decimal.", ask: "47 tenths as a decimal?",
        miss: "How far does the counter let it go?" },
      /* practice 4: answer in the plan = 2.358 (rival 235.8 = counted in from the left hand end) */
      { qid: "M2.S3.T6.C26:4", kind: "point", num: "2358", den: 1000, rival: "235.8", answer: "2.358",
        say: "Walk it in as far as the counter says.", ask: "What decimal does it make?",
        miss: "Which end do the steps count from?" },
    ],
  },
  {
    n: 3,
    concept: "When the numerator is too short",
    conceptId: "M2.S3.T6.C27", objectiveIds: ["O10"],
    says: ["The digits have run out. Which side are the empty places on?"],
    /* the warm-up fills 4/1000 (the book's own example, 0.004; none of the questions'): one tap a zero */
    steps: [
      { say: "Tap the zero tray to fill a place.", on: "tray", hint: "Tap the grey zeros in the tray." },
      { say: "Tap the tray for the last place.", on: "tray", hint: "Another empty place is waiting." },
    ],
    ladder: ["Walk in: what is left empty?", "Fill the places nearest the point."],
    closing: "A filling zero goes on the left of the digits, between them and the point.",
    learned: "You learned: a filling zero goes on the left, next to the point.",
    traceback: "A second row is laid beside the child's own: its point walks in from the right hand end, the empty places light between the point and the digits with a short arrow running inward, and grey zeros fill them, ending on the decimal.",
    items: [
      /* learn ML3: answer in the plan = 0.03, with the zero placed in front of the three (rival 0.30 = hung on the right) */
      { qid: "M2.S3.T6.C27:ML3", kind: "fill", num: "3", den: 100, rival: "0.30", answer: "0.03",
        say: "Walk the point in, then fill any empty place.", ask: "What decimal is it?",
        miss: "Never hang a zero on the right end." },
      /* practice 5: answer in the plan = 0.05, and the zero goes on the left, in front of the five
         (rival 0.5 = the point dropped with nothing filled) */
      { qid: "M2.S3.T6.C27:5", kind: "fill", num: "5", den: 100, rival: "0.5", answer: "0.05",
        say: "Walk it in and fill what is empty.", ask: "5 hundredths as a decimal?",
        miss: "Walk on until it matches the counter." },
      /* practice 6: answer in the plan = 0.072 (rival 0.720 = the zero hung on the right) */
      { qid: "M2.S3.T6.C27:6", kind: "fill", num: "72", den: 1000, rival: "0.720", answer: "0.072",
        say: "Walk the point in, then write the decimal.", ask: "72 thousandths as a decimal?",
        miss: "Put the zero before the digits." },
    ],
  },
  {
    n: 4,
    concept: "Why the side matters so much",
    conceptId: "M2.S3.T6.C28", objectiveIds: ["O10"],
    says: ["Try it the other way and see where it lands. How far apart are they?"],
    /* the warm-up runs 9/100 (the book's own example; the upper lane already worked, as no question asks it) */
    steps: [
      { say: "Tap Run to hang zeros on the right.", on: "run", hint: "Run is beside the lower lane." },
      { say: "Tap Measure to see the gap.", on: "measure", hint: "Measure is beside the bar." },
    ],
    ladder: ["Is that the same size as the fraction?", "Walk the top point in, then read it."],
    closing: "Zeros on the left make a number smaller. Zeros on the right make it bigger.",
    learned: "You learned: zeros on the right make a number bigger, not smaller.",
    traceback: "The other lane runs to its finish, the top lane is built with its zeros on the left of the digits, and the distance bar writes how many times apart they are, ending on the decimal.",
    items: [
      /* learn ML4: answer in the plan = They get 6, which is a thousand times too big. The answer is 0.006
         (the slot takes what it should be; the lane shows what they get) */
      { qid: "M2.S3.T6.C28:ML4", kind: "lane", num: "6", den: 1000, rival: "6", answer: "0.006", winMs: 3400,
        say: "Run the lower lane, then type the right decimal.", ask: "What should it really be?",
        miss: "Count the places in the lower lane." },
      /* practice 7: answer in the plan = It is a hundred times too big. The right answer is 0.04, with one zero placed in front of the four */
      { qid: "M2.S3.T6.C28:7", kind: "lane", num: "4", den: 100, rival: "4.00", answer: "0.04", winMs: 3000,
        say: "Run it and build the top lane.", ask: "Someone wrote 4.00: what is right?",
        miss: "Which side got that lane's zeros?" },
      /* practice 8: answer in the plan = 0.5 kg, because only one decimal place is wanted and the five fills it on its own
         (rival 0.05 = a padding zero nobody asked for) */
      { qid: "M2.S3.T6.C28:8", kind: "lane", num: "5", den: 10, rival: "0.05", answer: "0.5", winMs: 2600, over: true,
        say: "Write this turmeric weight as a decimal.", ask: "Turmeric: 5 tenths of a kilogram?",
        miss: "The counter holds a single place." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  denominators: [10, 100, 1000],
  fillingZerosGo: "left of the digits, between them and the point",
  card: { digit: 96, point: 56, height: 116, gap: 8 },
  /* the warm-up of each phase (guide steps): its own small fraction, never a question's */
  warmUp: { 1: { num: "7", den: 10 }, 2: { num: "349", den: 100 }, 3: { num: "4", den: 1000 }, 4: { num: "9", den: 100 } },
  freeNumerators: ["4", "36", "7", "250", "9"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a count compares as a whole number ("2"); a decimal is a string in its written form, compared
   exactly ("0.30" is not "0.03", ".03" is not "0.03": the book writes the zero in front every time) */
const judge = (item: any, v: any) => {
  const s = String(v ?? "").trim();
  if (typeof item.answer === "number") return /^\d+$/.test(s) && Number(s) === item.answer;
  return s === String(item.answer);
};
/* oracle: plain arithmetic, a second route that touches neither judge's strings nor the picture:
   numerator / denominator, and the written form carries exactly as many places as the denominator
   has zeros, with a digit in front of the point */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const places = Math.round(Math.log(it.den) / Math.log(10));
  if (Math.pow(10, places) !== it.den) return false;
  if (it.kind === "count") return it.answer === places && String(it.rival) !== String(it.answer);
  const exact = Number(it.num) / it.den;
  const s = String(it.answer), dot = s.indexOf(".");
  if (dot < 1 || s.length - dot - 1 !== places) return false;
  return Math.abs(Number(s) - exact) < 1e-12 && String(it.rival) !== s;
}));
/* the most likely wrong answer (this question's own misconception); judge must reject it */
const nearMiss = (item: any) => item.rival;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (typeof item.answer === "number"
  ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer), speakable(String(item.answer))]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): toolApi.answer strips non-digits, so a decimal would lose its point; the tool types it */
const answer = (item: any, v: any) => {
  if (!HOOK.type) return undefined;
  HOOK.type(String(v ?? ""));
  return true;
};
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter. In a guide-steps phase
   (stage "demo") it must return undefined, so the agent's check() reaches api.onEnter and performs the current step:
   set HOOK.check only while a question is open */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Its size is `box` ({ w, h, open }): the whole card (1472 x 528) with the answer panel shut and 1086 x 528 with it
   open, easing between (the board layout, docs/LAYOUT.md §1b, docs/PATTERNS.md §14): lay everything out from box.w
   with plain arithmetic in render, never from constants or api.W. Origin at the area's top-left.
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
/* the chapter's content colours: a digit left of the point deep blue, right of it deep green, the point vermilion,
   a zero only holding a place open grey (same size and weight as every digit), a lit thing amber */
const PS_BLUE = shade(CONTENT.hundred, 0.25);
const PS_GREEN = shade(CONTENT.one, 0.25);
const PS_RED = CONTENT.pointer;
const PS_AMBER = CONTENT.ten;
const PS_GREY = "#767676";
const PS_NUMINK = "#5B6770";
/* card sizes: the child's row, the two lanes, the correction's row */
/* sized for the last bench (bigPad: the open working area is 900 x 528): fs = the digits' size, ag = the arrow's gap */
const PS_BIG = { cw: 104, pw: 60, h: 120, gap: 10, fs: 72, ag: 18 };
const PS_LANE = { cw: 80, pw: 52, h: 96, gap: 8, fs: 56, ag: 14 };
const PS_SMALL = { cw: 56, pw: 36, h: 76, gap: 6, fs: 40, ag: 12 };
/* the fraction's digit pitch (each digit a 80 x 80 cell, digits at 72) */
const PS_FP = 80;
/* the child's typed answer laid out as a row of its own (a count as a point and that many places), or null when it
   is not a row the cards can show */
const psTypedCells = (s: string, count: boolean) => {
  if (count) return /^\d+$/.test(s) && Number(s) <= 8 ? psPlaces(Number(s)) : null;
  if (!/^\d*\.?\d*$/.test(s) || !/\d/.test(s)) return null;
  const dot = s.indexOf("."), whole = dot < 0 ? s : s.slice(0, dot), frac = dot < 0 ? "" : s.slice(dot + 1), out: any[] = [];
  for (const ch of whole) out.push({ k: whole === "0" ? "lead" : "whole", ch });
  if (dot >= 0) out.push({ k: "point" });
  for (const ch of frac) out.push({ k: "frac", ch });
  return out.length <= 9 ? out : null;
};
const PS_KINDS = ["count", "point", "fill", "lane"];

const psZeros = (d: number) => String(d).length - 1;
/* the cards of one row, left to right. digits: the numerator; at: places after the point (0 = the point waits at the
   right hand end); fill: filling zeros placed, from the point outward; hang: zeros hung on the right (the other lane).
   When the point has passed every digit, the ones place takes the zero in front, and the places still empty sit
   between the point and the digits: on the LEFT of the digits, nearest the point. */
const psCells = (digits: string, at: number, fill: number, hang = 0) => {
  const d = digits + "0".repeat(Math.max(0, hang)), nd = d.length, out: any[] = [];
  if (at >= nd) out.push({ k: "lead", ch: "0" });
  else for (let i = 0; i < nd - at; i++) out.push({ k: "whole", ch: d[i], hung: i >= digits.length });
  out.push({ k: "point" });
  for (let i = 0; i < at - nd; i++) out.push({ k: "gap", ch: i < fill ? "0" : "" });
  for (let i = Math.max(0, nd - at); i < nd; i++) out.push({ k: "frac", ch: d[i], hung: i >= digits.length });
  return out;
};
/* phase 1's row: a point and one empty place for each zero counted */
const psPlaces = (k: number) => [{ k: "point" }].concat(Array.from({ length: Math.max(0, k) }, () => ({ k: "gap", ch: "" })) as any[]);
const psLay = (cells: any[], R: any, x0: number) => {
  let x = x0;
  return cells.map((c: any) => { const w = c.k === "point" ? R.pw : R.cw; const o = { ...c, x, w }; x += w + R.gap; return o; });
};
const psWide = (cells: any[], R: any) => cells.reduce((s: number, c: any) => s + (c.k === "point" ? R.pw : R.cw), 0) + R.gap * Math.max(0, cells.length - 1);
/* the row written out ("0.617", "6.000"); with the point still at the right hand end, just the digits */
const psWritten = (cells: any[]) => {
  const pi = cells.findIndex((c: any) => c.k === "point");
  const left = cells.slice(0, pi).map((c: any) => c.ch).join(""), right = cells.slice(pi + 1).map((c: any) => c.ch || "_").join("");
  return right ? left + "." + right : left;
};
/* where the fraction's digit cells sit (72 a digit, the numerator over a near-black bar over the denominator) */
const psFrac = (num: string, den: number, x: number, y: number) => {
  const P = PS_FP, ds = String(den), len = Math.max(num.length || 1, ds.length), fw = len * P;
  return { x, y, fw, ds, P, nx: x + (fw - Math.max(1, num.length) * P) / 2, dx: x + (fw - ds.length * P) / 2, ny: y, dy: y + P + 22, by: y + P + 6 };
};
const psArrow = (x1: number, x2: number, y: number) => (
  <g pointerEvents="none">
    <line x1={x1} y1={y} x2={x2 - 14} y2={y} stroke={PS_RED} strokeWidth={4} strokeLinecap="round" />
    <path d={`M ${x2 - 18} ${y - 10} L ${x2} ${y} L ${x2 - 18} ${y + 10} Z`} fill={PS_RED} />
  </g>
);
/* one row of cards, drawn (a helper that is called, never mounted). Every card is its own element with its own box
   (c.x, y, c.w, R.h): `o.skin(c, x, y, w, h)`, when given, is drawn over the plain card and under its digit (a <Skin>
   later; the plain card stays the fallback) */
const psRow = (laid: any[], y: number, R: any, C: any, o: any = {}) => {
  const fs = R.fs || (R.h >= 110 ? T.xl : R.h >= 84 ? T.speech : T.label);
  const pi = laid.findIndex((c: any) => c.k === "point"), p = laid[pi];
  const open = laid.find((c: any) => c.k === "gap" && !c.ch);
  return (
    <g>
      {laid.map((c: any, i: number) => {
        if (c.k === "point") return (
          <g key={i}>
            <rect x={c.x} y={y} width={c.w} height={R.h} rx={RAD.piece} fill={tint(PS_RED, 0.86)} stroke={PS_RED} strokeWidth={2.5} />
            {o.skin && o.skin(c, c.x, y, c.w, R.h)}
            <circle cx={c.x + c.w / 2} cy={y + R.h * 0.72} r={Math.max(7, R.pw * 0.17)} fill={PS_RED} />
          </g>
        );
        if (c.k === "gap" && !c.ch) return (
          <rect key={i} x={c.x} y={y} width={c.w} height={R.h} rx={RAD.piece} fill={tint(PS_AMBER, o.refuse ? 0.5 : 0.8)}
            stroke={shade(PS_AMBER, 0.2)} strokeWidth={3} strokeDasharray="9 7" />
        );
        const ink = c.k === "lead" || c.k === "gap" || c.hung ? PS_GREY : c.k === "whole" ? PS_BLUE : PS_GREEN;
        return (
          <g key={i}>
            <rect x={c.x} y={y} width={c.w} height={R.h} rx={RAD.piece} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
            {o.skin && o.skin(c, c.x, y, c.w, R.h)}
            <text x={c.x + c.w / 2} y={y + R.h / 2 + fs * 0.35} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{c.ch}</text>
          </g>
        );
      })}
      {o.nums && pi >= 0 && laid.slice(pi + 1).map((c: any, j: number) => (
        <text key={"n" + j} x={c.x + c.w / 2} y={y - 12} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={PS_NUMINK}>{j + 1}</text>
      ))}
      {o.arrow && open && p && psArrow(p.x + p.w, open.x + open.w / 2, y + R.h + (R.ag || 18))}
    </g>
  );
};
/* the win line: a fixed literal for each question (printed on the bubble; TR carries hi and gu). One short sentence
   each, so it is read within the celebration (classroom timing) */
const psSayWin = (api: any, qid: string) => {
  if (qid === "M2.S3.T6.C25:ML1") api.say("Yes, the two zeros give two places.");
  else if (qid === "M2.S3.T6.C25:1") api.say("A thousand needs three decimal places.");
  else if (qid === "M2.S3.T6.C25:2") api.say("The 29 on top does not change the count.");
  else if (qid === "M2.S3.T6.C26:ML2") api.say("The point walked in three digits.");
  else if (qid === "M2.S3.T6.C26:3") api.say("One step in from the right.");
  else if (qid === "M2.S3.T6.C26:4") api.say("Three steps in, so the 2 stays as a whole one.");
  else if (qid === "M2.S3.T6.C27:ML3") api.say("The zero went in front of the three.");
  else if (qid === "M2.S3.T6.C27:5") api.say("Five hundredths has no tenths at all.");
  else if (qid === "M2.S3.T6.C27:6") api.say("72 thousandths needs one filling zero.");
  else if (qid === "M2.S3.T6.C28:ML4") api.say("That lane was a thousand times too big.");
  else if (qid === "M2.S3.T6.C28:7") api.say("4.00 is four whole ones, not four hundredths.");
  else if (qid === "M2.S3.T6.C28:8") api.say("One place, one digit: no zero needed.");
};

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();    /* the traceback and the win */
  const tlB = useTimeline();   /* the other lane's run */
  const Wd = box ? box.w : W.w;
  const pn = (phase && phase.n) || n || 1;
  const free = stage === "free";
  const demo = stage === "demo" || stage === "teach";
  const ctx = free ? "free" : demo ? "d" + pn : "q" + pn + "." + index;

  /* the fraction in play: the warm-up's own in the guide steps, the question's, or free play's */
  const conf = () => {
    if (free) return { kind: "free", num: MODEL.freeNumerators[0], den: 100 };
    if (demo) return { kind: PS_KINDS[pn - 1] || "count", ...(MODEL.warmUp[pn] || MODEL.warmUp[1]) };
    return item || {};
  };
  const setup = (c: any, key: string) => {
    const den = c.den || 100, z = psZeros(den), num = c.num || "";
    const s: any = { ctx: key, kind: c.kind || "count", num, den, over: !!c.over, lit: [], litTop: [], at: 0, fill: 0,
      hang: 0, bAt: 0, run: 0, measured: false, refuse: 0, done: false, fi: 0, di: 1 };
    if (demo && s.kind === "fill") s.at = z;                  /* the warm-up's worked example: its empty places already lit */
    /* a phase 3 QUESTION opens with the point waiting at the right hand end: the child walks it in, and the empty places
       appear (on the left of the digits) only as the point passes them, so the picture never answers the question */
    if (demo && s.kind === "lane") { s.at = z; s.fill = Math.max(0, z - num.length); } /* the warm-up's upper lane is worked */
    return s;
  };
  const [S, setS] = useState<any>(() => setup(conf(), ctx));
  const SR = useRef(S);
  SR.current = S;
  const put = (patch: any) => { const nx = { ...SR.current, ...patch }; SR.current = nx; setS(nx); };
  /* the correction's own layer: never the child's pieces; it clears on the child's next act */
  const [tb, setTb] = useState<any>(null);
  const tbR = useRef<any>(null);
  tbR.current = tb;
  const putTb = (patch: any) => { const nx = patch === null ? null : { ...(tbR.current || {}), ...patch }; tbR.current = nx; setTb(nx); };
  const fixing = useRef(false);
  const refuseT = useRef<any>(null);

  /* a new question, a phase's warm-up or free play: a fresh picture (never on a timer) */
  useEffect(() => {
    if (stage === "win" || stage === "idle" || stage === "summary") return;
    if (SR.current.ctx === ctx) return;
    tl.stop(); tlB.stop(); putTb(null);
    if (fixing.current) { fixing.current = false; api.lock(false); }
    const s = setup(conf(), ctx);
    SR.current = s; setS(s);
  }, [ctx, stage]);
  useEffect(() => () => clearTimeout(refuseT.current), []);

  const z = psZeros(S.den), nd = S.num.length, kind = S.kind;
  const lane = kind === "lane" || kind === "free";
  const counted = S.lit.length + S.litTop.length;
  const aGaps = Math.max(0, S.at - nd);
  const aDone = S.at === z && S.fill >= Math.max(0, z - nd);
  const barOn = S.measured && S.run === 2 && aDone;

  /* the acts, on the child's own picture */
  const walk = () => {
    const s = SR.current, mx = Math.max(psZeros(s.den), s.num.length), at = (s.at + 1) % (mx + 1);
    put({ at, fill: Math.min(s.fill, Math.max(0, at - s.num.length)) });
    api.sfx.tick();
  };
  const fillOne = () => {
    const s = SR.current, g = Math.max(0, s.at - s.num.length);
    if (s.fill >= g) return;
    put({ fill: s.fill + 1 });
    api.sfx.tick();
  };
  const runLane = () => {
    const s = SR.current;
    if (s.run) return;                       /* safe to start twice: a second start is ignored */
    const zz = psZeros(s.den), st: any[] = [];
    put({ run: 1 });
    for (let i = 1; i <= zz; i++) st.push([340, () => { put({ hang: i }); api.sfx.tick(); }]);
    for (let i = 1; i <= zz; i++) st.push([340, () => { put({ bAt: i }); api.sfx.tick(); }]);
    tlB.run(st, () => { put({ run: 2 }); api.sfx.settle(); });
  };
  const measure = () => { if (!SR.current.measured) { put({ measured: true }); api.sfx.settle(); } };
  const toggle = (top: boolean, i: number) => {
    const s = SR.current, key = top ? "litTop" : "lit", arr = s[key], on = arr.includes(i);
    put({ [key]: on ? arr.filter((k: number) => k !== i) : arr.concat(i) });
    if (!on) api.sfx.tick();
  };
  const freeSet = (fi: number, di: number) => {
    tlB.stop();
    const s = setup({ kind: "free", num: MODEL.freeNumerators[fi], den: MODEL.denominators[di] }, "free");
    s.fi = fi; s.di = di; SR.current = s; setS(s);
    api.sfx.tick();
  };
  const refuse = () => {
    put({ refuse: 1 });
    clearTimeout(refuseT.current);
    refuseT.current = setTimeout(() => put({ refuse: 0 }), 900);
  };

  /* a guide step's act, done when the child does it and reported the moment it is done */
  const act = (on: string) => {
    const s = SR.current;
    if (on.indexOf("den-") === 0) { const i = Number(on.slice(4)); if (!s.lit.includes(i)) { put({ lit: s.lit.concat(i) }); api.sfx.tick(); } }
    else if (on === "point") walk();
    else if (on === "tray") fillOne();
    else if (on === "run") runLane();
    else if (on === "measure") measure();
    api.did(on);
  };
  /* every click on a control: in the warm-up it is a step's act or a wrong act (did shows the hint); at a question
     or in free play it works the picture */
  /* a true double tap is ONE act: a second tap within 200 ms of the last is ignored in the warm-up, so one step moves */
  const lastTap = useRef(0);
  const tapOnce = () => { const now = Date.now(); if (now - lastTap.current < 200) return false; lastTap.current = now; return true; };
  const press = (name: string, fn: () => void) => {
    if (demo) { if (!tapOnce()) return; if (name === stepOn) act(name); else api.did(name); return; }
    if (!(stage === "ask" || free) || fixing.current) return;
    if (tbR.current) putTb(null);
    fn();
  };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step in the warm-up */
  api.onEnter(demo && stepOn ? () => act(stepOn) : null);
  HOOK.demo = () => { if (stepOn) act(stepOn); };
  HOOK.type = (v: any) => api.setTyped(String(v ?? ""));

  /* ── layout, from box.w ── */
  const fg = psFrac(S.num, S.den, 20, 2);
  const cntX = 20 + 4 * PS_FP + 20, cntW = 220;
  const tray = { x: Wd - 20 - 236, y: 6, w: 236, h: 170 };
  const showTray = kind === "fill" || lane;
  const R = PS_BIG, rowY = 226;
  const cells = kind === "count"
    ? (S.done && S.num ? psCells(S.num, z, 0) : psPlaces(S.done ? z : counted))
    : psCells(S.num, S.at, S.fill);
  const laid = psLay(cells, R, Math.round(Wd / 2 - psWide(cells, R) / 2));
  const ax = 200, aY = 198, barY = 306, bY = 390, kw = 200, kx = Wd - 24 - kw;
  /* the lanes take the big cards; only a long lane (free play's 250 thousandths hangs six digits) narrows its cards to
     stay clear of the keys */
  const laneN = nd + z, laneRoom = kx - 16 - ax;
  const LR = (laneN * PS_LANE.cw + PS_LANE.pw + laneN * PS_LANE.gap) <= laneRoom ? PS_LANE
    : { ...PS_LANE, cw: Math.max(44, Math.floor((laneRoom - PS_LANE.pw - laneN * PS_LANE.gap) / Math.max(1, laneN))), fs: T.speech };
  const laidA = psLay(psCells(S.num, S.at, S.fill), LR, ax);
  const laidB = psLay(psCells(S.num, S.bAt, 0, S.hang), LR, ax);
  const rowA = lane ? laidA : laid;
  const rowAY = lane ? aY : rowY, rowAH = lane ? LR.h : R.h;
  const openA = rowA.filter((c: any) => c.k === "gap" && !c.ch);

  /* the tray takes a zero into a LIT place only: a zero let go anywhere else (past the right hand end of the digits, or
     before the point has opened a place) is refused and springs back, nothing marked, and the lit places and the arrow
     show where a filling zero goes. So the child decides the side. A tap (or Enter) fills the lit place nearest the
     point, when there is one. */
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!pay || pay.src !== "zero") return;
    const onLit = moved && p && isFinite(p.x) && openA.some((c: any) => p.x >= c.x - 10 && p.x <= c.x + c.w + 10 && p.y >= rowAY - 40 && p.y <= rowAY + rowAH + 40);
    const refused = moved ? !onLit : openA.length === 0;
    if (demo) {
      if (!tapOnce()) return;
      if (refused) { refuse(); api.did("zero-elsewhere"); }
      else if (stepOn === "tray") act("tray");
      else api.did("tray");
      return;
    }
    if (!(stage === "ask" || free) || fixing.current) return;
    if (tbR.current) putTb(null);
    if (refused) { refuse(); return; }
    fillOne();
  });

  /* ── the traceback: on its own layer, ending on the whole right answer; nothing marked ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const s = SR.current, zz = psZeros(s.den), g = Math.max(0, zz - s.num.length), st: any[] = [];
    /* the child's own answer stays written: it is laid as a row of its own beside the method's (phases 1 to 3), or
       at its real size beside the right one (phase 4), both standing, nothing marked */
    const you = String(wrong.value ?? "").trim();
    fixing.current = true;
    api.lock(true);
    putTb(null);
    if (s.kind === "count") {
      const zs = String(s.den).split("").map((ch: string, i: number) => (ch === "0" ? i : -1)).filter((i: number) => i >= 0);
      st.push([500, () => putTb({ kind: "count", rings: [], places: 0, you })]);
      zs.forEach((_i: number, k: number) => st.push([650, () => { putTb({ rings: zs.slice(0, k + 1), places: k + 1 }); api.sfx.tick(); }]));
      st.push([600, () => putTb({ read: true })]);
    } else if (s.kind === "point") {
      st.push([600, () => putTb({ kind: "point", at: 0, you })]);
      for (let k = 1; k <= zz; k++) st.push([600, () => { putTb({ at: k }); api.sfx.tick(); }]);
      st.push([600, () => putTb({ read: true })]);
    } else if (s.kind === "fill") {
      /* the point walks in from the right hand end; the empty places light as it passes the digits; zeros fill them */
      st.push([600, () => putTb({ kind: "fill", at: 0, fill: 0, you })]);
      for (let k = 1; k <= zz; k++) st.push([550, () => { putTb({ at: k }); api.sfx.tick(); }]);
      for (let k = 1; k <= g; k++) st.push([650, () => { putTb({ fill: k }); api.sfx.tick(); }]);
      st.push([600, () => putTb({ read: true })]);
    } else if (s.over) {
      /* a zero nobody asked for (the answer came out too SMALL): no lane and no bar, which would say "bigger"; the point
         walks one place, there is no empty place to fill, and the sizes show both */
      st.push([600, () => putTb({ kind: "lane", a: { at: 0, fill: 0 }, you })]);
      for (let k = 1; k <= zz; k++) st.push([500, () => { putTb({ a: { at: k, fill: 0 } }); api.sfx.tick(); }]);
      st.push([600, () => { putTb({ read: true, sizes: true }); api.sfx.settle(); }]);
    } else {
      st.push([300, () => putTb({ kind: "lane", you })]);
      if (s.run !== 2) {
        st.push([300, () => putTb({ lane: true, hang: 0, bAt: 0 })]);
        for (let k = 1; k <= zz; k++) st.push([380, () => { putTb({ hang: k }); api.sfx.tick(); }]);
        for (let k = 1; k <= zz; k++) st.push([380, () => { putTb({ bAt: k }); api.sfx.tick(); }]);
      }
      st.push([500, () => putTb({ a: { at: 0, fill: 0 } })]);
      for (let k = 1; k <= zz; k++) st.push([450, () => { putTb({ a: { at: k, fill: 0 } }); api.sfx.tick(); }]);
      for (let k = 1; k <= g; k++) st.push([450, () => { putTb({ a: { at: zz, fill: k } }); api.sfx.tick(); }]);
      st.push([550, () => { putTb({ bar: true }); api.sfx.settle(); }]);
      st.push([500, () => putTb({ read: true, sizes: true })]);
    }
    tl.run(st, () => { fixing.current = false; api.lock(false); });
  }, [wrong]);

  /* ── the win: the maths finishes itself on the child's own picture and the decimal is read back ── */
  useEffect(() => {
    if (stage !== "win") return;
    putTb(null);
    fixing.current = false;
    psSayWin(api, item && item.qid);
    const s = SR.current, zz = psZeros(s.den), d = s.num, g = Math.max(0, zz - d.length), st: any[] = [];
    if (s.kind === "count") {
      const zs = String(s.den).split("").map((ch: string, i: number) => (ch === "0" ? i : -1)).filter((i: number) => i >= 0);
      st.push([300, () => put({ litTop: [], lit: s.lit.filter((i: number) => zs.includes(i)) })]);
      zs.forEach((i: number) => { if (!s.lit.includes(i)) st.push([340, () => { put({ lit: SR.current.lit.concat(i) }); api.sfx.tick(); }]); });
      st.push([500, () => { put({ done: true }); api.sfx.settle(); }]);
    } else {
      let at = s.at, f0 = s.at <= zz ? Math.min(s.fill, g) : 0;
      if (at > zz) { st.push([300, () => put({ at: 0, fill: 0 })]); at = 0; }
      for (let k = at + 1; k <= zz; k++) st.push([340, () => { put({ at: k, fill: Math.min(SR.current.fill, Math.max(0, k - d.length)) }); api.sfx.tick(); }]);
      for (let k = f0 + 1; k <= g; k++) st.push([340, () => { put({ fill: k }); api.sfx.tick(); }]);
      /* the `over` item's win, like its correction, runs no lower lane and no "times bigger" bar */
      if (s.kind === "lane" && !s.over) {
        if (s.run !== 2) {
          tlB.stop();
          for (let k = 1; k <= zz; k++) st.push([300, () => { put({ hang: k, run: 1 }); api.sfx.tick(); }]);
          for (let k = 1; k <= zz; k++) st.push([300, () => { put({ bAt: k }); api.sfx.tick(); }]);
          st.push([200, () => put({ run: 2 })]);
        }
        st.push([400, () => put({ measured: true })]);
      }
      st.push([400, () => { put({ done: true }); api.sfx.settle(); }]);
    }
    tl.run(st);
  }, [stage]);

  /* what the host and the agent read back (toolApi.getState): the child's own picture, never the answer */
  api.share({ numerator: S.num, denominator: S.den, counted: kind === "count" ? counted : z, pointAt: S.at,
    emptyPlaces: Math.max(0, aGaps - S.fill), filled: S.fill, wrongLane: S.run === 2, gap: barOn ? S.den : 0 });

  const live = demo || stage === "ask" || free;

  /* ── drawing (helpers are called, never mounted) ── */
  const fraction = () => {
    const ring = tb && tb.kind === "count" ? tb.rings || [] : [];
    return (
      <g>
        {S.num === "" && (
          <rect x={fg.nx + 8} y={fg.ny + 8} width={fg.P - 16} height={fg.P - 16} rx={RAD.piece} fill="none" stroke={shade(C.rule, 0.1)} strokeWidth={2.5} strokeDasharray="8 7" />
        )}
        {S.num.split("").map((ch: string, i: number) => (
          <g key={"t" + i}>
            {S.litTop.includes(i) && <rect x={fg.nx + i * fg.P + 4} y={fg.ny + 2} width={fg.P - 8} height={fg.P - 4} rx={12} fill={tint(PS_AMBER, 0.55)} stroke={shade(PS_AMBER, 0.15)} strokeWidth={2} />}
            <text x={fg.nx + i * fg.P + fg.P / 2} y={fg.ny + fg.P / 2 + T.display * 0.35} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{ch}</text>
          </g>
        ))}
        <rect x={fg.x - 6} y={fg.by} width={fg.fw + 12} height={10} rx={5} fill={C.ink} />
        {fg.ds.split("").map((ch: string, i: number) => (
          <g key={"b" + i}>
            {S.lit.includes(i) && <rect x={fg.dx + i * fg.P + 4} y={fg.dy + 2} width={fg.P - 8} height={fg.P - 4} rx={12} fill={tint(PS_AMBER, 0.55)} stroke={shade(PS_AMBER, 0.15)} strokeWidth={2} />}
            <text x={fg.dx + i * fg.P + fg.P / 2} y={fg.dy + fg.P / 2 + T.display * 0.35} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{ch}</text>
          </g>
        ))}
        {ring.length > 0 && (
          <g pointerEvents="none">
            {ring.map((i: number, k: number) => (
              <g key={"r" + i}>
                <rect x={fg.dx + i * fg.P + 2} y={fg.dy} width={fg.P - 4} height={fg.P} rx={14} fill="none" stroke={shade(PS_AMBER, 0.1)} strokeWidth={5} />
                <text x={fg.dx + i * fg.P + fg.P / 2} y={fg.dy + fg.P + 30} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={PS_NUMINK}>{k + 1}</text>
              </g>
            ))}
          </g>
        )}
        {/* the digits a child counts with (phase 1), or the numbers that change (free play) */}
        {live && kind === "count" && S.num.split("").map((_c: string, i: number) => (
          <Hit key={"ht" + i} id={"num-" + i} x={fg.nx + i * fg.P} y={fg.ny} w={fg.P} h={fg.P} onPress={() => press("num-" + i, () => toggle(true, i))} label={tx("Count this top digit")} />
        ))}
        {live && kind === "count" && fg.ds.split("").map((_c: string, i: number) => (
          <Hit key={"hb" + i} id={"den-" + i} x={fg.dx + i * fg.P} y={fg.dy} w={fg.P} h={fg.P} onPress={() => press("den-" + i, () => toggle(false, i))} label={tx("Count this bottom digit")} />
        ))}
        {free && <Hit id="top" x={fg.nx} y={fg.ny} w={Math.max(1, S.num.length) * fg.P} h={fg.P} onPress={() => press("top", () => freeSet((S.fi + 1) % MODEL.freeNumerators.length, S.di))} label={tx("Change the top number")} />}
        {free && <Hit id="bottom" x={fg.dx} y={fg.dy} w={fg.ds.length * fg.P} h={fg.P} onPress={() => press("bottom", () => freeSet(S.fi, (S.di + 1) % MODEL.denominators.length))} label={tx("Change the bottom number")} />}
      </g>
    );
  };
  const counter = () => (
    <g>
      <rect x={cntX} y={4} width={cntW} height={182} rx={RAD.panel} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
      {/* "places counter" on two lines at 36 (its first word, then the rest), the count at 80 */}
      {(() => { const t = String(tx("places counter")), sp = t.indexOf(" "), a = sp > 0 ? t.slice(0, sp) : t, b = sp > 0 ? t.slice(sp + 1) : "";
        return (<g>
          <text x={cntX + cntW / 2} y={44} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{a}</text>
          {b && <text x={cntX + cntW / 2} y={86} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{b}</text>}
        </g>); })()}
      <text x={cntX + cntW / 2} y={168} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{kind === "count" ? counted : z}</text>
    </g>
  );
  const trayLive = live && showTray;
  const trayView = () => (
    <g {...(trayLive ? { ...control("tray", tx("Take a zero for an empty place")), ...drag.bind({ src: "zero" }), ...drag.keys({ src: "zero" }) } : {})}>
      <rect x={tray.x} y={tray.y} width={tray.w} height={tray.h} rx={RAD.panel} fill={tint(C.panel, 0.2)} stroke={C.rule} strokeWidth={2} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={tray.x + 12 + i * 74} y={tray.y + 12} width={64} height={88} rx={RAD.piece} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          {!(SZ && SZ.px < tray.x + tray.w) && <text x={tray.x + 44 + i * 74} y={tray.y + 56 + T.xl * 0.35} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PS_GREY}>0</text>}
        </g>
      ))}
      {/* the label waits while the correction's sizes panel stands over the tray */}
      {!(SZ && SZ.px < tray.x + tray.w) && (
        <text x={tray.x + tray.w / 2} y={tray.y + 148} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{tx("zero tray")}</text>
      )}
    </g>
  );
  const readout = (text: string, x: number, y: number, w: number, h: number, fz: number = T.speech) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={x + w / 2} y={y + h / 2 + fz * 0.35} textAnchor="middle" fontSize={fz} fontWeight={700} fill={C.ink}>{text}</text>
    </g>
  );

  /* the point card of the row the child walks: one tap walks it one digit in (phase 2, the upper lane, free play) */
  const pointHit = (row: any[], y: number, h: number) => {
    const p = row.find((c: any) => c.k === "point");
    if (!p || !live || !(kind === "point" || kind === "fill" || lane)) return null;
    return <Hit id="point" x={p.x + p.w / 2 - 36} y={y} w={72} h={h} onPress={() => press("point", walk)} label={tx("Walk the point in one digit")} />;
  };

  const single = () => {
    const strip = tb && (tb.kind === "count" || tb.kind === "point" || tb.kind === "fill");
    let sl: any[] = [], text = "", yl: any[] = [], yText = "", yx = 0;
    if (strip) {
      const c2 = tb.kind === "count" ? psPlaces(tb.places || 0) : psCells(S.num, tb.at || 0, tb.fill || 0);
      sl = psLay(c2, PS_SMALL, 48);
      if (tb.read) text = tb.kind === "count" ? z + " " + tx(z === 1 ? "place" : "places") : psWritten(c2);
      /* the child's own row stands at the strip's right, its places counted from its own point; where the method's
         finished row would reach it, the typed answer is written as it was typed instead */
      const full = tb.kind === "count" ? psPlaces(z) : psCells(S.num, z, Math.max(0, z - nd));
      const reach = 48 + psWide(full, PS_SMALL) + 24 + (tb.kind === "count" ? 9 : psWritten(full).length) * T.speech * 0.62 + 40;
      /* the label "you typed" stands at the LEFT of the child's row, level with it (never squeezed under the cards) */
      const labW = String(tx("you typed")).length * T.prompt * 0.6 + 16;
      const yc = tb.you ? psTypedCells(tb.you, tb.kind === "count") : null;
      if (yc && yc.length) {
        yx = Wd - 48 - psWide(yc, PS_SMALL);
        if (yx - labW >= reach) yl = psLay(yc, PS_SMALL, yx);
      }
      if (tb.you && !yl.length) { yText = tb.you; yx = Wd - 48 - Math.max(60, tb.you.length * T.speech * 0.62); }
    }
    const end = sl.length ? sl[sl.length - 1].x + sl[sl.length - 1].w : 48;
    return (
      <g>
        {fraction()}
        {counter()}
        {showTray && trayView()}
        {/* phase 1 draws no lone point card: the point and its places appear with the first zero counted (or at the win) */}
        {!(kind === "count" && !S.done && counted === 0) && psRow(laid, rowY, R, C, { nums: kind !== "count", arrow: kind === "fill", refuse: S.refuse })}
        {pointHit(laid, rowY, R.h)}
        {S.done && kind !== "count" && readout(psWritten(cells), Math.round(Wd / 2 - 140), 392, 280, 104, T.xl)}
        {strip && (
          <g pointerEvents="none">
            <rect x={24} y={380} width={Wd - 48} height={144} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
            {psRow(sl, 424, PS_SMALL, C, { nums: tb.kind !== "count", arrow: tb.kind === "fill" })}
            {text && <text x={end + 24} y={424 + 38 + T.speech * 0.35} fontSize={T.speech} fontWeight={700} fill={C.ink}>{text}</text>}
            {yl.length > 0 && psRow(yl, 424, PS_SMALL, C, { nums: tb.kind !== "count" })}
            {yText && <text x={yx} y={424 + 38 + T.speech * 0.35} fontSize={T.speech} fontWeight={700} fill={C.ink}>{yText}</text>}
            {tb.you && <text x={yx - 16} y={424 + 38 + T.prompt * 0.35} textAnchor="end" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{tx("you typed")}</text>}
          </g>
        )}
      </g>
    );
  };

  /* the correction's sizes (phase 4): each answer at its real size, a whole as one chocolate piece. The right answer
     is shaded on a hundred grid (green, the answer); the child's typed answer is one piece for each whole one and,
     for any part left, a grid of its own (blue). The skin is only the look: the plain square stays under it, and the
     cell lines, the shading and the written labels are drawn in code */
  /* the side of one whole (a chocolate piece): as big as the panel lets the child's whole answer stand, 84 at most */
  let PIECE = 84;
  const grid = (x: number, y: number, f: number, paint: string, key: string) => {
    const cell = PIECE / 10, cells = Math.floor(f * 100 + 1e-6), thou = Math.round((f * 100 - cells) * 10);
    return (
      <g key={key}>
        <rect x={x} y={y} width={PIECE} height={PIECE} rx={4} fill={tint(C.panel, 0.1)} />
        <Skin name="piece" x={x} y={y} w={PIECE} h={PIECE} fit="stretch" />
        {Array.from({ length: Math.min(100, cells) }, (_v, k) => (
          <rect key={"c" + k} x={x + Math.floor(k / 10) * cell} y={y + (k % 10) * cell} width={cell} height={cell} fill={paint} fillOpacity={0.72} />
        ))}
        {thou > 0 && cells < 100 && (
          <rect x={x + Math.floor(cells / 10) * cell} y={y + (cells % 10) * cell} width={cell} height={(cell * thou) / 10} fill={paint} fillOpacity={0.72} />
        )}
        {Array.from({ length: 9 }, (_v, i) => (
          <g key={"l" + i}>
            <line x1={x + (i + 1) * cell} y1={y} x2={x + (i + 1) * cell} y2={y + PIECE} stroke="#1E1E1E" strokeWidth={1} />
            <line x1={x} y1={y + (i + 1) * cell} x2={x + PIECE} y2={y + (i + 1) * cell} stroke="#1E1E1E" strokeWidth={1} />
          </g>
        ))}
        <rect x={x} y={y} width={PIECE} height={PIECE} rx={4} fill="none" stroke="#1E1E1E" strokeWidth={2} />
        {/* a few thousandths are a sliver of one cell: a thin dark circle rings it so it reads from the back bench */}
        {cells === 0 && thou > 0 && (
          <circle cx={x + cell / 2} cy={y + (cell * thou) / 20} r={11} fill="none" stroke="#1E1E1E" strokeWidth={2} />
        )}
      </g>
    );
  };
  const wholePiece = (x: number, y: number, key: string) => (
    <g key={key}>
      <rect x={x} y={y} width={PIECE} height={PIECE} rx={4} fill={tint(C.panel, 0.1)} />
      <Skin name="piece" x={x} y={y} w={PIECE} h={PIECE} fit="stretch" />
      <rect x={x} y={y} width={PIECE} height={PIECE} rx={4} fill="none" stroke="#1E1E1E" strokeWidth={2} />
    </g>
  );
  const sizesLay = () => {
    if (!tb || !tb.sizes) return null;
    const gap = 8, left = 352, right = Wd - 24 - 20;
    /* the right answer's label starts at its grid and may be wider than it: the child's group starts after both */
    const rightW = psWritten(psCells(S.num, z, Math.max(0, z - nd))).length * T.prompt * 0.62;
    const you = String(tb.you || ""), yv = Number(you), ok = /\d/.test(you) && /^\d*\.?\d*$/.test(you) && isFinite(yv);
    const whole = ok ? Math.floor(yv + 1e-9) : 0, frac0 = ok ? yv - whole : 0, fr = frac0 > 1e-9 ? 1 : 0;
    /* the typed answer is drawn at its real size only when ALL of it fits (the pieces may shrink to 52, all the same
       size as the grid's whole); else it is written as typed, no pieces (a picture of part of it would show a size
       the child did not type) */
    let P = 84, fits = false;
    if (ok) for (let q = 84; q >= 44; q -= 4) {
      const need = (whole + fr) * (q + gap) - gap;
      if (left + 20 + Math.max(q, rightW) + 24 + Math.max(0, need) <= right) { P = q; fits = true; break; }
    }
    const hasFrac = fits && fr === 1, frac = fits ? frac0 : 0;
    const nP = fits ? whole : 0;
    const groupW = fits ? Math.max(0, (nP + (hasFrac ? 1 : 0)) * (P + gap) - gap) : 0;
    const labelW = you.length * T.prompt * 0.62 + 14 + String(tx("you typed")).length * T.prompt * 0.58;
    /* a typed answer with no digits (a lone point) is written as typed, with the panel at its normal width */
    const contentW = Math.max(P, rightW) + 24 + Math.max(groupW, labelW);
    let px = Wd - 24 - contentW - 40;
    if (px < cntX + cntW + 16) px = left;     /* the panel then covers the places counter, which waits under it */
    return { px, gap, you, ok, frac, hasFrac, nP, P, rightW };
  };
  const SZ = sizesLay();
  if (SZ) PIECE = SZ.P;
  const sizes = () => {
    if (!SZ) return null;
    const { px, gap, you, ok, frac, hasFrac, nP } = SZ;
    const gy = 14, ly = gy + PIECE + 44;
    const right = psWritten(psCells(S.num, z, Math.max(0, z - nd))), rv = Number(S.num) / S.den;
    const gx = px + 20, x0 = gx + Math.max(PIECE, SZ.rightW) + 24;
    return (
      <g pointerEvents="none">
        <rect x={px} y={4} width={Wd - 24 - px} height={180} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
        {grid(gx, gy, rv, CONTENT.one, "right")}
        <text x={gx} y={ly} fontSize={T.prompt} fontWeight={700} fill={C.ink}>{right}</text>
        {ok && Array.from({ length: nP }, (_v, i) => wholePiece(x0 + i * (PIECE + gap), gy, "w" + i))}
        {ok && hasFrac && grid(x0 + nP * (PIECE + gap), gy, frac, CONTENT.hundred, "yours")}
        {you !== "" && (
          <text x={x0} y={ly} fontSize={T.prompt} fontWeight={700} fill={C.ink}>
            {you}<tspan fontSize={T.prompt} fontWeight={600} dx={14}>{tx("you typed")}</tspan>
          </text>
        )}
      </g>
    );
  };

  /* a lane's label on two lines at 36 in the left column (its first word, then the rest) */
  const laneLabel = (t: any, y: number) => {
    const s = String(t), sp = s.indexOf(" "), a = sp > 0 ? s.slice(0, sp) : s, b = sp > 0 ? s.slice(sp + 1) : "";
    return (
      <g>
        <text x={24} y={y + 40} fontSize={T.prompt} fontWeight={600} fill={C.ink}>{a}</text>
        {b && <text x={24} y={y + 82} fontSize={T.prompt} fontWeight={600} fill={C.ink}>{b}</text>}
      </g>
    );
  };

  const lanes = () => {
    const tA = tb && tb.a, tBl = tb && tb.lane;
    const shownB = tBl ? psLay(psCells(S.num, tb.bAt || 0, 0, tb.hang || 0), LR, ax) : laidB;
    const tRow = tA ? psLay(psCells(S.num, tA.at, tA.fill), LR, ax) : null;
    /* the `over` item (an answer too SMALL) keeps Run and Measure quiet: the lower lane and "times bigger" would point
       the wrong way beside its correction */
    const runLive = live && S.run === 0 && !S.over;
    const measureLive = demo ? !S.measured : live && S.run === 2 && aDone && !S.measured && !S.over;
    const barText = barOn || (tb && tb.bar) ? indian(S.den) + " " + tx("times bigger") : "";
    const bw = kx - 24 - ax;
    return (
      <g>
        {fraction()}
        {!(SZ && SZ.px < cntX + cntW + 8) && counter()}
        {trayView()}
        {laneLabel(tx("zeros left"), aY)}
        {/* while the correction builds this lane on its own layer, the child's row waits under it, not drawn twice */}
        {!tRow && psRow(laidA, aY, LR, C, { arrow: true, refuse: S.refuse })}
        {pointHit(laidA, aY, LR.h)}
        <rect x={ax} y={barY + 6} width={bw} height={60} rx={30} fill={barText ? tint(PS_AMBER, 0.75) : "none"}
          stroke={barText ? shade(PS_AMBER, 0.2) : shade(C.rule, 0.1)} strokeWidth={2.5} strokeDasharray={barText ? undefined : "10 8"} />
        {barText && <text x={ax + bw / 2} y={barY + 36 + T.prompt * 0.35} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{barText}</text>}
        <Key id="measure" x={kx} y={barY} w={kw} h={72} C={C} onClick={() => press("measure", measure)} disabled={!measureLive} label={tx("Measure how far apart they are")}>
          <text y={T.prompt * 0.35} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx("Measure")}</text>
        </Key>
        {laneLabel(tx("zeros right"), bY)}
        {psRow(shownB, bY, LR, C, {})}
        <Key id="run" x={kx} y={bY + 12} w={kw} h={72} C={C} onClick={() => press("run", runLane)} disabled={!runLive} label={tx("Run the other lane")}>
          <text y={T.prompt * 0.35} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx("Run")}</text>
        </Key>
        {S.done && readout(psWritten(psCells(S.num, S.at, S.fill)), kx, aY + 12, kw, 72)}
        {tRow && (
          <g pointerEvents="none">
            <rect x={ax - 8} y={aY - 6} width={kx - ax - 8} height={LR.h + 12} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
            {psRow(tRow, aY, LR, C, { arrow: true })}
            {tb.read && readout(psWritten(psCells(S.num, tA.at, tA.fill)), kx, aY + 12, kw, 72)}
          </g>
        )}
        {sizes()}
      </g>
    );
  };

  /* the one invite: on the control the warm-up's step waits for; at a phase 3 question, on the point card until it moves */
  /* the invite is a rounded ring that hugs the one control (the runtime's pulse, in its colour), so it never runs over
     a neighbouring card or a label */
  const ring = (x: number, y: number, w: number, h: number, r = 14, m = 6, sw = 5) => (
    <rect className="c4-pulse" x={x - m} y={y - m} width={w + 2 * m} height={h + 2 * m} rx={r} fill="none" strokeWidth={sw} pointerEvents="none"
      stroke={(typeof THEME !== "undefined" && THEME && THEME.enter && THEME.enter[1]) || C.accent} />
  );
  /* the point card's ring stands 3 off its edge and is 4 wide, so it stays clear of the card beside it (8 away) */
  const pointRing = (row: any[], y: number, h: number) => { const p = row.find((c: any) => c.k === "point"); return p ? ring(p.x, y, p.w, h, RAD.piece + 3, 3, 4) : null; };
  const invite = () => {
    if (stage === "ask" && kind === "fill" && S.at === 0 && !tb) return pointRing(laid, rowY, R.h);
    if (!demo || !stepOn) return null;
    if (stepOn.indexOf("den-") === 0) { const i = Number(stepOn.slice(4)); return ring(fg.dx + i * fg.P, fg.dy, fg.P, fg.P); }
    if (stepOn === "point") return lane ? pointRing(laidA, aY, LR.h) : pointRing(laid, rowY, R.h);
    if (stepOn === "tray") return ring(tray.x, tray.y, tray.w, tray.h, RAD.panel + 4);
    if (stepOn === "run") return ring(kx, bY + 12, kw, 72 + EDGE, RAD.key + 4);
    if (stepOn === "measure") return ring(kx, barY, kw, 72 + EDGE, RAD.key + 4);
    return null;
  };

  const dd = drag.drag;
  return (
    <g>
      {lane ? lanes() : single()}
      {invite()}
      {dd && dd.moved && dd.payload && dd.payload.src === "zero" && (
        <g pointerEvents="none">
          <rect x={dd.x - 32} y={dd.y - 40} width={64} height={80} rx={RAD.piece} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fLift)" />
          <text x={dd.x} y={dd.y + T.speech * 0.35} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={PS_GREY}>0</text>
        </g>
      )}
    </g>
  );
}

/* the running count (the runs box, 330 x 76, drawn by the runtime): the fractions turned into decimals this
   phase, as three small cards that each take a point as it is turned; it never counts down, no score */
function Runs({ index, stage, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  if (stage === "free" || stage === "summary") return null;
  const turned = stage === "demo" || stage === "teach" ? 0 : Math.min(3, (index || 0) + (stage === "win" || stage === "idle" ? 1 : 0));
  return (
    <g pointerEvents="none">
      <text x={22} y={52} fontSize={T.prompt} fontWeight={600} fill={C.ink}>{tx("done")}</text>
      {[0, 1, 2].map((i) => {
        const x = 170 + i * 52, on = i < turned;
        return (
          <g key={i}>
            <rect x={x} y={13} width={40} height={50} rx={8} fill={on ? "#FFFFFF" : "none"} stroke={on ? C.rule : shade(C.rule, 0.15)}
              strokeWidth={2} strokeDasharray={on ? undefined : "6 5"} />
            {on && <circle cx={x + 20} cy={50} r={6} fill={CONTENT.pointer} />}
          </g>
        );
      })}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment); `item` is the
   question's INDEX in its phase, so the question itself is PHASES[n - 1].items[item] */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L || L.value === null || L.value === undefined) return null;
  const ph: any = PHASES[(n || 1) - 1] || PHASES[0];
  const it: any = typeof L.item === "number" ? (ph.items[L.item] || {}) : (L.item || {});
  const v = String(L.value).trim(), count = typeof it.answer === "number", mid = h / 2;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {it.den && (
        <g>
          <text x={50} y={mid - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{it.num || "?"}</text>
          <rect x={14} y={mid - 2} width={72} height={4} rx={2} fill={C.ink} />
          <text x={50} y={mid + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{it.den}</text>
        </g>
      )}
      <text x={w - 14} y={mid + 11} textAnchor="end" fontSize={count ? T.micro : T.label} fontWeight={700} fill={C.ink}>
        {count ? v + " " + tx(v === "1" ? "place" : "places") : v}
      </text>
    </g>
  );
}

function PointSlider(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work, Runs,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* a decimal answer: the pad's point key on every question (PATTERNS §4). No cardAnswer: the answers are counts and
         single-box decimals (the child places the point), so no question is answered on a Fraction or Decimal card */
      pointKey: true,
      /* the board layout (LAYOUT.md §1b): the question and an Answer key on a bar across the top, the working area the
         whole card until the child taps Answer, the answer box and keypad in a panel that slides in from the right */
      board: true,
      bigPad: true,   /* r26: this picture is small, so the keypad panel takes the room beside it (the owner, 2026-10-14) */
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; after a right answer the win picture waits for the child's tap on
         the blinking Next key (the question bar's right end; the classic layout: the answer slot's place). Delete to keep the timers. */
      nextKey: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      /* the keypad colours: leave THEME unset and the image agent's TOOL_THEME (the slot's images.tsx) is picked up by the
         runtime by itself; set THEME here only to override it (docs/IMAGES.md) */
      }} />
  );
}

export default PointSlider;
